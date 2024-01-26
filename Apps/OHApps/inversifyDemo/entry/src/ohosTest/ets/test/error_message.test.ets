/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it as _it, expect } from '../utils/util'
import * as ERROR_MSGS from 'inversify/lib/constants/error_msgs';

export default function error_messageTest() {
  describe('error_messageTest',  ()=> {

    _it('Should_be_able_to_customize_POST_CONSTRUCT_ERROR', () => {
      const error = ERROR_MSGS.POST_CONSTRUCT_ERROR('a', 'b');
      expect(error).eql('@postConstruct error in class a: b');
    });
  })
}