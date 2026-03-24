import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

describe('Site Pages exist', () => {
  it('research question page renders heading', async () => {
    const { default: Page } = await import('../app/research-question/page')
    render(<Page />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('methodology page renders heading', async () => {
    const { default: Page } = await import('../app/methodology/page')
    render(<Page />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('architectures page renders heading', async () => {
    const { default: Page } = await import('../app/architectures/page')
    render(<Page />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('datasets page renders heading', async () => {
    const { default: Page } = await import('../app/datasets/page')
    render(<Page />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('reproducibility page renders heading', async () => {
    const { default: Page } = await import('../app/reproducibility/page')
    render(<Page />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('results page renders heading', async () => {
    const { default: Page } = await import('../app/results/page')
    render(<Page />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('demo page renders heading', async () => {
    const { default: Page } = await import('../app/demo/page')
    render(<Page />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('ethics page renders heading', async () => {
    const { default: Page } = await import('../app/ethics/page')
    render(<Page />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })
})
