export type DeepMutable<T> =
  T extends Function ? T
  : T extends ReadonlyArray<infer U> ? DeepMutable<U>[]
  : T extends object ? { -readonly [K in keyof T]: DeepMutable<T[K]> }
  : T;
