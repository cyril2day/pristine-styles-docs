import { ref, computed, readonly } from 'vue'
import type { Ref } from 'vue'
import { menuClosed, menuOpen, toggleMenuState, type MenuState } from '@/domain/ui'

export const useMenu = (initialMenu: MenuState = menuClosed()) => {
  const menu = ref<MenuState>(initialMenu)

  const isOpen = computed(() => menu.value.kind === 'open')

  const openMenu = () => {
    menu.value = menuOpen()
  }

  const closeMenu = () => {
    menu.value = menuClosed()
  }

  const toggleMenu = () => {
    menu.value = toggleMenuState(menu.value)
  }

  return {
    menu: readonly(menu) as Readonly<Ref<MenuState>>,
    isOpen: readonly(isOpen),
    openMenu,
    closeMenu,
    toggleMenu,
  }
}