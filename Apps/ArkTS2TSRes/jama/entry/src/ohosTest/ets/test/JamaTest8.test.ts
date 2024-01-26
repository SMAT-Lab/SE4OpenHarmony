let __generate__Id: number = 0;
function generateId(): string {
    return "JamaTest8.test_" + ++__generate__Id;
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
export default function JamaTest08() {
    describe('JamaTest08', () => {
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
        runFunc('Matrix_timesEquals01', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                array = [[1., 2., 3], [4., 5., 6.], [7., 8., 10.]];
                A = new Matrix(array);
                B = A.timesEquals(2);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_timesEquals averageTime = ${ave}us`);
            expect(B.getArray()[0][0]).assertEqual(2);
        });
        runFunc('Matrix_timesEquals02', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 90; i++) {
                let s = new Date().getTime();
                array = [[134., 225., 6.], [732., 442., 310.]];
                A = new Matrix(array);
                B = A.timesEquals(133);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_timesEquals averageTime = ${ave}us`);
            expect(B.getArray()[1][0]).assertEqual(97356);
            expect(B.getArray()[0][2]).assertEqual(798);
        });
        runFunc('Matrix_timesEquals03', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 30; i++) {
                let s = new Date().getTime();
                array = [[134., 12., 3], [4., 52., 16.], [37., 83., 66.]];
                A = new Matrix(array);
                B = A.timesEquals(98);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_timesEquals averageTime = ${ave}us`);
            expect(JSON.stringify(B)).assertEqual('{"A":[[13132,1176,294],[392,5096,1568],[3626,8134,6468]],"m":3,"n":3}');
        });
        runFunc('Matrix_timesEquals04', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 66; i++) {
                let s = new Date().getTime();
                array = [[34., 21., 16.], [98., 3., 0.]];
                A = new Matrix(array);
                B = A.timesEquals(8);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_timesEquals averageTime = ${ave}us`);
            expect(B.getArray()[0][0]).assertEqual(272);
        });
        runFunc('Matrix_times_Jama_Matrix01', 0, () => {
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
                B = A.times$Jama_Matrix(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_times_Jama_Matrix averageTime = ${ave}us`);
            expect(B.getArray()[0][0]).assertEqual(31);
        });
        runFunc('Matrix_times_Jama_Matrix02', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 70; i++) {
                let s = new Date().getTime();
                array = [[121., 22., 3], [34., 53., 63.], [7., 8., 10.]];
                array2 = [[212., 12., 113], [43., 532., 36.], [7., 8., 10.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                B = A.times$Jama_Matrix(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_times_Jama_Matrix averageTime = ${ave}us`);
            expect(B.getArray()[0][0]).assertEqual(26619);
        });
        runFunc('Matrix_times_Jama_Matrix03', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 18; i++) {
                let s = new Date().getTime();
                array = [[1., 321., 3], [4., 5., 16.], [7., 8., 10.]];
                array2 = [[2., 32., 3], [4., 25., 6.], [72., 8., 435.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                B = A.times$Jama_Matrix(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_times_Jama_Matrix averageTime = ${ave}us`);
            expect(B.getArray()[0][0]).assertEqual(1502);
        });
        runFunc('Matrix_times_Jama_Matrix04', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 19; i++) {
                let s = new Date().getTime();
                array = [[3., 22., 3], [34., 53., 63.], [7., 564., 10.]];
                array2 = [[23., 12., 113], [43., 2., 36.], [17., 18., 10.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                B = A.times$Jama_Matrix(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_times_Jama_Matrix averageTime = ${ave}us`);
            expect(JSON.stringify(B)).assertEqual('{"A":[[1066,134,1161],[4132,1648,6380],[24583,1392,21195]],"m":3,"n":3}');
        });
        runFunc('Matrix_times01', 0, () => {
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
                B = A.times(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_times averageTime = ${ave}us`);
            expect(B.getArray()[0][0]).assertEqual(31);
        });
        runFunc('Matrix_times02', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                array = [[451., 112., 133.], [4., 45., 56.], [4., 15., 6.]];
                array2 = [[2., 782., 13.], [314., 55., 13.], [4., 25., 6.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                B = A.times(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_times averageTime = ${ave}us`);
            expect(B.getArray()[1][0]).assertEqual(14362);
        });
        runFunc('Matrix_times03', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 66; i++) {
                let s = new Date().getTime();
                array = [[34., 2., 23], [47., 5., 6.], [7., 4., 10.]];
                array2 = [[22., 2., 343], [54., 678., 66.], [76., 98., 79.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                B = A.times(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_times averageTime = ${ave}us`);
            expect(JSON.stringify(B)).assertEqual('{"A":[[2604,3678,13611],[1760,4072,16925],[1130,3706,3455]],"m":3,"n":3}');
        });
        runFunc('Matrix_times04', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 9; i++) {
                let s = new Date().getTime();
                array = [[4., 112., 133.], [4., 45., 56.], [3., 13., 6.]];
                array2 = [[2., 35., 13.], [53., 1., 13.], [4., 25., 45.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                B = A.times(C);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_times averageTime = ${ave}us`);
            expect(B.getArray()[2][0]).assertEqual(719);
        });
        runFunc('Matrix_lu01', 0, () => {
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
                B = A.lu();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_lu averageTime = ${ave}us`);
            expect(B.m).assertEqual(3);
            expect(B.n).assertEqual(3);
        });
        runFunc('Matrix_lu02', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 98; i++) {
                let s = new Date().getTime();
                array = [[14., 235., 36.], [4., 82., 120.], [14., 36., 316.]];
                array2 = [[14., 35., 4.], [72., 8., 102.], [31., 36., 2.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                B = A.lu();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_lu averageTime = ${ave}us`);
            expect(B.m).assertEqual(3);
            expect(B.n).assertEqual(3);
        });
        runFunc('Matrix_lu03', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                array = [[1., 2., 3], [4., 5., 6.], [7., 8., 10.]];
                A = new Matrix(array);
                B = A.lu();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_lu averageTime = ${ave}us`);
            expect(JSON.stringify(B)).assertEqual('{"LU":[[7,8,10],[0.14285714285714284,0.8571428571428572,1.5714285714285716],[0.5714285714285714,0.5000000000000002,-0.5]],"m":3,"n":3,"pivsign":1,"piv":[2,0,1]}');
        });
        runFunc('Matrix_lu04', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 23; i++) {
                let s = new Date().getTime();
                array = [[1., 11., 36.], [32., 82., 3.], [1., 1., 3.]];
                A = new Matrix(array);
                B = A.lu();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_lu averageTime = ${ave}us`);
            expect(JSON.stringify(B)).assertEqual('{"LU":[[32,82,3],[0.03125,8.4375,35.90625],[0.03125,-0.18518518518518517,9.555555555555555]],"m":3,"n":3,"pivsign":-1,"piv":[1,0,2]}');
        });
        runFunc('Matrix_qr01', 0, () => {
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
                B = A.qr();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_qr averageTime = ${ave}us`);
            let strH1 = (B.getH().getArray()[0][0] + '').substring(0, 10);
            let strH2 = ('1.1230914909793328').substring(0, 10);
            let strR1 = (B.getR().getArray()[0][0] + '').substring(0, 10);
            let strR2 = ('-8.12403840463596').substring(0, 10);
            let strQ1 = (B.getQ().getArray()[0][0] + '').substring(0, 10);
            let strQ2 = ('-0.12309149097933280').substring(0, 10);
            expect(strH1).assertEqual(strH2);
            expect(strR1).assertEqual(strR2);
            expect(strQ1).assertEqual(strQ2);
        });
        runFunc('Matrix_qr02', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            let array2: number[][];
            for (let i = 0; i < 30; i++) {
                let s = new Date().getTime();
                array = [[211., 122., 23], [46., 54., 6.], [65., 64., 466.]];
                array2 = [[256., 222., 23], [4., 565., 6.], [17., 32., 6.]];
                C = new Matrix(array2);
                A = new Matrix(array);
                B = A.qr();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_qr averageTime = ${ave}us`);
            let strH1 = (B.getH().getArray()[0][0] + '').substring(0, 10);
            let strH2 = ('1.93559036').substring(0, 10);
            let strR1 = (B.getR().getArray()[0][0] + '').substring(0, 10);
            let strR2 = ('-225.52605').substring(0, 10);
            let strQ1 = (B.getQ().getArray()[0][0] + '').substring(0, 10);
            let strQ2 = ('-0.9355903').substring(0, 10);
            expect(strH1).assertEqual(strH2);
            expect(strR1).assertEqual(strR2);
            expect(strQ1).assertEqual(strQ2);
        });
        runFunc('Matrix_qr03', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                array = [[1., 2., 3], [4., 5., 6.], [7., 8., 10.]];
                A = new Matrix(array);
                B = A.qr();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_qr averageTime = ${ave}us`);
            expect(JSON.stringify(B)).assertEqual('{"QR":[[1.1230914909793328,-9.601136296387953,-11.939874624995275],[0.4923659639173309,1.0950385135524663,1.507556722888816],[0.8616404368553291,0.99547359630566688,2]],"m":3,"n":3,"Rdiag":[-8.12403840463596,0.9045340337332888,-0.4082482904638636]}');
        });
        runFunc('Matrix_qr04', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 99; i++) {
                let s = new Date().getTime();
                array = [[23., 21., 433], [46., 34., 26.], [42., 164., 45.]];
                A = new Matrix(array);
                B = A.qr();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_qr averageTime = ${ave}us`);
            let strH1 = (B.getH().getArray()[0][1] + '').substring(0, 10);
            let strH2 = ('0').substring(0, 10);
            let strR1 = (B.getR().getArray()[0][1] + '').substring(0, 10);
            let strR2 = ('-134.56264').substring(0, 10);
            let strQ1 = (B.getQ().getArray()[0][1] + '').substring(0, 10);
            let strQ2 = ('-0.2513005').substring(0, 10);
            expect(strH1).assertEqual(strH2);
            expect(strR1).assertEqual(strR2);
            expect(strQ1).assertEqual(strQ2);
        });
    });
}
