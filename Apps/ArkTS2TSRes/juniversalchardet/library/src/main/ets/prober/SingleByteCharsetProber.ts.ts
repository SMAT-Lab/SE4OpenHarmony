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
import SequenceModel from './sequence/SequenceModel';
class SingleByteCharsetProber extends CharsetProber {
    ////////////////////////////////////////////////////////////////
    // constants
    ////////////////////////////////////////////////////////////////
    public static SAMPLE_SIZE: number = 64;
    public static SB_ENOUGH_REL_THRESHOLD: number = 1024;
    public static POSITIVE_SHORTCUT_THRESHOLD: number = 0.95;
    public static NEGATIVE_SHORTCUT_THRESHOLD: number = 0.05;
    public static SYMBOL_CAT_ORDER: number = 250;
    public static NUMBER_OF_SEQ_CAT: number = 4;
    public static POSITIVE_CAT: number = SingleByteCharsetProber.NUMBER_OF_SEQ_CAT - 1;
    public static NEGATIVE_CAT: number = 0;
    ////////////////////////////////////////////////////////////////
    // fields
    ////////////////////////////////////////////////////////////////
    private state: ProbingState;
    private model: SequenceModel;
    private reversed: boolean;
    private lastOrder: number;
    private totalSeqs: number;
    private seqCounters: number[];
    private totalChar: number;
    private freqChar: number;
    private nameProber: CharsetProber;
    ////////////////////////////////////////////////////////////////
    // methods
    ////////////////////////////////////////////////////////////////
    public constructor(model: SequenceModel, reversed?: boolean, nameProber?: CharsetProber) {
        super();
        this.model = model;
        this.reversed = reversed;
        this.nameProber = nameProber;
        this.seqCounters = new Array(SingleByteCharsetProber.NUMBER_OF_SEQ_CAT);
        this.reset();
    }
    protected keepEnglishLetters(): boolean {
        return this.model.getKeepEnglishLetter();
    }
    public getCharSetName(): string {
        if (this.nameProber == null) {
            return this.model.getCharsetName();
        }
        else {
            return this.nameProber.getCharSetName();
        }
    }
    public getConfidence(): number {
        if (this.totalSeqs > 0) {
            let r: number = 1.0 * this.seqCounters[SingleByteCharsetProber.POSITIVE_CAT] / this.totalSeqs / this.model.getTypicalPositiveRatio();
            r = r * this.freqChar / this.totalChar;
            if (r >= 1.0) {
                r = 0.99;
            }
            return r;
        }
        return 0.01;
    }
    public getState(): ProbingState {
        return this.state;
    }
    public handleData(buf: ArrayBuffer, offset: number, length: number): ProbingState {
        let order: number;
        let maxPos: number = offset + length;
        let tempIntArray = new Int8Array(buf);
        for (let i: number = offset; i < maxPos; ++i) {
            order = this.model.getOrder(tempIntArray[i]);
            if (order < SingleByteCharsetProber.SYMBOL_CAT_ORDER) {
                ++this.totalChar;
            }
            if (order < SingleByteCharsetProber.SAMPLE_SIZE) {
                ++this.freqChar;
                if (this.lastOrder < SingleByteCharsetProber.SAMPLE_SIZE) {
                    ++this.totalSeqs;
                    if (!this.reversed) {
                        ++(this.seqCounters[this.model.getPrecedence(this.lastOrder * SingleByteCharsetProber.SAMPLE_SIZE + order)]);
                    }
                    else {
                        ++(this.seqCounters[this.model.getPrecedence(order * SingleByteCharsetProber.SAMPLE_SIZE + this.lastOrder)]);
                    }
                }
            }
            this.lastOrder = order;
        }
        if (this.state == ProbingState.DETECTING) {
            if (this.totalSeqs > SingleByteCharsetProber.SB_ENOUGH_REL_THRESHOLD) {
                let cf: number = this.getConfidence();
                if (cf > SingleByteCharsetProber.POSITIVE_SHORTCUT_THRESHOLD) {
                    this.state = ProbingState.FOUND_IT;
                }
                else if (cf < SingleByteCharsetProber.NEGATIVE_SHORTCUT_THRESHOLD) {
                    this.state = ProbingState.NOT_ME;
                }
            }
        }
        return this.state;
    }
    public reset(): void {
        this.state = ProbingState.DETECTING;
        this.lastOrder = 255;
        for (let i: number = 0; i < SingleByteCharsetProber.NUMBER_OF_SEQ_CAT; ++i) {
            this.seqCounters[i] = 0;
        }
        this.totalSeqs = 0;
        this.totalChar = 0;
        this.freqChar = 0;
    }
    public setOption(): void {
    }
}
export default SingleByteCharsetProber;
