let __generate__Id: number = 0;
function generateId(): string {
    return "JamaTest9.test_" + ++__generate__Id;
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
export default function JamaTest09() {
    describe('JamaTest09', () => {
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
        runFunc('Matrix_chol01', 0, () => {
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
                B = A.chol();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_chol averageTime = ${ave}us`);
            expect(B.getL().getArray()[0][0]).assertEqual(1);
            expect(B.isSPD()).assertFalse();
        });
        runFunc('Matrix_chol02', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 9; i++) {
                let s = new Date().getTime();
                array = [[234., 45., 64.], [37., 228., 410.]];
                array2 = [[43., 425., 16.], [17., 8., 140.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                B = A.chol();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_chol averageTime = ${ave}us`);
            expect(B.getL().getArray()[0][0]).assertEqual(15.297058540778355);
            expect(B.isSPD()).assertFalse();
        });
        runFunc('Matrix_chol03', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 15; i++) {
                let s = new Date().getTime();
                array = [[16., 34., 23], [4., 53., 6.], [37., 38., 10.]];
                A = new Matrix(array);
                B = A.chol();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_chol averageTime = ${ave}us`);
            expect(JSON.stringify(B)).assertEqual('{"L":[[4,0,0],[1,7.211102550927978,0],[9.25,3.9869076603688347,0]],"n":3,"isspd":false}');
        });
        runFunc('Matrix_chol04', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 29; i++) {
                let s = new Date().getTime();
                array = [[8., 32., 1.], [96., 1., 6.]];
                A = new Matrix(array);
                B = A.chol();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_chol averageTime = ${ave}us`);
            expect(B.getL().getArray()[0][1]).assertEqual(0);
        });
        runFunc('Matrix_svd01', 0, () => {
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
                B = A.svd();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_svd averageTime = ${ave}us`);
            let strU1 = (B.getU().getArray()[0][0] + '').substring(0, 10);
            let strU2 = ('0.20933734352577416').substring(0, 10);
            expect(strU1).assertEqual(strU2);
            expect(B.getV().getArray()[0][0]).assertEqual(0.4646675467797495);
            expect(B.getS().getArray()[0][0]).assertEqual(17.412505166808597);
        });
        runFunc('Matrix_svd02', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 57; i++) {
                array = [[113., 232., 33], [32., 514., 32.], [37., 318., 110.]];
                A = new Matrix(array);
                let s = new Date().getTime();
                B = A.svd();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_svd averageTime = ${ave}us`);
            let strU1 = (B.getU().getArray()[0][1] + '').substring(0, 10);
            let strU2 = ('-0.8283885').substring(0, 10);
            let strV1 = (B.getV().getArray()[0][2] + '').substring(0, 10);
            let strV2 = ('-0.3681405').substring(0, 10);
            let strS1 = (B.getS().getArray()[0][0] + '').substring(0, 10);
            let strS2 = ('659.417411').substring(0, 10);
            expect(strU1).assertEqual(strU2);
            expect(strV1).assertEqual(strV2);
            expect(strS1).assertEqual(strS2);
            expect(B.getV().getArray()[1][0]).assertEqual(0.9814619546238601);
            expect(B.getS().getArray()[0][2]).assertEqual(0);
        });
        runFunc('Matrix_svd03', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 19; i++) {
                array = [[12., 43., 3], [4., 51., 6.], [7., 138., 45.]];
                A = new Matrix(array);
                let s = new Date().getTime();
                B = A.svd();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_svd averageTime = ${ave}us`);
            expect(B.getV().getArray()[0][1]).assertEqual(-0.552493865189014);
            expect(B.getS().getArray()[0][1]).assertEqual(0);
        });
        runFunc('Matrix_svd04', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 19; i++) {
                array = [[12., 43., 3], [4., 51., 6.], [7., 138., 45.]];
                A = new Matrix(array);
                let s = new Date().getTime();
                B = A.svd();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_svd averageTime = ${ave}us`);
            expect(B.getV().getArray()[1][1]).assertEqual(-0.19176624901723016);
            expect(B.getS().getArray()[1][1]).assertEqual(15.608711152852086);
        });
        runFunc('Matrix_eig01', 0, () => {
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
                B = A.eig();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_eig averageTime = ${ave}us`);
            expect(B.getD().getArray()[0][0]).assertEqual(16.707493316124744);
            expect(B.getV().getArray()[0][0]).assertEqual(0.2235133577278517);
        });
        runFunc('Matrix_eig02', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 65; i++) {
                array = [[124., 52., 6.], [73., 83., 102.], [173., 32., 3.]];
                array2 = [[32., 532., 26.], [237., 8., 210.], [273., 383., 21.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                let s = new Date().getTime();
                B = A.eig();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_eig averageTime = ${ave}us`);
            expect(B.getD().getArray()[1][0]).assertEqual(0);
            expect(B.getV().getArray()[0][1]).assertEqual(-0.6061854035175558);
        });
        runFunc('Matrix_eig03', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 18; i++) {
                array = [[1., 52., 6.], [73., 83., 10.], [11., 32., 3.]];
                A = new Matrix(array);
                let s = new Date().getTime();
                B = A.eig();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_eig averageTime = ${ave}us`);
            expect(B.getD().getArray()[2][0]).assertEqual(0);
        });
        runFunc('Matrix_eig04', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 18; i++) {
                array = [[16., 24., 26.], [2., 45., 10.], [5., 8., 13.]];
                A = new Matrix(array);
                let s = new Date().getTime();
                B = A.eig();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_eig averageTime = ${ave}us`);
            expect(B.getV().getArray()[2][2]).assertEqual(-0.29809259984593784);
        });
        runFunc('Matrix_solve01', 0, () => {
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
                B = A.solve(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_solve averageTime = ${ave}us`);
            expect(B.getArray()[0][0]).assertEqual(0.3333333333333339);
        });
        runFunc('Matrix_solve02', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 3; i++) {
                let s = new Date().getTime();
                array = [[12., 43., 3], [4., 435., 6.], [43., 328., 110.]];
                array2 = [[32., 2., 33], [34., 35., 43.], [21., 8., 31.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                B = A.solve(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_solve averageTime = ${ave}us`);
            expect(B.getArray()[0][1]).assertEqual(-0.09727689118368307);
        });
        runFunc('Matrix_solve03', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 19; i++) {
                let s = new Date().getTime();
                array = [[12., 12., 3], [4., 42., 6.], [34., 34., 10.]];
                array2 = [[34., 2., 23], [41., 51., 26.], [4., 8., 42.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                B = A.solve(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_solve averageTime = ${ave}us`);
            expect(JSON.stringify(B)).assertEqual('{"A":[[9.34210526315789,-1.342105263157895,3.2631578947368403],[8.880116959064322,1.1198830409356728,2.5146198830409343],[-61.555555555555515,1.555555555555555,-15.444444444444434]],"m":3,"n":3}');
        });
        runFunc('Matrix_solve04', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 3; i++) {
                let s = new Date().getTime();
                array = [[12., 43., 3], [4., 435., 6.], [43., 328., 110.]];
                array2 = [[32., 2., 33], [34., 35., 43.], [21., 8., 31.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                B = A.solve(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_solve averageTime = ${ave}us`);
            expect(B.getArray()[1][1]).assertEqual(0.0832506079550898);
            expect(B.getArray()[2][1]).assertEqual(-0.1374844826215553);
        });
        runFunc('Matrix_solveTranspose01', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 50; i++) {
                array = [[321., 132., 3], [41., 5., 63.], [7., 34., 190.]];
                array2 = [[2., 32., 3], [41., 532., 36.], [73., 538., 910.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                let s = new Date().getTime();
                B = A.solveTranspose(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_solveTranspose averageTime = ${ave}us`);
            expect(B.getArray()[0][0]).assertEqual(0.17312102789289516);
        });
        runFunc('Matrix_solveTranspose02', 0, () => {
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
                B = A.solveTranspose(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_solveTranspose averageTime = ${ave}us`);
            expect(B.getArray()[0][0]).assertEqual(0.3333333333333333);
        });
        runFunc('Matrix_solveTranspose03', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 50; i++) {
                array = [[3., 132., 3], [41., 5., 63.], [7., 34., 0.]];
                array2 = [[2., 32., 3], [41., 7., 36.], [73., 56., 9.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                let s = new Date().getTime();
                B = A.solveTranspose(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_solveTranspose averageTime = ${ave}us`);
            expect(B.getArray()[0][1]).assertEqual(-0.6410504269373288);
        });
        runFunc('Matrix_solveTranspose04', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 50; i++) {
                array = [[3., 78., 553], [431., 5., 635.], [7., 34., 90.]];
                array2 = [[267., 32., 3], [41., 7., 36.], [73., 56., 49.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                let s = new Date().getTime();
                B = A.solveTranspose(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_solveTranspose averageTime = ${ave}us`);
            expect(B.getArray()[1][1]).assertEqual(0.0887010558076158);
        });
    });
}
