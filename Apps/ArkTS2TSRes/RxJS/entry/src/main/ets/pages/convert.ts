interface Convert_Params {
    partition?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "convert_" + ++__generate__Id;
}
/*
 * Copyright (C) 2024 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { of, interval, from, timer, merge } from 'rxjs';
import { buffer, bufferCount, bufferTime, bufferToggle, bufferWhen, concatMap, delay, mergeMap, concatMapTo, take, exhaustMap, expand, groupBy, map, mapTo, pluck, reduce, scan, switchMap, window, mergeAll, windowCount, tap, windowTime, windowToggle, windowWhen } from 'rxjs';
import Log from '../log';
import { MyButton } from '../common/MyButton';
import { partition } from './ArkTools';
class Convert extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.partition = partition;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Convert_Params) {
        if (params.partition !== undefined) {
            this.partition = params.partition;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Scroll.create();
        Scroll.width('100%');
        Scroll.height('100%');
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center });
        let earlierCreatedChild_2: MyButton = (this && this.findChildById) ? this.findChildById("2") as MyButton : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new MyButton("2", this, {
                content: "buffer:收集输出值，直到提供的observable发出才将收集到的值作为数组发出",
                onClickListener: () => {
                    this.buffer();
                }
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                content: "buffer:收集输出值，直到提供的observable发出才将收集到的值作为数组发出",
                onClickListener: () => {
                    this.buffer();
                }
            });
            View.create(earlierCreatedChild_2);
        }
        let earlierCreatedChild_3: MyButton = (this && this.findChildById) ? this.findChildById("3") as MyButton : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new MyButton("3", this, {
                content: "bufferCount:收集发出的值，直到收集完提供的数量的值才将其作为数组发出",
                onClickListener: () => {
                    this.bufferCount();
                }
            }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                content: "bufferCount:收集发出的值，直到收集完提供的数量的值才将其作为数组发出",
                onClickListener: () => {
                    this.bufferCount();
                }
            });
            View.create(earlierCreatedChild_3);
        }
        let earlierCreatedChild_4: MyButton = (this && this.findChildById) ? this.findChildById("4") as MyButton : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new MyButton("4", this, { content: "bufferTime:收集发出的值，直到经过了提供的时间才将其作为数组发出", onClickListener: () => {
                    this.bufferTime();
                } }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({
                content: "bufferTime:收集发出的值，直到经过了提供的时间才将其作为数组发出", onClickListener: () => {
                    this.bufferTime();
                }
            });
            View.create(earlierCreatedChild_4);
        }
        let earlierCreatedChild_5: MyButton = (this && this.findChildById) ? this.findChildById("5") as MyButton : undefined;
        if (earlierCreatedChild_5 == undefined) {
            View.create(new MyButton("5", this, {
                content: "bufferToggle:开启开关以捕获源observable所发出的值，关闭开关以将缓冲的值作为数组发出",
                onClickListener: () => {
                    this.bufferToggle();
                }
            }));
        }
        else {
            earlierCreatedChild_5.updateWithValueParams({
                content: "bufferToggle:开启开关以捕获源observable所发出的值，关闭开关以将缓冲的值作为数组发出",
                onClickListener: () => {
                    this.bufferToggle();
                }
            });
            View.create(earlierCreatedChild_5);
        }
        let earlierCreatedChild_6: MyButton = (this && this.findChildById) ? this.findChildById("6") as MyButton : undefined;
        if (earlierCreatedChild_6 == undefined) {
            View.create(new MyButton("6", this, { content: "bufferWhen:收集值，直到关闭选择器发出值才发出缓冲的值", onClickListener: () => {
                    this.bufferWhen();
                } }));
        }
        else {
            earlierCreatedChild_6.updateWithValueParams({
                content: "bufferWhen:收集值，直到关闭选择器发出值才发出缓冲的值", onClickListener: () => {
                    this.bufferWhen();
                }
            });
            View.create(earlierCreatedChild_6);
        }
        let earlierCreatedChild_7: MyButton = (this && this.findChildById) ? this.findChildById("7") as MyButton : undefined;
        if (earlierCreatedChild_7 == undefined) {
            View.create(new MyButton("7", this, { content: "concatMap:将值映射成内部observable，并按顺序订阅和发出", onClickListener: () => {
                    this.concatMap();
                } }));
        }
        else {
            earlierCreatedChild_7.updateWithValueParams({
                content: "concatMap:将值映射成内部observable，并按顺序订阅和发出", onClickListener: () => {
                    this.concatMap();
                }
            });
            View.create(earlierCreatedChild_7);
        }
        let earlierCreatedChild_8: MyButton = (this && this.findChildById) ? this.findChildById("8") as MyButton : undefined;
        if (earlierCreatedChild_8 == undefined) {
            View.create(new MyButton("8", this, { content: "concatMapTo:当前一个observable完成时订阅提供的observable并发出值", onClickListener: () => {
                    this.concatMapTo();
                } }));
        }
        else {
            earlierCreatedChild_8.updateWithValueParams({
                content: "concatMapTo:当前一个observable完成时订阅提供的observable并发出值", onClickListener: () => {
                    this.concatMapTo();
                }
            });
            View.create(earlierCreatedChild_8);
        }
        let earlierCreatedChild_9: MyButton = (this && this.findChildById) ? this.findChildById("9") as MyButton : undefined;
        if (earlierCreatedChild_9 == undefined) {
            View.create(new MyButton("9", this, { content: "exhaustMap:映射成内部observable，忽略其他值直到该observable完成", onClickListener: () => {
                    this.exhaustMap();
                } }));
        }
        else {
            earlierCreatedChild_9.updateWithValueParams({
                content: "exhaustMap:映射成内部observable，忽略其他值直到该observable完成", onClickListener: () => {
                    this.exhaustMap();
                }
            });
            View.create(earlierCreatedChild_9);
        }
        let earlierCreatedChild_10: MyButton = (this && this.findChildById) ? this.findChildById("10") as MyButton : undefined;
        if (earlierCreatedChild_10 == undefined) {
            View.create(new MyButton("10", this, { content: "expand:递归调用提供的函数", onClickListener: () => {
                    this.expand();
                } }));
        }
        else {
            earlierCreatedChild_10.updateWithValueParams({
                content: "expand:递归调用提供的函数", onClickListener: () => {
                    this.expand();
                }
            });
            View.create(earlierCreatedChild_10);
        }
        let earlierCreatedChild_11: MyButton = (this && this.findChildById) ? this.findChildById("11") as MyButton : undefined;
        if (earlierCreatedChild_11 == undefined) {
            View.create(new MyButton("11", this, { content: "groupBy:基于提供的值分组成多个observables", onClickListener: () => {
                    this.groupBy();
                } }));
        }
        else {
            earlierCreatedChild_11.updateWithValueParams({
                content: "groupBy:基于提供的值分组成多个observables", onClickListener: () => {
                    this.groupBy();
                }
            });
            View.create(earlierCreatedChild_11);
        }
        let earlierCreatedChild_12: MyButton = (this && this.findChildById) ? this.findChildById("12") as MyButton : undefined;
        if (earlierCreatedChild_12 == undefined) {
            View.create(new MyButton("12", this, { content: "map:对源observable的每个值应用投射函数", onClickListener: () => {
                    this.map();
                } }));
        }
        else {
            earlierCreatedChild_12.updateWithValueParams({
                content: "map:对源observable的每个值应用投射函数", onClickListener: () => {
                    this.map();
                }
            });
            View.create(earlierCreatedChild_12);
        }
        let earlierCreatedChild_13: MyButton = (this && this.findChildById) ? this.findChildById("13") as MyButton : undefined;
        if (earlierCreatedChild_13 == undefined) {
            View.create(new MyButton("13", this, { content: "mapTo:将每个发出值映射成常量", onClickListener: () => {
                    this.mapTo();
                } }));
        }
        else {
            earlierCreatedChild_13.updateWithValueParams({
                content: "mapTo:将每个发出值映射成常量", onClickListener: () => {
                    this.mapTo();
                }
            });
            View.create(earlierCreatedChild_13);
        }
        let earlierCreatedChild_14: MyButton = (this && this.findChildById) ? this.findChildById("14") as MyButton : undefined;
        if (earlierCreatedChild_14 == undefined) {
            View.create(new MyButton("14", this, { content: "mergeMap:映射成observable并发出值", onClickListener: () => {
                    this.mergeMap();
                } }));
        }
        else {
            earlierCreatedChild_14.updateWithValueParams({
                content: "mergeMap:映射成observable并发出值", onClickListener: () => {
                    this.mergeMap();
                }
            });
            View.create(earlierCreatedChild_14);
        }
        let earlierCreatedChild_15: MyButton = (this && this.findChildById) ? this.findChildById("15") as MyButton : undefined;
        if (earlierCreatedChild_15 == undefined) {
            View.create(new MyButton("15", this, {
                content: "partition:Split one observable into two based on provided predicate",
                onClickListener: () => {
                    this.partition();
                }
            }));
        }
        else {
            earlierCreatedChild_15.updateWithValueParams({
                content: "partition:Split one observable into two based on provided predicate",
                onClickListener: () => {
                    this.partition();
                }
            });
            View.create(earlierCreatedChild_15);
        }
        let earlierCreatedChild_16: MyButton = (this && this.findChildById) ? this.findChildById("16") as MyButton : undefined;
        if (earlierCreatedChild_16 == undefined) {
            View.create(new MyButton("16", this, { content: "pluck:选择属性来发出", onClickListener: () => {
                    this.pluck();
                } }));
        }
        else {
            earlierCreatedChild_16.updateWithValueParams({
                content: "pluck:选择属性来发出", onClickListener: () => {
                    this.pluck();
                }
            });
            View.create(earlierCreatedChild_16);
        }
        let earlierCreatedChild_17: MyButton = (this && this.findChildById) ? this.findChildById("17") as MyButton : undefined;
        if (earlierCreatedChild_17 == undefined) {
            View.create(new MyButton("17", this, {
                content: "reduce:将源observalbe的值归并为单个值，当源observable完成时将这个值发出",
                onClickListener: () => {
                    this.reduce();
                }
            }));
        }
        else {
            earlierCreatedChild_17.updateWithValueParams({
                content: "reduce:将源observalbe的值归并为单个值，当源observable完成时将这个值发出",
                onClickListener: () => {
                    this.reduce();
                }
            });
            View.create(earlierCreatedChild_17);
        }
        let earlierCreatedChild_18: MyButton = (this && this.findChildById) ? this.findChildById("18") as MyButton : undefined;
        if (earlierCreatedChild_18 == undefined) {
            View.create(new MyButton("18", this, { content: "scan:随着时间的推移进行归并", onClickListener: () => {
                    this.scan();
                } }));
        }
        else {
            earlierCreatedChild_18.updateWithValueParams({
                content: "scan:随着时间的推移进行归并", onClickListener: () => {
                    this.scan();
                }
            });
            View.create(earlierCreatedChild_18);
        }
        let earlierCreatedChild_19: MyButton = (this && this.findChildById) ? this.findChildById("19") as MyButton : undefined;
        if (earlierCreatedChild_19 == undefined) {
            View.create(new MyButton("19", this, { content: "switchMap:映射成observable，完成前一个内部observable，发出值", onClickListener: () => {
                    this.switchMap();
                } }));
        }
        else {
            earlierCreatedChild_19.updateWithValueParams({
                content: "switchMap:映射成observable，完成前一个内部observable，发出值", onClickListener: () => {
                    this.switchMap();
                }
            });
            View.create(earlierCreatedChild_19);
        }
        let earlierCreatedChild_20: MyButton = (this && this.findChildById) ? this.findChildById("20") as MyButton : undefined;
        if (earlierCreatedChild_20 == undefined) {
            View.create(new MyButton("20", this, { content: "window:时间窗口值的observable", onClickListener: () => {
                    this.window();
                } }));
        }
        else {
            earlierCreatedChild_20.updateWithValueParams({
                content: "window:时间窗口值的observable", onClickListener: () => {
                    this.window();
                }
            });
            View.create(earlierCreatedChild_20);
        }
        let earlierCreatedChild_21: MyButton = (this && this.findChildById) ? this.findChildById("21") as MyButton : undefined;
        if (earlierCreatedChild_21 == undefined) {
            View.create(new MyButton("21", this, { content: "windowCount:源observable中的值的observable，每次发出N个值", onClickListener: () => {
                    this.windowCount();
                } }));
        }
        else {
            earlierCreatedChild_21.updateWithValueParams({
                content: "windowCount:源observable中的值的observable，每次发出N个值", onClickListener: () => {
                    this.windowCount();
                }
            });
            View.create(earlierCreatedChild_21);
        }
        let earlierCreatedChild_22: MyButton = (this && this.findChildById) ? this.findChildById("22") as MyButton : undefined;
        if (earlierCreatedChild_22 == undefined) {
            View.create(new MyButton("22", this, {
                content: "windowTime:在每个提供的时间跨度内，收集源obsercvable中的值的observable",
                onClickListener: () => {
                    this.windowTime();
                }
            }));
        }
        else {
            earlierCreatedChild_22.updateWithValueParams({
                content: "windowTime:在每个提供的时间跨度内，收集源obsercvable中的值的observable",
                onClickListener: () => {
                    this.windowTime();
                }
            });
            View.create(earlierCreatedChild_22);
        }
        let earlierCreatedChild_23: MyButton = (this && this.findChildById) ? this.findChildById("23") as MyButton : undefined;
        if (earlierCreatedChild_23 == undefined) {
            View.create(new MyButton("23", this, {
                content: "windowToggle:以openings发出为起始，以closingSelector发出为结束，收集并发出源observable中的值的observable",
                onClickListener: () => {
                    this.windowToggle();
                }
            }));
        }
        else {
            earlierCreatedChild_23.updateWithValueParams({
                content: "windowToggle:以openings发出为起始，以closingSelector发出为结束，收集并发出源observable中的值的observable",
                onClickListener: () => {
                    this.windowToggle();
                }
            });
            View.create(earlierCreatedChild_23);
        }
        let earlierCreatedChild_24: MyButton = (this && this.findChildById) ? this.findChildById("24") as MyButton : undefined;
        if (earlierCreatedChild_24 == undefined) {
            View.create(new MyButton("24", this, {
                content: "windowWhen:在提供的时间帧处关闭窗口，并发出从源observable中收集的值的observable",
                onClickListener: () => {
                    this.windowWhen();
                }
            }));
        }
        else {
            earlierCreatedChild_24.updateWithValueParams({
                content: "windowWhen:在提供的时间帧处关闭窗口，并发出从源observable中收集的值的observable",
                onClickListener: () => {
                    this.windowWhen();
                }
            });
            View.create(earlierCreatedChild_24);
        }
        Flex.pop();
        Scroll.pop();
    }
    buffer() {
        const myInterval = interval(1000);
        const bufferBy = timer(5000);
        const myBufferedInterval = myInterval.pipe(buffer(bufferBy));
        const subscribe = myBufferedInterval.subscribe((val: any) => {
            Log.showLog('buffer--' + val);
        });
    }
    bufferCount() {
        const source = interval(1000);
        const bufferThree = source.pipe(bufferCount(3), take(4));
        const subscribe = bufferThree.subscribe((val: any) => {
            Log.showLog('bufferCount--' + val);
        });
    }
    bufferTime() {
        const source = interval(500);
        const example = source.pipe(bufferTime(2000), take(4));
        const subscribe = example.subscribe((val: any) => {
            Log.showLog('bufferTime--' + val);
        });
    }
    bufferToggle() {
        const sourceInterval = interval(1000);
        const startInterval = interval(5000);
        const closingInterval = (val: any) => {
            Log.showLog(`Value ${val} emitted, starting buffer! Closing in 3s!`);
            return interval(3000);
        };
        const bufferToggleInterval = sourceInterval.pipe(bufferToggle(startInterval, closingInterval), take(4));
        const subscribe = bufferToggleInterval.subscribe((val: any) => {
            Log.showLog('bufferToggle--' + val);
        });
    }
    bufferWhen() {
        const oneSecondInterval = interval(1000);
        const fiveSecondInterval = () => interval(5000);
        const bufferWhenExample = oneSecondInterval.pipe(bufferWhen(fiveSecondInterval), take(4));
        const subscribe = bufferWhenExample.subscribe((val: any) => {
            Log.showLog('bufferWhen--' + val);
        });
    }
    concatMap() {
        const source = of(2000, 1000);
        const example = source.pipe(concatMap((val: any) => of(`Delayed by: ${val}ms`).pipe(delay(val))));
        const subscribe = example.subscribe((val: any) => {
            Log.showLog(`concatMap--${val}`);
        });
        const mergeMapExample = source
            .pipe(delay(5000), mergeMap((val: any) => of(`Delayed by: ${val}ms`)
            .pipe(delay(val))))
            .subscribe((val: any) => {
            Log.showLog(`concatMap--${val}`);
        });
    }
    concatMapTo() {
        const sampleInterval = interval(500).pipe(take(5));
        const fakeRequest = of('Network request complete').pipe(delay(3000));
        const example = sampleInterval.pipe(concatMapTo(fakeRequest));
        const subscribe = example.subscribe((val: any) => {
            Log.showLog('concatMapTo--' + val);
        });
    }
    exhaustMap() {
        const sourceInterval = interval(1000);
        const delayedInterval = sourceInterval.pipe(delay(1000), take(4));
        const exhaustSub = merge(delayedInterval, of(true))
            .pipe(exhaustMap(_ => sourceInterval.pipe(take(5))))
            .subscribe((val: any) => {
            Log.showLog('exhaustMap--' + val);
        });
    }
    expand() {
        const source = of(2);
        const example: any = source.pipe(expand((val: any) => {
            Log.showLog(`expand--${val}`);
            return of(1 + val);
        }), take(5));
        const subscribe: any = example.subscribe((val: any) => {
            Log.showLog(`expand--${val}`);
        });
    }
    groupBy() {
        const people: any = [
            {
                name: 'Sue', age: 25
            },
            {
                name: 'Joe', age: 30
            },
            {
                name: 'Frank', age: 25
            },
            {
                name: 'Sarah', age: 35
            }
        ];
        const source: any = from(people);
        const example: any = source.pipe(groupBy((person: any) => person.age));
        const subscribe: any = example.subscribe((val: any) => {
            Log.showLog('groupBy--' + JSON.stringify(val));
        });
    }
    map() {
        const source = from([1, 2, 3, 4, 5]);
        const example: any = source.pipe(map((val: any) => val + 10));
        const subscribe: any = example.subscribe((val: any) => {
            Log.showLog('map--' + val);
        });
    }
    mapTo() {
        const source = interval(2000);
        const example = source.pipe(mapTo('HELLO WORLD!'));
        let count = 0;
        const subscribe = example.subscribe((val: any) => {
            Log.showLog('mapTo--' + val);
            count++;
            if (count > 2) {
                subscribe.unsubscribe();
            }
        });
    }
    mergeMap() {
        const source = of('Hello');
        const example = source.pipe(mergeMap((val: any) => of(`${val} World!`)));
        const subscribe = example.subscribe((val: any) => {
            Log.showLog('mergeMap--' + val);
        });
    }
    pluck() {
        let name1: any = { name: 'Joe', age: 30 };
        let name2: any = { name: 'Sarah', age: 35 };
        const source: any = from([name1, name2]);
        const example: any = source.pipe(pluck('name'));
        const subscribe: any = example.subscribe((val: any) => {
            Log.showLog('pluck--' + val);
        });
    }
    reduce() {
        const source = of(1, 2, 3, 4);
        const example = source.pipe(reduce((acc, val) => acc + val));
        const subscribe = example.subscribe((val: any) => {
            Log.showLog('reduce--Sum:' + val);
        });
    }
    scan() {
        const source = of(1, 2, 3);
        const example = source.pipe(scan((acc, curr) => acc + curr, 0));
        const subscribe = example.subscribe((val: any) => {
            Log.showLog('scan--' + val);
        });
    }
    switchMap() {
        const source = timer(0, 5000);
        const example = source.pipe(switchMap(() => interval(500)));
        const subscribe = example.pipe(take(18)).subscribe((val: any) => {
            Log.showLog('switchMap--' + val);
        });
    }
    window() {
        const source = timer(0, 1000);
        const example = source.pipe(window(interval(3000)));
        const count = example.pipe(scan((acc, curr) => acc + 1, 0), take(2));
        const subscribe = count.subscribe((val: any) => {
            Log.showLog(`Window ${val}:`);
        });
        const subscribeTwo = example.pipe(mergeAll(), take(6)).subscribe((val: any) => {
            Log.showLog('window--' + val);
        });
    }
    windowCount() {
        const source = interval(1000);
        const example = source.pipe(windowCount(4), tap(_ => {
            Log.showLog('NEW WINDOW!');
        }));
        const subscribeTwo = example.pipe(mergeAll(), take(8)).subscribe((val: any) => {
            Log.showLog('windowCount--' + val);
        });
    }
    windowTime() {
        const source = timer(0, 1000);
        const example = source.pipe(windowTime(3000), tap(_ => {
            Log.showLog('NEW WINDOW!');
        }));
        const subscribeTwo = example
            .pipe(mergeAll(), take(6)).subscribe((val: any) => {
            Log.showLog('windowTime--' + val);
        });
    }
    windowToggle() {
        const source = timer(0, 1000);
        const toggle = interval(5000);
        const example = source.pipe(windowToggle(toggle, (val: any) => interval(val * 1000)), tap(_ => {
            Log.showLog('NEW WINDOW!');
        }));
        const subscribeTwo = example
            .pipe(mergeAll(), take(6)).subscribe((val: any) => {
            Log.showLog('windowToggle--' + val);
        });
    }
    windowWhen() {
        const source = timer(0, 1000);
        const example = source.pipe(windowWhen(() => interval(5000)), tap(_ => {
            Log.showLog('NEW WINDOW!');
        }));
        const subscribeTwo = example
            .pipe(mergeAll(), take(10)).subscribe((val: any) => {
            Log.showLog('windowWhen--' + val);
        });
    }
    private partition;
}
loadDocument(new Convert("1", undefined, {}));
