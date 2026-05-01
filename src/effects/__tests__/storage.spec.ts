import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import {
  readStoredValue,
  readStoredValueEither,
  readStoredValueMaybe,
  readTextFromClipboard,
  writeStoredValue,
  writeTextToClipboard,
} from '@/effects/storage'
import { isLeft, isRight, isJust } from '@/effects/index'

describe('storage effects', () => {
  let originalClipboard: Clipboard | undefined

  beforeEach(() => {
    window.localStorage.clear()
    originalClipboard = navigator.clipboard
  })

  afterEach(() => {
    window.localStorage.clear()

    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: originalClipboard,
      writable: true,
    })

    vi.restoreAllMocks()
  })

  it('reads and writes local storage values', () => {
    writeStoredValue('theme', 'dark').run()

    expect(readStoredValue('theme').run()).toBe('dark')

    const maybeValue = readStoredValueMaybe('theme').run()
    expect(isJust(maybeValue)).toBe(true)

    const eitherValue = readStoredValueEither('theme').run()
    expect(isRight(eitherValue)).toBe(true)
    if (isRight(eitherValue)) {
      expect(eitherValue.value).toBe('dark')
    }
  })

  it('models missing values and clipboard access explicitly', async () => {
    const missing = readStoredValueEither('missing').run()
    expect(isLeft(missing)).toBe(true)

    const mockClipboard = {
      readText: vi.fn().mockResolvedValue('clipboard text'),
      writeText: vi.fn().mockResolvedValue(undefined),
    }

    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: mockClipboard,
      writable: true,
    })

    const writeResult = await writeTextToClipboard('hello').toPromise()
    expect(isRight(writeResult)).toBe(true)
    expect(mockClipboard.writeText).toHaveBeenCalledWith('hello')

    const readResult = await readTextFromClipboard().toPromise()
    expect(isRight(readResult)).toBe(true)
    if (isRight(readResult)) {
      expect(readResult.value).toBe('clipboard text')
    }
  })
})