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
import Big5Prober from './Big5Prober';
import CharsetProber from './CharsetProber';
import EUCJPProber from './EUCJPProber';
import EUCKRProber from './EUCKRProber';
import EUCTWProber from './EUCTWProber';
import GB18030Prober from './GB18030Prober';
import { ProbingState } from './CharsetProber';
import SJISProber from './SJISProber';
import UTF8Prober from './UTF8Prober';
class MBCSGroupProber extends CharsetProber {
    ////////////////////////////////////////////////////////////////
    // fields
    ////////////////////////////////////////////////////////////////
    private state: ProbingState;
    private probers: CharsetProber[] = new Array();
    private bestGuess: CharsetProber;
    private activeNum: number;
    ////////////////////////////////////////////////////////////////
    // methods
    ////////////////////////////////////////////////////////////////
    public constructor() {
        super();
        this.probers.push(new UTF8Prober());
        this.probers.push(new SJISProber());
        this.probers.push(new EUCJPProber());
        this.probers.push(new GB18030Prober());
        this.probers.push(new EUCKRProber());
        this.probers.push(new Big5Prober());
        this.probers.push(new EUCTWProber());
        this.reset();
    }
    public getCharSetName(): string {
        if (this.bestGuess == null) {
            this.getConfidence();
            if (this.bestGuess == null) {
                this.bestGuess = this.probers[0];
            }
        }
        return this.bestGuess.getCharSetName();
    }
    public getConfidence(): number {
        let bestConf: number = 0.0; // float
        let cf: number;
        if (this.state == ProbingState.FOUND_IT) {
            return 0.99; // float
        }
        else if (this.state == ProbingState.NOT_ME) {
            return 0.01; // float
        }
        else {
            for (let prober of this.probers) {
                if (!prober.isActive()) {
                    continue;
                }
                cf = prober.getConfidence();
                if (bestConf < cf) {
                    bestConf = cf;
                    this.bestGuess = prober;
                }
            }
        }
        return bestConf;
    }
    public getState(): ProbingState {
        return this.state;
    }
    public handleData(buf: ArrayBuffer, offset: number, length: number): ProbingState {
        let st: ProbingState;
        let keepNext: boolean = true;
        let highbyteBuf: ArrayBuffer = new ArrayBuffer(length);
        let highpos: number = 0;
        let maxPos = offset + length;
        let intArray = new Int8Array(buf);
        let temp = new Int8Array(buf.byteLength);
        for (let i: number = offset; i < maxPos; ++i) {
            if ((intArray[i] & 0x80) != 0) {
                temp[highpos++] = intArray[i];
                keepNext = true;
            }
            else {
                //if previous is highbyte, keep this even it is a ASCII
                if (keepNext) {
                    temp[highpos++] = intArray[i];
                    keepNext = false;
                }
            }
        }
        highbyteBuf = temp;
        for (let prober of this.probers) {
            if (!prober.isActive()) {
                continue;
            }
            st = prober.handleData(highbyteBuf, 0, highpos);
            if (st == ProbingState.FOUND_IT) {
                this.bestGuess = prober;
                this.state = ProbingState.FOUND_IT;
                break;
            }
            else if (st == ProbingState.NOT_ME) {
                prober.setActive(false);
                this.activeNum--;
                if (this.activeNum <= 0) {
                    this.state = ProbingState.NOT_ME;
                    break;
                }
            }
        }
        return this.state;
    }
    public reset(): void {
        this.activeNum = 0;
        for (let prober of this.probers) {
            prober.reset();
            prober.setActive(true);
            this.activeNum++;
        }
        this.bestGuess = null;
        this.state = ProbingState.DETECTING;
    }
    public setOption(): void {
    }
}
export default MBCSGroupProber;
