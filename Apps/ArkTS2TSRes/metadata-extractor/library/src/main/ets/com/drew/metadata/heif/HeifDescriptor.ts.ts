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
import TagDescriptor from '../TagDescriptor';
import HeifDirectory from './HeifDirectory';
class HeifDescriptor extends TagDescriptor<HeifDirectory> {
    public constructor(directory: HeifDirectory) {
        super(directory);
    }
    public getDescription(tagType: number): string {
        switch (tagType) {
            case HeifDirectory.TAG_IMAGE_WIDTH:
            case HeifDirectory.TAG_IMAGE_HEIGHT:
                return this.getPixelDescription(tagType);
            case HeifDirectory.TAG_IMAGE_ROTATION:
                return this.getRotationDescription(tagType);
            default:
                return super.getDescription(tagType);
        }
    }
    public getPixelDescription(tagType: number): string {
        return this._directory.getString(tagType) + " pixels";
    }
    public getRotationDescription(tagType: number): string {
        return (this._directory.getInteger(tagType) * 90) + " degrees";
    }
}
export default HeifDescriptor;
