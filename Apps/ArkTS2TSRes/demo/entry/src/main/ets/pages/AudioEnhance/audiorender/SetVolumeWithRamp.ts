interface SetVolumeWithRamp_Params {
    audioRenderer?;
    returnMsg?: string;
    streamUsageList?;
    streamUsage?: number;
    selectedStreamUsageKey?: string;
    audioRendererOptions?;
    pathValueList?;
    pathList?: string[];
    selectedPathKey?: string;
    selectedpath?: string;
    volume?: number;
    directionValueList?;
    directionList?: number[];
    selectedDirection?: number;
    selectedDirectionKey?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SetVolumeWithRamp_" + ++__generate__Id;
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
class SetVolumeWithRamp extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.audioRenderer = null;
        this.__returnMsg = new ObservedPropertySimple(``, this, "returnMsg");
        this.streamUsageList = [];
        this.__streamUsage = new ObservedPropertySimple(1, this, "streamUsage");
        this.__selectedStreamUsageKey = new ObservedPropertySimple("STREAM_USAGE_MEDIA", this, "selectedStreamUsageKey");
        this.audioRendererOptions = {
            streamInfo: {
                samplingRate: audio.AudioSamplingRate.SAMPLE_RATE_44100,
                channels: audio.AudioChannel.CHANNEL_2,
                sampleFormat: audio.AudioSampleFormat.SAMPLE_FORMAT_S16LE,
                encodingType: audio.AudioEncodingType.ENCODING_TYPE_RAW
            },
            rendererInfo: {
                content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
                usage: this.streamUsage,
                rendererFlags: 0
            }
        };
        this.pathValueList = [];
        this.pathList = ['/2ch_16bit_1.wav', '/safe_and_sound_32.wav'];
        this.__selectedPathKey = new ObservedPropertySimple("/2ch_16bit_1.wav", this, "selectedPathKey");
        this.selectedpath = globalThis.pathDir + '/2ch_16bit_1.wav';
        this.__volume = new ObservedPropertySimple(0, this, "volume");
        this.directionValueList = [];
        this.directionList = [0, 1, 5, 10, 15, 25, 50, 100, 200, 1000, 2000];
        this.selectedDirection = 1000;
        this.__selectedDirectionKey = new ObservedPropertySimple("1000", this, "selectedDirectionKey");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SetVolumeWithRamp_Params) {
        if (params.audioRenderer !== undefined) {
            this.audioRenderer = params.audioRenderer;
        }
        if (params.returnMsg !== undefined) {
            this.returnMsg = params.returnMsg;
        }
        if (params.streamUsageList !== undefined) {
            this.streamUsageList = params.streamUsageList;
        }
        if (params.streamUsage !== undefined) {
            this.streamUsage = params.streamUsage;
        }
        if (params.selectedStreamUsageKey !== undefined) {
            this.selectedStreamUsageKey = params.selectedStreamUsageKey;
        }
        if (params.audioRendererOptions !== undefined) {
            this.audioRendererOptions = params.audioRendererOptions;
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
        if (params.volume !== undefined) {
            this.volume = params.volume;
        }
        if (params.directionValueList !== undefined) {
            this.directionValueList = params.directionValueList;
        }
        if (params.directionList !== undefined) {
            this.directionList = params.directionList;
        }
        if (params.selectedDirection !== undefined) {
            this.selectedDirection = params.selectedDirection;
        }
        if (params.selectedDirectionKey !== undefined) {
            this.selectedDirectionKey = params.selectedDirectionKey;
        }
    }
    aboutToBeDeleted() {
        this.__returnMsg.aboutToBeDeleted();
        this.__streamUsage.aboutToBeDeleted();
        this.__selectedStreamUsageKey.aboutToBeDeleted();
        this.__selectedPathKey.aboutToBeDeleted();
        this.__volume.aboutToBeDeleted();
        this.__selectedDirectionKey.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private audioRenderer;
    private __returnMsg: ObservedPropertySimple<string>;
    get returnMsg() {
        return this.__returnMsg.get();
    }
    set returnMsg(newValue: string) {
        this.__returnMsg.set(newValue);
    }
    private streamUsageList;
    private __streamUsage: ObservedPropertySimple<number>;
    get streamUsage() {
        return this.__streamUsage.get();
    }
    set streamUsage(newValue: number) {
        this.__streamUsage.set(newValue);
    }
    private __selectedStreamUsageKey: ObservedPropertySimple<string>;
    get selectedStreamUsageKey() {
        return this.__selectedStreamUsageKey.get();
    }
    set selectedStreamUsageKey(newValue: string) {
        this.__selectedStreamUsageKey.set(newValue);
    }
    private audioRendererOptions;
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
    private __volume: ObservedPropertySimple<number>;
    get volume() {
        return this.__volume.get();
    }
    set volume(newValue: number) {
        this.__volume.set(newValue);
    }
    public directionValueList;
    public directionList: number[];
    public selectedDirection: number;
    private __selectedDirectionKey: ObservedPropertySimple<string>;
    get selectedDirectionKey() {
        return this.__selectedDirectionKey.get();
    }
    set selectedDirectionKey(newValue: string) {
        this.__selectedDirectionKey.set(newValue);
    }
    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    aboutToAppear() {
        for (var i = 0; i < this.directionList.length; i++) {
            var key = this.directionList[i].toString();
            this.directionValueList.push({ value: key });
        }
        for (var i = 0; i < this.pathList.length; i++) {
            var key = this.pathList[i].toString();
            this.pathValueList.push({ value: key });
        }
        for (let key in audio.StreamUsage) {
            this.streamUsageList.push({ value: key });
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
                    this.returnMsg += `audioRenderer drain : Error: ${JSON.stringify(err)}\n`;
                }
                else {
                    this.returnMsg += `audioRenderer drain : SUCCESS\n`;
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
    async setVolumeWithRamp() {
        let volume: number = this.volume;
        let direction: number = this.selectedDirection;
        try {
            this.audioRenderer.setVolumeWithRamp(volume, direction);
            this.returnMsg = `audioRenderer setVolumeWithRamp SUCCESS\n`;
        }
        catch (error) {
            this.returnMsg = `audioRenderer setVolumeWithRamp : Error: ${JSON.stringify(error)}\n`;
        }
    }
    async setVolume() {
        let volume: number = this.volume;
        try {
            this.audioRenderer.setVolume(volume);
            this.returnMsg = `audioRenderer setVolume ${volume} SUCCESS\n`;
        }
        catch (error) {
            this.returnMsg = `audioRenderer setVolume ${volume} : Error: ${JSON.stringify(error)}\n`;
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
        Text.create("set_音量选择(0.0-1.0)");
        Text.fontSize(24);
        Text.margin({ top: 30 });
        Text.pop();
        Row.create();
        Slider.create({
            value: this.volume,
            min: 0,
            max: 1,
            step: 0.1,
            style: SliderStyle.InSet
        });
        Slider.blockColor('#191970');
        Slider.trackColor('#ADD8E6');
        Slider.selectedColor('#4169E1');
        Slider.showTips(true);
        Slider.onChange((value: number, mode: SliderChangeMode) => {
            this.volume = value;
            console.info('value:' + value + 'mode:' + mode.toString());
        });
        Slider.width('80%');
        Text.create(this.volume.toFixed(1));
        Text.fontSize(24);
        Text.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 15, bottom: 10 });
        Row.width('80%');
        Row.justifyContent(FlexAlign.SpaceBetween);
        Text.create("set_时长选择:");
        Text.fontSize(24);
        Text.pop();
        Select.create(this.directionValueList);
        Select.value(this.selectedDirectionKey);
        Select.onSelect((index, value) => {
            this.selectedDirectionKey = value;
            console.log(`selectedDirectionKey: ${value}`);
            this.selectedDirection = this.directionList[index];
            console.log(`selectedDirection: ${this.selectedDirection}`);
        });
        Select.font({ size: 22 });
        Select.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 15, bottom: 10 });
        Row.width('80%');
        Row.justifyContent(FlexAlign.SpaceBetween);
        Text.create("片源选择:");
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
        Row.width('80%');
        Row.justifyContent(FlexAlign.SpaceBetween);
        Text.create("音频流选择:");
        Text.fontSize(24);
        Text.pop();
        Select.create(this.streamUsageList);
        Select.value(this.selectedStreamUsageKey);
        Select.onSelect((index, value) => {
            this.selectedStreamUsageKey = value;
            this.streamUsage = audio.StreamUsage[value];
            console.log(`streamUsage: ${this.streamUsage}`);
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
        Button.onClick(() => this.setVolumeWithRamp());
        Text.create("setVolumeWithRamp同步接口");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.onClick(() => this.setVolume());
        Text.create("setVolume");
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
loadDocument(new SetVolumeWithRamp("1", undefined, {}));
