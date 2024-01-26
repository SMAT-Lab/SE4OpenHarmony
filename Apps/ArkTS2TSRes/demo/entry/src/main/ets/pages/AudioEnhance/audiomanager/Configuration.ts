interface Configuration_Params {
    audioRendererOptions?;
    audioRenderer?;
    returnMsg?: string;
    audioVolumeGroupManager?;
    selectedVolumeTypeKey?: string;
    selectedVolumeType?: number;
    volumeTypeSelectList?;
    selectedVolume?: number;
    minVolume?: number;
    maxVolume?: number;
    audioVolumeManager?;
    audioManager?;
    path?: string;
    selectedContentTypeKey?: string;
    selectedStreamUsageKey?: string;
    volumeAdjustzUp?: number;
    volumeAdjustDown?: number;
    renderInfo?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Configuration_" + ++__generate__Id;
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
class Configuration extends View {
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
        this.__returnMsg = new ObservedPropertySimple('', this, "returnMsg");
        this.audioVolumeGroupManager = null;
        this.__selectedVolumeTypeKey = new ObservedPropertySimple("请选择音量类型", this, "selectedVolumeTypeKey");
        this.__selectedVolumeType = new ObservedPropertySimple(-1, this, "selectedVolumeType");
        this.volumeTypeSelectList = [];
        this.__selectedVolume = new ObservedPropertySimple(0, this, "selectedVolume");
        this.__minVolume = new ObservedPropertySimple(0, this, "minVolume");
        this.__maxVolume = new ObservedPropertySimple(15, this, "maxVolume");
        this.audioVolumeManager = null;
        this.audioManager = null;
        this.__path = new ObservedPropertySimple(globalThis.pathDir + '/test_44100_2.wav', this, "path");
        this.__selectedContentTypeKey = new ObservedPropertySimple("CONTENT_TYPE_MUSIC", this, "selectedContentTypeKey");
        this.__selectedStreamUsageKey = new ObservedPropertySimple("STREAM_USAGE_MEDIA", this, "selectedStreamUsageKey");
        this.__volumeAdjustzUp = new ObservedPropertySimple(0, this, "volumeAdjustzUp");
        this.__volumeAdjustDown = new ObservedPropertySimple(1, this, "volumeAdjustDown");
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
    updateWithValueParams(params: Configuration_Params) {
        if (params.audioRendererOptions !== undefined) {
            this.audioRendererOptions = params.audioRendererOptions;
        }
        if (params.audioRenderer !== undefined) {
            this.audioRenderer = params.audioRenderer;
        }
        if (params.returnMsg !== undefined) {
            this.returnMsg = params.returnMsg;
        }
        if (params.audioVolumeGroupManager !== undefined) {
            this.audioVolumeGroupManager = params.audioVolumeGroupManager;
        }
        if (params.selectedVolumeTypeKey !== undefined) {
            this.selectedVolumeTypeKey = params.selectedVolumeTypeKey;
        }
        if (params.selectedVolumeType !== undefined) {
            this.selectedVolumeType = params.selectedVolumeType;
        }
        if (params.volumeTypeSelectList !== undefined) {
            this.volumeTypeSelectList = params.volumeTypeSelectList;
        }
        if (params.selectedVolume !== undefined) {
            this.selectedVolume = params.selectedVolume;
        }
        if (params.minVolume !== undefined) {
            this.minVolume = params.minVolume;
        }
        if (params.maxVolume !== undefined) {
            this.maxVolume = params.maxVolume;
        }
        if (params.audioVolumeManager !== undefined) {
            this.audioVolumeManager = params.audioVolumeManager;
        }
        if (params.audioManager !== undefined) {
            this.audioManager = params.audioManager;
        }
        if (params.path !== undefined) {
            this.path = params.path;
        }
        if (params.selectedContentTypeKey !== undefined) {
            this.selectedContentTypeKey = params.selectedContentTypeKey;
        }
        if (params.selectedStreamUsageKey !== undefined) {
            this.selectedStreamUsageKey = params.selectedStreamUsageKey;
        }
        if (params.volumeAdjustzUp !== undefined) {
            this.volumeAdjustzUp = params.volumeAdjustzUp;
        }
        if (params.volumeAdjustDown !== undefined) {
            this.volumeAdjustDown = params.volumeAdjustDown;
        }
        if (params.renderInfo !== undefined) {
            this.renderInfo = params.renderInfo;
        }
    }
    aboutToBeDeleted() {
        this.__returnMsg.aboutToBeDeleted();
        this.__selectedVolumeTypeKey.aboutToBeDeleted();
        this.__selectedVolumeType.aboutToBeDeleted();
        this.__selectedVolume.aboutToBeDeleted();
        this.__minVolume.aboutToBeDeleted();
        this.__maxVolume.aboutToBeDeleted();
        this.__path.aboutToBeDeleted();
        this.__selectedContentTypeKey.aboutToBeDeleted();
        this.__selectedStreamUsageKey.aboutToBeDeleted();
        this.__volumeAdjustzUp.aboutToBeDeleted();
        this.__volumeAdjustDown.aboutToBeDeleted();
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
    private audioVolumeGroupManager;
    private __selectedVolumeTypeKey: ObservedPropertySimple<string>;
    get selectedVolumeTypeKey() {
        return this.__selectedVolumeTypeKey.get();
    }
    set selectedVolumeTypeKey(newValue: string) {
        this.__selectedVolumeTypeKey.set(newValue);
    }
    private __selectedVolumeType: ObservedPropertySimple<number>; //音量类型
    get selectedVolumeType() {
        return this.__selectedVolumeType.get();
    }
    set selectedVolumeType(newValue: number) {
        this.__selectedVolumeType.set(newValue);
    }
    private volumeTypeSelectList;
    private __selectedVolume: ObservedPropertySimple<number>; //音量大小
    get selectedVolume() {
        return this.__selectedVolume.get();
    }
    set selectedVolume(newValue: number) {
        this.__selectedVolume.set(newValue);
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
    private audioVolumeManager;
    private audioManager;
    private __path: ObservedPropertySimple<string>;
    get path() {
        return this.__path.get();
    }
    set path(newValue: string) {
        this.__path.set(newValue);
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
    private __volumeAdjustzUp: ObservedPropertySimple<number>;
    get volumeAdjustzUp() {
        return this.__volumeAdjustzUp.get();
    }
    set volumeAdjustzUp(newValue: number) {
        this.__volumeAdjustzUp.set(newValue);
    }
    private __volumeAdjustDown: ObservedPropertySimple<number>;
    get volumeAdjustDown() {
        return this.__volumeAdjustDown.get();
    }
    set volumeAdjustDown(newValue: number) {
        this.__volumeAdjustDown.set(newValue);
    }
    private renderInfo;
    async aboutToAppear() {
        for (let key in audio.AudioVolumeType) {
            this.volumeTypeSelectList.push({ value: key });
        }
        this.volumeTypeSelectList.push({ value: '_MUSIC' });
        this.volumeTypeSelectList.push({ value: '_MESSAGE' });
        this.volumeTypeSelectList.push({ value: '_NOTIFICATION' });
        this.volumeTypeSelectList.push({ value: '_SYSTEM' });
        this.volumeTypeSelectList.push({ value: '_MOVIE' });
        this.volumeTypeSelectList.push({ value: '_UNKNOWN' });
        this.volumeTypeSelectList.push({ value: '_GAME' });
        this.volumeTypeSelectList.push({ value: '_AUDIOBOOK' });
        this.volumeTypeSelectList.push({ value: '_NAVIGATION' });
        this.volumeTypeSelectList.push({ value: '_DTMF' });
        this.volumeTypeSelectList.push({ value: '_ENFORCED_TONE' });
        this.audioManager = audio.getAudioManager();
        this.audioVolumeManager = this.audioManager.getVolumeManager();
        let groupid = audio.DEFAULT_VOLUME_GROUP_ID;
        let _this = this;
        this.audioVolumeManager.getVolumeGroupManager(groupid, (err, value) => {
            if (err) {
                _this.returnMsg = "getVolumeGroupManager failed. err:" + JSON.stringify(err);
                _this.returnMsg += "groupid:" + groupid;
                return;
            }
            _this.returnMsg += "getVolumeGroupManager success";
            _this.audioVolumeGroupManager = value;
        });
    }
    async onBackPress() {
        if (this.audioRenderer !== null) {
            await this.audioRenderer.release();
            this.audioRenderer = null;
        }
    }
    async renderPlay() {
        if (this.audioRenderer !== null) {
            await this.audioRenderer.release();
            this.audioRenderer = null;
        }
        this.returnMsg = `audioRendererOptions ${JSON.stringify(this.audioRendererOptions)} \n`;
        console.log(`audioRendererOptions ${JSON.stringify(this.audioRendererOptions)} \n`);
        try {
            this.audioRenderer = await audio.createAudioRenderer(this.audioRendererOptions);
            this.returnMsg = `audioRenderer create success \n`;
        }
        catch (err) {
            this.returnMsg = `audioRenderer create : Error: ${JSON.stringify(err)}\n`;
            return;
        }
        let bufferSize;
        try {
            bufferSize = await this.audioRenderer.getBufferSize();
            this.returnMsg = `audioRenderer getBufferSize success,bufferSize:${bufferSize} \n`;
            await this.audioRenderer.start();
            this.returnMsg = `audioRenderer start success \n`;
        }
        catch (err) {
            this.returnMsg = `audioRenderer start : Error: ${JSON.stringify(err)}\n`;
            return;
        }
        let path = this.path;
        try {
            this.returnMsg = `path:${path}\n`;
            let stat = await fs.stat(path);
            this.returnMsg = `stat:${JSON.stringify(stat)}\n`;
            this.returnMsg = `size:${stat.size}\n`;
            let len = stat.size % bufferSize == 0 ? Math.floor(stat.size / bufferSize) : Math.floor(stat.size / bufferSize + 1);
            let file = await fs.open(path, 0o0);
            this.returnMsg = `fd:${file.fd}\n`;
            let buf = new ArrayBuffer(bufferSize);
            this.returnMsg = `audioRenderer write start.......... \n`;
            for (let i = 0; i < len; i++) {
                if (this.audioRenderer.state > 2) {
                    return;
                }
                let options = {
                    offset: i * bufferSize,
                    length: bufferSize
                };
                let readsize = await fs.read(file.fd, buf, options);
                let writeSize = await this.audioRenderer.write(buf);
            }
            this.returnMsg = `audioRenderer write end. \n`;
        }
        catch (err) {
            this.returnMsg = `audioRenderer write : Error: ${JSON.stringify(err)}\n`;
        }
        await this.audioRenderer.release();
        this.audioRenderer = null;
    }
    async getVolumeRange() {
        this.minVolume = await this.audioVolumeGroupManager.getMinVolume(this.selectedVolumeType);
        this.maxVolume = await this.audioVolumeGroupManager.getMaxVolume(this.selectedVolumeType);
        this.returnMsg = "minVolume:" + this.minVolume + "; maxVolume:" + this.maxVolume;
    }
    render() {
        Row.create();
        Row.height('100%');
        Row.width('100%');
        Row.create();
        Row.position({ x: 0, y: 0 });
        Row.width('100%');
        Column.create();
        Column.width('98%');
        Column.height(70);
        Column.backgroundColor(Color.Orange);
        Column.position({ x: '1%' });
        Column.zIndex(999);
        Text.create("【音量】返回数据：");
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
        Scroll.margin({ top: 80 });
        Column.create();
        Column.create();
        Column.width('100%');
        Column.margin({ top: 20 });
        Row.create();
        Select.create(this.volumeTypeSelectList);
        Select.value(this.selectedVolumeTypeKey);
        Select.onSelect(async (index, value) => {
            this.selectedVolumeType = audio.AudioVolumeType[value];
            this.selectedVolumeTypeKey = value;
            this.audioRendererOptions.rendererInfo = this.renderInfo[this.selectedVolumeTypeKey].main;
            this.selectedStreamUsageKey = this.renderInfo[this.selectedVolumeTypeKey].info.selectedStreamUsageKey;
            this.selectedContentTypeKey = this.renderInfo[this.selectedVolumeTypeKey].info.selectedContentTypeKey;
            this.getVolumeRange();
            if (this.audioRenderer !== null) {
                await this.audioRenderer.release();
                this.audioRenderer = null;
            }
            this.renderPlay();
        });
        Select.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Button.createWithChild();
        Button.width('40%');
        Button.height(60);
        Button.margin({ right: 10 });
        Button.onClick((event) => {
            if (this.selectedVolumeType == -1) {
                this.returnMsg = "请选择音频流类型";
                return;
            }
            let _this = this;
            this.audioVolumeGroupManager.getVolume(this.selectedVolumeType, (err, value) => {
                if (err) {
                    _this.returnMsg = 'getVolumeCallback:' + JSON.stringify(err);
                }
                _this.returnMsg = "getVolumeCallback:SUCCESS,返回值:" + value;
            });
        });
        Text.create("获取默认音量 callback");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('40%');
        Button.height(60);
        Button.onClick((event) => {
            if (this.selectedVolumeType == -1) {
                this.returnMsg = "请选择音频流类型";
                return;
            }
            let _this = this;
            this.audioVolumeGroupManager.getVolume(this.selectedVolumeType).then((value) => {
                _this.returnMsg = "getVolumePromise:SUCCESS,返回值:" + value;
            }).catch(err => {
                _this.returnMsg = 'getVolumePromise:' + JSON.stringify(err);
            });
        });
        Text.create("获取默认音量 promise");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Button.createWithChild();
        Button.width('40%');
        Button.height(60);
        Button.margin({ right: 10 });
        Button.onClick((event) => {
            if (this.selectedVolumeType == -1) {
                this.returnMsg = "请选择音频流类型";
                return;
            }
            let _this = this;
            this.audioVolumeGroupManager.getMinVolume(this.selectedVolumeType, (err, value) => {
                if (err) {
                    _this.returnMsg = 'getMinVolumeCallback:' + JSON.stringify(err);
                }
                _this.returnMsg = "getMinVolumeCallback:SUCCESS,返回值:" + value;
            });
        });
        Text.create("获取最小音量 callback");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('40%');
        Button.height(60);
        Button.onClick((event) => {
            if (this.selectedVolumeType == -1) {
                this.returnMsg = "请选择音频流类型";
                return;
            }
            let _this = this;
            this.audioVolumeGroupManager.getMinVolume(this.selectedVolumeType).then((value) => {
                _this.returnMsg = "getMinVolumePromise:SUCCESS,返回值:" + value;
            }).catch(err => {
                _this.returnMsg = 'getMinVolumePromise:' + JSON.stringify(err);
            });
        });
        Text.create("获取最小音量 promise");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Button.createWithChild();
        Button.width('40%');
        Button.height(60);
        Button.margin({ right: 10 });
        Button.onClick((event) => {
            if (this.selectedVolumeType == -1) {
                this.returnMsg = "请选择音频流类型";
                return;
            }
            let _this = this;
            this.audioVolumeGroupManager.getMaxVolume(this.selectedVolumeType, (err, value) => {
                if (err) {
                    _this.returnMsg = 'getMaxVolumeCallback:' + JSON.stringify(err);
                }
                _this.returnMsg = "getMaxVolumeCallback:SUCCESS,返回值:" + value;
            });
        });
        Text.create("获取最大音量 callback");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('40%');
        Button.height(60);
        Button.onClick((event) => {
            if (this.selectedVolumeType == -1) {
                this.returnMsg = "请选择音频流类型";
                return;
            }
            let _this = this;
            this.audioVolumeGroupManager.getMaxVolume(this.selectedVolumeType).then((value) => {
                _this.returnMsg = "getMaxVolumePromise:SUCCESS,返回值:" + value;
            }).catch(err => {
                _this.returnMsg = 'getMaxVolumePromise:' + JSON.stringify(err);
            });
        });
        Text.create("获取最大音量 promise");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Column.pop();
        Column.pop();
        Scroll.pop();
        Row.pop();
    }
}
loadDocument(new Configuration("1", undefined, {}));
