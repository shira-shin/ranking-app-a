import os
import json
import pytest
from fastapi.testclient import TestClient

# Set dummy mode before importing the app so the ranker doesn't require OpenAI
os.environ.setdefault("USE_DUMMY_DATA", "1")

from server.app import main

client = TestClient(main.app)
AUTH_HEADER = {"Authorization": "Bearer testuser"}

def test_rank_returns_dummy_results():
    response = client.post("/rank", json={"prompt": "Rank the following items: A, B, C. Criteria: taste"})
    assert response.status_code == 200
    data = response.json()
    assert "results" in data
    assert isinstance(data["results"], list)
    assert len(data["results"]) > 0

def test_history_crud(tmp_path, monkeypatch):
    # Redirect history file to a temporary location
    temp_history = tmp_path / "history.json"
    monkeypatch.setattr(main, "HISTORY_FILE", temp_history)

    # Initially empty
    resp = client.get("/history", headers=AUTH_HEADER)
    assert resp.status_code == 200
    assert resp.json() == []

    # Add entry
    payload = {"foo": "bar"}
    resp = client.post("/history", json=payload, headers=AUTH_HEADER)
    assert resp.status_code == 200
    entry = resp.json()
    assert entry["data"] == payload
    assert "created_at" in entry
    item_id = entry["id"]

    # Verify retrieval
    resp = client.get(f"/history/{item_id}", headers=AUTH_HEADER)
    assert resp.status_code == 200
    returned = resp.json()
    assert returned["data"] == payload
    assert "created_at" in returned

    # Delete entry
    resp = client.delete(f"/history/{item_id}", headers=AUTH_HEADER)
    assert resp.status_code == 200

    # History should be empty again
    resp = client.get("/history", headers=AUTH_HEADER)
    assert resp.status_code == 200
    assert resp.json() == []
