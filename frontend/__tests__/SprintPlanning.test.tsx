/**
 * TDD - contract for Sprint Planning homepage.
 */
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import HomePage from '../app/page'

describe('Sprint Planning Homepage', () => {
  it('renders sprint planning section', () => {
    render(<HomePage />)
    expect(screen.getByTestId('sprint-planning')).toBeInTheDocument()
  })

  it('renders at least 4 sprints', () => {
    render(<HomePage />)
    expect(screen.getAllByTestId('sprint-card').length).toBeGreaterThanOrEqual(4)
  })

  it('renders environment bootstrap task in sprint 1', () => {
    render(<HomePage />)
    expect(screen.getByTestId('sprint-1')).toHaveTextContent(/environment|bootstrap/i)
  })

  it('renders LePaRD acquisition task', () => {
    render(<HomePage />)
    expect(screen.getAllByText(/LePaRD/i).length).toBeGreaterThanOrEqual(1)
  })

  it('renders BM25 indexing task', () => {
    render(<HomePage />)
    expect(screen.getAllByText(/BM25/i).length).toBeGreaterThanOrEqual(1)
  })

  it('renders BGE-M3 dense retrieval task', () => {
    render(<HomePage />)
    expect(screen.getAllByText(/BGE-M3/i).length).toBeGreaterThanOrEqual(1)
  })

  it('renders evaluation task with NLI', () => {
    render(<HomePage />)
    expect(screen.getAllByText(/NLI|DeBERTa/i).length).toBeGreaterThanOrEqual(1)
  })

  it('renders W&B experiment tracking task', () => {
    render(<HomePage />)
    expect(screen.getAllByText(/W&B|wandb/i).length).toBeGreaterThanOrEqual(1)
  })

  it('each sprint card shows status badge', () => {
    render(<HomePage />)
    const cards = screen.getAllByTestId('sprint-card')
    cards.forEach(card => {
      expect(card.querySelector('[data-testid="status-badge"]')).not.toBeNull()
    })
  })

  it('renders pipeline status section', () => {
    render(<HomePage />)
    expect(screen.getByTestId('pipeline-status')).toBeInTheDocument()
  })
})
