interface Index_Params {
    scroller?: Scroller;
    zerosStr?;
    message?: string;
    log2Value?: math.BigNumber;
    acoshValue?: string;
    asinhValue?: string;
    atan2Value?: string;
    coshValue?: string;
    sinhValue?: string;
    tanhValue?: string;
    isEvenValue?: string;
    oddValue?: string;
    log2ValueTime?: string;
    acoshValueTime?: string;
    asinhValueTime?: string;
    atan2ValueTime?: string;
    coshValueTime?: string;
    sinhValueTime?: string;
    tanhValueTime?: string;
    isEvenValueTime?: string;
    oddValueTime?: string;
    mathAbsNeg?: string;
    mathTimeAbsNeg?: string;
    mathACosh1p?: string;
    mathTimeACosh1p?: string;
    mathAtanh?: string;
    mathTimeAtanh?: string;
    mathCbrt?: string;
    mathTimeCbrt?: string;
    mathCeil?: string;
    mathTimeCeil?: string;
    mathCoshm1?: string;
    mathTimeCoshm1?: string;
    mathHypot?: string;
    mathTimeHypot?: string;
    mathLog1p?: string;
    mathTimeLog1p?: string;
    mathLog10?: string;
    mathTimeLog10?: string;
    mathPow?: string;
    mathTimePow?: string;
    mathPow1?: string;
    mathPow2?: string;
    mathLog101?: string;
    mathLog1p1?: string;
    mathHypot1?: string;
    mathHypot2?: string;
    mathCoshm?: string;
    mathCeil1?: string;
    mathCbrt1?: string;
    mathAtanh1?: string;
    mathACosh1p1?: string;
    mathAbsNeg1?: string;
    mathlog2?: string;
    mathacosh?: string;
    mathasinh?: string;
    mathatan1?: string;
    mathatan2?: string;
    mathcosh?: string;
    mathsinh?: string;
    mathtanh?: string;
    mathceil?: string;
    mathodd?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "jafama_" + ++__generate__Id;
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
        this.__message = new ObservedPropertySimple('jafama 测试', this, "message");
        this.__log2Value = new ObservedPropertyObject(math.bignumber(0), this, "log2Value");
        this.__acoshValue = new ObservedPropertySimple(this.zerosStr, this, "acoshValue");
        this.__asinhValue = new ObservedPropertySimple(this.zerosStr, this, "asinhValue");
        this.__atan2Value = new ObservedPropertySimple(this.zerosStr, this, "atan2Value");
        this.__coshValue = new ObservedPropertySimple(this.zerosStr, this, "coshValue");
        this.__sinhValue = new ObservedPropertySimple(this.zerosStr, this, "sinhValue");
        this.__tanhValue = new ObservedPropertySimple(this.zerosStr, this, "tanhValue");
        this.__isEvenValue = new ObservedPropertySimple(this.zerosStr, this, "isEvenValue");
        this.__oddValue = new ObservedPropertySimple(this.zerosStr, this, "oddValue");
        this.__log2ValueTime = new ObservedPropertySimple(this.zerosStr, this, "log2ValueTime");
        this.__acoshValueTime = new ObservedPropertySimple(this.zerosStr, this, "acoshValueTime");
        this.__asinhValueTime = new ObservedPropertySimple(this.zerosStr, this, "asinhValueTime");
        this.__atan2ValueTime = new ObservedPropertySimple(this.zerosStr, this, "atan2ValueTime");
        this.__coshValueTime = new ObservedPropertySimple(this.zerosStr, this, "coshValueTime");
        this.__sinhValueTime = new ObservedPropertySimple(this.zerosStr, this, "sinhValueTime");
        this.__tanhValueTime = new ObservedPropertySimple(this.zerosStr, this, "tanhValueTime");
        this.__isEvenValueTime = new ObservedPropertySimple(this.zerosStr, this, "isEvenValueTime");
        this.__oddValueTime = new ObservedPropertySimple(this.zerosStr, this, "oddValueTime");
        this.__mathAbsNeg = new ObservedPropertySimple(this.zerosStr, this, "mathAbsNeg");
        this.__mathTimeAbsNeg = new ObservedPropertySimple(this.zerosStr, this, "mathTimeAbsNeg");
        this.__mathACosh1p = new ObservedPropertySimple(this.zerosStr, this, "mathACosh1p");
        this.__mathTimeACosh1p = new ObservedPropertySimple(this.zerosStr, this, "mathTimeACosh1p");
        this.__mathAtanh = new ObservedPropertySimple(this.zerosStr, this, "mathAtanh");
        this.__mathTimeAtanh = new ObservedPropertySimple(this.zerosStr, this, "mathTimeAtanh");
        this.__mathCbrt = new ObservedPropertySimple(this.zerosStr, this, "mathCbrt");
        this.__mathTimeCbrt = new ObservedPropertySimple(this.zerosStr, this, "mathTimeCbrt");
        this.__mathCeil = new ObservedPropertySimple(this.zerosStr, this, "mathCeil");
        this.__mathTimeCeil = new ObservedPropertySimple(this.zerosStr, this, "mathTimeCeil");
        this.__mathCoshm1 = new ObservedPropertySimple(this.zerosStr, this, "mathCoshm1");
        this.__mathTimeCoshm1 = new ObservedPropertySimple(this.zerosStr, this, "mathTimeCoshm1");
        this.__mathHypot = new ObservedPropertySimple(this.zerosStr, this, "mathHypot");
        this.__mathTimeHypot = new ObservedPropertySimple(this.zerosStr, this, "mathTimeHypot");
        this.__mathLog1p = new ObservedPropertySimple(this.zerosStr, this, "mathLog1p");
        this.__mathTimeLog1p = new ObservedPropertySimple(this.zerosStr, this, "mathTimeLog1p");
        this.__mathLog10 = new ObservedPropertySimple(this.zerosStr, this, "mathLog10");
        this.__mathTimeLog10 = new ObservedPropertySimple(this.zerosStr, this, "mathTimeLog10");
        this.__mathPow = new ObservedPropertySimple(this.zerosStr, this, "mathPow");
        this.__mathTimePow = new ObservedPropertySimple(this.zerosStr, this, "mathTimePow");
        this.mathPow1 = '';
        this.mathPow2 = '';
        this.mathLog101 = '';
        this.mathLog1p1 = '';
        this.mathHypot1 = '';
        this.mathHypot2 = '';
        this.mathCoshm = '';
        this.mathCeil1 = '';
        this.mathCbrt1 = '';
        this.mathAtanh1 = '';
        this.mathACosh1p1 = '';
        this.mathAbsNeg1 = '';
        this.mathlog2 = '';
        this.mathacosh = '';
        this.mathasinh = '';
        this.mathatan1 = '';
        this.mathatan2 = '';
        this.mathcosh = '';
        this.mathsinh = '';
        this.mathtanh = '';
        this.mathceil = '';
        this.mathodd = '';
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
        if (params.log2Value !== undefined) {
            this.log2Value = params.log2Value;
        }
        if (params.acoshValue !== undefined) {
            this.acoshValue = params.acoshValue;
        }
        if (params.asinhValue !== undefined) {
            this.asinhValue = params.asinhValue;
        }
        if (params.atan2Value !== undefined) {
            this.atan2Value = params.atan2Value;
        }
        if (params.coshValue !== undefined) {
            this.coshValue = params.coshValue;
        }
        if (params.sinhValue !== undefined) {
            this.sinhValue = params.sinhValue;
        }
        if (params.tanhValue !== undefined) {
            this.tanhValue = params.tanhValue;
        }
        if (params.isEvenValue !== undefined) {
            this.isEvenValue = params.isEvenValue;
        }
        if (params.oddValue !== undefined) {
            this.oddValue = params.oddValue;
        }
        if (params.log2ValueTime !== undefined) {
            this.log2ValueTime = params.log2ValueTime;
        }
        if (params.acoshValueTime !== undefined) {
            this.acoshValueTime = params.acoshValueTime;
        }
        if (params.asinhValueTime !== undefined) {
            this.asinhValueTime = params.asinhValueTime;
        }
        if (params.atan2ValueTime !== undefined) {
            this.atan2ValueTime = params.atan2ValueTime;
        }
        if (params.coshValueTime !== undefined) {
            this.coshValueTime = params.coshValueTime;
        }
        if (params.sinhValueTime !== undefined) {
            this.sinhValueTime = params.sinhValueTime;
        }
        if (params.tanhValueTime !== undefined) {
            this.tanhValueTime = params.tanhValueTime;
        }
        if (params.isEvenValueTime !== undefined) {
            this.isEvenValueTime = params.isEvenValueTime;
        }
        if (params.oddValueTime !== undefined) {
            this.oddValueTime = params.oddValueTime;
        }
        if (params.mathAbsNeg !== undefined) {
            this.mathAbsNeg = params.mathAbsNeg;
        }
        if (params.mathTimeAbsNeg !== undefined) {
            this.mathTimeAbsNeg = params.mathTimeAbsNeg;
        }
        if (params.mathACosh1p !== undefined) {
            this.mathACosh1p = params.mathACosh1p;
        }
        if (params.mathTimeACosh1p !== undefined) {
            this.mathTimeACosh1p = params.mathTimeACosh1p;
        }
        if (params.mathAtanh !== undefined) {
            this.mathAtanh = params.mathAtanh;
        }
        if (params.mathTimeAtanh !== undefined) {
            this.mathTimeAtanh = params.mathTimeAtanh;
        }
        if (params.mathCbrt !== undefined) {
            this.mathCbrt = params.mathCbrt;
        }
        if (params.mathTimeCbrt !== undefined) {
            this.mathTimeCbrt = params.mathTimeCbrt;
        }
        if (params.mathCeil !== undefined) {
            this.mathCeil = params.mathCeil;
        }
        if (params.mathTimeCeil !== undefined) {
            this.mathTimeCeil = params.mathTimeCeil;
        }
        if (params.mathCoshm1 !== undefined) {
            this.mathCoshm1 = params.mathCoshm1;
        }
        if (params.mathTimeCoshm1 !== undefined) {
            this.mathTimeCoshm1 = params.mathTimeCoshm1;
        }
        if (params.mathHypot !== undefined) {
            this.mathHypot = params.mathHypot;
        }
        if (params.mathTimeHypot !== undefined) {
            this.mathTimeHypot = params.mathTimeHypot;
        }
        if (params.mathLog1p !== undefined) {
            this.mathLog1p = params.mathLog1p;
        }
        if (params.mathTimeLog1p !== undefined) {
            this.mathTimeLog1p = params.mathTimeLog1p;
        }
        if (params.mathLog10 !== undefined) {
            this.mathLog10 = params.mathLog10;
        }
        if (params.mathTimeLog10 !== undefined) {
            this.mathTimeLog10 = params.mathTimeLog10;
        }
        if (params.mathPow !== undefined) {
            this.mathPow = params.mathPow;
        }
        if (params.mathTimePow !== undefined) {
            this.mathTimePow = params.mathTimePow;
        }
        if (params.mathPow1 !== undefined) {
            this.mathPow1 = params.mathPow1;
        }
        if (params.mathPow2 !== undefined) {
            this.mathPow2 = params.mathPow2;
        }
        if (params.mathLog101 !== undefined) {
            this.mathLog101 = params.mathLog101;
        }
        if (params.mathLog1p1 !== undefined) {
            this.mathLog1p1 = params.mathLog1p1;
        }
        if (params.mathHypot1 !== undefined) {
            this.mathHypot1 = params.mathHypot1;
        }
        if (params.mathHypot2 !== undefined) {
            this.mathHypot2 = params.mathHypot2;
        }
        if (params.mathCoshm !== undefined) {
            this.mathCoshm = params.mathCoshm;
        }
        if (params.mathCeil1 !== undefined) {
            this.mathCeil1 = params.mathCeil1;
        }
        if (params.mathCbrt1 !== undefined) {
            this.mathCbrt1 = params.mathCbrt1;
        }
        if (params.mathAtanh1 !== undefined) {
            this.mathAtanh1 = params.mathAtanh1;
        }
        if (params.mathACosh1p1 !== undefined) {
            this.mathACosh1p1 = params.mathACosh1p1;
        }
        if (params.mathAbsNeg1 !== undefined) {
            this.mathAbsNeg1 = params.mathAbsNeg1;
        }
        if (params.mathlog2 !== undefined) {
            this.mathlog2 = params.mathlog2;
        }
        if (params.mathacosh !== undefined) {
            this.mathacosh = params.mathacosh;
        }
        if (params.mathasinh !== undefined) {
            this.mathasinh = params.mathasinh;
        }
        if (params.mathatan1 !== undefined) {
            this.mathatan1 = params.mathatan1;
        }
        if (params.mathatan2 !== undefined) {
            this.mathatan2 = params.mathatan2;
        }
        if (params.mathcosh !== undefined) {
            this.mathcosh = params.mathcosh;
        }
        if (params.mathsinh !== undefined) {
            this.mathsinh = params.mathsinh;
        }
        if (params.mathtanh !== undefined) {
            this.mathtanh = params.mathtanh;
        }
        if (params.mathceil !== undefined) {
            this.mathceil = params.mathceil;
        }
        if (params.mathodd !== undefined) {
            this.mathodd = params.mathodd;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__log2Value.aboutToBeDeleted();
        this.__acoshValue.aboutToBeDeleted();
        this.__asinhValue.aboutToBeDeleted();
        this.__atan2Value.aboutToBeDeleted();
        this.__coshValue.aboutToBeDeleted();
        this.__sinhValue.aboutToBeDeleted();
        this.__tanhValue.aboutToBeDeleted();
        this.__isEvenValue.aboutToBeDeleted();
        this.__oddValue.aboutToBeDeleted();
        this.__log2ValueTime.aboutToBeDeleted();
        this.__acoshValueTime.aboutToBeDeleted();
        this.__asinhValueTime.aboutToBeDeleted();
        this.__atan2ValueTime.aboutToBeDeleted();
        this.__coshValueTime.aboutToBeDeleted();
        this.__sinhValueTime.aboutToBeDeleted();
        this.__tanhValueTime.aboutToBeDeleted();
        this.__isEvenValueTime.aboutToBeDeleted();
        this.__oddValueTime.aboutToBeDeleted();
        this.__mathAbsNeg.aboutToBeDeleted();
        this.__mathTimeAbsNeg.aboutToBeDeleted();
        this.__mathACosh1p.aboutToBeDeleted();
        this.__mathTimeACosh1p.aboutToBeDeleted();
        this.__mathAtanh.aboutToBeDeleted();
        this.__mathTimeAtanh.aboutToBeDeleted();
        this.__mathCbrt.aboutToBeDeleted();
        this.__mathTimeCbrt.aboutToBeDeleted();
        this.__mathCeil.aboutToBeDeleted();
        this.__mathTimeCeil.aboutToBeDeleted();
        this.__mathCoshm1.aboutToBeDeleted();
        this.__mathTimeCoshm1.aboutToBeDeleted();
        this.__mathHypot.aboutToBeDeleted();
        this.__mathTimeHypot.aboutToBeDeleted();
        this.__mathLog1p.aboutToBeDeleted();
        this.__mathTimeLog1p.aboutToBeDeleted();
        this.__mathLog10.aboutToBeDeleted();
        this.__mathTimeLog10.aboutToBeDeleted();
        this.__mathPow.aboutToBeDeleted();
        this.__mathTimePow.aboutToBeDeleted();
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
    private __log2Value: ObservedPropertyObject<math.BigNumber>;
    get log2Value() {
        return this.__log2Value.get();
    }
    set log2Value(newValue: math.BigNumber) {
        this.__log2Value.set(newValue);
    }
    private __acoshValue: ObservedPropertySimple<string>;
    get acoshValue() {
        return this.__acoshValue.get();
    }
    set acoshValue(newValue: string) {
        this.__acoshValue.set(newValue);
    }
    private __asinhValue: ObservedPropertySimple<string>;
    get asinhValue() {
        return this.__asinhValue.get();
    }
    set asinhValue(newValue: string) {
        this.__asinhValue.set(newValue);
    }
    private __atan2Value: ObservedPropertySimple<string>;
    get atan2Value() {
        return this.__atan2Value.get();
    }
    set atan2Value(newValue: string) {
        this.__atan2Value.set(newValue);
    }
    private __coshValue: ObservedPropertySimple<string>;
    get coshValue() {
        return this.__coshValue.get();
    }
    set coshValue(newValue: string) {
        this.__coshValue.set(newValue);
    }
    private __sinhValue: ObservedPropertySimple<string>;
    get sinhValue() {
        return this.__sinhValue.get();
    }
    set sinhValue(newValue: string) {
        this.__sinhValue.set(newValue);
    }
    private __tanhValue: ObservedPropertySimple<string>;
    get tanhValue() {
        return this.__tanhValue.get();
    }
    set tanhValue(newValue: string) {
        this.__tanhValue.set(newValue);
    }
    private __isEvenValue: ObservedPropertySimple<string>;
    get isEvenValue() {
        return this.__isEvenValue.get();
    }
    set isEvenValue(newValue: string) {
        this.__isEvenValue.set(newValue);
    }
    private __oddValue: ObservedPropertySimple<string>;
    get oddValue() {
        return this.__oddValue.get();
    }
    set oddValue(newValue: string) {
        this.__oddValue.set(newValue);
    }
    private __log2ValueTime: ObservedPropertySimple<string>;
    get log2ValueTime() {
        return this.__log2ValueTime.get();
    }
    set log2ValueTime(newValue: string) {
        this.__log2ValueTime.set(newValue);
    }
    private __acoshValueTime: ObservedPropertySimple<string>;
    get acoshValueTime() {
        return this.__acoshValueTime.get();
    }
    set acoshValueTime(newValue: string) {
        this.__acoshValueTime.set(newValue);
    }
    private __asinhValueTime: ObservedPropertySimple<string>;
    get asinhValueTime() {
        return this.__asinhValueTime.get();
    }
    set asinhValueTime(newValue: string) {
        this.__asinhValueTime.set(newValue);
    }
    private __atan2ValueTime: ObservedPropertySimple<string>;
    get atan2ValueTime() {
        return this.__atan2ValueTime.get();
    }
    set atan2ValueTime(newValue: string) {
        this.__atan2ValueTime.set(newValue);
    }
    private __coshValueTime: ObservedPropertySimple<string>;
    get coshValueTime() {
        return this.__coshValueTime.get();
    }
    set coshValueTime(newValue: string) {
        this.__coshValueTime.set(newValue);
    }
    private __sinhValueTime: ObservedPropertySimple<string>;
    get sinhValueTime() {
        return this.__sinhValueTime.get();
    }
    set sinhValueTime(newValue: string) {
        this.__sinhValueTime.set(newValue);
    }
    private __tanhValueTime: ObservedPropertySimple<string>;
    get tanhValueTime() {
        return this.__tanhValueTime.get();
    }
    set tanhValueTime(newValue: string) {
        this.__tanhValueTime.set(newValue);
    }
    private __isEvenValueTime: ObservedPropertySimple<string>;
    get isEvenValueTime() {
        return this.__isEvenValueTime.get();
    }
    set isEvenValueTime(newValue: string) {
        this.__isEvenValueTime.set(newValue);
    }
    private __oddValueTime: ObservedPropertySimple<string>;
    get oddValueTime() {
        return this.__oddValueTime.get();
    }
    set oddValueTime(newValue: string) {
        this.__oddValueTime.set(newValue);
    }
    private __mathAbsNeg: ObservedPropertySimple<string>;
    get mathAbsNeg() {
        return this.__mathAbsNeg.get();
    }
    set mathAbsNeg(newValue: string) {
        this.__mathAbsNeg.set(newValue);
    }
    private __mathTimeAbsNeg: ObservedPropertySimple<string>;
    get mathTimeAbsNeg() {
        return this.__mathTimeAbsNeg.get();
    }
    set mathTimeAbsNeg(newValue: string) {
        this.__mathTimeAbsNeg.set(newValue);
    }
    private __mathACosh1p: ObservedPropertySimple<string>;
    get mathACosh1p() {
        return this.__mathACosh1p.get();
    }
    set mathACosh1p(newValue: string) {
        this.__mathACosh1p.set(newValue);
    }
    private __mathTimeACosh1p: ObservedPropertySimple<string>;
    get mathTimeACosh1p() {
        return this.__mathTimeACosh1p.get();
    }
    set mathTimeACosh1p(newValue: string) {
        this.__mathTimeACosh1p.set(newValue);
    }
    private __mathAtanh: ObservedPropertySimple<string>;
    get mathAtanh() {
        return this.__mathAtanh.get();
    }
    set mathAtanh(newValue: string) {
        this.__mathAtanh.set(newValue);
    }
    private __mathTimeAtanh: ObservedPropertySimple<string>;
    get mathTimeAtanh() {
        return this.__mathTimeAtanh.get();
    }
    set mathTimeAtanh(newValue: string) {
        this.__mathTimeAtanh.set(newValue);
    }
    private __mathCbrt: ObservedPropertySimple<string>;
    get mathCbrt() {
        return this.__mathCbrt.get();
    }
    set mathCbrt(newValue: string) {
        this.__mathCbrt.set(newValue);
    }
    private __mathTimeCbrt: ObservedPropertySimple<string>;
    get mathTimeCbrt() {
        return this.__mathTimeCbrt.get();
    }
    set mathTimeCbrt(newValue: string) {
        this.__mathTimeCbrt.set(newValue);
    }
    private __mathCeil: ObservedPropertySimple<string>;
    get mathCeil() {
        return this.__mathCeil.get();
    }
    set mathCeil(newValue: string) {
        this.__mathCeil.set(newValue);
    }
    private __mathTimeCeil: ObservedPropertySimple<string>;
    get mathTimeCeil() {
        return this.__mathTimeCeil.get();
    }
    set mathTimeCeil(newValue: string) {
        this.__mathTimeCeil.set(newValue);
    }
    private __mathCoshm1: ObservedPropertySimple<string>;
    get mathCoshm1() {
        return this.__mathCoshm1.get();
    }
    set mathCoshm1(newValue: string) {
        this.__mathCoshm1.set(newValue);
    }
    private __mathTimeCoshm1: ObservedPropertySimple<string>;
    get mathTimeCoshm1() {
        return this.__mathTimeCoshm1.get();
    }
    set mathTimeCoshm1(newValue: string) {
        this.__mathTimeCoshm1.set(newValue);
    }
    private __mathHypot: ObservedPropertySimple<string>;
    get mathHypot() {
        return this.__mathHypot.get();
    }
    set mathHypot(newValue: string) {
        this.__mathHypot.set(newValue);
    }
    private __mathTimeHypot: ObservedPropertySimple<string>;
    get mathTimeHypot() {
        return this.__mathTimeHypot.get();
    }
    set mathTimeHypot(newValue: string) {
        this.__mathTimeHypot.set(newValue);
    }
    private __mathLog1p: ObservedPropertySimple<string>;
    get mathLog1p() {
        return this.__mathLog1p.get();
    }
    set mathLog1p(newValue: string) {
        this.__mathLog1p.set(newValue);
    }
    private __mathTimeLog1p: ObservedPropertySimple<string>;
    get mathTimeLog1p() {
        return this.__mathTimeLog1p.get();
    }
    set mathTimeLog1p(newValue: string) {
        this.__mathTimeLog1p.set(newValue);
    }
    private __mathLog10: ObservedPropertySimple<string>;
    get mathLog10() {
        return this.__mathLog10.get();
    }
    set mathLog10(newValue: string) {
        this.__mathLog10.set(newValue);
    }
    private __mathTimeLog10: ObservedPropertySimple<string>;
    get mathTimeLog10() {
        return this.__mathTimeLog10.get();
    }
    set mathTimeLog10(newValue: string) {
        this.__mathTimeLog10.set(newValue);
    }
    private __mathPow: ObservedPropertySimple<string>;
    get mathPow() {
        return this.__mathPow.get();
    }
    set mathPow(newValue: string) {
        this.__mathPow.set(newValue);
    }
    private __mathTimePow: ObservedPropertySimple<string>;
    get mathTimePow() {
        return this.__mathTimePow.get();
    }
    set mathTimePow(newValue: string) {
        this.__mathTimePow.set(newValue);
    }
    private mathPow1: string;
    private mathPow2: string;
    private mathLog101: string;
    private mathLog1p1: string;
    private mathHypot1: string;
    private mathHypot2: string;
    private mathCoshm: string;
    private mathCeil1: string;
    private mathCbrt1: string;
    private mathAtanh1: string;
    private mathACosh1p1: string;
    private mathAbsNeg1: string;
    private mathlog2: string;
    private mathacosh: string;
    private mathasinh: string;
    private mathatan1: string;
    private mathatan2: string;
    private mathcosh: string;
    private mathsinh: string;
    private mathtanh: string;
    private mathceil: string;
    private mathodd: string;
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
        TextInput.create({ placeholder: '请输入数值' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathPow1 = value;
        });
        TextInput.create({ placeholder: '请输入数值' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathPow2 = value;
        });
        Text.create('pow test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathPow = math.pow(math.evaluate(this.mathPow1), math.evaluate(this.mathPow2)).toString();
                let time1 = Date.now();
                this.mathTimePow = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathPow);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimePow);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入数值' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathLog101 = value;
        });
        Text.create('log10 test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathLog10 = math.log10(math.evaluate(this.mathLog101)).toString();
                let time1 = Date.now();
                this.mathTimeLog10 = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathLog10);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeLog10);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入数值' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathLog1p1 = value;
        });
        Text.create('log1p test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathLog1p = math.log1p(math.evaluate(this.mathLog1p1)).toString();
                let time1 = Date.now();
                this.mathTimeLog1p = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("log1p：" + this.mathLog1p);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeLog1p);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入数值' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathHypot1 = value;
        });
        TextInput.create({ placeholder: '请输入数值' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathHypot2 = value;
        });
        Text.create('hypot test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathHypot = math.hypot(math.evaluate(this.mathHypot1), math.evaluate(this.mathHypot2)).toString();
                let time1 = Date.now();
                this.mathTimeHypot = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("hypot：" + this.mathHypot);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeHypot);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入数值' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathCoshm = value;
        });
        Text.create('coshm1 test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathCoshm1 = (math.cosh(math.evaluate(this.mathCoshm)) - 1).toString();
                let time1 = Date.now();
                this.mathTimeCoshm1 = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("coshm1：" + this.mathCoshm1);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeCoshm1);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入数值' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathCeil1 = value;
        });
        Text.create('ceil test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathCeil = math.ceil(math.evaluate(this.mathCeil1)).toString();
                let time1 = Date.now();
                this.mathTimeCeil = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("ceil：" + this.mathCeil);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeCeil);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入数值' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathCbrt1 = value;
        });
        Text.create('cbrt test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathCbrt = math.cbrt(math.evaluate(this.mathCbrt1)).toString();
                let time1 = Date.now();
                this.mathTimeCbrt = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("cbrt：" + this.mathCbrt);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeCbrt);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入数值' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathAtanh1 = value;
        });
        Text.create('atanh test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathAtanh = math.atanh(math.evaluate(this.mathAtanh1)).toString();
                let time1 = Date.now();
                this.mathTimeAtanh = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("atanh：" + this.mathAtanh);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeAtanh);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入数值' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathACosh1p1 = value;
        });
        Text.create('acosh1p test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathACosh1p = math.acosh(math.bignumber(this.mathACosh1p1 + 1)).toString();
                let time1 = Date.now();
                this.mathTimeACosh1p = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("acosh1p：" + this.mathACosh1p);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeACosh1p);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入数值' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathAbsNeg1 = value;
        });
        Text.create('absNeg test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathAbsNeg = math.subtract(0, math.abs(math.bignumber(this.mathAbsNeg1))).toString(10);
                let time1 = Date.now();
                this.mathTimeAbsNeg = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathAbsNeg);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeAbsNeg);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入数值' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathodd = value;
        });
        Text.create('isOdd 测试');
        Text.fontSize(16);
        Text.margin({ top: 32 });
        Text.padding(8);
        Text.border({ width: 2, color: '#535353', radius: 6 });
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.oddValue = isOdd(Number(this.mathodd)).toString();
                let time1 = Date.now();
                this.oddValueTime = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create('isOdd:' + this.oddValue);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.oddValueTime);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入数值' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathceil = value;
        });
        Text.create('isEven 测试');
        Text.fontSize(16);
        Text.margin({ top: 32 });
        Text.padding(8);
        Text.border({ width: 2, color: '#535353', radius: 6 });
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.isEvenValue = isEven(Number(this.mathceil)).toString();
                let time1 = Date.now();
                this.isEvenValueTime = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create('isEven:' + this.isEvenValue);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.isEvenValueTime);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入数值' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathlog2 = value;
        });
        Text.create('log2测试');
        Text.fontSize(16);
        Text.margin({ top: 32 });
        Text.padding(8);
        Text.border({ width: 2, color: '#535353', radius: 6 });
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.log2Value = math.log2(math.bignumber(this.mathlog2));
                let time1 = Date.now();
                this.log2ValueTime = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create('log2:' + this.log2Value);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.log2ValueTime);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入大于等于 1 的任意实数' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathacosh = value;
        });
        Text.create('acosh测试');
        Text.fontSize(16);
        Text.margin({ top: 32 });
        Text.padding(8);
        Text.border({ width: 2, color: '#535353', radius: 6 });
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.acoshValue = math.acosh(math.evaluate(this.mathacosh)).toString();
                let time1 = Date.now();
                this.acoshValueTime = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create('acosh:' + this.acoshValue);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.acoshValueTime);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入数值' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathasinh = value;
        });
        Text.create('asinh测试');
        Text.fontSize(16);
        Text.margin({ top: 32 });
        Text.padding(8);
        Text.border({ width: 2, color: '#535353', radius: 6 });
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.asinhValue = math.asinh(math.evaluate(this.mathasinh)).toString();
                let time1 = Date.now();
                this.asinhValueTime = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create('asinh:' + this.asinhValue);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.asinhValueTime);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入数值' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathatan1 = value;
        });
        TextInput.create({ placeholder: '请输入数值' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathatan2 = value;
        });
        Text.create('atan2测试');
        Text.fontSize(16);
        Text.margin({ top: 32 });
        Text.padding(8);
        Text.border({ width: 2, color: '#535353', radius: 6 });
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.atan2Value = math.atan2(math.evaluate(this.mathatan1), math.evaluate(this.mathatan2)).toString();
                let time1 = Date.now();
                this.atan2ValueTime = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create('atan2:' + this.atan2Value);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.atan2ValueTime);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入数值' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathcosh = value;
        });
        Text.create('cosh测试');
        Text.fontSize(16);
        Text.margin({ top: 32 });
        Text.padding(8);
        Text.border({ width: 2, color: '#535353', radius: 6 });
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.coshValue = math.cosh(math.evaluate(this.mathcosh)).toString();
                let time1 = Date.now();
                this.coshValueTime = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create('cosh:' + this.coshValue);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.coshValueTime);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入数值' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathsinh = value;
        });
        Text.create('sinh测试');
        Text.fontSize(16);
        Text.margin({ top: 32 });
        Text.padding(8);
        Text.border({ width: 2, color: '#535353', radius: 6 });
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.sinhValue = math.sinh(math.evaluate(this.mathsinh)).toString();
                let time1 = Date.now();
                this.sinhValueTime = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create('sinh:' + this.sinhValue);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.sinhValueTime);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入数值' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathtanh = value;
        });
        Text.create('tanh测试');
        Text.fontSize(16);
        Text.margin({ top: 32 });
        Text.padding(8);
        Text.border({ width: 2, color: '#535353', radius: 6 });
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.tanhValue = math.tanh(math.evaluate(this.mathtanh)).toString();
                let time1 = Date.now();
                this.tanhValueTime = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create('tanh:' + this.tanhValue);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.tanhValueTime);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create('跳转到首页');
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
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
function isEven(x: number): boolean {
    return isInteger(x / 2.0);
}
function isOdd(x: number): boolean {
    // Check sign to prevent overflow...
    if (x > 0.0) {
        return isEven(x - 1.0);
    }
    return isEven(x + 1.0);
}
function isInteger(x: number): boolean {
    return (floor(x) === x);
}
const floor = Math.floor;
loadDocument(new Index("1", undefined, {}));
