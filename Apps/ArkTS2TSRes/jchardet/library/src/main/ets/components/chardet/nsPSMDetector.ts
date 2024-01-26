let __generate__Id: number = 0;
function generateId(): string {
    return "nsPSMDetector_" + ++__generate__Id;
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
import EUCKRStatistics from './EUCKRStatistics';
import EUCJPStatistics from './EUCJPStatistics';
import GB2312Statistics from './GB2312Statistics';
import nsISO2022JPVerifier from './nsISO2022JPVerifier';
import nsEUCJPVerifier from './nsEUCJPVerifier';
import nsSJISVerifier from './nsSJISVerifier';
import nsHZVerifier from './nsHZVerifier';
import nsGB18030Verifier from './nsGB18030Verifier';
import nsGB2312Verifier from './nsGB2312Verifier';
import nsISO2022KRVerifier from './nsISO2022KRVerifier';
import nsEUCKRVerifier from './nsEUCKRVerifier';
import EUCTWStatistics from './EUCTWStatistics';
import Big5Statistics from './Big5Statistics';
import nsUTF8Verifier from './nsUTF8Verifier';
import nsEUCStatistics from './nsEUCStatistics';
import nsUCS2LEVerifier from './nsUCS2LEVerifier';
import nsUCS2BEVerifier from './nsUCS2BEVerifier';
import nsCP1252Verifier from './nsCP1252Verifier';
import nsEUCTWVerifier from './nsEUCTWVerifier';
import nsISO2022CNVerifier from './nsISO2022CNVerifier';
import nsBIG5Verifier from './nsBIG5Verifier';
import nsEUCSampler from './nsEUCSampler';
import nsVerifier from './nsVerifier';
import nsDetector from './nsDetector';
abstract class nsPSMDetector {
    public static readonly ALL: number = 0;
    public static readonly JAPANESE: number = 1;
    public static readonly CHINESE: number = 2;
    public static readonly SIMPLIFIED_CHINESE: number = 3;
    public static readonly TRADITIONAL_CHINESE: number = 4;
    public static readonly KOREAN: number = 5;
    public static readonly NO_OF_LANGUAGES: number = 6;
    public static readonly MAX_VERIFIERS: number = 16;
    private mVerifier: Array<nsVerifier | undefined> | undefined = [];
    private mStatisticsData: Array<nsEUCStatistics | undefined> | undefined = [];
    public mSampler: nsEUCSampler = new nsEUCSampler();
    public mState: Array<number> = new Array(nsPSMDetector.MAX_VERIFIERS);
    public mItemIdx: number[] = new Array(nsPSMDetector.MAX_VERIFIERS);
    public mItems: number = 0;
    public mClassItems: number = 0;
    public mDone: boolean = false;
    public mRunSampler: boolean = false;
    public mClassRunSampler: boolean = false;
    constructor(langFlag?: number, aItems?: number, aVerifierSet?: nsVerifier[], aStatisticsSet?: Array<nsEUCStatistics | undefined>) {
        if (langFlag || langFlag == 0) {
            this.initVerifiers(langFlag);
        }
        else {
            if ((aItems || aItems == 0) || aVerifierSet || aStatisticsSet) {
                this.mClassRunSampler = (aStatisticsSet != null);
                this.mStatisticsData = aStatisticsSet;
                this.mVerifier = aVerifierSet;
                this.mClassItems = aItems ? aItems : 0;
            }
            else {
                this.initVerifiers(nsPSMDetector.ALL);
            }
        }
        this.Reset();
    }
    public Reset(): void {
        this.mRunSampler = this.mClassRunSampler;
        this.mDone = false;
        this.mItems = this.mClassItems;
        if (this.mItems) {
            for (let i = 0; i < this.mItems; i++) {
                this.mState[i] = 0;
                this.mItemIdx[i] = i;
            }
        }
        this.mSampler.Reset();
    }
    protected initVerifiers(currVerSet: number): void {
        let idx = 0;
        let currVerifierSet: number;
        if (currVerSet >= 0 && currVerSet < nsPSMDetector.NO_OF_LANGUAGES) {
            currVerifierSet = currVerSet;
        }
        else {
            currVerifierSet = nsPSMDetector.ALL;
        }
        this.mVerifier = [];
        this.mStatisticsData = [];
        if (currVerifierSet == nsPSMDetector.TRADITIONAL_CHINESE) {
            this.mVerifier = [
                new nsUTF8Verifier(),
                new nsBIG5Verifier(),
                new nsISO2022CNVerifier(),
                new nsEUCTWVerifier(),
                new nsCP1252Verifier(),
                new nsUCS2BEVerifier(),
                new nsUCS2LEVerifier()
            ];
            this.mStatisticsData = [
                ,
                new Big5Statistics(),
                ,
                new EUCTWStatistics(),
                ,
                ,
            ];
        }
        //==========================================================
        else if (currVerifierSet == nsPSMDetector.KOREAN) {
            this.mVerifier = [
                new nsUTF8Verifier(),
                new nsEUCKRVerifier(),
                new nsISO2022KRVerifier(),
                new nsCP1252Verifier(),
                new nsUCS2BEVerifier(),
                new nsUCS2LEVerifier()
            ];
        }
        //==========================================================
        else if (currVerifierSet == nsPSMDetector.SIMPLIFIED_CHINESE) {
            this.mVerifier = [
                new nsUTF8Verifier(),
                new nsGB2312Verifier(),
                new nsGB18030Verifier(),
                new nsISO2022CNVerifier(),
                new nsHZVerifier(),
                new nsCP1252Verifier(),
                new nsUCS2BEVerifier(),
                new nsUCS2LEVerifier()
            ];
        }
        //==========================================================
        else if (currVerifierSet == nsPSMDetector.JAPANESE) {
            this.mVerifier = [
                new nsUTF8Verifier(),
                new nsSJISVerifier(),
                new nsEUCJPVerifier(),
                new nsISO2022JPVerifier(),
                new nsCP1252Verifier(),
                new nsUCS2BEVerifier(),
                new nsUCS2LEVerifier()
            ];
        }
        //==========================================================
        else if (currVerifierSet == nsPSMDetector.CHINESE) {
            this.mVerifier = [
                new nsUTF8Verifier(),
                new nsGB2312Verifier(),
                new nsGB18030Verifier(),
                new nsBIG5Verifier(),
                new nsISO2022CNVerifier(),
                new nsHZVerifier(),
                new nsEUCTWVerifier(),
                new nsCP1252Verifier(),
                new nsUCS2BEVerifier(),
                new nsUCS2LEVerifier()
            ];
            this.mStatisticsData = [
                ,
                new GB2312Statistics(),
                ,
                new Big5Statistics(),
                ,
                ,
                new EUCTWStatistics(),
                ,
                ,
            ];
        }
        //==========================================================
        else if (currVerifierSet == nsPSMDetector.ALL) {
            this.mVerifier = [
                new nsUTF8Verifier(),
                new nsSJISVerifier(),
                new nsEUCJPVerifier(),
                new nsISO2022JPVerifier(),
                new nsEUCKRVerifier(),
                new nsISO2022KRVerifier(),
                new nsBIG5Verifier(),
                new nsEUCTWVerifier(),
                new nsGB2312Verifier(),
                new nsGB18030Verifier(),
                new nsISO2022CNVerifier(),
                new nsHZVerifier(),
                new nsCP1252Verifier(),
                new nsUCS2BEVerifier(),
                new nsUCS2LEVerifier()
            ];
            this.mStatisticsData = [
                ,
                ,
                new EUCJPStatistics(),
                ,
                new EUCKRStatistics(),
                ,
                new Big5Statistics(),
                new EUCTWStatistics(),
                new GB2312Statistics(),
                ,
                ,
                ,
                ,
                ,
            ];
        }
        this.mClassRunSampler = (this.mStatisticsData != null);
        this.mClassItems = this.mVerifier ? this.mVerifier.length : 0;
    }
    public abstract Report(charset: string | undefined): void;
    public HandleData(aBuf: Int8Array, len: number): boolean {
        let i: number = 0;
        let j: number = 0;
        let b: number = 0;
        let st: number = 0;
        for (i = 0; i < len; i++) {
            b = aBuf[i];
            for (j = 0; j < this.mItems;) {
                if (this.mVerifier && this.mItemIdx) {
                    let verifier = this.mVerifier[this.mItemIdx[j]];
                    if (verifier) {
                        st = nsVerifier.getNextState(verifier, b, this.mState[j]);
                    }
                }
                if (st == nsVerifier.eItsMe) {
                    if (this.mVerifier && this.mItemIdx && this.mVerifier[this.mItemIdx[j]] && this.mVerifier[this.mItemIdx[j]]?.charset()) {
                        let charset = this.mVerifier[this.mItemIdx[j]]?.charset();
                        this.Report(charset);
                    }
                    this.mDone = true;
                    return this.mDone;
                }
                else if (st == nsVerifier.eError) {
                    this.mItems--;
                    if (j < this.mItems) {
                        this.mItemIdx[j] = this.mItemIdx[this.mItems];
                        this.mState[j] = this.mState[this.mItems];
                    }
                }
                else {
                    this.mState[j++] = st;
                }
            }
            if (this.mItems <= 1) {
                if (1 == this.mItems) {
                    if (this.mVerifier && this.mItemIdx && this.mVerifier[this.mItemIdx[0]] && this.mVerifier[this.mItemIdx[0]]?.charset()) {
                        let charset = this.mVerifier[this.mItemIdx[0]]?.charset();
                        this.Report(charset);
                    }
                }
                this.mDone = true;
                return this.mDone;
            }
            else {
                let nonUCS2Num: number = 0;
                let nonUCS2Idx: number = 0;
                for (j = 0; j < this.mItems; j++) {
                    if (this.mVerifier && (!(this.mVerifier[this.mItemIdx[j]]?.isUCS2())) &&
                        (!(this.mVerifier[this.mItemIdx[j]]?.isUCS2()))) {
                        nonUCS2Num++;
                        nonUCS2Idx = j;
                    }
                }
                if (1 == nonUCS2Num) {
                    if (this.mVerifier) {
                        if (this.mVerifier && this.mItemIdx && this.mVerifier[this.mItemIdx[nonUCS2Idx]] && this.mVerifier[this.mItemIdx[nonUCS2Idx]]?.charset()) {
                            let charset = this.mVerifier[this.mItemIdx[nonUCS2Idx]]?.charset();
                            this.Report(charset);
                        }
                    }
                    this.mDone = true;
                    return this.mDone;
                }
            }
        }
        if (this.mRunSampler)
            this.Sample(aBuf, len);
        return this.mDone;
    }
    public DataEnd(): void {
        if (this.mDone == true)
            return;
        if (this.mItems == 2) {
            if (this.mVerifier && (this.mVerifier[this.mItemIdx[0]]?.charset()) == "GB18030") {
                this.Report(this.mVerifier[this.mItemIdx[1]]?.charset());
                this.mDone = true;
            }
            else if (this.mVerifier && (this.mVerifier[this.mItemIdx[1]]?.charset()) == "GB18030") {
                this.Report(this.mVerifier[this.mItemIdx[0]]?.charset());
                this.mDone = true;
            }
        }
        if (this.mRunSampler)
            this.Sample(null, 0, true);
    }
    public Sample(aBuf: Int8Array | null, aLen: number, aLastChance?: boolean): void {
        if (aLastChance == null) {
            aLastChance = false;
        }
        let possibleCandidateNum: number = 0;
        let j: number;
        let eucNum: number = 0;
        for (j = 0; j < this.mItems; j++) {
            if (this.mStatisticsData && null != this.mStatisticsData[this.mItemIdx[j]])
                eucNum++;
            if (this.mVerifier && (!this.mVerifier[this.mItemIdx[j]]?.isUCS2()) &&
                (!(this.mVerifier[this.mItemIdx[j]]?.charset() == "GB18030")))
                possibleCandidateNum++;
        }
        this.mRunSampler = (eucNum > 1);
        if (this.mRunSampler) {
            this.mRunSampler = this.mSampler.Sample(aBuf, aLen);
            if (((aLastChance && this.mSampler.GetSomeData()) ||
                this.mSampler.EnoughData())
                && (eucNum == possibleCandidateNum)) {
                this.mSampler.CalFreq();
                let bestIdx: number = -1;
                let eucCnt: number = 0;
                let bestScore: number = 0.0;
                for (j = 0; j < this.mItems; j++) {
                    if (this.mStatisticsData && (null != this.mStatisticsData[this.mItemIdx[j]]) && this.mVerifier &&
                        (!(this.mVerifier[this.mItemIdx[j]]?.charset() == "Big5"))) {
                        if (this.mStatisticsData && this.mStatisticsData[this.mItemIdx[j]]) {
                            let firstByteFreq = this.mStatisticsData[this.mItemIdx[j]]?.mFirstByteFreq();
                            let firstByteWeight = this.mStatisticsData[this.mItemIdx[j]]?.mFirstByteWeight();
                            let secondByteFreq = this.mStatisticsData[this.mItemIdx[j]]?.mSecondByteFreq();
                            let secondByteWeight = this.mStatisticsData[this.mItemIdx[j]]?.mSecondByteWeight();
                            let score: number = this.mSampler.GetScore(firstByteFreq ? firstByteFreq : [], firstByteWeight ? firstByteWeight : 0, secondByteFreq ? secondByteFreq : [], secondByteWeight ? secondByteWeight : 0);
                            if ((0 == eucCnt++) || (bestScore > score)) {
                                bestScore = score;
                                bestIdx = j;
                            }
                        }
                    }
                }
                if (bestIdx >= 0) {
                    if (this.mVerifier) {
                        let charset = this.mVerifier[this.mItemIdx[bestIdx]];
                        if (charset) {
                            this.Report(charset.charset());
                        }
                    }
                    this.mDone = true;
                }
            }
        }
    }
    public getProbableCharsets(): Array<string> {
        if (this.mItems <= 0) {
            let nomatch: Array<string> = new Array(1);
            nomatch[0] = "nomatch";
            return nomatch;
        }
        let ret: Array<string> = new Array(this.mItems);
        for (let i = 0; i < this.mItems; i++) {
            if (this.mVerifier) {
                let tmp = this.mVerifier[this.mItemIdx[i]];
                if (tmp) {
                    ret[i] = tmp.charset();
                }
            }
        }
        return ret;
    }
}
export default nsPSMDetector;
