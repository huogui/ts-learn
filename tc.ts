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