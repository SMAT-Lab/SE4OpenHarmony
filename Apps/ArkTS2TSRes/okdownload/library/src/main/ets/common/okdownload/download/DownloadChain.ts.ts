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
import { BreakpointInterceptor } from '../Interceptor/BreakpointInterceptor';
import { CallbackDispatcher } from '../dispatcher/CallbackDispatcher';
import { DownloadCache } from './DownloadCache';
import { DownloadConnection } from '../connection/DownloadConnection';
import { DownloadStore } from '../breakpoint/DownloadStore';
import { DownloadTask } from '../DownloadTask';
import { OkDownload } from '../OkDownload';
import { InterruptException } from '../exception/InterruptException';
import { Interceptor } from '../Interceptor/Interceptor';
import { DownloadCall } from './DownloadCall';
import { CallServerInterceptor } from '../Interceptor/connect/CallServerInterceptor';
import { HeaderInterceptor } from '../Interceptor/connect/HeaderInterceptor';
export class DownloadChain {
    private task: DownloadTask;
    private info: BreakpointInfo;
    private cache: DownloadCache;
    private blockIndex: number;
    private call: DownloadCall;
    connectInterceptorList: Array<Interceptor.Connect> = new Array;
    fetchInterceptorList: Array<Interceptor.Fetch> = new Array;
    connectIndex: number = 0;
    fetchIndex: number = 0;
    private responseContentLength: number;
    private connection: DownloadConnection.Connection;
    noCallbackIncreaseBytes: number;
    private callbackDispatcher: CallbackDispatcher;
    private store: DownloadStore;
    static createChain(blockIndex: number, task: DownloadTask, info: BreakpointInfo, cache: DownloadCache, store: DownloadStore, call: DownloadCall): DownloadChain {
        return new DownloadChain(blockIndex, task, info, cache, store, call);
    }
    private constructor(blockIndex: number, task: DownloadTask, info: BreakpointInfo, cache: DownloadCache, store: DownloadStore, call: DownloadCall) {
        this.blockIndex = blockIndex;
        this.task = task;
        this.cache = cache;
        this.info = info;
        this.store = store;
        this.call = call;
        this.callbackDispatcher = OkDownload.with().getCallbackDispatcher();
    }
    public getResponseContentLength(): number {
        return this.responseContentLength;
    }
    public setResponseContentLength(responseContentLength: number): void {
        this.responseContentLength = responseContentLength;
    }
    public cancel(): void {
        this.getConnection().pause();
    }
    public resume(): void {
        this.getConnection().resume();
    }
    public getTask(): DownloadTask {
        return this.task;
    }
    public getInfo(): BreakpointInfo {
        return this.info;
    }
    public getBlockIndex(): number {
        return this.blockIndex;
    }
    public setConnection(connection: DownloadConnection.Connection): void {
        this.connection = connection;
    }
    public getCache(): DownloadCache {
        return this.cache;
    }
    public setRedirectLocation(location: string): void {
        this.cache.setRedirectLocation(location);
    }
    public getConnection(): DownloadConnection.Connection {
        return this.connection;
    }
    public getConnectionOrCreate(): DownloadConnection.Connection {
        if (this.cache.isInterrupt()) {
            throw InterruptException.SIGNAL;
        }
        ;
        if (this.connection == null) {
            let url: string;
            const redirectLocation: string = this.cache.getRedirectLocation();
            if (redirectLocation !== undefined) {
                url = redirectLocation;
            }
            else {
                url = this.info.getUrl();
            }
            console.debug("create connection on url: " + url);
            this.connection = OkDownload.with().getConnectionFactory().create(this.task, this.call, this.blockIndex);
        }
        return this.connection;
    }
    public increaseCallbackBytes(increaseBytes: number): void {
        this.noCallbackIncreaseBytes += increaseBytes;
    }
    public flushNoCallbackIncreaseBytes(): void {
        if (this.noCallbackIncreaseBytes === 0)
            return;
        //this.callbackDispatcher.dispatch().fetchProgress(this.task, this.blockIndex, this.noCallbackIncreaseBytes);
        this.noCallbackIncreaseBytes = 0;
    }
    async start() {
        const dispatcher: CallbackDispatcher = OkDownload.with().getCallbackDispatcher();
        // connect chain
        //        final RetryInterceptor retryInterceptor = new RetryInterceptor();
        //        const breakpointInterceptor: BreakpointInterceptor = new BreakpointInterceptor();
        //        connectInterceptorList.add(retryInterceptor);
        //        this.connectInterceptorList.push(breakpointInterceptor);
        //        this.connectInterceptorList.push(new HeaderInterceptor());
        this.connectInterceptorList.push(new CallServerInterceptor());
        this.connectIndex = 0;
        const connected: DownloadConnection.Connected = await this.processConnect();
        //        if (cache.isInterrupt()) {
        //            throw InterruptException.SIGNAL;
        //        }
        //
        //        dispatcher.dispatch().fetchStart(this.task, this.blockIndex, getResponseContentLength());
        //        // fetch chain
        //        final FetchDataInterceptor fetchDataInterceptor =
        //                new FetchDataInterceptor(blockIndex, connected.getInputStream(),
        //                        getOutputStream(), task);
        //        fetchInterceptorList.add(retryInterceptor);
        //        fetchInterceptorList.add(breakpointInterceptor);
        //        fetchInterceptorList.add(fetchDataInterceptor);
        //
        //        fetchIndex = 0;
        //        final long totalFetchedBytes = processFetch();
        //        dispatcher.dispatch().fetchEnd(task, blockIndex, totalFetchedBytes);
    }
    public resetConnectForRetry(): void {
        this.connectIndex = 1;
        this.releaseConnection();
    }
    public releaseConnection(): void {
        if (this.connection !== undefined) {
            this.connection.release();
            console.debug("release connection " + this.connection + " task[" + this.task.getId() + "]");
        }
        //this.connection = null;
    }
    public async processConnect(): Promise<DownloadConnection.Connected> {
        if (this.cache.isInterrupt())
            throw InterruptException.SIGNAL;
        let connect: Interceptor.Connect = this.connectInterceptorList[this.connectIndex++];
        return connect.interceptConnect(this);
    }
    public processFetch(): number {
        if (this.cache.isInterrupt())
            throw InterruptException.SIGNAL;
        return this.fetchInterceptorList[this.fetchIndex++].interceptFetch(this);
    }
    public loopFetch(): number {
        if (this.fetchIndex === this.fetchInterceptorList.length) {
            // last one is fetch data interceptor
            this.fetchIndex--;
        }
        return this.processFetch();
    }
    finished: boolean = false;
    isFinished(): boolean {
        return this.finished;
    }
    public getDownloadStore(): DownloadStore {
        return this.store;
    }
    public async run() {
        if (this.isFinished()) {
            throw new Error("The chain has been finished!");
        }
        try {
            await this.start();
        }
        catch (ignored) {
            // interrupt.
        }
        finally {
            this.finished = true;
            this.releaseConnectionAsync();
        }
    }
    releaseConnectionAsync(): void {
        this.releaseConnection();
    }
}
