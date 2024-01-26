/**
 * Copyright (C) 2024 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * */

import { describe, it, expect } from '@ohos/hypium'
import parse from 'minimist'

export default function boolTest() {

  describe('minimist_bool', ()=> {
    it('flag_boolean_default_false', 0, ()=> {
     let argv:ESObject= parse(['moo'], {
        boolean: ['t', 'verbose'] as string[], string: "_",
        default: {
          verbose: false, t: false
        }
      });
      expect(argv).assertDeepEquals({
        verbose: false,
        t: false,
        _: ['moo']
      } as ESObject)
      expect(typeof argv.verbose).assertEqual('boolean')
      expect(typeof argv.t).assertEqual('boolean')
    });

    it('boolean_groups', 0, ()=> {
      let argv: ESObject = parse(['-x', '-z', 'one', 'two', 'three'], {
        boolean: ['x', 'y', 'z'], string: "_"
      });
      expect(argv).assertDeepEquals({
        x: true,
        y: false,
        z: true,
        _: ['one', 'two', 'three']
      })
      expect(typeof argv.x).assertEqual('boolean')
      expect(typeof argv.y).assertEqual('boolean')
      expect(typeof argv.z).assertEqual('boolean')

    });
    it('boolean_and_alias_with_chainable_api', 0, ()=> {
      let aliased: string[] = ['-h', 'derp'];
      let regular: string[] = ['--herp', 'derp'];
      let opts: ESObject = {
        herp: {
          alias: 'h', boolean: true
        } as ESObject
      };
      let aliasedArgv: ESObject = parse(aliased, {
        boolean: 'herp', string: "_",
        alias: {
          h: 'herp'
        } as ESObject
      });
      let propertyArgv: ESObject = parse(regular, {
        boolean: 'herp', string: "_",
        alias: {
          h: 'herp'
        }
      });
      let expected: ESObject = {
        herp: true,
        h: true,
        _: ['derp']
      };
      expect(aliasedArgv).assertDeepEquals(expected)
      expect(propertyArgv).assertDeepEquals(expected)

    });

    it('boolean_and_alias_with_options_hash', 0, ()=> {
      let aliased: string[] = ['-h', 'derp'];
      let regular: string[] = ['--herp', 'derp'];
      let opts: ESObject = {
        string: "_",
        alias: {
          h: 'herp'
        } as ESObject,
        boolean: 'herp'
      };
      let aliasedArgv: ESObject = parse(aliased, opts);
      let propertyArgv: ESObject = parse(regular, opts);
      let expected: ESObject = {
        herp: true,
        h: true,
        _: ['derp']
      };
      expect(aliasedArgv).assertDeepEquals(expected)
      expect(propertyArgv).assertDeepEquals(expected)
    });

    it('boolean_and_alias_array_with_options_hash', 0, ()=> {
      let aliased: string[] = ['-h', 'derp'];
      let regular: string[] = ['--herp', 'derp'];
      let alt: string[] = ['--harp', 'derp'];
      let opts: ESObject = {
        alias: {
          h: ['herp', 'harp']
        } as ESObject,
        boolean: 'h', string: "_"
      };
      let aliasedArgv: ESObject = parse(aliased, opts);
      let propertyArgv: ESObject = parse(regular, opts);
      let altPropertyArgv: ESObject = parse(alt, opts);
      let expected: ESObject = {
        harp: true,
        herp: true,
        h: true,
        _: ['derp']
      };

      expect(aliasedArgv).assertDeepEquals(expected)
      expect(propertyArgv).assertDeepEquals(expected)
      expect(altPropertyArgv).assertDeepEquals(expected)
    });

    it('boolean_and_alias_using_explicit_true', 0, ()=> {
      let aliased: string[] = ['-h', 'true'];
      let regular: string[] = ['--herp', 'true'];
      let opts: ESObject = {
        alias: {
          h: 'herp'
        } as ESObject,
        boolean: 'h', string: "_"
      };
      let aliasedArgv: ESObject = parse(aliased, opts);
      let propertyArgv: ESObject = parse(regular, opts);
      let expected: ESObject = {
        herp: true,
        h: true,
        _: []
      };

      expect(aliasedArgv).assertDeepEquals(expected)
      expect(propertyArgv).assertDeepEquals(expected)
    });

    // regression, see https://github.com/substack/node-optimist/issues/71
    it('boolean_and_x_true', 0, ()=> {
      let parsed: ESObject = parse(['--boool', '--other=true'], {
        boolean: 'boool', string: "_"
      });
      expect(parsed.boool).assertTrue()
      expect(parsed.other).assertEqual('true')

      parsed = parse(['--boool', '--other=false'], {
        boolean: 'boool', string: "_"
      });

      expect(parsed.boool).assertTrue()
      expect(parsed.other).assertEqual('false')
    });

    it('boolean_boool_true', 0, ()=> {
      let parsed: ESObject = parse(['--boool=true'], {
        default: {
          boool: false
        },
        boolean: ['boool'], string: "_"
      });

      expect(parsed.boool).assertTrue()

    });

    it('boolean_boool_false', 0, ()=> {
      let parsed: ESObject = parse(['--boool=false'], {
        default: {
          boool: true
        },
        boolean: ['boool'], string: "_"
      });

      expect(parsed.boool).assertFalse()
    });

    it('boolean_using_something_similar_to_true', 0, ()=> {
      let opts: ESObject = {
        boolean: 'h', string: "_"
      };
      let result: ESObject = parse(['-h', 'true.txt'], opts);
      let expected: ESObject = {
        h: true,
        _: ['true.txt']
      };
      expect(result).assertDeepEquals(expected)
    });
  })
}