let __generate__Id: number = 0;
function generateId(): string {
    return "List.test_" + ++__generate__Id;
}
/*
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
import CachedKeyDecoderTest from './test/CachedKeyDecoder.test';
import CodecBigintTest from './test/codec-bigint.test';
import CodecFloatTest from './test/codec-float.test';
import CodecIntTest from './test/codec-int.test';
import CodecTimestampTest from './test/codec-timestamp.test';
import decodeJsfuzzTest from './test/decode.jsfuzz';
import DecodeBlobTest from './test/decode-blob.test';
import DecodeMaxLengthTest from './test/decode-max-length.test';
import DecodeArrayStreamTest from './test/decodeArrayStream.test';
import DecodeAsyncTest from './test/decodeAsync.test';
import decodeMultiTest from './test/decodeMulti.test';
import decodeMultiStreamTest from './test/decodeMultiStream.test';
import denoTest from './test/deno_test';
import edgeCasesTest from './test/edge-cases.test';
import encodeTest from './test/encode.test';
import ExtensionCodecTest from './test/ExtensionCodec.test';
import readmeTest from './test/readme.test';
import msgpackTestSuiteTest from './test/msgpack-test-suite.test';
import msgpackTestSuiteTest2 from './test/msgpack-test-suite2.test';
import msgpackExtTest from './test/msgpack-ext.test';
import prototypePollutionTest from './test/prototype-pollution.test';
import reuseInstancesTest from './test/reuse-instances.test';
export default function testsuite() {
    CachedKeyDecoderTest();
    CodecBigintTest();
    CodecFloatTest();
    CodecIntTest();
    CodecTimestampTest();
    decodeJsfuzzTest();
    DecodeBlobTest();
    DecodeMaxLengthTest();
    DecodeArrayStreamTest();
    DecodeAsyncTest();
    decodeMultiTest();
    decodeMultiStreamTest();
    denoTest();
    edgeCasesTest();
    encodeTest();
    ExtensionCodecTest();
    readmeTest();
    msgpackTestSuiteTest();
    msgpackTestSuiteTest2();
    msgpackExtTest();
    prototypePollutionTest();
    reuseInstancesTest();
}
