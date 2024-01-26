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
import JapaneseContextAnalysis from './JapaneseContextAnalysis';
import { Order } from './JapaneseContextAnalysis';
class SJISContextAnalysis extends JapaneseContextAnalysis {
    ////////////////////////////////////////////////////////////////
    // constants
    ////////////////////////////////////////////////////////////////
    public static HIRAGANA_HIGHBYTE: number = 0x82;
    public static HIRAGANA_LOWBYTE_BEGIN: number = 0x9F;
    public static HIRAGANA_LOWBYTE_END: number = 0xF1;
    public static HIGHBYTE_BEGIN_1: number = 0x81;
    public static HIGHBYTE_END_1: number = 0x9F;
    public static HIGHBYTE_BEGIN_2: number = 0xE0;
    public static HIGHBYTE_END_2: number = 0xEF;
    ////////////////////////////////////////////////////////////////
    // methods
    ////////////////////////////////////////////////////////////////
    public constructor() {
        super();
    }
    protected getOrder(order: Order, buf: ArrayBuffer, offset: number): void {
        order.order = -1;
        order.charLength = 1;
        let tempIntArray = new Int8Array(buf);
        let highbyte: number = tempIntArray[offset] & 0xFF;
        if ((highbyte >= SJISContextAnalysis.HIGHBYTE_BEGIN_1
            && highbyte <= SJISContextAnalysis.HIGHBYTE_END_1)
            || (highbyte >= SJISContextAnalysis.HIGHBYTE_BEGIN_2
                && highbyte <= SJISContextAnalysis.HIGHBYTE_END_2)) {
            order.charLength = 2;
        }
        if (highbyte == SJISContextAnalysis.HIRAGANA_HIGHBYTE) {
            let lowbyte: number = tempIntArray[offset + 1] & 0xFF;
            if (lowbyte >= SJISContextAnalysis.HIRAGANA_LOWBYTE_BEGIN
                && lowbyte <= SJISContextAnalysis.HIRAGANA_LOWBYTE_END) {
                order.order = (lowbyte - SJISContextAnalysis.HIRAGANA_LOWBYTE_BEGIN);
            }
        }
    }
    public getOrderReturn(buf: ArrayBuffer, offset: number): number {
        let tempIntArray = new Int8Array(buf);
        let highbyte: number = tempIntArray[offset] & 0xFF;
        if (highbyte == SJISContextAnalysis.HIRAGANA_HIGHBYTE) {
            let lowbyte: number = tempIntArray[offset + 1] & 0xFF;
            if (lowbyte >= SJISContextAnalysis.HIRAGANA_LOWBYTE_BEGIN
                && lowbyte <= SJISContextAnalysis.HIRAGANA_LOWBYTE_END) {
                return (lowbyte - SJISContextAnalysis.HIRAGANA_LOWBYTE_BEGIN);
            }
        }
        return -1;
    }
}
export default SJISContextAnalysis;
