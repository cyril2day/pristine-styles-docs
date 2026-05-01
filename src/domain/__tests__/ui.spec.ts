import { describe, expect, it } from 'vitest'
import {
  Err,
  Ok,
  copyError,
  copyIdle,
  copySuccess,
  menuClosed,
  menuOpen,
  themeDark,
  themeLight,
  toggleMenuState,
  toggleThemeMode,
} from '@/domain/ui'

describe('ui helpers', () => {
  it('creates and toggles theme and menu states', () => {
    expect(themeLight()).toEqual({ kind: 'light' })
    expect(themeDark()).toEqual({ kind: 'dark' })
    expect(toggleThemeMode(themeLight())).toEqual(themeDark())
    expect(toggleThemeMode(themeDark())).toEqual(themeLight())

    expect(menuClosed()).toEqual({ kind: 'closed' })
    expect(menuOpen()).toEqual({ kind: 'open' })
    expect(toggleMenuState(menuClosed())).toEqual(menuOpen())
    expect(toggleMenuState(menuOpen())).toEqual(menuClosed())
  })

  it('creates copy states and result values', () => {
    expect(copyIdle()).toEqual({ status: 'idle' })
    expect(copySuccess()).toEqual({ status: 'copied' })
    expect(copyError('boom')).toEqual({ status: 'error', message: 'boom' })
    expect(Ok<string, number>(42)).toEqual({ ok: true, value: 42 })
    expect(Err<string, number>('boom')).toEqual({ ok: false, error: 'boom' })
  })
})