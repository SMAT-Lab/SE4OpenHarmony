let __generate__Id: number = 0;
function generateId(): string {
    return "Ability.test_" + ++__generate__Id;
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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import { nsICharsetDetectionObserver, nsDetector, nsPSMDetector } from '@ohos/jchardet/';
let det: nsDetector = new nsDetector(0);
let byteData = new Int8Array();
export default function abilityTest() {
    describe('jchardetTest', () => {
        it("Init1", 0, () => {
            //Init
            expect(det.mObserver).assertNull();
            class CharsetDetectionObserver implements nsICharsetDetectionObserver {
                Notify(charset: string): void {
                    console.log("CHARSET = " + charset);
                }
            }
            let mObserver: nsICharsetDetectionObserver = new CharsetDetectionObserver();
            det.Init(mObserver);
            expect(det.mObserver).assertEqual(mObserver);
        });
        it("Init2", 0, () => {
            //Init
            let det: nsDetector = new nsDetector(1);
            expect(det.mObserver).assertNull();
            class CharsetDetectionObserver implements nsICharsetDetectionObserver {
                Notify(charset: string): void {
                    console.log("CHARSET = " + charset);
                }
            }
            let mObserver: nsICharsetDetectionObserver = new CharsetDetectionObserver();
            det.Init(mObserver);
            expect(det.mObserver).assertEqual(mObserver);
        });
        it("Init3", 0, () => {
            //Init
            let det: nsDetector = new nsDetector(2);
            expect(det.mObserver).assertNull();
            class CharsetDetectionObserver implements nsICharsetDetectionObserver {
                Notify(charset: string): void {
                    console.log("CHARSET = " + charset);
                }
            }
            let mObserver: nsICharsetDetectionObserver = new CharsetDetectionObserver();
            det.Init(mObserver);
            expect(det.mObserver).assertEqual(mObserver);
        });
        it("Init4", 0, () => {
            //Init
            let det: nsDetector = new nsDetector(3);
            expect(det.mObserver).assertNull();
            class CharsetDetectionObserver implements nsICharsetDetectionObserver {
                Notify(charset: string): void {
                    console.log("CHARSET = " + charset);
                }
            }
            let mObserver: nsICharsetDetectionObserver = new CharsetDetectionObserver();
            det.Init(mObserver);
            expect(det.mObserver).assertEqual(mObserver);
        });
        it("Init5", 0, () => {
            //Init
            let det: nsDetector = new nsDetector(4);
            expect(det.mObserver).assertNull();
            class CharsetDetectionObserver implements nsICharsetDetectionObserver {
                Notify(charset: string): void {
                    console.log("CHARSET = " + charset);
                }
            }
            let mObserver: nsICharsetDetectionObserver = new CharsetDetectionObserver();
            det.Init(mObserver);
            expect(det.mObserver).assertEqual(mObserver);
        });
        it('DoIt1', 0, () => {
            let det: nsDetector = new nsDetector(0);
            let flag1: boolean = det.DoIt(null, true);
            expect(flag1).assertEqual(false);
        });
        it('DoIt2', 0, () => {
            let det: nsDetector = new nsDetector(1);
            let flag2: boolean = det.DoIt(byteData, false);
            expect(flag2).assertUndefined();
        });
        it('DoIt3', 0, () => {
            let det: nsDetector = new nsDetector(1);
            let flag3: boolean = det.DoIt(byteData, true);
            expect(flag3).assertEqual(false);
        });
        it('DoIt4', 0, () => {
            let det: nsDetector = new nsDetector(2);
            let flag1: boolean = det.DoIt(null, false);
            expect(flag1).assertEqual(false);
        });
        it('DoIt5', 0, () => {
            let det: nsDetector = new nsDetector(3);
            let flag3: boolean = det.DoIt(byteData, true);
            expect(flag3).assertFalse();
        });
        it('DoIt6', 0, () => {
            let det: nsDetector = new nsDetector(4);
            let byteData = new Int8Array([1, 2, 3]);
            let flag3: boolean = det.DoIt(byteData, true);
            expect(flag3).assertFalse();
        });
        it('isAscii1', 0, () => {
            let arr1 = [76, 111, 114, 101, 109, 32, 105, 112, 115, 117, 109, 32, 100, 111, 108, 111, 114, 32, 115, 105, 116, 32, 97, 109, 101, 116, 44, 32, 99, 111, 110, 115, 101, 99, 116, 101, 116, 117, 114, 32, 97, 100, 105, 112, 105, 115, 99, 105, 110, 103, 32, 101, 108, 105, 116, 46];
            let aBuf1 = new Int8Array(arr1);
            let isAscii: boolean = det.isAscii(aBuf1);
            expect(isAscii).assertEqual(true);
        });
        it('isAscii2', 0, () => {
            let arr = [239, 187, 191, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 13, 10, 32, 32, 32, 32, 227, 130, 179, 227, 131, 179, 227, 130, 189, 227, 131, 188, 227, 131, 171, 32, 227, 130, 162, 227, 131, 151, 227, 131, 170, 227, 130, 177, 227, 131, 188, 227, 130, 183, 227, 131, 167, 227, 131, 179, 32, 58, 32, 117, 110, 105, 118, 101, 114, 115, 97, 108, 99, 104, 97, 114, 100, 101, 116, 32, 227, 131, 151, 227, 131, 173, 227, 130, 184, 227, 130, 167, 227, 130, 175, 227, 131, 136, 227, 129, 174, 230, 166, 130, 232, 166, 129, 13, 10, 13, 10, 13, 10, 13, 10, 13, 10];
            let aBuf = new Int8Array(arr);
            let flag: boolean = det.isAscii(aBuf);
            expect(flag).assertEqual(false);
        });
        it('isAscii3', 0, () => {
            let arr1 = [76, 111, 114, 101, 109, 32, 105, 112, 115, 117, 109];
            let aBuf1 = new Int8Array(arr1);
            let isAscii: boolean = det.isAscii(aBuf1);
            expect(isAscii).assertEqual(true);
        });
        it('isAscii4', 0, () => {
            let arr = [239, 187, 191, 61];
            let aBuf = new Int8Array(arr);
            let flag: boolean = det.isAscii(aBuf);
            expect(flag).assertEqual(false);
        });
        it('isAscii5', 0, () => {
            let arr1 = [76, 111, 114, 101, 109, 32, 105, 112, 115, 117, 109, 32, 100, 111, 108, 111];
            let aBuf1 = new Int8Array(arr1);
            let isAscii: boolean = det.isAscii(aBuf1);
            expect(isAscii).assertEqual(true);
        });
        it('getProbableCharsets1', 0, () => {
            let result0 = ['UTF-8', 'Shift_JIS', 'EUC-JP', 'ISO-2022-JP', 'EUC-KR', 'ISO-2022-KR', 'Big5', 'x-euc-tw', 'GB2312', 'GB18030', 'ISO-2022-CN', 'HZ-GB-2312', 'windows-1252', 'UTF-16BE', 'UTF-16LE'];
            let det0: nsDetector = new nsDetector(0);
            let prob0: Array<string> = det0.getProbableCharsets();
            expect(prob0).assertDeepEquals(result0);
        });
        it('getProbableCharsets2', 0, () => {
            let result1 = ['UTF-8', 'Shift_JIS', 'EUC-JP', 'ISO-2022-JP', 'windows-1252', 'UTF-16BE', 'UTF-16LE'];
            let det1: nsDetector = new nsDetector(1);
            let prob1: Array<string> = det1.getProbableCharsets();
            expect(prob1).assertDeepEquals(result1);
        });
        it('getProbableCharsets3', 0, () => {
            let result2 = ['UTF-8', 'GB2312', 'GB18030', 'Big5', 'ISO-2022-CN', 'HZ-GB-2312', 'x-euc-tw', 'windows-1252', 'UTF-16BE', 'UTF-16LE'];
            let det2: nsDetector = new nsDetector(2);
            let prob2: Array<string> = det2.getProbableCharsets();
            expect(prob2).assertDeepEquals(result2);
        });
        it('getProbableCharsets4', 0, () => {
            let result3 = ['UTF-8', 'GB2312', 'GB18030', 'ISO-2022-CN', 'HZ-GB-2312', 'windows-1252', 'UTF-16BE', 'UTF-16LE'];
            let det3: nsDetector = new nsDetector(3);
            let prob3: Array<string> = det3.getProbableCharsets();
            expect(prob3).assertDeepEquals(result3);
        });
        it('getProbableCharsets5', 0, () => {
            let result4 = ['UTF-8', 'Big5', 'ISO-2022-CN', 'x-euc-tw', 'windows-1252', 'UTF-16BE', 'UTF-16LE'];
            let det4: nsDetector = new nsDetector(4);
            let prob4: Array<string> = det4.getProbableCharsets();
            expect(prob4).assertDeepEquals(result4);
        });
        it('getProbableCharsets6', 0, () => {
            let result5 = ['UTF-8', 'EUC-KR', 'ISO-2022-KR', 'windows-1252', 'UTF-16BE', 'UTF-16LE'];
            let det5: nsDetector = new nsDetector(5);
            let prob5: Array<string> = det5.getProbableCharsets();
            expect(prob5).assertDeepEquals(result5);
        });
        it('getProbableCharsets7', 0, () => {
            let result6 = ['UTF-8', 'Shift_JIS', 'EUC-JP', 'ISO-2022-JP', 'EUC-KR', 'ISO-2022-KR', 'Big5', 'x-euc-tw', 'GB2312', 'GB18030', 'ISO-2022-CN', 'HZ-GB-2312', 'windows-1252', 'UTF-16BE', 'UTF-16LE'];
            let det6: nsDetector = new nsDetector(6);
            let prob6: Array<string> = det6.getProbableCharsets();
            expect(prob6).assertDeepEquals(result6);
        });
        it('DataEnd1', 0, () => {
            let det: nsDetector = new nsDetector(0);
            expect(det.mItems).assertEqual(15);
            expect(det.mRunSampler).assertTrue();
            det.mItems = 2;
            det.DataEnd();
            expect(det.mRunSampler).assertFalse();
        });
        it('DataEnd2', 0, () => {
            let det: nsDetector = new nsDetector(1);
            expect(det.mItems).assertEqual(7);
            expect(det.mRunSampler).assertTrue();
            expect(det.mDone).assertFalse();
            det.mItems = 2;
            det.DataEnd();
            expect(det.mDone).assertFalse();
            expect(det.mRunSampler).assertFalse();
        });
        it('DataEnd3', 0, () => {
            let det: nsDetector = new nsDetector(2);
            expect(det.mItems).assertEqual(10);
            expect(det.mRunSampler).assertTrue();
            det.mItems = 3;
            det.DataEnd();
            expect(det.mRunSampler).assertFalse();
        });
        it('DataEnd4', 0, () => {
            let det: nsDetector = new nsDetector(3);
            expect(det.mItems).assertEqual(8);
            expect(det.mDone).assertFalse();
            expect(det.mRunSampler).assertTrue();
            det.mItems = 2;
            det.DataEnd();
            expect(det.mDone).assertFalse();
            expect(det.mRunSampler).assertFalse();
        });
        it('DataEnd5', 0, () => {
            let det: nsDetector = new nsDetector(4);
            expect(det.mItems).assertEqual(7);
            expect(det.mRunSampler).assertTrue();
            det.mItems = 2;
            det.DataEnd();
            expect(det.mRunSampler).assertFalse();
        });
        it('HandleData1', 0, () => {
            let det: nsDetector = new nsDetector(0);
            let arr = [239, 187, 191, 61];
            let byteData = new Int8Array(arr);
            expect(det.HandleData(byteData, byteData.length)).assertEqual(false);
        });
        it('HandleData2', 0, () => {
            let det: nsDetector = new nsDetector(0);
            let arr1 = [76, 111, 114, 101, 109, 32, 105, 112, 115, 117, 109];
            let byteData = new Int8Array(arr1);
            expect(det.HandleData(byteData, byteData.length)).assertEqual(false);
        });
        it('HandleData3', 0, () => {
            let det: nsDetector = new nsDetector(0);
            let arr1 = [76, 111, 114, 101, 109, 32, 105, 112, 115, 117, 109, 32, 100, 111, 108, 111];
            let byteData = new Int8Array(arr1);
            expect(det.HandleData(byteData, byteData.length)).assertEqual(false);
        });
        it('HandleData4', 0, () => {
            let det: nsDetector = new nsDetector(0);
            let arr1 = [76, 111, 114, 101, 109, 32, 105, 112, 115, 117, 109, 32, 100, 111, 108, 111, 114, 32, 115, 105, 116, 32, 97, 109, 101, 116, 44, 32, 99, 111, 110, 115, 101, 99, 116, 101, 116, 117, 114, 32, 97, 100, 105, 112, 105, 115, 99, 105, 110, 103, 32, 101, 108, 105, 116, 46];
            let byteData = new Int8Array(arr1);
            expect(det.HandleData(byteData, byteData.length)).assertEqual(false);
        });
        it('HandleData5', 0, () => {
            let det: nsDetector = new nsDetector(0);
            let arr = [239, 187, 191, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 13, 10, 32, 32, 32, 32, 227, 130, 179, 227, 131, 179, 227, 130, 189, 227, 131, 188, 227, 131, 171, 32, 227, 130, 162, 227, 131, 151, 227, 131, 170, 227, 130, 177, 227, 131, 188, 227, 130, 183, 227, 131, 167, 227, 131, 179, 32, 58, 32, 117, 110, 105, 118, 101, 114, 115, 97, 108, 99, 104, 97, 114, 100, 101, 116, 32, 227, 131, 151, 227, 131, 173, 227, 130, 184, 227, 130, 167, 227, 130, 175, 227, 131, 136, 227, 129, 174, 230, 166, 130, 232, 166, 129, 13, 10, 13, 10, 13, 10, 13, 10, 13, 10];
            let byteData = new Int8Array(arr);
            expect(det.HandleData(byteData, byteData.length)).assertEqual(true);
        });
        it('Report1', 0, () => {
            let s: string = 'test string';
            let det: nsDetector = new nsDetector(0);
            class CharsetDetectionObserver implements nsICharsetDetectionObserver {
                Notify(charset: string): void {
                    expect(charset).assertEqual(s);
                }
            }
            let mObserver: nsICharsetDetectionObserver = new CharsetDetectionObserver();
            det.Init(mObserver);
            det.Report(s);
        });
        it('Report2', 0, () => {
            let s: string = 'test string 1';
            let det: nsDetector = new nsDetector(1);
            class CharsetDetectionObserver implements nsICharsetDetectionObserver {
                Notify(charset: string): void {
                    expect(charset).assertEqual(s);
                }
            }
            let mObserver: nsICharsetDetectionObserver = new CharsetDetectionObserver();
            det.Init(mObserver);
            det.Report(s);
        });
        it('Report3', 0, () => {
            let s: string = 'test string 2';
            let det: nsDetector = new nsDetector(2);
            class CharsetDetectionObserver implements nsICharsetDetectionObserver {
                Notify(charset: string): void {
                    expect(charset).assertEqual(s);
                }
            }
            let mObserver: nsICharsetDetectionObserver = new CharsetDetectionObserver();
            det.Init(mObserver);
            det.Report(s);
        });
        it('Report4', 0, () => {
            let s: string = 'test string 3';
            let det: nsDetector = new nsDetector(3);
            class CharsetDetectionObserver implements nsICharsetDetectionObserver {
                Notify(charset: string): void {
                    expect(charset).assertEqual(s);
                }
            }
            let mObserver: nsICharsetDetectionObserver = new CharsetDetectionObserver();
            det.Init(mObserver);
            det.Report(s);
        });
        it('Report5', 0, () => {
            let s: string = 'test string 4';
            let det: nsDetector = new nsDetector(4);
            class CharsetDetectionObserver implements nsICharsetDetectionObserver {
                Notify(charset: string): void {
                    expect(charset).assertEqual(s);
                }
            }
            let mObserver: nsICharsetDetectionObserver = new CharsetDetectionObserver();
            det.Init(mObserver);
            det.Report(s);
        });
        it('Reset1', 0, () => {
            let det: nsDetector = new nsDetector(0);
            expect(det.mRunSampler).assertTrue();
            expect(det.mDone).assertFalse();
            expect(det.mItems).assertEqual(15);
            det.mRunSampler = false;
            det.mDone = true;
            det.mItems = 3;
            expect(det.mRunSampler).assertFalse();
            expect(det.mDone).assertTrue();
            expect(det.mItems).assertEqual(3);
            det.Reset();
            expect(det.mRunSampler).assertTrue();
            expect(det.mDone).assertFalse();
            expect(det.mItems).assertEqual(15);
        });
        it('Reset2', 0, () => {
            let det: nsDetector = new nsDetector(1);
            expect(det.mRunSampler).assertTrue();
            expect(det.mDone).assertFalse();
            expect(det.mItems).assertEqual(7);
            det.mRunSampler = true;
            det.mDone = true;
            det.mItems = 5;
            expect(det.mRunSampler).assertTrue();
            expect(det.mDone).assertTrue();
            expect(det.mItems).assertEqual(5);
            det.Reset();
            expect(det.mRunSampler).assertTrue();
            expect(det.mDone).assertFalse();
            expect(det.mItems).assertEqual(7);
        });
        it('Reset3', 0, () => {
            let det: nsDetector = new nsDetector(2);
            expect(det.mRunSampler).assertTrue();
            expect(det.mDone).assertFalse();
            expect(det.mItems).assertEqual(10);
            det.mRunSampler = false;
            det.mDone = true;
            det.mItems = 3;
            expect(det.mRunSampler).assertFalse();
            expect(det.mDone).assertTrue();
            expect(det.mItems).assertEqual(3);
            det.Reset();
            expect(det.mRunSampler).assertTrue();
            expect(det.mDone).assertFalse();
            expect(det.mItems).assertEqual(10);
        });
        it('Reset4', 0, () => {
            let det: nsDetector = new nsDetector(3);
            expect(det.mRunSampler).assertTrue();
            expect(det.mDone).assertFalse();
            expect(det.mItems).assertEqual(8);
            det.mRunSampler = true;
            det.mDone = true;
            det.mItems = 3;
            expect(det.mRunSampler).assertTrue();
            expect(det.mDone).assertTrue();
            expect(det.mItems).assertEqual(3);
            det.Reset();
            expect(det.mRunSampler).assertTrue();
            expect(det.mDone).assertFalse();
            expect(det.mItems).assertEqual(8);
        });
        it('Reset5', 0, () => {
            let det: nsDetector = new nsDetector(4);
            expect(det.mRunSampler).assertTrue();
            expect(det.mDone).assertFalse();
            expect(det.mItems).assertEqual(7);
            det.mRunSampler = false;
            det.mDone = true;
            det.mItems = 3;
            expect(det.mRunSampler).assertFalse();
            expect(det.mDone).assertTrue();
            expect(det.mItems).assertEqual(3);
            det.Reset();
            expect(det.mRunSampler).assertTrue();
            expect(det.mDone).assertFalse();
            expect(det.mItems).assertEqual(7);
        });
    });
}
