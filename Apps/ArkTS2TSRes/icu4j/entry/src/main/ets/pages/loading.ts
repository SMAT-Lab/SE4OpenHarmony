interface CustomDialogExample_Params {
    controller?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "loading_" + ++__generate__Id;
}
/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
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
let tempValue: string;
export function setData(value: string, controller: CustomDialogController) {
    tempValue = value;
    controller.open();
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
        Text.create('测试结果');
        Text.fontSize(20);
        Text.margin({ top: 10, bottom: 10 });
        Text.pop();
        Text.create(tempValue);
        Text.fontSize(20);
        Text.margin({ top: 10, bottom: 10 });
        Text.pop();
        Button.createWithLabel('确定');
        Button.onClick(() => {
            if (this.controller != undefined) {
                this.controller.close();
            }
        });
        Button.backgroundColor(0xffffff);
        Button.fontSize(20);
        Button.fontColor(Color.Red);
        Button.margin({ bottom: 10 });
        Button.pop();
        Column.pop();
    }
}
