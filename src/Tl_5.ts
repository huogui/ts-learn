type Union = 'a' | 'b' | 'c'

type UppercaseA<Item extends string> = Item extends 'a' ? Uppercase<Item> : Item

type A = UppercaseA<Union>

type Camelcase<Str extends string> = Str extends `${infer Left}_${infer Right}${infer Reset}` ? `${Left}${Uppercase<Right>}${Camelcase<Reset>}` : Str

type B = Camelcase<'a_bbb_ccc'>

type CamecaseArr<Arr extends unknown[]> = Arr extends [infer Head, ...infer ResetArr] ? [Camelcase<Head & string>, ...CamecaseArr<ResetArr>] : []

type C = CamecaseArr<['a_bbb_ccc_ddd', 'b_fffff_dkdkd_hhh']>

type CamelcaseUnion<Arr extends string> = Arr extends `${infer Left}_${infer Right}${infer Reset}` ? `${Left}${Camelcase<Right>}${CamelcaseUnion<Reset>}` : Arr

type IsUnion<A, B = A> = A extends A ? [B] extends [A] ? false : true : never

type D = IsUnion<[string | number]>
type E = IsUnion<string | number>

// BEM

type BEM<Block extends string, Element extends string[], Modifiers extends string[]> = `${Block}__${Element[number]}--${Modifiers[number]}`

type bem = BEM<'huogui', ['aaa', 'bbb'], ['warning', 'success']>

