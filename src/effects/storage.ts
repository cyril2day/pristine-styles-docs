/**
 * Storage and clipboard effects.
 * Each helper returns a value or an effect wrapper instead of throwing.
 */

import { IO, TaskEither, taskEitherFromPromise, taskEitherLeft, Left, Right, Either, fromNullable } from '@/effects/index'
import { allPass, pathSatisfies, is } from 'ramda'

export type LocalStorageError = { kind: 'local-storage-error'; message: string }

const hasWindow = (): boolean => typeof window !== 'undefined'

const hasLocalStorageAccess = (): boolean => hasWindow() && 'localStorage' in window

const hasNavigator = (): boolean => typeof navigator !== 'undefined'

const hasClipboardAccess = (): boolean => {
  if (!hasNavigator()) return false
  const clipboardAvailable = allPass([
    pathSatisfies(is(Function), ['clipboard', 'writeText']),
    pathSatisfies(is(Function), ['clipboard', 'readText']),
  ])
  return clipboardAvailable(navigator as unknown as Record<string, unknown>)
}

const readLocalStorageItem = (key: string): string | null =>
  hasLocalStorageAccess() ? window.localStorage.getItem(key) : null

const writeLocalStorageItem = (key: string, value: string): void => {
  if (hasLocalStorageAccess()) {
    window.localStorage.setItem(key, value)
  }
}

export const readStoredValue =
  (key: string): IO<string | null> =>
    IO(() => readLocalStorageItem(key))

export const readStoredValueMaybe =
  (key: string): IO<ReturnType<typeof fromNullable<string>>> =>
    IO(() => fromNullable(readLocalStorageItem(key)))

/**
 * Read stored value and model absence as an explicit `Either` left.
 * Left: LocalStorageError, Right: string
 */
export const readStoredValueEither =
  (key: string): IO<Either<LocalStorageError, string>> =>
    IO(() => {
      const v = readLocalStorageItem(key)
      return v === null
        ? Left<LocalStorageError, string>({ kind: 'local-storage-error', message: `No value for key: ${key}` })
        : Right<LocalStorageError, string>(v)
    })

export const writeStoredValue =
  (key: string, value: string): IO<void> =>
    IO(() => writeLocalStorageItem(key, value))

export type ClipboardAccessError = { kind: 'clipboard-access-error'; message: string }

export const writeTextToClipboard = (text: string): TaskEither<ClipboardAccessError, void> =>
  // Guard clipboard access; return a left TaskEither when unavailable
  hasClipboardAccess()
    ? taskEitherFromPromise(
        navigator.clipboard.writeText(text),
        (error: unknown) => ({
          kind: 'clipboard-access-error' as const,
          message: `Could not copy text: ${error instanceof Error ? error.message : String(error)}`,
        })
      )
    : taskEitherLeft({ kind: 'clipboard-access-error', message: 'Clipboard API not available' })

export const readTextFromClipboard = (): TaskEither<ClipboardAccessError, string> =>
  hasClipboardAccess()
    ? taskEitherFromPromise(
        navigator.clipboard.readText(),
        (error: unknown) => ({
          kind: 'clipboard-access-error' as const,
          message: `Could not read clipboard text: ${error instanceof Error ? error.message : String(error)}`,
        })
      )
    : taskEitherLeft({ kind: 'clipboard-access-error', message: 'Clipboard API not available' })
