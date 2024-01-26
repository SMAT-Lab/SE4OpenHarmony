interface Index_Params {
    A00?: number;
    A01?: number;
    A10?: number;
    A11?: number;
    B00?: number;
    B01?: number;
    B10?: number;
    B11?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "index_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import { Matrix } from '@ohos/jama';
import { EigenvalueDecomposition } from '@ohos/jama/src/main/ets/components/EigenvalueDecomposition';
import { LUDecomposition } from '@ohos/jama/src/main/ets/components/LUDecomposition';
import { QRDecomposition } from '@ohos/jama/src/main/ets/components/QRDecomposition';
import taskpool from '@ohos.taskpool';
export function startTest() {
    "use concurrent";
    /** Generate magic square test matrix. **/
    let magic = (n: number) => {
        // let M = new Number[n][n];
        let M: number[][] = (Array as any).from({ length: n }, () => new Array(n).fill(0));
        // Odd order
        if ((n % 2) == 1) {
            let a: number = (n + 1) / 2;
            let b: number = (n + 1);
            for (let j = 0; j < n; j++) {
                for (let i = 0; i < n; i++) {
                    M[i][j] = n * ((i + j + a) % n) + ((i + 2 * j + b) % n) + 1;
                }
            }
            // Doubly Even Order
        }
        else if ((n % 4) == 0) {
            for (let j = 0; j < n; j++) {
                for (let i = 0; i < n; i++) {
                    if (((i + 1) / 2) % 2 == ((j + 1) / 2) % 2) {
                        M[i][j] = n * n - n * i - j;
                    }
                    else {
                        M[i][j] = n * i + j + 1;
                    }
                }
            }
            // Singly Even Order
        }
        else {
            let p = n / 2;
            let k = (n - 2) / 4;
            let A = magic(p);
            for (let j = 0; j < p; j++) {
                for (let i = 0; i < p; i++) {
                    let aij = A.get(i, j);
                    M[i][j] = aij;
                    M[i][j + p] = aij + 2 * p * p;
                    M[i + p][j] = aij + 3 * p * p;
                    M[i + p][j + p] = aij + p * p;
                }
            }
            for (let i = 0; i < p; i++) {
                for (let j = 0; j < k; j++) {
                    let t: any = M[i][j];
                    M[i][j] = M[i + p][j];
                    M[i + p][j] = t;
                }
                for (let j = n - k + 1; j < n; j++) {
                    let t: any = M[i][j];
                    M[i][j] = M[i + p][j];
                    M[i + p][j] = t;
                }
            }
            let t: any = M[k][0];
            M[k][0] = M[k + p][0];
            M[k + p][0] = t;
            t = M[k][k];
            M[k][k] = M[k + p][k];
            M[k + p][k] = t;
        }
        return new Matrix(M);
    };
    /** Format double with Fw.d. **/
    let fixedWidthDoubletoString = (x: any, w: any, d: any) => {
        let s = '' + x;
        return s;
    };
    /** Format integer with Iw. **/
    let fixedWidthIntegertoString = (n: any, w: any) => {
        return n + '';
    };
    let print = (info: any) => {
        console.log(info);
    };
    /*
     | Tests LU, QR, SVD and symmetric Eig decompositions.
     |
     |   n       = order of magic square.
     |   trace   = diagonal sum, should be the magic sum, (n^3 + n)/2.
     |   max_eig = maximum eigenvalue of (A + A')/2, should equal trace.
     |   rank    = linear algebraic rank,
     |             should equal n if n is odd, be less than n if n is even.
     |   cond    = L_2 condition number, ratio of singular values.
     |   lu_res  = test of LU factorization, norm1(L*U-A(p,:))/(n*eps).
     |   qr_res  = test of QR factorization, norm1(Q*R-A)/(n*eps).
     */
    let start_time = new Date().getTime();
    let eps = Math.pow(2.0, -52.0);
    for (let n = 3; n <= 32; n++) {
        print(fixedWidthIntegertoString(n, 7));
        let M = magic(n);
        let t = M.trace();
        print(fixedWidthIntegertoString(t, 10));
        let E = new EigenvalueDecomposition(M.plus(M.transpose()).times(0.5));
        let d = E.getRealEigenvalues();
        print(fixedWidthDoubletoString(d[n - 1], 14, 3));
        let r = M.rank();
        print(fixedWidthIntegertoString(r, 7));
        let c = M.cond();
        print(c < 1 / eps ? fixedWidthDoubletoString(c, 12, 3) :
            "         Inf");
        let LU = new LUDecomposition(M);
        let L = LU.getL();
        let U = LU.getU();
        let p = LU.getPivot();
        let R: any = L.times(U).minus(M.getMatrix(p, 0, n - 1));
        let res = R.norm1() / (n * eps);
        print(fixedWidthDoubletoString(res, 12, 3));
        let QR = new QRDecomposition(M);
        let Q = QR.getQ();
        R = QR.getR();
        R = Q.times(R).minus(M);
        res = R.norm1() / (n * eps);
        print(fixedWidthDoubletoString(res, 12, 3));
        print("\n");
    }
    let stop_time = new Date().getTime();
    let etime = (stop_time - start_time) / 1000.;
    print("\nElapsed Time = " +
        fixedWidthDoubletoString(etime, 12, 3) + " seconds\n");
    print("Adios\n");
}
export function startTest2(arrayA: any, arrayB: any) {
    "use concurrent";
    console.log('arrayA=' + JSON.stringify(arrayA));
    console.log('arrayB=' + JSON.stringify(arrayB));
    let matrixD = new Matrix(arrayA);
    let matrixA = new Matrix(arrayA);
    console.log('new Matrix(arrayA)=' + JSON.stringify(matrixA));
    let matrixC = Matrix.constructWithCopy(arrayA);
    console.log('--------matrixC--------', matrixC);
    console.log('Matrix.constructWithCopy=' + JSON.stringify(matrixC.getArray()));
    let copyA = matrixA.copy();
    console.log('matrixA.copy=' + JSON.stringify(copyA.getArray()));
    let cloneA: any = matrixA.clone();
    console.log('matrixA.clone=' + JSON.stringify(cloneA.getArray()));
    let getArrayCopyA = matrixA.getArrayCopy();
    console.log('matrixA.getArrayCopy=' + JSON.stringify(getArrayCopyA));
    let getColumnPackedCopy = matrixA.getColumnPackedCopy();
    console.log('matrixA.getColumnPackedCopy()=' + JSON.stringify(getColumnPackedCopy));
    let getRowPackedCopy = matrixA.getRowPackedCopy();
    console.log('matrixA.getRowPackedCopy()=' + JSON.stringify(getRowPackedCopy));
    let getRowDimension = matrixA.getRowDimension();
    console.log('matrixA.getRowDimension()=' + JSON.stringify(getRowDimension));
    let getColumnDimension = matrixA.getColumnDimension();
    console.log('matrixA.getColumnDimension()=' + JSON.stringify(getColumnDimension));
    let get11 = matrixA.get(1, 1);
    console.log('matrixA.get(1, 1)=' + JSON.stringify(get11));
    let getMatrix$int$int$int$int0101 = matrixA.getMatrix$int$int$int$int(0, 1, 0, 1);
    console.log('matrixA.getMatrix$int$int$int$int(0, 1, 0, 1)=' + JSON.stringify(getMatrix$int$int$int$int0101));
    let getMatrix0101: any = matrixA.getMatrix(0, 1, 0, 1);
    console.log('matrixA.getMatrix(0, 1, 0, 1)=' + JSON.stringify(getMatrix0101));
    let getMatrix_01_01: any = matrixA.getMatrix([0, 1], [0, 1]);
    console.log('matrixA.getMatrix([0, 1], [0, 1])=' + JSON.stringify(getMatrix_01_01));
    let getMatrix01_01: any = matrixA.getMatrix(0, 1, [0, 1]);
    console.log('matrixA.getMatrix(0, 1, [0, 1])=' + JSON.stringify(getMatrix01_01));
    let getMatrix_0101: any = matrixA.getMatrix([0, 1], 0, 1);
    console.log('matrixA.getMatrix([0, 1], 0, 1)=' + JSON.stringify(getMatrix_0101));
    matrixD.set(0, 1, 66);
    console.log('matrixD.set(0, 1, 66)=' + JSON.stringify(matrixD.getArray()));
    matrixD.setMatrix$int$int$int$int$Jama_Matrix(0, 1, 0, 1, matrixA);
    console.log('matrixD.setMatrix$int$int$int$int$Jama_Matrix(0, 1, 0, 1, MatrixA)=' + JSON.stringify(matrixD.getArray()));
    matrixD.setMatrix(0, 1, 0, 1, matrixA);
    console.log('matrixD.setMatrix(0, 1, 0, 1, MatrixA)=' + JSON.stringify(matrixD.getArray()));
    matrixD.setMatrix$int_A$int_A$Jama_Matrix([0, 1], [0, 1], matrixA);
    console.log('matrixD.setMatrix$int_A$int_A$Jama_Matrix([0, 1], [0, 1], MatrixA)=' + JSON.stringify(matrixD.getArray()));
    matrixD.setMatrix$int_A$int$int$Jama_Matrix([0, 1], 0, 1, matrixA);
    console.log('matrixD.setMatrix$int_A$int_A$Jama_Matrix([0, 1], 0, 1, MatrixA)=' + JSON.stringify(matrixD.getArray()));
    matrixD.setMatrix$int$int$int_A$Jama_Matrix(0, 1, [0, 1], matrixA);
    console.log('matrixD.setMatrix$int$int$int_A$Jama_Matrix(0, 1, [0, 1], MatrixA)=' + JSON.stringify(matrixD.getArray()));
    let matrixB = new Matrix(arrayB);
    let rowA = matrixA.getRowDimension();
    console.log('matrixA.getRowDimension()=' + rowA);
    let colA = matrixA.getColumnDimension();
    console.log('matrixA.getColumnDimension()=' + colA);
    let transposeA = matrixA.transpose();
    console.log('matrixA.transpose() =' + JSON.stringify(transposeA.getArray()));
    let norm1A = matrixA.norm1();
    console.log('matrixA.norm1() =' + JSON.stringify(norm1A));
    let norm2A = matrixA.norm2();
    console.log('matrixA.norm2() =' + JSON.stringify(norm2A));
    let normInfA = matrixA.normInf();
    console.log('matrixA.normInf() =' + JSON.stringify(normInfA));
    let normFA = matrixA.normF();
    console.log('matrixA.normF() =' + JSON.stringify(normFA));
    let uminusA = matrixA.uminus();
    console.log('matrixA.uminus() =' + JSON.stringify(uminusA.getArray()));
    let AplusB = matrixA.plus(matrixB);
    console.log('matrixA.plus(matrixB) =' + JSON.stringify(AplusB.getArray()));
    let AplusEqualsB = matrixA.plusEquals(matrixB);
    console.log('matrixA.plusEquals(matrixB) =' + JSON.stringify(AplusEqualsB.getArray()));
    let AminusB = matrixA.minus(matrixB);
    console.log('matrixA.minus(matrixB) =' + JSON.stringify(AminusB.getArray()));
    let AminusEqualsB = matrixA.minusEquals(matrixB);
    console.log('matrixA.minusEquals(matrixB) =' + JSON.stringify(AminusEqualsB.getArray()));
    let AarrayTimesB = matrixA.arrayTimes(matrixB);
    console.log('matrixA.arrayTimes(matrixB) =' + JSON.stringify(AarrayTimesB.getArray()));
    let AarrayTimesEqualsB = matrixA.arrayTimesEquals(matrixB);
    console.log('matrixA.arrayTimesEquals(matrixB) =' + JSON.stringify(AarrayTimesEqualsB.getArray()));
    let AarrayRightDivideB = matrixA.arrayRightDivide(matrixB);
    console.log('matrixA.arrayRightDivide(matrixB) =' + JSON.stringify(AarrayRightDivideB.getArray()));
    let AarrayRightDivideEqualsB = matrixA.arrayRightDivideEquals(matrixB);
    console.log('matrixA.arrayRightDivideEquals(matrixB) =' + JSON.stringify(AarrayRightDivideEqualsB.getArray()));
    let AarrayLeftDivideB = matrixA.arrayLeftDivide(matrixB);
    console.log('matrixA.arrayLeftDivide(matrixB) =' + JSON.stringify(AarrayLeftDivideB.getArray()));
    let AarrayLeftDivideEqualsB = matrixA.arrayLeftDivideEquals(matrixB);
    console.log('matrixA.arrayLeftDivideEquals(matrixB) =' + JSON.stringify(AarrayLeftDivideEqualsB.getArray()));
    let Atimes$double2 = matrixA.times$double(2);
    console.log('matrixA.times$double(2) =' + JSON.stringify(Atimes$double2.getArray()));
    let AtimesEquals2 = matrixA.timesEquals(2);
    console.log(' matrixA.timesEquals(2) =' + JSON.stringify(AtimesEquals2.getArray()));
    let Atimes$Jama_MatrixB = matrixA.times$Jama_Matrix(matrixB);
    console.log('matrixA.times$Jama_Matrix(matrixB) =' + JSON.stringify(Atimes$Jama_MatrixB.getArray()));
    let AtimesB: any = matrixA.times(matrixB);
    console.log('matrixA.times(matrixB) =' + JSON.stringify(AtimesB.getArray()));
    let Alu = matrixA.lu();
    console.log(' matrixA.lu() =' + JSON.stringify(Alu.LU));
    let Aqr = matrixA.qr();
    console.log(' matrixA.qr() =' + JSON.stringify(Aqr.QR));
    let Achol = matrixA.chol();
    console.log(' matrixA.chol() =' + JSON.stringify(Achol.L));
    let Asvd = matrixA.svd();
    console.log(' matrixA.svd() U =' + JSON.stringify(Asvd.U));
    console.log(' matrixA.svd() V =' + JSON.stringify(Asvd.V));
    console.log(' matrixA.svd() s =' + JSON.stringify(Asvd.s));
    console.log(' matrixA.svd() m =' + JSON.stringify(Asvd.m));
    console.log(' matrixA.svd() n =' + JSON.stringify(Asvd.n));
    let Aeig = matrixA.eig();
    console.log(' matrixA.eig() H =' + JSON.stringify(Aeig.H));
    console.log(' matrixA.eig() V =' + JSON.stringify(Aeig.V));
    console.log(' matrixA.eig() d =' + JSON.stringify(Aeig.d));
    console.log(' matrixA.eig() e =' + JSON.stringify(Aeig.e));
    console.log(' matrixA.eig() n =' + JSON.stringify(Aeig.n));
    console.log(' matrixA.eig() ort =' + JSON.stringify(Aeig.ort));
    let AsolveB = matrixA.solve(matrixB);
    console.log(' matrixA.solve(matrixB)=' + JSON.stringify(AsolveB.getArray()));
    let AsolveTransposeB = matrixA.solveTranspose(matrixB);
    console.log(' matrixA.solveTranspose(matrixB)=' + JSON.stringify(AsolveTransposeB.getArray()));
    let Ainverse = matrixA.inverse();
    console.log(' matrixA.inverse()=' + JSON.stringify(Ainverse.getArray()));
    let Adet = matrixA.det();
    console.log(' matrixA.det()=' + JSON.stringify(Adet));
    let Arank = matrixA.rank();
    console.log(' matrixA.rank()=' + JSON.stringify(Arank));
    let Acond = matrixA.cond();
    console.log(' matrixA.cond()=' + JSON.stringify(Acond));
    let Atrace = matrixA.trace();
    console.log(' matrixA.trace()=' + JSON.stringify(Atrace));
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__A00 = new ObservedPropertySimple(0, this, "A00");
        this.__A01 = new ObservedPropertySimple(0, this, "A01");
        this.__A10 = new ObservedPropertySimple(0, this, "A10");
        this.__A11 = new ObservedPropertySimple(0, this, "A11");
        this.__B00 = new ObservedPropertySimple(0, this, "B00");
        this.__B01 = new ObservedPropertySimple(0, this, "B01");
        this.__B10 = new ObservedPropertySimple(0, this, "B10");
        this.__B11 = new ObservedPropertySimple(0, this, "B11");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.A00 !== undefined) {
            this.A00 = params.A00;
        }
        if (params.A01 !== undefined) {
            this.A01 = params.A01;
        }
        if (params.A10 !== undefined) {
            this.A10 = params.A10;
        }
        if (params.A11 !== undefined) {
            this.A11 = params.A11;
        }
        if (params.B00 !== undefined) {
            this.B00 = params.B00;
        }
        if (params.B01 !== undefined) {
            this.B01 = params.B01;
        }
        if (params.B10 !== undefined) {
            this.B10 = params.B10;
        }
        if (params.B11 !== undefined) {
            this.B11 = params.B11;
        }
    }
    aboutToBeDeleted() {
        this.__A00.aboutToBeDeleted();
        this.__A01.aboutToBeDeleted();
        this.__A10.aboutToBeDeleted();
        this.__A11.aboutToBeDeleted();
        this.__B00.aboutToBeDeleted();
        this.__B01.aboutToBeDeleted();
        this.__B10.aboutToBeDeleted();
        this.__B11.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __A00: ObservedPropertySimple<number>;
    get A00() {
        return this.__A00.get();
    }
    set A00(newValue: number) {
        this.__A00.set(newValue);
    }
    private __A01: ObservedPropertySimple<number>;
    get A01() {
        return this.__A01.get();
    }
    set A01(newValue: number) {
        this.__A01.set(newValue);
    }
    private __A10: ObservedPropertySimple<number>;
    get A10() {
        return this.__A10.get();
    }
    set A10(newValue: number) {
        this.__A10.set(newValue);
    }
    private __A11: ObservedPropertySimple<number>;
    get A11() {
        return this.__A11.get();
    }
    set A11(newValue: number) {
        this.__A11.set(newValue);
    }
    private __B00: ObservedPropertySimple<number>;
    get B00() {
        return this.__B00.get();
    }
    set B00(newValue: number) {
        this.__B00.set(newValue);
    }
    private __B01: ObservedPropertySimple<number>;
    get B01() {
        return this.__B01.get();
    }
    set B01(newValue: number) {
        this.__B01.set(newValue);
    }
    private __B10: ObservedPropertySimple<number>;
    get B10() {
        return this.__B10.get();
    }
    set B10(newValue: number) {
        this.__B10.set(newValue);
    }
    private __B11: ObservedPropertySimple<number>;
    get B11() {
        return this.__B11.get();
    }
    set B11(newValue: number) {
        this.__B11.set(newValue);
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Button.createWithLabel('随机数据测试Matrix');
        Button.fontSize(50);
        Button.fontWeight(FontWeight.Bold);
        Button.onClick(() => {
            //求解 3x3 线性系统 Ax=b 并计算残差范数
            let array: number[][] = [[1., 2., 3], [4., 5., 6.], [7., 8., 10.]];
            let A: Matrix = new Matrix(array);
            let b: Matrix = Matrix.random(3, 1);
            let x: Matrix = A.solve(b);
            let Residual: Matrix = A.times(x).minus(b);
            let rnorm: number = Residual.normInf();
            console.info("Matrix = " + rnorm, b, x, A.times(x), Residual);
        });
        Button.pop();
        Button.createWithLabel('example show log');
        Button.onClick(() => {
            let task = new taskpool.Task(startTest);
            taskpool.execute(task).then(() => {
            }).catch((err: any) => {
                console.log('startTest is err =' + err.message);
            });
        });
        Button.pop();
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.margin({ bottom: 5 });
        Text.create("设置矩阵A,只支持number");
        Text.pop();
        TextArea.create({ placeholder: '二维矩阵A输入00' });
        TextArea.placeholderColor("rgb(0,0,35)");
        TextArea.placeholderFont({ size: 20, weight: 100, family: 'cursive', style: FontStyle.Italic });
        TextArea.textAlign(TextAlign.Center);
        TextArea.caretColor(Color.Blue);
        TextArea.height(40);
        TextArea.width(144);
        TextArea.fontSize(20);
        TextArea.fontWeight(FontWeight.Bold);
        TextArea.fontFamily("sans-serif");
        TextArea.fontStyle(FontStyle.Normal);
        TextArea.fontColor(Color.Red);
        TextArea.onChange((value: string) => {
            try {
                this.A00 = Number(value);
            }
            catch (e) {
                console.log('e.msg=' + e.meesage);
            }
        });
        TextArea.create({ placeholder: '二维矩阵A输入01' });
        TextArea.placeholderColor("rgb(0,0,180)");
        TextArea.placeholderFont({ size: 20, weight: 100, family: 'cursive', style: FontStyle.Italic });
        TextArea.textAlign(TextAlign.Center);
        TextArea.caretColor(Color.Blue);
        TextArea.height(40);
        TextArea.width(145);
        TextArea.fontSize(20);
        TextArea.fontWeight(FontWeight.Bold);
        TextArea.fontFamily("sans-serif");
        TextArea.fontStyle(FontStyle.Normal);
        TextArea.fontColor(Color.Red);
        TextArea.onChange((value: string) => {
            try {
                this.A01 = Number(value);
            }
            catch (e) {
                console.log('e.msg=' + e.meesage);
            }
        });
        Flex.pop();
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.margin({ bottom: 5 });
        TextArea.create({ placeholder: '二维矩阵A输入10' });
        TextArea.placeholderColor("rgb(0,0,35)");
        TextArea.placeholderFont({ size: 20, weight: 100, family: 'cursive', style: FontStyle.Italic });
        TextArea.textAlign(TextAlign.Center);
        TextArea.caretColor(Color.Blue);
        TextArea.height(40);
        TextArea.width(144);
        TextArea.fontSize(20);
        TextArea.fontWeight(FontWeight.Bold);
        TextArea.fontFamily("sans-serif");
        TextArea.fontStyle(FontStyle.Normal);
        TextArea.fontColor(Color.Red);
        TextArea.onChange((value: string) => {
            try {
                this.A10 = Number(value);
            }
            catch (e) {
                console.log('e.msg=' + e.meesage);
            }
        });
        TextArea.create({ placeholder: '二维矩阵A输入11' });
        TextArea.placeholderColor("rgb(0,0,180)");
        TextArea.placeholderFont({ size: 20, weight: 100, family: 'cursive', style: FontStyle.Italic });
        TextArea.textAlign(TextAlign.Center);
        TextArea.caretColor(Color.Blue);
        TextArea.height(40);
        TextArea.width(145);
        TextArea.fontSize(20);
        TextArea.fontWeight(FontWeight.Bold);
        TextArea.fontFamily("sans-serif");
        TextArea.fontStyle(FontStyle.Normal);
        TextArea.fontColor(Color.Red);
        TextArea.onChange((value: string) => {
            try {
                this.A11 = Number(value);
            }
            catch (e) {
                console.log('e.msg=' + e.meesage);
            }
        });
        Flex.pop();
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.margin({ bottom: 5 });
        Text.create("设置矩阵B,只支持number");
        Text.pop();
        TextArea.create({ placeholder: '二维矩阵B输入00' });
        TextArea.placeholderColor("rgb(0,0,35)");
        TextArea.placeholderFont({ size: 20, weight: 100, family: 'cursive', style: FontStyle.Italic });
        TextArea.textAlign(TextAlign.Center);
        TextArea.caretColor(Color.Blue);
        TextArea.height(40);
        TextArea.width(144);
        TextArea.fontSize(20);
        TextArea.fontWeight(FontWeight.Bold);
        TextArea.fontFamily("sans-serif");
        TextArea.fontStyle(FontStyle.Normal);
        TextArea.fontColor(Color.Red);
        TextArea.onChange((value: string) => {
            try {
                this.B00 = Number(value);
            }
            catch (e) {
                console.log('e.msg=' + e.meesage);
            }
        });
        TextArea.create({ placeholder: '二维矩阵B输入01' });
        TextArea.placeholderColor("rgb(0,0,180)");
        TextArea.placeholderFont({ size: 20, weight: 100, family: 'cursive', style: FontStyle.Italic });
        TextArea.textAlign(TextAlign.Center);
        TextArea.caretColor(Color.Blue);
        TextArea.height(40);
        TextArea.width(145);
        TextArea.fontSize(20);
        TextArea.fontWeight(FontWeight.Bold);
        TextArea.fontFamily("sans-serif");
        TextArea.fontStyle(FontStyle.Normal);
        TextArea.fontColor(Color.Red);
        TextArea.onChange((value: string) => {
            try {
                this.B01 = Number(value);
            }
            catch (e) {
                console.log('e.msg=' + e.meesage);
            }
        });
        Flex.pop();
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.margin({ bottom: 5 });
        TextArea.create({ placeholder: '二维矩阵B输入10' });
        TextArea.placeholderColor("rgb(0,0,35)");
        TextArea.placeholderFont({ size: 20, weight: 100, family: 'cursive', style: FontStyle.Italic });
        TextArea.textAlign(TextAlign.Center);
        TextArea.caretColor(Color.Blue);
        TextArea.height(40);
        TextArea.width(144);
        TextArea.fontSize(20);
        TextArea.fontWeight(FontWeight.Bold);
        TextArea.fontFamily("sans-serif");
        TextArea.fontStyle(FontStyle.Normal);
        TextArea.fontColor(Color.Red);
        TextArea.onChange((value: string) => {
            try {
                this.B10 = Number(value);
            }
            catch (e) {
                console.log('e.msg=' + e.meesage);
            }
        });
        TextArea.create({ placeholder: '二维矩阵B输入11' });
        TextArea.placeholderColor("rgb(0,0,180)");
        TextArea.placeholderFont({ size: 20, weight: 100, family: 'cursive', style: FontStyle.Italic });
        TextArea.textAlign(TextAlign.Center);
        TextArea.caretColor(Color.Blue);
        TextArea.height(40);
        TextArea.width(145);
        TextArea.fontSize(20);
        TextArea.fontWeight(FontWeight.Bold);
        TextArea.fontFamily("sans-serif");
        TextArea.fontStyle(FontStyle.Normal);
        TextArea.fontColor(Color.Red);
        TextArea.onChange((value: string) => {
            try {
                this.B11 = Number(value);
            }
            catch (e) {
                console.log('e.msg=' + e.meesage);
            }
        });
        Flex.pop();
        Button.createWithLabel('设置好A,B矩阵后，点击进行各类运算');
        Button.onClick(() => {
            let arrayA = [[this.A00, this.A01], [this.A10, this.A11]];
            let arrayB = [[this.B00, this.B01], [this.B10, this.B11]];
            let task = new taskpool.Task(startTest2, arrayA, arrayB);
            taskpool.execute(task).then(() => {
            })
                .catch((err: any) => {
                console.log('startTest2 is err = ' + err.message);
            });
        });
        Button.pop();
        Flex.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
