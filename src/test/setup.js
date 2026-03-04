import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'
import { toHaveNoViolations } from 'jest-axe'
import { expect } from 'vitest'

expect.extend(toHaveNoViolations)

afterEach(() => {
  cleanup()
})

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
}
globalThis.localStorage = localStorageMock

// Mock clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn().mockResolvedValue(undefined),
  },
})

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock IntersectionObserver as a proper class constructor.
// framer-motion calls `new IntersectionObserver(callback)` internally.
// vi.fn() produces an arrow function which cannot be invoked with `new`,
// causing "is not a constructor". A class satisfies the `new` contract.
class IntersectionObserverMock {
  constructor(_callback) {}
  observe()    {}
  unobserve()  {}
  disconnect() {}
  root         = null
  rootMargin   = ''
  thresholds   = []
}

globalThis.IntersectionObserver = IntersectionObserverMock
window.IntersectionObserver     = IntersectionObserverMock