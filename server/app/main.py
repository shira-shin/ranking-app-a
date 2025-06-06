from fastapi import FastAPI
from .services.ranker import RankerService
from typing import Any, List

app = FastAPI()
ranker = RankerService()
history_store: List[Any] = []

@app.post("/rank")
async def rank(prompt: str):
    return ranker.rank(prompt)

@app.post("/history")
async def save_history(data: Any):
    """Store ranking results in-memory."""
    history_store.append(data)
    return {"status": "ok"}

@app.get("/history")
async def history():
    """Retrieve saved history."""
    return history_store
