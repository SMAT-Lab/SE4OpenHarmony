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
import { DownloadCall } from '../download/DownloadCall';
import { DownloadTask } from '../DownloadTask';
import { DownloadStore } from '../breakpoint/DownloadStore';
import { EndCause } from '../cause/EndCause';
import { OkDownload } from '../OkDownload';
import { StatusUtil } from '../StatusUtil';
import { CallbackDispatcher } from './CallbackDispatcher';
import { IdentifiedTask } from '../IdentifiedTask';
import { Log } from "../Util";
const TAG = 'DownloadDispatcher';
export class DownloadDispatcher {
    private readyAsyncCalls: Array<DownloadCall>;
    private runningAsyncCalls: Array<DownloadCall>;
    private runningSyncCalls: Array<DownloadCall>;
    private finishingCalls: Array<DownloadCall>;
    private store: DownloadStore;
    readonly maxParallelRunningCount: number = 5;
    private flyingCanceledAsyncCallCount: number = 0;
    constructor(readyAsyncCalls: Array<DownloadCall> = new Array, runningAsyncCalls: Array<DownloadCall> = new Array, runningSyncCalls: Array<DownloadCall> = new Array, finishingCalls: Array<DownloadCall> = new Array) {
        this.readyAsyncCalls = readyAsyncCalls;
        this.runningAsyncCalls = runningAsyncCalls;
        this.runningSyncCalls = runningSyncCalls;
        this.finishingCalls = finishingCalls;
    }
    public setDownloadStore(store: DownloadStore): void {
        this.store = store;
    }
    public enqueueTasks(tasks: DownloadTask[]): void {
        this.enqueueLocked(tasks);
    }
    public enqueue(task: DownloadTask): void {
        Log.showInfo(TAG, "========= enqueue ========");
        this.enqueueLock(task);
    }
    private enqueueLocked(tasks: DownloadTask[]): void {
        const startTime: number = new Date().getTime();
        console.debug("start enqueueLocked for bunch task: " + tasks.length);
        const taskList: Array<DownloadTask> = new Array;
        tasks.forEach(function (task) {
            taskList.push(task);
        });
        //if (taskList.length > 1) taskList.sort();
        const originReadyAsyncCallSize: number = this.readyAsyncCalls.length;
        try {
            //OkDownload.with().getDownloadStrategy().inspectNetworkAvailable();
            const completedTaskList: Array<DownloadTask> = new Array;
            const sameTaskConflictList: Array<DownloadTask> = new Array;
            const fileBusyList: Array<DownloadTask> = new Array;
            for (let task of taskList) {
                if (this.inspectCompleted(task, completedTaskList))
                    continue;
                if (this.inspectForConflict(task, sameTaskConflictList, fileBusyList))
                    continue;
                this.enqueueIgnorePriority(task);
            }
            OkDownload.with().getCallbackDispatcher()
                .endTasks(completedTaskList, sameTaskConflictList, fileBusyList);
        }
        catch (e) {
            Log.showError(TAG, "error === " + JSON.stringify(e));
            const errorList: Array<DownloadTask> = new Array;
            taskList.forEach(function (task) {
                errorList.push(task);
            });
            OkDownload.with().getCallbackDispatcher().endTasksWithError(errorList, e);
        }
        if (originReadyAsyncCallSize != this.readyAsyncCalls.length)
            this.readyAsyncCalls.sort();
        console.debug("end enqueueLocked for bunch task: " + tasks.length + " consume "
            + (new Date().getTime() - startTime) + "ms");
    }
    private enqueueLock(task: DownloadTask): void {
        Log.showDebug(TAG, "enqueueLocked for single task: " + task);
        if (this.inspectCompleted(task))
            return;
        if (this.inspectForConflict(task))
            return;
        const originReadyAsyncCallSize: number = this.readyAsyncCalls.length;
        this.enqueueIgnorePriority(task);
        if (originReadyAsyncCallSize != this.readyAsyncCalls.length)
            this.readyAsyncCalls.sort();
    }
    private enqueueIgnorePriority(task: DownloadTask): void {
        const call: DownloadCall = DownloadCall.create(task, true, this.store);
        let size = this.runningAsyncSize();
        Log.showInfo(TAG, "=== size = " + size);
        if (size < this.maxParallelRunningCount) {
            this.runningAsyncCalls.push(call);
            call.execute();
        }
        else {
            // priority
            this.readyAsyncCalls.push(call);
        }
    }
    public execute(task: DownloadTask) {
        Log.showInfo(TAG, "DownloadDispatcher execute:======= ");
        var call: DownloadCall;
        if (this.inspectCompleted(task))
            return;
        if (this.inspectForConflict(task))
            return;
        Log.showDebug(TAG, "DownloadDispatcher execute: 11111111 ======= ");
        call = DownloadCall.create(task, false, this.store);
        this.runningSyncCalls.push(call);
        call.execute();
    }
    public cancelAll(): void {
        // assemble tasks
        let taskList: Array<DownloadTask> = new Array;
        for (let call of this.readyAsyncCalls)
            taskList.push(call.task);
        for (let call of this.runningAsyncCalls)
            taskList.push(call.task);
        for (let call of this.runningSyncCalls)
            taskList.push(call.task);
        if (!(taskList.length === 0)) {
            let tasks: DownloadTask[] = taskList;
            this.cancelLocked(tasks);
        }
    }
    public cancelTasks(tasks: IdentifiedTask[]): void {
        this.cancelLocked(tasks);
        this.processCalls();
    }
    public cancelTask(task: IdentifiedTask): boolean {
        const result: boolean = this.cancelLock(task);
        this.processCalls();
        return result;
    }
    public cancel(id: number): boolean {
        //skipProceedCallCount.incrementAndGet();
        const result: boolean = this.cancelLock(DownloadTask.mockTaskForCompare(id));
        //skipProceedCallCount.decrementAndGet();
        this.processCalls();
        return result;
    }
    private cancelLocked(tasks: IdentifiedTask[]): void {
        const startCancelTime: number = new Date().getTime();
        console.debug("start cancel bunch task manually: " + tasks.length);
        const needCallbackCalls: Array<DownloadCall> = new Array;
        const needCancelCalls: Array<DownloadCall> = new Array;
        try {
            for (let task of tasks) {
                this.filterCanceledCalls(task, needCallbackCalls, needCancelCalls);
            }
        }
        finally {
            this.handleCanceledCalls(needCallbackCalls, needCancelCalls);
            console.debug("finish cancel bunch task manually: " + tasks.length + " consume "
                + (new Date().getTime() - startCancelTime) + "ms");
        }
    }
    cancelLock(task: IdentifiedTask): boolean {
        console.error("cancel manually: " + task.getId());
        const needCallbackCalls: Array<DownloadCall> = new Array;
        const needCancelCalls: Array<DownloadCall> = new Array;
        try {
            this.filterCanceledCalls(task, needCallbackCalls, needCancelCalls);
        }
        finally {
            this.handleCanceledCalls(needCallbackCalls, needCancelCalls);
        }
        return needCallbackCalls.length > 0 || needCancelCalls.length > 0;
    }
    private filterCanceledCalls(task: IdentifiedTask, needCallbackCalls: Array<DownloadCall>, needCancelCalls: Array<DownloadCall>): void {
        for (var i = 0; i < this.readyAsyncCalls.length; i++) {
            let call: DownloadCall = this.readyAsyncCalls[i];
            if (call.task === task || call.task.getId() === task.getId()) {
                if (call.isCanceled() || call.isFinishing())
                    return;
                this.readyAsyncCalls.splice(i, 1);
                needCallbackCalls.push(call);
                return;
            }
        }
        for (let call of this.runningAsyncCalls) {
            if (call.task == task || call.task.getId() == task.getId()) {
                needCallbackCalls.push(call);
                needCancelCalls.push(call);
                return;
            }
        }
        for (let call of this.runningSyncCalls) {
            if (call.task == task || call.task.getId() == task.getId()) {
                needCallbackCalls.push(call);
                needCancelCalls.push(call);
                return;
            }
        }
    }
    private handleCanceledCalls(needCallbackCalls: Array<DownloadCall>, needCancelCalls: Array<DownloadCall>): void {
        console.error("handle cancel calls, cancel calls: " + needCancelCalls.length + "; callback length = " + needCallbackCalls.length);
        if (!(needCancelCalls.length === 0)) {
            for (let call of needCancelCalls) {
                if (!call.cancel()) {
                    needCallbackCalls.splice(needCallbackCalls.indexOf(call), 1);
                }
            }
        }
        console.error("handle cancel calls, callback cancel event: " + needCallbackCalls.length);
        if (!(needCancelCalls.length === 0)) {
            if (needCallbackCalls.length <= 1) {
                const call: DownloadCall = needCallbackCalls[0];
                OkDownload.with().getCallbackDispatcher().dispatch().taskEnd(call.task, EndCause.CANCELED, null);
            }
            else {
                let callbackCanceledTasks: Array<DownloadTask> = new Array;
                for (let call of needCallbackCalls) {
                    callbackCanceledTasks.push(call.task);
                }
                OkDownload.with().getCallbackDispatcher().endTasksWithCanceled(callbackCanceledTasks);
            }
        }
    }
    public findSameTask(task: DownloadTask): DownloadTask {
        console.debug("findSameTask: " + task.getId());
        for (let call of this.readyAsyncCalls) {
            if (call.isCanceled())
                continue;
            if (call.equalsTask(task))
                return call.task;
        }
        for (let call of this.runningAsyncCalls) {
            if (call.isCanceled())
                continue;
            if (call.equalsTask(task))
                return call.task;
        }
        for (let call of this.runningSyncCalls) {
            if (call.isCanceled())
                continue;
            if (call.equalsTask(task))
                return call.task;
        }
        return null;
    }
    public isRunning(task: DownloadTask): boolean {
        console.debug("isRunning: " + task.getId());
        for (let call of this.runningSyncCalls) {
            if (call.isCanceled())
                continue;
            if (call.equalsTask(task)) {
                return true;
            }
        }
        for (let call of this.runningAsyncCalls) {
            if (call.isCanceled())
                continue;
            if (call.equalsTask(task)) {
                return true;
            }
        }
        return false;
    }
    public isPending(task: DownloadTask): boolean {
        console.debug(TAG, "isPending: " + task.getId());
        for (let call of this.readyAsyncCalls) {
            if (call.isCanceled())
                continue;
            if (call.equalsTask(task))
                return true;
        }
        return false;
    }
    public flyingCanceled(call: DownloadCall): void {
        console.debug("flying canceled: " + call.task.getId());
        if (call.asyncExecuted)
            this.flyingCanceledAsyncCallCount++;
    }
    public finish(call: DownloadCall): void {
        const asyncExecuted: boolean = call.asyncExecuted;
        let calls: Array<DownloadCall>;
        if (this.finishingCalls.indexOf(call) != -1) {
            calls = this.finishingCalls;
        }
        else if (asyncExecuted) {
            calls = this.runningAsyncCalls;
        }
        else {
            calls = this.runningSyncCalls;
        }
        if (calls.splice(calls.indexOf(call), 1).length != 1)
            throw new Error("Call wasn't in-flight!");
        if (asyncExecuted && call.isCanceled())
            this.flyingCanceledAsyncCallCount--;
        if (asyncExecuted)
            this.processCalls();
    }
    public isFileConflictAfterRun(task: DownloadTask): boolean {
        console.debug("is file conflict after run: " + task.getId());
        const file: string = task.getFilename();
        if (file == null)
            return false;
        // Other one is running, cancel the current task.
        for (let syncCall of this.runningSyncCalls) {
            if (syncCall.isCanceled() || syncCall.task === task)
                continue;
            const otherFile: string = syncCall.task.getFilename();
            if (otherFile != null && file === otherFile) {
                return true;
            }
        }
        for (let asyncCall of this.runningAsyncCalls) {
            if (asyncCall.isCanceled() || asyncCall.task === task)
                continue;
            const otherFile = asyncCall.task.getFilename();
            if (otherFile !== undefined && file === otherFile) {
                return true;
            }
        }
        return false;
    }
    private inspectForConflict(task: DownloadTask, sameTaskList?: Array<DownloadTask>, fileBusyList?: Array<DownloadTask>): boolean {
        Log.showInfo(TAG, "readyAsyncCalls = " + this.readyAsyncCalls.length + "; runningAsyncCalls = " + this.runningAsyncCalls.length +
            "; runningSyncCalls = " + this.runningSyncCalls.length);
        return this.inspectForConf(task, this.readyAsyncCalls, sameTaskList, fileBusyList)
            || this.inspectForConf(task, this.runningAsyncCalls, sameTaskList, fileBusyList)
            || this.inspectForConf(task, this.runningSyncCalls, sameTaskList, fileBusyList);
    }
    inspectCompleted(task: DownloadTask, completedCollection?: Array<DownloadTask>): boolean {
        Log.showInfo(TAG, "inspectCompleted = " + task.isPassIfAlreadyCompleted() + "; status = " + StatusUtil.isCompleted(task));
        if (task.isPassIfAlreadyCompleted() && StatusUtil.isCompleted(task)) {
            if (task.getFilename() == null) {
                return false;
            }
            //OkDownload.with().downloadStrategy().validInfoOnCompleted(task, store);
            if (completedCollection != null) {
                completedCollection.push(task);
            }
            else {
                Log.showInfo(TAG, "onComplete id = " + task.getId());
                OkDownload.with().getCallbackDispatcher().dispatch()
                    .taskEnd(task, EndCause.COMPLETED, null);
            }
            return true;
        }
        return false;
    }
    inspectForConf(task: DownloadTask, calls: Array<DownloadCall>, sameTaskList: Array<DownloadTask>, fileBusyList: Array<DownloadTask>): boolean {
        const callbackDispatcher: CallbackDispatcher = OkDownload.with().getCallbackDispatcher();
        for (let call of calls) {
            if (call.isCanceled())
                continue;
            if (call.equalsTask(task)) {
                if (call.isFinishing()) {
                    Log.showInfo(TAG, "task: " + task.getId() + " is finishing, move it to finishing list");
                    this.finishingCalls.push(call);
                    return false;
                }
                if (sameTaskList != null) {
                    sameTaskList.push(task);
                }
                else {
                    callbackDispatcher.dispatch().taskEnd(task, EndCause.SAME_TASK_BUSY, null);
                }
                return true;
            }
            const filename = call.getFileName();
            const taskFilename = task.getFilename();
            if (filename != null && taskFilename != null && (filename === taskFilename)) {
                if (fileBusyList != null) {
                    fileBusyList.push(task);
                }
                else {
                    callbackDispatcher.dispatch().taskEnd(task, EndCause.FILE_BUSY, null);
                }
                return true;
            }
        }
        return false;
    }
    private processCalls(): void {
        //if (skipProceedCallCount.get() > 0) return;
        if (this.runningAsyncSize() >= this.maxParallelRunningCount)
            return;
        if (this.readyAsyncCalls.length == 0)
            return;
        for (var i = 0; i <= this.readyAsyncCalls.length; i++) {
            let call: DownloadCall = this.readyAsyncCalls[i];
            this.readyAsyncCalls.splice(i, 1);
            const task: DownloadTask = call.task;
            if (this.isFileConflictAfterRun(task)) {
                OkDownload.with().getCallbackDispatcher().dispatch().taskEnd(task, EndCause.FILE_BUSY, null);
                continue;
            }
            this.runningAsyncCalls.push(call);
            call.execute();
            if (this.runningAsyncSize() >= this.maxParallelRunningCount)
                return;
        }
    }
    private runningAsyncSize(): number {
        return this.runningAsyncCalls.length - this.flyingCanceledAsyncCallCount;
    }
}
