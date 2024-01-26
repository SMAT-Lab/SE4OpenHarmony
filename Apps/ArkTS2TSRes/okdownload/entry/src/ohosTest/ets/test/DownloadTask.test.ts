let __generate__Id: number = 0;
function generateId(): string {
    return "DownloadTask.test_" + ++__generate__Id;
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
import { BreakpointInfo, DownloadTask, EndCause, ResumeFailedCause, StatusUtil } from '@ohos/okdownload';
import { DownloadListener } from '@ohos/okdownload/Index';
import { DownloadListenerEntity } from './DownloadListenerEntity.test';
import { OkDownload } from '@ohos/okdownload';
const url = 'https://cdn.llscdn.com/yy/files/xs8qmxn8-lls-LLS-5.8-800-20171207-111607.apk';
const filename = 'single-test';
let task: DownloadTask;
let task2: DownloadTask;
export default function testDownloadTask() {
    describe("download_task_test", () => {
        it('download_task_test_001', 0, () => {
            task = new DownloadTask.Builder(url, filename)
                .setPriority(2)
                .setFilename("single-test1")
                .setWifiRequired(true)
                .setPassIfAlreadyCompleted(true)
                .setFilenameFromResponse(true)
                .setHeaderMapFields({ 'Content-Type': 'application/json' })
                .build();
            expect(task != null).assertTrue();
        });
        it('setFilenameFromResponse', 0, () => {
            let task: DownloadTask = new DownloadTask.Builder(url, filename)
                .setFilenameFromResponse(true)
                .build();
            expect(task != null).assertTrue();
        });
        it('setPriority', 0, () => {
            let task: DownloadTask = new DownloadTask.Builder(url, filename)
                .setPriority(2)
                .build();
            expect(task.getPriority() == 2).assertTrue();
        });
        it('setFilename', 0, () => {
            let task: DownloadTask = new DownloadTask.Builder(url, filename)
                .setFilename("single-test1")
                .build();
            expect(task.getFilename() == "single-test1").assertTrue();
        });
        it('setPassIfAlreadyCompleted', 0, () => {
            let task: DownloadTask = new DownloadTask.Builder(url, filename)
                .setPassIfAlreadyCompleted(true)
                .build();
            expect(task.isPassIfAlreadyCompleted()).assertTrue();
        });
        it('setWifiRequired', 0, () => {
            let task: DownloadTask = new DownloadTask.Builder(url, filename)
                .setWifiRequired(true)
                .build();
            expect(task.getIsWifiRequired()).assertTrue();
        });
        it('isFilenameFromResponse', 0, () => {
            let task: DownloadTask = new DownloadTask.Builder(url, filename)
                .setFilenameFromResponse(true)
                .build();
            expect(task.isFilenameFromResponse()).assertTrue();
        });
        it('setHeaderMapFields', 0, () => {
            let headerMapFields: any = "{'Content-Type': 'application/json'}";
            let task: DownloadTask = new DownloadTask.Builder(url, filename)
                .setHeaderMapFields(headerMapFields)
                .build();
            expect(task.getHeaderMapFields() == headerMapFields).assertTrue();
        });
        it('getHeaderMapFields', 0, () => {
            let headerMapFields: any = "{'Content-Type': 'application/json'}";
            let task: DownloadTask = new DownloadTask.Builder(url, filename)
                .setHeaderMapFields(headerMapFields)
                .build();
            expect(task.getHeaderMapFields() == headerMapFields).assertTrue();
        });
        it('getId', 0, () => {
            let headerMapFields: any = "{'Content-Type': 'application/json'}";
            let task: DownloadTask = new DownloadTask.Builder(url, filename)
                .setHeaderMapFields(headerMapFields)
                .build();
            task.cancel();
            expect(task.getId != null).assertTrue();
        });
        it('cancel_id', 0, () => {
            let taskOther: DownloadTask = new DownloadTask.Builder(url, filename).build();
            taskOther.enqueue(new DownloadListenerEntity());
            let okDownload: OkDownload = OkDownload.with();
            let result: boolean = okDownload.getDownloadDispatcher().cancel(taskOther.getId());
            expect(result).assertTrue();
        });
        it('findSameTask', 0, () => {
            let taskOther: DownloadTask = new DownloadTask.Builder(url, filename)
                .build();
            taskOther.enqueue(new DownloadListenerEntity());
            let okDownload: OkDownload = OkDownload.with();
            let result: DownloadTask = okDownload.getDownloadDispatcher().findSameTask(taskOther);
            expect(result != null).assertTrue();
        });
        it('isRunning', 0, () => {
            let taskOther: DownloadTask = new DownloadTask.Builder(url, filename)
                .build();
            taskOther.enqueue(new DownloadListenerEntity());
            let okDownload: OkDownload = OkDownload.with();
            let result: Boolean = okDownload.getDownloadDispatcher().isRunning(taskOther);
            expect(result).assertTrue();
        });
        it('isPending', 0, () => {
            let taskOther: DownloadTask = new DownloadTask.Builder(url, filename)
                .build();
            taskOther.enqueue(new DownloadListenerEntity());
            let okDownload: OkDownload = OkDownload.with();
            let result: Boolean = okDownload.getDownloadDispatcher().isPending(taskOther);
            expect(result).assertFalse();
        });
        it('isSameTaskPendingOrRunning', 0, () => {
            let taskOther: DownloadTask = new DownloadTask.Builder(url, filename)
                .build();
            taskOther.enqueue(new DownloadListenerEntity());
            let result: Boolean = StatusUtil.isSameTaskPendingOrRunning(taskOther);
            expect(result).assertTrue();
        });
        it('isCompleted', 0, () => {
            let taskOther: DownloadTask = new DownloadTask.Builder(url, filename)
                .build();
            taskOther.enqueue(new DownloadListenerEntity());
            let result: Boolean = StatusUtil.isCompleted(taskOther);
            expect(!result).assertTrue();
        });
        it('isCompletedOrUnknown', 0, () => {
            let taskOther: DownloadTask = new DownloadTask.Builder(url, filename)
                .build();
            taskOther.enqueue(new DownloadListenerEntity());
            expect(StatusUtil.isCompletedOrUnknown(taskOther).valueOf() != 2).assertTrue();
        });
        it('getCurrentInfo', 0, () => {
            let taskOther: DownloadTask = new DownloadTask.Builder(url, filename)
                .build();
            taskOther.enqueue(new DownloadListenerEntity());
            expect(StatusUtil.getCurrentInfo(taskOther).getUrl() == url).assertTrue();
        });
        it('download_task_test_002', 0, () => {
            expect(task.getPriority()).assertEqual(2);
        });
        it('download_task_test_003', 0, () => {
            expect(task.getFilename()).not().assertEqual(filename);
        });
        it('download_task_test_004', 0, () => {
            expect(task.getFilename()).assertEqual("single-test1");
        });
        it('download_task_test_005', 0, () => {
            expect(task.getUrl()).assertEqual(url);
        });
        it('download_task_test_006', 0, () => {
            expect(task.getIsWifiRequired()).assertTrue();
        });
        it('download_task_test_024', 0, () => {
            expect(task.isPassIfAlreadyCompleted()).assertTrue();
        });
        it('download_task_test_007', 0, () => {
            task.setTag("test");
            expect(task.getTag()).assertEqual("test");
        });
        it('download_task_test_008', 0, () => {
            task.removeTag();
            expect(task.getTag()).assertEqual(null);
        });
        it('download_task_test_009', 0, () => {
            task.removeTag();
            expect(task.isFilenameFromResponse()).assertTrue();
        });
        it('download_task_test_010', 0, () => {
            task.removeTag();
            expect(task.getParentPath()).assertUndefined();
        });
        it('download_task_test_011', 0, () => {
            task.replaceListener(new DownloadListenerAction());
            expect(task.getListener()).not().assertEqual(null);
        });
        it('download_task_test_012', 0, () => {
            task2 = new DownloadTask.Builder(url, filename)
                .setPriority(1)
                .setFilename("single-test11")
                .setWifiRequired(false)
                .setPassIfAlreadyCompleted(false)
                .setFilenameFromResponse(false)
                .build();
            expect(task2 != null).assertTrue();
        });
        it('download_task_test_013', 0, () => {
            expect(task2.getPriority()).assertEqual(1);
        });
        it('download_task_test_014', 0, () => {
            expect(task2.getFilename()).not().assertEqual(filename);
        });
        it('download_task_test_015', 0, () => {
            expect(task2.getFilename()).assertEqual("single-test11");
        });
        it('download_task_test_016', 0, () => {
            expect(task2.getUrl()).assertEqual(url);
        });
        it('download_task_test_017', 0, () => {
            expect(task2.getIsWifiRequired()).not().assertTrue();
        });
        it('download_task_test_018', 0, () => {
            expect(task2.isPassIfAlreadyCompleted()).not().assertTrue();
        });
        it('download_task_test_019', 0, () => {
            task2.setTag("test1");
            expect(task2.getTag()).assertEqual("test1");
        });
        it('download_task_test_020', 0, () => {
            task2.removeTag();
            expect(task2.getTag()).assertEqual(null);
        });
        it('download_task_test_021', 0, () => {
            expect(task2.isFilenameFromResponse()).not().assertTrue();
        });
        it('download_task_test_022', 0, () => {
            task2.removeTag();
            expect(task2.getParentPath()).assertUndefined();
        });
        it('download_task_test_023', 0, () => {
            task2.replaceListener(new DownloadListenerAction());
            expect(task2.getListener()).not().assertEqual(null);
        });
    });
}
class Param {
    onTaskEnd: Function = () => { };
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
}
class DownloadListenerAction implements DownloadListener {
    param: Param = new Param();
    public taskStart(task: DownloadTask) {
        if (this.param.onTaskStart) {
            this.param.onTaskStart(task);
        }
    }
    public connectTrialStart(task: DownloadTask, requestHeaderFields: object) {
        if (this.param.onConnectTrialStart) {
            this.param.onConnectTrialStart(task, requestHeaderFields);
        }
    }
    public connectTrialEnd(task: DownloadTask, responseCode: number, responseHeaderFields: object) {
        if (this.param.onConnectTrialEnd) {
            this.param.onConnectTrialEnd(task, responseCode, responseHeaderFields);
        }
    }
    public downloadFromBeginning(task: DownloadTask, info: BreakpointInfo, cause: ResumeFailedCause) {
        if (this.param.onDownloadFromBeginning) {
            this.param.onDownloadFromBeginning(task, info, cause);
        }
    }
    public downloadFromBreakpoint(task: DownloadTask, info: BreakpointInfo) {
        if (this.param.onDownloadFromBreakpoint) {
            this.param.onDownloadFromBreakpoint(task, info);
        }
    }
    public connectStart(task: DownloadTask, blockIndex: number, requestHeaderFields: object) {
        if (this.param.onConnectStart) {
            this.param.onConnectStart(task, blockIndex, requestHeaderFields);
        }
    }
    public connectEnd(task: DownloadTask, blockIndex: number, responseCode: number, responseHeaderFields: object) {
        if (this.param.onConnectEnd) {
            this.param.onConnectEnd(task, blockIndex, responseCode, responseHeaderFields);
        }
    }
    public fetchStart(task: DownloadTask, blockIndex: number, contentLength: number) {
        if (this.param.onFetchStart) {
            this.param.onFetchStart(task, blockIndex, contentLength);
        }
    }
    public fetchProgress(task: DownloadTask, blockIndex: number, increaseBytes: number) {
        if (this.param.onFetchProgress) {
            this.param.onFetchProgress(task, blockIndex, increaseBytes);
        }
    }
    public fetchEnd(task: DownloadTask, blockIndex: number, contentLength: number) {
        if (this.param.onFetchEnd) {
            this.param.onFetchEnd(task, blockIndex, contentLength);
        }
    }
    public taskEnd(task: DownloadTask, cause: EndCause, realCause: Error) {
        this.param.onTaskEnd(task, cause, realCause);
    }
}
