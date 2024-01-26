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
import { ResumeFailedCause } from '../cause/ResumeFailedCause';
import { EndCause } from '../cause/EndCause';
import { BreakpointInfo } from '../breakpoint/BreakpointInfo';
import { Listener1Callback } from './assist/Listener1Assist';
export abstract class SampleListener implements DownloadListener, Listener1Callback {
    public taskStart(task: DownloadTask): void {
        this.taskBegin(task);
    }
    public connectTrialStart(task: DownloadTask, requestHeaderFields: object): void {
    }
    public connectTrialEnd(task: DownloadTask, responseCode: number, responseHeaderFields: object): void {
    }
    public downloadFromBeginning(task: DownloadTask, info: BreakpointInfo, cause: ResumeFailedCause): void {
        this.retry(task, cause);
    }
    public downloadFromBreakpoint(task: DownloadTask, info: BreakpointInfo): void {
    }
    public connectStart(task: DownloadTask, blockIndex: number, requestHeaderFields: object): void {
    }
    public connectEnd(task: DownloadTask, blockIndex: number, responseCode: number, responseHeaderFields: object): void {
        this.connected(task, blockIndex, responseCode);
    }
    public fetchStart(task: DownloadTask, blockIndex: number, contentLength: number): void {
    }
    public fetchProgress(task: DownloadTask, blockIndex: number, receivedSize: number, totalSize: number): void {
        this.progress(task, receivedSize, totalSize);
    }
    public fetchEnd(task: DownloadTask, blockIndex: number, contentLength: number): void {
    }
    public taskEnd(task: DownloadTask, cause: EndCause, error: Error): void {
        this.taskCompleted(task, cause, error);
    }
    abstract taskBegin(task: DownloadTask): void;
    abstract retry(task: DownloadTask, cause: ResumeFailedCause): void;
    abstract connected(task: DownloadTask, blockCount: number, totalLength: number): void;
    abstract progress(task: DownloadTask, currentOffset: number, totalLength: number): void;
    abstract taskCompleted(task: DownloadTask, cause: EndCause, realCause: Error): void;
}
/**
 * A concise way to create a [DownloadListener1], only the
 * [DownloadListener1.taskEnd] is necessary.
 */
export function createSampleListener(param: {
    taskEnd: Function;
    taskStart?: Function;
    retry?: Function;
    connected?: Function;
    progress?: Function;
}) {
    return new class extends SampleListener {
        public taskBegin(task: DownloadTask) {
            if (param.taskStart) {
                param.taskStart(task);
            }
        }
        public retry(task: DownloadTask, cause: ResumeFailedCause) {
            if (param.retry) {
                param.retry(task, cause);
            }
        }
        public connected(task: DownloadTask, blockCount: number, totalLength: number) {
            if (param.connected) {
                param.connected(task, blockCount, totalLength);
            }
        }
        public progress(task: DownloadTask, currentOffset: number, totalLength: number) {
            if (param.progress) {
                param.progress(task, currentOffset, totalLength);
            }
        }
        public taskCompleted(task: DownloadTask, cause: EndCause, realCause: Error) {
            param.taskEnd(task, cause, realCause);
        }
    };
}
