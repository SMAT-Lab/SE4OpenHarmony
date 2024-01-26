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
class Constants {
    public static CHARSET_ISO_2022_JP: string = "ISO-2022-JP";
    public static CHARSET_ISO_2022_CN: string = "ISO-2022-CN";
    public static CHARSET_ISO_2022_KR: string = "ISO-2022-KR";
    public static CHARSET_ISO_8859_5: string = "ISO-8859-5";
    public static CHARSET_ISO_8859_7: string = "ISO-8859-7";
    public static CHARSET_ISO_8859_8: string = "ISO-8859-8";
    public static CHARSET_BIG5: string = "BIG5";
    public static CHARSET_GB18030: string = "GB18030";
    public static CHARSET_EUC_JP: string = "EUC-JP";
    public static CHARSET_EUC_KR: string = "EUC-KR";
    public static CHARSET_EUC_TW: string = "EUC-TW";
    public static CHARSET_SHIFT_JIS: string = "SHIFT_JIS";
    public static CHARSET_IBM855: string = "IBM855";
    public static CHARSET_IBM866: string = "IBM866";
    public static CHARSET_KOI8_R: string = "KOI8-R";
    public static CHARSET_MACCYRILLIC: string = "MACCYRILLIC";
    public static CHARSET_WINDOWS_1251: string = "WINDOWS-1251";
    public static CHARSET_WINDOWS_1252: string = "WINDOWS-1252";
    public static CHARSET_WINDOWS_1253: string = "WINDOWS-1253";
    public static CHARSET_WINDOWS_1255: string = "WINDOWS-1255";
    public static CHARSET_UTF_8: string = "UTF-8";
    public static CHARSET_UTF_16BE: string = "UTF-16BE";
    public static CHARSET_UTF_16LE: string = "UTF-16LE";
    public static CHARSET_UTF_32BE: string = "UTF-32BE";
    public static CHARSET_UTF_32LE: string = "UTF-32LE";
    public static CHARSET_TIS620: string = "TIS620";
    public static CHARSET_US_ASCCI: string = "US-ASCII";
    // WARNING: Listed below are charsets which Java does not support.
    public static CHARSET_HZ_GB_2312: string = "HZ-GB-2312"; // Simplified Chinese
    public static CHARSET_X_ISO_10646_UCS_4_3412: string = "X-ISO-10646-UCS-4-3412"; // Malformed UTF-32
    public static CHARSET_X_ISO_10646_UCS_4_2143: string = "X-ISO-10646-UCS-4-2143"; // Malformed UTF-32
}
export default Constants;
