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
import PanasonicRawWbInfoDirectory from './PanasonicRawWbInfoDirectory';
import ExifDescriptorBase from './ExifDescriptorBase';

export default class PanasonicRawWbInfoDescriptor extends TagDescriptor<PanasonicRawWbInfoDirectory> {
  public constructor(directory: PanasonicRawWbInfoDirectory) {
    super(directory);
  }

  public getDescription(tagType: number): string
  {
    switch (tagType) {
      case PanasonicRawWbInfoDirectory.TagWbType1:
      case PanasonicRawWbInfoDirectory.TagWbType2:
      case PanasonicRawWbInfoDirectory.TagWbType3:
      case PanasonicRawWbInfoDirectory.TagWbType4:
      case PanasonicRawWbInfoDirectory.TagWbType5:
      case PanasonicRawWbInfoDirectory.TagWbType6:
      case PanasonicRawWbInfoDirectory.TagWbType7:
        return this.getWbTypeDescription(tagType);
      default:
        return super.getDescription(tagType);
    }
  }

  public getWbTypeDescription(tagType: number): string
  {
    let value = this._directory.getInteger(tagType);
    if (value == null)
    return null;
    return ExifDescriptorBase.getWhiteBalanceDescription(value);
  }
}