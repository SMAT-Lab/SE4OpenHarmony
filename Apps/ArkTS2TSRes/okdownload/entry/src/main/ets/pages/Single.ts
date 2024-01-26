interface Single_Params {
    task?: DownloadTask;
    preReceivedBytes?: number;
    speedCalculator?: SpeedCalculator;
    blockCount?: number;
    status?: string;
    progress?: number;
    action?: string;
    singleClickEventClosedLoop?: Boolean;
    startState?: boolean;
    closeState?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Single_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { DownloadTask } from '@ohos/okdownload';
import { DownloadListener } from '@ohos/okdownload';
import { BreakpointInfo } from '@ohos/okdownload';
import { EndCause } from '@ohos/okdownload';
import { ResumeFailedCause } from '@ohos/okdownload';
import { SpeedCalculator } from '@ohos/okdownload';
import { Util, Log } from '@ohos/okdownload';
import { Builder } from '@ohos/okdownload';
class DownloadListenerSample implements DownloadListener {
    private that: any;
    constructor(param: any) {
        this.that = param;
    }
    ;
    taskStart(task: DownloadTask): void {
        this.that.status = "Task Start";
        this.that.preReceivedBytes = 0;
        this.that.progress = 0;
    }
    ;
    connectTrialStart(task: DownloadTask, requestHeaderFields: object): void {
    }
    ;
    connectTrialEnd(task: DownloadTask, responseCode: number, responseHeaderFields: object): void {
    }
    ;
    downloadFromBeginning(task: DownloadTask, info: BreakpointInfo, cause: ResumeFailedCause): void {
        this.that.status = 'Info Ready';
        this.that.speedCalculator = new SpeedCalculator();
    }
    ;
    downloadFromBreakpoint(task: DownloadTask, info: BreakpointInfo): void {
    }
    ;
    connectStart(task: DownloadTask, blockIndex: number, requestHeaderFields: object): void {
    }
    ;
    connectEnd(task: DownloadTask, blockIndex: number, responseCode: number, responseHeaderFields: object): void {
    }
    ;
    fetchStart(task: DownloadTask, blockIndex: number, contentLength: number): void {
    }
    ;
    fetchProgress(task: DownloadTask, blockIndex: number, receivedSize: number, totalSize: number): void {
        let increase = receivedSize - this.that.preReceivedBytes;
        this.that.speedCalculator.downloading(increase);
        this.that.progress = Math.floor(receivedSize / totalSize * 100);
        let speed: any = this.that.speedCalculator.speed();
        this.that.status = Util.humanReadableBytes(receivedSize, true) + '/' + Util.humanReadableBytes(totalSize, true) + '(' + speed + ')';
        this.that.preReceivedBytes = receivedSize;
    }
    ;
    fetchEnd(task: DownloadTask, blockIndex: number, contentLength: number): void {
    }
    ;
    taskEnd(task: DownloadTask, cause: EndCause, error: Error): void {
        Log.showInfo(TAG, "==== taskEnd ==== " + EndCause[cause]);
        this.that.closeState = false;
        this.that.status = EndCause[cause];
        this.that.action = 'START';
        this.that.task.setTag(null);
    }
    ;
}
const TAG = 'Single';
class Single extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.task = new Builder("", "")
            .setWifiRequired(true)
            .build();
        this.preReceivedBytes = 0;
        this.speedCalculator = new SpeedCalculator();
        this.blockCount = 0;
        this.__status = new ObservedPropertySimple("UNKNOWN", this, "status");
        this.__progress = new ObservedPropertySimple(0, this, "progress");
        this.__action = new ObservedPropertySimple("START", this, "action");
        this.__singleClickEventClosedLoop = new ObservedPropertyObject(true, this, "singleClickEventClosedLoop");
        this.__startState = new ObservedPropertySimple(true, this, "startState");
        this.__closeState = new ObservedPropertySimple(true, this, "closeState");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Single_Params) {
        if (params.task !== undefined) {
            this.task = params.task;
        }
        if (params.preReceivedBytes !== undefined) {
            this.preReceivedBytes = params.preReceivedBytes;
        }
        if (params.speedCalculator !== undefined) {
            this.speedCalculator = params.speedCalculator;
        }
        if (params.blockCount !== undefined) {
            this.blockCount = params.blockCount;
        }
        if (params.status !== undefined) {
            this.status = params.status;
        }
        if (params.progress !== undefined) {
            this.progress = params.progress;
        }
        if (params.action !== undefined) {
            this.action = params.action;
        }
        if (params.singleClickEventClosedLoop !== undefined) {
            this.singleClickEventClosedLoop = params.singleClickEventClosedLoop;
        }
        if (params.startState !== undefined) {
            this.startState = params.startState;
        }
        if (params.closeState !== undefined) {
            this.closeState = params.closeState;
        }
    }
    aboutToBeDeleted() {
        this.__status.aboutToBeDeleted();
        this.__progress.aboutToBeDeleted();
        this.__action.aboutToBeDeleted();
        this.__singleClickEventClosedLoop.aboutToBeDeleted();
        this.__startState.aboutToBeDeleted();
        this.__closeState.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private task: DownloadTask;
    private preReceivedBytes: number;
    private speedCalculator: SpeedCalculator;
    private blockCount: number;
    private __status: ObservedPropertySimple<string>;
    get status() {
        return this.__status.get();
    }
    set status(newValue: string) {
        this.__status.set(newValue);
    }
    private __progress: ObservedPropertySimple<number>;
    get progress() {
        return this.__progress.get();
    }
    set progress(newValue: number) {
        this.__progress.set(newValue);
    }
    private __action: ObservedPropertySimple<string>;
    get action() {
        return this.__action.get();
    }
    set action(newValue: string) {
        this.__action.set(newValue);
    }
    private __singleClickEventClosedLoop: ObservedPropertyObject<Boolean>;
    get singleClickEventClosedLoop() {
        return this.__singleClickEventClosedLoop.get();
    }
    set singleClickEventClosedLoop(newValue: Boolean) {
        this.__singleClickEventClosedLoop.set(newValue);
    }
    private __startState: ObservedPropertySimple<boolean>;
    get startState() {
        return this.__startState.get();
    }
    set startState(newValue: boolean) {
        this.__startState.set(newValue);
    }
    private __closeState: ObservedPropertySimple<boolean>;
    get closeState() {
        return this.__closeState.get();
    }
    set closeState(newValue: boolean) {
        this.__closeState.set(newValue);
    }
    render() {
        Column.create();
        Column.margin('10vp');
        Text.create(this.status);
        Text.fontSize('20fp');
        Text.fontColor(Color.Grey);
        Text.pop();
        Progress.create({ value: this.progress, total: 100, style: ProgressStyle.Linear });
        Progress.height(70);
        Progress.width('100%');
        Progress.color(0xFF4081);
        Button.createWithLabel("Start");
        Button.fontSize('20fp');
        Button.enabled(this.startState);
        Button.width('100%');
        Button.height('45vp');
        Button.fontColor(Color.Grey);
        Button.border({ width: 1, color: 0xEEEEEE, radius: 0 });
        Button.onClick(() => {
            this.startState = false;
            this.startCloseDownload();
        });
        Button.pop();
        Button.createWithLabel("Cancel");
        Button.fontSize('20fp');
        Button.enabled(this.closeState);
        Button.width('100%');
        Button.height('45vp');
        Button.margin("45vp");
        Button.fontColor(Color.Grey);
        Button.border({ width: 1, color: 0xEEEEEE, radius: 0 });
        Button.onClick(() => {
            this.closeState = false;
            this.closeDownload();
        });
        Button.pop();
        Column.pop();
    }
    onPageShow() {
        this.initTask();
    }
    initTask() {
        let filename: string = 'single-test';
        let url: string = 'https://cdn.llscdn.com/yy/files/xs8qmxn8-lls-LLS-5.8-800-20171207-111607.apk';
        this.task = new DownloadTask.Builder(url, filename)
            .setWifiRequired(true)
            .build();
    }
    startDownload() {
        let that = this;
        this.task.execute(new DownloadListenerSample(that));
        this.action = 'CANCELED';
        this.task.setTag("mark-task-started");
        this.singleClickEventClosedLoop = false;
    }
    closeDownload() {
        let that = this;
        if (this.task.getTag()) {
            this.task.cancel();
            this.action = 'START';
            this.task.setTag("");
            this.singleClickEventClosedLoop = true;
        }
    }
    startCloseDownload() {
        let that = this;
        if (this.task.getTag()) {
            if (!this.singleClickEventClosedLoop) {
                this.task.cancel();
                this.action = 'START';
                this.task.setTag("");
                this.singleClickEventClosedLoop = true;
            }
        }
        else {
            if (this.singleClickEventClosedLoop) {
                this.task.execute(new DownloadListenerSample(that));
                this.action = 'CANCELED';
                this.task.setTag("mark-task-started");
                this.singleClickEventClosedLoop = false;
            }
        }
    }
}
loadDocument(new Single("1", undefined, {}));
