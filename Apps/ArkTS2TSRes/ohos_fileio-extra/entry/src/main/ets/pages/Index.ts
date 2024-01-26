interface Index_Params {
    dialogController?: CustomDialogController;
    txtWrites?: CustomDialogController;
    path?: string;
    originalPath?: string;
    files?: Array<FileType | string>;
    copyFile?: Array<string>;
    funPages?: number;
    pageEnabled?: boolean;
    judgmentsFile?: string;
    copyEnabled?: boolean;
    moveEnabled?: boolean;
    scroller?: Scroller;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
import fs from "@ohos/fileio-extra";
import dirName from "@ohos/fileio-extra/src/main/ets/components/node/path";
import { create, CustomDialogExample } from "./create";
import router from "@system.router";
import { TxtWrite, txtWrite } from "./write";
import { FileType, ThatType } from "../utils/FileType";
import { getKeys } from "../utils/getKey";
import { GlobalContext } from "../entryability/GlobalContext";
let that: ThatType = {
    path: "",
    files: [],
    refresh: (path: string) => { }
};
let fileDir: string = GlobalContext.getContext().getObject("fileDir") as string;
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new CustomDialogExample("3", this, { confirm: this.onAccept });
                jsDialog.setController(this.dialogController);
                View.create(jsDialog);
            },
            autoCancel: true
        }, this);
        this.txtWrites = new CustomDialogController({
            builder: () => {
                let jsDialog = new TxtWrite("4", this, { confirm: this.write });
                jsDialog.setController(this.txtWrites);
                View.create(jsDialog);
            },
            autoCancel: true
        }, this);
        this.__path = new ObservedPropertySimple("", this, "path");
        this.__originalPath = new ObservedPropertySimple("", this, "originalPath");
        this.__files = new ObservedPropertyObject([], this, "files");
        this.__copyFile = new ObservedPropertyObject([], this, "copyFile");
        this.__funPages = new ObservedPropertySimple(1, this, "funPages");
        this.__pageEnabled = new ObservedPropertySimple(false, this, "pageEnabled");
        this.__judgmentsFile = new ObservedPropertySimple("", this, "judgmentsFile");
        this.__copyEnabled = new ObservedPropertySimple(true, this, "copyEnabled");
        this.__moveEnabled = new ObservedPropertySimple(true, this, "moveEnabled");
        this.scroller = new Scroller();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
        if (params.txtWrites !== undefined) {
            this.txtWrites = params.txtWrites;
        }
        if (params.path !== undefined) {
            this.path = params.path;
        }
        if (params.originalPath !== undefined) {
            this.originalPath = params.originalPath;
        }
        if (params.files !== undefined) {
            this.files = params.files;
        }
        if (params.copyFile !== undefined) {
            this.copyFile = params.copyFile;
        }
        if (params.funPages !== undefined) {
            this.funPages = params.funPages;
        }
        if (params.pageEnabled !== undefined) {
            this.pageEnabled = params.pageEnabled;
        }
        if (params.judgmentsFile !== undefined) {
            this.judgmentsFile = params.judgmentsFile;
        }
        if (params.copyEnabled !== undefined) {
            this.copyEnabled = params.copyEnabled;
        }
        if (params.moveEnabled !== undefined) {
            this.moveEnabled = params.moveEnabled;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
    }
    aboutToBeDeleted() {
        this.__path.aboutToBeDeleted();
        this.__originalPath.aboutToBeDeleted();
        this.__files.aboutToBeDeleted();
        this.__copyFile.aboutToBeDeleted();
        this.__funPages.aboutToBeDeleted();
        this.__pageEnabled.aboutToBeDeleted();
        this.__judgmentsFile.aboutToBeDeleted();
        this.__copyEnabled.aboutToBeDeleted();
        this.__moveEnabled.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private dialogController: CustomDialogController;
    private txtWrites: CustomDialogController;
    write(data: string) {
        //写入异步
        fs.writeFile(that.path, data, () => {
            that.files.splice(0);
            that.files.push(fs.readTextSync(that.path));
        });
        //写入同步
        //    fs.writeFileSync(that.path, data)
    }
    onAccept(fileName: string, dist: string, context?: string) {
        if (fileName.length <= 0) {
            return;
        }
        if (dist == "folder") {
            //同步
            let name: string = "";
            that.files.forEach((item: FileType | string, index: number) => {
                if (typeof item != "string") {
                    if (fileName == item.filename) {
                        name = item.filename;
                    }
                }
            });
            // 判断当前页面是否有同名的文件夹
            if (fileName == name) {
            }
            else {
                fs.mkdirsSync(that.path + "/" + fileName);
                //异步
                fs.mkdirs(that.path + "/2" + fileName).then(() => {
                    that.refresh(that.path);
                });
            }
        }
        else {
            //同步
            fs.outputFileSync(that.path + "/" + fileName, context);
            //异步
            fs.outputFile(that.path + "/2" + fileName, context, (e: string) => {
                that.refresh(that.path);
                console.log(e);
            });
        }
    }
    private __path: ObservedPropertySimple<string>;
    get path() {
        return this.__path.get();
    }
    set path(newValue: string) {
        this.__path.set(newValue);
    }
    private __originalPath: ObservedPropertySimple<string>;
    get originalPath() {
        return this.__originalPath.get();
    }
    set originalPath(newValue: string) {
        this.__originalPath.set(newValue);
    }
    private __files: ObservedPropertyObject<Array<FileType | string>>;
    get files() {
        return this.__files.get();
    }
    set files(newValue: Array<FileType | string>) {
        this.__files.set(newValue);
    }
    private __copyFile: ObservedPropertyObject<Array<string>>;
    get copyFile() {
        return this.__copyFile.get();
    }
    set copyFile(newValue: Array<string>) {
        this.__copyFile.set(newValue);
    }
    private __funPages: ObservedPropertySimple<number>;
    get funPages() {
        return this.__funPages.get();
    }
    set funPages(newValue: number) {
        this.__funPages.set(newValue);
    }
    private __pageEnabled: ObservedPropertySimple<boolean>;
    get pageEnabled() {
        return this.__pageEnabled.get();
    }
    set pageEnabled(newValue: boolean) {
        this.__pageEnabled.set(newValue);
    }
    private __judgmentsFile: ObservedPropertySimple<string>;
    get judgmentsFile() {
        return this.__judgmentsFile.get();
    }
    set judgmentsFile(newValue: string) {
        this.__judgmentsFile.set(newValue);
    }
    private __copyEnabled: ObservedPropertySimple<boolean>;
    get copyEnabled() {
        return this.__copyEnabled.get();
    }
    set copyEnabled(newValue: boolean) {
        this.__copyEnabled.set(newValue);
    }
    private __moveEnabled: ObservedPropertySimple<boolean>;
    get moveEnabled() {
        return this.__moveEnabled.get();
    }
    set moveEnabled(newValue: boolean) {
        this.__moveEnabled.set(newValue);
    }
    private scroller: Scroller;
    refresh(path: string) {
        this.files.splice(0);
        fs.readdirSync(path).forEach((itemData: string) => {
            let data: FileType = {
                filename: itemData,
                isOn: false
            };
            this.files.push(data);
        });
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center });
        Flex.width("100%");
        Flex.height("100%");
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Column.width(300);
        Column.height(230);
        Column.border({ width: "4px", color: "#c5bfbf", radius: 10 });
        Column.margin("20px");
        Text.create("文件夹或文件的路劲信息");
        Text.fontSize(24);
        Text.width("100%");
        Text.height(34);
        Text.pop();
        Divider.create();
        Divider.color("#e1d7d7");
        Divider.strokeWidth(2);
        Divider.width(300);
        Column.create();
        Column.height(190);
        Column.margin({ left: 5 });
        Column.alignItems(HorizontalAlign.Start);
        Scroll.create(this.scroller);
        Scroll.scrollBar(BarState.Off);
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        ForEach.create("2", this, ObservedObject.GetRawObject(this.files), (item: FileType | string, index) => {
            If.create();
            if (index != undefined) {
                If.branchId(0);
                Row.create();
                Row.height(30);
                Text.create(typeof item != "string" ? item.filename : item);
                Text.fontColor("#7e7a7a");
                Text.fontSize(24);
                Text.onClick(() => {
                    if (typeof item == "string") {
                        return;
                    }
                    if (!fs.statSync(this.path + "/" + item.filename)!.isDirectory()) {
                        if (item.filename.endsWith(".txt")) {
                            this.files.splice(0);
                            //读取同步
                            this.files.push(fs.readTextSync(this.path + "/" + item.filename));
                            this.path += "/" + item.filename;
                        }
                        else {
                            //                          let jsonData = fs.readJSONSync(this.path + '/' + item.filename, 'utf-8')
                            //读取异步
                            fs.readJSON(this.path + "/" + item.filename, "utf-8", (err: Error, read: FileType | string) => {
                                this.files.splice(0);
                                this.files.push(read);
                                this.path += "/" + item.filename;
                            });
                        }
                    }
                    else {
                        this.refresh((this.path + "/" + item.filename));
                        this.path += "/" + item.filename;
                    }
                });
                Text.pop();
                If.create();
                if (typeof item != "string") {
                    If.branchId(0);
                    Toggle.create({ type: ToggleType.Checkbox, isOn: item.isOn });
                    Toggle.selectedColor(0x39a2db);
                    Toggle.size({ width: 24, height: 24 });
                    Toggle.onChange((isOn: boolean) => {
                        if (typeof this.files[index] != "string")
                            (this.files[index] as FileType).isOn = isOn;
                    });
                    Toggle.pop();
                }
                If.pop();
                Row.pop();
            }
            If.pop();
        });
        ForEach.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
        Column.pop();
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Column.width("80%");
        Button.createWithLabel("上一级");
        Button.onClick(() => {
            let originalPath: string = dirName.dirname(this.path);
            try {
                this.refresh(originalPath);
                this.path = originalPath;
            }
            catch (err) {
                this.refresh(this.path);
            }
        });
        Button.pop();
        Column.pop();
        If.create();
        if (this.funPages == 1) {
            If.branchId(0);
            Button.createWithLabel("创建文件夹");
            Button.enabled(this.path.endsWith(".txt") || this.path.endsWith(".json") ? false : true);
            Button.opacity(this.path.endsWith(".txt") || this.path.endsWith(".json") ? 0.4 : 1);
            Button.onClick(() => {
                create("folder");
                this.dialogController.open();
            });
            Button.pop();
            Button.createWithLabel("创建txt文件");
            Button.enabled(this.path.endsWith(".txt") || this.path.endsWith(".json") ? false : true);
            Button.opacity(this.path.endsWith(".txt") || this.path.endsWith(".json") ? 0.4 : 1);
            Button.margin({ top: 5, bottom: 5 });
            Button.onClick(() => {
                create("file");
                this.dialogController.open();
            });
            Button.pop();
            Button.createWithLabel("创建json文件");
            Button.enabled(this.path.endsWith(".txt") || this.path.endsWith(".json") ? false : true);
            Button.opacity(this.path.endsWith(".txt") || this.path.endsWith(".json") ? 0.4 : 1);
            Button.onClick(() => {
                router.replace({ uri: "pages/createJsonFile", params: { path: this.path } });
            });
            Button.pop();
            Button.createWithLabel("删除");
            Button.enabled(this.path.endsWith(".txt") || this.path.endsWith(".json") ? false : true);
            Button.opacity(this.path.endsWith(".txt") || this.path.endsWith(".json") ? 0.4 : 1);
            Button.margin({ top: 5, bottom: 5 });
            Button.onClick(() => {
                this.files.forEach((item, index) => {
                    if (typeof item != "string") {
                        if (item.isOn) {
                            //删除同步
                            //                fs.removeSync(this.path + '/' + item.filename)
                            //                this.refresh(this.path)
                            //删除异步
                            fs.remove(this.path + "/" + item.filename).then(() => {
                                this.refresh(this.path);
                            });
                        }
                    }
                });
            });
            Button.pop();
            Row.create();
            Button.createWithLabel("复制");
            Button.enabled(this.copyEnabled);
            Button.opacity(this.copyEnabled ? 1 : 0.4);
            Button.margin({ right: 10 });
            Button.onClick(() => {
                this.originalPath = "";
                this.files.forEach((item, index) => {
                    if (typeof item != "string") {
                        if (item.isOn) {
                            this.copyFile.push(item.filename);
                        }
                    }
                });
                if (this.copyFile.length <= 0)
                    return;
                this.copyEnabled = !this.copyEnabled;
                this.originalPath = this.path;
            });
            Button.pop();
            Button.createWithLabel("粘贴");
            Button.enabled(!this.copyEnabled);
            Button.opacity(!this.copyEnabled ? 1 : 0.4);
            Button.margin({ left: 10 });
            Button.onClick(() => {
                this.copyEnabled = !this.copyEnabled;
                this.copyFile.forEach((item, index) => {
                    if (!fs.pathExistsSync(this.path + "/" + item)) {
                        //异拷贝
                        fs.copy(this.originalPath + "/" + item, this.path + "/" + item, () => {
                            this.refresh(this.path);
                        });
                        //同步拷贝
                        //                  fs.copySync(this.originalPath + '/' + item, this.path + '/' + item)
                    }
                    if (index == this.copyFile.length - 1) {
                        this.copyFile.splice(0);
                    }
                });
            });
            Button.pop();
            Row.pop();
            Row.create();
            Row.margin({ top: 5, bottom: 5 });
            Button.createWithLabel("移动");
            Button.enabled(this.moveEnabled);
            Button.opacity(this.moveEnabled ? 1 : 0.4);
            Button.margin({ right: 10 });
            Button.onClick(() => {
                this.originalPath = "";
                this.files.forEach((item, index) => {
                    if (typeof item != "string") {
                        if (item.isOn) {
                            this.copyFile.push(item.filename);
                        }
                    }
                });
                if (this.copyFile.length <= 0)
                    return;
                this.moveEnabled = !this.moveEnabled;
                this.originalPath = this.path;
            });
            Button.pop();
            Button.createWithLabel("移入");
            Button.enabled(!this.moveEnabled);
            Button.opacity(!this.moveEnabled ? 1 : 0.4);
            Button.margin({ left: 10 });
            Button.onClick(() => {
                this.moveEnabled = !this.moveEnabled;
                this.copyFile.forEach((item, index) => {
                    if (!fs.pathExistsSync(this.path + "/" + item)) {
                        //                  异步移动
                        fs.move(this.originalPath + "/" + item, this.path + "/" + item).then(() => {
                            //                    this.copyFile.splice(0)
                            this.refresh(this.path);
                        });
                        //同步移动
                        //                  fs.moveSync(this.originalPath + '/' + item, this.path + '/' + item)
                    }
                    if (index == this.copyFile.length - 1) {
                        this.copyFile.splice(0);
                    }
                });
            });
            Button.pop();
            Row.pop();
        }
        else {
            If.branchId(1);
            Text.create("输入框只对第一个按钮有效！");
            Text.fontSize(14);
            Text.pop();
            TextInput.create({ placeholder: "请输入文件名" });
            TextInput.width("60%");
            TextInput.onChange((value) => {
                this.judgmentsFile = value;
            });
            Button.createWithLabel("该目录是否有该文件");
            Button.margin({ top: 10, bottom: 10 });
            Button.onClick(() => {
                //同步判断
                //            let judgments = fs.pathExistsSync(this.path + '/' + this.judgmentsFile)
                //异步判断
                fs.pathExists(this.path + "/" + this.judgmentsFile).then((judgments: boolean) => {
                    let context = (judgments ? "存在" : "不存在") + this.judgmentsFile + "文件或文件夹";
                    if (this.judgmentsFile.length <= 0) {
                        context = "输入不能为空， 请先输入文件名再来查找!";
                    }
                    AlertDialog.show({
                        message: context,
                        confirm: {
                            value: "知道了",
                            action: () => {
                            }
                        },
                        cancel: () => {
                        }
                    });
                });
            });
            Button.pop();
            Button.createWithLabel("清空该目录下所有文件");
            Button.onClick(() => {
                AlertDialog.show({
                    message: "确定清空该目录下所有文件吗？",
                    primaryButton: {
                        value: "不了",
                        action: () => {
                        }
                    },
                    secondaryButton: {
                        value: "清空",
                        action: () => {
                            if (fs.statSync(this.path)!.isDirectory()) {
                                //异步清空
                                fs.emptyDir(this.path).then(() => {
                                    this.refresh(this.path);
                                });
                                //同步清空
                                //                    fs.emptyDirSync(this.path)
                                //                    this.refresh(this.path)
                            }
                            else {
                                AlertDialog.show({
                                    message: "该目录可能是文件，请检查后再试",
                                    primaryButton: {
                                        value: "好的",
                                        action: () => {
                                        }
                                    },
                                    cancel: () => {
                                    }
                                });
                            }
                        }
                    },
                    cancel: () => {
                    }
                });
            });
            Button.pop();
            Text.create("进入文件，点击下方按钮写入数据");
            Text.fontSize(14);
            Text.margin({ top: 10 });
            Text.pop();
            Button.createWithLabel("向该文件中写入数据");
            Button.enabled(!fs.statSync(this.path)!.isDirectory());
            Button.opacity(fs.statSync(this.path)!.isDirectory() ? 0.4 : 1);
            Button.margin({ bottom: 10 });
            Button.onClick(() => {
                if (this.path.endsWith(".txt")) {
                    txtWrite(fs.readTextSync(this.path));
                    this.txtWrites.open();
                }
                else {
                    // fs.readJSONSync(this.path, "utf-8")第一次进入是对象，后面进入是字符串
                    let data: string = "";
                    if (typeof fs.readJSONSync(this.path, "utf-8") == "string") {
                        data = fs.readJSONSync(this.path, "utf-8");
                    }
                    else {
                        data = JSON.stringify(fs.readJSONSync(this.path, "utf-8"));
                    }
                    let jsonData: Record<string, string> = JSON.parse(data);
                    let keyValue: Array<Array<string>> = [];
                    let keys: string[] = getKeys(jsonData);
                    for (let i = 0; i < keys.length; i++) {
                        keyValue.push([keys[i], jsonData[keys[i]]]);
                    }
                    keyValue.push(["", ""]);
                    router.replace({ uri: "pages/jsonWrite", params: {
                            data: keyValue,
                            path: this.path
                        } });
                }
            });
            Button.pop();
        }
        If.pop();
        Row.create();
        Button.createWithLabel("上一页");
        Button.margin({ right: 10 });
        Button.enabled(this.funPages > 1);
        Button.opacity(this.funPages == 1 ? 0.4 : 1);
        Button.onClick(() => {
            this.funPages--;
        });
        Button.pop();
        Button.createWithLabel("下一页");
        Button.margin({ left: 10 });
        Button.enabled(this.funPages < 2);
        Button.opacity(this.funPages == 2 ? 0.4 : 1);
        Button.onClick(() => {
            this.funPages++;
        });
        Button.pop();
        Row.pop();
        Flex.pop();
    }
    aboutToAppear() {
        that = this;
        if (router.getParams()) {
            if (fs.statSync(router.getParams().path)!.isDirectory()) {
                fs.readdirSync(router.getParams().path).forEach((item: string) => {
                    let data: FileType = {
                        filename: item,
                        isOn: false
                    };
                    this.files.push(data);
                });
                this.path = router.getParams().path.toString();
            }
            else {
                let jsonData: string = fs.readJSONSync(router.getParams().path, "utf-8");
                this.files.splice(0);
                this.files.push(jsonData);
                this.path = router.getParams().path.toString();
            }
        }
        else {
            if (fs.pathExistsSync(fileDir + "/folder")) {
                fs.mkdirpSync(fileDir + "/folder");
                fs.readdirSync(fileDir + "/folder").forEach((item: string) => {
                    let data: FileType = {
                        filename: item,
                        isOn: false
                    };
                    this.files.push(data);
                });
            }
            this.path = fileDir + "/folder";
        }
    }
}
loadDocument(new Index("1", undefined, {}));
