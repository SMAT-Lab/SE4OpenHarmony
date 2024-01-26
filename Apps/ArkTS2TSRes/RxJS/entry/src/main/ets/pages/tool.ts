interface Tool_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "tool_" + ++__generate__Id;
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
import { timer, interval, of, merge, from, Notification } from 'rxjs';
import { mapTo, delay, map, tap, delayWhen, dematerialize, concatMap, catchError, timeout, take } from 'rxjs';
import Log from '../log';
import { MyButton } from '../common/MyButton';
class Tool extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Tool_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        let earlierCreatedChild_2: MyButton = (this && this.findChildById) ? this.findChildById("2") as MyButton : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new MyButton("2", this, { content: "do/tap:透明地执行操作或副作用，比如打印日志", onClickListener: () => {
                    this.tap();
                } }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                content: "do/tap:透明地执行操作或副作用，比如打印日志", onClickListener: () => {
                    this.tap();
                }
            });
            View.create(earlierCreatedChild_2);
        }
        let earlierCreatedChild_3: MyButton = (this && this.findChildById) ? this.findChildById("3") as MyButton : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new MyButton("3", this, { content: "delay:根据给定时间延迟发出值", onClickListener: () => {
                    this.delay();
                } }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                content: "delay:根据给定时间延迟发出值", onClickListener: () => {
                    this.delay();
                }
            });
            View.create(earlierCreatedChild_3);
        }
        let earlierCreatedChild_4: MyButton = (this && this.findChildById) ? this.findChildById("4") as MyButton : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new MyButton("4", this, { content: "delayWhen:延迟发出值，延迟时间由提供函数决定", onClickListener: () => {
                    this.delayWhen();
                } }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({
                content: "delayWhen:延迟发出值，延迟时间由提供函数决定", onClickListener: () => {
                    this.delayWhen();
                }
            });
            View.create(earlierCreatedChild_4);
        }
        let earlierCreatedChild_5: MyButton = (this && this.findChildById) ? this.findChildById("5") as MyButton : undefined;
        if (earlierCreatedChild_5 == undefined) {
            View.create(new MyButton("5", this, { content: "dematerialize:将notification对象转换成notification值", onClickListener: () => {
                    this.dematerialize();
                } }));
        }
        else {
            earlierCreatedChild_5.updateWithValueParams({
                content: "dematerialize:将notification对象转换成notification值", onClickListener: () => {
                    this.dematerialize();
                }
            });
            View.create(earlierCreatedChild_5);
        }
        let earlierCreatedChild_6: MyButton = (this && this.findChildById) ? this.findChildById("6") as MyButton : undefined;
        if (earlierCreatedChild_6 == undefined) {
            View.create(new MyButton("6", this, { content: "timeout:在指定时间间隔内不发出值就报错", onClickListener: () => {
                    this.timeout();
                } }));
        }
        else {
            earlierCreatedChild_6.updateWithValueParams({
                content: "timeout:在指定时间间隔内不发出值就报错", onClickListener: () => {
                    this.timeout();
                }
            });
            View.create(earlierCreatedChild_6);
        }
        Flex.pop();
    }
    tap() {
        const source = of(1, 2, 3, 4, 5);
        const example: any = source.pipe(tap((val: any) => {
            Log.showLog(`tap--BEFORE MAP: ${val}`);
        }), map((val: any) => {
            val + 10;
        }), tap((val: any) => {
            Log.showLog(`tap--AFTER MAP: ${val}`);
        }));
        const subscribe: any = example.subscribe((val: any) => {
            Log.showLog('tap--' + val);
        });
    }
    delay() {
        const example = of(null);
        const message = merge(example.pipe(mapTo('Hello')), example.pipe(mapTo('World!'), delay(1000)), example.pipe(mapTo('Goodbye'), delay(2000)), example.pipe(mapTo('World!'), delay(3000)));
        const subscribe = message.subscribe((val: any) => {
            Log.showLog('delay--' + val);
        });
    }
    delayWhen() {
        const message = interval(1000);
        const delayForFiveSeconds = () => timer(5000);
        const delayWhenExample = message.pipe(delayWhen(delayForFiveSeconds), take(5));
        const subscribe = delayWhenExample.subscribe((val: any) => {
            Log.showLog('delayWhen--' + val);
        });
    }
    dematerialize() {
        const source = from([
            Notification.createNext('SUCCESS!'),
            Notification.createError('ERROR!')
        ]).pipe(dematerialize());
        const subscription = source.subscribe({
            next: (val: any) => Log.showLog(`dematerialize--NEXT VALUE: ${val}`),
            error: (val: any) => Log.showLog(`dematerialize--ERROR VALUE: ${val}`)
        });
    }
    timeout() {
        of(4000, 3000, 2000)
            .pipe(concatMap(duration => this.makeRequest(duration)
            .pipe(timeout(2500), catchError((error: any) => of(`Request timed out after: ${duration}`)))))
            .subscribe((val: any) => {
            Log.showLog('timeout--' + val);
        });
    }
    makeRequest(timeToDelay: any) {
        return of('Request Complete!').pipe(delay(timeToDelay));
    }
}
loadDocument(new Tool("1", undefined, {}));
