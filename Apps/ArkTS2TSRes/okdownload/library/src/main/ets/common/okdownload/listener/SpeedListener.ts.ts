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
import { BlockInfo } from '../breakpoint/BlockInfo';
import { Listener4SpeedCallback } from './assist/Listener4SpeedAssistExtend';
import { SpeedCalculator } from '../SpeedCalculator';
export abstract class SpeedListener implements DownloadListener, Listener4SpeedCallback {
    taskSpeed: SpeedCalculator;
    blockSpeeds: Map<number, SpeedCalculator>;
    blockIncreaseBytes: Map<number, number> = new Map;
    info: BreakpointInfo;
    totalReceivedSize: number = 0;
    blockCount: number = 0;
    abstract taskStart(task: DownloadTask): void;
    public connectTrialStart(task: DownloadTask, requestHeaderFields: object): void {
    }
    public connectTrialEnd(task: DownloadTask, responseCode: number, responseHeaderFields: object): void {
    }
    public downloadFromBeginning(task: DownloadTask, info: BreakpointInfo, cause: ResumeFailedCause): void {
        this.infoReady(task, info, false);
        this.info = info;
        this.taskSpeed = new SpeedCalculator();
        this.blockSpeeds = new Map;
        this.blockCount = info.getBlockCount();
        for (let i = 0; i < this.blockCount; i++) {
            this.blockSpeeds.set(i, new SpeedCalculator());
            this.blockIncreaseBytes.set(i, 0);
        }
    }
    public downloadFromBreakpoint(task: DownloadTask, info: BreakpointInfo): void {
        this.infoReady(task, info, true);
    }
    abstract connectStart(task: DownloadTask, blockIndex: number, requestHeaderFields: object): void;
    abstract connectEnd(task: DownloadTask, blockIndex: number, responseCode: number, responseHeaderFields: object): void;
    public fetchStart(task: DownloadTask, blockIndex: number, contentLength: number): void {
    }
    public fetchProgress(task: DownloadTask, blockIndex: number, receivedSize: number, totalSize: number): void {
        let increaseBytes = receivedSize - this.blockIncreaseBytes.get(blockIndex);
        this.blockSpeeds.get(blockIndex).downloading(increaseBytes);
        this.taskSpeed.downloading(increaseBytes);
        this.progressBlock(task, blockIndex, receivedSize, totalSize, this.blockSpeeds.get(blockIndex));
        this.totalReceivedSize += increaseBytes;
        this.progress(task, this.totalReceivedSize, this.taskSpeed);
        this.blockIncreaseBytes.set(blockIndex, receivedSize);
    }
    public fetchEnd(task: DownloadTask, blockIndex: number, contentLength: number): void {
        this.blockSpeeds.get(blockIndex).endTask();
        this.blockEnd(task, blockIndex, this.info.getBlock(blockIndex), this.blockSpeeds.get(blockIndex));
    }
    public taskEnd(task: DownloadTask, cause: EndCause, error: Error): void {
        let speedCalculator: SpeedCalculator;
        if (this.taskSpeed != null) {
            speedCalculator = this.taskSpeed;
            speedCalculator.endTask();
        }
        else {
            speedCalculator = new SpeedCalculator();
        }
        for (let i = 0; i < this.blockCount; i++) {
            this.blockIncreaseBytes.set(i, 0);
        }
        this.totalReceivedSize = 0;
        this.taskCompleted(task, cause, error, speedCalculator);
    }
    abstract infoReady(task: DownloadTask, info: BreakpointInfo, fromBreakpoint: boolean): void;
    abstract progressBlock(task: DownloadTask, blockIndex: number, receivedSize: number, totalSize: number, blockSpeed: SpeedCalculator): void;
    abstract progress(task: DownloadTask, currentOffset: number, taskSpeed: SpeedCalculator): void;
    abstract blockEnd(task: DownloadTask, blockIndex: number, info: BlockInfo, blockSpeed: SpeedCalculator): void;
    abstract taskCompleted(task: DownloadTask, cause: EndCause, realCause: Error, taskSpeed: SpeedCalculator): void;
}
/**
 * A concise way to create a [DownloadListener4], only the [DownloadListener4.taskEnd] is necessary.
 */
export function createSpeedListener(param: {
    onTaskEnd: Function;
    onTaskStart?: Function;
    onConnectStart?: Function;
    onConnectEnd?: Function;
    onInfoReady?: Function;
    onProgressBlock?: Function;
    onProgressWithoutTotalLength?: Function;
    onBlockEnd?: Function;
}) {
    return new class extends SpeedListener {
        public taskStart(task: DownloadTask) {
            if (param.onTaskStart) {
                param.onTaskStart(task);
            }
        }
        public infoReady(task: DownloadTask, info: BreakpointInfo, fromBreakpoint: Boolean) {
            if (param.onInfoReady) {
                param.onInfoReady(task, info, fromBreakpoint);
            }
        }
        public progressBlock(task: DownloadTask, blockIndex: number, currentBlockOffset: number) {
            if (param.onProgressBlock) {
                param.onProgressBlock(task, blockIndex, currentBlockOffset);
            }
        }
        public progress(task: DownloadTask, currentOffset: number) {
            if (param.onProgressWithoutTotalLength) {
                param.onProgressWithoutTotalLength(task, currentOffset);
            }
        }
        public blockEnd(task: DownloadTask, blockIndex: number, info: BlockInfo) {
            if (param.onBlockEnd) {
                param.onBlockEnd(task, blockIndex, info);
            }
        }
        public taskCompleted(task: DownloadTask, cause: EndCause, realCause: Error) {
            param.onTaskEnd(task, cause, realCause);
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
