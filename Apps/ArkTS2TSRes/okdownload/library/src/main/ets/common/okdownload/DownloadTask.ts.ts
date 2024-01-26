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
import { OkDownload } from './OkDownload';
import { IdentifiedTask, EMPTY_URL } from './IdentifiedTask';
import { DownloadListener, createListener } from '../okdownload/DownloadListener';
import { createSampleListener } from '../okdownload/listener/SampleListener';
import { createStartEndListener } from '../okdownload/listener/StartEndListener';
import { createEndCauseListener } from '../okdownload/listener/EndCauseListener';
import { createSpeedListener } from '../okdownload/listener/SpeedListener';
import { createListenerWithSpeed } from '../okdownload/listener/DownloadListenerWithSpeed';
import { Log } from './Util';
const TAG = 'DownloadTask';
export class DownloadTask extends IdentifiedTask {
    private id: number;
    private url: string;
    private priority: number = 0;
    private isWifiRequired: boolean;
    private filename: string;
    private parentPath: string;
    private headerMapFields: object;
    private listener: DownloadListener;
    private keyTagMap: Map<number, any>;
    private filenameFromResponse: boolean;
    /**
     * if this task has already completed with
     */
    private passIfAlreadyCompleted: boolean;
    private tag: Object;
    constructor(url: string, filename: string, parentPath: string, priority: number, headerMapFields: object, passIfAlreadyCompleted: boolean, isWifiRequired: boolean, isFilenameFromResponse: boolean) {
        super();
        this.url = url;
        this.priority = priority;
        this.isWifiRequired = isWifiRequired;
        this.headerMapFields = headerMapFields;
        this.filename = filename;
        this.parentPath = parentPath;
        this.passIfAlreadyCompleted = passIfAlreadyCompleted;
        this.filenameFromResponse = isFilenameFromResponse;
        this.id = OkDownload.with().getBreakpointStore().findOrCreateId(this);
        Log.showInfo(TAG, "task id = " + this.id);
    }
    /**
     * This id can be used on {@link BreakpointStore}
     */
    public getId(): number {
        return this.id;
    }
    /**
     * Get you custom request header map files for this task.
     *
     * @return you custom request header map files for this task. {@code null} if you isn't add any
     * header fields for this task.
     * @see Builder#addHeader(String, String)
     * @see Builder#setHeaderMapFields(Map)
     */
    public getHeaderMapFields(): object {
        return this.headerMapFields;
    }
    /**
     * Whether pass this task with completed callback directly if this task has already completed.
     *
     * @return {@code true} pass this task with completed callback directly if this task has already
     * completed.
     */
    public isPassIfAlreadyCompleted() {
        return this.passIfAlreadyCompleted;
    }
    /**
     * Get the filename of the file to store download data.
     *
     * @return the filename of the file to store download data. {@code null} if you not provided it
     * and okdownload isn't get response yet.
     */
    public getFilename() {
        return this.filename;
    }
    /**
     * Set the filename of the file for this task.
     * <p>
     * If you only provided the store directory path, and doesn't provide any filename, the
     * filename will get through response header, and if there isn't filename found on the
     * response header, the file name will be found through the url path.
     *
     * @param filename the filename of the file for this task.
     */
    public setFilename(fileName: string) {
        this.filename = fileName;
    }
    /**
     * Whether the filename is from response rather than provided by user directly.
     *
     * @return {@code true} is the filename will assigned from response header.
     */
    public isFilenameFromResponse() {
        return this.filenameFromResponse;
    }
    public getParentPath() {
        return this.parentPath;
    }
    /**
     * Get the url for this task.
     *
     * @return the url for this task.
     */
    public getUrl() {
        return this.url;
    }
    /**
     * Whether wifi required for proceed this task.
     *
     * @return {@code true} if this task only can download on the Wifi network type.
     */
    public getIsWifiRequired() {
        return this.isWifiRequired;
    }
    /**
     * Replace the origin listener on this task reference.
     *
     * @param listener the new listener for this task reference.
     */
    public replaceListener(listener: DownloadListener) {
        this.listener = listener;
    }
    /**
     * Get the listener of the task.
     *
     * @return the listener is used for listen the whole lifecycle of the task.
     */
    public getListener(): DownloadListener {
        return this.listener;
    }
    public setPriority(priority: number) {
        this.priority = priority;
    }
    /**
     * The priority of the task, more larger means less time waiting to download.
     *
     * @return the priority of the task.
     */
    public getPriority() {
        return this.priority;
    }
    /**
     * Get the tag with its {@code key}, which you set through {@link #addTag(int, Object)}.
     *
     * @param key the key is identify the tag.
     * @return the tag with the {@code key}.
     */
    public getTag(key?: number) {
        if (key) {
            return this.keyTagMap == null ? null : this.keyTagMap.get(key);
        }
        else {
            return this.tag;
        }
    }
    /**
     * Add the {@code tag} identify with the {@code key} you can use it through {@link #getTag(int)}
     *
     * @param key   the identify of the tag.
     * @param value the value of the tag.
     */
    public addTag(key: number, value: any) {
        if (this.keyTagMap == null) {
            this.keyTagMap = new Map;
        }
        this.keyTagMap.set(key, value);
        return this;
    }
    /**
     * Remove the tag you set through {@link #setTag(Object)}.
     */
    public removeTag(key?: number) {
        if (key) {
            if (this.keyTagMap != null)
                this.keyTagMap.delete(key);
        }
        else {
            this.tag = null;
        }
    }
    /**
     * Set tag to this task, which you can use it through {@link #getTag()}.
     *
     * @param tag the tag will be store on this task reference.
     */
    public setTag(tag: Object) {
        this.tag = tag;
    }
    /**
     * Enqueue a bunch of {@code tasks} with the listener to the downloader dispatcher.
     * <p>
     * This operation is specially optimize for handle tasks instead of single task.
     *
     * @param tasks    the tasks will be executed when resources is available on the dispatcher
     *                 thread-pool.
     * @param listener the listener is used for listen each {@code tasks} lifecycle.
     */
    public static enqueueTasks(tasks: DownloadTask[], listener: DownloadListener): void {
        for (let task of tasks) {
            task.listener = listener;
        }
        OkDownload.with().getDownloadDispatcher().enqueueTasks(tasks);
    }
    /**
     * Enqueue the task with the {@code listener} to the downloader dispatcher, what means it will
     * be run when resource is available and on the dispatcher thread pool.
     * <p>
     * If there are more than one task need to enqueue please using
     * {@link #enqueue(DownloadTask[], DownloadListener)} instead, because the performance is
     * optimized to handle bunch of tasks enqueue.
     *
     * @param listener the listener is used for listen the whole lifecycle of the task.
     */
    public enqueue(listener: DownloadListener): void {
        this.listener = listener;
        OkDownload.with().getDownloadDispatcher().enqueue(this);
    }
    /**
     * Execute the task with the {@code listener} on the invoke thread.
     *
     * @param listener the listener is used for listen the whole lifecycle of the task.
     */
    public execute(listener: DownloadListener) {
        this.listener = listener;
        OkDownload.with().getDownloadDispatcher().execute(this);
    }
    /**
     * Cancel the current task, if there is another same id task, it would be canceled too.
     * <p>
     * If the task is canceled all resourced about this task will be recycled.
     * <p>
     * If there are more than one task need to cancel, please using {@link #cancel(DownloadTask[])}
     * instead, because the performance is optimized to handle bunch of tasks cancel.
     */
    public cancel(): void {
        OkDownload.with().getDownloadDispatcher().cancelTask(this);
    }
    /**
     * Cancel a bunch of {@code tasks} or with the same ids tasks.
     * <p>
     * This operation is specially optimize for handle tasks instead of single task.
     *
     * @param tasks will be canceled with high effective.
     */
    public static cancelTasks(tasks: DownloadTask[]): void {
        OkDownload.with().getDownloadDispatcher().cancelTasks(tasks);
    }
    public equals(obj: object): boolean {
        if (obj instanceof DownloadTask) {
            const another: DownloadTask = obj;
            if (another.id == this.id)
                return true;
            return this.compareIgnoreId(another);
        }
        return false;
    }
    public toBuilder(anotherUrl?: string, anotherUri?: string) {
        const builder = new DownloadTask.Builder(anotherUrl, anotherUri)
            .setPriority(this.priority)
            .setHeaderMapFields(this.headerMapFields)
            .setPassIfAlreadyCompleted(this.passIfAlreadyCompleted);
        return builder;
    }
    public static Builder = class {
        url: string;
        headerMapFields: object;
        constructor(url: string, fileName: string, parentPath?: string) {
            this.url = url;
            this.filename = fileName;
            this.parentPath = parentPath;
        }
        priority: number = 0;
        filename: string;
        parentPath: string;
        public static readonly DEFAULT_IS_WIFI_REQUIRED: boolean = false;
        isWifiRequired: boolean = DownloadTask.Builder.DEFAULT_IS_WIFI_REQUIRED;
        isFilenameFromResponse: boolean;
        public static readonly DEFAULT_PASS_IF_ALREADY_COMPLETED: boolean = true;
        /**
         * if this task has already completed judged by
         * {@link StatusUtil.Status#isCompleted(DownloadTask)}, callback completed directly instead
         * of start download.
         */
        passIfAlreadyCompleted: boolean = DownloadTask.Builder.DEFAULT_PASS_IF_ALREADY_COMPLETED;
        /**
         * Set whether the provided Uri or path is just directory, and filename must be from
         * response header or url path.
         * <p>
         * If you provided {@link #filename} the filename will be invalid for this supposed.
         * If you provided content scheme Uri, this value is unaccepted.
         *
         * @param filenameFromResponse whether the provided Uri or path is just directory, and
         *                             filename must be from response header or url path.
         *                             if {@code null} this value will be discard.
         */
        public setFilenameFromResponse(filenameFromResponse: boolean) {
            this.isFilenameFromResponse = filenameFromResponse;
            return this;
        }
        /**
         * Set the request headers for this task.
         *
         * @param headerMapFields the header map fields.
         */
        public setHeaderMapFields(headerMapFields: object) {
            this.headerMapFields = headerMapFields;
            return this;
        }
        /**
         * Add the request header for this task.
         *
         * @param key   the key of the field.
         * @param value the value of the field.
         */
        public addHeader(key: string, value: string) {
            if (this.headerMapFields == null)
                this.headerMapFields = {};
            var valueList = this.headerMapFields[key];
            if (valueList == null) {
                valueList = new Array;
                this.headerMapFields[key] = valueList;
            }
            valueList.add(value);
        }
        /**
         * Set the priority of the task, more larger more higher, more higher means less time to
         * wait to download.
         * default is 0.
         *
         * @param priority the priority of the task.
         */
        public setPriority(priority: number) {
            this.priority = priority;
            return this;
        }
        /**
         * Set the filename of the file for this task.
         * <p>
         * If you only provided the store directory path, and doesn't provide any filename, the
         * filename will get through response header, and if there isn't filename found on the
         * response header, the file name will be found through the url path.
         *
         * @param filename the filename of the file for this task.
         */
        public setFilename(filename: string) {
            this.filename = filename;
            return this;
        }
        /**
         * Set whether the task is completed directly without any further action when check the task
         * has been downloaded.
         * default is {@link #DEFAULT_PASS_IF_ALREADY_COMPLETED}
         *
         * @param passIfAlreadyCompleted whether pass this task with completed callback directly if
         *                               this task has already completed.
         */
        public setPassIfAlreadyCompleted(passIfAlreadyCompleted: boolean) {
            this.passIfAlreadyCompleted = passIfAlreadyCompleted;
            return this;
        }
        /**
         * Set the task proceed only on the Wifi network state.
         * default is {@link #DEFAULT_IS_WIFI_REQUIRED}
         *
         * @param wifiRequired whether wifi required for proceed this task.
         */
        public setWifiRequired(wifiRequired: boolean) {
            this.isWifiRequired = wifiRequired;
            return this;
        }
        public build() {
            return new DownloadTask(this.url, this.filename, this.parentPath, this.priority, this.headerMapFields, this.passIfAlreadyCompleted, this.isWifiRequired, this.isFilenameFromResponse);
        }
    };
    /**
     * Create a Identified task only for compare with their id, and only the id is the same.
     *
     * @param id the id is set for this mock task.
     */
    public static mockTaskForCompare(id: number): MockTaskForCompare {
        return new MockTaskForCompare(id);
    }
    public mock(id: number): MockTaskForCompare {
        return new MockTaskForCompare(id, this);
    }
    /**
     * Correspond to [DownloadTask.execute].
     * This method will create a [DownloadListener] instance internally.
     */
    public executeEx(param: {
        onTaskEnd: Function;
        onTaskStart?: Function;
        onConnectTrialStart?: Function;
        onConnectTrialEnd?: Function;
        onDownloadFromBeginning?: Function;
        onDownloadFromBreakpoint?: Function;
        onConnectStart?: Function;
        onConnectEnd?: Function;
        onFetchStart?: Function;
        onFetchProgress?: Function;
        onFetchEnd?: Function;
    }) {
        this.execute(createListener({
            onTaskEnd: param.onTaskEnd,
            onTaskStart: param.onTaskStart,
            onConnectTrialStart: param.onConnectTrialStart,
            onConnectTrialEnd: param.onConnectTrialEnd,
            onDownloadFromBeginning: param.onDownloadFromBeginning,
            onDownloadFromBreakpoint: param.onDownloadFromBreakpoint,
            onConnectStart: param.onConnectStart,
            onConnectEnd: param.onConnectEnd,
            onFetchStart: param.onFetchStart,
            onFetchProgress: param.onFetchProgress,
            onFetchEnd: param.onFetchEnd
        }));
    }
    /**
     * Correspond to [DownloadTask.execute].
     * This method will create a [DownloadListener1]
     * instance internally.
     */
    public execute1(param: {
        taskEnd: Function;
        taskStart?: Function;
        retry?: Function;
        connected?: Function;
        progress?: Function;
    }) {
        this.execute(createSampleListener({
            taskEnd: param.taskEnd,
            taskStart: param.taskStart,
            retry: param.retry,
            connected: param.connected,
            progress: param.progress
        }));
    }
    /**
     * Correspond to [DownloadTask.execute].
     * This method will create a [DownloadListener2]
     * instance internally.
     */
    public execute2(param: {
        onTaskStart: Function;
        onTaskEnd: Function;
    }) {
        this.execute(createStartEndListener({ onTaskStart: param.onTaskStart, onTaskEnd: param.onTaskEnd }));
    }
    /**
     * Correspond to [DownloadTask.execute].
     * This method will create a [DownloadListener3]
     * instance internally.
     */
    public execute3(param: {
        onStarted?: Function;
        onConnected?: Function;
        onProgress?: Function;
        onCompleted?: Function;
        onCanceled?: Function;
        onWarn?: Function;
        onRetry?: Function;
        onError?: Function;
    }) {
        this.execute(createEndCauseListener({
            onStarted: param.onStarted,
            onConnected: param.onConnected,
            onProgress: param.onProgress,
            onCompleted: param.onCompleted,
            onCanceled: param.onCanceled,
            onWarn: param.onWarn,
            onRetry: param.onRetry,
            onError: param.onError
        }));
    }
    /**
     * Correspond to [DownloadTask.execute].
     * This method will create a [DownloadListener4]
     * instance internally.
     */
    public execute4(param: {
        onTaskEnd: Function;
        onTaskStart?: Function;
        onConnectStart?: Function;
        onConnectEnd?: Function;
        onInfoReady?: Function;
        onProgressBlock?: Function;
        onProgressWithoutTotalLength?: Function;
        onBlockEnd?: Function;
    }) {
        this.execute(createSpeedListener({
            onTaskEnd: param.onTaskEnd,
            onTaskStart: param.onTaskStart,
            onConnectStart: param.onConnectStart,
            onConnectEnd: param.onConnectEnd,
            onInfoReady: param.onInfoReady,
            onProgressBlock: param.onProgressBlock,
            onProgressWithoutTotalLength: param.onProgressWithoutTotalLength,
            onBlockEnd: param.onBlockEnd
        }));
    }
    /**
     * Correspond to [DownloadTask.execute].
     * This method will create a [DownloadListener4WithSpeed]
     * instance internally.
     */
    public execute4WithSpeed(param: {
        onTaskEndWithSpeed: Function;
        onTaskStart?: Function;
        onConnectStart?: Function;
        onConnectEnd?: Function;
        onInfoReadyWithSpeed?: Function;
        onProgressBlockWithSpeed?: Function;
        onProgressWithSpeed?: Function;
        onBlockEndWithSpeed?: Function;
    }) {
        this.execute(createListenerWithSpeed({
            onTaskEndWithSpeed: param.onTaskEndWithSpeed,
            onTaskStart: param.onTaskStart,
            onConnectStart: param.onConnectStart,
            onConnectEnd: param.onConnectEnd,
            onInfoReadyWithSpeed: param.onInfoReadyWithSpeed,
            onProgressBlockWithSpeed: param.onProgressBlockWithSpeed,
            onProgressWithSpeed: param.onProgressWithSpeed,
            onBlockEndWithSpeed: param.onBlockEndWithSpeed
        }));
    }
    /**
     * Correspond to [DownloadTask.enqueue].
     * This method will create a [DownloadListener] instance internally.
     */
    public enqueueEx(param: {
        onTaskEnd: Function;
        onTaskStart?: Function;
        onConnectTrialStart?: Function;
        onConnectTrialEnd?: Function;
        onDownloadFromBeginning?: Function;
        onDownloadFromBreakpoint?: Function;
        onConnectStart?: Function;
        onConnectEnd?: Function;
        onFetchStart?: Function;
        onFetchProgress?: Function;
        onFetchEnd?: Function;
    }) {
        this.enqueue(createListener({
            onTaskEnd: param.onTaskEnd,
            onTaskStart: param.onTaskStart,
            onConnectTrialStart: param.onConnectTrialStart,
            onConnectTrialEnd: param.onConnectTrialEnd,
            onDownloadFromBeginning: param.onDownloadFromBeginning,
            onDownloadFromBreakpoint: param.onDownloadFromBreakpoint,
            onConnectStart: param.onConnectStart,
            onConnectEnd: param.onConnectEnd,
            onFetchStart: param.onFetchStart,
            onFetchProgress: param.onFetchProgress,
            onFetchEnd: param.onFetchEnd
        }));
    }
    /**
     * Correspond to [DownloadTask.enqueue].
     * This method will create a [DownloadListener1]
     * instance internally.
     */
    public enqueue1(param: {
        taskEnd: Function;
        taskStart?: Function;
        retry?: Function;
        connected?: Function;
        progress?: Function;
    }) {
        this.enqueue(createSampleListener({
            taskEnd: param.taskEnd,
            taskStart: param.taskStart,
            retry: param.retry,
            connected: param.connected,
            progress: param.progress
        }));
    }
    /**
     * Correspond to [DownloadTask.enqueue].
     * This method will create a [DownloadListener2]
     * instance internally.
     */
    public enqueue2(param: {
        onTaskStart: Function;
        onTaskEnd: Function;
    }) {
        this.enqueue(createStartEndListener({ onTaskStart: param.onTaskStart, onTaskEnd: param.onTaskEnd }));
    }
    /**
     * Correspond to [DownloadTask.enqueue].
     * This method will create a [DownloadListener3]
     * instance internally.
     */
    public enqueue3(param: {
        onStarted?: Function;
        onConnected?: Function;
        onProgress?: Function;
        onCompleted?: Function;
        onCanceled?: Function;
        onWarn?: Function;
        onRetry?: Function;
        onError?: Function;
    }) {
        this.enqueue(createEndCauseListener({
            onStarted: param.onStarted,
            onConnected: param.onConnected,
            onProgress: param.onProgress,
            onCompleted: param.onCompleted,
            onCanceled: param.onCanceled,
            onWarn: param.onWarn,
            onRetry: param.onRetry,
            onError: param.onError
        }));
    }
    /**
     * Correspond to [DownloadTask.enqueue].
     * This method will create a [DownloadListener4]
     * instance internally.
     */
    public enqueue4(param: {
        onTaskEnd: Function;
        onTaskStart?: Function;
        onConnectStart?: Function;
        onConnectEnd?: Function;
        onInfoReady?: Function;
        onProgressBlock?: Function;
        onProgressWithoutTotalLength?: Function;
        onBlockEnd?: Function;
    }) {
        this.enqueue(createSpeedListener({
            onTaskEnd: param.onTaskEnd,
            onTaskStart: param.onTaskStart,
            onConnectStart: param.onConnectStart,
            onConnectEnd: param.onConnectEnd,
            onInfoReady: param.onInfoReady,
            onProgressBlock: param.onProgressBlock,
            onProgressWithoutTotalLength: param.onProgressWithoutTotalLength,
            onBlockEnd: param.onBlockEnd
        }));
    }
    /**
     * Correspond to [DownloadTask.enqueue].
     * This method will create a [DownloadListener4WithSpeed]
     * instance internally.
     */
    public enqueue4WithSpeed(param: {
        onTaskEndWithSpeed: Function;
        onTaskStart?: Function;
        onConnectStart?: Function;
        onConnectEnd?: Function;
        onInfoReadyWithSpeed?: Function;
        onProgressBlockWithSpeed?: Function;
        onProgressWithSpeed?: Function;
        onBlockEndWithSpeed?: Function;
    }) {
        this.enqueue(createListenerWithSpeed({
            onTaskEndWithSpeed: param.onTaskEndWithSpeed,
            onTaskStart: param.onTaskStart,
            onConnectStart: param.onConnectStart,
            onConnectEnd: param.onConnectEnd,
            onInfoReadyWithSpeed: param.onInfoReadyWithSpeed,
            onProgressBlockWithSpeed: param.onProgressBlockWithSpeed,
            onProgressWithSpeed: param.onProgressWithSpeed,
            onBlockEndWithSpeed: param.onBlockEndWithSpeed
        }));
    }
}
export class MockTaskForCompare extends IdentifiedTask {
    id: number;
    url: string;
    filename: string;
    public constructor(id: number, task?: DownloadTask) {
        super();
        this.id = id;
        if (task) {
            this.url = task.getUrl();
            this.filename = task.getFilename();
        }
        else {
            this.url = EMPTY_URL;
            this.filename = null;
        }
    }
    public getId(): number {
        return this.id;
    }
    public getUrl(): string {
        return this.url;
    }
    public getFilename(): string {
        return this.filename;
    }
}
