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
import { ResumeFailedException } from '../exception/ResumeFailedException';
import { ResumeFailedCause } from '../cause/ResumeFailedCause';
import { DownloadSecurityException } from '../exception/DownloadSecurityException';
import { FileBusyAfterRunException } from '../exception/FileBusyAfterRunException';
import { PreAllocateException } from '../exception/PreAllocateException';
import { InterruptException } from '../exception/InterruptException';
import { ServerCanceledException } from '../exception/ServerCanceledException';
export class DownloadCache {
    private redirectLocation: string;
    //private final MultiPointOutputStream outputStream;
    private preconditionFailed: boolean;
    private userCanceled: boolean;
    private serverCanceled: boolean;
    private unknownError: boolean;
    private fileBusyAfterRun: boolean;
    private preAllocateFailed: boolean;
    private realCause: Error;
    constructor() {
        //this.outputStream = outputStream;
    }
    //    @NonNull MultiPointOutputStream getOutputStream() {
    //        if (outputStream == null) throw new IllegalArgumentException();
    //        return outputStream;
    //    }
    setRedirectLocation(redirectLocation: string): void {
        this.redirectLocation = redirectLocation;
    }
    getRedirectLocation(): string {
        return this.redirectLocation;
    }
    isPreconditionFailed(): boolean {
        return this.preconditionFailed;
    }
    public isUserCanceled(): boolean {
        return this.userCanceled;
    }
    isServerCanceled(): boolean {
        return this.serverCanceled;
    }
    isUnknownError(): boolean {
        return this.unknownError;
    }
    isFileBusyAfterRun(): boolean {
        return this.fileBusyAfterRun;
    }
    public isPreAllocateFailed(): boolean {
        return this.preAllocateFailed;
    }
    getRealCause(): Error {
        return this.realCause;
    }
    getResumeFailedCause(): ResumeFailedCause {
        return (this.realCause as ResumeFailedException).getResumeFailedCause();
    }
    public isInterrupt(): boolean {
        return this.preconditionFailed || this.userCanceled || this.serverCanceled || this.unknownError
            || this.fileBusyAfterRun || this.preAllocateFailed;
    }
    public setPreconditionFailed(realCause: Error): void {
        this.preconditionFailed = true;
        this.realCause = realCause;
    }
    setUserCanceled(): void {
        this.userCanceled = true;
    }
    public setFileBusyAfterRun(): void {
        this.fileBusyAfterRun = true;
    }
    public setServerCanceled(realCause: Error): void {
        this.serverCanceled = true;
        this.realCause = realCause;
    }
    public setUnknownError(realCause: Error): void {
        this.unknownError = true;
        this.realCause = realCause;
    }
    public setPreAllocateFailed(realCause: Error): void {
        this.preAllocateFailed = true;
        this.realCause = realCause;
    }
    public catchException(e: Error): void {
        if (this.isUserCanceled())
            return; // ignored
        if (e instanceof ResumeFailedException) {
            this.setPreconditionFailed(e);
        }
        else if (e instanceof ServerCanceledException) {
            this.setServerCanceled(e);
        }
        else if (e == FileBusyAfterRunException.SIGNAL) {
            this.setFileBusyAfterRun();
        }
        else if (e instanceof PreAllocateException) {
            this.setPreAllocateFailed(e);
        }
        else if (e != InterruptException.SIGNAL) {
            this.setUnknownError(e);
            //            if (!(e instanceof SocketException)) {
            //                // we know socket exception, so ignore it,  otherwise print stack trace.
            //                Util.d("DownloadCache", "catch unknown error " + e);
            //            }
        }
    }
}
export class PreError extends DownloadCache {
    constructor(realCause: Error) {
        super();
        this.setUnknownError(realCause);
    }
}
