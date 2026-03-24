import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import EnvironmentPage from '../app/environment/page'

describe('Environment Page', () => {
  it('renders heading', () => {
    render(<EnvironmentPage />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders setup.sh bootstrap output section', () => {
    render(<EnvironmentPage />)
    expect(screen.getByTestId('setup-sh-output')).toBeInTheDocument()
  })

  it('renders GPU info', () => {
    render(<EnvironmentPage />)
    expect(screen.getAllByText(/NVIDIA L4/i).length).toBeGreaterThanOrEqual(1)
  })

  it('renders Python version', () => {
    render(<EnvironmentPage />)
    expect(screen.getAllByText(/3\.11\.9/i).length).toBeGreaterThanOrEqual(1)
  })

  it('renders verified environment section from Cell 1', () => {
    render(<EnvironmentPage />)
    expect(screen.getByTestId('cell1-env')).toBeInTheDocument()
  })

  it('renders dataset summary from Cell 2', () => {
    render(<EnvironmentPage />)
    expect(screen.getByTestId('cell2-dataset')).toBeInTheDocument()
  })

  it('renders 1465484 total cases in dataset summary', () => {
    render(<EnvironmentPage />)
    expect(screen.getAllByText(/1,465,484/i).length).toBeGreaterThanOrEqual(1)
  })

  it('renders all setup steps passed', () => {
    render(<EnvironmentPage />)
    expect(screen.getAllByText(/PASS/i).length).toBeGreaterThanOrEqual(1)
  })
})
