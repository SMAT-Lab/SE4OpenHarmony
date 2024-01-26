/*
Copyright (c) 2022 Huawei Device Co., Ltd.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import Directory from '../Directory';
import PngChunkType from '../../imaging/png/PngChunkType';
import PngDescriptor from './PngDescriptor';
class PngDirectory extends Directory {
    public static readonly TAG_IMAGE_WIDTH: number = 1;
    public static readonly TAG_IMAGE_HEIGHT: number = 2;
    public static readonly TAG_BITS_PER_SAMPLE: number = 3;
    public static readonly TAG_COLOR_TYPE: number = 4;
    public static readonly TAG_COMPRESSION_TYPE: number = 5;
    public static readonly TAG_FILTER_METHOD: number = 6;
    public static readonly TAG_INTERLACE_METHOD: number = 7;
    public static readonly TAG_PALETTE_SIZE: number = 8;
    public static readonly TAG_PALETTE_HAS_TRANSPARENCY: number = 9;
    public static readonly TAG_SRGB_RENDERING_INTENT: number = 10;
    public static readonly TAG_GAMMA: number = 11;
    public static readonly TAG_ICC_PROFILE_NAME: number = 12;
    public static readonly TAG_TEXTUAL_DATA: number = 13;
    public static readonly TAG_LAST_MODIFICATION_TIME: number = 14;
    public static readonly TAG_BACKGROUND_COLOR: number = 15;
    public static readonly TAG_PIXELS_PER_UNIT_X: number = 16;
    public static readonly TAG_PIXELS_PER_UNIT_Y: number = 17;
    public static readonly TAG_UNIT_SPECIFIER: number = 18;
    public static readonly TAG_SIGNIFICANT_BITS: number = 19;
    private static readonly _tagNameMap: Map<number, string> = new Map<number, string>()
        .set(PngDirectory.TAG_IMAGE_HEIGHT, "Image Height")
        .set(PngDirectory.TAG_IMAGE_WIDTH, "Image Width")
        .set(PngDirectory.TAG_BITS_PER_SAMPLE, "Bits Per Sample")
        .set(PngDirectory.TAG_COLOR_TYPE, "Color Type")
        .set(PngDirectory.TAG_COMPRESSION_TYPE, "Compression Type")
        .set(PngDirectory.TAG_FILTER_METHOD, "Filter Method")
        .set(PngDirectory.TAG_INTERLACE_METHOD, "Interlace Method")
        .set(PngDirectory.TAG_PALETTE_SIZE, "Palette Size")
        .set(PngDirectory.TAG_PALETTE_HAS_TRANSPARENCY, "Palette Has Transparency")
        .set(PngDirectory.TAG_SRGB_RENDERING_INTENT, "sRGB Rendering Intent")
        .set(PngDirectory.TAG_GAMMA, "Image Gamma")
        .set(PngDirectory.TAG_ICC_PROFILE_NAME, "ICC Profile Name")
        .set(PngDirectory.TAG_TEXTUAL_DATA, "Textual Data")
        .set(PngDirectory.TAG_LAST_MODIFICATION_TIME, "Last Modification Time")
        .set(PngDirectory.TAG_BACKGROUND_COLOR, "Background Color")
        .set(PngDirectory.TAG_PIXELS_PER_UNIT_X, "Pixels Per Unit X")
        .set(PngDirectory.TAG_PIXELS_PER_UNIT_Y, "Pixels Per Unit Y")
        .set(PngDirectory.TAG_UNIT_SPECIFIER, "Unit Specifier")
        .set(PngDirectory.TAG_SIGNIFICANT_BITS, "Significant Bits");
    private readonly _pngChunkType: PngChunkType;
    public constructor(pngChunkType: PngChunkType) {
        super();
        this._pngChunkType = pngChunkType;
        this.setDescriptor(new PngDescriptor(this));
    }
    public getPngChunkType(): PngChunkType {
        return this._pngChunkType;
    }
    public getName(): string {
        return "PNG-" + this._pngChunkType.getIdentifier();
    }
    protected getTagNameMap(): Map<number, string> {
        return PngDirectory._tagNameMap;
    }
}
export default PngDirectory;
