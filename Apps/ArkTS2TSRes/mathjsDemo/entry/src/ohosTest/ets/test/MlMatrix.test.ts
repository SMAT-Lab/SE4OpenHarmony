let __generate__Id: number = 0;
function generateId(): string {
    return "MlMatrix.test_" + ++__generate__Id;
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
import { covariance, correlation, wrap, solve, Matrix, EigenvalueDecomposition, CholeskyDecomposition, LuDecomposition, inverse, SingularValueDecomposition, linearDependencies, pseudoInverse, QrDecomposition, IRandomOptions, IRandomIntOptions, IScaleOptions } from 'ml-matrix';
export default function matrixTest() {
    describe('ml_matrixTest', () => {
        // Defines a test suite. Two parameters are supported: test suite name and test suite function.
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
        let A = new Matrix([
            [1, 1],
            [2, 2],
        ]);
        let B = new Matrix([
            [3, 3],
            [1, 1],
        ]);
        let C = new Matrix([
            [3, 3],
            [1, 1],
        ]);
        it('Matrix.ones1', 0, () => {
            expect(JSON.stringify(Matrix.ones(3, 3))).assertEqual('[[1,1,1],[1,1,1],[1,1,1]]');
        });
        it('Matrix.ones2', 0, () => {
            expect(JSON.stringify(Matrix.ones(2, 2))).assertEqual('[[1,1],[1,1]]');
        });
        it('Matrix.ones3', 0, () => {
            expect(JSON.stringify(Matrix.ones(4, 4))).assertEqual('[[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1]]');
        });
        it('Matrix.ones4', 0, () => {
            expect(JSON.stringify(Matrix.ones(5, 5)))
                .assertEqual('[[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1]]');
        });
        it('Matrix.ones5', 0, () => {
            expect(JSON.stringify(Matrix.ones(2, 3))).assertEqual('[[1,1,1],[1,1,1]]');
        });
        it('Matrix.ones6', 0, () => {
            expect(JSON.stringify(Matrix.ones(1, 3))).assertEqual('[[1,1,1]]');
        });
        it('Matrix.zeros1', 0, () => {
            expect(JSON.stringify(Matrix.zeros(3, 2))).assertEqual('[[0,0],[0,0],[0,0]]');
        });
        it('Matrix.zeros2', 0, () => {
            expect(JSON.stringify(Matrix.zeros(2, 2))).assertEqual('[[0,0],[0,0]]');
        });
        it('Matrix.zeros3', 0, () => {
            expect(JSON.stringify(Matrix.zeros(2, 3))).assertEqual('[[0,0,0],[0,0,0]]');
        });
        it('Matrix.zeros4', 0, () => {
            expect(JSON.stringify(Matrix.zeros(1, 4))).assertEqual('[[0,0,0,0]]');
        });
        it('Matrix.zeros5', 0, () => {
            expect(JSON.stringify(Matrix.zeros(3, 3))).assertEqual('[[0,0,0],[0,0,0],[0,0,0]]');
        });
        it('Matrix.eye1', 0, () => {
            expect(JSON.stringify(Matrix.eye(3, 4))).assertEqual('[[1,0,0,0],[0,1,0,0],[0,0,1,0]]');
        });
        it('Matrix.eye2', 0, () => {
            expect(JSON.stringify(Matrix.eye(3, 3))).assertEqual('[[1,0,0],[0,1,0],[0,0,1]]');
        });
        it('Matrix.eye3', 0, () => {
            expect(JSON.stringify(Matrix.eye(2, 4))).assertEqual('[[1,0,0,0],[0,1,0,0]]');
        });
        it('Matrix.eye4', 0, () => {
            expect(JSON.stringify(Matrix.eye(4, 3))).assertEqual('[[1,0,0],[0,1,0],[0,0,1],[0,0,0]]');
        });
        it('Matrix.eye5', 0, () => {
            expect(JSON.stringify(Matrix.eye(2, 2))).assertEqual('[[1,0],[0,1]]');
        });
        it('Matrix.add1', 0, () => {
            expect(JSON.stringify(Matrix.add(A, B))).assertEqual('[[4,4],[3,3]]');
        });
        it('Matrix.add2', 0, () => {
            expect(JSON.stringify(Matrix.add(A, 1))).assertEqual('[[2,2],[3,3]]');
        });
        it('Matrix.add3', 0, () => {
            expect(JSON.stringify(Matrix.add(B, A))).assertEqual('[[4,4],[3,3]]');
        });
        it('Matrix.add4', 0, () => {
            expect(JSON.stringify(Matrix.add(A, 3))).assertEqual('[[4,4],[5,5]]');
        });
        it('Matrix.add5', 0, () => {
            expect(JSON.stringify(Matrix.add(C, B))).assertEqual('[[6,6],[2,2]]');
        });
        it('Matrix.sub1', 0, () => {
            expect(JSON.stringify(Matrix.sub(A, B))).assertEqual('[[-2,-2],[1,1]]');
        });
        it('Matrix.sub2', 0, () => {
            expect(JSON.stringify(Matrix.sub(B, A))).assertEqual('[[2,2],[-1,-1]]');
        });
        it('Matrix.sub3', 0, () => {
            expect(JSON.stringify(Matrix.sub(A, 1))).assertEqual('[[0,0],[1,1]]');
        });
        it('Matrix.sub4', 0, () => {
            expect(JSON.stringify(Matrix.sub(A, -1))).assertEqual('[[2,2],[3,3]]');
        });
        it('Matrix.sub5', 0, () => {
            expect(JSON.stringify(Matrix.sub(A, 0))).assertEqual('[[1,1],[2,2]]');
        });
        it('mmul1', 0, () => {
            expect(JSON.stringify(A.mmul(B))).assertEqual('[[4,4],[8,8]]');
        });
        it('mmul2', 0, () => {
            expect(JSON.stringify(A.mmul(A))).assertEqual('[[3,3],[6,6]]');
        });
        it('mmul3', 0, () => {
            let C = new Matrix([
                [3, 3],
                [0, 1],
            ]);
            expect(JSON.stringify(A.mmul(C))).assertEqual('[[3,4],[6,8]]');
        });
        it('mmul4', 0, () => {
            let B = new Matrix([
                [2, 3],
                [1, 4],
            ]);
            expect(JSON.stringify(A.mmul(B))).assertEqual('[[3,7],[6,14]]');
        });
        it('mmul5', 0, () => {
            let B = new Matrix([
                [2, 0],
                [3, 1],
            ]);
            expect(JSON.stringify(A.mmul(B))).assertEqual('[[5,1],[10,2]]');
        });
        it('Matrix.mul1', 0, () => {
            expect(JSON.stringify(Matrix.mul(A, 2))).assertEqual('[[2,2],[4,4]]');
        });
        it('Matrix.mul2', 0, () => {
            expect(JSON.stringify(Matrix.mul(A, 10))).assertEqual('[[10,10],[20,20]]');
        });
        it('Matrix.mul3', 0, () => {
            let B = new Matrix([
                [2, 3],
                [1, 4],
            ]);
            expect(JSON.stringify(Matrix.mul(A, B))).assertEqual('[[2,3],[2,8]]');
        });
        it('Matrix.mul4', 0, () => {
            let B = new Matrix([
                [2, 0],
                [3, 1],
            ]);
            expect(JSON.stringify(Matrix.mul(A, B))).assertEqual('[[2,0],[6,2]]');
        });
        it('Matrix.mul5', 0, () => {
            let B = new Matrix([
                [3, 2],
                [1, 0],
            ]);
            expect(JSON.stringify(Matrix.mul(A, B))).assertEqual('[[3,2],[2,0]]');
        });
        it('Matrix.div1', 0, () => {
            expect(JSON.stringify(Matrix.div(A, 10))).assertEqual('[[0.1,0.1],[0.2,0.2]]');
        });
        it('Matrix.div2', 0, () => {
            expect(JSON.stringify(Matrix.div(A, B))).assertEqual('[[0.3333333333333333,0.3333333333333333],[2,2]]');
        });
        it('Matrix.div3', 0, () => {
            let B = new Matrix([
                [2, 3],
                [1, 4],
            ]);
            expect(JSON.stringify(Matrix.div(A, B))).assertEqual('[[0.5,0.3333333333333333],[2,0.5]]');
        });
        it('Matrix.div4', 0, () => {
            let B = new Matrix([
                [2, 4],
                [3, 1],
            ]);
            expect(JSON.stringify(Matrix.div(A, B))).assertEqual('[[0.5,0.25],[0.6666666666666666,2]]');
        });
        it('Matrix.div5', 0, () => {
            let B = new Matrix([
                [3, 2],
                [1, 4],
            ]);
            expect(JSON.stringify(Matrix.div(A, B))).assertEqual('[[0.3333333333333333,0.5],[2,0.5]]');
        });
        it('Matrix.mod1', 0, () => {
            expect(JSON.stringify(Matrix.mod(B, 2))).assertEqual('[[1,1],[1,1]]');
        });
        it('Matrix.mod2', 0, () => {
            expect(JSON.stringify(Matrix.mod(B, 3))).assertEqual('[[0,0],[1,1]]');
        });
        it('Matrix.mod3', 0, () => {
            let B = new Matrix([
                [2, 3],
                [1, 4],
            ]);
            expect(JSON.stringify(Matrix.mod(A, B))).assertEqual('[[1,1],[0,2]]');
        });
        it('Matrix.mod4', 0, () => {
            let B = new Matrix([
                [2, 4],
                [3, 1],
            ]);
            expect(JSON.stringify(Matrix.mod(A, B))).assertEqual('[[1,1],[2,0]]');
        });
        it('Matrix.mod5', 0, () => {
            let B = new Matrix([
                [3, 2],
                [1, 4],
            ]);
            expect(JSON.stringify(Matrix.mod(A, B))).assertEqual('[[1,1],[0,2]]');
        });
        it('Matrix.max1', 0, () => {
            expect(JSON.stringify(Matrix.max(A, B))).assertEqual('[[3,3],[2,2]]');
        });
        it('Matrix.max2', 0, () => {
            let B = new Matrix([
                [2, 3],
                [1, 4],
            ]);
            expect(JSON.stringify(Matrix.max(A, B))).assertEqual('[[2,3],[2,4]]');
        });
        it('Matrix.max3', 0, () => {
            let B = new Matrix([
                [2, 4],
                [3, 1],
            ]);
            expect(JSON.stringify(Matrix.max(A, B))).assertEqual('[[2,4],[3,2]]');
        });
        it('Matrix.max4', 0, () => {
            let B = new Matrix([
                [3, 2],
                [1, 4],
            ]);
            expect(JSON.stringify(Matrix.max(A, B))).assertEqual('[[3,2],[2,4]]');
        });
        it('Matrix.max5', 0, () => {
            let B = new Matrix([
                [0, 3],
                [2, 4],
            ]);
            expect(JSON.stringify(Matrix.max(A, B))).assertEqual('[[1,3],[2,4]]');
        });
        it('Matrix.min1', 0, () => {
            expect(JSON.stringify(Matrix.min(A, B))).assertEqual('[[1,1],[1,1]]');
        });
        it('Matrix.min2', 0, () => {
            let B = new Matrix([
                [2, 3],
                [1, 4],
            ]);
            expect(JSON.stringify(Matrix.min(A, B))).assertEqual('[[1,1],[1,2]]');
        });
        it('Matrix.min3', 0, () => {
            let B = new Matrix([
                [2, 4],
                [3, 1],
            ]);
            expect(JSON.stringify(Matrix.min(A, B))).assertEqual('[[1,1],[2,1]]');
        });
        it('Matrix.min4', 0, () => {
            let B = new Matrix([
                [3, 2],
                [1, 4],
            ]);
            expect(JSON.stringify(Matrix.min(A, B))).assertEqual('[[1,1],[1,2]]');
        });
        it('Matrix.min5', 0, () => {
            let B = new Matrix([
                [0, 3],
                [2, 4],
            ]);
            expect(JSON.stringify(Matrix.min(A, B))).assertEqual('[[0,1],[2,2]]');
        });
        it('Aadd1', 0, () => {
            let C = new Matrix([
                [3, 3],
                [1, 1],
            ]);
            let c = C.add(A);
            expect(JSON.stringify(c)).assertEqual('[[4,4],[3,3]]');
        });
        it('Aadd2', 0, () => {
            let A = new Matrix([
                [1, 1],
                [2, 2],
            ]);
            expect(JSON.stringify(A.add(1))).assertEqual('[[2,2],[3,3]]');
        });
        it('Aadd3', 0, () => {
            let B = new Matrix([
                [3, 3],
                [1, 1],
            ]);
            expect(JSON.stringify(B.add(A))).assertEqual('[[4,4],[3,3]]');
        });
        it('Aadd4', 0, () => {
            let A = new Matrix([
                [1, 1],
                [2, 2],
            ]);
            expect(JSON.stringify(A.add(3))).assertEqual('[[4,4],[5,5]]');
        });
        it('Aadd5', 0, () => {
            let C = new Matrix([
                [3, 3],
                [1, 1],
            ]);
            expect(JSON.stringify(C.add(B))).assertEqual('[[6,6],[2,2]]');
        });
        it('Asub1', 0, () => {
            let C = new Matrix([
                [3, 3],
                [1, 1],
            ]);
            expect(JSON.stringify(C.sub(A))).assertEqual('[[2,2],[-1,-1]]');
        });
        it('Asub2', 0, () => {
            let B = new Matrix([
                [3, 3],
                [1, 1],
            ]);
            expect(JSON.stringify(B.sub(A))).assertEqual('[[2,2],[-1,-1]]');
        });
        it('Asub3', 0, () => {
            let A = new Matrix([
                [1, 1],
                [2, 2],
            ]);
            expect(JSON.stringify(A.sub(1))).assertEqual('[[0,0],[1,1]]');
        });
        it('Asub4', 0, () => {
            let A = new Matrix([
                [1, 1],
                [2, 2],
            ]);
            expect(JSON.stringify(A.sub(-1))).assertEqual('[[2,2],[3,3]]');
        });
        it('Asub5', 0, () => {
            let A = new Matrix([
                [1, 1],
                [2, 2],
            ]);
            expect(JSON.stringify(A.sub(0))).assertEqual('[[1,1],[2,2]]');
        });
        it('Amul1', 0, () => {
            let C = new Matrix([
                [3, 3],
                [1, 1],
            ]);
            expect(JSON.stringify(C.mul(10))).assertEqual('[[30,30],[10,10]]');
        });
        it('Amul2', 0, () => {
            let A = new Matrix([
                [1, 1],
                [2, 2],
            ]);
            expect(JSON.stringify(A.mul(10))).assertEqual('[[10,10],[20,20]]');
        });
        it('Amul3', 0, () => {
            let A = new Matrix([
                [1, 1],
                [2, 2],
            ]);
            let B = new Matrix([
                [2, 3],
                [1, 4],
            ]);
            expect(JSON.stringify(A.mul(B))).assertEqual('[[2,3],[2,8]]');
        });
        it('Amul4', 0, () => {
            let A = new Matrix([
                [1, 1],
                [2, 2],
            ]);
            let B = new Matrix([
                [2, 0],
                [3, 1],
            ]);
            expect(JSON.stringify(A.mul(B))).assertEqual('[[2,0],[6,2]]');
        });
        it('Amul5', 0, () => {
            let A = new Matrix([
                [1, 1],
                [2, 2],
            ]);
            let B = new Matrix([
                [3, 2],
                [1, 0],
            ]);
            expect(JSON.stringify(A.mul(B))).assertEqual('[[3,2],[2,0]]');
        });
        it('Adiv1', 0, () => {
            let A = new Matrix([
                [1, 1],
                [2, 2],
            ]);
            expect(JSON.stringify(A.div(10))).assertEqual('[[0.1,0.1],[0.2,0.2]]');
        });
        it('Adiv2', 0, () => {
            let A = new Matrix([
                [1, 1],
                [2, 2],
            ]);
            expect(JSON.stringify(A.div(B))).assertEqual('[[0.3333333333333333,0.3333333333333333],[2,2]]');
        });
        it('Adiv3', 0, () => {
            let A = new Matrix([
                [1, 1],
                [2, 2],
            ]);
            let B = new Matrix([
                [2, 3],
                [1, 4],
            ]);
            expect(JSON.stringify(A.div(B))).assertEqual('[[0.5,0.3333333333333333],[2,0.5]]');
        });
        it('Adiv4', 0, () => {
            let B = new Matrix([
                [2, 4],
                [3, 1],
            ]);
            expect(JSON.stringify(A.div(B))).assertEqual('[[0.5,0.25],[0.6666666666666666,2]]');
        });
        it('Adiv5', 0, () => {
            let B = new Matrix([
                [3, 2],
                [1, 4],
            ]);
            expect(JSON.stringify(A.div(B))).assertEqual('[[0.16666666666666666,0.125],[0.6666666666666666,0.5]]');
        });
        it('Amod1', 0, () => {
            let C = new Matrix([
                [3, 3],
                [1, 1],
            ]);
            expect(JSON.stringify(C.mod(10))).assertEqual('[[3,3],[1,1]]');
        });
        it('Amod2', 0, () => {
            let B = new Matrix([
                [3, 3],
                [1, 1],
            ]);
            expect(JSON.stringify(B.mod(3))).assertEqual('[[0,0],[1,1]]');
        });
        it('Amod3', 0, () => {
            let A = new Matrix([
                [1, 1],
                [2, 2],
            ]);
            let B = new Matrix([
                [2, 3],
                [1, 4],
            ]);
            expect(JSON.stringify(A.mod(B))).assertEqual('[[1,1],[0,2]]');
        });
        it('Amod4', 0, () => {
            let A = new Matrix([
                [1, 1],
                [2, 2],
            ]);
            let B = new Matrix([
                [2, 4],
                [3, 1],
            ]);
            expect(JSON.stringify(A.mod(B))).assertEqual('[[1,1],[2,0]]');
        });
        it('Amod5', 0, () => {
            let A = new Matrix([
                [1, 1],
                [2, 2],
            ]);
            let B = new Matrix([
                [3, 2],
                [1, 4],
            ]);
            expect(JSON.stringify(A.mod(B))).assertEqual('[[1,1],[0,2]]');
        });
        it('Matrix.abs1', 0, () => {
            // abs
            let absMatrix = new Matrix([
                [1, 2],
                [-3, -4],
            ]);
            let abs = Matrix.abs(absMatrix);
            expect(JSON.stringify(abs)).assertEqual('[[1,2],[3,4]]');
        });
        it('Matrix.abs2', 0, () => {
            // abs
            let absMatrix = new Matrix([
                [1, -2],
                [-3, 4],
            ]);
            let abs = Matrix.abs(absMatrix);
            expect(JSON.stringify(abs)).assertEqual('[[1,2],[3,4]]');
        });
        it('Matrix.abs3', 0, () => {
            // abs
            let absMatrix = new Matrix([
                [-1, -2],
                [-3, 4],
            ]);
            let abs = Matrix.abs(absMatrix);
            expect(JSON.stringify(abs)).assertEqual('[[1,2],[3,4]]');
        });
        it('Matrix.abs4', 0, () => {
            // abs
            let absMatrix = new Matrix([
                [1, 0],
                [-5, -9],
            ]);
            let abs = Matrix.abs(absMatrix);
            expect(JSON.stringify(abs)).assertEqual('[[1,0],[5,9]]');
        });
        it('Matrix.abs5', 0, () => {
            // abs
            let absMatrix = new Matrix([
                [1, 2],
                [0, -3],
            ]);
            let abs = Matrix.abs(absMatrix);
            expect(JSON.stringify(abs)).assertEqual('[[1,2],[0,3]]');
        });
        it('Matrix.acos1', 0, () => {
            // acos
            let acosMatrix = new Matrix([
                [-1, -0.8],
                [0.5, 0.6],
            ]);
            let acos = Matrix.acos(acosMatrix);
            expect(JSON.stringify(acos))
                .assertEqual('[[3.141592653589793,2.498091544796509],[1.0471975511965979,0.9272952180016123]]');
        });
        it('Matrix.acos2', 0, () => {
            // acos
            let acosMatrix = new Matrix([
                [-1, 0.8],
                [1, -0.6],
            ]);
            let acos = Matrix.acos(acosMatrix);
            expect(JSON.stringify(acos))
                .assertEqual('[[3.141592653589793,0.6435011087932843],[0,2.214297435588181]]');
        });
        it('Matrix.acos3', 0, () => {
            // acos
            let acosMatrix = new Matrix([
                [-1, -0.4],
                [0.5, 0.9],
            ]);
            let acos = Matrix.acos(acosMatrix);
            expect(JSON.stringify(acos))
                .assertEqual('[[3.141592653589793,1.9823131728623846],[1.0471975511965979,0.45102681179626236]]');
        });
        it('Matrix.acos4', 0, () => {
            // acos
            let acosMatrix = new Matrix([
                [-1, -0.9],
                [0.5, 0.4],
            ]);
            let acos = Matrix.acos(acosMatrix);
            expect(JSON.stringify(acos))
                .assertEqual('[[3.141592653589793,2.6905658417935308],[1.0471975511965979,1.1592794807274085]]');
        });
        it('Matrix.acosh1', 0, () => {
            // acosh
            let acoshMatrix = new Matrix([
                [1, 1.8],
                [2, 10],
            ]);
            let acosh = Matrix.acosh(acoshMatrix);
            expect(JSON.stringify(acosh)).assertEqual('[[0,1.1929107309930491],[1.3169578969248166,2.993222846126381]]');
        });
        it('Matrix.acosh2', 0, () => {
            // acosh
            let acoshMatrix = new Matrix([
                [3, 5],
                [2, 6],
            ]);
            let acosh = Matrix.acosh(acoshMatrix);
            expect(JSON.stringify(acosh)).assertEqual('[[1.762747174039086,2.2924316695611777],[1.3169578969248166,2.477888730288475]]');
        });
        it('Matrix.acosh3', 0, () => {
            // acosh
            let acoshMatrix = new Matrix([
                [6, 9],
                [3, 4],
            ]);
            let acosh = Matrix.acosh(acoshMatrix);
            expect(JSON.stringify(acosh)).assertEqual('[[2.477888730288475,2.8872709503576206],[1.762747174039086,2.0634370688955608]]');
        });
        it('Matrix.acosh4', 0, () => {
            // acosh
            let acoshMatrix = new Matrix([
                [1, 3],
                [2, 4],
            ]);
            let acosh = Matrix.acosh(acoshMatrix);
            expect(JSON.stringify(acosh)).assertEqual('[[0,1.762747174039086],[1.3169578969248166,2.0634370688955608]]');
        });
        it('Matrix.acosh5', 0, () => {
            // acosh
            let acoshMatrix = new Matrix([
                [2, 1.5],
                [5, 8],
            ]);
            let acosh = Matrix.acosh(acoshMatrix);
            expect(JSON.stringify(acosh)).assertEqual('[[1.3169578969248166,0.9624236501192069],[2.2924316695611777,2.7686593833135738]]');
        });
        it('Matrix.asinh1', 0, () => {
            let asinhMatrix = new Matrix([
                [1, 0],
                [-1, 2],
            ]);
            let asinh = Matrix.asinh(asinhMatrix);
            expect(JSON.stringify(asinh)).assertEqual('[[0.881373587019543,0],[-0.881373587019543,1.4436354751788103]]');
        });
        it('Matrix.asinh2', 0, () => {
            let asinhMatrix = ([
                [1, 0],
                [-1, 2]
            ]);
            let asinh = Matrix.asinh(asinhMatrix);
            expect(JSON.stringify(asinh)).assertEqual('[[0.881373587019543,0],[-0.881373587019543,1.4436354751788103]]');
        });
        it('Matrix.asinh3', 0, () => {
            let asinhMatrix = new Matrix([
                [1, 0.5],
                [-1.2, 0.2],
            ]);
            let asinh = Matrix.asinh(asinhMatrix);
            expect(JSON.stringify(asinh)).assertEqual('[[0.881373587019543,0.48121182505960347],[-1.015973134179692,0.19869011034924142]]');
        });
        it('Matrix.asinh4', 0, () => {
            let asinhMatrix = new Matrix([
                [1.3, 0],
                [1, 1.8],
            ]);
            let asinh = Matrix.asinh(asinhMatrix);
            expect(JSON.stringify(asinh)).assertEqual('[[1.078451058954897,0],[0.881373587019543,1.3504407402749725]]');
        });
        it('Matrix.asinh5', 0, () => {
            let asinhMatrix = new Matrix([
                [0.4, 1.4],
                [1.5, 0.8],
            ]);
            let asinh = Matrix.asinh(asinhMatrix);
            expect(JSON.stringify(asinh)).assertEqual('[[0.39003531977071528,1.1379820462933672],[1.1947632172871094,0.732668256045411]]');
        });
        it('Matrix.asin1', 0, () => {
            let asinMatrix = new Matrix([
                [-1, -0.8],
                [0.5, 0.6],
            ]);
            let asin = Matrix.asin(asinMatrix);
            expect(JSON.stringify(asin))
                .assertEqual('[[-1.5707963267948966,-0.9272952180016123],[0.5235987755982989,0.6435011087932844]]');
        });
        it('Matrix.asin2', 0, () => {
            let asinMatrix = new Matrix([
                [1, 0.1],
                [-0.5, 0.9],
            ]);
            let asin = Matrix.asin(asinMatrix);
            expect(JSON.stringify(asin))
                .assertEqual('[[1.5707963267948966,0.1001674211615598],[-0.5235987755982989,1.1197695149986342]]');
        });
        it('Matrix.asin3', 0, () => {
            let asinMatrix = new Matrix([
                [0.4, 0.7],
                [0.6, -0.8],
            ]);
            let asin = Matrix.asin(asinMatrix);
            expect(JSON.stringify(asin))
                .assertEqual('[[0.41151684606748808,0.775397496610753],[0.6435011087932844,-0.9272952180016123]]');
        });
        it('Matrix.asin4', 0, () => {
            let asinMatrix = [
                [0.1, -0.6],
                [0.2, 0.7],
            ];
            let asin = Matrix.asin(asinMatrix);
            expect(JSON.stringify(asin))
                .assertEqual('[[0.1001674211615598,-0.6435011087932844],[0.2013579207903308,0.775397496610753]]');
        });
        it('Matrix.asin5', 0, () => {
            let asinMatrix = [
                [-1, -0.8],
                [0.5, 0.6],
            ];
            let asin = Matrix.asin(asinMatrix);
            expect(JSON.stringify(asin))
                .assertEqual('[[-1.5707963267948966,-0.9272952180016123],[0.5235987755982989,0.6435011087932844]]');
        });
        it('Matrix.atanh1', 0, () => {
            // atanh
            let atanhMatrix = new Matrix([
                [0.9, 0],
                [-0.8, 0.5],
            ]);
            let atanh = Matrix.atanh(atanhMatrix);
            expect(JSON.stringify(atanh)).assertEqual('[[1.4722194895832204,0],[-1.0986122886681098,0.5493061443340548]]');
        });
        it('Matrix.atanh2', 0, () => {
            // atanh
            let atanhMatrix = new Matrix([
                [0.7, -0.3],
                [0.4, 0.6],
            ]);
            let atanh = Matrix.atanh(atanhMatrix);
            expect(JSON.stringify(atanh)).assertEqual('[[0.8673005276940531,-0.30951960420311176],[0.42364893019360184,0.6931471805599453]]');
        });
        it('Matrix.atanh3', 0, () => {
            // atanh
            let atanhMatrix = [
                [0.5, 0.3],
                [-0.7, 0.4],
            ];
            let atanh = Matrix.atanh(atanhMatrix);
            expect(JSON.stringify(atanh)).assertEqual('[[0.5493061443340548,0.30951960420311176],[-0.8673005276940531,0.42364893019360184]]');
        });
        it('Matrix.atanh4', 0, () => {
            // atanh
            let atanhMatrix = new Matrix([
                [0, 0.1],
                [-0.31, 0.2],
            ]);
            let atanh = Matrix.atanh(atanhMatrix);
            expect(JSON.stringify(atanh)).assertEqual('[[0,0.10033534773107558],[-0.3205454093019461,0.2027325540540822]]');
        });
        it('Matrix.atanh5', 0, () => {
            // atanh
            let atanhMatrix = new Matrix([
                [0.5, 0.8],
                [-0.4, 0.3],
            ]);
            let atanh = Matrix.atanh(atanhMatrix);
            expect(JSON.stringify(atanh)).assertEqual('[[0.5493061443340548,1.0986122886681098],[-0.42364893019360184,0.30951960420311176]]');
        });
        it('Matrix.cbrt1', 0, () => {
            // cbrt
            let cbrtMatrix = new Matrix([
                [-1, 0],
                [1, 2],
            ]);
            let cbrt = Matrix.cbrt(cbrtMatrix);
            expect(JSON.stringify(cbrt)).assertEqual('[[-1,0],[1,1.2599210498948732]]');
        });
        it('Matrix.cbrt2', 0, () => {
            // cbrt
            let cbrtMatrix = [
                [-1.5, 0.8],
                [11, -2],
            ];
            let cbrt = Matrix.cbrt(cbrtMatrix);
            expect(JSON.stringify(cbrt)).assertEqual('[[-1.1447142425533319,0.9283177667225558],[2.2239800905693157,-1.2599210498948732]]');
        });
        it('Matrix.cbrt3', 0, () => {
            // cbrt
            let cbrtMatrix = new Matrix([
                [15, 10],
                [31, 42],
            ]);
            let cbrt = Matrix.cbrt(cbrtMatrix);
            expect(JSON.stringify(cbrt)).assertEqual('[[2.46621207433047,2.154434690031884],[3.1413806523913927,3.4760266448864496]]');
        });
        it('Matrix.cbrt4', 0, () => {
            // cbrt
            let cbrtMatrix = new Matrix([
                [21, 0.5],
                [18, 52],
            ]);
            let cbrt = Matrix.cbrt(cbrtMatrix);
            expect(JSON.stringify(cbrt)).assertEqual('[[2.7589241763811208,0.7937005259840998],[2.6207413942088964,3.732511156817248]]');
        });
        it('Matrix.cbrt5', 0, () => {
            // cbrt
            let cbrtMatrix = [
                [45, 20],
                [18, 62],
            ];
            let cbrt = Matrix.cbrt(cbrtMatrix);
            expect(JSON.stringify(cbrt)).assertEqual('[[3.5568933044900626,2.7144176165949063],[2.6207413942088964,3.9578916096804058]]');
        });
        it('Matrix.ceil1', 0, () => {
            // ceil
            let ceilMatrix = new Matrix([
                [0.95, 4],
                [7.004, -7.004],
            ]);
            let ceil = Matrix.ceil(ceilMatrix);
            expect(JSON.stringify(ceil)).assertEqual('[[1,4],[8,-7]]');
        });
        it('Matrix.ceil2', 0, () => {
            // ceil
            let ceilMatrix = [
                [9.45, 1.44],
                [7.87, -7.87],
            ];
            let ceil = Matrix.ceil(ceilMatrix);
            expect(JSON.stringify(ceil)).assertEqual('[[10,2],[8,-7]]');
        });
        it('Matrix.ceil3', 0, () => {
            // ceil
            let ceilMatrix = [
                [0.95, 2.94],
                [7.004, -7.004],
            ];
            let ceil = Matrix.ceil(ceilMatrix);
            expect(JSON.stringify(ceil)).assertEqual('[[1,3],[8,-7]]');
        });
        it('Matrix.ceil4', 0, () => {
            // ceil
            let ceilMatrix = new Matrix([
                [9.5, 14.45],
                [-17.87, 7.01],
            ]);
            let ceil = Matrix.ceil(ceilMatrix);
            expect(JSON.stringify(ceil)).assertEqual('[[10,15],[-17,8]]');
        });
        it('Matrix.ceil5', 0, () => {
            // ceil
            let ceilMatrix = new Matrix([
                [1.58, 4.71],
                [2.64, -3.18],
            ]);
            let ceil = Matrix.ceil(ceilMatrix);
            expect(JSON.stringify(ceil)).assertEqual('[[2,5],[3,-3]]');
        });
        it('Matrix.clz321', 0, () => {
            // clz32
            let clz32Matrix = new Matrix([
                [1, 1000],
                [3.5, 0],
            ]);
            let clz32 = Matrix.clz32(clz32Matrix);
            expect(JSON.stringify(clz32)).assertEqual('[[31,22],[30,32]]');
        });
        it('Matrix.clz322', 0, () => {
            // clz32
            let clz32Matrix = new Matrix([
                [15, 10],
                [-35, 0.9],
            ]);
            let clz32 = Matrix.clz32(clz32Matrix);
            expect(JSON.stringify(clz32)).assertEqual('[[28,28],[0,32]]');
        });
        it('Matrix.clz323', 0, () => {
            // clz32
            let clz32Matrix = [
                [21, 18],
                [25, 20],
            ];
            let clz32 = Matrix.clz32(clz32Matrix);
            expect(JSON.stringify(clz32)).assertEqual('[[27,27],[27,27]]');
        });
        it('Matrix.clz324', 0, () => {
            // clz32
            let clz32Matrix = new Matrix([
                [25, 30],
                [50, 0.8],
            ]);
            let clz32 = Matrix.clz32(clz32Matrix);
            expect(JSON.stringify(clz32)).assertEqual('[[27,27],[26,32]]');
        });
        it('Matrix.clz325', 0, () => {
            // clz32
            let clz32Matrix = new Matrix([
                [24, -32],
                [5, 9],
            ]);
            let clz32 = Matrix.clz32(clz32Matrix);
            expect(JSON.stringify(clz32)).assertEqual('[[27,0],[29,28]]');
        });
        it('Matrix.cos1', 0, () => {
            // cos
            let cosMatrix = new Matrix([
                [0, 1],
                [Math.PI, 2 * Math.PI],
            ]);
            let cos = Matrix.cos(cosMatrix);
            expect(JSON.stringify(cos)).assertEqual('[[1,0.5403023058681398],[-1,1]]');
        });
        it('Matrix.cos2', 0, () => {
            // cos
            let cosMatrix = [
                [30, 21],
                [Math.PI, Math.PI / 2],
            ];
            let cos = Matrix.cos(cosMatrix);
            expect(JSON.stringify(cos)).assertEqual('[[0.15425144988758404,-0.5477292602242684],[-1,6.123233995736766e-17]]');
        });
        it('Matrix.cos3', 0, () => {
            // cos
            let cosMatrix = new Matrix([
                [22, 18],
                [32, -Math.PI / 3],
            ]);
            let cos = Matrix.cos(cosMatrix);
            expect(JSON.stringify(cos)).assertEqual('[[-0.9999608263946371,0.6603167082440802],[0.8342233605065102,0.5000000000000001]]');
        });
        it('Matrix.cos4', 0, () => {
            // cos
            let cosMatrix = new Matrix([
                [15, 55],
                [Math.PI * 1.5, 1.2 * Math.PI],
            ]);
            let cos = Matrix.cos(cosMatrix);
            expect(JSON.stringify(cos)).assertEqual('[[-0.7596879128588213,0.022126756261955736],[-1.8369701987210297e-16,-0.8090169943749475]]');
        });
        it('Matrix.cos5', 0, () => {
            // cos
            let cosMatrix = new Matrix([
                [35, 41],
                [0, -Math.PI],
            ]);
            let cos = Matrix.cos(cosMatrix);
            expect(JSON.stringify(cos)).assertEqual('[[-0.9036922050915067,-0.9873392775238264],[1,-1]]');
        });
        it('Matrix.cosh1', 0, () => {
            // cosh
            let coshMatrix = new Matrix([
                [0, -1],
                [1, 0.5],
            ]);
            let cosh = Matrix.cosh(coshMatrix);
            expect(JSON.stringify(cosh)).assertEqual('[[1,1.5430806348152437],[1.5430806348152437,1.1276259652063807]]');
        });
        it('Matrix.cosh2', 0, () => {
            // cosh
            let coshMatrix = new Matrix([
                [0.8, -0.5],
                [0.2, 1],
            ]);
            let cosh = Matrix.cosh(coshMatrix);
            expect(JSON.stringify(cosh)).assertEqual('[[1.3374349463048447,1.1276259652063807],[1.020066755619076,1.5430806348152437]]');
        });
        it('Matrix.cosh3', 0, () => {
            // cosh
            let coshMatrix = [
                [-0.9, 1],
                [0.8, 0.2],
            ];
            let cosh = Matrix.cosh(coshMatrix);
            expect(JSON.stringify(cosh)).assertEqual('[[1.4330863854487745,1.5430806348152437],[1.3374349463048447,1.020066755619076]]');
        });
        it('Matrix.cosh4', 0, () => {
            // cosh
            let coshMatrix = new Matrix([
                [0.8, 0.18],
                [0.25, 0.6],
            ]);
            let cosh = Matrix.cosh(coshMatrix);
            expect(JSON.stringify(cosh)).assertEqual('[[1.3374349463048447,1.016243787266541],[1.0314130998795732,1.1854652182422676]]');
        });
        it('Matrix.cosh5', 0, () => {
            // cosh
            let coshMatrix = new Matrix([
                [0.9, 0],
                [0.45, -0.3],
            ]);
            let cosh = Matrix.cosh(coshMatrix);
            expect(JSON.stringify(cosh)).assertEqual('[[1.4330863854487745,1],[1.102970168555971,1.0453385141288605]]');
        });
        it('Matrix.exp1', 0, () => {
            // exp
            let expMatrix = new Matrix([
                [-1, 0],
                [1, 0.5],
            ]);
            let exp = Matrix.exp(expMatrix);
            expect(JSON.stringify(exp)).assertEqual('[[0.36787944117144232,1],[2.718281828459045,1.6487212707001282]]');
        });
        it('Matrix.exp2', 0, () => {
            // exp
            let expMatrix = new Matrix([
                [0.8, 0.9],
                [-0.1, 1],
            ]);
            let exp = Matrix.exp(expMatrix);
            expect(JSON.stringify(exp)).assertEqual('[[2.225540928492468,2.45960311115695],[0.9048374180359595,2.718281828459045]]');
        });
        it('Matrix.exp3', 0, () => {
            // exp
            let expMatrix = new Matrix([
                [1, 0.8],
                [-1, 0.6],
            ]);
            let exp = Matrix.exp(expMatrix);
            expect(JSON.stringify(exp)).assertEqual('[[2.718281828459045,2.225540928492468],[0.36787944117144232,1.8221188003905089]]');
        });
        it('Matrix.exp4', 0, () => {
            // exp
            let expMatrix = new Matrix([
                [0.6, 0],
                [0.4, 0.3],
            ]);
            let exp = Matrix.exp(expMatrix);
            expect(JSON.stringify(exp)).assertEqual('[[1.8221188003905089,1],[1.4918246976412703,1.3498588075760032]]');
        });
        it('Matrix.exp5', 0, () => {
            // exp
            let expMatrix = [
                [-1, 0],
                [1, 0.5],
            ];
            let exp = Matrix.exp(expMatrix);
            expect(JSON.stringify(exp)).assertEqual('[[0.36787944117144232,1],[2.718281828459045,1.6487212707001282]]');
        });
        it('Matrix.expm11', 0, () => {
            // expm1
            let expm1Matrix = new Matrix([
                [-1, 0],
                [0.5, 1],
            ]);
            let expm1 = Matrix.expm1(expm1Matrix);
            expect(JSON.stringify(expm1)).assertEqual('[[-0.6321205588285577,0],[0.6487212707001282,1.718281828459045]]');
        });
        it('Matrix.expm12', 0, () => {
            // expm1
            let expm1Matrix = new Matrix([
                [0.8, 0.2],
                [0, -0.6],
            ]);
            let expm1 = Matrix.expm1(expm1Matrix);
            expect(JSON.stringify(expm1)).assertEqual('[[1.2255409284924677,0.22140275816016985],[0,-0.45118836390597356]]');
        });
        it('Matrix.expm13', 0, () => {
            // expm1
            let expm1Matrix = new Matrix([
                [-0.6, 0.5],
                [1, 0.1],
            ]);
            let expm1 = Matrix.expm1(expm1Matrix);
            expect(JSON.stringify(expm1)).assertEqual('[[-0.45118836390597356,0.6487212707001282],[1.718281828459045,0.10517091807564763]]');
        });
        it('Matrix.expm14', 0, () => {
            // expm1
            let expm1Matrix = new Matrix([
                [0.5, 1],
                [0.6, -0.9],
            ]);
            let expm1 = Matrix.expm1(expm1Matrix);
            expect(JSON.stringify(expm1)).assertEqual('[[0.6487212707001282,1.718281828459045],[0.8221188003905089,-0.5934303402594009]]');
        });
        it('Matrix.expm15', 0, () => {
            // expm1
            let expm1Matrix = [
                [-1, 0],
                [0.5, 1],
            ];
            let expm1 = Matrix.expm1(expm1Matrix);
            expect(JSON.stringify(expm1)).assertEqual('[[-0.6321205588285577,0],[0.6487212707001282,1.718281828459045]]');
        });
        it('Matrix.floor1', 0, () => {
            // floor
            let floorMatrix = new Matrix([
                [5.95, 5.05],
                [5, -5.05],
            ]);
            let floor = Matrix.floor(floorMatrix);
            expect(JSON.stringify(floor)).assertEqual('[[5,5],[5,-6]]');
        });
        it('Matrix.floor2', 0, () => {
            // floor
            let floorMatrix = [
                [5.95, 5.05],
                [5, -5.05],
            ];
            let floor = Matrix.floor(floorMatrix);
            expect(JSON.stringify(floor)).assertEqual('[[5,5],[5,-6]]');
        });
        it('Matrix.floor3', 0, () => {
            // floor
            let floorMatrix = new Matrix([
                [-5.95, 1.45],
                [5.3, 2.75],
            ]);
            let floor = Matrix.floor(floorMatrix);
            expect(JSON.stringify(floor)).assertEqual('[[-6,1],[5,2]]');
        });
        it('Matrix.floor4', 0, () => {
            // floor
            let floorMatrix = new Matrix([
                [1.5, 24.65],
                [1.89, 3.75],
            ]);
            let floor = Matrix.floor(floorMatrix);
            expect(JSON.stringify(floor)).assertEqual('[[1,24],[1,3]]');
        });
        it('Matrix.floor5', 0, () => {
            // floor
            let floorMatrix = new Matrix([
                [9.5, -8.35],
                [7.25, 6.85],
            ]);
            let floor = Matrix.floor(floorMatrix);
            expect(JSON.stringify(floor)).assertEqual('[[9,-9],[7,6]]');
        });
        it('Matrix.fround1', 0, () => {
            // fround
            let froundMatrix = new Matrix([
                [1.5, 1.337],
                [2 ** 150, 0],
            ]);
            let fround = Matrix.fround(froundMatrix);
            expect(JSON.stringify(fround)).assertEqual('[[1.5,1.3370000123977661],[null,0]]');
        });
        it('Matrix.fround2', 0, () => {
            // fround
            let froundMatrix = new Matrix([
                [-1.5, 1.37],
                [2 * 150, 0.76],
            ]);
            let fround = Matrix.fround(froundMatrix);
            expect(JSON.stringify(fround)).assertEqual('[[-1.5,1.3700000047683716],[300,0.7599999904632568]]');
        });
        it('Matrix.fround3', 0, () => {
            // fround
            let froundMatrix = new Matrix([
                [0.75, -2.247],
                [150, 10],
            ]);
            let fround = Matrix.fround(froundMatrix);
            expect(JSON.stringify(fround)).assertEqual('[[0.75,-2.246999979019165],[150,10]]');
        });
        it('Matrix.fround4', 0, () => {
            // fround
            let froundMatrix = new Matrix([
                [1.83, 4.638],
                [-1.51, 1],
            ]);
            let fround = Matrix.fround(froundMatrix);
            expect(JSON.stringify(fround)).assertEqual('[[1.8300000429153442,4.638000011444092],[-1.5099999904632568,1]]');
        });
        it('Matrix.fround5', 0, () => {
            // fround
            let froundMatrix = [
                [1.5, 1.337],
                [2 ** 150, 0],
            ];
            let fround = Matrix.fround(froundMatrix);
            expect(JSON.stringify(fround)).assertEqual('[[1.5,1.3370000123977661],[null,0]]');
        });
        it('Matrix.log1', 0, () => {
            // log
            let logMatrix = new Matrix([
                [-1, 0],
                [1, 10],
            ]);
            let log = Matrix.log(logMatrix);
            expect(JSON.stringify(log)).assertEqual('[[null,null],[0,2.302585092994046]]');
        });
        it('Matrix.log2', 0, () => {
            // log
            let logMatrix = new Matrix([
                [4, 8],
                [9, 100],
            ]);
            let log = Matrix.log(logMatrix);
            expect(JSON.stringify(log)).assertEqual('[[1.3862943611198906,2.0794415416798357],[2.1972245773362196,4.605170185988092]]');
        });
        it('Matrix.log3', 0, () => {
            // log
            let logMatrix = new Matrix([
                [16, 40],
                [81, 49],
            ]);
            let log = Matrix.log(logMatrix);
            expect(JSON.stringify(log)).assertEqual('[[2.772588722239781,3.6888794541139363],[4.394449154672439,3.8918202981106265]]');
        });
        it('Matrix.log4', 0, () => {
            // log
            let logMatrix = new Matrix([
                [36, 25],
                [72, 35],
            ]);
            let log = Matrix.log(logMatrix);
            expect(JSON.stringify(log)).assertEqual('[[3.58351893845611,3.2188758248682006],[4.276666119016055,3.5553480614894135]]');
        });
        it('Matrix.log5', 0, () => {
            // log
            let logMatrix = [
                [-1, 0],
                [1, 10],
            ];
            let log = Matrix.log(logMatrix);
            expect(JSON.stringify(log)).assertEqual('[[null,null],[0,2.302585092994046]]');
        });
        it('Matrix.log1p0', 0, () => {
            // log1p
            let log1pMatrix = new Matrix([
                [0, -1],
                [2, 4],
            ]);
            let log1p = Matrix.log1p(log1pMatrix);
            expect(JSON.stringify(log1p)).assertEqual('[[0,null],[1.0986122886681096,1.6094379124341003]]');
        });
        it('Matrix.log1p1', 0, () => {
            // log1p
            let log1pMatrix = new Matrix([
                [100, 81],
                [8, 16],
            ]);
            let log1p = Matrix.log1p(log1pMatrix);
            expect(JSON.stringify(log1p)).assertEqual('[[4.61512051684126,4.406719247264253],[2.1972245773362196,2.833213344056216]]');
        });
        it('Matrix.log1p2', 0, () => {
            // log1p
            let log1pMatrix = new Matrix([
                [9, -36],
                [32, 49],
            ]);
            let log1p = Matrix.log1p(log1pMatrix);
            expect(JSON.stringify(log1p)).assertEqual('[[2.302585092994046,null],[3.4965075614664802,3.912023005428146]]');
        });
        it('Matrix.log1p3', 0, () => {
            // log1p
            let log1pMatrix = new Matrix([
                [18, -25],
                [24, 16],
            ]);
            let log1p = Matrix.log1p(log1pMatrix);
            expect(JSON.stringify(log1p)).assertEqual('[[2.9444389791664403,null],[3.2188758248682006,2.833213344056216]]');
        });
        it('Matrix.log1p4', 0, () => {
            // log1p
            let log1pMatrix = new Matrix([
                [10, 1],
                [36, 35],
            ]);
            let log1p = Matrix.log1p(log1pMatrix);
            expect(JSON.stringify(log1p)).assertEqual('[[2.3978952727983707,0.6931471805599453],[3.6109179126442243,3.58351893845611]]');
        });
        it('Matrix.log1p5', 0, () => {
            // log1p
            let log1pMatrix = new Matrix([
                [0.9, 24],
                [32, 8],
            ]);
            let log1p = Matrix.log1p(log1pMatrix);
            expect(JSON.stringify(log1p)).assertEqual('[[0.6418538861723948,3.2188758248682006],[3.4965075614664802,2.1972245773362196]]');
        });
        it('Matrix.log101', 0, () => {
            // log10
            let log10Matrix = new Matrix([
                [10, 100],
                [1, 0],
            ]);
            let log10 = Matrix.log10(log10Matrix);
            expect(JSON.stringify(log10)).assertEqual('[[1,2],[0,null]]');
        });
        it('Matrix.log102', 0, () => {
            // log10
            let log10Matrix = new Matrix([
                [10, 100],
                [40, 1000],
            ]);
            let log10 = Matrix.log10(log10Matrix);
            expect(JSON.stringify(log10)).assertEqual('[[1,2],[1.6020599913279623,3]]');
        });
        it('Matrix.log103', 0, () => {
            // log10
            let log10Matrix = new Matrix([
                [100, 80],
                [900, 30],
            ]);
            let log10 = Matrix.log10(log10Matrix);
            expect(JSON.stringify(log10)).assertEqual('[[2,1.9030899869919435],[2.9542425094393248,1.4771212547196624]]');
        });
        it('Matrix.log104', 0, () => {
            // log10
            let log10Matrix = new Matrix([
                [400, 10],
                [1, 100],
            ]);
            let log10 = Matrix.log10(log10Matrix);
            expect(JSON.stringify(log10)).assertEqual('[[2.6020599913279625,1],[0,2]]');
        });
        it('Matrix.log105', 0, () => {
            // log10
            let log10Matrix = new Matrix([
                [100, 300],
                [500, 1],
            ]);
            let log10 = Matrix.log10(log10Matrix);
            expect(JSON.stringify(log10)).assertEqual('[[2,2.4771212547196626],[2.6989700043360187,0]]');
        });
        it('Matrix.log21', 0, () => {
            // log2
            let log2Matrix = new Matrix([
                [2, 1024],
                [1, 0],
            ]);
            let log2 = Matrix.log2(log2Matrix);
            expect(JSON.stringify(log2)).assertEqual('[[1,10],[0,null]]');
        });
        it('Matrix.log22', 0, () => {
            // log2
            let log2Matrix = [
                [2, 1024],
                [1, 0],
            ];
            let log2 = Matrix.log2(log2Matrix);
            expect(JSON.stringify(log2)).assertEqual('[[1,10],[0,null]]');
        });
        it('Matrix.log23', 0, () => {
            // log2
            let log2Matrix = new Matrix([
                [4, 16],
                [32, 80],
            ]);
            let log2 = Matrix.log2(log2Matrix);
            expect(JSON.stringify(log2)).assertEqual('[[2,4],[5,6.321928094887363]]');
        });
        it('Matrix.log24', 0, () => {
            // log2
            let log2Matrix = new Matrix([
                [64, 128],
                [512, 2],
            ]);
            let log2 = Matrix.log2(log2Matrix);
            expect(JSON.stringify(log2)).assertEqual('[[6,7],[9,1]]');
        });
        it('Matrix.log25', 0, () => {
            // log2
            let log2Matrix = new Matrix([
                [8, 1024],
                [2, 64],
            ]);
            let log2 = Matrix.log2(log2Matrix);
            expect(JSON.stringify(log2)).assertEqual('[[3,10],[1,6]]');
        });
        it('Matrix.round1', 0, () => {
            // round
            let roundMatrix = new Matrix([
                [20.49, 20.5],
                [-20.5, -20.5],
            ]);
            let round = Matrix.round(roundMatrix);
            expect(JSON.stringify(round)).assertEqual('[[20,21],[-20,-20]]');
        });
        it('Matrix.round2', 0, () => {
            // round
            let roundMatrix = new Matrix([
                [12.49, -23.54],
                [20.65, 30.35],
            ]);
            let round = Matrix.round(roundMatrix);
            expect(JSON.stringify(round)).assertEqual('[[12,-24],[21,30]]');
        });
        it('Matrix.round3', 0, () => {
            // round
            let roundMatrix = new Matrix([
                [16.59, 20.45],
                [34.85, 0.25],
            ]);
            let round = Matrix.round(roundMatrix);
            expect(JSON.stringify(round)).assertEqual('[[17,20],[35,0]]');
        });
        it('Matrix.round4', 0, () => {
            // round
            let roundMatrix = new Matrix([
                [45.79, 16.15],
                [23.95, 20.25],
            ]);
            let round = Matrix.round(roundMatrix);
            expect(JSON.stringify(round)).assertEqual('[[46,16],[24,20]]');
        });
        it('Matrix.round5', 0, () => {
            // round
            let roundMatrix = new Matrix([
                [2.79, 28.35],
                [2.55, 0.85],
            ]);
            let round = Matrix.round(roundMatrix);
            expect(JSON.stringify(round)).assertEqual('[[3,28],[3,1]]');
        });
        it('Matrix.sign1', 0, () => {
            // sign
            let signMatrix = new Matrix([
                [3, 0],
                [0, -3],
            ]);
            let sign = Matrix.sign(signMatrix);
            expect(JSON.stringify(sign)).assertEqual('[[1,0],[0,-1]]');
        });
        it('Matrix.sign2', 0, () => {
            // sign
            let signMatrix = new Matrix([
                [30, 1],
                [45, 30],
            ]);
            let sign = Matrix.sign(signMatrix);
            expect(JSON.stringify(sign)).assertEqual('[[1,1],[1,1]]');
        });
        it('Matrix.sign3', 0, () => {
            // sign
            let signMatrix = new Matrix([
                [90, 30],
                [180, 60],
            ]);
            let sign = Matrix.sign(signMatrix);
            expect(JSON.stringify(sign)).assertEqual('[[1,1],[1,1]]');
        });
        it('Matrix.sign4', 0, () => {
            // sign
            let signMatrix = new Matrix([
                [30, 60],
                [145, 45],
            ]);
            let sign = Matrix.sign(signMatrix);
            expect(JSON.stringify(sign)).assertEqual('[[1,1],[1,1]]');
        });
        it('Matrix.sign5', 0, () => {
            // sign
            let signMatrix = new Matrix([
                [60, 90],
                [-90, 80],
            ]);
            let sign = Matrix.sign(signMatrix);
            expect(JSON.stringify(sign)).assertEqual('[[1,1],[-1,1]]');
        });
        it('Matrix.sin1', 0, () => {
            // sin
            let sinMatrix = new Matrix([
                [1, 0],
                [Math.PI / 2, -1],
            ]);
            let sin = Matrix.sin(sinMatrix);
            expect(JSON.stringify(sin)).assertEqual('[[0.8414709848078965,0],[1,-0.8414709848078965]]');
        });
        it('Matrix.sin2', 0, () => {
            // sin
            let sinMatrix = new Matrix([
                [45, 90],
                [Math.PI / 3, 60],
            ]);
            let sin = Matrix.sin(sinMatrix);
            expect(JSON.stringify(sin)).assertEqual('[[0.8509035245341184,0.8939966636005579],[0.8660254037844386,-0.3048106211022167]]');
        });
        it('Matrix.sin3', 0, () => {
            // sin
            let sinMatrix = new Matrix([
                [-60, 45],
                [-Math.PI / 3, 90],
            ]);
            let sin = Matrix.sin(sinMatrix);
            expect(JSON.stringify(sin)).assertEqual('[[0.3048106211022167,0.8509035245341184],[-0.8660254037844386,0.8939966636005579]]');
        });
        it('Matrix.sin4', 0, () => {
            // sin
            let sinMatrix = new Matrix([
                [18, 10],
                [Math.PI, 30],
            ]);
            let sin = Matrix.sin(sinMatrix);
            expect(JSON.stringify(sin)).assertEqual('[[-0.7509872467716762,-0.5440211108893698],[1.2246467991473532e-16,-0.9880316240928618]]');
        });
        it('Matrix.sin5', 0, () => {
            // sin
            let sinMatrix = [
                [1, 0],
                [Math.PI / 2, -1],
            ];
            let sin = Matrix.sin(sinMatrix);
            expect(JSON.stringify(sin)).assertEqual('[[0.8414709848078965,0],[1,-0.8414709848078965]]');
        });
        it('Matrix.sinh1', 0, () => {
            // sinh
            let sinhMatrix = new Matrix([
                [1, 0],
                [Math.PI / 2, -1],
            ]);
            let sinh = Matrix.sinh(sinhMatrix);
            expect(JSON.stringify(sinh)).assertEqual('[[1.1752011936438014,0],[2.3012989023072947,-1.1752011936438014]]');
        });
        it('Matrix.sinh2', 0, () => {
            // sinh
            let sinhMatrix = [
                [1, 0],
                [Math.PI / 2, -1],
            ];
            let sinh = Matrix.sinh(sinhMatrix);
            expect(JSON.stringify(sinh)).assertEqual('[[1.1752011936438014,0],[2.3012989023072947,-1.1752011936438014]]');
        });
        it('Matrix.sinh3', 0, () => {
            // sinh
            let sinhMatrix = new Matrix([
                [0.9, 0.8],
                [Math.PI / 3, -0.8],
            ]);
            let sinh = Matrix.sinh(sinhMatrix);
            expect(JSON.stringify(sinh)).assertEqual('[[1.0265167257081753,0.888105982187623],[1.2493670505239751,-0.888105982187623]]');
        });
        it('Matrix.sinh4', 0, () => {
            // sinh
            let sinhMatrix = new Matrix([
                [0.5, -0.7],
                [1, -0.5],
            ]);
            let sinh = Matrix.sinh(sinhMatrix);
            expect(JSON.stringify(sinh)).assertEqual('[[0.5210953054937474,-0.7585837018395334],[1.1752011936438014,-0.5210953054937474]]');
        });
        it('Matrix.sinh5', 0, () => {
            // sinh
            let sinhMatrix = new Matrix([
                [0.6, 0.8],
                [-0.4, 0.3],
            ]);
            let sinh = Matrix.sinh(sinhMatrix);
            expect(JSON.stringify(sinh)).assertEqual('[[0.6366535821482412,0.888105982187623],[-0.4107523258028155,0.3045202934471426]]');
        });
        it('Matrix.sqrt1', 0, () => {
            // sqrt
            let sqrtMatrix = new Matrix([
                [9, 2],
                [1, 0],
            ]);
            let sqrt = Matrix.sqrt(sqrtMatrix);
            expect(JSON.stringify(sqrt)).assertEqual('[[3,1.4142135623730951],[1,0]]');
        });
        it('Matrix.sqrt2', 0, () => {
            // sqrt
            let sqrtMatrix = [
                [9, 2],
                [1, 0],
            ];
            let sqrt = Matrix.sqrt(sqrtMatrix);
            expect(JSON.stringify(sqrt)).assertEqual('[[3,1.4142135623730951],[1,0]]');
        });
        it('Matrix.sqrt3', 0, () => {
            // sqrt
            let sqrtMatrix = new Matrix([
                [16, 4],
                [81, 25],
            ]);
            let sqrt = Matrix.sqrt(sqrtMatrix);
            expect(JSON.stringify(sqrt)).assertEqual('[[4,2],[9,5]]');
        });
        it('Matrix.sqrt4', 0, () => {
            // sqrt
            let sqrtMatrix = new Matrix([
                [16, 36],
                [8, 100],
            ]);
            let sqrt = Matrix.sqrt(sqrtMatrix);
            expect(JSON.stringify(sqrt)).assertEqual('[[4,6],[2.8284271247461903,10]]');
        });
        it('Matrix.sqrt5', 0, () => {
            // sqrt
            let sqrtMatrix = new Matrix([
                [900, 16],
                [25, 49],
            ]);
            let sqrt = Matrix.sqrt(sqrtMatrix);
            expect(JSON.stringify(sqrt)).assertEqual('[[30,4],[5,7]]');
        });
        it('Matrix.tan1', 0, () => {
            // tan
            let tanMatrix = new Matrix([
                [1, 0],
                [2, -1],
            ]);
            let tan = Matrix.tan(tanMatrix);
            expect(JSON.stringify(tan)).assertEqual('[[1.5574077246549023,0],[-2.185039863261519,-1.5574077246549023]]');
        });
        it('Matrix.tan2', 0, () => {
            // tan
            let tanMatrix = [
                [1, 0],
                [0.8, -1],
            ];
            let tan = Matrix.tan(tanMatrix);
            expect(JSON.stringify(tan)).assertEqual('[[1.5574077246549023,0],[1.0296385570503641,-1.5574077246549023]]');
        });
        it('Matrix.tan3', 0, () => {
            // tan
            let tanMatrix = new Matrix([
                [1.3, 0.9],
                [0.4, 1],
            ]);
            let tan = Matrix.tan(tanMatrix);
            expect(JSON.stringify(tan)).assertEqual('[[3.6021024479679786,1.2601582175503392],[0.4227932187381618,1.5574077246549023]]');
        });
        it('Matrix.tan4', 0, () => {
            // tan
            let tanMatrix = new Matrix([
                [0.8, 0.6],
                [-0.5, 1.2],
            ]);
            let tan = Matrix.tan(tanMatrix);
            expect(JSON.stringify(tan)).assertEqual('[[1.0296385570503641,0.6841368083416923],[-0.5463024898437905,2.5721516221263188]]');
        });
        it('Matrix.tan5', 0, () => {
            // tan
            let tanMatrix = new Matrix([
                [1, 0],
                [0.7, 0.4],
            ]);
            let tan = Matrix.tan(tanMatrix);
            expect(JSON.stringify(tan)).assertEqual('[[1.5574077246549023,0],[0.8422883804630794,0.4227932187381618]]');
        });
        it('Matrix.tanh1', 0, () => {
            // tanh
            let tanhMatrix = new Matrix([
                [1, 0],
                [Math.PI / 2, -1],
            ]);
            let tanh = Matrix.tanh(tanhMatrix);
            expect(JSON.stringify(tanh)).assertEqual('[[0.7615941559557649,0],[0.9171523356672744,-0.7615941559557649]]');
        });
        it('Matrix.tanh2', 0, () => {
            // tanh
            let tanhMatrix = new Matrix([
                [1.5, 0.45],
                [Math.PI / 3, 2.8],
            ]);
            let tanh = Matrix.tanh(tanhMatrix);
            expect(JSON.stringify(tanh)).assertEqual('[[0.9051482536448664,0.42189900525000795],[0.7807144353592677,0.992631520201128]]');
        });
        it('Matrix.tanh3', 0, () => {
            // tanh
            let tanhMatrix = new Matrix([
                [0.8, 0.9],
                [1, -0.6],
            ]);
            let tanh = Matrix.tanh(tanhMatrix);
            expect(JSON.stringify(tanh)).assertEqual('[[0.6640367702678489,0.7162978701990245],[0.7615941559557649,-0.5370495669980353]]');
        });
        it('Matrix.tanh4', 0, () => {
            // tanh
            let tanhMatrix = new Matrix([
                [1.56, 0.7],
                [2, -1.67],
            ]);
            let tanh = Matrix.tanh(tanhMatrix);
            expect(JSON.stringify(tanh)).assertEqual('[[0.9154204563159324,0.6043677771171634],[0.9640275800758169,-0.9315516846152082]]');
        });
        it('Matrix.tanh5', 0, () => {
            // tanh
            let tanhMatrix = new Matrix([
                [1.34, 0.6],
                [-0.3, 0.5],
            ]);
            let tanh = Matrix.tanh(tanhMatrix);
            expect(JSON.stringify(tanh)).assertEqual('[[0.8716722471896521,0.5370495669980353],[-0.29131261245159084,0.46211715726000976]]');
        });
        it('Matrix.trunc1', 0, () => {
            // trunc
            let truncMatrix = new Matrix([
                [13.37, 42.84],
                [-0.123, -1.123],
            ]);
            let trunc = Matrix.trunc(truncMatrix);
            expect(JSON.stringify(trunc)).assertEqual('[[13,42],[0,-1]]');
        });
        it('Matrix.trunc2', 0, () => {
            // trunc
            let truncMatrix = [
                [13.37, 42.84],
                [-0.123, -1.123],
            ];
            let trunc = Matrix.trunc(truncMatrix);
            expect(JSON.stringify(trunc)).assertEqual('[[13,42],[0,-1]]');
        });
        it('Matrix.trunc3', 0, () => {
            // trunc
            let truncMatrix = new Matrix([
                [-13.87, 42.34],
                [1.23, 5.73],
            ]);
            let trunc = Matrix.trunc(truncMatrix);
            expect(JSON.stringify(trunc)).assertEqual('[[-13,42],[1,5]]');
        });
        it('Matrix.trunc4', 0, () => {
            // trunc
            let truncMatrix = new Matrix([
                [23.47, 4.64],
                [8.63, 23.83],
            ]);
            let trunc = Matrix.trunc(truncMatrix);
            expect(JSON.stringify(trunc)).assertEqual('[[23,4],[8,23]]');
        });
        it('Matrix.trunc5', 0, () => {
            // trunc
            let truncMatrix = new Matrix([
                [19.73, 2.24],
                [10.46, 34.93],
            ]);
            let trunc = Matrix.trunc(truncMatrix);
            expect(JSON.stringify(trunc)).assertEqual('[[19,2],[10,34]]');
        });
        it('Aabs1', 0, () => {
            // abs
            let absMatrix = new Matrix([
                [1, 2],
                [-3, -4],
            ]);
            let abs = absMatrix.abs();
            expect(JSON.stringify(abs)).assertEqual('[[1,2],[3,4]]');
        });
        it('Aabs2', 0, () => {
            // abs
            let absMatrix = new Matrix([
                [-34, -2],
                [-13, -24],
            ]);
            let abs = absMatrix.abs();
            expect(JSON.stringify(abs)).assertEqual('[[34,2],[13,24]]');
        });
        it('Aabs3', 0, () => {
            // abs
            let absMatrix = new Matrix([
                [11, -19],
                [-32, -41],
            ]);
            let abs = absMatrix.abs();
            expect(JSON.stringify(abs)).assertEqual('[[11,19],[32,41]]');
        });
        it('Aabs4', 0, () => {
            // abs
            let absMatrix = new Matrix([
                [-15, -42],
                [-35, -44],
            ]);
            let abs = absMatrix.abs();
            expect(JSON.stringify(abs)).assertEqual('[[15,42],[35,44]]');
        });
        it('Aabs5', 0, () => {
            // abs
            let absMatrix = new Matrix([
                [13, 62],
                [-63, -14],
            ]);
            let abs = absMatrix.abs();
            expect(JSON.stringify(abs)).assertEqual('[[13,62],[63,14]]');
        });
        it('acos1', 0, () => {
            // acos
            let acosMatrix = new Matrix([
                [-1, -0.8],
                [0.5, 0.6],
            ]);
            let acos = acosMatrix.acos();
            expect(JSON.stringify(acos))
                .assertEqual('[[3.141592653589793,2.498091544796509],[1.0471975511965979,0.9272952180016123]]');
        });
        it('acos2', 0, () => {
            // acos
            let acosMatrix = new Matrix([
                [1, 0.8],
                [0.9, 0.4],
            ]);
            let acos = acosMatrix.acos();
            expect(JSON.stringify(acos))
                .assertEqual('[[0,0.6435011087932843],[0.45102681179626236,1.1592794807274085]]');
        });
        it('acos3', 0, () => {
            // acos
            let acosMatrix = new Matrix([
                [0.3, 0.48],
                [0.2, 0.1],
            ]);
            let acos = acosMatrix.acos();
            expect(JSON.stringify(acos))
                .assertEqual('[[1.2661036727794992,1.0701416143903084],[1.369438406004566,1.4706289056333368]]');
        });
        it('acos4', 0, () => {
            // acos
            let acosMatrix = new Matrix([
                [0.4, 0.2],
                [0.5, 0.6],
            ]);
            let acos = acosMatrix.acos();
            expect(JSON.stringify(acos))
                .assertEqual('[[1.1592794807274085,1.369438406004566],[1.0471975511965979,0.9272952180016123]]');
        });
        it('acos5', 0, () => {
            // acos
            let acosMatrix = new Matrix([
                [0.3, 0.9],
                [0.1, 0.2],
            ]);
            let acos = acosMatrix.acos();
            expect(JSON.stringify(acos))
                .assertEqual('[[1.2661036727794992,0.45102681179626236],[1.4706289056333368,1.369438406004566]]');
        });
        it('acosh1', 0, () => {
            // acosh
            let acoshMatrix = new Matrix([
                [1, 1.8],
                [2, 10],
            ]);
            let acosh = acoshMatrix.acosh();
            expect(JSON.stringify(acosh)).assertEqual('[[0,1.1929107309930491],[1.3169578969248166,2.993222846126381]]');
        });
        it('acosh2', 0, () => {
            // acosh
            let acoshMatrix = new Matrix([
                [1.8, 1.2],
                [3, 1],
            ]);
            let acosh = acoshMatrix.acosh();
            expect(JSON.stringify(acosh)).assertEqual('[[1.1929107309930491,0.6223625037147786],[1.762747174039086,0]]');
        });
        it('acosh3', 0, () => {
            // acosh
            let acoshMatrix = new Matrix([
                [1, 1.9],
                [1.4, 1.6],
            ]);
            let acosh = acoshMatrix.acosh();
            expect(JSON.stringify(acosh)).assertEqual('[[0,1.2571958266003804],[0.867014726490565,1.0469679150031883]]');
        });
        it('acosh4', 0, () => {
            // acosh
            let acoshMatrix = new Matrix([
                [1.1, 1.5],
                [2.5, 1.4],
            ]);
            let acosh = acoshMatrix.acosh();
            expect(JSON.stringify(acosh)).assertEqual('[[0.4435682543851154,0.9624236501192069],[1.566799236972411,0.867014726490565]]');
        });
        it('acosh5', 0, () => {
            // acosh
            let acoshMatrix = new Matrix([
                [2.1, 1.5],
                [2.4, 1.8],
            ]);
            let acosh = acoshMatrix.acosh();
            expect(JSON.stringify(acosh)).assertEqual('[[1.37285914424258,0.9624236501192069],[1.5220793674636532,1.1929107309930491]]');
        });
        it('asin1', 0, () => {
            // asin
            let asinMatrix = new Matrix([
                [-1, -0.8],
                [0.5, 0.6],
            ]);
            let asin = asinMatrix.asin();
            expect(JSON.stringify(asin))
                .assertEqual('[[-1.5707963267948966,-0.9272952180016123],[0.5235987755982989,0.6435011087932844]]');
        });
        it('asin2', 0, () => {
            // asin
            let asinMatrix = new Matrix([
                [-0.4, -0.7],
                [0.3, 0.8],
            ]);
            let asin = asinMatrix.asin();
            expect(JSON.stringify(asin))
                .assertEqual('[[-0.41151684606748808,-0.775397496610753],[0.3046926540153975,0.9272952180016123]]');
        });
        it('asin3', 0, () => {
            // asin
            let asinMatrix = new Matrix([
                [1, 0.5],
                [-0.7, 0.9],
            ]);
            let asin = asinMatrix.asin();
            expect(JSON.stringify(asin))
                .assertEqual('[[1.5707963267948966,0.5235987755982989],[-0.775397496610753,1.1197695149986342]]');
        });
        it('asin4', 0, () => {
            // asin
            let asinMatrix = new Matrix([
                [0, 0.2],
                [-0.1, 0.4],
            ]);
            let asin = asinMatrix.asin();
            expect(JSON.stringify(asin))
                .assertEqual('[[0,0.2013579207903308],[-0.1001674211615598,0.41151684606748808]]');
        });
        it('asin5', 0, () => {
            // asin
            let asinMatrix = new Matrix([
                [-0.5, 0.6],
                [0.3, 0.7],
            ]);
            let asin = asinMatrix.asin();
            expect(JSON.stringify(asin))
                .assertEqual('[[-0.5235987755982989,0.6435011087932844],[0.3046926540153975,0.775397496610753]]');
        });
        it('asinh1', 0, () => {
            // asinh
            let asinhMatrix = new Matrix([
                [1, 0],
                [-1, 2],
            ]);
            let asinh = asinhMatrix.asinh();
            expect(JSON.stringify(asinh)).assertEqual('[[0.881373587019543,0],[-0.881373587019543,1.4436354751788103]]');
        });
        it('asinh2', 0, () => {
            // asinh
            let asinhMatrix = new Matrix([
                [1.5, 0.9],
                [0.6, 0.2],
            ]);
            let asinh = asinhMatrix.asinh();
            expect(JSON.stringify(asinh)).assertEqual('[[1.1947632172871094,0.8088669356527824],[0.5688248987322475,0.19869011034924142]]');
        });
        it('asinh3', 0, () => {
            // asinh
            let asinhMatrix = new Matrix([
                [0.8, 0.7],
                [-0.5, 1],
            ]);
            let asinh = asinhMatrix.asinh();
            expect(JSON.stringify(asinh)).assertEqual('[[0.732668256045411,0.6526665660823557],[-0.48121182505960347,0.881373587019543]]');
        });
        it('asinh4', 0, () => {
            // asinh
            let asinhMatrix = new Matrix([
                [0.4, 0.3],
                [-0.8, 0.1],
            ]);
            let asinh = asinhMatrix.asinh();
            expect(JSON.stringify(asinh)).assertEqual('[[0.39003531977071528,0.29567304756342244],[-0.732668256045411,0.09983407889920758]]');
        });
        it('asinh5', 0, () => {
            // asinh
            let asinhMatrix = new Matrix([
                [0.6, 1.3],
                [-0.7, 0],
            ]);
            let asinh = asinhMatrix.asinh();
            expect(JSON.stringify(asinh)).assertEqual('[[0.5688248987322475,1.078451058954897],[-0.6526665660823557,0]]');
        });
        it('atan1', 0, () => {
            // atan
            let atanMatrix = new Matrix([
                [1, 0],
                [-1, 0.5],
            ]);
            let atan = atanMatrix.atan();
            expect(JSON.stringify(atan)).assertEqual('[[0.7853981633974483,0],[-0.7853981633974483,0.4636476090008061]]');
        });
        it('atan2', 0, () => {
            // atan
            let atanMatrix = new Matrix([
                [1.5, 0.8],
                [-0.9, -0.6],
            ]);
            let atan = atanMatrix.atan();
            expect(JSON.stringify(atan)).assertEqual('[[0.982793723247329,0.6747409422235527],[-0.7328151017865066,-0.5404195002705842]]');
        });
        it('atan3', 0, () => {
            // atan
            let atanMatrix = new Matrix([
                [0.4, 0.6],
                [0.9, 0.7],
            ]);
            let atan = atanMatrix.atan();
            expect(JSON.stringify(atan)).assertEqual('[[0.3805063771123649,0.5404195002705842],[0.7328151017865066,0.6107259643892086]]');
        });
        it('atan4', 0, () => {
            // atan
            let atanMatrix = new Matrix([
                [0.3, 0.1],
                [1, 0.5],
            ]);
            let atan = atanMatrix.atan();
            expect(JSON.stringify(atan)).assertEqual('[[0.2914567944778671,0.09966865249116204],[0.7853981633974483,0.4636476090008061]]');
        });
        it('atan5', 0, () => {
            // atan
            let atanMatrix = new Matrix([
                [0.2, 0.8],
                [-1, 0.3],
            ]);
            let atan = atanMatrix.atan();
            expect(JSON.stringify(atan)).assertEqual('[[0.19739555984988078,0.6747409422235527],[-0.7853981633974483,0.2914567944778671]]');
        });
        it('atanh1', 0, () => {
            // atanh
            let atanhMatrix = new Matrix([
                [0.4, 0],
                [-0.6, 0.8],
            ]);
            let atanh = atanhMatrix.atanh();
            expect(JSON.stringify(atanh)).assertEqual('[[0.42364893019360184,0],[-0.6931471805599453,1.0986122886681098]]');
        });
        it('atanh2', 0, () => {
            // atanh
            let atanhMatrix = new Matrix([
                [-0.7, 0.3],
                [0.6, 0.9],
            ]);
            let atanh = atanhMatrix.atanh();
            expect(JSON.stringify(atanh)).assertEqual('[[-0.8673005276940531,0.30951960420311176],[0.6931471805599453,1.4722194895832204]]');
        });
        it('atanh3', 0, () => {
            // atanh
            let atanhMatrix = new Matrix([
                [0.1, 0.6],
                [-0.4, -0.5],
            ]);
            let atanh = atanhMatrix.atanh();
            expect(JSON.stringify(atanh)).assertEqual('[[0.10033534773107558,0.6931471805599453],[-0.42364893019360184,-0.5493061443340548]]');
        });
        it('atanh4', 0, () => {
            // atanh
            let atanhMatrix = new Matrix([
                [0.2, 0],
                [-0.9, 0.6],
            ]);
            let atanh = atanhMatrix.atanh();
            expect(JSON.stringify(atanh)).assertEqual('[[0.2027325540540822,0],[-1.4722194895832204,0.6931471805599453]]');
        });
        it('atanh5', 0, () => {
            // atanh
            let atanhMatrix = new Matrix([
                [-0.3, 0],
                [-0.1, 0.5],
            ]);
            let atanh = atanhMatrix.atanh();
            expect(JSON.stringify(atanh)).assertEqual('[[-0.30951960420311176,0],[-0.10033534773107558,0.5493061443340548]]');
        });
        it('cbrt1', 0, () => {
            // cbrt
            let cbrtMatrix = new Matrix([
                [-1, 0],
                [1, 2],
            ]);
            let cbrt = cbrtMatrix.cbrt();
            expect(JSON.stringify(cbrt)).assertEqual('[[-1,0],[1,1.2599210498948732]]');
        });
        it('cbrt2', 0, () => {
            // cbrt
            let cbrtMatrix = new Matrix([
                [4, 3],
                [1.8, 1.6],
            ]);
            let cbrt = cbrtMatrix.cbrt();
            expect(JSON.stringify(cbrt)).assertEqual('[[1.5874010519681996,1.4422495703074083],[1.2164403991146802,1.1696070952851465]]');
        });
        it('cbrt3', 0, () => {
            // cbrt
            let cbrtMatrix = new Matrix([
                [-1.8, 0.8],
                [1.5, 1.3],
            ]);
            let cbrt = cbrtMatrix.cbrt();
            expect(JSON.stringify(cbrt)).assertEqual('[[-1.2164403991146802,0.9283177667225558],[1.1447142425533319,1.091392883061106]]');
        });
        it('cbrt4', 0, () => {
            // cbrt
            let cbrtMatrix = new Matrix([
                [4, 1.6],
                [-1.4, 1],
            ]);
            let cbrt = cbrtMatrix.cbrt();
            expect(JSON.stringify(cbrt)).assertEqual('[[1.5874010519681996,1.1696070952851465],[-1.1186889420813968,1]]');
        });
        it('cbrt5', 0, () => {
            // cbrt
            let cbrtMatrix = new Matrix([
                [1.2, 0],
                [-1.8, -1.2],
            ]);
            let cbrt = cbrtMatrix.cbrt();
            expect(JSON.stringify(cbrt)).assertEqual('[[1.0626585691826111,0],[-1.2164403991146802,-1.0626585691826111]]');
        });
        it('ceil1', 0, () => {
            // ceil
            let ceilMatrix = new Matrix([
                [0.95, 4],
                [7.004, -7.004],
            ]);
            let ceil = ceilMatrix.ceil();
            expect(JSON.stringify(ceil)).assertEqual('[[1,4],[8,-7]]');
        });
        it('ceil2', 0, () => {
            // ceil
            let ceilMatrix = new Matrix([
                [9.45, 1.44],
                [7.87, -7.87],
            ]);
            let ceil = ceilMatrix.ceil();
            expect(JSON.stringify(ceil)).assertEqual('[[10,2],[8,-7]]');
        });
        it('ceil3', 0, () => {
            // ceil
            let ceilMatrix = new Matrix([
                [0.95, 2.94],
                [7.004, -7.004],
            ]);
            let ceil = ceilMatrix.ceil();
            expect(JSON.stringify(ceil)).assertEqual('[[1,3],[8,-7]]');
        });
        it('ceil4', 0, () => {
            // ceil
            let ceilMatrix = new Matrix([
                [9.5, 14.45],
                [-17.87, 7.01],
            ]);
            let ceil = ceilMatrix.ceil();
            expect(JSON.stringify(ceil)).assertEqual('[[10,15],[-17,8]]');
        });
        it('ceil5', 0, () => {
            // ceil
            let ceilMatrix = new Matrix([
                [1.58, 4.71],
                [2.64, -3.18],
            ]);
            let ceil = ceilMatrix.ceil();
            expect(JSON.stringify(ceil)).assertEqual('[[2,5],[3,-3]]');
        });
        it('clz321', 0, () => {
            // clz32
            let clz32Matrix = new Matrix([
                [1, 1000],
                [3.5, 0],
            ]);
            let clz32 = clz32Matrix.clz32();
            expect(JSON.stringify(clz32)).assertEqual('[[31,22],[30,32]]');
        });
        it('clz322', 0, () => {
            // clz32
            let clz32Matrix = new Matrix([
                [15, 10],
                [-35, 0.9],
            ]);
            let clz32 = clz32Matrix.clz32();
            expect(JSON.stringify(clz32)).assertEqual('[[28,28],[0,32]]');
        });
        it('clz323', 0, () => {
            // clz32
            let clz32Matrix = new Matrix([
                [21, 18],
                [25, 20],
            ]);
            let clz32 = clz32Matrix.clz32();
            expect(JSON.stringify(clz32)).assertEqual('[[27,27],[27,27]]');
        });
        it('clz324', 0, () => {
            // clz32
            let clz32Matrix = new Matrix([
                [25, 30],
                [50, 0.8],
            ]);
            let clz32 = clz32Matrix.clz32();
            expect(JSON.stringify(clz32)).assertEqual('[[27,27],[26,32]]');
        });
        it('clz325', 0, () => {
            // clz32
            let clz32Matrix = new Matrix([
                [24, -32],
                [5, 9],
            ]);
            let clz32 = clz32Matrix.clz32();
            expect(JSON.stringify(clz32)).assertEqual('[[27,0],[29,28]]');
        });
        it('cos1', 0, () => {
            // cos
            let cosMatrix = new Matrix([
                [0, 1],
                [Math.PI, 2 * Math.PI],
            ]);
            let cos = cosMatrix.cos();
            expect(JSON.stringify(cos)).assertEqual('[[1,0.5403023058681398],[-1,1]]');
        });
        it('cos2', 0, () => {
            // cos
            let cosMatrix = new Matrix([
                [30, 21],
                [Math.PI, Math.PI / 2],
            ]);
            let cos = cosMatrix.cos();
            expect(JSON.stringify(cos)).assertEqual('[[0.15425144988758404,-0.5477292602242684],[-1,6.123233995736766e-17]]');
        });
        it('cos3', 0, () => {
            // cos
            let cosMatrix = new Matrix([
                [22, 18],
                [32, -Math.PI / 3],
            ]);
            let cos = cosMatrix.cos();
            expect(JSON.stringify(cos)).assertEqual('[[-0.9999608263946371,0.6603167082440802],[0.8342233605065102,0.5000000000000001]]');
        });
        it('cos4', 0, () => {
            // cos
            let cosMatrix = new Matrix([
                [15, 55],
                [Math.PI * 1.5, 1.2 * Math.PI],
            ]);
            let cos = cosMatrix.cos();
            expect(JSON.stringify(cos)).assertEqual('[[-0.7596879128588213,0.022126756261955736],[-1.8369701987210297e-16,-0.8090169943749475]]');
        });
        it('cos5', 0, () => {
            // cos
            let cosMatrix = new Matrix([
                [35, 41],
                [0, -Math.PI],
            ]);
            let cos = cosMatrix.cos();
            expect(JSON.stringify(cos)).assertEqual('[[-0.9036922050915067,-0.9873392775238264],[1,-1]]');
        });
        it('cosh1', 0, () => {
            // cosh
            let coshMatrix = new Matrix([
                [0, -1],
                [1, 0.5],
            ]);
            let cosh = coshMatrix.cosh();
            expect(JSON.stringify(cosh)).assertEqual('[[1,1.5430806348152437],[1.5430806348152437,1.1276259652063807]]');
        });
        it('cosh2', 0, () => {
            // cosh
            let coshMatrix = new Matrix([
                [0.8, -0.5],
                [0.2, 1],
            ]);
            let cosh = coshMatrix.cosh();
            expect(JSON.stringify(cosh)).assertEqual('[[1.3374349463048447,1.1276259652063807],[1.020066755619076,1.5430806348152437]]');
        });
        it('cosh3', 0, () => {
            // cosh
            let coshMatrix = new Matrix([
                [-0.9, 1],
                [0.8, 0.2],
            ]);
            let cosh = coshMatrix.cosh();
            expect(JSON.stringify(cosh)).assertEqual('[[1.4330863854487745,1.5430806348152437],[1.3374349463048447,1.020066755619076]]');
        });
        it('cosh4', 0, () => {
            // cosh
            let coshMatrix = new Matrix([
                [0.8, 0.18],
                [0.25, 0.6],
            ]);
            let cosh = coshMatrix.cosh();
            expect(JSON.stringify(cosh)).assertEqual('[[1.3374349463048447,1.016243787266541],[1.0314130998795732,1.1854652182422676]]');
        });
        it('cosh5', 0, () => {
            // cosh
            let coshMatrix = new Matrix([
                [0.9, 0],
                [0.45, -0.3],
            ]);
            let cosh = coshMatrix.cosh();
            expect(JSON.stringify(cosh)).assertEqual('[[1.4330863854487745,1],[1.102970168555971,1.0453385141288605]]');
        });
        it('exp1', 0, () => {
            // exp
            let expMatrix = new Matrix([
                [-1, 0],
                [1, 0.5],
            ]);
            let exp = expMatrix.exp();
            expect(JSON.stringify(exp)).assertEqual('[[0.36787944117144232,1],[2.718281828459045,1.6487212707001282]]');
        });
        it('exp2', 0, () => {
            // exp
            let expMatrix = new Matrix([
                [0.8, 0.9],
                [-0.1, 1],
            ]);
            let exp = expMatrix.exp();
            expect(JSON.stringify(exp)).assertEqual('[[2.225540928492468,2.45960311115695],[0.9048374180359595,2.718281828459045]]');
        });
        it('exp3', 0, () => {
            // exp
            let expMatrix = new Matrix([
                [1, 0.8],
                [-1, 0.6],
            ]);
            let exp = expMatrix.exp();
            expect(JSON.stringify(exp)).assertEqual('[[2.718281828459045,2.225540928492468],[0.36787944117144232,1.8221188003905089]]');
        });
        it('exp4', 0, () => {
            // exp
            let expMatrix = new Matrix([
                [0.6, 0],
                [0.4, 0.3],
            ]);
            let exp = expMatrix.exp();
            expect(JSON.stringify(exp)).assertEqual('[[1.8221188003905089,1],[1.4918246976412703,1.3498588075760032]]');
        });
        it('exp5', 0, () => {
            // exp
            let expMatrix = new Matrix([
                [-1, 0],
                [1, 0.5],
            ]);
            let exp = expMatrix.exp();
            expect(JSON.stringify(exp)).assertEqual('[[0.36787944117144232,1],[2.718281828459045,1.6487212707001282]]');
        });
        it('expm11', 0, () => {
            // expm1
            let expm1Matrix = new Matrix([
                [-1, 0],
                [0.5, 1],
            ]);
            let expm1 = expm1Matrix.expm1();
            expect(JSON.stringify(expm1)).assertEqual('[[-0.6321205588285577,0],[0.6487212707001282,1.718281828459045]]');
        });
        it('expm12', 0, () => {
            // expm1
            let expm1Matrix = new Matrix([
                [0.8, 0.2],
                [0, -0.6],
            ]);
            let expm1 = expm1Matrix.expm1();
            expect(JSON.stringify(expm1)).assertEqual('[[1.2255409284924677,0.22140275816016985],[0,-0.45118836390597356]]');
        });
        it('expm13', 0, () => {
            // expm1
            let expm1Matrix = new Matrix([
                [-0.6, 0.5],
                [1, 0.1],
            ]);
            let expm1 = expm1Matrix.expm1();
            expect(JSON.stringify(expm1)).assertEqual('[[-0.45118836390597356,0.6487212707001282],[1.718281828459045,0.10517091807564763]]');
        });
        it('expm14', 0, () => {
            // expm1
            let expm1Matrix = new Matrix([
                [0.5, 1],
                [0.6, -0.9],
            ]);
            let expm1 = expm1Matrix.expm1();
            expect(JSON.stringify(expm1)).assertEqual('[[0.6487212707001282,1.718281828459045],[0.8221188003905089,-0.5934303402594009]]');
        });
        it('expm15', 0, () => {
            // expm1
            let expm1Matrix = new Matrix([
                [0.7, -0.4],
                [0.5, -0.2],
            ]);
            let expm1 = expm1Matrix.expm1();
            expect(JSON.stringify(expm1)).assertEqual('[[1.0137527074704764,-0.32967995396436072],[0.6487212707001282,-0.18126924692201816]]');
        });
        it('floor1', 0, () => {
            // floor
            let floorMatrix = new Matrix([
                [5.95, 5.05],
                [5, -5.05],
            ]);
            let floor = floorMatrix.floor();
            expect(JSON.stringify(floor)).assertEqual('[[5,5],[5,-6]]');
        });
        it('floor2', 0, () => {
            // floor
            let floorMatrix = new Matrix([
                [5.15, 3.45],
                [1.35, 5.78]
            ]);
            let floor = floorMatrix.floor();
            expect(JSON.stringify(floor)).assertEqual('[[5,3],[1,5]]');
        });
        it('floor3', 0, () => {
            // floor
            let floorMatrix = new Matrix([
                [-5.95, 1.45],
                [5.3, 2.75],
            ]);
            let floor = floorMatrix.floor();
            expect(JSON.stringify(floor)).assertEqual('[[-6,1],[5,2]]');
        });
        it('floor4', 0, () => {
            // floor
            let floorMatrix = new Matrix([
                [1.5, 24.65],
                [1.89, 3.75],
            ]);
            let floor = floorMatrix.floor();
            expect(JSON.stringify(floor)).assertEqual('[[1,24],[1,3]]');
        });
        it('floor5', 0, () => {
            // floor
            let floorMatrix = new Matrix([
                [9.5, -8.35],
                [7.25, 6.85],
            ]);
            let floor = floorMatrix.floor();
            expect(JSON.stringify(floor)).assertEqual('[[9,-9],[7,6]]');
        });
        it('fround1', 0, () => {
            // fround
            let froundMatrix = new Matrix([
                [1.5, 1.337],
                [2 ** 150, 0],
            ]);
            let fround = froundMatrix.fround();
            expect(JSON.stringify(fround)).assertEqual('[[1.5,1.3370000123977661],[null,0]]');
        });
        it('fround2', 0, () => {
            // fround
            let froundMatrix = new Matrix([
                [-1.5, 1.37],
                [2 * 150, 0.76],
            ]);
            let fround = froundMatrix.fround();
            expect(JSON.stringify(fround)).assertEqual('[[-1.5,1.3700000047683716],[300,0.7599999904632568]]');
        });
        it('fround3', 0, () => {
            // fround
            let froundMatrix = new Matrix([
                [0.75, -2.247],
                [150, 10],
            ]);
            let fround = froundMatrix.fround();
            expect(JSON.stringify(fround)).assertEqual('[[0.75,-2.246999979019165],[150,10]]');
        });
        it('fround4', 0, () => {
            // fround
            let froundMatrix = new Matrix([
                [1.83, 4.638],
                [-1.51, 1],
            ]);
            let fround = froundMatrix.fround();
            expect(JSON.stringify(fround)).assertEqual('[[1.8300000429153442,4.638000011444092],[-1.5099999904632568,1]]');
        });
        it('fround5', 0, () => {
            // fround
            let froundMatrix = new Matrix([
                [2.78, 1.69],
                [-1.35, 0],
            ]);
            let fround = froundMatrix.fround();
            expect(JSON.stringify(fround)).assertEqual('[[2.7799999713897705,1.690000057220459],[-1.350000023841858,0]]');
        });
        it('log1', 0, () => {
            // log
            let logMatrix = new Matrix([
                [-1, 0],
                [1, 10],
            ]);
            let log = logMatrix.log();
            expect(JSON.stringify(log)).assertEqual('[[null,null],[0,2.302585092994046]]');
        });
        it('log2', 0, () => {
            // log
            let logMatrix = new Matrix([
                [4, 8],
                [9, 100],
            ]);
            let log = logMatrix.log();
            expect(JSON.stringify(log)).assertEqual('[[1.3862943611198906,2.0794415416798357],[2.1972245773362196,4.605170185988092]]');
        });
        it('log3', 0, () => {
            // log
            let logMatrix = new Matrix([
                [16, 40],
                [81, 49],
            ]);
            let log = logMatrix.log();
            expect(JSON.stringify(log)).assertEqual('[[2.772588722239781,3.6888794541139363],[4.394449154672439,3.8918202981106265]]');
        });
        it('log4', 0, () => {
            // log
            let logMatrix = new Matrix([
                [36, 25],
                [72, 35],
            ]);
            let log = logMatrix.log();
            expect(JSON.stringify(log)).assertEqual('[[3.58351893845611,3.2188758248682006],[4.276666119016055,3.5553480614894135]]');
        });
        it('log5', 0, () => {
            // log
            let logMatrix = new Matrix([
                [4, 8],
                [6, 16],
            ]);
            let log = logMatrix.log();
            expect(JSON.stringify(log)).assertEqual('[[1.3862943611198906,2.0794415416798357],[1.791759469228055,2.772588722239781]]');
        });
        it('log1p1', 0, () => {
            // log1p
            let log1pMatrix = new Matrix([
                [100, 81],
                [8, 16],
            ]);
            let log1p = Matrix.log1p(log1pMatrix);
            expect(JSON.stringify(log1p)).assertEqual('[[4.61512051684126,4.406719247264253],[2.1972245773362196,2.833213344056216]]');
        });
        it('log1p2', 0, () => {
            // log1p
            let log1pMatrix = new Matrix([
                [9, 36],
                [32, 49],
            ]);
            let log1p = log1pMatrix.log1p();
            expect(JSON.stringify(log1p)).assertEqual('[[2.302585092994046,3.6109179126442243],[3.4965075614664802,3.912023005428146]]');
        });
        it('log1p3', 0, () => {
            // log1p
            let log1pMatrix = new Matrix([
                [18, 25],
                [24, 16],
            ]);
            let log1p = log1pMatrix.log1p();
            expect(JSON.stringify(log1p)).assertEqual('[[2.9444389791664403,3.258096538021482],[3.2188758248682006,2.833213344056216]]');
        });
        it('log1p4', 0, () => {
            // log1p
            let log1pMatrix = new Matrix([
                [10, 1],
                [36, 35],
            ]);
            let log1p = log1pMatrix.log1p();
            expect(JSON.stringify(log1p)).assertEqual('[[2.3978952727983707,0.6931471805599453],[3.6109179126442243,3.58351893845611]]');
        });
        it('log1p5', 0, () => {
            // log1p
            let log1pMatrix = new Matrix([
                [0.9, 24],
                [32, 8],
            ]);
            let log1p = log1pMatrix.log1p();
            expect(JSON.stringify(log1p)).assertEqual('[[0.6418538861723948,3.2188758248682006],[3.4965075614664802,2.1972245773362196]]');
        });
        it('log101', 0, () => {
            // log10
            let log10Matrix = new Matrix([
                [10, 100],
                [1, 0],
            ]);
            let log10 = log10Matrix.log10();
            expect(JSON.stringify(log10)).assertEqual('[[1,2],[0,null]]');
        });
        it('log102', 0, () => {
            // log10
            let log10Matrix = new Matrix([
                [10, 100],
                [40, 1000],
            ]);
            let log10 = log10Matrix.log10();
            expect(JSON.stringify(log10)).assertEqual('[[1,2],[1.6020599913279623,3]]');
        });
        it('log103', 0, () => {
            // log10
            let log10Matrix = new Matrix([
                [100, 80],
                [900, 30],
            ]);
            let log10 = log10Matrix.log10();
            expect(JSON.stringify(log10)).assertEqual('[[2,1.9030899869919435],[2.9542425094393248,1.4771212547196624]]');
        });
        it('log104', 0, () => {
            // log10
            let log10Matrix = new Matrix([
                [400, 10],
                [1, 100],
            ]);
            let log10 = log10Matrix.log10();
            expect(JSON.stringify(log10)).assertEqual('[[2.6020599913279625,1],[0,2]]');
        });
        it('log105', 0, () => {
            // log10
            let log10Matrix = new Matrix([
                [100, 300],
                [500, 1],
            ]);
            let log10 = log10Matrix.log10();
            expect(JSON.stringify(log10)).assertEqual('[[2,2.4771212547196626],[2.6989700043360187,0]]');
        });
        it('log21', 0, () => {
            // log2
            let log2Matrix = new Matrix([
                [2, 1024],
                [1, 0],
            ]);
            let log2 = log2Matrix.log2();
            expect(JSON.stringify(log2)).assertEqual('[[1,10],[0,null]]');
        });
        it('log22', 0, () => {
            // log2
            let log2Matrix = new Matrix([
                [25, 34],
                [16, 100],
            ]);
            let log2 = log2Matrix.log2();
            expect(JSON.stringify(log2)).assertEqual('[[4.643856189774724,5.087462841250339],[4,6.643856189774724]]');
        });
        it('log23', 0, () => {
            // log2
            let log2Matrix = new Matrix([
                [4, 16],
                [32, 80],
            ]);
            let log2 = log2Matrix.log2();
            expect(JSON.stringify(log2)).assertEqual('[[2,4],[5,6.321928094887363]]');
        });
        it('log24', 0, () => {
            // log2
            let log2Matrix = new Matrix([
                [64, 128],
                [512, 2],
            ]);
            let log2 = log2Matrix.log2();
            expect(JSON.stringify(log2)).assertEqual('[[6,7],[9,1]]');
        });
        it('log25', 0, () => {
            // log2
            let log2Matrix = new Matrix([
                [8, 1024],
                [2, 64],
            ]);
            let log2 = log2Matrix.log2();
            expect(JSON.stringify(log2)).assertEqual('[[3,10],[1,6]]');
        });
        it('round1', 0, () => {
            // round
            let roundMatrix = new Matrix([
                [20.49, 20.5],
                [-20.5, -20.5],
            ]);
            let round = roundMatrix.round();
            expect(JSON.stringify(round)).assertEqual('[[20,21],[-20,-20]]');
        });
        it('round2', 0, () => {
            // round
            let roundMatrix = new Matrix([
                [12.49, -23.54],
                [20.65, 30.35],
            ]);
            let round = roundMatrix.round();
            expect(JSON.stringify(round)).assertEqual('[[12,-24],[21,30]]');
        });
        it('round3', 0, () => {
            // round
            let roundMatrix = new Matrix([
                [16.59, 20.45],
                [34.85, 0.25],
            ]);
            let round = roundMatrix.round();
            expect(JSON.stringify(round)).assertEqual('[[17,20],[35,0]]');
        });
        it('round4', 0, () => {
            // round
            let roundMatrix = new Matrix([
                [45.79, 16.15],
                [23.95, 20.25],
            ]);
            let round = roundMatrix.round();
            expect(JSON.stringify(round)).assertEqual('[[46,16],[24,20]]');
        });
        it('round5', 0, () => {
            // round
            let roundMatrix = new Matrix([
                [2.79, 28.35],
                [2.55, 0.85],
            ]);
            let round = roundMatrix.round();
            expect(JSON.stringify(round)).assertEqual('[[3,28],[3,1]]');
        });
        it('sign1', 0, () => {
            // sign
            let signMatrix = new Matrix([
                [3, 0],
                [0, -3],
            ]);
            let sign = signMatrix.sign();
            expect(JSON.stringify(sign)).assertEqual('[[1,0],[0,-1]]');
        });
        it('sign2', 0, () => {
            // sign
            let signMatrix = new Matrix([
                [30, 1],
                [45, 30],
            ]);
            let sign = signMatrix.sign();
            expect(JSON.stringify(sign)).assertEqual('[[1,1],[1,1]]');
        });
        it('sign3', 0, () => {
            // sign
            let signMatrix = new Matrix([
                [90, 30],
                [180, 60],
            ]);
            let sign = signMatrix.sign();
            expect(JSON.stringify(sign)).assertEqual('[[1,1],[1,1]]');
        });
        it('sign4', 0, () => {
            // sign
            let signMatrix = new Matrix([
                [30, 60],
                [145, 45],
            ]);
            let sign = signMatrix.sign();
            expect(JSON.stringify(sign)).assertEqual('[[1,1],[1,1]]');
        });
        it('sign5', 0, () => {
            // sign
            let signMatrix = new Matrix([
                [60, 90],
                [-90, 80],
            ]);
            let sign = signMatrix.sign();
            expect(JSON.stringify(sign)).assertEqual('[[1,1],[-1,1]]');
        });
        it('sin1', 0, () => {
            // sin
            let sinMatrix = new Matrix([
                [1, 0],
                [Math.PI / 2, -1],
            ]);
            let sin = sinMatrix.sin();
            expect(JSON.stringify(sin)).assertEqual('[[0.8414709848078965,0],[1,-0.8414709848078965]]');
        });
        it('sin2', 0, () => {
            // sin
            let sinMatrix = new Matrix([
                [45, 90],
                [Math.PI / 3, 60],
            ]);
            let sin = sinMatrix.sin();
            expect(JSON.stringify(sin)).assertEqual('[[0.8509035245341184,0.8939966636005579],[0.8660254037844386,-0.3048106211022167]]');
        });
        it('sin3', 0, () => {
            // sin
            let sinMatrix = new Matrix([
                [-60, 45],
                [-Math.PI / 3, 90],
            ]);
            let sin = sinMatrix.sin();
            expect(JSON.stringify(sin)).assertEqual('[[0.3048106211022167,0.8509035245341184],[-0.8660254037844386,0.8939966636005579]]');
        });
        it('sin4', 0, () => {
            // sin
            let sinMatrix = new Matrix([
                [18, 10],
                [Math.PI, 30],
            ]);
            let sin = sinMatrix.sin();
            expect(JSON.stringify(sin)).assertEqual('[[-0.7509872467716762,-0.5440211108893698],[1.2246467991473532e-16,-0.9880316240928618]]');
        });
        it('sin5', 0, () => {
            // sin
            let sinMatrix = new Matrix([
                [15, 30],
                [90, 1],
            ]);
            let sin = sinMatrix.sin();
            expect(JSON.stringify(sin)).assertEqual('[[0.6502878401571168,-0.9880316240928618],[0.8939966636005579,0.8414709848078965]]');
        });
        it('sinh1', 0, () => {
            // sinh
            let sinhMatrix = new Matrix([
                [1, 0],
                [Math.PI / 2, -1],
            ]);
            let sinh = sinhMatrix.sinh();
            expect(JSON.stringify(sinh)).assertEqual('[[1.1752011936438014,0],[2.3012989023072947,-1.1752011936438014]]');
        });
        it('sinh2', 0, () => {
            // sinh
            let sinhMatrix = new Matrix([
                [1.5, 0.6],
                [-1.8, 0.8],
            ]);
            let sinh = sinhMatrix.sinh();
            expect(JSON.stringify(sinh)).assertEqual('[[2.1292794550948173,0.6366535821482412],[-2.94217428809568,0.888105982187623]]');
        });
        it('sinh3', 0, () => {
            // sinh
            let sinhMatrix = new Matrix([
                [0.9, 0.8],
                [Math.PI / 3, -0.8],
            ]);
            let sinh = sinhMatrix.sinh();
            expect(JSON.stringify(sinh)).assertEqual('[[1.0265167257081753,0.888105982187623],[1.2493670505239751,-0.888105982187623]]');
        });
        it('sinh4', 0, () => {
            // sinh
            let sinhMatrix = new Matrix([
                [0.5, -0.7],
                [1, -0.5],
            ]);
            let sinh = sinhMatrix.sinh();
            expect(JSON.stringify(sinh)).assertEqual('[[0.5210953054937474,-0.7585837018395334],[1.1752011936438014,-0.5210953054937474]]');
        });
        it('sinh5', 0, () => {
            // sinh
            let sinhMatrix = new Matrix([
                [0.6, 0.8],
                [-0.4, 0.3],
            ]);
            let sinh = sinhMatrix.sinh();
            expect(JSON.stringify(sinh)).assertEqual('[[0.6366535821482412,0.888105982187623],[-0.4107523258028155,0.3045202934471426]]');
        });
        it('sqrt1', 0, () => {
            // sqrt
            let sqrtMatrix = new Matrix([
                [9, 2],
                [1, 0],
            ]);
            let sqrt = sqrtMatrix.sqrt();
            expect(JSON.stringify(sqrt)).assertEqual('[[3,1.4142135623730951],[1,0]]');
        });
        it('sqrt2', 0, () => {
            // sqrt
            let sqrtMatrix = new Matrix([
                [4, 81],
                [64, 1],
            ]);
            let sqrt = sqrtMatrix.sqrt();
            expect(JSON.stringify(sqrt)).assertEqual('[[2,9],[8,1]]');
        });
        it('sqrt3', 0, () => {
            // sqrt
            let sqrtMatrix = new Matrix([
                [16, 4],
                [81, 25],
            ]);
            let sqrt = sqrtMatrix.sqrt();
            expect(JSON.stringify(sqrt)).assertEqual('[[4,2],[9,5]]');
        });
        it('sqrt4', 0, () => {
            // sqrt
            let sqrtMatrix = new Matrix([
                [16, 36],
                [8, 100],
            ]);
            let sqrt = sqrtMatrix.sqrt();
            expect(JSON.stringify(sqrt)).assertEqual('[[4,6],[2.8284271247461903,10]]');
        });
        it('sqrt5', 0, () => {
            // sqrt
            let sqrtMatrix = new Matrix([
                [900, 16],
                [25, 49],
            ]);
            let sqrt = sqrtMatrix.sqrt();
            expect(JSON.stringify(sqrt)).assertEqual('[[30,4],[5,7]]');
        });
        it('tan1', 0, () => {
            // tan
            let tanMatrix = new Matrix([
                [1, 0],
                [Math.PI / 2, -1],
            ]);
            let tan = tanMatrix.tan();
            expect(JSON.stringify(tan)).assertEqual('[[1.5574077246549023,0],[16331239353195370,-1.5574077246549023]]');
        });
        it('tan2', 0, () => {
            // tan
            let tanMatrix = new Matrix([
                [1, 0],
                [0.8, -1],
            ]);
            let tan = tanMatrix.tan();
            expect(JSON.stringify(tan)).assertEqual('[[1.5574077246549023,0],[1.0296385570503641,-1.5574077246549023]]');
        });
        it('tan3', 0, () => {
            // tan
            let tanMatrix = new Matrix([
                [1.3, 0.9],
                [0.4, 1],
            ]);
            let tan = tanMatrix.tan();
            expect(JSON.stringify(tan)).assertEqual('[[3.6021024479679786,1.2601582175503392],[0.4227932187381618,1.5574077246549023]]');
        });
        it('tan4', 0, () => {
            // tan
            let tanMatrix = new Matrix([
                [0.8, 0.6],
                [-0.5, 1.2],
            ]);
            let tan = tanMatrix.tan();
            expect(JSON.stringify(tan)).assertEqual('[[1.0296385570503641,0.6841368083416923],[-0.5463024898437905,2.5721516221263188]]');
        });
        it('tan5', 0, () => {
            // tan
            let tanMatrix = new Matrix([
                [1, 0],
                [0.7, 0.4],
            ]);
            let tan = tanMatrix.tan();
            expect(JSON.stringify(tan)).assertEqual('[[1.5574077246549023,0],[0.8422883804630794,0.4227932187381618]]');
        });
        it('tanh1', 0, () => {
            // tanh
            let tanhMatrix = new Matrix([
                [1, 0],
                [Math.PI / 2, -1],
            ]);
            let tanh = tanhMatrix.tanh();
            expect(JSON.stringify(tanh)).assertEqual('[[0.7615941559557649,0],[0.9171523356672744,-0.7615941559557649]]');
        });
        it('tanh2', 0, () => {
            // tanh
            let tanhMatrix = new Matrix([
                [1.5, 0.45],
                [Math.PI / 3, 2.8],
            ]);
            let tanh = tanhMatrix.tanh();
            expect(JSON.stringify(tanh)).assertEqual('[[0.9051482536448664,0.42189900525000795],[0.7807144353592677,0.992631520201128]]');
        });
        it('tanh3', 0, () => {
            // tanh
            let tanhMatrix = new Matrix([
                [0.8, 0.9],
                [1, -0.6],
            ]);
            let tanh = tanhMatrix.tanh();
            expect(JSON.stringify(tanh)).assertEqual('[[0.6640367702678489,0.7162978701990245],[0.7615941559557649,-0.5370495669980353]]');
        });
        it('tanh4', 0, () => {
            // tanh
            let tanhMatrix = new Matrix([
                [1.56, 0.7],
                [2, -1.67],
            ]);
            let tanh = tanhMatrix.tanh();
            expect(JSON.stringify(tanh)).assertEqual('[[0.9154204563159324,0.6043677771171634],[0.9640275800758169,-0.9315516846152082]]');
        });
        it('tanh5', 0, () => {
            // tanh
            let tanhMatrix = new Matrix([
                [1.34, 0.6],
                [-0.3, 0.5],
            ]);
            let tanh = tanhMatrix.tanh();
            expect(JSON.stringify(tanh)).assertEqual('[[0.8716722471896521,0.5370495669980353],[-0.29131261245159084,0.46211715726000976]]');
        });
        it('trunc1', 0, () => {
            // trunc
            let truncMatrix = new Matrix([
                [13.37, 42.84],
                [-0.123, -1.123],
            ]);
            let trunc = truncMatrix.trunc();
            expect(JSON.stringify(trunc)).assertEqual('[[13,42],[0,-1]]');
        });
        it('trunc2', 0, () => {
            // trunc
            let truncMatrix = new Matrix([
                [11.57, 2.48],
                [-3.56, 0.94],
            ]);
            let trunc = truncMatrix.trunc();
            expect(JSON.stringify(trunc)).assertEqual('[[11,2],[-3,0]]');
        });
        it('trunc3', 0, () => {
            // trunc
            let truncMatrix = new Matrix([
                [-13.87, 42.34],
                [1.23, 5.73],
            ]);
            let trunc = truncMatrix.trunc();
            expect(JSON.stringify(trunc)).assertEqual('[[-13,42],[1,5]]');
        });
        it('trunc4', 0, () => {
            // trunc
            let truncMatrix = new Matrix([
                [23.47, 4.64],
                [8.63, 23.83],
            ]);
            let trunc = truncMatrix.trunc();
            expect(JSON.stringify(trunc)).assertEqual('[[23,4],[8,23]]');
        });
        it('trunc5', 0, () => {
            // trunc
            let truncMatrix = new Matrix([
                [19.73, 2.24],
                [10.46, 34.93],
            ]);
            let trunc = truncMatrix.trunc();
            expect(JSON.stringify(trunc)).assertEqual('[[19,2],[10,34]]');
        });
        it('rows1', 0, () => {
            // rows
            let A = new Matrix([[1, 1], [-1, -1]]);
            expect(A.rows).assertEqual(2);
        });
        it('rows2', 0, () => {
            // rows
            let A = new Matrix([[1, 1]]);
            expect(A.rows).assertEqual(1);
        });
        it('rows3', 0, () => {
            // rows
            let A = new Matrix([[1, 1], [-1, -1], [-1, 1]]);
            expect(A.rows).assertEqual(3);
        });
        it('rows4', 0, () => {
            // rows
            let A = new Matrix([]);
            expect(A.rows).assertEqual(0);
        });
        it('rows5', 0, () => {
            // rows
            let A = new Matrix([[1, 1], [-1, -1], [1, 1], [-1, -1]]);
            expect(A.rows).assertEqual(4);
        });
        it('columns1', 0, () => {
            // columns
            let A = new Matrix([[1, 1], [-1, -1]]);
            expect(A.columns).assertEqual(2);
        });
        it('columns2', 0, () => {
            // rows
            let A = new Matrix([[1, 1, 1]]);
            expect(A.columns).assertEqual(3);
        });
        it('columns3', 0, () => {
            // rows
            let A = new Matrix([[1, 1, 1], [-1, -1, -1]]);
            expect(A.columns).assertEqual(3);
        });
        it('columns4', 0, () => {
            // rows
            let A = new Matrix([]);
            expect(A.columns).assertEqual(0);
        });
        it('columns5', 0, () => {
            // rows
            let A = new Matrix([[1, 1, 1, 1], [-1, -1, -1, -1], [1, 1, 1, 1]]);
            expect(A.columns).assertEqual(4);
        });
        it('get1', 0, () => {
            // get
            let A = new Matrix([[1, 1], [-1, -1]]);
            expect(A.get(0, 0)).assertEqual(1);
        });
        it('get2', 0, () => {
            // get
            let A = new Matrix([[1, 1, 1]]);
            expect(A.get(0, 1)).assertEqual(1);
        });
        it('get3', 0, () => {
            // get
            let A = new Matrix([[1, 1, 1], [-1, -1, -1]]);
            expect(A.get(1, 0)).assertEqual(-1);
        });
        it('get4', 0, () => {
            // get
            let A = new Matrix([[-1, 1]]);
            expect(A.get(0, 0)).assertEqual(-1);
        });
        it('get5', 0, () => {
            // get
            let A = new Matrix([[1, 1, 1, 1], [-1, -1, -1, -1], [1, 1, 1, 1]]);
            expect(A.get(2, 0)).assertEqual(1);
        });
        it('size1', 0, () => {
            // size
            let A = new Matrix([[1, 1], [-1, -1]]);
            expect(A.size).assertEqual(4);
        });
        it('size2', 0, () => {
            // size
            let A = new Matrix([[1, 1, 1]]);
            expect(A.size).assertEqual(3);
        });
        it('size3', 0, () => {
            // size
            let A = new Matrix([[1, 1, 1], [-1, -1, -1]]);
            expect(A.size).assertEqual(6);
        });
        it('size4', 0, () => {
            // size
            let A = new Matrix([]);
            expect(A.size).assertEqual(0);
        });
        it('size5', 0, () => {
            // size
            let A = new Matrix([[1, 1, 1, 1], [-1, -1, -1, -1], [1, 1, 1, 1]]);
            expect(A.size).assertEqual(12);
        });
        it('isRowVector1', 0, () => {
            // isRowVector
            let A = new Matrix([[1, 1], [-1, -1]]);
            expect(A.isRowVector()).assertFalse();
        });
        it('isRowVector2', 0, () => {
            // isRowVector
            let A = new Matrix([[1, 1, 1]]);
            expect(A.isRowVector()).assertTrue();
        });
        it('isRowVector3', 0, () => {
            // isRowVector
            let A = new Matrix([[1, 1, 1], [-1, -1, -1]]);
            expect(A.isRowVector()).assertFalse();
        });
        it('isRowVector4', 0, () => {
            // isRowVector
            let A = new Matrix([]);
            expect(A.isRowVector()).assertFalse();
        });
        it('isRowVector5', 0, () => {
            // isRowVector
            let A = new Matrix([[1, 1, 1, 1], [-1, -1, -1, -1], [1, 1, 1, 1]]);
            expect(A.isRowVector()).assertFalse();
        });
        it('isColumnVector1', 0, () => {
            // isColumnVector
            let A = new Matrix([[1, 1], [-1, -1]]);
            expect(A.isColumnVector()).assertFalse();
        });
        it('isColumnVector2', 0, () => {
            // isColumnVector
            let A = new Matrix([[1, 1, 1]]);
            expect(A.isColumnVector()).assertFalse();
        });
        it('isColumnVector3', 0, () => {
            // isColumnVector
            let A = new Matrix([[1, 1, 1], [-1, -1, -1]]);
            expect(A.isColumnVector()).assertFalse();
        });
        it('isColumnVector4', 0, () => {
            // isColumnVector
            let A = new Matrix([]);
            expect(A.isColumnVector()).assertFalse();
        });
        it('isColumnVector5', 0, () => {
            // isColumnVector
            let A = new Matrix([[1, 1, 1, 1], [-1, -1, -1, -1], [1, 1, 1, 1]]);
            expect(A.isColumnVector()).assertFalse();
        });
        it('isSquare1', 0, () => {
            // isSquare
            let A = new Matrix([[1, 1], [-1, -1]]);
            expect(A.isSquare()).assertTrue();
        });
        it('isSquare2', 0, () => {
            // isSquare
            let A = new Matrix([[1, 1, 1]]);
            expect(A.isSquare()).assertFalse();
        });
        it('isSquare3', 0, () => {
            // isSquare
            let A = new Matrix([[1, 1, 1], [-1, -1, -1]]);
            expect(A.isSquare()).assertFalse();
        });
        it('isSquare4', 0, () => {
            // isSquare
            let A = new Matrix([]);
            expect(A.isSquare()).assertTrue();
        });
        it('isSquare5', 0, () => {
            // isSquare
            let A = new Matrix([[1, 1, 1, 1], [-1, -1, -1, -1], [1, 1, 1, 1]]);
            expect(A.isSquare()).assertFalse();
        });
        it('isSymmetric1', 0, () => {
            // isSymmetric
            let A = new Matrix([[1, 1], [-1, -1]]);
            expect(A.isSymmetric()).assertFalse();
        });
        it('isSymmetric2', 0, () => {
            // isSymmetric
            let A = new Matrix([[1, 1], [1, 1]]);
            expect(A.isSymmetric()).assertTrue();
        });
        it('isSymmetric3', 0, () => {
            // isSymmetric
            let A = new Matrix([[1, 1, 1], [-1, -1, -1]]);
            expect(A.isSymmetric()).assertFalse();
        });
        it('isSymmetric4', 0, () => {
            // isSymmetric
            let A = new Matrix([]);
            // expect(A.isSymmetric()).assertFalse();
            expect(A.isSymmetric()).assertTrue();
        });
        it('isSymmetric5', 0, () => {
            // isSymmetric
            let A = new Matrix([[1, 1, 1, 1], [-1, -1, -1, -1], [1, 1, 1, 1]]);
            expect(A.isSymmetric()).assertFalse();
        });
        it('set1', 0, () => {
            // set
            let A = new Matrix([[1, 1], [-1, -1]]);
            expect(JSON.stringify(A)).assertEqual('[[1,1],[-1,-1]]');
            A.set(1, 0, 10);
            expect(JSON.stringify(A)).assertEqual('[[1,1],[10,-1]]');
        });
        it('set2', 0, () => {
            // set
            let A = new Matrix([[1, 1], [1, 1]]);
            expect(JSON.stringify(A)).assertEqual('[[1,1],[1,1]]');
            A.set(1, 0, 10);
            expect(JSON.stringify(A)).assertEqual('[[1,1],[10,1]]');
        });
        it('set3', 0, () => {
            // set
            let A = new Matrix([[1, 1, 1], [-1, -1, -1]]);
            expect(JSON.stringify(A)).assertEqual('[[1,1,1],[-1,-1,-1]]');
            A.set(1, 0, 10);
            expect(JSON.stringify(A)).assertEqual('[[1,1,1],[10,-1,-1]]');
        });
        it('set4', 0, () => {
            // set
            let A = new Matrix([[1, 1, 1, 1], [-1, -1, -1, -1], [1, 1, 1, 1]]);
            expect(JSON.stringify(A)).assertEqual('[[1,1,1,1],[-1,-1,-1,-1],[1,1,1,1]]');
            A.set(1, 0, 10);
            expect(JSON.stringify(A)).assertEqual('[[1,1,1,1],[10,-1,-1,-1],[1,1,1,1]]');
        });
        it('set5', 0, () => {
            // set
            let A = new Matrix([[1, 1], [-1, 1]]);
            expect(JSON.stringify(A)).assertEqual('[[1,1],[-1,1]]');
            A.set(1, 0, 10);
            expect(JSON.stringify(A)).assertEqual('[[1,1],[10,1]]');
        });
        it('diag1', 0, () => {
            // diag
            let A = new Matrix([[1, 1], [-1, -1]]);
            expect(JSON.stringify(A.diag())).assertEqual('[1,-1]');
        });
        it('diag2', 0, () => {
            // diag
            let A = new Matrix([[1, 1], [1, 1]]);
            expect(JSON.stringify(A.diag())).assertEqual('[1,1]');
        });
        it('diag3', 0, () => {
            // diag
            let A = new Matrix([[1, 1, 1], [-1, -1, -1]]);
            expect(JSON.stringify(A.diag())).assertEqual('[1,-1]');
        });
        it('diag4', 0, () => {
            // diag
            let A = new Matrix([[1, 1, 1, 1], [-1, -1, -1, -1], [1, 1, 1, 1]]);
            expect(JSON.stringify(A.diag())).assertEqual('[1,-1,1]');
        });
        it('diag5', 0, () => {
            // diag
            let A = new Matrix([[1, 1], [-1, 1]]);
            expect(JSON.stringify(A.diag())).assertEqual('[1,1]');
        });
        it('mean1', 0, () => {
            // mean
            let A = new Matrix([[1, 1], [-1, -1]]);
            expect(A.mean()).assertEqual(0);
        });
        it('mean2', 0, () => {
            // mean
            let A = new Matrix([[1, 1], [1, 1]]);
            expect(A.mean()).assertEqual(1);
        });
        it('mean3', 0, () => {
            // mean
            let A = new Matrix([[1, 1, 1], [-1, -1, -1]]);
            expect(A.mean()).assertEqual(0);
        });
        it('mean4', 0, () => {
            // mean
            let A = new Matrix([[1, 1, 1, 1], [-1, -1, -1, -1], [1, 1, 1, 1]]);
            expect(A.mean()).assertEqual(0.3333333333333333);
        });
        it('mean5', 0, () => {
            // mean
            let A = new Matrix([[1, 1], [-1, 1]]);
            expect(A.mean()).assertEqual(0.5);
        });
        it('frobenius1', 0, () => {
            // norm frobenius
            let A = new Matrix([[1, 1], [-1, -1]]);
            expect(A.norm('frobenius')).assertEqual(2);
        });
        it('frobenius2', 0, () => {
            // norm frobenius
            let A = new Matrix([[1, 1], [1, 1]]);
            expect(A.norm('frobenius')).assertEqual(2);
        });
        it('frobenius3', 0, () => {
            // norm frobenius
            let A = new Matrix([[1, 1, 1], [-1, -1, -1]]);
            expect(A.norm('frobenius')).assertEqual(2.449489742783178);
        });
        it('frobenius4', 0, () => {
            // norm frobenius
            let A = new Matrix([[1, 1, 1, 1], [-1, -1, -1, -1], [1, 1, 1, 1]]);
            expect(A.norm('frobenius')).assertEqual(3.4641016151377544);
        });
        it('frobenius5', 0, () => {
            // norm frobenius
            let A = new Matrix([[1, 1], [-1, 1]]);
            expect(A.norm('frobenius')).assertEqual(2);
        });
        it('norm1', 0, () => {
            // norm max
            let A = new Matrix([[1, 2], [3, 4]]);
            expect(A.norm('max')).assertEqual(4);
        });
        it('norm2', 0, () => {
            // norm max
            let A = new Matrix([[-1, 2], [3, 0]]);
            expect(A.norm('max')).assertEqual(3);
        });
        it('norm3', 0, () => {
            // norm max
            let A = new Matrix([[1, -2], [3, 6]]);
            expect(A.norm('max')).assertEqual(6);
        });
        it('norm4', 0, () => {
            // norm max
            let A = new Matrix([[1, 0], [5, 3]]);
            expect(A.norm('max')).assertEqual(5);
        });
        it('norm5', 0, () => {
            // norm max
            let A = new Matrix([[4, 2], [7, 1]]);
            expect(A.norm('max')).assertEqual(7);
        });
        it('transpose1', 0, () => {
            // transpose
            let A = new Matrix([[1, 1], [-1, -1]]);
            expect(JSON.stringify(A.transpose())).assertEqual('[[1,-1],[1,-1]]');
        });
        it('transpose2', 0, () => {
            // transpose
            let A = new Matrix([[1, 0], [2, 3]]);
            expect(JSON.stringify(A.transpose())).assertEqual('[[1,2],[0,3]]');
        });
        it('transpose3', 0, () => {
            // transpose
            let A = new Matrix([[1, 2], [3, 4]]);
            expect(JSON.stringify(A.transpose())).assertEqual('[[1,3],[2,4]]');
        });
        it('transpose4', 0, () => {
            // transpose
            let A = new Matrix([[0, -1], [3, 5]]);
            expect(JSON.stringify(A.transpose())).assertEqual('[[0,3],[-1,5]]');
        });
        it('transpose5', 0, () => {
            // transpose
            let A = new Matrix([[3, 2], [-1, 4]]);
            expect(JSON.stringify(A.transpose())).assertEqual('[[3,-1],[2,4]]');
        });
        it('inverse1', 0, () => {
            // inverse
            let matrix1 = new Matrix([
                [2, 3, 5],
                [4, 1, 6],
                [1, 3, 0],
            ]);
            let inverse1 = inverse(matrix1);
            expect(JSON.stringify(inverse1))
                .assertEqual('[[-0.4864864864864865,0.40540540540540536,0.35135135135135136],[0.16216216216216218,-0.13513513513513512,0.2162162162162162],[0.2972972972972973,-0.08108108108108109,-0.2702702702702703]]');
        });
        it('inverse2', 0, () => {
            // inverse
            let matrix2 = new Matrix([
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
            ]);
            let inverse2 = inverse(matrix2, true);
            expect(JSON.stringify(inverse2))
                .assertEqual('[[-0.6388888888888884,-0.166666666666667,0.3055555555555557],[-0.05555555555555665,-3.608224830031759e-16,0.05555555555555605],[0.5277777777777782,0.16666666666666718,-0.19444444444444497]]');
        });
        it('inverse3', 0, () => {
            // inverse
            let matrix2 = new Matrix([
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
            ]);
            try {
                let inverse2 = inverse(matrix2, false);
            }
            catch (e) {
                expect(e.message).assertEqual('LU matrix is singular');
            }
        });
        it('inverse4', 0, () => {
            // inverse
            let matrix1 = new Matrix([
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
            ]);
            try {
                let inverse1 = inverse(matrix1);
            }
            catch (e) {
                expect(e.message).assertEqual('LU matrix is singular');
            }
        });
        it('inverse5', 0, () => {
            // inverse
            let matrix1 = new Matrix([
                [2, 3, 5],
                [4, 1, 6],
                [1, 3, 0],
            ]);
            let inverse1 = inverse(matrix1, false);
            expect(JSON.stringify(inverse1))
                .assertEqual('[[-0.4864864864864865,0.40540540540540536,0.35135135135135136],[0.16216216216216218,-0.13513513513513512,0.2162162162162162],[0.2972972972972973,-0.08108108108108109,-0.2702702702702703]]');
        });
        it('pseudoInverse1', 0, () => {
            // pseudoInverse
            let matrix3 = new Matrix([
                [1, 2],
                [3, 4],
                [5, 6],
            ]);
            let pseudoInverseA = pseudoInverse(matrix3);
            expect(JSON.stringify(pseudoInverseA))
                .assertEqual('[[-1.3333333333333317,-0.3333333333333325,0.666666666666666],[1.0833333333333321,0.3333333333333327,-0.4166666666666662]]');
        });
        it('pseudoInverse2', 0, () => {
            // pseudoInverse
            let matrix3 = new Matrix([
                [1, 2, 3],
                [4, 5, 6]
            ]);
            let pseudoInverseA = pseudoInverse(matrix3);
            expect(JSON.stringify(pseudoInverseA))
                .assertEqual('[[-0.94444444444444384,0.4444444444444441],[-0.11111111111111098,0.11111111111111104],[0.7222222222222218,-0.22222222222222192]]');
        });
        it('pseudoInverse3', 0, () => {
            // pseudoInverse
            let matrix3 = new Matrix([
                [1, 2],
                [3, 4]
            ]);
            let pseudoInverseA = pseudoInverse(matrix3);
            expect(JSON.stringify(pseudoInverseA))
                .assertEqual('[[-2.000000000000002,1.0000000000000009],[1.5000000000000016,-0.5000000000000007]]');
        });
        it('pseudoInverse4', 0, () => {
            // pseudoInverse
            let matrix3 = new Matrix([
                [3, 4],
                [5, 6]
            ]);
            let pseudoInverseA = pseudoInverse(matrix3);
            expect(JSON.stringify(pseudoInverseA))
                .assertEqual('[[-2.999999999999985,1.99999999999999],[2.4999999999999876,-1.4999999999999918]]');
        });
        it('pseudoInverse5', 0, () => {
            // pseudoInverse
            let matrix3 = new Matrix([
                [3, 2, 1],
                [6, 5, 4]
            ]);
            let pseudoInverseA = pseudoInverse(matrix3);
            expect(JSON.stringify(pseudoInverseA))
                .assertEqual('[[0.7222222222222218,-0.22222222222222204],[-0.11111111111111122,0.11111111111111113],[-0.9444444444444435,0.4444444444444441]]');
        });
        it('Matrix.columnVector1', 0, () => {
            // columnVector
            let matrix2 = Matrix.columnVector([1, 2, 3, 4]);
            expect(JSON.stringify(matrix2)).assertEqual('[[1],[2],[3],[4]]');
        });
        it('Matrix.columnVector2', 0, () => {
            // columnVector
            let matrix2 = Matrix.columnVector([4.5, 4.25, 5.5, 5.5]);
            expect(JSON.stringify(matrix2)).assertEqual('[[4.5],[4.25],[5.5],[5.5]]');
        });
        it('Matrix.columnVector3', 0, () => {
            // columnVector
            let matrix2 = Matrix.columnVector([-4.5, 4.25, -5.5, 5.5]);
            expect(JSON.stringify(matrix2)).assertEqual('[[-4.5],[4.25],[-5.5],[5.5]]');
        });
        it('columnVector4', 0, () => {
            // columnVector
            let matrix2 = Matrix.columnVector([-1, 0, 1]);
            expect(JSON.stringify(matrix2)).assertEqual('[[-1],[0],[1]]');
        });
        it('Matrix.columnVector5', 0, () => {
            // columnVector
            let matrix2 = Matrix.columnVector([3, 2, 0, 5]);
            expect(JSON.stringify(matrix2)).assertEqual('[[3],[2],[0],[5]]');
        });
        it('solve1', 0, () => {
            let matrix1: Matrix = new Matrix([
                [3, 1],
                [4.25, 1],
                [5.5, 1],
                [8, 1],
            ]);
            let matrix2 = new Matrix([[4.5], [4.25], [5.5], [5.5]]);
            // solve
            let a = solve(matrix1, matrix2);
            expect(JSON.stringify(a)).assertEqual('[[0.2457142857142858],[3.662857142857142]]');
        });
        it('solve2', 0, () => {
            let matrix1: Matrix = new Matrix([
                [3, 1],
                [4.25, 1],
                [5.5, 1],
                [8, 1],
            ]);
            let matrix2 = new Matrix([[4.5], [4.25], [5.5], [5.5]]);
            // solve
            let a = solve(matrix1, matrix2, false);
            expect(JSON.stringify(a)).assertEqual('[[0.2457142857142858],[3.662857142857142]]');
        });
        it('solve3', 0, () => {
            let matrix1: Matrix = new Matrix([
                [3, 1],
                [4.25, 1],
                [5.5, 1],
                [8, 1],
            ]);
            let matrix2 = new Matrix([[4.5], [4.25], [5.5], [5.5]]);
            // solve
            let a = solve(matrix1, matrix2, true);
            expect(JSON.stringify(a)).assertEqual('[[0.245714285714286],[3.66285714285714]]');
        });
        it('solve4', 0, () => {
            let matrix3 = new Matrix([
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
            ]);
            let matrix4 = new Matrix([[8], [20], [32]]);
            // solve
            let b = solve(matrix3, matrix4, true);
            expect(JSON.stringify(b)).assertEqual('[[1.3333333333333357],[1.3333333333333333],[1.3333333333333304]]');
        });
        it('solve5', 0, () => {
            let matrix3 = new Matrix([
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
            ]);
            let matrix4 = new Matrix([[8], [20], [32]]);
            // solve
            try {
                let b = solve(matrix3, matrix4, false);
                expect(JSON.stringify(b)).assertEqual('[[1.3333333333333357],[1.3333333333333333],[1.3333333333333304]]');
            }
            catch (e) {
                expect(e.message).assertEqual('LU matrix is singular');
            }
        });
        it('QR1', 0, () => {
            // QR
            let matrix1 = new Matrix([
                [2, 3, 5],
                [4, 1, 6],
                [1, 3, 0],
            ]);
            let qr = new QrDecomposition(matrix1);
            let q = qr.orthogonalMatrix;
            let r = qr.upperTriangularMatrix;
            expect(JSON.stringify(qr))
                .assertEqual('{"QR":[[1.4364357804719847,-2.836832573067901,-7.419408268023741],[0.8728715609439693,1.7695681194400503,-0.01438886157672603],[0.21821789023599233,-0.6385647261957902,2]],"Rdiag":{"0":-4.582575694955841,"1":3.309438162646486,"2":2.43970775156441}}');
            expect(JSON.stringify(q))
                .assertEqual('[[-0.4364357804719847,0.5323878783387823,0.7253185207353656],[-0.8728715609439693,-0.44605470887843957,-0.19781414201873648],[-0.21821789023599233,0.7194430788361929,-0.6593804733957869]]');
            expect(JSON.stringify(r))
                .assertEqual('[[-4.582575694955841,-2.836832573067901,-7.419408268023741],[0,3.309438162646486,-0.01438886157672603],[0,0,2.43970775156441]]');
        });
        it('QR2', 0, () => {
            // QR
            let matrix1 = new Matrix([
                [2, 3],
                [4, 1]
            ]);
            let qr = new QrDecomposition(matrix1);
            let q = qr.orthogonalMatrix;
            let r = qr.upperTriangularMatrix;
            expect(JSON.stringify(qr))
                .assertEqual('{"QR":[[1.4472135954999579,-2.236067977499789],[0.8944271909999159,2]],"Rdiag":{"0":-4.47213595499958,"1":2.2360679774997894}}');
            expect(JSON.stringify(q))
                .assertEqual('[[-0.44721359549995787,0.894427190999916],[-0.8944271909999159,-0.44721359549995787]]');
            expect(JSON.stringify(r))
                .assertEqual('[[-4.47213595499958,-2.236067977499789],[0,2.2360679774997894]]');
        });
        it('QR3', 0, () => {
            // QR
            let matrix1 = new Matrix([
                [1, 2],
                [3, 4]
            ]);
            let qr = new QrDecomposition(matrix1);
            let q = qr.orthogonalMatrix;
            let r = qr.upperTriangularMatrix;
            expect(JSON.stringify(qr))
                .assertEqual('{"QR":[[1.316227766016838,-4.427188724235731],[0.9486832980505138,2]],"Rdiag":{"0":-3.1622776601683795,"1":0.6324555320336751}}');
            expect(JSON.stringify(q))
                .assertEqual('[[-0.316227766016838,0.9486832980505138],[-0.9486832980505138,-0.316227766016838]]');
            expect(JSON.stringify(r))
                .assertEqual('[[-3.1622776601683795,-4.427188724235731],[0,0.6324555320336751]]');
        });
        it('QR4', 0, () => {
            // QR
            let matrix1 = new Matrix([
                [3, 5],
                [1, 6]
            ]);
            let qr = new QrDecomposition(matrix1);
            let q = qr.orthogonalMatrix;
            let r = qr.upperTriangularMatrix;
            expect(JSON.stringify(qr))
                .assertEqual('{"QR":[[1.9486832980505138,-6.640783086353597],[0.31622776601683796,2]],"Rdiag":{"0":-3.1622776601683795,"1":-4.110960958218893}}');
            expect(JSON.stringify(q))
                .assertEqual('[[-0.9486832980505138,0.31622776601683796],[-0.31622776601683796,-0.9486832980505138]]');
            expect(JSON.stringify(r))
                .assertEqual('[[-3.1622776601683795,-6.640783086353597],[0,-4.110960958218893]]');
        });
        it('QR5', 0, () => {
            // QR
            let matrix1 = new Matrix([
                [3, 5],
                [1, 6],
                [3, 0]
            ]);
            let qr = new QrDecomposition(matrix1);
            let q = qr.orthogonalMatrix;
            let r = qr.upperTriangularMatrix;
            expect(JSON.stringify(qr))
                .assertEqual('{"QR":[[1.6882472016116852,-4.817730411281795],[0.22941573387056174,1.7590094451055134],[0.6882472016116852,-0.6510796128282781]],"Rdiag":{"0":-4.358898943540674,"1":-6.1473143472747935}}');
            expect(JSON.stringify(q))
                .assertEqual('[[-0.6882472016116852,-0.2739750126919126],[-0.22941573387056174,-0.7962398806358717],[-0.6882472016116852,0.5393883062372034]]');
            expect(JSON.stringify(r))
                .assertEqual('[[-4.358898943540674,-4.817730411281795],[0,-6.1473143472747935]]');
        });
        it('QRsolve1', 0, () => {
            // QR
            let matrix1 = new Matrix([
                [2, 3, 5],
                [4, 1, 6],
                [1, 3, 0],
            ]);
            let qr = new QrDecomposition(matrix1);
            let matrix2 = new Matrix([
                [1, 2, 3],
                [4, 5, 1],
                [6, 7, 8]
            ]);
            let m = qr.solve(matrix2);
            expect(JSON.stringify(m)).assertEqual('[[3.2432432432432448,3.5135135135135167,1.7567567567567572],[0.918918918918918,1.162162162162161,2.0810810810810807],[-1.64864864864865,-1.7027027027027046,-1.3513513513513518]]');
        });
        it('QRsolve2', 0, () => {
            // QR
            let matrix1 = new Matrix([
                [2, 3],
                [4, 1]
            ]);
            let qr = new QrDecomposition(matrix1);
            let matrix2 = new Matrix([
                [1, 2],
                [3, 4]
            ]);
            let m = qr.solve(matrix2);
            expect(JSON.stringify(m)).assertEqual('[[0.7999999999999999,1],[-0.2,0]]');
        });
        it('QRsolve3', 0, () => {
            // QR
            let matrix1 = new Matrix([
                [1, 2],
                [3, 4]
            ]);
            let qr = new QrDecomposition(matrix1);
            let matrix2 = new Matrix([
                [1, 2],
                [3, 4]
            ]);
            let m = qr.solve(matrix2);
            expect(JSON.stringify(m)).assertEqual('[[1.0000000000000009,0],[-7.02166693715341e-16,1]]');
        });
        it('QRsolve4', 0, () => {
            // QR
            let matrix1 = new Matrix([
                [3, 5],
                [1, 6]
            ]);
            let qr = new QrDecomposition(matrix1);
            let matrix2 = new Matrix([
                [1, 2],
                [3, 4]
            ]);
            let m = qr.solve(matrix2);
            expect(JSON.stringify(m)).assertEqual('[[-0.6923076923076923,-0.6153846153846153],[0.6153846153846154,0.7692307692307692]]');
        });
        it('QRsolve5', 0, () => {
            // QR
            let matrix1 = new Matrix([
                [3, 5],
                [1, 6],
                [3, 0]
            ]);
            let qr = new QrDecomposition(matrix1);
            let matrix2 = new Matrix([
                [1, 2],
                [3, 4]
            ]);
            try {
                let m = qr.solve(matrix2);
            }
            catch (e) {
                expect(e.message).assertEqual('Matrix row dimensions must agree');
            }
        });
        it('QRisFullRank1', 0, () => {
            // QR
            let matrix1 = new Matrix([
                [2, 3, 5],
                [4, 1, 6],
                [1, 3, 0],
            ]);
            let qr = new QrDecomposition(matrix1);
            expect(qr.isFullRank()).assertTrue();
        });
        it('QRisFullRank2', 0, () => {
            // QR
            let matrix1 = new Matrix([
                [2, 3],
                [4, 1]
            ]);
            let qr = new QrDecomposition(matrix1);
            expect(qr.isFullRank()).assertTrue();
        });
        it('QRisFullRank3', 0, () => {
            // QR
            let matrix1 = new Matrix([
                [1, 2],
                [3, 4]
            ]);
            let qr = new QrDecomposition(matrix1);
            expect(qr.isFullRank()).assertTrue();
        });
        it('QRisFullRank4', 0, () => {
            // QR
            let matrix1 = new Matrix([
                [3, 5],
                [1, 6]
            ]);
            let qr = new QrDecomposition(matrix1);
            expect(qr.isFullRank()).assertTrue();
        });
        it('QRisFullRank5', 0, () => {
            // QR
            let matrix1 = new Matrix([
                [3, 5],
                [1, 6],
                [3, 0]
            ]);
            let qr = new QrDecomposition(matrix1);
            expect(qr.isFullRank()).assertTrue();
        });
        it('LU1', 0, () => {
            // LU
            let matrix1 = new Matrix([
                [2, 3, 5],
                [4, 1, 6],
                [1, 3, 0],
            ]);
            let lu = new LuDecomposition(matrix1);
            let l = lu.lowerTriangularMatrix;
            let u = lu.upperTriangularMatrix;
            let p = lu.pivotPermutationVector;
            expect(lu).not().assertNull();
            expect(JSON.stringify(lu))
                .assertEqual('{"LU":[[4,1,6],[0.25,2.75,-1.5],[0.5,0.9090909090909091,3.3636363636363633]],"pivotVector":{"0":1,"1":2,"2":0},"pivotSign":1}');
            expect(JSON.stringify(l)).assertEqual('[[1,0,0],[0.25,1,0],[0.5,0.9090909090909091,1]]');
            expect(JSON.stringify(u)).assertEqual('[[4,1,6],[0,2.75,-1.5],[0,0,3.3636363636363633]]');
            expect(JSON.stringify(p)).assertEqual('[1,2,0]');
            // lu.solve()
            // lu.isSingular()
        });
        it('LU2', 0, () => {
            // LU
            let matrix1 = new Matrix([
                [2, 3],
                [4, 1]
            ]);
            let lu = new LuDecomposition(matrix1);
            let l = lu.lowerTriangularMatrix;
            let u = lu.upperTriangularMatrix;
            let p = lu.pivotPermutationVector;
            expect(lu).not().assertNull();
            expect(JSON.stringify(lu))
                .assertEqual('{"LU":[[4,1],[0.5,2.5]],"pivotVector":{"0":1,"1":0},"pivotSign":-1}');
            expect(JSON.stringify(l)).assertEqual('[[1,0],[0.5,1]]');
            expect(JSON.stringify(u)).assertEqual('[[4,1],[0,2.5]]');
            expect(JSON.stringify(p)).assertEqual('[1,0]');
        });
        it('LU3', 0, () => {
            // LU
            let matrix1 = new Matrix([
                [3, 5],
                [1, 6]
            ]);
            let lu = new LuDecomposition(matrix1);
            let l = lu.lowerTriangularMatrix;
            let u = lu.upperTriangularMatrix;
            let p = lu.pivotPermutationVector;
            expect(lu).not().assertNull();
            expect(JSON.stringify(lu))
                .assertEqual('{"LU":[[3,5],[0.3333333333333333,4.333333333333334]],"pivotVector":{"0":0,"1":1},"pivotSign":1}');
            expect(JSON.stringify(l)).assertEqual('[[1,0],[0.3333333333333333,1]]');
            expect(JSON.stringify(u)).assertEqual('[[3,5],[0,4.333333333333334]]');
            expect(JSON.stringify(p)).assertEqual('[0,1]');
        });
        it('LU4', 0, () => {
            // LU
            let matrix1 = new Matrix([
                [4, 1],
                [3, 0]
            ]);
            let lu = new LuDecomposition(matrix1);
            let l = lu.lowerTriangularMatrix;
            let u = lu.upperTriangularMatrix;
            let p = lu.pivotPermutationVector;
            expect(lu).not().assertNull();
            expect(JSON.stringify(lu))
                .assertEqual('{"LU":[[4,1],[0.75,-0.75]],"pivotVector":{"0":0,"1":1},"pivotSign":1}');
            expect(JSON.stringify(l)).assertEqual('[[1,0],[0.75,1]]');
            expect(JSON.stringify(u)).assertEqual('[[4,1],[0,-0.75]]');
            expect(JSON.stringify(p)).assertEqual('[0,1]');
        });
        it('LU5', 0, () => {
            // LU
            let matrix1 = new Matrix([
                [2, 5],
                [4, 6]
            ]);
            let lu = new LuDecomposition(matrix1);
            let l = lu.lowerTriangularMatrix;
            let u = lu.upperTriangularMatrix;
            let p = lu.pivotPermutationVector;
            expect(lu).not().assertNull();
            expect(JSON.stringify(lu))
                .assertEqual('{"LU":[[4,6],[0.5,2]],"pivotVector":{"0":1,"1":0},"pivotSign":-1}');
            expect(JSON.stringify(l)).assertEqual('[[1,0],[0.5,1]]');
            expect(JSON.stringify(u)).assertEqual('[[4,6],[0,2]]');
            expect(JSON.stringify(p)).assertEqual('[1,0]');
        });
        it('CholeskyDecomposition1', 0, () => {
            let matrix1 = new Matrix([
                [2, 3, 5],
                [4, 1, 6],
                [1, 3, 0],
            ]);
            // CholeskyDecomposition
            try {
                new CholeskyDecomposition(matrix1);
            }
            catch (e) {
                expect(e.message).assertEqual('Matrix is not symmetric');
            }
        });
        it('CholeskyDecomposition2', 0, () => {
            // CholeskyDecomposition
            let matrix2 = new Matrix([
                [1, 0, -1],
                [0, 1, 0],
                [-1, 0, 1],
            ]);
            let cholesky = new CholeskyDecomposition(matrix2);
            expect(cholesky).not().assertNull();
            expect(JSON.stringify(cholesky)).assertEqual('{"L":[[1,0,0],[0,1,0],[-1,0,0]],"positiveDefinite":false}');
            let l = cholesky.lowerTriangularMatrix;
            expect(JSON.stringify(l)).assertEqual('[[1,0,0],[0,1,0],[-1,0,0]]');
        });
        it('CholeskyDecomposition3', 0, () => {
            // CholeskyDecomposition
            let matrix2 = new Matrix([
                [-1, 0],
                [0, -1]
            ]);
            let cholesky = new CholeskyDecomposition(matrix2);
            expect(cholesky).not().assertNull();
            expect(JSON.stringify(cholesky)).assertEqual('{"L":[[0,0],[null,null]],"positiveDefinite":false}');
        });
        it('CholeskyDecomposition4', 0, () => {
            // CholeskyDecomposition
            let matrix2 = new Matrix([
                [1, 0],
                [0, 1]
            ]);
            let cholesky = new CholeskyDecomposition(matrix2);
            expect(cholesky).not().assertNull();
            expect(JSON.stringify(cholesky)).assertEqual('{"L":[[1,0],[0,1]],"positiveDefinite":true}');
        });
        it('CholeskyDecomposition5', 0, () => {
            // CholeskyDecomposition
            let matrix2 = new Matrix([
                [1, 2],
                [2, 1]
            ]);
            let cholesky = new CholeskyDecomposition(matrix2);
            expect(cholesky).not().assertNull();
            expect(JSON.stringify(cholesky)).assertEqual('{"L":[[1,0],[2,0]],"positiveDefinite":false}');
        });
        it('CholeskyDecompositionIsPositiveDefinite1', 0, () => {
            // isPositiveDefinite
            let matrix2 = new Matrix([
                [-1, 2],
                [2, -1]
            ]);
            let cholesky = new CholeskyDecomposition(matrix2);
            expect(cholesky.isPositiveDefinite()).assertFalse();
        });
        it('CholeskyDecompositionIsPositiveDefinite2', 0, () => {
            // isPositiveDefinite
            let matrix2 = new Matrix([
                [1, 0, -1],
                [0, 1, 0],
                [-1, 0, 1],
            ]);
            let cholesky = new CholeskyDecomposition(matrix2);
            expect(cholesky.isPositiveDefinite()).assertFalse();
        });
        it('CholeskyDecompositionIsPositiveDefinite3', 0, () => {
            // isPositiveDefinite
            let matrix2 = new Matrix([
                [-1, 0],
                [0, -1]
            ]);
            let cholesky = new CholeskyDecomposition(matrix2);
            expect(cholesky.isPositiveDefinite()).assertFalse();
        });
        it('CholeskyDecompositionIsPositiveDefinite4', 0, () => {
            // isPositiveDefinite
            let matrix2 = new Matrix([
                [1, 0],
                [0, 1]
            ]);
            let cholesky = new CholeskyDecomposition(matrix2);
            expect(cholesky.isPositiveDefinite()).assertTrue();
        });
        it('CholeskyDecompositionIsPositiveDefinite5', 0, () => {
            // isPositiveDefinite
            let matrix2 = new Matrix([
                [1, 2],
                [2, 1]
            ]);
            let cholesky = new CholeskyDecomposition(matrix2);
            expect(cholesky.isPositiveDefinite()).assertFalse();
        });
        it('choleskySolve1', 0, () => {
            // CholeskyDecomposition.solve()
            let matrix1 = new Matrix([
                [1, 2],
                [3, 4]
            ]);
            let matrix2 = new Matrix([
                [-1, 2],
                [2, -1]
            ]);
            let cholesky = new CholeskyDecomposition(matrix2);
            try {
                let m = cholesky.solve(matrix1);
            }
            catch (e) {
                expect(e.message).assertEqual('Matrix is not positive definite');
            }
        });
        it('choleskySolve2', 0, () => {
            // CholeskyDecomposition.solve()
            let matrix1 = new Matrix([
                [1, 2],
                [3, 4]
            ]);
            let matrix2 = new Matrix([
                [1, 0, -1],
                [0, 1, 0],
                [-1, 0, 1],
            ]);
            let cholesky = new CholeskyDecomposition(matrix2);
            try {
                let m = cholesky.solve(matrix1);
            }
            catch (e) {
                expect(e.message).assertEqual('Matrix dimensions do not match');
            }
        });
        it('choleskySolve3', 0, () => {
            // CholeskyDecomposition.solve()
            let matrix1 = new Matrix([
                [1, 2],
                [3, 4]
            ]);
            let matrix2 = new Matrix([
                [-1, 0],
                [0, -1]
            ]);
            let cholesky = new CholeskyDecomposition(matrix2);
            try {
                let m = cholesky.solve(matrix1);
            }
            catch (e) {
                expect(e.message).assertEqual('Matrix is not positive definite');
            }
        });
        it('choleskySolve4', 0, () => {
            // CholeskyDecomposition.solve()
            let matrix1 = new Matrix([
                [1, 2],
                [3, 4]
            ]);
            let matrix2 = new Matrix([
                [1, 0],
                [0, 1]
            ]);
            let cholesky = new CholeskyDecomposition(matrix2);
            let m = cholesky.solve(matrix1);
            expect(JSON.stringify(m)).assertEqual('[[1,2],[3,4]]');
        });
        it('choleskySolve5', 0, () => {
            // CholeskyDecomposition.solve()
            let matrix1 = new Matrix([
                [-1, 2],
                [3, 1]
            ]);
            let matrix2 = new Matrix([
                [2, 0],
                [0, 2]
            ]);
            let cholesky = new CholeskyDecomposition(matrix2);
            let m = cholesky.solve(matrix1);
            expect(JSON.stringify(m)).assertEqual('[[-0.49999999999999992,0.99999999999999984],[1.4999999999999998,0.49999999999999992]]');
        });
        it('EigenvalueDecomposition1', 0, () => {
            // EigenvalueDecomposition
            let matrix = new Matrix([
                [2, 3, 5],
                [4, 1, 6],
                [1, 3, 0],
            ]);
            let e = new EigenvalueDecomposition(matrix);
            expect(e).not().assertNull();
            expect(JSON.stringify(e.realEigenvalues))
                .assertEqual('[7.822948255619546,-1.3695850618081904,-3.4533631938113545]');
            expect(JSON.stringify(e.imaginaryEigenvalues)).assertEqual('[0,0,0]');
            expect(JSON.stringify(e.eigenvectorMatrix))
                .assertEqual('[[-0.6462531590864796,-0.8876758038947976,-0.29053047117056736],[-0.6812593623869361,0.031384322037362966,-0.866125858804982],[-0.34386412364608564,0.5793892324840797,0.8365491509154376]]');
        });
        it('EigenvalueDecomposition2', 0, () => {
            // EigenvalueDecomposition
            let matrix = new Matrix([
                [2, 5],
                [4, 6]
            ]);
            let e = new EigenvalueDecomposition(matrix);
            expect(e).not().assertNull();
            expect(JSON.stringify(e.realEigenvalues))
                .assertEqual('[-0.8989794855663558,8.898979485566356]');
            expect(JSON.stringify(e.imaginaryEigenvalues)).assertEqual('[0,0]');
            expect(JSON.stringify(e.eigenvectorMatrix))
                .assertEqual('[[-0.8651078113033046,-0.5898806558121752],[0.5015859595542981,-0.8139149086761249]]');
        });
        it('EigenvalueDecomposition3', 0, () => {
            // EigenvalueDecomposition
            let matrix = new Matrix([
                [2, 3],
                [4, 1]
            ]);
            let e = new EigenvalueDecomposition(matrix);
            expect(e).not().assertNull();
            expect(JSON.stringify(e.realEigenvalues))
                .assertEqual('[5,-2]');
            expect(JSON.stringify(e.imaginaryEigenvalues)).assertEqual('[0,0]');
            expect(JSON.stringify(e.eigenvectorMatrix))
                .assertEqual('[[0.7071067811865475,-0.6060915267313264],[0.7071067811865475,0.8081220356417685]]');
        });
        it('EigenvalueDecomposition4', 0, () => {
            // EigenvalueDecomposition
            let matrix = new Matrix([
                [2, 3],
                [1, 0],
            ]);
            let e = new EigenvalueDecomposition(matrix);
            expect(e).not().assertNull();
            expect(JSON.stringify(e.realEigenvalues))
                .assertEqual('[3,-1]');
            expect(JSON.stringify(e.imaginaryEigenvalues)).assertEqual('[0,0]');
            expect(JSON.stringify(e.eigenvectorMatrix))
                .assertEqual('[[0.9486832980505138,-0.7905694150420948],[0.31622776601683796,0.7905694150420948]]');
        });
        it('EigenvalueDecomposition5', 0, () => {
            // EigenvalueDecomposition
            let matrix = new Matrix([
                [2, 5],
                [1, 3]
            ]);
            let e = new EigenvalueDecomposition(matrix);
            expect(e).not().assertNull();
            expect(JSON.stringify(e.realEigenvalues))
                .assertEqual('[0.20871215252208008,4.79128784747792]');
            expect(JSON.stringify(e.imaginaryEigenvalues)).assertEqual('[0,0]');
            expect(JSON.stringify(e.eigenvectorMatrix))
                .assertEqual('[[-0.94140906247221168,-1.158996120469329],[0.337266922622411,-0.6470183572680188]]');
        });
        it('linearDependencies1', 0, () => {
            // linearDependencies
            let matrix = new Matrix([
                [2, 0, 0, 1],
                [0, 1, 6, 0],
                [0, 3, 0, 1],
                [0, 0, 1, 0],
                [0, 1, 2, 0],
            ]);
            expect(JSON.stringify(linearDependencies(matrix)))
                .assertEqual('[[0,0,0,0,0],[0,0,0,4,1.000000000000002],[0,0,0,0,0],[0,0.24999999999999992,0,0,-0.24999999999999994],[0,0.9999999999999996,0,-4,0]]');
        });
        it('linearDependencies2', 0, () => {
            // linearDependencies
            let matrix = new Matrix([
                [2, 0, 0, 1],
                [0, 1, 6, 0],
                [0, 3, 0, 1],
                [0, 0, 1, 0],
                [0, 1, 2, 0],
            ]);
            expect(JSON.stringify(linearDependencies(matrix, {
                thresholdValue: 10e-10
            })))
                .assertEqual('[[0,0,0,0,0],[0,0,0,4,1.000000000000002],[0,0,0,0,0],[0,0.24999999999999992,0,0,-0.24999999999999994],[0,0.9999999999999996,0,-4,0]]');
        });
        it('linearDependencies3', 0, () => {
            // linearDependencies
            let matrix = new Matrix([
                [2, 0, 0, 1],
                [0, 1, 6, 0],
                [0, 3, 0, 1],
                [0, 0, 1, 0],
                [0, 1, 2, 0],
            ]);
            expect(JSON.stringify(linearDependencies(matrix, {
                thresholdValue: 10e-3
            })))
                .assertEqual('[[0,0,0,0,0],[0,0,0,4,1.000000000000002],[0,0,0,0,0],[0,0.24999999999999992,0,0,-0.24999999999999994],[0,0.9999999999999996,0,-4,0]]');
        });
        it('linearDependencies4', 0, () => {
            // linearDependencies
            let matrix = new Matrix([
                [3, 0, 0, 1],
                [0, 2, 6, 0],
                [0, 1, 0, 1],
                [0, 0, 4, 0],
                [0, 1, 3, 0],
            ]);
            expect(JSON.stringify(linearDependencies(matrix, {
                thresholdValue: 10e-8
            })))
                .assertEqual('[[0,0,0,0,0],[0,0,0,0,2.0000000000000013],[0,0,0,0,0],[0,0,0,0,0],[0,0.5,0,0,0]]');
        });
        it('linearDependencies5', 0, () => {
            // linearDependencies
            let matrix = new Matrix([
                [2, 0, 0, 1],
                [0, 1, 6, 0],
                [0, 1, 4, 1],
                [0, 0, 2, 0],
                [0, 5, 2, 0],
            ]);
            expect(JSON.stringify(linearDependencies(matrix, {
                thresholdValue: 10e-2
            })))
                .assertEqual('[[0,0,0,0,0],[0,0,0,2.8000000000000007,0.19999999999999862],[0,0,0,0,0],[0,0.35714285714285716,0,0,0],[0,5.000000000000002,0,-14.000000000000009,0]]');
        });
        it('wrap1', 0, () => {
            // wrap
            let data: Array<Array<number>> = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
            let matrix = wrap(data);
            expect(matrix.rows).assertEqual(data.length);
            expect(matrix.columns).assertEqual(data[0].length);
            expect(matrix.get(0, 0)).assertEqual(data[0][0]);
            expect(matrix.get(1, 1)).assertEqual(data[1][1]);
            expect(matrix.get(2, 2)).assertEqual(data[2][2]);
        });
        it('wrap2', 0, () => {
            // wrap
            let data: Array<Array<number>> = [[1, 2], [3, 4]];
            let matrix = wrap(data);
            expect(matrix.rows).assertEqual(data.length);
            expect(matrix.columns).assertEqual(data[0].length);
            expect(matrix.get(0, 0)).assertEqual(data[0][0]);
            expect(matrix.get(1, 1)).assertEqual(data[1][1]);
        });
        it('wrap3', 0, () => {
            // wrap
            let data: Array<Array<number>> = [[-1, 0], [0, -1]];
            let matrix = wrap(data);
            expect(JSON.stringify(matrix)).assertEqual(JSON.stringify(data));
        });
        it('wrap4', 0, () => {
            // wrap
            let data: Array<Array<number>> = [[1, 3], [0, 2]];
            let matrix = wrap(data);
            expect(JSON.stringify(matrix)).assertEqual(JSON.stringify(data));
        });
        it('wrap5', 0, () => {
            // wrap
            let data: Array<Array<number>> = [[3, 1], [5, 2]];
            let matrix = wrap(data);
            expect(JSON.stringify(matrix)).assertEqual(JSON.stringify(data));
        });
        it('correlation1', 0, () => {
            // correlation
            let matrix1: Matrix = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let correlationMatrix1 = correlation(matrix1);
            expect(JSON.stringify(correlationMatrix1)).assertEqual('[[1,1,1],[1,1,1],[1,1,1]]');
        });
        it('correlation2', 0, () => {
            // correlation
            let matrix1: Matrix = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let correlationMatrix2 = correlation(matrix1, {
                center: false
            });
            expect(JSON.stringify(correlationMatrix2))
                .assertEqual('[[3.6666666666666683,4.333333333333334,5.000000000000002],[4.333333333333334,5.166666666666667,6],[5.000000000000002,6,6.999999999999999]]');
        });
        it('correlation3', 0, () => {
            // correlation
            let matrix1: Matrix = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let correlationMatrix3 = correlation(matrix1, {
                center: false, scale: false
            });
            expect(JSON.stringify(correlationMatrix3))
                .assertEqual('[[3.6666666666666665,4.333333333333333,5],[4.333333333333333,5.166666666666666,6],[5,6,7]]');
        });
        it('correlation4', 0, () => {
            // correlation
            let matrix1: Matrix = new Matrix([[2, 3], [4, 5]]);
            let correlationMatrix1 = correlation(matrix1);
            expect(JSON.stringify(correlationMatrix1)).assertEqual('[[1,1],[1,1]]');
        });
        it('correlation5', 0, () => {
            // correlation
            let matrix1: Matrix = new Matrix([[1, 2], [3, 4]]);
            let correlationMatrix1 = correlation(matrix1);
            expect(JSON.stringify(correlationMatrix1)).assertEqual('[[1,1],[1,1]]');
        });
        it('covariance1', 0, () => {
            // covariance
            let matrix1: Matrix = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let covarianceMatrix1 = covariance(matrix1, {
                center: true
            });
            expect(JSON.stringify(covarianceMatrix1)).assertEqual('[[9,9,9],[9,9,9],[9,9,9]]');
        });
        it('covariance2', 0, () => {
            // covariance
            let matrix1: Matrix = new Matrix([[1, 2, 3], [4, 5, 6]]);
            let covarianceMatrix2 = covariance(matrix1, {
                center: false
            });
            expect(JSON.stringify(covarianceMatrix2)).assertEqual('[[17,22,27],[22,29,36],[27,36,45]]');
        });
        it('covariance3', 0, () => {
            // covariance
            let matrix1: Matrix = new Matrix([[1, 2, 3], [7, 8, 9]]);
            let covarianceMatrix1 = covariance(matrix1);
            expect(JSON.stringify(covarianceMatrix1)).assertEqual('[[18,18,18],[18,18,18],[18,18,18]]');
        });
        it('covariance4', 0, () => {
            // covariance
            let matrix1: Matrix = new Matrix([[4, 5, 6], [7, 8, 9]]);
            let covarianceMatrix2 = covariance(matrix1, {
                center: true
            });
            expect(JSON.stringify(covarianceMatrix2)).assertEqual('[[4.5,4.5,4.5],[4.5,4.5,4.5],[4.5,4.5,4.5]]');
        });
        it('covariance5', 0, () => {
            // covariance
            let matrix1: Matrix = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let covarianceMatrix2 = covariance(matrix1);
            expect(JSON.stringify(covarianceMatrix2)).assertEqual('[[9,9,9],[9,9,9],[9,9,9]]');
        });
        it('SingularValueDecomposition1', 0, () => {
            // SingularValueDecomposition
            let testData = [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9]
            ];
            let testMatrix = new Matrix(testData);
            expect(testMatrix).not().assertNull();
            let svd: SingularValueDecomposition = new SingularValueDecomposition(testMatrix);
            expect(svd).not().assertNull();
            let singularValues = svd.diagonal;
            let leftSingularVectors = svd.leftSingularVectors;
            let rightSingularVectors = svd.rightSingularVectors;
            // 验证奇异值是否按降序排列
            expect(singularValues[0]).assertLarger(singularValues[1]);
            // 重建原始矩阵并与原始矩阵进行比较
            let reletructedMatrix = leftSingularVectors.mmul(Matrix.diag(singularValues))
                .mmul(rightSingularVectors.transpose());
            // 验证重建的矩阵与原始矩阵是否非常接近
            let tolerance = 1e-8;
            expect(testMatrix.sub(reletructedMatrix).abs().max()).assertLess(tolerance);
        });
        it('SingularValueDecomposition2', 0, () => {
            // SingularValueDecomposition
            let testMatrix = new Matrix([
                [1, 2],
                [4, 5]
            ]);
            let svd: SingularValueDecomposition = new SingularValueDecomposition(testMatrix);
            expect(svd).not().assertNull();
            let singularValues = svd.diagonal;
            // 验证奇异值是否按降序排列
            expect(singularValues[0]).assertLarger(singularValues[1]);
        });
        it('SingularValueDecomposition3', 0, () => {
            // SingularValueDecomposition
            let testMatrix = new Matrix([
                [1, 2],
                [3, 4]
            ]);
            let svd: SingularValueDecomposition = new SingularValueDecomposition(testMatrix);
            expect(svd).not().assertNull();
            let singularValues = svd.diagonal;
            // 验证奇异值是否按降序排列
            expect(singularValues[0]).assertLarger(singularValues[1]);
        });
        it('SingularValueDecomposition4', 0, () => {
            // SingularValueDecomposition
            let testMatrix = new Matrix([
                [2, 3],
                [3, 4]
            ]);
            let svd: SingularValueDecomposition = new SingularValueDecomposition(testMatrix);
            expect(svd).not().assertNull();
            let singularValues = svd.diagonal;
            // 验证奇异值是否按降序排列
            expect(singularValues[0]).assertLarger(singularValues[1]);
        });
        it('SingularValueDecomposition5', 0, () => {
            // SingularValueDecomposition
            let testMatrix = new Matrix([
                [0, 1],
                [2, 3]
            ]);
            let svd: SingularValueDecomposition = new SingularValueDecomposition(testMatrix);
            expect(svd).not().assertNull();
            let singularValues = svd.diagonal;
            // 验证奇异值是否按降序排列
            expect(singularValues[0]).assertLarger(singularValues[1]);
        });
        it('svd.inverse1', 0, () => {
            // SingularValueDecomposition
            let testData = [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9]
            ];
            let testMatrix = new Matrix(testData);
            let svd: SingularValueDecomposition = new SingularValueDecomposition(testMatrix);
            let m = svd.inverse();
            expect(JSON.stringify(m)).assertEqual('[[-0.6388888888888884,-0.166666666666667,0.3055555555555557],[-0.05555555555555665,-3.608224830031759e-16,0.05555555555555605],[0.5277777777777782,0.16666666666666718,-0.19444444444444497]]');
        });
        it('svd.inverse2', 0, () => {
            // SingularValueDecomposition
            let testData = [
                [2, 3],
                [4, 5]
            ];
            let testMatrix = new Matrix(testData);
            let svd: SingularValueDecomposition = new SingularValueDecomposition(testMatrix);
            let m = svd.inverse();
            expect(JSON.stringify(m)).assertEqual('[[-2.499999999999998,1.4999999999999982],[1.9999999999999982,-0.9999999999999987]]');
        });
        it('svd.inverse3', 0, () => {
            // SingularValueDecomposition
            let testData = [
                [2, 3],
                [4, 5]
            ];
            let testMatrix = new Matrix(testData);
            let svd: SingularValueDecomposition = new SingularValueDecomposition(testMatrix, {
                computeLeftSingularVectors: true
            });
            let m = svd.inverse();
            expect(JSON.stringify(m)).assertEqual('[[-2.499999999999998,1.4999999999999982],[1.9999999999999982,-0.9999999999999987]]');
        });
        it('svd.inverse4', 0, () => {
            // SingularValueDecomposition
            let testData = [
                [2, 3],
                [4, 5]
            ];
            let testMatrix = new Matrix(testData);
            let svd: SingularValueDecomposition = new SingularValueDecomposition(testMatrix, {
                computeLeftSingularVectors: true, computeRightSingularVectors: true, autoTranspose: false
            });
            let m = svd.inverse();
            expect(JSON.stringify(m)).assertEqual('[[-2.499999999999998,1.4999999999999982],[1.9999999999999982,-0.9999999999999987]]');
        });
        it('svd.inverse5', 0, () => {
            // SingularValueDecomposition
            let testData = [
                [2, 3],
                [4, 5]
            ];
            let testMatrix = new Matrix(testData);
            let svd: SingularValueDecomposition = new SingularValueDecomposition(testMatrix, {
                computeLeftSingularVectors: false, computeRightSingularVectors: false, autoTranspose: true
            });
            let m = svd.inverse();
            expect(JSON.stringify(m)).assertEqual('[[0,0],[0,0]]');
        });
        it('svd.solve1', 0, () => {
            // SingularValueDecomposition solve
            let testData = [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9]
            ];
            let testMatrix = new Matrix(testData);
            let svd: SingularValueDecomposition = new SingularValueDecomposition(testMatrix);
            let m1 = new Matrix([[1, 1, 1], [1, 1, 1], [1, 1, 1]]);
            let m = svd.solve(m1);
            expect(JSON.stringify(m)).assertEqual('[[-0.49999999999999967,-0.49999999999999967,-0.49999999999999967],[-9.575673587391975e-16,-9.575673587391975e-16,-9.575673587391975e-16],[0.5000000000000004,0.5000000000000004,0.5000000000000004]]');
        });
        it('svd.solve2', 0, () => {
            // SingularValueDecomposition solve
            let testData = [
                [1, 2],
                [4, 5]
            ];
            let testMatrix = new Matrix(testData);
            let svd: SingularValueDecomposition = new SingularValueDecomposition(testMatrix);
            let m1 = new Matrix([[1, 1], [1, 1]]);
            let m = svd.solve(m1);
            expect(JSON.stringify(m)).assertEqual('[[-0.9999999999999993,-0.9999999999999993],[0.9999999999999994,0.9999999999999994]]');
        });
        it('svd.solve3', 0, () => {
            // SingularValueDecomposition solve
            let testData = [
                [2, 3],
                [4, 5]
            ];
            let testMatrix = new Matrix(testData);
            let svd: SingularValueDecomposition = new SingularValueDecomposition(testMatrix);
            let m1 = new Matrix([[1, 1], [1, 1]]);
            let m = svd.solve(m1);
            expect(JSON.stringify(m)).assertEqual('[[-0.9999999999999996,-0.9999999999999996],[0.9999999999999996,0.9999999999999996]]');
        });
        it('svd.solve4', 0, () => {
            // SingularValueDecomposition solve
            let testData = [
                [1, 2],
                [3, 4]
            ];
            let testMatrix = new Matrix(testData);
            let svd: SingularValueDecomposition = new SingularValueDecomposition(testMatrix);
            let m1 = new Matrix([[1, 1], [1, 1]]);
            let m = svd.solve(m1);
            expect(JSON.stringify(m)).assertEqual('[[-1.0000000000000013,-1.0000000000000013],[1.0000000000000009,1.0000000000000009]]');
        });
        it('svd.solve5', 0, () => {
            // SingularValueDecomposition solve
            let testData = [
                [0, 2],
                [3, 5]
            ];
            let testMatrix = new Matrix(testData);
            let svd: SingularValueDecomposition = new SingularValueDecomposition(testMatrix);
            let m1 = new Matrix([[1, 1], [1, 1]]);
            let m = svd.solve(m1);
            expect(JSON.stringify(m)).assertEqual('[[-0.5,-0.5],[0.5,0.5]]');
        });
        it('svd.solveForDiagonal1', 0, () => {
            // SingularValueDecomposition solveForDiagonal
            let testData = [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9]
            ];
            let testMatrix = new Matrix(testData);
            let svd: SingularValueDecomposition = new SingularValueDecomposition(testMatrix);
            let m = svd.solveForDiagonal([1, 2, 3]);
            expect(JSON.stringify(m)).assertEqual('[[-0.6388888888888884,-0.333333333333334,0.91666666666666704],[-0.05555555555555665,-7.216449660063518e-16,0.16666666666666816],[0.5277777777777782,0.33333333333333436,-0.5833333333333349]]');
        });
        it('svd.solveForDiagonal2', 0, () => {
            // SingularValueDecomposition solveForDiagonal
            let testData = [
                [1, 2],
                [4, 5]
            ];
            let testMatrix = new Matrix(testData);
            let svd: SingularValueDecomposition = new SingularValueDecomposition(testMatrix);
            let m = svd.solveForDiagonal([1, 2]);
            expect(JSON.stringify(m)).assertEqual('[[-1.666666666666666,1.3333333333333335],[1.3333333333333328,-0.6666666666666667]]');
        });
        it('svd.solveForDiagonal3', 0, () => {
            // SingularValueDecomposition solveForDiagonal
            let testData = [
                [2, 3],
                [4, 5]
            ];
            let testMatrix = new Matrix(testData);
            let svd: SingularValueDecomposition = new SingularValueDecomposition(testMatrix);
            let m = svd.solveForDiagonal([1, 2]);
            expect(JSON.stringify(m)).assertEqual('[[-2.499999999999998,2.9999999999999964],[1.9999999999999982,-1.9999999999999973]]');
        });
        it('svd.solveForDiagonal4', 0, () => {
            // SingularValueDecomposition solveForDiagonal
            let testData = [
                [5, 6],
                [7, 8]
            ];
            let testMatrix = new Matrix(testData);
            let svd: SingularValueDecomposition = new SingularValueDecomposition(testMatrix);
            let m = svd.solveForDiagonal([1, 2, 3]);
            expect(JSON.stringify(m)).assertEqual('[[-4.000000000000004,6.000000000000006,0],[3.5000000000000044,-5.000000000000006,0]]');
        });
        it('svd.solveForDiagonal5', 0, () => {
            // SingularValueDecomposition solveForDiagonal
            let testData = [
                [1, 3],
                [7, 9]
            ];
            let testMatrix = new Matrix(testData);
            let svd: SingularValueDecomposition = new SingularValueDecomposition(testMatrix);
            let m = svd.solveForDiagonal([1, 2]);
            expect(JSON.stringify(m)).assertEqual('[[-0.7499999999999998,0.5],[0.5833333333333333,-0.16666666666666676]]');
        });
        it('and1', 0, () => {
            // and
            let matrix1 = new Matrix([[1, 1], [0, 0]]);
            let matrix2 = new Matrix([[1, 0], [1, 0]]);
            let andMatrix = matrix1.and(matrix2);
            expect(andMatrix.get(0, 0)).assertEqual(1);
            expect(andMatrix.get(0, 1)).assertEqual(0);
            expect(andMatrix.get(1, 0)).assertEqual(0);
            expect(andMatrix.get(1, 1)).assertEqual(0);
        });
        it('and2', 0, () => {
            // and
            let matrix1 = new Matrix([[1, 0], [0, 1]]);
            let matrix2 = new Matrix([[0, 1], [1, 0]]);
            let andMatrix = matrix1.and(matrix2);
            expect(JSON.stringify(andMatrix)).assertEqual('[[0,0],[0,0]]');
        });
        it('and3', 0, () => {
            // and
            let matrix1 = new Matrix([[1, 0], [0, 0]]);
            let matrix2 = new Matrix([[1, 1], [0, 1]]);
            let andMatrix = matrix1.and(matrix2);
            expect(JSON.stringify(andMatrix)).assertEqual('[[1,0],[0,0]]');
        });
        it('and4', 0, () => {
            // and
            let matrix1 = new Matrix([[1, 1], [0, 0]]);
            let matrix2 = new Matrix([[0, 0], [1, 1]]);
            let andMatrix = matrix1.and(matrix2);
            expect(JSON.stringify(andMatrix)).assertEqual('[[0,0],[0,0]]');
        });
        it('and5', 0, () => {
            // and
            let matrix1 = new Matrix([[1, 0], [1, 0]]);
            let matrix2 = new Matrix([[1, 1], [0, 1]]);
            let andMatrix = matrix1.and(matrix2);
            expect(JSON.stringify(andMatrix)).assertEqual('[[1,0],[0,0]]');
        });
        it('center1', 0, () => {
            // center
            let matrix4 = new Matrix([[1, 2], [3, 4]]);
            let centeredMatrix = matrix4.center('column');
            expect(centeredMatrix.get(0, 0)).assertEqual(-1);
            expect(centeredMatrix.get(0, 1)).assertEqual(-1);
            expect(centeredMatrix.get(1, 0)).assertEqual(1);
            expect(centeredMatrix.get(1, 1)).assertEqual(1);
        });
        it('center2', 0, () => {
            // center
            let matrix4 = new Matrix([[1, 2], [3, 4]]);
            let centeredMatrix = matrix4.center('column', {
                center: [1, 1]
            });
            expect(JSON.stringify(centeredMatrix)).assertEqual('[[0,1],[2,3]]');
        });
        it('center3', 0, () => {
            // center
            let matrix4 = new Matrix([[0, 3], [2, 1]]);
            let centeredMatrix = matrix4.center('column', {
                center: [1, 1]
            });
            expect(JSON.stringify(centeredMatrix)).assertEqual('[[-1,2],[1,0]]');
        });
        it('center4', 0, () => {
            // center
            let matrix4 = new Matrix([[1, 5], [2, 6]]);
            let centeredMatrix = matrix4.center('column', {
                center: [1, 1]
            });
            expect(JSON.stringify(centeredMatrix)).assertEqual('[[0,4],[1,5]]');
        });
        it('center5', 0, () => {
            // center
            let matrix4 = new Matrix([[4, 2], [3, 1]]);
            let centeredMatrix = matrix4.center('column', {
                center: [1, 1]
            });
            expect(JSON.stringify(centeredMatrix)).assertEqual('[[3,1],[2,0]]');
        });
        it('clone1', 0, () => {
            // clone
            let matrix5 = new Matrix([[1, 2], [3, 4]]);
            let clonedMatrix = matrix5.clone();
            expect(clonedMatrix).assertDeepEquals(matrix5);
            expect(clonedMatrix).not().assertEqual(matrix5);
        });
        it('clone2', 0, () => {
            // clone
            let matrix5 = new Matrix([[1, 0], [2, -4]]);
            let clonedMatrix = matrix5.clone();
            expect(clonedMatrix).assertDeepEquals(matrix5);
            expect(clonedMatrix).not().assertEqual(matrix5);
        });
        it('clone3', 0, () => {
            // clone
            let matrix5 = new Matrix([[3, 2], [5, 4]]);
            let clonedMatrix = matrix5.clone();
            expect(clonedMatrix).assertDeepEquals(matrix5);
            expect(clonedMatrix).not().assertEqual(matrix5);
        });
        it('clone4', 0, () => {
            // clone
            let matrix5 = new Matrix([[1, 3], [2, 4]]);
            let clonedMatrix = matrix5.clone();
            expect(clonedMatrix).assertDeepEquals(matrix5);
            expect(clonedMatrix).not().assertEqual(matrix5);
        });
        it('clone5', 0, () => {
            // clone
            let matrix5 = new Matrix([[1, 4], [2, 5]]);
            let clonedMatrix = matrix5.clone();
            expect(clonedMatrix).assertDeepEquals(matrix5);
            expect(clonedMatrix).not().assertEqual(matrix5);
        });
        it('repeat1', 0, () => {
            // repeat
            let matrix6 = new Matrix([[1, 2], [3, 4]]);
            let repeatedMatrix = matrix6.repeat({
                rows: 2, columns: 3
            });
            expect(repeatedMatrix.rows).assertEqual(4);
            expect(repeatedMatrix.columns).assertEqual(6);
            expect(repeatedMatrix.get(0, 0)).assertEqual(1);
            expect(repeatedMatrix.get(0, 1)).assertEqual(2);
        });
        it('repeat2', 0, () => {
            // repeat
            let matrix6 = new Matrix([[1, 2], [3, 4]]);
            let repeatedMatrix = matrix6.repeat({
                rows: 2, columns: 2
            });
            expect(repeatedMatrix.rows).assertEqual(4);
            expect(repeatedMatrix.columns).assertEqual(4);
            expect(repeatedMatrix.get(0, 0)).assertEqual(1);
            expect(repeatedMatrix.get(0, 1)).assertEqual(2);
        });
        it('repeat3', 0, () => {
            // repeat
            let matrix6 = new Matrix([[1, 2], [3, 4]]);
            let repeatedMatrix = matrix6.repeat({
                rows: 1, columns: 2
            });
            expect(repeatedMatrix.rows).assertEqual(2);
            expect(repeatedMatrix.columns).assertEqual(4);
            expect(repeatedMatrix.get(0, 0)).assertEqual(1);
            expect(repeatedMatrix.get(0, 1)).assertEqual(2);
        });
        it('repeat4', 0, () => {
            // repeat
            let matrix6 = new Matrix([[1, 2], [3, 4]]);
            let repeatedMatrix = matrix6.repeat();
            expect(repeatedMatrix.rows).assertEqual(2);
            expect(repeatedMatrix.columns).assertEqual(2);
            expect(repeatedMatrix.get(0, 0)).assertEqual(1);
            expect(repeatedMatrix.get(0, 1)).assertEqual(2);
        });
        it('repeat5', 0, () => {
            // repeat
            let matrix6 = new Matrix([[1, 2], [3, 4]]);
            let repeatedMatrix = matrix6.repeat({
                rows: 3, columns: 3
            });
            expect(repeatedMatrix.rows).assertEqual(6);
            expect(repeatedMatrix.columns).assertEqual(6);
            expect(repeatedMatrix.get(0, 0)).assertEqual(1);
            expect(repeatedMatrix.get(0, 1)).assertEqual(2);
        });
        it('sum1', 0, () => {
            // sum
            let matrix = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            expect(matrix.sum()).assertEqual(45);
        });
        it('sum2', 0, () => {
            // sum
            let matrix = new Matrix([[1, 2], [3, 4]]);
            expect(matrix.sum()).assertEqual(10);
        });
        it('sum3', 0, () => {
            // sum
            let matrix = new Matrix([[1, 3], [4, 5]]);
            expect(matrix.sum()).assertEqual(13);
        });
        it('sum4', 0, () => {
            // sum
            let matrix = new Matrix([[1, 2], [5, 6]]);
            expect(matrix.sum()).assertEqual(14);
        });
        it('sum5', 0, () => {
            // sum
            let matrix = new Matrix([[2, 3], [4, 5]]);
            expect(matrix.sum()).assertEqual(14);
        });
        it('apply1', 0, () => {
            // apply
            let matrix3 = new Matrix([[1, 2], [3, 4]]);
            let applyMatrix = matrix3.apply((r, w) => {
                matrix3.set(r, w, matrix3.get(r, w) * 2);
            });
            expect(JSON.stringify(applyMatrix)).assertEqual('[[2,4],[6,8]]');
        });
        it('apply2', 0, () => {
            // apply
            let matrix3 = new Matrix([[1, 2], [3, 4]]);
            let applyMatrix = matrix3.apply((r, w) => {
                matrix3.set(r, w, matrix3.get(r, w) * 1);
            });
            expect(JSON.stringify(applyMatrix)).assertEqual('[[1,2],[3,4]]');
        });
        it('apply3', 0, () => {
            // apply
            let matrix3 = new Matrix([[1, 2], [3, 4]]);
            let applyMatrix = matrix3.apply((r, w) => {
                matrix3.set(r, w, matrix3.get(r, w) * 3);
            });
            expect(JSON.stringify(applyMatrix)).assertEqual('[[3,6],[9,12]]');
        });
        it('apply4', 0, () => {
            // apply
            let matrix3 = new Matrix([[1, 2], [3, 4]]);
            let applyMatrix = matrix3.apply((r, w) => {
                matrix3.set(r, w, matrix3.get(r, w) * 4);
            });
            expect(JSON.stringify(applyMatrix)).assertEqual('[[4,8],[12,16]]');
        });
        it('apply5', 0, () => {
            // apply
            let matrix3 = new Matrix([[1, 2], [3, 4]]);
            let applyMatrix = matrix3.apply((r, w) => {
                matrix3.set(r, w, matrix3.get(r, w) * 1.5);
            });
            expect(JSON.stringify(applyMatrix)).assertEqual('[[1.5,3],[4.5,6]]');
        });
        it('not1', 0, () => {
            // not
            let matrix7 = new Matrix([[1, 0], [0, 1]]);
            let notMatrix = matrix7.not();
            expect(notMatrix.get(0, 0)).assertEqual(-2);
            expect(notMatrix.get(0, 1)).assertEqual(-1);
            expect(notMatrix.get(1, 0)).assertEqual(-1);
            expect(notMatrix.get(1, 1)).assertEqual(-2);
        });
        it('not2', 0, () => {
            // not
            let matrix7 = new Matrix([[0, 1], [1, 0]]);
            let notMatrix = matrix7.not();
            expect(JSON.stringify(notMatrix)).assertEqual('[[-1,-2],[-2,-1]]');
        });
        it('not3', 0, () => {
            // not
            let matrix7 = new Matrix([[1, 2], [3, 4]]);
            let notMatrix = matrix7.not();
            expect(JSON.stringify(notMatrix)).assertEqual('[[-2,-3],[-4,-5]]');
        });
        it('not4', 0, () => {
            // not
            let matrix7 = new Matrix([[1, 0], [2, 4]]);
            let notMatrix = matrix7.not();
            expect(JSON.stringify(notMatrix)).assertEqual('[[-2,-1],[-3,-5]]');
        });
        it('not5', 0, () => {
            // not
            let matrix7 = new Matrix([[1, 3], [2, 5]]);
            let notMatrix = matrix7.not();
            expect(JSON.stringify(notMatrix)).assertEqual('[[-2,-4],[-3,-6]]');
        });
        it('or1', 0, () => {
            // or
            let matrix8 = new Matrix([[1, 0], [0, 1]]);
            let matrix81 = new Matrix([[0, 1], [1, 0]]);
            let orMatrix = matrix8.or(matrix81);
            expect(orMatrix.get(0, 0)).assertEqual(1);
            expect(orMatrix.get(0, 1)).assertEqual(1);
            expect(orMatrix.get(1, 0)).assertEqual(1);
            expect(orMatrix.get(1, 1)).assertEqual(1);
        });
        it('or2', 0, () => {
            // or
            let matrix81 = new Matrix([[1, 0], [1, 1]]);
            let matrix8 = new Matrix([[0, 0], [1, 0]]);
            let orMatrix = matrix8.or(matrix81);
            expect(JSON.stringify(orMatrix)).assertEqual('[[1,0],[1,1]]');
        });
        it('or3', 0, () => {
            // or
            let matrix81 = new Matrix([[1, 0], [1, 1]]);
            let matrix8 = new Matrix([[1, 1], [0, 0]]);
            let orMatrix = matrix8.or(matrix81);
            expect(JSON.stringify(orMatrix)).assertEqual('[[1,1],[1,1]]');
        });
        it('or4', 0, () => {
            // or
            let matrix81 = new Matrix([[1, 0], [1, 1]]);
            let matrix8 = new Matrix([[0, 1], [0, 0]]);
            let orMatrix = matrix8.or(matrix81);
            expect(JSON.stringify(orMatrix)).assertEqual('[[1,1],[1,1]]');
        });
        it('or5', 0, () => {
            // or
            let matrix81 = new Matrix([[0, 0], [1, 1]]);
            let matrix8 = new Matrix([[1, 1], [0, 0]]);
            let orMatrix = matrix8.or(matrix81);
            expect(JSON.stringify(orMatrix)).assertEqual('[[1,1],[1,1]]');
        });
        it('xor1', 0, () => {
            // xor
            let matrix9 = new Matrix([[1, 0], [0, 1]]);
            let matrix91 = new Matrix([[0, 1], [1, 0]]);
            let resultMatrix = matrix9.xor(matrix91);
            expect(resultMatrix.get(0, 0)).assertEqual(1);
            expect(resultMatrix.get(0, 1)).assertEqual(1);
            expect(resultMatrix.get(1, 0)).assertEqual(1);
            expect(resultMatrix.get(1, 1)).assertEqual(1);
        });
        it('xor2', 0, () => {
            // xor
            let matrix81 = new Matrix([[1, 0], [0, 1]]);
            let matrix8 = new Matrix([[0, 1], [1, 0]]);
            let orMatrix = matrix8.xor(matrix81);
            expect(JSON.stringify(orMatrix)).assertEqual('[[1,1],[1,1]]');
        });
        it('xor3', 0, () => {
            // xor
            let matrix81 = new Matrix([[1, 0], [1, 1]]);
            let matrix8 = new Matrix([[1, 1], [0, 0]]);
            let orMatrix = matrix8.xor(matrix81);
            expect(JSON.stringify(orMatrix)).assertEqual('[[0,1],[1,1]]');
        });
        it('xor4', 0, () => {
            // xor
            let matrix81 = new Matrix([[1, 0], [1, 1]]);
            let matrix8 = new Matrix([[0, 1], [0, 0]]);
            let orMatrix = matrix8.xor(matrix81);
            expect(JSON.stringify(orMatrix)).assertEqual('[[1,1],[1,1]]');
        });
        it('xor5', 0, () => {
            // xor
            let matrix81 = new Matrix([[0, 0], [1, 1]]);
            let matrix8 = new Matrix([[1, 1], [0, 0]]);
            let orMatrix = matrix8.xor(matrix81);
            expect(JSON.stringify(orMatrix)).assertEqual('[[1,1],[1,1]]');
        });
        it('addColumn1', 0, () => {
            // addColumn
            let matrix1 = new Matrix([[1, 2], [3, 4]]);
            let columnToAdd = [5, 6];
            matrix1.addColumn(2, columnToAdd);
            expect(matrix1.getColumn(2)).assertDeepEquals(columnToAdd);
        });
        it('addColumn2', 0, () => {
            // addColumn
            let matrix1 = new Matrix([[1, 2], [3, 4]]);
            let columnToAdd = [2, 3];
            matrix1.addColumn(2, columnToAdd);
            expect(matrix1.getColumn(2)).assertDeepEquals(columnToAdd);
        });
        it('addColumn3', 0, () => {
            // addColumn
            let matrix1 = new Matrix([[1, 2], [3, 4]]);
            let columnToAdd = [1, 4];
            matrix1.addColumn(2, columnToAdd);
            expect(matrix1.getColumn(2)).assertDeepEquals(columnToAdd);
        });
        it('addColumn4', 0, () => {
            // addColumn
            let matrix1 = new Matrix([[1, 2], [3, 4]]);
            let columnToAdd = [2, 5];
            matrix1.addColumn(2, columnToAdd);
            expect(matrix1.getColumn(2)).assertDeepEquals(columnToAdd);
        });
        it('addColumn5', 0, () => {
            // addColumn
            let matrix1 = new Matrix([[1, 2], [3, 4]]);
            let columnToAdd = [1, 3];
            matrix1.addColumn(2, columnToAdd);
            expect(matrix1.getColumn(2)).assertDeepEquals(columnToAdd);
        });
        it('addColumnVector1', 0, () => {
            // addColumnVector
            let matrix2 = new Matrix([[1, 2], [3, 4]]);
            let columnVectorToAdd = [5, 6];
            expect(matrix2.rows).assertEqual(columnVectorToAdd.length);
            matrix2.addColumnVector(columnVectorToAdd);
            expect(JSON.stringify(matrix2)).assertEqual('[[6,7],[9,10]]');
        });
        it('addColumnVector2', 0, () => {
            // addColumnVector
            let matrix2 = new Matrix([[1, 2], [3, 4]]);
            let columnVectorToAdd = [1, 2];
            expect(matrix2.rows).assertEqual(columnVectorToAdd.length);
            matrix2.addColumnVector(columnVectorToAdd);
            expect(JSON.stringify(matrix2)).assertEqual('[[2,3],[5,6]]');
        });
        it('addColumnVector3', 0, () => {
            // addColumnVector
            let matrix2 = new Matrix([[1, 2], [3, 4]]);
            let columnVectorToAdd = [0, 1];
            expect(matrix2.rows).assertEqual(columnVectorToAdd.length);
            matrix2.addColumnVector(columnVectorToAdd);
            expect(JSON.stringify(matrix2)).assertEqual('[[1,2],[4,5]]');
        });
        it('addColumnVector4', 0, () => {
            // addColumnVector
            let matrix2 = new Matrix([[1, 2], [3, 4]]);
            let columnVectorToAdd = [2, 3];
            expect(matrix2.rows).assertEqual(columnVectorToAdd.length);
            matrix2.addColumnVector(columnVectorToAdd);
            expect(JSON.stringify(matrix2)).assertEqual('[[3,4],[6,7]]');
        });
        it('addColumnVector5', 0, () => {
            // addColumnVector
            let matrix2 = new Matrix([[1, 2], [3, 4]]);
            let columnVectorToAdd = [-1, 2];
            expect(matrix2.rows).assertEqual(columnVectorToAdd.length);
            matrix2.addColumnVector(columnVectorToAdd);
            expect(JSON.stringify(matrix2)).assertEqual('[[0,1],[5,6]]');
        });
        it('addRow1', 0, () => {
            // addRow
            let matrix3 = new Matrix([[1, 2], [3, 4]]);
            let rowToAdd = [5, 6];
            matrix3.addRow(2, rowToAdd);
            expect(matrix3.getRow(2)).assertDeepEquals(rowToAdd);
        });
        it('addRow2', 0, () => {
            // addRow
            let matrix3 = new Matrix([[1, 2], [3, 4]]);
            let rowToAdd = [1, 2];
            matrix3.addRow(2, rowToAdd);
            expect(matrix3.getRow(2)).assertDeepEquals(rowToAdd);
        });
        it('addRow3', 0, () => {
            // addRow
            let matrix3 = new Matrix([[1, 2], [3, 4]]);
            let rowToAdd = [3, 4];
            matrix3.addRow(2, rowToAdd);
            expect(matrix3.getRow(2)).assertDeepEquals(rowToAdd);
        });
        it('addRow4', 0, () => {
            // addRow
            let matrix3 = new Matrix([[1, 2], [3, 4]]);
            let rowToAdd = [-1, 2];
            matrix3.addRow(2, rowToAdd);
            expect(matrix3.getRow(2)).assertDeepEquals(rowToAdd);
        });
        it('addRow5', 0, () => {
            // addRow
            let matrix3 = new Matrix([[1, 2], [3, 4]]);
            let rowToAdd = [2, 4];
            matrix3.addRow(2, rowToAdd);
            expect(matrix3.getRow(2)).assertDeepEquals(rowToAdd);
        });
        it('addRowVector1', 0, () => {
            // addRowVector
            let matrix4 = new Matrix([[1, 2], [3, 4]]);
            let rowVectorToAdd = [5, 6];
            expect(matrix4.columns).assertEqual(rowVectorToAdd.length);
            matrix4.addRowVector(rowVectorToAdd);
            expect(JSON.stringify(matrix4)).assertEqual('[[6,8],[8,10]]');
        });
        it('addRowVector2', 0, () => {
            // addRowVector
            let matrix4 = new Matrix([[1, 2], [3, 4]]);
            let rowVectorToAdd = [1, 2];
            expect(matrix4.columns).assertEqual(rowVectorToAdd.length);
            matrix4.addRowVector(rowVectorToAdd);
            expect(JSON.stringify(matrix4)).assertEqual('[[2,4],[4,6]]');
        });
        it('addRowVector3', 0, () => {
            // addRowVector
            let matrix4 = new Matrix([[1, 2], [3, 4]]);
            let rowVectorToAdd = [3, 4];
            expect(matrix4.columns).assertEqual(rowVectorToAdd.length);
            matrix4.addRowVector(rowVectorToAdd);
            expect(JSON.stringify(matrix4)).assertEqual('[[4,6],[6,8]]');
        });
        it('addRowVector4', 0, () => {
            // addRowVector
            let matrix4 = new Matrix([[1, 2], [3, 4]]);
            let rowVectorToAdd = [2, 3];
            expect(matrix4.columns).assertEqual(rowVectorToAdd.length);
            matrix4.addRowVector(rowVectorToAdd);
            expect(JSON.stringify(matrix4)).assertEqual('[[3,5],[5,7]]');
        });
        it('addRowVector5', 0, () => {
            // addRowVector
            let matrix4 = new Matrix([[1, 2], [3, 4]]);
            let rowVectorToAdd = [-1, 2];
            expect(matrix4.columns).assertEqual(rowVectorToAdd.length);
            matrix4.addRowVector(rowVectorToAdd);
            expect(JSON.stringify(matrix4)).assertEqual('[[0,4],[2,6]]');
        });
        it('divColumnVector1', 0, () => {
            // divColumnVector
            let matrix5 = new Matrix([[1, 2], [3, 4]]);
            let columnVector = [2, 2];
            matrix5.divColumnVector(columnVector);
            expect(matrix5.get(0, 0)).assertEqual(0.5);
            expect(matrix5.get(0, 1)).assertEqual(1);
            expect(matrix5.get(1, 0)).assertEqual(1.5);
            expect(matrix5.get(1, 1)).assertEqual(2);
        });
        it('divColumnVector2', 0, () => {
            // divColumnVector
            let matrix5 = new Matrix([[1, 2], [3, 4]]);
            let columnVector = [2, 2];
            matrix5.divColumnVector(columnVector);
            expect(JSON.stringify(matrix5)).assertEqual('[[0.5,1],[1.5,2]]');
        });
        it('divColumnVector3', 0, () => {
            // divColumnVector
            let matrix5 = new Matrix([[6, 12], [9, 18]]);
            let columnVector = [3, 2];
            matrix5.divColumnVector(columnVector);
            expect(JSON.stringify(matrix5)).assertEqual('[[2,4],[4.5,9]]');
        });
        it('divColumnVector4', 0, () => {
            // divColumnVector
            let matrix5 = new Matrix([[6, 12], [9, 16]]);
            let columnVector = [3, 4];
            matrix5.divColumnVector(columnVector);
            expect(JSON.stringify(matrix5)).assertEqual('[[2,4],[2.25,4]]');
        });
        it('divColumnVector5', 0, () => {
            // divColumnVector
            let matrix5 = new Matrix([[6, 3], [12, 9]]);
            let columnVector = [1, 3];
            matrix5.divColumnVector(columnVector);
            expect(JSON.stringify(matrix5)).assertEqual('[[6,3],[4,3]]');
        });
        it('divRowVector1', 0, () => {
            // divRowVector
            let matrix6 = new Matrix([[1, 2], [3, 4]]);
            let rowVector = [2, 2];
            matrix6.divRowVector(rowVector);
            expect(matrix6.get(0, 0)).assertEqual(0.5);
            expect(matrix6.get(0, 1)).assertEqual(1);
            expect(matrix6.get(1, 0)).assertEqual(1.5);
            expect(matrix6.get(1, 1)).assertEqual(2);
        });
        it('divRowVector2', 0, () => {
            // divRowVector
            let matrix6 = new Matrix([[1, 2], [3, 4]]);
            let rowVector = [2, 2];
            matrix6.divRowVector(rowVector);
            expect(JSON.stringify(matrix6)).assertEqual('[[0.5,1],[1.5,2]]');
        });
        it('divRowVector3', 0, () => {
            let matrix5 = new Matrix([[6, 12], [9, 18]]);
            let columnVector = [3, 2];
            matrix5.divRowVector(columnVector);
            expect(JSON.stringify(matrix5)).assertEqual('[[2,6],[3,9]]');
        });
        it('divRowVector4', 0, () => {
            let matrix5 = new Matrix([[6, 12], [9, 16]]);
            let columnVector = [3, 4];
            matrix5.divRowVector(columnVector);
            expect(JSON.stringify(matrix5)).assertEqual('[[2,3],[3,4]]');
        });
        it('divRowVector5', 0, () => {
            // divColumnVector
            let matrix5 = new Matrix([[6, 3], [12, 9]]);
            let columnVector = [1, 3];
            matrix5.divRowVector(columnVector);
            expect(JSON.stringify(matrix5)).assertEqual('[[6,1],[12,3]]');
        });
        it('removeColumn1', 0, () => {
            // removeColumn
            let matrix7 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            let columnIndexToRemove = 1;
            matrix7.removeColumn(columnIndexToRemove);
            expect(matrix7.columns).assertEqual(2);
            expect(matrix7.get(0, 0)).assertEqual(1);
            expect(matrix7.get(0, 1)).assertEqual(3);
            expect(matrix7.get(1, 0)).assertEqual(4);
            expect(matrix7.get(1, 1)).assertEqual(6);
        });
        it('removeColumn2', 0, () => {
            // removeColumn
            let matrix7 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            let columnIndexToRemove = 0;
            matrix7.removeColumn(columnIndexToRemove);
            expect(matrix7.columns).assertEqual(2);
            expect(matrix7.get(0, 0)).assertEqual(2);
            expect(matrix7.get(0, 1)).assertEqual(3);
            expect(matrix7.get(1, 0)).assertEqual(5);
            expect(matrix7.get(1, 1)).assertEqual(6);
        });
        it('removeColumn3', 0, () => {
            // removeColumn
            let matrix7 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            let columnIndexToRemove = 2;
            matrix7.removeColumn(columnIndexToRemove);
            expect(matrix7.columns).assertEqual(2);
            expect(matrix7.get(0, 0)).assertEqual(1);
            expect(matrix7.get(0, 1)).assertEqual(2);
            expect(matrix7.get(1, 0)).assertEqual(4);
            expect(matrix7.get(1, 1)).assertEqual(5);
        });
        it('removeColumn4', 0, () => {
            // removeColumn
            let matrix7 = new Matrix([[1, 2, 3, 4], [4, 5, 6, 7]]);
            let columnIndexToRemove = 3;
            matrix7.removeColumn(columnIndexToRemove);
            expect(matrix7.columns).assertEqual(3);
            expect(matrix7.get(0, 0)).assertEqual(1);
            expect(matrix7.get(0, 1)).assertEqual(2);
            expect(matrix7.get(0, 2)).assertEqual(3);
            expect(matrix7.get(1, 0)).assertEqual(4);
            expect(matrix7.get(1, 1)).assertEqual(5);
            expect(matrix7.get(1, 2)).assertEqual(6);
        });
        it('removeColumn5', 0, () => {
            // removeColumn
            let matrix7 = new Matrix([[2, 2, 4], [6, 5, 8]]);
            let columnIndexToRemove = 1;
            matrix7.removeColumn(columnIndexToRemove);
            expect(matrix7.columns).assertEqual(2);
            expect(matrix7.get(0, 0)).assertEqual(2);
            expect(matrix7.get(0, 1)).assertEqual(4);
            expect(matrix7.get(1, 0)).assertEqual(6);
            expect(matrix7.get(1, 1)).assertEqual(8);
        });
        it('removeRow1', 0, () => {
            // removeRow
            let matrix8 = new Matrix([[1, 2], [3, 4], [5, 6]]);
            let rowIndexToRemove = 1;
            matrix8.removeRow(rowIndexToRemove);
            expect(matrix8.rows).assertEqual(2);
            expect(matrix8.get(0, 0)).assertEqual(1);
            expect(matrix8.get(0, 1)).assertEqual(2);
            expect(matrix8.get(1, 0)).assertEqual(5);
            expect(matrix8.get(1, 1)).assertEqual(6);
        });
        it('removeRow2', 0, () => {
            // removeRow
            let matrix8 = new Matrix([[1, 2], [3, 4], [5, 6]]);
            let rowIndexToRemove = 0;
            matrix8.removeRow(rowIndexToRemove);
            expect(matrix8.rows).assertEqual(2);
            expect(matrix8.get(0, 0)).assertEqual(3);
            expect(matrix8.get(0, 1)).assertEqual(4);
            expect(matrix8.get(1, 0)).assertEqual(5);
            expect(matrix8.get(1, 1)).assertEqual(6);
        });
        it('removeRow3', 0, () => {
            // removeRow
            let matrix8 = new Matrix([[1, 2], [3, 4], [5, 6]]);
            let rowIndexToRemove = 2;
            matrix8.removeRow(rowIndexToRemove);
            expect(matrix8.rows).assertEqual(2);
            expect(matrix8.get(0, 0)).assertEqual(1);
            expect(matrix8.get(0, 1)).assertEqual(2);
            expect(matrix8.get(1, 0)).assertEqual(3);
            expect(matrix8.get(1, 1)).assertEqual(4);
        });
        it('removeRow4', 0, () => {
            // removeRow
            let matrix8 = new Matrix([[-1, 0], [2, 3], [5, 6]]);
            let rowIndexToRemove = 0;
            matrix8.removeRow(rowIndexToRemove);
            expect(matrix8.rows).assertEqual(2);
            expect(matrix8.get(0, 0)).assertEqual(2);
            expect(matrix8.get(0, 1)).assertEqual(3);
            expect(matrix8.get(1, 0)).assertEqual(5);
            expect(matrix8.get(1, 1)).assertEqual(6);
        });
        it('removeRow5', 0, () => {
            // removeRow
            let matrix8 = new Matrix([[-1, 0], [2, 3], [5, 6]]);
            let rowIndexToRemove = 1;
            matrix8.removeRow(rowIndexToRemove);
            expect(matrix8.rows).assertEqual(2);
            expect(matrix8.get(0, 0)).assertEqual(-1);
            expect(matrix8.get(0, 1)).assertEqual(0);
            expect(matrix8.get(1, 0)).assertEqual(5);
            expect(matrix8.get(1, 1)).assertEqual(6);
        });
        it('swapColumns1', 0, () => {
            // swapColumns
            let matrix9 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            let columnIndex1 = 0;
            let columnIndex2 = 2;
            matrix9.swapColumns(columnIndex1, columnIndex2);
            expect(matrix9.get(0, 0)).assertEqual(3);
            expect(matrix9.get(0, 2)).assertEqual(1);
            expect(matrix9.get(1, 0)).assertEqual(6);
            expect(matrix9.get(1, 2)).assertEqual(4);
        });
        it('swapColumns2', 0, () => {
            // swapColumns
            let matrix9 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            let columnIndex1 = 0;
            let columnIndex2 = 1;
            matrix9.swapColumns(columnIndex1, columnIndex2);
            expect(matrix9.get(0, 0)).assertEqual(2);
            expect(matrix9.get(0, 1)).assertEqual(1);
            expect(matrix9.get(1, 0)).assertEqual(5);
            expect(matrix9.get(1, 1)).assertEqual(4);
        });
        it('swapColumns3', 0, () => {
            // swapColumns
            let matrix9 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            let columnIndex1 = 2;
            let columnIndex2 = 0;
            matrix9.swapColumns(columnIndex1, columnIndex2);
            expect(matrix9.get(0, 0)).assertEqual(3);
            expect(matrix9.get(0, 2)).assertEqual(1);
            expect(matrix9.get(1, 0)).assertEqual(6);
            expect(matrix9.get(1, 2)).assertEqual(4);
        });
        it('swapColumns4', 0, () => {
            // swapColumns
            let matrix9 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            let columnIndex1 = 1;
            let columnIndex2 = 0;
            matrix9.swapColumns(columnIndex1, columnIndex2);
            expect(matrix9.get(0, 0)).assertEqual(2);
            expect(matrix9.get(0, 1)).assertEqual(1);
            expect(matrix9.get(1, 0)).assertEqual(5);
            expect(matrix9.get(1, 1)).assertEqual(4);
        });
        it('swapColumns5', 0, () => {
            // swapColumns
            let matrix9 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            let columnIndex1 = 1;
            let columnIndex2 = 2;
            matrix9.swapColumns(columnIndex1, columnIndex2);
            expect(JSON.stringify(matrix9)).assertEqual('[[1,3,2],[4,6,5]]');
        });
        it('swapRows1', 0, () => {
            // swapRows
            let matrix10 = new Matrix([[1, 2], [3, 4], [5, 6]]);
            let rowIndex1 = 0;
            let rowIndex2 = 2;
            matrix10.swapRows(rowIndex1, rowIndex2);
            expect(matrix10.get(0, 0)).assertEqual(5);
            expect(matrix10.get(0, 1)).assertEqual(6);
            expect(matrix10.get(2, 0)).assertEqual(1);
            expect(matrix10.get(2, 1)).assertEqual(2);
        });
        it('swapRows2', 0, () => {
            // swapRows
            let matrix10 = new Matrix([[1, 2], [3, 4], [5, 6]]);
            let rowIndex1 = 0;
            let rowIndex2 = 1;
            matrix10.swapRows(rowIndex1, rowIndex2);
            expect(matrix10.get(0, 0)).assertEqual(3);
            expect(matrix10.get(0, 1)).assertEqual(4);
            expect(matrix10.get(1, 0)).assertEqual(1);
            expect(matrix10.get(1, 1)).assertEqual(2);
        });
        it('swapRows3', 0, () => {
            // swapRows
            let matrix10 = new Matrix([[1, 2], [3, 4], [5, 6]]);
            let rowIndex1 = 2;
            let rowIndex2 = 0;
            matrix10.swapRows(rowIndex1, rowIndex2);
            expect(matrix10.get(0, 0)).assertEqual(5);
            expect(matrix10.get(0, 1)).assertEqual(6);
            expect(matrix10.get(2, 0)).assertEqual(1);
            expect(matrix10.get(2, 1)).assertEqual(2);
        });
        it('swapRows4', 0, () => {
            // swapRows
            let matrix10 = new Matrix([[1, 2], [3, 4], [5, 6]]);
            let rowIndex1 = 1;
            let rowIndex2 = 0;
            matrix10.swapRows(rowIndex1, rowIndex2);
            expect(matrix10.get(0, 0)).assertEqual(3);
            expect(matrix10.get(0, 1)).assertEqual(4);
            expect(matrix10.get(1, 0)).assertEqual(1);
            expect(matrix10.get(1, 1)).assertEqual(2);
        });
        it('swapRows5', 0, () => {
            // swapRows
            let matrix10 = new Matrix([[1, 2], [3, 4], [5, 6]]);
            let rowIndex1 = 1;
            let rowIndex2 = 2;
            matrix10.swapRows(rowIndex1, rowIndex2);
            expect(matrix10.get(1, 0)).assertEqual(5);
            expect(matrix10.get(1, 1)).assertEqual(6);
            expect(matrix10.get(2, 0)).assertEqual(3);
            expect(matrix10.get(2, 1)).assertEqual(4);
        });
        it('cumulativeSum1', 0, () => {
            // cumulativeSum
            let matrix1 = new Matrix([[-1, 0], [2, 3]]);
            let cumulativeSumMatrix = matrix1.cumulativeSum();
            expect(JSON.stringify(cumulativeSumMatrix)).assertDeepEquals('[[-1,-1],[1,4]]');
        });
        it('cumulativeSum2', 0, () => {
            // cumulativeSum
            let matrix1 = new Matrix([[1, 2], [3, 4]]);
            let cumulativeSumMatrix = matrix1.cumulativeSum();
            expect(JSON.stringify(cumulativeSumMatrix)).assertDeepEquals('[[1,3],[6,10]]');
        });
        it('cumulativeSum3', 0, () => {
            // cumulativeSum
            let matrix1 = new Matrix([[5, 6], [7, 8]]);
            let cumulativeSumMatrix = matrix1.cumulativeSum();
            expect(JSON.stringify(cumulativeSumMatrix)).assertDeepEquals('[[5,11],[18,26]]');
        });
        it('cumulativeSum4', 0, () => {
            // cumulativeSum
            let matrix1 = new Matrix([[7, 8], [5, 6]]);
            let cumulativeSumMatrix = matrix1.cumulativeSum();
            expect(JSON.stringify(cumulativeSumMatrix)).assertDeepEquals('[[7,15],[20,26]]');
        });
        it('cumulativeSum5', 0, () => {
            // cumulativeSum
            let matrix1 = new Matrix([[3, 4], [1, 2]]);
            let cumulativeSumMatrix = matrix1.cumulativeSum();
            expect(JSON.stringify(cumulativeSumMatrix)).assertDeepEquals('[[3,7],[8,10]]');
        });
        it('kroneckerSum1', 0, () => {
            // kroneckerSum
            let matrix2 = new Matrix([[1, 2], [3, 4]]);
            let matrix3 = new Matrix([[2, 4], [6, 8]]);
            let kroneckerSumMatrix = matrix2.kroneckerSum(matrix3);
            expect(JSON.stringify(kroneckerSumMatrix)).assertEqual('[[3,4,2,0],[6,9,0,2],[3,0,6,4],[0,3,6,12]]');
        });
        it('kroneckerSum2', 0, () => {
            // kroneckerSum
            let matrix2 = new Matrix([[1, 2], [3, 4]]);
            let matrix3 = new Matrix([[5, 6], [7, 8]]);
            let kroneckerSumMatrix = matrix2.kroneckerSum(matrix3);
            expect(JSON.stringify(kroneckerSumMatrix)).assertEqual('[[6,6,2,0],[7,9,0,2],[3,0,9,6],[0,3,7,12]]');
        });
        it('kroneckerSum3', 0, () => {
            // kroneckerSum
            let matrix2 = new Matrix([[1, 2], [3, 4]]);
            let matrix3 = new Matrix([[2, 3], [4, 5]]);
            let kroneckerSumMatrix = matrix2.kroneckerSum(matrix3);
            expect(JSON.stringify(kroneckerSumMatrix)).assertEqual('[[3,3,2,0],[4,6,0,2],[3,0,6,3],[0,3,4,9]]');
        });
        it('kroneckerSum4', 0, () => {
            // kroneckerSum
            let matrix2 = new Matrix([[1, 2], [3, 4]]);
            let matrix3 = new Matrix([[-2, 0], [1, 3]]);
            let kroneckerSumMatrix = matrix2.kroneckerSum(matrix3);
            expect(JSON.stringify(kroneckerSumMatrix)).assertEqual('[[-1,0,2,0],[1,4,0,2],[3,0,2,0],[0,3,1,7]]');
        });
        it('kroneckerSum5', 0, () => {
            // kroneckerSum
            let matrix2 = new Matrix([[1, 2], [3, 4]]);
            let matrix3 = new Matrix([[0, 1], [2, 3]]);
            let kroneckerSumMatrix = matrix2.kroneckerSum(matrix3);
            expect(JSON.stringify(kroneckerSumMatrix)).assertEqual('[[1,1,2,0],[2,4,0,2],[3,0,4,1],[0,3,2,7]]');
        });
        it('echelonForm1', 0, () => {
            // echelonForm
            let matrix = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let echelonMatrix = matrix.echelonForm();
            expect(JSON.stringify(echelonMatrix))
                .assertEqual('[[1,1.1428571428571428,1.2857142857142858],[0,1,1.9999999999999998],[0,0,1]]');
        });
        it('echelonForm2', 0, () => {
            // echelonForm
            let matrix = new Matrix([[1, 2], [3, 4]]);
            let echelonMatrix = matrix.echelonForm();
            expect(JSON.stringify(echelonMatrix)).assertEqual('[[1,1.3333333333333333],[0,1]]');
        });
        it('echelonForm3', 0, () => {
            // echelonForm
            let matrix = new Matrix([[3, 4], [5, 6]]);
            let echelonMatrix = matrix.echelonForm();
            expect(JSON.stringify(echelonMatrix)).assertEqual('[[1,1.2],[0,1]]');
        });
        it('echelonForm4', 0, () => {
            // echelonForm
            let matrix = new Matrix([[5, 6], [7, 8]]);
            let echelonMatrix = matrix.echelonForm();
            expect(JSON.stringify(echelonMatrix)).assertEqual('[[1,1.1428571428571428],[0,1]]');
        });
        it('echelonForm5', 0, () => {
            // echelonForm
            let matrix = new Matrix([[6, 7], [8, 9]]);
            let echelonMatrix = matrix.echelonForm();
            expect(JSON.stringify(echelonMatrix)).assertEqual('[[1,1.125],[0,1]]');
        });
        it('isEchelonForm1', 0, () => {
            // isEchelonForm
            let matrix = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let echelonMatrix = matrix.echelonForm();
            expect(echelonMatrix.isEchelonForm()).assertTrue();
        });
        it('isEchelonForm2', 0, () => {
            // isEchelonForm
            let matrix = new Matrix([[1, 2], [3, 4]]);
            let echelonMatrix = matrix.echelonForm();
            expect(echelonMatrix.isEchelonForm()).assertTrue();
        });
        it('isEchelonForm3', 0, () => {
            // isEchelonForm
            let matrix = new Matrix([[3, 4], [5, 6]]);
            let echelonMatrix = matrix.echelonForm();
            expect(echelonMatrix.isEchelonForm()).assertTrue();
        });
        it('isEchelonForm4', 0, () => {
            // isEchelonForm
            let matrix = new Matrix([[5, 6], [7, 8]]);
            let echelonMatrix = matrix.echelonForm();
            expect(echelonMatrix.isEchelonForm()).assertTrue();
        });
        it('isEchelonForm5', 0, () => {
            // isEchelonForm
            let matrix = new Matrix([[6, 7]]);
            let echelonMatrix = matrix.echelonForm();
            expect(echelonMatrix.isEchelonForm()).assertTrue();
        });
        it('reducedEchelonForm_1', 0, () => {
            // reducedEchelonForm
            let matrix = new Matrix([[1, 2, 3], [4, 5, 6]]);
            let reducedEchelonMatrix = matrix.reducedEchelonForm();
            expect(JSON.stringify(reducedEchelonMatrix)).assertEqual('[[1,0,-1],[0,1,2]]');
            //isReducedEchelonForm
            expect(reducedEchelonMatrix.isReducedEchelonForm()).assertTrue();
        });
        it('reducedEchelonForm_2', 0, () => {
            // reducedEchelonForm
            let matrix = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let reducedEchelonMatrix = matrix.reducedEchelonForm();
            expect(JSON.stringify(reducedEchelonMatrix)).assertEqual('[[1,0,0],[0,1,0],[0,0,1]]');
        });
        it('reducedEchelonForm_3', 0, () => {
            // reducedEchelonForm
            let matrix = new Matrix([[1, 2, 3], [7, 8, 9]]);
            let reducedEchelonMatrix = matrix.reducedEchelonForm();
            expect(JSON.stringify(reducedEchelonMatrix)).assertEqual('[[1,0,-0.9999999999999993],[0,1,1.9999999999999998]]');
        });
        it('reducedEchelonForm_4', 0, () => {
            // reducedEchelonForm
            let matrix = new Matrix([[4, 5, 6], [7, 8, 9]]);
            let reducedEchelonMatrix = matrix.reducedEchelonForm();
            expect(JSON.stringify(reducedEchelonMatrix)).assertEqual('[[1,0,-0.9999999999999976],[0,1,1.999999999999998]]');
        });
        it('reducedEchelonForm_5', 0, () => {
            // reducedEchelonForm
            let matrix = new Matrix([[41, 25, 6], [7, 8, 9]]);
            let reducedEchelonMatrix = matrix.reducedEchelonForm();
            expect(JSON.stringify(reducedEchelonMatrix)).assertEqual('[[1,0,-1.1568627450980393],[0,1,2.1372549019607843]]');
        });
        it('isReducedEchelonForm_1', 0, () => {
            // isReducedEchelonForm
            let matrix = new Matrix([[1, 2, 3], [4, 5, 6]]);
            let reducedEchelonMatrix = matrix.reducedEchelonForm();
            expect(reducedEchelonMatrix.isReducedEchelonForm()).assertTrue();
        });
        it('isReducedEchelonForm_2', 0, () => {
            // isReducedEchelonForm
            let matrix = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let reducedEchelonMatrix = matrix.reducedEchelonForm();
            expect(reducedEchelonMatrix.isReducedEchelonForm()).assertTrue();
        });
        it('isReducedEchelonForm_3', 0, () => {
            // isReducedEchelonForm
            let matrix = new Matrix([[1, 2, 3]]);
            let reducedEchelonMatrix = matrix.reducedEchelonForm();
            expect(reducedEchelonMatrix.isReducedEchelonForm()).assertTrue();
        });
        it('isReducedEchelonForm_4', 0, () => {
            // isReducedEchelonForm
            let matrix = new Matrix([[1, 2]]);
            let reducedEchelonMatrix = matrix.reducedEchelonForm();
            expect(reducedEchelonMatrix.isReducedEchelonForm()).assertTrue();
        });
        it('fill_1', 0, () => {
            // fill
            let matrix1 = new Matrix(3, 3);
            matrix1.fill(5);
            expect(matrix1).assertDeepEquals(new Matrix([[5, 5, 5], [5, 5, 5], [5, 5, 5]]));
        });
        it('fill_2', 0, () => {
            // fill
            let matrix1 = new Matrix(2, 2);
            matrix1.fill(5);
            expect(matrix1).assertDeepEquals(new Matrix([[5, 5], [5, 5]]));
        });
        it('fill_3', 0, () => {
            // fill
            let matrix1 = new Matrix(3, 3);
            matrix1.fill(4);
            expect(matrix1).assertDeepEquals(new Matrix([[4, 4, 4], [4, 4, 4], [4, 4, 4]]));
        });
        it('fill_4', 0, () => {
            // fill
            let matrix1 = new Matrix(2, 2);
            matrix1.fill(-1);
            expect(matrix1).assertDeepEquals(new Matrix([[-1, -1], [-1, -1]]));
        });
        it('fill_5', 0, () => {
            // fill
            let matrix1 = new Matrix(3, 3);
            matrix1.fill(15);
            expect(matrix1).assertDeepEquals(new Matrix([[15, 15, 15], [15, 15, 15], [15, 15, 15]]));
        });
        it('flipColumns_1', 0, () => {
            // flipColumns
            let matrix2 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            matrix2.flipColumns();
            expect(matrix2).assertDeepEquals(new Matrix([[7, 8, 9], [4, 5, 6], [1, 2, 3]]));
        });
        it('flipColumns_2', 0, () => {
            // flipColumns
            let matrix2 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            matrix2.flipColumns();
            expect(matrix2).assertDeepEquals(new Matrix([[4, 5, 6], [1, 2, 3]]));
        });
        it('flipColumns_3', 0, () => {
            // flipColumns
            let matrix2 = new Matrix([[1, 2, 3]]);
            matrix2.flipColumns();
            expect(matrix2).assertDeepEquals(new Matrix([[1, 2, 3]]));
        });
        it('flipColumns_4', 0, () => {
            // flipColumns
            let matrix2 = new Matrix([[1, 2, 3], [4, 5, 6], [9, 8, 7]]);
            matrix2.flipColumns();
            expect(matrix2).assertDeepEquals(new Matrix([[9, 8, 7], [4, 5, 6], [1, 2, 3]]));
        });
        it('flipColumns_5', 0, () => {
            // flipColumns
            let matrix2 = new Matrix([[3, 2, 1], [4, 5, 6]]);
            matrix2.flipColumns();
            expect(matrix2).assertDeepEquals(new Matrix([[4, 5, 6], [3, 2, 1]]));
        });
        it('flipRows_1', 0, () => {
            // flipRows
            let matrix2 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            matrix2.flipRows();
            expect(matrix2).assertDeepEquals(new Matrix([[3, 2, 1], [6, 5, 4], [9, 8, 7]]));
        });
        it('flipRows_2', 0, () => {
            // flipRows
            let matrix2 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            matrix2.flipRows();
            expect(matrix2).assertDeepEquals(new Matrix([[3, 2, 1], [6, 5, 4]]));
        });
        it('flipRows_3', 0, () => {
            // flipRows
            let matrix2 = new Matrix([[1, 2, 3]]);
            matrix2.flipRows();
            expect(matrix2).assertDeepEquals(new Matrix([[3, 2, 1]]));
        });
        it('flipRows_4', 0, () => {
            // flipRows
            let matrix2 = new Matrix([[1, 2, 3], [7, 8, 9], [4, 5, 6]]);
            matrix2.flipRows();
            expect(matrix2).assertDeepEquals(new Matrix([[3, 2, 1], [9, 8, 7], [6, 5, 4]]));
        });
        it('flipRows_5', 0, () => {
            // flipRows
            let matrix2 = new Matrix([[1, 2, 3], [6, 5, 4]]);
            matrix2.flipRows();
            expect(matrix2).assertDeepEquals(new Matrix([[3, 2, 1], [4, 5, 6]]));
        });
        it('getColumn_1', 0, () => {
            // getColumn
            let matrix2 = new Matrix([[1, 2, 3], [6, 5, 4]]);
            let column = matrix2.getColumn(1);
            expect(column).assertDeepEquals([2, 5]);
        });
        it('getColumn_2', 0, () => {
            // getColumn
            let matrix2 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let column = matrix2.getColumn(1);
            expect(column).assertDeepEquals([2, 5, 8]);
        });
        it('getColumn_3', 0, () => {
            // getColumn
            let matrix2 = new Matrix([[1, 2, 3], [6, 5, 4]]);
            let column = matrix2.getColumn(1);
            expect(column).assertDeepEquals([2, 5]);
        });
        it('getColumn_4', 0, () => {
            // getColumn
            let matrix2 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            let column = matrix2.getColumn(0);
            expect(column).assertDeepEquals([1, 4]);
        });
        it('getColumn_5', 0, () => {
            // getColumn
            let matrix2 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            let column = matrix2.getColumn(2);
            expect(column).assertDeepEquals([3, 6]);
        });
        it('getColumnVector_1', 0, () => {
            // getColumnVector
            let matrix2 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let columnVector = matrix2.getColumnVector(1);
            expect(columnVector).assertDeepEquals(new Matrix([[2], [5], [8]]));
        });
        it('getColumnVector_2', 0, () => {
            // getColumnVector
            let matrix2 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            let columnVector = matrix2.getColumnVector(1);
            expect(columnVector).assertDeepEquals(new Matrix([[2], [5]]));
        });
        it('getColumnVector_3', 0, () => {
            // getColumnVector
            let matrix2 = new Matrix([[1, 2, 3]]);
            let columnVector = matrix2.getColumnVector(1);
            expect(columnVector).assertDeepEquals(new Matrix([[2]]));
        });
        it('getColumnVector_4', 0, () => {
            // getColumnVector
            let matrix2 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let columnVector = matrix2.getColumnVector(0);
            expect(columnVector).assertDeepEquals(new Matrix([[1], [4], [7]]));
        });
        it('getColumnVector_5', 0, () => {
            // getColumnVector
            let matrix2 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let columnVector = matrix2.getColumnVector(2);
            expect(columnVector).assertDeepEquals(new Matrix([[3], [6], [9]]));
        });
        it('getRow_1', 0, () => {
            // getRow
            let matrix2 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let row = matrix2.getRow(1);
            expect(row).assertDeepEquals([4, 5, 6]);
        });
        it('getRow_2', 0, () => {
            // getRow
            let matrix2 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let row = matrix2.getRow(0);
            expect(row).assertDeepEquals([1, 2, 3]);
        });
        it('getRow_3', 0, () => {
            // getRow
            let matrix2 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let row = matrix2.getRow(2);
            expect(row).assertDeepEquals([7, 8, 9]);
        });
        it('getRow_4', 0, () => {
            // getRow
            let matrix2 = new Matrix([[1, 2, 3], [7, 8, 9]]);
            let row = matrix2.getRow(1);
            expect(row).assertDeepEquals([7, 8, 9]);
        });
        it('getRow_5', 0, () => {
            // getRow
            let matrix2 = new Matrix([[1, 2, 3]]);
            let row = matrix2.getRow(0);
            expect(row).assertDeepEquals([1, 2, 3]);
        });
        it('getRowVector_1', 0, () => {
            // getRowVector
            let matrix2 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let rowVector = matrix2.getRowVector(1);
            expect(rowVector).assertDeepEquals(new Matrix([[4, 5, 6]]));
        });
        it('getRowVector_2', 0, () => {
            // getRowVector
            let matrix2 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let rowVector = matrix2.getRowVector(0);
            expect(rowVector).assertDeepEquals(new Matrix([[1, 2, 3]]));
        });
        it('getRowVector_3', 0, () => {
            // getRowVector
            let matrix2 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let rowVector = matrix2.getRowVector(2);
            expect(rowVector).assertDeepEquals(new Matrix([[7, 8, 9]]));
        });
        it('getRowVector_4', 0, () => {
            // getRowVector
            let matrix2 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            let rowVector = matrix2.getRowVector(1);
            expect(rowVector).assertDeepEquals(new Matrix([[4, 5, 6]]));
        });
        it('getRowVector_5', 0, () => {
            // getRowVector
            let matrix2 = new Matrix([[1, 2, 3]]);
            let rowVector = matrix2.getRowVector(0);
            expect(rowVector).assertDeepEquals(new Matrix([[1, 2, 3]]));
        });
        it('setColumn_1', 0, () => {
            // setColumn
            let matrix2 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let columnToSet = [10, 11, 12];
            matrix2.setColumn(1, columnToSet);
            expect(matrix2).assertDeepEquals(new Matrix([[1, 10, 3], [4, 11, 6], [7, 12, 9]]));
        });
        it('setColumn_2', 0, () => {
            // setColumn
            let matrix2 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let columnToSet = [10, 11, 12];
            matrix2.setColumn(0, columnToSet);
            expect(matrix2).assertDeepEquals(new Matrix([[10, 2, 3], [11, 5, 6], [12, 8, 9]]));
        });
        it('setColumn_3', 0, () => {
            // setColumn
            let matrix2 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let columnToSet = [10, 11, 12];
            matrix2.setColumn(2, columnToSet);
            expect(matrix2).assertDeepEquals(new Matrix([[1, 2, 10], [4, 5, 11], [7, 8, 12]]));
        });
        it('setColumn_4', 0, () => {
            // setColumn
            let matrix2 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            let columnToSet = [10, 11];
            matrix2.setColumn(0, columnToSet);
            expect(matrix2).assertDeepEquals(new Matrix([[10, 2, 3], [11, 5, 6]]));
        });
        it('setColumn_5', 0, () => {
            // setColumn
            let matrix2 = new Matrix([[1, 2, 3]]);
            let columnToSet = [10];
            matrix2.setColumn(0, columnToSet);
            expect(matrix2).assertDeepEquals(new Matrix([[10, 2, 3]]));
        });
        it('setRow_1', 0, () => {
            // setRow
            let matrix2 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let rowToSet = [10, 11, 12];
            matrix2.setRow(1, rowToSet);
            expect(matrix2).assertDeepEquals(new Matrix([[1, 2, 3], [10, 11, 12], [7, 8, 9]]));
        });
        it('setRow_2', 0, () => {
            // setRow
            let matrix2 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let rowToSet = [10, 11, 12];
            matrix2.setRow(2, rowToSet);
            expect(matrix2).assertDeepEquals(new Matrix([[1, 2, 3], [4, 5, 6], [10, 11, 12]]));
        });
        it('setRow_3', 0, () => {
            // setRow
            let matrix2 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            let rowToSet = [10, 11, 12];
            matrix2.setRow(0, rowToSet);
            expect(matrix2).assertDeepEquals(new Matrix([[10, 11, 12], [4, 5, 6]]));
        });
        it('setRow_4', 0, () => {
            // setRow
            let matrix2 = new Matrix([[1, 2, 3]]);
            let rowToSet = [10, 11, 12];
            matrix2.setRow(0, rowToSet);
            expect(matrix2).assertDeepEquals(new Matrix([[10, 11, 12]]));
        });
        it('setRow_5', 0, () => {
            // setRow
            let matrix2 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let rowToSet = [10, 11, 12];
            matrix2.setRow(0, rowToSet);
            expect(matrix2).assertDeepEquals(new Matrix([[10, 11, 12], [4, 5, 6], [7, 8, 9]]));
        });
        it('setSubMatrix_1', 0, () => {
            // setSubMatrix
            let matrix1 = new Matrix(3, 3);
            let subMatrix = new Matrix([[1, 2], [3, 4]]);
            matrix1.setSubMatrix(subMatrix, 0, 0);
            expect(matrix1).assertDeepEquals(new Matrix([[1, 2, 0], [3, 4, 0], [0, 0, 0]]));
        });
        it('setSubMatrix_2', 0, () => {
            // setSubMatrix
            let matrix1 = new Matrix(3, 3);
            let subMatrix = new Matrix([[1, 3], [5, 4]]);
            matrix1.setSubMatrix(subMatrix, 0, 0);
            expect(matrix1).assertDeepEquals(new Matrix([[1, 3, 0], [5, 4, 0], [0, 0, 0]]));
        });
        it('setSubMatrix_3', 0, () => {
            // setSubMatrix
            let matrix1 = new Matrix(2, 2);
            let subMatrix = new Matrix([[1, 2]]);
            matrix1.setSubMatrix(subMatrix, 0, 0);
            expect(matrix1).assertDeepEquals(new Matrix([[1, 2], [0, 0]]));
        });
        it('setSubMatrix_4', 0, () => {
            // setSubMatrix
            let matrix1 = new Matrix(4, 3);
            let subMatrix = new Matrix([[1, 2], [3, 4], [5, 6]]);
            matrix1.setSubMatrix(subMatrix, 0, 0);
            expect(matrix1).assertDeepEquals(new Matrix([[1, 2, 0], [3, 4, 0], [5, 6, 0], [0, 0, 0]]));
        });
        it('setSubMatrix_5', 0, () => {
            // setSubMatrix
            let matrix1 = new Matrix(4, 3);
            let subMatrix = new Matrix([[1, 2], [3, 4], [5, 6]]);
            matrix1.setSubMatrix(subMatrix, 1, 0);
            expect(matrix1).assertDeepEquals(new Matrix([[0, 0, 0], [1, 2, 0], [3, 4, 0], [5, 6, 0]]));
        });
        it('Matrix.rowVector_1', 0, () => {
            // rowVector
            let rowVectorMatrix = Matrix.rowVector([1, 2, 3]);
            expect(JSON.stringify(rowVectorMatrix)).assertEqual('[[1,2,3]]');
        });
        it('Matrix.rowVector_2', 0, () => {
            // rowVector
            let rowVectorMatrix = Matrix.rowVector([1, 2]);
            expect(JSON.stringify(rowVectorMatrix)).assertEqual('[[1,2]]');
        });
        it('Matrix.rowVector_3', 0, () => {
            // rowVector
            let rowVectorMatrix = Matrix.rowVector([1, 2, 3, 4]);
            expect(JSON.stringify(rowVectorMatrix)).assertEqual('[[1,2,3,4]]');
        });
        it('Matrix.rowVector_4', 0, () => {
            // rowVector
            let rowVectorMatrix = Matrix.rowVector([1]);
            expect(JSON.stringify(rowVectorMatrix)).assertEqual('[[1]]');
        });
        it('Matrix.rowVector_5', 0, () => {
            // rowVector
            let rowVectorMatrix = Matrix.rowVector([4, 5, 3]);
            expect(JSON.stringify(rowVectorMatrix)).assertEqual('[[4,5,3]]');
        });
        it('isEchelonForm_1', 0, () => {
            // isEchelonForm
            let echelonMatrix = new Matrix([[1, 2, 3], [0, 1, 2], [0, 0, 1]]);
            expect(echelonMatrix.isEchelonForm()).assertTrue();
        });
        it('isEchelonForm_2', 0, () => {
            // isEchelonForm
            let echelonMatrix = new Matrix([[1, 2, 3], [0, 1, 2]]);
            expect(echelonMatrix.isEchelonForm()).assertTrue();
        });
        it('isEchelonForm_3', 0, () => {
            // isEchelonForm
            let echelonMatrix = new Matrix([[1, 2, 3], [0, 0, 1]]);
            expect(echelonMatrix.isEchelonForm()).assertTrue();
        });
        it('isEchelonForm_4', 0, () => {
            // isEchelonForm
            let echelonMatrix = new Matrix([[1, 2, 3]]);
            expect(echelonMatrix.isEchelonForm()).assertTrue();
        });
        it('isEchelonForm_5', 0, () => {
            // isEchelonForm
            let echelonMatrix = new Matrix([[0, 1, 2], [0, 0, 1]]);
            expect(echelonMatrix.isEchelonForm()).assertTrue();
        });
        it('Matrix.isVector_1', 0, () => {
            // isVector
            let vectorMatrix = Matrix.rowVector([1, 2, 3]);
            expect(vectorMatrix.isVector()).assertTrue();
        });
        it('Matrix.isVector_2', 0, () => {
            // isVector
            let vectorMatrix = Matrix.rowVector([1, 2]);
            expect(vectorMatrix.isVector()).assertTrue();
        });
        it('Matrix.isVector_3', 0, () => {
            // isVector
            let vectorMatrix = Matrix.rowVector([1]);
            expect(vectorMatrix.isVector()).assertTrue();
        });
        it('Matrix.isVector_4', 0, () => {
            // isVector
            let vectorMatrix = Matrix.columnVector([1, 2, 3]);
            expect(vectorMatrix.isVector()).assertTrue();
        });
        it('Matrix.isVector_5', 0, () => {
            // isVector
            let vectorMatrix = Matrix.columnVector([1, 2]);
            expect(vectorMatrix.isVector()).assertTrue();
        });
        it('isSquare_1', 0, () => {
            // isSquare
            let squareMatrix = new Matrix([[1, 2], [3, 4]]);
            expect(squareMatrix.isSquare()).assertTrue();
        });
        it('isSquare_2', 0, () => {
            // isSquare
            let squareMatrix = new Matrix([[1, 2]]);
            expect(squareMatrix.isSquare()).assertFalse();
        });
        it('isSquare_3', 0, () => {
            // isSquare
            let squareMatrix = new Matrix([[1, 2, 3], [3, 4, 5]]);
            expect(squareMatrix.isSquare()).assertFalse();
        });
        it('isSquare_4', 0, () => {
            // isSquare
            let squareMatrix = new Matrix([[1, 2], [3, 4], [5, 6]]);
            expect(squareMatrix.isSquare()).assertFalse();
        });
        it('isSquare_5', 0, () => {
            // isSquare
            let squareMatrix = new Matrix([[1, 2, 3]]);
            expect(squareMatrix.isSquare()).assertFalse();
        });
        it('kroneckerProduct_1', 0, () => {
            // kroneckerProduct
            let matrix11 = new Matrix([[1, 2], [3, 4]]);
            let kroneckerProductResult = matrix11.kroneckerProduct(matrix11);
            expect(JSON.stringify(kroneckerProductResult)).assertEqual('[[1,2,2,4],[3,4,6,8],[3,6,4,8],[9,12,12,16]]');
        });
        it('kroneckerProduct_2', 0, () => {
            // kroneckerProduct
            let matrix11 = new Matrix([[1, 2], [3, 4], [5, 6]]);
            let kroneckerProductResult = matrix11.kroneckerProduct(matrix11);
            expect(JSON.stringify(kroneckerProductResult)).assertEqual('[[1,2,2,4],[3,4,6,8],[5,6,10,12],[3,6,4,8],[9,12,12,16],[15,18,20,24],[5,10,6,12],[15,20,18,24],[25,30,30,36]]');
        });
        it('kroneckerProduct_3', 0, () => {
            // kroneckerProduct
            let matrix11 = new Matrix([[1, 2]]);
            let kroneckerProductResult = matrix11.kroneckerProduct(matrix11);
            expect(JSON.stringify(kroneckerProductResult)).assertEqual('[[1,2,2,4]]');
        });
        it('kroneckerProduct_4', 0, () => {
            // kroneckerProduct
            let matrix11 = new Matrix([[1, 2, 3]]);
            let kroneckerProductResult = matrix11.kroneckerProduct(matrix11);
            expect(JSON.stringify(kroneckerProductResult)).assertEqual('[[1,2,3,2,4,6,3,6,9]]');
        });
        it('kroneckerProduct_5', 0, () => {
            // kroneckerProduct
            let matrix11 = new Matrix([[1, -2], [-3, 4]]);
            let kroneckerProductResult = matrix11.kroneckerProduct(matrix11);
            expect(JSON.stringify(kroneckerProductResult)).assertEqual('[[1,-2,-2,4],[-3,4,6,-8],[-3,6,4,-8],[9,-12,-12,16]]');
        });
        it('isMatrix_1', 0, () => {
            // isMatrix
            let matrix12 = new Matrix([[1, 2], [3, 4]]);
            expect(Matrix.isMatrix(matrix12)).assertTrue();
        });
        it('isMatrix_2', 0, () => {
            // isMatrix
            let matrix12 = new Matrix([[1, 2]]);
            expect(Matrix.isMatrix(matrix12)).assertTrue();
        });
        it('isMatrix_3', 0, () => {
            // isMatrix
            let matrix12 = new Matrix([[1, 2, 3]]);
            expect(Matrix.isMatrix(matrix12)).assertTrue();
        });
        it('isMatrix_4', 0, () => {
            // isMatrix
            let matrix12 = new Matrix([[1, 2], [3, 4], [5, 6]]);
            expect(Matrix.isMatrix(matrix12)).assertTrue();
        });
        it('isMatrix_5', 0, () => {
            // isMatrix
            let matrix12 = [[1, 2], [3, 4]];
            expect(Matrix.isMatrix(matrix12)).assertFalse();
        });
        it('checkMatrix_1', 0, () => {
            // checkMatrix
            let matrix13 = new Matrix([[1, 2], [3, 4]]);
            expect(JSON.stringify(Matrix.checkMatrix(matrix13))).assertEqual('[[1,2],[3,4]]');
        });
        it('checkMatrix_2', 0, () => {
            // checkMatrix
            let matrix13 = new Matrix([[1, 2, 3]]);
            expect(JSON.stringify(Matrix.checkMatrix(matrix13))).assertEqual('[[1,2,3]]');
        });
        it('checkMatrix_3', 0, () => {
            // checkMatrix
            let matrix13 = new Matrix([[1, 2, 3, 4]]);
            expect(JSON.stringify(Matrix.checkMatrix(matrix13))).assertEqual('[[1,2,3,4]]');
        });
        it('checkMatrix_4', 0, () => {
            // checkMatrix
            let matrix13 = new Matrix([[1]]);
            expect(JSON.stringify(Matrix.checkMatrix(matrix13))).assertEqual('[[1]]');
        });
        it('checkMatrix_5', 0, () => {
            // checkMatrix
            let matrix13 = new Matrix([[1, 2], [3, 4], [5, 6]]);
            expect(JSON.stringify(Matrix.checkMatrix(matrix13))).assertEqual('[[1,2],[3,4],[5,6]]');
        });
        it('mulColumn_1', 0, () => {
            // mulColumn
            let matrix14 = new Matrix([[1, 2], [3, 4]]);
            matrix14.mulColumn(0, 2);
            expect(JSON.stringify(matrix14)).assertEqual('[[2,2],[6,4]]');
        });
        it('mulColumn_2', 0, () => {
            // mulColumn
            let matrix14 = new Matrix([[1, 2]]);
            matrix14.mulColumn(1, 2);
            expect(JSON.stringify(matrix14)).assertEqual('[[1,4]]');
        });
        it('mulColumn_3', 0, () => {
            // mulColumn
            let matrix14 = new Matrix([[1, 2], [3, 4]]);
            matrix14.mulColumn(1, 2);
            expect(JSON.stringify(matrix14)).assertEqual('[[1,4],[3,8]]');
        });
        it('mulColumn_4', 0, () => {
            // mulColumn
            let matrix14 = new Matrix([[1, 2], [3, 4]]);
            try {
                matrix14.mulColumn(2, 2);
            }
            catch (e) {
                expect(e.message).assertEqual("Column index out of range");
            }
        });
        it('mulColumn_5', 0, () => {
            // mulColumn
            let matrix14 = new Matrix([[1, 2], [3, 4], [5, 6]]);
            matrix14.mulColumn(0, 2);
            expect(JSON.stringify(matrix14)).assertEqual('[[2,2],[6,4],[10,6]]');
        });
        it('mulColumnVector_1', 0, () => {
            // mulColumnVector
            let matrix15 = new Matrix([[1, 2], [3, 4]]);
            matrix15.mulColumnVector([2, 3]);
            expect(JSON.stringify(matrix15)).assertEqual('[[2,4],[9,12]]');
        });
        it('mulColumnVector_2', 0, () => {
            // mulColumnVector
            let matrix15 = new Matrix([[1, 2], [3, 4]]);
            matrix15.mulColumnVector([-2, 4]);
            expect(JSON.stringify(matrix15)).assertEqual('[[-2,-4],[12,16]]');
        });
        it('mulColumnVector_3', 0, () => {
            // mulColumnVector
            let matrix15 = new Matrix([[1, 2]]);
            try {
                matrix15.mulColumnVector([2, 3]);
            }
            catch (e) {
                expect(e.message).assertEqual('vector size must be the same as the number of rows');
            }
        });
        it('mulColumnVector_4', 0, () => {
            // mulColumnVector
            let matrix15 = new Matrix([[1, 2], [3, 4], [5, 6]]);
            matrix15.mulColumnVector([2, 3, 1]);
            expect(JSON.stringify(matrix15)).assertEqual('[[2,4],[9,12],[5,6]]');
        });
        it('mulColumnVector_5', 0, () => {
            // mulColumnVector
            let matrix15 = new Matrix([[1, 2]]);
            matrix15.mulColumnVector([3]);
            expect(JSON.stringify(matrix15)).assertEqual('[[3,6]]');
        });
        it('mulRow_1', 0, () => {
            // mulRow
            let matrix16 = new Matrix([[1, 2], [3, 4]]);
            matrix16.mulRow(0, 2);
            expect(JSON.stringify(matrix16)).assertEqual('[[2,4],[3,4]]');
        });
        it('mulRow_2', 0, () => {
            // mulRow
            let matrix16 = new Matrix([[1, 2], [3, 4]]);
            matrix16.mulRow(1, 2);
            expect(JSON.stringify(matrix16)).assertEqual('[[1,2],[6,8]]');
        });
        it('mulRow_3', 0, () => {
            // mulRow
            let matrix16 = new Matrix([[1, 2]]);
            matrix16.mulRow(0, 2);
            expect(JSON.stringify(matrix16)).assertEqual('[[2,4]]');
        });
        it('mulRow_4', 0, () => {
            // mulRow
            let matrix16 = new Matrix([[1, 2], [3, 4]]);
            try {
                matrix16.mulRow(2, 2);
            }
            catch (e) {
                expect(e.message).assertEqual('Row index out of range');
            }
        });
        it('mulRow_5', 0, () => {
            // mulRow
            let matrix16 = new Matrix([[1, 2], [3, 4]]);
            matrix16.mulRow(0, 3);
            expect(JSON.stringify(matrix16)).assertEqual('[[3,6],[3,4]]');
        });
        it('mulRowVector_1', 0, () => {
            // mulRowVector
            let matrix17 = new Matrix([[1, 2], [3, 4]]);
            matrix17.mulRowVector([2, 3]);
            expect(JSON.stringify(matrix17)).assertEqual('[[2,6],[6,12]]');
        });
        it('mulRowVector_2', 0, () => {
            // mulRowVector
            let matrix17 = new Matrix([[1, 2]]);
            matrix17.mulRowVector([2, 3]);
            expect(JSON.stringify(matrix17)).assertEqual('[[2,6]]');
        });
        it('mulRowVector_3', 0, () => {
            // mulRowVector
            let matrix17 = new Matrix([[1, 2], [3, 4], [5, 6]]);
            matrix17.mulRowVector([2, 3]);
            expect(JSON.stringify(matrix17)).assertEqual('[[2,6],[6,12],[10,18]]');
        });
        it('mulRowVector_4', 0, () => {
            // mulRowVector
            let matrix17 = new Matrix([[1, 2, 3]]);
            matrix17.mulRowVector([2, 1, 3]);
            expect(JSON.stringify(matrix17)).assertEqual('[[2,2,9]]');
        });
        it('mulRowVector_5', 0, () => {
            // mulRowVector
            let matrix17 = new Matrix([[1, -2], [-3, 4]]);
            matrix17.mulRowVector([2, 3]);
            expect(JSON.stringify(matrix17)).assertEqual('[[2,-6],[-6,12]]');
        });
        it('multiply_1', 0, () => {
            // multiply
            let matrix18 = new Matrix([[1, 2], [3, 4]]);
            let multiplyResult = matrix18.multiply(2);
            expect(JSON.stringify(multiplyResult)).assertEqual('[[2,4],[6,8]]');
        });
        it('multiply_2', 0, () => {
            // multiply
            let matrix18 = new Matrix([[1, 2], [3, 4]]);
            let multiplyResult = matrix18.multiply(-1);
            expect(JSON.stringify(multiplyResult)).assertEqual('[[-1,-2],[-3,-4]]');
        });
        it('multiply_3', 0, () => {
            // multiply
            let matrix18 = new Matrix([[1, 2]]);
            let multiplyResult = matrix18.multiply(2);
            expect(JSON.stringify(multiplyResult)).assertEqual('[[2,4]]');
        });
        it('multiply_4', 0, () => {
            // multiply
            let matrix18 = new Matrix([[1, 2], [3, 4], [5, 6]]);
            let multiplyResult = matrix18.multiply(2);
            expect(JSON.stringify(multiplyResult)).assertEqual('[[2,4],[6,8],[10,12]]');
        });
        it('multiply_5', 0, () => {
            // multiply
            let matrix18 = new Matrix([[1]]);
            let multiplyResult = matrix18.multiply(2);
            expect(JSON.stringify(multiplyResult)).assertEqual('[[2]]');
        });
        it('Matrix.randInt_1', 0, () => {
            // randInt
            let randIntMatrix1 = Matrix.randInt(2, 2);
            expect(randIntMatrix1.rows).assertEqual(2);
            expect(randIntMatrix1.columns).assertEqual(2);
        });
        it('Matrix.randInt_2', 0, () => {
            // randInt
            let randIntMatrix1 = Matrix.randInt(3, 3);
            expect(randIntMatrix1.rows).assertEqual(3);
            expect(randIntMatrix1.columns).assertEqual(3);
        });
        it('Matrix.randInt_3', 0, () => {
            // randInt
            let randIntMatrix1 = Matrix.randInt(4, 4);
            expect(randIntMatrix1.rows).assertEqual(4);
            expect(randIntMatrix1.columns).assertEqual(4);
        });
        it('Matrix.randInt_4', 0, () => {
            // randInt
            let randIntMatrix1 = Matrix.randInt(5, 5);
            expect(randIntMatrix1.rows).assertEqual(5);
            expect(randIntMatrix1.columns).assertEqual(5);
        });
        it('Matrix.randInt_5', 0, () => {
            // randInt
            let randIntMatrix1 = Matrix.randInt(1, 1);
            expect(randIntMatrix1.rows).assertEqual(1);
            expect(randIntMatrix1.columns).assertEqual(1);
        });
        it('Matrix.randInt_6', 0, () => {
            // randInt with option
            let options: IRandomIntOptions = {
                min: 0, max: 10, random: () => {
                    return Math.random();
                }
            };
            let randIntMatrix1 = Matrix.randInt(2, 2, options);
            expect(randIntMatrix1.rows).assertEqual(2);
            expect(randIntMatrix1.columns).assertEqual(2);
            expect(randIntMatrix1.get(0, 0)).assertLessOrEqual(10);
            expect(randIntMatrix1.get(0, 1)).assertLessOrEqual(10);
            expect(randIntMatrix1.get(1, 0)).assertLessOrEqual(10);
            expect(randIntMatrix1.get(1, 1)).assertLessOrEqual(10);
        });
        it('Matrix.randInt_7', 0, () => {
            // randInt with option
            let options: IRandomIntOptions = {
                min: 0, max: 9, random: () => {
                    return Math.random();
                }
            };
            let randIntMatrix1 = Matrix.randInt(3, 3, options);
            expect(randIntMatrix1.rows).assertEqual(3);
            expect(randIntMatrix1.columns).assertEqual(3);
            expect(randIntMatrix1.get(0, 0)).assertLessOrEqual(9);
            expect(randIntMatrix1.get(0, 1)).assertLessOrEqual(9);
            expect(randIntMatrix1.get(1, 0)).assertLessOrEqual(9);
            expect(randIntMatrix1.get(1, 1)).assertLessOrEqual(9);
        });
        it('Matrix.randInt_8', 0, () => {
            // randInt with option
            let options: IRandomIntOptions = {
                min: 1, max: 7, random: () => {
                    return Math.random();
                }
            };
            let randIntMatrix1 = Matrix.randInt(5, 5, options);
            expect(randIntMatrix1.rows).assertEqual(5);
            expect(randIntMatrix1.columns).assertEqual(5);
            expect(randIntMatrix1.get(0, 0)).assertLessOrEqual(7);
            expect(randIntMatrix1.get(0, 1)).assertLessOrEqual(7);
            expect(randIntMatrix1.get(1, 0)).assertLessOrEqual(7);
            expect(randIntMatrix1.get(1, 1)).assertLessOrEqual(7);
        });
        it('Matrix.random_1', 0, () => {
            // random
            let randomMatrix = Matrix.random(2, 2);
            expect(randomMatrix.rows).assertEqual(2);
            expect(randomMatrix.columns).assertEqual(2);
        });
        it('Matrix.random_2', 0, () => {
            // random
            let randomMatrix = Matrix.random(3, 3);
            expect(randomMatrix.rows).assertEqual(3);
            expect(randomMatrix.columns).assertEqual(3);
        });
        it('Matrix.random_3', 0, () => {
            // random
            let randomMatrix = Matrix.random(1, 1);
            expect(randomMatrix.rows).assertEqual(1);
            expect(randomMatrix.columns).assertEqual(1);
        });
        it('Matrix.random_4', 0, () => {
            // random
            let randomMatrix = Matrix.random(4, 4);
            expect(randomMatrix.rows).assertEqual(4);
            expect(randomMatrix.columns).assertEqual(4);
        });
        it('Matrix.random_5', 0, () => {
            // random
            let randomMatrix = Matrix.random(5, 5);
            expect(randomMatrix.rows).assertEqual(5);
            expect(randomMatrix.columns).assertEqual(5);
        });
        it('Matrix.random_6', 0, () => {
            // random with option
            let options1: IRandomOptions = {
                random: () => {
                    return Math.random() * 10;
                }
            };
            let randomMatrix2 = Matrix.random(2, 2, options1);
            expect(randomMatrix2.get(0, 0)).assertLessOrEqual(10);
            expect(randomMatrix2.get(0, 1)).assertLessOrEqual(10);
            expect(randomMatrix2.get(1, 0)).assertLessOrEqual(10);
            expect(randomMatrix2.get(1, 1)).assertLessOrEqual(10);
        });
        it('Matrix.random_7', 0, () => {
            // random with option
            let options1: IRandomOptions = {
                random: () => {
                    return Math.random() * 9;
                }
            };
            let randomMatrix2 = Matrix.random(2, 2, options1);
            expect(randomMatrix2.get(0, 0)).assertLessOrEqual(9);
            expect(randomMatrix2.get(0, 1)).assertLessOrEqual(9);
            expect(randomMatrix2.get(1, 0)).assertLessOrEqual(9);
            expect(randomMatrix2.get(1, 1)).assertLessOrEqual(9);
        });
        it('Matrix.random_8', 0, () => {
            // random with option
            let options1: IRandomOptions = {
                random: () => {
                    return Math.random() * 5;
                }
            };
            let randomMatrix2 = Matrix.random(2, 2, options1);
            expect(randomMatrix2.get(0, 0)).assertLessOrEqual(5);
            expect(randomMatrix2.get(0, 1)).assertLessOrEqual(5);
            expect(randomMatrix2.get(1, 0)).assertLessOrEqual(5);
            expect(randomMatrix2.get(1, 1)).assertLessOrEqual(5);
        });
        it('Matrix.random_9', 0, () => {
            // random with option
            let options1: IRandomOptions = {
                random: () => {
                    return Math.random() * 100;
                }
            };
            let randomMatrix2 = Matrix.random(2, 2, options1);
            expect(randomMatrix2.get(0, 0)).assertLessOrEqual(100);
            expect(randomMatrix2.get(0, 1)).assertLessOrEqual(100);
            expect(randomMatrix2.get(1, 0)).assertLessOrEqual(100);
            expect(randomMatrix2.get(1, 1)).assertLessOrEqual(100);
        });
        it('Matrix.random_10', 0, () => {
            // random with option
            let options1: IRandomOptions = {
                random: () => {
                    return Math.random() * 3;
                }
            };
            let randomMatrix2 = Matrix.random(2, 2, options1);
            expect(randomMatrix2.get(0, 0)).assertLessOrEqual(3);
            expect(randomMatrix2.get(0, 1)).assertLessOrEqual(3);
            expect(randomMatrix2.get(1, 0)).assertLessOrEqual(3);
            expect(randomMatrix2.get(1, 1)).assertLessOrEqual(3);
        });
        it('rightShift_1', 0, () => {
            // rightShift
            let matrix19 = new Matrix([[1, 2], [3, 4]]);
            matrix19.rightShift(1);
            expect(JSON.stringify(matrix19)).assertEqual('[[0,1],[1,2]]');
        });
        it('rightShift_2', 0, () => {
            // rightShift
            let matrix19 = new Matrix([[1, 2], [3, 4]]);
            matrix19.rightShift(-2);
            expect(JSON.stringify(matrix19)).assertEqual('[[0,0],[0,0]]');
        });
        it('rightShift_3', 0, () => {
            // rightShift
            let matrix19 = new Matrix([[1, 2]]);
            matrix19.rightShift(1);
            expect(JSON.stringify(matrix19)).assertEqual('[[0,1]]');
        });
        it('rightShift_4', 0, () => {
            // rightShift
            let matrix19 = new Matrix([[1, 2], [3, 4]]);
            matrix19.rightShift(0);
            expect(JSON.stringify(matrix19)).assertEqual('[[1,2],[3,4]]');
        });
        it('rightShift_5', 0, () => {
            // rightShift
            let matrix19 = new Matrix([[1, 2], [3, 4], [5, 6]]);
            matrix19.rightShift(1);
            expect(JSON.stringify(matrix19)).assertEqual('[[0,1],[1,2],[2,3]]');
        });
        it('leftShift_1', 0, () => {
            // leftShift
            let matrix20 = new Matrix([[1, 2], [3, 4]]);
            matrix20.leftShift(1);
            expect(JSON.stringify(matrix20)).assertEqual('[[2,4],[6,8]]');
        });
        it('leftShift_2', 0, () => {
            // leftShift
            let matrix20 = new Matrix([[1, 2], [3, 4]]);
            matrix20.leftShift(-2);
            expect(JSON.stringify(matrix20)).assertEqual('[[1073741824,-2147483648],[-1073741824,0]]');
        });
        it('leftShift_3', 0, () => {
            // leftShift
            let matrix20 = new Matrix([[1, 2], [3, 4]]);
            matrix20.leftShift(0);
            expect(JSON.stringify(matrix20)).assertEqual('[[1,2],[3,4]]');
        });
        it('leftShift_4', 0, () => {
            // leftShift
            let matrix20 = new Matrix([[3, 4]]);
            matrix20.leftShift(1);
            expect(JSON.stringify(matrix20)).assertEqual('[[6,8]]');
        });
        it('leftShift_5', 0, () => {
            // leftShift
            let matrix20 = new Matrix([[1, 2], [3, 4], [5, 6]]);
            matrix20.leftShift(1);
            expect(JSON.stringify(matrix20)).assertEqual('[[2,4],[6,8],[10,12]]');
        });
        it('signPropagatingRightShift_1', 0, () => {
            // signPropagatingRightShift
            let matrix21 = new Matrix([[1, 2], [3, 4]]);
            matrix21.signPropagatingRightShift(1);
            expect(JSON.stringify(matrix21)).assertEqual('[[0,1],[1,2]]');
        });
        it('signPropagatingRightShift_2', 0, () => {
            // signPropagatingRightShift
            let matrix21 = new Matrix([[1, 2], [3, 4]]);
            matrix21.signPropagatingRightShift(0);
            expect(JSON.stringify(matrix21)).assertEqual('[[1,2],[3,4]]');
        });
        it('signPropagatingRightShift_3', 0, () => {
            // signPropagatingRightShift
            let matrix21 = new Matrix([[1, 2], [3, 4]]);
            matrix21.signPropagatingRightShift(-1);
            expect(JSON.stringify(matrix21)).assertEqual('[[0,0],[0,0]]');
        });
        it('signPropagatingRightShift_4', 0, () => {
            // signPropagatingRightShift
            let matrix21 = new Matrix([[3, 4]]);
            matrix21.signPropagatingRightShift(1);
            expect(JSON.stringify(matrix21)).assertEqual('[[1,2]]');
        });
        it('signPropagatingRightShift_5', 0, () => {
            // signPropagatingRightShift
            let matrix21 = new Matrix([[1, 2], [3, 4], [5, 6]]);
            matrix21.signPropagatingRightShift(1);
            expect(JSON.stringify(matrix21)).assertEqual('[[0,1],[1,2],[2,3]]');
        });
        it('zeroFillRightShift_1', 0, () => {
            // zeroFillRightShift
            let matrix22 = new Matrix([[1, 2], [3, 4]]);
            matrix22.zeroFillRightShift(1);
            expect(JSON.stringify(matrix22)).assertEqual('[[0,1],[1,2]]');
        });
        it('zeroFillRightShift_2', 0, () => {
            // zeroFillRightShift
            let matrix22 = new Matrix([[1, 2], [3, 4]]);
            matrix22.zeroFillRightShift(0);
            expect(JSON.stringify(matrix22)).assertEqual('[[1,2],[3,4]]');
        });
        it('zeroFillRightShift_3', 0, () => {
            // zeroFillRightShift
            let matrix22 = new Matrix([[1, 2], [3, 4]]);
            matrix22.zeroFillRightShift(-2);
            expect(JSON.stringify(matrix22)).assertEqual('[[0,0],[0,0]]');
        });
        it('zeroFillRightShift_4', 0, () => {
            // zeroFillRightShift
            let matrix22 = new Matrix([[3, 4]]);
            matrix22.zeroFillRightShift(1);
            expect(JSON.stringify(matrix22)).assertEqual('[[1,2]]');
        });
        it('zeroFillRightShift_5', 0, () => {
            // zeroFillRightShift
            let matrix22 = new Matrix([[1, 2], [3, 4], [5, 6]]);
            matrix22.zeroFillRightShift(1);
            expect(JSON.stringify(matrix22)).assertEqual('[[0,1],[1,2],[2,3]]');
        });
        it('scale_1', 0, () => {
            // scale
            let matrix23 = new Matrix([[1, 2], [3, 4]]);
            matrix23.scale({
                scale: 2
            });
            expect(JSON.stringify(matrix23)).assertEqual('[[0.5,1],[1.5,2]]');
        });
        it('scale_2', 0, () => {
            // scale
            let matrix23 = new Matrix([[1, 2], [3, 4]]);
            matrix23.scale({
                scale: 1
            });
            expect(JSON.stringify(matrix23)).assertEqual('[[1,2],[3,4]]');
        });
        it('scale_3', 0, () => {
            // scale
            let matrix23 = new Matrix([[1, 2], [3, 4]]);
            matrix23.scale({
                scale: -2
            });
            expect(JSON.stringify(matrix23)).assertEqual('[[-0.5,-1],[-1.5,-2]]');
        });
        it('scale_4', 0, () => {
            // scale
            let matrix23 = new Matrix([[1, 2], [3, 4]]);
            matrix23.scale({
                scale: 3
            });
            expect(JSON.stringify(matrix23)).assertEqual('[[0.3333333333333333,0.6666666666666666],[1,1.3333333333333333]]');
        });
        it('scale_5', 0, () => {
            // scale
            let matrix23 = new Matrix([[1, 2]]);
            matrix23.scale({
                scale: 2
            });
            expect(JSON.stringify(matrix23)).assertEqual('[[0.5,1]]');
        });
        it('scale_6', 0, () => {
            // scale
            let matrix231 = new Matrix([[1, 2], [3, 4]]);
            matrix231.scale({
                min: 1, max: 2
            });
            expect(JSON.stringify(matrix231))
                .assertEqual('[[0.31622776601683796,0.6324555320336759],[0.9486832980505138,1.2649110640673518]]');
        });
        it('scale_7', 0, () => {
            // scale
            let matrix231 = new Matrix([[1, 2], [3, 4]]);
            matrix231.scale({
                min: 1, max: 5
            });
            expect(JSON.stringify(matrix231))
                .assertEqual('[[0.31622776601683796,0.6324555320336759],[0.9486832980505138,1.2649110640673518]]');
        });
        it('scale_8', 0, () => {
            // scale
            let matrix231 = new Matrix([[1, 2], [3, 4]]);
            matrix231.scale({
                min: 2, max: 5
            });
            expect(JSON.stringify(matrix231))
                .assertEqual('[[0.31622776601683796,0.6324555320336759],[0.9486832980505138,1.2649110640673518]]');
        });
        it('scaleColumns_1', 0, () => {
            // scaleColumns
            let matrix = new Matrix([[1, 2], [-1, 0]]);
            let scaledMatrix = matrix.scaleColumns();
            expect(JSON.stringify(scaledMatrix)).assertEqual('[[1,1],[0,0]]');
        });
        it('scaleColumns_2', 0, () => {
            // scaleColumns
            let matrix = new Matrix([[1, 2], [3, 4]]);
            let scaledMatrix = matrix.scaleColumns();
            expect(JSON.stringify(scaledMatrix)).assertEqual('[[0,0],[1,1]]');
        });
        it('scaleColumns_3', 0, () => {
            // scaleColumns
            let matrix = new Matrix([[-1, -2], [-3, -4]]);
            let scaledMatrix = matrix.scaleColumns();
            expect(JSON.stringify(scaledMatrix)).assertEqual('[[1,1],[0,0]]');
        });
        it('scaleColumns_4', 0, () => {
            // scaleColumns
            let matrix = new Matrix([[1, 2], [3, 4], [5, 6]]);
            let scaledMatrix = matrix.scaleColumns();
            expect(JSON.stringify(scaledMatrix)).assertEqual('[[0,0],[0.5,0.5],[1,1]]');
        });
        it('scaleColumns_5', 0, () => {
            // scaleColumns
            let matrix = new Matrix([[-1, -2]]);
            try {
                let scaledMatrix = matrix.scaleColumns();
            }
            catch (e) {
                expect(e.message).assertEqual('minimum and maximum input values are equal. Cannot rescale a constant array');
            }
        });
        it('subMatrixColumn_1', 0, () => {
            // subMatrixColumn
            let matrix26 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let subMatrixColumnResult = matrix26.subMatrixColumn([1, 2]);
            expect(JSON.stringify(subMatrixColumnResult)).assertEqual('[[2,3],[5,6],[8,9]]');
        });
        it('subMatrixColumn_2', 0, () => {
            // subMatrixColumn
            let matrix26 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let subMatrixColumnResult = matrix26.subMatrixColumn([1, 2], 0, 2);
            expect(JSON.stringify(subMatrixColumnResult)).assertEqual('[[2,3],[5,6],[8,9]]');
        });
        it('subMatrixColumn_3', 0, () => {
            // subMatrixColumn
            let matrix26 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let subMatrixColumnResult = matrix26.subMatrixColumn([1, 2], 0, 1);
            expect(JSON.stringify(subMatrixColumnResult)).assertEqual('[[2,3],[5,6]]');
        });
        it('subMatrixColumn_4', 0, () => {
            // subMatrixColumn
            let matrix26 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let subMatrixColumnResult = matrix26.subMatrixColumn([0, 1], 0, 2);
            expect(JSON.stringify(subMatrixColumnResult)).assertEqual('[[1,2],[4,5],[7,8]]');
        });
        it('subMatrixColumn_5', 0, () => {
            // subMatrixColumn
            let matrix26 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            let subMatrixColumnResult = matrix26.subMatrixColumn([0, 2], 0, 1);
            expect(JSON.stringify(subMatrixColumnResult)).assertEqual('[[1,3],[4,6]]');
        });
        it('subMatrixRow_1', 0, () => {
            // subMatrixRow
            let matrix27 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let subMatrixRowResult = matrix27.subMatrixRow([1, 2]);
            expect(JSON.stringify(subMatrixRowResult)).assertEqual('[[4,5,6],[7,8,9]]');
        });
        it('subMatrixRow_2', 0, () => {
            // subMatrixRow
            let matrix27 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let subMatrixRowResult = matrix27.subMatrixRow([1, 2], 1, 2);
            expect(JSON.stringify(subMatrixRowResult)).assertEqual('[[5,6],[8,9]]');
        });
        it('subMatrixRow_3', 0, () => {
            // subMatrixRow
            let matrix27 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let subMatrixRowResult = matrix27.subMatrixRow([0, 2], 0, 2);
            expect(JSON.stringify(subMatrixRowResult)).assertEqual('[[1,2,3],[7,8,9]]');
        });
        it('subMatrixRow_4', 0, () => {
            // subMatrixRow
            let matrix27 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            let subMatrixRowResult = matrix27.subMatrixRow([1, 1], 0, 2);
            expect(JSON.stringify(subMatrixRowResult)).assertEqual('[[4,5,6],[4,5,6]]');
        });
        it('subMatrixRow_5', 0, () => {
            // subMatrixRow
            let matrix27 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            let subMatrixRowResult = matrix27.subMatrixRow([0, 1], 1, 2);
            expect(JSON.stringify(subMatrixRowResult)).assertEqual('[[2,3],[5,6]]');
        });
        it('subRowVector_1', 0, () => {
            // subRowVector
            let matrix28 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            let subRowVectorResult = matrix28.subRowVector([1, 2, 3]);
            expect(JSON.stringify(subRowVectorResult)).assertEqual('[[0,0,0],[3,3,3]]');
        });
        it('subRowVector_2', 0, () => {
            // subRowVector
            let matrix28 = new Matrix([[1, 2], [4, 5]]);
            let subRowVectorResult = matrix28.subRowVector([1, 2]);
            expect(JSON.stringify(subRowVectorResult)).assertEqual('[[0,0],[3,3]]');
        });
        it('subRowVector_3', 0, () => {
            // subRowVector
            let matrix28 = new Matrix([[1, 2, 3]]);
            let subRowVectorResult = matrix28.subRowVector([1, 2, 3]);
            expect(JSON.stringify(subRowVectorResult)).assertEqual('[[0,0,0]]');
        });
        it('subRowVector_4', 0, () => {
            // subRowVector
            let matrix28 = new Matrix([[5, 6]]);
            let subRowVectorResult = matrix28.subRowVector([2, 3]);
            expect(JSON.stringify(subRowVectorResult)).assertEqual('[[3,3]]');
        });
        it('subRowVector_5', 0, () => {
            // subRowVector
            let matrix28 = new Matrix([[1, 2]]);
            try {
                let subRowVectorResult = matrix28.subRowVector([1, 2, 3]);
            }
            catch (e) {
                expect(e.message).assertEqual('vector size must be the same as the number of columns');
            }
        });
        it('subtract_1', 0, () => {
            // subtract
            let matrix29 = new Matrix([[1, 2], [3, 4]]);
            let matrix30 = new Matrix([[5, 6], [7, 8]]);
            let subtractResult = matrix29.subtract(matrix30);
            expect(JSON.stringify(subtractResult)).assertEqual('[[-4,-4],[-4,-4]]');
        });
        it('subtract_2', 0, () => {
            // subtract
            let matrix29 = new Matrix([[1, 2], [3, 4]]);
            let matrix30 = new Matrix([[-5, -6], [-7, -8]]);
            let subtractResult = matrix29.subtract(matrix30);
            expect(JSON.stringify(subtractResult)).assertEqual('[[6,8],[10,12]]');
        });
        it('subtract_3', 0, () => {
            // subtract
            let matrix29 = new Matrix([[3, 4]]);
            let matrix30 = new Matrix([[1, 2]]);
            let subtractResult = matrix29.subtract(matrix30);
            expect(JSON.stringify(subtractResult)).assertEqual('[[2,2]]');
        });
        it('subtract_4', 0, () => {
            // subtract
            let matrix29 = new Matrix([[1, 2], [3, 4]]);
            let matrix30 = new Matrix([[7, 8]]);
            try {
                let subtractResult = matrix29.subtract(matrix30);
            }
            catch (e) {
                expect(e.message).assertEqual('Matrices dimensions must be equal');
            }
        });
        it('subtract_5', 0, () => {
            // subtract
            let matrix29 = new Matrix([[1, 2], [3, 4]]);
            let matrix30 = new Matrix([[5, 6], [7, 8]]);
            let subtractResult = matrix30.subtract(matrix29);
            expect(JSON.stringify(subtractResult)).assertEqual('[[4,4],[4,4]]');
        });
        it('subColumnVector_1', 0, () => {
            // subColumnVector
            let matrix31 = new Matrix([[1, 2], [3, 4]]);
            let subColumnVectorResult = matrix31.subColumnVector([1, 2]);
            expect(JSON.stringify(subColumnVectorResult)).assertEqual('[[0,1],[1,2]]');
        });
        it('subColumnVector_2', 0, () => {
            // subColumnVector
            let matrix31 = new Matrix([[3, 4]]);
            try {
                let subColumnVectorResult = matrix31.subColumnVector([1, 2]);
            }
            catch (e) {
                expect(e.message).assertEqual('vector size must be the same as the number of rows');
            }
        });
        it('subColumnVector_3', 0, () => {
            // subColumnVector
            let matrix31 = new Matrix([[1, 2], [3, 4]]);
            try {
                let subColumnVectorResult = matrix31.subColumnVector([1]);
            }
            catch (e) {
                expect(e.message).assertEqual('vector size must be the same as the number of rows');
            }
        });
        it('subColumnVector_4', 0, () => {
            // subColumnVector
            let matrix31 = new Matrix([[1, 2], [3, 4], [5, 6]]);
            let subColumnVectorResult = matrix31.subColumnVector([1, 2, 3]);
            expect(JSON.stringify(subColumnVectorResult)).assertEqual('[[0,1],[1,2],[2,3]]');
        });
        it('subColumnVector_5', 0, () => {
            // subColumnVector
            let matrix31 = new Matrix([[1, 2], [3, 4]]);
            let subColumnVectorResult = matrix31.subColumnVector([-1, -2]);
            expect(JSON.stringify(subColumnVectorResult)).assertEqual('[[2,3],[5,6]]');
        });
        it('subMatrix_1', 0, () => {
            // subMatrix
            let matrix32 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let subMatrixResult = matrix32.subMatrix(1, 2, 1, 2);
            expect(JSON.stringify(subMatrixResult)).assertEqual('[[5,6],[8,9]]');
        });
        it('subMatrix_2', 0, () => {
            // subMatrix
            let matrix32 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let subMatrixResult = matrix32.subMatrix(0, 2, 0, 2);
            expect(JSON.stringify(subMatrixResult)).assertEqual('[[1,2,3],[4,5,6],[7,8,9]]');
        });
        it('subMatrix_3', 0, () => {
            // subMatrix
            let matrix32 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let subMatrixResult = matrix32.subMatrix(0, 1, 0, 1);
            expect(JSON.stringify(subMatrixResult)).assertEqual('[[1,2],[4,5]]');
        });
        it('subMatrix_4', 0, () => {
            // subMatrix
            let matrix32 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let subMatrixResult = matrix32.subMatrix(1, 1, 1, 1);
            expect(JSON.stringify(subMatrixResult)).assertEqual('[[5]]');
        });
        it('subMatrix_5', 0, () => {
            // subMatrix
            let matrix32 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            try {
                let subMatrixResult = matrix32.subMatrix(1, 3, 1, 3);
            }
            catch (e) {
                expect(e.message).assertEqual('Submatrix indices are out of range');
            }
        });
        it('sortColumns_1', 0, () => {
            // sortColumns
            let matrix33 = new Matrix([[3, 6], [2, 5], [1, 4]]);
            matrix33.sortColumns();
            expect(JSON.stringify(matrix33)).assertEqual('[[1,4],[2,5],[3,6]]');
        });
        it('sortColumns_2', 0, () => {
            // sortColumns
            let matrix33 = new Matrix([[7, 8, 9], [1, 2, 3], [4, 5, 6],]);
            matrix33.sortColumns();
            expect(JSON.stringify(matrix33)).assertEqual('[[1,2,3],[4,5,6],[7,8,9]]');
        });
        it('sortColumns_3', 0, () => {
            // sortColumns
            let matrix33 = new Matrix([[3, 2, 1], [9, 8, 7], [6, 5, 4],]);
            matrix33.sortColumns();
            expect(JSON.stringify(matrix33)).assertEqual('[[3,2,1],[6,5,4],[9,8,7]]');
        });
        it('sortColumns_4', 0, () => {
            // sortColumns
            let matrix33 = new Matrix([[3, 8, 9], [1, 2, 7]]);
            matrix33.sortColumns();
            expect(JSON.stringify(matrix33)).assertEqual('[[1,2,7],[3,8,9]]');
        });
        it('sortColumns_5', 0, () => {
            // sortColumns
            let matrix33 = new Matrix([[11, 8, 9]]);
            matrix33.sortColumns();
            expect(JSON.stringify(matrix33)).assertEqual('[[11,8,9]]');
        });
        it('sortRows_1', 0, () => {
            // sortRows
            let matrix34 = new Matrix([[3, 2, 1], [6, 5, 4]]);
            matrix34.sortRows();
            expect(JSON.stringify(matrix34)).assertEqual('[[1,2,3],[4,5,6]]');
        });
        it('sortRows_2', 0, () => {
            // sortRows
            let matrix34 = new Matrix([[6, 5, 4]]);
            matrix34.sortRows();
            expect(JSON.stringify(matrix34)).assertEqual('[[4,5,6]]');
        });
        it('sortRows_3', 0, () => {
            // sortRows
            let matrix34 = new Matrix([[3, 2, 1], [6, 5, 4], [9, 7, 8]]);
            matrix34.sortRows();
            expect(JSON.stringify(matrix34)).assertEqual('[[1,2,3],[4,5,6],[7,8,9]]');
        });
        it('sortRows_4', 0, () => {
            // sortRows
            let matrix34 = new Matrix([[3, 2, 1], [9, 7, 8], [6, 5, 4]]);
            matrix34.sortRows();
            expect(JSON.stringify(matrix34)).assertEqual('[[1,2,3],[7,8,9],[4,5,6]]');
        });
        it('sortRows_5', 0, () => {
            // sortRows
            let matrix34 = new Matrix([[3, 2, 1], [6, 5, 4]]);
            matrix34.sortRows();
            expect(JSON.stringify(matrix34)).assertEqual('[[1,2,3],[4,5,6]]');
        });
        it('Matrix.from1DArray_1', 0, () => {
            // from1DArray
            let array1D = [1, 2, 3, 4, 5, 6];
            let from1DArrayResult = Matrix.from1DArray(2, 3, array1D);
            expect(JSON.stringify(from1DArrayResult)).assertEqual('[[1,2,3],[4,5,6]]');
        });
        it('Matrix.from1DArray_2', 0, () => {
            // from1DArray
            let array1D = [1, 2, 3, 4, 5, 6];
            let from1DArrayResult = Matrix.from1DArray(3, 2, array1D);
            expect(JSON.stringify(from1DArrayResult)).assertEqual('[[1,2],[3,4],[5,6]]');
        });
        it('Matrix.from1DArray_3', 0, () => {
            // from1DArray
            let array1D = [1, 2, 3, 4, 5, 6];
            let from1DArrayResult = Matrix.from1DArray(1, 6, array1D);
            expect(JSON.stringify(from1DArrayResult)).assertEqual('[[1,2,3,4,5,6]]');
        });
        it('Matrix.from1DArray_4', 0, () => {
            // from1DArray
            let array1D = [1, 2, 3, 4, 5, 6];
            try {
                let from1DArrayResult = Matrix.from1DArray(4, 2, array1D);
            }
            catch (e) {
                expect(e.message).assertEqual('data length does not match given dimensions');
            }
        });
        it('Matrix.from1DArray_5', 0, () => {
            // from1DArray
            let array1D = [1, 2, 3, 4];
            let from1DArrayResult = Matrix.from1DArray(2, 2, array1D);
            expect(JSON.stringify(from1DArrayResult)).assertEqual('[[1,2],[3,4]]');
        });
        it('to1DArray_1', 0, () => {
            // to1DArray
            let matrix41 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            let to1DArrayResult = matrix41.to1DArray();
            expect(JSON.stringify(to1DArrayResult)).assertEqual('[1,2,3,4,5,6]');
        });
        it('to1DArray_2', 0, () => {
            // to1DArray
            let matrix41 = new Matrix([[1, 2], [3, 4], [5, 6]]);
            let to1DArrayResult = matrix41.to1DArray();
            expect(JSON.stringify(to1DArrayResult)).assertEqual('[1,2,3,4,5,6]');
        });
        it('to1DArray_3', 0, () => {
            // to1DArray
            let matrix41 = new Matrix([[1], [2], [3], [4], [5], [6]]);
            let to1DArrayResult = matrix41.to1DArray();
            expect(JSON.stringify(to1DArrayResult)).assertEqual('[1,2,3,4,5,6]');
        });
        it('to1DArray_4', 0, () => {
            // to1DArray
            let matrix41 = new Matrix([[1, 2], [5, 6]]);
            let to1DArrayResult = matrix41.to1DArray();
            expect(JSON.stringify(to1DArrayResult)).assertEqual('[1,2,5,6]');
        });
        it('to1DArray_5', 0, () => {
            // to1DArray
            let matrix41 = new Matrix([[1, 2, 3]]);
            let to1DArrayResult = matrix41.to1DArray();
            expect(JSON.stringify(to1DArrayResult)).assertEqual('[1,2,3]');
        });
        it('to2DArray_1', 0, () => {
            // to2DArray
            let matrix42 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            let to2DArrayResult = matrix42.to2DArray();
            expect(JSON.stringify(to2DArrayResult)).assertEqual('[[1,2,3],[4,5,6]]');
        });
        it('to2DArray_2', 0, () => {
            // to2DArray
            let matrix42 = new Matrix([[1, 2, 3, 4, 5, 6]]);
            let to2DArrayResult = matrix42.to2DArray();
            expect(JSON.stringify(to2DArrayResult)).assertEqual('[[1,2,3,4,5,6]]');
        });
        it('to2DArray_3', 0, () => {
            // to2DArray
            let matrix42 = new Matrix([[1, 2], [3, 4], [5, 6]]);
            let to2DArrayResult = matrix42.to2DArray();
            expect(JSON.stringify(to2DArrayResult)).assertEqual('[[1,2],[3,4],[5,6]]');
        });
        it('to2DArray_4', 0, () => {
            // to2DArray
            let matrix42 = new Matrix([[1], [2], [3], [4], [5], [6]]);
            let to2DArrayResult = matrix42.to2DArray();
            expect(JSON.stringify(to2DArrayResult)).assertEqual('[[1],[2],[3],[4],[5],[6]]');
        });
        it('to2DArray_5', 0, () => {
            // to2DArray
            let matrix42 = new Matrix([[1, 2, 3]]);
            let to2DArrayResult = matrix42.to2DArray();
            expect(JSON.stringify(to2DArrayResult)).assertEqual('[[1,2,3]]');
        });
        it('toJSON_1', 0, () => {
            // toJSON
            let matrix43 = new Matrix([[1, 2], [3, 4]]);
            let toJSONResult = matrix43.toJSON();
            expect(JSON.stringify(toJSONResult)).assertEqual('[[1,2],[3,4]]');
        });
        it('toJSON_2', 0, () => {
            // toJSON
            let matrix43 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            let toJSONResult = matrix43.toJSON();
            expect(JSON.stringify(toJSONResult)).assertEqual('[[1,2,3],[4,5,6]]');
        });
        it('toJSON_3', 0, () => {
            // toJSON
            let matrix43 = new Matrix([[1, 2], [3, 4], [5, 6]]);
            let toJSONResult = matrix43.toJSON();
            expect(JSON.stringify(toJSONResult)).assertEqual('[[1,2],[3,4],[5,6]]');
        });
        it('toJSON_4', 0, () => {
            // toJSON
            let matrix43 = new Matrix([[1, 2, 3, 4, 5, 6]]);
            let toJSONResult = matrix43.toJSON();
            expect(JSON.stringify(toJSONResult)).assertEqual('[[1,2,3,4,5,6]]');
        });
        it('toJSON_5', 0, () => {
            // toJSON
            let matrix43 = new Matrix([[1], [2], [3], [4], [5], [6]]);
            let toJSONResult = matrix43.toJSON();
            expect(JSON.stringify(toJSONResult)).assertEqual('[[1],[2],[3],[4],[5],[6]]');
        });
        it('maxColumn_1', 0, () => {
            // maxColumn
            let matrix45 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            let maxColumnResult = matrix45.maxColumn(1);
            expect(maxColumnResult).assertEqual(5);
        });
        it('maxColumn_2', 0, () => {
            // maxColumn
            let matrix45 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            let maxColumnResult = matrix45.maxColumn(0);
            expect(maxColumnResult).assertEqual(4);
        });
        it('maxColumn_3', 0, () => {
            // maxColumn
            let matrix45 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            let maxColumnResult = matrix45.maxColumn(2);
            expect(maxColumnResult).assertEqual(6);
        });
        it('maxColumn_4', 0, () => {
            // maxColumn
            let matrix45 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            try {
                let maxColumnResult = matrix45.maxColumn(3);
            }
            catch (e) {
                expect(e.message).assertEqual('Column index out of range');
            }
        });
        it('maxColumn_5', 0, () => {
            // maxColumn
            let matrix45 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let maxColumnResult = matrix45.maxColumn(1);
            expect(maxColumnResult).assertEqual(8);
        });
        it('maxColumnIndex_1', 0, () => {
            // maxColumnIndex
            let matrix46 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            let maxColumnIndexResult = matrix46.maxColumnIndex(0);
            expect(JSON.stringify(maxColumnIndexResult)).assertEqual('[1,0]');
        });
        it('maxColumnIndex_2', 0, () => {
            // maxColumnIndex
            let matrix46 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            let maxColumnIndexResult = matrix46.maxColumnIndex(1);
            expect(JSON.stringify(maxColumnIndexResult)).assertEqual('[1,1]');
        });
        it('maxColumnIndex_3', 0, () => {
            // maxColumnIndex
            let matrix46 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            let maxColumnIndexResult = matrix46.maxColumnIndex(2);
            expect(JSON.stringify(maxColumnIndexResult)).assertEqual('[1,2]');
        });
        it('maxColumnIndex_4', 0, () => {
            // maxColumnIndex
            let matrix46 = new Matrix([[1, 2, 3]]);
            let maxColumnIndexResult = matrix46.maxColumnIndex(0);
            expect(JSON.stringify(maxColumnIndexResult)).assertEqual('[0,0]');
        });
        it('maxColumnIndex_5', 0, () => {
            // maxColumnIndex
            let matrix46 = new Matrix([[1, 2], [3, 4], [5, 6]]);
            let maxColumnIndexResult = matrix46.maxColumnIndex(0);
            expect(JSON.stringify(maxColumnIndexResult)).assertEqual('[2,0]');
        });
        it('maxRow_1', 0, () => {
            // maxRow
            let matrix47 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            let maxRowResult = matrix47.maxRow(1);
            expect(maxRowResult).assertEqual(6);
        });
        it('maxRow_2', 0, () => {
            // maxRow
            let matrix47 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            let maxRowResult = matrix47.maxRow(0);
            expect(maxRowResult).assertEqual(3);
        });
        it('maxRow_3', 0, () => {
            // maxRow
            let matrix47 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            try {
                let maxRowResult = matrix47.maxRow(2);
            }
            catch (e) {
                expect(e.message).assertEqual('Row index out of range');
            }
        });
        it('maxRow_4', 0, () => {
            // maxRow
            let matrix47 = new Matrix([[1, 2], [3, 4], [5, 6]]);
            let maxRowResult = matrix47.maxRow(1);
            expect(maxRowResult).assertEqual(4);
        });
        it('maxRow_5', 0, () => {
            // maxRow
            let matrix47 = new Matrix([[1, 2], [3, 4], [5, 6]]);
            let maxRowResult = matrix47.maxRow(2);
            expect(maxRowResult).assertEqual(6);
        });
        it('maxRowIndex_1', 0, () => {
            // maxRowIndex
            let matrix48 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            let maxRowIndexResult = matrix48.maxRowIndex(1);
            expect(JSON.stringify(maxRowIndexResult)).assertEqual('[1,2]');
        });
        it('maxRowIndex_2', 0, () => {
            // maxRowIndex
            let matrix48 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            let maxRowIndexResult = matrix48.maxRowIndex(0);
            expect(JSON.stringify(maxRowIndexResult)).assertEqual('[0,2]');
        });
        it('maxRowIndex_3', 0, () => {
            // maxRowIndex
            let matrix48 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            try {
                let maxRowIndexResult = matrix48.maxRowIndex(2);
            }
            catch (e) {
                expect(e.message).assertEqual('Row index out of range');
            }
        });
        it('maxRowIndex_4', 0, () => {
            // maxRowIndex
            let matrix48 = new Matrix([[1, 2, 3]]);
            let maxRowIndexResult = matrix48.maxRowIndex(0);
            expect(JSON.stringify(maxRowIndexResult)).assertEqual('[0,2]');
        });
        it('maxRowIndex_5', 0, () => {
            // maxRowIndex
            let matrix48 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let maxRowIndexResult = matrix48.maxRowIndex(1);
            expect(JSON.stringify(maxRowIndexResult)).assertEqual('[1,2]');
        });
        it('minColumn_1', 0, () => {
            // minColumn
            let matrix49 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            let minColumnResult = matrix49.minColumn(0);
            expect(minColumnResult).assertEqual(1);
        });
        it('minColumn_2', 0, () => {
            // minColumn
            let matrix49 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            let minColumnResult = matrix49.minColumn(1);
            expect(minColumnResult).assertEqual(2);
        });
        it('minColumn_3', 0, () => {
            // minColumn
            let matrix49 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            let minColumnResult = matrix49.minColumn(2);
            expect(minColumnResult).assertEqual(3);
        });
        it('minColumn_4', 0, () => {
            // minColumn
            let matrix49 = new Matrix([[1, 2, 3]]);
            let minColumnResult = matrix49.minColumn(0);
            expect(minColumnResult).assertEqual(1);
        });
        it('minColumn_5', 0, () => {
            // minColumn
            let matrix49 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let minColumnResult = matrix49.minColumn(0);
            expect(minColumnResult).assertEqual(1);
        });
        it('minColumnIndex_1', 0, () => {
            // minColumnIndex
            let matrix50 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            let minColumnIndexResult = matrix50.minColumnIndex(0);
            expect(JSON.stringify(minColumnIndexResult)).assertEqual('[0,0]');
        });
        it('minColumnIndex_2', 0, () => {
            // minColumnIndex
            let matrix50 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            let minColumnIndexResult = matrix50.minColumnIndex(1);
            expect(JSON.stringify(minColumnIndexResult)).assertEqual('[0,1]');
        });
        it('minColumnIndex_3', 0, () => {
            // minColumnIndex
            let matrix50 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            let minColumnIndexResult = matrix50.minColumnIndex(2);
            expect(JSON.stringify(minColumnIndexResult)).assertEqual('[0,2]');
        });
        it('minColumnIndex_4', 0, () => {
            // minColumnIndex
            let matrix50 = new Matrix([[1, 2, 3], [4, 5, 6], [-1, -2, -3]]);
            let minColumnIndexResult = matrix50.minColumnIndex(0);
            expect(JSON.stringify(minColumnIndexResult)).assertEqual('[2,0]');
        });
        it('minColumnIndex_5', 0, () => {
            // minColumnIndex
            let matrix50 = new Matrix([[1, 2, 3]]);
            let minColumnIndexResult = matrix50.minColumnIndex(0);
            expect(JSON.stringify(minColumnIndexResult)).assertEqual('[0,0]');
        });
        it('minIndex_1', 0, () => {
            // minIndex
            let matrix51 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            let minIndexResult = matrix51.minIndex();
            expect(JSON.stringify(minIndexResult)).assertEqual('[0,0]');
        });
        it('minIndex_2', 0, () => {
            // minIndex
            let matrix51 = new Matrix([[3, 4], [1, 2], [5, 6]]);
            let minIndexResult = matrix51.minIndex();
            expect(JSON.stringify(minIndexResult)).assertEqual('[1,0]');
        });
        it('minIndex_3', 0, () => {
            // minIndex
            let matrix51 = new Matrix([[9, 8], [7, 6], [5, 4]]);
            let minIndexResult = matrix51.minIndex();
            expect(JSON.stringify(minIndexResult)).assertEqual('[2,1]');
        });
        it('minIndex_4', 0, () => {
            // minIndex
            let matrix51 = new Matrix([[9], [8], [7]]);
            let minIndexResult = matrix51.minIndex();
            expect(JSON.stringify(minIndexResult)).assertEqual('[2,0]');
        });
        it('minIndex_5', 0, () => {
            // minIndex
            let matrix51 = new Matrix([[1, 2, 3]]);
            let minIndexResult = matrix51.minIndex();
            expect(JSON.stringify(minIndexResult)).assertEqual('[0,0]');
        });
        it('minRow_1', 0, () => {
            // minRow
            let matrix52 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            let minRowResult = matrix52.minRow(0);
            expect(minRowResult).assertEqual(1);
        });
        it('minRow_2', 0, () => {
            // minRow
            let matrix52 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            let minRowResult = matrix52.minRow(1);
            expect(minRowResult).assertEqual(4);
        });
        it('minRow_3', 0, () => {
            // minRow
            let matrix52 = new Matrix([[1, 2], [3, 4], [5, 6]]);
            let minRowResult = matrix52.minRow(2);
            expect(minRowResult).assertEqual(5);
        });
        it('minRow_4', 0, () => {
            // minRow
            let matrix52 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            try {
                let minRowResult = matrix52.minRow(2);
            }
            catch (e) {
                expect(e.message).assertEqual('Row index out of range');
            }
        });
        it('minRow_5', 0, () => {
            // minRow
            let matrix52 = new Matrix([[1, 2, 3], [-4, -5, -6]]);
            let minRowResult = matrix52.minRow(1);
            expect(minRowResult).assertEqual(-6);
        });
        it('minRowIndex_1', 0, () => {
            // minRowIndex
            let matrix53 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            let minRowIndexResult = matrix53.minRowIndex(0);
            expect(JSON.stringify(minRowIndexResult)).assertEqual('[0,0]');
        });
        it('minRowIndex_2', 0, () => {
            // minRowIndex
            let matrix53 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            let minRowIndexResult = matrix53.minRowIndex(1);
            expect(JSON.stringify(minRowIndexResult)).assertEqual('[1,0]');
        });
        it('minRowIndex_3', 0, () => {
            // minRowIndex
            let matrix53 = new Matrix([[1, 2], [3, 4], [-5, 6]]);
            let minRowIndexResult = matrix53.minRowIndex(2);
            expect(JSON.stringify(minRowIndexResult)).assertEqual('[2,0]');
        });
        it('minRowIndex_4', 0, () => {
            // minRowIndex
            let matrix53 = new Matrix([[1, 2, -3], [4, 5, 6]]);
            let minRowIndexResult = matrix53.minRowIndex(0);
            expect(JSON.stringify(minRowIndexResult)).assertEqual('[0,2]');
        });
        it('minRowIndex_5', 0, () => {
            // minRowIndex
            let matrix53 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            try {
                let minRowIndexResult = matrix53.minRowIndex(2);
            }
            catch (e) {
                expect(e.message).assertEqual('Row index out of range');
            }
        });
        it('modulus_1', 0, () => {
            // modulus
            let matrix1 = new Matrix([[4, 9], [16, 25]]);
            let modulusResult = matrix1.modulus(1);
            expect(JSON.stringify(modulusResult)).assertEqual('[[0,0],[0,0]]');
        });
        it('modulus_2', 0, () => {
            // modulus
            let matrix1 = new Matrix([[4, 9], [16, 25]]);
            let modulusResult = matrix1.modulus(2);
            expect(JSON.stringify(modulusResult)).assertEqual('[[0,1],[0,1]]');
        });
        it('modulus_3', 0, () => {
            // modulus
            let matrix1 = new Matrix([[4, 9], [16, 25]]);
            let modulusResult = matrix1.modulus(4);
            expect(JSON.stringify(modulusResult)).assertEqual('[[0,1],[0,1]]');
        });
        it('modulus_4', 0, () => {
            // modulus
            let matrix1 = new Matrix([[4, 9], [16, 25]]);
            let modulusResult = matrix1.modulus(-1);
            expect(JSON.stringify(modulusResult)).assertEqual('[[0,0],[0,0]]');
        });
        it('modulus_5', 0, () => {
            // modulus
            let matrix1 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            let modulusResult = matrix1.modulus(1);
            expect(JSON.stringify(modulusResult)).assertEqual('[[0,0,0],[0,0,0]]');
        });
        it('neg_1', 0, () => {
            // neg
            let matrix2 = new Matrix([[1, 2], [3, 4]]);
            let negResult = matrix2.neg();
            expect(JSON.stringify(negResult)).assertEqual('[[-1,-2],[-3,-4]]');
        });
        it('neg_2', 0, () => {
            // neg
            let matrix2 = new Matrix([[-1, -2], [-3, -4]]);
            let negResult = matrix2.neg();
            expect(JSON.stringify(negResult)).assertEqual('[[1,2],[3,4]]');
        });
        it('neg_3', 0, () => {
            // neg
            let matrix2 = new Matrix([[1, -2], [-3, 4], [5, -6]]);
            let negResult = matrix2.neg();
            expect(JSON.stringify(negResult)).assertEqual('[[-1,2],[3,-4],[-5,6]]');
        });
        it('neg_4', 0, () => {
            // neg
            let matrix2 = new Matrix([[-11, 2]]);
            let negResult = matrix2.neg();
            expect(JSON.stringify(negResult)).assertEqual('[[11,-2]]');
        });
        it('neg_5', 0, () => {
            // neg
            let matrix2 = new Matrix([[11, 2], [-13, 4]]);
            let negResult = matrix2.neg();
            expect(JSON.stringify(negResult)).assertEqual('[[-11,-2],[13,-4]]');
        });
        it('negate_1', 0, () => {
            // negate
            let matrix3 = new Matrix([[1, 2], [3, 4]]);
            matrix3.negate();
            expect(JSON.stringify(matrix3)).assertEqual('[[-1,-2],[-3,-4]]');
        });
        it('negate_2', 0, () => {
            // negate
            let matrix3 = new Matrix([[-1, -2], [-3, -4]]);
            matrix3.negate();
            expect(JSON.stringify(matrix3)).assertEqual('[[1,2],[3,4]]');
        });
        it('negate_3', 0, () => {
            // negate
            let matrix3 = new Matrix([[1, -2], [-3, 4], [5, -6]]);
            matrix3.negate();
            expect(JSON.stringify(matrix3)).assertEqual('[[-1,2],[3,-4],[-5,6]]');
        });
        it('negate_4', 0, () => {
            // negate
            let matrix3 = new Matrix([[-11, 2]]);
            matrix3.negate();
            expect(JSON.stringify(matrix3)).assertEqual('[[11,-2]]');
        });
        it('negate_5', 0, () => {
            // negate
            let matrix3 = new Matrix([[11, 2], [-13, 4]]);
            matrix3.negate();
            expect(JSON.stringify(matrix3)).assertEqual('[[-11,-2],[13,-4]]');
        });
        it('product_1', 0, () => {
            // product
            let matrix4 = new Matrix([[1, 2], [3, 4]]);
            let productResult = matrix4.product();
            expect(productResult).assertEqual(24);
        });
        it('product_2', 0, () => {
            // product
            let matrix4 = new Matrix([[1, -2], [3, -4]]);
            let productResult = matrix4.product();
            expect(productResult).assertEqual(24);
        });
        it('product_3', 0, () => {
            // product
            let matrix5 = new Matrix([[5, 6], [7, 8]]);
            let productResult = matrix5.product();
            expect(productResult).assertEqual(1680);
        });
        it('product_4', 0, () => {
            // product
            let matrix5 = new Matrix([[-5, 6], [7, 8]]);
            let productResult = matrix5.product();
            expect(productResult).assertEqual(-1680);
        });
        it('product_5', 0, () => {
            // product
            let matrix4 = new Matrix([[-1, -2], [-3, 4]]);
            let productResult = matrix4.product();
            expect(productResult).assertEqual(-24);
        });
        it('selection_1', 0, () => {
            // selection
            let matrix6 = new Matrix([[1, 2], [3, 4], [5, 6]]);
            let selectionResult = matrix6.selection([0, 1], [1]);
            expect(JSON.stringify(selectionResult)).assertEqual('[[2],[4]]');
        });
        it('selection_2', 0, () => {
            // selection
            let matrix6 = new Matrix([[1, 2], [3, 4], [5, 6]]);
            let selectionResult = matrix6.selection([0, 1], [0]);
            expect(JSON.stringify(selectionResult)).assertEqual('[[1],[3]]');
        });
        it('selection_3', 0, () => {
            // selection
            let matrix6 = new Matrix([[1, 2], [3, 4], [5, 6]]);
            try {
                let selectionResult = matrix6.selection([0, 1], [2]);
            }
            catch (e) {
                expect(e.message).assertEqual('column indices are out of range');
            }
        });
        it('selection_4', 0, () => {
            // selection
            let matrix6 = new Matrix([[1, 2], [5, 6]]);
            let selectionResult = matrix6.selection([0, 1], [0]);
            expect(JSON.stringify(selectionResult)).assertEqual('[[1],[5]]');
        });
        it('selection_5', 0, () => {
            // selection
            let matrix6 = new Matrix([[1, 2], [5, 6]]);
            let selectionResult = matrix6.selection([0, 1], [1]);
            expect(JSON.stringify(selectionResult)).assertEqual('[[2],[6]]');
        });
        it('standardDeviation_1', 0, () => {
            // standardDeviation
            let matrix7 = new Matrix([[1, 2], [3, 4]]);
            let standardDeviationResult = matrix7.standardDeviation();
            expect(standardDeviationResult).assertEqual(1.2909944487358056);
        });
        it('standardDeviation_2', 0, () => {
            // standardDeviation
            let matrix7 = new Matrix([[1, 2]]);
            let standardDeviationResult = matrix7.standardDeviation();
            expect(standardDeviationResult).assertEqual(0.7071067811865476);
        });
        it('standardDeviation_3', 0, () => {
            // standardDeviation
            let matrix7 = new Matrix([[1, 2], [3, 4], [5, 6]]);
            let standardDeviationResult = matrix7.standardDeviation();
            expect(standardDeviationResult).assertEqual(1.8708286933869707);
        });
        it('standardDeviation_4', 0, () => {
            // standardDeviation
            let matrix7 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            let standardDeviationResult = matrix7.standardDeviation();
            expect(standardDeviationResult).assertEqual(1.8708286933869707);
        });
        it('standardDeviation_5', 0, () => {
            // standardDeviation
            let matrix7 = new Matrix([[1]]);
            let standardDeviationResult = matrix7.standardDeviation();
            expect(standardDeviationResult).assertNaN();
        });
        it('tensorProduct_1', 0, () => {
            // tensorProduct
            let matrix8 = new Matrix([[1, 2], [3, 4]]);
            let tensorProductResult = matrix8.tensorProduct(matrix8);
            expect(JSON.stringify(tensorProductResult)).assertEqual('[[1,2,2,4],[3,4,6,8],[3,6,4,8],[9,12,12,16]]');
        });
        it('tensorProduct_2', 0, () => {
            // tensorProduct
            let matrix8 = new Matrix([[1, 2], [3, 4]]);
            let matrix9 = new Matrix([[1, 2]]);
            let tensorProductResult = matrix8.tensorProduct(matrix9);
            expect(JSON.stringify(tensorProductResult)).assertEqual('[[1,2,2,4],[3,6,4,8]]');
        });
        it('tensorProduct_3', 0, () => {
            // tensorProduct
            let matrix8 = new Matrix([[1, 2], [3, 4], [5, 6]]);
            let matrix9 = new Matrix([[1, 2]]);
            let tensorProductResult = matrix8.tensorProduct(matrix9);
            expect(JSON.stringify(tensorProductResult)).assertEqual('[[1,2,2,4],[3,6,4,8],[5,10,6,12]]');
        });
        it('tensorProduct_4', 0, () => {
            // tensorProduct
            let matrix8 = new Matrix([[1, 2], [3, 4]]);
            let matrix9 = new Matrix([[-1, -2]]);
            let tensorProductResult = matrix8.tensorProduct(matrix9);
            expect(JSON.stringify(tensorProductResult)).assertEqual('[[-1,-2,-2,-4],[-3,-6,-4,-8]]');
        });
        it('tensorProduct_5', 0, () => {
            // tensorProduct
            let matrix8 = new Matrix([[3, 4], [1, 2]]);
            let matrix9 = new Matrix([[1, 2]]);
            let tensorProductResult = matrix8.tensorProduct(matrix9);
            expect(JSON.stringify(tensorProductResult)).assertEqual('[[3,6,4,8],[1,2,2,4]]');
        });
        it('trace_1', 0, () => {
            // trace
            let matrix9 = new Matrix([[1, 2], [3, 4]]);
            let traceResult = matrix9.trace();
            expect(traceResult).assertEqual(5);
        });
        it('trace_2', 0, () => {
            // trace
            let matrix9 = new Matrix([[1, 2]]);
            let traceResult = matrix9.trace();
            expect(traceResult).assertEqual(1);
        });
        it('trace_3', 0, () => {
            // trace
            let matrix9 = new Matrix([[1, 2], [3, 4], [5, 6]]);
            let traceResult = matrix9.trace();
            expect(traceResult).assertEqual(5);
        });
        it('trace_4', 0, () => {
            // trace
            let matrix9 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            let traceResult = matrix9.trace();
            expect(traceResult).assertEqual(6);
        });
        it('trace_5', 0, () => {
            // trace
            let matrix9 = new Matrix([[1, 2, 3]]);
            let traceResult = matrix9.trace();
            expect(traceResult).assertEqual(1);
        });
        it('variance_1', 0, () => {
            // variance
            let matrix10 = new Matrix([[1, 2], [3, 4]]);
            let varianceResult = matrix10.variance();
            expect(varianceResult).assertEqual(1.6666666666666667);
        });
        it('variance_2', 0, () => {
            // variance
            let matrix10 = new Matrix([[1, 2], [3, 4], [5, 6]]);
            let varianceResult = matrix10.variance();
            expect(varianceResult).assertEqual(3.5);
        });
        it('variance_3', 0, () => {
            // variance
            let matrix10 = new Matrix([[1, 2]]);
            let varianceResult = matrix10.variance();
            expect(varianceResult).assertEqual(0.5);
        });
        it('variance_4', 0, () => {
            // variance
            let matrix10 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            let varianceResult = matrix10.variance();
            expect(varianceResult).assertEqual(3.5);
        });
        it('variance_5', 0, () => {
            // variance
            let matrix10 = new Matrix([[6, 4, 5], [3, 2, 1]]);
            let varianceResult = matrix10.variance();
            expect(varianceResult).assertEqual(3.5);
        });
        it('Matrix.identity_1', 0, () => {
            // identity
            let identityMatrix = Matrix.identity(3);
            expect(JSON.stringify(identityMatrix)).assertEqual('[[1,0,0],[0,1,0],[0,0,1]]');
        });
        it('Matrix.identity_2', 0, () => {
            // identity
            let identityMatrix = Matrix.identity(2);
            expect(JSON.stringify(identityMatrix)).assertEqual('[[1,0],[0,1]]');
        });
        it('Matrix.identity_3', 0, () => {
            // identity
            let identityMatrix = Matrix.identity(1);
            expect(JSON.stringify(identityMatrix)).assertEqual('[[1]]');
        });
        it('Matrix.identity_4', 0, () => {
            // identity
            let identityMatrix = Matrix.identity(4);
            expect(JSON.stringify(identityMatrix)).assertEqual('[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]]');
        });
        it('Matrix.identity_5', 0, () => {
            // identity
            let identityMatrix = Matrix.identity(0);
            expect(JSON.stringify(identityMatrix)).assertEqual('[]');
        });
        it('scaleRows_1', 0, () => {
            // scaleRows
            let matrix25 = new Matrix([[1, 2], [3, 4]]);
            let matrix = matrix25.scaleRows();
            expect(JSON.stringify(matrix)).assertEqual('[[0,1],[0,1]]');
        });
        it('scaleRows_2', 0, () => {
            // scaleRows
            let matrix25 = new Matrix([[1, 2], [3, 4], [5, 6]]);
            let matrix = matrix25.scaleRows();
            expect(JSON.stringify(matrix)).assertEqual('[[0,1],[0,1],[0,1]]');
        });
        it('scaleRows_3', 0, () => {
            // scaleRows
            let matrix25 = new Matrix([[1, 2]]);
            let matrix = matrix25.scaleRows();
            expect(JSON.stringify(matrix)).assertEqual('[[0,1]]');
        });
        it('scaleRows_4', 0, () => {
            // scaleRows
            let matrix25 = new Matrix([[-1, -2], [-3, -4]]);
            let matrix = matrix25.scaleRows();
            expect(JSON.stringify(matrix)).assertEqual('[[1,0],[1,0]]');
        });
        it('scaleRows_5', 0, () => {
            // scaleRows
            let matrix25 = new Matrix([[1, 2], [3, 4]]);
            let option: IScaleOptions = {
                min: 1,
                max: 5
            };
            let matrix = matrix25.scaleRows(option);
            expect(JSON.stringify(matrix)).assertEqual('[[1,5],[1,5]]');
        });
        it('mmulStrassen_1', 0, () => {
            // mmulStrassen
            let matrix35 = new Matrix([[1, 2], [3, 4]]);
            let matrix36 = new Matrix([[5, 6], [7, 8]]);
            let mmulStrassenResult = matrix35.mmulStrassen(matrix36);
            expect(JSON.stringify(mmulStrassenResult)).assertEqual('[[19,22],[43,50]]');
        });
        it('mmulStrassen_2', 0, () => {
            // mmulStrassen
            let matrix35 = new Matrix([[1, 2], [3, 4]]);
            let matrix36 = new Matrix([[5, 6], [7, 8]]);
            let mmulStrassenResult = matrix36.mmulStrassen(matrix35);
            expect(JSON.stringify(mmulStrassenResult)).assertEqual('[[23,34],[31,46]]');
        });
        it('mmulStrassen_3', 0, () => {
            // mmulStrassen
            let matrix35 = new Matrix([[1, -2], [3, -4]]);
            let matrix36 = new Matrix([[5, 6], [7, 8]]);
            let mmulStrassenResult = matrix35.mmulStrassen(matrix36);
            expect(JSON.stringify(mmulStrassenResult)).assertEqual('[[-9,-10],[-13,-14]]');
        });
        it('mmulStrassen_4', 0, () => {
            // mmulStrassen
            let matrix35 = new Matrix([[1, 2], [3, 4]]);
            let matrix36 = new Matrix([[-5, 6], [-7, 8]]);
            let mmulStrassenResult = matrix36.mmulStrassen(matrix35);
            expect(JSON.stringify(mmulStrassenResult)).assertEqual('[[13,14],[17,18]]');
        });
        it('mmulStrassen_5', 0, () => {
            // mmulStrassen
            let matrix35 = new Matrix([[1, 2], [3, 4]]);
            let matrix36 = new Matrix([[5, 6]]);
            let mmulStrassenResult = matrix35.mmulStrassen(matrix36);
            expect(JSON.stringify(mmulStrassenResult)).assertEqual('[[5,6],[15,18]]');
        });
        it('strassen2x2_1', 0, () => {
            // strassen2x2
            let matrix37 = new Matrix([[1, 2], [3, 4]]);
            let matrix38 = new Matrix([[5, 6], [7, 8]]);
            let strassen2x2Result = matrix37.strassen2x2(matrix38);
            expect(JSON.stringify(strassen2x2Result)).assertEqual("[[19,22],[43,50]]");
        });
        it('strassen2x2_2', 0, () => {
            // strassen2x2
            let matrix37 = new Matrix([[1, 2], [3, 4]]);
            let matrix38 = new Matrix([[5, 6], [7, 8]]);
            let strassen2x2Result = matrix38.strassen2x2(matrix37);
            expect(JSON.stringify(strassen2x2Result)).assertEqual('[[23,34],[31,46]]');
        });
        it('strassen2x2_3', 0, () => {
            // strassen2x2
            let matrix37 = new Matrix([[1, -2], [3, -4]]);
            let matrix38 = new Matrix([[5, 6], [7, 8]]);
            let strassen2x2Result = matrix37.strassen2x2(matrix38);
            expect(JSON.stringify(strassen2x2Result)).assertEqual('[[-9,-10],[-13,-14]]');
        });
        it('strassen2x2_4', 0, () => {
            // strassen2x2
            let matrix37 = new Matrix([[1, 2], [3, 4]]);
            let matrix38 = new Matrix([[-5, 6], [-7, 8]]);
            let strassen2x2Result = matrix37.strassen2x2(matrix38);
            expect(JSON.stringify(strassen2x2Result)).assertEqual('[[-19,22],[-43,50]]');
        });
        it('strassen2x2_5', 0, () => {
            // strassen2x2
            let matrix37 = new Matrix([[1, 2], [3, 4]]);
            let matrix38 = new Matrix([[12, 8], [3, 1]]);
            let strassen2x2Result = matrix37.strassen2x2(matrix38);
            expect(JSON.stringify(strassen2x2Result)).assertEqual('[[18,10],[48,28]]');
        });
        it('strassen3x3_1', 0, () => {
            // strassen3x3
            let matrix39 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let matrix40 = new Matrix([[10, 11, 12], [13, 14, 15], [16, 17, 18]]);
            let strassen3x3Result = matrix39.strassen3x3(matrix40);
            expect(JSON.stringify(strassen3x3Result)).assertEqual('[[84,90,96],[201,216,231],[318,342,366]]');
        });
        it('strassen3x3_2', 0, () => {
            // strassen3x3
            let matrix39 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let matrix40 = new Matrix([[10, 11, 12], [13, 14, 15], [16, 17, 18]]);
            let strassen3x3Result = matrix40.strassen3x3(matrix39);
            expect(JSON.stringify(strassen3x3Result)).assertEqual('[[138,171,204],[174,216,258],[210,261,312]]');
        });
        it('strassen3x3_3', 0, () => {
            // strassen3x3
            let matrix39 = new Matrix([[1, -2, 3], [-4, 5, 6], [-7, 8, 9]]);
            let matrix40 = new Matrix([[10, 11, 12], [13, 14, 15], [16, 17, 18]]);
            let strassen3x3Result = matrix39.strassen3x3(matrix40);
            expect(JSON.stringify(strassen3x3Result)).assertEqual('[[32,34,36],[121,128,135],[178,188,198]]');
        });
        it('strassen3x3_4', 0, () => {
            // strassen3x3
            let matrix39 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let matrix40 = new Matrix([[-10, 11, 12], [13, -14, 15], [16, 17, -18]]);
            let strassen3x3Result = matrix40.strassen3x3(matrix39);
            expect(JSON.stringify(strassen3x3Result)).assertEqual('[[118,131,144],[62,76,90],[-42,-27,-12]]');
        });
        it('strassen3x3_5', 0, () => {
            // strassen3x3
            let matrix39 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let matrix40 = new Matrix([[10, 1, -2], [7, 6, 3], [11, 2, 5]]);
            let strassen3x3Result = matrix40.strassen3x3(matrix39);
            expect(JSON.stringify(strassen3x3Result)).assertEqual('[[0,9,18],[52,68,84],[54,72,90]]');
        });
        it('Matrix.isEmpty_1', 0, () => {
            // isEmpty
            let matrix = new Matrix([]);
            let flag = matrix.isEmpty();
            expect(flag).assertEqual(true);
        });
        it('Matrix.isEmpty_2', 0, () => {
            // isEmpty
            let matrix = new Matrix([[1]]);
            let flag = matrix.isEmpty();
            expect(flag).assertEqual(false);
        });
        it('Matrix.isEmpty_3', 0, () => {
            // isEmpty
            let matrix = new Matrix([[1], [2]]);
            let flag = matrix.isEmpty();
            expect(flag).assertEqual(false);
        });
        it('Matrix.isEmpty_4', 0, () => {
            // isEmpty
            let matrix = new Matrix([[1], [2], [3]]);
            let flag = matrix.isEmpty();
            expect(flag).assertEqual(false);
        });
        it('Matrix.isEmpty_5', 0, () => {
            // isEmpty
            let matrix = new Matrix([[], []]);
            let flag = matrix.isEmpty();
            expect(flag).assertEqual(true);
        });
    });
}
