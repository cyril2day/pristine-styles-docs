/**
 * Theme effects and utilities using IO.
 * These helpers read like a sentence and keep side effects explicit.
 */

import { IO, foldMaybe } from '@/effects/index'
import { writeStoredValue, readStoredValueMaybe } from '@/effects/storage'
import type { ThemeMode } from '@/domain/ui'
import { themeLight, themeDark } from '@/domain/ui'

const THEME_STORAGE_KEY = 'pristine-theme'

export const themeClassName = (theme: ThemeMode): string => (theme.kind === 'dark' ? 'dark' : '')

export const themeStorageValue = (theme: ThemeMode): string => (theme.kind === 'dark' ? 'dark' : 'light')

export const synchronizeDocumentThemeClass = (theme: ThemeMode): IO<void> =>
  IO(() => {
    if (typeof document === 'undefined' || !document.documentElement) return
    const html = document.documentElement
    // Use toggle with force to avoid imperative add/remove branches
    html.classList.toggle('dark', theme.kind === 'dark')
  })

export const persistThemeSetting = (theme: ThemeMode): IO<void> =>
  writeStoredValue(THEME_STORAGE_KEY, themeStorageValue(theme))

export const applyThemeSetting = (theme: ThemeMode): IO<void> =>
  synchronizeDocumentThemeClass(theme).chain(() => persistThemeSetting(theme))

export const loadPersistedThemeSetting = (): IO<ThemeMode> =>
  IO(() => {
    const maybeSaved = readStoredValueMaybe(THEME_STORAGE_KEY).run()
    const savedTheme = foldMaybe<string, string | null>(
      () => null,
      v => v
    )(maybeSaved)
    const prefersDarkTheme = typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false

    if (savedTheme === 'dark' || (!savedTheme && prefersDarkTheme)) {
      return themeDark()
    }
    return themeLight()
  })

export const nextThemeMode = (currentTheme: ThemeMode): ThemeMode =>
  currentTheme.kind === 'dark' ? themeLight() : themeDark()
