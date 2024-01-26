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
import request from '@ohos.request';
import http from '@ohos.net.http';
import commonEvent from '@ohos.commonEvent';
import { DownloadConnection } from '../okdownload/connection/DownloadConnection';
import { DownloadTask } from '../okdownload/DownloadTask';
import { DownloadCall } from '../okdownload/download/DownloadCall';
import { OkDownload } from '../okdownload/OkDownload';
import { Log } from '../okdownload/Util';
import { FileUtils } from '../okdownload/FileUtils';
import { EndCause } from '../okdownload/cause/EndCause';
import { DownloadContext, QueueSet } from '../okdownload/DownloadContext';
import { GlobalContext } from "../GlobalContext";
const TAG = "DownloadHttpConnection";
export namespace DownloadHttpConnection {
    export class HttpConnection implements DownloadConnection.Connection, DownloadConnection.Connected {
        public static fileMap: Map<number, Set<string>> = new Map;
        private url: string;
        private call: DownloadCall;
        private task: DownloadTask;
        private request: object = {};
        private filename: string;
        private responseCode: number;
        private responseHeader: object = {};
        private downloadTask: any;
        private blockIndex: number;
        constructor(task: DownloadTask, call: DownloadCall, blockIndex: number) {
            this.task = task;
            this.call = call;
            this.url = task.getUrl();
            this.blockIndex = blockIndex;
        }
        public addHeader(name: string, value: string) {
            this.request[name] = value;
        }
        public setFilename(filename: string) {
            this.filename = filename;
        }
        public async httpRequest(): Promise<DownloadConnection.Connected> {
            let response = await this.http();
            this.responseCode = response.responseCode;
            Object.keys(response.header).forEach((key) => {
                this.responseHeader[key.toLowerCase()] = response.header[key];
            });
            //Log.showDebug(TAG, 'DownloadHttpConnection httpRequest responseCode:' + JSON.stringify(response));
            Log.showDebug(TAG, 'DownloadHttpConnection httpRequest responseCode:' + this.responseCode);
            //Log.showDebug(TAG, 'DownloadHttpConnection httpRequest responseHeader = ' + JSON.stringify(this.responseHeader))
            return this;
        }
        public execute(): DownloadConnection.Connected {
            this.filename = this.task.getFilename();
            Log.showInfo(TAG, "http execute url = " + this.url + "; filename = " + this.filename);
            let path = GlobalContext.getContext().getValue("path").toString();
            Log.showInfo(TAG, "download path = " + path);
            if (FileUtils.getInstance().exist(path + this.filename)) {
                FileUtils.getInstance().deleteFile(path + this.filename);
            }
            request.downloadFile(GlobalContext.getContext().getContext(), {
                url: this.url,
                //header: this.request,
                filePath: path + '/' + this.filename,
            }, (err, value) => {
                this.downloadTask = value;
                this.downloadTask.on('progress', this.onProgress.bind(this));
            });
            return this;
        }
        public pause(): void {
            this.downloadTask.delete((err, result) => {
                if (err) {
                    Log.showError(TAG, 'Failed to pause the download task. Cause:' + JSON.stringify(err));
                    return;
                }
                if (result) {
                    Log.showInfo(TAG, 'Download task paused. ' + result);
                    this.call.finished();
                }
                else {
                    Log.showError(TAG, 'Failed to pause the download task. Cause:' + JSON.stringify(result));
                }
            });
        }
        public resume(): void {
            this.downloadTask.resume((err, result) => {
                if (err) {
                    Log.showError(TAG, 'Failed to resume the download task. Cause:' + err);
                    return;
                }
                if (result) {
                    Log.showInfo(TAG, 'Download task resumed. = ' + result);
                }
                else {
                    Log.showError(TAG, 'Failed to resume the download task.');
                }
            });
        }
        private onProgress(receivedSize, totalSize) {
            Log.showDebug(TAG, "id = " + this.task.getId() + "; receivedSize = " + receivedSize + "; totalSize = " + totalSize);
            OkDownload.with().getCallbackDispatcher().dispatch().fetchProgress(this.task, this.blockIndex, receivedSize, totalSize);
            if (receivedSize == totalSize) {
                Log.showInfo(TAG, "===== complete =====");
                this.call.finished();
                OkDownload.with().getCallbackDispatcher().dispatch().taskEnd(this.task, EndCause.COMPLETED, null);
                commonEvent.publish("completed", (err, value) => {
                    if (err.code != 0) {
                        Log.showError(TAG, 'publish event err = : ' + JSON.stringify(err));
                    }
                    else {
                        Log.showInfo(TAG, 'publish complete event success. ' + JSON.stringify(value));
                    }
                });
            }
        }
        private async http() {
            Log.showInfo(TAG, "http id = " + this.task.getId() + "; request =====" + JSON.stringify(this.request));
            let httpRequest = http.createHttp();
            Log.showInfo(TAG, "this.url = " + JSON.stringify(this.url));
            let promise = await httpRequest.request(this.url, {
                header: this.request,
                readTimeout: 10000,
                connectTimeout: 10000
            });
            httpRequest.destroy();
            Log.showInfo(TAG, "this.url22222 = " + JSON.stringify(this.url));
            return promise;
        }
        public release() {
        }
        getRequestProperties() {
            return this.request;
        }
        ;
        getRequestProperty(key: string) {
            return this.request[key];
        }
        ;
        getResponseCode(): number {
            return this.responseCode;
        }
        ;
        getResponseHeaderFields() {
            return this.responseHeader;
        }
        getResponseHeaderField(name: string) {
            Log.showInfo(TAG, 'responseHeader ' + name + ': ' + JSON.stringify(this.responseHeader[name]));
            let value = this.responseHeader[name];
            if (value !== undefined) {
                return value.toString();
            }
            return '';
        }
    }
    export class Factory implements DownloadConnection.Factory {
        create(task: DownloadTask, call: DownloadCall, blockIndex: number): DownloadConnection.Connection {
            return new HttpConnection(task, call, blockIndex);
        }
        ;
    }
}
