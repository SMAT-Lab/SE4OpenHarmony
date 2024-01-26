/**
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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

import validator from 'validator';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium'
import { SanOptions } from './sanOptionsTest'
import { getKeys } from './getKeysTest'

export default function SanitizersTest() {
  describe('Sanitizers', () => {
    // Defines a test suite. Two parameters are supported: test suite name and test suite function.
    beforeAll(() => {
      // Presets an action, which is performed only once before all test cases of the test suite start.
      // This API supports only one parameter: preset action function.
    })
    beforeEach(() => {
      // Presets an action, which is performed before each unit test case starts.
      // The number of execution times is the same as the number of test cases defined by **it**.
      // This API supports only one parameter: preset action function.
    })
    afterEach(() => {
      // Presets a clear action, which is performed after each unit test case ends.
      // The number of execution times is the same as the number of test cases defined by **it**.
      // This API supports only one parameter: clear action function.
    })
    afterAll(() => {
      // Presets a clear action, which is performed after all test cases of the test suite end.
      // This API supports only one parameter: clear action function.
    })

    let test = (options:SanOptions) => {
      const args= options.args|| [];

      args.unshift(null);
      let objKeys: string[] = getKeys(options.expect);
      objKeys.forEach((input) => {
        args[0] = input;
        let result: string | number | boolean = validator[options.sanitizer](...args);
        let expected = options.expect[input];

        if (Number.isNaN(result) && Number.isNaN(expected)) {
          if (typeof result !=='string' && typeof result !=='object') {
            expect(result).assertNaN()
            return;
          }
        }
        expect(result).assertEqual(expected)
      });
    }

    it('should_sanitize_boolean_strings', 0, () => {
      test({
        sanitizer: 'toBoolean',
        expect: {
          0: false,
          '': false,
          1: true,
          true: true,
          True: true,
          TRUE: true,
          foobar: true,
          '   ': true,
          false: false,
          False: false,
          FALSE: false,
        },
      });
      test({
        sanitizer: 'toBoolean',
        args: [true], // strict
        expect: {
          0: false,
          '': false,
          1: true,
          true: true,
          True: true,
          TRUE: true,
          foobar: false,
          '   ': false,
          false: false,
          False: false,
          FALSE: false,
        },
      });
    });

    it('should_trim_whitespace', 0, () => {
      let option3: SanOptions = new SanOptions();
      option3.sanitizer = 'trim';
      option3.expect = {
        '  \r\n\tfoo  \r\n\t   ': 'foo',
        '      \r': '',
      };
      test(option3);

      let option4: SanOptions = new SanOptions();
      option4.sanitizer = 'ltrim';
      option4.expect = {
        '  \r\n\tfoo  \r\n\t   ': 'foo  \r\n\t   ',
        '   \t  \n': '',
      };
      test(option4);

      let option5: SanOptions = new SanOptions();
      option5.sanitizer = 'rtrim';
      option5.expect = {
        '  \r\n\tfoo  \r\n\t   ': '  \r\n\tfoo',
        ' \r\n  \t': '',
      };
      test(option5);
    });

    it('should_trim_custom_characters', 0, () => {
      let option6: SanOptions = new SanOptions();
      option6.sanitizer = 'trim';
      option6.args = ['01'];
      option6.expect = {
        '010100201000': '2'
      };
      test(option6);

      let option7: SanOptions = new SanOptions();
      option7.sanitizer = 'ltrim';
      option7.args = ['01']
      option7.expect = {
        '010100201000': '201000'
      };
      test(option7);

      let option8: SanOptions = new SanOptions();
      option8.sanitizer = 'ltrim';
      option8.args = ['\\S'];
      option8.expect = {
        '\\S01010020100001': '01010020100001'
      };
      test(option8);

      let option9: SanOptions = new SanOptions();
      option9.sanitizer = 'rtrim';
      option9.args = ['01'];
      option9.expect = {
        '010100201000': '0101002'
      }
      test(option9);

      let option10: SanOptions = new SanOptions();
      option10.sanitizer = 'rtrim';
      option10.args = ['\\S'];
      option10.expect = {
        '01010020100001\\S': '01010020100001'
      }
      test(option10);
    });

    it('should_convert_strings_to_integers', 0, () => {
      let option11: SanOptions = new SanOptions();
      option11.sanitizer = 'toInt';
      option11.expect = {
        3: 3,
        ' 3 ': 3,
        2.4: 2,
        foo: Number.NaN,
      }
      test(option11);

      let option12: SanOptions = new SanOptions();
      option12.sanitizer = 'toInt';
      option12.args = [16];
      option12.expect = {
        ff: 255
      }
      test(option12);
    });

    it('should_convert_strings_to_floats', 0, () => {
      let option13: SanOptions = new SanOptions();
      option13.sanitizer = 'toFloat';
      option13.expect = {
        2: 2.0,
        '2.': 2.0,
        '-2.5': -2.5,
        '.5': 0.5,
        '2020-01-06T14:31:00.135Z': Number.NaN,
        foo: Number.NaN,
      }
      test(option13);
    });

    it('should_escape_HTML', 0, () => {
      let option14: SanOptions = new SanOptions();
      option14.sanitizer = 'escape';
      option14.expect = {
        '<script> alert("xss&fun"); </script>':
        '&lt;script&gt; alert(&quot;xss&amp;fun&quot;); &lt;&#x2F;script&gt;',

        "<script> alert('xss&fun'); </script>":
        '&lt;script&gt; alert(&#x27;xss&amp;fun&#x27;); &lt;&#x2F;script&gt;',

        'Backtick: `':
        'Backtick: &#96;',

        'Backslash: \\':
        'Backslash: &#x5C;',
      }
      test(option14);
    });

    it('should_unescape_HTML', 0, () => {
      let option15: SanOptions = new SanOptions();
      option15.sanitizer = 'unescape';
      option15.expect = {
        '&lt;script&gt; alert(&quot;xss&amp;fun&quot;); &lt;&#x2F;script&gt;':
        '<script> alert("xss&fun"); </script>',

        '&lt;script&gt; alert(&#x27;xss&amp;fun&#x27;); &lt;&#x2F;script&gt;':
        "<script> alert('xss&fun'); </script>",

        'Backtick: &#96;':
        'Backtick: `',

        'Escaped string: &amp;lt;':
        'Escaped string: &lt;',
      };
      test(option15);
    });

    it('should_remove_control_characters_32_and_127', 0, () => {
      // Check basic functionality
      let option16: SanOptions = new SanOptions();
      option16.sanitizer = 'stripLow';
      option16.expect = {
        'foo\x00': 'foo',
        '\x7Ffoo\x02': 'foo',
        '\x01\x09': '',
        'foo\x0A\x0D': 'foo',
      };
      test(option16);
      // Unicode safety
      let option17: SanOptions = new SanOptions();
      option17.sanitizer = 'stripLow';
      option17.expect = {
        perché: 'perch\u00e9',
        '\u20ac': '\u20ac',
        '\u2206\x0A': '\u2206',
        '\ud83d\ude04': '\ud83d\ude04',
      };
      test(option17);
      // Preserve newlines
      let option18: SanOptions = new SanOptions();
      option18.sanitizer = 'stripLow';
      option18.args = [true];
      option18.expect = {
        'foo\x0A\x0D': 'foo\x0A\x0D',
        '\x03foo\x0A\x0D': 'foo\x0A\x0D',
      };
      test(option18);
    });

    it('should_sanitize_a_string_based_on_a_whitelist', 0, () => {
      let option19: SanOptions = new SanOptions();
      option19.sanitizer = 'whitelist';
      option19.args = ['abc'];
      option19.expect = {
        abcdef: 'abc',
        aaaaaaaaaabbbbbbbbbb: 'aaaaaaaaaabbbbbbbbbb',
        a1b2c3: 'abc',
        '   ': '',
      };
      test(option19);
    });

    it('should_sanitize_a_string_based_on_a_blacklist', 0, () => {
      let option20: SanOptions = new SanOptions();
      option20.sanitizer = 'blacklist';
      option20.args = ['abc'];
      option20.expect = {
        abcdef: 'def',
        aaaaaaaaaabbbbbbbbbb: '',
        a1b2c3: '123',
        '   ': '   ',
      };
      test(option20);
    });

    it('should_score_passwords', 0, () => {
      let option21: SanOptions = new SanOptions();
      option21.sanitizer = 'isStrongPassword';
      option21.args = [{
        returnScore: true,
        pointsPerUnique: 1,
        pointsPerRepeat: 0.5,
        pointsForContainingLower: 10,
        pointsForContainingUpper: 10,
        pointsForContainingNumber: 10,
        pointsForContainingSymbol: 10,
      }];
      option21.expect = {
        abc: 13,
        abcc: 13.5,
        aBc: 23,
        'Abc123!': 47,
        '!@#$%^&*()': 20,
      };
      test(option21);
    });

    it('should_score_passwords_with_default_options', 0, () => {
      let option22: SanOptions = new SanOptions();
      option22.sanitizer = 'isStrongPassword';
      option22.expect = {
        abc: false,
        abcc: false,
        aBc: false,
        'Abc123!': false,
        '!@#$%^&*()': false,
        'abc123!@f#rA': true,
      };
      test(option22);
    });

    it('should_normalize_an_email_based_on_domain', 0, () => {
      let option23: SanOptions = new SanOptions();
      option23.sanitizer = 'normalizeEmail';
      option23.expect = {
        'test@me.com': 'test@me.com',
        'some.name@gmail.com': 'somename@gmail.com',
        'some.name@googleMail.com': 'somename@gmail.com',
        'some.name+extension@gmail.com': 'somename@gmail.com',
        'some.Name+extension@GoogleMail.com': 'somename@gmail.com',
        'some.name.middleName+extension@gmail.com': 'somenamemiddlename@gmail.com',
        'some.name.middleName+extension@GoogleMail.com': 'somenamemiddlename@gmail.com',
        'some.name.midd.leNa.me.+extension@gmail.com': 'somenamemiddlename@gmail.com',
        'some.name.midd.leNa.me.+extension@GoogleMail.com': 'somenamemiddlename@gmail.com',
        'some.name+extension@unknown.com': 'some.name+extension@unknown.com',
        'hans@m端ller.com': 'hans@m端ller.com',
        'some.name.midd..leNa...me...+extension@GoogleMail.com': 'somenamemidd..lena...me...@gmail.com',
        'matthew..example@gmail.com': 'matthew..example@gmail.com',
        '"foo@bar"@baz.com': '"foo@bar"@baz.com',
        'test@ya.ru': 'test@yandex.ru',
        'test@yandex.kz': 'test@yandex.ru',
        'test@yandex.ru': 'test@yandex.ru',
        'test@yandex.ua': 'test@yandex.ru',
        'test@yandex.com': 'test@yandex.ru',
        'test@yandex.by': 'test@yandex.ru',
        '@gmail.com': false,
        '@icloud.com': false,
        '@outlook.com': false,
        '@yahoo.com': false,
      };
      test(option23);

      // Testing all_lowercase switch, should apply to domains not known to be case-insensitive
      let option24: SanOptions = new SanOptions();
      option24.sanitizer = 'normalizeEmail';
      option24.args = [{
        all_lowercase: false
      }]
      option24.expect = {
        'test@foo.com': 'test@foo.com',
        'hans@m端ller.com': 'hans@m端ller.com',
        'test@FOO.COM': 'test@foo.com', // Hostname is always lowercased
        'blAH@x.com': 'blAH@x.com',
        // In case of domains that are known to be case-insensitive, there's a separate switch
        'TEST@me.com': 'test@me.com',
        'TEST@ME.COM': 'test@me.com',
        'SOME.name@GMAIL.com': 'somename@gmail.com',
        'SOME.name.middleName+extension@GoogleMail.com': 'somenamemiddlename@gmail.com',
        'SOME.name.midd.leNa.me.+extension@gmail.com': 'somenamemiddlename@gmail.com',
        'SOME.name@gmail.com': 'somename@gmail.com',
        'SOME.name@yahoo.ca': 'some.name@yahoo.ca',
        'SOME.name@outlook.ie': 'some.name@outlook.ie',
        'SOME.name@me.com': 'some.name@me.com',
        'SOME.name@yandex.ru': 'some.name@yandex.ru',
      };
      test(option24);

      // Testing *_lowercase
      let option25: SanOptions = new SanOptions();
      option25.sanitizer = 'normalizeEmail';
      option25.args = [{
        all_lowercase: false,
        gmail_lowercase: false,
        icloud_lowercase: false,
        outlookdotcom_lowercase: false,
        yahoo_lowercase: false,
        yandex_lowercase: false,
      }];
      option25.expect = {
        'TEST@FOO.COM': 'TEST@foo.com', // all_lowercase
        'ME@gMAil.com': 'ME@gmail.com', // gmail_lowercase
        'ME@me.COM': 'ME@me.com', // icloud_lowercase
        'ME@icloud.COM': 'ME@icloud.com', // icloud_lowercase
        'ME@outlook.COM': 'ME@outlook.com', // outlookdotcom_lowercase
        'JOHN@live.CA': 'JOHN@live.ca', // outlookdotcom_lowercase
        'ME@ymail.COM': 'ME@ymail.com', // yahoo_lowercase
        'ME@yandex.RU': 'ME@yandex.ru', // yandex_lowercase
      };
      test(option25);

      // Testing all_lowercase
      // Should overwrite all the *_lowercase options
      let option26: SanOptions = new SanOptions();
      option26.sanitizer = 'normalizeEmail';
      option26.args = [{
        all_lowercase: true,
        gmail_lowercase: false, // Overruled
        icloud_lowercase: false, // Overruled
        outlookdotcom_lowercase: false, // Overruled
        yahoo_lowercase: false, // Overruled
      }];
      option26.expect = {
        'TEST@FOO.COM': 'test@foo.com', // all_lowercase
        'ME@gMAil.com': 'me@gmail.com', // gmail_lowercase
        'ME@me.COM': 'me@me.com', // icloud_lowercase
        'ME@icloud.COM': 'me@icloud.com', // icloud_lowercase
        'ME@outlook.COM': 'me@outlook.com', // outlookdotcom_lowercase
        'JOHN@live.CA': 'john@live.ca', // outlookdotcom_lowercase
        'ME@ymail.COM': 'me@ymail.com', // yahoo_lowercase
      };
      test(option26);

      // Testing *_remove_dots
      let option27: SanOptions = new SanOptions();
      option27.sanitizer = 'normalizeEmail';
      option27.args = [{
        gmail_remove_dots: false,
      }];
      option27.expect = {
        'SOME.name@GMAIL.com': 'some.name@gmail.com',
        'SOME.name+me@GMAIL.com': 'some.name@gmail.com',
        'my.self@foo.com': 'my.self@foo.com',
      };
      test(option27);

      let option28: SanOptions = new SanOptions();
      option28.sanitizer = 'normalizeEmail';
      option28.args = [{
        gmail_remove_dots: true,
      }];
      option28.expect = {
        'SOME.name@GMAIL.com': 'somename@gmail.com',
        'SOME.name+me@GMAIL.com': 'somename@gmail.com',
        'some.name..multiple@gmail.com': 'somename..multiple@gmail.com',
        'my.self@foo.com': 'my.self@foo.com',
      };
      test(option28);

      // Testing *_remove_subaddress
      let option29: SanOptions = new SanOptions();
      option29.sanitizer = 'normalizeEmail';
      option29.args = [{
        gmail_remove_subaddress: false,
        icloud_remove_subaddress: false,
        outlookdotcom_remove_subaddress: false,
        yahoo_remove_subaddress: false, // Note Yahoo uses "-"
      }];
      option29.expect = {
        'foo+bar@unknown.com': 'foo+bar@unknown.com',
        'foo+bar@gmail.com': 'foo+bar@gmail.com', // gmail_remove_subaddress
        'foo+bar@me.com': 'foo+bar@me.com', // icloud_remove_subaddress
        'foo+bar@icloud.com': 'foo+bar@icloud.com', // icloud_remove_subaddress
        'foo+bar@live.fr': 'foo+bar@live.fr', // outlookdotcom_remove_subaddress
        'foo+bar@hotmail.co.uk': 'foo+bar@hotmail.co.uk', // outlookdotcom_remove_subaddress
        'foo-bar@yahoo.com': 'foo-bar@yahoo.com', // yahoo_remove_subaddress
        'foo+bar@yahoo.com': 'foo+bar@yahoo.com', // yahoo_remove_subaddress
      };
      test(option29);

      let option30: SanOptions = new SanOptions();
      option30.sanitizer = 'normalizeEmail';
      option30.args = [{
        gmail_remove_subaddress: true,
        icloud_remove_subaddress: true,
        outlookdotcom_remove_subaddress: true,
        yahoo_remove_subaddress: true, // Note Yahoo uses "-"
      }];
      option30.expect = {
        'foo+bar@unknown.com': 'foo+bar@unknown.com',
        'foo+bar@gmail.com': 'foo@gmail.com', // gmail_remove_subaddress
        'foo+bar@me.com': 'foo@me.com', // icloud_remove_subaddress
        'foo+bar@icloud.com': 'foo@icloud.com', // icloud_remove_subaddress
        'foo+bar@live.fr': 'foo@live.fr', // outlookdotcom_remove_subaddress
        'foo+bar@hotmail.co.uk': 'foo@hotmail.co.uk', // outlookdotcom_remove_subaddress
        'foo-bar@yahoo.com': 'foo@yahoo.com', // yahoo_remove_subaddress
        'foo+bar@yahoo.com': 'foo+bar@yahoo.com', // yahoo_remove_subaddress
      };
      test(option30);

      // Testing gmail_convert_googlemaildotcom
      let option31: SanOptions = new SanOptions();
      option31.sanitizer = 'normalizeEmail';
      option31.args = [{
        gmail_convert_googlemaildotcom: false,
      }];
      option31.expect = {
        'SOME.name@GMAIL.com': 'somename@gmail.com',
        'SOME.name+me@GMAIL.com': 'somename@gmail.com',
        'SOME.name+me@googlemail.com': 'somename@googlemail.com',
        'SOME.name+me@googlemail.COM': 'somename@googlemail.com',
        'SOME.name+me@googlEmail.com': 'somename@googlemail.com',
        'my.self@foo.com': 'my.self@foo.com',
      };
      test(option31);

      let option32: SanOptions = new SanOptions();
      option32.sanitizer = 'normalizeEmail';
      option32.args = [{
        gmail_convert_googlemaildotcom: true,
      }];
      option32.expect = {
        'SOME.name@GMAIL.com': 'somename@gmail.com',
        'SOME.name+me@GMAIL.com': 'somename@gmail.com',
        'SOME.name+me@googlemail.com': 'somename@gmail.com',
        'SOME.name+me@googlemail.COM': 'somename@gmail.com',
        'SOME.name+me@googlEmail.com': 'somename@gmail.com',
        'my.self@foo.com': 'my.self@foo.com',
      };
      test(option32);
    });
  });
}
