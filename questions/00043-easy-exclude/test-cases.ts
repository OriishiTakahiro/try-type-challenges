import type { Equal, Expect } from '@type-challenges/utils'

/*
  条件型のときは分配則が働く
  Hoge<(T1 | T2), U> = T extends U ? A : B
  -> (T1 extends U ? A : B) | (T2 extends U ? A | B)
*/
type MyExclude<T, K> = T extends K ? never : T

type cases = [
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a'>, 'b' | 'c'>>,
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a' | 'b'>, 'c'>>,
  Expect<Equal<MyExclude<string | number | (() => void), Function>, string | number>>,
]
