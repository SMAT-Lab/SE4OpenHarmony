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

import { describe, it, expect } from '@ohos/hypium'
import metadata from 'libphonenumber-js/metadata.min.json'
import { Metadata } from 'libphonenumber-js/core';
import Logger from "../utils/Logger";

const Log = new Logger("LibPhoneNumber Metadata : ");

export default function MetadataClassXts() {

  describe('MetadataClassTest', () => {
    // selectNumberingPlan ()
    it("ShouldWorkWithMetadataPossibleLengths", 0, () => {
      let meta: Metadata = new Metadata(metadata);
      meta.selectNumberingPlan('US');
      let numberingPlan = meta.numberingPlan;
      if (numberingPlan != undefined) {
        expect(numberingPlan.possibleLengths())
          .assertDeepEquals([10]);
      }
    })

    it("ShouldWorkWithMetadataIDDPrefix", 0, () => {
      let meta: Metadata = new Metadata(metadata);
      meta.selectNumberingPlan('US');
      let numberingPlan = meta.numberingPlan;
      if (numberingPlan != undefined) {
        expect(numberingPlan.IDDPrefix())
          .assertEqual("011");
      }
    })

    it("ShouldWorkWithMetaDataLeadingDigits", 0, () => {
      let meta: Metadata = new Metadata(metadata);
      meta.selectNumberingPlan('US');
      let numberingPlan = meta.numberingPlan;
      if (numberingPlan != undefined) {
        expect(numberingPlan.leadingDigits())
          .assertEqual(0);
      }
    })

    it("ShouldWorkWithMetadataIDDPrefixCase1", 0, () => {
      let meta: Metadata = new Metadata(metadata);
      meta.selectNumberingPlan('AG');
      let numberingPlan = meta.numberingPlan;
      if (numberingPlan != undefined) {
        expect(numberingPlan.leadingDigits())
          .assertEqual('268');
      }
    })

    it("ShouldWorkWithMetadataIDDPrefixCase2", 0, () => {
      let meta: Metadata = new Metadata(metadata);
      meta.selectNumberingPlan('AG');
      let numberingPlan = meta.numberingPlan;
      if (numberingPlan != undefined) {
        expect(numberingPlan.IDDPrefix())
          .assertEqual('011');
      }
    })

    it("ShouldWorkWithMetadataIDDPrefixCase3", 0, () => {
      let meta: Metadata = new Metadata(metadata);
      meta.selectNumberingPlan('AF');
      let numberingPlan = meta.numberingPlan;
      if (numberingPlan != undefined) {
        const value: string | undefined = numberingPlan.leadingDigits();
        if (value != undefined) {
          return;
        } else {
          expect(value).assertUndefined();
        }
      } else {
        return;
      }
    })

    it("ShouldWorkWithMetadataIDDPrefixCase4", 0, () => {
      let meta: Metadata = new Metadata(metadata);
      meta.selectNumberingPlan('AF');
      let numberingPlan = meta.numberingPlan;
      if (numberingPlan != undefined) {
        expect(numberingPlan.IDDPrefix())
          .assertEqual("00");
      }
    })

    it("ShouldWorkWithMetadataIDDPrefixCase5", 0, () => {
      let meta: Metadata = new Metadata(metadata);
      meta.selectNumberingPlan('AF');
      let numberingPlan = meta.numberingPlan;
      if (numberingPlan != undefined) {
        expect(numberingPlan.possibleLengths())
          .assertDeepEquals([9]);
      }
    })

    it("ShouldWorkWithMetadataIDDPrefixCase6", 0, () => {
      let meta: Metadata = new Metadata(metadata);
      meta.selectNumberingPlan('CN');
      let numberingPlan = meta.numberingPlan;
      if (numberingPlan != undefined) {
        const value: string | undefined = numberingPlan.defaultIDDPrefix();
        expect(value).assertEqual('00');
      }
    })

    it("ShouldWorkWithMetadataIDDPrefixCase7", 0, () => {
      let meta: Metadata = new Metadata(metadata);
      meta.selectNumberingPlan('RU');
      let numberingPlan = meta.numberingPlan;
      if (numberingPlan != undefined) {

        expect(numberingPlan.leadingDigits())
          .assertEqual("3[04-689]|[489]");
      }
    })

    it("ShouldWorkWithMetadataIDDPrefixCase8", 0, () => {
      let meta: Metadata = new Metadata(metadata);
      meta.selectNumberingPlan('RU');
      let numberingPlan = meta.numberingPlan;
      if (numberingPlan != undefined) {
        expect(numberingPlan.IDDPrefix())
          .assertEqual("810");
      }
    })

    it("ShouldWorkWithMetadataIDDPrefixCase9", 0, () => {
      let meta: Metadata = new Metadata(metadata);
      meta.selectNumberingPlan('RU');
      let numberingPlan = meta.numberingPlan;
      if (numberingPlan != undefined) {
        expect(numberingPlan.possibleLengths())
          .assertDeepEquals([10, 14]);
      }
    })

    it("ShouldWorkWithMetadataIDDPrefixCase10", 0, () => {
      let meta: Metadata = new Metadata(metadata);
      meta.selectNumberingPlan('RU');
      let numberingPlan = meta.numberingPlan;
      if (numberingPlan != undefined) {
        const value = numberingPlan.defaultIDDPrefix();
        expect(value)
          .assertEqual("8~10");
      }
    })
  })
}