let __generate__Id: number = 0;
function generateId(): string {
    return "PngDescriptor.test_" + ++__generate__Id;
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
import { PngDirectory, PngDescriptor, PngChunkType } from '@ohos/metadata-extractor';
export default function PngTest() {
    describe('PngDescriptorTest', () => {
        it('testGetColorTypeDescription', 0, () => {
            let directory: PngDirectory = new PngDirectory(PngChunkType.IHDR);
            let descriptor: PngDescriptor = new PngDescriptor(directory);
            directory.setInt(PngDirectory.TAG_COLOR_TYPE, 6);
            expect("True Color with Alpha").assertEqual(descriptor.getColorTypeDescription());
            expect("True Color with Alpha").assertEqual(directory.getDescription(PngDirectory.TAG_COLOR_TYPE));
        });
        it('testGetCompressionTypeDescription', 0, () => {
            let directory: PngDirectory = new PngDirectory(PngChunkType.IHDR);
            let descriptor: PngDescriptor = new PngDescriptor(directory);
            directory.setInt(PngDirectory.TAG_COMPRESSION_TYPE, 0);
            expect("Deflate").assertEqual(descriptor.getCompressionTypeDescription());
            expect("Deflate").assertEqual(directory.getDescription(PngDirectory.TAG_COMPRESSION_TYPE));
        });
        it('testGetColorTypeAdaptive', 0, () => {
            let directory: PngDirectory = new PngDirectory(PngChunkType.IHDR);
            let descriptor: PngDescriptor = new PngDescriptor(directory);
            directory.setInt(PngDirectory.TAG_FILTER_METHOD, 0);
            expect("Adaptive").assertEqual(descriptor.getFilterMethodDescription());
            expect("Adaptive").assertEqual(directory.getDescription(PngDirectory.TAG_FILTER_METHOD));
        });
        it('testGetInterlaceMethodDescription', 0, () => {
            let directory: PngDirectory = new PngDirectory(PngChunkType.IHDR);
            let descriptor: PngDescriptor = new PngDescriptor(directory);
            directory.setInt(PngDirectory.TAG_INTERLACE_METHOD, 1);
            expect("Adam7 Interlace").assertEqual(descriptor.getInterlaceMethodDescription());
            expect("Adam7 Interlace").assertEqual(directory.getDescription(PngDirectory.TAG_INTERLACE_METHOD));
        });
        it('testGetIsSrgbColorSpaceDescription', 0, () => {
            let directory: PngDirectory = new PngDirectory(PngChunkType.IHDR);
            let descriptor: PngDescriptor = new PngDescriptor(directory);
            directory.setInt(PngDirectory.TAG_SRGB_RENDERING_INTENT, 0);
            expect("Perceptual").assertEqual(descriptor.getIsSrgbColorSpaceDescription());
            expect("Perceptual").assertEqual(directory.getDescription(PngDirectory.TAG_SRGB_RENDERING_INTENT));
        });
        it('testGetUnitSpecifierDescription', 0, () => {
            let directory: PngDirectory = new PngDirectory(PngChunkType.IHDR);
            let descriptor: PngDescriptor = new PngDescriptor(directory);
            directory.setInt(PngDirectory.TAG_UNIT_SPECIFIER, 1);
            expect("Metres").assertEqual(descriptor.getUnitSpecifierDescription());
            expect("Metres").assertEqual(directory.getDescription(PngDirectory.TAG_UNIT_SPECIFIER));
        });
        it('testGetTextualDataDescription', 0, () => {
            let directory: PngDirectory = new PngDirectory(PngChunkType.tEXt);
            let descriptor: PngDescriptor = new PngDescriptor(directory);
            directory.setObject(PngDirectory.TAG_BACKGROUND_COLOR, Int8Array.of(52));
            expect("Palette Index 52").assertEqual(descriptor.getBackgroundColorDescription());
            expect("Palette Index 52").assertEqual(directory.getDescription(PngDirectory.TAG_BACKGROUND_COLOR));
        });
    });
}
