interface CountryPage_Params {
    message?: string;
    err?: string;
    simKey?: string[];
    simValue?: string[];
    scroller?: Scroller;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CountryPage_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import { CountryUtils } from '@ohos/util_code';
class CountryPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('', this, "message");
        this.__err = new ObservedPropertySimple('', this, "err");
        this.simKey = [];
        this.simValue = [];
        this.scroller = new Scroller();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CountryPage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.err !== undefined) {
            this.err = params.err;
        }
        if (params.simKey !== undefined) {
            this.simKey = params.simKey;
        }
        if (params.simValue !== undefined) {
            this.simValue = params.simValue;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__err.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __err: ObservedPropertySimple<string>;
    get err() {
        return this.__err.get();
    }
    set err(newValue: string) {
        this.__err.set(newValue);
    }
    private simKey: string[];
    private simValue: string[];
    private scroller: Scroller;
    render() {
        Scroll.create(this.scroller);
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.scrollBar(BarState.Off);
        Scroll.scrollBarColor(Color.Gray);
        Scroll.scrollBarWidth(1);
        Column.create();
        Column.padding({ top: 18, bottom: 18 });
        Text.create('当前系统地区获取拨号字冠' + CountryUtils.getCountryCodeByLanguage());
        Text.fontSize(18);
        Text.margin({ left: 18, top: 18 });
        Text.pop();
        Divider.create();
        Divider.strokeWidth(2);
        Divider.color('#F1F3F5');
        Divider.margin({ top: 8, bottom: 8 });
        Text.create('sim卡获取拨号字冠模拟测试，模拟测试项目');
        Text.fontSize(18);
        Text.margin({ left: 18, top: 18 });
        Text.pop();
        ForEach.create("2", this, ObservedObject.GetRawObject(this.simKey), (item: string, index?: number) => {
            Row.create();
            Text.create(item + '拨号字冠为：' + CountryUtils.getCountryCode(item));
            Text.margin({ top: 5 });
            Text.fontSize(16);
            Text.pop();
            Row.pop();
        });
        ForEach.pop();
        Column.pop();
        Scroll.pop();
    }
    aboutToAppear() {
        CountryUtils.getCountryCodeFromMap().forEach((value, key) => {
            this.simKey.push(key);
            this.simValue.push(value);
        });
    }
}
loadDocument(new CountryPage("1", undefined, {}));
