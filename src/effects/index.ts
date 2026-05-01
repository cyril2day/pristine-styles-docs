/**
 * Effect System: IO, Task, Either for declarative side effects and error handling.
 * 
 * Uses factory functions and plain objects — NO classes.
 *
 * - IO<A>: Wraps a synchronous side effect that produces A
 * - Task<A>: Wraps an async operation (Promise-based)
 * - Either<E, A>: Models success (Right) or failure (Left) paths
 * - TaskEither<E, A>: Combines Task and Either for async error handling
 */

/**
 * IO<A>: Represents a lazy synchronous side effect.
 * The effect is not executed until we explicitly run it.
 */
export type IO<A> = {
  readonly run: () => A
  readonly map: <B>(f: (a: A) => B) => IO<B>
  readonly chain: <B>(f: (a: A) => IO<B>) => IO<B>
  readonly ap: <B>(fab: IO<(a: A) => B>) => IO<B>
}

export const IO = <A>(effect: () => A): IO<A> => ({
  run: effect,
  map: <B>(f: (a: A) => B): IO<B> =>
    IO(() => f(effect())),
  chain: <B>(f: (a: A) => IO<B>): IO<B> =>
    IO(() => f(effect()).run()),
  ap: <B>(fab: IO<(a: A) => B>): IO<B> =>
    IO(() => fab.run()(effect())),
})

export const ioOf = <A>(value: A): IO<A> =>
  IO(() => value)

/**
 * Task<A>: Represents an async operation.
 */
export type Task<A> = {
  readonly fork: (reject: (e: Error) => void, resolve: (a: A) => void) => void
  readonly map: <B>(f: (a: A) => B) => Task<B>
  readonly chain: <B>(f: (a: A) => Task<B>) => Task<B>
  readonly ap: <B>(fab: Task<(a: A) => B>) => Task<B>
  readonly toPromise: () => Promise<A>
}

export const Task = <A>(
  fork: (reject: (e: Error) => void, resolve: (a: A) => void) => void
): Task<A> => ({
  fork,
  map: <B>(f: (a: A) => B): Task<B> =>
    Task((reject, resolve) => fork(reject, a => resolve(f(a)))),
  chain: <B>(f: (a: A) => Task<B>): Task<B> =>
    Task((reject, resolve) => fork(reject, a => f(a).fork(reject, resolve))),
  ap: <B>(fab: Task<(a: A) => B>): Task<B> =>
    Task((reject, resolve) =>
      fab.fork(reject, f => fork(reject, a => resolve(f(a))))
    ),
  toPromise: (): Promise<A> =>
    new Promise((resolve, reject) => fork(reject, resolve)),
})

export const taskOf = <A>(value: A): Task<A> =>
  Task((_reject, resolve) => resolve(value))

export const taskFromPromise = <A>(promise: Promise<A>): Task<A> =>
  Task((reject, resolve) => 
    promise.then(resolve).catch(reject)
  )

/**
 * Either<E, A>: Represents success or failure.
 * Monad that allows chaining of operations that might fail.
 */
export type Either<E, A> =
  | { readonly _tag: 'Right'; readonly value: A }
  | { readonly _tag: 'Left'; readonly error: E }

export const Right = <E, A>(value: A): Either<E, A> => ({
  _tag: 'Right',
  value,
})

export const Left = <E, A>(error: E): Either<E, A> => ({
  _tag: 'Left',
  error,
})

export const isRight = <E, A>(either: Either<E, A>): either is { _tag: 'Right'; value: A } =>
  either._tag === 'Right'

export const isLeft = <E, A>(either: Either<E, A>): either is { _tag: 'Left'; error: E } =>
  either._tag === 'Left'

export const foldEither = <E, A, B>(
  onLeft: (error: E) => B,
  onRight: (value: A) => B
) => (either: Either<E, A>): B =>
  either._tag === 'Left'
    ? onLeft(either.error)
    : onRight(either.value)

export const mapEither = <E, A, B>(
  f: (a: A) => B
) => (either: Either<E, A>): Either<E, B> =>
  foldEither<E, A, Either<E, B>>(
    error => Left<E, B>(error),
    value => Right<E, B>(f(value))
  )(either)

export const chainEither = <E, A, B>(
  f: (a: A) => Either<E, B>
) => (either: Either<E, A>): Either<E, B> =>
  foldEither<E, A, Either<E, B>>(
    error => Left<E, B>(error),
    value => f(value)
  )(either)

export const getOrElse = <E, A>(defaultValue: A) => (either: Either<E, A>): A => {
  return foldEither<E, A, A>(
    () => defaultValue,
    value => value
  )(either)
}

export const eitherToPromise = <E, A>(either: Either<E, A>): Promise<A> => {
  return foldEither<E, A, Promise<A>>(
    error => Promise.reject(error),
    value => Promise.resolve(value)
  )(either)
}

/**
 * Maybe<A>: Lightweight optional container for values that may be absent.
 * Provides `fromNullable` to lift potentially null|undefined values.
 */
export type Maybe<A> =
  | { readonly _tag: 'Just'; readonly value: A }
  | { readonly _tag: 'Nothing' }

export const Just = <A>(value: A): Maybe<A> => ({ _tag: 'Just', value })
export const Nothing = <A = never>(): Maybe<A> => ({ _tag: 'Nothing' })

export const isJust = <A>(m: Maybe<A>): m is { _tag: 'Just'; value: A } => m._tag === 'Just'
export const isNothing = <A>(m: Maybe<A>): m is { _tag: 'Nothing' } => m._tag === 'Nothing'

export const fromNullable = <A>(value: A | null | undefined): Maybe<A> =>
  value == null ? Nothing<A>() : Just<A>(value)

export const mapMaybe = <A, B>(f: (a: A) => B) => (m: Maybe<A>): Maybe<B> =>
  isJust(m) ? Just<B>(f(m.value)) : Nothing<B>()

export const chainMaybe = <A, B>(f: (a: A) => Maybe<B>) => (m: Maybe<A>): Maybe<B> =>
  isJust(m) ? f(m.value) : Nothing<B>()

export const foldMaybe = <A, B>(
  onNothing: () => B,
  onJust: (a: A) => B
) => (m: Maybe<A>): B =>
  isJust(m) ? onJust(m.value) : onNothing()


/**
 * TaskEither<E, A>: Combines Task and Either.
 */
export type TaskEither<E, A> = {
  readonly task: Task<Either<E, A>>
  readonly map: <B>(f: (a: A) => B) => TaskEither<E, B>
  readonly mapLeft: <E2>(f: (e: E) => E2) => TaskEither<E2, A>
  readonly chain: <B>(f: (a: A) => TaskEither<E, B>) => TaskEither<E, B>
  readonly fold: <B>(f: (e: E) => B, g: (a: A) => B) => Task<B>
  readonly getOrElse: (defaultValue: A) => Task<A>
  readonly toTask: () => Task<Either<E, A>>
  readonly toPromise: () => Promise<Either<E, A>>
}

export const TaskEither = <E, A>(
  task: Task<Either<E, A>>
): TaskEither<E, A> => ({
  task,
  map: <B>(f: (a: A) => B): TaskEither<E, B> =>
    TaskEither(task.map(foldEither<E, A, Either<E, B>>(
      error => Left<E, B>(error),
      value => Right<E, B>(f(value))
    ))),
  mapLeft: <E2>(f: (e: E) => E2): TaskEither<E2, A> =>
    TaskEither(task.map(foldEither<E, A, Either<E2, A>>(
      error => Left<E2, A>(f(error)),
      value => Right<E2, A>(value)
    ))),
  chain: <B>(f: (a: A) => TaskEither<E, B>): TaskEither<E, B> =>
    TaskEither(
      task.chain(foldEither<E, A, Task<Either<E, B>>>(
        error => taskOf(Left<E, B>(error)),
        value => f(value).task
      ))
    ),
  fold: <B>(f: (e: E) => B, g: (a: A) => B): Task<B> =>
    task.map(foldEither<E, A, B>(f, g)),
  getOrElse: (defaultValue: A): Task<A> =>
    task.map(foldEither<E, A, A>(
      () => defaultValue,
      value => value
    )),
  toTask: (): Task<Either<E, A>> => task,
  toPromise: (): Promise<Either<E, A>> => task.toPromise(),
})

export const taskEitherLeft = <E, A>(error: E): TaskEither<E, A> =>
  TaskEither(taskOf(Left(error)))

export const taskEitherFromPromise = <E, A>(
  promise: Promise<A>,
  onError: (error: unknown) => E
): TaskEither<E, A> =>
  TaskEither(
    taskFromPromise(
      promise
        .then(a => Right<E, A>(a) as Either<E, A>)
        .catch(e => Left<E, A>(onError(e)))
    )
  )

/**
 * Composition helpers for building pipelines with effects.
 */

export const pipe =
  <A>(...fns: Array<(x: any) => any>) =>
  (x: A): any =>
    fns.reduce((acc, fn) => fn(acc), x)