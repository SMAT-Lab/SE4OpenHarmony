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
import { ProbingState } from './CharsetProber';
import SMModel from './statemachine/SMModel';
import UTF8SMModel from './statemachine/UTF8SMModel';
class UTF8Prober extends CharsetProber {
    ////////////////////////////////////////////////////////////////
    // constants
    ////////////////////////////////////////////////////////////////
    public static ONE_CHAR_PROB: number = 0.5; //float
    ////////////////////////////////////////////////////////////////
    // fields
    ////////////////////////////////////////////////////////////////
    private codingSM: CodingStateMachine;
    private state: ProbingState;
    private numOfMBChar: number;
    private static smModel: SMModel = new UTF8SMModel();
    ////////////////////////////////////////////////////////////////
    // methods
    ////////////////////////////////////////////////////////////////
    public constructor() {
        super();
        this.numOfMBChar = 0;
        this.codingSM = new CodingStateMachine(UTF8Prober.smModel);
        this.reset();
    }
    public getCharSetName(): string {
        return Constants.CHARSET_UTF_8;
    }
    public handleData(buf: ArrayBuffer, offset: number, length: number): ProbingState {
        let codingState: number;
        let maxPos = offset + length;
        let intArray = new Int8Array(buf);
        for (let i: number = offset; i < maxPos; ++i) {
            codingState = this.codingSM.nextState(intArray[i]);
            if (codingState == SMModel.ERROR) {
                this.state = ProbingState.NOT_ME;
                break;
            }
            if (codingState == SMModel.ITSME) {
                this.state = ProbingState.FOUND_IT;
                break;
            }
            if (codingState == SMModel.START) {
                if (this.codingSM.getCurrentCharLen() >= 2) {
                    ++this.numOfMBChar;
                }
            }
        }
        if (this.state == ProbingState.DETECTING) {
            if (this.getConfidence() > CharsetProber.SHORTCUT_THRESHOLD) {
                this.state = ProbingState.FOUND_IT;
            }
        }
        return this.state;
    }
    public getState(): ProbingState {
        return this.state;
    }
    public reset(): void {
        this.codingSM.reset();
        this.numOfMBChar = 0;
        this.state = ProbingState.DETECTING;
    }
    public getConfidence(): number {
        let unlike: number = 0.99; // float
        if (this.numOfMBChar < 6) {
            for (let i: number = 0; i < this.numOfMBChar; ++i) {
                unlike *= UTF8Prober.ONE_CHAR_PROB;
            }
            return (1.0 - unlike);
        }
        else {
            return 0.99;
        }
    }
    public setOption(): void {
    }
}
export default UTF8Prober;
