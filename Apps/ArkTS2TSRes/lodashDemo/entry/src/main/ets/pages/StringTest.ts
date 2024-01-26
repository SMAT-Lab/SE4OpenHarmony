interface Index_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "StringTest_" + ++__generate__Id;
}
/**
 *  MIT License
 *
 *  Copyright (c) 2023 Huawei Device Co., Ltd.
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 */
import { camelCase, capitalize, escape, kebabCase, pad, parseInt, map } from "lodash";
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Button.createWithLabel('转换字符串为驼峰写法');
        Button.onClick(() => {
            let camelCaseString: string = camelCase('__FOO_BAR__');
            // => 'fooBar'
            console.log('转换字符串为驼峰写法为：' + JSON.stringify(camelCaseString));
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('转换字符串首字母为大写，剩下为小写');
        Button.onClick(() => {
            let capitalizeString: string = capitalize('FRED');
            // => 'Fred'
            console.log('转换字符串首字母为大写，剩下为小写为：' + JSON.stringify(capitalizeString));
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('将给定字符串的字符“&”，“ <”，“>”，“”和“‘”转换为它们相应的HTML实体');
        Button.onClick(() => {
            let escapeString: string = escape('fred, barney, & pebbles');
            // => 'fred, barney, &amp; pebbles'
            console.log('转换为:' + JSON.stringify(escapeString));
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('转换字符串为kebab case');
        Button.onClick(() => {
            let kebabCaseString: string = kebabCase('__FOO_BAR__');
            // => 'foo-bar'
            console.log('转换字符串为kebab case为:' + JSON.stringify(kebabCaseString));
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('从左侧和右侧填充字符');
        Button.onClick(() => {
            let paddingString: string = pad('abc', 8, '_-');
            // => '_-abc_-_'
            console.log('如果字符串长度小于length则从左侧和右侧填充字符为:' + JSON.stringify(paddingString));
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('转换字符串为指定基数的整数');
        Button.onClick(() => {
            let array: number[] = map(['6', '08', '10'], parseInt);
            // => [6, 8, 10]
            console.log('转换字符串为指定基数的整为:' + JSON.stringify(array));
        });
        Button.margin(10);
        Button.pop();
        Flex.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
