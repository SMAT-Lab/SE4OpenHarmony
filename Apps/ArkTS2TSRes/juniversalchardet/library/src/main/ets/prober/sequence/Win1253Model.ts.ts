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
import Constants from '../../Constants';
import GreekModel from './GreekModel';
class Win1253Model extends GreekModel {
    ////////////////////////////////////////////////////////////////
    // methods
    ////////////////////////////////////////////////////////////////
    public constructor() {
        super(Win1253Model.win1253CharToOrderMap, Constants.CHARSET_WINDOWS_1253);
    }
    ////////////////////////////////////////////////////////////////
    // constants
    ////////////////////////////////////////////////////////////////
    private static win1253CharToOrderMap: number[] = [
        255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 254, 255, 255, 254, 255, 255,
        255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
        253, 253, 253, 253, 253, 253, 253, 253, 253, 253, 253, 253, 253, 253, 253, 253,
        252, 252, 252, 252, 252, 252, 252, 252, 252, 252, 253, 253, 253, 253, 253, 253,
        253, 82, 100, 104, 94, 98, 101, 116, 102, 111, 187, 117, 92, 88, 113, 85,
        79, 118, 105, 83, 67, 114, 119, 95, 99, 109, 188, 253, 253, 253, 253, 253,
        253, 72, 70, 80, 81, 60, 96, 93, 89, 68, 120, 97, 77, 86, 69, 55,
        78, 115, 65, 66, 58, 76, 106, 103, 87, 107, 112, 253, 253, 253, 253, 253,
        255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
        255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
        253, 233, 61, 253, 253, 253, 253, 253, 253, 253, 253, 253, 253, 74, 253, 253,
        253, 253, 253, 253, 247, 253, 253, 36, 46, 71, 73, 253, 54, 253, 108, 123,
        110, 31, 51, 43, 41, 34, 91, 40, 52, 47, 44, 53, 38, 49, 59, 39,
        35, 48, 250, 37, 33, 45, 56, 50, 84, 57, 120, 121, 17, 18, 22, 15,
        124, 1, 29, 20, 21, 3, 32, 13, 25, 5, 11, 16, 10, 6, 30, 4,
        9, 8, 14, 7, 2, 12, 28, 23, 42, 24, 64, 75, 19, 26, 27, 253, //f0
    ];
}
export default Win1253Model;
