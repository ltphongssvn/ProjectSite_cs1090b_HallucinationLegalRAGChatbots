import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import HomePage from '../app/page'

describe('Header Revised', () => {
  it('renders revised group label with dash', () => {
    render(<HomePage />)
    expect(screen.getByText(/Project Group - #43/i)).toBeInTheDocument()
  })

  it('renders semester info', () => {
    render(<HomePage />)
    expect(screen.getByText(/2025-2026 Spring/i)).toBeInTheDocument()
  })
})
