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
import { EpsDirectory } from './EpsDirectory';
import TagDescriptor from '../TagDescriptor';
export class EpsDescriptor extends TagDescriptor<EpsDirectory> {
    constructor(directory: EpsDirectory) {
        super(directory);
    }
    getDescription(tagType: number) {
        switch (tagType) {
            case EpsDirectory.TAG_IMAGE_WIDTH:
            case EpsDirectory.TAG_IMAGE_HEIGHT:
                return this.getPixelDescription(tagType);
            case EpsDirectory.TAG_TIFF_PREVIEW_SIZE:
            case EpsDirectory.TAG_TIFF_PREVIEW_OFFSET:
                return this.getByteSizeDescription(tagType);
            case EpsDirectory.TAG_COLOR_TYPE:
                return this.getColorTypeDescription();
            default:
                return this._directory.getString(tagType);
        }
    }
    public getPixelDescription(tagType: number): string {
        return this._directory.getString(tagType) + " pixels";
    }
    public getByteSizeDescription(tagType: number): string {
        return this._directory.getString(tagType) + " bytes";
    }
    getColorTypeDescription(): string {
        return this.getIndexedDescription(EpsDirectory.TAG_COLOR_TYPE, 1, "Grayscale", "Lab", "RGB", "CMYK");
    }
}
