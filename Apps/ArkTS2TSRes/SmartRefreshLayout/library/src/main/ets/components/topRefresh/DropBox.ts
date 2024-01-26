interface DropBox_Params {
    model?: SmartRefreshForDropBoxSample.Model;
    boxColor?: Array<number>;
    time?: number;
    refresh?: boolean;
    drawable1Paths?: Array<Drawable3PathsParam>;
    drawable1Colors?: Array<number>;
    drawable2Paths?: Array<Drawable3PathsParam>;
    drawable2Colors?: Array<number>;
    drawable3Paths?: Array<Drawable3PathsParam>;
    drawable3Colors?: Array<number>;
    lastRefreshState?: ESObject;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "DropBox_" + ++__generate__Id;
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
import SmartRefreshForDropBoxSample from "./SmartRefreshForDropBoxSample";
class Drawable3PathsParam {
    index: number = 0;
    content: string = "";
}
export class DropBox extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new SynchedPropertyObjectTwoWay(params.model, this, "model");
        this.__boxColor = new ObservedPropertyObject([0xff4169E1, 0xff6ea9ff], this, "boxColor");
        this.__time = new ObservedPropertySimple(-20, this, "time");
        this.__refresh = new ObservedPropertySimple(false, this, "refresh");
        this.drawable1Paths = [
            { index: 0, content: "M3 2h18v20h-18z" },
            { index: 1, content: "m4 1c-1 0 -2 1 -2 2v18c0 1 1 2 2 2h16c1 0 2 -1 2 -2v-18c0 -1 -1 -2 -2 -2h-16zM3.5 3h1c0 0 .5 0 .5 .5v1c0 0 0 .5 -.5 .5h-1c-0 0 -.5 0 -.5 -.5v-1c0 0 0 -.5 .5 -.5zM19.5 3h1c0 0 .5 0 .5 .5v1c0 0 0 .5 -.5 .5h-1c-0 0 -.5 0 -.5 -.5v-1c0 0 0 -.5 .5 -.5zM3.5 6h1c0 0 .5 0 .5 .5v1c0 0 0 .5 -.5 .5h-1c-0 0 -.5 0 -.5 -.5v-1c0 0 0 -.5 .5 -.5zM19.5 6h1c0 0 .5 0 .5 .5v1c0 0 0 .5 -.5 .5h-1c-0 0 -.5 0 -.5 -.5v-1c0 0 0 -.5 .5 -.5zM3.5 9h1c0 0 .5 0 .5 .5v1c0 0 0 .5 -.5 .5h-1c-0 0 -.5 0 -.5 -.5v-1c0 0 0 -.5 .5 -.5zM19.5 9h1c0 0 .5 0 .5 .5v1c0 0 0 .5 -.5 .5h-1c-0 0 -.5 0 -.5 -.5v-1c0 0 0 -.5 .5 -.5zM3.5 12h1c0 0 .5 0 .5 .5v1c0 0 0 .5 -.5 .5h-1c-0 0 -.5 0 -.5 -.5v-1c0 0 0 -.5 .5 -.5zM19.5 12h1c0 0 .5 0 .5 .5v1c0 0 0 .5 -.5 .5h-1c-0 0 -.5 0 -.5 -.5v-1c0 0 0 -.5 .5 -.5zM3.5 15h1c0 0 .5 0 .5 .5v1c0 0 0 .5 -.5 .5h-1c-0 0 -.5 0 -.5 -.5v-1c0 0 0 -.5 .5 -.5zM19.5 15h1c0 0 .5 0 .5 .5v1c0 0 0 .5 -.5 .5h-1c-0 0 -.5 0 -.5 -.5v-1c0 0 0 -.5 .5 -.5zM3.5 18h1c0 0 .5 0 .5 .5v1c0 0 0 .5 -.5 .5h-1c-0 0 -.5 0 -.5 -.5v-1c0 0 0 -.5 .5 -.5zM19.5 18h1c0 0 .5 0 .5 .5v1c0 0 0 .5 -.5 .5h-1c-0 0 -.5 0 -.5 -.5v-1c0 0 0 -.5 .5 -.5z" }
        ];
        this.drawable1Colors = [
            0xffecf0f1,
            0xfffc4108
        ];
        this.drawable2Paths = [
            { index: 0, content: "M49,16.5l-14,-14l-27,0l0,53l41,0z" },
            { index: 1, content: "m16,23.5h25c0.55,0 1,-.45 1,-1 0,-.55 -.45,-1 -1,-1L16,21.5c-.55,0 -1,.45 -1,1 0,.55 .45,1 1,1z" },
            { index: 2, content: "m16,15.5h10c0.55,0 1,-.45 1,-1 0,-.55 -.45,-1 -1,-1L16,13.5c-.55,0 -1,.45 -1,1 0,.55 .45,1 1,1z" },
            { index: 3, content: "M41,29.5L16,29.5c-.55,0 -1,.45 -1,1 0,.55 .45,1 1,1h25c0.55,0 1,-.45 1,-1 0,-.55 -.45,-1 -1,-1z" },
            { index: 4, content: "M41,37.5L16,37.5c-.55,0 -1,.45 -1,1 0,.55 .45,1 1,1h25c0.55,0 1,-.45 1,-1 0,-.55 -.45,-1 -1,-1z" },
            { index: 5, content: "M41,45.5L16,45.5c-.55,0 -1,.45 -1,1 0,.55 .45,1 1,1h25c0.55,0 1,-.45 1,-1 0,-.55 -.45,-1 -1,-1z" },
            { index: 6, content: "M49,16.5l-14,-14l0,14z" }
        ];
        this.drawable2Colors = [
            0xfffed469,
            0xffd5ae57
        ];
        this.drawable3Paths = [{
                index: 0,
                content: "M6,2.1L6,11.3C5.4,11.3 4.8,11.4 4.2,11.6C2.6,12.3 1.6,13.7 2.1,14.8C2.6,15.9 4.2,16.2 5.8,15.6C7.1,15.1 7.8,14.1 7.9,13.2L7.9,4.3L15,3L15,9.4C14.4,9.3 13.7,9.4 13,9.7C11.4,10.3 10.5,11.7 11,12.8C11.4,13.9 13.1,14.3 14.7,13.6C15.9,13.1 16.8,12.2 16.9,11.3L16.9,0L6,2.1L6,2.1Z"
            }];
        this.drawable3Colors = [0xff98d761];
        this.lastRefreshState = SmartRefreshForDropBoxSample.REFRESHSTATE.NONE;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: DropBox_Params) {
        if (params.boxColor !== undefined) {
            this.boxColor = params.boxColor;
        }
        if (params.time !== undefined) {
            this.time = params.time;
        }
        if (params.refresh !== undefined) {
            this.refresh = params.refresh;
        }
        if (params.drawable1Paths !== undefined) {
            this.drawable1Paths = params.drawable1Paths;
        }
        if (params.drawable1Colors !== undefined) {
            this.drawable1Colors = params.drawable1Colors;
        }
        if (params.drawable2Paths !== undefined) {
            this.drawable2Paths = params.drawable2Paths;
        }
        if (params.drawable2Colors !== undefined) {
            this.drawable2Colors = params.drawable2Colors;
        }
        if (params.drawable3Paths !== undefined) {
            this.drawable3Paths = params.drawable3Paths;
        }
        if (params.drawable3Colors !== undefined) {
            this.drawable3Colors = params.drawable3Colors;
        }
        if (params.lastRefreshState !== undefined) {
            this.lastRefreshState = params.lastRefreshState;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__boxColor.aboutToBeDeleted();
        this.__time.aboutToBeDeleted();
        this.__refresh.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: SynchedPropertySimpleOneWay<SmartRefreshForDropBoxSample.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: SmartRefreshForDropBoxSample.Model) {
        this.__model.set(newValue);
    }
    private __boxColor: ObservedPropertyObject<Array<number>>;
    get boxColor() {
        return this.__boxColor.get();
    }
    set boxColor(newValue: Array<number>) {
        this.__boxColor.set(newValue);
    }
    private __time: ObservedPropertySimple<number>;
    get time() {
        return this.__time.get();
    }
    set time(newValue: number) {
        this.__time.set(newValue);
    }
    private __refresh: ObservedPropertySimple<boolean>;
    get refresh() {
        return this.__refresh.get();
    }
    set refresh(newValue: boolean) {
        this.__refresh.set(newValue);
    }
    private drawable1Paths: Array<Drawable3PathsParam>;
    private drawable1Colors: Array<number>;
    private drawable2Paths: Array<Drawable3PathsParam>;
    private drawable2Colors: Array<number>;
    private drawable3Paths: Array<Drawable3PathsParam>;
    private drawable3Colors: Array<number>;
    private lastRefreshState: any;
    aboutToAppear() {
        this.model.setRefreshHeaderCallback(() => this.draw());
        if (this.model.initRefreshing) {
            this.model.refreshHeaderCallback();
            this.model.initRefreshing = false;
        }
    }
    aboutToDisappear(): void {
        if (this.model.headerRefreshId > 0) {
            clearInterval(this.model.headerRefreshId);
            this.model.headerRefreshId = -1;
        }
    }
    draw(): void {
        this.model.headerRefreshId = setInterval(() => {
            if (this.lastRefreshState == SmartRefreshForDropBoxSample.REFRESHSTATE.TOREFRESH && this.model.refreshState == SmartRefreshForDropBoxSample.REFRESHSTATE.REFRESHING) {
                this.time = -20;
            }
            this.time += 1;
            this.refresh = !this.refresh;
            this.lastRefreshState = this.model.refreshState;
        }, 20);
    }
    boxPath(str: string, color: number, parent = null) {
        Path.create();
        Path.commands(str);
        Path.fill(color);
        Path.width('100%');
        Path.height(this.model.headerHeight);
        Path.scale({
            x: 0.6,
            y: 0.6,
            centerX: 0,
            centerY: 0
        });
        Path.translate({
            x: -20,
            y: this.model.headerHeight - 110
        });
    }
    render() {
        Flex.create();
        If.create();
        if (this.refresh) {
            If.branchId(0);
            Text.create("0 ");
            Text.visibility(Visibility.None);
            Text.pop();
        }
        else {
            If.branchId(1);
            Text.create("1");
            Text.visibility(Visibility.None);
            Text.pop();
        }
        If.pop();
        If.create();
        if (this.model.refreshState == SmartRefreshForDropBoxSample.REFRESHSTATE.REFRESHING) { //松开过后的刷新样式
            If.branchId(0);
            Stack.create({ alignContent: Alignment.TopStart });
            Stack.width("100%");
            Stack.translate({
                x: '50%'
            });
            Path.create();
            Path.commands("M0 149L85 198L170 149Q170 99 170 49L85 0L0 49Q0 99 0 149Z");
            Path.fill(this.boxColor[0]);
            Path.width('100%');
            Path.height(this.model.headerHeight);
            Path.scale({
                x: 0.6,
                y: 0.6,
                centerX: 0,
                centerY: 0
            });
            Path.translate({
                x: -5,
                y: this.model.headerHeight - 105
            });
            Path.create();
            Path.commands("M0 49L85 0L"
                + (25 + ((this.time % 40 < 20 && this.time > 0) ? 20 * Math.sin((this.time % 40 < 20 ? this.time % 40 : 20 - this.time % 40) * Math.PI / 90) : 0)) + " "
                + (-30 - ((this.time % 40 < 20 && this.time > 0) ? 20 * Math.cos((this.time % 40 < 10 ? this.time % 40 : 20 - this.time % 40) * Math.PI / 90) : 0))
                + "L" + (-60 + ((this.time % 40 < 20 && this.time > 0) ? 20 * Math.sin((this.time % 40 < 20 ? this.time % 40 : 20 - this.time % 40) * Math.PI / 90) : 0)) + " "
                + (19 - ((this.time % 40 < 20 && this.time > 0) ? 20 * Math.cos((this.time % 40 < 10 ? this.time % 40 : 20 - this.time % 40) * Math.PI / 90) : 0))
                + " Z M170 49L85 0L"
                + (145 - ((this.time % 40 < 20 && this.time > 0) ? 20 * Math.sin((this.time % 40 < 20 ? this.time % 40 : 20 - this.time % 40) * Math.PI / 90) : 0)) + " "
                + (-30 - ((this.time % 40 < 20 && this.time > 0) ? 20 * Math.cos((this.time % 40 < 10 ? this.time % 40 : 20 - this.time % 40) * Math.PI / 90) : 0))
                + "L" + (230 - ((this.time % 40 < 20 && this.time > 0) ? 20 * Math.sin((this.time % 40 < 20 ? this.time % 40 : 20 - this.time % 40) * Math.PI / 90) : 0)) + " "
                + (19 - ((this.time % 40 < 20 && this.time > 0) ? 20 * Math.cos((this.time % 40 < 10 ? this.time % 40 : 20 - this.time % 40) * Math.PI / 90) : 0))
                + " Z");
            Path.fill(this.boxColor[1]);
            Path.width('100%');
            Path.height(this.model.headerHeight);
            Path.scale({
                x: 0.6,
                y: 0.6,
                centerX: 0,
                centerY: 0
            });
            Path.translate({
                x: -5,
                y: this.model.headerHeight - 105
            });
            //红包
            ForEach.create("2", this, ObservedObject.GetRawObject(this.drawable1Paths), (item: Drawable3PathsParam) => {
                Path.create();
                Path.commands(item.content);
                Path.fill(this.drawable1Colors[item.index]);
                Path.height(this.model.headerHeight);
                Path.scale({
                    x: 3,
                    y: 3,
                    centerX: 0,
                    centerY: 0
                });
                Path.translate({
                    y: (this.model.headerHeight - this.model.initHeaderHeight) / 3 + 100 + (this.time < 0 ? this.time * 4 : 0)
                });
                Path.height(this.model.headerHeight);
            }, (item: Drawable3PathsParam) => item.index.toString());
            //红包
            ForEach.pop();
            //红包
            ForEach.create("3", this, ObservedObject.GetRawObject(this.drawable1Paths), (item: Drawable3PathsParam) => {
                Path.create();
                Path.commands(item.content);
                Path.fill(this.drawable1Colors[item.index]);
                Path.height(this.model.headerHeight);
                Path.scale({
                    x: 3,
                    y: 3,
                    centerX: 0,
                    centerY: 0
                });
                Path.translate({
                    y: (this.model.headerHeight - this.model.initHeaderHeight) / 3 + 100 + ((this.time > 100 ? (this.time % 120 > 100 && this.time % 120 < 120 ? (this.time % 120 - 120) * 4 : 0) : 1000))
                });
                Path.height(this.model.headerHeight);
            }, (item: Drawable3PathsParam) => item.index.toString());
            //红包
            ForEach.pop();
            //文件
            ForEach.create("4", this, ObservedObject.GetRawObject(this.drawable2Paths), (item: Drawable3PathsParam) => {
                Path.create();
                Path.commands(item.content);
                Path.fill(this.drawable2Colors[item.index]);
                Path.height(this.model.headerHeight);
                Path.scale({
                    x: 1.25,
                    y: 1.25,
                    centerX: 0,
                    centerY: 0
                });
                Path.translate({
                    y: (this.model.headerHeight - this.model.initHeaderHeight) / 1.25 + 100 + ((this.time > 20 ? (this.time < 40 ? (this.time - 40) * 4 : 0) : 1000))
                });
            }, (item: Drawable3PathsParam) => item.index.toString());
            //文件
            ForEach.pop();
            //文件
            ForEach.create("5", this, ObservedObject.GetRawObject(this.drawable2Paths), (item: Drawable3PathsParam) => {
                Path.create();
                Path.commands(item.content);
                Path.fill(this.drawable2Colors[item.index]);
                Path.height(this.model.headerHeight);
                Path.scale({
                    x: 1.25,
                    y: 1.25,
                    centerX: 0,
                    centerY: 0
                });
                Path.translate({
                    y: (this.model.headerHeight - this.model.initHeaderHeight) / 1.25 + 100 + (this.time > 140 ? (this.time % 120 > 20 && this.time % 120 < 40 ? (this.time % 120 - 40) * 4 : 0) : 1000)
                });
            }, (item: Drawable3PathsParam) => item.index.toString());
            //文件
            ForEach.pop();
            //音乐
            ForEach.create("6", this, ObservedObject.GetRawObject(this.drawable3Paths), (item: Drawable3PathsParam) => {
                Path.create();
                Path.commands(item.content);
                Path.fill(this.drawable3Colors[item.index]);
                Path.height(this.model.headerHeight);
                Path.scale({
                    x: 4,
                    y: 4,
                    centerX: 0,
                    centerY: 0
                });
                Path.translate({
                    y: (this.model.headerHeight - this.model.initHeaderHeight) / 4 + 100 + ((this.time > 60 ? (this.time < 80 ? (this.time - 80) * 4 : 0) : 1000))
                });
            }, (item: Drawable3PathsParam) => item.index.toString());
            //音乐
            ForEach.pop();
            //音乐
            ForEach.create("7", this, ObservedObject.GetRawObject(this.drawable3Paths), (item: Drawable3PathsParam) => {
                Path.create();
                Path.commands(item.content);
                Path.fill(this.drawable3Colors[item.index]);
                Path.height(this.model.headerHeight);
                Path.scale({
                    x: 4,
                    y: 4,
                    centerX: 0,
                    centerY: 0
                });
                Path.translate({
                    y: (this.model.headerHeight - this.model.initHeaderHeight) / 4 + 100 + (this.time > 180 ? (this.time % 120 > 60 && this.time % 120 < 80 ? (this.time % 120 - 80) * 4 : 0) : 1000)
                });
            }, (item: Drawable3PathsParam) => item.index.toString());
            //音乐
            ForEach.pop();
            Path.create();
            Path.commands("M0 149L85 198L170 149Q"
                + (170 + (this.time % 40 < 20 ? (this.time % 40 < 10 ? this.time % 40 : 20 - this.time % 40) * 4 : 0))
                + " 99 170 49L85 100L0 49Q"
                + -(this.time % 40 < 20 ? (this.time % 40 < 10 ? this.time % 40 : 20 - this.time % 40) * 4 : 0)
                + " 99 0 149Z");
            Path.fill(this.boxColor[0]);
            Path.width('100%');
            Path.height(this.model.headerHeight);
            Path.scale({
                x: 0.6,
                y: 0.6,
                centerX: 0,
                centerY: 0
            });
            Path.translate({
                x: -5,
                y: this.model.headerHeight - 105
            });
            Path.create();
            Path.commands("M170 49L85 99L"
                + (145 + ((this.time % 40 < 20 && this.time > 0) ? 20 * Math.sin((this.time % 40 < 20 ? this.time % 40 : 20 - this.time % 40) * Math.PI / 90) : 0)) + " "
                + (129 - ((this.time % 40 < 20 && this.time > 0) ? 20 * Math.cos((this.time % 40 < 10 ? this.time % 40 : 20 - this.time % 40) * Math.PI / 90) : 0))
                + "L" + (230 + ((this.time % 40 < 20 && this.time > 0) ? 20 * Math.sin((this.time % 40 < 20 ? this.time % 40 : 20 - this.time % 40) * Math.PI / 90) : 0)) + " "
                + (79 - ((this.time % 40 < 20 && this.time > 0) ? 20 * Math.cos((this.time % 40 < 10 ? this.time % 40 : 20 - this.time % 40) * Math.PI / 90) : 0))
                + " Z M0 49L85 99L"
                + (25 + ((this.time % 40 < 20 && this.time > 0) ? 20 * Math.sin((this.time % 40 < 20 ? this.time % 40 : 20 - this.time % 40) * Math.PI / 90) : 0)) + " "
                + (129 - ((this.time % 40 < 20 && this.time > 0) ? 20 * Math.cos((this.time % 40 < 10 ? this.time % 40 : 20 - this.time % 40) * Math.PI / 90) : 0))
                + "L" + (-60 + ((this.time % 40 < 20 && this.time > 0) ? 20 * Math.sin((this.time % 40 < 20 ? this.time % 40 : 20 - this.time % 40) * Math.PI / 90) : 0)) + " "
                + (79 - ((this.time % 40 < 20 && this.time > 0) ? 20 * Math.cos((this.time % 40 < 10 ? this.time % 40 : 20 - this.time % 40) * Math.PI / 90) : 0))
                + " Z");
            Path.fill(this.boxColor[1]);
            Path.width('100%');
            Path.height(this.model.headerHeight);
            Path.scale({
                x: 0.6,
                y: 0.6,
                centerX: 0,
                centerY: 0
            });
            Path.translate({
                x: -5,
                y: this.model.headerHeight - 105
            });
            Stack.pop();
        }
        else if (this.model.refreshState == SmartRefreshForDropBoxSample.REFRESHSTATE.TOREFRESH) { //拖住过程中的样式
            If.branchId(1);
            Stack.create({ alignContent: Alignment.TopStart });
            Stack.width("100%");
            Stack.translate({
                x: '50%'
            });
            Path.create();
            Path.commands("M0 149L85 198L170 149Q170 99 170 49L85 0L0 49Q0 99 0 149Z");
            Path.fill(this.boxColor[0]);
            Path.width('100%');
            Path.height(this.model.headerHeight);
            Path.scale({
                x: 0.6,
                y: 0.6,
                centerX: 0,
                centerY: 0
            });
            Path.translate({
                x: -20,
                y: this.model.headerHeight - 110
            });
            Path.create();
            Path.commands("M0 49L85 0L25 -30L-60 19ZM170 49L85 0L145 -30L230 19ZM170 49L85 99L145 129L230 79ZM0 49L85 99L25 129L-60 79Z");
            Path.fill(this.boxColor[1]);
            Path.width('100%');
            Path.height(this.model.headerHeight);
            Path.scale({
                x: 0.6,
                y: 0.6,
                centerX: 0,
                centerY: 0
            });
            Path.translate({
                x: -20,
                y: this.model.headerHeight - 110
            });
            Stack.pop();
        }
        If.pop();
        Flex.pop();
    }
}
