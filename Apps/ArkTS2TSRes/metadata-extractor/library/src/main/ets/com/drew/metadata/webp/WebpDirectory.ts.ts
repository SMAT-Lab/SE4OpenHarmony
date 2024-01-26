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
import WebpDescriptor from './WebpDescriptor';
export default class WebpDirectory extends Directory {
    public static readonly TAG_IMAGE_HEIGHT: number = 1;
    public static readonly TAG_IMAGE_WIDTH: number = 2;
    public static readonly TAG_HAS_ALPHA: number = 3;
    public static readonly TAG_IS_ANIMATION: number = 4;
    public static readonly CHUNK_VP8X: string = "VP8X";
    public static readonly CHUNK_VP8L: string = "VP8L";
    public static readonly CHUNK_VP8: string = "VP8 ";
    public static readonly CHUNK_EXIF: string = "EXIF";
    public static readonly CHUNK_ICCP: string = "ICCP";
    public static readonly CHUNK_XMP: string = "XMP ";
    public static readonly FORMAT: string = "WEBP";
    private static tagNameMap: Map<number, string> = new Map()
        .set(WebpDirectory.TAG_IMAGE_HEIGHT, "Image Height")
        .set(WebpDirectory.TAG_IMAGE_WIDTH, "Image Width")
        .set(WebpDirectory.TAG_HAS_ALPHA, "Has Alpha")
        .set(WebpDirectory.TAG_IS_ANIMATION, "Is Animation");
    public constructor() {
        super();
        this.setDescriptor(new WebpDescriptor(this));
    }
    public getName(): string {
        return "WebP";
    }
    protected getTagNameMap(): Map<number, string> {
        return WebpDirectory.tagNameMap;
    }
}
