/**
 * FP utilities and composition helpers using Ramda.
 * Demonstrates pointfree style, currying, and declarative composition.
 */

import {
  pipe,
  map,
  reduce,
  curry,
  allPass,
  anyPass
} from 'ramda'

import { isJust } from '@/effects/index'

/**
 * Pointfree predicate composition: all conditions must be true.
 */
export const matchesAll = <T>(predicates: Array<(t: T) => boolean>): ((t: T) => boolean) =>
  allPass(predicates)

/**
 * Pointfree predicate composition: any condition must be true.
 */
export const matchesAny = <T>(predicates: Array<(t: T) => boolean>): ((t: T) => boolean) =>
  anyPass(predicates)

/**
 * Negate a predicate function (logical NOT).
 */
export const not =
  <T>(predicate: (t: T) => boolean) =>
  (t: T): boolean =>
    !predicate(t)

/**
 * Declarative conditional: replaces if/else statements.
 * Example: cond([[isEven, () => 'even'], [T, () => 'odd']])(x)
 */
export const when =
  <T, U>(predicate: (t: T) => boolean, f: (t: T) => U) =>
  (t: T): T | U =>
    predicate(t) ? f(t) : t

export const unless =
  <T, U>(predicate: (t: T) => boolean, f: (t: T) => U) =>
  (t: T): T | U =>
    predicate(t) ? t : f(t)

/**
 * Pipeline builder for logging/debugging in the middle of a pipe.
 * Non-destructive: returns the value unchanged.
 */
export const debug =
  (label: string) =>
  <T>(value: T): T => {
    console.log(`[${label}]`, value)
    return value
  }

/**
 * Type-safe pipe application.
 * Useful for avoiding deeply nested parentheses.
 */
export const flow =
  <T>(...fns: Array<(x: any) => any>) =>
  (x: T): any =>
    fns.reduce((value, fn) => fn(value), x)

/**
 * Curried binary operator for flexible composition.
 */
export const eq = curry((a: any, b: any): boolean => a === b)
export const notEq = curry((a: any, b: any): boolean => a !== b)
export const gt = curry((a: number, b: number): boolean => a > b)
export const lt = curry((a: number, b: number): boolean => a < b)
export const gte = curry((a: number, b: number): boolean => a >= b)
export const lte = curry((a: number, b: number): boolean => a <= b)

/**
 * Array utilities using Ramda's declarative approach.
 */

/**
 * Filter and map in one pass (mapFilter pattern).
 */
export const filterMap =
  <A, B>(f: (a: A) => { _tag: 'Just'; value: B } | { _tag: 'Nothing' }) =>
  (as: A[]): B[] =>
    as.reduce((acc: B[], a: A) => {
      const m = f(a) as { _tag: 'Just'; value: B } | { _tag: 'Nothing' }
      if (isJust(m as any)) acc.push((m as { _tag: 'Just'; value: B }).value)
      return acc
    }, [] as B[])

/**
 * Group array by key.
 */
export const groupBy =
  <T, K>(keyFn: (t: T) => K) =>
  (ts: T[]): Map<K, T[]> => {
    const map = new Map<K, T[]>()
    for (const t of ts) {
      const key = keyFn(t)
      const group = map.get(key) || []
      map.set(key, [...group, t])
    }
    return map
  }

/**
 * Deduplicate array by predicate.
 */
export const dedupBy =
  <T>(predicate: (a: T, b: T) => boolean) =>
  (ts: T[]): T[] =>
    ts.reduce((acc: T[], t: T) => {
      const isDuplicate = acc.some(a => predicate(a, t))
      return isDuplicate ? acc : [...acc, t]
    }, [])

/**
 * Traverse and flatten a nested structure.
 */
export const flatMapDepth =
  <A, B>(depth: number, f: (a: A) => B[]) =>
  (as: A[]): B[] => {
    if (depth === 0) {
      return as as unknown as B[]
    }

    return pipe(
      map(f),
      reduce((acc: B[], items: B[]) => [...acc, ...items], [] as B[])
    )(as)
  }
