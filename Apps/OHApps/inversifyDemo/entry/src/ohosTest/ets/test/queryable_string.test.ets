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
import { QueryableString } from 'inversify/lib/planning/queryable_string';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it as _it, expect } from '../utils/util'

export default function queryable_stringTest() {
  describe('queryable_stringTest',  ()=> {
    _it('Should_be_able_to_set_its_own_properties', () => {
      const queryableString = new QueryableString('some_text');
      expect(queryableString.value()).to.eql('some_text');
    });

    _it('Should_be_able_to_return_its_value', () => {
      const queryableString = new QueryableString('some_text');
      expect(queryableString.value()).to.eql('some_text');
      expect(queryableString.value() === 'some_other_text').to.eql(false);
    });

    _it('Should_be_able_to_identify_if_its_value_starts_with_certain_text', () => {
      const queryableString = new QueryableString('some_text');
      expect(queryableString.startsWith('some')).to.eql(true);
      expect(queryableString.startsWith('s')).to.eql(true);
      expect(queryableString.startsWith('me')).to.eql(false);
      expect(queryableString.startsWith('_text')).to.eql(false);
    });

    _it('Should_be_able_to_identify_if_its_value_ends_with_certain_text', () => {
      const queryableString = new QueryableString('some_text');
      expect(queryableString.endsWith('_text')).to.eql(true);
      expect(queryableString.endsWith('ext')).to.eql(true);
      expect(queryableString.endsWith('_tex')).to.eql(false);
      expect(queryableString.endsWith('some')).to.eql(false);
    });

    _it('Should_be_able_to_identify_if_its_value_is_equals_to_certain_text', () => {
      const queryableString = new QueryableString('some_text');
      expect(queryableString.equals('some_text')).to.eql(true);
      expect(queryableString.contains('some_text ')).to.eql(false);
      expect(queryableString.contains('som_text')).to.eql(false);
    });
  })
}