# SECURITY.md
# Security Best Practices
# Project: CS1090B — Reducing Hallucination in Legal RAG Chatbots
# Stack: FastAPI (Python 3.11.9) backend + Next.js 16.2 frontend + Docker

## Secret Management

### Pre-commit Secret Detection
```bash
uv run detect-secrets scan > .secrets.baseline
uv run pre-commit install
uv run pre-commit install --hook-type pre-push
```

### Environment Variables Required
Create `.env` (never commit):
```bash
# FastAPI
PORT=8000
ENVIRONMENT=development

# Database (Phase 2)
# DATABASE_URL=postgresql://user:pass@localhost:5432/db  # pragma: allowlist secret

# HuggingFace (if demo endpoint added)
# HF_TOKEN=your_token_here  # pragma: allowlist secret
```

## Security Measures

| Layer | Tool/Practice | Purpose |
|-------|--------------|---------|
| Secret Detection | detect-secrets + pre-commit | Prevent secrets in codebase |
| .env Protection | check-env-files hook | Block .env from commits |
| Binary Blocking | block-large-files hook | Prevent .h5/.pkl/.pth/.onnx accidental commit |
| Input Validation | FastAPI + Pydantic | Validate all request payloads |
| CORS | FastAPI CORSMiddleware | Restrict origins (open in dev, restrict in prod) |
| Type Safety | TypeScript strict mode | Catch frontend errors at compile time |
| Test Coverage | pytest + vitest (80% min) | Enforced via pre-push hooks |
| Docker Isolation | Multi-stage Dockerfile | Minimal production image |

## Pre-commit Workflow

Every commit automatically:
1. Scans for secrets (detect-secrets)
2. Blocks .env files
3. Blocks large binary files
4. Validates JSON/YAML
5. Fixes line endings and whitespace
6. Runs pytest quick tests (backend)

Every push automatically:
1. Runs pytest with 80% coverage enforcement

## Team Guidelines
- Never commit `.env` files
- Run `uv run pre-commit install && uv run pre-commit install --hook-type pre-push` after cloning
- Review `.secrets.baseline` changes carefully
- Rotate any accidentally exposed keys immediately
- Restrict CORS origins before production deployment

## Dependency Audit
```bash
uv run pip-audit          # Python vulnerabilities
cd frontend && npm audit   # JS vulnerabilities
```

## Verification
```bash
uv run pre-commit run --all-files
uv run pytest --cov=src --cov-fail-under=80
```
