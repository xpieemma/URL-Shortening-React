import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

// Custom render with userEvent setup
export function setup(jsx) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  }
}

// Re-export everything
export * from '@testing-library/react'
export { userEvent }
export { vi }