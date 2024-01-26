interface JumpTwo_Params {
    message?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "JumpTwo_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import EventEmitter from 'eventemitter3';
import router from '@ohos.router';
import { GlobalContext } from './GlobalContext';
class JumpTwo extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: JumpTwo_Params) {
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
    aboutToAppear() {
        const ctx = this;
        let emitter: EventEmitter<string, Object> | undefined = GlobalContext.getContext()
            .getObject(GlobalContext.KEY_EMITTER) as EventEmitter<string, Object>;
        if (emitter) {
            emitter.on('pageTwo', (data: string) => {
                console.log(`componentB Data: ${data}`);
                ctx.message = data;
            });
        }
    }
    onPageShow() {
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Text.create(this.message);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.width('100%');
        Text.backgroundColor(Color.Grey);
        Text.fontColor(Color.Black);
        Text.height(150);
        Text.pop();
        Button.createWithLabel('返回');
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.width('100%');
        Button.height(50);
        Button.margin(20);
        Button.onClick(() => {
            router.back({
                url: "pages/JumpOne"
            });
        });
        Button.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new JumpTwo("1", undefined, {}));
