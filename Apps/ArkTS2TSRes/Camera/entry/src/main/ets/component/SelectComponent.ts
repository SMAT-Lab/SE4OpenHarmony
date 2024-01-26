interface SelectComponent_Params {
    controller?: CustomDialogController;
    title?: Resource | null;
    dataList?: Resource[];
    selectType?: number;
    selected?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SelectComponent_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Hunan OpenValley Digital Industry Development Co., Ltd.
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
import Logger from '../utlis/Logger';
const TAG: string = '[SelectComponent]';
export class SelectComponent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = undefined;
        this.title = null;
        this.dataList = [];
        this.__selectType = new SynchedPropertySimpleTwoWay(params.selectType, this, "selectType");
        this.__selected = new ObservedPropertySimple(0 // 当前选择项的索引;
        , this, "selected");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SelectComponent_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.dataList !== undefined) {
            this.dataList = params.dataList;
        }
        if (params.selected !== undefined) {
            this.selected = params.selected;
        }
    }
    aboutToBeDeleted() {
        this.__selectType.aboutToBeDeleted();
        this.__selected.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private controller?: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private title: Resource | null;
    private dataList: Resource[];
    private __selectType: SynchedPropertySimpleTwoWay<number>;
    get selectType() {
        return this.__selectType.get();
    }
    set selectType(newValue: number) {
        this.__selectType.set(newValue);
    }
    private __selected: ObservedPropertySimple<number>; // 当前选择项的索引;
    get selected() {
        return this.__selected.get();
    }
    set selected(newValue: number) {
        this.__selected.set(newValue);
    }
    aboutToAppear() {
        Logger.info(TAG, `aboutToAppear selectType_ ${AppStorage.Get<number>(`selectType_${this.selectType}`)}`);
        let selectTypeValue: number | undefined = AppStorage.Get<number>(`selectType_${this.selectType}`);
        if (selectTypeValue !== undefined) {
            this.selected = selectTypeValue;
        }
    }
    render() {
        Column.create();
        Column.alignItems(HorizontalAlign.Center);
        Column.width('90%');
        Column.borderRadius(24);
        Column.backgroundColor(Color.White);
        If.create();
        if (this.title !== null) {
            If.branchId(0);
            Text.create(this.title);
            Text.fontSize(20);
            Text.width('90%');
            Text.fontColor($r('app.color.COLOR_E6000000'));
            Text.fontFamily($r('app.string.font_family'));
            Text.textAlign(TextAlign.Start);
            Text.margin({ top: 20, bottom: 12 });
            Text.pop();
        }
        If.pop();
        List.create();
        List.width('100%');
        List.margin({ top: 12 });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.dataList), (item: Resource, index: number) => {
            ListItem.create();
            ListItem.width('100%');
            ListItem.height(48);
            ListItem.onClick(() => {
                if (index !== undefined) {
                    this.selected = index;
                }
                Logger.info(TAG, `item onClick ${this.selected}`);
            });
            Column.create();
            Column.width('90%');
            Row.create();
            Row.width('100%');
            Row.alignItems(VerticalAlign.Center);
            Text.create(item);
            Text.fontSize(16);
            Text.fontColor($r('app.color.COLOR_E6000000'));
            Text.fontFamily($r('app.string.font_family'));
            Text.fontWeight(FontWeight.Medium);
            Text.textAlign(TextAlign.Center);
            Text.pop();
            Blank.create();
            Blank.pop();
            Radio.create({ group: 'radio', value: '' });
            Radio.width(24);
            Radio.height(24);
            Radio.checked(this.selected == index);
            Radio.hitTestBehavior(HitTestMode.None);
            Row.pop();
            If.create();
            if (index != this.dataList.length - 1) {
                If.branchId(0);
                Divider.create();
                Divider.vertical(false);
                Divider.strokeWidth(1);
                Divider.color($r('app.color.COLOR_33000000'));
            }
            If.pop();
            Column.pop();
            ListItem.pop();
        });
        ForEach.pop();
        List.pop();
        Row.create();
        Row.alignItems(VerticalAlign.Center);
        Row.height(40);
        Row.width('100%');
        Text.create($r('app.string.cancel'));
        Text.fontSize(16);
        Text.fontColor($r('app.color.COLOR_007DFF'));
        Text.fontWeight(FontWeight.Medium);
        Text.layoutWeight(1);
        Text.textAlign(TextAlign.Center);
        Text.onClick(() => {
            this.controller?.close();
        });
        Text.pop();
        Divider.create();
        Divider.vertical(true);
        Divider.strokeWidth(1);
        Divider.color($r('app.color.COLOR_33000000'));
        Divider.height(20);
        Text.create($r('app.string.confirm'));
        Text.id('confirm');
        Text.fontSize(16);
        Text.fontColor($r('app.color.COLOR_007DFF'));
        Text.fontWeight(FontWeight.Medium);
        Text.layoutWeight(1);
        Text.textAlign(TextAlign.Center);
        Text.onClick(() => {
            // 确认后返回当前索引
            AppStorage.SetOrCreate(`selectType_${this.selectType}`, this.selected);
            Logger.info(TAG, `confirm onClick ${this.selected}`);
            this.controller?.close();
        });
        Text.pop();
        Row.pop();
        Column.pop();
    }
}
