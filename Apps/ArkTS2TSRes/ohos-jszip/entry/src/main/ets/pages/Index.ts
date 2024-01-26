interface Index_Params {
    instance?: JSZip;
    directory?: Array<JSZipObject>;
    currentInstance?: JSZip | null;
    index?: number;
    create_type?: "DIR" | "FILE" | "ZIP";
    currentFolder?: string;
    password?: string | null;
    isLoading?: boolean;
    dialogController?: CustomDialogController;
    /**
     * 调试日志
     */
    debugger?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
import JSZip, { JSZipObject } from "@ohos/jszip";
import { BuildButtonOptions, Files, ReturnValue } from '../types/type';
import promptAction from '@ohos.promptAction';
import { writeCacheDirFile, loadAsyncFromRawFile } from "../utils/FileSaver";
import { log } from "../utils/log";
import { CreateDirOrFile } from "../components/CreateDirOrFile";
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__instance = new ObservedPropertyObject(new JSZip(), this, "instance");
        this.__directory = new ObservedPropertyObject([], this, "directory");
        this.__currentInstance = new ObservedPropertyObject(null, this, "currentInstance");
        this.__index = new ObservedPropertySimple(0, this, "index");
        this.__create_type = new ObservedPropertySimple("DIR", this, "create_type");
        this.__currentFolder = new ObservedPropertySimple("", this, "currentFolder");
        this.__password = new ObservedPropertyObject(null, this, "password");
        this.__isLoading = new ObservedPropertySimple(false, this, "isLoading");
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new CreateDirOrFile("3", this, {
                    create_type: this.create_type,
                    confirm: (data): void => this.onConfirm(data),
                    cancel: (): void => this.onCancel()
                });
                jsDialog.setController(this.dialogController);
                View.create(jsDialog);
            },
            autoCancel: true
        }, this);
        this.debugger = () => {
            log(this.instance.files);
            log(this.directory);
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.instance !== undefined) {
            this.instance = params.instance;
        }
        if (params.directory !== undefined) {
            this.directory = params.directory;
        }
        if (params.currentInstance !== undefined) {
            this.currentInstance = params.currentInstance;
        }
        if (params.index !== undefined) {
            this.index = params.index;
        }
        if (params.create_type !== undefined) {
            this.create_type = params.create_type;
        }
        if (params.currentFolder !== undefined) {
            this.currentFolder = params.currentFolder;
        }
        if (params.password !== undefined) {
            this.password = params.password;
        }
        if (params.isLoading !== undefined) {
            this.isLoading = params.isLoading;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
        if (params.debugger !== undefined) {
            this.debugger = params.debugger;
        }
    }
    aboutToBeDeleted() {
        this.__instance.aboutToBeDeleted();
        this.__directory.aboutToBeDeleted();
        this.__currentInstance.aboutToBeDeleted();
        this.__index.aboutToBeDeleted();
        this.__create_type.aboutToBeDeleted();
        this.__currentFolder.aboutToBeDeleted();
        this.__password.aboutToBeDeleted();
        this.__isLoading.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __instance: ObservedPropertyObject<JSZip>;
    get instance() {
        return this.__instance.get();
    }
    set instance(newValue: JSZip) {
        this.__instance.set(newValue);
    }
    private __directory: ObservedPropertyObject<Array<JSZipObject>>;
    get directory() {
        return this.__directory.get();
    }
    set directory(newValue: Array<JSZipObject>) {
        this.__directory.set(newValue);
    }
    private __currentInstance: ObservedPropertyObject<JSZip | null>;
    get currentInstance() {
        return this.__currentInstance.get();
    }
    set currentInstance(newValue: JSZip | null) {
        this.__currentInstance.set(newValue);
    }
    private __index: ObservedPropertySimple<number>;
    get index() {
        return this.__index.get();
    }
    set index(newValue: number) {
        this.__index.set(newValue);
    }
    private __create_type: ObservedPropertySimple<"DIR" | "FILE" | "ZIP">;
    get create_type() {
        return this.__create_type.get();
    }
    set create_type(newValue: "DIR" | "FILE" | "ZIP") {
        this.__create_type.set(newValue);
    }
    private __currentFolder: ObservedPropertySimple<string>;
    get currentFolder() {
        return this.__currentFolder.get();
    }
    set currentFolder(newValue: string) {
        this.__currentFolder.set(newValue);
    }
    private __password: ObservedPropertyObject<string | null>;
    get password() {
        return this.__password.get();
    }
    set password(newValue: string | null) {
        this.__password.set(newValue);
    }
    private __isLoading: ObservedPropertySimple<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(newValue: boolean) {
        this.__isLoading.set(newValue);
    }
    private dialogController: CustomDialogController;
    BuildButton(text: string, callback?: () => void, options: BuildButtonOptions = {
        bgColor: Color.Blue,
        color: Color.White,
        borderOptions: {}
    }, parent = null) {
        Button.createWithLabel(text);
        Button.fontSize(14);
        Button.fontColor(options.color);
        Button.backgroundColor(options.bgColor);
        Button.border(options.borderOptions);
        Button.onClick(callback);
        Button.margin({ bottom: 8 });
        Button.pop();
    }
    BuildDirOrFile(item: JSZipObject, parent = null) {
        If.create();
        if (this.isDir(item)) {
            If.branchId(0);
            Flex.create({ justifyContent: FlexAlign.SpaceAround });
            Text.create(item.name);
            Text.fontSize(22);
            Text.padding(8);
            Text.width("100%");
            Text.border({ width: { bottom: 1 }, color: "#ff6700" });
            Text.onClick(() => {
                this.currentFolder = item.name;
            });
            Text.pop();
            Button.createWithLabel("删除");
            Button.onClick(() => {
                this.removeDirOrFile(item.name);
            });
            Button.pop();
            Flex.pop();
        }
        else {
            If.branchId(1);
            Flex.create({ justifyContent: FlexAlign.SpaceAround });
            Text.create(item.name);
            Text.fontSize(20);
            Text.padding(4);
            Text.width("100%");
            Text.fontColor(Color.Grey);
            Text.pop();
            Button.createWithLabel("删除");
            Button.onClick(() => {
                this.removeDirOrFile(item.name);
            });
            Button.pop();
            Flex.pop();
        }
        If.pop();
    }
    createDir() {
        this.create_type = "DIR";
        this.openDialog();
    }
    createFile() {
        this.create_type = "FILE";
        this.openDialog();
    }
    removeDirOrFile(path: string) {
        this.instance.remove(path);
        this.refresh();
        promptAction.showToast({ message: `删除成功` });
    }
    openDialog() {
        this.dialogController.open();
    }
    closeDialog() {
        this.dialogController?.close();
    }
    openLoading() {
        this.isLoading = true;
    }
    closeLoading() {
        this.isLoading = false;
    }
    onConfirm(data: ReturnValue) {
        const type = data.create_type;
        if (type === 'DIR') {
            if (!data.folderName) {
                promptAction.showToast({ message: `创建失败,请输入正确的文件夹名称!` });
                return;
            }
            const folderName = this.currentFolder + data.folderName;
            folderName && this.instance.folder(folderName);
            promptAction.showToast({ message: `文件夹创建成功!` });
            this.refresh();
            this.dialogController?.close();
        }
        else if (type === "FILE") {
            if (!data.fileName || !data.contentText) {
                promptAction.showToast({ message: `创建失败,请输入正确的文件名称以及内容!` });
                return;
            }
            const fileName = this.currentFolder + data.fileName;
            const content = data.contentText;
            fileName && content && this.instance.file(fileName, content);
            promptAction.showToast({ message: `文件创建成功!` });
            this.refresh();
            this.dialogController?.close();
        }
        else if (type === "ZIP") {
            const zipName = data.zipName;
            if (!zipName) {
                promptAction.showToast({ message: `文件名称不能为空` });
                return;
            }
            loadAsyncFromRawFile(zipName).then(res => {
                if (!res) {
                    promptAction.showToast({ message: `没有找到此压缩文件!` });
                    // this.closeLoading();
                    return;
                }
                this.closeDialog();
                this.openLoading();
                this.instance.loadAsync(res).then(() => {
                    this.refresh();
                    promptAction.showToast({ message: "解压缩文件成功!" });
                    this.closeLoading();
                }).catch((err: Error) => {
                    promptAction.showToast({ message: "解压缩文件失败!  错误原因：" + err.message });
                    log(err.message);
                    this.closeLoading();
                    this.closeDialog();
                });
            });
        }
    }
    onCancel() {
        this.dialogController?.close();
    }
    forEachZIP() {
        this.instance.forEach((_, file) => {
            log(file);
        });
    }
    filterZIP() {
        const zips = this.instance.filter((_, file) => (file.dir === false));
        log(zips);
    }
    generateZIP() {
        this.openLoading();
        this.instance.generateAsync({ type: "arraybuffer", password: this.password, encryptStrength: 3 }).then(res => {
            writeCacheDirFile(`prod-${Date.now()}.zip`, res);
            this.closeLoading();
        })
            .catch((err: object) => {
            this.closeLoading();
            promptAction.showToast({ message: `生成压缩文件失败!` });
            log(`生成压缩文件失败 ${err}`);
        });
    }
    loadAsyncFile() {
        this.create_type = "ZIP";
        this.openDialog();
    }
    refresh() {
        this.directory = this.format(this.instance.files);
    }
    isDir(item: JSZipObject): boolean {
        return item.dir;
    }
    format(files: Files): Array<JSZipObject> {
        return Object.keys(files).map(v => (files[v]));
    }
    /**
     * 调试日志
     */
    private debugger;
    render() {
        Scroll.create();
        Scroll.width("100%");
        Scroll.height("100%");
        Column.create();
        Column.width('100%');
        Column.height("100%");
        Column.justifyContent(FlexAlign.Start);
        Column.padding({ left: 4, right: 4, top: 4 });
        Flex.create({ justifyContent: FlexAlign.SpaceBetween, wrap: FlexWrap.Wrap });
        Row.create({ space: 8 });
        Row.margin({ bottom: 8 });
        this.BuildButton("+新建文件夹", (): void => this.createDir(), this);
        this.BuildButton("+新建文件", (): void => this.createFile(), {
            bgColor: Color.White,
            color: Color.Black,
            borderOptions: { width: 2, color: Color.Black }
        }, this);
        Row.pop();
        this.BuildButton("加载压缩文件", (): void => this.loadAsyncFile(), { bgColor: Color.Green }, this);
        this.BuildButton("生成压缩文件", (): void => this.generateZIP(), { bgColor: Color.Orange }, this);
        // this.BuildButton("查看文件信息",this.debugger,{bgColor:Color.Gray});
        this.BuildButton("遍历(目录及文件)", (): void => this.forEachZIP(), this);
        this.BuildButton("过滤(过滤文件)", (): void => this.filterZIP(), this);
        Flex.pop();
        Row.create();
        Text.create("设置密码：");
        Text.pop();
        TextInput.create({ placeholder: '请输入密码...', text: this.password || "" });
        TextInput.height(40);
        TextInput.width('50%');
        TextInput.onChange((value: string) => {
            this.password = value;
        });
        TextInput.margin({ bottom: 12 });
        Row.pop();
        Row.create();
        Row.justifyContent(FlexAlign.Start);
        Row.padding({ left: 8, right: 8, top: 24, bottom: 24 });
        Row.width("100%");
        Text.create(`当前选中文件夹：${this.currentFolder || '根目录'}`);
        Text.fontSize(20);
        Text.fontColor(Color.Red);
        Text.textAlign(TextAlign.Start);
        Text.margin({ right: 10 });
        Text.pop();
        this.BuildButton("选择根目录", () => this.currentFolder = "", this);
        Row.pop();
        List.create();
        List.width("100%");
        List.layoutWeight(1);
        ForEach.create("2", this, ObservedObject.GetRawObject(this.directory), (item: JSZipObject) => {
            ListItem.create();
            this.BuildDirOrFile(item, this);
            ListItem.pop();
        });
        ForEach.pop();
        List.pop();
        Flex.create({ justifyContent: FlexAlign.Center, alignItems: ItemAlign.Center });
        Flex.position({ x: 0, y: 0 });
        Flex.opacity(0.3);
        Flex.backgroundColor(Color.Black);
        Flex.width("100%");
        Flex.height("100%");
        Flex.visibility(this.isLoading ? Visibility.Visible : Visibility.None);
        LoadingProgress.create();
        LoadingProgress.color(Color.White);
        LoadingProgress.width(100);
        LoadingProgress.height(100);
        Flex.pop();
        Column.pop();
        Scroll.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
