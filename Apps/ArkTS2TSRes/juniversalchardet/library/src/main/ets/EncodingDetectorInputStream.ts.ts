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
import fs from '@ohos.file.fs';
import UniversalDetector from './UniversalDetector';
export class EncodingDetectorInputStream {
    private detector: UniversalDetector = new UniversalDetector(null);
    public close(): void {
        fs.close;
    }
    public readWithNoParameter(): number {
        let data = new ArrayBuffer(1);
        let nrOfBytesRead: number = this.read(null, data, 0, 1);
        if (nrOfBytesRead >= 0) {
            return data[0];
        }
        return -1;
    }
    public read(stream: any, b: ArrayBuffer, off: number, len: number): number {
        let nrOfBytesRead = stream.readSync(b, { offset: off, length: len });
        if (!this.detector.isDone() && nrOfBytesRead > 0) {
            this.detector.handleData(b, off, nrOfBytesRead);
        }
        this.detector.dataEnd();
        return nrOfBytesRead;
    }
    public readWithOneParameter(stream: any, b: ArrayBuffer, read_total: number): number {
        return this.read(stream, b, read_total, b.byteLength);
    }
    /**
     * Gets the detected charset, null if not yet detected.
     * @return The detected charset
     */
    public getDetectedCharset(): string {
        return this.detector.getDetectedCharset();
    }
}
export default EncodingDetectorInputStream;
