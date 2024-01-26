/* ***** BEGIN LICENSE BLOCK *****
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
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Copyright (c) 2022 Huawei Device Co., Ltd.
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */
import CharsetProber from './CharsetProber';
import { ProbingState } from './CharsetProber';
import Constants from '../Constants';
class Latin1Prober extends CharsetProber {
    public static UDF: number = 0;
    public static OTH: number = 1;
    public static ASC: number = 2;
    public static ASS: number = 3;
    public static ACV: number = 4;
    public static ACO: number = 5;
    public static ASV: number = 6;
    public static ASO: number = 7;
    public static CLASS_NUM: number = 8;
    public static FREQ_CAT_NUM: number = 4;
    ////////////////////////////////////////////////////////////////
    // constants continued
    ////////////////////////////////////////////////////////////////
    private static latin1CharToClass: number[] = [
        Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH,
        Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH,
        Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH,
        Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH,
        Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH,
        Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH,
        Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH,
        Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH,
        Latin1Prober.OTH, Latin1Prober.ASC, Latin1Prober.ASC, Latin1Prober.ASC, Latin1Prober.ASC, Latin1Prober.ASC, Latin1Prober.ASC, Latin1Prober.ASC,
        Latin1Prober.ASC, Latin1Prober.ASC, Latin1Prober.ASC, Latin1Prober.ASC, Latin1Prober.ASC, Latin1Prober.ASC, Latin1Prober.ASC, Latin1Prober.ASC,
        Latin1Prober.ASC, Latin1Prober.ASC, Latin1Prober.ASC, Latin1Prober.ASC, Latin1Prober.ASC, Latin1Prober.ASC, Latin1Prober.ASC, Latin1Prober.ASC,
        Latin1Prober.ASC, Latin1Prober.ASC, Latin1Prober.ASC, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH,
        Latin1Prober.OTH, Latin1Prober.ASS, Latin1Prober.ASS, Latin1Prober.ASS, Latin1Prober.ASS, Latin1Prober.ASS, Latin1Prober.ASS, Latin1Prober.ASS,
        Latin1Prober.ASS, Latin1Prober.ASS, Latin1Prober.ASS, Latin1Prober.ASS, Latin1Prober.ASS, Latin1Prober.ASS, Latin1Prober.ASS, Latin1Prober.ASS,
        Latin1Prober.ASS, Latin1Prober.ASS, Latin1Prober.ASS, Latin1Prober.ASS, Latin1Prober.ASS, Latin1Prober.ASS, Latin1Prober.ASS, Latin1Prober.ASS,
        Latin1Prober.ASS, Latin1Prober.ASS, Latin1Prober.ASS, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH,
        Latin1Prober.OTH, Latin1Prober.UDF, Latin1Prober.OTH, Latin1Prober.ASO, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH,
        Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.ACO, Latin1Prober.OTH, Latin1Prober.ACO, Latin1Prober.UDF, Latin1Prober.ACO, Latin1Prober.UDF,
        Latin1Prober.UDF, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH,
        Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.ASO, Latin1Prober.OTH, Latin1Prober.ASO, Latin1Prober.UDF, Latin1Prober.ASO, Latin1Prober.ACO,
        Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH,
        Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH,
        Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH,
        Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH, Latin1Prober.OTH,
        Latin1Prober.ACV, Latin1Prober.ACV, Latin1Prober.ACV, Latin1Prober.ACV, Latin1Prober.ACV, Latin1Prober.ACV, Latin1Prober.ACO, Latin1Prober.ACO,
        Latin1Prober.ACV, Latin1Prober.ACV, Latin1Prober.ACV, Latin1Prober.ACV, Latin1Prober.ACV, Latin1Prober.ACV, Latin1Prober.ACV, Latin1Prober.ACV,
        Latin1Prober.ACO, Latin1Prober.ACO, Latin1Prober.ACV, Latin1Prober.ACV, Latin1Prober.ACV, Latin1Prober.ACV, Latin1Prober.ACV, Latin1Prober.OTH,
        Latin1Prober.ACV, Latin1Prober.ACV, Latin1Prober.ACV, Latin1Prober.ACV, Latin1Prober.ACV, Latin1Prober.ACO, Latin1Prober.ACO, Latin1Prober.ACO,
        Latin1Prober.ASV, Latin1Prober.ASV, Latin1Prober.ASV, Latin1Prober.ASV, Latin1Prober.ASV, Latin1Prober.ASV, Latin1Prober.ASO, Latin1Prober.ASO,
        Latin1Prober.ASV, Latin1Prober.ASV, Latin1Prober.ASV, Latin1Prober.ASV, Latin1Prober.ASV, Latin1Prober.ASV, Latin1Prober.ASV, Latin1Prober.ASV,
        Latin1Prober.ASO, Latin1Prober.ASO, Latin1Prober.ASV, Latin1Prober.ASV, Latin1Prober.ASV, Latin1Prober.ASV, Latin1Prober.ASV, Latin1Prober.OTH,
        Latin1Prober.ASV, Latin1Prober.ASV, Latin1Prober.ASV, Latin1Prober.ASV, Latin1Prober.ASV, Latin1Prober.ASO, Latin1Prober.ASO, Latin1Prober.ASO // F8 - FF
    ];
    private static latin1ClassModel: number[] = [
        /*      UDF OTH ASC ASS ACV ACO ASV ASO  */
        /*UDF*/ 0, 0, 0, 0, 0, 0, 0, 0,
        /*OTH*/ 0, 3, 3, 3, 3, 3, 3, 3,
        /*ASC*/ 0, 3, 3, 3, 3, 3, 3, 3,
        /*ASS*/ 0, 3, 3, 3, 1, 1, 3, 3,
        /*ACV*/ 0, 3, 3, 3, 1, 2, 1, 2,
        /*ACO*/ 0, 3, 3, 3, 3, 3, 3, 3,
        /*ASV*/ 0, 3, 1, 3, 1, 1, 1, 3,
        /*ASO*/ 0, 3, 1, 3, 1, 1, 3, 3,
    ];
    private state: ProbingState;
    private lastCharClass: number;
    private freqCounter: number[];
    public constructor() {
        super();
        this.freqCounter = new Array(Latin1Prober.FREQ_CAT_NUM);
        this.reset();
    }
    public getCharSetName(): string {
        return Constants.CHARSET_WINDOWS_1252;
    }
    public getConfidence(): number {
        if (this.state == ProbingState.NOT_ME) {
            return 0.01;
        }
        let confidence: number;
        let total: number = 0;
        for (let i: number = 0; i < this.freqCounter.length; ++i) {
            total += this.freqCounter[i];
        }
        if (total <= 0) {
            confidence = 0.0;
        }
        else {
            confidence = this.freqCounter[3] * 1.0 / total;
            confidence -= this.freqCounter[1] * 20.0 / total;
        }
        if (confidence < 0.0) {
            confidence = 0.0;
        }
        // lower the confidence of latin1 so that other more accurate detector
        // can take priority.
        confidence *= 0.50;
        return confidence;
    }
    public getState(): ProbingState {
        return this.state;
    }
    public handleData(buf: ArrayBuffer, offset: number, length: number): ProbingState {
        let newMap: Map<number, ArrayBuffer> = this.filterWithEnglishLetters(buf, offset, length);
        let charClass: number;
        let freq: number;
        let newBufLen: number;
        let newBuf: ArrayBuffer;
        for (let [key, value] of newMap.entries()) {
            newBufLen = key;
            newBuf = value;
        }
        let temp = new Int8Array(newBuf);
        for (let i: number = 0; i < newBufLen; ++i) {
            let c: number = temp[i] & 0xFF;
            charClass = Latin1Prober.latin1CharToClass[c];
            freq = Latin1Prober.latin1ClassModel[this.lastCharClass * Latin1Prober.CLASS_NUM + charClass];
            if (freq == 0) {
                this.state = ProbingState.NOT_ME;
                break;
            }
            ++this.freqCounter[freq];
            this.lastCharClass = charClass;
        }
        return this.state;
    }
    public reset(): void {
        this.state = ProbingState.DETECTING;
        this.lastCharClass = Latin1Prober.OTH;
        for (let i: number = 0; i < this.freqCounter.length; ++i) {
            this.freqCounter[i] = 0;
        }
    }
    public setOption(): void {
    }
}
export default Latin1Prober;
