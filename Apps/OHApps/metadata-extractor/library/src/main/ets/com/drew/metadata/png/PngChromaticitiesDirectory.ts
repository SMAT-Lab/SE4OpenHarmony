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
import TagDescriptor from '../TagDescriptor';

class PngChromaticitiesDirectory extends Directory {
  public static readonly TAG_WHITE_POINT_X: number = 1;
  public static readonly TAG_WHITE_POINT_Y: number = 2;
  public static readonly TAG_RED_X: number = 3;
  public static readonly TAG_RED_Y: number = 4;
  public static readonly TAG_GREEN_X: number = 5;
  public static readonly TAG_GREEN_Y: number = 6;
  public static readonly TAG_BLUE_X: number = 7;
  public static readonly TAG_BLUE_Y: number = 8;
  public static readonly _tagNameMap: Map<number, string> = new Map<number, string>()
    .set(PngChromaticitiesDirectory.TAG_WHITE_POINT_X, "White Point X")
    .set(PngChromaticitiesDirectory.TAG_WHITE_POINT_Y, "White Point Y")
    .set(PngChromaticitiesDirectory.TAG_RED_X, "Red X")
    .set(PngChromaticitiesDirectory.TAG_RED_Y, "Red Y")
    .set(PngChromaticitiesDirectory.TAG_GREEN_X, "Green X")
    .set(PngChromaticitiesDirectory.TAG_GREEN_Y, "Green Y")
    .set(PngChromaticitiesDirectory.TAG_BLUE_X, "Blue X")
    .set(PngChromaticitiesDirectory.TAG_BLUE_Y, "Blue Y")

  public constructor() {
    super();
    this.setDescriptor(new TagDescriptor<PngChromaticitiesDirectory>(this));
  }

  public getName(): string {
    return "PNG Chromaticities";
  }

  protected getTagNameMap(): Map<number, string> {
    return PngChromaticitiesDirectory._tagNameMap;
  }
}

export default PngChromaticitiesDirectory;