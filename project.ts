///<reference lib="dom" />
///<reference types="node" />
///<reference path="./typings/index.d.ts" />

//类型检查指令


//@ts-ignore
const name: string = 599

//@ts-expect-error
const age: number = '123'

//@ts-nocheck
//@ts-expect-error
const sex: string = 'mail'



import foo from 'pkg';

const res = foo();

import raw from './note.md';

const content = raw.replace('NOTE', `NOTE${new Date().getDay()}`);


type TF = Window &  typeof globalThis


window.userTracker()

import {bump} from 'fs'


//命名空间




