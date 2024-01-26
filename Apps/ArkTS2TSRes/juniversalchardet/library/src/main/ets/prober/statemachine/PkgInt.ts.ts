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
class PkgInt {
    ////////////////////////////////////////////////////////////////
    // constants
    ////////////////////////////////////////////////////////////////
    public static INDEX_SHIFT_4BITS: number = 3;
    public static INDEX_SHIFT_8BITS: number = 2;
    public static INDEX_SHIFT_16BITS: number = 1;
    public static SHIFT_MASK_4BITS: number = 7;
    public static SHIFT_MASK_8BITS: number = 3;
    public static SHIFT_MASK_16BITS: number = 1;
    public static BIT_SHIFT_4BITS: number = 2;
    public static BIT_SHIFT_8BITS: number = 3;
    public static BIT_SHIFT_16BITS: number = 4;
    public static UNIT_MASK_4BITS: number = 0x0000000F;
    public static UNIT_MASK_8BITS: number = 0x000000FF;
    public static UNIT_MASK_16BITS: number = 0x0000FFFF;
    ////////////////////////////////////////////////////////////////
    // fields
    ////////////////////////////////////////////////////////////////
    private indexShift: number = null;
    private shiftMask: number = null;
    private bitShift: number = null;
    private unitMask: number = null;
    private data: number[] = null;
    ////////////////////////////////////////////////////////////////
    // methods
    ////////////////////////////////////////////////////////////////
    constructor(indexShift: number, shiftMask: number, bitShift: number, unitMask: number, data: number[]) {
        this.indexShift = indexShift;
        this.shiftMask = shiftMask;
        this.bitShift = bitShift;
        this.unitMask = unitMask;
        this.data = data.copyWithin(0, 0, data.length - 1);
    }
    public static pack16bits(a: number, b: number): number {
        return ((b << 16) | a);
    }
    public static pack8bits(a: number, b: number, c: number, d: number): number {
        return PkgInt.pack16bits((b << 8) | a, (d << 8) | c);
    }
    public static pack4bits(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number): number {
        return PkgInt.pack8bits((b << 4) | a, (d << 4) | c, (f << 4) | e, (h << 4) | g);
    }
    public unpack(i: number): number {
        return ((this.data[i >> this.indexShift] >> ((i & this.shiftMask) << this.bitShift)) & this.unitMask);
    }
}
export default PkgInt;
