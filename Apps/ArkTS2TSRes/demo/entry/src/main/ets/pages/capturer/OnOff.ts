interface OnOff_Params {
    audioCapturerOptions?;
    audioCapturer?;
    returnMsg?: string;
    onReturnMsg?: string;
    onMarkReachReturnMsg?: string;
    onPeriodReachReturnMsg?: string;
    bufferSize?: number;
    isBlockingRead?: boolean;
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
        this.audioCapturerOptions = {
            streamInfo: {
                samplingRate: audio.AudioSamplingRate.SAMPLE_RATE_44100,
                channels: audio.AudioChannel.CHANNEL_2,
                sampleFormat: audio.AudioSampleFormat.SAMPLE_FORMAT_S16LE,
                encodingType: audio.AudioEncodingType.ENCODING_TYPE_RAW
            },
            capturerInfo: {
                source: audio.SourceType.SOURCE_TYPE_MIC,
                capturerFlags: 0
            }
        };
        this.audioCapturer = null;
        this.__returnMsg = new ObservedPropertySimple(`hello`, this, "returnMsg");
        this.__onReturnMsg = new ObservedPropertySimple(`hello`, this, "onReturnMsg");
        this.__onMarkReachReturnMsg = new ObservedPropertySimple(`hello`, this, "onMarkReachReturnMsg");
        this.__onPeriodReachReturnMsg = new ObservedPropertySimple(`hello`, this, "onPeriodReachReturnMsg");
        this.__bufferSize = new ObservedPropertySimple(0, this, "bufferSize");
        this.__isBlockingRead = new ObservedPropertySimple(true, this, "isBlockingRead");
        this.__path = new ObservedPropertySimple("", this, "path");
        this.__markReachFrame = new ObservedPropertySimple(1000, this, "markReachFrame");
        this.__periodReachFrame = new ObservedPropertySimple(1000, this, "periodReachFrame");
        this.audioManager = null;
        this.audioStreamManager = null;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: OnOff_Params) {
        if (params.audioCapturerOptions !== undefined) {
            this.audioCapturerOptions = params.audioCapturerOptions;
        }
        if (params.audioCapturer !== undefined) {
            this.audioCapturer = params.audioCapturer;
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
        if (params.isBlockingRead !== undefined) {
            this.isBlockingRead = params.isBlockingRead;
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
        this.__isBlockingRead.aboutToBeDeleted();
        this.__path.aboutToBeDeleted();
        this.__markReachFrame.aboutToBeDeleted();
        this.__periodReachFrame.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private audioCapturerOptions;
    private audioCapturer;
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
    private __isBlockingRead: ObservedPropertySimple<boolean>;
    get isBlockingRead() {
        return this.__isBlockingRead.get();
    }
    set isBlockingRead(newValue: boolean) {
        this.__isBlockingRead.set(newValue);
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
        if (this.audioCapturer == null) {
            this.returnMsg = `AudioCapturer instance had not created,dont‘t allow to onMarkReach `;
            return;
        }
        let _this = this;
        _this.onMarkReachReturnMsg = "markReach 已监听";
        _this.audioCapturer.on('markReach', _this.markReachFrame, (position) => {
            if (position == _this.markReachFrame) {
                _this.onMarkReachReturnMsg = `ON Triggered successfully markReachFrame:${_this.markReachFrame} `;
            }
        });
    }
    offMarkReach() {
        if (this.audioCapturer == null) {
            this.onMarkReachReturnMsg = `AudioCapturer instance had not created,dont‘t allow to offMarkReach `;
            return;
        }
        this.audioCapturer.off('markReach');
        this.onMarkReachReturnMsg = "markReach 已取消监听";
    }
    onPeriodReach() {
        if (this.audioCapturer == null) {
            this.returnMsg = `AudioCapturer instance had not created,dont‘t allow to onPeriodReach `;
            return;
        }
        let _this = this;
        _this.onPeriodReachReturnMsg = "periodReach 已监听";
        _this.audioCapturer.on('periodReach', _this.periodReachFrame, (position) => {
            if (position == _this.periodReachFrame) {
                _this.onPeriodReachReturnMsg = `ON Triggered successfully periodReachFrame:${_this.periodReachFrame} `;
            }
        });
    }
    offPeriodReach() {
        if (this.audioCapturer == null) {
            this.returnMsg = `AudioCapturer instance had not created,dont‘t allow to PeriodReach `;
            return;
        }
        this.audioCapturer.off('periodReach');
        this.onPeriodReachReturnMsg = "periodReach 已取消监听";
    }
    onStateChange() {
        if (this.audioCapturer == null) {
            this.returnMsg = `AudioCapturer instance had not created,dont‘t allow to PeriodReach `;
            return;
        }
        let _this = this;
        _this.onReturnMsg = "stateChange 已监听";
        _this.audioCapturer.on('stateChange', (state) => {
            _this.onReturnMsg = `audio capturer state is: ${state}`;
        });
    }
    onAudioCapturerChange() {
        let _this = this;
        _this.returnMsg = `onAudioCapturerChange 注册成功\n`;
        this.audioStreamManager.on('audioCapturerChange', (AudioCapturerChangeInfoArray) => {
            _this.returnMsg += `AudioCapturerChangeInfoArray :${JSON.stringify(AudioCapturerChangeInfoArray)}\n`;
        });
    }
    offAudioCapturerChange() {
        let _this = this;
        this.audioStreamManager.off('audioCapturerChange');
        _this.returnMsg = `取消AudioCapturerChange监听 成功\n`;
    }
    createAudioCapturer() {
        if (this.audioCapturer !== null) {
            this.returnMsg = `AudioCapturer Created already,don't create anymore`;
            return;
        }
        let _this = this;
        audio.createAudioCapturer(this.audioCapturerOptions, async (err, data) => {
            if (err) {
                _this.returnMsg = `AudioCapturer Created : Error: ${JSON.stringify(err)}`;
            }
            else {
                _this.audioCapturer = data;
                _this.returnMsg = `AudioCapturer Created : SUCCESS,state:${_this.audioCapturer.state}\n`;
                _this.onReturnMsg = "无监听";
                _this.onPeriodReachReturnMsg = "无监听";
                _this.onMarkReachReturnMsg = "无监听";
            }
        });
    }
    capturerStart() {
        if (this.audioCapturer == null) {
            this.returnMsg = `AudioCapturer instance had not created,dont‘t allow to start\n`;
            return;
        }
        let _this = this;
        this.audioCapturer.start((err) => {
            if (err) {
                _this.returnMsg = `AudioCapturer start : Error: ${JSON.stringify(err)}\n`;
            }
            else {
                _this.returnMsg = `AudioCapturer start : SUCCESS,state:${_this.audioCapturer.state}\n`;
            }
        });
    }
    async readCapturer() {
        if (this.audioCapturer == null) {
            this.returnMsg = `AudioCapturer instance had not created,dont‘t allow to read\n`;
            return;
        }
        if (this.bufferSize == 0) {
            this.bufferSize = await this.audioCapturer.getBufferSize();
        }
        let _this = this;
        //READ 5S
        let start = new Date().getTime();
        let end = new Date().getTime();
        let buffer = null;
        _this.returnMsg += `AudioCapturer read start.....\n `;
        let path = globalThis.pathDir + `/test_capturer_${new Date().getTime()}_${this.audioCapturerOptions.streamInfo.samplingRate}_${this.audioCapturerOptions.streamInfo.channels}.pcm`;
        _this.path = path;
        try {
            await fs.open(path, 0o100);
            this.returnMsg += "文件创建成功，";
        }
        catch (err) {
            this.returnMsg += `文件创建失败 err：${JSON.stringify(err)}`;
            return;
        }
        let file;
        try {
            file = await fs.open(path, 0o2);
            this.returnMsg += "文件以读写模式打开成功";
        }
        catch (err) {
            this.returnMsg += `文件以读写模式打开失败 err：${JSON.stringify(err)}`;
            return;
        }
        this.returnMsg += `fd:${file.fd}\n`;
        let index = 0;
        while (end - start <= 5000) {
            try {
                buffer = await new Promise((resolve, reject) => {
                    _this.audioCapturer.read(_this.bufferSize, _this.isBlockingRead, async (err, buffer) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(buffer);
                        }
                    });
                });
                let options = {
                    offset: index * _this.bufferSize,
                    length: _this.bufferSize
                };
                let writeLen = await fs.write(file.fd, buffer, options);
                index++;
            }
            catch (err) {
                _this.returnMsg = `AudioCapturer read : Error: ${JSON.stringify(err)}\n`;
            }
            end = new Date().getTime();
        }
        _this.returnMsg = `AudioCapturer read end, state:${_this.audioCapturer.state}\n`;
    }
    stopCapturer() {
        if (this.audioCapturer == null) {
            this.returnMsg = `AudioCapturer instance had not created,dont‘t allow to stop\n`;
            return;
        }
        let _this = this;
        _this.audioCapturer.stop((err) => {
            if (err) {
                _this.returnMsg = `AudioCapturer stop : Error: ${JSON.stringify(err)}\n`;
            }
            else {
                _this.returnMsg = `AudioCapturer stop : SUCCESS,state:${_this.audioCapturer.state}\n`;
            }
        });
    }
    releaseCapturer() {
        if (this.audioCapturer == null) {
            this.returnMsg = `AudioCapturer instance had not created,dont‘t allow to release\n`;
            return;
        }
        let _this = this;
        _this.audioCapturer.release((err) => {
            if (err) {
                _this.returnMsg = `AudioCapturer release : Error: ${JSON.stringify(err)}\n`;
            }
            else {
                _this.returnMsg = `AudioCapturer release SUCCESS,state:${_this.audioCapturer.state}\n`;
                _this.audioCapturer = null;
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
        Text.create("【音频录制-监听】返回数据：");
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
            this.onAudioCapturerChange();
        });
        Text.create("onAudioCapturerChange");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.onClick(() => {
            this.offAudioCapturerChange();
        });
        Text.create("offAudioCapturerChange");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Text.create(this.onReturnMsg);
        Text.fontSize(24);
        Text.pop();
        Row.create();
        Row.margin({ top: 10 });
        Row.width('100%');
        Button.createWithChild();
        Button.width('80%');
        Button.height(60);
        Button.backgroundColor(Color.Pink);
        Button.onClick(() => {
            this.createAudioCapturer();
        });
        Text.create("createAudioCapturer");
        Text.fontSize(22);
        Text.fontColor(Color.Blue);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('20%');
        Button.height(60);
        Button.backgroundColor(Color.Pink);
        Button.onClick(() => {
            this.capturerStart();
        });
        Text.create("start");
        Text.fontSize(22);
        Text.fontColor(Color.Blue);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Radio.create({ value: 'isBlockingRead1', group: "isBlockingReadGroup" });
        Radio.onChange((isChecked) => {
            if (isChecked) {
                this.isBlockingRead = true;
            }
            else {
                this.isBlockingRead = false;
            }
        });
        Radio.checked(this.isBlockingRead == true);
        Text.create("阻塞");
        Text.fontSize(18);
        Text.pop();
        Radio.create({ value: 'isBlockingRead2', group: "isBlockingReadGroup" });
        Radio.onChange((isChecked) => {
            if (isChecked) {
                this.isBlockingRead = false;
            }
            else {
                this.isBlockingRead = true;
            }
        });
        Radio.checked(this.isBlockingRead == false);
        Text.create("不阻塞");
        Text.fontSize(18);
        Text.pop();
        Row.pop();
        Row.create();
        Text.create("是否阻塞读操作：" + this.isBlockingRead);
        Text.fontSize(24);
        Text.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Row.width('100%');
        Button.createWithChild();
        Button.width('100%');
        Button.height(60);
        Button.backgroundColor(Color.Pink);
        Button.onClick(() => {
            this.readCapturer();
        });
        Text.create("read");
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
        Button.onClick(() => this.stopCapturer());
        Text.create("stop");
        Text.fontSize(22);
        Text.fontColor(Color.Blue);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.backgroundColor(Color.Pink);
        Button.onClick(() => this.releaseCapturer());
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
