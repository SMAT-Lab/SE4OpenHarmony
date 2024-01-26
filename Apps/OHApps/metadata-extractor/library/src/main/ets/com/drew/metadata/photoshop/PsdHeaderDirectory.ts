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

import Directory from '../Directory'
import PsdHeaderDescriptor from './PsdHeaderDescriptor'

class PsdHeaderDirectory extends Directory {
  /**
   * The number of channels in the image, including any alpha channels. Supported range is 1 to 56.
   */
  public static TAG_CHANNEL_COUNT = 1;
  /**
   * The height of the image in pixels.
   */
  public static TAG_IMAGE_HEIGHT = 2;
  /**
   * The width of the image in pixels.
   */
  public static TAG_IMAGE_WIDTH = 3;
  /**
   * The number of bits per channel. Supported values are 1, 8, 16 and 32.
   */
  public static TAG_BITS_PER_CHANNEL = 4;
  /**
   * The color mode of the file. Supported values are:
   * Bitmap = 0; Grayscale = 1; Indexed = 2; RGB = 3; CMYK = 4; Multichannel = 7; Duotone = 8; Lab = 9.
   */
  public static TAG_COLOR_MODE = 5;

  public static _tagNameMap: Map<number, string> = new Map([
    [PsdHeaderDirectory.TAG_CHANNEL_COUNT, "Channel Count"],
    [PsdHeaderDirectory.TAG_IMAGE_HEIGHT, "Image Height"],
    [PsdHeaderDirectory.TAG_IMAGE_WIDTH, "Image Width"],
    [PsdHeaderDirectory.TAG_BITS_PER_CHANNEL, "Bits Per Channel"],
    [PsdHeaderDirectory.TAG_COLOR_MODE, "Color Mode"]
  ]);

  constructor() {
    super();
    this.setDescriptor(new PsdHeaderDescriptor(this));
  }

  public getName(): string {
    return "PSD Header";
  }

  public getTagNameMap(): Map<number, string> {
    return PsdHeaderDirectory._tagNameMap;
  }
}

export default PsdHeaderDirectory
