import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import TokenBadge from '../TokenBadge.vue'

describe('TokenBadge', () => {
  it('renders the token name', () => {
    const name = 'color-primary'
    const wrapper = mount(TokenBadge as any, {
      props: { name }
    })

    const el = wrapper.find('.token-badge')
    expect(el.exists()).toBe(true)
    expect(el.text()).toBe(name)
  })
})
