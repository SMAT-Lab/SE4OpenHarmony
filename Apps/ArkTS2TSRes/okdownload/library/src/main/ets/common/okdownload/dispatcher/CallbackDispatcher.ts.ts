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
import { BreakpointInfo } from '../breakpoint/BreakpointInfo';
import { DownloadListener } from '../DownloadListener';
import { DownloadTask } from '../DownloadTask';
import { DownloadMonitor } from '../DownloadMonitor';
import { OkDownload } from '../OkDownload';
import { ResumeFailedCause } from '../cause/ResumeFailedCause';
import { EndCause } from '../cause/EndCause';
export class CallbackDispatcher {
    private transmit: DownloadListener;
    constructor(transmit: DownloadListener = new DefaultTransmitListener()) {
        this.transmit = transmit;
    }
    public endTasksWithError(errorCollection: Array<DownloadTask>, realCause: Error): void {
        if (errorCollection.length <= 0)
            return;
        console.debug("endTasksWithError error[" + errorCollection.length + "] realCause: " + realCause);
        for (var i = 0; i < errorCollection.length; i++) {
            const task: DownloadTask = errorCollection[i];
            task.getListener().taskEnd(task, EndCause.ERROR, null);
            errorCollection.splice(i, 1);
        }
    }
    public endTasks(completedTaskCollection: Array<DownloadTask>, sameTaskConflictCollection: Array<DownloadTask>, fileBusyCollection: Array<DownloadTask>): void {
        if (completedTaskCollection.length == 0 && sameTaskConflictCollection.length == 0
            && fileBusyCollection.length == 0) {
            return;
        }
        console.debug("endTasks completed[" + completedTaskCollection.length
            + "] sameTask[" + sameTaskConflictCollection.length
            + "] fileBusy[" + fileBusyCollection.length + "]");
        if (completedTaskCollection.length > 0) {
            for (var i = 0; i < completedTaskCollection.length; i++) {
                const task: DownloadTask = completedTaskCollection[i];
                task.getListener().taskEnd(task, EndCause.COMPLETED, null);
                completedTaskCollection.splice(i, 1);
            }
        }
        if (sameTaskConflictCollection.length > 0) {
            for (var i = 0; i < sameTaskConflictCollection.length; i++) {
                const task: DownloadTask = sameTaskConflictCollection[i];
                task.getListener().taskEnd(task, EndCause.SAME_TASK_BUSY, null);
                sameTaskConflictCollection.splice(i, 1);
            }
        }
        if (fileBusyCollection.length > 0) {
            for (var i = 0; i < fileBusyCollection.length; i++) {
                const task: DownloadTask = fileBusyCollection[i];
                task.getListener().taskEnd(task, EndCause.FILE_BUSY, null);
                fileBusyCollection.splice(i, 1);
            }
        }
        if (completedTaskCollection.length == 0 && sameTaskConflictCollection.length == 0
            && fileBusyCollection.length == 0) {
            return;
        }
    }
    public endTasksWithCanceled(canceledCollection: Array<DownloadTask>): void {
        if (canceledCollection.length <= 0)
            return;
        console.debug("endTasksWithCanceled canceled[" + canceledCollection.length + "]");
        for (var i = 0; i < canceledCollection.length; i++) {
            const task: DownloadTask = canceledCollection[i];
            task.getListener().taskEnd(task, EndCause.CANCELED, null);
            canceledCollection.splice(i, 1);
        }
    }
    public dispatch(): DownloadListener {
        return this.transmit;
    }
}
class DefaultTransmitListener implements DownloadListener {
    public taskStart(task: DownloadTask): void {
        console.debug("okDownload taskStart: " + task.getId());
        this.inspectTaskStart(task);
        task.getListener().taskStart(task);
    }
    public connectTrialStart(task: DownloadTask, headerFields: object): void {
        console.debug("okDownload -----> start trial task(" + task.getId() + ") " + headerFields);
        task.getListener().connectTrialStart(task, headerFields);
    }
    public connectTrialEnd(task: DownloadTask, responseCode: number, headerFields: object): void {
        console.debug("okDownload <----- finish trial task(" + task.getId() + ") code[" + responseCode + "]" + headerFields);
        task.getListener()
            .connectTrialEnd(task, responseCode, headerFields);
    }
    public downloadFromBeginning(task: DownloadTask, info: BreakpointInfo, cause: ResumeFailedCause): void {
        console.debug("okDownload downloadFromBeginning: " + task.getId());
        this.inspectDownloadFromBeginning(task, info, cause);
        task.getListener().downloadFromBeginning(task, info, cause);
    }
    public downloadFromBreakpoint(task: DownloadTask, info: BreakpointInfo): void {
        console.debug("okDownload downloadFromBreakpoint: " + task.getId());
        this.inspectDownloadFromBreakpoint(task, info);
        task.getListener().downloadFromBreakpoint(task, info);
    }
    public connectStart(task: DownloadTask, blockIndex: number, requestHeaderFields: Map<string, Array<string>>): void {
        console.debug("okDownload -----> start connection task(" + task.getId() + ") " + requestHeaderFields);
        task.getListener().connectStart(task, blockIndex, requestHeaderFields);
    }
    public connectEnd(task: DownloadTask, blockIndex: number, responseCode: number, requestHeaderFields: Map<string, Array<string>>): void {
        console.debug("okDownload <----- finish connection task(" + task.getId() + ") code[" + responseCode + "]" + requestHeaderFields);
        task.getListener().connectEnd(task, blockIndex, responseCode, requestHeaderFields);
    }
    public fetchStart(task: DownloadTask, blockIndex: number, contentLength: number): void {
        console.debug("okDownload fetchStart: " + task.getId());
        task.getListener().fetchStart(task, blockIndex, contentLength);
    }
    public fetchProgress(task: DownloadTask, blockIndex: number, increaseBytes: number, totalSize: number): void {
        //            if (task.getMinIntervalMillisCallbackProcess() > 0) {
        //                DownloadTask.TaskHideWrapper
        //                        .setLastCallbackProcessTs(task, SystemClock.uptimeMillis());
        //            }
        task.getListener().fetchProgress(task, blockIndex, increaseBytes, totalSize);
    }
    public fetchEnd(task: DownloadTask, blockIndex: number, contentLength: number): void {
        console.debug("okDownload fetchEnd: " + task.getId());
        task.getListener().fetchEnd(task, blockIndex, contentLength);
    }
    public taskEnd(task: DownloadTask, cause: EndCause, realCause: Error): void {
        if (cause === EndCause.ERROR) {
            // only care about error.
            console.debug("okDownload taskEnd: " + task.getId() + " " + cause);
        }
        this.inspectTaskEnd(task, cause);
        task.getListener().taskEnd(task, cause, realCause);
    }
    inspectDownloadFromBreakpoint(task: DownloadTask, info: BreakpointInfo): void {
        const monitor: DownloadMonitor = OkDownload.with().getMonitor();
        if (monitor !== undefined)
            monitor.taskDownloadFromBreakpoint(task, info);
    }
    inspectDownloadFromBeginning(task: DownloadTask, info: BreakpointInfo, cause: ResumeFailedCause): void {
        const monitor: DownloadMonitor = OkDownload.with().getMonitor();
        if (monitor !== undefined)
            monitor.taskDownloadFromBeginning(task, info, cause);
    }
    inspectTaskStart(task: DownloadTask): void {
        const monitor: DownloadMonitor = OkDownload.with().getMonitor();
        if (monitor !== undefined)
            monitor.taskStart(task);
    }
    inspectTaskEnd(task: DownloadTask, cause: EndCause): void {
        const monitor: DownloadMonitor = OkDownload.with().getMonitor();
        if (monitor !== undefined)
            monitor.taskEnd(task, cause);
    }
}
