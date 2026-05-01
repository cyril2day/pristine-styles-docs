// Domain types and helpers for UI state

export type ThemeMode = 
    | { kind: 'light' } 
    | { kind: 'dark' }

export const themeLight = (): ThemeMode => ({ kind: 'light' })
export const themeDark = (): ThemeMode => ({ kind: 'dark' })

export const toggleThemeMode = (t: ThemeMode): ThemeMode =>
  t.kind === 'dark' 
    ? themeLight() 
    : themeDark()

export type MenuState = 
    | { kind: 'open' } 
    | { kind: 'closed' }

export const menuOpen = (): MenuState => ({ kind: 'open' })
export const menuClosed = (): MenuState => ({ kind: 'closed' })

export const toggleMenuState = (m: MenuState): MenuState =>
  m.kind === 'open' 
    ? menuClosed() 
    : menuOpen()

export type CopyState =
    | { status: 'idle' }
    | { status: 'copied' }
    | { status: 'error'; message: string }

export const copyIdle = (): CopyState => ({ status: 'idle' })
export const copySuccess = (): CopyState => ({ status: 'copied' })
export const copyError = (message: string): CopyState => ({ status: 'error', message })

// Simple Result type for explicit error handling
export type Result<E, A> = 
    | { ok: true; value: A } 
    | { ok: false; error: E }

export const Ok = <E, A>(value: A): Result<E, A> => ({ ok: true, value })
export const Err = <E, A>(error: E): Result<E, A> => ({ ok: false, error })
