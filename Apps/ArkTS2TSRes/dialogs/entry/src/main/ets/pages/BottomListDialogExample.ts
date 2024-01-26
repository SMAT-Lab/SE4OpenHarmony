interface BottomListDialogExample_Params {
    message?: string;
    showDialog?: boolean;
    isOpenDialog?: boolean;
    selectIndex?: number;
    message1?: string;
    showDialog1?: boolean;
    isOpenDialog1?: boolean;
    selectIndex1?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "BottomListDialogExample_" + ++__generate__Id;
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
import { BottomListDialog } from '@ohos/dialogs';
class BottomListDialogExample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('显示Bottom类型的List弹窗(带选择效果)', this, "message");
        this.__showDialog = new ObservedPropertySimple(false, this, "showDialog");
        this.__isOpenDialog = new ObservedPropertySimple(false, this, "isOpenDialog");
        this.__selectIndex = new ObservedPropertySimple(2, this, "selectIndex");
        this.__message1 = new ObservedPropertySimple('显示Bottom类型的List弹窗', this, "message1");
        this.__showDialog1 = new ObservedPropertySimple(false, this, "showDialog1");
        this.__isOpenDialog1 = new ObservedPropertySimple(false, this, "isOpenDialog1");
        this.__selectIndex1 = new ObservedPropertySimple(2, this, "selectIndex1");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: BottomListDialogExample_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.showDialog !== undefined) {
            this.showDialog = params.showDialog;
        }
        if (params.isOpenDialog !== undefined) {
            this.isOpenDialog = params.isOpenDialog;
        }
        if (params.selectIndex !== undefined) {
            this.selectIndex = params.selectIndex;
        }
        if (params.message1 !== undefined) {
            this.message1 = params.message1;
        }
        if (params.showDialog1 !== undefined) {
            this.showDialog1 = params.showDialog1;
        }
        if (params.isOpenDialog1 !== undefined) {
            this.isOpenDialog1 = params.isOpenDialog1;
        }
        if (params.selectIndex1 !== undefined) {
            this.selectIndex1 = params.selectIndex1;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__showDialog.aboutToBeDeleted();
        this.__isOpenDialog.aboutToBeDeleted();
        this.__selectIndex.aboutToBeDeleted();
        this.__message1.aboutToBeDeleted();
        this.__showDialog1.aboutToBeDeleted();
        this.__isOpenDialog1.aboutToBeDeleted();
        this.__selectIndex1.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __showDialog: ObservedPropertySimple<boolean>;
    get showDialog() {
        return this.__showDialog.get();
    }
    set showDialog(newValue: boolean) {
        this.__showDialog.set(newValue);
    }
    private __isOpenDialog: ObservedPropertySimple<boolean>;
    get isOpenDialog() {
        return this.__isOpenDialog.get();
    }
    set isOpenDialog(newValue: boolean) {
        this.__isOpenDialog.set(newValue);
    }
    private __selectIndex: ObservedPropertySimple<number>;
    get selectIndex() {
        return this.__selectIndex.get();
    }
    set selectIndex(newValue: number) {
        this.__selectIndex.set(newValue);
    }
    private __message1: ObservedPropertySimple<string>;
    get message1() {
        return this.__message1.get();
    }
    set message1(newValue: string) {
        this.__message1.set(newValue);
    }
    private __showDialog1: ObservedPropertySimple<boolean>;
    get showDialog1() {
        return this.__showDialog1.get();
    }
    set showDialog1(newValue: boolean) {
        this.__showDialog1.set(newValue);
    }
    private __isOpenDialog1: ObservedPropertySimple<boolean>;
    get isOpenDialog1() {
        return this.__isOpenDialog1.get();
    }
    set isOpenDialog1(newValue: boolean) {
        this.__isOpenDialog1.set(newValue);
    }
    private __selectIndex1: ObservedPropertySimple<number>;
    get selectIndex1() {
        return this.__selectIndex1.get();
    }
    set selectIndex1(newValue: number) {
        this.__selectIndex1.set(newValue);
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('50%');
        Button.createWithLabel(this.message);
        Button.fontSize(25);
        Button.labelStyle({ overflow: TextOverflow.Ellipsis, maxLines: 2 });
        Button.fontWeight(FontWeight.Bold);
        Button.onClick(() => {
            this.showDialog = true;
            this.isOpenDialog = !this.isOpenDialog;
        });
        Button.pop();
        Column.pop();
        Column.create();
        Column.width('50%');
        Button.createWithLabel(this.message1);
        Button.labelStyle({ overflow: TextOverflow.Ellipsis, maxLines: 2 });
        Button.fontSize(25);
        Button.fontWeight(FontWeight.Bold);
        Button.onClick(() => {
            this.showDialog1 = true;
            this.isOpenDialog1 = !this.isOpenDialog1;
        });
        Button.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new BottomListDialogExample("1", undefined, {}));
