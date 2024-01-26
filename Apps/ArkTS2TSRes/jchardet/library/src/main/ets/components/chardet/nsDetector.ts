let __generate__Id: number = 0;
function generateId(): string {
    return "nsDetector_" + ++__generate__Id;
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
import nsICharsetDetectionObserver from './nsICharsetDetectionObserver';
import nsICharsetDetector from './nsICharsetDetector';
import nsPSMDetector from './nsPSMDetector';
class nsDetector extends nsPSMDetector implements nsICharsetDetector {
    public mObserver: nsICharsetDetectionObserver | null = null;
    constructor(langFlag?: number) {
        super(langFlag);
    }
    public Init(aObserver: nsICharsetDetectionObserver): void {
        this.mObserver = aObserver;
        return;
    }
    public DoIt(aBuf: Int8Array | null, oDontFeedMe: boolean): boolean {
        if (aBuf == null || oDontFeedMe)
            return false;
        super.HandleData(aBuf, aBuf.length);
        return super.mDone;
    }
    public Done(): void {
        super.DataEnd();
        return;
    }
    public Report(charset: string): void {
        if (this.mObserver != null)
            this.mObserver.Notify(charset);
    }
    public isAscii(aBuf: Int8Array): boolean {
        for (let i = 0; i < aBuf.length; i++) {
            if ((0x0080 & aBuf[i]) != 0) {
                return false;
            }
        }
        return true;
    }
}
export default nsDetector;
