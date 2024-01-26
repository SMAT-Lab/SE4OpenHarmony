interface Index_Params {
    message?: string;
    result?: Boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
import { isPlainObject } from 'is-plain-object';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Test', this, "message");
        this.__result = new ObservedPropertyObject(false, this, "result");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.result !== undefined) {
            this.result = params.result;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__result.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    public __result: ObservedPropertyObject<Boolean>;
    get result() {
        return this.__result.get();
    }
    set result(newValue: Boolean) {
        this.__result.set(newValue);
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
        Button.createWithLabel('isObject');
        Button.width('90%');
        Button.height(50);
        Button.margin({
            bottom: 10
        });
        Button.onClick(() => {
            this.click();
        });
        Button.pop();
        Text.create("结果 :" + this.result);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.margin({ top: "30px" });
        Text.pop();
        Column.pop();
        Row.pop();
    }
    click() {
        this.result = isPlainObject({});
        console.log('isObject expect true', this.result);
    }
}
loadDocument(new Index("1", undefined, {}));
