let __generate__Id: number = 0;
function generateId(): string {
    return "Okdownloadunit.test_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import { DownloadTask } from '@ohos/okdownload';
import { DownloadListener } from '@ohos/okdownload';
import { BreakpointInfo } from '@ohos/okdownload';
import { EndCause } from '@ohos/okdownload';
import { ResumeFailedCause } from '@ohos/okdownload';
import { SpeedCalculator } from '@ohos/okdownload';
import { Util, Log } from '@ohos/okdownload';
import { Builder } from '@ohos/okdownload';
export default function Okdownloadunit() {
    describe('Okdownloadunit', () => {
        let filenameError: string = 'single-test2';
        let filename: string = 'single-test';
        let urlError: string = 'https://cdn.llscdn.com/yy/filess/xs8qmxn8-lls-LLS-5.8-800-20171207-111607.apk';
        let url: string = 'https://cdn.llscdn.com/yy/files/xs8qmxn8-lls-LLS-5.8-800-20171207-111607.apk';
        let task = new Builder(url, filename)
            .setWifiRequired(true)
            .setFilenameFromResponse(true)
            .setPassIfAlreadyCompleted(true)
            .build();
        it('getFilename', 0, () => {
            expect(task.getFilename() === filename).assertTrue();
        });
        it('getFilenameErrorNotNull', 0, () => {
            expect(task.getFilename() != null).assertTrue();
        });
        it('getFilenameError', 0, () => {
            expect(task.getFilename() === filenameError).assertEqual(false);
        });
        it('getUrlNotNull', 0, () => {
            expect(task.getUrl() != null).assertTrue();
        });
        it('getUrl', 0, () => {
            expect(task.getUrl() === url).assertTrue();
        });
        it('getUrlError', 0, () => {
            expect(task.getUrl() === urlError).assertEqual(false);
        });
        it('priority', 0, () => {
            task.setPriority(1);
            expect(task.getPriority() === 1).assertTrue();
        });
        it('priority1', 0, () => {
            task.setPriority(1);
            expect(task.getPriority() === -1).not().assertTrue();
        });
        it('priority2', 0, () => {
            task.setPriority(1);
            expect(task.getPriority() === 0).not().assertTrue();
        });
        it('priorityError', 0, () => {
            expect(task.getPriority() === 2).assertEqual(false);
        });
        it('tag', 0, () => {
            expect(task.addTag(1, "11").getTag(1)).assertInstanceOf("String");
            ;
        });
        it('tagNumber', 0, () => {
            expect(task.addTag(2, 11).getTag(2)).assertInstanceOf("Number");
            ;
        });
        it('isWifiRequired', 0, () => {
            expect(task.getIsWifiRequired() === true).assertTrue();
        });
        it('isWifiRequiredNull', 0, () => {
            expect(task.getIsWifiRequired() != null).assertTrue();
        });
        it('isWifiRequiredFalse', 0, () => {
            expect(task.getIsWifiRequired() === false).not().assertTrue();
        });
        it('isPassIfAlreadyCompleted', 0, () => {
            expect(task.isPassIfAlreadyCompleted() === true).assertTrue();
        });
        it('isPassIfAlreadyCompletedNUll', 0, () => {
            expect(task.isPassIfAlreadyCompleted() != null).assertTrue();
        });
        it('isPassIfAlreadyCompletedNot', 0, () => {
            expect(task.isPassIfAlreadyCompleted() === false).not().assertTrue();
        });
        it('filenameFromResponse', 0, () => {
            expect(task.isFilenameFromResponse() === true).assertTrue();
        });
        it('filenameFromResponseFalse', 0, () => {
            expect(task.isFilenameFromResponse() === false).not().assertTrue();
        });
        it('filenameFromResponseNull', 0, () => {
            expect(task.isFilenameFromResponse() != null).assertTrue();
        });
        it('removeTagUndefined', 0, () => {
            task.removeTag(1);
            expect(task.getTag(1)).assertUndefined();
        });
        it('removeTagUndefined2', 0, () => {
            task.removeTag(2);
            expect(task.getTag(2)).assertUndefined();
        });
        it('removeTagNull', 0, () => {
            task.removeTag();
            expect(task.getTag()).assertNull();
        });
    });
}
