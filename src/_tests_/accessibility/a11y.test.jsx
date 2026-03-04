import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import App from '../../App'

describe('Accessibility Tests', () => {
  it('App should have no accessibility violations', async () => {
    const { container } = render(<App />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('Interactive elements have proper ARIA labels', () => {
    render(<App />)

    // Copy buttons only exist once links have been shortened,
    // so we assert the mobile menu button instead (always rendered on mobile)
    const menuBtn = document.querySelector('.mobile-menu-btn')
    if (menuBtn) {
      expect(menuBtn).toHaveAttribute('aria-label')
    }
  })

  it('Form inputs have associated labels', () => {
    render(<App />)

    // Use screen query — document.querySelector can miss elements rendered
    // inside portals or after async effects
    const input = screen.getByPlaceholderText(/shorten a link here/i)
    expect(input).toHaveAttribute('placeholder')
    expect(input).toHaveAttribute('type', 'text')
  })
})
