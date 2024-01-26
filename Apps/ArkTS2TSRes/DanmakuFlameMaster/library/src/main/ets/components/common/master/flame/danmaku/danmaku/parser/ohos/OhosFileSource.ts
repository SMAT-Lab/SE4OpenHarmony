let __generate__Id: number = 0;
function generateId(): string {
    return "OhosFileSource_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import { IDataSource, SCHEME_HTTP_TAG, SCHEME_HTTPS_TAG } from '../IDataSource';
import fileio from '@ohos.fileio';
import uri from '@ohos.uri';
import request from '@ohos.request';
import { GlobalContext } from '../../../../../../../GlobalContext';
export class OhosFileSource implements IDataSource<fileio.Stream> {
    private inStream: fileio.Stream | any = null;
    public DOWNLOAD_FILE_PATH = GlobalContext.getContext().getValue("path").toString() + '/danmuku.xml';
    constructor(filePath: string | fileio.Stream | uri.URI) {
        if (typeof filePath === 'string') {
            this.fillStreamFromString(filePath);
            return;
        }
        if (filePath instanceof uri.URI) {
            this.fillStreamFromUri(filePath);
            return;
        }
        this.inStream = filePath as fileio.Stream;
    }
    public fillStreamFromUri(filePath: uri.URI) {
        if (filePath.scheme.toLocaleLowerCase() == SCHEME_HTTP_TAG || filePath.scheme.toLocaleLowerCase() == SCHEME_HTTPS_TAG) {
            let downloadTask: any;
            let that = this;
            request.download({ url: filePath.toString(),
                filePath: this.DOWNLOAD_FILE_PATH }, (err, data) => {
                if (err) {
                    console.error('Failed to request the download. Cause: ' + JSON.stringify(err));
                    return;
                }
                downloadTask = data;
                downloadTask.on('complete', () => {
                    fileio.createStream(this.DOWNLOAD_FILE_PATH, "r+", (err, stream) => {
                        if (err) {
                            console.error('Failed to createStream. Cause: ' + JSON.stringify(err));
                            return;
                        }
                        that.inStream = stream;
                    });
                });
            });
        }
    }
    public fillStreamFromString(filePath: string) {
        let that = this;
        fileio.createStream(filePath, "r+", (err, stream) => {
            that.inStream = stream;
        });
    }
    public release() {
        if (this.inStream != null) {
            this.inStream.closeSync();
        }
        this.inStream = null;
    }
    public data(): fileio.Stream {
        return this.inStream;
    }
}
