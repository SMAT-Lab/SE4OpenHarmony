let __generate__Id: number = 0;
function generateId(): string {
    return "Attributes.test_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you mayNot use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed onAn "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OFAnY KIND, either express or implied.
 * See the License for the specific language governing permissionsAnd
 * limitations under the License.
 */
import { SchemaError, validate, ValidationError, Validator, ValidatorResult } from '@ohos/jsonschema';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@ohos/hypium';
import { DeciData, NullType, OneOfSchema, Options, TheEnum, TypeData, UnderType, } from './IntertfaceData';
let validator: any;
const BASE_COUNT = 1;
let oneOfSchema: OneOfSchema = {
    oneOf: [
        { type: 'string' },
        { enum: [0, 1] },
        { type: 'object', required: ['type'] },
        { type: 'object', required: ['name'] },
    ],
};
let validnumber: Options = {
    'type': 'number'
};
let finedInstance: Options = {
    'type': 'number', 'required': true
};
let validnull: Options = {
    'type': 'null'
};
let anundefind: Options = {
    'type': 'date', 'required': true
};
let anundefineddata: Options = {
    'type': 'date'
};
let validinteger: Options = {
    'type': 'integer'
};
let integerdata: Options = {
    'type': 'integer', 'required': true
};
let datetrue: Options = {
    'type': 'boolean'
};
let daterequid: Options = {
    'type': 'boolean', 'required': true
};
let validany: Options = {
    'type': 'any'
};
let anydata: Options = {
    'type': 'any', 'required': true
};
let schemaIgnore: UnderType = {
    type: [undefined, "string"],
};
let schemaerrornull: NullType = {
    type: [null, "string"],
};
let success: TypeData = {
    type: true
};
let successdata: TypeData = {
    type: true, name: true
};
let nested: TypeData = {
    nestedErrors: true
};
let errorflag: TypeData = {
    throwError: true
};
let meetsminimum: Options = {
    'type': 'number', 'minimum': '1'
};
let clusivemeetsminimum: Options = {
    'type': 'number', 'minimum': '0', 'exclusiveMinimum': true
};
let clusivemeetsminimumdata: Options = {
    'type': 'number', 'minimum': '1', 'exclusiveMinimum': true
};
let meetsmaximum: Options = {
    'type': 'number', 'maximum': '2'
};
let clusivemeetsmaximum: Options = {
    'type': 'number', 'maximum': '2', 'exclusiveMaximum': true
};
let maximin: Options = {
    'type': 'number', 'minimum': '1', 'maximum': '2'
};
let iseven: Options = {
    'type': 'number', 'divisibleBy': 2
};
let withDdiv: Options = {
    'type': 'number', 'divisibleBy': 0.1
};
let validisda: Options = {
    'type': 'number', 'multipleOf': 2
};
let withisd: Options = {
    'type': 'number', 'multipleOf': 0.1
};
let deci: Options = {
    'type': 'string', 'pattern': 'ab+c'
};
let decidata: DeciData = {
    'type': 'string', 'pattern': new RegExp("[ab+c]")
};
let deciarsing: DeciData = {
    'type': 'string', 'pattern': new RegExp("^a+$")
};
let deprec: DeciData = {
    'type': 'string', 'pattern': new RegExp("0{1.3}")
};
let deprecdata: Options = {
    'type': 'string', 'pattern': "0{1.3}"
};
let fixenqu: Options = {
    'type': 'string', 'minLength': 5
};
let sixenqu: Options = {
    'type': 'string', 'minLength': 6
};
let fixmaenqu: Options = {
    'type': 'string', 'maxLength': 5
};
let fourenqu: Options = {
    'type': 'string', 'maxLength': 4
};
let onenum: Options = {
    'type': 'string', 'enum': ['abcdf', 'abcde']
};
let onenumdata: Options = {
    'type': 'string', 'enum': ['abcdf', 'abcdd']
};
let theenum: TheEnum = {
    'type': 'number', 'enum': [1, 2]
};
let validtaif: Options = {
    'enum': ['foo', 'bar', 'baz'], 'default': 'baz'
};
let validtaifdata: Options = {
    'enum': ['foo', 'bar', 'baz'], 'required': true, 'default': 'baz'
};
export default function attributesTest() {
    describe('attributesTest', () => {
        beforeAll(() => {
        });
        beforeEach(() => {
            validator = new Validator();
        });
        afterEach(() => {
        });
        afterAll(() => {
        });
        it('ShouldValidateAValidNumber', 0, () => {
            let result: boolean = validator.validate(0, validnumber).valid;
            expect(result).assertTrue();
        });
        it('ShouldNotValidateAnInvalidNumber', 0, () => {
            let result: boolean = validator.validate('0', validnumber).valid;
            expect(result).assertFalse();
        });
        it('ShouldNotValidateNaN', 0, () => {
            let result: boolean = validator.validate(Number.NaN, validnumber).valid;
            expect(result).assertFalse();
        });
        it('ShouldNotValidateInfinity1', 0, () => {
            let result: boolean = validator.validate(Number.POSITIVE_INFINITY, validnumber).valid;
            expect(result).assertFalse();
        });
        it('ShouldNotValidateInfinity2', 0, () => {
            let result: boolean = validator.validate(Number.POSITIVE_INFINITY, validnumber).valid;
            expect(result).assertFalse();
        });
        it('ShouldNotValidateAnUndefinedInstance1', 0, () => {
            let result: boolean = validator.validate(undefined, finedInstance).valid;
            expect(result).assertFalse();
        });
        it('ShouldValidateNull', 0, () => {
            let result: boolean = validator.validate(null, validnull).valid;
            expect(result).assertTrue();
        });
        it('ShouldNotValidateNoNull1', 0, () => {
            let result: boolean = validator.validate("0", validnull).valid;
            expect(result).assertFalse();
        });
        it('ShouldNotValidateAnUndefinedInstance2', 0, () => {
            let result: boolean = validator.validate(undefined, anundefind).valid;
            expect(result).assertFalse();
        });
        it('ShouldValidateDate', 0, () => {
            let result: boolean = validator.validate(new Date(), anundefineddata).valid;
            expect(result).assertTrue();
        });
        it('ShouldNotValidateNoNull2', 0, () => {
            let result: boolean = validator.validate('0', anundefineddata).valid;
            expect(result).assertFalse();
        });
        it('ShouldNotValidateAnUndefinedInstance3', 0, () => {
            let result: boolean = validator.validate(undefined, anundefind).valid;
            expect(result).assertFalse();
        });
        it('ShouldValidateInteger', 0, () => {
            let result: boolean = validator.validate(12, validinteger).valid;
            expect(result).assertTrue();
        });
        it('ShouldNotValidateNonInteger', 0, () => {
            let result: boolean = validator.validate(0.25, validinteger).valid;
            expect(result).assertFalse();
        });
        it('ShouldNotValidateAnUndefinedInstance4', 0, () => {
            let result: boolean = validator.validate(undefined, integerdata).valid;
            expect(result).assertFalse();
        });
        it('ShouldValidateTrue', 0, () => {
            let result: boolean = validator.validate(true, datetrue).valid;
            expect(result).assertTrue();
        });
        it('ShouldValidateFalse', 0, () => {
            let result: boolean = validator.validate(false, datetrue).valid;
            expect(result).assertTrue();
        });
        it('ShouldNotValidateNonBoolean', 0, () => {
            let result: boolean = validator.validate('true', datetrue).valid;
            expect(result).assertFalse();
        });
        it('ShouldNotValidateAnUndefinedInstance5', 0, () => {
            let result: boolean = validator.validate(undefined, daterequid).valid;
            expect(result).assertFalse();
        });
        it('ShouldValidateTrueAsAny', 0, () => {
            let result: boolean = validator.validate(true, validany).valid;
            expect(result).assertTrue();
        });
        it('ShouldValidatetruestrAsAny', 0, () => {
            let result: boolean = validator.validate('true', validany).valid;
            expect(result).assertTrue();
        });
        it('ShouldValidate0AsAny', 0, () => {
            let result: boolean = validator.validate(0, validany).valid;
            expect(result).assertTrue();
        });
        it('ShouldValidateDateAsAny', 0, () => {
            let result: boolean = validator.validate(new Date(), validany).valid;
            expect(result).assertTrue();
        });
        it('ShouldNotValidateAnUndefinedInstance6', 0, () => {
            let result: boolean = validator.validate(undefined, anydata).valid;
            expect(result).assertFalse();
        });
        it('ShouldIgnoreUndefined', 0, () => {
            let result1: boolean = validator.validate(12, schemaIgnore).valid;
            expect(result1).assertFalse();
            let result2: boolean = validator.validate("foo", schemaIgnore).valid;
            expect(result2).assertTrue();
        });
        it('ShouldErrorOnNull', 0, () => {
            try {
                validator.validate("foo", schemaerrornull);
            }
            catch (err) {
                let types = (err instanceof SchemaError);
                expect(types).assertTrue();
                expect(err.message).assertEqual('Unexpected null in "type" keyword');
            }
        });
        it('doesNotValidateZeroSuccesses', 0, () => {
            let result: boolean = validator.validate(true, oneOfSchema).valid;
            expect(result).assertFalse();
        });
        it('validatesOneSuccess', 0, () => {
            let result: boolean = validator.validate(success, oneOfSchema).valid;
            expect(result).assertTrue();
        });
        it('doesNotValidateTwoSuccesses', 0, () => {
            let result: boolean = validator.validate(successdata, oneOfSchema).valid;
            expect(result).assertFalse();
        });
        it('ReportsInnerErrorsWithNestedErrorsFlag', 0, () => {
            expect(validator.validate(successdata, oneOfSchema, nested).errors.length).assertEqual(3);
        });
        it('FunctionsWithThrowErrorFlag', 0, () => {
            try {
                validator.validate(successdata, oneOfSchema, errorflag);
            }
            catch (err) {
                expect(err.message).assertContain('exactly one');
            }
            let isThrow = false;
            try {
                validator.validate(success, oneOfSchema, errorflag);
            }
            catch (err) {
                isThrow = true;
            }
            expect(isThrow).assertFalse();
        });
        it('ShouldValidateIfNumberMeetsMinimum', 0, () => {
            let result: boolean = validator.validate(1, meetsminimum).valid;
            expect(result).assertTrue();
        });
        it('ShouldNotValidateIfNumberIsBelowMinimum', 0, () => {
            let result: boolean = validator.validate(0, meetsminimum).valid;
            expect(result).assertFalse();
        });
        it('ShouldValidateIfNumberIsAboveMinimumUsingExclusiveMinimum', 0, () => {
            let result: boolean = validator.validate(1, clusivemeetsminimum).valid;
            expect(result).assertTrue();
        });
        it('ShouldNotValidateIfNumberIsTheMinimumUsingExclusiveMinimum', 0, () => {
            let result: boolean = validator.validate(1, clusivemeetsminimumdata).valid;
            expect(result).assertFalse();
        });
        it('ShouldValidateIfNumberIsBelowTheMaximum', 0, () => {
            let result: boolean = validator.validate(1, meetsmaximum).valid;
            expect(result).assertTrue();
        });
        it('ShouldNotValidateIfNumberIsAboveMaximum', 0, () => {
            let result: boolean = validator.validate(3, meetsmaximum).valid;
            expect(result).assertFalse();
        });
        it('ShouldValidateIfNumberIsBelowMaximumUsingExclusiveMinimum', 0, () => {
            let result: boolean = validator.validate(1, clusivemeetsmaximum).valid;
            expect(result).assertTrue();
        });
        it('ShouldNotValidateIfNumberIsTheMaximumUsingExclusiveMinimum', 0, () => {
            let result: boolean = validator.validate(2, clusivemeetsmaximum).valid;
            expect(result).assertFalse();
        });
        it('ShouldValidateIfNumberIsBelowThMaximum', 0, () => {
            let result: boolean = validator.validate(1, maximin).valid;
            expect(result).assertTrue();
        });
        it('ShouldNotValidateIfNumberIsAboveMinumum', 0, () => {
            let result: boolean = validator.validate(3, maximin).valid;
            expect(result).assertFalse();
        });
        it('ShouldValidateIf0IsEven1', 0, () => {
            let result: boolean = validator.validate(2, iseven).valid;
            expect(result).assertTrue();
        });
        it('ShouldValidateIf2IsEven1', 0, () => {
            let result: boolean = validator.validate(-2, iseven).valid;
            expect(result).assertTrue();
        });
        it('ShouldNotValidate1IsEven1', 0, () => {
            let result: boolean = validator.validate(1, iseven).valid;
            expect(result).assertFalse();
        });
        it('ShouldValidateDivisibleByWithDecimals', 0, () => {
            let result: boolean = validator.validate(2.4, withDdiv).valid;
            expect(result).assertTrue();
        });
        it('ShouldValidateIf0IsEven2', 0, () => {
            let result: boolean = validator.validate(2, validisda).valid;
            expect(result).assertTrue();
        });
        it('ShouldValidateIf2IsEven2', 0, () => {
            let result: boolean = validator.validate(-2, validisda).valid;
            expect(result).assertTrue();
        });
        it('ShouldNotValidate1IsEven2', 0, () => {
            let result: boolean = validator.validate(1, validisda).valid;
            expect(result).assertFalse();
        });
        it('ShouldValidateMutlipleOfWithDecimals', 0, () => {
            let result: boolean = validator.validate(2.4, withisd).valid;
            expect(result).assertTrue();
        });
        it('ShouldValidateIfStringMatchesTheStringPattern', 0, () => {
            let result: boolean = validator.validate('abbbc', deci).valid;
            expect(result).assertTrue();
        });
        it('ShouldValidateIfStringMatchesTheRegexpPattern', 0, () => {
            let result: boolean = validator.validate('abbbc', decidata).valid;
            expect(result).assertTrue();
        });
        it('ShouldValidateIfStringDoesNotMatchTheStringPattern', 0, () => {
            let result: boolean = validator.validate('abac', deci).valid;
            expect(result).assertFalse();
        });
        it('ShouldReturnCorrectErrorMessageWhenParsingRegularExpression', 0, () => {
            let result: boolean = validator.validate('abac', deciarsing).errors[0].stack;
            expect(result).assertContain("/^a+$/");
        });
        it('SupportsInvalidNonUnicodePatternsDeprecated', 0, () => {
            let result1: boolean = validator.validate('0{012}', deprec).valid;
            let result2: boolean = validator.validate('0{123}', deprec).valid;
            let result3: boolean = validator.validate('0{012}', deprecdata).valid;
            let result4: boolean = validator.validate('0{123}', deprecdata).valid;
            expect(result1).assertFalse();
            expect(result2).assertTrue();
            expect(result3).assertFalse();
            expect(result4).assertTrue();
        });
        it('ShouldValidateIfStringHasALengthLargerThanMinLength', 0, () => {
            let result: boolean = validator.validate('abcde', fixenqu).valid;
            expect(result).assertTrue();
        });
        it('ShouldNotValidateIfStringDoesHasALengthLessThanMinLength', 0, () => {
            let result: boolean = validator.validate('abcde', sixenqu).valid;
            expect(result).assertFalse();
        });
        it('ShouldValidateIfStringHasALengthEqualToMaxLength', 0, () => {
            let result: boolean = validator.validate('abcde', fixmaenqu).valid;
            expect(result).assertTrue();
        });
        it('ShouldNotValidateIfStringDoesHasALengthLargerThanMaxLength', 0, () => {
            let result: boolean = validator.validate('abcde', fourenqu).valid;
            expect(result).assertFalse();
        });
        it('ShouldValidateIfStringIsOneOfTheEnumValues', 0, () => {
            let result: boolean = validator.validate('abcde', onenum).valid;
            expect(result).assertTrue();
        });
        it('ShouldNotValidateIfStringIsNotOneOfTheEnumValues', 0, () => {
            let result: boolean = validator.validate('abcde', onenumdata).valid;
            expect(result).assertFalse();
        });
        it('ShouldValidateIfNumberIsOneOfTheEnumValues', 0, () => {
            let result: boolean = validator.validate(1, theenum).valid;
            expect(result).assertTrue();
        });
        it('ShouldNotValidateIfNumberIsNotOneOfTheEnumValues', 0, () => {
            let result: boolean = validator.validate(3, theenum).valid;
            expect(result).assertFalse();
        });
        it('ShouldValidateIfValueIsUndefinedButDefaultsToOneOfTheEnumValues', 0, () => {
            let result: boolean = validator.validate(undefined, validtaif).valid;
            expect(result).assertTrue();
        });
        it('ShouldNotValidateIfValueIsUndefinedAndRequiredEvenIfADefaultIsGiven', 0, () => {
            let result: boolean = validator.validate(undefined, validtaifdata).valid;
            expect(result).assertFalse();
        });
        it('ShouldNotValidateIfARequiredFieldIsOmmited', 0, () => {
            let result: any = validator.validate({}, {
                'type': 'object', 'properties': {
                    'the_field': {
                        'enum': ['foo', 'bar', 'baz'], 'required': true
                    }
                }
            }).valid;
            expect(result).assertFalse();
        });
        it('ShouldNotValidateIfARequiredFieldIsUndefined', 0, () => {
            let result: any = validator.validate({
                'the_field': undefined
            }, {
                'type': 'object', 'properties': {
                    'the_field': {
                        'enum': ['foo', 'bar', 'baz'], 'required': true
                    }
                }
            }).valid;
            expect(result).assertFalse();
        });
        it('ShouldNotValidateIfAFieldInRequiredArrayIsUndefined', 0, () => {
            let result: boolean = validator.validate({
                'the_field': undefined
            }, {
                'type': 'object', 'properties': {
                    'the_field': {
                        'enum': ['foo', 'bar', 'baz']
                    }
                }, required: ['the_field']
            }).valid;
            expect(result).assertFalse();
        });
        it('ShouldValidateIfARequiredFieldHasAValueOutOfEnum', 0, () => {
            let result: boolean = validator.validate({
                'the_field': 'bar'
            }, {
                'type': 'object', 'properties': {
                    'the_field': {
                        'enum': ['foo', 'bar', 'baz'], 'required': true
                    }
                }
            }).valid;
            expect(result).assertTrue();
        });
        it('ShouldBeIgnored', 0, () => {
            let result: boolean = validator.validate(1, {
                'description': 'some text'
            }).valid;
            expect(result).assertTrue();
        });
        it('ShouldProhibitSpecifiedTypes', 0, () => {
            let result: boolean = validator.validate(1, {
                'type': 'any', 'disallow': 'array'
            }).valid;
            expect(result).assertTrue();
        });
        it('ShouldNotProhibitUnprohibitedTypes', 0, () => {
            let result: boolean = validator.validate(1, {
                'type': 'any', 'disallow': 'array'
            }).valid;
            expect(result).assertTrue();
        });
        it('ShouldValidateWithMissingNonDependedProperties', 0, () => {
            let result: boolean = validator.validate({
                foo: 1
            }, {
                'dependencies': {
                    'quux': ['foo', 'bar']
                }
            }).valid;
            expect(result).assertTrue();
        });
        it('ShouldNotValidateWithMissingDependencies', 0, () => {
            let result: boolean = validator.validate({
                quux: 1, foo: 1
            }, {
                'dependencies': {
                    'quux': ['foo', 'bar']
                }
            }).valid;
            expect(result).assertFalse();
        });
        it('ShouldValidateWithSatisfiedDependencies', 0, () => {
            let result: boolean = validator.validate({
                quux: 1, foo: 1, bar: 1
            }, {
                'dependencies': {
                    'quux': ['foo', 'bar']
                }
            }).valid;
            expect(result).assertTrue();
        });
    });
}
