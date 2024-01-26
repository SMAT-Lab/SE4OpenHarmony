interface Sixth_Params {
    message?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "sixth_" + ++__generate__Id;
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
import { DateTimeFormatter, LocalDateTime, ZonedDateTime } from '@js-joda/core';
// import '@js-joda/timezone'
import { Locale } from '@ohos/localeenus';
class Sixth extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('', this, "message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Sixth_Params) {
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
        Button.createWithLabel('日期时间格式化', { type: ButtonType.Capsule, stateEffect: true });
        Button.backgroundColor(0x317aff);
        Button.width(240);
        Button.onClick(() => {
            this.message = testFormatter();
        });
        Button.pop();
        Text.create(this.message);
        Text.fontSize(20);
        Text.margin(10);
        Text.fontColor(Color.Blue);
        Text.pop();
        Column.pop();
        Scroll.pop();
        Row.pop();
    }
}
// 日期时间格式化
function testFormatter(): string {
    // 基础格式化
    const dateTime = LocalDateTime.parse("2018-04-28T12:34");
    // 日期格式化 4/28/2018
    console.info(dateTime.format(DateTimeFormatter.ofPattern('M/d/yyyy')));
    // 时间格式化 12:34
    console.info(dateTime.format(DateTimeFormatter.ofPattern('HH:mm')));
    // 按照英语格式进行日期时间格式化 2021-10-05T17:08:24+01:00[GMT]
    const dateTimeFormatter: any = DateTimeFormatter.ofPattern('EEE, dd MMM yyyy HH:mm:ss z').withLocale(Locale.ENGLISH);
    const zoneDateTime = ZonedDateTime.parse('Tue, 05 Oct 2021 17:08:24 GMT', dateTimeFormatter);
    console.log(zoneDateTime.toString());
    return "基础日期格式化： " + dateTime.format(DateTimeFormatter.ofPattern('M/d/yyyy')) + '\n' +
        "时间格式化： " + dateTime.format(DateTimeFormatter.ofPattern('HH:mm')) + '\n' +
        "给定日期时间格式化： " + zoneDateTime.toString();
}
loadDocument(new Sixth("1", undefined, {}));
