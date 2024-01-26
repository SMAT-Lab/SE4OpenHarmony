interface GcoordPage_Params {
    BD092GCJ02?: number[];
    GCJ022BD09?: number[];
    GCJ022WGS84?: number[];
    WGS842GCJ02?: number[];
    BD092WGS84?: number[];
    WGS842BD09?: number[];
    lat?: number;
    lon?: number;
    point?: number[];
    scroller?: Scroller;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "GcoordPage_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import gcoord from 'gcoord';
import { Position } from 'gcoord';
class GcoordPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__BD092GCJ02 = new ObservedPropertyObject([], this, "BD092GCJ02");
        this.__GCJ022BD09 = new ObservedPropertyObject([], this, "GCJ022BD09");
        this.__GCJ022WGS84 = new ObservedPropertyObject([], this, "GCJ022WGS84");
        this.__WGS842GCJ02 = new ObservedPropertyObject([], this, "WGS842GCJ02");
        this.__BD092WGS84 = new ObservedPropertyObject([], this, "BD092WGS84");
        this.__WGS842BD09 = new ObservedPropertyObject([], this, "WGS842BD09");
        this.__lat = new ObservedPropertySimple(39, this, "lat");
        this.__lon = new ObservedPropertySimple(116, this, "lon");
        this.point = [this.lon, this.lat];
        this.scroller = new Scroller();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: GcoordPage_Params) {
        if (params.BD092GCJ02 !== undefined) {
            this.BD092GCJ02 = params.BD092GCJ02;
        }
        if (params.GCJ022BD09 !== undefined) {
            this.GCJ022BD09 = params.GCJ022BD09;
        }
        if (params.GCJ022WGS84 !== undefined) {
            this.GCJ022WGS84 = params.GCJ022WGS84;
        }
        if (params.WGS842GCJ02 !== undefined) {
            this.WGS842GCJ02 = params.WGS842GCJ02;
        }
        if (params.BD092WGS84 !== undefined) {
            this.BD092WGS84 = params.BD092WGS84;
        }
        if (params.WGS842BD09 !== undefined) {
            this.WGS842BD09 = params.WGS842BD09;
        }
        if (params.lat !== undefined) {
            this.lat = params.lat;
        }
        if (params.lon !== undefined) {
            this.lon = params.lon;
        }
        if (params.point !== undefined) {
            this.point = params.point;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
    }
    aboutToBeDeleted() {
        this.__BD092GCJ02.aboutToBeDeleted();
        this.__GCJ022BD09.aboutToBeDeleted();
        this.__GCJ022WGS84.aboutToBeDeleted();
        this.__WGS842GCJ02.aboutToBeDeleted();
        this.__BD092WGS84.aboutToBeDeleted();
        this.__WGS842BD09.aboutToBeDeleted();
        this.__lat.aboutToBeDeleted();
        this.__lon.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __BD092GCJ02: ObservedPropertyObject<number[]>;
    get BD092GCJ02() {
        return this.__BD092GCJ02.get();
    }
    set BD092GCJ02(newValue: number[]) {
        this.__BD092GCJ02.set(newValue);
    }
    private __GCJ022BD09: ObservedPropertyObject<number[]>;
    get GCJ022BD09() {
        return this.__GCJ022BD09.get();
    }
    set GCJ022BD09(newValue: number[]) {
        this.__GCJ022BD09.set(newValue);
    }
    private __GCJ022WGS84: ObservedPropertyObject<number[]>;
    get GCJ022WGS84() {
        return this.__GCJ022WGS84.get();
    }
    set GCJ022WGS84(newValue: number[]) {
        this.__GCJ022WGS84.set(newValue);
    }
    private __WGS842GCJ02: ObservedPropertyObject<number[]>;
    get WGS842GCJ02() {
        return this.__WGS842GCJ02.get();
    }
    set WGS842GCJ02(newValue: number[]) {
        this.__WGS842GCJ02.set(newValue);
    }
    private __BD092WGS84: ObservedPropertyObject<number[]>;
    get BD092WGS84() {
        return this.__BD092WGS84.get();
    }
    set BD092WGS84(newValue: number[]) {
        this.__BD092WGS84.set(newValue);
    }
    private __WGS842BD09: ObservedPropertyObject<number[]>;
    get WGS842BD09() {
        return this.__WGS842BD09.get();
    }
    set WGS842BD09(newValue: number[]) {
        this.__WGS842BD09.set(newValue);
    }
    private __lat: ObservedPropertySimple<number>; //纬度
    get lat() {
        return this.__lat.get();
    }
    set lat(newValue: number) {
        this.__lat.set(newValue);
    }
    private __lon: ObservedPropertySimple<number>; //经度
    get lon() {
        return this.__lon.get();
    }
    set lon(newValue: number) {
        this.__lon.set(newValue);
    }
    private point: number[];
    private scroller: Scroller;
    render() {
        Scroll.create(this.scroller);
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.scrollBar(BarState.Off);
        Scroll.scrollBarColor(Color.Gray);
        Scroll.scrollBarWidth(1);
        Column.create();
        Column.padding({ top: 18, bottom: 18 });
        Column.create();
        TextInput.create({ text: this.lon.toString(), placeholder: '请输入经度' });
        TextInput.height(60);
        TextInput.fontSize(18);
        TextInput.type(InputType.Number);
        TextInput.margin(18);
        TextInput.maxLength(3);
        TextInput.onChange((value: string) => {
            if (value.length > 0) {
                this.lon = Number.parseFloat(value);
            }
            else {
                this.lon = 0;
            }
        });
        TextInput.create({ text: this.lat.toString(), placeholder: '请输入维度' });
        TextInput.height(60);
        TextInput.fontSize(18);
        TextInput.margin(18);
        TextInput.maxLength(2);
        TextInput.onChange((value: string) => {
            if (value.length > 0) {
                this.lat = Number.parseFloat(value);
            }
            else {
                this.lat = 0;
            }
        });
        Button.createWithLabel('全部转换');
        Button.fontSize(18);
        Button.onClick(() => {
            this.BD092GCJ02 = gcoord.transform<Position>([this.lon, this.lat], // 经纬度坐标
            gcoord.BD09, // 当前坐标系
            gcoord.GCJ02 // 目标坐标系
            );
            this.GCJ022BD09 = gcoord.transform<Position>([this.lon, this.lat], // 经纬度坐标
            gcoord.GCJ02, // 当前坐标系
            gcoord.BD09 // 目标坐标系
            );
            this.GCJ022WGS84 = gcoord.transform<Position>([this.lon, this.lat], // 经纬度坐标
            gcoord.GCJ02, // 当前坐标系
            gcoord.WGS84 // 目标坐标系
            );
            this.WGS842GCJ02 = gcoord.transform<Position>([this.lon, this.lat], // 经纬度坐标
            gcoord.WGS84, // 当前坐标系
            gcoord.GCJ02 // 目标坐标系
            );
            this.BD092WGS84 = gcoord.transform<Position>([this.lon, this.lat], // 经纬度坐标
            gcoord.BD09, // 当前坐标系
            gcoord.WGS84 // 目标坐标系
            );
            this.WGS842BD09 = gcoord.transform<Position>([this.lon, this.lat], // 经纬度坐标
            gcoord.WGS84, // 当前坐标系
            gcoord.BD09 // 目标坐标系
            );
        });
        Button.pop();
        Column.pop();
        Divider.create();
        Divider.strokeWidth(1);
        Divider.color('#F1F3F5');
        Divider.margin({ top: 8, bottom: 8 });
        Column.create();
        Button.createWithLabel('BD09 坐标转 GCJ02 坐标');
        Button.fontSize(18);
        Button.onClick(() => {
            this.BD092GCJ02 = gcoord.transform<Position>([this.lon, this.lat], // 经纬度坐标
            gcoord.BD09, // 当前坐标系
            gcoord.GCJ02 // 目标坐标系
            );
            console.log('BD09 坐标转 GCJ02 坐标:' + this.BD092GCJ02); // [116.41661560068297, 39.92196580126834]
        });
        Button.pop();
        Text.create('' + this.BD092GCJ02);
        Text.pop();
        Column.pop();
        Divider.create();
        Divider.strokeWidth(1);
        Divider.color('#F1F3F5');
        Divider.margin({ top: 8, bottom: 8 });
        Column.create();
        Button.createWithLabel('GCJ02 坐标转 BD09 坐标');
        Button.fontSize(18);
        Button.onClick(() => {
            this.GCJ022BD09 = gcoord.transform<Position>([this.lon, this.lat], // 经纬度坐标
            gcoord.GCJ02, // 当前坐标系
            gcoord.BD09 // 目标坐标系
            );
            console.log('GCJ02 坐标转 BD09 坐标:' + this.GCJ022BD09); // [116.41661560068297, 39.92196580126834]
        });
        Button.pop();
        Text.create('' + this.GCJ022BD09);
        Text.pop();
        Column.pop();
        Divider.create();
        Divider.strokeWidth(1);
        Divider.color('#F1F3F5');
        Divider.margin({ top: 8, bottom: 8 });
        Column.create();
        Button.createWithLabel('GCJ02  坐标转 WGS84  坐标');
        Button.fontSize(18);
        Button.onClick(() => {
            this.GCJ022WGS84 = gcoord.transform<Position>([this.lon, this.lat], // 经纬度坐标
            gcoord.GCJ02, // 当前坐标系
            gcoord.WGS84 // 目标坐标系
            );
            console.log('GCJ02 坐标转 WGS84 坐标:' + this.GCJ022WGS84); // [116.41661560068297, 39.92196580126834]
        });
        Button.pop();
        Text.create('' + this.GCJ022WGS84);
        Text.pop();
        Column.pop();
        Divider.create();
        Divider.strokeWidth(1);
        Divider.color('#F1F3F5');
        Divider.margin({ top: 8, bottom: 8 });
        Column.create();
        Button.createWithLabel('WGS84  坐标转 GCJ02  坐标');
        Button.fontSize(18);
        Button.onClick(() => {
            this.WGS842GCJ02 = gcoord.transform<Position>([this.lon, this.lat], // 经纬度坐标
            gcoord.WGS84, // 当前坐标系
            gcoord.GCJ02 // 目标坐标系
            );
            console.log('GCJ02 坐标转 WGS84 坐标:' + this.WGS842GCJ02); // [116.41661560068297, 39.92196580126834]
        });
        Button.pop();
        Text.create('' + this.WGS842GCJ02);
        Text.pop();
        Column.pop();
        Divider.create();
        Divider.strokeWidth(1);
        Divider.color('#F1F3F5');
        Divider.margin({ top: 8, bottom: 8 });
        Column.create();
        Button.createWithLabel('BD09  坐标转 WGS84  坐标');
        Button.fontSize(18);
        Button.onClick(() => {
            this.BD092WGS84 = gcoord.transform<Position>([this.lon, this.lat], // 经纬度坐标
            gcoord.BD09, // 当前坐标系
            gcoord.WGS84 // 目标坐标系
            );
            console.log('GCJ02 坐标转 WGS84 坐标:' + this.BD092WGS84); // [116.41661560068297, 39.92196580126834]
        });
        Button.pop();
        Text.create('' + this.BD092WGS84);
        Text.pop();
        Column.pop();
        Divider.create();
        Divider.strokeWidth(1);
        Divider.color('#F1F3F5');
        Divider.margin({ top: 8, bottom: 8 });
        Column.create();
        Button.createWithLabel('WGS84  坐标转 BD09  坐标');
        Button.fontSize(18);
        Button.onClick(() => {
            this.WGS842BD09 = gcoord.transform<Position>([this.lon, this.lat], // 经纬度坐标
            gcoord.WGS84, // 当前坐标系
            gcoord.BD09 // 目标坐标系
            );
            console.log('WGS84 坐标转 BD09 坐标:' + this.WGS842BD09); // [116.41661560068297, 39.92196580126834]
        });
        Button.pop();
        Text.create('' + this.WGS842BD09);
        Text.pop();
        Column.pop();
        Column.pop();
        Scroll.pop();
    }
}
loadDocument(new GcoordPage("1", undefined, {}));
