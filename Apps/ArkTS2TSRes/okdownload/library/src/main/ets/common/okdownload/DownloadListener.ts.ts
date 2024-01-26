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
import { ResumeFailedCause } from './cause/ResumeFailedCause';
import { EndCause } from './cause/EndCause';
import { BreakpointInfo } from './breakpoint/BreakpointInfo';
export interface DownloadListener {
    taskStart(task: DownloadTask): void;
    /**
     * On start trial connect state.
     * <p/>
     * The trial connection is used for:
     * 1. check whether the local info is valid to resume downloading
     * 2. get the instance length of this resource.
     * 3. check whether the resource support accept range.
     *
     * @param task                the host task.
     * @param requestHeaderFields the request header fields for this connection.
     */
    connectTrialStart(task: DownloadTask, requestHeaderFields: object): void;
    /**
     * On end trial connect state.
     * <p/>
     * The trial connection is used for:
     * 1. check whether the local info is valid to resume downloading
     * 2. get the instance length of this resource.
     * 3. check whether the resource support accept range.
     *
     * @param task                 the host task.
     * @param responseCode         the response code of this trial connection.
     * @param responseHeaderFields the response header fields for this trial connection.
     */
    connectTrialEnd(task: DownloadTask, responseCode: number, responseHeaderFields: object): void;
    downloadFromBeginning(task: DownloadTask, info: BreakpointInfo, cause: ResumeFailedCause): void;
    downloadFromBreakpoint(task: DownloadTask, info: BreakpointInfo): void;
    connectStart(task: DownloadTask, blockIndex: number, requestHeaderFields: object): void;
    connectEnd(task: DownloadTask, blockIndex: number, responseCode: number, responseHeaderFields: object): void;
    fetchStart(task: DownloadTask, blockIndex: number, contentLength: number): void;
    fetchProgress(task: DownloadTask, blockIndex: number, increaseBytes: number, totalSize: number): void;
    fetchEnd(task: DownloadTask, blockIndex: number, contentLength: number): void;
    taskEnd(task: DownloadTask, cause: EndCause, error: Error): void;
}
/**
 * A concise way to create a [DownloadListener], only the [DownloadListener.taskEnd] is necessary.
 */
export function createListener(param: {
    onTaskEnd: Function;
    onTaskStart?: Function;
    onConnectTrialStart?: Function;
    onConnectTrialEnd?: Function;
    onDownloadFromBeginning?: Function;
    onDownloadFromBreakpoint?: Function;
    onConnectStart?: Function;
    onConnectEnd?: Function;
    onFetchStart?: Function;
    onFetchProgress?: Function;
    onFetchEnd?: Function;
}) {
    return new class implements DownloadListener {
        public taskStart(task: DownloadTask) {
            if (param.onTaskStart) {
                param.onTaskStart(task);
            }
        }
        public connectTrialStart(task: DownloadTask, requestHeaderFields: object) {
            if (param.onConnectTrialStart) {
                param.onConnectTrialStart(task, requestHeaderFields);
            }
        }
        public connectTrialEnd(task: DownloadTask, responseCode: number, responseHeaderFields: object) {
            if (param.onConnectTrialEnd) {
                param.onConnectTrialEnd(task, responseCode, responseHeaderFields);
            }
        }
        public downloadFromBeginning(task: DownloadTask, info: BreakpointInfo, cause: ResumeFailedCause) {
            if (param.onDownloadFromBeginning) {
                param.onDownloadFromBeginning(task, info, cause);
            }
        }
        public downloadFromBreakpoint(task: DownloadTask, info: BreakpointInfo) {
            if (param.onDownloadFromBreakpoint) {
                param.onDownloadFromBreakpoint(task, info);
            }
        }
        public connectStart(task: DownloadTask, blockIndex: number, requestHeaderFields: object) {
            if (param.onConnectStart) {
                param.onConnectStart(task, blockIndex, requestHeaderFields);
            }
        }
        public connectEnd(task: DownloadTask, blockIndex: number, responseCode: number, responseHeaderFields: object) {
            if (param.onConnectEnd) {
                param.onConnectEnd(task, blockIndex, responseCode, responseHeaderFields);
            }
        }
        public fetchStart(task: DownloadTask, blockIndex: number, contentLength: number) {
            if (param.onFetchStart) {
                param.onFetchStart(task, blockIndex, contentLength);
            }
        }
        public fetchProgress(task: DownloadTask, blockIndex: number, increaseBytes: number) {
            if (param.onFetchProgress) {
                param.onFetchProgress(task, blockIndex, increaseBytes);
            }
        }
        public fetchEnd(task: DownloadTask, blockIndex: number, contentLength: number) {
            if (param.onFetchEnd) {
                param.onFetchEnd(task, blockIndex, contentLength);
            }
        }
        public taskEnd(task: DownloadTask, cause: EndCause, realCause: Error) {
            param.onTaskEnd(task, cause, realCause);
        }
    };
}
