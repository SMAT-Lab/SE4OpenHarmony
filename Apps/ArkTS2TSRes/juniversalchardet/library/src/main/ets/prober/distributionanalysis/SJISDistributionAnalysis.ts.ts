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
import JISDistributionAnalysis from './JISDistributionAnalysis';
class SJISDistributionAnalysis extends JISDistributionAnalysis {
    ////////////////////////////////////////////////////////////////
    // constants
    ////////////////////////////////////////////////////////////////
    public static HIGHBYTE_BEGIN_1: number = 0x81;
    public static HIGHBYTE_END_1: number = 0x9F;
    public static HIGHBYTE_BEGIN_2: number = 0xE0;
    public static HIGHBYTE_END_2: number = 0xEF;
    public static LOWBYTE_BEGIN_1: number = 0x40;
    public static LOWBYTE_BEGIN_2: number = 0x80;
    ////////////////////////////////////////////////////////////////
    // methods
    ////////////////////////////////////////////////////////////////
    public constructor() {
        super();
    }
    protected getOrder(buf: ArrayBuffer, offset: number) {
        let order: number = -1;
        const intArray = new Int8Array(buf);
        let highbyte: number = intArray[offset] & 0xFF;
        if (highbyte >= SJISDistributionAnalysis.HIGHBYTE_BEGIN_1 && highbyte <= SJISDistributionAnalysis.HIGHBYTE_END_1) {
            order = 188 * (highbyte - SJISDistributionAnalysis.HIGHBYTE_BEGIN_1);
        }
        else if (highbyte >= SJISDistributionAnalysis.HIGHBYTE_BEGIN_2 && highbyte <= SJISDistributionAnalysis.HIGHBYTE_END_2) {
            order = 188 * (highbyte - SJISDistributionAnalysis.HIGHBYTE_BEGIN_2 + 31);
        }
        else {
            return -1;
        }
        let lowbyte = intArray[offset + 1] & 0xFF;
        order += lowbyte - SJISDistributionAnalysis.LOWBYTE_BEGIN_1;
        if (lowbyte >= SJISDistributionAnalysis.LOWBYTE_BEGIN_2) {
            --order;
        }
        return order;
    }
}
export default SJISDistributionAnalysis;
