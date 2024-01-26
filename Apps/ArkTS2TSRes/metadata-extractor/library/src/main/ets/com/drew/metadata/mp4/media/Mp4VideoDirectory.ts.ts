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
import Mp4MediaDirectory from './Mp4MediaDirectory';
import Mp4VideoDescriptor from './Mp4VideoDescriptor';
export default class Mp4VideoDirectory extends Mp4MediaDirectory {
    // Video Sample Description Atom
    public static readonly TAG_VENDOR: number = 201;
    public static readonly TAG_TEMPORAL_QUALITY: number = 202;
    public static readonly TAG_SPATIAL_QUALITY: number = 203;
    public static readonly TAG_WIDTH: number = 204;
    public static readonly TAG_HEIGHT: number = 205;
    public static readonly TAG_HORIZONTAL_RESOLUTION: number = 206;
    public static readonly TAG_VERTICAL_RESOLUTION: number = 207;
    public static readonly TAG_COMPRESSOR_NAME: number = 208;
    public static readonly TAG_DEPTH: number = 209;
    public static readonly TAG_COMPRESSION_TYPE: number = 210;
    // Video Media Information Header Atom
    public static readonly TAG_GRAPHICS_MODE: number = 211;
    public static readonly TAG_OPCOLOR: number = 212;
    public static readonly TAG_COLOR_TABLE: number = 213;
    public static readonly TAG_FRAME_RATE: number = 214;
    private static readonly tagNameMap: Map<number, string> = new Map();
    public constructor() {
        super();
        Mp4VideoDirectory.addMp4MediaTags(Mp4VideoDirectory.tagNameMap);
        Mp4VideoDirectory.tagNameMap.set(Mp4VideoDirectory.TAG_VENDOR, "Vendor");
        Mp4VideoDirectory.tagNameMap.set(Mp4VideoDirectory.TAG_TEMPORAL_QUALITY, "Temporal Quality");
        Mp4VideoDirectory.tagNameMap.set(Mp4VideoDirectory.TAG_SPATIAL_QUALITY, "Spatial Quality");
        Mp4VideoDirectory.tagNameMap.set(Mp4VideoDirectory.TAG_WIDTH, "Width");
        Mp4VideoDirectory.tagNameMap.set(Mp4VideoDirectory.TAG_HEIGHT, "Height");
        Mp4VideoDirectory.tagNameMap.set(Mp4VideoDirectory.TAG_HORIZONTAL_RESOLUTION, "Horizontal Resolution");
        Mp4VideoDirectory.tagNameMap.set(Mp4VideoDirectory.TAG_VERTICAL_RESOLUTION, "Vertical Resolution");
        Mp4VideoDirectory.tagNameMap.set(Mp4VideoDirectory.TAG_COMPRESSOR_NAME, "Compressor Name");
        Mp4VideoDirectory.tagNameMap.set(Mp4VideoDirectory.TAG_DEPTH, "Depth");
        Mp4VideoDirectory.tagNameMap.set(Mp4VideoDirectory.TAG_COMPRESSION_TYPE, "Compression Type");
        Mp4VideoDirectory.tagNameMap.set(Mp4VideoDirectory.TAG_GRAPHICS_MODE, "Graphics Mode");
        Mp4VideoDirectory.tagNameMap.set(Mp4VideoDirectory.TAG_OPCOLOR, "Opcolor");
        Mp4VideoDirectory.tagNameMap.set(Mp4VideoDirectory.TAG_COLOR_TABLE, "Color Table");
        Mp4VideoDirectory.tagNameMap.set(Mp4VideoDirectory.TAG_FRAME_RATE, "Frame Rate");
        this.setDescriptor(new Mp4VideoDescriptor(this));
    }
    public getName(): string {
        return "MP4 Video";
    }
    protected getTagNameMap(): Map<number, string> {
        return Mp4VideoDirectory.tagNameMap;
    }
}
