
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

import QuickTimeDirectory from '../QuickTimeDirectory'
import QuickTimeSoundDescriptor from './QuickTimeSoundDescriptor'

export default class QuickTimeSoundDirectory extends QuickTimeDirectory {
  // Sound Sample Description Atom
  public static readonly TAG_AUDIO_FORMAT: number                            = 0x0301;
  public static readonly TAG_NUMBER_OF_CHANNELS: number                      = 0x0302;
  public static readonly TAG_AUDIO_SAMPLE_SIZE: number                       = 0x0303;
  public static readonly TAG_AUDIO_SAMPLE_RATE: number                       = 0x0304;
  public static readonly TAG_SOUND_BALANCE: number                           = 0x0305;

  public static readonly TAG_CREATION_TIME: number = 0x5001;
  public static readonly TAG_MODIFICATION_TIME: number = 0x5002;
  public static readonly TAG_DURATION: number = 0x5003;

  public static readonly _tagNameMap: Map<number, string> = new Map<number, string>([
    [QuickTimeSoundDirectory.TAG_AUDIO_FORMAT, "Format"],
    [QuickTimeSoundDirectory.TAG_NUMBER_OF_CHANNELS, "Number of Channels"],
    [QuickTimeSoundDirectory.TAG_AUDIO_SAMPLE_SIZE, "Sample Size"],
    [QuickTimeSoundDirectory.TAG_AUDIO_SAMPLE_RATE, "Sample Rate"],
    [QuickTimeSoundDirectory.TAG_SOUND_BALANCE, "Balance"],
    [QuickTimeSoundDirectory.TAG_CREATION_TIME, "Creation Time"],
    [QuickTimeSoundDirectory.TAG_MODIFICATION_TIME, "Modification Time"],
    [QuickTimeSoundDirectory.TAG_DURATION, "Duration"]
  ])

  public constructor() {
    super()
    this.setDescriptor(new QuickTimeSoundDescriptor(this));
  }




  public getName(): string {
    return "QuickTime Sound";
  }

  protected getTagNameMap(): Map<number, string> {
    return QuickTimeSoundDirectory._tagNameMap;
  }
}

