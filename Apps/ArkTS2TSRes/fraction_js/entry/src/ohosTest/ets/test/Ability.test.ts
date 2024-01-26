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
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import Fraction from 'fraction.js';
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
        it('add', 0, () => {
            let c = new Fraction("99.3");
            let r = c.add(3);
            expect(r.toString()).assertEqual('102.3');
        });
        it('div', 0, () => {
            let c = new Fraction("99.3");
            let r = c.div(4);
            expect(r.toString()).assertEqual('24.825');
        });
        it('sub', 0, () => {
            let c = new Fraction("99.3");
            let r = c.sub(33);
            expect(r.toString()).assertEqual('66.3');
        });
        it('mul', 0, () => {
            let c = new Fraction("99.3");
            let r = c.mul(2);
            expect(r.toString()).assertEqual('198.6');
        });
        it('pow', 0, () => {
            let c = new Fraction("3.3");
            let r = c.pow(2);
            expect(r.toString()).assertEqual('10.89');
        });
        it('abs', 0, () => {
            let c = new Fraction("-3.3");
            let r = c.abs();
            expect(r.toString()).assertEqual('3.3');
        });
        it('ceil', 0, () => {
            let c = new Fraction("42.23");
            let r = c.ceil();
            expect(r.toString()).assertEqual('43');
        });
        it('floor', 0, () => {
            let c = new Fraction("45.6");
            let r = c.floor();
            expect(r.toString()).assertEqual('45');
        });
        it('round', 0, () => {
            let c = new Fraction("45.6");
            let r = c.round();
            expect(r.toString()).assertEqual('46');
        });
        it('neg', 0, () => {
            let c = new Fraction("45.6");
            let r = c.neg();
            expect(r.toString()).assertEqual('-45.6');
        });
        it('mod', 0, () => {
            let f = new Fraction("-6.(3416)");
            let r = f.mod(1).abs();
            expect(r.toString()).assertEqual('0.(3416)');
        });
        it('inverse', 0, () => {
            let c = new Fraction("45.6");
            let r = c.inverse();
            expect(r.toString()).assertEqual('0.02(192982456140350877)');
        });
        it('equals', 0, () => {
            let c = new Fraction("1/2");
            let r = c.equals('0.5');
            expect(r).assertTrue();
        });
        it('clone', 0, () => {
            let c = new Fraction("45.6");
            let r = c.clone();
            expect(r.toString()).assertEqual('45.6');
        });
        it('toString', 0, () => {
            let c = new Fraction("45.6");
            let r = c.toString();
            expect(r.toString()).assertEqual('45.6');
        });
        it('compare', 0, () => {
            let c = new Fraction("45.6");
            let r = c.compare(45);
            expect(r).assertLarger(0);
        });
        it('gcd', 0, () => {
            let c = new Fraction("45.6");
            let r = c.gcd('2');
            expect(r.toString()).assertEqual('0.4');
        });
        it('lcm', 0, () => {
            let c = new Fraction("45.6");
            let r = c.lcm('2');
            expect(r.toString()).assertEqual('228');
        });
        it('simplify', 0, () => {
            let c = new Fraction("45.7");
            let r = c.simplify(0.01);
            expect(r.toString()).assertEqual('45.7');
        });
        it('divisible', 0, () => {
            let c = new Fraction("46");
            let r = c.divisible(2);
            expect(r).assertTrue();
        });
        it('valueOf', 0, () => {
            let c = new Fraction("45.6");
            let r = c.valueOf();
            expect(r.toString()).assertEqual('45.6');
        });
        it('toLatex', 0, () => {
            let c = new Fraction("45.6");
            let r = c.toLatex(false);
            expect(r.toString()).assertEqual('\\frac{228}{5}');
        });
        it('toFraction', 0, () => {
            let c = new Fraction("45.6");
            let r = c.toFraction();
            expect(r.toString()).assertEqual('228/5');
        });
        it('toContinued', 0, () => {
            let c = new Fraction("45.6");
            let r = c.toContinued();
            expect(JSON.stringify(r)).assertEqual('[45,1,1,2]');
        });
    });
}
