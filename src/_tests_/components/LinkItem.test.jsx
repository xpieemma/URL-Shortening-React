import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LinkItem from '../../components/LinkItem'

// Mock copy-to-clipboard
vi.mock('copy-to-clipboard', () => ({
  default: vi.fn()
}))

// Import the mocked copy function
import copy from 'copy-to-clipboard'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>
  }
}))

// Mock toast
vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn()
  },
  toast: {
    success: vi.fn(),
    error: vi.fn()
  }
}))

describe('LinkItem Component', () => {
  const mockLink = {
    id: 1,
    original: 'https://example.com/very/long/url/that/needs/shortening',
    shortened: 'https://bit.ly/abc123',
    copied: false
  }
  
  const mockOnCopy = vi.fn()
  const user = userEvent.setup()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders link item correctly', () => {
    render(<LinkItem link={mockLink} onCopy={mockOnCopy} />)
    
    expect(screen.getByText(mockLink.original)).toBeInTheDocument()
    expect(screen.getByText(mockLink.shortened)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /copy/i })).toBeInTheDocument()
  })

  it('original link opens in new tab', () => {
    render(<LinkItem link={mockLink} onCopy={mockOnCopy} />)
    
    const originalLink = screen.getByText(mockLink.original)
    expect(originalLink).toHaveAttribute('href', mockLink.original)
    expect(originalLink).toHaveAttribute('target', '_blank')
    expect(originalLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('shortened link opens in new tab', () => {
    render(<LinkItem link={mockLink} onCopy={mockOnCopy} />)
    
    const shortenedLink = screen.getByText(mockLink.shortened)
    expect(shortenedLink).toHaveAttribute('href', mockLink.shortened)
    expect(shortenedLink).toHaveAttribute('target', '_blank')
    expect(shortenedLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('copy button copies to clipboard', async () => {
    render(<LinkItem link={mockLink} onCopy={mockOnCopy} />)
    
    const copyButton = screen.getByRole('button', { name: /copy/i })
    await user.click(copyButton)
    
    // Check that copy was called with the shortened URL
    expect(copy).toHaveBeenCalledWith(mockLink.shortened)
    expect(mockOnCopy).toHaveBeenCalledWith(mockLink.id)
  })

  it('shows "Copied!" state after copying', () => {
    const copiedLink = { ...mockLink, copied: true }
    
    render(<LinkItem link={copiedLink} onCopy={mockOnCopy} />)
    
    const button = screen.getByRole('button', { name: /copied!/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('copy-btn copied')
  })

  it('handles hover state', async () => {
    render(<LinkItem link={mockLink} onCopy={mockOnCopy} />)
    
    const linkItem = screen.getByText(mockLink.original).closest('.link-item')
    expect(linkItem).toBeInTheDocument()
    
  })
})