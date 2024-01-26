interface AddDialog_Params {
    fileName?: string;
    fileContent?: string;
    isInserted?: boolean;
    controller?: CustomDialogController;
    createFile?: Function;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "AddDialog_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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
import prompt from '@ohos.promptAction';
import Logger from '../model/Logger';
export class AddDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.fileName = '';
        this.fileContent = '';
        this.isInserted = false;
        this.controller = undefined;
        this.createFile = (isInserted: boolean, name: string, content: string) => { };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AddDialog_Params) {
        if (params.fileName !== undefined) {
            this.fileName = params.fileName;
        }
        if (params.fileContent !== undefined) {
            this.fileContent = params.fileContent;
        }
        if (params.isInserted !== undefined) {
            this.isInserted = params.isInserted;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.createFile !== undefined) {
            this.createFile = params.createFile;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private fileName: string;
    private fileContent: string;
    private isInserted: boolean;
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private createFile: Function;
    InputLine(inputName: Resource, key: string, inputPrompt: Resource, inputContent: string, onChange: (value: string) => void, parent = null) {
        Row.create();
        Row.margin({ top: '3%' });
        Text.create(inputName);
        Text.width(80);
        Text.fontSize(18);
        Text.margin({ left: 10 });
        Text.fontColor(Color.Black);
        Text.fontWeight(FontWeight.Medium);
        Text.pop();
        TextInput.create({ placeholder: inputPrompt, text: inputContent });
        TextInput.id('input' + (key));
        TextInput.layoutWeight(1);
        TextInput.placeholderColor(Color.Gray);
        TextInput.fontSize(16);
        TextInput.maxLength(16);
        TextInput.margin({ right: 10 });
        TextInput.onChange(onChange);
        Row.pop();
    }
    aboutToAppear() {
        this.fileName = '';
        this.fileContent = '';
    }
    render() {
        Column.create();
        Column.padding('3%');
        Text.create($r('app.string.create_file'));
        Text.fontSize(24);
        Text.fontColor(Color.Black);
        Text.fontWeight(FontWeight.Bold);
        Text.margin({ top: '3%' });
        Text.pop();
        this.InputLine($r('app.string.file_name'), 'FileName', $r('app.string.input_name'), this.fileName, (value: string) => {
            this.fileName = value;
        }, this);
        this.InputLine($r('app.string.file_content'), 'FileContent', $r('app.string.input_content'), this.fileContent, (value: string) => {
            this.fileContent = value;
        }, this);
        Row.create();
        Button.createWithChild();
        Button.id('confirmBtn');
        Button.margin(5);
        Button.layoutWeight(7);
        Button.backgroundColor(Color.White);
        Button.onClick(() => {
            Logger.info(`this.fileName = ${this.fileName}`);
            if (this.fileName === '') {
                prompt.showToast({ message: $r('app.string.warning_empty'), duration: 1000 });
                return;
            }
            this.isInserted = true;
            Logger.info(`fileName = ${this.fileName}`);
            this.createFile(this.isInserted, this.fileName, this.fileContent);
            Logger.info(`isInserted = ${this.isInserted}`);
            this.controller.close();
        });
        Text.create($r('app.string.button_confirm'));
        Text.fontColor(Color.Blue);
        Text.fontSize(17);
        Text.pop();
        Button.pop();
        Divider.create();
        Divider.height(30);
        Divider.vertical(true);
        Divider.strokeWidth(2);
        Divider.color($r('app.color.divider_bg'));
        Button.createWithChild();
        Button.margin(5);
        Button.layoutWeight(7);
        Button.backgroundColor(Color.White);
        Button.onClick(() => {
            this.controller.close();
        });
        Text.create($r('app.string.button_cancel'));
        Text.fontColor(Color.Red);
        Text.fontSize(17);
        Text.pop();
        Button.pop();
        Row.pop();
        Column.pop();
    }
}
