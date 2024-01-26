let __generate__Id: number = 0;
function generateId(): string {
    return "GB2312Statistics_" + ++__generate__Id;
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
class GB2312Statistics extends nsEUCStatistics {
    static mFirstByteFreq: number[];
    static mFirstByteStdDev: number;
    static mFirstByteMean: number;
    static mFirstByteWeight: number;
    static mSecondByteFreq: number[];
    static mSecondByteStdDev: number;
    static mSecondByteMean: number;
    static mSecondByteWeight: number;
    public mFirstByteFreq(): number[] {
        return GB2312Statistics.mFirstByteFreq;
    }
    public mFirstByteStdDev(): number {
        return GB2312Statistics.mFirstByteStdDev;
    }
    public mFirstByteMean(): number {
        return GB2312Statistics.mFirstByteMean;
    }
    public mFirstByteWeight(): number {
        return GB2312Statistics.mFirstByteWeight;
    }
    public mSecondByteFreq(): number[] {
        return GB2312Statistics.mSecondByteFreq;
    }
    public mSecondByteStdDev(): number {
        return GB2312Statistics.mSecondByteStdDev;
    }
    public mSecondByteMean(): number {
        return GB2312Statistics.mSecondByteMean;
    }
    public mSecondByteWeight(): number {
        return GB2312Statistics.mSecondByteWeight;
    }
    public constructor() {
        super();
        GB2312Statistics.mFirstByteFreq = [
            0.011628,
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
            0.011628,
            0.012403,
            0.009302,
            0.003876,
            0.017829,
            0.037209,
            0.008527,
            0.010078,
            0.019380,
            0.054264,
            0.010078,
            0.041085,
            0.020930,
            0.018605,
            0.010078,
            0.013178,
            0.016279,
            0.006202,
            0.009302,
            0.017054,
            0.011628,
            0.008527,
            0.004651,
            0.006202,
            0.017829,
            0.024806,
            0.020155,
            0.013953,
            0.032558,
            0.035659,
            0.068217,
            0.010853,
            0.036434,
            0.117054,
            0.027907,
            0.100775,
            0.010078,
            0.017829,
            0.062016,
            0.012403,
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
            0.001550,
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
        GB2312Statistics.mFirstByteStdDev = 0.020081; // Lead Byte StdDev
        GB2312Statistics.mFirstByteMean = 0.010638; // Lead Byte Mean
        GB2312Statistics.mFirstByteWeight = 0.586533; // Lead Byte Weight
        GB2312Statistics.mSecondByteFreq = [
            0.006202,
            0.031008,
            0.005426,
            0.003101,
            0.001550,
            0.003101,
            0.082171,
            0.014729,
            0.006977,
            0.001550,
            0.013953,
            0.000000,
            0.013953,
            0.010078,
            0.008527,
            0.006977,
            0.004651,
            0.003101,
            0.003101,
            0.003101,
            0.008527,
            0.003101,
            0.005426,
            0.005426,
            0.005426,
            0.003101,
            0.001550,
            0.006202,
            0.014729,
            0.010853,
            0.000000,
            0.011628,
            0.000000,
            0.031783,
            0.013953,
            0.030233,
            0.039535,
            0.008527,
            0.015504,
            0.000000,
            0.003101,
            0.008527,
            0.016279,
            0.005426,
            0.001550,
            0.013953,
            0.013953,
            0.044961,
            0.003101,
            0.004651,
            0.006977,
            0.001550,
            0.005426,
            0.012403,
            0.001550,
            0.015504,
            0.000000,
            0.006202,
            0.001550,
            0.000000,
            0.007752,
            0.006977,
            0.001550,
            0.009302,
            0.011628,
            0.004651,
            0.010853,
            0.012403,
            0.017829,
            0.005426,
            0.024806,
            0.000000,
            0.006202,
            0.000000,
            0.082171,
            0.015504,
            0.004651,
            0.000000,
            0.006977,
            0.004651,
            0.000000,
            0.008527,
            0.012403,
            0.004651,
            0.003876,
            0.003101,
            0.022481,
            0.024031,
            0.001550,
            0.047287,
            0.009302,
            0.001550,
            0.005426,
            0.017054 // FreqL[fe]
        ];
        GB2312Statistics.mSecondByteStdDev = 0.014156; // Trail Byte StdDev
        GB2312Statistics.mSecondByteMean = 0.010638; // Trail Byte Mean
        GB2312Statistics.mSecondByteWeight = 0.413467; // Trial Byte Weight
    }
}
export default GB2312Statistics;
