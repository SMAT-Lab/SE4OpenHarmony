interface SingleInstancePromise_Params {
    audioRendererOptions?;
    audioRenderer?;
    audioEffectMode?;
    audioManager?;
    audioStreamManager?;
    samplingRateList?;
    selectedSamplingRateKey?: string;
    channelsList?;
    selectedChannelKey?: string;
    sampleFormatList?;
    selectedsampleFormatKey?: string;
    encodingTypeList?;
    selectedEncodingTypeKey?: string;
    contentTypeList?;
    selectedContentTypeKey?: string;
    streamUsageList?;
    selectedStreamUsageKey?: string;
    AudioEffectModeList?;
    selectedAudioEffectModeKey?: string;
    returnMsg?: string;
    bufferSize?: number;
    isBlockingRead?: boolean;
    path?: string;
    isWrite?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SingleInstancePromise_" + ++__generate__Id;
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
class SingleInstancePromise extends View {
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
        this.audioEffectMode = null;
        this.audioManager = null;
        this.audioStreamManager = null;
        this.samplingRateList = [];
        this.__selectedSamplingRateKey = new ObservedPropertySimple("SAMPLE_RATE_44100", this, "selectedSamplingRateKey");
        this.channelsList = [];
        this.__selectedChannelKey = new ObservedPropertySimple("CHANNEL_2", this, "selectedChannelKey");
        this.sampleFormatList = [];
        this.__selectedsampleFormatKey = new ObservedPropertySimple("SAMPLE_FORMAT_S16LE", this, "selectedsampleFormatKey");
        this.encodingTypeList = [];
        this.__selectedEncodingTypeKey = new ObservedPropertySimple("ENCODING_TYPE_RAW", this, "selectedEncodingTypeKey");
        this.contentTypeList = [];
        this.__selectedContentTypeKey = new ObservedPropertySimple("CONTENT_TYPE_SPEECH", this, "selectedContentTypeKey");
        this.streamUsageList = [];
        this.__selectedStreamUsageKey = new ObservedPropertySimple("STREAM_USAGE_VOICE_COMMUNICATION", this, "selectedStreamUsageKey");
        this.AudioEffectModeList = [];
        this.__selectedAudioEffectModeKey = new ObservedPropertySimple("EFFECT_DEFAULT", this, "selectedAudioEffectModeKey");
        this.__returnMsg = new ObservedPropertySimple(`hello`, this, "returnMsg");
        this.__bufferSize = new ObservedPropertySimple(0, this, "bufferSize");
        this.__isBlockingRead = new ObservedPropertySimple(true, this, "isBlockingRead");
        this.__path = new ObservedPropertySimple(globalThis.pathDir + '/test_44100_2.wav', this, "path");
        this.__isWrite = new ObservedPropertySimple(false, this, "isWrite");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SingleInstancePromise_Params) {
        if (params.audioRendererOptions !== undefined) {
            this.audioRendererOptions = params.audioRendererOptions;
        }
        if (params.audioRenderer !== undefined) {
            this.audioRenderer = params.audioRenderer;
        }
        if (params.audioEffectMode !== undefined) {
            this.audioEffectMode = params.audioEffectMode;
        }
        if (params.audioManager !== undefined) {
            this.audioManager = params.audioManager;
        }
        if (params.audioStreamManager !== undefined) {
            this.audioStreamManager = params.audioStreamManager;
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
        if (params.contentTypeList !== undefined) {
            this.contentTypeList = params.contentTypeList;
        }
        if (params.selectedContentTypeKey !== undefined) {
            this.selectedContentTypeKey = params.selectedContentTypeKey;
        }
        if (params.streamUsageList !== undefined) {
            this.streamUsageList = params.streamUsageList;
        }
        if (params.selectedStreamUsageKey !== undefined) {
            this.selectedStreamUsageKey = params.selectedStreamUsageKey;
        }
        if (params.AudioEffectModeList !== undefined) {
            this.AudioEffectModeList = params.AudioEffectModeList;
        }
        if (params.selectedAudioEffectModeKey !== undefined) {
            this.selectedAudioEffectModeKey = params.selectedAudioEffectModeKey;
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
        if (params.isWrite !== undefined) {
            this.isWrite = params.isWrite;
        }
    }
    aboutToBeDeleted() {
        this.__selectedSamplingRateKey.aboutToBeDeleted();
        this.__selectedChannelKey.aboutToBeDeleted();
        this.__selectedsampleFormatKey.aboutToBeDeleted();
        this.__selectedEncodingTypeKey.aboutToBeDeleted();
        this.__selectedContentTypeKey.aboutToBeDeleted();
        this.__selectedStreamUsageKey.aboutToBeDeleted();
        this.__selectedAudioEffectModeKey.aboutToBeDeleted();
        this.__returnMsg.aboutToBeDeleted();
        this.__bufferSize.aboutToBeDeleted();
        this.__isBlockingRead.aboutToBeDeleted();
        this.__path.aboutToBeDeleted();
        this.__isWrite.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private audioRendererOptions;
    private audioRenderer;
    private audioEffectMode;
    private audioManager;
    private audioStreamManager;
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
    private contentTypeList;
    private __selectedContentTypeKey: ObservedPropertySimple<string>;
    get selectedContentTypeKey() {
        return this.__selectedContentTypeKey.get();
    }
    set selectedContentTypeKey(newValue: string) {
        this.__selectedContentTypeKey.set(newValue);
    }
    private streamUsageList;
    private __selectedStreamUsageKey: ObservedPropertySimple<string>;
    get selectedStreamUsageKey() {
        return this.__selectedStreamUsageKey.get();
    }
    set selectedStreamUsageKey(newValue: string) {
        this.__selectedStreamUsageKey.set(newValue);
    }
    private AudioEffectModeList;
    private __selectedAudioEffectModeKey: ObservedPropertySimple<string>;
    get selectedAudioEffectModeKey() {
        return this.__selectedAudioEffectModeKey.get();
    }
    set selectedAudioEffectModeKey(newValue: string) {
        this.__selectedAudioEffectModeKey.set(newValue);
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
    private __isWrite: ObservedPropertySimple<boolean>;
    get isWrite() {
        return this.__isWrite.get();
    }
    set isWrite(newValue: boolean) {
        this.__isWrite.set(newValue);
    }
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
        for (let key in audio.ContentType) {
            this.contentTypeList.push({ value: key });
        }
        for (let key in audio.StreamUsage) {
            this.streamUsageList.push({ value: key });
        }
        for (let key in audio.AudioEffectMode) {
            this.AudioEffectModeList.push({ value: key });
        }
        this.audioManager = audio.getAudioManager();
        this.audioStreamManager = this.audioManager.getStreamManager();
    }
    async onBackPress() {
        if (this.audioRenderer !== null) {
            await this.audioRenderer.release();
        }
    }
    createAudioRenderer() {
        if (this.audioRenderer !== null) {
            this.returnMsg = `audioRenderer Created already,don't create anymore`;
            return;
        }
        let _this = this;
        audio.createAudioRenderer(this.audioRendererOptions)
            .then(data => {
            _this.audioRenderer = data;
            _this.returnMsg = `audioRenderer Created : SUCCESS,state:${_this.audioRenderer.state}\n`;
        }).catch(err => {
            _this.returnMsg = `audioRenderer Created : Error: ${JSON.stringify(err)}`;
        });
    }
    onAudioRendererChange() {
        //    if (this.audioRenderer == null) {
        //      this.returnMsg = `audioRenderer instance had not created,dont‘t allow to start\n`
        //      return
        //    }
        let _this = this;
        _this.returnMsg = `onAudioRendererChange 注册成功\n`;
        this.audioStreamManager.on('audioRendererChange', (AudioRendererChangeInfoArray) => {
            _this.returnMsg = `AudioRendererChangeInfoArray : ${JSON.stringify(AudioRendererChangeInfoArray)}\n`;
        });
    }
    offAudioRendererChange() {
        //    if (this.audioRenderer == null) {
        //      this.returnMsg = `audioRenderer instance had not created,dont‘t allow to start\n`
        //      return
        //    }
        let _this = this;
        this.audioStreamManager.off('audioRendererChange');
        _this.returnMsg = `off audioRendererChange success \n`;
    }
    rendererStart() {
        if (this.audioRenderer == null) {
            this.returnMsg = `audioRenderer instance had not created,dont‘t allow to start\n`;
            return;
        }
        let _this = this;
        this.audioRenderer.start()
            .then(() => {
            _this.returnMsg = `audioRenderer start : SUCCESS,state:${_this.audioRenderer.state}\n`;
        }).catch(err => {
            _this.returnMsg = `audioRenderer start : Error: ${JSON.stringify(err)}\n`;
        });
    }
    getBufferSize() {
        if (this.audioRenderer == null) {
            this.returnMsg = `audioRenderer instance had not created,dont‘t allow to getBufferSize`;
            return;
        }
        let _this = this;
        _this.audioRenderer.getBufferSize()
            .then(bufferSize => {
            _this.returnMsg = `audioRenderer getBufferSize : SUCCESS,bufferSize:${bufferSize},state:${_this.audioRenderer.state}\n`;
            _this.bufferSize = bufferSize;
        }).catch(err => {
            _this.returnMsg = `audioRenderer getBufferSize : Error: ${JSON.stringify(err)}\n`;
        });
    }
    async writeRenderer() {
        if (this.audioRenderer == null) {
            this.returnMsg += `audioRenderer instance had not created,dont‘t allow to read\n`;
            return;
        }
        if (this.isWrite === true) {
            this.returnMsg += `不要重复点击write按钮 \n`;
            return;
        }
        this.isWrite = true;
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
                    let writeSize = await this.audioRenderer.write(buf);
                }
            }
            this.returnMsg += `audioRenderer write end. \n`;
            _this.returnMsg += `audioRenderer read end, state:${_this.audioRenderer.state}\n`;
        }
        catch (err) {
            this.returnMsg += `audioRenderer write : Error: ${JSON.stringify(err)}\n`;
        }
    }
    drainRenderer() {
        if (this.audioRenderer == null) {
            this.returnMsg = `audioRenderer instance had not created,dont‘t allow to drain\n`;
            return;
        }
        let _this = this;
        _this.audioRenderer.drain()
            .then(() => {
            _this.returnMsg = `audioRenderer drain : SUCCESS,state:${_this.audioRenderer.state}\n`;
        })
            .catch(err => {
            _this.returnMsg = `audioRenderer drain : Error: ${JSON.stringify(err)}\n`;
        });
    }
    stopRenderer() {
        if (this.audioRenderer == null) {
            this.returnMsg = `audioRenderer instance had not created,dont‘t allow to stop\n`;
            return;
        }
        let _this = this;
        _this.audioRenderer.stop()
            .then(() => {
            _this.returnMsg = `audioRenderer stop : SUCCESS,state:${_this.audioRenderer.state}\n`;
        })
            .catch(err => {
            _this.returnMsg = `audioRenderer stop : Error: ${JSON.stringify(err)}\n`;
        });
    }
    pauseRenderer() {
        if (this.audioRenderer == null) {
            this.returnMsg = `audioRenderer instance had not created,dont‘t allow to pause\n`;
            return;
        }
        let _this = this;
        _this.audioRenderer.pause()
            .then(() => {
            _this.returnMsg = `audioRenderer pause : SUCCESS,state:${_this.audioRenderer.state}\n`;
        })
            .catch(err => {
            _this.returnMsg = `audioRenderer pause : Error: ${JSON.stringify(err)}\n`;
        });
    }
    setAudioEffectMode() {
        if (this.audioRenderer == null) {
            this.returnMsg = `audioRenderer instance had not created,dont‘t allow to setAudioEffectMode\n`;
            return;
        }
        let _this = this;
        _this.audioRenderer.setAudioEffectMode(this.audioEffectMode).then(() => {
            _this.returnMsg = `audioRenderer setAudioEffectMode : SUCCESS,AudioEffectMode:${this.audioEffectMode}\n`;
        }).catch((err) => {
            _this.returnMsg = `audioRenderer setAudioEffectMode : Error: ${JSON.stringify(err)}\n`;
        });
    }
    getAudioEffectMode() {
        if (this.audioRenderer == null) {
            this.returnMsg = `audioRenderer instance had not created,dont‘t allow to setAudioEffectMode\n`;
            return;
        }
        let _this = this;
        _this.audioRenderer.getAudioEffectMode().then((effectmode) => {
            _this.returnMsg = `audioRenderer getAudioEffectMode : SUCCESS,AudioEffectMode:${effectmode}\n`;
        }).catch((err) => {
            _this.returnMsg = `audioRenderer getAudioEffectMode : Error: ${JSON.stringify(err)}\n`;
        });
    }
    releaseRenderer() {
        if (this.audioRenderer == null) {
            this.returnMsg = `audioRenderer instance had not created,dont‘t allow to release\n`;
            return;
        }
        let _this = this;
        _this.audioRenderer.release()
            .then(() => {
            _this.returnMsg = `audioRenderer release SUCCESS,state:${_this.audioRenderer.state}\n`;
            _this.audioRenderer = null;
            _this.isWrite = false;
        })
            .catch(err => {
            _this.returnMsg = `audioRenderer release : Error: ${JSON.stringify(err)}\n`;
        });
    }
    getCurrentAudioRendererInfoArray() {
        //    if (this.audioRenderer == null) {
        //      this.returnMsg += `audioRenderer instance had not created,dont‘t allow to getRendererInfo\n`
        //      return
        //    }
        let _this = this;
        this.audioStreamManager.getCurrentAudioRendererInfoArray(async (err, AudioRendererChangeInfoArray) => {
            console.info('getCurrentAudioRendererInfoArray **** Get Callback Called ****');
            if (err) {
                _this.returnMsg = `getCurrentAudioRendererInfoArray :ERROR: ${err}`;
            }
            else {
                if (AudioRendererChangeInfoArray != null) {
                    _this.returnMsg = `getCurrentAudioRendererInfoArray :SUCCESS: ${JSON.stringify(AudioRendererChangeInfoArray)}`;
                }
            }
        });
    }
    getRendererInfo() {
        if (this.audioRenderer == null) {
            this.returnMsg += `audioRenderer instance had not created,dont‘t allow to getRendererInfo\n`;
            return;
        }
        let _this = this;
        _this.audioRenderer.getRendererInfo()
            .then(rendererInfo => {
            _this.returnMsg = `audioRenderer getRendererInfo : Success: ${JSON.stringify(rendererInfo)}`;
        })
            .catch(err => {
            _this.returnMsg = `audioRenderer getRendererInfo : Error: ${JSON.stringify(err)}`;
        });
    }
    getStreamInfo() {
        if (this.audioRenderer == null) {
            this.returnMsg += `audioRenderer instance had not created,dont‘t allow to getStreamInfo\n`;
            return;
        }
        let _this = this;
        _this.audioRenderer.getStreamInfo()
            .then(streamInfo => {
            _this.returnMsg = `audioRenderer getStreamInfo : Success: ${JSON.stringify(streamInfo)}`;
        })
            .catch(err => {
            _this.returnMsg = `audioRenderer getStreamInfo : Error: ${JSON.stringify(err)}`;
        });
    }
    getAudioTime() {
        if (this.audioRenderer == null) {
            this.returnMsg += `audioRenderer instance had not created,dont‘t allow to getAudioTime\n`;
            return;
        }
        let _this = this;
        _this.audioRenderer.getAudioTime()
            .then(timestamp => {
            _this.returnMsg = `audioRenderer getAudioTime Current timestamp: ${JSON.stringify(timestamp)}`;
        })
            .catch(err => {
            _this.returnMsg = `audioRenderer getAudioTime : Error: ${JSON.stringify(err)}`;
        });
    }
    getAudioStreamId() {
        if (this.audioRenderer == null) {
            this.returnMsg += `audioRenderer instance had not created,dont‘t allow to getAudioStreamId\n`;
            return;
        }
        let _this = this;
        _this.audioRenderer.getAudioStreamId()
            .then(streamid => {
            _this.returnMsg = `audioRenderer GetStreamId: ${streamid}`;
        })
            .catch(err => {
            _this.returnMsg = `audioRenderer GetStreamId : Error: ${JSON.stringify(err)}`;
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
        Text.create("【音频渲染-单实例-Promise】返回数据：");
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
            this.audioRendererOptions.streamInfo.samplingRate = audio.AudioSamplingRate[value];
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
            this.audioRendererOptions.streamInfo.channels = audio.AudioChannel[value];
        });
        Select.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Select.create(this.sampleFormatList);
        Select.value(this.selectedsampleFormatKey);
        Select.onSelect((index, value) => {
            this.selectedsampleFormatKey = value;
            this.audioRendererOptions.streamInfo.sampleFormat = audio.AudioSampleFormat[value];
        });
        Select.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Select.create(this.encodingTypeList);
        Select.value(this.selectedEncodingTypeKey);
        Select.onSelect((index, value) => {
            this.selectedEncodingTypeKey = value;
            this.audioRendererOptions.streamInfo.encodingType = audio.AudioEncodingType[value];
        });
        Select.pop();
        Row.pop();
        Divider.create();
        Divider.strokeWidth(6);
        Divider.color(Color.Blue);
        Row.create();
        Row.margin({ top: 10 });
        Select.create(this.contentTypeList);
        Select.value(this.selectedContentTypeKey);
        Select.onSelect((index, value) => {
            this.selectedContentTypeKey = value;
            this.audioRendererOptions.rendererInfo.content = audio.ContentType[value];
        });
        Select.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Select.create(this.streamUsageList);
        Select.value(this.selectedStreamUsageKey);
        Select.onSelect((index, value) => {
            this.selectedStreamUsageKey = value;
            this.audioRendererOptions.rendererInfo.usage = audio.StreamUsage[value];
        });
        Select.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Select.create(this.AudioEffectModeList);
        Select.value(this.selectedAudioEffectModeKey);
        Select.onSelect((index, value) => {
            this.selectedAudioEffectModeKey = value;
            this.audioEffectMode = audio.AudioEffectMode[value];
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
            this.createAudioRenderer();
        });
        Text.create("createAudioRenderer callback");
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
        Row.justifyContent(FlexAlign.SpaceBetween);
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.onClick(() => {
            this.rendererStart();
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
        Row.margin({ top: 10 });
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceBetween);
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.onClick(() => {
            this.writeRenderer();
        });
        Text.create("write callback");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.onClick(() => {
            this.drainRenderer();
        });
        Text.create("drain callback");
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
            this.pauseRenderer();
        });
        Text.create("pause callback");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.onClick(() => this.stopRenderer());
        Text.create("stop callback");
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
            this.setAudioEffectMode();
        });
        Text.create("setAudioEffectMode callback");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.onClick(() => this.getAudioEffectMode());
        Text.create("getAudioEffectMode callback");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Row.width('100%');
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.onClick(() => this.releaseRenderer());
        Text.create("release callback");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.onClick(() => this.getCurrentAudioRendererInfoArray());
        Text.create("getCurrentAudioRendererInfoArray");
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
        Button.onClick(() => this.getRendererInfo());
        Text.create("getRendererInfo callback");
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
        Row.margin({ top: 10, bottom: 20 });
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
loadDocument(new SingleInstancePromise("1", undefined, {}));
