interface IndexTitle_Params {
    notebookName?: string;
    localStorage?: LocalStorage;
    dialogController?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Title_" + ++__generate__Id;
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
import CommonConstants from '../common/constants/CommonConstants';
import EditDialog from '../view/EditDialog';
import { LocalStorage } from '../common/database/LocalStorage';
export class IndexTitle extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__notebookName = new ObservedPropertySimple(CommonConstants.notebookName, this, "notebookName");
        this.localStorage = new LocalStorage();
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new EditDialog("2", this, {
                    confirm: () => {
                        // todo 保存记事本标题
                        this.localStorage.setNoteBookName(this.notebookName);
                    },
                    notebookName: this.__notebookName,
                });
                jsDialog.setController(this.dialogController);
                View.create(jsDialog);
            },
            autoCancel: true,
            alignment: DialogAlignment.Default,
            offset: { dx: 0, dy: -20 },
            gridCount: 4,
            customStyle: false
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: IndexTitle_Params) {
        if (params.notebookName !== undefined) {
            this.notebookName = params.notebookName;
        }
        if (params.localStorage !== undefined) {
            this.localStorage = params.localStorage;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    aboutToBeDeleted() {
        this.__notebookName.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __notebookName: ObservedPropertySimple<string>;
    get notebookName() {
        return this.__notebookName.get();
    }
    set notebookName(newValue: string) {
        this.__notebookName.set(newValue);
    }
    private localStorage: LocalStorage;
    private dialogController: CustomDialogController;
    aboutToAppear() {
        this.localStorage.getNoteBookName().then(res => {
            this.notebookName = res as string;
            console.info('axios ' + this.notebookName);
        });
    }
    render() {
        Row.create();
        Row.width(CommonConstants.FULL_WIDTH);
        Row.height(54);
        Row.margin({
            top: 25
        });
        Text.create(this.notebookName);
        Text.fontSize(CommonConstants.FONT_SIZE_38);
        Text.onClick((e) => {
            this.dialogController.open();
        });
        Text.pop();
        Image.create($r("app.media.icon_down"));
        Image.width(17);
        Image.height(10);
        Image.margin({ left: 10 });
        Blank.create();
        Blank.pop();
        Row.create();
        Row.padding({ left: 10, bottom: 10, top: 10 });
        Row.margin({ bottom: 12 });
        Image.create($r('app.media.icon_more'));
        Image.width(32);
        Image.height(32);
        Row.pop();
        Row.pop();
    }
}
