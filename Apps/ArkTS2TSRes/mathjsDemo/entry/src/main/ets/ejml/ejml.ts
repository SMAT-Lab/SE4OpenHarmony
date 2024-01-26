interface Index_Params {
    scroller?: Scroller;
    _matrix?: Matrix;
    MyMatrix?: Matrix;
    MyMatrixA?: Matrix;
    MyMatrixB?: Matrix;
    addAB?: Matrix;
    subAB?: Matrix;
    mulAB?: Matrix;
    divAB?: Matrix;
    modAB?: Matrix;
    maxAB?: Matrix;
    minAB?: Matrix;
    expAB?: Matrix;
    cosAB?: Matrix;
    setAB?: Matrix;
    diagAB?: number[];
    randMatrix?: Matrix;
    edMatrix?: EigenvalueDecomposition;
    inMatrix?: Matrix;
    transposeMatrix?: Matrix;
    eigenvalueMatrix?: Matrix;
    eigenvalueMatrix1?: Matrix;
    eigenvalueMatrix2?: Array<number>;
    mathTimeEigenvalue?: string;
    mathTimeLu?: string;
    luMatrix?: Matrix;
    luMatrix1?: Matrix;
    luMatrix2?: Array<number>;
    SVDMatrix?: SingularValueDecomposition;
    mathTimeSVD?: string;
    mathTimeCholesky?: string;
    CholeskyMatrix?: Matrix;
    SymmetricMatrixCholesky?: string;
    SymmetricMatrixSVD?: string;
    SymmetricMatrixEigenvalue?: string;
    nRows?: number;
    nColumns?: number;
    randnRows?: number;
    randnColumns?: number;
    rowIndex?: number;
    columnIndex?: number;
    setValue?: number;
    MatrixA?: string;
    MatrixB?: string;
    SymmetricMatrix?: string;
    ludigMatrix?: string;
    inverseMatrix?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ejml_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import { Matrix, EigenvalueDecomposition, CholeskyDecomposition, LuDecomposition, inverse, SingularValueDecomposition } from 'ml-matrix';
import router from '@ohos.router';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.scroller = new Scroller();
        this._matrix = new Matrix(0, 0);
        this.__MyMatrix = new ObservedPropertyObject(this._matrix, this, "MyMatrix");
        this.__MyMatrixA = new ObservedPropertyObject(this._matrix, this, "MyMatrixA");
        this.__MyMatrixB = new ObservedPropertyObject(this._matrix, this, "MyMatrixB");
        this.__addAB = new ObservedPropertyObject(this._matrix, this, "addAB");
        this.__subAB = new ObservedPropertyObject(this._matrix, this, "subAB");
        this.__mulAB = new ObservedPropertyObject(this._matrix, this, "mulAB");
        this.__divAB = new ObservedPropertyObject(this._matrix, this, "divAB");
        this.__modAB = new ObservedPropertyObject(this._matrix, this, "modAB");
        this.__maxAB = new ObservedPropertyObject(this._matrix, this, "maxAB");
        this.__minAB = new ObservedPropertyObject(this._matrix, this, "minAB");
        this.__expAB = new ObservedPropertyObject(this._matrix, this, "expAB");
        this.__cosAB = new ObservedPropertyObject(this._matrix, this, "cosAB");
        this.__setAB = new ObservedPropertyObject(this._matrix, this, "setAB");
        this.__diagAB = new ObservedPropertyObject([], this, "diagAB");
        this.__randMatrix = new ObservedPropertyObject(this._matrix, this, "randMatrix");
        this.__edMatrix = new ObservedPropertyObject(new EigenvalueDecomposition([[1, 0, 0], [0, 1, 0], [0, 0, 1]]), this, "edMatrix");
        this.__inMatrix = new ObservedPropertyObject(new Matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]), this, "inMatrix");
        this.__transposeMatrix = new ObservedPropertyObject(new Matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]), this, "transposeMatrix");
        this.__eigenvalueMatrix = new ObservedPropertyObject(new Matrix([]), this, "eigenvalueMatrix");
        this.__eigenvalueMatrix1 = new ObservedPropertyObject(new Matrix([]), this, "eigenvalueMatrix1");
        this.__eigenvalueMatrix2 = new ObservedPropertyObject(new Array<number>(0), this, "eigenvalueMatrix2");
        this.__mathTimeEigenvalue = new ObservedPropertySimple('0', this, "mathTimeEigenvalue");
        this.__mathTimeLu = new ObservedPropertySimple('0', this, "mathTimeLu");
        this.__luMatrix = new ObservedPropertyObject(new Matrix([]), this, "luMatrix");
        this.__luMatrix1 = new ObservedPropertyObject(new Matrix([]), this, "luMatrix1");
        this.__luMatrix2 = new ObservedPropertyObject(new Array<number>(0), this, "luMatrix2");
        this.__SVDMatrix = new ObservedPropertyObject(new SingularValueDecomposition([[1, 0, 0], [0, 1, 0], [0, 0, 1]]), this, "SVDMatrix");
        this.__mathTimeSVD = new ObservedPropertySimple('0', this, "mathTimeSVD");
        this.__mathTimeCholesky = new ObservedPropertySimple('0', this, "mathTimeCholesky");
        this.__CholeskyMatrix = new ObservedPropertyObject(new Matrix([]), this, "CholeskyMatrix");
        this.SymmetricMatrixCholesky = '10,1,10;1,10,1;10,1,10';
        this.SymmetricMatrixSVD = '10,1,10;1,10,1;10,1,10';
        this.SymmetricMatrixEigenvalue = '10,1,10;1,10,1;10,1,10';
        this.nRows = 0;
        this.nColumns = 0;
        this.randnRows = 0;
        this.randnColumns = 0;
        this.rowIndex = 0;
        this.columnIndex = 0;
        this.setValue = 0;
        this.MatrixA = '1,3,2,5,6;1,2,4,5,5;2,6,9,8,7';
        this.MatrixB = '2,3,2,5,5;3,2,4,5,5;9,8,6,5,8';
        this.SymmetricMatrix = '10,1,10;1,10,1;10,1,10';
        this.ludigMatrix = '1,0,0;0,1,0;0,0,1';
        this.inverseMatrix = '1,0,0;0,1,0;0,0,1';
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params._matrix !== undefined) {
            this._matrix = params._matrix;
        }
        if (params.MyMatrix !== undefined) {
            this.MyMatrix = params.MyMatrix;
        }
        if (params.MyMatrixA !== undefined) {
            this.MyMatrixA = params.MyMatrixA;
        }
        if (params.MyMatrixB !== undefined) {
            this.MyMatrixB = params.MyMatrixB;
        }
        if (params.addAB !== undefined) {
            this.addAB = params.addAB;
        }
        if (params.subAB !== undefined) {
            this.subAB = params.subAB;
        }
        if (params.mulAB !== undefined) {
            this.mulAB = params.mulAB;
        }
        if (params.divAB !== undefined) {
            this.divAB = params.divAB;
        }
        if (params.modAB !== undefined) {
            this.modAB = params.modAB;
        }
        if (params.maxAB !== undefined) {
            this.maxAB = params.maxAB;
        }
        if (params.minAB !== undefined) {
            this.minAB = params.minAB;
        }
        if (params.expAB !== undefined) {
            this.expAB = params.expAB;
        }
        if (params.cosAB !== undefined) {
            this.cosAB = params.cosAB;
        }
        if (params.setAB !== undefined) {
            this.setAB = params.setAB;
        }
        if (params.diagAB !== undefined) {
            this.diagAB = params.diagAB;
        }
        if (params.randMatrix !== undefined) {
            this.randMatrix = params.randMatrix;
        }
        if (params.edMatrix !== undefined) {
            this.edMatrix = params.edMatrix;
        }
        if (params.inMatrix !== undefined) {
            this.inMatrix = params.inMatrix;
        }
        if (params.transposeMatrix !== undefined) {
            this.transposeMatrix = params.transposeMatrix;
        }
        if (params.eigenvalueMatrix !== undefined) {
            this.eigenvalueMatrix = params.eigenvalueMatrix;
        }
        if (params.eigenvalueMatrix1 !== undefined) {
            this.eigenvalueMatrix1 = params.eigenvalueMatrix1;
        }
        if (params.eigenvalueMatrix2 !== undefined) {
            this.eigenvalueMatrix2 = params.eigenvalueMatrix2;
        }
        if (params.mathTimeEigenvalue !== undefined) {
            this.mathTimeEigenvalue = params.mathTimeEigenvalue;
        }
        if (params.mathTimeLu !== undefined) {
            this.mathTimeLu = params.mathTimeLu;
        }
        if (params.luMatrix !== undefined) {
            this.luMatrix = params.luMatrix;
        }
        if (params.luMatrix1 !== undefined) {
            this.luMatrix1 = params.luMatrix1;
        }
        if (params.luMatrix2 !== undefined) {
            this.luMatrix2 = params.luMatrix2;
        }
        if (params.SVDMatrix !== undefined) {
            this.SVDMatrix = params.SVDMatrix;
        }
        if (params.mathTimeSVD !== undefined) {
            this.mathTimeSVD = params.mathTimeSVD;
        }
        if (params.mathTimeCholesky !== undefined) {
            this.mathTimeCholesky = params.mathTimeCholesky;
        }
        if (params.CholeskyMatrix !== undefined) {
            this.CholeskyMatrix = params.CholeskyMatrix;
        }
        if (params.SymmetricMatrixCholesky !== undefined) {
            this.SymmetricMatrixCholesky = params.SymmetricMatrixCholesky;
        }
        if (params.SymmetricMatrixSVD !== undefined) {
            this.SymmetricMatrixSVD = params.SymmetricMatrixSVD;
        }
        if (params.SymmetricMatrixEigenvalue !== undefined) {
            this.SymmetricMatrixEigenvalue = params.SymmetricMatrixEigenvalue;
        }
        if (params.nRows !== undefined) {
            this.nRows = params.nRows;
        }
        if (params.nColumns !== undefined) {
            this.nColumns = params.nColumns;
        }
        if (params.randnRows !== undefined) {
            this.randnRows = params.randnRows;
        }
        if (params.randnColumns !== undefined) {
            this.randnColumns = params.randnColumns;
        }
        if (params.rowIndex !== undefined) {
            this.rowIndex = params.rowIndex;
        }
        if (params.columnIndex !== undefined) {
            this.columnIndex = params.columnIndex;
        }
        if (params.setValue !== undefined) {
            this.setValue = params.setValue;
        }
        if (params.MatrixA !== undefined) {
            this.MatrixA = params.MatrixA;
        }
        if (params.MatrixB !== undefined) {
            this.MatrixB = params.MatrixB;
        }
        if (params.SymmetricMatrix !== undefined) {
            this.SymmetricMatrix = params.SymmetricMatrix;
        }
        if (params.ludigMatrix !== undefined) {
            this.ludigMatrix = params.ludigMatrix;
        }
        if (params.inverseMatrix !== undefined) {
            this.inverseMatrix = params.inverseMatrix;
        }
    }
    aboutToBeDeleted() {
        this.__MyMatrix.aboutToBeDeleted();
        this.__MyMatrixA.aboutToBeDeleted();
        this.__MyMatrixB.aboutToBeDeleted();
        this.__addAB.aboutToBeDeleted();
        this.__subAB.aboutToBeDeleted();
        this.__mulAB.aboutToBeDeleted();
        this.__divAB.aboutToBeDeleted();
        this.__modAB.aboutToBeDeleted();
        this.__maxAB.aboutToBeDeleted();
        this.__minAB.aboutToBeDeleted();
        this.__expAB.aboutToBeDeleted();
        this.__cosAB.aboutToBeDeleted();
        this.__setAB.aboutToBeDeleted();
        this.__diagAB.aboutToBeDeleted();
        this.__randMatrix.aboutToBeDeleted();
        this.__edMatrix.aboutToBeDeleted();
        this.__inMatrix.aboutToBeDeleted();
        this.__transposeMatrix.aboutToBeDeleted();
        this.__eigenvalueMatrix.aboutToBeDeleted();
        this.__eigenvalueMatrix1.aboutToBeDeleted();
        this.__eigenvalueMatrix2.aboutToBeDeleted();
        this.__mathTimeEigenvalue.aboutToBeDeleted();
        this.__mathTimeLu.aboutToBeDeleted();
        this.__luMatrix.aboutToBeDeleted();
        this.__luMatrix1.aboutToBeDeleted();
        this.__luMatrix2.aboutToBeDeleted();
        this.__SVDMatrix.aboutToBeDeleted();
        this.__mathTimeSVD.aboutToBeDeleted();
        this.__mathTimeCholesky.aboutToBeDeleted();
        this.__CholeskyMatrix.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private scroller: Scroller;
    private _matrix: Matrix;
    private __MyMatrix: ObservedPropertyObject<Matrix>;
    get MyMatrix() {
        return this.__MyMatrix.get();
    }
    set MyMatrix(newValue: Matrix) {
        this.__MyMatrix.set(newValue);
    }
    private __MyMatrixA: ObservedPropertyObject<Matrix>;
    get MyMatrixA() {
        return this.__MyMatrixA.get();
    }
    set MyMatrixA(newValue: Matrix) {
        this.__MyMatrixA.set(newValue);
    }
    private __MyMatrixB: ObservedPropertyObject<Matrix>;
    get MyMatrixB() {
        return this.__MyMatrixB.get();
    }
    set MyMatrixB(newValue: Matrix) {
        this.__MyMatrixB.set(newValue);
    }
    private __addAB: ObservedPropertyObject<Matrix>;
    get addAB() {
        return this.__addAB.get();
    }
    set addAB(newValue: Matrix) {
        this.__addAB.set(newValue);
    }
    private __subAB: ObservedPropertyObject<Matrix>;
    get subAB() {
        return this.__subAB.get();
    }
    set subAB(newValue: Matrix) {
        this.__subAB.set(newValue);
    }
    private __mulAB: ObservedPropertyObject<Matrix>;
    get mulAB() {
        return this.__mulAB.get();
    }
    set mulAB(newValue: Matrix) {
        this.__mulAB.set(newValue);
    }
    private __divAB: ObservedPropertyObject<Matrix>;
    get divAB() {
        return this.__divAB.get();
    }
    set divAB(newValue: Matrix) {
        this.__divAB.set(newValue);
    }
    private __modAB: ObservedPropertyObject<Matrix>;
    get modAB() {
        return this.__modAB.get();
    }
    set modAB(newValue: Matrix) {
        this.__modAB.set(newValue);
    }
    private __maxAB: ObservedPropertyObject<Matrix>;
    get maxAB() {
        return this.__maxAB.get();
    }
    set maxAB(newValue: Matrix) {
        this.__maxAB.set(newValue);
    }
    private __minAB: ObservedPropertyObject<Matrix>;
    get minAB() {
        return this.__minAB.get();
    }
    set minAB(newValue: Matrix) {
        this.__minAB.set(newValue);
    }
    private __expAB: ObservedPropertyObject<Matrix>;
    get expAB() {
        return this.__expAB.get();
    }
    set expAB(newValue: Matrix) {
        this.__expAB.set(newValue);
    }
    private __cosAB: ObservedPropertyObject<Matrix>;
    get cosAB() {
        return this.__cosAB.get();
    }
    set cosAB(newValue: Matrix) {
        this.__cosAB.set(newValue);
    }
    private __setAB: ObservedPropertyObject<Matrix>;
    get setAB() {
        return this.__setAB.get();
    }
    set setAB(newValue: Matrix) {
        this.__setAB.set(newValue);
    }
    private __diagAB: ObservedPropertyObject<number[]>;
    get diagAB() {
        return this.__diagAB.get();
    }
    set diagAB(newValue: number[]) {
        this.__diagAB.set(newValue);
    }
    private __randMatrix: ObservedPropertyObject<Matrix>;
    get randMatrix() {
        return this.__randMatrix.get();
    }
    set randMatrix(newValue: Matrix) {
        this.__randMatrix.set(newValue);
    }
    private __edMatrix: ObservedPropertyObject<EigenvalueDecomposition>;
    get edMatrix() {
        return this.__edMatrix.get();
    }
    set edMatrix(newValue: EigenvalueDecomposition) {
        this.__edMatrix.set(newValue);
    }
    private __inMatrix: ObservedPropertyObject<Matrix>;
    get inMatrix() {
        return this.__inMatrix.get();
    }
    set inMatrix(newValue: Matrix) {
        this.__inMatrix.set(newValue);
    }
    private __transposeMatrix: ObservedPropertyObject<Matrix>;
    get transposeMatrix() {
        return this.__transposeMatrix.get();
    }
    set transposeMatrix(newValue: Matrix) {
        this.__transposeMatrix.set(newValue);
    }
    private __eigenvalueMatrix: ObservedPropertyObject<Matrix>;
    get eigenvalueMatrix() {
        return this.__eigenvalueMatrix.get();
    }
    set eigenvalueMatrix(newValue: Matrix) {
        this.__eigenvalueMatrix.set(newValue);
    }
    private __eigenvalueMatrix1: ObservedPropertyObject<Matrix>;
    get eigenvalueMatrix1() {
        return this.__eigenvalueMatrix1.get();
    }
    set eigenvalueMatrix1(newValue: Matrix) {
        this.__eigenvalueMatrix1.set(newValue);
    }
    private __eigenvalueMatrix2: ObservedPropertyObject<Array<number>>;
    get eigenvalueMatrix2() {
        return this.__eigenvalueMatrix2.get();
    }
    set eigenvalueMatrix2(newValue: Array<number>) {
        this.__eigenvalueMatrix2.set(newValue);
    }
    private __mathTimeEigenvalue: ObservedPropertySimple<string>;
    get mathTimeEigenvalue() {
        return this.__mathTimeEigenvalue.get();
    }
    set mathTimeEigenvalue(newValue: string) {
        this.__mathTimeEigenvalue.set(newValue);
    }
    private __mathTimeLu: ObservedPropertySimple<string>;
    get mathTimeLu() {
        return this.__mathTimeLu.get();
    }
    set mathTimeLu(newValue: string) {
        this.__mathTimeLu.set(newValue);
    }
    private __luMatrix: ObservedPropertyObject<Matrix>;
    get luMatrix() {
        return this.__luMatrix.get();
    }
    set luMatrix(newValue: Matrix) {
        this.__luMatrix.set(newValue);
    }
    private __luMatrix1: ObservedPropertyObject<Matrix>;
    get luMatrix1() {
        return this.__luMatrix1.get();
    }
    set luMatrix1(newValue: Matrix) {
        this.__luMatrix1.set(newValue);
    }
    private __luMatrix2: ObservedPropertyObject<Array<number>>;
    get luMatrix2() {
        return this.__luMatrix2.get();
    }
    set luMatrix2(newValue: Array<number>) {
        this.__luMatrix2.set(newValue);
    }
    private __SVDMatrix: ObservedPropertyObject<SingularValueDecomposition>;
    get SVDMatrix() {
        return this.__SVDMatrix.get();
    }
    set SVDMatrix(newValue: SingularValueDecomposition) {
        this.__SVDMatrix.set(newValue);
    }
    private __mathTimeSVD: ObservedPropertySimple<string>;
    get mathTimeSVD() {
        return this.__mathTimeSVD.get();
    }
    set mathTimeSVD(newValue: string) {
        this.__mathTimeSVD.set(newValue);
    }
    private __mathTimeCholesky: ObservedPropertySimple<string>;
    get mathTimeCholesky() {
        return this.__mathTimeCholesky.get();
    }
    set mathTimeCholesky(newValue: string) {
        this.__mathTimeCholesky.set(newValue);
    }
    private __CholeskyMatrix: ObservedPropertyObject<Matrix>;
    get CholeskyMatrix() {
        return this.__CholeskyMatrix.get();
    }
    set CholeskyMatrix(newValue: Matrix) {
        this.__CholeskyMatrix.set(newValue);
    }
    private SymmetricMatrixCholesky: string;
    private SymmetricMatrixSVD: string;
    private SymmetricMatrixEigenvalue: string;
    private nRows: number;
    private nColumns: number;
    private randnRows: number;
    private randnColumns: number;
    private rowIndex: number;
    private columnIndex: number;
    private setValue: number;
    private MatrixA: string;
    private MatrixB: string;
    private SymmetricMatrix: string;
    private ludigMatrix: string;
    private inverseMatrix: string;
    render() {
        Scroll.create(this.scroller);
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.scrollBar(BarState.On);
        Scroll.scrollBarColor(Color.Gray);
        Scroll.scrollBarWidth(30);
        Scroll.onScroll((xOffset: number, yOffset: number) => {
            console.info(xOffset + ' ' + yOffset);
        });
        Scroll.onScrollEdge((side: Edge) => {
            console.info('To the edge');
        });
        Scroll.onScrollEnd(() => {
            console.info('Scroll Stop');
        });
        Column.create();
        Column.width('100%');
        Text.create('矩阵测试');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入对称矩阵 如： 10,1,10;1,10,1;10,1,10' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value) => {
            this.SymmetricMatrixCholesky = value;
        });
        Text.create('Cholesky分解');
        Text.fontSize(16);
        Text.margin({ top: 32 });
        Text.padding(8);
        Text.border({ width: 2, color: '#535353', radius: 6 });
        Text.onClick(() => {
            try {
                let time = Date.now();
                let l: CholeskyDecomposition = new CholeskyDecomposition(new Matrix(this.strTransformationArr(this.SymmetricMatrixCholesky)));
                this.CholeskyMatrix = l.lowerTriangularMatrix;
                let time1 = Date.now();
                this.mathTimeCholesky = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create('Cholesky分解: ' + JSON.stringify(ObservedObject.GetRawObject(this.CholeskyMatrix)));
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeCholesky);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入对称矩阵 如： 10,1,10;1,10,1;10,1,10' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value) => {
            this.SymmetricMatrixSVD = value;
        });
        Text.create('SVD分解');
        Text.fontSize(16);
        Text.margin({ top: 32 });
        Text.padding(8);
        Text.border({ width: 2, color: '#535353', radius: 6 });
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.SVDMatrix = new SingularValueDecomposition(new Matrix(this.strTransformationArr(this.SymmetricMatrixSVD)));
                let time1 = Date.now();
                this.mathTimeSVD = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create('SVD diagonalMatrix分解: ' + JSON.stringify(ObservedObject.GetRawObject(this.SVDMatrix)));
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create('SVD diagonalMatrix分解norm2: ' + JSON.stringify(this.SVDMatrix.norm2));
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create('SVD diagonalMatrix分解threshold: ' + JSON.stringify(this.SVDMatrix.threshold));
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create('SVD diagonalMatrix分解leftSingularVectors: ' + JSON.stringify(this.SVDMatrix.leftSingularVectors));
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create('SVD diagonalMatrix分解condition: ' + JSON.stringify(this.SVDMatrix.condition));
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create('SVD diagonalMatrix分解rank: ' + JSON.stringify(this.SVDMatrix.rank));
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create('SVD diagonalMatrix分解rightSingularVectors: ' + JSON.stringify(this.SVDMatrix.rightSingularVectors));
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create('SVD diagonalMatrix分解diagonal: ' + JSON.stringify(this.SVDMatrix.diagonal));
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create('SVD diagonalMatrix分解diagonalMatrix: ' + JSON.stringify(this.SVDMatrix.diagonalMatrix));
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeSVD);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入对称矩阵 如： 10,1,10;1,10,1;10,1,10' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value) => {
            this.SymmetricMatrix = value;
        });
        Text.create('特征分解');
        Text.fontSize(16);
        Text.margin({ top: 32 });
        Text.padding(8);
        Text.border({ width: 2, color: '#535353', radius: 6 });
        Text.onClick(() => {
            try {
                let time = Date.now();
                let l: EigenvalueDecomposition = new EigenvalueDecomposition(new Matrix(this.strTransformationArr(this.SymmetricMatrix)));
                this.eigenvalueMatrix = l.diagonalMatrix;
                this.eigenvalueMatrix1 = l.eigenvectorMatrix;
                this.eigenvalueMatrix2 = l.realEigenvalues;
                let time1 = Date.now();
                this.mathTimeEigenvalue = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create('Eigenvalue diagonalMatrix: ' + JSON.stringify(ObservedObject.GetRawObject(this.eigenvalueMatrix)));
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create('Eigenvalue eigenvectorMatrix: ' + JSON.stringify(ObservedObject.GetRawObject(this.eigenvalueMatrix1)));
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create('Eigenvalue realEigenvalues: ' + JSON.stringify(ObservedObject.GetRawObject(this.eigenvalueMatrix2)));
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeEigenvalue);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入nRows' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.nRows = Number(value);
        });
        TextInput.create({ placeholder: '请输入nColumns' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.nColumns = Number(value);
        });
        Text.create('生成矩阵');
        Text.fontSize(16);
        Text.margin({ top: 32 });
        Text.padding(8);
        Text.border({ width: 2, color: '#535353', radius: 6 });
        Text.onClick(() => {
            try {
                this.MyMatrix = new Matrix(this.nRows, this.nColumns);
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create('生成矩阵: ' + JSON.stringify(ObservedObject.GetRawObject(this.MyMatrix)));
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入 格式： 1,3,2,5,6;1,2,4,5,5;2,6,9,8,7' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value) => {
            this.MatrixA = value;
        });
        Text.create('生成矩阵A');
        Text.fontSize(16);
        Text.margin({ top: 32 });
        Text.padding(8);
        Text.border({ width: 2, color: '#535353', radius: 6 });
        Text.onClick(() => {
            try {
                this.MyMatrixA = new Matrix(this.strTransformationArr(this.MatrixA));
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create('生成矩阵A: ' + JSON.stringify(ObservedObject.GetRawObject(this.MyMatrixA)));
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入 格式： 2,3,2,5,5;3,2,4,5,5;9,8,6,5,8' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.MatrixB = value;
        });
        Text.create('生成矩阵B');
        Text.fontSize(16);
        Text.margin({ top: 32 });
        Text.padding(8);
        Text.border({ width: 2, color: '#535353', radius: 6 });
        Text.onClick(() => {
            try {
                this.MyMatrixB = new Matrix(this.strTransformationArr(this.MatrixB));
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create('生成矩阵B: ' + JSON.stringify(ObservedObject.GetRawObject(this.MyMatrixB)));
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create('矩阵A+B');
        Text.fontSize(16);
        Text.margin({ top: 32 });
        Text.padding(8);
        Text.border({ width: 2, color: '#535353', radius: 6 });
        Text.onClick(() => {
            try {
                this.addAB = Matrix.add(ObservedObject.GetRawObject(this.MyMatrixA), ObservedObject.GetRawObject(this.MyMatrixB));
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create('矩阵A+B: ' + JSON.stringify(ObservedObject.GetRawObject(this.addAB)));
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create('矩阵A-B');
        Text.fontSize(16);
        Text.margin({ top: 32 });
        Text.padding(8);
        Text.border({ width: 2, color: '#535353', radius: 6 });
        Text.onClick(() => {
            try {
                this.subAB = Matrix.sub(ObservedObject.GetRawObject(this.MyMatrixA), ObservedObject.GetRawObject(this.MyMatrixB));
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create('矩阵A-B: ' + JSON.stringify(ObservedObject.GetRawObject(this.subAB)));
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create('矩阵A*B');
        Text.fontSize(16);
        Text.margin({ top: 32 });
        Text.padding(8);
        Text.border({ width: 2, color: '#535353', radius: 6 });
        Text.onClick(() => {
            try {
                this.mulAB = Matrix.mul(ObservedObject.GetRawObject(this.MyMatrixA), ObservedObject.GetRawObject(this.MyMatrixB));
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create('矩阵A*B: ' + JSON.stringify(ObservedObject.GetRawObject(this.mulAB)));
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create('矩阵A div B');
        Text.fontSize(16);
        Text.margin({ top: 32 });
        Text.padding(8);
        Text.border({ width: 2, color: '#535353', radius: 6 });
        Text.onClick(() => {
            try {
                this.divAB = Matrix.div(ObservedObject.GetRawObject(this.MyMatrixA), ObservedObject.GetRawObject(this.MyMatrixB));
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create('矩阵A div B: ' + JSON.stringify(ObservedObject.GetRawObject(this.divAB)));
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create('矩阵A mod B');
        Text.fontSize(16);
        Text.margin({ top: 32 });
        Text.padding(8);
        Text.border({ width: 2, color: '#535353', radius: 6 });
        Text.onClick(() => {
            try {
                this.modAB = Matrix.mod(ObservedObject.GetRawObject(this.MyMatrixA), ObservedObject.GetRawObject(this.MyMatrixB));
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create('矩阵A mod B: ' + JSON.stringify(ObservedObject.GetRawObject(this.modAB)));
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create('矩阵A max B');
        Text.fontSize(16);
        Text.margin({ top: 32 });
        Text.padding(8);
        Text.border({ width: 2, color: '#535353', radius: 6 });
        Text.onClick(() => {
            try {
                this.maxAB = Matrix.max(ObservedObject.GetRawObject(this.MyMatrixA), ObservedObject.GetRawObject(this.MyMatrixB));
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create('矩阵A max B: ' + JSON.stringify(ObservedObject.GetRawObject(this.maxAB)));
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create('矩阵A min B');
        Text.fontSize(16);
        Text.margin({ top: 32 });
        Text.padding(8);
        Text.border({ width: 2, color: '#535353', radius: 6 });
        Text.onClick(() => {
            try {
                this.minAB = Matrix.min(ObservedObject.GetRawObject(this.MyMatrixA), ObservedObject.GetRawObject(this.MyMatrixB));
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create('矩阵A min B: ' + JSON.stringify(ObservedObject.GetRawObject(this.minAB)));
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create('矩阵A exp');
        Text.fontSize(16);
        Text.margin({ top: 32 });
        Text.padding(8);
        Text.border({ width: 2, color: '#535353', radius: 6 });
        Text.onClick(() => {
            try {
                this.expAB = Matrix.exp(ObservedObject.GetRawObject(this.MyMatrixA));
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create('矩阵A exp: ' + JSON.stringify(ObservedObject.GetRawObject(this.expAB)));
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create('矩阵A cos');
        Text.fontSize(16);
        Text.margin({ top: 32 });
        Text.padding(8);
        Text.border({ width: 2, color: '#535353', radius: 6 });
        Text.onClick(() => {
            try {
                this.cosAB = Matrix.cos(ObservedObject.GetRawObject(this.MyMatrixA));
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create('矩阵A cos: ' + JSON.stringify(ObservedObject.GetRawObject(this.cosAB)));
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入数字' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.rowIndex = Number(value);
        });
        TextInput.create({ placeholder: '请输入数字' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.columnIndex = Number(value);
        });
        TextInput.create({ placeholder: '请输入数字' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.setValue = Number(value);
        });
        Text.create('矩阵A set');
        Text.fontSize(16);
        Text.margin({ top: 32 });
        Text.padding(8);
        Text.border({ width: 2, color: '#535353', radius: 6 });
        Text.onClick(() => {
            try {
                this.setAB = this.MyMatrixA.set(this.rowIndex, this.columnIndex, this.setValue);
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create('矩阵A set: ' + JSON.stringify(ObservedObject.GetRawObject(this.setAB)));
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create('矩阵A 对角线');
        Text.fontSize(16);
        Text.margin({ top: 32 });
        Text.padding(8);
        Text.border({ width: 2, color: '#535353', radius: 6 });
        Text.onClick(() => {
            try {
                this.diagAB = this.MyMatrixA.diag();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create('矩阵A diag: ' + JSON.stringify(ObservedObject.GetRawObject(this.diagAB)));
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create('矩阵A 转置');
        Text.fontSize(16);
        Text.margin({ top: 32 });
        Text.padding(8);
        Text.border({ width: 2, color: '#535353', radius: 6 });
        Text.onClick(() => {
            try {
                this.transposeMatrix = this.MyMatrixA.transpose();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create('矩阵A transpose: ' + JSON.stringify(ObservedObject.GetRawObject(this.transposeMatrix)));
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入nRows' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.randnRows = Number(value);
        });
        TextInput.create({ placeholder: '请输入nColumns' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.randnColumns = Number(value);
        });
        Text.create('创建随机矩阵');
        Text.fontSize(16);
        Text.margin({ top: 32 });
        Text.padding(8);
        Text.border({ width: 2, color: '#535353', radius: 6 });
        Text.onClick(() => {
            try {
                this.randMatrix = Matrix.random(this.randnRows, this.randnColumns);
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create('随机矩阵: ' + JSON.stringify(ObservedObject.GetRawObject(this.randMatrix)));
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入对称矩阵 如： 1,0,0;0,1,0;0,0,1' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value) => {
            this.ludigMatrix = value;
        });
        Text.create('LU分解');
        Text.fontSize(16);
        Text.margin({ top: 32 });
        Text.padding(8);
        Text.border({ width: 2, color: '#535353', radius: 6 });
        Text.onClick(() => {
            try {
                let time = Date.now();
                let l: LuDecomposition = new LuDecomposition(new Matrix(this.strTransformationArr(this.ludigMatrix)));
                this.luMatrix = l.lowerTriangularMatrix;
                this.luMatrix1 = l.upperTriangularMatrix;
                this.luMatrix2 = l.pivotPermutationVector;
                let time1 = Date.now();
                this.mathTimeLu = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create('lu lowerTriangularMatrix: ' + JSON.stringify(ObservedObject.GetRawObject(this.luMatrix)));
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create('lu upperTriangularMatrix: ' + JSON.stringify(ObservedObject.GetRawObject(this.luMatrix1)));
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create('lu pivotPermutationVector: ' + JSON.stringify(ObservedObject.GetRawObject(this.luMatrix2)));
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeLu);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入对称矩阵 如： 1,0,0;0,1,0;0,0,1' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value) => {
            this.inverseMatrix = value;
        });
        Text.create('inverse 矩阵 ');
        Text.fontSize(16);
        Text.margin({ top: 32 });
        Text.padding(8);
        Text.border({ width: 2, color: '#535353', radius: 6 });
        Text.onClick(() => {
            try {
                this.inMatrix = inverse(new Matrix(this.strTransformationArr(this.inverseMatrix)));
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create(' inverse 矩阵: ' + JSON.stringify(ObservedObject.GetRawObject(this.inMatrix)));
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create('跳转到首页');
        Text.fontSize(20);
        Text.padding(8);
        Text.margin({ top: 52 });
        Text.fontWeight(FontWeight.Bold);
        Text.border({ width: 2, color: '#535353', radius: 6 });
        Text.onClick(() => {
            router.back();
        });
        Text.pop();
        Column.pop();
        Scroll.pop();
    }
    strTransformationArr(str: string): Array<Array<number>> {
        let arr: Array<string> = str.split(";");
        let array: Array<Array<number>> = new Array(arr.length);
        for (let i = 0; i < arr.length; i++) {
            let temp: Array<string> = new Array(2);
            temp = arr[i].split(",");
            array[i] = new Array(temp.length);
            for (let j = 0; j < temp.length; j++) {
                array[i][j] = Number(temp[j]);
            }
        }
        return array;
    }
}
loadDocument(new Index("1", undefined, {}));
