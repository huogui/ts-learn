/**
 * tsc --init
 * ts-node index.ts
 * ts-node-dev --respawn --transpile-only index.ts
 *  
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

type Factory<T> = T | number | string;


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
