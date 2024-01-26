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

import EventEmitter from '@protobufjs/eventemitter'

@Entry
@Component
struct Index {
    @State result: string = "";
    str: string = '';
    scroller: Scroller = new Scroller()

    build() {
        Stack({ alignContent: Alignment.TopStart }) {
            Scroll(this.scroller) {
                Column() {
                    Text("emit")
                        .width('90%')
                        .height(60)
                        .backgroundColor(0xFFFFFF)
                        .borderRadius(15)
                        .fontSize(16)
                        .textAlign(TextAlign.Center)
                        .margin({ top: 20 })
                        .onClick(event => {
                            this.result = "";
                            let ee = new EventEmitter();
                            let ctx: ESObject = {};
                            ee.on("eventA", ((arg1: ESObject) => {
                                this.result = "on eventA arg1=" + arg1
                            }) as ESObject, ctx)
                            ee.emit("eventA", 1);
                        });


                    Text("off")
                        .width('90%')
                        .height(60)
                        .backgroundColor(0xFFFFFF)
                        .borderRadius(15)
                        .fontSize(16)
                        .textAlign(TextAlign.Center)
                        .margin({ top: 20 })
                        .onClick(event => {
                            this.result = "";
                            let ee = new EventEmitter();
                            let ctx: ESObject = {};
                            ee.on("eventA", ((arg1: ESObject) => {
                                this.result += "on eventA arg1=" + arg1 + "\r\n"
                            }) as ESObject, ctx)

                            ee.on("eventB", ((arg1: ESObject) => {
                                this.result += "on eventB arg1=" + arg1 + "\r\n"
                            }) as ESObject, ctx)

                            ee.emit("eventA", 1);
                            ee.off("eventB");
                            ee.emit("eventB", 1);
                        });

                    Text("offAll")
                        .width('90%')
                        .height(60)
                        .backgroundColor(0xFFFFFF)
                        .borderRadius(15)
                        .fontSize(16)
                        .textAlign(TextAlign.Center)
                        .margin({ top: 20 })
                        .onClick(event => {
                            this.result = "";
                            let result: number = 0
                            let ee = new EventEmitter();
                            let ctx: ESObject = {};
                            ee.on("eventA", ((arg1: ESObject) => {
                                this.result += "on eventA arg1=" + arg1 + "\r\n"
                            }) as ESObject, ctx)

                            ee.on("eventB", ((arg1: ESObject) => {
                                this.result += "on eventB arg1=" + arg1 + "\r\n"
                            }) as ESObject, ctx)
                            ee.emit("eventA", 1);
                            ee.off();
                            ee.emit("eventA", 2);
                            ee.emit("eventB", 1);
                            this.result += "on eventB arg1=" + result + "\r\n"
                        });

                    Text("结果 :\r\n  " + this.result)
                        .fontSize(15)
                        .margin({ top: 55, left: 10, right: 10 })

                }.width('100%');
            }
            .scrollable(ScrollDirection.Vertical).scrollBar(BarState.On)
            .scrollBarColor(Color.Gray).scrollBarWidth(30);
        }.width('100%').height('100%').backgroundColor(0xDCDCDC)
    }
}