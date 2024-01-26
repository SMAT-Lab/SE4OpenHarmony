/*
* Copyright (C) 2022 Huawei Device Co., Ltd.
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
import ExifThumbnailDescriptor from './ExifThumbnailDescriptor';
import ExifDirectoryBase from './ExifDirectoryBase';
/**
 * One of several Exif directories.  Otherwise known as IFD1, this directory holds information about an embedded thumbnail image.
 *
 * @author Drew Noakes https://drewnoakes.com
 */
class ExifThumbnailDirectory extends ExifDirectoryBase {
    /**
     * The offset to thumbnail image bytes.
     */
    public static readonly TAG_THUMBNAIL_OFFSET: number = 0x0201;
    /**
     * The size of the thumbnail image data in bytes.
     */
    public static readonly TAG_THUMBNAIL_LENGTH: number = 0x0202;
    /**
     * @deprecated use {@link com.drew.metadata.exif.ExifDirectoryBase#TAG_COMPRESSION} instead.
     */
    public static readonly TAG_THUMBNAIL_COMPRESSION: number = 0x0103;
    private static readonly _tagNameMap: Map<number, string> = new Map<number, string>([
        [ExifThumbnailDirectory.TAG_THUMBNAIL_OFFSET, "Thumbnail Offset"],
        [ExifThumbnailDirectory.TAG_THUMBNAIL_LENGTH, "Thumbnail Length"]
    ]);
    public constructor() {
        super();
        ExifDirectoryBase.addExifTagNames(ExifThumbnailDirectory._tagNameMap);
        this.setDescriptor(new ExifThumbnailDescriptor(this));
    }
    public getName(): string {
        return "Exif Thumbnail";
    }
    protected getTagNameMap(): Map<number, string> {
        return ExifThumbnailDirectory._tagNameMap;
    }
}
export default ExifThumbnailDirectory;
