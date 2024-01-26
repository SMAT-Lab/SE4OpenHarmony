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
import Directory from '../Directory'
import IcoDescriptor from './IcoDescriptor'

class IcoDirectory extends Directory {
  public static TAG_IMAGE_TYPE = 1;
  public static TAG_IMAGE_WIDTH = 2;
  public static TAG_IMAGE_HEIGHT = 3;
  public static TAG_COLOUR_PALETTE_SIZE = 4;
  public static TAG_COLOUR_PLANES = 5;
  public static TAG_CURSOR_HOTSPOT_X = 6;
  public static TAG_BITS_PER_PIXEL = 7;
  public static TAG_CURSOR_HOTSPOT_Y = 8;
  public static TAG_IMAGE_SIZE_BYTES = 9;
  public static TAG_IMAGE_OFFSET_BYTES = 10;
  public static _tagNameMap: Map<number, string> = new Map([
    [IcoDirectory.TAG_IMAGE_TYPE, "Image Type"]
    , [IcoDirectory.TAG_IMAGE_WIDTH, "Image Width"]
    , [IcoDirectory.TAG_IMAGE_HEIGHT, "Image Height"]
    , [IcoDirectory.TAG_COLOUR_PALETTE_SIZE, "Colour Palette Size"]
    , [IcoDirectory.TAG_COLOUR_PLANES, "Colour Planes"]
    , [IcoDirectory.TAG_CURSOR_HOTSPOT_X, "Hotspot X"]
    , [IcoDirectory.TAG_BITS_PER_PIXEL, "Bits Per Pixel"]
    , [IcoDirectory.TAG_CURSOR_HOTSPOT_Y, "Hotspot Y"]
    , [IcoDirectory.TAG_IMAGE_SIZE_BYTES, "Image Size Bytes"]
    , [IcoDirectory.TAG_IMAGE_OFFSET_BYTES, "Image Offset Bytes"]]);

  constructor() {
    super();
    this.setDescriptor(new IcoDescriptor(this));
  }

  public getName() {
    return "ICO";
  }

  public getTagNameMap(): Map<number, string>
  {
    return IcoDirectory._tagNameMap;
  }
}

export default IcoDirectory
