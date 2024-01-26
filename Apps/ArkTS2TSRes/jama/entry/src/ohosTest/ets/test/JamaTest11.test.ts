let __generate__Id: number = 0;
function generateId(): string {
    return "JamaTest11.test_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import { Matrix } from '@ohos/jama';
export default function JamaTest11() {
    describe('JamaTest11', () => {
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
        let runFunc = (name: string, type: number, func: any) => {
            it(name, type, func);
        };
        runFunc('Matrix_checkMatrixDimensions01', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                array = [[1., 2., 3], [4., 5., 6.], [7., 8., 10.]];
                array2 = [[2., 2., 3], [4., 5., 6.], [7., 8., 10.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                B = A.checkMatrixDimensions(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_checkMatrixDimensions averageTime = ${ave}us`);
            expect(B).assertUndefined();
        });
        runFunc('Matrix_checkMatrixDimensions02', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                array = [[121., 98., 22], [43., 154., 43.], [37., 86., 45.]];
                array2 = [[72., 27., 37], [46., 77., 6.], [776., 84., 76.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                B = A.checkMatrixDimensions(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_checkMatrixDimensions averageTime = ${ave}us`);
            expect(B).assertUndefined();
        });
        runFunc('Matrix_checkMatrixDimensions03', 0, () => {
            let array: number[][];
            let array2: number[][];
            array = [[42., 12., 33], [44., 15., 63.], [34., 4., 46.]];
            array2 = [[14., 56., 13], [4., 55., 6.], [27., 8., 56.]];
            let C: Matrix = new Matrix(array2);
            let A: Matrix = new Matrix(array);
            let B = A.checkMatrixDimensions(C);
            expect(B).assertUndefined();
        });
        runFunc('Matrix_checkMatrixDimensions04', 0, () => {
            let array: number[][];
            let array2: number[][];
            array = [[2., 12., 4], [5., 4., 46.]];
            array2 = [[14., 0., 13], [4., 12., 6.]];
            let C: Matrix = new Matrix(array2);
            let A: Matrix = new Matrix(array);
            let B = A.checkMatrixDimensions(C);
            expect(B).assertUndefined();
        });
        runFunc('getMatrix$int$int$int_A01', 0, () => {
            let array: number[][];
            let array2: number[][];
            let D: any;
            let sumAve: number = 0;
            array = [[2., 12., 4], [5., 4., 46.]];
            array2 = [[14., 0., 13], [4., 12., 6.], [1, 2, 3]];
            let C: Matrix = new Matrix(array2);
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                D = C.getMatrix$int$int$int_A(0, 1, [0]);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:getMatrix$int$int$int_A01 averageTime = ${ave}us`);
            expect(D).not().assertUndefined();
        });
        runFunc('getMatrix$int$int$int_A02', 0, () => {
            let array: number[][];
            let array2: number[][];
            let D: any;
            let sumAve: number = 0;
            array = [[2., 12., 4], [5., 4., 46.]];
            array2 = [[14., 0., 13], [4., 12., 6.], [1, 2, 3]];
            let C: Matrix = new Matrix(array2);
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                D = C.getMatrix$int$int$int_A(1, 2, [1]);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:getMatrix$int$int$int_A02 averageTime = ${ave}us`);
            expect(D).not().assertUndefined();
        });
        runFunc('getMatrix$int$int$int_A03', 0, () => {
            let array: number[][];
            let array2: number[][];
            let D: any;
            let sumAve: number = 0;
            array = [[2., 12., 4], [5., 4., 46.]];
            array2 = [[14., 0., 13], [4., 12., 6.], [1, 2, 3]];
            let C: Matrix = new Matrix(array2);
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                D = C.getMatrix$int$int$int_A(0, 1, [2]);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:getMatrix$int$int$int_A03 averageTime = ${ave}us`);
            expect(D).not().assertUndefined();
        });
        runFunc('getMatrix$int$int$int_A04', 0, () => {
            let array: number[][];
            let array2: number[][];
            let D: any;
            let sumAve: number = 0;
            array = [[2., 12., 4], [5., 4., 46.]];
            array2 = [[14., 0., 13], [4., 12., 6.], [1, 2, 3]];
            let C: Matrix = new Matrix(array2);
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                D = C.getMatrix$int$int$int_A(1, 2, [0]);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:getMatrix$int$int$int_A04 averageTime = ${ave}us`);
            expect(D).not().assertUndefined();
        });
        runFunc('getMatrix$int$int$int_A05', 0, () => {
            let array: number[][];
            let array2: number[][];
            let D: any;
            let sumAve: number = 0;
            array = [[2., 12., 4], [5., 4., 46.]];
            array2 = [[14., 0., 13], [4., 12., 6.], [1, 2, 3]];
            let C: Matrix = new Matrix(array2);
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                D = C.getMatrix$int$int$int_A(0, 2, [1]);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:getMatrix$int$int$int_A05 averageTime = ${ave}us`);
            expect(D).not().assertUndefined();
        });
        runFunc('getMatrix$int_A$int$int01', 0, () => {
            let array: number[][];
            let array2: number[][];
            let D: any;
            let sumAve: number = 0;
            array = [[2., 12., 4], [5., 4., 46.]];
            array2 = [[14., 0., 13], [4., 12., 6.], [1, 2, 3]];
            let C: Matrix = new Matrix(array2);
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                D = C.getMatrix$int_A$int$int([0], 0, 1);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:getMatrix$int_A$int$int01 averageTime = ${ave}us`);
            expect(D).not().assertUndefined();
        });
        runFunc('getMatrix$int_A$int$int02', 0, () => {
            let array: number[][];
            let array2: number[][];
            let D: any;
            let sumAve: number = 0;
            array = [[2., 12., 4], [5., 4., 46.]];
            array2 = [[14., 0., 13], [4., 12., 6.], [1, 2, 3]];
            let C: Matrix = new Matrix(array2);
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                D = C.getMatrix$int_A$int$int([1], 1, 2);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:getMatrix$int_A$int$int02 averageTime = ${ave}us`);
            expect(D).not().assertUndefined();
        });
        runFunc('getMatrix$int_A$int$int03', 0, () => {
            let array: number[][];
            let array2: number[][];
            let D: any;
            let sumAve: number = 0;
            array = [[2., 12., 4], [5., 4., 46.]];
            array2 = [[14., 0., 13], [4., 12., 6.], [1, 2, 3]];
            let C: Matrix = new Matrix(array2);
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                D = C.getMatrix$int_A$int$int([2], 0, 1);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:getMatrix$int_A$int$int03 averageTime = ${ave}us`);
            expect(D).not().assertUndefined();
        });
        runFunc('getMatrix$int_A$int$int04', 0, () => {
            let array: number[][];
            let array2: number[][];
            let D: any;
            let sumAve: number = 0;
            array = [[2., 12., 4], [5., 4., 46.]];
            array2 = [[14., 0., 13], [4., 12., 6.], [1, 2, 3]];
            let C: Matrix = new Matrix(array2);
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                D = C.getMatrix$int_A$int$int([0], 0, 2);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:getMatrix$int_A$int$int04 averageTime = ${ave}us`);
            expect(D).not().assertUndefined();
        });
        runFunc('getMatrix$int_A$int$int05', 0, () => {
            let array: number[][];
            let array2: number[][];
            let D: any;
            let sumAve: number = 0;
            array = [[2., 12., 4], [5., 4., 46.]];
            array2 = [[14., 0., 13], [4., 12., 6.], [1, 2, 3]];
            let C: Matrix = new Matrix(array2);
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                D = C.getMatrix$int_A$int$int([1], 1, 2);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:getMatrix$int_A$int$int05 averageTime = ${ave}us`);
            expect(D).not().assertUndefined();
        });
    });
}
