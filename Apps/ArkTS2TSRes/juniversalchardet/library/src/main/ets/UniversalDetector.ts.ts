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
import CharsetListener from './CharsetListener';
import Constants from './Constants';
import CharsetProber from './prober/CharsetProber';
import { ProbingState } from './prober/CharsetProber';
import Latin1Prober from './prober/Latin1Prober';
import MBCSGroupProber from './prober/MBCSGroupProber';
import SBCSGroupProber from './prober/SBCSGroupProber';
import EscCharsetProber from './prober/EscCharsetProber';
////////////////////////////////////////////////////////////////
// inner types
////////////////////////////////////////////////////////////////
export enum InputState {
    PURE_ASCII,
    ESC_ASCII,
    HIGHBYTE
}
export class UniversalDetector {
    ////////////////////////////////////////////////////////////////
    // constants
    ////////////////////////////////////////////////////////////////
    public static SHORTCUT_THRESHOLD: number = 0.95;
    public static MINIMUM_THRESHOLD: number = 0.20;
    ////////////////////////////////////////////////////////////////
    // fields
    ////////////////////////////////////////////////////////////////
    private inputState: InputState;
    private done: boolean;
    private start: boolean;
    private gotData: boolean;
    private onlyPrintableASCII: boolean = true;
    private lastChar: number;
    private detectedCharset: string;
    private probers: CharsetProber[];
    private escCharsetProber: CharsetProber;
    private listener: CharsetListener;
    ////////////////////////////////////////////////////////////////
    // methods
    ////////////////////////////////////////////////////////////////
    /**
     * @param listener a listener object that is notified of
     *         the detected encocoding. Can be null.
     */
    public constructor(listener?: CharsetListener) {
        this.listener = listener;
        this.escCharsetProber = null;
        this.probers = new Array(3);
        this.reset();
    }
    public isDone(): boolean {
        return this.done;
    }
    /**
     * @return The detected encoding is returned. If the detector couldn't
     *          determine what encoding was used, null is returned.
     */
    public getDetectedCharset(): string {
        return this.detectedCharset;
    }
    public setListener(listener: CharsetListener): void {
        this.listener = listener;
    }
    public getListener(): CharsetListener {
        return this.listener;
    }
    /**
     * Feed the detector with more data
     * @param buf The buffer containing the data
     */
    public handleDataParent(buf: ArrayBuffer): void {
        this.handleData(buf, 0, buf.byteLength);
    }
    /**
     * Feed the detector with more data
     * @param buf Buffer with the data
     * @param offset initial position of data in buf
     * @param length length of data
     */
    public handleData(buf: ArrayBuffer, offset: number, length: number): void {
        if (this.done) {
            return;
        }
        if (length > 0) {
            this.gotData = true;
        }
        if (this.start) {
            this.start = false;
            if (length > 3) {
                let detectedBOM: string = UniversalDetector.detectCharsetFromBOM(buf, offset);
                if (detectedBOM != null) {
                    this.detectedCharset = detectedBOM;
                    this.done = true;
                    return;
                }
            }
        } // if (start) end
        let maxPos: number = offset + length;
        let tempIntArray = new Int8Array(buf);
        for (let i: number = offset; i < maxPos; ++i) {
            let c: number = tempIntArray[i] & 0xFF;
            if ((c & 0x80) != 0 && c != 0xA0) {
                if (this.inputState != InputState.HIGHBYTE) {
                    this.inputState = InputState.HIGHBYTE;
                    if (this.escCharsetProber != null) {
                        this.escCharsetProber = null;
                    }
                    if (this.probers[0] == null) {
                        this.probers[0] = new MBCSGroupProber();
                    }
                    if (this.probers[1] == null) {
                        this.probers[1] = new SBCSGroupProber();
                    }
                    if (this.probers[2] == null) {
                        this.probers[2] = new Latin1Prober();
                    }
                }
            }
            else {
                if (this.inputState == InputState.PURE_ASCII &&
                    (c == 0x1B || (c == 0x7B && this.lastChar == 0x7E))) {
                    this.inputState = InputState.ESC_ASCII;
                }
                if (this.inputState == InputState.PURE_ASCII && this.onlyPrintableASCII) {
                    this.onlyPrintableASCII =
                        (c >= 0x20 && c <= 0x7e) // Printable characters
                            || c == 0x0A // New Line
                            || c == 0x0D // Carriage return
                            || c == 0x09; // TAB
                }
                this.lastChar = tempIntArray[i];
            }
        } // for end
        let st: ProbingState;
        if (this.inputState == InputState.ESC_ASCII) {
            if (this.escCharsetProber == null) {
                this.escCharsetProber = new EscCharsetProber();
            }
            st = this.escCharsetProber.handleData(buf, offset, length);
            if (st == ProbingState.FOUND_IT) {
                this.done = true;
                this.detectedCharset = this.escCharsetProber.getCharSetName();
            }
        }
        else if (this.inputState == InputState.HIGHBYTE) {
            for (let i: number = 0; i < this.probers.length; ++i) {
                st = this.probers[i].handleData(buf, offset, length);
                if (st == ProbingState.FOUND_IT) {
                    this.done = true;
                    this.detectedCharset = this.probers[i].getCharSetName();
                    return;
                }
            }
        }
        else { // pure ascii
            // do nothing
        }
    }
    private static detectCharsetFromBOM(buf: ArrayBuffer, offset: number): string {
        if (buf.byteLength > (offset + 3)) {
            let tempIntArray = new Int8Array(buf);
            let b1: number = tempIntArray[offset] & 0xFF;
            let b2: number = tempIntArray[offset + 1] & 0xFF;
            let b3: number = tempIntArray[offset + 2] & 0xFF;
            let b4: number = tempIntArray[offset + 3] & 0xFF;
            switch (b1) {
                case 0xEF:
                    if (b2 == 0xBB && b3 == 0xBF) {
                        return Constants.CHARSET_UTF_8;
                    }
                    break;
                case 0xFE:
                    if (b2 == 0xFF && b3 == 0x00 && b4 == 0x00) {
                        return Constants.CHARSET_X_ISO_10646_UCS_4_3412;
                    }
                    else if (b2 == 0xFF) {
                        return Constants.CHARSET_UTF_16BE;
                    }
                    break;
                case 0x00:
                    if (b2 == 0x00 && b3 == 0xFE && b4 == 0xFF) {
                        return Constants.CHARSET_UTF_32BE;
                    }
                    else if (b2 == 0x00 && b3 == 0xFF && b4 == 0xFE) {
                        return Constants.CHARSET_X_ISO_10646_UCS_4_2143;
                    }
                    break;
                case 0xFF:
                    if (b2 == 0xFE && b3 == 0x00 && b4 == 0x00) {
                        return Constants.CHARSET_UTF_32LE;
                    }
                    else if (b2 == 0xFE) {
                        return Constants.CHARSET_UTF_16LE;
                    }
                    break;
                default:
                    break;
            } // switch end
        }
        return null;
    }
    /**
     * Marks end of data reading. Finish calculations.
     */
    public dataEnd(): void {
        if (!this.gotData) {
            return;
        }
        if (this.detectedCharset != null) {
            this.done = true;
            if (this.listener != null) {
                this.listener.report(this.detectedCharset);
            }
            return;
        }
        if (this.inputState == InputState.HIGHBYTE) {
            let proberConfidence: number;
            let maxProberConfidence: number = 0.0;
            let maxProber: number = 0;
            for (let i: number = 0; i < this.probers.length; ++i) {
                proberConfidence = this.probers[i].getConfidence();
                if (proberConfidence > maxProberConfidence) {
                    maxProberConfidence = proberConfidence;
                    maxProber = i;
                }
            }
            if (maxProberConfidence > UniversalDetector.MINIMUM_THRESHOLD) {
                this.detectedCharset = this.probers[maxProber].getCharSetName();
                if (this.listener != null) {
                    this.listener.report(this.detectedCharset);
                }
            }
        }
        else if (this.inputState == InputState.ESC_ASCII) {
            // do nothing
        }
        else if (this.inputState == InputState.PURE_ASCII && this.onlyPrintableASCII) {
            this.detectedCharset = Constants.CHARSET_US_ASCCI;
        }
        else {
            // do nothing
        }
    }
    /**
     * Resets detector to be used again.
     */
    public reset(): void {
        this.done = false;
        this.start = true;
        this.detectedCharset = null;
        this.gotData = false;
        this.inputState = InputState.PURE_ASCII;
        this.lastChar = 0;
        if (this.escCharsetProber != null) {
            this.escCharsetProber.reset();
        }
        for (let i: number = 0; i < this.probers.length; ++i) {
            if (this.probers[i] != null) {
                this.probers[i].reset();
            }
        }
    }
    /**
     * Gets the charset of content from InputStream.
     *
     * @param inputStream InputStream containing text file
     * @return The charset of the file, null if cannot be determined
     * @throws IOException if some IO error occurs
     */
    public static async detectCharset(file: string): Promise<string> {
        let encoding: string = '';
        let that = this;
        // 获取应用在内部存储上的缓存目录路径，使用Promise方式作为异步方法。
        await fs.createStream(file, "r+").then(function (stream) {
            let buf = new ArrayBuffer(1024);
            encoding = that.detectCharsetBranch(stream, buf);
            return encoding;
        }).catch(err => {
            console.warn(`detectCharset -> fs.createStream err:${JSON.stringify(err)}`);
            throw err;
        });
        return encoding;
    }
    public static detectCharsetBranch(stream: any, buf: ArrayBuffer): string {
        let detector: UniversalDetector = new UniversalDetector(null);
        let encoding: string = '';
        let nread: number = 0;
        try {
            // 以同步方法从文件读取数据。
            let read_total: number = 0;
            while ((nread = stream.readSync(buf, {
                offset: read_total,
                length: buf.byteLength
            })) > 0 && !detector.isDone()) {
                detector.handleData(buf, 0, nread);
                read_total += nread;
            }
            detector.dataEnd();
            encoding = detector.getDetectedCharset();
            detector.reset();
        }
        catch (error) {
            throw new Error('UniversalDetector.readSync Failed. Cause: ' + error);
        }
        return encoding;
    }
}
export default UniversalDetector;
