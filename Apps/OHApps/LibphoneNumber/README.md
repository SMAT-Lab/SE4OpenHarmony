# libphonenumber-js

本项目是OpenHarmony系统下使用libphonenumber-js的示例，libphonenumber-js是一个电话号码格式化和解析的Javascript开源库


## 下载安装

```sh
ohpm install libphonenumber-js@1.9.53
```

OpenHarmony ohpm 环境配置等更多内容，请参考[如何安装 OpenHarmony ohpm 包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md)

## 使用说明
```javascript
    import { parsePhoneNumber, AsYouType, findPhoneNumbersInText, ParseError } from "libphonenumber-js";
    import customData from "./customData.json"; // 自定义元数据
    import Log from './../util/Log';
    import {
        parsePhoneNumberWithError,
        parsePhoneNumber as coreParsePhoneNumber,
        AsYouType as coreAsYouType
    } from 'libphonenumber-js/core'

    const number = '213-373-4253';
    const phoneNumber = parsePhoneNumber(number, 'US');
    const asYouType = new AsYouType('US');
    const findPhoneNumbers = 'For tech support call +7 (800) 555-35-35 internationally or reach a local US branch at (213) 373-4253 ext. 1234.';

    // 号码, 譬如 +12133734253
    Log.showInfo('number：' + phoneNumber.number.toString())

    // 国家，譬如 US
    Log.showInfo('country：' + phoneNumber.country);

    // 国内的号码样式，譬如 (213) 373-4253
    Log.showInfo('national：' + phoneNumber.formatNational());

    // 国际的号码样式，譬如 +1 213 373 4253
    Log.showInfo('international：' + phoneNumber.formatInternational());

    // uri形式的样式，譬如 tel:+12133734253
    Log.showInfo('uri：' + phoneNumber.getURI());

    // 类型，譬如 FIXED_LINE_OR_MOBILE
    Log.showInfo('type：' + phoneNumber.getType());

    // 是否可能是号码，从数字个数上进行判断
    Log.showInfo('isPossible：' + phoneNumber.isPossible());

    // 是否是有效号码，从所有匹配原则上判断
    Log.showInfo('isValid：' + phoneNumber.isValid());

    // 当你键入一个数字时，与之前键入的数字连接起来一起解析，直到调用clear清除状态
    asYouType.input(number);

    // 根据你键入的数字,解析国家，譬如 US
    Log.showInfo('country：' + asYouType.getCountry());

    // 根据你键入的数字,解析模板，譬如 (xxx) xxx-xxxx
    Log.showInfo('template：' + asYouType.getTemplate());

    const phoneNumberValue = asYouType.getNumber();
    if (phoneNumberValue != undefined) {
    // 根据你键入的数字,解析数字，譬如 +12133734253
    Log.showInfo('number：' + JSON.stringify(asYouType.getNumber()));

    // 根据你键入的数字,解析国内的号码样式，譬如 (213) 373-4253
    Log.showInfo('national：' + asYouType.getNumber().formatNational());

    // 根据你键入的数字,解析国际的号码样式，譬如 +1 213 373 4253
    Log.showInfo('international：' + asYouType.getNumber().formatInternational());

    // 根据你键入的数字,解析uri形式的样式，譬如 tel:+12133734253
    Log.showInfo('uri：' + asYouType.getNumber().getURI());

    // 根据你键入的数字,解析类型，譬如 FIXED_LINE_OR_MOBILE
    Log.showInfo('type：' + asYouType.getNumber().getType());
    } else {
    Log.showInfo(TAG + "getNumber() is undefined");
    }

    // 根据你键入的数字,解析是否可能是号码，从数字个数上进行判断
    Log.showInfo('isPossible：' + asYouType.isPossible());

    // 根据你键入的数字,解析是否是有效号码，从所有匹配原则上判断
    Log.showInfo('isValid：' + asYouType.isValid());

    //从一段文本中查找出电话号码
    Log.showInfo(JSON.stringify(findPhoneNumbersInText(findPhoneNumbers, 'US')));


    /**
     *
     * 使用自定义元数据,引入libphonenumber-js/core
     * 使用场景：
     * 1、在某个工程中，可能只需要处理几个特定的国家的号码
     * 2、所谓自定义元数据，就是只包含几个特定的国家的元数据，比如CN和US
     *
     */

    const number: string[] = ['+8618717452985', '+12133734253', '+78005553535'];
    // 这里只列举使用自定义元数据接口的几个示例,其它接口和使用普通元数据用法相同
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

```

## 约束与限制

- DevEco Studio 版本： 4.1 Canary(4.1.3.317)
- OpenHarmony SDK: API11 (4.1.0.36)

## 贡献代码

使用过程中发现任何问题都可以提 Issue 给我们，当然，我们也非常欢迎你给我们发 PR 。

## 开源协议

本项目基于 [Apache License 2.0](https://github.com/catamphetamine/libphonenumber-js/blob/master/LICENSE) ，请自由地享受和参与开源。
