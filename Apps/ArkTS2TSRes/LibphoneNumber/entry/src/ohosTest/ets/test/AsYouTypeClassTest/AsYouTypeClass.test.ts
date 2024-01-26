let __generate__Id: number = 0;
function generateId(): string {
    return "AsYouTypeClass.test_" + ++__generate__Id;
}
/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
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
import { describe, it, expect } from '@ohos/hypium';
import { AsYouType, CountryCode } from 'libphonenumber-js';
import Logger from "../utils/Logger";
import { PhoneNumberFormatterFactory } from './PhoneNumberFormatterFactory';
export default function AsYouTypeClassXts() {
    const Log = new Logger("LibPhoneNumber AsYouType :: ");
    let asYouTypeFactoryInstance: PhoneNumberFormatterFactory = new PhoneNumberFormatterFactory();
    describe('AsYouTypeClass', () => {
        // input()
        it('shouldUseNational_prefix_formatting_rule_01', 0, () => {
            asYouTypeFactoryInstance.getFormatter("RU").reset();
            expect(asYouTypeFactoryInstance.getFormatter("RU").input('88005553535')).assertEqual('8 (800) 555-35-35');
        });
        it("shouldUseNational_prefix_formatting_rule_02", 0, () => {
            asYouTypeFactoryInstance.getFormatter("RU").reset();
            asYouTypeFactoryInstance.getFormatter("RU").reset();
            expect(asYouTypeFactoryInstance.getFormatter("RU").input('880055535')).assertEqual('8 (800) 555-35');
        });
        it("shouldUseNational_prefix_formatting_rule_03", 0, () => {
            asYouTypeFactoryInstance.getFormatter("RU").reset();
            asYouTypeFactoryInstance.getFormatter("RU").reset();
            expect(asYouTypeFactoryInstance.getFormatter("RU").input('899955535')).assertEqual('8 (999) 555-35');
        });
        it("shouldUseNational_prefix_formatting_rule_04", 0, () => {
            asYouTypeFactoryInstance.getFormatter("CN").reset();
            expect(asYouTypeFactoryInstance.getFormatter("CN").input('18729961766')).assertEqual('187 2996 1766');
        });
        it("shouldUseNational_prefix_formatting_rule_05", 0, () => {
            asYouTypeFactoryInstance.getFormatter("CH").reset();
            expect(asYouTypeFactoryInstance.getFormatter("CH").input('044-668-1')).assertEqual('044 668 1');
        });
        // getNumber()
        it("ShouldReturnUndefinedOrPhoneNumberCase1", 0, () => {
            expect(new AsYouType().getNumber()).assertUndefined();
        });
        it("ShouldReturnUndefinedOrPhoneNumberCase2", 0, () => {
            asYouTypeFactoryInstance.getFormatter("US").reset();
            asYouTypeFactoryInstance.getFormatter("US").input("2133734");
            const asYouType: AsYouType = asYouTypeFactoryInstance.getFormatter("RU");
            const phoneNumber = asYouType.getNumber();
            if (phoneNumber != undefined) {
                expect(phoneNumber.country).assertEqual('RU');
            }
        });
        it("ShouldReturnUndefinedOrPhoneNumberCase3", 0, () => {
            const asYouType = new AsYouType("RU");
            asYouType.input("88005553535");
            const phoneNumber = asYouType.getNumber();
            if (phoneNumber != undefined) {
                expect(phoneNumber.nationalNumber).assertEqual("8005553535");
                expect((phoneNumber.number)).assertEqual("+78005553535");
            }
        });
        it("ShouldReturnUndefinedOrPhoneNumberCase4", 0, () => {
            const asYouType1 = new AsYouType({
                defaultCountry: "CN",
                defaultCallingCode: "86"
            });
            asYouType1.input("18729961778");
            const phoneNumber = asYouType1.getNumber();
            if (phoneNumber != undefined) {
                expect(phoneNumber.countryCallingCode).assertEqual("86");
                expect(phoneNumber.number).assertEqual("+8618729961778");
            }
        });
        it("ShouldReturnUndefinedOrPhoneNumberCase5", 0, () => {
            let asYouType: AsYouType = new AsYouType("US");
            asYouType.input("2");
            console.log(JSON.stringify(asYouType.getNumber()));
        });
        // getNumberValue()
        it("shouldReturnE.164number_getNumberValueCase1", 0, () => {
            asYouTypeFactoryInstance.getFormatter("US").reset();
            expect(asYouTypeFactoryInstance.getFormatter("US").getNumberValue()).assertUndefined();
        });
        it("shouldReturnE.164number_getNumberValueCase2", 0, () => {
            asYouTypeFactoryInstance.getFormatter("AG").input("");
            asYouTypeFactoryInstance.getFormatter("AG").reset();
            asYouTypeFactoryInstance.getFormatter("AG").input("");
            expect(asYouTypeFactoryInstance.getFormatter("AG").getNumberValue()).assertUndefined();
        });
        it("shouldReturnE.164number_getNumberValueCase3", 0, () => {
            asYouTypeFactoryInstance.getFormatter("US").reset();
            asYouTypeFactoryInstance.getFormatter("US").input("1");
            expect(asYouTypeFactoryInstance.getFormatter("US").getNumberValue()).assertEqual("+1");
        });
        it("shouldReturnE.164number_getNumberValueCase4", 0, () => {
            asYouTypeFactoryInstance.getFormatter("CN").reset();
            asYouTypeFactoryInstance.getFormatter("CN").input("+86");
            expect(asYouTypeFactoryInstance.getFormatter("CN").getNumberValue()).assertEqual("+86");
        });
        it("shouldReturnE.164number_getNumberValueCase5", 0, () => {
            asYouTypeFactoryInstance.getFormatter("RU").reset();
            asYouTypeFactoryInstance.getFormatter("RU").input("+7");
            expect(asYouTypeFactoryInstance.getFormatter("RU").getNumberValue()).assertEqual("+7");
        });
        // getNationalNumber()
        it("shouldDisplayNationalPhoneNumberStyle_getNationalNumberCase1", 0, () => {
            asYouTypeFactoryInstance.getFormatter("RU").reset();
            expect(asYouTypeFactoryInstance.getFormatter("RU").input("+78005553535")).assertEqual('+7 800 555 35 35');
            expect(asYouTypeFactoryInstance.getFormatter("RU").getNationalNumber()).assertEqual("8005553535");
        });
        it("shouldDisplayNationalPhoneNumberStyle_getNationalNumberCase2", 0, () => {
            asYouTypeFactoryInstance.getFormatter("CN").reset();
            expect(asYouTypeFactoryInstance.getFormatter("CN").input("+8618729881777")).assertEqual("+86 187 2988 1777");
        });
        it("shouldDisplayNationalPhoneNumberStyle_getNationalNumberCase3", 0, () => {
            asYouTypeFactoryInstance.getFormatter("AU").reset();
            expect(asYouTypeFactoryInstance.getFormatter("AU").input("+61438331999")).assertEqual("+61 438 331 999");
        });
        it("shouldDisplayNationalPhoneNumberStyle_getNationalNumberCase4", 0, () => {
            asYouTypeFactoryInstance.getFormatter("AE").reset();
            expect(asYouTypeFactoryInstance.getFormatter("AE").input("1883237839")).assertEqual("1883237839");
        });
        it("shouldDisplayNationalPhoneNumberStyle_getNationalNumberCase5", 0, () => {
            let formatter: AsYouType = new AsYouType();
            formatter.input('+8618699354418');
            expect(formatter.getNationalNumber()).assertEqual("18699354418");
        });
        // getChar()
        it("shouldFormatIndonesianNumbers_getCharsCase1", 0, () => {
            asYouTypeFactoryInstance.getFormatter("US").reset();
            expect(asYouTypeFactoryInstance.getFormatter("US").getChars()).assertEqual("");
        });
        it("shouldFormatIndonesianNumbers_getCharsCase2", 0, () => {
            asYouTypeFactoryInstance.getFormatter("ID").reset();
            asYouTypeFactoryInstance.getFormatter("ID").input('081');
            expect(asYouTypeFactoryInstance.getFormatter("ID").getChars()).assertEqual("081");
        });
        it("shouldFormatIndonesianNumbers_getCharsCase3", 0, () => {
            asYouTypeFactoryInstance.getFormatter("CN").reset();
            asYouTypeFactoryInstance.getFormatter("CN").input("+86");
            expect(asYouTypeFactoryInstance.getFormatter("CN").getChars()).assertEqual("+86");
        });
        it("shouldFormatIndonesianNumbers_getCharsCase4", 0, () => {
            asYouTypeFactoryInstance.getFormatter("AG").reset();
            asYouTypeFactoryInstance.getFormatter("AG").input('335');
            expect(asYouTypeFactoryInstance.getFormatter("AG").getChars()).assertEqual("335");
        });
        it("shouldFormatIndonesianNumbers_getCharsCase5", 0, () => {
            asYouTypeFactoryInstance.getFormatter("AL").reset();
            asYouTypeFactoryInstance.getFormatter("AL").input('+001');
            expect(asYouTypeFactoryInstance.getFormatter("AL").getChars()).assertEqual("+001");
        });
        // getTemplate()
        it("shouldReturnAPartialTemplateForCurrentValue_getTemplateCase1", 0, () => {
            asYouTypeFactoryInstance.getFormatter("US").reset();
            asYouTypeFactoryInstance.getFormatter("US").input("");
            expect(asYouTypeFactoryInstance.getFormatter("US").getTemplate()).assertEqual("");
        });
        it("shouldReturnAPartialTemplateForCurrentValue_getTemplateCase2", 0, () => {
            asYouTypeFactoryInstance.getFormatter("US").input("2");
            expect(asYouTypeFactoryInstance.getFormatter("US").getTemplate()).assertEqual("x");
        });
        it("shouldReturnAPartialTemplateForCurrentValue_getTemplateCase3", 0, () => {
            asYouTypeFactoryInstance.getFormatter("US").input("1");
            expect(asYouTypeFactoryInstance.getFormatter("US").getTemplate()).assertEqual("xx");
        });
        it("shouldReturnAPartialTemplateForCurrentValue_getTemplateCase4", 0, () => {
            asYouTypeFactoryInstance.getFormatter("US").input("3");
            expect(asYouTypeFactoryInstance.getFormatter("US").getTemplate()).assertEqual("(xxx)");
        });
        it("shouldReturnAPartialTemplateForCurrentValue_getTemplateCase5", 0, () => {
            asYouTypeFactoryInstance.getFormatter("AR").reset();
            asYouTypeFactoryInstance.getFormatter("AR").input("1");
            expect(asYouTypeFactoryInstance.getFormatter("AR").getTemplate()).assertEqual("x");
        });
        it("shouldReturnAPartialTemplateForCurrentValue_getTemplateCase6", 0, () => {
            asYouTypeFactoryInstance.getFormatter("AR").reset();
            asYouTypeFactoryInstance.getFormatter("AR").input("0");
            expect(asYouTypeFactoryInstance.getFormatter("AR").getTemplate()).assertEqual("x");
        });
        // getCallingCode ()
        it("shouldReturnsTheCallingCodePortionOfThePhoneNumber_getCallingCodeCase1", 0, () => {
            asYouTypeFactoryInstance.getFormatter("MX").reset();
            asYouTypeFactoryInstance.getFormatter("MX").input("+52(449)978-000");
            expect(asYouTypeFactoryInstance.getFormatter("MX").getCallingCode()).assertEqual("52");
        });
        it("shouldReturnsTheCallingCodePortionOfThePhoneNumber_getCallingCodeCase2", 0, () => {
            asYouTypeFactoryInstance.getFormatter("MX").reset();
            asYouTypeFactoryInstance.getFormatter("MX").input("01449978000");
            expect(asYouTypeFactoryInstance.getFormatter("MX").getCallingCode()).assertUndefined();
        });
        it("shouldReturnsTheCallingCodePortionOfThePhoneNumber_getCallingCodeCase3", 0, () => {
            asYouTypeFactoryInstance.getFormatter("MX").reset();
            asYouTypeFactoryInstance.getFormatter("MX").input("+77331234567");
            expect(asYouTypeFactoryInstance.getFormatter("MX").getCallingCode()).assertEqual("7");
        });
        it("shouldReturnsTheCallingCodePortionOfThePhoneNumber_getCallingCodeCase4", 0, () => {
            asYouTypeFactoryInstance.getFormatter("CN").reset();
            asYouTypeFactoryInstance.getFormatter("CN").input("+8618729859999");
            expect(asYouTypeFactoryInstance.getFormatter("CN").getCallingCode()).assertEqual("86");
        });
        it("shouldReturnsTheCallingCodePortionOfThePhoneNumber_getCallingCodeCase5", 0, () => {
            asYouTypeFactoryInstance.getFormatter("US").reset();
            asYouTypeFactoryInstance.getFormatter("US").input("+12345678");
            expect(asYouTypeFactoryInstance.getFormatter("US").getCallingCode()).assertEqual("1");
        });
        // getCountry()
        it("shouldDisplayCountryCodeOrUndefined_getCountryCase1", 0, () => {
            const country = new AsYouType("AG").getCountry();
            expect(country).assertUndefined();
        });
        it("shouldDisplayCountryCodeOrUndefined_getCountryCase2", 0, () => {
            expect(asYouTypeFactoryInstance.getFormatter("AO").getCountry()).assertUndefined();
        });
        it("shouldDisplayCountryCodeOrUndefined_getCountryCase3", 0, () => {
            asYouTypeFactoryInstance.getFormatter("RU").reset();
            asYouTypeFactoryInstance.getFormatter("RU").input("+78005553535");
            expect(asYouTypeFactoryInstance.getFormatter("RU").getCountry()).assertEqual("RU");
        });
        it("shouldDisplayCountryCodeOrUndefined_getCountryCase4", 0, () => {
            asYouTypeFactoryInstance.getFormatter("CN").input("18729907886");
            expect(asYouTypeFactoryInstance.getFormatter("CN").getCountry()).assertEqual("CN");
        });
        it("shouldDisplayCountryCodeOrUndefined_getCountryCase5", 0, () => {
            expect(asYouTypeFactoryInstance.getFormatter("AG").getCountry()).assertEqual("AG");
        });
        // isInternational()
        it("shouldReturnIfTheNumberIsInternational_isInternationalCase1", 0, () => {
            asYouTypeFactoryInstance.getFormatter("RU").reset();
            expect(asYouTypeFactoryInstance.getFormatter("RU").isInternational()).assertFalse();
        });
        it("shouldReturnIfTheNumberIsInternational_isInternationalCase2", 0, () => {
            asYouTypeFactoryInstance.getFormatter("RU").input("88005553535");
            expect(asYouTypeFactoryInstance.getFormatter("RU").isInternational()).assertFalse();
        });
        it("shouldReturnIfTheNumberIsInternational_isInternationalCase3", 0, () => {
            asYouTypeFactoryInstance.getFormatter("RU").reset();
            asYouTypeFactoryInstance.getFormatter("RU").input("+");
            expect(asYouTypeFactoryInstance.getFormatter("RU").isInternational()).assertTrue();
        });
        it("shouldReturnIfTheNumberIsInternational_isInternationalCase4", 0, () => {
            asYouTypeFactoryInstance.getFormatter("RU").input("78005553535");
            expect(asYouTypeFactoryInstance.getFormatter("RU").isInternational()).assertTrue();
        });
        it("shouldReturnIfTheNumberIsInternational_isInternationalCase5", 0, () => {
            asYouTypeFactoryInstance.getFormatter("CN").reset();
            asYouTypeFactoryInstance.getFormatter("CN").input("+8618765431265");
            expect(asYouTypeFactoryInstance.getFormatter("CN").isInternational()).assertTrue();
        });
        // isPossible()
        it("shouldReturnIfTheNumberIsPossible_isPossibleCase1", 0, () => {
            asYouTypeFactoryInstance.getFormatter("RU").reset();
            expect(asYouTypeFactoryInstance.getFormatter("RU").isPossible()).assertFalse();
        });
        it("shouldReturnIfTheNumberIsPossible_isPossibleCase2", 0, () => {
            asYouTypeFactoryInstance.getFormatter("RU").input("8");
            expect(asYouTypeFactoryInstance.getFormatter("RU").isPossible()).assertFalse();
        });
        it("shouldReturnIfTheNumberIsPossible_isPossibleCase3", 0, () => {
            asYouTypeFactoryInstance.getFormatter("CN").reset();
            asYouTypeFactoryInstance.getFormatter("CN").input("+8618799811755");
            expect(asYouTypeFactoryInstance.getFormatter("CN").isPossible()).assertTrue();
        });
        it("shouldReturnIfTheNumberIsPossible_isPossibleCase4", 0, () => {
            asYouTypeFactoryInstance.getFormatter("AT").input("0");
            expect(asYouTypeFactoryInstance.getFormatter("AT").isPossible()).assertFalse();
        });
        it("shouldReturnIfTheNumberIsPossible_isPossibleCase5", 0, () => {
            asYouTypeFactoryInstance.getFormatter("US").reset();
            asYouTypeFactoryInstance.getFormatter("US").input("rere5656ssaas5656");
            expect(asYouTypeFactoryInstance.getFormatter("US").isPossible()).assertFalse();
        });
        // isValid()
        it("shouldReturnIfTheNumberIsValid_isValidCase1", 0, () => {
            asYouTypeFactoryInstance.getFormatter("RU").reset();
            expect(asYouTypeFactoryInstance.getFormatter("RU").isValid()).assertFalse();
        });
        it("shouldReturnIfTheNumberIsValid_isValidCase2", 0, () => {
            asYouTypeFactoryInstance.getFormatter("RU").input("5");
            expect(asYouTypeFactoryInstance.getFormatter("RU").isValid()).assertFalse();
        });
        it("shouldReturnIfTheNumberIsValid_isValidCase3", 0, () => {
            expect(asYouTypeFactoryInstance.getFormatter("CN").isValid()).assertTrue();
        });
        it("shouldReturnIfTheNumberIsValid_isValidCase4", 0, () => {
            expect(asYouTypeFactoryInstance.getFormatter("AR").isValid()).assertFalse();
        });
        it("shouldReturnIfTheNumberIsValid_isValidCase5", 0, () => {
            expect(asYouTypeFactoryInstance.getFormatter("PM").isValid()).assertFalse();
        });
    });
}
