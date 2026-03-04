import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import axios from 'axios'
import { shortenUrlDelay, shortenUrlBitly, urlViaProxy } from '../../services/api'

vi.mock('axios')

describe('API Services', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('shortenUrlDelay', () => {
    it('should return a shortened URL after delay', async () => {
      const startTime = Date.now()
      const result = await shortenUrlDelay()
      const endTime = Date.now()

      expect(endTime - startTime).toBeGreaterThanOrEqual(1000)
      expect(result).toMatch(/^https:\/\/bit\.ly\/[a-z0-9]{6}$/)
    })

    it('should generate different short codes', async () => {
      const result1 = await shortenUrlDelay()
      const result2 = await shortenUrlDelay()
      expect(result1).not.toBe(result2)
    })
  })

  describe('shortenUrlBitly', () => {
    const mockLongUrl = 'https://example.com'
    const mockShortUrl = 'https://bit.ly/abc123'
    const mockToken = 'mock-token-123'
    const mockGroupGuid = 'mock-group-456'
    const mockApiUrl = 'https://api-ssl.bitly.com/v4/shorten'

    beforeEach(() => {
      vi.stubEnv('VITE_BITLY_TOKEN', mockToken)
      vi.stubEnv('VITE_BITLY_GROUP_GUID', mockGroupGuid)
      vi.stubEnv('VITE_BITLY_API_URL', mockApiUrl)
    })

    afterEach(() => {
      vi.unstubAllEnvs()
    })

    it('should successfully shorten URL', async () => {
      axios.post.mockResolvedValue({
        data: { link: mockShortUrl }
      })

      const result = await shortenUrlBitly(mockLongUrl)

      expect(axios.post).toHaveBeenCalledTimes(1)
      expect(axios.post).toHaveBeenCalledWith(
        mockApiUrl,
        {
          group_guid: mockGroupGuid,
          domain: 'bit.ly',
          long_url: mockLongUrl
        },
        {
          headers: {
            // Matches api.js exactly: lowercase 'content-Type'
            'Authorization': `Bearer ${mockToken}`,
            'content-Type': 'application/json'
          }
        }
      )
      expect(result).toBe(mockShortUrl)
    })

    it('should handle API errors with response', async () => {
      axios.post.mockRejectedValue({
        response: {
          data: { message: 'API Error' }
        }
      })

      await expect(shortenUrlBitly(mockLongUrl)).rejects.toThrow('API Error')
    })

    it('should fall back to default message when response has no message', async () => {
      axios.post.mockRejectedValue({
        response: { data: {} }
      })

      await expect(shortenUrlBitly(mockLongUrl)).rejects.toThrow('Failed to shorten URL')
    })

    it('should handle network errors with no response', async () => {
      axios.post.mockRejectedValue({
        request: {}
      })

      // Matches api.js exactly: 'reponse' typo is intentional here to mirror the source
      await expect(shortenUrlBitly(mockLongUrl)).rejects.toThrow(
        'No response from server. Please check your internet connection.'
      )
    })

    it('should handle generic errors with no request or response', async () => {
      axios.post.mockRejectedValue(new Error('Network error'))

      // Matches api.js: falls through to final throw
      await expect(shortenUrlBitly(mockLongUrl)).rejects.toThrow('An unknown error occurred.')
    })
  })

  describe('urlViaProxy', () => {
    const mockLongUrl = 'https://example.com'
    const mockShortUrl = 'https://bit.ly/proxy123'

    it('should successfully shorten URL via proxy', async () => {
      axios.post.mockResolvedValue({
        data: { link: mockShortUrl }
      })

      const result = await urlViaProxy(mockLongUrl)

      expect(result).toBe(mockShortUrl)
      expect(axios.post).toHaveBeenCalledTimes(1)
      expect(axios.post).toHaveBeenCalledWith(
        '/api/shorten',
        // Matches api.js: shorthand { Url } — capital U
        { Url: mockLongUrl }
        // No third argument: urlViaProxy does not pass a config object
      )
    })

    it('should handle proxy errors with a message in response data', async () => {
      axios.post.mockRejectedValue({
        response: {
          data: { message: 'Proxy error' }
        }
      })

      await expect(urlViaProxy(mockLongUrl)).rejects.toThrow('Proxy error')
    })

    it('should handle proxy errors without response data message', async () => {
      axios.post.mockRejectedValue({
        response: { data: {} }
      })

      await expect(urlViaProxy(mockLongUrl)).rejects.toThrow('Failed to shorten URL')
    })

    it('should handle network errors', async () => {
      axios.post.mockRejectedValue(new Error('Network error'))

      await expect(urlViaProxy(mockLongUrl)).rejects.toThrow('Failed to shorten URL')
    })
  })
})