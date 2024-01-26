interface BottomListDialog_Params {
    mOpenAnimator?: AnimatorResult;
    openDialog?: boolean;
    mDialogBackgroundColor?: number | string;
    mDialogMaskColor?: number | string;
    mDialogTitleHeight?: number;
    mDialogHeight?: number;
    mDialogItemHeight?: number;
    mDialogItemTextSize?: number;
    mDialogItemTextColor?: number | string;
    mDialogItemDividerBackgroundColor?: number | string;
    mDialogItemDividerStrokeWidth?: number;
    mDialogCancelDividerBackgroundColor?: number | string;
    mDialogCancelDividerStrokeWidth?: number;
    mListData?: Array<string>;
    dialogTitle?: string;
    dialogTitleSize?: number;
    dialogTitleColor?: number | string;
    dialogCancel?: string;
    dialogCancelSize?: number;
    dialogCancelColor?: number | string;
    mDialogSelectIcon?: Resource | null;
    isShowSelect?: boolean;
    mDialogItemSelectIndex?: number;
    mDialogItemSelectTextColor?: number | string;
    cancel?: () => void;
    onItemClick?: (data: string, index: number) => void;
    dialogController?: CustomDialogController;
}
interface BottomListDialogComponent_Params {
    mDialogComponentHeight?: number;
    mDialogComponentMastColor?: number | string;
    mDialogComponentTitleHeight?: number | string;
    mItemListData?: Array<string>;
    mItemHeight?: number;
    mItemTextSize?: number;
    mItemTextColor?: number | string;
    mDialogComponentBackgroundColor?: number | string;
    mItemDividerBackgroundColor?: number | string;
    mItemDividerStrokeWidth?: number;
    mCancelDividerBackgroundColor?: number | string;
    mCancelDividerStrokeWidth?: number;
    mDialogTitleText?: string;
    mDialogTitleSize?: number;
    mDialogTitleColor?: number;
    mDialogCancelText?: string;
    mDialogCancelSize?: number;
    mDialogCancelColor?: number;
    mSelectIcon?: Resource;
    mIsShowSelect?: boolean;
    mSelectIndex?: number;
    mSelectTextColor?: number | string;
    mDialogPrimitiveHeight?: number;
    controller?: CustomDialogController;
    showOrClose?: (currentHeight: number, isOpen: boolean) => void;
    itemOnClick?: (data: string, index: number) => void;
    mStartY?: number;
    mEndY?: number;
    mInitiallyY?: number;
    isTouchEvent?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "BottomListDialog_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import animator, { AnimatorOptions, AnimatorResult } from '@ohos.animator';
class BottomListDialogComponent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__mDialogComponentHeight = new SynchedPropertySimpleTwoWay(params.mDialogComponentHeight, this, "mDialogComponentHeight");
        this.__mDialogComponentMastColor = new SynchedPropertySimpleTwoWay(params.mDialogComponentMastColor, this, "mDialogComponentMastColor");
        this.__mDialogComponentTitleHeight = new SynchedPropertySimpleTwoWay(params.mDialogComponentTitleHeight, this, "mDialogComponentTitleHeight");
        this.__mItemListData = new SynchedPropertyObjectTwoWay(params.mItemListData, this, "mItemListData");
        this.__mItemHeight = new SynchedPropertySimpleTwoWay(params.mItemHeight, this, "mItemHeight");
        this.__mItemTextSize = new SynchedPropertySimpleTwoWay(params.mItemTextSize, this, "mItemTextSize");
        this.__mItemTextColor = new SynchedPropertySimpleTwoWay(params.mItemTextColor, this, "mItemTextColor");
        this.__mDialogComponentBackgroundColor = new SynchedPropertySimpleTwoWay(params.mDialogComponentBackgroundColor, this, "mDialogComponentBackgroundColor");
        this.__mItemDividerBackgroundColor = new SynchedPropertySimpleTwoWay(params.mItemDividerBackgroundColor, this, "mItemDividerBackgroundColor");
        this.__mItemDividerStrokeWidth = new SynchedPropertySimpleTwoWay(params.mItemDividerStrokeWidth, this, "mItemDividerStrokeWidth");
        this.__mCancelDividerBackgroundColor = new SynchedPropertySimpleTwoWay(params.mCancelDividerBackgroundColor, this, "mCancelDividerBackgroundColor");
        this.__mCancelDividerStrokeWidth = new SynchedPropertySimpleTwoWay(params.mCancelDividerStrokeWidth, this, "mCancelDividerStrokeWidth");
        this.__mDialogTitleText = new SynchedPropertySimpleTwoWay(params.mDialogTitleText, this, "mDialogTitleText");
        this.__mDialogTitleSize = new SynchedPropertySimpleTwoWay(params.mDialogTitleSize, this, "mDialogTitleSize");
        this.__mDialogTitleColor = new SynchedPropertySimpleTwoWay(params.mDialogTitleColor, this, "mDialogTitleColor");
        this.__mDialogCancelText = new SynchedPropertySimpleTwoWay(params.mDialogCancelText, this, "mDialogCancelText");
        this.__mDialogCancelSize = new SynchedPropertySimpleTwoWay(params.mDialogCancelSize, this, "mDialogCancelSize");
        this.__mDialogCancelColor = new SynchedPropertySimpleTwoWay(params.mDialogCancelColor, this, "mDialogCancelColor");
        this.__mSelectIcon = new SynchedPropertyObjectTwoWay(params.mSelectIcon, this, "mSelectIcon");
        this.__mIsShowSelect = new SynchedPropertySimpleTwoWay(params.mIsShowSelect, this, "mIsShowSelect");
        this.__mSelectIndex = new SynchedPropertySimpleTwoWay(params.mSelectIndex, this, "mSelectIndex");
        this.__mSelectTextColor = new SynchedPropertySimpleTwoWay(params.mSelectTextColor, this, "mSelectTextColor");
        this.mDialogPrimitiveHeight = 0;
        this.controller = undefined;
        this.showOrClose = undefined;
        this.itemOnClick = undefined;
        this.mStartY = 0;
        this.mEndY = 0;
        this.mInitiallyY = 0;
        this.isTouchEvent = false;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: BottomListDialogComponent_Params) {
        if (params.mDialogPrimitiveHeight !== undefined) {
            this.mDialogPrimitiveHeight = params.mDialogPrimitiveHeight;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.showOrClose !== undefined) {
            this.showOrClose = params.showOrClose;
        }
        if (params.itemOnClick !== undefined) {
            this.itemOnClick = params.itemOnClick;
        }
        if (params.mStartY !== undefined) {
            this.mStartY = params.mStartY;
        }
        if (params.mEndY !== undefined) {
            this.mEndY = params.mEndY;
        }
        if (params.mInitiallyY !== undefined) {
            this.mInitiallyY = params.mInitiallyY;
        }
        if (params.isTouchEvent !== undefined) {
            this.isTouchEvent = params.isTouchEvent;
        }
    }
    aboutToBeDeleted() {
        this.__mDialogComponentHeight.aboutToBeDeleted();
        this.__mDialogComponentMastColor.aboutToBeDeleted();
        this.__mDialogComponentTitleHeight.aboutToBeDeleted();
        this.__mItemListData.aboutToBeDeleted();
        this.__mItemHeight.aboutToBeDeleted();
        this.__mItemTextSize.aboutToBeDeleted();
        this.__mItemTextColor.aboutToBeDeleted();
        this.__mDialogComponentBackgroundColor.aboutToBeDeleted();
        this.__mItemDividerBackgroundColor.aboutToBeDeleted();
        this.__mItemDividerStrokeWidth.aboutToBeDeleted();
        this.__mCancelDividerBackgroundColor.aboutToBeDeleted();
        this.__mCancelDividerStrokeWidth.aboutToBeDeleted();
        this.__mDialogTitleText.aboutToBeDeleted();
        this.__mDialogTitleSize.aboutToBeDeleted();
        this.__mDialogTitleColor.aboutToBeDeleted();
        this.__mDialogCancelText.aboutToBeDeleted();
        this.__mDialogCancelSize.aboutToBeDeleted();
        this.__mDialogCancelColor.aboutToBeDeleted();
        this.__mSelectIcon.aboutToBeDeleted();
        this.__mIsShowSelect.aboutToBeDeleted();
        this.__mSelectIndex.aboutToBeDeleted();
        this.__mSelectTextColor.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __mDialogComponentHeight: SynchedPropertySimpleTwoWay<number>;
    get mDialogComponentHeight() {
        return this.__mDialogComponentHeight.get();
    }
    set mDialogComponentHeight(newValue: number) {
        this.__mDialogComponentHeight.set(newValue);
    }
    private __mDialogComponentMastColor: SynchedPropertySimpleTwoWay<number | string>;
    get mDialogComponentMastColor() {
        return this.__mDialogComponentMastColor.get();
    }
    set mDialogComponentMastColor(newValue: number | string) {
        this.__mDialogComponentMastColor.set(newValue);
    }
    private __mDialogComponentTitleHeight: SynchedPropertySimpleTwoWay<number | string>;
    get mDialogComponentTitleHeight() {
        return this.__mDialogComponentTitleHeight.get();
    }
    set mDialogComponentTitleHeight(newValue: number | string) {
        this.__mDialogComponentTitleHeight.set(newValue);
    }
    private __mItemListData: SynchedPropertySimpleOneWay<Array<string>>;
    get mItemListData() {
        return this.__mItemListData.get();
    }
    set mItemListData(newValue: Array<string>) {
        this.__mItemListData.set(newValue);
    }
    private __mItemHeight: SynchedPropertySimpleTwoWay<number>;
    get mItemHeight() {
        return this.__mItemHeight.get();
    }
    set mItemHeight(newValue: number) {
        this.__mItemHeight.set(newValue);
    }
    private __mItemTextSize: SynchedPropertySimpleTwoWay<number>;
    get mItemTextSize() {
        return this.__mItemTextSize.get();
    }
    set mItemTextSize(newValue: number) {
        this.__mItemTextSize.set(newValue);
    }
    private __mItemTextColor: SynchedPropertySimpleTwoWay<number | string>;
    get mItemTextColor() {
        return this.__mItemTextColor.get();
    }
    set mItemTextColor(newValue: number | string) {
        this.__mItemTextColor.set(newValue);
    }
    private __mDialogComponentBackgroundColor: SynchedPropertySimpleTwoWay<number | string>;
    get mDialogComponentBackgroundColor() {
        return this.__mDialogComponentBackgroundColor.get();
    }
    set mDialogComponentBackgroundColor(newValue: number | string) {
        this.__mDialogComponentBackgroundColor.set(newValue);
    }
    private __mItemDividerBackgroundColor: SynchedPropertySimpleTwoWay<number | string>;
    get mItemDividerBackgroundColor() {
        return this.__mItemDividerBackgroundColor.get();
    }
    set mItemDividerBackgroundColor(newValue: number | string) {
        this.__mItemDividerBackgroundColor.set(newValue);
    }
    private __mItemDividerStrokeWidth: SynchedPropertySimpleTwoWay<number>;
    get mItemDividerStrokeWidth() {
        return this.__mItemDividerStrokeWidth.get();
    }
    set mItemDividerStrokeWidth(newValue: number) {
        this.__mItemDividerStrokeWidth.set(newValue);
    }
    private __mCancelDividerBackgroundColor: SynchedPropertySimpleTwoWay<number | string>;
    get mCancelDividerBackgroundColor() {
        return this.__mCancelDividerBackgroundColor.get();
    }
    set mCancelDividerBackgroundColor(newValue: number | string) {
        this.__mCancelDividerBackgroundColor.set(newValue);
    }
    private __mCancelDividerStrokeWidth: SynchedPropertySimpleTwoWay<number>;
    get mCancelDividerStrokeWidth() {
        return this.__mCancelDividerStrokeWidth.get();
    }
    set mCancelDividerStrokeWidth(newValue: number) {
        this.__mCancelDividerStrokeWidth.set(newValue);
    }
    private __mDialogTitleText: SynchedPropertySimpleTwoWay<string>;
    get mDialogTitleText() {
        return this.__mDialogTitleText.get();
    }
    set mDialogTitleText(newValue: string) {
        this.__mDialogTitleText.set(newValue);
    }
    private __mDialogTitleSize: SynchedPropertySimpleTwoWay<number>;
    get mDialogTitleSize() {
        return this.__mDialogTitleSize.get();
    }
    set mDialogTitleSize(newValue: number) {
        this.__mDialogTitleSize.set(newValue);
    }
    private __mDialogTitleColor: SynchedPropertySimpleTwoWay<number>;
    get mDialogTitleColor() {
        return this.__mDialogTitleColor.get();
    }
    set mDialogTitleColor(newValue: number) {
        this.__mDialogTitleColor.set(newValue);
    }
    private __mDialogCancelText: SynchedPropertySimpleTwoWay<string>;
    get mDialogCancelText() {
        return this.__mDialogCancelText.get();
    }
    set mDialogCancelText(newValue: string) {
        this.__mDialogCancelText.set(newValue);
    }
    private __mDialogCancelSize: SynchedPropertySimpleTwoWay<number>;
    get mDialogCancelSize() {
        return this.__mDialogCancelSize.get();
    }
    set mDialogCancelSize(newValue: number) {
        this.__mDialogCancelSize.set(newValue);
    }
    private __mDialogCancelColor: SynchedPropertySimpleTwoWay<number>;
    get mDialogCancelColor() {
        return this.__mDialogCancelColor.get();
    }
    set mDialogCancelColor(newValue: number) {
        this.__mDialogCancelColor.set(newValue);
    }
    private __mSelectIcon: SynchedPropertySimpleOneWay<Resource>;
    get mSelectIcon() {
        return this.__mSelectIcon.get();
    }
    set mSelectIcon(newValue: Resource) {
        this.__mSelectIcon.set(newValue);
    }
    private __mIsShowSelect: SynchedPropertySimpleTwoWay<boolean>;
    get mIsShowSelect() {
        return this.__mIsShowSelect.get();
    }
    set mIsShowSelect(newValue: boolean) {
        this.__mIsShowSelect.set(newValue);
    }
    private __mSelectIndex: SynchedPropertySimpleTwoWay<number>;
    get mSelectIndex() {
        return this.__mSelectIndex.get();
    }
    set mSelectIndex(newValue: number) {
        this.__mSelectIndex.set(newValue);
    }
    private __mSelectTextColor: SynchedPropertySimpleTwoWay<number | string>;
    get mSelectTextColor() {
        return this.__mSelectTextColor.get();
    }
    set mSelectTextColor(newValue: number | string) {
        this.__mSelectTextColor.set(newValue);
    }
    private mDialogPrimitiveHeight: number; // 记录dialog的原始高度
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private showOrClose?: (currentHeight: number, isOpen: boolean) => void;
    private itemOnClick?: (data: string, index: number) => void;
    private mStartY: number;
    private mEndY: number;
    private mInitiallyY: number;
    private isTouchEvent: boolean;
    buildPage(data: string, index: number, parent = null) {
        Text.create(data);
        Text.width('100%');
        Text.fontColor(this.mItemTextColor);
        Text.height(this.mItemHeight);
        Text.fontSize(this.mItemTextSize);
        Text.textAlign(TextAlign.Center);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.maxLines(1);
        Text.onClick(() => {
            if (this.isTouchEvent) {
                return;
            }
            this.isTouchEvent = false;
            if (this.itemOnClick != undefined) {
                this.itemOnClick(data, index);
            }
        });
        Text.pop();
    }
    buildSelectPage(data: string, index: number, parent = null) {
        Row.create();
        Row.width('100%');
        Row.height(this.mItemHeight);
        Row.alignItems(VerticalAlign.Center);
        Row.onClick((event) => {
            if (this.isTouchEvent) {
                return;
            }
            this.isTouchEvent = false;
            if (this.itemOnClick != undefined) {
                this.itemOnClick(data, index);
            }
            this.mSelectIndex = index;
        });
        Text.create(data);
        Text.fontColor(index == this.mSelectIndex ? this.mSelectTextColor : this.mItemTextColor);
        Text.fontSize(this.mItemTextSize);
        Text.layoutWeight(1);
        Text.margin({ left: 20 });
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.maxLines(1);
        Text.pop();
        Image.create(this.mSelectIcon);
        Image.width(20);
        Image.height(20);
        Image.margin({ right: 20 });
        Image.visibility(index == this.mSelectIndex ? Visibility.Visible : Visibility.None);
        Row.pop();
    }
    render() {
        Stack.create();
        Stack.height('100%');
        Stack.width('100%');
        Stack.backgroundColor(this.mDialogComponentMastColor);
        Stack.alignContent(Alignment.Bottom);
        Stack.onClick(() => {
            if (this.isTouchEvent) {
                return;
            }
            this.isTouchEvent = false;
            if (this.showOrClose != undefined) {
                this.showOrClose(this.mDialogComponentHeight, false);
            }
        });
        Column.create();
        Column.width('100%');
        Column.backgroundColor(this.mDialogComponentBackgroundColor);
        Column.borderRadius({ topLeft: 20, topRight: 20 });
        Column.height(this.mDialogComponentHeight);
        Column.onTouch((event?: TouchEvent) => {
            if (event != undefined) {
                if ((event.type === TouchType.Down)) {
                    if (!this.mDialogPrimitiveHeight) {
                        this.mDialogPrimitiveHeight = this.mDialogComponentHeight;
                    }
                    this.mStartY = event.touches[0].y;
                    this.mInitiallyY = this.mStartY;
                }
                else if (event.type === TouchType.Move) {
                    this.mEndY = event.touches[0].y;
                    let isMoveUp = this.mEndY < this.mStartY;
                    let moveSpace = Math.abs(this.mEndY - this.mStartY);
                    if (isMoveUp) {
                        let height = this.mDialogComponentHeight + moveSpace;
                        if (height > this.mDialogPrimitiveHeight) {
                            height = this.mDialogPrimitiveHeight;
                        }
                        this.mDialogComponentHeight = height;
                        this.mStartY = this.mEndY;
                    }
                    else {
                        this.mDialogComponentHeight = this.mDialogComponentHeight - moveSpace;
                        this.mStartY = this.mEndY;
                    }
                }
                else if (event.type === TouchType.Up) {
                    this.mEndY = event.touches[0].y;
                    let moveSpace = Math.abs(this.mEndY - this.mInitiallyY);
                    if (moveSpace < 1) {
                        this.isTouchEvent = false;
                        return;
                    }
                    if (moveSpace > this.mDialogPrimitiveHeight / 2) {
                        if (this.showOrClose != undefined) {
                            this.showOrClose(this.mDialogComponentHeight, false);
                        }
                    }
                    else {
                        if (this.showOrClose != undefined) {
                            this.showOrClose(this.mDialogComponentHeight, true);
                        }
                    }
                    this.isTouchEvent = true;
                }
            }
        });
        Text.create(this.mDialogTitleText);
        Text.width('100%');
        Text.height(this.mDialogComponentTitleHeight);
        Text.fontColor(this.mDialogTitleColor);
        Text.fontSize(this.mDialogTitleSize);
        Text.fontWeight(FontWeight.Bold);
        Text.textAlign(TextAlign.Center);
        Text.visibility(this.mDialogTitleText ? Visibility.Visible : Visibility.None);
        Text.pop();
        ForEach.create("2", this, ObservedObject.GetRawObject(this.mItemListData), (data: string, index: number) => {
            If.create();
            if (this.mIsShowSelect) {
                If.branchId(0);
                this.buildSelectPage(data, index, this);
            }
            else {
                If.branchId(1);
                this.buildPage(data, index, this);
            }
            If.pop();
            If.create();
            if (index != this.mItemListData.length - 1) {
                If.branchId(0);
                Divider.create();
                Divider.color(this.mItemDividerBackgroundColor);
                Divider.strokeWidth(this.mItemDividerStrokeWidth);
            }
            If.pop();
        });
        ForEach.pop();
        Divider.create();
        Divider.color(this.mCancelDividerBackgroundColor);
        Divider.strokeWidth(this.mCancelDividerStrokeWidth);
        Text.create(this.mDialogCancelText);
        Text.width('100%');
        Text.height(this.mDialogComponentTitleHeight);
        Text.fontColor(this.mDialogCancelColor);
        Text.fontSize(this.mDialogCancelSize);
        Text.textAlign(TextAlign.Center);
        Text.onClick(() => {
            if (this.isTouchEvent) {
                return;
            }
            this.isTouchEvent = false;
            if (this.showOrClose != undefined) {
                this.showOrClose(this.mDialogComponentHeight, false);
            }
        });
        Text.pop();
        Column.pop();
        Stack.pop();
    }
    getDialogHeightToPx(): number {
        return vp2px(this.mDialogComponentHeight);
    }
}
export class BottomListDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.mOpenAnimator = animator.create({
            duration: 500,
            easing: "friction",
            delay: 0,
            fill: "forwards",
            direction: "normal",
            iterations: 1,
            begin: 0,
            end: 0
        });
        this.__openDialog = new SynchedPropertySimpleTwoWay(params.openDialog, this, "openDialog");
        this.__mDialogBackgroundColor = new ObservedPropertySimple(Color.White, this, "mDialogBackgroundColor");
        this.__mDialogMaskColor = new ObservedPropertySimple(Color.Transparent, this, "mDialogMaskColor");
        this.__mDialogTitleHeight = new ObservedPropertySimple(60, this, "mDialogTitleHeight");
        this.__mDialogHeight = new ObservedPropertySimple(0, this, "mDialogHeight");
        this.__mDialogItemHeight = new ObservedPropertySimple(30, this, "mDialogItemHeight");
        this.__mDialogItemTextSize = new ObservedPropertySimple(20, this, "mDialogItemTextSize");
        this.__mDialogItemTextColor = new ObservedPropertySimple(Color.Black, this, "mDialogItemTextColor");
        this.__mDialogItemDividerBackgroundColor = new ObservedPropertySimple(Color.Gray, this, "mDialogItemDividerBackgroundColor");
        this.__mDialogItemDividerStrokeWidth = new ObservedPropertySimple(1, this, "mDialogItemDividerStrokeWidth");
        this.__mDialogCancelDividerBackgroundColor = new ObservedPropertySimple(Color.Gray, this, "mDialogCancelDividerBackgroundColor");
        this.__mDialogCancelDividerStrokeWidth = new ObservedPropertySimple(10, this, "mDialogCancelDividerStrokeWidth");
        this.__mListData = new ObservedPropertyObject(new Array(), this, "mListData");
        this.__dialogTitle = new ObservedPropertySimple("", this, "dialogTitle");
        this.__dialogTitleSize = new ObservedPropertySimple(25, this, "dialogTitleSize");
        this.__dialogTitleColor = new ObservedPropertySimple(Color.White, this, "dialogTitleColor");
        this.__dialogCancel = new ObservedPropertySimple("", this, "dialogCancel");
        this.__dialogCancelSize = new ObservedPropertySimple(25, this, "dialogCancelSize");
        this.__dialogCancelColor = new ObservedPropertySimple(Color.White, this, "dialogCancelColor");
        this.__mDialogSelectIcon = new ObservedPropertyObject(null, this, "mDialogSelectIcon");
        this.__isShowSelect = new ObservedPropertySimple(false, this, "isShowSelect");
        this.__mDialogItemSelectIndex = new ObservedPropertySimple(0, this, "mDialogItemSelectIndex");
        this.__mDialogItemSelectTextColor = new ObservedPropertySimple(Color.Transparent, this, "mDialogItemSelectTextColor");
        this.cancel = undefined;
        this.onItemClick = undefined;
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new BottomListDialogComponent("3", this, {
                    showOrClose: (currentHeight, isOpen) => { this.onShowOrClose(currentHeight, isOpen); },
                    itemOnClick: (data, index) => { this.onItem(data, index); },
                    mDialogComponentHeight: this.__mDialogHeight,
                    mDialogComponentMastColor: this.__mDialogMaskColor,
                    mDialogComponentTitleHeight: this.__mDialogTitleHeight,
                    mItemListData: this.__mListData,
                    mItemHeight: this.__mDialogItemHeight,
                    mItemTextSize: this.__mDialogItemTextSize,
                    mItemTextColor: this.__mDialogItemTextColor,
                    mDialogComponentBackgroundColor: this.__mDialogBackgroundColor,
                    mItemDividerBackgroundColor: this.__mDialogItemDividerBackgroundColor,
                    mItemDividerStrokeWidth: this.__mDialogItemDividerStrokeWidth,
                    mCancelDividerBackgroundColor: this.__mDialogCancelDividerBackgroundColor,
                    mCancelDividerStrokeWidth: this.__mDialogCancelDividerStrokeWidth,
                    mDialogTitleText: this.__dialogTitle,
                    mDialogTitleSize: this.__dialogTitleSize,
                    mDialogTitleColor: this.__dialogTitleColor,
                    mDialogCancelText: this.__dialogCancel,
                    mDialogCancelSize: this.__dialogCancelSize,
                    mDialogCancelColor: this.__dialogCancelColor,
                    mSelectIcon: this.__mDialogSelectIcon,
                    mIsShowSelect: this.__isShowSelect,
                    mSelectIndex: this.__mDialogItemSelectIndex,
                    mSelectTextColor: this.__mDialogItemSelectTextColor
                });
                jsDialog.setController(this.dialogController);
                View.create(jsDialog);
            },
            autoCancel: true,
            alignment: DialogAlignment.Bottom,
            offset: { dx: 0, dy: 0 },
            customStyle: true,
            maskColor: Color.Transparent
        }, this);
        this.updateWithValueParams(params);
        this.declareWatch("openDialog", this.showDialog);
    }
    updateWithValueParams(params: BottomListDialog_Params) {
        if (params.mOpenAnimator !== undefined) {
            this.mOpenAnimator = params.mOpenAnimator;
        }
        if (params.mDialogBackgroundColor !== undefined) {
            this.mDialogBackgroundColor = params.mDialogBackgroundColor;
        }
        if (params.mDialogMaskColor !== undefined) {
            this.mDialogMaskColor = params.mDialogMaskColor;
        }
        if (params.mDialogTitleHeight !== undefined) {
            this.mDialogTitleHeight = params.mDialogTitleHeight;
        }
        if (params.mDialogHeight !== undefined) {
            this.mDialogHeight = params.mDialogHeight;
        }
        if (params.mDialogItemHeight !== undefined) {
            this.mDialogItemHeight = params.mDialogItemHeight;
        }
        if (params.mDialogItemTextSize !== undefined) {
            this.mDialogItemTextSize = params.mDialogItemTextSize;
        }
        if (params.mDialogItemTextColor !== undefined) {
            this.mDialogItemTextColor = params.mDialogItemTextColor;
        }
        if (params.mDialogItemDividerBackgroundColor !== undefined) {
            this.mDialogItemDividerBackgroundColor = params.mDialogItemDividerBackgroundColor;
        }
        if (params.mDialogItemDividerStrokeWidth !== undefined) {
            this.mDialogItemDividerStrokeWidth = params.mDialogItemDividerStrokeWidth;
        }
        if (params.mDialogCancelDividerBackgroundColor !== undefined) {
            this.mDialogCancelDividerBackgroundColor = params.mDialogCancelDividerBackgroundColor;
        }
        if (params.mDialogCancelDividerStrokeWidth !== undefined) {
            this.mDialogCancelDividerStrokeWidth = params.mDialogCancelDividerStrokeWidth;
        }
        if (params.mListData !== undefined) {
            this.mListData = params.mListData;
        }
        if (params.dialogTitle !== undefined) {
            this.dialogTitle = params.dialogTitle;
        }
        if (params.dialogTitleSize !== undefined) {
            this.dialogTitleSize = params.dialogTitleSize;
        }
        if (params.dialogTitleColor !== undefined) {
            this.dialogTitleColor = params.dialogTitleColor;
        }
        if (params.dialogCancel !== undefined) {
            this.dialogCancel = params.dialogCancel;
        }
        if (params.dialogCancelSize !== undefined) {
            this.dialogCancelSize = params.dialogCancelSize;
        }
        if (params.dialogCancelColor !== undefined) {
            this.dialogCancelColor = params.dialogCancelColor;
        }
        if (params.mDialogSelectIcon !== undefined) {
            this.mDialogSelectIcon = params.mDialogSelectIcon;
        }
        if (params.isShowSelect !== undefined) {
            this.isShowSelect = params.isShowSelect;
        }
        if (params.mDialogItemSelectIndex !== undefined) {
            this.mDialogItemSelectIndex = params.mDialogItemSelectIndex;
        }
        if (params.mDialogItemSelectTextColor !== undefined) {
            this.mDialogItemSelectTextColor = params.mDialogItemSelectTextColor;
        }
        if (params.cancel !== undefined) {
            this.cancel = params.cancel;
        }
        if (params.onItemClick !== undefined) {
            this.onItemClick = params.onItemClick;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    aboutToBeDeleted() {
        this.__openDialog.aboutToBeDeleted();
        this.__mDialogBackgroundColor.aboutToBeDeleted();
        this.__mDialogMaskColor.aboutToBeDeleted();
        this.__mDialogTitleHeight.aboutToBeDeleted();
        this.__mDialogHeight.aboutToBeDeleted();
        this.__mDialogItemHeight.aboutToBeDeleted();
        this.__mDialogItemTextSize.aboutToBeDeleted();
        this.__mDialogItemTextColor.aboutToBeDeleted();
        this.__mDialogItemDividerBackgroundColor.aboutToBeDeleted();
        this.__mDialogItemDividerStrokeWidth.aboutToBeDeleted();
        this.__mDialogCancelDividerBackgroundColor.aboutToBeDeleted();
        this.__mDialogCancelDividerStrokeWidth.aboutToBeDeleted();
        this.__mListData.aboutToBeDeleted();
        this.__dialogTitle.aboutToBeDeleted();
        this.__dialogTitleSize.aboutToBeDeleted();
        this.__dialogTitleColor.aboutToBeDeleted();
        this.__dialogCancel.aboutToBeDeleted();
        this.__dialogCancelSize.aboutToBeDeleted();
        this.__dialogCancelColor.aboutToBeDeleted();
        this.__mDialogSelectIcon.aboutToBeDeleted();
        this.__isShowSelect.aboutToBeDeleted();
        this.__mDialogItemSelectIndex.aboutToBeDeleted();
        this.__mDialogItemSelectTextColor.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private mOpenAnimator: AnimatorResult;
    private __openDialog: SynchedPropertySimpleTwoWay<boolean>;
    get openDialog() {
        return this.__openDialog.get();
    }
    set openDialog(newValue: boolean) {
        this.__openDialog.set(newValue);
    }
    private __mDialogBackgroundColor: ObservedPropertySimple<number | string>;
    get mDialogBackgroundColor() {
        return this.__mDialogBackgroundColor.get();
    }
    set mDialogBackgroundColor(newValue: number | string) {
        this.__mDialogBackgroundColor.set(newValue);
    }
    private __mDialogMaskColor: ObservedPropertySimple<number | string>;
    get mDialogMaskColor() {
        return this.__mDialogMaskColor.get();
    }
    set mDialogMaskColor(newValue: number | string) {
        this.__mDialogMaskColor.set(newValue);
    }
    private __mDialogTitleHeight: ObservedPropertySimple<number>;
    get mDialogTitleHeight() {
        return this.__mDialogTitleHeight.get();
    }
    set mDialogTitleHeight(newValue: number) {
        this.__mDialogTitleHeight.set(newValue);
    }
    private __mDialogHeight: ObservedPropertySimple<number>;
    get mDialogHeight() {
        return this.__mDialogHeight.get();
    }
    set mDialogHeight(newValue: number) {
        this.__mDialogHeight.set(newValue);
    }
    private __mDialogItemHeight: ObservedPropertySimple<number>;
    get mDialogItemHeight() {
        return this.__mDialogItemHeight.get();
    }
    set mDialogItemHeight(newValue: number) {
        this.__mDialogItemHeight.set(newValue);
    }
    private __mDialogItemTextSize: ObservedPropertySimple<number>;
    get mDialogItemTextSize() {
        return this.__mDialogItemTextSize.get();
    }
    set mDialogItemTextSize(newValue: number) {
        this.__mDialogItemTextSize.set(newValue);
    }
    private __mDialogItemTextColor: ObservedPropertySimple<number | string>;
    get mDialogItemTextColor() {
        return this.__mDialogItemTextColor.get();
    }
    set mDialogItemTextColor(newValue: number | string) {
        this.__mDialogItemTextColor.set(newValue);
    }
    private __mDialogItemDividerBackgroundColor: ObservedPropertySimple<number | string>;
    get mDialogItemDividerBackgroundColor() {
        return this.__mDialogItemDividerBackgroundColor.get();
    }
    set mDialogItemDividerBackgroundColor(newValue: number | string) {
        this.__mDialogItemDividerBackgroundColor.set(newValue);
    }
    private __mDialogItemDividerStrokeWidth: ObservedPropertySimple<number>;
    get mDialogItemDividerStrokeWidth() {
        return this.__mDialogItemDividerStrokeWidth.get();
    }
    set mDialogItemDividerStrokeWidth(newValue: number) {
        this.__mDialogItemDividerStrokeWidth.set(newValue);
    }
    private __mDialogCancelDividerBackgroundColor: ObservedPropertySimple<number | string>;
    get mDialogCancelDividerBackgroundColor() {
        return this.__mDialogCancelDividerBackgroundColor.get();
    }
    set mDialogCancelDividerBackgroundColor(newValue: number | string) {
        this.__mDialogCancelDividerBackgroundColor.set(newValue);
    }
    private __mDialogCancelDividerStrokeWidth: ObservedPropertySimple<number>;
    get mDialogCancelDividerStrokeWidth() {
        return this.__mDialogCancelDividerStrokeWidth.get();
    }
    set mDialogCancelDividerStrokeWidth(newValue: number) {
        this.__mDialogCancelDividerStrokeWidth.set(newValue);
    }
    private __mListData: ObservedPropertyObject<Array<string>>;
    get mListData() {
        return this.__mListData.get();
    }
    set mListData(newValue: Array<string>) {
        this.__mListData.set(newValue);
    }
    private __dialogTitle: ObservedPropertySimple<string>;
    get dialogTitle() {
        return this.__dialogTitle.get();
    }
    set dialogTitle(newValue: string) {
        this.__dialogTitle.set(newValue);
    }
    private __dialogTitleSize: ObservedPropertySimple<number>;
    get dialogTitleSize() {
        return this.__dialogTitleSize.get();
    }
    set dialogTitleSize(newValue: number) {
        this.__dialogTitleSize.set(newValue);
    }
    private __dialogTitleColor: ObservedPropertySimple<number | string>;
    get dialogTitleColor() {
        return this.__dialogTitleColor.get();
    }
    set dialogTitleColor(newValue: number | string) {
        this.__dialogTitleColor.set(newValue);
    }
    private __dialogCancel: ObservedPropertySimple<string>;
    get dialogCancel() {
        return this.__dialogCancel.get();
    }
    set dialogCancel(newValue: string) {
        this.__dialogCancel.set(newValue);
    }
    private __dialogCancelSize: ObservedPropertySimple<number>;
    get dialogCancelSize() {
        return this.__dialogCancelSize.get();
    }
    set dialogCancelSize(newValue: number) {
        this.__dialogCancelSize.set(newValue);
    }
    private __dialogCancelColor: ObservedPropertySimple<number | string>;
    get dialogCancelColor() {
        return this.__dialogCancelColor.get();
    }
    set dialogCancelColor(newValue: number | string) {
        this.__dialogCancelColor.set(newValue);
    }
    private __mDialogSelectIcon: ObservedPropertyObject<Resource | null>;
    get mDialogSelectIcon() {
        return this.__mDialogSelectIcon.get();
    }
    set mDialogSelectIcon(newValue: Resource | null) {
        this.__mDialogSelectIcon.set(newValue);
    }
    private __isShowSelect: ObservedPropertySimple<boolean>;
    get isShowSelect() {
        return this.__isShowSelect.get();
    }
    set isShowSelect(newValue: boolean) {
        this.__isShowSelect.set(newValue);
    }
    private __mDialogItemSelectIndex: ObservedPropertySimple<number>;
    get mDialogItemSelectIndex() {
        return this.__mDialogItemSelectIndex.get();
    }
    set mDialogItemSelectIndex(newValue: number) {
        this.__mDialogItemSelectIndex.set(newValue);
    }
    private __mDialogItemSelectTextColor: ObservedPropertySimple<number | string>;
    get mDialogItemSelectTextColor() {
        return this.__mDialogItemSelectTextColor.get();
    }
    set mDialogItemSelectTextColor(newValue: number | string) {
        this.__mDialogItemSelectTextColor.set(newValue);
    }
    private cancel?: () => void;
    private onItemClick?: (data: string, index: number) => void;
    private dialogController: CustomDialogController;
    showDialog() {
        this.createOpenAnimator(true, 0);
        if (this.dialogTitleColor != undefined) {
            this.dialogController.open();
            this.mOpenAnimator.play();
        }
    }
    closeDialog(currentHeight: number) {
        this.createOpenAnimator(false, currentHeight);
        this.mOpenAnimator.play();
    }
    onShowOrClose(currentHeight: number, isOpen: boolean) {
        if (isOpen) {
            this.createOpenAnimator(true, currentHeight);
            this.mOpenAnimator.play();
        }
        else {
            this.closeDialog(currentHeight);
            if (this.cancel != undefined) {
                this.cancel();
            }
        }
    }
    onItem(data: string, index: number) {
        if (this.onItemClick != undefined) {
            this.onItemClick(data, index);
        }
        this.closeDialog(this.mDialogHeight);
    }
    private createOpenAnimator(isShow: boolean, currentHeight: number) {
        let beginHeight: number = 0;
        let endHeight: number = 0;
        if (isShow) {
            beginHeight = currentHeight;
            endHeight = this.mDialogItemHeight * this.mListData.length + this.mDialogTitleHeight * (this.dialogTitle ? 2 : 1)
                + this.mListData.length * this.mDialogItemDividerStrokeWidth + this.mDialogCancelDividerStrokeWidth;
        }
        else {
            beginHeight = currentHeight;
            endHeight = 0;
        }
        let options: AnimatorOptions = {
            duration: 500,
            easing: "friction",
            delay: 0,
            fill: "forwards",
            direction: "normal",
            iterations: 1,
            begin: beginHeight,
            end: endHeight
        };
        this.mOpenAnimator = animator.create(options);
        this.mOpenAnimator.onframe = (value) => {
            this.mDialogHeight = value;
        };
        this.mOpenAnimator.onfinish = () => {
            if (!isShow) {
                this.dialogController.close();
            }
        };
    }
    render() {
    }
}
