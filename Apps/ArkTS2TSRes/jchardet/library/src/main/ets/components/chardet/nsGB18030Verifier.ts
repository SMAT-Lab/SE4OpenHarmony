let __generate__Id: number = 0;
function generateId(): string {
    return "nsGB18030Verifier_" + ++__generate__Id;
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
class nsGB18030Verifier extends nsVerifier {
    static cclass: number[];
    static states: number[];
    static stFactor: number;
    static charset: string;
    public cclass(): number[] {
        return nsGB18030Verifier.cclass;
    }
    public states(): number[] {
        return nsGB18030Verifier.states;
    }
    public stFactor(): number {
        return nsGB18030Verifier.stFactor;
    }
    public charset(): string {
        return nsGB18030Verifier.charset;
    }
    constructor() {
        super();
        nsGB18030Verifier.cclass = new Array(256 / 8);
        nsGB18030Verifier.cclass[0] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsGB18030Verifier.cclass[1] = ((((((((((((0) << 4) | (0)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsGB18030Verifier.cclass[2] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsGB18030Verifier.cclass[3] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((0) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsGB18030Verifier.cclass[4] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsGB18030Verifier.cclass[5] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1)))))))));
        nsGB18030Verifier.cclass[6] = ((((((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (3))))))) << 16) | (((((((((3) << 4) | (3)))) << 8) | (((((3) << 4) | (3)))))))));
        nsGB18030Verifier.cclass[7] = ((((((((((((1) << 4) | (1)))) << 8) | (((((1) << 4) | (1))))))) << 16) | (((((((((1) << 4) | (1)))) << 8) | (((((3) << 4) | (3)))))))));
        nsGB18030Verifier.cclass[8] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsGB18030Verifier.cclass[9] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsGB18030Verifier.cclass[10] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsGB18030Verifier.cclass[11] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsGB18030Verifier.cclass[12] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsGB18030Verifier.cclass[13] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsGB18030Verifier.cclass[14] = ((((((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsGB18030Verifier.cclass[15] = ((((((((((((4) << 4) | (2)))) << 8) | (((((2) << 4) | (2))))))) << 16) | (((((((((2) << 4) | (2)))) << 8) | (((((2) << 4) | (2)))))))));
        nsGB18030Verifier.cclass[16] = ((((((((((((6) << 4) | (6)))) << 8) | (((((6) << 4) | (6))))))) << 16) | (((((((((6) << 4) | (6)))) << 8) | (((((6) << 4) | (5)))))))));
        nsGB18030Verifier.cclass[17] = ((((((((((((6) << 4) | (6)))) << 8) | (((((6) << 4) | (6))))))) << 16) | (((((((((6) << 4) | (6)))) << 8) | (((((6) << 4) | (6)))))))));
        nsGB18030Verifier.cclass[18] = ((((((((((((6) << 4) | (6)))) << 8) | (((((6) << 4) | (6))))))) << 16) | (((((((((6) << 4) | (6)))) << 8) | (((((6) << 4) | (6)))))))));
        nsGB18030Verifier.cclass[19] = ((((((((((((6) << 4) | (6)))) << 8) | (((((6) << 4) | (6))))))) << 16) | (((((((((6) << 4) | (6)))) << 8) | (((((6) << 4) | (6)))))))));
        nsGB18030Verifier.cclass[20] = ((((((((((((6) << 4) | (6)))) << 8) | (((((6) << 4) | (6))))))) << 16) | (((((((((6) << 4) | (6)))) << 8) | (((((6) << 4) | (6)))))))));
        nsGB18030Verifier.cclass[21] = ((((((((((((6) << 4) | (6)))) << 8) | (((((6) << 4) | (6))))))) << 16) | (((((((((6) << 4) | (6)))) << 8) | (((((6) << 4) | (6)))))))));
        nsGB18030Verifier.cclass[22] = ((((((((((((6) << 4) | (6)))) << 8) | (((((6) << 4) | (6))))))) << 16) | (((((((((6) << 4) | (6)))) << 8) | (((((6) << 4) | (6)))))))));
        nsGB18030Verifier.cclass[23] = ((((((((((((6) << 4) | (6)))) << 8) | (((((6) << 4) | (6))))))) << 16) | (((((((((6) << 4) | (6)))) << 8) | (((((6) << 4) | (6)))))))));
        nsGB18030Verifier.cclass[24] = ((((((((((((6) << 4) | (6)))) << 8) | (((((6) << 4) | (6))))))) << 16) | (((((((((6) << 4) | (6)))) << 8) | (((((6) << 4) | (6)))))))));
        nsGB18030Verifier.cclass[25] = ((((((((((((6) << 4) | (6)))) << 8) | (((((6) << 4) | (6))))))) << 16) | (((((((((6) << 4) | (6)))) << 8) | (((((6) << 4) | (6)))))))));
        nsGB18030Verifier.cclass[26] = ((((((((((((6) << 4) | (6)))) << 8) | (((((6) << 4) | (6))))))) << 16) | (((((((((6) << 4) | (6)))) << 8) | (((((6) << 4) | (6)))))))));
        nsGB18030Verifier.cclass[27] = ((((((((((((6) << 4) | (6)))) << 8) | (((((6) << 4) | (6))))))) << 16) | (((((((((6) << 4) | (6)))) << 8) | (((((6) << 4) | (6)))))))));
        nsGB18030Verifier.cclass[28] = ((((((((((((6) << 4) | (6)))) << 8) | (((((6) << 4) | (6))))))) << 16) | (((((((((6) << 4) | (6)))) << 8) | (((((6) << 4) | (6)))))))));
        nsGB18030Verifier.cclass[29] = ((((((((((((6) << 4) | (6)))) << 8) | (((((6) << 4) | (6))))))) << 16) | (((((((((6) << 4) | (6)))) << 8) | (((((6) << 4) | (6)))))))));
        nsGB18030Verifier.cclass[30] = ((((((((((((6) << 4) | (6)))) << 8) | (((((6) << 4) | (6))))))) << 16) | (((((((((6) << 4) | (6)))) << 8) | (((((6) << 4) | (6)))))))));
        nsGB18030Verifier.cclass[31] = ((((((((((((0) << 4) | (6)))) << 8) | (((((6) << 4) | (6))))))) << 16) | (((((((((6) << 4) | (6)))) << 8) | (((((6) << 4) | (6)))))))));
        nsGB18030Verifier.states = new Array(6);
        nsGB18030Verifier.states[0] = ((((((((((((nsGB18030Verifier.eError) << 4) | (3)))) << 8) | (((((nsGB18030Verifier.eStart) << 4) | (nsGB18030Verifier.eStart))))))) << 16) | (((((((((nsGB18030Verifier.eStart) << 4) | (nsGB18030Verifier.eStart)))) << 8) | (((((nsGB18030Verifier.eStart) << 4) | (nsGB18030Verifier.eError)))))))));
        nsGB18030Verifier.states[1] = ((((((((((((nsGB18030Verifier.eItsMe) << 4) | (nsGB18030Verifier.eItsMe)))) << 8) | (((((nsGB18030Verifier.eError) << 4) | (nsGB18030Verifier.eError))))))) << 16) | (((((((((nsGB18030Verifier.eError) << 4) | (nsGB18030Verifier.eError)))) << 8) | (((((nsGB18030Verifier.eError) << 4) | (nsGB18030Verifier.eError)))))))));
        nsGB18030Verifier.states[2] = ((((((((((((nsGB18030Verifier.eStart) << 4) | (nsGB18030Verifier.eError)))) << 8) | (((((nsGB18030Verifier.eError) << 4) | (nsGB18030Verifier.eItsMe))))))) << 16) | (((((((((nsGB18030Verifier.eItsMe) << 4) | (nsGB18030Verifier.eItsMe)))) << 8) | (((((nsGB18030Verifier.eItsMe) << 4) | (nsGB18030Verifier.eItsMe)))))))));
        nsGB18030Verifier.states[3] = ((((((((((((nsGB18030Verifier.eError) << 4) | (nsGB18030Verifier.eError)))) << 8) | (((((nsGB18030Verifier.eError) << 4) | (nsGB18030Verifier.eError))))))) << 16) | (((((((((nsGB18030Verifier.eStart) << 4) | (nsGB18030Verifier.eStart)))) << 8) | (((((nsGB18030Verifier.eError) << 4) | (4)))))))));
        nsGB18030Verifier.states[4] = ((((((((((((nsGB18030Verifier.eError) << 4) | (nsGB18030Verifier.eItsMe)))) << 8) | (((((nsGB18030Verifier.eError) << 4) | (nsGB18030Verifier.eError))))))) << 16) | (((((((((nsGB18030Verifier.eError) << 4) | (5)))) << 8) | (((((nsGB18030Verifier.eError) << 4) | (nsGB18030Verifier.eError)))))))));
        nsGB18030Verifier.states[5] = ((((((((((((nsGB18030Verifier.eStart) << 4) | (nsGB18030Verifier.eStart)))) << 8) | (((((nsGB18030Verifier.eStart) << 4) | (nsGB18030Verifier.eStart))))))) << 16) | (((((((((nsGB18030Verifier.eStart) << 4) | (nsGB18030Verifier.eStart)))) << 8) | (((((nsGB18030Verifier.eError) << 4) | (nsGB18030Verifier.eError)))))))));
        nsGB18030Verifier.charset = "GB18030";
        nsGB18030Verifier.stFactor = 7;
    }
    public isUCS2(): boolean {
        return false;
    }
}
export default nsGB18030Verifier;
