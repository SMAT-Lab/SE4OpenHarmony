/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium'
import xml2js from 'xml2js'


export default function abilityTest() {
  describe('Xml2jsTest', () => {

    it('parseString_1', 0, () => {
      let xmlString: string = '<root>Hello xml2js!</root>'
      xml2js.parseString(xmlString, (err: ESObject, result: ESObject) => {
        expect('Hello xml2js!').assertEqual(result.root)
      })
    })

    it('parseString_2', 0, () => {
      let xmlString: string = ''
      xml2js.parseString(xmlString, (err: ESObject, result: ESObject) => {
        expect(result).assertNull()
      })
    })

    it('parseString_3', 0, () => {
      let xmlString: string = '1'
      xml2js.parseString(xmlString, (err: ESObject, result: ESObject) => {
        expect(result).assertUndefined()
      })
    })

    it('parseString_4', 0, () => {
      let xmlString: string = '<root>Hello xml2js!<root>'
      xml2js.parseString(xmlString, (err: ESObject, result: ESObject) => {
        expect(result).assertUndefined()
      })
    })


    it('parseString_5', 0, () => {
      let xmlString: string = '<root><text>Hello xml2js!</text><Foo:Bar/><test1>123.123</test1><test2>true</test2></root>'

      let nameToUpperCase = (name: string) => {
        return name.toLocaleUpperCase();
      }

      xml2js.parseString(xmlString, {
        tagNameProcessors: [nameToUpperCase],
        attrNameProcessors: [nameToUpperCase],
        valueProcessors: [nameToUpperCase],
        attrValueProcessors: [nameToUpperCase]
      }, (err: ESObject, result: ESObject) => {
        expect(result.ROOT.TEXT.length).assertEqual(1)
      })
    })

    it('parseString_6', 0, () => {
      let xmlString: string = '<root><text>Hello xml2js!</text><Foo:Bar/><test1>123.123</test1><test2>true</test2></root>'

      xml2js.parseString(xmlString, {
        tagNameProcessors: [xml2js.processors.normalize],
        attrNameProcessors: [xml2js.processors.normalize],
        valueProcessors: [xml2js.processors.normalize],
        attrValueProcessors: [xml2js.processors.normalize]
      }, (err: ESObject, result: ESObject) => {
        expect(result.root.text.length).assertEqual(1)
      })
    })


    it('parseStringPromise_1', 0, () => {
      let xmlString: string = '<root>Hello xml2js!</root>'
      xml2js.parseStringPromise(xmlString).then((result: ESObject) => {
        expect('Hello xml2js!').assertEqual(result.root)
      })
    })

    it('parseStringPromise_2', 0, () => {
      let xmlString: string = ''
      xml2js.parseStringPromise(xmlString).then((result: ESObject) => {
        expect(result).assertNull()
      })
    })

    it('parseStringPromise_3', 0, () => {
      let xmlString: string = '1'
      xml2js.parseStringPromise(xmlString).then((result: ESObject) => {
        expect(result).assertUndefined()
      })
    })

    it('parseStringPromise_4', 0, () => {
      let xmlString: string = '<root>Hello xml2js!<root>'
      xml2js.parseStringPromise(xmlString).then((result: ESObject) => {
        expect(result).assertUndefined()
      })
    })

    it('xmlBuilder_1', 0, () => {
      let obj: ESObject = {
        name: "Super", Surname: "Man", age: 23
      } as ESObject;
      let builder: ESObject = new xml2js.Builder();
      expect(builder.buildObject(obj)).assertContain('name')
    })

    it('xmlBuilder_2', 0, () => {
      let obj: ESObject = {
        root: {
          $: {
            id: "my id"
          } as ESObject, _: "my inner text"
        } as ESObject
      } as ESObject;
      let builder: ESObject = new xml2js.Builder();
      expect(builder.buildObject(obj)).assertContain('id')
    })

    it('xmlBuilder_3', 0, () => {
      let obj: ESObject = {
        Foo: {
          $: {
            xmlns: "http://foo.com"
          } as ESObject
        } as ESObject
      } as ESObject;
      let builder: ESObject = new xml2js.Builder();
      expect(builder.buildObject(obj)).assertContain('Foo')
    })

    it('xmlBuilder_4', 0, () => {
      let obj: ESObject = {
        foo: {
          $: {
            foo: 'http://foo.com'
          } as ESObject,
          bar: {
            $: {
              bar: 'http://bar.com'
            } as ESObject
          } as ESObject
        } as ESObject
      } as ESObject
      let builder: ESObject = new xml2js.Builder();
      expect(builder.buildObject(obj)).assertContain('bar')
    })


    let time: number = 0
    let printTime = (isEnd: boolean, tag?: string) => {
      if (isEnd) {
        console.info(tag, 'useTime:' + (Date.now() - time))
      } else {
        time = Date.now()
      }
    }

    it('xml2js_useTime', 0, () => {

      let xmlString: string = '<root>Hello xml2js!<root>'
      printTime(false)
      xml2js.parseString(xmlString, (err: ESObject, result: ESObject) => {})
      printTime(true, 'parseString')

      printTime(false)
      xml2js.parseStringPromise(xmlString)
      printTime(true, 'parseStringPromise')


      let obj: ESObject = {
        name: "Super", Surname: "Man", age: 23
      } as ESObject;
      let builder: ESObject = new xml2js.Builder();

      printTime(false)
      builder.buildObject(obj)
      printTime(true, 'buildObject')

    })
  })
}