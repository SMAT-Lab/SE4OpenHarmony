interface TxtWrite_Params {
    controller?: CustomDialogController;
    confirm?: (e: string) => void;
    txtValue?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "write_" + ++__generate__Id;
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
let txtS: string = "";
export function txtWrite(txt: string) {
    txtS = txt;
}
export class TxtWrite extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = undefined;
        this.confirm = undefined;
        this.__txtValue = new ObservedPropertySimple(txtS, this, "txtValue");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TxtWrite_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.confirm !== undefined) {
            this.confirm = params.confirm;
        }
        if (params.txtValue !== undefined) {
            this.txtValue = params.txtValue;
        }
    }
    aboutToBeDeleted() {
        this.__txtValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private controller?: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private confirm?: (e: string) => void;
    private __txtValue: ObservedPropertySimple<string>;
    get txtValue() {
        return this.__txtValue.get();
    }
    set txtValue(newValue: string) {
        this.__txtValue.set(newValue);
    }
    render() {
        Column.create();
        Button.createWithLabel("清空数据");
        Button.margin({ top: 10 });
        Button.onClick(() => {
            this.txtValue = "";
        });
        Button.pop();
        TextArea.create({ placeholder: "请输入文件内容", text: this.txtValue });
        TextArea.margin({ top: 10, bottom: 10 });
        TextArea.onChange((value) => {
            this.txtValue = value;
        });
        Row.create();
        Button.createWithLabel("取消");
        Button.onClick(() => {
            this.controller!.close();
        });
        Button.backgroundColor(0xffffff);
        Button.fontColor(Color.Black);
        Button.pop();
        Button.createWithLabel("确认");
        Button.onClick(() => {
            this.controller!.close();
            if (!!this.confirm)
                this.confirm(this.txtValue);
        });
        Button.backgroundColor(0xffffff);
        Button.fontColor(Color.Red);
        Button.pop();
        Row.pop();
        Column.pop();
    }
}
