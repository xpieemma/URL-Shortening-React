import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import LinkList from '../../components/LinkList'

describe('LinkList Component', () => {
  const mockLinks = [
    {
      id: 1,
      original: 'https://example1.com',
      shortened: 'https://bit.ly/abc123',
      copied: false
    },
    {
      id: 2,
      original: 'https://example2.com',
      shortened: 'https://bit.ly/def456',
      copied: false
    }
  ]
  
  const mockOnCopy = vi.fn()

  it('renders nothing when links array is empty', () => {
    const { container } = render(<LinkList links={[]} onCopy={mockOnCopy} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders all links', () => {
    render(<LinkList links={mockLinks} onCopy={mockOnCopy} />)
    
    expect(screen.getByText('https://example1.com')).toBeInTheDocument()
    expect(screen.getByText('https://bit.ly/abc123')).toBeInTheDocument()
    expect(screen.getByText('https://example2.com')).toBeInTheDocument()
    expect(screen.getByText('https://bit.ly/def456')).toBeInTheDocument()
  })

  it('renders correct number of LinkItem components', () => {
    const { container } = render(<LinkList links={mockLinks} onCopy={mockOnCopy} />)
    
    const linkItems = container.querySelectorAll('.link-item')
    expect(linkItems).toHaveLength(2)
  })
})