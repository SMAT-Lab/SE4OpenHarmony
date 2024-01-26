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
import { DownloadTask } from '../DownloadTask';
export class KeyToIdMap {
    private keyToIdMap: Map<string, number>;
    private idToKeyMap: Map<number, string>;
    constructor(keyToIdMap: Map<string, number> = new Map, idToKeyMap: Map<number, string> = new Map) {
        this.keyToIdMap = keyToIdMap;
        this.idToKeyMap = idToKeyMap;
    }
    public get(task: DownloadTask): number {
        const candidate: number = this.keyToIdMap.get(this.generateKey(task));
        if (candidate !== undefined)
            return candidate;
        return null;
    }
    public remove(id: number): void {
        const key: string = this.idToKeyMap.get(id);
        if (key !== undefined) {
            this.keyToIdMap.delete(key);
            this.idToKeyMap.delete(id);
        }
    }
    public add(task: DownloadTask, id: number): void {
        const key: string = this.generateKey(task);
        this.keyToIdMap.set(key, id);
        this.idToKeyMap.set(id, key);
    }
    generateKey(task: DownloadTask): string {
        return task.getUrl() + task.getFilename();
        //return task.getUrl() + task.getUri() + task.getFilename();
    }
}
