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
 * LU Decomposition
 * Structure to access L, U and piv.
 * @param  {Matrix} A Rectangular matrix
 * @class
 */
export class LUDecomposition {
    /**
     * Array for internal storage of decomposition.
     * @serial internal array storage.
     */
    /* private */
    LU: number[][];
    /**
     * Row and column dimensions, and pivot sign.
     * @serial column dimension.
     * @serial row dimension.
     * @serial pivot sign.
     */
    /* private */
    m: number;
    /**
     * Row and column dimensions, and pivot sign.
     * @serial column dimension.
     * @serial row dimension.
     * @serial pivot sign.
     */
    /* private */
    n: number;
    /**
     * Row and column dimensions, and pivot sign.
     * @serial column dimension.
     * @serial row dimension.
     * @serial pivot sign.
     */
    /* private */
    pivsign: number;
    /**
     * Internal storage of pivot vector.
     * @serial pivot vector.
     */
    /* private */
    piv: number[];
    public constructor(A: Matrix) {
        this.LU = null;
        this.m = 0;
        this.n = 0;
        this.pivsign = 0;
        this.piv = null;
        this.LU = A.getArrayCopy();
        this.m = A.getRowDimension();
        this.n = A.getColumnDimension();
        this.piv = (s => { let a = []; while (s-- > 0)
            a.push(0); return a; })(this.m);
        for (let i: number = 0; i < this.m; i++) {
            this.piv[i] = i;
        }
        ;
        this.pivsign = 1;
        let LUrowi: number[];
        let LUcolj: number[] = (s => { let a = []; while (s-- > 0)
            a.push(0); return a; })(this.m);
        for (let j: number = 0; j < this.n; j++) {
            for (let i: number = 0; i < this.m; i++) {
                LUcolj[i] = this.LU[i][j];
            }
            ;
            for (let i: number = 0; i < this.m; i++) {
                LUrowi = this.LU[i];
                let kmax: number = Math.min(i, j);
                let s: number = 0.0;
                for (let k: number = 0; k < kmax; k++) {
                    s += LUrowi[k] * LUcolj[k];
                }
                ;
                LUrowi[j] = LUcolj[i] -= s;
            }
            ;
            let p: number = j;
            for (let i: number = j + 1; i < this.m; i++) {
                if (Math.abs(LUcolj[i]) > Math.abs(LUcolj[p])) {
                    p = i;
                }
            }
            ;
            if (p !== j) {
                for (let k: number = 0; k < this.n; k++) {
                    let t: number = this.LU[p][k];
                    this.LU[p][k] = this.LU[j][k];
                    this.LU[j][k] = t;
                }
                ;
                let k: number = this.piv[p];
                this.piv[p] = this.piv[j];
                this.piv[j] = k;
                this.pivsign = -this.pivsign;
            }
            if (((lhs, rhs) => lhs && rhs)(j < this.m, this.LU[j][j] !== 0.0)) {
                for (let i: number = j + 1; i < this.m; i++) {
                    this.LU[i][j] /= this.LU[j][j];
                }
                ;
            }
        }
        ;
    }
    /**
     * Is the matrix nonsingular?
     * @return     {boolean} true if U, and hence A, is nonsingular.
     */
    public isNonsingular(): boolean {
        for (let j: number = 0; j < this.n; j++) {
            if (this.LU[j][j] === 0)
                return false;
        }
        ;
        return true;
    }
    /**
     * Return lower triangular factor
     * @return     {Matrix} L
     */
    public getL(): Matrix {
        let X: Matrix = new Matrix(this.m, this.n);
        let L: number[][] = X.getArray();
        for (let i: number = 0; i < this.m; i++) {
            for (let j: number = 0; j < this.n; j++) {
                if (i > j) {
                    L[i][j] = this.LU[i][j];
                }
                else if (i === j) {
                    L[i][j] = 1.0;
                }
                else {
                    L[i][j] = 0.0;
                }
            }
            ;
        }
        ;
        return X;
    }
    /**
     * Return upper triangular factor
     * @return     {Matrix} U
     */
    public getU(): Matrix {
        let X: Matrix = new Matrix(this.n, this.n);
        let U: number[][] = X.getArray();
        for (let i: number = 0; i < this.n; i++) {
            for (let j: number = 0; j < this.n; j++) {
                if (i <= j) {
                    U[i][j] = this.LU[i][j];
                }
                else {
                    U[i][j] = 0.0;
                }
            }
            ;
        }
        ;
        return X;
    }
    /**
     * Return pivot permutation vector
     * @return     {Array} piv
     */
    public getPivot(): number[] {
        let p: number[] = (s => { let a = []; while (s-- > 0)
            a.push(0); return a; })(this.m);
        for (let i: number = 0; i < this.m; i++) {
            p[i] = this.piv[i];
        }
        ;
        return p;
    }
    /**
     * Return pivot permutation vector as a one-dimensional double array
     * @return     {Array} (double) piv
     */
    public getDoublePivot(): number[] {
        let vals: number[] = (s => { let a = []; while (s-- > 0)
            a.push(0); return a; })(this.m);
        for (let i: number = 0; i < this.m; i++) {
            vals[i] = <number>this.piv[i];
        }
        ;
        return vals;
    }
    /**
     * Determinant
     * @return     {number} det(A)
     * @exception  IllegalArgumentException  Matrix must be square
     */
    public det(): number {
        if (this.m !== this.n) {
            throw Object.defineProperty(new Error("Matrix must be square."), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
        }
        let d: number = <number>this.pivsign;
        for (let j: number = 0; j < this.n; j++) {
            d *= this.LU[j][j];
        }
        ;
        return d;
    }
    /**
     * Solve A*X = B
     * @param  {Matrix} B   A Matrix with as many rows as A and any number of columns.
     * @return     {Matrix} X so that L*U*X = B(piv,:)
     * @exception  IllegalArgumentException Matrix row dimensions must agree.
     * @exception  RuntimeException  Matrix is singular.
     */
    public solve(B: Matrix): Matrix {
        if (B.getRowDimension() !== this.m) {
            throw Object.defineProperty(new Error("Matrix row dimensions must agree."), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
        }
        if (!this.isNonsingular()) {
            throw Object.defineProperty(new Error("Matrix is singular."), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
        }
        let nx: number = B.getColumnDimension();
        let Xmat: Matrix = B.getMatrix$int_A$int$int(this.piv, 0, nx - 1);
        let X: number[][] = Xmat.getArray();
        for (let k: number = 0; k < this.n; k++) {
            for (let i: number = k + 1; i < this.n; i++) {
                for (let j: number = 0; j < nx; j++) {
                    X[i][j] -= X[k][j] * this.LU[i][k];
                }
                ;
            }
            ;
        }
        ;
        for (let k: number = this.n - 1; k >= 0; k--) {
            for (let j: number = 0; j < nx; j++) {
                X[k][j] /= this.LU[k][k];
            }
            ;
            for (let i: number = 0; i < k; i++) {
                for (let j: number = 0; j < nx; j++) {
                    X[i][j] -= X[k][j] * this.LU[i][k];
                }
                ;
            }
            ;
        }
        ;
        return Xmat;
    }
    static serialVersionUID: number = 1;
}
LUDecomposition["__class"] = "Jama.LUDecomposition";
LUDecomposition["__interfaces"] = ["java.io.Serializable"];
