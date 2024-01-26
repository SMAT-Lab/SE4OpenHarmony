interface Title_Params {
    title?: string;
}
interface Third_Params {
    localIp?: string;
    serverIp?: string;
    udpClient?: UdpClient;
    image?: PixelMap;
    options?;
    showCnt?: number;
    receiveCnt?: number;
    context?: Context;
    filesDir?: string;
    state?: number;
    file?: File;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Third_" + ++__generate__Id;
}
// @ts-nocheck
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
import router from '@ohos.router';
import image from '@ohos.multimedia.image';
import fs from '@ohos.file.fs';
import prompt from '@system.prompt';
import UdpClient from '../Utils/UdpClient';
import File from '@system.file';
class Third extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.localIp = router.getParams().localIp;
        this.serverIp = router.getParams().serverIp;
        this.udpClient = null;
        this.__image = new ObservedPropertyObject(null, this, "image");
        this.options = {
            alphaType: 0,
            editable: false,
            PixelMapFormat: 3,
            scaleMode: 1,
            size: { height: 550, width: 380 }
        };
        this.showCnt = 0;
        this.receiveCnt = 0;
        this.context = null;
        this.filesDir = null;
        this.__state = new ObservedPropertySimple(0, this, "state");
        this.file = null;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Third_Params) {
        if (params.localIp !== undefined) {
            this.localIp = params.localIp;
        }
        if (params.serverIp !== undefined) {
            this.serverIp = params.serverIp;
        }
        if (params.udpClient !== undefined) {
            this.udpClient = params.udpClient;
        }
        if (params.image !== undefined) {
            this.image = params.image;
        }
        if (params.options !== undefined) {
            this.options = params.options;
        }
        if (params.showCnt !== undefined) {
            this.showCnt = params.showCnt;
        }
        if (params.receiveCnt !== undefined) {
            this.receiveCnt = params.receiveCnt;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
        if (params.filesDir !== undefined) {
            this.filesDir = params.filesDir;
        }
        if (params.state !== undefined) {
            this.state = params.state;
        }
        if (params.file !== undefined) {
            this.file = params.file;
        }
    }
    aboutToBeDeleted() {
        this.__image.aboutToBeDeleted();
        this.__state.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private localIp: string;
    private serverIp: string;
    private udpClient: UdpClient;
    private __image: ObservedPropertyObject<PixelMap>;
    get image() {
        return this.__image.get();
    }
    set image(newValue: PixelMap) {
        this.__image.set(newValue);
    }
    private options;
    private showCnt: number;
    private receiveCnt: number;
    private context: Context;
    private filesDir: string;
    private __state: ObservedPropertySimple<number>;
    get state() {
        return this.__state.get();
    }
    set state(newValue: number) {
        this.__state.set(newValue);
    }
    private file: File;
    private prepareOpeningFile() {
        // 新建并打开并截断文件
        const filePath = this.filesDir + '/frame' + (this.receiveCnt++) + '.jpg';
        if (this.receiveCnt >= 25)
            this.receiveCnt = 0;
        try {
            this.file = fs.openSync(filePath, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
            fs.truncate(this.file.fd);
        }
        catch (error) {
            prompt.showToast({
                message: `${error}`
            });
        }
    }
    private showPicture() {
        const filePath = this.context.filesDir + '/frame' + (this.showCnt++) + '.jpg';
        if (this.showCnt >= 25)
            this.showCnt = 0;
        const imageSource = image.createImageSource(filePath);
        try {
            imageSource.createPixelMap(this.options, (err, pixelmap) => {
                this.image = pixelmap;
            });
            imageSource.release();
        }
        catch (error) {
            prompt.showToast({
                message: `${error}`
            });
        }
    }
    onPageShow() {
        this.context = getContext(this);
        // 获取resourceManager资源管理器
        this.resourceMgr = this.context.resourceManager;
        // 获取应用文件路径
        this.filesDir = this.context.filesDir;
        this.udpClient = new UdpClient(this.localIp, this.serverIp);
        this.udpClient.bindUdp(8964);
        this.udpClient.onMessage((dataView) => {
            let writeLen = 0;
            const buffer = new Uint8Array(dataView.buffer);
            if (buffer[buffer.byteLength - 2] === 'o'.charCodeAt(0) && buffer[buffer.byteLength - 1] === 'k'.charCodeAt(0)) {
                if (this.state === 0) {
                    this.prepareOpeningFile();
                }
                writeLen = fs.writeSync(this.file.fd, buffer.buffer, { length: buffer.buffer.byteLength - 2 });
                fs.closeSync(this.file);
                this.state = 0;
            }
            else if (buffer[buffer.byteLength - 2] === 'g'.charCodeAt(0) && buffer[buffer.byteLength - 1] === 'o'.charCodeAt(0)) {
                if (this.state === 0) {
                    this.state = 1;
                    this.prepareOpeningFile();
                }
                writeLen = fs.writeSync(this.file.fd, buffer.buffer, { length: buffer.buffer.byteLength - 2 });
            }
            else {
                prompt.showToast({
                    message: `udp buffer data error ocurred`
                });
            }
            this.showPicture();
            prompt.showToast({
                message: `${this.filesDir}: ${writeLen}`
            });
        });
    }
    aboutToDisappear() {
        this.udpClient.closeUdp();
    }
    render() {
        Column.create();
        Column.height("100%");
        Column.width("100%");
        let earlierCreatedChild_2: Title = (this && this.findChildById) ? this.findChildById("2") as Title : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new Title("2", this, { title: `对端ip: ${this.serverIp}` }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                title: `对端ip: ${this.serverIp}`
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        Row.create();
        Image.create(this.image);
        Image.height(this.options.size.height);
        Image.width(this.options.size.width);
        Row.pop();
        Column.pop();
    }
}
class Title extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.title = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Title_Params) {
        if (params.title !== undefined) {
            this.title = params.title;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private title: string;
    render() {
        Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.height(60);
        Flex.backgroundColor("#333534");
        Text.create(this.title);
        Text.fontSize(20);
        Text.fontColor("#fdfdfd");
        Text.pop();
        Flex.pop();
    }
}
loadDocument(new Third("1", undefined, {}));
