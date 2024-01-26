interface UploadAndDownload_Params {
    status?: string;
    content?: string;
    echoServer?: string;
    fileServer?: string;
    fileName?: string;
    img?: string;
    client?: HttpClient;
    hereAbilityContext?: Context;
    hereCacheDir?: string;
    hereFilesDir?: string;
    uploadRequest?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "uploadAndDownload_" + ++__generate__Id;
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
import { FileUpload, HttpClient, Request, Response, TimeUnit } from '@ohos/httpclient';
import fs from '@ohos.file.fs';
import prompt from '@system.prompt';
import Log from '../model/log';
import router from '@ohos.router';
import hilog from '@ohos.hilog';
import resmgr from '@ohos.resourceManager';
import { Context } from '@ohos.abilityAccessCtrl';
import { BusinessError } from '@ohos/httpclient/src/main/ets/http';
class UploadAndDownload extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__status = new ObservedPropertySimple('000', this, "status");
        this.__content = new ObservedPropertySimple('init', this, "content");
        this.echoServer = "http://www.yourserverfortest.com";
        this.fileServer = "http://www.yourserverforfileupload.com";
        this.fileName = "/test.txt";
        this.__img = new ObservedPropertySimple('', this, "img");
        this.client = new HttpClient.Builder()
            .setConnectTimeout(10, TimeUnit.SECONDS)
            .setReadTimeout(10, TimeUnit.SECONDS)
            .setWriteTimeout(10, TimeUnit.SECONDS)
            .build();
        this.hereAbilityContext = getContext();
        this.hereCacheDir = this.hereAbilityContext.cacheDir;
        this.hereFilesDir = this.hereAbilityContext.filesDir;
        this.uploadRequest = async () => {
            Log.showInfo(" cacheDir   " + this.hereCacheDir);
            let filePath = this.hereCacheDir + this.fileName;
            Log.showInfo("   filePath   " + filePath);
            let fd = fs.openSync(filePath, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
            fs.truncateSync(fd.fd);
            fs.writeSync(fd.fd, "test httpclient");
            fs.fsyncSync(fd.fd);
            fs.closeSync(fd);
            Log.showInfo(" writeSync    ");
            Log.showInfo("create file success   ");
            filePath = filePath.replace(this.hereCacheDir, "internal://cache");
            let fileUploadBuilder: FileUpload = new FileUpload.Builder()
                .addFile(filePath)
                .addData("name2", "value2")
                .build();
            Log.showInfo('about to set : abilityContext - cacheDir  = ' + this.hereCacheDir);
            Log.showInfo('about to Set : abilityContext - filesDir  = ' + this.hereFilesDir);
            Log.showInfo("type of :" + typeof this.hereAbilityContext);
            let request: Request = new Request.Builder()
                // .url("http://106.15.92.248:9090/upload")
                .url("http://106.15.92.248:5555/upload")
                .post()
                .body(fileUploadBuilder)
                .setAbilityContext(this.hereAbilityContext)
                .build();
            this.client.newCall(request)
                .execute()
                .then((data: Response) => {
                data.uploadTask.on('progress', (uploadedSize: number, totalSize: number) => {
                    Log.showInfo('progress--->uploadedSize: ' + uploadedSize + ' ,totalSize--->' + totalSize);
                    if (uploadedSize == totalSize) {
                        prompt.showToast({ message: '上传成功' });
                    }
                });
                data.uploadTask.on('headerReceive', (headers: object) => {
                    Log.showInfo('progress--->uploadSize: ' + JSON.stringify(headers));
                });
            })
                .catch((error: BusinessError) => {
                this.status = "";
                if (error.message != undefined) {
                    this.content = error.message;
                }
                hilog.info(0x0001, "onError -> Error", this.content);
            });
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: UploadAndDownload_Params) {
        if (params.status !== undefined) {
            this.status = params.status;
        }
        if (params.content !== undefined) {
            this.content = params.content;
        }
        if (params.echoServer !== undefined) {
            this.echoServer = params.echoServer;
        }
        if (params.fileServer !== undefined) {
            this.fileServer = params.fileServer;
        }
        if (params.fileName !== undefined) {
            this.fileName = params.fileName;
        }
        if (params.img !== undefined) {
            this.img = params.img;
        }
        if (params.client !== undefined) {
            this.client = params.client;
        }
        if (params.hereAbilityContext !== undefined) {
            this.hereAbilityContext = params.hereAbilityContext;
        }
        if (params.hereCacheDir !== undefined) {
            this.hereCacheDir = params.hereCacheDir;
        }
        if (params.hereFilesDir !== undefined) {
            this.hereFilesDir = params.hereFilesDir;
        }
        if (params.uploadRequest !== undefined) {
            this.uploadRequest = params.uploadRequest;
        }
    }
    aboutToBeDeleted() {
        this.__status.aboutToBeDeleted();
        this.__content.aboutToBeDeleted();
        this.__img.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __status: ObservedPropertySimple<string>;
    get status() {
        return this.__status.get();
    }
    set status(newValue: string) {
        this.__status.set(newValue);
    }
    private __content: ObservedPropertySimple<string>;
    get content() {
        return this.__content.get();
    }
    set content(newValue: string) {
        this.__content.set(newValue);
    }
    private echoServer: string;
    private fileServer: string;
    private fileName: string;
    private __img: ObservedPropertySimple<string>;
    get img() {
        return this.__img.get();
    }
    set img(newValue: string) {
        this.__img.set(newValue);
    }
    private client: HttpClient;
    private hereAbilityContext: Context;
    private hereCacheDir: string;
    private hereFilesDir: string;
    private uploadRequest;
    render() {
        Column.create();
        Column.width('100%');
        Column.margin({ top: 5, bottom: 100 });
        Column.height('80%');
        Flex.create({ direction: FlexDirection.Column });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Navigator.create({ target: "", type: NavigationType.Back });
        Text.create('BACK');
        Text.fontSize(12);
        Text.border({ width: 1 });
        Text.padding(10);
        Text.fontColor(0x000000);
        Text.borderColor(0x317aff);
        Text.pop();
        Navigator.pop();
        Flex.pop();
        Image.create(this.img);
        Image.width(200);
        Image.height(200);
        Image.backgroundColor(Color.Pink);
        Flex.create({ direction: FlexDirection.Column });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Button.createWithLabel('Upload');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            this.uploadRequest();
        });
        Button.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Column });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Button.createWithLabel('chunk upload');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            router.pushUrl({
                url: 'pages/chunkUpload'
            });
        });
        Button.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Column });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Button.createWithLabel('Download IMG FILE');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            try {
                Log.showInfo(' abilityContext - cacheDir  = ' + this.hereCacheDir);
                Log.showInfo(' abilityContext - filesDir  = ' + this.hereFilesDir);
                let request: Request = new Request.Builder()
                    .download("https://archiveprogram.github.com/assets/img/direction/box2-home.png")
                    .setAbilityContext(this.hereAbilityContext)
                    .build();
                this.client.newCall(request)
                    .execute()
                    .then((data: Response) => {
                    data.downloadTask.on('progress', (receivedSize: number, totalSize: number) => {
                        Log.showInfo('progress--->downloadedSize: ' + receivedSize + ' ,totalSize--->' + totalSize);
                    });
                    data.downloadTask.on('complete', () => {
                        Log.showInfo("download complete file:" + this.hereFilesDir + "/box2-home.png");
                        this.content = "Download Task Completed";
                        this.img = 'file://' + this.hereFilesDir + "/box2-home.png";
                    });
                })
                    .catch((error: BusinessError) => {
                    this.status = "";
                    if (error.message != undefined) {
                        this.content = error.message;
                    }
                    hilog.info(0x0001, "onError -> Error", this.content);
                });
            }
            catch (err) {
                hilog.error(0x0001, "downloadFile execution failed - errorMsg", err);
            }
        });
        Button.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Column });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Button.createWithLabel('Download BIN File');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            try {
                let request: Request = new Request.Builder()
                    .download("https://filesamples.com/samples/font/bin/fontawesome-webfont.bin")
                    .setAbilityContext(this.hereAbilityContext)
                    .build();
                this.client.newCall(request)
                    .execute()
                    .then((data: Response) => {
                    data.downloadTask.on('complete', () => {
                        Log.showInfo("download complete");
                        prompt.showToast({
                            message: "Download Task Completed"
                        });
                        this.content = "Download Task Completed";
                    });
                })
                    .catch((error: BusinessError) => {
                    this.status = "";
                    if (error.message != undefined) {
                        this.content = error.message;
                    }
                    hilog.info(0x0001, "onError -> Error", this.content);
                });
            }
            catch (err) {
                hilog.error(0x0001, "downloadBinaryFile execution failed - errorMsg", err);
            }
        });
        Button.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Column });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Button.createWithLabel('Download Enqueue');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            try {
                this.status = "";
                let fName = '15250411.jpg';
                let request: Request = new Request.Builder()
                    .download("https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83ericA1Mv66TwicuYOtbDMBcUhv1aa9RJBeAn9uURfcZD0AUGrJebAn1g2AjN0vb2E1XTET7fTuLBNmA/132", fName)
                    .setAbilityContext(this.hereAbilityContext)
                    .build();
                this.client.newCall(request).enqueue((data: Response) => {
                    data.downloadTask.on('complete', () => {
                        Log.showInfo("onDownloadTaskStart download complete file:" + request.filePath);
                        this.content = "Download Task Completed";
                        this.img = 'file://' + this.hereFilesDir + "/" + request.fileName;
                    });
                    data.downloadTask.on("progress", (receivedSize: number, totalSize: number) => {
                        Log.showInfo("onDownloadTaskStart downloadSize : " + receivedSize + " totalSize : " + totalSize);
                        this.content = "" + (receivedSize / totalSize) * 100;
                    });
                }, (error: BusinessError) => {
                    this.status = "";
                    if (error.message != undefined) {
                        this.content = error.message;
                    }
                    Log.showError("onError -> Error : " + this.content);
                });
            }
            catch (err) {
                hilog.error(0x0001, "downloadCustomLocationEnqueue execution failed - errorMsg", err);
            }
        });
        Button.pop();
        Flex.pop();
        Column.pop();
    }
}
loadDocument(new UploadAndDownload("1", undefined, {}));
