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
import { BreakpointInfo } from '../../breakpoint/BreakpointInfo';
import { BlockInfo } from '../../breakpoint/BlockInfo';
import { DownloadTask } from '../../DownloadTask';
import { DownloadChain } from '../../download/DownloadChain';
import { DownloadConnection } from '../../connection/DownloadConnection';
import { Interceptor } from '../Interceptor';
import { Util, RANGE, IF_MATCH, CONTENT_LENGTH, CONTENT_RANGE } from '../../Util';
import { InterruptException } from '../../exception/InterruptException';
import { OkDownload } from '../../OkDownload';
export class HeaderInterceptor implements Interceptor.Connect {
    public async interceptConnect(chain: DownloadChain): Promise<DownloadConnection.Connected> {
        console.info("okdownload ====  Header interceptor =====");
        const info: BreakpointInfo = chain.getInfo();
        const connection: DownloadConnection.Connection = chain.getConnectionOrCreate();
        const task: DownloadTask = chain.getTask();
        const userHeader: object = task.getHeaderMapFields();
        if (userHeader != null) {
            Util.addRequestHeaderFields(userHeader, connection);
        }
        // add range header
        const blockIndex: number = chain.getBlockIndex();
        const blockInfo: BlockInfo = info.getBlock(blockIndex);
        if (blockInfo == null) {
            throw new Error("No block-info found on " + blockIndex);
        }
        let range: string = "bytes=" + blockInfo.getRangeLeft() + "-";
        range += blockInfo.getRangeRight();
        connection.addHeader(RANGE, range);
        // add etag if exist
        const etag: string = info.getEtag();
        if (!Util.isEmpty(etag)) {
            connection.addHeader(IF_MATCH, etag);
        }
        connection.setFilename(task.getFilename() + "-" + blockIndex);
        if (chain.getCache().isInterrupt()) {
            throw InterruptException.SIGNAL;
        }
        OkDownload.with().getCallbackDispatcher().dispatch()
            .connectStart(task, blockIndex, connection.getRequestProperties());
        let connected: DownloadConnection.Connected = await chain.processConnect();
        if (chain.getCache().isInterrupt()) {
            throw InterruptException.SIGNAL;
        }
        let responseHeaderFields: object = connected.getResponseHeaderFields();
        //if (responseHeaderFields === undefined) responseHeaderFields = new Map;
        OkDownload.with().getCallbackDispatcher().dispatch().connectEnd(task, blockIndex, connected.getResponseCode(), responseHeaderFields);
        // if precondition failed.
        //        final DownloadStrategy strategy = OkDownload.with().downloadStrategy();
        //        final DownloadStrategy.ResumeAvailableResponseCheck responseCheck =
        //                strategy.resumeAvailableResponseCheck(connected, blockIndex, info);
        //        responseCheck.inspect();
        //    let contentLength: number;
        //    const contentLengthField: string = connected.getResponseHeaderField(CONTENT_LENGTH);
        //    if (contentLengthField === undefined || contentLengthField.length == 0) {
        //      const contentRangeField: string = connected.getResponseHeaderField(CONTENT_RANGE);
        //      contentLength = Util.parseContentLengthFromContentRange(contentRangeField);
        //    } else {
        //      contentLength = Util.parseContentLength(contentLengthField);
        //    }
        //
        //    chain.setResponseContentLength(contentLength);
        return connected;
    }
}
