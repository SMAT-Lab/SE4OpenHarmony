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
import { BreakpointInfo } from '../okdownload/breakpoint/BreakpointInfo';
export class BreakpointInfoRow {
    private id: number;
    private url: string;
    private etag: string;
    //private final String parentPath;
    private filename: string;
    //private final boolean taskOnlyProvidedParentPath;
    private chunked: boolean;
    constructor(id: number, url: string, etag: string, filename: string, chunked: boolean) {
        this.id = id;
        this.url = url;
        this.etag = etag;
        //this.parentPath = cursor.getString(cursor.getColumnIndex(PARENT_PATH));
        this.filename = filename;
        //        this.taskOnlyProvidedParentPath = cursor.getInt(
        //                cursor.getColumnIndex(TASK_ONLY_PARENT_PATH)) == 1;
        this.chunked = chunked;
    }
    public getId(): number {
        return this.id;
    }
    public getUrl(): string {
        return this.url;
    }
    public getEtag(): string {
        return this.etag;
    }
    //    public String getParentPath() {
    //        return parentPath;
    //    }
    public getFilename(): string {
        return this.filename;
    }
    //    public boolean isTaskOnlyProvidedParentPath() {
    //        return taskOnlyProvidedParentPath;
    //    }
    public isChunked(): boolean {
        return this.chunked;
    }
    public toInfo(): BreakpointInfo {
        const info: BreakpointInfo = new BreakpointInfo(this.id, this.url, this.filename);
        info.setEtag(this.etag);
        info.setChunked(this.chunked);
        return info;
    }
}
