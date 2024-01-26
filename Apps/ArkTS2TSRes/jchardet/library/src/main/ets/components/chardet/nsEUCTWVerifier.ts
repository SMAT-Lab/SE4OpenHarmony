let __generate__Id: number = 0;
function generateId(): string {
    return "nsEUCTWVerifier_" + ++__generate__Id;
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
class nsEUCTWVerifier extends nsVerifier {
    static cclass: number[];
    static states: number[];
    static stFactor: number;
    static charset: string;
    public cclass(): number[] {
        return nsEUCTWVerifier.cclass;
    }
    public states(): number[] {
        return nsEUCTWVerifier.states;
    }
    public stFactor(): number {
        return nsEUCTWVerifier.stFactor;
    }
    public charset(): string {
        return nsEUCTWVerifier.charset;
    }
    constructor() {
        super();
        nsEUCTWVerifier.cclass = new Array(256 / 8);
        nsEUCTWVerifier.cclass[0] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsEUCTWVerifier.cclass[1] = ((((((((((((0) << 4) | (0)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsEUCTWVerifier.cclass[2] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsEUCTWVerifier.cclass[3] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((0) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsEUCTWVerifier.cclass[4] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsEUCTWVerifier.cclass[5] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsEUCTWVerifier.cclass[6] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsEUCTWVerifier.cclass[7] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsEUCTWVerifier.cclass[8] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsEUCTWVerifier.cclass[9] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsEUCTWVerifier.cclass[10] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsEUCTWVerifier.cclass[11] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsEUCTWVerifier.cclass[12] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsEUCTWVerifier.cclass[13] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsEUCTWVerifier.cclass[14] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsEUCTWVerifier.cclass[15] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsEUCTWVerifier.cclass[16] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsEUCTWVerifier.cclass[17] = ((((((((((((0) << 4) | (6)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsEUCTWVerifier.cclass[18] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsEUCTWVerifier.cclass[19] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsEUCTWVerifier.cclass[20] = ((((((((((((4) << 4) | (4)))) << 8) | (((((4) << 4) | (4))))))) << 16) | (((((((((4) << 4) | (4)))) << 8) | (((((3) << 4) | (0)))))))));
        nsEUCTWVerifier.cclass[21] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((5) << 4) | (5)))))))));
        nsEUCTWVerifier.cclass[22] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsEUCTWVerifier.cclass[23] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsEUCTWVerifier.cclass[24] = ((((((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (3))))))) << 16) | (((((((((1) << 4) | (3)))) << 8) | (((((1) << 4) | (1)))))))));
        nsEUCTWVerifier.cclass[25] = ((((((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (3))))))) << 16) | (((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (3)))))))));
        nsEUCTWVerifier.cclass[26] = ((((((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (3))))))) << 16) | (((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (3)))))))));
        nsEUCTWVerifier.cclass[27] = ((((((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (3))))))) << 16) | (((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (3)))))))));
        nsEUCTWVerifier.cclass[28] = ((((((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (3))))))) << 16) | (((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (3)))))))));
        nsEUCTWVerifier.cclass[29] = ((((((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (3))))))) << 16) | (((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (3)))))))));
        nsEUCTWVerifier.cclass[30] = ((((((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (3))))))) << 16) | (((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (3)))))))));
        nsEUCTWVerifier.cclass[31] = ((((((((((((0) << 4) | (3)))) << 8) | (((((3) << 4) | (3))))))) << 16) | (((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (3)))))))));
        nsEUCTWVerifier.states = new Array(6);
        nsEUCTWVerifier.states[0] = ((((((((((((nsEUCTWVerifier.eError) << 4) | (4)))) << 8) | (((((3) << 4) | (3))))))) << 16) | (((((((((3) << 4) | (nsEUCTWVerifier.eStart)))) << 8) | (((((nsEUCTWVerifier.eError) << 4) | (nsEUCTWVerifier.eError)))))))));
        nsEUCTWVerifier.states[1] = ((((((((((((nsEUCTWVerifier.eItsMe) << 4) | (nsEUCTWVerifier.eItsMe)))) << 8) | (((((nsEUCTWVerifier.eError) << 4) | (nsEUCTWVerifier.eError))))))) << 16) | (((((((((nsEUCTWVerifier.eError) << 4) | (nsEUCTWVerifier.eError)))) << 8) | (((((nsEUCTWVerifier.eError) << 4) | (nsEUCTWVerifier.eError)))))))));
        nsEUCTWVerifier.states[2] = ((((((((((((nsEUCTWVerifier.eError) << 4) | (nsEUCTWVerifier.eStart)))) << 8) | (((((nsEUCTWVerifier.eError) << 4) | (nsEUCTWVerifier.eItsMe))))))) << 16) | (((((((((nsEUCTWVerifier.eItsMe) << 4) | (nsEUCTWVerifier.eItsMe)))) << 8) | (((((nsEUCTWVerifier.eItsMe) << 4) | (nsEUCTWVerifier.eItsMe)))))))));
        nsEUCTWVerifier.states[3] = ((((((((((((nsEUCTWVerifier.eError) << 4) | (nsEUCTWVerifier.eError)))) << 8) | (((((nsEUCTWVerifier.eError) << 4) | (nsEUCTWVerifier.eError))))))) << 16) | (((((((((nsEUCTWVerifier.eError) << 4) | (nsEUCTWVerifier.eStart)))) << 8) | (((((nsEUCTWVerifier.eStart) << 4) | (nsEUCTWVerifier.eStart)))))))));
        nsEUCTWVerifier.states[4] = ((((((((((((nsEUCTWVerifier.eStart) << 4) | (nsEUCTWVerifier.eStart)))) << 8) | (((((nsEUCTWVerifier.eError) << 4) | (nsEUCTWVerifier.eStart))))))) << 16) | (((((((((nsEUCTWVerifier.eError) << 4) | (nsEUCTWVerifier.eError)))) << 8) | (((((nsEUCTWVerifier.eError) << 4) | (5)))))))));
        nsEUCTWVerifier.states[5] = ((((((((((((nsEUCTWVerifier.eStart) << 4) | (nsEUCTWVerifier.eStart)))) << 8) | (((((nsEUCTWVerifier.eStart) << 4) | (nsEUCTWVerifier.eStart))))))) << 16) | (((((((((nsEUCTWVerifier.eStart) << 4) | (nsEUCTWVerifier.eStart)))) << 8) | (((((nsEUCTWVerifier.eError) << 4) | (nsEUCTWVerifier.eStart)))))))));
        nsEUCTWVerifier.charset = "x-euc-tw";
        nsEUCTWVerifier.stFactor = 7;
    }
    public isUCS2(): boolean {
        return false;
    }
    ;
}
export default nsEUCTWVerifier;
