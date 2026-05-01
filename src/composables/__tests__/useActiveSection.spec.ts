import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import { afterEach, describe, expect, it, vi } from 'vitest'

const startRun = vi.hoisted(() => vi.fn())
const stopRun = vi.hoisted(() => vi.fn())
const createActiveSectionTracker = vi.hoisted(() =>
  vi.fn(() => ({
    start: { run: startRun },
    stop: { run: stopRun },
  }))
)

vi.mock('@/effects/activeSectionTracker', () => ({
  createActiveSectionTracker,
}))

import { useActiveSection } from '@/composables/useActiveSection'

afterEach(() => {
  vi.clearAllMocks()
})

describe('useActiveSection', () => {
  it('starts and stops the tracker with lifecycle hooks', () => {
    const Host = defineComponent({
      setup() {
        const { activeSection } = useActiveSection()

        return () => h('div', activeSection.value)
      },
    })

    const wrapper = mount(Host)

    expect(createActiveSectionTracker).toHaveBeenCalledTimes(1)
    expect(startRun).toHaveBeenCalledTimes(1)

    wrapper.unmount()

    expect(stopRun).toHaveBeenCalledTimes(1)
  })
})