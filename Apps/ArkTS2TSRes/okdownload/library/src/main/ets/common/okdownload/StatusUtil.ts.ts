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
import { DownloadTask } from './DownloadTask';
import { BreakpointInfo } from './breakpoint/BreakpointInfo';
import { BreakpointStore } from './breakpoint/BreakpointStore';
import { OkDownload } from './OkDownload';
import { Util } from './Util';
import { DownloadDispatcher } from './dispatcher/DownloadDispatcher';
import { Builder } from './Builder';
export class StatusUtil {
    public static isSameTaskPendingOrRunning(task: DownloadTask) {
        return OkDownload.with().getDownloadDispatcher().findSameTask(task) != null;
    }
    public static getStatus(task: DownloadTask): Status {
        const status: Status = StatusUtil.isCompletedOrUnknown(task);
        if (status == Status.COMPLETED)
            return Status.COMPLETED;
        const dispatcher: DownloadDispatcher = OkDownload.with().getDownloadDispatcher();
        if (dispatcher.isPending(task))
            return Status.PENDING;
        if (dispatcher.isRunning(task))
            return Status.RUNNING;
        return status;
    }
    public static isComplete(task: DownloadTask): boolean {
        return StatusUtil.isCompletedOrUnknown(task) == Status.COMPLETED;
    }
    public static isCompletedOrUnknown(task: DownloadTask): Status {
        const store: BreakpointStore = OkDownload.with().getBreakpointStore();
        const info: BreakpointInfo = store.get(task.getId());
        var filename: string = task.getFilename();
        if (info !== undefined) {
            if (!info.isChunked()) {
                return Status.UNKNOWN;
            }
            else if ((filename !== undefined && filename === info.getFilename())
                && Util.exists(filename)) {
                return Status.COMPLETED;
            }
            else if (filename === undefined && info.getFilename() !== undefined
                && Util.exists(info.getFilename())) {
                return Status.IDLE;
            }
        }
        else if (store.isOnlyMemoryCache() || store.isFileDirty(task.getId())) {
            return Status.UNKNOWN;
        }
        else if (filename !== undefined && Util.exists(filename)) {
            return Status.COMPLETED;
        }
        else {
            filename = store.getResponseFilename(task.getUrl());
            if (filename !== undefined && Util.exists(filename)) {
                return Status.COMPLETED;
            }
        }
        return Status.UNKNOWN;
    }
    public static isCompleted(task?: DownloadTask, url?: string, filename?: string): boolean {
        if (task === undefined && url !== undefined && filename !== undefined) {
            task = this.createFinder(url, filename);
        }
        return this.isCompletedOrUnknown(task) === Status.COMPLETED;
    }
    public static getCurrentInfo(task?: DownloadTask, url?: string, filename?: string): BreakpointInfo {
        if (task === undefined && url !== undefined && filename !== undefined) {
            task = this.createFinder(url, filename);
        }
        const store: BreakpointStore = OkDownload.with().getBreakpointStore();
        const id: number = store.findOrCreateId(task);
        const info: BreakpointInfo = store.get(id);
        return info === undefined ? null : info.copy();
    }
    static createFinder(url: string, filename: string): DownloadTask {
        return new Builder(url, filename).build();
    }
}
export enum Status {
    PENDING,
    RUNNING,
    COMPLETED,
    IDLE,
    // may completed, but no filename can't ensure.
    UNKNOWN
}
