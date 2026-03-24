import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import HomePage from '../app/page'

describe('TF Reviewer Comments & Responses', () => {
  it('renders reviewer response section as first prominent section', () => {
    render(<HomePage />)
    expect(screen.getByTestId('reviewer-response')).toBeInTheDocument()
  })

  it('renders TF reviewer concern about human annotation', () => {
    render(<HomePage />)
    expect(screen.getAllByText(/human.annot|annotation/i).length).toBeGreaterThanOrEqual(1)
  })

  it('renders instructor warning about feasibility', () => {
    render(<HomePage />)
    expect(screen.getAllByText(/feasib/i).length).toBeGreaterThanOrEqual(1)
  })

  it('renders response addressing LePaRD as annotation source', () => {
    render(<HomePage />)
    expect(screen.getAllByText(/LePaRD/i).length).toBeGreaterThanOrEqual(1)
  })

  it('renders response addressing embedding model training', () => {
    render(<HomePage />)
    expect(screen.getAllByText(/MultipleNegativesRankingLoss|embedding.*train|train.*embed/i).length).toBeGreaterThanOrEqual(1)
  })

  it('renders DeBERTa NLI as automated hallucination measurement', () => {
    render(<HomePage />)
    expect(screen.getAllByText(/DeBERTa|NLI/i).length).toBeGreaterThanOrEqual(1)
  })
})
