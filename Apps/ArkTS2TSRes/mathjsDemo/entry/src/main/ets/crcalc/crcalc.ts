interface Index_Params {
    scroller?: Scroller;
    zerosStr?;
    message?: string;
    mathAbs?: string;
    mathTimeAbs?: string;
    mathAcos?: string;
    mathTimeAcos?: string;
    mathAdd?: string;
    mathTimeAdd?: string;
    mathAsin?: string;
    mathTimeAsin?: string;
    mathAtan?: string;
    mathTimeAtan?: string;
    mathByteValue?: string;
    mathTimeByteValue?: string;
    mathCompare?: string;
    mathTimeCompare?: string;
    mathCos?: string;
    mathTimeCos?: string;
    mathDivide?: string;
    mathTimeDivide?: string;
    mathExp?: string;
    mathTimeExp?: string;
    mathFormat?: string;
    mathTimeFormat?: string;
    mathIntValue?: string;
    mathTimeIntValue?: string;
    mathLeftShift?: string;
    mathTimeLeftShift?: string;
    mathLog?: string;
    mathTimeLog?: string;
    mathLongValue?: string;
    mathTimeLongValue?: string;
    mathMax?: string;
    mathTimeMax?: string;
    mathMin?: string;
    mathTimeMin?: string;
    mathMultiply?: string;
    mathTimeMultiply?: string;
    mathRadix?: string;
    mathTimeRadix?: string;
    mathRightArithShift?: string;
    mathTimeRightArithShift?: string;
    mathRound?: string;
    mathTimeRound?: string;
    mathSin?: string;
    mathTimeSin?: string;
    mathSqrt?: string;
    mathTimeSqrt?: string;
    mathSubtract?: string;
    mathTimeSubtract?: string;
    mathTan?: string;
    mathTimeTan?: string;
    mathUnaryMinus?: string;
    mathTimeUnaryMinus?: string;
    mathSignum?: boolean;
    mathposSignum?: boolean;
    mathTimeSignum?: string;
    mathTimeSignum1?: string;
    mathatanSignum?: string;
    mathatanSignum1?: string;
    mathUnaryMinus1?: string;
    mathTan1?: string;
    mathSubtract1?: string;
    mathSubtract2?: string;
    mathSqrt1?: string;
    mathSin1?: string;
    mathRound1?: string;
    mathRightArithShift1?: string;
    mathRightArithShift2?: string;
    mathRadix1?: string;
    mathRadix2?: number;
    mathMultiply1?: string;
    mathMultiply2?: string;
    mathMin1?: string;
    mathMin2?: string;
    mathMax1?: string;
    mathMax2?: string;
    mathLongValue1?: string;
    mathLog1?: string;
    mathLeftShift1?: string;
    mathLeftShift2?: string;
    mathIntValue1?: string;
    mathFormat1?: string;
    mathExp1?: string;
    mathDivide1?: string;
    mathDivide2?: string;
    mathCos1?: string;
    mathCompare1?: string;
    mathCompare2?: string;
    mathByteValue1?: string;
    mathAtan1?: string;
    mathAsin1?: string;
    mathAdd1?: string;
    mathAdd2?: string;
    mathAcosStr?: string;
    mathAbsStr?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "crcalc_" + ++__generate__Id;
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
import router from '@ohos.router';
import * as math from 'mathjs';
import BigNumber from 'bignumber.js';
import long from 'long';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.scroller = new Scroller();
        this.zerosStr = '0';
        this.__message = new ObservedPropertySimple('crcalc test', this, "message");
        this.__mathAbs = new ObservedPropertySimple(this.zerosStr, this, "mathAbs");
        this.__mathTimeAbs = new ObservedPropertySimple(this.zerosStr, this, "mathTimeAbs");
        this.__mathAcos = new ObservedPropertySimple(this.zerosStr, this, "mathAcos");
        this.__mathTimeAcos = new ObservedPropertySimple(this.zerosStr, this, "mathTimeAcos");
        this.__mathAdd = new ObservedPropertySimple(this.zerosStr, this, "mathAdd");
        this.__mathTimeAdd = new ObservedPropertySimple(this.zerosStr, this, "mathTimeAdd");
        this.__mathAsin = new ObservedPropertySimple(this.zerosStr, this, "mathAsin");
        this.__mathTimeAsin = new ObservedPropertySimple(this.zerosStr, this, "mathTimeAsin");
        this.__mathAtan = new ObservedPropertySimple(this.zerosStr, this, "mathAtan");
        this.__mathTimeAtan = new ObservedPropertySimple(this.zerosStr, this, "mathTimeAtan");
        this.__mathByteValue = new ObservedPropertySimple(this.zerosStr, this, "mathByteValue");
        this.__mathTimeByteValue = new ObservedPropertySimple(this.zerosStr, this, "mathTimeByteValue");
        this.__mathCompare = new ObservedPropertySimple(this.zerosStr, this, "mathCompare");
        this.__mathTimeCompare = new ObservedPropertySimple(this.zerosStr, this, "mathTimeCompare");
        this.__mathCos = new ObservedPropertySimple(this.zerosStr, this, "mathCos");
        this.__mathTimeCos = new ObservedPropertySimple(this.zerosStr, this, "mathTimeCos");
        this.__mathDivide = new ObservedPropertySimple(this.zerosStr, this, "mathDivide");
        this.__mathTimeDivide = new ObservedPropertySimple(this.zerosStr, this, "mathTimeDivide");
        this.__mathExp = new ObservedPropertySimple(this.zerosStr, this, "mathExp");
        this.__mathTimeExp = new ObservedPropertySimple(this.zerosStr, this, "mathTimeExp");
        this.__mathFormat = new ObservedPropertySimple(this.zerosStr, this, "mathFormat");
        this.__mathTimeFormat = new ObservedPropertySimple(this.zerosStr, this, "mathTimeFormat");
        this.__mathIntValue = new ObservedPropertySimple(this.zerosStr, this, "mathIntValue");
        this.__mathTimeIntValue = new ObservedPropertySimple(this.zerosStr, this, "mathTimeIntValue");
        this.__mathLeftShift = new ObservedPropertySimple(this.zerosStr, this, "mathLeftShift");
        this.__mathTimeLeftShift = new ObservedPropertySimple(this.zerosStr, this, "mathTimeLeftShift");
        this.__mathLog = new ObservedPropertySimple(this.zerosStr, this, "mathLog");
        this.__mathTimeLog = new ObservedPropertySimple(this.zerosStr, this, "mathTimeLog");
        this.__mathLongValue = new ObservedPropertySimple(this.zerosStr, this, "mathLongValue");
        this.__mathTimeLongValue = new ObservedPropertySimple(this.zerosStr, this, "mathTimeLongValue");
        this.__mathMax = new ObservedPropertySimple(this.zerosStr, this, "mathMax");
        this.__mathTimeMax = new ObservedPropertySimple(this.zerosStr, this, "mathTimeMax");
        this.__mathMin = new ObservedPropertySimple(this.zerosStr, this, "mathMin");
        this.__mathTimeMin = new ObservedPropertySimple(this.zerosStr, this, "mathTimeMin");
        this.__mathMultiply = new ObservedPropertySimple(this.zerosStr, this, "mathMultiply");
        this.__mathTimeMultiply = new ObservedPropertySimple(this.zerosStr, this, "mathTimeMultiply");
        this.__mathRadix = new ObservedPropertySimple(this.zerosStr, this, "mathRadix");
        this.__mathTimeRadix = new ObservedPropertySimple(this.zerosStr, this, "mathTimeRadix");
        this.__mathRightArithShift = new ObservedPropertySimple(this.zerosStr, this, "mathRightArithShift");
        this.__mathTimeRightArithShift = new ObservedPropertySimple(this.zerosStr, this, "mathTimeRightArithShift");
        this.__mathRound = new ObservedPropertySimple(this.zerosStr, this, "mathRound");
        this.__mathTimeRound = new ObservedPropertySimple(this.zerosStr, this, "mathTimeRound");
        this.__mathSin = new ObservedPropertySimple(this.zerosStr, this, "mathSin");
        this.__mathTimeSin = new ObservedPropertySimple(this.zerosStr, this, "mathTimeSin");
        this.__mathSqrt = new ObservedPropertySimple(this.zerosStr, this, "mathSqrt");
        this.__mathTimeSqrt = new ObservedPropertySimple(this.zerosStr, this, "mathTimeSqrt");
        this.__mathSubtract = new ObservedPropertySimple(this.zerosStr, this, "mathSubtract");
        this.__mathTimeSubtract = new ObservedPropertySimple(this.zerosStr, this, "mathTimeSubtract");
        this.__mathTan = new ObservedPropertySimple(this.zerosStr, this, "mathTan");
        this.__mathTimeTan = new ObservedPropertySimple(this.zerosStr, this, "mathTimeTan");
        this.__mathUnaryMinus = new ObservedPropertySimple(this.zerosStr, this, "mathUnaryMinus");
        this.__mathTimeUnaryMinus = new ObservedPropertySimple(this.zerosStr, this, "mathTimeUnaryMinus");
        this.__mathSignum = new ObservedPropertySimple(true, this, "mathSignum");
        this.__mathposSignum = new ObservedPropertySimple(true, this, "mathposSignum");
        this.__mathTimeSignum = new ObservedPropertySimple(this.zerosStr, this, "mathTimeSignum");
        this.__mathTimeSignum1 = new ObservedPropertySimple(this.zerosStr, this, "mathTimeSignum1");
        this.mathatanSignum = '';
        this.mathatanSignum1 = '';
        this.mathUnaryMinus1 = '';
        this.mathTan1 = '';
        this.mathSubtract1 = '';
        this.mathSubtract2 = '';
        this.mathSqrt1 = '';
        this.mathSin1 = '';
        this.mathRound1 = '';
        this.mathRightArithShift1 = '';
        this.mathRightArithShift2 = '';
        this.mathRadix1 = '';
        this.mathRadix2 = 0;
        this.mathMultiply1 = '';
        this.mathMultiply2 = '';
        this.mathMin1 = '';
        this.mathMin2 = '';
        this.mathMax1 = '';
        this.mathMax2 = '';
        this.mathLongValue1 = '';
        this.mathLog1 = '';
        this.mathLeftShift1 = '';
        this.mathLeftShift2 = '';
        this.mathIntValue1 = '';
        this.mathFormat1 = '';
        this.mathExp1 = '';
        this.mathDivide1 = '';
        this.mathDivide2 = '';
        this.mathCos1 = '';
        this.mathCompare1 = '';
        this.mathCompare2 = '';
        this.mathByteValue1 = '';
        this.mathAtan1 = '';
        this.mathAsin1 = '';
        this.mathAdd1 = '';
        this.mathAdd2 = '';
        this.mathAcosStr = '';
        this.mathAbsStr = '';
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.zerosStr !== undefined) {
            this.zerosStr = params.zerosStr;
        }
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.mathAbs !== undefined) {
            this.mathAbs = params.mathAbs;
        }
        if (params.mathTimeAbs !== undefined) {
            this.mathTimeAbs = params.mathTimeAbs;
        }
        if (params.mathAcos !== undefined) {
            this.mathAcos = params.mathAcos;
        }
        if (params.mathTimeAcos !== undefined) {
            this.mathTimeAcos = params.mathTimeAcos;
        }
        if (params.mathAdd !== undefined) {
            this.mathAdd = params.mathAdd;
        }
        if (params.mathTimeAdd !== undefined) {
            this.mathTimeAdd = params.mathTimeAdd;
        }
        if (params.mathAsin !== undefined) {
            this.mathAsin = params.mathAsin;
        }
        if (params.mathTimeAsin !== undefined) {
            this.mathTimeAsin = params.mathTimeAsin;
        }
        if (params.mathAtan !== undefined) {
            this.mathAtan = params.mathAtan;
        }
        if (params.mathTimeAtan !== undefined) {
            this.mathTimeAtan = params.mathTimeAtan;
        }
        if (params.mathByteValue !== undefined) {
            this.mathByteValue = params.mathByteValue;
        }
        if (params.mathTimeByteValue !== undefined) {
            this.mathTimeByteValue = params.mathTimeByteValue;
        }
        if (params.mathCompare !== undefined) {
            this.mathCompare = params.mathCompare;
        }
        if (params.mathTimeCompare !== undefined) {
            this.mathTimeCompare = params.mathTimeCompare;
        }
        if (params.mathCos !== undefined) {
            this.mathCos = params.mathCos;
        }
        if (params.mathTimeCos !== undefined) {
            this.mathTimeCos = params.mathTimeCos;
        }
        if (params.mathDivide !== undefined) {
            this.mathDivide = params.mathDivide;
        }
        if (params.mathTimeDivide !== undefined) {
            this.mathTimeDivide = params.mathTimeDivide;
        }
        if (params.mathExp !== undefined) {
            this.mathExp = params.mathExp;
        }
        if (params.mathTimeExp !== undefined) {
            this.mathTimeExp = params.mathTimeExp;
        }
        if (params.mathFormat !== undefined) {
            this.mathFormat = params.mathFormat;
        }
        if (params.mathTimeFormat !== undefined) {
            this.mathTimeFormat = params.mathTimeFormat;
        }
        if (params.mathIntValue !== undefined) {
            this.mathIntValue = params.mathIntValue;
        }
        if (params.mathTimeIntValue !== undefined) {
            this.mathTimeIntValue = params.mathTimeIntValue;
        }
        if (params.mathLeftShift !== undefined) {
            this.mathLeftShift = params.mathLeftShift;
        }
        if (params.mathTimeLeftShift !== undefined) {
            this.mathTimeLeftShift = params.mathTimeLeftShift;
        }
        if (params.mathLog !== undefined) {
            this.mathLog = params.mathLog;
        }
        if (params.mathTimeLog !== undefined) {
            this.mathTimeLog = params.mathTimeLog;
        }
        if (params.mathLongValue !== undefined) {
            this.mathLongValue = params.mathLongValue;
        }
        if (params.mathTimeLongValue !== undefined) {
            this.mathTimeLongValue = params.mathTimeLongValue;
        }
        if (params.mathMax !== undefined) {
            this.mathMax = params.mathMax;
        }
        if (params.mathTimeMax !== undefined) {
            this.mathTimeMax = params.mathTimeMax;
        }
        if (params.mathMin !== undefined) {
            this.mathMin = params.mathMin;
        }
        if (params.mathTimeMin !== undefined) {
            this.mathTimeMin = params.mathTimeMin;
        }
        if (params.mathMultiply !== undefined) {
            this.mathMultiply = params.mathMultiply;
        }
        if (params.mathTimeMultiply !== undefined) {
            this.mathTimeMultiply = params.mathTimeMultiply;
        }
        if (params.mathRadix !== undefined) {
            this.mathRadix = params.mathRadix;
        }
        if (params.mathTimeRadix !== undefined) {
            this.mathTimeRadix = params.mathTimeRadix;
        }
        if (params.mathRightArithShift !== undefined) {
            this.mathRightArithShift = params.mathRightArithShift;
        }
        if (params.mathTimeRightArithShift !== undefined) {
            this.mathTimeRightArithShift = params.mathTimeRightArithShift;
        }
        if (params.mathRound !== undefined) {
            this.mathRound = params.mathRound;
        }
        if (params.mathTimeRound !== undefined) {
            this.mathTimeRound = params.mathTimeRound;
        }
        if (params.mathSin !== undefined) {
            this.mathSin = params.mathSin;
        }
        if (params.mathTimeSin !== undefined) {
            this.mathTimeSin = params.mathTimeSin;
        }
        if (params.mathSqrt !== undefined) {
            this.mathSqrt = params.mathSqrt;
        }
        if (params.mathTimeSqrt !== undefined) {
            this.mathTimeSqrt = params.mathTimeSqrt;
        }
        if (params.mathSubtract !== undefined) {
            this.mathSubtract = params.mathSubtract;
        }
        if (params.mathTimeSubtract !== undefined) {
            this.mathTimeSubtract = params.mathTimeSubtract;
        }
        if (params.mathTan !== undefined) {
            this.mathTan = params.mathTan;
        }
        if (params.mathTimeTan !== undefined) {
            this.mathTimeTan = params.mathTimeTan;
        }
        if (params.mathUnaryMinus !== undefined) {
            this.mathUnaryMinus = params.mathUnaryMinus;
        }
        if (params.mathTimeUnaryMinus !== undefined) {
            this.mathTimeUnaryMinus = params.mathTimeUnaryMinus;
        }
        if (params.mathSignum !== undefined) {
            this.mathSignum = params.mathSignum;
        }
        if (params.mathposSignum !== undefined) {
            this.mathposSignum = params.mathposSignum;
        }
        if (params.mathTimeSignum !== undefined) {
            this.mathTimeSignum = params.mathTimeSignum;
        }
        if (params.mathTimeSignum1 !== undefined) {
            this.mathTimeSignum1 = params.mathTimeSignum1;
        }
        if (params.mathatanSignum !== undefined) {
            this.mathatanSignum = params.mathatanSignum;
        }
        if (params.mathatanSignum1 !== undefined) {
            this.mathatanSignum1 = params.mathatanSignum1;
        }
        if (params.mathUnaryMinus1 !== undefined) {
            this.mathUnaryMinus1 = params.mathUnaryMinus1;
        }
        if (params.mathTan1 !== undefined) {
            this.mathTan1 = params.mathTan1;
        }
        if (params.mathSubtract1 !== undefined) {
            this.mathSubtract1 = params.mathSubtract1;
        }
        if (params.mathSubtract2 !== undefined) {
            this.mathSubtract2 = params.mathSubtract2;
        }
        if (params.mathSqrt1 !== undefined) {
            this.mathSqrt1 = params.mathSqrt1;
        }
        if (params.mathSin1 !== undefined) {
            this.mathSin1 = params.mathSin1;
        }
        if (params.mathRound1 !== undefined) {
            this.mathRound1 = params.mathRound1;
        }
        if (params.mathRightArithShift1 !== undefined) {
            this.mathRightArithShift1 = params.mathRightArithShift1;
        }
        if (params.mathRightArithShift2 !== undefined) {
            this.mathRightArithShift2 = params.mathRightArithShift2;
        }
        if (params.mathRadix1 !== undefined) {
            this.mathRadix1 = params.mathRadix1;
        }
        if (params.mathRadix2 !== undefined) {
            this.mathRadix2 = params.mathRadix2;
        }
        if (params.mathMultiply1 !== undefined) {
            this.mathMultiply1 = params.mathMultiply1;
        }
        if (params.mathMultiply2 !== undefined) {
            this.mathMultiply2 = params.mathMultiply2;
        }
        if (params.mathMin1 !== undefined) {
            this.mathMin1 = params.mathMin1;
        }
        if (params.mathMin2 !== undefined) {
            this.mathMin2 = params.mathMin2;
        }
        if (params.mathMax1 !== undefined) {
            this.mathMax1 = params.mathMax1;
        }
        if (params.mathMax2 !== undefined) {
            this.mathMax2 = params.mathMax2;
        }
        if (params.mathLongValue1 !== undefined) {
            this.mathLongValue1 = params.mathLongValue1;
        }
        if (params.mathLog1 !== undefined) {
            this.mathLog1 = params.mathLog1;
        }
        if (params.mathLeftShift1 !== undefined) {
            this.mathLeftShift1 = params.mathLeftShift1;
        }
        if (params.mathLeftShift2 !== undefined) {
            this.mathLeftShift2 = params.mathLeftShift2;
        }
        if (params.mathIntValue1 !== undefined) {
            this.mathIntValue1 = params.mathIntValue1;
        }
        if (params.mathFormat1 !== undefined) {
            this.mathFormat1 = params.mathFormat1;
        }
        if (params.mathExp1 !== undefined) {
            this.mathExp1 = params.mathExp1;
        }
        if (params.mathDivide1 !== undefined) {
            this.mathDivide1 = params.mathDivide1;
        }
        if (params.mathDivide2 !== undefined) {
            this.mathDivide2 = params.mathDivide2;
        }
        if (params.mathCos1 !== undefined) {
            this.mathCos1 = params.mathCos1;
        }
        if (params.mathCompare1 !== undefined) {
            this.mathCompare1 = params.mathCompare1;
        }
        if (params.mathCompare2 !== undefined) {
            this.mathCompare2 = params.mathCompare2;
        }
        if (params.mathByteValue1 !== undefined) {
            this.mathByteValue1 = params.mathByteValue1;
        }
        if (params.mathAtan1 !== undefined) {
            this.mathAtan1 = params.mathAtan1;
        }
        if (params.mathAsin1 !== undefined) {
            this.mathAsin1 = params.mathAsin1;
        }
        if (params.mathAdd1 !== undefined) {
            this.mathAdd1 = params.mathAdd1;
        }
        if (params.mathAdd2 !== undefined) {
            this.mathAdd2 = params.mathAdd2;
        }
        if (params.mathAcosStr !== undefined) {
            this.mathAcosStr = params.mathAcosStr;
        }
        if (params.mathAbsStr !== undefined) {
            this.mathAbsStr = params.mathAbsStr;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__mathAbs.aboutToBeDeleted();
        this.__mathTimeAbs.aboutToBeDeleted();
        this.__mathAcos.aboutToBeDeleted();
        this.__mathTimeAcos.aboutToBeDeleted();
        this.__mathAdd.aboutToBeDeleted();
        this.__mathTimeAdd.aboutToBeDeleted();
        this.__mathAsin.aboutToBeDeleted();
        this.__mathTimeAsin.aboutToBeDeleted();
        this.__mathAtan.aboutToBeDeleted();
        this.__mathTimeAtan.aboutToBeDeleted();
        this.__mathByteValue.aboutToBeDeleted();
        this.__mathTimeByteValue.aboutToBeDeleted();
        this.__mathCompare.aboutToBeDeleted();
        this.__mathTimeCompare.aboutToBeDeleted();
        this.__mathCos.aboutToBeDeleted();
        this.__mathTimeCos.aboutToBeDeleted();
        this.__mathDivide.aboutToBeDeleted();
        this.__mathTimeDivide.aboutToBeDeleted();
        this.__mathExp.aboutToBeDeleted();
        this.__mathTimeExp.aboutToBeDeleted();
        this.__mathFormat.aboutToBeDeleted();
        this.__mathTimeFormat.aboutToBeDeleted();
        this.__mathIntValue.aboutToBeDeleted();
        this.__mathTimeIntValue.aboutToBeDeleted();
        this.__mathLeftShift.aboutToBeDeleted();
        this.__mathTimeLeftShift.aboutToBeDeleted();
        this.__mathLog.aboutToBeDeleted();
        this.__mathTimeLog.aboutToBeDeleted();
        this.__mathLongValue.aboutToBeDeleted();
        this.__mathTimeLongValue.aboutToBeDeleted();
        this.__mathMax.aboutToBeDeleted();
        this.__mathTimeMax.aboutToBeDeleted();
        this.__mathMin.aboutToBeDeleted();
        this.__mathTimeMin.aboutToBeDeleted();
        this.__mathMultiply.aboutToBeDeleted();
        this.__mathTimeMultiply.aboutToBeDeleted();
        this.__mathRadix.aboutToBeDeleted();
        this.__mathTimeRadix.aboutToBeDeleted();
        this.__mathRightArithShift.aboutToBeDeleted();
        this.__mathTimeRightArithShift.aboutToBeDeleted();
        this.__mathRound.aboutToBeDeleted();
        this.__mathTimeRound.aboutToBeDeleted();
        this.__mathSin.aboutToBeDeleted();
        this.__mathTimeSin.aboutToBeDeleted();
        this.__mathSqrt.aboutToBeDeleted();
        this.__mathTimeSqrt.aboutToBeDeleted();
        this.__mathSubtract.aboutToBeDeleted();
        this.__mathTimeSubtract.aboutToBeDeleted();
        this.__mathTan.aboutToBeDeleted();
        this.__mathTimeTan.aboutToBeDeleted();
        this.__mathUnaryMinus.aboutToBeDeleted();
        this.__mathTimeUnaryMinus.aboutToBeDeleted();
        this.__mathSignum.aboutToBeDeleted();
        this.__mathposSignum.aboutToBeDeleted();
        this.__mathTimeSignum.aboutToBeDeleted();
        this.__mathTimeSignum1.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private scroller: Scroller;
    private zerosStr;
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __mathAbs: ObservedPropertySimple<string>;
    get mathAbs() {
        return this.__mathAbs.get();
    }
    set mathAbs(newValue: string) {
        this.__mathAbs.set(newValue);
    }
    private __mathTimeAbs: ObservedPropertySimple<string>;
    get mathTimeAbs() {
        return this.__mathTimeAbs.get();
    }
    set mathTimeAbs(newValue: string) {
        this.__mathTimeAbs.set(newValue);
    }
    private __mathAcos: ObservedPropertySimple<string>;
    get mathAcos() {
        return this.__mathAcos.get();
    }
    set mathAcos(newValue: string) {
        this.__mathAcos.set(newValue);
    }
    private __mathTimeAcos: ObservedPropertySimple<string>;
    get mathTimeAcos() {
        return this.__mathTimeAcos.get();
    }
    set mathTimeAcos(newValue: string) {
        this.__mathTimeAcos.set(newValue);
    }
    private __mathAdd: ObservedPropertySimple<string>;
    get mathAdd() {
        return this.__mathAdd.get();
    }
    set mathAdd(newValue: string) {
        this.__mathAdd.set(newValue);
    }
    private __mathTimeAdd: ObservedPropertySimple<string>;
    get mathTimeAdd() {
        return this.__mathTimeAdd.get();
    }
    set mathTimeAdd(newValue: string) {
        this.__mathTimeAdd.set(newValue);
    }
    private __mathAsin: ObservedPropertySimple<string>;
    get mathAsin() {
        return this.__mathAsin.get();
    }
    set mathAsin(newValue: string) {
        this.__mathAsin.set(newValue);
    }
    private __mathTimeAsin: ObservedPropertySimple<string>;
    get mathTimeAsin() {
        return this.__mathTimeAsin.get();
    }
    set mathTimeAsin(newValue: string) {
        this.__mathTimeAsin.set(newValue);
    }
    private __mathAtan: ObservedPropertySimple<string>;
    get mathAtan() {
        return this.__mathAtan.get();
    }
    set mathAtan(newValue: string) {
        this.__mathAtan.set(newValue);
    }
    private __mathTimeAtan: ObservedPropertySimple<string>;
    get mathTimeAtan() {
        return this.__mathTimeAtan.get();
    }
    set mathTimeAtan(newValue: string) {
        this.__mathTimeAtan.set(newValue);
    }
    private __mathByteValue: ObservedPropertySimple<string>;
    get mathByteValue() {
        return this.__mathByteValue.get();
    }
    set mathByteValue(newValue: string) {
        this.__mathByteValue.set(newValue);
    }
    private __mathTimeByteValue: ObservedPropertySimple<string>;
    get mathTimeByteValue() {
        return this.__mathTimeByteValue.get();
    }
    set mathTimeByteValue(newValue: string) {
        this.__mathTimeByteValue.set(newValue);
    }
    private __mathCompare: ObservedPropertySimple<string>;
    get mathCompare() {
        return this.__mathCompare.get();
    }
    set mathCompare(newValue: string) {
        this.__mathCompare.set(newValue);
    }
    private __mathTimeCompare: ObservedPropertySimple<string>;
    get mathTimeCompare() {
        return this.__mathTimeCompare.get();
    }
    set mathTimeCompare(newValue: string) {
        this.__mathTimeCompare.set(newValue);
    }
    private __mathCos: ObservedPropertySimple<string>;
    get mathCos() {
        return this.__mathCos.get();
    }
    set mathCos(newValue: string) {
        this.__mathCos.set(newValue);
    }
    private __mathTimeCos: ObservedPropertySimple<string>;
    get mathTimeCos() {
        return this.__mathTimeCos.get();
    }
    set mathTimeCos(newValue: string) {
        this.__mathTimeCos.set(newValue);
    }
    private __mathDivide: ObservedPropertySimple<string>;
    get mathDivide() {
        return this.__mathDivide.get();
    }
    set mathDivide(newValue: string) {
        this.__mathDivide.set(newValue);
    }
    private __mathTimeDivide: ObservedPropertySimple<string>;
    get mathTimeDivide() {
        return this.__mathTimeDivide.get();
    }
    set mathTimeDivide(newValue: string) {
        this.__mathTimeDivide.set(newValue);
    }
    private __mathExp: ObservedPropertySimple<string>;
    get mathExp() {
        return this.__mathExp.get();
    }
    set mathExp(newValue: string) {
        this.__mathExp.set(newValue);
    }
    private __mathTimeExp: ObservedPropertySimple<string>;
    get mathTimeExp() {
        return this.__mathTimeExp.get();
    }
    set mathTimeExp(newValue: string) {
        this.__mathTimeExp.set(newValue);
    }
    private __mathFormat: ObservedPropertySimple<string>;
    get mathFormat() {
        return this.__mathFormat.get();
    }
    set mathFormat(newValue: string) {
        this.__mathFormat.set(newValue);
    }
    private __mathTimeFormat: ObservedPropertySimple<string>;
    get mathTimeFormat() {
        return this.__mathTimeFormat.get();
    }
    set mathTimeFormat(newValue: string) {
        this.__mathTimeFormat.set(newValue);
    }
    private __mathIntValue: ObservedPropertySimple<string>;
    get mathIntValue() {
        return this.__mathIntValue.get();
    }
    set mathIntValue(newValue: string) {
        this.__mathIntValue.set(newValue);
    }
    private __mathTimeIntValue: ObservedPropertySimple<string>;
    get mathTimeIntValue() {
        return this.__mathTimeIntValue.get();
    }
    set mathTimeIntValue(newValue: string) {
        this.__mathTimeIntValue.set(newValue);
    }
    private __mathLeftShift: ObservedPropertySimple<string>;
    get mathLeftShift() {
        return this.__mathLeftShift.get();
    }
    set mathLeftShift(newValue: string) {
        this.__mathLeftShift.set(newValue);
    }
    private __mathTimeLeftShift: ObservedPropertySimple<string>;
    get mathTimeLeftShift() {
        return this.__mathTimeLeftShift.get();
    }
    set mathTimeLeftShift(newValue: string) {
        this.__mathTimeLeftShift.set(newValue);
    }
    private __mathLog: ObservedPropertySimple<string>;
    get mathLog() {
        return this.__mathLog.get();
    }
    set mathLog(newValue: string) {
        this.__mathLog.set(newValue);
    }
    private __mathTimeLog: ObservedPropertySimple<string>;
    get mathTimeLog() {
        return this.__mathTimeLog.get();
    }
    set mathTimeLog(newValue: string) {
        this.__mathTimeLog.set(newValue);
    }
    private __mathLongValue: ObservedPropertySimple<string>;
    get mathLongValue() {
        return this.__mathLongValue.get();
    }
    set mathLongValue(newValue: string) {
        this.__mathLongValue.set(newValue);
    }
    private __mathTimeLongValue: ObservedPropertySimple<string>;
    get mathTimeLongValue() {
        return this.__mathTimeLongValue.get();
    }
    set mathTimeLongValue(newValue: string) {
        this.__mathTimeLongValue.set(newValue);
    }
    private __mathMax: ObservedPropertySimple<string>;
    get mathMax() {
        return this.__mathMax.get();
    }
    set mathMax(newValue: string) {
        this.__mathMax.set(newValue);
    }
    private __mathTimeMax: ObservedPropertySimple<string>;
    get mathTimeMax() {
        return this.__mathTimeMax.get();
    }
    set mathTimeMax(newValue: string) {
        this.__mathTimeMax.set(newValue);
    }
    private __mathMin: ObservedPropertySimple<string>;
    get mathMin() {
        return this.__mathMin.get();
    }
    set mathMin(newValue: string) {
        this.__mathMin.set(newValue);
    }
    private __mathTimeMin: ObservedPropertySimple<string>;
    get mathTimeMin() {
        return this.__mathTimeMin.get();
    }
    set mathTimeMin(newValue: string) {
        this.__mathTimeMin.set(newValue);
    }
    private __mathMultiply: ObservedPropertySimple<string>;
    get mathMultiply() {
        return this.__mathMultiply.get();
    }
    set mathMultiply(newValue: string) {
        this.__mathMultiply.set(newValue);
    }
    private __mathTimeMultiply: ObservedPropertySimple<string>;
    get mathTimeMultiply() {
        return this.__mathTimeMultiply.get();
    }
    set mathTimeMultiply(newValue: string) {
        this.__mathTimeMultiply.set(newValue);
    }
    private __mathRadix: ObservedPropertySimple<string>;
    get mathRadix() {
        return this.__mathRadix.get();
    }
    set mathRadix(newValue: string) {
        this.__mathRadix.set(newValue);
    }
    private __mathTimeRadix: ObservedPropertySimple<string>;
    get mathTimeRadix() {
        return this.__mathTimeRadix.get();
    }
    set mathTimeRadix(newValue: string) {
        this.__mathTimeRadix.set(newValue);
    }
    private __mathRightArithShift: ObservedPropertySimple<string>;
    get mathRightArithShift() {
        return this.__mathRightArithShift.get();
    }
    set mathRightArithShift(newValue: string) {
        this.__mathRightArithShift.set(newValue);
    }
    private __mathTimeRightArithShift: ObservedPropertySimple<string>;
    get mathTimeRightArithShift() {
        return this.__mathTimeRightArithShift.get();
    }
    set mathTimeRightArithShift(newValue: string) {
        this.__mathTimeRightArithShift.set(newValue);
    }
    private __mathRound: ObservedPropertySimple<string>;
    get mathRound() {
        return this.__mathRound.get();
    }
    set mathRound(newValue: string) {
        this.__mathRound.set(newValue);
    }
    private __mathTimeRound: ObservedPropertySimple<string>;
    get mathTimeRound() {
        return this.__mathTimeRound.get();
    }
    set mathTimeRound(newValue: string) {
        this.__mathTimeRound.set(newValue);
    }
    private __mathSin: ObservedPropertySimple<string>;
    get mathSin() {
        return this.__mathSin.get();
    }
    set mathSin(newValue: string) {
        this.__mathSin.set(newValue);
    }
    private __mathTimeSin: ObservedPropertySimple<string>;
    get mathTimeSin() {
        return this.__mathTimeSin.get();
    }
    set mathTimeSin(newValue: string) {
        this.__mathTimeSin.set(newValue);
    }
    private __mathSqrt: ObservedPropertySimple<string>;
    get mathSqrt() {
        return this.__mathSqrt.get();
    }
    set mathSqrt(newValue: string) {
        this.__mathSqrt.set(newValue);
    }
    private __mathTimeSqrt: ObservedPropertySimple<string>;
    get mathTimeSqrt() {
        return this.__mathTimeSqrt.get();
    }
    set mathTimeSqrt(newValue: string) {
        this.__mathTimeSqrt.set(newValue);
    }
    private __mathSubtract: ObservedPropertySimple<string>;
    get mathSubtract() {
        return this.__mathSubtract.get();
    }
    set mathSubtract(newValue: string) {
        this.__mathSubtract.set(newValue);
    }
    private __mathTimeSubtract: ObservedPropertySimple<string>;
    get mathTimeSubtract() {
        return this.__mathTimeSubtract.get();
    }
    set mathTimeSubtract(newValue: string) {
        this.__mathTimeSubtract.set(newValue);
    }
    private __mathTan: ObservedPropertySimple<string>;
    get mathTan() {
        return this.__mathTan.get();
    }
    set mathTan(newValue: string) {
        this.__mathTan.set(newValue);
    }
    private __mathTimeTan: ObservedPropertySimple<string>;
    get mathTimeTan() {
        return this.__mathTimeTan.get();
    }
    set mathTimeTan(newValue: string) {
        this.__mathTimeTan.set(newValue);
    }
    private __mathUnaryMinus: ObservedPropertySimple<string>;
    get mathUnaryMinus() {
        return this.__mathUnaryMinus.get();
    }
    set mathUnaryMinus(newValue: string) {
        this.__mathUnaryMinus.set(newValue);
    }
    private __mathTimeUnaryMinus: ObservedPropertySimple<string>;
    get mathTimeUnaryMinus() {
        return this.__mathTimeUnaryMinus.get();
    }
    set mathTimeUnaryMinus(newValue: string) {
        this.__mathTimeUnaryMinus.set(newValue);
    }
    private __mathSignum: ObservedPropertySimple<boolean>;
    get mathSignum() {
        return this.__mathSignum.get();
    }
    set mathSignum(newValue: boolean) {
        this.__mathSignum.set(newValue);
    }
    private __mathposSignum: ObservedPropertySimple<boolean>;
    get mathposSignum() {
        return this.__mathposSignum.get();
    }
    set mathposSignum(newValue: boolean) {
        this.__mathposSignum.set(newValue);
    }
    private __mathTimeSignum: ObservedPropertySimple<string>;
    get mathTimeSignum() {
        return this.__mathTimeSignum.get();
    }
    set mathTimeSignum(newValue: string) {
        this.__mathTimeSignum.set(newValue);
    }
    private __mathTimeSignum1: ObservedPropertySimple<string>;
    get mathTimeSignum1() {
        return this.__mathTimeSignum1.get();
    }
    set mathTimeSignum1(newValue: string) {
        this.__mathTimeSignum1.set(newValue);
    }
    private mathatanSignum: string;
    private mathatanSignum1: string;
    private mathUnaryMinus1: string;
    private mathTan1: string;
    private mathSubtract1: string;
    private mathSubtract2: string;
    private mathSqrt1: string;
    private mathSin1: string;
    private mathRound1: string;
    private mathRightArithShift1: string;
    private mathRightArithShift2: string;
    private mathRadix1: string;
    private mathRadix2: number;
    private mathMultiply1: string;
    private mathMultiply2: string;
    private mathMin1: string;
    private mathMin2: string;
    private mathMax1: string;
    private mathMax2: string;
    private mathLongValue1: string;
    private mathLog1: string;
    private mathLeftShift1: string;
    private mathLeftShift2: string;
    private mathIntValue1: string;
    private mathFormat1: string;
    private mathExp1: string;
    private mathDivide1: string;
    private mathDivide2: string;
    private mathCos1: string;
    private mathCompare1: string;
    private mathCompare2: string;
    private mathByteValue1: string;
    private mathAtan1: string;
    private mathAsin1: string;
    private mathAdd1: string;
    private mathAdd2: string;
    private mathAcosStr: string;
    private mathAbsStr: string;
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
        Text.create(this.message);
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入任意实数' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathatanSignum = value;
        });
        Text.create('isNegative test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathSignum = math.isNegative(math.bignumber(this.mathatanSignum));
                let time1 = Date.now();
                this.mathTimeSignum = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathSignum);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeSignum);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入任意实数' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathatanSignum1 = value;
        });
        Text.create('isPositive test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathposSignum = math.isPositive(math.bignumber(this.mathatanSignum1));
                let time1 = Date.now();
                this.mathTimeSignum1 = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathposSignum);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeSignum1);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入任意实数' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathUnaryMinus1 = value;
        });
        Text.create('unaryMinus test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathUnaryMinus = math.unaryMinus(math.bignumber(this.mathUnaryMinus1)).toFixed(10);
                let time1 = Date.now();
                this.mathTimeUnaryMinus = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathUnaryMinus);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeUnaryMinus);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入任意实数，取值范围：{x|x≠(π/2)+kπ,k∈Z}' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathTan1 = value;
        });
        Text.create('tan test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathTan = math.tan(math.bignumber(this.mathTan1)).toFixed(10);
                let time1 = Date.now();
                this.mathTimeTan = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathTan);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeTan);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入任意实数' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathSubtract1 = value;
        });
        TextInput.create({ placeholder: '请输入任意实数' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathSubtract2 = value;
        });
        Text.create('subtract test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathSubtract = math.subtract(math.bignumber(this.mathSubtract1), math.bignumber(this.mathSubtract2)).toFixed(10);
                let time1 = Date.now();
                this.mathTimeSubtract = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathSubtract);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeSubtract);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入任意实数' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathSqrt1 = value;
        });
        Text.create('sqrt test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathSqrt = math.sqrt(math.bignumber(this.mathSqrt1)).toFixed(10);
                let time1 = Date.now();
                this.mathTimeSqrt = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathSqrt);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeSqrt);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入任意实数' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathSin1 = value;
        });
        Text.create('sin test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathSin = math.sin(math.bignumber(this.mathSin1)).toFixed(10);
                let time1 = Date.now();
                this.mathTimeSin = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathSin);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeSin);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入任意实数' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathRound1 = value;
        });
        Text.create('round test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathRound = math.round(math.bignumber(this.mathRound1)).toFixed(10);
                let time1 = Date.now();
                this.mathTimeRound = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathRound);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeRound);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入任意实数' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathRightArithShift1 = value;
        });
        TextInput.create({ placeholder: '请输入任意实数' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathRightArithShift2 = value;
        });
        Text.create('rightArithShift test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathRightArithShift = math.rightArithShift(math.bignumber(this.mathRightArithShift1), math.bignumber(this.mathRightArithShift2)).toFixed(10);
                let time1 = Date.now();
                this.mathTimeRightArithShift = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathRightArithShift);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeRightArithShift);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入任意实数' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathRadix1 = value;
        });
        TextInput.create({ placeholder: '请输入转化的进制' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathRadix2 = Number(value);
        });
        Text.create('radix test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                let n: BigNumber = new BigNumber(this.mathRadix1);
                this.mathRadix = n.toString(this.mathRadix2);
                let time1 = Date.now();
                this.mathTimeRadix = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathRadix);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeRadix);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入任意实数' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathMultiply1 = value;
        });
        TextInput.create({ placeholder: '请输入任意实数' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathMultiply2 = value;
        });
        Text.create('multiply test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathMultiply = math.multiply(math.bignumber(this.mathMultiply1), math.bignumber(this.mathMultiply2)).toString();
                let time1 = Date.now();
                this.mathTimeMultiply = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathMultiply);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeMultiply);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入任意实数' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathMin1 = value;
        });
        TextInput.create({ placeholder: '请输入任意实数' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathMin2 = value;
        });
        Text.create('min test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathMin = math.min(math.bignumber(this.mathMin1), math.bignumber(this.mathMin2)).toFixed(10);
                let time1 = Date.now();
                this.mathTimeMin = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathMin);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeMin);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入任意实数' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathMax1 = value;
        });
        TextInput.create({ placeholder: '请输入任意实数' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathMax2 = value;
        });
        Text.create('max test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathMax = math.max(math.bignumber(this.mathMax1), math.bignumber(this.mathMax2)).toFixed(10);
                let time1 = Date.now();
                this.mathTimeMax = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathMax);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeMax);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入任意实数' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathLongValue1 = value;
        });
        Text.create('longValue test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathLongValue = long.fromString(this.mathLongValue1).toString();
                let time1 = Date.now();
                this.mathTimeLongValue = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathLongValue);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeLongValue);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入任意实数' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathLog1 = value;
        });
        Text.create('log test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathLog = math.log(math.bignumber(this.mathLog1)).toFixed(10);
                let time1 = Date.now();
                this.mathTimeLog = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathLog);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeLog);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入任意实数' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathLeftShift1 = value;
        });
        TextInput.create({ placeholder: '请输入任意实数' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathLeftShift2 = value;
        });
        Text.create('leftShift test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathLeftShift = math.leftShift(math.bignumber(this.mathLeftShift1), math.bignumber(this.mathLeftShift2)).toFixed(10);
                let time1 = Date.now();
                this.mathTimeLeftShift = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathLeftShift);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeLeftShift);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入任意实数' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathIntValue1 = value;
        });
        Text.create('intValue test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathIntValue = long.fromString(this.mathIntValue1).toInt().toString();
                let time1 = Date.now();
                this.mathTimeIntValue = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathIntValue);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeIntValue);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入任意实数' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathFormat1 = value;
        });
        Text.create('format test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathFormat = math.format(math.bignumber(this.mathFormat1));
                let time1 = Date.now();
                this.mathTimeFormat = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathFormat);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeFormat);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入任意实数' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathExp1 = value;
        });
        Text.create('exp test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathExp = math.exp(math.bignumber(this.mathExp1)).toFixed(10);
                let time1 = Date.now();
                this.mathTimeExp = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathExp);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeExp);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入任意实数' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathDivide1 = value;
        });
        TextInput.create({ placeholder: '请输入任意实数' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathDivide2 = value;
        });
        Text.create('divide test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathDivide = math.divide(math.bignumber(this.mathDivide1), math.bignumber(this.mathDivide2)).toString(10);
                let time1 = Date.now();
                this.mathTimeDivide = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathDivide);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeDivide);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入-1 到 1 之间任意实数' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathCos1 = value;
        });
        Text.create('cos test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathCos = math.cos(math.bignumber(this.mathCos1)).toFixed(10);
                let time1 = Date.now();
                this.mathTimeCos = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathCos);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeCos);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入任意实数' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathCompare1 = value;
        });
        TextInput.create({ placeholder: '请输入任意实数' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathCompare2 = value;
        });
        Text.create('compare test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathCompare = math.compare(math.bignumber(this.mathCompare1), math.bignumber(this.mathCompare2)).toString();
                let time1 = Date.now();
                this.mathTimeCompare = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathCompare);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeCompare);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入任意实数' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathByteValue1 = value;
        });
        Text.create('byteValue test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                let arr = new Int8Array(1);
                arr[0] = long.fromString(this.mathByteValue1).toInt();
                this.mathByteValue = arr[0].toString();
                let time1 = Date.now();
                this.mathTimeByteValue = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathByteValue);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeByteValue);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入任意实数' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathAtan1 = value;
        });
        Text.create('atan test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathAtan = math.atan(math.bignumber(this.mathAtan1)).toFixed(10);
                let time1 = Date.now();
                this.mathTimeAtan = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathAtan);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeAtan);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入 -1 到 1 之间任意实数' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathAsin1 = value;
        });
        Text.create('asin test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathAsin = math.asin(math.bignumber(this.mathAsin1)).toFixed(10);
                let time1 = Date.now();
                this.mathTimeAsin = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathAsin);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeAsin);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入任意实数' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathAdd1 = value;
        });
        TextInput.create({ placeholder: '请输入任意实数' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathAdd2 = value;
        });
        Text.create('add test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathAdd = math.add(math.bignumber(this.mathAdd1), math.bignumber(this.mathAdd2)).toFixed(10);
                let time1 = Date.now();
                this.mathTimeAdd = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathAdd);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeAdd);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入-1 到 1 之间任意实数' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathAcosStr = value;
        });
        Text.create('acos test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathAcos = math.acos(math.bignumber(this.mathAcosStr)).toFixed(10);
                let time1 = Date.now();
                this.mathTimeAcos = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathAcos);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeAcos);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入任意实数' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathAbsStr = value;
        });
        Text.create('abs test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathAbs = math.abs(math.bignumber(this.mathAbsStr)).toFixed(10);
                let time1 = Date.now();
                this.mathTimeAbs = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathAbs);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeAbs);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create('跳转到首页');
        Text.fontSize(20);
        Text.padding(8);
        Text.margin({ top: 32 });
        Text.fontWeight(FontWeight.Bold);
        Text.border({ width: 2, color: '#535353', radius: 6 });
        Text.onClick(() => {
            router.back();
        });
        Text.pop();
        Column.pop();
        Scroll.pop();
    }
    onPageHide(): void {
        console.log('lllllllllllll消失');
    }
}
loadDocument(new Index("1", undefined, {}));
