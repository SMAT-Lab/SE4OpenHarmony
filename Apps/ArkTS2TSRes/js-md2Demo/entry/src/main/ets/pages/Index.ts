interface Index_Params {
    message?: string;
    inputText?: string;
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
import md2 from 'js-md2';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('js-md2', this, "message");
        this.__inputText = new ObservedPropertySimple('', this, "inputText");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.inputText !== undefined) {
            this.inputText = params.inputText;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__inputText.aboutToBeDeleted();
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
        Button.createWithLabel('md2');
        Button.width(300);
        Button.margin(20);
        Button.fontSize(25);
        Button.onClick(() => {
            let mess: string = md2(this.inputText);
            this.showDialog(mess);
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
