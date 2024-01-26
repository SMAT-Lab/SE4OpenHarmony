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



import Hex_Encode_DecodeTest from './hex_encode_decode.test'
import Base64Test from './base64.test'
import PvUtilsTest from './pvutils.test'
import Asn1Test from './asn1.test'
import Asn1DerTest from './asn1_der.test'
import Asn1JSTest from './asn1JS.test'
import InterfaceTime from './InterfaceTime'

export default function testsuite() {
  Hex_Encode_DecodeTest();
  Base64Test();
  PvUtilsTest();
  Asn1Test();
  Asn1DerTest();
  Asn1JSTest();
  InterfaceTime();
}