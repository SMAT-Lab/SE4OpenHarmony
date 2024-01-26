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
abstract class SequenceModel {
    ////////////////////////////////////////////////////////////////
    // fields
    ////////////////////////////////////////////////////////////////
    protected charToOrderMap: number[]; // short
    protected precedenceMatrix: number[]; // byte
    protected typicalPositiveRatio: number; // float
    protected keepEnglishLetter: boolean;
    protected charsetName: string;
    ////////////////////////////////////////////////////////////////
    // methods
    ////////////////////////////////////////////////////////////////
    public constructor(charToOrderMap: number[], // short
    precedenceMatrix: number[], // byte
    typicalPositiveRatio: number, // float
    keepEnglishLetter: boolean, charsetName: string) {
        this.charToOrderMap = charToOrderMap.copyWithin(0, 0, charToOrderMap.length - 1);
        this.precedenceMatrix = precedenceMatrix.copyWithin(0, 0, charToOrderMap.length - 1);
        this.typicalPositiveRatio = typicalPositiveRatio;
        this.keepEnglishLetter = keepEnglishLetter;
        this.charsetName = charsetName;
    }
    public getOrder(b: number): number // short
     {
        var c: number = b & 0xFF; // int
        return this.charToOrderMap[c];
    }
    public getPrecedence(pos: number): number // byte
     {
        return this.precedenceMatrix[pos];
    }
    public getTypicalPositiveRatio(): number // float
     {
        return this.typicalPositiveRatio;
    }
    public getKeepEnglishLetter(): boolean {
        return this.keepEnglishLetter;
    }
    public getCharsetName(): string {
        return this.charsetName;
    }
}
export default SequenceModel;
