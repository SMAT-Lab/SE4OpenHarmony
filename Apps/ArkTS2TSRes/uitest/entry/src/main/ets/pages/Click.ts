interface Click_Params {
    message?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Click_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License")
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
import router from '@ohos.router';
class Click extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Click_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Text.create(this.message);
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.id("result_text");
        Text.pop();
        Button.createWithLabel("singleClick");
        Button.id("click_bt");
        Button.onClick(() => {
            this.message = "singleClick";
        });
        Button.pop();
        Button.createWithChild();
        Button.type(ButtonType.Capsule);
        Button.margin({ top: 20 });
        Gesture.create(GesturePriority.Low);
        TapGesture.create({ count: 2 });
        TapGesture.onAction(() => {
            router.pushUrl({ url: 'pages/Third' });
        });
        TapGesture.pop();
        Gesture.pop();
        Gesture.create(GesturePriority.Low);
        LongPressGesture.create({ repeat: false });
        LongPressGesture.onAction((event: GestureEvent) => {
            router.pushUrl({ url: 'pages/Fourth' });
        });
        LongPressGesture.pop();
        Gesture.pop();
        Text.create('Click twice');
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Button.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Click("1", undefined, {}));
