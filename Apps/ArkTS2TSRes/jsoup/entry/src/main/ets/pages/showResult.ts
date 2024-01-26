interface ShowResult_Params {
    content?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "showResult_" + ++__generate__Id;
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
import router from '@ohos.router';
class ShowResult extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__content = new ObservedPropertySimple('', this, "content");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ShowResult_Params) {
        if (params.content !== undefined) {
            this.content = params.content;
        }
    }
    aboutToBeDeleted() {
        this.__content.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __content: ObservedPropertySimple<string>;
    get content() {
        return this.__content.get();
    }
    set content(newValue: string) {
        this.__content.set(newValue);
    }
    aboutToAppear() {
        this.content = (router.getParams() as Record<string, Object>)['data'] as string;
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Scroll.create();
        Scroll.width('100%');
        Scroll.height('100%');
        Text.create(this.content);
        Text.width('100%');
        Text.fontSize(25);
        Text.align(Alignment.Start);
        Text.padding(15);
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Scroll.pop();
        Column.pop();
    }
}
loadDocument(new ShowResult("1", undefined, {}));
