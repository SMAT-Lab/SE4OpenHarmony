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
import { DownloadTask } from '../DownloadTask';
import { ResumeFailedCause } from '../cause/ResumeFailedCause';
import { BreakpointInfo } from '../breakpoint/BreakpointInfo';
import { Util } from '../Util';
export class DownloadStrategy {
    // 1 connection: [0, 1MB)
    private readonly ONE_CONNECTION_UPPER_LIMIT: number = 1024 * 1024; // 1MiB
    // 2 connection: [1MB, 5MB)
    private readonly TWO_CONNECTION_UPPER_LIMIT: number = 5 * 1024 * 1024; // 5MiB
    // 3 connection: [5MB, 50MB)
    private readonly THREE_CONNECTION_UPPER_LIMIT: number = 50 * 1024 * 1024; // 50MiB
    // 4 connection: [50MB, 100MB)
    private readonly FOUR_CONNECTION_UPPER_LIMIT: number = 100 * 1024 * 1024; // 100MiB
    public determineBlockCount(task: DownloadTask, totalLength: number): number {
        //if (task.getSetConnectionCount() != null) return task.getSetConnectionCount();
        if (totalLength < this.ONE_CONNECTION_UPPER_LIMIT) {
            return 1;
        }
        if (totalLength < this.TWO_CONNECTION_UPPER_LIMIT) {
            return 2;
        }
        if (totalLength < this.THREE_CONNECTION_UPPER_LIMIT) {
            return 3;
        }
        if (totalLength < this.FOUR_CONNECTION_UPPER_LIMIT) {
            return 4;
        }
        return 5;
    }
    public reuseIdledSameInfoThresholdBytes(): number {
        return 10240;
    }
    public getPreconditionFailedCause(responseCode: number, isAlreadyProceed: boolean, info: BreakpointInfo, responseEtag: string): ResumeFailedCause {
        const localEtag: string = info.getEtag();
        if (responseCode == 412) {
            return ResumeFailedCause.RESPONSE_PRECONDITION_FAILED;
        }
        if (!Util.isEmpty(localEtag) && !Util.isEmpty(responseEtag) && !(responseEtag === localEtag)) {
            // etag changed.
            // also etag changed is relate to HTTP_PRECON_FAILED
            return ResumeFailedCause.RESPONSE_ETAG_CHANGED;
        }
        if (responseCode == 201 && isAlreadyProceed) {
            // The request has been fulfilled and has resulted in one or more new resources
            // being created.
            // mark this case is precondition failed for
            // 1. checkout whether accept partial
            // 2. 201 means new resources so range must be from beginning otherwise it can't
            // match local range.
            return ResumeFailedCause.RESPONSE_CREATED_RANGE_NOT_FROM_0;
        }
        if (responseCode == 205 && isAlreadyProceed) {
            return ResumeFailedCause.RESPONSE_RESET_RANGE_NOT_FROM_0;
        }
        return null;
    }
    public validFilenameFromResponse(responseFileName: string, task: DownloadTask, info: BreakpointInfo) {
        if (Util.isEmpty(task.getFilename())) {
            const filename: string = this.determineFilename(responseFileName, task);
            // Double check avoid changed by other block.
            if (Util.isEmpty(task.getFilename())) {
                task.setFilename(filename);
            }
        }
    }
    protected determineFilename(responseFileName: string, task: DownloadTask): string {
        if (Util.isEmpty(responseFileName)) {
            const url: string = task.getUrl();
            const pattern = /.*\\|\/([^\\|\/|?]*)\??/g;
            const arr = url.match(pattern);
            let filename: string = arr[arr.length - 1].substr(1);
            if (filename == null) {
                throw new Error("Can't find valid filename.");
            }
            return filename;
        }
        return responseFileName;
    }
    public isUseMultiBlock(isAcceptRange: boolean): boolean {
        // output stream not support seek
        //if (!OkDownload.with().outputStreamFactory().supportSeek()) return false;
        // support range
        return isAcceptRange;
    }
    public isServerCanceled(responseCode: number, isAlreadyProceed: boolean): boolean {
        if (responseCode != 206
            && responseCode != 200) {
            return true;
        }
        if (responseCode == 200 && isAlreadyProceed) {
            return true;
        }
        return false;
    }
}
