let __generate__Id: number = 0;
function generateId(): string {
    return "DownloadContext.test_" + ++__generate__Id;
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
import { BreakpointInfo, DownloadTask } from '@ohos/okdownload';
import { DownloadContext, QueueSet } from '@ohos/okdownload';
import { DownloadListener } from '@ohos/okdownload';
// import {DownloadListener1} from '@ohos/okdownload'
import { EndCause } from '@ohos/okdownload';
import { ResumeFailedCause } from '@ohos/okdownload';
let downloadContext: DownloadContext;
let listener: DownloadListener;
let boundTask: DownloadTask;
let url: string;
let queueSet: QueueSet;
export default function TestDownloadContext() {
    describe("download_context_test", () => {
        it('download_context_test_001', 0, () => {
            queueSet = new QueueSet();
            queueSet.setParentPath('queue');
            queueSet.setWifiRequired(true);
            let builder = queueSet.commit();
            url = "http://dldir1.qq.com/weixin/android/weixin6516android1120.apk";
            boundTask = builder.bindUrl(url, 'weixin6516android1120.apk');
            url = "https://cdn.llscdn.com/yy/files/tkzpx40x-lls-LLS-5.7-785-20171108-111118.apk";
            boundTask = builder.bindUrl(url, 'tkzpx40x-lls-LLS-5.7-785-20171108-111118.apk');
            downloadContext = builder.build();
            expect(downloadContext != null).assertTrue();
        });
        it('isWifiRequired', 0, () => {
            let queueSetOther: QueueSet = new QueueSet();
            queueSetOther.setWifiRequired(true);
            expect(queueSetOther.isWifiRequired()).assertTrue();
        });
        it('download_context_test_002', 0, () => {
            expect(downloadContext.getTasks() != null).assertTrue();
        });
        it('startOnSerial', 0, () => {
            downloadContext.startOnSerial(new DownloadListenerSample());
            expect(downloadContext.isStarted()).assertTrue();
        });
        it('startOnParallel', 0, () => {
            downloadContext.startOnParallel(new DownloadListenerSample());
            expect(downloadContext.isStarted()).assertTrue();
        });
        it('download_context_test_003', 0, () => {
            downloadContext.start(new DownloadListenerSample(), false);
            expect(downloadContext.isStarted()).assertTrue();
        });
        it('download_context_test_004', 0, () => {
            expect(downloadContext.isStarted() != null).assertTrue();
        });
        it('download_context_test_007', 0, () => {
            expect(downloadContext.getTasks().length > 0).assertTrue();
        });
        it('download_context_test_008', 0, () => {
            expect(downloadContext.getTasks() != null).assertTrue();
        });
        it('download_task_test_009', 0, () => {
            expect(boundTask.getPriority()).assertEqual(0);
        });
        it('download_task_test_0010', 0, () => {
            expect(boundTask.getFilename()).assertEqual('tkzpx40x-lls-LLS-5.7-785-20171108-111118.apk');
        });
        it('download_task_test_011', 0, () => {
            boundTask.setFilename("single-test1");
            expect(boundTask.getFilename()).assertEqual("single-test1");
        });
        it('download_task_test_012', 0, () => {
            expect(boundTask.getFilename() != null).assertTrue();
        });
        it('download_task_test_013', 0, () => {
            expect(boundTask.getUrl()).assertEqual(url);
        });
        it('download_task_test_014', 0, () => {
            expect(boundTask.getUrl() != null).assertTrue();
        });
        it('download_task_test_0015', 0, () => {
            expect(boundTask.getIsWifiRequired()).assertTrue();
        });
        it('download_task_test_0016', 0, () => {
            expect(boundTask.getIsWifiRequired() != null).assertTrue();
        });
        it('download_task_test_0017', 0, () => {
            boundTask.setTag("test");
            expect(boundTask.getTag() != null).assertTrue();
        });
        it('download_task_test_0018', 0, () => {
            boundTask.setTag("test");
            expect(boundTask.getTag()).assertEqual("test");
        });
        it('download_task_test_019', 0, () => {
            boundTask.removeTag();
            expect(boundTask.getTag()).assertEqual(null);
        });
        it('download_task_test_020', 0, () => {
            expect(boundTask.isFilenameFromResponse()).assertUndefined();
        });
        it('download_task_test_021', 0, () => {
            console.info("boundTask.getParentPath()===" + boundTask.getParentPath());
            expect(boundTask.getParentPath()).assertEqual('queue');
        });
        it('download_task_test_022', 0, () => {
            expect(boundTask.getParentPath() != null).assertTrue();
        });
    });
}
class DownloadListenerSample implements DownloadListener {
    taskStart(task: DownloadTask): void {
    }
    ;
    connectTrialStart(task: DownloadTask, requestHeaderFields: object): void {
    }
    ;
    connectTrialEnd(task: DownloadTask, responseCode: number, responseHeaderFields: object): void {
    }
    ;
    downloadFromBeginning(task: DownloadTask, info: BreakpointInfo, cause: ResumeFailedCause): void {
    }
    ;
    downloadFromBreakpoint(task: DownloadTask, info: BreakpointInfo): void {
    }
    ;
    connectStart(task: DownloadTask, blockIndex: number, requestHeaderFields: object): void {
    }
    ;
    connectEnd(task: DownloadTask, blockIndex: number, responseCode: number, responseHeaderFields: object): void {
    }
    ;
    fetchStart(task: DownloadTask, blockIndex: number, contentLength: number): void {
    }
    ;
    fetchProgress(task: DownloadTask, blockIndex: number, receivedSize: number, totalSize: number): void {
    }
    ;
    fetchEnd(task: DownloadTask, blockIndex: number, contentLength: number): void {
    }
    ;
    taskEnd(task: DownloadTask, cause: EndCause, error: Error): void {
    }
    ;
}
