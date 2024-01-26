interface Focus_Params {
    outSetValueOne?: number;
    audioRenderers?: audio.AudioRenderer[];
    audioRendererOptions?: audio.AudioRendererOptions[];
    fileDescriptors?: resourceManager.RawFileDescriptor[];
    appContext?: common.Context;
    audioSources?;
    stateImg?: Array<Resource>;
    stateText?: Array<string>;
    starts?: Array<number>;
    curTimeSecs?: Array<number>;
    musicIsClicked?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Focus_" + ++__generate__Id;
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
import resourceManager from '@ohos.resourceManager';
import { BusinessError } from '@ohos.base';
const MUSIC_INDEX = 0;
const RINGTONE_INDEX = 1;
const TOTAL_SECOND = 30;
const PLAYER_CONTAINER = [0, 1];
class Focus extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__outSetValueOne = new ObservedPropertySimple(50, this, "outSetValueOne");
        this.audioRenderers = [];
        this.audioRendererOptions = [
            {
                streamInfo: {
                    samplingRate: audio.AudioSamplingRate.SAMPLE_RATE_44100,
                    channels: audio.AudioChannel.CHANNEL_2,
                    sampleFormat: audio.AudioSampleFormat.SAMPLE_FORMAT_S16LE,
                    encodingType: audio.AudioEncodingType.ENCODING_TYPE_RAW
                },
                rendererInfo: {
                    usage: audio.StreamUsage.STREAM_USAGE_MUSIC,
                    rendererFlags: 0
                }
            },
            {
                streamInfo: {
                    samplingRate: audio.AudioSamplingRate.SAMPLE_RATE_44100,
                    channels: audio.AudioChannel.CHANNEL_2,
                    sampleFormat: audio.AudioSampleFormat.SAMPLE_FORMAT_S16LE,
                    encodingType: audio.AudioEncodingType.ENCODING_TYPE_RAW
                },
                rendererInfo: {
                    usage: audio.StreamUsage.STREAM_USAGE_RINGTONE,
                    rendererFlags: 0
                }
            }
        ];
        this.fileDescriptors = [];
        this.appContext = undefined;
        this.audioSources = ['test1.wav', 'test2.wav'];
        this.__stateImg = new ObservedPropertyObject([$r('app.media.ic_pause_y'), $r('app.media.ic_pause_no')], this, "stateImg");
        this.__stateText = new ObservedPropertyObject(['ic_pause', 'ic_pause_no'], this, "stateText");
        this.__starts = new ObservedPropertyObject([0, 0], this, "starts");
        this.__curTimeSecs = new ObservedPropertyObject([0, 0], this, "curTimeSecs");
        this.__musicIsClicked = new ObservedPropertySimple(false, this, "musicIsClicked");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Focus_Params) {
        if (params.outSetValueOne !== undefined) {
            this.outSetValueOne = params.outSetValueOne;
        }
        if (params.audioRenderers !== undefined) {
            this.audioRenderers = params.audioRenderers;
        }
        if (params.audioRendererOptions !== undefined) {
            this.audioRendererOptions = params.audioRendererOptions;
        }
        if (params.fileDescriptors !== undefined) {
            this.fileDescriptors = params.fileDescriptors;
        }
        if (params.appContext !== undefined) {
            this.appContext = params.appContext;
        }
        if (params.audioSources !== undefined) {
            this.audioSources = params.audioSources;
        }
        if (params.stateImg !== undefined) {
            this.stateImg = params.stateImg;
        }
        if (params.stateText !== undefined) {
            this.stateText = params.stateText;
        }
        if (params.starts !== undefined) {
            this.starts = params.starts;
        }
        if (params.curTimeSecs !== undefined) {
            this.curTimeSecs = params.curTimeSecs;
        }
        if (params.musicIsClicked !== undefined) {
            this.musicIsClicked = params.musicIsClicked;
        }
    }
    aboutToBeDeleted() {
        this.__outSetValueOne.aboutToBeDeleted();
        this.__stateImg.aboutToBeDeleted();
        this.__stateText.aboutToBeDeleted();
        this.__starts.aboutToBeDeleted();
        this.__curTimeSecs.aboutToBeDeleted();
        this.__musicIsClicked.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __outSetValueOne: ObservedPropertySimple<number>;
    get outSetValueOne() {
        return this.__outSetValueOne.get();
    }
    set outSetValueOne(newValue: number) {
        this.__outSetValueOne.set(newValue);
    }
    private audioRenderers: audio.AudioRenderer[];
    private audioRendererOptions: audio.AudioRendererOptions[];
    private fileDescriptors: resourceManager.RawFileDescriptor[];
    private appContext?: common.Context;
    private audioSources;
    private __stateImg: ObservedPropertyObject<Array<Resource>>;
    get stateImg() {
        return this.__stateImg.get();
    }
    set stateImg(newValue: Array<Resource>) {
        this.__stateImg.set(newValue);
    }
    private __stateText: ObservedPropertyObject<Array<string>>;
    get stateText() {
        return this.__stateText.get();
    }
    set stateText(newValue: Array<string>) {
        this.__stateText.set(newValue);
    }
    private __starts: ObservedPropertyObject<Array<number>>;
    get starts() {
        return this.__starts.get();
    }
    set starts(newValue: Array<number>) {
        this.__starts.set(newValue);
    }
    private __curTimeSecs: ObservedPropertyObject<Array<number>>;
    get curTimeSecs() {
        return this.__curTimeSecs.get();
    }
    set curTimeSecs(newValue: Array<number>) {
        this.__curTimeSecs.set(newValue);
    }
    private __musicIsClicked: ObservedPropertySimple<boolean>;
    get musicIsClicked() {
        return this.__musicIsClicked.get();
    }
    set musicIsClicked(newValue: boolean) {
        this.__musicIsClicked.set(newValue);
    }
    aboutToAppear(): void {
        this.init();
    }
    async init(): Promise<void> {
        if (this.appContext) {
            return;
        }
        this.stateImg = [$r('app.media.ic_pause_y'), $r('app.media.ic_pause_no')];
        this.stateText = ['ic_pause', 'ic_pause_no'];
        this.starts = [0, 0];
        this.curTimeSecs = [0, 0];
        this.musicIsClicked = false;
        this.appContext = getContext(this);
        await this.getStageFileDescriptor(this.audioSources[MUSIC_INDEX]);
        await this.getStageFileDescriptor(this.audioSources[RINGTONE_INDEX]);
        for (let index = 0; index < PLAYER_CONTAINER.length; index++) {
            try {
                let renderer = await audio.createAudioRenderer(this.audioRendererOptions[index]);
                this.audioRenderers.push(renderer);
                await this.audioRenderers[index].setInterruptMode(audio.InterruptMode.INDEPENDENT_MODE);
                this.listenState(index);
                this.listenFocus(index);
            }
            catch (err) {
                let error = err as BusinessError;
                console.error(`audioRenderer_${index} create ,Error: ${JSON.stringify(error)}`);
                return;
            }
        }
    }
    async over(): Promise<void> {
        this.appContext = undefined;
        for (let index = 0; index < this.audioRenderers.length; index++) {
            await this.audioRenderers[index].release();
        }
        this.audioRenderers = [];
        for (let index = 0; index < this.fileDescriptors.length; index++) {
            await this.closeResource(this.audioSources[index]);
        }
        this.fileDescriptors = [];
    }
    onBackPress(): void {
        this.over();
    }
    async onPageHide(): Promise<void> {
        this.over();
    }
    onPageShow(): void {
        this.init();
    }
    listenFocus(index: number): void {
        this.audioRenderers[index].on('audioInterrupt', async (audioInterrupt) => {
            let hintType = audioInterrupt.hintType;
            if (hintType === audio.InterruptHint.INTERRUPT_HINT_PAUSE) {
                this.stateImg[index] = $r('app.media.ic_pause_no');
                this.stateText[index] = 'ic_pause_no';
            }
            if (hintType === audio.InterruptHint.INTERRUPT_HINT_RESUME) {
                this.stateImg[index] = $r('app.media.ic_play_no');
                this.stateText[index] = 'ic_play_no';
                await this.play(index);
            }
        });
    }
    listenState(index: number): void {
        this.audioRenderers[index].on('stateChange', state => {
            if (state === audio.AudioState.STATE_RUNNING) {
                if (index === 0) {
                    this.stateImg[index] = $r('app.media.ic_play_no');
                    this.stateText[index] = 'ic_play_no';
                }
                else {
                    this.stateImg[index] = $r('app.media.ic_play_y');
                    this.stateText[index] = 'ic_play';
                }
            }
            if (state === audio.AudioState.STATE_PAUSED) {
                this.stateImg[index] = $r('app.media.ic_pause_y');
                this.stateText[index] = 'ic_pause';
            }
            if (state === audio.AudioState.STATE_STOPPED) {
                this.stateImg[index] = $r('app.media.ic_pause_no');
                this.stateText[index] = 'ic_pause_no';
            }
        });
    }
    getCurTimeSec(totalSec: number, totalLen: number, PastLen: number): number {
        return Number((totalSec / totalLen * PastLen).toFixed(0));
    }
    async getStageFileDescriptor(fileName: string): Promise<void> {
        if (this.appContext) {
            let mgr = this.appContext.resourceManager;
            await mgr.getRawFd(fileName).then(value => {
                this.fileDescriptors.push(value);
                console.log('case getRawFileDescriptor success fileName: ' + fileName);
            }).catch((error: BusinessError) => {
                console.log('case getRawFileDescriptor err: ' + error);
            });
        }
    }
    async closeResource(fileName: string): Promise<void> {
        if (this.appContext) {
            let mgr = this.appContext.resourceManager;
            await mgr.closeRawFd(fileName).then(() => {
                console.log('case closeRawFd success fileName: ' + fileName);
            }).catch((error: BusinessError) => {
                console.log('case closeRawFd err: ' + error);
            });
        }
    }
    async play(index: number): Promise<void> {
        if (this.audioRenderers[index] === null) {
            return;
        }
        let bufferSize: number = 0;
        try {
            bufferSize = await this.audioRenderers[index].getBufferSize();
            await this.audioRenderers[index].start();
        }
        catch (err) {
            let error = err as BusinessError;
            console.error(`audioRenderer start : Error: ${JSON.stringify(error)}`);
            return;
        }
        try {
            let buf = new ArrayBuffer(bufferSize);
            let start = this.fileDescriptors[index].offset as number;
            if (this.starts[index] === 0) {
                this.starts[index] = start;
            }
            let cur = this.starts[index];
            while (cur < start + this.fileDescriptors[index].length) {
                // when render released,state is changed to STATE_RELEASED
                if (this.audioRenderers[index].state === audio.AudioState.STATE_RELEASED) {
                    break;
                }
                // when render paused,state is changed to STATE_PAUSED
                if (this.audioRenderers[index].state === audio.AudioState.STATE_PAUSED) {
                    this.starts[index] = cur;
                    break;
                }
                // when render stopped,state is changed to STATE_STOPPED
                if (this.audioRenderers[index].state === audio.AudioState.STATE_STOPPED) {
                    this.starts[index] = this.fileDescriptors[index].length;
                    this.curTimeSecs[index] = TOTAL_SECOND;
                    break;
                }
                class Options {
                    offset: number = 0;
                    length: number = 0;
                }
                let options: Options = {
                    offset: cur,
                    length: bufferSize
                };
                await fs.read(this.fileDescriptors[index].fd, buf, options);
                await this.audioRenderers[index].write(buf);
                // update progress
                this.curTimeSecs[index] = this.getCurTimeSec(TOTAL_SECOND, this.fileDescriptors[index].length, cur - start);
                cur += bufferSize;
            }
            // when audio play completed,update state to stopped
            if (cur >= this.fileDescriptors[index].length) {
                await this.audioRenderers[index].stop();
                this.curTimeSecs[index] = TOTAL_SECOND;
            }
        }
        catch (err) {
            let error = err as BusinessError;
            console.error(`audioRenderer write : Error: ${JSON.stringify(error)}`);
        }
    }
    async stop(index: number): Promise<void> {
        try {
            await this.audioRenderers[index].stop();
        }
        catch (err) {
            let error = err as BusinessError;
            console.error(`render_1  stop err:${JSON.stringify(error)}`);
        }
    }
    render() {
        Column.create();
        Column.height('100%');
        Column.width('100%');
        Column.backgroundColor('#f1f3f5');
        Row.create();
        Row.height(56);
        Row.width('100%');
        Row.id('back_btn_focus');
        Row.onClick(async () => {
            await router.pushUrl({ url: 'pages/Index' });
        });
        Navigation.create();
        Navigation.height('100%');
        Navigation.width('100%');
        Navigation.hideBackButton(false);
        Navigation.titleMode(NavigationTitleMode.Mini);
        Navigation.title($r('app.string.AudioFocus'));
        Navigation.mode(NavigationMode.Stack);
        NavRouter.create();
        NavDestination.create();
        NavDestination.pop();
        NavRouter.pop();
        Navigation.pop();
        Row.pop();
        Column.create();
        Column.width('100%');
        Column.padding({ left: '3.35%', right: '3.35%' });
        Column.create();
        Column.id('music_player_item');
        Column.height(126);
        Column.width('100%');
        Column.padding({ left: '3.35%', right: '3.35%' });
        Column.backgroundColor(Color.White);
        Column.margin({ bottom: 20 });
        Column.borderRadius(24);
        Column.onClick(() => {
            if (this.audioRenderers[MUSIC_INDEX].state === audio.AudioState.STATE_PREPARED) {
                this.play(MUSIC_INDEX);
                this.musicIsClicked = true;
                this.stateText[RINGTONE_INDEX] = 'ic_pause';
                this.stateImg[RINGTONE_INDEX] = $r('app.media.ic_pause_y');
            }
        });
        Row.create();
        Row.justifyContent(FlexAlign.SpaceBetween);
        Row.width('100%');
        Row.margin({ top: 12 });
        Row.create();
        Image.create($r('app.media.ic_music'));
        Image.width(48);
        Image.height(48);
        Text.create($r('app.string.MusicType'));
        Text.fontSize(16);
        Text.margin({ left: 12 });
        Text.fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
        Text.fontColor('#182431');
        Text.fontWeight(500);
        Text.pop();
        Row.pop();
        Text.create(this.stateText[MUSIC_INDEX]);
        Text.id('music_state_text');
        Text.fontSize(10);
        Text.fontColor(Color.White);
        Text.pop();
        Image.create(this.stateImg[MUSIC_INDEX]);
        Image.id('music_state_img');
        Image.width(36);
        Image.height(36);
        Row.pop();
        Row.create();
        Row.margin({ top: 24, bottom: 3 });
        Row.width('100%');
        Progress.create({ value: this.curTimeSecs[MUSIC_INDEX], total: TOTAL_SECOND, type: ProgressType.Linear });
        Progress.color('#007DFF');
        Progress.value(this.curTimeSecs[MUSIC_INDEX]);
        Progress.width('100%');
        Progress.height(4);
        Row.pop();
        Row.create();
        Row.justifyContent(FlexAlign.SpaceBetween);
        Row.width('100%');
        Text.create(this.curTimeSecs[MUSIC_INDEX] + 's');
        Text.fontSize(12);
        Text.fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
        Text.fontColor('#182431');
        Text.opacity(0.6);
        Text.fontWeight(400);
        Text.pop();
        Text.create(TOTAL_SECOND + 's');
        Text.fontSize(12);
        Text.fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
        Text.fontColor('#182431');
        Text.opacity(0.6);
        Text.fontWeight(400);
        Text.pop();
        Row.pop();
        Column.pop();
        Column.create();
        Column.id('ringtone_player_item');
        Column.width('100%');
        Column.padding({ left: '3.35%', right: '3.35%' });
        Column.height(126);
        Column.backgroundColor(Color.White);
        Column.borderRadius(24);
        Column.onClick(() => {
            if (this.audioRenderers[RINGTONE_INDEX].state === audio.AudioState.STATE_RUNNING) {
                this.stop(RINGTONE_INDEX);
            }
            else if (this.audioRenderers[RINGTONE_INDEX].state === audio.AudioState.STATE_PREPARED && this.musicIsClicked === true) {
                this.play(RINGTONE_INDEX);
            }
        });
        Row.create();
        Row.justifyContent(FlexAlign.SpaceBetween);
        Row.width('100%');
        Row.margin({ top: 10 });
        Row.create();
        Image.create($r('app.media.ic_ring'));
        Image.width(48);
        Image.height(48);
        Text.create($r('app.string.RingtoneType'));
        Text.fontSize(16);
        Text.margin({ left: 12 });
        Text.fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
        Text.fontColor('#182431');
        Text.fontWeight(500);
        Text.pop();
        Row.pop();
        Text.create(this.stateText[RINGTONE_INDEX]);
        Text.id('ringtone_state_text');
        Text.fontSize(10);
        Text.fontColor(Color.White);
        Text.pop();
        Image.create(this.stateImg[RINGTONE_INDEX]);
        Image.id('ringtone_state_img');
        Image.width(36);
        Image.height(36);
        Row.pop();
        Row.create();
        Row.margin({ top: 24, bottom: 3 });
        Progress.create({ value: this.curTimeSecs[RINGTONE_INDEX], total: TOTAL_SECOND, type: ProgressType.Linear });
        Progress.color('#007DFF');
        Progress.value(this.curTimeSecs[RINGTONE_INDEX]);
        Progress.width('100%');
        Progress.height(4);
        Row.pop();
        Row.create();
        Row.justifyContent(FlexAlign.SpaceBetween);
        Row.width('100%');
        Text.create(this.curTimeSecs[RINGTONE_INDEX] + 's');
        Text.fontSize(12);
        Text.fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
        Text.fontColor('#182431');
        Text.opacity(0.6);
        Text.fontWeight(400);
        Text.pop();
        Text.create(TOTAL_SECOND + 's');
        Text.fontSize(12);
        Text.fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
        Text.fontColor('#182431');
        Text.opacity(0.6);
        Text.fontWeight(400);
        Text.pop();
        Row.pop();
        Column.pop();
        Column.pop();
        Column.pop();
    }
}
loadDocument(new Focus("1", undefined, {}));
