interface Index_Params {
    scroller?: Scroller;
    zerosStr?;
    mathApply?: string;
    mathTimeApply?: string;
    mathColumn?: string;
    mathTimeColumn?: string;
    mathConcat?: string;
    mathTimeConcat?: string;
    mathCount?: string;
    mathTimeCount?: string;
    mathCross?: string;
    mathTimeCross?: string;
    mathDet?: string;
    mathTimeDet?: string;
    mathDiag?: string;
    mathTimeDiag?: string;
    mathDot?: string;
    mathTimeDot?: string;
    mathExpm?: string;
    mathTimeExpm?: string;
    mathFft?: string;
    mathTimeFft?: string;
    mathFlatten?: string;
    mathTimeFlatten?: string;
    mathIdentity?: string;
    mathTimeIdentity?: string;
    mathInv?: string;
    mathTimeInv?: string;
    mathKron?: string;
    mathTimeKron?: string;
    mathOnes?: string;
    mathTimeOnes?: string;
    mathRange?: string;
    mathTimeRange?: string;
    mathReshape?: number[];
    mathTimeReshape?: string;
    mathResize?: string;
    mathTimeResize?: string;
    mathRow?: string;
    mathTimeRow?: string;
    mathSize?: string;
    mathTimeSize?: string;
    mathSort?: string;
    mathTimeSort?: string;
    mathSqueeze?: string;
    mathTimeSqueeze?: string;
    mathSubset?: string;
    mathTimeSubset?: string;
    mathTrace?: string;
    mathTimeTrace?: string;
    mathZeros?: string;
    mathTimeZeros?: string;
    mathTimeQr?: string;
    qrMatrix?: math.QRDecomposition;
    mathTime?: string;
    sparseMatrix?: math.Matrix;
    SymmetricMatrix2?: math.Matrix;
    getMatrix?: string;
    setMatrix?: math.Matrix;
    arrays?;
    SymmetricMatrixQr?;
    mathZeros1?;
    mathZeros2?;
    mathTrace1?;
    mathSubset1?;
    mathSubset2?;
    mathSubset3?;
    mathSqueeze1?;
    mathSort1?;
    mathSize1?;
    mathRow1?;
    mathRow2?;
    mathResize1?;
    mathnumResize?: number[];
    mathstr?;
    mathReshape1?;
    mathnumReshape?: number[];
    mathRange1?;
    mathRange2?;
    mathOnes1?;
    mathOnes2?;
    mathKron1?;
    mathkron2?;
    mathInv1?;
    mathIdentity1?;
    mathnumIdentity?;
    mathFlatten1?;
    mathFft1?;
    mathExpm1?;
    mathDot1?;
    mathnumDot?;
    mathDiag1?;
    mathDet1?;
    mathCross1?;
    mathnumCross?;
    mathCount1?;
    mathConcat1?;
    mathnumConcat?;
    mathColumn1?;
    mathnumColumn?;
    mathApply1?;
    mathnumApply?;
    SymmetricMatrixSparse?;
    getMatrix2?;
    setMatrix2?;
    setMatrixIndex?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ejmlMathjs_" + ++__generate__Id;
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
import * as math from 'mathjs';
import router from '@ohos.router';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.scroller = new Scroller();
        this.zerosStr = '0';
        this.__mathApply = new ObservedPropertySimple(this.zerosStr, this, "mathApply");
        this.__mathTimeApply = new ObservedPropertySimple(this.zerosStr, this, "mathTimeApply");
        this.__mathColumn = new ObservedPropertySimple(this.zerosStr, this, "mathColumn");
        this.__mathTimeColumn = new ObservedPropertySimple(this.zerosStr, this, "mathTimeColumn");
        this.__mathConcat = new ObservedPropertySimple(this.zerosStr, this, "mathConcat");
        this.__mathTimeConcat = new ObservedPropertySimple(this.zerosStr, this, "mathTimeConcat");
        this.__mathCount = new ObservedPropertySimple(this.zerosStr, this, "mathCount");
        this.__mathTimeCount = new ObservedPropertySimple(this.zerosStr, this, "mathTimeCount");
        this.__mathCross = new ObservedPropertySimple(this.zerosStr, this, "mathCross");
        this.__mathTimeCross = new ObservedPropertySimple(this.zerosStr, this, "mathTimeCross");
        this.__mathDet = new ObservedPropertySimple(this.zerosStr, this, "mathDet");
        this.__mathTimeDet = new ObservedPropertySimple(this.zerosStr, this, "mathTimeDet");
        this.__mathDiag = new ObservedPropertySimple(this.zerosStr, this, "mathDiag");
        this.__mathTimeDiag = new ObservedPropertySimple(this.zerosStr, this, "mathTimeDiag");
        this.__mathDot = new ObservedPropertySimple(this.zerosStr, this, "mathDot");
        this.__mathTimeDot = new ObservedPropertySimple(this.zerosStr, this, "mathTimeDot");
        this.__mathExpm = new ObservedPropertySimple(this.zerosStr, this, "mathExpm");
        this.__mathTimeExpm = new ObservedPropertySimple(this.zerosStr, this, "mathTimeExpm");
        this.__mathFft = new ObservedPropertySimple(this.zerosStr, this, "mathFft");
        this.__mathTimeFft = new ObservedPropertySimple(this.zerosStr, this, "mathTimeFft");
        this.__mathFlatten = new ObservedPropertySimple(this.zerosStr, this, "mathFlatten");
        this.__mathTimeFlatten = new ObservedPropertySimple(this.zerosStr, this, "mathTimeFlatten");
        this.__mathIdentity = new ObservedPropertySimple(this.zerosStr, this, "mathIdentity");
        this.__mathTimeIdentity = new ObservedPropertySimple(this.zerosStr, this, "mathTimeIdentity");
        this.__mathInv = new ObservedPropertySimple(this.zerosStr, this, "mathInv");
        this.__mathTimeInv = new ObservedPropertySimple(this.zerosStr, this, "mathTimeInv");
        this.__mathKron = new ObservedPropertySimple(this.zerosStr, this, "mathKron");
        this.__mathTimeKron = new ObservedPropertySimple(this.zerosStr, this, "mathTimeKron");
        this.__mathOnes = new ObservedPropertySimple(this.zerosStr, this, "mathOnes");
        this.__mathTimeOnes = new ObservedPropertySimple(this.zerosStr, this, "mathTimeOnes");
        this.__mathRange = new ObservedPropertySimple(this.zerosStr, this, "mathRange");
        this.__mathTimeRange = new ObservedPropertySimple(this.zerosStr, this, "mathTimeRange");
        this.__mathReshape = new ObservedPropertyObject([1, 2], this, "mathReshape");
        this.__mathTimeReshape = new ObservedPropertySimple(this.zerosStr, this, "mathTimeReshape");
        this.__mathResize = new ObservedPropertySimple(this.zerosStr, this, "mathResize");
        this.__mathTimeResize = new ObservedPropertySimple(this.zerosStr, this, "mathTimeResize");
        this.__mathRow = new ObservedPropertySimple(this.zerosStr, this, "mathRow");
        this.__mathTimeRow = new ObservedPropertySimple(this.zerosStr, this, "mathTimeRow");
        this.__mathSize = new ObservedPropertySimple(this.zerosStr, this, "mathSize");
        this.__mathTimeSize = new ObservedPropertySimple(this.zerosStr, this, "mathTimeSize");
        this.__mathSort = new ObservedPropertySimple(this.zerosStr, this, "mathSort");
        this.__mathTimeSort = new ObservedPropertySimple(this.zerosStr, this, "mathTimeSort");
        this.__mathSqueeze = new ObservedPropertySimple(this.zerosStr, this, "mathSqueeze");
        this.__mathTimeSqueeze = new ObservedPropertySimple(this.zerosStr, this, "mathTimeSqueeze");
        this.__mathSubset = new ObservedPropertySimple(this.zerosStr, this, "mathSubset");
        this.__mathTimeSubset = new ObservedPropertySimple(this.zerosStr, this, "mathTimeSubset");
        this.__mathTrace = new ObservedPropertySimple(this.zerosStr, this, "mathTrace");
        this.__mathTimeTrace = new ObservedPropertySimple(this.zerosStr, this, "mathTimeTrace");
        this.__mathZeros = new ObservedPropertySimple(this.zerosStr, this, "mathZeros");
        this.__mathTimeZeros = new ObservedPropertySimple(this.zerosStr, this, "mathTimeZeros");
        this.__mathTimeQr = new ObservedPropertySimple(this.zerosStr, this, "mathTimeQr");
        this.__qrMatrix = new ObservedPropertyObject(math.qr([[0, 0, 0], [0, 0, 0], [0, 0, 0]]), this, "qrMatrix");
        this.__mathTime = new ObservedPropertySimple(this.zerosStr, this, "mathTime");
        this.__sparseMatrix = new ObservedPropertyObject(math.matrix([[1, 2], [3, 4]]), this, "sparseMatrix");
        this.__SymmetricMatrix2 = new ObservedPropertyObject(math.matrix([[10, 1, 10], [1, 10, 1], [10, 1, 10]]), this, "SymmetricMatrix2");
        this.__getMatrix = new ObservedPropertySimple('0', this, "getMatrix");
        this.__setMatrix = new ObservedPropertyObject(this.sparseMatrix.set([0, 1], 5), this, "setMatrix");
        this.arrays = '[[10, 1, 10], [1, 10, 1], [10, 1, 10]]';
        this.SymmetricMatrixQr = this.arrays;
        this.mathZeros1 = '1';
        this.mathZeros2 = '0';
        this.mathTrace1 = this.arrays;
        this.mathSubset1 = this.arrays;
        this.mathSubset2 = '0';
        this.mathSubset3 = '0';
        this.mathSqueeze1 = this.arrays;
        this.mathSort1 = '[5, 10, 1]';
        this.mathSize1 = this.arrays;
        this.mathRow1 = this.arrays;
        this.mathRow2 = '0';
        this.mathResize1 = this.arrays;
        this.mathnumResize = [1, 1];
        this.mathstr = '0';
        this.mathReshape1 = '[1, 2, 3, 4, 5, 6]';
        this.mathnumReshape = [2, 3];
        this.mathRange1 = '1';
        this.mathRange2 = '2';
        this.mathOnes1 = '1';
        this.mathOnes2 = '0';
        this.mathKron1 = this.arrays;
        this.mathkron2 = this.arrays;
        this.mathInv1 = '[[1, 2], [3, 4]]';
        this.mathIdentity1 = 3;
        this.mathnumIdentity = 2;
        this.mathFlatten1 = this.arrays;
        this.mathFft1 = '[[1, 0], [1, 0]]';
        this.mathExpm1 = this.arrays;
        this.mathDot1 = '[2, 4, 1]';
        this.mathnumDot = '[2, 2, 3]';
        this.mathDiag1 = this.arrays;
        this.mathDet1 = '[[1, 2], [3, 4]]';
        this.mathCross1 = '[1, 1, 0]';
        this.mathnumCross = '[0, 1, 1]';
        this.mathCount1 = this.arrays;
        this.mathConcat1 = this.arrays;
        this.mathnumConcat = this.arrays;
        this.mathColumn1 = this.arrays;
        this.mathnumColumn = '1';
        this.mathApply1 = this.arrays;
        this.mathnumApply = '1';
        this.SymmetricMatrixSparse = this.arrays;
        this.getMatrix2 = [0, 1];
        this.setMatrix2 = [0, 1];
        this.setMatrixIndex = 5;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.zerosStr !== undefined) {
            this.zerosStr = params.zerosStr;
        }
        if (params.mathApply !== undefined) {
            this.mathApply = params.mathApply;
        }
        if (params.mathTimeApply !== undefined) {
            this.mathTimeApply = params.mathTimeApply;
        }
        if (params.mathColumn !== undefined) {
            this.mathColumn = params.mathColumn;
        }
        if (params.mathTimeColumn !== undefined) {
            this.mathTimeColumn = params.mathTimeColumn;
        }
        if (params.mathConcat !== undefined) {
            this.mathConcat = params.mathConcat;
        }
        if (params.mathTimeConcat !== undefined) {
            this.mathTimeConcat = params.mathTimeConcat;
        }
        if (params.mathCount !== undefined) {
            this.mathCount = params.mathCount;
        }
        if (params.mathTimeCount !== undefined) {
            this.mathTimeCount = params.mathTimeCount;
        }
        if (params.mathCross !== undefined) {
            this.mathCross = params.mathCross;
        }
        if (params.mathTimeCross !== undefined) {
            this.mathTimeCross = params.mathTimeCross;
        }
        if (params.mathDet !== undefined) {
            this.mathDet = params.mathDet;
        }
        if (params.mathTimeDet !== undefined) {
            this.mathTimeDet = params.mathTimeDet;
        }
        if (params.mathDiag !== undefined) {
            this.mathDiag = params.mathDiag;
        }
        if (params.mathTimeDiag !== undefined) {
            this.mathTimeDiag = params.mathTimeDiag;
        }
        if (params.mathDot !== undefined) {
            this.mathDot = params.mathDot;
        }
        if (params.mathTimeDot !== undefined) {
            this.mathTimeDot = params.mathTimeDot;
        }
        if (params.mathExpm !== undefined) {
            this.mathExpm = params.mathExpm;
        }
        if (params.mathTimeExpm !== undefined) {
            this.mathTimeExpm = params.mathTimeExpm;
        }
        if (params.mathFft !== undefined) {
            this.mathFft = params.mathFft;
        }
        if (params.mathTimeFft !== undefined) {
            this.mathTimeFft = params.mathTimeFft;
        }
        if (params.mathFlatten !== undefined) {
            this.mathFlatten = params.mathFlatten;
        }
        if (params.mathTimeFlatten !== undefined) {
            this.mathTimeFlatten = params.mathTimeFlatten;
        }
        if (params.mathIdentity !== undefined) {
            this.mathIdentity = params.mathIdentity;
        }
        if (params.mathTimeIdentity !== undefined) {
            this.mathTimeIdentity = params.mathTimeIdentity;
        }
        if (params.mathInv !== undefined) {
            this.mathInv = params.mathInv;
        }
        if (params.mathTimeInv !== undefined) {
            this.mathTimeInv = params.mathTimeInv;
        }
        if (params.mathKron !== undefined) {
            this.mathKron = params.mathKron;
        }
        if (params.mathTimeKron !== undefined) {
            this.mathTimeKron = params.mathTimeKron;
        }
        if (params.mathOnes !== undefined) {
            this.mathOnes = params.mathOnes;
        }
        if (params.mathTimeOnes !== undefined) {
            this.mathTimeOnes = params.mathTimeOnes;
        }
        if (params.mathRange !== undefined) {
            this.mathRange = params.mathRange;
        }
        if (params.mathTimeRange !== undefined) {
            this.mathTimeRange = params.mathTimeRange;
        }
        if (params.mathReshape !== undefined) {
            this.mathReshape = params.mathReshape;
        }
        if (params.mathTimeReshape !== undefined) {
            this.mathTimeReshape = params.mathTimeReshape;
        }
        if (params.mathResize !== undefined) {
            this.mathResize = params.mathResize;
        }
        if (params.mathTimeResize !== undefined) {
            this.mathTimeResize = params.mathTimeResize;
        }
        if (params.mathRow !== undefined) {
            this.mathRow = params.mathRow;
        }
        if (params.mathTimeRow !== undefined) {
            this.mathTimeRow = params.mathTimeRow;
        }
        if (params.mathSize !== undefined) {
            this.mathSize = params.mathSize;
        }
        if (params.mathTimeSize !== undefined) {
            this.mathTimeSize = params.mathTimeSize;
        }
        if (params.mathSort !== undefined) {
            this.mathSort = params.mathSort;
        }
        if (params.mathTimeSort !== undefined) {
            this.mathTimeSort = params.mathTimeSort;
        }
        if (params.mathSqueeze !== undefined) {
            this.mathSqueeze = params.mathSqueeze;
        }
        if (params.mathTimeSqueeze !== undefined) {
            this.mathTimeSqueeze = params.mathTimeSqueeze;
        }
        if (params.mathSubset !== undefined) {
            this.mathSubset = params.mathSubset;
        }
        if (params.mathTimeSubset !== undefined) {
            this.mathTimeSubset = params.mathTimeSubset;
        }
        if (params.mathTrace !== undefined) {
            this.mathTrace = params.mathTrace;
        }
        if (params.mathTimeTrace !== undefined) {
            this.mathTimeTrace = params.mathTimeTrace;
        }
        if (params.mathZeros !== undefined) {
            this.mathZeros = params.mathZeros;
        }
        if (params.mathTimeZeros !== undefined) {
            this.mathTimeZeros = params.mathTimeZeros;
        }
        if (params.mathTimeQr !== undefined) {
            this.mathTimeQr = params.mathTimeQr;
        }
        if (params.qrMatrix !== undefined) {
            this.qrMatrix = params.qrMatrix;
        }
        if (params.mathTime !== undefined) {
            this.mathTime = params.mathTime;
        }
        if (params.sparseMatrix !== undefined) {
            this.sparseMatrix = params.sparseMatrix;
        }
        if (params.SymmetricMatrix2 !== undefined) {
            this.SymmetricMatrix2 = params.SymmetricMatrix2;
        }
        if (params.getMatrix !== undefined) {
            this.getMatrix = params.getMatrix;
        }
        if (params.setMatrix !== undefined) {
            this.setMatrix = params.setMatrix;
        }
        if (params.arrays !== undefined) {
            this.arrays = params.arrays;
        }
        if (params.SymmetricMatrixQr !== undefined) {
            this.SymmetricMatrixQr = params.SymmetricMatrixQr;
        }
        if (params.mathZeros1 !== undefined) {
            this.mathZeros1 = params.mathZeros1;
        }
        if (params.mathZeros2 !== undefined) {
            this.mathZeros2 = params.mathZeros2;
        }
        if (params.mathTrace1 !== undefined) {
            this.mathTrace1 = params.mathTrace1;
        }
        if (params.mathSubset1 !== undefined) {
            this.mathSubset1 = params.mathSubset1;
        }
        if (params.mathSubset2 !== undefined) {
            this.mathSubset2 = params.mathSubset2;
        }
        if (params.mathSubset3 !== undefined) {
            this.mathSubset3 = params.mathSubset3;
        }
        if (params.mathSqueeze1 !== undefined) {
            this.mathSqueeze1 = params.mathSqueeze1;
        }
        if (params.mathSort1 !== undefined) {
            this.mathSort1 = params.mathSort1;
        }
        if (params.mathSize1 !== undefined) {
            this.mathSize1 = params.mathSize1;
        }
        if (params.mathRow1 !== undefined) {
            this.mathRow1 = params.mathRow1;
        }
        if (params.mathRow2 !== undefined) {
            this.mathRow2 = params.mathRow2;
        }
        if (params.mathResize1 !== undefined) {
            this.mathResize1 = params.mathResize1;
        }
        if (params.mathnumResize !== undefined) {
            this.mathnumResize = params.mathnumResize;
        }
        if (params.mathstr !== undefined) {
            this.mathstr = params.mathstr;
        }
        if (params.mathReshape1 !== undefined) {
            this.mathReshape1 = params.mathReshape1;
        }
        if (params.mathnumReshape !== undefined) {
            this.mathnumReshape = params.mathnumReshape;
        }
        if (params.mathRange1 !== undefined) {
            this.mathRange1 = params.mathRange1;
        }
        if (params.mathRange2 !== undefined) {
            this.mathRange2 = params.mathRange2;
        }
        if (params.mathOnes1 !== undefined) {
            this.mathOnes1 = params.mathOnes1;
        }
        if (params.mathOnes2 !== undefined) {
            this.mathOnes2 = params.mathOnes2;
        }
        if (params.mathKron1 !== undefined) {
            this.mathKron1 = params.mathKron1;
        }
        if (params.mathkron2 !== undefined) {
            this.mathkron2 = params.mathkron2;
        }
        if (params.mathInv1 !== undefined) {
            this.mathInv1 = params.mathInv1;
        }
        if (params.mathIdentity1 !== undefined) {
            this.mathIdentity1 = params.mathIdentity1;
        }
        if (params.mathnumIdentity !== undefined) {
            this.mathnumIdentity = params.mathnumIdentity;
        }
        if (params.mathFlatten1 !== undefined) {
            this.mathFlatten1 = params.mathFlatten1;
        }
        if (params.mathFft1 !== undefined) {
            this.mathFft1 = params.mathFft1;
        }
        if (params.mathExpm1 !== undefined) {
            this.mathExpm1 = params.mathExpm1;
        }
        if (params.mathDot1 !== undefined) {
            this.mathDot1 = params.mathDot1;
        }
        if (params.mathnumDot !== undefined) {
            this.mathnumDot = params.mathnumDot;
        }
        if (params.mathDiag1 !== undefined) {
            this.mathDiag1 = params.mathDiag1;
        }
        if (params.mathDet1 !== undefined) {
            this.mathDet1 = params.mathDet1;
        }
        if (params.mathCross1 !== undefined) {
            this.mathCross1 = params.mathCross1;
        }
        if (params.mathnumCross !== undefined) {
            this.mathnumCross = params.mathnumCross;
        }
        if (params.mathCount1 !== undefined) {
            this.mathCount1 = params.mathCount1;
        }
        if (params.mathConcat1 !== undefined) {
            this.mathConcat1 = params.mathConcat1;
        }
        if (params.mathnumConcat !== undefined) {
            this.mathnumConcat = params.mathnumConcat;
        }
        if (params.mathColumn1 !== undefined) {
            this.mathColumn1 = params.mathColumn1;
        }
        if (params.mathnumColumn !== undefined) {
            this.mathnumColumn = params.mathnumColumn;
        }
        if (params.mathApply1 !== undefined) {
            this.mathApply1 = params.mathApply1;
        }
        if (params.mathnumApply !== undefined) {
            this.mathnumApply = params.mathnumApply;
        }
        if (params.SymmetricMatrixSparse !== undefined) {
            this.SymmetricMatrixSparse = params.SymmetricMatrixSparse;
        }
        if (params.getMatrix2 !== undefined) {
            this.getMatrix2 = params.getMatrix2;
        }
        if (params.setMatrix2 !== undefined) {
            this.setMatrix2 = params.setMatrix2;
        }
        if (params.setMatrixIndex !== undefined) {
            this.setMatrixIndex = params.setMatrixIndex;
        }
    }
    aboutToBeDeleted() {
        this.__mathApply.aboutToBeDeleted();
        this.__mathTimeApply.aboutToBeDeleted();
        this.__mathColumn.aboutToBeDeleted();
        this.__mathTimeColumn.aboutToBeDeleted();
        this.__mathConcat.aboutToBeDeleted();
        this.__mathTimeConcat.aboutToBeDeleted();
        this.__mathCount.aboutToBeDeleted();
        this.__mathTimeCount.aboutToBeDeleted();
        this.__mathCross.aboutToBeDeleted();
        this.__mathTimeCross.aboutToBeDeleted();
        this.__mathDet.aboutToBeDeleted();
        this.__mathTimeDet.aboutToBeDeleted();
        this.__mathDiag.aboutToBeDeleted();
        this.__mathTimeDiag.aboutToBeDeleted();
        this.__mathDot.aboutToBeDeleted();
        this.__mathTimeDot.aboutToBeDeleted();
        this.__mathExpm.aboutToBeDeleted();
        this.__mathTimeExpm.aboutToBeDeleted();
        this.__mathFft.aboutToBeDeleted();
        this.__mathTimeFft.aboutToBeDeleted();
        this.__mathFlatten.aboutToBeDeleted();
        this.__mathTimeFlatten.aboutToBeDeleted();
        this.__mathIdentity.aboutToBeDeleted();
        this.__mathTimeIdentity.aboutToBeDeleted();
        this.__mathInv.aboutToBeDeleted();
        this.__mathTimeInv.aboutToBeDeleted();
        this.__mathKron.aboutToBeDeleted();
        this.__mathTimeKron.aboutToBeDeleted();
        this.__mathOnes.aboutToBeDeleted();
        this.__mathTimeOnes.aboutToBeDeleted();
        this.__mathRange.aboutToBeDeleted();
        this.__mathTimeRange.aboutToBeDeleted();
        this.__mathReshape.aboutToBeDeleted();
        this.__mathTimeReshape.aboutToBeDeleted();
        this.__mathResize.aboutToBeDeleted();
        this.__mathTimeResize.aboutToBeDeleted();
        this.__mathRow.aboutToBeDeleted();
        this.__mathTimeRow.aboutToBeDeleted();
        this.__mathSize.aboutToBeDeleted();
        this.__mathTimeSize.aboutToBeDeleted();
        this.__mathSort.aboutToBeDeleted();
        this.__mathTimeSort.aboutToBeDeleted();
        this.__mathSqueeze.aboutToBeDeleted();
        this.__mathTimeSqueeze.aboutToBeDeleted();
        this.__mathSubset.aboutToBeDeleted();
        this.__mathTimeSubset.aboutToBeDeleted();
        this.__mathTrace.aboutToBeDeleted();
        this.__mathTimeTrace.aboutToBeDeleted();
        this.__mathZeros.aboutToBeDeleted();
        this.__mathTimeZeros.aboutToBeDeleted();
        this.__mathTimeQr.aboutToBeDeleted();
        this.__qrMatrix.aboutToBeDeleted();
        this.__mathTime.aboutToBeDeleted();
        this.__sparseMatrix.aboutToBeDeleted();
        this.__SymmetricMatrix2.aboutToBeDeleted();
        this.__getMatrix.aboutToBeDeleted();
        this.__setMatrix.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private scroller: Scroller;
    private zerosStr;
    private __mathApply: ObservedPropertySimple<string>;
    get mathApply() {
        return this.__mathApply.get();
    }
    set mathApply(newValue: string) {
        this.__mathApply.set(newValue);
    }
    private __mathTimeApply: ObservedPropertySimple<string>;
    get mathTimeApply() {
        return this.__mathTimeApply.get();
    }
    set mathTimeApply(newValue: string) {
        this.__mathTimeApply.set(newValue);
    }
    private __mathColumn: ObservedPropertySimple<string>;
    get mathColumn() {
        return this.__mathColumn.get();
    }
    set mathColumn(newValue: string) {
        this.__mathColumn.set(newValue);
    }
    private __mathTimeColumn: ObservedPropertySimple<string>;
    get mathTimeColumn() {
        return this.__mathTimeColumn.get();
    }
    set mathTimeColumn(newValue: string) {
        this.__mathTimeColumn.set(newValue);
    }
    private __mathConcat: ObservedPropertySimple<string>;
    get mathConcat() {
        return this.__mathConcat.get();
    }
    set mathConcat(newValue: string) {
        this.__mathConcat.set(newValue);
    }
    private __mathTimeConcat: ObservedPropertySimple<string>;
    get mathTimeConcat() {
        return this.__mathTimeConcat.get();
    }
    set mathTimeConcat(newValue: string) {
        this.__mathTimeConcat.set(newValue);
    }
    private __mathCount: ObservedPropertySimple<string>;
    get mathCount() {
        return this.__mathCount.get();
    }
    set mathCount(newValue: string) {
        this.__mathCount.set(newValue);
    }
    private __mathTimeCount: ObservedPropertySimple<string>;
    get mathTimeCount() {
        return this.__mathTimeCount.get();
    }
    set mathTimeCount(newValue: string) {
        this.__mathTimeCount.set(newValue);
    }
    private __mathCross: ObservedPropertySimple<string>;
    get mathCross() {
        return this.__mathCross.get();
    }
    set mathCross(newValue: string) {
        this.__mathCross.set(newValue);
    }
    private __mathTimeCross: ObservedPropertySimple<string>;
    get mathTimeCross() {
        return this.__mathTimeCross.get();
    }
    set mathTimeCross(newValue: string) {
        this.__mathTimeCross.set(newValue);
    }
    private __mathDet: ObservedPropertySimple<string>;
    get mathDet() {
        return this.__mathDet.get();
    }
    set mathDet(newValue: string) {
        this.__mathDet.set(newValue);
    }
    private __mathTimeDet: ObservedPropertySimple<string>;
    get mathTimeDet() {
        return this.__mathTimeDet.get();
    }
    set mathTimeDet(newValue: string) {
        this.__mathTimeDet.set(newValue);
    }
    private __mathDiag: ObservedPropertySimple<string>;
    get mathDiag() {
        return this.__mathDiag.get();
    }
    set mathDiag(newValue: string) {
        this.__mathDiag.set(newValue);
    }
    private __mathTimeDiag: ObservedPropertySimple<string>;
    get mathTimeDiag() {
        return this.__mathTimeDiag.get();
    }
    set mathTimeDiag(newValue: string) {
        this.__mathTimeDiag.set(newValue);
    }
    private __mathDot: ObservedPropertySimple<string>;
    get mathDot() {
        return this.__mathDot.get();
    }
    set mathDot(newValue: string) {
        this.__mathDot.set(newValue);
    }
    private __mathTimeDot: ObservedPropertySimple<string>;
    get mathTimeDot() {
        return this.__mathTimeDot.get();
    }
    set mathTimeDot(newValue: string) {
        this.__mathTimeDot.set(newValue);
    }
    private __mathExpm: ObservedPropertySimple<string>;
    get mathExpm() {
        return this.__mathExpm.get();
    }
    set mathExpm(newValue: string) {
        this.__mathExpm.set(newValue);
    }
    private __mathTimeExpm: ObservedPropertySimple<string>;
    get mathTimeExpm() {
        return this.__mathTimeExpm.get();
    }
    set mathTimeExpm(newValue: string) {
        this.__mathTimeExpm.set(newValue);
    }
    private __mathFft: ObservedPropertySimple<string>;
    get mathFft() {
        return this.__mathFft.get();
    }
    set mathFft(newValue: string) {
        this.__mathFft.set(newValue);
    }
    private __mathTimeFft: ObservedPropertySimple<string>;
    get mathTimeFft() {
        return this.__mathTimeFft.get();
    }
    set mathTimeFft(newValue: string) {
        this.__mathTimeFft.set(newValue);
    }
    private __mathFlatten: ObservedPropertySimple<string>;
    get mathFlatten() {
        return this.__mathFlatten.get();
    }
    set mathFlatten(newValue: string) {
        this.__mathFlatten.set(newValue);
    }
    private __mathTimeFlatten: ObservedPropertySimple<string>;
    get mathTimeFlatten() {
        return this.__mathTimeFlatten.get();
    }
    set mathTimeFlatten(newValue: string) {
        this.__mathTimeFlatten.set(newValue);
    }
    private __mathIdentity: ObservedPropertySimple<string>;
    get mathIdentity() {
        return this.__mathIdentity.get();
    }
    set mathIdentity(newValue: string) {
        this.__mathIdentity.set(newValue);
    }
    private __mathTimeIdentity: ObservedPropertySimple<string>;
    get mathTimeIdentity() {
        return this.__mathTimeIdentity.get();
    }
    set mathTimeIdentity(newValue: string) {
        this.__mathTimeIdentity.set(newValue);
    }
    private __mathInv: ObservedPropertySimple<string>;
    get mathInv() {
        return this.__mathInv.get();
    }
    set mathInv(newValue: string) {
        this.__mathInv.set(newValue);
    }
    private __mathTimeInv: ObservedPropertySimple<string>;
    get mathTimeInv() {
        return this.__mathTimeInv.get();
    }
    set mathTimeInv(newValue: string) {
        this.__mathTimeInv.set(newValue);
    }
    private __mathKron: ObservedPropertySimple<string>;
    get mathKron() {
        return this.__mathKron.get();
    }
    set mathKron(newValue: string) {
        this.__mathKron.set(newValue);
    }
    private __mathTimeKron: ObservedPropertySimple<string>;
    get mathTimeKron() {
        return this.__mathTimeKron.get();
    }
    set mathTimeKron(newValue: string) {
        this.__mathTimeKron.set(newValue);
    }
    private __mathOnes: ObservedPropertySimple<string>;
    get mathOnes() {
        return this.__mathOnes.get();
    }
    set mathOnes(newValue: string) {
        this.__mathOnes.set(newValue);
    }
    private __mathTimeOnes: ObservedPropertySimple<string>;
    get mathTimeOnes() {
        return this.__mathTimeOnes.get();
    }
    set mathTimeOnes(newValue: string) {
        this.__mathTimeOnes.set(newValue);
    }
    private __mathRange: ObservedPropertySimple<string>;
    get mathRange() {
        return this.__mathRange.get();
    }
    set mathRange(newValue: string) {
        this.__mathRange.set(newValue);
    }
    private __mathTimeRange: ObservedPropertySimple<string>;
    get mathTimeRange() {
        return this.__mathTimeRange.get();
    }
    set mathTimeRange(newValue: string) {
        this.__mathTimeRange.set(newValue);
    }
    private __mathReshape: ObservedPropertyObject<number[]>;
    get mathReshape() {
        return this.__mathReshape.get();
    }
    set mathReshape(newValue: number[]) {
        this.__mathReshape.set(newValue);
    }
    private __mathTimeReshape: ObservedPropertySimple<string>;
    get mathTimeReshape() {
        return this.__mathTimeReshape.get();
    }
    set mathTimeReshape(newValue: string) {
        this.__mathTimeReshape.set(newValue);
    }
    private __mathResize: ObservedPropertySimple<string>;
    get mathResize() {
        return this.__mathResize.get();
    }
    set mathResize(newValue: string) {
        this.__mathResize.set(newValue);
    }
    private __mathTimeResize: ObservedPropertySimple<string>;
    get mathTimeResize() {
        return this.__mathTimeResize.get();
    }
    set mathTimeResize(newValue: string) {
        this.__mathTimeResize.set(newValue);
    }
    private __mathRow: ObservedPropertySimple<string>;
    get mathRow() {
        return this.__mathRow.get();
    }
    set mathRow(newValue: string) {
        this.__mathRow.set(newValue);
    }
    private __mathTimeRow: ObservedPropertySimple<string>;
    get mathTimeRow() {
        return this.__mathTimeRow.get();
    }
    set mathTimeRow(newValue: string) {
        this.__mathTimeRow.set(newValue);
    }
    private __mathSize: ObservedPropertySimple<string>;
    get mathSize() {
        return this.__mathSize.get();
    }
    set mathSize(newValue: string) {
        this.__mathSize.set(newValue);
    }
    private __mathTimeSize: ObservedPropertySimple<string>;
    get mathTimeSize() {
        return this.__mathTimeSize.get();
    }
    set mathTimeSize(newValue: string) {
        this.__mathTimeSize.set(newValue);
    }
    private __mathSort: ObservedPropertySimple<string>;
    get mathSort() {
        return this.__mathSort.get();
    }
    set mathSort(newValue: string) {
        this.__mathSort.set(newValue);
    }
    private __mathTimeSort: ObservedPropertySimple<string>;
    get mathTimeSort() {
        return this.__mathTimeSort.get();
    }
    set mathTimeSort(newValue: string) {
        this.__mathTimeSort.set(newValue);
    }
    private __mathSqueeze: ObservedPropertySimple<string>;
    get mathSqueeze() {
        return this.__mathSqueeze.get();
    }
    set mathSqueeze(newValue: string) {
        this.__mathSqueeze.set(newValue);
    }
    private __mathTimeSqueeze: ObservedPropertySimple<string>;
    get mathTimeSqueeze() {
        return this.__mathTimeSqueeze.get();
    }
    set mathTimeSqueeze(newValue: string) {
        this.__mathTimeSqueeze.set(newValue);
    }
    private __mathSubset: ObservedPropertySimple<string>;
    get mathSubset() {
        return this.__mathSubset.get();
    }
    set mathSubset(newValue: string) {
        this.__mathSubset.set(newValue);
    }
    private __mathTimeSubset: ObservedPropertySimple<string>;
    get mathTimeSubset() {
        return this.__mathTimeSubset.get();
    }
    set mathTimeSubset(newValue: string) {
        this.__mathTimeSubset.set(newValue);
    }
    private __mathTrace: ObservedPropertySimple<string>;
    get mathTrace() {
        return this.__mathTrace.get();
    }
    set mathTrace(newValue: string) {
        this.__mathTrace.set(newValue);
    }
    private __mathTimeTrace: ObservedPropertySimple<string>;
    get mathTimeTrace() {
        return this.__mathTimeTrace.get();
    }
    set mathTimeTrace(newValue: string) {
        this.__mathTimeTrace.set(newValue);
    }
    private __mathZeros: ObservedPropertySimple<string>;
    get mathZeros() {
        return this.__mathZeros.get();
    }
    set mathZeros(newValue: string) {
        this.__mathZeros.set(newValue);
    }
    private __mathTimeZeros: ObservedPropertySimple<string>;
    get mathTimeZeros() {
        return this.__mathTimeZeros.get();
    }
    set mathTimeZeros(newValue: string) {
        this.__mathTimeZeros.set(newValue);
    }
    private __mathTimeQr: ObservedPropertySimple<string>;
    get mathTimeQr() {
        return this.__mathTimeQr.get();
    }
    set mathTimeQr(newValue: string) {
        this.__mathTimeQr.set(newValue);
    }
    private __qrMatrix: ObservedPropertyObject<math.QRDecomposition>;
    get qrMatrix() {
        return this.__qrMatrix.get();
    }
    set qrMatrix(newValue: math.QRDecomposition) {
        this.__qrMatrix.set(newValue);
    }
    private __mathTime: ObservedPropertySimple<string>;
    get mathTime() {
        return this.__mathTime.get();
    }
    set mathTime(newValue: string) {
        this.__mathTime.set(newValue);
    }
    private __sparseMatrix: ObservedPropertyObject<math.Matrix>;
    get sparseMatrix() {
        return this.__sparseMatrix.get();
    }
    set sparseMatrix(newValue: math.Matrix) {
        this.__sparseMatrix.set(newValue);
    }
    private __SymmetricMatrix2: ObservedPropertyObject<math.Matrix>;
    get SymmetricMatrix2() {
        return this.__SymmetricMatrix2.get();
    }
    set SymmetricMatrix2(newValue: math.Matrix) {
        this.__SymmetricMatrix2.set(newValue);
    }
    private __getMatrix: ObservedPropertySimple<string>;
    get getMatrix() {
        return this.__getMatrix.get();
    }
    set getMatrix(newValue: string) {
        this.__getMatrix.set(newValue);
    }
    private __setMatrix: ObservedPropertyObject<math.Matrix>;
    get setMatrix() {
        return this.__setMatrix.get();
    }
    set setMatrix(newValue: math.Matrix) {
        this.__setMatrix.set(newValue);
    }
    private arrays;
    private SymmetricMatrixQr;
    private mathZeros1;
    private mathZeros2;
    private mathTrace1;
    private mathSubset1;
    private mathSubset2;
    private mathSubset3;
    private mathSqueeze1;
    private mathSort1;
    private mathSize1;
    private mathRow1;
    private mathRow2;
    private mathResize1;
    private mathnumResize: number[];
    private mathstr;
    private mathReshape1;
    private mathnumReshape: number[];
    private mathRange1;
    private mathRange2;
    private mathOnes1;
    private mathOnes2;
    private mathKron1;
    private mathkron2;
    private mathInv1;
    private mathIdentity1;
    private mathnumIdentity;
    private mathFlatten1;
    private mathFft1;
    private mathExpm1;
    private mathDot1;
    private mathnumDot;
    private mathDiag1;
    private mathDet1;
    private mathCross1;
    private mathnumCross;
    private mathCount1;
    private mathConcat1;
    private mathnumConcat;
    private mathColumn1;
    private mathnumColumn;
    private mathApply1;
    private mathnumApply;
    private SymmetricMatrixSparse;
    private getMatrix2;
    private setMatrix2;
    private setMatrixIndex;
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
        Text.create('ejmlMathjs');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入对称矩阵 如：  [[10, 1, 10], [1, 10, 1], [10, 1, 10]]' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value) => {
            this.SymmetricMatrixQr = value;
        });
        Text.create('qr分解');
        Text.fontSize(16);
        Text.margin({ top: 32 });
        Text.padding(8);
        Text.border({ width: 2, color: '#535353', radius: 6 });
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.qrMatrix = math.qr(math.evaluate(this.SymmetricMatrixQr));
                let time1 = Date.now();
                this.mathTimeQr = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create('qr分解: ' + JSON.stringify(ObservedObject.GetRawObject(this.qrMatrix)));
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create('qr分解 Q: ' + JSON.stringify(this.qrMatrix.Q));
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create('qr分解 R: ' + JSON.stringify(this.qrMatrix.R));
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeQr);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输数值' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathZeros1 = value;
        });
        TextInput.create({ placeholder: '请输数值' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathZeros2 = value;
        });
        Text.create('zeros test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathZeros = math.zeros(math.evaluate(this.mathZeros1), math.evaluate(this.mathZeros2)).toString();
                let time1 = Date.now();
                this.mathTimeZeros = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathZeros);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeZeros);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入对称矩阵 如： [[10, 1, 10], [1, 10, 1], [10, 1, 10]]' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathTrace1 = value;
        });
        Text.create('trace test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathTrace = math.trace(math.evaluate(this.mathTrace1)).toString();
                let time1 = Date.now();
                this.mathTimeTrace = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathTrace);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeTrace);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入对称矩阵 如： [[10, 1, 10], [1, 10, 1], [10, 1, 10]]' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathSubset1 = value;
        });
        TextInput.create({ placeholder: '请输数值' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathSubset2 = value;
        });
        TextInput.create({ placeholder: '请输数值' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathSubset3 = value;
        });
        Text.create('subset test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathSubset = math.subset(math.evaluate(this.mathSubset1), math.index(math.evaluate(this.mathSubset2), math.evaluate(this.mathSubset3))).toString();
                let time1 = Date.now();
                this.mathTimeSubset = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathSubset);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeSubset);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入对称矩阵 如：[[10, 1, 10], [1, 10, 1], [10, 1, 10]]' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathSqueeze1 = value;
        });
        Text.create('squeeze test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathSqueeze = math.squeeze(math.evaluate(this.mathSqueeze1)).toString();
                let time1 = Date.now();
                this.mathTimeSqueeze = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathSqueeze);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeSqueeze);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入数组 如： [5, 10, 1]' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathSort1 = value;
        });
        Text.create('sort test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathSort = math.sort(math.evaluate(this.mathSort1), math.compareNatural).toString();
                let time1 = Date.now();
                this.mathTimeSort = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathSort);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeSort);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入对称矩阵 如：[[10, 1, 10], [1, 10, 1], [10, 1, 10]]' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathSize1 = value;
        });
        Text.create('size test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathSize = math.size(math.evaluate(this.mathSize1)).toString();
                let time1 = Date.now();
                this.mathTimeSize = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathSize);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeSize);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入对称矩阵 如：[[10, 1, 10], [1, 10, 1], [10, 1, 10]]' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathRow1 = value;
        });
        TextInput.create({ placeholder: '请输数值' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathRow2 = value;
        });
        Text.create('row test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathRow = math.row(math.evaluate(this.mathRow1), math.evaluate(this.mathRow2)).toString();
                let time1 = Date.now();
                this.mathTimeRow = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathRow);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeRow);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入对称矩阵 如： [[10, 1, 10], [1, 10, 1], [10, 1, 10]]' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathResize1 = value;
        });
        TextInput.create({ placeholder: '输入任意实数' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathnumResize[0] = Number(value);
        });
        TextInput.create({ placeholder: '输入任意实数' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathnumResize[1] = Number(value);
        });
        TextInput.create({ placeholder: '任意输入或者不输人' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathstr = value;
        });
        Text.create('resize test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathResize = math.resize(math.evaluate(this.mathResize1), this.mathnumResize, math.evaluate(this.mathstr)).toString();
                let time1 = Date.now();
                this.mathTimeResize = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathResize);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeResize);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入数组|矩阵 如：[1, 2, 3, 4, 5, 6]' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathReshape1 = value;
        });
        TextInput.create({ placeholder: '输入任意实数' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathnumReshape[0] = Number(value);
        });
        TextInput.create({ placeholder: '输入任意实数' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathnumReshape[1] = Number(value);
        });
        Text.create('reshape test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathReshape = math.reshape(math.evaluate(this.mathReshape1), this.mathnumReshape);
                let time1 = Date.now();
                this.mathTimeReshape = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathReshape);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeReshape);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输数值' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathRange1 = value;
        });
        TextInput.create({ placeholder: '请输数值' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathRange2 = value;
        });
        Text.create('range test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathRange = math.range(math.evaluate(this.mathRange1), math.evaluate(this.mathRange2)).toString();
                let time1 = Date.now();
                this.mathTimeRange = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathRange);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeRange);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输数值' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathOnes1 = value;
        });
        TextInput.create({ placeholder: '请输数值' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathOnes2 = value;
        });
        Text.create('ones test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathOnes = math.ones(math.evaluate(this.mathOnes1), math.evaluate(this.mathOnes2)).toString();
                let time1 = Date.now();
                this.mathTimeOnes = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathOnes);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeOnes);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入对称矩阵 如： [[10, 1, 10], [1, 10, 1], [10, 1, 10]]' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathKron1 = value;
        });
        TextInput.create({ placeholder: '请输入对称矩阵 如： [[10, 1, 10], [1, 10, 1], [10, 1, 10]]' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathkron2 = value;
        });
        Text.create('kron test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathKron = math.kron(math.matrix(math.evaluate(this.mathKron1)), math.matrix(math.evaluate(this.mathkron2))).toString();
                let time1 = Date.now();
                this.mathTimeKron = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathKron);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeKron);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入矩阵 如： [[1, 2], [3, 4]]' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathInv1 = value;
        });
        Text.create('inv test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathInv = math.inv(math.matrix(math.evaluate(this.mathInv1))).toString();
                let time1 = Date.now();
                this.mathTimeInv = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathInv);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeInv);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '输入任意实数' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathIdentity1 = Number(value);
        });
        TextInput.create({ placeholder: '输入任意实数或者不输入' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathnumIdentity = Number(value);
        });
        Text.create('identity test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathIdentity = math.identity(this.mathIdentity1, this.mathnumIdentity).toString();
                let time1 = Date.now();
                this.mathTimeIdentity = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathIdentity);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeIdentity);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入对称矩阵 如： [[10, 1, 10], [1, 10, 1], [10, 1, 10]]' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathFlatten1 = value;
        });
        Text.create('flatten test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathFlatten = math.flatten(math.evaluate(this.mathFlatten1)).toString();
                let time1 = Date.now();
                this.mathTimeFlatten = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathFlatten);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeFlatten);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入对称矩阵 如： [[10, 1, 10], [1, 10, 1], [10, 1, 10]]' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathFft1 = value;
        });
        Text.create('fft test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathFft = math.fft(math.evaluate(this.mathFft1)).toString();
                let time1 = Date.now();
                this.mathTimeFft = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathFft);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeFft);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入对称矩阵 如： [[10, 1, 10], [1, 10, 1], [10, 1, 10]]' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathExpm1 = value;
        });
        Text.create('expm test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathExpm = math.expm(math.matrix(math.evaluate(this.mathExpm1))).toString();
                let time1 = Date.now();
                this.mathTimeExpm = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathExpm);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeExpm);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入对称矩阵 如： [[10, 1, 10], [1, 10, 1], [10, 1, 10]]' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathDot1 = value;
        });
        TextInput.create({ placeholder: '请输入对称矩阵 如： [[10, 1, 10], [1, 10, 1], [10, 1, 10]]' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathnumDot = value;
        });
        Text.create('dot test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathDot = math.dot(math.evaluate(this.mathDot1), math.evaluate(this.mathnumDot)).toString();
                let time1 = Date.now();
                this.mathTimeDot = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathDot);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeDot);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入对称矩阵 如： [[10, 1, 10], [1, 10, 1], [10, 1, 10]]' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathDiag1 = value;
        });
        Text.create('diag test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathDiag = math.diag(math.evaluate(this.mathDiag1)).toString();
                let time1 = Date.now();
                this.mathTimeDiag = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathDiag);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeDiag);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入对称矩阵 如：[[10, 1, 10], [1, 10, 1], [10, 1, 10]]' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathDet1 = value;
        });
        Text.create('det test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathDet = math.det(math.evaluate(this.mathDet1)).toString();
                let time1 = Date.now();
                this.mathTimeDet = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathDet);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeDet);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入对称矩阵 如：[[10, 1, 10], [1, 10, 1], [10, 1, 10]]' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathCross1 = value;
        });
        TextInput.create({ placeholder: '请输入对称矩阵 如：[[10, 1, 10], [1, 10, 1], [10, 1, 10]]' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathnumCross = value;
        });
        Text.create('cross test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathCross = math.cross(math.evaluate(this.mathCross1), math.evaluate(this.mathnumCross)).toString();
                let time1 = Date.now();
                this.mathTimeCross = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathCross);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeCross);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入对称矩阵 如： [[10, 1, 10], [1, 10, 1], [10, 1, 10]]' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathCount1 = value;
        });
        Text.create('count test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathCount = math.count(math.evaluate(this.mathCount1)).toString();
                let time1 = Date.now();
                this.mathTimeCount = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathCount);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeCount);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入对称矩阵 如： [[10, 1, 10], [1, 10, 1], [10, 1, 10]]' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathConcat1 = value;
        });
        TextInput.create({ placeholder: '请输入对称矩阵 如： [[10, 1, 10], [1, 10, 1], [10, 1, 10]]' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathnumConcat = value;
        });
        Text.create('concat test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathConcat = math.concat(math.evaluate(this.mathConcat1), math.evaluate(this.mathnumConcat)).toString();
                let time1 = Date.now();
                this.mathTimeConcat = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathConcat);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeConcat);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入对称矩阵 如：[[10, 1, 10], [1, 10, 1], [10, 1, 10]]' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathColumn1 = value;
        });
        TextInput.create({ placeholder: '请输入任意实数' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathnumColumn = value;
        });
        Text.create('column test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathColumn = math.column(math.evaluate(this.mathColumn1), math.evaluate(this.mathnumColumn)).toString();
                let time1 = Date.now();
                this.mathTimeColumn = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathColumn);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeColumn);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入对称矩阵 如： [[10, 1, 10], [1, 10, 1], [10, 1, 10]]' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathApply1 = value;
        });
        TextInput.create({ placeholder: '请输入任意实数' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathnumApply = value;
        });
        Text.create('apply test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathApply = math.apply(math.evaluate(this.mathApply1), math.evaluate(this.mathnumApply), math.sum).toString();
                let time1 = Date.now();
                this.mathTimeApply = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathApply);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeApply);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create('稀疏矩阵');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入对称矩阵 如：[[10, 1, 10], [1, 10, 1], [10, 1, 10]]' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value) => {
            this.SymmetricMatrixSparse = value;
        });
        Text.create('创建 sparseMatrix');
        Text.fontSize(16);
        Text.margin({ top: 32 });
        Text.padding(8);
        Text.border({ width: 2, color: '#535353', radius: 6 });
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.sparseMatrix = math.matrix(math.evaluate(this.SymmetricMatrixSparse), 'sparse', 'number');
                let time1 = Date.now();
                this.mathTime = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create('sparseMatrix: ' + JSON.stringify(this.sparseMatrix.valueOf()));
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create('获取矩阵使用的存储格式: ' + JSON.stringify(this.sparseMatrix.storage()));
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create('获取存储在矩阵中的数据的数据类型: ' + JSON.stringify(this.sparseMatrix.datatype()));
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create('获取矩阵密度: ' + JSON.stringify(this.sparseMatrix.datatype()));
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入数值' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value) => {
            this.getMatrix2[0] = Number(value);
        });
        TextInput.create({ placeholder: '请输入数值' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value) => {
            this.getMatrix2[1] = Number(value);
        });
        Text.create('从矩阵中获取单个元素');
        Text.fontSize(16);
        Text.margin({ top: 32 });
        Text.padding(8);
        Text.border({ width: 2, color: '#535353', radius: 6 });
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.getMatrix = this.sparseMatrix.get(this.getMatrix2).toString();
                let time1 = Date.now();
                this.mathTime = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create('获取矩阵的单个元素: ' + JSON.stringify(this.getMatrix));
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入数值' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value) => {
            this.setMatrix2[0] = Number(value);
        });
        TextInput.create({ placeholder: '请输入数值' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value) => {
            this.setMatrix2[1] = Number(value);
        });
        TextInput.create({ placeholder: '请输入数值' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value) => {
            this.setMatrixIndex = Number(value);
        });
        Text.create('替换矩阵中的单个元素');
        Text.fontSize(16);
        Text.margin({ top: 32 });
        Text.padding(8);
        Text.border({ width: 2, color: '#535353', radius: 6 });
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.setMatrix = this.sparseMatrix.set(this.setMatrix2, this.setMatrixIndex);
                let time1 = Date.now();
                this.mathTime = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create('替换后的矩阵: ' + JSON.stringify(this.setMatrix.valueOf()));
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTime);
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
}
loadDocument(new Index("1", undefined, {}));
