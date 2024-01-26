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
import { BreakpointInfo } from './breakpoint/BreakpointInfo';
import { ResumeFailedCause } from './cause/ResumeFailedCause';
import { EndCause } from './cause/EndCause';
export interface DownloadMonitor {
    taskStart(task: DownloadTask): void;
    /**
     * Call this monitor function when the {@code task} just end trial connection, and its
     * {@code info} is ready and also certain this task will resume from the past breakpoint.
     *
     * @param task the target task.
     * @param info has certainly total-length and offset-length now.
     */
    taskDownloadFromBreakpoint(task: DownloadTask, info: BreakpointInfo): void;
    /**
     * Call this monitor function when the {@code task} just end trial connection, and its
     * {@code info} is ready and also certain this task will download from the very beginning.
     *
     * @param task  the target task.
     * @param info  has certainly total-length and offset-length now.
     * @param cause the cause of why download from the very beginning instead of from the past
     *              breakpoint.
     */
    taskDownloadFromBeginning(task: DownloadTask, info: BreakpointInfo, cause: ResumeFailedCause): void;
    taskEnd(task: DownloadTask, cause: EndCause);
}
