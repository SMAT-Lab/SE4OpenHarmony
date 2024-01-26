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
import { BlockInfo } from '../breakpoint/BlockInfo';
import { DownloadTask } from '../DownloadTask';
import { DownloadChain } from '../download/DownloadChain';
import { DownloadStore } from '../breakpoint/DownloadStore';
import { DownloadConnection } from '../connection/DownloadConnection';
import { Interceptor } from './Interceptor';
import { Util, CONTENT_RANGE, CONTENT_LENGTH } from '../Util';
import { OkDownload } from '../OkDownload';
import { InterruptException } from '../exception/InterruptException';
import { RetryException } from '../exception/RetryException';
import { ResumeFailedCause } from '../cause/ResumeFailedCause';
export class BreakpointInterceptor implements Interceptor.Connect, Interceptor.Fetch {
    public async interceptConnect(chain: DownloadChain): Promise<DownloadConnection.Connected> {
        const connected: DownloadConnection.Connected = await chain.processConnect();
        const info: BreakpointInfo = chain.getInfo();
        if (chain.getCache().isInterrupt()) {
            throw InterruptException.SIGNAL;
        }
        if (info.getBlockCount() === 1 && !info.isChunked()) {
            // only one block to download this resource
            // use this block response header instead of trial result if they are different.
            const blockInstanceLength: number = this.getExactContentLengthRangeFrom0(connected);
            const infoInstanceLength: number = info.getTotalLength();
            if (blockInstanceLength > 0 && blockInstanceLength != infoInstanceLength) {
                console.debug("SingleBlock special check: the response instance-length["
                    + blockInstanceLength + "] isn't equal to the instance length from trial-"
                    + "connection[" + infoInstanceLength + "]");
                const blockInfo: BlockInfo = info.getBlock(0);
                let isFromBreakpoint: boolean = blockInfo.getRangeLeft() !== 0;
                const newBlockInfo: BlockInfo = new BlockInfo(0, blockInstanceLength);
                info.resetBlockInfos();
                info.addBlock(newBlockInfo);
                if (isFromBreakpoint) {
                    const msg: string = "Discard breakpoint because of on this special case, we have"
                        + " to download from beginning";
                    console.warn(msg);
                    throw new RetryException(msg);
                }
                OkDownload.with().getCallbackDispatcher().dispatch()
                    .downloadFromBeginning(chain.getTask(), info, ResumeFailedCause.CONTENT_LENGTH_CHANGED);
            }
        }
        // update for connected.
        const store: DownloadStore = chain.getDownloadStore();
        try {
            if (!store.update(info)) {
                throw new Error("Update store failed!");
            }
        }
        catch (err) {
            throw new Error("Update store failed!" + err);
        }
        return connected;
    }
    public interceptFetch(chain: DownloadChain): number {
        return 0;
    }
    getExactContentLengthRangeFrom0(connected: DownloadConnection.Connected): number {
        const contentRangeField: string = connected.getResponseHeaderField(CONTENT_RANGE);
        let contentLength: number = -1;
        if (!Util.isEmpty(contentRangeField)) {
            const rightRange: number = BreakpointInterceptor.getRangeRightFromContentRange(contentRangeField);
            // for the range from 0, the contentLength is just right-range +1.
            if (rightRange > 0)
                contentLength = rightRange + 1;
        }
        if (contentLength < 0) {
            // content-length
            const contentLengthField: string = connected.getResponseHeaderField(CONTENT_LENGTH);
            if (!Util.isEmpty(contentLengthField)) {
                contentLength = Number.parseInt(contentLengthField);
            }
        }
        return contentLength;
    }
    static getRangeRightFromContentRange(contentRange: string): number {
        //        Matcher m = CONTENT_RANGE_RIGHT_VALUE.matcher(contentRange);
        //        if (m.find()) {
        //            return Long.parseLong(m.group(1));
        //        }
        //        RegExp
        return -1;
    }
}
