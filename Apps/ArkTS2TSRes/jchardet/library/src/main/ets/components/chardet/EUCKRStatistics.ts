let __generate__Id: number = 0;
function generateId(): string {
    return "EUCKRStatistics_" + ++__generate__Id;
}
/**
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is mozilla.org code.
 *
 * The Initial Developer of the Original Code is
 * Netscape Communications Corporation.
 * Portions created by the Initial Developer are Copyright (C) 1998
 * the Initial Developer. All Rights Reserved. *
 * Alternatively, the contents of this file may be used under the terms of
 * either of the GNU General Public License Version 2 or later (the "GPL"),
 * or the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 * */
import nsEUCStatistics from './nsEUCStatistics';
class EUCKRStatistics extends nsEUCStatistics {
    static mFirstByteFreq: number[];
    static mFirstByteStdDev: number;
    static mFirstByteMean: number;
    static mFirstByteWeight: number;
    static mSecondByteFreq: number[];
    static mSecondByteStdDev: number;
    static mSecondByteMean: number;
    static mSecondByteWeight: number;
    public mFirstByteFreq(): number[] {
        return EUCKRStatistics.mFirstByteFreq;
    }
    public mFirstByteStdDev(): number {
        return EUCKRStatistics.mFirstByteStdDev;
    }
    public mFirstByteMean(): number {
        return EUCKRStatistics.mFirstByteMean;
    }
    public mFirstByteWeight(): number {
        return EUCKRStatistics.mFirstByteWeight;
    }
    public mSecondByteFreq(): number[] {
        return EUCKRStatistics.mSecondByteFreq;
    }
    public mSecondByteStdDev(): number {
        return EUCKRStatistics.mSecondByteStdDev;
    }
    public mSecondByteMean(): number {
        return EUCKRStatistics.mSecondByteMean;
    }
    public mSecondByteWeight(): number {
        return EUCKRStatistics.mSecondByteWeight;
    }
    public constructor() {
        super();
        EUCKRStatistics.mFirstByteFreq = [
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000412,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.057502,
            0.033182,
            0.002267,
            0.016076,
            0.014633,
            0.032976,
            0.004122,
            0.011336,
            0.058533,
            0.024526,
            0.025969,
            0.054411,
            0.019580,
            0.063273,
            0.113974,
            0.029885,
            0.150041,
            0.059151,
            0.002679,
            0.009893,
            0.014839,
            0.026381,
            0.015045,
            0.069456,
            0.089860,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000 // FreqH[fe]
        ];
        EUCKRStatistics.mFirstByteStdDev = 0.025593; // Lead Byte StdDev
        EUCKRStatistics.mFirstByteMean = 0.010638; // Lead Byte Mean
        EUCKRStatistics.mFirstByteWeight = 0.647437; // Lead Byte Weight
        EUCKRStatistics.mSecondByteFreq = [
            0.016694,
            0.000000,
            0.012778,
            0.030091,
            0.002679,
            0.006595,
            0.001855,
            0.000824,
            0.005977,
            0.004740,
            0.003092,
            0.000824,
            0.019580,
            0.037304,
            0.008244,
            0.014633,
            0.001031,
            0.000000,
            0.003298,
            0.002061,
            0.006183,
            0.005977,
            0.000824,
            0.021847,
            0.014839,
            0.052968,
            0.017312,
            0.007626,
            0.000412,
            0.000824,
            0.011129,
            0.000000,
            0.000412,
            0.001649,
            0.005977,
            0.065746,
            0.020198,
            0.021434,
            0.014633,
            0.004122,
            0.001649,
            0.000824,
            0.000824,
            0.051937,
            0.019580,
            0.023289,
            0.026381,
            0.040396,
            0.009068,
            0.001443,
            0.003710,
            0.007420,
            0.001443,
            0.013190,
            0.002885,
            0.000412,
            0.003298,
            0.025969,
            0.000412,
            0.000412,
            0.006183,
            0.003298,
            0.066983,
            0.002679,
            0.002267,
            0.011129,
            0.000412,
            0.010099,
            0.015251,
            0.007626,
            0.043899,
            0.003710,
            0.002679,
            0.001443,
            0.010923,
            0.002885,
            0.009068,
            0.019992,
            0.000412,
            0.008450,
            0.005153,
            0.000000,
            0.010099,
            0.000000,
            0.001649,
            0.012160,
            0.011542,
            0.006595,
            0.001855,
            0.010923,
            0.000412,
            0.023702,
            0.003710,
            0.001855 // FreqL[fe]
        ];
        EUCKRStatistics.mSecondByteStdDev = 0.013937; // Trail Byte StdDev
        EUCKRStatistics.mSecondByteMean = 0.010638; // Trail Byte Mean
        EUCKRStatistics.mSecondByteWeight = 0.352563; // Trial Byte Weight
    }
}
export default EUCKRStatistics;
