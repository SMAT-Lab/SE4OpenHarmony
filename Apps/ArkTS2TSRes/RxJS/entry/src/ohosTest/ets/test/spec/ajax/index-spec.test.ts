let __generate__Id: number = 0;
function generateId(): string {
    return "index-spec.test_" + ++__generate__Id;
}
/*
 * Copyright (C) 2024 Huawei Device Co., Ltd.
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
import { describe, expect, it } from '@ohos/hypium';
import { ajax } from 'rxjs/internal/ajax/ajax';
import { AjaxError, AjaxTimeoutError } from 'rxjs/internal/ajax/errors';
export default function ajaxTest() {
    describe('index', () => {
        it('should_export_static_ajax_observable_creator_functions', 0, () => {
            expect(ajax != undefined && ajax != null).assertTrue();
        });
        it('should_export_Ajax_data_classes', 0, () => {
            expect(AjaxError != undefined && AjaxError != null).assertTrue();
            expect(AjaxTimeoutError != undefined && AjaxTimeoutError != null).assertTrue();
        });
    });
}
