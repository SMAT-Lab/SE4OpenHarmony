interface GridChangeSample_Params {
    data?: dataType[];
    gridData?: layoutDataType[];
    bgColor?: string;
    gridLayoutAttribute1?: GridAttributes;
    gridLayoutAttribute2?: GridAttributes;
    gridLayoutAttribute3?: GridAttributes;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "GridChangeSample_" + ++__generate__Id;
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
import { GRID_LAYOUT, GridAttributes, layoutDataType, dataType } from '@ohos/vlayout';
class GridChangeSample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__data = new ObservedPropertyObject([
            { layoutData: [{ layoutText: 'a' }, { layoutText: 'b' }, { layoutText: 'c' }, { layoutText: 'd' }] },
            { layoutData: [{ layoutText: 'A' }, { layoutText: 'B' }, { layoutText: 'C' }, { layoutText: 'D' }] },
        ], this, "data");
        this.__gridData = new ObservedPropertyObject([
            { layoutText: '' },
            { layoutText: '' },
            { layoutText: '' },
            { layoutText: '' },
        ], this, "gridData");
        this.__bgColor = new ObservedPropertySimple('#CFCFCF', this, "bgColor");
        this.__gridLayoutAttribute1 = new ObservedPropertyObject({}, this, "gridLayoutAttribute1");
        this.__gridLayoutAttribute2 = new ObservedPropertyObject({}, this, "gridLayoutAttribute2");
        this.__gridLayoutAttribute3 = new ObservedPropertyObject({}, this, "gridLayoutAttribute3");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: GridChangeSample_Params) {
        if (params.data !== undefined) {
            this.data = params.data;
        }
        if (params.gridData !== undefined) {
            this.gridData = params.gridData;
        }
        if (params.bgColor !== undefined) {
            this.bgColor = params.bgColor;
        }
        if (params.gridLayoutAttribute1 !== undefined) {
            this.gridLayoutAttribute1 = params.gridLayoutAttribute1;
        }
        if (params.gridLayoutAttribute2 !== undefined) {
            this.gridLayoutAttribute2 = params.gridLayoutAttribute2;
        }
        if (params.gridLayoutAttribute3 !== undefined) {
            this.gridLayoutAttribute3 = params.gridLayoutAttribute3;
        }
    }
    aboutToBeDeleted() {
        this.__data.aboutToBeDeleted();
        this.__gridData.aboutToBeDeleted();
        this.__bgColor.aboutToBeDeleted();
        this.__gridLayoutAttribute1.aboutToBeDeleted();
        this.__gridLayoutAttribute2.aboutToBeDeleted();
        this.__gridLayoutAttribute3.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __data: ObservedPropertyObject<dataType[]>;
    get data() {
        return this.__data.get();
    }
    set data(newValue: dataType[]) {
        this.__data.set(newValue);
    }
    private __gridData: ObservedPropertyObject<layoutDataType[]>;
    get gridData() {
        return this.__gridData.get();
    }
    set gridData(newValue: layoutDataType[]) {
        this.__gridData.set(newValue);
    }
    private __bgColor: ObservedPropertySimple<string>;
    get bgColor() {
        return this.__bgColor.get();
    }
    set bgColor(newValue: string) {
        this.__bgColor.set(newValue);
    }
    private __gridLayoutAttribute1: ObservedPropertyObject<GridAttributes>;
    get gridLayoutAttribute1() {
        return this.__gridLayoutAttribute1.get();
    }
    set gridLayoutAttribute1(newValue: GridAttributes) {
        this.__gridLayoutAttribute1.set(newValue);
    }
    private __gridLayoutAttribute2: ObservedPropertyObject<GridAttributes>;
    get gridLayoutAttribute2() {
        return this.__gridLayoutAttribute2.get();
    }
    set gridLayoutAttribute2(newValue: GridAttributes) {
        this.__gridLayoutAttribute2.set(newValue);
    }
    private __gridLayoutAttribute3: ObservedPropertyObject<GridAttributes>;
    get gridLayoutAttribute3() {
        return this.__gridLayoutAttribute3.get();
    }
    set gridLayoutAttribute3(newValue: GridAttributes) {
        this.__gridLayoutAttribute3.set(newValue);
    }
    gridLayoutContent1(item: layoutDataType, position: number | undefined, parent = null) {
        Text.create((this.data[0].layoutData[position as number] as layoutDataType).layoutText.toString());
        Text.width('100%');
        Text.height(200);
        Text.backgroundColor(position as number % 2 == 0 ? Color.Brown : Color.Pink);
        Text.border({ width: 1, color: '#000000', radius: 0, style: BorderStyle.Solid });
        Text.fontColor(0x999999);
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.textAlign(TextAlign.Center);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.onClick(() => {
            console.info('position = ' + position);
        });
        Text.pop();
    }
    gridLayoutContent2(item: layoutDataType, position: number | undefined, parent = null) {
        Text.create((this.data[1].layoutData[position as number] as layoutDataType).layoutText.toString());
        Text.width('100%');
        Text.height(200);
        Text.backgroundColor(position as number % 2 == 0 ? Color.Brown : Color.Pink);
        Text.border({ width: 1, color: '#000000', radius: 0, style: BorderStyle.Solid });
        Text.fontColor(0x999999);
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.textAlign(TextAlign.Center);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.onClick(() => {
            console.info('position = ' + position);
        });
        Text.pop();
    }
    gridLayoutContent3(item: layoutDataType, position: number | undefined, parent = null) {
        Text.create(this.gridData[position as number].layoutText.toString());
        Text.width('100%');
        Text.height(200);
        Text.backgroundColor(position as number % 2 == 0 ? Color.Brown : Color.Pink);
        Text.border({ width: 1, color: '#000000', radius: 0, style: BorderStyle.Solid });
        Text.fontColor(0x999999);
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.textAlign(TextAlign.Center);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.onClick(() => {
            console.info('position = ' + position);
        });
        Text.pop();
    }
    aboutToAppear() {
        this.gridLayoutAttribute1.spanCount = 2;
        this.gridLayoutAttribute1.weights = [30, 30];
        this.gridLayoutAttribute1.layoutHeight = 250;
        this.gridLayoutAttribute1.bgColor = this.bgColor;
        this.gridLayoutAttribute1.topMargin = 50;
        this.gridLayoutAttribute2.spanCount = 2;
        this.gridLayoutAttribute2.weights = [25, 50];
        this.gridLayoutAttribute2.layoutHeight = 250;
        this.gridLayoutAttribute2.bgColor = this.bgColor;
        this.gridLayoutAttribute2.topMargin = 50;
        this.gridLayoutAttribute2.rightMargin = 10;
        this.gridLayoutAttribute2.padding = [10, 10, 10, 10];
        this.gridLayoutAttribute2.margin = [10, 10, 10, 10];
        this.gridLayoutAttribute3.spanCount = 2;
        this.gridLayoutAttribute3.weights = [30, 40];
        this.gridLayoutAttribute3.layoutHeight = 250;
        this.gridLayoutAttribute3.bgColor = this.bgColor;
    }
    render() {
        Stack.create({ alignContent: Alignment.Top });
        Stack.width('100%');
        Stack.height('100%');
        Stack.backgroundColor('#000000');
        List.create();
        List.edgeEffect(EdgeEffect.None);
        List.backgroundColor('#FFFFFF');
        ListItem.create();
        ListItem.pop();
        ListItem.create();
        ListItem.pop();
        ListItem.create();
        ListItem.pop();
        List.pop();
        Button.createWithLabel('动态修改GRID_LAYOUT');
        Button.width('100%');
        Button.height(50);
        Button.onClick(() => {
            this.gridLayoutAttribute1.bgColor
                = this.gridLayoutAttribute2.bgColor
                    = this.gridLayoutAttribute3.bgColor
                        = '#AAAAAA';
            this.data[0].layoutData = [
                { layoutText: '1' },
                { layoutText: '2' },
                { layoutText: '3' },
                { layoutText: '4' },
            ];
            this.data[1].layoutData = [
                { layoutText: '5' },
                { layoutText: '6' },
                { layoutText: '7' },
                { layoutText: '8' },
            ];
            this.gridData = [
                { layoutText: '9' },
                { layoutText: '10' },
                { layoutText: '11' },
                { layoutText: '12' },
            ];
            this.data = [...this.data];
            this.gridData = [...this.gridData];
        });
        Button.pop();
        Stack.pop();
    }
}
loadDocument(new GridChangeSample("1", undefined, {}));
