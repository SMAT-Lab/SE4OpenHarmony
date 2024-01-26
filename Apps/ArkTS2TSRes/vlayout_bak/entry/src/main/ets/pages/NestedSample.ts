interface NestedSample_Params {
    data?: layoutDataType[];
    isVisibility?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "NestedSample_" + ++__generate__Id;
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
import { GRID_LAYOUT, ONEN_LAYOUT, BANNER_LAYOUT, layoutDataType } from '@ohos/vlayout';
class NestedSample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__data = new ObservedPropertyObject([
            { layoutText: '' },
            { layoutText: '2', tag: 'TXT' },
            { layoutText: '3', tag: 'TXT' },
            { layoutText: '4', tag: 'TXT' },
            { layoutText: '5', tag: 'TXT' },
            { layoutText: '6', tag: 'TXT' },
            { layoutText: '7', tag: 'TXT' },
            { layoutText: '8', tag: 'TXT' },
        ], this, "data");
        this.__isVisibility = new ObservedPropertySimple(true, this, "isVisibility");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: NestedSample_Params) {
        if (params.data !== undefined) {
            this.data = params.data;
        }
        if (params.isVisibility !== undefined) {
            this.isVisibility = params.isVisibility;
        }
    }
    aboutToBeDeleted() {
        this.__data.aboutToBeDeleted();
        this.__isVisibility.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __data: ObservedPropertyObject<layoutDataType[]>;
    get data() {
        return this.__data.get();
    }
    set data(newValue: layoutDataType[]) {
        this.__data.set(newValue);
    }
    private __isVisibility: ObservedPropertySimple<boolean>;
    get isVisibility() {
        return this.__isVisibility.get();
    }
    set isVisibility(newValue: boolean) {
        this.__isVisibility.set(newValue);
    }
    gridLayoutContent1(item: layoutDataType, position: number | undefined, parent = null) {
        If.create();
        if (item.tag == 'TXT') {
            If.branchId(0);
            Text.create(`${item.layoutText}`);
            Text.width('100%');
            Text.height('100%');
            Text.backgroundColor(0x22EEEEEE);
            Text.border({ width: 1, color: '#000000', radius: 0, style: BorderStyle.Solid });
            Text.fontColor(0x999999);
            Text.fontSize(25);
            Text.fontWeight(FontWeight.Bold);
            Text.textAlign(TextAlign.Center);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.onClick(() => {
                console.info('position = ' + position);
            });
            Text.pop();
        }
        else {
            If.branchId(1);
        }
        If.pop();
    }
    gridLayoutContent2(item: layoutDataType, position: number | undefined, parent = null) {
        If.create();
        if (item.tag == 'TXT') {
            If.branchId(0);
            Text.create(`${item.layoutText}`);
            Text.width('100%');
            Text.height('100%');
            Text.backgroundColor(0x22EEEEEE);
            Text.border({ width: 1, color: '#000000', radius: 0, style: BorderStyle.Solid });
            Text.fontColor(0x999999);
            Text.fontSize(25);
            Text.fontWeight(FontWeight.Bold);
            Text.textAlign(TextAlign.Center);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.onClick(() => {
                console.info('position = ' + position);
            });
            Text.pop();
        }
        else {
            If.branchId(1);
        }
        If.pop();
    }
    gridLayoutContent3(item: layoutDataType, position: number | undefined, parent = null) {
        If.create();
        if (position == 1) {
            If.branchId(0);
        }
        else {
            If.branchId(1);
            Text.create(`${item.layoutText}`);
            Text.width('100%');
            Text.height('100%');
            Text.backgroundColor(0x22EEEEEE);
            Text.border({ width: 1, color: '#000000', radius: 0, style: BorderStyle.Solid });
            Text.fontColor(0x999999);
            Text.fontSize(25);
            Text.fontWeight(FontWeight.Bold);
            Text.textAlign(TextAlign.Center);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.onClick(() => {
                console.info('position = ' + position);
            });
            Text.pop();
        }
        If.pop();
    }
    gridLayoutContent4(item: layoutDataType, position: number | undefined, parent = null) {
        Text.create(`${item.layoutText}`);
        Text.width('100%');
        Text.height('100%');
        Text.backgroundColor(0x22EEEEEE);
        Text.border({ width: 1, color: '#000000', radius: 0, style: BorderStyle.Solid });
        Text.fontColor(0x999999);
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.textAlign(TextAlign.Center);
        Text.onClick(() => {
            console.info('position = ' + position);
        });
        Text.pop();
    }
    onenLayoutContent(item: layoutDataType, parent = null) {
        Text.create(`${item.layoutText}`);
        Text.width('100%');
        Text.height('100%');
        Text.backgroundColor(`${item.layoutColor}`);
        Text.border({ width: 1, color: '#000000', radius: 0, style: BorderStyle.Solid });
        Text.fontSize(25);
        Text.fontColor('#999999');
        Text.fontWeight(FontWeight.Bold);
        Text.textAlign(TextAlign.Center);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.pop();
    }
    bannerLayoutContent(item: layoutDataType, position: number | undefined, parent = null) {
        Text.create('Banner:' + item);
        Text.width('100%');
        Text.height('100%');
        Text.backgroundColor('#FFFFFF');
        Text.border({ width: 1, color: '#000000', radius: 0, style: BorderStyle.Solid });
        Text.fontSize(20);
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
    render() {
        Scroll.create();
        Scroll.onAreaChange(() => {
            this.isVisibility = !this.isVisibility;
        });
        Scroll.width('100%');
        Scroll.height('100%');
        Scroll.backgroundColor('#AAAAAA');
        Column.create();
        Text.create();
        Text.visibility(this.isVisibility ? Visibility.None : Visibility.Visible);
        Text.pop();
        Text.create('GRID_LAYOUT嵌套ONEN_LAYOUT：');
        Text.width('100%');
        Text.pop();
        Text.create('GRID_LAYOUT嵌套ONEN_LAYOUT(可内部滑动)：');
        Text.width('100%');
        Text.pop();
        Text.create('GRID_LAYOUT嵌套BANNER_LAYOUT(可内部滑动)：');
        Text.width('100%');
        Text.pop();
        Text.create('GRID_LAYOUT的colsSpan使用(可内部滑动)：');
        Text.width('100%');
        Text.pop();
        Column.pop();
        Scroll.pop();
    }
}
loadDocument(new NestedSample("1", undefined, {}));
