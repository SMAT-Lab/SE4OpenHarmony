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
import QuickTimeDescriptor from './QuickTimeDescriptor';
export default class QuickTimeDirectory extends Directory {
    // Movie Header Atom (https://developer.apple.com/library/content/documentation/QuickTime/QTFF/QTFFChap2/qtff2.html#//apple_ref/doc/uid/TP40000939-CH204-56313)
    public static readonly TAG_CREATION_TIME: number = 0x0100;
    public static readonly TAG_MODIFICATION_TIME: number = 0x0101;
    public static readonly TAG_TIME_SCALE: number = 0x0102;
    public static readonly TAG_DURATION: number = 0x0103;
    public static readonly TAG_DURATION_SECONDS: number = 0x0104;
    public static readonly TAG_PREFERRED_RATE: number = 0x0105;
    public static readonly TAG_PREFERRED_VOLUME: number = 0x0106;
    public static readonly TAG_PREVIEW_TIME: number = 0x0107;
    public static readonly TAG_PREVIEW_DURATION: number = 0x0108;
    public static readonly TAG_POSTER_TIME: number = 0x0109;
    public static readonly TAG_SELECTION_TIME: number = 0x010A;
    public static readonly TAG_SELECTION_DURATION: number = 0x010B;
    public static readonly TAG_CURRENT_TIME: number = 0x010C;
    public static readonly TAG_NEXT_TRACK_ID: number = 0x010D;
    public static readonly TAG_ROTATION: number = 0x010E;
    public static readonly TAG_MEDIA_TIME_SCALE: number = 0x0306;
    public static readonly TAG_MAJOR_BRAND: number = 0x1000;
    public static readonly TAG_MINOR_VERSION: number = 0x1001;
    public static readonly TAG_COMPATIBLE_BRANDS: number = 0x1002;
    public static readonly TAG_CANON_THUMBNAIL_DT: number = 0x2000;
    public static readonly TAG_ADOBE_XMP: number = 0x3000;
    public static readonly _tagNameMap: Map<number, string> = new Map<number, string>([
        [QuickTimeDirectory.TAG_MAJOR_BRAND, "Major Brand"],
        [QuickTimeDirectory.TAG_MINOR_VERSION, "Minor Version"],
        [QuickTimeDirectory.TAG_COMPATIBLE_BRANDS, "Compatible Brands"],
        [QuickTimeDirectory.TAG_CREATION_TIME, "Creation Time"],
        [QuickTimeDirectory.TAG_MODIFICATION_TIME, "Modification Time"],
        [QuickTimeDirectory.TAG_TIME_SCALE, "Modification Time"],
        [QuickTimeDirectory.TAG_MODIFICATION_TIME, "Modification Time"],
        [QuickTimeDirectory.TAG_TIME_SCALE, "Media Time Scale"],
        [QuickTimeDirectory.TAG_DURATION, "Duration"],
        [QuickTimeDirectory.TAG_DURATION_SECONDS, "Duration in Seconds"],
        [QuickTimeDirectory.TAG_PREFERRED_RATE, "Preferred Rate"],
        [QuickTimeDirectory.TAG_PREFERRED_VOLUME, "Preferred Volume"],
        [QuickTimeDirectory.TAG_PREVIEW_TIME, "Preview Time"],
        [QuickTimeDirectory.TAG_PREVIEW_DURATION, "Preview Duration"],
        [QuickTimeDirectory.TAG_POSTER_TIME, "Poster Time"],
        [QuickTimeDirectory.TAG_SELECTION_TIME, "Selection Time"],
        [QuickTimeDirectory.TAG_SELECTION_DURATION, "Selection Duration"],
        [QuickTimeDirectory.TAG_CURRENT_TIME, "Current Time"],
        [QuickTimeDirectory.TAG_NEXT_TRACK_ID, "Next Track ID"],
        [QuickTimeDirectory.TAG_ROTATION, "Rotation"],
        [QuickTimeDirectory.TAG_MEDIA_TIME_SCALE, "Media Time Scale"],
        [QuickTimeDirectory.TAG_CANON_THUMBNAIL_DT, "Canon Thumbnail DateTime"],
        [QuickTimeDirectory.TAG_ADOBE_XMP, "Adobe Bridge XMP"]
    ]);
    public constructor() {
        super();
        this.setDescriptor(new QuickTimeDescriptor(this));
    }
    public getName(): string {
        return "QuickTime";
    }
    protected getTagNameMap(): Map<number, string> {
        return QuickTimeDirectory._tagNameMap;
    }
}
