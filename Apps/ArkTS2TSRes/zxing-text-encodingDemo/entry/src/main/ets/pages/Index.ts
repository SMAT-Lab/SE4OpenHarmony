interface Index_Params {
    message?: string;
    inputText?: string;
    encoded?: Uint8Array | null;
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
import { TextDecoder, TextEncoder } from '@zxing/text-encoding';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('zxing/text-encoding的编码与解码', this, "message");
        this.__inputText = new ObservedPropertySimple('', this, "inputText");
        this.__encoded = new ObservedPropertyObject(null, this, "encoded");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.inputText !== undefined) {
            this.inputText = params.inputText;
        }
        if (params.encoded !== undefined) {
            this.encoded = params.encoded;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__inputText.aboutToBeDeleted();
        this.__encoded.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __inputText: ObservedPropertySimple<string>;
    get inputText() {
        return this.__inputText.get();
    }
    set inputText(newValue: string) {
        this.__inputText.set(newValue);
    }
    private __encoded: ObservedPropertyObject<Uint8Array | null>;
    get encoded() {
        return this.__encoded.get();
    }
    set encoded(newValue: Uint8Array | null) {
        this.__encoded.set(newValue);
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
        TextInput.create({ placeholder: 'input your word', text: this.inputText });
        TextInput.height(60);
        TextInput.border({ width: 5, color: Color.Red });
        TextInput.placeholderColor(Color.Blue);
        TextInput.placeholderFont({ size: 20, weight: FontWeight.Normal, family: "sans-serif", style: FontStyle.Italic });
        TextInput.caretColor(Color.Blue);
        TextInput.enterKeyType(EnterKeyType.Search);
        TextInput.onChange((value: string) => {
            this.inputText = value;
        });
        Button.createWithLabel('编码');
        Button.width(300);
        Button.margin(20);
        Button.fontSize(25);
        Button.onClick(() => {
            this.encoded = new TextEncoder('utf-8').encode(this.inputText);
            let mess = new TextEncoder('utf-8').encode(this.inputText);
            this.showDialog(mess + "");
        });
        Button.pop();
        Button.createWithLabel('解码');
        Button.width(300);
        Button.margin(20);
        Button.fontSize(25);
        Button.onClick(() => {
            const decodedArray = new TextDecoder('utf-8').decode(ObservedObject.GetRawObject(this.encoded));
            this.showDialog(decodedArray);
        });
        Button.pop();
        Column.pop();
        Row.pop();
    }
    showDialog(message: string) {
        AlertDialog.show({
            title: '',
            message: message,
            confirm: {
                value: 'OK',
                action: () => {
                }
            }
        });
    }
}
loadDocument(new Index("1", undefined, {}));
