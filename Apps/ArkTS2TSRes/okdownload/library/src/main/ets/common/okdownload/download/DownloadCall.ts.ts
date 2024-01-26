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
import commonEvent from '@ohos.commonEvent';
import { BreakpointInfo } from '../breakpoint/BreakpointInfo';
import { BlockInfo } from '../breakpoint/BlockInfo';
import { DownloadChain } from './DownloadChain';
import { DownloadTask } from '../DownloadTask';
import { DownloadStore } from '../breakpoint/DownloadStore';
import { DownloadCache } from './DownloadCache';
import { OkDownload } from '../OkDownload';
import { EndCause } from '../cause/EndCause';
import { ResumeFailedCause } from '../cause/ResumeFailedCause';
import { BreakpointRemoteCheck } from './BreakpointRemoteCheck';
import { Util, Log } from '../Util';
const TAG = 'DownloadCall';
export class DownloadCall {
    readonly MAX_COUNT_RETRY_FOR_PRECONDITION_FAILED: number = 1;
    public task: DownloadTask;
    public asyncExecuted: boolean;
    blockChainList: Array<DownloadChain>;
    cache: DownloadCache;
    canceled: boolean = false;
    finishing: boolean;
    private store: DownloadStore;
    constructor(task: DownloadTask, asyncExecuted: boolean, store: DownloadStore, runningBlockList: Array<DownloadChain> = new Array) {
        this.task = task;
        this.asyncExecuted = asyncExecuted;
        this.blockChainList = runningBlockList;
        this.store = store;
    }
    public static create(task: DownloadTask, asyncExecuted: boolean, store: DownloadStore): DownloadCall {
        return new DownloadCall(task, asyncExecuted, store);
    }
    public cancel(): boolean {
        Log.showInfo(TAG, "===== download call cancel =====" + this.canceled + '; finish = ' + this.finishing);
        if (this.canceled)
            return false;
        //if (this.finishing) return false;
        this.canceled = true;
        const startCancelTime: number = new Date().getTime();
        //OkDownload.with().getDownloadDispatcher().flyingCanceled(this);
        const cache: DownloadCache = this.cache;
        if (cache != null)
            cache.setUserCanceled();
        // ArrayList#clone is not a thread safe operation,
        // so chains#size may > chains#elementData.length and this will cause
        // ConcurrentModificationException during iterate the ArrayList(ArrayList#next).
        // This is a reproduce example:
        // https://repl.it/talk/share/ConcurrentModificationException/18566.
        // So don't use clone anymore.
        if (this.blockChainList == null || this.blockChainList.length == 0) {
            Log.showError(TAG, "interrupt thread with cancel operation because of chains are not running");
        }
        else {
            for (let chain of this.blockChainList) {
                if (chain instanceof DownloadChain) {
                    chain.cancel();
                }
            }
        }
        console.error("cancel task " + this.task.getId() + " consume: " + (new Date().getTime() - startCancelTime) + "ms");
        return true;
    }
    public isCanceled(): boolean {
        return this.canceled;
    }
    public isFinishing(): boolean {
        return this.finishing;
    }
    public async execute() {
        let retry: boolean;
        let retryCount: number = 0;
        // inspect task start
        this.inspectTaskStart();
        do {
            // 0. check basic param before start
            if (this.task.getUrl().length <= 0) {
                break;
            }
            if (this.canceled)
                break;
            // 1. create basic info if not exist
            var info: BreakpointInfo;
            try {
                let infoOnStore: BreakpointInfo = this.store.get(this.task.getId());
                if (infoOnStore === undefined) {
                    info = this.store.createAndInsert(this.task);
                }
                else {
                    info = infoOnStore;
                }
                //this.setInfoToTask(info);
            }
            catch (error) {
                //this.cache = new DownloadCache.PreError(e);
                break;
            }
            if (this.canceled)
                break;
            // ready cache.
            const cache: DownloadCache = this.createCache();
            this.cache = cache;
            // 2. remote check.
            const remoteCheck: BreakpointRemoteCheck = this.createRemoteCheck(info);
            try {
                await remoteCheck.check();
            }
            catch (e) {
                Log.showError(TAG, "=== check error = " + JSON.stringify(e));
                cache.catchException(e);
                commonEvent.publish("completed", (err, value) => {
                    if (err.code != 0) {
                        Log.showError(TAG, 'publish event err = : ' + JSON.stringify(err));
                    }
                    else {
                        Log.showInfo(TAG, 'publish error event success. ' + JSON.stringify(value));
                    }
                });
                OkDownload.with().getCallbackDispatcher().dispatch().taskEnd(this.task, EndCause.ERROR, e);
                this.completeOrCanceled();
                this.finished();
                break;
            }
            this.assembleBlockAndCallbackFromBeginning(info, remoteCheck, remoteCheck.getCauseOrThrow());
            // 7. start with cache and info.
            await this.start(cache, info);
            if (this.canceled)
                break;
            // 8. retry if precondition failed.
            if (cache.isPreconditionFailed()
                && retryCount++ < this.MAX_COUNT_RETRY_FOR_PRECONDITION_FAILED) {
                this.store.remove(this.task.getId());
                retry = true;
            }
            else {
                retry = false;
            }
        } while (retry);
    }
    private completeOrCanceled() {
        // finish
        this.finishing = true;
        //blockChainList.clear();
        let cache: DownloadCache = this.cache;
        if (this.canceled || cache === undefined)
            return;
        let cause: EndCause;
        let realCause: Error = null;
        if (cache.isServerCanceled() || cache.isUnknownError()
            || cache.isPreconditionFailed()) {
            // error
            cause = EndCause.ERROR;
            realCause = cache.getRealCause();
        }
        else if (cache.isFileBusyAfterRun()) {
            cause = EndCause.FILE_BUSY;
        }
        else if (cache.isPreAllocateFailed()) {
            cause = EndCause.PRE_ALLOCATE_FAILED;
            realCause = cache.getRealCause();
        }
        else {
            cause = EndCause.COMPLETED;
        }
        this.inspectTaskEnd(cache, cause, realCause);
    }
    private inspectTaskStart(): void {
        this.store.onTaskStart(this.task.getId());
        OkDownload.with().getCallbackDispatcher().dispatch().taskStart(this.task);
    }
    private inspectTaskEnd(cache: DownloadCache, cause: EndCause, realCause: Error): void {
        // non-cancel handled on here
        if (cause === EndCause.CANCELED) {
            throw new Error("can't recognize cancelled on here");
        }
        if (this.canceled)
            return;
        Log.showError(TAG, "====== inspectTaskEnd change finishing true ======");
        this.finishing = true;
        this.store.onTaskEnd(this.task.getId(), cause, realCause);
        if (cause === EndCause.COMPLETED) {
            this.store.markFileClear(this.task.getId());
        }
        OkDownload.with().getCallbackDispatcher().dispatch().taskEnd(this.task, cause, realCause);
    }
    createCache(): DownloadCache {
        //        final MultiPointOutputStream outputStream = OkDownload.with().processFileStrategy()
        //                .createProcessStream(task, info, store);
        return new DownloadCache();
    }
    // this method is convenient for unit-test.
    //    getPriority(): number {
    //        return this.task.getPriority();
    //    }
    async start(cache: DownloadCache, info: BreakpointInfo): Promise<void> {
        Log.showInfo(TAG, "==== DownloadCall start ====");
        const blockCount: number = info.getBlockCount();
        const blockChainList: Array<DownloadChain> = new Array;
        const blockIndexList: Array<number> = new Array;
        for (let i = 0; i < blockCount; i++) {
            const blockInfo: BlockInfo = info.getBlock(i);
            if (Util.isCorrectFull(blockInfo.getCurrentOffset(), blockInfo.getContentLength())) {
                continue;
            }
            Util.resetBlockIfDirty(blockInfo);
            const chain: DownloadChain = DownloadChain.createChain(i, this.task, info, cache, this.store, this);
            blockChainList.push(chain);
            blockIndexList.push(chain.getBlockIndex());
        }
        if (this.canceled) {
            return;
        }
        try {
            await this.startBlocks(blockChainList);
        }
        finally {
            //this.finished();
        }
    }
    public finished() {
        OkDownload.with().getDownloadDispatcher().finish(this);
        Log.showInfo(TAG, "task call is finished " + this.task.getId());
    }
    async startBlocks(tasks: Array<DownloadChain>) {
        this.blockChainList.push.apply(this.blockChainList, tasks);
        for (let chain of tasks) {
            //this.blockChainList.push(chain)
            await chain.run();
        }
    }
    assembleBlockAndCallbackFromBeginning(info: BreakpointInfo, remoteCheck: BreakpointRemoteCheck, failedCause: ResumeFailedCause): void {
        Util.assembleBlock(this.task, info, remoteCheck.getInstanceLength(), remoteCheck.isAcceptRange());
        OkDownload.with().getCallbackDispatcher().dispatch()
            .downloadFromBeginning(this.task, info, failedCause);
    }
    // convenient for unit-test
    createRemoteCheck(info: BreakpointInfo): BreakpointRemoteCheck {
        return new BreakpointRemoteCheck(this.task, info);
    }
    public equalsTask(task: DownloadTask): boolean {
        return this.task.equals(task);
    }
    public getFileName(): string {
        return this.task.getFilename();
    }
}
