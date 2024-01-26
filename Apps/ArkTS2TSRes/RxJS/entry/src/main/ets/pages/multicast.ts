interface Multicast_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "multicast_" + ++__generate__Id;
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
import { Subject, timer, interval, zip, of, merge, from, ConnectableObservable } from 'rxjs';
import { tap, mapTo, share, pluck, shareReplay, publish, map, take, multicast } from 'rxjs';
import Log from '../log';
import { MyButton } from '../common/MyButton';
class Multicast extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Multicast_Params) {
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
            View.create(new MyButton("2", this, { content: "publish:共享源observable并通过调用connect方法使其变成热的", onClickListener: () => {
                    this.publish();
                } }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                content: "publish:共享源observable并通过调用connect方法使其变成热的", onClickListener: () => {
                    this.publish();
                }
            });
            View.create(earlierCreatedChild_2);
        }
        let earlierCreatedChild_3: MyButton = (this && this.findChildById) ? this.findChildById("3") as MyButton : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new MyButton("3", this, { content: "multicast:使用提供的Subject来共享源observable", onClickListener: () => {
                    this.multicast();
                } }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                content: "multicast:使用提供的Subject来共享源observable", onClickListener: () => {
                    this.multicast();
                }
            });
            View.create(earlierCreatedChild_3);
        }
        let earlierCreatedChild_4: MyButton = (this && this.findChildById) ? this.findChildById("4") as MyButton : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new MyButton("4", this, { content: "share:在多个订阅者间共享源observable", onClickListener: () => {
                    this.share();
                } }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({
                content: "share:在多个订阅者间共享源observable", onClickListener: () => {
                    this.share();
                }
            });
            View.create(earlierCreatedChild_4);
        }
        let earlierCreatedChild_5: MyButton = (this && this.findChildById) ? this.findChildById("5") as MyButton : undefined;
        if (earlierCreatedChild_5 == undefined) {
            View.create(new MyButton("5", this, { content: "shareReplay:共享源observable并重放指定次数的发出", onClickListener: () => {
                    this.shareReplay();
                } }));
        }
        else {
            earlierCreatedChild_5.updateWithValueParams({
                content: "shareReplay:共享源observable并重放指定次数的发出", onClickListener: () => {
                    this.shareReplay();
                }
            });
            View.create(earlierCreatedChild_5);
        }
        Flex.pop();
    }
    share() {
        const source = timer(1000);
        const example = source.pipe(tap(() => {
            Log.showLog('***SIDE EFFECT***');
        }), mapTo('***RESULT***'));
        const subscribe = example.subscribe((val: any) => {
            Log.showLog('share--' + val);
        });
        const subscribeTwo = example.subscribe((val: any) => {
            Log.showLog('share--' + val);
        });
        const sharedExample = example.pipe(share());
        const subscribeThree = sharedExample.subscribe((val: any) => {
            Log.showLog('share--' + val);
        });
        const subscribeFour = sharedExample.subscribe((val: any) => {
            Log.showLog('share--' + val);
        });
    }
    shareReplay() {
        interface data1 {
            data: any;
            url: string;
        }
        const routeEnd = new Subject<data1>();
        const lastUrl: any = routeEnd.pipe(tap((_: any) => {
            Log.showLog('shareReplay--executed');
        }), pluck('url'), shareReplay(1));
        const initialSubscriber: any = lastUrl.subscribe(Log.showLog);
        routeEnd.next({ data: {}, url: 'my-path' });
        const lateSubscriber: any = lastUrl.subscribe(Log.showLog);
    }
    publish() {
        const source = zip(interval(2000), of(1, 2, 3, 4, 5, 6, 7, 8, 9)).pipe(map(values => values[1]));
        source.pipe(publish(multicasted => merge(multicasted.pipe(tap((val: any) => {
            Log.showLog('publish--Stream 1:' + val);
        })), multicasted.pipe(tap((val: any) => {
            Log.showLog('publish--Stream 2:' + val);
        })), multicasted.pipe(tap((val: any) => {
            Log.showLog('publish--Stream 3:' + val);
        }))))).subscribe();
    }
    multicast() {
        // multicast操作符:多播的实现。 需要开启 multicasted.connect();
        const source = from([1, 2, 3]);
        const subject1: any = new Subject<any>();
        const multicasted = source.pipe(multicast(subject1)) as ConnectableObservable<number>;
        multicasted.subscribe({
            next: (v) => Log.showLog(`multicast--A:${v}`)
        });
        multicasted.subscribe({
            next: (v) => Log.showLog(`multicast--B:${v}`)
        });
        multicasted.connect();
    }
}
loadDocument(new Multicast("1", undefined, {}));
