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
