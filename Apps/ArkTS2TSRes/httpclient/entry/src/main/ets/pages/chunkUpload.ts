interface chunkUpload_Params {
    uploadProgress?: number;
    stat?: string;
    fileName?: string;
    baseUrl?: string;
    fileBuffer?: ArrayBuffer;
    hereAbilityContext?: Context;
    hereCacheDir?: string;
    client?: HttpClient;
    uploadRequest?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "chunkUpload_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { BinaryFileChunkUpload, HttpClient, Request, TimeUnit } from '@ohos/httpclient';
import http from '@ohos.net.http';
import promptAction from '@ohos.promptAction';
import { BusinessError } from '@ohos/httpclient/src/main/ets/http';
const tag = 'chunkUpload ';
class chunkUpload extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__uploadProgress = new ObservedPropertySimple(0, this, "uploadProgress");
        this.__stat = new ObservedPropertySimple('', this, "stat");
        this.fileName = 'upload.rar';
        this.baseUrl = 'http://106.15.92.248:9090';
        this.fileBuffer = new ArrayBuffer(0);
        this.hereAbilityContext = getContext();
        this.hereCacheDir = this.hereAbilityContext.cacheDir;
        this.client = new HttpClient.Builder()
            .setConnectTimeout(10, TimeUnit.SECONDS)
            .setReadTimeout(10, TimeUnit.SECONDS)
            .setWriteTimeout(10, TimeUnit.SECONDS)
            .build();
        this.uploadRequest = async () => {
            console.info(tag + " cacheDir   " + this.hereCacheDir);
            let filePath: string = this.hereCacheDir + '/' + this.fileName;
            console.info(tag + "chunkFile path is " + filePath);
            let fileUploadBuilder: BinaryFileChunkUpload = new BinaryFileChunkUpload.Builder()
                .addBinaryFile(this.hereAbilityContext, {
                filePath: filePath,
                fileName: this.fileName,
                chunkSize: 1024 * 1024 * 4,
                name: 'chunk'
            })
                .addData('filename', this.fileName)
                .addUploadProgress((uploadedSize: number, totalSize: number): BinaryFileChunkUpload => {
                this.uploadCallback(uploadedSize, totalSize);
                return fileUploadBuilder;
            })
                .addUploadCallback((stat: string, failData: Array<string>): BinaryFileChunkUpload => {
                this.callStat(stat, failData);
                return fileUploadBuilder;
            })
                .build();
            let request: Request = new Request.Builder()
                .url(this.baseUrl + '/upload')
                .setAbilityContext(this.hereAbilityContext)
                .body(fileUploadBuilder)
                .build();
            this.client.newCall(request).execute();
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: chunkUpload_Params) {
        if (params.uploadProgress !== undefined) {
            this.uploadProgress = params.uploadProgress;
        }
        if (params.stat !== undefined) {
            this.stat = params.stat;
        }
        if (params.fileName !== undefined) {
            this.fileName = params.fileName;
        }
        if (params.baseUrl !== undefined) {
            this.baseUrl = params.baseUrl;
        }
        if (params.fileBuffer !== undefined) {
            this.fileBuffer = params.fileBuffer;
        }
        if (params.hereAbilityContext !== undefined) {
            this.hereAbilityContext = params.hereAbilityContext;
        }
        if (params.hereCacheDir !== undefined) {
            this.hereCacheDir = params.hereCacheDir;
        }
        if (params.client !== undefined) {
            this.client = params.client;
        }
        if (params.uploadRequest !== undefined) {
            this.uploadRequest = params.uploadRequest;
        }
    }
    aboutToBeDeleted() {
        this.__uploadProgress.aboutToBeDeleted();
        this.__stat.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __uploadProgress: ObservedPropertySimple<number>;
    get uploadProgress() {
        return this.__uploadProgress.get();
    }
    set uploadProgress(newValue: number) {
        this.__uploadProgress.set(newValue);
    }
    private __stat: ObservedPropertySimple<string>;
    get stat() {
        return this.__stat.get();
    }
    set stat(newValue: string) {
        this.__stat.set(newValue);
    }
    private fileName: string;
    private baseUrl: string;
    private fileBuffer: ArrayBuffer;
    private hereAbilityContext: Context;
    private hereCacheDir: string;
    private client: HttpClient;
    private uploadRequest;
    uploadCallback(uploadedSize: number, totalSize: number) {
        this.uploadProgress = Math.ceil((uploadedSize / totalSize) * 100);
    }
    callStat(stat: string, failData: Array<string>) {
        this.stat = stat;
        console.info(tag + "callStat stat is " + stat + ', failData is ' + JSON.stringify(failData));
    }
    merge() {
        let request = http.createHttp();
        let url = this.baseUrl + '/merge';
        request.request(url, { method: http.RequestMethod.GET, extraData: { 'filename': this.fileName } }).then(result => {
            console.info(tag + 'merge success result is ' + JSON.stringify(result));
            console.info(tag + 'merge success result is ' + JSON.stringify(result.header));
            if (result.responseCode === 200) {
                promptAction.showToast({
                    message: result.responseCode.toString(),
                    duration: 500
                });
            }
            else {
                promptAction.showToast({
                    message: "merge fail",
                    duration: 500
                });
            }
        }).catch((err: BusinessError) => {
            console.error(tag + 'merge error err：' + JSON.stringify(err));
        });
    }
    render() {
        Column.create();
        Column.justifyContent(FlexAlign.Start);
        Column.width('100%');
        Column.height('100%');
        Button.createWithLabel('chunk upload');
        Button.width('50%');
        Button.height(60);
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(20);
        Button.onClick(() => {
            this.uploadRequest();
        });
        Button.pop();
        Text.create('上传进度：' + this.uploadProgress + '%');
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Progress.create({ value: this.uploadProgress, type: ProgressType.Linear });
        Progress.width(200);
        Button.createWithLabel('merge');
        Button.width('50%');
        Button.height(60);
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(20);
        Button.onClick(() => {
            this.merge();
        });
        Button.pop();
        Column.pop();
    }
}
loadDocument(new chunkUpload("1", undefined, {}));
