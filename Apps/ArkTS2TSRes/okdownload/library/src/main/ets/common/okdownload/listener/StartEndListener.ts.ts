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
/**
 * taskStart->taskEnd
 */
export abstract class StartEndListener implements DownloadListener {
    abstract taskStart(task: DownloadTask): void;
    public connectTrialStart(task: DownloadTask, requestHeaderFields: object): void {
    }
    public connectTrialEnd(task: DownloadTask, responseCode: number, responseHeaderFields: object): void {
    }
    public downloadFromBeginning(task: DownloadTask, info: BreakpointInfo, cause: ResumeFailedCause): void {
    }
    public downloadFromBreakpoint(task: DownloadTask, info: BreakpointInfo): void {
    }
    public connectStart(task: DownloadTask, blockIndex: number, requestHeaderFields: object): void {
    }
    public connectEnd(task: DownloadTask, blockIndex: number, responseCode: number, responseHeaderFields: object): void {
    }
    public fetchStart(task: DownloadTask, blockIndex: number, contentLength: number): void {
    }
    public fetchProgress(task: DownloadTask, blockIndex: number, increaseBytes: number): void {
    }
    public fetchEnd(task: DownloadTask, blockIndex: number, contentLength: number) {
    }
    abstract taskEnd(task: DownloadTask, cause: EndCause, error: Error): void;
}
/**
 * A concise way to create a [DownloadListener2], only the [DownloadListener2.taskEnd] is necessary.
 */
export function createStartEndListener(param: {
    onTaskStart: Function;
    onTaskEnd: Function;
}) {
    return new class extends StartEndListener {
        public taskStart(task: DownloadTask) {
            param.onTaskStart(task);
        }
        public taskEnd(task: DownloadTask, cause: EndCause, realCause: Error) {
            param.onTaskEnd(task, cause, realCause);
        }
    };
}
