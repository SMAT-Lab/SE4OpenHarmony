interface indexPage_Params {
    data?: LoadingDialogModel;
    dialogController1?: CustomDialogController;
    showLoadingDialog?: boolean;
    isOpenLoadingDialog?: boolean;
    isCloseLoadingDialog?: boolean;
    messageText?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Loading_" + ++__generate__Id;
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
import { LoadingDialogModel, LoadingDialog, LoadingStyleDialog } from '@ohos/dialogs';
class indexPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__data = new ObservedPropertyObject(new LoadingDialogModel(), this, "data");
        this.dialogController1 = new CustomDialogController({
            builder: () => {
                let jsDialog = new LoadingDialog({
                    loadingTitle: '正在加载中...'
                });
                jsDialog.setController(this.dialogController1);
                View.create(jsDialog);
            },
            cancel: this.existApp,
            autoCancel: true,
            customStyle: true,
            offset: { dx: 0, dy: 0 },
            alignment: DialogAlignment.Center
        }, this);
        this.__showLoadingDialog = new ObservedPropertySimple(false, this, "showLoadingDialog");
        this.__isOpenLoadingDialog = new ObservedPropertySimple(false, this, "isOpenLoadingDialog");
        this.__isCloseLoadingDialog = new ObservedPropertySimple(false, this, "isCloseLoadingDialog");
        this.__messageText = new ObservedPropertySimple("", this, "messageText");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: indexPage_Params) {
        if (params.data !== undefined) {
            this.data = params.data;
        }
        if (params.dialogController1 !== undefined) {
            this.dialogController1 = params.dialogController1;
        }
        if (params.showLoadingDialog !== undefined) {
            this.showLoadingDialog = params.showLoadingDialog;
        }
        if (params.isOpenLoadingDialog !== undefined) {
            this.isOpenLoadingDialog = params.isOpenLoadingDialog;
        }
        if (params.isCloseLoadingDialog !== undefined) {
            this.isCloseLoadingDialog = params.isCloseLoadingDialog;
        }
        if (params.messageText !== undefined) {
            this.messageText = params.messageText;
        }
    }
    aboutToBeDeleted() {
        this.__data.aboutToBeDeleted();
        this.__showLoadingDialog.aboutToBeDeleted();
        this.__isOpenLoadingDialog.aboutToBeDeleted();
        this.__isCloseLoadingDialog.aboutToBeDeleted();
        this.__messageText.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __data: ObservedPropertyObject<LoadingDialogModel>;
    get data() {
        return this.__data.get();
    }
    set data(newValue: LoadingDialogModel) {
        this.__data.set(newValue);
    }
    private dialogController1: CustomDialogController;
    private __showLoadingDialog: ObservedPropertySimple<boolean>;
    get showLoadingDialog() {
        return this.__showLoadingDialog.get();
    }
    set showLoadingDialog(newValue: boolean) {
        this.__showLoadingDialog.set(newValue);
    }
    private __isOpenLoadingDialog: ObservedPropertySimple<boolean>;
    get isOpenLoadingDialog() {
        return this.__isOpenLoadingDialog.get();
    }
    set isOpenLoadingDialog(newValue: boolean) {
        this.__isOpenLoadingDialog.set(newValue);
    }
    private __isCloseLoadingDialog: ObservedPropertySimple<boolean>;
    get isCloseLoadingDialog() {
        return this.__isCloseLoadingDialog.get();
    }
    set isCloseLoadingDialog(newValue: boolean) {
        this.__isCloseLoadingDialog.set(newValue);
    }
    private __messageText: ObservedPropertySimple<string>;
    get messageText() {
        return this.__messageText.get();
    }
    set messageText(newValue: string) {
        this.__messageText.set(newValue);
    }
    onAccept() {
    }
    existApp() {
    }
    render() {
        Column.create();
        Column.margin({ top: 30, right: 20, bottom: 20, left: 20 });
        Button.createWithLabel('打开loading');
        Button.onClick(() => {
            this.dialogController1.open();
        });
        Button.pop();
        Button.createWithLabel('菊花loading');
        Button.onClick(() => {
            let time: number = 0;
            this.showLoadingDialog = true;
            this.isOpenLoadingDialog = !this.isOpenLoadingDialog;
            let timeId = setInterval(() => {
                if (time === 1) {
                    this.messageText = "加载中的长度变长了哟";
                }
                else if (time == 2) {
                    this.messageText = "变短了";
                }
                else if (time == 3) {
                    this.messageText = "";
                }
                else if (time == 4) {
                    this.isCloseLoadingDialog = !this.isCloseLoadingDialog;
                    clearInterval(timeId);
                }
                time++;
            }, 1000);
        });
        Button.margin({ top: 20 });
        Button.pop();
        Column.pop();
    }
    aboutToAppear() {
        this.data.init();
    }
    aboutToDisappear() {
        // 关闭定时器
        this.data.closeTimer();
    }
}
loadDocument(new indexPage("1", undefined, {}));
