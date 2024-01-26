let __generate__Id: number = 0;
function generateId(): string {
    return "nsUTF8Verifier_" + ++__generate__Id;
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
class nsUTF8Verifier extends nsVerifier {
    static cclass: number[];
    static states: number[];
    static stFactor: number;
    static charset: string;
    public cclass(): number[] {
        return nsUTF8Verifier.cclass;
    }
    public states(): number[] {
        return nsUTF8Verifier.states;
    }
    public stFactor(): number {
        return nsUTF8Verifier.stFactor;
    }
    public charset(): string {
        return nsUTF8Verifier.charset;
    }
    constructor() {
        super();
        nsUTF8Verifier.cclass = new Array(256 / 8);
        nsUTF8Verifier.cclass[0] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsUTF8Verifier.cclass[1] = ((((((((((((0) << 4) | (0)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsUTF8Verifier.cclass[2] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsUTF8Verifier.cclass[3] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((0) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsUTF8Verifier.cclass[4] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsUTF8Verifier.cclass[5] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsUTF8Verifier.cclass[6] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsUTF8Verifier.cclass[7] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsUTF8Verifier.cclass[8] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsUTF8Verifier.cclass[9] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsUTF8Verifier.cclass[10] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsUTF8Verifier.cclass[11] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsUTF8Verifier.cclass[12] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsUTF8Verifier.cclass[13] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsUTF8Verifier.cclass[14] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsUTF8Verifier.cclass[15] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsUTF8Verifier.cclass[16] = ((((((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (3))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsUTF8Verifier.cclass[17] = ((((((((((((4) << 4) | (4)))) << 8) | (((((4) << 4) | (4))))))) << 16) | (((((((((4) << 4) | (4)))) << 8) | (((((4) << 4) | (4)))))))));
        nsUTF8Verifier.cclass[18] = ((((((((((((4) << 4) | (4)))) << 8) | (((((4) << 4) | (4))))))) << 16) | (((((((((4) << 4) | (4)))) << 8) | (((((4) << 4) | (4)))))))));
        nsUTF8Verifier.cclass[19] = ((((((((((((4) << 4) | (4)))) << 8) | (((((4) << 4) | (4))))))) << 16) | (((((((((4) << 4) | (4)))) << 8) | (((((4) << 4) | (4)))))))));
        nsUTF8Verifier.cclass[20] = ((((((((((((5) << 4) | (5)))) << 8) | (((((5) << 4) | (5))))))) << 16) | (((((((((5) << 4) | (5)))) << 8) | (((((5) << 4) | (5)))))))));
        nsUTF8Verifier.cclass[21] = ((((((((((((5) << 4) | (5)))) << 8) | (((((5) << 4) | (5))))))) << 16) | (((((((((5) << 4) | (5)))) << 8) | (((((5) << 4) | (5)))))))));
        nsUTF8Verifier.cclass[22] = ((((((((((((5) << 4) | (5)))) << 8) | (((((5) << 4) | (5))))))) << 16) | (((((((((5) << 4) | (5)))) << 8) | (((((5) << 4) | (5)))))))));
        nsUTF8Verifier.cclass[23] = ((((((((((((5) << 4) | (5)))) << 8) | (((((5) << 4) | (5))))))) << 16) | (((((((((5) << 4) | (5)))) << 8) | (((((5) << 4) | (5)))))))));
        nsUTF8Verifier.cclass[24] = ((((((((((((6) << 4) | (6)))) << 8) | (((((6) << 4) | (6))))))) << 16) | (((((((((6) << 4) | (6)))) << 8) | (((((0) << 4) | (0)))))))));
        nsUTF8Verifier.cclass[25] = ((((((((((((6) << 4) | (6)))) << 8) | (((((6) << 4) | (6))))))) << 16) | (((((((((6) << 4) | (6)))) << 8) | (((((6) << 4) | (6)))))))));
        nsUTF8Verifier.cclass[26] = ((((((((((((6) << 4) | (6)))) << 8) | (((((6) << 4) | (6))))))) << 16) | (((((((((6) << 4) | (6)))) << 8) | (((((6) << 4) | (6)))))))));
        nsUTF8Verifier.cclass[27] = ((((((((((((6) << 4) | (6)))) << 8) | (((((6) << 4) | (6))))))) << 16) | (((((((((6) << 4) | (6)))) << 8) | (((((6) << 4) | (6)))))))));
        nsUTF8Verifier.cclass[28] = ((((((((((((8) << 4) | (8)))) << 8) | (((((8) << 4) | (8))))))) << 16) | (((((((((8) << 4) | (8)))) << 8) | (((((8) << 4) | (7)))))))));
        nsUTF8Verifier.cclass[29] = ((((((((((((8) << 4) | (8)))) << 8) | (((((9) << 4) | (8))))))) << 16) | (((((((((8) << 4) | (8)))) << 8) | (((((8) << 4) | (8)))))))));
        nsUTF8Verifier.cclass[30] = ((((((((((((11) << 4) | (11)))) << 8) | (((((11) << 4) | (11))))))) << 16) | (((((((((11) << 4) | (11)))) << 8) | (((((11) << 4) | (10)))))))));
        nsUTF8Verifier.cclass[31] = ((((((((((((0) << 4) | (0)))) << 8) | (((((15) << 4) | (14))))))) << 16) | (((((((((13) << 4) | (13)))) << 8) | (((((13) << 4) | (12)))))))));
        nsUTF8Verifier.states = new Array(26);
        nsUTF8Verifier.states[0] = ((((((((((((10) << 4) | (12)))) << 8) | (((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError))))))) << 16) | (((((((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))) << 8) | (((((nsUTF8Verifier.eStart) << 4) | (nsUTF8Verifier.eError)))))))));
        nsUTF8Verifier.states[1] = ((((((((((((3) << 4) | (4)))) << 8) | (((((5) << 4) | (6))))))) << 16) | (((((((((7) << 4) | (8)))) << 8) | (((((11) << 4) | (9)))))))));
        nsUTF8Verifier.states[2] = ((((((((((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))) << 8) | (((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError))))))) << 16) | (((((((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))) << 8) | (((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))))))));
        nsUTF8Verifier.states[3] = ((((((((((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))) << 8) | (((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError))))))) << 16) | (((((((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))) << 8) | (((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))))))));
        nsUTF8Verifier.states[4] = ((((((((((((nsUTF8Verifier.eItsMe) << 4) | (nsUTF8Verifier.eItsMe)))) << 8) | (((((nsUTF8Verifier.eItsMe) << 4) | (nsUTF8Verifier.eItsMe))))))) << 16) | (((((((((nsUTF8Verifier.eItsMe) << 4) | (nsUTF8Verifier.eItsMe)))) << 8) | (((((nsUTF8Verifier.eItsMe) << 4) | (nsUTF8Verifier.eItsMe)))))))));
        nsUTF8Verifier.states[5] = ((((((((((((nsUTF8Verifier.eItsMe) << 4) | (nsUTF8Verifier.eItsMe)))) << 8) | (((((nsUTF8Verifier.eItsMe) << 4) | (nsUTF8Verifier.eItsMe))))))) << 16) | (((((((((nsUTF8Verifier.eItsMe) << 4) | (nsUTF8Verifier.eItsMe)))) << 8) | (((((nsUTF8Verifier.eItsMe) << 4) | (nsUTF8Verifier.eItsMe)))))))));
        nsUTF8Verifier.states[6] = ((((((((((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))) << 8) | (((((5) << 4) | (5))))))) << 16) | (((((((((5) << 4) | (5)))) << 8) | (((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))))))));
        nsUTF8Verifier.states[7] = ((((((((((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))) << 8) | (((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError))))))) << 16) | (((((((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))) << 8) | (((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))))))));
        nsUTF8Verifier.states[8] = ((((((((((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))) << 8) | (((((5) << 4) | (5))))))) << 16) | (((((((((5) << 4) | (nsUTF8Verifier.eError)))) << 8) | (((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))))))));
        nsUTF8Verifier.states[9] = ((((((((((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))) << 8) | (((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError))))))) << 16) | (((((((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))) << 8) | (((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))))))));
        nsUTF8Verifier.states[10] = ((((((((((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))) << 8) | (((((7) << 4) | (7))))))) << 16) | (((((((((7) << 4) | (7)))) << 8) | (((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))))))));
        nsUTF8Verifier.states[11] = ((((((((((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))) << 8) | (((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError))))))) << 16) | (((((((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))) << 8) | (((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))))))));
        nsUTF8Verifier.states[12] = ((((((((((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))) << 8) | (((((7) << 4) | (7))))))) << 16) | (((((((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))) << 8) | (((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))))))));
        nsUTF8Verifier.states[13] = ((((((((((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))) << 8) | (((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError))))))) << 16) | (((((((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))) << 8) | (((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))))))));
        nsUTF8Verifier.states[14] = ((((((((((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))) << 8) | (((((9) << 4) | (9))))))) << 16) | (((((((((9) << 4) | (9)))) << 8) | (((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))))))));
        nsUTF8Verifier.states[15] = ((((((((((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))) << 8) | (((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError))))))) << 16) | (((((((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))) << 8) | (((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))))))));
        nsUTF8Verifier.states[16] = ((((((((((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))) << 8) | (((((9) << 4) | (nsUTF8Verifier.eError))))))) << 16) | (((((((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))) << 8) | (((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))))))));
        nsUTF8Verifier.states[17] = ((((((((((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))) << 8) | (((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError))))))) << 16) | (((((((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))) << 8) | (((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))))))));
        nsUTF8Verifier.states[18] = ((((((((((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))) << 8) | (((((12) << 4) | (12))))))) << 16) | (((((((((12) << 4) | (12)))) << 8) | (((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))))))));
        nsUTF8Verifier.states[19] = ((((((((((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))) << 8) | (((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError))))))) << 16) | (((((((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))) << 8) | (((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))))))));
        nsUTF8Verifier.states[20] = ((((((((((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))) << 8) | (((((12) << 4) | (nsUTF8Verifier.eError))))))) << 16) | (((((((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))) << 8) | (((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))))))));
        nsUTF8Verifier.states[21] = ((((((((((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))) << 8) | (((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError))))))) << 16) | (((((((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))) << 8) | (((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))))))));
        nsUTF8Verifier.states[22] = ((((((((((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))) << 8) | (((((nsUTF8Verifier.eError) << 4) | (12))))))) << 16) | (((((((((12) << 4) | (12)))) << 8) | (((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))))))));
        nsUTF8Verifier.states[23] = ((((((((((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))) << 8) | (((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError))))))) << 16) | (((((((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))) << 8) | (((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))))))));
        nsUTF8Verifier.states[24] = ((((((((((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))) << 8) | (((((nsUTF8Verifier.eStart) << 4) | (nsUTF8Verifier.eStart))))))) << 16) | (((((((((nsUTF8Verifier.eStart) << 4) | (nsUTF8Verifier.eStart)))) << 8) | (((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))))))));
        nsUTF8Verifier.states[25] = ((((((((((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))) << 8) | (((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError))))))) << 16) | (((((((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))) << 8) | (((((nsUTF8Verifier.eError) << 4) | (nsUTF8Verifier.eError)))))))));
        nsUTF8Verifier.charset = "UTF-8";
        nsUTF8Verifier.stFactor = 16;
    }
    public isUCS2(): boolean {
        return false;
    }
}
export default nsUTF8Verifier;
