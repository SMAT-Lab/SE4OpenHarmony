let __generate__Id: number = 0;
function generateId(): string {
    return "EUCTWStatistics_" + ++__generate__Id;
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
class EUCTWStatistics extends nsEUCStatistics {
    static mFirstByteFreq: number[];
    static mFirstByteStdDev: number;
    static mFirstByteMean: number;
    static mFirstByteWeight: number;
    static mSecondByteFreq: number[];
    static mSecondByteStdDev: number;
    static mSecondByteMean: number;
    static mSecondByteWeight: number;
    public mFirstByteFreq(): number[] {
        return EUCTWStatistics.mFirstByteFreq;
    }
    public mFirstByteStdDev(): number {
        return EUCTWStatistics.mFirstByteStdDev;
    }
    public mFirstByteMean(): number {
        return EUCTWStatistics.mFirstByteMean;
    }
    public mFirstByteWeight(): number {
        return EUCTWStatistics.mFirstByteWeight;
    }
    public mSecondByteFreq(): number[] {
        return EUCTWStatistics.mSecondByteFreq;
    }
    public mSecondByteStdDev(): number {
        return EUCTWStatistics.mSecondByteStdDev;
    }
    public mSecondByteMean(): number {
        return EUCTWStatistics.mSecondByteMean;
    }
    public mSecondByteWeight(): number {
        return EUCTWStatistics.mSecondByteWeight;
    }
    public constructor() {
        super();
        EUCTWStatistics.mFirstByteFreq = [
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
            0.119286,
            0.052233,
            0.044126,
            0.052494,
            0.045906,
            0.019038,
            0.032465,
            0.026252,
            0.025502,
            0.015963,
            0.052493,
            0.019256,
            0.015137,
            0.031782,
            0.017370,
            0.018494,
            0.015575,
            0.016621,
            0.007444,
            0.011642,
            0.013916,
            0.019159,
            0.016445,
            0.007851,
            0.011079,
            0.022842,
            0.015513,
            0.010033,
            0.009950,
            0.010347,
            0.013103,
            0.015371,
            0.012502,
            0.007436,
            0.018253,
            0.014134,
            0.008907,
            0.005411,
            0.009570,
            0.013598,
            0.006092,
            0.007409,
            0.008432,
            0.005816,
            0.009349,
            0.005472,
            0.007170,
            0.007420,
            0.003681,
            0.007523,
            0.004610,
            0.006154,
            0.003348,
            0.005074,
            0.005922,
            0.005254,
            0.004682,
            0.002093,
            0.000000 // FreqH[fe]
        ];
        EUCTWStatistics.mFirstByteStdDev = 0.016681; // Lead Byte StdDev
        EUCTWStatistics.mFirstByteMean = 0.010638; // Lead Byte Mean
        EUCTWStatistics.mFirstByteWeight = 0.715599; // Lead Byte Weight
        EUCTWStatistics.mSecondByteFreq = [
            0.028933,
            0.011371,
            0.011053,
            0.007232,
            0.010192,
            0.004093,
            0.015043,
            0.011752,
            0.022387,
            0.008410,
            0.012448,
            0.007473,
            0.003594,
            0.007139,
            0.018912,
            0.006083,
            0.003302,
            0.010215,
            0.008791,
            0.024236,
            0.014107,
            0.014108,
            0.010303,
            0.009728,
            0.007877,
            0.009719,
            0.007952,
            0.021028,
            0.005764,
            0.009341,
            0.006591,
            0.012517,
            0.005921,
            0.008982,
            0.008771,
            0.012802,
            0.005926,
            0.008342,
            0.003086,
            0.006843,
            0.007576,
            0.004734,
            0.016404,
            0.008803,
            0.008071,
            0.005349,
            0.008566,
            0.010840,
            0.015401,
            0.031904,
            0.008670,
            0.011479,
            0.010936,
            0.007617,
            0.008995,
            0.008114,
            0.008658,
            0.005934,
            0.010452,
            0.009142,
            0.004519,
            0.008339,
            0.007476,
            0.007027,
            0.006025,
            0.021804,
            0.024248,
            0.015895,
            0.003768,
            0.010171,
            0.010007,
            0.010178,
            0.008316,
            0.006832,
            0.006364,
            0.009141,
            0.009148,
            0.012081,
            0.011914,
            0.004464,
            0.014257,
            0.006907,
            0.011292,
            0.018622,
            0.008149,
            0.004636,
            0.006612,
            0.013478,
            0.012614,
            0.005186,
            0.048285,
            0.006816,
            0.006743,
            0.008671 // FreqL[fe]
        ];
        EUCTWStatistics.mSecondByteStdDev = 0.006630; // Trail Byte StdDev
        EUCTWStatistics.mSecondByteMean = 0.010638; // Trail Byte Mean
        EUCTWStatistics.mSecondByteWeight = 0.284401; // Trial Byte Weight
    }
}
export default EUCTWStatistics;
