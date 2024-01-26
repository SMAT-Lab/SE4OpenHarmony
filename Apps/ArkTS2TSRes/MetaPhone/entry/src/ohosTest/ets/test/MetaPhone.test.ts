let __generate__Id: number = 0;
function generateId(): string {
    return "MetaPhone.test_" + ++__generate__Id;
}
/**
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { describe, expect, it } from '@ohos/hypium';
import { metaphone } from 'metaphone';
import { getKeys } from './GetForIn';
export default function metaPhoneTest() {
    describe('MetaPhoneTest', () => {
        // const own = {}.hasOwnProperty
        it('metaphone', 0, () => {
            expect(metaphone('')).assertEqual('');
            expect(metaphone('')).assertEqual('');
            expect(metaphone('')).assertEqual('');
            expect(metaphone(' f o ')).assertEqual('F');
            expect(metaphone('0f1o2')).assertEqual('F');
            expect(metaphone('0 1 2')).assertEqual('');
            expect(metaphone('Agrippa')).assertEqual('AKRP');
            expect(metaphone('wy')).assertEqual('');
            expect(metaphone('oo')).assertEqual('O');
            expect(metaphone('ee')).assertEqual('E');
            expect(metaphone('ii')).assertEqual('I');
            expect(metaphone('uu')).assertEqual('U');
            expect(metaphone('sci')).assertEqual('S');
            expect(metaphone('kool-aid')).assertEqual('KLT');
            expect(metaphone('abandonware')).assertEqual('ABNTNWR');
            expect(metaphone('hiccups')).assertEqual('HKKPS');
            expect(metaphone('knack')).assertEqual('NK');
            expect(metaphone('gnarl')).assertEqual('NRL');
            expect(metaphone('pneumatics')).assertEqual('NMTKS');
            expect(metaphone('aerial')).assertEqual('ERL');
            expect(metaphone('wrestler')).assertEqual('RSTLR');
            expect(metaphone('climb')).assertEqual('KLM');
            expect(metaphone('arithmetician')).assertEqual('AR0MTXN');
            expect(metaphone('abroach')).assertEqual('ABRX');
            expect(metaphone('discharge')).assertEqual('TSXRJ');
            expect(metaphone('vicious')).assertEqual('FSS');
            expect(metaphone('vice')).assertEqual('FS');
            expect(metaphone('conspiracy')).assertEqual('KNSPRS');
            expect(metaphone('abject')).assertEqual('ABJKT');
            expect(metaphone('abridge')).assertEqual('ABRJ');
            expect(metaphone('sedgy')).assertEqual('SJ');
            expect(metaphone('grudging')).assertEqual('KRJNK');
            expect(metaphone('abandon')).assertEqual('ABNTN');
            expect(metaphone('affright')).assertEqual('AFRFT');
            expect(metaphone('arraign')).assertEqual('ARN');
            expect(metaphone('assigned')).assertEqual('ASNT');
            expect(metaphone('agile')).assertEqual('AJL');
            expect(metaphone('allege')).assertEqual('ALJ');
            expect(metaphone('apology')).assertEqual('APLJ');
            expect(metaphone('young')).assertEqual('YNK');
            expect(metaphone('pharaoh')).assertEqual('FR');
            expect(metaphone('antick')).assertEqual('ANTK');
            expect(metaphone('alphabet')).assertEqual('ALFBT');
            expect(metaphone('aqua')).assertEqual('AK');
            expect(metaphone('abash')).assertEqual('ABX');
            expect(metaphone('Asia')).assertEqual('AX');
            expect(metaphone('decision')).assertEqual('TSXN');
            expect(metaphone('dalmatian')).assertEqual('TLMXN');
            expect(metaphone('alteration')).assertEqual('ALTRXN');
            expect(metaphone('although')).assertEqual('AL0');
            expect(metaphone('dispatch')).assertEqual('TSPX');
            expect(metaphone('above')).assertEqual('ABF');
            expect(metaphone('whale')).assertEqual('WL');
            expect(metaphone('allow')).assertEqual('AL');
            expect(metaphone('Xanthippe')).assertEqual('SN0P');
            expect(metaphone('axe')).assertEqual('AKS');
            expect(metaphone('betrays')).assertEqual('BTRS');
            expect(metaphone('amazed')).assertEqual('AMST');
            expect(metaphone('appearance')).assertEqual('APRNS');
            expect(metaphone('HICCUPS')).assertEqual(metaphone('hiccups'));
            expect(metaphone('HiCcUpS')).assertEqual(metaphone('hiccups'));
        });
        interface Fix {
            ablaze: string;
            transition: string;
            astronomical: string;
            buzzard: string;
            wonderer: string;
            district: string;
            hockey: string;
            capital: string;
            penguin: string;
            garbonzo: string;
            lightning: string;
            light: string;
        }
        let fixturedata: Fix = {
            ablaze: 'ABLS',
            transition: 'TRNSXN',
            astronomical: 'ASTRNMKL',
            buzzard: 'BSRT',
            wonderer: 'WNTRR',
            district: 'TSTRKT',
            hockey: 'HK',
            capital: 'KPTL',
            penguin: 'PNKN',
            garbonzo: 'KRBNS',
            lightning: 'LFTNNK',
            light: 'LFT'
        };
        it('Compatibility_with_Natural', 0, () => {
            /** @type {Record<string, string>} */
            const fixtures: Object = fixturedata;
            /** @type {string} */
            let objKeys: string[] = getKeys(fixtures);
            for (let i = 0; i < objKeys.length; i++) {
                let params = fixtures as Record<string, Object>;
                if ([objKeys[i]]) {
                    expect(metaphone(objKeys[i])).assertEqual(params[objKeys[i]]);
                }
            }
        });
        it('test_caverPhone_michael', 0, () => {
            expect(metaphone('michael')).assertEqual('MXL');
        });
        it('test_caverPhone_crevalle', 0, () => {
            expect(metaphone('crevalle')).assertEqual('KRFL');
        });
        it('test_caverPhone_Filipowitz', 0, () => {
            expect(metaphone('Filipowitz')).assertEqual('FLPWTS');
        });
        it('test_caverPhone_Xavier', 0, () => {
            expect(metaphone('Xavier')).assertEqual('SFR');
        });
        it('test_caverPhone_delicious', 0, () => {
            expect(metaphone('delicious')).assertEqual('TLSS');
        });
        it('test_caverPhone_acceptingness', 0, () => {
            expect(metaphone('acceptingness')).assertEqual('AKSPTNKNS');
        });
        it('test_caverPhone_allegrettos', 0, () => {
            expect(metaphone('allegrettos')).assertEqual('ALKRTS');
        });
    });
}
