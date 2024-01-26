let __generate__Id: number = 0;
function generateId(): string {
    return "nsEUCSampler_" + ++__generate__Id;
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
class nsEUCSampler {
    public mTotal: number = 0;
    public mThreshold: number = 200;
    public mState: number = 0;
    public mFirstByteCnt: number[] = new Array(94);
    public mSecondByteCnt: number[] = new Array(94);
    public mFirstByteFreq: number[] = new Array(94);
    public mSecondByteFreq: number[] = new Array(94);
    constructor() {
        this.Reset();
    }
    public Reset(): void {
        this.mTotal = 0;
        this.mState = 0;
        for (let i = 0; i < 94; i++)
            this.mFirstByteCnt[i] = this.mSecondByteCnt[i] = 0;
    }
    public EnoughData(): boolean {
        return this.mTotal > this.mThreshold;
    }
    public GetSomeData(): boolean {
        return this.mTotal > 1;
    }
    public Sample(aIn: Int8Array | null, aLen: number): boolean {
        if (!!!aIn) {
            return false;
        }
        if (this.mState == 1)
            return false;
        let p = 0;
        for (let i = 0; (i < aLen) && (1 != this.mState); i++, p++) {
            switch (this.mState) {
                case 0:
                    if ((aIn[p] & 0x0080) != 0) {
                        if ((0xff == (0xff & aIn[p])) || (0xa1 > (0xff & aIn[p]))) {
                            this.mState = 1;
                        }
                        else {
                            this.mTotal++;
                            this.mFirstByteCnt[(0xff & aIn[p]) - 0xa1]++;
                            this.mState = 2;
                        }
                    }
                    break;
                case 1:
                    break;
                case 2:
                    if ((aIn[p] & 0x0080) != 0) {
                        if ((0xff == (0xff & aIn[p]))
                            || (0xa1 > (0xff & aIn[p]))) {
                            this.mState = 1;
                        }
                        else {
                            this.mTotal++;
                            this.mSecondByteCnt[(0xff & aIn[p]) - 0xa1]++;
                            this.mState = 0;
                        }
                    }
                    else {
                        this.mState = 1;
                    }
                    break;
                default:
                    this.mState = 1;
            }
        }
        return (1 != this.mState);
    }
    public CalFreq(): void {
        for (let i = 0; i < 94; i++) {
            this.mFirstByteFreq[i] = this.mFirstByteCnt[i] / this.mTotal;
            this.mSecondByteFreq[i] = this.mSecondByteCnt[i] / this.mTotal;
        }
    }
    public GetScore(aFirstByteFreq: number[], aFirstByteWeight: number, aSecondByteFreq: number[], aSecondByteWeight: number): number {
        return aFirstByteWeight * this.GetScoreIn(aFirstByteFreq, this.mFirstByteFreq) +
            aSecondByteWeight * this.GetScoreIn(aSecondByteFreq, this.mSecondByteFreq);
    }
    public GetScoreIn(array1: number[], array2: number[]): number {
        let s = 0.0;
        let sum = 0.0;
        for (let i = 0; i < 94; i++) {
            s = array1[i] - array2[i];
            sum += s * s;
        }
        return Math.sqrt(sum) / 94.0;
    }
}
export default nsEUCSampler;
