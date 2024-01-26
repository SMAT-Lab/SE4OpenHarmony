let __generate__Id: number = 0;
function generateId(): string {
    return "nsHZVerifier_" + ++__generate__Id;
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
class nsHZVerifier extends nsVerifier {
    static cclass: number[];
    static states: number[];
    static stFactor: number;
    static charset: string;
    public cclass(): number[] {
        return nsHZVerifier.cclass;
    }
    public states(): number[] {
        return nsHZVerifier.states;
    }
    public stFactor(): number {
        return nsHZVerifier.stFactor;
    }
    public charset(): string {
        return nsHZVerifier.charset;
    }
    constructor() {
        super();
        nsHZVerifier.cclass = new Array(256 / 8);
        nsHZVerifier.cclass[0] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (1)))))))));
        nsHZVerifier.cclass[1] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsHZVerifier.cclass[2] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsHZVerifier.cclass[3] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((1) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsHZVerifier.cclass[4] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsHZVerifier.cclass[5] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsHZVerifier.cclass[6] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsHZVerifier.cclass[7] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsHZVerifier.cclass[8] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsHZVerifier.cclass[9] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsHZVerifier.cclass[10] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsHZVerifier.cclass[11] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsHZVerifier.cclass[12] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsHZVerifier.cclass[13] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsHZVerifier.cclass[14] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsHZVerifier.cclass[15] = ((((((((((((0) << 4) | (2)))) << 8) | (((((5) << 4) | (0))))))) << 16) | (((((((((4) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsHZVerifier.cclass[16] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsHZVerifier.cclass[17] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsHZVerifier.cclass[18] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsHZVerifier.cclass[19] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsHZVerifier.cclass[20] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsHZVerifier.cclass[21] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsHZVerifier.cclass[22] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsHZVerifier.cclass[23] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsHZVerifier.cclass[24] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsHZVerifier.cclass[25] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsHZVerifier.cclass[26] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsHZVerifier.cclass[27] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsHZVerifier.cclass[28] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsHZVerifier.cclass[29] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsHZVerifier.cclass[30] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsHZVerifier.cclass[31] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsHZVerifier.states = new Array(6);
        nsHZVerifier.states[0] = ((((((((((((nsHZVerifier.eError) << 4) | (nsHZVerifier.eError)))) << 8) | (((((nsHZVerifier.eStart) << 4) | (nsHZVerifier.eStart))))))) << 16) | (((((((((nsHZVerifier.eStart) << 4) | (3)))) << 8) | (((((nsHZVerifier.eError) << 4) | (nsHZVerifier.eStart)))))))));
        nsHZVerifier.states[1] = ((((((((((((nsHZVerifier.eItsMe) << 4) | (nsHZVerifier.eItsMe)))) << 8) | (((((nsHZVerifier.eItsMe) << 4) | (nsHZVerifier.eItsMe))))))) << 16) | (((((((((nsHZVerifier.eError) << 4) | (nsHZVerifier.eError)))) << 8) | (((((nsHZVerifier.eError) << 4) | (nsHZVerifier.eError)))))))));
        nsHZVerifier.states[2] = ((((((((((((nsHZVerifier.eError) << 4) | (4)))) << 8) | (((((nsHZVerifier.eStart) << 4) | (nsHZVerifier.eStart))))))) << 16) | (((((((((nsHZVerifier.eError) << 4) | (nsHZVerifier.eError)))) << 8) | (((((nsHZVerifier.eItsMe) << 4) | (nsHZVerifier.eItsMe)))))))));
        nsHZVerifier.states[3] = ((((((((((((nsHZVerifier.eError) << 4) | (4)))) << 8) | (((((5) << 4) | (5))))))) << 16) | (((((((((nsHZVerifier.eError) << 4) | (6)))) << 8) | (((((nsHZVerifier.eError) << 4) | (5)))))))));
        nsHZVerifier.states[4] = ((((((((((((nsHZVerifier.eError) << 4) | (4)))) << 8) | (((((nsHZVerifier.eError) << 4) | (4))))))) << 16) | (((((((((4) << 4) | (4)))) << 8) | (((((nsHZVerifier.eError) << 4) | (4)))))))));
        nsHZVerifier.states[5] = ((((((((((((nsHZVerifier.eStart) << 4) | (nsHZVerifier.eStart)))) << 8) | (((((nsHZVerifier.eStart) << 4) | (nsHZVerifier.eStart))))))) << 16) | (((((((((nsHZVerifier.eStart) << 4) | (nsHZVerifier.eStart)))) << 8) | (((((nsHZVerifier.eItsMe) << 4) | (4)))))))));
        nsHZVerifier.charset = "HZ-GB-2312";
        nsHZVerifier.stFactor = 6;
    }
    public isUCS2(): boolean {
        return false;
    }
    ;
}
export default nsHZVerifier;
