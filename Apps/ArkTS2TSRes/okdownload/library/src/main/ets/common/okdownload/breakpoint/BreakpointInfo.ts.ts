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
import { BlockInfo } from './BlockInfo';
import { DownloadTask } from '../DownloadTask';
export class BreakpointInfo {
    id: number;
    private url: string;
    private etag: string;
    private blockInfoList: Array<BlockInfo>;
    private taskOnlyProvidedParentPath: boolean;
    private chunked: boolean;
    private filename: string;
    constructor(id: number, url: string, filename: string) {
        this.id = id;
        this.url = url;
        this.filename = filename;
        this.blockInfoList = new Array;
    }
    public getId() {
        return this.id;
    }
    public setChunked(chunked: boolean) {
        this.chunked = chunked;
    }
    public addBlock(blockInfo: BlockInfo): void {
        this.blockInfoList.push(blockInfo);
    }
    public isChunked() {
        return this.chunked;
    }
    public isLastBlock(blockIndex: number): boolean {
        return blockIndex == this.blockInfoList.length - 1;
    }
    public isSingleBlock(): boolean {
        return this.blockInfoList.length == 1;
    }
    isTaskOnlyProvidedParentPath(): boolean {
        return this.taskOnlyProvidedParentPath;
    }
    public getBlock(blockIndex: number): BlockInfo {
        return this.blockInfoList[blockIndex];
    }
    public resetInfo() {
        this.blockInfoList.splice(0, this.blockInfoList.length);
        this.etag = null;
    }
    public resetBlockInfos() {
        this.blockInfoList.splice(0, this.blockInfoList.length);
    }
    public getBlockCount(): number {
        return this.blockInfoList.length;
    }
    public setEtag(etag: string) {
        this.etag = etag;
    }
    public getTotalOffset(): number {
        let offset: number = 0;
        this.blockInfoList.forEach(function (block) {
            if (block instanceof BlockInfo) {
                offset += block.getCurrentOffset();
            }
        });
        return offset;
    }
    public getTotalLength(): number {
        if (this.isChunked())
            return this.getTotalOffset();
        let length: number = 0;
        this.blockInfoList.forEach(function (block) {
            if (block instanceof BlockInfo) {
                length += block.getContentLength();
            }
        });
        return length;
    }
    public getEtag() {
        return this.etag;
    }
    public getUrl() {
        return this.url;
    }
    public getFilename() {
        return this.filename;
    }
    public copy(): BreakpointInfo {
        const info: BreakpointInfo = new BreakpointInfo(this.id, this.url, this.filename);
        info.chunked = this.chunked;
        this.blockInfoList.forEach(function (blockInfo) {
            info.blockInfoList.push(blockInfo.copy());
        });
        return info;
    }
    public reuseBlocks(info: BreakpointInfo): void {
        this.blockInfoList.splice(0, this.blockInfoList.length);
        info.blockInfoList.forEach(function (blockInfo) {
            this.blockInfoList.push(blockInfo);
        });
    }
    public copyWithReplaceId(replaceId: number): BreakpointInfo {
        const info: BreakpointInfo = new BreakpointInfo(replaceId, this.url, this.filename);
        info.chunked = this.chunked;
        this.blockInfoList.forEach(function (blockInfo) {
            info.blockInfoList.push(blockInfo.copy());
        });
        return info;
    }
    /**
     * You can use this method to replace url for using breakpoint info from another task.
     */
    public copyWithReplaceIdAndUrl(replaceId: number, newUrl: string): BreakpointInfo {
        const info: BreakpointInfo = new BreakpointInfo(replaceId, newUrl, this.filename);
        info.chunked = this.chunked;
        this.blockInfoList.forEach(function (blockInfo) {
            info.blockInfoList.push(blockInfo.copy());
        });
        return info;
    }
    public isSameFrom(task: DownloadTask): boolean {
        if (!(this.filename === task.getFilename())) {
            return false;
        }
        if (!(this.url === task.getUrl()))
            return false;
        const otherFilename: string = task.getFilename();
        if (otherFilename !== undefined && otherFilename === this.filename)
            return true;
        //        if (taskOnlyProvidedParentPath) {
        //            // filename is provided by response.
        //            if (!task.isFilenameFromResponse()) return false;
        //
        //            return otherFilename == null || otherFilename.equals(filenameHolder.get());
        //        }
        return false;
    }
}
