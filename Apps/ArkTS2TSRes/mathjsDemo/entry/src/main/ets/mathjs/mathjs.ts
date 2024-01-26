interface Index_Params {
    scroller?: Scroller;
    zerosStr?;
    message?: string;
    mathlsolve?: string;
    mathTimelsolve?: string;
    mathlusolve?: string;
    mathTimelusolve?: string;
    mathsimplify?: string;
    mathTimesimplify?: string;
    mathsimplifyConstant?: string;
    mathTimesimplifyConstant?: string;
    mathusolve?: string;
    mathTimeusolve?: string;
    mathcumsum?: string;
    mathTimecumsum?: string;
    mathmad?: string;
    mathTimemad?: string;
    mathmean?: string;
    mathTimemean?: string;
    mathProd?: string;
    mathTimeProd?: string;
    mathSum?: string;
    mathTimeSum?: string;
    mathVariance?: string;
    mathTimeVariance?: string;
    mathHasNumericValue?: string;
    mathTimeHasNumericValue?: string;
    mathIsInteger?: string;
    mathTimeIsInteger?: string;
    mathIsNaN?: string;
    mathTimeIsNaN?: string;
    mathIsNumeric?: string;
    mathTimeIsNumeric?: string;
    mathIsPrime?: string;
    mathTimeIsPrime?: string;
    mathIsZero?: string;
    mathTimeIsZero?: string;
    bitwiseMath?: string;
    mathbitNot?: string;
    mathbitOr?: string;
    mathbitXor?: string;
    mathTimeBitwise?: string;
    mathTimebitNot?: string;
    mathTimebitOr?: string;
    mathTimebitXor?: string;
    arrays?;
    arrayMath?;
    mathIsZeroArr?;
    mathIsPrimeArr?;
    mathIsNumericArr?;
    mathIsNaNArr?;
    mathIsIntegerArr?;
    mathHasNumericValueArr?;
    mathVarianceArr?;
    mathSumArr?;
    mathProdArr?;
    mathmeanArr?;
    mathmean1?: string;
    mathmadArr?;
    mathcumsumArr?;
    mathusolveArr?;
    mathnumusolve?;
    mathsimplifyConstantStr?;
    mathnumsimplifyConstant?: math.SimplifyOptions;
    mathsimplifyStr?;
    mathnumsimplify?: ESObject;
    mathnumsimplify1?: math.SimplifyOptions;
    mathlsolveArr?;
    mathnumlsolve?;
    mathlusolveArr?;
    mathnumlusolve?;
    mathBitwise?;
    mathapplybitNot?;
    mathapplybitOr?;
    mathapplybitOr1?;
    mathapplybitXor?;
    mathapplybitXor1?;
    mathnum?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "mathjs_" + ++__generate__Id;
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
        this.__message = new ObservedPropertySimple('mathjs 测试', this, "message");
        this.__mathlsolve = new ObservedPropertySimple(this.zerosStr, this, "mathlsolve");
        this.__mathTimelsolve = new ObservedPropertySimple(this.zerosStr, this, "mathTimelsolve");
        this.__mathlusolve = new ObservedPropertySimple(this.zerosStr, this, "mathlusolve");
        this.__mathTimelusolve = new ObservedPropertySimple(this.zerosStr, this, "mathTimelusolve");
        this.__mathsimplify = new ObservedPropertySimple(this.zerosStr, this, "mathsimplify");
        this.__mathTimesimplify = new ObservedPropertySimple(this.zerosStr, this, "mathTimesimplify");
        this.__mathsimplifyConstant = new ObservedPropertySimple(this.zerosStr, this, "mathsimplifyConstant");
        this.__mathTimesimplifyConstant = new ObservedPropertySimple(this.zerosStr, this, "mathTimesimplifyConstant");
        this.__mathusolve = new ObservedPropertySimple(this.zerosStr, this, "mathusolve");
        this.__mathTimeusolve = new ObservedPropertySimple(this.zerosStr, this, "mathTimeusolve");
        this.__mathcumsum = new ObservedPropertySimple(this.zerosStr, this, "mathcumsum");
        this.__mathTimecumsum = new ObservedPropertySimple(this.zerosStr, this, "mathTimecumsum");
        this.__mathmad = new ObservedPropertySimple(this.zerosStr, this, "mathmad");
        this.__mathTimemad = new ObservedPropertySimple(this.zerosStr, this, "mathTimemad");
        this.__mathmean = new ObservedPropertySimple(this.zerosStr, this, "mathmean");
        this.__mathTimemean = new ObservedPropertySimple(this.zerosStr, this, "mathTimemean");
        this.__mathProd = new ObservedPropertySimple(this.zerosStr, this, "mathProd");
        this.__mathTimeProd = new ObservedPropertySimple(this.zerosStr, this, "mathTimeProd");
        this.__mathSum = new ObservedPropertySimple(this.zerosStr, this, "mathSum");
        this.__mathTimeSum = new ObservedPropertySimple(this.zerosStr, this, "mathTimeSum");
        this.__mathVariance = new ObservedPropertySimple(this.zerosStr, this, "mathVariance");
        this.__mathTimeVariance = new ObservedPropertySimple(this.zerosStr, this, "mathTimeVariance");
        this.__mathHasNumericValue = new ObservedPropertySimple(this.zerosStr, this, "mathHasNumericValue");
        this.__mathTimeHasNumericValue = new ObservedPropertySimple(this.zerosStr, this, "mathTimeHasNumericValue");
        this.__mathIsInteger = new ObservedPropertySimple(this.zerosStr, this, "mathIsInteger");
        this.__mathTimeIsInteger = new ObservedPropertySimple(this.zerosStr, this, "mathTimeIsInteger");
        this.__mathIsNaN = new ObservedPropertySimple(this.zerosStr, this, "mathIsNaN");
        this.__mathTimeIsNaN = new ObservedPropertySimple(this.zerosStr, this, "mathTimeIsNaN");
        this.__mathIsNumeric = new ObservedPropertySimple(this.zerosStr, this, "mathIsNumeric");
        this.__mathTimeIsNumeric = new ObservedPropertySimple(this.zerosStr, this, "mathTimeIsNumeric");
        this.__mathIsPrime = new ObservedPropertySimple(this.zerosStr, this, "mathIsPrime");
        this.__mathTimeIsPrime = new ObservedPropertySimple(this.zerosStr, this, "mathTimeIsPrime");
        this.__mathIsZero = new ObservedPropertySimple(this.zerosStr, this, "mathIsZero");
        this.__mathTimeIsZero = new ObservedPropertySimple(this.zerosStr, this, "mathTimeIsZero");
        this.__bitwiseMath = new ObservedPropertySimple(this.zerosStr, this, "bitwiseMath");
        this.__mathbitNot = new ObservedPropertySimple(this.zerosStr, this, "mathbitNot");
        this.__mathbitOr = new ObservedPropertySimple(this.zerosStr, this, "mathbitOr");
        this.__mathbitXor = new ObservedPropertySimple(this.zerosStr, this, "mathbitXor");
        this.__mathTimeBitwise = new ObservedPropertySimple(this.zerosStr, this, "mathTimeBitwise");
        this.__mathTimebitNot = new ObservedPropertySimple(this.zerosStr, this, "mathTimebitNot");
        this.__mathTimebitOr = new ObservedPropertySimple(this.zerosStr, this, "mathTimebitOr");
        this.__mathTimebitXor = new ObservedPropertySimple(this.zerosStr, this, "mathTimebitXor");
        this.arrays = '[[10, 1, 10], [1, 10, 1], [10, 1, 10]]';
        this.arrayMath = '[10, 1, 10]';
        this.mathIsZeroArr = this.arrayMath;
        this.mathIsPrimeArr = this.arrayMath;
        this.mathIsNumericArr = this.arrayMath;
        this.mathIsNaNArr = this.arrayMath;
        this.mathIsIntegerArr = this.arrayMath;
        this.mathHasNumericValueArr = this.arrayMath;
        this.mathVarianceArr = this.arrayMath;
        this.mathSumArr = this.arrayMath;
        this.mathProdArr = this.arrayMath;
        this.mathmeanArr = '[[2,5],[6,3],[1,7]]';
        this.mathmean1 = '';
        this.mathmadArr = this.arrays;
        this.mathcumsumArr = this.arrays;
        this.mathusolveArr = this.arrays;
        this.mathnumusolve = '[1,2,3]';
        this.mathsimplifyConstantStr = '2 * 2^ (2 - 1)';
        this.mathnumsimplifyConstant = { exactFractions: true };
        this.mathsimplifyStr = '2 * 1 * x ^ (2 - 1)';
        this.mathnumsimplify = { x: 4 };
        this.mathnumsimplify1 = { exactFractions: true };
        this.mathlsolveArr = this.arrays;
        this.mathnumlsolve = '[1,2,3]';
        this.mathlusolveArr = '[[-2, 3], [2, 1]]';
        this.mathnumlusolve = '[11, 9]';
        this.mathBitwise = '1';
        this.mathapplybitNot = '1';
        this.mathapplybitOr = '1';
        this.mathapplybitOr1 = '1';
        this.mathapplybitXor = '1';
        this.mathapplybitXor1 = '1';
        this.mathnum = '0';
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
        if (params.mathlsolve !== undefined) {
            this.mathlsolve = params.mathlsolve;
        }
        if (params.mathTimelsolve !== undefined) {
            this.mathTimelsolve = params.mathTimelsolve;
        }
        if (params.mathlusolve !== undefined) {
            this.mathlusolve = params.mathlusolve;
        }
        if (params.mathTimelusolve !== undefined) {
            this.mathTimelusolve = params.mathTimelusolve;
        }
        if (params.mathsimplify !== undefined) {
            this.mathsimplify = params.mathsimplify;
        }
        if (params.mathTimesimplify !== undefined) {
            this.mathTimesimplify = params.mathTimesimplify;
        }
        if (params.mathsimplifyConstant !== undefined) {
            this.mathsimplifyConstant = params.mathsimplifyConstant;
        }
        if (params.mathTimesimplifyConstant !== undefined) {
            this.mathTimesimplifyConstant = params.mathTimesimplifyConstant;
        }
        if (params.mathusolve !== undefined) {
            this.mathusolve = params.mathusolve;
        }
        if (params.mathTimeusolve !== undefined) {
            this.mathTimeusolve = params.mathTimeusolve;
        }
        if (params.mathcumsum !== undefined) {
            this.mathcumsum = params.mathcumsum;
        }
        if (params.mathTimecumsum !== undefined) {
            this.mathTimecumsum = params.mathTimecumsum;
        }
        if (params.mathmad !== undefined) {
            this.mathmad = params.mathmad;
        }
        if (params.mathTimemad !== undefined) {
            this.mathTimemad = params.mathTimemad;
        }
        if (params.mathmean !== undefined) {
            this.mathmean = params.mathmean;
        }
        if (params.mathTimemean !== undefined) {
            this.mathTimemean = params.mathTimemean;
        }
        if (params.mathProd !== undefined) {
            this.mathProd = params.mathProd;
        }
        if (params.mathTimeProd !== undefined) {
            this.mathTimeProd = params.mathTimeProd;
        }
        if (params.mathSum !== undefined) {
            this.mathSum = params.mathSum;
        }
        if (params.mathTimeSum !== undefined) {
            this.mathTimeSum = params.mathTimeSum;
        }
        if (params.mathVariance !== undefined) {
            this.mathVariance = params.mathVariance;
        }
        if (params.mathTimeVariance !== undefined) {
            this.mathTimeVariance = params.mathTimeVariance;
        }
        if (params.mathHasNumericValue !== undefined) {
            this.mathHasNumericValue = params.mathHasNumericValue;
        }
        if (params.mathTimeHasNumericValue !== undefined) {
            this.mathTimeHasNumericValue = params.mathTimeHasNumericValue;
        }
        if (params.mathIsInteger !== undefined) {
            this.mathIsInteger = params.mathIsInteger;
        }
        if (params.mathTimeIsInteger !== undefined) {
            this.mathTimeIsInteger = params.mathTimeIsInteger;
        }
        if (params.mathIsNaN !== undefined) {
            this.mathIsNaN = params.mathIsNaN;
        }
        if (params.mathTimeIsNaN !== undefined) {
            this.mathTimeIsNaN = params.mathTimeIsNaN;
        }
        if (params.mathIsNumeric !== undefined) {
            this.mathIsNumeric = params.mathIsNumeric;
        }
        if (params.mathTimeIsNumeric !== undefined) {
            this.mathTimeIsNumeric = params.mathTimeIsNumeric;
        }
        if (params.mathIsPrime !== undefined) {
            this.mathIsPrime = params.mathIsPrime;
        }
        if (params.mathTimeIsPrime !== undefined) {
            this.mathTimeIsPrime = params.mathTimeIsPrime;
        }
        if (params.mathIsZero !== undefined) {
            this.mathIsZero = params.mathIsZero;
        }
        if (params.mathTimeIsZero !== undefined) {
            this.mathTimeIsZero = params.mathTimeIsZero;
        }
        if (params.bitwiseMath !== undefined) {
            this.bitwiseMath = params.bitwiseMath;
        }
        if (params.mathbitNot !== undefined) {
            this.mathbitNot = params.mathbitNot;
        }
        if (params.mathbitOr !== undefined) {
            this.mathbitOr = params.mathbitOr;
        }
        if (params.mathbitXor !== undefined) {
            this.mathbitXor = params.mathbitXor;
        }
        if (params.mathTimeBitwise !== undefined) {
            this.mathTimeBitwise = params.mathTimeBitwise;
        }
        if (params.mathTimebitNot !== undefined) {
            this.mathTimebitNot = params.mathTimebitNot;
        }
        if (params.mathTimebitOr !== undefined) {
            this.mathTimebitOr = params.mathTimebitOr;
        }
        if (params.mathTimebitXor !== undefined) {
            this.mathTimebitXor = params.mathTimebitXor;
        }
        if (params.arrays !== undefined) {
            this.arrays = params.arrays;
        }
        if (params.arrayMath !== undefined) {
            this.arrayMath = params.arrayMath;
        }
        if (params.mathIsZeroArr !== undefined) {
            this.mathIsZeroArr = params.mathIsZeroArr;
        }
        if (params.mathIsPrimeArr !== undefined) {
            this.mathIsPrimeArr = params.mathIsPrimeArr;
        }
        if (params.mathIsNumericArr !== undefined) {
            this.mathIsNumericArr = params.mathIsNumericArr;
        }
        if (params.mathIsNaNArr !== undefined) {
            this.mathIsNaNArr = params.mathIsNaNArr;
        }
        if (params.mathIsIntegerArr !== undefined) {
            this.mathIsIntegerArr = params.mathIsIntegerArr;
        }
        if (params.mathHasNumericValueArr !== undefined) {
            this.mathHasNumericValueArr = params.mathHasNumericValueArr;
        }
        if (params.mathVarianceArr !== undefined) {
            this.mathVarianceArr = params.mathVarianceArr;
        }
        if (params.mathSumArr !== undefined) {
            this.mathSumArr = params.mathSumArr;
        }
        if (params.mathProdArr !== undefined) {
            this.mathProdArr = params.mathProdArr;
        }
        if (params.mathmeanArr !== undefined) {
            this.mathmeanArr = params.mathmeanArr;
        }
        if (params.mathmean1 !== undefined) {
            this.mathmean1 = params.mathmean1;
        }
        if (params.mathmadArr !== undefined) {
            this.mathmadArr = params.mathmadArr;
        }
        if (params.mathcumsumArr !== undefined) {
            this.mathcumsumArr = params.mathcumsumArr;
        }
        if (params.mathusolveArr !== undefined) {
            this.mathusolveArr = params.mathusolveArr;
        }
        if (params.mathnumusolve !== undefined) {
            this.mathnumusolve = params.mathnumusolve;
        }
        if (params.mathsimplifyConstantStr !== undefined) {
            this.mathsimplifyConstantStr = params.mathsimplifyConstantStr;
        }
        if (params.mathnumsimplifyConstant !== undefined) {
            this.mathnumsimplifyConstant = params.mathnumsimplifyConstant;
        }
        if (params.mathsimplifyStr !== undefined) {
            this.mathsimplifyStr = params.mathsimplifyStr;
        }
        if (params.mathnumsimplify !== undefined) {
            this.mathnumsimplify = params.mathnumsimplify;
        }
        if (params.mathnumsimplify1 !== undefined) {
            this.mathnumsimplify1 = params.mathnumsimplify1;
        }
        if (params.mathlsolveArr !== undefined) {
            this.mathlsolveArr = params.mathlsolveArr;
        }
        if (params.mathnumlsolve !== undefined) {
            this.mathnumlsolve = params.mathnumlsolve;
        }
        if (params.mathlusolveArr !== undefined) {
            this.mathlusolveArr = params.mathlusolveArr;
        }
        if (params.mathnumlusolve !== undefined) {
            this.mathnumlusolve = params.mathnumlusolve;
        }
        if (params.mathBitwise !== undefined) {
            this.mathBitwise = params.mathBitwise;
        }
        if (params.mathapplybitNot !== undefined) {
            this.mathapplybitNot = params.mathapplybitNot;
        }
        if (params.mathapplybitOr !== undefined) {
            this.mathapplybitOr = params.mathapplybitOr;
        }
        if (params.mathapplybitOr1 !== undefined) {
            this.mathapplybitOr1 = params.mathapplybitOr1;
        }
        if (params.mathapplybitXor !== undefined) {
            this.mathapplybitXor = params.mathapplybitXor;
        }
        if (params.mathapplybitXor1 !== undefined) {
            this.mathapplybitXor1 = params.mathapplybitXor1;
        }
        if (params.mathnum !== undefined) {
            this.mathnum = params.mathnum;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__mathlsolve.aboutToBeDeleted();
        this.__mathTimelsolve.aboutToBeDeleted();
        this.__mathlusolve.aboutToBeDeleted();
        this.__mathTimelusolve.aboutToBeDeleted();
        this.__mathsimplify.aboutToBeDeleted();
        this.__mathTimesimplify.aboutToBeDeleted();
        this.__mathsimplifyConstant.aboutToBeDeleted();
        this.__mathTimesimplifyConstant.aboutToBeDeleted();
        this.__mathusolve.aboutToBeDeleted();
        this.__mathTimeusolve.aboutToBeDeleted();
        this.__mathcumsum.aboutToBeDeleted();
        this.__mathTimecumsum.aboutToBeDeleted();
        this.__mathmad.aboutToBeDeleted();
        this.__mathTimemad.aboutToBeDeleted();
        this.__mathmean.aboutToBeDeleted();
        this.__mathTimemean.aboutToBeDeleted();
        this.__mathProd.aboutToBeDeleted();
        this.__mathTimeProd.aboutToBeDeleted();
        this.__mathSum.aboutToBeDeleted();
        this.__mathTimeSum.aboutToBeDeleted();
        this.__mathVariance.aboutToBeDeleted();
        this.__mathTimeVariance.aboutToBeDeleted();
        this.__mathHasNumericValue.aboutToBeDeleted();
        this.__mathTimeHasNumericValue.aboutToBeDeleted();
        this.__mathIsInteger.aboutToBeDeleted();
        this.__mathTimeIsInteger.aboutToBeDeleted();
        this.__mathIsNaN.aboutToBeDeleted();
        this.__mathTimeIsNaN.aboutToBeDeleted();
        this.__mathIsNumeric.aboutToBeDeleted();
        this.__mathTimeIsNumeric.aboutToBeDeleted();
        this.__mathIsPrime.aboutToBeDeleted();
        this.__mathTimeIsPrime.aboutToBeDeleted();
        this.__mathIsZero.aboutToBeDeleted();
        this.__mathTimeIsZero.aboutToBeDeleted();
        this.__bitwiseMath.aboutToBeDeleted();
        this.__mathbitNot.aboutToBeDeleted();
        this.__mathbitOr.aboutToBeDeleted();
        this.__mathbitXor.aboutToBeDeleted();
        this.__mathTimeBitwise.aboutToBeDeleted();
        this.__mathTimebitNot.aboutToBeDeleted();
        this.__mathTimebitOr.aboutToBeDeleted();
        this.__mathTimebitXor.aboutToBeDeleted();
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
    private __mathlsolve: ObservedPropertySimple<string>;
    get mathlsolve() {
        return this.__mathlsolve.get();
    }
    set mathlsolve(newValue: string) {
        this.__mathlsolve.set(newValue);
    }
    private __mathTimelsolve: ObservedPropertySimple<string>;
    get mathTimelsolve() {
        return this.__mathTimelsolve.get();
    }
    set mathTimelsolve(newValue: string) {
        this.__mathTimelsolve.set(newValue);
    }
    private __mathlusolve: ObservedPropertySimple<string>;
    get mathlusolve() {
        return this.__mathlusolve.get();
    }
    set mathlusolve(newValue: string) {
        this.__mathlusolve.set(newValue);
    }
    private __mathTimelusolve: ObservedPropertySimple<string>;
    get mathTimelusolve() {
        return this.__mathTimelusolve.get();
    }
    set mathTimelusolve(newValue: string) {
        this.__mathTimelusolve.set(newValue);
    }
    private __mathsimplify: ObservedPropertySimple<string>;
    get mathsimplify() {
        return this.__mathsimplify.get();
    }
    set mathsimplify(newValue: string) {
        this.__mathsimplify.set(newValue);
    }
    private __mathTimesimplify: ObservedPropertySimple<string>;
    get mathTimesimplify() {
        return this.__mathTimesimplify.get();
    }
    set mathTimesimplify(newValue: string) {
        this.__mathTimesimplify.set(newValue);
    }
    private __mathsimplifyConstant: ObservedPropertySimple<string>;
    get mathsimplifyConstant() {
        return this.__mathsimplifyConstant.get();
    }
    set mathsimplifyConstant(newValue: string) {
        this.__mathsimplifyConstant.set(newValue);
    }
    private __mathTimesimplifyConstant: ObservedPropertySimple<string>;
    get mathTimesimplifyConstant() {
        return this.__mathTimesimplifyConstant.get();
    }
    set mathTimesimplifyConstant(newValue: string) {
        this.__mathTimesimplifyConstant.set(newValue);
    }
    private __mathusolve: ObservedPropertySimple<string>;
    get mathusolve() {
        return this.__mathusolve.get();
    }
    set mathusolve(newValue: string) {
        this.__mathusolve.set(newValue);
    }
    private __mathTimeusolve: ObservedPropertySimple<string>;
    get mathTimeusolve() {
        return this.__mathTimeusolve.get();
    }
    set mathTimeusolve(newValue: string) {
        this.__mathTimeusolve.set(newValue);
    }
    private __mathcumsum: ObservedPropertySimple<string>;
    get mathcumsum() {
        return this.__mathcumsum.get();
    }
    set mathcumsum(newValue: string) {
        this.__mathcumsum.set(newValue);
    }
    private __mathTimecumsum: ObservedPropertySimple<string>;
    get mathTimecumsum() {
        return this.__mathTimecumsum.get();
    }
    set mathTimecumsum(newValue: string) {
        this.__mathTimecumsum.set(newValue);
    }
    private __mathmad: ObservedPropertySimple<string>;
    get mathmad() {
        return this.__mathmad.get();
    }
    set mathmad(newValue: string) {
        this.__mathmad.set(newValue);
    }
    private __mathTimemad: ObservedPropertySimple<string>;
    get mathTimemad() {
        return this.__mathTimemad.get();
    }
    set mathTimemad(newValue: string) {
        this.__mathTimemad.set(newValue);
    }
    private __mathmean: ObservedPropertySimple<string>;
    get mathmean() {
        return this.__mathmean.get();
    }
    set mathmean(newValue: string) {
        this.__mathmean.set(newValue);
    }
    private __mathTimemean: ObservedPropertySimple<string>;
    get mathTimemean() {
        return this.__mathTimemean.get();
    }
    set mathTimemean(newValue: string) {
        this.__mathTimemean.set(newValue);
    }
    private __mathProd: ObservedPropertySimple<string>;
    get mathProd() {
        return this.__mathProd.get();
    }
    set mathProd(newValue: string) {
        this.__mathProd.set(newValue);
    }
    private __mathTimeProd: ObservedPropertySimple<string>;
    get mathTimeProd() {
        return this.__mathTimeProd.get();
    }
    set mathTimeProd(newValue: string) {
        this.__mathTimeProd.set(newValue);
    }
    private __mathSum: ObservedPropertySimple<string>;
    get mathSum() {
        return this.__mathSum.get();
    }
    set mathSum(newValue: string) {
        this.__mathSum.set(newValue);
    }
    private __mathTimeSum: ObservedPropertySimple<string>;
    get mathTimeSum() {
        return this.__mathTimeSum.get();
    }
    set mathTimeSum(newValue: string) {
        this.__mathTimeSum.set(newValue);
    }
    private __mathVariance: ObservedPropertySimple<string>;
    get mathVariance() {
        return this.__mathVariance.get();
    }
    set mathVariance(newValue: string) {
        this.__mathVariance.set(newValue);
    }
    private __mathTimeVariance: ObservedPropertySimple<string>;
    get mathTimeVariance() {
        return this.__mathTimeVariance.get();
    }
    set mathTimeVariance(newValue: string) {
        this.__mathTimeVariance.set(newValue);
    }
    private __mathHasNumericValue: ObservedPropertySimple<string>;
    get mathHasNumericValue() {
        return this.__mathHasNumericValue.get();
    }
    set mathHasNumericValue(newValue: string) {
        this.__mathHasNumericValue.set(newValue);
    }
    private __mathTimeHasNumericValue: ObservedPropertySimple<string>;
    get mathTimeHasNumericValue() {
        return this.__mathTimeHasNumericValue.get();
    }
    set mathTimeHasNumericValue(newValue: string) {
        this.__mathTimeHasNumericValue.set(newValue);
    }
    private __mathIsInteger: ObservedPropertySimple<string>;
    get mathIsInteger() {
        return this.__mathIsInteger.get();
    }
    set mathIsInteger(newValue: string) {
        this.__mathIsInteger.set(newValue);
    }
    private __mathTimeIsInteger: ObservedPropertySimple<string>;
    get mathTimeIsInteger() {
        return this.__mathTimeIsInteger.get();
    }
    set mathTimeIsInteger(newValue: string) {
        this.__mathTimeIsInteger.set(newValue);
    }
    private __mathIsNaN: ObservedPropertySimple<string>;
    get mathIsNaN() {
        return this.__mathIsNaN.get();
    }
    set mathIsNaN(newValue: string) {
        this.__mathIsNaN.set(newValue);
    }
    private __mathTimeIsNaN: ObservedPropertySimple<string>;
    get mathTimeIsNaN() {
        return this.__mathTimeIsNaN.get();
    }
    set mathTimeIsNaN(newValue: string) {
        this.__mathTimeIsNaN.set(newValue);
    }
    private __mathIsNumeric: ObservedPropertySimple<string>;
    get mathIsNumeric() {
        return this.__mathIsNumeric.get();
    }
    set mathIsNumeric(newValue: string) {
        this.__mathIsNumeric.set(newValue);
    }
    private __mathTimeIsNumeric: ObservedPropertySimple<string>;
    get mathTimeIsNumeric() {
        return this.__mathTimeIsNumeric.get();
    }
    set mathTimeIsNumeric(newValue: string) {
        this.__mathTimeIsNumeric.set(newValue);
    }
    private __mathIsPrime: ObservedPropertySimple<string>;
    get mathIsPrime() {
        return this.__mathIsPrime.get();
    }
    set mathIsPrime(newValue: string) {
        this.__mathIsPrime.set(newValue);
    }
    private __mathTimeIsPrime: ObservedPropertySimple<string>;
    get mathTimeIsPrime() {
        return this.__mathTimeIsPrime.get();
    }
    set mathTimeIsPrime(newValue: string) {
        this.__mathTimeIsPrime.set(newValue);
    }
    private __mathIsZero: ObservedPropertySimple<string>;
    get mathIsZero() {
        return this.__mathIsZero.get();
    }
    set mathIsZero(newValue: string) {
        this.__mathIsZero.set(newValue);
    }
    private __mathTimeIsZero: ObservedPropertySimple<string>;
    get mathTimeIsZero() {
        return this.__mathTimeIsZero.get();
    }
    set mathTimeIsZero(newValue: string) {
        this.__mathTimeIsZero.set(newValue);
    }
    private __bitwiseMath: ObservedPropertySimple<string>;
    get bitwiseMath() {
        return this.__bitwiseMath.get();
    }
    set bitwiseMath(newValue: string) {
        this.__bitwiseMath.set(newValue);
    }
    private __mathbitNot: ObservedPropertySimple<string>;
    get mathbitNot() {
        return this.__mathbitNot.get();
    }
    set mathbitNot(newValue: string) {
        this.__mathbitNot.set(newValue);
    }
    private __mathbitOr: ObservedPropertySimple<string>;
    get mathbitOr() {
        return this.__mathbitOr.get();
    }
    set mathbitOr(newValue: string) {
        this.__mathbitOr.set(newValue);
    }
    private __mathbitXor: ObservedPropertySimple<string>;
    get mathbitXor() {
        return this.__mathbitXor.get();
    }
    set mathbitXor(newValue: string) {
        this.__mathbitXor.set(newValue);
    }
    private __mathTimeBitwise: ObservedPropertySimple<string>;
    get mathTimeBitwise() {
        return this.__mathTimeBitwise.get();
    }
    set mathTimeBitwise(newValue: string) {
        this.__mathTimeBitwise.set(newValue);
    }
    private __mathTimebitNot: ObservedPropertySimple<string>;
    get mathTimebitNot() {
        return this.__mathTimebitNot.get();
    }
    set mathTimebitNot(newValue: string) {
        this.__mathTimebitNot.set(newValue);
    }
    private __mathTimebitOr: ObservedPropertySimple<string>;
    get mathTimebitOr() {
        return this.__mathTimebitOr.get();
    }
    set mathTimebitOr(newValue: string) {
        this.__mathTimebitOr.set(newValue);
    }
    private __mathTimebitXor: ObservedPropertySimple<string>;
    get mathTimebitXor() {
        return this.__mathTimebitXor.get();
    }
    set mathTimebitXor(newValue: string) {
        this.__mathTimebitXor.set(newValue);
    }
    private arrays;
    private arrayMath;
    private mathIsZeroArr;
    private mathIsPrimeArr;
    private mathIsNumericArr;
    private mathIsNaNArr;
    private mathIsIntegerArr;
    private mathHasNumericValueArr;
    private mathVarianceArr;
    private mathSumArr;
    private mathProdArr;
    private mathmeanArr;
    private mathmean1: string;
    private mathmadArr;
    private mathcumsumArr;
    private mathusolveArr;
    private mathnumusolve;
    private mathsimplifyConstantStr;
    private mathnumsimplifyConstant: math.SimplifyOptions;
    private mathsimplifyStr;
    private mathnumsimplify: any;
    private mathnumsimplify1: math.SimplifyOptions;
    private mathlsolveArr;
    private mathnumlsolve;
    private mathlusolveArr;
    private mathnumlusolve;
    private mathBitwise;
    private mathapplybitNot;
    private mathapplybitOr;
    private mathapplybitOr1;
    private mathapplybitXor;
    private mathapplybitXor1;
    private mathnum;
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
            this.mathBitwise = value;
        });
        TextInput.create({ placeholder: '请输入数值' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathnum = value;
        });
        Text.create('bitAnd test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.bitwiseMath = math.bitAnd(math.evaluate(this.mathBitwise), math.evaluate(this.mathnum)).toString();
                let time1 = Date.now();
                this.mathTimeBitwise = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.bitwiseMath);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeBitwise);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入数值' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathapplybitNot = value;
        });
        Text.create('bitNot test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathbitNot = math.bitNot(math.evaluate(this.mathapplybitNot)).toString();
                let time1 = Date.now();
                this.mathTimebitNot = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathbitNot);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimebitNot);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入数值' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathapplybitOr = value;
        });
        TextInput.create({ placeholder: '请输入数值' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathapplybitOr1 = value;
        });
        Text.create('bitOr test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathbitOr = math.bitOr(math.evaluate(this.mathapplybitOr), math.evaluate(this.mathapplybitOr1)).toString();
                let time1 = Date.now();
                this.mathTimebitOr = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathbitOr);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimebitOr);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入数值' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathapplybitXor = value;
        });
        TextInput.create({ placeholder: '请输入数值' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathapplybitXor1 = value;
        });
        Text.create('bitXor test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathbitXor = math.bitXor(math.evaluate(this.mathapplybitXor), math.evaluate(this.mathapplybitXor1)).toString();
                let time1 = Date.now();
                this.mathTimebitXor = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathbitXor);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimebitXor);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入对称矩阵 如： [10,1,10]' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathIsZeroArr = value;
        });
        Text.create('isZero test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathIsZero = math.isZero(math.evaluate(this.mathIsZeroArr)).toString();
                let time1 = Date.now();
                this.mathTimeIsZero = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathIsZero);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeIsZero);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入number| [10,1,10]' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathIsPrimeArr = value;
        });
        Text.create('isPrime test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathIsPrime = math.isPrime(math.evaluate(this.mathIsPrimeArr)).toString();
                let time1 = Date.now();
                this.mathTimeIsPrime = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathIsPrime);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeIsPrime);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入number| [10,1,10]' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathIsNumericArr = value;
        });
        Text.create('isNumeric test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathIsNumeric = math.isNumeric(math.evaluate(this.mathIsNumericArr)).toString();
                let time1 = Date.now();
                this.mathTimeIsNumeric = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathIsNumeric);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeIsNumeric);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入number | [10,1,10]' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathIsNaNArr = value;
        });
        Text.create('isNaN test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathIsNaN = math.isNaN(math.evaluate(this.mathIsNaNArr)).toString();
                let time1 = Date.now();
                this.mathTimeIsNaN = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathIsNaN);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeIsNaN);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入number| [10,1,10]' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathIsIntegerArr = value;
        });
        Text.create('isInteger test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathIsInteger = math.isInteger(math.evaluate(this.mathIsIntegerArr)).toString();
                let time1 = Date.now();
                this.mathTimeIsInteger = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathIsInteger);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeIsInteger);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入对称矩阵 如： [10,1,10]' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathHasNumericValueArr = value;
        });
        Text.create('hasNumericValue test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathHasNumericValue = math.hasNumericValue(math.evaluate(this.mathHasNumericValueArr)).toString();
                let time1 = Date.now();
                this.mathTimeHasNumericValue = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathHasNumericValue);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeHasNumericValue);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入对称矩阵 如： [10,1,10]' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathVarianceArr = value;
        });
        Text.create('variance test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathVariance = math.variance(math.evaluate(this.mathVarianceArr)).toString();
                let time1 = Date.now();
                this.mathTimeVariance = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathVariance);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeVariance);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入对称矩阵 如： [10,1,10]' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathSumArr = value;
        });
        Text.create('sum test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathSum = math.sum(math.evaluate(this.mathSumArr)).toString();
                let time1 = Date.now();
                this.mathTimeSum = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathSum);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeSum);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入对称矩阵 如： [10,1,10]' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathProdArr = value;
        });
        Text.create('prod test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathProd = math.prod(math.evaluate(this.mathProdArr)).toString();
                let time1 = Date.now();
                this.mathTimeProd = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathProd);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeProd);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入数组 如： [[2,5],[6,3],[1,7]]' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathmeanArr = value;
        });
        TextInput.create({ placeholder: '请输入数值或者不输入' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathmean1 = value;
        });
        Text.create('mean test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                if (this.mathmean1) {
                    this.mathmean = math.mean(math.evaluate(this.mathmeanArr), math.evaluate(this.mathmean1)).toString();
                }
                else {
                    this.mathmean = math.mean(math.evaluate(this.mathmeanArr)).toString();
                }
                let time1 = Date.now();
                this.mathTimemean = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathmean);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimemean);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入对称矩阵 如： [[10,1,10],[1,10,1],[10,1,10]]' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathmadArr = value;
        });
        Text.create('mad test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathmad = math.mad(math.evaluate(this.mathmadArr)).toString();
                let time1 = Date.now();
                this.mathTimemad = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathmad);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimemad);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入对称矩阵 如： [[10,1,10],[1,10,1],[10,1,10]]' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathcumsumArr = value;
        });
        Text.create('cumsum test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathcumsum = math.cumsum(math.evaluate(this.mathcumsumArr)).toString();
                let time1 = Date.now();
                this.mathTimecumsum = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathcumsum);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimecumsum);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入对称矩阵 如：[[10, 1, 10], [1, 10, 1], [10, 1, 10]]' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathusolveArr = value;
        });
        TextInput.create({ placeholder: '请输入矩阵 如：[[1, 2, 3]' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathnumusolve = value;
        });
        Text.create('usolve test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathusolve = math.usolve(math.evaluate(this.mathusolveArr), math.evaluate(this.mathnumusolve)).toString();
                let time1 = Date.now();
                this.mathTimeusolve = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathusolve);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimeusolve);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入表达式 如： 2 * 2 ^ (2 - 1)' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathsimplifyConstantStr = value;
        });
        TextInput.create({ placeholder: '请输入如： Boolean值 或者不输入' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathnumsimplifyConstant.exactFractions = new Boolean(value).valueOf();
        });
        Text.create('simplifyConstant test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathsimplifyConstant = math.simplifyConstant(this.mathsimplifyConstantStr, this.mathnumsimplifyConstant).toString();
                let time1 = Date.now();
                this.mathTimesimplifyConstant = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathsimplifyConstant);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimesimplifyConstant);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入表达式 如： 2 * 1 * x ^ (2 - 1)' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathsimplifyStr = value;
        });
        TextInput.create({ placeholder: '请输入数值 或者 不输入' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathnumsimplify.x = Number(value);
        });
        TextInput.create({ placeholder: '请输入如：{exactFractions: true} 或者不输入' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathnumsimplify1.exactFractions = new Boolean(value).valueOf();
        });
        Text.create('simplify test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathsimplify = math.simplify(this.mathsimplifyStr, this.mathnumsimplify, this.mathnumsimplify1).toString();
                let time1 = Date.now();
                this.mathTimesimplify = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathsimplify);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimesimplify);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入数组 如：[[-2, 3], [2, 1]]' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathlusolveArr = value;
        });
        TextInput.create({ placeholder: '请输入数组 如：[11, 9]' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathnumlusolve = value;
        });
        Text.create('lusolve test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathlusolve = math.lusolve(math.evaluate(this.mathlusolveArr), math.evaluate(this.mathnumlusolve)).toString();
                let time1 = Date.now();
                this.mathTimelusolve = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathlusolve);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimelusolve);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: '请输入数组 如：[[10, 1, 10], [1, 10, 1], [10, 1, 10]]' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathlsolveArr = value;
        });
        TextInput.create({ placeholder: '请输入数组 如：[1,2,3]' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.mathnumlsolve = value;
        });
        Text.create('lsolve test');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            try {
                let time = Date.now();
                this.mathlsolve = math.lsolve(math.evaluate(this.mathlsolveArr), math.evaluate(this.mathnumlsolve)).toString();
                let time1 = Date.now();
                this.mathTimelsolve = (time1 - time).toString();
            }
            catch (err) {
                console.log('errerr ' + err);
            }
        });
        Text.pop();
        Text.create("结果：" + this.mathlsolve);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("时间：" + this.mathTimelsolve);
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
