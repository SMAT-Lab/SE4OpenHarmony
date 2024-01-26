/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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

import sim from '@ohos.telephony.sim';
import I18n from '@ohos.i18n';
import { Callback } from "./basic";

export class CountryUtils {

    private static countryCodeMap;

    public static getCountryCodeBySim( callback: Callback<string>) {
        sim.getISOCountryCodeForSim(0, (err, data) => {
            callback(err.message, this.getCountryCode(data))
        });
    }

    public static getCountryCodeByLanguage(): string {
        try {
            let systemRegion = I18n.System.getSystemRegion(); // 获取系统当前地区设置
            return this.getCountryCode(systemRegion)
        } catch (error) {
            console.error(`call System.getSystemLanguage failed, error code: ${error.code}, message: ${error.message}.`);
        }
    }

    public static getCountryCode(ISOCode: string): string {
        return this.getCountryCodeFromMap().get(ISOCode)
    }

    public static getCountryCodeFromMap(): Map<string, string> {
        if (this.countryCodeMap == null) {
            this.countryCodeMap = new Map();
            this.countryCodeMap.set("AL", "+355");
            this.countryCodeMap.set("DZ", "+213");
            this.countryCodeMap.set("AF", "+93");
            this.countryCodeMap.set("AR", "+54");
            this.countryCodeMap.set("AE", "+971");
            this.countryCodeMap.set("AW", "+297");
            this.countryCodeMap.set("OM", "+968");
            this.countryCodeMap.set("AZ", "+994");
            this.countryCodeMap.set("AC", "+247");
            this.countryCodeMap.set("EG", "+20");
            this.countryCodeMap.set("ET", "+251");
            this.countryCodeMap.set("IE", "+353");
            this.countryCodeMap.set("EE", "+372");
            this.countryCodeMap.set("AD", "+376");
            this.countryCodeMap.set("AO", "+244");
            this.countryCodeMap.set("AI", "+1");
            this.countryCodeMap.set("AG", "+1");
            this.countryCodeMap.set("AT", "+43");
            this.countryCodeMap.set("AX", "+358");
            this.countryCodeMap.set("AU", "+61");
            this.countryCodeMap.set("BB", "+1");
            this.countryCodeMap.set("PG", "+675");
            this.countryCodeMap.set("BS", "+1");
            this.countryCodeMap.set("PK", "+92");
            this.countryCodeMap.set("PY", "+595");
            this.countryCodeMap.set("PS", "+970");
            this.countryCodeMap.set("BH", "+973");
            this.countryCodeMap.set("PA", "+507");
            this.countryCodeMap.set("BR", "+55");
            this.countryCodeMap.set("BY", "+375");
            this.countryCodeMap.set("BM", "+1");
            this.countryCodeMap.set("BG", "+359");
            this.countryCodeMap.set("MP", "+1");
            this.countryCodeMap.set("BJ", "+229");
            this.countryCodeMap.set("BE", "+32");
            this.countryCodeMap.set("IS", "+354");
            this.countryCodeMap.set("PR", "+1");
            this.countryCodeMap.set("PL", "+48");
            this.countryCodeMap.set("BA", "+387");
            this.countryCodeMap.set("BO", "+591");
            this.countryCodeMap.set("BZ", "+501");
            this.countryCodeMap.set("BW", "+267");
            this.countryCodeMap.set("BT", "+975");
            this.countryCodeMap.set("BF", "+226");
            this.countryCodeMap.set("BI", "+257");
            this.countryCodeMap.set("KP", "+850");
            this.countryCodeMap.set("GQ", "+240");
            this.countryCodeMap.set("DK", "+45");
            this.countryCodeMap.set("DE", "+49");
            this.countryCodeMap.set("TL", "+670");
            this.countryCodeMap.set("TG", "+228");
            this.countryCodeMap.set("DO", "+1");
            this.countryCodeMap.set("DM", "+1");
            this.countryCodeMap.set("RU", "+7");
            this.countryCodeMap.set("EC", "+593");
            this.countryCodeMap.set("ER", "+291");
            this.countryCodeMap.set("FR", "+33");
            this.countryCodeMap.set("FO", "+298");
            this.countryCodeMap.set("PF", "+689");
            this.countryCodeMap.set("GF", "+594");
            this.countryCodeMap.set("VA", "+39");
            this.countryCodeMap.set("PH", "+63");
            this.countryCodeMap.set("FJ", "+679");
            this.countryCodeMap.set("FI", "+358");
            this.countryCodeMap.set("CV", "+238");
            this.countryCodeMap.set("FK", "+500");
            this.countryCodeMap.set("GM", "+220");
            this.countryCodeMap.set("CG", "+242");
            this.countryCodeMap.set("CD", "+243");
            this.countryCodeMap.set("CO", "+57");
            this.countryCodeMap.set("CR", "+506");
            this.countryCodeMap.set("GG", "+44");
            this.countryCodeMap.set("GD", "+1");
            this.countryCodeMap.set("GL", "+299");
            this.countryCodeMap.set("GE", "+995");
            this.countryCodeMap.set("CU", "+53");
            this.countryCodeMap.set("GP", "+590");
            this.countryCodeMap.set("GU", "+1");
            this.countryCodeMap.set("GY", "+592");
            this.countryCodeMap.set("KZ", "+7");
            this.countryCodeMap.set("HT", "+509");
            this.countryCodeMap.set("KR", "+82");
            this.countryCodeMap.set("NL", "+31");
            this.countryCodeMap.set("BQ", "+599");
            this.countryCodeMap.set("SX", "+1");
            this.countryCodeMap.set("ME", "+382");
            this.countryCodeMap.set("HN", "+504");
            this.countryCodeMap.set("KI", "+686");
            this.countryCodeMap.set("DJ", "+253");
            this.countryCodeMap.set("KG", "+996");
            this.countryCodeMap.set("GN", "+224");
            this.countryCodeMap.set("GW", "+245");
            this.countryCodeMap.set("CA", "+1");
            this.countryCodeMap.set("GH", "+233");
            this.countryCodeMap.set("GA", "+241");
            this.countryCodeMap.set("KH", "+855");
            this.countryCodeMap.set("CZ", "+420");
            this.countryCodeMap.set("ZW", "+263");
            this.countryCodeMap.set("CM", "+237");
            this.countryCodeMap.set("QA", "+974");
            this.countryCodeMap.set("KY", "+1");
            this.countryCodeMap.set("CC", "+61");
            this.countryCodeMap.set("KM", "+269");
            this.countryCodeMap.set("XK", "+383");
            this.countryCodeMap.set("CI", "+225");
            this.countryCodeMap.set("KW", "+965");
            this.countryCodeMap.set("HR", "+385");
            this.countryCodeMap.set("KE", "+254");
            this.countryCodeMap.set("CK", "+682");
            this.countryCodeMap.set("CW", "+599");
            this.countryCodeMap.set("LV", "+371");
            this.countryCodeMap.set("LS", "+266");
            this.countryCodeMap.set("LA", "+856");
            this.countryCodeMap.set("LB", "+961");
            this.countryCodeMap.set("LT", "+370");
            this.countryCodeMap.set("LR", "+231");
            this.countryCodeMap.set("LY", "+218");
            this.countryCodeMap.set("LI", "+423");
            this.countryCodeMap.set("RE", "+262");
            this.countryCodeMap.set("LU", "+352");
            this.countryCodeMap.set("RW", "+250");
            this.countryCodeMap.set("RO", "+40");
            this.countryCodeMap.set("MG", "+261");
            this.countryCodeMap.set("IM", "+44");
            this.countryCodeMap.set("MV", "+960");
            this.countryCodeMap.set("MT", "+356");
            this.countryCodeMap.set("MW", "+265");
            this.countryCodeMap.set("MY", "+60");
            this.countryCodeMap.set("ML", "+223");
            this.countryCodeMap.set("MK", "+389");
            this.countryCodeMap.set("MH", "+692");
            this.countryCodeMap.set("MQ", "+596");
            this.countryCodeMap.set("YT", "+262");
            this.countryCodeMap.set("MU", "+230");
            this.countryCodeMap.set("MR", "+222");
            this.countryCodeMap.set("US", "+1");
            this.countryCodeMap.set("AS", "+1");
            this.countryCodeMap.set("VI", "+1");
            this.countryCodeMap.set("MN", "+976");
            this.countryCodeMap.set("MS", "+1");
            this.countryCodeMap.set("BD", "+880");
            this.countryCodeMap.set("PE", "+51");
            this.countryCodeMap.set("FM", "+691");
            this.countryCodeMap.set("MM", "+95");
            this.countryCodeMap.set("MD", "+373");
            this.countryCodeMap.set("MA", "+212");
            this.countryCodeMap.set("MC", "+377");
            this.countryCodeMap.set("MZ", "+258");
            this.countryCodeMap.set("MX", "+52");
            this.countryCodeMap.set("NA", "+264");
            this.countryCodeMap.set("ZA", "+27");
            this.countryCodeMap.set("SS", "+211");
            this.countryCodeMap.set("NR", "+674");
            this.countryCodeMap.set("NI", "+505");
            this.countryCodeMap.set("NP", "+977");
            this.countryCodeMap.set("NE", "+227");
            this.countryCodeMap.set("NG", "+234");
            this.countryCodeMap.set("NU", "+683");
            this.countryCodeMap.set("NO", "+47");
            this.countryCodeMap.set("NF", "+672");
            this.countryCodeMap.set("PW", "+680");
            this.countryCodeMap.set("PT", "+351");
            this.countryCodeMap.set("JP", "+81");
            this.countryCodeMap.set("SE", "+46");
            this.countryCodeMap.set("CH", "+41");
            this.countryCodeMap.set("SV", "+503");
            this.countryCodeMap.set("WS", "+685");
            this.countryCodeMap.set("RS", "+381");
            this.countryCodeMap.set("SL", "+232");
            this.countryCodeMap.set("SN", "+221");
            this.countryCodeMap.set("CY", "+357");
            this.countryCodeMap.set("SC", "+248");
            this.countryCodeMap.set("SA", "+966");
            this.countryCodeMap.set("BL", "+590");
            this.countryCodeMap.set("CX", "+61");
            this.countryCodeMap.set("ST", "+239");
            this.countryCodeMap.set("SH", "+290");
            this.countryCodeMap.set("PN", "+870");
            this.countryCodeMap.set("KN", "+1");
            this.countryCodeMap.set("LC", "+1");
            this.countryCodeMap.set("MF", "+590");
            this.countryCodeMap.set("SM", "+378");
            this.countryCodeMap.set("PM", "+508");
            this.countryCodeMap.set("VC", "+1");
            this.countryCodeMap.set("LK", "+94");
            this.countryCodeMap.set("SK", "+421");
            this.countryCodeMap.set("SI", "+386");
            this.countryCodeMap.set("SJ", "+47");
            this.countryCodeMap.set("SZ", "+268");
            this.countryCodeMap.set("SD", "+249");
            this.countryCodeMap.set("SR", "+597");
            this.countryCodeMap.set("SB", "+677");
            this.countryCodeMap.set("SO", "+252");
            this.countryCodeMap.set("TJ", "+992");
            this.countryCodeMap.set("TH", "+66");
            this.countryCodeMap.set("TZ", "+255");
            this.countryCodeMap.set("TO", "+676");
            this.countryCodeMap.set("TC", "+1");
            this.countryCodeMap.set("TA", "+290");
            this.countryCodeMap.set("TT", "+1");
            this.countryCodeMap.set("TN", "+216");
            this.countryCodeMap.set("TV", "+688");
            this.countryCodeMap.set("TR", "+90");
            this.countryCodeMap.set("TM", "+993");
            this.countryCodeMap.set("TK", "+690");
            this.countryCodeMap.set("WF", "+681");
            this.countryCodeMap.set("VU", "+678");
            this.countryCodeMap.set("GT", "+502");
            this.countryCodeMap.set("VE", "+58");
            this.countryCodeMap.set("BN", "+673");
            this.countryCodeMap.set("UG", "+256");
            this.countryCodeMap.set("UA", "+380");
            this.countryCodeMap.set("UY", "+598");
            this.countryCodeMap.set("UZ", "+998");
            this.countryCodeMap.set("GR", "+30");
            this.countryCodeMap.set("ES", "+34");
            this.countryCodeMap.set("EH", "+212");
            this.countryCodeMap.set("SG", "+65");
            this.countryCodeMap.set("NC", "+687");
            this.countryCodeMap.set("NZ", "+64");
            this.countryCodeMap.set("HU", "+36");
            this.countryCodeMap.set("SY", "+963");
            this.countryCodeMap.set("JM", "+1");
            this.countryCodeMap.set("AM", "+374");
            this.countryCodeMap.set("YE", "+967");
            this.countryCodeMap.set("IQ", "+964");
            this.countryCodeMap.set("UM", "+1");
            this.countryCodeMap.set("IR", "+98");
            this.countryCodeMap.set("IL", "+972");
            this.countryCodeMap.set("IT", "+39");
            this.countryCodeMap.set("IN", "+91");
            this.countryCodeMap.set("ID", "+62");
            this.countryCodeMap.set("GB", "+44");
            this.countryCodeMap.set("VG", "+1");
            this.countryCodeMap.set("IO", "+246");
            this.countryCodeMap.set("JO", "+962");
            this.countryCodeMap.set("VN", "+84");
            this.countryCodeMap.set("ZM", "+260");
            this.countryCodeMap.set("JE", "+44");
            this.countryCodeMap.set("TD", "+235");
            this.countryCodeMap.set("GI", "+350");
            this.countryCodeMap.set("CL", "+56");
            this.countryCodeMap.set("CF", "+236");
            this.countryCodeMap.set("CN", "+86");
            this.countryCodeMap.set("MO", "+853");
            this.countryCodeMap.set("TW", "+886");
            this.countryCodeMap.set("HK", "+852");
        }
        return this.countryCodeMap;
    }
}
