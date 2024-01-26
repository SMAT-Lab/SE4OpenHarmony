interface CapturerInterruptRenderer_Params {
    audioCapturerOption?;
    audioCapturer?;
    capturerPath?;
    returnMsg?: string;
    onCapturerReturnMsg?: string;
    bufferSize?: number;
    isBlockingRead?: boolean;
    sourceTypeList?;
    selectedSourceTypeKey?: string;
    audioRenderer?;
    audioRenderer2?;
    onRendererReturnMsg?: string;
    audioRendererOption?;
    volumeTypeList?;
    selectedVolumeTypeKey?: string;
    selectedContentTypeKey?: string;
    selectedStreamUsageKey?: string;
    mode?: number;
    writeArr?: number;
    renderInfo?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CapturerInterruptRenderer_" + ++__generate__Id;
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
class CapturerInterruptRenderer extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.audioCapturerOption = {
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
        this.capturerPath = '';
        this.__returnMsg = new ObservedPropertySimple(`hello`, this, "returnMsg");
        this.__onCapturerReturnMsg = new ObservedPropertySimple("未监听", this, "onCapturerReturnMsg");
        this.__bufferSize = new ObservedPropertySimple(0, this, "bufferSize");
        this.__isBlockingRead = new ObservedPropertySimple(true, this, "isBlockingRead");
        this.sourceTypeList = [];
        this.__selectedSourceTypeKey = new ObservedPropertySimple("请选择音源类型", this, "selectedSourceTypeKey");
        this.audioRenderer = null;
        this.audioRenderer2 = null;
        this.__onRendererReturnMsg = new ObservedPropertySimple(`未监听`, this, "onRendererReturnMsg");
        this.audioRendererOption = {
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
        this.volumeTypeList = [];
        this.__selectedVolumeTypeKey = new ObservedPropertySimple("请选择流类型", this, "selectedVolumeTypeKey");
        this.__selectedContentTypeKey = new ObservedPropertySimple("CONTENT_TYPE_MUSIC", this, "selectedContentTypeKey");
        this.__selectedStreamUsageKey = new ObservedPropertySimple("STREAM_USAGE_MEDIA", this, "selectedStreamUsageKey");
        this.__mode = new ObservedPropertySimple(1, this, "mode");
        this.__writeArr = new ObservedPropertySimple(0, this, "writeArr");
        this.renderInfo = {
            'MUSIC_1': {
                main: {
                    content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
                    usage: audio.StreamUsage.STREAM_USAGE_UNKNOWN,
                    rendererFlags: 0
                },
                info: {
                    selectedContentTypeKey: 'CONTENT_TYPE_MUSIC',
                    selectedStreamUsageKey: 'STREAM_USAGE_UNKNOWN'
                }
            },
            'MUSIC_2': {
                main: {
                    content: audio.ContentType.CONTENT_TYPE_MUSIC,
                    usage: audio.StreamUsage.STREAM_USAGE_MEDIA,
                    rendererFlags: 0
                },
                info: {
                    selectedContentTypeKey: 'CONTENT_TYPE_MUSIC',
                    selectedStreamUsageKey: 'STREAM_USAGE_MEDIA'
                }
            },
            'MUSIC_3': {
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
            'MUSIC_4': {
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
            'VOICE_CALL_1': {
                main: {
                    content: audio.ContentType.CONTENT_TYPE_SPEECH,
                    usage: audio.StreamUsage.STREAM_USAGE_VOICE_COMMUNICATION,
                    rendererFlags: 0
                },
                info: {
                    selectedContentTypeKey: 'CONTENT_TYPE_SPEECH',
                    selectedStreamUsageKey: 'STREAM_USAGE_VOICE_COMMUNICATION'
                }
            },
            'VOICE_CALL_2': {
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
            'SYSTEM': {
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
            'RING_1': {
                main: {
                    content: audio.ContentType.CONTENT_TYPE_MUSIC,
                    usage: audio.StreamUsage.STREAM_USAGE_NOTIFICATION_RINGTONE,
                    rendererFlags: 0
                },
                info: {
                    selectedContentTypeKey: 'CONTENT_TYPE_MUSIC',
                    selectedStreamUsageKey: 'STREAM_USAGE_NOTIFICATION_RINGTONE'
                }
            },
            'RING_2': {
                main: {
                    content: audio.ContentType.CONTENT_TYPE_SONIFICATION,
                    usage: audio.StreamUsage.STREAM_USAGE_NOTIFICATION_RINGTONE,
                    rendererFlags: 0
                },
                info: {
                    selectedContentTypeKey: 'CONTENT_TYPE_SONIFICATION',
                    selectedStreamUsageKey: 'STREAM_USAGE_NOTIFICATION_RINGTONE'
                }
            },
            'RING_3': {
                main: {
                    content: audio.ContentType.CONTENT_TYPE_RINGTONE,
                    usage: audio.StreamUsage.STREAM_USAGE_UNKNOWN,
                    rendererFlags: 0
                },
                info: {
                    selectedContentTypeKey: 'CONTENT_TYPE_RINGTONE',
                    selectedStreamUsageKey: 'STREAM_USAGE_UNKNOWN'
                }
            },
            'RING_4': {
                main: {
                    content: audio.ContentType.CONTENT_TYPE_RINGTONE,
                    usage: audio.StreamUsage.STREAM_USAGE_MEDIA,
                    rendererFlags: 0
                },
                info: {
                    selectedContentTypeKey: 'CONTENT_TYPE_RINGTONE',
                    selectedStreamUsageKey: 'STREAM_USAGE_MEDIA'
                }
            },
            'RING_5': {
                main: {
                    content: audio.ContentType.CONTENT_TYPE_RINGTONE,
                    usage: audio.StreamUsage.STREAM_USAGE_NOTIFICATION_RINGTONE,
                    rendererFlags: 0
                },
                info: {
                    selectedContentTypeKey: 'CONTENT_TYPE_RINGTONE',
                    selectedStreamUsageKey: 'STREAM_USAGE_NOTIFICATION_RINGTONE'
                }
            },
            'RING_6': {
                main: {
                    content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
                    usage: audio.StreamUsage.STREAM_USAGE_NOTIFICATION_RINGTONE,
                    rendererFlags: 0
                },
                info: {
                    selectedContentTypeKey: 'CONTENT_TYPE_UNKNOWN',
                    selectedStreamUsageKey: 'STREAM_USAGE_NOTIFICATION_RINGTONE'
                }
            },
            'RING_7': {
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
            'MOVIE_1': {
                main: {
                    content: audio.ContentType.CONTENT_TYPE_MOVIE,
                    usage: audio.StreamUsage.STREAM_USAGE_MEDIA,
                    rendererFlags: 0
                },
                info: {
                    selectedContentTypeKey: 'CONTENT_TYPE_MOVIE',
                    selectedStreamUsageKey: 'STREAM_USAGE_MEDIA'
                }
            },
            'MOVIE_2': {
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
            'GAME': {
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
            'SPEECH_1': {
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
            'SPEECH_2': {
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
            'ALARM_1': {
                main: {
                    content: audio.ContentType.CONTENT_TYPE_MUSIC,
                    usage: audio.StreamUsage.STREAM_USAGE_ALARM,
                    rendererFlags: 0
                },
                info: {
                    selectedContentTypeKey: 'CONTENT_TYPE_MUSIC',
                    selectedStreamUsageKey: 'STREAM_USAGE_ALARM'
                }
            },
            'ALARM_2': {
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
            'NOTIFICATION_1': {
                main: {
                    content: audio.ContentType.CONTENT_TYPE_SONIFICATION,
                    usage: audio.StreamUsage.STREAM_USAGE_UNKNOWN,
                    rendererFlags: 0
                },
                info: {
                    selectedContentTypeKey: 'CONTENT_TYPE_SONIFICATION',
                    selectedStreamUsageKey: 'STREAM_USAGE_UNKNOWN'
                }
            },
            'NOTIFICATION_2': {
                main: {
                    content: audio.ContentType.CONTENT_TYPE_SONIFICATION,
                    usage: audio.StreamUsage.STREAM_USAGE_MEDIA,
                    rendererFlags: 0
                },
                info: {
                    selectedContentTypeKey: 'CONTENT_TYPE_SONIFICATION',
                    selectedStreamUsageKey: 'STREAM_USAGE_MEDIA'
                }
            },
            'NOTIFICATION_3': {
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
            'ACCESSIBILITY_1': {
                main: {
                    content: audio.ContentType.CONTENT_TYPE_SPEECH,
                    usage: audio.StreamUsage.STREAM_USAGE_ACCESSIBILITY,
                    rendererFlags: 0
                },
                info: {
                    selectedContentTypeKey: 'CONTENT_TYPE_SPEECH',
                    selectedStreamUsageKey: 'STREAM_USAGE_ACCESSIBILITY'
                }
            },
            'ACCESSIBILITY_2': {
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
            'DTMF': {
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
            'VOICE_ASSISTANT_1': {
                main: {
                    content: audio.ContentType.CONTENT_TYPE_SPEECH,
                    usage: audio.StreamUsage.STREAM_USAGE_VOICE_ASSISTANT,
                    rendererFlags: 0
                },
                info: {
                    selectedContentTypeKey: 'CONTENT_TYPE_SPEECH',
                    selectedStreamUsageKey: 'STREAM_USAGE_VOICE_ASSISTANT'
                }
            },
            'VOICE_ASSISTANT_2': {
                main: {
                    content: audio.ContentType.CONTENT_TYPE_MUSIC,
                    usage: audio.StreamUsage.STREAM_USAGE_VOICE_ASSISTANT,
                    rendererFlags: 0
                },
                info: {
                    selectedContentTypeKey: 'CONTENT_TYPE_MUSIC',
                    selectedStreamUsageKey: 'STREAM_USAGE_VOICE_ASSISTANT'
                }
            },
            'VOICE_ASSISTANT_3': {
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
            'ENFORCED': {
                main: {
                    content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
                    usage: audio.StreamUsage.STREAM_USAGE_ENFORCED_TONE,
                    rendererFlags: 0
                },
                info: {
                    selectedContentTypeKey: 'CONTENT_TYPE_UNKNOWN',
                    selectedStreamUsageKey: 'STREAM_USAGE_ENFORCED_TONE'
                }
            },
            'NAVIGATION': {
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
            'MESSAGE': {
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
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CapturerInterruptRenderer_Params) {
        if (params.audioCapturerOption !== undefined) {
            this.audioCapturerOption = params.audioCapturerOption;
        }
        if (params.audioCapturer !== undefined) {
            this.audioCapturer = params.audioCapturer;
        }
        if (params.capturerPath !== undefined) {
            this.capturerPath = params.capturerPath;
        }
        if (params.returnMsg !== undefined) {
            this.returnMsg = params.returnMsg;
        }
        if (params.onCapturerReturnMsg !== undefined) {
            this.onCapturerReturnMsg = params.onCapturerReturnMsg;
        }
        if (params.bufferSize !== undefined) {
            this.bufferSize = params.bufferSize;
        }
        if (params.isBlockingRead !== undefined) {
            this.isBlockingRead = params.isBlockingRead;
        }
        if (params.sourceTypeList !== undefined) {
            this.sourceTypeList = params.sourceTypeList;
        }
        if (params.selectedSourceTypeKey !== undefined) {
            this.selectedSourceTypeKey = params.selectedSourceTypeKey;
        }
        if (params.audioRenderer !== undefined) {
            this.audioRenderer = params.audioRenderer;
        }
        if (params.audioRenderer2 !== undefined) {
            this.audioRenderer2 = params.audioRenderer2;
        }
        if (params.onRendererReturnMsg !== undefined) {
            this.onRendererReturnMsg = params.onRendererReturnMsg;
        }
        if (params.audioRendererOption !== undefined) {
            this.audioRendererOption = params.audioRendererOption;
        }
        if (params.volumeTypeList !== undefined) {
            this.volumeTypeList = params.volumeTypeList;
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
        if (params.mode !== undefined) {
            this.mode = params.mode;
        }
        if (params.writeArr !== undefined) {
            this.writeArr = params.writeArr;
        }
        if (params.renderInfo !== undefined) {
            this.renderInfo = params.renderInfo;
        }
    }
    aboutToBeDeleted() {
        this.__returnMsg.aboutToBeDeleted();
        this.__onCapturerReturnMsg.aboutToBeDeleted();
        this.__bufferSize.aboutToBeDeleted();
        this.__isBlockingRead.aboutToBeDeleted();
        this.__selectedSourceTypeKey.aboutToBeDeleted();
        this.__onRendererReturnMsg.aboutToBeDeleted();
        this.__selectedVolumeTypeKey.aboutToBeDeleted();
        this.__selectedContentTypeKey.aboutToBeDeleted();
        this.__selectedStreamUsageKey.aboutToBeDeleted();
        this.__mode.aboutToBeDeleted();
        this.__writeArr.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private audioCapturerOption;
    private audioCapturer;
    private capturerPath;
    private __returnMsg: ObservedPropertySimple<string>;
    get returnMsg() {
        return this.__returnMsg.get();
    }
    set returnMsg(newValue: string) {
        this.__returnMsg.set(newValue);
    }
    private __onCapturerReturnMsg: ObservedPropertySimple<string>;
    get onCapturerReturnMsg() {
        return this.__onCapturerReturnMsg.get();
    }
    set onCapturerReturnMsg(newValue: string) {
        this.__onCapturerReturnMsg.set(newValue);
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
    private sourceTypeList;
    private __selectedSourceTypeKey: ObservedPropertySimple<string>;
    get selectedSourceTypeKey() {
        return this.__selectedSourceTypeKey.get();
    }
    set selectedSourceTypeKey(newValue: string) {
        this.__selectedSourceTypeKey.set(newValue);
    }
    private audioRenderer;
    private audioRenderer2;
    private __onRendererReturnMsg: ObservedPropertySimple<string>;
    get onRendererReturnMsg() {
        return this.__onRendererReturnMsg.get();
    }
    set onRendererReturnMsg(newValue: string) {
        this.__onRendererReturnMsg.set(newValue);
    }
    private audioRendererOption;
    private volumeTypeList;
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
    private __mode: ObservedPropertySimple<number>;
    get mode() {
        return this.__mode.get();
    }
    set mode(newValue: number) {
        this.__mode.set(newValue);
    }
    private __writeArr: ObservedPropertySimple<number>;
    get writeArr() {
        return this.__writeArr.get();
    }
    set writeArr(newValue: number) {
        this.__writeArr.set(newValue);
    }
    private renderInfo;
    //@State mode:number=1
    aboutToAppear() {
        for (let key in audio.SourceType) {
            if (key === "SOURCE_TYPE_INVALID") {
                continue;
            }
            this.sourceTypeList.push({ value: key });
        }
        //    for (let key in AudioRendererType) {
        //      this.volumeTypeList.push({ value: key })
        //    }
        //实际volumetype没有，这三个流类型与music的流类型策略一致
        this.volumeTypeList.push({ value: 'MUSIC_1' });
        this.volumeTypeList.push({ value: 'MUSIC_2' });
        this.volumeTypeList.push({ value: 'MUSIC_3' });
        this.volumeTypeList.push({ value: 'MUSIC_4' });
        this.volumeTypeList.push({ value: 'VOICE_CALL_1' });
        this.volumeTypeList.push({ value: 'VOICE_CALL_2' });
        this.volumeTypeList.push({ value: 'SYSTEM' });
        this.volumeTypeList.push({ value: 'RING_1' });
        this.volumeTypeList.push({ value: 'RING_2' });
        this.volumeTypeList.push({ value: 'RING_3' });
        this.volumeTypeList.push({ value: 'RING_4' });
        this.volumeTypeList.push({ value: 'RING_5' });
        this.volumeTypeList.push({ value: 'RING_6' });
        this.volumeTypeList.push({ value: 'RING_7' });
        this.volumeTypeList.push({ value: 'MOVIE_1' });
        this.volumeTypeList.push({ value: 'MOVIE_2' });
        this.volumeTypeList.push({ value: 'GAME' });
        this.volumeTypeList.push({ value: 'SPEECH_1' });
        this.volumeTypeList.push({ value: 'SPEECH_2' });
        this.volumeTypeList.push({ value: 'ALARM_1' });
        this.volumeTypeList.push({ value: 'ALARM_2' });
        this.volumeTypeList.push({ value: 'NOTIFICATION_1' });
        this.volumeTypeList.push({ value: 'NOTIFICATION_2' });
        this.volumeTypeList.push({ value: 'NOTIFICATION_3' });
        this.volumeTypeList.push({ value: 'ACCESSIBILITY_1' });
        this.volumeTypeList.push({ value: 'ACCESSIBILITY_2' });
        this.volumeTypeList.push({ value: 'DTMF' });
        this.volumeTypeList.push({ value: 'VOICE_ASSISTANT_1' });
        this.volumeTypeList.push({ value: 'VOICE_ASSISTANT_2' });
        this.volumeTypeList.push({ value: 'VOICE_ASSISTANT_3' });
        this.volumeTypeList.push({ value: 'ULTRASONIC' });
        this.volumeTypeList.push({ value: 'ENFORCED' });
        this.volumeTypeList.push({ value: 'NAVIGATION' });
        this.volumeTypeList.push({ value: 'MESSAGE' });
        this.volumeTypeList.push({ value: 'ALL' });
    }
    async onBackPress() {
        if (this.audioCapturer !== null) {
            await this.audioCapturer.release();
            this.audioCapturer = null;
        }
        if (this.audioRenderer == null) {
            await this.audioRenderer.release();
            this.audioRenderer = null;
        }
    }
    createAudioCapturer() {
        if (this.audioCapturer !== null) {
            this.returnMsg = `AudioCapturer  Created already,don't create anymore`;
            return;
        }
        let _this = this;
        audio.createAudioCapturer(this.audioCapturerOption, async (err, data) => {
            if (err) {
                _this.returnMsg = `AudioCapturer  Created : Error: ${JSON.stringify(err)}`;
            }
            else {
                _this.audioCapturer = data;
                _this.returnMsg = `AudioCapturer  Created : SUCCESS,state:${_this.audioCapturer.state}\n`;
                _this.returnMsg += `${JSON.stringify(this.audioCapturerOption)}`;
            }
        });
    }
    capturerStart() {
        if (this.audioCapturer == null) {
            this.returnMsg = `AudioCapturer  instance had not created,dont‘t allow to start\n`;
            return;
        }
        let _this = this;
        this.audioCapturer.start((err) => {
            if (err) {
                _this.returnMsg = `AudioCapturer  start : Error: ${JSON.stringify(err)}\n`;
            }
            else {
                _this.returnMsg = `AudioCapturer  start : SUCCESS,state:${_this.audioCapturer.state}\n`;
            }
        });
    }
    async readCapturer() {
        if (this.audioCapturer == null) {
            this.returnMsg = `AudioCapturer  instance had not created,dont‘t allow to read\n`;
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
        _this.returnMsg += `AudioCapturer  read start.....\n `;
        let path = globalThis.pathDir + `/test_capturer_${new Date().getTime()}_${this.audioCapturerOption.streamInfo.samplingRate}_${this.audioCapturerOption.streamInfo.channels}.pcm`;
        _this.capturerPath = path;
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
                _this.returnMsg = `AudioCapturer  read : Error: ${JSON.stringify(err)}\n`;
            }
            end = new Date().getTime();
        }
        _this.returnMsg = `AudioCapturer  read end, state:${_this.audioCapturer.state}\n`;
    }
    stopCapturer() {
        if (this.audioCapturer == null) {
            this.returnMsg = `AudioCapturer instance had not created,dont‘t allow to stop\n`;
            return;
        }
        let _this = this;
        _this.audioCapturer.stop((err) => {
            if (err) {
                _this.returnMsg = `AudioCapturer  stop : Error: ${JSON.stringify(err)}\n`;
            }
            else {
                _this.returnMsg = `AudioCapturer  stop : SUCCESS,state:${_this.audioCapturer.state}\n`;
            }
        });
    }
    releaseCapturer() {
        if (this.audioCapturer == null) {
            this.returnMsg = `AudioCapturer  instance had not created,dont‘t allow to release\n`;
            return;
        }
        let _this = this;
        _this.audioCapturer.release((err) => {
            if (err) {
                _this.returnMsg = `AudioCapturer  release : Error: ${JSON.stringify(err)}\n`;
            }
            else {
                _this.returnMsg = `AudioCapturer  release SUCCESS,state:${_this.audioCapturer.state}\n`;
                _this.audioCapturer = null;
            }
        });
    }
    onCapturerAudioInterrupt() {
        if (this.audioCapturer == null) {
            this.returnMsg = `AudioCapturer  instance had not created,dont‘t allow to release\n`;
            return;
        }
        let _this = this;
        _this.onCapturerReturnMsg = `监听中...`;
        _this.audioCapturer.on('audioInterrupt', (InterruptEvent) => {
            _this.onCapturerReturnMsg = JSON.stringify(InterruptEvent);
        });
    }
    async renderPlay() {
        if (this.capturerPath == "") {
            this.returnMsg += `AudioCapturer  尚未录音\n`;
            return;
        }
        let audioRendererOptions = {
            streamInfo: this.audioCapturerOption.streamInfo,
            rendererInfo: {
                content: audio.ContentType.CONTENT_TYPE_RINGTONE,
                usage: audio.StreamUsage.STREAM_USAGE_MEDIA,
                rendererFlags: 0
            }
        };
        this.returnMsg = `audioRendererOptions ${JSON.stringify(audioRendererOptions)} \n`;
        try {
            this.audioRenderer2 = await audio.createAudioRenderer(audioRendererOptions);
            this.returnMsg += `audioRenderer2  create success \n`;
        }
        catch (err) {
            this.returnMsg += `audioRenderer2  create : Error: ${JSON.stringify(err)}\n`;
            return;
        }
        let bufferSize;
        try {
            bufferSize = await this.audioRenderer2.getBufferSize();
            this.returnMsg += `audioRenderer2 getBufferSize success,bufferSize:${bufferSize} \n`;
            await this.audioRenderer2.start();
            this.returnMsg += `audioRenderer2  start success \n`;
        }
        catch (err) {
            this.returnMsg += `audioRenderer2  start : Error: ${JSON.stringify(err)}\n`;
            return;
        }
        let path = this.capturerPath;
        try {
            this.returnMsg += `path:${path}\n`;
            let stat = await fs.stat(path);
            this.returnMsg += `stat:${JSON.stringify(stat)}\n`;
            this.returnMsg += `size:${stat.size}\n`;
            let len = stat.size % bufferSize == 0 ? Math.floor(stat.size / bufferSize) : Math.floor(stat.size / bufferSize + 1);
            let file = await fs.open(path, 0o0);
            this.returnMsg += `fd:${file.fd}\n`;
            let buf = new ArrayBuffer(bufferSize);
            this.returnMsg += `audioRenderer2  write start.......... \n`;
            for (let i = 0; i < len; i++) {
                if (this.audioRenderer2.state > audio.AudioState.STATE_RUNNING) {
                    return;
                }
                let options = {
                    offset: i * bufferSize,
                    length: bufferSize
                };
                let readsize = await fs.read(file.fd, buf, options);
                let writeSize = await this.audioRenderer2.write(buf);
            }
            this.returnMsg += `audioRenderer2  write end. \n`;
        }
        catch (err) {
            this.returnMsg += `audioRenderer2  write : Error: ${JSON.stringify(err)}\n`;
        }
        await this.audioRenderer2.release();
    }
    createAudioRenderer() {
        if (this.selectedVolumeTypeKey == "请选择流类型") {
            this.returnMsg += `audioRenderer   请选择流类型\n`;
            return;
        }
        if (this.audioRenderer !== null) {
            this.returnMsg = `audioRenderer  Created already,don't create anymore`;
            return;
        }
        let _this = this;
        audio.createAudioRenderer(this.audioRendererOption, async (err, data) => {
            console.error("this.audioRendererOptions----------:" + JSON.stringify(this.audioRendererOption));
            if (err) {
                _this.returnMsg = `audioRenderer  Created : Error: ${JSON.stringify(err)}`;
            }
            else {
                _this.audioRenderer = data;
                _this.returnMsg += `audioRenderer  Created : SUCCESS,state:${_this.audioRenderer.state}\n`;
            }
        });
    }
    rendererStart() {
        if (this.audioRenderer == null) {
            this.returnMsg = `audioRenderer  instance had not created,dont‘t allow to start\n`;
            return;
        }
        let _this = this;
        this.audioRenderer.start((err) => {
            if (err) {
                _this.returnMsg = `audioRenderer  start : Error: ${JSON.stringify(err)}\n`;
            }
            else {
                _this.returnMsg = `audioRenderer  start : SUCCESS,state:${_this.audioRenderer.state}\n`;
            }
        });
    }
    getBufferSize() {
        if (this.audioRenderer == null) {
            this.returnMsg = `audioRenderer  instance had not created,dont‘t allow to getBufferSize`;
            return;
        }
        let _this = this;
        _this.audioRenderer.getBufferSize((err, bufferSize) => {
            if (err) {
                _this.returnMsg = `audioRenderer  getBufferSize : Error: ${JSON.stringify(err)}\n`;
            }
            else {
                _this.returnMsg = `audioRenderer  getBufferSize : SUCCESS,bufferSize:${bufferSize},state:${_this.audioRenderer.state}\n`;
                _this.bufferSize = bufferSize;
            }
        });
    }
    async writeRenderer() {
        if (this.writeArr == 1) {
            this.returnMsg += `audioRenderer  write already clicked`;
            return;
        }
        if (this.audioRenderer == null) {
            this.returnMsg += `audioRenderer  instance had not created,dont‘t allow to read\n`;
            return;
        }
        if (this.bufferSize == 0) {
            this.bufferSize = await this.audioRenderer.getBufferSize();
        }
        this.writeArr = 1;
        let _this = this;
        let path = globalThis.pathDir + '/test_44100_2.wav';
        try {
            let stat = await fs.stat(path);
            let len = stat.size % this.bufferSize == 0 ? Math.floor(stat.size / this.bufferSize) : Math.floor(stat.size / this.bufferSize + 1);
            let file = await fs.open(path, 0o0);
            let buf = new ArrayBuffer(this.bufferSize);
            this.returnMsg = `audioRenderer  write start.......... \n`;
            while (true) {
                for (let i = 0; i < len; i++) {
                    let options = {
                        offset: i * this.bufferSize,
                        length: this.bufferSize
                    };
                    let readsize = await fs.read(file.fd, buf, options);
                    await this.audioRenderer.write(buf);
                }
            }
            _this.returnMsg += `audioRenderer  write end, state:${_this.audioRenderer.state}\n`;
        }
        catch (err) {
            this.returnMsg += `audioRenderer  write : Error: ${JSON.stringify(err)}\n`;
        }
    }
    stopRenderer() {
        if (this.audioRenderer == null) {
            this.returnMsg = `audioRenderer  instance had not created,dont‘t allow to stop\n`;
            return;
        }
        let _this = this;
        _this.audioRenderer.stop((err) => {
            if (err) {
                _this.returnMsg = `audioRenderer  stop : Error: ${JSON.stringify(err)}\n`;
            }
            else {
                _this.returnMsg = `audioRenderer  stop : SUCCESS,state:${_this.audioRenderer.state}\n`;
            }
        });
    }
    pauseRenderer() {
        if (this.audioRenderer == null) {
            this.returnMsg = `audioRenderer  instance had not created,dont‘t allow to pause\n`;
            return;
        }
        let _this = this;
        _this.audioRenderer.pause((err) => {
            if (err) {
                _this.returnMsg = `audioRenderer  pause : Error: ${JSON.stringify(err)}\n`;
            }
            else {
                _this.returnMsg = `audioRenderer  pause : SUCCESS,state:${_this.audioRenderer.state}\n`;
            }
        });
    }
    releaseRenderer() {
        if (this.audioRenderer == null) {
            this.returnMsg = `audioRenderer  instance had not created,dont‘t allow to release\n`;
            return;
        }
        let _this = this;
        _this.audioRenderer.release((err) => {
            if (err) {
                _this.returnMsg = `audioRenderer  release : Error: ${JSON.stringify(err)}\n`;
            }
            else {
                _this.returnMsg = `audioRenderer  release SUCCESS,state:${_this.audioRenderer.state}\n`;
                _this.audioRenderer = null;
                _this.writeArr = 0;
            }
        });
    }
    setInterruptModeCallback() {
        if (this.audioRenderer == null) {
            this.returnMsg = `audioRenderer  instance had not created,dont‘t allow to setInterruptModeCallback\n`;
            return;
        }
        let mode = this.mode;
        let _this = this;
        this.audioRenderer.setInterruptMode(mode, (err, data) => {
            if (err) {
                _this.returnMsg = `audioRenderer  setInterruptMode callback : Error: ${JSON.stringify(err)}\n`;
            }
            _this.returnMsg = `audioRenderer  setInterruptMode callback : Success\n`;
        });
    }
    onRendererInterrupt() {
        if (this.audioRenderer == null) {
            this.returnMsg = `audioRenderer instance had not created,dont‘t allow to onInterrupt \n`;
            return;
        }
        let _this = this;
        _this.onRendererReturnMsg = `已监听`;
        this.audioRenderer.on('audioInterrupt', async (interruptEvent) => {
            //console.log('interruptEvent:'+JSON.stringify(interruptEvent))
            _this.onRendererReturnMsg = JSON.stringify(interruptEvent);
            if (interruptEvent.hintType == 2 || interruptEvent.hintType == 3) {
                await _this.audioRenderer.pause();
            }
            else if (interruptEvent.hintType == 1) {
                await _this.audioRenderer.start();
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
        Text.create("【音频录制-录制】返回数据：");
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
        Row.create();
        Row.margin({ top: 10 });
        Select.create(this.sourceTypeList);
        Select.value(this.selectedSourceTypeKey);
        Select.onSelect((index, value) => {
            this.selectedSourceTypeKey = value;
            this.audioCapturerOption.capturerInfo.source = audio.SourceType[value];
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
            this.onCapturerAudioInterrupt();
        });
        Text.create("capturer::on('audioInterrupt')");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Text.create(this.onCapturerReturnMsg);
        Text.fontSize(22);
        Text.lineHeight(30);
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
        Row.create();
        Row.margin({ top: 10, bottom: 10 });
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceBetween);
        Button.createWithChild();
        Button.width('100%');
        Button.height(60);
        Button.backgroundColor(Color.Pink);
        Button.onClick(() => this.renderPlay());
        Text.create("播放录音数据");
        Text.fontSize(22);
        Text.fontColor(Color.Blue);
        Text.pop();
        Button.pop();
        Row.pop();
        Divider.create();
        Divider.strokeWidth(10);
        Divider.color(Color.Blue);
        Row.create();
        Row.margin({ top: 20 });
        Select.create(this.volumeTypeList);
        Select.value(this.selectedVolumeTypeKey);
        Select.onSelect((index, value) => {
            this.selectedVolumeTypeKey = value;
            this.audioRendererOption.rendererInfo = this.renderInfo[this.selectedVolumeTypeKey].main;
            this.selectedStreamUsageKey = this.renderInfo[this.selectedVolumeTypeKey].info.selectedStreamUsageKey;
            this.selectedContentTypeKey = this.renderInfo[this.selectedVolumeTypeKey].info.selectedContentTypeKey;
        });
        Select.pop();
        Row.pop();
        If.create();
        if (this.selectedVolumeTypeKey !== "请选择流类型") {
            If.branchId(0);
            Text.create(this.selectedContentTypeKey);
            Text.fontSize(16);
            Text.lineHeight(40);
            Text.pop();
            Text.create(this.selectedStreamUsageKey);
            Text.fontSize(16);
            Text.lineHeight(40);
            Text.pop();
        }
        If.pop();
        Divider.create();
        Divider.strokeWidth(2);
        Divider.color(Color.Blue);
        Row.create();
        Text.create("焦点模式");
        Text.fontSize(24);
        Text.pop();
        Radio.create({ value: `mute1`, group: `modeGroup` });
        Radio.onChange((isChecked) => {
            if (isChecked) {
                this.mode = 0;
            }
            else {
                this.mode = 1;
            }
        });
        Radio.checked(this.mode == 0);
        Text.create("共享焦点");
        Text.fontSize(18);
        Text.pop();
        Radio.create({ value: `mute2`, group: `modeGroup` });
        Radio.onChange((isChecked) => {
            if (isChecked) {
                this.mode = 1;
            }
            else {
                this.mode = 0;
            }
        });
        Radio.checked(this.mode == 1);
        Text.create("独立焦点");
        Text.fontSize(18);
        Text.pop();
        Row.pop();
        Text.create(`焦点数据：${this.mode}`);
        Text.fontSize(24);
        Text.pop();
        Row.create();
        Row.margin({ top: 10 });
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceBetween);
        Button.createWithChild();
        Button.width('100%');
        Button.height(60);
        Button.onClick(() => {
            this.setInterruptModeCallback();
        });
        Text.create("setInterruptMode callback");
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
            this.onRendererInterrupt();
        });
        Text.create("render::on('audioInterrupt')");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Text.create(this.onRendererReturnMsg);
        Text.fontSize(22);
        Text.pop();
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
        Divider.create();
        Divider.strokeWidth(6);
        Divider.color(Color.Blue);
        Divider.margin({ bottom: 10 });
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
}
loadDocument(new CapturerInterruptRenderer("1", undefined, {}));
