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
import { Maths } from './util/Maths';
import { Matrix } from './Matrix';
/**
 * QR Decomposition, computed by Householder reflections.
 * Structure to access R and the Householder vectors and compute Q.
 * @param {Matrix} A    Rectangular matrix
 * @class
 */
export class QRDecomposition {
    /**
     * Array for internal storage of decomposition.
     * @serial internal array storage.
     */
    /* private */
    QR: number[][];
    /**
     * Row and column dimensions.
     * @serial column dimension.
     * @serial row dimension.
     */
    /* private */
    m: number;
    /**
     * Row and column dimensions.
     * @serial column dimension.
     * @serial row dimension.
     */
    /* private */
    n: number;
    /**
     * Array for internal storage of diagonal of R.
     * @serial diagonal of R.
     */
    /* private */
    Rdiag: number[];
    public constructor(A: Matrix) {
        this.QR = null;
        this.m = 0;
        this.n = 0;
        this.Rdiag = null;
        this.QR = A.getArrayCopy();
        this.m = A.getRowDimension();
        this.n = A.getColumnDimension();
        this.Rdiag = (s => { let a = []; while (s-- > 0)
            a.push(0); return a; })(this.n);
        for (let k: number = 0; k < this.n; k++) {
            let nrm: number = 0;
            for (let i: number = k; i < this.m; i++) {
                nrm = Maths.hypot(nrm, this.QR[i][k]);
            }
            ;
            if (nrm !== 0.0) {
                if (this.QR[k][k] < 0) {
                    nrm = -nrm;
                }
                for (let i: number = k; i < this.m; i++) {
                    this.QR[i][k] /= nrm;
                }
                ;
                this.QR[k][k] += 1.0;
                for (let j: number = k + 1; j < this.n; j++) {
                    let s: number = 0.0;
                    for (let i: number = k; i < this.m; i++) {
                        s += this.QR[i][k] * this.QR[i][j];
                    }
                    ;
                    s = -s / this.QR[k][k];
                    for (let i: number = k; i < this.m; i++) {
                        this.QR[i][j] += s * this.QR[i][k];
                    }
                    ;
                }
                ;
            }
            this.Rdiag[k] = -nrm;
        }
        ;
    }
    /**
     * Is the matrix full rank?
     * @return     {boolean} true if R, and hence A, has full rank.
     */
    public isFullRank(): boolean {
        for (let j: number = 0; j < this.n; j++) {
            if (this.Rdiag[j] === 0)
                return false;
        }
        ;
        return true;
    }
    /**
     * Return the Householder vectors
     * @return     {Matrix} Lower trapezoidal matrix whose columns define the reflections
     */
    public getH(): Matrix {
        let X: Matrix = new Matrix(this.m, this.n);
        let H: number[][] = X.getArray();
        for (let i: number = 0; i < this.m; i++) {
            for (let j: number = 0; j < this.n; j++) {
                if (i >= j) {
                    H[i][j] = this.QR[i][j];
                }
                else {
                    H[i][j] = 0.0;
                }
            }
            ;
        }
        ;
        return X;
    }
    /**
     * Return the upper triangular factor
     * @return     {Matrix} R
     */
    public getR(): Matrix {
        let X: Matrix = new Matrix(this.n, this.n);
        let R: number[][] = X.getArray();
        for (let i: number = 0; i < this.n; i++) {
            for (let j: number = 0; j < this.n; j++) {
                if (i < j) {
                    R[i][j] = this.QR[i][j];
                }
                else if (i === j) {
                    R[i][j] = this.Rdiag[i];
                }
                else {
                    R[i][j] = 0.0;
                }
            }
            ;
        }
        ;
        return X;
    }
    /**
     * Generate and return the (economy-sized) orthogonal factor
     * @return     {Matrix} Q
     */
    public getQ(): Matrix {
        let X: Matrix = new Matrix(this.m, this.n);
        let Q: number[][] = X.getArray();
        for (let k: number = this.n - 1; k >= 0; k--) {
            for (let i: number = 0; i < this.m; i++) {
                Q[i][k] = 0.0;
            }
            ;
            Q[k][k] = 1.0;
            for (let j: number = k; j < this.n; j++) {
                if (this.QR[k][k] !== 0) {
                    let s: number = 0.0;
                    for (let i: number = k; i < this.m; i++) {
                        s += this.QR[i][k] * Q[i][j];
                    }
                    ;
                    s = -s / this.QR[k][k];
                    for (let i: number = k; i < this.m; i++) {
                        Q[i][j] += s * this.QR[i][k];
                    }
                    ;
                }
            }
            ;
        }
        ;
        return X;
    }
    /**
     * Least squares solution of A*X = B
     * @param {Matrix} B    A Matrix with as many rows as A and any number of columns.
     * @return     {Matrix} X that minimizes the two norm of Q*R*X-B.
     * @exception  IllegalArgumentException  Matrix row dimensions must agree.
     * @exception  RuntimeException  Matrix is rank deficient.
     */
    public solve(B: Matrix): Matrix {
        if (B.getRowDimension() !== this.m) {
            throw Object.defineProperty(new Error("Matrix row dimensions must agree."), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
        }
        if (!this.isFullRank()) {
            throw Object.defineProperty(new Error("Matrix is rank deficient."), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
        }
        let nx: number = B.getColumnDimension();
        let X: number[][] = B.getArrayCopy();
        for (let k: number = 0; k < this.n; k++) {
            for (let j: number = 0; j < nx; j++) {
                let s: number = 0.0;
                for (let i: number = k; i < this.m; i++) {
                    s += this.QR[i][k] * X[i][j];
                }
                ;
                s = -s / this.QR[k][k];
                for (let i: number = k; i < this.m; i++) {
                    X[i][j] += s * this.QR[i][k];
                }
                ;
            }
            ;
        }
        ;
        for (let k: number = this.n - 1; k >= 0; k--) {
            for (let j: number = 0; j < nx; j++) {
                X[k][j] /= this.Rdiag[k];
            }
            ;
            for (let i: number = 0; i < k; i++) {
                for (let j: number = 0; j < nx; j++) {
                    X[i][j] -= X[k][j] * this.QR[i][k];
                }
                ;
            }
            ;
        }
        ;
        return (new Matrix(X, this.n, nx).getMatrix$int$int$int$int(0, this.n - 1, 0, nx - 1));
    }
    static serialVersionUID: number = 1;
}
QRDecomposition["__class"] = "Jama.QRDecomposition";
QRDecomposition["__interfaces"] = ["java.io.Serializable"];
