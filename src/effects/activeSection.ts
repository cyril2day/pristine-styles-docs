import { findLast, prop, sortBy, lte } from 'ramda'
import { Left, Right, fromNullable, foldMaybe, pipe, type Either } from '@/effects/index'

export type ActiveSectionLookupError = 'no-active-section'

export const sectionIsActiveAt =
  (activationLine: number) =>
    (section: HTMLElement): boolean =>
      lte(section.getBoundingClientRect().top, activationLine)

const activeSectionId = (
  section: HTMLElement | undefined
): Either<ActiveSectionLookupError, string> =>
  foldMaybe<string, Either<ActiveSectionLookupError, string>>(
    () => Left<ActiveSectionLookupError, string>('no-active-section'),
    value => Right<ActiveSectionLookupError, string>(value)
  )(fromNullable(section?.id || null))

export const findActiveSectionId = (
  sections: ReadonlyArray<HTMLElement>,
  activationLine: number
): Either<ActiveSectionLookupError, string> =>
  pipe(
    sortBy<HTMLElement>(prop('offsetTop')),
    findLast(sectionIsActiveAt(activationLine)),
    activeSectionId
  )(sections)