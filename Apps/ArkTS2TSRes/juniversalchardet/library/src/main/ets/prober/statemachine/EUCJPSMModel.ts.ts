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
 *  Copyright (c) 2022 Huawei Device Co., Ltd.
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
import PkgInt from './PkgInt';
import SMModel from './SMModel';
class EUCJPSMModel extends SMModel {
    ////////////////////////////////////////////////////////////////
    // constants
    ////////////////////////////////////////////////////////////////
    public static EUCJP_CLASS_FACTOR: number = 6;
    ////////////////////////////////////////////////////////////////
    // methods
    ////////////////////////////////////////////////////////////////
    public constructor() {
        super(new PkgInt(PkgInt.INDEX_SHIFT_4BITS, PkgInt.SHIFT_MASK_4BITS, PkgInt.BIT_SHIFT_4BITS, PkgInt.UNIT_MASK_4BITS, EUCJPSMModel.eucjpClassTable), EUCJPSMModel.EUCJP_CLASS_FACTOR, new PkgInt(PkgInt.INDEX_SHIFT_4BITS, PkgInt.SHIFT_MASK_4BITS, PkgInt.BIT_SHIFT_4BITS, PkgInt.UNIT_MASK_4BITS, EUCJPSMModel.eucjpStateTable), EUCJPSMModel.eucjpCharLenTable, Constants.CHARSET_EUC_JP);
    }
    ////////////////////////////////////////////////////////////////
    // constants continued
    ////////////////////////////////////////////////////////////////
    private static eucjpClassTable: number[] = [
        // PkgInt.pack4bits(5,4,4,4,4,4,4,4),  // 00 - 07
        PkgInt.pack4bits(4, 4, 4, 4, 4, 4, 4, 4),
        PkgInt.pack4bits(4, 4, 4, 4, 4, 4, 5, 5),
        PkgInt.pack4bits(4, 4, 4, 4, 4, 4, 4, 4),
        PkgInt.pack4bits(4, 4, 4, 5, 4, 4, 4, 4),
        PkgInt.pack4bits(4, 4, 4, 4, 4, 4, 4, 4),
        PkgInt.pack4bits(4, 4, 4, 4, 4, 4, 4, 4),
        PkgInt.pack4bits(4, 4, 4, 4, 4, 4, 4, 4),
        PkgInt.pack4bits(4, 4, 4, 4, 4, 4, 4, 4),
        PkgInt.pack4bits(4, 4, 4, 4, 4, 4, 4, 4),
        PkgInt.pack4bits(4, 4, 4, 4, 4, 4, 4, 4),
        PkgInt.pack4bits(4, 4, 4, 4, 4, 4, 4, 4),
        PkgInt.pack4bits(4, 4, 4, 4, 4, 4, 4, 4),
        PkgInt.pack4bits(4, 4, 4, 4, 4, 4, 4, 4),
        PkgInt.pack4bits(4, 4, 4, 4, 4, 4, 4, 4),
        PkgInt.pack4bits(4, 4, 4, 4, 4, 4, 4, 4),
        PkgInt.pack4bits(4, 4, 4, 4, 4, 4, 4, 4),
        PkgInt.pack4bits(5, 5, 5, 5, 5, 5, 5, 5),
        PkgInt.pack4bits(5, 5, 5, 5, 5, 5, 1, 3),
        PkgInt.pack4bits(5, 5, 5, 5, 5, 5, 5, 5),
        PkgInt.pack4bits(5, 5, 5, 5, 5, 5, 5, 5),
        PkgInt.pack4bits(5, 2, 2, 2, 2, 2, 2, 2),
        PkgInt.pack4bits(2, 2, 2, 2, 2, 2, 2, 2),
        PkgInt.pack4bits(2, 2, 2, 2, 2, 2, 2, 2),
        PkgInt.pack4bits(2, 2, 2, 2, 2, 2, 2, 2),
        PkgInt.pack4bits(2, 2, 2, 2, 2, 2, 2, 2),
        PkgInt.pack4bits(2, 2, 2, 2, 2, 2, 2, 2),
        PkgInt.pack4bits(2, 2, 2, 2, 2, 2, 2, 2),
        PkgInt.pack4bits(2, 2, 2, 2, 2, 2, 2, 2),
        PkgInt.pack4bits(0, 0, 0, 0, 0, 0, 0, 0),
        PkgInt.pack4bits(0, 0, 0, 0, 0, 0, 0, 0),
        PkgInt.pack4bits(0, 0, 0, 0, 0, 0, 0, 0),
        PkgInt.pack4bits(0, 0, 0, 0, 0, 0, 0, 5) // f8 - ff
    ];
    private static eucjpStateTable: number[] = [
        PkgInt.pack4bits(3, 4, 3, 5, SMModel.START, SMModel.ERROR, SMModel.ERROR, SMModel.ERROR),
        PkgInt.pack4bits(SMModel.ERROR, SMModel.ERROR, SMModel.ERROR, SMModel.ERROR, SMModel.ITSME, SMModel.ITSME, SMModel.ITSME, SMModel.ITSME),
        PkgInt.pack4bits(SMModel.ITSME, SMModel.ITSME, SMModel.START, SMModel.ERROR, SMModel.START, SMModel.ERROR, SMModel.ERROR, SMModel.ERROR),
        PkgInt.pack4bits(SMModel.ERROR, SMModel.ERROR, SMModel.START, SMModel.ERROR, SMModel.ERROR, SMModel.ERROR, 3, SMModel.ERROR),
        PkgInt.pack4bits(3, SMModel.ERROR, SMModel.ERROR, SMModel.ERROR, SMModel.START, SMModel.START, SMModel.START, SMModel.START) //20-27
    ];
    private static eucjpCharLenTable: number[] = [
        2, 2, 2, 3, 1, 0
    ];
}
export default EUCJPSMModel;
