import type { Equal, Expect } from '@type-challenges/utils'

/*
Conditional Type の条件式にはextendsが使える
型だけでなく、リテラルも指定できる

type Test<T extends number> = T extends 0 ? never : T
*/

type First<T extends any[]> = T extends [] ? never : T[0]

type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>,
]

type errors = [
  // @ts-expect-error
  First<'notArray'>,
  // @ts-expect-error
  First<{ 0: 'arrayLike' }>,
]
