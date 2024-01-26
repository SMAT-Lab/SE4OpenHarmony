interface Demo_Params {
    mLifecycle?: Lifecycle;
    scroller?: Scroller;
    sendCount?: number;
    receiveCount?: number;
    randomKey?: string;
    observer?: Observer<string>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "demo_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import { LiveEventBus, Observer } from '@ohos/liveeventbus';
import { Lifecycle } from '@ohos/liveeventbus';
import { State } from '@ohos/liveeventbus';
import router from '@ohos.router';
import prompt from '@system.prompt';
const showToast = (str: string) => {
    console.log('showToast:' + str);
    try {
        prompt.showToast({
            message: str,
            duration: 2000,
        });
    }
    catch (err) {
        console.log('showToast err:' + err);
    }
};
const observer: Observer<string> = {
    onChanged(s: string) {
        showToast(s);
    }
};
function startService() {
    LiveEventBus.get<string>(KEY_TEST_BROADCAST)
        .observeForever(observer);
    LiveEventBus
        .get<string>(KEY_TEST_BROADCAST_IN_APP)
        .observeForever(observer);
    LiveEventBus
        .get<string>(KEY_TEST_BROADCAST_GLOBAL)
        .observeForever(observer);
}
function destroyService() {
    LiveEventBus
        .get<string>(KEY_TEST_BROADCAST)
        .removeObserver(observer);
    LiveEventBus
        .get<string>(KEY_TEST_BROADCAST_IN_APP)
        .removeObserver(observer);
    LiveEventBus
        .get<string>(KEY_TEST_BROADCAST_GLOBAL)
        .removeObserver(observer);
}
const KEY_TEST_OBSERVE = "key_test_observe";
const KEY_TEST_OBSERVE_FOREVER = "key_test_observe_forever";
const KEY_TEST_STICKY = "key_test_sticky";
const KEY_TEST_MULTI_THREAD_POST = "key_test_multi_thread_post";
const KEY_TEST_CLOSE_ALL_PAGE = "key_test_close_all_page";
const KEY_TEST_ACTIVE_LEVEL = "key_test_active_level";
const KEY_TEST_ACTIVE_LEVEL_SINGLE = "key_test_active_level_single";
const KEY_TEST_BROADCAST = "key_test_broadcast";
const KEY_TEST_BROADCAST_IN_APP = "key_test_broadcast_in_app";
const KEY_TEST_BROADCAST_GLOBAL = "key_test_broadcast_global";
const KEY_TEST_DELAY_LIFE = "key_test_delay_life";
class Demo extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.mLifecycle = new Lifecycle(State.STARTED);
        this.scroller = new Scroller();
        this.sendCount = 0;
        this.receiveCount = 0;
        this.randomKey = "";
        this.observer = {
            onChanged(s: string) {
                showToast(s);
            }
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Demo_Params) {
        if (params.mLifecycle !== undefined) {
            this.mLifecycle = params.mLifecycle;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.sendCount !== undefined) {
            this.sendCount = params.sendCount;
        }
        if (params.receiveCount !== undefined) {
            this.receiveCount = params.receiveCount;
        }
        if (params.randomKey !== undefined) {
            this.randomKey = params.randomKey;
        }
        if (params.observer !== undefined) {
            this.observer = params.observer;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private mLifecycle: Lifecycle;
    private scroller: Scroller;
    private sendCount: number;
    private receiveCount: number;
    private randomKey: string;
    private observer: Observer<string>;
    aboutToAppear() {
        LiveEventBus
            .get<string>(KEY_TEST_OBSERVE)
            .observe(this, this.observer);
        LiveEventBus
            .get<string>(KEY_TEST_OBSERVE_FOREVER)
            .observeForever(this.observer);
        let observerCloseAllPage: Observer<boolean> = {
            onChanged(b: boolean) {
                if (b) {
                    console.log('action ---> close all');
                    router.clear();
                    router.back();
                }
            }
        };
        LiveEventBus
            .get<boolean>(KEY_TEST_CLOSE_ALL_PAGE)
            .observe(this, observerCloseAllPage);
        let observerMultiThreadPost: Observer<string> = {
            onChanged(s: string) {
                this.receiveCount++;
            }
        };
        LiveEventBus
            .get<string>(KEY_TEST_MULTI_THREAD_POST)
            .observe(this, observerMultiThreadPost);
        let observerActiveLevel: Observer<string> = {
            onChanged(s: string) {
                showToast("Receive message: " + s);
            }
        };
        LiveEventBus
            .get<string>(KEY_TEST_ACTIVE_LEVEL)
            .observe(this, observerActiveLevel);
        let observerActiveLevelSingle: Observer<string> = {
            onChanged(s: string) {
                showToast("Receive message: " + s);
            }
        };
        LiveEventBus
            .get<string>(KEY_TEST_ACTIVE_LEVEL_SINGLE)
            .observe(this, observerActiveLevelSingle);
        let observerDelayLife: Observer<string> = {
            onChanged(s: string) {
                showToast("Receive message: " + s);
            }
        };
        LiveEventBus
            .get<string>(KEY_TEST_DELAY_LIFE)
            .observe(this, observerDelayLife);
        let observerDemoEvent: Observer<string> = {
            onChanged(demoEvent) {
                console.log('DemoEvent:' + JSON.stringify(demoEvent));
                let event: DemoEvent = JSON.parse(demoEvent);
                showToast("Receive message: " + event.content);
            }
        };
        LiveEventBus.get<string>('DemoEvent')
            .observe(this, observerDemoEvent);
        startService();
    }
    aboutToDisappear() {
        destroyService();
        this.mLifecycle.markState(State.DESTROYED);
    }
    getLifecycle(): Lifecycle {
        return this.mLifecycle;
    }
    render() {
        Column.create({ space: 10 });
        Text.create('LiveEventBus Demo');
        Text.fontSize(30);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Scroll.create();
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.scrollBar(BarState.On);
        Scroll.scrollBarColor(Color.Gray);
        Scroll.scrollBarWidth(30);
        Column.create({ space: 5 });
        Column.width('100%');
        Column.margin({ bottom: 150 });
        Button.createWithLabel('发送消息');
        Button.onClick(event => {
            this.sendMsgByPostValue();
        });
        Button.pop();
        Button.createWithLabel('发送消息给observeForever()注册的订阅者');
        Button.onClick(event => {
            this.sendMsgToForeverObserver();
        });
        Button.pop();
        Button.createWithLabel('Start一个新的Ability（测试close all）');
        Button.onClick(event => {
            this.startNewAbility();
        });
        Button.pop();
        Button.createWithLabel('关闭All Ability');
        Button.onClick(event => {
            this.closeAll();
        });
        Button.pop();
        Button.createWithLabel('发送消息给Sticky Receiver');
        Button.onClick(event => {
            this.sendMsgToStickyReceiver();
        });
        Button.pop();
        Button.createWithLabel('Start Sticky Ability（测试Sticky）');
        Button.onClick(event => {
            this.startStickyAbility();
        });
        Button.pop();
        Button.createWithLabel('测试PostValue会丢失消息的问题');
        Button.onClick(event => {
            this.postValueCountTest();
        });
        Button.pop();
        Button.createWithLabel('测试动态注册一个Observer会收到之前发送的消息的问题');
        Button.onClick(event => {
            this.testMessageSetBefore();
        });
        Button.pop();
        Button.createWithLabel('发送的消息给之前动态注册的Observer');
        Button.onClick(event => {
            this.sendMessageSetBefore();
        });
        Button.pop();
        Button.createWithLabel('测试Observer active level');
        Button.onClick(event => {
            this.testObserverAbilityLevel();
        });
        Button.pop();
        Button.createWithLabel('测试跨进程发送消息');
        Button.onClick(event => {
            this.testBroadcast();
        });
        Button.pop();
        Button.createWithLabel('测试延迟发送带生命周期');
        Button.onClick(event => {
            this.testDelayLife();
        });
        Button.pop();
        Button.createWithLabel('发送App内广播');
        Button.onClick(event => {
            this.testBroadcastInApp();
        });
        Button.pop();
        Button.createWithLabel('发送全局广播');
        Button.onClick(event => {
            this.testBroadcastGlobal();
        });
        Button.pop();
        Button.createWithLabel('发送DemoEvent');
        Button.onClick(event => {
            this.sendDemoEvent();
        });
        Button.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    sendMsgByPostValue() {
        console.log('click sendMsgByPostValue');
        LiveEventBus.get<string>(KEY_TEST_OBSERVE)
            .post("Message By PostValue: " + nextInt(100));
    }
    sendMsgToForeverObserver() {
        LiveEventBus.get<string>(KEY_TEST_OBSERVE_FOREVER)
            .post("Message To ForeverObserver: " + nextInt(100));
    }
    startNewAbility() {
        router.pushUrl({
            url: 'pages/demo',
            params: {},
        });
    }
    closeAll() {
        LiveEventBus.get<boolean>(KEY_TEST_CLOSE_ALL_PAGE).post(true);
    }
    sendMsgToStickyReceiver() {
        LiveEventBus.get<string>(KEY_TEST_STICKY)
            .post("Message Sticky: " + nextInt(100));
    }
    startStickyAbility() {
        router.pushUrl({ url: 'pages/Sticky' });
    }
    postValueCountTest() {
        this.sendCount = 1000;
        this.receiveCount = 0;
        for (let i = 0; i < this.sendCount; i++) {
            LiveEventBus.get<string>(KEY_TEST_MULTI_THREAD_POST).post("test_data");
        }
        setTimeout(() => {
            showToast("sendCount: " + this.sendCount + " | receiveCount: " + this.receiveCount);
        }, 1000);
    }
    testMessageSetBefore() {
        //先动态生成一个key
        this.randomKey = "key_random_" + nextInt(100);
        //然后发出一个消息
        LiveEventBus.get<string>(this.randomKey).post("msg set before");
        //然后订阅这个消息
        LiveEventBus
            .get<string>(this.randomKey)
            .observe(this, this.observer);
    }
    sendMessageSetBefore() {
        LiveEventBus.get<string>(this.randomKey).post("msg set after");
    }
    testObserverAbilityLevel() {
        router.pushUrl({ url: 'pages/ObserverAbilityLevel' });
    }
    testBroadcast() {
        LiveEventBus
            .get<string>(KEY_TEST_BROADCAST)
            .postAcrossApp("broadcast msg");
    }
    testDelayLife() {
        router.pushUrl({
            url: 'pages/PostDelay',
            params: {},
        });
    }
    testBroadcastInApp() {
        LiveEventBus
            .get<string>(KEY_TEST_BROADCAST_IN_APP)
            .postAcrossProcess("broadcast msg in app");
    }
    testBroadcastGlobal() {
        LiveEventBus
            .get<string>(KEY_TEST_BROADCAST_GLOBAL)
            .postAcrossApp("broadcast msg global");
    }
    sendDemoEvent() {
        LiveEventBus
            .get<string>('DemoEvent')
            .post(JSON.stringify(new DemoEvent("Hello world")));
    }
}
class DemoEvent {
    content: string;
    constructor(content: string) {
        this.content = content;
    }
}
const nextInt = (num: number): number => {
    return getRandomNumInt(0, num);
};
const getRandomNumInt = (min: number, max: number): number => {
    let Range = max - min;
    let Rand = Math.random(); //获取[0-1）的随机数
    return (min + Math.round(Rand * Range)); //放大取整
};
loadDocument(new Demo("1", undefined, {}));
