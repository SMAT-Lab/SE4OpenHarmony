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
import { BmpHeaderDescriptor } from './BmpHeaderDescriptor';
import Directory from '../Directory';
import { BitmapType } from './BitmapType';
import { Compression } from './Compression';
import { RenderingHalftoningAlgorithm } from './RenderingHalftoningAlgorithm';
import { ColorEncoding } from './ColorEncoding';
import { ColorSpaceType } from './ColorSpaceType';
import { RenderingIntent } from './RenderingIntent';
export class BmpHeaderDirectory extends Directory {
    public static TAG_BITMAP_TYPE = -2;
    public static TAG_HEADER_SIZE = -1;
    public static TAG_IMAGE_HEIGHT = 1;
    public static TAG_IMAGE_WIDTH = 2;
    public static TAG_COLOUR_PLANES = 3;
    public static TAG_BITS_PER_PIXEL = 4;
    public static TAG_COMPRESSION = 5;
    public static TAG_X_PIXELS_PER_METER = 6;
    public static TAG_Y_PIXELS_PER_METER = 7;
    public static TAG_PALETTE_COLOUR_COUNT = 8;
    public static TAG_IMPORTANT_COLOUR_COUNT = 9;
    public static TAG_RENDERING = 10;
    public static TAG_COLOR_ENCODING = 11;
    public static TAG_RED_MASK = 12;
    public static TAG_GREEN_MASK = 13;
    public static TAG_BLUE_MASK = 14;
    public static TAG_ALPHA_MASK = 15;
    public static TAG_COLOR_SPACE_TYPE = 16;
    public static TAG_GAMMA_RED = 17;
    public static TAG_GAMMA_GREEN = 18;
    public static TAG_GAMMA_BLUE = 19;
    public static TAG_INTENT = 20;
    public static TAG_LINKED_PROFILE = 21;
    private static _tagNameMap: Map<number, string> = new Map<number, string>()
        .set(BmpHeaderDirectory.TAG_BITMAP_TYPE, "Bitmap type")
        .set(BmpHeaderDirectory.TAG_HEADER_SIZE, "Header Size")
        .set(BmpHeaderDirectory.TAG_IMAGE_HEIGHT, "Image Height")
        .set(BmpHeaderDirectory.TAG_IMAGE_WIDTH, "Image Width")
        .set(BmpHeaderDirectory.TAG_COLOUR_PLANES, "Planes")
        .set(BmpHeaderDirectory.TAG_BITS_PER_PIXEL, "Bits Per Pixel")
        .set(BmpHeaderDirectory.TAG_COMPRESSION, "Compression")
        .set(BmpHeaderDirectory.TAG_X_PIXELS_PER_METER, "X Pixels per Meter")
        .set(BmpHeaderDirectory.TAG_Y_PIXELS_PER_METER, "Y Pixels per Meter")
        .set(BmpHeaderDirectory.TAG_PALETTE_COLOUR_COUNT, "Palette Colour Count")
        .set(BmpHeaderDirectory.TAG_IMPORTANT_COLOUR_COUNT, "Important Colour Count")
        .set(BmpHeaderDirectory.TAG_RENDERING, "Rendering")
        .set(BmpHeaderDirectory.TAG_COLOR_ENCODING, "Color Encoding")
        .set(BmpHeaderDirectory.TAG_RED_MASK, "Red Mask")
        .set(BmpHeaderDirectory.TAG_GREEN_MASK, "Green Mask")
        .set(BmpHeaderDirectory.TAG_BLUE_MASK, "Blue Mask")
        .set(BmpHeaderDirectory.TAG_ALPHA_MASK, "Alpha Mask")
        .set(BmpHeaderDirectory.TAG_COLOR_SPACE_TYPE, "Color Space Type")
        .set(BmpHeaderDirectory.TAG_GAMMA_RED, "Red Gamma Curve")
        .set(BmpHeaderDirectory.TAG_GAMMA_GREEN, "Green Gamma Curve")
        .set(BmpHeaderDirectory.TAG_GAMMA_BLUE, "Blue Gamma Curve")
        .set(BmpHeaderDirectory.TAG_INTENT, "Rendering Intent")
        .set(BmpHeaderDirectory.TAG_LINKED_PROFILE, "Linked Profile File Name");
    constructor() {
        super();
        this.setDescriptor(new BmpHeaderDescriptor(this));
    }
    public getBitmapType() {
        //返回当前类型 在type 中
        let value: number = this.getInteger(BmpHeaderDirectory.TAG_BITMAP_TYPE);
        return value == null ? null : BitmapType.typeOf(value);
    }
    public getCompression() {
        return Compression.typeOf(this);
    }
    public getRendering() {
        let value = this.getInteger(BmpHeaderDirectory.TAG_RENDERING);
        return value == null ? null : RenderingHalftoningAlgorithm.typeOf(value);
    }
    public getColorEncoding() {
        let value = this.getInteger(BmpHeaderDirectory.TAG_COLOR_ENCODING);
        return value == null ? null : ColorEncoding.typeOf(value);
    }
    public getColorSpaceType() {
        let value = this.getLongObject(BmpHeaderDirectory.TAG_COLOR_SPACE_TYPE);
        return value == null ? null : ColorSpaceType.typeOf(value);
    }
    public getRenderingIntent() {
        let value = this.getInteger(BmpHeaderDirectory.TAG_INTENT);
        return value == null ? null : RenderingIntent.typeOf(value);
    }
    public getName() {
        return "BMP Header";
    }
    protected getTagNameMap() {
        return BmpHeaderDirectory._tagNameMap;
    }
}
