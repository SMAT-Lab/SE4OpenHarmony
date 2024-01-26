let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
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
export { DownloadContext, QueueSet } from './src/main/ets/common/okdownload/DownloadContext';
export { DownloadContextListener } from './src/main/ets/common/okdownload/DownloadContextListener';
export { DownloadListener } from './src/main/ets/common/okdownload/DownloadListener';
export { DownloadTask } from './src/main/ets/common/okdownload/DownloadTask';
export { OkDownload } from './src/main/ets/common/okdownload/OkDownload';
export { SpeedCalculator } from './src/main/ets/common/okdownload/SpeedCalculator';
export { StatusUtil } from './src/main/ets/common/okdownload/StatusUtil';
export { Util, Log } from './src/main/ets/common/okdownload/Util';
export { BlockInfo } from './src/main/ets/common/okdownload/breakpoint/BlockInfo';
export { BreakpointInfo } from './src/main/ets/common/okdownload/breakpoint/BreakpointInfo';
export { BreakpointStoreOnCache } from './src/main/ets/common/okdownload/breakpoint/BreakpointStoreOnCache';
export { EndCause } from './src/main/ets/common/okdownload/cause/EndCause';
export { ResumeFailedCause } from './src/main/ets/common/okdownload/cause/ResumeFailedCause';
export { SampleListener } from './src/main/ets/common/okdownload/listener/SampleListener';
export { StartEndListener } from './src/main/ets/common/okdownload/listener/StartEndListener';
export { SpeedListener } from './src/main/ets/common/okdownload/listener/SpeedListener';
export { DownloadListenerWithSpeed } from './src/main/ets/common/okdownload/listener/DownloadListenerWithSpeed';
export { DownloadListenerBunch } from './src/main/ets/common/okdownload/listener/DownloadListenerBunch';
export { DownloadTest } from './src/main/ets/components/okdownload/DownloadTest';
export { Builder } from './src/main/ets/common/okdownload/Builder';
export { GlobalContext } from './src/main/ets/common/GlobalContext';
