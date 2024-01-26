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
const entity_compact_false_js = {
    "elements": [{
            "type": "doctype", "doctype": "note [\n<!ENTITY foo \"baa\">]"
        }]
};
const instruction_compact_false_js = {
    "elements": [{
            "type": "instruction", "name": "go", "instruction": "there"
        }]
};
const cdata_compact_false_js = {
    "elements": [{
            "type": "cdata", "cdata": " \t <foo></bar> \t "
        }]
};
const comment_compact_false_js = {
    "elements": [{
            "type": "comment", "comment": " \t Hello, World! \t "
        }]
};
const text_compact_false_js = {
    "elements": [{
            "type": "element", "name": "a", "elements": [{
                    "type": "text", "text": " \t Hi \t "
                }]
        }]
};
const instruction_2_compact_false_js = {
    "elements": [{
            "type": "instruction", "name": "go", "instruction": "there"
        }]
};
const element_compact_false_js = {
    "elements": [{
            "type": "element", "name": "a", "attributes": {
                "x": "hello"
            }
        }]
};
const attributeName_compact_false_js = {
    "elements": [{
            "type": "element", "name": "a", "attributes": {
                "x": "1.234", "y": "It\'s"
            }
        }]
};
const attributeValue_compact_false_js = {
    "elements": [{
            "type": "element", "name": "a", "attributes": {
                "x": "1.234", "y": "It\'s"
            }
        }]
};
const attributes_compact_false_js = {
    "elements": [{
            "type": "element", "name": "a", "attributes": {
                "x": "1.234", "y": "It\'s"
            }
        }]
};
const doctype_compact_true_js = {
    "_doctype": "note [\n<!ENTITY foo \"baa\">]"
};
const instructionFn_compact_true_js = {
    "_instruction": {
        "go": "there"
    }
};
const CDATA_compact_true_js = {
    "_cdata": " \t <foo></bar> \t "
};
const comment_compact_true_js = {
    "_comment": " \t Hello, World! \t "
};
const text_compact_true_js = {
    "a": {
        "_text": " \t Hi \t "
    }
};
const instruction_compact_true_js = {
    "_instruction": {
        "go": "there"
    }
};
const elementName_compact_true_js = {
    "a": {
        _attributes: {
            "x": "hello"
        }
    }
};
const attributeName_compact_true_js = {
    "a": {
        _attributes: {
            "x": "1.234", "y": "It\'s"
        }
    }
};
const attributeValue_compact_true_js = {
    "a": {
        _attributes: {
            "x": "1.234", "y": "It\'s"
        }
    }
};
const attributes_compact_true_js = {
    "a": {
        _attributes: {
            "x": "1.234", "y": "It\'s"
        }
    }
};
const fullTagEmptyElement_elements_js = {
    "elements": [{
            "type": "element", "name": "a"
        }, {
            "type": "element", "name": "b"
        }]
};
const fullTagEmptyElement_elements_compact_true_js = {
    "a": {}, "b": {}
};
const issue_2_js = {
    _comment: ' Released under The MIT License ',
    snippet: {
        content: {
            _cdata: 'console.log($1)'
        },
        tabTrigger: {
            _text: 'log'
        },
        scope: {
            _text: 'source.js'
        }
    }
};
const issue_5_js1 = {
    a: {
        b: {
            _text: 'foo bar'
        }
    }
};
const issue_5_js2 = {
    elements: [{
            type: 'element',
            name: 'a',
            elements: [{
                    type: 'element',
                    name: 'b',
                    elements: [{
                            type: 'text',
                            text: 'foo bar'
                        }]
                }]
        }]
};
const issue_13_json = {
    "_declaration": {
        "_attributes": {
            "version": "1.0",
            "encoding": "utf-8"
        }
    },
    "ServiceExceptionReport": {
        "_attributes": {
            "version": "1.1.1"
        },
        "_doctype": 'ServiceExceptionReport SYSTEM "http://schemas.opengis.net/wms/1.1.1/exception_1_1_1.dtd"',
        "ServiceException": {
            "_text": "foo"
        }
    }
};
const issue_14_js = {
    _declaration: {
        _attributes: {
            version: '1.0'
        }
    },
    group: {
        name: {
            _cdata: 'An example name'
        }
    }
};
const issue_14_js2 = {
    declaration: {
        attributes: {
            version: '1.0'
        }
    },
    elements: [{
            type: 'element',
            name: 'group',
            elements: [{
                    type: 'element',
                    name: 'name',
                    elements: [{
                            type: 'text',
                            text: 'The url '
                        }, {
                            type: 'cdata',
                            cdata: 'http://www.test.com'
                        }, {
                            type: 'text',
                            text: ' and name '
                        }, {
                            type: 'cdata',
                            cdata: 'examplename'
                        }, {
                            type: 'text',
                            text: ' are wrapped'
                        }]
                }]
        }]
};
const issue_20_js = {
    request: {
        user: {
            _text: 'username'
        },
        pass: {
            _text: 'password'
        },
        numbers: {
            number: [
                {
                    _text: 1
                },
                {
                    _text: 2
                }
            ]
        }
    }
};
const issue_21_js = {
    "vertical": {
        "_attributes": {
            "-display_name": "Exercise"
        },
        "html": {
            "_attributes": {
                "-url_name": "12345"
            }
        },
        "lti_consumer": {
            "_attributes": {
                "-url_name": "12345",
                "-xblock-family": "xblock.v1",
                "-accept_grades_past_due": "false",
                "-weight": "14.0",
                "-has_score": "true",
                "-display_name": "Exercise",
                "-ask_to_send_username": "true",
                "-ask_to_send_email": "true",
                "-button_text": "Launch Exercise",
                "-custom_parameters": "none",
                "-lti_id": "id",
                "-launch_target": "new_window",
                "-launch_url": "url"
            }
        }
    }
};
const issue_28_js = {
    a: {
        _attributes: {
            num: 123
        }
    }
};
const issue_30_js = {
    a: {
        _text: 'Hi There'
    }
};
const issue_31_js = {
    parent: {
        _attributes: {
            bar: 1,
            baz: 'hello'
        },
        child: {
            _attributes: {
                attr1: 'a',
                attr2: 'b'
            }
        }
    }
};
const issue_32_js = {
    example: 'value'
};
const issue_59_js = {
    textless: {
        calling_offer_code: '',
        mailing_code: '',
        vcpi: ''
    },
};
const js = {
    container: {
        cdata_section: {
            _cdata: '<p><![CDATA[aaaa, one <bbbb>cccc</bbbb>]]></p>',
        },
    },
};
const xml2js_issue_3_json = {
    "_declaration": {
        "_attributes": {
            "version": "1.0",
            "encoding": "utf-8"
        }
    },
    "dp:ListServicesReply": {
        "_attributes": {
            "ReturnCode": "0",
            "xmlns:dp": "http://www.cisco.com/vtg/diagnosticportal"
        },
        "dp:Schema": {
            "_attributes": {
                "Version": "1.0"
            }
        },
        "dp:ServiceList": {
            "dp:Service": [
                {
                    "_attributes": {
                        "Name": "Cisco ICM usgd1 LoggerA",
                        "Description": "Provides Call Logging services for Instance usgd1",
                        "Status": "Running",
                        "StartupType": "Auto",
                        "LogOnAs": "****"
                    }
                },
                {
                    "_attributes": {
                        "Name": "Cisco ICM Diagnostic Framework",
                        "Description": "Provides a web-based diagnostic service for Cisco Unified ICM, Contact Center Enterprise application.",
                        "Status": "Running",
                        "StartupType": "Auto",
                        "LogOnAs": "LocalSystem"
                    }
                }
            ]
        }
    }
};
const xml2js_issue_26_js = {
    "_declaration": {
        "_attributes": {
            "version": "1.0",
            "encoding": "UTF-8"
        }
    },
    "note": {
        "to": {
            "_text": "xml-js"
        },
        "from": {
            "_text": "ACraig"
        },
        "heading": {
            "_text": "Min Example"
        },
        "body": {
            "_text": "Here are some characters that get sanitized: \" '"
        }
    }
};
const xml2js_issue_26_js1 = {
    elements: [{
            type: 'element',
            name: 'title',
            elements: [{
                    type: 'text',
                    text: 'Support & resistance'
                }]
        }]
};
const xml2js_issue_29_js = {
    elements: [{
            type: 'element',
            name: 'outer',
            elements: [{
                    type: 'text',
                    text: ' This is '
                }, {
                    type: 'element',
                    name: 'inner',
                    elements: [{
                            type: 'text',
                            text: ' some'
                        }]
                }, {
                    type: 'text',
                    text: ' '
                }, {
                    type: 'element',
                    name: 'inner',
                    elements: [{
                            type: 'text',
                            text: 'Text '
                        }]
                }, {
                    type: 'text',
                    text: ' '
                }]
        }]
};
const xml2js_issue_34_js = {
    declaration: {
        attributes: {
            version: '1.0',
            encoding: 'UTF-8'
        }
    }
};
const xml2js_issue_41_js1 = {
    "d:multistatus": {
        "_attributes": {
            "xmlns": "DAV:"
        },
        "response": {
            "href": {
                "_text": "/"
            },
            "propstat": {
                "prop": {
                    "current-user-principal": {
                        "href": {
                            "_text": "/principals/users/johndoe/"
                        }
                    }
                },
                "status": {
                    "_text": "HTTP/1.1 200 OK"
                }
            }
        }
    }
};
const xml2js_issue_41_js2 = {
    "d:multistatus": {
        "_attributes": {
            "xmlns:d": "DAV:"
        },
        "d:response": {
            "d:href": {
                "_text": "/"
            },
            "d:propstat": {
                "d:prop": {
                    "d:current-user-principal": {
                        "d:href": {
                            "_text": "/principals/users/johndoe/"
                        }
                    }
                },
                "d:status": {
                    "_text": "HTTP/1.1 200 OK"
                }
            }
        }
    }
};
const xml2js_issue_41_js = {
    "d:multistatus": {
        "_attributes": {
            "xmlns:d": "DAV:"
        },
        "DAV:response": {
            "DAV:href": {
                "_text": "/"
            },
            "DAV:propstat": {
                "DAV:prop": {
                    "DAV:current-user-principal": {
                        "DAV:href": {
                            "_text": "/principals/users/johndoe/"
                        }
                    }
                },
                "DAV:status": {
                    "_text": "HTTP/1.1 200 OK"
                }
            }
        }
    }
};
const xml2js_issue_26_js_2 = {
    parser: {
        _attributes: {
            start: '^\\s*?<name>regex</name>$'
        }
    }
};
const xml2js_issue_44_js = {
    "material": [{
            "font": {
                "_attributes": {
                    "size": "14"
                }
            }
        }, {
            "font": {
                "_attributes": {
                    "size": "14"
                }
            }
        }]
};
const Xml2JsData1 = {
    "elements": [{
            "type": "element", "name": "a", "elements": [{
                    "type": "text", "text": 123
                }]
        }]
};
const Xml2JsData2 = {
    "elements": [{
            "type": "element", "name": "a", "elements": [{
                    "type": "text", "text": true
                }]
        }]
};
const Xml2JsData3 = {
    "elements": [{
            "type": "element", "name": "a", "elements": [{
                    "type": "text", "text": false
                }]
        }]
};
const Xml2JsData4 = {
    "elements": [{
            "type": "element", "name": "a", "attributes": {
                "data-value": 123
            }
        }]
};
const Xml2JsData5 = {
    "elements": [{
            "type": "element", "name": "a", "attributes": {
                "data-value": true
            }
        }]
};
const Xml2JsData6 = {
    "elements": [{
            "type": "element", "name": "a", "attributes": {
                "data-value": false
            }
        }]
};
const Xml2JsData7 = {
    "_instruction": {
        "go": {
            "_attributes": {
                "to": "there"
            }
        }
    }
};
const Xml2JsData8 = {
    "elements": [{
            "type": "instruction", "name": "go", "attributes": {
                "to": "there"
            }
        }]
};
const xml_js_issue_3_json = {
    "_declaration": {
        "_attributes": {
            "version": "1.0",
            "encoding": "utf-8"
        }
    },
    "dp:ListServicesReply": {
        "_attributes": {
            "ReturnCode": "0",
            "xmlns:dp": "http://www.cisco.com/vtg/diagnosticportal"
        },
        "dp:Schema": {
            "_attributes": {
                "Version": "1.0"
            }
        },
        "dp:ServiceList": {
            "dp:Service": [
                {
                    "_attributes": {
                        "Name": "Cisco ICM usgd1 LoggerA",
                        "Description": "Provides Call Logging services for Instance usgd1",
                        "Status": "Running",
                        "StartupType": "Auto",
                        "LogOnAs": "****"
                    }
                },
                {
                    "_attributes": {
                        "Name": "Cisco ICM Diagnostic Framework",
                        "Description": "Provides a web-based diagnostic service for Cisco Unified ICM, Contact Center Enterprise application.",
                        "Status": "Running",
                        "StartupType": "Auto",
                        "LogOnAs": "LocalSystem"
                    }
                }
            ]
        }
    }
};
const xml_js_issue_26_js = {
    "_declaration": {
        "_attributes": {
            "version": "1.0",
            "encoding": "UTF-8"
        }
    },
    "note": {
        "to": {
            "_text": "xml-js"
        },
        "from": {
            "_text": "ACraig"
        },
        "heading": {
            "_text": "Min Example"
        },
        "body": {
            "_text": "Here are some characters that get sanitized: \" '"
        }
    }
};
const xml_js_issue_26_js2 = {
    elements: [{
            type: 'element',
            name: 'title',
            elements: [{
                    type: 'text',
                    text: 'Support & resistance'
                }]
        }]
};
const xml_js_issue_29_js = {
    elements: [{
            type: 'element',
            name: 'outer',
            elements: [{
                    type: 'text',
                    text: ' This is '
                }, {
                    type: 'element',
                    name: 'inner',
                    elements: [{
                            type: 'text',
                            text: ' some'
                        }]
                }, {
                    type: 'text',
                    text: ' '
                }, {
                    type: 'element',
                    name: 'inner',
                    elements: [{
                            type: 'text',
                            text: 'Text '
                        }]
                }, {
                    type: 'text',
                    text: ' '
                }]
        }]
};
const xml_js_issue_34_js = {
    declaration: {
        attributes: {
            version: '1.0',
            encoding: 'UTF-8'
        }
    }
};
const js2xmlData1 = {
    "_instruction": {
        "go": {
            "_attributes": {
                "to": "there"
            }
        }
    }
};
const js2xmlData2 = {
    "elements": [{
            "type": "instruction", "name": "go", "attributes": {
                "to": "there"
            }
        }]
};
export { entity_compact_false_js, instruction_compact_false_js, cdata_compact_false_js, comment_compact_false_js, text_compact_false_js, instruction_2_compact_false_js, element_compact_false_js, attributeName_compact_false_js, attributeValue_compact_false_js, attributes_compact_false_js, doctype_compact_true_js, instructionFn_compact_true_js, CDATA_compact_true_js, comment_compact_true_js, text_compact_true_js, instruction_compact_true_js, elementName_compact_true_js, attributeName_compact_true_js, attributeValue_compact_true_js, attributes_compact_true_js, fullTagEmptyElement_elements_js, fullTagEmptyElement_elements_compact_true_js, issue_2_js, issue_5_js1, issue_5_js2, issue_13_json, issue_14_js, issue_14_js2, issue_20_js, issue_21_js, issue_28_js, issue_30_js, issue_31_js, issue_32_js, issue_59_js, js, xml2js_issue_3_json, xml2js_issue_26_js, xml2js_issue_26_js1, xml2js_issue_29_js, xml2js_issue_34_js, xml2js_issue_41_js1, xml2js_issue_41_js2, xml2js_issue_41_js, xml2js_issue_26_js_2, xml2js_issue_44_js, Xml2JsData1, Xml2JsData2, Xml2JsData3, Xml2JsData4, Xml2JsData5, Xml2JsData6, Xml2JsData7, Xml2JsData8, xml_js_issue_3_json, xml_js_issue_26_js, xml_js_issue_26_js2, xml_js_issue_29_js, xml_js_issue_34_js, js2xmlData1, js2xmlData2 };
