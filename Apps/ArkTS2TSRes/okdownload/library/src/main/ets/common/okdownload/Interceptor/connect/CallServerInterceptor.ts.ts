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
import { DownloadChain } from '../../download/DownloadChain';
import { DownloadConnection } from '../../connection/DownloadConnection';
import { Interceptor } from '../Interceptor';
export class CallServerInterceptor implements Interceptor.Connect {
    public async interceptConnect(chain: DownloadChain): Promise<DownloadConnection.Connected> {
        //        OkDownload.with().downloadStrategy().inspectNetworkOnWifi(chain.getTask());
        //        OkDownload.with().downloadStrategy().inspectNetworkAvailable();
        console.info("okdownload ====  call server interceptor =====");
        return await chain.getConnectionOrCreate().execute();
    }
}
