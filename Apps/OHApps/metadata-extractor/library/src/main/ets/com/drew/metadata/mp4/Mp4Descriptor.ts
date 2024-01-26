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

import Mp4Directory from './Mp4Directory';
import TagDescriptor from '../TagDescriptor';

class Mp4Descriptor extends TagDescriptor<Mp4Directory> {
  constructor(directory: Mp4Directory) {
    super(directory);
  }

  public getDescription(tagType: number): string
  {
    switch (tagType) {
      case Mp4Directory.TAG_MAJOR_BRAND:
        return this.getMajorBrandDescription();
      case Mp4Directory.TAG_COMPATIBLE_BRANDS:
        return this.getCompatibleBrandsDescription();
      case Mp4Directory.TAG_DURATION_SECONDS:
        return this.getDurationDescription();
      default:
        return this._directory.getString(tagType);
    }
  }

  private getMajorBrandDescription(): string
  {
    let value: Int8Array = this._directory.getByteArray(Mp4Directory.TAG_MAJOR_BRAND);
    if (value == null)
    return null;
    //        return Mp4Dictionary.lookup(Mp4Directory.TAG_MAJOR_BRAND, new String(value));
    return ''
  }

  private getCompatibleBrandsDescription(): string
  {
    let values = this._directory.getStringArray(Mp4Directory.TAG_COMPATIBLE_BRANDS);
    if (values == null)
    return null;

    let compatibleBrandsValues = new Array<String>();
    for (let value of values) {
      //            let compatibleBrandsValue = Mp4Dictionary.lookup(Mp4Directory.TAG_MAJOR_BRAND, value);
      //            compatibleBrandsValues.add(compatibleBrandsValue == null ? value : compatibleBrandsValue);
    }
    return compatibleBrandsValues.toString();
  }

  private getDurationDescription(): string
  {
    let duration = this._directory.getRational(Mp4Directory.TAG_DURATION_SECONDS);
    if (duration == null)
    return null;

    let value = duration.numberValue();
    let hours = (value / (Math.pow(60, 2)));
    let minutes = ((value / (Math.pow(60, 1))) - (hours * 60));
    let seconds = Math.ceil((value / (Math.pow(60, 0))) - (minutes * 60));
    return "%1$02d:%2$02d:%3$02d".replace(/%1/, hours.toString())
      .replace(/%2/, minutes.toString())
      .replace(/%3/, seconds.toString());
  }
}

export default Mp4Descriptor