let __generate__Id: number = 0;
function generateId(): string {
    return "JamaTest6.test_" + ++__generate__Id;
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
export default function JamaTest06() {
    describe('JamaTest06', () => {
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
        runFunc('Matrix_plusEquals01', 0, () => {
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
                B = A.plusEquals(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_plusEquals averageTime = ${ave}us`);
            expect(B.getArray()[0][0]).assertEqual(A.getArray()[0][0]);
            expect(B.getArray()[0][0]).assertEqual(3);
        });
        runFunc('Matrix_plusEquals02', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 90; i++) {
                let s = new Date().getTime();
                array = [[71., 38., 344.]];
                array2 = [[117., 84., 230.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                B = A.plusEquals(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 2000;
            }
            let ave = sumAve / 90;
            console.log(`jama:Matrix_plusEquals averageTime = ${ave}us`);
            expect(B.getArray()[0][1]).assertEqual(A.getArray()[0][1]);
            expect(B.getArray()[0][0]).assertEqual(188);
        });
        runFunc('Matrix_plusEquals03', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 20; i++) {
                let s = new Date().getTime();
                array = [[131., 112., 13], [4., 51., 6.], [7., 83., 130.]];
                array2 = [[2., 12., 33], [4., 51., 36.], [37., 8., 310.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                B = A.plusEquals(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_plusEquals averageTime = ${ave}us`);
            expect(JSON.stringify(B)).assertEqual('{"A":[[133,124,46],[8,102,42],[44,91,440]],"m":3,"n":3}');
        });
        runFunc('Matrix_plusEquals04', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 10; i++) {
                let s = new Date().getTime();
                array = [[23., 4., 13], [7., 183., 130.]];
                array2 = [[2., 12., 9], [37., 34., 5.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                B = A.plusEquals(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_plusEquals averageTime = ${ave}us`);
            expect(JSON.stringify(B)).assertEqual('{"A":[[25,16,22],[44,217,135]],"m":2,"n":3}');
        });
        runFunc('Matrix_minus01', 0, () => {
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
                B = A.minus(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_minus averageTime = ${ave}us`);
            expect(B.getArray()[0][0]).assertEqual(-1);
        });
        runFunc('Matrix_minus02', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 70; i++) {
                let s = new Date().getTime();
                array = [[227., 118., 120.], [11., 351., 43.]];
                array2 = [[12., 22., 233], [73., 18., 130.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                B = A.minus(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 5000;
            }
            let ave = sumAve / 70;
            console.log(`jama:Matrix_minus averageTime = ${ave}us`);
            expect(B.getArray()[0][1]).assertEqual(96);
        });
        runFunc('Matrix_minus03', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 90; i++) {
                let s = new Date().getTime();
                array = [[11., 221., 3], [45., 15., 326.], [7., 8., 110.]];
                array2 = [[232., 22., 32], [4., 15., 63.], [73., 8., 170.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                B = A.minus(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_minus averageTime = ${ave}us`);
            expect(B.getArray()[2][0]).assertEqual(-66);
        });
        runFunc('Matrix_minus04', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 54; i++) {
                let s = new Date().getTime();
                array = [[11., 8., 23], [45., 15., 7.]];
                array2 = [[33., 22., 332], [442., 123., 163.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                B = A.minus(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_minus averageTime = ${ave}us`);
            expect(B.getArray()[1][2]).assertEqual(-156);
        });
        runFunc('Matrix_minusEquals01', 0, () => {
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
                B = A.minusEquals(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_minusEquals averageTime = ${ave}us`);
            expect(B.getArray()[0][0]).assertEqual(A.getArray()[0][0]);
            expect(B.getArray()[0][0]).assertEqual(-1);
        });
        runFunc('Matrix_minusEquals02', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 90; i++) {
                let s = new Date().getTime();
                array = [[732., 138., 130.]];
                array2 = [[27., 38., 310.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                B = A.minusEquals(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 900;
            }
            let ave = sumAve / 90;
            console.log(`jama:Matrix_minusEquals averageTime = ${ave}us`);
            expect(B.getArray()[0][2]).assertEqual(A.getArray()[0][2]);
            expect(B.getArray()[0][1]).assertEqual(100);
        });
        runFunc('Matrix_minusEquals03', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 60; i++) {
                let s = new Date().getTime();
                array = [[11., 32., 33], [4., 15., 6.], [7., 34., 210.]];
                array2 = [[32., 132., 43], [4., 51., 61.], [7., 18., 410.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                B = A.minusEquals(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_minusEquals averageTime = ${ave}us`);
            expect(B.getArray()[2][1]).assertEqual(16);
        });
        runFunc('Matrix_minusEquals04', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 45; i++) {
                let s = new Date().getTime();
                array = [[112., 32., 5], [27., 34., 254.]];
                array2 = [[232., 2., 1], [42., 9., 4.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                B = A.minusEquals(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_minusEquals averageTime = ${ave}us`);
            expect(B.getArray()[0][2]).assertEqual(4);
        });
        runFunc('Matrix_arrayTimes01', 0, () => {
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
                B = A.arrayTimes(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_arrayTimes averageTime = ${ave}us`);
            expect(B.getArray()[0][0]).assertEqual(2);
        });
        runFunc('Matrix_arrayTimes02', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 30; i++) {
                let s = new Date().getTime();
                array = [[324., 5., 36.], [37., 28., 120.]];
                array2 = [[332., 32., 3], [327., 82., 120.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                B = A.arrayTimes(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 4000;
            }
            let ave = sumAve / 30;
            console.log(`jama:Matrix_arrayTimes averageTime = ${ave}us`);
            expect(B.getArray()[0][0]).assertEqual(107568);
        });
        runFunc('Matrix_arrayTimes03', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 30; i++) {
                let s = new Date().getTime();
                array = [[13., 2., 33], [4., 53., 63.], [71., 31., 31.]];
                array2 = [[23., 32., 33], [8., 35., 31.], [17., 83., 140.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                B = A.arrayTimes(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_arrayTimes averageTime = ${ave}us`);
            expect(B.getArray()[1][0]).assertEqual(32);
        });
        runFunc('Matrix_arrayTimes04', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 10; i++) {
                let s = new Date().getTime();
                array = [[13., 2., 4], [71., 0., 40.]];
                array2 = [[4., 32., 43], [43., 1., 1.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                B = A.arrayTimes(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_arrayTimes averageTime = ${ave}us`);
            expect(B.getArray()[0][0]).assertEqual(52);
        });
        runFunc('Matrix_arrayTimesEquals01', 0, () => {
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
                B = A.arrayTimesEquals(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_arrayTimesEquals averageTime = ${ave}us`);
            expect(B.getArray()[0][0]).assertEqual(2);
        });
        runFunc('Matrix_arrayTimesEquals02', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 110; i++) {
                let s = new Date().getTime();
                array = [[34., 35., 6.], [75., 38., 140.]];
                array2 = [[34., 545., 6.], [7., 58., 105.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                B = A.arrayTimesEquals(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 5000;
            }
            let ave = sumAve / 110;
            console.log(`jama:Matrix_arrayTimesEquals averageTime = ${ave}us`);
            expect(B.getArray()[0][1]).assertEqual(19075);
        });
        runFunc('Matrix_arrayTimesEquals03', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 60; i++) {
                let s = new Date().getTime();
                array = [[12., 34., 123], [94., 5., 42.], [125., 82., 10.]];
                array2 = [[42., 12., 23], [14., 425., 2.], [17., 87., 160.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                B = A.arrayTimesEquals(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_arrayTimesEquals averageTime = ${ave}us`);
            expect(JSON.stringify(B)).assertEqual('{"A":[[504,408,2829],[1316,2125,84],[2125,7134,1600]],"m":3,"n":3}');
        });
        runFunc('Matrix_arrayTimesEquals04', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 66; i++) {
                let s = new Date().getTime();
                array = [[1., 34., 1], [920., 45., 10.]];
                array2 = [[134., 12., 54], [17., 3., 2.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                B = A.arrayTimesEquals(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_arrayTimesEquals averageTime = ${ave}us`);
            expect(JSON.stringify(B)).assertEqual('{"A":[[134,408,54],[15640,135,20]],"m":2,"n":3}');
        });
    });
}
