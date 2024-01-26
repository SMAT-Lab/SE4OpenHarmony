interface GridData_Params {
    integerItem?: SquareGrid;
}
interface MoreGrid_Params {
    rowsTemplate?: string;
    mHeight?: number;
    squareGrid?: Array<SquareGrid>;
    selectedSet?: Array<number>;
}
interface Index_Params {
    squares?: Array<Square>;
    selectedSet?: Array<number>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MultiSelectablePage_" + ++__generate__Id;
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
import { TitleMore } from '../common/CategoryHolderInflater';
import { Square, SquareGrid } from './Square';
import prompt from '@system.prompt';
import { TitleBar } from '../common/TitleBar';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.squares = [];
        this.__selectedSet = new ObservedPropertyObject([], this, "selectedSet");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.squares !== undefined) {
            this.squares = params.squares;
        }
        if (params.selectedSet !== undefined) {
            this.selectedSet = params.selectedSet;
        }
    }
    aboutToBeDeleted() {
        this.__selectedSet.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private squares: Array<Square>;
    private __selectedSet: ObservedPropertyObject<Array<number>>;
    get selectedSet() {
        return this.__selectedSet.get();
    }
    set selectedSet(newValue: Array<number>) {
        this.__selectedSet.set(newValue);
    }
    aboutToAppear() {
        loadData(this.squares);
    }
    render() {
        Stack.create();
        Column.create();
        let earlierCreatedChild_2: TitleBar = (this && this.findChildById) ? this.findChildById("2") as TitleBar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new TitleBar("2", this, {}));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        Scroll.create();
        Scroll.height('94%');
        Column.create();
        ForEach.create("5", this, ObservedObject.GetRawObject(this.squares), (item: Square) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.width('100%');
            let earlierCreatedChild_3: TitleMore = (this && this.findChildById) ? this.findChildById("3") as TitleMore : undefined;
            if (earlierCreatedChild_3 == undefined) {
                View.create(new TitleMore("3", this, { title: item.title }));
            }
            else {
                earlierCreatedChild_3.updateWithValueParams({
                    title: item.title
                });
                if (!earlierCreatedChild_3.needsUpdate()) {
                    earlierCreatedChild_3.markStatic();
                }
                View.create(earlierCreatedChild_3);
            }
            let earlierCreatedChild_4: MoreGrid = (this && this.findChildById) ? this.findChildById("4") as MoreGrid : undefined;
            if (earlierCreatedChild_4 == undefined) {
                View.create(new MoreGrid("4", this, { squareGrid: item.grids, selectedSet: this.selectedSet }));
            }
            else {
                earlierCreatedChild_4.updateWithValueParams({
                    squareGrid: item.grids, selectedSet: this.selectedSet
                });
                View.create(earlierCreatedChild_4);
            }
            Column.pop();
        }, (item: Square) => item.title.toString());
        ForEach.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
        Image.create($r('app.media.ic_fab_done'));
        Image.width(60);
        Image.height(60);
        Image.position({ x: 300, y: 600 });
        Image.zIndex(999);
        Image.onClick(event => {
            prompt.showToast({ message: 'Selected items: ' + this.selectedSet.join(' '), bottom: '10%' });
        });
        Stack.pop();
    }
}
class MoreGrid extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.rowsTemplate = '';
        this.mHeight = 0;
        this.__squareGrid = new ObservedPropertyObject([], this, "squareGrid");
        this.selectedSet = [];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MoreGrid_Params) {
        if (params.rowsTemplate !== undefined) {
            this.rowsTemplate = params.rowsTemplate;
        }
        if (params.mHeight !== undefined) {
            this.mHeight = params.mHeight;
        }
        if (params.squareGrid !== undefined) {
            this.squareGrid = params.squareGrid;
        }
        if (params.selectedSet !== undefined) {
            this.selectedSet = params.selectedSet;
        }
    }
    aboutToBeDeleted() {
        this.__squareGrid.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private rowsTemplate: string;
    private mHeight: number;
    private __squareGrid: ObservedPropertyObject<Array<SquareGrid>>;
    get squareGrid() {
        return this.__squareGrid.get();
    }
    set squareGrid(newValue: Array<SquareGrid>) {
        this.__squareGrid.set(newValue);
    }
    private selectedSet: Array<number>;
    aboutToAppear() {
        let rows = Math.ceil(this.squareGrid.length / 5);
        this.rowsTemplate = '1fr '.repeat(rows);
        this.mHeight = rows * 50;
    }
    render() {
        Stack.create();
        Stack.backgroundColor(Color.White);
        Grid.create();
        Grid.rowsTemplate(this.rowsTemplate);
        Grid.columnsTemplate('1fr 1fr 1fr 1fr 1fr');
        Grid.columnsGap(8);
        Grid.rowsGap(8);
        Grid.height(this.mHeight);
        Grid.margin({ left: 15, right: 15 });
        ForEach.create("7", this, ObservedObject.GetRawObject(this.squareGrid), (item: SquareGrid) => {
            GridItem.create();
            GridItem.backgroundColor(item.isSelected ? '#E07679' : '#ffffff');
            GridItem.onClick(event => {
                item.isSelected = !item.isSelected;
                this.squareGrid = this.squareGrid.concat([]);
                let id = item.id;
                if (item.isSelected) {
                    this.selectedSet.push(id);
                }
                else {
                    this.selectedSet.splice(this.selectedSet.indexOf(id), 1);
                }
                this.selectedSet = Array.from(new Set(this.selectedSet));
                this.selectedSet = this.selectedSet.concat([]);
            });
            let earlierCreatedChild_6: GridData = (this && this.findChildById) ? this.findChildById("6") as GridData : undefined;
            if (earlierCreatedChild_6 == undefined) {
                View.create(new GridData("6", this, { integerItem: item }));
            }
            else {
                earlierCreatedChild_6.updateWithValueParams({
                    integerItem: item
                });
                if (!earlierCreatedChild_6.needsUpdate()) {
                    earlierCreatedChild_6.markStatic();
                }
                View.create(earlierCreatedChild_6);
            }
            GridItem.pop();
        }, (item: SquareGrid) => item.id.toString());
        ForEach.pop();
        Grid.pop();
        Stack.pop();
    }
}
class GridData extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.integerItem = new SquareGrid(0, true);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: GridData_Params) {
        if (params.integerItem !== undefined) {
            this.integerItem = params.integerItem;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private integerItem: SquareGrid;
    render() {
        Column.create();
        Text.create(this.integerItem.id + '');
        Text.fontSize(14);
        Text.padding(10);
        Text.border({ width: 2 });
        Text.textAlign(TextAlign.Center);
        Text.width('100%');
        Text.pop();
        Column.pop();
    }
}
function loadData(square: Array<Square>) {
    let squareGrid0: Array<SquareGrid> = [];
    for (let i = 0; i < 7; i++) {
        let itemGrid0 = new SquareGrid(i + 1, false);
        squareGrid0.push(itemGrid0);
    }
    let itemList0 = new Square('特别篇', squareGrid0);
    square.push(itemList0);
    let squareGrid1: Array<SquareGrid> = [];
    for (let j = 0; j < 99; j++) {
        let itemGrid1 = new SquareGrid(j + 1, false);
        squareGrid1.push(itemGrid1);
    }
    let itemList1 = new Square('本篇', squareGrid1);
    square.push(itemList1);
}
loadDocument(new Index("1", undefined, {}));
