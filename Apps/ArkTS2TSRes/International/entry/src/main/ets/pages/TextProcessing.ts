interface TextProcessing_Params {
    textTypeResult?: string;
    textTypeValue?: string;
    areaTextValue?: string;
    areaTextResult?: string[];
    textTypes?: Array<string>;
    breakIterator?;
    context?: common.UIAbilityContext;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TextProcessing_" + ++__generate__Id;
}
/*
* Copyright (c) 2023 Hunan OpenValley Digital Industry Development Co., Ltd.
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
import TitleBar from '../component/TitleBar';
import ResourceUtil from '../util/ResourceUtil';
import I18n from '@ohos.i18n';
import common from '@ohos.app.ability.common';
const types = ['U_UNASSIGNED', 'U_GENERAL_OTHER_TYPES', 'U_UPPERCASE_LETTER',
    'U_LOWERCASE_LETTER', 'U_TITLECASE_LETTER', 'U_MODIFIER_LETTER',
    'U_OTHER_LETTER', 'U_NON_SPACING_MARK', 'U_ENCLOSING_MARK',
    'U_COMBINING_SPACING_MARK', 'U_DECIMAL_DIGIT_NUMBER', 'U_LETTER_NUMBER',
    'U_OTHER_NUMBER', 'U_SPACE_SEPARATOR', 'U_LINE_SEPARATOR',
    'U_PARAGRAPH_SEPARATOR', 'U_CONTROL_CHAR', 'U_FORMAT_CHAR',
    'U_PRIVATE_USE_CHAR', 'U_SURROGATE', 'U_DASH_PUNCTUATION',
    'U_START_PUNCTUATION', 'U_END_PUNCTUATION', 'U_CONNECTOR_PUNCTUATION',
    'U_OTHER_PUNCTUATION', 'U_MATH_SYMBOL', 'U_CURRENCY_SYMBOL',
    'U_MODIFIER_SYMBOL', 'U_OTHER_SYMBOL', 'U_INITIAL_PUNCTUATION',
    'U_FINAL_PUNCTUATION', 'U_CHAR_CATEGORY_COUNT'];
const LOCALE = I18n.System.getSystemLocale();
const TAG = 'TextProcessing';
const MAX = 60;
class TextProcessing extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__textTypeResult = new ObservedPropertySimple('', this, "textTypeResult");
        this.__textTypeValue = new ObservedPropertySimple('', this, "textTypeValue");
        this.__areaTextValue = new ObservedPropertySimple('', this, "areaTextValue");
        this.__areaTextResult = new ObservedPropertyObject([], this, "areaTextResult");
        this.__textTypes = new ObservedPropertyObject([], this, "textTypes");
        this.breakIterator = I18n.getLineInstance(LOCALE);
        this.context = getContext(this) as common.UIAbilityContext;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TextProcessing_Params) {
        if (params.textTypeResult !== undefined) {
            this.textTypeResult = params.textTypeResult;
        }
        if (params.textTypeValue !== undefined) {
            this.textTypeValue = params.textTypeValue;
        }
        if (params.areaTextValue !== undefined) {
            this.areaTextValue = params.areaTextValue;
        }
        if (params.areaTextResult !== undefined) {
            this.areaTextResult = params.areaTextResult;
        }
        if (params.textTypes !== undefined) {
            this.textTypes = params.textTypes;
        }
        if (params.breakIterator !== undefined) {
            this.breakIterator = params.breakIterator;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
    }
    aboutToBeDeleted() {
        this.__textTypeResult.aboutToBeDeleted();
        this.__textTypeValue.aboutToBeDeleted();
        this.__areaTextValue.aboutToBeDeleted();
        this.__areaTextResult.aboutToBeDeleted();
        this.__textTypes.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __textTypeResult: ObservedPropertySimple<string>;
    get textTypeResult() {
        return this.__textTypeResult.get();
    }
    set textTypeResult(newValue: string) {
        this.__textTypeResult.set(newValue);
    }
    private __textTypeValue: ObservedPropertySimple<string>;
    get textTypeValue() {
        return this.__textTypeValue.get();
    }
    set textTypeValue(newValue: string) {
        this.__textTypeValue.set(newValue);
    }
    private __areaTextValue: ObservedPropertySimple<string>;
    get areaTextValue() {
        return this.__areaTextValue.get();
    }
    set areaTextValue(newValue: string) {
        this.__areaTextValue.set(newValue);
    }
    private __areaTextResult: ObservedPropertyObject<string[]>;
    get areaTextResult() {
        return this.__areaTextResult.get();
    }
    set areaTextResult(newValue: string[]) {
        this.__areaTextResult.set(newValue);
    }
    private __textTypes: ObservedPropertyObject<Array<string>>;
    get textTypes() {
        return this.__textTypes.get();
    }
    set textTypes(newValue: Array<string>) {
        this.__textTypes.set(newValue);
    }
    private breakIterator;
    private context: common.UIAbilityContext;
    async aboutToAppear() {
        this.textTypes = await ResourceUtil.getStringArray($r('app.strarray.text_type_arr').id, this.context);
    }
    render() {
        Column.create();
        Column.height('100%');
        Column.width('100%');
        let earlierCreatedChild_2: TitleBar = (this && this.findChildById) ? this.findChildById("2") as TitleBar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new TitleBar("2", this, { hasBackPress: true, title: $r('app.string.text_processing') }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                hasBackPress: true, title: $r('app.string.text_processing')
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        Text.create($r('app.string.character_type_detection'));
        Text.padding({ top: 22, left: 24 });
        Text.width('100%');
        Text.pop();
        Column.create();
        Column.backgroundColor(Color.White);
        Column.margin({ left: 12, right: 12, top: 8 });
        Column.border({ radius: 16 });
        Column.height(106);
        TextInput.create({ placeholder: $r('app.string.character_type_tip') });
        TextInput.id('short_text_input');
        TextInput.maxLength(1);
        TextInput.placeholderFont({ size: 16 });
        TextInput.backgroundColor(Color.Transparent);
        TextInput.fontColor(Color.Black);
        TextInput.fontSize(16);
        TextInput.width('100%');
        TextInput.height(50);
        TextInput.onChange((value) => {
            this.textTypeValue = value;
        });
        Divider.create();
        Divider.strokeWidth(1);
        Divider.opacity(0.05);
        Divider.margin({ left: 12, right: 12 });
        Divider.backgroundColor(Color.Black);
        Text.create(this.textTypeResult);
        Text.width('100%');
        Text.textAlign(TextAlign.Start);
        Text.padding({ top: 12, left: 12 });
        Text.fontColor(Color.Black);
        Text.opacity(0.9);
        Text.fontSize(16);
        Text.pop();
        Column.pop();
        Button.createWithLabel($r('app.string.show_character_type'));
        Button.id('show_character_type');
        Button.width(180);
        Button.height(36);
        Button.margin({ top: 12 });
        Button.onClick(() => {
            if (!this.textTypeValue) {
                this.textTypeResult = '';
                return;
            }
            let type = I18n.Unicode.getType(this.textTypeValue);
            this.textTypeResult = this.textTypes[types.indexOf(type)];
        });
        Button.pop();
        Text.create($r('app.string.text_break'));
        Text.padding({ top: 22, left: 24 });
        Text.width('100%');
        Text.pop();
        Column.create();
        Column.backgroundColor(Color.White);
        Column.margin({ left: 12, right: 12, top: 8 });
        Column.border({ radius: 16 });
        Column.height(232);
        Stack.create({ alignContent: Alignment.BottomEnd });
        TextArea.create({ placeholder: $r('app.string.long_piece_of_text') });
        TextArea.id('long_text_input');
        TextArea.placeholderFont({ size: 16 });
        TextArea.backgroundColor(Color.Transparent);
        TextArea.inputFilter(this.areaTextValue.length < MAX ? '' : '^$');
        TextArea.fontColor(Color.Black);
        TextArea.fontSize(16);
        TextArea.width('100%');
        TextArea.height(124);
        TextArea.onChange((value) => {
            this.areaTextValue = value;
        });
        Text.create(`${this.areaTextValue.length}`);
        Text.fontSize(16);
        Text.opacity(0.4);
        Text.padding(10);
        Text.pop();
        Stack.pop();
        Divider.create();
        Divider.strokeWidth(1);
        Divider.opacity(0.05);
        Divider.margin({ left: 12, right: 12 });
        Divider.backgroundColor(Color.Black);
        Text.create();
        Text.width('100%');
        Text.height(84);
        Text.textAlign(TextAlign.Start);
        Text.padding({ top: 12, left: 12 });
        Text.opacity(0.9);
        ForEach.create("3", this, ObservedObject.GetRawObject(this.areaTextResult), (str: string, index) => {
            Span.create(str);
            Span.fontColor(Color.Black);
            Span.fontSize(16);
            If.create();
            if (index !== this.areaTextResult.length - 1) {
                If.branchId(0);
                Span.create('/');
                Span.fontColor(Color.Red);
                Span.fontSize(16);
            }
            If.pop();
        });
        ForEach.pop();
        Text.pop();
        Column.pop();
        Button.createWithLabel($r('app.string.text_breakpoint'));
        Button.width(180);
        Button.height(36);
        Button.margin({ top: 12 });
        Button.onClick(() => {
            let tem: string[] = [];
            this.breakIterator.setLineBreakText(this.areaTextValue);
            this.breakIterator.first();
            let pos = this.breakIterator.next();
            let flag = 0;
            while (pos !== -1) {
                tem.push(this.areaTextValue.slice(flag, pos));
                flag = pos;
                pos = this.breakIterator.next();
            }
            this.areaTextResult = tem;
        });
        Button.pop();
        Column.pop();
    }
}
loadDocument(new TextProcessing("1", undefined, {}));
