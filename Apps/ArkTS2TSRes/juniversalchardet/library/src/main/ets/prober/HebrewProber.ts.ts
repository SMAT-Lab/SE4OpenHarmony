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
class HebrewProber extends CharsetProber {
    ////////////////////////////////////////////////////////////////
    // fields
    ////////////////////////////////////////////////////////////////
    public static FINAL_KAF: number = 0xEA;
    public static NORMAL_KAF: number = 0xEB;
    public static FINAL_MEM: number = 0xED;
    public static NORMAL_MEM: number = 0xEE;
    public static FINAL_NUN: number = 0xEF;
    public static NORMAL_NUN: number = 0xF0;
    public static FINAL_PE: number = 0xF3;
    public static NORMAL_PE: number = 0xF4;
    public static FINAL_TSADI: number = 0xF5;
    public static NORMAL_TSADI: number = 0xF6;
    public static SPACE: number = 0x20;
    public static MIN_FINAL_CHAR_DISTANCE: number = 5;
    public static MIN_MODEL_DISTANCE: number = 0.01;
    ////////////////////////////////////////////////////////////////
    // fields
    ////////////////////////////////////////////////////////////////
    private finalCharLogicalScore: number;
    private finalCharVisualScore: number;
    private prev: number;
    private beforePrev: number;
    private logicalProber: CharsetProber;
    private visualProber: CharsetProber;
    ////////////////////////////////////////////////////////////////
    // methods
    ////////////////////////////////////////////////////////////////
    public constructor() {
        super();
        this.logicalProber = null;
        this.visualProber = null;
        this.reset();
    }
    public setModalProbers(logicalProber: CharsetProber, visualProber: CharsetProber): void {
        this.logicalProber = logicalProber;
        this.visualProber = visualProber;
    }
    public getCharSetName(): string {
        // If the final letter score distance is dominant enough, rely on it.
        let finalsub: number = this.finalCharLogicalScore - this.finalCharVisualScore;
        if (finalsub >= HebrewProber.MIN_FINAL_CHAR_DISTANCE) {
            return Constants.CHARSET_WINDOWS_1255;
        }
        if (finalsub <= -HebrewProber.MIN_FINAL_CHAR_DISTANCE) {
            return Constants.CHARSET_ISO_8859_8;
        }
        // It's not dominant enough, try to rely on the model scores instead.
        let modelsub: number = this.logicalProber.getConfidence() - this.visualProber.getConfidence();
        if (modelsub > HebrewProber.MIN_MODEL_DISTANCE) {
            return Constants.CHARSET_WINDOWS_1255;
        }
        if (modelsub < -HebrewProber.MIN_MODEL_DISTANCE) {
            return Constants.CHARSET_ISO_8859_8;
        }
        // Still no good, back to final letter distance, maybe it'll save the day.
        if (finalsub < 0) {
            return Constants.CHARSET_ISO_8859_8;
        }
        // (finalsub > 0 - Logical) or (don't know what to do) default to Logical.
        return Constants.CHARSET_WINDOWS_1255;
    }
    public getConfidence(): number {
        return 0.0;
    }
    public getState(): ProbingState {
        // Remain active as long as any of the model probers are active.
        if ((this.logicalProber.getState() == ProbingState.NOT_ME) &&
            (this.visualProber.getState() == ProbingState.NOT_ME)) {
            return ProbingState.NOT_ME;
        }
        return ProbingState.DETECTING;
    }
    public handleData(buf: ArrayBuffer, offset: number, length: number): ProbingState {
        if (this.getState() == ProbingState.NOT_ME) {
            return ProbingState.NOT_ME;
        }
        let c: number;
        let maxPos: number = offset + length;
        let int8Array = new Int8Array(buf);
        for (let i: number = offset; i < maxPos; ++i) {
            c = int8Array[i];
            if (c == HebrewProber.SPACE) {
                if (this.beforePrev != HebrewProber.SPACE) {
                    if (HebrewProber.isFinal(this.prev)) {
                        ++this.finalCharLogicalScore;
                    }
                    else if (HebrewProber.isNonFinal(this.prev)) {
                        ++this.finalCharVisualScore;
                    }
                }
            }
            else {
                if ((this.beforePrev == HebrewProber.SPACE) &&
                    HebrewProber.isFinal(this.prev) &&
                    c != HebrewProber.SPACE) {
                    ++this.finalCharVisualScore;
                }
            }
            this.beforePrev = this.prev;
            this.prev = c;
        }
        return ProbingState.DETECTING;
    }
    public reset(): void {
        this.finalCharLogicalScore = 0;
        this.finalCharVisualScore = 0;
        // mPrev and mBeforePrev are initialized to space in order to simulate a word
        // delimiter at the beginning of the data
        this.prev = HebrewProber.SPACE;
        this.beforePrev = HebrewProber.SPACE;
    }
    public setOption(): void {
    }
    protected static isFinal(b: number): boolean {
        let c: number = b & 0xFF;
        return (c == HebrewProber.FINAL_KAF ||
            c == HebrewProber.FINAL_MEM ||
            c == HebrewProber.FINAL_NUN ||
            c == HebrewProber.FINAL_PE ||
            c == HebrewProber.FINAL_TSADI);
    }
    protected static isNonFinal(b: number): boolean {
        let c: number = b & 0xFF;
        return (c == HebrewProber.NORMAL_KAF ||
            c == HebrewProber.NORMAL_MEM ||
            c == HebrewProber.NORMAL_NUN ||
            c == HebrewProber.NORMAL_PE);
        // The normal Tsadi is not a good Non-Final letter due to words like
        // 'lechotet' (to chat) containing an apostrophe after the tsadi. This
        // apostrophe is converted to a space in FilterWithoutEnglishLetters causing
        // the Non-Final tsadi to appear at an end of a word even though this is not
        // the case in the original text.
        // The letters Pe and Kaf rarely display a related behavior of not being a
        // good Non-Final letter. Words like 'Pop', 'Winamp' and 'Mubarak' for
        // example legally end with a Non-Final Pe or Kaf. However, the benefit of
        // these letters as Non-Final letters outweighs the damage since these words
        // are quite rare.
    }
}
export default HebrewProber;
