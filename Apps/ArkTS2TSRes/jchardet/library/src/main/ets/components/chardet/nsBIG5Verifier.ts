let __generate__Id: number = 0;
function generateId(): string {
    return "nsBIG5Verifier_" + ++__generate__Id;
}
/**
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
 * the Initial Developer. All Rights Reserved. *
 * Alternatively, the contents of this file may be used under the terms of
 * either of the GNU General Public License Version 2 or later (the "GPL"),
 * or the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 * */
import nsVerifier from './nsVerifier';
class nsBIG5Verifier extends nsVerifier {
    static cclass: number[];
    static states: number[];
    static stFactor: number;
    static charset: string;
    public cclass(): number[] {
        return nsBIG5Verifier.cclass;
    }
    public states(): number[] {
        return nsBIG5Verifier.states;
    }
    public stFactor(): number {
        return nsBIG5Verifier.stFactor;
    }
    public charset(): string {
        return nsBIG5Verifier.charset;
    }
    constructor() {
        super();
        nsBIG5Verifier.cclass = new Array(256 / 8);
        nsBIG5Verifier.cclass[0] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsBIG5Verifier.cclass[1] = ((((((((((((0) << 4) | (0)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsBIG5Verifier.cclass[2] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsBIG5Verifier.cclass[3] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((0) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsBIG5Verifier.cclass[4] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsBIG5Verifier.cclass[5] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsBIG5Verifier.cclass[6] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsBIG5Verifier.cclass[7] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsBIG5Verifier.cclass[8] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsBIG5Verifier.cclass[9] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsBIG5Verifier.cclass[10] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsBIG5Verifier.cclass[11] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsBIG5Verifier.cclass[12] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsBIG5Verifier.cclass[13] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsBIG5Verifier.cclass[14] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsBIG5Verifier.cclass[15] = ((((((((((((1) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsBIG5Verifier.cclass[16] = ((((((((((((4) << 4) | (4)))) << 8) | (((((4) << 4) | (4))))))) << 16) | (((((((((4) << 4) | (4)))) << 8) | (((((4) << 4) | (4)))))))));
        nsBIG5Verifier.cclass[17] = ((((((((((((4) << 4) | (4)))) << 8) | (((((4) << 4) | (4))))))) << 16) | (((((((((4) << 4) | (4)))) << 8) | (((((4) << 4) | (4)))))))));
        nsBIG5Verifier.cclass[18] = ((((((((((((4) << 4) | (4)))) << 8) | (((((4) << 4) | (4))))))) << 16) | (((((((((4) << 4) | (4)))) << 8) | (((((4) << 4) | (4)))))))));
        nsBIG5Verifier.cclass[19] = ((((((((((((4) << 4) | (4)))) << 8) | (((((4) << 4) | (4))))))) << 16) | (((((((((4) << 4) | (4)))) << 8) | (((((4) << 4) | (4)))))))));
        nsBIG5Verifier.cclass[20] = ((((((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (3))))))) << 16) | (((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (4)))))))));
        nsBIG5Verifier.cclass[21] = ((((((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (3))))))) << 16) | (((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (3)))))))));
        nsBIG5Verifier.cclass[22] = ((((((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (3))))))) << 16) | (((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (3)))))))));
        nsBIG5Verifier.cclass[23] = ((((((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (3))))))) << 16) | (((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (3)))))))));
        nsBIG5Verifier.cclass[24] = ((((((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (3))))))) << 16) | (((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (3)))))))));
        nsBIG5Verifier.cclass[25] = ((((((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (3))))))) << 16) | (((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (3)))))))));
        nsBIG5Verifier.cclass[26] = ((((((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (3))))))) << 16) | (((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (3)))))))));
        nsBIG5Verifier.cclass[27] = ((((((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (3))))))) << 16) | (((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (3)))))))));
        nsBIG5Verifier.cclass[28] = ((((((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (3))))))) << 16) | (((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (3)))))))));
        nsBIG5Verifier.cclass[29] = ((((((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (3))))))) << 16) | (((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (3)))))))));
        nsBIG5Verifier.cclass[30] = ((((((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (3))))))) << 16) | (((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (3)))))))));
        nsBIG5Verifier.cclass[31] = ((((((((((((0) << 4) | (3)))) << 8) | (((((3) << 4) | (3))))))) << 16) | (((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (3)))))))));
        nsBIG5Verifier.states = new Array(3);
        nsBIG5Verifier.states[0] = ((((((((((((nsBIG5Verifier.eError) << 4) | (nsBIG5Verifier.eError)))) << 8) | (((((nsBIG5Verifier.eError) << 4) | (nsBIG5Verifier.eError))))))) << 16) | (((((((((3) << 4) | (nsBIG5Verifier.eStart)))) << 8) | (((((nsBIG5Verifier.eStart) << 4) | (nsBIG5Verifier.eError)))))))));
        nsBIG5Verifier.states[1] = ((((((((((((nsBIG5Verifier.eError) << 4) | (nsBIG5Verifier.eItsMe)))) << 8) | (((((nsBIG5Verifier.eItsMe) << 4) | (nsBIG5Verifier.eItsMe))))))) << 16) | (((((((((nsBIG5Verifier.eItsMe) << 4) | (nsBIG5Verifier.eItsMe)))) << 8) | (((((nsBIG5Verifier.eError) << 4) | (nsBIG5Verifier.eError)))))))));
        nsBIG5Verifier.states[2] = ((((((((((((nsBIG5Verifier.eStart) << 4) | (nsBIG5Verifier.eStart)))) << 8) | (((((nsBIG5Verifier.eStart) << 4) | (nsBIG5Verifier.eStart))))))) << 16) | (((((((((nsBIG5Verifier.eStart) << 4) | (nsBIG5Verifier.eStart)))) << 8) | (((((nsBIG5Verifier.eStart) << 4) | (nsBIG5Verifier.eError)))))))));
        nsBIG5Verifier.charset = "Big5";
        nsBIG5Verifier.stFactor = 5;
    }
    public isUCS2(): boolean {
        return false;
    }
}
export default nsBIG5Verifier;
