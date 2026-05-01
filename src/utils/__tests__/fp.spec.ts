import { describe, expect, it, vi, afterEach } from 'vitest'
import {
  debug,
  dedupBy,
  eq,
  filterMap,
  flatMapDepth,
  flow,
  groupBy,
  matchesAll,
  matchesAny,
  not,
  unless,
  when,
  gt,
  lte,
} from '@/utils/fp'
import { Just, Nothing } from '@/effects/index'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('fp utilities', () => {
  it('composes predicates and transforms values', () => {
    const isEven = (value: number) => value % 2 === 0
    const isPositive = (value: number) => value > 0

    expect(matchesAll([isEven, isPositive])(4)).toBe(true)
    expect(matchesAny([isEven, isPositive])(-2)).toBe(true)
    expect(not(isEven)(3)).toBe(true)
    expect(when<number, string>(isEven, value => `even:${value}`)(4)).toBe('even:4')
    expect(unless<number, string>(isEven, value => `odd:${value}`)(3)).toBe('odd:3')
    expect(eq(3)(3)).toBe(true)
    expect(gt(5)(3)).toBe(true)
    expect(lte(3)(5)).toBe(true)
  })

  it('filters, groups, and deduplicates collections', () => {
    const values = [1, 2, 3, 4, 5]

    expect(
      filterMap((value: number) => (value % 2 === 0 ? Just(value * 10) : Nothing()))(values)
    ).toEqual([20, 40])

    expect(
      [...groupBy((value: string) => value.length)(['a', 'bb', 'cc', 'ddd']).entries()]
    ).toEqual([
      [1, ['a']],
      [2, ['bb', 'cc']],
      [3, ['ddd']],
    ])

    expect(
      dedupBy((left: { id: string }, right: { id: string }) => left.id === right.id)([
        { id: 'a' },
        { id: 'b' },
        { id: 'a' },
        { id: 'c' },
      ])
    ).toEqual([
      { id: 'a' },
      { id: 'b' },
      { id: 'c' },
    ])
  })

  it('flows and flattens arrays', () => {
    expect(flow((value: number) => value + 1, value => value * 2)(3)).toBe(8)
    expect(flatMapDepth(1, (value: number) => [value, value * 2])([1, 2])).toEqual([
      1,
      2,
      2,
      4,
    ])
    expect(flatMapDepth(0, (value: number) => [value * 2])([1, 2])).toEqual([1, 2])
  })

  it('logs through debug without changing the value', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)
    const value = { kind: 'sample' }

    expect(debug('sample')(value)).toBe(value)
    expect(logSpy).toHaveBeenCalledWith('[sample]', value)
  })
})