interface ParallelCapturer_Params {
    fontColor?: string;
    selectedFontColor?: string;
    currentIndex?: number;
    audioCapturerNormal?: audio.AudioCapturer;
    audioCapturerScreen?: audio.AudioCapturer;
    recordState?: string;
    recordSec?: number;
    interval?: number;
    showTime?: string;
    audioCapturerOptionNormal?: audio.AudioCapturerOptions;
    audioCapturerOptionScreen?: audio.AudioCapturerOptions;
    audioRendererOptions?: audio.AudioRendererOptions;
    bufferSizeNormal?;
    bufferSizeScreen?;
    date?: string;
    audioRenderers?: audio.AudioRenderer[];
    titleList?: string[];
    pathList?: string[];
    fdList?: number[];
    playSecList?: number[];
    renderStateList?: number[];
    renderStartOffsetList?: number[];
    isRecordOver?: boolean;
    audioRendererOptionsMusic?: audio.AudioRendererOptions;
    audioRendererMusic?: audio.AudioRenderer;
    renderMusicState?: number;
    curTimeSec?: number;
    startMusicOffset?: number;
    appContext?: common.Context;
    fileDescriptor?: resourceManager.RawFileDescriptor;
    audioSource?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ParallelCapturer_" + ++__generate__Id;
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
import router from '@ohos.router';
import resourceManager from '@ohos.resourceManager';
import { BusinessError } from '@ohos.base';
const TOTAL_SECOND = 30;
const NORMAL_INDEX = 0;
const SCREEN_INDEX = 1;
const MIN_RECORD_SECOND = 5;
const RANDOM_NUM = 10000;
const INTERVAL_TIME = 1000;
const READ_TIME_OUT_SCREEN = 0;
const READ_TIME_OUT_NORMAL = 0;
class Options {
    offset: number = 0;
    length: number = 0;
}
class ParallelCapturer extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__fontColor = new ObservedPropertySimple('#182431', this, "fontColor");
        this.__selectedFontColor = new ObservedPropertySimple('#007DFF', this, "selectedFontColor");
        this.__currentIndex = new ObservedPropertySimple(1, this, "currentIndex");
        this.audioCapturerNormal = undefined;
        this.audioCapturerScreen = undefined;
        this.__recordState = new ObservedPropertySimple('init', this, "recordState");
        this.__recordSec = new ObservedPropertySimple(0, this, "recordSec");
        this.interval = 0;
        this.__showTime = new ObservedPropertySimple('00:00:00', this, "showTime");
        this.audioCapturerOptionNormal = {
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
        this.audioCapturerOptionScreen = {
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
                    usages: [audio.StreamUsage.STREAM_USAGE_MUSIC]
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
                usage: audio.StreamUsage.STREAM_USAGE_MUSIC,
                rendererFlags: 0
            }
        };
        this.bufferSizeNormal = 0;
        this.bufferSizeScreen = 0;
        this.__date = new ObservedPropertySimple('', this, "date");
        this.audioRenderers = [];
        this.__titleList = new ObservedPropertyObject(['', ''], this, "titleList");
        this.__pathList = new ObservedPropertyObject(['', ''], this, "pathList");
        this.__fdList = new ObservedPropertyObject([0, 0], this, "fdList");
        this.__playSecList = new ObservedPropertyObject([0, 0], this, "playSecList");
        this.__renderStateList = new ObservedPropertyObject([0, 0], this, "renderStateList");
        this.__renderStartOffsetList = new ObservedPropertyObject([0, 0], this, "renderStartOffsetList");
        this.__isRecordOver = new ObservedPropertySimple(false, this, "isRecordOver");
        this.audioRendererOptionsMusic = {
            streamInfo: {
                samplingRate: audio.AudioSamplingRate.SAMPLE_RATE_44100,
                channels: audio.AudioChannel.CHANNEL_2,
                sampleFormat: audio.AudioSampleFormat.SAMPLE_FORMAT_S16LE,
                encodingType: audio.AudioEncodingType.ENCODING_TYPE_RAW
            },
            rendererInfo: {
                usage: audio.StreamUsage.STREAM_USAGE_MUSIC,
                rendererFlags: 0
            },
            privacyType: 0
        };
        this.audioRendererMusic = undefined;
        this.__renderMusicState = new ObservedPropertySimple(0, this, "renderMusicState");
        this.__curTimeSec = new ObservedPropertySimple(0, this, "curTimeSec");
        this.__startMusicOffset = new ObservedPropertySimple(0, this, "startMusicOffset");
        this.appContext = undefined;
        this.fileDescriptor = undefined;
        this.audioSource = 'test1.wav';
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ParallelCapturer_Params) {
        if (params.fontColor !== undefined) {
            this.fontColor = params.fontColor;
        }
        if (params.selectedFontColor !== undefined) {
            this.selectedFontColor = params.selectedFontColor;
        }
        if (params.currentIndex !== undefined) {
            this.currentIndex = params.currentIndex;
        }
        if (params.audioCapturerNormal !== undefined) {
            this.audioCapturerNormal = params.audioCapturerNormal;
        }
        if (params.audioCapturerScreen !== undefined) {
            this.audioCapturerScreen = params.audioCapturerScreen;
        }
        if (params.recordState !== undefined) {
            this.recordState = params.recordState;
        }
        if (params.recordSec !== undefined) {
            this.recordSec = params.recordSec;
        }
        if (params.interval !== undefined) {
            this.interval = params.interval;
        }
        if (params.showTime !== undefined) {
            this.showTime = params.showTime;
        }
        if (params.audioCapturerOptionNormal !== undefined) {
            this.audioCapturerOptionNormal = params.audioCapturerOptionNormal;
        }
        if (params.audioCapturerOptionScreen !== undefined) {
            this.audioCapturerOptionScreen = params.audioCapturerOptionScreen;
        }
        if (params.audioRendererOptions !== undefined) {
            this.audioRendererOptions = params.audioRendererOptions;
        }
        if (params.bufferSizeNormal !== undefined) {
            this.bufferSizeNormal = params.bufferSizeNormal;
        }
        if (params.bufferSizeScreen !== undefined) {
            this.bufferSizeScreen = params.bufferSizeScreen;
        }
        if (params.date !== undefined) {
            this.date = params.date;
        }
        if (params.audioRenderers !== undefined) {
            this.audioRenderers = params.audioRenderers;
        }
        if (params.titleList !== undefined) {
            this.titleList = params.titleList;
        }
        if (params.pathList !== undefined) {
            this.pathList = params.pathList;
        }
        if (params.fdList !== undefined) {
            this.fdList = params.fdList;
        }
        if (params.playSecList !== undefined) {
            this.playSecList = params.playSecList;
        }
        if (params.renderStateList !== undefined) {
            this.renderStateList = params.renderStateList;
        }
        if (params.renderStartOffsetList !== undefined) {
            this.renderStartOffsetList = params.renderStartOffsetList;
        }
        if (params.isRecordOver !== undefined) {
            this.isRecordOver = params.isRecordOver;
        }
        if (params.audioRendererOptionsMusic !== undefined) {
            this.audioRendererOptionsMusic = params.audioRendererOptionsMusic;
        }
        if (params.audioRendererMusic !== undefined) {
            this.audioRendererMusic = params.audioRendererMusic;
        }
        if (params.renderMusicState !== undefined) {
            this.renderMusicState = params.renderMusicState;
        }
        if (params.curTimeSec !== undefined) {
            this.curTimeSec = params.curTimeSec;
        }
        if (params.startMusicOffset !== undefined) {
            this.startMusicOffset = params.startMusicOffset;
        }
        if (params.appContext !== undefined) {
            this.appContext = params.appContext;
        }
        if (params.fileDescriptor !== undefined) {
            this.fileDescriptor = params.fileDescriptor;
        }
        if (params.audioSource !== undefined) {
            this.audioSource = params.audioSource;
        }
    }
    aboutToBeDeleted() {
        this.__fontColor.aboutToBeDeleted();
        this.__selectedFontColor.aboutToBeDeleted();
        this.__currentIndex.aboutToBeDeleted();
        this.__recordState.aboutToBeDeleted();
        this.__recordSec.aboutToBeDeleted();
        this.__showTime.aboutToBeDeleted();
        this.__date.aboutToBeDeleted();
        this.__titleList.aboutToBeDeleted();
        this.__pathList.aboutToBeDeleted();
        this.__fdList.aboutToBeDeleted();
        this.__playSecList.aboutToBeDeleted();
        this.__renderStateList.aboutToBeDeleted();
        this.__renderStartOffsetList.aboutToBeDeleted();
        this.__isRecordOver.aboutToBeDeleted();
        this.__renderMusicState.aboutToBeDeleted();
        this.__curTimeSec.aboutToBeDeleted();
        this.__startMusicOffset.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __fontColor: ObservedPropertySimple<string>;
    get fontColor() {
        return this.__fontColor.get();
    }
    set fontColor(newValue: string) {
        this.__fontColor.set(newValue);
    }
    private __selectedFontColor: ObservedPropertySimple<string>;
    get selectedFontColor() {
        return this.__selectedFontColor.get();
    }
    set selectedFontColor(newValue: string) {
        this.__selectedFontColor.set(newValue);
    }
    private __currentIndex: ObservedPropertySimple<number>;
    get currentIndex() {
        return this.__currentIndex.get();
    }
    set currentIndex(newValue: number) {
        this.__currentIndex.set(newValue);
    }
    // Capturer
    private audioCapturerNormal?: audio.AudioCapturer;
    private audioCapturerScreen?: audio.AudioCapturer;
    private __recordState: ObservedPropertySimple<string>; // [init,started,stoped]
    get recordState() {
        return this.__recordState.get();
    }
    set recordState(newValue: string) {
        this.__recordState.set(newValue);
    }
    private __recordSec: ObservedPropertySimple<number>;
    get recordSec() {
        return this.__recordSec.get();
    }
    set recordSec(newValue: number) {
        this.__recordSec.set(newValue);
    }
    private interval: number;
    private __showTime: ObservedPropertySimple<string>;
    get showTime() {
        return this.__showTime.get();
    }
    set showTime(newValue: string) {
        this.__showTime.set(newValue);
    }
    private audioCapturerOptionNormal: audio.AudioCapturerOptions;
    private audioCapturerOptionScreen: audio.AudioCapturerOptions;
    // recorder data
    private audioRendererOptions: audio.AudioRendererOptions;
    private bufferSizeNormal;
    private bufferSizeScreen;
    private __date: ObservedPropertySimple<string>;
    get date() {
        return this.__date.get();
    }
    set date(newValue: string) {
        this.__date.set(newValue);
    }
    private audioRenderers: audio.AudioRenderer[];
    private __titleList: ObservedPropertyObject<string[]>;
    get titleList() {
        return this.__titleList.get();
    }
    set titleList(newValue: string[]) {
        this.__titleList.set(newValue);
    }
    private __pathList: ObservedPropertyObject<string[]>;
    get pathList() {
        return this.__pathList.get();
    }
    set pathList(newValue: string[]) {
        this.__pathList.set(newValue);
    }
    private __fdList: ObservedPropertyObject<number[]>;
    get fdList() {
        return this.__fdList.get();
    }
    set fdList(newValue: number[]) {
        this.__fdList.set(newValue);
    }
    private __playSecList: ObservedPropertyObject<number[]>;
    get playSecList() {
        return this.__playSecList.get();
    }
    set playSecList(newValue: number[]) {
        this.__playSecList.set(newValue);
    }
    private __renderStateList: ObservedPropertyObject<number[]>;
    get renderStateList() {
        return this.__renderStateList.get();
    }
    set renderStateList(newValue: number[]) {
        this.__renderStateList.set(newValue);
    }
    private __renderStartOffsetList: ObservedPropertyObject<number[]>;
    get renderStartOffsetList() {
        return this.__renderStartOffsetList.get();
    }
    set renderStartOffsetList(newValue: number[]) {
        this.__renderStartOffsetList.set(newValue);
    }
    private __isRecordOver: ObservedPropertySimple<boolean>;
    get isRecordOver() {
        return this.__isRecordOver.get();
    }
    set isRecordOver(newValue: boolean) {
        this.__isRecordOver.set(newValue);
    }
    // Music Player
    private audioRendererOptionsMusic: audio.AudioRendererOptions;
    private audioRendererMusic?: audio.AudioRenderer;
    private __renderMusicState: ObservedPropertySimple<number>;
    get renderMusicState() {
        return this.__renderMusicState.get();
    }
    set renderMusicState(newValue: number) {
        this.__renderMusicState.set(newValue);
    }
    private __curTimeSec: ObservedPropertySimple<number>;
    get curTimeSec() {
        return this.__curTimeSec.get();
    }
    set curTimeSec(newValue: number) {
        this.__curTimeSec.set(newValue);
    }
    private __startMusicOffset: ObservedPropertySimple<number>;
    get startMusicOffset() {
        return this.__startMusicOffset.get();
    }
    set startMusicOffset(newValue: number) {
        this.__startMusicOffset.set(newValue);
    }
    private appContext?: common.Context;
    private fileDescriptor?: resourceManager.RawFileDescriptor;
    private audioSource;
    TabBuilder(index: number, btnId: string, parent = null) {
        Column.create();
        Column.width(78);
        Column.id('btn_' + btnId);
        Text.create(index === 0 ? $r('app.string.NORMAL_CAPTURER') : $r('app.string.PARALLEL_CAPTURER'));
        Text.fontColor(this.currentIndex === index ? this.selectedFontColor : this.fontColor);
        Text.opacity(this.currentIndex === index ? 1 : 0.6);
        Text.fontSize(16);
        Text.fontWeight(this.currentIndex === index ? 500 : 400);
        Text.lineHeight(22);
        Text.margin({ top: 17, bottom: 7 });
        Text.pop();
        Divider.create();
        Divider.strokeWidth(2);
        Divider.color('#007DFF');
        Divider.opacity(this.currentIndex === index ? 1 : 0);
        Column.pop();
    }
    async aboutToAppear(): Promise<void> {
        console.log('ParallelCapturer aboutToAppear');
        await this.initResource();
    }
    async initResource(): Promise<void> {
        this.appContext = getContext(this);
        this.fileDescriptor = await this.getStageFileDescriptor(this.audioSource);
        await this.CreateMusicRenderer(this.audioRendererOptionsMusic);
        try {
            this.audioCapturerNormal = await audio.createAudioCapturer(this.audioCapturerOptionNormal);
            console.log('ParallelCapturer,Normal capturer successs');
            this.audioCapturerScreen = await audio.createAudioCapturer(this.audioCapturerOptionScreen);
            console.log('ParallelCapturer,Screen capturer successs');
            this.bufferSizeNormal = await this.audioCapturerNormal.getBufferSize();
            this.bufferSizeScreen = await this.audioCapturerScreen.getBufferSize();
            // recorder init
            this.recordState = 'init';
        }
        catch (err) {
            let error = err as BusinessError;
            console.log(`ParallelCapturer:createAudioCapturer err=${JSON.stringify(error)}`);
        }
    }
    async releseResource(): Promise<void> {
        if (this.interval !== 0) {
            clearInterval(this.interval);
        }
        if (this.fdList[NORMAL_INDEX] > 0) {
            this.closeFile(this.fdList[NORMAL_INDEX]);
            this.fdList[NORMAL_INDEX] = 0;
        }
        if (this.fdList[SCREEN_INDEX] > 0) {
            this.closeFile(this.fdList[SCREEN_INDEX]);
            this.fdList[SCREEN_INDEX] = 0;
        }
        if (this.audioCapturerNormal) {
            await this.audioCapturerNormal.release();
            console.log('ParallelCapturer,audioCapturerNormal.release success');
            this.audioCapturerNormal = undefined;
        }
        if (this.audioCapturerScreen) {
            await this.audioCapturerScreen.release();
            console.log('ParallelCapturer,audioCapturerScreen.release success');
            this.audioCapturerScreen = undefined;
        }
        if (this.fileDescriptor) {
            await this.closeResource('test1.wav');
            this.fileDescriptor = undefined;
        }
        if (this.audioRendererMusic) {
            await this.audioRendererMusic.release();
            this.audioRendererMusic = undefined;
        }
        for (let index = 0; index < this.audioRenderers.length; index++) {
            await this.audioRenderers[index].release();
        }
        this.audioRenderers = [];
    }
    async aboutToDisappear(): Promise<void> {
        console.log('ParallelCapturer aboutToDisappear');
        await this.releseResource();
    }
    async openFile(path: string): Promise<number | undefined> {
        try {
            await fs.open(path, 0o100);
            console.log('ParallelCapturer,file created success');
        }
        catch (err) {
            let error = err as BusinessError;
            console.log('ParallelCapturer,file created err:' + JSON.stringify(error));
            return;
        }
        let file: fs.File;
        try {
            file = await fs.open(path, 0o2);
            console.log(`ParallelCapturer,file open success for read and write mode,fd=${file.fd}`);
            return file.fd;
        }
        catch (err) {
            let error = err as BusinessError;
            console.log('ParallelCapturer,file open err:' + JSON.stringify(error));
            return 0;
        }
    }
    async closeFile(fd: number): Promise<void> {
        try {
            await fs.close(fd);
            console.log('ParallelCapturer,file close success');
        }
        catch (err) {
            let error = err as BusinessError;
            console.log('ParallelCapturer,file close err:' + JSON.stringify(error));
            return;
        }
    }
    sleep(ms: number): Promise<number> {
        return new Promise<number>((resolve) => setTimeout(resolve, ms));
    }
    async capturerStart(): Promise<void> {
        if (!this.audioCapturerNormal) {
            console.log(`ParallelCapturer:audioCapturerNormal is null`);
            return;
        }
        if (!this.audioCapturerScreen) {
            console.log(`ParallelCapturer:audioCapturerScreen is null`);
            return;
        }
        if (this.renderMusicState === audio.AudioState.STATE_PREPARED) {
            this.startMusicRenderer();
        }
        await this.sleep(200);
        try {
            await this.audioCapturerNormal.start();
            console.log('ParallelCapturer,audioCapturerNormal start success');
            await this.audioCapturerScreen.start();
            console.log('ParallelCapturer,audioCapturerScreen start success');
            // when start,init recordSec
            this.recordState = 'started';
            console.log('audioCapturer start ok');
            clearInterval(this.interval);
            this.interval = setInterval(async () => {
                if (this.recordSec >= TOTAL_SECOND) {
                    // over TOTAL_SECOND,need to stop automatically
                    this.capturerStop();
                    return;
                }
                this.recordSec++;
                this.showTime = this.getTimesBySecond(this.recordSec);
            }, INTERVAL_TIME);
            let titleNormal = `${this.getDate(2)}_${Math.floor(Math.random() * RANDOM_NUM)}_Normal`;
            let pathNormal = `/data/storage/el2/base/haps/entry/files/capturer_${titleNormal}.pcm`;
            let mode = 1;
            this.date = this.getDate(mode);
            let titleScreen = `${this.getDate(2)}_${Math.floor(Math.random() * RANDOM_NUM)}_Screen`;
            let pathScreen = `/data/storage/el2/base/haps/entry/files/capturer_${titleScreen}.pcm`;
            this.titleList[NORMAL_INDEX] = titleNormal;
            this.titleList[SCREEN_INDEX] = titleScreen;
            this.pathList[NORMAL_INDEX] = pathNormal;
            this.pathList[SCREEN_INDEX] = pathScreen;
            let fdNormal = await this.openFile(pathNormal) as number;
            let fdScreen = await this.openFile(pathScreen) as number;
            this.fdList[NORMAL_INDEX] = fdNormal;
            this.fdList[SCREEN_INDEX] = fdScreen;
            setTimeout(async () => {
                if (this.audioCapturerNormal) {
                    await this.readCapturer(this.audioCapturerNormal, this.bufferSizeNormal, fdNormal);
                    console.log('ParallelCapturer,audioCapturerNormal readCapturer success');
                }
            }, READ_TIME_OUT_NORMAL);
            setTimeout(async () => {
                if (this.audioCapturerScreen) {
                    await this.readCapturer(this.audioCapturerScreen, this.bufferSizeScreen, fdScreen);
                    console.log('ParallelCapturer,audioCapturerScreen readCapturer success');
                }
            }, READ_TIME_OUT_SCREEN);
        }
        catch (err) {
            let error = err as BusinessError;
            console.log(`ParallelCapturer,:audioCapturer start err=${JSON.stringify(error)}`);
        }
    }
    async capturerStop(): Promise<void> {
        if (this.recordSec < MIN_RECORD_SECOND || !this.audioCapturerNormal || !this.audioCapturerScreen) {
            return;
        }
        try {
            await this.audioCapturerNormal.stop();
            await this.audioCapturerScreen.stop();
            // when recordState is stopped
            this.recordState = 'stopped';
            clearInterval(this.interval);
            if (this.renderMusicState === audio.AudioState.STATE_RUNNING) {
                this.pauseMusicRenderer();
            }
        }
        catch (err) {
            let error = err as BusinessError;
            console.log(`ParallelCapturer,:audioCapturer stop err=${JSON.stringify(error)}`);
        }
        this.isRecordOver = true;
        console.log(JSON.stringify(this.titleList));
        await this.renderCreate();
    }
    async readCapturer(audioCapturer: audio.AudioCapturer, bufferSize: number, fd: number): Promise<void> {
        console.log('ParallelCapturer,start readCapturer');
        try {
            let startOffset = 0;
            while (true) {
                if (audioCapturer.state === audio.AudioState.STATE_STOPPED) {
                    console.log('ParallelCapturer,state is changed to be stopped');
                    break;
                }
                let buffer = await audioCapturer.read(bufferSize, true);
                if (fd === this.fdList[NORMAL_INDEX]) {
                    console.log('NormalCapturer:readCapturer Normal read success');
                }
                else if (fd === this.fdList[SCREEN_INDEX]) {
                    console.log('NormalCapturer:readCapturer Screen read success');
                }
                let options: Options = {
                    offset: startOffset,
                    length: bufferSize
                };
                let writenSize = await fs.write(fd, buffer, options);
                if (fd === this.fdList[NORMAL_INDEX]) {
                    console.log('ParallelCapturer--Normal,fd===' + fd + ',writenSize=' + writenSize);
                }
                else if (fd === this.fdList[SCREEN_INDEX]) {
                    console.log('ParallelCapturer--Screen,fd===' + fd + ',writenSize=' + writenSize);
                }
                startOffset += bufferSize;
            }
        }
        catch (err) {
            let error = err as BusinessError;
            console.log(`ParallelCapturer,readCapturer err=${JSON.stringify(error)}`);
        }
    }
    async renderCreate(): Promise<void> {
        try {
            this.audioRenderers[NORMAL_INDEX] = await audio.createAudioRenderer(this.audioRendererOptions);
            this.audioRenderers[SCREEN_INDEX] = await audio.createAudioRenderer(this.audioRendererOptions);
            this.renderStateList[NORMAL_INDEX] = this.audioRenderers[NORMAL_INDEX].state;
            this.renderStateList[SCREEN_INDEX] = this.audioRenderers[SCREEN_INDEX].state;
            this.audioRenderers[NORMAL_INDEX].on('stateChange', (state) => {
                console.log('ParallelCapturer,renderStateList[0] is changed to ' + state);
                this.renderStateList[NORMAL_INDEX] = state;
            });
            this.audioRenderers[SCREEN_INDEX].on('stateChange', (state) => {
                console.log('ParallelCapturer,renderStateList[1] is changed to ' + state);
                this.renderStateList[SCREEN_INDEX] = state;
            });
        }
        catch (err) {
            let error = err as BusinessError;
            console.log(`ParallelCapturer,createAudioRenderer err=${JSON.stringify(error)}`);
        }
    }
    async renderStart(index: number): Promise<void> {
        let bufferSize = 0;
        try {
            bufferSize = await this.audioRenderers[index].getBufferSize();
            await this.audioRenderers[index].start();
        }
        catch (err) {
            let error = err as BusinessError;
            console.log(`ParallelCapturer,audioRenderers start err:${JSON.stringify(error)}`);
        }
        try {
            let stat = await fs.stat(this.pathList[index]);
            console.log(`ParallelCapturer,index:${index} stat=${JSON.stringify(stat)}`);
            let buf = new ArrayBuffer(bufferSize);
            console.log(`ParallelCapturer,audioRenderer write start..........`);
            let startOffset = this.renderStartOffsetList[index];
            while (startOffset <= stat.size) {
                if (this.audioRenderers[index].state === audio.AudioState.STATE_PAUSED) {
                    break;
                }
                // change tag,to stop
                if (this.audioRenderers[index].state === audio.AudioState.STATE_STOPPED) {
                    break;
                }
                if (this.audioRenderers[index].state === audio.AudioState.STATE_RELEASED) {
                    return;
                }
                let options: Options = {
                    offset: startOffset,
                    length: bufferSize
                };
                await fs.read(this.fdList[index], buf, options);
                await this.audioRenderers[index].write(buf);
                this.playSecList[index] = Math.round(startOffset / stat.size * this.recordSec); //changed
                startOffset = startOffset + bufferSize;
                this.renderStartOffsetList[index] = startOffset;
            }
            console.log(`ParallelCapturer,audioRenderer write end..........`);
            if (this.audioRenderers[index].state === audio.AudioState.STATE_RUNNING) {
                this.renderStartOffsetList[index] = 0;
                await this.renderStop(index);
            }
        }
        catch (err) {
            let error = err as BusinessError;
            console.log(`ParallelCapturer,write err:${JSON.stringify(error)}`);
        }
    }
    async renderPause(index: number): Promise<void> {
        try {
            await this.audioRenderers[index].pause();
        }
        catch (err) {
            let error = err as BusinessError;
            console.log(`ParallelCapturer,pause err:${JSON.stringify(error)}`);
        }
    }
    async renderStop(index: number): Promise<void> {
        try {
            await this.audioRenderers[index].stop();
            this.renderStartOffsetList[index] = 0;
        }
        catch (err) {
            let error = err as BusinessError;
            console.log(`ParallelCapturer,stop err:${JSON.stringify(error)}`);
        }
    }
    async renderRelease(index: number): Promise<void> {
        try {
            await this.audioRenderers[index].release();
        }
        catch (err) {
            let error = err as BusinessError;
            console.log(`ParallelCapturer,release err:${JSON.stringify(error)}`);
        }
    }
    formatNumber(num: number): string {
        if (num <= 9) {
            return '0' + num;
        }
        else {
            return '' + num;
        }
    }
    getDate(mode: number): string {
        let date = new Date();
        if (mode === 1) {
            return `${date.getFullYear()}/${this.formatNumber(date.getMonth() + 1)}/${this.formatNumber(date.getDate())}`;
        }
        else {
            return `${date.getFullYear()}${this.formatNumber(date.getMonth() + 1)}${this.formatNumber(date.getDate())}`;
        }
    }
    getTimesBySecond(t: number): string {
        let h = Math.floor(t / 60 / 60 % 24);
        let m = Math.floor(t / 60 % 60);
        let s = Math.floor(t % 60);
        let hs = h < 10 ? '0' + h : h;
        let ms = m < 10 ? '0' + m : m;
        let ss = s < 10 ? '0' + s : s;
        return `${hs}:${ms}:${ss}`;
    }
    // start music player
    async getStageFileDescriptor(fileName: string): Promise<resourceManager.RawFileDescriptor | undefined> {
        let fileDescriptor: resourceManager.RawFileDescriptor | undefined = undefined;
        if (this.appContext) {
            let mgr = this.appContext.resourceManager;
            await mgr.getRawFd(fileName).then(value => {
                fileDescriptor = value;
                console.log('ParallelCapturer,case getRawFileDescriptor success fileName: ' + fileName);
            }).catch((error: BusinessError) => {
                console.log('ParallelCapturer,case getRawFileDescriptor err: ' + error);
            });
        }
        return fileDescriptor;
    }
    async closeResource(fileName: string): Promise<void> {
        if (this.appContext) {
            let mgr = this.appContext.resourceManager;
            await mgr.closeRawFd(fileName).then(() => {
                console.log('ParallelCapturer,case closeRawFd success fileName: ' + fileName);
            }).catch((error: BusinessError) => {
                console.log('ParallelCapturer,case closeRawFd err: ' + error);
            });
        }
    }
    async CreateMusicRenderer(options: audio.AudioRendererOptions): Promise<void> {
        try {
            this.audioRendererMusic = await audio.createAudioRenderer(options);
            this.renderMusicState = this.audioRendererMusic.state;
            this.audioRendererMusic.on('stateChange', (state) => {
                console.log('ParallelCapturer,renderMusicState is changed to ' + state);
                this.renderMusicState = state;
            });
        }
        catch (err) {
            let error = err as BusinessError;
            console.log(`ParallelCapturer,createAudioRenderer err=${JSON.stringify(error)}`);
        }
    }
    async startMusicRenderer(): Promise<void> {
        if (!this.audioRendererMusic || !this.fileDescriptor) {
            return;
        }
        let bufferSize: number = 0;
        try {
            bufferSize = await this.audioRendererMusic.getBufferSize();
            await this.audioRendererMusic.start();
        }
        catch (err) {
            let error = err as BusinessError;
            console.error(`ParallelCapturer,audioRenderer start : Error: ${JSON.stringify(error)}`);
            return;
        }
        try {
            let buf = new ArrayBuffer(bufferSize);
            let start = this.fileDescriptor.offset;
            if (this.startMusicOffset === 0) {
                this.startMusicOffset = start;
            }
            let cur = this.startMusicOffset;
            // start + this.fileDescriptor.length is end offset
            while (cur <= start + this.fileDescriptor.length) {
                // when render released,state is changed to STATE_RELEASED
                if (this.audioRendererMusic.state === audio.AudioState.STATE_RELEASED) {
                    break;
                }
                // when render paused,state is changed to STATE_PAUSED
                if (this.audioRendererMusic.state === audio.AudioState.STATE_PAUSED) {
                    this.startMusicOffset = cur;
                    break;
                }
                // change tag,to stop
                if (this.audioRendererMusic.state === audio.AudioState.STATE_STOPPED) {
                    this.startMusicOffset = cur;
                    break;
                }
                let options: Options = {
                    offset: cur,
                    length: bufferSize
                };
                console.log('startMusicRenderer,options=' + JSON.stringify(options));
                await fs.read(this.fileDescriptor.fd, buf, options);
                await this.audioRendererMusic.write(buf);
                // update progress
                this.curTimeSec = this.getCurTimeSec(TOTAL_SECOND, this.fileDescriptor.length, cur - start);
                cur += bufferSize;
            }
            // when audio play completed,update state to stopped
            if (this.audioRendererMusic.state === audio.AudioState.STATE_RUNNING) {
                await this.audioRendererMusic.stop();
                this.startMusicOffset = 0;
                this.curTimeSec = TOTAL_SECOND;
            }
        }
        catch (err) {
            let error = err as BusinessError;
            console.error(`ParallelCapturer,audioRenderer write : Error: ${JSON.stringify(error)}`);
        }
    }
    async pauseMusicRenderer(): Promise<void> {
        try {
            if (this.audioRendererMusic) {
                await this.audioRendererMusic.pause();
            }
        }
        catch (err) {
            let error = err as BusinessError;
            console.error(`ParallelCapturer,pauseMusicRenderer pause : Error: ${JSON.stringify(error)}`);
            return;
        }
    }
    async stopMusicRenderer(): Promise<void> {
        try {
            if (this.audioRendererMusic) {
                await this.audioRendererMusic.stop();
            }
        }
        catch (err) {
            let error = err as BusinessError;
            console.error(`ParallelCapturer,pauseMusicRenderer stop : Error: ${JSON.stringify(error)}`);
            return;
        }
    }
    getCurTimeSec(totalSec: number, totalLen: number, PastLen: number): number {
        return Number((totalSec / totalLen * PastLen).toFixed(0));
    }
    InitRecord(parent = null) {
        Column.create();
        Column.width('100%');
        Column.height(56);
        Column.position({ y: 60 });
        Column.id('parallel_start_btn');
        Column.onClick(() => {
            this.capturerStart();
        });
        Image.create($r('app.media.ic_record'));
        Image.width(56);
        Image.height(56);
        Column.pop();
    }
    StartedRecord(parent = null) {
        Column.create();
        Column.width('100%');
        Column.height(66);
        Column.position({ y: 30 });
        Text.create(this.showTime);
        Text.fontSize(21);
        Text.fontWeight(500);
        Text.margin({ bottom: 8 });
        Text.pop();
        Column.pop();
        Column.create();
        Column.width('100%');
        Column.height(56);
        Column.position({ y: 60 });
        Column.id('parallel_stop_btn');
        Column.onClick(() => {
            this.capturerStop();
        });
        Image.create($r('app.media.ic_recording'));
        Image.width(56);
        Image.height(56);
        Column.pop();
    }
    FinishedRecord(parent = null) {
        Column.create();
        Column.width('100%');
        Column.height(56);
        Column.position({ y: 60 });
        Column.opacity(0.4);
        Image.create($r('app.media.ic_record'));
        Image.width(56);
        Image.height(56);
        Column.pop();
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.justifyContent(FlexAlign.Start);
        Column.backgroundColor('#F1F3F5');
        Column.padding({ left: 12, right: 12 });
        Column.create();
        Column.id('parallel_capturer_back_btn');
        Column.width('100%');
        Column.height(56);
        Column.onClick(async () => {
            await router.replaceUrl({ url: 'pages/Index' });
        });
        Navigation.create();
        Navigation.width('100%');
        Navigation.height('100%');
        Navigation.hideBackButton(false);
        Navigation.titleMode(NavigationTitleMode.Mini);
        Navigation.title($r('app.string.AUDIO_CAPTURER'));
        Navigation.mode(NavigationMode.Stack);
        Navigation.backgroundColor('#F1F3F5');
        Navigation.pop();
        Column.pop();
        Column.create();
        Column.padding({ left: 12, right: 12 });
        Tabs.create({ barPosition: BarPosition.Start, index: 1 });
        Tabs.vertical(false);
        Tabs.barMode(BarMode.Fixed);
        Tabs.barWidth(360);
        Tabs.barHeight(56);
        Tabs.animationDuration(400);
        Tabs.onChange((index: number) => {
            this.currentIndex = index;
            console.log(`${index}`);
            if (this.currentIndex === 0) {
                router.replaceUrl({ url: 'pages/NormalCapturer' });
            }
        });
        Tabs.width('100%');
        Tabs.height(56);
        TabContent.create();
        TabContent.tabBar({ builder: () => {
                this.TabBuilder.call(this, 0, 'normal_capturer');
            } });
        TabContent.pop();
        TabContent.create();
        TabContent.tabBar({ builder: () => {
                this.TabBuilder.call(this, 1, 'parallel_capturer');
            } });
        TabContent.pop();
        Tabs.pop();
        Column.pop();
        Column.create();
        Column.id('music_player_card');
        Column.height(126);
        Column.width('100%');
        Column.padding({ left: 12, right: 12 });
        Column.backgroundColor(Color.White);
        Column.margin({ bottom: 20, top: 12 });
        Column.borderRadius(24);
        Column.margin({ top: 12 });
        Column.onClick(() => {
            if (this.renderMusicState === audio.AudioState.STATE_PREPARED) {
                this.startMusicRenderer();
            }
            if (this.renderMusicState === audio.AudioState.STATE_RUNNING) {
                this.pauseMusicRenderer();
            }
            if (this.renderMusicState === audio.AudioState.STATE_PAUSED) {
                this.startMusicRenderer();
            }
            if (this.renderMusicState === audio.AudioState.STATE_STOPPED) {
                this.startMusicRenderer();
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
        If.create();
        if (this.renderMusicState === audio.AudioState.STATE_RUNNING) {
            If.branchId(0);
            Image.create($r('app.media.ic_play_y'));
            Image.width(36);
            Image.height(36);
        }
        else {
            If.branchId(1);
            Image.create($r('app.media.ic_pause_y'));
            Image.width(36);
            Image.height(36);
        }
        If.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 24, bottom: 3 });
        Row.width('100%');
        Progress.create({ value: this.curTimeSec, total: TOTAL_SECOND, type: ProgressType.Linear });
        Progress.color('#007DFF');
        Progress.value(this.curTimeSec);
        Progress.width('100%');
        Progress.height(4);
        Row.pop();
        Row.create();
        Row.justifyContent(FlexAlign.SpaceBetween);
        Row.width('100%');
        Text.create(this.getTimesBySecond(this.curTimeSec));
        Text.fontSize(12);
        Text.fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
        Text.fontColor('#182431');
        Text.opacity(0.6);
        Text.fontWeight(400);
        Text.pop();
        Text.create(this.getTimesBySecond(TOTAL_SECOND));
        Text.fontSize(12);
        Text.fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
        Text.fontColor('#182431');
        Text.opacity(0.6);
        Text.fontWeight(400);
        Text.pop();
        Row.pop();
        Column.pop();
        If.create();
        if (this.isRecordOver === true) {
            If.branchId(0);
            Column.create();
            Row.create();
            Row.padding({ left: 12, right: 12 });
            Row.width('100%');
            Row.margin({ top: 16, bottom: 8 });
            Text.create($r('app.string.RECORD_RESULT'));
            Text.fontSize(14);
            Text.fontWeight(400);
            Text.fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
            Text.opacity(0.6);
            Text.id('record_result');
            Text.textAlign(TextAlign.Start);
            Text.pop();
            Row.pop();
            ForEach.create("2", this, ObservedObject.GetRawObject(this.titleList), (item: string, index) => {
                Column.create();
                Column.width('100%');
                Column.height(126);
                Column.backgroundColor(Color.White);
                Column.padding({ left: 12, right: 12 });
                Column.borderRadius(24);
                Column.margin({ bottom: 12 });
                Column.id('record_player' + (index as number));
                Column.onClick(() => {
                    if (this.renderStateList[index as number] === audio.AudioState.STATE_PREPARED) {
                        this.renderStart(index as number);
                    }
                    if (this.renderStateList[index as number] === audio.AudioState.STATE_RUNNING) {
                        this.renderPause(index as number);
                    }
                    if (this.renderStateList[index as number] === audio.AudioState.STATE_PAUSED) {
                        this.renderStart(index as number);
                    }
                    if (this.renderStateList[index as number] === audio.AudioState.STATE_STOPPED) {
                        this.renderStart(index as number);
                    }
                });
                Row.create();
                Row.width('100%');
                Row.height(24);
                Row.justifyContent(FlexAlign.SpaceBetween);
                Row.margin({ top: 16 });
                Text.create(this.titleList[index as number]);
                Text.fontSize(16);
                Text.fontWeight(500);
                Text.fontColor('#182431');
                Text.fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
                Text.pop();
                If.create();
                if (this.renderStateList[index as number] === audio.AudioState.STATE_RUNNING) {
                    If.branchId(0);
                    Image.create($r('app.media.ic_record_playing'));
                    Image.width(24);
                    Image.height(24);
                    Image.id('playing_state' + (index as number));
                }
                else {
                    If.branchId(1);
                    Image.create($r('app.media.ic_record_paused'));
                    Image.width(24);
                    Image.height(24);
                    Image.id('paused_state' + (index as number));
                }
                If.pop();
                Row.pop();
                Row.create();
                Row.width('100%');
                Row.height(24);
                Row.justifyContent(FlexAlign.SpaceBetween);
                Row.margin({ top: 4 });
                Text.create(this.date);
                Text.fontSize(14);
                Text.fontWeight(400);
                Text.fontColor('#182431');
                Text.opacity(0.6);
                Text.fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
                Text.pop();
                Text.create(this.getTimesBySecond(this.recordSec) + '');
                Text.fontSize(14);
                Text.fontWeight(400);
                Text.fontColor('#182431');
                Text.opacity(0.6);
                Text.fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
                Text.pop();
                Row.pop();
                Row.create();
                Row.margin({ top: 23, bottom: 3 });
                Progress.create({ value: this.playSecList[index as number], total: this.recordSec, type: ProgressType.Linear });
                Progress.color('#007DFF');
                Progress.value(this.playSecList[index as number]);
                Progress.width('100%');
                Progress.height(4);
                Row.pop();
                Row.create();
                Row.justifyContent(FlexAlign.SpaceBetween);
                Row.width('100%');
                Text.create(this.getTimesBySecond(this.playSecList[index as number]) + '');
                Text.fontSize(12);
                Text.fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
                Text.fontColor('#182431');
                Text.opacity(0.6);
                Text.fontWeight(400);
                Text.pop();
                Text.create(this.getTimesBySecond(this.recordSec) + '');
                Text.fontSize(12);
                Text.fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
                Text.fontColor('#182431');
                Text.opacity(0.6);
                Text.fontWeight(400);
                Text.pop();
                Row.pop();
                Column.pop();
            });
            ForEach.pop();
            Column.pop();
        }
        If.pop();
        Row.create();
        Row.width('100%');
        Row.position({ y: '82%' });
        Row.alignItems(VerticalAlign.Top);
        Row.height(116);
        Row.id('record_btn');
        If.create();
        if (this.recordState === 'init') { // init
            If.branchId(0);
            this.InitRecord(this);
        }
        else if (this.recordState === 'started') { // started
            If.branchId(1);
            this.StartedRecord(this);
        }
        else if (this.recordState === 'stopped') { // finished
            If.branchId(2);
            this.FinishedRecord(this);
        }
        If.pop();
        Row.pop();
        Column.pop();
    }
}
loadDocument(new ParallelCapturer("1", undefined, {}));
