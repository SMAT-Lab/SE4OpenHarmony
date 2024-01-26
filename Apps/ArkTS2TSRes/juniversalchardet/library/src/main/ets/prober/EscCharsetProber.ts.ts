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
import HZSMModel from './statemachine/HZSMModel';
import ISO2022CNSMModel from './statemachine/ISO2022CNSMModel';
import ISO2022JPSMModel from './statemachine/ISO2022JPSMModel';
import ISO2022KRSMModel from './statemachine/ISO2022KRSMModel';
import { ProbingState } from './CharsetProber';
import SMModel from './statemachine/SMModel';
class EscCharsetProber extends CharsetProber {
    ////////////////////////////////////////////////////////////////
    // fields
    ////////////////////////////////////////////////////////////////
    private codingSM: CodingStateMachine[];
    private activeSM: number;
    private state: ProbingState;
    private detectedCharset: string;
    private static hzsModel: HZSMModel = new HZSMModel();
    private static iso2022cnModel: ISO2022CNSMModel = new ISO2022CNSMModel();
    private static iso2022jpModel: ISO2022JPSMModel = new ISO2022JPSMModel();
    private static iso2022krModel: ISO2022KRSMModel = new ISO2022KRSMModel();
    ////////////////////////////////////////////////////////////////
    // methods
    ////////////////////////////////////////////////////////////////
    public constructor() {
        super();
        this.codingSM = new Array(4);
        this.codingSM[0] = new CodingStateMachine(EscCharsetProber.hzsModel);
        this.codingSM[1] = new CodingStateMachine(EscCharsetProber.iso2022cnModel);
        this.codingSM[2] = new CodingStateMachine(EscCharsetProber.iso2022jpModel);
        this.codingSM[3] = new CodingStateMachine(EscCharsetProber.iso2022krModel);
        this.reset();
    }
    public getCharSetName(): string {
        return this.detectedCharset;
    }
    public getConfidence(): number {
        return 0.99; // float
    }
    public getState(): ProbingState {
        return this.state;
    }
    public handleData(buf: ArrayBuffer, offset: number, length: number): ProbingState {
        let codingState: number;
        let maxPos: number = offset + length;
        let tempIntArray = new Int8Array(buf);
        for (let i: number = offset; i < maxPos && this.state == ProbingState.DETECTING; ++i) {
            for (let j: number = this.activeSM - 1; j >= 0; --j) {
                codingState = this.codingSM[j].nextState(tempIntArray[i]);
                if (codingState == SMModel.ERROR) {
                    --this.activeSM;
                    if (this.activeSM <= 0) {
                        this.state = ProbingState.NOT_ME;
                        return this.state;
                    }
                    else if (j != this.activeSM) {
                        let t: CodingStateMachine = this.codingSM[this.activeSM];
                        this.codingSM[this.activeSM] = this.codingSM[j];
                        this.codingSM[j] = t;
                    }
                }
                else if (codingState == SMModel.ITSME) {
                    this.state = ProbingState.FOUND_IT;
                    this.detectedCharset = this.codingSM[j].getCodingStateMachine();
                    return this.state;
                }
            }
        }
        return this.state;
    }
    public reset(): void {
        this.state = ProbingState.DETECTING;
        for (let i: number = 0; i < this.codingSM.length; ++i) {
            this.codingSM[i].reset();
        }
        this.activeSM = this.codingSM.length;
        this.detectedCharset = null;
    }
    public setOption(): void {
    }
}
export default EscCharsetProber;
