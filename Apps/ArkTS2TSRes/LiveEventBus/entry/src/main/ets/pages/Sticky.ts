interface Sticky_Params {
    mLifecycle?: Lifecycle;
    sticky1?: MyStickyOne;
    sticky2?: MyStickyTwo;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Sticky_" + ++__generate__Id;
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
import { LiveEventBus, Lifecycle, MState, Observer, LifecycleOwner } from '@ohos/liveeventbus';
const KEY_TEST_STICKY = "key_test_sticky";
class Sticky extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.mLifecycle = new Lifecycle(MState.STARTED);
        this.__sticky1 = new ObservedPropertyObject(new MyStickyOne(), this, "sticky1");
        this.__sticky2 = new ObservedPropertyObject(new MyStickyTwo(), this, "sticky2");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Sticky_Params) {
        if (params.mLifecycle !== undefined) {
            this.mLifecycle = params.mLifecycle;
        }
        if (params.sticky1 !== undefined) {
            this.sticky1 = params.sticky1;
        }
        if (params.sticky2 !== undefined) {
            this.sticky2 = params.sticky2;
        }
    }
    aboutToBeDeleted() {
        this.__sticky1.aboutToBeDeleted();
        this.__sticky2.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private mLifecycle: Lifecycle;
    private __sticky1: ObservedPropertyObject<MyStickyOne>;
    get sticky1() {
        return this.__sticky1.get();
    }
    set sticky1(newValue: MyStickyOne) {
        this.__sticky1.set(newValue);
    }
    private __sticky2: ObservedPropertyObject<MyStickyTwo>;
    get sticky2() {
        return this.__sticky2.get();
    }
    set sticky2(newValue: MyStickyTwo) {
        this.__sticky2.set(newValue);
    }
    aboutToAppear() {
        console.log('sticky 页面初始化');
        let lifecycleOwner: LifecycleOwner = new MyLifecycleOwner(this.mLifecycle);
        LiveEventBus
            .get<string>(KEY_TEST_STICKY)
            .observeSticky(lifecycleOwner, this.sticky1);
        LiveEventBus
            .get<string>(KEY_TEST_STICKY)
            .observeStickyForever(this.sticky2);
    }
    aboutToDisappear() {
        this.mLifecycle.markState(MState.DESTROYED);
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Start });
        Flex.width('100%');
        Flex.height('100%');
        Text.create('Sticky Test Demo');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create(this.sticky1.sticky1);
        Text.fontSize(30);
        Text.pop();
        Text.create(this.sticky2.sticky2);
        Text.fontSize(30);
        Text.pop();
        Flex.pop();
    }
}
class MyLifecycleOwner implements LifecycleOwner {
    private mLifecycle: Lifecycle;
    constructor(mLifecycle: Lifecycle) {
        this.mLifecycle = mLifecycle;
    }
    getLifecycle(): Lifecycle {
        return this.mLifecycle;
    }
}
@Observed
class MyStickyOne implements Observer<string> {
    sticky1: string = '';
    onChanged(s: string) {
        console.log('sticky onChange2:' + s);
        this.sticky1 = "observeSticky注册的观察者收到消息: " + s;
    }
}
@Observed
class MyStickyTwo implements Observer<string> {
    sticky2: string = '';
    onChanged(s: string) {
        console.log('sticky onChange:' + s);
        this.sticky2 = "observeStickyForever注册的观察者收到消息: " + s;
    }
}
loadDocument(new Sticky("1", undefined, {}));
