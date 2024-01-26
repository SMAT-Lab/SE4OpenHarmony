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
import { DownloadListener } from '../DownloadListener';
import { DownloadTask } from '../DownloadTask';
import { BreakpointInfo } from '../breakpoint/BreakpointInfo';
import { ResumeFailedCause } from '../cause/ResumeFailedCause';
import { EndCause } from '../cause/EndCause';
export class DownloadListenerBunch implements DownloadListener {
    listenerList: DownloadListener[];
    constructor(listenerList: DownloadListener[]) {
        this.listenerList = listenerList;
    }
    public taskStart(task: DownloadTask): void {
        for (let listener of this.listenerList) {
            listener.taskStart(task);
        }
    }
    public connectTrialStart(task: DownloadTask, requestHeaderFields: object): void {
        for (let listener of this.listenerList) {
            listener.connectTrialStart(task, requestHeaderFields);
        }
    }
    public connectTrialEnd(task: DownloadTask, responseCode: number, responseHeaderFields: object): void {
        for (let listener of this.listenerList) {
            listener.connectTrialEnd(task, responseCode, responseHeaderFields);
        }
    }
    public downloadFromBeginning(task: DownloadTask, info: BreakpointInfo, cause: ResumeFailedCause): void {
        for (let listener of this.listenerList) {
            listener.downloadFromBeginning(task, info, cause);
        }
    }
    public downloadFromBreakpoint(task: DownloadTask, info: BreakpointInfo): void {
        for (let listener of this.listenerList) {
            listener.downloadFromBreakpoint(task, info);
        }
    }
    public connectStart(task: DownloadTask, blockIndex: number, requestHeaderFields: object): void {
        for (let listener of this.listenerList) {
            listener.connectStart(task, blockIndex, requestHeaderFields);
        }
    }
    public connectEnd(task: DownloadTask, blockIndex: number, responseCode: number, responseHeaderFields: object): void {
        for (let listener of this.listenerList) {
            listener.connectEnd(task, blockIndex, responseCode, responseHeaderFields);
        }
    }
    public fetchStart(task: DownloadTask, blockIndex: number, contentLength: number): void {
        for (let listener of this.listenerList) {
            listener.fetchStart(task, blockIndex, contentLength);
        }
    }
    public fetchProgress(task: DownloadTask, blockIndex: number, increaseBytes: number, totalSize: number): void {
        for (let listener of this.listenerList) {
            listener.fetchProgress(task, blockIndex, increaseBytes, totalSize);
        }
    }
    public fetchEnd(task: DownloadTask, blockIndex: number, contentLength: number): void {
        for (let listener of this.listenerList) {
            listener.fetchEnd(task, blockIndex, contentLength);
        }
    }
    public taskEnd(task: DownloadTask, cause: EndCause, realCause: Error): void {
        for (let listener of this.listenerList) {
            listener.taskEnd(task, cause, realCause);
        }
    }
    public contain(targetListener: DownloadListener): boolean {
        for (let listener of this.listenerList) {
            if (listener === targetListener)
                return true;
        }
        return false;
    }
    /**
     * Get the index of {@code targetListener}, smaller index, earlier to receive callback.
     *
     * @param targetListener used for compare and get it's index on the bunch.
     * @return {@code -1} if can't find {@code targetListener} on the bunch, otherwise the index of
     * the {@code targetListener} on the bunch.
     */
    public indexOf(targetListener: DownloadListener): number {
        for (var index = 0; index < this.listenerList.length; index++) {
            const listener: DownloadListener = this.listenerList[index];
            if (listener == targetListener)
                return index;
        }
        return -1;
    }
    public static Builder = class {
        listenerList: Array<DownloadListener> = new Array;
        public build(): DownloadListenerBunch {
            return new DownloadListenerBunch(this.listenerList);
        }
        /**
         * Append {@code listener} to the end of bunch listener list. Then the {@code listener} will
         * listener the callbacks of the host bunch listener attached.
         *
         * @param listener will be appended to the end of bunch listener list. if it's {@code null},
         *                 it will not be appended.
         */
        public append(listener: DownloadListener) {
            if (listener != null && this.listenerList.indexOf(listener) == -1) {
                this.listenerList.push(listener);
            }
            return this;
        }
        public remove(listener: DownloadListener): boolean {
            let length = this.listenerList.splice(this.listenerList.indexOf(listener), 1).length;
            if (length === 0) {
                return false;
            }
            return true;
        }
    };
}
