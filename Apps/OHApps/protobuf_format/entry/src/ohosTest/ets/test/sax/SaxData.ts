/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
import sax from '@ohos/sax'

const attributeNameTestData = {
  xml: "<root length='12345'></root>",
  expect: [
    ['opentagstart', {
      name: 'root', attributes: {}, ns: {}
    }],
    [
      'attribute',
      {
        name: 'length',
        value: '12345',
        prefix: '',
        local: 'length',
        uri: ''
      }
    ],
    [
      'opentag',
      {
        name: 'root',
        attributes: {
          length: {
            name: 'length',
            value: '12345',
            prefix: '',
            local: 'length',
            uri: ''
          }
        },
        ns: {},
        prefix: '',
        local: 'root',
        uri: '',
        isSelfClosing: false
      }
    ],
    [
      'closetag',
      'root'
    ]
  ],
  strict: true,
  opt: {
    xmlns: true
  }
}

const attributeNoSpaceData1 = {
  xml: '<root attr1="first"attr2="second"/>',
  expect: [
    ['opentagstart', {
      name: 'root', attributes: {}
    }],
    ['attribute', {
      name: 'attr1', value: 'first'
    }],
    ['attribute', {
      name: 'attr2', value: 'second'
    }],
    ['opentag', {
      name: 'root', attributes: {
        attr1: 'first', attr2: 'second'
      }, isSelfClosing: true
    }],
    ['closetag', 'root']
  ],
  strict: false,
  opt: {
    lowercase: true
  }
}

const attributeNoSpaceData2 = {
  xml: '<root attr1="first"attr2="second"/>',
  expect: [
    ['opentagstart', {
      name: 'root', attributes: {}
    }],
    ['attribute', {
      name: 'attr1', value: 'first'
    }],
    ['error', 'No whitespace between attributes\nLine: 0\nColumn: 20\nChar: a'],
    ['attribute', {
      name: 'attr2', value: 'second'
    }],
    ['opentag', {
      name: 'root', attributes: {
        attr1: 'first', attr2: 'second'
      }, isSelfClosing: true
    }],
    ['closetag', 'root']
  ],
  strict: true,
  opt: {}
}

const attributeNoSpaceData3 = {
  xml: '<root attr1="first" attr2="second"/>',
  expect: [
    ['opentagstart', {
      name: 'root', attributes: {}
    }],
    ['attribute', {
      name: 'attr1', value: 'first'
    }],
    ['attribute', {
      name: 'attr2', value: 'second'
    }],
    ['opentag', {
      name: 'root', attributes: {
        attr1: 'first', attr2: 'second'
      }, isSelfClosing: true
    }],
    ['closetag', 'root']
  ],
  strict: true,
  opt: {}
}

const attributeNoSpaceData4 = {
  xml: '<root attr1="first"\nattr2="second"/>',
  expect: [
    ['opentagstart', {
      name: 'root', attributes: {}
    }],
    ['attribute', {
      name: 'attr1', value: 'first'
    }],
    ['attribute', {
      name: 'attr2', value: 'second'
    }],
    ['opentag', {
      name: 'root', attributes: {
        attr1: 'first', attr2: 'second'
      }, isSelfClosing: true
    }],
    ['closetag', 'root']
  ],
  strict: true,
  opt: {}
}

const attributeNoSpaceData5 = {
  xml: '<root attr1="first"  attr2="second"/>',
  expect: [
    ['opentagstart', {
      name: 'root', attributes: {}
    }],
    ['attribute', {
      name: 'attr1', value: 'first'
    }],
    ['attribute', {
      name: 'attr2', value: 'second'
    }],
    ['opentag', {
      name: 'root', attributes: {
        attr1: 'first', attr2: 'second'
      }, isSelfClosing: true
    }],
    ['closetag', 'root']
  ],
  strict: true,
  opt: {}
}

const attributeUnquotedData = {
  expect: [
    ['opentagstart', {
      name: 'ROOT', attributes: {}, ns: {}
    }],
    ['attribute', {
      name: 'LENGTH',
      value: '12345',
      prefix: '',
      local: 'LENGTH',
      uri: ''
    }],
    ['opentag', {
      name: 'ROOT',
      attributes: {
        LENGTH: {
          name: 'LENGTH',
          value: '12345',
          prefix: '',
          local: 'LENGTH',
          uri: ''
        }
      },
      ns: {},
      prefix: '',
      local: 'ROOT',
      uri: '',
      isSelfClosing: false
    }],
    ['closetag', 'ROOT'],
    ['end'],
    ['ready']
  ],
  strict: false,
  opt: {
    xmlns: true
  }
}

const cdataTestData = {
  xml: '<r><![CDATA[ this is character data  ]]></r>',
  expect: [
    ['opentagstart', {
      'name': 'R', 'attributes': {}
    }],
    ['opentag', {
      'name': 'R', 'attributes': {}, 'isSelfClosing': false
    }],
    ['opencdata', undefined],
    ['cdata', ' this is character data  '],
    ['closecdata', undefined],
    ['closetag', 'R']
  ]
}

const cdataChunkedTestData = {
  expect: [
    ['opentagstart', {
      'name': 'R', 'attributes': {}
    }],
    ['opentag', {
      'name': 'R', 'attributes': {}, 'isSelfClosing': false
    }],
    ['opencdata', undefined],
    ['cdata', ' this is character data  '],
    ['closecdata', undefined],
    ['closetag', 'R']
  ]
}

const cdataEndSplitTestData = {
  expect: [
    ['opentagstart', {
      'name': 'R', 'attributes': {}
    }],
    ['opentag', {
      'name': 'R', 'attributes': {}, 'isSelfClosing': false
    }],
    ['opencdata', undefined],
    ['cdata', ' this is '],
    ['closecdata', undefined],
    ['closetag', 'R']
  ]
}

const cdataFakeEndTestData1 = {
  expect: [
    ['opentagstart', {
      'name': 'R', 'attributes': {}
    }],
    ['opentag', {
      'name': 'R', 'attributes': {}, 'isSelfClosing': false
    }],
    ['opencdata', undefined],
    ['cdata', '[[[[[[[[]]]]]]]]'],
    ['closecdata', undefined],
    ['closetag', 'R']
  ]
}

const cdataFakeEndTestData2 = {
  expect: [
    ['opentagstart', {
      'name': 'R', 'attributes': {}
    }],
    ['opentag', {
      'name': 'R', 'attributes': {}, 'isSelfClosing': false
    }],
    ['opencdata', undefined],
    ['cdata', '[[[[[[[[]]]]]]]]'],
    ['closecdata', undefined],
    ['closetag', 'R']
  ]
}

const cdataMultipleTestData = {
  expect: [
    ['opentagstart', {
      'name': 'R', 'attributes': {}
    }],
    ['opentag', {
      'name': 'R', 'attributes': {}, 'isSelfClosing': false
    }],
    ['opencdata', undefined],
    ['cdata', ' this is '],
    ['closecdata', undefined],
    ['opencdata', undefined],
    ['cdata', 'character data  '],
    ['closecdata', undefined],
    ['closetag', 'R']
  ]
}

const entitiesTestData = {
  xml: '<r>&rfloor; ' +
  '&spades; &copy; &rarr; &amp; ' +
  '&lt; < <  <   < &gt; &real; &weierp; &euro;</r>',
  expect: [
    ['opentagstart', {
      'name': 'R', attributes: {}
    }],
    ['opentag', {
      'name': 'R', attributes: {}, isSelfClosing: false
    }],
    ['text', '⌋ ♠ © → & < < <  <   < > ℜ ℘ €'],
    ['closetag', 'R']
  ]
}
let xml = '<r>'
let text = ''
for (let i in sax.ENTITIES) {
  xml += '&' + i + ';'
  text += sax.ENTITIES[i]
}
xml += '</r>'

const entityMegaTestData = {
  xml: xml,
  expect: [
    ['opentagstart', {
      'name': 'R', attributes: {}
    }],
    ['opentag', {
      'name': 'R', attributes: {}, isSelfClosing: false
    }],
    ['text', text],
    ['closetag', 'R']
  ]
}

const entityNanTestData = {
  xml: '<r>&#NaN;</r>',
  expect: [
    ['opentagstart', {
      'name': 'R', attributes: {}
    }],
    ['opentag', {
      'name': 'R', attributes: {}, isSelfClosing: false
    }],
    ['text', '&#NaN;'],
    ['closetag', 'R']
  ]
}

const issue23TestData = {
  xml: '<compileClassesResponse>' +
  '<result>' +
  '<bodyCrc>653724009</bodyCrc>' +
  '<column>-1</column>' +
  '<id>01pG0000002KoSUIA0</id>' +
  '<line>-1</line>' +
  '<name>CalendarController</name>' +
  '<success>true</success>' +
  '</result>' +
  '</compileClassesResponse>',
  expect: [
    ['opentagstart', {
      name: 'COMPILECLASSESRESPONSE', attributes: {}
    }],
    ['opentag', {
      name: 'COMPILECLASSESRESPONSE', attributes: {}, isSelfClosing: false
    }],
    ['opentagstart', {
      name: 'RESULT', attributes: {}
    }],
    ['opentag', {
      name: 'RESULT', attributes: {}, isSelfClosing: false
    }],
    ['opentagstart', {
      name: 'BODYCRC', attributes: {}
    }],
    ['opentag', {
      name: 'BODYCRC', attributes: {}, isSelfClosing: false
    }],
    ['text', '653724009'],
    ['closetag', 'BODYCRC'],
    ['opentagstart', {
      name: 'COLUMN', attributes: {}
    }],
    ['opentag', {
      name: 'COLUMN', attributes: {}, isSelfClosing: false
    }],
    ['text', '-1'],
    ['closetag', 'COLUMN'],
    ['opentagstart', {
      name: 'ID', attributes: {}
    }],
    ['opentag', {
      name: 'ID', attributes: {}, isSelfClosing: false
    }],
    ['text', '01pG0000002KoSUIA0'],
    ['closetag', 'ID'],
    ['opentagstart', {
      name: 'LINE', attributes: {}
    }],
    ['opentag', {
      name: 'LINE', attributes: {}, isSelfClosing: false
    }],
    ['text', '-1'],
    ['closetag', 'LINE'],
    ['opentagstart', {
      name: 'NAME', attributes: {}
    }],
    ['opentag', {
      name: 'NAME', attributes: {}, isSelfClosing: false
    }],
    ['text', 'CalendarController'],
    ['closetag', 'NAME'],
    ['opentagstart', {
      name: 'SUCCESS', attributes: {}
    }],
    ['opentag', {
      name: 'SUCCESS', attributes: {}, isSelfClosing: false
    }],
    ['text', 'true'],
    ['closetag', 'SUCCESS'],
    ['closetag', 'RESULT'],
    ['closetag', 'COMPILECLASSESRESPONSE']
  ],
  strict: false,
  opt: {}
}

const issue30TestData = {
  xml: '<xml>\n' +
  '<!-- \n' +
  '  comment with a single dash- in it\n' +
  '-->\n' +
  '<data/>\n' +
  '</xml>',
  expect: [
    ['opentagstart', {
      name: 'xml', attributes: {}
    }],
    ['opentag', {
      name: 'xml', attributes: {}, isSelfClosing: false
    }],
    ['text', '\n'],
    ['comment', ' \n  comment with a single dash- in it\n'],
    ['text', '\n'],
    ['opentagstart', {
      name: 'data', attributes: {}
    }],
    ['opentag', {
      name: 'data', attributes: {}, isSelfClosing: true
    }],
    ['closetag', 'data'],
    ['text', '\n'],
    ['closetag', 'xml']
  ],
  strict: true,
  opt: {}
}

const issue35TestData = {
  xml: '<xml>&#Xd;&#X0d;\n</xml>',
  expect: [
    ['opentagstart', {
      name: 'xml', attributes: {}
    }],
    ['opentag', {
      name: 'xml', attributes: {}, isSelfClosing: false
    }],
    ['text', '\r\r\n'],
    ['closetag', 'xml']
  ],
  strict: true,
  opt: {}
}

const issue47TestData = {
  xml: '<a href="query.svc?x=1&y=2&z=3"/>',
  expect: [
    ['opentagstart', {
      name: 'A', attributes: {}
    }],
    ['attribute', {
      name: 'HREF', value: 'query.svc?x=1&y=2&z=3'
    }],
    ['opentag', {
      name: 'A', attributes: {
        HREF: 'query.svc?x=1&y=2&z=3'
      }, isSelfClosing: true
    }],
    ['closetag', 'A']
  ],
  opt: {}
}

const issue49TestData1 = {
  xml: '<xml><script>hello world</script></xml>',
  expect: [
    ['opentagstart', {
      name: 'xml', attributes: {}
    }],
    ['opentag', {
      name: 'xml', attributes: {}, isSelfClosing: false
    }],
    ['opentagstart', {
      name: 'script', attributes: {}
    }],
    ['opentag', {
      name: 'script', attributes: {}, isSelfClosing: false
    }],
    ['text', 'hello world'],
    ['closetag', 'script'],
    ['closetag', 'xml']
  ],
  strict: false,
  opt: {
    lowercasetags: true, noscript: true
  }
}

const issue49TestData2 = {
  xml: '<xml><script><![CDATA[hello world]]></script></xml>',
  expect: [
    ['opentagstart', {
      name: 'xml', attributes: {}
    }],
    ['opentag', {
      name: 'xml', attributes: {}, isSelfClosing: false
    }],
    ['opentagstart', {
      name: 'script', attributes: {}
    }],
    ['opentag', {
      name: 'script', attributes: {}, isSelfClosing: false
    }],
    ['opencdata', undefined],
    ['cdata', 'hello world'],
    ['closecdata', undefined],
    ['closetag', 'script'],
    ['closetag', 'xml']
  ],
  strict: false,
  opt: {
    lowercasetags: true, noscript: true
  }
}

const issue84TestData = {
  xml: '<?has unbalanced "quotes?><xml>body</xml>',
  expect: [
    ['processinginstruction', {
      name: 'has', body: 'unbalanced "quotes'
    }],
    ['opentagstart', {
      name: 'xml', attributes: {}
    }],
    ['opentag', {
      name: 'xml', attributes: {}, isSelfClosing: false
    }],
    ['text', 'body'],
    ['closetag', 'xml']
  ],
  strict: false,
  opt: {
    lowercasetags: true, noscript: true
  }
}

const issue86TestData1 = {
  xml: '<root>abc</root>de<f',
  expect: [
    [
      'opentagstart',
      {
        name: 'ROOT',
        attributes: {}
      }
    ],
    [
      'opentag',
      {
        name: 'ROOT',
        attributes: {},
        isSelfClosing: false
      }
    ],
    [
      'text',
      'abc'
    ],
    [
      'closetag',
      'ROOT'
    ],
    [
      'text',
      'de<f'
    ]
  ],
  strict: false,
  opt: {}
}

const issue86TestData2 = {
  xml: '<root>abc</root>de<f',
  expect: [
    [
      'opentagstart',
      {
        name: 'root',
        attributes: {}
      }
    ],
    [
      'opentag',
      {
        name: 'root',
        attributes: {},
        isSelfClosing: false
      }
    ],
    [
      'text',
      'abc'
    ],
    [
      'closetag',
      'root'
    ],
    [
      'error',
      'Text data outside of root node.\nLine: 0\nColumn: 17\nChar: d'
    ],
    [
      'text',
      'd'
    ],
    [
      'error',
      'Text data outside of root node.\nLine: 0\nColumn: 18\nChar: e'
    ],
    [
      'text',
      'e'
    ],
    [
      'error',
      'Unexpected end\nLine: 0\nColumn: 20\nChar: '
    ]
  ],
  strict: true,
  opt: {}
}

const selfClosingChildTestData = {
  xml: '<root>' +
  '<child>' +
  '<haha />' +
  '</child>' +
  '<monkey>' +
  '=(|)' +
  '</monkey>' +
  '</root>',
  expect: [
    ['opentagstart', {
      'name': 'ROOT',
      'attributes': {}
    }],
    ['opentag', {
      'name': 'ROOT',
      'attributes': {},
      'isSelfClosing': false
    }],
    ['opentagstart', {
      'name': 'CHILD',
      'attributes': {}
    }],
    ['opentag', {
      'name': 'CHILD',
      'attributes': {},
      'isSelfClosing': false
    }],
    ['opentagstart', {
      'name': 'HAHA',
      'attributes': {}
    }],
    ['opentag', {
      'name': 'HAHA',
      'attributes': {},
      'isSelfClosing': true
    }],
    ['closetag', 'HAHA'],
    ['closetag', 'CHILD'],
    ['opentagstart', {
      'name': 'MONKEY',
      'attributes': {}
    }],
    ['opentag', {
      'name': 'MONKEY',
      'attributes': {},
      'isSelfClosing': false
    }],
    ['text', '=(|)'],
    ['closetag', 'MONKEY'],
    ['closetag', 'ROOT'],
    ['end'],
    ['ready']
  ],
  strict: false,
  opt: {}
}

const selfClosingChildStrictTestData = {
  xml: '<root>' +
  '<child>' +
  '<haha />' +
  '</child>' +
  '<monkey>' +
  '=(|)' +
  '</monkey>' +
  '</root>',
  expect: [
    ['opentagstart', {
      'name': 'root',
      'attributes': {}
    }],
    ['opentag', {
      'name': 'root',
      'attributes': {},
      'isSelfClosing': false
    }],
    ['opentagstart', {
      'name': 'child',
      'attributes': {}
    }],
    ['opentag', {
      'name': 'child',
      'attributes': {},
      'isSelfClosing': false
    }],
    ['opentagstart', {
      'name': 'haha',
      'attributes': {}
    }],
    ['opentag', {
      'name': 'haha',
      'attributes': {},
      'isSelfClosing': true
    }],
    ['closetag', 'haha'],
    ['closetag', 'child'],
    ['opentagstart', {
      'name': 'monkey',
      'attributes': {}
    }],
    ['opentag', {
      'name': 'monkey',
      'attributes': {},
      'isSelfClosing': false
    }],
    ['text', '=(|)'],
    ['closetag', 'monkey'],
    ['closetag', 'root'],
    ['end'],
    ['ready']
  ],
  strict: true,
  opt: {}
}

const selfClosingTagTestData = {
  xml: '<root>   ' +
  '<haha /> ' +
  '<haha/>  ' +
  '<monkey> ' +
  '=(|)     ' +
  '</monkey>' +
  '</root>  ',
  expect: [
    ['opentagstart', {
      name: 'ROOT', attributes: {}
    }],
    ['opentag', {
      name: 'ROOT', attributes: {}, isSelfClosing: false
    }],
    ['opentagstart', {
      name: 'HAHA', attributes: {}
    }],
    ['opentag', {
      name: 'HAHA', attributes: {}, isSelfClosing: true
    }],
    ['closetag', 'HAHA'],
    ['opentagstart', {
      name: 'HAHA', attributes: {}
    }],
    ['opentag', {
      name: 'HAHA', attributes: {}, isSelfClosing: true
    }],
    ['closetag', 'HAHA'],
    // ["opentag", {name:"HAHA", attributes:{}}],
    // ["closetag", "HAHA"],
    ['opentagstart', {
      name: 'MONKEY', attributes: {}
    }],
    ['opentag', {
      name: 'MONKEY', attributes: {}, isSelfClosing: false
    }],
    ['text', '=(|)'],
    ['closetag', 'MONKEY'],
    ['closetag', 'ROOT']
  ],
  opt: {
    trim: true
  }
}

const xmlnsAsTagNameTestData = {
  xml: '<xmlns/>',
  expect: [
    [
      'opentagstart',
      {
        name: 'xmlns',
        attributes: {},
        ns: {}
      }
    ],
    [
      'opentag',
      {
        name: 'xmlns',
        attributes: {},
        ns: {},
        prefix: '',
        local: 'xmlns',
        uri: '',
        isSelfClosing: true
      }
    ],
    [
      'closetag',
      'xmlns'
    ]
  ],
  strict: true,
  opt: {
    xmlns: true
  }
}

// should be the same both ways.
let xmlnsIssue41Xmls = [
  '<parent xmlns:a="http://ATTRIBUTE" a:attr="value" />',
  '<parent a:attr="value" xmlns:a="http://ATTRIBUTE" />'
]

let xmlnsIssue41ex1 = [
  ['opentagstart', {
    name: 'parent', attributes: {}, ns: {}
  }],
  [
    'opennamespace',
    {
      prefix: 'a',
      uri: 'http://ATTRIBUTE'
    }
  ],
  [
    'attribute',
    {
      name: 'xmlns:a',
      value: 'http://ATTRIBUTE',
      prefix: 'xmlns',
      local: 'a',
      uri: 'http://www.w3.org/2000/xmlns/'
    }
  ],
  [
    'attribute',
    {
      name: 'a:attr',
      value: 'value',
      prefix: 'a',
      local: 'attr',
      uri: 'http://ATTRIBUTE'
    }
  ],
  [
    'opentag',
    {
      name: 'parent',
      attributes: {
        'a:attr': {
          name: 'a:attr',
          prefix: 'a',
          local: 'attr',
          uri: 'http://ATTRIBUTE',
          value: 'value'
        },
        'xmlns:a': {
          name: 'xmlns:a',
          prefix: 'xmlns',
          local: 'a',
          uri: 'http://www.w3.org/2000/xmlns/',
          value: 'http://ATTRIBUTE'
        }
      },
      ns: {
        a: 'http://ATTRIBUTE'
      },
      prefix: '',
      local: 'parent',
      uri: '',
      isSelfClosing: true
    }
  ],
  [
    'closetag',
    'parent'
  ],
  [
    'closenamespace',
    {
      prefix: 'a',
      uri: 'http://ATTRIBUTE'
    }
  ]
]

// swap the order of elements 2 and 3
let xmlnsIssue41ex2 = [xmlnsIssue41ex1[0], xmlnsIssue41ex1[1], xmlnsIssue41ex1[3], xmlnsIssue41ex1[2]].concat(xmlnsIssue41ex1.slice(4));

const xmlnsIssue41TestData = {
  xml: xmlnsIssue41Xmls[0],
  expect: xmlnsIssue41ex1,
  strict: true,
  opt: {
    xmlns: true
  }
}

const xmlnsIssue41TestData2 = {
  xml: xmlnsIssue41Xmls[1],
  expect: xmlnsIssue41ex2,
  strict: true,
  opt: {
    xmlns: true
  }
}

const xmlnsRebindingTestData = {
  xml: '<root xmlns:x="x1" xmlns:y="y1" x:a="x1" y:a="y1">' +
  '<rebind xmlns:x="x2">' +
  '<check x:a="x2" y:a="y1"/>' +
  '</rebind>' +
  '<check x:a="x1" y:a="y1"/>' +
  '</root>',
  expect: [
    [
      'opentagstart',
      {
        name: 'root',
        attributes: {},
        ns: {}
      }
    ],
    [
      'opennamespace',
      {
        prefix: 'x',
        uri: 'x1'
      }
    ],
    [
      'opennamespace',
      {
        prefix: 'y',
        uri: 'y1'
      }
    ],
    [
      'attribute',
      {
        name: 'xmlns:x',
        value: 'x1',
        uri: 'http://www.w3.org/2000/xmlns/',
        prefix: 'xmlns',
        local: 'x'
      }
    ],
    [
      'attribute',
      {
        name: 'xmlns:y',
        value: 'y1',
        uri: 'http://www.w3.org/2000/xmlns/',
        prefix: 'xmlns',
        local: 'y'
      }
    ],
    [
      'attribute',
      {
        name: 'x:a',
        value: 'x1',
        uri: 'x1',
        prefix: 'x',
        local: 'a'
      }
    ],
    [
      'attribute',
      {
        name: 'y:a',
        value: 'y1',
        uri: 'y1',
        prefix: 'y',
        local: 'a'
      }
    ],
    [
      'opentag',
      {
        name: 'root',
        uri: '',
        prefix: '',
        local: 'root',
        attributes: {
          'xmlns:x': {
            name: 'xmlns:x',
            value: 'x1',
            uri: 'http://www.w3.org/2000/xmlns/',
            prefix: 'xmlns',
            local: 'x'
          },
          'xmlns:y': {
            name: 'xmlns:y',
            value: 'y1',
            uri: 'http://www.w3.org/2000/xmlns/',
            prefix: 'xmlns',
            local: 'y'
          },
          'x:a': {
            name: 'x:a',
            value: 'x1',
            uri: 'x1',
            prefix: 'x',
            local: 'a'
          },
          'y:a': {
            name: 'y:a',
            value: 'y1',
            uri: 'y1',
            prefix: 'y',
            local: 'a'
          }
        },
        ns: {
          x: 'x1',
          y: 'y1'
        },
        isSelfClosing: false
      }
    ],
    [
      'opentagstart',
      {
        name: 'rebind',
        attributes: {},
        ns: {
          x: 'x1',
          y: 'y1'
        }
      }
    ],
    [
      'opennamespace',
      {
        prefix: 'x',
        uri: 'x2'
      }
    ],
    [
      'attribute',
      {
        name: 'xmlns:x',
        value: 'x2',
        uri: 'http://www.w3.org/2000/xmlns/',
        prefix: 'xmlns',
        local: 'x'
      }
    ],
    [
      'opentag',
      {
        name: 'rebind',
        uri: '',
        prefix: '',
        local: 'rebind',
        attributes: {
          'xmlns:x': {
            name: 'xmlns:x',
            value: 'x2',
            uri: 'http://www.w3.org/2000/xmlns/',
            prefix: 'xmlns',
            local: 'x'
          }
        },
        ns: {
          x: 'x2'
        },
        isSelfClosing: false
      }
    ],
    [
      'opentagstart',
      {
        name: 'check',
        attributes: {},
        ns: {
          x: 'x2'
        }
      }
    ],
    [
      'attribute',
      {
        name: 'x:a',
        value: 'x2',
        uri: 'x2',
        prefix: 'x',
        local: 'a'
      }
    ],
    [
      'attribute',
      {
        name: 'y:a',
        value: 'y1',
        uri: 'y1',
        prefix: 'y',
        local: 'a'
      }
    ],
    [
      'opentag',
      {
        name: 'check',
        uri: '',
        prefix: '',
        local: 'check',
        attributes: {
          'x:a': {
            name: 'x:a',
            value: 'x2',
            uri: 'x2',
            prefix: 'x',
            local: 'a'
          },
          'y:a': {
            name: 'y:a',
            value: 'y1',
            uri: 'y1',
            prefix: 'y',
            local: 'a'
          }
        },
        ns: {
          x: 'x2'
        },
        isSelfClosing: true
      }
    ],
    [
      'closetag',
      'check'
    ],
    [
      'closetag',
      'rebind'
    ],
    [
      'closenamespace',
      {
        prefix: 'x',
        uri: 'x2'
      }
    ],
    [
      'opentagstart',
      {
        name: 'check',
        attributes: {},
        ns: {
          x: 'x1',
          y: 'y1'
        }
      }
    ],
    [
      'attribute',
      {
        name: 'x:a',
        value: 'x1',
        uri: 'x1',
        prefix: 'x',
        local: 'a'
      }
    ],
    [
      'attribute',
      {
        name: 'y:a',
        value: 'y1',
        uri: 'y1',
        prefix: 'y',
        local: 'a'
      }
    ],
    [
      'opentag',
      {
        name: 'check',
        uri: '',
        prefix: '',
        local: 'check',
        attributes: {
          'x:a': {
            name: 'x:a',
            value: 'x1',
            uri: 'x1',
            prefix: 'x',
            local: 'a'
          },
          'y:a': {
            name: 'y:a',
            value: 'y1',
            uri: 'y1',
            prefix: 'y',
            local: 'a'
          }
        },
        ns: {
          x: 'x1',
          y: 'y1'
        },
        isSelfClosing: true
      }
    ],
    [
      'closetag',
      'check'
    ],
    [
      'closetag',
      'root'
    ],
    [
      'closenamespace',
      {
        prefix: 'x',
        uri: 'x1'
      }
    ],
    [
      'closenamespace',
      {
        prefix: 'y',
        uri: 'y1'
      }
    ]
  ],
  strict: true,
  opt: {
    xmlns: true
  }
}

const xmlnsStrictTestData = {
  xml: '<root>' +
  '<plain attr="normal" />' +
  '<ns1 xmlns="uri:default">' +
  '<plain attr="normal"/>' +
  '</ns1>' +
  '<ns2 xmlns:a="uri:nsa">' +
  '<plain attr="normal"/>' +
  '<a:ns a:attr="namespaced"/>' +
  '</ns2>' +
  '</root>',
  expect: [
    [
      'opentagstart',
      {
        name: 'root',
        attributes: {},
        ns: {}
      }
    ],
    [
      'opentag',
      {
        name: 'root',
        prefix: '',
        local: 'root',
        uri: '',
        attributes: {},
        ns: {},
        isSelfClosing: false
      }
    ],
    [
      'opentagstart',
      {
        name: 'plain',
        attributes: {},
        ns: {}
      }
    ],
    [
      'attribute',
      {
        name: 'attr',
        value: 'normal',
        prefix: '',
        local: 'attr',
        uri: ''
      }
    ],
    [
      'opentag',
      {
        name: 'plain',
        prefix: '',
        local: 'plain',
        uri: '',
        attributes: {
          'attr': {
            name: 'attr',
            value: 'normal',
            prefix: '',
            local: 'attr',
            uri: ''
          }
        },
        ns: {},
        isSelfClosing: true
      }
    ],
    [
      'closetag',
      'plain'
    ],
    [
      'opentagstart',
      {
        name: 'ns1',
        attributes: {},
        ns: {}
      }
    ],
    [
      'opennamespace',
      {
        prefix: '',
        uri: 'uri:default'
      }
    ],
    [
      'attribute',
      {
        name: 'xmlns',
        value: 'uri:default',
        prefix: 'xmlns',
        local: '',
        uri: 'http://www.w3.org/2000/xmlns/'
      }
    ],
    [
      'opentag',
      {
        name: 'ns1',
        prefix: '',
        local: 'ns1',
        uri: 'uri:default',
        attributes: {
          'xmlns': {
            name: 'xmlns',
            value: 'uri:default',
            prefix: 'xmlns',
            local: '',
            uri: 'http://www.w3.org/2000/xmlns/'
          }
        },
        ns: {
          '': 'uri:default'
        },
        isSelfClosing: false
      }
    ],
    [
      'opentagstart',
      {
        name: 'plain',
        ns: {
          '': 'uri:default'
        },
        attributes: {}
      }
    ],
    [
      'attribute',
      {
        name: 'attr',
        value: 'normal',
        prefix: '',
        local: 'attr',
        uri: ''
      }
    ],
    [
      'opentag',
      {
        name: 'plain',
        prefix: '',
        local: 'plain',
        uri: 'uri:default',
        ns: {
          '': 'uri:default'
        },
        attributes: {
          'attr': {
            name: 'attr',
            value: 'normal',
            prefix: '',
            local: 'attr',
            uri: ''
          }
        },
        isSelfClosing: true
      }
    ],
    [
      'closetag',
      'plain'
    ],
    [
      'closetag',
      'ns1'
    ],
    [
      'closenamespace',
      {
        prefix: '',
        uri: 'uri:default'
      }
    ],
    [
      'opentagstart',
      {
        name: 'ns2',
        attributes: {},
        ns: {}
      }
    ],
    [
      'opennamespace',
      {
        prefix: 'a',
        uri: 'uri:nsa'
      }
    ],
    [
      'attribute',
      {
        name: 'xmlns:a',
        value: 'uri:nsa',
        prefix: 'xmlns',
        local: 'a',
        uri: 'http://www.w3.org/2000/xmlns/'
      }
    ],
    [
      'opentag',
      {
        name: 'ns2',
        prefix: '',
        local: 'ns2',
        uri: '',
        attributes: {
          'xmlns:a': {
            name: 'xmlns:a',
            value: 'uri:nsa',
            prefix: 'xmlns',
            local: 'a',
            uri: 'http://www.w3.org/2000/xmlns/'
          }
        },
        ns: {
          a: 'uri:nsa'
        },
        isSelfClosing: false
      }
    ],
    [
      'opentagstart',
      {
        name: 'plain',
        attributes: {},
        ns: {
          a: 'uri:nsa'
        }
      }
    ],
    [
      'attribute',
      {
        name: 'attr',
        value: 'normal',
        prefix: '',
        local: 'attr',
        uri: ''
      }
    ],
    [
      'opentag',
      {
        name: 'plain',
        prefix: '',
        local: 'plain',
        uri: '',
        attributes: {
          'attr': {
            name: 'attr',
            value: 'normal',
            prefix: '',
            local: 'attr',
            uri: ''
          }
        },
        ns: {
          a: 'uri:nsa'
        },
        isSelfClosing: true
      }
    ],
    [
      'closetag',
      'plain'
    ],
    [
      'opentagstart',
      {
        name: 'a:ns',
        attributes: {},
        ns: {
          a: 'uri:nsa'
        }
      }
    ],
    [
      'attribute',
      {
        name: 'a:attr',
        value: 'namespaced',
        prefix: 'a',
        local: 'attr',
        uri: 'uri:nsa'
      }
    ],
    [
      'opentag',
      {
        name: 'a:ns',
        prefix: 'a',
        local: 'ns',
        uri: 'uri:nsa',
        attributes: {
          'a:attr': {
            name: 'a:attr',
            value: 'namespaced',
            prefix: 'a',
            local: 'attr',
            uri: 'uri:nsa'
          }
        },
        ns: {
          a: 'uri:nsa'
        },
        isSelfClosing: true
      }
    ],
    [
      'closetag',
      'a:ns'
    ],
    [
      'closetag',
      'ns2'
    ],
    [
      'closenamespace',
      {
        prefix: 'a',
        uri: 'uri:nsa'
      }
    ],
    [
      'closetag',
      'root'
    ]
  ],
  strict: true,
  opt: {
    xmlns: true
  }
}

const xmlnsUnboundTestData = {
  strict: true,
  opt: {
    xmlns: true
  },
  expect: [
    [
      'opentagstart',
      {
        name: 'root',
        attributes: {},
        ns: {}
      }
    ],
    [
      'error',
      'Unbound namespace prefix: "unbound"\nLine: 0\nColumn: 28\nChar: >'
    ],
    [
      'attribute',
      {
        name: 'unbound:attr',
        value: 'value',
        uri: 'unbound',
        prefix: 'unbound',
        local: 'attr'
      }
    ],
    [
      'opentag',
      {
        name: 'root',
        uri: '',
        prefix: '',
        local: 'root',
        attributes: {
          'unbound:attr': {
            name: 'unbound:attr',
            value: 'value',
            uri: 'unbound',
            prefix: 'unbound',
            local: 'attr'
          }
        },
        ns: {},
        isSelfClosing: true
      }
    ],
    [
      'closetag',
      'root'
    ]
  ]
}

const xmlnsUnboundElementTestData1 = {
  strict: true,
  opt: {
    xmlns: true
  },
  expect: [
    [
      'opentagstart',
      {
        name: 'unbound:root',
        attributes: {},
        ns: {}
      }
    ],
    [
      'error',
      'Unbound namespace prefix: "unbound:root"\nLine: 0\nColumn: 15\nChar: >'
    ],
    [
      'opentag',
      {
        name: 'unbound:root',
        uri: 'unbound',
        prefix: 'unbound',
        local: 'root',
        attributes: {},
        ns: {},
        isSelfClosing: true
      }
    ],
    [
      'closetag',
      'unbound:root'
    ]
  ]
}

const xmlnsUnboundElementTestData2 = {
  strict: true,
  opt: {
    xmlns: true
  },
  expect: [
    [
      'opentagstart',
      {
        name: 'unbound:root',
        attributes: {},
        ns: {}
      }
    ],
    [
      'opennamespace',
      {
        prefix: 'unbound',
        uri: 'someuri'
      }
    ],
    [
      'attribute',
      {
        name: 'xmlns:unbound',
        value: 'someuri',
        prefix: 'xmlns',
        local: 'unbound',
        uri: 'http://www.w3.org/2000/xmlns/'
      }
    ],
    [
      'opentag',
      {
        name: 'unbound:root',
        uri: 'someuri',
        prefix: 'unbound',
        local: 'root',
        attributes: {
          'xmlns:unbound': {
            name: 'xmlns:unbound',
            value: 'someuri',
            prefix: 'xmlns',
            local: 'unbound',
            uri: 'http://www.w3.org/2000/xmlns/'
          }
        },
        ns: {
          'unbound': 'someuri'
        },
        isSelfClosing: true
      }
    ],
    [
      'closetag',
      'unbound:root'
    ],
    [
      'closenamespace',
      {
        prefix: 'unbound',
        uri: 'someuri'
      }
    ]
  ]
}

let xmlnsAttr = {
  name: 'xmlns',
  value: 'http://foo',
  prefix: 'xmlns',
  local: '',
  uri: 'http://www.w3.org/2000/xmlns/'
}

let attrAttr = {
  name: 'attr',
  value: 'bar',
  prefix: '',
  local: 'attr',
  uri: ''
}

const xmlnsXmlDefaultNsData = {
  xml: "<elm xmlns='http://foo' attr='bar'/>",
  expect: [
    [
      'opentagstart',
      {
        name: 'elm',
        attributes: {},
        ns: {}
      }
    ],
    [
      'opennamespace',
      {
        prefix: '', uri: 'http://foo'
      }
    ],
    [
      'attribute',
      xmlnsAttr
    ],
    [
      'attribute',
      attrAttr
    ],
    [
      'opentag',
      {
        name: 'elm',
        prefix: '',
        local: 'elm',
        uri: 'http://foo',
        ns: {
          '': 'http://foo'
        },
        attributes: {
          xmlns: xmlnsAttr,
          attr: attrAttr
        },
        isSelfClosing: true
      }
    ],
    [
      'closetag',
      'elm'
    ],
    [
      'closenamespace',
      {
        prefix: '',
        uri: 'http://foo'
      }
    ]
  ],
  strict: true,
  opt: {
    xmlns: true
  }
}

const xmlnsXmlDefaultPrefixData = {
  xml: '<xml:root/>',
  expect: [
    [
      'opentagstart',
      {
        name: 'xml:root',
        attributes: {},
        ns: {}
      }
    ],
    [
      'opentag',
      {
        name: 'xml:root',
        uri: 'http://www.w3.org/XML/1998/namespace',
        prefix: 'xml',
        local: 'root',
        attributes: {},
        ns: {},
        isSelfClosing: true
      }
    ],
    [
      'closetag',
      'xml:root'
    ]
  ],
  strict: true,
  opt: {
    xmlns: true
  }
}

const xmlnsXmlDefaultPrefixAttributeData = {
  xml: "<root xml:lang='en'/>",
  expect: [
    [
      'opentagstart',
      {
        name: 'root',
        attributes: {},
        ns: {}
      }
    ],
    [
      'attribute',
      {
        name: 'xml:lang',
        local: 'lang',
        prefix: 'xml',
        uri: 'http://www.w3.org/XML/1998/namespace',
        value: 'en'
      }
    ],
    [
      'opentag',
      {
        name: 'root',
        uri: '',
        prefix: '',
        local: 'root',
        attributes: {
          'xml:lang': {
            name: 'xml:lang',
            local: 'lang',
            prefix: 'xml',
            uri: 'http://www.w3.org/XML/1998/namespace',
            value: 'en'
          }
        },
        ns: {},
        isSelfClosing: true
      }
    ],
    [
      'closetag',
      'root'
    ]
  ],
  strict: true,
  opt: {
    xmlns: true
  }
}

const xmlnsXmlDefaultRedefineTestData = {
  xml: "<xml:root xmlns:xml='ERROR'/>",
  expect: [
    [
      'opentagstart',
      {
        name: 'xml:root',
        attributes: {},
        ns: {}
      }
    ],
    [
      'error',
      'xml: prefix must be bound to http://www.w3.org/XML/1998/namespace\n' +
      'Actual: ERROR\n' +
      "Line: 0\nColumn: 27\nChar: '"
    ],
    [
      'attribute',
      {
        name: 'xmlns:xml',
        local: 'xml',
        prefix: 'xmlns',
        uri: 'http://www.w3.org/2000/xmlns/',
        value: 'ERROR'
      }
    ],
    [
      'opentag',
      {
        name: 'xml:root',
        uri: 'http://www.w3.org/XML/1998/namespace',
        prefix: 'xml',
        local: 'root',
        attributes: {
          'xmlns:xml': {
            name: 'xmlns:xml',
            local: 'xml',
            prefix: 'xmlns',
            uri: 'http://www.w3.org/2000/xmlns/',
            value: 'ERROR'
          }
        },
        ns: {},
        isSelfClosing: true
      }
    ],
    [
      'closetag',
      'xml:root'
    ]
  ],
  strict: true,
  opt: {
    xmlns: true
  }
}

const bomTestData1 = {
  xml: '\uFEFF<P></P>',
  expect: [
    ['opentagstart', {
      'name': 'P', attributes: {}
    }],
    ['opentag', {
      'name': 'P', attributes: {}, isSelfClosing: false
    }],
    ['closetag', 'P']
  ]
}

const bomTestData2 = {
  xml: '\uFEFF<P BOM="\uFEFF">\uFEFFStarts and ends with BOM\uFEFF</P>',
  expect: [
    ['opentagstart', {
      'name': 'P', attributes: {}
    }],
    ['attribute', {
      'name': 'BOM', 'value': '\uFEFF'
    }],
    ['opentag', {
      'name': 'P', attributes: {
        'BOM': '\uFEFF'
      }, isSelfClosing: false
    }],
    ['text', '\uFEFFStarts and ends with BOM\uFEFF'],
    ['closetag', 'P']
  ]
}

const bomTestData3 = {
  xml: ' \uFEFF<P></P>',
  expect: [
    ['error', 'Non-whitespace before first tag.\nLine: 0\nColumn: 2\nChar: \uFEFF'],
    ['text', '\uFEFF'],
    ['opentagstart', {
      'name': 'P', attributes: {}
    }],
    ['opentag', {
      'name': 'P', attributes: {}, isSelfClosing: false
    }],
    ['closetag', 'P']
  ],
  strict: true
}

const bomTestData4 = {
  xml: '\uFEFF\uFEFF<P></P>',
  expect: [
    ['error', 'Non-whitespace before first tag.\nLine: 0\nColumn: 2\nChar: \uFEFF'],
    ['text', '\uFEFF'],
    ['opentagstart', {
      'name': 'P', attributes: {}
    }],
    ['opentag', {
      'name': 'P', attributes: {}, isSelfClosing: false
    }],
    ['closetag', 'P']
  ],
  strict: true
}

const bufferOverrunTestData = {
  expect: [
    ['error', 'Max buffer length exceeded: tagName\nLine: 0\nColumn: 15\nChar: '],
    ['error', 'Max buffer length exceeded: tagName\nLine: 0\nColumn: 30\nChar: '],
    ['error', 'Max buffer length exceeded: tagName\nLine: 0\nColumn: 45\nChar: '],
    ['opentagstart', {
      'name': 'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ',
      'attributes': {}
    }],
    ['opentag', {
      'name': 'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ',
      'attributes': {},
      'isSelfClosing': false
    }],
    ['text', 'yo'],
    ['closetag', 'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ']
  ]
}

const caseTestData1 = {
  xml: '<span class="test" hello="world"></span>',
  expect: [
    ['opentagstart', {
      name: 'SPAN',
      attributes: {}
    }],
    ['attribute', {
      name: 'CLASS', value: 'test'
    }],
    ['attribute', {
      name: 'HELLO', value: 'world'
    }],
    ['opentag', {
      name: 'SPAN',
      attributes: {
        CLASS: 'test', HELLO: 'world'
      },
      isSelfClosing: false
    }],
    ['closetag', 'SPAN']
  ],
  strict: false,
  opt: {}
}

const caseTestData2 = {
  xml: '<span class="test" hello="world"></span>',
  expect: [
    ['opentagstart', {
      name: 'span',
      attributes: {}
    }],
    ['attribute', {
      name: 'class', value: 'test'
    }],
    ['attribute', {
      name: 'hello', value: 'world'
    }],
    ['opentag', {
      name: 'span',
      attributes: {
        class: 'test', hello: 'world'
      },
      isSelfClosing: false
    }],
    ['closetag', 'span']
  ],
  strict: false,
  opt: {
    lowercase: true
  }
}

const caseTestData3 = {
  xml: '<span class="test" hello="world"></span>',
  expect: [
    ['opentagstart', {
      name: 'span',
      attributes: {}
    }],
    ['attribute', {
      name: 'class', value: 'test'
    }],
    ['attribute', {
      name: 'hello', value: 'world'
    }],
    ['opentag', {
      name: 'span',
      attributes: {
        class: 'test', hello: 'world'
      },
      isSelfClosing: false
    }],
    ['closetag', 'span']
  ],
  strict: false,
  opt: {
    lowercasetags: true
  }
}

const cyrillicTestData = {
  xml: '<Р>тест</Р>',
  expect: [
    ['opentagstart', {
      'name': 'Р', attributes: {}
    }],
    ['opentag', {
      'name': 'Р', attributes: {}, isSelfClosing: false
    }],
    ['text', 'тест'],
    ['closetag', 'Р']
  ]
}

const duplicateAttributeTestData = {
  xml: '<span id="hello" id="there"></span>',
  expect: [
    ['opentagstart', {
      name: 'SPAN',
      attributes: {}
    }],
    ['attribute', {
      name: 'ID', value: 'hello'
    }],
    ['opentag', {
      name: 'SPAN',
      attributes: {
        ID: 'hello'
      },
      isSelfClosing: false
    }],
    ['closetag', 'SPAN']
  ],
  strict: false,
  opt: {}
}

const emojiTestData = {
  xml: '<a>&#x1f525;</a>',
  expect: [
    ['opentagstart', {
      name: 'A', attributes: {}
    }],
    ['opentag', {
      name: 'A', attributes: {}, isSelfClosing: false
    }],
    ['text', '\ud83d\udd25'],
    ['closetag', 'A']
  ],
  strict: false,
  opt: {}
}

const flushTestData = {
  expect: [
    ['opentagstart', {
      'name': 'T', attributes: {}
    }],
    ['opentag', {
      'name': 'T', attributes: {}, isSelfClosing: false
    }],
    ['text', 'flush'],
    ['text', 'rest'],
    ['closetag', 'T']
  ]
}

const openTagStartTestData1 = {
  xml: "<root length='12345'></root>",
  expect: [
    [
      'opentagstart',
      {
        name: 'root',
        attributes: {},
        ns: {}
      }
    ],
    [
      'attribute',
      {
        name: 'length',
        value: '12345',
        prefix: '',
        local: 'length',
        uri: ''
      }
    ],
    [
      'opentag',
      {
        name: 'root',
        attributes: {
          length: {
            name: 'length',
            value: '12345',
            prefix: '',
            local: 'length',
            uri: ''
          }
        },
        ns: {},
        prefix: '',
        local: 'root',
        uri: '',
        isSelfClosing: false
      }
    ],
    [
      'closetag',
      'root'
    ]
  ],
  strict: true,
  opt: {
    xmlns: true
  }
}

const openTagStartTestData2 = {
  xml: "<root length='12345'></root>",
  expect: [
    [
      'opentagstart',
      {
        name: 'root',
        attributes: {}
      }
    ],
    [
      'attribute',
      {
        name: 'length',
        value: '12345'
      }
    ],
    [
      'opentag',
      {
        name: 'root',
        attributes: {
          length: '12345'
        },
        isSelfClosing: false
      }
    ],
    [
      'closetag',
      'root'
    ]
  ],
  strict: true
}

const scriptTestData = {
  xml: "<html><head><script>if (1 < 0) { console.log('elo there'); }</script></head></html>",
  expect: [
    [
      'opentagstart',
      {
        'name': 'HTML',
        'attributes': {}
      }
    ],
    [
      'opentag',
      {
        'name': 'HTML',
        'attributes': {},
        'isSelfClosing': false
      }
    ],
    [
      'opentagstart',
      {
        'name': 'HEAD',
        'attributes': {}
      }
    ],
    [
      'opentag',
      {
        'name': 'HEAD',
        'attributes': {},
        'isSelfClosing': false
      }
    ],
    [
      'opentagstart',
      {
        'name': 'SCRIPT',
        'attributes': {}
      }
    ],
    [
      'opentag',
      {
        'name': 'SCRIPT',
        'attributes': {},
        'isSelfClosing': false
      }
    ],
    [
      'script',
      "if (1 < 0) { console.log('elo there'); }"
    ],
    [
      'closetag',
      'SCRIPT'
    ],
    [
      'closetag',
      'HEAD'
    ],
    [
      'closetag',
      'HTML'
    ]
  ]
}

const scriptCloseBetterTestData = {
  xml: "<html><head><script>'<div>foo</div></'</script></head></html>",
  expect: [
    ['opentagstart', {
      'name': 'HTML', 'attributes': {}
    }],
    ['opentag', {
      'name': 'HTML', 'attributes': {}, isSelfClosing: false
    }],
    ['opentagstart', {
      'name': 'HEAD', 'attributes': {}
    }],
    ['opentag', {
      'name': 'HEAD', 'attributes': {}, isSelfClosing: false
    }],
    ['opentagstart', {
      'name': 'SCRIPT', 'attributes': {}
    }],
    ['opentag', {
      'name': 'SCRIPT', 'attributes': {}, isSelfClosing: false
    }],
    ['script', "'<div>foo</div></'"],
    ['closetag', 'SCRIPT'],
    ['closetag', 'HEAD'],
    ['closetag', 'HTML']
  ]
}

const standAloneCommentTestData = {
  xml: '<!-- stand alone comment -->',
  expect: [
    [
      'comment',
      ' stand alone comment '
    ]
  ],
  strict: true,
  opt: {}
}

const strayEndingTestData = {
  xml: '<a><b></c></b></a>',
  expect: [
    [
      'opentagstart',
      {
        name: 'A',
        attributes: {}
      }
    ],
    [
      'opentag',
      {
        name: 'A',
        attributes: {},
        isSelfClosing: false
      }
    ],
    [
      'opentagstart',
      {
        name: 'B',
        attributes: {}
      }
    ],
    [
      'opentag',
      {
        name: 'B',
        attributes: {},
        isSelfClosing: false
      }
    ],
    [
      'text',
      '</c>'
    ],
    [
      'closetag',
      'B'
    ],
    [
      'closetag',
      'A'
    ]
  ],
  strict: false,
  opt: {}
}

const trailingAttributeNoValueTestData = {
  xml: '<root attrib>',
  expect: [
    ['opentagstart', {
      name: 'ROOT', attributes: {}
    }],
    ['attribute', {
      name: 'ATTRIB', value: 'attrib'
    }],
    ['opentag', {
      name: 'ROOT', attributes: {
        'ATTRIB': 'attrib'
      }, isSelfClosing: false
    }]
  ],
  opt: {
    trim: true
  }
}

const trailingNonWhitespaceTestData = {
  xml: '<span>Welcome,</span> to monkey land',
  expect: [
    ['opentagstart', {
      'name': 'SPAN',
      'attributes': {}
    }],
    ['opentag', {
      'name': 'SPAN',
      'attributes': {},
      isSelfClosing: false
    }],
    ['text', 'Welcome,'],
    ['closetag', 'SPAN'],
    ['text', ' to monkey land'],
    ['end'],
    ['ready']
  ],
  strict: false,
  opt: {}
}

const unclosedRootTestData = {
  xml: '<root>',
  expect: [
    [
      'opentagstart',
      {
        name: 'root',
        attributes: {}
      }
    ],
    [
      'opentag',
      {
        name: 'root',
        attributes: {},
        isSelfClosing: false
      }
    ],
    [
      'error',
      'Unclosed root tag\nLine: 0\nColumn: 6\nChar: '
    ]
  ],
  strict: true,
  opt: {}
}

const unquotedTestData = {
  xml: '<span class=test hello=world></span>',
  expect: [
    [
      'opentagstart',
      {
        name: 'SPAN',
        attributes: {}
      }
    ],
    [
      'attribute',
      {
        name: 'CLASS',
        value: 'test'
      }
    ],
    [
      'attribute',
      {
        name: 'HELLO',
        value: 'world'
      }
    ],
    [
      'opentag',
      {
        name: 'SPAN',
        attributes: {
          CLASS: 'test',
          HELLO: 'world'
        },
        isSelfClosing: false
      }
    ],
    [
      'closetag',
      'SPAN'
    ]
  ],
  strict: false,
  opt: {}
}

const xmlEntitiesTestData = {
  opt: {
    strictEntities: true
  },
  xml: '<r>&rfloor; ' +
  '&spades; &copy; &rarr; &amp; ' +
  '&lt; < <  <   < &gt; &real; &weierp; &euro;</r>',
  expect: [
    ['opentagstart', {
      'name': 'R', attributes: {}
    }],
    ['opentag', {
      'name': 'R', attributes: {}, isSelfClosing: false
    }],
    ['text', '&rfloor; &spades; &copy; &rarr; & < < <  <   < > &real; &weierp; &euro;'],
    ['closetag', 'R']
  ]
}

export function xmlInternalEntitiesTestFunction(test: Function, expect: Function) {
  let iExpect = []
  let myAttributes = {}
  let ENTITIES = {}

  // generates xml like test0="&control;"
  let entitiesToTest = {
    // 'ENTITY_NAME': IS_VALID || [invalidCharPos, invalidChar],
    'control0': true, // This is a vanilla control.
    // entityStart
    '_uscore': true,
    '#hash': true,
    ':colon': true,
    '-bad': [0, '-'],
    '.bad': [0, '.'],
    // general entity
    'u_score': true,
    'd-ash': true,
    'd.ot': true,
    'all:_#-.': true
  }

  let xmlStart = '<a test="&amp;" '
  let xmlEnd = '/>'

  iExpect.push([
    'opentagstart',
    {
      name: 'a',
      attributes: {}
    }
  ])

  iExpect.push([
    'attribute',
    {
      name: 'test',
      value: '&'
    }
  ])
  myAttributes['test'] = '&'

  let entI = 0

  for (let entity in entitiesToTest) {
    let attribName = 'test' + entI
    let attribValue = 'Testing ' + entity

    // add the first part to use in calculation below
    xmlStart += attribName + '="' + '&'

    if (typeof entitiesToTest[entity] === 'object') {
      iExpect.push([
        'error',
        'Invalid character in entity name\nLine: 0\nColumn: ' +
        (xmlStart.length + entitiesToTest[entity][0] + 1) +
        '\nChar: ' + entitiesToTest[entity][1]
      ])
      iExpect.push([
        'attribute',
        {
          name: attribName, value: '&' + entity + ';'
        }
      ])
      myAttributes[attribName] = '&' + entity + ';'
    } else {
      ENTITIES[entity] = attribValue
      iExpect.push(['attribute', {
        name: attribName, value: attribValue
      }])
      myAttributes[attribName] = attribValue
    }

    xmlStart += entity + ';" '
    entI++
  }

  iExpect.push([
    'opentag',
    {
      name: 'a',
      attributes: myAttributes,
      isSelfClosing: true
    }
  ])
  iExpect.push(['closetag', 'a'])
  let data = {
    strict: true,
    expect: iExpect
  }
  let parser = test(data, expect);

  for (let entity in entitiesToTest) {
    parser.ENTITIES[entity] = ENTITIES[entity]
  }

  parser.write(xmlStart + xmlEnd).close()
}

export {
  attributeNameTestData,
  attributeNoSpaceData1,
  attributeNoSpaceData2,
  attributeNoSpaceData3,
  attributeNoSpaceData4,
  attributeNoSpaceData5,
  attributeUnquotedData,
  cdataTestData,
  cdataChunkedTestData,
  cdataEndSplitTestData,
  cdataFakeEndTestData1,
  cdataFakeEndTestData2,
  cdataMultipleTestData,
  entitiesTestData,
  entityMegaTestData,
  entityNanTestData,
  issue23TestData,
  issue30TestData,
  issue35TestData,
  issue47TestData,
  issue49TestData1,
  issue49TestData2,
  issue84TestData,
  issue86TestData1,
  issue86TestData2,
  selfClosingChildTestData,
  selfClosingChildStrictTestData,
  selfClosingTagTestData,
  xmlnsAsTagNameTestData,
  xmlnsIssue41TestData,
  xmlnsIssue41TestData2,
  xmlnsRebindingTestData,
  xmlnsStrictTestData,
  xmlnsUnboundTestData,
  xmlnsUnboundElementTestData1,
  xmlnsUnboundElementTestData2,
  xmlnsXmlDefaultNsData,
  xmlnsXmlDefaultPrefixData,
  xmlnsXmlDefaultPrefixAttributeData,
  xmlnsXmlDefaultRedefineTestData,
  bomTestData1,
  bomTestData2,
  bomTestData3,
  bomTestData4,
  bufferOverrunTestData,
  caseTestData1,
  caseTestData2,
  caseTestData3,
  cyrillicTestData,
  duplicateAttributeTestData,
  emojiTestData,
  flushTestData,
  openTagStartTestData1,
  openTagStartTestData2,
  scriptTestData,
  scriptCloseBetterTestData,
  standAloneCommentTestData,
  strayEndingTestData,
  trailingAttributeNoValueTestData,
  trailingNonWhitespaceTestData,
  unclosedRootTestData,
  unquotedTestData,
  xmlEntitiesTestData
}