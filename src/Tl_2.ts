// 删除一个字符串中某一段字符
type DropSubStr<Str extends string, SubStr extends string> = Str extends `${infer Head}${SubStr}${infer Tail}` ?
  DropSubStr<`${Head}${Tail}`, SubStr> : Str

type A = DropSubStr<'abcccccchhhhhs', 'c'>

type AppendArgument<Func extends Function, Arg> = Func extends (...args: infer Args) => infer ReturnType ? (...args: [...Args, Arg]) => ReturnType : never

type B = AppendArgument<(name: string) => string, number>

