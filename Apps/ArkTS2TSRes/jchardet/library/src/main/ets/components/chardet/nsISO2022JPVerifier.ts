let __generate__Id: number = 0;
function generateId(): string {
    return "nsISO2022JPVerifier_" + ++__generate__Id;
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
class nsISO2022JPVerifier extends nsVerifier {
    static cclass: number[];
    static states: number[];
    static stFactor: number;
    static charset: string;
    public cclass(): number[] {
        return nsISO2022JPVerifier.cclass;
    }
    public states(): number[] {
        return nsISO2022JPVerifier.states;
    }
    public stFactor(): number {
        return nsISO2022JPVerifier.stFactor;
    }
    public charset(): string {
        return nsISO2022JPVerifier.charset;
    }
    constructor() {
        super();
        nsISO2022JPVerifier.cclass = new Array(256 / 8);
        nsISO2022JPVerifier.cclass[0] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (2)))))))));
        nsISO2022JPVerifier.cclass[1] = ((((((((((((2) << 4) | (2)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsISO2022JPVerifier.cclass[2] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsISO2022JPVerifier.cclass[3] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((1) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsISO2022JPVerifier.cclass[4] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (7))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsISO2022JPVerifier.cclass[5] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (3)))))))));
        nsISO2022JPVerifier.cclass[6] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsISO2022JPVerifier.cclass[7] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsISO2022JPVerifier.cclass[8] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (4)))) << 8) | (((((0) << 4) | (6)))))))));
        nsISO2022JPVerifier.cclass[9] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (5)))) << 8) | (((((0) << 4) | (0)))))))));
        nsISO2022JPVerifier.cclass[10] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsISO2022JPVerifier.cclass[11] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsISO2022JPVerifier.cclass[12] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsISO2022JPVerifier.cclass[13] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsISO2022JPVerifier.cclass[14] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsISO2022JPVerifier.cclass[15] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsISO2022JPVerifier.cclass[16] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsISO2022JPVerifier.cclass[17] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsISO2022JPVerifier.cclass[18] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsISO2022JPVerifier.cclass[19] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsISO2022JPVerifier.cclass[20] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsISO2022JPVerifier.cclass[21] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsISO2022JPVerifier.cclass[22] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsISO2022JPVerifier.cclass[23] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsISO2022JPVerifier.cclass[24] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsISO2022JPVerifier.cclass[25] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsISO2022JPVerifier.cclass[26] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsISO2022JPVerifier.cclass[27] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsISO2022JPVerifier.cclass[28] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsISO2022JPVerifier.cclass[29] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsISO2022JPVerifier.cclass[30] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsISO2022JPVerifier.cclass[31] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsISO2022JPVerifier.states = new Array(6);
        nsISO2022JPVerifier.states[0] = ((((((((((((nsISO2022JPVerifier.eStart) << 4) | (nsISO2022JPVerifier.eStart)))) << 8) | (((((nsISO2022JPVerifier.eStart) << 4) | (nsISO2022JPVerifier.eStart))))))) << 16) | (((((((((nsISO2022JPVerifier.eStart) << 4) | (nsISO2022JPVerifier.eError)))) << 8) | (((((3) << 4) | (nsISO2022JPVerifier.eStart)))))))));
        nsISO2022JPVerifier.states[1] = ((((((((((((nsISO2022JPVerifier.eError) << 4) | (nsISO2022JPVerifier.eError)))) << 8) | (((((nsISO2022JPVerifier.eError) << 4) | (nsISO2022JPVerifier.eError))))))) << 16) | (((((((((nsISO2022JPVerifier.eError) << 4) | (nsISO2022JPVerifier.eError)))) << 8) | (((((nsISO2022JPVerifier.eError) << 4) | (nsISO2022JPVerifier.eError)))))))));
        nsISO2022JPVerifier.states[2] = ((((((((((((nsISO2022JPVerifier.eItsMe) << 4) | (nsISO2022JPVerifier.eItsMe)))) << 8) | (((((nsISO2022JPVerifier.eItsMe) << 4) | (nsISO2022JPVerifier.eItsMe))))))) << 16) | (((((((((nsISO2022JPVerifier.eItsMe) << 4) | (nsISO2022JPVerifier.eItsMe)))) << 8) | (((((nsISO2022JPVerifier.eItsMe) << 4) | (nsISO2022JPVerifier.eItsMe)))))))));
        nsISO2022JPVerifier.states[3] = ((((((((((((4) << 4) | (nsISO2022JPVerifier.eError)))) << 8) | (((((nsISO2022JPVerifier.eError) << 4) | (nsISO2022JPVerifier.eError))))))) << 16) | (((((((((5) << 4) | (nsISO2022JPVerifier.eError)))) << 8) | (((((nsISO2022JPVerifier.eError) << 4) | (nsISO2022JPVerifier.eError)))))))));
        nsISO2022JPVerifier.states[4] = ((((((((((((nsISO2022JPVerifier.eError) << 4) | (nsISO2022JPVerifier.eItsMe)))) << 8) | (((((nsISO2022JPVerifier.eError) << 4) | (nsISO2022JPVerifier.eItsMe))))))) << 16) | (((((((((nsISO2022JPVerifier.eError) << 4) | (nsISO2022JPVerifier.eError)))) << 8) | (((((nsISO2022JPVerifier.eError) << 4) | (nsISO2022JPVerifier.eError)))))))));
        nsISO2022JPVerifier.states[5] = ((((((((((((nsISO2022JPVerifier.eError) << 4) | (nsISO2022JPVerifier.eError)))) << 8) | (((((nsISO2022JPVerifier.eItsMe) << 4) | (nsISO2022JPVerifier.eItsMe))))))) << 16) | (((((((((nsISO2022JPVerifier.eError) << 4) | (nsISO2022JPVerifier.eError)))) << 8) | (((((nsISO2022JPVerifier.eError) << 4) | (nsISO2022JPVerifier.eError)))))))));
        nsISO2022JPVerifier.charset = "ISO-2022-JP";
        nsISO2022JPVerifier.stFactor = 8;
    }
    public isUCS2(): boolean {
        return false;
    }
}
export default nsISO2022JPVerifier;
