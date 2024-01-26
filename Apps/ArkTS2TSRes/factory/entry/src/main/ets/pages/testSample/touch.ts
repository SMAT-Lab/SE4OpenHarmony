interface touchSample_Params {
    touchTest?: number;
    touchedCount?: number;
    gridItem?: boolean[];
    buttonsOffsetX?: number[];
    buttonsOffsetY?: number[];
    myColumnsTemplate?: string;
    myRowsTemplate?: string;
    gridItemArea?: Area[];
    gridItemCount?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "touch_" + ++__generate__Id;
}
/*
 * Copyright 2023 Unionman Technology Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { TitleBar } from '../../common/TitleBar';
import Logger from '../../model/Logger';
import promptAction from '@ohos.promptAction';
import window from '@ohos.window';
const TAG = 'touchSample';
export class touchSample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__touchTest = new ObservedPropertySimple(1, this, "touchTest");
        this.__touchedCount = new ObservedPropertySimple(0, this, "touchedCount");
        this.__gridItem = new ObservedPropertyObject([], this, "gridItem");
        this.__buttonsOffsetX = new ObservedPropertyObject([0, 100, 200, 300, 400, 500], this, "buttonsOffsetX");
        this.__buttonsOffsetY = new ObservedPropertyObject([0, 100, 200, 300, 400, 500], this, "buttonsOffsetY");
        this.__myColumnsTemplate = new ObservedPropertySimple("1fr 1fr 1fr 1fr 1fr 1fr", this, "myColumnsTemplate");
        this.__myRowsTemplate = new ObservedPropertySimple("1fr 1fr 1fr 1fr 1fr 1fr", this, "myRowsTemplate");
        this.gridItemArea = [];
        this.gridItemCount = undefined;
        this.updateWithValueParams(params);
        this.declareWatch("touchTest", this.touchTestChange);
        this.declareWatch("touchedCount", this.touchedCountChange);
    }
    updateWithValueParams(params: touchSample_Params) {
        if (params.touchTest !== undefined) {
            this.touchTest = params.touchTest;
        }
        if (params.touchedCount !== undefined) {
            this.touchedCount = params.touchedCount;
        }
        if (params.gridItem !== undefined) {
            this.gridItem = params.gridItem;
        }
        if (params.buttonsOffsetX !== undefined) {
            this.buttonsOffsetX = params.buttonsOffsetX;
        }
        if (params.buttonsOffsetY !== undefined) {
            this.buttonsOffsetY = params.buttonsOffsetY;
        }
        if (params.myColumnsTemplate !== undefined) {
            this.myColumnsTemplate = params.myColumnsTemplate;
        }
        if (params.myRowsTemplate !== undefined) {
            this.myRowsTemplate = params.myRowsTemplate;
        }
        if (params.gridItemArea !== undefined) {
            this.gridItemArea = params.gridItemArea;
        }
        if (params.gridItemCount !== undefined) {
            this.gridItemCount = params.gridItemCount;
        }
    }
    aboutToBeDeleted() {
        this.__touchTest.aboutToBeDeleted();
        this.__touchedCount.aboutToBeDeleted();
        this.__gridItem.aboutToBeDeleted();
        this.__buttonsOffsetX.aboutToBeDeleted();
        this.__buttonsOffsetY.aboutToBeDeleted();
        this.__myColumnsTemplate.aboutToBeDeleted();
        this.__myRowsTemplate.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __touchTest: ObservedPropertySimple<number>; // 触摸测试样例
    get touchTest() {
        return this.__touchTest.get();
    }
    set touchTest(newValue: number) {
        this.__touchTest.set(newValue);
    }
    private __touchedCount: ObservedPropertySimple<number>; // 触摸测试样例
    get touchedCount() {
        return this.__touchedCount.get();
    }
    set touchedCount(newValue: number) {
        this.__touchedCount.set(newValue);
    }
    private __gridItem: ObservedPropertyObject<boolean[]>;
    get gridItem() {
        return this.__gridItem.get();
    }
    set gridItem(newValue: boolean[]) {
        this.__gridItem.set(newValue);
    }
    private __buttonsOffsetX: ObservedPropertyObject<number[]>;
    get buttonsOffsetX() {
        return this.__buttonsOffsetX.get();
    }
    set buttonsOffsetX(newValue: number[]) {
        this.__buttonsOffsetX.set(newValue);
    }
    private __buttonsOffsetY: ObservedPropertyObject<number[]>;
    get buttonsOffsetY() {
        return this.__buttonsOffsetY.get();
    }
    set buttonsOffsetY(newValue: number[]) {
        this.__buttonsOffsetY.set(newValue);
    }
    private __myColumnsTemplate: ObservedPropertySimple<string>;
    get myColumnsTemplate() {
        return this.__myColumnsTemplate.get();
    }
    set myColumnsTemplate(newValue: string) {
        this.__myColumnsTemplate.set(newValue);
    }
    private __myRowsTemplate: ObservedPropertySimple<string>;
    get myRowsTemplate() {
        return this.__myRowsTemplate.get();
    }
    set myRowsTemplate(newValue: string) {
        this.__myRowsTemplate.set(newValue);
    }
    private gridItemArea: Area[];
    private gridItemCount: number;
    touchedCountChange() {
        Logger.info(TAG, "touchedCount:" + this.touchedCount + "this.gridItemCount" + this.gridItemCount + "this.touchTest:" + this.touchTest);
        if (this.touchedCount >= this.gridItemCount - 1 && this.touchTest == 1) {
            Logger.info(TAG, "this.touchTest++");
            this.touchTest++;
        }
        if (this.touchedCount >= this.gridItemCount - 1 && this.touchTest == 2) {
            this.touchTest++;
        }
    }
    initGridItem() {
        for (let i = 0; i < this.gridItemCount; i++) {
            this.gridItem[i] = false;
        }
    }
    promptActionTouchTestChange() {
        // 弹窗
        try {
            promptAction.showDialog({
                title: '屏幕触摸项目' + this.touchTest,
                message: '1、点击确定开始屏幕触控测试,在单元格上执行点击、拖动等操作会消除单元格，消除完屏幕所有单元格后会自动进行下一项测试2、五指同时触控屏幕可跳过此项测试进行下一项测试',
                buttons: [
                    {
                        text: '确定',
                        color: '#000000',
                    }
                ],
            })
                .then(data => {
                switch (this.touchTest) {
                    case 1:
                        this.gridItemCount = 36;
                        this.initGridItem();
                        break;
                    case 2:
                        this.gridItemCount = 144;
                        this.initGridItem();
                        break;
                    default: ;
                }
                console.info('showDialog success, click button: ' + data.index);
            })
                .catch(err => {
                console.info('showDialog error: ' + err);
            });
        }
        catch (error) {
            console.error(`showDialog args error code is ${error.code}, message is ${error.message}`);
        }
        ;
    }
    touchTestChange() {
        Logger.info(TAG, "touchTestChange");
        this.touchedCount = 0;
        this.gridItem = [];
        if (this.touchTest == 2) {
            this.myColumnsTemplate = "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr";
            this.myRowsTemplate = "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr";
            Logger.info(TAG, "this.gridItem.length" + this.gridItem.length + "this.gridItemArea.length" + this.gridItemArea.length);
        }
        this.promptActionTouchTestChange();
    }
    aboutToAppear() {
        Logger.info(TAG, "aboutToAppear");
    }
    onPageShow() {
        this.promptActionTouchTestChange();
    }
    // area.globalPosition: 目标元素左上角相对页面左上角的位置。
    isInArea(area: Area, x: number, y: number): boolean {
        if (x >= area.globalPosition.x && x <= Number(area.globalPosition.x) + Number(area.width)) {
            if (y >= area.globalPosition.y && y <= Number(area.globalPosition.y) + Number(area.height)) {
                return true;
            }
        }
        return false;
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        let earlierCreatedChild_2: TitleBar = (this && this.findChildById) ? this.findChildById("2") as TitleBar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new TitleBar("2", this, { title: '触摸测试' }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                title: '触摸测试'
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        Stack.create({ alignContent: Alignment.TopStart });
        Stack.hitTestBehavior(HitTestMode.Transparent);
        Gesture.create(GesturePriority.Low);
        GestureGroup.create(GestureMode.Parallel);
        LongPressGesture.create({ fingers: 5, repeat: true });
        LongPressGesture.onAction((event: GestureEvent) => {
            Logger.info(TAG, "onActionUpdate");
            let fingerLists = event.fingerList;
            Logger.info(TAG, "onActionUpdate" + event.fingerList.length);
            fingerLists.forEach((value, index) => {
                this.buttonsOffsetX[index] = value.globalX;
                this.buttonsOffsetY[index] = value.globalY;
                Logger.info(TAG, "GestureEventX:" + value.globalX + "GestureEventY:" + value.globalY);
            });
        });
        LongPressGesture.pop();
        PinchGesture.create({ fingers: 5 });
        PinchGesture.onActionEnd(() => {
            this.initGridItem();
            this.touchTest++;
        });
        PinchGesture.pop();
        GestureGroup.pop();
        Gesture.pop();
        Stack.width('100%');
        Stack.height('100%');
        Grid.create();
        Grid.onTouch((event: TouchEvent) => {
            Logger.log(TAG, "TouchEventX:" + event.changedTouches[0].screenX + "TouchEventY:" + event.changedTouches[0].screenY);
            this.gridItemArea.forEach((element, index) => {
                if (this.isInArea(element, event.changedTouches[0].screenX, event.changedTouches[0].screenY)) {
                    if (this.gridItem[index] == false) {
                        this.gridItem[index] = true;
                        this.touchedCount++;
                    }
                }
            });
        });
        Grid.width('100%');
        Grid.height('100%');
        Grid.columnsTemplate(this.myColumnsTemplate);
        Grid.rowsTemplate(this.myRowsTemplate);
        ForEach.create("3", this, ObservedObject.GetRawObject(this.gridItem), (item, index) => {
            GridItem.create();
            GridItem.onAreaChange((oldValue: Area, newValue: Area) => {
                if (this.gridItemArea.length <= this.gridItem.length) {
                    this.gridItemArea[index] = newValue;
                    Logger.log(TAG, "gridItemArea:" + this.gridItemArea.length + this.gridItemCount);
                }
            });
            GridItem.id("GridItem" + index);
            GridItem.onClick(() => {
                if (this.gridItem[index] == false) {
                    this.gridItem[index] = true;
                    this.touchedCount++;
                }
            });
            GridItem.borderWidth(1);
            GridItem.backgroundColor(item ? Color.Black : Color.White);
            GridItem.borderColor(Color.Black);
            GridItem.width('100%');
            GridItem.height('100%');
            GridItem.pop();
        }, item => item);
        ForEach.pop();
        Grid.pop();
        Stack.pop();
        Column.pop();
    }
}
loadDocument(new touchSample("1", undefined, {}));
