import {expectType} from 'tsd';

type DeepPartial<T extends object> = {
     [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
 };

 type DeepPartialStruct = DeepPartial<{
   foo: string;
   nested: {
     nestedFoo: string;
     nestedBar: {
       nestedBarFoo: string;
     };
   };
 }>;


 
 expectType<DeepPartialStruct>({
   foo: 'bar',
   nested: {},
 });
 
 expectType<DeepPartialStruct>({
   nested: {
     nestedBar: {},
   },
 });
 
 expectType<DeepPartialStruct>({
   nested: {
     nestedBar: {
       nestedBarFoo: 'test',
     },
   },
 });



 type DeepRequired<T extends object> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired<T[K]> : T[K];
 }

 type DeepRequiredStruct = DeepRequired<{
  foo: string;
  nested: {
    nestedFoo: string;
    nestedBar: {
      nestedBarFoo: string;
    };
  };
}>;


 
expectType<DeepRequiredStruct>({
  foo:'foo',
  nested: {
    nestedFoo: 'test',
    nestedBar: {
      nestedBarFoo: 'test',
    },
  },
});


type DeepReadonly<T extends object> = {
  readonly [K in keyof T]:T[K] extends object?DeepReadonly<T[K]>:T[K]
}
 

type DeepReadonlyStruct = DeepReadonly<{
  foo: string;
  nested: {
    nestedFoo: string;
    nestedBar: {
      nestedBarFoo: string;
    };
  };
}>;
expectType<DeepReadonlyStruct>({
  foo:'foo',
  nested: {
    nestedFoo: 'test',
    nestedBar: {
      nestedBarFoo: 'test',
    },
  },
});

type DeepMutable<T extends object> = {
  - readonly [K in keyof T]:T[K] extends object?DeepMutable<T[K]>:T[K]
}


type DM = DeepMutable<DeepReadonlyStruct>


type F = number | string | null | undefined

type DeepF = {
  name:  number | string | null | undefined,
  run:{
    age: number | string | null | undefined,
  }
}

type NonNullable<T> = T extends null | undefined ? never : T


type Fs = NonNullable<F>

type DeepNonNullbale<T extends object> = {
  [K in keyof T]:T[K] extends object?DeepNonNullbale<T[K]>:NonNullable<T[K]>
}

type DeepNonNullbaleStruct = DeepNonNullbale<DeepF>

expectType<DeepNonNullbaleStruct>({
  name:123,
  run:{
    age:  123
  }

})
 type Flatten<T> = { [K in keyof T]: T[K] };

type MarkPropsAsOptional<T extends object,K extends keyof T = keyof T> = Flatten<Partial<Pick<T,K>> & Omit<T,K>>

type DeepMarkPropsAsOptional< T extends object,K extends keyof T = keyof T> = Flatten<DeepPartial<Pick<T,K>> & Omit<T,K>>



type DeepMarkPropsAsOptionalStruct = DeepMarkPropsAsOptional<{
  name:123,
  run:{
    age:  123
  }
},'run'| 'name'>

type MarkPropsAsOptionalStruct = MarkPropsAsOptional<
  {
    foo: string;
    bar: number;
    baz: boolean;
  },
  'bar'
>;


expectType<DeepMarkPropsAsOptionalStruct>({
  run:{}
})

type Nullable<T> = T | null

type DeepNullable<T extends object> = {
  [K in keyof T]:T[K] extends object?DeepNullable<T[K]>:Nullable<T[K]>
}


type MarkPropsAsRequired<T extends object,K extends keyof T = keyof T> = Flatten<DeepRequired<Pick<T,K>> & Omit<T,K>>


type MarkPropsAsReadonly<T extends object,K extends keyof T = keyof T> = Flatten<DeepReadonly<Pick<T,K>> & Omit<T,K>>

type MarkPropsAsMutable<T extends object,K extends keyof T = keyof T> = Flatten<DeepMutable<Pick<T,K>> & Omit<T,K>>

type MarkPropsAsNullable<T extends object,K extends keyof T = keyof T> = Flatten<DeepNullable<Pick<T,K>> & Omit<T,K>>

type MarkPropsAsNonNullable<
  T extends object,
  K extends keyof T = keyof T
> = Flatten<Omit<T, K> & DeepNonNullbale<Pick<T, K>>>;



//结构类型进阶


type FuncStruct = (...args: any[]) => any;

// type FunctionKeys<T extends object> = {
//   [K in keyof T] : T[K] extends FuncStruct ? K : never
// }[keyof T]


// type FunStruct = {
//   a:()=>void,
//   b:()=>void,
//   c:()=>void,
//   d:string
// }

// type FunKeys = FunctionKeys<FunStruct>


type ExpectPropKeys<T extends object,ValueType> = {
  [K in keyof T]-? : T[K] extends ValueType ? K : never
}[keyof T]


type FunctionKeys<T extends object> = ExpectPropKeys<T,FuncStruct>


expectType<
  FunctionKeys<{
    foo: () => void;
    bar: () => number;
    baz: number;
  }>
>('foo');

expectType<
  FunctionKeys<{
    foo: () => void;
    bar: () => number;
    baz: number;
  }>
  // 报错，因为 baz 不是函数类型属性
>('baz');


// type PickByValueType<T extends object,ValueType> = Pick<T,ExpectPropKeys<T,ValueType>>


expectType<PickByValueType<{ foo: string; bar: number }, string>>({
  foo: 'linbudu111',
});


type FilterPropsKeys<T extends object,ValueType> = {
  [K in keyof T]-? : T[K] extends ValueType ? never : K
}[keyof T]

// type OmitByValueType<T extends Record<string,any>,ValueType> = Pick<T,FilterPropsKeys<T,ValueType>>


expectType<OmitByValueType<{ foo: string; bar: number }, string>>({
  bar: 1,
});



// type Conditional<Value, Condition, Resolved, Rejected> = Value extends Condition
//   ? Resolved
//   : Rejected;

//  type ValueTypeFilter<
//   T extends object,
//   ValueType,
//   Positive extends boolean
// > = {
//   [Key in keyof T]-?: T[Key] extends ValueType
//     ? Conditional<Positive, true, Key, never>
//     : Conditional<Positive, true, never, Key>;
// }[keyof T];

//  type PickByValueType<T extends object, ValueType> = Pick<
//   T,
//   ValueTypeFilter<T, ValueType, true>
// >;

//  type OmitByValueType<T extends object, ValueType> = Pick<
//   T,
//   ValueTypeFilter<T, ValueType, false>


// >;

// type Condition<Value,Condition,resolved,rejected,Failed = never> = [Value] extends [Condition] ? [Condition] extends [Value] ? resolved : rejected : Failed



// type ValueTypeFilter<T extends object,ValueType,Positive extends boolean> = {
//   [K in keyof T]-?:T[K] extends ValueType ? StrictConditional<Positive,true,K,never> : StrictConditional<Positive,true,never,K>
// }[keyof T]

// type PickByValueType<T extends object,ValueType> = Pick<T,ValueTypeFilter<T,ValueType,true>>
// type OmitByValueType<T extends object,ValueType> = Pick<T,ValueTypeFilter<T,ValueType,false>>


// expectType<PickByValueType<{ foo: string; bar: number }, string>>({
//   foo: 'linbudu111',
// });

// expectType<OmitByValueType<{ foo: string; bar: number }, string>>({
// });



type StrictConditional<K,ValueType,Resolved,Rejected,Failed = never> = [K] extends [ValueType] ? [ValueType] extends [K] ? Resolved : Rejected : Failed 
//Positive 默认是Pick 
type StrictValueTypeFilter<T,ValueType,Positive extends boolean = true> = {
  [K in keyof T] : StrictConditional<T[K],ValueType,Positive extends true ? K :never,Positive extends true ? never : K,Positive extends true ? never : K>
}[keyof T]

type FilterStruct = {
  name:string,
  age:number
}




type OmitByValueType<T extends object,ValueType> = Pick<T,StrictValueTypeFilter<T,ValueType,false>>
type PickByValueType<T extends object,ValueType> = Pick<T,StrictValueTypeFilter<T,ValueType,true>>


type Test1 = OmitByValueType<FilterStruct,number>
type Test2 = PickByValueType<FilterStruct,number>


interface VIP {
  vipExpires: number;
}

interface CommonUser {
  promotionUsed: boolean;
}



type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };


type Tmp1 = Flatten<Without<VIP, CommonUser>>;
type Tmp0 = Flatten<Without<CommonUser, VIP>>;


type Tmp2 = Flatten<Tmp1 & CommonUser>;
type Tmp3 = Flatten<Tmp0 & VIP>;

type XORUser = Tmp2 | Tmp3



expectType<XORUser>({
  vipExpires: 0,
});

expectType<XORUser>({
  promotionUsed: false,
});


//集合工具类型进阶

type Concurrence<T,U> = T | U

type InterSection<T,U> = T extends U ? T : never

type Difference<A,B> = A extends B ? never : A

type Complement<A,B extends A> = Difference<A,B>



type PlainObjectType = Record<string,any>

//并集
type ObjectKeysConcurrence<T extends PlainObjectType,U extends PlainObjectType> = keyof T | keyof U;


type OKC = ObjectKeysConcurrence<{'a':number},{'a':number,'b':number}>


//属性名交集

type ObjectKeysIntersection<T extends PlainObjectType,U extends PlainObjectType> = InterSection<keyof T,keyof U>

//属性名差集

type ObjectKeysDifference<T extends PlainObjectType,U extends PlainObjectType> = Difference<keyof T,keyof U>

type OKD = ObjectKeysDifference<{'a':number,'b':number},{'a':number}>

//属性名补集

type ObjectKeysComplement<T extends U,U extends PlainObjectType> = Complement<keyof T,keyof U>


//对象

//交集 Intersection 交接点 交叉点
type ObjectIntersection<T extends PlainObjectType,U extends PlainObjectType> = Pick<T,ObjectKeysIntersection<T,U>>


type OI = ObjectIntersection<{'a':number,'b':number},{'a':number}>


//Difference 区别 差异
type ObjectDifference<T extends PlainObjectType,U extends PlainObjectType> = Pick<T,ObjectKeysDifference<T,U>>

type OD = ObjectDifference<{'a':number,'b':number},{'a':number}>


//Complement 补充

type ObjectComplement<T extends U,U extends PlainObjectType> = Pick<T,ObjectKeysComplement<T,U>>

type OC = ObjectComplement<{'a':number,'b':number,c:string},{'a':number,b:number}>


type Merge<T extends Record<string,any>,U extends Record<string,any>> = 
   ObjectDifference<T,U> & ObjectIntersection<U,T> & ObjectDifference<U,T>
type MG = Flatten<Merge<{'a':number,'b':number,c:string},{'a':number,b:number}>>



// 模式匹配工具类型进阶


type FirstParameter<T extends (...args:any[])=>any> = T extends (arg:infer Head,args:any)=>any ? Head: never 


type FunctionType = (...args: any) => any;

type LastParameter<T extends FunctionType> = T extends (arg:infer P)=>any ? P : T extends (...arg: infer R)=>any? R extends [...any,infer Q]? Q:never: never



type FT = LastParameter<(a:string,b:number,c:boolean,d:symbol)=>string>



type S = {} extends {prop:number} ? "Y" : "N"
type S1= {} extends {prop?:number} ? "Y" : "N"




type requiredKeys<T extends Record<keyof any,any>> = {
  [K in keyof T]-? : {} extends Pick<T,K> ? never : K
}[keyof T]


export type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

type TR = OptionalKeys<{
  name?:string,
  age:number
}>

//模板字符串

type Greet<T extends string | number | boolean | null | undefined | bigint> = `Hello ${T}`;

type Greet1 = Greet<"linbudu">; // "Hello linbudu"
type Greet2 = Greet<599>; // "Hello 599"
type Greet3 = Greet<true>; // "Hello true"
type Greet4 = Greet<null>; // "Hello null"
type Greet5 = Greet<undefined>; // "Hello undefined"
type Greet6 = Greet<0x1ffffffffffffffffffff>; // "Hello 9007199254740991"


type GreetString = `Hello ${number}`

let a:GreetString = 'Hello 9'

type Version =  `${number}.${number}.${number}`

let version:Version = '1.2.1'


type Brand = 'iphone' | 'xiaomi' | 'honor';
type Memory = '16G' | '64G';
type ItemType = 'official' | 'second-hand';

type SKU = `${Brand}-${Memory}-${ItemType}`;


type SizeRecord<T extends string> = `${T}-Record`

type Size = 'Small' | 'Middle' | 'Large'

type UnionSizeRecord = SizeRecord<Size>


declare let v1: `${number}.${number}.${number}`;
declare let v2: '1.2.4';

v1 = v2;


//结合索引类型与映射类型


interface Foo {
  name: string;
  age: number;
  job: symbol;
}

// 提示并约束为 "nameChanged" | "ageChanged" | "jobChanged"
listener.on('ageChanged');

type DeepCopy<T extends Object> = {
  [K in keyof T]? : T[K] extends object ? DeepCopy<T[K]> : T[K]
}


type obj = {
  name:1,
  test:{
    a:1
  }
}

type DC = DeepCopy<obj>

expectType<DC>(
  {
   name:1,
   test:{
    a:1
   }
  }
)


interface Foo222 {
  name: string;
  age: number;
}

type CopyWithRename<T extends Record<keyof any,any>> = {
  [K in keyof T as `modified_${string & K}`] : T[K] extends object ? DeepCopy<T[K]> : T[K]
}

type CF = CopyWithRename<Foo222>


type Heavy<T extends string> = `${Uppercase<T>}`
type Respect<T extends string> = `${Capitalize<T>}`;


type US = Heavy<'string'>

type USP = Lowercase<US>


type UR = Respect<'string'>

type URP = Uncapitalize<'String'>



type CopyWithRenameWithCap<T extends Record<keyof any,any>> = {
  [K in keyof T as `modified_${string & K}`] : T[K] extends object ? DeepCopy<T[K]> : T[K]
}

type CFC = CopyWithRenameWithCap<Foo222>


//模板字符串类型与模式匹配


type ReverseName<T extends string> = T extends `${infer First} ${infer Last}` ? `${Capitalize<Last>} ${Capitalize<First>}`: T

type Rail = ReverseName<'wang rail'>;

declare function handler<Str extends string>(arg: `Guess who is ${Str}`): Str;

handler(`Guess who is Linbudu`); // "Linbudu"
handler(`Guess who is `); // ""
handler(`Guess who is  `); // " "

type PickByValueTypePlus<T extends Record<string,any>,V> = {
  [K in keyof T as T[K] extends V ? K : never] :T[K]
}

type OmitByValueTypePlus<T extends Record<string,any>,V> = {
  [K in keyof T as T[K] extends V ? never : K] :T[K]
}

type OMP = {
  name:string,
  age?:number
}
type TOMP = OmitByValueTypePlus<OMP,string>