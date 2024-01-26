interface Create_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "filter_" + ++__generate__Id;
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
import { of, interval, from, range, throwError, timer } from 'rxjs';
import { debounce, take, debounceTime, distinctUntilChanged, filter, takeWhile, throttle, first, ignoreElements, last, sample, single, skip, skipUntil, skipWhile, takeUntil, throttleTime } from 'rxjs';
import Log from '../log';
import { MyButton } from '../common/MyButton';
class Create extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Create_Params) {
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
                content: "debounce:根据一个选择器函数，舍弃掉在两次输出之间小于指定时间的发出值",
                onClickListener: () => {
                    this.debounce();
                }
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                content: "debounce:根据一个选择器函数，舍弃掉在两次输出之间小于指定时间的发出值",
                onClickListener: () => {
                    this.debounce();
                }
            });
            View.create(earlierCreatedChild_2);
        }
        let earlierCreatedChild_3: MyButton = (this && this.findChildById) ? this.findChildById("3") as MyButton : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new MyButton("3", this, { content: "debounceTime:舍弃掉在两次输出之间小于指定时间的发出值", onClickListener: () => {
                    this.debounceTime();
                } }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                content: "debounceTime:舍弃掉在两次输出之间小于指定时间的发出值", onClickListener: () => {
                    this.debounceTime();
                }
            });
            View.create(earlierCreatedChild_3);
        }
        let earlierCreatedChild_4: MyButton = (this && this.findChildById) ? this.findChildById("4") as MyButton : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new MyButton("4", this, {
                content: "distinctUntilChanged:只有当当前值与之前最后一个值不同时才将其发出",
                onClickListener: () => {
                    this.distinctUntilChanged();
                }
            }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({
                content: "distinctUntilChanged:只有当当前值与之前最后一个值不同时才将其发出",
                onClickListener: () => {
                    this.distinctUntilChanged();
                }
            });
            View.create(earlierCreatedChild_4);
        }
        let earlierCreatedChild_5: MyButton = (this && this.findChildById) ? this.findChildById("5") as MyButton : undefined;
        if (earlierCreatedChild_5 == undefined) {
            View.create(new MyButton("5", this, { content: "filter:发出符合给定条件的值", onClickListener: () => {
                    this.filter();
                } }));
        }
        else {
            earlierCreatedChild_5.updateWithValueParams({
                content: "filter:发出符合给定条件的值", onClickListener: () => {
                    this.filter();
                }
            });
            View.create(earlierCreatedChild_5);
        }
        let earlierCreatedChild_6: MyButton = (this && this.findChildById) ? this.findChildById("6") as MyButton : undefined;
        if (earlierCreatedChild_6 == undefined) {
            View.create(new MyButton("6", this, { content: "first:发出第一个值或第一个通过给定表达式的值", onClickListener: () => {
                    this.first();
                } }));
        }
        else {
            earlierCreatedChild_6.updateWithValueParams({
                content: "first:发出第一个值或第一个通过给定表达式的值", onClickListener: () => {
                    this.first();
                }
            });
            View.create(earlierCreatedChild_6);
        }
        let earlierCreatedChild_7: MyButton = (this && this.findChildById) ? this.findChildById("7") as MyButton : undefined;
        if (earlierCreatedChild_7 == undefined) {
            View.create(new MyButton("7", this, { content: "ignoreElements:忽略所有通知，除了complete和error", onClickListener: () => {
                    this.ignoreElements();
                } }));
        }
        else {
            earlierCreatedChild_7.updateWithValueParams({
                content: "ignoreElements:忽略所有通知，除了complete和error", onClickListener: () => {
                    this.ignoreElements();
                }
            });
            View.create(earlierCreatedChild_7);
        }
        let earlierCreatedChild_8: MyButton = (this && this.findChildById) ? this.findChildById("8") as MyButton : undefined;
        if (earlierCreatedChild_8 == undefined) {
            View.create(new MyButton("8", this, { content: "last:根据提供的表达式，在源 observable 完成时发出它的最后一个值", onClickListener: () => {
                    this.last();
                } }));
        }
        else {
            earlierCreatedChild_8.updateWithValueParams({
                content: "last:根据提供的表达式，在源 observable 完成时发出它的最后一个值", onClickListener: () => {
                    this.last();
                }
            });
            View.create(earlierCreatedChild_8);
        }
        let earlierCreatedChild_9: MyButton = (this && this.findChildById) ? this.findChildById("9") as MyButton : undefined;
        if (earlierCreatedChild_9 == undefined) {
            View.create(new MyButton("9", this, { content: "sample:当提供的observable发出时从源observable中取样", onClickListener: () => {
                    this.sample();
                } }));
        }
        else {
            earlierCreatedChild_9.updateWithValueParams({
                content: "sample:当提供的observable发出时从源observable中取样", onClickListener: () => {
                    this.sample();
                }
            });
            View.create(earlierCreatedChild_9);
        }
        let earlierCreatedChild_10: MyButton = (this && this.findChildById) ? this.findChildById("10") as MyButton : undefined;
        if (earlierCreatedChild_10 == undefined) {
            View.create(new MyButton("10", this, { content: "single:发出通过表达式的单一项", onClickListener: () => {
                    this.single();
                } }));
        }
        else {
            earlierCreatedChild_10.updateWithValueParams({
                content: "single:发出通过表达式的单一项", onClickListener: () => {
                    this.single();
                }
            });
            View.create(earlierCreatedChild_10);
        }
        let earlierCreatedChild_11: MyButton = (this && this.findChildById) ? this.findChildById("11") as MyButton : undefined;
        if (earlierCreatedChild_11 == undefined) {
            View.create(new MyButton("11", this, { content: "skip:跳过N个(由参数提供)发出值", onClickListener: () => {
                    this.skip();
                } }));
        }
        else {
            earlierCreatedChild_11.updateWithValueParams({
                content: "skip:跳过N个(由参数提供)发出值", onClickListener: () => {
                    this.skip();
                }
            });
            View.create(earlierCreatedChild_11);
        }
        let earlierCreatedChild_12: MyButton = (this && this.findChildById) ? this.findChildById("12") as MyButton : undefined;
        if (earlierCreatedChild_12 == undefined) {
            View.create(new MyButton("12", this, { content: "skipUntil:跳过源observable发出的值，直到提供的observable发出值", onClickListener: () => {
                    this.skipUntil();
                } }));
        }
        else {
            earlierCreatedChild_12.updateWithValueParams({
                content: "skipUntil:跳过源observable发出的值，直到提供的observable发出值", onClickListener: () => {
                    this.skipUntil();
                }
            });
            View.create(earlierCreatedChild_12);
        }
        let earlierCreatedChild_13: MyButton = (this && this.findChildById) ? this.findChildById("13") as MyButton : undefined;
        if (earlierCreatedChild_13 == undefined) {
            View.create(new MyButton("13", this, { content: "skipWhile:跳过源observable发出的值，直到提供的表达式结果为 false", onClickListener: () => {
                    this.skipWhile();
                } }));
        }
        else {
            earlierCreatedChild_13.updateWithValueParams({
                content: "skipWhile:跳过源observable发出的值，直到提供的表达式结果为 false", onClickListener: () => {
                    this.skipWhile();
                }
            });
            View.create(earlierCreatedChild_13);
        }
        let earlierCreatedChild_14: MyButton = (this && this.findChildById) ? this.findChildById("14") as MyButton : undefined;
        if (earlierCreatedChild_14 == undefined) {
            View.create(new MyButton("14", this, { content: "take:在完成前发出N个值(N由参数决定)", onClickListener: () => {
                    this.take();
                } }));
        }
        else {
            earlierCreatedChild_14.updateWithValueParams({
                content: "take:在完成前发出N个值(N由参数决定)", onClickListener: () => {
                    this.take();
                }
            });
            View.create(earlierCreatedChild_14);
        }
        let earlierCreatedChild_15: MyButton = (this && this.findChildById) ? this.findChildById("15") as MyButton : undefined;
        if (earlierCreatedChild_15 == undefined) {
            View.create(new MyButton("15", this, { content: "takeUntil:发出值，直到提供的observable发出值，它便完成", onClickListener: () => {
                    this.takeUntil();
                } }));
        }
        else {
            earlierCreatedChild_15.updateWithValueParams({
                content: "takeUntil:发出值，直到提供的observable发出值，它便完成", onClickListener: () => {
                    this.takeUntil();
                }
            });
            View.create(earlierCreatedChild_15);
        }
        let earlierCreatedChild_16: MyButton = (this && this.findChildById) ? this.findChildById("16") as MyButton : undefined;
        if (earlierCreatedChild_16 == undefined) {
            View.create(new MyButton("16", this, { content: "takeWhile:发出值，直到提供的表达式结果为 false ", onClickListener: () => {
                    this.takeWhile();
                } }));
        }
        else {
            earlierCreatedChild_16.updateWithValueParams({
                content: "takeWhile:发出值，直到提供的表达式结果为 false ", onClickListener: () => {
                    this.takeWhile();
                }
            });
            View.create(earlierCreatedChild_16);
        }
        let earlierCreatedChild_17: MyButton = (this && this.findChildById) ? this.findChildById("17") as MyButton : undefined;
        if (earlierCreatedChild_17 == undefined) {
            View.create(new MyButton("17", this, {
                content: "throttle:以某个时间间隔为阈值，在durationSelector 完成前将抑制新值的发出",
                onClickListener: () => {
                    this.throttle();
                }
            }));
        }
        else {
            earlierCreatedChild_17.updateWithValueParams({
                content: "throttle:以某个时间间隔为阈值，在durationSelector 完成前将抑制新值的发出",
                onClickListener: () => {
                    this.throttle();
                }
            });
            View.create(earlierCreatedChild_17);
        }
        let earlierCreatedChild_18: MyButton = (this && this.findChildById) ? this.findChildById("18") as MyButton : undefined;
        if (earlierCreatedChild_18 == undefined) {
            View.create(new MyButton("18", this, { content: "throttleTime:当指定的持续时间经过后发出最新值", onClickListener: () => {
                    this.throttleTime();
                } }));
        }
        else {
            earlierCreatedChild_18.updateWithValueParams({
                content: "throttleTime:当指定的持续时间经过后发出最新值", onClickListener: () => {
                    this.throttleTime();
                }
            });
            View.create(earlierCreatedChild_18);
        }
        Flex.pop();
        Scroll.pop();
    }
    debounce() {
        const example = of('WAIT', 'ONE', 'SECOND', 'Last will display');
        const debouncedExample = example.pipe(debounce(() => timer(1000)));
        const subscribe = debouncedExample.subscribe(val => {
            Log.showLog('debounce--' + val);
        });
    }
    debounceTime() {
        const example = interval(500).pipe(take(7));
        const debouncedInput = example.pipe(debounceTime(1000));
        const subscribe = debouncedInput.subscribe(val => {
            Log.showLog(`debounceTime--${val}`);
        });
    }
    distinctUntilChanged() {
        const myArrayWithDuplicatesInARow = from([1, 1, 2, 2, 3, 1, 2, 3]);
        const distinctSub = myArrayWithDuplicatesInARow
            .pipe(distinctUntilChanged())
            .subscribe(val => {
            Log.showLog('distinctUntilChanged--' + val);
        });
        const nonDistinctSub = myArrayWithDuplicatesInARow
            .subscribe(val => {
            Log.showLog('distinctUntilChanged--' + val);
        });
    }
    filter() {
        const source = from([1, 2, 3, 4, 5]);
        const example = source.pipe(filter(num => num % 2 === 0));
        const subscribe = example.subscribe(val => {
            Log.showLog(`filter--${val}`);
        });
    }
    first() {
        const source = from([1, 2, 3, 4, 5]);
        const example = source.pipe(first());
        const subscribe = example.subscribe(val => {
            Log.showLog(`first--${val}`);
        });
    }
    ignoreElements() {
        const source = interval(100);
        const example = source.pipe(take(5), ignoreElements());
        const subscribe = example.subscribe(val => Log.showLog(`ignoreElements--NEXT: ${val}`), (val: any) => {
            Log.showLog(`ignoreElements--ERROR: ${val}`);
        }, () => Log.showLog('ignoreElements--COMPLETE!'));
    }
    last() {
        const source = from([1, 2, 3, 4, 5]);
        const example = source.pipe(last());
        const subscribe = example.subscribe(val => {
            Log.showLog(`last--${val}`);
        });
    }
    sample() {
        const source = interval(1000);
        const example = source.pipe(sample(interval(2000)), take(5));
        const subscribe = example.subscribe(val => {
            Log.showLog('sample--' + val);
        });
    }
    single() {
        const source = from([1, 2, 3, 4, 5]);
        const example = source.pipe(single(val => val === 4));
        const subscribe = example.subscribe(val => {
            Log.showLog('single--' + val);
        });
    }
    skip() {
        const source = interval(1000);
        const example = source.pipe(skip(5), take(4));
        const subscribe = example.subscribe(val => {
            Log.showLog('skip--' + val);
        });
    }
    skipUntil() {
        const source = interval(1000);
        const example = source.pipe(skipUntil(timer(6000)), take(4));
        const subscribe = example.subscribe(val => {
            Log.showLog('skipUntil--' + val);
        });
    }
    skipWhile() {
        const source = interval(1000);
        const example = source.pipe(skipWhile(val => val < 5), take(4));
        const subscribe = example.subscribe(val => {
            Log.showLog('skipWhile--' + val);
        });
    }
    take() {
        const source = of(1, 2, 3, 4, 5);
        const example = source.pipe(take(1));
        const subscribe = example.subscribe(val => {
            Log.showLog('take--' + val);
        });
    }
    takeUntil() {
        const source = interval(1000);
        const timer$ = timer(5000);
        const example = source.pipe(takeUntil(timer$));
        const subscribe = example.subscribe(val => {
            Log.showLog('takeUntil--' + val);
        });
    }
    takeWhile() {
        const source = of(1, 2, 3, 4, 5);
        const example = source.pipe(takeWhile(val => val <= 4));
        const subscribe = example.subscribe(val => {
            Log.showLog('takeWhile--' + val);
        });
    }
    throttle() {
        const source = interval(1000);
        const example = source.pipe(throttle(val => interval(2000)), take(4));
        const subscribe = example.subscribe(val => {
            Log.showLog('throttle--' + val);
        });
    }
    throttleTime() {
        const source = interval(1000);
        const example = source.pipe(throttleTime(5000), take(3));
        const subscribe = example.subscribe(val => {
            Log.showLog('throttleTime--' + val);
        });
    }
}
loadDocument(new Create("1", undefined, {}));
