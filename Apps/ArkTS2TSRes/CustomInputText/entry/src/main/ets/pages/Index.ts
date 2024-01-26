interface Index_Params {
    inputTypeArray?: Array<SelectOption>;
    enterKeyArray?: Array<SelectOption>;
    inputController?: inputMethod.InputMethodController;
    cursorInfo?: inputMethod.CursorInfo;
    selectStart?: number;
    selectEnd?: number;
    isAttached?: boolean;
    isOn?: boolean;
    isShow?: boolean;
    isChangeSelection?: boolean;
    inputTypeIndex?: number;
    enterKeyIndex?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
import inputMethod from '@ohos.inputMethod';
import promptAction from '@ohos.promptAction';
import { CustomInputText } from '../components/CustomInputText';
import { inputAttribute } from '../utils/InputAttributeInit';
import { logger } from '../utils/Logger';
import { BusinessError } from '@ohos.base';
const TOAST_BOTTOM_SHOW: number = 700;
const TOAST_BOTTOM_HIDE: number = 100;
function __Button__buttonStyle(): void {
    Button.type(ButtonType.Capsule);
    Button.backgroundColor($r('app.color.button_color'));
    Button.fontColor(Color.White);
    Button.fontSize(16);
    Button.height(40);
    Button.fontWeight(500);
    Button.width('100%');
}
function __Select__selectStyle(): void {
    Select.fontColor($r('app.color.text_color'));
    Select.font({ size: 16, weight: 500 });
}
function __Text__textStyle(): void {
    Text.fontColor($r('app.color.text_color'));
    Text.fontSize(16);
    Text.fontWeight(500);
}
function __TextInput__inputStyle(): void {
    TextInput.type(InputType.Number);
    TextInput.height(40);
    TextInput.placeholderFont({ size: 14 });
    TextInput.margin({ top: 8, bottom: 8 });
    TextInput.maxLength(4);
    TextInput.layoutWeight(1);
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.inputTypeArray = [];
        this.enterKeyArray = [];
        this.inputController = inputMethod.getController();
        this.cursorInfo = { top: 0, left: 0, width: 0, height: 0 };
        this.__selectStart = new ObservedPropertySimple(0, this, "selectStart");
        this.addProvidedVar("selectStart", this.__selectStart, false);
        this.__selectEnd = new ObservedPropertySimple(0, this, "selectEnd");
        this.addProvidedVar("selectEnd", this.__selectEnd, false);
        this.__isAttached = new ObservedPropertySimple(false, this, "isAttached");
        this.addProvidedVar("isAttached", this.__isAttached, false);
        this.__isOn = new ObservedPropertySimple(false, this, "isOn");
        this.addProvidedVar("isOn", this.__isOn, false);
        this.__isShow = new ObservedPropertySimple(false, this, "isShow");
        this.addProvidedVar("isShow", this.__isShow, false);
        this.__isChangeSelection = new ObservedPropertySimple(false, this, "isChangeSelection");
        this.addProvidedVar("isChangeSelection", this.__isChangeSelection, false);
        this.__inputTypeIndex = new ObservedPropertySimple(0, this, "inputTypeIndex");
        this.addProvidedVar("inputTypeIndex", this.__inputTypeIndex, false);
        this.__enterKeyIndex = new ObservedPropertySimple(0, this, "enterKeyIndex");
        this.addProvidedVar("enterKeyIndex", this.__enterKeyIndex, false);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.inputTypeArray !== undefined) {
            this.inputTypeArray = params.inputTypeArray;
        }
        if (params.enterKeyArray !== undefined) {
            this.enterKeyArray = params.enterKeyArray;
        }
        if (params.inputController !== undefined) {
            this.inputController = params.inputController;
        }
        if (params.cursorInfo !== undefined) {
            this.cursorInfo = params.cursorInfo;
        }
        if (params.selectStart !== undefined) {
            this.selectStart = params.selectStart;
        }
        if (params.selectEnd !== undefined) {
            this.selectEnd = params.selectEnd;
        }
        if (params.isAttached !== undefined) {
            this.isAttached = params.isAttached;
        }
        if (params.isOn !== undefined) {
            this.isOn = params.isOn;
        }
        if (params.isShow !== undefined) {
            this.isShow = params.isShow;
        }
        if (params.isChangeSelection !== undefined) {
            this.isChangeSelection = params.isChangeSelection;
        }
        if (params.inputTypeIndex !== undefined) {
            this.inputTypeIndex = params.inputTypeIndex;
        }
        if (params.enterKeyIndex !== undefined) {
            this.enterKeyIndex = params.enterKeyIndex;
        }
    }
    aboutToBeDeleted() {
        this.__selectStart.aboutToBeDeleted();
        this.__selectEnd.aboutToBeDeleted();
        this.__isAttached.aboutToBeDeleted();
        this.__isOn.aboutToBeDeleted();
        this.__isShow.aboutToBeDeleted();
        this.__isChangeSelection.aboutToBeDeleted();
        this.__inputTypeIndex.aboutToBeDeleted();
        this.__enterKeyIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private inputTypeArray: Array<SelectOption>;
    private enterKeyArray: Array<SelectOption>;
    private inputController: inputMethod.InputMethodController;
    private cursorInfo: inputMethod.CursorInfo;
    private __selectStart: ObservedPropertySimple<number>;
    get selectStart() {
        return this.__selectStart.get();
    }
    set selectStart(newValue: number) {
        this.__selectStart.set(newValue);
    }
    private __selectEnd: ObservedPropertySimple<number>;
    get selectEnd() {
        return this.__selectEnd.get();
    }
    set selectEnd(newValue: number) {
        this.__selectEnd.set(newValue);
    }
    private __isAttached: ObservedPropertySimple<boolean>;
    get isAttached() {
        return this.__isAttached.get();
    }
    set isAttached(newValue: boolean) {
        this.__isAttached.set(newValue);
    }
    private __isOn: ObservedPropertySimple<boolean>;
    get isOn() {
        return this.__isOn.get();
    }
    set isOn(newValue: boolean) {
        this.__isOn.set(newValue);
    }
    private __isShow: ObservedPropertySimple<boolean>;
    get isShow() {
        return this.__isShow.get();
    }
    set isShow(newValue: boolean) {
        this.__isShow.set(newValue);
    }
    private __isChangeSelection: ObservedPropertySimple<boolean>;
    get isChangeSelection() {
        return this.__isChangeSelection.get();
    }
    set isChangeSelection(newValue: boolean) {
        this.__isChangeSelection.set(newValue);
    }
    private __inputTypeIndex: ObservedPropertySimple<number>;
    get inputTypeIndex() {
        return this.__inputTypeIndex.get();
    }
    set inputTypeIndex(newValue: number) {
        this.__inputTypeIndex.set(newValue);
    }
    private __enterKeyIndex: ObservedPropertySimple<number>;
    get enterKeyIndex() {
        return this.__enterKeyIndex.get();
    }
    set enterKeyIndex(newValue: number) {
        this.__enterKeyIndex.set(newValue);
    }
    render() {
        Scroll.create();
        Scroll.padding(12);
        Scroll.height('100%');
        Scroll.width('100%');
        Scroll.align(Alignment.Top);
        Scroll.backgroundColor($r('app.color.background'));
        Column.create({ space: 12 });
        Column.width('100%');
        let earlierCreatedChild_2: CustomInputText = (this && this.findChildById) ? this.findChildById("2") as CustomInputText : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new CustomInputText("2", this, { inputController: this.inputController }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                inputController: this.inputController
            });
            View.create(earlierCreatedChild_2);
        }
        this.OperateView(this);
        this.UpdateView(this);
        this.AttributeView(this);
        Column.pop();
        Scroll.pop();
    }
    OperateView(parent = null) {
        GridRow.create({
            columns: { sm: 2, md: 3, lg: 3 }, gutter: 12
        });
        GridRow.padding(12);
        GridRow.width('100%');
        GridRow.backgroundColor(Color.White);
        GridRow.borderRadius(23);
        GridCol.create({ span: 1 });
        Button.createWithLabel(this.isAttached ? $r('app.string.detach') : $r('app.string.attach'));
        __Button__buttonStyle();
        Button.id('btnAttach');
        Button.onClick(() => {
            this.isAttached = !this.isAttached;
        });
        Button.pop();
        GridCol.pop();
        GridCol.create({ span: 1 });
        Button.createWithLabel(this.isShow ? $r('app.string.hide') : $r('app.string.show'));
        __Button__buttonStyle();
        Button.id('btnShow');
        Button.onClick(() => {
            if (!this.isAttached) {
                if (this.isShow) {
                    promptAction.showToast({ message: $r('app.string.noattach_tips'), bottom: TOAST_BOTTOM_SHOW });
                }
                else {
                    promptAction.showToast({ message: $r('app.string.noattach_tips'), bottom: TOAST_BOTTOM_HIDE });
                }
                return;
            }
            this.isShow = !this.isShow;
        });
        Button.pop();
        GridCol.pop();
        GridCol.create({ span: { sm: 2, md: 1, lg: 1 } });
        Button.createWithLabel(this.isOn ? $r('app.string.off') : $r('app.string.on'));
        __Button__buttonStyle();
        Button.id('btnOn');
        Button.onClick(() => {
            if (!this.isAttached) {
                if (this.isShow) {
                    promptAction.showToast({ message: $r('app.string.noattach_tips'), bottom: TOAST_BOTTOM_SHOW });
                }
                else {
                    promptAction.showToast({ message: $r('app.string.noattach_tips'), bottom: TOAST_BOTTOM_HIDE });
                }
                return;
            }
            this.isOn = !this.isOn;
        });
        Button.pop();
        GridCol.pop();
        GridRow.pop();
    }
    UpdateView(parent = null) {
        Column.create({ space: 12 });
        Column.padding(12);
        Column.width('100%');
        Column.backgroundColor(Color.White);
        Column.borderRadius(23);
        Row.create({ space: 8 });
        Row.width('100%');
        TextInput.create({ placeholder: 'left' });
        __TextInput__inputStyle();
        TextInput.id('cursorLeft');
        TextInput.enableKeyboardOnFocus(false);
        TextInput.onChange((value: string) => {
            this.cursorInfo.left = Number(value).valueOf();
        });
        TextInput.create({ placeholder: 'top' });
        __TextInput__inputStyle();
        TextInput.id('cursorTop');
        TextInput.enableKeyboardOnFocus(false);
        TextInput.onChange((value: string) => {
            this.cursorInfo.top = Number(value).valueOf();
        });
        TextInput.create({ placeholder: 'width' });
        __TextInput__inputStyle();
        TextInput.id('cursorWidth');
        TextInput.enableKeyboardOnFocus(false);
        TextInput.onChange((value: string) => {
            this.cursorInfo.width = Number(value).valueOf();
        });
        TextInput.create({ placeholder: 'height' });
        __TextInput__inputStyle();
        TextInput.id('cursorHeight');
        TextInput.enableKeyboardOnFocus(false);
        TextInput.onChange((value: string) => {
            this.cursorInfo.height = Number(value).valueOf();
        });
        Row.pop();
        Button.createWithLabel($r('app.string.update_cursor'));
        __Button__buttonStyle();
        Button.id('btnUpdateCursor');
        Button.onClick(() => {
            this.inputController.updateCursor(this.cursorInfo, (err: BusinessError) => {
                if (err) {
                    logger.info(`Index ${err}`);
                    return;
                }
                else {
                    if (this.isShow) {
                        promptAction.showToast({ message: $r('app.string.update_cursor_tips'), bottom: TOAST_BOTTOM_SHOW });
                    }
                    else {
                        promptAction.showToast({ message: $r('app.string.update_cursor_tips'), bottom: TOAST_BOTTOM_HIDE });
                    }
                }
            });
        });
        Button.pop();
        Row.create({ space: 8 });
        Row.width('100%');
        TextInput.create({ placeholder: 'start' });
        __TextInput__inputStyle();
        TextInput.id('selectStart');
        TextInput.enableKeyboardOnFocus(false);
        TextInput.onChange((value: string) => {
            this.selectStart = Number(value).valueOf();
        });
        TextInput.create({ placeholder: 'end' });
        __TextInput__inputStyle();
        TextInput.id('selectEnd');
        TextInput.enableKeyboardOnFocus(false);
        TextInput.onChange((value: string) => {
            this.selectEnd = Number(value).valueOf();
        });
        Row.pop();
        Button.createWithLabel($r('app.string.change_selection'));
        __Button__buttonStyle();
        Button.id('btnChangeSelection');
        Button.onClick(() => {
            this.isChangeSelection = true;
        });
        Button.pop();
        Column.pop();
    }
    AttributeView(parent = null) {
        Column.create({ space: 12 });
        Column.padding(12);
        Column.width('100%');
        Column.backgroundColor(Color.White);
        Column.borderRadius(23);
        Row.create();
        Row.create();
        Row.layoutWeight(1);
        Row.justifyContent(FlexAlign.Center);
        Text.create($r('app.string.text_input_type'));
        __Text__textStyle();
        Text.pop();
        Select.create(this.inputTypeArray);
        Select.value(inputAttribute.getInputTypeValue(this.inputTypeIndex));
        __Select__selectStyle();
        Select.id('inputTypeSelect');
        Select.onSelect((index: number) => {
            this.inputTypeIndex = index;
            focusControl.requestFocus('inputTypeSelect');
        });
        Select.pop();
        Row.pop();
        Row.create();
        Row.layoutWeight(1);
        Row.justifyContent(FlexAlign.Center);
        Text.create($r('app.string.enter_key_type'));
        __Text__textStyle();
        Text.pop();
        Select.create(this.enterKeyArray);
        Select.value(inputAttribute.getEnterTypeValue(this.enterKeyIndex));
        __Select__selectStyle();
        Select.id('enterKeySelect');
        Select.onSelect((index: number) => {
            this.enterKeyIndex = index;
            focusControl.requestFocus('enterKeySelect');
        });
        Select.pop();
        Row.pop();
        Row.pop();
        Button.createWithLabel($r('app.string.update_attribute'));
        __Button__buttonStyle();
        Button.id('btnUpdateAttribute');
        Button.onClick(() => {
            this.inputController.updateAttribute({
                textInputType: inputAttribute.getInputType(this.inputTypeIndex),
                enterKeyType: inputAttribute.getEnterType(this.enterKeyIndex)
            });
            if (this.isShow) {
                promptAction.showToast({ message: $r('app.string.update_attribute'), bottom: TOAST_BOTTOM_SHOW });
            }
            else {
                promptAction.showToast({ message: $r('app.string.update_attribute'), bottom: TOAST_BOTTOM_HIDE });
            }
        });
        Button.pop();
        Column.pop();
    }
    aboutToDisappear() {
        logger.info('Index', 'aboutToDisappear');
        this.inputController.stopInputSession();
    }
    aboutToAppear() {
        logger.info('Index', 'aboutToAppear');
        inputAttribute.getInputTypeSource().forEach((item: Resource) => {
            this.inputTypeArray.push({ value: item });
        });
        inputAttribute.getEnterTypeSource().forEach((item: Resource) => {
            this.enterKeyArray.push({ value: item });
        });
    }
}
loadDocument(new Index("1", undefined, {}));
