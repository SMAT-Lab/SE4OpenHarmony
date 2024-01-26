let __generate__Id: number = 0;
function generateId(): string {
    return "Ability.test_" + ++__generate__Id;
}
/**
 * The MIT License
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
import { describe, expect, it } from '@ohos/hypium';
import { XMLWriter } from '@ohos/htmltoxml';
const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    .tagh1{
        background-color: aquamarine;
        color:'blue';
    }
    .one-div{
        line-height: 30px;
    }
</style>
<body>
    <h1 class="tagh1">
        kkkk
        <p>hhhhh</p>
    </h1>
    <div style="color:red; height:100px;" class="one-div">cshi</div>
    <img src="https:baidu.com" alt="wwww"/>
    <p>wjdwekfe</p>
    <em>dsjfw
    <div>dksfmjk</div>
    owqkdo</em>
</body>
</html>
`;
const html1 = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    .tagh1{
        background-color: aquamarine;
        color:'blue';
    }
    .one-div{
        line-height: 65px;
    }
</style>
<body>
<h1 class="tagh1">
    jjjj
    <p>pppppp</p>
</h1>
<div style="color:red; height:100px;" class="one-div">cshi</div>
<img src="https:baidu.com" alt="wwww"/>
<p>china</p>
<em>apple
    <div>hello</div>
    world</em>
</body>
</html>`;
const html2 = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<head><meta http-equiv="Content-Type" content="text/html; charset=gb2312"><title>白泽居-www.baizeju.com</title></head>
<html xmlns="http://www.w3.org/1999/xhtml">
<body >
<div id="top_main">
    <div id="logoindex">
        <!--这是注释-->
        白泽居-www.baizeju.com
<a href="http://www.baizeju.com">白泽居-www.baizeju.com</a>
    </div>
    白泽居-www.baizeju.com
</div>
</body>
</html>`;
export default function abilityTest() {
    describe('ActsAbilityTest', () => {
        /**
         * @tc.number :JSOUP_convertToXML_0001
         * @tc.name   :content等于expectValue 返回成功
         * @tc.desc   :[XTS-TEST -JSOUP]
         * @tc.size   :MediumTest
         * @tc.type   :Function
         * @tc.level  :Level2
         */
        it('convertToXML', 0, () => {
            let property: any = [{
                    key: XMLWriter.DOCTYPE_PUBLIC, value: '-//W3C//DTD XHTML 1.1//EN'
                },
                {
                    key: XMLWriter.DOCTYPE_SYSTEM, value: 'http://www.w3.org/TR?xhtml11/DTD/xhtml11.dtd'
                }];
            const xml = new XMLWriter(html, property);
            xml.convertToXML((content, error) => {
                if (error) {
                    expect().assertFail();
                }
                let expectValue = "<?xml version=\"1.0\" standalone=\"yes\"?>\n\n<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.1//EN\" \"http://www.w3.org/TR?xhtml11/DTD/xhtml11.dtd\">\n\n<html lang=\"en\" xmlns=\"http://www.w3.org/1999/xhtml\">\n<head>\n    <meta charset=\"UTF-8\"></meta>\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"></meta>\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"></meta>\n    <title>Document</title>\n</head>\n<style>\n    .tagh1{\n        background-color: aquamarine;\n        color:'blue';\n    }\n    .one-div{\n        line-height: 30px;\n    }\n</style>\n<body>\n    <h1 class=\"tagh1\">\n        kkkk\n        <p>hhhhh</p>\n    </h1>\n    <div style=\"color:red; height:100px;\" class=\"one-div\">cshi</div>\n    <img src=\"https:baidu.com\" alt=\"wwww\"></img>\n    <p>wjdwekfe</p>\n    <em>dsjfw\n    <div>dksfmjk</div>\n    owqkdo</em>\n</body>\n</html>\n\n\n";
                expect(content).assertEqual(expectValue);
            });
        });
        /**
         * @tc.number :JSOUP_convertToXML_encoding_0002
         * @tc.name   :content等于expectValue 返回成功
         * @tc.desc   :[XTS-TEST -JSOUP]
         * @tc.size   :MediumTest
         * @tc.type   :Function
         * @tc.level  :Level2
         */
        it('convertToXML_encoding', 0, () => {
            let property: any = [{
                    key: XMLWriter.DOCTYPE_PUBLIC, value: '-//W3C//DTD XHTML 1.1//EN'
                },
                {
                    key: XMLWriter.DOCTYPE_SYSTEM, value: 'http://www.w3.org/TR?xhtml11/DTD/xhtml11.dtd'
                },
                {
                    key: XMLWriter.ENCODING, value: 'utf-8'
                }];
            const xml = new XMLWriter(html1, property);
            xml.convertToXML((content, error) => {
                if (error) {
                    expect().assertFail();
                }
                let expectValue = "<?xml version=\"1.0\" encoding=\"utf-8\" standalone=\"yes\"?>\n<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.1//EN\" \"http://www.w3.org/TR?xhtml11/DTD/xhtml11.dtd\">\n\n<html lang=\"en\" xmlns=\"http://www.w3.org/1999/xhtml\">\n<head>\n    <meta charset=\"UTF-8\"></meta>\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"></meta>\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"></meta>\n    <title>Document</title>\n</head>\n<style>\n    .tagh1{\n        background-color: aquamarine;\n        color:'blue';\n    }\n    .one-div{\n        line-height: 65px;\n    }\n</style>\n<body>\n<h1 class=\"tagh1\">\n    jjjj\n    <p>pppppp</p>\n</h1>\n<div style=\"color:red; height:100px;\" class=\"one-div\">cshi</div>\n<img src=\"https:baidu.com\" alt=\"wwww\"></img>\n<p>china</p>\n<em>apple\n    <div>hello</div>\n    world</em>\n</body>\n</html>\n\n";
                expect(content).assertEqual(expectValue);
            });
        });
        /**
         * @tc.number :JSOUP_convertToXML_version_0002
         * @tc.name   :content等于expectValue 返回成功
         * @tc.desc   :[XTS-TEST -JSOUP]
         * @tc.size   :MediumTest
         * @tc.type   :Function
         * @tc.level  :Level2
         */
        it('convertToXML_version', 0, () => {
            let property: any = [{
                    key: XMLWriter.DOCTYPE_PUBLIC, value: '-//W3C//DTD XHTML 1.1//EN'
                },
                {
                    key: XMLWriter.DOCTYPE_SYSTEM, value: 'http://www.w3.org/TR?xhtml11/DTD/xhtml11.dtd'
                },
                {
                    key: XMLWriter.VERSION, value: '2.0.0'
                }];
            const xml = new XMLWriter(html1, property);
            xml.convertToXML((content, error) => {
                if (error) {
                    expect().assertFail();
                }
                let expectValue = "<?xml version=\"2.0.0\" standalone=\"yes\"?>\n<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.1//EN\" \"http://www.w3.org/TR?xhtml11/DTD/xhtml11.dtd\">\n\n<html lang=\"en\" xmlns=\"http://www.w3.org/1999/xhtml\">\n<head>\n    <meta charset=\"UTF-8\"></meta>\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"></meta>\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"></meta>\n    <title>Document</title>\n</head>\n<style>\n    .tagh1{\n        background-color: aquamarine;\n        color:'blue';\n    }\n    .one-div{\n        line-height: 65px;\n    }\n</style>\n<body>\n<h1 class=\"tagh1\">\n    jjjj\n    <p>pppppp</p>\n</h1>\n<div style=\"color:red; height:100px;\" class=\"one-div\">cshi</div>\n<img src=\"https:baidu.com\" alt=\"wwww\"></img>\n<p>china</p>\n<em>apple\n    <div>hello</div>\n    world</em>\n</body>\n</html>\n\n";
                console.info("test--" + JSON.stringify(content));
                expect(content).assertEqual(expectValue);
            });
        });
        /**
         * @tc.number :JSOUP_convertToXML_contains_public_0002
         * @tc.name   :content等于expectValue 返回成功
         * @tc.desc   :[XTS-TEST -JSOUP]
         * @tc.size   :MediumTest
         * @tc.type   :Function
         * @tc.level  :Level2
         */
        it('convertToXML_contains_public', 0, () => {
            let property: any = [{
                    key: XMLWriter.DOCTYPE_PUBLIC, value: '-//W3C//DTD XHTML 1.2//EN'
                },
                {
                    key: XMLWriter.DOCTYPE_SYSTEM, value: 'http://www.w3.org/TR?xhtml11/DTD/xhtml12.dtd'
                },
            ];
            const xml = new XMLWriter(html2, property);
            xml.convertToXML((content, error) => {
                if (error) {
                    expect().assertFail();
                }
                let expectValue = "<?xml version=\"1.0\" standalone=\"yes\"?>\n<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\" PUBLIC \"-//W3C//DTD XHTML 1.2//EN\" \"http://www.w3.org/TR?xhtml11/DTD/xhtml12.dtd\">\n\n<head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=gb2312\"></meta><title>&#白;&#泽;&#居;-www.baizeju.com</title></head>\n\n<html xmlns=\"http://www.w3.org/1999/xhtml\">\n<body>\n<div id=\"top_main\">\n    <div id=\"logoindex\">\n        \n        &#白;&#泽;&#居;-www.baizeju.com\n<a href=\"http://www.baizeju.com\">&#白;&#泽;&#居;-www.baizeju.com</a>\n    </div>\n    &#白;&#泽;&#居;-www.baizeju.com\n</div>\n</body>\n</html>\n\n";
                console.info("test--" + JSON.stringify(content));
                expect(content).assertEqual(expectValue);
            });
        });
    });
}
