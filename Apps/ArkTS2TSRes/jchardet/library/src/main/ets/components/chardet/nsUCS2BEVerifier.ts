let __generate__Id: number = 0;
function generateId(): string {
    return "nsUCS2BEVerifier_" + ++__generate__Id;
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
class nsUCS2BEVerifier extends nsVerifier {
    static cclass: number[];
    static states: number[];
    static stFactor: number;
    static charset: string;
    public cclass(): number[] {
        return nsUCS2BEVerifier.cclass;
    }
    public states(): number[] {
        return nsUCS2BEVerifier.states;
    }
    public stFactor(): number {
        return nsUCS2BEVerifier.stFactor;
    }
    public charset(): string {
        return nsUCS2BEVerifier.charset;
    }
    constructor() {
        super();
        nsUCS2BEVerifier.cclass = new Array(256 / 8);
        nsUCS2BEVerifier.cclass[0] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsUCS2BEVerifier.cclass[1] = ((((((((((((0) << 4) | (0)))) << 8) | (((((2) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (1)))) << 8) | (((((0) << 4) | (0)))))))));
        nsUCS2BEVerifier.cclass[2] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsUCS2BEVerifier.cclass[3] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((3) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsUCS2BEVerifier.cclass[4] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsUCS2BEVerifier.cclass[5] = ((((((((((((0) << 4) | (0)))) << 8) | (((((3) << 4) | (3))))))) << 16) | (((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (0)))))))));
        nsUCS2BEVerifier.cclass[6] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsUCS2BEVerifier.cclass[7] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsUCS2BEVerifier.cclass[8] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsUCS2BEVerifier.cclass[9] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsUCS2BEVerifier.cclass[10] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsUCS2BEVerifier.cclass[11] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsUCS2BEVerifier.cclass[12] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsUCS2BEVerifier.cclass[13] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsUCS2BEVerifier.cclass[14] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsUCS2BEVerifier.cclass[15] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsUCS2BEVerifier.cclass[16] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsUCS2BEVerifier.cclass[17] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsUCS2BEVerifier.cclass[18] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsUCS2BEVerifier.cclass[19] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsUCS2BEVerifier.cclass[20] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsUCS2BEVerifier.cclass[21] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsUCS2BEVerifier.cclass[22] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsUCS2BEVerifier.cclass[23] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsUCS2BEVerifier.cclass[24] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsUCS2BEVerifier.cclass[25] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsUCS2BEVerifier.cclass[26] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsUCS2BEVerifier.cclass[27] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsUCS2BEVerifier.cclass[28] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsUCS2BEVerifier.cclass[29] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsUCS2BEVerifier.cclass[30] = ((((((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsUCS2BEVerifier.cclass[31] = ((((((((((((5) << 4) | (4)))) << 8) | (((((0) << 4) | (0))))))) << 16) | (((((((((0) << 4) | (0)))) << 8) | (((((0) << 4) | (0)))))))));
        nsUCS2BEVerifier.states = new Array(7);
        nsUCS2BEVerifier.states[0] = ((((((((((((nsUCS2BEVerifier.eError) << 4) | (nsUCS2BEVerifier.eError)))) << 8) | (((((3) << 4) | (4))))))) << 16) | (((((((((nsUCS2BEVerifier.eError) << 4) | (7)))) << 8) | (((((7) << 4) | (5)))))))));
        nsUCS2BEVerifier.states[1] = ((((((((((((nsUCS2BEVerifier.eItsMe) << 4) | (nsUCS2BEVerifier.eItsMe)))) << 8) | (((((nsUCS2BEVerifier.eItsMe) << 4) | (nsUCS2BEVerifier.eItsMe))))))) << 16) | (((((((((nsUCS2BEVerifier.eError) << 4) | (nsUCS2BEVerifier.eError)))) << 8) | (((((nsUCS2BEVerifier.eError) << 4) | (nsUCS2BEVerifier.eError)))))))));
        nsUCS2BEVerifier.states[2] = ((((((((((((nsUCS2BEVerifier.eError) << 4) | (nsUCS2BEVerifier.eError)))) << 8) | (((((6) << 4) | (6))))))) << 16) | (((((((((6) << 4) | (6)))) << 8) | (((((nsUCS2BEVerifier.eItsMe) << 4) | (nsUCS2BEVerifier.eItsMe)))))))));
        nsUCS2BEVerifier.states[3] = ((((((((((((6) << 4) | (6)))) << 8) | (((((nsUCS2BEVerifier.eItsMe) << 4) | (6))))))) << 16) | (((((((((6) << 4) | (6)))) << 8) | (((((6) << 4) | (6)))))))));
        nsUCS2BEVerifier.states[4] = ((((((((((((nsUCS2BEVerifier.eError) << 4) | (7)))) << 8) | (((((7) << 4) | (5))))))) << 16) | (((((((((6) << 4) | (6)))) << 8) | (((((6) << 4) | (6)))))))));
        nsUCS2BEVerifier.states[5] = ((((((((((((6) << 4) | (6)))) << 8) | (((((6) << 4) | (nsUCS2BEVerifier.eError))))))) << 16) | (((((((((6) << 4) | (6)))) << 8) | (((((8) << 4) | (5)))))))));
        nsUCS2BEVerifier.states[6] = ((((((((((((nsUCS2BEVerifier.eStart) << 4) | (nsUCS2BEVerifier.eStart)))) << 8) | (((((nsUCS2BEVerifier.eError) << 4) | (nsUCS2BEVerifier.eError))))))) << 16) | (((((((((6) << 4) | (6)))) << 8) | (((((6) << 4) | (6)))))))));
        nsUCS2BEVerifier.charset = "UTF-16BE";
        nsUCS2BEVerifier.stFactor = 6;
    }
    public isUCS2(): boolean {
        return true;
    }
    ;
}
export default nsUCS2BEVerifier;
