# Typescript 学习
###### 摘自：https://juejin.cn/book/7086408430491172901/section/7100488836853006375

# 工具类型的分类
  - 对属性的修饰，包括对象属性和数组元素的可选/必选、只读/可写。我们将这一类统称为属性修饰工具类型。
  - 对既有类型的裁剪、拼接、转换等，比如使用对一个对象类型裁剪得到一个新的对象类型，将联合类型结构转换到交叉类型结构。我们将这一类统称为结构工具类型。
  - 对集合（即联合类型）的处理，即交集、并集、差集、补集。我们将这一类统称为集合工具类型。
  - 基于 infer 的模式匹配，即对一个既有类型特定位置类型的提取，比如提取函数类型签名中的返回值类型。我们将其统称为模式匹配工具类型。
  - 模板字符串专属的工具类型，比如神奇地将一个对象类型中的所有属性名转换为大驼峰的形式。这一类当然就统称为模板字符串工具类型了。
# 属性修饰工具类型
  
    type Partial<T> = {
        [P in keyof T]?: T[P];
    };

    type Required<T> = {
        [P in keyof T]-?: T[P];
    };

    type Readonly<T> = {
        readonly [P in keyof T]: T[P]
    }

    type Mutable<T> = {
        -readonly [P in keyof T]: T[P]
    }

# 结构工具类型
   
    type RecordMy<K extends keyof any,V>={[P in K]:V}

    type MyPick<T,K extends keyof T> = {
        [P in K]:T[P]
    }

    type MyExclude<T,U> = T extends U?never:T

    type MyExtrack<T,U> = T extends U?T:never

    type MyOmit<T,K extends keyof any> = MyPick<T, MyExclude<keyof T,K>>

    type FunType = (...args:any)=>any


    type ReturnType<T extends FunType> = T extends (...args:any)=>infer R?R:never

    type FirstType<T extends FunType> = T extends (arg:infer P,...args:any)=>any?P:never
    

    type ClassType = abstract new (...args:any)=>any;

    type ConstructorParameters<T extends ClassType> = T extends abstract new (...args:infer P)=>any?P:never

    type InstanceType<T extends ClassType> = T extends abstract new (...args:any)=>infer R?R:never


    type CT = abstract new (arg:number)=>string

    type CTP = ConstructorParameters<CT>
    type CTR = InstanceType<CT>


# 上下文类型
  **void 返回值类型下的特殊情况：void并不会真的不返回类型**
# 协变和逆变

# tc 
    type NoNullable<T> = T extends null | undefined ? never : T
    type DeepNoNullable<T extends object> = {
        [K in keyof T]:T[K] extends object ? DeepNoNullable<T[K]> : NoNullable<T[K]>
    }

    type Flatten<T> = { [K in keyof T]: T[K] };
    type MarkPropsAsOptional<T extends object,K extends keyof T = keyof T> = Flatten<Partial<Pick<T,K>> & Omit<T,K>>

    type DeepMarkPropsAsOptional< T extends object,K extends keyof T = keyof T> = Flatten<DeepPartial<Pick<T,K>> & Omit<T,K>>

    type Nullable<T> = T | null

    type DeepNullable<T extends object> = {
    [K in keyof T]:T[K] extends object?DeepNullable<T[K]>:Nullable<T[K]>
    }


    type MarkPropsAsRequired<T extends object,K extends keyof T = keyof T> = Flatten<DeepRequired<Pick<T,K>> & Omit<T,K>>


    type MarkPropsAsReadonly<T extends object,K extends keyof T = keyof T> = Flatten<DeepReadonly<Pick<T,K>> & Omit<T,K>>

    type MarkPropsAsMutable<T extends object,K extends keyof T = keyof T> = Flatten<DeepMutable<Pick<T,K>> & Omit<T,K>>

    type MarkPropsAsNullable<T extends object,K extends keyof T = keyof T> = Flatten<DeepNullable<Pick<T,K>> & Omit<T,K>>
# 结构工具类型进阶

    type FuncStruct = (...args: any[]) => any;

    type ExpectPropKeys<T extends object,ValueType> = {[K in keyof T]-? : T[K] extends ValueType ? K : never}[keyof T]

    type FunctionKeys<T extends object> = ExpectPropKeys<T,FuncStruct>

    type PickByValueType<T extends object,ValueType> = Pick<T,ExpectPropKeys<T,ValueType>>

    type FilterPropsKeys<T extends object,ValueType> = {[K in keyof T]-? : T[K] extends ValueType ? never : K}[keyof T]

    type OmitByValueType<T extends Record<string,any>,ValueType> = Pick<T,FilterPropsKeys<T,ValueType>>

    **这个好复杂**
    type StrictConditional<K,ValueType,Resolved,Rejected,Failed = never> = [K] extends [ValueType] ? [ValueType] extends [K] ? Resolved : Rejected : Failed 
    **//Positive 默认是Pick**
    type StrictValueTypeFilter<T,ValueType,Positive extends boolean = true> = {
        [K in keyof T] : StrictConditional<T[K],ValueType,Positive extends true ? K :never,Positive extends true ? never : K,Positive extends true ? never : K>
    }[keyof T]

    type OmitByValueType<T extends object,ValueType> = Pick<T,StrictValueTypeFilter<T,ValueType,false>>
    type PickByValueType<T extends object,ValueType> = Pick<T,StrictValueTypeFilter<T,ValueType,true>>

# 模板字符串类型
  - 基础使用
  - 模板字符串类型的类型表现
  - 结合索引类型与映射类型
  - 专用工具类型
  - 模板字符串类型与模式匹配
  - 基于重映射的 PickByValueType

  **进阶开始**

        type TrimStart<T extends string> = T extends ` ${infer R}` ? TrimStart<R> : T
        type TrimEnd<T extends string> = T extends `${infer R} ` ? TrimEnd<R> : Trim
        type Trim<T extends string> = TrimStart<TrimEnd<T>>

        type _Include<T extends string,S extends string> = T extends `${infer _R1}${S}${infer _R2}` ? true :false

        type Include<T extends string,S extends string> = T extends '' ? S extends '' ? true : false : _Include<T,S>

        type _StartWith<T extends string,S extends string> = T extends `${S}${infer R}` ? true : false
        type StartWith<T extends string,S extends string> = T extends '' ? S extends '' ? true : false : _StartWith<T,S>

    - 结构转换
        
            type Replace<T extends string,S extends string,R extends string> = T extends `${infer Head}${S}${infer Tail}` ?
            `${Head}${R}${Tail}` : T

            type ReplaceAll<T extends string,S extends string,R extends string> = T extends `${infer Head}${S}${infer Tail}` ? ReplaceAll<`${Head}${S}${Tail}`,S,R> : Tail

            type ReplacePlus<T extends string,S extends string,R extends string,ShouldReplaceAll extends boolean = false> = T extends `${infer Head}${S}${infer Tail}` ? ShouldReplaceAll extends true ? ReplaceAll<`${Head}${R}${Tail}`,S,R> : `${Head}${R}${Tail}` : T

            type Join<T extends Array<string | number>,D extends string> = T extends [] ? '' : T extends [string | number]
            ? `${T[0]}` :
             T extends [string | number,...infer R] ? 
             // @ts-expect-error
             `${T[0]}${D}${Join<R,D>}` : string

            
            type SnakeCase2CamelCase<S extends string> =
            S extends `${infer Head}${'_'}${infer Rest}`
                ? `${Head}${SnakeCase2CamelCase<Capitalize<Rest>>}`
                : S;

            expectType<SnakeCase2CamelCase<'foo_bar_baz'>>('fooBarBaz');

            type DelimiterCaseCamelCase<T extends string,Delimiter extends string> = T extends `${infer Head}${Delimiter}${infer R}` ? `${Head}${DelimiterCaseCamelCase<`${Capitalize<R>}`,Delimiter>}` : T  
            
            type WordSeparators = '-' | '_' | ' ';



            type CapitalizeStringArray<Words extends readonly any[], Prev> = Words extends [
            `${infer First}`,
            ...infer Rest
            ]
            ? First extends undefined
                ? ''
                : First extends ''
                ? CapitalizeStringArray<Rest, Prev>
                : `${Prev extends '' ? First : Capitalize<First>}${CapitalizeStringArray<
                    Rest,
                    First
                >}`
            : '';

            type CamelCaseStringArrayPlus<Words extends readonly string[]> = Words extends [
            `${infer First}`,
            ...infer Rest
            ]
            ? Uncapitalize<`${First}${CapitalizeStringArray<Rest, First>}`>
            : never;

            export type CamelCasePlus<K extends string> = CamelCaseStringArrayPlus<
            Split<K extends Uppercase<K> ? Lowercase<K> : K, WordSeparators>
            >;