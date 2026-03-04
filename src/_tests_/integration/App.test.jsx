import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../../App'
import { shortUrl } from '../../services/api'  // ← correct export name

vi.mock('../../services/api', () => ({
  shortUrl: vi.fn()  // ← correct export name
}))

describe('App Integration', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('complete user flow: shorten URL, copy, persist after refresh', async () => {
    const mockShortenedUrl = 'https://bit.ly/abc123'
    shortUrl.mockResolvedValue(mockShortenedUrl)

    render(<App />)

    const input = screen.getByPlaceholderText(/shorten a link here/i)
    const submitButton = screen.getByRole('button', { name: /shorten it!/i })

    await user.type(input, 'https://example.com')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('https://example.com')).toBeInTheDocument()
    })

    const copyButton = screen.getByRole('button', { name: /copy/i })
    await user.click(copyButton)

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i })).toBeInTheDocument()
    })

    const stored = JSON.parse(localStorage.getItem('shortenedLinks'))
    expect(stored).toHaveLength(1)
    expect(stored[0].original).toBe('https://example.com')
    expect(stored[0].shortened).toBe(mockShortenedUrl)

    // Simulate refresh by remounting
    const { unmount } = render(<App />)
    unmount()

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('https://example.com')).toBeInTheDocument()
    })
  })

  it('handles multiple URL shortening', async () => {
    shortUrl
      .mockResolvedValueOnce('https://bit.ly/abc123')
      .mockResolvedValueOnce('https://bit.ly/def456')

    render(<App />)

    const input = screen.getByPlaceholderText(/shorten a link here/i)
    const submitButton = screen.getByRole('button', { name: /shorten it!/i })

    await user.type(input, 'https://example1.com')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('https://example1.com')).toBeInTheDocument()
    })

    await user.clear(input)
    await user.type(input, 'https://example2.com')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('https://example2.com')).toBeInTheDocument()
    })

    const links = screen.getAllByText(/https:\/\/example\d\.com/)
    expect(links[0]).toHaveTextContent('https://example2.com')
    expect(links[1]).toHaveTextContent('https://example1.com')
  })

  it('shows error and allows retry after failed shortening', async () => {
    shortUrl
      .mockRejectedValueOnce(new Error('API Error'))
      .mockResolvedValueOnce('https://bit.ly/abc123')

    render(<App />)

    const input = screen.getByPlaceholderText(/shorten a link here/i)
    const submitButton = screen.getByRole('button', { name: /shorten it!/i })

    await user.type(input, 'https://example.com')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/api error/i)).toBeInTheDocument()
    })

    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('https://example.com')).toBeInTheDocument()
    })
  })

  it('mobile menu works on small screens', async () => {
    // Set innerWidth BEFORE rendering so the component initialises in mobile mode
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    })

    render(<App />)

    const menuButton = screen.getByRole('button', { name: /menu/i })
    expect(menuButton).toBeInTheDocument()

    await user.click(menuButton)

    expect(screen.getByText('Features')).toBeInTheDocument()
    expect(screen.getByText('Pricing')).toBeInTheDocument()
    expect(screen.getByText('Resources')).toBeInTheDocument()
    expect(screen.getByText('Login')).toBeInTheDocument()
    expect(screen.getByText('Sign Up')).toBeInTheDocument()
  })
})
