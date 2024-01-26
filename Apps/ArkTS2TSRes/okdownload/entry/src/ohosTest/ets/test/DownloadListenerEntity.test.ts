let __generate__Id: number = 0;
function generateId(): string {
    return "DownloadListenerEntity.test_" + ++__generate__Id;
}
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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from "@ohos/hypium";
import { DownloadTask, DownloadListenerWithSpeed, SpeedCalculator, BlockInfo, EndCause, BreakpointInfo } from '@ohos/okdownload';
export class DownloadListenerEntity extends DownloadListenerWithSpeed {
    private that: any;
    constructor() {
        super();
    }
    taskStart(task: DownloadTask): void {
        console.info("==== sample taskStart =======");
    }
    ;
    connectStart(task: DownloadTask, blockIndex: number, requestHeaderFields: object): void {
    }
    ;
    connectEnd(task: DownloadTask, blockIndex: number, responseCode: number, responseHeaderFields: object): void {
        console.info("===== sample connectEnd =======" + JSON.stringify(responseHeaderFields));
    }
    ;
    public infoReady(task: DownloadTask, info: BreakpointInfo, fromBreakpoint: boolean): void {
        console.error("==== sample infoReady =======" + info.getTotalLength());
    }
    ;
    public progressBlock(task: DownloadTask, blockIndex: number, receivedSize: number, totalSize: number, blockSpeed: SpeedCalculator): void {
        console.info("===== sample progressBlock =======");
    }
    ;
    public progress(task: DownloadTask, receivedSize: number, taskSpeed: SpeedCalculator): void {
        console.error("==== sample progress =======" + receivedSize);
    }
    ;
    public blockEnd(task: DownloadTask, blockIndex: number, info: BlockInfo, blockSpeed: SpeedCalculator): void {
        console.info("==== sample blockEnd =======");
    }
    ;
    public taskCompleted(task: DownloadTask, cause: EndCause, realCause: Error, taskSpeed: SpeedCalculator): void {
    }
    ;
}
