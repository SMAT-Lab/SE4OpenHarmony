interface DeviceChangeCallback_Params {
    audioRendererOptions?;
    audioRenderer?;
    returnMsg?: string;
    Callback1Status?: string;
    Callback2Status?: string;
    returnCallback1Msg?: string;
    returnCallback2Msg?: string;
    volume?: number;
    rate?: number;
    path?: string;
    callback1?;
    callback2?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "DeviceChangeCallback_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import router from '@ohos.router';
import audio from '@ohos.multimedia.audio';
import fs from '@ohos.file.fs';
class DeviceChangeCallback extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.audioRendererOptions = {
            streamInfo: {
                samplingRate: audio.AudioSamplingRate.SAMPLE_RATE_44100,
                channels: audio.AudioChannel.CHANNEL_2,
                sampleFormat: audio.AudioSampleFormat.SAMPLE_FORMAT_S16LE,
                encodingType: audio.AudioEncodingType.ENCODING_TYPE_RAW
            },
            rendererInfo: {
                content: audio.ContentType.CONTENT_TYPE_MUSIC,
                usage: audio.StreamUsage.STREAM_USAGE_MEDIA,
                rendererFlags: 0
            }
        };
        this.audioRenderer = null;
        this.__returnMsg = new ObservedPropertySimple(``, this, "returnMsg");
        this.__Callback1Status = new ObservedPropertySimple(`未注册`, this, "Callback1Status");
        this.__Callback2Status = new ObservedPropertySimple(`未注册`, this, "Callback2Status");
        this.__returnCallback1Msg = new ObservedPropertySimple(``, this, "returnCallback1Msg");
        this.__returnCallback2Msg = new ObservedPropertySimple(``, this, "returnCallback2Msg");
        this.__volume = new ObservedPropertySimple(0, this, "volume");
        this.__rate = new ObservedPropertySimple(0, this, "rate");
        this.__path = new ObservedPropertySimple(globalThis.pathDir + '/test_44100_2.wav', this, "path");
        this.callback1 = (callback) => {
            this.returnCallback1Msg = this.getDeviceChangeInfo(callback);
        };
        this.callback2 = (callback) => {
            this.returnCallback2Msg = this.getDeviceChangeInfo(callback);
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: DeviceChangeCallback_Params) {
        if (params.audioRendererOptions !== undefined) {
            this.audioRendererOptions = params.audioRendererOptions;
        }
        if (params.audioRenderer !== undefined) {
            this.audioRenderer = params.audioRenderer;
        }
        if (params.returnMsg !== undefined) {
            this.returnMsg = params.returnMsg;
        }
        if (params.Callback1Status !== undefined) {
            this.Callback1Status = params.Callback1Status;
        }
        if (params.Callback2Status !== undefined) {
            this.Callback2Status = params.Callback2Status;
        }
        if (params.returnCallback1Msg !== undefined) {
            this.returnCallback1Msg = params.returnCallback1Msg;
        }
        if (params.returnCallback2Msg !== undefined) {
            this.returnCallback2Msg = params.returnCallback2Msg;
        }
        if (params.volume !== undefined) {
            this.volume = params.volume;
        }
        if (params.rate !== undefined) {
            this.rate = params.rate;
        }
        if (params.path !== undefined) {
            this.path = params.path;
        }
        if (params.callback1 !== undefined) {
            this.callback1 = params.callback1;
        }
        if (params.callback2 !== undefined) {
            this.callback2 = params.callback2;
        }
    }
    aboutToBeDeleted() {
        this.__returnMsg.aboutToBeDeleted();
        this.__Callback1Status.aboutToBeDeleted();
        this.__Callback2Status.aboutToBeDeleted();
        this.__returnCallback1Msg.aboutToBeDeleted();
        this.__returnCallback2Msg.aboutToBeDeleted();
        this.__volume.aboutToBeDeleted();
        this.__rate.aboutToBeDeleted();
        this.__path.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private audioRendererOptions;
    private audioRenderer;
    private __returnMsg: ObservedPropertySimple<string>;
    get returnMsg() {
        return this.__returnMsg.get();
    }
    set returnMsg(newValue: string) {
        this.__returnMsg.set(newValue);
    }
    private __Callback1Status: ObservedPropertySimple<string>;
    get Callback1Status() {
        return this.__Callback1Status.get();
    }
    set Callback1Status(newValue: string) {
        this.__Callback1Status.set(newValue);
    }
    private __Callback2Status: ObservedPropertySimple<string>;
    get Callback2Status() {
        return this.__Callback2Status.get();
    }
    set Callback2Status(newValue: string) {
        this.__Callback2Status.set(newValue);
    }
    private __returnCallback1Msg: ObservedPropertySimple<string>;
    get returnCallback1Msg() {
        return this.__returnCallback1Msg.get();
    }
    set returnCallback1Msg(newValue: string) {
        this.__returnCallback1Msg.set(newValue);
    }
    private __returnCallback2Msg: ObservedPropertySimple<string>;
    get returnCallback2Msg() {
        return this.__returnCallback2Msg.get();
    }
    set returnCallback2Msg(newValue: string) {
        this.__returnCallback2Msg.set(newValue);
    }
    private __volume: ObservedPropertySimple<number>;
    get volume() {
        return this.__volume.get();
    }
    set volume(newValue: number) {
        this.__volume.set(newValue);
    }
    private __rate: ObservedPropertySimple<number>;
    get rate() {
        return this.__rate.get();
    }
    set rate(newValue: number) {
        this.__rate.set(newValue);
    }
    private __path: ObservedPropertySimple<string>;
    get path() {
        return this.__path.get();
    }
    set path(newValue: string) {
        this.__path.set(newValue);
    }
    async onBackPress() {
        if (this.audioRenderer == null) {
            this.returnMsg += `audioRenderer instance had not created\n`;
            return;
        }
        await this.audioRenderer.release();
        this.audioRenderer = null;
    }
    getDeviceChangeInfo(DeviceChangeInfo) {
        let str = ``;
        for (let i = 0; i < DeviceChangeInfo.length; i++) {
            let descriptor = DeviceChangeInfo[i];
            str += `第${i}条\nId:${descriptor.id}, Type:${descriptor.deviceType}, Role:${descriptor.deviceRole}, Name:${descriptor.name},
      Address:${descriptor.address}, SampleRates:${descriptor.sampleRates[0]}, ChannelCounts:${descriptor.channelCounts[0]},
      ChannelMask:${descriptor.channelMasks[0]}, EncodingType:${descriptor.encodingTypes[0]}\n`;
        }
        return str;
    }
    async renderPlay() {
        try {
            this.audioRenderer = await audio.createAudioRenderer(this.audioRendererOptions);
            this.returnMsg += `audioRenderer create success \n`;
        }
        catch (err) {
            this.returnMsg += `audioRenderer create : Error: ${JSON.stringify(err)}\n`;
            return;
        }
        let bufferSize;
        try {
            bufferSize = await this.audioRenderer.getBufferSize();
            this.returnMsg += `audioRenderer getBufferSize success,bufferSize:${bufferSize} \n`;
            await this.audioRenderer.start();
            this.returnMsg += `audioRenderer start success \n`;
        }
        catch (err) {
            this.returnMsg += `audioRenderer start : Error: ${JSON.stringify(err)}\n`;
            return;
        }
        let path = this.path;
        try {
            this.returnMsg += `path:${path}\n`;
            let stat = await fs.stat(path);
            this.returnMsg += `stat:${JSON.stringify(stat)}\n`;
            this.returnMsg += `size:${stat.size}\n`;
            let len = stat.size % bufferSize == 0 ? Math.floor(stat.size / bufferSize) : Math.floor(stat.size / bufferSize + 1);
            let file = await fs.open(path, 0o0);
            this.returnMsg += `fd:${file.fd}\n`;
            let buf = new ArrayBuffer(bufferSize);
            this.returnMsg += `audioRenderer write start.......... \n`;
            // while(true){
            for (let i = 0; i < len; i++) {
                let options = {
                    offset: i * bufferSize,
                    length: bufferSize
                };
                let readsize = await fs.read(file.fd, buf, options);
                let writeSize = await this.audioRenderer.write(buf);
            }
            // }
            this.returnMsg += `audioRenderer write end. \n`;
        }
        catch (err) {
            this.returnMsg += `audioRenderer write : Error: ${JSON.stringify(err)}\n`;
        }
    }
    async createRender() {
        try {
            this.audioRenderer = await audio.createAudioRenderer(this.audioRendererOptions);
            this.returnMsg = `audioRenderer create success \n`;
        }
        catch (err) {
            this.returnMsg = `audioRenderer create : Error: ${JSON.stringify(err)}\n`;
            return;
        }
    }
    private callback1;
    private callback2;
    render() {
        Column.create();
        Row.create();
        Row.position({ x: 0, y: 3 });
        Row.width('100%');
        Row.zIndex(999);
        Column.create();
        Column.width('98%');
        Column.height(65);
        Column.backgroundColor(Color.Green);
        Column.position({ x: '1%' });
        Text.create("Callback1状态：");
        Text.fontWeight(FontWeight.Bolder);
        Text.position({ x: 10, y: 5 });
        Text.fontSize(18);
        Text.pop();
        Text.create(this.Callback1Status);
        Text.fontWeight(FontWeight.Bolder);
        Text.position({ x: 145, y: 5 });
        Text.fontSize(18);
        Text.pop();
        Text.create("Callback2状态：");
        Text.fontWeight(FontWeight.Bolder);
        Text.position({ x: 10, y: 30 });
        Text.fontSize(18);
        Text.pop();
        Text.create(this.Callback2Status);
        Text.fontWeight(FontWeight.Bolder);
        Text.position({ x: 145, y: 30 });
        Text.fontSize(18);
        Text.pop();
        Column.pop();
        Column.create();
        Column.width('98%');
        Column.height(410);
        Column.backgroundColor(Color.Orange);
        Column.position({ x: '1%', y: 70 });
        Text.create("Callback1返回值：");
        Text.fontWeight(FontWeight.Bolder);
        Text.position({ x: 10, y: 5 });
        Text.fontSize(18);
        Text.pop();
        Text.create(this.returnCallback1Msg);
        Text.position({ x: 10, y: 30 });
        Text.fontSize(14);
        Text.pop();
        Text.create("Callback2返回值：");
        Text.fontWeight(FontWeight.Bolder);
        Text.position({ x: 10, y: 200 });
        Text.fontSize(18);
        Text.pop();
        Text.create(this.returnCallback2Msg);
        Text.position({ x: 10, y: 230 });
        Text.fontSize(14);
        Text.pop();
        Text.create(this.returnMsg);
        Text.fontWeight(FontWeight.Bolder);
        Text.position({ x: 10, y: 370 });
        Text.fontSize(18);
        Text.pop();
        Column.pop();
        Row.pop();
        Scroll.create();
        Scroll.margin({ top: 490 });
        Scroll.width('100%');
        Column.create();
        Column.width('100%');
        Row.create();
        Row.margin({ top: 5, bottom: 10 });
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceBetween);
        Button.createWithChild();
        Button.width('49%');
        Button.height(40);
        Button.onClick(() => {
            this.createRender();
            this.Callback1Status = '未注册\n';
            this.Callback2Status = '未注册\n';
            this.returnCallback1Msg = '';
            this.returnCallback2Msg = '';
        });
        Button.backgroundColor(Color.Pink);
        Text.create("创建AudioRender");
        Text.fontSize(22);
        Text.fontColor(Color.Blue);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('49%');
        Button.height(40);
        Button.onClick(() => {
            this.createRender();
            this.Callback1Status = '未注册\n';
            this.Callback2Status = '未注册\n';
            this.returnCallback1Msg = '';
            this.returnCallback2Msg = '';
        });
        Button.backgroundColor(Color.Pink);
        Text.create("播放音乐");
        Text.fontSize(22);
        Text.fontColor(Color.Blue);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 5, bottom: 10 });
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceBetween);
        Button.createWithChild();
        Button.width('50%');
        Button.height(40);
        Button.margin({ top: 10 });
        Button.onClick(() => {
            if (this.audioRenderer == null) {
                this.returnMsg = `audioRenderer instance had not created,dont‘t allow to listener device change\n`;
                return;
            }
            let _this = this;
            this.audioRenderer.on('outputDeviceChange', this.callback1);
            _this.Callback1Status = 'Callback1监听中.....\n';
        });
        Text.create("监听Callback1");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('50%');
        Button.height(40);
        Button.margin({ top: 10 });
        Button.onClick(() => {
            if (this.audioRenderer == null) {
                this.returnMsg = `audioRenderer instance had not created,dont‘t allow to listener device change\n`;
                return;
            }
            let _this = this;
            this.audioRenderer.on('outputDeviceChange', this.callback2);
            _this.Callback2Status = 'Callback2监听中.....\n';
        });
        Text.create("监听Callback2");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 5, bottom: 10 });
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceBetween);
        Button.createWithChild();
        Button.width('50%');
        Button.height(40);
        Button.margin({ top: 10 });
        Button.onClick(() => {
            if (this.audioRenderer == null) {
                this.returnMsg = `audioRenderer instance had not created,dont‘t allow to listener device change\n`;
                return;
            }
            let _this = this;
            this.audioRenderer.off('outputDeviceChange', this.callback1);
            _this.Callback1Status = '已取消Callback1注册\n';
            _this.returnCallback1Msg = '';
        });
        Text.create("取消Callback1");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('50%');
        Button.height(40);
        Button.margin({ top: 10 });
        Button.onClick(() => {
            if (this.audioRenderer == null) {
                this.returnMsg = `audioRenderer instance had not created,dont‘t allow to listener device change\n`;
                return;
            }
            let _this = this;
            this.audioRenderer.off('outputDeviceChange', this.callback2);
            _this.Callback2Status = '已取消Callback2注册\n';
            _this.returnCallback2Msg = '';
        });
        Text.create("取消Callback2");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.width('100%');
        Button.createWithChild();
        Button.width('100%');
        Button.height(40);
        Button.margin({ top: 5 });
        Button.onClick(() => {
            if (this.audioRenderer == null) {
                this.returnMsg = `audioRenderer instance had not created,dont‘t allow to listener device change\n`;
                return;
            }
            let _this = this;
            this.audioRenderer.off('outputDeviceChange');
            _this.Callback1Status = '未注册\n';
            _this.Callback2Status = '未注册\n';
            _this.returnCallback1Msg = '';
            _this.returnCallback2Msg = '';
        });
        Text.create("取消所有监听");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Row.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
}
loadDocument(new DeviceChangeCallback("1", undefined, {}));
