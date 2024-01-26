/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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

import { describe, it, expect } from '@ohos/hypium'
import * as parser from '@f-fjs/intl-messageformat-parser';

export default function icu4jTest() {
  describe('Icu4jTest', () => {
    it('should_have_a_parse_export', 0, () => {
      expect((Object as ESObject).getOwnPropertyNames(parser)).assertContain('parse');
      expect(typeof parser.parse).assertEqual('function');
    });

    it('should_have_a_SyntaxError_export', 0, () => {
      expect((Object as ESObject).getOwnPropertyNames(parser)).assertContain('SyntaxError');

      expect(typeof (parser as ESObject).SyntaxError).assertEqual('function');
    });

    let parse = parser.parse;
    it('should_expect_a_String_argument', 0, () => {
      expect(parse('').length).assertEqual(0);
      try {
        parse(undefined)
        parse(null)
      } catch (e) {
        expect(typeof e).assertEqual('object')
      }

    });

    it('should_return_an_AST_object', 0, () => {
      let ast = parse('');
      expect(typeof ast).assertEqual('object');
      expect((ast as ESObject).type).assertUndefined();
      expect((ast as ESObject).elements).assertUndefined();
    });

    let msg = 'Hello, World!';
    let ast = parse(msg);

    it('should_contain_1_elements', 0, () => {
      expect(ast.length).assertEqual(1);
    });

    it('should_contain_a_messageTextElement', 0, () => {
      expect(typeof ast).assertEqual('object');
      expect(ast[0].type).assertEqual(0);
      expect((ast[0] as ESObject).value).assertEqual(msg);
    });

    let msg1 = 'Hello, {name}!';
    let ast1 = parse(msg1);

    it('should_contain_3_elements', 0, () => {
      expect(ast1.length).assertEqual(3);
    });

    it('should_first_contain_a_messageTextElement', 0, () => {
      expect((ast1[0] as ESObject).value).assertEqual('Hello, ');
    });

    it('should_then_contain_an_argumentElement', 0, () => {
      expect(ast1[1].type).assertEqual(1);
    });

    it('should_finally_contain_a_messageTextElement', 0, () => {
      expect((ast1[2] as ESObject).value).assertEqual('!');
    });

    let msg2 = '{num, number, percent}';
    let ast2 = parse(msg2);

    it('should_contain_1_elements_1', 0, () => {
      expect(ast2.length).assertEqual(1);
    });

    it('should_contain_an_argumentElement', 0, () => {
      let element = ast2[0];
      expect(element.type).assertEqual(2);
      expect((element as ESObject).style).assertEqual('percent');
    });

    let msg3 = '{numPhotos, plural, =0{no photos} =1{one photo} other{# photos}}';
    let ast3 = parse(msg3);

    it('should_contain_1_elements_ast3', 0, () => {
      expect(ast3.length).assertEqual(1);
    });

    it('should_contain_an_argumentElement_ast3', 0, () => {
      let element = ast3[0];
      expect(element.type).assertEqual(6);
      expect((element as ESObject).value).assertEqual('numPhotos');
    });

    it('should_contain_3_options_ast3', 0, () => {
      let options: ESObject = (ast3[0] as ESObject).options;
      let keys: ESObject = (Object as ESObject).keys(options)
      expect(keys.length).assertEqual(3);

      let option: ESObject = options['=0'];
      expect(option.value[0].type).assertEqual(0);
      expect(option.value[0].value).assertEqual('no photos');
      expect(keys[0]).assertEqual('=0');
      expect(keys[1]).assertEqual('=1');
      expect(keys[2]).assertEqual('other');
    });

    it('should_contain_nested_messageFormatPattern_values_for_each_option', 0, () => {
      let options: ESObject = (ast3[0] as ESObject).options;

      let value: ESObject = options['=0'].value;
      expect(value[0].type).assertEqual(0);
      expect(value.length).assertEqual(1);

      let element: ESObject = value[0];

      expect(element.type).assertEqual(0);
      expect(element.value).assertEqual('no photos');
      expect(options['=1'].value[0].value).assertEqual('one photo');
      expect(options['other'].value[1].value).assertEqual(' photos');
    });

    let msg4 = '{floor, selectordinal, =0{ground} one{#st} two{#nd} few{#rd} other{#th}} floor';
    let ast4 = parse(msg4);
    it('should_contain_2_elements_ast4', 0, () => {
      expect(ast4.length).assertEqual(2);
    });

    it('should_contain_an_argumentElement_ast4', 0, () => {
      let element = ast4[0];
      expect(element.type).assertEqual(6);
      expect((element as ESObject).offset).assertEqual(0);
      expect((element as ESObject).pluralType).assertEqual('ordinal');
    });

    it('should_contain_5_options_ast4', 0, () => {
      let options: ESObject = (ast4[0] as ESObject).options;
      let keys: ESObject = (Object as ESObject).keys(options)
      expect(keys.length).assertEqual(5);

      let option: ESObject = options['=0'];

      expect(option.value[0].type).assertEqual(0);
      expect(keys[0]).assertEqual('=0');
      expect(option.value[0].value).assertEqual('ground');


      expect(keys[1]).assertEqual('one');
      expect(keys[2]).assertEqual('two');
      expect(keys[3]).assertEqual('few');
      expect(keys[4]).assertEqual('other');
    });

    it('should_contain_nested_messageFormatPattern_values_for_each_option_ast4', 0, () => {
      let options: ESObject = (ast4[0] as ESObject).options;

      let value: ESObject = options['=0'].value;
      expect(value[0].type).assertEqual(0);
      expect(value.length).assertEqual(1);

      let element: ESObject = value[0];

      expect(element.type).assertEqual(0);
      expect(element.value).assertEqual('ground');

      expect(options['=0'].value[0].value).assertEqual('ground');
      expect(options['one'].value[1].value).assertEqual('st');
      expect(options['two'].value[1].value).assertEqual('nd');
      expect(options['few'].value[1].value).assertEqual('rd');
      expect(options['other'].value[1].value).assertEqual('th');
    });

    let msg5 = '{gender, select, female {woman} male {man} other {person}}';
    let ast5 = parse(msg5);

    it('should_contain_1_elements_ast5', 0, () => {
      expect(ast5.length).assertEqual(1);
    });

    it('should_contain_an_argumentElement_ast5', 0, () => {
      let element = ast5[0];
      expect(element.type).assertEqual(5);
      expect((element as ESObject).value).assertEqual('gender');
    });

    it('should_contain_3_options_ast5', 0, () => {
      let options: ESObject = (ast5[0] as ESObject).options;
      let keys: ESObject = (Object as ESObject).keys(options)
      expect(keys.length).assertEqual(3);

      let option: ESObject = options['female'];
      expect(option.value[0].type).assertEqual(0);
      expect(option.value[0].value).assertEqual('woman');

      expect(keys[1]).assertEqual('male');
      expect(keys[2]).assertEqual('other');
    });

    it('should_contain_nested_messageFormatPattern_values_for_each_option_ast5', 0, () => {
      let options: ESObject = (ast5[0] as ESObject).options;

      let value: ESObject = options['female'].value;
      expect(value[0].type).assertEqual(0);
      expect(value.length).assertEqual(1);

      let element: ESObject = value[0];
      expect(element.type).assertEqual(0);
      expect(element.value).assertEqual('woman');
      expect(options['male'].value[0].value).assertEqual('man');
      expect(options['other'].value[0].value).assertEqual('person');
    });

    it('should_allow_whitespace_in_and_around_messageTextElement_s', 0, () => {
      let msg = '   some random test   ';
      let ast = parse(msg);
      expect((ast[0] as ESObject).value).assertEqual(msg);
    });

    it('should_allow_whitespace_in_argumentElement_s', 0, () => {
      let msg = '{  num , number,percent  }';
      let ast = parse(msg);
      let element = ast[0];
      expect((element as ESObject).value).assertEqual('num');
      expect(element.type).assertEqual(2);
      expect((element as ESObject).style).assertEqual('percent');
    });

    it('not_allow_escaping_of_syntax_chars_via', 0, () => {
      try {
        parse('\\{')
        parse('\\}')
        parse('\\u003C')
        parse('\\#')
      } catch (e) {
        expect(e.message).assertEqual('Expected argNameOrNumber but end of input found.')
      }
    });

    it('should_allow_backslash_chars_in_messageTextElement_s', 0, () => {

      expect((parse('\\u005c')[0] as ESObject).value).assertEqual('\\u005c');
      expect((parse('\\\\')[0] as ESObject).value).assertEqual('\\\\');
    });

  })
}