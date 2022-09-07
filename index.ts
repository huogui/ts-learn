/**
 * tsc --init
 * ts-node index.ts
 * ts-node-dev --respawn --transpile-only index.ts
 * source:https://juejin.cn/book/7086408430491172901/section/7100487863032086561
 * 只做学习笔记使用
 * 
 * 
 * 

*/

func22tion sum(n1:number,n2:number):number{
    return n1 + n2
}

console.log(sum(1,2000))



interface Foo{
    name:string,
    age:string,
}

interface Bar{
    name:string,
    job:string
}

declare let foo:Foo;
declare let bar:Bar;

// foo = bar

import { expectType,expectNotType, expectAssignable } from 'tsd'

expectType<string>('123')
expectNotType<string>(123)

// expectAssignable<string|number>(false)

// let  a:number = null


const arr4: [string, string, string] = ['lin', 'bu', 'du'];

// arr4[133]

const arr6: [string, number?, boolean?] = ['1'];

type arr6Len = typeof arr6.length

const arr5: [string, number, boolean] = ['1', 599, true];

const [name, age, male, ...others] = arr5;

console.log(others)

interface IDescription {
    name: string;
    age: number;
    male?: boolean;
    func22?: Func22tion;
  }

  const obj2: IDescription = {
    name: 'linbudu',
    age: 599,
    male: true,
    func22:()=>{}
    // 无需实现 func22 也是合法的
  };

 obj2.male = false;
// obj2.func22()
 

const obj:Record<string,unknown> = {false:2}

console.log(obj)

const uniqueSymbolFoo:  symbol = Symbol("linbudu")

// 类型不兼容
const uniqueSymbolBar:  symbol = uniqueSymbolFoo


func22tion test(a:string):string | void{
    return a
}

test('te')

function reset(arg1:string,...reset:[string,number,boolean]){

}


function func(foo: number, bar: true): string;
function func(foo: number, bar?: false): number;
function func(foo: number, bar?: boolean): string | number {
  if (bar) {
    return String(foo);
  } else {
    return foo * 599;
  }

}

const res1 = func('11'); // number
const res2 = func(599, true); // string
const res3 = func(599, false); // number



async function asyncFun(): Promise<void>{}
function* genFunc():Iterable<void>{}
async function* asyncGenFunc():AsyncIterable<void>{}


let foo1;

// foo、bar 均为 any
// function func1(foo, bar){}

let unknownVar: unknown = "linbudu";


const val1: string = unknownVar; // Error
const val2: number = unknownVar; // Error
const val3: () => {} = unknownVar; // Error
const val4: {} = unknownVar; // Error


const val5: any = unknownVar;
const val6: unknown = unknownVar;


let unknownVar1: unknown;

unknownVar1.foo(); // 报错：对象类型为 unknown
(unknownVar1 as {foo:()=>{}}).foo()//断言


type UnionWithNever = "linbudu" | 599 | true | void | never;


declare let v1: never;
declare let v2: void;


// v1 = v2; // X类型 void 不能赋值给类型 never

v2 = v1;


function justThrow(): never {
  throw new Error()
}

function fooer (input:number){
  if(input > 1){
    justThrow();
  }
}



const arr = [];

arr.push("linbudu"); // 类型“string”的参数不能赋给类型“never”的参数。

let unknownStr: unknown;

(unknownStr as { foo: () => {} }).foo();



function respawn(union: string | number) {
  if ((union as string).includes("linbudu")) { }

  if ((union as number).toFixed() === '599') { }
}



interface IFoo {
  name: string;
}

declare const obj1: {
  foo1: IFoo
}

const {
  foo1 = {} as IFoo
} = obj1


const str: string = "linbudu";

// 从 X 类型 到 Y 类型的断言可能是错误的，
(str as unknown as { handler: () => {} }).handler()




declare const number: {
  func?: () => ({
    prop?: number | null;
  })
};

number.func!().prop!.toFixed();


const target = [1, 2, 3, 599].find(item => item === 599)!

console.log(target)


interface IStruct {
  foo: string;
  bar: {
    barPropA: string;
    barPropB: number;
    barMethod: () => void;
    baz: {
      handler: () => Promise<void>;
    };
  };
}


const st = <IStruct>  {
foo:'1'
};



type StatusCode = 200 | 301 | 400 | 500 | 502;
type PossibleDataTypes = string | number | (() => unknown);

const status: StatusCode = 502;

// type Factory<T> = T | number | string;


type MaybeNull<T> = T | null;

function process(input: MaybeNull<{ handler: () => {} }>) {
  input?.handler();
}


type MaybeArray<T> = T | T[];

// 函数泛型我们会在后面了解~
function ensureArray<T>(input: MaybeArray<T>): T[] {
  return Array.isArray(input) ? input : [input];
}


type StrAndNum = string & number; // never



type Struct1 = {
  primitiveProp: string;
  objectProp: {
    name: string;
  }
}

type Struct2 = {
  primitiveProp: number;
  objectProp: {
    age: number;
  }
}

type Composed = Struct1 & Struct2;

type PrimitivePropType = Composed['primitiveProp']; // never
type ObjectPropType = Composed['objectProp']; // { name: string; age: number; }

type UnionIntersection1 = (1 | 2 | 3) & (1 | 2); // 1 | 2
type UnionIntersection2 = (string | number | symbol) & string; // string


interface AllStringTypes {
  [key: string]: string;
}

type PropType1 = AllStringTypes['linbudu']; // string
type PropType2 = AllStringTypes['599']; // string


const o: AllStringTypes = {
  "linbudu": "599",
  599: "linbudu",
  [Symbol.for("ddd")]: 'symbol',
}


type okeys = keyof AllStringTypes


type anys = keyof any



type Stringify<T> = {
  [K in keyof T]: T[K];
};

interface Foo1 {
  prop1: string;
  prop2: number;
  prop3: boolean;
  prop4: () => void;
}

type StringifiedFoo = Stringify<Foo1>;




//泛型开始



// type Factory<T> = T | number | string;


type Clone<T> = {
  [K in keyof T]:T[K]
}

// type Partial<T> = {
//   [K in keyof T]?:T[K]
// }

interface person  {
  name:string,
  age:number
}

type Strify<T> = {
  [K in keyof T]:string
}

type CloneP = Clone<person>
type ClonePp = Partial<person>
type StringP = Strify<person>

type PartialPerson = Partial<person>

//映射类型、索引类型、
//条件类型开始
type IsEqual<T> = T extends true? 1 : 2 //extends 

type A = IsEqual<true>; // 1
type B = IsEqual<false>; // 2
type C = IsEqual<'linbudu'>; // 2


//类型约束和默认值
//默认值
type Factory<T = boolean> = T | number | string;

const Fa: Factory = false;

//泛型约束
/**
 * 而在泛型中，我们可以使用 extends 关键字来约束传入的泛型参数必须符合要求。关于 extends，A extends B 意味着 A 是 B 的子类型，
 * 这里我们暂时只需要了解非常简单的判断逻辑，也就是说 A 比 B 的类型更精确，或者说更复杂。具体来说，可以分为以下几类。
 * 
*/

// type ResStatus<ResCode extends number = 10000> = ResCode extends 10000 | 10001 | 10002
//   ? 'success'
//   : 'failure';

type ResStatus<ResCode extends number = 10000> = ResCode extends 10000 | 10001 | 10002?'success':'failure' 


type Res1 = ResStatus<10000>; // "success"
type Res2 = ResStatus<20000>; // "failure"

type Res3 = ResStatus<'10000'>; // 类型“string”不满足约束“number”。

type Res4 = ResStatus; // "success"


//多泛型关联
/**
 * 我们不仅可以同时传入多个泛型参数，还可以让这几个泛型参数之间也存在联系。我们可以先看一个简单的场景，条件类型下的多泛型参数：
 * 
*/


type Conditional<Type, Condition, TruthyResult, FalsyResult> =
  Type extends Condition ? TruthyResult : FalsyResult;

//  "passed!"
// type Result1 = Conditional<'linbudu', string, 'passed!', 'rejected!'>;

// "rejected!"
// type Result2 = Conditional<'linbudu', boolean, 'passed!', 'rejected!'>;


type ProcessInput<
  Input,
  SecondInput extends Input = Input,
  ThirdInput extends Input = SecondInput
> = number;

//对象类型中的泛型
interface IRes<TData = unknown> {
  code: number;
  error?: string;
  data: TData;
}


interface IUserProfileRes {
  name: string;
  homepage: string;
  avatar: string;
}

function fetchUserProfile(): Promise<IRes<IUserProfileRes>> {
  return Promise.resolve({
    code:200,
  data:{
    name:"ceshi",
    homepage:"1",
    avatar:'1'
  }
  })
}

type StatusSucceed = boolean;
function handleOperation(): Promise<IRes<StatusSucceed>> {
  return Promise.resolve({
    code:200,
    data:false
  })
}


//分页场景

interface IPaginationRes<IData = unknown>  {
  data:IData,
  page:number,
  totalPage:number,
  hasNextPage:boolean
}


function fetchUserProfileList():Promise<IRes<IPaginationRes<IUserProfileRes>>>{
  return Promise.resolve({
    code:200,
    data:{
      data:{
        name:'name',
        homepage:"1",
        avatar:'1'
      },
      page:1,
      totalPage:20,
      hasNextPage:true
    }
  })
}


//类型的自动提取。

// function handle(input: string | number | {}): string | number | {} {}


// const shouldBeString = handle("linbudu");
// const shouldBeNumber = handle(599);
// const shouldBeObject = handle({ name: "linbudu" });
function handle<T extends string | number>(input: T): T {
  return input
}

const author = "linbudu"; // 使用 const 声明，被推导为 "linbudu"

let authorAge = 18; // 使用 let 声明，被推导为 number

handle(author); // 填充为字面量类型 "linbudu"
handle(authorAge); // 填充为基础类型 number

function swap<T extends number, U extends number>([start,end]:[T,U]):[U,T]{
  return [end,start]
}


const swapped1 = swap([23, 599]);
const swapped2 = swap([20, 599]);


/***
 * 
 * 比如 lodash 的 pick 函数，这个函数首先接受一个对象，然后接受一个对象属性名组成的数组，并从这个对象中截取选择的属性部分：
 * 
 * _.pick(object, ['a', 'c']);
 * => { 'a': 1, 'c': 3 }
*/
function handle1<T>(payload: T): Promise<[T]> {
  return new Promise<[T]>((res, rej) => {
    res([payload]);
  });
}


const handle2 = <T extends any>(input: T): T => {
  return input
}


//内置方法中的泛型

interface PromiseConstructor {
  resolve<T>(value: T | PromiseLike<T>): Promise<T>;
}

declare var Promise: PromiseConstructor;



// 第一种 reduce
arr.reduce((prev, curr, idx, arr) => {
  return prev;
}, 1);

// 第二种 reduce
// 报错：不能将 number 类型的值赋值给 never 类型
arr.reduce<number[]>((prev, curr, idx, arr) => {
  return prev
}, []);

//结构化类型系统


class Cat {
  // meow() { }
  eat(): number {
    return 123
  }
}

// class Dog {
//   eat(): number {
//     return 599;
//   }
// }

function feedCat(cat: Cat) { }

// feedCat(new Dog())   //居然可以......

// Duck Test -> Duck Typing 其核心理念是，如果你看到一只鸟走起来像鸭子，游泳像鸭子，叫得也像鸭子，那么这只鸟就是鸭子。===> Cat === Dog



// type USD = number;
// type CNY = number;

// const CNYCount: CNY = 200;
// const USDCount: USD = 200;

// function addCNY(source: CNY, input: CNY) {
//   return source + input;
// }

// addCNY(CNYCount, USDCount)


//标称类型系统
//在 TypeScript 中模拟标称类型系统



// export declare class TagProtector<T extends string> {
//   protected __tag__: T;
// }

// export type Nominal<T, U extends string> = T & TagProtector<U>;


export declare class TagProtector<T extends string>{
  protected __tag__:T
}

export type Nominal<T,U extends string> = T & TagProtector<U>


/****
 * 
 * 在这里我们使用 TagProtector 声明了一个具有 protected 属性的类，使用它来携带额外的信息，并和原本的类型合并到一起，就得到了 Nominal 工具类型。
 * 
 * *******/

// type CNY = Nominal<number,'CNY'>
// type USD = Nominal<number,'USD'>

// const CNYCount = 200 as CNY;
// const USDCount = 200 as USD;


// function addCNY(source: CNY, input: CNY) {
//   return (source + input) as CNY;
// }


// addCNY(CNYCount, CNYCount);

// // 报错了！
// addCNY(CNYCount, USDCount);


class CNY {
  private __tag!: void;
  constructor(public value: number) {}
}
class USD {
  private __tag!: void;
  constructor(public value: number) {}
}

const CNYCount = new CNY(100);
const USDCount = new USD(100);

function addCNY(source: CNY, input: CNY) {
  return (source.value + input.value);
}

addCNY(CNYCount, CNYCount);
// 报错了！
addCNY(CNYCount, USDCount);


//Opaque Type 
declare const tag: unique symbol;

declare type Tagged<Token> = {
    readonly [tag]: Token;
};

export type Opaque<Type, Token = unknown> = Type & Tagged<Token>;


// 在 TypeScript 中我们可以通过类型或者逻辑的方式来模拟标称类型，这两种方式其实并没有非常明显的优劣之分，基于类型实现更加轻量，
// 你的代码逻辑不会受到影响，但难以进行额外的逻辑检查工作。而使用逻辑实现稍显繁琐，但你能够进行更进一步或更细致的约束。



// 类型层级开始

type Result = 'linbudu' extends string ? 1 : 2;


declare let source: string;

declare let anyType: any;
declare let neverType: never;


anyType = source;

// 不能将类型“string”分配给类型“never”。
neverType = source;



type Result1 = "linbudu" extends string ? 1 : 2; // 1
type Result2 = 1 extends number ? 1 : 2; // 1
type Result3 = true extends boolean ? 1 : 2; // 1
type Result4 = { name: string } extends object ? 1 : 2; // 1
type Result5 = { name: 'linbudu' } extends object ? 1 : 2; // 1
type Result6 = [] extends object ? 1 : 2; // 1


//联合类型
type Result7 = 1 extends 1 | 2 | 3 ? 1 : 2; // 1
type Result8 = 'lin' extends 'lin' | 'bu' | 'du' ? 1 : 2; // 1
type Result9 = true extends true | false ? 1 : 2; // 1

//结论：字面量类型 < 包含此字面量类型的联合类型，原始类型 < 包含此原始类型的联合类型。


type Result11 = 'lin' | 'bu' | 'budu' extends string ? 1 : 2; // 1
type result12 = [] | {} | (()=>void) extends object?1:2

//结论：同一基础类型的字面量联合类型 < 此基础类型。

// 最终结论：字面量类型 < 包含此字面量类型的联合类型（同一基础类型） < 对应的原始类型，即：

type Result13 = 'linbudu' extends 'linbudu' | '599'
  ? 'linbudu' | '599' extends string
    ? 2
    : 1
  : 0;
//装箱类型
type Result14 = string extends String ? 1 : 2; // 1
type Result15 = String extends {} ? 1 : 2; // 1
// type Result16 = {} extends object ? 1 : 2; // 1
// type Result18 = object extends Object ? 1 : 2; // 1


type Tmp = string extends object ? 1 : 2; // 2


type Result16 = {} extends object ? 1 : 2;
type Result18 = object extends {} ? 1 : 2;

type Result17 = object extends Object ? 1 : 2;
type Result20 = Object extends object ? 1 : 2;

type Result19 = Object extends {} ? 1 : 2;
type Result21 = {} extends Object ? 1 : 2;

type test1 = number extends Object?1:2
type test2 = number extends object?1:2



// top type
// any unknown

type Result22 = Object extends any ? 1 : 2; // 1
type Result23 = Object extends unknown ? 1 : 2; // 1

type Result24 = any extends Object ? 1 : 2; // 1 | 2
type Result25 = unknown extends Object ? 1 : 2; // 2


type Result26 = any extends 'linbudu' ? 1 : 2; // 1 | 2
type Result27 = any extends string ? 1 : 2; // 1 | 2
type Result28 = any extends {} ? 1 : 2; // 1 | 2
type Result29 = any extends never ? 1 : 2; // 1 | 2


type Result31 = any extends unknown ? 1 : 2;  // 1
type Result32 = unknown extends any ? 1 : 2;  // 1

//结论 Object < any / unknown

//类型系统 向下探索

type Result33 = never extends 'linbudu' ? 1 : 2; // 1


type Result34 = undefined extends 'linbudu' ? 1 : 2; // 2
type Result35 = null extends 'linbudu' ? 1 : 2; // 2
type Result36 = void extends 'linbudu' ? 1 : 2; // 2

//never < 字面量类型


type TypeChain = never extends 'linbudu'
  ? 'linbudu' extends 'linbudu' | '599'
  ? 'linbudu' | '599' extends string
  ? string extends String
  ? String extends Object
  ? Object extends any
  ? any extends unknown
  ? unknown extends any
  ? 8
  : 7
  : 6
  : 5
  : 4
  : 3
  : 2
  : 1
  : 0

  type VerboseTypeChain = never extends 'linbudu'
  ? 'linbudu' extends 'linbudu' | 'budulin'
  ? 'linbudu' | 'budulin' extends string
  ? string extends {}
  ? string extends String
  ? String extends {}
  ? {} extends object
  ? object extends {}
  ? {} extends Object
  ? Object extends {}
  ? object extends Object
  ? Object extends object
  ? Object extends any
  ? Object extends unknown
  ? any extends unknown
  ? unknown extends any
  ? 8
  : 7
  : 6
  : 5
  : 4
  : 3
  : 2
  : 1
  : 0
  : -1
  : -2
  : -3
  : -4
  : -5
  : -6
  : -7
  : -8


  //其他比较场景

type Result360 = 1 | 2 | 3 extends 1 | 2 | 3 | 4 ? 1 : 2; // 1
type Result37 = 2 | 4 extends 1 | 2 | 3 | 4 ? 1 : 2; // 1
type Result38 = 1 | 2 | 5 extends 1 | 2 | 3 | 4 ? 1 : 2; // 2
type Result39 = 1 | 5 extends 1 | 2 | 3 | 4 ? 1 : 2; // 2


//数组和元组
type Result40 = [number, number] extends number[] ? 1 : 2; // 1
type Result41 = [number, string] extends number[] ? 1 : 2; // 2
type Result42 = [number, string] extends (number | string)[] ? 1 : 2; // 1
type Result43 = [] extends number[] ? 1 : 2; // 1
type Result44 = [] extends unknown[] ? 1 : 2; // 1
type Result45 = number[] extends (number | string)[] ? 1 : 2; // 1
type Result46 = any[] extends number[] ? 1 : 2; // 1
type Result47 = unknown[] extends number[] ? 1 : 2; // 2
type Result48 = never[] extends number[] ? 1 : 2; // 1


type Num = Result48 extends 1?1:0

type N1 = 0 extends 0?0:1

type T = true extends true?'true':'false'


// type LiteralType<T> = T extends string ? "string" : "other";

// type L1 = LiteralType<'str'>
// type L2 = LiteralType<false>




export type LiteralType<T> = T extends string
	? "string"
	: T extends number
	? "number"
	: T extends boolean
	? "boolean"
	: T extends null
	? "null"
	: T extends undefined
	? "undefined"
	: never;

type L1 = LiteralType<"linbudu">; // "string"
type L2 = LiteralType<599>; // "number"
type L3 = LiteralType<true>; // "boolean"
type L4 = LiteralType<{}>; // "boolean"


function universalAdd<T extends number | bigint | string>(x: T, y: T):LiteralToPrimitive<T> {
  return x + (y as any);
}



type LiteralToPrimitive<T> = T extends number?number:T extends bigint?bigint:T extends string?string:never


universalAdd("linbudu", "599"); // string
universalAdd(599, 1); // number
universalAdd(10n, 10n); // bigint

//函数类型

type Func = (...args: any[]) => any;

type FunctionConditionType<T extends Func> = T extends (
  ...args: any[]
) => string
  ? 'A string return func!'
  : 'A non-string return func!';

//  "A string return func!"
type StringResult = FunctionConditionType<() => string>;
// 'A non-string return func!';
type NonStringResult1 = FunctionConditionType<() => boolean>;
// 'A non-string return func!';
type NonStringResult2 = FunctionConditionType<() => number>;




type Fun = (...args:any[])=>any

type FunctionalType<T extends Fun> = T extends (...args:any[])=>string?'A string return func!':'A non-string return func!'

type StringResult3 = FunctionConditionType<() => string>;
// 'A non-string return func!';
type NonStringResult4 = FunctionConditionType<() => boolean>;
// 'A non-string return func!';
type NonStringResult5 = FunctionConditionType<() => number>;

// 提取传入的类型信息   infer 关键字
type FunctionalSplit<T extends Fun> = T extends (...args:any[])=>infer R?R:never

type StringResult6 = FunctionalSplit<() => boolean>;


type Swap<T extends any[]> = T extends [infer A,...infer B]?[...B,A]:T

type SwapResult2 = Swap<[1, 2, 3]>; // 不符合结构，没有发生替换，仍是 [1, 2, 3]

type SwapFL<T extends number[]> = T extends [infer start,...infer left,infer end]?[end,...left,start]:T


type SFL = SwapFL<[1,2,3,4,5]>

type ToTuple<N extends number, List extends any[] = []> = List['length'] extends N
    ? List : ToTuple<N, [...List, any]>

type Tuple9 = ToTuple<9>['length']

type Sub<N1 extends number,N2 extends number> = ToTuple<N1> extends [...ToTuple<N2>,...infer Reset]?Reset['length']:-1

type Sub1 = Sub<2,1>



//数组

type ArrayItemType<T> = T extends Array<infer ElementType> ? ElementType : never;

type ArrayItemTypeResult1 = ArrayItemType<[]>; // never
type ArrayItemTypeResult2 = ArrayItemType<string[]>; // string
type ArrayItemTypeResult3 = ArrayItemType<[string, number]>; // string | number


// 提取对象的属性类型
type PropType<T,K extends keyof T> = T extends {[Key in K]:infer R}?R:never

type PropTypeResult1 = PropType<{ name: string }, 'name'>; // string


// 反转键名与键值
type ReverseKeyVal<T extends Record<string,unknown>> = T extends Record<infer K,infer V>?Record<V & string,K>:never

type Obj = ReverseKeyVal<{2:'str'}>

// Promise


// type PromiseValue<T> = T extends Promise<infer V> ? V : T;

// type PromiseValue<T> = T extends Promise<infer V>
//   ? V extends Promise<infer N>
//     ? N
//     : V
//   : T;

type PromiseValue<T> = T extends Promise<infer V> ? PromiseValue<V> : T;

type PromiseValueResult1 = PromiseValue<Promise<number>>; // number

type PromiseValueResult2 = PromiseValue<number>; // number，但并没有发生提取

type PromiseValueResult3 = PromiseValue<Promise<Promise<boolean>>>; // Promise<boolean>，只提取了一层



//分布式条件类型


type Condition<T> = T extends 1 | 2 | 3 ? T : never;

// 1 | 2 | 3
type Res11 = Condition<1 | 2 | 3 | 4 | 5>;

// never
type Res22 = 1 | 2 | 3 | 4 | 5 extends 1 | 2 | 3 ? 1 | 2 | 3 | 4 | 5 : never;


type Naked<T> = T extends boolean ? "Y" : "N";
type Wrapped<T> = [T] extends [boolean] ? "Y" : "N";

// "N" | "Y"
type Res33 = Naked<number | boolean>;

// "N"
type Res44 = Wrapped<number | boolean>;

//妖魔化工具类型


//工具类型的分类


interface person{
  name:string,
  age:number
}

type PartialMy<T> = {[P in keyof T]?:T[P]}

type P = PartialMy<person>

type RequiredMy<T> = {[P in keyof T]-?:T[P]}

type Ps = RequiredMy<P>


type ReadonlyMy<T> = { readonly [P in keyof T]:T[P]}

type Pr = ReadonlyMy<Ps>


// type Mutable<T> = {-readonly [P in keyof T]:T[P]}

type Pm = Mutable<Pr>

export type NoDistribute<T> = T & {};

type Wrapped1<T> = NoDistribute<T> extends [boolean] ? "Y" : "N";

type CompareUnion<T, U> = [T] extends [U] ? true : false;

type CompareRes1 = CompareUnion<1 | 2, 1 | 2 | 3>; // true
type CompareRes2 = CompareUnion<1 | 2, 1>; // false


type IsNever<T> = [T] extends [never] ? true : false;

type IsNeverRes1 = IsNever<never>; // true
type IsNeverRes2 = IsNever<"linbudu">; // false


// 直接使用，返回联合类型
type Tmp1 = any extends string ? 1 : 2;  // 1 | 2

type Tmp2<T> = T extends string ? 1 : 2;
// 通过泛型参数传入，同样返回联合类型
type Tmp2Res = Tmp2<any>; // 1 | 2

// 如果判断条件是 any，那么仍然会进行判断
type Special1 = any extends any ? 1 : 2; // 1
type Special2<T> = T extends any ? 1 : 2;
type Special2Res = Special2<any>; // 1










// 直接使用，仍然会进行判断
type Tmp3 = never extends string ? 1 : 2; // 1

type Tmp4<T> = T extends string ? 1 : 2;
// 通过泛型参数传入，会跳过判断
type Tmp4Res = Tmp4<never>; // never

// 如果判断条件是 never，还是仅在作为泛型参数时才跳过判断
type Special3 = never extends never ? 1 : 2; // 1
type Special4<T> = T extends never ? 1 : 2;
type Special4Res = Special4<never>; // never

type Interselection<A,B> = A extends B?A:never;

type It = Interselection<1|2|3,2|3|4>


type IsAny<T> = 0 extends 1 & T ? true : false;

type Any1 = IsAny<false>



type IsUnknown<T> = IsNever<T> extends false
  ? T extends unknown
    ? unknown extends T
      ? IsAny<T> extends false
        ? true
        : false
      : false
    : false
  : false;


type IsUnknownPlus<T> = unknown extends T?IsAny<T> extends true?false:true:false





type RecordMy<K extends keyof any,V>={[P in K]:V}

interface Foo1 {
  name: string;
  age: number;
  sex:string;
}
interface Foo2 {
  name: string;
  age: number;
}



type MyPick<T,K extends keyof T> = {
  [P in K]:T[P]
}



type PickedFoo = MyPick<Foo, "name" | "age">


type C1 = number
type C2 = never

type MyExclude<T,U> = T extends U?never:T
type MyExtrack<T,U> = T extends U?T:never

type C3 = MyExtrack<C1,C2>


type MyOmit<T,K extends keyof any> = MyPick<T, MyExclude<keyof T,K>>


type B2 = MyOmit<Foo1,'name'>


//复习

type Record<K extends keyof any,V> = {
  [P in K]:V
}


type obj88 = {
  name:string,
  age:number
}


type Partial<T> = {[P in keyof  T]?:T[P]}

type Required<T> = {[P in keyof T]-?:T[P]}

type Readonly<T> = {readonly [P in keyof T]:T[P]}

type Mutable<T> = {-readonly [P in keyof T]:T[P]}


type Pick<T,U extends keyof T> = {
  [P in U]:T[P]
}

type Exclude<T,U> = T extends U?never:T //差集
type Extrack<T,U> = T extends U?T:never//交集


type Omit<T,K extends keyof T> = Pick<T,Exclude<keyof T,K>>

type PK = Pick<obj88,'name'>
type OT = Omit<obj88,'name'>


// type FunType = (...args:any)=>any

//取返回值部分

type FirstParameter<T extends FunType> = T extends (arg:infer P,...args:any)=>any?P:never

type FuncFoo = (arg: number) => string;
type FuncBar = (...args: string[]) => void;



// type ReturnType<T extends FunType> = T extends (...args:any)=>infer R?R:never



type FunType = (...args:any)=>any


type ReturnType<T extends FunType> = T extends (...args:any)=>infer R?R:never

type FirstType<T extends FunType> = T extends (arg:infer P,...args:any)=>any?P:never


type FooFirstParameter = FirstType<FuncFoo>; // number
type FuncBarFirstParams = ReturnType<FuncFoo>; // string


type ClassType = abstract new (...args:any)=>any;

type ConstructorParameters<T extends ClassType> = T extends abstract new (...args:infer P)=>any?P:never

type InstanceType<T extends ClassType> = T extends abstract new (...args:any)=>infer R?R:never


type CT = abstract new (arg:number)=>string

type CTP = ConstructorParameters<CT>
type CTR = InstanceType<CT>


//上下文类型

window.onerror = (event, source, line, col, err) => {};





func22 = (raw) => {
  // input → string
  return (input) => {};
};//上下文类型推导 ，听说我谢谢你温暖了四季！！！！


// void 返回值类型下的特殊情况

// 逆变与协变

class Animal {
  asPet() {}
}

class Dog extends Animal {
  bark() {}
}

class Corgi extends Dog {
  cute() {}
}

type DogFactory = (args: Dog) => Dog;


function transformDogAndBark(dogFactory: DogFactory) {
  const dog = dogFactory(new Dog());
  dog.bark();
}

function makeDogBark(dog: Dog) {
  dog.bark();
}

// 没问题
makeDogBark(new Corgi());
// 不行
makeDogBark(new Animal());



type AsFunArgType<T> = (arg:T)=> void

type AsFunReturnType<T> = (arg:unknown)=>T


// 1 成立：(T -> Corgi) ≼ (T -> Dog)
type CheckReturnType = AsFunReturnType<Dog> extends AsFunReturnType<Corgi>
  ? 1
  : 2;


// 2 不成立：(Dog -> T) ≼ (Animal -> T)

type CheckArgType = AsFunArgType<Animal> extends AsFunArgType<Dog> ? 1 : 2;


//进行一个总结：函数类型的参数类型使用子类型逆变的方式确定是否成立，而返回值类型使用子类型协变的方式确定。