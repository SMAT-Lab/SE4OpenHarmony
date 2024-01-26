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
import { DownloadStore } from './DownloadStore';
import { KeyToIdMap } from './KeyToIdMap';
import { BreakpointInfo } from './BreakpointInfo';
import { IdentifiedTask } from '../IdentifiedTask';
import { DownloadTask } from '../DownloadTask';
import { EndCause } from '../cause/EndCause';
export class BreakpointStoreOnCache implements DownloadStore {
    private storedInfos: Map<number, BreakpointInfo>;
    private responseFilenameMap: Map<string, string>;
    private keyToIdMap: KeyToIdMap;
    private unStoredTasks: Map<number, IdentifiedTask>;
    private sortedOccupiedIds: Array<number>;
    private fileDirtyList: Array<number>;
    constructor(storedInfos: Map<number, BreakpointInfo> = new Map, fileDirtyList: Array<number> = new Array, responseFilenameMap: Map<string, string> = new Map) {
        this.storedInfos = storedInfos;
        this.fileDirtyList = fileDirtyList;
        this.responseFilenameMap = responseFilenameMap;
        this.unStoredTasks = new Map;
        this.keyToIdMap = new KeyToIdMap();
        const count: number = storedInfos.size;
        this.sortedOccupiedIds = new Array;
        for (var i = 0; i < count; i++) {
            this.sortedOccupiedIds.push(storedInfos.get(i).id);
        }
        this.sortedOccupiedIds.sort();
    }
    public get(id: number): BreakpointInfo {
        return this.storedInfos.get(id);
    }
    public createAndInsert(task: DownloadTask): BreakpointInfo {
        const id: number = task.getId();
        let newInfo: BreakpointInfo = new BreakpointInfo(id, task.getUrl(), task.getFilename());
        this.storedInfos.set(id, newInfo);
        this.unStoredTasks.delete(id);
        return newInfo;
    }
    public onTaskStart(id: number): void {
    }
    public onSyncToFilesystemSuccess(info: BreakpointInfo, increaseLength: number): void {
        const onCacheOne: BreakpointInfo = this.storedInfos.get(info.id);
        //if (info != onCacheOne) throw new IOException("Info not on store!");
        //onCacheOne.getBlock(blockIndex).increaseCurrentOffset(increaseLength);
    }
    public update(breakpointInfo: BreakpointInfo): boolean {
        const filename: string = breakpointInfo.getFilename();
        if (filename !== undefined) {
            this.responseFilenameMap.set(breakpointInfo.getUrl(), filename);
        }
        const onCacheOne: BreakpointInfo = this.storedInfos.get(breakpointInfo.id);
        if (onCacheOne !== undefined) {
            if (onCacheOne === breakpointInfo)
                return true;
            // replace
            this.storedInfos.set(breakpointInfo.id, breakpointInfo.copy());
            return true;
        }
        return false;
    }
    public onTaskEnd(id: number, cause: EndCause): void {
        if (cause === EndCause.COMPLETED) {
            this.remove(id);
        }
    }
    public getAfterCompleted(id: number): BreakpointInfo {
        return null;
    }
    public markFileDirty(id: number): boolean {
        if (!(id in this.fileDirtyList)) {
            this.fileDirtyList.push(id);
            return true;
        }
        return false;
    }
    public markFileClear(id: number): boolean {
        let length = this.fileDirtyList.splice(this.fileDirtyList.indexOf(id), 1).length;
        if (length === 0) {
            return false;
        }
        return true;
    }
    public remove(id: number): void {
        this.storedInfos.delete(id);
        if (this.unStoredTasks.get(id) === undefined)
            this.sortedOccupiedIds.splice(this.sortedOccupiedIds.indexOf(id), 1);
        this.keyToIdMap.remove(id);
    }
    public findOrCreateId(task: DownloadTask): number {
        const candidate: number = this.keyToIdMap.get(task);
        if (candidate != null)
            return candidate;
        const size: number = this.storedInfos.size;
        for (var i = 0; i < size; i++) {
            const info: BreakpointInfo = this.storedInfos.get(i);
            if (info != null && info.isSameFrom(task)) {
                return info.id;
            }
        }
        const unStoredSize: number = this.unStoredTasks.size;
        for (var i = 0; i < unStoredSize; i++) {
            const another: IdentifiedTask = this.unStoredTasks.get(i);
            if (another == null)
                continue;
            if (another.compareIgnoreId(task))
                return another.getId();
        }
        const id: number = this.allocateId();
        this.unStoredTasks.set(id, task);
        this.keyToIdMap.add(task, id);
        return id;
    }
    // info maybe turn to equal to another one after get filename from response.
    public findAnotherInfoFromCompare(task: DownloadTask, ignored: BreakpointInfo): BreakpointInfo {
        const clonedMap: Map<number, BreakpointInfo> = new Map;
        this.storedInfos.forEach((value, key) => {
            clonedMap.set(key, value);
        });
        const size: number = clonedMap.size;
        for (var i = 0; i < size; i++) {
            const info: BreakpointInfo = clonedMap.get(i);
            if (info === ignored)
                continue;
            if (info.isSameFrom(task)) {
                return info;
            }
        }
        return null;
    }
    public isOnlyMemoryCache(): boolean {
        return true;
    }
    public isFileDirty(id: number): boolean {
        return id in this.fileDirtyList;
    }
    public getResponseFilename(url: string): string {
        return this.responseFilenameMap.get(url);
    }
    private FIRST_ID: number = 1;
    allocateId(): number {
        let newId: number = 0;
        let index: number = 0;
        let preId: number = 0;
        let curId: number;
        for (var i = 0; i < this.sortedOccupiedIds.length; i++) {
            const curIdObj: number = this.sortedOccupiedIds[i];
            if (curIdObj === undefined) {
                index = i;
                newId = preId + 1;
                break;
            }
            curId = curIdObj;
            if (preId === 0) {
                if (curId !== this.FIRST_ID) {
                    newId = this.FIRST_ID;
                    index = 0;
                    break;
                }
                preId = curId;
                continue;
            }
            if (curId !== preId + 1) {
                newId = preId + 1;
                index = i;
                break;
            }
            preId = curId;
        }
        if (newId == 0) {
            if (this.sortedOccupiedIds.length === 0) {
                newId = this.FIRST_ID;
            }
            else {
                newId = this.sortedOccupiedIds[this.sortedOccupiedIds.length - 1] + 1;
                index = this.sortedOccupiedIds.length;
            }
        }
        this.sortedOccupiedIds.splice(index, 0, newId);
        return newId;
    }
}
