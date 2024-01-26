interface CustomDialogExample_Params {
    password?: string;
    tag?: boolean;
    passwords?: string;
    controller?: CustomDialogController;
    cancel?: () => void;
    confirm?: () => void;
}
interface Index_Params {
    message?: string;
    results?: string;
    password?: string;
    tag?: boolean;
    dialogController?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import { ICallBack, UnrarApi } from "@ohos/unrar";
import fileio from '@ohos.fileio';
import { testRarData } from './dataTestRar5';
import { nameEncryptData } from './dataNameEncrypt';
import { GlobalContext } from './GlobalContext';
// import  common from'@ohos.app.ability.common'
let context: Context = GlobalContext.getContext().getObject('context') as Context;
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Rar文件解压', this, "message");
        this.__results = new ObservedPropertySimple('', this, "results");
        this.__password = new ObservedPropertySimple('', this, "password");
        this.__tag = new ObservedPropertySimple(true, this, "tag");
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new CustomDialogExample("2", this, {
                    cancel: this.onCancel,
                    confirm: this.onAccept,
                    password: this.__password,
                    tag: this.__tag
                });
                jsDialog.setController(this.dialogController);
                View.create(jsDialog);
            },
            cancel: this.existApp,
            autoCancel: true
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.results !== undefined) {
            this.results = params.results;
        }
        if (params.password !== undefined) {
            this.password = params.password;
        }
        if (params.tag !== undefined) {
            this.tag = params.tag;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__results.aboutToBeDeleted();
        this.__password.aboutToBeDeleted();
        this.__tag.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __results: ObservedPropertySimple<string>;
    get results() {
        return this.__results.get();
    }
    set results(newValue: string) {
        this.__results.set(newValue);
    }
    private __password: ObservedPropertySimple<string>;
    get password() {
        return this.__password.get();
    }
    set password(newValue: string) {
        this.__password.set(newValue);
    }
    private __tag: ObservedPropertySimple<boolean>;
    get tag() {
        return this.__tag.get();
    }
    set tag(newValue: boolean) {
        this.__tag.set(newValue);
    }
    private dialogController: CustomDialogController;
    onCancel() {
        console.info('Callback when the first button is clicked  ' + this.password);
    }
    onAccept() {
        console.info('Callback when the second button is clicked');
    }
    existApp() {
        console.info('Click the callback in the blank area');
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Text.create(this.message);
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Button.createWithLabel('name_encrypted.rar文件是否加密文件', { type: ButtonType.Normal, stateEffect: true });
        Button.borderRadius(8);
        Button.margin(40);
        Button.backgroundColor(0x317aff);
        Button.height(50);
        Button.width(300);
        Button.onClick(() => {
            if (!this.tag) {
                this.showDialog("正在解压中，请稍等...");
                return;
            }
            //hdc_std file send C:\Users\admin\Desktop\鸿蒙openharmony.rar /data/app/el2/100/base/com.huawei.ohosunrar/haps/entry/files
            let path: string = context.filesDir + "/name_encrypted.rar";
            // const path: string = (() => {
            //   return this.context.filesDir + "/name_encrypted.rar";
            // })();
            try {
                fileio.accessSync(path, 0);
                let tag: number = UnrarApi.isEncrypted(path);
                let encrypted: string = '';
                if (tag == 1) {
                    encrypted = "name_encrypted.rar是加密文件！";
                }
                else {
                    encrypted = "name_encrypted.rar不是加密文件！";
                }
                this.showDialog(encrypted);
            }
            catch (err) {
                this.showDialog('文件不存在');
            }
        });
        Button.pop();
        Button.createWithLabel('testRar5.rar文件是否加密文件', { type: ButtonType.Normal, stateEffect: true });
        Button.borderRadius(8);
        Button.margin(40);
        Button.backgroundColor(0x317aff);
        Button.height(50);
        Button.width(300);
        Button.onClick(() => {
            if (!this.tag) {
                this.showDialog("正在解压中，请稍等...");
                return;
            }
            let path: string = context.filesDir + "/testRar5.rar";
            try {
                fileio.accessSync(path, 0);
                let tag: number = UnrarApi.isEncrypted(path);
                let encrypted: string = '';
                if (tag == 1) {
                    encrypted = "testRar5.rar是加密文件！";
                }
                else {
                    encrypted = "testRar5.rar不是加密文件！";
                }
                this.showDialog(encrypted);
            }
            catch (err) {
                this.showDialog('文件不存在');
            }
        });
        Button.pop();
        Button.createWithLabel('解压testRar5.rar文件', { type: ButtonType.Normal, stateEffect: true });
        Button.borderRadius(8);
        Button.backgroundColor(0x317aff);
        Button.margin(40);
        Button.height(50);
        Button.width(300);
        Button.onClick(() => {
            this.extract();
        });
        Button.pop();
        Button.createWithLabel('解压name_encrypted.rar文件', { type: ButtonType.Normal, stateEffect: true });
        Button.borderRadius(8);
        Button.backgroundColor(0x317aff);
        Button.margin(40);
        Button.height(50);
        Button.width(300);
        Button.onClick(() => {
            if (!this.tag) {
                this.showDialog("正在解压中，请稍等...");
                return;
            }
            this.dialogController.open();
        });
        Button.pop();
        Column.pop();
        Row.pop();
    }
    private extract() {
        if (!this.tag) {
            this.showDialog("正在解压中，请稍等...");
            return;
        }
        let path: string = context.filesDir + "/testRar5.rar";
        try {
            fileio.accessSync(path, 0);
            this.tag = false;
            let that = this;
            let callBack: ICallBack = {
                callBackResult(value: string) {
                    let results: string = '';
                    that.tag = true;
                    if (value == '解压成功') {
                        results = '解压testRar5.rar文件解压成功,解压文件在:' + context.filesDir;
                    }
                    else {
                        results = value;
                    }
                    that.tag = true;
                    that.showDialog(results);
                }
            };
            UnrarApi.RarFiles_Extract(path, context.filesDir, callBack);
        }
        catch (err) {
            this.tag = true;
            this.showDialog('文件不存在');
        }
    }
    aboutToAppear() {
        let path: string = context.filesDir;
        this.generateTextFile(path, '/testRar5.rar', testRarData);
        this.generateTextFile(path, '/name_encrypted.rar', nameEncryptData);
    }
    generateTextFile(data: string, fileName: string, arr: Int8Array | Int32Array): void {
        let srcPath = data;
        try {
            fileio.mkdirSync(srcPath);
        }
        catch (err) {
        }
        const writer = fileio.openSync(srcPath + fileName, 0o100 | 0o2, 0o666); //0o102
        fileio.writeSync(writer, arr.buffer);
        fileio.closeSync(writer);
    }
    showDialog(message: string) {
        AlertDialog.show({
            title: '',
            message: message,
            confirm: {
                value: 'OK',
                action: () => {
                }
            }
        });
    }
}
class CustomDialogExample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__password = new SynchedPropertySimpleTwoWay(params.password, this, "password");
        this.__tag = new SynchedPropertySimpleTwoWay(params.tag, this, "tag");
        this.passwords = '';
        this.controller = undefined;
        this.cancel = () => {
        };
        this.confirm = () => {
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CustomDialogExample_Params) {
        if (params.passwords !== undefined) {
            this.passwords = params.passwords;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.cancel !== undefined) {
            this.cancel = params.cancel;
        }
        if (params.confirm !== undefined) {
            this.confirm = params.confirm;
        }
    }
    aboutToBeDeleted() {
        this.__password.aboutToBeDeleted();
        this.__tag.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __password: SynchedPropertySimpleTwoWay<string>;
    get password() {
        return this.__password.get();
    }
    set password(newValue: string) {
        this.__password.set(newValue);
    }
    private __tag: SynchedPropertySimpleTwoWay<boolean>;
    get tag() {
        return this.__tag.get();
    }
    set tag(newValue: boolean) {
        this.__tag.set(newValue);
    }
    private passwords: string;
    private controller?: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private cancel: () => void;
    private confirm: () => void;
    render() {
        Column.create();
        Column.width('100%');
        Column.height('30%');
        Text.create('请输入密码');
        Text.width('70%');
        Text.fontSize(20);
        Text.margin({ top: 10, bottom: 10 });
        Text.pop();
        TextInput.create({ placeholder: 'input your password: 190512' });
        TextInput.type(InputType.Password);
        TextInput.margin({ top: 20 });
        TextInput.onChange((value) => {
            this.password = value;
            this.passwords = value;
        });
        Flex.create({ justifyContent: FlexAlign.SpaceAround });
        Flex.margin({ bottom: 10 });
        Button.createWithLabel('取消');
        Button.onClick(() => {
            this.controller!.close();
            this.cancel();
        });
        Button.backgroundColor(0xffffff);
        Button.fontColor(Color.Black);
        Button.pop();
        Button.createWithLabel('确认');
        Button.onClick(() => {
            this.rarFiles_Extract();
        });
        Button.backgroundColor(0xffffff);
        Button.fontColor(Color.Red);
        Button.pop();
        Flex.pop();
        Column.pop();
    }
    private rarFiles_Extract() {
        if (this.passwords == null || this.passwords == "") {
            this.passwords = "";
            this.showDialog("请输入密码");
        }
        else {
            this.passwords = "";
            let passwords = this.password;
            let path: string = context.filesDir + "/name_encrypted.rar";
            try {
                let tags = fileio.accessSync(path, 0);
                let that = this;
                that.tag = false;
                let callBack: ICallBack = {
                    callBackResult(value: string) {
                        let results: string = '';
                        if (value == '解压成功') {
                            results = 'name_encrypted.rar文件解压成功,解压文件在:' + context.filesDir;
                        }
                        else {
                            results = value;
                        }
                        that.showDialog(results);
                    }
                };
                UnrarApi.RarFiles_Extract(path, context.filesDir, callBack, passwords);
                this.tag = true;
                console.info('accessSync .rar文件+path：' + tags);
            }
            catch (err) {
                this.tag = true;
                console.info("accessSync failed with error:" + err);
                this.showDialog('文件不存在');
            }
            this.controller!.close();
            this.confirm();
        }
    }
    showDialog(message: string) {
        AlertDialog.show({
            title: '',
            message: message,
            confirm: {
                value: 'OK',
                action: () => {
                }
            }
        });
    }
}
loadDocument(new Index("1", undefined, {}));
