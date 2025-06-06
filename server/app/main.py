from fastapi import FastAPI
from .services.ranker import RankerService

app = FastAPI()
ranker = RankerService()

@app.post("/rank")
async def rank(prompt: str):
    return ranker.rank(prompt)

@app.get("/history")
async def history():
    """Placeholder for future user history."""
    return []
