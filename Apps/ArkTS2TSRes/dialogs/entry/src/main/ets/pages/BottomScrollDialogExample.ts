interface BottomScrollDialogExample_Params {
    arr?: string[];
    dialogInput?;
    dialogController?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "BottomScrollDialogExample_" + ++__generate__Id;
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
import { InputCustomDialog } from '../components/InputCustomDialog';
class BottomScrollDialogExample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__arr = new ObservedPropertyObject(["这是一个自定义Bottom类型的评论弹框！",
            "这是一个自定义Bottom类型的评论弹框！",
            "这是一个自定义Bottom类型的评论弹框！",
            "这是一个自定义Bottom类型的评论弹框！",
            "这是一个自定义Bottom类型的评论弹框！",
            "这是一个自定义Bottom类型的评论弹框！",
            "这是一个自定义Bottom类型的评论弹框！"], this, "arr");
        this.dialogInput = new CustomDialogController({
            builder: () => {
                let jsDialog = new InputCustomDialog("2", this, {
                    onButtonClick: (value: string) => {
                        this.arr.splice(0, 0, value);
                    }
                });
                jsDialog.setController(this.dialogInput);
                View.create(jsDialog);
            },
            customStyle: true,
            autoCancel: true,
            alignment: DialogAlignment.Center,
            offset: { dx: 0, dy: 0 }
        }, this);
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new BottomScrollDialog({
                    customComponent: (item: Object, itemIndex: number) => {
                        this.ListDataComponent(item, itemIndex);
                    },
                    arr: this.arr,
                    dialogInput: this.dialogInput,
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
    updateWithValueParams(params: BottomScrollDialogExample_Params) {
        if (params.arr !== undefined) {
            this.arr = params.arr;
        }
        if (params.dialogInput !== undefined) {
            this.dialogInput = params.dialogInput;
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
    ListDataComponent(item: Object, itemIndex: number, parent = null) {
        Column.create();
        Column.backgroundColor(0xFFFFFF);
        Column.borderRadius(15);
        Column.height('25%');
        RelativeContainer.create();
        RelativeContainer.padding(12);
        Image.create($r("app.media.test1"));
        Image.width(55);
        Image.height(55);
        Image.margin({ right: 12 });
        Image.alignRules({
            top: { anchor: "__container__", align: VerticalAlign.Top },
            left: { anchor: "__container__", align: HorizontalAlign.Start }
        });
        Image.id("avatar");
        Text.create("评论人" + itemIndex.toString());
        Text.fontColor('#111');
        Text.fontSize(17);
        Text.alignRules({ left: { anchor: "avatar", align: HorizontalAlign.End } });
        Text.id("name");
        Text.pop();
        Text.create(item.toString());
        Text.fontColor('#888');
        Text.fontSize(15);
        Text.margin({ top: 8 });
        Text.textOverflow({ overflow: TextOverflow.MARQUEE });
        Text.maxLines(100);
        Text.alignRules({ left: { anchor: "avatar", align: HorizontalAlign.End }, top: { anchor: "name", align: VerticalAlign.Bottom } });
        Text.id("comment");
        Text.pop();
        Column.create();
        Column.width('100%');
        Column.margin({ top: 10 });
        Column.alignRules({
            top: { anchor: "comment", align: VerticalAlign.Bottom }
        });
        Column.alignItems(HorizontalAlign.Center);
        Column.id("row2");
        Button.createWithLabel("删除");
        Button.backgroundColor("#ddd");
        Button.width(150);
        Button.height(36);
        Button.onClick(() => {
            this.arr.splice(itemIndex, 1);
        });
        Button.pop();
        Column.pop();
        RelativeContainer.pop();
        Column.pop();
    }
    private dialogInput;
    private dialogController: CustomDialogController;
    aboutToAppear() {
    }
    render() {
        Column.create();
        Column.width('100%');
        Button.createWithLabel("显示自定义Bottom弹窗(自带拖拽交互)");
        Button.onClick(() => {
            this.dialogController.open();
        });
        Button.pop();
        Column.pop();
    }
}
loadDocument(new BottomScrollDialogExample("1", undefined, {}));
