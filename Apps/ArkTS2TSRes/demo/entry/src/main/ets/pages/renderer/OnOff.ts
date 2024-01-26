interface OnOff_Params {
    audioRendererOptions?;
    audioRenderer?;
    returnMsg?: string;
    onReturnMsg?: string;
    onMarkReachReturnMsg?: string;
    onPeriodReachReturnMsg?: string;
    bufferSize?: number;
    path?: string;
    markReachFrame?: number;
    periodReachFrame?: number;
    audioManager?;
    audioStreamManager?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "OnOff_" + ++__generate__Id;
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
class OnOff extends View {
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
        this.__onReturnMsg = new ObservedPropertySimple(`hello`, this, "onReturnMsg");
        this.__onMarkReachReturnMsg = new ObservedPropertySimple(`hello`, this, "onMarkReachReturnMsg");
        this.__onPeriodReachReturnMsg = new ObservedPropertySimple(`hello`, this, "onPeriodReachReturnMsg");
        this.__bufferSize = new ObservedPropertySimple(0, this, "bufferSize");
        this.__path = new ObservedPropertySimple(globalThis.pathDir + '/test_44100_2.wav', this, "path");
        this.__markReachFrame = new ObservedPropertySimple(1000, this, "markReachFrame");
        this.__periodReachFrame = new ObservedPropertySimple(1000, this, "periodReachFrame");
        this.audioManager = null;
        this.audioStreamManager = null;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: OnOff_Params) {
        if (params.audioRendererOptions !== undefined) {
            this.audioRendererOptions = params.audioRendererOptions;
        }
        if (params.audioRenderer !== undefined) {
            this.audioRenderer = params.audioRenderer;
        }
        if (params.returnMsg !== undefined) {
            this.returnMsg = params.returnMsg;
        }
        if (params.onReturnMsg !== undefined) {
            this.onReturnMsg = params.onReturnMsg;
        }
        if (params.onMarkReachReturnMsg !== undefined) {
            this.onMarkReachReturnMsg = params.onMarkReachReturnMsg;
        }
        if (params.onPeriodReachReturnMsg !== undefined) {
            this.onPeriodReachReturnMsg = params.onPeriodReachReturnMsg;
        }
        if (params.bufferSize !== undefined) {
            this.bufferSize = params.bufferSize;
        }
        if (params.path !== undefined) {
            this.path = params.path;
        }
        if (params.markReachFrame !== undefined) {
            this.markReachFrame = params.markReachFrame;
        }
        if (params.periodReachFrame !== undefined) {
            this.periodReachFrame = params.periodReachFrame;
        }
        if (params.audioManager !== undefined) {
            this.audioManager = params.audioManager;
        }
        if (params.audioStreamManager !== undefined) {
            this.audioStreamManager = params.audioStreamManager;
        }
    }
    aboutToBeDeleted() {
        this.__returnMsg.aboutToBeDeleted();
        this.__onReturnMsg.aboutToBeDeleted();
        this.__onMarkReachReturnMsg.aboutToBeDeleted();
        this.__onPeriodReachReturnMsg.aboutToBeDeleted();
        this.__bufferSize.aboutToBeDeleted();
        this.__path.aboutToBeDeleted();
        this.__markReachFrame.aboutToBeDeleted();
        this.__periodReachFrame.aboutToBeDeleted();
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
    private __onReturnMsg: ObservedPropertySimple<string>;
    get onReturnMsg() {
        return this.__onReturnMsg.get();
    }
    set onReturnMsg(newValue: string) {
        this.__onReturnMsg.set(newValue);
    }
    private __onMarkReachReturnMsg: ObservedPropertySimple<string>;
    get onMarkReachReturnMsg() {
        return this.__onMarkReachReturnMsg.get();
    }
    set onMarkReachReturnMsg(newValue: string) {
        this.__onMarkReachReturnMsg.set(newValue);
    }
    private __onPeriodReachReturnMsg: ObservedPropertySimple<string>;
    get onPeriodReachReturnMsg() {
        return this.__onPeriodReachReturnMsg.get();
    }
    set onPeriodReachReturnMsg(newValue: string) {
        this.__onPeriodReachReturnMsg.set(newValue);
    }
    private __bufferSize: ObservedPropertySimple<number>;
    get bufferSize() {
        return this.__bufferSize.get();
    }
    set bufferSize(newValue: number) {
        this.__bufferSize.set(newValue);
    }
    private __path: ObservedPropertySimple<string>;
    get path() {
        return this.__path.get();
    }
    set path(newValue: string) {
        this.__path.set(newValue);
    }
    private __markReachFrame: ObservedPropertySimple<number>;
    get markReachFrame() {
        return this.__markReachFrame.get();
    }
    set markReachFrame(newValue: number) {
        this.__markReachFrame.set(newValue);
    }
    private __periodReachFrame: ObservedPropertySimple<number>;
    get periodReachFrame() {
        return this.__periodReachFrame.get();
    }
    set periodReachFrame(newValue: number) {
        this.__periodReachFrame.set(newValue);
    }
    private audioManager;
    private audioStreamManager;
    aboutToAppear() {
        this.audioManager = audio.getAudioManager();
        this.audioStreamManager = this.audioManager.getStreamManager();
    }
    onMarkReach() {
        if (this.audioRenderer == null) {
            this.returnMsg = `audioRenderer instance had not created,dont‘t allow to onMarkReach `;
            return;
        }
        let _this = this;
        _this.onMarkReachReturnMsg = "markReach 已监听";
        _this.audioRenderer.on('markReach', _this.markReachFrame, (position) => {
            if (position == _this.markReachFrame) {
                _this.onMarkReachReturnMsg = `ON Triggered successfully markReachFrame:${_this.markReachFrame} `;
            }
        });
    }
    offMarkReach() {
        if (this.audioRenderer == null) {
            this.onMarkReachReturnMsg = `audioRenderer instance had not created,dont‘t allow to offMarkReach `;
            return;
        }
        this.audioRenderer.off('markReach');
        this.onMarkReachReturnMsg = "markReach 已取消监听";
    }
    onPeriodReach() {
        if (this.audioRenderer == null) {
            this.returnMsg = `AudioCapturer instance had not created,dont‘t allow to onPeriodReach `;
            return;
        }
        let _this = this;
        _this.onPeriodReachReturnMsg = "periodReach 已监听";
        _this.audioRenderer.on('periodReach', _this.periodReachFrame, (position) => {
            if (position == _this.periodReachFrame) {
                _this.onPeriodReachReturnMsg = `ON Triggered successfully periodReachFrame:${_this.periodReachFrame} `;
            }
        });
    }
    offPeriodReach() {
        if (this.audioRenderer == null) {
            this.returnMsg = `audioRenderer instance had not created,dont‘t allow to PeriodReach `;
            return;
        }
        this.audioRenderer.off('periodReach');
        this.onPeriodReachReturnMsg = "periodReach 已取消监听";
    }
    onStateChange() {
        if (this.audioRenderer == null) {
            this.returnMsg = `audioRenderer instance had not created,dont‘t allow to PeriodReach `;
            return;
        }
        let _this = this;
        _this.onReturnMsg = "stateChange 已监听";
        _this.audioRenderer.on('stateChange', (state) => {
            _this.onReturnMsg = `audio capturer state is: ${state}`;
        });
    }
    onAudioRendererChange() {
        let _this = this;
        _this.returnMsg = `onAudioRendererChange 注册成功\n`;
        this.audioStreamManager.on('audioRendererChange', (AudioRendererChangeInfoArray) => {
            _this.returnMsg = `AudioRendererChangeInfoArray : ${JSON.stringify(AudioRendererChangeInfoArray)}\n`;
        });
    }
    offAudioRendererChange() {
        let _this = this;
        this.audioStreamManager.off('audioRendererChange');
        _this.returnMsg = `off audioRendererChange success \n`;
    }
    createAudioRenderer() {
        if (this.audioRenderer !== null) {
            this.returnMsg = `audioRenderer Created already,don't create anymore`;
            return;
        }
        let _this = this;
        audio.createAudioRenderer(this.audioRendererOptions, async (err, data) => {
            if (err) {
                _this.returnMsg = `audioRenderer Created : Error: ${JSON.stringify(err)}`;
            }
            else {
                _this.audioRenderer = data;
                _this.returnMsg = `audioRenderer Created : SUCCESS,state:${_this.audioRenderer.state}\n`;
                _this.onReturnMsg = "无监听";
                _this.onPeriodReachReturnMsg = "无监听";
                _this.onMarkReachReturnMsg = "无监听";
            }
        });
    }
    rendererStart() {
        if (this.audioRenderer == null) {
            this.returnMsg = `audioRenderer instance had not created,dont‘t allow to start\n`;
            return;
        }
        let _this = this;
        this.audioRenderer.start((err) => {
            if (err) {
                _this.returnMsg = `audioRenderer start : Error: ${JSON.stringify(err)}\n`;
            }
            else {
                _this.returnMsg = `audioRenderer start : SUCCESS,state:${_this.audioRenderer.state}\n`;
            }
        });
    }
    getBufferSize() {
        if (this.audioRenderer == null) {
            this.returnMsg = `audioRenderer instance had not created,dont‘t allow to getBufferSize`;
            return;
        }
        let _this = this;
        _this.audioRenderer.getBufferSize((err, bufferSize) => {
            if (err) {
                _this.returnMsg = `audioRenderer getBufferSize : Error: ${JSON.stringify(err)}\n`;
            }
            else {
                _this.returnMsg = `audioRenderer getBufferSize : SUCCESS,bufferSize:${bufferSize},state:${_this.audioRenderer.state}\n`;
                _this.bufferSize = bufferSize;
            }
        });
    }
    async writeRenderer() {
        if (this.audioRenderer == null) {
            this.returnMsg += `audioRenderer instance had not created,dont‘t allow to read\n`;
            return;
        }
        if (this.bufferSize == 0) {
            this.bufferSize = await this.audioRenderer.getBufferSize();
        }
        let _this = this;
        let path = this.path;
        try {
            let stat = await fs.stat(path);
            let len = stat.size % this.bufferSize == 0 ? Math.floor(stat.size / this.bufferSize) : Math.floor(stat.size / this.bufferSize + 1);
            let file = await fs.open(path, 0o0);
            let buf = new ArrayBuffer(this.bufferSize);
            this.returnMsg = `audioRenderer write start.......... \n`;
            while (true) {
                for (let i = 0; i < len; i++) {
                    let options = {
                        offset: i * this.bufferSize,
                        length: this.bufferSize
                    };
                    let readsize = await fs.read(file.fd, buf, options);
                    let writeSize = await new Promise((resolve, reject) => {
                        this.audioRenderer.write(buf, (err, writeSize) => {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(writeSize);
                            }
                        });
                    });
                }
            }
            this.returnMsg += `audioRenderer write end. \n`;
            _this.returnMsg += `audioRenderer read end, state:${_this.audioRenderer.state}\n`;
        }
        catch (err) {
            this.returnMsg += `audioRenderer write : Error: ${JSON.stringify(err)}\n`;
        }
    }
    stopRenderer() {
        if (this.audioRenderer == null) {
            this.returnMsg = `audioRenderer instance had not created,dont‘t allow to stop\n`;
            return;
        }
        let _this = this;
        _this.audioRenderer.stop((err) => {
            if (err) {
                _this.returnMsg = `audioRenderer stop : Error: ${JSON.stringify(err)}\n`;
            }
            else {
                _this.returnMsg = `audioRenderer stop : SUCCESS,state:${_this.audioRenderer.state}\n`;
            }
        });
    }
    pauseRenderer() {
        if (this.audioRenderer == null) {
            this.returnMsg = `audioRenderer instance had not created,dont‘t allow to pause\n`;
            return;
        }
        let _this = this;
        _this.audioRenderer.pause((err) => {
            if (err) {
                _this.returnMsg = `audioRenderer pause : Error: ${JSON.stringify(err)}\n`;
            }
            else {
                _this.returnMsg = `audioRenderer pause : SUCCESS,state:${_this.audioRenderer.state}\n`;
            }
        });
    }
    releaseRenderer() {
        if (this.audioRenderer == null) {
            this.returnMsg = `audioRenderer instance had not created,dont‘t allow to release\n`;
            return;
        }
        let _this = this;
        _this.audioRenderer.release((err) => {
            if (err) {
                _this.returnMsg = `audioRenderer release : Error: ${JSON.stringify(err)}\n`;
            }
            else {
                _this.returnMsg = `audioRenderer release SUCCESS,state:${_this.audioRenderer.state}\n`;
                _this.audioRenderer = null;
            }
        });
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
        Text.create("【音频渲染-监听】返回数据：");
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
        Text.create("markReach");
        Text.fontSize(24);
        Text.pop();
        Row.create();
        Slider.create({
            value: this.markReachFrame,
            min: 0,
            max: 10000,
            step: 1000,
            style: SliderStyle.InSet
        });
        Slider.blockColor('#191970');
        Slider.trackColor('#ADD8E6');
        Slider.selectedColor('#4169E1');
        Slider.showTips(true);
        Slider.onChange((value: number, mode: SliderChangeMode) => {
            this.markReachFrame = value;
            console.info('value:' + value + 'mode:' + mode.toString());
        });
        Slider.width('80%');
        Text.create(this.markReachFrame.toFixed(0));
        Text.fontSize(24);
        Text.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceBetween);
        Button.createWithChild();
        Button.width('71%');
        Button.height(60);
        Button.onClick(() => this.onMarkReach());
        Text.create("on('markReach')");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('29%');
        Button.height(60);
        Button.onClick(() => this.offMarkReach());
        Text.create("off");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Text.create(this.onMarkReachReturnMsg);
        Text.fontSize(24);
        Text.pop();
        Text.create("periodReach");
        Text.fontSize(24);
        Text.margin({ top: 30 });
        Text.pop();
        Row.create();
        Slider.create({
            value: this.periodReachFrame,
            min: 0,
            max: 10000,
            step: 1000,
            style: SliderStyle.InSet
        });
        Slider.blockColor('#191970');
        Slider.trackColor('#ADD8E6');
        Slider.selectedColor('#4169E1');
        Slider.showTips(true);
        Slider.onChange((value: number, mode: SliderChangeMode) => {
            this.periodReachFrame = value;
            console.info('value:' + value + 'mode:' + mode.toString());
        });
        Slider.width('80%');
        Text.create(this.periodReachFrame.toFixed(0));
        Text.fontSize(24);
        Text.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceBetween);
        Button.createWithChild();
        Button.width('71%');
        Button.height(60);
        Button.onClick(() => this.onPeriodReach());
        Text.create("on('periodReach')");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('29%');
        Button.height(60);
        Button.onClick(() => this.offPeriodReach());
        Text.create("off");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Text.create(this.onPeriodReachReturnMsg);
        Text.fontSize(24);
        Text.pop();
        Row.create();
        Row.margin({ top: 30 });
        Row.width('100%');
        Button.createWithChild();
        Button.width('100%');
        Button.height(60);
        Button.onClick(() => {
            this.onStateChange();
        });
        Text.create("on('stateChange')");
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
        Button.onClick(() => {
            this.onAudioRendererChange();
        });
        Text.create("onAudioRendererChange");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.onClick(() => {
            this.offAudioRendererChange();
        });
        Text.create("offAudioRendererChange");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Row.width('100%');
        Button.createWithChild();
        Button.width('80%');
        Button.height(60);
        Button.backgroundColor(Color.Pink);
        Button.onClick(() => {
            this.createAudioRenderer();
        });
        Text.create("createAudioRenderer");
        Text.fontSize(22);
        Text.fontColor(Color.Blue);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('20%');
        Button.height(60);
        Button.backgroundColor(Color.Pink);
        Button.onClick(() => {
            this.rendererStart();
        });
        Text.create("start");
        Text.fontSize(22);
        Text.fontColor(Color.Blue);
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
        Button.backgroundColor(Color.Pink);
        Button.onClick(() => {
            this.writeRenderer();
        });
        Text.create("write");
        Text.fontSize(22);
        Text.fontColor(Color.Blue);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.backgroundColor(Color.Pink);
        Button.onClick(() => {
            this.pauseRenderer();
        });
        Text.create("pause");
        Text.fontSize(22);
        Text.fontColor(Color.Blue);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10, bottom: 10 });
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
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
}
loadDocument(new OnOff("1", undefined, {}));
