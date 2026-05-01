import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import CopyButton from '../CopyButton.vue'

describe('CopyButton', () => {
  let originalClipboard: Clipboard | undefined

  beforeEach(() => {
    vi.useFakeTimers()
    // Store original clipboard and set up mock
    originalClipboard = navigator.clipboard
    const mockClipboard = {
      writeText: vi.fn().mockResolvedValue(undefined),
      readText: vi.fn().mockResolvedValue('')
    }
    Object.defineProperty(navigator, 'clipboard', {
      value: mockClipboard,
      configurable: true,
      writable: true
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
    // Restore original clipboard
    if (originalClipboard) {
      Object.defineProperty(navigator, 'clipboard', {
        value: originalClipboard,
        configurable: true,
        writable: true
      })
    }
  })

  it('renders with default label', () => {
    const wrapper = mount(CopyButton as any, {
      props: { text: 'hello' }
    })

    const button = wrapper.find('.copy-button')
    expect(button.exists()).toBe(true)
    expect(button.text()).toBe('Copy')
  })

  it('renders with custom label', () => {
    const wrapper = mount(CopyButton as any, {
      props: { text: 'hello', label: 'Clone' }
    })

    const button = wrapper.find('.copy-button')
    expect(button.text()).toBe('Clone')
  })

  it('changes text to "Copied!" after click', async () => {
    const wrapper = mount(CopyButton as any, {
      props: { text: 'test code' }
    })

    const button = wrapper.find('.copy-button')
    await button.trigger('click')
    await flushPromises()

    expect(button.text()).toBe('Copied!')
    expect(button.classes()).toContain('is-copied')
  })

  it('resets text after 2 seconds', async () => {
    const wrapper = mount(CopyButton as any, {
      props: { text: 'test code' }
    })

    const button = wrapper.find('.copy-button')
    await button.trigger('click')
    await flushPromises()

    expect(button.text()).toBe('Copied!')

    // Fast-forward 2 seconds
    vi.advanceTimersByTime(2000)
    await flushPromises()

    expect(button.text()).toBe('Copy')
    expect(button.classes()).not.toContain('is-copied')
  })
})
