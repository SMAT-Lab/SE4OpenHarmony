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
import { BigNumber } from './BigNumber';
export default class Utils {
    static absoluteValue = BigNumber.prototype.absoluteValue;
    static abs = BigNumber.prototype.abs;
    static squareRoot = BigNumber.prototype.squareRoot;
    static sqrt = BigNumber.prototype.sqrt;
    static sd = BigNumber.prototype.sd;
    static precision = BigNumber.prototype.precision;
    static times = BigNumber.prototype.times;
    static multipliedBy = BigNumber.prototype.multipliedBy;
    static modulo = BigNumber.prototype.modulo;
    static mod = BigNumber.prototype.mod;
    static isEqualTo = BigNumber.prototype.isEqualTo;
    static eq = BigNumber.prototype.eq;
    static isGreaterThan = BigNumber.prototype.isGreaterThan;
    static gt = BigNumber.prototype.gt;
    static isGreaterThanOrEqualTo = BigNumber.prototype.isGreaterThanOrEqualTo;
    static gte = BigNumber.prototype.gte;
    static isLessThan = BigNumber.prototype.isLessThan;
    static lt = BigNumber.prototype.lt;
    static isLessThanOrEqualTo = BigNumber.prototype.isLessThanOrEqualTo;
    static lte = BigNumber.prototype.lte;
    static exponentiatedBy = BigNumber.prototype.exponentiatedBy;
    static pow = BigNumber.prototype.pow;
    static dividedToIntegerBy = BigNumber.prototype.dividedToIntegerBy;
    static idiv = BigNumber.prototype.idiv;
    static decimalPlaces = BigNumber.prototype.decimalPlaces;
    static dividedBy = BigNumber.prototype.dividedBy;
    static div = BigNumber.prototype.div;
    static bigBp = BigNumber.prototype.dp;
    static dp(value) {
        new BigNumber('12.345').dp(0, value);
    }
    static config(value: any) {
        return BigNumber.config(value);
    }
    static powFun(value, exponent) {
        return new BigNumber(value).pow(exponent);
    }
    static bigLt(value) {
        new BigNumber(1).lt(value, null);
    }
    static bigPrecision(value, precision, num?) {
        if (num === undefined) {
            new BigNumber(value).precision(precision);
        }
        else {
            new BigNumber(value).precision(precision, num);
        }
    }
    static random(value) {
        BigNumber.random(value);
    }
    static bigNumber(value) {
        new BigNumber(value);
    }
    static bigNumberString(value, base) {
        return new BigNumber(value, base).toString();
    }
    static integerValue(value, roundingMode) {
        return new BigNumber(String(value)).integerValue(roundingMode).toString();
    }
    static bigIntegerValue(value, roundingMode) {
        return new BigNumber(value).integerValue(roundingMode);
    }
    static min(min, arr) {
        return new BigNumber(min).eq(BigNumber.min.apply(null, arr));
    }
    static max(max, arr) {
        return new BigNumber(max).eq(BigNumber.max.apply(null, arr));
    }
    static bigPow(arr) {
        new BigNumber('12.345').pow(arr);
    }
    static bigDecimalPlaces(value, dp, rm) {
        return new BigNumber(value).decimalPlaces(dp, rm).valueOf();
    }
    static shiftedBy(value, shifted) {
        new BigNumber(value).shiftedBy(shifted);
    }
    static toExponential(value, toExponential) {
        new BigNumber(value).toExponential(toExponential);
    }
    static toFixed(value, toFixed) {
        new BigNumber(value).toFixed(toFixed);
    }
    static toFraction(value, toFraction) {
        new BigNumber(value).toFraction(toFraction);
    }
    static toPrecision(value, toPrecision) {
        return new BigNumber(value).toPrecision(toPrecision);
    }
    static toString(value, toString) {
        return new BigNumber(value).toString(toString);
    }
}
