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
import { BreakpointSQLiteHelper } from './BreakpointSQLiteHelper';
import { BreakpointStoreOnCache } from '../okdownload/breakpoint/BreakpointStoreOnCache';
import { DownloadStore } from '../okdownload/breakpoint/DownloadStore';
import { BreakpointInfo } from '../okdownload/breakpoint/BreakpointInfo';
import { DownloadTask } from '../okdownload/DownloadTask';
import { EndCause } from '../okdownload/cause/EndCause';
export class BreakpointStoreOnSQLite implements DownloadStore {
    protected helper: BreakpointSQLiteHelper;
    protected onCache: BreakpointStoreOnCache;
    constructor(helper: BreakpointSQLiteHelper = new BreakpointSQLiteHelper, onCache: BreakpointStoreOnCache = new BreakpointStoreOnCache(helper.loadToCache(), helper.loadDirtyFileList(), helper.loadResponseFilenameToMap())) {
        this.helper = helper;
        this.onCache = onCache;
    }
    public get(id: number): BreakpointInfo {
        return this.onCache.get(id);
    }
    public createAndInsert(task: DownloadTask): BreakpointInfo {
        const info: BreakpointInfo = this.onCache.createAndInsert(task);
        this.helper.insert(info);
        return info;
    }
    public onTaskStart(id: number): void {
        this.onCache.onTaskStart(id);
    }
    public onSyncToFilesystemSuccess(info: BreakpointInfo, increaseLength: number): void {
        this.onCache.onSyncToFilesystemSuccess(info, increaseLength);
        //        final long newCurrentOffset = info.getBlock(blockIndex).getCurrentOffset();
        //        helper.updateBlockIncrease(info, blockIndex, newCurrentOffset);
    }
    public update(breakpointInfo: BreakpointInfo): boolean {
        const result: boolean = this.onCache.update(breakpointInfo);
        this.helper.updateInfo(breakpointInfo);
        const filename: string = breakpointInfo.getFilename();
        //Util.d(TAG, "update " + breakpointInfo);
        if (filename !== undefined) {
            this.helper.updateFilename(breakpointInfo.getUrl(), filename);
        }
        return result;
    }
    public onTaskEnd(id: number, cause: EndCause): void {
        this.onCache.onTaskEnd(id, cause);
        if (cause === EndCause.COMPLETED) {
            this.helper.removeInfo(id);
        }
    }
    public getAfterCompleted(id: number): BreakpointInfo {
        return null;
    }
    public markFileDirty(id: number): boolean {
        if (this.onCache.markFileDirty(id)) {
            this.helper.markFileDirty(id);
            return true;
        }
        return false;
    }
    public markFileClear(id: number): boolean {
        if (this.onCache.markFileClear(id)) {
            this.helper.markFileClear(id);
            return true;
        }
        return false;
    }
    public remove(id: number): void {
        this.onCache.remove(id);
        this.helper.removeInfo(id);
    }
    public findOrCreateId(task: DownloadTask): number {
        return this.onCache.findOrCreateId(task);
    }
    public findAnotherInfoFromCompare(task: DownloadTask, ignored: BreakpointInfo): BreakpointInfo {
        return this.onCache.findAnotherInfoFromCompare(task, ignored);
    }
    public isOnlyMemoryCache(): boolean {
        return false;
    }
    public isFileDirty(id: number): boolean {
        return this.onCache.isFileDirty(id);
    }
    public getResponseFilename(url: string): string {
        return this.onCache.getResponseFilename(url);
    }
}
