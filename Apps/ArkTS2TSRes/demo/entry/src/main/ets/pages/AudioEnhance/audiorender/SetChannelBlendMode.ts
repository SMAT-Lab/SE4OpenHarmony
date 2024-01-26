interface SetChannelBlendMode_Params {
    audioRendererOptions?;
    audioRenderer?;
    returnMsg?: string;
    channelBlendModeList?;
    channelBlendMode?: number;
    selectedChannelBlendModeKey?: string;
    pathValueList?;
    pathList?: string[];
    selectedPathKey?: string;
    selectedpath?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SetChannelBlendMode_" + ++__generate__Id;
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
class SetChannelBlendMode extends View {
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
                content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
                usage: audio.StreamUsage.STREAM_USAGE_MEDIA,
                rendererFlags: 0
            }
        };
        this.audioRenderer = null;
        this.__returnMsg = new ObservedPropertySimple(``, this, "returnMsg");
        this.channelBlendModeList = [];
        this.__channelBlendMode = new ObservedPropertySimple(0, this, "channelBlendMode");
        this.__selectedChannelBlendModeKey = new ObservedPropertySimple('MODE_DEFAULT', this, "selectedChannelBlendModeKey");
        this.pathValueList = [];
        this.pathList = ['/2ch_16bit.wav', '/3ch_16bit.wav', '/4ch_16bit.wav', '/5ch_16bit.wav', '/6ch_16bit.wav', '/7ch_16bit.wav', '/8ch_16bit.wav'];
        this.__selectedPathKey = new ObservedPropertySimple("/2ch_16bit.wav", this, "selectedPathKey");
        this.selectedpath = globalThis.pathDir + '/2ch_16bit.wav';
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SetChannelBlendMode_Params) {
        if (params.audioRendererOptions !== undefined) {
            this.audioRendererOptions = params.audioRendererOptions;
        }
        if (params.audioRenderer !== undefined) {
            this.audioRenderer = params.audioRenderer;
        }
        if (params.returnMsg !== undefined) {
            this.returnMsg = params.returnMsg;
        }
        if (params.channelBlendModeList !== undefined) {
            this.channelBlendModeList = params.channelBlendModeList;
        }
        if (params.channelBlendMode !== undefined) {
            this.channelBlendMode = params.channelBlendMode;
        }
        if (params.selectedChannelBlendModeKey !== undefined) {
            this.selectedChannelBlendModeKey = params.selectedChannelBlendModeKey;
        }
        if (params.pathValueList !== undefined) {
            this.pathValueList = params.pathValueList;
        }
        if (params.pathList !== undefined) {
            this.pathList = params.pathList;
        }
        if (params.selectedPathKey !== undefined) {
            this.selectedPathKey = params.selectedPathKey;
        }
        if (params.selectedpath !== undefined) {
            this.selectedpath = params.selectedpath;
        }
    }
    aboutToBeDeleted() {
        this.__returnMsg.aboutToBeDeleted();
        this.__channelBlendMode.aboutToBeDeleted();
        this.__selectedChannelBlendModeKey.aboutToBeDeleted();
        this.__selectedPathKey.aboutToBeDeleted();
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
    private channelBlendModeList;
    private __channelBlendMode: ObservedPropertySimple<number>;
    get channelBlendMode() {
        return this.__channelBlendMode.get();
    }
    set channelBlendMode(newValue: number) {
        this.__channelBlendMode.set(newValue);
    }
    private __selectedChannelBlendModeKey: ObservedPropertySimple<string>;
    get selectedChannelBlendModeKey() {
        return this.__selectedChannelBlendModeKey.get();
    }
    set selectedChannelBlendModeKey(newValue: string) {
        this.__selectedChannelBlendModeKey.set(newValue);
    }
    public pathValueList;
    public pathList: string[];
    private __selectedPathKey: ObservedPropertySimple<string>;
    get selectedPathKey() {
        return this.__selectedPathKey.get();
    }
    set selectedPathKey(newValue: string) {
        this.__selectedPathKey.set(newValue);
    }
    public selectedpath: string;
    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    aboutToAppear() {
        for (var key in audio.ChannelBlendMode) {
            console.info(`aboutToAppear channelBlendModeList: ${audio.ChannelBlendMode[key]}`);
            this.channelBlendModeList.push({ value: key });
        }
        for (var i = 0; i < this.pathList.length; i++) {
            var key = this.pathList[i].toString();
            this.pathValueList.push({ value: key });
        }
    }
    async onBackPress() {
        if (this.audioRenderer == null) {
            return;
        }
        await this.audioRenderer.release();
        this.audioRenderer = null;
    }
    createRenderer() {
        if (this.audioRenderer != null) {
            this.returnMsg = `audioRenderer instance had created,dont‘t allow to create\n`;
            return;
        }
        audio.createAudioRenderer(this.audioRendererOptions, (err, data) => {
            if (err) {
                this.returnMsg = `audioRenderer create : Error: ${JSON.stringify(err)}\n`;
            }
            else {
                this.audioRenderer = data;
                this.returnMsg = `audioRenderer create : SUCCESS \n`;
            }
        });
    }
    async startRenderer() {
        try {
            let path = this.selectedpath;
            this.returnMsg += `path:${path}\n`;
            let stat = await fs.stat(path);
            this.returnMsg += `stat:${JSON.stringify(stat)}\n`;
            let file = await fs.open(path, 0o0);
            this.returnMsg += `fd:${file.fd}\n`; //open file
            await this.sleep(1000);
            await this.audioRenderer.start((err) => {
                if (err) {
                    this.returnMsg += `audioRenderer start : Error: ${JSON.stringify(err)}\n`;
                }
                else {
                    this.returnMsg += `audioRenderer start success \n`;
                }
            });
            let bufferSize;
            await this.audioRenderer.getBufferSize((err, data) => {
                if (err) {
                    this.returnMsg += `audioRenderer getBufferSize : Error: ${JSON.stringify(err)}\n`;
                }
                else {
                    bufferSize = data;
                    this.returnMsg += `audioRenderer getBufferSize success,bufferSize:${bufferSize} \n`; // start,mode,buffersize
                }
            });
            await this.sleep(1000);
            let buf = new ArrayBuffer(bufferSize);
            this.returnMsg += `audioRenderer write start.......... \n`;
            let len = stat.size % bufferSize == 0 ? Math.floor(stat.size / bufferSize) : Math.floor(stat.size / bufferSize + 1);
            for (let i = 0; i < len; i++) {
                let options = {
                    offset: i * bufferSize,
                    length: bufferSize
                };
                await fs.read(file.fd, buf, options);
                await this.audioRenderer.write(buf);
            }
            this.returnMsg += `audioRenderer write end.......... \n`;
            await this.audioRenderer.drain((err) => {
                if (err) {
                    this.returnMsg = `audioRenderer drain : Error: ${JSON.stringify(err)}\n`;
                }
                else {
                    this.returnMsg = `audioRenderer drain : SUCCESS\n`;
                }
            });
        }
        catch (error) {
            this.returnMsg += `callbackPlay err ${JSON.stringify(error)} \n`;
        }
    }
    stopRenderer() {
        if (this.audioRenderer == null) {
            this.returnMsg = `audioRenderer instance had not created,dont‘t allow to stop\n`;
            return;
        }
        this.audioRenderer.stop((err) => {
            if (err) {
                this.returnMsg = `audioRenderer stop : Error: ${JSON.stringify(err)}\n`;
            }
            else {
                this.returnMsg = `audioRenderer stop : SUCCESS \n`;
            }
        });
    }
    releaseRenderer() {
        if (this.audioRenderer == null) {
            this.returnMsg = `audioRenderer instance had not created,dont‘t allow to release\n`;
            return;
        }
        this.audioRenderer.release((err) => {
            if (err) {
                this.returnMsg = `audioRenderer release : Error: ${JSON.stringify(err)}\n`;
            }
            else {
                this.returnMsg = `audioRenderer release SUCCESS\n`;
                this.audioRenderer = null;
            }
        });
    }
    async setChannelBlendMode() {
        try {
            this.audioRenderer.setChannelBlendMode(this.channelBlendMode);
            this.returnMsg += `audioRenderer setChannelBlendMode SUCCESS\n`;
        }
        catch (error) {
            this.returnMsg += `audioRenderer setChannelBlendMode : Error: ${JSON.stringify(error)}\n`;
        }
    }
    async callbackPlay() {
        try {
            let path = this.selectedpath;
            this.returnMsg += `path:${path}\n`;
            let stat = await fs.stat(path);
            this.returnMsg += `stat:${JSON.stringify(stat)}\n`;
            let file = await fs.open(path, 0o0);
            this.returnMsg += `fd:${file.fd}\n`; //open file
            await audio.createAudioRenderer(this.audioRendererOptions).then((data) => {
                this.audioRenderer = data;
                this.returnMsg += `audioRenderer createAudioRenderer success \n`;
            }).catch((err) => {
                console.info(`audioRenderer create err ${JSON.stringify(err)}`);
            });
            await this.setChannelBlendMode();
            await this.sleep(1000);
            await this.audioRenderer.start((err) => {
                if (err) {
                    this.returnMsg += `audioRenderer start : Error: ${JSON.stringify(err)}\n`;
                }
                else {
                    this.returnMsg += `audioRenderer start success \n`;
                }
            });
            let bufferSize;
            await this.audioRenderer.getBufferSize((err, data) => {
                if (err) {
                    this.returnMsg += `audioRenderer getBufferSize : Error: ${JSON.stringify(err)}\n`;
                }
                else {
                    bufferSize = data;
                    this.returnMsg += `audioRenderer getBufferSize success,bufferSize:${bufferSize} \n`; // start,mode,buffersize
                }
            });
            await this.sleep(1000);
            let buf = new ArrayBuffer(bufferSize);
            this.returnMsg += `audioRenderer write start.......... \n`;
            let len = stat.size % bufferSize == 0 ? Math.floor(stat.size / bufferSize) : Math.floor(stat.size / bufferSize + 1);
            for (let i = 0; i < len; i++) {
                let options = {
                    offset: i * bufferSize,
                    length: bufferSize
                };
                await fs.read(file.fd, buf, options);
                await this.audioRenderer.write(buf);
            }
            this.returnMsg += `audioRenderer write end.......... \n`;
            await this.audioRenderer.drain((err) => {
                if (err) {
                    this.returnMsg = `audioRenderer drain : Error: ${JSON.stringify(err)}\n`;
                }
                else {
                    this.returnMsg = `audioRenderer drain : SUCCESS\n`;
                }
            });
            await this.sleep(1000);
            await this.audioRenderer.stop((err) => {
                if (err) {
                    this.returnMsg += `audioRenderer stop : Error: ${JSON.stringify(err)}\n`;
                }
                else {
                    this.returnMsg += `audioRenderer stop : SUCCESS\n`;
                }
            });
            await this.audioRenderer.release((err) => {
                if (err) {
                    this.returnMsg += `audioRenderer release : Error: ${JSON.stringify(err)}\n`;
                }
                else {
                    this.returnMsg += `audioRenderer release : SUCCESS\n`;
                }
            });
        }
        catch (error) {
            this.returnMsg += `callbackPlay err ${JSON.stringify(error)} \n`;
        }
    }
    render() {
        Column.create();
        Row.create();
        Row.position({ x: 0, y: 0 });
        Row.width('100%');
        Row.zIndex(999);
        Column.create();
        Column.width('98%');
        Column.height(220);
        Column.backgroundColor(Color.Orange);
        Column.position({ x: '1%' });
        Text.create("返回数据：");
        Text.fontWeight(FontWeight.Bolder);
        Text.position({ x: 10, y: 5 });
        Text.fontSize(18);
        Text.pop();
        Text.create(this.returnMsg);
        Text.position({ x: 10, y: 30 });
        Text.fontSize(14);
        Text.pop();
        Column.pop();
        Row.pop();
        Scroll.create();
        Scroll.margin({ top: 230 });
        Scroll.width('100%');
        Column.create();
        Column.width('100%');
        Row.create();
        Row.margin({ top: 20, bottom: 10 });
        Row.width('80%');
        Row.justifyContent(FlexAlign.SpaceBetween);
        Text.create("混合模式选择:");
        Text.fontSize(24);
        Text.pop();
        Select.create(this.channelBlendModeList);
        Select.value(this.selectedChannelBlendModeKey);
        Select.onSelect((index, value) => {
            this.selectedChannelBlendModeKey = value;
            console.info(`Select selectedChannelBlendModeKey: ${this.selectedChannelBlendModeKey}`);
            console.info(`Select value: ${value}`);
            this.channelBlendMode = audio.ChannelBlendMode[value];
            console.info(`Select channelBlendMode: ${audio.ChannelBlendMode[value]}`);
        });
        Select.font({ size: 22 });
        Select.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 20, bottom: 10 });
        Row.width('80%');
        Row.justifyContent(FlexAlign.SpaceBetween);
        Text.create("多声道片源选择:");
        Text.fontSize(24);
        Text.pop();
        Select.create(this.pathValueList);
        Select.value(this.selectedPathKey);
        Select.onSelect((index, value) => {
            this.selectedPathKey = value;
            console.log(`selectedPathKey: ${value}`);
            this.selectedpath = globalThis.pathDir + this.pathList[index];
            console.log(`path: ${this.selectedpath}`);
        });
        Select.font({ size: 22 });
        Select.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 20, bottom: 10 });
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceBetween);
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.onClick(() => this.setChannelBlendMode());
        Text.create("setChannelBlendMode");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.onClick(() => this.callbackPlay());
        Text.create("同步方式触发混合模式并播放");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 20, bottom: 10 });
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceBetween);
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.backgroundColor(Color.Pink);
        Button.onClick(() => this.createRenderer());
        Text.create("create");
        Text.fontSize(22);
        Text.fontColor(Color.Blue);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.backgroundColor(Color.Pink);
        Button.onClick(() => this.startRenderer());
        Text.create("start");
        Text.fontSize(22);
        Text.fontColor(Color.Blue);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 20, bottom: 10 });
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceBetween);
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.backgroundColor(Color.Pink);
        Button.onClick(() => this.stopRenderer());
        Text.create("stop");
        Text.fontSize(22);
        Text.fontColor(Color.Blue);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.backgroundColor(Color.Pink);
        Button.onClick(() => this.releaseRenderer());
        Text.create("release");
        Text.fontSize(22);
        Text.fontColor(Color.Blue);
        Text.pop();
        Button.pop();
        Row.pop();
        Divider.create();
        Divider.strokeWidth(10);
        Divider.color(Color.Blue);
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
}
loadDocument(new SetChannelBlendMode("1", undefined, {}));
