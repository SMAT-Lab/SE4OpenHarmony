interface Delivery_Params {
    model?: SmartRefreshForDeliverySample.Model;
    time?: number;
    umbrellaPaths?: Array<Drawable3PathsParam>;
    umbrellaColors?: Array<number>;
    cloudPaths?: Array<Drawable3PathsParam>;
    cloudColors?: Array<number>;
    boxPaths?: Array<Drawable3PathsParam>;
    boxColors?: Array<number>;
    lastRefreshState?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Delivery_" + ++__generate__Id;
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
import SmartRefreshForDeliverySample from "./SmartRefreshForDeliverySample";
import systemDateTime from '@ohos.systemDateTime';
class Drawable3PathsParam {
    index: number = 0;
    content: string = "";
}
export class Delivery extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new SynchedPropertyObjectTwoWay(params.model, this, "model");
        this.__time = new ObservedPropertySimple(0, this, "time");
        this.umbrellaPaths = [
            { index: 0, content: "m114,329 5,2 16,28h-1zM2,144.5c-4,-77 50,-122 96,-135 6,0 7.1,.2 13,3.5v4.5C63,55.1 56,97.1 43,154.5 37.6,195 16,191 2,144.5Z" },
            { index: 1, content: "m134,359 -1,-27h2.6l-1,26zm-24,-34.6c0,-1 -2,-3.6 -4.5,-6C88,300 7,218.5 2,144.5c18,43.6 33,45 41,10 0,-71 34,-125.5 68,-137 2,3 4,4.5 8,7.5C97,91 96.5,109.4 95.5,175.4 86.5,205 58,208.5 43,154.5c14,64 32,101.6 60.6,147 6,8 15.4,18.5 15.4,29.5 -3.8,-1.3 -8.27988,-2.8 -9,-6.6zM98.5,9.5c4.6,-1.5 18,-4.6 34,-5 1,1 1,2 1,3 -9,1 -16,3 -22,6 -2.5,-1 -8,-3 -13,-4z" },
            { index: 2, content: "m119,331c-1,-7.6 -4,-12 -6.5,-16 -37,-55 -64,-98.9 -69.5,-160.5 20,46 41.5,48.5 52.5,20.9C93.5,122.9 87,84 119,25l31,-.1c40,60.5 25.2,136.5 22.2,150.1 -14,53 -66.7,33.4 -76.7,.4 11.5,50.5 19.7,89.1 29.7,136.1 4,10 4.2,10.1 5,21.5 -3,0 -8,-1 -11,-2z" },
            { index: 3, content: "m172,174.5c5,-51.6 -2,-106 -22,-149.6 2.5,-3 3,-4 6.6,-6 48,22.5 77.5,63 69,140 -24.8,55.8 -48.1,39.2703 -53.6,15.6zM154.6,14C148,11 142.4,9 133,7c0,-1 -.5,-1.5 -.5,-2.5 16,0 31.5,3.5 40.9,6.5C167.9,11 158.6,12 154.6,14Z" },
            { index: 4, content: "m134,359 15,-28 2,-1 -16,29zm7,-26c0,-12 2,-14.4 4,-21.9 12,-47 16,-77.5 27,-137 12,38.5 37.1,22.9 53.6,-15.2 -4,54 -44.6,120.2 -69.6,154.2 -6,9.5 -7.4,16.9 -5,16.9 -2.4,1.4 -6.5,2.4 -10,3z" },
            { index: 5, content: "m225.6,159c1.6,-52 -22,-117 -69,-140 -1.5,-2 -1.6,-2 -2,-5 4,-3 9,-5 15,-4 48.6,10 103,67 96.6,132 -10,46 -35.5,52 -40.6,17z" },
            { index: 6, content: "m156,313.1c33,-59 54.6,-86.2 69.6,-154.2 12,38 28.9,22.1 40.5,-16.9 -2,50.6 -43,113 -99.6,171 -4.6,5 -8,9 -8,10 0,2 -3.5,5 -7,7 -4.6,1 1.5,-13.9 4.5,-16.9z" },
            { index: 7, content: "m130,333c-.5,-11.5 -1.4,-12 -5,-22 -11,-30 -23.5,-89.1 -29.5,-135.6 16.5,39 59.5,33.1 76.5,-.9 -6,59 -11,88.5 -27,139 -2,7 -3,11.6 -4,19.5 -3,.5 -6.5,.5 -11,0zM119,25c-3.5,-1 -7,-3.5 -8,-7.5V13c2.5,-4.5 14.5,-6 22,-6 5,0 15,1 21,6 2,1.6 3.2,3.9 2.6,5.9 -1,3 -4,5 -6.6,6 -14.8,4.2 -31.0,.1 -31,.1z" },
        ];
        this.umbrellaColors = [
            0xff92dfeb,
            0xff6dd0e9,
            0xff4fc3e7,
            0xff2fb6e6,
            0xff25a9de,
            0xff11abe4,
            0xff0e9bd8,
            0xff40b7e1
        ];
        this.cloudPaths = [
            { index: 0, content: "M63,0A22.6,22 0,0 0,42 14,17 17,0 0,0 30.9,10 17,17 0,0 0,13.7 26,9 9,0 0,0 9,24 9,9 0,0 0,0 32h99a8,8 0,0 0,0 -.6,8 8,0 0,0 -8,-8 8,8 0,0 0,-6 2.6,22.6 22,0 0,0 0,-3.6A22.6,22 0,0 0,63 0Z" }
        ];
        this.cloudColors = [
            0xffffffff
        ];
        this.boxPaths = [
            { index: 0, content: "M0,17.5 L3,30 2.9,76 47.5,93 92.8,76V30L95,18 47,.5Z" },
            { index: 1, content: "M3,30 L48,46 47.5,93 2.9,76ZM0,17.5 L48,35 48,46 0,29Z" },
            { index: 2, content: "m56.5,18c0,2 -3.8,3.8 -8.5,3.8 -4.7,0 -8.5,-1.7 -8.5,-3.8 0,-2 3.8,-3.8 8.5,-3.8 4.7,0 8.5,1.7 8.5,3.8zM3,30 L3,34.7l44.7,17 0,-5z" },
            { index: 3, content: "M48,35 L47.5,93 92.8,76V30l2,-.8 0,-10.9z" },
            { index: 4, content: "M82.6,80 L92.8,62 92.8,76ZM47.6,80 L60,88 47.5,93ZM48,46 L92.8,30 92.8,34 48,51.6Z" }
        ];
        this.boxColors = [
            0xfff8b147,
            0xfff2973c,
            0xffed8030,
            0xfffec051,
            0xfff7ad49
        ];
        this.lastRefreshState = SmartRefreshForDeliverySample.REFRESHSTATE.NONE;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Delivery_Params) {
        if (params.time !== undefined) {
            this.time = params.time;
        }
        if (params.umbrellaPaths !== undefined) {
            this.umbrellaPaths = params.umbrellaPaths;
        }
        if (params.umbrellaColors !== undefined) {
            this.umbrellaColors = params.umbrellaColors;
        }
        if (params.cloudPaths !== undefined) {
            this.cloudPaths = params.cloudPaths;
        }
        if (params.cloudColors !== undefined) {
            this.cloudColors = params.cloudColors;
        }
        if (params.boxPaths !== undefined) {
            this.boxPaths = params.boxPaths;
        }
        if (params.boxColors !== undefined) {
            this.boxColors = params.boxColors;
        }
        if (params.lastRefreshState !== undefined) {
            this.lastRefreshState = params.lastRefreshState;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__time.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: SynchedPropertySimpleOneWay<SmartRefreshForDeliverySample.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: SmartRefreshForDeliverySample.Model) {
        this.__model.set(newValue);
    }
    private __time: ObservedPropertySimple<number>;
    get time() {
        return this.__time.get();
    }
    set time(newValue: number) {
        this.__time.set(newValue);
    }
    private umbrellaPaths: Array<Drawable3PathsParam>;
    private umbrellaColors: Array<number>;
    private cloudPaths: Array<Drawable3PathsParam>;
    private cloudColors: Array<number>;
    private boxPaths: Array<Drawable3PathsParam>;
    private boxColors: Array<number>;
    private lastRefreshState;
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
            if (this.lastRefreshState == SmartRefreshForDeliverySample.REFRESHSTATE.TOREFRESH && this.model.refreshState == SmartRefreshForDeliverySample.REFRESHSTATE.REFRESHING) {
                this.time = 0;
            }
            this.time += 1;
            this.lastRefreshState = this.model.refreshState;
        }, 50);
    }
    render() {
        Flex.create();
        If.create();
        if (this.model.refreshState == SmartRefreshForDeliverySample.REFRESHSTATE.REFRESHING) { //松开过后的刷新样式
            If.branchId(0);
            Stack.create({ alignContent: Alignment.TopStart });
            Stack.width("100%");
            //云朵
            ForEach.create("2", this, ObservedObject.GetRawObject(this.cloudPaths), (item: Drawable3PathsParam) => {
                Path.create();
                Path.commands(item.content);
                Path.fill(this.cloudColors[item.index]);
                Path.width("100%");
                Path.height(this.model.headerHeight);
                Path.scale({
                    x: 0.6,
                    y: 0.6
                });
                Path.translate({
                    x: (180 + this.time * 25) % px2vp(lpx2px(720)) - 20,
                    y: this.model.initHeaderHeight / 1.5 + 30
                });
            }, (item: Drawable3PathsParam) => item.index.toString());
            //云朵
            ForEach.pop();
            //云朵
            ForEach.create("3", this, ObservedObject.GetRawObject(this.cloudPaths), (item: Drawable3PathsParam) => {
                Path.create();
                Path.commands(item.content);
                Path.fill(this.cloudColors[item.index]);
                Path.width("100%");
                Path.height(this.model.headerHeight);
                Path.scale({
                    x: 0.6,
                    y: 0.6
                });
                Path.translate({
                    x: (250 + this.time * 10) % px2vp(lpx2px(720)) - 20,
                    y: this.model.initHeaderHeight / 1.5
                });
            }, (item: Drawable3PathsParam) => item.index.toString());
            //云朵
            ForEach.pop();
            //云朵
            ForEach.create("4", this, ObservedObject.GetRawObject(this.cloudPaths), (item: Drawable3PathsParam) => {
                Path.create();
                Path.commands(item.content);
                Path.fill(this.cloudColors[item.index]);
                Path.width("100%");
                Path.height(this.model.headerHeight);
                Path.scale({
                    x: 0.6,
                    y: 0.6
                });
                Path.translate({
                    x: (50 + this.time * 20) % px2vp(lpx2px(720)) - 20,
                    y: this.model.initHeaderHeight / 1.5 - 30
                });
            }, (item: Drawable3PathsParam) => item.index.toString());
            //云朵
            ForEach.pop();
            //箱子
            ForEach.create("5", this, ObservedObject.GetRawObject(this.boxPaths), (item: Drawable3PathsParam) => {
                Path.create();
                Path.commands(item.content);
                Path.fill(this.boxColors[item.index]);
                Path.width("100%");
                Path.height(this.model.headerHeight);
                Path.rotate({
                    x: 0,
                    y: 1,
                    z: 0,
                    angle: (this.model.getOffset() == 1 ? (this.time % 40 > 20 ? this.time % 20 - 10 : -(this.time % 40 - 10)) : 0) * 0.5,
                    centerX: '50%',
                    centerY: '50%'
                });
                Path.scale({
                    x: 0.6,
                    y: 0.6
                });
                Path.translate({
                    x: px2vp(lpx2px(720 / 2)) - 50 + 1.5 * (this.model.getOffset() <= 1 ? (this.time % 40 > 20 ? this.time % 20 - 10 : -(this.time % 40 - 10)) : 0),
                    y: this.model.initHeaderHeight - 90 + (this.model.getOffset() > 1 ? (this.model.getOffset() - 1) * this.model.initHeaderHeight : 0)
                        + (this.model.getOffset() == 1 ? (this.time % 40 > 20 ? this.time % 20 - 10 : -(this.time % 40 - 10)) : 0)
                });
            }, (item: Drawable3PathsParam) => item.index.toString());
            //箱子
            ForEach.pop();
            //气球
            ForEach.create("6", this, ObservedObject.GetRawObject(this.umbrellaPaths), (item: Drawable3PathsParam) => {
                Path.create();
                Path.commands(item.content);
                Path.fill(this.umbrellaColors[item.index]);
                Path.width("100%");
                Path.height(this.model.headerHeight);
                Path.margin({ left: 45, top: 160 });
                Path.rotate({
                    x: 0,
                    y: 1,
                    z: 0,
                    angle: (this.model.getOffset() == 1 ? (this.time % 40 > 20 ? this.time % 20 - 10 : -(this.time % 40 - 10)) : 0) * 0.5,
                    centerX: '50%',
                    centerY: '50%'
                });
                Path.scale({
                    x: 0.6,
                    y: 0.6
                });
                Path.translate({
                    x: px2vp(lpx2px(720 / 2)) - 110 + 1.5 * (this.model.getOffset() <= 1 ? (this.time % 40 > 20 ? this.time % 20 - 10 : -(this.time % 40 - 10)) : 0),
                    y: -110 - (this.model.getOffset() > 1 ? (this.model.getOffset() - 1) * this.model.initHeaderHeight / 2 : 0)
                        + (this.model.getOffset() == 1 ? (this.time % 40 > 20 ? this.time % 20 - 10 : -(this.time % 40 - 10)) : 0) + (this.time < 20 ? (this.time - 20) * 4 : 0)
                });
            }, (item: Drawable3PathsParam) => item.index.toString());
            //气球
            ForEach.pop();
            Stack.pop();
        }
        else if (this.model.refreshState == SmartRefreshForDeliverySample.REFRESHSTATE.TOREFRESH) { //拖住过程中的样式
            If.branchId(1);
            Stack.create({ alignContent: Alignment.TopStart });
            Stack.width("100%");
            ForEach.create("7", this, ObservedObject.GetRawObject(this.boxPaths), (item: Drawable3PathsParam) => {
                Path.create();
                Path.commands(item.content);
                Path.fill(this.boxColors[item.index]);
                Path.width("100%");
                Path.height(this.model.headerHeight);
                Path.scale({
                    x: 0.5,
                    y: 0.5
                });
                Path.translate({ x: px2vp(lpx2px(720 / 2)) - 20, y: this.model.headerHeight - 40 });
            }, (item: Drawable3PathsParam) => item.index.toString());
            ForEach.pop();
            Stack.pop();
        }
        If.pop();
        Flex.pop();
    }
}
