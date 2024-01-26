interface Index_Params {
    xcomponentId?;
    panOption?: PanGestureOptions;
    axisSelected?: number;
    axisSelects?: Array<SelectOption>;
    axisValue?: Array<number>;
    dirSelected?: number;
    dirSelects?: Array<SelectOption>;
    dirValue?: Array<number>;
    mode?: Mode;
    preMousePosX?: number;
    preMousePosY?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
var { Axis, Face, RotateDir, Mode, updateAngle, twist, resetAngle } = globalThis.requireNapi("magiccube", true);
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.xcomponentId = 'magiccube';
        this.panOption = new PanGestureOptions({ direction: PanDirection.All });
        this.__axisSelected = new ObservedPropertySimple(0, this, "axisSelected");
        this.axisSelects = [{ value: 'X轴' }, { value: 'Y轴' }, { value: 'Z轴' }];
        this.axisValue = [Axis.X, Axis.Y, Axis.Z];
        this.__dirSelected = new ObservedPropertySimple(0, this, "dirSelected");
        this.dirSelects = [{ value: '左面' }, { value: '中间面' }, { value: '右面' }];
        this.dirValue = [Face.Left, Face.Middle, Face.Right];
        this.mode = Mode.Free;
        this.preMousePosX = 0;
        this.preMousePosY = 0;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.xcomponentId !== undefined) {
            this.xcomponentId = params.xcomponentId;
        }
        if (params.panOption !== undefined) {
            this.panOption = params.panOption;
        }
        if (params.axisSelected !== undefined) {
            this.axisSelected = params.axisSelected;
        }
        if (params.axisSelects !== undefined) {
            this.axisSelects = params.axisSelects;
        }
        if (params.axisValue !== undefined) {
            this.axisValue = params.axisValue;
        }
        if (params.dirSelected !== undefined) {
            this.dirSelected = params.dirSelected;
        }
        if (params.dirSelects !== undefined) {
            this.dirSelects = params.dirSelects;
        }
        if (params.dirValue !== undefined) {
            this.dirValue = params.dirValue;
        }
        if (params.mode !== undefined) {
            this.mode = params.mode;
        }
        if (params.preMousePosX !== undefined) {
            this.preMousePosX = params.preMousePosX;
        }
        if (params.preMousePosY !== undefined) {
            this.preMousePosY = params.preMousePosY;
        }
    }
    aboutToBeDeleted() {
        this.__axisSelected.aboutToBeDeleted();
        this.__dirSelected.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private xcomponentId;
    private panOption: PanGestureOptions;
    private __axisSelected: ObservedPropertySimple<number>;
    get axisSelected() {
        return this.__axisSelected.get();
    }
    set axisSelected(newValue: number) {
        this.__axisSelected.set(newValue);
    }
    private axisSelects: Array<SelectOption>;
    private axisValue: Array<number>;
    private __dirSelected: ObservedPropertySimple<number>;
    get dirSelected() {
        return this.__dirSelected.get();
    }
    set dirSelected(newValue: number) {
        this.__dirSelected.set(newValue);
    }
    private dirSelects: Array<SelectOption>;
    private dirValue: Array<number>;
    private mode: Mode;
    private preMousePosX: number;
    private preMousePosY: number;
    render() {
        Row.create();
        Row.width('100%');
        Row.height('100%');
        XComponent.create({ id: this.xcomponentId, type: 'surface', libraryname: 'magiccube' });
        Gesture.create(GesturePriority.Low);
        PanGesture.create(this.panOption);
        PanGesture.onActionUpdate((event) => {
            if (this.mode == Mode.Free) {
                updateAngle(event.offsetX, event.offsetY);
            }
        });
        PanGesture.onActionStart((event) => {
            this.preMousePosX = event.fingerList[0].localX;
            this.preMousePosY = event.fingerList[0].localY;
        });
        PanGesture.onActionEnd((event) => {
            if (this.mode == Mode.Regular) {
                let axis: Axis;
                let face: Face;
                let dir: RotateDir;
                let px = event.fingerList[0].localX - this.preMousePosX;
                let py = event.fingerList[0].localY - this.preMousePosY;
                let abx: number = Math.abs(px);
                let aby: number = Math.abs(py);
                if (abx > aby && aby < 80) {
                    axis = Axis.Y;
                    dir = px < 0 ? RotateDir.clockwise : RotateDir.Counterclockwise;
                    if (this.preMousePosY < 330 && this.preMousePosY > 250) {
                        face = Face.Left;
                    }
                    else if (this.preMousePosY < 250 && this.preMousePosY > 170) {
                        face = Face.Middle;
                    }
                    else if (this.preMousePosY < 170 && this.preMousePosY > 90) {
                        face = Face.Right;
                    }
                    else {
                        return;
                    }
                }
                else if (aby > abx && abx < 80) {
                    axis = Axis.X;
                    dir = py < 0 ? RotateDir.clockwise : RotateDir.Counterclockwise;
                    if (this.preMousePosX > 240 && this.preMousePosX < 320) {
                        face = Face.Right;
                    }
                    else if (this.preMousePosX > 160 && this.preMousePosX < 240) {
                        face = Face.Middle;
                    }
                    else if (this.preMousePosX > 80 && this.preMousePosX < 160) {
                        face = Face.Left;
                    }
                    else {
                        return;
                    }
                }
                else {
                    return;
                }
                twist(axis, face, dir, this.mode);
            }
        });
        PanGesture.pop();
        Gesture.pop();
        XComponent.width('50%');
        XComponent.height('100%');
        Tabs.create();
        Tabs.width('50%');
        Tabs.height('100%');
        Tabs.onChange((index) => {
            if (index == 1) {
                resetAngle();
                this.mode = Mode.Regular;
            }
            else if (index == 0) {
                this.mode = Mode.Free;
            }
        });
        TabContent.create();
        TabContent.tabBar("视角自由模式");
        Column.create();
        Column.width('50%');
        Column.height('100%');
        Text.create("Opengl魔方sample");
        Text.fontSize("20vp");
        Text.fontWeight(FontWeight.Bold);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Divider.create();
        Divider.strokeWidth(8);
        Divider.color('#F1F3F5');
        Text.create("扭动魔方");
        Text.pop();
        Row.create();
        Select.create(this.dirSelects);
        Select.selected(this.dirSelected);
        Select.value(this.dirSelects[this.dirSelected].value.toString());
        Select.onSelect((index) => {
            this.dirSelected = index;
        });
        Select.pop();
        Text.create("绕");
        Text.pop();
        Select.create(this.axisSelects);
        Select.selected(this.axisSelected);
        Select.value(this.axisSelects[this.axisSelected].value.toString());
        Select.onSelect((index) => {
            this.axisSelected = index;
        });
        Select.pop();
        Button.createWithLabel("旋转");
        Button.onClick((event) => {
            twist(this.axisValue[this.axisSelected], this.dirValue[this.dirSelected], RotateDir.Counterclockwise, Mode.Regular);
        });
        Button.pop();
        Row.pop();
        Column.pop();
        TabContent.pop();
        TabContent.create();
        TabContent.tabBar("视角固定模式");
        Column.create();
        Column.justifyContent(FlexAlign.Start);
        Text.create("Opengl魔方sample");
        Text.fontSize("20vp");
        Text.fontWeight(FontWeight.Bold);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Text.create("左侧滑动扭魔方");
        Text.pop();
        Text.create("方向键(调整视角)");
        Text.pop();
        Divider.create();
        Divider.strokeWidth(8);
        Divider.color('#F1F3F5');
        Row.create();
        Row.justifyContent(FlexAlign.Center);
        Button.createWithLabel("↑");
        Button.onClick(() => updateAngle(0, 90));
        Button.pop();
        Row.pop();
        Row.create();
        Row.justifyContent(FlexAlign.Center);
        Button.createWithLabel("←");
        Button.onClick(() => updateAngle(90, 0));
        Button.pop();
        Button.createWithLabel("↓");
        Button.onClick(() => updateAngle(0, -90));
        Button.pop();
        Button.createWithLabel("→");
        Button.onClick(() => updateAngle(-90, 0));
        Button.pop();
        Row.pop();
        Column.pop();
        TabContent.pop();
        Tabs.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
