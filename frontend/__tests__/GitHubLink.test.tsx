import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import HomePage from '../app/page'

describe('GitHub Link', () => {
  it('renders GitHub link in group card', () => {
    render(<HomePage />)
    const link = screen.getByRole('link', { name: /github/i })
    expect(link).toBeInTheDocument()
  })

  it('GitHub link points to correct repo', () => {
    render(<HomePage />)
    const link = screen.getByRole('link', { name: /github/i })
    expect(link).toHaveAttribute('href', 'https://github.com/ltphongssvn/cs1090b_HallucinationLegalRAGChatbots')
  })

  it('GitHub link opens in new tab', () => {
    render(<HomePage />)
    const link = screen.getByRole('link', { name: /github/i })
    expect(link).toHaveAttribute('target', '_blank')
  })
})
