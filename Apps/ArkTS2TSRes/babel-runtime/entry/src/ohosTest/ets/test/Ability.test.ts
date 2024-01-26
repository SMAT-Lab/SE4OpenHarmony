let __generate__Id: number = 0;
function generateId(): string {
    return "Ability.test_" + ++__generate__Id;
}
/*
 * Copyright (C) 2024 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import _OverloadYield from '@babel/runtime/helpers/esm/OverloadYield';
import identity from "@babel/runtime/helpers/esm/identity";
import asyncIterator from "@babel/runtime/helpers/esm/asyncIterator";
import _checkInRHS from "@babel/runtime/helpers/esm/checkInRHS";
import _defineAccessor from "@babel/runtime/helpers/esm/defineAccessor";
import _iterableToArrayLimit from "@babel/runtime/helpers/esm/iterableToArrayLimit";
import _iterableToArrayLimitLoose from "@babel/runtime/helpers/esm/iterableToArrayLimitLoose";
import _createRawReactElement from "@babel/runtime/helpers/esm/jsx";
import _objectSpread2 from "@babel/runtime/helpers/esm/objectSpread2";
import _using from "@babel/runtime/helpers/esm/using";
import _wrapRegExp from "@babel/runtime/helpers/esm/wrapRegExp";
import _AwaitValue from "@babel/runtime/helpers/esm/AwaitValue";
import _defaults from "@babel/runtime/helpers/esm/defaults";
import _instanceof from "@babel/runtime/helpers/esm/instanceof";
import _classCheckPrivateStaticFieldDescriptor from "@babel/runtime/helpers/esm/classCheckPrivateStaticFieldDescriptor";
import _classCheckPrivateStaticAccess from "@babel/runtime/helpers/esm/classCheckPrivateStaticAccess";
import _classApplyDescriptorDestructureSet from "@babel/runtime/helpers/esm/classApplyDescriptorDestructureSet";
import _classPrivateMethodSet from "@babel/runtime/helpers/esm/classPrivateMethodSet";
import _typeof from "@babel/runtime/helpers/esm/typeof";
import _extends from "@babel/runtime/helpers/esm/extends";
import _get from "@babel/runtime/helpers/esm/get";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _setPrototypeOf from "@babel/runtime/helpers/esm/setPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _interopRequireDefault from "@babel/runtime/helpers/esm/interopRequireDefault";
import _checkPrivateRedeclaration from "@babel/runtime/helpers/esm/checkPrivateRedeclaration";
interface ReactElementBean {
    $$typeof: Object;
    type: Object;
    key: Object;
    ref: Object;
    props: Object;
    _owner: Object;
}
interface DefaultConfigBean {
    // minimum relative difference between two compared values,
    // used by all comparison functions
    epsilon: number;
    // type of default matrix output. Choose 'matrix' (default) or 'array'
    matrix: string;
    // type of default number output. Choose 'number' (default) 'BigNumber', or 'Fraction
    number: string;
    // number of significant digits in BigNumbers
    precision: number;
    // predictable output type of functions. When true, output type depends only
    // on the input types. When false (default), output type can vary depending
    // on input values. For example `math.sqrt(-4)` returns `complex('2i')` when
    // predictable is false, and returns `NaN` when true.
    predictable: boolean;
    // random seed for seeded pseudo random number generation
    // null = randomly seed
    randomSeed: Object;
}
const DEFAULT_CONFIG: DefaultConfigBean = {
    // minimum relative difference between two compared values,
    // used by all comparison functions
    epsilon: 1e-12,
    // type of default matrix output. Choose 'matrix' (default) or 'array'
    matrix: 'Matrix',
    // type of default number output. Choose 'number' (default) 'BigNumber', or 'Fraction
    number: 'number',
    // number of significant digits in BigNumbers
    precision: 64,
    // predictable output type of functions. When true, output type depends only
    // on the input types. When false (default), output type can vary depending
    // on input values. For example `math.sqrt(-4)` returns `complex('2i')` when
    // predictable is false, and returns `NaN` when true.
    predictable: false,
    // random seed for seeded pseudo random number generation
    // null = randomly seed
    randomSeed: null
};
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
        it('_OverloadYield', 0, () => {
            let overloadYield: _OverloadYield = new _OverloadYield("a", "b");
            expect(overloadYield.v).assertDeepEquals("a");
            expect(overloadYield.k).assertDeepEquals("b");
        });
        it('_checkInRHS_string', 0, () => {
            try {
                _checkInRHS("a");
            }
            catch (e) {
                expect(e.message).assertEqual("right-hand side of 'in' should be an object, got string");
            }
        });
        class NameTestBean {
            name: string;
        }
        it('_checkInRHS_obj', 0, () => {
            let a: NameTestBean = {
                name: "a"
            };
            expect(_checkInRHS(a)).assertDeepEquals(a);
        });
        it('_defineAccessor', 0, () => {
            let a: NameTestBean = {
                name: "a"
            };
            let fun = () => { };
            expect(_defineAccessor("string", a, "a", fun)).assertDeepEquals(a);
        });
        it('_iterableToArrayLimit', 0, () => {
            let arr: Array<string> = new Array();
            arr.push('a', 'b', 'c', 'd', 'e');
            expect(_iterableToArrayLimit(arr, 2)).assertDeepEquals(["a", "b"]);
        });
        it('_iterableToArrayLimitLoose', 0, () => {
            let arr: Array<string> = new Array();
            arr.push('a', 'b', 'c', 'd', 'e');
            expect(_iterableToArrayLimitLoose(arr, 2)).assertDeepEquals([]);
        });
        class prop {
            name: string = '';
            value: string | number = '';
        }
        it('_createRawReactElement', 0, () => {
            let props: prop[] = [{
                    name: "width", value: 30
                } as prop, {
                    name: "height", value: 30
                } as prop];
            let reactElement: ReactElementBean = _createRawReactElement('div', props, "key", "text");
            expect(reactElement.props).assertDeepEquals(props);
            expect(reactElement.type).assertEqual("div");
            expect(reactElement.key).assertEqual("key");
        });
        it('_objectSpread2_string', 0, () => {
            expect(_objectSpread2('target')).assertEqual('target');
        });
        it('_objectSpread2_bool', 0, () => {
            expect(_objectSpread2(false)).assertFalse();
        });
        it('_using_err', 0, () => {
            try {
                expect(_using([], { name: 'a' }, true)).assertDeepEquals([]);
            }
            catch (e) {
                expect(e.message).assertEqual('Property [Symbol.dispose] is not a function.');
            }
        });
        it('_using_err2', 0, () => {
            try {
                _using([], 'a');
            }
            catch (e) {
                expect(e.message).assertEqual('using declarations can only be used with objects, null, or undefined.');
            }
        });
        it('_wrapRegExp', 0, () => {
            expect(JSON.stringify(_wrapRegExp())).assertEqual("{}");
        });
        it('_AwaitValue', 0, () => {
            let awaitValue: _AwaitValue = new _AwaitValue('a');
            expect(awaitValue.wrapped).assertEqual("a");
        });
        it('_defaults', 0, () => {
            let test: NameTestBean = {
                name: "test"
            };
            let obj: Object = _defaults(test, {});
            expect(obj).assertDeepEquals(test);
        });
        it('asyncIterator', 0, () => {
            try {
                asyncIterator({});
            }
            catch (e) {
                expect(e.message).assertEqual('Object is not async iterable');
            }
        });
        it('configInternal_extends', 0, () => {
            let configInternal: Object = _extends({}, DEFAULT_CONFIG);
            expect(configInternal).assertDeepEquals(DEFAULT_CONFIG);
        });
        it('defineProperty', 0, () => {
            expect(_defineProperty({}, 'name', "abc")).assertDeepEquals({ "name": "abc" });
        });
        it('getPrototypeOf', 0, () => {
            expect(_getPrototypeOf({})).assertDeepEquals({});
        });
        it('setPrototypeOf', 0, () => {
            expect(_setPrototypeOf({}, {
                name: "text"
            })).assertDeepEquals({});
        });
        it('possibleConstructorReturn', 0, () => {
            expect(typeof _possibleConstructorReturn).assertEqual('function');
        });
        it('inherits', 0, () => {
            try {
                _inherits();
            }
            catch (e) {
                expect(e.message).assertEqual('Super expression must either be null or a function');
            }
        });
        it('get', 0, () => {
            try {
                _get();
            }
            catch (e) {
                expect(e.message).assertEqual('Reflect.get target is not object');
            }
        });
        it('_interopRequireDefault_createClass', 0, () => {
            expect(typeof _interopRequireDefault(_createClass)).assertEqual('object');
        });
        it('_interopRequireDefault_toConsumableArray', 0, () => {
            expect(typeof _interopRequireDefault(_toConsumableArray)).assertEqual('object');
        });
        it('_interopRequireDefault_classCallCheck', 0, () => {
            expect(typeof _interopRequireDefault(_classCallCheck)).assertEqual('object');
        });
        it('_interopRequireDefault_extends', 0, () => {
            expect(typeof _interopRequireDefault(_extends)).assertEqual('object');
        });
        it('_interopRequireDefault', 0, () => {
            expect(typeof _interopRequireDefault({ name: "abc" })).assertEqual('object');
        });
        it('_typeof', 0, () => {
            expect(_typeof({ name: "abc" })).assertEqual('object');
        });
        it('_classApplyDescriptorDestructureSet', 0, () => {
            try {
                _classApplyDescriptorDestructureSet({ name: 'abc' }, 'abc');
            }
            catch (e) {
                expect(e.message).assertEqual('attempted to set read only private field');
            }
        });
        it('_classCheckPrivateStaticAccess', 0, () => {
            try {
                _classCheckPrivateStaticAccess(undefined, 'abc');
            }
            catch (e) {
                expect(e.message).assertEqual('Private static access of wrong provenance');
            }
        });
        it('_classCheckPrivateStaticFieldDescriptor', 0, () => {
            try {
                _classCheckPrivateStaticFieldDescriptor(undefined, 'abc');
            }
            catch (e) {
                expect(e.message).assertEqual('attempted to abc private static field before its declaration');
            }
        });
        it('_classPrivateMethodSet', 0, () => {
            try {
                _classPrivateMethodSet();
            }
            catch (e) {
                expect(e.message).assertEqual('attempted to reassign private method');
            }
        });
        it('identity_string', 0, () => {
            expect(identity('x')).assertEqual('x');
        });
        it('identity_number', 0, () => {
            expect(identity(0)).assertEqual(0);
        });
        it('identity_function', 0, () => {
            let fun = () => { };
            expect(identity(fun)).assertDeepEquals(fun);
        });
        it('identity_bool', 0, () => {
            expect(identity(true)).assertTrue();
        });
    });
}
