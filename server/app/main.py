from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .services.ranker import RankerService
from typing import Any, List

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
