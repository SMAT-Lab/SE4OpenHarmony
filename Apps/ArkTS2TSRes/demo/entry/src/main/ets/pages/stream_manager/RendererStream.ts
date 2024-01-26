interface RendererStream_Params {
    renderIndex?: number;
    returnMsg?: string;
    volumeTypeSelectList?;
    contentTypeSelectList?;
    streamUsageSelectList?;
    selectedVolumeType?: number;
    audioStreamManager?;
    onReturnMsg?: string;
    selectedVolumeTypeKey?: string;
    selectedContentTypeKey?: string;
    selectedStreamUsageKey?: string;
    audioRenderer?;
    audioRendererOptions?;
    streamMap?;
    volumeMap?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "RendererStream_" + ++__generate__Id;
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
class RendererStream extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__renderIndex = new ObservedPropertySimple(0, this, "renderIndex");
        this.__returnMsg = new ObservedPropertySimple('Hello World', this, "returnMsg");
        this.volumeTypeSelectList = [];
        this.contentTypeSelectList = [];
        this.streamUsageSelectList = [];
        this.__selectedVolumeType = new ObservedPropertySimple(0, this, "selectedVolumeType");
        this.audioStreamManager = audio.getAudioManager().getStreamManager();
        this.__onReturnMsg = new ObservedPropertySimple("", this, "onReturnMsg");
        this.__selectedVolumeTypeKey = new ObservedPropertySimple("", this, "selectedVolumeTypeKey");
        this.__selectedContentTypeKey = new ObservedPropertySimple("CONTENT_TYPE_MUSIC", this, "selectedContentTypeKey");
        this.__selectedStreamUsageKey = new ObservedPropertySimple("STREAM_USAGE_MEDIA", this, "selectedStreamUsageKey");
        this.audioRenderer = null;
        this.audioRendererOptions = {
            streamInfo: {
                samplingRate: audio.AudioSamplingRate.SAMPLE_RATE_44100,
                channels: audio.AudioChannel.CHANNEL_2,
                sampleFormat: audio.AudioSampleFormat.SAMPLE_FORMAT_S16LE,
                encodingType: audio.AudioEncodingType.ENCODING_TYPE_RAW
            },
            rendererInfo: {
                content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
                usage: audio.StreamUsage.STREAM_USAGE_VOICE_COMMUNICATION,
                rendererFlags: 0
            }
        };
        this.streamMap = {
            'CONTENT_TYPE_UNKNOWN@STREAM_USAGE_UNKNOWN': 'STREAM_MUSIC',
            'CONTENT_TYPE_UNKNOWN@STREAM_USAGE_MEDIA': 'STREAM_MUSIC',
            'CONTENT_TYPE_UNKNOWN@STREAM_USAGE_VOICE_COMMUNICATION': 'STREAM_MUSIC',
            'CONTENT_TYPE_UNKNOWN@STREAM_USAGE_VOICE_ASSISTANT': 'STREAM_MUSIC',
            'CONTENT_TYPE_UNKNOWN@STREAM_USAGE_NOTIFICATION_RINGTONE': 'STREAM_MUSIC',
            'CONTENT_TYPE_SPEECH@STREAM_USAGE_UNKNOWN': 'STREAM_MUSIC',
            'CONTENT_TYPE_SPEECH@STREAM_USAGE_MEDIA': 'STREAM_VOICE_ASSISTANT',
            'CONTENT_TYPE_SPEECH@STREAM_USAGE_VOICE_COMMUNICATION': 'STREAM_VOICE_CALL',
            'CONTENT_TYPE_SPEECH@STREAM_USAGE_VOICE_ASSISTANT': 'STREAM_VOICE_ASSISTANT',
            'CONTENT_TYPE_SPEECH@STREAM_USAGE_NOTIFICATION_RINGTONE': 'STREAM_MUSIC',
            'CONTENT_TYPE_MUSIC@STREAM_USAGE_UNKNOWN': 'STREAM_MUSIC',
            'CONTENT_TYPE_MUSIC@STREAM_USAGE_MEDIA': 'STREAM_MUSIC',
            'CONTENT_TYPE_MUSIC@STREAM_USAGE_VOICE_COMMUNICATION': 'STREAM_MUSIC',
            'CONTENT_TYPE_MUSIC@STREAM_USAGE_VOICE_ASSISTANT': 'STREAM_VOICE_ASSISTANT',
            'CONTENT_TYPE_MUSIC@STREAM_USAGE_NOTIFICATION_RINGTONE': 'STREAM_RING',
            'CONTENT_TYPE_MOVIE@STREAM_USAGE_UNKNOWN': 'STREAM_MEDIA',
            'CONTENT_TYPE_MOVIE@STREAM_USAGE_MEDIA': 'STREAM_MEDIA',
            'CONTENT_TYPE_MOVIE@STREAM_USAGE_VOICE_COMMUNICATION': 'STREAM_MUSIC',
            'CONTENT_TYPE_MOVIE@STREAM_USAGE_VOICE_ASSISTANT': 'STREAM_MUSIC',
            'CONTENT_TYPE_MOVIE@STREAM_USAGE_NOTIFICATION_RINGTONE': 'STREAM_MUSIC',
            'CONTENT_TYPE_SONIFICATION@STREAM_USAGE_UNKNOWN': 'STREAM_NOTIFICATION',
            'CONTENT_TYPE_SONIFICATION@STREAM_USAGE_MEDIA': 'STREAM_NOTIFICATION',
            'CONTENT_TYPE_SONIFICATION@STREAM_USAGE_VOICE_COMMUNICATION': 'STREAM_MUSIC',
            'CONTENT_TYPE_SONIFICATION@STREAM_USAGE_VOICE_ASSISTANT': 'STREAM_MUSIC',
            'CONTENT_TYPE_SONIFICATION@STREAM_USAGE_NOTIFICATION_RINGTONE': 'STREAM_MUSIC',
            'CONTENT_TYPE_RINGTONE@STREAM_USAGE_UNKNOWN': 'STREAM_RING',
            'CONTENT_TYPE_RINGTONE@STREAM_USAGE_MEDIA': 'STREAM_RING',
            'CONTENT_TYPE_RINGTONE@STREAM_USAGE_VOICE_COMMUNICATION': 'STREAM_MUSIC',
            'CONTENT_TYPE_RINGTONE@STREAM_USAGE_VOICE_ASSISTANT': 'STREAM_MUSIC',
            'CONTENT_TYPE_RINGTONE@STREAM_USAGE_NOTIFICATION_RINGTONE': 'STREAM_RING',
            'CONTENT_TYPE_ULTRASONIC@STREAM_USAGE_SYSTEM': 'STREAM_ULTRASONIC',
            'CONTENT_TYPE_SPEECH@STREAM_USAGE_ACCESSIBILITY': 'STREAM_ACCESSIBILITY',
            'CONTENT_TYPE_MUSIC@STREAM_USAGE_ALARM': 'STREAM_ALARM',
        };
        this.volumeMap = {
            'STREAM_RING': 'RINGTONE',
            'STREAM_MUSIC': 'MEDIA',
            'STREAM_VOICE_CALL': 'VOICE_CALL',
            'STREAM_VOICE_ASSISTANT': 'VOICE_ASSISTANT',
            'STREAM_ALL': 'ALL',
            'STREAM_ALARM ': 'ALARM',
            'STREAM_ACCESSIBILITY': 'ACCESSIBILITY',
            'STREAM_ULTRASONIC': 'ULTRASONIC',
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: RendererStream_Params) {
        if (params.renderIndex !== undefined) {
            this.renderIndex = params.renderIndex;
        }
        if (params.returnMsg !== undefined) {
            this.returnMsg = params.returnMsg;
        }
        if (params.volumeTypeSelectList !== undefined) {
            this.volumeTypeSelectList = params.volumeTypeSelectList;
        }
        if (params.contentTypeSelectList !== undefined) {
            this.contentTypeSelectList = params.contentTypeSelectList;
        }
        if (params.streamUsageSelectList !== undefined) {
            this.streamUsageSelectList = params.streamUsageSelectList;
        }
        if (params.selectedVolumeType !== undefined) {
            this.selectedVolumeType = params.selectedVolumeType;
        }
        if (params.audioStreamManager !== undefined) {
            this.audioStreamManager = params.audioStreamManager;
        }
        if (params.onReturnMsg !== undefined) {
            this.onReturnMsg = params.onReturnMsg;
        }
        if (params.selectedVolumeTypeKey !== undefined) {
            this.selectedVolumeTypeKey = params.selectedVolumeTypeKey;
        }
        if (params.selectedContentTypeKey !== undefined) {
            this.selectedContentTypeKey = params.selectedContentTypeKey;
        }
        if (params.selectedStreamUsageKey !== undefined) {
            this.selectedStreamUsageKey = params.selectedStreamUsageKey;
        }
        if (params.audioRenderer !== undefined) {
            this.audioRenderer = params.audioRenderer;
        }
        if (params.audioRendererOptions !== undefined) {
            this.audioRendererOptions = params.audioRendererOptions;
        }
        if (params.streamMap !== undefined) {
            this.streamMap = params.streamMap;
        }
        if (params.volumeMap !== undefined) {
            this.volumeMap = params.volumeMap;
        }
    }
    aboutToBeDeleted() {
        this.__renderIndex.aboutToBeDeleted();
        this.__returnMsg.aboutToBeDeleted();
        this.__selectedVolumeType.aboutToBeDeleted();
        this.__onReturnMsg.aboutToBeDeleted();
        this.__selectedVolumeTypeKey.aboutToBeDeleted();
        this.__selectedContentTypeKey.aboutToBeDeleted();
        this.__selectedStreamUsageKey.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __renderIndex: ObservedPropertySimple<number>;
    get renderIndex() {
        return this.__renderIndex.get();
    }
    set renderIndex(newValue: number) {
        this.__renderIndex.set(newValue);
    }
    private __returnMsg: ObservedPropertySimple<string>;
    get returnMsg() {
        return this.__returnMsg.get();
    }
    set returnMsg(newValue: string) {
        this.__returnMsg.set(newValue);
    }
    private volumeTypeSelectList;
    private contentTypeSelectList;
    private streamUsageSelectList;
    private __selectedVolumeType: ObservedPropertySimple<number>;
    get selectedVolumeType() {
        return this.__selectedVolumeType.get();
    }
    set selectedVolumeType(newValue: number) {
        this.__selectedVolumeType.set(newValue);
    }
    private audioStreamManager;
    private __onReturnMsg: ObservedPropertySimple<string>;
    get onReturnMsg() {
        return this.__onReturnMsg.get();
    }
    set onReturnMsg(newValue: string) {
        this.__onReturnMsg.set(newValue);
    }
    private __selectedVolumeTypeKey: ObservedPropertySimple<string>;
    get selectedVolumeTypeKey() {
        return this.__selectedVolumeTypeKey.get();
    }
    set selectedVolumeTypeKey(newValue: string) {
        this.__selectedVolumeTypeKey.set(newValue);
    }
    private __selectedContentTypeKey: ObservedPropertySimple<string>;
    get selectedContentTypeKey() {
        return this.__selectedContentTypeKey.get();
    }
    set selectedContentTypeKey(newValue: string) {
        this.__selectedContentTypeKey.set(newValue);
    }
    private __selectedStreamUsageKey: ObservedPropertySimple<string>;
    get selectedStreamUsageKey() {
        return this.__selectedStreamUsageKey.get();
    }
    set selectedStreamUsageKey(newValue: string) {
        this.__selectedStreamUsageKey.set(newValue);
    }
    private audioRenderer;
    private audioRendererOptions;
    //content_type@stream_usage:stream_type
    private streamMap;
    getVolumeType(contentType, streamUsage) {
        let streamType = this.streamMap[contentType + '@' + streamUsage];
        this.selectedVolumeTypeKey = this.volumeMap[streamType];
        if (!this.selectedVolumeTypeKey) {
            this.selectedVolumeTypeKey = this.volumeMap['STREAM_MUSIC'];
        }
    }
    //stream_type:volume_type
    private volumeMap;
    aboutToAppear() {
        for (let key in audio.AudioVolumeType) {
            this.volumeTypeSelectList.push({ value: key });
        }
        for (let key in audio.ContentType) {
            if (key === "CONTENT_TYPE_SONIFICATION") {
                continue;
            }
            this.contentTypeSelectList.push({ value: key });
        }
        for (let key in audio.StreamUsage) {
            this.streamUsageSelectList.push({ value: key });
        }
        this.getVolumeType(this.selectedContentTypeKey, this.selectedStreamUsageKey);
    }
    getInfoArray(AudioRendererChangeInfoArray) {
        if (AudioRendererChangeInfoArray.length > 0) {
            console.log(JSON.stringify(AudioRendererChangeInfoArray));
            let str = ``;
            for (let i = 0; i < AudioRendererChangeInfoArray.length; i++) {
                let Info = AudioRendererChangeInfoArray[i];
                str += `第${i}条\nStreamId:${Info.streamId},ClientUid:${Info.clientUid},Source:${Info.rendererInfo.source},Flag:${Info.rendererInfo.rendererFlags},State:${Info.rendererState}\n`;
                for (let j = 0; j < Info.deviceDescriptors.length; j++) {
                    let descriptor = Info.deviceDescriptors[j];
                    str += `__deviceDescriptors_${j}\n`;
                    str += `Id:${descriptor.id},Type:${descriptor.deviceType},Role:${descriptor.deviceRole},Name:${descriptor.name},Address:${descriptor.address},SampleRates:${descriptor.sampleRates[0]},ChannelCounts:${descriptor.channelCounts[0]},ChannelMask:${descriptor.channelMasks},EncodingType:${descriptor.encodingType}\n`;
                }
            }
            return str;
        }
        return "没有数据";
    }
    render() {
        Column.create();
        Column.height('100%');
        Column.width('100%');
        Column.height('100%');
        Column.width('100%');
        Row.create();
        Row.width('100%');
        Row.zIndex(999);
        Column.create();
        Column.width('98%');
        Column.height(200);
        Column.backgroundColor(Color.Orange);
        Column.position({ x: '1%' });
        Text.create("【渲染流管理】返回数据：");
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
        Scroll.width('100%');
        Column.create();
        Column.width('100%');
        Column.margin({ top: 210 });
        Button.createWithChild();
        Button.width('100%');
        Button.height(60);
        Button.onClick(() => {
            let _this = this;
            this.audioStreamManager.getCurrentAudioRendererInfoArray(async (err, AudioRendererChangeInfoArray) => {
                console.info('getCurrentAudioRendererInfoArray **** Get Callback Called ****');
                if (err) {
                    _this.returnMsg = "getCurrentAudioRendererInfoArray :ERROR:" + JSON.stringify(err);
                }
                else {
                    _this.returnMsg = _this.getInfoArray(AudioRendererChangeInfoArray);
                }
            });
        });
        Text.create("getCurrentAudioRendererInfoArray callback");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('100%');
        Button.height(60);
        Button.margin({ top: 10 });
        Button.onClick(() => {
            let _this = this;
            this.audioStreamManager.getCurrentAudioRendererInfoArray()
                .then((AudioRendererChangeInfoArray) => {
                _this.returnMsg = _this.getInfoArray(AudioRendererChangeInfoArray);
            }).catch((err) => {
                _this.returnMsg = "getCurrentAudioRendererInfoArray :ERROR:" + JSON.stringify(err);
            });
        });
        Text.create("getCurrentAudioRendererInfoArray promise");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Row.create();
        Row.width('100%');
        Button.createWithChild();
        Button.width('80%');
        Button.height(60);
        Button.margin({ top: 10 });
        Button.onClick(() => {
            let _this = this;
            this.audioStreamManager.on('audioRendererChange', (AudioRendererChangeInfoArray) => {
                _this.onReturnMsg = '\n收到回调啦\n' + _this.getInfoArray(AudioRendererChangeInfoArray);
            });
        });
        Text.create("on('audioRendererChange')");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('20%');
        Button.height(60);
        Button.margin({ top: 10 });
        Button.onClick(() => {
            let _this = this;
            this.audioStreamManager.off('audioRendererChange');
            _this.onReturnMsg = '监听已取消\n';
        });
        Text.create("off");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.width('100%');
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.margin({ top: 10 });
        Button.onClick(() => {
            let _this = this;
            this.audioStreamManager.getAudioEffectInfoArray(audio.StreamUsage[this.selectedStreamUsageKey], async (err, audioEffectInfoArray) => {
                if (err) {
                    _this.returnMsg = '\n收到回调啦\n' + `getAudioEffectInfoArray :ERROR: ${err}`;
                    return;
                }
                else {
                    _this.returnMsg = '\n收到回调啦\n' + `The effect modes are: ${audioEffectInfoArray}`;
                }
            });
        });
        Text.create("getAudioEffectInfoArray callback");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.margin({ top: 10 });
        Button.onClick(() => {
            let _this = this;
            this.audioStreamManager.getAudioEffectInfoArray(audio.StreamUsage[this.selectedStreamUsageKey]).then((audioEffectInfoArray) => {
                _this.returnMsg = '\n收到回调啦\n' + `The effect modes are: ${audioEffectInfoArray}`;
            }).catch((err) => {
                _this.returnMsg = '\n收到回调啦\n' + `getAudioEffectInfoArray :ERROR: ${err}`;
                return;
            });
        });
        Text.create("getAudioEffectInfoArray promise");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.width('100%');
        Text.create(this.onReturnMsg);
        Text.fontSize(14);
        Text.pop();
        Row.pop();
        Row.create();
        Row.width('100%');
        Select.create(this.contentTypeSelectList);
        Select.value(this.selectedContentTypeKey);
        Select.onSelect(async (index, value) => {
            this.selectedContentTypeKey = value;
            this.getVolumeType(this.selectedContentTypeKey, this.selectedStreamUsageKey);
        });
        Select.pop();
        Row.pop();
        Row.create();
        Row.width('100%');
        Select.create(this.streamUsageSelectList);
        Select.value(this.selectedStreamUsageKey);
        Select.onSelect(async (index, value) => {
            this.selectedStreamUsageKey = value;
            this.getVolumeType(this.selectedContentTypeKey, this.selectedStreamUsageKey);
        });
        Select.pop();
        Row.pop();
        Row.create();
        Row.width('100%');
        Text.create("音频流类型");
        Text.fontSize(20);
        Text.margin({ left: 10 });
        Text.pop();
        Text.create(this.selectedVolumeTypeKey);
        Text.fontSize(20);
        Text.margin({ left: 10 });
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Row.pop();
        Row.create();
        Button.createWithChild();
        Button.width('50%');
        Button.height(60);
        Button.margin({ top: 10 });
        Button.onClick(() => {
            let _this = this;
            this.audioStreamManager.isActive(audio.AudioVolumeType[this.selectedVolumeTypeKey], (err, value) => {
                if (err) {
                    _this.returnMsg = "isActive callback ERROR:" + JSON.stringify(err);
                    return;
                }
                _this.returnMsg = "isActive callback SUCCESS 返回值：" + value;
            });
        });
        Text.create("isActive callback");
        Text.fontSize(18);
        Text.fontColor(Color.White);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('50%');
        Button.height(60);
        Button.margin({ top: 10 });
        Button.onClick(() => {
            let _this = this;
            this.audioStreamManager.isActive(audio.AudioVolumeType[this.selectedVolumeTypeKey]).then(value => {
                _this.returnMsg = "isActive promise SUCCESS 返回值：" + value;
            }).catch(err => {
                _this.returnMsg = "isActive promise ERROR:" + JSON.stringify(err);
            });
        });
        Text.create("isActive promise");
        Text.fontSize(18);
        Text.fontColor(Color.White);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.height(40);
        Row.margin({ top: 10 });
        Button.createWithLabel("createAudioRenderer");
        Button.fontSize(20);
        Button.height(40);
        Button.backgroundColor(Color.Pink);
        Button.fontColor(Color.Blue);
        Button.onClick(() => {
            if (this.renderIndex > 0) {
                this.returnMsg += "AudioRenderer Created already,please don't create it again ";
                return;
            }
            let _this = this;
            this.audioRendererOptions.rendererInfo.content = audio.ContentType[this.selectedContentTypeKey];
            this.audioRendererOptions.rendererInfo.usage = audio.StreamUsage[this.selectedStreamUsageKey];
            _this.returnMsg = "AudioRenderer audioRendererOptions:" + JSON.stringify(this.audioRendererOptions);
            audio.createAudioRenderer(this.audioRendererOptions, (err, data) => {
                if (err) {
                    _this.returnMsg += "AudioRenderer Created Error:" + JSON.stringify(err);
                }
                else {
                    _this.returnMsg += `AudioRenderer Created: Success: SUCCESS,返回值：${JSON.stringify(data)}`;
                    _this.audioRenderer = data;
                    _this.renderIndex++;
                }
            });
        });
        Button.pop();
        Button.createWithLabel("start");
        Button.fontSize(20);
        Button.height(40);
        Button.backgroundColor(Color.Pink);
        Button.fontColor(Color.Blue);
        Button.onClick(async () => {
            try {
                await this.audioRenderer.start();
                this.returnMsg += `AudioRenderer Start Success\n`;
            }
            catch (err) {
                this.returnMsg += `AudioRenderer Start Error:${JSON.stringify(err)}`;
            }
        });
        Button.pop();
        Row.pop();
        Row.create();
        Row.height(40);
        Row.margin({ top: 10 });
        Button.createWithLabel("write");
        Button.fontSize(20);
        Button.height(40);
        Button.backgroundColor(Color.Pink);
        Button.fontColor(Color.Blue);
        Button.onClick(async () => {
            try {
                let bufferSize = await this.audioRenderer.getBufferSize();
                this.returnMsg += `bufferSize:${bufferSize}\n`;
                let path = globalThis.pathDir + '/test_44100_2.wav';
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
                this.returnMsg += `AudioRenderer write Error:${JSON.stringify(err)}`;
            }
        });
        Button.pop();
        Button.createWithLabel("pause");
        Button.fontSize(20);
        Button.height(40);
        Button.backgroundColor(Color.Pink);
        Button.fontColor(Color.Blue);
        Button.onClick(async () => {
            try {
                await this.audioRenderer.pause();
                this.returnMsg += `audioRenderer pause Success \n`;
            }
            catch (err) {
                this.returnMsg += `AudioRenderer Pause Error:${JSON.stringify(err)}`;
            }
        });
        Button.pop();
        Row.pop();
        Row.create();
        Row.height(40);
        Row.margin({ top: 10 });
        Button.createWithLabel("stop");
        Button.fontSize(20);
        Button.height(40);
        Button.backgroundColor(Color.Pink);
        Button.fontColor(Color.Blue);
        Button.onClick(async () => {
            try {
                await this.audioRenderer.stop();
                this.returnMsg += `audioRenderer stop Success \n`;
            }
            catch (err) {
                this.returnMsg += `AudioRenderer Stop Error:${JSON.stringify(err)}`;
            }
        });
        Button.pop();
        Button.createWithLabel("release");
        Button.fontSize(20);
        Button.height(40);
        Button.backgroundColor(Color.Pink);
        Button.fontColor(Color.Blue);
        Button.onClick(async () => {
            try {
                await this.audioRenderer.release();
                this.returnMsg += `audioRenderer release Success \n`;
                this.renderIndex = 0;
            }
            catch (err) {
                this.returnMsg += `AudioRenderer release Error:${JSON.stringify(err)}`;
            }
        });
        Button.pop();
        Row.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
}
loadDocument(new RendererStream("1", undefined, {}));
