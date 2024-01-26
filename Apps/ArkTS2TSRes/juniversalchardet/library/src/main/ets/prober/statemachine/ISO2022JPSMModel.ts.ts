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
import PkgInt from './PkgInt';
import SMModel from './SMModel';
class ISO2022JPSMModel extends SMModel {
    ////////////////////////////////////////////////////////////////
    // constants
    ////////////////////////////////////////////////////////////////
    public static ISO2022JP_CLASS_FACTOR: number = 10;
    ////////////////////////////////////////////////////////////////
    // methods
    ////////////////////////////////////////////////////////////////
    public constructor() {
        super(new PkgInt(PkgInt.INDEX_SHIFT_4BITS, PkgInt.SHIFT_MASK_4BITS, PkgInt.BIT_SHIFT_4BITS, PkgInt.UNIT_MASK_4BITS, ISO2022JPSMModel.iso2022jpClassTable), ISO2022JPSMModel.ISO2022JP_CLASS_FACTOR, new PkgInt(PkgInt.INDEX_SHIFT_4BITS, PkgInt.SHIFT_MASK_4BITS, PkgInt.BIT_SHIFT_4BITS, PkgInt.UNIT_MASK_4BITS, ISO2022JPSMModel.iso2022jpStateTable), ISO2022JPSMModel.iso2022jpCharLenTable, Constants.CHARSET_ISO_2022_JP);
    }
    ////////////////////////////////////////////////////////////////
    // constants continued
    ////////////////////////////////////////////////////////////////
    private static iso2022jpClassTable: number[] = [
        PkgInt.pack4bits(2, 0, 0, 0, 0, 0, 0, 0),
        PkgInt.pack4bits(0, 0, 0, 0, 0, 0, 2, 2),
        PkgInt.pack4bits(0, 0, 0, 0, 0, 0, 0, 0),
        PkgInt.pack4bits(0, 0, 0, 1, 0, 0, 0, 0),
        PkgInt.pack4bits(0, 0, 0, 0, 7, 0, 0, 0),
        PkgInt.pack4bits(3, 0, 0, 0, 0, 0, 0, 0),
        PkgInt.pack4bits(0, 0, 0, 0, 0, 0, 0, 0),
        PkgInt.pack4bits(0, 0, 0, 0, 0, 0, 0, 0),
        PkgInt.pack4bits(6, 0, 4, 0, 8, 0, 0, 0),
        PkgInt.pack4bits(0, 9, 5, 0, 0, 0, 0, 0),
        PkgInt.pack4bits(0, 0, 0, 0, 0, 0, 0, 0),
        PkgInt.pack4bits(0, 0, 0, 0, 0, 0, 0, 0),
        PkgInt.pack4bits(0, 0, 0, 0, 0, 0, 0, 0),
        PkgInt.pack4bits(0, 0, 0, 0, 0, 0, 0, 0),
        PkgInt.pack4bits(0, 0, 0, 0, 0, 0, 0, 0),
        PkgInt.pack4bits(0, 0, 0, 0, 0, 0, 0, 0),
        PkgInt.pack4bits(2, 2, 2, 2, 2, 2, 2, 2),
        PkgInt.pack4bits(2, 2, 2, 2, 2, 2, 2, 2),
        PkgInt.pack4bits(2, 2, 2, 2, 2, 2, 2, 2),
        PkgInt.pack4bits(2, 2, 2, 2, 2, 2, 2, 2),
        PkgInt.pack4bits(2, 2, 2, 2, 2, 2, 2, 2),
        PkgInt.pack4bits(2, 2, 2, 2, 2, 2, 2, 2),
        PkgInt.pack4bits(2, 2, 2, 2, 2, 2, 2, 2),
        PkgInt.pack4bits(2, 2, 2, 2, 2, 2, 2, 2),
        PkgInt.pack4bits(2, 2, 2, 2, 2, 2, 2, 2),
        PkgInt.pack4bits(2, 2, 2, 2, 2, 2, 2, 2),
        PkgInt.pack4bits(2, 2, 2, 2, 2, 2, 2, 2),
        PkgInt.pack4bits(2, 2, 2, 2, 2, 2, 2, 2),
        PkgInt.pack4bits(2, 2, 2, 2, 2, 2, 2, 2),
        PkgInt.pack4bits(2, 2, 2, 2, 2, 2, 2, 2),
        PkgInt.pack4bits(2, 2, 2, 2, 2, 2, 2, 2),
        PkgInt.pack4bits(2, 2, 2, 2, 2, 2, 2, 2) // f8 - ff
    ];
    private static iso2022jpStateTable: number[] = [
        PkgInt.pack4bits(SMModel.START, 3, SMModel.ERROR, SMModel.START, SMModel.START, SMModel.START, SMModel.START, SMModel.START),
        PkgInt.pack4bits(SMModel.START, SMModel.START, SMModel.ERROR, SMModel.ERROR, SMModel.ERROR, SMModel.ERROR, SMModel.ERROR, SMModel.ERROR),
        PkgInt.pack4bits(SMModel.ERROR, SMModel.ERROR, SMModel.ERROR, SMModel.ERROR, SMModel.ITSME, SMModel.ITSME, SMModel.ITSME, SMModel.ITSME),
        PkgInt.pack4bits(SMModel.ITSME, SMModel.ITSME, SMModel.ITSME, SMModel.ITSME, SMModel.ITSME, SMModel.ITSME, SMModel.ERROR, SMModel.ERROR),
        PkgInt.pack4bits(SMModel.ERROR, 5, SMModel.ERROR, SMModel.ERROR, SMModel.ERROR, 4, SMModel.ERROR, SMModel.ERROR),
        PkgInt.pack4bits(SMModel.ERROR, SMModel.ERROR, SMModel.ERROR, 6, SMModel.ITSME, SMModel.ERROR, SMModel.ITSME, SMModel.ERROR),
        PkgInt.pack4bits(SMModel.ERROR, SMModel.ERROR, SMModel.ERROR, SMModel.ERROR, SMModel.ERROR, SMModel.ERROR, SMModel.ITSME, SMModel.ITSME),
        PkgInt.pack4bits(SMModel.ERROR, SMModel.ERROR, SMModel.ERROR, SMModel.ITSME, SMModel.ERROR, SMModel.ERROR, SMModel.ERROR, SMModel.ERROR),
        PkgInt.pack4bits(SMModel.ERROR, SMModel.ERROR, SMModel.ERROR, SMModel.ERROR, SMModel.ITSME, SMModel.ERROR, SMModel.START, SMModel.START) //40-47
    ];
    private static iso2022jpCharLenTable: number[] = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ];
}
export default ISO2022JPSMModel;
