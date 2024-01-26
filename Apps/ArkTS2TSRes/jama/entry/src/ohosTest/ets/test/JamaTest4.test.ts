let __generate__Id: number = 0;
function generateId(): string {
    return "JamaTest4.test_" + ++__generate__Id;
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
export default function JamaTest04() {
    describe('JamaTest04', () => {
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
        runFunc('Matrix_setMatrix_int_A_int_A_Jama_Matrix01', 0, () => {
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
                A.setMatrix$int_A$int_A$Jama_Matrix([0, 1], [0, 1], C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_setMatrix_int_A_int_A_Jama_Matrix averageTime = ${ave}us`);
            expect(A.getArray()[0][1]).assertEqual(array2[0][1]);
        });
        runFunc('Matrix_setMatrix_int_A_int_A_Jama_Matrix02', 0, () => {
            let sumAve = 0;
            let A: any;
            let C: any;
            let array: number[][] = [];
            let array2: number[][];
            for (let i = 0; i < 10; i++) {
                let s = new Date().getTime();
                array = [[41., 235.], [17., 28.]];
                array2 = [[110., 210.], [430., 50.], [80., 130.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                A.setMatrix$int_A$int_A$Jama_Matrix([1, 1], [0, 1], C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_setMatrix_int_A_int_A_Jama_Matrix averageTime = ${ave}us`);
            expect(A.getArray()[0][1]).assertEqual(array[0][1]);
        });
        runFunc('Matrix_setMatrix_int_A_int_A_Jama_Matrix03', 0, () => {
            let sumAve = 0;
            let A: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 5; i++) {
                let s = new Date().getTime();
                array = [[12., 22., 33], [43., 53., 56.], [10., 8., 10.]];
                array2 = [[3., 13., 43], [12., 50., 4.], [70., 56., 98.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                A.setMatrix$int_A$int_A$Jama_Matrix([2, 1], [2, 1], C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_setMatrix_int_A_int_A_Jama_Matrix averageTime = ${ave}us`);
            expect(A.getArray()[0][1]).assertEqual(22);
        });
        runFunc('Matrix_setMatrix_int_A_int_A_Jama_Matrix04', 0, () => {
            let sumAve = 0;
            let A: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 5; i++) {
                let s = new Date().getTime();
                array = [[12., 2., 4], [24., 48., 4.]];
                array2 = [[3., 6., 24.], [9., 33., 43.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                A.setMatrix$int_A$int_A$Jama_Matrix([0, 0], [1, 1], C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_setMatrix_int_A_int_A_Jama_Matrix averageTime = ${ave}us`);
            expect(A.getArray()[1][1]).assertEqual(48);
        });
        runFunc('Matrix_setMatrix_int_A_int_int_Jama_Matrix01', 0, () => {
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
                A.setMatrix$int_A$int$int$Jama_Matrix([0, 1], 0, 1, C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_setMatrix_int_A_int_int_Jama_Matrix averageTime = ${ave}us`);
            expect(A.getArray()[0][1]).assertEqual(array2[0][1]);
        });
        runFunc('Matrix_setMatrix_int_A_int_int_Jama_Matrix02', 0, () => {
            let sumAve = 0;
            let A: any;
            let C: any;
            let array: number[][];
            let array2: number[][] = [];
            for (let i = 0; i < 40; i++) {
                let s = new Date().getTime();
                array = [[12., 2., 243], [4., 45., 6.], [7., 8., 10.]];
                array2 = [[10., 20., 30], [40., 50., 60.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                A.setMatrix$int_A$int$int$Jama_Matrix([0, 0], 1, 1, C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_setMatrix_int_A_int_int_Jama_Matrix averageTime = ${ave}us`);
            expect(A.getArray()[0][1]).assertEqual(array2[1][0]);
        });
        runFunc('Matrix_setMatrix_int_A_int_int_Jama_Matrix03', 0, () => {
            let sumAve = 0;
            let A: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                array = [[11., 12., 43], [41., 25., 68.], [78., 89., 98.]];
                array2 = [[3., 20., 14], [40., 42., 1.], [70., 1., 1.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                A.setMatrix$int_A$int$int$Jama_Matrix([0, 0], 0, 0, C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_setMatrix_int_A_int_int_Jama_Matrix averageTime = ${ave}us`);
            expect(A.getArray()[0][0]).assertEqual(40);
        });
        runFunc('Matrix_setMatrix_int_A_int_int_Jama_Matrix04', 0, () => {
            let sumAve = 0;
            let A: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 9; i++) {
                let s = new Date().getTime();
                array = [[11., 12., 5], [41., 25., 5.], [4., 4., 34.]];
                array2 = [[3., 8., 14], [4., 42., 1.], [3., 1., 12.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                A.setMatrix$int_A$int$int$Jama_Matrix([2, 0], 1, 4, C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_setMatrix_int_A_int_int_Jama_Matrix averageTime = ${ave}us`);
            expect(A.getArray()[2][0]).assertEqual(4);
        });
        runFunc('Matrix_setMatrix_int_int_int_A_Jama_Matrix01', 0, () => {
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
                A.setMatrix$int$int$int_A$Jama_Matrix(0, 1, [0, 1], C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_setMatrix_int_int_int_A_Jama_Matrix averageTime = ${ave}us`);
            expect(A.getArray()[0][1]).assertEqual(array2[0][1]);
        });
        runFunc('Matrix_setMatrix_int_int_int_A_Jama_Matrix02', 0, () => {
            let sumAve = 0;
            let A: any;
            let C: any;
            let array: number[][];
            let array2: number[][] = [];
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                array = [[143., 32.], [44., 45.], [227., 84.]];
                array2 = [[210., 220.], [40., 520.], [720., 180.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                A.setMatrix$int$int$int_A$Jama_Matrix(0, 0, [0, 1], C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_setMatrix_int_int_int_A_Jama_Matrix averageTime = ${ave}us`);
            expect(A.getArray()[0][1]).assertEqual(array2[0][1]);
        });
        runFunc('Matrix_setMatrix_int_int_int_A_Jama_Matrix03', 0, () => {
            let sumAve = 0;
            let A: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                array = [[13., 32., 3], [4., 5., 61.]];
                array2 = [[23., 3., 30], [2., 31., 31.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                A.setMatrix$int$int$int_A$Jama_Matrix(0, 0, [0, 0], C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_setMatrix_int_int_int_A_Jama_Matrix averageTime = ${ave}us`);
            expect(A.getArray()[1][1]).assertEqual(5);
        });
        runFunc('Matrix_setMatrix_int_int_int_A_Jama_Matrix04', 0, () => {
            let sumAve = 0;
            let A: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 9; i++) {
                let s = new Date().getTime();
                array = [[113., 32., 513], [14., 152., 161.]];
                array2 = [[452., 13., 330], [21., 321., 1211.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                A.setMatrix$int$int$int_A$Jama_Matrix(0, 1, [1, 1], C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_setMatrix_int_int_int_A_Jama_Matrix averageTime = ${ave}us`);
            expect(A.getArray()[1][1]).assertEqual(321);
        });
        runFunc('Matrix_transpose01', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                array = [[1., 2., 3], [4., 5., 6.], [7., 8., 10.]];
                A = new Matrix(array);
                B = A.transpose();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_transpose averageTime = ${ave}us`);
            expect(B.getArray()[0][1]).assertEqual(A.getArray()[1][0]);
        });
        runFunc('Matrix_transpose02', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 99; i++) {
                let s = new Date().getTime();
                array = [[24., 35., 116.], [137., 38., 310.]];
                A = new Matrix(array);
                B = A.transpose();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_transpose averageTime = ${ave}us`);
            expect(B.getArray()[1][1]).assertEqual(A.getArray()[1][1]);
        });
        runFunc('Matrix_transpose03', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                array = [[135., 22., 23], [14., 52., 36.], [71., 38., 123.]];
                A = new Matrix(array);
                B = A.transpose();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_transpose averageTime = ${ave}us`);
            expect(JSON.stringify(B)).assertEqual('{"A":[[135,14,71],[22,52,38],[23,36,123]],"m":3,"n":3}');
        });
        runFunc('Matrix_transpose04', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                array = [[6., 34., 134], [134., 34., 645.]];
                A = new Matrix(array);
                B = A.transpose();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_transpose averageTime = ${ave}us`);
            expect(JSON.stringify(B)).assertEqual('{"A":[[6,134],[34,34],[134,645]],"m":3,"n":2}');
        });
        runFunc('Matrix_norm101', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                array = [[1., 2., 3], [4., 5., 6.], [7., 8., 10.]];
                A = new Matrix(array);
                B = A.norm1();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_norm1 averageTime = ${ave}us`);
            expect(B).assertEqual(19);
        });
        runFunc('Matrix_norm102', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 70; i++) {
                let s = new Date().getTime();
                array = [[37., 18., 910.]];
                A = new Matrix(array);
                B = A.norm1();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_norm1 averageTime = ${ave}us`);
            expect(B).assertEqual(910);
        });
        runFunc('Matrix_norm103', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                array = [[111., 21., 33], [43., 35., 46.], [76., 83., 120.]];
                A = new Matrix(array);
                B = A.norm1();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_norm1 averageTime = ${ave}us`);
            expect(B).assertEqual(230);
        });
        runFunc('Matrix_norm104', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                array = [[43., 135., 3.], [716., 183., 9.]];
                A = new Matrix(array);
                B = A.norm1();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_norm1 averageTime = ${ave}us`);
            expect(B).assertEqual(759);
        });
    });
}
