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

import { CountryCode, NumberFound, NumberFoundLegacy,
  searchNumbers,
  searchPhoneNumbersInText } from 'libphonenumber-js';

export function searchPhoneNumbersInTextTsToEts(text: string, code: CountryCode | {
  defaultCountry?: CountryCode,
  defaultCallingCode?: string
}): Array<NumberFound> {
  let tmp: Array<NumberFound> = [];
  for (const numberFoundLegacy of searchPhoneNumbersInText(text, code)) {
    tmp.push(numberFoundLegacy);
  }
  return tmp;
}

export function returnNumberFoundLegacyToEts(text: string, code?: CountryCode): Array<NumberFoundLegacy> {
  let tmp: Array<NumberFoundLegacy> = [];
  for (const numberFoundLegacy of searchNumbers(text, code)) {
    tmp.push(numberFoundLegacy);
  }
  return tmp;
}

export function returnNumberFoundToEts(text: string, options?: {
  defaultCountry?: CountryCode,
  v2: true
}): Array<NumberFound> {
  let temp: Array<NumberFound> = [];
  for (const numberFound of searchNumbers(text, options)) {
    temp.push(numberFound);
  }
  return temp;
}