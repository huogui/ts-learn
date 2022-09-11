declare let func22:(raw:number)=>(input:string)=>any

interface Foo {
    name: string;
    age: number;
    job: symbol;
  }

type ChangeListener = {
    on: (change: `${keyof Foo}Changed`) => void;
  };
  
declare let listener: ChangeListener;


// declare function handleName<T extends string>(arg:`who is ${T}`):T

declare var fi:()=>void

declare interface Foo2 {
  name:string,
  age: number
}

declare module "pkg" {
  const handler: () => boolean
  export default handler
}


declare module "*.md" {
  const raw: string;
  export default raw;
}

interface Window {
  userTracker: (...arg: any[]) => Promise<void>
}

declare module "fs" {
  export function bump():void
}