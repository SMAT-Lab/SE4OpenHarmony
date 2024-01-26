interface SingleInstanceCallback_Params {
    audioCapturerOptions?;
    audioCapturer?;
    audioRenderer?;
    samplingRateList?;
    selectedSamplingRateKey?: string;
    channelsList?;
    selectedChannelKey?: string;
    sampleFormatList?;
    selectedsampleFormatKey?: string;
    encodingTypeList?;
    selectedEncodingTypeKey?: string;
    sourceTypeList?;
    selectedSourceTypeKey?: string;
    returnMsg?: string;
    bufferSize?: number;
    isBlockingRead?: boolean;
    path?: string;
    audioManager?;
    audioStreamManager?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SingleInstanceCallback_" + ++__generate__Id;
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
class SingleInstanceCallback extends View {
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
        this.audioRenderer = null;
        this.samplingRateList = [];
        this.__selectedSamplingRateKey = new ObservedPropertySimple("SAMPLE_RATE_44100", this, "selectedSamplingRateKey");
        this.channelsList = [];
        this.__selectedChannelKey = new ObservedPropertySimple("CHANNEL_2", this, "selectedChannelKey");
        this.sampleFormatList = [];
        this.__selectedsampleFormatKey = new ObservedPropertySimple("SAMPLE_FORMAT_S16LE", this, "selectedsampleFormatKey");
        this.encodingTypeList = [];
        this.__selectedEncodingTypeKey = new ObservedPropertySimple("ENCODING_TYPE_RAW", this, "selectedEncodingTypeKey");
        this.sourceTypeList = [];
        this.__selectedSourceTypeKey = new ObservedPropertySimple("SOURCE_TYPE_MIC", this, "selectedSourceTypeKey");
        this.__returnMsg = new ObservedPropertySimple(`hello`, this, "returnMsg");
        this.__bufferSize = new ObservedPropertySimple(0, this, "bufferSize");
        this.__isBlockingRead = new ObservedPropertySimple(true, this, "isBlockingRead");
        this.__path = new ObservedPropertySimple("", this, "path");
        this.audioManager = null;
        this.audioStreamManager = null;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SingleInstanceCallback_Params) {
        if (params.audioCapturerOptions !== undefined) {
            this.audioCapturerOptions = params.audioCapturerOptions;
        }
        if (params.audioCapturer !== undefined) {
            this.audioCapturer = params.audioCapturer;
        }
        if (params.audioRenderer !== undefined) {
            this.audioRenderer = params.audioRenderer;
        }
        if (params.samplingRateList !== undefined) {
            this.samplingRateList = params.samplingRateList;
        }
        if (params.selectedSamplingRateKey !== undefined) {
            this.selectedSamplingRateKey = params.selectedSamplingRateKey;
        }
        if (params.channelsList !== undefined) {
            this.channelsList = params.channelsList;
        }
        if (params.selectedChannelKey !== undefined) {
            this.selectedChannelKey = params.selectedChannelKey;
        }
        if (params.sampleFormatList !== undefined) {
            this.sampleFormatList = params.sampleFormatList;
        }
        if (params.selectedsampleFormatKey !== undefined) {
            this.selectedsampleFormatKey = params.selectedsampleFormatKey;
        }
        if (params.encodingTypeList !== undefined) {
            this.encodingTypeList = params.encodingTypeList;
        }
        if (params.selectedEncodingTypeKey !== undefined) {
            this.selectedEncodingTypeKey = params.selectedEncodingTypeKey;
        }
        if (params.sourceTypeList !== undefined) {
            this.sourceTypeList = params.sourceTypeList;
        }
        if (params.selectedSourceTypeKey !== undefined) {
            this.selectedSourceTypeKey = params.selectedSourceTypeKey;
        }
        if (params.returnMsg !== undefined) {
            this.returnMsg = params.returnMsg;
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
        if (params.audioManager !== undefined) {
            this.audioManager = params.audioManager;
        }
        if (params.audioStreamManager !== undefined) {
            this.audioStreamManager = params.audioStreamManager;
        }
    }
    aboutToBeDeleted() {
        this.__selectedSamplingRateKey.aboutToBeDeleted();
        this.__selectedChannelKey.aboutToBeDeleted();
        this.__selectedsampleFormatKey.aboutToBeDeleted();
        this.__selectedEncodingTypeKey.aboutToBeDeleted();
        this.__selectedSourceTypeKey.aboutToBeDeleted();
        this.__returnMsg.aboutToBeDeleted();
        this.__bufferSize.aboutToBeDeleted();
        this.__isBlockingRead.aboutToBeDeleted();
        this.__path.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private audioCapturerOptions;
    private audioCapturer;
    private audioRenderer;
    private samplingRateList;
    private __selectedSamplingRateKey: ObservedPropertySimple<string>;
    get selectedSamplingRateKey() {
        return this.__selectedSamplingRateKey.get();
    }
    set selectedSamplingRateKey(newValue: string) {
        this.__selectedSamplingRateKey.set(newValue);
    }
    private channelsList;
    private __selectedChannelKey: ObservedPropertySimple<string>;
    get selectedChannelKey() {
        return this.__selectedChannelKey.get();
    }
    set selectedChannelKey(newValue: string) {
        this.__selectedChannelKey.set(newValue);
    }
    private sampleFormatList;
    private __selectedsampleFormatKey: ObservedPropertySimple<string>;
    get selectedsampleFormatKey() {
        return this.__selectedsampleFormatKey.get();
    }
    set selectedsampleFormatKey(newValue: string) {
        this.__selectedsampleFormatKey.set(newValue);
    }
    private encodingTypeList;
    private __selectedEncodingTypeKey: ObservedPropertySimple<string>;
    get selectedEncodingTypeKey() {
        return this.__selectedEncodingTypeKey.get();
    }
    set selectedEncodingTypeKey(newValue: string) {
        this.__selectedEncodingTypeKey.set(newValue);
    }
    private sourceTypeList;
    private __selectedSourceTypeKey: ObservedPropertySimple<string>;
    get selectedSourceTypeKey() {
        return this.__selectedSourceTypeKey.get();
    }
    set selectedSourceTypeKey(newValue: string) {
        this.__selectedSourceTypeKey.set(newValue);
    }
    private __returnMsg: ObservedPropertySimple<string>;
    get returnMsg() {
        return this.__returnMsg.get();
    }
    set returnMsg(newValue: string) {
        this.__returnMsg.set(newValue);
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
    private audioManager;
    private audioStreamManager;
    aboutToAppear() {
        for (let key in audio.AudioSamplingRate) {
            this.samplingRateList.push({ value: key });
        }
        for (let key in audio.AudioChannel) {
            this.channelsList.push({ value: key });
        }
        for (let key in audio.AudioSampleFormat) {
            this.sampleFormatList.push({ value: key });
        }
        for (let key in audio.AudioEncodingType) {
            this.encodingTypeList.push({ value: key });
        }
        for (let key in audio.SourceType) {
            this.sourceTypeList.push({ value: key });
        }
        this.audioManager = audio.getAudioManager();
        this.audioStreamManager = this.audioManager.getStreamManager();
    }
    createAudioCapturer() {
        if (this.audioCapturer !== null) {
            this.returnMsg += `AudioCapturer Created already,don't create anymore`;
            return;
        }
        let _this = this;
        audio.createAudioCapturer(this.audioCapturerOptions, async (err, data) => {
            if (err) {
                _this.returnMsg += `AudioCapturer Created : Error: ${JSON.stringify(err)}`;
            }
            else {
                _this.audioCapturer = data;
                _this.returnMsg = `采集器参数：\n 采样率：${this.selectedSamplingRateKey}\n 声道：${this.selectedChannelKey}\n 采样格式：${this.selectedsampleFormatKey}\n 编码格式：${this.selectedEncodingTypeKey}\n 音源类型：${this.selectedSourceTypeKey}\n`;
                _this.returnMsg += `AudioCapturer Created : SUCCESS,state:${_this.audioCapturer.state}\n`;
            }
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
    getCurrentAudioCapturerInfoArray() {
        let _this = this;
        this.audioStreamManager.getCurrentAudioCapturerInfoArray(async (err, AudioCapturerChangeInfoArray) => {
            console.info('getCurrentAudioCapturerInfoArray **** Get Callback Called ****');
            if (err) {
                _this.returnMsg = `getCurrentAudioCapturerInfoArray :ERROR: ${err}`;
            }
            else {
                if (AudioCapturerChangeInfoArray != null) {
                    _this.returnMsg = `getCurrentAudioCapturerInfoArray :Success: ${JSON.stringify(AudioCapturerChangeInfoArray)}`;
                }
            }
        });
    }
    capturerStart() {
        if (this.audioCapturer == null) {
            this.returnMsg += `AudioCapturer instance had not created,dont‘t allow to start\n`;
            return;
        }
        let _this = this;
        this.audioCapturer.start((err) => {
            if (err) {
                _this.returnMsg += `AudioCapturer start : Error: ${JSON.stringify(err)}\n`;
            }
            else {
                _this.returnMsg += `AudioCapturer start : SUCCESS,state:${_this.audioCapturer.state}\n`;
            }
        });
    }
    getBufferSize() {
        if (this.audioCapturer == null) {
            this.returnMsg += `AudioCapturer instance had not created,dont‘t allow to getBufferSize`;
            return;
        }
        let _this = this;
        _this.audioCapturer.getBufferSize((err, bufferSize) => {
            if (err) {
                _this.returnMsg += `AudioCapturer getBufferSize : Error: ${JSON.stringify(err)}\n`;
            }
            else {
                _this.returnMsg += `AudioCapturer getBufferSize : SUCCESS,bufferSize:${bufferSize},state:${_this.audioCapturer.state}\n`;
                _this.bufferSize = bufferSize;
            }
        });
    }
    async readCapturer() {
        if (this.audioCapturer == null) {
            this.returnMsg += `AudioCapturer instance had not created,dont‘t allow to read\n`;
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
                console.log('options::::' + JSON.stringify(options));
                let writeLen = await fs.write(file.fd, buffer, options);
                console.log('fs.write writeLen:' + writeLen);
                index++;
            }
            catch (err) {
                _this.returnMsg += `AudioCapturer read : Error: ${JSON.stringify(err)}\n`;
            }
            end = new Date().getTime();
        }
        _this.returnMsg += `AudioCapturer read end, state:${_this.audioCapturer.state}\n`;
    }
    stopCapturer() {
        if (this.audioCapturer == null) {
            this.returnMsg += `AudioCapturer instance had not created,dont‘t allow to stop\n`;
            return;
        }
        let _this = this;
        _this.audioCapturer.stop((err) => {
            if (err) {
                _this.returnMsg += `AudioCapturer stop : Error: ${JSON.stringify(err)}\n`;
            }
            else {
                _this.returnMsg += `AudioCapturer stop : SUCCESS,state:${_this.audioCapturer.state}\n`;
            }
        });
    }
    releaseCapturer() {
        if (this.audioCapturer == null) {
            this.returnMsg += `AudioCapturer instance had not created,dont‘t allow to release\n`;
            return;
        }
        let _this = this;
        _this.audioCapturer.release((err) => {
            if (err) {
                _this.returnMsg += `AudioCapturer release : Error: ${JSON.stringify(err)}\n`;
            }
            else {
                _this.returnMsg += `AudioCapturer release SUCCESS,state:${_this.audioCapturer.state}\n`;
                _this.audioCapturer = null;
            }
        });
    }
    async renderPlay() {
        if (this.path == "") {
            this.returnMsg += `AudioCapturer 尚未录音\n`;
            return;
        }
        let audioRendererOptions = {
            streamInfo: this.audioCapturerOptions.streamInfo,
            rendererInfo: {
                content: audio.ContentType.CONTENT_TYPE_RINGTONE,
                usage: audio.StreamUsage.STREAM_USAGE_MEDIA,
                rendererFlags: 0
            }
        };
        this.returnMsg = `audioRendererOptions ${JSON.stringify(audioRendererOptions)} \n`;
        try {
            this.audioRenderer = await audio.createAudioRenderer(audioRendererOptions);
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
            for (let i = 0; i < len; i++) {
                let options = {
                    offset: i * bufferSize,
                    length: bufferSize
                };
                let readsize = await fs.read(file.fd, buf, options);
                let writeSize = await this.audioRenderer.write(buf);
            }
            this.returnMsg += `audioRenderer write end. \n`;
        }
        catch (err) {
            this.returnMsg += `audioRenderer write : Error: ${JSON.stringify(err)}\n`;
        }
        await this.audioRenderer.release();
    }
    getCapturerInfo() {
        if (this.audioCapturer == null) {
            this.returnMsg += `AudioCapturer instance had not created,dont‘t allow to getCapturerInfo\n`;
            return;
        }
        let _this = this;
        _this.audioCapturer.getCapturerInfo((err, capturerInfo) => {
            if (err) {
                _this.returnMsg = `AudioCapturer getCapturerInfo : Error: ${JSON.stringify(err)}`;
            }
            else {
                _this.returnMsg = `AudioCapturer getCapturerInfo : Success: ${JSON.stringify(capturerInfo)}`;
            }
        });
    }
    getStreamInfo() {
        if (this.audioCapturer == null) {
            this.returnMsg += `AudioCapturer instance had not created,dont‘t allow to getStreamInfo\n`;
            return;
        }
        let _this = this;
        _this.audioCapturer.getStreamInfo((err, streamInfo) => {
            if (err) {
                _this.returnMsg = `AudioCapturer getStreamInfo : Error: ${JSON.stringify(err)}`;
            }
            else {
                _this.returnMsg = `AudioCapturer getStreamInfo : Success: ${JSON.stringify(streamInfo)}`;
            }
        });
    }
    getAudioTime() {
        if (this.audioCapturer == null) {
            this.returnMsg += `AudioCapturer instance had not created,dont‘t allow to getAudioTime\n`;
            return;
        }
        let _this = this;
        _this.audioCapturer.getAudioTime((err, timestamp) => {
            if (err) {
                _this.returnMsg = `AudioCapturer getAudioTime : Error: ${JSON.stringify(err)}`;
            }
            else {
                _this.returnMsg = `AudioCapturer getAudioTime Current timestamp: ${JSON.stringify(timestamp)}`;
            }
        });
    }
    getAudioStreamId() {
        if (this.audioCapturer == null) {
            this.returnMsg += `AudioCapturer instance had not created,dont‘t allow to getAudioStreamId\n`;
            return;
        }
        let _this = this;
        _this.audioCapturer.getAudioStreamId((err, streamid) => {
            if (err) {
                _this.returnMsg = `AudioCapturer GetStreamId : Error: ${JSON.stringify(err)}`;
            }
            else {
                _this.returnMsg = `audioCapturer GetStreamId: ${streamid}`;
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
        Column.height(300);
        Column.backgroundColor(Color.Orange);
        Column.position({ x: '1%' });
        Text.create("【音频录制-单实例-callback】返回数据：");
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
        Scroll.margin({ top: 310 });
        Scroll.width('100%');
        Column.create();
        Column.width('100%');
        Row.create();
        Row.margin({ top: 0 });
        Select.create(this.samplingRateList);
        Select.value(this.selectedSamplingRateKey);
        Select.onSelect((index, value) => {
            this.selectedSamplingRateKey = value;
            this.audioCapturerOptions.streamInfo.samplingRate = audio.AudioSamplingRate[value];
        });
        Select.font({ size: 22 });
        Select.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Select.create(this.channelsList);
        Select.value(this.selectedChannelKey);
        Select.onSelect((index, value) => {
            this.selectedChannelKey = value;
            this.audioCapturerOptions.streamInfo.channels = audio.AudioChannel[value];
        });
        Select.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Select.create(this.sampleFormatList);
        Select.value(this.selectedsampleFormatKey);
        Select.onSelect((index, value) => {
            this.selectedsampleFormatKey = value;
            this.audioCapturerOptions.streamInfo.sampleFormat = audio.AudioSampleFormat[value];
        });
        Select.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Select.create(this.encodingTypeList);
        Select.value(this.selectedEncodingTypeKey);
        Select.onSelect((index, value) => {
            this.selectedEncodingTypeKey = value;
            this.audioCapturerOptions.streamInfo.encodingType = audio.AudioEncodingType[value];
        });
        Select.pop();
        Row.pop();
        Divider.create();
        Divider.strokeWidth(6);
        Divider.color(Color.Blue);
        Row.create();
        Row.margin({ top: 10 });
        Select.create(this.sourceTypeList);
        Select.value(this.selectedSourceTypeKey);
        Select.onSelect((index, value) => {
            this.selectedSourceTypeKey = value;
            this.audioCapturerOptions.capturerInfo.source = audio.SourceType[value];
        });
        Select.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Row.width('100%');
        Button.createWithChild();
        Button.width('100%');
        Button.height(60);
        Button.onClick(() => {
            this.createAudioCapturer();
        });
        Text.create("createAudioCapturer callback");
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
        Row.create();
        Row.margin({ top: 10 });
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceBetween);
        Button.createWithChild();
        Button.width('100%');
        Button.height(60);
        Button.onClick(() => {
            this.getCurrentAudioCapturerInfoArray();
        });
        Text.create("getCurrentAudioCapturerInfoArray CALLBACK");
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
            this.capturerStart();
        });
        Text.create("start callback");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.onClick(() => {
            this.getBufferSize();
        });
        Text.create("getBufferSize callback");
        Text.fontSize(22);
        Text.fontColor(Color.White);
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
        Button.onClick(() => {
            this.readCapturer();
        });
        Text.create("read callback");
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
        Button.onClick(() => this.stopCapturer());
        Text.create("stop callback");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.onClick(() => this.releaseCapturer());
        Text.create("release callback");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10, bottom: 10 });
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceBetween);
        Button.createWithChild();
        Button.width('100%');
        Button.height(60);
        Button.onClick(() => this.renderPlay());
        Button.backgroundColor(Color.Pink);
        Text.create("播放录音数据");
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
        Button.onClick(() => this.getCapturerInfo());
        Text.create("getCapturerInfo callback");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.onClick(() => this.getStreamInfo());
        Text.create("getStreamInfo callback");
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
        Button.onClick(() => this.getAudioStreamId());
        Text.create("getAudioStreamId callback");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.onClick(() => this.getAudioTime());
        Text.create("getAudioTime callback");
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
loadDocument(new SingleInstanceCallback("1", undefined, {}));
