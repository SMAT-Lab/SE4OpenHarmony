let __generate__Id: number = 0;
function generateId(): string {
    return "Formats.test_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { SchemaError, validate, ValidationError, Validator, ValidatorResult } from '@ohos/jsonschema';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@ohos/hypium';
import { Options, ObjectSchema, } from './IntertfaceData';
import { types, instanceType } from './DataFormat';
interface Data {
    format: () => void;
}
let validator: any;
let validator1: any;
let validator2: any;
let format: Data;
const BASE_COUNT = 1;
let stringSchema: Options = { 'const': 'value' };
let objectSchema: ObjectSchema = { 'const': { "some key": [null, "1", 2, true] } };
let datatime: Options = {
    'type': 'string', 'format': 'date-time'
};
let rege: RegExp = new RegExp("[^\d+(?:\.\d+)?$]");
export default function formatsTest() {
    describe('formatsTest', () => {
        beforeAll(() => {
        });
        beforeEach(() => {
            validator = new Validator();
            validator1 = new Validator();
            validator2 = new Validator();
            validator1.customFormats.foo = (input: string | number) => {
                if (input === 'foo') {
                    return true;
                }
                return false;
            };
            validator1.customFormats.float = (input: string) => {
                //console.log(input);
                return rege.test(input);
            };
        });
        afterEach(() => {
        });
        afterAll(() => {
        });
        it('ShouldValidateAValidDateTime', 0, () => {
            let result: boolean = validator.validate("2012-07-08T16:41:41.532Z", datatime).valid;
            expect(result).assertTrue();
        });
        it('ShouldValidateAValidDateTimeWithoutMilliseconds', 0, () => {
            let result: boolean = validator.validate("2012-07-08T16:41:41Z", datatime).valid;
            expect(result).assertTrue();
        });
        it('ShouldValidateADateTimeWithATimezoneOffsetInsteadOfZ', 0, () => {
            let result1: boolean = validator.validate("2012-07-08T16:41:41.532+00:00", datatime).valid;
            expect(result1).assertTrue();
            let result2: boolean = validator.validate("2012-07-08T16:41:41.532+05:30", datatime).valid;
            expect(result2).assertTrue();
            let result3: boolean = validator.validate("2012-07-08T16:41:41.532+04:00", datatime).valid;
            expect(result3).assertTrue();
        });
        it('ShouldValidateADateTimeWithAZInsteadOfAZ', 0, () => {
            let result: boolean = validator.validate("2012-07-08T16:41:41.532z", datatime).valid;
            expect(result).assertTrue();
        });
        it('ShouldValidateADateTimeWithASpaceInsteadOfAT', 0, () => {
            let result: boolean = validator.validate("2012-07-08 16:41:41.532Z", datatime).valid;
            expect(result).assertTrue();
        });
        it('ShouldValidateADateTimeWithATInsteadOfAT', 0, () => {
            let result: boolean = validator.validate("2012-07-08t16:41:41.532Z", datatime).valid;
            expect(result).assertTrue();
        });
        it('ShouldNotValidateADateTimeWithTheTimeMissing', 0, () => {
            let result: boolean = validator.validate("2012-07-08", datatime).valid;
            expect(result).assertFalse();
        });
        it('ShouldNotValidateAnInvalidDateTime', 0, () => {
            let result: boolean = validator.validate("TEST2012-07-08T16:41:41.532Z", datatime).valid;
            expect(result).assertFalse();
        });
        it('ShouldNotValidateADateTimeWithATimezoneOffsetANDAZ', 0, () => {
            let result1: boolean = validator.validate("2012-07-08T16:41:41.532+00:00Z", datatime).valid;
            expect(result1).assertFalse();
            let result2: boolean = validator.validate("2012-07-08T16:41:41.532+Z00:00", datatime).valid;
            expect(result2).assertFalse();
        });
        it('ShouldValidateAValidDate', 0, () => {
            let result: boolean = validator.validate("2012-07-08", {
                'type': 'string', 'format': 'date'
            }).valid;
            expect(result).assertTrue();
        });
        it('ShouldNotValidateAnInvalidDate', 0, () => {
            let result: boolean = validator.validate("TEST2012-07-08", {
                'type': 'string', 'format': 'date'
            }).valid;
            expect(result).assertFalse();
        });
        it('ShouldValidateAValidTime', 0, () => {
            let result: boolean = validator.validate("16:41:41", {
                'type': 'string', 'format': 'time'
            }).valid;
            expect(result).assertTrue();
        });
        it('ShouldNotValidateAnInvalidTime', 0, () => {
            let result: boolean = validator.validate("16:41:41.532Z", {
                'type': 'string', 'format': 'time'
            }).valid;
            expect(result).assertFalse();
        });
        it('ShouldValidateAValidUtcMillisec', 0, () => {
            let result: boolean = validator.validate("-1234567890", {
                'type': 'string', 'format': 'utc-millisec'
            }).valid;
            expect(result).assertTrue();
        });
        it('ShouldNotValidateAnInvalidUtcMillisec', 0, () => {
            let result: boolean = validator.validate("16:41:41.532Z", {
                'type': 'string', 'format': 'utc-millisec'
            }).valid;
            expect(result).assertFalse();
        });
        it('ShouldValidateAValidRegex', 0, () => {
            let result: boolean = validator.validate("/a/", {
                'type': 'string', 'format': 'regex'
            }).valid;
            expect(result).assertTrue();
        });
        it('ShouldNotValidateAnInvalidRegex', 0, () => {
            let result: boolean = validator.validate("/^(abc]/", {
                'type': 'string', 'format': 'regex'
            }).valid;
            expect(result).assertFalse();
        });
        it('ShouldValidateTheColorRed', 0, () => {
            let result: boolean = validator.validate("red", {
                'type': 'string', 'format': 'color'
            }).valid;
            expect(result).assertTrue();
        });
        it('ShouldValidateTheColorF00', 0, () => {
            let result: boolean = validator.validate("#f00", {
                'type': 'string', 'format': 'color'
            }).valid;
            expect(result).assertTrue();
        });
        it('ShouldValidateTheColorFf0000', 0, () => {
            let result: boolean = validator.validate("#ff0000", {
                'type': 'string', 'format': 'color'
            }).valid;
            expect(result).assertTrue();
        });
        it('ShouldValidateTheColorRgb', 0, () => {
            let result: boolean = validator.validate("rgb(255,0,0)", {
                'type': 'string', 'format': 'color'
            }).valid;
            expect(result).assertTrue();
        });
        it('ShouldNotValidateAnInvalidColorJson', 0, () => {
            let result: boolean = validator.validate("json", {
                'type': 'string', 'format': 'color'
            }).valid;
            expect(result).assertFalse();
        });
        it('ShouldValidateAValidStyle', 0, () => {
            let result: boolean = validator.validate("color: red;", {
                'type': 'string', 'format': 'style'
            }).valid;
            expect(result).assertTrue();
        });
        it('ShouldValidateAValidComplexStyle1', 0, () => {
            let result: boolean = validator.validate("color: red; position: absolute; background-color: rgb(204, 204, 204); max-width: 150px;", {
                'type': 'string', 'format': 'style'
            }).valid;
            expect(result).assertTrue();
        });
        it('ShouldValidateAValidComplexStyle2', 0, () => {
            let result: boolean = validator.validate("color:red;position:absolute; background-color:     rgb(204, 204, 204); max-width: 150px;", {
                'type': 'string', 'format': 'style'
            }).valid;
            expect(result).assertTrue();
        });
        it('ShouldNotValidateAnInvalidStyle', 0, () => {
            let result: boolean = validator.validate("0", {
                'type': 'string', 'format': 'style'
            }).valid;
            expect(result).assertFalse();
        });
        it('ShouldValidateAValidStyleIfCalledTwiceWithTheSameInstance', 0, () => {
            let result1: boolean = validator.validate("color: red;", {
                'type': 'string', 'format': 'style'
            }).valid;
            expect(result1).assertTrue();
            let result2: boolean = validator.validate("color: red;", {
                'type': 'string', 'format': 'style'
            }).valid;
            expect(result2).assertTrue();
        });
        it('ShouldValidateAValidPhoneNumber', 0, () => {
            let result: boolean = validator.validate("+31 42 123 4567", {
                'type': 'string', 'format': 'phone'
            }).valid;
            expect(result).assertTrue();
        });
        it('ShouldNotValidateAnInvalidPhoneNumber', 0, () => {
            let result: boolean = validator.validate("31 42 123 4567", {
                'type': 'string', 'format': 'phone'
            }).valid;
            expect(result).assertFalse();
        });
        it('ShouldValidateGoogle', 0, () => {
            let result: boolean = validator.validate("http://www.google.com/", {
                'type': 'string', 'format': 'uri'
            }).valid;
            expect(result).assertTrue();
        });
        it('ShouldValidateGoogleSearch', 0, () => {
            let result: boolean = validator.validate("http://www.google.com/search", {
                'type': 'string', 'format': 'uri'
            }).valid;
            expect(result).assertTrue();
        });
        it('ShouldNotValidateRelativeURIs', 0, () => {
            let result: boolean = validator.validate("tdegrunt", {
                'type': 'string', 'format': 'uri'
            }).valid;
            expect(result).assertFalse();
        });
        it('ShouldNotValidateWithWhitespace', 0, () => {
            let result: boolean = validator.validate("The dog jumped", {
                'type': 'string', 'format': 'uri'
            }).valid;
            expect(result).assertFalse();
        });
        it('ShouldValidateObamaWhitehouseGov', 0, () => {
            let result: boolean = validator.validate("obama@whitehouse.gov", {
                'type': 'string', 'format': 'email'
            }).valid;
            expect(result).assertTrue();
        });
        it('ShouldValidateBarackObamaWhitehouseGov', 0, () => {
            let result: boolean = validator.validate("barack+obama@whitehouse.gov", {
                'type': 'string', 'format': 'email'
            }).valid;
            expect(result).assertTrue();
        });
        it('ShouldNotValidateObama', 0, () => {
            let result: boolean = validator.validate("obama@", {
                'type': 'string', 'format': 'email'
            }).valid;
            expect(result).assertFalse();
        });
        it('ShouldValidate19216801', 0, () => {
            let result: boolean = validator.validate("192.168.0.1", {
                'type': 'string', 'format': 'ip-address'
            }).valid;
            expect(result).assertTrue();
        });
        it('ShouldValidate127001', 0, () => {
            let result: boolean = validator.validate("127.0.0.1", {
                'type': 'string', 'format': 'ip-address'
            }).valid;
            expect(result).assertTrue();
        });
        it('ShouldNotValidate1921680', 0, () => {
            let result: boolean = validator.validate("192.168.0", {
                'type': 'string', 'format': 'ip-address'
            }).valid;
            expect(result).assertFalse();
        });
        it('ShouldNotValidate2561680', 0, () => {
            let result: boolean = validator.validate("256.168.0", {
                'type': 'string', 'format': 'ip-address'
            }).valid;
            expect(result).assertFalse();
        });
        it('ShouldValidateFe801lo0', 0, () => {
            let result: boolean = validator.validate("fe80::1%lo0", {
                'type': 'string', 'format': 'ipv6'
            }).valid;
            expect(result).assertTrue();
        });
        it('ShouldValidate1', 0, () => {
            let result: boolean = validator.validate("::1", {
                'type': 'string', 'format': 'ipv6'
            }).valid;
            expect(result).assertTrue();
        });
        it('ShouldNotValidate127001', 0, () => {
            let result: boolean = validator.validate("127.0.0.1", {
                'type': 'string', 'format': 'ipv6'
            }).valid;
            expect(result).assertFalse();
        });
        it('ShouldNotValidateLocalhost', 0, () => {
            let result: boolean = validator.validate("localhost", {
                'type': 'string', 'format': 'ipv6'
            }).valid;
            expect(result).assertFalse();
        });
        it('ShouldValidateLocalhost', 0, () => {
            let result: boolean = validator.validate("localhost", {
                'type': 'string', 'format': 'host-name'
            }).valid;
            expect(result).assertTrue();
        });
        it('ShouldValidateWwwGoogleCom', 0, () => {
            let result: boolean = validator.validate("www.google.com", {
                'type': 'string', 'format': 'host-name'
            }).valid;
            expect(result).assertTrue();
        });
        it('ShouldNotValidateWwwHiCom', 0, () => {
            let result: boolean = validator.validate("www.-hi-.com", {
                'type': 'string', 'format': 'host-name'
            }).valid;
            expect(result).assertFalse();
        });
        it('ShouldValidateAlpha', 0, () => {
            let result: boolean = validator.validate("alpha", {
                'type': 'string', 'format': 'alpha'
            }).valid;
            expect(result).assertTrue();
        });
        it('ShouldValidateAbracadabra', 0, () => {
            let result: boolean = validator.validate("abracadabra", {
                'type': 'string', 'format': 'alpha'
            }).valid;
            expect(result).assertTrue();
        });
        it('ShouldNotValidate1test1', 0, () => {
            let result: boolean = validator.validate("www.-hi-.com", {
                'type': 'string', 'format': 'alpha'
            }).valid;
            expect(result).assertFalse();
        });
        it('ShouldValidateAlphanumeric', 0, () => {
            let result: boolean = validator.validate("alpha", {
                'type': 'string', 'format': 'alphanumeric'
            }).valid;
            expect(result).assertTrue();
        });
        it('ShouldValidate123', 0, () => {
            let result: boolean = validator.validate("123", {
                'type': 'string', 'format': 'alphanumeric'
            }).valid;
            expect(result).assertTrue();
        });
        it('ShouldValidateAbracadabra123', 0, () => {
            let result: boolean = validator.validate("abracadabra123", {
                'type': 'string', 'format': 'alphanumeric'
            }).valid;
            expect(result).assertTrue();
        });
        it('ShouldNotValidate1test2', 0, () => {
            let result: boolean = validator.validate("1test!", {
                'type': 'string', 'format': 'alphanumeric'
            }).valid;
            expect(result).assertFalse();
        });
        it('ShouldValidateInput', 0, () => {
            let result: boolean = validator1.validate("foo", {
                'type': 'string', 'format': 'foo'
            }).valid;
            expect(result).assertTrue();
        });
        it('ShouldValidateNumericInput', 0, () => {
            let result: boolean = validator1.validate(32.45, {
                'type': 'number', 'format': 'float'
            }).valid;
            expect(result).assertTrue();
        });
        it('ShouldFailInputThatFailsValidation', 0, () => {
            let result: boolean = validator1.validate("boo", {
                'type': 'string', 'format': 'foo'
            }).valid;
            expect(result).assertFalse();
        });
        it('ShouldFailNumericInputThatFailsValidation', 0, () => {
            let result: boolean = validator1.validate(Number.NaN, {
                'type': 'number', 'format': 'float'
            }).valid;
            expect(result).assertFalse();
        });
        it('ShouldNotBeAssignedToTheValidatorPrototype', 0, () => {
            validator.customFormats.boo = format;
            validator1.customFormats.boo = format;
            validator2.customFormats.boo = format;
            expect(types).assertEqual('undefined');
        });
        it('ShouldBeAssignedToTheInstances', 0, () => {
            let format = () => {
            };
            instanceType.boo = format;
            let types = typeof ((new Validator()).customFormats.boo);
            expect(types).assertEqual('function');
            instanceType.boo;
        });
        it('ShouldValidateInvalidFormats', 0, () => {
            let result: boolean = validator.validate("2012-07-08", {
                'type': 'string', 'format': 'date-time'
            }, {
                disableFormat: true
            }).valid;
            expect(result).assertTrue();
        });
        it('ShouldValidate', 0, () => {
            let result: boolean = validator.validate("url", {
                'type': 'string', 'format': 'url'
            }).valid;
            expect(result).assertTrue();
        });
    });
}
