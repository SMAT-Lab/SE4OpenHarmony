interface SelectFolderDialog_Params {
    downloadFolder?: Array<string>;
    selectedFolder?: string;
    controller?: CustomDialogController;
    selectFolder?: (folder: string) => void;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SelectFolderDialog_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
import { logger } from '@ohos/uploaddownload';
const TAG: string = 'SelectFolderDialog';
export class SelectFolderDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__downloadFolder = this.initializeConsume("downloadFolder", "downloadFolder");
        this.__selectedFolder = new ObservedPropertySimple('', this, "selectedFolder");
        this.controller = new CustomDialogController({
            builder: null
        }, this);
        this.selectFolder = (folder: string) => { };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SelectFolderDialog_Params) {
        if (params.selectedFolder !== undefined) {
            this.selectedFolder = params.selectedFolder;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.selectFolder !== undefined) {
            this.selectFolder = params.selectFolder;
        }
    }
    aboutToBeDeleted() {
        this.__downloadFolder.aboutToBeDeleted();
        this.__selectedFolder.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __downloadFolder: SynchedPropertySimpleOneWay<Array<string>>;
    get downloadFolder() {
        return this.__downloadFolder.get();
    }
    set downloadFolder(newValue: Array<string>) {
        this.__downloadFolder.set(newValue);
    }
    private __selectedFolder: ObservedPropertySimple<string>;
    get selectedFolder() {
        return this.__selectedFolder.get();
    }
    set selectedFolder(newValue: string) {
        this.__selectedFolder.set(newValue);
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private selectFolder: (folder: string) => void;
    render() {
        Column.create();
        Column.width('100%');
        Column.alignItems(HorizontalAlign.Start);
        Column.border({ color: Color.Gray, radius: 20 });
        Column.padding({ left: 24, right: 24, top: 24, bottom: 24 });
        Text.create($r('app.string.download_to'));
        Text.fontSize(20);
        Text.width('100%');
        Text.fontWeight(500);
        Text.fontColor($r('app.color.text_normal'));
        Text.opacity(0.9);
        Text.fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
        Text.margin({ bottom: 12 });
        Text.pop();
        ForEach.create("2", this, ObservedObject.GetRawObject(this.downloadFolder), (item: string, index?: number) => {
            If.create();
            if (index && index !== 0) {
                If.branchId(0);
                Divider.create();
            }
            If.pop();
            Row.create();
            Row.width('100%');
            Row.height(56);
            Row.onClick(() => {
                this.selectedFolder = item;
                logger.info(TAG, `this.selectedFolder = ${this.selectedFolder}`);
            });
            Text.create(item);
            Text.id('menu' + index);
            Text.fontSize(16);
            Text.pop();
            Blank.create();
            Blank.pop();
            Radio.create({ group: 'folder', value: item });
            Radio.size({ width: 20, height: 20 });
            Radio.checked(item === this.selectedFolder);
            Radio.radioStyle({ checkedBackgroundColor: $r('app.color.button_blue') });
            Radio.onChange((isCheck: boolean) => {
                if (isCheck) {
                    this.selectedFolder = item;
                    logger.info(TAG, `this.selectedFolder = ${this.selectedFolder}`);
                }
            });
            Row.pop();
        });
        ForEach.pop();
        Row.create();
        Row.width('100%');
        Row.height(40);
        Button.createWithChild();
        Button.height(40);
        Button.layoutWeight(1);
        Button.backgroundColor(Color.White);
        Button.margin(5);
        Button.onClick(() => {
            this.controller.close();
        });
        Text.create($r('app.string.cancel'));
        Text.fontColor($r('app.color.btn_text_blue'));
        Text.fontSize(16);
        Text.pop();
        Button.pop();
        Divider.create();
        Divider.vertical(true);
        Divider.width(1);
        Button.createWithChild();
        Button.height(40);
        Button.layoutWeight(1);
        Button.backgroundColor(Color.White);
        Button.margin(5);
        Button.onClick(() => {
            this.controller.close();
            this.selectFolder(this.selectedFolder);
        });
        Text.create($r('app.string.ok'));
        Text.fontColor($r('app.color.btn_text_blue'));
        Text.fontSize(16);
        Text.pop();
        Button.pop();
        Row.pop();
        Column.pop();
    }
}
