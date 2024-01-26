interface NewSample_Params {
    gridLayoutAttribute?: GridAttributes;
    rangeGridLayoutAttribute?: GridAttributes;
    staggeredGridLayoutAttribute?: StaggeredGridAttributes;
    onenLayoutAttribute?: AbstractFullFillAttributes;
    onenExLayoutAttribute?: AbstractFullFillAttributes;
    columnLayoutAttribute?: AbstractFullFillAttributes;
    singleLayoutAttribute?: AbstractFullFillAttributes;
    lineraLayoutAttribute?: LinearAttributes;
    defaultLayoutAttribute?: LinearAttributes;
    bannerLayoutAttribute?: BannerAttributes;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "NewSample_" + ++__generate__Id;
}
/*
Copyright (c) 2021 Huawei Device Co., Ltd.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import { GRID_LAYOUT, RANGEGRID_LAYOUT, STAGGEREDGRID_LAYOUT, SINGLE_LAYOUT, COLUMN_LAYOUT, ONEN_LAYOUT, ONEN_EX_LAYOUT, BANNER_LAYOUT, LINEAR_LAYOUT, DEFAULT_LAYOUT, GridAttributes, StaggeredGridAttributes, AbstractFullFillAttributes, LinearAttributes, BannerAttributes, layoutDataType } from '@ohos/vlayout';
class NewSample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__gridLayoutAttribute = new ObservedPropertyObject({}, this, "gridLayoutAttribute");
        this.__rangeGridLayoutAttribute = new ObservedPropertyObject({}, this, "rangeGridLayoutAttribute");
        this.__staggeredGridLayoutAttribute = new ObservedPropertyObject({}, this, "staggeredGridLayoutAttribute");
        this.__onenLayoutAttribute = new ObservedPropertyObject({}, this, "onenLayoutAttribute");
        this.__onenExLayoutAttribute = new ObservedPropertyObject({}, this, "onenExLayoutAttribute");
        this.__columnLayoutAttribute = new ObservedPropertyObject({}, this, "columnLayoutAttribute");
        this.__singleLayoutAttribute = new ObservedPropertyObject({}, this, "singleLayoutAttribute");
        this.__lineraLayoutAttribute = new ObservedPropertyObject({}, this, "lineraLayoutAttribute");
        this.__defaultLayoutAttribute = new ObservedPropertyObject({}, this, "defaultLayoutAttribute");
        this.__bannerLayoutAttribute = new ObservedPropertyObject({}, this, "bannerLayoutAttribute");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: NewSample_Params) {
        if (params.gridLayoutAttribute !== undefined) {
            this.gridLayoutAttribute = params.gridLayoutAttribute;
        }
        if (params.rangeGridLayoutAttribute !== undefined) {
            this.rangeGridLayoutAttribute = params.rangeGridLayoutAttribute;
        }
        if (params.staggeredGridLayoutAttribute !== undefined) {
            this.staggeredGridLayoutAttribute = params.staggeredGridLayoutAttribute;
        }
        if (params.onenLayoutAttribute !== undefined) {
            this.onenLayoutAttribute = params.onenLayoutAttribute;
        }
        if (params.onenExLayoutAttribute !== undefined) {
            this.onenExLayoutAttribute = params.onenExLayoutAttribute;
        }
        if (params.columnLayoutAttribute !== undefined) {
            this.columnLayoutAttribute = params.columnLayoutAttribute;
        }
        if (params.singleLayoutAttribute !== undefined) {
            this.singleLayoutAttribute = params.singleLayoutAttribute;
        }
        if (params.lineraLayoutAttribute !== undefined) {
            this.lineraLayoutAttribute = params.lineraLayoutAttribute;
        }
        if (params.defaultLayoutAttribute !== undefined) {
            this.defaultLayoutAttribute = params.defaultLayoutAttribute;
        }
        if (params.bannerLayoutAttribute !== undefined) {
            this.bannerLayoutAttribute = params.bannerLayoutAttribute;
        }
    }
    aboutToBeDeleted() {
        this.__gridLayoutAttribute.aboutToBeDeleted();
        this.__rangeGridLayoutAttribute.aboutToBeDeleted();
        this.__staggeredGridLayoutAttribute.aboutToBeDeleted();
        this.__onenLayoutAttribute.aboutToBeDeleted();
        this.__onenExLayoutAttribute.aboutToBeDeleted();
        this.__columnLayoutAttribute.aboutToBeDeleted();
        this.__singleLayoutAttribute.aboutToBeDeleted();
        this.__lineraLayoutAttribute.aboutToBeDeleted();
        this.__defaultLayoutAttribute.aboutToBeDeleted();
        this.__bannerLayoutAttribute.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __gridLayoutAttribute: ObservedPropertyObject<GridAttributes>;
    get gridLayoutAttribute() {
        return this.__gridLayoutAttribute.get();
    }
    set gridLayoutAttribute(newValue: GridAttributes) {
        this.__gridLayoutAttribute.set(newValue);
    }
    private __rangeGridLayoutAttribute: ObservedPropertyObject<GridAttributes>;
    get rangeGridLayoutAttribute() {
        return this.__rangeGridLayoutAttribute.get();
    }
    set rangeGridLayoutAttribute(newValue: GridAttributes) {
        this.__rangeGridLayoutAttribute.set(newValue);
    }
    private __staggeredGridLayoutAttribute: ObservedPropertyObject<StaggeredGridAttributes>;
    get staggeredGridLayoutAttribute() {
        return this.__staggeredGridLayoutAttribute.get();
    }
    set staggeredGridLayoutAttribute(newValue: StaggeredGridAttributes) {
        this.__staggeredGridLayoutAttribute.set(newValue);
    }
    private __onenLayoutAttribute: ObservedPropertyObject<AbstractFullFillAttributes>;
    get onenLayoutAttribute() {
        return this.__onenLayoutAttribute.get();
    }
    set onenLayoutAttribute(newValue: AbstractFullFillAttributes) {
        this.__onenLayoutAttribute.set(newValue);
    }
    private __onenExLayoutAttribute: ObservedPropertyObject<AbstractFullFillAttributes>;
    get onenExLayoutAttribute() {
        return this.__onenExLayoutAttribute.get();
    }
    set onenExLayoutAttribute(newValue: AbstractFullFillAttributes) {
        this.__onenExLayoutAttribute.set(newValue);
    }
    private __columnLayoutAttribute: ObservedPropertyObject<AbstractFullFillAttributes>;
    get columnLayoutAttribute() {
        return this.__columnLayoutAttribute.get();
    }
    set columnLayoutAttribute(newValue: AbstractFullFillAttributes) {
        this.__columnLayoutAttribute.set(newValue);
    }
    private __singleLayoutAttribute: ObservedPropertyObject<AbstractFullFillAttributes>;
    get singleLayoutAttribute() {
        return this.__singleLayoutAttribute.get();
    }
    set singleLayoutAttribute(newValue: AbstractFullFillAttributes) {
        this.__singleLayoutAttribute.set(newValue);
    }
    private __lineraLayoutAttribute: ObservedPropertyObject<LinearAttributes>;
    get lineraLayoutAttribute() {
        return this.__lineraLayoutAttribute.get();
    }
    set lineraLayoutAttribute(newValue: LinearAttributes) {
        this.__lineraLayoutAttribute.set(newValue);
    }
    private __defaultLayoutAttribute: ObservedPropertyObject<LinearAttributes>;
    get defaultLayoutAttribute() {
        return this.__defaultLayoutAttribute.get();
    }
    set defaultLayoutAttribute(newValue: LinearAttributes) {
        this.__defaultLayoutAttribute.set(newValue);
    }
    private __bannerLayoutAttribute: ObservedPropertyObject<BannerAttributes>;
    get bannerLayoutAttribute() {
        return this.__bannerLayoutAttribute.get();
    }
    set bannerLayoutAttribute(newValue: BannerAttributes) {
        this.__bannerLayoutAttribute.set(newValue);
    }
    gridLayoutContent(item: layoutDataType, position: number | undefined, gridItemHeight: number | undefined, parent = null) {
        Text.create(`${item.layoutText}`);
        Text.width('100%');
        Text.height(100);
        Text.backgroundColor(0x33EEEEEE);
        Text.border({ width: 1, color: '#000000', radius: 0, style: BorderStyle.Solid });
        Text.fontColor(0x999999);
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.textAlign(TextAlign.Center);
        Text.onClick(() => {
            console.info('position = ' + position);
        });
        Text.pop();
    }
    rangeGridLayoutContent(item: layoutDataType, position: number | undefined, gridItemHeight: number | undefined, parent = null) {
        Column.create();
        Column.backgroundColor(item.bgColor);
        Column.padding(5);
        Column.margin({
            top: position == 4 || position == 5 || position == 8 || position == 9 ? 5 : 0,
            right: position == 5 || position == 7 || position == 9 || position == 11 ? 10 : 0,
            bottom: position == 6 || position == 7 || position == 10 || position == 11 ? 5 : 0,
            left: position == 4 || position == 6 || position == 8 || position == 10 ? 10 : 0
        });
        Text.create(`${item.layoutText}`);
        Text.width('100%');
        Text.height('100%');
        Text.backgroundColor(0x22EEEEEE);
        Text.border({ width: 1, color: '#000000', radius: 0, style: BorderStyle.Solid });
        Text.fontColor('#999999');
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.maxLines(1);
        Text.textAlign(TextAlign.Center);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.onClick(() => {
            console.info('position = ' + position);
        });
        Text.pop();
        Column.pop();
    }
    staggeredGridLayoutContent(item: layoutDataType, position: number | undefined, parent = null) {
        If.create();
        if (position as number % 2 == 0) {
            If.branchId(0);
            Text.create(`${item.layoutText}`);
            Text.width('100%');
            Text.height(220);
            Text.backgroundColor('#33EEEEEE');
            Text.border({ width: 1, color: '#000000', radius: 0, style: BorderStyle.Solid });
            Text.fontColor('#999999');
            Text.fontSize(25);
            Text.fontWeight(FontWeight.Bold);
            Text.textAlign(TextAlign.Center);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.onClick(() => {
                console.info('position = ' + position + ', item = ' + JSON.stringify(item));
            });
            Text.pop();
        }
        else {
            If.branchId(1);
            Text.create(`${item.layoutText}`);
            Text.width('100%');
            Text.height(150);
            Text.backgroundColor('#33EEEEEE');
            Text.border({ width: 1, color: '#000000', radius: 0, style: BorderStyle.Solid });
            Text.fontColor('#999999');
            Text.fontSize(25);
            Text.fontWeight(FontWeight.Bold);
            Text.textAlign(TextAlign.Center);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.onClick(() => {
                console.info('position = ' + position + ', item = ' + JSON.stringify(item));
            });
            Text.pop();
        }
        If.pop();
    }
    onenLayoutContent(item: layoutDataType, parent = null) {
        Text.create(`${item.layoutText}`);
        Text.width('100%');
        Text.height('100%');
        Text.backgroundColor('#33EEEEEE');
        Text.border({ width: 1, color: '#000000', radius: 0, style: BorderStyle.Solid });
        Text.fontColor('#999999');
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.textAlign(TextAlign.Center);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.onClick(() => {
            console.info('item = ' + JSON.stringify(item));
        });
        Text.pop();
    }
    onenExLayoutContent(item: layoutDataType, parent = null) {
        Text.create(`${item.layoutText}`);
        Text.width('100%');
        Text.height('100%');
        Text.backgroundColor('#33EEEEEE');
        Text.border({ width: 1, color: '#000000', radius: 0, style: BorderStyle.Solid });
        Text.fontColor('#999999');
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.textAlign(TextAlign.Center);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.onClick(() => {
            console.info('item = ' + JSON.stringify(item));
        });
        Text.pop();
    }
    columnLayoutContent(item: layoutDataType, position: number | undefined, layoutHeight: number | undefined, parent = null) {
        Text.create(`${item.layoutText}`);
        Text.width('100%');
        Text.height(100);
        Text.backgroundColor(0x22EEEEEE);
        Text.border({ width: 1, color: '#000000', radius: 0, style: BorderStyle.Solid });
        Text.fontSize(25);
        Text.fontColor('#999999');
        Text.fontWeight(FontWeight.Bold);
        Text.textAlign(TextAlign.Center);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.onClick(() => {
            console.info('position = ' + position);
        });
        Text.pop();
    }
    singleLayoutContent(item: layoutDataType, position: number | undefined, parent = null) {
        Text.create(`${item}`);
        Text.width('100%');
        Text.height('100%');
        Text.backgroundColor(0x22EEEEEE);
        Text.border({ width: 1, color: '#000000', radius: 0, style: BorderStyle.Solid });
        Text.fontSize(25);
        Text.fontColor('#999999');
        Text.fontWeight(FontWeight.Bold);
        Text.maxLines(1);
        Text.textAlign(TextAlign.Center);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.onClick(() => {
            console.info('position = ' + position);
        });
        Text.pop();
    }
    linearLayoutContent(item: layoutDataType, position: number | undefined, listItemHeight: number | undefined, parent = null) {
        If.create();
        if (position as number % 2 == 0) {
            If.branchId(0);
            Text.create(`${item}`);
            Text.width('100%');
            Text.height(100);
            Text.backgroundColor('#33EEEEEE');
            Text.border({ width: 1, color: '#000000', radius: 0, style: BorderStyle.Solid });
            Text.fontColor('#999999');
            Text.fontSize(25);
            Text.fontWeight(FontWeight.Bold);
            Text.textAlign(TextAlign.Center);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.onClick(() => {
                console.info('position = ' + position + ', item = ' + JSON.stringify(item));
            });
            Text.pop();
        }
        else {
            If.branchId(1);
            Text.create(`${item}`);
            Text.width('100%');
            Text.height(60);
            Text.backgroundColor('#33EEEEEE');
            Text.border({ width: 1, color: '#000000', radius: 0, style: BorderStyle.Solid });
            Text.fontColor('#999999');
            Text.fontSize(25);
            Text.fontWeight(FontWeight.Bold);
            Text.textAlign(TextAlign.Center);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.onClick(() => {
                console.info('position = ' + position + ', item = ' + JSON.stringify(item));
            });
            Text.pop();
        }
        If.pop();
    }
    defaultLayoutContent(item: layoutDataType, position: number | undefined, parent = null) {
        Text.create(`${item}`);
        Text.width('100%');
        Text.height('100%');
        Text.backgroundColor(position as number % 2 == 0 ? '#aa00ff00' : '#ccff00ff');
        Text.border({ width: 0, color: '#000000', radius: 0, style: BorderStyle.Solid });
        Text.fontColor(0x000000);
        Text.fontSize(18);
        Text.fontWeight(FontWeight.Normal);
        Text.textAlign(TextAlign.Start);
        Text.align(Alignment.TopStart);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.onClick(() => {
            console.info('position = ' + position);
        });
        Text.pop();
    }
    bannerLayoutContent(item: layoutDataType, position: number | undefined, parent = null) {
        Text.create('Banner:' + item);
        Text.width('100%');
        Text.height('100%');
        Text.backgroundColor(0x22EEEEEE);
        Text.border({ width: 1, color: '#000000', radius: 0, style: BorderStyle.Solid });
        Text.fontSize(25);
        Text.fontColor('#999999');
        Text.fontWeight(FontWeight.Bold);
        Text.maxLines(1);
        Text.textAlign(TextAlign.Center);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.onClick(() => {
            console.info('position = ' + position);
        });
        Text.pop();
    }
    aboutToAppear() {
        this.gridLayoutAttribute.range = [0, 7];
        this.gridLayoutAttribute.spanCount = 3;
        this.gridLayoutAttribute.layoutHeight = '45%';
        this.gridLayoutAttribute.bgColor = Color.Pink;
        this.gridLayoutAttribute.zIndex = 1;
        this.gridLayoutAttribute.gap = 10;
        this.gridLayoutAttribute.padding = [10, 10, 10, 10];
        this.gridLayoutAttribute.margin = [10, 10, 10, 10];
        this.rangeGridLayoutAttribute.spanCount = 4;
        this.rangeGridLayoutAttribute.weights = [20, 26.6, 26.6, 26.6];
        this.rangeGridLayoutAttribute.layoutHeight = '30%';
        this.rangeGridLayoutAttribute.aspectRatio = 4;
        this.rangeGridLayoutAttribute.bgColor = '#00FF00';
        this.rangeGridLayoutAttribute.padding = [10, 10, 10, 10];
        this.rangeGridLayoutAttribute.margin = [10, 10, 10, 10];
        this.staggeredGridLayoutAttribute.range = [0, 7];
        this.staggeredGridLayoutAttribute.lanes = 3;
        this.staggeredGridLayoutAttribute.gap = 10;
        this.staggeredGridLayoutAttribute.bgColor = Color.Pink;
        this.staggeredGridLayoutAttribute.padding = [10, 10, 10, 10];
        this.staggeredGridLayoutAttribute.margin = [10, 10, 10, 10];
        this.onenLayoutAttribute.range = [0, 5];
        this.onenLayoutAttribute.rowWeights = [10, 20];
        this.onenLayoutAttribute.colWeights = [10, 20, 30, 40, 10];
        this.onenLayoutAttribute.hasHeader = true;
        this.onenLayoutAttribute.hasFooter = true;
        this.onenLayoutAttribute.layoutHeight = 200;
        this.onenLayoutAttribute.bgColor = Color.Pink;
        this.onenLayoutAttribute.padding = [5, 5, 5, 5];
        this.onenLayoutAttribute.margin = [5, 15, 5, 15];
        this.onenExLayoutAttribute.range = [0, 6];
        this.onenExLayoutAttribute.rowWeights = [10, 20];
        this.onenExLayoutAttribute.colWeights = [40, 45, 15, 10, 30, 30];
        this.onenExLayoutAttribute.layoutHeight = 200;
        this.onenExLayoutAttribute.bgColor = Color.Pink;
        this.onenExLayoutAttribute.padding = [5, 5, 5, 5];
        this.onenExLayoutAttribute.margin = [5, 15, 5, 15];
        this.columnLayoutAttribute.range = [0, 7];
        this.columnLayoutAttribute.bgColor = Color.Pink;
        this.columnLayoutAttribute.colWeights = [30, 20, 20];
        this.columnLayoutAttribute.padding = [10, 10, 10, 10];
        this.columnLayoutAttribute.margin = [10, 10, 10, 10];
        this.singleLayoutAttribute.aspectRatio = 4;
        this.singleLayoutAttribute.bgColor = Color.Pink;
        this.singleLayoutAttribute.padding = [5, 5, 5, 5];
        this.singleLayoutAttribute.margin = [5, 5, 5, 5];
        this.lineraLayoutAttribute.dividerHeight = 10;
        this.lineraLayoutAttribute.bgColor = Color.Pink;
        this.lineraLayoutAttribute.layoutHeight = 550;
        this.lineraLayoutAttribute.padding = [5, 5, 5, 5];
        this.lineraLayoutAttribute.margin = [5, 5, 5, 5];
        this.defaultLayoutAttribute.aspectRatio = 4;
        this.defaultLayoutAttribute.margin = [5, 5, 2, 5];
        this.defaultLayoutAttribute.dividerHeight = 5;
        this.bannerLayoutAttribute.range = [0, 2];
        this.bannerLayoutAttribute.layoutHeight = 500;
        this.bannerLayoutAttribute.aspectRatio = 5;
        this.bannerLayoutAttribute.bgColor = Color.Pink;
    }
    render() {
        Scroll.create();
        Column.create();
        Button.createWithLabel('change');
        Button.width('100%');
        Button.onClick(() => {
            this.gridLayoutAttribute.bgColor
                = this.staggeredGridLayoutAttribute.bgColor
                    = this.onenLayoutAttribute.bgColor
                        = this.onenExLayoutAttribute.bgColor
                            = this.columnLayoutAttribute.bgColor
                                = this.singleLayoutAttribute.bgColor
                                    = this.lineraLayoutAttribute.bgColor
                                        = this.bannerLayoutAttribute.bgColor = '#300000FF';
        });
        Button.pop();
        Column.pop();
        Scroll.pop();
    }
}
loadDocument(new NewSample("1", undefined, {}));
