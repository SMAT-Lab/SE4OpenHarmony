interface RealtimeAudioEffectQuery_Params {
    scroller?: Scroller;
    audioSource?;
    appContext?: common.Context;
    fileDescriptor?;
    audioPlayState?: Array<string>;
    stateImg?: Array<Resource>;
    audioRenderer?: audio.AudioRenderer;
    contentTypeOptions?: ModeType[];
    streamUsageOptions?: ModeType[];
    audioEffectModeSettingOptions?: ModeType[];
    showSelector_1?: boolean;
    showSelector_2?: boolean;
    showSelector_3?: boolean;
    queryResult?: Resource;
    queryButtonState?: boolean;
    stateTextIndex?: number;
    stateImgIndex?: number;
    optionsButtonState?: boolean;
    currentAudioEffect?: Resource;
    selectColor?: Color;
    audioEffectModeSettingIndex?: number;
    contentTypeIndex?: number;
    streamUsageIndex?: number;
}
interface ModeItem_3_Params {
    mode?: ModeType;
    audioEffectModeSettingIndex?: number;
}
interface ModeItem_2_Params {
    mode?: ModeType;
    streamUsageIndex?: number;
}
interface ModeItem_1_Params {
    mode?: ModeType;
    contentTypeIndex?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "RealtimeEffect_" + ++__generate__Id;
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
import common from '@ohos.app.ability.common';
import fs from '@ohos.file.fs';
import audio from '@ohos.multimedia.audio';
import router from '@ohos.router';
import { BusinessError } from '@ohos.base';
export class ModeType {
    id: number;
    name: Resource;
    constructor(id: number, name: Resource) {
        this.id = id;
        this.name = name;
    }
}
class fileDescriptorClass {
    fd: number;
    offset: number;
    length: number;
    constructor(fd: number, offset: number, length: number) {
        this.fd = fd;
        this.offset = offset;
        this.length = length;
    }
}
class ModeItem_1 extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.mode = new ModeType(-1, $r('app.string.CONTENT_TYPE_UNKNOWN'));
        this.__contentTypeIndex = this.initializeConsume("contentTypeIndex", "contentTypeIndex");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ModeItem_1_Params) {
        if (params.mode !== undefined) {
            this.mode = params.mode;
        }
    }
    aboutToBeDeleted() {
        this.__contentTypeIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private mode: ModeType;
    private __contentTypeIndex?: SynchedPropertySimpleTwoWay<number>;
    get contentTypeIndex() {
        return this.__contentTypeIndex.get();
    }
    set contentTypeIndex(newValue: number) {
        this.__contentTypeIndex.set(newValue);
    }
    renderModeItem(fontColor: string, bgColor: string, value: Resource, parent = null) {
        Flex.create();
        Flex.height(44);
        Flex.width(148);
        Flex.backgroundColor(bgColor);
        Flex.borderRadius(12);
        Flex.padding({ left: 14, top: 14, bottom: 14 });
        Text.create(value);
        Text.fontSize(16);
        Text.fontWeight(400);
        Text.fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
        Text.fontColor(fontColor);
        Text.pop();
        Flex.pop();
        If.create();
        if (this.mode && this.mode.id !== 5) {
            If.branchId(0);
            Flex.create();
            Flex.padding({ left: 12, right: 12 });
            Flex.create();
            Flex.height(1);
            Flex.width('100%');
            Flex.backgroundColor('#F3F3F3');
            Flex.pop();
            Flex.pop();
        }
        If.pop();
    }
    render() {
        Flex.create({ direction: FlexDirection.Column });
        Flex.height(48);
        Flex.width(156);
        If.create();
        if (this.contentTypeIndex == this.mode.id) {
            If.branchId(0);
            this.renderModeItem('#007DFF', 'rgba(0,125,255,0.20)', this.mode.name, this);
        }
        else {
            If.branchId(1);
            this.renderModeItem('rgba(0,0,0,0.9)', '', this.mode.name, this);
        }
        If.pop();
        Flex.pop();
    }
}
class ModeItem_2 extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.mode = new ModeType(-1, $r('app.string.CONTENT_TYPE_UNKNOWN'));
        this.__streamUsageIndex = this.initializeConsume("streamUsageIndex", "streamUsageIndex");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ModeItem_2_Params) {
        if (params.mode !== undefined) {
            this.mode = params.mode;
        }
    }
    aboutToBeDeleted() {
        this.__streamUsageIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private mode: ModeType;
    private __streamUsageIndex?: SynchedPropertySimpleTwoWay<number>;
    get streamUsageIndex() {
        return this.__streamUsageIndex.get();
    }
    set streamUsageIndex(newValue: number) {
        this.__streamUsageIndex.set(newValue);
    }
    renderModeItem(fontColor: string, bgColor: string, value: Resource, parent = null) {
        Flex.create();
        Flex.height(44);
        Flex.width(148);
        Flex.backgroundColor(bgColor);
        Flex.borderRadius(12);
        Flex.padding({ left: 14, top: 14, bottom: 14 });
        Text.create(value);
        Text.fontSize(16);
        Text.fontColor(fontColor);
        Text.fontWeight(400);
        Text.fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
        Text.pop();
        Flex.pop();
        If.create();
        if (this.mode && this.mode.id !== 14) {
            If.branchId(0);
            Flex.create();
            Flex.padding({ left: 12, right: 12 });
            Flex.create();
            Flex.height(1);
            Flex.width('100%');
            Flex.backgroundColor('#F3F3F3');
            Flex.pop();
            Flex.pop();
        }
        If.pop();
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center });
        Flex.height(48);
        Flex.width(156);
        If.create();
        if (this.streamUsageIndex == this.mode.id) {
            If.branchId(0);
            this.renderModeItem('#007DFF', 'rgba(0,125,255,0.20)', this.mode.name, this);
        }
        else {
            If.branchId(1);
            this.renderModeItem('rgba(0,0,0,0.9)', '', this.mode.name, this);
        }
        If.pop();
        Flex.pop();
    }
}
class ModeItem_3 extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.mode = new ModeType(-1, $r('app.string.CONTENT_TYPE_UNKNOWN'));
        this.__audioEffectModeSettingIndex = this.initializeConsume("audioEffectModeSettingIndex", "audioEffectModeSettingIndex");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ModeItem_3_Params) {
        if (params.mode !== undefined) {
            this.mode = params.mode;
        }
    }
    aboutToBeDeleted() {
        this.__audioEffectModeSettingIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private mode: ModeType;
    private __audioEffectModeSettingIndex?: SynchedPropertySimpleTwoWay<number>;
    get audioEffectModeSettingIndex() {
        return this.__audioEffectModeSettingIndex.get();
    }
    set audioEffectModeSettingIndex(newValue: number) {
        this.__audioEffectModeSettingIndex.set(newValue);
    }
    renderModeItem(fontColor: string, bgColor: string, value: Resource, parent = null) {
        Flex.create();
        Flex.height(44);
        Flex.width(148);
        Flex.backgroundColor(bgColor);
        Flex.borderRadius(12);
        Flex.padding({ left: 14, top: 14, bottom: 14 });
        Text.create(value);
        Text.fontSize(16);
        Text.fontWeight(400);
        Text.fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
        Text.fontColor(fontColor);
        Text.pop();
        Flex.pop();
        If.create();
        if (this.mode && this.mode.id !== 1) {
            If.branchId(0);
            Flex.create();
            Flex.padding({ left: 12, right: 12 });
            Flex.create();
            Flex.height(1);
            Flex.width('100%');
            Flex.backgroundColor('#F3F3F3');
            Flex.pop();
            Flex.pop();
        }
        If.pop();
    }
    render() {
        Flex.create({ direction: FlexDirection.Column });
        Flex.height(48);
        Flex.width(156);
        If.create();
        if (this.audioEffectModeSettingIndex == this.mode.id) {
            If.branchId(0);
            this.renderModeItem('#007DFF', 'rgba(0,125,255,0.20)', this.mode.name, this);
        }
        else {
            If.branchId(1);
            this.renderModeItem('rgba(0,0,0,0.9)', '', this.mode.name, this);
        }
        If.pop();
        Flex.pop();
    }
}
class RealtimeAudioEffectQuery extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.scroller = new Scroller();
        this.audioSource = 'test1.wav';
        this.appContext = undefined;
        this.fileDescriptor = new fileDescriptorClass(0, 0, 0);
        this.audioPlayState = ['notPlaying', 'onPlaying'];
        this.stateImg = [$r('app.media.ic_play'), $r('app.media.ic_pause')];
        this.audioRenderer = undefined;
        this.contentTypeOptions = [
            new ModeType(0, $r('app.string.CONTENT_TYPE_UNKNOWN')),
            new ModeType(1, $r('app.string.CONTENT_TYPE_SPEECH')),
            new ModeType(2, $r('app.string.CONTENT_TYPE_MUSIC')),
            new ModeType(3, $r('app.string.CONTENT_TYPE_MOVIE')),
            new ModeType(4, $r('app.string.CONTENT_TYPE_SONIFICATION')),
            new ModeType(5, $r('app.string.CONTENT_TYPE_RINGTONE'))
        ];
        this.streamUsageOptions = [
            new ModeType(0, $r('app.string.STREAM_USAGE_UNKNOWN')),
            new ModeType(1, $r('app.string.STREAM_USAGE_MUSIC')),
            new ModeType(2, $r('app.string.STREAM_USAGE_VOICE_COMMUNICATION')),
            new ModeType(3, $r('app.string.STREAM_USAGE_VOICE_ASSISTANT')),
            new ModeType(4, $r('app.string.STREAM_USAGE_ALARM')),
            new ModeType(5, $r('app.string.STREAM_USAGE_VOICE_MESSAGE')),
            new ModeType(6, $r('app.string.STREAM_USAGE_RINGTONE')),
            new ModeType(7, $r('app.string.STREAM_USAGE_NOTIFICATION')),
            new ModeType(8, $r('app.string.STREAM_USAGE_ACCESSIBILITY')),
            new ModeType(9, $r('app.string.STREAM_USAGE_MOVIE')),
            new ModeType(10, $r('app.string.STREAM_USAGE_GAME')),
            new ModeType(11, $r('app.string.STREAM_USAGE_AUDIOBOOK')),
            new ModeType(12, $r('app.string.STREAM_USAGE_NAVIGATION'))
        ];
        this.audioEffectModeSettingOptions = [
            new ModeType(0, $r('app.string.EFFECT_NONE')),
            new ModeType(1, $r('app.string.EFFECT_DEFAULT'))
        ];
        this.__showSelector_1 = new ObservedPropertySimple(false, this, "showSelector_1");
        this.__showSelector_2 = new ObservedPropertySimple(false, this, "showSelector_2");
        this.__showSelector_3 = new ObservedPropertySimple(false, this, "showSelector_3");
        this.__queryResult = new ObservedPropertyObject($r('app.string.BLANK'), this, "queryResult");
        this.__queryButtonState = new ObservedPropertySimple(false, this, "queryButtonState");
        this.__stateTextIndex = new ObservedPropertySimple(0, this, "stateTextIndex");
        this.__stateImgIndex = new ObservedPropertySimple(0, this, "stateImgIndex");
        this.__optionsButtonState = new ObservedPropertySimple(true, this, "optionsButtonState");
        this.__currentAudioEffect = new ObservedPropertyObject($r('app.string.EFFECT_DEFAULT'), this, "currentAudioEffect");
        this.__selectColor = new ObservedPropertySimple(Color.Black, this, "selectColor");
        this.__audioEffectModeSettingIndex = new ObservedPropertySimple(1, this, "audioEffectModeSettingIndex");
        this.addProvidedVar("audioEffectModeSettingIndex", this.__audioEffectModeSettingIndex, false);
        this.__contentTypeIndex = new ObservedPropertySimple(0, this, "contentTypeIndex");
        this.addProvidedVar("contentTypeIndex", this.__contentTypeIndex, false);
        this.__streamUsageIndex = new ObservedPropertySimple(0, this, "streamUsageIndex");
        this.addProvidedVar("streamUsageIndex", this.__streamUsageIndex, false);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: RealtimeAudioEffectQuery_Params) {
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.audioSource !== undefined) {
            this.audioSource = params.audioSource;
        }
        if (params.appContext !== undefined) {
            this.appContext = params.appContext;
        }
        if (params.fileDescriptor !== undefined) {
            this.fileDescriptor = params.fileDescriptor;
        }
        if (params.audioPlayState !== undefined) {
            this.audioPlayState = params.audioPlayState;
        }
        if (params.stateImg !== undefined) {
            this.stateImg = params.stateImg;
        }
        if (params.audioRenderer !== undefined) {
            this.audioRenderer = params.audioRenderer;
        }
        if (params.contentTypeOptions !== undefined) {
            this.contentTypeOptions = params.contentTypeOptions;
        }
        if (params.streamUsageOptions !== undefined) {
            this.streamUsageOptions = params.streamUsageOptions;
        }
        if (params.audioEffectModeSettingOptions !== undefined) {
            this.audioEffectModeSettingOptions = params.audioEffectModeSettingOptions;
        }
        if (params.showSelector_1 !== undefined) {
            this.showSelector_1 = params.showSelector_1;
        }
        if (params.showSelector_2 !== undefined) {
            this.showSelector_2 = params.showSelector_2;
        }
        if (params.showSelector_3 !== undefined) {
            this.showSelector_3 = params.showSelector_3;
        }
        if (params.queryResult !== undefined) {
            this.queryResult = params.queryResult;
        }
        if (params.queryButtonState !== undefined) {
            this.queryButtonState = params.queryButtonState;
        }
        if (params.stateTextIndex !== undefined) {
            this.stateTextIndex = params.stateTextIndex;
        }
        if (params.stateImgIndex !== undefined) {
            this.stateImgIndex = params.stateImgIndex;
        }
        if (params.optionsButtonState !== undefined) {
            this.optionsButtonState = params.optionsButtonState;
        }
        if (params.currentAudioEffect !== undefined) {
            this.currentAudioEffect = params.currentAudioEffect;
        }
        if (params.selectColor !== undefined) {
            this.selectColor = params.selectColor;
        }
        if (params.audioEffectModeSettingIndex !== undefined) {
            this.audioEffectModeSettingIndex = params.audioEffectModeSettingIndex;
        }
        if (params.contentTypeIndex !== undefined) {
            this.contentTypeIndex = params.contentTypeIndex;
        }
        if (params.streamUsageIndex !== undefined) {
            this.streamUsageIndex = params.streamUsageIndex;
        }
    }
    aboutToBeDeleted() {
        this.__showSelector_1.aboutToBeDeleted();
        this.__showSelector_2.aboutToBeDeleted();
        this.__showSelector_3.aboutToBeDeleted();
        this.__queryResult.aboutToBeDeleted();
        this.__queryButtonState.aboutToBeDeleted();
        this.__stateTextIndex.aboutToBeDeleted();
        this.__stateImgIndex.aboutToBeDeleted();
        this.__optionsButtonState.aboutToBeDeleted();
        this.__currentAudioEffect.aboutToBeDeleted();
        this.__selectColor.aboutToBeDeleted();
        this.__audioEffectModeSettingIndex.aboutToBeDeleted();
        this.__contentTypeIndex.aboutToBeDeleted();
        this.__streamUsageIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private scroller: Scroller;
    private audioSource;
    private appContext?: common.Context;
    private fileDescriptor;
    private audioPlayState: Array<string>;
    private stateImg: Array<Resource>;
    private audioRenderer?: audio.AudioRenderer;
    private contentTypeOptions: ModeType[];
    private streamUsageOptions: ModeType[];
    private audioEffectModeSettingOptions: ModeType[];
    private __showSelector_1: ObservedPropertySimple<boolean>;
    get showSelector_1() {
        return this.__showSelector_1.get();
    }
    set showSelector_1(newValue: boolean) {
        this.__showSelector_1.set(newValue);
    }
    private __showSelector_2: ObservedPropertySimple<boolean>;
    get showSelector_2() {
        return this.__showSelector_2.get();
    }
    set showSelector_2(newValue: boolean) {
        this.__showSelector_2.set(newValue);
    }
    private __showSelector_3: ObservedPropertySimple<boolean>;
    get showSelector_3() {
        return this.__showSelector_3.get();
    }
    set showSelector_3(newValue: boolean) {
        this.__showSelector_3.set(newValue);
    }
    private __queryResult: ObservedPropertyObject<Resource>;
    get queryResult() {
        return this.__queryResult.get();
    }
    set queryResult(newValue: Resource) {
        this.__queryResult.set(newValue);
    }
    private __queryButtonState: ObservedPropertySimple<boolean>;
    get queryButtonState() {
        return this.__queryButtonState.get();
    }
    set queryButtonState(newValue: boolean) {
        this.__queryButtonState.set(newValue);
    }
    private __stateTextIndex: ObservedPropertySimple<number>;
    get stateTextIndex() {
        return this.__stateTextIndex.get();
    }
    set stateTextIndex(newValue: number) {
        this.__stateTextIndex.set(newValue);
    }
    private __stateImgIndex: ObservedPropertySimple<number>;
    get stateImgIndex() {
        return this.__stateImgIndex.get();
    }
    set stateImgIndex(newValue: number) {
        this.__stateImgIndex.set(newValue);
    }
    private __optionsButtonState: ObservedPropertySimple<boolean>;
    get optionsButtonState() {
        return this.__optionsButtonState.get();
    }
    set optionsButtonState(newValue: boolean) {
        this.__optionsButtonState.set(newValue);
    }
    private __currentAudioEffect: ObservedPropertyObject<Resource>;
    get currentAudioEffect() {
        return this.__currentAudioEffect.get();
    }
    set currentAudioEffect(newValue: Resource) {
        this.__currentAudioEffect.set(newValue);
    }
    private __selectColor: ObservedPropertySimple<Color>;
    get selectColor() {
        return this.__selectColor.get();
    }
    set selectColor(newValue: Color) {
        this.__selectColor.set(newValue);
    }
    private __audioEffectModeSettingIndex: ObservedPropertySimple<number>;
    get audioEffectModeSettingIndex() {
        return this.__audioEffectModeSettingIndex.get();
    }
    set audioEffectModeSettingIndex(newValue: number) {
        this.__audioEffectModeSettingIndex.set(newValue);
    }
    private __contentTypeIndex: ObservedPropertySimple<number>;
    get contentTypeIndex() {
        return this.__contentTypeIndex.get();
    }
    set contentTypeIndex(newValue: number) {
        this.__contentTypeIndex.set(newValue);
    }
    private __streamUsageIndex: ObservedPropertySimple<number>;
    get streamUsageIndex() {
        return this.__streamUsageIndex.get();
    }
    set streamUsageIndex(newValue: number) {
        this.__streamUsageIndex.set(newValue);
    }
    async getStageFileDescriptor(fileName: string): Promise<fileDescriptorClass> {
        let fileDescriptor = new fileDescriptorClass(0, 0, 0);
        this.appContext = getContext();
        let mgr = this.appContext.resourceManager;
        await mgr.getRawFd(fileName).then(value => {
            fileDescriptor = new fileDescriptorClass(value.fd, value.offset, value.length);
            console.log('case getRawFileDescriptor success filefd: ' + value.fd);
        }).catch((error: string) => {
            console.log('case getRawFileDescriptor err: ' + error);
        });
        return fileDescriptor;
    }
    async aboutToAppear(): Promise<void> {
        this.appContext = getContext();
    }
    onBackPress(): void {
        if (this.audioRenderer !== undefined) {
            try {
                this.audioRenderer.stop();
                this.audioRenderer.release();
                console.info("release:SUCCEED");
            }
            catch (err) {
                let error = err as BusinessError;
                console.error(`audioRenderer release ,Error: ${JSON.stringify(error)}`);
                return;
            }
        }
    }
    async onPageHide(): Promise<void> {
        if (this.audioRenderer !== undefined) {
            if (this.audioRenderer.state === audio.AudioState.STATE_RUNNING) {
                await this.audioRenderer.pause();
                this.stateImgIndex = 0;
                this.stateTextIndex = 0;
                console.info('The audio renderer has been paused.');
                this.optionsButtonState = true;
            }
        }
    }
    mapContentIndexToType(index: number): number | undefined {
        // map the index of options to the content type in @ohos.multimedia.audio
        let index2Content = new Map([
            [0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5]
        ]);
        console.info("get content type:" + index2Content.get(index));
        return index2Content.get(index);
    }
    mapStreamIndexToUsage(index: number): number | undefined {
        // map the index of options to the stream usage in @ohos.multimedia.audio
        let index2Usage = new Map([
            [0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7],
            [8, 8], [9, 10], [10, 11], [11, 12], [12, 13]
        ]);
        console.info("get stream usage:" + index2Usage.get(index));
        return index2Usage.get(index);
    }
    async createAudioEffectAndPlay(): Promise<void> {
        let audioRendererOptions: audio.AudioRendererOptions = {
            streamInfo: {
                samplingRate: audio.AudioSamplingRate.SAMPLE_RATE_44100,
                channels: audio.AudioChannel.CHANNEL_2,
                sampleFormat: audio.AudioSampleFormat.SAMPLE_FORMAT_S16LE,
                encodingType: audio.AudioEncodingType.ENCODING_TYPE_RAW
            },
            rendererInfo: {
                usage: this.mapStreamIndexToUsage(this.streamUsageIndex) as audio.StreamUsage,
                rendererFlags: 0
            }
        };
        try {
            this.audioRenderer = await audio.createAudioRenderer(audioRendererOptions);
            console.info("createAudioRenderer:SUCCEED");
        }
        catch (err) {
            let error = err as BusinessError;
            console.error(`audioRenderer create ,Error: ${JSON.stringify(error)}`);
            return;
        }
        try {
            await this.audioRenderer.setAudioEffectMode(this.audioEffectModeSettingIndex);
            console.info(" audioRenderer.setAudioEffectMode:SUCCEED");
        }
        catch (err) {
            let error = err as BusinessError;
            console.error(`audioRenderer setAudioEffectMode ,Error: ${JSON.stringify(error)}`);
            return;
        }
        try {
            await this.audioRenderer.start();
            console.info(" audioRenderer.start:SUCCEED");
        }
        catch (err) {
            let error = err as BusinessError;
            console.error(`audioRenderer start ,Error: ${JSON.stringify(error)}`);
            return;
        }
        let bufferSize: number = 0;
        try {
            bufferSize = await this.audioRenderer.getBufferSize();
            console.info(" get Buffer Size:SUCCEED");
        }
        catch (err) {
            let error = err as BusinessError;
            console.error(`get Buffer Size ,Error: ${JSON.stringify(error)}`);
            return;
        }
        console.info("buffer size:" + bufferSize);
        await this.getStageFileDescriptor(this.audioSource).then((res) => {
            this.fileDescriptor = res;
        });
        let buf = new ArrayBuffer(bufferSize);
        let startOffset: number = this.fileDescriptor.offset;
        let cur = startOffset + bufferSize;
        while (true) {
            // when render released,state is changed to STATE_RELEASED
            if (!this.audioRenderer) {
                break;
            }
            if (this.audioRenderer.state === audio.AudioState.STATE_RELEASED) {
                break;
            }
            while (cur <= startOffset + this.fileDescriptor.length - bufferSize) {
                class options {
                    offset: number = 0;
                    length: number = 0;
                }
                let readOptions: options = {
                    offset: cur,
                    length: bufferSize
                };
                await fs.read(this.fileDescriptor.fd, buf, readOptions);
                try {
                    await this.audioRenderer.write(buf);
                }
                catch (err) {
                    let error = err as BusinessError;
                    console.error(`audioRenderer write ,Error: ${JSON.stringify(error)}`);
                    return;
                }
                cur += bufferSize;
            }
            cur = startOffset + bufferSize;
        }
    }
    async playOrPause(): Promise<void> {
        if (this.stateImgIndex === 0) {
            if (this.audioRenderer === undefined || this.audioRenderer.state === audio.AudioState.STATE_RELEASED) {
                this.createAudioEffectAndPlay();
                this.stateImgIndex = 1;
                this.stateTextIndex = 1;
                this.optionsButtonState = false;
                this.selectColor = Color.Gray;
                this.queryButtonState = true;
            }
            else {
                let previousARInfo: audio.AudioRendererInfo = await this.audioRenderer.getRendererInfo();
                let previousContent = previousARInfo.content;
                let previousUsage = previousARInfo.usage;
                if (this.mapContentIndexToType(this.contentTypeIndex) != previousContent
                    || this.mapStreamIndexToUsage(this.streamUsageIndex) != previousUsage) {
                    try {
                        await this.audioRenderer.stop();
                        await this.audioRenderer.release();
                    }
                    catch (err) {
                        let error = err as BusinessError;
                        console.error(`audioRenderer release ,Error: ${JSON.stringify(error)}`);
                        return;
                    }
                    this.stateImgIndex = 1;
                    this.stateTextIndex = 1;
                    this.optionsButtonState = false;
                    this.selectColor = Color.Gray;
                    this.queryButtonState = true;
                    this.createAudioEffectAndPlay();
                }
                else {
                    await this.audioRenderer.start();
                    this.stateImgIndex = 1;
                    this.stateTextIndex = 1;
                    this.optionsButtonState = false;
                    this.selectColor = Color.Gray;
                    this.queryButtonState = true;
                }
            }
        }
        else {
            console.info('Try to pause');
            if (this.audioRenderer === undefined) {
                return;
            }
            try {
                await this.audioRenderer.pause();
            }
            catch (err) {
                let error = err as BusinessError;
                console.error(`audioRenderer pause ,Error: ${JSON.stringify(error)}`);
                return;
            }
            this.stateImgIndex = 0;
            this.stateTextIndex = 0;
            console.info('The audio renderer has been paused.');
            this.optionsButtonState = true;
            this.selectColor = Color.Black;
        }
    }
    render() {
        Column.create();
        Column.height('100%');
        Column.width('100%');
        Column.justifyContent(FlexAlign.SpaceBetween);
        Column.backgroundColor('#F1F3F5');
        Column.onClick(() => {
            this.showSelector_1 = false;
            this.showSelector_2 = false;
            this.showSelector_3 = false;
        });
        Column.create();
        Row.create();
        Navigation.create();
        Navigation.id('back_btn_realtime');
        Navigation.height(56);
        Navigation.width(384);
        Navigation.hideBackButton(false);
        Navigation.titleMode(NavigationTitleMode.Mini);
        Navigation.title($r('app.string.EffectManager'));
        Navigation.mode(NavigationMode.Stack);
        Navigation.backgroundColor('#F1F3F5');
        NavRouter.create();
        NavRouter.onStateChange(async (isActivated: boolean) => {
            console.info("hello");
            if (this.audioRenderer !== undefined) {
                try {
                    await this.audioRenderer.stop();
                    await this.audioRenderer.release();
                }
                catch (err) {
                    let error = err as BusinessError;
                    console.error(`audioRenderer release ,Error: ${JSON.stringify(error)}`);
                    return;
                }
            }
            await router.pushUrl({ url: 'pages/Index' });
        });
        NavDestination.create();
        NavDestination.pop();
        NavRouter.pop();
        Navigation.pop();
        Row.pop();
        Row.create();
        Row.zIndex(1);
        Flex.create({ justifyContent: FlexAlign.Center, alignItems: ItemAlign.Center });
        Flex.height(40);
        Flex.width(140);
        Flex.backgroundColor('#F1F3F5');
        Flex.borderRadius(16);
        Flex.margin({ left: 37, right: 6 });
        Flex.padding({
            left: 16,
            right: 16
        });
        Flex.enabled(this.optionsButtonState);
        Flex.id('select_content_realtime');
        Flex.onClick(() => {
            this.showSelector_1 = !this.showSelector_1;
            this.showSelector_2 = false;
            this.showSelector_3 = false;
        });
        Row.create();
        Text.create(this.contentTypeOptions[this.contentTypeIndex].name);
        Text.textAlign(TextAlign.Center);
        Text.textOverflow({ overflow: TextOverflow.None });
        Text.fontColor(this.selectColor);
        Text.fontSize(16);
        Text.fontWeight(500);
        Text.fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
        Text.pop();
        If.create();
        if (this.showSelector_1) {
            If.branchId(0);
            Image.create($r('app.media.ic_arrow_up_big'));
            Image.height(7);
            Image.width(10);
            Image.fillColor(this.selectColor);
            Image.margin({ left: 8 });
        }
        else {
            If.branchId(1);
            Image.create($r('app.media.ic_arrow_down_big'));
            Image.height(7);
            Image.width(10);
            Image.fillColor(this.selectColor);
            Image.margin({ left: 8 });
        }
        If.pop();
        Row.pop();
        Flex.pop();
        If.create();
        if (this.showSelector_1) {
            If.branchId(0);
            Flex.create({ direction: FlexDirection.Column, justifyContent: FlexAlign.Start });
            Flex.height(296);
            Flex.width(156);
            Flex.backgroundColor('#fff');
            Flex.borderRadius(16);
            Flex.shadow({ radius: 50, color: 'rgba(0,0,30,0.1500)' });
            Flex.padding({ left: 4, right: 4, top: 4, bottom: 4 });
            Flex.position({ x: 54, y: 40 });
            Flex.zIndex(1);
            ForEach.create("3", this, ObservedObject.GetRawObject(this.contentTypeOptions), (item: ModeType) => {
                Flex.create();
                Flex.width(156);
                Flex.onClick(() => {
                    if (this.contentTypeIndex !== item.id) {
                        this.contentTypeIndex = item.id;
                        console.info('this.contentTypeIndex===' + this.contentTypeIndex);
                        this.queryResult = $r('app.string.BLANK');
                        this.queryButtonState = false;
                        this.audioEffectModeSettingIndex = 1;
                    }
                    this.showSelector_1 = false;
                });
                let earlierCreatedChild_2: ModeItem_1 = (this && this.findChildById) ? this.findChildById("2") as ModeItem_1 : undefined;
                if (earlierCreatedChild_2 == undefined) {
                    View.create(new ModeItem_1("2", this, { mode: item }));
                }
                else {
                    earlierCreatedChild_2.updateWithValueParams({
                        mode: item
                    });
                    View.create(earlierCreatedChild_2);
                }
                Flex.pop();
            }, (item: ModeType) => item.id.toString());
            ForEach.pop();
            Flex.pop();
        }
        If.pop();
        Flex.create({ justifyContent: FlexAlign.Center, alignItems: ItemAlign.Center });
        Flex.height(40);
        Flex.width(140);
        Flex.margin({ right: 37 });
        Flex.backgroundColor('#F1F3F5');
        Flex.borderRadius(16);
        Flex.padding({
            left: 16,
            right: 16
        });
        Flex.enabled(this.optionsButtonState);
        Flex.id('select_usage_realtime');
        Flex.onClick(() => {
            this.showSelector_1 = false;
            this.showSelector_2 = !this.showSelector_2;
            this.showSelector_3 = false;
        });
        Row.create();
        Text.create(this.streamUsageOptions[this.streamUsageIndex].name);
        Text.textAlign(TextAlign.Center);
        Text.fontSize(16);
        Text.fontWeight(500);
        Text.fontColor(this.selectColor);
        Text.fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
        Text.pop();
        If.create();
        if (this.showSelector_2) {
            If.branchId(0);
            Image.create($r('app.media.ic_arrow_up_small'));
            Image.height(7);
            Image.width(10);
            Image.fillColor(this.selectColor);
            Image.margin({ left: 8 });
        }
        else {
            If.branchId(1);
            Image.create($r('app.media.ic_arrow_down_small'));
            Image.height(7);
            Image.width(10);
            Image.fillColor(this.selectColor);
            Image.margin({ left: 8 });
        }
        If.pop();
        Row.pop();
        Flex.pop();
        If.create();
        if (this.showSelector_2) {
            If.branchId(0);
            Flex.create({ direction: FlexDirection.Column, justifyContent: FlexAlign.Start });
            Flex.height(344);
            Flex.width(156);
            Flex.backgroundColor('#fff');
            Flex.borderRadius(16);
            Flex.shadow({ radius: 50, color: 'rgba(0,0,30,0.1500)' });
            Flex.padding({ left: 4, right: 4, top: 4, bottom: 4 });
            Flex.position({ x: 145, y: 40 });
            Flex.zIndex(1);
            Scroll.create(this.scroller);
            Scroll.scrollable(ScrollDirection.Vertical);
            Scroll.scrollBar(BarState.On);
            Scroll.scrollBarColor(Color.Gray);
            Scroll.scrollBarWidth(10);
            Scroll.edgeEffect(EdgeEffect.None);
            Column.create();
            ForEach.create("5", this, ObservedObject.GetRawObject(this.streamUsageOptions), (item: ModeType) => {
                Flex.create();
                Flex.width(156);
                Flex.onClick(() => {
                    if (this.streamUsageIndex !== item.id) {
                        this.streamUsageIndex = item.id;
                        console.info('this.streamUsageIndex===' + this.streamUsageIndex);
                        this.queryResult = $r('app.string.BLANK');
                        this.queryButtonState = false;
                        this.audioEffectModeSettingIndex = 1;
                    }
                    this.showSelector_2 = false;
                });
                let earlierCreatedChild_4: ModeItem_2 = (this && this.findChildById) ? this.findChildById("4") as ModeItem_2 : undefined;
                if (earlierCreatedChild_4 == undefined) {
                    View.create(new ModeItem_2("4", this, { mode: item }));
                }
                else {
                    earlierCreatedChild_4.updateWithValueParams({
                        mode: item
                    });
                    View.create(earlierCreatedChild_4);
                }
                Flex.pop();
            }, (item: ModeType) => item.id.toString());
            ForEach.pop();
            Column.pop();
            Scroll.pop();
            Flex.pop();
        }
        If.pop();
        Row.pop();
        Column.create();
        Column.zIndex(0);
        Column.width(360);
        Column.height(160);
        Column.backgroundColor(Color.White);
        Column.padding({ left: 12, right: 12 });
        Column.borderRadius(20);
        Row.create();
        Row.justifyContent(FlexAlign.SpaceBetween);
        Row.height(56);
        Row.width('100%');
        Row.margin({ top: 4, bottom: 1 });
        Row.create();
        Image.create(this.stateImg[this.stateImgIndex]);
        Image.height(36);
        Image.width(36);
        Image.id('play_pause_realtime');
        Image.onClick(async () => {
            this.showSelector_1 = false;
            this.showSelector_2 = false;
            this.showSelector_3 = false;
            await this.playOrPause();
        });
        Text.create($r('app.string.CURRENT_AUDIO_EFFECT'));
        Text.fontSize(16);
        Text.fontWeight(500);
        Text.fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
        Text.width(112);
        Text.height(20);
        Text.margin({ left: 12 });
        Text.pop();
        Text.create(this.audioPlayState[this.stateTextIndex]);
        Text.fontSize(2);
        Text.height(20);
        Text.width(5);
        Text.fontColor(Color.White);
        Text.id('audio_play_state');
        Text.pop();
        Row.pop();
        Button.createWithLabel($r('app.string.QUERY'), { type: ButtonType.Capsule, stateEffect: true });
        Button.backgroundColor('rgba(24,36,49,0.05)');
        Button.fontColor('#007DFF');
        Button.fontSize(12);
        Button.fontWeight(500);
        Button.fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
        Button.height(28);
        Button.width(72);
        Button.id('query_btn_realtime');
        Button.enabled(this.queryButtonState);
        Button.onClick(async () => {
            this.showSelector_1 = false;
            this.showSelector_2 = false;
            this.showSelector_3 = false;
            if (this.audioRenderer !== undefined) {
                if (this.audioRenderer.state === audio.AudioState.STATE_RUNNING
                    || this.audioRenderer.state === audio.AudioState.STATE_PAUSED) {
                    console.info('Cur audio effect query Button onClick');
                    let audioEffectMode = 1;
                    try {
                        audioEffectMode = await this.audioRenderer.getAudioEffectMode();
                        console.info('cur audio effect mode value:' + audioEffectMode);
                    }
                    catch (err) {
                        let error = err as BusinessError;
                        console.error(`audioRenderer getAudioEffectMode ,Error: ${JSON.stringify(error)}`);
                        return;
                    }
                    if (audioEffectMode === 0) {
                        this.currentAudioEffect = $r('app.string.EFFECT_NONE');
                    }
                    else if (audioEffectMode === 1) {
                        this.currentAudioEffect = $r('app.string.EFFECT_DEFAULT');
                    }
                    this.queryResult = this.currentAudioEffect;
                }
            }
        });
        Button.pop();
        Row.pop();
        Row.create();
        Row.height(1);
        Row.width(280);
        Row.margin({ right: -40 });
        Row.backgroundColor('#F1F3F5');
        Row.pop();
        Row.create();
        Row.justifyContent(FlexAlign.SpaceBetween);
        Row.height(48);
        Row.width('100%');
        Text.create($r('app.string.QUERY_RESULT'));
        Text.fontSize(16);
        Text.fontWeight(500);
        Text.fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
        Text.pop();
        Text.create(this.queryResult);
        Text.fontSize(14);
        Text.margin({ top: 22 });
        Text.fontColor(Color.Gray);
        Text.id('query_result_realtime');
        Text.pop();
        Row.pop();
        Row.create();
        Row.height(1);
        Row.width('100%');
        Row.backgroundColor('#F1F3F5');
        Row.pop();
        Row.create();
        Row.margin({ top: 1, bottom: 4 });
        Row.height(48);
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceBetween);
        Text.create($r('app.string.AUDIO_EFFECT_MODE_SETTING'));
        Text.fontSize(16);
        Text.fontWeight(500);
        Text.fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
        Text.height(22);
        Text.pop();
        Flex.create({ justifyContent: FlexAlign.End, alignItems: ItemAlign.Center });
        Flex.height(22);
        Flex.width(95);
        Flex.backgroundColor(Color.White);
        Flex.id('select_mode_realtime');
        Flex.onClick(() => {
            this.showSelector_1 = false;
            this.showSelector_2 = false;
            this.showSelector_3 = !this.showSelector_3;
        });
        Row.create();
        Text.create(this.audioEffectModeSettingOptions[this.audioEffectModeSettingIndex].name);
        Text.textAlign(TextAlign.Center);
        Text.id('select_mode_name_realtime');
        Text.textOverflow({ overflow: TextOverflow.None });
        Text.fontSize(16);
        Text.fontWeight(500);
        Text.fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
        Text.pop();
        If.create();
        if (this.showSelector_3) {
            If.branchId(0);
            Image.create($r('app.media.ic_arrow_up_small'));
            Image.height(7);
            Image.width(10);
            Image.margin({ left: 8 });
        }
        else {
            If.branchId(1);
            Image.create($r('app.media.ic_arrow_down_small'));
            Image.height(7);
            Image.width(10);
            Image.margin({ left: 8 });
        }
        If.pop();
        Row.pop();
        Flex.pop();
        If.create();
        if (this.showSelector_3) {
            If.branchId(0);
            Flex.create({ direction: FlexDirection.Column, justifyContent: FlexAlign.Start });
            Flex.height(105);
            Flex.width(156);
            Flex.backgroundColor('#fff');
            Flex.borderRadius(16);
            Flex.shadow({ radius: 50, color: 'rgba(0,0,30,0.1500)' });
            Flex.padding({ left: 4, right: 4, top: 6, bottom: 4 });
            Flex.position({ x: 180, y: 40 });
            Flex.zIndex(1);
            ForEach.create("7", this, ObservedObject.GetRawObject(this.audioEffectModeSettingOptions), (item: ModeType) => {
                Flex.create();
                Flex.width(156);
                Flex.onClick(async () => {
                    if (this.audioEffectModeSettingIndex !== item.id) {
                        this.audioEffectModeSettingIndex = item.id;
                        console.info('this.audioEffectModeSettingIndex===' + this.audioEffectModeSettingIndex);
                        if (this.audioRenderer !== undefined && this.audioRenderer.state !== audio.AudioState.STATE_RELEASED) {
                            try {
                                this.audioRenderer.setAudioEffectMode(item.id);
                            }
                            catch (err) {
                                let error = err as BusinessError;
                                console.error(`audioRenderer setAudioEffectMode ,Error: ${JSON.stringify(error)}`);
                            }
                        }
                    }
                    this.showSelector_3 = false;
                });
                let earlierCreatedChild_6: ModeItem_3 = (this && this.findChildById) ? this.findChildById("6") as ModeItem_3 : undefined;
                if (earlierCreatedChild_6 == undefined) {
                    View.create(new ModeItem_3("6", this, { mode: item }));
                }
                else {
                    earlierCreatedChild_6.updateWithValueParams({
                        mode: item
                    });
                    View.create(earlierCreatedChild_6);
                }
                Flex.pop();
            }, (item: ModeType) => item.id.toString());
            ForEach.pop();
            Flex.pop();
        }
        If.pop();
        Row.pop();
        Column.pop();
        Column.pop();
        Row.create();
        Row.height(56);
        Row.width(360);
        Column.create();
        Column.margin({ left: 24 });
        Column.height(56);
        Column.width(156);
        Column.id('switch_btn_realtime');
        Column.onClick(async () => {
            if (this.audioRenderer != null) {
                try {
                    await this.audioRenderer.stop();
                    await this.audioRenderer.release();
                }
                catch (err) {
                    let error = err as BusinessError;
                    console.error(`audioRenderer release ,Error: ${JSON.stringify(error)}`);
                }
            }
            await router.replaceUrl({ url: 'pages/PresetEffect' });
        });
        Image.create($r('app.media.ic_Silent_normal'));
        Image.width(24);
        Image.height(24);
        Image.margin({ top: 7, bottom: 4 });
        Text.create($r('app.string.PRESET_AUDIO_EFFECT_QUERY'));
        Text.fontSize(10);
        Text.height(14);
        Text.pop();
        Column.pop();
        Column.create();
        Column.height(56);
        Column.width(156);
        Column.margin({ right: 24 });
        Image.create($r('app.media.ic_Sound_select'));
        Image.width(24);
        Image.height(24);
        Image.margin({ top: 7, bottom: 4 });
        Text.create($r('app.string.REALTIME_AUDIO_EFFECT_SETTING'));
        Text.fontSize(10);
        Text.height(14);
        Text.fontColor('#007DFF');
        Text.pop();
        Column.pop();
        Row.pop();
        Column.pop();
    }
}
loadDocument(new RealtimeAudioEffectQuery("1", undefined, {}));
