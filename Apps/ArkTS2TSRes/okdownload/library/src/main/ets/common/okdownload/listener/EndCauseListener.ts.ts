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
import { SampleListener } from './SampleListener';
import { DownloadTask } from '../DownloadTask';
import { EndCause } from '../cause/EndCause';
import { ResumeFailedCause } from '../cause/ResumeFailedCause';
/**
 * started->connected->progress<-->progress(currentOffset)-> completed/canceled/error/warn
 */
export abstract class EndCauseListener extends SampleListener {
    public taskBegin(task: DownloadTask): void {
        this.started(task);
    }
    public taskCompleted(task: DownloadTask, cause: EndCause, realCause: Error): void {
        switch (cause) {
            case EndCause.COMPLETED:
                this.completed(task);
                break;
            case EndCause.CANCELED:
                this.canceled(task);
                break;
            case EndCause.ERROR:
            case EndCause.PRE_ALLOCATE_FAILED:
                this.error(task, realCause);
                break;
            case EndCause.FILE_BUSY:
            case EndCause.SAME_TASK_BUSY:
                this.warn(task);
                break;
            default:
                break;
        }
    }
    protected abstract started(task: DownloadTask): void;
    protected abstract completed(task: DownloadTask): void;
    protected abstract canceled(task: DownloadTask): void;
    protected abstract error(task: DownloadTask, e: Error): void;
    protected abstract warn(task: DownloadTask): void;
}
/**
 * @param onCanceled
 * @param onError
 * @param onCompleted
 * @param onWarn
 * Only one of these four callbacks will be active and their default value are all null.
 * @param onTerminal will be invoked after any of those four callbacks every time. If you
 * don't care onCanceled/onError/onCompleted/onWarn but you want to do something after
 * download finished, you can just provide this parameter.
 */
export function createEndCauseListener(param: {
    onStarted?: Function;
    onConnected?: Function;
    onProgress?: Function;
    onCompleted?: Function;
    onCanceled?: Function;
    onWarn?: Function;
    onRetry?: Function;
    onError?: Function;
}) {
    return new class extends EndCauseListener {
        public started(task: DownloadTask): void {
            if (param.onStarted) {
                param.onStarted(task);
            }
        }
        ;
        public completed(task: DownloadTask): void {
            if (param.onCompleted) {
                param.onCompleted(task);
            }
        }
        ;
        public canceled(task: DownloadTask): void {
            if (param.onCanceled) {
                param.onCanceled(task);
            }
        }
        ;
        public error(task: DownloadTask, e: Error): void {
            if (param.onError) {
                param.onError(task);
            }
        }
        public warn(task: DownloadTask): void {
            if (param.onWarn) {
                param.onWarn(task);
            }
        }
        ;
        public retry(task: DownloadTask, cause: ResumeFailedCause) {
            if (param.onRetry) {
                param.onRetry(task, cause);
            }
        }
        public progress(task: DownloadTask, currentOffset: number, totalLength: number) {
            if (param.onProgress) {
                param.onProgress(task, currentOffset, totalLength);
            }
        }
        public connected(task: DownloadTask, blockCount: number, totalLength: number) {
            if (param.onConnected) {
                param.onConnected(task, blockCount, totalLength);
            }
        }
    };
}
