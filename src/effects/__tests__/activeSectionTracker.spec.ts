import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { createActiveSectionTracker } from '@/effects/activeSectionTracker'

const makeSection = (id: string, top: number, offsetTop: number): HTMLElement => {
  const section = document.createElement('section')
  section.id = id

  Object.defineProperty(section, 'offsetTop', {
    configurable: true,
    value: offsetTop,
  })

  vi.spyOn(section, 'getBoundingClientRect').mockReturnValue({ top } as DOMRect)

  return section
}

describe('createActiveSectionTracker', () => {
  let rafId = 0
  let rafCallback: FrameRequestCallback | undefined

  beforeEach(() => {
    rafId = 0
    rafCallback = undefined

    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => {
      rafCallback = callback
      rafId += 1
      return rafId
    })

    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => undefined)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('publishes the active section on start and cancels a pending frame on stop', () => {
    const onSectionChange = vi.fn()
    const tracker = createActiveSectionTracker({
      getSections: () => [
        makeSection('below', 120, 120),
        makeSection('active', 20, 20),
      ],
      getActivationLine: () => 40,
      onSectionChange,
    })

    tracker.start.run()

    expect(onSectionChange).toHaveBeenCalledWith('active')

    window.dispatchEvent(new Event('scroll'))
    window.dispatchEvent(new Event('scroll'))

    expect(window.requestAnimationFrame).toHaveBeenCalledTimes(1)
    expect(rafCallback).toBeDefined()

    tracker.stop.run()

    expect(window.cancelAnimationFrame).toHaveBeenCalledWith(1)
  })
})