interface Fifth_Params {
    message?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "fifth_" + ++__generate__Id;
}
/**
 * BSD License
 *
 * Copyright (c) 2023 Huawei Device Co., Ltd. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * * Neither the name Facebook nor the names of its contributors may be used to
 * endorse or promote products derived from this software without specific
 * prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS' AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
import { Duration, LocalDateTime, Period } from '@js-joda/core';
// import '@js-joda/timezone'
import router from '@ohos.router';
class Fifth extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('', this, "message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Fifth_Params) {
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
        Scroll.create();
        Scroll.width('100%');
        Column.create();
        Button.createWithLabel('时间量测试', { type: ButtonType.Capsule, stateEffect: true });
        Button.backgroundColor(0x317aff);
        Button.width(240);
        Button.onClick(() => {
            this.message = testDurationTime();
        });
        Button.pop();
        Text.create(this.message);
        Text.fontSize(20);
        Text.margin(10);
        Text.fontColor(Color.Blue);
        Text.pop();
        Button.createWithLabel('下一页', { type: ButtonType.Capsule, stateEffect: true });
        Button.backgroundColor(0x317aff);
        Button.width(240);
        Button.onClick(() => {
            router.push({ url: 'pages/sixth' });
        });
        Button.pop();
        Column.pop();
        Scroll.pop();
        Row.pop();
    }
}
// 时间量测试
function testDurationTime(): string {
    // 时间量 PT10H
    console.info(Duration.ofHours(10).toString());
    // 时间量 P10Y45D
    console.info(Period.ofYears(10).plusDays(45).toString());
    // 时间量计算 2012-12-24T22:30
    let mDateTime = LocalDateTime.parse("2012-12-24T12:00");
    console.info(mDateTime.plus(Duration.ofHours(10).plusMinutes(30)).toString());
    return "获取十小时时间量表示： " + Duration.ofHours(10).toString() + '\n' +
        "获取10年45天时间量表示： " + Period.ofYears(10).plusDays(45).toString() + '\n' +
        "给定时间加10小时30分： " + mDateTime.plus(Duration.ofHours(10).plusMinutes(30)).toString();
}
loadDocument(new Fifth("1", undefined, {}));
