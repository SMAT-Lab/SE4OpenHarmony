interface CreateDirOrFile_Params {
    create_type?: "DIR" | "FILE" | "ZIP";
    controller?: CustomDialogController;
    folderName?: string;
    fileName?: string;
    contentText?: string;
    zipName?: string;
    textController?: TextInputController;
    confirm?: Confirm;
    cancel?: Cancel;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CreateDirOrFile_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
import { Confirm, Cancel, ReturnValue } from "../types/type";
export class CreateDirOrFile extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.create_type = "DIR";
        this.controller = undefined;
        this.folderName = "";
        this.fileName = "";
        this.contentText = "";
        this.zipName = "";
        this.textController = new TextInputController();
        this.confirm = () => {
        };
        this.cancel = () => {
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CreateDirOrFile_Params) {
        if (params.create_type !== undefined) {
            this.create_type = params.create_type;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.folderName !== undefined) {
            this.folderName = params.folderName;
        }
        if (params.fileName !== undefined) {
            this.fileName = params.fileName;
        }
        if (params.contentText !== undefined) {
            this.contentText = params.contentText;
        }
        if (params.zipName !== undefined) {
            this.zipName = params.zipName;
        }
        if (params.textController !== undefined) {
            this.textController = params.textController;
        }
        if (params.confirm !== undefined) {
            this.confirm = params.confirm;
        }
        if (params.cancel !== undefined) {
            this.cancel = params.cancel;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private create_type: "DIR" | "FILE" | "ZIP";
    private controller?: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private folderName: string;
    private fileName: string;
    private contentText: string;
    private zipName: string;
    private textController: TextInputController;
    private confirm: Confirm;
    private cancel: Cancel;
    isShowDir() {
        return this.create_type === "DIR";
    }
    isShowFile() {
        return this.create_type === "FILE";
    }
    isShowZip() {
        return this.create_type === "ZIP";
    }
    render() {
        Column.create();
        Text.create(this.create_type === "DIR" ? "创建文件夹" : this.create_type === "FILE" ? "创建文件" : "加载ZIP文件");
        Text.fontSize(20);
        Text.margin({ top: 10, bottom: 10 });
        Text.pop();
        TextInput.create({ placeholder: '请输入文件夹名称...', text: this.folderName, controller: this.textController });
        TextInput.height(80);
        TextInput.width('90%');
        TextInput.onChange((value: string) => {
            this.folderName = value;
        });
        TextInput.margin({ bottom: 12 });
        TextInput.visibility(this.isShowDir() ? Visibility.Visible : Visibility.None);
        TextInput.create({ placeholder: '请输入文件名称...', text: this.fileName });
        TextInput.height(80);
        TextInput.width('90%');
        TextInput.onChange((value: string) => {
            this.fileName = value;
        });
        TextInput.margin({ bottom: 12 });
        TextInput.visibility(this.isShowFile() ? Visibility.Visible : Visibility.None);
        TextInput.create({ placeholder: '请输入文件内容...', text: this.contentText });
        TextInput.height(80);
        TextInput.width('90%');
        TextInput.onChange((value: string) => {
            this.contentText = value;
        });
        TextInput.margin({ bottom: 12 });
        TextInput.visibility(this.isShowFile() ? Visibility.Visible : Visibility.None);
        TextInput.create({ placeholder: '请输入ZIP文件名称...', text: this.zipName });
        TextInput.height(80);
        TextInput.width('90%');
        TextInput.onChange((value: string) => {
            this.zipName = value;
        });
        TextInput.margin({ bottom: 12 });
        TextInput.visibility(this.isShowZip() ? Visibility.Visible : Visibility.None);
        Column.create();
        Column.margin(20);
        Button.createWithLabel("确定");
        Button.onClick(() => {
            const result = new ReturnValue();
            result.create_type = this.create_type;
            result.folderName = this.folderName;
            result.fileName = this.fileName;
            result.contentText = this.contentText;
            result.zipName = this.zipName;
            this.confirm(result);
        });
        Button.width("100%");
        Button.margin({ bottom: 8 });
        Button.height(50);
        Button.pop();
        Button.createWithLabel("取消");
        Button.onClick(this.cancel);
        Button.width("100%");
        Button.height(50);
        Button.pop();
        Column.pop();
        Column.pop();
    }
}
