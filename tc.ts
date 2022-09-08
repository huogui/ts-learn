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





