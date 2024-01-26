interface EncodeByteTest_Params {
    test?: number[];
    filePath?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "EncodeByteTest_" + ++__generate__Id;
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
import { Base64 } from '@ohos/base64';
import prompt from '@ohos.promptAction';
import { GlobalContext } from '../entryability/GlobalContext';
import { Context } from '@ohos.abilityAccessCtrl';
class EncodeByteTest extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        this.__filePath = new ObservedPropertySimple("", this, "filePath");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: EncodeByteTest_Params) {
        if (params.test !== undefined) {
            this.test = params.test;
        }
        if (params.filePath !== undefined) {
            this.filePath = params.filePath;
        }
    }
    aboutToBeDeleted() {
        this.__filePath.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private test: number[];
    private __filePath: ObservedPropertySimple<string>;
    get filePath() {
        return this.__filePath.get();
    }
    set filePath(newValue: string) {
        this.__filePath.set(newValue);
    }
    render() {
        Column.create();
        Text.create('data:' + this.test);
        Text.fontSize('20fp');
        Text.width('100%');
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Text.create('encode:' + Base64.encode(new Uint8Array(this.test)));
        Text.fontSize('20fp');
        Text.width('100%');
        Text.margin({ top: 10 });
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Text.create('decode:' + Base64.decode(Base64.encode(new Uint8Array(this.test))));
        Text.fontSize('20fp');
        Text.width('100%');
        Text.margin({ top: 10 });
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Text.create('encodeBytes:' + Base64.encodeBytes(new Uint8Array(this.test)));
        Text.fontSize('20fp');
        Text.width('100%');
        Text.margin({ top: 10 });
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Text.create('decodeBytes:' + Base64.decode(Base64.encodeBytes(new Uint8Array(this.test))));
        Text.fontSize('20fp');
        Text.width('100%');
        Text.margin({ top: 10 });
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Text.create('encodeBytesToBytes:' + Base64.encodeBytesToBytes(new Uint8Array(this.test)));
        Text.fontSize('20fp');
        Text.width('100%');
        Text.margin({ top: 10 });
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Text.create('decodeBytes:' + Base64.decode(Base64.encodeBytesToBytes(new Uint8Array(this.test))));
        Text.fontSize('20fp');
        Text.width('100%');
        Text.margin({ top: 10 });
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Text.create('encodeToFile:');
        Text.fontSize('20fp');
        Text.width(200);
        Text.height(60);
        Text.textAlign(TextAlign.Center);
        Text.fontColor('#ffffff');
        Text.backgroundColor('#ff017fef');
        Text.margin({ top: 10 });
        Text.onClick(() => {
            let context: Context = GlobalContext.getContext().getObject("context") as Context;
            this.filePath = context.filesDir.concat('/test.txt');
            Base64.encodeToFile(this.filePath, new Uint8Array(this.test));
        });
        Text.pop();
        Text.create('decodeFromFile:');
        Text.fontSize('20fp');
        Text.width(200);
        Text.height(60);
        Text.textAlign(TextAlign.Center);
        Text.fontColor('#ffffff');
        Text.backgroundColor('#ff017fef');
        Text.margin({ top: 10 });
        Text.onClick(() => {
            if (this.filePath !== "") {
                let result = Base64.decodeFromFile(this.filePath);
                console.info("base64 decodeFromFile:" + result.toString());
                prompt.showToast({
                    message: result.toString(),
                    duration: 3000
                });
            }
            else {
                prompt.showToast({
                    message: "找不到文件",
                    duration: 3000
                });
            }
        });
        Text.pop();
        Column.pop();
    }
}
loadDocument(new EncodeByteTest("1", undefined, {}));
