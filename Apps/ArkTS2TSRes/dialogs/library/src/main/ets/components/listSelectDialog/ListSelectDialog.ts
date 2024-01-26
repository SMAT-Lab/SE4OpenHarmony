interface ListSelectDialog_Params {
    controller?: CustomDialogController;
    model?: listSelectModel;
    /**
     * 列表数据
     *
     */
    arrList?: obj[];
    changeData?: object[];
    scroller?: Scroller;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ListSelectDialog_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { listSelectModel } from '../model/listSelectModel';
class obj {
    name: string = '';
    id: number = 0;
    isSelect: boolean = false;
}
export class ListSelectDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = undefined;
        this.__model = new ObservedPropertyObject(new listSelectModel()
        /**
         * 列表数据
         *
         */
        , this, "model");
        this.arrList = [];
        this.__changeData = new ObservedPropertyObject([], this, "changeData");
        this.scroller = new Scroller();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ListSelectDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.arrList !== undefined) {
            this.arrList = params.arrList;
        }
        if (params.changeData !== undefined) {
            this.changeData = params.changeData;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__changeData.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private __model: ObservedPropertyObject<listSelectModel>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: listSelectModel) {
        this.__model.set(newValue);
    }
    /**
     * 列表数据
     *
     */
    private arrList: obj[];
    /**
     * 选中数据
     *
     */
    private __changeData: ObservedPropertyObject<object[]>;
    get changeData() {
        return this.__changeData.get();
    }
    set changeData(newValue: object[]) {
        this.__changeData.set(newValue);
    }
    private scroller: Scroller;
    aboutToAppear() {
        if (this.arrList) {
            this.arrList.forEach(item => {
                if (item.isSelect) {
                    this.changeData.push(item);
                }
            });
        }
    }
    render() {
        Column.create();
        Column.width(this.model.dialogWidth);
        Column.backgroundColor(this.model.dialogBgColor);
        Column.borderRadius(this.model.dialogBorderRadius);
        Text.create(this.model.title);
        Text.fontSize(this.model.titleFontSize);
        Text.margin(this.model.titleMargin);
        Text.width(this.model.titleWight);
        Text.height(this.model.titleHeight);
        Text.fontColor(this.model.titleFontColor);
        Text.border(this.model.titleBorder);
        Text.textAlign(this.model.titleTextAlign);
        Text.pop();
        List.create({ initialIndex: 0 });
        List.width('100%');
        List.height(this.model.listHeight);
        List.listDirection(this.model.listDirection);
        List.scrollBar(this.model.listScrollBar);
        List.edgeEffect(this.model.listEdgeEffect);
        List.padding(this.model.listPadding);
        ForEach.create("2", this, ObservedObject.GetRawObject(this.arrList), (item: obj, index: number) => {
            ListItem.create();
            ListItem.height(this.model.listItemHeight);
            ListItem.padding(this.model.listItemPadding);
            ListItem.border(this.model.listItemBorder);
            Flex.create({ justifyContent: FlexAlign.SpaceBetween, alignItems: ItemAlign.Center });
            Text.create(item.name);
            Text.width('100%');
            Text.fontColor(this.model.listTextFontColor);
            Text.textAlign(this.model.selectMode == 'normal' ? this.model.listTextAlign : this.model.listSelectTextAlign);
            Text.fontSize(this.model.listTextFontSize);
            Text.pop();
            If.create();
            if (this.model.selectMode == 'radio') {
                If.branchId(0);
                Radio.create({ value: item.name, group: 'radioGroup' });
                Radio.checked(item.isSelect);
                Radio.height(this.model.selectBoxSize);
                Radio.width(this.model.selectBoxSize);
                Radio.onChange((isChecked: boolean) => {
                    this.changeData = [item];
                    this.controller.close();
                    if (this.model.confirm != undefined) {
                        this.model.confirm(ObservedObject.GetRawObject(this.changeData));
                    }
                });
            }
            If.pop();
            If.create();
            if (this.model.selectMode == 'checkbox') {
                If.branchId(0);
                Checkbox.create({ name: item.name, group: 'checkboxGroup' });
                Checkbox.select(item.isSelect);
                Checkbox.selectedColor(this.model.boxSelectedColor);
                Checkbox.width(this.model.selectBoxSize);
                Checkbox.height(this.model.selectBoxSize);
                Checkbox.onChange((value: boolean) => {
                    if (value) {
                        item.isSelect = true;
                        this.changeData.push(item);
                    }
                    else {
                        item.isSelect = false;
                        this.changeData.push(item);
                    }
                });
                Checkbox.pop();
            }
            If.pop();
            Flex.pop();
            ListItem.pop();
        });
        ForEach.pop();
        List.pop();
        If.create();
        if (this.model.isDisplayBtn) {
            If.branchId(0);
            Column.create();
            Column.width(this.model.btnContentWidth);
            Column.margin(this.model.btnContentMargin);
            Column.border(this.model.btnContentBorder);
            //alignItems: ItemAlign.Auto
            Flex.create({ direction: FlexDirection.Row });
            Button.createWithLabel(this.model.cancelBtnTitle, { type: this.model.btnType });
            Button.fontColor(this.model.cancelBtnFontColor);
            Button.fontSize(this.model.btnFontSize);
            Button.backgroundColor(this.model.cancelBtnBgColor);
            Button.width(this.model.btnWidth);
            Button.height(this.model.btnHeight);
            Button.border(this.model.btnBorder);
            Button.onClick(() => {
                this.controller.close();
                if (this.model.cancel != undefined) {
                    this.model.cancel();
                }
            });
            Button.borderRadius(this.model.cancelBtnBorderRadius);
            Button.pop();
            Button.createWithLabel(this.model.confirmBtnTitle, { type: this.model.btnType });
            Button.fontColor(this.model.contentFontColor);
            Button.fontSize(this.model.btnFontSize);
            Button.backgroundColor(this.model.confirmBtnBgColor);
            Button.width(this.model.btnWidth);
            Button.height(this.model.btnHeight);
            Button.onClick(() => {
                this.controller.close();
                if (this.model.confirm != undefined) {
                    this.model.confirm(ObservedObject.GetRawObject(this.changeData));
                }
            });
            Button.borderRadius(this.model.confirmBtnBorderRadius);
            Button.pop();
            //alignItems: ItemAlign.Auto
            Flex.pop();
            Column.pop();
        }
        If.pop();
        Column.pop();
    }
}
