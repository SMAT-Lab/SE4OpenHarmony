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
import AdobeJpegDirectory from './AdobeJpegDirectory'

export default class AdobeJpegDescriptor extends TagDescriptor<AdobeJpegDirectory> {
  public constructor(directory: AdobeJpegDirectory) {
    super(directory)
  }

  public getDescription(tagType: number): string
  {
    switch (tagType) {
      case AdobeJpegDirectory.TAG_COLOR_TRANSFORM:
        return this.getColorTransformDescription();
      case AdobeJpegDirectory.TAG_DCT_ENCODE_VERSION:
        return this.getDctEncodeVersionDescription();
      default:
        return super.getDescription(tagType);
    }
  }

  private getDctEncodeVersionDescription(): string
  {
    let value: Number = this._directory.getInteger(AdobeJpegDirectory.TAG_DCT_ENCODE_VERSION);
    return value == null
      ? null
      : value == 0x64
          ? "100"
          : value.toString();
  }

  private getColorTransformDescription(): string
  {
    return this.getIndexedDescription(AdobeJpegDirectory.TAG_COLOR_TRANSFORM, 0,
      "Unknown (RGB or CMYK)", "YCbCr", "YCCK");
  }
}