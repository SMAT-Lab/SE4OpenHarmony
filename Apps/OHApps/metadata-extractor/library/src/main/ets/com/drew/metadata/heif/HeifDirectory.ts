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

import Directory from '../Directory';
import HeifDescriptor from './HeifDescriptor';

class HeifDirectory extends Directory {
  public static readonly TAG_MAJOR_BRAND: number       = 1;
  public static readonly TAG_MINOR_VERSION: number     = 2;
  public static readonly TAG_COMPATIBLE_BRANDS: number = 3;
  public static readonly TAG_IMAGE_WIDTH: number       = 4;
  public static readonly TAG_IMAGE_HEIGHT: number      = 5;
  public static readonly TAG_IMAGE_ROTATION: number    = 6;
  public static readonly TAG_BITS_PER_CHANNEL: number  = 7;
  private static readonly _tagNameMap: Map<number, string> = new Map<number, string>()
    .set(HeifDirectory.TAG_MAJOR_BRAND, "Major Brand")
    .set(HeifDirectory.TAG_MINOR_VERSION, "Minor Version")
    .set(HeifDirectory.TAG_COMPATIBLE_BRANDS, "Compatible Brands")
    .set(HeifDirectory.TAG_IMAGE_WIDTH, "Width")
    .set(HeifDirectory.TAG_IMAGE_HEIGHT, "Height")
    .set(HeifDirectory.TAG_IMAGE_ROTATION, "Rotation")
    .set(HeifDirectory.TAG_BITS_PER_CHANNEL, "Bits Per Channel");

  public constructor() {
    super();
    this.setDescriptor(new HeifDescriptor(this));
  }

  public getName(): string {
    return "HEIF";
  }

  protected getTagNameMap(): Map<number, string> {
    return HeifDirectory._tagNameMap;
  }
}

export default HeifDirectory;