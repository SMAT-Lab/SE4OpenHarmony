/*
  * Copyright (c) 2024 Huawei Device Co., Ltd.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
    *
  * http://www.apache.org/licenses/LICENSE-2.0
    *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */
import { describe,  it, expect } from '@ohos/hypium';
import EventEmitter from "@protobufjs/eventemitter"

export default function abilityTest() {
    describe('ActsAbilityTest', () => {
        it('emitAndOn', 0, () => {
            let result: number = 0
            let ee = new EventEmitter();
            let ctx: ESObject = {};
            ee.on("a", ((arg1: ESObject) => {
                result = result + arg1
            }) as ESObject, ctx)
            ee.emit("a", 1);
            expect(result).assertEqual(1)
        })

        it('emitAndOnString', 0, () => {
            let result: string = ""
            let ee = new EventEmitter();
            let ctx: ESObject = {};
            ee.on("a", ((arg1: ESObject) => {
                result = result + arg1
            }) as ESObject, ctx)
            ee.emit("a", "AAA");
            expect(result).assertEqual("AAA")
        })

        it('off', 0, () => {
            let result: number = 0
            let ee = new EventEmitter();
            let ctx: ESObject = {};
            ee.on("a", ((arg1: ESObject) => {
                result = result + arg1
            }) as ESObject, ctx)

            ee.on("b", ((arg1: ESObject) => {
                result = result + arg1
            }) as ESObject, ctx)

            ee.emit("a", 1);
            ee.off("b");
            ee.emit("b", 1);
            expect(result).assertEqual(1)
        })

        it('offAll', 0, () => {
            let result: number = 0
            let ee = new EventEmitter();
            let ctx: ESObject = {};
            ee.on("a", ((arg1: ESObject) => {
                result = result + arg1
            }) as ESObject, ctx)

            ee.on("b", ((arg1: ESObject) => {
                result = result + arg1
            }) as ESObject, ctx)
            ee.off();
            ee.emit("a", 1);
            ee.emit("b", 1);
            expect(result).assertEqual(0)
        })

        it('offFn', 0, () => {
            let result: number = 0
            let ee = new EventEmitter();
            let ctx: ESObject = {};
            let fn: ESObject
            ee.on("b", fn = ((arg1: ESObject) => {
                result = result + arg1
            }) as ESObject, ctx)

            ee.on("b", ((arg1: ESObject) => {
                result = result + arg1
            }) as ESObject, ctx)
            ee.off("b", fn);
            ee.emit("b", 1);
            expect(result).assertEqual(1)
        })
    })
}