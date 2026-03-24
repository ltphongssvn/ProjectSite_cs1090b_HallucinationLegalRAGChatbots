import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Navbar from '../app/components/Navbar'

describe('Navigation', () => {
  it('renders home link', () => {
    render(<Navbar />)
    expect(screen.getByRole('link', { name: /Legal RAG|CS1090B/i })).toBeInTheDocument()
  })
})
