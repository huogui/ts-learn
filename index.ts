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