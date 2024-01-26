interface TaurusBottomRefresh_Params {
    model?: SmartRefreshForTaurus.Model;
    angle?: number;
    refresh?: boolean;
    aircraftState?: boolean;
    mScale?: number;
    mUpDown?: number;
    flyAway?: boolean;
    x?: number;
    y?: number;
    airplanePaths?: Array<string>;
    airplaneColors?: Array<number>;
    cloudPaths?: Array<string>;
    windPath?: Array<string>;
    cloudColors?: Array<number>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TaurusBottomRefresh_" + ++__generate__Id;
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
import SmartRefreshForTaurus from "../topRefresh/SmartRefreshForTaurus";
export class TaurusBottomRefresh extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new SynchedPropertyObjectTwoWay(params.model, this, "model");
        this.__angle = new ObservedPropertySimple(0, this, "angle");
        this.__refresh = new ObservedPropertySimple(true, this, "refresh");
        this.aircraftState = true;
        this.mScale = 0;
        this.mUpDown = 0;
        this.__flyAway = new ObservedPropertySimple(false, this, "flyAway");
        this.__x = new ObservedPropertySimple(0, this, "x");
        this.__y = new ObservedPropertySimple(0, this, "y");
        this.airplanePaths = ["m23 81c0 0 0 -1 0 -1 0 -0.5 0 -1 1.5 -1 2 -1 2.6 -2 2 -2.5 -0.5 -1 -2 -1 -11.6 -2.5 -5 -1 -10 -1 -11 -1.5l-1 0 1 -1c1 -1 1 -1 2 -1 0.6 0 6 0 13 1 6 0 12 1 12.6 0.6l1 0 -1 -2C30 67 16 42 15 40.6l-0.5 -1 4 -1c2 -0.6 4 -1 4 -1 0 0 6 4 13 8.5 14.6 10 17 11 20 12 4.6 2 6 1.6 13 -0.6 13 -5 25 -9 26 -9 0.6 0 3.6 1 -24 -14L51 23 47 16 43 10 43.6 9c1 -1 1 -1 1 -0.5 0 0 4 3 7.5 6 4 3 7 6 7.5 6 0 0 13.6 3 29.5 6 16 3 32 6 35 7l6 1 3 -1c41.6 -14.6 68 -23 85 -28 15 -4 24 -5 32 -2.5 7 2 10 5 8 8 -1.6 2.5 -4.6 4.6 -10.6 7.5 -6 3 -10 4 -25 9 -8 2.6 -16.6 6 -39 14 -67 25 -88 31 -121.6 36 -14.5 2 -24 3 -34 3 -5 0 -5.5 0 -6 -0.5z"];
        this.airplaneColors = [0xffffffff];
        this.cloudPaths = [
            "M552 1A65 65 0 0 0 504 22A51 51 0 0 0 492 20A51 51 0 0 0 442 71A51 51 0 0 0 492 121A51 51 0 0 0 511 118A65 65 0 0 0 517 122L586 122A65 65 0 0 0 600 111A60 60 0 0 0 608 122L696 122A60 60 0 0 0 712 82A60 60 0 0 0 652 22A60 60 0 0 0 611 39A65 65 0 0 0 552 1zM246 2A55 55 0 0 0 195 37A47 47 0 0 0 168 28A47 47 0 0 0 121 75A47 47 0 0 0 168 121A47 47 0 0 0 209 97A55 55 0 0 0 246 111A55 55 0 0 0 269 107A39 39 0 0 0 281 122L328 122A39 39 0 0 0 343 91A39 39 0 0 0 304 52A39 39 0 0 0 301 52A55 55 0 0 0 246 2z",
            "m507 31a53 53 0 0 0 -53 53 53 53 0 0 0 16 38h75a53 53 0 0 0 2 -2 28 28 0 0 0 1 2h213a97 97 0 0 0 -87 -54.8 97 97 0 0 0 -73 34 28 28 0 0 0 -27 -19 28 28 0 0 0 -13 3 53 53 0 0 0 0 -1 53 53 0 0 0 -53 -53zM206 32a54 54 0 0 0 -50 34 74.9 74.9 0 0 0 -47 -17 74.9 74.9 0 0 0 -74 61 31 31 0 0 0 -10 -2 31 31 0 0 0 -26 14L301 122a38 38 0 0 0 0 -4 38 38 0 0 0 -38 -38 38 38 0 0 0 -4 0 54 54 0 0 0 -54 -49z",
            "m424 37a53 53 0 0 0 -41 19 53 53 0 0 0 -1 2 63 63 0 0 0 -5 0 63 63 0 0 0 -61 50 63 63 0 0 0 -1 4 16 16 0 0 0 -10 -4 16 16 0 0 0 -8 2 21 21 0 0 0 -18 -11 21 21 0 0 0 -19 13 22 22 0 0 0 -7 -1 22 22 0 0 0 -19 11L523 122a44 44 0 0 0 -43 -37 44 44 0 0 0 -3 0 53 53 0 0 0 -53 -48zM129 38a50 50 0 0 0 -50 50 50 50 0 0 0 2 15 15 16 0 0 0 -6 2 15 16 0 0 0 -1 1 17 16 0 0 0 -12 -5 17 16 0 0 0 -16 14 20 16 0 0 0 -15 7L224 122a43 43 0 0 0 1 -10 43 43 0 0 0 -43 -43 43 43 0 0 0 -7 1 50 50 0 0 0 -47 -32zM632 83a64 64 0 0 0 -45 18 27 27 0 0 0 -11 -2 27 27 0 0 0 -23 13 17 17 0 0 0 -7 -1 17 17 0 0 0 -16 12h160a64 64 0 0 0 -59 -39z",
        ];
        this.windPath = [
            "M1000 175 L1150 175 L1150 181 L1000 181z",
            "M1030 245 L1200 245 L1200 251 L1030 251z"
        ];
        this.cloudColors = [0xaac7dcf1, 0xdde8f3fd, 0xfffdfdfd, 0xeee8f3fd];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TaurusBottomRefresh_Params) {
        if (params.angle !== undefined) {
            this.angle = params.angle;
        }
        if (params.refresh !== undefined) {
            this.refresh = params.refresh;
        }
        if (params.aircraftState !== undefined) {
            this.aircraftState = params.aircraftState;
        }
        if (params.mScale !== undefined) {
            this.mScale = params.mScale;
        }
        if (params.mUpDown !== undefined) {
            this.mUpDown = params.mUpDown;
        }
        if (params.flyAway !== undefined) {
            this.flyAway = params.flyAway;
        }
        if (params.x !== undefined) {
            this.x = params.x;
        }
        if (params.y !== undefined) {
            this.y = params.y;
        }
        if (params.airplanePaths !== undefined) {
            this.airplanePaths = params.airplanePaths;
        }
        if (params.airplaneColors !== undefined) {
            this.airplaneColors = params.airplaneColors;
        }
        if (params.cloudPaths !== undefined) {
            this.cloudPaths = params.cloudPaths;
        }
        if (params.windPath !== undefined) {
            this.windPath = params.windPath;
        }
        if (params.cloudColors !== undefined) {
            this.cloudColors = params.cloudColors;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__angle.aboutToBeDeleted();
        this.__refresh.aboutToBeDeleted();
        this.__flyAway.aboutToBeDeleted();
        this.__x.aboutToBeDeleted();
        this.__y.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: SynchedPropertySimpleOneWay<SmartRefreshForTaurus.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: SmartRefreshForTaurus.Model) {
        this.__model.set(newValue);
    }
    private __angle: ObservedPropertySimple<number>;
    get angle() {
        return this.__angle.get();
    }
    set angle(newValue: number) {
        this.__angle.set(newValue);
    }
    private __refresh: ObservedPropertySimple<boolean>;
    get refresh() {
        return this.__refresh.get();
    }
    set refresh(newValue: boolean) {
        this.__refresh.set(newValue);
    }
    private aircraftState: boolean;
    private mScale: number;
    private mUpDown: number;
    private __flyAway: ObservedPropertySimple<boolean>;
    get flyAway() {
        return this.__flyAway.get();
    }
    set flyAway(newValue: boolean) {
        this.__flyAway.set(newValue);
    }
    private __x: ObservedPropertySimple<number>;
    get x() {
        return this.__x.get();
    }
    set x(newValue: number) {
        this.__x.set(newValue);
    }
    private __y: ObservedPropertySimple<number>;
    get y() {
        return this.__y.get();
    }
    set y(newValue: number) {
        this.__y.set(newValue);
    }
    public airplanePaths: Array<string>;
    public airplaneColors: Array<number>;
    public cloudPaths: Array<string>;
    public windPath: Array<string>;
    public cloudColors: Array<number>;
    Clouds(path: string, color: number, xPosition: number, parent = null) {
        Path.create();
        Path.commands(path);
        Path.fill(color);
        Path.position({
            x: xPosition,
            y: this.model.getOffset() >= 1 ? this.model.initHeaderHeight * this.model.getOffset() - 40 : this.model.initHeaderHeight - 40
        });
        Path.scale({
            x: 1 + this.mScale + (this.model.getOffset() >= 1 ? (this.model.getOffset() - 1) * 0.6 : 0),
            y: 1.3 + this.mScale + (this.model.getOffset() >= 1 ? (this.model.getOffset() - 1) * 0.6 : 0),
            z: 1,
            centerX: '50%',
            centerY: '100%'
        });
    }
    drawWind(index: number, parent = null) {
        Path.create();
        Path.commands(this.windPath[index]);
        Path.fill(0x6fffffff);
        Path.translate({
            x: -this.angle * 30 % 1800,
            y: 0
        });
    }
    aboutToAppear() {
        this.model.setZFooterHeight(-1);
        this.model.setRefreshBottomCallback(() => this.startDraw());
    }
    aboutToDisappear(): void {
        if (this.model.bottomRefreshId > 0) {
            clearInterval(this.model.bottomRefreshId);
            this.model.bottomRefreshId = -1;
        }
    }
    startDraw(): void {
        this.model.bottomRefreshId = setInterval(() => {
            this.angle = (this.angle + 1) % 65535;
            if (this.model.refreshState == SmartRefreshForTaurus.REFRESHSTATE.REFRESHING) {
                if (Math.floor(this.angle / 30) % 2 == 0) {
                    this.mScale = this.mScale + 0.002;
                    this.mUpDown = this.mUpDown + 0.25;
                }
                else if (Math.floor(this.angle / 30) % 2 == 1) {
                    this.mScale = this.mScale - 0.002;
                    this.mUpDown = this.mUpDown - 0.25;
                }
                if (this.flyAway == true) {
                    this.x = (this.x + 25);
                    this.y = (this.y - 10);
                }
                if (this.aircraftState) { //下拉释放后，只保证进入一次
                    this.aircraftState = false;
                    setTimeout(() => {
                        this.flyAway = true;
                    }, 2500);
                }
            }
            else if (this.model.refreshState == SmartRefreshForTaurus.REFRESHSTATE.TOREFRESH) {
                this.aircraftState = true;
                this.flyAway = false;
                this.x = this.y = 0;
            }
            this.refresh = !this.refresh;
        }, 100);
    }
    render() {
        Flex.create();
        If.create();
        if (this.model.refreshState == SmartRefreshForTaurus.REFRESHSTATE.REFRESHING) { //松开过后的刷新样式
            If.branchId(0);
            Stack.create({ alignContent: Alignment.TopStart });
            Stack.width("100%");
            Stack.height("100%");
            Stack.backgroundColor(this.model.backgroundColor);
            this.drawWind(0, this);
            this.drawWind(1, this);
            this.Clouds(this.cloudPaths[1], this.cloudColors[0], 140, this);
            this.Clouds(this.cloudPaths[0], this.cloudColors[0], 140, this);
            this.Clouds(this.cloudPaths[0], this.cloudColors[0], -50, this);
            this.Clouds(this.cloudPaths[1], this.cloudColors[0], -50, this);
            this.Clouds(this.cloudPaths[0], this.cloudColors[0], 60, this);
            this.Clouds(this.cloudPaths[1], this.cloudColors[1], 60, this);
            this.Clouds(this.cloudPaths[2], this.cloudColors[2], 60, this);
            Path.create();
            Path.width("100%");
            Path.height(this.model.headerHeight);
            Path.position({
                x: 100 + this.x,
                y: 70 + this.mUpDown + this.y
            });
            Path.commands(this.airplanePaths[0]);
            Path.fill(this.airplaneColors[0]);
            Path.scale({
                x: 0.5,
                y: 0.5
            });
            Path.rotate({
                x: 0,
                y: 0,
                z: 1,
                centerX: 85,
                centerY: 20,
                angle: this.model.getOffset() >= 1 ? (this.model.getOffset() - 1) * 20 : 0
            });
            Stack.pop();
        }
        else if (this.model.refreshState == SmartRefreshForTaurus.REFRESHSTATE.TOREFRESH) { //拖住过程中的样式
            If.branchId(1);
            Stack.create({ alignContent: Alignment.TopStart });
            Stack.width("100%");
            Stack.height("100%");
            Stack.backgroundColor(this.model.backgroundColor);
            this.Clouds(this.cloudPaths[1], this.cloudColors[0], 140, this);
            this.Clouds(this.cloudPaths[0], this.cloudColors[0], 140, this);
            this.Clouds(this.cloudPaths[0], this.cloudColors[0], -50, this);
            this.Clouds(this.cloudPaths[1], this.cloudColors[0], -50, this);
            this.Clouds(this.cloudPaths[0], this.cloudColors[0], 60, this);
            this.Clouds(this.cloudPaths[1], this.cloudColors[1], 60, this);
            this.Clouds(this.cloudPaths[2], this.cloudColors[2], 60, this);
            Path.create();
            Path.width("100%");
            Path.height(this.model.headerHeight);
            Path.position({
                x: -170 + (this.model.getOffset() <= 1 ? this.model.getOffset() * 250 : 250),
                y: 220 - (this.model.getOffset() <= 1 ? this.model.getOffset() * 150 : 150)
            });
            Path.scale({
                x: 0.5,
                y: 0.5
            });
            Path.commands(this.airplanePaths[0]);
            Path.fill(this.airplaneColors[0]);
            Path.rotate({
                x: 0,
                y: 0,
                z: 1,
                centerX: 85,
                centerY: 20,
                angle: this.model.getOffset() >= 1 ? (this.model.getOffset() - 1) * 20 : 0
            });
            Stack.pop();
        }
        If.pop();
        Flex.pop();
    }
}
