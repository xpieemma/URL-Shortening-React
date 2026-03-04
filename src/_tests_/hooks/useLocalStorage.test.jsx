import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useLocalStorage } from '../../hooks/useLocalStorage'

describe('useLocalStorage Hook', () => {
  beforeEach(() => {
    // Clear all mocks
    vi.clearAllMocks()
    
    // Properly mock localStorage methods
    const localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
      length: 0,
      key: vi.fn(),
    }
    
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true
    })
  })

  it('should initialize with initial value when storage is empty', () => {
    window.localStorage.getItem.mockReturnValue(null)
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))
    
    expect(result.current[0]).toBe('initial')
    expect(window.localStorage.getItem).toHaveBeenCalledWith('test-key')
  })

  it('should load existing value from localStorage', () => {
    window.localStorage.getItem.mockReturnValue(JSON.stringify('stored value'))
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))
    
    expect(result.current[0]).toBe('stored value')
    expect(window.localStorage.getItem).toHaveBeenCalledWith('test-key')
  })

  it('should update localStorage when value changes', () => {
    window.localStorage.getItem.mockReturnValue(null)
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))
    
    act(() => {
      result.current[1]('updated value')
    })
    
    expect(window.localStorage.setItem).toHaveBeenCalledWith('test-key', JSON.stringify('updated value'))
    expect(result.current[0]).toBe('updated value')
  })

  it('should handle complex objects', () => {
    window.localStorage.getItem.mockReturnValue(null)
    
    const initial = [{ id: 1, url: 'test.com' }]
    const { result } = renderHook(() => useLocalStorage('test-key', initial))
    
    const newLink = { id: 2, url: 'example.com' }
    
    act(() => {
      result.current[1]([...result.current[0], newLink])
    })
    
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'test-key', 
      JSON.stringify([...initial, newLink])
    )
  })

  it('should handle localStorage errors gracefully', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    // Mock localStorage.getItem to throw error
    window.localStorage.getItem.mockImplementation(() => {
      throw new Error('Storage error')
    })
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'))
    
    expect(result.current[0]).toBe('default')
    expect(consoleSpy).toHaveBeenCalled()
    
    consoleSpy.mockRestore()
  })

  it('removeItem should clear storage', () => {
    window.localStorage.getItem.mockReturnValue(null)
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))
    
    act(() => {
      result.current[2]() // removeItem
    })
    
    expect(window.localStorage.removeItem).toHaveBeenCalledWith('test-key')
  })
})