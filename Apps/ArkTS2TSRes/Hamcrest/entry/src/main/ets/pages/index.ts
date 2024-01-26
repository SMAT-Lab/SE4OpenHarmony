interface Index_Params {
    scroller?: Scroller;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "index_" + ++__generate__Id;
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
import { HasProperty, IsAnything, IsEmptyString, IsEqualCompressingWhiteSpace, IsInstanceOf, IsIterableContaining, IsSame } from '@ohos/hamcrest';
import { StringContains } from '@ohos/hamcrest';
import { StringStartsWith } from '@ohos/hamcrest';
import { StringEndsWith } from '@ohos/hamcrest';
import { AllOf } from '@ohos/hamcrest';
import { AnyOf } from '@ohos/hamcrest';
import { IsNot } from '@ohos/hamcrest';
import { Is } from '@ohos/hamcrest';
import { IsEqual } from '@ohos/hamcrest';
import { IsNaN } from '@ohos/hamcrest';
import { IsEqualIgnoringCase } from '@ohos/hamcrest';
import { CharSequenceLength } from '@ohos/hamcrest';
import { IsBlankString } from '@ohos/hamcrest';
import { OrderingComparison } from '@ohos/hamcrest';
import { IsCloseTo } from '@ohos/hamcrest';
import { IsNull } from '@ohos/hamcrest';
import { IsArray } from '@ohos/hamcrest';
import { IsIn } from '@ohos/hamcrest';
import { MatchesPattern } from '@ohos/hamcrest';
import { Every } from '@ohos/hamcrest';
import { ArrayMatching } from '@ohos/hamcrest';
import { Matcher } from '@ohos/hamcrest/src/main/ets/components/Matcher';
const TAG = 'HAMCREST ';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.scroller = new Scroller();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private scroller: Scroller;
    hasProperty() {
        let matcher = HasProperty.hasProperty('name');
        console.info(TAG + "hasProperty: " + matcher.matches({ name: 'Joe' }));
        console.info(TAG + "hasProperty: " + matcher.matches({ name: 'Joel' }));
        console.info(TAG + "hasProperty: " + matcher.matches({ age: 19 }));
    }
    hasLength() {
        let matcher = CharSequenceLength.hasLength(4);
        console.info(TAG + "hasLength: " + matcher.matches('aaaa'));
        console.info(TAG + "hasLength: " + matcher.matches('aaa'));
        console.info(TAG + "hasLength: " + matcher.matches('aa a'));
    }
    anyOf() {
        let matcherAnyOf = AnyOf.anyOfMatches(IsBlankString.blankString(), IsEqualIgnoringCase.equalToIgnoringCase('aaa'));
        console.log(TAG + 'anyOf: enter matcherAnyOf:' + matcherAnyOf.matches('AAA'));
        console.log(TAG + 'anyOf: enter matcherAnyOf:' + matcherAnyOf.matches('bbb'));
        console.log(TAG + 'anyOf: enter matcherAnyOf:' + matcherAnyOf.matches(''));
        console.log(TAG + 'anyOf: enter matcherAnyOf:' + matcherAnyOf.matches('\n\r\t'));
        let matcher1 = AnyOf.anyOf([IsBlankString.blankString(), IsEqualIgnoringCase.equalToIgnoringCase('AAA ')]);
        console.log(TAG + 'anyOf: enter anyOf:' + matcher1.matches('AAA'));
    }
    containsString() {
        let matcher = StringContains.containsString('rat');
        console.info(TAG + "containsString: " + matcher.matches('jim the rat'));
        console.info(TAG + "containsString: " + matcher.matches('jim the rats'));
        let matcher2 = StringContains.containsString('rats');
        console.info(TAG + "containsString: " + matcher2.matches('jim the rat'));
        let matcher3 = StringContains.containsStringIgnoringCase('Jim');
        console.info(TAG + "containsStringIgnoringCase: " + matcher3.matches('jim the rat'));
    }
    allOf() {
        let matcher = AllOf.allOfMatches(StringContains.containsString('expected'), StringContains.containsString('value'));
        console.info(TAG + "allOf: " + matcher.matches('expected value'));
        console.info(TAG + "allOf: " + matcher.matches('value expected'));
        console.info(TAG + "allOf: " + matcher.matches('expected valu'));
        let matcher2: Matcher<string> = AllOf.allOf([IsEqual.equalTo("apple")]);
        console.info(TAG + "allOf: " + matcher2.matches('apple'));
        console.info(TAG + "allOf: " + matcher2.matches('orange'));
    }
    endsWith() {
        let matcher = StringEndsWith.endsWith('test');
        console.info(TAG + "endsWith: " + matcher.matches('aaabbbtest'));
        console.info(TAG + "endsWith: " + matcher.matches('aaabbbtests'));
        console.info(TAG + "endsWith: " + matcher.matches('testdjsdojw'));
        let matcher2 = StringEndsWith.endsWithIgnoringCase('Test');
        console.info(TAG + "endsWithIgnoringCase: " + matcher2.matches('this test'));
    }
    isNaN() {
        let matcher = IsNaN.notANumber();
        console.info(TAG + "isNaN: " + matcher.matches(7));
        console.info(TAG + "isNaN: " + matcher.matches(7.7));
        console.info(TAG + "isNaN: " + matcher.matches(Number.NaN));
    }
    isEqual() {
        const value = [1, 2];
        let matcher = IsEqual.equalTo(value);
        console.info(TAG + "isEqual: " + matcher.matches([1, 3]));
        console.info(TAG + "isEqual: " + matcher.matches([1, 2]));
        let matcher2 = IsEqual.equalTo("string value");
        console.info(TAG + "isEqual: " + matcher2.matches("string value"));
        console.info(TAG + "isEqual: " + matcher2.matches("string values"));
    }
    equalIgnoringCase() {
        let matcher = IsEqualIgnoringCase.equalToIgnoringCase('Hello');
        console.log(TAG + 'equalIgnoringCase:' + matcher.matches('heLLo'));
        console.log(TAG + 'equalIgnoringCase:' + matcher.matches('hello'));
        console.log(TAG + 'equalIgnoringCase:' + matcher.matches('HELLO'));
    }
    orderingComparison() {
        let matcher = OrderingComparison.greaterThan(5);
        console.log(TAG + 'orderingComparison:' + matcher.matches('6'));
        console.log(TAG + 'orderingComparison:' + matcher.matches('4'));
        console.log(TAG + 'orderingComparison:' + matcher.matches('5'));
        let matcher2 = OrderingComparison.greaterThanOrEqualTo(5);
        console.log(TAG + 'orderingComparison:' + matcher2.matches('6'));
        console.log(TAG + 'orderingComparison:' + matcher2.matches('4'));
        console.log(TAG + 'orderingComparison:' + matcher2.matches('5'));
        let matcher3 = OrderingComparison.lessThan(5);
        console.log(TAG + 'orderingComparison:' + matcher3.matches('6'));
        console.log(TAG + 'orderingComparison:' + matcher3.matches('4'));
        console.log(TAG + 'orderingComparison:' + matcher3.matches('5'));
        let matcher4 = OrderingComparison.lessThanOrEqualTo(5);
        console.log(TAG + 'orderingComparison:' + matcher4.matches('6'));
        console.log(TAG + 'orderingComparison:' + matcher4.matches('4'));
        console.log(TAG + 'orderingComparison:' + matcher4.matches('5'));
        let matcher5 = OrderingComparison.comparesEqualTo(5);
        console.log(TAG + 'orderingComparison:' + matcher5.matches(5.00));
        console.log(TAG + 'orderingComparison:' + matcher5.matches(5.1));
        console.log(TAG + 'orderingComparison:' + matcher5.matches(0.0));
    }
    isBlackString() {
        let matcher = IsBlankString.blankString();
        console.log(TAG + 'isBlackString  :' + matcher.matches(''));
        console.log(TAG + 'isBlackString :' + matcher.matches('\n\r\t'));
        let matcher2 = IsBlankString.blankOrNullString();
        console.log(TAG + 'isBlackString: enter matcher2:' + matcher2.matches('\n\r\t'));
        console.log(TAG + 'isBlackString: enter matcher2:' + matcher2.matches('null'));
        console.log(TAG + 'isBlackString: enter matcher2:' + matcher2.matches(null));
    }
    isCloseTo() {
        let matcher = IsCloseTo.closeTo(1.1, 0.0);
        console.log(TAG + 'IsCloseTo  :' + matcher.matches(1.10));
        let matcher2 = IsCloseTo.closeTo(1.111111111, 0.0);
        console.log(TAG + 'IsCloseTo  :' + matcher2.matches(1.1111111112));
    }
    isNull() {
        let matcher = IsNull.nullValue();
        console.log(TAG + 'isNull  :' + matcher.matches(null));
        console.log(TAG + 'isNull  :' + matcher.matches('null'));
        console.log(TAG + 'isNull  :' + matcher.matches(''));
        let matcher1 = IsNull.notNullValue();
        console.log(TAG + 'notNull  :' + matcher1.matches(null));
        console.log(TAG + 'notNull  :' + matcher1.matches(""));
    }
    combinationMatch() {
        let matcher = IsNot.not(StringContains.containsString('expected'));
        console.info(TAG + "combinationMatch: " + matcher.matches("expected value"));
        console.info(TAG + "combinationMatch: " + matcher.matches('another value'));
        let match = Is.is(StringStartsWith.startsWith('hamjest'));
        console.info(TAG + "Is.is: " + match.matches('hamjest is awesome'));
    }
    StringStartsWith() {
        let matcher = StringStartsWith.startsWith('hamjest');
        console.info(TAG + "startsWith: " + matcher.matches('hamjest is awesome'));
        console.info(TAG + "startsWith: " + matcher.matches('is awesome'));
        let matcher1 = StringStartsWith.startsWithIgnoringCase(' hamjest');
        console.info(TAG + "startsWithIgnoringCase: " + matcher1.matches('hamjest is awesome'));
        console.info(TAG + "startsWithIgnoringCase: " + matcher1.matches(' hamjest is awesome'));
    }
    StringEndsWith() {
        let matcher = StringEndsWith.endsWith('test');
        console.info(TAG + "endsWith: " + matcher.matches('aaabbbtest'));
        console.info(TAG + "endsWith: " + matcher.matches('aaabbbtest '));
        let matcher1 = StringEndsWith.endsWithIgnoringCase(' Test');
        console.info(TAG + "endsWithIgnoringCase: " + matcher1.matches('this test'));
        console.info(TAG + "endsWithIgnoringCase: " + matcher1.matches('this test '));
    }
    isArray() {
        let matcher: Matcher<any> = IsArray.array(IsEqual.equalTo('a'), IsEqual.equalTo('b'), IsEqual.equalTo('c'));
        console.info(TAG + "isArray: " + matcher.matches(['a', 'b', 'c']));
        console.info(TAG + "isArray: " + matcher.matches(['a', 'd', 'b']));
        console.info(TAG + "isArray: " + matcher.matches(['a', 'b']));
    }
    isIn() {
        let matcher: Matcher<any> = IsIn.isIn(["bar", "foo"]);
        console.info(TAG + "isIn: " + matcher.matches("bar"));
        console.info(TAG + "isIn: " + matcher.matches(["bar", "foo"]));
    }
    every() {
        let matcher: Matcher<Array<any>> = Every.everyItem(StringContains.containsString('a'));
        console.info(TAG + "every: " + matcher.matches(["AaA", "BaB", "CaC"]));
        console.info(TAG + "every: " + matcher.matches(["AAA", "BaB", "CbC"]));
    }
    matchesPattern() {
        let matcher = MatchesPattern.matchesPattern(new RegExp('bb'));
        console.info(TAG + "matchesPattern: " + matcher.matches('aabbcc'));
        console.info(TAG + "matchesPattern: " + matcher.matches('aabcc'));
        console.info(TAG + "matchesPattern: " + matcher.matches('abc'));
        let matcher2 = MatchesPattern.matchesStringPattern("^Hello.*$");
        console.info(TAG + "matchesPattern: " + matcher2.matches('Hello, world!'));
        console.info(TAG + "matchesPattern: " + matcher2.matches('ello, world!'));
    }
    isEqualCompressingWhiteSpace() {
        let matcher = IsEqualCompressingWhiteSpace.equalToCompressingWhiteSpace('hamjest');
        console.info(TAG + "isEqualCompressingWhiteSpace: " + matcher.matches(' hamjest'));
        console.info(TAG + "isEqualCompressingWhiteSpace: " + matcher.matches(' ham jest'));
        console.info(TAG + "isEqualCompressingWhiteSpace: " + matcher.matches('Ham jest'));
        let test = new IsEqualCompressingWhiteSpace("");
        console.info(TAG + "stripSpaces: " + test.stripSpaces(" hello word "));
        let match = IsEqualCompressingWhiteSpace.equalToIgnoringWhiteSpace('hamjest '); //
        console.info(TAG + "equalToIgnoringWhiteSpace: " + match.matches('hamjest'));
        console.info(TAG + "equalToIgnoringWhiteSpace: " + match.matches(' hamjest'));
    }
    isSame() {
        let arr: Array<String> = new Array(1);
        arr[0] = "hello";
        let arr1: Array<String> = new Array(1);
        arr1[0] = "hello";
        let matcher = IsSame.sameInstance(arr);
        console.info(TAG + "isSame  sameInstance: " + matcher.matches(arr));
        console.info(TAG + "isSame: sameInstance" + matcher.matches(arr1));
        let str: string = "hello";
        let matcher1 = IsSame.theInstance(str);
        console.info(TAG + "isSame: theInstance:" + matcher1.matches(str));
        let matcher2 = IsSame.theInstance(arr);
        console.info(TAG + "isSame: theInstance:" + matcher2.matches(arr1));
    }
    isIterableContaining() {
        let map: Map<String, String> = new Map();
        map.set("name", "张三");
        let matcher = IsIterableContaining.hasItem(StringContains.containsString('张三'));
        console.info(TAG + "isIterableContaining hasItem : " + matcher.matches(map));
        let matcher1 = IsIterableContaining.hasItem(StringContains.containsString('王'));
        console.info(TAG + "isIterableContaining hasItem : " + matcher1.matches(map));
        let arr: Array<String> = new Array(2);
        arr[0] = "张三";
        arr[1] = "李四";
        let match2 = IsIterableContaining.hasTargetItem('张三');
        console.info(TAG + "isIterableContaining hasTargetItem : " + match2.matches(arr));
        let match3 = IsIterableContaining.hasTargetItems('李四');
        console.info(TAG + "isIterableContaining hasTargetItems : " + match3.matches(arr));
        let match4 = IsIterableContaining.hasTargetItems('王伟');
        console.info(TAG + "isIterableContaining hasTargetItems : " + match4.matches(arr));
        let match5 = IsIterableContaining.hasItems(StringContains.containsString("张三"));
        console.info(TAG + "isIterableContaining hasItems : " + match5.matches(arr));
    }
    isEmptyString() {
        let matcher: Matcher<String> = IsEmptyString.emptyString();
        let test: string = "";
        console.info(TAG + "isEmptyString  : " + matcher.matches(test));
        let test2: string = "hello";
        console.info(TAG + "isEmptyString  : " + matcher.matches(test2));
        let matcher2 = IsEmptyString.emptyOrNullString();
        console.info(TAG + "isEmptyString  : " + matcher2.matches(""));
        console.info(TAG + "isEmptyString  : " + matcher2.matches("z"));
        console.info(TAG + "isEmptyString  : " + matcher2.matches(null));
    }
    arrayMatching() {
        let array: string[] = ["apple", "banana", "orange"];
        let matcher: Matcher<string> = ArrayMatching.hasItemInArrayMatcher(StringContains.containsString("apple"));
        console.info(TAG + "arrayMatching  : " + matcher.matches(array));
        let matcher2: Matcher<string> = ArrayMatching.hasItemInArrayMatcher(StringContains.containsString("egg"));
        console.info(TAG + "arrayMatching  : " + matcher2.matches(array));
    }
    IsAnything() {
        let matcher: Matcher<any> = IsAnything.anything();
        console.info(TAG + "isAnything  : " + matcher.matches("hello"));
        console.info(TAG + "isAnything  : " + matcher.matches(2));
    }
    IsInstanceOf() {
        class Student {
            constructor() {
            }
        }
        ;
        let stu: Student = new Student();
        let matcher: Matcher<any> = IsInstanceOf.instanceOf(Student);
        console.info(TAG + "isInstanceOf  : " + matcher.matches(stu));
        console.info(TAG + "isInstanceOf  : " + matcher.matches(new String("")));
    }
    render() {
        Stack.create({ alignContent: Alignment.TopStart });
        Stack.width('100%');
        Stack.height('100%');
        Scroll.create(this.scroller);
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.scrollBar(BarState.On);
        Scroll.scrollBarColor(Color.Gray);
        Scroll.scrollBarWidth(1);
        Scroll.onScroll((xOffset: number, yOffset: number) => {
            console.info(xOffset + ' ' + yOffset);
        });
        Scroll.onScrollEdge((side: Edge) => {
            console.info('To the edge');
        });
        Scroll.onScrollEnd(() => {
            console.info('Scroll Stop');
        });
        Column.create();
        Column.width('100%');
        Button.createWithChild();
        Button.type(ButtonType.Capsule);
        Button.margin({
            top: 20
        });
        Button.height(50);
        Button.backgroundColor('#0D9FFB');
        Button.onClick(() => {
            this.hasProperty();
        });
        Text.create('hasProperty');
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.padding({ left: 16, right: 16 });
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.type(ButtonType.Capsule);
        Button.margin({
            top: 20
        });
        Button.height(50);
        Button.backgroundColor('#0D9FFB');
        Button.onClick(() => {
            this.hasLength();
        });
        Text.create('hasLength');
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.padding({ left: 16, right: 16 });
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.type(ButtonType.Capsule);
        Button.margin({
            top: 20
        });
        Button.height(50);
        Button.backgroundColor('#0D9FFB');
        Button.onClick(() => {
            this.anyOf();
        });
        Text.create('anyOf');
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.padding({ left: 16, right: 16 });
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.type(ButtonType.Capsule);
        Button.margin({
            top: 20
        });
        Button.height(50);
        Button.backgroundColor('#0D9FFB');
        Button.onClick(() => {
            this.containsString();
        });
        Text.create('containsString');
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.padding({ left: 16, right: 16 });
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.type(ButtonType.Capsule);
        Button.margin({
            top: 20
        });
        Button.height(50);
        Button.backgroundColor('#0D9FFB');
        Button.onClick(() => {
            this.allOf();
        });
        Text.create('allOf');
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.padding({ left: 16, right: 16 });
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.type(ButtonType.Capsule);
        Button.margin({
            top: 20
        });
        Button.height(50);
        Button.backgroundColor('#0D9FFB');
        Button.onClick(() => {
            this.endsWith();
        });
        Text.create('endsWith');
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.padding({ left: 16, right: 16 });
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.type(ButtonType.Capsule);
        Button.margin({
            top: 20
        });
        Button.height(50);
        Button.backgroundColor('#0D9FFB');
        Button.onClick(() => {
            this.isNaN();
        });
        Text.create('isNaN');
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.padding({ left: 16, right: 16 });
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.type(ButtonType.Capsule);
        Button.margin({
            top: 20
        });
        Button.height(50);
        Button.backgroundColor('#0D9FFB');
        Button.onClick(() => {
            this.isEqual();
        });
        Text.create('isEqual');
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.padding({ left: 16, right: 16 });
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.type(ButtonType.Capsule);
        Button.margin({
            top: 20
        });
        Button.height(50);
        Button.backgroundColor('#0D9FFB');
        Button.onClick(() => {
            this.equalIgnoringCase();
        });
        Text.create('IsEqualIgnoringCase');
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.padding({ left: 16, right: 16 });
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.type(ButtonType.Capsule);
        Button.margin({
            top: 20
        });
        Button.height(50);
        Button.backgroundColor('#0D9FFB');
        Button.onClick(() => {
            this.orderingComparison();
        });
        Text.create('orderingComparison');
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.padding({ left: 16, right: 16 });
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.type(ButtonType.Capsule);
        Button.margin({
            top: 20
        });
        Button.height(50);
        Button.backgroundColor('#0D9FFB');
        Button.onClick(() => {
            this.isBlackString();
        });
        Text.create('isBlackString');
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.padding({ left: 16, right: 16 });
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.type(ButtonType.Capsule);
        Button.margin({
            top: 20
        });
        Button.height(50);
        Button.backgroundColor('#0D9FFB');
        Button.onClick(() => {
            this.isCloseTo();
        });
        Text.create('isCloseTo');
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.padding({ left: 16, right: 16 });
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.type(ButtonType.Capsule);
        Button.margin({
            top: 20
        });
        Button.height(50);
        Button.backgroundColor('#0D9FFB');
        Button.onClick(() => {
            this.isNull();
        });
        Text.create('isNull');
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.padding({ left: 16, right: 16 });
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.type(ButtonType.Capsule);
        Button.margin({
            top: 20
        });
        Button.height(50);
        Button.backgroundColor('#0D9FFB');
        Button.onClick(() => {
            this.combinationMatch();
        });
        Text.create('combinationMatch');
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.padding({ left: 16, right: 16 });
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.type(ButtonType.Capsule);
        Button.margin({
            top: 20
        });
        Button.height(50);
        Button.backgroundColor('#0D9FFB');
        Button.onClick(() => {
            this.isArray();
        });
        Text.create('IsArray');
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.padding({ left: 16, right: 16 });
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.type(ButtonType.Capsule);
        Button.margin({
            top: 20
        });
        Button.height(50);
        Button.backgroundColor('#0D9FFB');
        Button.onClick(() => {
            this.isIn();
        });
        Text.create('IsIn');
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.padding({ left: 16, right: 16 });
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.type(ButtonType.Capsule);
        Button.margin({
            top: 20
        });
        Button.height(50);
        Button.backgroundColor('#0D9FFB');
        Button.onClick(() => {
            this.every();
        });
        Text.create('every');
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.padding({ left: 16, right: 16 });
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.type(ButtonType.Capsule);
        Button.margin({
            top: 20
        });
        Button.height(50);
        Button.backgroundColor('#0D9FFB');
        Button.onClick(() => {
            this.matchesPattern();
        });
        Text.create('matchesPattern');
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.padding({ left: 16, right: 16 });
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.type(ButtonType.Capsule);
        Button.margin({
            top: 20
        });
        Button.height(50);
        Button.backgroundColor('#0D9FFB');
        Button.onClick(() => {
            this.isEqualCompressingWhiteSpace();
        });
        Text.create('isEqualCompressingWhiteSpace');
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.padding({ left: 16, right: 16 });
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.type(ButtonType.Capsule);
        Button.margin({
            top: 20
        });
        Button.height(50);
        Button.backgroundColor('#0D9FFB');
        Button.onClick(() => {
            this.isSame();
        });
        Text.create('isSame');
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.padding({ left: 16, right: 16 });
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.type(ButtonType.Capsule);
        Button.margin({
            top: 20
        });
        Button.height(50);
        Button.backgroundColor('#0D9FFB');
        Button.onClick(() => {
            this.isIterableContaining();
        });
        Text.create('isIterableContaining');
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.padding({ left: 16, right: 16 });
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.type(ButtonType.Capsule);
        Button.margin({
            top: 20
        });
        Button.height(50);
        Button.backgroundColor('#0D9FFB');
        Button.onClick(() => {
            this.isEmptyString();
        });
        Text.create('isEmptyString');
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.padding({ left: 16, right: 16 });
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.type(ButtonType.Capsule);
        Button.margin({
            top: 20
        });
        Button.height(50);
        Button.backgroundColor('#0D9FFB');
        Button.onClick(() => {
            this.IsInstanceOf();
        });
        Text.create('IsInstanceOf');
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.padding({ left: 16, right: 16 });
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.type(ButtonType.Capsule);
        Button.margin({
            top: 20
        });
        Button.height(50);
        Button.backgroundColor('#0D9FFB');
        Button.onClick(() => {
            this.IsAnything();
        });
        Text.create('IsAnything');
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.padding({ left: 16, right: 16 });
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.type(ButtonType.Capsule);
        Button.margin({
            top: 20
        });
        Button.height(50);
        Button.backgroundColor('#0D9FFB');
        Button.onClick(() => {
            this.arrayMatching();
        });
        Text.create('arrayMatching');
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.padding({ left: 16, right: 16 });
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.type(ButtonType.Capsule);
        Button.margin({
            top: 20
        });
        Button.height(50);
        Button.backgroundColor('#0D9FFB');
        Button.onClick(() => {
            this.StringEndsWith();
        });
        Text.create('StringEndsWith');
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.padding({ left: 16, right: 16 });
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.type(ButtonType.Capsule);
        Button.margin({
            top: 20
        });
        Button.height(50);
        Button.backgroundColor('#0D9FFB');
        Button.onClick(() => {
            this.StringStartsWith();
        });
        Text.create('StringStartsWith');
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.padding({ left: 16, right: 16 });
        Text.pop();
        Button.pop();
        Column.pop();
        Scroll.pop();
        Stack.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
