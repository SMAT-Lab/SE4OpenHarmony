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
import BasicFileEncodingDetectionTest from './BasicFileEncodingDetection.test';
import BasicStreamEncodingDetectionTest from './BasicStreamEncodingDetection.test';
import Bug8VariousFailedCharsetsTest from './Bug8VariousFailedCharsets.test';
import Bug20LatinDetectedAsMaccyrillicTest from './Bug20LatinDetectedAsMaccyrillic.test';
import GB18030SamplesTest from './GB18030Samples.test';
import GB18030SMFalsePositive from './GB18030SMFalsePositive.test';
import ShortStringTests from './ShortString.test';
import TIS620BasicTest from './TIS620Basic.test';
import PkgIntTest from './PkgInt.test';
export default function testsuite() {
    BasicFileEncodingDetectionTest();
    BasicStreamEncodingDetectionTest();
    Bug8VariousFailedCharsetsTest();
    Bug20LatinDetectedAsMaccyrillicTest();
    GB18030SamplesTest();
    GB18030SMFalsePositive();
    ShortStringTests();
    TIS620BasicTest();
    PkgIntTest();
}
