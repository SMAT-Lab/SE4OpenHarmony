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
import { SpeedListener } from './SpeedListener';
import { DownloadTask } from '../DownloadTask';
import { BreakpointInfo } from '../breakpoint/BreakpointInfo';
import { BlockInfo } from '../breakpoint/BlockInfo';
import { EndCause } from '../cause/EndCause';
import { SpeedCalculator } from '../SpeedCalculator';
export abstract class DownloadListenerWithSpeed extends SpeedListener {
    public infoReady(task: DownloadTask, info: BreakpointInfo, fromBreakpoint: boolean): void {
    }
    ;
    public progressBlock(task: DownloadTask, blockIndex: number, receivedSize: number, totalSize: number, blockSpeed: SpeedCalculator): void {
    }
    ;
    public progress(task: DownloadTask, receivedSize: number, taskSpeed: SpeedCalculator): void {
    }
    ;
    public blockEnd(task: DownloadTask, blockIndex: number, info: BlockInfo, blockSpeed: SpeedCalculator): void {
    }
    ;
    public taskCompleted(task: DownloadTask, cause: EndCause, realCause: Error, taskSpeed: SpeedCalculator): void {
    }
    ;
}
/**
 * A concise way to create a [DownloadListener4WithSpeed],
 * only the [DownloadListener4WithSpeed.taskEnd] is necessary.
 */
export function createListenerWithSpeed(param: {
    onTaskEndWithSpeed: Function;
    onTaskStart?: Function;
    onConnectStart?: Function;
    onConnectEnd?: Function;
    onInfoReadyWithSpeed?: Function;
    onProgressBlockWithSpeed?: Function;
    onProgressWithSpeed?: Function;
    onBlockEndWithSpeed?: Function;
}) {
    return new class extends DownloadListenerWithSpeed {
        public taskStart(task: DownloadTask) {
            if (param.onTaskStart) {
                param.onTaskStart(task);
            }
        }
        public infoReady(task: DownloadTask, info: BreakpointInfo, fromBreakpoint: Boolean) {
            if (param.onInfoReadyWithSpeed) {
                param.onInfoReadyWithSpeed(task, info, fromBreakpoint);
            }
        }
        public progressBlock(task: DownloadTask, blockIndex: number, receivedSize: number, totalSize: number, blockSpeed: SpeedCalculator) {
            if (param.onProgressBlockWithSpeed) {
                param.onProgressBlockWithSpeed(task, blockIndex, receivedSize, totalSize, blockSpeed);
            }
        }
        public progress(task: DownloadTask, currentOffset: number, taskSpeed: SpeedCalculator) {
            if (param.onProgressWithSpeed) {
                param.onProgressWithSpeed(task, currentOffset, taskSpeed);
            }
        }
        public blockEnd(task: DownloadTask, blockIndex: number, info: BlockInfo, blockSpeed: SpeedCalculator) {
            if (param.onBlockEndWithSpeed) {
                param.onBlockEndWithSpeed(task, blockIndex, info, blockSpeed);
            }
        }
        public taskCompleted(task: DownloadTask, cause: EndCause, realCause: Error, taskSpeed: SpeedCalculator) {
            param.onTaskEndWithSpeed(task, cause, realCause, taskSpeed);
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
    };
}
