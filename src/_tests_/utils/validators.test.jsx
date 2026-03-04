import { describe, it, expect } from 'vitest'
import { validateAPI, validateEmptyInput } from '../../utils/validators'

describe('Validator Utilities', () => {
  describe('validateAPI', () => {

    it('should return true for valid http URLs', () => {
      expect(validateAPI('http://example.com')).toBe(true)
      expect(validateAPI('http://www.example.com')).toBe(true)
      expect(validateAPI('http://example.com/path')).toBe(true)
      expect(validateAPI('http://example.com?query=1')).toBe(true)
    })

    it('should return true for valid https URLs', () => {
      expect(validateAPI('https://example.com')).toBe(true)
      expect(validateAPI('https://www.example.com')).toBe(true)
      expect(validateAPI('https://example.com/path')).toBe(true)
      expect(validateAPI('https://example.com?query=1')).toBe(true)
    })

    it('should return true for URLs with subdomains', () => {
      expect(validateAPI('https://sub.example.com')).toBe(true)
      expect(validateAPI('https://sub.sub.example.com')).toBe(true)
    })

    it('should return true for URLs with ports', () => {
      expect(validateAPI('https://example.com:8080')).toBe(true)
      expect(validateAPI('http://localhost:3000')).toBe(false) // localhost has no TLD
    })

    it('should return true for short but valid domains', () => {
      expect(validateAPI('https://t.co')).toBe(true)
      expect(validateAPI('https://go.gl')).toBe(true)
    })

    // --- The key new cases ---

    it('should reject bare words with no TLD', () => {
      expect(validateAPI('https://aaa')).toBe(false)
      expect(validateAPI('https://bbb')).toBe(false)
      expect(validateAPI('https://localhost')).toBe(false)
      expect(validateAPI('http://test')).toBe(false)
    })

    it('should reject dot-only or near-empty hostnames', () => {
      expect(validateAPI('https://.')).toBe(false)
      expect(validateAPI('https://..')).toBe(false)
      expect(validateAPI('https://...')).toBe(false)
    })

    it('should reject numeric-only TLDs', () => {
      expect(validateAPI('https://example.1')).toBe(false)
      expect(validateAPI('https://foo.123')).toBe(false)
    })

    it('should reject TLDs shorter than 2 characters', () => {
      expect(validateAPI('https://example.c')).toBe(false)
      expect(validateAPI('https://a.b')).toBe(false)
    })

    it('should reject labels with invalid characters', () => {
      expect(validateAPI('https://exa_mple.com')).toBe(false)
      expect(validateAPI('https://exa!mple.com')).toBe(false)
    })

    it('should reject labels starting or ending with a hyphen', () => {
      expect(validateAPI('https://-example.com')).toBe(false)
      expect(validateAPI('https://example-.com')).toBe(false)
    })

    it('should reject non http/https protocols', () => {
      expect(validateAPI('ftp://example.com')).toBe(false)
      expect(validateAPI('ws://example.com')).toBe(false)
    })

    it('should reject empty or whitespace input', () => {
      expect(validateAPI('')).toBe(false)
      expect(validateAPI('   ')).toBe(false)
    })

    it('should reject non-string input', () => {
      expect(validateAPI(null)).toBe(false)
      expect(validateAPI(undefined)).toBe(false)
      expect(validateAPI(123)).toBe(false)
    })

    it('should reject malformed URLs', () => {
      expect(validateAPI('not-a-url')).toBe(false)
      expect(validateAPI('http://')).toBe(false)
      expect(validateAPI('https://')).toBe(false)
      expect(validateAPI('http://.com')).toBe(false)
      expect(validateAPI('http://example..com')).toBe(false)
    })
  })

  describe('validateEmptyInput', () => {
    it('should return true for non-empty strings', () => {
      expect(validateEmptyInput('test')).toBe(true)
      expect(validateEmptyInput(' test ')).toBe(true)
      expect(validateEmptyInput('0')).toBe(true)
    })

    it('should return false for empty or whitespace strings', () => {
      expect(validateEmptyInput('')).toBe(false)
      expect(validateEmptyInput('   ')).toBe(false)
    })

    it('should return false for non-string types', () => {
      expect(validateEmptyInput(null)).toBe(false)
      expect(validateEmptyInput(undefined)).toBe(false)
      expect(validateEmptyInput(123)).toBe(false)
    })
  })
})