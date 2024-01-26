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

import AsYouTypeClassXts from './AsYouTypeClassTest/AsYouTypeClass.test';
import formatXts from './formatMobileNumberTest/format.test';
import formatNumberXts from './formatMobileNumberTest/formatNumber.test';
import getExampleNumberXts from './getNumberTypeTest/getExampleNumber.test';
import getNumberTypeXts from './getNumberTypeTest/getNumberType.test';
import parseXts from './parsePhoneNumberTest/parse.test';
import parseNumberXts from './parsePhoneNumberTest/parseNumber.test';
import parsePhoneNumberXts from './parsePhoneNumberTest/ParsePhoneNumber.test';
import parsePhoneNumberFromStringXts from './parsePhoneNumberTest/parsePhoneNumberFromString.test';
import parsePhoneNumberWithErrorXts from './parsePhoneNumberTest/parsePhoneNumberWithError.test';
import PhoneNumberXts from './PhoneNumberClassTest/PhoneNumberClass.test';
import findNumbersXts from './searchNumberTest/findNumbers.test';
import findPhoneNumbersInTextXts from './searchNumberTest/findPhoneNumbersInText.test';
import formatIncompletePhoneNumberXts from './searchNumberTest/formatIncompletePhoneNumber.test';
import getCountriesXts from './searchNumberTest/getCountries.test';
import parseIncompletePhoneNumberXts from './searchNumberTest/parseIncompletePhoneNumber.test';
import PhoneNumberMatcherXts from './searchNumberTest/PhoneNumberMatcherClassTest/PhoneNumberMatcher.test';
import isPossibleNumberXts from './verifyNumberValidityTest/isPossibleNumber.test';
import isPossiblePhoneNumberXts from './verifyNumberValidityTest/isPossiblePhoneNumber.test';
import isValidNumberXts from './verifyNumberValidityTest/isValidNumber.test';
import isValidNumberForRegionXts from './verifyNumberValidityTest/isValidNumberForRegion.test';
import isValidPhoneNumberXts from './verifyNumberValidityTest/isValidPhoneNumber.test';
import validatePhoneNumberLengthXts from './verifyNumberValidityTest/validatePhoneNumberLength.test';
import MetadataClassXts from './MetadataClassTest/MetadataClass.test';
import searchNumbersXts from './searchNumberTest/searchNumbers.test';
import searchPhoneNumbersInTextXts from './searchNumberTest/searchPhoneNumbersInText.test';

export default function testsuite() {
  AsYouTypeClassXts();
  parsePhoneNumberXts();
  searchPhoneNumbersInTextXts();
  parsePhoneNumberWithErrorXts();
  isValidPhoneNumberXts();
  isPossiblePhoneNumberXts();
  validatePhoneNumberLengthXts();
  parseNumberXts();
  parsePhoneNumberFromStringXts();
  formatNumberXts();
  getNumberTypeXts();
  getExampleNumberXts();
  isPossibleNumberXts();
  isValidNumberXts();
  isValidNumberForRegionXts();
  findNumbersXts();
  searchNumbersXts();
  findPhoneNumbersInTextXts();
  PhoneNumberMatcherXts();
  MetadataClassXts();
  getCountriesXts();
  formatIncompletePhoneNumberXts();
  parseIncompletePhoneNumberXts();
  PhoneNumberXts();
  parseXts();
  formatXts();
}