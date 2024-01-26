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
import CodingStateMachine from './statemachine/CodingStateMachine';
import Constants from '../Constants';
import EUCKRSMModel from './statemachine/EUCKRSMModel';
import EUCKRDistributionAnalysis from './distributionanalysis/EUCKRDistributionAnalysis';
import { ProbingState } from './CharsetProber';
import SMModel from './statemachine/SMModel';
class EUCKRProber extends CharsetProber {
    ////////////////////////////////////////////////////////////////
    // fields
    ////////////////////////////////////////////////////////////////
    private codingSM: CodingStateMachine;
    private state: ProbingState;
    private distributionAnalyzer: EUCKRDistributionAnalysis;
    private lastChar: ArrayBuffer;
    private static smModel: SMModel = new EUCKRSMModel();
    ////////////////////////////////////////////////////////////////
    // methods
    ////////////////////////////////////////////////////////////////
    public constructor() {
        super();
        this.codingSM = new CodingStateMachine(EUCKRProber.smModel);
        this.distributionAnalyzer = new EUCKRDistributionAnalysis();
        this.lastChar = new ArrayBuffer(2);
        this.reset();
    }
    public getCharSetName(): string {
        return Constants.CHARSET_EUC_KR;
    }
    public getConfidence(): number {
        return this.distributionAnalyzer.getConfidence();
    }
    public getState(): ProbingState {
        return this.state;
    }
    public handleData(buf: ArrayBuffer, offset: number, length: number): ProbingState {
        let codingState: number;
        let maxPos: number = offset + length;
        let tempIntArray = new Int8Array(buf);
        for (let i: number = offset; i < maxPos; ++i) {
            codingState = this.codingSM.nextState(tempIntArray[i]);
            if (codingState == SMModel.ERROR) {
                this.state = ProbingState.NOT_ME;
                break;
            }
            if (codingState == SMModel.ITSME) {
                this.state = ProbingState.FOUND_IT;
                break;
            }
            if (codingState == SMModel.START) {
                let charLen: number = this.codingSM.getCurrentCharLen();
                if (i == offset) {
                    this.lastChar[1] = buf[offset];
                    this.distributionAnalyzer.handleOneChar(this.lastChar, 0, charLen);
                }
                else {
                    this.distributionAnalyzer.handleOneChar(buf, i - 1, charLen);
                }
            }
        }
        this.lastChar[0] = buf[maxPos - 1];
        if (this.state == ProbingState.DETECTING) {
            if (this.distributionAnalyzer.gotEnoughData() && this.getConfidence() > CharsetProber.SHORTCUT_THRESHOLD) {
                this.state = ProbingState.FOUND_IT;
            }
        }
        return this.state;
    }
    public reset(): void {
        this.codingSM.reset();
        this.state = ProbingState.DETECTING;
        this.distributionAnalyzer.reset();
        let temp = new Int8Array(this.lastChar);
        this.lastChar = temp.fill(0);
    }
    public setOption(): void {
    }
}
export default EUCKRProber;
