from fastapi import Body, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from .services.ranker import RankerService
from typing import Any, List
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
ranker = RankerService()
history_store: List[Any] = []


class RankRequest(BaseModel):
    prompt: str

@app.post("/rank")
async def rank(request: RankRequest):
    """Generate a ranking based on the provided prompt.

    The frontend expects an object with a ``results`` field, so wrap the
    generated list in that structure.
    """
    logger.info("Received prompt: %s", request.prompt)
    ranking = ranker.rank(request.prompt)
    logger.info("Ranking generated: %s", ranking)
    return {"results": ranking}

@app.post("/history")
async def save_history(data: Any = Body(...)):
    """Store ranking results in-memory."""
    history_store.append(data)
    return {"status": "ok"}

@app.get("/history")
async def history():
    """Retrieve saved history."""
    return history_store
