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
import { BreakpointInfo } from './BreakpointInfo';
import { DownloadTask } from '../DownloadTask';
export interface BreakpointStore {
    get(id: number): BreakpointInfo;
    createAndInsert(task: DownloadTask): BreakpointInfo;
    findOrCreateId(task: DownloadTask): number;
    update(breakpointInfo: BreakpointInfo): boolean;
    remove(id: number): void;
    getResponseFilename(url: string): string;
    findAnotherInfoFromCompare(task: DownloadTask, ignored: BreakpointInfo): BreakpointInfo;
    /**
     * Whether only store breakpoint on memory cache.
     *
     * @return {@code true} if breakpoint on this store is only store on the memory cache.
     */
    isOnlyMemoryCache(): boolean;
    /**
     * Whether the file relate to the task id {@code id} is dirty, which means the file isn't
     * complete download yet.
     *
     * @param id the task id.
     * @return {@code true} the file relate to {@code id} is dirty
     */
    isFileDirty(id: number): boolean;
}
