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
 * Construct the singular value decomposition
 * Structure to access U, S and V.
 * @param {Matrix} Arg    Rectangular matrix
 * @class
 */
export class SingularValueDecomposition {
    /**
     * Arrays for internal storage of U and V.
     * @serial internal storage of U.
     * @serial internal storage of V.
     */
    /* private */
    U: number[][];
    /**
     * Arrays for internal storage of U and V.
     * @serial internal storage of U.
     * @serial internal storage of V.
     */
    /* private */
    V: number[][];
    /**
     * Array for internal storage of singular values.
     * @serial internal storage of singular values.
     */
    /* private */
    s: number[];
    /**
     * Row and column dimensions.
     * @serial row dimension.
     * @serial column dimension.
     */
    /* private */
    m: number;
    /**
     * Row and column dimensions.
     * @serial row dimension.
     * @serial column dimension.
     */
    /* private */
    n: number;
    public constructor(Arg: Matrix) {
        this.U = null;
        this.V = null;
        this.s = null;
        this.m = 0;
        this.n = 0;
        let A: number[][] = Arg.getArrayCopy();
        this.m = Arg.getRowDimension();
        this.n = Arg.getColumnDimension();
        let nu: number = Math.min(this.m, this.n);
        this.s = (s => { let a = []; while (s-- > 0)
            a.push(0); return a; })(Math.min(this.m + 1, this.n));
        this.U = <any>(function (dims) { let allocate = function (dims) { if (dims.length == 0) {
            return 0;
        }
        else {
            let array = [];
            for (let i = 0; i < dims[0]; i++) {
                array.push(allocate(dims.slice(1)));
            }
            return array;
        } }; return allocate(dims); })([this.m, nu]);
        this.V = <any>(function (dims) { let allocate = function (dims) { if (dims.length == 0) {
            return 0;
        }
        else {
            let array = [];
            for (let i = 0; i < dims[0]; i++) {
                array.push(allocate(dims.slice(1)));
            }
            return array;
        } }; return allocate(dims); })([this.n, this.n]);
        let e: number[] = (s => { let a = []; while (s-- > 0)
            a.push(0); return a; })(this.n);
        let work: number[] = (s => { let a = []; while (s-- > 0)
            a.push(0); return a; })(this.m);
        let wantu: boolean = true;
        let wantv: boolean = true;
        let nct: number = Math.min(this.m - 1, this.n);
        let nrt: number = Math.max(0, Math.min(this.n - 2, this.m));
        for (let k: number = 0; k < Math.max(nct, nrt); k++) {
            if (k < nct) {
                this.s[k] = 0;
                for (let i: number = k; i < this.m; i++) {
                    this.s[k] = Maths.hypot(this.s[k], A[i][k]);
                }
                ;
                if (this.s[k] !== 0.0) {
                    if (A[k][k] < 0.0) {
                        this.s[k] = -this.s[k];
                    }
                    for (let i: number = k; i < this.m; i++) {
                        A[i][k] /= this.s[k];
                    }
                    ;
                    A[k][k] += 1.0;
                }
                this.s[k] = -this.s[k];
            }
            for (let j: number = k + 1; j < this.n; j++) {
                if (((lhs, rhs) => lhs && rhs)((k < nct), (this.s[k] !== 0.0))) {
                    let t: number = 0;
                    for (let i: number = k; i < this.m; i++) {
                        t += A[i][k] * A[i][j];
                    }
                    ;
                    t = -t / A[k][k];
                    for (let i: number = k; i < this.m; i++) {
                        A[i][j] += t * A[i][k];
                    }
                    ;
                }
                e[j] = A[k][j];
            }
            ;
            if (((lhs, rhs) => lhs && rhs)(wantu, (k < nct))) {
                for (let i: number = k; i < this.m; i++) {
                    this.U[i][k] = A[i][k];
                }
                ;
            }
            if (k < nrt) {
                e[k] = 0;
                for (let i: number = k + 1; i < this.n; i++) {
                    e[k] = Maths.hypot(e[k], e[i]);
                }
                ;
                if (e[k] !== 0.0) {
                    if (e[k + 1] < 0.0) {
                        e[k] = -e[k];
                    }
                    for (let i: number = k + 1; i < this.n; i++) {
                        e[i] /= e[k];
                    }
                    ;
                    e[k + 1] += 1.0;
                }
                e[k] = -e[k];
                if (((lhs, rhs) => lhs && rhs)((k + 1 < this.m), (e[k] !== 0.0))) {
                    for (let i: number = k + 1; i < this.m; i++) {
                        work[i] = 0.0;
                    }
                    ;
                    for (let j: number = k + 1; j < this.n; j++) {
                        for (let i: number = k + 1; i < this.m; i++) {
                            work[i] += e[j] * A[i][j];
                        }
                        ;
                    }
                    ;
                    for (let j: number = k + 1; j < this.n; j++) {
                        let t: number = -e[j] / e[k + 1];
                        for (let i: number = k + 1; i < this.m; i++) {
                            A[i][j] += t * work[i];
                        }
                        ;
                    }
                    ;
                }
                if (wantv) {
                    for (let i: number = k + 1; i < this.n; i++) {
                        this.V[i][k] = e[i];
                    }
                    ;
                }
            }
        }
        ;
        let p: number = Math.min(this.n, this.m + 1);
        if (nct < this.n) {
            this.s[nct] = A[nct][nct];
        }
        if (this.m < p) {
            this.s[p - 1] = 0.0;
        }
        if (nrt + 1 < p) {
            e[nrt] = A[nrt][p - 1];
        }
        e[p - 1] = 0.0;
        if (wantu) {
            for (let j: number = nct; j < nu; j++) {
                for (let i: number = 0; i < this.m; i++) {
                    this.U[i][j] = 0.0;
                }
                ;
                this.U[j][j] = 1.0;
            }
            ;
            for (let k: number = nct - 1; k >= 0; k--) {
                if (this.s[k] !== 0.0) {
                    for (let j: number = k + 1; j < nu; j++) {
                        let t: number = 0;
                        for (let i: number = k; i < this.m; i++) {
                            t += this.U[i][k] * this.U[i][j];
                        }
                        ;
                        t = -t / this.U[k][k];
                        for (let i: number = k; i < this.m; i++) {
                            this.U[i][j] += t * this.U[i][k];
                        }
                        ;
                    }
                    ;
                    for (let i: number = k; i < this.m; i++) {
                        this.U[i][k] = -this.U[i][k];
                    }
                    ;
                    this.U[k][k] = 1.0 + this.U[k][k];
                    for (let i: number = 0; i < k - 1; i++) {
                        this.U[i][k] = 0.0;
                    }
                    ;
                }
                else {
                    for (let i: number = 0; i < this.m; i++) {
                        this.U[i][k] = 0.0;
                    }
                    ;
                    this.U[k][k] = 1.0;
                }
            }
            ;
        }
        if (wantv) {
            for (let k: number = this.n - 1; k >= 0; k--) {
                if (((lhs, rhs) => lhs && rhs)((k < nrt), (e[k] !== 0.0))) {
                    for (let j: number = k + 1; j < nu; j++) {
                        let t: number = 0;
                        for (let i: number = k + 1; i < this.n; i++) {
                            t += this.V[i][k] * this.V[i][j];
                        }
                        ;
                        t = -t / this.V[k + 1][k];
                        for (let i: number = k + 1; i < this.n; i++) {
                            this.V[i][j] += t * this.V[i][k];
                        }
                        ;
                    }
                    ;
                }
                for (let i: number = 0; i < this.n; i++) {
                    this.V[i][k] = 0.0;
                }
                ;
                this.V[k][k] = 1.0;
            }
            ;
        }
        let pp: number = p - 1;
        let iter: number = 0;
        let eps: number = Math.pow(2.0, -52.0);
        let tiny: number = Math.pow(2.0, -966.0);
        while ((p > 0)) {
            let k: number;
            let kase: number;
            for (k = p - 2; k >= -1; k--) {
                if (k === -1) {
                    break;
                }
                if (Math.abs(e[k]) <= tiny + eps * (Math.abs(this.s[k]) + Math.abs(this.s[k + 1]))) {
                    e[k] = 0.0;
                    break;
                }
            }
            ;
            if (k === p - 2) {
                kase = 4;
            }
            else {
                let ks: number;
                for (ks = p - 1; ks >= k; ks--) {
                    if (ks === k) {
                        break;
                    }
                    let t: number = (ks !== p ? Math.abs(e[ks]) : 0.0) + (ks !== k + 1 ? Math.abs(e[ks - 1]) : 0.0);
                    if (Math.abs(this.s[ks]) <= tiny + eps * t) {
                        this.s[ks] = 0.0;
                        break;
                    }
                }
                ;
                if (ks === k) {
                    kase = 3;
                }
                else if (ks === p - 1) {
                    kase = 1;
                }
                else {
                    kase = 2;
                    k = ks;
                }
            }
            k++;
            switch ((kase)) {
                case 1:
                    {
                        let f: number = e[p - 2];
                        e[p - 2] = 0.0;
                        for (let j: number = p - 2; j >= k; j--) {
                            let t: number = Maths.hypot(this.s[j], f);
                            let cs: number = this.s[j] / t;
                            let sn: number = f / t;
                            this.s[j] = t;
                            if (j !== k) {
                                f = -sn * e[j - 1];
                                e[j - 1] = cs * e[j - 1];
                            }
                            if (wantv) {
                                for (let i: number = 0; i < this.n; i++) {
                                    t = cs * this.V[i][j] + sn * this.V[i][p - 1];
                                    this.V[i][p - 1] = -sn * this.V[i][j] + cs * this.V[i][p - 1];
                                    this.V[i][j] = t;
                                }
                                ;
                            }
                        }
                        ;
                    }
                    ;
                    break;
                case 2:
                    {
                        let f: number = e[k - 1];
                        e[k - 1] = 0.0;
                        for (let j: number = k; j < p; j++) {
                            let t: number = Maths.hypot(this.s[j], f);
                            let cs: number = this.s[j] / t;
                            let sn: number = f / t;
                            this.s[j] = t;
                            f = -sn * e[j];
                            e[j] = cs * e[j];
                            if (wantu) {
                                for (let i: number = 0; i < this.m; i++) {
                                    t = cs * this.U[i][j] + sn * this.U[i][k - 1];
                                    this.U[i][k - 1] = -sn * this.U[i][j] + cs * this.U[i][k - 1];
                                    this.U[i][j] = t;
                                }
                                ;
                            }
                        }
                        ;
                    }
                    ;
                    break;
                case 3:
                    {
                        let scale: number = Math.max(Math.max(Math.max(Math.max(Math.abs(this.s[p - 1]), Math.abs(this.s[p - 2])), Math.abs(e[p - 2])), Math.abs(this.s[k])), Math.abs(e[k]));
                        let sp: number = this.s[p - 1] / scale;
                        let spm1: number = this.s[p - 2] / scale;
                        let epm1: number = e[p - 2] / scale;
                        let sk: number = this.s[k] / scale;
                        let ek: number = e[k] / scale;
                        let b: number = ((spm1 + sp) * (spm1 - sp) + epm1 * epm1) / 2.0;
                        let c: number = (sp * epm1) * (sp * epm1);
                        let shift: number = 0.0;
                        if (((lhs, rhs) => lhs || rhs)((b !== 0.0), (c !== 0.0))) {
                            shift = Math.sqrt(b * b + c);
                            if (b < 0.0) {
                                shift = -shift;
                            }
                            shift = c / (b + shift);
                        }
                        let f: number = (sk + sp) * (sk - sp) + shift;
                        let g: number = sk * ek;
                        for (let j: number = k; j < p - 1; j++) {
                            let t: number = Maths.hypot(f, g);
                            let cs: number = f / t;
                            let sn: number = g / t;
                            if (j !== k) {
                                e[j - 1] = t;
                            }
                            f = cs * this.s[j] + sn * e[j];
                            e[j] = cs * e[j] - sn * this.s[j];
                            g = sn * this.s[j + 1];
                            this.s[j + 1] = cs * this.s[j + 1];
                            if (wantv) {
                                for (let i: number = 0; i < this.n; i++) {
                                    t = cs * this.V[i][j] + sn * this.V[i][j + 1];
                                    this.V[i][j + 1] = -sn * this.V[i][j] + cs * this.V[i][j + 1];
                                    this.V[i][j] = t;
                                }
                                ;
                            }
                            t = Maths.hypot(f, g);
                            cs = f / t;
                            sn = g / t;
                            this.s[j] = t;
                            f = cs * e[j] + sn * this.s[j + 1];
                            this.s[j + 1] = -sn * e[j] + cs * this.s[j + 1];
                            g = sn * e[j + 1];
                            e[j + 1] = cs * e[j + 1];
                            if (wantu && (j < this.m - 1)) {
                                for (let i: number = 0; i < this.m; i++) {
                                    t = cs * this.U[i][j] + sn * this.U[i][j + 1];
                                    this.U[i][j + 1] = -sn * this.U[i][j] + cs * this.U[i][j + 1];
                                    this.U[i][j] = t;
                                }
                                ;
                            }
                        }
                        ;
                        e[p - 2] = f;
                        iter = iter + 1;
                    }
                    ;
                    break;
                case 4:
                    {
                        if (this.s[k] <= 0.0) {
                            this.s[k] = (this.s[k] < 0.0 ? -this.s[k] : 0.0);
                            if (wantv) {
                                for (let i: number = 0; i <= pp; i++) {
                                    this.V[i][k] = -this.V[i][k];
                                }
                                ;
                            }
                        }
                        while ((k < pp)) {
                            if (this.s[k] >= this.s[k + 1]) {
                                break;
                            }
                            let t: number = this.s[k];
                            this.s[k] = this.s[k + 1];
                            this.s[k + 1] = t;
                            if (wantv && (k < this.n - 1)) {
                                for (let i: number = 0; i < this.n; i++) {
                                    t = this.V[i][k + 1];
                                    this.V[i][k + 1] = this.V[i][k];
                                    this.V[i][k] = t;
                                }
                                ;
                            }
                            if (wantu && (k < this.m - 1)) {
                                for (let i: number = 0; i < this.m; i++) {
                                    t = this.U[i][k + 1];
                                    this.U[i][k + 1] = this.U[i][k];
                                    this.U[i][k] = t;
                                }
                                ;
                            }
                            k++;
                        }
                        ;
                        iter = 0;
                        p--;
                    }
                    ;
                    break;
            }
        }
        ;
    }
    /**
     * Return the left singular vectors
     * @return     {Matrix} U
     */
    public getU(): Matrix {
        return new Matrix(this.U, this.m, Math.min(this.m + 1, this.n));
    }
    /**
     * Return the right singular vectors
     * @return     {Matrix} V
     */
    public getV(): Matrix {
        return new Matrix(this.V, this.n, this.n);
    }
    /**
     * Return the one-dimensional array of singular values
     * @return     {Array} diagonal of S.
     */
    public getSingularValues(): number[] {
        return this.s;
    }
    /**
     * Return the diagonal matrix of singular values
     * @return     {Matrix} S
     */
    public getS(): Matrix {
        let X: Matrix = new Matrix(this.n, this.n);
        let S: number[][] = X.getArray();
        for (let i: number = 0; i < this.n; i++) {
            for (let j: number = 0; j < this.n; j++) {
                S[i][j] = 0.0;
            }
            ;
            S[i][i] = this.s[i];
        }
        ;
        return X;
    }
    /**
     * Two norm
     * @return     {number} max(S)
     */
    public norm2(): number {
        return this.s[0];
    }
    /**
     * Two norm condition number
     * @return     {number} max(S)/min(S)
     */
    public cond(): number {
        return this.s[0] / this.s[Math.min(this.m, this.n) - 1];
    }
    /**
     * Effective numerical matrix rank
     * @return     {number} Number of nonnegligible singular values.
     */
    public rank(): number {
        let eps: number = Math.pow(2.0, -52.0);
        let tol: number = Math.max(this.m, this.n) * this.s[0] * eps;
        let r: number = 0;
        for (let i: number = 0; i < this.s.length; i++) {
            if (this.s[i] > tol) {
                r++;
            }
        }
        ;
        return r;
    }
    static serialVersionUID: number = 1;
}
SingularValueDecomposition["__class"] = "Jama.SingularValueDecomposition";
SingularValueDecomposition["__interfaces"] = ["java.io.Serializable"];
