import { IO, Left, Right, foldEither, type Either } from '@/effects/index'
import {
  findActiveSectionId,
  type ActiveSectionLookupError,
} from '@/effects/activeSection'

type ActiveSectionTrackerDeps = {
  readonly getSections: () => ReadonlyArray<HTMLElement>
  readonly getActivationLine: () => number
  readonly onSectionChange: (sectionId: string) => void
}

type ActiveSectionTracker = {
  readonly start: IO<void>
  readonly stop: IO<void>
}

type FrameState = Either<'idle', number>

const idleFrameState = Left<'idle', number>('idle')

const publishActiveSection = (
  deps: ActiveSectionTrackerDeps
): void =>
  foldEither<ActiveSectionLookupError, string, void>(
    () => undefined,
    deps.onSectionChange
  )(findActiveSectionId(deps.getSections(), deps.getActivationLine()))

const requestNextFrame = (
  currentFrameState: FrameState,
  onFrame: () => void
): FrameState =>
  foldEither<'idle', number, FrameState>(
    () => Right<'idle', number>(window.requestAnimationFrame(onFrame)),
    frameId => Right<'idle', number>(frameId)
  )(currentFrameState)

const cancelFrame = (currentFrameState: FrameState): FrameState =>
  foldEither<'idle', number, FrameState>(
    () => currentFrameState,
    frameId => {
      window.cancelAnimationFrame(frameId)
      return idleFrameState
    }
  )(currentFrameState)

export const createActiveSectionTracker = (
  deps: ActiveSectionTrackerDeps
): ActiveSectionTracker => {
  let frameState: FrameState = idleFrameState

  const scheduleUpdate = (): void => {
    frameState = requestNextFrame(frameState, () => {
      frameState = idleFrameState
      publishActiveSection(deps)
    })
  }

  const start = IO(() => {
    publishActiveSection(deps)
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
  })

  const stop = IO(() => {
    window.removeEventListener('scroll', scheduleUpdate)
    window.removeEventListener('resize', scheduleUpdate)
    frameState = cancelFrame(frameState)
  })

  return {
    start,
    stop,
  }
}