import type { Equal, Expect } from '@type-challenges/utils'

/*
  誤答集

  Kに関する制約がない -> Kがプリミティブ型の可能性がありkeyof句が使えない
  type MyPick<T, K> = {[key in keyof K]: T[key]};

  Kに関する制約がない -> KがUnion型ではない可能性があり、in句が使えない
  type MyPick<T, K> = {[key in K]: T[key]};

  key in Kの制約がない -> Union型そのまま
  type MyPick<T, K extends keyof T> = {[key in K]: T[K]}
*/

type MyPick<T, K extends keyof T> = { [key in K]: T[key] }

type cases = [
  Expect<Equal<Expected1, MyPick<Todo, 'title'>>>,
  Expect<Equal<Expected2, MyPick<Todo, 'title' | 'completed'>>>,
  // @ts-expect-error
  MyPick<Todo, 'title' | 'completed' | 'invalid'>,
]

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
}

interface Expected2 {
  title: string
  completed: boolean
}
