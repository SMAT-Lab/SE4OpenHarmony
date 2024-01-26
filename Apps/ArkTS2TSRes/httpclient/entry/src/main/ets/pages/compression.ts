interface Compression_Params {
    status?: string;
    content?: string;
    downloadfile?: string;
    fileName?: string;
    client?: HttpClient;
    scroller?: Scroller;
    ipInput?: string;
    portInput?: string;
    baseServer?;
    hereAbilityContext?: Context;
    hereCacheDir?: string;
    hereFilesDir?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "compression_" + ++__generate__Id;
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
import { FileUpload, gZipUtil, HttpClient, Mime, Request, RequestBody, Response } from '@ohos/httpclient';
import fs from '@ohos.file.fs';
import Log from '../model/log';
import util from '@ohos.util';
import buffer from '@ohos.buffer';
import hilog from '@ohos.hilog';
import resmgr from '@ohos.resourceManager';
import { BusinessError } from '@ohos/httpclient/src/main/ets/http';
class Compression extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__status = new ObservedPropertySimple('', this, "status");
        this.__content = new ObservedPropertySimple('', this, "content");
        this.downloadfile = "";
        this.fileName = "/gziptest.txt";
        this.client = new HttpClient.Builder().setConnectTimeout(10000).build();
        this.scroller = new Scroller();
        this.ipInput = '106.15.92.248';
        this.portInput = '9090';
        this.baseServer = this.getUrl();
        this.hereAbilityContext = getContext();
        this.hereCacheDir = this.hereAbilityContext.cacheDir;
        this.hereFilesDir = this.hereAbilityContext.filesDir;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Compression_Params) {
        if (params.status !== undefined) {
            this.status = params.status;
        }
        if (params.content !== undefined) {
            this.content = params.content;
        }
        if (params.downloadfile !== undefined) {
            this.downloadfile = params.downloadfile;
        }
        if (params.fileName !== undefined) {
            this.fileName = params.fileName;
        }
        if (params.client !== undefined) {
            this.client = params.client;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.ipInput !== undefined) {
            this.ipInput = params.ipInput;
        }
        if (params.portInput !== undefined) {
            this.portInput = params.portInput;
        }
        if (params.baseServer !== undefined) {
            this.baseServer = params.baseServer;
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
    }
    aboutToBeDeleted() {
        this.__status.aboutToBeDeleted();
        this.__content.aboutToBeDeleted();
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
    private downloadfile: string;
    private fileName: string;
    private client: HttpClient;
    private scroller: Scroller;
    private ipInput: string;
    private portInput: string;
    private baseServer;
    private hereAbilityContext: Context;
    private hereCacheDir: string;
    private hereFilesDir: string;
    render() {
        Column.create();
        Column.padding({ left: 5, right: 5 });
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
        Row.create();
        Row.height(px2vp(150));
        TextInput.create({ text: this.ipInput, placeholder: '输入服务器ip' });
        TextInput.layoutWeight(1);
        TextInput.height('100%');
        TextInput.fontSize(18);
        TextInput.onChange((value: string) => {
            this.ipInput = value;
        });
        Blank.create();
        Blank.width(px2vp(5));
        Blank.pop();
        TextInput.create({ text: this.portInput, placeholder: '输入服务器端口' });
        TextInput.layoutWeight(1);
        TextInput.height('100%');
        TextInput.fontSize(18);
        TextInput.onChange((value: string) => {
            this.portInput = value;
        });
        Row.pop();
        Row.create();
        Row.height(px2vp(60));
        Row.margin({ top: 10 });
        Button.createWithLabel('GZIP Encode');
        Button.layoutWeight(1);
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.height('100%');
        Button.onClick((event: ClickEvent) => {
            const test = "hello, GZIP! this is a gzip word";
            let compressed: string = gZipUtil.gZipString(test);
            this.status = "编码成功";
            this.content = "编码数据：" + JSON.stringify(compressed);
            Log.showInfo("gzip Encode after gzip and compressed result is " + compressed);
        });
        Button.pop();
        Button.createWithLabel('GZIP Decode');
        Button.layoutWeight(1);
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.height('100%');
        Button.margin({ left: 5 });
        Button.onClick((event: ClickEvent) => {
            const test = "hello, GZIP! this is a gzip word";
            let compressed: string = gZipUtil.gZipString(test);
            Log.showInfo("gzipencodeTest after gzip and compressed result is " + compressed);
            let restored: string = gZipUtil.ungZipString(JSON.parse(JSON.stringify(compressed)));
            this.status = "解码成功";
            this.content = "解码后数据:" + restored;
            // Output to console
            Log.showInfo("gzipdecodeTest and uncompressed result is " + JSON.stringify(restored));
        });
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Row.height(px2vp(60));
        Button.createWithLabel('GZIP Encode File');
        Button.layoutWeight(1);
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.height('100%');
        Button.onClick((event: ClickEvent) => {
            Log.showInfo("gzipEncodeFileTest and appInternalDir is " + this.hereCacheDir);
            let encodeStr = "hello, GZIP! this is a gzip word";
            let resourcePath = this.hereCacheDir + "/hello.txt";
            let gzipPath = this.hereCacheDir + "/test.txt.gz";
            Log.showInfo("gzipEncodeFile test path:dest" + gzipPath);
            this.gzipStrAndSaveFile(encodeStr, resourcePath, gzipPath);
            Log.showInfo("gzipEncodeFile test success");
            this.content = '\n编码数据:' + encodeStr + '\n';
            this.content += '\n编码文件路径:' + gzipPath + '\n';
            this.status = "编码成功";
        });
        Button.pop();
        Button.createWithLabel('GZIP Decode File');
        Button.layoutWeight(1);
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.height('100%');
        Button.margin({ left: 5 });
        Button.onClick(async (event: ClickEvent) => {
            let encodeStr = "hello, GZIP! this is a gzip word";
            let resourcePath = this.hereCacheDir + "/hello.txt";
            let gzipPath = this.hereCacheDir + "/test.txt.gz";
            this.gzipStrAndSaveFile(encodeStr, resourcePath, gzipPath);
            Log.showInfo("gzipDecodeFiletest and  appInternalDir is " + this.hereCacheDir);
            let dest = this.hereCacheDir + "/hello2.txt";
            await gZipUtil.ungZipFile(gzipPath, dest);
            Log.showInfo("gzipDecodeFiletest success");
            let fileID = fs.openSync(dest, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
            // 获取文件信息
            let stat = fs.statSync(fileID.fd);
            let size = stat.size; // 文件的大小，以字节为单位
            let buf = new ArrayBuffer(size);
            fs.readSync(fileID.fd, buf);
            let textDecoder = new util.TextDecoder("utf-8", { ignoreBOM: true });
            let decodedString = textDecoder.decode(new Uint8Array(buf), { stream: false });
            this.status = '解码成功';
            this.content = '\n原编码文件路径:' + gzipPath + '\n';
            this.content += '\n解码后路径:' + dest + '\n';
            this.content += '\n文件大小:' + size + ' byte' + '\n';
            this.content += '\n解码结果:' + decodedString + '\n';
        });
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Row.height(px2vp(60));
        Button.createWithLabel('GZIP Upload File');
        Button.layoutWeight(1);
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.height('100%');
        Button.onClick((event: ClickEvent) => {
            this.status = '上传中..';
            this.content = '';
            Log.showInfo(" cacheDir   " + this.hereCacheDir);
            let filePath = this.hereCacheDir + "/hello.txt";
            let fd = fs.openSync(filePath, fs.OpenMode.CREATE | fs.OpenMode.READ_WRITE);
            fs.truncateSync(fd.fd);
            fs.writeSync(fd.fd, "hello, world! hello HttpClientServer hello httpclientServer");
            fs.fsyncSync(fd.fd);
            fs.closeSync(fd);
            let destpath = this.hereCacheDir + "/test2.txt.gz";
            gZipUtil.gZipFile(filePath, destpath);
            Log.showInfo("gZipFile file success   ");
            destpath = destpath.replace(this.hereCacheDir, "internal://cache");
            let fileUploadBuilder: FileUpload = new FileUpload.Builder()
                .addFile(destpath)
                .addData("filename", "test2.txt")
                .build();
            let fileObject: object[] = fileUploadBuilder.getFile();
            let dataObject: object[] = fileUploadBuilder.getData();
            Log.showInfo("fileObject:   " + JSON.stringify(fileObject));
            Log.showInfo("dataObject:   " + JSON.stringify(dataObject));
            Log.showInfo('about to set : abilityContext - cacheDir  = ' + this.hereCacheDir);
            Log.showInfo('about to Set : abilityContext - filesDir  = ' + this.hereFilesDir);
            Log.showInfo("type of :" + typeof this.hereAbilityContext);
            let request: Request = new Request.Builder()
                .url(this.getUrl() + '/uploadGzipFiles')
                .addFileParams(fileObject, dataObject)
                .setAbilityContext(this.hereAbilityContext)
                .build();
            this.client.newCall(request)
                .execute()
                .then((data: Response) => {
                data.uploadTask.on('progress', (uploadedSize: number, totalSize: number) => {
                    Log.showInfo('Upload progress--->uploadedSize: ' + uploadedSize + ' ,totalSize--->' + totalSize);
                    this.content = "当前上传大小：" + uploadedSize + 'byte\n';
                    if (uploadedSize >= totalSize) {
                        Log.showInfo('Upload finished');
                        this.content += "\n上传总文件大小：" + totalSize + 'byte\n';
                        this.content += "\n上传文件路径：" + this.hereCacheDir + "/test2.txt.gz\n";
                    }
                });
                data.uploadTask.on('headerReceive', (headers: object) => {
                    Log.showInfo('Upload--->headerReceive: ' + JSON.stringify(headers));
                });
                data.uploadTask.on('complete', (data: Array<UploadResultCallbackType>) => {
                    this.status = "上传完成";
                    this.status += "\n上传结果：" + data[0].message;
                    Log.showInfo('Upload--->complete,data: ' + JSON.stringify(data));
                });
            })
                .catch((error: BusinessError<string>) => {
                this.status = "";
                if (error.data != undefined) {
                    this.content = error.data;
                }
                hilog.info(0x0001, "onError -> Error", this.content);
            });
        });
        Button.pop();
        Button.createWithLabel('GZIP Download File');
        Button.layoutWeight(1);
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.height('100%');
        Button.margin({ left: 5 });
        Button.onClick((event: ClickEvent) => {
            this.status = '下载中..';
            this.content = '';
            try {
                Log.showInfo(' abilityContext - cacheDir  = ' + this.hereCacheDir);
                Log.showInfo(' abilityContext - filesDir  = ' + this.hereFilesDir);
                this.downloadfile = this.hereFilesDir + '/server.txt.gz';
                let request: Request = new Request.Builder()
                    .download(this.getUrl() + "/downLoadGzipFiles/server.txt.gz")
                    .setAbilityContext(this.hereAbilityContext)
                    .build();
                this.client.newCall(request)
                    .execute()
                    .then(async (data: Response) => {
                    data.downloadTask.on('progress', (receivedSize: number, totalSize: number) => {
                        this.content = '\n下载文件大小:' + receivedSize + ' byte\n';
                        this.content += '\n下载文件总大小:' + totalSize + ' byte\n';
                        this.content += "\n下载文件路径：" + this.downloadfile + '\n';
                        Log.showInfo('progress--->downloadedSize: ' + receivedSize + ' ,totalSize--->' + totalSize);
                    });
                    data.downloadTask.on('complete', async () => {
                        Log.showInfo("download complete");
                        let appInternalDir = this.hereFilesDir;
                        let dest = appInternalDir + "/helloServer.txt";
                        await gZipUtil.ungZipFile(this.downloadfile, dest);
                        Log.showInfo("gzip Download File test success");
                        let fileID = fs.openSync(dest, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
                        // 获取文件信息
                        let stat = fs.statSync(fileID.fd);
                        let size = stat.size; // 文件的大小，以字节为单位
                        let buf = new ArrayBuffer(size);
                        fs.readSync(fileID.fd, buf);
                        let textDecoder = util.TextDecoder.create("utf-8", { ignoreBOM: true });
                        let decodedString = textDecoder.decodeWithStream(new Uint8Array(buf), { stream: false });
                        this.status = '下载成功';
                        this.content += '\n下载文件内容:' + decodedString + '\n';
                    });
                })
                    .catch((error: BusinessError<string>) => {
                    this.status = '请求状态：' + error.code.toString();
                    if (error.data != undefined) {
                        this.content = error.data;
                    }
                    hilog.info(0x0001, "onError -> Error", JSON.stringify(error));
                });
            }
            catch (err) {
                this.status = '请求状态：请求失败';
                this.content = JSON.stringify(err);
                hilog.error(0x0001, "downloadFile execution failed - errorMsg", err);
            }
        });
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Row.height(px2vp(60));
        Button.createWithLabel('Post GZIP Text');
        Button.layoutWeight(1);
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.height('100%');
        Button.onClick((event: ClickEvent) => {
            this.status = '访问中..';
            this.content = '';
            const data = "hello, gzip server!!";
            let compressed: string = gZipUtil.gZipString(data);
            let array: any = gZipUtil.stringToUint8Array(compressed);
            let bufferContent = buffer.from(array);
            this.content += "\n发送原始文本" + data + "\n";
            this.content += "\n发送编码文本" + JSON.parse(JSON.stringify(bufferContent)).data + "\n";
            let requestBody1: RequestBody = RequestBody.create(data, new Mime.Builder().build().getMime());
            let request: Request = new Request.Builder()
                .url(this.getUrl() + '/postGzipText')
                .post(requestBody1)
                .setGzipBuffer(true)
                .addHeader("Content-Type", "text/plain")
                .addHeader("Accept-Encoding", "gzip")
                .build();
            this.client.newCall(request).enqueue((result: Response) => {
                this.status = '\n返回状态：' + result.responseCode + '\n';
                if (result.result) {
                    this.content += '\n返回结果：' + result.result + '\n';
                    this.content += '\n返回header：' + JSON.stringify(result.header) + '\n';
                }
                else {
                    this.content += '\n返回结果：' + result.result + '\n';
                }
                Log.showInfo("onComplete -> Status : " + result.responseCode);
                Log.showInfo("onComplete -> Content : " + JSON.stringify(result.result));
            }, (error: BusinessError<string>) => {
                this.status = '请求状态：' + error.code.toString();
                if (error.data != undefined) {
                    this.content = error.data;
                }
                hilog.error(0x0001, "onError -> Error", JSON.stringify(error));
            });
        });
        Button.pop();
        Button.createWithLabel('Get GZIP Text');
        Button.layoutWeight(1);
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.height('100%');
        Button.margin({ left: 5 });
        Button.onClick((event: ClickEvent) => {
            this.status = '访问中..';
            this.content = '';
            let request: Request = new Request.Builder()
                .get(this.getUrl() + '/getGzipText')
                .params('key', 'custKey')
                .addHeader("Content-Type", "application/json")
                .addHeader("Accept-Encoding", "gzip")
                .build();
            this.client.newCall(request).enqueue((result: Response) => {
                this.status = '\n返回状态：' + result.responseCode + '\n';
                if (result.result) {
                    this.content = '\n返回结果：' + result.result + '\n';
                    this.content += '\n返回header：' + JSON.stringify(result.header) + '\n';
                }
                else {
                    this.content += '\n返回结果：' + result.result + '\n';
                }
                Log.showInfo("onComplete -> Get GZIP Text Status : " + result.responseCode);
                Log.showInfo("onComplete -> Get GZIP Text Content : " + JSON.stringify(result.result));
            }, (error: BusinessError<string>) => {
                this.status = '请求状态：' + error.code.toString();
                if (error.data != undefined) {
                    this.content = error.data;
                }
                hilog.error(0x0001, "onError -> Error", JSON.stringify(error));
            });
        });
        Button.pop();
        Row.pop();
        Scroll.create(this.scroller);
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.scrollBar(BarState.On);
        Scroll.scrollBarColor(Color.Gray);
        Scroll.layoutWeight(1);
        Column.create();
        Column.width('100%');
        Text.create(this.status);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.width('100%');
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Text.create(this.content);
        Text.fontSize(20);
        Text.width('100%');
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    gzipStrAndSaveFile(encodeStr: string, resourcePath: string, gzipPath: string) {
        let fd = fs.openSync(resourcePath, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
        fs.truncateSync(fd.fd);
        fs.writeSync(fd.fd, encodeStr);
        fs.fsyncSync(fd.fd);
        fs.closeSync(fd);
        gZipUtil.gZipFile(resourcePath, gzipPath);
    }
    getUrl() {
        return 'http://' + this.ipInput + ':' + this.portInput;
    }
}
interface UploadResultCallbackType {
    path: string;
    responseCode: number;
    message: string;
}
loadDocument(new Compression("1", undefined, {}));
