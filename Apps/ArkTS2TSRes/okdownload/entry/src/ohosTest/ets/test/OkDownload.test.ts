let __generate__Id: number = 0;
function generateId(): string {
    return "OkDownload.test_" + ++__generate__Id;
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
import { DownloadTask, BreakpointStoreOnCache, BreakpointInfo, BlockInfo } from '@ohos/okdownload';
import { OkDownload } from "@ohos/okdownload";
const url = 'https://cdn.llscdn.com/yy/files/xs8qmxn8-lls-LLS-5.8-800-20171207-111607.apk';
const filename = 'single-test';
let okDownload: OkDownload;
let task: DownloadTask;
export default function testOkDownload() {
    describe("okDownload_test", () => {
        it('okDownload_test_001', 0, () => {
            okDownload = OkDownload.with();
            expect(okDownload != null).assertTrue();
        });
        it('okDownload_test_002', 0, () => {
            expect(okDownload.getBreakpointStore() != null).assertTrue();
        });
        it('okDownload_test_003', 0, () => {
            expect(okDownload.getCallbackDispatcher() != null).assertTrue();
        });
        it('okDownload_test_004', 0, () => {
            expect(okDownload.getConnectionFactory() != null).assertTrue();
        });
        it('okDownload_test_005', 0, () => {
            expect(okDownload.getDownloadDispatcher() != null).assertTrue();
        });
        it('okDownload_test_006', 0, () => {
            expect(okDownload.getDownloadStrategy() != null).assertTrue();
        });
        it('okDownload_test_007', 0, () => {
            console.info("okDownload.getMonitor()====" + okDownload.getMonitor());
            expect(okDownload.getMonitor()).assertUndefined();
        });
        it('createAndInsert', 0, () => {
            task = new DownloadTask.Builder(url, filename)
                .build();
            let breakpointStoreOnCache: BreakpointStoreOnCache = new BreakpointStoreOnCache();
            expect(breakpointStoreOnCache.createAndInsert(task).getUrl() == url).assertTrue();
        });
        it('get', 0, () => {
            task = new DownloadTask.Builder(url, filename)
                .build();
            let breakpointStoreOnCache: BreakpointStoreOnCache = new BreakpointStoreOnCache();
            breakpointStoreOnCache.createAndInsert(task);
            expect(breakpointStoreOnCache.get(task.getId()).getUrl() == url).assertTrue();
        });
        it('findOrCreateId', 0, () => {
            task = new DownloadTask.Builder(url, filename)
                .build();
            let breakpointStoreOnCache: BreakpointStoreOnCache = new BreakpointStoreOnCache();
            breakpointStoreOnCache.createAndInsert(task);
            expect(breakpointStoreOnCache.findOrCreateId(task) == task.getId()).assertTrue();
        });
        it('update', 0, () => {
            task = new DownloadTask.Builder(url, filename).build();
            let breakpointStoreOnCache: BreakpointStoreOnCache = new BreakpointStoreOnCache();
            breakpointStoreOnCache.createAndInsert(task);
            expect(breakpointStoreOnCache.update(breakpointStoreOnCache.get(task.getId()))).assertTrue();
        });
        it('remove', 0, () => {
            task = new DownloadTask.Builder(url, filename).build();
            let breakpointStoreOnCache: BreakpointStoreOnCache = new BreakpointStoreOnCache();
            breakpointStoreOnCache.createAndInsert(task);
            breakpointStoreOnCache.remove(task.getId());
            expect(breakpointStoreOnCache.get(task.getId()) === undefined).assertTrue();
        });
        it('getResponseFilename', 0, () => {
            task = new DownloadTask.Builder(url, filename).build();
            let breakpointStoreOnCache: BreakpointStoreOnCache = new BreakpointStoreOnCache();
            breakpointStoreOnCache.createAndInsert(task);
            breakpointStoreOnCache.update(breakpointStoreOnCache.get(task.getId()));
            expect(breakpointStoreOnCache.getResponseFilename(task.getUrl()) == filename).assertTrue();
        });
        it('isOnlyMemoryCache', 0, () => {
            let breakpointStoreOnCache: BreakpointStoreOnCache = new BreakpointStoreOnCache();
            expect(breakpointStoreOnCache.isOnlyMemoryCache()).assertTrue();
        });
        it('setChunked', 0, () => {
            task = new DownloadTask.Builder(url, filename).build();
            let breakpointStoreOnCache: BreakpointStoreOnCache = new BreakpointStoreOnCache();
            let breakPointInfo: BreakpointInfo = breakpointStoreOnCache.createAndInsert(task);
            breakPointInfo.setChunked(true);
            expect(breakPointInfo.isChunked()).assertTrue();
        });
        it('isChunked', 0, () => {
            task = new DownloadTask.Builder(url, filename).build();
            let breakpointStoreOnCache: BreakpointStoreOnCache = new BreakpointStoreOnCache();
            let breakPointInfo: BreakpointInfo = breakpointStoreOnCache.createAndInsert(task);
            breakPointInfo.setChunked(true);
            expect(breakPointInfo.isChunked()).assertTrue();
        });
        it('addBlock', 0, () => {
            let blockInfo: BlockInfo = new BlockInfo(1, 10, 5);
            task = new DownloadTask.Builder(url, filename).build();
            let breakpointStoreOnCache: BreakpointStoreOnCache = new BreakpointStoreOnCache();
            let breakPointInfo: BreakpointInfo = breakpointStoreOnCache.createAndInsert(task);
            breakPointInfo.addBlock(blockInfo);
            expect(breakPointInfo.isSingleBlock()).assertTrue();
        });
        it('isLastBlock', 0, () => {
            let blockInfo: BlockInfo = new BlockInfo(1, 10, 5);
            task = new DownloadTask.Builder(url, filename).build();
            let breakpointStoreOnCache: BreakpointStoreOnCache = new BreakpointStoreOnCache();
            let breakPointInfo: BreakpointInfo = breakpointStoreOnCache.createAndInsert(task);
            breakPointInfo.addBlock(blockInfo);
            expect(breakPointInfo.isLastBlock(0)).assertTrue();
        });
        it('isSingleBlock', 0, () => {
            let blockInfo: BlockInfo = new BlockInfo(1, 10, 5);
            task = new DownloadTask.Builder(url, filename).build();
            let breakpointStoreOnCache: BreakpointStoreOnCache = new BreakpointStoreOnCache();
            let breakPointInfo: BreakpointInfo = breakpointStoreOnCache.createAndInsert(task);
            breakPointInfo.addBlock(blockInfo);
            expect(breakPointInfo.isSingleBlock()).assertTrue();
        });
        it('getBlock', 0, () => {
            let blockInfo: BlockInfo = new BlockInfo(1, 10, 5);
            task = new DownloadTask.Builder(url, filename).build();
            let breakpointStoreOnCache: BreakpointStoreOnCache = new BreakpointStoreOnCache();
            let breakPointInfo: BreakpointInfo = breakpointStoreOnCache.createAndInsert(task);
            breakPointInfo.addBlock(blockInfo);
            expect(breakPointInfo.getBlock(0).getStartOffset() == 1 && breakPointInfo.getBlock(0).getCurrentOffset() == 5).assertTrue();
        });
        it('resetInfo', 0, () => {
            let blockInfo: BlockInfo = new BlockInfo(1, 10, 5);
            task = new DownloadTask.Builder(url, filename).build();
            let breakpointStoreOnCache: BreakpointStoreOnCache = new BreakpointStoreOnCache();
            let breakPointInfo: BreakpointInfo = breakpointStoreOnCache.createAndInsert(task);
            breakPointInfo.addBlock(blockInfo);
            breakPointInfo.resetInfo();
            expect(breakPointInfo.getBlock(0) === undefined).assertTrue();
        });
        it('getBlockCount', 0, () => {
            let blockInfo: BlockInfo = new BlockInfo(1, 10, 5);
            task = new DownloadTask.Builder(url, filename).build();
            let breakpointStoreOnCache: BreakpointStoreOnCache = new BreakpointStoreOnCache();
            let breakPointInfo: BreakpointInfo = breakpointStoreOnCache.createAndInsert(task);
            breakPointInfo.addBlock(blockInfo);
            expect(breakPointInfo.getBlockCount() == 1).assertTrue();
        });
        it('resetBlockInfos', 0, () => {
            let blockInfo: BlockInfo = new BlockInfo(1, 10, 5);
            task = new DownloadTask.Builder(url, filename).build();
            let breakpointStoreOnCache: BreakpointStoreOnCache = new BreakpointStoreOnCache();
            let breakPointInfo: BreakpointInfo = breakpointStoreOnCache.createAndInsert(task);
            breakPointInfo.addBlock(blockInfo);
            breakPointInfo.resetBlockInfos();
            expect(breakPointInfo.getBlockCount() == 0).assertTrue();
        });
        it('setEtag', 0, () => {
            let testStr: string = "TEST";
            task = new DownloadTask.Builder(url, filename).build();
            let breakpointStoreOnCache: BreakpointStoreOnCache = new BreakpointStoreOnCache();
            let breakPointInfo: BreakpointInfo = breakpointStoreOnCache.createAndInsert(task);
            breakPointInfo.setEtag(testStr);
            expect(breakPointInfo.getEtag() == testStr).assertTrue();
        });
        it('getEtag', 0, () => {
            let testStr: string = "TEST";
            task = new DownloadTask.Builder(url, filename).build();
            let breakpointStoreOnCache: BreakpointStoreOnCache = new BreakpointStoreOnCache();
            let breakPointInfo: BreakpointInfo = breakpointStoreOnCache.createAndInsert(task);
            breakPointInfo.setEtag(testStr);
            expect(breakPointInfo.getEtag() == testStr).assertTrue();
        });
        it('getTotalOffset', 0, () => {
            let blockInfo: BlockInfo = new BlockInfo(1, 10, 5);
            task = new DownloadTask.Builder(url, filename).build();
            let breakpointStoreOnCache: BreakpointStoreOnCache = new BreakpointStoreOnCache();
            let breakPointInfo: BreakpointInfo = breakpointStoreOnCache.createAndInsert(task);
            breakPointInfo.addBlock(blockInfo);
            expect(breakPointInfo.getTotalOffset() > 0).assertTrue();
        });
        it('getTotalLength', 0, () => {
            let blockInfo: BlockInfo = new BlockInfo(1, 10, 5);
            task = new DownloadTask.Builder(url, filename).build();
            let breakpointStoreOnCache: BreakpointStoreOnCache = new BreakpointStoreOnCache();
            let breakPointInfo: BreakpointInfo = breakpointStoreOnCache.createAndInsert(task);
            breakPointInfo.addBlock(blockInfo);
            expect(breakPointInfo.getTotalLength() > 0).assertTrue();
        });
        it('copy', 0, () => {
            let blockInfo: BlockInfo = new BlockInfo(1, 10, 5);
            task = new DownloadTask.Builder(url, filename).build();
            let breakpointStoreOnCache: BreakpointStoreOnCache = new BreakpointStoreOnCache();
            let breakPointInfo: BreakpointInfo = breakpointStoreOnCache.createAndInsert(task);
            breakPointInfo.addBlock(blockInfo);
            let breakPointInfoCopy: BreakpointInfo = breakPointInfo.copy();
            expect(breakPointInfoCopy.getId() == breakPointInfo.getId()).assertTrue();
        });
    });
}
