interface PlaybackCapturer_Params {
    audioCapturerOptions?;
    audioRendererOptions?;
    returnMsg?: string;
    StreamText?: string;
    capturer_?;
    renderers_?;
    capRender_?;
    rendererSelectState_?;
    rendererPrivacy_?;
    capturerFilter_?;
    renderStateList_?: Array<number>;
    recordState_?: number;
    recordSec?: number;
    capRenderState_?: number;
    capRenderText_?: string;
    streamUsageList?;
    selectedStreamUsageKey?: Array<String>;
    samplingRateList?;
    selectedSamplingRateKey?: string;
    channelsList?;
    selectedChannelKey?: string;
    sampleFormatList?;
    selectedSampleFormatKey?: string;
    encodingTypeList?;
    selectedEncodingTypeKey?: string;
    capturerPath?;
    recordText?: string;
    SUPPORT_STREAM_USAGE?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "PlaybackCapturer_" + ++__generate__Id;
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
import audio from '@ohos.multimedia.audio';
import fs from '@ohos.file.fs';
import common from '@ohos.app.ability.common';
const MAX_RENDER_NUM = 19;
const RENDER_MEDIA_IDX = 0;
const RENDER_ALARM_IDX = 1;
const RENDER_ASS_IDX = 2;
const RENDER_VOICE_IDX = 3;
const RENDER_UNKNOWN_IDX = 4;
const RENDER_MUSIC_IDX = 5;
const RENDER_VOICE_MESSAGE_IDX = 6;
const RENDER_RINGTONE_IDX = 7;
const RENDER_NOTIFICATION_IDX = 8;
const RENDER_ACCESSIBILITY_IDX = 9;
const RENDER_SYSTEM_IDX = 10;
const RENDER_GAME_IDX = 11;
const RENDER_AUDIOBOOK_IDX = 12;
const RENDER_NAVIGATION_IDX = 13;
const RENDER_DTMF_IDX = 14;
const RENDER_ENFORCED_TONE_IDX = 15;
const RENDER_ULTRASONIC_IDX = 16;
const RENDER_NOTIFICATION_RINGTONE_IDX = 17;
const RENDER_MOVIE_IDX = 18;
class PlaybackCapturer extends View {
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
                source: 2,
                capturerFlags: 0
            },
            playbackCaptureConfig: {
                filterOptions: {
                    usages: [audio.StreamUsage.STREAM_USAGE_MEDIA]
                }
            }
        };
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
            },
            privacyType: 1
        };
        this.__returnMsg = new ObservedPropertySimple(`hello`, this, "returnMsg");
        this.__StreamText = new ObservedPropertySimple('getStreamInfo', this, "StreamText");
        this.capturer_ = null;
        this.renderers_ = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
        this.capRender_ = null;
        this.rendererSelectState_ = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.rendererPrivacy_ = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.capturerFilter_ = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.__renderStateList_ = new ObservedPropertyObject([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], this, "renderStateList_");
        this.__recordState_ = new ObservedPropertySimple(0, this, "recordState_");
        this.__recordSec = new ObservedPropertySimple(0, this, "recordSec");
        this.__capRenderState_ = new ObservedPropertySimple(0, this, "capRenderState_");
        this.__capRenderText_ = new ObservedPropertySimple('播放录音数据', this, "capRenderText_");
        this.streamUsageList = [];
        this.__selectedStreamUsageKey = new ObservedPropertyObject([], this, "selectedStreamUsageKey");
        this.samplingRateList = [];
        this.__selectedSamplingRateKey = new ObservedPropertySimple("SAMPLE_RATE_44100", this, "selectedSamplingRateKey");
        this.channelsList = [];
        this.__selectedChannelKey = new ObservedPropertySimple("CHANNEL_2", this, "selectedChannelKey");
        this.sampleFormatList = [];
        this.__selectedSampleFormatKey = new ObservedPropertySimple("SAMPLE_FORMAT_S16LE", this, "selectedSampleFormatKey");
        this.encodingTypeList = [];
        this.__selectedEncodingTypeKey = new ObservedPropertySimple("ENCODING_TYPE_RAW", this, "selectedEncodingTypeKey");
        this.capturerPath = '';
        this.__recordText = new ObservedPropertySimple('音频录制', this, "recordText");
        this.SUPPORT_STREAM_USAGE = [
            audio.StreamUsage.STREAM_USAGE_MEDIA,
            audio.StreamUsage.STREAM_USAGE_ALARM,
            audio.StreamUsage.STREAM_USAGE_VOICE_ASSISTANT,
            audio.StreamUsage.STREAM_USAGE_VOICE_COMMUNICATION,
            audio.StreamUsage.STREAM_USAGE_UNKNOWN,
            audio.StreamUsage.STREAM_USAGE_MUSIC,
            audio.StreamUsage.STREAM_USAGE_VOICE_MESSAGE,
            audio.StreamUsage.STREAM_USAGE_RINGTONE,
            audio.StreamUsage.STREAM_USAGE_NOTIFICATION,
            audio.StreamUsage.STREAM_USAGE_ACCESSIBILITY,
            audio.StreamUsage.STREAM_USAGE_SYSTEM,
            audio.StreamUsage.STREAM_USAGE_GAME,
            audio.StreamUsage.STREAM_USAGE_AUDIOBOOK,
            audio.StreamUsage.STREAM_USAGE_NAVIGATION,
            audio.StreamUsage.STREAM_USAGE_DTMF,
            audio.StreamUsage.STREAM_USAGE_ENFORCED_TONE,
            audio.StreamUsage.STREAM_USAGE_NOTIFICATION_RINGTONE,
            audio.StreamUsage.STREAM_USAGE_ULTRASONIC,
            audio.StreamUsage.STREAM_USAGE_MOVIE,
        ];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: PlaybackCapturer_Params) {
        if (params.audioCapturerOptions !== undefined) {
            this.audioCapturerOptions = params.audioCapturerOptions;
        }
        if (params.audioRendererOptions !== undefined) {
            this.audioRendererOptions = params.audioRendererOptions;
        }
        if (params.returnMsg !== undefined) {
            this.returnMsg = params.returnMsg;
        }
        if (params.StreamText !== undefined) {
            this.StreamText = params.StreamText;
        }
        if (params.capturer_ !== undefined) {
            this.capturer_ = params.capturer_;
        }
        if (params.renderers_ !== undefined) {
            this.renderers_ = params.renderers_;
        }
        if (params.capRender_ !== undefined) {
            this.capRender_ = params.capRender_;
        }
        if (params.rendererSelectState_ !== undefined) {
            this.rendererSelectState_ = params.rendererSelectState_;
        }
        if (params.rendererPrivacy_ !== undefined) {
            this.rendererPrivacy_ = params.rendererPrivacy_;
        }
        if (params.capturerFilter_ !== undefined) {
            this.capturerFilter_ = params.capturerFilter_;
        }
        if (params.renderStateList_ !== undefined) {
            this.renderStateList_ = params.renderStateList_;
        }
        if (params.recordState_ !== undefined) {
            this.recordState_ = params.recordState_;
        }
        if (params.recordSec !== undefined) {
            this.recordSec = params.recordSec;
        }
        if (params.capRenderState_ !== undefined) {
            this.capRenderState_ = params.capRenderState_;
        }
        if (params.capRenderText_ !== undefined) {
            this.capRenderText_ = params.capRenderText_;
        }
        if (params.streamUsageList !== undefined) {
            this.streamUsageList = params.streamUsageList;
        }
        if (params.selectedStreamUsageKey !== undefined) {
            this.selectedStreamUsageKey = params.selectedStreamUsageKey;
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
        if (params.selectedSampleFormatKey !== undefined) {
            this.selectedSampleFormatKey = params.selectedSampleFormatKey;
        }
        if (params.encodingTypeList !== undefined) {
            this.encodingTypeList = params.encodingTypeList;
        }
        if (params.selectedEncodingTypeKey !== undefined) {
            this.selectedEncodingTypeKey = params.selectedEncodingTypeKey;
        }
        if (params.capturerPath !== undefined) {
            this.capturerPath = params.capturerPath;
        }
        if (params.recordText !== undefined) {
            this.recordText = params.recordText;
        }
        if (params.SUPPORT_STREAM_USAGE !== undefined) {
            this.SUPPORT_STREAM_USAGE = params.SUPPORT_STREAM_USAGE;
        }
    }
    aboutToBeDeleted() {
        this.__returnMsg.aboutToBeDeleted();
        this.__StreamText.aboutToBeDeleted();
        this.__renderStateList_.aboutToBeDeleted();
        this.__recordState_.aboutToBeDeleted();
        this.__recordSec.aboutToBeDeleted();
        this.__capRenderState_.aboutToBeDeleted();
        this.__capRenderText_.aboutToBeDeleted();
        this.__selectedStreamUsageKey.aboutToBeDeleted();
        this.__selectedSamplingRateKey.aboutToBeDeleted();
        this.__selectedChannelKey.aboutToBeDeleted();
        this.__selectedSampleFormatKey.aboutToBeDeleted();
        this.__selectedEncodingTypeKey.aboutToBeDeleted();
        this.__recordText.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private audioCapturerOptions;
    private audioRendererOptions;
    private __returnMsg: ObservedPropertySimple<string>;
    get returnMsg() {
        return this.__returnMsg.get();
    }
    set returnMsg(newValue: string) {
        this.__returnMsg.set(newValue);
    }
    private __StreamText: ObservedPropertySimple<string>;
    get StreamText() {
        return this.__StreamText.get();
    }
    set StreamText(newValue: string) {
        this.__StreamText.set(newValue);
    }
    private capturer_;
    private renderers_;
    private capRender_;
    private rendererSelectState_;
    private rendererPrivacy_;
    private capturerFilter_;
    private __renderStateList_: ObservedPropertyObject<Array<number>>;
    get renderStateList_() {
        return this.__renderStateList_.get();
    }
    set renderStateList_(newValue: Array<number>) {
        this.__renderStateList_.set(newValue);
    }
    private __recordState_: ObservedPropertySimple<number>;
    get recordState_() {
        return this.__recordState_.get();
    }
    set recordState_(newValue: number) {
        this.__recordState_.set(newValue);
    }
    private __recordSec: ObservedPropertySimple<number>;
    get recordSec() {
        return this.__recordSec.get();
    }
    set recordSec(newValue: number) {
        this.__recordSec.set(newValue);
    }
    private __capRenderState_: ObservedPropertySimple<number>;
    get capRenderState_() {
        return this.__capRenderState_.get();
    }
    set capRenderState_(newValue: number) {
        this.__capRenderState_.set(newValue);
    }
    private __capRenderText_: ObservedPropertySimple<string>;
    get capRenderText_() {
        return this.__capRenderText_.get();
    }
    set capRenderText_(newValue: string) {
        this.__capRenderText_.set(newValue);
    }
    private streamUsageList;
    private __selectedStreamUsageKey: ObservedPropertyObject<Array<String>>;
    get selectedStreamUsageKey() {
        return this.__selectedStreamUsageKey.get();
    }
    set selectedStreamUsageKey(newValue: Array<String>) {
        this.__selectedStreamUsageKey.set(newValue);
    }
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
    private __selectedSampleFormatKey: ObservedPropertySimple<string>;
    get selectedSampleFormatKey() {
        return this.__selectedSampleFormatKey.get();
    }
    set selectedSampleFormatKey(newValue: string) {
        this.__selectedSampleFormatKey.set(newValue);
    }
    private encodingTypeList;
    private __selectedEncodingTypeKey: ObservedPropertySimple<string>;
    get selectedEncodingTypeKey() {
        return this.__selectedEncodingTypeKey.get();
    }
    set selectedEncodingTypeKey(newValue: string) {
        this.__selectedEncodingTypeKey.set(newValue);
    }
    private capturerPath;
    private __recordText: ObservedPropertySimple<string>;
    get recordText() {
        return this.__recordText.get();
    }
    set recordText(newValue: string) {
        this.__recordText.set(newValue);
    }
    private SUPPORT_STREAM_USAGE;
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
        for (let key in audio.StreamUsage) {
            this.streamUsageList.push({ value: key });
        }
    }
    async CreateRendersByIndex(idx: number, usage) {
        if (idx < 0 || idx >= MAX_RENDER_NUM) {
            return;
        }
        this.audioRendererOptions.privacyType = this.rendererPrivacy_[idx];
        this.audioRendererOptions.rendererInfo.usage = usage;
        this.renderers_[idx] = await audio.createAudioRenderer(this.audioRendererOptions);
        this.renderers_[idx].on('stateChange', (state) => {
            console.log('renderStateList, index= ' + idx + ' changed to ' + state);
            this.returnMsg = `renderStateList, index=  ${idx}  changed to  ${state}`;
            this.renderStateList_[idx] = state;
        });
    }
    async CreateAndStartSelectRenders() {
        let isCanPlay = false;
        for (let i = 0; i < this.rendererSelectState_.length; i++) {
            if (this.rendererSelectState_[i] === 1) {
                isCanPlay = true;
                break;
            }
        }
        if (!isCanPlay) {
            console.log('请选择至少一项流类型');
            this.returnMsg = `请选择至少一项流类型`;
            return;
        }
        this.audioCapturerOptions.playbackCaptureConfig.filterOptions.usages = [];
        setTimeout(async () => {
            if (this.rendererSelectState_[RENDER_MEDIA_IDX] == 1) {
                // create AudioRender instance of STREAM_USAGE_MEDIA
                await this.CreateRendersByIndex(RENDER_MEDIA_IDX, audio.StreamUsage.STREAM_USAGE_MEDIA);
                await this.Play(RENDER_MEDIA_IDX, 'safe_and_sound_32.wav');
            }
        }, 0);
        setTimeout(async () => {
            if (this.rendererSelectState_[RENDER_ALARM_IDX] == 1) {
                // create AudioRender instance of STREAM_USAGE_ALARM
                await this.CreateRendersByIndex(RENDER_ALARM_IDX, audio.StreamUsage.STREAM_USAGE_ALARM);
                await this.Play(RENDER_ALARM_IDX, 'test_44100_2.wav');
            }
        }, 0);
        setTimeout(async () => {
            if (this.rendererSelectState_[RENDER_ASS_IDX] == 1) {
                // create AudioRender instance of STREAM_USAGE_SYSTEM
                await this.CreateRendersByIndex(RENDER_ASS_IDX, audio.StreamUsage.STREAM_USAGE_VOICE_ASSISTANT);
                await this.Play(RENDER_ASS_IDX, 'safe_and_sound_32.wav');
            }
        }, 0);
        setTimeout(async () => {
            if (this.rendererSelectState_[RENDER_VOICE_IDX] == 1) {
                // create AudioRender instance of STREAM_USAGE_VOICE_COMMUNICATION
                await this.CreateRendersByIndex(RENDER_VOICE_IDX, audio.StreamUsage.STREAM_USAGE_VOICE_COMMUNICATION);
                await this.Play(RENDER_VOICE_IDX, 'test_44100_2.wav');
            }
        }, 0);
        setTimeout(async () => {
            if (this.rendererSelectState_[RENDER_UNKNOWN_IDX] == 1) {
                // create AudioRender instance of STREAM_USAGE_VOICE_COMMUNICATION
                await this.CreateRendersByIndex(RENDER_UNKNOWN_IDX, audio.StreamUsage.STREAM_USAGE_UNKNOWN);
                await this.Play(RENDER_UNKNOWN_IDX, 'safe_and_sound_32.wav');
            }
        }, 0);
        setTimeout(async () => {
            if (this.rendererSelectState_[RENDER_MUSIC_IDX] == 1) {
                // create AudioRender instance of STREAM_USAGE_VOICE_COMMUNICATION
                await this.CreateRendersByIndex(RENDER_MUSIC_IDX, audio.StreamUsage.STREAM_USAGE_MUSIC);
                await this.Play(RENDER_MUSIC_IDX, 'test_44100_2.wav');
            }
        }, 0);
        setTimeout(async () => {
            if (this.rendererSelectState_[RENDER_VOICE_MESSAGE_IDX] == 1) {
                // create AudioRender instance of STREAM_USAGE_VOICE_COMMUNICATION
                await this.CreateRendersByIndex(RENDER_VOICE_MESSAGE_IDX, audio.StreamUsage.STREAM_USAGE_VOICE_MESSAGE);
                await this.Play(RENDER_VOICE_MESSAGE_IDX, 'safe_and_sound_32.wav');
            }
        }, 0);
        setTimeout(async () => {
            if (this.rendererSelectState_[RENDER_RINGTONE_IDX] == 1) {
                // create AudioRender instance of STREAM_USAGE_VOICE_COMMUNICATION
                await this.CreateRendersByIndex(RENDER_RINGTONE_IDX, audio.StreamUsage.STREAM_USAGE_RINGTONE);
                await this.Play(RENDER_RINGTONE_IDX, 'test_44100_2.wav');
            }
        }, 0);
        setTimeout(async () => {
            if (this.rendererSelectState_[RENDER_NOTIFICATION_IDX] == 1) {
                // create AudioRender instance of STREAM_USAGE_VOICE_COMMUNICATION
                await this.CreateRendersByIndex(RENDER_NOTIFICATION_IDX, audio.StreamUsage.STREAM_USAGE_NOTIFICATION);
                await this.Play(RENDER_NOTIFICATION_IDX, 'safe_and_sound_32.wav');
            }
        }, 0);
        setTimeout(async () => {
            if (this.rendererSelectState_[RENDER_ACCESSIBILITY_IDX] == 1) {
                // create AudioRender instance of STREAM_USAGE_VOICE_COMMUNICATION
                await this.CreateRendersByIndex(RENDER_ACCESSIBILITY_IDX, audio.StreamUsage.STREAM_USAGE_ACCESSIBILITY);
                await this.Play(RENDER_ACCESSIBILITY_IDX, 'test_44100_2.wav');
            }
        }, 0);
        setTimeout(async () => {
            if (this.rendererSelectState_[RENDER_SYSTEM_IDX] == 1) {
                // create AudioRender instance of STREAM_USAGE_VOICE_COMMUNICATION
                await this.CreateRendersByIndex(RENDER_SYSTEM_IDX, audio.StreamUsage.STREAM_USAGE_SYSTEM);
                await this.Play(RENDER_SYSTEM_IDX, 'safe_and_sound_32.wav');
            }
        }, 0);
        setTimeout(async () => {
            if (this.rendererSelectState_[RENDER_GAME_IDX] == 1) {
                // create AudioRender instance of STREAM_USAGE_VOICE_COMMUNICATION
                await this.CreateRendersByIndex(RENDER_GAME_IDX, audio.StreamUsage.STREAM_USAGE_GAME);
                await this.Play(RENDER_GAME_IDX, 'test_44100_2.wav');
            }
        }, 0);
        setTimeout(async () => {
            if (this.rendererSelectState_[RENDER_AUDIOBOOK_IDX] == 1) {
                // create AudioRender instance of STREAM_USAGE_VOICE_COMMUNICATION
                await this.CreateRendersByIndex(RENDER_AUDIOBOOK_IDX, audio.StreamUsage.STREAM_USAGE_AUDIOBOOK);
                await this.Play(RENDER_AUDIOBOOK_IDX, 'safe_and_sound_32.wav');
            }
        }, 0);
        setTimeout(async () => {
            if (this.rendererSelectState_[RENDER_NAVIGATION_IDX] == 1) {
                // create AudioRender instance of STREAM_USAGE_VOICE_COMMUNICATION
                await this.CreateRendersByIndex(RENDER_NAVIGATION_IDX, audio.StreamUsage.STREAM_USAGE_NAVIGATION);
                await this.Play(RENDER_NAVIGATION_IDX, 'test_44100_2.wav');
            }
        }, 0);
        setTimeout(async () => {
            if (this.rendererSelectState_[RENDER_DTMF_IDX] == 1) {
                // create AudioRender instance of STREAM_USAGE_VOICE_COMMUNICATION
                await this.CreateRendersByIndex(RENDER_DTMF_IDX, audio.StreamUsage.STREAM_USAGE_DTMF);
                await this.Play(RENDER_DTMF_IDX, 'safe_and_sound_32.wav');
            }
        }, 0);
        setTimeout(async () => {
            if (this.rendererSelectState_[RENDER_ENFORCED_TONE_IDX] == 1) {
                // create AudioRender instance of STREAM_USAGE_VOICE_COMMUNICATION
                await this.CreateRendersByIndex(RENDER_ENFORCED_TONE_IDX, audio.StreamUsage.STREAM_USAGE_ENFORCED_TONE);
                await this.Play(RENDER_ENFORCED_TONE_IDX, 'test_44100_2.wav');
            }
        }, 0);
        setTimeout(async () => {
            if (this.rendererSelectState_[RENDER_ULTRASONIC_IDX] == 1) {
                // create AudioRender instance of STREAM_USAGE_VOICE_COMMUNICATION
                await this.CreateRendersByIndex(RENDER_ULTRASONIC_IDX, audio.StreamUsage.STREAM_USAGE_ULTRASONIC);
                await this.Play(RENDER_ULTRASONIC_IDX, 'safe_and_sound_32.wav');
            }
        }, 0);
        setTimeout(async () => {
            if (this.rendererSelectState_[RENDER_NOTIFICATION_RINGTONE_IDX] == 1) {
                // create AudioRender instance of STREAM_USAGE_VOICE_COMMUNICATION
                await this.CreateRendersByIndex(RENDER_NOTIFICATION_RINGTONE_IDX, audio.StreamUsage.STREAM_USAGE_NOTIFICATION_RINGTONE);
                await this.Play(RENDER_NOTIFICATION_RINGTONE_IDX, 'test_44100_2.wav');
            }
        }, 0);
        setTimeout(async () => {
            if (this.rendererSelectState_[RENDER_MOVIE_IDX] == 1) {
                // create AudioRender instance of STREAM_USAGE_VOICE_COMMUNICATION
                await this.CreateRendersByIndex(RENDER_MOVIE_IDX, audio.StreamUsage.STREAM_USAGE_MOVIE);
                await this.Play(RENDER_MOVIE_IDX, 'safe_and_sound_32.wav');
            }
        }, 0);
    }
    async PlayStop() {
        for (let i = 0; i < this.rendererSelectState_.length; i++) {
            if (this.renderers_[i] !== null) {
                await this.renderers_[i].release();
                this.renderers_[i] = null;
            }
        }
    }
    async Play(idx, pathName) {
        let path = globalThis.pathDir + '/' + pathName;
        await this.renderers_[idx].start();
        let bufferSize = await this.renderers_[idx].getBufferSize();
        let _this = this;
        try {
            let stat = await fs.stat(path);
            let len = stat.size % bufferSize == 0 ? Math.floor(stat.size / bufferSize) : Math.floor(stat.size / bufferSize + 1);
            let file = await fs.open(path, 0o0);
            let buf = new ArrayBuffer(bufferSize);
            //this.returnMsg = `audioRenderer write start.......... \n`;
            console.log(`audioRenderer ${idx} write start.......... \n`);
            this.returnMsg = `audioRenderer ${idx} write start.......... \n`;
            while (true) {
                if (this.renderStateList_[idx] === audio.AudioState.STATE_RELEASED) {
                    break;
                }
                for (let i = 0; i < len; i++) {
                    if (this.renderStateList_[idx] === audio.AudioState.STATE_RELEASED) {
                        break;
                    }
                    let options = {
                        offset: i * bufferSize,
                        length: bufferSize
                    };
                    let readsize = await fs.read(file.fd, buf, options);
                    let writeSize = await new Promise((resolve, reject) => {
                        this.renderers_[idx].write(buf, (err, writeSize) => {
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
            console.log(`audioRenderer ${idx} write end. \n`);
            this.returnMsg = `audioRenderer ${idx} write end. \n`;
            console.log(`audioRenderer ${idx} read end, state:${this.renderers_[idx].state}\n`);
            this.returnMsg = `audioRenderer ${idx} read end, state:${this.renderers_[idx].state}\n`;
            //      this.returnMsg += `audioRenderer write end. \n`;
            //      _this.returnMsg += `audioRenderer read end, state:${this.renderers_[idx].state}\n`
        }
        catch (err) {
            console.error(`audioRenderer write : Error: ${JSON.stringify(err)}\n`);
            this.returnMsg = `audioRenderer write : Error: ${JSON.stringify(err)}\n`;
            //this.returnMsg += `audioRenderer write : Error: ${JSON.stringify(err)}\n`
        }
    }
    async startRecord() {
        let isCanRec = false;
        this.capRenderText_ = "播放录音数据";
        for (let i = 0; i < this.renderStateList_.length; i++) {
            if (this.renderStateList_[i] === audio.AudioState.STATE_RUNNING) {
                isCanRec = true;
                break;
            }
        }
        if (!isCanRec) {
            console.log('没有正在播放的流');
            this.returnMsg = `没有正在播放的流`;
            return;
        }
        this.audioCapturerOptions.playbackCaptureConfig.filterOptions.usages = [];
        for (let i = 0; i < MAX_RENDER_NUM; i++) {
            if (this.capturerFilter_[i] === 1) {
                this.audioCapturerOptions.playbackCaptureConfig.filterOptions.usages.push(this.SUPPORT_STREAM_USAGE[i]);
                console.log('ZLMDBG capturer filter add usage:' + this.SUPPORT_STREAM_USAGE[i]);
                this.returnMsg = `ZLMDBG capturer filter add usage: ${this.SUPPORT_STREAM_USAGE[i]} `;
            }
        }
        try {
            console.log(`this.audioCapturerOptions=${JSON.stringify(this.audioCapturerOptions)}`);
            this.returnMsg = `this.audioCapturerOptions=${JSON.stringify(this.audioCapturerOptions)}`;
            this.capturer_ = await audio.createAudioCapturer(this.audioCapturerOptions);
            if (this.capturer_ === null) {
                console.log('createAudioCapturer failed.');
                this.returnMsg = `createAudioCapturer failed`;
                return;
            }
            else {
                this.capturer_.on('stateChange', (state) => {
                    console.log('recordState changed to ' + state);
                    this.returnMsg = `recordState changed to :  ${state}`;
                    this.recordState_ = state;
                });
                await this.capturer_.start();
                this.recordText = '正在录制中，点击可停止，最长录制30s';
                await this.readCapturer();
            }
            await this.stopRecord();
            //录制结束后，关闭音频资源播放
            //      for (let i = 0;i < this.rendererSelectState_.length; i++) {
            //        if (this.rendererSelectState_[i] === 1) {
            //          await this.renderers_[i].release()
            //        }
            //      }
        }
        catch (err) {
            console.log(`startRecord err = ${JSON.stringify(err)}`);
            this.returnMsg = `startRecord err = ${JSON.stringify(err)}`;
        }
    }
    async stopRecord() {
        try {
            //      await this.capturer_.stop()
            await this.capturer_.release();
            await this.PlayStop();
            this.capturer_ = null;
            this.recordText = '音频录制';
        }
        catch (err) {
            console.log(`stopRecord err = ${JSON.stringify(err)}`);
            this.returnMsg = `stopRecord err = ${JSON.stringify(err)}`;
        }
    }
    async readCapturer() {
        let bufferSize = await this.capturer_.getBufferSize();
        let _this = this;
        //READ 5S
        let start = new Date().getTime();
        let end = new Date().getTime();
        let buffer = null;
        console.log('AudioCapturer read start.....');
        this.returnMsg = `AudioCapturer read start.....`;
        let path = globalThis.pathDir + `/test_capturer_${new Date().getTime()}_${this.audioCapturerOptions.streamInfo.samplingRate}_${this.audioCapturerOptions.streamInfo.channels}.pcm`;
        this.capturerPath = path;
        try {
            await fs.open(path, 0o100);
            //this.returnMsg += "文件创建成功，"
            console.log("文件创建成功");
            this.returnMsg = `文件创建成功`;
        }
        catch (err) {
            console.log(`文件创建失败 err：${JSON.stringify(err)}`);
            this.returnMsg = `文件创建失败 err：${JSON.stringify(err)}`;
            //this.returnMsg += `文件创建失败 err：${JSON.stringify(err)}`
            return;
        }
        let file;
        try {
            file = await fs.open(path, 0o2);
            console.log("文件以读写模式打开成功");
            this.returnMsg = "文件以读写模式打开成功";
        }
        catch (err) {
            //this.returnMsg +=
            console.log(`文件以读写模式打开失败 err：${JSON.stringify(err)}`);
            this.returnMsg = `文件以读写模式打开失败 err：${JSON.stringify(err)}`;
            return;
        }
        this.returnMsg += `fd:${file.fd}\n`;
        let index = 0;
        while (end - start <= 5000 * 6) {
            if (_this.capturer_.state === audio.AudioState.STATE_STOPPED) {
                break;
            }
            try {
                buffer = await new Promise((resolve, reject) => {
                    _this.capturer_.read(bufferSize, true, async (err, buffer) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(buffer);
                        }
                    });
                });
                let options = {
                    offset: index * bufferSize,
                    length: bufferSize
                };
                let writeLen = await fs.write(file.fd, buffer, options);
                index++;
            }
            catch (err) {
                console.log(`AudioCapturer read : Error: ${JSON.stringify(err)}\n`);
                _this.returnMsg = `AudioCapturer read : Error: ${JSON.stringify(err)}\n`;
            }
            end = new Date().getTime();
        }
        //    await _this.capturer_.release()
        //    console.log(`AudioCapturer read end, state:${_this.capturer_.state}\n`)
        //_this.returnMsg = `AudioCapturer read end, state:${_this.capturer_.state}\n`
    }
    async playRecordDataStop() {
        if (this.capRender_ != null) {
            await this.capRender_.release();
            this.capRender_ = null;
        }
        this.capRenderState_ = 0;
        this.capRenderText_ = "播放录音数据";
    }
    async playRecordData() {
        let _this = this;
        _this.playRecordDataStop();
        if (this.capturerPath == "") {
            console.log(`AudioCapturer  尚未录音\n`);
            this.returnMsg = `AudioCapturer  尚未录音\n`;
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
        console.log(`playRecordData audioRendererOptions ${JSON.stringify(audioRendererOptions)} \n`);
        try {
            _this.capRender_ = await audio.createAudioRenderer(audioRendererOptions);
            console.log(`playRecordData audioRenderer  create success \n`);
            this.returnMsg = `playRecordData audioRenderer  create success \n`;
        }
        catch (err) {
            console.log(`playRecordData audioRenderer  create : Error: ${JSON.stringify(err)}\n`);
            this.returnMsg = `playRecordData audioRenderer  create : Error: ${JSON.stringify(err)}\n`;
            return;
        }
        let bufferSize;
        try {
            bufferSize = await _this.capRender_.getBufferSize();
            await _this.capRender_.start();
            console.log(`playRecordData audioRenderer  start success \n`);
            this.returnMsg = `playRecordData audioRenderer  start success \n`;
            _this.capRenderState_ = 1;
            _this.capRenderText_ = "正在播放录音数据";
        }
        catch (err) {
            console.log(`playRecordData audioRenderer  start : Error: ${JSON.stringify(err)}\n`);
            this.returnMsg = `playRecordData audioRenderer  start : Error: ${JSON.stringify(err)}\n`;
            return;
        }
        let path = this.capturerPath;
        try {
            console.log(`path:${path}\n`);
            let stat = await fs.stat(path);
            console.log(`stat:${JSON.stringify(stat)}\n`);
            console.log(`size:${stat.size}`);
            let len = stat.size % bufferSize == 0 ? Math.floor(stat.size / bufferSize) : Math.floor(stat.size / bufferSize + 1);
            let file = await fs.open(path, 0o0);
            console.log(`fd:${file.fd}\n`);
            let buf = new ArrayBuffer(bufferSize);
            console.log(`audioRenderer  write start.......... \n`);
            this.returnMsg = `audioRenderer  write start.......... \n`;
            for (let i = 0; i < len; i++) {
                let options = {
                    offset: i * bufferSize,
                    length: bufferSize
                };
                let readsize = await fs.read(file.fd, buf, options);
                let writeSize = await _this.capRender_.write(buf);
            }
            console.log(`audioRenderer  write end. \n`);
            this.returnMsg = `audioRenderer  write end. \n`;
        }
        catch (err) {
            console.log(`audioRenderer  write : Error: ${JSON.stringify(err)}\n`);
            this.returnMsg = `audioRenderer  write : Error: ${JSON.stringify(err)}\n`;
        }
        await _this.capRender_.release();
        _this.capRender_ = null;
        _this.capRenderState_ = 0;
        _this.capRenderText_ = "播放结束";
    }
    async getStreamInfo() {
        try {
            await this.capturer_.getStreamInfo((err, streamInfo) => {
                if (err) {
                    this.returnMsg = `getstreamInfo err = ${JSON.stringify(err)}`;
                    console.error('Failed to get stream info');
                }
                else {
                    this.returnMsg = `streamInfo : ${JSON.stringify(streamInfo)}`;
                    console.info('Capturer GetStreamInfo:');
                    console.info(`Capturer sampling rate: ${streamInfo.samplingRate}`);
                    console.info(`Capturer channel: ${streamInfo.channels}`);
                    console.info(`Capturer format: ${streamInfo.sampleFormat}`);
                    console.info(`Capturer encoding type: ${streamInfo.encodingType}`);
                }
            });
            this.StreamText = 'getStreamInfo';
        }
        catch (err) {
            console.log(`getstreamInfo err = ${JSON.stringify(err)}`);
            this.returnMsg = `getstreamInfo err = ${JSON.stringify(err)}`;
        }
    }
    render() {
        Column.create();
        Column.backgroundColor('#F1F3F5');
        //      Row() {
        //        Column() {
        //          Text("【音频内录】").fontWeight(FontWeight.Bolder).position({ x: 10, y: 5 }).fontSize(18)
        //        }.width('98%').height(40).backgroundColor(Color.Orange).position({ x: '1%' })
        //      }.position({ x: 0, y: 0 }).width('100%').zIndex(999)
        Row.create();
        //      Row() {
        //        Column() {
        //          Text("【音频内录】").fontWeight(FontWeight.Bolder).position({ x: 10, y: 5 }).fontSize(18)
        //        }.width('98%').height(40).backgroundColor(Color.Orange).position({ x: '1%' })
        //      }.position({ x: 0, y: 0 }).width('100%').zIndex(999)
        Row.position({ x: 0, y: 0 });
        //      Row() {
        //        Column() {
        //          Text("【音频内录】").fontWeight(FontWeight.Bolder).position({ x: 10, y: 5 }).fontSize(18)
        //        }.width('98%').height(40).backgroundColor(Color.Orange).position({ x: '1%' })
        //      }.position({ x: 0, y: 0 }).width('100%').zIndex(999)
        Row.width('100%');
        //      Row() {
        //        Column() {
        //          Text("【音频内录】").fontWeight(FontWeight.Bolder).position({ x: 10, y: 5 }).fontSize(18)
        //        }.width('98%').height(40).backgroundColor(Color.Orange).position({ x: '1%' })
        //      }.position({ x: 0, y: 0 }).width('100%').zIndex(999)
        Row.zIndex(999);
        Column.create();
        Column.width('98%');
        Column.height(120);
        Column.backgroundColor(Color.Orange);
        Column.position({ x: '1%' });
        Text.create("【音频内录】:");
        Text.fontWeight(FontWeight.Bolder);
        Text.position({ x: 10, y: 5 });
        Text.fontSize(18);
        Text.pop();
        Text.create(this.returnMsg);
        Text.position({ x: 10, y: 30 });
        Text.fontSize(14);
        Text.pop();
        Column.pop();
        //      Row() {
        //        Column() {
        //          Text("【音频内录】").fontWeight(FontWeight.Bolder).position({ x: 10, y: 5 }).fontSize(18)
        //        }.width('98%').height(40).backgroundColor(Color.Orange).position({ x: '1%' })
        //      }.position({ x: 0, y: 0 }).width('100%').zIndex(999)
        Row.pop();
        Scroll.create();
        Scroll.margin({ top: 50 });
        Scroll.width('100%');
        Column.create();
        Row.create();
        Row.margin({ top: 60 });
        Row.width('100%');
        //             全选按钮
        Flex.create({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center });
        CheckboxGroup.create({ group: 'checkboxGroup' });
        CheckboxGroup.selectedColor('#007DFF');
        CheckboxGroup.onChange((itemName: CheckboxGroupResult) => {
            console.info("checkbox group content" + JSON.stringify(itemName));
        });
        CheckboxGroup.pop();
        Text.create('Select All');
        Text.fontSize(14);
        Text.lineHeight(20);
        Text.fontColor('#182431');
        Text.fontWeight(500);
        Text.pop();
        //             全选按钮
        Flex.pop();
        Row.pop();
        Row.create();
        // 选项1:STREAM_USAGE_MEDIA
        Flex.create({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center });
        // 选项1:STREAM_USAGE_MEDIA
        Flex.margin({ left: 28 });
        Checkbox.create({ name: 'CheckBox_media', group: 'checkboxGroup' });
        Checkbox.selectedColor('#007DFF');
        Checkbox.onChange((value: boolean) => {
            console.info('Checkbox1 change is' + value);
            if (value) {
                this.rendererSelectState_[RENDER_MEDIA_IDX] = 1;
            }
            else {
                this.rendererSelectState_[RENDER_MEDIA_IDX] = 0;
            }
        });
        Checkbox.pop();
        Text.create('MEDIA');
        Text.fontSize(12);
        Text.lineHeight(20);
        Text.fontColor('#182431');
        Text.fontWeight(500);
        Text.pop();
        Select.create([{ value: '0' }, { value: '1' }]);
        Select.value('privacy(def:0)');
        Select.font({ size: 16, weight: 200 });
        Select.fontColor('#ff0b3f75');
        Select.selectedOptionFont({ size: 12, weight: 100 });
        Select.optionFont({ size: 12, weight: 400 });
        Select.onSelect((index: number) => {
            console.info('Select:' + index);
            this.rendererPrivacy_[RENDER_MEDIA_IDX] = index;
        });
        Select.margin({ left: 5 });
        Select.pop();
        Select.create([{ value: '0' }, { value: '1' }]);
        Select.value('capturer?');
        Select.font({ size: 16, weight: 200 });
        Select.fontColor('#ff0b3f75');
        Select.selectedOptionFont({ size: 12, weight: 100 });
        Select.optionFont({ size: 12, weight: 400 });
        Select.onSelect((index: number) => {
            console.info('Select:' + index);
            this.capturerFilter_[RENDER_MEDIA_IDX] = index;
        });
        Select.margin({ left: 5 });
        Select.pop();
        // 选项1:STREAM_USAGE_MEDIA
        Flex.pop();
        Row.pop();
        Row.create();
        // 选项2:STREAM_USAGE_ALARM
        Flex.create({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center });
        // 选项2:STREAM_USAGE_ALARM
        Flex.margin({ left: 28 });
        Checkbox.create({ name: 'CheckBox_alarm', group: 'checkboxGroup' });
        Checkbox.selectedColor('#007DFF');
        Checkbox.onChange((value: boolean) => {
            console.info('Checkbox2 change is' + value);
            if (value) {
                this.rendererSelectState_[RENDER_ALARM_IDX] = 1;
            }
            else {
                this.rendererSelectState_[RENDER_ALARM_IDX] = 0;
            }
        });
        Checkbox.pop();
        Text.create('ALARM');
        Text.fontSize(12);
        Text.lineHeight(20);
        Text.fontColor('#182431');
        Text.fontWeight(500);
        Text.pop();
        Select.create([{ value: '0' }, { value: '1' }]);
        Select.value('privacy(def:0)');
        Select.font({ size: 16, weight: 200 });
        Select.fontColor('#ff0b3f75');
        Select.selectedOptionFont({ size: 12, weight: 100 });
        Select.optionFont({ size: 12, weight: 400 });
        Select.onSelect((index: number) => {
            console.info('Select:' + index);
            this.rendererPrivacy_[RENDER_ALARM_IDX] = index;
        });
        Select.margin({ left: 5 });
        Select.pop();
        Select.create([{ value: '0' }, { value: '1' }]);
        Select.value('capturer?');
        Select.font({ size: 16, weight: 200 });
        Select.fontColor('#ff0b3f75');
        Select.selectedOptionFont({ size: 12, weight: 100 });
        Select.optionFont({ size: 12, weight: 400 });
        Select.onSelect((index: number) => {
            console.info('Select:' + index);
            this.capturerFilter_[RENDER_ALARM_IDX] = index;
        });
        Select.margin({ left: 5 });
        Select.pop();
        // 选项2:STREAM_USAGE_ALARM
        Flex.pop();
        Row.pop();
        Row.create();
        // 选项3:STREAM_USAGE_VOICE_ASSISTANT
        Flex.create({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center });
        // 选项3:STREAM_USAGE_VOICE_ASSISTANT
        Flex.margin({ left: 28 });
        Checkbox.create({ name: 'CheckBox_ass', group: 'checkboxGroup' });
        Checkbox.selectedColor('#007DFF');
        Checkbox.onChange((value: boolean) => {
            console.info('Checkbox2 change is' + value);
            if (value) {
                this.rendererSelectState_[RENDER_ASS_IDX] = 1;
            }
            else {
                this.rendererSelectState_[RENDER_ASS_IDX] = 0;
            }
        });
        Checkbox.pop();
        Text.create('VOICE_ASSISTANT');
        Text.fontSize(12);
        Text.lineHeight(20);
        Text.fontColor('#182431');
        Text.fontWeight(500);
        Text.pop();
        Select.create([{ value: '0' }, { value: '1' }]);
        Select.value('privacy(def:0)');
        Select.font({ size: 16, weight: 200 });
        Select.fontColor('#ff0b3f75');
        Select.selectedOptionFont({ size: 12, weight: 100 });
        Select.optionFont({ size: 12, weight: 400 });
        Select.onSelect((index: number) => {
            console.info('Select:' + index);
            this.rendererPrivacy_[RENDER_ASS_IDX] = index;
        });
        Select.margin({ left: 5 });
        Select.pop();
        Select.create([{ value: '0' }, { value: '1' }]);
        Select.value('capturer?');
        Select.font({ size: 16, weight: 200 });
        Select.fontColor('#ff0b3f75');
        Select.selectedOptionFont({ size: 12, weight: 100 });
        Select.optionFont({ size: 12, weight: 400 });
        Select.onSelect((index: number) => {
            console.info('Select:' + index);
            this.capturerFilter_[RENDER_ASS_IDX] = index;
        });
        Select.margin({ left: 5 });
        Select.pop();
        // 选项3:STREAM_USAGE_VOICE_ASSISTANT
        Flex.pop();
        Row.pop();
        Row.create();
        // 选项4:STREAM_USAGE_VOICE_COMMUNICATION
        Flex.create({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center });
        // 选项4:STREAM_USAGE_VOICE_COMMUNICATION
        Flex.margin({ left: 28 });
        Checkbox.create({ name: 'CheckBox_voice', group: 'checkboxGroup' });
        Checkbox.selectedColor('#007DFF');
        Checkbox.onChange((value: boolean) => {
            console.info('Checkbox2 change is' + value);
            if (value) {
                this.rendererSelectState_[RENDER_VOICE_IDX] = 1;
            }
            else {
                this.rendererSelectState_[RENDER_VOICE_IDX] = 0;
            }
        });
        Checkbox.pop();
        Text.create('VOICE_CALL');
        Text.fontSize(12);
        Text.lineHeight(20);
        Text.fontColor('#182431');
        Text.fontWeight(500);
        Text.pop();
        Select.create([{ value: '0' }, { value: '1' }]);
        Select.value('privacy(def:0)');
        Select.font({ size: 16, weight: 200 });
        Select.fontColor('#ff0b3f75');
        Select.selectedOptionFont({ size: 12, weight: 100 });
        Select.optionFont({ size: 12, weight: 400 });
        Select.onSelect((index: number) => {
            console.info('Select:' + index);
            this.rendererPrivacy_[RENDER_VOICE_IDX] = index;
        });
        Select.margin({ left: 5 });
        Select.pop();
        Select.create([{ value: '0' }, { value: '1' }]);
        Select.value('capturer?');
        Select.font({ size: 16, weight: 200 });
        Select.fontColor('#ff0b3f75');
        Select.selectedOptionFont({ size: 12, weight: 100 });
        Select.optionFont({ size: 12, weight: 400 });
        Select.onSelect((index: number) => {
            console.info('Select:' + index);
            this.capturerFilter_[RENDER_VOICE_IDX] = index;
        });
        Select.margin({ left: 5 });
        Select.pop();
        // 选项4:STREAM_USAGE_VOICE_COMMUNICATION
        Flex.pop();
        Row.pop();
        Row.create();
        // 选项5:STREAM_USAGE_UNKNOWN
        Flex.create({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center });
        // 选项5:STREAM_USAGE_UNKNOWN
        Flex.margin({ left: 28 });
        Checkbox.create({ name: 'CheckBox_voice', group: 'checkboxGroup' });
        Checkbox.selectedColor('#007DFF');
        Checkbox.onChange((value: boolean) => {
            console.info('Checkbox2 change is' + value);
            if (value) {
                this.rendererSelectState_[RENDER_UNKNOWN_IDX] = 1;
            }
            else {
                this.rendererSelectState_[RENDER_UNKNOWN_IDX] = 0;
            }
        });
        Checkbox.pop();
        Text.create('UNKNOWN');
        Text.fontSize(12);
        Text.lineHeight(20);
        Text.fontColor('#182431');
        Text.fontWeight(500);
        Text.pop();
        Select.create([{ value: '0' }, { value: '1' }]);
        Select.value('privacy(def:0)');
        Select.font({ size: 16, weight: 200 });
        Select.fontColor('#ff0b3f75');
        Select.selectedOptionFont({ size: 12, weight: 100 });
        Select.optionFont({ size: 12, weight: 400 });
        Select.onSelect((index: number) => {
            console.info('Select:' + index);
            this.rendererPrivacy_[RENDER_UNKNOWN_IDX] = index;
        });
        Select.margin({ left: 5 });
        Select.pop();
        Select.create([{ value: '0' }, { value: '1' }]);
        Select.value('capturer?');
        Select.font({ size: 16, weight: 200 });
        Select.fontColor('#ff0b3f75');
        Select.selectedOptionFont({ size: 12, weight: 100 });
        Select.optionFont({ size: 12, weight: 400 });
        Select.onSelect((index: number) => {
            console.info('Select:' + index);
            this.capturerFilter_[RENDER_UNKNOWN_IDX] = index;
        });
        Select.margin({ left: 5 });
        Select.pop();
        // 选项5:STREAM_USAGE_UNKNOWN
        Flex.pop();
        Row.pop();
        Row.create();
        // 选项6:STREAM_USAGE_MUSIC
        Flex.create({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center });
        // 选项6:STREAM_USAGE_MUSIC
        Flex.margin({ left: 28 });
        Checkbox.create({ name: 'CheckBox_voice', group: 'checkboxGroup' });
        Checkbox.selectedColor('#007DFF');
        Checkbox.onChange((value: boolean) => {
            console.info('Checkbox2 change is' + value);
            if (value) {
                this.rendererSelectState_[RENDER_MUSIC_IDX] = 1;
            }
            else {
                this.rendererSelectState_[RENDER_MUSIC_IDX] = 0;
            }
        });
        Checkbox.pop();
        Text.create('MUSIC');
        Text.fontSize(12);
        Text.lineHeight(20);
        Text.fontColor('#182431');
        Text.fontWeight(500);
        Text.pop();
        Select.create([{ value: '0' }, { value: '1' }]);
        Select.value('privacy(def:0)');
        Select.font({ size: 16, weight: 200 });
        Select.fontColor('#ff0b3f75');
        Select.selectedOptionFont({ size: 12, weight: 100 });
        Select.optionFont({ size: 12, weight: 400 });
        Select.onSelect((index: number) => {
            console.info('Select:' + index);
            this.rendererPrivacy_[RENDER_MUSIC_IDX] = index;
        });
        Select.margin({ left: 5 });
        Select.pop();
        Select.create([{ value: '0' }, { value: '1' }]);
        Select.value('capturer?');
        Select.font({ size: 16, weight: 200 });
        Select.fontColor('#ff0b3f75');
        Select.selectedOptionFont({ size: 12, weight: 100 });
        Select.optionFont({ size: 12, weight: 400 });
        Select.onSelect((index: number) => {
            console.info('Select:' + index);
            this.capturerFilter_[RENDER_MUSIC_IDX] = index;
        });
        Select.margin({ left: 5 });
        Select.pop();
        // 选项6:STREAM_USAGE_MUSIC
        Flex.pop();
        Row.pop();
        Row.create();
        // 选项7:STREAM_USAGE_VOICE_MESSAGE
        Flex.create({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center });
        // 选项7:STREAM_USAGE_VOICE_MESSAGE
        Flex.margin({ left: 28 });
        Checkbox.create({ name: 'CheckBox_voice', group: 'checkboxGroup' });
        Checkbox.selectedColor('#007DFF');
        Checkbox.onChange((value: boolean) => {
            console.info('Checkbox2 change is' + value);
            if (value) {
                this.rendererSelectState_[RENDER_VOICE_MESSAGE_IDX] = 1;
            }
            else {
                this.rendererSelectState_[RENDER_VOICE_MESSAGE_IDX] = 0;
            }
        });
        Checkbox.pop();
        Text.create('VOICE_MESSAGE');
        Text.fontSize(12);
        Text.lineHeight(20);
        Text.fontColor('#182431');
        Text.fontWeight(500);
        Text.pop();
        Select.create([{ value: '0' }, { value: '1' }]);
        Select.value('privacy(def:0)');
        Select.font({ size: 16, weight: 200 });
        Select.fontColor('#ff0b3f75');
        Select.selectedOptionFont({ size: 12, weight: 100 });
        Select.optionFont({ size: 12, weight: 400 });
        Select.onSelect((index: number) => {
            console.info('Select:' + index);
            this.rendererPrivacy_[RENDER_VOICE_MESSAGE_IDX] = index;
        });
        Select.margin({ left: 5 });
        Select.pop();
        Select.create([{ value: '0' }, { value: '1' }]);
        Select.value('capturer?');
        Select.font({ size: 16, weight: 200 });
        Select.fontColor('#ff0b3f75');
        Select.selectedOptionFont({ size: 12, weight: 100 });
        Select.optionFont({ size: 12, weight: 400 });
        Select.onSelect((index: number) => {
            console.info('Select:' + index);
            this.capturerFilter_[RENDER_VOICE_MESSAGE_IDX] = index;
        });
        Select.margin({ left: 5 });
        Select.pop();
        // 选项7:STREAM_USAGE_VOICE_MESSAGE
        Flex.pop();
        Row.pop();
        Row.create();
        // 选项8:STREAM_USAGE_RINGTONE
        Flex.create({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center });
        // 选项8:STREAM_USAGE_RINGTONE
        Flex.margin({ left: 28 });
        Checkbox.create({ name: 'CheckBox_voice', group: 'checkboxGroup' });
        Checkbox.selectedColor('#007DFF');
        Checkbox.onChange((value: boolean) => {
            console.info('Checkbox2 change is' + value);
            if (value) {
                this.rendererSelectState_[RENDER_RINGTONE_IDX] = 1;
            }
            else {
                this.rendererSelectState_[RENDER_RINGTONE_IDX] = 0;
            }
        });
        Checkbox.pop();
        Text.create('RINGTONE');
        Text.fontSize(12);
        Text.lineHeight(20);
        Text.fontColor('#182431');
        Text.fontWeight(500);
        Text.pop();
        Select.create([{ value: '0' }, { value: '1' }]);
        Select.value('privacy(def:0)');
        Select.font({ size: 16, weight: 200 });
        Select.fontColor('#ff0b3f75');
        Select.selectedOptionFont({ size: 12, weight: 100 });
        Select.optionFont({ size: 12, weight: 400 });
        Select.onSelect((index: number) => {
            console.info('Select:' + index);
            this.rendererPrivacy_[RENDER_RINGTONE_IDX] = index;
        });
        Select.margin({ left: 5 });
        Select.pop();
        Select.create([{ value: '0' }, { value: '1' }]);
        Select.value('capturer?');
        Select.font({ size: 16, weight: 200 });
        Select.fontColor('#ff0b3f75');
        Select.selectedOptionFont({ size: 12, weight: 100 });
        Select.optionFont({ size: 12, weight: 400 });
        Select.onSelect((index: number) => {
            console.info('Select:' + index);
            this.capturerFilter_[RENDER_RINGTONE_IDX] = index;
        });
        Select.margin({ left: 5 });
        Select.pop();
        // 选项8:STREAM_USAGE_RINGTONE
        Flex.pop();
        Row.pop();
        Row.create();
        // 选项9:STREAM_USAGE_NOTIFICATION
        Flex.create({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center });
        // 选项9:STREAM_USAGE_NOTIFICATION
        Flex.margin({ left: 28 });
        Checkbox.create({ name: 'CheckBox_voice', group: 'checkboxGroup' });
        Checkbox.selectedColor('#007DFF');
        Checkbox.onChange((value: boolean) => {
            console.info('Checkbox2 change is' + value);
            if (value) {
                this.rendererSelectState_[RENDER_NOTIFICATION_IDX] = 1;
            }
            else {
                this.rendererSelectState_[RENDER_NOTIFICATION_IDX] = 0;
            }
        });
        Checkbox.pop();
        Text.create('NOTIFICATION');
        Text.fontSize(12);
        Text.lineHeight(20);
        Text.fontColor('#182431');
        Text.fontWeight(500);
        Text.pop();
        Select.create([{ value: '0' }, { value: '1' }]);
        Select.value('privacy(def:0)');
        Select.font({ size: 16, weight: 200 });
        Select.fontColor('#ff0b3f75');
        Select.selectedOptionFont({ size: 12, weight: 100 });
        Select.optionFont({ size: 12, weight: 400 });
        Select.onSelect((index: number) => {
            console.info('Select:' + index);
            this.rendererPrivacy_[RENDER_NOTIFICATION_IDX] = index;
        });
        Select.margin({ left: 5 });
        Select.pop();
        Select.create([{ value: '0' }, { value: '1' }]);
        Select.value('capturer?');
        Select.font({ size: 16, weight: 200 });
        Select.fontColor('#ff0b3f75');
        Select.selectedOptionFont({ size: 12, weight: 100 });
        Select.optionFont({ size: 12, weight: 400 });
        Select.onSelect((index: number) => {
            console.info('Select:' + index);
            this.capturerFilter_[RENDER_NOTIFICATION_IDX] = index;
        });
        Select.margin({ left: 5 });
        Select.pop();
        // 选项9:STREAM_USAGE_NOTIFICATION
        Flex.pop();
        Row.pop();
        Row.create();
        // 选项10:STREAM_USAGE_ACCESSIBILITY
        Flex.create({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center });
        // 选项10:STREAM_USAGE_ACCESSIBILITY
        Flex.margin({ left: 28 });
        Checkbox.create({ name: 'CheckBox_voice', group: 'checkboxGroup' });
        Checkbox.selectedColor('#007DFF');
        Checkbox.onChange((value: boolean) => {
            console.info('Checkbox2 change is' + value);
            if (value) {
                this.rendererSelectState_[RENDER_ACCESSIBILITY_IDX] = 1;
            }
            else {
                this.rendererSelectState_[RENDER_ACCESSIBILITY_IDX] = 0;
            }
        });
        Checkbox.pop();
        Text.create('ACCESSIBILITY');
        Text.fontSize(12);
        Text.lineHeight(20);
        Text.fontColor('#182431');
        Text.fontWeight(500);
        Text.pop();
        Select.create([{ value: '0' }, { value: '1' }]);
        Select.value('privacy(def:0)');
        Select.font({ size: 16, weight: 200 });
        Select.fontColor('#ff0b3f75');
        Select.selectedOptionFont({ size: 12, weight: 100 });
        Select.optionFont({ size: 12, weight: 400 });
        Select.onSelect((index: number) => {
            console.info('Select:' + index);
            this.rendererPrivacy_[RENDER_ACCESSIBILITY_IDX] = index;
        });
        Select.margin({ left: 5 });
        Select.pop();
        Select.create([{ value: '0' }, { value: '1' }]);
        Select.value('capturer?');
        Select.font({ size: 16, weight: 200 });
        Select.fontColor('#ff0b3f75');
        Select.selectedOptionFont({ size: 12, weight: 100 });
        Select.optionFont({ size: 12, weight: 400 });
        Select.onSelect((index: number) => {
            console.info('Select:' + index);
            this.capturerFilter_[RENDER_ACCESSIBILITY_IDX] = index;
        });
        Select.margin({ left: 5 });
        Select.pop();
        // 选项10:STREAM_USAGE_ACCESSIBILITY
        Flex.pop();
        Row.pop();
        Row.create();
        // 选项11:STREAM_USAGE_SYSTEM
        Flex.create({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center });
        // 选项11:STREAM_USAGE_SYSTEM
        Flex.margin({ left: 28 });
        Checkbox.create({ name: 'CheckBox_voice', group: 'checkboxGroup' });
        Checkbox.selectedColor('#007DFF');
        Checkbox.onChange((value: boolean) => {
            console.info('Checkbox2 change is' + value);
            if (value) {
                this.rendererSelectState_[RENDER_SYSTEM_IDX] = 1;
            }
            else {
                this.rendererSelectState_[RENDER_SYSTEM_IDX] = 0;
            }
        });
        Checkbox.pop();
        Text.create('SYSTEM');
        Text.fontSize(12);
        Text.lineHeight(20);
        Text.fontColor('#182431');
        Text.fontWeight(500);
        Text.pop();
        Select.create([{ value: '0' }, { value: '1' }]);
        Select.value('privacy(def:0)');
        Select.font({ size: 16, weight: 200 });
        Select.fontColor('#ff0b3f75');
        Select.selectedOptionFont({ size: 12, weight: 100 });
        Select.optionFont({ size: 12, weight: 400 });
        Select.onSelect((index: number) => {
            console.info('Select:' + index);
            this.rendererPrivacy_[RENDER_SYSTEM_IDX] = index;
        });
        Select.margin({ left: 5 });
        Select.pop();
        Select.create([{ value: '0' }, { value: '1' }]);
        Select.value('capturer?');
        Select.font({ size: 16, weight: 200 });
        Select.fontColor('#ff0b3f75');
        Select.selectedOptionFont({ size: 12, weight: 100 });
        Select.optionFont({ size: 12, weight: 400 });
        Select.onSelect((index: number) => {
            console.info('Select:' + index);
            this.capturerFilter_[RENDER_SYSTEM_IDX] = index;
        });
        Select.margin({ left: 5 });
        Select.pop();
        // 选项11:STREAM_USAGE_SYSTEM
        Flex.pop();
        Row.pop();
        Row.create();
        // 选项12:STREAM_USAGE_GAME
        Flex.create({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center });
        // 选项12:STREAM_USAGE_GAME
        Flex.margin({ left: 28 });
        Checkbox.create({ name: 'CheckBox_voice', group: 'checkboxGroup' });
        Checkbox.selectedColor('#007DFF');
        Checkbox.onChange((value: boolean) => {
            console.info('Checkbox2 change is' + value);
            if (value) {
                this.rendererSelectState_[RENDER_GAME_IDX] = 1;
            }
            else {
                this.rendererSelectState_[RENDER_GAME_IDX] = 0;
            }
        });
        Checkbox.pop();
        Text.create('GAME');
        Text.fontSize(12);
        Text.lineHeight(20);
        Text.fontColor('#182431');
        Text.fontWeight(500);
        Text.pop();
        Select.create([{ value: '0' }, { value: '1' }]);
        Select.value('privacy(def:0)');
        Select.font({ size: 16, weight: 200 });
        Select.fontColor('#ff0b3f75');
        Select.selectedOptionFont({ size: 12, weight: 100 });
        Select.optionFont({ size: 12, weight: 400 });
        Select.onSelect((index: number) => {
            console.info('Select:' + index);
            this.rendererPrivacy_[RENDER_GAME_IDX] = index;
        });
        Select.margin({ left: 5 });
        Select.pop();
        Select.create([{ value: '0' }, { value: '1' }]);
        Select.value('capturer?');
        Select.font({ size: 16, weight: 200 });
        Select.fontColor('#ff0b3f75');
        Select.selectedOptionFont({ size: 12, weight: 100 });
        Select.optionFont({ size: 12, weight: 400 });
        Select.onSelect((index: number) => {
            console.info('Select:' + index);
            this.capturerFilter_[RENDER_GAME_IDX] = index;
        });
        Select.margin({ left: 5 });
        Select.pop();
        // 选项12:STREAM_USAGE_GAME
        Flex.pop();
        Row.pop();
        Row.create();
        // 选项13:STREAM_USAGE_AUDIOBOOK
        Flex.create({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center });
        // 选项13:STREAM_USAGE_AUDIOBOOK
        Flex.margin({ left: 28 });
        Checkbox.create({ name: 'CheckBox_voice', group: 'checkboxGroup' });
        Checkbox.selectedColor('#007DFF');
        Checkbox.onChange((value: boolean) => {
            console.info('Checkbox2 change is' + value);
            if (value) {
                this.rendererSelectState_[RENDER_AUDIOBOOK_IDX] = 1;
            }
            else {
                this.rendererSelectState_[RENDER_AUDIOBOOK_IDX] = 0;
            }
        });
        Checkbox.pop();
        Text.create('AUDIOBOOK');
        Text.fontSize(12);
        Text.lineHeight(20);
        Text.fontColor('#182431');
        Text.fontWeight(500);
        Text.pop();
        Select.create([{ value: '0' }, { value: '1' }]);
        Select.value('privacy(def:0)');
        Select.font({ size: 16, weight: 200 });
        Select.fontColor('#ff0b3f75');
        Select.selectedOptionFont({ size: 12, weight: 100 });
        Select.optionFont({ size: 12, weight: 400 });
        Select.onSelect((index: number) => {
            console.info('Select:' + index);
            this.rendererPrivacy_[RENDER_AUDIOBOOK_IDX] = index;
        });
        Select.margin({ left: 5 });
        Select.pop();
        Select.create([{ value: '0' }, { value: '1' }]);
        Select.value('capturer?');
        Select.font({ size: 16, weight: 200 });
        Select.fontColor('#ff0b3f75');
        Select.selectedOptionFont({ size: 12, weight: 100 });
        Select.optionFont({ size: 12, weight: 400 });
        Select.onSelect((index: number) => {
            console.info('Select:' + index);
            this.capturerFilter_[RENDER_AUDIOBOOK_IDX] = index;
        });
        Select.margin({ left: 5 });
        Select.pop();
        // 选项13:STREAM_USAGE_AUDIOBOOK
        Flex.pop();
        Row.pop();
        Row.create();
        // 选项14:STREAM_USAGE_NAVIGATION
        Flex.create({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center });
        // 选项14:STREAM_USAGE_NAVIGATION
        Flex.margin({ left: 28 });
        Checkbox.create({ name: 'CheckBox_voice', group: 'checkboxGroup' });
        Checkbox.selectedColor('#007DFF');
        Checkbox.onChange((value: boolean) => {
            console.info('Checkbox2 change is' + value);
            if (value) {
                this.rendererSelectState_[RENDER_NAVIGATION_IDX] = 1;
            }
            else {
                this.rendererSelectState_[RENDER_NAVIGATION_IDX] = 0;
            }
        });
        Checkbox.pop();
        Text.create('NAVIGATION');
        Text.fontSize(12);
        Text.lineHeight(20);
        Text.fontColor('#182431');
        Text.fontWeight(500);
        Text.pop();
        Select.create([{ value: '0' }, { value: '1' }]);
        Select.value('privacy(def:0)');
        Select.font({ size: 16, weight: 200 });
        Select.fontColor('#ff0b3f75');
        Select.selectedOptionFont({ size: 12, weight: 100 });
        Select.optionFont({ size: 12, weight: 400 });
        Select.onSelect((index: number) => {
            console.info('Select:' + index);
            this.rendererPrivacy_[RENDER_NAVIGATION_IDX] = index;
        });
        Select.margin({ left: 5 });
        Select.pop();
        Select.create([{ value: '0' }, { value: '1' }]);
        Select.value('capturer?');
        Select.font({ size: 16, weight: 200 });
        Select.fontColor('#ff0b3f75');
        Select.selectedOptionFont({ size: 12, weight: 100 });
        Select.optionFont({ size: 12, weight: 400 });
        Select.onSelect((index: number) => {
            console.info('Select:' + index);
            this.capturerFilter_[RENDER_NAVIGATION_IDX] = index;
        });
        Select.margin({ left: 5 });
        Select.pop();
        // 选项14:STREAM_USAGE_NAVIGATION
        Flex.pop();
        Row.pop();
        Row.create();
        // 选项15:STREAM_USAGE_DTMF
        Flex.create({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center });
        // 选项15:STREAM_USAGE_DTMF
        Flex.margin({ left: 28 });
        Checkbox.create({ name: 'CheckBox_voice', group: 'checkboxGroup' });
        Checkbox.selectedColor('#007DFF');
        Checkbox.onChange((value: boolean) => {
            console.info('Checkbox2 change is' + value);
            if (value) {
                this.rendererSelectState_[RENDER_DTMF_IDX] = 1;
            }
            else {
                this.rendererSelectState_[RENDER_DTMF_IDX] = 0;
            }
        });
        Checkbox.pop();
        Text.create('DTMF');
        Text.fontSize(12);
        Text.lineHeight(20);
        Text.fontColor('#182431');
        Text.fontWeight(500);
        Text.pop();
        Select.create([{ value: '0' }, { value: '1' }]);
        Select.value('privacy(def:0)');
        Select.font({ size: 16, weight: 200 });
        Select.fontColor('#ff0b3f75');
        Select.selectedOptionFont({ size: 12, weight: 100 });
        Select.optionFont({ size: 12, weight: 400 });
        Select.onSelect((index: number) => {
            console.info('Select:' + index);
            this.rendererPrivacy_[RENDER_DTMF_IDX] = index;
        });
        Select.margin({ left: 5 });
        Select.pop();
        Select.create([{ value: '0' }, { value: '1' }]);
        Select.value('capturer?');
        Select.font({ size: 16, weight: 200 });
        Select.fontColor('#ff0b3f75');
        Select.selectedOptionFont({ size: 12, weight: 100 });
        Select.optionFont({ size: 12, weight: 400 });
        Select.onSelect((index: number) => {
            console.info('Select:' + index);
            this.capturerFilter_[RENDER_DTMF_IDX] = index;
        });
        Select.margin({ left: 5 });
        Select.pop();
        // 选项15:STREAM_USAGE_DTMF
        Flex.pop();
        Row.pop();
        Row.create();
        // 选项16:STREAM_USAGE_ENFORCED_TONE
        Flex.create({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center });
        // 选项16:STREAM_USAGE_ENFORCED_TONE
        Flex.margin({ left: 28 });
        Checkbox.create({ name: 'CheckBox_voice', group: 'checkboxGroup' });
        Checkbox.selectedColor('#007DFF');
        Checkbox.onChange((value: boolean) => {
            console.info('Checkbox2 change is' + value);
            if (value) {
                this.rendererSelectState_[RENDER_ENFORCED_TONE_IDX] = 1;
            }
            else {
                this.rendererSelectState_[RENDER_ENFORCED_TONE_IDX] = 0;
            }
        });
        Checkbox.pop();
        Text.create('ENFORCED_TONE');
        Text.fontSize(12);
        Text.lineHeight(20);
        Text.fontColor('#182431');
        Text.fontWeight(500);
        Text.pop();
        Select.create([{ value: '0' }, { value: '1' }]);
        Select.value('privacy(def:0)');
        Select.font({ size: 16, weight: 200 });
        Select.fontColor('#ff0b3f75');
        Select.selectedOptionFont({ size: 12, weight: 100 });
        Select.optionFont({ size: 12, weight: 400 });
        Select.onSelect((index: number) => {
            console.info('Select:' + index);
            this.rendererPrivacy_[RENDER_ENFORCED_TONE_IDX] = index;
        });
        Select.margin({ left: 5 });
        Select.pop();
        Select.create([{ value: '0' }, { value: '1' }]);
        Select.value('capturer?');
        Select.font({ size: 16, weight: 200 });
        Select.fontColor('#ff0b3f75');
        Select.selectedOptionFont({ size: 12, weight: 100 });
        Select.optionFont({ size: 12, weight: 400 });
        Select.onSelect((index: number) => {
            console.info('Select:' + index);
            this.capturerFilter_[RENDER_ENFORCED_TONE_IDX] = index;
        });
        Select.margin({ left: 5 });
        Select.pop();
        // 选项16:STREAM_USAGE_ENFORCED_TONE
        Flex.pop();
        Row.pop();
        Row.create();
        // 选项17:STREAM_USAGE_ULTRASONIC
        Flex.create({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center });
        // 选项17:STREAM_USAGE_ULTRASONIC
        Flex.margin({ left: 28 });
        Checkbox.create({ name: 'CheckBox_voice', group: 'checkboxGroup' });
        Checkbox.selectedColor('#007DFF');
        Checkbox.onChange((value: boolean) => {
            console.info('Checkbox2 change is' + value);
            if (value) {
                this.rendererSelectState_[RENDER_ULTRASONIC_IDX] = 1;
            }
            else {
                this.rendererSelectState_[RENDER_ULTRASONIC_IDX] = 0;
            }
        });
        Checkbox.pop();
        Text.create('ULTRASONIC');
        Text.fontSize(12);
        Text.lineHeight(20);
        Text.fontColor('#182431');
        Text.fontWeight(500);
        Text.pop();
        Select.create([{ value: '0' }, { value: '1' }]);
        Select.value('privacy(def:0)');
        Select.font({ size: 16, weight: 200 });
        Select.fontColor('#ff0b3f75');
        Select.selectedOptionFont({ size: 12, weight: 100 });
        Select.optionFont({ size: 12, weight: 400 });
        Select.onSelect((index: number) => {
            console.info('Select:' + index);
            this.rendererPrivacy_[RENDER_ULTRASONIC_IDX] = index;
        });
        Select.margin({ left: 5 });
        Select.pop();
        Select.create([{ value: '0' }, { value: '1' }]);
        Select.value('capturer?');
        Select.font({ size: 16, weight: 200 });
        Select.fontColor('#ff0b3f75');
        Select.selectedOptionFont({ size: 12, weight: 100 });
        Select.optionFont({ size: 12, weight: 400 });
        Select.onSelect((index: number) => {
            console.info('Select:' + index);
            this.capturerFilter_[RENDER_ULTRASONIC_IDX] = index;
        });
        Select.margin({ left: 5 });
        Select.pop();
        // 选项17:STREAM_USAGE_ULTRASONIC
        Flex.pop();
        Row.pop();
        Row.create();
        //             选项18:STREAM_USAGE_NOTIFICATION_RINGTONE
        Flex.create({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center });
        //             选项18:STREAM_USAGE_NOTIFICATION_RINGTONE
        Flex.margin({ left: 28 });
        Checkbox.create({ name: 'CheckBox_voice', group: 'checkboxGroup' });
        Checkbox.selectedColor('#007DFF');
        Checkbox.onChange((value: boolean) => {
            console.info('Checkbox2 change is' + value);
            if (value) {
                this.rendererSelectState_[RENDER_NOTIFICATION_RINGTONE_IDX] = 1;
            }
            else {
                this.rendererSelectState_[RENDER_NOTIFICATION_RINGTONE_IDX] = 0;
            }
        });
        Checkbox.pop();
        Text.create('NOTIFICATION_RINGTONE');
        Text.fontSize(12);
        Text.lineHeight(20);
        Text.fontColor('#182431');
        Text.fontWeight(500);
        Text.pop();
        Select.create([{ value: '0' }, { value: '1' }]);
        Select.value('privacy(def:0)');
        Select.font({ size: 16, weight: 200 });
        Select.fontColor('#ff0b3f75');
        Select.selectedOptionFont({ size: 12, weight: 100 });
        Select.optionFont({ size: 12, weight: 400 });
        Select.onSelect((index: number) => {
            console.info('Select:' + index);
            this.rendererPrivacy_[RENDER_NOTIFICATION_RINGTONE_IDX] = index;
        });
        Select.margin({ left: 5 });
        Select.pop();
        Select.create([{ value: '0' }, { value: '1' }]);
        Select.value('capturer?');
        Select.font({ size: 16, weight: 200 });
        Select.fontColor('#ff0b3f75');
        Select.selectedOptionFont({ size: 12, weight: 100 });
        Select.optionFont({ size: 12, weight: 400 });
        Select.onSelect((index: number) => {
            console.info('Select:' + index);
            this.capturerFilter_[RENDER_NOTIFICATION_RINGTONE_IDX] = index;
        });
        Select.margin({ left: 5 });
        Select.pop();
        //             选项18:STREAM_USAGE_NOTIFICATION_RINGTONE
        Flex.pop();
        Row.pop();
        Row.create();
        // 选项19:STREAM_USAGE_MOVIE
        Flex.create({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center });
        // 选项19:STREAM_USAGE_MOVIE
        Flex.margin({ left: 28 });
        Checkbox.create({ name: 'CheckBox_voice', group: 'checkboxGroup' });
        Checkbox.selectedColor('#007DFF');
        Checkbox.onChange((value: boolean) => {
            console.info('Checkbox2 change is' + value);
            if (value) {
                this.rendererSelectState_[RENDER_MOVIE_IDX] = 1;
            }
            else {
                this.rendererSelectState_[RENDER_MOVIE_IDX] = 0;
            }
        });
        Checkbox.pop();
        Text.create('MOVIE');
        Text.fontSize(12);
        Text.lineHeight(20);
        Text.fontColor('#182431');
        Text.fontWeight(500);
        Text.pop();
        Select.create([{ value: '0' }, { value: '1' }]);
        Select.value('privacy(def:0)');
        Select.font({ size: 16, weight: 200 });
        Select.fontColor('#ff0b3f75');
        Select.selectedOptionFont({ size: 12, weight: 100 });
        Select.optionFont({ size: 12, weight: 400 });
        Select.onSelect((index: number) => {
            console.info('Select:' + index);
            this.rendererPrivacy_[RENDER_MOVIE_IDX] = index;
        });
        Select.margin({ left: 5 });
        Select.pop();
        Select.create([{ value: '0' }, { value: '1' }]);
        Select.value('capturer?');
        Select.font({ size: 16, weight: 200 });
        Select.fontColor('#ff0b3f75');
        Select.selectedOptionFont({ size: 12, weight: 100 });
        Select.optionFont({ size: 12, weight: 400 });
        Select.onSelect((index: number) => {
            console.info('Select:' + index);
            this.capturerFilter_[RENDER_MOVIE_IDX] = index;
        });
        Select.margin({ left: 5 });
        Select.pop();
        // 选项19:STREAM_USAGE_MOVIE
        Flex.pop();
        Row.pop();
        Row.create();
        Row.justifyContent(FlexAlign.SpaceBetween);
        Row.width('100%');
        Row.margin({ top: 10 });
        Button.createWithChild();
        Button.width('40%');
        Button.height(60);
        Button.onClick(() => {
            this.CreateAndStartSelectRenders();
        });
        Button.margin({ left: 10 });
        Text.create("音频播放");
        Text.fontSize(18);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('40%');
        Button.height(60);
        Button.onClick(() => {
            this.PlayStop();
        });
        Button.margin({ right: 10 });
        Text.create("停止播放");
        Text.fontSize(18);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Divider.create();
        Divider.strokeWidth(6);
        Divider.color(Color.Gray);
        Divider.margin({ top: 10 });
        Row.create();
        Text.create("录制参数");
        Text.fontSize(12);
        Text.lineHeight(20);
        Text.fontColor('#182431');
        Text.fontWeight(500);
        Text.pop();
        Row.pop();
        Row.create();
        Flex.create({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center });
        Flex.margin({ left: 24 });
        Select.create(this.samplingRateList);
        Select.value(this.selectedSamplingRateKey);
        Select.onSelect((index, value) => {
            this.selectedSamplingRateKey = value;
            this.audioCapturerOptions.streamInfo.samplingRate = audio.AudioSamplingRate[value];
        });
        Select.font({ size: 12 });
        Select.selectedOptionFont({ size: 12, weight: 100 });
        Select.pop();
        Flex.pop();
        Row.pop();
        Row.create();
        Row.margin({ left: 24 });
        Flex.create({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center });
        Select.create(this.channelsList);
        Select.value(this.selectedChannelKey);
        Select.onSelect((index, value) => {
            this.selectedChannelKey = value;
            this.audioCapturerOptions.streamInfo.channels = audio.AudioChannel[value];
        });
        Select.font({ size: 12 });
        Select.selectedOptionFont({ size: 12, weight: 100 });
        Select.pop();
        Flex.pop();
        Row.pop();
        Row.create();
        Row.margin({ left: 24 });
        Flex.create({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center });
        Select.create(this.sampleFormatList);
        Select.value(this.selectedSampleFormatKey);
        Select.onSelect((index, value) => {
            this.selectedSampleFormatKey = value;
            this.audioCapturerOptions.streamInfo.sampleFormat = audio.AudioSampleFormat[value];
        });
        Select.font({ size: 12 });
        Select.selectedOptionFont({ size: 12, weight: 100 });
        Select.pop();
        Flex.pop();
        Row.pop();
        Row.create();
        Row.margin({ left: 24 });
        Flex.create({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center });
        Select.create(this.encodingTypeList);
        Select.value(this.selectedEncodingTypeKey);
        Select.onSelect((index, value) => {
            this.selectedEncodingTypeKey = value;
            this.audioCapturerOptions.streamInfo.encodingType = audio.AudioEncodingType[value];
        });
        Select.font({ size: 12 });
        Select.selectedOptionFont({ size: 12, weight: 100 });
        Select.pop();
        Flex.pop();
        Row.pop();
        Divider.create();
        Divider.strokeWidth(6);
        Divider.color(Color.Gray);
        Divider.margin({ top: 10 });
        Row.create();
        Row.justifyContent(FlexAlign.SpaceBetween);
        Row.width('100%');
        Row.margin({ top: 10 });
        Button.createWithChild();
        Button.width('100%');
        Button.height(60);
        Button.onClick(() => {
            if (this.capturer_ === null) {
                this.startRecord();
            }
            if (this.capturer_ !== null && this.recordState_ === audio.AudioState.STATE_RUNNING) {
                this.stopRecord();
            }
        });
        Text.create(this.recordText);
        Text.fontSize(18);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.justifyContent(FlexAlign.SpaceBetween);
        Row.width('100%');
        Row.margin({ top: 10 });
        Button.createWithChild();
        Button.width('100%');
        Button.height(60);
        Button.onClick(() => {
            if (this.capturer_ === null) {
                this.startRecord();
            }
            if (this.capturer_ !== null && this.recordState_ === audio.AudioState.STATE_RUNNING) {
                this.getStreamInfo();
            }
        });
        Text.create(this.StreamText);
        Text.fontSize(18);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.justifyContent(FlexAlign.SpaceBetween);
        Row.width('100%');
        Row.margin({ top: 10 });
        Button.createWithChild();
        Button.width('100%');
        Button.height(60);
        Button.onClick(() => {
            if (this.capRender_ === null) {
                this.playRecordData();
            }
            if (this.capRender_ !== null && this.capRenderState_ === 1) {
                this.playRecordDataStop();
            }
        });
        Text.create(this.capRenderText_);
        Text.fontSize(18);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
}
loadDocument(new PlaybackCapturer("1", undefined, {}));
