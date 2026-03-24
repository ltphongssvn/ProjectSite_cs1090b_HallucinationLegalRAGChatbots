import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Navbar from '../app/components/Navbar'

describe('Navbar', () => {
  it('renders site name', () => {
    render(<Navbar />)
    expect(screen.getByText(/Legal RAG|CS1090B/i)).toBeInTheDocument()
  })

  it('renders Research Question link', () => {
    render(<Navbar />)
    expect(screen.getByRole('link', { name: /research question/i })).toBeInTheDocument()
  })

  it('renders Methodology link', () => {
    render(<Navbar />)
    expect(screen.getByRole('link', { name: /methodology/i })).toBeInTheDocument()
  })

  it('renders Architectures link', () => {
    render(<Navbar />)
    expect(screen.getByRole('link', { name: /architectures/i })).toBeInTheDocument()
  })

  it('renders Results Dashboard link', () => {
    render(<Navbar />)
    expect(screen.getByRole('link', { name: /results/i })).toBeInTheDocument()
  })

  it('renders Demo link', () => {
    render(<Navbar />)
    expect(screen.getByRole('link', { name: /demo/i })).toBeInTheDocument()
  })
})
