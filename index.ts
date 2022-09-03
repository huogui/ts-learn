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

