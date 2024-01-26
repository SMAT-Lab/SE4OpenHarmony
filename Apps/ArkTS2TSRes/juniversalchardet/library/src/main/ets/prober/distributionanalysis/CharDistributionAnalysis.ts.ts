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
abstract class CharDistributionAnalysis {
    ////////////////////////////////////////////////////////////////
    // constants
    ////////////////////////////////////////////////////////////////
    public static SURE_NO: number = 0.01;
    public static SURE_YES: number = 0.99;
    public static ENOUGH_DATA_THRESHOLD: number = 1024;
    public static MINIMUM_DATA_THRESHOLD: number = 4;
    ////////////////////////////////////////////////////////////////
    // fields
    ////////////////////////////////////////////////////////////////
    private freqChars: number;
    private totalChars: number;
    protected charToFreqOrder: number[]; // set by subclasses
    protected typicalDistributionRatio: number; // set by subclasses
    ////////////////////////////////////////////////////////////////
    // methods
    ////////////////////////////////////////////////////////////////
    public constructor() {
        this.reset();
    }
    public handleData(buf: ArrayBuffer, offset: number, length: number): void {
    }
    public handleOneChar(buf: ArrayBuffer, offset: number, charLength: number): void {
        let order: number = -1;
        if (charLength == 2) {
            order = this.getOrder(buf, offset);
        }
        if (order >= 0) {
            ++this.totalChars;
            if (order < this.charToFreqOrder.length) {
                if (512 > this.charToFreqOrder[order]) {
                    ++this.freqChars;
                }
            }
        }
    }
    public getConfidence(): number {
        if (this.totalChars <= 0 || this.freqChars <= CharDistributionAnalysis.MINIMUM_DATA_THRESHOLD) {
            return CharDistributionAnalysis.SURE_NO;
        }
        if (this.totalChars != this.freqChars) {
            let r: number = this.freqChars / ((this.totalChars - this.freqChars) * this.typicalDistributionRatio);
            if (r < CharDistributionAnalysis.SURE_YES) {
                return r;
            }
        }
        return CharDistributionAnalysis.SURE_YES;
    }
    public reset(): void {
        this.totalChars = 0;
        this.freqChars = 0;
    }
    public setOption(): void {
    }
    public gotEnoughData(): boolean {
        return (this.totalChars > CharDistributionAnalysis.ENOUGH_DATA_THRESHOLD);
    }
    protected abstract getOrder(buf: ArrayBuffer, offset: number): number;
}
export default CharDistributionAnalysis;
