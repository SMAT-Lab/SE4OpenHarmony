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
import { describe, it, expect } from '@ohos/hypium'
import JmesPath from 'jmespath';

export default function tokenize() {
  describe('tokenizeTest', () => {
    it('shouldTokenizeUnquotedIdentifier', 0, () => {
      expect(JmesPath.tokenize('foo')).assertDeepEquals(
        [{
          type: "UnquotedIdentifier",
          value: "foo",
          start: 0
        }]);
    });
    it('shouldTokenizeUnquotedIdentifierWithUnderscore', 0, () => {
      expect(JmesPath.tokenize('_underscore')).assertDeepEquals(
        [{
          type: "UnquotedIdentifier",
          value: "_underscore",
          start: 0
        }]);
    });
    it('shouldTokenizeUnquotedIdentifierWithNumbers', 0, () => {
      expect(JmesPath.tokenize('foo123')).assertDeepEquals(
        [{
          type: "UnquotedIdentifier",
          value: "foo123",
          start: 0
        }]);
    });
    it('shouldTokenizeDottedLookups', 0, () => {
      expect(JmesPath.tokenize('foo.bar')).assertDeepEquals(
        [{
          type: "UnquotedIdentifier", value: "foo", start: 0
        },
          {
            type: "Dot", value: ".", start: 3
          },
          {
            type: "UnquotedIdentifier", value: "bar", start: 4
          },
        ]);
    });
    it('shouldTokenizeNumbers', 0, () => {
      expect(JmesPath.tokenize('foo[0]')).assertDeepEquals(
        [{
          type: "UnquotedIdentifier", value: "foo", start: 0
        },
          {
            type: "Lbracket", value: "[", start: 3
          },
          {
            type: "Number", value: 0, start: 4
          },
          {
            type: "Rbracket", value: "]", start: 5
          },
        ]);
    });
    it('shouldTokenizeNumbersWithMultipleDigits', 0, () => {
      expect(JmesPath.tokenize("12345")).assertDeepEquals(
        [{
          type: "Number", value: 12345, start: 0
        }]);
    });
    it('shouldTokenizeNegativeNumbers', 0, () => {
      expect(JmesPath.tokenize("-12345")).assertDeepEquals(
        [{
          type: "Number", value: -12345, start: 0
        }]);
    });
    it('shouldTokenizeQuotedIdentifier', 0, () => {
      expect(JmesPath.tokenize('"foo"')).assertDeepEquals(
        [{
          type: "QuotedIdentifier",
          value: "foo",
          start: 0
        }]);
    });
    it('shouldTokenizeQuotedIdentifierWithUnicodeEscape', 0, () => {
      expect(JmesPath.tokenize('"\\u2713"')).assertDeepEquals(
        [{
          type: "QuotedIdentifier",
          value: "✓",
          start: 0
        }]);
    });
    it('shouldTokenizeLiteralLists', 0, () => {
      expect(JmesPath.tokenize("`[0, 1]`")).assertDeepEquals(
        [{
          type: "Literal",
          value: [0, 1],
          start: 0
        }]);
    });
    it('shouldTokenizeLiteralDict', 0, () => {
      expect(JmesPath.tokenize("`{\"foo\": \"bar\"}`")).assertDeepEquals(
        [{
          type: "Literal",
          value: {
            foo: "bar"
          },
          start: 0
        }]);
    });
    it('shouldTokenizeLiteralStrings', 0, () => {
      expect(JmesPath.tokenize("`\"foo\"`")).assertDeepEquals(
        [{
          type: "Literal",
          value: "foo",
          start: 0
        }]);
    });
    it('shouldTokenizeJsonLiterals', 0, () => {
      expect(JmesPath.tokenize("`true`")).assertDeepEquals(
        [{
          type: "Literal",
          value: true,
          start: 0
        }]);
    });
    it('shouldNotRequiringSurroundingQuotesForStrings', 0, () => {
      expect(JmesPath.tokenize("`foo`")).assertDeepEquals(
        [{
          type: "Literal",
          value: "foo",
          start: 0
        }]);
    });
    it('shouldNotRequiringSurroundingQuotesForNumbers', 0, () => {
      expect(JmesPath.tokenize("`20`")).assertDeepEquals(
        [{
          type: "Literal",
          value: 20,
          start: 0
        }]);
    });
    it('shouldTokenizeLiteralListsWithCharsAfterwards', 0, () => {
      expect(JmesPath.tokenize("`[0, 1]`[0]")).assertDeepEquals([
        {
          type: "Literal", value: [0, 1], start: 0
        },
        {
          type: "Lbracket", value: "[", start: 8
        },
        {
          type: "Number", value: 0, start: 9
        },
        {
          type: "Rbracket", value: "]", start: 10
        }
      ]);
    });
    it('shouldTokenizeTwoCharTokensWithSharedPrefix', 0, () => {
      expect(JmesPath.tokenize("[?foo]")).assertDeepEquals(
        [{
          type: "Filter", value: "[?", start: 0
        },
          {
            type: "UnquotedIdentifier", value: "foo", start: 2
          },
          {
            type: "Rbracket", value: "]", start: 5
          }]
      );
    });
    it('shouldTokenizeFlattenOperator', 0, () => {
      expect(JmesPath.tokenize("[]")).assertDeepEquals(
        [{
          type: "Flatten", value: "[]", start: 0
        }]);
    });
    it('shouldTokenizeComparators', 0, () => {
      expect(JmesPath.tokenize("<")).assertDeepEquals(
        [{
          type: "LT",
          value: "<",
          start: 0
        }]);
    });
    it('shouldTokenizeTwoCharTokensWithoutSharedPrefix', 0, () => {
      expect(JmesPath.tokenize("==")).assertDeepEquals(
        [{
          type: "EQ", value: "==", start: 0
        }]
      );
    });
    it('shouldTokenizeNotEquals', 0, () => {
      expect(JmesPath.tokenize("!=")).assertDeepEquals(
        [{
          type: "NE", value: "!=", start: 0
        }]
      );
    });
    it('shouldTokenizeTheORToken', 0, () => {
      expect(JmesPath.tokenize("a||b")).assertDeepEquals(
        [
          {
            type: "UnquotedIdentifier", value: "a", start: 0
          },
          {
            type: "Or", value: "||", start: 1
          },
          {
            type: "UnquotedIdentifier", value: "b", start: 3
          }
        ]
      );
    });
    it('shouldTokenizeFunctionCalls', 0, () => {
      expect(JmesPath.tokenize("abs(@)")).assertDeepEquals(
        [
          {
            type: "UnquotedIdentifier", value: "abs", start: 0
          },
          {
            type: "Lparen", value: "(", start: 3
          },
          {
            type: "Current", value: "@", start: 4
          },
          {
            type: "Rparen", value: ")", start: 5
          }
        ]
      );
    });
  });
}