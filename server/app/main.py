from fastapi import Body, FastAPI, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from .services.ranker import RankerService
from typing import Any, List
import json
from pathlib import Path
from uuid import uuid4
import logging
import os
from io import BytesIO
from PIL import Image, ImageDraw, ImageFont

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

allowed_origins = [
    origin.strip()
    for origin in os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
ranker = RankerService()

# File-based history storage
HISTORY_FILE = Path(__file__).resolve().parent / "history.json"


def _read_history() -> List[Any]:
    if HISTORY_FILE.exists():
        try:
            with HISTORY_FILE.open("r", encoding="utf-8") as f:
                return json.load(f)
        except json.JSONDecodeError:
            logger.error("Invalid history file. Resetting it.")
            return []
    return []


def _write_history(items: List[Any]) -> None:
    with HISTORY_FILE.open("w", encoding="utf-8") as f:
        json.dump(items, f, ensure_ascii=False, indent=2)


class RankRequest(BaseModel):
    prompt: str
    count: int | None = None

@app.post("/rank")
async def rank(request: RankRequest):
    """Generate a ranking based on the provided prompt.

    The frontend expects an object with a ``results`` field, so wrap the
    generated list in that structure.
    """
    logger.info("Received prompt: %s", request.prompt)
    try:
        ranking = ranker.rank(request.prompt, request.count)
        logger.info("Ranking generated: %s", ranking)
    except Exception as exc:
        logger.error("Ranking error: %s", exc)
        raise HTTPException(status_code=500, detail="Failed to generate ranking")
    # Older versions of the RankerService or the OpenAI prompt may return a
    # structure like ``[{"rankings": [...]}]``.  To keep the API stable for the
    # frontend, unwrap such responses here so that we always return the flat
    # list of ranking items.
    if isinstance(ranking, dict) and "rankings" in ranking:
        ranking = ranking["rankings"]
    elif (
        isinstance(ranking, list)
        and len(ranking) == 1
        and isinstance(ranking[0], dict)
        and "rankings" in ranking[0]
    ):
        ranking = ranking[0]["rankings"]
    return {"results": ranking}

@app.post("/history")
async def save_history(data: Any = Body(...)):
    """Store ranking results on disk."""
    items = _read_history()
    entry = {"id": str(uuid4()), "data": data}
    items.append(entry)
    _write_history(items)
    return entry

@app.get("/history")
async def history():
    """Retrieve saved history."""
    return _read_history()


@app.get("/history/{item_id}")
async def get_history(item_id: str):
    """Retrieve a single history item by ID."""
    items = _read_history()
    for item in items:
        if item.get("id") == item_id:
            return item
    raise HTTPException(status_code=404, detail="Item not found")


@app.delete("/history/{item_id}")
async def delete_history(item_id: str):
    """Delete a history entry by its ID."""
    items = _read_history()
    new_items = [item for item in items if item.get("id") != item_id]
    if len(new_items) == len(items):
        raise HTTPException(status_code=404, detail="Item not found")
    _write_history(new_items)
    return {"status": "deleted"}


@app.post("/share_image")
async def share_image(data: List[Any] = Body(...)):
    """Return a simple PNG image showing ranking data."""
    font = ImageFont.load_default()
    line_height = 20
    padding = 10
    lines = [f"{item.get('rank')}. {item.get('name')} ({item.get('score')})" for item in data]
    width = max((ImageDraw.Draw(Image.new("RGB", (1, 1))).textlength(line, font=font) for line in lines), default=100) + padding * 2
    height = line_height * len(lines) + padding * 2
    img = Image.new("RGB", (int(width), height), "white")
    draw = ImageDraw.Draw(img)
    y = padding
    for line in lines:
        draw.text((padding, y), line, fill="black", font=font)
        y += line_height
    buf = BytesIO()
    img.save(buf, format="PNG")
    return Response(buf.getvalue(), media_type="image/png")
