interface Index_Params {
    message?: string;
    resoult?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
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
import hilog from '@ohos.hilog';
var testNapi = globalThis.requireNapi("entry", true);
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple("<?xml version=\"1.0\"?>" +
            "<!DOCTYPE PLAY SYSTEM \"play.dtd\">" +
            "<PLAY>" +
            "<TITLE>A Midsummer Night's Dream</TITLE>" +
            "</PLAY>", this, "message");
        this.__resoult = new ObservedPropertySimple('', this, "resoult");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.resoult !== undefined) {
            this.resoult = params.resoult;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__resoult.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __resoult: ObservedPropertySimple<string>;
    get resoult() {
        return this.__resoult.get();
    }
    set resoult(newValue: string) {
        this.__resoult.set(newValue);
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Text.create(this.message);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            hilog.info(0x0000, 'testTag', 'tinyxml2 = %{public}s', testNapi.GetText());
        });
        Text.pop();
        Button.createWithChild();
        Button.backgroundColor(Color.Blue);
        Button.width("100%");
        Button.onClick(() => {
            this.test();
        });
        Text.create('从字符串中解析xml');
        Text.fontSize(40);
        Text.fontWeight(FontWeight.Bold);
        Text.fontColor(Color.White);
        Text.maxLines(1);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Text.create('解析结果：title标签的text = ' + this.resoult.toString());
        Text.fontSize(40);
        Text.fontWeight(FontWeight.Bold);
        Text.fontColor(Color.Black);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Column.pop();
        Row.pop();
    }
    test() {
        this.resoult = testNapi.GetText();
        hilog.info(0x0000, 'testTag', 'tinyxml2 = %{public}s', this.resoult);
    }
}
loadDocument(new Index("1", undefined, {}));
