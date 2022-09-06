# Typescript 学习


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
