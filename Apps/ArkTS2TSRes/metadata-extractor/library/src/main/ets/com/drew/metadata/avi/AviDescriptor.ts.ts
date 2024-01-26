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
import AviDirectory from './AviDirectory';
import TagDescriptor from '../TagDescriptor';
class AviDescriptor extends TagDescriptor<AviDirectory> {
    public constructor(directory: AviDirectory) {
        super(directory);
    }
    public getDescription(tagType: number): string {
        switch (tagType) {
            case AviDirectory.TAG_WIDTH:
            case AviDirectory.TAG_HEIGHT:
                return this.getSizeDescription(tagType);
        }
        return super.getDescription(tagType);
    }
    public getSizeDescription(tagType: number): string {
        return this._directory.getString(tagType) + " pixels";
    }
}
export default AviDescriptor;
