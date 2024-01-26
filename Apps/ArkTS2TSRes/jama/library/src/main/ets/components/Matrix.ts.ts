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
import { SingularValueDecomposition } from './SingularValueDecomposition';
import { LUDecomposition } from './LUDecomposition';
import { QRDecomposition } from './QRDecomposition';
import { CholeskyDecomposition } from './CholeskyDecomposition';
import { EigenvalueDecomposition } from './EigenvalueDecomposition';
/**
 * Construct an m-by-n constant matrix.
 * @param {number} m    Number of rows.
 * @param {number} n    Number of columns.
 * @param {number} s    Fill the matrix with this scalar value.
 * @class
 * @author The MathWorks, Inc. and the National Institute of Standards and Technology.
 */
export class Matrix {
    /**
     * Array for internal storage of elements.
     * @serial internal array storage.
     */
    /* private */
    A: number[][];
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
    public constructor(A?: any, m?: any, n?: any) {
        if (((A != null && A instanceof <any>Array && (A.length == 0 || A[0] == null || A[0] instanceof Array)) || A === null) && ((typeof m === 'number') || m === null) && ((typeof n === 'number') || n === null)) {
            let __args = Array.prototype.slice.call(arguments);
            this.A = null;
            this.m = 0;
            this.n = 0;
            this.A = null;
            this.m = 0;
            this.n = 0;
            (() => {
                this.A = A;
                this.m = m;
                this.n = n;
            })();
        }
        else if (((typeof A === 'number') || A === null) && ((typeof m === 'number') || m === null) && ((typeof n === 'number') || n === null)) {
            let __args = Array.prototype.slice.call(arguments);
            let m: any = __args[0];
            let n: any = __args[1];
            let s: any = __args[2];
            this.A = null;
            this.m = 0;
            this.n = 0;
            this.A = null;
            this.n = 0;
            this.m = 0;
            (() => {
                this.n = n;
                this.m = m;
                this.A = <any>(function (dims) { let allocate = function (dims) { if (dims.length == 0) {
                    return 0;
                }
                else {
                    let array = [];
                    for (let i = 0; i < dims[0]; i++) {
                        array.push(allocate(dims.slice(1)));
                    }
                    return array;
                } }; return allocate(dims); })([m, n]);
                for (let i: number = 0; i < m; i++) {
                    for (let j: number = 0; j < n; j++) {
                        this.A[i][j] = s;
                    }
                    ;
                }
                ;
            })();
        }
        else if (((A != null && A instanceof <any>Array && (A.length == 0 || A[0] == null || (typeof A[0] === 'number'))) || A === null) && ((typeof m === 'number') || m === null) && n === undefined) {
            let __args = Array.prototype.slice.call(arguments);
            let vals: any = __args[0];
            this.A = null;
            this.m = 0;
            this.n = 0;
            this.A = null;
            this.m = 0;
            this.n = 0;
            (() => {
                this.m = m;
                this.n = (m !== 0 ? (vals.length / m | 0) : 0);
                if (m * this.n !== vals.length) {
                    throw Object.defineProperty(new Error("Array length must be a multiple of m."), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
                }
                this.A = <any>(function (dims) { let allocate = function (dims) { if (dims.length == 0) {
                    return 0;
                }
                else {
                    let array = [];
                    for (let i = 0; i < dims[0]; i++) {
                        array.push(allocate(dims.slice(1)));
                    }
                    return array;
                } }; return allocate(dims); })([m, this.n]);
                for (let i: number = 0; i < m; i++) {
                    for (let j: number = 0; j < this.n; j++) {
                        this.A[i][j] = vals[i + j * m];
                    }
                    ;
                }
                ;
            })();
        }
        else if (((typeof A === 'number') || A === null) && ((typeof m === 'number') || m === null) && n === undefined) {
            let __args = Array.prototype.slice.call(arguments);
            let m: any = __args[0];
            let n: any = __args[1];
            this.A = null;
            this.m = 0;
            this.n = 0;
            this.A = null;
            this.m = 0;
            this.n = 0;
            (() => {
                this.m = m;
                this.n = n;
                this.A = <any>(function (dims) { let allocate = function (dims) { if (dims.length == 0) {
                    return 0;
                }
                else {
                    let array = [];
                    for (let i = 0; i < dims[0]; i++) {
                        array.push(allocate(dims.slice(1)));
                    }
                    return array;
                } }; return allocate(dims); })([m, n]);
            })();
        }
        else if (((A != null && A instanceof <any>Array && (A.length == 0 || A[0] == null || A[0] instanceof Array)) || A === null) && m === undefined && n === undefined) {
            let __args = Array.prototype.slice.call(arguments);
            this.A = null;
            this.m = 0;
            this.n = 0;
            this.A = null;
            this.m = 0;
            this.n = 0;
            (() => {
                this.m = A.length;
                this.n = A[0].length;
                for (let i: number = 0; i < this.m; i++) {
                    if (A[i].length !== this.n) {
                        throw Object.defineProperty(new Error("All rows must have the same length."), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
                    }
                }
                ;
                this.A = A;
            })();
        }
        else
            throw new Error('invalid overload');
    }
    /**
     * Construct a matrix from a copy of a 2-D array.
     * @param {Array} A    Two-dimensional array of doubles.
     * @exception  IllegalArgumentException All rows must have the same length
     * @return {Matrix}
     */
    public static constructWithCopy(A: number[][]): Matrix {
        let m: number = A.length;
        let n: number = A[0].length;
        let X: Matrix = new Matrix(m, n);
        let C: number[][] = X.getArray();
        for (let i: number = 0; i < m; i++) {
            if (A[i].length !== n) {
                throw Object.defineProperty(new Error("All rows must have the same length."), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
            }
            for (let j: number = 0; j < n; j++) {
                C[i][j] = A[i][j];
            }
            ;
        }
        ;
        return X;
    }
    /**
     * Make a deep copy of a matrix
     * @return {Matrix}
     */
    public copy(): Matrix {
        let X: Matrix = new Matrix(this.m, this.n);
        let C: number[][] = X.getArray();
        for (let i: number = 0; i < this.m; i++) {
            for (let j: number = 0; j < this.n; j++) {
                C[i][j] = this.A[i][j];
            }
            ;
        }
        ;
        return X;
    }
    /**
     * Clone the Matrix object.
     * @return {*}
     */
    public clone(): any {
        return this.copy();
    }
    /**
     * Access the internal two-dimensional array.
     * @return     {Array} Pointer to the two-dimensional array of matrix elements.
     */
    public getArray(): number[][] {
        return this.A;
    }
    /**
     * Copy the internal two-dimensional array.
     * @return     {Array} Two-dimensional array copy of matrix elements.
     */
    public getArrayCopy(): number[][] {
        let C: number[][] = <any>(function (dims) { let allocate = function (dims) { if (dims.length == 0) {
            return 0;
        }
        else {
            let array = [];
            for (let i = 0; i < dims[0]; i++) {
                array.push(allocate(dims.slice(1)));
            }
            return array;
        } }; return allocate(dims); })([this.m, this.n]);
        for (let i: number = 0; i < this.m; i++) {
            for (let j: number = 0; j < this.n; j++) {
                C[i][j] = this.A[i][j];
            }
            ;
        }
        ;
        return C;
    }
    /**
     * Make a one-dimensional column packed copy of the internal array.
     * @return     {Array} Matrix elements packed in a one-dimensional array by columns.
     */
    public getColumnPackedCopy(): number[] {
        let vals: number[] = (s => { let a = []; while (s-- > 0)
            a.push(0); return a; })(this.m * this.n);
        for (let i: number = 0; i < this.m; i++) {
            for (let j: number = 0; j < this.n; j++) {
                vals[i + j * this.m] = this.A[i][j];
            }
            ;
        }
        ;
        return vals;
    }
    /**
     * Make a one-dimensional row packed copy of the internal array.
     * @return     {Array} Matrix elements packed in a one-dimensional array by rows.
     */
    public getRowPackedCopy(): number[] {
        let vals: number[] = (s => { let a = []; while (s-- > 0)
            a.push(0); return a; })(this.m * this.n);
        for (let i: number = 0; i < this.m; i++) {
            for (let j: number = 0; j < this.n; j++) {
                vals[i * this.n + j] = this.A[i][j];
            }
            ;
        }
        ;
        return vals;
    }
    /**
     * Get row dimension.
     * @return     {number} m, the number of rows.
     */
    public getRowDimension(): number {
        return this.m;
    }
    /**
     * Get column dimension.
     * @return     {number} n, the number of columns.
     */
    public getColumnDimension(): number {
        return this.n;
    }
    /**
     * Get a single element.
     * @param {number} i    Row index.
     * @param {number} j    Column index.
     * @return     {number} A(i,j)
     * @exception  ArrayIndexOutOfBoundsException
     */
    public get(i: number, j: number): number {
        return this.A[i][j];
    }
    public getMatrix$int$int$int$int(i0: number, i1: number, j0: number, j1: number): Matrix {
        let X: Matrix = new Matrix(i1 - i0 + 1, j1 - j0 + 1);
        let B: number[][] = X.getArray();
        try {
            for (let i: number = i0; i <= i1; i++) {
                for (let j: number = j0; j <= j1; j++) {
                    B[i - i0][j - j0] = this.A[i][j];
                }
                ;
            }
            ;
        }
        catch (e) {
            throw Object.defineProperty(new Error("Submatrix indices"), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.IndexOutOfBoundsException', 'java.lang.Object', 'java.lang.ArrayIndexOutOfBoundsException', 'java.lang.RuntimeException', 'java.lang.Exception'] });
        }
        ;
        return X;
    }
    /**
     * Get a submatrix.
     * @param {number} i0   Initial row index
     * @param {number} i1   Final row index
     * @param {number} j0   Initial column index
     * @param {number} j1   Final column index
     * @return     {Matrix} A(i0:i1,j0:j1)
     * @exception  ArrayIndexOutOfBoundsException Submatrix indices
     */
    public getMatrix(i0?: any, i1?: any, j0?: any, j1?: any): any {
        if (((typeof i0 === 'number') || i0 === null) && ((typeof i1 === 'number') || i1 === null) && ((typeof j0 === 'number') || j0 === null) && ((typeof j1 === 'number') || j1 === null)) {
            return <any>this.getMatrix$int$int$int$int(i0, i1, j0, j1);
        }
        else if (((i0 != null && i0 instanceof <any>Array && (i0.length == 0 || i0[0] == null || (typeof i0[0] === 'number'))) || i0 === null) && ((typeof i1 === 'number') || i1 === null) && ((typeof j0 === 'number') || j0 === null) && j1 === undefined) {
            return <any>this.getMatrix$int_A$int$int(i0, i1, j0);
        }
        else if (((typeof i0 === 'number') || i0 === null) && ((typeof i1 === 'number') || i1 === null) && ((j0 != null && j0 instanceof <any>Array && (j0.length == 0 || j0[0] == null || (typeof j0[0] === 'number'))) || j0 === null) && j1 === undefined) {
            return <any>this.getMatrix$int$int$int_A(i0, i1, j0);
        }
        else if (((i0 != null && i0 instanceof <any>Array && (i0.length == 0 || i0[0] == null || (typeof i0[0] === 'number'))) || i0 === null) && ((i1 != null && i1 instanceof <any>Array && (i1.length == 0 || i1[0] == null || (typeof i1[0] === 'number'))) || i1 === null) && j0 === undefined && j1 === undefined) {
            return <any>this.getMatrix$int_A$int_A(i0, i1);
        }
        else
            throw new Error('invalid overload');
    }
    public getMatrix$int_A$int_A(r: number[], c: number[]): Matrix {
        let X: Matrix = new Matrix(r.length, c.length);
        let B: number[][] = X.getArray();
        try {
            for (let i: number = 0; i < r.length; i++) {
                for (let j: number = 0; j < c.length; j++) {
                    B[i][j] = this.A[r[i]][c[j]];
                }
                ;
            }
            ;
        }
        catch (e) {
            throw Object.defineProperty(new Error("Submatrix indices"), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.IndexOutOfBoundsException', 'java.lang.Object', 'java.lang.ArrayIndexOutOfBoundsException', 'java.lang.RuntimeException', 'java.lang.Exception'] });
        }
        ;
        return X;
    }
    public getMatrix$int$int$int_A(i0: number, i1: number, c: number[]): Matrix {
        let X: Matrix = new Matrix(i1 - i0 + 1, c.length);
        let B: number[][] = X.getArray();
        try {
            for (let i: number = i0; i <= i1; i++) {
                for (let j: number = 0; j < c.length; j++) {
                    B[i - i0][j] = this.A[i][c[j]];
                }
                ;
            }
            ;
        }
        catch (e) {
            throw Object.defineProperty(new Error("Submatrix indices"), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.IndexOutOfBoundsException', 'java.lang.Object', 'java.lang.ArrayIndexOutOfBoundsException', 'java.lang.RuntimeException', 'java.lang.Exception'] });
        }
        ;
        return X;
    }
    public getMatrix$int_A$int$int(r: number[], j0: number, j1: number): Matrix {
        let X: Matrix = new Matrix(r.length, j1 - j0 + 1);
        let B: number[][] = X.getArray();
        try {
            for (let i: number = 0; i < r.length; i++) {
                for (let j: number = j0; j <= j1; j++) {
                    B[i][j - j0] = this.A[r[i]][j];
                }
                ;
            }
            ;
        }
        catch (e) {
            throw Object.defineProperty(new Error("Submatrix indices"), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.IndexOutOfBoundsException', 'java.lang.Object', 'java.lang.ArrayIndexOutOfBoundsException', 'java.lang.RuntimeException', 'java.lang.Exception'] });
        }
        ;
        return X;
    }
    /**
     * Set a single element.
     * @param {number} i    Row index.
     * @param {number} j    Column index.
     * @param {number} s    A(i,j).
     * @exception  ArrayIndexOutOfBoundsException
     */
    public set(i: number, j: number, s: number) {
        this.A[i][j] = s;
    }
    public setMatrix$int$int$int$int$Jama_Matrix(i0: number, i1: number, j0: number, j1: number, X: Matrix) {
        try {
            for (let i: number = i0; i <= i1; i++) {
                for (let j: number = j0; j <= j1; j++) {
                    this.A[i][j] = X.get(i - i0, j - j0);
                }
                ;
            }
            ;
        }
        catch (e) {
            throw Object.defineProperty(new Error("Submatrix indices"), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.IndexOutOfBoundsException', 'java.lang.Object', 'java.lang.ArrayIndexOutOfBoundsException', 'java.lang.RuntimeException', 'java.lang.Exception'] });
        }
        ;
    }
    /**
     * Set a submatrix.
     * @param {number} i0   Initial row index
     * @param {number} i1   Final row index
     * @param {number} j0   Initial column index
     * @param {number} j1   Final column index
     * @param {Matrix} X    A(i0:i1,j0:j1)
     * @exception  ArrayIndexOutOfBoundsException Submatrix indices
     */
    public setMatrix(i0?: any, i1?: any, j0?: any, j1?: any, X?: any): any {
        if (((typeof i0 === 'number') || i0 === null) && ((typeof i1 === 'number') || i1 === null) && ((typeof j0 === 'number') || j0 === null) && ((typeof j1 === 'number') || j1 === null) && ((X != null && X instanceof <any>Matrix) || X === null)) {
            return <any>this.setMatrix$int$int$int$int$Jama_Matrix(i0, i1, j0, j1, X);
        }
        else if (((i0 != null && i0 instanceof <any>Array && (i0.length == 0 || i0[0] == null || (typeof i0[0] === 'number'))) || i0 === null) && ((typeof i1 === 'number') || i1 === null) && ((typeof j0 === 'number') || j0 === null) && ((j1 != null && j1 instanceof <any>Matrix) || j1 === null) && X === undefined) {
            return <any>this.setMatrix$int_A$int$int$Jama_Matrix(i0, i1, j0, j1);
        }
        else if (((typeof i0 === 'number') || i0 === null) && ((typeof i1 === 'number') || i1 === null) && ((j0 != null && j0 instanceof <any>Array && (j0.length == 0 || j0[0] == null || (typeof j0[0] === 'number'))) || j0 === null) && ((j1 != null && j1 instanceof <any>Matrix) || j1 === null) && X === undefined) {
            return <any>this.setMatrix$int$int$int_A$Jama_Matrix(i0, i1, j0, j1);
        }
        else if (((i0 != null && i0 instanceof <any>Array && (i0.length == 0 || i0[0] == null || (typeof i0[0] === 'number'))) || i0 === null) && ((i1 != null && i1 instanceof <any>Array && (i1.length == 0 || i1[0] == null || (typeof i1[0] === 'number'))) || i1 === null) && ((j0 != null && j0 instanceof <any>Matrix) || j0 === null) && j1 === undefined && X === undefined) {
            return <any>this.setMatrix$int_A$int_A$Jama_Matrix(i0, i1, j0);
        }
        else
            throw new Error('invalid overload');
    }
    public setMatrix$int_A$int_A$Jama_Matrix(r: number[], c: number[], X: Matrix) {
        try {
            for (let i: number = 0; i < r.length; i++) {
                for (let j: number = 0; j < c.length; j++) {
                    this.A[r[i]][c[j]] = X.get(i, j);
                }
                ;
            }
            ;
        }
        catch (e) {
            throw Object.defineProperty(new Error("Submatrix indices"), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.IndexOutOfBoundsException', 'java.lang.Object', 'java.lang.ArrayIndexOutOfBoundsException', 'java.lang.RuntimeException', 'java.lang.Exception'] });
        }
        ;
    }
    public setMatrix$int_A$int$int$Jama_Matrix(r: number[], j0: number, j1: number, X: Matrix) {
        try {
            for (let i: number = 0; i < r.length; i++) {
                for (let j: number = j0; j <= j1; j++) {
                    this.A[r[i]][j] = X.get(i, j - j0);
                }
                ;
            }
            ;
        }
        catch (e) {
            throw Object.defineProperty(new Error("Submatrix indices"), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.IndexOutOfBoundsException', 'java.lang.Object', 'java.lang.ArrayIndexOutOfBoundsException', 'java.lang.RuntimeException', 'java.lang.Exception'] });
        }
        ;
    }
    public setMatrix$int$int$int_A$Jama_Matrix(i0: number, i1: number, c: number[], X: Matrix) {
        try {
            for (let i: number = i0; i <= i1; i++) {
                for (let j: number = 0; j < c.length; j++) {
                    this.A[i][c[j]] = X.get(i - i0, j);
                }
                ;
            }
            ;
        }
        catch (e) {
            throw Object.defineProperty(new Error("Submatrix indices"), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.IndexOutOfBoundsException', 'java.lang.Object', 'java.lang.ArrayIndexOutOfBoundsException', 'java.lang.RuntimeException', 'java.lang.Exception'] });
        }
        ;
    }
    /**
     * Matrix transpose.
     * @return    {Matrix} A'
     */
    public transpose(): Matrix {
        let X: Matrix = new Matrix(this.n, this.m);
        let C: number[][] = X.getArray();
        for (let i: number = 0; i < this.m; i++) {
            for (let j: number = 0; j < this.n; j++) {
                C[j][i] = this.A[i][j];
            }
            ;
        }
        ;
        return X;
    }
    /**
     * One norm
     * @return    {number} maximum column sum.
     */
    public norm1(): number {
        let f: number = 0;
        for (let j: number = 0; j < this.n; j++) {
            let s: number = 0;
            for (let i: number = 0; i < this.m; i++) {
                s += Math.abs(this.A[i][j]);
            }
            ;
            f = Math.max(f, s);
        }
        ;
        return f;
    }
    /**
     * Two norm
     * @return    {number} maximum singular value.
     */
    public norm2(): number {
        return (new SingularValueDecomposition(this).norm2());
    }
    /**
     * Infinity norm
     * @return    {number} maximum row sum.
     */
    public normInf(): number {
        let f: number = 0;
        for (let i: number = 0; i < this.m; i++) {
            let s: number = 0;
            for (let j: number = 0; j < this.n; j++) {
                s += Math.abs(this.A[i][j]);
            }
            ;
            f = Math.max(f, s);
        }
        ;
        return f;
    }
    /**
     * Frobenius norm
     * @return    {number} sqrt of sum of squares of all elements.
     */
    public normF(): number {
        let f: number = 0;
        for (let i: number = 0; i < this.m; i++) {
            for (let j: number = 0; j < this.n; j++) {
                f = Maths.hypot(f, this.A[i][j]);
            }
            ;
        }
        ;
        return f;
    }
    /**
     * Unary minus
     * @return    {Matrix} -A
     */
    public uminus(): Matrix {
        let X: Matrix = new Matrix(this.m, this.n);
        let C: number[][] = X.getArray();
        for (let i: number = 0; i < this.m; i++) {
            for (let j: number = 0; j < this.n; j++) {
                C[i][j] = -this.A[i][j];
            }
            ;
        }
        ;
        return X;
    }
    /**
     * C = A + B
     * @param {Matrix} B    another matrix
     * @return     {Matrix} A + B
     */
    public plus(B: Matrix): Matrix {
        this.checkMatrixDimensions(B);
        let X: Matrix = new Matrix(this.m, this.n);
        let C: number[][] = X.getArray();
        for (let i: number = 0; i < this.m; i++) {
            for (let j: number = 0; j < this.n; j++) {
                C[i][j] = this.A[i][j] + B.A[i][j];
            }
            ;
        }
        ;
        return X;
    }
    /**
     * A = A + B
     * @param {Matrix} B    another matrix
     * @return     {Matrix} A + B
     */
    public plusEquals(B: Matrix): Matrix {
        this.checkMatrixDimensions(B);
        for (let i: number = 0; i < this.m; i++) {
            for (let j: number = 0; j < this.n; j++) {
                this.A[i][j] = this.A[i][j] + B.A[i][j];
            }
            ;
        }
        ;
        return this;
    }
    /**
     * C = A - B
     * @param {Matrix} B    another matrix
     * @return     {Matrix} A - B
     */
    public minus(B: Matrix): Matrix {
        this.checkMatrixDimensions(B);
        let X: Matrix = new Matrix(this.m, this.n);
        let C: number[][] = X.getArray();
        for (let i: number = 0; i < this.m; i++) {
            for (let j: number = 0; j < this.n; j++) {
                C[i][j] = this.A[i][j] - B.A[i][j];
            }
            ;
        }
        ;
        return X;
    }
    /**
     * A = A - B
     * @param {Matrix} B    another matrix
     * @return     {Matrix} A - B
     */
    public minusEquals(B: Matrix): Matrix {
        this.checkMatrixDimensions(B);
        for (let i: number = 0; i < this.m; i++) {
            for (let j: number = 0; j < this.n; j++) {
                this.A[i][j] = this.A[i][j] - B.A[i][j];
            }
            ;
        }
        ;
        return this;
    }
    /**
     * Element-by-element multiplication, C = A.*B
     * @param {Matrix} B    another matrix
     * @return     {Matrix} A.*B
     */
    public arrayTimes(B: Matrix): Matrix {
        this.checkMatrixDimensions(B);
        let X: Matrix = new Matrix(this.m, this.n);
        let C: number[][] = X.getArray();
        for (let i: number = 0; i < this.m; i++) {
            for (let j: number = 0; j < this.n; j++) {
                C[i][j] = this.A[i][j] * B.A[i][j];
            }
            ;
        }
        ;
        return X;
    }
    /**
     * Element-by-element multiplication in place, A = A.*B
     * @param {Matrix} B    another matrix
     * @return     {Matrix} A.*B
     */
    public arrayTimesEquals(B: Matrix): Matrix {
        this.checkMatrixDimensions(B);
        for (let i: number = 0; i < this.m; i++) {
            for (let j: number = 0; j < this.n; j++) {
                this.A[i][j] = this.A[i][j] * B.A[i][j];
            }
            ;
        }
        ;
        return this;
    }
    /**
     * Element-by-element right division, C = A./B
     * @param {Matrix} B    another matrix
     * @return     {Matrix} A./B
     */
    public arrayRightDivide(B: Matrix): Matrix {
        this.checkMatrixDimensions(B);
        let X: Matrix = new Matrix(this.m, this.n);
        let C: number[][] = X.getArray();
        for (let i: number = 0; i < this.m; i++) {
            for (let j: number = 0; j < this.n; j++) {
                C[i][j] = this.A[i][j] / B.A[i][j];
            }
            ;
        }
        ;
        return X;
    }
    /**
     * Element-by-element right division in place, A = A./B
     * @param {Matrix} B    another matrix
     * @return     {Matrix} A./B
     */
    public arrayRightDivideEquals(B: Matrix): Matrix {
        this.checkMatrixDimensions(B);
        for (let i: number = 0; i < this.m; i++) {
            for (let j: number = 0; j < this.n; j++) {
                this.A[i][j] = this.A[i][j] / B.A[i][j];
            }
            ;
        }
        ;
        return this;
    }
    /**
     * Element-by-element left division, C = A.\B
     * @param {Matrix} B    another matrix
     * @return     {Matrix} A.\B
     */
    public arrayLeftDivide(B: Matrix): Matrix {
        this.checkMatrixDimensions(B);
        let X: Matrix = new Matrix(this.m, this.n);
        let C: number[][] = X.getArray();
        for (let i: number = 0; i < this.m; i++) {
            for (let j: number = 0; j < this.n; j++) {
                C[i][j] = B.A[i][j] / this.A[i][j];
            }
            ;
        }
        ;
        return X;
    }
    /**
     * Element-by-element left division in place, A = A.\B
     * @param {Matrix} B    another matrix
     * @return     {Matrix} A.\B
     */
    public arrayLeftDivideEquals(B: Matrix): Matrix {
        this.checkMatrixDimensions(B);
        for (let i: number = 0; i < this.m; i++) {
            for (let j: number = 0; j < this.n; j++) {
                this.A[i][j] = B.A[i][j] / this.A[i][j];
            }
            ;
        }
        ;
        return this;
    }
    public times$double(s: number): Matrix {
        let X: Matrix = new Matrix(this.m, this.n);
        let C: number[][] = X.getArray();
        for (let i: number = 0; i < this.m; i++) {
            for (let j: number = 0; j < this.n; j++) {
                C[i][j] = s * this.A[i][j];
            }
            ;
        }
        ;
        return X;
    }
    /**
     * Multiply a matrix by a scalar in place, A = s*A
     * @param {number} s    scalar
     * @return     {Matrix} replace A by s*A
     */
    public timesEquals(s: number): Matrix {
        for (let i: number = 0; i < this.m; i++) {
            for (let j: number = 0; j < this.n; j++) {
                this.A[i][j] = s * this.A[i][j];
            }
            ;
        }
        ;
        return this;
    }
    public times$Jama_Matrix(B: Matrix): Matrix {
        if (B.m !== this.n) {
            throw Object.defineProperty(new Error("Matrix inner dimensions must agree."), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
        }
        let X: Matrix = new Matrix(this.m, B.n);
        let C: number[][] = X.getArray();
        let Bcolj: number[] = (s => { let a = []; while (s-- > 0)
            a.push(0); return a; })(this.n);
        for (let j: number = 0; j < B.n; j++) {
            for (let k: number = 0; k < this.n; k++) {
                Bcolj[k] = B.A[k][j];
            }
            ;
            for (let i: number = 0; i < this.m; i++) {
                let Arowi: number[] = this.A[i];
                let s: number = 0;
                for (let k: number = 0; k < this.n; k++) {
                    s += Arowi[k] * Bcolj[k];
                }
                ;
                C[i][j] = s;
            }
            ;
        }
        ;
        return X;
    }
    /**
     * Linear algebraic matrix multiplication, A * B
     * @param {Matrix} B    another matrix
     * @return     {Matrix} Matrix product, A * B
     * @exception  IllegalArgumentException Matrix inner dimensions must agree.
     */
    public times(B?: any): any {
        if (((B != null && B instanceof <any>Matrix) || B === null)) {
            return <any>this.times$Jama_Matrix(B);
        }
        else if (((typeof B === 'number') || B === null)) {
            return <any>this.times$double(B);
        }
        else
            throw new Error('invalid overload');
    }
    /**
     * LU Decomposition
     * @return     {LUDecomposition} LUDecomposition
     * @see LUDecomposition
     */
    public lu(): LUDecomposition {
        return new LUDecomposition(this);
    }
    /**
     * QR Decomposition
     * @return     {QRDecomposition} QRDecomposition
     * @see QRDecomposition
     */
    public qr(): QRDecomposition {
        return new QRDecomposition(this);
    }
    /**
     * Cholesky Decomposition
     * @return     {CholeskyDecomposition} CholeskyDecomposition
     * @see CholeskyDecomposition
     */
    public chol(): CholeskyDecomposition {
        return new CholeskyDecomposition(this);
    }
    /**
     * Singular Value Decomposition
     * @return     {SingularValueDecomposition} SingularValueDecomposition
     * @see SingularValueDecomposition
     */
    public svd(): SingularValueDecomposition {
        return new SingularValueDecomposition(this);
    }
    /**
     * Eigenvalue Decomposition
     * @return     {EigenvalueDecomposition} EigenvalueDecomposition
     * @see EigenvalueDecomposition
     */
    public eig(): EigenvalueDecomposition {
        return new EigenvalueDecomposition(this);
    }
    /**
     * Solve A*X = B
     * @param {Matrix} B    right hand side
     * @return     {Matrix} solution if A is square, least squares solution otherwise
     */
    public solve(B: Matrix): Matrix {
        return (this.m === this.n ? (new LUDecomposition(this)).solve(B) : (new QRDecomposition(this)).solve(B));
    }
    /**
     * Solve X*A = B, which is also A'*X' = B'
     * @param {Matrix} B    right hand side
     * @return     {Matrix} solution if A is square, least squares solution otherwise.
     */
    public solveTranspose(B: Matrix): Matrix {
        return this.transpose().solve(B.transpose());
    }
    /**
     * Matrix inverse or pseudoinverse
     * @return     {Matrix} inverse(A) if A is square, pseudoinverse otherwise.
     */
    public inverse(): Matrix {
        return this.solve(Matrix.identity(this.m, this.m));
    }
    /**
     * Matrix determinant
     * @return     {number} determinant
     */
    public det(): number {
        return new LUDecomposition(this).det();
    }
    /**
     * Matrix rank
     * @return     {number} effective numerical rank, obtained from SVD.
     */
    public rank(): number {
        return new SingularValueDecomposition(this).rank();
    }
    /**
     * Matrix condition (2 norm)
     * @return     {number} ratio of largest to smallest singular value.
     */
    public cond(): number {
        return new SingularValueDecomposition(this).cond();
    }
    /**
     * Matrix trace.
     * @return     {number} sum of the diagonal elements.
     */
    public trace(): number {
        let t: number = 0;
        for (let i: number = 0; i < Math.min(this.m, this.n); i++) {
            t += this.A[i][i];
        }
        ;
        return t;
    }
    /**
     * Generate matrix with random elements
     * @param {number} m    Number of rows.
     * @param {number} n    Number of columns.
     * @return     {Matrix} An m-by-n matrix with uniformly distributed random elements.
     */
    public static random(m: number, n: number): Matrix {
        let A: Matrix = new Matrix(m, n);
        let X: number[][] = A.getArray();
        for (let i: number = 0; i < m; i++) {
            for (let j: number = 0; j < n; j++) {
                X[i][j] = Math.random();
            }
            ;
        }
        ;
        return A;
    }
    /**
     * Generate identity matrix
     * @param {number} m    Number of rows.
     * @param {number} n    Number of columns.
     * @return     {Matrix} An m-by-n matrix with ones on the diagonal and zeros elsewhere.
     */
    public static identity(m: number, n: number): Matrix {
        let A: Matrix = new Matrix(m, n);
        let X: number[][] = A.getArray();
        for (let i: number = 0; i < m; i++) {
            for (let j: number = 0; j < n; j++) {
                X[i][j] = (i === j ? 1.0 : 0.0);
            }
            ;
        }
        ;
        return A;
    }
    /**
     * Check if size(A) == size(B)
     * @param {Matrix} B
     * @private
     */
    /* private */
    checkMatrixDimensions(B: Matrix) {
        if (B.m !== this.m || B.n !== this.n) {
            throw Object.defineProperty(new Error("Matrix dimensions must agree."), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
        }
    }
    static serialVersionUID: number = 1;
}
Matrix["__class"] = "Jama.Matrix";
Matrix["__interfaces"] = ["java.lang.Cloneable", "java.io.Serializable"];
