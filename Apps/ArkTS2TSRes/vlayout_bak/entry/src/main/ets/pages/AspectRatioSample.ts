interface AspectRatioSample_Params {
    isVisibility?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "AspectRatioSample_" + ++__generate__Id;
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
import { GRID_LAYOUT, RANGEGRID_LAYOUT, layoutDataType } from '@ohos/vlayout';
class AspectRatioSample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__isVisibility = new ObservedPropertySimple(true, this, "isVisibility");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AspectRatioSample_Params) {
        if (params.isVisibility !== undefined) {
            this.isVisibility = params.isVisibility;
        }
    }
    aboutToBeDeleted() {
        this.__isVisibility.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __isVisibility: ObservedPropertySimple<boolean>;
    get isVisibility() {
        return this.__isVisibility.get();
    }
    set isVisibility(newValue: boolean) {
        this.__isVisibility.set(newValue);
    }
    gridLayoutContent1(item: layoutDataType, position: number, gridItemHeight: number | undefined, parent = null) {
        Text.create(`${item.layoutText}`);
        Text.width('100%');
        Text.height('100%');
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
    gridLayoutContent2(item: layoutDataType, position: number | undefined, gridItemHeight: number | undefined, parent = null) {
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
        Column.backgroundColor(item.layoutColor);
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
    render() {
        Scroll.create();
        Scroll.onAreaChange(() => {
            this.isVisibility = !this.isVisibility;
        });
        Column.create();
        Text.create();
        Text.visibility(this.isVisibility ? Visibility.None : Visibility.Visible);
        Text.pop();
        Text.create('GRID_LAYOUT的单行纵横比：');
        Text.width('100%');
        Text.backgroundColor('#AAAAAA');
        Text.pop();
        Text.create('RANGEGRID_LAYOUT的单行纵横比：');
        Text.width('100%');
        Text.pop();
        Column.pop();
        Scroll.pop();
    }
}
loadDocument(new AspectRatioSample("1", undefined, {}));
