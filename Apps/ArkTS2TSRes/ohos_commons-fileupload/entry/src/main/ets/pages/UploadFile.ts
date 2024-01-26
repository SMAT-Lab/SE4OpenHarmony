interface UploadFile_Params {
    message?: string;
    loadedFileResult?: string;
    fileInfo?: Array<File>;
    fileUpload?: FileUpload | ESObject;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "UploadFile_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { FileUpload, File, FormData } from "@ohos/commons-fileupload";
import { log, logError, debug } from "../utils/log";
import * as EntryAbility from '../entryability/EntryAbility';
class UploadFile extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('文件上传', this, "message");
        this.__loadedFileResult = new ObservedPropertySimple("", this, "loadedFileResult");
        this.fileInfo = [];
        this.fileUpload = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: UploadFile_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.loadedFileResult !== undefined) {
            this.loadedFileResult = params.loadedFileResult;
        }
        if (params.fileInfo !== undefined) {
            this.fileInfo = params.fileInfo;
        }
        if (params.fileUpload !== undefined) {
            this.fileUpload = params.fileUpload;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__loadedFileResult.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __loadedFileResult: ObservedPropertySimple<string>;
    get loadedFileResult() {
        return this.__loadedFileResult.get();
    }
    set loadedFileResult(newValue: string) {
        this.__loadedFileResult.set(newValue);
    }
    private fileInfo: Array<File>;
    private fileUpload: FileUpload | any;
    aboutToAppear() {
        this.fileUpload = new FileUpload({
            baseUrl: "https://musetransfer.com/",
            readTimeout: 60000,
            connectTimeout: 60000
        });
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height("100%");
        Column.padding({ top: 50, bottom: 80 });
        Column.justifyContent(FlexAlign.SpaceBetween);
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Column.width("100%");
        Column.height('70%');
        Text.create("第一步：加载文件");
        Text.fontSize(20);
        Text.margin({ bottom: 20 });
        Text.pop();
        Row.create({ space: 10 });
        Row.padding({ left: 10 });
        Button.createWithLabel("icon.png");
        Button.onClick(() => this.loadFileByResource("icon.png"));
        Button.pop();
        Button.createWithLabel("test.txt");
        Button.onClick(() => this.loadFileByResource("test.txt"));
        Button.pop();
        Row.pop();
        Text.create("已加载文件信息:" + this.loadedFileResult);
        Text.fontSize(20);
        Text.margin({ top: 10 });
        Text.padding({ left: 10 });
        Text.pop();
        Column.pop();
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Column.width("100%");
        Text.create("第二步：上传文件");
        Text.fontSize(20);
        Text.margin({ bottom: 20 });
        Text.pop();
        Button.createWithLabel("点击上传");
        Button.onClick(() => this.upload());
        Button.pop();
        Column.pop();
        Column.pop();
    }
    /**
     * 通过资源加载文件
     * @param fileName
     */
    loadFileByResource(fileName: string): void {
        EntryAbility.resourceManager.getRawFile(fileName, (error: any, value: any) => {
            if (error != null) {
                logError(error);
                this.loadedFileResult = "加载文件失败...";
                return;
            }
            const file: any = new File();
            file.fileName = fileName;
            file.fileData = value;
            this.fileInfo.push(file);
            this.loadedFileResult = this.loadedFileResult += "--" + fileName + "    ";
        });
    }
    /**
     * 上传
     */
    upload() {
        if (!this.fileInfo) {
            logError("当前上传的文件为空，请先加载之后再上传");
            return;
        }
        log('检验通过');
        const formData: any = new FormData();
        formData.append("id", 1);
        this.fileInfo.forEach((v: any) => {
            formData.append(v.fileName, v);
        });
        log("formData实例化完成，准备上传");
        this.fileUpload.post("/api/upload", formData).then((res: any) => {
            log("this.fileUpload.request 成功---" + JSON.stringify(res));
        }).catch((err: any) => {
            logError("this.fileUpload.request 失败" + JSON.stringify(err));
        });
    }
}
loadDocument(new UploadFile("1", undefined, {}));
