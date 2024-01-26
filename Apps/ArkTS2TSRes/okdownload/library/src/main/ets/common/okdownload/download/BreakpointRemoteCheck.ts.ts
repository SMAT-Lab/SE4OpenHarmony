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
import { DownloadTask } from '../DownloadTask';
import { DownloadStrategy } from './DownloadStrategy';
import { ResumeFailedCause } from '../cause/ResumeFailedCause';
import { ConnectTrial } from './ConnectTrial';
import { OkDownload } from '../OkDownload';
import { ServerCanceledException } from '../exception/ServerCanceledException';
import { FileBusyAfterRunException } from '../exception/FileBusyAfterRunException';
import { RANGE_NOT_SATISFIABLE } from '../Util';
export class BreakpointRemoteCheck {
    private acceptRange: boolean;
    private resumable: boolean;
    failedCause: ResumeFailedCause;
    private instanceLength: ResumeFailedCause;
    private task: DownloadTask;
    private info: BreakpointInfo;
    public constructor(task: DownloadTask, info: BreakpointInfo) {
        this.task = task;
        this.info = info;
    }
    /**
     * Get the remote check failed cause.
     *
     * @return {@code null} only if the result of {@link #isResumable()} is {@code false}.
     */
    public getCause(): ResumeFailedCause {
        return this.failedCause;
    }
    /**
     * Get the remote check failed cause, and if the cause can't be found will thrown the
     * {@link IllegalStateException}.
     *
     * @return the failed cause.
     */
    public getCauseOrThrow(): ResumeFailedCause {
        if (this.failedCause === undefined) {
            throw new Error("okDownload No cause find with resumable: " + this.resumable);
        }
        return this.failedCause;
        //return ResumeFailedCause.RESPONSE_CREATED_RANGE_NOT_FROM_0;
    }
    public isResumable(): boolean {
        return this.resumable;
    }
    public isAcceptRange(): boolean {
        return this.acceptRange;
    }
    public getInstanceLength(): number {
        return this.instanceLength;
    }
    public async check() {
        // local etag
        const downloadStrategy: DownloadStrategy = OkDownload.with().getDownloadStrategy();
        // execute trial
        let connectTrial: ConnectTrial = this.createConnectTrial();
        await connectTrial.executeTrial();
        // single/multi
        const isAcceptRange: boolean = connectTrial.isAcceptRange();
        const isChunked: boolean = connectTrial.isChunked();
        // data
        const instanceLength: number = connectTrial.getInstanceLength();
        const responseEtag: string = connectTrial.getResponseEtag();
        const responseFilename: string = connectTrial.getResponseFilename();
        const responseCode: number = connectTrial.getResponseCode();
        // 1. assemble basic data.
        downloadStrategy.validFilenameFromResponse(responseFilename, this.task, this.info);
        this.info.setChunked(isChunked);
        this.info.setEtag(responseEtag);
        if (OkDownload.with().getDownloadDispatcher().isFileConflictAfterRun(this.task)) {
            throw FileBusyAfterRunException.SIGNAL;
        }
        // 2. collect result
        const resumeFailedCause: ResumeFailedCause = downloadStrategy
            .getPreconditionFailedCause(responseCode, this.info.getTotalOffset() != 0, this.info, responseEtag);
        this.resumable = resumeFailedCause == null;
        this.failedCause = resumeFailedCause;
        this.instanceLength = instanceLength;
        this.acceptRange = isAcceptRange;
        //3. check whether server cancelled.
        //    if (!this.isTrialSpecialPass(responseCode, instanceLength, this.resumable)
        //    && downloadStrategy.isServerCanceled(responseCode, this.info.getTotalOffset() != 0)) {
        //      throw new ServerCanceledException(responseCode, this.info.getTotalOffset());
        //    }
    }
    isTrialSpecialPass(responseCode: number, instanceLength: number, isResumable: boolean): boolean {
        if (responseCode == RANGE_NOT_SATISFIABLE && instanceLength >= 0 && isResumable) {
            // provide valid instance-length & resumable but backend response wrong code 416
            // for the range:0-0, because of values on response header is valid we pass it.
            return true;
        }
        return false;
    }
    // convenient for unit-test.
    createConnectTrial(): ConnectTrial {
        return new ConnectTrial(this.task, this.info);
    }
}
