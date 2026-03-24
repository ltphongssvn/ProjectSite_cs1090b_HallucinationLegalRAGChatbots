import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import HomePage from '../app/page'

describe('Header', () => {
  it('renders course code and title', () => {
    render(<HomePage />)
    expect(screen.getByText(/COMPSCI 1090B/i)).toBeInTheDocument()
  })

  it('renders project group number', () => {
    render(<HomePage />)
    expect(screen.getByText(/Project Group - #43/i)).toBeInTheDocument()
  })

  it('renders author name', () => {
    render(<HomePage />)
    expect(screen.getByText(/PHONG LE/i)).toBeInTheDocument()
  })
})
