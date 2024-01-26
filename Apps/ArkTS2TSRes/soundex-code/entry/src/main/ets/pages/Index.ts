interface Index_Params {
    message?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
import { soundex } from 'soundex-code';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('点我看测试结果', this, "message");
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
        Text.create(this.message);
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            this.clickTest();
        });
        Text.pop();
        Column.pop();
        Row.pop();
    }
    clickTest() {
        let a1 = soundex('phonetics'); // => 'P532'
        let a2 = soundex('Ashcraft'); // => 'A261'
        let a3 = soundex('Lissajous'); // => 'L222'
        let a4 = soundex('Smith') === soundex('Schmit'); // => true
        let a5 = soundex('Ashcraftersson', 6); // => 'A26136'
        let a6 = soundex('A', 6); // => 'A000'
        console.log("soundex('phonetics') =" + a1);
        console.log("soundex('Ashcraft') =" + a2);
        console.log("soundex('Lissajous') =" + a3);
        console.log("soundex('Smith') === soundex('Schmit') =" + a4);
        console.log("soundex('Ashcraftersson') =" + a5);
        console.log("soundex('A', 6) =" + a6);
    }
}
loadDocument(new Index("1", undefined, {}));
