interface EachBlockProgress_Params {
    task?: DownloadTask;
    totalLength?: number;
    action?: string;
    state?: string;
    taskProgress?: number;
    block0Progress?: number;
    block1Progress?: number;
    block2Progress?: number;
    block3Progress?: number;
    taskTitle?: string;
    block0Title?: string;
    block1Title?: string;
    block2Title?: string;
    block3Title?: string;
    taskSpeed?: string;
    block0Speed?: string;
    block1Speed?: string;
    block2Speed?: string;
    block3Speed?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "EachBlockProgress_" + ++__generate__Id;
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
import { DownloadListenerWithSpeed } from '@ohos/okdownload';
import { DownloadTask } from '@ohos/okdownload';
import { BreakpointInfo } from '@ohos/okdownload';
import { BlockInfo } from '@ohos/okdownload';
import { EndCause } from '@ohos/okdownload';
import { SpeedCalculator } from '@ohos/okdownload';
import { EachBlockProgressUtil } from '../pages/util/EachBlockProgressUtil';
import { Builder } from '@ohos/okdownload';
class DownloadListenerWithSpeedSample extends DownloadListenerWithSpeed {
    private that: any;
    constructor(param: any) {
        super();
        this.that = param;
    }
    taskStart(task: DownloadTask): void {
        console.info("==== sample taskStart =======");
        this.that.state = 'Task Start';
    }
    ;
    connectStart(task: DownloadTask, blockIndex: number, requestHeaderFields: object): void {
        const status = "connectStart " + blockIndex + " " + requestHeaderFields;
        this.that.state = status;
    }
    ;
    connectEnd(task: DownloadTask, blockIndex: number, responseCode: number, responseHeaderFields: object): void {
        console.info("===== sample connectEnd =======" + JSON.stringify(responseHeaderFields));
    }
    ;
    public infoReady(task: DownloadTask, info: BreakpointInfo, fromBreakpoint: boolean): void {
        console.error("==== sample infoReady =======" + info.getTotalLength());
        this.that.initTitle(info);
    }
    ;
    public progressBlock(task: DownloadTask, blockIndex: number, receivedSize: number, totalSize: number, blockSpeed: SpeedCalculator): void {
        console.info("===== sample progressBlock =======");
        this.that.state = "Fetch Progress";
        if (blockIndex == 0) {
            this.that.block0Progress = Math.floor(receivedSize / totalSize * 100);
            this.that.block0Speed = blockSpeed.speed();
        }
        else if (blockIndex == 1) {
            this.that.block1Progress = Math.floor(receivedSize / totalSize * 100);
            this.that.block1Speed = blockSpeed.speed();
        }
        else if (blockIndex == 2) {
            this.that.block2Progress = Math.floor(receivedSize / totalSize * 100);
            this.that.block2Speed = blockSpeed.speed();
        }
        else if (blockIndex == 3) {
            this.that.block3Progress = Math.floor(receivedSize / totalSize * 100);
            this.that.block3Speed = blockSpeed.speed();
        }
    }
    ;
    public progress(task: DownloadTask, receivedSize: number, taskSpeed: SpeedCalculator): void {
        console.error("==== sample progress =======" + receivedSize);
        this.that.taskProgress = Math.floor(receivedSize / this.that.totalLength * 100);
        this.that.taskSpeed = taskSpeed.averageSpeed();
    }
    ;
    public blockEnd(task: DownloadTask, blockIndex: number, info: BlockInfo, blockSpeed: SpeedCalculator): void {
        console.info("==== sample blockEnd =======");
    }
    ;
    public taskCompleted(task: DownloadTask, cause: EndCause, realCause: Error, taskSpeed: SpeedCalculator): void {
        console.info("===== sample taskCompleted =======" + cause);
        this.that.state = "COMPLETED";
        this.that.action = "START";
        // mark
        task.setTag("");
    }
    ;
}
class EachBlockProgress extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.task = undefined;
        this.totalLength = 1;
        this.__action = new ObservedPropertySimple('START', this, "action");
        this.__state = new ObservedPropertySimple('UNKNOWN', this, "state");
        this.__taskProgress = new ObservedPropertySimple(0, this, "taskProgress");
        this.__block0Progress = new ObservedPropertySimple(0, this, "block0Progress");
        this.__block1Progress = new ObservedPropertySimple(0, this, "block1Progress");
        this.__block2Progress = new ObservedPropertySimple(0, this, "block2Progress");
        this.__block3Progress = new ObservedPropertySimple(0, this, "block3Progress");
        this.__taskTitle = new ObservedPropertySimple('', this, "taskTitle");
        this.__block0Title = new ObservedPropertySimple('', this, "block0Title");
        this.__block1Title = new ObservedPropertySimple('', this, "block1Title");
        this.__block2Title = new ObservedPropertySimple('', this, "block2Title");
        this.__block3Title = new ObservedPropertySimple('', this, "block3Title");
        this.__taskSpeed = new ObservedPropertySimple('', this, "taskSpeed");
        this.__block0Speed = new ObservedPropertySimple('', this, "block0Speed");
        this.__block1Speed = new ObservedPropertySimple('', this, "block1Speed");
        this.__block2Speed = new ObservedPropertySimple('', this, "block2Speed");
        this.__block3Speed = new ObservedPropertySimple('', this, "block3Speed");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: EachBlockProgress_Params) {
        if (params.task !== undefined) {
            this.task = params.task;
        }
        if (params.totalLength !== undefined) {
            this.totalLength = params.totalLength;
        }
        if (params.action !== undefined) {
            this.action = params.action;
        }
        if (params.state !== undefined) {
            this.state = params.state;
        }
        if (params.taskProgress !== undefined) {
            this.taskProgress = params.taskProgress;
        }
        if (params.block0Progress !== undefined) {
            this.block0Progress = params.block0Progress;
        }
        if (params.block1Progress !== undefined) {
            this.block1Progress = params.block1Progress;
        }
        if (params.block2Progress !== undefined) {
            this.block2Progress = params.block2Progress;
        }
        if (params.block3Progress !== undefined) {
            this.block3Progress = params.block3Progress;
        }
        if (params.taskTitle !== undefined) {
            this.taskTitle = params.taskTitle;
        }
        if (params.block0Title !== undefined) {
            this.block0Title = params.block0Title;
        }
        if (params.block1Title !== undefined) {
            this.block1Title = params.block1Title;
        }
        if (params.block2Title !== undefined) {
            this.block2Title = params.block2Title;
        }
        if (params.block3Title !== undefined) {
            this.block3Title = params.block3Title;
        }
        if (params.taskSpeed !== undefined) {
            this.taskSpeed = params.taskSpeed;
        }
        if (params.block0Speed !== undefined) {
            this.block0Speed = params.block0Speed;
        }
        if (params.block1Speed !== undefined) {
            this.block1Speed = params.block1Speed;
        }
        if (params.block2Speed !== undefined) {
            this.block2Speed = params.block2Speed;
        }
        if (params.block3Speed !== undefined) {
            this.block3Speed = params.block3Speed;
        }
    }
    aboutToBeDeleted() {
        this.__action.aboutToBeDeleted();
        this.__state.aboutToBeDeleted();
        this.__taskProgress.aboutToBeDeleted();
        this.__block0Progress.aboutToBeDeleted();
        this.__block1Progress.aboutToBeDeleted();
        this.__block2Progress.aboutToBeDeleted();
        this.__block3Progress.aboutToBeDeleted();
        this.__taskTitle.aboutToBeDeleted();
        this.__block0Title.aboutToBeDeleted();
        this.__block1Title.aboutToBeDeleted();
        this.__block2Title.aboutToBeDeleted();
        this.__block3Title.aboutToBeDeleted();
        this.__taskSpeed.aboutToBeDeleted();
        this.__block0Speed.aboutToBeDeleted();
        this.__block1Speed.aboutToBeDeleted();
        this.__block2Speed.aboutToBeDeleted();
        this.__block3Speed.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private task?: DownloadTask;
    private totalLength: number;
    private __action: ObservedPropertySimple<string>;
    get action() {
        return this.__action.get();
    }
    set action(newValue: string) {
        this.__action.set(newValue);
    }
    private __state: ObservedPropertySimple<string>;
    get state() {
        return this.__state.get();
    }
    set state(newValue: string) {
        this.__state.set(newValue);
    }
    private __taskProgress: ObservedPropertySimple<number>;
    get taskProgress() {
        return this.__taskProgress.get();
    }
    set taskProgress(newValue: number) {
        this.__taskProgress.set(newValue);
    }
    private __block0Progress: ObservedPropertySimple<number>;
    get block0Progress() {
        return this.__block0Progress.get();
    }
    set block0Progress(newValue: number) {
        this.__block0Progress.set(newValue);
    }
    private __block1Progress: ObservedPropertySimple<number>;
    get block1Progress() {
        return this.__block1Progress.get();
    }
    set block1Progress(newValue: number) {
        this.__block1Progress.set(newValue);
    }
    private __block2Progress: ObservedPropertySimple<number>;
    get block2Progress() {
        return this.__block2Progress.get();
    }
    set block2Progress(newValue: number) {
        this.__block2Progress.set(newValue);
    }
    private __block3Progress: ObservedPropertySimple<number>;
    get block3Progress() {
        return this.__block3Progress.get();
    }
    set block3Progress(newValue: number) {
        this.__block3Progress.set(newValue);
    }
    private __taskTitle: ObservedPropertySimple<string>;
    get taskTitle() {
        return this.__taskTitle.get();
    }
    set taskTitle(newValue: string) {
        this.__taskTitle.set(newValue);
    }
    private __block0Title: ObservedPropertySimple<string>;
    get block0Title() {
        return this.__block0Title.get();
    }
    set block0Title(newValue: string) {
        this.__block0Title.set(newValue);
    }
    private __block1Title: ObservedPropertySimple<string>;
    get block1Title() {
        return this.__block1Title.get();
    }
    set block1Title(newValue: string) {
        this.__block1Title.set(newValue);
    }
    private __block2Title: ObservedPropertySimple<string>;
    get block2Title() {
        return this.__block2Title.get();
    }
    set block2Title(newValue: string) {
        this.__block2Title.set(newValue);
    }
    private __block3Title: ObservedPropertySimple<string>;
    get block3Title() {
        return this.__block3Title.get();
    }
    set block3Title(newValue: string) {
        this.__block3Title.set(newValue);
    }
    private __taskSpeed: ObservedPropertySimple<string>;
    get taskSpeed() {
        return this.__taskSpeed.get();
    }
    set taskSpeed(newValue: string) {
        this.__taskSpeed.set(newValue);
    }
    private __block0Speed: ObservedPropertySimple<string>;
    get block0Speed() {
        return this.__block0Speed.get();
    }
    set block0Speed(newValue: string) {
        this.__block0Speed.set(newValue);
    }
    private __block1Speed: ObservedPropertySimple<string>;
    get block1Speed() {
        return this.__block1Speed.get();
    }
    set block1Speed(newValue: string) {
        this.__block1Speed.set(newValue);
    }
    private __block2Speed: ObservedPropertySimple<string>;
    get block2Speed() {
        return this.__block2Speed.get();
    }
    set block2Speed(newValue: string) {
        this.__block2Speed.set(newValue);
    }
    private __block3Speed: ObservedPropertySimple<string>;
    get block3Speed() {
        return this.__block3Speed.get();
    }
    set block3Speed(newValue: string) {
        this.__block3Speed.set(newValue);
    }
    render() {
        Column.create();
        Column.margin(10);
        Column.alignItems(HorizontalAlign.Center);
        Text.create(this.action);
        Text.fontSize(14);
        Text.width('100%');
        Text.height(40);
        Text.fontColor(Color.Grey);
        Text.textAlign(TextAlign.Center);
        Text.border({ width: 1, color: 0xCCCCCC, radius: 2 });
        Text.onClick(() => {
            let started: boolean = true;
            if (this.task != null) {
                started = this.task.getTag() != null;
            }
            if (started) {
                // to cancel
                if (this.task != null) {
                    this.task.cancel();
                }
            }
            else {
                this.action = 'CANCELED';
                // to start
                this.startDownload();
                // mark
                if (this.task != null) {
                    this.task.setTag("mark-task-started");
                }
            }
        });
        Text.margin({ top: 20 });
        Text.pop();
        Row.create({ space: 15 });
        Row.margin({ top: 5, bottom: 5 });
        Row.width('100%');
        Text.create('Start Same Task');
        Text.fontSize(14);
        Text.width('50%');
        Text.height(40);
        Text.fontColor(Color.Grey);
        Text.textAlign(TextAlign.Center);
        Text.border({ width: 1, color: 0xEEEEEE, radius: 5 });
        Text.onClick(() => {
        });
        Text.pop();
        Text.create('Start Same Task File');
        Text.fontSize(14);
        Text.width('45%');
        Text.height(40);
        Text.fontColor(Color.Grey);
        Text.textAlign(TextAlign.Center);
        Text.border({ width: 1, color: 0xEEEEEE, radius: 5 });
        Text.onClick(() => {
        });
        Text.pop();
        Row.pop();
        Text.create(this.state);
        Text.fontSize(14);
        Text.width('100%');
        Text.height(40);
        Text.fontColor(Color.Grey);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Row.create({ space: 15 });
        Row.width('100%');
        Text.create(this.taskTitle);
        Text.fontSize(12);
        Text.width('50%');
        Text.fontColor(Color.Grey);
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Text.create(this.taskSpeed);
        Text.fontSize(12);
        Text.width('45%');
        Text.fontColor(Color.Grey);
        Text.textAlign(TextAlign.End);
        Text.pop();
        Row.pop();
        Progress.create({ value: this.taskProgress, total: 100, style: ProgressStyle.Linear });
        Progress.height(35);
        Progress.width('100%');
        Progress.color(0xFF4081);
        Row.create({ space: 15 });
        Row.width('100%');
        Text.create(this.block0Title);
        Text.fontSize(12);
        Text.width('50%');
        Text.fontColor(Color.Grey);
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Text.create(this.block0Speed);
        Text.fontSize(12);
        Text.width('45%');
        Text.fontColor(Color.Grey);
        Text.textAlign(TextAlign.End);
        Text.pop();
        Row.pop();
        Progress.create({ value: this.block0Progress, total: 100, style: ProgressStyle.Linear });
        Progress.height(35);
        Progress.width('100%');
        Progress.color(0xFF4081);
        Row.create({ space: 15 });
        Row.width('100%');
        Text.create(this.block1Title);
        Text.fontSize(12);
        Text.width('50%');
        Text.fontColor(Color.Grey);
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Text.create(this.block1Speed);
        Text.fontSize(12);
        Text.width('45%');
        Text.fontColor(Color.Grey);
        Text.textAlign(TextAlign.End);
        Text.pop();
        Row.pop();
        Progress.create({ value: this.block1Progress, total: 100, style: ProgressStyle.Linear });
        Progress.height(35);
        Progress.width('100%');
        Progress.color(0xFF4081);
        Row.create({ space: 15 });
        Row.width('100%');
        Text.create(this.block2Title);
        Text.fontSize(12);
        Text.width('50%');
        Text.fontColor(Color.Grey);
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Text.create(this.block2Speed);
        Text.fontSize(12);
        Text.width('45%');
        Text.fontColor(Color.Grey);
        Text.textAlign(TextAlign.End);
        Text.pop();
        Row.pop();
        Progress.create({ value: this.block2Progress, total: 100, style: ProgressStyle.Linear });
        Progress.height(35);
        Progress.width('100%');
        Progress.color(0xFF4081);
        Row.create({ space: 15 });
        Row.width('100%');
        Text.create(this.block3Title);
        Text.fontSize(12);
        Text.width('50%');
        Text.fontColor(Color.Grey);
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Text.create(this.block3Speed);
        Text.fontSize(12);
        Text.width('45%');
        Text.fontColor(Color.Grey);
        Text.textAlign(TextAlign.End);
        Text.pop();
        Row.pop();
        Progress.create({ value: this.block3Progress, total: 100, style: ProgressStyle.Linear });
        Progress.height(35);
        Progress.width('100%');
        Progress.color(0xFF4081);
        Column.pop();
    }
    onPageShow() {
        this.initTask();
    }
    initTask() {
        let filename: string = 'single';
        let url: string = 'https://cdn.llscdn.com/yy/files/xs8qmxn8-lls-LLS-5.8-800-20171207-111607.apk';
        this.task = new Builder(url, filename)
            .setWifiRequired(true)
            .build();
    }
    startDownload() {
        let that = this;
        if (this.task != null) {
            this.task.enqueue(new DownloadListenerWithSpeedSample(this));
        }
    }
    private initTitle(info: BreakpointInfo) {
        this.totalLength = info.getTotalLength();
        this.taskTitle = EachBlockProgressUtil.initTitle("Task", 0, this.totalLength);
        const blockCount: number = info.getBlockCount();
        for (let i = 0; i < blockCount; i++) {
            const blockInfo: BlockInfo = info.getBlock(i);
            if (i == 0) {
                this.block0Title = EachBlockProgressUtil.initTitle("Block0", blockInfo.getRangeLeft(), blockInfo.getRangeRight());
            }
            else if (i == 1) {
                this.block1Title = EachBlockProgressUtil.initTitle("Block1", blockInfo.getRangeLeft(), blockInfo.getRangeRight());
            }
            else if (i == 2) {
                this.block2Title = EachBlockProgressUtil.initTitle("Block2", blockInfo.getRangeLeft(), blockInfo.getRangeRight());
            }
            else if (i == 3) {
                this.block3Title = EachBlockProgressUtil.initTitle("Block3", blockInfo.getRangeLeft(), blockInfo.getRangeRight());
            }
            else {
                console.warn("no more title view to display block: " + blockInfo);
            }
        }
    }
}
loadDocument(new EachBlockProgress("1", undefined, {}));
