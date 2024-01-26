interface Setting_Params {
    audioRendererOptions?;
    audioRenderer?;
    returnMsg?: string;
    path?: string;
    volume?: number;
    rate?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Setting_" + ++__generate__Id;
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
class Setting extends View {
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
                content: audio.ContentType.CONTENT_TYPE_SPEECH,
                usage: audio.StreamUsage.STREAM_USAGE_VOICE_COMMUNICATION,
                rendererFlags: 0
            }
        };
        this.audioRenderer = null;
        this.__returnMsg = new ObservedPropertySimple(`hello`, this, "returnMsg");
        this.__path = new ObservedPropertySimple(globalThis.pathDir + '/test_44100_2.wav', this, "path");
        this.__volume = new ObservedPropertySimple(0, this, "volume");
        this.__rate = new ObservedPropertySimple(0, this, "rate");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Setting_Params) {
        if (params.audioRendererOptions !== undefined) {
            this.audioRendererOptions = params.audioRendererOptions;
        }
        if (params.audioRenderer !== undefined) {
            this.audioRenderer = params.audioRenderer;
        }
        if (params.returnMsg !== undefined) {
            this.returnMsg = params.returnMsg;
        }
        if (params.path !== undefined) {
            this.path = params.path;
        }
        if (params.volume !== undefined) {
            this.volume = params.volume;
        }
        if (params.rate !== undefined) {
            this.rate = params.rate;
        }
    }
    aboutToBeDeleted() {
        this.__returnMsg.aboutToBeDeleted();
        this.__path.aboutToBeDeleted();
        this.__volume.aboutToBeDeleted();
        this.__rate.aboutToBeDeleted();
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
    private __path: ObservedPropertySimple<string>;
    get path() {
        return this.__path.get();
    }
    set path(newValue: string) {
        this.__path.set(newValue);
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
    async onBackPress() {
        if (this.audioRenderer == null) {
            this.returnMsg += `audioRenderer instance had not created\n`;
            return;
        }
        await this.audioRenderer.release();
        this.audioRenderer = null;
    }
    setRenderRateCallback() {
        if (this.audioRenderer == null) {
            this.returnMsg += `audioRenderer instance had not created,dont‘t allow to setRenderRateCallback\n`;
            return;
        }
        let _this = this;
        this.audioRenderer.setRenderRate(this.rate, (err) => {
            if (err) {
                _this.returnMsg = `audioRenderer setRenderRate callback : Error: ${JSON.stringify(err)}`;
            }
            else {
                _this.returnMsg = `audioRenderer setRenderRate callback : Success`;
            }
        });
    }
    setRenderRatePromise() {
        if (this.audioRenderer == null) {
            this.returnMsg += `audioRenderer instance had not created,dont‘t allow to setRenderRateCallback\n`;
            return;
        }
        let _this = this;
        this.audioRenderer.setRenderRate(this.rate)
            .then(() => {
            _this.returnMsg = `audioRenderer setRenderRate promise : Success`;
        })
            .catch(err => {
            _this.returnMsg = `audioRenderer setRenderRate promise : Error: ${JSON.stringify(err)}`;
        });
    }
    getRenderRateCallback() {
        if (this.audioRenderer == null) {
            this.returnMsg += `audioRenderer instance had not created,dont‘t allow to setRenderRateCallback\n`;
            return;
        }
        let _this = this;
        this.audioRenderer.getRenderRate((err, renderrate) => {
            if (err) {
                _this.returnMsg = `audioRenderer getRenderRate callback : Error: ${JSON.stringify(err)}`;
            }
            else {
                _this.returnMsg = `audioRenderer getRenderRate callback : Success,返回值：${renderrate}`;
            }
        });
    }
    getRenderRatePromise() {
        if (this.audioRenderer == null) {
            this.returnMsg += `audioRenderer instance had not created,dont‘t allow to setRenderRateCallback\n`;
            return;
        }
        let _this = this;
        this.audioRenderer.getRenderRate()
            .then(renderrate => {
            _this.returnMsg = `audioRenderer getRenderRate promise : Success,返回值：${renderrate}`;
        })
            .catch(err => {
            _this.returnMsg = `audioRenderer getRenderRate promise : Error: ${JSON.stringify(err)}`;
        });
    }
    setVolumeCallback() {
        if (this.audioRenderer == null) {
            this.returnMsg += `audioRenderer instance had not created,dont‘t allow to setRenderRateCallback\n`;
            return;
        }
        let _this = this;
        this.audioRenderer.setVolume(this.volume, (err) => {
            if (err) {
                _this.returnMsg = `audioRenderer setVolume callback : Error: ${JSON.stringify(err)}`;
            }
            else {
                _this.returnMsg = `audioRenderer setVolume callback : Success`;
            }
        });
    }
    setVolumePromise() {
        if (this.audioRenderer == null) {
            this.returnMsg += `audioRenderer instance had not created,dont‘t allow to setRenderRateCallback\n`;
            return;
        }
        let _this = this;
        this.audioRenderer.setVolume(this.volume).then(() => {
            _this.returnMsg = `audioRenderer setVolume promise : Success`;
        }).catch((err) => {
            _this.returnMsg = `audioRenderer setVolume promise : Error: ${JSON.stringify(err)}`;
        });
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
            while (true) {
                for (let i = 0; i < len; i++) {
                    let options = {
                        offset: i * bufferSize,
                        length: bufferSize
                    };
                    let readsize = await fs.read(file.fd, buf, options);
                    let writeSize = await this.audioRenderer.write(buf);
                }
            }
            this.returnMsg += `audioRenderer write end. \n`;
        }
        catch (err) {
            this.returnMsg += `audioRenderer write : Error: ${JSON.stringify(err)}\n`;
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
        Column.height(120);
        Column.backgroundColor(Color.Orange);
        Column.position({ x: '1%' });
        Text.create("【音频渲染-设置】返回数据：");
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
        Scroll.margin({ top: 130 });
        Scroll.width('100%');
        Column.create();
        Column.width('100%');
        Text.create("播放速度设置");
        Text.fontSize(24);
        Text.pop();
        Row.create();
        Slider.create({
            value: this.rate,
            min: 0,
            max: 2,
            step: 1,
            style: SliderStyle.InSet
        });
        Slider.blockColor('#191970');
        Slider.trackColor('#ADD8E6');
        Slider.selectedColor('#4169E1');
        Slider.showTips(true);
        Slider.onChange((value: number, mode: SliderChangeMode) => {
            this.rate = value;
            console.info('value:' + value + 'mode:' + mode.toString());
        });
        Slider.width('80%');
        Text.create(this.rate.toFixed(0));
        Text.fontSize(24);
        Text.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceBetween);
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.onClick(() => this.setRenderRateCallback());
        Text.create("setRenderRate callback");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.onClick(() => this.setRenderRatePromise());
        Text.create("setRenderRate promise");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceBetween);
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.onClick(() => this.getRenderRateCallback());
        Text.create("getRenderRate callback");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.onClick(() => this.getRenderRatePromise());
        Text.create("getRenderRate promise");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Text.create("音量设置");
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
        Row.margin({ top: 10 });
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceBetween);
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.onClick(() => this.setVolumeCallback());
        Text.create("setVolume callback");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.onClick(() => this.setVolumePromise());
        Text.create("setVolume promise");
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
        Button.width('100%');
        Button.height(60);
        Button.onClick(() => this.renderPlay());
        Button.backgroundColor(Color.Pink);
        Text.create("播放音乐");
        Text.fontSize(22);
        Text.fontColor(Color.Blue);
        Text.pop();
        Button.pop();
        Row.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
}
loadDocument(new Setting("1", undefined, {}));
