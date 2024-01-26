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
import GifImageDescriptor from './GifImageDescriptor';
class GifImageDirectory extends Directory {
    public static readonly TAG_LEFT: number = 1;
    public static readonly TAG_TOP: number = 2;
    public static readonly TAG_WIDTH: number = 3;
    public static readonly TAG_HEIGHT: number = 4;
    public static readonly TAG_HAS_LOCAL_COLOUR_TABLE: number = 5;
    public static readonly TAG_IS_INTERLACED: number = 6;
    public static readonly TAG_IS_COLOR_TABLE_SORTED: number = 7;
    public static readonly TAG_LOCAL_COLOUR_TABLE_BITS_PER_PIXEL: number = 8;
    private static readonly _tagNameMap: Map<number, string> = new Map<number, string>()
        .set(GifImageDirectory.TAG_LEFT, "Left")
        .set(GifImageDirectory.TAG_TOP, "Top")
        .set(GifImageDirectory.TAG_WIDTH, "Width")
        .set(GifImageDirectory.TAG_HEIGHT, "Height")
        .set(GifImageDirectory.TAG_HAS_LOCAL_COLOUR_TABLE, "Has Local Colour Table")
        .set(GifImageDirectory.TAG_IS_INTERLACED, "Is Interlaced")
        .set(GifImageDirectory.TAG_IS_COLOR_TABLE_SORTED, "Is Local Colour Table Sorted")
        .set(GifImageDirectory.TAG_LOCAL_COLOUR_TABLE_BITS_PER_PIXEL, "Local Colour Table Bits Per Pixel");
    public constructor() {
        super();
        this.setDescriptor(new GifImageDescriptor(this));
    }
    public getName(): string {
        return "GIF Image";
    }
    protected getTagNameMap(): Map<number, string> {
        return GifImageDirectory._tagNameMap;
    }
}
export default GifImageDirectory;
