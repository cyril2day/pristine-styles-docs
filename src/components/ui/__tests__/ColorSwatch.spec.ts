import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import ColorSwatch from '../ColorSwatch.vue'

// Provide a simple TokenBadge stub so test focuses on ColorSwatch behavior
const TokenBadgeStub = {
  template: '<code class="token-badge">token</code>'
}

describe('ColorSwatch', () => {
  beforeEach(() => {
    // Ensure document exists and mock computed style
    Object.defineProperty(window, 'getComputedStyle', {
      value: () => ({ getPropertyValue: (_: string) => 'rgb(255, 0, 0)' }),
      configurable: true,
    })
  })

  it('renders swatch label and token badge', () => {
    const name = '--color-primary'
    const wrapper = mount(ColorSwatch as any, {
      props: { name, label: 'Primary' },
      global: { stubs: { TokenBadge: TokenBadgeStub } }
    })

    const circle = wrapper.find('.swatch-circle')
    expect(circle.exists()).toBe(true)

    expect(wrapper.find('.swatch-label').text()).toBe('Primary')
    expect(wrapper.find('.token-badge').exists()).toBe(true)
  })
})
