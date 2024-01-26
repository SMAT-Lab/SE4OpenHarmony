interface Index_Params {
    message?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
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
import utf8 from "utf8";
import promptAction from '@ohos.promptAction';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Button.createWithLabel("编码(encode) '\xA9'");
        Button.onClick(() => {
            let src: string = utf8.encode('\xA9');
            let dst = '\xC2\xA9';
            console.log('dodo encode1=' + src);
            console.log('dodo encode2 =' + dst);
            this.showMessage('src=' + src + '  ===||===  dst=' + dst);
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel("编码(encode) '\uD800\uDC01'");
        Button.onClick(() => {
            let src: string = utf8.encode('\uD800\uDC01');
            let dst = '\xF0\x90\x80\x81';
            console.log('dodo encode1=' + src);
            console.log('dodo encode2 =' + dst);
            this.showMessage('src=' + src + '  ===||===  dst=' + dst);
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel("解码(decoded) '\xC2\xA9'");
        Button.onClick(() => {
            let src: string = utf8.decode('\xC2\xA9');
            let dst = '\xA9';
            console.log('dodo decoded1=' + src);
            console.log('dodo decoded2 =' + dst);
            this.showMessage('src=' + src + '  ===||===  dst=' + dst);
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel("解码(decoded) '\xF0\x90\x80\x81'");
        Button.onClick(() => {
            let src: string = utf8.decode('\xF0\x90\x80\x81');
            let dst = '\uD800\uDC01';
            console.log('dodo decoded1=' + src);
            console.log('dodo decoded2 =' + dst);
            this.showMessage('src=' + src + '  ===||===  dst=' + dst);
        });
        Button.margin(10);
        Button.pop();
        Column.pop();
        Row.pop();
    }
    showMessage(message: string) {
        promptAction.showToast({ message });
    }
}
loadDocument(new Index("1", undefined, {}));
