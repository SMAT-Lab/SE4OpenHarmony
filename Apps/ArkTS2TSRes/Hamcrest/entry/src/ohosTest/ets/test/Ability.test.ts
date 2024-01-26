let __generate__Id: number = 0;
function generateId(): string {
    return "Ability.test_" + ++__generate__Id;
}
/*
* Copyright (C) 2022 Huawei Device Co., Ltd.
* Licensed under the BSD License, (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     https://opensource.org/licenses/BSD-3-Clause
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import { HasProperty, StringContains, StringStartsWith, StringEndsWith, AllOf, AnyOf, IsNot, Is, IsEqual, IsNaN, IsEqualIgnoringCase, CharSequenceLength, IsBlankString, OrderingComparison, IsCloseTo, IsNull, IsArray, IsIn, MatchesPattern, Every, IsEmptyString, IsEqualCompressingWhiteSpace, IsIterableContaining, IsSame, ArrayMatching, IsAnything, IsInstanceOf, } from '@ohos/hamcrest';
import { Matcher } from '@ohos/hamcrest/src/main/ets/components/Matcher';
export default function abilityTest() {
    describe('ActsAbilityTest', () => {
        // Defines a test suite. Two parameters are supported: test suite name and test suite function.
        beforeAll(() => {
            // Presets an action, which is performed only once before all test cases of the test suite start.
            // This API supports only one parameter: preset action function.
        });
        beforeEach(() => {
            // Presets an action, which is performed before each unit test case starts.
            // The number of execution times is the same as the number of test cases defined by **it**.
            // This API supports only one parameter: preset action function.
        });
        afterEach(() => {
            // Presets a clear action, which is performed after each unit test case ends.
            // The number of execution times is the same as the number of test cases defined by **it**.
            // This API supports only one parameter: clear action function.
        });
        afterAll(() => {
            // Presets a clear action, which is performed after all test cases of the test suite end.
            // This API supports only one parameter: clear action function.
        });
        it('hasProperty', 0, () => {
            let matcher = HasProperty.hasProperty('name');
            expect(matcher.matches({
                name: 'Joe'
            })).assertTrue();
        });
        it('hasPropertyFalse', 0, () => {
            let matcher = HasProperty.hasProperty('name');
            expect(matcher.matches({
                age: 19
            })).assertFalse();
        });
        it('hasPropertyEmpty', 0, () => {
            let matcher = HasProperty.hasProperty('name');
            expect(matcher.matches({
                "": "dany"
            })).assertFalse();
        });
        it('hasLength', 0, () => {
            let matcher = CharSequenceLength.hasLength(4);
            expect(matcher.matches('aaaa')).assertTrue();
        });
        it('hasLengthFalse', 0, () => {
            let matcher = CharSequenceLength.hasLength(4);
            expect(matcher.matches('aaa')).assertFalse();
        });
        it('hasLengthEmpty', 0, () => {
            let matcher = CharSequenceLength.hasLength(4);
            expect(matcher.matches('')).assertFalse();
        });
        it('hasLengthNum', 0, () => {
            let matcher = CharSequenceLength.hasLength(4);
            expect(matcher.matches(1234)).assertFalse();
        });
        it('hasLengthBoolean', 0, () => {
            let matcher = CharSequenceLength.hasLength(4);
            expect(matcher.matches(true)).assertFalse();
        });
        it('hasLengthContainsBlank', 0, () => {
            let matcher = CharSequenceLength.hasLength(4);
            expect(matcher.matches('aa a')).assertTrue();
        });
        it('hasLengthContainsChinese', 0, () => {
            let matcher = CharSequenceLength.hasLength(4);
            expect(matcher.matches('aa你好 a')).assertFalse();
        });
        it('arrayMatchingHasItemInArrayMatcher', 0, () => {
            let array: string[] = ["apple", "banana", "orange"];
            let matcher: Matcher<string> = ArrayMatching.hasItemInArrayMatcher(StringContains.containsString("apple"));
            expect(matcher.matches(array)).assertTrue();
        });
        it('allofallof', 0, () => {
            let matcher: Matcher<string> = AllOf.allOf([IsEqual.equalTo("apple")]);
            expect(matcher.matches("apple")).assertTrue();
        });
        it('isanything', 0, () => {
            let matcher: Matcher<any> = IsAnything.anything();
            expect(matcher.matches("hello")).assertTrue();
        });
        it('IsInstanceOf', 0, () => {
            class Student {
                constructor() {
                }
            }
            ;
            let stu: Student = new Student();
            let matcher: Matcher<any> = IsInstanceOf.instanceOf(Student);
            expect(matcher.matches(stu)).assertTrue();
        });
        it('stripSpaces', 0, () => {
            let test = new IsEqualCompressingWhiteSpace("");
            let result: String = test.stripSpaces(" hello word ");
            expect("helloword").assertEqual(result);
        });
        it('AnyOfanyOf', 0, () => {
            let matcher = AnyOf.anyOf([IsBlankString.blankString(), IsEqualIgnoringCase.equalToIgnoringCase('AAA ')]);
            expect(matcher.matches('AAA')).assertFalse();
        });
        it('anyOfUpperEndBlank', 0, () => {
            let matcher = AnyOf.anyOfMatches(IsBlankString.blankString(), IsEqualIgnoringCase.equalToIgnoringCase('AAA '));
            expect(matcher.matches('AAA')).assertFalse();
        });
        it('anyOfUpperCase', 0, () => {
            let matcher = AnyOf.anyOfMatches(IsBlankString.blankString(), IsEqualIgnoringCase.equalToIgnoringCase('aaa'));
            expect(matcher.matches('AAA')).assertTrue();
        });
        it('anyOfLowerCase', 0, () => {
            let matcher = AnyOf.anyOfMatches(IsBlankString.blankString(), IsEqualIgnoringCase.equalToIgnoringCase('aaa'));
            expect(matcher.matches('bbb')).assertFalse();
        });
        it('anyOfContainsBlank', 0, () => {
            let matcher = AnyOf.anyOfMatches(IsBlankString.blankString(), IsEqualIgnoringCase.equalToIgnoringCase('aaa'));
            expect(matcher.matches('')).assertFalse();
        });
        it('containsStringTrue', 0, () => {
            let matcher = StringContains.containsString('rat');
            expect(matcher.matches('jim the rat')).assertTrue();
            expect(matcher.matches('jim the rats')).assertTrue();
        });
        it('containsStringFalse', 0, () => {
            let matcher2 = StringContains.containsString('rats');
            expect(matcher2.matches('jim the rat')).assertFalse();
        });
        it('containsStringPart', 0, () => {
            let matcher2 = StringContains.containsString('ra');
            expect(matcher2.matches('jim the rat')).assertTrue();
        });
        it('containsStringEmpty', 0, () => {
            let matcher2 = StringContains.containsString(' ');
            expect(matcher2.matches('ra ')).assertTrue();
        });
        it('containsStringIgnoringCase', 0, () => {
            let matcher = StringContains.containsString('rat');
            expect(matcher.matches('jim the rat')).assertTrue();
        });
        it('containsStringIgnoringCaseUpper', 0, () => {
            let matcher = StringContains.containsStringIgnoringCase('Jim');
            expect(matcher.matches('jim the rat')).assertTrue();
        });
        it('containsStringIgnoringCaseFalse', 0, () => {
            let matcher = StringContains.containsString('ct');
            expect(matcher.matches('jim the rat')).assertFalse();
        });
        it('allOfTrue', 0, () => {
            let matcher = AllOf.allOfMatches(StringContains.containsString('expected'), StringContains.containsString('value'));
            expect(matcher.matches('expected value')).assertTrue();
            expect(matcher.matches('value expected')).assertTrue();
        });
        it('allOfFalse', 0, () => {
            let matcher = AllOf.allOfMatches(StringContains.containsString('expected'), StringContains.containsString('value'));
            expect(matcher.matches('expected valu')).assertFalse();
        });
        it('allOfContainsBlank', 0, () => {
            let matcher = AllOf.allOfMatches(StringContains.containsString('expected'), StringContains.containsString(' value'));
            expect(matcher.matches('expected  value')).assertTrue();
        });
        it('endsWithTrue', 0, () => {
            let matcher = StringEndsWith.endsWith('test');
            expect(matcher.matches('aaabbbtest')).assertTrue();
        });
        it('endsWithContainsBlank', 0, () => {
            let matcher = StringEndsWith.endsWith('test');
            expect(matcher.matches('aaabbbtest ')).assertFalse();
        });
        it('endsWithContainsBlankTrue', 0, () => {
            let matcher = StringEndsWith.endsWith('test ');
            expect(matcher.matches('aaabbbtest ')).assertTrue();
        });
        it('endsWithFalse', 0, () => {
            let matcher = StringEndsWith.endsWith('test');
            expect(matcher.matches('aaabbbtests')).assertFalse();
            expect(matcher.matches('testdjsdojw')).assertFalse();
        });
        it('endsWithIgnoringCase', 0, () => {
            let matcher = StringEndsWith.endsWithIgnoringCase('Test');
            expect(matcher.matches('this test')).assertTrue();
        });
        it('endsWithIgnoringCaseFalse', 0, () => {
            let matcher = StringEndsWith.endsWithIgnoringCase('test');
            expect(matcher.matches('this test ')).assertFalse();
        });
        it('endsWithIgnoringCaseBlank', 0, () => {
            let matcher = StringEndsWith.endsWithIgnoringCase(' ');
            expect(matcher.matches('this test ')).assertTrue();
        });
        it('isNaNTrue', 0, () => {
            let matcher = IsNaN.notANumber();
            expect(matcher.matches(Number.NaN)).assertTrue();
        });
        it('isNaNNum', 0, () => {
            let matcher = IsNaN.notANumber();
            expect(matcher.matches(Number.MAX_VALUE)).assertFalse();
        });
        it('isNaNStr', 0, () => {
            let matcher = IsNaN.notANumber();
            expect(matcher.matches("NaN")).assertFalse();
        });
        it('isNaNFalse', 0, () => {
            let matcher = IsNaN.notANumber();
            expect(matcher.matches(7)).assertFalse();
            expect(matcher.matches(7.7)).assertFalse();
        });
        it('isEqualArray', 0, () => {
            const value = [1, 2];
            let matcher = IsEqual.equalTo(value);
            expect(matcher.matches([1, 2])).assertTrue();
        });
        it('isEqualArrayFalse', 0, () => {
            const value = [1, 2];
            let matcher = IsEqual.equalTo(value);
            expect(matcher.matches([1, 3])).assertFalse();
        });
        it('isEqualString', 0, () => {
            let matcher2 = IsEqual.equalTo("string value");
            expect(matcher2.matches("string value")).assertTrue();
        });
        it('isEqualStringFalse', 0, () => {
            let matcher2 = IsEqual.equalTo("string value");
            expect(matcher2.matches("string values")).assertFalse();
        });
        it('equalIgnoringCaseUpper', 0, () => {
            let matcher = IsEqualIgnoringCase.equalToIgnoringCase('Hello');
            expect(matcher.matches('HELLO')).assertTrue();
        });
        it('equalIgnoringCaseUpperFalse', 0, () => {
            let matcher = IsEqualIgnoringCase.equalToIgnoringCase('Hello');
            expect(matcher.matches('HELL O')).assertFalse();
        });
        it('equalIgnoringCaseLower', 0, () => {
            let matcher = IsEqualIgnoringCase.equalToIgnoringCase('Hello');
            expect(matcher.matches('heLLo')).assertTrue();
            expect(matcher.matches('hello')).assertTrue();
        });
        it('equalIgnoringCaseLowerFalse', 0, () => {
            let matcher = IsEqualIgnoringCase.equalToIgnoringCase('Hello');
            expect(matcher.matches('heL Lo')).assertFalse();
        });
        it('orderingComparisonGreaterThan', 0, () => {
            let matcher = OrderingComparison.greaterThan(5);
            expect(matcher.matches('6')).assertTrue();
        });
        it('orderingComparisonGreaterThanFalse', 0, () => {
            let matcher = OrderingComparison.greaterThan(5);
            expect(matcher.matches('5')).assertFalse();
        });
        it('orderingComparisonGreaterThanOrEqualToTrue', 0, () => {
            let matcher2 = OrderingComparison.greaterThanOrEqualTo(5);
            expect(matcher2.matches('6')).assertTrue();
        });
        it('orderingComparisonGreaterThanOrEqualToFalse', 0, () => {
            let matcher2 = OrderingComparison.greaterThanOrEqualTo(5);
            expect(matcher2.matches('4')).assertFalse();
        });
        it('orderingComparisonGreaterThanOrEqualToFloat', 0, () => {
            let matcher2 = OrderingComparison.greaterThanOrEqualTo(5);
            expect(matcher2.matches('5.0')).assertTrue();
        });
        it('orderingComparisonLessThan', 0, () => {
            let matcher3 = OrderingComparison.lessThan(5);
            expect(matcher3.matches('4')).assertTrue();
        });
        it('orderingComparisonLessThanFalse', 0, () => {
            let matcher3 = OrderingComparison.lessThan(5);
            expect(matcher3.matches('6')).assertFalse();
        });
        it('orderingComparisonLessThanFloat', 0, () => {
            let matcher3 = OrderingComparison.lessThan(5);
            expect(matcher3.matches('6.0')).assertFalse();
        });
        it('orderingComparisonLessThanSame', 0, () => {
            let matcher3 = OrderingComparison.lessThan(5);
            expect(matcher3.matches('5')).assertFalse();
        });
        it('orderingComparisonLessThanOrEqualTo', 0, () => {
            let matcher4 = OrderingComparison.lessThanOrEqualTo(5);
            expect(matcher4.matches('5')).assertTrue();
        });
        it('orderingComparisonLessThanOrEqualToFalse', 0, () => {
            let matcher4 = OrderingComparison.lessThanOrEqualTo(5);
            expect(matcher4.matches('6')).assertFalse();
        });
        it('orderingComparesEqualTo', 0, () => {
            let matcher4 = OrderingComparison.comparesEqualTo(5);
            expect(matcher4.matches(5.00)).assertTrue();
        });
        it('orderingComparesEqualToFalse', 0, () => {
            let matcher4 = OrderingComparison.comparesEqualTo(5);
            expect(matcher4.matches(5.1)).assertFalse();
        });
        it('orderingComparesEqualToZero', 0, () => {
            let matcher4 = OrderingComparison.comparesEqualTo(0);
            expect(matcher4.matches(0.0)).assertTrue();
        });
        it('isBlackString', 0, () => {
            let matcher = IsBlankString.blankString();
            expect(matcher.matches(' ')).assertTrue();
        });
        it('isBlackStringFalse', 0, () => {
            let matcher = IsBlankString.blankString();
            expect(matcher.matches('')).assertFalse();
        });
        it('isBlackStringEscape', 0, () => {
            let matcher = IsBlankString.blankString();
            expect(matcher.matches('\n\r\t')).assertTrue();
        });
        it('isBlankOrNullStringNull', 0, () => {
            let matcher2 = IsBlankString.blankOrNullString();
            expect(matcher2.matches(null)).assertTrue();
        });
        it('isBlankOrNullStringBlank', 0, () => {
            let matcher2 = IsBlankString.blankOrNullString();
            expect(matcher2.matches(" ")).assertTrue();
        });
        it('isBlankOrNullStringEmpty', 0, () => {
            let matcher2 = IsBlankString.blankOrNullString();
            expect(matcher2.matches("")).assertFalse();
        });
        it('isBlankOrNullStringFalse', 0, () => {
            let matcher2 = IsBlankString.blankOrNullString();
            expect(matcher2.matches('null')).assertFalse();
        });
        it('isBlankOrNullStringEscape', 0, () => {
            let matcher2 = IsBlankString.blankOrNullString();
            expect(matcher2.matches('\n\r\t')).assertTrue();
        });
        it('IsCloseToTrue', 0, () => {
            let matcher = IsCloseTo.closeTo(1.1, 0.0);
            expect(matcher.matches(1.10)).assertTrue();
        });
        it('IsCloseToZero', 0, () => {
            let matcher = IsCloseTo.closeTo(1.1, 0.0);
            expect(matcher.matches(0.0)).assertFalse();
        });
        it('IsCloseToFalse', 0, () => {
            let matcher2 = IsCloseTo.closeTo(1.111111111, 0.0);
            expect(matcher2.matches(1.1111111112)).assertFalse();
        });
        it('isNullNotNullValue', 0, () => {
            let matcher = IsNull.notNullValue();
            expect(matcher.matches(null)).assertFalse();
        });
        it('isNullTrue', 0, () => {
            let matcher = IsNull.nullValue();
            expect(matcher.matches(null)).assertTrue();
        });
        it('isNullFalse', 0, () => {
            let matcher = IsNull.nullValue();
            expect(matcher.matches('null')).assertFalse();
            expect(matcher.matches('')).assertFalse();
        });
        it('isNullFalseUndefined', 0, () => {
            let matcher = IsNull.nullValue();
            expect(matcher.matches(undefined)).assertTrue();
        });
        it('combinationMatchNot', 0, () => {
            let matcher = IsNot.not(StringContains.containsString('expected'));
            expect(matcher.matches('another value')).assertTrue();
        });
        it('combinationMatchNotFalse', 0, () => {
            let matcher = IsNot.not(StringContains.containsString('expected'));
            expect(matcher.matches("expected value")).assertFalse();
        });
        it('combinationMatchNotFalsePart', 0, () => {
            let matcher = IsNot.not(StringContains.containsString('expec'));
            expect(matcher.matches("expected value")).assertFalse();
        });
        it('startsWithIgnoringCaseUpper', 0, () => {
            let match = Is.is(StringStartsWith.startsWithIgnoringCase('Hamjest')); //
            expect(match.matches('hamjest is awesome')).assertTrue();
        });
        it('startsWithIgnoringCaseFalse', 0, () => {
            let match = Is.is(StringStartsWith.startsWithIgnoringCase(' hamjest')); //
            expect(match.matches('hamjest is awesome')).assertFalse();
        });
        it('startsWithIgnoringCase', 0, () => {
            let match = Is.is(StringStartsWith.startsWithIgnoringCase('hamjest')); //
            expect(match.matches('hamjest is awesome')).assertTrue();
        });
        it('combinationMatchIs', 0, () => {
            let match = Is.is(StringStartsWith.startsWith('hamjest')); //
            expect(match.matches('hamjest is awesome')).assertTrue();
        });
        it('combinationMatchIsFalse', 0, () => {
            let match = Is.is(StringStartsWith.startsWith('hamjest')); //
            expect(match.matches('amjest is awesome')).assertFalse();
        });
        it('combinationMatchIsStartBlank', 0, () => {
            let match = Is.is(StringStartsWith.startsWith('hamjest')); //
            expect(match.matches(' hamjest is awesome')).assertFalse();
        });
        it('isArrayTrue', 0, () => {
            let matcher: Matcher<any> = IsArray.array(IsEqual.equalTo('a'), IsEqual.equalTo('b'), IsEqual.equalTo('c'));
            expect(matcher.matches(['a', 'b', 'c'])).assertTrue();
        });
        it('isArrayFalse', 0, () => {
            let matcher: Matcher<any> = IsArray.array(IsEqual.equalTo('a'), IsEqual.equalTo('b'), IsEqual.equalTo('c'));
            expect(matcher.matches(['a', 'd', 'b'])).assertFalse();
            expect(matcher.matches(['a', 'b'])).assertFalse();
        });
        it('isArrayPart', 0, () => {
            let matcher: Matcher<any> = IsArray.array(IsEqual.equalTo('a'), IsEqual.equalTo('b'), IsEqual.equalTo('c'));
            expect(matcher.matches(['a', 'b'])).assertFalse();
        });
        it('isArrayThan', 0, () => {
            let matcher: Matcher<any> = IsArray.array(IsEqual.equalTo('a'), IsEqual.equalTo('b'), IsEqual.equalTo('c'));
            expect(matcher.matches(['a', 'b', 'c', 'd'])).assertFalse();
        });
        it('isInTrue', 0, () => {
            let matcher: Matcher<any> = IsIn.isIn(["bar", "foo"]);
            expect(matcher.matches("bar")).assertTrue();
        });
        it('isInThan', 0, () => {
            let matcher: Matcher<any> = IsIn.isIn(["bar", "foo"]);
            expect(matcher.matches(["bar", "foo", "egg"])).assertFalse();
        });
        it('isInFalse', 0, () => {
            let matcher: Matcher<any> = IsIn.isIn(["bar", "foo"]);
            expect(matcher.matches(["bar", "foo"])).assertFalse();
        });
        it('everyTrue', 0, () => {
            let matcher: Matcher<Array<any>> = Every.everyItem(StringContains.containsString('a'));
            expect(matcher.matches(["AaA", "BaB", "CaC"])).assertTrue();
        });
        it('everyEmpty', 0, () => {
            let matcher: Matcher<Array<any>> = Every.everyItem(StringContains.containsString(' '));
            expect(matcher.matches(["AaA", "BaB", "CaC"])).assertFalse();
        });
        it('everyFalse', 0, () => {
            let matcher: Matcher<Array<any>> = Every.everyItem(StringContains.containsString('a'));
            expect(matcher.matches(["AAA", "BaB", "CbC"])).assertFalse();
        });
        it('matchesStringPattern', 0, () => {
            let matcher = MatchesPattern.matchesStringPattern("^Hello.*$");
            expect(matcher.matches('Hello, world!')).assertTrue();
        });
        it('matchesStringPatternFalse', 0, () => {
            let matcher = MatchesPattern.matchesStringPattern("^Hello.*$");
            expect(matcher.matches('ello, world')).assertFalse();
        });
        it('matchesPatternTrue', 0, () => {
            let matcher = MatchesPattern.matchesPattern(new RegExp('bb'));
            expect(matcher.matches('aabbcc')).assertTrue();
        });
        it('matchesPatternContainsBlank', 0, () => {
            let matcher = MatchesPattern.matchesPattern(new RegExp('b b'));
            expect(matcher.matches('aab bcc')).assertTrue();
        });
        it('matchesPatternFalse', 0, () => {
            let matcher = MatchesPattern.matchesPattern(new RegExp('bb'));
            expect(matcher.matches('aabcc')).assertFalse();
            expect(matcher.matches('abc')).assertFalse();
        });
        it('equalToIgnoringWhiteSpace', 0, () => {
            let match = IsEqualCompressingWhiteSpace.equalToIgnoringWhiteSpace('hamjest '); //
            expect(match.matches('hamjest')).assertTrue();
        });
        it('equalToIgnoringWhiteSpaceMid', 0, () => {
            let match = IsEqualCompressingWhiteSpace.equalToIgnoringWhiteSpace('hamjest');
            expect(match.matches('hamj est')).assertTrue();
        });
        it('equalToIgnoringWhiteSpaceFalse', 0, () => {
            let match = IsEqualCompressingWhiteSpace.equalToIgnoringWhiteSpace('Hamj est');
            expect(match.matches('hamjest')).assertFalse();
        });
        it('equalToIgnoringWhiteSpaceStart', 0, () => {
            let match = IsEqualCompressingWhiteSpace.equalToIgnoringWhiteSpace('hamjest');
            expect(match.matches(' hamjest')).assertTrue();
        });
        it('equalToCompressingWhiteSpace', 0, () => {
            let match = IsEqualCompressingWhiteSpace.equalToCompressingWhiteSpace(' hamjest');
            expect(match.matches('hamjest')).assertTrue();
        });
        it('equalToCompressingWhiteSpaceFalse', 0, () => {
            let match = IsEqualCompressingWhiteSpace.equalToCompressingWhiteSpace('Ham jest');
            expect(match.matches('hamjest')).assertFalse();
        });
        it('equalToCompressingWhiteSpaceMid', 0, () => {
            let match = IsEqualCompressingWhiteSpace.equalToCompressingWhiteSpace('hamj est');
            expect(match.matches('hamjest')).assertTrue();
        });
        it('equalToCompressingWhiteSpaceStart', 0, () => {
            let match = IsEqualCompressingWhiteSpace.equalToCompressingWhiteSpace('hamjest ');
            expect(match.matches('hamjest')).assertTrue();
        });
        it('isSameSameInstance', 0, () => {
            let arr: Array<String> = new Array(1);
            arr[0] = "hello";
            let match = IsSame.sameInstance(arr);
            expect(match.matches(arr)).assertTrue();
        });
        it('isSameSameInstanceFalse', 0, () => {
            let arr: Array<String> = new Array(1);
            arr[0] = "hello";
            let arr1: Array<String> = new Array(1);
            arr1[0] = "hello";
            let match = IsSame.sameInstance(arr);
            expect(match.matches(arr1)).assertFalse();
        });
        it('isSameTheInstance', 0, () => {
            let str: string = "hello";
            let match = IsSame.theInstance(str);
            expect(match.matches(str)).assertTrue();
        });
        it('isSameTheInstanceFalse', 0, () => {
            let arr: Array<String> = new Array(1);
            arr[0] = "hello";
            let arr1: Array<String> = new Array(1);
            arr1[0] = "hello";
            let match = IsSame.theInstance(arr);
            expect(match.matches(arr1)).assertFalse();
        });
        it('hasTargetItem', 0, () => {
            let arr: Array<String> = new Array(2);
            arr[0] = "张三";
            arr[1] = "李四";
            let match = IsIterableContaining.hasTargetItem('张三');
            expect(match.matches(arr)).assertTrue();
        });
        it('hasTargetItems', 0, () => {
            let arr: Array<String> = new Array(2);
            arr[0] = "张三";
            arr[1] = "李四";
            let match = IsIterableContaining.hasTargetItems('张三');
            expect(match.matches(arr)).assertTrue();
        });
        it('hasItems', 0, () => {
            let arr: Array<String> = new Array(2);
            arr[0] = "张三";
            arr[1] = "李四";
            let match = IsIterableContaining.hasItems(StringContains.containsString("张三"));
            expect(match.matches(arr)).assertTrue();
        });
        it('hasItem', 0, () => {
            let arr: Array<String> = new Array(2);
            arr[0] = "张三";
            arr[1] = "李四";
            let match = IsIterableContaining.hasItem(IsEqual.equalTo('张三'));
            expect(match.matches(arr)).assertTrue();
        });
        it('hasItemFalse', 0, () => {
            let map: Map<String, String> = new Map();
            map.set("name", "张三");
            let match = IsIterableContaining.hasItem(StringContains.containsString('王'));
            expect(match.matches(map)).assertFalse();
        });
        it('hasItemContainsBlank', 0, () => {
            let map: Map<String, String> = new Map();
            map.set("name", " ");
            map.set("age", "34");
            let match = IsIterableContaining.hasItem(StringContains.containsString('34'));
            expect(match.matches(map)).assertTrue();
        });
        it('isEmptyString', 0, () => {
            let match = IsEmptyString.emptyString();
            let str: string = "";
            expect(match.matches(str)).assertTrue();
        });
        it('isEmptyStringFalse', 0, () => {
            let match = IsEmptyString.emptyString();
            let str: string = "hello";
            expect(match.matches(str)).assertFalse();
        });
        it('isEmptyStringEmpty', 0, () => {
            let match = IsEmptyString.emptyOrNullString();
            expect(match.matches("")).assertTrue();
        });
        it('isEmptyStringEmptyFalse', 0, () => {
            let match = IsEmptyString.emptyOrNullString();
            expect(match.matches("z")).assertFalse();
        });
        it('isEmptyStringNull', 0, () => {
            let match = IsEmptyString.emptyOrNullString();
            expect(match.matches(null)).assertTrue();
        });
    });
}
