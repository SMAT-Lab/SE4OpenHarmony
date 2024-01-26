interface BottomTextDialogExample_Params {
    arr?: string[];
    dialogController?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "BottomTextDialogExample_" + ++__generate__Id;
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
import { BottomScrollDialog } from '@ohos/dialogs';
class BottomTextDialogExample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__arr = new ObservedPropertyObject(["这是一个自定义Bottom类型的弹窗！"], this, "arr");
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new BottomScrollDialog({
                    customComponent: (item: Object, itemIndex: number) => {
                        this.TextCustom();
                    },
                    arr: this.arr,
                    dialogTitle: "下面是： 只给单独的Text控件的场景",
                    scrollEmptyHeight: 0
                });
                jsDialog.setController(this.dialogController);
                View.create(jsDialog);
            },
            customStyle: true,
            autoCancel: true,
            alignment: DialogAlignment.Center,
            offset: { dx: 0, dy: 0 }
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: BottomTextDialogExample_Params) {
        if (params.arr !== undefined) {
            this.arr = params.arr;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    aboutToBeDeleted() {
        this.__arr.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __arr: ObservedPropertyObject<string[]>;
    get arr() {
        return this.__arr.get();
    }
    set arr(newValue: string[]) {
        this.__arr.set(newValue);
    }
    TextCustom(parent = null) {
        Column.create();
        Column.backgroundColor(0xFFFFFF);
        Column.borderRadius(15);
        Column.height('100%');
        Column.width('100%');
        Column.create();
        Column.padding(30);
        Text.create("XPopup中通过View来加载Fragment的功能。\n\n在openHarmony中要实现弹框的功能，必须使用CustomDialog来进行自定义控件的实现");
        Text.fontSize(20);
        Text.fontColor('#444');
        Text.pop();
        Column.pop();
        Column.pop();
    }
    private dialogController: CustomDialogController;
    onBackPress() {
        console.log("onBackPress");
    }
    aboutToAppear() {
    }
    render() {
        Column.create();
        Column.width('100%');
        Button.createWithLabel("复杂交互的Bottom弹窗");
        Button.onClick(() => {
            this.dialogController.open();
        });
        Button.pop();
        Column.pop();
    }
}
loadDocument(new BottomTextDialogExample("1", undefined, {}));
