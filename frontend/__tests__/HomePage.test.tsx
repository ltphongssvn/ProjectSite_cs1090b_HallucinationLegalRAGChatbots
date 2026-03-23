/**
 * TDD - Red phase: defines contract for HomePage component.
 * Tests written FIRST before any source implementation.
 */
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import HomePage from '../app/page'

describe('HomePage', () => {
  it('renders the project title', () => {
    render(<HomePage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /Hallucination.*Legal RAG/i
    )
  })

  it('renders all 4 milestone cards', () => {
    render(<HomePage />)
    expect(screen.getAllByTestId('milestone-card')).toHaveLength(4)
  })

  it('renders milestone 1 with correct due date', () => {
    render(<HomePage />)
    expect(screen.getByText(/March 24/i)).toBeInTheDocument()
  })

  it('renders milestone 4 as final deliverable', () => {
    render(<HomePage />)
    expect(screen.getByText(/May 12/i)).toBeInTheDocument()
  })

  it('renders project sprint timeline section', () => {
    render(<HomePage />)
    expect(screen.getByTestId('sprint-timeline')).toBeInTheDocument()
  })
})
