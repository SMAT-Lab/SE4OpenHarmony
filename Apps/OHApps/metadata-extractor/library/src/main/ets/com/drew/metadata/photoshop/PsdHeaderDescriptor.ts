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

import PsdHeaderDirectory from './PsdHeaderDirectory';
import TagDescriptor from '../TagDescriptor';

class PsdHeaderDescriptor extends TagDescriptor<PsdHeaderDirectory> {
  constructor(directory: PsdHeaderDirectory) {
    super(directory);
  }

  public getDescription(tagType: number): string {
    switch (tagType) {
      case PsdHeaderDirectory.TAG_CHANNEL_COUNT:
        return this.getChannelCountDescription();
      case PsdHeaderDirectory.TAG_BITS_PER_CHANNEL:
        return this.getBitsPerChannelDescription();
      case PsdHeaderDirectory.TAG_COLOR_MODE:
        return this.getColorModeDescription();
      case PsdHeaderDirectory.TAG_IMAGE_HEIGHT:
        return this.getImageHeightDescription();
      case PsdHeaderDirectory.TAG_IMAGE_WIDTH:
        return this.getImageWidthDescription();
      default:
        return super.getDescription(tagType);
    }
  }

  public getChannelCountDescription(): string {
    // Supported range is 1 to 56.
    let value =this. _directory.getInteger(PsdHeaderDirectory.TAG_CHANNEL_COUNT);
    if (value == null) {
      return null;
    }
    return value + " channel" + (value == 1 ? "" : "s");
  }

  public getBitsPerChannelDescription(): string {
    // Supported values are 1, 8, 16 and 32.
    let value = this._directory.getInteger(PsdHeaderDirectory.TAG_BITS_PER_CHANNEL);
    if (value == null) {
      return null;
    }
    return value + " bit" + (value == 1 ? "" : "s") + " per channel";
  }

  public getColorModeDescription(): string {
    return this.getIndexedDescription(PsdHeaderDirectory.TAG_COLOR_MODE,
      "Bitmap",
      "Grayscale",
      "Indexed",
      "RGB",
      "CMYK",
      null,
      null,
      "Multichannel",
      "Duotone",
      "Lab");
  }

  public getImageHeightDescription(): string {
    let value = this._directory.getInteger(PsdHeaderDirectory.TAG_IMAGE_HEIGHT);
    if (value == null) {
      return null;
    }
    return value + " pixel" + (value == 1 ? "" : "s");
  }

  public getImageWidthDescription(): string {
    try {
      let value = this._directory.getInteger(PsdHeaderDirectory.TAG_IMAGE_WIDTH);
      if (value == null) {
        return null;
      }
      return value + " pixel" + (value == 1 ? "" : "s");
    } catch (e) {
       return null;
    }
  }
}

export default PsdHeaderDescriptor
