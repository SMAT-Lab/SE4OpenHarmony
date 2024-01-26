let __generate__Id: number = 0;
function generateId(): string {
    return "JamaTest3.test_" + ++__generate__Id;
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
export default function JamaTest03() {
    describe('JamaTest03', () => {
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
        runFunc('Matrix_getMatrix_int_int_int_A01', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                array = [[1., 2., 3], [4., 5., 6.], [7., 8., 10.]];
                A = new Matrix(array);
                B = A.getMatrix(0, 1, [0, 1]);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_getMatrix_int_int_int_A averageTime = ${ave}us`);
            expect(B.m).assertEqual(2);
            expect(B.n).assertEqual(2);
            expect(A.m).assertEqual(3);
            expect(A.n).assertEqual(3);
        });
        runFunc('Matrix_getMatrix_int_int_int_A02', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 10; i++) {
                let s = new Date().getTime();
                array = [[27., 82., 210.], [4., 5., 6.]];
                A = new Matrix(array);
                B = A.getMatrix(0, 1, [0, 1]);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_getMatrix_int_int_int_A averageTime = ${ave}us`);
            expect(B.m).assertEqual(2);
            expect(B.n).assertEqual(2);
            expect(A.m).assertEqual(2);
            expect(A.n).assertEqual(3);
        });
        runFunc('Matrix_getMatrix_int_int_int_A03', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                array = [[1., 32., 13], [4., 52., 16.], [73., 83., 120.]];
                A = new Matrix(array);
                B = A.getMatrix(1, 1, [1, 1]);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_getMatrix_int_int_int_A averageTime = ${ave}us`);
            expect(JSON.stringify(B)).assertEqual('{"A":[[52,52]],"m":1,"n":2}');
        });
        runFunc('Matrix_getMatrix_int_int_int_A04', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                array = [[11., 6., 13], [89., 83., 3.]];
                A = new Matrix(array);
                B = A.getMatrix(1, 1, [1, 0]);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_getMatrix_int_int_int_A averageTime = ${ave}us`);
            expect(JSON.stringify(B)).assertEqual('{"A":[[83,89]],"m":1,"n":2}');
        });
        runFunc('Matrix_getMatrix_int_A_int_int01', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                array = [[1., 2., 3], [4., 5., 6.], [7., 8., 10.]];
                A = new Matrix(array);
                B = A.getMatrix([0, 1], 0, 1);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_getMatrix_int_A_int_int averageTime = ${ave}us`);
            expect(B.m).assertEqual(2);
            expect(B.n).assertEqual(2);
            expect(A.m).assertEqual(3);
            expect(A.n).assertEqual(3);
        });
        runFunc('Matrix_getMatrix_int_A_int_int02', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 11; i++) {
                let s = new Date().getTime();
                array = [[4., 54., 89.], [34., 33., 300.]];
                A = new Matrix(array);
                B = A.getMatrix([0, 1], 0, 1);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_getMatrix_int_A_int_int averageTime = ${ave}us`);
            expect(B.m).assertEqual(2);
            expect(B.n).assertEqual(2);
            expect(A.m).assertEqual(2);
            expect(A.n).assertEqual(3);
        });
        runFunc('Matrix_getMatrix_int_A_int_int03', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 10; i++) {
                let s = new Date().getTime();
                array = [[11., 12., 33], [41., 33., 6.], [70., 18., 120.]];
                A = new Matrix(array);
                B = A.getMatrix([0, 0], 0, 1);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_getMatrix_int_A_int_int averageTime = ${ave}us`);
            expect(JSON.stringify(B)).assertEqual('{"A":[[11,12],[11,12]],"m":2,"n":2}');
        });
        runFunc('Matrix_getMatrix_int_A_int_int04', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 9; i++) {
                let s = new Date().getTime();
                array = [[8., 80., 100], [9., 8., 36.]];
                A = new Matrix(array);
                B = A.getMatrix([1, 1], 1, 1);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_getMatrix_int_A_int_int averageTime = ${ave}us`);
            expect(JSON.stringify(B)).assertEqual('{"A":[[8],[8]],"m":2,"n":1}');
        });
        runFunc('Matrix_set01', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                array = [[1., 2., 3], [4., 5., 6.], [7., 8., 10.]];
                A = new Matrix(array);
                B = A.set(0, 1, 66);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_set averageTime = ${ave}us`);
            expect(A.getArray()[0][1]).assertEqual(66);
        });
        runFunc('Matrix_set02', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 10; i++) {
                let s = new Date().getTime();
                array = [[46., 65., 66.], [62., 82., 140.]];
                A = new Matrix(array);
                B = A.set(0, 3, 33);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_set averageTime = ${ave}us`);
            expect(A.getArray()[1][1]).assertEqual(82);
        });
        runFunc('Matrix_set03', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 10; i++) {
                let s = new Date().getTime();
                array = [[35., 3., 1.], [62., 1., 234.], [90., 11., 3.]];
                A = new Matrix(array);
                B = A.set(0, 13, 2);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_set averageTime = ${ave}us`);
            expect(A.getArray()[0][1]).assertEqual(3);
        });
        runFunc('Matrix_set04', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 63; i++) {
                let s = new Date().getTime();
                array = [[1., 33., 12.], [4., 1., 3.], [77., 32., 3.]];
                A = new Matrix(array);
                B = A.set(0, 56, 22);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_set averageTime = ${ave}us`);
            expect(A.getArray()[2][1]).assertEqual(32);
        });
        runFunc('Matrix_setMatrix_int_int_int_int_Jama_Matrix01', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][] = [];
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                array = [[1., 2., 3], [4., 5., 6.], [7., 8., 10.]];
                array2 = [[10., 20., 30], [40., 50., 60.], [70., 80., 100.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                A.setMatrix$int$int$int$int$Jama_Matrix(0, 1, 0, 1, C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_setMatrix_int_int_int_int_Jama_Matrix averageTime = ${ave}us`);
            expect(A.getArray()[0][1]).assertEqual(array2[0][1]);
        });
        runFunc('Matrix_setMatrix_int_int_int_int_Jama_Matrix02', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][] = [];
            for (let i = 0; i < 90; i++) {
                let s = new Date().getTime();
                array = [[334., 5., 46.], [74., 48., 410.]];
                array2 = [[70., 50., 160.], [701., 180., 190.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                A.setMatrix$int$int$int$int$Jama_Matrix(0, 1, 0, 1, C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_setMatrix_int_int_int_int_Jama_Matrix averageTime = ${ave}us`);
            expect(A.getArray()[1][0]).assertEqual(array2[1][0]);
        });
        runFunc('Matrix_setMatrix_int_int_int_int_Jama_Matrix03', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                array = [[15., 12., 53], [43., 55., 65.], [97., 83., 310.]];
                array2 = [[32., 333., 20], [40., 432., 1.], [32., 23., 11.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                A.setMatrix$int$int$int$int$Jama_Matrix(2, 1, 0, 3, C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_setMatrix_int_int_int_int_Jama_Matrix averageTime = ${ave}us`);
            expect(A.getArray()[2][1]).assertEqual(83);
        });
        runFunc('Matrix_setMatrix_int_int_int_int_Jama_Matrix04', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 42; i++) {
                let s = new Date().getTime();
                array = [[456., 31., 153], [2., 32., 123.]];
                array2 = [[32., 31., 20], [31., 81., 1.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                A.setMatrix$int$int$int$int$Jama_Matrix(22, 21, 4, 4, C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_setMatrix_int_int_int_int_Jama_Matrix averageTime = ${ave}us`);
            expect(A.getArray()[1][1]).assertEqual(32);
        });
        runFunc('Matrix_setMatrix01', 0, () => {
            let sumAve = 0;
            let A: any;
            let C: any;
            let array: number[][];
            let array2: number[][] = [];
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                array = [[1., 2., 3], [4., 5., 6.], [7., 8., 10.]];
                array2 = [[10., 20., 30], [40., 50., 60.], [70., 80., 100.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                A.setMatrix(0, 1, 0, 1, C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_setMatrix averageTime = ${ave}us`);
            expect(A.getArray()[0][1]).assertEqual(array2[0][1]);
        });
        runFunc('Matrix_setMatrix02', 0, () => {
            let sumAve = 0;
            let A: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 90; i++) {
                let s = new Date().getTime();
                array = [[54., 15., 116.], [71., 18., 410.]];
                array2 = [[310., 220., 130], [270., 180., 90.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                A.setMatrix(0, 1, 0, 0, C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_setMatrix averageTime = ${ave}us`);
            expect(A.getArray()[0][1]).assertEqual(15);
        });
        runFunc('Matrix_setMatrix03', 0, () => {
            let sumAve = 0;
            let A: any;
            let C: any;
            let setMatrix: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 30; i++) {
                let s = new Date().getTime();
                array = [[1., 62., 3], [4., 35., 13.], [47., 48., 610.]];
                array2 = [[42., 7., 3], [6., 2., 1.], [86., 5., 4.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                setMatrix = A.setMatrix(0, 2, 2, 4, C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_setMatrix averageTime = ${ave}us`);
            expect(setMatrix).assertUndefined();
        });
        runFunc('Matrix_setMatrix04', 0, () => {
            let sumAve = 0;
            let A: any;
            let C: any;
            let setMatrix: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 30; i++) {
                let s = new Date().getTime();
                array = [[11., 34., 13], [14., 10., 5.]];
                array2 = [[47., 7., 33], [61., 12., 11.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                setMatrix = A.setMatrix(0, 1, 2, 3, C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_setMatrix averageTime = ${ave}us`);
            expect(setMatrix).assertUndefined();
        });
    });
}
