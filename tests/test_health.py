"""
TDD - Red phase: defines contract for FastAPI health endpoint.
Tests written FIRST before any source implementation.
"""
import pytest
from fastapi.testclient import TestClient


def test_health_endpoint_returns_200():
    """Health endpoint must return HTTP 200."""
    from src.main import app
    client = TestClient(app)
    response = client.get("/health")
    assert response.status_code == 200


def test_health_endpoint_returns_json_status():
    """Health endpoint must return JSON with status: ok."""
    from src.main import app
    client = TestClient(app)
    response = client.get("/health")
    data = response.json()
    assert data["status"] == "ok"


def test_health_endpoint_returns_project_name():
    """Health endpoint must identify the project."""
    from src.main import app
    client = TestClient(app)
    response = client.get("/health")
    data = response.json()
    assert "project" in data
    assert "hallucination" in data["project"].lower()
