let __generate__Id: number = 0;
function generateId(): string {
    return "JpegDescriptor.test_" + ++__generate__Id;
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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import { JpegDescriptor, JpegDirectory, JpegComponent } from '@ohos/metadata-extractor';
let _directory: JpegDirectory;
let _descriptor: JpegDescriptor;
export default function JpegDescriptorTest() {
    describe('JpegDescriptorTest', () => {
        beforeAll(() => {
            _directory = new JpegDirectory();
            _descriptor = new JpegDescriptor(_directory);
        });
        it('testGetImageWidthDescription', 0, () => {
            _directory.setInt(JpegDirectory.TAG_IMAGE_WIDTH, 123);
            expect("123 pixels").assertEqual(_descriptor.getImageWidthDescription());
            expect("123 pixels").assertEqual(_directory.getDescription(JpegDirectory.TAG_IMAGE_WIDTH));
        });
        it('testGetImageHeightDescription', 0, () => {
            _directory.setInt(JpegDirectory.TAG_IMAGE_HEIGHT, 123);
            expect("123 pixels").assertEqual(_descriptor.getImageHeightDescription());
            expect("123 pixels").assertEqual(_directory.getDescription(JpegDirectory.TAG_IMAGE_HEIGHT));
        });
        it('testGetDataPrecisionDescription', 0, () => {
            _directory.setInt(JpegDirectory.TAG_DATA_PRECISION, 8);
            expect("8 bits").assertEqual(_descriptor.getDataPrecisionDescription());
            expect("8 bits").assertEqual(_directory.getDescription(JpegDirectory.TAG_DATA_PRECISION));
        });
        it('testGetComponentDescription', 0, () => {
            let component1: JpegComponent = new JpegComponent(1, 0x22, 0);
            _directory.setObject(JpegDirectory.TAG_COMPONENT_DATA_1, component1);
            expect("Y component: Quantization table 0, Sampling factors 2 horiz, 2 vert").assertEqual(_directory.getDescription(JpegDirectory.TAG_COMPONENT_DATA_1));
            expect("Y component: Quantization table 0, Sampling factors 2 horiz, 2 vert").assertEqual(_descriptor.getComponentDataDescription(0));
        });
    });
}
