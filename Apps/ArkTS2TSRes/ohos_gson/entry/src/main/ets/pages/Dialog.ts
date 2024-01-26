interface CustomDialogExample_Params {
    controller?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Dialog_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
let dataText: string = '';
export function setData(data: string, that: any) {
    data == "" || data == null ? dataText = "null" : dataText = data;
    that.dialogController.open();
}
export class CustomDialogExample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CustomDialogExample_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private controller?: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    render() {
        Column.create();
        Text.create(dataText);
        Text.width('70%');
        Text.fontSize(20);
        Text.margin({ top: 10, bottom: 10 });
        Text.pop();
        Flex.create({ justifyContent: FlexAlign.SpaceAround });
        Flex.margin({ bottom: 10 });
        Button.createWithLabel('取消');
        Button.onClick(() => {
            if (this.controller !== undefined) {
                this.controller.close();
            }
        });
        Button.backgroundColor(0xffffff);
        Button.fontColor(Color.Black);
        Button.pop();
        Button.createWithLabel('确定');
        Button.onClick(() => {
            if (this.controller !== undefined) {
                this.controller.close();
            }
        });
        Button.backgroundColor(0xffffff);
        Button.fontColor(Color.Red);
        Button.pop();
        Flex.pop();
        Column.pop();
    }
}
