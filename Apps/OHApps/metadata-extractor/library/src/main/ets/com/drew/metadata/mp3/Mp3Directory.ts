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
import Mp3Descriptor from './Mp3Descriptor';

/**
 * @author Payton Garland
 */
class Mp3Directory extends Directory {
  public static readonly TAG_ID: number = 1;
  public static readonly TAG_LAYER: number = 2;
  public static readonly TAG_BITRATE: number = 3;
  public static readonly TAG_FREQUENCY: number = 4;
  public static readonly TAG_MODE: number = 5;
  public static readonly TAG_EMPHASIS: number = 6;
  public static readonly TAG_COPYRIGHT: number = 7;
  public static readonly TAG_FRAME_SIZE: number = 8;
  public static readonly _tagNameMap: Map<number, string> = new Map<number, string>()
    .set(Mp3Directory.TAG_ID, "ID")
    .set(Mp3Directory.TAG_LAYER, "Layer")
    .set(Mp3Directory.TAG_BITRATE, "Bitrate")
    .set(Mp3Directory.TAG_FREQUENCY, "Frequency")
    .set(Mp3Directory.TAG_MODE, "Mode")
    .set(Mp3Directory.TAG_EMPHASIS, "Emphasis Method")
    .set(Mp3Directory.TAG_COPYRIGHT, "Copyright")
    .set(Mp3Directory.TAG_FRAME_SIZE, "Frame Size")

  public constructor() {
    super();
    this.setDescriptor(new Mp3Descriptor(this));
  }

  public getName(): string {
    return "MP3";
  }

  protected getTagNameMap(): Map<number, string> {
    return Mp3Directory._tagNameMap;
  }
}

export default Mp3Directory;