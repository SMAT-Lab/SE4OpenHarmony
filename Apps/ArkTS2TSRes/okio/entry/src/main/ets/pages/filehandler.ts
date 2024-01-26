interface Filehandler_Params {
    message?: string;
    areaValue?: string;
    readValue?: string;
    path?: string;
    controller?: TextAreaController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "filehandler_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Okio, Source } from '@ohos/okio';
import promptAction from '@ohos.promptAction';
import { GlobalContext } from '../global/GlobalContext';
class Filehandler extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.__areaValue = new ObservedPropertySimple('', this, "areaValue");
        this.__readValue = new ObservedPropertySimple('', this, "readValue");
        this.path = '';
        this.controller = new TextAreaController();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Filehandler_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.areaValue !== undefined) {
            this.areaValue = params.areaValue;
        }
        if (params.readValue !== undefined) {
            this.readValue = params.readValue;
        }
        if (params.path !== undefined) {
            this.path = params.path;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__areaValue.aboutToBeDeleted();
        this.__readValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __areaValue: ObservedPropertySimple<string>;
    get areaValue() {
        return this.__areaValue.get();
    }
    set areaValue(newValue: string) {
        this.__areaValue.set(newValue);
    }
    private __readValue: ObservedPropertySimple<string>;
    get readValue() {
        return this.__readValue.get();
    }
    set readValue(newValue: string) {
        this.__readValue.set(newValue);
    }
    private path: string;
    private controller: TextAreaController;
    aboutToAppear() {
        // this.path = globalThis.context.filesDir + '/testFile.txt';
        this.path = GlobalContext.getContext().getObject("filesDir") + '/testFile.txt';
    }
    writeData(path: string, content: string) {
        let sink = new Okio.Sink(path);
        sink.write(content, false);
    }
    readeData(path: string) {
        let source = new Okio.Source(path);
        source.read().then((data: string) => {
            if (data && typeof data === 'string') {
                this.readValue = data;
            }
        }).catch((err: Error) => {
            promptAction.showToast({
                message: 'okio: readFileValue inside catch   ' + err,
                bottom: "50%"
            });
        });
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Column.backgroundColor(Color.White);
        TextArea.create({ placeholder: '输入字符串可写入文件', controller: this.controller });
        TextArea.height(50);
        TextArea.width('100%');
        TextArea.margin(5);
        TextArea.onChange((value: string) => {
            this.areaValue = value;
            this.controller.caretPosition(value.length);
        });
        Text.create('测试将字符串写入文件');
        Text.width('90%');
        Text.height(50);
        Text.backgroundColor(0xFFFFFF);
        Text.borderRadius(15);
        Text.fontSize(13);
        Text.textAlign(TextAlign.Center);
        Text.margin({ top: 10 });
        Text.onClick(() => {
            if (this.areaValue && this.areaValue.length > 0) {
                this.writeData(this.path, this.areaValue);
                promptAction.showToast({
                    message: '写入完成~~~',
                    bottom: '50%'
                });
            }
            else {
                promptAction.showToast({
                    message: '写入失败，内容不可以为空',
                    bottom: '50%'
                });
            }
        });
        Text.pop();
        Text.create('测试将字符串读出来');
        Text.width('90%');
        Text.height(50);
        Text.backgroundColor(0xFFFFFF);
        Text.borderRadius(15);
        Text.fontSize(13);
        Text.textAlign(TextAlign.Center);
        Text.margin({ top: 10 });
        Text.onClick(() => {
            this.readeData(this.path);
        });
        Text.pop();
        Text.create('测试读取的文件数据' + this.readValue);
        Text.width('90%');
        Text.height(50);
        Text.backgroundColor(0xFFFFFF);
        Text.borderRadius(15);
        Text.fontSize(13);
        Text.textAlign(TextAlign.Center);
        Text.margin({ top: 10 });
        Text.onClick(() => {
        });
        Text.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Filehandler("1", undefined, {}));
