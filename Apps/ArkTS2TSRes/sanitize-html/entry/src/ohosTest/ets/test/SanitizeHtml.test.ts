let __generate__Id: number = 0;
function generateId(): string {
    return "SanitizeHtml.test_" + ++__generate__Id;
}
/**
 * MIT License
 *
 * Copyright (C) 2022 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@ohos/hypium';
import sanitizeHtml from 'sanitize-html';
export default function sanitizeHtmlTest() {
    describe('SanitizeHtmlTest', () => {
        // Defines a test suite. Two parameters are supported: test suite name and test suite function.
        beforeAll(() => {
            // Presets an action, which is performed only once before all test cases of the test suite start.
            // This API supports only one parameter: preset action function.
        });
        beforeEach(() => {
            // Presets an action, which is performed before each unit test case starts.
            // The number of execution times is the same as the number of test cases defined by **it**.
            // This API supports only one parameter: preset action function.
        });
        afterEach(() => {
            // Presets a clear action, which is performed after each unit test case ends.
            // The number of execution times is the same as the number of test cases defined by **it**.
            // This API supports only one parameter: clear action function.
        });
        afterAll(() => {
            // Presets a clear action, which is performed after all test cases of the test suite end.
            // This API supports only one parameter: clear action function.
        });
        it('test01', 0, () => {
            expect(sanitizeHtml('before <img src="test.png" /> after', {
                disallowedTagsMode: 'escape',
                allowedTags: [],
                allowedAttributes: false
            })).assertEqual('before &lt;img src="test.png" /&gt; after');
        });
        it('test02', 0, () => {
            expect(sanitizeHtml('<div><p>Hello <b>there</b></p></div>')).assertEqual('<div><p>Hello <b>there</b></p></div>');
        });
        it('test03', 0, () => {
            expect(sanitizeHtml('Text before html tag<html><div><p>Hello <b>there</b></p></div></html>Text after html tag!P�X��[<p>paragraph after closing html</p>', {
                enforceHtmlBoundary: true
            })).assertEqual('<div><p>Hello <b>there</b></p></div>');
        });
        it('test04', 0, () => {
            expect(sanitizeHtml('Text before html tag<html><div><p>Hello <b>there</b></p></div></html>Text after html tag!P�X��[<p>paragraph after closing html</p>', {
                enforceHtmlBoundary: false
            }))
                .assertEqual('Text before html tag<div><p>Hello <b>there</b></p></div>Text after html tag!P�X��[<p>paragraph after closing html</p>');
        });
        it('test05', 0, () => {
            expect(sanitizeHtml('Text before div tag<div><p>Hello <b>there</b></p></div>Text after div tag!P�X��[<p>paragraph after closing div</p>', {
                enforceHtmlBoundary: true
            }))
                .assertEqual('Text before div tag<div><p>Hello <b>there</b></p></div>Text after div tag!P�X��[<p>paragraph after closing div</p>');
        });
        it('test06', 0, () => {
            expect(sanitizeHtml('<div><wiggly worms="ewww">hello</wiggly></div>', {
                allowedTags: false,
                allowedAttributes: false
            })).assertEqual('<div><wiggly worms="ewww">hello</wiggly></div>');
        });
        it('test07', 0, () => {
            expect(sanitizeHtml('<div><wiggly worms="ewww">hello</wiggly></div>', {
                allowedTags: undefined
            })).assertEqual('<div><wiggly>hello</wiggly></div>');
        });
        it('test08', 0, () => {
            expect(sanitizeHtml('<div><wiggly worms="ewww">hello</wiggly></div>', {
                allowedTags: 0
            })).assertEqual('<div><wiggly>hello</wiggly></div>');
        });
        it('test09', 0, () => {
            expect(sanitizeHtml('<div><wiggly worms="ewww">hello</wiggly></div>', {
                allowedTags: null
            })).assertEqual('<div><wiggly>hello</wiggly></div>');
        });
        it('test10', 0, () => {
            expect(sanitizeHtml('<div><wiggly worms="ewww">hello</wiggly></div>', {
                allowedTags: ''
            })).assertEqual('<div><wiggly>hello</wiggly></div>');
        });
        it('test11', 0, () => {
            expect(sanitizeHtml('Blah blah blah<p>Whee!</p>')).assertEqual('Blah blah blah<p>Whee!</p>');
        });
        it('test12', 0, () => {
            expect(sanitizeHtml(undefined)).assertEqual('');
        });
        it('test13', 0, () => {
            expect(sanitizeHtml(null)).assertEqual('');
        });
        it('test14', 0, () => {
            expect(sanitizeHtml('')).assertEqual('');
        });
        it('test15', 0, () => {
            expect(sanitizeHtml('<div><wiggly>Hello</wiggly></div>')).assertEqual('<div>Hello</div>');
        });
        it('test16', 0, () => {
            expect(sanitizeHtml('<div><wiggly>Hello</wiggly></div>', {
                disallowedTagsMode: 'escape'
            })).assertEqual('<div>&lt;wiggly&gt;Hello&lt;/wiggly&gt;</div>');
        });
        it('test17', 0, () => {
            expect(sanitizeHtml('<blue><red><green>Cheese</green></red></blue>', {
                allowedTags: ['blue', 'green']
            })).assertEqual('<blue><green>Cheese</green></blue>');
        });
        it('test18', 0, () => {
            expect(sanitizeHtml('<a href="foo.html" whizbang="whangle">foo</a>')).assertEqual('<a href="foo.html">foo</a>');
        });
        it('test19', 0, () => {
            expect(sanitizeHtml('<a href="foo.html" whizbang="whangle">foo</a>', {
                allowedAttributes: {
                    a: ['href', 'whizbang']
                }
            })).assertEqual('<a href="foo.html" whizbang="whangle">foo</a>');
        });
        it('test20', 0, () => {
            expect(sanitizeHtml('<img src="foo.jpg"><p>Whee<p>Again<p>Wow<b>cool</b>', {
                allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
            })).assertEqual('<img src="foo.jpg" /><p>Whee</p><p>Again</p><p>Wow<b>cool</b></p>');
        });
        it('test21', 0, () => {
            expect(sanitizeHtml('<a href="http://google.com">google</a><a href="https://google.com">https google</a><a href="ftp://example.com">ftp</a><a href="mailto:test@test.com">mailto</a><a href="/relative.html">relative</a><a href="javascript:alert(0)">javascript</a>'))
                .assertEqual('<a href="http://google.com">google</a><a href="https://google.com">https google</a><a href="ftp://example.com">ftp</a><a href="mailto:test@test.com">mailto</a><a href="/relative.html">relative</a><a>javascript</a>');
        });
        it('test22', 0, () => {
            expect(sanitizeHtml('<A HREF="http://google.com">google</a><a href="HTTPS://google.com">https google</a><a href="ftp://example.com">ftp</a><a href="mailto:test@test.com">mailto</a><a href="/relative.html">relative</a><a href="javascript:alert(0)">javascript</a>'))
                .assertEqual('<a href="http://google.com">google</a><a href="HTTPS://google.com">https google</a><a href="ftp://example.com">ftp</a><a href="mailto:test@test.com">mailto</a><a href="/relative.html">relative</a><a>javascript</a>');
        });
        it('test23', 0, () => {
            expect(sanitizeHtml('<script>alert("ruhroh!");</script><p>Paragraph</p>')).assertEqual('<p>Paragraph</p>');
        });
        it('test24', 0, () => {
            expect(sanitizeHtml('<style>.foo { color: blue; }</style><p>Paragraph</p>')).assertEqual('<p>Paragraph</p>');
        });
        it('test25', 0, () => {
            expect(sanitizeHtml('<textarea>Nifty</textarea><p>Paragraph</p>')).assertEqual('<p>Paragraph</p>');
        });
        it('test26', 0, () => {
            expect(sanitizeHtml('<select><option>one</option><option>two</option></select><p>Paragraph</p>'))
                .assertEqual('<p>Paragraph</p>');
        });
        it('test27', 0, () => {
            expect(sanitizeHtml('<p>Paragraph<textarea>Nifty</textarea></p>')).assertEqual('<p>Paragraph</p>');
        });
        it('test28', 0, () => {
            expect(sanitizeHtml('<fibble>Nifty</fibble><p>Paragraph</p>')).assertEqual('Nifty<p>Paragraph</p>');
        });
        it('test29', 0, () => {
            expect(sanitizeHtml('<fibble>Nifty</fibble><p>Paragraph</p>', {
                nonTextTags: ['fibble']
            })).assertEqual('<p>Paragraph</p>');
        });
        it('test30', 0, () => {
            expect(sanitizeHtml('<fibble>Ni<em>f</em>ty</fibble><p>Paragraph</p>', {}))
                .assertEqual('Ni<em>f</em>ty<p>Paragraph</p>');
        });
        it('test31', 0, () => {
            expect(sanitizeHtml('<fibble>Ni<em>f</em>ty</fibble><p>Paragraph</p>', {
                nonTextTags: ['fibble']
            })).assertEqual('<p>Paragraph</p>');
        });
        it('test32', 0, () => {
            expect(sanitizeHtml('<textarea>Nifty</textarea><p>Paragraph</p>', {
                allowedTags: ['textarea', 'p']
            })).assertEqual('<textarea>Nifty</textarea><p>Paragraph</p>');
        });
        it('test33', 0, () => {
            expect(sanitizeHtml('<a name="&lt;silly&gt;">&lt;Kapow!&gt;</a>'))
                .assertEqual('<a name="&lt;silly&gt;">&lt;Kapow!&gt;</a>');
        });
        it('test34', 0, () => {
            expect(sanitizeHtml('<div><p>inner text 1<p>inner text 2<p>inner text 3</div>'))
                .assertEqual('<div><p>inner text 1</p><p>inner text 2</p><p>inner text 3</p></div>');
        });
        it('test35', 0, () => {
            expect(sanitizeHtml('<div><p>inner text 1<p>inner text 2<p>inner text 3</div>', {
                allowedTags: ['div']
            })).assertEqual('<div>inner text 1inner text 2inner text 3</div>');
        });
        it('test36', 0, () => {
            expect(sanitizeHtml('<p><!-- Blah blah -->Whee</p>')).assertEqual('<p>Whee</p>');
        });
        it('test37', 0, () => {
            expect(sanitizeHtml('<a href="&#106;&#97;&#118;&#97;&#115;&#99;&#114;&#105;&#112;&#116;&#58;&#97;&#108;&#101;&#114;&#116;&#40;&#39;&#88;&#83;&#83;&#39;&#41;">Hax</a>'))
                .assertEqual('<a>Hax</a>');
        });
        it('test38', 0, () => {
            expect(sanitizeHtml('<a href="JAVASCRIPT:alert(\'foo\')">Hax</a>')).assertEqual('<a>Hax</a>');
        });
        it('test39', 0, () => {
            expect(sanitizeHtml('<a href="java<!-- -->script:alert(\'foo\')">Hax</a>')).assertEqual('<a>Hax</a>');
        });
        it('test40', 0, () => {
            expect(sanitizeHtml('<a href="awesome.html#this:stuff">Hi</a>'))
                .assertEqual('<a href="awesome.html#this:stuff">Hi</a>');
        });
        it('test41', 0, () => {
            expect(sanitizeHtml('<a href="java\0&#14;\t\r\n script:alert(\'foo\')">Hax</a>')).assertEqual('<a>Hax</a>');
        });
        it('test42', 0, () => {
            expect(sanitizeHtml('<a href="java&#0000001script:alert(\'foo\')">Hax</a>'))
                .assertEqual('<a>Hax</a>');
        });
        it('test43', 0, () => {
            expect(sanitizeHtml('<a href="http://google.com/">Hi</a>')).assertEqual('<a href="http://google.com/">Hi</a>');
        });
        it('test44', 0, () => {
            expect(sanitizeHtml('<a href="hello.html">Hi</a>')).assertEqual('<a href="hello.html">Hi</a>');
        });
        it('test45', 0, () => {
            expect(sanitizeHtml('<ol><li>Hello world</li></ol>', {
                transformTags: {
                    ol: 'ul'
                }
            })).assertEqual('<ul><li>Hello world</li></ul>');
        });
        it('test46', 0, () => {
            expect(sanitizeHtml('<ol><li>Hello world</li></ol>', {
                transformTags: {
                    ol: sanitizeHtml.simpleTransform('ul', {
                        class: 'foo'
                    })
                },
                allowedAttributes: {
                    ul: ['class']
                }
            })).assertEqual('<ul class="foo"><li>Hello world</li></ul>');
        });
        it('test47', 0, () => {
            expect(sanitizeHtml('<ol foo="foo" bar="bar" baz="baz"><li>Hello world</li></ol>', {
                transformTags: {
                    ol: sanitizeHtml.simpleTransform('ul', {
                        class: 'foo'
                    })
                },
                allowedAttributes: {
                    ul: ['foo', 'bar', 'class']
                }
            })).assertEqual('<ul foo="foo" bar="bar" class="foo"><li>Hello world</li></ul>');
        });
        it('test48', 0, () => {
            expect(sanitizeHtml('<ol foo="foo" bar="bar" baz="baz"><li>Hello world</li></ol>', {
                transformTags: {
                    ol: sanitizeHtml.simpleTransform('ul', {
                        class: 'foo'
                    }, false)
                },
                allowedAttributes: {
                    ul: ['foo', 'bar', 'class']
                }
            })).assertEqual('<ul class="foo"><li>Hello world</li></ul>');
        });
        it('test49', 0, () => {
            expect(sanitizeHtml('<ol><li>Hello world</li></ol>', {
                transformTags: {
                    ol: (tagName: string, attribs: any): any => {
                        attribs.class = 'foo';
                        attribs.bar = 'bar';
                        return {
                            tagName: 'ul',
                            attribs: attribs
                        };
                    }
                },
                allowedAttributes: {
                    ul: ['bar', 'class']
                }
            })).assertEqual('<ul class="foo" bar="bar"><li>Hello world</li></ul>');
        });
        it('test50', 0, () => {
            expect(sanitizeHtml('<a href="http://somelink">some text</a>', {
                transformTags: {
                    a: (tagName: any, attribs: any): any => {
                        return {
                            tagName: tagName,
                            attribs: attribs,
                            text: ''
                        };
                    }
                }
            })).assertEqual('<a href="http://somelink"></a>');
        });
        it('test51', 0, () => {
            expect(sanitizeHtml('<a href="http://somelink">some text</a>', {
                transformTags: {
                    a: (tagName: any, attribs: any): any => {
                        return {
                            tagName: tagName,
                            attribs: attribs,
                            text: 'some text need"to<be>filtered'
                        };
                    }
                },
                textFilter: (text: any, tagName: any): any => {
                    return text.replace(new RegExp('\s', 'g'), '_');
                }
            })).assertEqual('<a href="http://somelink">_ome text need"to&lt;be&gt;filtered</a>');
        });
        it('test52', 0, () => {
            expect(sanitizeHtml('<a href="http://somelink">some text</a>', {
                transformTags: {
                    a: (tagName: any, attribs: any): any => {
                        return {
                            tagName: tagName,
                            attribs: attribs,
                            text: 'some good text'
                        };
                    }
                }
            })).assertEqual('<a href="http://somelink">some good text</a>');
        });
        it('test53', 0, () => {
            expect(sanitizeHtml('<p>text before <br> text after</p>', {
                transformTags: {
                    br: (_tagName: string, _attribs: string): any => {
                        return {
                            tagName: 'span',
                            text: ' '
                        };
                    }
                }
            })).assertEqual('<p>text before <span> </span> text after</p>');
        });
        it('test54', 0, () => {
            expect(sanitizeHtml('<a href="http://somelink"></a>', {
                transformTags: {
                    a: (tagName: any, attribs: any): any => {
                        return {
                            tagName: tagName,
                            attribs: attribs,
                            text: 'some new text'
                        };
                    }
                }
            })).assertEqual('<a href="http://somelink">some new text</a>');
        });
        it('test55', 0, () => {
            expect(sanitizeHtml('<a href="http://somelink">some initial text</a>', {
                transformTags: {
                    a: (tagName: any, attribs: any): any => {
                        return {
                            tagName: tagName,
                            attribs: attribs
                        };
                    }
                }
            })).assertEqual('<a href="http://somelink">some initial text</a>');
        });
        it('test56', 0, () => {
            expect(sanitizeHtml('<p>This is <a href="http://www.linux.org"></a><br/>Linux</p>', {
                exclusiveFilter: (frame: any) => {
                    return frame.tag === 'a' && !frame.text.trim();
                }
            })).assertEqual('<p>This is <br />Linux</p>');
        });
        it('test146', 0, () => {
            expect(sanitizeHtml('<p>12<a href="http://www.linux.org"><br/>3<br></a><audio>4</audio></p>', {
                exclusiveFilter: (frame: any) => {
                    if (frame.tag === 'p') {
                        expect(frame.text).assertEqual('124');
                    }
                    else if (frame.tag === 'a') {
                        expect(frame.text).assertEqual('3');
                        return true;
                    }
                    else if (frame.tag === 'br') {
                        expect(frame.text).assertEqual('');
                    }
                    else {
                        expect('p, a, br')!.assertEqual(frame.tag);
                    }
                    return false;
                }
            })).assertEqual('<p>124</p>');
        });
        it('test57', 0, () => {
            expect(sanitizeHtml('<p><a href="http://www.linux.org"><br/></a></p>', {
                exclusiveFilter: (frame: any) => {
                    return (frame.tag === 'a' || frame.tag === 'p') && !frame.text.trim();
                }
            })).assertEqual('');
        });
        it('test58', 0, () => {
            const markup = '<a href="http://www.linux.org"><img /><video></video></a>';
            const sansVideo = '<a href="http://www.linux.org"><img /></a>';
            const sanitizedMarkup = sanitizeHtml(markup, {
                allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
                exclusiveFilter: (frame: any) => {
                    if (frame.tag === 'a') {
                        // eslint-disable-next-line no-console
                        expect(frame.mediaChildren.length === 1);
                    }
                    return (frame.tag === 'a') && !frame.text.trim() && !frame.mediaChildren.length;
                }
            });
            expect(sanitizedMarkup).assertEqual(sansVideo);
        });
        it('test59', 0, () => {
            expect(sanitizeHtml('I love <a href="www.linux.org" target="_hplink">Linux</a> OS', {
                exclusiveFilter: (frame: any) => {
                    return (frame.tag === 'a') && !frame.text.trim();
                }
            })).assertEqual('I love <a href="www.linux.org" target="_hplink">Linux</a> OS');
        });
        it('test60', 0, () => {
            expect(sanitizeHtml(
            // teeny-tiny valid transparent GIF in a data URL
            '<img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" />', {
                allowedTags: ['img']
            })).assertEqual('<img />');
        });
        it('test61', 0, () => {
            expect(sanitizeHtml(
            // teeny-tiny valid transparent GIF in a data URL
            '<img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" />', {
                allowedTags: ['img', 'p'],
                allowedSchemes: ['data', 'http']
            })).assertEqual('<img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" />');
        });
        it('test62', 0, () => {
            expect(sanitizeHtml('<p class="nifty simple dippy">whee</p>', {
                allowedTags: ['p'],
                allowedClasses: {
                    p: ['nifty']
                }
            })).assertEqual('<p class="nifty">whee</p>');
        });
        it('test63', 0, () => {
            expect(sanitizeHtml('<p class="nifty simple dippy">whee</p><div class="dippy nifty simple"></div>', {
                allowedTags: ['p', 'div'],
                allowedClasses: {
                    p: ['nifty']
                }
            })).assertEqual('<p class="nifty">whee</p><div></div>');
        });
        it('test64', 0, () => {
            expect(sanitizeHtml('<p class="nifty simple dippy">whee</p><div class="simple dippy nifty"></div>', {
                allowedTags: ['p', 'div'],
                allowedClasses: {
                    a: ['simple'],
                    p: ['nifty'],
                    div: ['dippy']
                }
            })).assertEqual('<p class="nifty">whee</p><div class="dippy"></div>');
        });
        it('test65', 0, () => {
            expect(sanitizeHtml('<p class="nifty- nifty-a simple dippy dippy-a-simple">whee</p>', {
                allowedTags: ['p'],
                allowedClasses: {
                    a: ['dippy-*-simple'],
                    p: ['nifty-*']
                }
            })).assertEqual('<p class="nifty- nifty-a">whee</p>');
        });
        it('test66', 0, () => {
            expect(sanitizeHtml('<p class="nifty simple dippy">whee</p>', {
                allowedTags: ['p'],
                allowedClasses: {
                    p: ['*']
                }
            })).assertEqual('<p class="nifty simple dippy">whee</p>');
        });
        it('test67', 0, () => {
            expect(sanitizeHtml('<p class="nifty33 nifty2 dippy">whee</p>', {
                allowedTags: ['p'],
                allowedClasses: {
                    p: [new RegExp('^nifty\d{2}$'), new RegExp('^d\w{4}$')]
                }
            })).assertEqual('<p>whee</p>');
        });
        it('test68', 0, () => {
            expect(sanitizeHtml(
            // teeny-tiny valid transparent GIF in a data URL
            '<img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" /><a href="https://www.example.com"></a>', {
                allowedTags: ['img', 'a'],
                allowedSchemes: ['http'],
                allowedSchemesByTag: {
                    img: ['data'],
                    a: ['https']
                }
            })).assertEqual('<img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" /><a href="https://www.example.com"></a>');
            expect(sanitizeHtml(
            // teeny-tiny valid transparent GIF in a data URL
            '<img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" /><a href="https://www.example.com"></a>', {
                allowedTags: ['img', 'a'],
                allowedSchemes: ['http'],
                allowedSchemesByTag: {
                    img: [],
                    a: ['https']
                }
            })).assertEqual('<img /><a href="https://www.example.com"></a>');
        });
        it('test69', 0, () => {
            expect(sanitizeHtml('<p class="">whee</p>', {
                allowedTags: ['p'],
                allowedClasses: {
                    p: ['nifty']
                }
            })).assertEqual('<p>whee</p>');
        });
        it('test70', 0, () => {
            expect(sanitizeHtml('<p a')).assertEqual('');
        });
        it('test71', 0, () => {
            expect(sanitizeHtml('<IMG SRC= onmouseover="alert(\'XSS\');">', {
                allowedTags: ['img'],
                allowedAttributes: {
                    img: ['src']
                }
            })).assertEqual(
            // This is weird but not dangerous. Without the &quot there
            // would probably be some way to make it come out as a
            // separate attribute
            '<img src="onmouseover=&quot;alert(\'XSS\');&quot;" />');
        });
        it('test72', 0, () => {
            expect(sanitizeHtml('<table bgcolor="1" align="left" notlisted="0"><img src="1.gif" align="center" alt="not listed too"/></table>', {
                allowedTags: ['table', 'img'],
                allowedAttributes: {
                    table: ['bgcolor', 'align', 'src'],
                    img: ['align', 'src']
                }
            })).assertEqual('<table bgcolor="1" align="left"><img src="1.gif" align="center" /></table>');
        });
        it('test73', 0, () => {
            class attrib {
                href: any = 0;
                target: string = '';
            }
            expect(sanitizeHtml('<a href="test.html">test</a>', {
                allowedTags: ['a'],
                allowedAttributes: {
                    a: ['href', 'target']
                },
                transformTags: {
                    a: (tagName: any, attribs: attrib): any => {
                        if (!attribs.href) {
                            return false;
                        }
                        return {
                            tagName: tagName,
                            attribs: attribs = {
                                target: '_blank',
                                href: attribs.href
                            }
                        };
                    }
                },
                exclusiveFilter: (frame: any) => {
                    return frame.tag === 'a' && frame.text.trim() === 'blah';
                }
            })).assertEqual('<a target="_blank" href="test.html">test</a>');
        });
        it('test74', 0, () => {
            expect(sanitizeHtml('<a href="test.html">blah</a>', {
                allowedTags: ['a'],
                allowedAttributes: {
                    a: ['href', 'target']
                },
                transformTags: {
                    a: (tagName: any, attribs: any): any => {
                        if (!attribs.href) {
                            return false;
                        }
                        return {
                            tagName: tagName,
                            attribs: attribs = {
                                target: '_blank',
                                href: attribs.href
                            }
                        };
                    }
                },
                exclusiveFilter: (frame: any): any => {
                    return frame.tag === 'a' && frame.text.trim() === 'blah';
                }
            })).assertEqual('');
        });
        it('test75', 0, () => {
            expect(sanitizeHtml('<p>Text</p>', {
                allowedTags: ['p'],
                allowedAttributes: {
                    p: ['style']
                },
                transformTags: {
                    p: (tagName: any, attribs: any): any => {
                        return {
                            tagName: tagName,
                            attribs: attribs = {
                                style: 'text-align: center'
                            }
                        };
                    }
                }
            })).assertEqual('<p style="text-align:center">Text</p>');
        });
        it('test76', 0, () => {
            expect(sanitizeHtml('<<img src="javascript:evil"/>img src="javascript:evil"/>')).assertEqual('&lt;img src="javascript:evil"/&gt;');
            expect(sanitizeHtml('<<a href="javascript:evil"/>a href="javascript:evil"/>')).assertEqual('&lt;<a>a href="javascript:evil"/&gt;</a>');
        });
        it('test77', 0, () => {
            expect(sanitizeHtml('<a data-target="#test" data-foo="hello">click me</a>', {
                allowedTags: ['a'],
                allowedAttributes: {
                    a: ['data-*']
                }
            })).assertEqual('<a data-target="#test" data-foo="hello">click me</a>');
            expect(sanitizeHtml('<a data-target="#test" data-my-foo="hello">click me</a>', {
                allowedTags: ['a'],
                allowedAttributes: {
                    a: ['data-*-foo']
                }
            })).assertEqual('<a data-my-foo="hello">click me</a>');
        });
        it('test78', 0, () => {
            expect(sanitizeHtml('<a data-b.c="#test" data-bcc="remove this">click me</a>', {
                allowedTags: ['a'],
                allowedAttributes: {
                    a: ['data-b.*']
                }
            })).assertEqual('<a data-b.c="#test">click me</a>');
        });
        it('test79', 0, () => {
            expect(sanitizeHtml('<div>"normal text"</div><script>"this is code"</script>', {
                allowedTags: ['script']
            })).assertEqual('"normal text"<script>"this is code"</script>');
            expect(sanitizeHtml('<div>"normal text"</div><style>body { background-image: url("image.test"); }</style>', {
                allowedTags: ['style']
            })).assertEqual('"normal text"<style>body { background-image: url("image.test"); }</style>');
        });
        it('test80', 0, () => {
            expect(sanitizeHtml('<script>alert("&quot;This is cool but just ironically so I quoted it&quot;")</script>', {
                allowedTags: ['script']
            })).assertEqual('<script>alert("&quot;This is cool but just ironically so I quoted it&quot;")</script>');
        });
        it('test81', 0, () => {
            expect(sanitizeHtml('"normal text this should be removed"', {
                textFilter: (text: any, tagName: any): any => {
                    return text.replace(' this should be removed', '');
                }
            })).assertEqual('"normal text"');
        });
        it('test82', 0, () => {
            expect(sanitizeHtml('<a>normal text this should be removed</a><b>normal text this should be removed</b>', {
                textFilter: (text: any, tagName: any): any => {
                    if (tagName === 'a') {
                        return text;
                    }
                    ;
                    return text.replace(' this should be removed', '');
                }
            })).assertEqual('<a>normal text this should be removed</a><b>normal text</b>');
        });
        it('test83', 0, () => {
            expect(sanitizeHtml('<Archer><Sterling>I am</Sterling></Archer>', {
                allowedTags: false,
                allowedAttributes: false
            })).assertEqual('<archer><sterling>I am</sterling></archer>');
            expect(sanitizeHtml('<Archer><Sterling>I am</Sterling></Archer>', {
                allowedTags: false,
                allowedAttributes: false,
                parser: {
                    lowerCaseTags: false
                }
            })).assertEqual('<Archer><Sterling>I am</Sterling></Archer>');
        });
        it('test84', 0, () => {
            expect(sanitizeHtml('!<__proto__>!')).assertEqual('!&lt;__proto__&gt;!');
        });
        it('test85', 0, () => {
            expect(sanitizeHtml('!<textarea>&lt;/textarea&gt;&lt;svg/onload=prompt`xs`&gt;</textarea>!', {
                allowedTags: ['textarea']
            })).assertEqual('!<textarea>&lt;/textarea&gt;&lt;svg/onload=prompt`xs`&gt;</textarea>!');
        });
        it('test86', 0, () => {
            expect(sanitizeHtml('<a href="//cnn.com/example">test</a>')).assertEqual('<a href="//cnn.com/example">test</a>');
        });
        it('test87', 0, () => {
            expect(sanitizeHtml('<a href="//cnn.com/example">test</a>', {
                allowProtocolRelative: false
            })).assertEqual('<a>test</a>');
            expect(sanitizeHtml('<a href="/\\cnn.com/example">test</a>', {
                allowProtocolRelative: false
            })).assertEqual('<a>test</a>');
            expect(sanitizeHtml('<a href="\\\\cnn.com/example">test</a>', {
                allowProtocolRelative: false
            })).assertEqual('<a>test</a>');
            expect(sanitizeHtml('<a href="\\/cnn.com/example">test</a>', {
                allowProtocolRelative: false
            })).assertEqual('<a>test</a>');
        });
        it('test88', 0, () => {
            expect(sanitizeHtml('<a href="/welcome">test</a>', {
                allowProtocolRelative: false
            })).assertEqual('<a href="/welcome">test</a>');
        });
        it('test89', 0, () => {
            expect(sanitizeHtml('<img src="fallback.jpg" srcset="foo.jpg 100w 2x, bar.jpg 200w 1x" />', {
                allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
            })).assertEqual('<img src="fallback.jpg" />');
        });
        it('test90', 0, () => {
            expect(sanitizeHtml('<img src="fallback.jpg" srcset="foo.jpg 100w, bar.jpg 200w" />', {
                allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
                allowedAttributes: {
                    img: ['src', 'srcset']
                }
            })).assertEqual('<img src="fallback.jpg" srcset="foo.jpg 100w, bar.jpg 200w" />');
            expect(sanitizeHtml('<img src="fallback.jpg" srcset="foo.jpg 2x, bar.jpg 1x" />', {
                allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
                allowedAttributes: {
                    img: ['src', 'srcset']
                }
            })).assertEqual('<img src="fallback.jpg" srcset="foo.jpg 2x, bar.jpg 1x" />');
        });
        it('test91', 0, () => {
            expect(sanitizeHtml('<img src="fallback.jpg" srcset="foo.jpg 100w, bar.jpg 200w, javascript:alert(1) 100w" />', {
                allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
                allowedAttributes: {
                    img: ['src', 'srcset']
                }
            })).assertEqual('<img src="fallback.jpg" srcset="foo.jpg 100w, bar.jpg 200w" />');
        });
        it('test92', 0, () => {
            expect(sanitizeHtml('<img src="fallback.jpg" srcset="/upload/f_auto,q_auto:eco,c_fit,w_1460,h_2191/abc.jpg 1460w, /upload/f_auto,q_auto:eco,c_fit,w_1360,h_2041/abc.jpg" />', {
                allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
                allowedAttributes: {
                    img: ['src', 'srcset']
                }
            })).assertEqual('<img src="fallback.jpg" srcset="/upload/f_auto,q_auto:eco,c_fit,w_1460,h_2191/abc.jpg 1460w, /upload/f_auto,q_auto:eco,c_fit,w_1360,h_2041/abc.jpg" />');
        });
        it('test93', 0, () => {
            const input = '<input value="&lt;script&gt;alert(1)&lt;/script&gt;">';
            const want = '<u></u>';
            // Runs the sanitizer with a policy that turns an attribute into
            // text.  A policy like this might be used to turn inputs into
            // inline elements that look like the original but which do not
            // affect form submissions.
            const got = sanitizeHtml(input, {
                allowedTags: ['u'],
                allowedAttributes: {
                    a: ['class']
                },
                transformTags: {
                    input: (tagName: any, attribs: any): any => {
                        return {
                            tagName: 'u',
                            attribs: attribs = {
                                class: 'inlined-input'
                            },
                            text: attribs.value
                        };
                    }
                }
            });
            expect(got).assertEqual(want);
        });
        it('test94', 0, () => {
            expect(sanitizeHtml('<span data-<script>alert(1)//>', {
                allowedTags: ['span'],
                allowedAttributes: {
                    span: ['data-*']
                }
            })).assertEqual('<span>alert(1)//&gt;</span>');
        });
        it('test96', 0, () => {
            expect(sanitizeHtml('<span style=\'\'></span>', {
                allowedTags: false,
                allowedAttributes: false
            })).assertEqual('<span></span>');
        });
        it('test97', 0, () => {
            expect(sanitizeHtml('<span style=\'color: blue; text-align: justify\'></span>', {
                allowedTags: false,
                allowedAttributes: {
                    span: ['style']
                },
                allowedStyles: {
                    span: {
                        color: [new RegExp('blue')],
                        text: [new RegExp('left')]
                    }
                }
            })).assertEqual('<span style="color:blue"></span>');
        });
        it('test98', 0, () => {
            expect(sanitizeHtml('<span style=\'color: blue !important\'></span>', {
                allowedTags: false,
                allowedAttributes: {
                    span: ['style']
                },
                allowedStyles: {
                    span: {
                        color: [new RegExp('blue')]
                    }
                }
            })).assertEqual('<span style="color:blue !important"></span>');
        });
        it('test99', 0, () => {
            expect(sanitizeHtml('<span style=\'color: yellow; text-align: center; font-family: helvetica\'></span>', {
                allowedTags: false,
                allowedAttributes: {
                    span: ['style']
                },
                allowedStyles: {
                    a: {
                        color: [new RegExp('yellow')],
                        text_align: [new RegExp('center')]
                    },
                    span: {
                        color: [new RegExp('green')],
                        font_family: [new RegExp('helvetica')]
                    }
                }
            })).assertEqual('<span></span>');
        });
        it('test100', 0, () => {
            expect(sanitizeHtml('<script src="https://www.unauthorized.com/lib.js"></script>', {
                allowedTags: ['script'],
                allowVulnerableTags: true,
                allowedAttributes: {
                    script: ['src']
                },
                allowedScriptHostnames: ['www.authorized.com']
            })).assertEqual('<script></script>');
        });
        it('test101', 0, () => {
            expect(sanitizeHtml('<script src="not-a-valid-url"></script>', {
                allowedTags: ['script'],
                allowVulnerableTags: true,
                allowedAttributes: {
                    script: ['src']
                },
                allowedScriptHostnames: ['www.unauthorized.com']
            })).assertEqual('<script></script>');
        });
        it('test102', 0, () => {
            expect(sanitizeHtml('<script src="https://www.safe.authorized.com/lib.js"></script>', {
                allowedTags: ['script'],
                allowedAttributes: {
                    script: ['src']
                },
                allowedScriptDomains: ['authorized.com']
            })).assertEqual('<script></script>');
        });
        it('test103', 0, () => {
            expect(sanitizeHtml('<script src="https://www.authorized.com/lib.js"> alert("evil") </script>', {
                allowedTags: ['script'],
                allowVulnerableTags: true,
                allowedAttributes: {
                    script: ['src']
                },
                allowedScriptHostnames: ['www.authorized.com']
            })).assertEqual('<script></script>');
        });
        it('test104', 0, () => {
            expect(sanitizeHtml('<script>alert("evil")</script>', {
                allowedTags: ['script'],
                allowVulnerableTags: true,
                allowedAttributes: {
                    script: ['src']
                },
                allowedScriptHostnames: ['www.authorized.com']
            })).assertEqual('<script></script>');
        });
        it('test105', 0, () => {
            expect(sanitizeHtml('<script>alert("evil")</script>', {
                allowedTags: ['script'],
                allowVulnerableTags: true,
                allowedAttributes: {
                    script: ['src']
                },
                allowedScriptDomains: ['www.authorized.com']
            })).assertEqual('<script></script>');
        });
        it('test106', 0, () => {
            expect(sanitizeHtml('<script src="https://www.authorized.com/lib.js"></script>', {
                allowedTags: ['script'],
                allowVulnerableTags: true,
                allowedAttributes: {
                    script: ['src']
                },
                allowedScriptHostnames: ['www.authorized.com']
            })).assertEqual('<script></script>');
        });
        it('test107', 0, () => {
            expect(sanitizeHtml('<iframe src="https://www.youtube.com/embed/c2IlcS7AHxM"></iframe>', {
                allowedTags: ['p', 'iframe', 'a', 'img', 'i'],
                allowedAttributes: {
                    iframe: ['src', 'href'],
                    a: ['src', 'href'],
                    img: ['src']
                },
                allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com']
            })).assertEqual('<iframe></iframe>');
        });
        it('test108', 0, () => {
            expect(sanitizeHtml('<iframe src="https://www.embed.vevo.com/USUV71704255"></iframe>', {
                allowedTags: ['p', 'iframe', 'a', 'img', 'i'],
                allowedAttributes: {
                    iframe: ['src', 'href'],
                    a: ['src', 'href'],
                    img: ['src']
                },
                allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com']
            })).assertEqual('<iframe></iframe>');
        });
        it('test109', 0, () => {
            expect(sanitizeHtml('<iframe src="https://www.vimeo.com/embed/c2IlcS7AHxM"></iframe>', {
                allowedTags: ['p', 'iframe', 'a', 'img', 'i'],
                allowedAttributes: {
                    iframe: ['src', 'href'],
                    a: ['src', 'href'],
                    img: ['src']
                },
                allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com']
            })).assertEqual('<iframe></iframe>');
        });
        it('test110', 0, () => {
            expect(sanitizeHtml('<iframe src="https://www.vimeo.com/embed/c2IlcS7AHxM"></iframe>', {
                allowedTags: ['p', 'iframe', 'a', 'img', 'i'],
                allowedAttributes: {
                    iframe: ['src', 'href'],
                    a: ['src', 'href'],
                    img: ['src']
                }
            })).assertEqual('<iframe></iframe>');
        });
        it('test111', 0, () => {
            expect(sanitizeHtml('<iframe src="https://www.foo.us02web.zoom.us/embed/c2IlcS7AHxM"></iframe>', {
                allowedTags: ['p', 'iframe', 'a', 'img', 'i'],
                allowedAttributes: {
                    iframe: ['src', 'href'],
                    a: ['src', 'href'],
                    img: ['src']
                },
                allowedIframeDomains: ['zoom.us']
            })).assertEqual('<iframe></iframe>');
        });
        it('test112', 0, () => {
            expect(sanitizeHtml('<iframe src="https://zoom.us/embed/c2IlcS7AHxM"></iframe>', {
                allowedTags: ['p', 'iframe', 'a', 'img', 'i'],
                allowedAttributes: {
                    iframe: ['src', 'href'],
                    a: ['src', 'href'],
                    img: ['src']
                },
                allowedIframeDomains: ['zoom.us']
            })).assertEqual('<iframe></iframe>');
        });
        it('test113', 0, () => {
            expect(sanitizeHtml('<iframe src="https://www.prefix.us02web.zoom.us/embed/c2IlcS7AHxM"></iframe>', {
                allowedTags: ['p', 'iframe', 'a', 'img', 'i'],
                allowedAttributes: {
                    iframe: ['src', 'href'],
                    a: ['src', 'href'],
                    img: ['src']
                },
                allowedIframeDomains: ['vimeo.com']
            })).assertEqual('<iframe></iframe>');
        });
        it('test114', 0, () => {
            expect(sanitizeHtml('<iframe src="https://www.zoomzoom.us/embed/c2IlcS7AHxM"></iframe>', {
                allowedTags: ['p', 'iframe', 'a', 'img', 'i'],
                allowedAttributes: {
                    iframe: ['src', 'href'],
                    a: ['src', 'href'],
                    img: ['src']
                },
                allowedIframeDomains: ['zoom.us']
            })).assertEqual('<iframe></iframe>');
        });
        it('test115', 0, () => {
            expect(sanitizeHtml('<iframe src="https://www.youtube.com/embed/c2IlcS7AHxM"></iframe>', {
                allowedTags: ['p', 'iframe', 'a', 'img', 'i'],
                allowedAttributes: {
                    iframe: ['src', 'href'],
                    a: ['src', 'href'],
                    img: ['src']
                },
                allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com'],
                allowedIframeDomains: ['zoom.us']
            })).assertEqual('<iframe></iframe>');
        });
        it('test116', 0, () => {
            expect(sanitizeHtml('<iframe src="https://www.us02web.zoom.us/embed/c2IlcS7AHxM"></iframe>', {
                allowedTags: ['p', 'iframe', 'a', 'img', 'i'],
                allowedAttributes: {
                    iframe: ['src', 'href'],
                    a: ['src', 'href'],
                    img: ['src']
                },
                allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com'],
                allowedIframeDomains: ['zoom.us']
            })).assertEqual('<iframe></iframe>');
        });
        it('test117', 0, () => {
            expect(sanitizeHtml('<iframe src="/foo"></iframe>', {
                allowedTags: ['p', 'iframe', 'a', 'img', 'i'],
                allowedAttributes: {
                    iframe: ['src', 'href'],
                    a: ['src', 'href'],
                    img: ['src']
                }
            })).assertEqual('<iframe></iframe>');
        });
        it('test118', 0, () => {
            expect(sanitizeHtml('<iframe src="/foo"></iframe>', {
                allowedTags: ['p', 'iframe', 'a', 'img', 'i'],
                allowedAttributes: {
                    iframe: ['src', 'href'],
                    a: ['src', 'href'],
                    img: ['src']
                },
                allowIframeRelativeUrls: true
            })).assertEqual('<iframe></iframe>');
        });
        it('test119', 0, () => {
            expect(sanitizeHtml('<iframe src="/foo"></iframe>', {
                allowedTags: ['p', 'iframe', 'a', 'img', 'i'],
                allowedAttributes: {
                    iframe: ['src', 'href'],
                    a: ['src', 'href'],
                    img: ['src']
                },
                allowIframeRelativeUrls: false
            })).assertEqual('<iframe></iframe>');
        });
        it('test120', 0, () => {
            expect(sanitizeHtml('<iframe src="/foo"></iframe><iframe src="https://www.youtube.com/embed/c2IlcS7AHxM"></iframe>', {
                allowedTags: ['p', 'iframe', 'a', 'img', 'i'],
                allowedAttributes: {
                    iframe: ['src', 'href'],
                    a: ['src', 'href'],
                    img: ['src']
                },
                allowedIframeHostnames: ['www.youtube.com']
            })).assertEqual('<iframe></iframe><iframe></iframe>');
        });
        it('test121', 0, () => {
            expect(sanitizeHtml('<iframe src="/foo"></iframe><iframe src="https://www.youtube.com/embed/c2IlcS7AHxM"></iframe>', {
                allowedTags: ['p', 'iframe', 'a', 'img', 'i'],
                allowedAttributes: {
                    iframe: ['src', 'href'],
                    a: ['src', 'href'],
                    img: ['src']
                },
                allowIframeRelativeUrls: true,
                allowedIframeHostnames: ['www.youtube.com']
            })).assertEqual('<iframe></iframe><iframe></iframe>');
        });
        it('test122', 0, () => {
            expect(sanitizeHtml('<iframe src="//www.youtube.com/embed/c2IlcS7AHxM"></iframe>', {
                allowedTags: ['p', 'iframe', 'a', 'img', 'i'],
                allowedAttributes: {
                    iframe: ['src', 'href'],
                    a: ['src', 'href'],
                    img: ['src']
                },
                allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com']
            })).assertEqual('<iframe></iframe>');
        });
        it('test123', 0, () => {
            expect(sanitizeHtml('<iframe src="//www.vimeo.com/embed/c2IlcS7AHxM"></iframe>', {
                allowedTags: ['p', 'iframe', 'a', 'img', 'i'],
                allowedAttributes: {
                    iframe: ['src', 'href'],
                    a: ['src', 'href'],
                    img: ['src']
                },
                allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com']
            })).assertEqual('<iframe></iframe>');
        });
        it('test124', 0, () => {
            expect(sanitizeHtml('<iframe name="IFRAME" allowfullscreen="true" sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation"></iframe>', {
                allowedTags: sanitizeHtml.defaults.allowedTags.concat(['iframe']),
                allowedAttributes: {
                    iframe: [
                        {
                            name: 'sandbox',
                            multiple: true,
                            values: ['allow-popups', 'allow-same-origin', 'allow-scripts']
                        },
                        'allowfullscreen'
                    ]
                }
            }))
                .assertEqual('<iframe allowfullscreen="true" sandbox="allow-popups allow-same-origin allow-scripts"></iframe>');
        });
        it('test125', 0, () => {
            expect(sanitizeHtml('<iframe sandbox="allow-popups allow-modals"></iframe><iframe sandbox="allow-popups"></iframe><iframe sandbox="allow-scripts"></iframe>', {
                allowedTags: sanitizeHtml.defaults.allowedTags.concat(['iframe']),
                allowedAttributes: {
                    iframe: [
                        {
                            name: 'sandbox',
                            multiple: false,
                            values: ['allow-popups', 'allow-same-origin', 'allow-scripts']
                        }
                    ]
                }
            }))
                .assertEqual('<iframe sandbox></iframe><iframe sandbox="allow-popups"></iframe><iframe sandbox="allow-scripts"></iframe>');
        });
        it('test126', 0, () => {
            expect(sanitizeHtml('<q cite="http://www.google.com">HTTP</q><q cite="https://www.google.com">HTTPS</q><q cite="mailto://www.google.com">MAILTO</q><q cite="tel://www.google.com">TEL</q><q cite="ms-calculator:">ms-calculator</q><q cite="ftp://www.google.com">FTP</q><q cite="data://www.google.com">DATA</q><q cite="ldap://www.google.com">LDAP</q><q cite="acrobat://www.google.com">ACROBAT</q><q cite="vbscript://www.google.com">VBSCRIPT</q><q cite="file://www.google.com">FILE</q><q cite="rlogin://www.google.com">RLOGIN</q><q cite="webcal://www.google.com">WEBCAL</q><q cite="javascript://www.google.com">JAVASCRIPT</q><q cite="mms://www.google.com">MMS</q>', {
                allowedTags: sanitizeHtml.defaults.allowedTags.concat(['q']),
                allowedAttributes: {
                    q: ['cite']
                },
                allowedSchemes: sanitizeHtml.defaults.allowedSchemes.concat(['tel'])
            }))
                .assertEqual('<q cite="http://www.google.com">HTTP</q><q cite="https://www.google.com">HTTPS</q><q cite="mailto://www.google.com">MAILTO</q><q cite="tel://www.google.com">TEL</q><q>ms-calculator</q><q cite="ftp://www.google.com">FTP</q><q>DATA</q><q>LDAP</q><q>ACROBAT</q><q>VBSCRIPT</q><q>FILE</q><q>RLOGIN</q><q>WEBCAL</q><q>JAVASCRIPT</q><q>MMS</q>');
        });
        it('test127', 0, () => {
            expect(sanitizeHtml('"< & >" <span class="&#34;test&#34;">cool</span>', {
                allowedTags: ['span'],
                allowedAttributes: {
                    span: ['class']
                }
            })).assertEqual('"&lt; &amp; &gt;" <span class="&quot;test&quot;">cool</span>');
        });
        it('test128', 0, () => {
            expect(sanitizeHtml('<img src="<0&0;0.2&" />', {
                allowedTags: ['img']
            })).assertEqual('<img src="&lt;0&amp;0;0.2&amp;" />');
        });
        // it('test129', 0, ()=> {
        //   const textIn = 'This &amp; & that &reg; &#x0000A; &#10; &plusmn; OK?';
        //   const expectedResult = 'This &amp; &amp; that &reg; &#x0000A; &#10; &plusmn; OK?';
        //   const sanitizeHtmlOptions:ESObject = {
        //     parser: {
        //       decodeEntities: false
        //     }
        //   };
        //   expect(sanitizeHtml(textIn, sanitizeHtmlOptions)).assertEqual(expectedResult);
        // });
        // TODO: make this test and similar tests for entities that are not
        // strictly valid pass, at which point decodeEntities: false is safe
        // to use.
        //
        // it('Should not pass through &0; (a bogus entity) unescaped if decodeEntities is false',0, function() {
        //   expect(sanitizeHtml(
        //     '<img src="<0&0;0.2&" />', {
        //       allowedTags: ['img'],
        //       parser: {
        //         decodeEntities: false
        //       }
        //     }), '<img src="&lt;0&amp;0;0.2&amp;" />');
        // });
        it('test130', 0, () => {
            expect(sanitizeHtml('<div><wiggly>Hello<p>World</p></wiggly></div>', {
                disallowedTagsMode: 'recursiveEscape'
            })).assertEqual('<div>&lt;wiggly&gt;Hello&lt;p&gt;World&lt;/p&gt;&lt;/wiggly&gt;</div>');
        });
        it('test131', 0, () => {
            expect(sanitizeHtml('<div><wiggly>Hello<p>World</p></wiggly></div>', {
                disallowedTagsMode: 'escape'
            })).assertEqual('<div>&lt;wiggly&gt;Hello<p>World</p>&lt;/wiggly&gt;</div>');
        });
        it('test132', 0, () => {
            expect(sanitizeHtml('<wiggly>Hello</wiggly>', {
                disallowedTagsMode: 'escape',
                parser: {
                    decodeEntities: false
                }
            })).assertEqual('&lt;wiggly&gt;Hello&lt;/wiggly&gt;');
        });
        it('test133', 0, () => {
            expect(sanitizeHtml('<div><wiggly>Hello<p>World</p><tiggly>JS</tiggly></wiggly></div>', {
                disallowedTagsMode: 'recursiveEscape'
            })).assertEqual('<div>&lt;wiggly&gt;Hello&lt;p&gt;World&lt;/p&gt;&lt;tiggly&gt;JS&lt;/tiggly&gt;&lt;/wiggly&gt;</div>');
        });
        it('test134', 0, () => {
            expect(sanitizeHtml('<div><wiggly>Hello<p>World</p><tiggly>JS</tiggly></wiggly></div>', {
                disallowedTagsMode: 'escape'
            })).assertEqual('<div>&lt;wiggly&gt;Hello<p>World</p>&lt;tiggly&gt;JS&lt;/tiggly&gt;&lt;/wiggly&gt;</div>');
        });
        it('test135', 0, () => {
            expect(sanitizeHtml('<div><div><div><div><div><div></div></div></div></div></div></div>', {
                nestingLimit: 6
            })).assertEqual('<div><div><div><div><div><div></div></div></div></div></div></div>');
        });
        it('test136', 0, () => {
            expect(
            // 7 divs here
            sanitizeHtml('<div><div><div><div><div><div><div>nested text</div></div></div></div></div></div></div>', {
                nestingLimit: 6
            })).assertEqual(// only 6 kept
            '<div><div><div><div><div><div>nested text</div></div></div></div></div></div>');
        });
        it('test137', 0, () => {
            expect(sanitizeHtml('<iframe src=//www.youtube.comissocool>', {
                allowedTags: ['iframe'],
                allowedAttributes: {
                    iframe: ['src']
                },
                allowedIframeHostnames: ['www.youtube.com']
            })).assertEqual('<iframe></iframe>');
        });
        it('test138', 0, () => {
            expect(sanitizeHtml('<iframe src=//www.youtube.com%C3%9E.93.184.216.34.nip.io>', {
                allowedTags: ['iframe'],
                allowedAttributes: {
                    iframe: ['src']
                },
                allowedIframeHostnames: ['www.youtube.com']
            })).assertEqual('<iframe></iframe>');
        });
        it('test139', 0, () => {
            expect(sanitizeHtml('<a href="/foo"></a>')).assertEqual('<a href="/foo"></a>');
        });
        it('test140', 0, () => {
            expect(sanitizeHtml('<a href="foo"></a>')).assertEqual('<a href="foo"></a>');
        });
        it('test141', 0, () => {
            expect(sanitizeHtml('<a href="../../foo"></a>')).assertEqual('<a href="../../foo"></a>');
        });
        it('test142', 0, () => {
            expect(sanitizeHtml('<a href="//foo.com/foo"></a>')).assertEqual('<a href="//foo.com/foo"></a>');
        });
        it('test143', 0, () => {
            expect(sanitizeHtml('<iframe src="relative://relative-test/aha">', {
                allowedTags: ['iframe'],
                allowedAttributes: {
                    iframe: ['src']
                }
            })).assertEqual('<iframe></iframe>');
        });
        it('test144', 0, () => {
            expect(sanitizeHtml('<iframe src="/\\example.com"></iframe>', {
                allowedTags: ['iframe'],
                allowedAttributes: {
                    iframe: ['src']
                },
                allowedIframeHostnames: ['www.youtube.com'],
                allowIframeRelativeUrls: true
            })).assertEqual('<iframe></iframe>');
            expect(sanitizeHtml('<iframe src="\\/example.com"></iframe>', {
                allowedTags: ['iframe'],
                allowedAttributes: {
                    iframe: ['src']
                },
                allowedIframeHostnames: ['www.youtube.com'],
                allowIframeRelativeUrls: true
            })).assertEqual('<iframe></iframe>');
            const linefeed = decodeURIComponent('%0A');
            expect(sanitizeHtml('<iframe src="/' + linefeed + '\\example.com"></iframe>', {
                allowedTags: ['iframe'],
                allowedAttributes: {
                    iframe: ['src']
                },
                allowedIframeHostnames: ['www.youtube.com'],
                allowIframeRelativeUrls: true
            })).assertEqual('<iframe></iframe>');
            const creturn = decodeURIComponent('%0D');
            expect(sanitizeHtml('<iframe src="/' + creturn + '\\example.com"></iframe>', {
                allowedTags: ['iframe'],
                allowedAttributes: {
                    iframe: ['src']
                },
                allowedIframeHostnames: ['www.youtube.com'],
                allowIframeRelativeUrls: true
            })).assertEqual('<iframe></iframe>');
            const tab = decodeURIComponent('%09');
            expect(sanitizeHtml('<iframe src="/' + tab + '\\example.com"></iframe>', {
                allowedTags: ['iframe'],
                allowedAttributes: {
                    iframe: ['src']
                },
                allowedIframeHostnames: ['www.youtube.com'],
                allowIframeRelativeUrls: true
            })).assertEqual('<iframe></iframe>');
        });
        it('test145', 0, () => {
            expect(sanitizeHtml('<script src="//example.com/script.js"></script>', {
                allowedTags: ['script'],
                allowedAttributes: {
                    script: ['src']
                }
            })).assertEqual('<script></script>');
        });
    });
}
