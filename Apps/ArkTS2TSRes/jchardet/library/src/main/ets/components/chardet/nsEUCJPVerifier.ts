let __generate__Id: number = 0;
function generateId(): string {
    return "nsEUCJPVerifier_" + ++__generate__Id;
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
class nsEUCJPVerifier extends nsVerifier {
    static cclass: number[];
    static states: number[];
    static stFactor: number;
    static charset: string;
    public cclass(): number[] {
        return nsEUCJPVerifier.cclass;
    }
    public states(): number[] {
        return nsEUCJPVerifier.states;
    }
    public stFactor(): number {
        return nsEUCJPVerifier.stFactor;
    }
    public charset(): string {
        return nsEUCJPVerifier.charset;
    }
    constructor() {
        super();
        nsEUCJPVerifier.cclass = new Array(256 / 8);
        nsEUCJPVerifier.cclass[0] = ((((((((((((4) << 4) | (4)))) << 8) | (((((4) << 4) | (4))))))) << 16) | (((((((((4) << 4) | (4)))) << 8) | (((((4) << 4) | (4)))))))));
        nsEUCJPVerifier.cclass[1] = ((((((((((((5) << 4) | (5)))) << 8) | (((((4) << 4) | (4))))))) << 16) | (((((((((4) << 4) | (4)))) << 8) | (((((4) << 4) | (4)))))))));
        nsEUCJPVerifier.cclass[2] = ((((((((((((4) << 4) | (4)))) << 8) | (((((4) << 4) | (4))))))) << 16) | (((((((((4) << 4) | (4)))) << 8) | (((((4) << 4) | (4)))))))));
        nsEUCJPVerifier.cclass[3] = ((((((((((((4) << 4) | (4)))) << 8) | (((((4) << 4) | (4))))))) << 16) | (((((((((5) << 4) | (4)))) << 8) | (((((4) << 4) | (4)))))))));
        nsEUCJPVerifier.cclass[4] = ((((((((((((4) << 4) | (4)))) << 8) | (((((4) << 4) | (4))))))) << 16) | (((((((((4) << 4) | (4)))) << 8) | (((((4) << 4) | (4)))))))));
        nsEUCJPVerifier.cclass[5] = ((((((((((((4) << 4) | (4)))) << 8) | (((((4) << 4) | (4))))))) << 16) | (((((((((4) << 4) | (4)))) << 8) | (((((4) << 4) | (4)))))))));
        nsEUCJPVerifier.cclass[6] = ((((((((((((4) << 4) | (4)))) << 8) | (((((4) << 4) | (4))))))) << 16) | (((((((((4) << 4) | (4)))) << 8) | (((((4) << 4) | (4)))))))));
        nsEUCJPVerifier.cclass[7] = ((((((((((((4) << 4) | (4)))) << 8) | (((((4) << 4) | (4))))))) << 16) | (((((((((4) << 4) | (4)))) << 8) | (((((4) << 4) | (4)))))))));
        nsEUCJPVerifier.cclass[8] = ((((((((((((4) << 4) | (4)))) << 8) | (((((4) << 4) | (4))))))) << 16) | (((((((((4) << 4) | (4)))) << 8) | (((((4) << 4) | (4)))))))));
        nsEUCJPVerifier.cclass[9] = ((((((((((((4) << 4) | (4)))) << 8) | (((((4) << 4) | (4))))))) << 16) | (((((((((4) << 4) | (4)))) << 8) | (((((4) << 4) | (4)))))))));
        nsEUCJPVerifier.cclass[10] = ((((((((((((4) << 4) | (4)))) << 8) | (((((4) << 4) | (4))))))) << 16) | (((((((((4) << 4) | (4)))) << 8) | (((((4) << 4) | (4)))))))));
        nsEUCJPVerifier.cclass[11] = ((((((((((((4) << 4) | (4)))) << 8) | (((((4) << 4) | (4))))))) << 16) | (((((((((4) << 4) | (4)))) << 8) | (((((4) << 4) | (4)))))))));
        nsEUCJPVerifier.cclass[12] = ((((((((((((4) << 4) | (4)))) << 8) | (((((4) << 4) | (4))))))) << 16) | (((((((((4) << 4) | (4)))) << 8) | (((((4) << 4) | (4)))))))));
        nsEUCJPVerifier.cclass[13] = ((((((((((((4) << 4) | (4)))) << 8) | (((((4) << 4) | (4))))))) << 16) | (((((((((4) << 4) | (4)))) << 8) | (((((4) << 4) | (4)))))))));
        nsEUCJPVerifier.cclass[14] = ((((((((((((4) << 4) | (4)))) << 8) | (((((4) << 4) | (4))))))) << 16) | (((((((((4) << 4) | (4)))) << 8) | (((((4) << 4) | (4)))))))));
        nsEUCJPVerifier.cclass[15] = ((((((((((((4) << 4) | (4)))) << 8) | (((((4) << 4) | (4))))))) << 16) | (((((((((4) << 4) | (4)))) << 8) | (((((4) << 4) | (4)))))))));
        nsEUCJPVerifier.cclass[16] = ((((((((((((5) << 4) | (5)))) << 8) | (((((5) << 4) | (5))))))) << 16) | (((((((((5) << 4) | (5)))) << 8) | (((((5) << 4) | (5)))))))));
        nsEUCJPVerifier.cclass[17] = ((((((((((((3) << 4) | (1)))) << 8) | (((((5) << 4) | (5))))))) << 16) | (((((((((5) << 4) | (5)))) << 8) | (((((5) << 4) | (5)))))))));
        nsEUCJPVerifier.cclass[18] = ((((((((((((5) << 4) | (5)))) << 8) | (((((5) << 4) | (5))))))) << 16) | (((((((((5) << 4) | (5)))) << 8) | (((((5) << 4) | (5)))))))));
        nsEUCJPVerifier.cclass[19] = ((((((((((((5) << 4) | (5)))) << 8) | (((((5) << 4) | (5))))))) << 16) | (((((((((5) << 4) | (5)))) << 8) | (((((5) << 4) | (5)))))))));
        nsEUCJPVerifier.cclass[20] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (5)))))))));
        nsEUCJPVerifier.cclass[21] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsEUCJPVerifier.cclass[22] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsEUCJPVerifier.cclass[23] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsEUCJPVerifier.cclass[24] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsEUCJPVerifier.cclass[25] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsEUCJPVerifier.cclass[26] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsEUCJPVerifier.cclass[27] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsEUCJPVerifier.cclass[28] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsEUCJPVerifier.cclass[29] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsEUCJPVerifier.cclass[30] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsEUCJPVerifier.cclass[31] = ((((((((((((5) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsEUCJPVerifier.states = new Array(5);
        nsEUCJPVerifier.states[0] = ((((((((((((nsEUCJPVerifier.eError) << 4) | (nsEUCJPVerifier.eError)))) << 8) | (((((nsEUCJPVerifier.eError) << 4) | (nsEUCJPVerifier.eStart))))))) << 16) | (((((((((5) << 4) | (3)))) << 8) | (((((4) << 4) | (3)))))))));
        nsEUCJPVerifier.states[1] = ((((((((((((nsEUCJPVerifier.eItsMe) << 4) | (nsEUCJPVerifier.eItsMe)))) << 8) | (((((nsEUCJPVerifier.eItsMe) << 4) | (nsEUCJPVerifier.eItsMe))))))) << 16) | (((((((((nsEUCJPVerifier.eError) << 4) | (nsEUCJPVerifier.eError)))) << 8) | (((((nsEUCJPVerifier.eError) << 4) | (nsEUCJPVerifier.eError)))))))));
        nsEUCJPVerifier.states[2] = ((((((((((((nsEUCJPVerifier.eError) << 4) | (nsEUCJPVerifier.eError)))) << 8) | (((((nsEUCJPVerifier.eError) << 4) | (nsEUCJPVerifier.eStart))))))) << 16) | (((((((((nsEUCJPVerifier.eError) << 4) | (nsEUCJPVerifier.eStart)))) << 8) | (((((nsEUCJPVerifier.eItsMe) << 4) | (nsEUCJPVerifier.eItsMe)))))))));
        nsEUCJPVerifier.states[3] = ((((((((((((nsEUCJPVerifier.eError) << 4) | (3)))) << 8) | (((((nsEUCJPVerifier.eError) << 4) | (nsEUCJPVerifier.eError))))))) << 16) | (((((((((nsEUCJPVerifier.eError) << 4) | (nsEUCJPVerifier.eStart)))) << 8) | (((((nsEUCJPVerifier.eError) << 4) | (nsEUCJPVerifier.eError)))))))));
        nsEUCJPVerifier.states[4] = ((((((((((((nsEUCJPVerifier.eStart) << 4) | (nsEUCJPVerifier.eStart)))) << 8) | (((((nsEUCJPVerifier.eStart) << 4) | (nsEUCJPVerifier.eStart))))))) << 16) | (((((((((nsEUCJPVerifier.eError) << 4) | (nsEUCJPVerifier.eError)))) << 8) | (((((nsEUCJPVerifier.eError) << 4) | (3)))))))));
        nsEUCJPVerifier.charset = "EUC-JP";
        nsEUCJPVerifier.stFactor = 6;
    }
    public isUCS2(): boolean {
        return false;
    }
}
export default nsEUCJPVerifier;
