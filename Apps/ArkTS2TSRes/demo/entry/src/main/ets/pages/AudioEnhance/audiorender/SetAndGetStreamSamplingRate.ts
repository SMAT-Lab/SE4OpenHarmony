interface SetAndGetStreamSamplingRate_Params {
    audioRendererOptions?;
    audioRenderer?;
    returnMsg?: string;
    rate?: number;
    path?: string;
    samplingRateList?;
    samplerate?: number;
    selectedSamplingRateKey?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SetAndGetStreamSamplingRate_" + ++__generate__Id;
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
class SetAndGetStreamSamplingRate extends View {
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
        this.__rate = new ObservedPropertySimple(0, this, "rate");
        this.__path = new ObservedPropertySimple(globalThis.pathDir + '/test_44100_2.wav', this, "path");
        this.samplingRateList = [];
        this.__samplerate = new ObservedPropertySimple(44100, this, "samplerate");
        this.__selectedSamplingRateKey = new ObservedPropertySimple("SAMPLE_RATE_44100", this, "selectedSamplingRateKey");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SetAndGetStreamSamplingRate_Params) {
        if (params.audioRendererOptions !== undefined) {
            this.audioRendererOptions = params.audioRendererOptions;
        }
        if (params.audioRenderer !== undefined) {
            this.audioRenderer = params.audioRenderer;
        }
        if (params.returnMsg !== undefined) {
            this.returnMsg = params.returnMsg;
        }
        if (params.rate !== undefined) {
            this.rate = params.rate;
        }
        if (params.path !== undefined) {
            this.path = params.path;
        }
        if (params.samplingRateList !== undefined) {
            this.samplingRateList = params.samplingRateList;
        }
        if (params.samplerate !== undefined) {
            this.samplerate = params.samplerate;
        }
        if (params.selectedSamplingRateKey !== undefined) {
            this.selectedSamplingRateKey = params.selectedSamplingRateKey;
        }
    }
    aboutToBeDeleted() {
        this.__returnMsg.aboutToBeDeleted();
        this.__rate.aboutToBeDeleted();
        this.__path.aboutToBeDeleted();
        this.__samplerate.aboutToBeDeleted();
        this.__selectedSamplingRateKey.aboutToBeDeleted();
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
    private samplingRateList;
    private __samplerate: ObservedPropertySimple<number>;
    get samplerate() {
        return this.__samplerate.get();
    }
    set samplerate(newValue: number) {
        this.__samplerate.set(newValue);
    }
    private __selectedSamplingRateKey: ObservedPropertySimple<string>;
    get selectedSamplingRateKey() {
        return this.__selectedSamplingRateKey.get();
    }
    set selectedSamplingRateKey(newValue: string) {
        this.__selectedSamplingRateKey.set(newValue);
    }
    aboutToAppear() {
        for (let key in audio.AudioSamplingRate) {
            this.samplingRateList.push({ value: key });
        }
    }
    async onBackPress() {
        if (this.audioRenderer == null) {
            this.returnMsg += `audioRenderer instance had not created\n`;
            return;
        }
        await this.audioRenderer.release();
        this.audioRenderer = null;
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
    setRendererSamplingRatePromise() {
        if (this.audioRenderer == null) {
            this.returnMsg = `audioRenderer instance had not created,dont‘t allow to setRendererSamplingRate\n`;
            return;
        }
        let _this = this;
        _this.audioRenderer.setRendererSamplingRate(_this.samplerate)
            .then(() => {
            _this.returnMsg = `audioRenderer setRendererSamplingRatePromise promise : Success`;
        })
            .catch(err => {
            _this.returnMsg = `audioRenderer setRendererSamplingRatePromise promise : Error: ${JSON.stringify(err)}`;
        });
    }
    setRendererSamplingRateCallback() {
        if (this.audioRenderer == null) {
            this.returnMsg = `audioRenderer instance had not created,dont‘t allow to setRendererSamplingRate\n`;
            return;
        }
        let _this = this;
        _this.audioRenderer.setRendererSamplingRate(_this.samplerate, (err) => {
            if (err) {
                _this.returnMsg = `audioRenderer setRendererSamplingRate : Error: ${JSON.stringify(err)}\n`;
            }
            else {
                _this.returnMsg = `audioRenderer setRendererSamplingRate : SUCCESS\n`;
            }
        });
    }
    getRendererSamplingRatePromise() {
        if (this.audioRenderer == null) {
            this.returnMsg = `audioRenderer instance had not created,dont‘t allow to getRendererSamplingRate\n`;
            return;
        }
        let _this = this;
        _this.audioRenderer.getRendererSamplingRate()
            .then(samplerate => {
            _this.returnMsg = `audioRenderer getRendererSamplingRate promise : Success,返回值：${samplerate}`;
        })
            .catch(err => {
            _this.returnMsg = `audioRenderer getRendererSamplingRate promise : Error: ${JSON.stringify(err)}`;
        });
    }
    getRendererSamplingRateCallback() {
        if (this.audioRenderer == null) {
            this.returnMsg = `audioRenderer instance had not created,dont‘t allow to getRendererSamplingRate\n`;
            return;
        }
        let _this = this;
        _this.audioRenderer.getRendererSamplingRate((err, data) => {
            if (err) {
                _this.returnMsg = `audioRenderer getRendererSamplingRate : Error: ${JSON.stringify(err)}\n`;
            }
            else {
                _this.returnMsg = `audioRenderer getRendererSamplingRate : SUCCESS,data:${JSON.stringify(data)}\n`;
            }
        });
    }
    async createRender() {
        try {
            this.audioRenderer = await audio.createAudioRenderer(this.audioRendererOptions);
            this.returnMsg += `audioRenderer create success \n`;
        }
        catch (err) {
            this.returnMsg += `audioRenderer create : Error: ${JSON.stringify(err)}\n`;
            return;
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
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceBetween);
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.onClick(() => this.createRender());
        Button.backgroundColor(Color.Pink);
        Text.create("创建AudioRender");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.onClick(() => this.renderPlay());
        Button.backgroundColor(Color.Pink);
        Text.create("播放音乐");
        Text.fontSize(22);
        Text.fontColor(Color.Blue);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 20, bottom: 10 });
        Row.width('80%');
        Row.justifyContent(FlexAlign.SpaceBetween);
        Text.create("采样率选择:");
        Text.fontSize(24);
        Text.pop();
        Select.create(this.samplingRateList);
        Select.value(this.selectedSamplingRateKey);
        Select.onSelect((index, value) => {
            this.selectedSamplingRateKey = value;
            this.samplerate = audio.AudioSamplingRate[value];
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
        Button.onClick(() => this.setRendererSamplingRatePromise());
        Text.create("设置stream播放速率promise");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.onClick(() => this.getRendererSamplingRatePromise());
        Text.create("获取stream播放速率promise");
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
        Button.onClick(() => this.setRendererSamplingRateCallback());
        Text.create("设置stream播放速率Callback");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.onClick(() => this.getRendererSamplingRateCallback());
        Text.create("获取stream播放速率Callback");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
}
loadDocument(new SetAndGetStreamSamplingRate("1", undefined, {}));
