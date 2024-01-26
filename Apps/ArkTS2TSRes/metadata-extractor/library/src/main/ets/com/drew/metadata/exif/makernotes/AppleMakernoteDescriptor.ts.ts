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
import TagDescriptor from '../../TagDescriptor';
import AppleMakernoteDirectory from './AppleMakernoteDirectory';
export default class AppleMakernoteDescriptor extends TagDescriptor<AppleMakernoteDirectory> {
    public constructor(directory: AppleMakernoteDirectory) {
        super(directory);
    }
    public getDescription(tagType: number): string {
        switch (tagType) {
            case AppleMakernoteDirectory.TAG_HDR_IMAGE_TYPE:
                return this.getHdrImageTypeDescription();
            case AppleMakernoteDirectory.TAG_ACCELERATION_VECTOR:
                return this.getAccelerationVectorDescription();
            default:
                return super.getDescription(tagType);
        }
    }
    public getHdrImageTypeDescription(): string {
        return this.getIndexedDescription(AppleMakernoteDirectory.TAG_HDR_IMAGE_TYPE, 3, "HDR Image", "Original Image");
    }
    public getAccelerationVectorDescription(): string {
        let values = this._directory.getRationalArray(AppleMakernoteDirectory.TAG_ACCELERATION_VECTOR);
        if (values == null || values.length != 3)
            return null;
        return values[0].getAbsolute().numberValue() + (values[0].isPositive() ? "left" : "right") +
            values[1].getAbsolute().numberValue() + (values[1].isPositive() ? "down" : "up") +
            values[2].getAbsolute().numberValue() + (values[2].isPositive() ? "forward" : "backward");
    }
}
