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
import fileio from '@ohos.fileio';
import { DownloadConnection } from './connection/DownloadConnection';
import { DownloadTask } from './DownloadTask';
import { BreakpointInfo } from './breakpoint/BreakpointInfo';
import { OkDownload } from './OkDownload';
import { BlockInfo } from './breakpoint/BlockInfo';
import { GlobalContext } from "../GlobalContext";
export class Util {
    public static isEmpty(str: string): boolean {
        return str === undefined || str === null || str.length === 0;
    }
    public static isCorrectFull(fetchedLength: number, contentLength: number): boolean {
        return fetchedLength == contentLength;
    }
    public static resetBlockIfDirty(info: BlockInfo): void {
        let isDirty: boolean = false;
        if (info.getCurrentOffset() < 0) {
            isDirty = true;
        }
        else if (info.getCurrentOffset() > info.getContentLength()) {
            isDirty = true;
        }
        if (isDirty) {
            //w("resetBlockIfDirty", "block is dirty so have to reset: " + info);
            info.resetBlock();
        }
    }
    /**
     * @param si whether using SI unit refer to International System of Units.
     */
    public static humanReadableBytes(bytes: number, si: boolean): string {
        let unit: number = si ? 1000 : 1024;
        if (bytes < unit)
            return bytes + " B";
        let exp: number = Math.floor(Math.log(bytes) / Math.log(unit));
        let pre: string = (si ? "kMGTPE" : "KMGTPE").charAt(exp - 1) + (si ? "" : "i");
        let size = (bytes / Math.pow(unit, exp)).toFixed(1);
        //console.info("okdownload bytes = " + bytes + "; exp = " + exp + "; pre = " + pre + "; size = " + size);
        return size + pre + "B";
    }
    public static assembleBlock(task: DownloadTask, info: BreakpointInfo, instanceLength: number, isAcceptRange: boolean): void {
        let blockCount: number = 1;
        //    if (OkDownload.with().getDownloadStrategy().isUseMultiBlock(isAcceptRange)) {
        //      blockCount = OkDownload.with().getDownloadStrategy()
        //        .determineBlockCount(task, instanceLength);
        //    } else {
        //      blockCount = 1;
        //    }
        info.resetBlockInfos();
        const eachLength: number = Math.floor(instanceLength / blockCount);
        let startOffset: number = 0;
        let contentLength: number = 0;
        for (var i = 0; i < blockCount; i++) {
            startOffset = startOffset + contentLength;
            if (i == 0) {
                // first block
                const remainLength: number = instanceLength % blockCount;
                contentLength = eachLength + remainLength;
            }
            else {
                contentLength = eachLength;
            }
            Log.showDebug(TAG, "startOffset = " + startOffset + "; contentLength = " + contentLength);
            const blockInfo: BlockInfo = new BlockInfo(startOffset, contentLength);
            info.addBlock(blockInfo);
        }
    }
    public static inspectUserHeader(headerField: object): void {
        //        if (headerField.containsKey(IF_MATCH) || headerField.containsKey(RANGE)) {
        //            throw new IOException(IF_MATCH + " and " + RANGE + " only can be handle by internal!");
        //        }
    }
    public static addUserRequestHeaderField(userHeaderField: object, connection: DownloadConnection.Connection): void {
        this.inspectUserHeader(userHeaderField);
        this.addRequestHeaderFields(userHeaderField, connection);
    }
    public static addRequestHeaderFields(headerFields: object, connection: DownloadConnection.Connection): void {
        let keys: string[] = Object.keys(headerFields);
        for (let key of keys) {
            connection.addHeader(key, headerFields[key]);
        }
    }
    public static parseContentLength(contentLength: string): number {
        if (contentLength === undefined)
            return CHUNKED_CONTENT_LENGTH;
        return Number.parseInt(contentLength);
    }
    public static exists(filename: string): boolean {
        var parentPath: string = GlobalContext.getContext().getValue("path").toString();
        try {
            fileio.accessSync(parentPath + filename);
            Log.showDebug(TAG, "file exits");
        }
        catch (e) {
            Log.showDebug(TAG, "file not exits");
            return false;
        }
        return true;
    }
}
const TAG = 'okDownload';
/**
 * Basic log class
 */
export class Log {
    /**
       * print info level log
       *
       * @param {string} tag - Page or class tag
       * @param {string} log - Log needs to be printed
       */
    static showInfo(tag, log) {
        console.info(`${TAG} tag: ${tag} --> ${log}`);
    }
    /**
       * print debug level log
       *
       * @param {string} tag - Page or class tag
       * @param {string} log - Log needs to be printed
       */
    static showDebug(tag, log) {
        console.debug(`${TAG} tag: ${tag} --> ${log}`);
    }
    /**
       * print error level log
       *
       * @param {string} tag - Page or class tag
       * @param {string} log - Log needs to be printed
       */
    static showError(tag, log) {
        console.error(`${TAG} tag: ${tag} --> ${log}`);
    }
}
export const RANGE: string = "Range";
export const IF_MATCH: string = "If-Match";
// response header fields.
export const CONTENT_LENGTH: string = "content-length";
export const CONTENT_RANGE: string = "content-range";
export const ETAG: string = "etag";
export const TRANSFER_ENCODING: string = "transfer-encoding";
export const ACCEPT_RANGES: string = "accept-ranges";
export const CONTENT_DISPOSITION: string = "content-disposition";
// response header value.
export const VALUE_CHUNKED: string = "chunked";
export const CHUNKED_CONTENT_LENGTH: number = -1;
// response special code.
export const RANGE_NOT_SATISFIABLE: number = 416;
