let __generate__Id: number = 0;
function generateId(): string {
    return "JamaTest5.test_" + ++__generate__Id;
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
export default function JamaTest05() {
    describe('JamaTest05', () => {
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
        runFunc('Matrix_norm201', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 50; i++) {
                array = [[1., 2., 3], [4., 5., 6.], [7., 8., 10.]];
                A = new Matrix(array);
                let s = new Date().getTime();
                B = A.norm2();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_norm2 averageTime = ${ave}us`);
            expect(B).assertEqual(17.412505166808597);
        });
        runFunc('Matrix_norm202', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 50; i++) {
                array = [[154., 42., 354], [73., 83., 130.]];
                A = new Matrix(array);
                let s = new Date().getTime();
                B = A.norm2();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_norm2 averageTime = ${ave}us`);
            expect(B).assertEqual(419.44250652956214);
        });
        runFunc('Matrix_norm203', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 32; i++) {
                array = [[122., 22., 23], [4., 5., 62.], [2., 28., 110.]];
                A = new Matrix(array);
                let s = new Date().getTime();
                B = A.norm2();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_norm2 averageTime = ${ave}us`);
            expect(B).assertEqual(142.31905056441016);
        });
        runFunc('Matrix_norm204', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 10; i++) {
                array = [[32., 21., 22], [2., 28., 143.]];
                A = new Matrix(array);
                let s = new Date().getTime();
                B = A.norm2();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_norm2 averageTime = ${ave}us`);
            expect(B).assertEqual(148.18204586425705);
        });
        runFunc('Matrix_normInf01', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                array = [[1., 2., 3], [4., 5., 6.], [7., 8., 10.]];
                A = new Matrix(array);
                B = A.normInf();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_normInf averageTime = ${ave}us`);
            expect(B).assertEqual(25);
        });
        runFunc('Matrix_normInf02', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 60; i++) {
                let s = new Date().getTime();
                array = [[77., 218., 110.]];
                A = new Matrix(array);
                B = A.normInf();
                let e = new Date().getTime();
                sumAve += (e - s) * 3000;
            }
            let ave = sumAve / 60;
            console.log(`jama:Matrix_normInf averageTime = ${ave}us`);
            expect(B).assertEqual(405);
        });
        runFunc('Matrix_normInf03', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 4; i++) {
                let s = new Date().getTime();
                array = [[31., 52., 35], [4., 55., 36.], [71., 83., 140.]];
                A = new Matrix(array);
                B = A.normInf();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_normInf averageTime = ${ave}us`);
            expect(B).assertEqual(294);
        });
        runFunc('Matrix_normInf04', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 7; i++) {
                let s = new Date().getTime();
                array = [[31., 52., 22], [3., 83., 1.]];
                A = new Matrix(array);
                B = A.normInf();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_normInf averageTime = ${ave}us`);
            expect(B).assertEqual(105);
        });
        runFunc('Matrix_normF01', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                array = [[1., 2., 3], [4., 5., 6.], [7., 8., 10.]];
                A = new Matrix(array);
                B = A.normF();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_normF averageTime = ${ave}us`);
            expect(B).assertEqual(17.435595774162696);
        });
        runFunc('Matrix_normF02', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 23; i++) {
                let s = new Date().getTime();
                array = [[443., 75.], [47., 843.]];
                A = new Matrix(array);
                B = A.normF();
                let e = new Date().getTime();
                sumAve += (e - s) * 5000;
            }
            let ave = sumAve / 23;
            console.log(`jama:Matrix_normF averageTime = ${ave}us`);
            expect(B).assertEqual(956.4162273822001);
        });
        runFunc('Matrix_normF03', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 35; i++) {
                let s = new Date().getTime();
                array = [[32., 22., 13], [42., 5., 16.], [27., 28., 160.]];
                A = new Matrix(array);
                B = A.normF();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_normF averageTime = ${ave}us`);
            expect(B).assertEqual(175.59897494006051);
        });
        runFunc('Matrix_normF04', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 9; i++) {
                let s = new Date().getTime();
                array = [[13., 22., 30], [3., 28., 3.]];
                A = new Matrix(array);
                B = A.normF();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_normF averageTime = ${ave}us`);
            expect(B).assertEqual(48.52834223420372);
        });
        runFunc('Matrix_uminus01', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                array = [[1., 2., 3], [4., 5., 6.], [7., 8., 10.]];
                A = new Matrix(array);
                B = A.uminus();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_uminus averageTime = ${ave}us`);
            expect(B.getArray()[0][0]).assertEqual(-1);
        });
        runFunc('Matrix_uminus02', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 88; i++) {
                let s = new Date().getTime();
                array = [[324., 35., 326.], [7., 38., 310.]];
                A = new Matrix(array);
                B = A.uminus();
                let e = new Date().getTime();
                sumAve += (e - s) * 6700;
            }
            let ave = sumAve / 88;
            console.log(`jama:Matrix_uminus averageTime = ${ave}us`);
            expect(B.getArray()[0][2]).assertEqual(-326);
        });
        runFunc('Matrix_uminus03', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 56; i++) {
                let s = new Date().getTime();
                array = [[43., 22., 43], [44., 53., 64.], [17., 18., 163.]];
                A = new Matrix(array);
                B = A.uminus();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_uminus averageTime = ${ave}us`);
            expect(B.getArray()[2][0]).assertEqual(-17);
        });
        runFunc('Matrix_uminus04', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 41; i++) {
                let s = new Date().getTime();
                array = [[7., 24., 423], [424., 253., 164.]];
                A = new Matrix(array);
                B = A.uminus();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_uminus averageTime = ${ave}us`);
            expect(JSON.stringify(B)).assertEqual('{"A":[[-7,-24,-423],[-424,-253,-164]],"m":2,"n":3}');
        });
        runFunc('Matrix_plus01', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][] = [];
            let array2: number[][] = [];
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                array = [[1., 2., 3], [4., 5., 6.], [7., 8., 10.]];
                array2 = [[2., 2., 3], [4., 5., 6.], [7., 8., 10.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                B = A.plus(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_plus averageTime = ${ave}us`);
            expect(B.getArray()[0][0]).assertEqual(array[0][0] + array2[0][0]);
        });
        runFunc('Matrix_plus02', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][] = [];
            let array2: number[][] = [];
            for (let i = 0; i < 70; i++) {
                let s = new Date().getTime();
                array = [[14., 35., 36.], [74., 48., 410.]];
                array2 = [[223., 112., 313], [43., 54., 62.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                B = A.plus(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 7000;
            }
            let ave = sumAve / 70;
            console.log(`jama:Matrix_plus averageTime = ${ave}us`);
            expect(B.getArray()[0][1]).assertEqual(array[0][1] + array2[0][1]);
        });
        runFunc('Matrix_plus03', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 30; i++) {
                let s = new Date().getTime();
                array = [[11., 123., 33], [14., 15., 16.], [71., 82., 21.]];
                array2 = [[21., 12., 303], [40., 51., 26.], [72., 28., 34.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                B = A.plus(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_plus averageTime = ${ave}us`);
            expect(JSON.stringify(B)).assertEqual('{"A":[[32,135,336],[54,66,42],[143,110,55]],"m":3,"n":3}');
        });
        runFunc('Matrix_plus04', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 31; i++) {
                let s = new Date().getTime();
                array = [[14., 21., 16.], [71., 1., 121.]];
                array2 = [[420., 51., 1.], [43., 28., 134.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                B = A.plus(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_plus averageTime = ${ave}us`);
            expect(JSON.stringify(B)).assertEqual('{"A":[[434,72,17],[114,29,255]],"m":2,"n":3}');
        });
    });
}
