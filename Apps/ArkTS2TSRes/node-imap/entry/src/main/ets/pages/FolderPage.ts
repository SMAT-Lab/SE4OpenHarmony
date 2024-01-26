interface FolderPage_Params {
    message?: string;
    startIndex?: number;
    endIndex?: number;
    listData?: Array<string>;
    selectFolder?: string | null;
    selectType?: string;
    textValue?: string;
    inputValue?: string;
    pageSize?: number;
    dialogController?: CustomDialogController | null;
}
interface CustomDialogDiy_Params {
    textValue?: string;
    inputValue?: string;
    controller?: CustomDialogController;
    cancel?: Function;
    confirm?: Function;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "FolderPage_" + ++__generate__Id;
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
import promptAction from '@ohos.promptAction';
import Imap, { inspect } from '@ohos/node-imap';
import router from '@ohos.router';
import GlobalObj from '../GlobalObj';
import MailBoxes from '../bean/MailBoxes';
import Box from '../bean/Box';
class CustomDialogDiy extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__textValue = new SynchedPropertySimpleTwoWay(params.textValue, this, "textValue");
        this.__inputValue = new SynchedPropertySimpleTwoWay(params.inputValue, this, "inputValue");
        this.controller = undefined;
        this.cancel = () => {
        };
        this.confirm = () => {
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CustomDialogDiy_Params) {
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
        this.__textValue.aboutToBeDeleted();
        this.__inputValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __textValue: SynchedPropertySimpleTwoWay<string>;
    get textValue() {
        return this.__textValue.get();
    }
    set textValue(newValue: string) {
        this.__textValue.set(newValue);
    }
    private __inputValue: SynchedPropertySimpleTwoWay<string>;
    get inputValue() {
        return this.__inputValue.get();
    }
    set inputValue(newValue: string) {
        this.__inputValue.set(newValue);
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private cancel: Function;
    private confirm: Function;
    render() {
        Column.create();
        Text.create('请输入文件夹名称');
        Text.fontSize(20);
        Text.margin({ top: 10, bottom: 10 });
        Text.width('90%');
        Text.pop();
        TextInput.create({ placeholder: '', text: this.textValue });
        TextInput.height(60);
        TextInput.width('90%');
        TextInput.onChange((value: string) => {
            this.textValue = value;
        });
        Text.create('Tips:请输入正确格式的输入的文件夹名称');
        Text.margin({ top: 10, bottom: 10 });
        Text.width('90%');
        Text.fontSize(8);
        Text.fontColor(Color.Red);
        Text.pop();
        Flex.create({ justifyContent: FlexAlign.SpaceAround });
        Button.createWithLabel('取消');
        Button.onClick(() => {
            this.controller.close();
            this.cancel();
        });
        Button.pop();
        Button.createWithLabel('确定');
        Button.onClick(() => {
            this.inputValue = this.textValue;
            this.controller.close();
            this.confirm();
        });
        Button.pop();
        Flex.pop();
        Column.pop();
    }
}
class FolderPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.__startIndex = new ObservedPropertySimple(1 //当前页
        , this, "startIndex");
        this.__endIndex = new ObservedPropertySimple(3 //当前页
        , this, "endIndex");
        this.__listData = new ObservedPropertyObject([] //邮件列表数据集合
        , this, "listData");
        this.__selectFolder = new ObservedPropertyObject('' //选择的文件夹
        , this, "selectFolder");
        this.__selectType = new ObservedPropertySimple('' //选择的文件夹
        , this, "selectType");
        this.__textValue = new ObservedPropertySimple('', this, "textValue");
        this.__inputValue = new ObservedPropertySimple('', this, "inputValue");
        this.pageSize = 3 //请求时的每页多少条信息，用于分页请求
        ;
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new CustomDialogDiy("3", this, {
                    cancel: () => {
                        this.showToast(`关闭了对话框，取消输入文件夹名称`, 'CustomDialogDiy-cancel');
                    },
                    confirm: () => {
                        if (!this.inputValue || this.inputValue.length < 1) {
                            this.showToast(`创建新的文件夹名称为空，请重新输入`, 'CustomDialogDiy-confirm');
                            return;
                        }
                        if (this.selectType === 'Create') {
                            this.showToast(`创建新的文件夹名称为：${this.inputValue}`, 'CustomDialogDiy-confirm');
                            this.createFolder();
                        }
                        else if (this.selectType === 'Rename') {
                            this.showToast(`重命名的文件夹名称为：${this.inputValue}`, 'CustomDialogDiy-confirm');
                            this.renameFolder();
                        }
                    },
                    textValue: this.__textValue,
                    inputValue: this.__inputValue
                });
                jsDialog.setController(this.dialogController);
                View.create(jsDialog);
            },
            autoCancel: true,
            customStyle: false
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: FolderPage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.startIndex !== undefined) {
            this.startIndex = params.startIndex;
        }
        if (params.endIndex !== undefined) {
            this.endIndex = params.endIndex;
        }
        if (params.listData !== undefined) {
            this.listData = params.listData;
        }
        if (params.selectFolder !== undefined) {
            this.selectFolder = params.selectFolder;
        }
        if (params.selectType !== undefined) {
            this.selectType = params.selectType;
        }
        if (params.textValue !== undefined) {
            this.textValue = params.textValue;
        }
        if (params.inputValue !== undefined) {
            this.inputValue = params.inputValue;
        }
        if (params.pageSize !== undefined) {
            this.pageSize = params.pageSize;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__startIndex.aboutToBeDeleted();
        this.__endIndex.aboutToBeDeleted();
        this.__listData.aboutToBeDeleted();
        this.__selectFolder.aboutToBeDeleted();
        this.__selectType.aboutToBeDeleted();
        this.__textValue.aboutToBeDeleted();
        this.__inputValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __startIndex: ObservedPropertySimple<number>; //当前页
    get startIndex() {
        return this.__startIndex.get();
    }
    set startIndex(newValue: number) {
        this.__startIndex.set(newValue);
    }
    private __endIndex: ObservedPropertySimple<number>; //当前页
    get endIndex() {
        return this.__endIndex.get();
    }
    set endIndex(newValue: number) {
        this.__endIndex.set(newValue);
    }
    private __listData: ObservedPropertyObject<Array<string>>; //邮件列表数据集合
    get listData() {
        return this.__listData.get();
    }
    set listData(newValue: Array<string>) {
        this.__listData.set(newValue);
    }
    private __selectFolder: ObservedPropertyObject<string | null>; //选择的文件夹
    get selectFolder() {
        return this.__selectFolder.get();
    }
    set selectFolder(newValue: string | null) {
        this.__selectFolder.set(newValue);
    }
    private __selectType: ObservedPropertySimple<string>; //选择的文件夹
    get selectType() {
        return this.__selectType.get();
    }
    set selectType(newValue: string) {
        this.__selectType.set(newValue);
    }
    private __textValue: ObservedPropertySimple<string>;
    get textValue() {
        return this.__textValue.get();
    }
    set textValue(newValue: string) {
        this.__textValue.set(newValue);
    }
    private __inputValue: ObservedPropertySimple<string>;
    get inputValue() {
        return this.__inputValue.get();
    }
    set inputValue(newValue: string) {
        this.__inputValue.set(newValue);
    }
    private pageSize: number; //请求时的每页多少条信息，用于分页请求
    private dialogController: CustomDialogController | null;
    showToast(text: string, name = '测试') {
        console.log(`zdy---${name}--->${text}`);
        promptAction.showToast({
            message: text,
            duration: 2000,
            bottom: 50
        });
    }
    aboutToAppear() {
        this.refreshFolderList();
    }
    aboutToDisappear() {
        this.dialogController = null;
    }
    refreshFolderList() {
        const ctx = this;
        if (GlobalObj?.getInstance()?.getClient()) {
            GlobalObj?.getInstance()?.getClient()?.getBoxes((err: Error, data?: MailBoxes) => {
                if (err)
                    throw err;
                if (!data || typeof data != 'object') {
                    throw new Error('get box status fail');
                }
                ctx.listData = [];
                let keyArr = Object.getOwnPropertyNames(data);
                for (let i = 0; i < keyArr.length; i++) {
                    console.log(`zdy---getBoxes key--->${keyArr[i]}`);
                    ctx.listData.push(keyArr[i]);
                }
            });
        }
        else {
            this.showToast('账号未登录，请登录后再试', 'MsgList-imap');
            router.back();
        }
    }
    render() {
        Column.create();
        Column.height('100%');
        Flex.create({ justifyContent: FlexAlign.Start, direction: FlexDirection.Row, alignItems: ItemAlign.Center });
        Flex.margin({ left: 15, top: 20 });
        Button.createWithLabel('删除文件夹');
        Button.margin(10);
        Button.width('80%');
        Button.height(50);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.onClick(() => {
            this.deleteFolder();
        });
        Button.pop();
        Button.createWithLabel('创建文件夹');
        Button.margin(10);
        Button.width('80%');
        Button.height(50);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.onClick(() => {
            this.selectType = 'Create';
            if (this.dialogController) {
                this.dialogController.open();
            }
            this.createFolder();
        });
        Button.pop();
        Button.createWithLabel('重命名文件夹');
        Button.margin(10);
        Button.width('80%');
        Button.height(50);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.onClick(() => {
            if (!this.selectFolder || this.selectFolder.length < 1) {
                this.showToast('请先选择一个需要重命名的文件夹', 'renameFolder-imap');
                return;
            }
            this.selectType = 'Rename';
            if (this.dialogController) {
                this.dialogController.open();
            }
            this.renameFolder();
        });
        Button.pop();
        Flex.pop();
        Flex.create({ justifyContent: FlexAlign.Start, direction: FlexDirection.Row, alignItems: ItemAlign.Center });
        Flex.margin({ left: 15, top: 20 });
        Button.createWithLabel('订阅邮箱');
        Button.margin(10);
        Button.width('80%');
        Button.height(50);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.onClick(() => {
            if (!this.selectFolder || this.selectFolder.length < 1) {
                this.showToast('请先选择一个需要重命名的文件夹', 'renameFolder-imap');
                return;
            }
            this.subBox();
        });
        Button.pop();
        Button.createWithLabel('取消订阅邮箱');
        Button.margin(10);
        Button.width('80%');
        Button.height(50);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.onClick(() => {
            if (!this.selectFolder || this.selectFolder.length < 1) {
                this.showToast('请先选择一个需要重命名的文件夹', 'renameFolder-imap');
                return;
            }
            this.unSubBox();
        });
        Button.pop();
        Button.createWithLabel('获取所有订阅邮箱件');
        Button.margin(10);
        Button.width('80%');
        Button.height(50);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.onClick(() => {
            this.getSubList();
        });
        Button.pop();
        Flex.pop();
        List.create({ space: 10, initialIndex: 0 });
        List.width('100%');
        List.listDirection(Axis.Vertical);
        List.divider({ strokeWidth: 2, color: 0x888888 });
        List.edgeEffect(EdgeEffect.None);
        List.chainAnimation(false);
        ForEach.create("2", this, ObservedObject.GetRawObject(this.listData), (item: string, index: number) => {
            ListItem.create();
            ListItem.onClick(() => {
            });
            Gesture.create(GesturePriority.Parallel, GestureMask.Normal);
            TapGesture.create();
            TapGesture.onAction((event) => {
                this.showToast(`准备进入文件夹：${item}`, 'folder-click-imap');
                router.pushUrl({
                    url: 'pages/MsgListPage',
                    params: {
                        folderName: item,
                        folderList: this.listData
                    }
                });
            });
            TapGesture.pop();
            Gesture.pop();
            Gesture.create(GesturePriority.Low, GestureMask.Normal);
            LongPressGesture.create();
            LongPressGesture.onAction((event) => {
                if (this.selectFolder) {
                    this.selectFolder = null;
                }
                else {
                    this.selectFolder = item;
                }
            });
            LongPressGesture.pop();
            Gesture.pop();
            Flex.create({ alignItems: ItemAlign.Start, justifyContent: FlexAlign.Start, direction: FlexDirection.Row });
            Toggle.create({ type: ToggleType.Checkbox, isOn: true });
            Toggle.size({ width: 30, height: 30 });
            Toggle.selectedColor('#007DFF');
            Toggle.visibility(this.selectFolder && this.selectFolder === item ? Visibility.Visible : Visibility.None);
            Toggle.pop();
            Image.create($r('app.media.fileDir'));
            Image.height(40);
            Image.width(40);
            Image.margin({ left: 10 });
            Text.create(item);
            Text.fontSize(20);
            Text.height(50);
            Text.margin({ left: 10 });
            Text.fontWeight(FontWeight.Bold);
            Text.pop();
            Flex.pop();
            ListItem.pop();
        }, (item: string, index: number) => item);
        ForEach.pop();
        List.pop();
        Column.pop();
    }
    deleteFolder() {
        const ctx = this;
        try {
            if (!ctx.selectFolder || ctx.selectFolder.length < 1) {
                ctx.showToast('请先选择一个需要删除的文件夹', 'renameFolder-imap');
                return;
            }
            ctx.showToast('开始删除文件夹', 'deleteFolder-imap');
            if (GlobalObj?.getInstance()?.getClient()) {
                GlobalObj?.getInstance()?.getClient()?.delBox(ctx.selectFolder, (err: Error) => {
                    if (err) {
                        ctx.showToast('删除文件夹失败', 'deleteFolder-imap');
                    }
                    else {
                        ctx.selectFolder = null;
                        ctx.showToast('删除文件夹成功', 'deleteFolder-imap');
                        ctx.refreshFolderList();
                    }
                });
            }
            else {
                this.showToast('账号未登录，请登录后再试', 'MsgList-imap');
                router.back();
            }
        }
        catch (err) {
            ctx.showToast(`账号登录出错：${err.message}`, 'login-smtp');
        }
    }
    createFolder() {
        const ctx = this;
        try {
            if (!ctx.inputValue || ctx.inputValue.length < 1) {
                ctx.showToast('请先输入新的文件夹的名字', 'renameFolder-imap');
                return;
            }
            ctx.showToast('开始创建文件夹', 'createFolder-imap');
            if (GlobalObj?.getInstance()?.getClient()) {
                GlobalObj?.getInstance()?.getClient()?.addBox(ctx.inputValue, (err: Error) => {
                    if (err) {
                        ctx.showToast(`创建文件夹失败,原因：${err.message}`, 'createFolder-imap');
                    }
                    else {
                        ctx.inputValue = '';
                        ctx.textValue = '';
                        ctx.showToast('创建文件夹成功', 'createFolder-imap');
                        ctx.refreshFolderList();
                    }
                });
            }
            else {
                this.showToast('账号未登录，请登录后再试', 'createFolder-imap');
                router.back();
            }
        }
        catch (err) {
            ctx.showToast(`账号登录出错：${err.message}`, 'createFolder-smtp');
        }
    }
    renameFolder() {
        const ctx = this;
        try {
            if (!ctx.selectFolder || ctx.selectFolder.length < 1) {
                ctx.showToast('请先选择一个需要重命名的文件夹', 'renameFolder-imap');
                return;
            }
            if (!ctx.inputValue || ctx.inputValue.length < 1) {
                ctx.showToast('请先输入新的文件夹的名字', 'renameFolder-imap');
                return;
            }
            ctx.showToast('开始重命名文件夹', 'renameFolder-imap');
            if (GlobalObj?.getInstance()?.getClient()) {
                GlobalObj?.getInstance()?.getClient()?.renameBox(ctx.selectFolder, ctx.inputValue, (err: Error, result: Box) => {
                    if (err) {
                        ctx.showToast(`重命名文件夹失败,原因：${err.message}`, 'renameFolder-imap');
                    }
                    else {
                        ctx.selectFolder = null;
                        ctx.inputValue = '';
                        ctx.textValue = '';
                        ctx.showToast('重命名文件夹成功', 'renameFolder-imap');
                        ctx.refreshFolderList();
                    }
                });
            }
            else {
                this.showToast('账号未登录，请登录后再试', 'renameFolder-imap');
                router.back();
            }
        }
        catch (err) {
            ctx.showToast(`账号登录出错：${err.message}`, 'renameFolder-smtp');
        }
    }
    subBox() {
        const ctx = this;
        try {
            if (!ctx.selectFolder || ctx.selectFolder.length < 1) {
                ctx.showToast('请先选择邮箱', 'subBox-imap');
                return;
            }
            ctx.showToast('订阅一个文件夹', 'subBox-imap');
            if (GlobalObj?.getInstance()?.getClient()) {
                GlobalObj?.getInstance()?.getClient()?.subscribeBox(this.selectFolder, (err: Error) => {
                    if (err) {
                        ctx.showToast(`订阅邮箱失败,原因：${err.message}`, 'subBox-imap');
                    }
                    else {
                        ctx.inputValue = '';
                        ctx.textValue = '';
                        ctx.showToast('订阅邮箱成功', 'subBox-imap');
                        // ctx.refreshFolderList()
                    }
                });
            }
            else {
                this.showToast('账号未登录，请登录后再试', 'subBox-imap');
                router.back();
            }
        }
        catch (err) {
            ctx.showToast(`订阅邮箱出错：${err.message}`, 'subBox-smtp');
        }
    }
    unSubBox() {
        const ctx = this;
        try {
            if (!ctx.selectFolder || ctx.selectFolder.length < 1) {
                ctx.showToast('请先选择邮箱', 'unSubBox-imap');
                return;
            }
            ctx.showToast('取消订阅邮箱', 'unSubBox-imap');
            if (GlobalObj?.getInstance()?.getClient()) {
                GlobalObj?.getInstance()?.getClient()?.unsubscribeBox(this.selectFolder, (err: Error) => {
                    if (err) {
                        ctx.showToast(`取消订阅邮箱失败,原因：${err.message}`, 'unSubBox-imap');
                    }
                    else {
                        ctx.inputValue = '';
                        ctx.textValue = '';
                        ctx.showToast('取消订阅邮箱成功', 'unSubBox-imap');
                        // ctx.refreshFolderList()
                    }
                });
            }
            else {
                this.showToast('账号未登录，请登录后再试', 'unSubBox-imap');
                router.back();
            }
        }
        catch (err) {
            ctx.showToast(`取消订阅邮箱出错：${err.message}`, 'unSubBox-smtp');
        }
    }
    getSubList() {
        const ctx = this;
        try {
            ctx.showToast('开始回用户$HOME目录下所有的文件，但LSUB命令只显示那些使用SUBSCRIBE命令设置为活动邮箱的文件。两个参数：邮箱路径和邮箱名。', 'closeBox-imap');
            if (GlobalObj?.getInstance()?.getClient()) {
                GlobalObj?.getInstance()?.getClient()?.getSubscribedBoxes((err: Error, result: MailBoxes) => {
                    if (err) {
                        ctx.showToast(`获取所有活动邮箱的文件失败,原因：${err.message}`, 'expungeMail-imap');
                    }
                    else {
                        ctx.showToast('获取所有活动邮箱的文件成功', 'expungeMail-imap');
                        ctx.listData = [];
                        let keyArr = Object.getOwnPropertyNames(result);
                        for (let i = 0; i < keyArr.length; i++) {
                            console.log(`zdy---getBoxes key--->${keyArr[i]}`);
                            ctx.listData.push(keyArr[i]);
                        }
                    }
                });
            }
            else {
                this.showToast('账号未登录，请登录后再试', 'expungeMail-imap');
                router.back();
            }
        }
        catch (err) {
            ctx.showToast(`获取所有活动邮箱的文件出错：${err.message}`, 'expungeMail-smtp');
        }
    }
}
loadDocument(new FolderPage("1", undefined, {}));
