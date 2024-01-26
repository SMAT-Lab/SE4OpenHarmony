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
import { DownloadTask } from './DownloadTask';
import { StartEndListener } from './listener/StartEndListener';
import { DownloadContextListener } from './DownloadContextListener';
import { EndCause } from './cause/EndCause';
import { DownloadListener } from './DownloadListener';
import { DownloadListenerBunch } from './listener/DownloadListenerBunch';
import { OkDownload } from './OkDownload';
import { Builder } from './Builder';
import { Log } from './Util';
const TAG = 'DownloadContext';
export class DownloadContext {
    tasks: DownloadTask[];
    started: boolean = false;
    contextListener: DownloadContextListener;
    set: QueueSet;
    private completeSubscriber: any;
    constructor(tasks: DownloadTask[], contextListener: DownloadContextListener, set: QueueSet) {
        this.tasks = tasks;
        this.contextListener = contextListener;
        this.set = set;
    }
    public isStarted(): boolean {
        return this.started;
    }
    public getTasks(): DownloadTask[] {
        return this.tasks;
    }
    public startOnSerial(listener: DownloadListener): void {
        this.start(listener, true);
    }
    public startOnParallel(listener: DownloadListener): void {
        this.start(listener, false);
    }
    /**
     * Start queue.
     *
     * @param listener the listener for each task, if you have already provided
     *                {@link #contextListener}, it's accept {@code null} for each task's listener.
     * @param isSerial whether download queue serial or parallel.
     */
    public async start(listener: DownloadListener, isSerial: boolean) {
        const startTime: number = new Date().getTime();
        Log.showDebug(TAG, "start " + isSerial);
        this.started = true;
        let targetListener: DownloadListener;
        if (this.contextListener != null) {
            targetListener = new DownloadListenerBunch.Builder()
                .append(listener)
                .append(new QueueAttachListener(this, this.contextListener, this.tasks.length))
                .build();
        }
        else {
            targetListener = listener;
        }
        if (isSerial) {
            let tempTasks = Array.from(this.tasks);
            tempTasks.sort((a: DownloadTask, b: DownloadTask) => {
                return b.getPriority() - a.getPriority();
            });
            tempTasks[0].execute(targetListener);
            let num: number = 0;
            let completeInfo = { events: ['completed'] };
            this.completeSubscriber = await commonEvent.createSubscriber(completeInfo);
            commonEvent.subscribe(this.completeSubscriber, (error, commonEventData) => {
                if (error.code != 0) {
                    Log.showError(TAG, 'get completed failed. Cause: ' + JSON.stringify(error));
                }
                else {
                    let temp = ++num;
                    Log.showInfo(TAG, 'execute task : ' + temp);
                    if (temp < this.tasks.length) {
                        tempTasks[temp].execute(targetListener);
                    }
                    else {
                        num = 0;
                        commonEvent.unsubscribe(this.completeSubscriber, (error, commonEventData) => {
                        });
                    }
                }
            });
        }
        else {
            DownloadTask.enqueueTasks(this.tasks, targetListener);
        }
        console.debug("start finish " + isSerial + " " + (new Date().getTime() - startTime) + "ms");
    }
    public alter(): AlterContext {
        return new AlterContext(this);
    }
    public async stop() {
        if (this.completeSubscriber != null) {
            await commonEvent.unsubscribe(this.completeSubscriber, (error, commonEventData) => {
                this.completeSubscriber = null;
            });
        }
        if (this.started)
            OkDownload.with().getDownloadDispatcher().cancelTasks(this.tasks);
        this.started = false;
    }
    private callbackQueueEndOnSerialLoop(): void {
        if (this.contextListener == null)
            return;
        this.contextListener.queueEnd(this);
    }
    public toBuilder() {
        return new DownloadContext.Builder(this.set, this.tasks)
            .setListener(this.contextListener);
    }
    public static Builder = class {
        boundTaskList: Array<DownloadTask>;
        set: QueueSet;
        listener: DownloadContextListener;
        public constructor(set: QueueSet = new QueueSet(), taskArrayList: Array<DownloadTask> = new Array) {
            this.set = set;
            this.boundTaskList = taskArrayList;
        }
        public setListener(listener: DownloadContextListener) {
            this.listener = listener;
            return this;
        }
        public bindSetTask(task: DownloadTask) {
            const index: number = this.boundTaskList.indexOf(task);
            if (index >= 0) {
                // replace
                this.boundTaskList.splice(index, 1, task);
            }
            else {
                this.boundTaskList.push(task);
            }
            return this;
        }
        public bindUrl(url: string, filename: string): DownloadTask {
            if (this.set.uri == null) {
                throw new Error("If you want to bind only with url, you have to"
                    + " provide parentPath on QueueSet!");
            }
            return this.bind(url, filename, this.set.uri);
        }
        public bind(url: string, filename: string, uri: string): DownloadTask {
            const build = new Builder(url, filename, uri);
            let taskBuilder = new Builder(url, filename, uri);
            if (this.set.headerMapFields != null)
                taskBuilder.setHeaderMapFields(this.set.headerMapFields);
            if (this.set.wifiRequired != null)
                taskBuilder.setWifiRequired(this.set.wifiRequired);
            if (this.set.passIfAlreadyCompleted != null) {
                taskBuilder.setPassIfAlreadyCompleted(this.set.passIfAlreadyCompleted);
            }
            const task: DownloadTask = taskBuilder.build();
            if (this.set.tag != null)
                task.setTag(this.set.tag);
            this.boundTaskList.push(task);
            return task;
        }
        public unbindTask(task: DownloadTask): void {
            let index = this.boundTaskList.indexOf(task);
            this.boundTaskList.splice(index, 1);
        }
        public unbind(id: number): void {
            //let list: Array<DownloadTask> = Object.assign(this.boundTaskList);
            for (let task of this.boundTaskList) {
                if (task.getId() === id) {
                    let index = this.boundTaskList.indexOf(task);
                    this.boundTaskList.splice(index, 1);
                }
            }
        }
        public build(): DownloadContext {
            let tasks: DownloadTask[] = this.boundTaskList;
            console.info("okdownload tasks = " + tasks.length);
            return new DownloadContext(tasks, this.listener, this.set);
        }
    };
}
/**
 * The Alter helper for the {@link DownloadContext}.
 */
export class AlterContext {
    private context: DownloadContext;
    constructor(context: DownloadContext) {
        this.context = context;
    }
    /**
     * Replace the {@code oldTask} to the {@code newTask}
     *
     * @param oldTask the old task which has been added to the context.
     * @param newTask the new task which will be replace the {@code oldTask} on the
     *                {@code context}.
     */
    public replaceTask(oldTask: DownloadTask, newTask: DownloadTask) {
        const tasks: DownloadTask[] = this.context.tasks;
        for (var i = 0; i < tasks.length; i++) {
            const task: DownloadTask = tasks[i];
            if (task === oldTask) {
                tasks[i] = newTask;
            }
        }
        return this;
    }
}
export class QueueSet {
    headerMapFields: object;
    uri: string;
    passIfAlreadyCompleted: boolean;
    wifiRequired: boolean;
    tag: object;
    public getHeaderMapFields(): object {
        return this.headerMapFields;
    }
    public setHeaderMapFields(headerMapFields: object): void {
        this.headerMapFields = headerMapFields;
    }
    public getDirUri(): string {
        return this.uri;
    }
    public setParentPath(uri: string) {
        this.uri = uri;
        return this;
    }
    public setWifiRequired(wifiRequired: boolean) {
        this.wifiRequired = wifiRequired;
        return this;
    }
    public isWifiRequired(): boolean {
        return this.wifiRequired == null
            ? Builder.DEFAULT_IS_WIFI_REQUIRED : this.wifiRequired;
    }
    public getTag(): object {
        return this.tag;
    }
    public setTag(tag: object) {
        this.tag = tag;
        return this;
    }
    public isPassIfAlreadyCompleted(): boolean {
        return this.passIfAlreadyCompleted == null
            ? Builder.DEFAULT_PASS_IF_ALREADY_COMPLETED
            : this.passIfAlreadyCompleted;
    }
    public setPassIfAlreadyCompleted(passIfAlreadyCompleted: boolean) {
        this.passIfAlreadyCompleted = passIfAlreadyCompleted;
        return this;
    }
    public commit() {
        return new DownloadContext.Builder(this);
    }
}
class QueueAttachListener extends StartEndListener {
    private remainCount: number;
    private contextListener: DownloadContextListener;
    private hostContext: DownloadContext;
    constructor(context: DownloadContext, contextListener: DownloadContextListener, taskCount: number) {
        super();
        this.remainCount = taskCount;
        this.contextListener = contextListener;
        this.hostContext = context;
    }
    public taskStart(task: DownloadTask): void {
    }
    public taskEnd(task: DownloadTask, cause: EndCause, realCause: Error): void {
        this.remainCount--;
        this.contextListener.taskEnd(this.hostContext, task, cause, realCause, this.remainCount);
        if (this.remainCount <= 0) {
            this.contextListener.queueEnd(this.hostContext);
            // only log the last one
            console.debug("taskEnd and remainCount " + this.remainCount);
        }
    }
}
