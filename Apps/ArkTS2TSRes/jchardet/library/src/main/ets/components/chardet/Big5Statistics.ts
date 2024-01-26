let __generate__Id: number = 0;
function generateId(): string {
    return "Big5Statistics_" + ++__generate__Id;
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
class Big5Statistics extends nsEUCStatistics {
    static mFirstByteFreq: number[];
    static mFirstByteStdDev: number;
    static mFirstByteMean: number;
    static mFirstByteWeight: number;
    static mSecondByteFreq: number[];
    static mSecondByteStdDev: number;
    static mSecondByteMean: number;
    static mSecondByteWeight: number;
    public mFirstByteFreq(): number[] {
        return Big5Statistics.mFirstByteFreq;
    }
    public mFirstByteStdDev(): number {
        return Big5Statistics.mFirstByteStdDev;
    }
    public mFirstByteMean(): number {
        return Big5Statistics.mFirstByteMean;
    }
    public mFirstByteWeight(): number {
        return Big5Statistics.mFirstByteWeight;
    }
    public mSecondByteFreq(): number[] {
        return Big5Statistics.mSecondByteFreq;
    }
    public mSecondByteStdDev(): number {
        return Big5Statistics.mSecondByteStdDev;
    }
    public mSecondByteMean(): number {
        return Big5Statistics.mSecondByteMean;
    }
    public mSecondByteWeight(): number {
        return Big5Statistics.mSecondByteWeight;
    }
    public constructor() {
        super();
        Big5Statistics.mFirstByteFreq = [
            0.000000,
            0.000000,
            0.000000,
            0.114427,
            0.061058,
            0.075598,
            0.048386,
            0.063966,
            0.027094,
            0.095787,
            0.029525,
            0.031331,
            0.036915,
            0.021805,
            0.019349,
            0.037496,
            0.018068,
            0.012760,
            0.030053,
            0.017339,
            0.016731,
            0.019501,
            0.011240,
            0.032973,
            0.016658,
            0.015872,
            0.021458,
            0.012378,
            0.017003,
            0.020802,
            0.012454,
            0.009239,
            0.012829,
            0.007922,
            0.010079,
            0.009815,
            0.010104,
            0.000000,
            0.000000,
            0.000000,
            0.000053,
            0.000035,
            0.000105,
            0.000031,
            0.000088,
            0.000027,
            0.000027,
            0.000026,
            0.000035,
            0.000024,
            0.000034,
            0.000375,
            0.000025,
            0.000028,
            0.000020,
            0.000024,
            0.000028,
            0.000031,
            0.000059,
            0.000040,
            0.000030,
            0.000079,
            0.000037,
            0.000040,
            0.000023,
            0.000030,
            0.000027,
            0.000064,
            0.000020,
            0.000027,
            0.000025,
            0.000074,
            0.000019,
            0.000023,
            0.000021,
            0.000018,
            0.000017,
            0.000035,
            0.000021,
            0.000019,
            0.000025,
            0.000017,
            0.000037,
            0.000018,
            0.000018,
            0.000019,
            0.000022,
            0.000033,
            0.000032,
            0.000000,
            0.000000,
            0.000000,
            0.000000,
            0.000000 // FreqH[fe]
        ];
        Big5Statistics.mFirstByteStdDev = 0.020606; // Lead Byte StdDev
        Big5Statistics.mFirstByteMean = 0.010638; // Lead Byte Mean
        Big5Statistics.mFirstByteWeight = 0.675261; // Lead Byte Weight
        Big5Statistics.mSecondByteFreq = [
            0.020256,
            0.003293,
            0.045811,
            0.016650,
            0.007066,
            0.004146,
            0.009229,
            0.007333,
            0.003296,
            0.005239,
            0.008282,
            0.003791,
            0.006116,
            0.003536,
            0.004024,
            0.016654,
            0.009334,
            0.005429,
            0.033392,
            0.006121,
            0.008983,
            0.002801,
            0.004221,
            0.010357,
            0.014695,
            0.077937,
            0.006314,
            0.004020,
            0.007331,
            0.007150,
            0.005341,
            0.009195,
            0.005350,
            0.005698,
            0.004472,
            0.007242,
            0.004039,
            0.011154,
            0.016184,
            0.004741,
            0.012814,
            0.007679,
            0.008045,
            0.016631,
            0.009451,
            0.016487,
            0.007287,
            0.012688,
            0.017421,
            0.013205,
            0.031480,
            0.003404,
            0.009149,
            0.008921,
            0.007514,
            0.008683,
            0.008203,
            0.031403,
            0.011733,
            0.015617,
            0.015306,
            0.004004,
            0.010899,
            0.009961,
            0.008388,
            0.010920,
            0.003925,
            0.008585,
            0.009108,
            0.015546,
            0.004659,
            0.006934,
            0.007023,
            0.020252,
            0.005387,
            0.024704,
            0.006963,
            0.002625,
            0.009512,
            0.002971,
            0.008233,
            0.010000,
            0.011973,
            0.010553,
            0.005945,
            0.006349,
            0.009401,
            0.008577,
            0.008186,
            0.008159,
            0.005033,
            0.008714,
            0.010614,
            0.006554 // FreqL[fe]
        ];
        Big5Statistics.mSecondByteStdDev = 0.009909; // Trail Byte StdDev
        Big5Statistics.mSecondByteMean = 0.010638; // Trail Byte Mean
        Big5Statistics.mSecondByteWeight = 0.324739; // Trial Byte Weight
    }
}
export default Big5Statistics;
