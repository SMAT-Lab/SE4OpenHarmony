interface PostDelay_Params {
    mLifecycle?: Lifecycle;
    sendCount?: number;
    receiveCount?: string;
    lastClickTime?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "PostDelay_" + ++__generate__Id;
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
import { LiveEventBus, Lifecycle, State, Observer } from '@ohos/liveeventbus';
import prompt from '@system.prompt';
import router from '@ohos.router';
const showToast = (str: string) => {
    prompt.showToast({
        message: str,
        duration: 2000,
    });
};
const KEY_TEST_DELAY_LIFE_LONG: string = "key_test_delay_life_long";
const KEY_TEST_DELAY_LIFE: string = "key_test_delay_life";
class PostDelay extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.mLifecycle = new Lifecycle(State.STARTED);
        this.sendCount = 100;
        this.receiveCount = '0';
        this.lastClickTime = 0;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: PostDelay_Params) {
        if (params.mLifecycle !== undefined) {
            this.mLifecycle = params.mLifecycle;
        }
        if (params.sendCount !== undefined) {
            this.sendCount = params.sendCount;
        }
        if (params.receiveCount !== undefined) {
            this.receiveCount = params.receiveCount;
        }
        if (params.lastClickTime !== undefined) {
            this.lastClickTime = params.lastClickTime;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private mLifecycle: Lifecycle;
    private sendCount: number;
    private receiveCount: string;
    private lastClickTime: number;
    aboutToAppear() {
        let observer: Observer<string> = new MyObserver(this.receiveCount);
        LiveEventBus.get<string>(KEY_TEST_DELAY_LIFE_LONG)
            .observe(this, observer);
    }
    getLifecycle(): Lifecycle {
        return this.mLifecycle;
    }
    render() {
        Column.create({ space: 5 });
        Column.width('100%');
        Column.height('100%');
        Button.createWithLabel('发送延迟2s不带生命周期');
        Button.onClick((event) => {
            this.testDelayNoLife();
        });
        Button.pop();
        Button.createWithLabel('发送延迟2s带生命周期');
        Button.onClick((event) => {
            this.testDelayWithLife();
        });
        Button.pop();
        Button.createWithLabel('连续多次发送延迟2s带生命周期');
        Button.onClick((event) => {
            this.testDelayWithLifeLast();
        });
        Button.pop();
        Column.pop();
    }
    testDelayNoLife() {
        LiveEventBus
            .get<string>(KEY_TEST_DELAY_LIFE)
            .postDelay("Send Msg To Observer Delay 2s", 2000);
        router.back();
    }
    testDelayWithLife() {
        LiveEventBus
            .get<string>(KEY_TEST_DELAY_LIFE)
            .postDelay("Send Msg To Observer Delay 2s", 2000, this);
        router.back();
    }
    testDelayWithLifeLast() {
        let time = new Date().getTime();
        if (time - this.lastClickTime < 2000) {
            return;
        }
        this.lastClickTime = time;
        this.receiveCount = '0';
        for (let i = 0; i < this.sendCount; i++) {
            LiveEventBus
                .get<string>(KEY_TEST_DELAY_LIFE_LONG)
                .postDelay("Send " + i + " Msg To Observer Delay 2s", 2000, this);
        }
        console.log('[LiveEventBus] PostDelay send finish');
    }
}
class MyObserver implements Observer<string> {
    private receiveCount: string;
    constructor(receiveCount: string) {
        this.receiveCount = receiveCount;
    }
    onChanged(s: string) {
        console.info('[LiveEventBus] PostDelay:' + s);
        let count: number = Number(this.receiveCount);
        count++;
        this.receiveCount = count + '';
        showToast("receiveCount: " + this.receiveCount);
    }
}
loadDocument(new PostDelay("1", undefined, {}));
