let __generate__Id: number = 0;
function generateId(): string {
    return "I18n.test_" + ++__generate__Id;
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
import { it as _it, afterAll, afterEach, beforeAll, beforeEach, describe, expect } from '@ohos/hypium';
import { MixedSchema } from './IntertfaceData';
let validator: any;
const BASE_COUNT = 1;
const mixedSchema: MixedSchema = {
    'type': 'object',
    'properties': {
        'name': { 'type': 'string' },
        'lines': {
            'type': 'array',
            'items': { 'type': 'string', 'format': 'alphanumeric' },
        },
    },
};
export default function i18nTest() {
    describe('i18nTest', () => {
        beforeAll(() => {
        });
        beforeEach(() => {
            validator = new Validator();
        });
        afterEach(() => {
        });
        afterAll(() => {
        });
        _it('number should provide an error name', 0, () => {
            let result: string = validator.validate('not-number', {
                'type': 'number'
            }).errors[0].name;
            expect(result).assertEqual('type');
        });
        _it('number should provide an error argument', 0, () => {
            expect(validator.validate('not-number', {
                'type': 'number'
            }).errors[0].argument).not().assertNull();
        });
        _it('required should provide an error name', 0, () => {
            let result: string = validator.validate(undefined, {
                'type': 'number', 'required': true
            }).errors[0].name;
            expect(result).assertEqual('required');
        });
        _it('null should provide an error name', 0, () => {
            let result: string = validator.validate('0', {
                'type': 'null'
            }).errors[0].name;
            expect(result).assertEqual('type');
        });
        _it('date should provide an error name', 0, () => {
            let result: string = validator.validate('0', {
                'type': 'date'
            }).errors[0].name;
            expect(result).assertEqual('type');
        });
        _it('should provide an error argument', 0, () => {
            expect(validator.validate('0', {
                'type': 'date'
            }).errors[0].argument).not().assertNull();
        });
        _it('integer should provide an error name', 0, () => {
            let result: string = validator.validate(0.25, {
                'type': 'integer'
            }).errors[0].name;
            expect(result).assertEqual('type');
        });
        _it('integer should provide an error argument', 0, () => {
            expect(validator.validate(0.25, {
                'type': 'integer'
            }).errors[0].argument).not().assertNull();
        });
        _it('boolean should provide an error name', 0, () => {
            let result: string = validator.validate('true', {
                'type': 'boolean'
            }).errors[0].name;
            expect(result).assertEqual('type');
        });
        _it('boolean should provide an error argument', 0, () => {
            expect(validator.validate('true', {
                'type': 'boolean'
            }).errors[0].argument).not().assertNull();
        });
        _it('any should provide an error name', 0, () => {
            let result: string = validator.validate(undefined, {
                'type': 'any', required: true
            }).errors[0].name;
            expect(result).assertEqual('required');
        });
        _it('minimum should provide an error name', 0, () => {
            let result: string = validator.validate(1, {
                'type': 'number', 'minimum': 2
            }).errors[0].name;
            expect(result).assertEqual('minimum');
        });
        _it('minimum should provide an error argument', 0, () => {
            expect(validator.validate(1, {
                'type': 'number', 'minimum': 2
            }).errors[0].argument).not().assertNull();
        });
        _it('exclusiveMinimum should provide an error name', 0, () => {
            let result: string = validator.validate(1, {
                'type': 'number', 'minimum': 1, 'exclusiveMinimum': true
            })
                .errors[0]
                .name;
            expect(result).assertEqual('minimum');
        });
        _it('exclusiveMinimum should provide an error argument', 0, () => {
            expect(validator.validate(1, {
                'type': 'number', 'minimum': 1, 'exclusiveMinimum': true
            }).errors[0].argument).not().assertNull();
        });
        _it('maximum should provide an error name', 0, () => {
            let result: string = validator.validate(3, {
                'type': 'number', 'maximum': 1
            }).errors[0].name;
            expect(result).assertEqual('maximum');
        });
        _it('maximum should provide an error argument', 0, () => {
            expect(validator.validate(3, {
                'type': 'number', 'maximum': 1
            }).errors[0].argument).not().assertNull();
        });
        _it('exclusiveMaximum should provide an error name', 0, () => {
            let result: string = validator.validate(2, {
                'type': 'number', 'maximum': 1, 'exclusiveMaximum': true
            }).errors[0].name;
            expect(result).assertEqual('maximum');
        });
        _it('exclusiveMaximum should provide an error argument', 0, () => {
            expect(validator.validate(2, {
                'type': 'number', 'maximum': 1, 'exclusiveMaximum': true
            }).errors[0].argument).not().assertNull();
        });
        _it('divisibleBy should provide an error name', 0, () => {
            let result: string = validator.validate(1, {
                'type': 'number', 'divisibleBy': 2
            }).errors[0].name;
            expect(result).assertEqual('divisibleBy');
        });
        _it('divisibleBy should provide an error argument', 0, () => {
            expect(validator.validate(1, {
                'type': 'number', 'divisibleBy': 2
            }).errors[0].argument).not().assertNull();
        });
        _it('pattern should provide an error name', 0, () => {
            let result: string = validator.validate('abac', {
                'type': 'string', 'pattern': 'ab+c'
            }).errors[0].name;
            expect(result).assertEqual('pattern');
        });
        _it('pattern should provide an error argument', 0, () => {
            expect(validator.validate('abac', {
                'type': 'string', 'pattern': 'ab+c'
            }).errors[0].argument).not().assertNull();
        });
        _it('minLength should provide an error name', 0, () => {
            let result: string = validator.validate('abcde', {
                'type': 'string', 'minLength': 6
            }).errors[0].name;
            expect(result).assertEqual('minLength');
        });
        _it('minLength should provide an error argument', 0, () => {
            expect(validator.validate('abcde', {
                'type': 'string', 'minLength': 6
            }).errors[0].argument).not().assertNull();
        });
        _it('maxLength should provide an error name', 0, () => {
            let result: string = validator.validate('abcde', {
                'type': 'string', 'maxLength': 4
            })
                .errors[0]
                .name;
            expect(result).assertEqual('maxLength');
        });
        _it('maxLength should provide an error argument', 0, () => {
            expect(validator.validate('abcde', {
                'type': 'string', 'maxLength': 4
            }).errors[0].argument).not().assertNull();
        });
        _it('enum should provide an error name', 0, () => {
            let result: string = validator.validate('abcde', {
                'type': 'string', 'enum': ['abcdf', 'abcdd']
            }).errors[0].name;
            expect(result).assertEqual('enum');
        });
        _it('enum should provide an error argument', 0, () => {
            expect(validator.validate('abcde', {
                'type': 'string', 'enum': ['abcdf', 'abcdd']
            }).errors[0].argument).not().assertNull();
        });
        _it('not should provide an error name', 0, () => {
            let result: string = validator.validate([1], {
                'type': 'any', 'not': 'array'
            }).errors[0].name;
            expect(result).assertEqual('not');
        });
        _it('not should provide an error argument', 0, () => {
            expect(validator.validate([1], {
                'type': 'any', 'not': 'array'
            }).errors[0].argument).not().assertNull();
        });
        _it('not should prohibit specified types', 0, () => {
            let result: boolean = validator.validate([1], {
                'type': 'any', 'not': 'array'
            }).valid;
            expect(result).assertFalse();
        });
        _it('disallow should provide an error name', 0, () => {
            let result: string = validator.validate([1], {
                'type': 'any', 'not': 'array'
            }).errors[0].name;
            expect(result).assertEqual('not');
            ;
        });
        _it('disallow should provide an error argument', 0, () => {
            expect(validator.validate([1], {
                'type': 'any', 'not': 'array'
            }).errors[0].argument).not().assertNull();
        });
        _it('disallow should prohibit specified types', 0, () => {
            let result: boolean = validator.validate([1], {
                'type': 'any', 'not': 'array'
            }).valid;
            expect(result).assertFalse();
        });
        _it('dependencies should provide an error name', 0, () => {
            let result: string = validator.validate({
                quux: 1, foo: 1
            }, {
                'dependencies': {
                    'quux': ['foo', 'bar']
                }
            }).errors[0].name;
            expect(result).assertEqual('dependencies');
            ;
        });
        _it('dependencies should provide an error argument', 0, () => {
            expect(validator.validate({
                quux: 1, foo: 1
            }, {
                'dependencies': {
                    'quux': ['foo', 'bar']
                }
            }).errors[0].argument).not().assertNull();
        });
        _it('DateTime should provide an error name', 0, () => {
            let result: string = validator.validate("2012-07-08", {
                'type': 'string', 'format': 'date-time'
            })
                .errors[0]
                .name;
            expect(result).assertEqual('format');
        });
        _it('DateTime should provide an error argument', 0, () => {
            expect(validator.validate("2012-07-08", {
                'type': 'string', 'format': 'date-time'
            }).errors[0].argument).assertEqual('date-time');
        });
        _it('date should provide an error name', 0, () => {
            let result: string = validator.validate("TEST2012-07-08", {
                'type': 'string', 'format': 'date'
            }).errors[0].name;
            expect(result).assertEqual('format');
        });
        _it('date should provide an error argument', 0, () => {
            expect(validator.validate("TEST2012-07-08", {
                'type': 'string', 'format': 'date'
            }).errors[0].argument).assertEqual('date');
        });
        _it('time should provide an error name', 0, () => {
            let result: string = validator.validate("16:41:41.532Z", {
                'type': 'string', 'format': 'time'
            }).errors[0].name;
            expect(result).assertEqual('format');
        });
        _it('time should provide an error argument', 0, () => {
            expect(validator.validate("16:41:41.532Z", {
                'type': 'string', 'format': 'time'
            }).errors[0].argument).assertEqual('time');
        });
        _it('UtcMillisec should provide an error name', 0, () => {
            let result: string = validator.validate("16:41:41.532Z", {
                'type': 'string', 'format': 'utc-millisec'
            }).errors[0].name;
            expect(result).assertEqual('format');
        });
        _it('UtcMillisec should provide an error argument', 0, () => {
            expect(validator.validate("16:41:41.532Z", {
                'type': 'string', 'format': 'utc-millisec'
            }).errors[0].argument).assertEqual('utc-millisec');
        });
        _it('regex should provide an error name', 0, () => {
            let result: string = validator.validate("/^(abc]/", {
                'type': 'string', 'format': 'regex'
            }).errors[0].name;
            expect(result).assertEqual('format');
        });
        _it('regex should provide an error argument', 0, () => {
            expect(validator.validate("/^(abc]/", {
                'type': 'string', 'format': 'regex'
            }).errors[0].argument).assertEqual('regex');
        });
        _it('color should provide an error name', 0, () => {
            let result: string = validator.validate("json", {
                'type': 'string', 'format': 'color'
            }).errors[0].name;
            expect(result).assertEqual('format');
        });
        _it('color should provide an error argument', 0, () => {
            expect(validator.validate("json", {
                'type': 'string', 'format': 'color'
            }).errors[0].argument).assertEqual('color');
        });
        _it('style should provide an error name', 0, () => {
            let result: string = validator.validate("0", {
                'type': 'string', 'format': 'style'
            }).errors[0].name;
            expect(result).assertEqual('format');
        });
        _it('style should provide an error argument', 0, () => {
            expect(validator.validate("0", {
                'type': 'string', 'format': 'style'
            }).errors[0].argument).assertEqual('style');
        });
        _it('phone should provide an error name', 0, () => {
            let result: string = validator.validate("31 42 123 4567", {
                'type': 'string', 'format': 'phone'
            }).errors[0].name;
            expect(result).assertEqual('format');
        });
        _it('phone should provide an error argument', 0, () => {
            expect(validator.validate("31 42 123 4567", {
                'type': 'string', 'format': 'phone'
            }).errors[0].argument).assertEqual('phone');
        });
        _it('uri should provide an error name', 0, () => {
            let result: string = validator.validate("tdegrunt", {
                'type': 'string', 'format': 'uri'
            }).errors[0].name;
            expect(result).assertEqual('format');
        });
        _it('uri should provide an error argument', 0, () => {
            expect(validator.validate("tdegrunt", {
                'type': 'string', 'format': 'uri'
            }).errors[0].argument).assertEqual('uri');
        });
        _it('email should provide an error name', 0, () => {
            let result: string = validator.validate("obama@", {
                'type': 'string', 'format': 'email'
            }).errors[0].name;
            expect(result).assertEqual('format');
        });
        _it('email should provide an error argument', 0, () => {
            expect(validator.validate("obama@", {
                'type': 'string', 'format': 'email'
            }).errors[0].argument).assertEqual('email');
        });
        _it('IpAddress should provide an error name', 0, () => {
            let result: string = validator.validate("192.168.0", {
                'type': 'string', 'format': 'ip-address'
            }).errors[0].name;
            expect(result).assertEqual('format');
        });
        _it('IpAddress should provide an error argument', 0, () => {
            expect(validator.validate("192.168.0", {
                'type': 'string', 'format': 'ip-address'
            }).errors[0].argument).assertEqual('ip-address');
        });
        _it('ipv6 should provide an error name', 0, () => {
            let result: string = validator.validate("127.0.0.1", {
                'type': 'string', 'format': 'ipv6'
            }).errors[0].name;
            expect(result).assertEqual('format');
        });
        _it('ipv6 should provide an error argument', 0, () => {
            expect(validator.validate("127.0.0.1", {
                'type': 'string', 'format': 'ipv6'
            }).errors[0].argument).assertEqual('ipv6');
        });
        _it('HostName should provide an error name', 0, () => {
            let result: string = validator.validate("www.-hi-.com", {
                'type': 'string', 'format': 'host-name'
            }).errors[0].name;
            expect(result).assertEqual('format');
        });
        _it('HostName should provide an error argument', 0, () => {
            expect(validator.validate("www.-hi-.com", {
                'type': 'string', 'format': 'host-name'
            }).errors[0].argument).assertEqual('host-name');
        });
        _it('alpha should provide an error name', 0, () => {
            let result: string = validator.validate("www.-hi-.com", {
                'type': 'string', 'format': 'alpha'
            }).errors[0].name;
            expect(result).assertEqual('format');
        });
        _it('alpha should provide an error argument', 0, () => {
            expect(validator.validate("www.-hi-.com", {
                'type': 'string', 'format': 'alpha'
            }).errors[0].argument).assertEqual('alpha');
        });
        _it('alphanumeric should provide an error name', 0, () => {
            let result: string = validator.validate("1test!", {
                'type': 'string', 'format': 'alphanumeric'
            }).errors[0].name;
            expect(result).assertEqual('format');
        });
        _it('alphanumeric should provide an error argument', 0, () => {
            expect(validator.validate("1test!", {
                'type': 'string', 'format': 'alphanumeric'
            }).errors[0].argument).assertEqual('alphanumeric');
        });
        _it('simple array should provide an error name', 0, () => {
            let result: string = validator.validate(0, {
                'type': 'array'
            }).errors[0].name;
            expect(result).assertEqual('type');
        });
        _it('simple array should provide an error argument', 0, () => {
            expect(validator.validate(0, {
                'type': 'array'
            }).errors[0].argument).not().assertNull();
        });
        _it('attribute on array items should provide an error name', 0, () => {
            let result: string = validator.validate(['1', '2', '3', 4], {
                'type': 'array', 'items': {
                    'type': 'string'
                }
            }).errors[0].name;
            expect(result).assertEqual('type');
            ;
        });
        _it('attribute on array items should provide an error argument', 0, () => {
            expect(validator.validate(['1', '2', '3', '4$'], {
                'type': 'array', 'items': {
                    'type': 'string', 'format': 'alphanumeric'
                }
            }).errors[0].argument).assertEqual('alphanumeric');
        });
        _it('minItems should provide an error name', 0, () => {
            let result: string = validator.validate([1], {
                'type': 'array', 'items': {
                    'type': 'number'
                }, 'minItems': 2
            }).errors[0].name;
            expect(result).assertEqual('minItems');
        });
        _it('minItems should provide an error argument', 0, () => {
            expect(validator.validate([1], {
                'type': 'array', 'items': {
                    'type': 'number'
                }, 'minItems': 2
            }).errors[0].argument).not().assertNull();
        });
        _it('maxItems should provide an error name', 0, () => {
            let result: string = validator.validate([1, 2, 3], {
                'type': 'array', 'items': {
                    'type': 'number'
                }, 'maxItems': 2
            }).errors[0].name;
            expect(result).assertEqual('maxItems');
        });
        _it('maxItems should provide an error argument', 0, () => {
            expect(validator.validate([1, 2, 3], {
                'type': 'array', 'items': {
                    'type': 'number'
                }, 'maxItems': 2
            }).errors[0].argument).not().assertNull();
        });
        _it('uniqueItems should provide an error name', 0, () => {
            let result: string = validator.validate([1, 2, 4, 1, 3, 5], {
                'type': 'array', 'uniqueItems': true
            }).errors[0].name;
            expect(result).assertEqual('uniqueItems');
        });
        _it('Mixed should provide an error name', 0, () => {
            let result: string = validator.validate({
                'name': 'test', 'lines': ['1$']
            }, mixedSchema).errors[0].name;
            expect(result).assertEqual('format');
        });
        _it('Mixed should provide an error argument', 0, () => {
            expect(validator.validate({
                'name': 'test', 'lines': ['1$']
            }, mixedSchema).errors[0].argument).assertEqual('alphanumeric');
        });
    });
}
