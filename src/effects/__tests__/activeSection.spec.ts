import { describe, expect, it, vi } from 'vitest'
import { findActiveSectionId, sectionIsActiveAt } from '@/effects/activeSection'
import { isLeft, isRight } from '@/effects/index'

const makeSection = (id: string, top: number, offsetTop: number): HTMLElement => {
  const section = document.createElement('section')
  section.id = id

  Object.defineProperty(section, 'offsetTop', {
    configurable: true,
    value: offsetTop,
  })

  vi.spyOn(section, 'getBoundingClientRect').mockReturnValue({ top } as DOMRect)

  return section
}

describe('active section helpers', () => {
  it('detects whether a section is active at a line', () => {
    const section = makeSection('intro', 24, 24)

    expect(sectionIsActiveAt(30)(section)).toBe(true)
    expect(sectionIsActiveAt(10)(section)).toBe(false)
  })

  it('returns the active section id from sorted sections', () => {
    const sections = [
      makeSection('second', 120, 200),
      makeSection('first', 20, 10),
    ]

    const result = findActiveSectionId(sections, 40)

    expect(isRight(result)).toBe(true)
    if (isRight(result)) {
      expect(result.value).toBe('first')
    }
  })

  it('returns a left when the active section is missing an id', () => {
    const sections = [makeSection('', 20, 20)]

    const result = findActiveSectionId(sections, 40)

    expect(isLeft(result)).toBe(true)
    if (isLeft(result)) {
      expect(result.error).toBe('no-active-section')
    }
  })
})