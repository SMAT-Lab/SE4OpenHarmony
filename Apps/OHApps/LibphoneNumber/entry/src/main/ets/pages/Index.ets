/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
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

import { parsePhoneNumber, AsYouType, findPhoneNumbersInText, ParseError } from "libphonenumber-js";
import customData from "./customData.json"; // user-defined metadata
import Log from './../util/Log';
import {
    parsePhoneNumberWithError,
    parsePhoneNumber as coreParsePhoneNumber,
    AsYouType as coreAsYouType
} from 'libphonenumber-js/core'

const TAG: string = "PHONENUMBER  ";

@Entry
@Component
struct Index {
    build() {
        Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center }) {
            Text('libPhoneNumber/min demo')
                .fontSize(30)
                .fontWeight(FontWeight.Bold)
                .margin({ bottom: px2vp(100) })
                .onClick((event: ClickEvent) => {
                    this.onInit();
                })

            Text('libPhoneNumber/core demo')
                .fontSize(30)
                .fontWeight(FontWeight.Bold)
                .margin({ bottom: px2vp(20) })
                .onClick(() => {
                    this.useLibPhoneNumberJsCore();
                })

            Text("测试说明：[ 点击顶部文字，log搜索 PHONENUMBER，查看结果 ]")
                .fontSize(10)
                .fontWeight(FontWeight.Bold)
        }
        .width('100%')
        .height('100%')
        .backgroundColor('#f3f1f1')
    }

    onInit() {
        const number = '213-373-4253';
        const phoneNumber = parsePhoneNumber(number, 'US');
        const asYouType = new AsYouType('US');
        const findPhoneNumbers = 'For tech support call +7 (800) 555-35-35 internationally or reach a local US branch at (213) 373-4253 ext. 1234.';

        // 号码, 譬如 +12133734253
        Log.showInfo(TAG + 'number：' + phoneNumber.number.toString())

        // 国家，譬如 US
        Log.showInfo(TAG + 'country：' + phoneNumber.country);

        // 国内的号码样式，譬如 (213) 373-4253
        Log.showInfo(TAG + 'national：' + phoneNumber.formatNational());

        // 国际的号码样式，譬如 +1 213 373 4253
        Log.showInfo(TAG + 'international：' + phoneNumber.formatInternational());

        // uri形式的样式，譬如 tel:+12133734253
        Log.showInfo(TAG + 'uri：' + phoneNumber.getURI());

        // 类型，譬如 FIXED_LINE_OR_MOBILE
        Log.showInfo(TAG + 'type：' + phoneNumber.getType());

        // 是否可能是号码，从数字个数上进行判断
        Log.showInfo(TAG + 'isPossible：' + phoneNumber.isPossible());

        // 是否是有效号码，从所有匹配原则上判断
        Log.showInfo(TAG + 'isValid：' + phoneNumber.isValid());

        // 当你键入一个数字时，与之前键入的数字连接起来一起解析，直到调用clear清除状态
        asYouType.input(number);

        // 根据你键入的数字,解析国家，譬如 US
        Log.showInfo(TAG + 'country：' + asYouType.getCountry());

        // 根据你键入的数字,解析模板，譬如 (xxx) xxx-xxxx
        Log.showInfo(TAG + 'template：' + asYouType.getTemplate());

        const phoneNumberValue = asYouType.getNumber();
        if (phoneNumberValue != undefined) {
            // 根据你键入的数字,解析数字，譬如 +12133734253
            Log.showInfo(TAG + 'number：' + JSON.stringify(phoneNumberValue));

            // 根据你键入的数字,解析国内的号码样式，譬如 (213) 373-4253
            Log.showInfo(TAG + 'national：' + phoneNumberValue.formatNational());

            // 根据你键入的数字,解析国际的号码样式，譬如 +1 213 373 4253
            Log.showInfo(TAG + 'international：' + phoneNumberValue.formatInternational());

            // 根据你键入的数字,解析uri形式的样式，譬如 tel:+12133734253
            Log.showInfo(TAG + 'uri：' + phoneNumberValue.getURI());

            // 根据你键入的数字,解析类型，譬如 FIXED_LINE_OR_MOBILE
            Log.showInfo(TAG + 'type：' + phoneNumberValue.getType());
        } else {
            Log.showInfo(TAG + "getNumber() is undefined");
        }

        // 根据你键入的数字,解析是否可能是号码，从数字个数上进行判断
        Log.showInfo(TAG + 'isPossible：' + asYouType.isPossible());

        // 根据你键入的数字,解析是否是有效号码，从所有匹配原则上判断
        Log.showInfo(TAG + 'isValid：' + asYouType.isValid());

        //从一段文本中查找出电话号码
        Log.showInfo(TAG + JSON.stringify(findPhoneNumbersInText(findPhoneNumbers, 'US')));
    }

    /**
     *
     * 使用自定义元数据,引入libphonenumber-js/core
     * 使用场景：
     * 1、在某个工程中，可能只需要处理几个特定的国家的号码
     * 2、所谓自定义元数据，就是只包含几个特定的国家的元数据，比如CN和US
     * 3、这个元数据只能用来解析CN和US的号码，解析其他国家会异常
     *
     */
    useLibPhoneNumberJsCore() { // 这里只列举使用自定义元数据接口的几个示例,其它接口和使用普通元数据用法相同
        const number: string[] = ['+8618717452985', '+12133734253', '+78005553535'];

        const type = new coreAsYouType('CN', customData).input(number[0]);
        Log.showInfo(TAG + ' libphonenumber-js/core AsYouType : ' + type);
        Log.showInfo(TAG + ' libphonenumber-js/core parsePhoneNumber : ' + JSON.stringify(coreParsePhoneNumber(number[0], customData)));
        Log.showInfo(TAG + ' libphonenumber-js/core parsePhoneNumber : ' + JSON.stringify(coreParsePhoneNumber(number[1], customData)));
        try {
            parsePhoneNumberWithError(number[2], customData);
        } catch (error) {
            if (error instanceof ParseError) {
                Log.showInfo(TAG + " Phone number parsing exception ,customData does not contain this country，error msg :  " + error.message);
            }
        }
    }
}
