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
import { BreakpointInfo } from '../breakpoint/BreakpointInfo';
import { DownloadListener } from '../DownloadListener';
import { DownloadTask } from '../DownloadTask';
import { DownloadConnection } from '../connection/DownloadConnection';
import { OkDownload } from '../OkDownload';
import { Util, Log, RANGE, IF_MATCH, ACCEPT_RANGES, CONTENT_RANGE, TRANSFER_ENCODING, CHUNKED_CONTENT_LENGTH, VALUE_CHUNKED, ETAG, CONTENT_LENGTH } from '../Util';
const TAG = "ConnectTrial";
export class ConnectTrial {
    private task: DownloadTask;
    private info: BreakpointInfo;
    private acceptRange: boolean;
    private instanceLength: number;
    private responseEtag: string;
    private responseFilename: string;
    private responseCode: number;
    public constructor(task: DownloadTask, info: BreakpointInfo) {
        this.task = task;
        this.info = info;
    }
    public async executeTrial() {
        //OkDownload.with().downloadStrategy().inspectNetworkOnWifi(task);
        //OkDownload.with().downloadStrategy().inspectNetworkAvailable();
        let connection: DownloadConnection.Connection = OkDownload.with().getConnectionFactory().create(this.task);
        let isNeedTrialHeadMethod: boolean;
        try {
            //      if (!Util.isEmpty(this.info.getEtag())) {
            //        connection.addHeader(IF_MATCH, this.info.getEtag());
            //      }
            connection.addHeader(RANGE, "bytes=0-0");
            const userHeader: object = this.task.getHeaderMapFields();
            if (userHeader !== undefined)
                Util.addUserRequestHeaderField(userHeader, connection);
            const listener: DownloadListener = OkDownload.with().getCallbackDispatcher().dispatch();
            const requestProperties: object = connection.getRequestProperties();
            listener.connectTrialStart(this.task, requestProperties);
            let connected = await connection.httpRequest();
            this.responseCode = connected.getResponseCode();
            Log.showDebug(TAG, "ConnectTrial responseCode ========= " + this.responseCode);
            this.acceptRange = ConnectTrial.isAcceptRange(connected);
            Log.showDebug(TAG, "acceptRange = " + this.acceptRange);
            this.instanceLength = ConnectTrial.findInstanceLength(connected);
            Log.showDebug(TAG, "instanceLength = " + this.instanceLength);
            this.responseEtag = ConnectTrial.findEtag(connected);
            let responseHeader: object = connected.getResponseHeaderFields();
            listener.connectTrialEnd(this.task, this.responseCode, responseHeader);
            isNeedTrialHeadMethod = this.isNeedTrialHeadMethodForInstanceLength(this.instanceLength, connected);
        }
        finally {
            connection.release();
        }
    }
    /**
     * Get the instance length of the task.
     *
     * @return the instance length of the task.
     */
    public getInstanceLength(): number {
        return this.instanceLength;
    }
    /**
     * Check whether the task is accept range request.
     *
     * @return whether the task is accept range request.
     */
    public isAcceptRange(): boolean {
        return this.acceptRange;
    }
    /**
     * Check whether the response indicate the resource transfer encoding is chunked.
     *
     * @return {@code true} only if the response transfer encoding is chunked.
     */
    public isChunked(): boolean {
        return this.instanceLength === CHUNKED_CONTENT_LENGTH;
    }
    /**
     * Get the Etag from the response header.
     *
     * @return the Etag from the response header.
     */
    public getResponseEtag(): string {
        return this.responseEtag;
    }
    /**
     * Get the filename from the 'Content-Disposition' field on the response header.
     *
     * @return the filename from the 'Content-Disposition' field on the response header.
     */
    public getResponseFilename(): string {
        return this.responseFilename;
    }
    /**
     * Get the response code from the trial connect.
     *
     * @return the response code from the trial connect.
     */
    public getResponseCode(): number {
        return this.responseCode;
    }
    /**
     * Check whether the response Etag is the same to the local Etag if the local Etag is provided
     * on connect.
     *
     * @return whether the local Etag is overdue.
     */
    public isEtagOverdue(): boolean {
        return this.info.getEtag() != null && !(this.info.getEtag() === this.responseEtag);
    }
    private static isAcceptRange(connected: DownloadConnection.Connected): boolean {
        if (connected.getResponseCode() === 206)
            return true;
        const acceptRanges: string = connected.getResponseHeaderField(ACCEPT_RANGES);
        return "bytes" === acceptRanges;
    }
    private static findEtag(connected: DownloadConnection.Connected): string {
        return connected.getResponseHeaderField(ETAG);
    }
    isNeedTrialHeadMethodForInstanceLength(oldInstanceLength: number, connected: DownloadConnection.Connected): boolean {
        if (oldInstanceLength !== CHUNKED_CONTENT_LENGTH) {
            // the instance length already has certain value.
            return false;
        }
        const contentRange: string = connected.getResponseHeaderField(CONTENT_RANGE);
        if (contentRange !== undefined && contentRange.length > 0) {
            // because of the Content-Range can certain the result is right, so pass.
            return false;
        }
        const isChunked: boolean = ConnectTrial.parseTransferEncoding(connected.getResponseHeaderField(TRANSFER_ENCODING));
        if (isChunked) {
            // because of the Transfer-Encoding can certain the result is right, so pass.
            return false;
        }
        const contentLengthField: string = connected.getResponseHeaderField(CONTENT_LENGTH);
        if (contentLengthField === undefined || contentLengthField.length <= 0) {
            // because of the response header isn't contain the Content-Length so the HEAD method
            // request is useless, because we plan to get the right instance-length on the
            // Content-Length field through the response header of non 0-0 Range HEAD method request
            return false;
        }
        // because of the response header contain Content-Length, but because of we using Range: 0-0
        // so we the Content-Length is always 1 now, we can't use it, so we try to use HEAD method
        // request just for get the certain instance-length.
        return true;
    }
    private static findInstanceLength(connected: DownloadConnection.Connected): number {
        // Content-Range
        const instanceLength: number = this.parseContentRangeFoInstanceLength(connected.getResponseHeaderField(CONTENT_RANGE));
        if (instanceLength != CHUNKED_CONTENT_LENGTH)
            return instanceLength;
        // chunked on here
        const isChunked: boolean = this.parseTransferEncoding(connected
            .getResponseHeaderField(TRANSFER_ENCODING));
        if (!isChunked) {
            console.warn("Transfer-Encoding isn't chunked but there is no "
                + "valid instance length found either!");
        }
        return CHUNKED_CONTENT_LENGTH;
    }
    private static parseTransferEncoding(transferEncoding: string): boolean {
        return transferEncoding != undefined && transferEncoding === VALUE_CHUNKED;
    }
    private static parseContentRangeFoInstanceLength(contentRange: string): number {
        if (contentRange === undefined)
            return CHUNKED_CONTENT_LENGTH;
        const session: string[] = contentRange.split('/');
        if (session.length >= 2) {
            return Number.parseInt(session[1]);
        }
        return -1;
    }
}
