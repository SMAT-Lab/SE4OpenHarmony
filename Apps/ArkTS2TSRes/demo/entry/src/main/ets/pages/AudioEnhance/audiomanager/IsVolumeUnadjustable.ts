interface IsVolumeUnadjustable_Params {
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
    return "IsVolumeUnadjustable_" + ++__generate__Id;
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
class IsVolumeUnadjustable extends View {
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
        this.__selectedVolumeTypeKey = new ObservedPropertySimple("请选择", this, "selectedVolumeTypeKey");
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
                    content: audio.ContentType.CONTENT_TYPE_RINGTONE,
                    usage: audio.StreamUsage.STREAM_USAGE_MEDIA,
                    rendererFlags: 0
                },
                info: {
                    selectedContentTypeKey: 'CONTENT_TYPE_RINGTONE',
                    selectedStreamUsageKey: 'STREAM_USAGE_MEDIA'
                }
            },
            'MEDIA': {
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
            'VOICE_CALL': {
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
            'VOICE_ASSISTANT': {
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
                    content: audio.ContentType.CONTENT_TYPE_MUSIC,
                    usage: audio.StreamUsage.STREAM_USAGE_ALARM,
                    rendererFlags: 0
                },
                info: {
                    selectedContentTypeKey: 'CONTENT_TYPE_MUSIC',
                    selectedStreamUsageKey: 'STREAM_USAGE_ALARM'
                }
            },
            'ACCESSIBILITY': {
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
            }
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: IsVolumeUnadjustable_Params) {
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
        If.create();
        if (this.selectedVolumeTypeKey !== "请选择") {
            If.branchId(0);
            Divider.create();
            Divider.strokeWidth(1);
            Divider.color(Color.Blue);
            Divider.margin({ bottom: 20 });
            Text.create("请选择setVolume要设置的音量:");
            Text.fontSize(20);
            Text.pop();
            Row.create();
            Slider.create({
                value: this.selectedVolume,
                min: this.minVolume,
                max: this.maxVolume,
                step: 1,
                style: SliderStyle.InSet
            });
            Slider.blockColor('#191970');
            Slider.trackColor('#ADD8E6');
            Slider.selectedColor('#4169E1');
            Slider.showTips(true);
            Slider.onChange((value: number, mode: SliderChangeMode) => {
                this.selectedVolume = value;
                console.info('value:' + value + 'mode:' + mode.toString());
            });
            Slider.width('80%');
            Text.create(this.selectedVolume.toFixed(0));
            Text.fontSize(24);
            Text.pop();
            Row.pop();
            Text.create(`${this.selectedContentTypeKey}`);
            Text.fontSize(16);
            Text.lineHeight(40);
            Text.pop();
            Text.create(`${this.selectedStreamUsageKey}`);
            Text.fontSize(16);
            Text.lineHeight(40);
            Text.pop();
        }
        If.pop();
        Column.pop();
        Divider.create();
        Divider.strokeWidth(10);
        Divider.color(Color.Blue);
        Divider.margin({ top: 20 });
        Column.create();
        Column.width('100%');
        Column.margin({ top: 20 });
        Row.create();
        Row.margin({ top: 10 });
        Button.createWithChild();
        Button.width('90%');
        Button.height(60);
        Button.margin({ right: 10 });
        Button.onClick(() => {
            let _this = this;
            try {
                let value = _this.audioVolumeGroupManager.isVolumeUnadjustable();
                _this.returnMsg = `isVolumeUnadjustable : Success, 返回值  ${value}`;
            }
            catch (err) {
                _this.returnMsg = `IsVolumeUnadjustable err: ${JSON.stringify(err)}`;
            }
        });
        Text.create("IsVolumeUnadjustable开关");
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
        Button.onClick(() => {
            if (this.selectedVolumeType == -1) {
                this.returnMsg = "请选择音频流类型";
                return;
            }
            let _this = this;
            _this.returnMsg = this.selectedVolumeType.toString() + ',' + this.selectedVolume.toString();
            this.audioVolumeGroupManager.setVolume(this.selectedVolumeType, this.selectedVolume, (err, value) => {
                if (err) {
                    _this.returnMsg = 'setVolume Callback err:' + JSON.stringify(err);
                    return;
                }
                _this.returnMsg = "setVolume Callback:SUCCESS";
            });
        });
        Text.create("setVolume callback");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('40%');
        Button.height(60);
        Button.onClick(async () => {
            if (this.selectedVolumeType == -1) {
                this.returnMsg = "请选择音频流类型";
                return;
            }
            let _this = this;
            this.audioVolumeGroupManager.setVolume(this.selectedVolumeType, this.selectedVolume)
                .then(value => {
                _this.returnMsg = "setVolume Promise:SUCCESS";
            })
                .catch((err) => {
                _this.returnMsg = 'setVolume Promise err:' + JSON.stringify(err);
            });
        });
        Text.create("setVolume promise");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.margin({ right: 10 });
        Button.onClick(() => {
            let _this = this;
            this.audioVolumeGroupManager.adjustVolumeByStep(this.volumeAdjustzUp, (err, value) => {
                if (err) {
                    _this.returnMsg = 'AdjustVolumeByStep_UP Callback err:' + JSON.stringify(err);
                    return;
                }
                _this.returnMsg = "AdjustVolumeByStep_UP Callback:SUCCESS 返回值 " + value;
            });
        });
        Text.create("AdjustVolumeByStep_UP Callback");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.margin({ right: 10 });
        Button.onClick(() => {
            let _this = this;
            this.audioVolumeGroupManager.adjustVolumeByStep(this.volumeAdjustzUp)
                .then(value => {
                _this.returnMsg = "AdjustVolumeByStep_UP Promise:SUCCESS 返回值 " + value;
            })
                .catch((err) => {
                _this.returnMsg = 'AdjustVolumeByStep_UP Promise err:' + JSON.stringify(err);
            });
        });
        Text.create("AdjustVolumeByStep_UP Promise");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.margin({ right: 10 });
        Button.onClick(() => {
            let _this = this;
            this.audioVolumeGroupManager.adjustVolumeByStep(this.volumeAdjustDown, (err, value) => {
                if (err) {
                    _this.returnMsg = 'AdjustVolumeByStep_DOWN Callback err:' + JSON.stringify(err);
                    return;
                }
                _this.returnMsg = "AdjustVolumeByStep_DOWN Callback:SUCCESS 返回值 " + value;
            });
        });
        Text.create("AdjustVolumeByStep_DOWN Callback");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.margin({ right: 10 });
        Button.onClick(() => {
            let _this = this;
            this.audioVolumeGroupManager.adjustVolumeByStep(this.volumeAdjustDown)
                .then(value => {
                _this.returnMsg = "AdjustVolumeByStep_DOWN Promise:SUCCESS 返回值 " + value;
            })
                .catch((err) => {
                _this.returnMsg = 'AdjustVolumeByStep_DOWN Promise err:' + JSON.stringify(err);
            });
        });
        Text.create("AdjustVolumeByStep_DOWN Promise");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.margin({ right: 10 });
        Button.onClick(() => {
            if (this.selectedVolumeType == -1) {
                this.returnMsg = "请选择音频流类型";
                return;
            }
            let _this = this;
            this.audioVolumeGroupManager.adjustSystemVolumeByStep(this.selectedVolumeType, this.volumeAdjustzUp, (err, value) => {
                if (err) {
                    _this.returnMsg = 'adjustSystemVolumeByStep_UP Callback err:' + JSON.stringify(err);
                    return;
                }
                _this.returnMsg = "adjustSystemVolumeByStep_UP Callback:SUCCESS 返回值 " + value;
            });
        });
        Text.create("adjustSystemVolumeByStep_UP Callback");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.margin({ right: 10 });
        Button.onClick(() => {
            if (this.selectedVolumeType == -1) {
                this.returnMsg = "请选择音频流类型";
                return;
            }
            let _this = this;
            this.audioVolumeGroupManager.adjustSystemVolumeByStep(this.selectedVolumeType, this.volumeAdjustzUp)
                .then(value => {
                _this.returnMsg = "adjustSystemVolumeByStep_UP Promise:SUCCESS 返回值 " + value;
            })
                .catch((err) => {
                _this.returnMsg = 'adjustSystemVolumeByStep_UP Promise err:' + JSON.stringify(err);
            });
        });
        Text.create("adjustSystemVolumeByStep_UP Promise");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.margin({ right: 10 });
        Button.onClick(() => {
            if (this.selectedVolumeType == -1) {
                this.returnMsg = "请选择音频流类型";
                return;
            }
            let _this = this;
            this.audioVolumeGroupManager.adjustSystemVolumeByStep(this.selectedVolumeType, this.volumeAdjustDown, (err, value) => {
                if (err) {
                    _this.returnMsg = 'adjustSystemVolumeByStep_DOWN Callback err:' + JSON.stringify(err);
                    return;
                }
                _this.returnMsg = "adjustSystemVolumeByStep_DOWN Callback:SUCCESS 返回值 " + value;
            });
        });
        Text.create("adjustSystemVolumeByStep_DOWN Callback");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.margin({ right: 10 });
        Button.onClick(() => {
            if (this.selectedVolumeType == -1) {
                this.returnMsg = "请选择音频流类型";
                return;
            }
            let _this = this;
            this.audioVolumeGroupManager.adjustSystemVolumeByStep(this.selectedVolumeType, this.volumeAdjustDown)
                .then(value => {
                _this.returnMsg = "adjustSystemVolumeByStep_DOWN Promise:SUCCESS 返回值 " + value;
            })
                .catch((err) => {
                _this.returnMsg = 'adjustSystemVolumeByStep_DOWN Promise err:' + JSON.stringify(err);
            });
        });
        Text.create("adjustSystemVolumeByStep_DOWN Promise");
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
loadDocument(new IsVolumeUnadjustable("1", undefined, {}));
