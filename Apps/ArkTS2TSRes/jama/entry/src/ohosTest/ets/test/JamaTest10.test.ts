let __generate__Id: number = 0;
function generateId(): string {
    return "JamaTest10.test_" + ++__generate__Id;
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
export default function JamaTest10() {
    describe('JamaTest10', () => {
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
        runFunc('Matrix_inverse01', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 50; i++) {
                array = [[1., 2., 3], [4., 5., 6.], [7., 8., 10.]];
                array2 = [[2., 2., 3], [4., 5., 6.], [7., 8., 10.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                let s = new Date().getTime();
                B = A.inverse();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_inverse averageTime = ${ave}us`);
            expect(B.getArray()[0][0]).assertEqual(-0.6666666666666661);
        });
        runFunc('Matrix_inverse02', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 77; i++) {
                array = [[113., 23., 33], [214., 25., 116.], [457., 83., 103.]];
                array2 = [[21., 131., 43], [21., 215., 6.], [57., 84., 310.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                let s = new Date().getTime();
                B = A.inverse();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_inverse averageTime = ${ave}us`);
            expect(B.getArray()[0][2]).assertEqual(0.014810112341492432);
        });
        runFunc('Matrix_inverse03', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 50; i++) {
                array = [[1., 2., 3], [4., 5., 6.], [7., 8., 10.]];
                A = new Matrix(array);
                let s = new Date().getTime();
                B = A.inverse();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_inverse averageTime = ${ave}us`);
            expect(B.getArray()[0][1]).assertEqual(-1.3333333333333337);
        });
        runFunc('Matrix_inverse04', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 77; i++) {
                array = [[113., 23., 33], [214., 25., 116.], [457., 83., 103.]];
                A = new Matrix(array);
                let s = new Date().getTime();
                B = A.inverse();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_inverse averageTime = ${ave}us`);
            expect(B.getArray()[2][1]).assertEqual(0.00909660725478536);
        });
        runFunc('Matrix_det01', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                array = [[1., 2., 3], [4., 5., 6.], [7., 8., 10.]];
                A = new Matrix(array);
                B = A.det();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_det averageTime = ${ave}us`);
            expect(B).assertEqual(-3);
        });
        runFunc('Matrix_det02', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 88; i++) {
                let s = new Date().getTime();
                array = [[114., 325., 416.], [32., 33., 110.], [132., 333., 10.]];
                A = new Matrix(array);
                B = A.det();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_det averageTime = ${ave}us`);
            expect(B).assertEqual(3097600);
        });
        runFunc('Matrix_det03', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 25; i++) {
                let s = new Date().getTime();
                array = [[51., 2., 3], [47., 7., 76.], [75., 54., 67.]];
                A = new Matrix(array);
                B = A.det();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_det averageTime = ${ave}us`);
            expect(B).assertEqual(-174244);
        });
        runFunc('Matrix_det04', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 86; i++) {
                let s = new Date().getTime();
                array = [[6., 2., 3], [0., 7., 76.], [1., 1., 0.]];
                A = new Matrix(array);
                B = A.det();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_det averageTime = ${ave}us`);
            expect(B).assertEqual(-325.00000000000006);
        });
        runFunc('Matrix_rank01', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 50; i++) {
                array = [[1., 2., 3], [4., 5., 6.], [7., 8., 10.]];
                array2 = [[2., 2., 3], [4., 5., 6.], [7., 8., 10.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                let s = new Date().getTime();
                B = A.rank();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_rank averageTime = ${ave}us`);
            expect(B).assertEqual(3);
        });
        runFunc('Matrix_rank02', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 9; i++) {
                array = [[112., 52., 53], [7., 38., 310.]];
                array2 = [[432., 27., 53], [7., 58., 10.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                let s = new Date().getTime();
                B = A.rank();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_rank averageTime = ${ave}us`);
            expect(B).assertEqual(2);
        });
        runFunc('Matrix_rank03', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 156; i++) {
                array = [[18., 0., 8], [44., 0., 62.], [13., 58., 1.]];
                A = new Matrix(array);
                let s = new Date().getTime();
                B = A.rank();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_rank averageTime = ${ave}us`);
            expect(B).assertEqual(3);
        });
        runFunc('Matrix_rank04', 0, () => {
            let array = [[6., 78., 9], [5., 3., 31.]];
            let A = new Matrix(array);
            let B = A.rank();
            expect(B).assertEqual(2);
        });
        runFunc('Matrix_cond01', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 50; i++) {
                array = [[1., 2., 3], [4., 5., 6.], [7., 8., 10.]];
                array2 = [[2., 2., 3], [4., 5., 6.], [7., 8., 10.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                let s = new Date().getTime();
                B = A.cond();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_cond averageTime = ${ave}us`);
            expect(B).assertEqual(88.4482799206987);
        });
        runFunc('Matrix_cond02', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 3; i++) {
                array = [[137., 248., 10.]];
                array2 = [[37., 438., 231.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                let s = new Date().getTime();
                B = A.cond();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_cond averageTime = ${ave}us`);
            expect(B).assertEqual(1);
        });
        runFunc('Matrix_cond03', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 18; i++) {
                array = [[0., 2., 89], [4., 56., 116.], [234., 63., 10.]];
                A = new Matrix(array);
                let s = new Date().getTime();
                B = A.cond();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_cond averageTime = ${ave}us`);
            expect(B).assertEqual(8.271591525255658);
        });
        runFunc('Matrix_cond04', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 29; i++) {
                array = [[2., 2., 3], [12., 5., 1.], [127., 8., 2.]];
                A = new Matrix(array);
                let s = new Date().getTime();
                B = A.cond();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_cond averageTime = ${ave}us`);
            expect(B).assertEqual(59.29729915561755);
        });
        runFunc('Matrix_trace01', 0, () => {
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
                B = A.trace();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_trace averageTime = ${ave}us`);
            expect(B).assertEqual(16);
        });
        runFunc('Matrix_trace02', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 67; i++) {
                let s = new Date().getTime();
                array = [[321., 128., 310.]];
                A = new Matrix(array);
                B = A.trace();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_trace averageTime = ${ave}us`);
            expect(B).assertEqual(321);
        });
        runFunc('Matrix_trace03', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 88; i++) {
                let s = new Date().getTime();
                array = [[86., 72., 56], [47., 76., 16.], [6., 45., 4.]];
                A = new Matrix(array);
                B = A.trace();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_trace averageTime = ${ave}us`);
            expect(B).assertEqual(166);
        });
        runFunc('Matrix_trace04', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 36; i++) {
                let s = new Date().getTime();
                array = [[86., 72., 56], [232., 0., 23.], [69., 145., 14.]];
                A = new Matrix(array);
                B = A.trace();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_trace averageTime = ${ave}us`);
            expect(B).assertEqual(100);
        });
        runFunc('Matrix_random01', 0, () => {
            let B: any;
            B = Matrix.random(3, 3);
            expect(B.getArray()).not().assertUndefined();
        });
        runFunc('Matrix_random02', 0, () => {
            let A: Matrix = new Matrix(3, 1);
            let random = Matrix.random(3, 1);
            expect(A.getArray()[0][0]).assertEqual(0);
            expect(random).assertEqual(random);
        });
        runFunc('Matrix_random03', 0, () => {
            let A: Matrix = new Matrix(2, 34);
            let random = Matrix.random(6, 65);
            expect(A.getArray()[0][1]).assertEqual(0);
            expect(JSON.stringify(random[1])).assertUndefined();
        });
        runFunc('Matrix_random04', 0, () => {
            let B = Matrix.random(17, 7);
            expect(B.getArray()).not().assertUndefined();
        });
        runFunc('Matrix_identrunFuncy01', 0, () => {
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
                B = Matrix.identity(3, 3);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_identrunFuncy averageTime = ${ave}us`);
            expect(B.getArray()).not().assertUndefined();
        });
        runFunc('Matrix_identrunFuncy02', 0, () => {
            let B: any;
            B = Matrix.identity(3, 3);
            expect(B.getArray()[0][1]).assertEqual(0);
        });
        runFunc('Matrix_identrunFuncy03', 0, () => {
            let sumAve = 0;
            let B: any;
            for (let i = 0; i < 26; i++) {
                let s = new Date().getTime();
                B = Matrix.identity(8, 33);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_identrunFuncy averageTime = ${ave}us`);
            expect(B.getArray()[1][1]).assertEqual(1);
        });
        runFunc('Matrix_identrunFuncy04', 0, () => {
            let B: any;
            B = Matrix.identity(2, 1);
            expect(B.getArray()[0][1]).assertUndefined();
        });
    });
}
