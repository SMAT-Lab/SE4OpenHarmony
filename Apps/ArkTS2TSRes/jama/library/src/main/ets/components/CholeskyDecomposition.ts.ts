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
/* Generated from Java with JSweet 2.0.0 - http://www.jsweet.org */
import { Matrix } from './Matrix';
/**
 * Cholesky algorithm for symmetric and positive definite matrix.
 * Structure to access L and isspd flag.
 * @param  {Matrix} Arg   Square, symmetric matrix.
 * @class
 */
export class CholeskyDecomposition {
    /**
     * Array for internal storage of decomposition.
     * @serial internal array storage.
     */
    /*private*/ L: number[][];
    /**
     * Row and column dimension (square matrix).
     * @serial matrix dimension.
     */
    /*private*/ n: number;
    /**
     * Symmetric and positive definite flag.
     * @serial is symmetric and positive definite flag.
     */
    /*private*/ isspd: boolean;
    public constructor(Arg: Matrix) {
        this.L = null;
        this.n = 0;
        this.isspd = false;
        let A: number[][] = Arg.getArray();
        this.n = Arg.getRowDimension();
        this.L = <any>(function (dims) { let allocate = function (dims) { if (dims.length == 0) {
            return 0;
        }
        else {
            let array = [];
            for (let i = 0; i < dims[0]; i++) {
                array.push(allocate(dims.slice(1)));
            }
            return array;
        } }; return allocate(dims); })([this.n, this.n]);
        this.isspd = (Arg.getColumnDimension() === this.n);
        for (let j: number = 0; j < this.n; j++) {
            let Lrowj: number[] = this.L[j];
            let d: number = 0.0;
            for (let k: number = 0; k < j; k++) {
                let Lrowk: number[] = this.L[k];
                let s: number = 0.0;
                for (let i: number = 0; i < k; i++) {
                    s += Lrowk[i] * Lrowj[i];
                }
                ;
                Lrowj[k] = s = (A[j][k] - s) / this.L[k][k];
                d = d + s * s;
                this.isspd = ((lhs, rhs) => lhs && rhs)(this.isspd, (A[k][j] === A[j][k]));
            }
            ;
            d = A[j][j] - d;
            this.isspd = ((lhs, rhs) => lhs && rhs)(this.isspd, (d > 0.0));
            this.L[j][j] = Math.sqrt(Math.max(d, 0.0));
            for (let k: number = j + 1; k < this.n; k++) {
                this.L[j][k] = 0.0;
            }
            ;
        }
        ;
    }
    /**
     * Is the matrix symmetric and positive definite?
     * @return     {boolean} true if A is symmetric and positive definite.
     */
    public isSPD(): boolean {
        return this.isspd;
    }
    /**
     * Return triangular factor.
     * @return     {Matrix} L
     */
    public getL(): Matrix {
        return new Matrix(this.L, this.n, this.n);
    }
    /**
     * Solve A*X = B
     * @param  {Matrix} B   A Matrix with as many rows as A and any number of columns.
     * @return     {Matrix} X so that L*L'*X = B
     * @exception  IllegalArgumentException  Matrix row dimensions must agree.
     * @exception  RuntimeException  Matrix is not symmetric positive definite.
     */
    public solve(B: Matrix): Matrix {
        if (B.getRowDimension() !== this.n) {
            throw Object.defineProperty(new Error("Matrix row dimensions must agree."), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
        }
        if (!this.isspd) {
            throw Object.defineProperty(new Error("Matrix is not symmetric positive definite."), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
        }
        let X: number[][] = B.getArrayCopy();
        let nx: number = B.getColumnDimension();
        for (let k: number = 0; k < this.n; k++) {
            for (let j: number = 0; j < nx; j++) {
                for (let i: number = 0; i < k; i++) {
                    X[k][j] -= X[i][j] * this.L[k][i];
                }
                ;
                X[k][j] /= this.L[k][k];
            }
            ;
        }
        ;
        for (let k: number = this.n - 1; k >= 0; k--) {
            for (let j: number = 0; j < nx; j++) {
                for (let i: number = k + 1; i < this.n; i++) {
                    X[k][j] -= X[i][j] * this.L[i][k];
                }
                ;
                X[k][j] /= this.L[k][k];
            }
            ;
        }
        ;
        return new Matrix(X, this.n, nx);
    }
    static serialVersionUID: number = 1;
}
CholeskyDecomposition["__class"] = "Jama.CholeskyDecomposition";
CholeskyDecomposition["__interfaces"] = ["java.io.Serializable"];
