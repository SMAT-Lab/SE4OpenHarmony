interface Index_Params {
    tostring?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/**
 * Copyright (C) 2024 Huawei Device Co., Ltd.
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
 * */
import * as URLParse from "url-parse";
const url: any = new URLParse('https://www.example.com:8080/path?param1=value1&param2=value2#section');
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__tostring = new ObservedPropertySimple('', this, "tostring");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.tostring !== undefined) {
            this.tostring = params.tostring;
        }
    }
    aboutToBeDeleted() {
        this.__tostring.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __tostring: ObservedPropertySimple<string>;
    get tostring() {
        return this.__tostring.get();
    }
    set tostring(newValue: string) {
        this.__tostring.set(newValue);
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Text.create('Protocol:' + url.protocol
            + '\n\nHostname:' + url.hostname
            + '\n\nPort:' + url.port
            + '\n\nPathname:' + url.pathname
            + '\n\nQuery:' + JSON.stringify(url.query)
            + '\n\nHash:' + url.hash
            + '\n\nHost:' + url.host + '\n\n');
        Text.pop();
        Button.createWithLabel('set And toString');
        Button.onClick(() => {
            url.set('protocol', 'https');
            url.set('query', 'newParam=value');
            this.tostring = url.toString();
        });
        Button.fontSize(16);
        Button.fontWeight(FontWeight.Bold);
        Button.pop();
        Text.create('\n\nUpdated URL:' + this.tostring);
        Text.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
