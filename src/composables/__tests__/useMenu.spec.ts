import { describe, expect, it } from 'vitest'
import { useMenu } from '@/composables/useMenu'

describe('useMenu', () => {
  it('exposes menu state transitions', () => {
    const { menu, isOpen, openMenu, closeMenu, toggleMenu } = useMenu()

    expect(menu.value.kind).toBe('closed')
    expect(isOpen.value).toBe(false)

    openMenu()
    expect(menu.value.kind).toBe('open')
    expect(isOpen.value).toBe(true)

    toggleMenu()
    expect(menu.value.kind).toBe('closed')
    expect(isOpen.value).toBe(false)

    closeMenu()
    expect(menu.value.kind).toBe('closed')
    expect(isOpen.value).toBe(false)
  })
})