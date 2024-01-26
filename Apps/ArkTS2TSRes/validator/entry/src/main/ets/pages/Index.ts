interface Index_Params {
    data?: Array<dataType>;
    array?: Array<SelectOption>;
    LicensePlateArray?: Array<SelectOption>;
    VATArray?: Array<SelectOption>;
    data1?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/**
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
import validator from 'validator';
import prompt from '@ohos.promptAction';
import { data } from './data';
import { dataType } from './data';
const TAG: string = "TAG validator";
interface itemType {
    mode: string;
    text: string;
    str: string;
    str1: string;
    min: number;
    max: number;
    IPVersion: number;
    values: string[];
    default?: string;
    local: SelectOption[];
}
interface minMaxType {
    min: number;
    max: number;
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__data = new ObservedPropertyObject(data, this, "data");
        this.array = [
            { value: 'crc32' }, { value: 'crc32b' }, { value: 'md4' }, { value: 'md5' }, { value: 'ripemd128' },
            { value: 'ripemd160' }, { value: 'sha1' }, { value: 'sha256' }, { value: 'sha384' }, { value: 'sha512' },
            { value: 'tiger128' }, { value: 'tiger160' }, { value: 'tiger192' }
        ];
        this.LicensePlateArray = [
            { value: 'es-AR' }, { value: 'de-DE' }, { value: 'de-LI' }, { value: 'en-IN' }, { value: 'cs-CZ' },
            { value: 'hu-HU' }, { value: 'pt-BR' }, { value: 'pt-PT' }, { value: 'sq-AL' }, { value: 'sv-SE' },
            { value: 'any' }
        ];
        this.VATArray = [
            { value: 'AT' }, { value: 'AL' }, { value: 'AR' }, { value: 'AU' }, { value: 'BE' },
            { value: 'BG' }, { value: 'BO' }, { value: 'BR' }, { value: 'BY' }, { value: 'CA' },
            { value: 'CH' }, { value: 'CL' }, { value: 'CO' }, { value: 'CR' }, { value: 'CY' },
            { value: 'CZ' }, { value: 'DE' }, { value: 'DK' }, { value: 'DO' }, { value: 'EC' },
            { value: 'EE' }, { value: 'EL' }, { value: 'ES' }, { value: 'FI' }, { value: 'FR' },
            { value: 'GB' }, { value: 'GT' }, { value: 'HN' }, { value: 'HR' }, { value: 'HU' },
            { value: 'ID' }, { value: 'IE' }, { value: 'IL' }, { value: 'IN' }, { value: 'IS' },
            { value: 'IT' }, { value: 'KZ' }, { value: 'LT' }, { value: 'LU' }, { value: 'LV' },
            { value: 'MK' }, { value: 'MT' }, { value: 'MX' }, { value: 'NG' }, { value: 'NI' },
        ];
        this.__data1 = new ObservedPropertySimple('', this, "data1");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.data !== undefined) {
            this.data = params.data;
        }
        if (params.array !== undefined) {
            this.array = params.array;
        }
        if (params.LicensePlateArray !== undefined) {
            this.LicensePlateArray = params.LicensePlateArray;
        }
        if (params.VATArray !== undefined) {
            this.VATArray = params.VATArray;
        }
        if (params.data1 !== undefined) {
            this.data1 = params.data1;
        }
    }
    aboutToBeDeleted() {
        this.__data.aboutToBeDeleted();
        this.__data1.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __data: ObservedPropertyObject<Array<dataType>>;
    get data() {
        return this.__data.get();
    }
    set data(newValue: Array<dataType>) {
        this.__data.set(newValue);
    }
    private array: Array<SelectOption>;
    private LicensePlateArray: Array<SelectOption>;
    private VATArray: Array<SelectOption>;
    private __data1: ObservedPropertySimple<string>;
    get data1() {
        return this.__data1.get();
    }
    set data1(newValue: string) {
        this.__data1.set(newValue);
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Start });
        List.create({ space: 20, initialIndex: 0 });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.data), (item: itemType) => {
            ListItem.create();
            Column.create({ space: 12 });
            Column.margin({ top: 10 });
            Text.create(item.text);
            Text.fontSize(16);
            Text.margin({ top: 5 });
            Text.pop();
            TextInput.create({ text: item.str, placeholder: '请输入字符串' });
            TextInput.height(60);
            TextInput.fontSize(18);
            TextInput.onChange((value: string) => {
                item.str = value;
            });
            If.create();
            if (item.str1) {
                If.branchId(0);
                TextInput.create({ text: item.str1, placeholder: '请输入字符串' });
                TextInput.height(60);
                TextInput.fontSize(18);
                TextInput.onChange((value: string) => {
                    item.str1 = value;
                });
            }
            If.pop();
            If.create();
            if (item.min) {
                If.branchId(0);
                TextInput.create({ text: item.min.toString(), placeholder: '请输入字符串' });
                TextInput.height(60);
                TextInput.fontSize(18);
                TextInput.onChange((value: string) => {
                    item.min = new Number(value).valueOf();
                });
            }
            If.pop();
            If.create();
            if (item.IPVersion) {
                If.branchId(0);
                TextInput.create({ text: item.IPVersion.toString(), placeholder: '请输入字符串' });
                TextInput.height(60);
                TextInput.fontSize(18);
                TextInput.onChange((value: string) => {
                    item.IPVersion = new Number(value).valueOf();
                });
            }
            If.pop();
            If.create();
            if (item.max) {
                If.branchId(0);
                TextInput.create({ text: item.max.toString(), placeholder: '请输入字符串' });
                TextInput.height(60);
                TextInput.fontSize(18);
                TextInput.onChange((value: string) => {
                    item.max = new Number(value).valueOf();
                });
            }
            If.pop();
            If.create();
            if (item.values) {
                If.branchId(0);
                TextInput.create({ text: item.values.toString(), placeholder: '请输入字符串' });
                TextInput.height(60);
                TextInput.fontSize(18);
                TextInput.onChange((value: string) => {
                    item.values = value.split(',');
                });
            }
            If.pop();
            If.create();
            if (item.local) {
                If.branchId(0);
                Select.create(item.local);
                Select.selected(0);
                Select.value(item.default!);
                Select.font({ size: 18, weight: 300 });
                Select.fontColor('#182431');
                Select.selectedOptionFont({ size: 18, weight: 200 });
                Select.optionFont({ size: 18, weight: 200 });
                Select.onSelect((index: number, value?: string) => {
                    item.default = value;
                });
                Select.pop();
            }
            If.pop();
            If.create();
            if (item.mode == "escape" || item.mode == "unescape" || item.mode == "whitelist" ||
                item.mode == "blacklist" || item.mode == "normalizeEmail" || item.mode == "toBoolean" ||
                item.mode == "toDate") {
                If.branchId(0);
                Text.create(this.data1);
                Text.fontSize(25);
                Text.fontColor(Color.Gray);
                Text.padding(20);
                Text.pop();
            }
            If.pop();
            Button.createWithLabel('验证', { type: ButtonType.Normal });
            Button.fontSize(18);
            Button.fontColor('#000');
            Button.height(60);
            Button.width(300);
            Button.margin({ top: 20 });
            Button.backgroundColor('#12939f');
            Button.onClick(() => {
                this.Validator(item);
            });
            Button.pop();
            Column.pop();
            ListItem.pop();
        });
        ForEach.pop();
        List.pop();
        Flex.pop();
    }
    Validator(item: itemType) {
        let result: Boolean | string = true;
        if (item.mode == "isBase32") {
            result = validator.isBase32(item.str);
        }
        if (item.mode == "isBase58") {
            result = validator.isBase58(item.str);
        }
        if (item.mode == "isBase64") {
            result = validator.isBase64(item.str);
        }
        if (item.mode == "isAscii") {
            result = validator.isAscii(item.str);
        }
        if (item.mode == "isBIC") {
            result = validator.isBIC(item.str);
        }
        if (item.mode == "isBoolean") {
            result = validator.isBoolean(item.str);
        }
        if (item.mode == "isBtcAddress") {
            result = validator.isBtcAddress(item.str);
        }
        if (item.mode == "isCreditCard") {
            result = validator.isCreditCard(item.str);
        }
        if (item.mode == "isCurrency") {
            result = validator.isCurrency(item.str);
        }
        if (item.mode == "isDataURI") {
            result = validator.isDataURI(item.str);
        }
        if (item.mode == "isDate") {
            result = validator.isDate(item.str);
        }
        if (item.mode == "isDecimal") {
            result = validator.isDecimal(item.str);
        }
        if (item.mode == "isEAN") {
            result = validator.isEAN(item.str);
        }
        if (item.mode == "isEmail") {
            result = validator.isEmail(item.str);
        }
        if (item.mode == "isEmpty") {
            result = validator.isEmpty(item.str);
        }
        if (item.mode == "isEthereumAddress") {
            result = validator.isEthereumAddress(item.str);
        }
        if (item.mode == "isFQDN") {
            result = validator.isFQDN(item.str);
        }
        if (item.mode == "isFullWidth") {
            result = validator.isFullWidth(item.str);
        }
        if (item.mode == "isHalfWidth") {
            result = validator.isHalfWidth(item.str);
        }
        if (item.mode == "isHexadecimal") {
            result = validator.isHexadecimal(item.str);
        }
        if (item.mode == "isHexColor") {
            result = validator.isHexColor(item.str);
        }
        if (item.mode == "isHSL") {
            result = validator.isHSL(item.str);
        }
        if (item.mode == "isIBAN") {
            result = validator.isIBAN(item.str);
        }
        if (item.mode == "isIdentityCard") {
            result = validator.isIdentityCard(item.str, item.default);
        }
        if (item.mode == "isIMEI") {
            result = validator.isIMEI(item.str);
        }
        if (item.mode == "isISBN") {
            result = validator.isISBN(item.str);
        }
        if (item.mode == "isISIN") {
            result = validator.isISIN(item.str);
        }
        if (item.mode == "isISO6391") {
            result = validator.isISO6391(item.str);
        }
        if (item.mode == "isISO8601") {
            result = validator.isISO8601(item.str);
        }
        if (item.mode == "isISO31661Alpha2") {
            result = validator.isISO31661Alpha2(item.str);
        }
        if (item.mode == "isISO31661Alpha3") {
            result = validator.isISO31661Alpha3(item.str);
        }
        if (item.mode == "isISO4217") {
            result = validator.isISO4217(item.str);
        }
        if (item.mode == "contains") {
            result = validator.contains(item.str, item.str1);
        }
        if (item.mode == "equals") {
            result = validator.equals(item.str, item.str1);
        }
        if (item.mode == "isAfter") {
            result = validator.isAfter(item.str1, item.str);
        }
        if (item.mode == "isBefore") {
            result = validator.isBefore(item.str1, item.str);
        }
        if (item.mode == "isAlpha") {
            result = validator.isAlpha(item.str);
        }
        if (item.mode == "isAlphanumeric") {
            result = validator.isAlphanumeric(item.str);
        }
        if (item.mode == "isByteLength") {
            result = validator.isByteLength(item.str, item.min, item.max);
        }
        if (item.mode == "isFloat") {
            let minMax: minMaxType = { min: item.min, max: item.max };
            result = validator.isFloat(item.str, minMax);
        }
        if (item.mode == "isInt") {
            if (validator.isInt(item.min.toString()) && validator.isInt(item.max.toString())) {
                let minMax: minMaxType = { min: item.min, max: item.max };
                result = validator.isInt(item.str, minMax);
            }
            else {
                result = "请输入整数";
            }
        }
        if (item.mode == "isDivisibleBy") {
            if (validator.isInt(item.str) && validator.isInt(item.min.toString())) {
                result = validator.isDivisibleBy(item.str, item.min);
            }
            else {
                result = "请输入整数";
            }
        }
        if (item.mode == "isIn") {
            if (item.values.toString() == '') {
                result = "不能输入空值";
            }
            else {
                result = validator.isIn(item.str, item.values);
            }
        }
        if (item.mode == "isIP") {
            result = validator.isIP(item.str, item.IPVersion);
        }
        if (item.mode == "isIPRange") {
            result = validator.isIPRange(item.str, item.IPVersion);
        }
        if (item.mode == "isHash") {
            result = validator.isHash(item.str, item.default);
        }
        if (item.mode == "isISRC") {
            result = validator.isISRC(item.str);
        }
        if (item.mode == "isISSN") {
            result = validator.isISSN(item.str);
        }
        if (item.mode == "isJSON") {
            result = validator.isJSON(item.str);
        }
        if (item.mode == "isJWT") {
            result = validator.isJWT(item.str);
        }
        if (item.mode == "isLatLong") {
            result = validator.isLatLong(item.str);
        }
        if (item.mode == "isLength") {
            result = validator.isLength(item.str, item.min, item.max);
        }
        if (item.mode == "isLowercase") {
            if (item.str == '') {
                result = "不能输入空值";
            }
            else if (!validator.isAlpha(item.str)) {
                result = '请仅输入英文字母';
            }
            else {
                result = validator.isLowercase(item.str);
            }
        }
        if (item.mode == "isLicensePlate") {
            result = validator.isLicensePlate(item.str, item.default);
        }
        if (item.mode == "isLocale") {
            result = validator.isLocale(item.str);
        }
        if (item.mode == "isLuhnNumber") {
            result = validator.isLuhnNumber(item.str);
        }
        if (item.mode == "isMACAddress") {
            result = validator.isMACAddress(item.str);
        }
        if (item.mode == "isMagnetURI") {
            result = validator.isMagnetURI(item.str);
        }
        if (item.mode == "isMD5") {
            result = validator.isMD5(item.str);
        }
        if (item.mode == "isMimeType") {
            result = validator.isMimeType(item.str);
        }
        if (item.mode == "isMobilePhone") {
            result = validator.isMobilePhone(item.str);
        }
        if (item.mode == "isMongoId") {
            result = validator.isMongoId(item.str);
        }
        if (item.mode == "isMultibyte") {
            result = validator.isMultibyte(item.str);
        }
        if (item.mode == "isNumeric") {
            result = validator.isNumeric(item.str);
        }
        if (item.mode == "isOctal") {
            result = validator.isOctal(item.str);
        }
        if (item.mode == "isPassportNumber") {
            result = validator.isPassportNumber(item.str, item.str1);
        }
        if (item.mode == "isPort") {
            result = validator.isPort(item.str);
        }
        if (item.mode == "isPostalCode") {
            result = validator.isPostalCode(item.str, item.default);
        }
        if (item.mode == "isRFC3339") {
            result = validator.isRFC3339(item.str);
        }
        if (item.mode == "isRgbColor") {
            result = validator.isRgbColor(item.str);
        }
        if (item.mode == "isSemVer") {
            result = validator.isSemVer(item.str);
        }
        if (item.mode == "isSurrogatePair") {
            result = validator.isSurrogatePair(item.str);
        }
        if (item.mode == "isUppercase") {
            if (item.str == '') {
                result = "不能为空值";
            }
            else if (!validator.isAlpha(item.str)) {
                result = "请仅输入英文字母";
            }
            else {
                result = validator.isUppercase(item.str);
            }
        }
        if (item.mode == "isSlug") {
            result = validator.isSlug(item.str);
        }
        if (item.mode == "isStrongPassword") {
            result = validator.isStrongPassword(item.str);
        }
        if (item.mode == "isTime") {
            result = validator.isTime(item.str);
        }
        if (item.mode == "isTaxID") {
            result = validator.isTaxID(item.str, item.default);
        }
        if (item.mode == "isURL") {
            result = validator.isURL(item.str);
        }
        if (item.mode == "isUUID") {
            result = validator.isUUID(item.str);
        }
        if (item.mode == "isVariableWidth") {
            result = validator.isVariableWidth(item.str);
        }
        if (item.mode == "isVAT") {
            result = validator.isVAT(item.str, item.default);
        }
        if (item.mode == "isWhitelisted") {
            result = validator.isWhitelisted(item.str, item.str1);
        }
        if (item.mode == "matches") {
            result = validator.matches(item.str, item.str1);
        }
        if (item.mode == "trim") {
            if (item.str == '') {
                result = "不能输入空值";
            }
            else {
                result = validator.trim(item.str, item.str1);
            }
        }
        if (item.mode == "ltrim") {
            if (item.str == '') {
                result = "不能输入空值";
            }
            else {
                result = validator.ltrim(item.str, item.str1);
            }
        }
        if (item.mode == "rtrim") {
            if (item.str == '') {
                result = "不能输入空值";
            }
            else {
                result = validator.rtrim(item.str, item.str1);
            }
        }
        if (item.mode == "escape") {
            this.data1 = validator.escape(item.str);
            result = true;
        }
        if (item.mode == "unescape") {
            this.data1 = validator.unescape(item.str);
            result = true;
        }
        if (item.mode == "stripLow") {
            if (item.str == '') {
                result = "不能输入空值";
            }
            else {
                result = validator.stripLow(item.str);
            }
        }
        if (item.mode == "toInt") {
            if (validator.isNumeric(item.str)) {
                result = validator.toInt(item.str);
            }
            else {
                result = '请输入int值';
            }
        }
        if (item.mode == "toFloat") {
            result = validator.toFloat(item.str);
        }
        if (item.mode == "whitelist") {
            this.data1 = validator.whitelist(item.str, item.str1);
            result = true;
        }
        if (item.mode == "blacklist") {
            this.data1 = validator.blacklist(item.str, item.str1);
            result = true;
        }
        if (item.mode == "normalizeEmail") {
            this.data1 = validator.normalizeEmail(item.str);
            result = true;
        }
        if (item.mode == "toBoolean") {
            this.data1 = validator.toBoolean(item.str).toString();
            result = true;
        }
        if (item.mode == "toDate") {
            let result1: Date | null = validator.toDate(item.str);
            if (result1 == null) {
                this.data1 = 'null';
            }
            else {
                this.data1 = result1.toString();
            }
            result = true;
        }
        prompt.showToast({ message: JSON.stringify(result), duration: 3000 });
    }
}
loadDocument(new Index("1", undefined, {}));
