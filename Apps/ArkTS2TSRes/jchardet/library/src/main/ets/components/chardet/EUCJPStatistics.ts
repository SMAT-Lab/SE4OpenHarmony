let __generate__Id: number = 0;
function generateId(): string {
    return "EUCJPStatistics_" + ++__generate__Id;
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
class EUCJPStatistics extends nsEUCStatistics {
    static mFirstByteFreq: number[];
    static mFirstByteStdDev: number;
    static mFirstByteMean: number;
    static mFirstByteWeight: number;
    static mSecondByteFreq: number[];
    static mSecondByteStdDev: number;
    static mSecondByteMean: number;
    static mSecondByteWeight: number;
    public mFirstByteFreq(): number[] {
        return EUCJPStatistics.mFirstByteFreq;
    }
    public mFirstByteStdDev(): number {
        return EUCJPStatistics.mFirstByteStdDev;
    }
    public mFirstByteMean(): number {
        return EUCJPStatistics.mFirstByteMean;
    }
    public mFirstByteWeight(): number {
        return EUCJPStatistics.mFirstByteWeight;
    }
    public mSecondByteFreq(): number[] {
        return EUCJPStatistics.mSecondByteFreq;
    }
    public mSecondByteStdDev(): number {
        return EUCJPStatistics.mSecondByteStdDev;
    }
    public mSecondByteMean(): number {
        return EUCJPStatistics.mSecondByteMean;
    }
    public mSecondByteWeight(): number {
        return EUCJPStatistics.mSecondByteWeight;
    }
    public constructor() {
        super();
        EUCJPStatistics.mFirstByteFreq = [
            0.364808,
            0.000000,
            0.000000,
            0.145325,
            0.304891,
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
            0.001835,
            0.010771,
            0.006462,
            0.001157,
            0.002114,
            0.003231,
            0.001356,
            0.007420,
            0.004189,
            0.003231,
            0.003032,
            0.033190,
            0.006303,
            0.006064,
            0.009973,
            0.002354,
            0.003670,
            0.009135,
            0.001675,
            0.002792,
            0.002194,
            0.014720,
            0.011928,
            0.000878,
            0.013124,
            0.001077,
            0.009295,
            0.003471,
            0.002872,
            0.002433,
            0.000957,
            0.001636,
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
            0.000080,
            0.000279,
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
            0.000080,
            0.000000 // FreqH[fe]
        ];
        EUCJPStatistics.mFirstByteStdDev = 0.050407; // Lead Byte StdDev
        EUCJPStatistics.mFirstByteMean = 0.010638; // Lead Byte Mean
        EUCJPStatistics.mFirstByteWeight = 0.640871; // Lead Byte Weight
        EUCJPStatistics.mSecondByteFreq = [
            0.002473,
            0.039134,
            0.152745,
            0.009694,
            0.000359,
            0.022180,
            0.000758,
            0.004308,
            0.000160,
            0.002513,
            0.003072,
            0.001316,
            0.003830,
            0.001037,
            0.003590,
            0.000957,
            0.000160,
            0.000239,
            0.006462,
            0.001596,
            0.031554,
            0.001316,
            0.002194,
            0.016555,
            0.003271,
            0.000678,
            0.000598,
            0.206438,
            0.000718,
            0.001077,
            0.003710,
            0.001356,
            0.001356,
            0.000439,
            0.004388,
            0.005704,
            0.000878,
            0.010172,
            0.007061,
            0.014680,
            0.000638,
            0.025730,
            0.002792,
            0.000718,
            0.001795,
            0.091551,
            0.000758,
            0.003909,
            0.000558,
            0.031195,
            0.007061,
            0.001316,
            0.022579,
            0.006981,
            0.007260,
            0.001117,
            0.000239,
            0.012127,
            0.000878,
            0.003790,
            0.001077,
            0.000758,
            0.002114,
            0.002234,
            0.000678,
            0.002992,
            0.003311,
            0.023416,
            0.001237,
            0.002753,
            0.005146,
            0.002194,
            0.007021,
            0.008497,
            0.013763,
            0.011768,
            0.006303,
            0.001915,
            0.000638,
            0.008776,
            0.000918,
            0.003431,
            0.057603,
            0.000439,
            0.000439,
            0.000758,
            0.002872,
            0.001675,
            0.011050,
            0.000000,
            0.000279,
            0.012127,
            0.000718,
            0.007380 // FreqL[fe]
        ];
        EUCJPStatistics.mSecondByteStdDev = 0.028247; // Trail Byte StdDev
        EUCJPStatistics.mSecondByteMean = 0.010638; // Trail Byte Mean
        EUCJPStatistics.mSecondByteWeight = 0.359129; // Trial Byte Weight
    }
}
export default EUCJPStatistics;
