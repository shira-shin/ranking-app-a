from fastapi import Body, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from .services.ranker import RankerService
from typing import Any, List
import json
from pathlib import Path
from uuid import uuid4
from datetime import datetime
import logging
import os

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

frontend_origins_env = os.getenv("FRONTEND_ORIGINS", "http://localhost:3000")
allowed_origins = [origin.strip() for origin in frontend_origins_env.split(",") if origin.strip()]

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
    if isinstance(data, dict):
        entry_data = data.get("data", data)
        title = data.get("title")
        is_public = bool(data.get("is_public"))
    else:
        entry_data = data
        title = None
        is_public = False
    entry = {
        "id": str(uuid4()),
        "data": entry_data,
        "created_at": datetime.utcnow().isoformat() + "Z",
        "title": title,
        "is_public": is_public,
    }
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
