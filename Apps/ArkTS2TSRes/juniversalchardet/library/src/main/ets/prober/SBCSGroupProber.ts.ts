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
import HebrewProber from './HebrewProber';
import SingleByteCharsetProber from './SingleByteCharsetProber';
import HebrewModel from './sequence/HebrewModel';
import Ibm855Model from './sequence/Ibm855Model';
import Ibm866Model from './sequence/Ibm866Model';
import Koi8rModel from './sequence/Koi8rModel';
import Latin5BulgarianModel from './sequence/Latin5BulgarianModel';
import Latin5Model from './sequence/Latin5Model';
import Latin7Model from './sequence/Latin7Model';
import MacCyrillicModel from './sequence/MacCyrillicModel';
import SequenceModel from './sequence/SequenceModel';
import ThaiModel from './sequence/ThaiModel';
import Win1251BulgarianModel from './sequence/Win1251BulgarianModel';
import Win1251Model from './sequence/Win1251Model';
import Win1253Model from './sequence/Win1253Model';
class SBCSGroupProber extends CharsetProber {
    private state: ProbingState;
    private probers: CharsetProber[] = new Array();
    private bestGuess: CharsetProber;
    private activeNum: number;
    public constructor() {
        super();
        this.probers.push(new SingleByteCharsetProber(new Win1251Model(), false, null));
        this.probers.push(new SingleByteCharsetProber(new Koi8rModel(), false, null));
        this.probers.push(new SingleByteCharsetProber(new Latin5Model(), false, null));
        this.probers.push(new SingleByteCharsetProber(new MacCyrillicModel(), false, null));
        this.probers.push(new SingleByteCharsetProber(new Ibm866Model(), false, null));
        this.probers.push(new SingleByteCharsetProber(new Ibm855Model(), false, null));
        this.probers.push(new SingleByteCharsetProber(new Latin7Model(), false, null));
        this.probers.push(new SingleByteCharsetProber(new Win1253Model(), false, null));
        this.probers.push(new SingleByteCharsetProber(new Latin5BulgarianModel(), false, null));
        this.probers.push(new SingleByteCharsetProber(new Win1251BulgarianModel(), false, null));
        this.probers.push(new SingleByteCharsetProber(new ThaiModel(), false, null));
        let hebrewModel: SequenceModel = new HebrewModel();
        let hebprober: HebrewProber = new HebrewProber();
        let singleByte1: CharsetProber = new SingleByteCharsetProber(hebrewModel, false, hebprober);
        let singleByte2: CharsetProber = new SingleByteCharsetProber(hebrewModel, true, hebprober);
        hebprober.setModalProbers(singleByte1, singleByte2);
        this.probers.push(hebprober);
        this.probers.push(singleByte1);
        this.probers.push(singleByte2);
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
        let bestConf: number = 0.0;
        let cf: number;
        if (this.state == ProbingState.FOUND_IT) {
            return 0.99;
        }
        else if (this.state == ProbingState.NOT_ME) {
            return 0.01;
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
        do {
            let newMap: Map<number, ArrayBuffer> = this.filterWithoutEnglishLetters(buf, offset, length);
            let position: number;
            let arrayBuffer: ArrayBuffer;
            for (let [key, value] of newMap.entries()) {
                position = key;
                arrayBuffer = value;
            }
            if (position == 0) {
                break;
            }
            for (let prober of this.probers) {
                if (!prober.isActive()) {
                    continue;
                }
                st = prober.handleData(arrayBuffer, 0, position);
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
        } while (false);
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
export default SBCSGroupProber;
