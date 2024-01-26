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
import { DownloadTask } from './DownloadTask';
export class Builder {
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
    isWifiRequired: boolean = Builder.DEFAULT_IS_WIFI_REQUIRED;
    isFilenameFromResponse: boolean;
    public static readonly DEFAULT_PASS_IF_ALREADY_COMPLETED: boolean = true;
    /**
     * if this task has already completed judged by
     * {@link StatusUtil.Status#isCompleted(DownloadTask)}, callback completed directly instead
     * of start download.
     */
    passIfAlreadyCompleted: boolean = Builder.DEFAULT_PASS_IF_ALREADY_COMPLETED;
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
}
;
