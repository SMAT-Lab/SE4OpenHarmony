let __generate__Id: number = 0;
function generateId(): string {
    return "JamaTest7.test_" + ++__generate__Id;
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
export default function JamaTest07() {
    describe('JamaTest07', () => {
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
        runFunc('Matrix_arrayRightDivide01', 0, () => {
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
                B = A.arrayRightDivide(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_arrayRightDivide averageTime = ${ave}us`);
            expect(B.getArray()[0][0]).assertEqual(0.5);
        });
        runFunc('Matrix_arrayRightDivide02', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 22; i++) {
                let s = new Date().getTime();
                array = [[57., 88., 190.]];
                array2 = [[71., 8., 210.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                B = A.arrayRightDivide(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_arrayRightDivide averageTime = ${ave}us`);
            expect(B.getArray()[0][2]).assertEqual(0.9047619047619048);
        });
        runFunc('Matrix_arrayRightDivide03', 0, () => {
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
                B = A.arrayRightDivide(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_arrayRightDivide averageTime = ${ave}us`);
            expect(B.getArray()[1][2]).assertEqual(1);
        });
        runFunc('Matrix_arrayRightDivide03', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 30; i++) {
                let s = new Date().getTime();
                array = [[43., 22., 43], [244., 5., 16.], [73., 318., 110.]];
                array2 = [[214., 2., 31], [4., 534., 6.], [71., 138., 110.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                B = A.arrayRightDivide(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_arrayRightDivide averageTime = ${ave}us`);
            expect(JSON.stringify(B)).assertEqual('{"A":[[0.20093457943925232,11,1.3870967741935485],[61,0.009363295880149813,2.6666666666666665],[1.028169014084507,2.3043478260869565,1]],"m":3,"n":3}');
        });
        runFunc('Matrix_arrayRightDivide04', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 10; i++) {
                let s = new Date().getTime();
                array = [[6., 22., 56], [87., 5., 16.], [73., 8., 775.]];
                array2 = [[97., 2., 31], [46., 1., 65.], [71., 58., 0.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                B = A.arrayRightDivide(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_arrayRightDivide averageTime = ${ave}us`);
            expect(B.getArray()[1][1]).assertEqual(5);
        });
        runFunc('Matrix_arrayRightDivideEquals01', 0, () => {
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
                B = A.arrayRightDivideEquals(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_arrayRightDivideEquals averageTime = ${ave}us`);
            expect(B.getArray()[0][0]).assertEqual(0.5);
        });
        runFunc('Matrix_arrayRightDivideEquals02', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 90; i++) {
                let s = new Date().getTime();
                array = [[34., 315., 61.], [117., 82., 310.]];
                array2 = [[41., 35., 116.], [217., 8., 110.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                B = A.arrayRightDivideEquals(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_arrayRightDivideEquals averageTime = ${ave}us`);
            expect(B.getArray()[1][0]).assertEqual(0.5391705069124424);
        });
        runFunc('Matrix_arrayRightDivideEquals03', 0, () => {
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
                B = A.arrayRightDivideEquals(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_arrayRightDivideEquals averageTime = ${ave}us`);
            expect(JSON.stringify(B)).assertEqual('{"A":[[0.5,1,1],[1,1,1],[1,1,1]],"m":3,"n":3}');
        });
        runFunc('Matrix_arrayRightDivideEquals04', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 20; i++) {
                let s = new Date().getTime();
                array = [[34., 315., 61.], [117., 82., 310.]];
                array2 = [[41., 35., 116.], [217., 8., 110.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                B = A.arrayRightDivideEquals(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_arrayRightDivideEquals averageTime = ${ave}us`);
            expect(B.getArray()[1][1]).assertEqual(10.25);
        });
        runFunc('Matrix_arrayLeftDivide01', 0, () => {
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
                B = A.arrayLeftDivide(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_arrayLeftDivide averageTime = ${ave}us`);
            expect(B.getArray()[0][0]).assertEqual(2);
        });
        runFunc('Matrix_arrayLeftDivide02', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 80; i++) {
                let s = new Date().getTime();
                array = [[7., 678., 710.]];
                array2 = [[71., 68., 110.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                B = A.arrayLeftDivide(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_arrayLeftDivide averageTime = ${ave}us`);
            expect(B.getArray()[0][1]).assertEqual(0.10029498525073746);
        });
        runFunc('Matrix_arrayLeftDivide03', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 20; i++) {
                let s = new Date().getTime();
                array = [[1., 2., 3], [4., 5., 6.], [7., 8., 10.]];
                array2 = [[2., 2., 3], [4., 5., 6.], [7., 8., 10.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                B = A.arrayLeftDivide(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_arrayLeftDivide averageTime = ${ave}us`);
            expect(JSON.stringify(B)).assertEqual('{"A":[[2,1,1],[1,1,1],[1,1,1]],"m":3,"n":3}');
        });
        runFunc('Matrix_arrayLeftDivide04', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                array = [[7., 1., 32.]];
                array2 = [[71., 68., 110.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                B = A.arrayLeftDivide(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_arrayLeftDivide averageTime = ${ave}us`);
            expect(B.getArray()[0][2]).assertEqual(3.4375);
        });
        runFunc('Matrix_arrayLeftDivideEquals01', 0, () => {
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
                B = A.arrayLeftDivideEquals(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_arrayLeftDivideEquals averageTime = ${ave}us`);
            expect(B.getArray()[0][0]).assertEqual(2);
        });
        runFunc('Matrix_arrayLeftDivideEquals02', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 6; i++) {
                let s = new Date().getTime();
                array = [[34., 135., 346.], [74., 8., 130.]];
                array2 = [[114., 45., 64.], [71., 34., 130.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                B = A.arrayLeftDivideEquals(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_arrayLeftDivideEquals averageTime = ${ave}us`);
            expect(B.getArray()[1][0]).assertEqual(0.9594594594594594);
        });
        runFunc('Matrix_arrayLeftDivideEquals03', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 10; i++) {
                let s = new Date().getTime();
                array = [[11., 22., 3], [4., 53., 6.], [34., 8., 10.]];
                array2 = [[2., 2., 3], [4., 24., 6.], [54., 8., 10.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                B = A.arrayLeftDivideEquals(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_arrayLeftDivideEquals averageTime = ${ave}us`);
            expect(JSON.stringify(B)).assertEqual('{"A":[[0.18181818181818182,0.09090909090909091,1],[1,0.4528301886792453,1],[1.588235294117647,1,1]],"m":3,"n":3}');
        });
        runFunc('Matrix_arrayLeftDivideEquals04', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 60; i++) {
                let s = new Date().getTime();
                array = [[34., 135., 9.], [74., 18., 130.]];
                array2 = [[789., 45., 164.], [321., 34., 23.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                B = A.arrayLeftDivideEquals(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_arrayLeftDivideEquals averageTime = ${ave}us`);
            expect(B.getArray()[1][2]).assertEqual(0.17692307692307694);
        });
        runFunc('Matrix_times_double01', 0, () => {
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
                B = A.times$double(2);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_times_double averageTime = ${ave}us`);
            expect(B.getArray()[0][0]).assertEqual(2);
            expect(B.getArray()[0][0]).assertEqual(2);
        });
        runFunc('Matrix_times_double02', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                array = [[317., 118., 32.]];
                array2 = [[237., 83., 48.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                B = A.times$double(39);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_times_double averageTime = ${ave}us`);
            expect(B.getArray()[0][1]).assertEqual(4602);
            expect(B.getArray()[0][2]).assertEqual(1248);
        });
        runFunc('Matrix_times_double03', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                array = [[1., 2., 3], [4., 5., 6.], [7., 8., 10.]];
                A = new Matrix(array);
                B = A.times$double(4);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_times_double averageTime = ${ave}us`);
            expect(JSON.stringify(B)).assertEqual('{"A":[[4,8,12],[16,20,24],[28,32,40]],"m":3,"n":3}');
        });
        runFunc('Matrix_times_double04', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 12; i++) {
                let s = new Date().getTime();
                array = [[32., 9., 32.]];
                A = new Matrix(array);
                B = A.times$double(65);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_times_double averageTime = ${ave}us`);
            expect(B.getArray()[0][2]).assertEqual(2080);
        });
    });
}
