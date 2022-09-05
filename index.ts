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

function sum(n1:number,n2:number):number{
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
    func?: Function;
  }

  const obj2: IDescription = {
    name: 'linbudu',
    age: 599,
    male: true,
    func:()=>{}
    // 无需实现 func 也是合法的
  };

 obj2.male = false;
// obj2.func()
 

const obj:Record<string,unknown> = {false:2}

console.log(obj)

const uniqueSymbolFoo:  symbol = Symbol("linbudu")

// 类型不兼容
const uniqueSymbolBar:  symbol = uniqueSymbolFoo


function test(a:string):string | void{
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
type Result1 = Conditional<'linbudu', string, 'passed!', 'rejected!'>;

// "rejected!"
type Result2 = Conditional<'linbudu', boolean, 'passed!', 'rejected!'>;


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


