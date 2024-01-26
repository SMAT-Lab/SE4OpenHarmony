let __generate__Id: number = 0;
function generateId(): string {
    return "JamaTest2.test_" + ++__generate__Id;
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
export default function JamaTest02() {
    describe('JamaTest02', () => {
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
        runFunc('Matrix_getRowPackedCopy01', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][] = [];
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                array = [[1., 2., 3], [4., 5., 6.], [7., 8., 10.]];
                A = new Matrix(array);
                B = A.getRowPackedCopy();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_getRowPackedCopy averageTime = ${ave}us`);
            expect(B.length).assertEqual(array[0].length + array[1].length + array[2].length);
        });
        runFunc('Matrix_getRowPackedCopy02', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][] = [];
            for (let i = 0; i < 10; i++) {
                let s = new Date().getTime();
                array = [[73., 38., 10.]];
                A = new Matrix(array);
                B = A.getRowPackedCopy();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_getRowPackedCopy averageTime = ${ave}us`);
            expect(B.length).assertEqual(array[0].length);
        });
        runFunc('Matrix_getRowPackedCopy03', 0, () => {
            let A: any;
            let getRowPackedCopy: any;
            let array: number[][];
            for (let i = 0; i < 10; i++) {
                array = [[10., 21., 10.]];
                A = new Matrix(array);
                getRowPackedCopy = A.getRowPackedCopy();
            }
            expect(JSON.stringify(getRowPackedCopy)).assertEqual('[10,21,10]');
        });
        runFunc('Matrix_getRowPackedCopy04', 0, () => {
            let A: any;
            let getRowPackedCopy: any;
            let array: number[][];
            for (let i = 0; i < 5; i++) {
                array = [[3., 1., 19.]];
                A = new Matrix(array);
                getRowPackedCopy = A.getRowPackedCopy();
            }
            expect(JSON.stringify(getRowPackedCopy)).assertEqual('[3,1,19]');
        });
        runFunc('Matrix_getRowDimension01', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                array = [[1., 2., 3], [4., 5., 6.], [7., 8., 10.]];
                A = new Matrix(array);
                B = A.getRowDimension();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_getRowDimension averageTime = ${ave}us`);
            expect(B).assertEqual(3);
        });
        runFunc('Matrix_getRowDimension02', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 40; i++) {
                let s = new Date().getTime();
                array = [[18., 28., 233]];
                A = new Matrix(array);
                B = A.getRowDimension();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_getRowDimension averageTime = ${ave}us`);
            expect(B).assertEqual(1);
        });
        runFunc('Matrix_getRowDimension03', 0, () => {
            let A: any;
            let B: any;
            let array: number[][];
            array = [[18., 6., 88], [5., 16., 89]];
            A = new Matrix(array);
            B = A.getRowDimension();
            expect(B).assertEqual(2);
        });
        runFunc('Matrix_getRowDimension04', 0, () => {
            let A: any;
            let B: any;
            let array: number[][];
            array = [[18., 6., 88], [5., 16., 89], [15., 5., 100]];
            A = new Matrix(array);
            B = A.getRowDimension();
            expect(B).assertEqual(3);
        });
        runFunc('Matrix_getColumnDimension01', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                array = [[1., 2., 3], [4., 5., 6.], [7., 8., 10.]];
                A = new Matrix(array);
                B = A.getColumnDimension();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_getColumnDimension averageTime = ${ave}us`);
            expect(B).assertEqual(3);
        });
        runFunc('Matrix_getColumnDimension02', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 90; i++) {
                let s = new Date().getTime();
                array = [[24., 21., 34], [42., 5., 644.]];
                A = new Matrix(array);
                B = A.getColumnDimension();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_getColumnDimension averageTime = ${ave}us`);
            expect(B).assertEqual(3);
        });
        runFunc('Matrix_getColumnDimension03', 0, () => {
            let A: any;
            let getColumnDimension: any;
            let array: number[][];
            array = [[24., 21., 34], [42., 5., 698.]];
            A = new Matrix(array);
            getColumnDimension = A.getColumnDimension();
            expect(getColumnDimension).assertEqual(3);
        });
        runFunc('Matrix_getColumnDimension04', 0, () => {
            let A: any;
            let getColumnDimension: any;
            let array: number[][];
            array = [[90., 51., 22.]];
            A = new Matrix(array);
            getColumnDimension = A.getColumnDimension();
            expect(getColumnDimension).assertEqual(3);
        });
        runFunc('Matrix_get01', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][] = [];
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                array = [[1., 2., 3], [4., 5., 6.], [7., 8., 10.]];
                A = new Matrix(array);
                B = A.get(1, 1);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_get averageTime = ${ave}us`);
            expect(B).assertEqual(array[1][1]);
        });
        runFunc('Matrix_get02', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 30; i++) {
                let s = new Date().getTime();
                array = [[123., 422.], [49., 985.]];
                A = new Matrix(array);
                B = A.get(0, 0);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_get averageTime = ${ave}us`);
            expect(B).assertEqual(123);
        });
        runFunc('Matrix_get03', 0, () => {
            let A: any;
            let B: any;
            let array: number[][];
            array = [[110., 21., 37], [74., 51., 64.], [27., 81., 101.]];
            A = new Matrix(array);
            B = A.get(2, 2);
            expect(B).assertEqual(101);
        });
        runFunc('Matrix_get04', 0, () => {
            let A: any;
            let B: any;
            let array: number[][];
            array = [[1., 21., 12], [27., 3., 32.]];
            A = new Matrix(array);
            B = A.get(1, 2);
            expect(B).assertEqual(32);
        });
        runFunc('Matrix_getMatrix_int_int_int_int01', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                array = [[1., 2., 3], [4., 5., 6.], [7., 8., 10.]];
                A = new Matrix(array);
                B = A.getMatrix$int$int$int$int(0, 1, 0, 1);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_getMatrix_int_int_int_int averageTime = ${ave}us`);
            expect(B.m).assertEqual(2);
            expect(B.n).assertEqual(2);
        });
        runFunc('Matrix_getMatrix_int_int_int_int02', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 10; i++) {
                let s = new Date().getTime();
                array = [[21., 45., 34], [74., 84., 90.]];
                A = new Matrix(array);
                B = A.getMatrix$int$int$int$int(1, 1, 1, 0);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_getMatrix_int_int_int_int averageTime = ${ave}us`);
            expect(B.m).assertEqual(1);
            expect(B.n).assertEqual(0);
        });
        runFunc('Matrix_getMatrix_int_int_int_int03', 0, () => {
            let A: any;
            let B: any;
            let array: number[][];
            array = [[1., 2., 3], [4., 5., 6.], [7., 8., 10.]];
            A = new Matrix(array);
            B = A.getMatrix$int$int$int$int(0, 0, 0, 0);
            expect(JSON.stringify(B)).assertEqual('{"A":[[1]],"m":1,"n":1}');
        });
        runFunc('Matrix_getMatrix_int_int_int_int04', 0, () => {
            let A: any;
            let B: any;
            let array: number[][];
            array = [[11., 12., 13], [76., 18., 10.]];
            A = new Matrix(array);
            B = A.getMatrix$int$int$int$int(1, 1, 1, 1);
            expect(JSON.stringify(B)).assertEqual('{"A":[[18]],"m":1,"n":1}');
        });
        runFunc('Matrix_getMatrix01', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                array = [[1., 2., 3], [4., 5., 6.], [7., 8., 10.]];
                A = new Matrix(array);
                B = A.getMatrix(0, 1, 0, 1);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_getMatrix averageTime = ${ave}us`);
            expect(B.m).assertEqual(2);
            expect(B.n).assertEqual(2);
        });
        runFunc('Matrix_getMatrix02', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                array = [[74., 45., 510.]];
                A = new Matrix(array);
                B = A.getMatrix(0, 0, 0, 0);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_getMatrix averageTime = ${ave}us`);
            expect(B.m).assertEqual(1);
            expect(B.n).assertEqual(1);
        });
        runFunc('Matrix_getMatrix03', 0, () => {
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 50; i++) {
                array = [[74., 45., 510.]];
                A = new Matrix(array);
                B = A.getMatrix(12, 2, 6, 0);
            }
            expect(JSON.stringify(B)).assertEqual('{"A":[],"m":-9,"n":-5}');
        });
        runFunc('Matrix_getMatrix04', 0, () => {
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 10; i++) {
                array = [[31., 3., 33.]];
                A = new Matrix(array);
                B = A.getMatrix(35, 2, 4, 7);
            }
            expect(JSON.stringify(B)).assertEqual('{"A":[],"m":-32,"n":4}');
        });
        runFunc('Matrix_getMatrix_int_A_int_A01', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                array = [[1., 2., 3], [4., 5., 6.], [7., 8., 10.]];
                A = new Matrix(array);
                B = A.getMatrix([0, 1], [0, 1]);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_getMatrix_int_A_int_A averageTime = ${ave}us`);
            expect(B.m).assertEqual(2);
            expect(B.n).assertEqual(2);
        });
        runFunc('Matrix_getMatrix_int_A_int_A02', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 40; i++) {
                let s = new Date().getTime();
                array = [[24., 35., 6.], [7., 38., 140.]];
                A = new Matrix(array);
                B = A.getMatrix([1, 0], [1, 1]);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_getMatrix_int_A_int_A averageTime = ${ave}us`);
            expect(B.m).assertEqual(2);
            expect(B.n).assertEqual(2);
        });
        runFunc('Matrix_getMatrix_int_A_int_A03', 0, () => {
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 40; i++) {
                array = [[11., 132., 62.], [57., 34., 2.]];
                A = new Matrix(array);
                B = A.getMatrix([0, 0], [0, 0]);
            }
            expect(B.m).assertEqual(2);
        });
        runFunc('Matrix_getMatrix_int_A_int_A04', 0, () => {
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 40; i++) {
                array = [[11., 25., 62.], [9., 1., 52.]];
                A = new Matrix(array);
                B = A.getMatrix([1, 1], [1, 1]);
            }
            expect(JSON.stringify(B)).assertEqual('{"A":[[1,1],[1,1]],"m":2,"n":2}');
        });
    });
}
