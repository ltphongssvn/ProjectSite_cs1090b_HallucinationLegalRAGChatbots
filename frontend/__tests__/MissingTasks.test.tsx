import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import HomePage from '../app/page'

describe('Missing Coding Tasks', () => {
  // Sprint 2
  it('renders spaCy pipeline setup task', () => {
    render(<HomePage />)
    expect(screen.getAllByText(/spaCy/i).length).toBeGreaterThanOrEqual(1)
  })

  it('renders chunk metadata task', () => {
    render(<HomePage />)
    expect(screen.getAllByText(/court_id|chunk_index/i).length).toBeGreaterThanOrEqual(1)
  })

  // Sprint 3
  it('renders BGE-M3 fine-tuning task', () => {
    render(<HomePage />)
    expect(screen.getAllByText(/BGE-M3 fine-tuning|MultipleNegativesRankingLoss/i).length).toBeGreaterThanOrEqual(1)
  })

  it('renders nprobe IVF validation task', () => {
    render(<HomePage />)
    expect(screen.getAllByText(/nprobe/i).length).toBeGreaterThanOrEqual(1)
  })

  // Sprint 4
  it('renders hard negative mining task', () => {
    render(<HomePage />)
    expect(screen.getAllByText(/Hard-negative mining|hard.negative/i).length).toBeGreaterThanOrEqual(1)
  })

  it('renders RAG generation task', () => {
    render(<HomePage />)
    expect(screen.getAllByText(/Qwen2.5|104,385/i).length).toBeGreaterThanOrEqual(1)
  })

  // Sprint 5
  it('renders training size ablation task', () => {
    render(<HomePage />)
    expect(screen.getAllByText(/100K vs 500K vs 1M/i).length).toBeGreaterThanOrEqual(1)
  })

  it('renders chunk overlap ablation task', () => {
    render(<HomePage />)
    expect(screen.getAllByText(/64.*overlap|overlap.*64/i).length).toBeGreaterThanOrEqual(1)
  })

  it('renders ruff and mypy linting task', () => {
    render(<HomePage />)
    expect(screen.getAllByText(/ruff|mypy/i).length).toBeGreaterThanOrEqual(1)
  })

  it('renders pip-audit SBOM CI task', () => {
    render(<HomePage />)
    expect(screen.getAllByText(/pip-audit|SBOM/i).length).toBeGreaterThanOrEqual(1)
  })
})
