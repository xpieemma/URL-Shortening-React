import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Shortener from '../../components/Shortener'
import * as api from '../../services/api'

// Mock the entire api module
vi.mock('../../services/api', () => ({
  shortUrl: vi.fn()
}))

describe('Shortener Component', () => {
  const mockOnLinkShortened = vi.fn()
  const user = userEvent.setup()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders input and button', () => {
    render(<Shortener onLinkShortened={mockOnLinkShortened} />)
    
    expect(screen.getByPlaceholderText(/shorten a link here/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /shorten it!/i })).toBeInTheDocument()
  })

  it('shows error when submitting empty input', async () => {
    render(<Shortener onLinkShortened={mockOnLinkShortened} />)
    
    const submitButton = screen.getByRole('button', { name: /shorten it!/i })
    await user.click(submitButton)
    
    expect(screen.getByText(/please add a link/i)).toBeInTheDocument()
    expect(mockOnLinkShortened).not.toHaveBeenCalled()
  })

  it('shows error for invalid URL', async () => {
    render(<Shortener onLinkShortened={mockOnLinkShortened} />)
    
    const input = screen.getByPlaceholderText(/shorten a link here/i)
    const submitButton = screen.getByRole('button', { name: /shorten it!/i })
    
    await user.type(input, 'not-a-url')
    await user.click(submitButton)
    
    expect(await screen.findByText(/please enter a valid url/i)).toBeInTheDocument()
    expect(mockOnLinkShortened).not.toHaveBeenCalled()
  })

  it('successfully shortens valid URL', async () => {
    const mockShortenedUrl = 'https://bit.ly/abc123'
    api.shortUrl.mockResolvedValue(mockShortenedUrl)
    
    render(<Shortener onLinkShortened={mockOnLinkShortened} />)
    
    const input = screen.getByPlaceholderText(/shorten a link here/i)
    const submitButton = screen.getByRole('button', { name: /shorten it!/i })
    
    await user.type(input, 'https://example.com')
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(api.shortUrl).toHaveBeenCalledWith('https://example.com')
      expect(mockOnLinkShortened).toHaveBeenCalledWith(
        expect.objectContaining({
          original: 'https://example.com',
          shortened: mockShortenedUrl
        })
      )
    })
  })

  it('adds https:// when missing', async () => {
    const mockShortenedUrl = 'https://bit.ly/abc123'
    api.shortUrl.mockResolvedValue(mockShortenedUrl)
    
    render(<Shortener onLinkShortened={mockOnLinkShortened} />)
    
    const input = screen.getByPlaceholderText(/shorten a link here/i)
    const submitButton = screen.getByRole('button', { name: /shorten it!/i })
    
    await user.type(input, 'example.com')
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(api.shortUrl).toHaveBeenCalledWith('https://example.com')
    })
  })

  it('shows loading state during API call', async () => {
    api.shortUrl.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)))
    
    render(<Shortener onLinkShortened={mockOnLinkShortened} />)
    
    const input = screen.getByPlaceholderText(/shorten a link here/i)
    const submitButton = screen.getByRole('button', { name: /shorten it!/i })
    
    await user.type(input, 'https://example.com')
    await user.click(submitButton)
    
    expect(screen.getByText(/shortening/i)).toBeInTheDocument()
    expect(submitButton).toBeDisabled()
    
    await waitFor(() => {
      expect(screen.queryByText(/shortening/i)).not.toBeInTheDocument()
    })
  })

  it('handles API errors gracefully', async () => {
    api.shortUrl.mockRejectedValue(new Error('API Error'))
    
    render(<Shortener onLinkShortened={mockOnLinkShortened} />)
    
    const input = screen.getByPlaceholderText(/shorten a link here/i)
    const submitButton = screen.getByRole('button', { name: /shorten it!/i })
    
    await user.type(input, 'https://example.com')
    await user.click(submitButton)
    
    expect(await screen.findByText(/api error/i)).toBeInTheDocument()
    expect(mockOnLinkShortened).not.toHaveBeenCalled()
  })
})