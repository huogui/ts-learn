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