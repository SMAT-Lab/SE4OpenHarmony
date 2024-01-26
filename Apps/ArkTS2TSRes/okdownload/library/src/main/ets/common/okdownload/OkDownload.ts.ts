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
import { DownloadDispatcher } from './dispatcher/DownloadDispatcher';
import { CallbackDispatcher } from './dispatcher/CallbackDispatcher';
import { DownloadHttpConnection } from '../http/DownloadHttpConnection';
import { DownloadConnection } from './connection/DownloadConnection';
import { DownloadStrategy } from './download/DownloadStrategy';
import { BreakpointStore } from './breakpoint/BreakpointStore';
import { DownloadStore } from './breakpoint/DownloadStore';
import { BreakpointStoreOnSQLite } from '../sqlite/BreakpointStoreOnSQLite';
import { BreakpointStoreOnCache } from './breakpoint/BreakpointStoreOnCache';
import { DownloadMonitor } from './DownloadMonitor';
export class OkDownload {
    static singleton: OkDownload;
    private callbackDispatcher: CallbackDispatcher;
    private downloadDispatcher: DownloadDispatcher;
    private connectionFactory: DownloadConnection.Factory;
    private breakpointStore: BreakpointStore;
    private downloadStrategy: DownloadStrategy;
    monitor: DownloadMonitor;
    constructor(downloadDispatcher: DownloadDispatcher, callbackDispatcher: CallbackDispatcher, connectionFactory: DownloadConnection.Factory, store: DownloadStore, downloadStrategy: DownloadStrategy) {
        this.downloadDispatcher = downloadDispatcher;
        this.callbackDispatcher = callbackDispatcher;
        this.connectionFactory = connectionFactory;
        this.breakpointStore = store;
        this.downloadStrategy = downloadStrategy;
        this.downloadDispatcher.setDownloadStore(this.breakpointStore as DownloadStore);
    }
    public getDownloadDispatcher(): DownloadDispatcher {
        return this.downloadDispatcher;
    }
    public getCallbackDispatcher(): CallbackDispatcher { return this.callbackDispatcher; }
    public getConnectionFactory(): DownloadConnection.Factory {
        return this.connectionFactory;
    }
    public getBreakpointStore(): BreakpointStore { return this.breakpointStore; }
    public getDownloadStrategy(): DownloadStrategy { return this.downloadStrategy; }
    public setMonitor(monitor: DownloadMonitor): void {
        this.monitor = monitor;
    }
    public getMonitor(): DownloadMonitor {
        return this.monitor;
    }
    public static with(): OkDownload {
        if (OkDownload.singleton === undefined) {
            OkDownload.singleton = new OkDownload.Builder().build();
        }
        return OkDownload.singleton;
    }
    public static Builder = class {
        callbackDispatcher: CallbackDispatcher;
        downloadDispatcher: DownloadDispatcher;
        connectionFactory: DownloadConnection.Factory;
        downloadStore: DownloadStore;
        downloadStrategy: DownloadStrategy;
        monitor: DownloadMonitor;
        constructor() {
        }
        public setDownloadDispatcher(downloadDispatcher: DownloadDispatcher) {
            this.downloadDispatcher = downloadDispatcher;
            return this;
        }
        public setCallbackDispatcher(callbackDispatcher: CallbackDispatcher) {
            this.callbackDispatcher = callbackDispatcher;
            return this;
        }
        public setConnectionFactory(connectionFactory: DownloadConnection.Factory) {
            this.connectionFactory = connectionFactory;
            return this;
        }
        public setDownloadStore(downloadStore: DownloadStore) {
            this.downloadStore = downloadStore;
            return this;
        }
        public setDownloadStrategy(downloadStrategy: DownloadStrategy) {
            this.downloadStrategy = downloadStrategy;
            return this;
        }
        public setMonitor(monitor: DownloadMonitor) {
            this.monitor = monitor;
            return this;
        }
        public build(): OkDownload {
            if (this.downloadDispatcher === undefined) {
                this.downloadDispatcher = new DownloadDispatcher();
            }
            if (this.callbackDispatcher === undefined) {
                this.callbackDispatcher = new CallbackDispatcher();
            }
            if (this.connectionFactory === undefined) {
                this.connectionFactory = new DownloadHttpConnection.Factory();
            }
            if (this.downloadStore === undefined) {
                this.downloadStore = new BreakpointStoreOnCache();
            }
            if (this.downloadStrategy === undefined) {
                this.downloadStrategy = new DownloadStrategy();
            }
            let okDownload: OkDownload = new OkDownload(this.downloadDispatcher, this.callbackDispatcher, this.connectionFactory, this.downloadStore, this.downloadStrategy);
            okDownload.setMonitor(this.monitor);
            return okDownload;
        }
    };
}
