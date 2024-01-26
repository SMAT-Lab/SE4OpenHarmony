interface GetStreamVolume_Params {
    audioRendererOptions?;
    audioRenderer?;
    returnMsg?: string;
    volume?: number;
    rate?: number;
    minVolume?: number;
    maxVolume?: number;
    streamTypeSelectList?;
    selectedVolumeTypeKey?: string;
    selectedContentTypeKey?: string;
    selectedStreamUsageKey?: string;
    path?: string;
    renderInfo?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "GetStreamVolume_" + ++__generate__Id;
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
class GetStreamVolume extends View {
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
        this.__volume = new ObservedPropertySimple(0, this, "volume");
        this.__rate = new ObservedPropertySimple(0, this, "rate");
        this.__minVolume = new ObservedPropertySimple(0, this, "minVolume");
        this.__maxVolume = new ObservedPropertySimple(0, this, "maxVolume");
        this.streamTypeSelectList = [];
        this.__selectedVolumeTypeKey = new ObservedPropertySimple("请选择", this, "selectedVolumeTypeKey");
        this.__selectedContentTypeKey = new ObservedPropertySimple("CONTENT_TYPE_MUSIC", this, "selectedContentTypeKey");
        this.__selectedStreamUsageKey = new ObservedPropertySimple("STREAM_USAGE_MEDIA", this, "selectedStreamUsageKey");
        this.__path = new ObservedPropertySimple(globalThis.pathDir + '/test_44100_2.wav', this, "path");
        this.renderInfo = {
            'RINGTONE': {
                main: {
                    content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
                    usage: audio.StreamUsage.STREAM_USAGE_RINGTONE,
                    rendererFlags: 0
                },
                info: {
                    selectedContentTypeKey: 'CONTENT_TYPE_UNKNOWN',
                    selectedStreamUsageKey: 'STREAM_USAGE_RINGTONE'
                }
            },
            'MEDIA': {
                main: {
                    content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
                    usage: audio.StreamUsage.STREAM_USAGE_MEDIA,
                    rendererFlags: 0
                },
                info: {
                    selectedContentTypeKey: 'CONTENT_TYPE_UNKNOWN',
                    selectedStreamUsageKey: 'STREAM_USAGE_MEDIA'
                }
            },
            'VOICE_CALL': {
                main: {
                    content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
                    usage: audio.StreamUsage.STREAM_USAGE_VOICE_COMMUNICATION,
                    rendererFlags: 0
                },
                info: {
                    selectedContentTypeKey: 'CONTENT_TYPE_UNKNOWN',
                    selectedStreamUsageKey: 'STREAM_USAGE_VOICE_COMMUNICATION'
                }
            },
            'VOICE_ASSISTANT': {
                main: {
                    content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
                    usage: audio.StreamUsage.STREAM_USAGE_VOICE_ASSISTANT,
                    rendererFlags: 0
                },
                info: {
                    selectedContentTypeKey: 'CONTENT_TYPE_UNKNOWN',
                    selectedStreamUsageKey: 'STREAM_USAGE_VOICE_ASSISTANT'
                }
            },
            'ALL': {
                main: {
                    content: audio.ContentType.CONTENT_TYPE_SPEECH,
                    usage: audio.StreamUsage.STREAM_USAGE_MEDIA,
                    rendererFlags: 0
                },
                info: {
                    selectedContentTypeKey: 'CONTENT_TYPE_SPEECH',
                    selectedStreamUsageKey: 'STREAM_USAGE_MEDIA'
                }
            },
            'ALARM': {
                main: {
                    content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
                    usage: audio.StreamUsage.STREAM_USAGE_ALARM,
                    rendererFlags: 0
                },
                info: {
                    selectedContentTypeKey: 'CONTENT_TYPE_UNKNOWN',
                    selectedStreamUsageKey: 'STREAM_USAGE_ALARM'
                }
            },
            'ACCESSIBILITY': {
                main: {
                    content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
                    usage: audio.StreamUsage.STREAM_USAGE_ACCESSIBILITY,
                    rendererFlags: 0
                },
                info: {
                    selectedContentTypeKey: 'CONTENT_TYPE_UNKNOWN',
                    selectedStreamUsageKey: 'STREAM_USAGE_ACCESSIBILITY'
                }
            },
            'ULTRASONIC': {
                main: {
                    content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
                    usage: audio.StreamUsage.STREAM_USAGE_ULTRASONIC,
                    rendererFlags: 0
                },
                info: {
                    selectedContentTypeKey: 'CONTENT_TYPE_UNKNOWN',
                    selectedStreamUsageKey: 'STREAM_USAGE_ULTRASONIC'
                }
            },
            '_MUSIC': {
                main: {
                    content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
                    usage: audio.StreamUsage.STREAM_USAGE_MUSIC,
                    rendererFlags: 0
                },
                info: {
                    selectedContentTypeKey: 'CONTENT_TYPE_UNKNOWN',
                    selectedStreamUsageKey: 'STREAM_USAGE_MUSIC'
                }
            },
            '_MESSAGE': {
                main: {
                    content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
                    usage: audio.StreamUsage.STREAM_USAGE_VOICE_MESSAGE,
                    rendererFlags: 0
                },
                info: {
                    selectedContentTypeKey: 'CONTENT_TYPE_UNKNOWN',
                    selectedStreamUsageKey: 'STREAM_USAGE_VOICE_MESSAGE'
                }
            },
            '_NOTIFICATION': {
                main: {
                    content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
                    usage: audio.StreamUsage.STREAM_USAGE_NOTIFICATION,
                    rendererFlags: 0
                },
                info: {
                    selectedContentTypeKey: 'CONTENT_TYPE_UNKNOWN',
                    selectedStreamUsageKey: 'STREAM_USAGE_NOTIFICATION'
                }
            },
            '_SYSTEM': {
                main: {
                    content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
                    usage: audio.StreamUsage.STREAM_USAGE_SYSTEM,
                    rendererFlags: 0
                },
                info: {
                    selectedContentTypeKey: 'CONTENT_TYPE_UNKNOWN',
                    selectedStreamUsageKey: 'STREAM_USAGE_SYSTEM'
                }
            },
            '_MOVIE': {
                main: {
                    content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
                    usage: audio.StreamUsage.STREAM_USAGE_MOVIE,
                    rendererFlags: 0
                },
                info: {
                    selectedContentTypeKey: 'CONTENT_TYPE_UNKNOWN',
                    selectedStreamUsageKey: 'STREAM_USAGE_MOVIE'
                }
            },
            '_UNKNOWN': {
                main: {
                    content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
                    usage: audio.StreamUsage.STREAM_USAGE_UNKNOWN,
                    rendererFlags: 0
                },
                info: {
                    selectedContentTypeKey: 'CONTENT_TYPE_UNKNOWN',
                    selectedStreamUsageKey: 'STREAM_USAGE_UNKNOWN'
                }
            },
            '_GAME': {
                main: {
                    content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
                    usage: audio.StreamUsage.STREAM_USAGE_GAME,
                    rendererFlags: 0
                },
                info: {
                    selectedContentTypeKey: 'CONTENT_TYPE_UNKNOWN',
                    selectedStreamUsageKey: 'STREAM_USAGE_GAME'
                }
            },
            '_AUDIOBOOK': {
                main: {
                    content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
                    usage: audio.StreamUsage.STREAM_USAGE_AUDIOBOOK,
                    rendererFlags: 0
                },
                info: {
                    selectedContentTypeKey: 'CONTENT_TYPE_UNKNOWN',
                    selectedStreamUsageKey: 'STREAM_USAGE_AUDIOBOOK'
                }
            },
            '_NAVIGATION': {
                main: {
                    content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
                    usage: audio.StreamUsage.STREAM_USAGE_NAVIGATION,
                    rendererFlags: 0
                },
                info: {
                    selectedContentTypeKey: 'CONTENT_TYPE_UNKNOWN',
                    selectedStreamUsageKey: 'STREAM_USAGE_NAVIGATION'
                }
            },
            '_DTMF': {
                main: {
                    content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
                    usage: audio.StreamUsage.STREAM_USAGE_DTMF,
                    rendererFlags: 0
                },
                info: {
                    selectedContentTypeKey: 'CONTENT_TYPE_UNKNOWN',
                    selectedStreamUsageKey: 'STREAM_USAGE_DTMF'
                }
            },
            '_ENFORCED_TONE': {
                main: {
                    content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
                    usage: audio.StreamUsage.STREAM_USAGE_ENFORCED_TONE,
                    rendererFlags: 0
                },
                info: {
                    selectedContentTypeKey: 'CONTENT_TYPE_UNKNOWN',
                    selectedStreamUsageKey: 'STREAM_USAGE_ENFORCED_TONE'
                }
            }
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: GetStreamVolume_Params) {
        if (params.audioRendererOptions !== undefined) {
            this.audioRendererOptions = params.audioRendererOptions;
        }
        if (params.audioRenderer !== undefined) {
            this.audioRenderer = params.audioRenderer;
        }
        if (params.returnMsg !== undefined) {
            this.returnMsg = params.returnMsg;
        }
        if (params.volume !== undefined) {
            this.volume = params.volume;
        }
        if (params.rate !== undefined) {
            this.rate = params.rate;
        }
        if (params.minVolume !== undefined) {
            this.minVolume = params.minVolume;
        }
        if (params.maxVolume !== undefined) {
            this.maxVolume = params.maxVolume;
        }
        if (params.streamTypeSelectList !== undefined) {
            this.streamTypeSelectList = params.streamTypeSelectList;
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
        if (params.path !== undefined) {
            this.path = params.path;
        }
        if (params.renderInfo !== undefined) {
            this.renderInfo = params.renderInfo;
        }
    }
    aboutToBeDeleted() {
        this.__returnMsg.aboutToBeDeleted();
        this.__volume.aboutToBeDeleted();
        this.__rate.aboutToBeDeleted();
        this.__minVolume.aboutToBeDeleted();
        this.__maxVolume.aboutToBeDeleted();
        this.__selectedVolumeTypeKey.aboutToBeDeleted();
        this.__selectedContentTypeKey.aboutToBeDeleted();
        this.__selectedStreamUsageKey.aboutToBeDeleted();
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
    private __minVolume: ObservedPropertySimple<number>;
    get minVolume() {
        return this.__minVolume.get();
    }
    set minVolume(newValue: number) {
        this.__minVolume.set(newValue);
    }
    private __maxVolume: ObservedPropertySimple<number>;
    get maxVolume() {
        return this.__maxVolume.get();
    }
    set maxVolume(newValue: number) {
        this.__maxVolume.set(newValue);
    }
    private streamTypeSelectList;
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
    private __path: ObservedPropertySimple<string>;
    get path() {
        return this.__path.get();
    }
    set path(newValue: string) {
        this.__path.set(newValue);
    }
    private renderInfo;
    async aboutToAppear() {
        for (let key in audio.AudioVolumeType) {
            this.streamTypeSelectList.push({ value: key });
        }
        this.streamTypeSelectList.push({ value: '_MUSIC' });
        this.streamTypeSelectList.push({ value: '_MESSAGE' });
        this.streamTypeSelectList.push({ value: '_NOTIFICATION' });
        this.streamTypeSelectList.push({ value: '_SYSTEM' });
        this.streamTypeSelectList.push({ value: '_MOVIE' });
        this.streamTypeSelectList.push({ value: '_UNKNOWN' });
        this.streamTypeSelectList.push({ value: '_GAME' });
        this.streamTypeSelectList.push({ value: '_AUDIOBOOK' });
        this.streamTypeSelectList.push({ value: '_NAVIGATION' });
        this.streamTypeSelectList.push({ value: '_DTMF' });
        this.streamTypeSelectList.push({ value: '_ENFORCED_TONE' });
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
    getMinStreamVolumeCallback() {
        if (this.audioRenderer == null) {
            this.returnMsg += `audioRenderer instance had not created,dont‘t allow to getMinStreamVolumeCallback\n`;
            return;
        }
        let _this = this;
        this.audioRenderer.getMinStreamVolume((err, minVolume) => {
            if (err) {
                _this.returnMsg = `audioRenderer getMinStreamVolumeCallback : Error: ${JSON.stringify(err)}`;
            }
            else {
                _this.returnMsg = `audioRenderer getMinStreamVolumeCallback : Success, 返回值: ${minVolume}`;
            }
        });
    }
    getMinStreamVolumePromise() {
        if (this.audioRenderer == null) {
            this.returnMsg += `audioRenderer instance had not created,dont‘t allow to getMinStreamVolumePromise\n`;
            return;
        }
        let _this = this;
        this.audioRenderer.getMinStreamVolume()
            .then(minVolume => {
            _this.returnMsg = `audioRenderer getMinStreamVolumePromise : Success, 返回值: ${minVolume}`;
        })
            .catch((err) => {
            _this.returnMsg = `audioRenderer getMinStreamVolumePromise : Error: ${JSON.stringify(err)}`;
        });
    }
    getMaxStreamVolumeCallback() {
        if (this.audioRenderer == null) {
            this.returnMsg += `audioRenderer instance had not created,dont‘t allow to getMaxStreamVolumeCallback\n`;
            return;
        }
        let _this = this;
        this.audioRenderer.getMaxStreamVolume((err, maxVolume) => {
            if (err) {
                _this.returnMsg = `audioRenderer getMaxStreamVolumeCallback  : Error: ${JSON.stringify(err)}`;
            }
            else {
                _this.returnMsg = `audioRenderer getMaxStreamVolumeCallback  : Success, 返回值: ${maxVolume}`;
            }
        });
    }
    getMaxStreamVolumePromise() {
        if (this.audioRenderer == null) {
            this.returnMsg += `audioRenderer instance had not created,dont‘t allow to getMaxStreamVolumePromise\n`;
            return;
        }
        let _this = this;
        this.audioRenderer.getMaxStreamVolume()
            .then(maxVolume => {
            _this.returnMsg = `audioRenderer getMaxStreamVolumePromise : Success, 返回值: ${maxVolume}`;
        })
            .catch((err) => {
            _this.returnMsg = `audioRenderer getMaxStreamVolumePromise : Error: ${JSON.stringify(err)}`;
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
    async releaseRender() {
        try {
            this.audioRenderer.release((err) => {
                if (err) {
                    console.error('Renderer release failed');
                }
                else {
                    this.returnMsg += `audioRenderer release success \n`;
                }
            });
        }
        catch (err) {
            this.returnMsg += `audioRenderer release : Error: ${JSON.stringify(err)}\n`;
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
        Select.create(this.streamTypeSelectList);
        Select.value(this.selectedVolumeTypeKey);
        Select.onSelect(async (index, value) => {
            //                this.selectedVolumeType = audio.AudioVolumeType[value];
            //                this.selectedVolumeTypeKey = value;
            this.audioRendererOptions.rendererInfo = this.renderInfo[this.selectedVolumeTypeKey].main;
            this.selectedStreamUsageKey = this.renderInfo[this.selectedVolumeTypeKey].info.selectedStreamUsageKey;
            this.selectedContentTypeKey = this.renderInfo[this.selectedVolumeTypeKey].info.selectedContentTypeKey;
            //                this.getVolumeRange();
            if (this.audioRenderer !== null) {
                await this.audioRenderer.release();
                this.audioRenderer = null;
            }
            //                this.renderPlay()
        });
        Select.pop();
        Row.pop();
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
        Text.fontColor(Color.Blue);
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
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceBetween);
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.onClick(() => this.getMinStreamVolumePromise());
        Text.create("获取stream最小音量");
        Text.fontSize(22);
        Text.fontColor(Color.Blue);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.onClick(() => this.getMaxStreamVolumePromise());
        Text.create("获取stream最大音量");
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
        Button.onClick(() => this.getMinStreamVolumeCallback());
        Text.create("获取stream最小音量Callback");
        Text.fontSize(22);
        Text.fontColor(Color.Blue);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.onClick(() => this.getMaxStreamVolumeCallback());
        Text.create("获取stream最大音量Callback");
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
        Button.width('100%');
        Button.height(60);
        Button.onClick(() => this.releaseRender());
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
loadDocument(new GetStreamVolume("1", undefined, {}));
