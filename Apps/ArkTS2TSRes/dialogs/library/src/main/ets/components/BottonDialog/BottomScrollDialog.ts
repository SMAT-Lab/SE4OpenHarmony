interface BottomScrollDialog_Params {
    scroller?: Scroller;
    model?: BaseMode;
    arr?: string[] // 列表数据
    ;
    dialogTitle?: string;
    inputTextPlaceholder?: string;
    dialogTitleFontSize?: number;
    scrollEmptyHeight?: number;
    scrollMinHeight?: Length;
    scrollMaxHeight?: Length;
    closeDialogHeight?;
    parentScrollHeight?: number;
    init?: boolean;
    customComponent?: (item: Object, itemIndex: number) => void // 列表中的自定义控件
    ;
    panOption?: PanGestureOptions;
    dialogInput?: CustomDialogController // 输入框的控制对象
    ;
    controller?: CustomDialogController // 当选dialog控制对象
    ;
    listenerScrollColumn?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "BottomScrollDialog_" + ++__generate__Id;
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
import { BaseMode } from '../model/BaseModel';
import inspector from '@ohos.arkui.inspector';
import componentUtils from '@ohos.arkui.componentUtils';
const TAG = 'BottomScrollDialog';
export class BottomScrollDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.scroller = new Scroller();
        this.model = new BaseMode();
        this.__arr = new SynchedPropertyObjectTwoWay(params.arr, this, "arr");
        this.__dialogTitle = new SynchedPropertySimpleOneWay(params.dialogTitle, this, "dialogTitle");
        this.__inputTextPlaceholder = new SynchedPropertySimpleOneWay(params.inputTextPlaceholder, this, "inputTextPlaceholder");
        this.__dialogTitleFontSize = new ObservedPropertySimple(20 // 标题字体大小
        , this, "dialogTitleFontSize");
        this.__scrollEmptyHeight = new ObservedPropertySimple(20 // 控件内部使用，滑动控制
        , this, "scrollEmptyHeight");
        this.scrollMinHeight = '10%';
        this.scrollMaxHeight = '78%';
        this.closeDialogHeight = 78 // 控件内部使用，关闭界限
        ;
        this.parentScrollHeight = 80 // 控件内部使用，scroll的高度
        ;
        this.__init = new ObservedPropertySimple(true // 控件内部使用，用于初始化走手势逻辑
        , this, "init");
        this.customComponent = undefined;
        this.panOption = new PanGestureOptions({ direction: PanDirection.Up | PanDirection.Down }) // 手势定义
        ;
        this.dialogInput = undefined;
        this.controller = undefined;
        this.listenerScrollColumn = inspector.createComponentObserver('scrollColumnId');
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: BottomScrollDialog_Params) {
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.model !== undefined) {
            this.model = params.model;
        }
        this.dialogTitle = params.dialogTitle;
        this.inputTextPlaceholder = params.inputTextPlaceholder;
        if (params.dialogTitleFontSize !== undefined) {
            this.dialogTitleFontSize = params.dialogTitleFontSize;
        }
        if (params.scrollEmptyHeight !== undefined) {
            this.scrollEmptyHeight = params.scrollEmptyHeight;
        }
        if (params.scrollMinHeight !== undefined) {
            this.scrollMinHeight = params.scrollMinHeight;
        }
        if (params.scrollMaxHeight !== undefined) {
            this.scrollMaxHeight = params.scrollMaxHeight;
        }
        if (params.closeDialogHeight !== undefined) {
            this.closeDialogHeight = params.closeDialogHeight;
        }
        if (params.parentScrollHeight !== undefined) {
            this.parentScrollHeight = params.parentScrollHeight;
        }
        if (params.init !== undefined) {
            this.init = params.init;
        }
        if (params.customComponent !== undefined) {
            this.customComponent = params.customComponent;
        }
        if (params.panOption !== undefined) {
            this.panOption = params.panOption;
        }
        if (params.dialogInput !== undefined) {
            this.dialogInput = params.dialogInput;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.listenerScrollColumn !== undefined) {
            this.listenerScrollColumn = params.listenerScrollColumn;
        }
    }
    aboutToBeDeleted() {
        this.__arr.aboutToBeDeleted();
        this.__dialogTitle.aboutToBeDeleted();
        this.__inputTextPlaceholder.aboutToBeDeleted();
        this.__dialogTitleFontSize.aboutToBeDeleted();
        this.__scrollEmptyHeight.aboutToBeDeleted();
        this.__init.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private scroller: Scroller;
    private model: BaseMode;
    private __arr: SynchedPropertySimpleOneWay<string[]>; // 列表数据
    get arr() {
        return this.__arr.get();
    }
    set arr(newValue: string[] // 列表数据
    ) {
        this.__arr.set(newValue);
    }
    private __dialogTitle: SynchedPropertySimpleOneWay<string>; // 列表标题
    get dialogTitle() {
        return this.__dialogTitle.get();
    }
    set dialogTitle(newValue: string) {
        this.__dialogTitle.set(newValue);
    }
    private __inputTextPlaceholder: SynchedPropertySimpleOneWay<string>; // 输入框的提示语句
    get inputTextPlaceholder() {
        return this.__inputTextPlaceholder.get();
    }
    set inputTextPlaceholder(newValue: string) {
        this.__inputTextPlaceholder.set(newValue);
    }
    private __dialogTitleFontSize: ObservedPropertySimple<number>; // 标题字体大小
    get dialogTitleFontSize() {
        return this.__dialogTitleFontSize.get();
    }
    set dialogTitleFontSize(newValue: number) {
        this.__dialogTitleFontSize.set(newValue);
    }
    private __scrollEmptyHeight: ObservedPropertySimple<number>; // 控件内部使用，滑动控制
    get scrollEmptyHeight() {
        return this.__scrollEmptyHeight.get();
    }
    set scrollEmptyHeight(newValue: number) {
        this.__scrollEmptyHeight.set(newValue);
    }
    private scrollMinHeight: Length;
    private scrollMaxHeight: Length;
    private closeDialogHeight; // 控件内部使用，关闭界限
    private parentScrollHeight: number; // 控件内部使用，scroll的高度
    private __init: ObservedPropertySimple<boolean>; // 控件内部使用，用于初始化走手势逻辑
    get init() {
        return this.__init.get();
    }
    set init(newValue: boolean) {
        this.__init.set(newValue);
    }
    private __customComponent; // 列表中的自定义控件
    private panOption: PanGestureOptions; // 手势定义
    private dialogInput: CustomDialogController; // 输入框的控制对象
    setController(ctr: CustomDialogController) {
        this.dialogInput = ctr;
    }
    private controller: CustomDialogController; // 当选dialog控制对象
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private listenerScrollColumn;
    aboutToDisappear() {
        this.listenerScrollColumn.off("draw");
        if (this.model.customCallback && this.model.customCallback.beforeDisappear) {
            this.model.customCallback.beforeDisappear();
        }
    }
    aboutToAppear() {
        this.listenerScrollColumn.on("draw", () => {
            let scrollIdPosition: componentUtils.ComponentInfo = componentUtils.getRectangleById("scrollId");
            let scrollColumnIdPosition: componentUtils.ComponentInfo = componentUtils.getRectangleById("scrollColumnId");
            let scrollColumnHeight: number = scrollColumnIdPosition.size.height;
            let Scroll_01_height: number = scrollIdPosition.size.height;
            if (scrollColumnHeight < Scroll_01_height) {
                console.log(TAG, "this.init: " + this.init);
                this.init = true;
            }
        });
        if (this.model.customCallback && this.model.customCallback.beforeAppear) {
            this.model.customCallback.beforeAppear();
        }
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor(Color.Transparent);
        Column.onClick(() => {
            this.controller.close();
        });
        Column.create();
        Column.width('100%');
        Column.height((100 - this.parentScrollHeight) + '%');
        Column.onClick(() => {
            if (this.controller != undefined) {
                this.controller.close();
            }
        });
        Column.pop();
        Scroll.create(this.scroller);
        Gesture.create(GesturePriority.Parallel, GestureMask.Normal);
        PanGesture.create(this.panOption);
        PanGesture.onActionUpdate((event: GestureEvent) => {
            console.info(TAG, "eventy: " + event.offsetY + " scrollEmptyHeight: " + this.scrollEmptyHeight + " isInit: " + this.init);
            if (this.init) {
                if ((event.offsetY > 0) && (this.scrollEmptyHeight < this.closeDialogHeight)) {
                    this.scrollEmptyHeight += 4;
                }
                else if (event.offsetY < 0 && this.scrollEmptyHeight > 0) {
                    let tmp = this.scrollEmptyHeight - 4;
                    this.scrollEmptyHeight = tmp < 0 ? 0 : tmp;
                }
                if ((this.scrollEmptyHeight > this.closeDialogHeight) ||
                    (this.scrollEmptyHeight == this.closeDialogHeight)) {
                    if (this.controller != undefined) {
                        this.controller.close();
                    }
                }
            }
        });
        PanGesture.pop();
        Gesture.pop();
        Scroll.onScroll((xOffset: number, yOffset: number) => {
            this.init = false;
            console.info(TAG, "parent: " + xOffset + ' ' + yOffset + ' scrollEmptyHeight: ' + this.scrollEmptyHeight);
            if ((yOffset < 0) && (this.scrollEmptyHeight < this.closeDialogHeight)) {
                this.scrollEmptyHeight += 2;
            }
        });
        Scroll.onScrollEdge((side: Edge) => {
            console.info(TAG, 'To the edge side: ' + side);
            if (side == 0) {
                if (this.controller != undefined) {
                    this.controller.close();
                }
            }
        });
        Scroll.width('100%');
        Scroll.height(this.parentScrollHeight + '%');
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.scrollBar(BarState.Off);
        Scroll.align(Alignment.Bottom);
        Column.create();
        Column.width('100%');
        Column.margin({ bottom: 40 });
        Column.create();
        Column.width('100%');
        Column.height(this.scrollEmptyHeight + '%');
        Column.backgroundColor(Color.Transparent);
        Column.onClick(() => {
            if (this.controller != undefined) {
                this.controller.close();
            }
        });
        Column.id("scrollEmpty");
        Column.pop();
        Column.create();
        Column.width('100%');
        Column.height('10%');
        Column.backgroundColor(Color.White);
        Column.id("Scroll_title");
        Text.create(this.dialogTitle);
        Text.width('100%');
        Text.fontSize(this.dialogTitleFontSize);
        Text.height('100%');
        Text.padding(20);
        Text.borderRadius({ topLeft: '20vp', topRight: '20vp' });
        Text.pop();
        Column.pop();
        Scroll.create();
        Scroll.width('100%');
        Scroll.constraintSize({ minHeight: this.scrollMinHeight, maxHeight: this.scrollMaxHeight });
        Scroll.id("scrollId");
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.scrollBar(BarState.Off);
        Scroll.edgeEffect(EdgeEffect.None);
        Scroll.nestedScroll({ scrollForward: NestedScrollMode.PARENT_FIRST, scrollBackward: NestedScrollMode.SELF_FIRST });
        Column.create({ space: 20 });
        Column.width('100%');
        Column.margin({ "top": "5.00vp", "right": "0.00vp", "bottom": "5.00vp", "left": "0.00vp" });
        Column.id("scrollColumnId");
        If.create();
        if (this.arr) {
            If.branchId(0);
            ForEach.create("2", this, ObservedObject.GetRawObject(this.arr), (item: string, itemIndex: number) => {
                If.create();
                if (this.customComponent != undefined) {
                    If.branchId(0);
                    this.customComponent(item, itemIndex, this);
                }
                If.pop();
            }, (item: string) => item);
            ForEach.pop();
        }
        If.pop();
        Column.pop();
        Scroll.pop();
        If.create();
        if (this.dialogInput) {
            If.branchId(0);
            Column.create();
            Column.width('100%');
            Column.height('12%');
            Column.backgroundColor(Color.Green);
            Column.padding(15);
            Text.create(this.inputTextPlaceholder);
            Text.width('100%');
            Text.fontSize(14);
            Text.height('100%');
            Text.backgroundColor(Color.White);
            Text.padding(10);
            Text.onClick(() => {
                this.dialogInput.open();
            });
            Text.margin({ bottom: 10 });
            Text.pop();
            Column.pop();
        }
        If.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
}
