interface Index_Params {
    content?: string;
    normalContent?: string;
    textSize?: number;
    maxLines?: number;
    mWidth?: string;
    model?: AutofitTextView.Model;
    model1?: AutofitTextView.Model;
    indexCount?: number;
    length?: number;
    screenWidth?;
    historyInput?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
import { AutofitTextView } from '@ohos/autofittextview';
import { TypedValue } from '@ohos/autofittextview';
import window from '@ohos.window';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__content = new ObservedPropertySimple('', this, "content");
        this.__normalContent = new ObservedPropertySimple('', this, "normalContent");
        this.__textSize = new ObservedPropertySimple(20, this, "textSize");
        this.__maxLines = new ObservedPropertySimple(2, this, "maxLines");
        this.__mWidth = new ObservedPropertySimple('100%', this, "mWidth");
        this.__model = new ObservedPropertyObject(new AutofitTextView.Model(), this, "model");
        this.__model1 = new ObservedPropertyObject(new AutofitTextView.Model(), this, "model1");
        this.indexCount = 0;
        this.length = 0;
        this.screenWidth = 0;
        this.__historyInput = new ObservedPropertySimple('This is an example', this, "historyInput");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.content !== undefined) {
            this.content = params.content;
        }
        if (params.normalContent !== undefined) {
            this.normalContent = params.normalContent;
        }
        if (params.textSize !== undefined) {
            this.textSize = params.textSize;
        }
        if (params.maxLines !== undefined) {
            this.maxLines = params.maxLines;
        }
        if (params.mWidth !== undefined) {
            this.mWidth = params.mWidth;
        }
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.model1 !== undefined) {
            this.model1 = params.model1;
        }
        if (params.indexCount !== undefined) {
            this.indexCount = params.indexCount;
        }
        if (params.length !== undefined) {
            this.length = params.length;
        }
        if (params.screenWidth !== undefined) {
            this.screenWidth = params.screenWidth;
        }
        if (params.historyInput !== undefined) {
            this.historyInput = params.historyInput;
        }
    }
    aboutToBeDeleted() {
        this.__content.aboutToBeDeleted();
        this.__normalContent.aboutToBeDeleted();
        this.__textSize.aboutToBeDeleted();
        this.__maxLines.aboutToBeDeleted();
        this.__mWidth.aboutToBeDeleted();
        this.__model.aboutToBeDeleted();
        this.__model1.aboutToBeDeleted();
        this.__historyInput.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __content: ObservedPropertySimple<string>;
    get content() {
        return this.__content.get();
    }
    set content(newValue: string) {
        this.__content.set(newValue);
    }
    private __normalContent: ObservedPropertySimple<string>;
    get normalContent() {
        return this.__normalContent.get();
    }
    set normalContent(newValue: string) {
        this.__normalContent.set(newValue);
    }
    private __textSize: ObservedPropertySimple<number>;
    get textSize() {
        return this.__textSize.get();
    }
    set textSize(newValue: number) {
        this.__textSize.set(newValue);
    }
    private __maxLines: ObservedPropertySimple<number>;
    get maxLines() {
        return this.__maxLines.get();
    }
    set maxLines(newValue: number) {
        this.__maxLines.set(newValue);
    }
    private __mWidth: ObservedPropertySimple<string>;
    get mWidth() {
        return this.__mWidth.get();
    }
    set mWidth(newValue: string) {
        this.__mWidth.set(newValue);
    }
    private __model: ObservedPropertyObject<AutofitTextView.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: AutofitTextView.Model) {
        this.__model.set(newValue);
    }
    private __model1: ObservedPropertyObject<AutofitTextView.Model>;
    get model1() {
        return this.__model1.get();
    }
    set model1(newValue: AutofitTextView.Model) {
        this.__model1.set(newValue);
    }
    private indexCount: number;
    private length: number;
    private screenWidth;
    private __historyInput: ObservedPropertySimple<string>;
    get historyInput() {
        return this.__historyInput.get();
    }
    set historyInput(newValue: string) {
        this.__historyInput.set(newValue);
    }
    aboutToAppear() {
        this.model.setWidth(this.mWidth);
        this.model.setText(this.historyInput);
        this.model.setMaxLines(2);
        this.model.setTextSize(22, TypedValue.COMPLEX_UNIT_PX);
        this.model.setMinTextSize(16);
        this.model.setMaxTextSize(50);
        this.model.setTextOverflow(TextOverflow.None);
        this.model1.setWidth(this.mWidth);
        this.model1.setText(this.historyInput);
        this.model1.setMaxLines(2);
        this.model1.setTextSize(22, TypedValue.COMPLEX_UNIT_FP);
        this.model1.setMinTextSize(16);
        this.model1.setMaxTextSize(40);
        this.model1.setBackgroundColor(0XD1C9C9);
        this.model1.setTextOverflow(TextOverflow.Ellipsis);
    }
    render() {
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Column.padding(10);
        Column.width('100%');
        Column.height('100%');
        TextInput.create({ placeholder: '请输入...', text: this.historyInput });
        TextInput.type(InputType.Normal);
        TextInput.placeholderColor(Color.Gray);
        TextInput.fontColor('#333333');
        TextInput.enterKeyType(EnterKeyType.Search);
        TextInput.caretColor(Color.Green);
        TextInput.height(60);
        TextInput.padding(10);
        TextInput.fontSize(20);
        TextInput.borderRadius('12px');
        TextInput.borderColor('#c8bebe');
        TextInput.borderWidth(2);
        TextInput.onChange((content: string) => {
            this.historyInput = content;
            this.model.setText(content);
            this.model1.setText(content);
            this.normalContent = content;
        });
        Text.create('Autofit:');
        Text.fontSize(20);
        Text.margin({ top: 20 });
        Text.pop();
        Divider.create();
        Divider.vertical(false);
        Divider.strokeWidth(20);
        Divider.color('#00ffffff');
        Text.create('Normal:');
        Text.fontSize(20);
        Text.margin({ top: 20 });
        Text.pop();
        Text.create(this.historyInput);
        Text.fontSize(16);
        Text.margin({ top: 10 });
        Text.maxLines(2);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
