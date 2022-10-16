type Push<A extends unknown[], E> = [...A, E]

type P = Push<[1, 2, 3], 4>

type Unshift<A extends unknown[], E> = [E, ...A]

type U = Unshift<[2, 3, 4], 1>
// 从头开始切
type Zip<A extends unknown[], B extends unknown[]> =
A extends [infer Head, ...infer Reset] ?
  B extends [infer OtherHead, ...infer OtherReset] ?
      [[Head, OtherHead], ...Zip<Reset, OtherReset>] : [] : []

// 从尾巴开始切

type Zip2<A extends unknown[], B extends unknown[]> = A extends [...infer Reset, infer Tail] ? B extends [...infer OtherReset, infer OtherTail] ? [ ...Zip2<Reset, OtherReset>, [Tail, OtherTail]] : [] : []

type ZipResult = Zip<[1, 2, 3], ['guang', 'guang', 'guang']>
type Zip2Result = Zip2<[1, 2, 3], ['guang', 'guang', 'guang']>

type CapitalizeStr<Str extends string> = Str extends `${infer Head}${infer Reset}` ? `${Uppercase<Head>}${Reset}` : Str
