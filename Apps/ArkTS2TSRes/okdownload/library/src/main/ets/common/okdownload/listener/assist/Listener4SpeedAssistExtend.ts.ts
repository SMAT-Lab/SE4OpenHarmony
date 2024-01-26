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
import { DownloadTask } from '../../DownloadTask';
import { EndCause } from '../../cause/EndCause';
import { BreakpointInfo } from '../../breakpoint/BreakpointInfo';
import { BlockInfo } from '../../breakpoint/BlockInfo';
import { SpeedCalculator } from '../../SpeedCalculator';
export interface Listener4SpeedCallback {
    infoReady(task: DownloadTask, info: BreakpointInfo, fromBreakpoint: boolean): void;
    progressBlock(task: DownloadTask, blockIndex: number, receivedSize: number, totalSize: number, blockSpeed: SpeedCalculator): void;
    progress(task: DownloadTask, receivedSize: number, taskSpeed: SpeedCalculator): void;
    blockEnd(task: DownloadTask, blockIndex: number, info: BlockInfo, blockSpeed: SpeedCalculator): void;
    taskCompleted(task: DownloadTask, cause: EndCause, realCause: Error, taskSpeed: SpeedCalculator): void;
}
