interface Combine_Params {
    forkJoin?;
    mergeAll?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "combine_" + ++__generate__Id;
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
import { take, map, combineAll, concatAll, delay, pairwise, mapTo, startWith, withLatestFrom, concat, merge, mergeWith } from 'rxjs';
import { interval, timer, combineLatest, of, race, zip } from 'rxjs';
import Log from '../log';
import { MyButton } from '../common/MyButton';
import { forkJoin, mergeAll } from './ArkTools';
class Combine extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.forkJoin = forkJoin;
        this.mergeAll = mergeAll;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Combine_Params) {
        if (params.forkJoin !== undefined) {
            this.forkJoin = params.forkJoin;
        }
        if (params.mergeAll !== undefined) {
            this.mergeAll = params.mergeAll;
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
        Flex.padding({ bottom: 10 });
        let earlierCreatedChild_2: MyButton = (this && this.findChildById) ? this.findChildById("2") as MyButton : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new MyButton("2", this, {
                content: "combineAll:当源observable完成时，对收集的observables使用combineLatest",
                onClickListener: () => {
                    this.combineAll();
                }
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                content: "combineAll:当源observable完成时，对收集的observables使用combineLatest",
                onClickListener: () => {
                    this.combineAll();
                }
            });
            View.create(earlierCreatedChild_2);
        }
        let earlierCreatedChild_3: MyButton = (this && this.findChildById) ? this.findChildById("3") as MyButton : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new MyButton("3", this, {
                content: "combineLatest:当任意observable发出值时，发出每个observable的最新值",
                onClickListener: () => {
                    this.combineLatest();
                }
            }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                content: "combineLatest:当任意observable发出值时，发出每个observable的最新值",
                onClickListener: () => {
                    this.combineLatest();
                }
            });
            View.create(earlierCreatedChild_3);
        }
        let earlierCreatedChild_4: MyButton = (this && this.findChildById) ? this.findChildById("4") as MyButton : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new MyButton("4", this, {
                content: "concat:按照顺序，前一个observable完成了再订阅下一个observable并发出值",
                onClickListener: () => {
                    this.concatObservable();
                }
            }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({
                content: "concat:按照顺序，前一个observable完成了再订阅下一个observable并发出值",
                onClickListener: () => {
                    this.concatObservable();
                }
            });
            View.create(earlierCreatedChild_4);
        }
        let earlierCreatedChild_5: MyButton = (this && this.findChildById) ? this.findChildById("5") as MyButton : undefined;
        if (earlierCreatedChild_5 == undefined) {
            View.create(new MyButton("5", this, { content: "concatAll:收集observables，当前一个完成时订阅下一个", onClickListener: () => {
                    this.concatAll();
                } }));
        }
        else {
            earlierCreatedChild_5.updateWithValueParams({
                content: "concatAll:收集observables，当前一个完成时订阅下一个", onClickListener: () => {
                    this.concatAll();
                }
            });
            View.create(earlierCreatedChild_5);
        }
        let earlierCreatedChild_6: MyButton = (this && this.findChildById) ? this.findChildById("6") as MyButton : undefined;
        if (earlierCreatedChild_6 == undefined) {
            View.create(new MyButton("6", this, { content: "forkJoin:当所有observables完成时，发出每个observable的最新值", onClickListener: () => {
                    this.forkJoin();
                } }));
        }
        else {
            earlierCreatedChild_6.updateWithValueParams({
                content: "forkJoin:当所有observables完成时，发出每个observable的最新值", onClickListener: () => {
                    this.forkJoin();
                }
            });
            View.create(earlierCreatedChild_6);
        }
        let earlierCreatedChild_7: MyButton = (this && this.findChildById) ? this.findChildById("7") as MyButton : undefined;
        if (earlierCreatedChild_7 == undefined) {
            View.create(new MyButton("7", this, { content: "merge:将多个observables转换成单个observable", onClickListener: () => {
                    this.merge();
                } }));
        }
        else {
            earlierCreatedChild_7.updateWithValueParams({
                content: "merge:将多个observables转换成单个observable", onClickListener: () => {
                    this.merge();
                }
            });
            View.create(earlierCreatedChild_7);
        }
        let earlierCreatedChild_8: MyButton = (this && this.findChildById) ? this.findChildById("8") as MyButton : undefined;
        if (earlierCreatedChild_8 == undefined) {
            View.create(new MyButton("8", this, { content: "mergeAll:收集并订阅所有的observables", onClickListener: () => {
                    this.mergeAll();
                } }));
        }
        else {
            earlierCreatedChild_8.updateWithValueParams({
                content: "mergeAll:收集并订阅所有的observables", onClickListener: () => {
                    this.mergeAll();
                }
            });
            View.create(earlierCreatedChild_8);
        }
        let earlierCreatedChild_9: MyButton = (this && this.findChildById) ? this.findChildById("9") as MyButton : undefined;
        if (earlierCreatedChild_9 == undefined) {
            View.create(new MyButton("9", this, { content: "pairwise:将前一个值和当前值作为数组发出", onClickListener: () => {
                    this.pairwise();
                } }));
        }
        else {
            earlierCreatedChild_9.updateWithValueParams({
                content: "pairwise:将前一个值和当前值作为数组发出", onClickListener: () => {
                    this.pairwise();
                }
            });
            View.create(earlierCreatedChild_9);
        }
        let earlierCreatedChild_10: MyButton = (this && this.findChildById) ? this.findChildById("10") as MyButton : undefined;
        if (earlierCreatedChild_10 == undefined) {
            View.create(new MyButton("10", this, { content: "race:使用首先发出值的observable", onClickListener: () => {
                    this.race();
                } }));
        }
        else {
            earlierCreatedChild_10.updateWithValueParams({
                content: "race:使用首先发出值的observable", onClickListener: () => {
                    this.race();
                }
            });
            View.create(earlierCreatedChild_10);
        }
        let earlierCreatedChild_11: MyButton = (this && this.findChildById) ? this.findChildById("11") as MyButton : undefined;
        if (earlierCreatedChild_11 == undefined) {
            View.create(new MyButton("11", this, { content: "startWith:发出给定的第一个值", onClickListener: () => {
                    this.startWith();
                } }));
        }
        else {
            earlierCreatedChild_11.updateWithValueParams({
                content: "startWith:发出给定的第一个值", onClickListener: () => {
                    this.startWith();
                }
            });
            View.create(earlierCreatedChild_11);
        }
        let earlierCreatedChild_12: MyButton = (this && this.findChildById) ? this.findChildById("12") as MyButton : undefined;
        if (earlierCreatedChild_12 == undefined) {
            View.create(new MyButton("12", this, { content: "withLatestFrom:还提供另一个observable的最新值", onClickListener: () => {
                    this.withLatestFrom();
                } }));
        }
        else {
            earlierCreatedChild_12.updateWithValueParams({
                content: "withLatestFrom:还提供另一个observable的最新值", onClickListener: () => {
                    this.withLatestFrom();
                }
            });
            View.create(earlierCreatedChild_12);
        }
        let earlierCreatedChild_13: MyButton = (this && this.findChildById) ? this.findChildById("13") as MyButton : undefined;
        if (earlierCreatedChild_13 == undefined) {
            View.create(new MyButton("13", this, { content: "zip:在所有observables发出后将它们的值作为数组发出", onClickListener: () => {
                    this.zip();
                } }));
        }
        else {
            earlierCreatedChild_13.updateWithValueParams({
                content: "zip:在所有observables发出后将它们的值作为数组发出", onClickListener: () => {
                    this.zip();
                }
            });
            View.create(earlierCreatedChild_13);
        }
        Flex.pop();
        Scroll.pop();
    }
    combineAll() {
        const source = interval(1000).pipe(take(2));
        const example = source.pipe(map(val => interval(1000)
            .pipe(map(i => `Result (${val}): ${i}`), take(5))));
        const combined = example.pipe(combineAll());
        const subscribe = combined.subscribe((val) => {
            Log.showLog('combineAll--' + val);
        });
    }
    combineLatest() {
        const timerOne = timer(1000, 4000).pipe(take(3));
        const timerTwo = timer(2000, 4000).pipe(take(3));
        const timerThree = timer(3000, 4000).pipe(take(3));
        const combinedProject = combineLatest(timerOne, timerTwo, timerThree, (one, two, three) => {
            return `Timer One (Proj) Latest: ${one},
              Timer Two (Proj) Latest: ${two},
              Timer Three (Proj) Latest: ${three}`;
        });
        const subscribe = combinedProject.subscribe(latestValuesProject => {
            Log.showLog('combineLatest--' + latestValuesProject);
        });
    }
    concatObservable() {
        const sourceOne = of(1, 2, 3);
        const sourceTwo = of(4, 5, 6);
        const example: any = concat(sourceOne, sourceTwo);
        const subscribe: any = example.subscribe((val: any) => {
            Log.showLog('concatObservable--' + val);
        });
    }
    concatAll() {
        const obs1 = interval(1000).pipe(take(5));
        const obs2 = interval(500).pipe(take(2));
        const obs3 = interval(2000).pipe(take(1));
        const source = of(obs1, obs2, obs3);
        const example = source.pipe(concatAll());
        const subscribe: any = example.subscribe((val: any) => {
            Log.showLog('concatAll--' + val);
        });
    }
    private forkJoin;
    merge() {
        const first = interval(2500);
        const second = interval(1000);
        const example: any = first.pipe(mergeWith(second), take(6));
        const subscribe: any = example.subscribe((val: any) => {
            Log.showLog('merge--' + val);
        });
    }
    private mergeAll;
    pairwise() {
        const example = interval(1000).pipe(pairwise(), take(5));
        const subscribe = example.subscribe((val: any) => {
            Log.showLog('pairwise--' + val);
        });
    }
    race() {
        const example = race(interval(1500), interval(1000)
            .pipe(mapTo('1s won!')), interval(2000), interval(2500))
            .pipe(take(2));
        const subscribe = example.subscribe((val: any) => {
            Log.showLog('race--' + val);
        });
    }
    startWith() {
        const source = of(1, 2, 3);
        const example = source.pipe(startWith(0));
        const subscribe = example.subscribe((val: any) => {
            Log.showLog('startWith--' + val);
        });
    }
    withLatestFrom() {
        const source = interval(5000);
        const secondSource = interval(1000);
        const example = source.pipe(withLatestFrom(secondSource), map((first, second) => {
            return `First Source (5s): ${first} Second Source (1s): ${second}`;
        }), take(5));
        const subscribe = example.subscribe((val: any) => {
            Log.showLog('withLatestFrom--' + val);
        });
    }
    zip() {
        const sourceOne = of('Hello');
        const sourceTwo = of('World!');
        const sourceThree = of('Goodbye');
        const sourceFour = of('World!');
        const example = zip(sourceOne, sourceTwo.pipe(delay(1000)), sourceThree.pipe(delay(2000)), sourceFour.pipe(delay(3000)));
        const subscribe = example.subscribe((val: any) => {
            Log.showLog('zip--' + val);
        });
    }
}
loadDocument(new Combine("1", undefined, {}));
