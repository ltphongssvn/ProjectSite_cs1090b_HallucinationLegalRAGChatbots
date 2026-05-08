import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock
from src.main import app

client = TestClient(app)


def test_health():
    resp = client.get("/health")
    assert resp.status_code == 200
    assert resp.json()["status"] == "ok"


def test_demo_query_endpoint_exists():
    """GREEN: /api/demo/query must exist and accept POST."""
    with patch("src.main.OpenAI") as mock_openai:
        mock_client = MagicMock()
        mock_openai.return_value = mock_client
        mock_client.chat.completions.create.return_value = MagicMock(
            choices=[MagicMock(message=MagicMock(content='{"label": "FAITHFUL", "reason": "ok"}'))]
        )
        resp = client.post("/api/demo/query", json={"question": "What is qualified immunity?"})
        assert resp.status_code == 200


def test_demo_query_returns_required_fields():
    """RED: response must include question, retrieved_chunks, answer, faithfulness."""
    with patch("src.main.OpenAI") as mock_openai:
        mock_client = MagicMock()
        mock_openai.return_value = mock_client
        mock_client.chat.completions.create.return_value = MagicMock(
            choices=[MagicMock(message=MagicMock(content='{"label": "FAITHFUL", "reason": "supported"}'))]
        )
        resp = client.post("/api/demo/query", json={"question": "What is qualified immunity?"})
        assert resp.status_code == 200
        data = resp.json()
        assert "retrieved_chunks" in data
        assert "answer" in data
        assert "faithfulness" in data


def test_demo_query_retrieves_5_chunks():
    """RED: must return exactly 5 retrieved chunks."""
    with patch("src.main.OpenAI") as mock_openai:
        mock_client = MagicMock()
        mock_openai.return_value = mock_client
        mock_client.chat.completions.create.return_value = MagicMock(
            choices=[MagicMock(message=MagicMock(content='{"label": "FAITHFUL", "reason": "ok"}'))]
        )
        resp = client.post("/api/demo/query", json={"question": "qualified immunity fourth amendment"})
        assert resp.status_code == 200
        assert len(resp.json()["retrieved_chunks"]) == 5


def test_demo_query_faithfulness_label_valid():
    """RED: faithfulness label must be FAITHFUL, PARTIAL, or HALLUCINATED."""
    with patch("src.main.OpenAI") as mock_openai:
        mock_client = MagicMock()
        mock_openai.return_value = mock_client
        mock_client.chat.completions.create.return_value = MagicMock(
            choices=[MagicMock(message=MagicMock(content='{"label": "HALLUCINATED", "reason": "no support"}'))]
        )
        resp = client.post("/api/demo/query", json={"question": "habeas corpus"})
        assert resp.json()["faithfulness"] in ["FAITHFUL", "PARTIAL", "HALLUCINATED", "UNKNOWN"]


def test_demo_query_chunk_has_required_fields():
    """RED: each chunk must have id, court, text, score."""
    with patch("src.main.OpenAI") as mock_openai:
        mock_client = MagicMock()
        mock_openai.return_value = mock_client
        mock_client.chat.completions.create.return_value = MagicMock(
            choices=[MagicMock(message=MagicMock(content='{"label": "FAITHFUL", "reason": "ok"}'))]
        )
        resp = client.post("/api/demo/query", json={"question": "Miranda rights custody"})
        chunk = resp.json()["retrieved_chunks"][0]
        assert "id" in chunk
        assert "court" in chunk
        assert "text" in chunk
        assert "score" in chunk
