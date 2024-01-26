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
import ExifThumbnailDirectory from './ExifThumbnailDirectory';
import ExifDescriptorBase from './ExifDescriptorBase';
/**
 * Provides human-readable string representations of tag values stored in a {@link ExifThumbnailDirectory}.
 */
class ExifThumbnailDescriptor extends ExifDescriptorBase<ExifThumbnailDirectory> {
    public constructor(directory: ExifThumbnailDirectory) {
        super(directory);
    }
    public getDescription(tagType: number): string {
        switch (tagType) {
            case ExifThumbnailDirectory.TAG_THUMBNAIL_OFFSET:
                return this.getThumbnailOffsetDescription();
            case ExifThumbnailDirectory.TAG_THUMBNAIL_LENGTH:
                return this.getThumbnailLengthDescription();
            default:
                return super.getDescription(tagType);
        }
    }
    public getThumbnailLengthDescription(): string {
        let value: string = this._directory.getString(ExifThumbnailDirectory.TAG_THUMBNAIL_LENGTH);
        return value == null ? null : value + " bytes";
    }
    public getThumbnailOffsetDescription(): string {
        let value: string = this._directory.getString(ExifThumbnailDirectory.TAG_THUMBNAIL_OFFSET);
        return value == null ? null : value + " bytes";
    }
}
export default ExifThumbnailDescriptor;
