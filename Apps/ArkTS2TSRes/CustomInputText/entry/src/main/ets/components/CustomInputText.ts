interface CustomInputText_Params {
    inputText?: string;
    lastInput?: string;
    selectInput?: string;
    cursorInfo?: inputMethod.CursorInfo;
    cursorLeft?: number;
    cursorIndex?: number;
    selectIndex?: number;
    inputWidth?: number;
    isAttached?: boolean;
    isOn?: boolean;
    isShow?: boolean;
    isChangeSelection?: boolean;
    enterKeyIndex?: number;
    inputTypeIndex?: number;
    selectStart?: number;
    selectEnd?: number;
    inputController?: inputMethod.InputMethodController;
    settings?: RenderingContextSettings;
    context?: CanvasRenderingContext2D;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CustomInputText_" + ++__generate__Id;
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
import { logger } from '../utils/Logger';
import { inputAttribute } from '../utils/InputAttributeInit';
const LINE_HEIGHT: number = 20;
const END_FLAG: number = 1000;
const TAG: string = 'CustomInputText';
export class CustomInputText extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__inputText = new ObservedPropertySimple('', this, "inputText");
        this.__lastInput = new ObservedPropertySimple('', this, "lastInput");
        this.__selectInput = new ObservedPropertySimple('', this, "selectInput");
        this.__cursorInfo = new ObservedPropertyObject({ top: 0, left: 0, width: 1, height: 25 }, this, "cursorInfo");
        this.__cursorLeft = new ObservedPropertySimple(0, this, "cursorLeft");
        this.__cursorIndex = new ObservedPropertySimple(0, this, "cursorIndex");
        this.__selectIndex = new ObservedPropertySimple(0, this, "selectIndex");
        this.__inputWidth = new ObservedPropertySimple(320, this, "inputWidth");
        this.__isAttached = this.initializeConsume("isAttached", "isAttached");
        this.__isOn = this.initializeConsume("isOn", "isOn");
        this.__isShow = this.initializeConsume("isShow", "isShow");
        this.__isChangeSelection = this.initializeConsume("isChangeSelection", "isChangeSelection");
        this.__enterKeyIndex = this.initializeConsume("enterKeyIndex", "enterKeyIndex");
        this.__inputTypeIndex = this.initializeConsume("inputTypeIndex", "inputTypeIndex");
        this.__selectStart = this.initializeConsume("selectStart", "selectStart");
        this.__selectEnd = this.initializeConsume("selectEnd", "selectEnd");
        this.inputController = inputMethod.getController();
        this.settings = new RenderingContextSettings(true);
        this.context = new CanvasRenderingContext2D(this.settings);
        this.updateWithValueParams(params);
        this.declareWatch("isAttached", this.isAttachedChange);
        this.declareWatch("isOn", this.isOnChange);
        this.declareWatch("isShow", this.isShowChange);
        this.declareWatch("isChangeSelection", this.changeSelection);
    }
    updateWithValueParams(params: CustomInputText_Params) {
        if (params.inputText !== undefined) {
            this.inputText = params.inputText;
        }
        if (params.lastInput !== undefined) {
            this.lastInput = params.lastInput;
        }
        if (params.selectInput !== undefined) {
            this.selectInput = params.selectInput;
        }
        if (params.cursorInfo !== undefined) {
            this.cursorInfo = params.cursorInfo;
        }
        if (params.cursorLeft !== undefined) {
            this.cursorLeft = params.cursorLeft;
        }
        if (params.cursorIndex !== undefined) {
            this.cursorIndex = params.cursorIndex;
        }
        if (params.selectIndex !== undefined) {
            this.selectIndex = params.selectIndex;
        }
        if (params.inputWidth !== undefined) {
            this.inputWidth = params.inputWidth;
        }
        if (params.inputController !== undefined) {
            this.inputController = params.inputController;
        }
        if (params.settings !== undefined) {
            this.settings = params.settings;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
    }
    aboutToBeDeleted() {
        this.__inputText.aboutToBeDeleted();
        this.__lastInput.aboutToBeDeleted();
        this.__selectInput.aboutToBeDeleted();
        this.__cursorInfo.aboutToBeDeleted();
        this.__cursorLeft.aboutToBeDeleted();
        this.__cursorIndex.aboutToBeDeleted();
        this.__selectIndex.aboutToBeDeleted();
        this.__inputWidth.aboutToBeDeleted();
        this.__isAttached.aboutToBeDeleted();
        this.__isOn.aboutToBeDeleted();
        this.__isShow.aboutToBeDeleted();
        this.__isChangeSelection.aboutToBeDeleted();
        this.__enterKeyIndex.aboutToBeDeleted();
        this.__inputTypeIndex.aboutToBeDeleted();
        this.__selectStart.aboutToBeDeleted();
        this.__selectEnd.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __inputText: ObservedPropertySimple<string>;
    get inputText() {
        return this.__inputText.get();
    }
    set inputText(newValue: string) {
        this.__inputText.set(newValue);
    }
    private __lastInput: ObservedPropertySimple<string>;
    get lastInput() {
        return this.__lastInput.get();
    }
    set lastInput(newValue: string) {
        this.__lastInput.set(newValue);
    }
    private __selectInput: ObservedPropertySimple<string>;
    get selectInput() {
        return this.__selectInput.get();
    }
    set selectInput(newValue: string) {
        this.__selectInput.set(newValue);
    }
    private __cursorInfo: ObservedPropertyObject<inputMethod.CursorInfo>;
    get cursorInfo() {
        return this.__cursorInfo.get();
    }
    set cursorInfo(newValue: inputMethod.CursorInfo) {
        this.__cursorInfo.set(newValue);
    }
    private __cursorLeft: ObservedPropertySimple<number>;
    get cursorLeft() {
        return this.__cursorLeft.get();
    }
    set cursorLeft(newValue: number) {
        this.__cursorLeft.set(newValue);
    }
    private __cursorIndex: ObservedPropertySimple<number>;
    get cursorIndex() {
        return this.__cursorIndex.get();
    }
    set cursorIndex(newValue: number) {
        this.__cursorIndex.set(newValue);
    }
    private __selectIndex: ObservedPropertySimple<number>;
    get selectIndex() {
        return this.__selectIndex.get();
    }
    set selectIndex(newValue: number) {
        this.__selectIndex.set(newValue);
    }
    private __inputWidth: ObservedPropertySimple<number>;
    get inputWidth() {
        return this.__inputWidth.get();
    }
    set inputWidth(newValue: number) {
        this.__inputWidth.set(newValue);
    }
    private __isAttached: SynchedPropertySimpleTwoWay<boolean>;
    get isAttached() {
        return this.__isAttached.get();
    }
    set isAttached(newValue: boolean) {
        this.__isAttached.set(newValue);
    }
    private __isOn: SynchedPropertySimpleTwoWay<boolean>;
    get isOn() {
        return this.__isOn.get();
    }
    set isOn(newValue: boolean) {
        this.__isOn.set(newValue);
    }
    private __isShow: SynchedPropertySimpleTwoWay<boolean>;
    get isShow() {
        return this.__isShow.get();
    }
    set isShow(newValue: boolean) {
        this.__isShow.set(newValue);
    }
    private __isChangeSelection: SynchedPropertySimpleTwoWay<boolean>;
    get isChangeSelection() {
        return this.__isChangeSelection.get();
    }
    set isChangeSelection(newValue: boolean) {
        this.__isChangeSelection.set(newValue);
    }
    private __enterKeyIndex: SynchedPropertySimpleTwoWay<number>;
    get enterKeyIndex() {
        return this.__enterKeyIndex.get();
    }
    set enterKeyIndex(newValue: number) {
        this.__enterKeyIndex.set(newValue);
    }
    private __inputTypeIndex: SynchedPropertySimpleTwoWay<number>;
    get inputTypeIndex() {
        return this.__inputTypeIndex.get();
    }
    set inputTypeIndex(newValue: number) {
        this.__inputTypeIndex.set(newValue);
    }
    private __selectStart: SynchedPropertySimpleTwoWay<number>;
    get selectStart() {
        return this.__selectStart.get();
    }
    set selectStart(newValue: number) {
        this.__selectStart.set(newValue);
    }
    private __selectEnd: SynchedPropertySimpleTwoWay<number>;
    get selectEnd() {
        return this.__selectEnd.get();
    }
    set selectEnd(newValue: number) {
        this.__selectEnd.set(newValue);
    }
    private inputController: inputMethod.InputMethodController;
    private settings: RenderingContextSettings;
    private context: CanvasRenderingContext2D;
    render() {
        Stack.create();
        Stack.id('customInputText');
        Stack.width('100%');
        Stack.borderRadius(20);
        Stack.backgroundColor($r('app.color.input_text_background'));
        Stack.padding({ left: 10, right: 10, top: 5, bottom: 5 });
        Stack.height(45);
        Stack.onClick((event?: ClickEvent) => {
            if (event) {
                logger.info(TAG, `click event= ${JSON.stringify(event)}`);
                this.initTextInput(event);
            }
        });
        Row.create();
        Row.width(this.inputWidth);
        Text.create(this.inputText);
        Text.fontSize(16);
        Text.fontFamily('sans-serif');
        Text.id('inputText');
        Text.lineHeight(LINE_HEIGHT);
        Text.maxLines(1);
        Text.constraintSize({ maxWidth: this.inputWidth });
        Text.pop();
        Text.create(this.selectInput);
        Text.fontSize(16);
        Text.fontFamily('sans-serif');
        Text.lineHeight(LINE_HEIGHT);
        Text.id('selectInput');
        Text.maxLines(1);
        Text.backgroundColor($r('app.color.select_color'));
        Text.pop();
        Text.create(this.lastInput);
        Text.fontSize(16);
        Text.fontFamily('sans-serif');
        Text.lineHeight(LINE_HEIGHT);
        Text.id('lastInput');
        Text.maxLines(1);
        Text.pop();
        Row.pop();
        Text.create('');
        Text.width(this.cursorInfo.width);
        Text.height(this.cursorInfo.height);
        Text.backgroundColor($r('app.color.cursor_color'));
        Text.margin({ top: 5 });
        Text.position({ x: this.cursorLeft, y: 0 });
        Text.onAreaChange((oldArea: Area, newArea: Area) => {
            if (newArea.globalPosition.x as number !== this.cursorInfo.left) {
                this.cursorInfo.left = newArea.globalPosition.x as number;
                this.cursorInfo.top = newArea.position.y as number;
                this.cursorInfo.width = newArea.width as number;
                this.cursorInfo.height = newArea.height as number;
                logger.info(TAG, `cursor change: this.cursorInfo=${JSON.stringify(ObservedObject.GetRawObject(this.cursorInfo))}`);
                this.inputController.updateCursor(ObservedObject.GetRawObject(this.cursorInfo));
            }
        });
        Text.pop();
        Canvas.create(this.context);
        Canvas.width('100%');
        Canvas.height(45);
        Canvas.onReady(() => {
            let px = vp2px(16);
            this.context.font = px + 'px sans-serif';
            this.inputWidth = this.context.width;
        });
        Canvas.pop();
        Stack.pop();
    }
    async initTextInput(event: ClickEvent): Promise<void> {
        focusControl.requestFocus('customInputText');
        this.inputController.updateAttribute({
            textInputType: inputAttribute.getInputType(this.inputTypeIndex),
            enterKeyType: inputAttribute.getEnterType(this.enterKeyIndex)
        });
        await this.inputController.attach(false, {
            inputAttribute: {
                textInputType: inputAttribute.getInputType(this.inputTypeIndex),
                enterKeyType: inputAttribute.getEnterType(this.enterKeyIndex)
            }
        });
        this.inputController.showTextInput();
        this.isAttached = true;
        this.isShow = true;
        this.isOn = true;
        this.calculateCursor(event.x);
    }
    async isAttachedChange(): Promise<void> {
        if (this.isAttached) {
            focusControl.requestFocus('customInputText');
            await this.inputController.attach(false, {
                inputAttribute: {
                    textInputType: inputAttribute.getInputType(this.inputTypeIndex),
                    enterKeyType: inputAttribute.getEnterType(this.enterKeyIndex)
                }
            });
        }
        else {
            this.detach();
        }
    }
    isShowChange(): void {
        if (this.isShow) {
            inputMethod.getController().showTextInput();
        }
        else {
            inputMethod.getController().hideTextInput();
        }
    }
    isOnChange(): void {
        if (this.isOn) {
            this.initListener();
        }
        else {
            this.off();
        }
    }
    changeSelection(): void {
        if (this.isChangeSelection) {
            let message = this.inputText + this.selectInput + this.lastInput;
            if (this.selectStart <= this.selectEnd) {
                this.selectIndex = this.selectStart;
                this.cursorIndex = this.selectEnd;
            }
            if (this.selectStart > this.selectEnd) {
                this.selectIndex = this.selectEnd;
                this.cursorIndex = this.selectStart;
            }
            if (this.cursorIndex > message.length) {
                this.cursorIndex = message.length;
            }
            this.inputText = message.substring(0, this.selectIndex);
            this.selectInput = message.substring(this.selectIndex, this.cursorIndex);
            this.lastInput = message.substring(this.cursorIndex, message.length);
            let cursorText = this.inputText + this.selectInput;
            this.cursorLeft = this.context.measureText(cursorText).width;
            this.isChangeSelection = false;
        }
    }
    async detach(): Promise<void> {
        logger.info(TAG, `detach`);
        await this.off();
        this.isOn = false;
        this.isShow = false;
        this.inputController.detach();
    }
    async off(): Promise<void> {
        logger.info(TAG, `off`);
        this.inputController.off('insertText');
        this.inputController.off('deleteLeft');
        this.inputController.off('deleteRight');
        this.inputController.off('moveCursor');
        this.inputController.off('selectByMovement');
        this.inputController.off('selectByRange');
        this.inputController.off('sendFunctionKey');
        this.inputController.off('handleExtendAction');
        this.inputController.off('sendKeyboardStatus');
    }
    initListener(): void {
        this.inputController.on('insertText', (text: string) => {
            logger.info(TAG, `insertText, text: ${text}`);
            if ((this.cursorLeft + this.context.measureText(text).width + this.context.measureText(this.lastInput)
                .width) > this.context.width) {
                return;
            }
            this.inputText += text;
            this.cursorIndex = this.inputText.length;
            this.selectIndex = this.cursorIndex;
            this.selectInput = '';
            this.cursorLeft = this.context.measureText(this.inputText).width;
        });
        this.inputController.on('deleteRight', (length: number) => {
            let message = this.inputText + this.selectInput + this.lastInput;
            if (this.cursorIndex < message.length) {
                this.selectIndex = this.cursorIndex;
                this.selectInput = '';
                let deleteIndex = this.cursorIndex + length;
                if (deleteIndex > message.length) {
                    deleteIndex = message.length;
                }
                this.lastInput = message.substring(this.cursorIndex + length, message.length);
            }
        });
        this.inputController.on('deleteLeft', (length: number) => {
            this.inputText = this.inputText.substring(0, this.inputText.length - length);
            this.cursorIndex = this.inputText.length;
            this.selectIndex = this.cursorIndex;
            this.cursorLeft = this.context.measureText(this.inputText).width;
        });
        this.inputController.on('moveCursor', (direction: inputMethod.Direction) => {
            logger.info(TAG, `Succeeded in moveCursor, direction: ${direction}`);
            let message = this.inputText + this.selectInput + this.lastInput;
            this.selectInput = '';
            if (direction === inputMethod.Direction.CURSOR_UP) {
                this.cursorIndex = 0;
            }
            if (direction === inputMethod.Direction.CURSOR_DOWN) {
                this.cursorIndex = message.length;
            }
            if (direction === inputMethod.Direction.CURSOR_LEFT) {
                this.cursorIndex--;
            }
            if (direction === inputMethod.Direction.CURSOR_RIGHT) {
                if (this.cursorIndex < message.length) {
                    this.cursorIndex++;
                }
            }
            this.selectIndex = this.cursorIndex;
            this.inputText = message.substring(0, this.cursorIndex);
            this.lastInput = message.substring(this.cursorIndex, message.length);
            this.cursorLeft = this.context.measureText(this.inputText).width;
        });
        this.inputController.on('selectByMovement', (movement: inputMethod.Movement) => {
            logger.info(TAG, `Succeeded in selectByMovement, direction: ${movement.direction}`);
            let message = this.inputText + this.selectInput + this.lastInput;
            if (movement.direction === inputMethod.Direction.CURSOR_UP) {
                this.selectIndex = 0;
            }
            if (movement.direction === inputMethod.Direction.CURSOR_LEFT) {
                if (this.selectIndex > 0) {
                    this.selectIndex--;
                }
            }
            if (movement.direction === inputMethod.Direction.CURSOR_RIGHT) {
                if (this.selectIndex < message.length) {
                    this.selectIndex++;
                }
            }
            if (movement.direction === inputMethod.Direction.CURSOR_DOWN) {
                this.selectIndex = message.length;
            }
            if (this.selectIndex > this.cursorIndex) {
                this.inputText = message.substring(0, this.cursorIndex);
                this.selectInput = message.substring(this.cursorIndex, this.selectIndex);
                this.lastInput = message.substring(this.selectIndex, message.length);
            }
            else {
                this.inputText = message.substring(0, this.selectIndex);
                this.selectInput = message.substring(this.selectIndex, this.cursorIndex);
                this.lastInput = message.substring(this.cursorIndex, message.length);
            }
        });
        this.inputController.on('selectByRange', (range: inputMethod.Range) => {
            logger.info(TAG, `selectByRange this.range: ${JSON.stringify(range)}`);
            let message = this.inputText + this.selectInput + this.lastInput;
            if (range.start === 0 && range.end === 0) {
                this.cursorIndex = 0;
                let message = this.inputText + this.selectInput + this.lastInput;
                this.selectInput = '';
                this.selectIndex = this.cursorIndex;
                this.inputText = message.substring(0, this.cursorIndex);
                this.lastInput = message.substring(this.cursorIndex, message.length);
                this.cursorLeft = this.context.measureText(this.inputText).width;
            }
            else if (range.end > range.start) {
                if (range.end === END_FLAG) {
                    this.lastInput = '';
                    this.selectIndex = message.length;
                    this.inputText = message.substring(0, this.cursorIndex);
                    this.selectInput = message.substring(this.cursorIndex, this.selectIndex);
                }
                else {
                    this.selectIndex = 0;
                    this.inputText = '';
                    this.selectInput = message.substring(0, this.cursorIndex);
                    this.lastInput = message.substring(this.cursorIndex, message.length);
                }
            }
            else {
                this.cursorIndex = message.length;
                this.selectIndex = this.cursorIndex;
                this.inputText = message.substring(0, this.cursorIndex);
                this.lastInput = message.substring(this.cursorIndex, message.length);
                this.cursorLeft = this.context.measureText(this.inputText).width;
            }
            logger.info(TAG, `selectByRange this.selectInput: ${this.selectInput}`);
        });
        this.inputController.on('sendFunctionKey', (enterKey: inputMethod.FunctionKey) => {
            promptAction.showToast({ message: `enterKey Clicked ${enterKey.enterKeyType.toString()}`, bottom: 500 });
        });
        this.inputController.on('sendKeyboardStatus', (keyBoardStatus: inputMethod.KeyboardStatus) => {
            logger.info(TAG, `sendKeyboardStatus keyBoardStatus: ${keyBoardStatus}`);
        });
        this.inputController.on('handleExtendAction', (action: inputMethod.ExtendAction) => {
            if (action === inputMethod.ExtendAction.SELECT_ALL) {
                let message = this.inputText + this.selectInput + this.lastInput;
                this.cursorIndex = message.length;
                this.selectIndex = 0;
                this.inputText = '';
                this.selectInput = message.substring(0, this.cursorIndex);
                this.lastInput = '';
                this.cursorLeft = this.context.measureText(this.selectInput).width;
            }
        });
    }
    calculateCursor(x: number): void {
        let message = this.inputText + this.selectInput + this.lastInput;
        let charWidth = this.context.measureText(message).width / message.length;
        this.cursorIndex = Math.floor(x / charWidth);
        if (this.cursorIndex < 0) {
            this.cursorIndex = 0;
            this.inputText = '';
            this.lastInput = message;
        }
        else if (this.cursorIndex > message.length) {
            this.cursorIndex = message.length;
            this.inputText = message;
            this.lastInput = '';
        }
        else {
            this.inputText = message.substring(0, this.cursorIndex);
            this.lastInput = message.substring(this.cursorIndex, message.length);
        }
        this.selectIndex = this.cursorIndex;
        this.selectInput = '';
        this.cursorLeft = this.context.measureText(message.substring(0, this.cursorIndex)).width;
    }
}
