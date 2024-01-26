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
import GifHeaderDescriptor from './GifHeaderDescriptor';
class GifHeaderDirectory extends Directory {
    public static readonly TAG_GIF_FORMAT_VERSION: number = 1;
    public static readonly TAG_IMAGE_WIDTH: number = 2;
    public static readonly TAG_IMAGE_HEIGHT: number = 3;
    public static readonly TAG_COLOR_TABLE_SIZE: number = 4;
    public static readonly TAG_IS_COLOR_TABLE_SORTED: number = 5;
    public static readonly TAG_BITS_PER_PIXEL: number = 6;
    public static readonly TAG_HAS_GLOBAL_COLOR_TABLE: number = 7;
    public static readonly TAG_TRANSPARENT_COLOR_INDEX: number = 8;
    public static readonly TAG_BACKGROUND_COLOR_INDEX: number = 8;
    public static readonly TAG_PIXEL_ASPECT_RATIO: number = 9;
    private static readonly _tagNameMap: Map<number, string> = new Map<number, string>()
        .set(GifHeaderDirectory.TAG_GIF_FORMAT_VERSION, "GIF Format Version")
        .set(GifHeaderDirectory.TAG_IMAGE_HEIGHT, "Image Height")
        .set(GifHeaderDirectory.TAG_IMAGE_WIDTH, "Image Width")
        .set(GifHeaderDirectory.TAG_COLOR_TABLE_SIZE, "Color Table Size")
        .set(GifHeaderDirectory.TAG_IS_COLOR_TABLE_SORTED, "Is Color Table Sorted")
        .set(GifHeaderDirectory.TAG_BITS_PER_PIXEL, "Bits per Pixel")
        .set(GifHeaderDirectory.TAG_HAS_GLOBAL_COLOR_TABLE, "Has Global Color Table")
        .set(GifHeaderDirectory.TAG_BACKGROUND_COLOR_INDEX, "Background Color Index")
        .set(GifHeaderDirectory.TAG_PIXEL_ASPECT_RATIO, "Pixel Aspect Ratio");
    public constructor() {
        super();
        this.setDescriptor(new GifHeaderDescriptor(this));
    }
    public getName(): string {
        return "GIF Header";
    }
    protected getTagNameMap(): Map<number, string> {
        return GifHeaderDirectory._tagNameMap;
    }
}
export default GifHeaderDirectory;
