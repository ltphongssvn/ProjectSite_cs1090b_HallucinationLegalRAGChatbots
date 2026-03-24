import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import EnvironmentPage from '../app/environment/page'

describe('Environment Page', () => {
  it('renders heading', () => {
    render(<EnvironmentPage />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders setup.sh screenshot', () => {
    render(<EnvironmentPage />)
    expect(screen.getByAltText(/setup\.sh bootstrap/i)).toBeInTheDocument()
  })

  it('renders Cell 1 screenshot', () => {
    render(<EnvironmentPage />)
    expect(screen.getByAltText(/cell 1/i)).toBeInTheDocument()
  })

  it('renders Cell 2 screenshot', () => {
    render(<EnvironmentPage />)
    expect(screen.getByAltText(/cell 2/i)).toBeInTheDocument()
  })

  it('renders downloadable setup.sh link', () => {
    render(<EnvironmentPage />)
    const link = screen.getByRole('link', { name: /download setup\.sh/i })
    expect(link).toHaveAttribute('href', '/environment/setup_sh.txt')
    expect(link).toHaveAttribute('download')
  })
})
