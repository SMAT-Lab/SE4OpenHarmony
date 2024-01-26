interface CheckComp_Params {
    message?: string;
    model?: listSelectModel;
    list?: obj[];
    CheckDialogController?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ListSelect_" + ++__generate__Id;
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
import { listSelectModel, ListSelectDialog, BaseMode } from '@ohos/dialogs';
import { TitleBorder, BtnContentBorder, ListItemBorder, BtnBorder } from '@ohos/dialogs';
class obj {
    name: string = '';
    id: number = 0;
    isSelect: boolean = false;
}
class CheckComp extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('列表弹窗', this, "message");
        this.__model = new ObservedPropertyObject(new listSelectModel(), this, "model");
        this.__list = new ObservedPropertyObject([
            {
                name: '我是第1条数据',
                id: 1,
                isSelect: false
            },
            {
                name: '我是第2条数据',
                id: 2,
                isSelect: false
            },
            {
                name: '我是第3条数据',
                id: 3,
                isSelect: false
            },
            {
                name: '我是第4条数据',
                id: 4,
                isSelect: false
            },
            {
                name: '我是第5条数据',
                id: 5,
                isSelect: false
            }
        ], this, "list");
        this.CheckDialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new ListSelectDialog({
                    model: this.model,
                    arrList: this.list,
                });
                jsDialog.setController(this.CheckDialogController);
                View.create(jsDialog);
            },
            alignment: DialogAlignment.Center,
            customStyle: true
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CheckComp_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.list !== undefined) {
            this.list = params.list;
        }
        if (params.CheckDialogController !== undefined) {
            this.CheckDialogController = params.CheckDialogController;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__model.aboutToBeDeleted();
        this.__list.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __model: ObservedPropertyObject<listSelectModel>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: listSelectModel) {
        this.__model.set(newValue);
    }
    aboutToAppear() {
        this.model.dialogBgColor = '#232323';
        this.model.title = '请选择一项';
        this.model.titleFontColor = '#ffffff';
        this.model.titleMargin = 10;
        this.model.titleBorder = {
            width: { bottom: 2 },
            color: { bottom: Color.White },
            style: { top: BorderStyle.Solid }
        };
        this.model.listPadding = { left: 5, right: 5 };
        this.model.listTextFontColor = '#ffffff';
        this.model.listItemPadding = { left: 5 };
        let btnContentBorder: BtnContentBorder = {
            width: { top: 1 },
            color: { top: '#ffffff' },
            style: { top: BorderStyle.Solid },
        };
        this.model.btnContentBorder = btnContentBorder;
        let listItemBorder: ListItemBorder = {
            width: { bottom: 1 },
            color: { bottom: '#ffffff' },
            style: { top: BorderStyle.Solid }
        };
        this.model.listItemBorder = listItemBorder;
        this.model.selectMode = 'normal';
        this.model.isDisplayBtn = true;
        this.model.cancelBtnFontColor = '#ffffff';
        this.model.cancelBtnBgColor = '#232323';
        this.model.cancelBtnTitle = 'Cancel';
        let btnBorder: BtnBorder = {
            width: { right: 1 },
            color: { right: '#ffffff' },
            style: { top: BorderStyle.Solid }
        };
        this.model.btnBorder = btnBorder;
        this.model.confirmBtnFontColor = '#ffffff';
        this.model.confirmBtnBgColor = '#232323';
        this.model.confirmBtnTitle = 'OK';
        this.model.btnWidth = '50%';
        this.model.btnHeight = 60;
        this.model.btnContentMargin = { top: 30 };
        this.model.cancel = this.cancel;
        this.model.confirm = (data?: object) => {
            this.confirm(data as obj[]);
        };
    }
    private __list: ObservedPropertyObject<obj[]>;
    get list() {
        return this.__list.get();
    }
    set list(newValue: obj[]) {
        this.__list.set(newValue);
    }
    confirm(data: obj[]) {
        if (data) {
            data.forEach(item => {
                this.list.forEach(obj => {
                    if (this.model.selectMode == 'checkbox') {
                        if (obj.id == item.id) {
                            obj.isSelect = item.isSelect;
                        }
                    }
                    else {
                        if (obj.id == item.id) {
                            obj.isSelect = true;
                        }
                        else {
                            obj.isSelect = false;
                        }
                    }
                });
            });
        }
        console.info('Callback when the confirm button is clicked');
    }
    cancel() {
        console.info('Callback when the cancel button is clicked');
    }
    private CheckDialogController: CustomDialogController;
    render() {
        Column.create();
        Column.padding(20);
        Button.createWithLabel('打开列表弹窗');
        Button.onClick(() => {
            this.model.isDisplayBtn = false;
            this.model.selectMode = 'normal';
            this.CheckDialogController.open();
        });
        Button.margin({ bottom: 20 });
        Button.pop();
        Button.createWithLabel('打开多选列表弹窗');
        Button.onClick(() => {
            this.model.isDisplayBtn = true;
            this.model.selectMode = 'checkbox';
            this.CheckDialogController.open();
        });
        Button.margin({ bottom: 20 });
        Button.pop();
        Button.createWithLabel('打开单选列表弹窗');
        Button.onClick(() => {
            this.model.isDisplayBtn = false;
            this.model.selectMode = 'radio';
            this.CheckDialogController.open();
        });
        Button.margin({ bottom: 20 });
        Button.pop();
        Column.pop();
    }
}
loadDocument(new CheckComp("1", undefined, {}));
