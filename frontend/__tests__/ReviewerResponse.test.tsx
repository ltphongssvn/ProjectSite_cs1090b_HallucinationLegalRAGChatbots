import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import HomePage from '../app/page'

describe('TF Reviewer Comments & Responses', () => {
  it('renders reviewer response section', () => {
    render(<HomePage />)
    expect(screen.getByTestId('reviewer-response')).toBeInTheDocument()
  })

  it('renders TF Reviewer concern label', () => {
    render(<HomePage />)
    expect(screen.getAllByText(/TF Reviewer/i).length).toBeGreaterThanOrEqual(1)
  })

  it('renders Instructor concern label', () => {
    render(<HomePage />)
    expect(screen.getAllByText(/Instructor/i).length).toBeGreaterThanOrEqual(1)
  })

  it('renders Tier A bullet', () => {
    render(<HomePage />)
    expect(screen.getAllByText(/Tier A/i).length).toBeGreaterThanOrEqual(1)
  })

  it('renders Tier B bullet', () => {
    render(<HomePage />)
    expect(screen.getAllByText(/Tier B/i).length).toBeGreaterThanOrEqual(1)
  })

  it('renders Tier C bullet', () => {
    render(<HomePage />)
    expect(screen.getAllByText(/Tier C/i).length).toBeGreaterThanOrEqual(1)
  })

  it('renders embedding training detail', () => {
    render(<HomePage />)
    expect(screen.getAllByText(/MultipleNegativesRankingLoss/i).length).toBeGreaterThanOrEqual(1)
  })

  it('renders feasibility confirmed bullet', () => {
    render(<HomePage />)
    expect(screen.getAllByText(/feasib/i).length).toBeGreaterThanOrEqual(1)
  })

  it('renders sequential model loading bullet', () => {
    render(<HomePage />)
    expect(screen.getAllByText(/sequential/i).length).toBeGreaterThanOrEqual(1)
  })

  it('renders priority sequencing bullet', () => {
    render(<HomePage />)
    expect(screen.getAllByText(/LePaRD/i).length).toBeGreaterThanOrEqual(1)
  })
})
