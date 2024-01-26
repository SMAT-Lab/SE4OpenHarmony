let __generate__Id: number = 0;
function generateId(): string {
    return "List.test_" + ++__generate__Id;
}
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
import PngTest from './PngDescriptor.test';
import AgeTest from './Age.test';
import MetadataTest from './Metadata.test';
import DirectoryTest from './Directory.test';
import JpegDirectoryTest from './JpegDirectory.test';
import JpegDescriptorTest from './JpegDescriptor.test';
import JpegComponentTest from './JpegComponent.test';
import ByteConvertTest from './ByteConvert.test';
import ByteUtilTest from './ByteUtil.test';
import SequentialAccessTest from './SequentialAccess.test';
export default function testsuite() {
    PngTest();
    AgeTest();
    MetadataTest();
    DirectoryTest();
    JpegDirectoryTest();
    JpegDescriptorTest();
    JpegComponentTest();
    ByteConvertTest();
    ByteUtilTest();
    SequentialAccessTest();
}
