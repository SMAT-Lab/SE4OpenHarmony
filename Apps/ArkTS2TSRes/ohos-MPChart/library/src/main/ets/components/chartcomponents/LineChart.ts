interface LineChart_Params {
    model?: LineChartModel | null;
    setting?: RenderingContextSettings;
    context2D?: CanvasRenderingContext2D;
    customUiInfo?: CustomUiInfo | null;
    customUiTriggerEvent?: EventType;
    customUiBuilder?: () => void;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "LineChart_" + ++__generate__Id;
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
import LineChartModel from '../charts/LineChartModel';
import { CustomUiInfo } from '../data/customUiData';
import { EventType } from '../listener/EventControl';
export default class LineChart extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.model = null;
        this.setting = new RenderingContextSettings(true);
        this.context2D = new CanvasRenderingContext2D(this.setting);
        this.__customUiTriggerEvent = new SynchedPropertySimpleOneWay(params.customUiTriggerEvent, this, "customUiTriggerEvent");
        this.customUiBuilder = this.emptyBuilder;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: LineChart_Params) {
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.setting !== undefined) {
            this.setting = params.setting;
        }
        if (params.context2D !== undefined) {
            this.context2D = params.context2D;
        }
        this.customUiInfo = params.customUiInfo;
        this.customUiTriggerEvent = params.customUiTriggerEvent;
        if (params.customUiBuilder !== undefined) {
            this.customUiBuilder = params.customUiBuilder;
        }
    }
    aboutToBeDeleted() {
        this.__customUiInfo.aboutToBeDeleted();
        this.__customUiTriggerEvent.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private model: LineChartModel | null;
    private setting: RenderingContextSettings;
    private context2D: CanvasRenderingContext2D;
    private __customUiInfo: SynchedPropertySimpleOneWay<CustomUiInfo | null>;
    get customUiInfo() {
        return this.__customUiInfo.get();
    }
    set customUiInfo(newValue: CustomUiInfo | null) {
        this.__customUiInfo.set(newValue);
    }
    // 默认长按显示自定义ui
    private __customUiTriggerEvent: SynchedPropertySimpleOneWay<EventType>;
    get customUiTriggerEvent() {
        return this.__customUiTriggerEvent.get();
    }
    set customUiTriggerEvent(newValue: EventType) {
        this.__customUiTriggerEvent.set(newValue);
    }
    emptyBuilder(parent = null) {
    }
    private __customUiBuilder;
    public calcCustomUiInfo(ev: GestureEvent) {
        if (!this.customUiInfo) {
            return;
        }
        if (!this.model)
            return;
        const pos = this.model.calcPos(false, ev);
        if (!pos)
            return;
        const entryData = this.model.getEntryByTouchPoint(pos[0], pos[1]);
        if (entryData) {
            const vph = this.model.getViewPortHandler();
            const isInbounds = vph.isInBounds(pos[0], pos[1]);
            // 距离左侧距离
            const offsetLeft = pos[0] - vph.offsetLeft();
            // 距离右侧
            const offsetRight = vph.getChartWidth() - pos[0] - vph.offsetRight();
            this.customUiInfo.isInbounds = isInbounds;
            this.customUiInfo.x = pos[0] + (offsetRight < this.customUiInfo.width ? -this.customUiInfo.width : 0);
            this.customUiInfo.y = pos[1] - this.customUiInfo.height;
            this.customUiInfo.offsetLeft = offsetLeft;
            this.customUiInfo.offsetRight = offsetRight;
            this.customUiInfo.data = entryData;
            this.customUiInfo.showUi = true;
        }
    }
    render() {
        Column.create();
        Stack.create({ alignContent: Alignment.TopStart });
        Canvas.create(this.context2D);
        Canvas.onReady(() => {
            if (this.model) {
                this.model.setContext2D(this.context2D);
                this.model.onDraw(this.context2D);
            }
        });
        Canvas.onAreaChange((oldArea: Area, newArea: Area) => {
            if (this.model) {
                this.model.onChartSizeChanged(Number(newArea.width), Number(newArea.height), Number(oldArea.width), Number(oldArea.height));
            }
        });
        Canvas.onTouch((event) => {
            this.model?.onTouchEvent(event);
        });
        Gesture.create(GesturePriority.High);
        GestureGroup.create(GestureMode.Exclusive);
        SwipeGesture.create();
        SwipeGesture.pop();
        TapGesture.create({ count: 2 });
        TapGesture.onAction((event?: GestureEvent) => {
            if (event && this.model) {
                this.model.onDoubleTap(false, event);
                if (this.customUiTriggerEvent === EventType.DoubleTap &&
                    this.model.eventControl.eventIsEnable(EventType.DoubleTap)) {
                    this.calcCustomUiInfo(event);
                }
            }
        });
        TapGesture.pop();
        TapGesture.create({ count: 1 });
        TapGesture.onAction((event?: GestureEvent) => {
            if (event && this.model) {
                this.model.onSingleTapUp(false, event);
                if (this.customUiTriggerEvent === EventType.SingleTap &&
                    this.model.eventControl.eventIsEnable(EventType.SingleTap)) {
                    this.calcCustomUiInfo(event);
                }
            }
        });
        TapGesture.pop();
        LongPressGesture.create();
        LongPressGesture.onAction((event?: GestureEvent) => {
            if (this.model && event) {
                this.model.onLongPress(false, 'Down', event);
                if (this.customUiTriggerEvent === EventType.LongPress &&
                    this.model.eventControl.eventIsEnable(EventType.LongPress)) {
                    this.calcCustomUiInfo(event);
                }
            }
        });
        LongPressGesture.onActionEnd((event?: GestureEvent) => {
            if (this.model && event) {
                this.model.onLongPress(false, 'Up', event);
            }
        });
        LongPressGesture.onActionCancel((event?: GestureEvent) => {
            if (this.model && event) {
                this.model.onLongPress(false, 'Cancel', event);
            }
        });
        LongPressGesture.pop();
        PinchGesture.create({ fingers: 2 });
        PinchGesture.onActionStart((event?: GestureEvent) => {
            if (this.model && event) {
                this.model.onPinch(false, 'Start', event);
            }
        });
        PinchGesture.onActionUpdate((event?: GestureEvent) => {
            if (this.model && event) {
                this.model.onPinch(false, 'Update', event);
            }
        });
        PinchGesture.onActionEnd((event?: GestureEvent) => {
            if (this.model && event) {
                this.model.onPinch(false, 'End', event);
            }
        });
        PinchGesture.onActionCancel((event?: GestureEvent) => {
            if (this.model && event) {
                this.model.onPinch(false, 'Cancel', event);
            }
        });
        PinchGesture.pop();
        GestureGroup.pop();
        Gesture.pop();
        Canvas.pop();
        If.create();
        if (this.customUiInfo && this.customUiInfo.showUi) {
            If.branchId(0);
            this.customUiBuilder(this);
        }
        If.pop();
        Stack.pop();
        Column.pop();
    }
}
