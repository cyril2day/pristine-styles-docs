import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import {
  applyThemeSetting,
  loadPersistedThemeSetting,
  nextThemeMode,
  persistThemeSetting,
  synchronizeDocumentThemeClass,
  themeClassName,
  themeStorageValue,
} from '@/effects/theme'
import { themeDark, themeLight } from '@/domain/ui'

const installMatchMedia = (matches: boolean): void => {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    value: vi.fn(() => ({ matches })),
  })
}

describe('theme effects', () => {
  beforeEach(() => {
    window.localStorage.clear()
    document.documentElement.classList.remove('dark')
    installMatchMedia(false)
  })

  afterEach(() => {
    window.localStorage.clear()
    document.documentElement.classList.remove('dark')
    vi.restoreAllMocks()
  })

  it('derives class and storage values from the theme mode', () => {
    expect(themeClassName(themeDark())).toBe('dark')
    expect(themeClassName(themeLight())).toBe('')
    expect(themeStorageValue(themeDark())).toBe('dark')
    expect(themeStorageValue(themeLight())).toBe('light')
    expect(nextThemeMode(themeDark())).toEqual(themeLight())
    expect(nextThemeMode(themeLight())).toEqual(themeDark())
  })

  it('synchronizes and persists the theme setting', () => {
    applyThemeSetting(themeDark()).run()

    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(loadPersistedThemeSetting().run()).toEqual(themeDark())

    persistThemeSetting(themeLight()).run()
    expect(window.localStorage.getItem('pristine-theme')).toBe('light')
  })

  it('falls back to system preference when no theme is stored', () => {
    installMatchMedia(true)

    expect(loadPersistedThemeSetting().run()).toEqual(themeDark())

    installMatchMedia(false)
    expect(loadPersistedThemeSetting().run()).toEqual(themeLight())
  })

  it('toggles the document theme class directly', () => {
    synchronizeDocumentThemeClass(themeDark()).run()
    expect(document.documentElement.classList.contains('dark')).toBe(true)

    synchronizeDocumentThemeClass(themeLight()).run()
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })
})