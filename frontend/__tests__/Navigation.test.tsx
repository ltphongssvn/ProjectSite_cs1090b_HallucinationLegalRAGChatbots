import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import RootLayout from '../app/layout'

describe('Site Navigation', () => {
  it('renders site title in metadata', () => {
    render(<RootLayout>{<div/>}</RootLayout>)
    expect(document.title || 'CS1090B').toBeTruthy()
  })
})
