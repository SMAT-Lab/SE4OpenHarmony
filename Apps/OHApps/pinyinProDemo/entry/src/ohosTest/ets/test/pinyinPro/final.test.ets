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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium'
import { pinyin } from 'pinyin-pro'

export default function finalTest() {
describe('final', () => {
  it('final_head',0, () => {
    const result = pinyin('广', {
      pattern: 'finalHead',
    });
    expect(result).assertDeepEquals('u');
  });

  it('final_body',0, () => {
    const result1 = pinyin('广', {
      pattern: 'finalBody',
    });
    expect(result1).assertDeepEquals('ǎ');
  });

  it('final_tail',0, () => {
    const result2 = pinyin('广', {
      pattern: 'finalTail',
    });
    expect(result2).assertDeepEquals('ng');
  });

  it('final_no_head',0, () => {
    const result4 = pinyin('敢', {
      pattern: 'finalHead',
    });
    expect(result4).assertDeepEquals('');
  });

  it('final_no_head_body',0, () => {
    const result5 = pinyin('敢', {
      pattern: 'finalBody',
    });
    expect(result5).assertDeepEquals('ǎ');
  });

  it('final_no_tail',0, () => {
    const result6 = pinyin('哈', {
      pattern: 'finalTail',
    });
    expect(result6).assertDeepEquals('');
  });

  it('final_special_un',0, () => {
    const result = pinyin('群', {
      pattern: 'final',
    });
    expect(result).assertDeepEquals('ǘn');
  });

  it('final_special_u',0, () => {
    const result1 = pinyin('局', {
      pattern: 'final',
    });
    expect(result1).assertDeepEquals('ǘ');
  });

  it('final_special_uan',0, () => {
    const result2 = pinyin('选', {
      pattern: 'final',
    });
    expect(result2).assertDeepEquals('üǎn');
  });

  it('final_special_ue',0, () => {
    const result3 = pinyin('却', {
      pattern: 'final',
    });
    expect(result3).assertDeepEquals('üè');
  });
});
}
