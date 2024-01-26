interface ScatterChart_Params {
    model?: ScatterChartModel | null;
    setting?: RenderingContextSettings;
    context2D?: CanvasRenderingContext2D;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ScatterChart_" + ++__generate__Id;
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
import ScatterChartModel from '../charts/ScatterChartModel';
export class ScatterChart extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.model = null;
        this.setting = new RenderingContextSettings(true);
        this.context2D = new CanvasRenderingContext2D(this.setting);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ScatterChart_Params) {
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.setting !== undefined) {
            this.setting = params.setting;
        }
        if (params.context2D !== undefined) {
            this.context2D = params.context2D;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private model: ScatterChartModel | null;
    private setting: RenderingContextSettings;
    private context2D: CanvasRenderingContext2D;
    render() {
        Column.create();
        Canvas.create(this.context2D);
        Canvas.onReady(() => {
            if (this.model) {
                this.model.setContext2D(this.context2D);
            }
        });
        Canvas.onAreaChange((oldArea: Area, newArea: Area) => {
            if (this.model) {
                this.model.onChartSizeChanged(Number(newArea.width), Number(newArea.height), Number(oldArea.width), Number(oldArea.height));
                this.model.onDraw(this.context2D);
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
            }
        });
        TapGesture.pop();
        TapGesture.create({ count: 1 });
        TapGesture.onAction((event?: GestureEvent) => {
            if (event && this.model) {
                this.model.onSingleTapUp(false, event);
            }
        });
        TapGesture.pop();
        LongPressGesture.create();
        LongPressGesture.onAction((event?: GestureEvent) => {
            if (this.model && event) {
                this.model.onLongPress(false, 'Down', event);
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
        Column.pop();
    }
}
