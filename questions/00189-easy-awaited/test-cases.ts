import type { Equal, Expect } from '@type-challenges/utils'

/*
  条件型の中でinferを使うと、型にエイリアスをつけて後ろで利用できるようにする
  オブジェクトのプロパティの型にエイリアスをつけることも可能
  type MyAwaited<T> = T extends { hoge: infer U } ? U : never
*/

// 再帰の利用でネストしたPromiseを処理 + Promse<{}>を追加することでPromise以外が入った時に型エラーを出すようにする
type MyAwaited<T extends Promise<{}>> = T extends Promise<infer U> ? (U extends Promise<any> ? MyAwaited<U> : U) : never

type X = Promise<string>
type Y = Promise<{ field: number }>
type Z = Promise<Promise<string | number>>
type Z1 = Promise<Promise<Promise<string | boolean>>>

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>,
]

// @ts-expect-error
type error = MyAwaited<number>
