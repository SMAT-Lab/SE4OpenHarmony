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

import Mp4MediaDirectory from './Mp4MediaDirectory'
import Mp4SoundDescriptor from './Mp4SoundDescriptor'

export default class Mp4SoundDirectory extends Mp4MediaDirectory{
  // Sound Sample Description Atom
    public static readonly  TAG_AUDIO_FORMAT:number                            = 301;
    public static readonly  TAG_NUMBER_OF_CHANNELS :number                     = 302;
    public static readonly  TAG_AUDIO_SAMPLE_SIZE:number                         = 303;
    public static readonly  TAG_AUDIO_SAMPLE_RATE :number                        = 304;

    public static readonly  TAG_SOUND_BALANCE :number                            = 305;
    private static readonly  tagNameMap:Map<number,string> = new Map();
    public constructor()
    {
       super()
       Mp4MediaDirectory.addMp4MediaTags(Mp4SoundDirectory.tagNameMap);
        Mp4SoundDirectory.tagNameMap.set(Mp4SoundDirectory.TAG_AUDIO_FORMAT, "Format");
        Mp4SoundDirectory.tagNameMap.set(Mp4SoundDirectory.TAG_NUMBER_OF_CHANNELS, "Number of Channels");
        Mp4SoundDirectory.tagNameMap.set(Mp4SoundDirectory.TAG_AUDIO_SAMPLE_SIZE, "Sample Size");
        Mp4SoundDirectory.tagNameMap.set(Mp4SoundDirectory.TAG_AUDIO_SAMPLE_RATE, "Sample Rate");
        Mp4SoundDirectory.tagNameMap.set(Mp4SoundDirectory.TAG_SOUND_BALANCE, "Balance");
        this.setDescriptor(new Mp4SoundDescriptor(this));
    }

    public  getName():string
    {
        return "MP4 Sound";
    }

    protected  getTagNameMap():Map<number,string>
    {
        return Mp4SoundDirectory._tagNameMap;
    }
}