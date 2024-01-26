let __generate__Id: number = 0;
function generateId(): string {
    return "nsSJISVerifier_" + ++__generate__Id;
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
class nsSJISVerifier extends nsVerifier {
    static cclass: number[];
    static states: number[];
    static stFactor: number;
    static charset: string;
    public cclass(): number[] {
        return nsSJISVerifier.cclass;
    }
    public states(): number[] {
        return nsSJISVerifier.states;
    }
    public stFactor(): number {
        return nsSJISVerifier.stFactor;
    }
    public charset(): string {
        return nsSJISVerifier.charset;
    }
    constructor() {
        super();
        nsSJISVerifier.cclass = new Array(256 / 8);
        nsSJISVerifier.cclass[0] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (0)))))))));
        nsSJISVerifier.cclass[1] = ((((((((((((0) << 4) | (0)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsSJISVerifier.cclass[2] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsSJISVerifier.cclass[3] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((0) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsSJISVerifier.cclass[4] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsSJISVerifier.cclass[5] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsSJISVerifier.cclass[6] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsSJISVerifier.cclass[7] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsSJISVerifier.cclass[8] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsSJISVerifier.cclass[9] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsSJISVerifier.cclass[10] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsSJISVerifier.cclass[11] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsSJISVerifier.cclass[12] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsSJISVerifier.cclass[13] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsSJISVerifier.cclass[14] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsSJISVerifier.cclass[15] = ((((((((((((1) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsSJISVerifier.cclass[16] = ((((((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (3))))))) << 16) | (((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (3)))))))));
        nsSJISVerifier.cclass[17] = ((((((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (3))))))) << 16) | (((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (3)))))))));
        nsSJISVerifier.cclass[18] = ((((((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (3))))))) << 16) | (((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (3)))))))));
        nsSJISVerifier.cclass[19] = ((((((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (3))))))) << 16) | (((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (3)))))))));
        nsSJISVerifier.cclass[20] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (4)))))))));
        nsSJISVerifier.cclass[21] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsSJISVerifier.cclass[22] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsSJISVerifier.cclass[23] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsSJISVerifier.cclass[24] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsSJISVerifier.cclass[25] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsSJISVerifier.cclass[26] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsSJISVerifier.cclass[27] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsSJISVerifier.cclass[28] = ((((((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (3))))))) << 16) | (((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (3)))))))));
        nsSJISVerifier.cclass[29] = ((((((((((((4) << 4) | (4)))) << 8) | (((((4) << 4) | (5))))))) << 16) | (((((((((5) << 4) | (3)))) << 8) | (((((3) << 4) | (3)))))))));
        nsSJISVerifier.cclass[30] = ((((((((((((4) << 4) | (4)))) << 8) | (((((4) << 4) | (4))))))) << 16) | (((((((((4) << 4) | (4)))) << 8) | (((((4) << 4) | (4)))))))));
        nsSJISVerifier.cclass[31] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (4))))))) << 16) | (((((((((4) << 4) | (4)))) << 8) | (((((4) << 4) | (4)))))))));
        nsSJISVerifier.states = new Array(3);
        nsSJISVerifier.states[0] = ((((((((((((nsSJISVerifier.eError) << 4) | (nsSJISVerifier.eError)))) << 8) | (((((nsSJISVerifier.eError) << 4) | (nsSJISVerifier.eError))))))) << 16) | (((((((((3) << 4) | (nsSJISVerifier.eStart)))) << 8) | (((((nsSJISVerifier.eStart) << 4) | (nsSJISVerifier.eError)))))))));
        nsSJISVerifier.states[1] = ((((((((((((nsSJISVerifier.eItsMe) << 4) | (nsSJISVerifier.eItsMe)))) << 8) | (((((nsSJISVerifier.eItsMe) << 4) | (nsSJISVerifier.eItsMe))))))) << 16) | (((((((((nsSJISVerifier.eError) << 4) | (nsSJISVerifier.eError)))) << 8) | (((((nsSJISVerifier.eError) << 4) | (nsSJISVerifier.eError)))))))));
        nsSJISVerifier.states[2] = ((((((((((((nsSJISVerifier.eStart) << 4) | (nsSJISVerifier.eStart)))) << 8) | (((((nsSJISVerifier.eStart) << 4) | (nsSJISVerifier.eStart))))))) << 16) | (((((((((nsSJISVerifier.eError) << 4) | (nsSJISVerifier.eError)))) << 8) | (((((nsSJISVerifier.eItsMe) << 4) | (nsSJISVerifier.eItsMe)))))))));
        nsSJISVerifier.charset = "Shift_JIS";
        nsSJISVerifier.stFactor = 6;
    }
    public isUCS2(): boolean {
        return false;
    }
}
export default nsSJISVerifier;
