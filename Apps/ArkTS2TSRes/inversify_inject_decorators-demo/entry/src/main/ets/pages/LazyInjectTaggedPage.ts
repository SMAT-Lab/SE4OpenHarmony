interface LazyInjectTaggedPage_Params {
    message?: string;
    message2?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "LazyInjectTaggedPage_" + ++__generate__Id;
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
import { LazyInjectTaggedFunction } from './lazyInjectInterface';
class LazyInjectTaggedPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.__message2 = new ObservedPropertySimple('Hello World 2', this, "message2");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: LazyInjectTaggedPage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.message2 !== undefined) {
            this.message2 = params.message2;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__message2.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __message2: ObservedPropertySimple<string>;
    get message2() {
        return this.__message2.get();
    }
    set message2(newValue: string) {
        this.__message2.set(newValue);
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Text.create(this.message);
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create(this.message2);
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Column.pop();
        Row.pop();
    }
    aboutToAppear() {
        this.sample();
    }
    sample() {
        let obj = LazyInjectTaggedFunction();
        console.log(obj.sword); // true
        console.log(obj.shuriken); // true
        this.message = obj.sword;
        this.message2 = obj.shuriken;
    }
}
loadDocument(new LazyInjectTaggedPage("1", undefined, {}));
