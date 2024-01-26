interface NormalCapturer_Params {
    fontColor?: string;
    selectedFontColor?: string;
    currentIndex?: number;
    audioCapturer?: audio.AudioCapturer;
    audioRenderer?: audio.AudioRenderer;
    recordState?: string;
    audioCapturerOptions?: audio.AudioCapturerOptions;
    audioRendererOptions?: audio.AudioRendererOptions;
    title?: string;
    date?: string;
    playSec?: number;
    renderState?: number;
    recordSec?: number;
    showTime?: string;
    interval?: number;
    bufferSize?;
    path?;
    fd?;
    isRecordOver?: boolean;
    start?: number;
    capturerOffsetStart?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "NormalCapturer_" + ++__generate__Id;
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
import router from '@ohos.router';
import { BusinessError } from '@ohos.base';
const MIN_RECORD_SECOND = 5;
const TOTAL_SECOND = 30;
const RANDOM_NUM = 10000;
const INTERVAL_TIME = 1000;
const READ_TIME_OUT = 0;
class Options {
    offset: number = 0;
    length: number = 0;
}
class NormalCapturer extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__fontColor = new ObservedPropertySimple('#182431', this, "fontColor");
        this.__selectedFontColor = new ObservedPropertySimple('#007DFF', this, "selectedFontColor");
        this.__currentIndex = new ObservedPropertySimple(0, this, "currentIndex");
        this.audioCapturer = undefined;
        this.audioRenderer = undefined;
        this.__recordState = new ObservedPropertySimple('init', this, "recordState");
        this.audioCapturerOptions = {
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
        this.__title = new ObservedPropertySimple('', this, "title");
        this.__date = new ObservedPropertySimple('', this, "date");
        this.__playSec = new ObservedPropertySimple(0, this, "playSec");
        this.__renderState = new ObservedPropertySimple(0, this, "renderState");
        this.__recordSec = new ObservedPropertySimple(0, this, "recordSec");
        this.__showTime = new ObservedPropertySimple('00:00:00', this, "showTime");
        this.interval = 0;
        this.bufferSize = 0;
        this.path = ``;
        this.fd = 0;
        this.__isRecordOver = new ObservedPropertySimple(false, this, "isRecordOver");
        this.__start = new ObservedPropertySimple(0, this, "start");
        this.__capturerOffsetStart = new ObservedPropertySimple(0, this, "capturerOffsetStart");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: NormalCapturer_Params) {
        if (params.fontColor !== undefined) {
            this.fontColor = params.fontColor;
        }
        if (params.selectedFontColor !== undefined) {
            this.selectedFontColor = params.selectedFontColor;
        }
        if (params.currentIndex !== undefined) {
            this.currentIndex = params.currentIndex;
        }
        if (params.audioCapturer !== undefined) {
            this.audioCapturer = params.audioCapturer;
        }
        if (params.audioRenderer !== undefined) {
            this.audioRenderer = params.audioRenderer;
        }
        if (params.recordState !== undefined) {
            this.recordState = params.recordState;
        }
        if (params.audioCapturerOptions !== undefined) {
            this.audioCapturerOptions = params.audioCapturerOptions;
        }
        if (params.audioRendererOptions !== undefined) {
            this.audioRendererOptions = params.audioRendererOptions;
        }
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.date !== undefined) {
            this.date = params.date;
        }
        if (params.playSec !== undefined) {
            this.playSec = params.playSec;
        }
        if (params.renderState !== undefined) {
            this.renderState = params.renderState;
        }
        if (params.recordSec !== undefined) {
            this.recordSec = params.recordSec;
        }
        if (params.showTime !== undefined) {
            this.showTime = params.showTime;
        }
        if (params.interval !== undefined) {
            this.interval = params.interval;
        }
        if (params.bufferSize !== undefined) {
            this.bufferSize = params.bufferSize;
        }
        if (params.path !== undefined) {
            this.path = params.path;
        }
        if (params.fd !== undefined) {
            this.fd = params.fd;
        }
        if (params.isRecordOver !== undefined) {
            this.isRecordOver = params.isRecordOver;
        }
        if (params.start !== undefined) {
            this.start = params.start;
        }
        if (params.capturerOffsetStart !== undefined) {
            this.capturerOffsetStart = params.capturerOffsetStart;
        }
    }
    aboutToBeDeleted() {
        this.__fontColor.aboutToBeDeleted();
        this.__selectedFontColor.aboutToBeDeleted();
        this.__currentIndex.aboutToBeDeleted();
        this.__recordState.aboutToBeDeleted();
        this.__title.aboutToBeDeleted();
        this.__date.aboutToBeDeleted();
        this.__playSec.aboutToBeDeleted();
        this.__renderState.aboutToBeDeleted();
        this.__recordSec.aboutToBeDeleted();
        this.__showTime.aboutToBeDeleted();
        this.__isRecordOver.aboutToBeDeleted();
        this.__start.aboutToBeDeleted();
        this.__capturerOffsetStart.aboutToBeDeleted();
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
    private audioCapturer?: audio.AudioCapturer;
    private audioRenderer?: audio.AudioRenderer;
    private __recordState: ObservedPropertySimple<string>; // [init,started,continued,paused,stoped];
    get recordState() {
        return this.__recordState.get();
    }
    set recordState(newValue: string) {
        this.__recordState.set(newValue);
    }
    private audioCapturerOptions: audio.AudioCapturerOptions;
    private audioRendererOptions: audio.AudioRendererOptions;
    private __title: ObservedPropertySimple<string>;
    get title() {
        return this.__title.get();
    }
    set title(newValue: string) {
        this.__title.set(newValue);
    }
    private __date: ObservedPropertySimple<string>;
    get date() {
        return this.__date.get();
    }
    set date(newValue: string) {
        this.__date.set(newValue);
    }
    private __playSec: ObservedPropertySimple<number>;
    get playSec() {
        return this.__playSec.get();
    }
    set playSec(newValue: number) {
        this.__playSec.set(newValue);
    }
    private __renderState: ObservedPropertySimple<number>;
    get renderState() {
        return this.__renderState.get();
    }
    set renderState(newValue: number) {
        this.__renderState.set(newValue);
    }
    private __recordSec: ObservedPropertySimple<number>;
    get recordSec() {
        return this.__recordSec.get();
    }
    set recordSec(newValue: number) {
        this.__recordSec.set(newValue);
    }
    private __showTime: ObservedPropertySimple<string>;
    get showTime() {
        return this.__showTime.get();
    }
    set showTime(newValue: string) {
        this.__showTime.set(newValue);
    }
    private interval: number;
    private bufferSize;
    private path;
    private fd;
    private __isRecordOver: ObservedPropertySimple<boolean>;
    get isRecordOver() {
        return this.__isRecordOver.get();
    }
    set isRecordOver(newValue: boolean) {
        this.__isRecordOver.set(newValue);
    }
    private __start: ObservedPropertySimple<number>;
    get start() {
        return this.__start.get();
    }
    set start(newValue: number) {
        this.__start.set(newValue);
    }
    private __capturerOffsetStart: ObservedPropertySimple<number>;
    get capturerOffsetStart() {
        return this.__capturerOffsetStart.get();
    }
    set capturerOffsetStart(newValue: number) {
        this.__capturerOffsetStart.set(newValue);
    }
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
        console.log('NomalCapturer aboutToAppear');
        await this.initResource();
    }
    async initResource(): Promise<void> {
        try {
            this.audioCapturer = await audio.createAudioCapturer(this.audioCapturerOptions);
            this.bufferSize = await this.audioCapturer.getBufferSize();
            this.recordState = 'init';
            this.title = `${this.getDate(2)}_${Math.floor(Math.random() * RANDOM_NUM)}`;
            this.path = `/data/storage/el2/base/haps/entry/files/normal_capturer_${this.title}.pcm`;
            this.date = this.getDate(1);
            await this.openFile(this.path);
        }
        catch (err) {
            let error = err as BusinessError;
            console.log(`NormalCapturer:createAudioCapturer err=${JSON.stringify(error)}`);
        }
    }
    async releseResource(): Promise<void> {
        if (this.fd > 0) {
            this.closeFile();
            this.fd = 0;
        }
        if (this.interval) {
            clearInterval(this.interval);
        }
        if (this.audioCapturer) {
            console.log('NomalCapturer,audioCapturer released');
            await this.audioCapturer.release();
            this.audioCapturer = undefined;
            this.recordState = 'init';
            clearInterval(this.interval);
        }
        if (this.audioRenderer) {
            console.log('NomalCapturer,audioRenderer released');
            await this.audioRenderer.release();
            this.audioRenderer = undefined;
        }
    }
    async aboutToDisappear(): Promise<void> {
        console.log('NomalCapturer,aboutToDisappear is called');
        await this.releseResource();
    }
    async openFile(path: string): Promise<void> {
        console.log(path);
        try {
            await fs.open(path, 0o100);
            console.log('file created success');
        }
        catch (err) {
            let error = err as BusinessError;
            console.log('file created err:' + JSON.stringify(error));
            return;
        }
        try {
            let file = await fs.open(path, 0o2);
            this.fd = file.fd;
            console.log(`file open success for read and write mode,fd=${file.fd}`);
        }
        catch (err) {
            let error = err as BusinessError;
            console.log('file open err:' + JSON.stringify(error));
            return;
        }
    }
    async closeFile(): Promise<void> {
        try {
            await fs.close(this.fd);
            console.log('file close success');
        }
        catch (err) {
            let error = err as BusinessError;
            console.log('file close err:' + JSON.stringify(error));
            return;
        }
    }
    async capturerStart(): Promise<void> {
        if (!this.audioCapturer) {
            console.log(`NormalCapturer,capturerStart:audioCapturer is null`);
            return;
        }
        try {
            await this.audioCapturer.start();
            // when start,init recordSec
            this.recordSec = 0;
            this.recordState = 'started';
            console.log('audioCapturer start ok');
            clearInterval(this.interval);
            this.interval = setInterval(async () => {
                if (this.recordSec >= TOTAL_SECOND) {
                    // over TOTAL_SECOND,need to stop auto
                    clearInterval(this.interval);
                    if (this.audioCapturer && this.audioCapturer.state === audio.AudioState.STATE_RUNNING) {
                        await this.capturerStop();
                    }
                    return;
                }
                this.recordSec++;
                this.showTime = this.getTimesBySecond(this.recordSec);
            }, INTERVAL_TIME);
            setTimeout(async () => {
                await this.readCapturer();
            }, READ_TIME_OUT);
        }
        catch (err) {
            let error = err as BusinessError;
            console.log(`NormalCapturer:audioCapturer start err=${JSON.stringify(error)}`);
        }
    }
    async renderCreate(): Promise<void> {
        try {
            this.audioRenderer = await audio.createAudioRenderer(this.audioRendererOptions);
            this.renderState = this.audioRenderer.state;
            this.audioRenderer.on('stateChange', (state) => {
                this.renderState = state;
            });
        }
        catch (err) {
            let error = err as BusinessError;
            console.log(`createAudioRenderer err=${JSON.stringify(error)}`);
        }
    }
    async renderStart(): Promise<void> {
        if (!this.audioRenderer) {
            return;
        }
        let bufferSize = 0;
        try {
            bufferSize = await this.audioRenderer.getBufferSize();
            await this.audioRenderer.start();
        }
        catch (err) {
            let error = err as BusinessError;
            console.log(`start err:${JSON.stringify(error)}`);
        }
        try {
            let stat = await fs.stat(this.path);
            let buf = new ArrayBuffer(bufferSize);
            console.log(`audioRenderer write start..........`);
            let startOffset = this.start;
            while (startOffset <= stat.size) {
                if (this.audioRenderer.state === audio.AudioState.STATE_PAUSED) {
                    break;
                }
                // change tag,to stop
                if (this.audioRenderer.state === audio.AudioState.STATE_STOPPED) {
                    break;
                }
                if (this.audioRenderer.state === audio.AudioState.STATE_RELEASED) {
                    return;
                }
                let options: Options = {
                    offset: startOffset,
                    length: bufferSize
                };
                console.log('renderStart,options=' + JSON.stringify(options));
                await fs.read(this.fd, buf, options);
                await this.audioRenderer.write(buf);
                this.playSec = Math.round(startOffset / stat.size * this.recordSec);
                startOffset = startOffset + bufferSize;
                this.start = startOffset;
            }
            console.log(`audioRenderer write end..........`);
            if (this.audioRenderer.state === audio.AudioState.STATE_RUNNING) {
                this.start = 0;
                await this.renderStop();
            }
        }
        catch (err) {
            let error = err as BusinessError;
            console.log(`write err:${JSON.stringify(error)}`);
        }
    }
    async renderPause(): Promise<void> {
        if (!this.audioRenderer) {
            return;
        }
        try {
            await this.audioRenderer.pause();
        }
        catch (err) {
            let error = err as BusinessError;
            console.log(`pause err:${JSON.stringify(error)}`);
        }
    }
    async renderStop(): Promise<void> {
        if (!this.audioRenderer) {
            return;
        }
        try {
            await this.audioRenderer.stop();
            this.start = 0;
        }
        catch (err) {
            let error = err as BusinessError;
            console.log(`stop err:${JSON.stringify(error)}`);
        }
    }
    async releaseStop(): Promise<void> {
        if (!this.audioRenderer) {
            return;
        }
        try {
            await this.audioRenderer.release();
        }
        catch (err) {
            let error = err as BusinessError;
            console.log(`release err:${JSON.stringify(error)}`);
        }
    }
    async capturerContinue(): Promise<void> {
        if (!this.audioCapturer) {
            console.log(`NormalCapturer,capturerContinue:audioCapturer is null`);
            return;
        }
        try {
            await this.audioCapturer.start();
            this.recordState = 'continued';
            console.log('audioCapturer start ok');
            this.interval = setInterval(async () => {
                if (this.recordSec >= TOTAL_SECOND) {
                    // over TOTAL_SECOND,need to stop auto
                    clearInterval(this.interval);
                    if (this.audioCapturer && this.audioCapturer.state === audio.AudioState.STATE_RUNNING) {
                        await this.capturerStop();
                    }
                    return;
                }
                this.recordSec++;
                this.showTime = this.getTimesBySecond(this.recordSec);
            }, INTERVAL_TIME);
            setTimeout(async () => {
                await this.readCapturer();
            }, READ_TIME_OUT);
        }
        catch (err) {
            let error = err as BusinessError;
            console.log(`NormalCapturer:audioCapturer start err=${JSON.stringify(error)}`);
        }
    }
    async capturerStop(): Promise<void> {
        if (!this.audioCapturer) {
            console.log(`NormalCapturer,capturerStop:audioCapturer is null`);
            return;
        }
        if (this.recordSec < MIN_RECORD_SECOND) {
            return;
        }
        try {
            await this.audioCapturer.stop();
            // when recordState is started or continued
            this.recordState = 'stopped';
            clearInterval(this.interval);
        }
        catch (err) {
            let error = err as BusinessError;
            // when recordState is paused
            this.recordState = 'stopped';
            console.log(`NormalCapturer:audioCapturer stop err=${JSON.stringify(error)}`);
        }
        this.isRecordOver = true;
        await this.renderCreate();
    }
    async capturerPause(): Promise<void> {
        if (!this.audioCapturer) {
            console.log(`NormalCapturer,capturerPause:audioCapturer is null`);
            return;
        }
        try {
            await this.audioCapturer.stop();
            this.recordState = 'paused';
            clearInterval(this.interval);
        }
        catch (err) {
            let error = err as BusinessError;
            console.log(`NormalCapturer:audioCapturer stop err=${JSON.stringify(error)}`);
            return;
        }
    }
    async readCapturer(): Promise<void> {
        console.log('NormalCapturer:readCapturer enter');
        if (!this.audioCapturer) {
            console.log(`NormalCapturer,readCapturer:audioCapturer is null`);
            return;
        }
        try {
            let startOffset = this.capturerOffsetStart;
            while (true) {
                if (this.audioCapturer.state === audio.AudioState.STATE_STOPPED) {
                    console.log('state is changed to be stopped');
                    break;
                }
                let buffer = await this.audioCapturer.read(this.bufferSize, true);
                console.log('NormalCapturer:readCapturer read success');
                let options: Options = {
                    offset: startOffset,
                    length: this.bufferSize
                };
                let writen = await fs.write(this.fd, buffer, options);
                console.log(`NormalCapturer:readCapturer,startOffset=${startOffset},writen=${writen}`);
                startOffset += this.bufferSize;
                this.capturerOffsetStart = startOffset;
            }
        }
        catch (err) {
            let error = err as BusinessError;
            console.log(`readCapturer err=${JSON.stringify(error)}`);
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
    InitRecord(parent = null) {
        Column.create();
        Column.width('100%');
        Column.height(56);
        Column.position({ y: 60 });
        Column.id('normal_start_record_btn');
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
        Column.id('normal_show_time_txt');
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
        Column.id('normal_stop_record_btn');
        Column.onClick(() => {
            this.capturerStop();
        });
        Image.create($r('app.media.ic_recording'));
        Image.width(56);
        Image.height(56);
        Column.pop();
        Column.create();
        Column.height(56);
        Column.width(56);
        Column.position({ x: '80%', y: 60 });
        Column.alignItems(HorizontalAlign.Center);
        Column.justifyContent(FlexAlign.Center);
        Column.onClick(() => {
            this.capturerPause();
        });
        Image.create($r('app.media.ic_record_pause'));
        Image.width(24);
        Image.height(24);
        Text.create($r('app.string.PAUSE'));
        Text.fontSize(12);
        Text.fontWeight(400);
        Text.id('normal_pause_record_btn');
        Text.margin({ top: 2 });
        Text.pop();
        Column.pop();
    }
    PausedRecord(parent = null) {
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
        Column.onClick(() => {
            this.capturerStop();
        });
        Image.create($r('app.media.ic_recording'));
        Image.width(56);
        Image.height(56);
        Column.pop();
        Column.create();
        Column.height(56);
        Column.width(56);
        Column.position({ x: '80%', y: 60 });
        Column.alignItems(HorizontalAlign.Center);
        Column.justifyContent(FlexAlign.Center);
        Column.id('normal_continue_record_btn');
        Column.onClick(() => {
            this.capturerContinue();
        });
        Image.create($r('app.media.ic_record_continue'));
        Image.width(24);
        Image.height(24);
        Text.create($r('app.string.CONTINUE'));
        Text.fontSize(12);
        Text.fontWeight(400);
        Text.margin({ top: 2 });
        Text.pop();
        Column.pop();
    }
    FinishedRecord(parent = null) {
        Column.create();
        Column.width('100%');
        Column.height(56);
        Column.position({ y: 60 });
        Column.opacity(0.4);
        Column.id('disalbe_btn');
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
        Column.id('normal_capturer_back_btn');
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
        Tabs.create({ barPosition: BarPosition.Start, index: 0 });
        Tabs.vertical(false);
        Tabs.barMode(BarMode.Fixed);
        Tabs.barWidth(360);
        Tabs.barHeight(56);
        Tabs.animationDuration(400);
        Tabs.onChange((index: number) => {
            this.currentIndex = index;
            if (this.currentIndex === 1) {
                router.replaceUrl({ url: 'pages/ParallelCapturer' });
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
        If.create();
        if (this.isRecordOver === true) {
            If.branchId(0);
            Column.create();
            Column.width('100%');
            Column.height(126);
            Column.backgroundColor(Color.White);
            Column.borderRadius(24);
            Column.margin({ top: 12 });
            Column.padding({ left: 12, right: 12 });
            Column.id('normal_player');
            Column.onClick(() => {
                if (this.renderState === audio.AudioState.STATE_PREPARED) {
                    this.renderStart();
                }
                if (this.renderState === audio.AudioState.STATE_RUNNING) {
                    this.renderPause();
                }
                if (this.renderState === audio.AudioState.STATE_PAUSED) {
                    this.renderStart();
                }
                if (this.renderState === audio.AudioState.STATE_STOPPED) {
                    this.renderStart();
                }
            });
            Row.create();
            Row.width('100%');
            Row.height(24);
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.margin({ top: 16 });
            Text.create(this.title);
            Text.fontSize(16);
            Text.fontWeight(500);
            Text.fontColor('#182431');
            Text.fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
            Text.pop();
            If.create();
            if (this.renderState === audio.AudioState.STATE_RUNNING) {
                If.branchId(0);
                Image.create($r('app.media.ic_record_playing'));
                Image.width(24);
                Image.height(24);
                Image.id('playing_state');
            }
            else {
                If.branchId(1);
                Image.create($r('app.media.ic_record_paused'));
                Image.width(24);
                Image.height(24);
                Image.id('paused_state');
            }
            If.pop();
            Row.pop();
            Row.create();
            Row.width('100%');
            Row.height(24);
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.margin({ top: 4 });
            Text.create(this.date);
            Text.fontSize(16);
            Text.fontWeight(400);
            Text.fontColor('#182431');
            Text.opacity(0.6);
            Text.fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
            Text.pop();
            Text.create(this.getTimesBySecond(this.recordSec) + '');
            Text.fontSize(16);
            Text.fontWeight(400);
            Text.fontColor('#182431');
            Text.opacity(0.6);
            Text.fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
            Text.pop();
            Row.pop();
            Row.create();
            Row.margin({ top: 23, bottom: 3 });
            Progress.create({ value: this.playSec, total: this.recordSec, type: ProgressType.Linear });
            Progress.color('#007DFF');
            Progress.value(this.playSec);
            Progress.width('100%');
            Progress.height(4);
            Row.pop();
            Row.create();
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.width('100%');
            Text.create(this.getTimesBySecond(this.playSec) + '');
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
        }
        If.pop();
        Row.create();
        Row.width('100%');
        Row.alignItems(VerticalAlign.Center);
        Row.height(116);
        Row.position({ y: '82%' });
        If.create();
        if (this.recordState === 'init') {
            If.branchId(0);
            this.InitRecord(this);
        }
        else if (this.recordState === 'started') {
            If.branchId(1);
            this.StartedRecord(this);
        }
        else if (this.recordState === 'paused') {
            If.branchId(2);
            this.PausedRecord(this);
        }
        else if (this.recordState === 'continued') {
            If.branchId(3);
            this.StartedRecord(this);
        }
        else if (this.recordState === 'stopped') {
            If.branchId(4);
            this.FinishedRecord(this);
        }
        If.pop();
        Row.pop();
        Column.pop();
    }
}
loadDocument(new NormalCapturer("1", undefined, {}));
