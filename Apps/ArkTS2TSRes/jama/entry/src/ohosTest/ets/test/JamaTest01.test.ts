let __generate__Id: number = 0;
function generateId(): string {
    return "JamaTest01.test_" + ++__generate__Id;
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
export default function JamaTest01() {
    describe('JamaTest01', () => {
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
        runFunc('Matrix_constructor', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let C: any;
            let array: number[][];
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                array = [[1., 2., 3], [4., 5., 6.], [7., 8., 10.]];
                A = new Matrix(array);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_constructor averageTime = ${ave}us`);
            expect(A).not().assertUndefined();
        });
        runFunc('Matrix_constructWithCopy01', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                array = [[1., 2., 3], [4., 5., 6.], [7., 8., 10.]];
                A = new Matrix(array);
                B = Matrix.constructWithCopy(array);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_constructWithCopy averageTime = ${ave}us`);
            expect(A.m).assertEqual(B.m);
            expect(A.n).assertEqual(B.n);
        });
        runFunc('Matrix_constructWithCopy02', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 30; i++) {
                let s = new Date().getTime();
                array = [[40., 50., 60.], [70., 80., 10.]];
                A = new Matrix(array);
                B = Matrix.constructWithCopy(array);
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_constructWithCopy averageTime = ${ave}us`);
            expect(A.m).assertEqual(B.m);
            expect(A.n).assertEqual(B.n);
        });
        runFunc('Matrix_constructWithCopy03', 0, () => {
            let constructWithCopy: any;
            let array: number[][];
            for (let i = 0; i < 30; i++) {
                array = [[40., 50., 60.], [70., 80., 10.]];
                constructWithCopy = Matrix.constructWithCopy(array);
            }
            expect(constructWithCopy.m).assertEqual(2);
        });
        runFunc('Matrix_constructWithCopy04', 0, () => {
            let constructWithCopy: any;
            let array: number[][];
            for (let i = 0; i < 10; i++) {
                array = [[23., 12., 66.], [5., 66., 992.]];
                constructWithCopy = Matrix.constructWithCopy(array);
            }
            expect(constructWithCopy.m).assertEqual(2);
        });
        runFunc('Matrix_copy01', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                array = [[1., 2., 3], [4., 5., 6.], [7., 8., 10.]];
                A = new Matrix(array);
                B = A.copy();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_copy averageTime = ${ave}us`);
            expect(A.m).assertEqual(B.m);
            expect(A.n).assertEqual(B.n);
        });
        runFunc('Matrix_copy02', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 10; i++) {
                let s = new Date().getTime();
                array = [[41., 15., 16.]];
                A = new Matrix(array);
                B = A.copy();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_copy averageTime = ${ave}us`);
            expect(A.m).assertEqual(B.m);
            expect(A.n).assertEqual(B.n);
        });
        runFunc('Matrix_copy03', 0, () => {
            let A: any;
            let copy: any;
            let array: number[][];
            for (let i = 0; i < 40; i++) {
                array = [[411., 123., 161.]];
                A = new Matrix(array);
                copy = A.copy();
            }
            expect(JSON.stringify(copy)).assertEqual('{"A":[[411,123,161]],"m":1,"n":3}');
        });
        runFunc('Matrix_copy04', 0, () => {
            let A: any;
            let copy: any;
            let array: number[][];
            for (let i = 0; i < 110; i++) {
                array = [[81., 1., 10.]];
                A = new Matrix(array);
                copy = A.copy();
            }
            expect(JSON.stringify(copy)).assertEqual('{"A":[[81,1,10]],"m":1,"n":3}');
        });
        runFunc('Matrix_clone01', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                array = [[1., 2., 3], [4., 5., 6.], [7., 8., 10.]];
                A = new Matrix(array);
                B = A.clone();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_clone averageTime = ${ave}us`);
            expect(A.m).assertEqual(B.m);
            expect(A.n).assertEqual(B.n);
        });
        runFunc('Matrix_clone02', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][];
            for (let i = 0; i < 20; i++) {
                let s = new Date().getTime();
                array = [[1., 2., 3], [5., 55., 9.]];
                A = new Matrix(array);
                B = A.clone();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_clone averageTime = ${ave}us`);
            expect(A.m).assertEqual(B.m);
            expect(A.n).assertEqual(B.n);
        });
        runFunc('Matrix_clone03', 0, () => {
            let A: any;
            let clone: any;
            let array: number[][];
            for (let i = 0; i < 5; i++) {
                array = [[16., 22., 223], [50., 55., 19.]];
                A = new Matrix(array);
                clone = A.clone();
            }
            expect(JSON.stringify(clone)).assertEqual('{"A":[[16,22,223],[50,55,19]],"m":2,"n":3}');
        });
        runFunc('Matrix_clone04', 0, () => {
            let A: any;
            let clone: any;
            let array: number[][];
            for (let i = 0; i < 120; i++) {
                array = [[16., 466., 100], [4., 60., 98.]];
                A = new Matrix(array);
                clone = A.clone();
            }
            expect(JSON.stringify(clone)).assertEqual('{"A":[[16,466,100],[4,60,98]],"m":2,"n":3}');
        });
        runFunc('Matrix_getArray01', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][] = [];
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                array = [[1., 2., 3], [4., 5., 6.], [7., 8., 10.]];
                A = new Matrix(array);
                B = A.getArray();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_getArray averageTime = ${ave}us`);
            expect(B.length).assertEqual(array.length);
            expect(B[0][0]).assertEqual(array[0][0]);
            expect(B[0][1]).assertEqual(array[0][1]);
            expect(B[0][2]).assertEqual(array[0][2]);
            expect(B[1][0]).assertEqual(array[1][0]);
            expect(B[1][1]).assertEqual(array[1][1]);
            expect(B[1][2]).assertEqual(array[1][2]);
            expect(B[2][0]).assertEqual(array[2][0]);
            expect(B[2][1]).assertEqual(array[2][1]);
            expect(B[2][2]).assertEqual(array[2][2]);
        });
        runFunc('Matrix_getArray02', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][] = [];
            for (let i = 0; i < 20; i++) {
                let s = new Date().getTime();
                array = [[24., 5., 16.], [71., 38., 90.]];
                A = new Matrix(array);
                B = A.getArray();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_getArray averageTime = ${ave}us`);
            expect(B.length).assertEqual(array.length);
            expect(B[0][0]).assertEqual(array[0][0]);
            expect(B[0][1]).assertEqual(array[0][1]);
            expect(B[0][2]).assertEqual(array[0][2]);
            expect(B[1][0]).assertEqual(array[1][0]);
            expect(B[1][1]).assertEqual(array[1][1]);
            expect(B[1][2]).assertEqual(array[1][2]);
        });
        runFunc('Matrix_getArray03', 0, () => {
            let A: any;
            let getArray: any;
            let array: number[][];
            for (let i = 0; i < 30; i++) {
                array = [[24., 5., 16.], [71., 38., 90.]];
                A = new Matrix(array);
                getArray = A.getArray();
            }
            expect(JSON.stringify(getArray)).assertEqual('[[24,5,16],[71,38,90]]');
        });
        runFunc('Matrix_getArray04', 0, () => {
            let A: any;
            let getArray: any;
            let array: number[][];
            for (let i = 0; i < 10; i++) {
                array = [[1., 53., 31.], [11., 90., 100.]];
                A = new Matrix(array);
                getArray = A.getArray();
            }
            expect(JSON.stringify(getArray)).assertEqual('[[1,53,31],[11,90,100]]');
        });
        runFunc('Matrix_getArrayCopy01', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][] = [];
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                array = [[1., 2., 3], [4., 5., 6.], [7., 8., 10.]];
                A = new Matrix(array);
                B = A.getArrayCopy();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_getArrayCopy averageTime = ${ave}us`);
            expect(B.length).assertEqual(array.length);
            expect(B[0][0]).assertEqual(array[0][0]);
            expect(B[0][1]).assertEqual(array[0][1]);
            expect(B[0][2]).assertEqual(array[0][2]);
            expect(B[1][0]).assertEqual(array[1][0]);
            expect(B[1][1]).assertEqual(array[1][1]);
            expect(B[1][2]).assertEqual(array[1][2]);
            expect(B[2][0]).assertEqual(array[2][0]);
            expect(B[2][1]).assertEqual(array[2][1]);
            expect(B[2][2]).assertEqual(array[2][2]);
        });
        runFunc('Matrix_getArrayCopy02', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][] = [];
            for (let i = 0; i < 10; i++) {
                let s = new Date().getTime();
                array = [[37., 32., 66.]];
                A = new Matrix(array);
                B = A.getArrayCopy();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_getArrayCopy averageTime = ${ave}us`);
            expect(B.length).assertEqual(array.length);
            expect(B[0][0]).assertEqual(array[0][0]);
            expect(B[0][1]).assertEqual(array[0][1]);
            expect(B[0][2]).assertEqual(array[0][2]);
        });
        runFunc('Matrix_getArrayCopy03', 0, () => {
            let A: any;
            let getArrayCopy: any;
            let array: number[][];
            for (let i = 0; i < 10; i++) {
                array = [[37., 32., 66.]];
                A = new Matrix(array);
                getArrayCopy = A.getArrayCopy();
            }
            expect(JSON.stringify(getArrayCopy)).assertEqual('[[37,32,66]]');
        });
        runFunc('Matrix_getArrayCopy04', 0, () => {
            let A: any;
            let getArrayCopy: any;
            let array: number[][];
            for (let i = 0; i < 100; i++) {
                array = [[100., 120., 3], [423., 15., 62.], [7., 28., 110.]];
                A = new Matrix(array);
                getArrayCopy = A.getArrayCopy();
            }
            expect(JSON.stringify(getArrayCopy)).assertEqual('[[100,120,3],[423,15,62],[7,28,110]]');
        });
        runFunc('Matrix_getColumnPackedCopy01', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][] = [];
            for (let i = 0; i < 50; i++) {
                let s = new Date().getTime();
                array = [[1., 2., 3], [4., 5., 6.], [7., 8., 10.]];
                A = new Matrix(array);
                B = A.getColumnPackedCopy();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_getColumnPackedCopy averageTime = ${ave}us`);
            expect(B.length).assertEqual(array[0].length + array[1].length + array[2].length);
        });
        runFunc('Matrix_getColumnPackedCopy02', 0, () => {
            let sumAve = 0;
            let A: any;
            let B: any;
            let array: number[][] = [];
            for (let i = 0; i < 60; i++) {
                let s = new Date().getTime();
                array = [[91., 9., 34], [43., 34., 70.]];
                A = new Matrix(array);
                B = A.getColumnPackedCopy();
                let e = new Date().getTime();
                sumAve += (e - s) * 1000;
            }
            let ave = sumAve / 50;
            console.log(`jama:Matrix_getColumnPackedCopy averageTime = ${ave}us`);
            expect(B.length).assertEqual(array[0].length + array[1].length);
        });
        runFunc('Matrix_getColumnPackedCopy03', 0, () => {
            let A: any;
            let getColumnPackedCopy: any;
            let array: number[][];
            for (let i = 0; i < 10; i++) {
                array = [[1., 21., 31], [4., 5., 16.], [73., 83., 100.]];
                A = new Matrix(array);
                getColumnPackedCopy = A.getColumnPackedCopy();
            }
            expect(JSON.stringify(getColumnPackedCopy)).assertEqual('[1,4,73,21,5,83,31,16,100]');
        });
        runFunc('Matrix_getColumnPackedCopy04', 0, () => {
            let A: any;
            let getColumnPackedCopy: any;
            let array: number[][];
            for (let i = 0; i < 56; i++) {
                array = [[19., 3., 45], [12., 1., 25.]];
                A = new Matrix(array);
                getColumnPackedCopy = A.getColumnPackedCopy();
            }
            expect(JSON.stringify(getColumnPackedCopy)).assertEqual('[19,12,3,1,45,25]');
        });
    });
}
