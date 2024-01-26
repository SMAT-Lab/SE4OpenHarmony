/*
* Copyright (C) 2023 Huawei Device Co., Ltd.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import avSession from '@ohos.multimedia.avsession';

export default class MediaData {
  queueItemDescFirst: avSession.AVMediaDescription = {
    assetId: '001',
    title: 'First music',
    subtitle: 'music_sub_name',
    description: 'music_description',
    mediaImage: 'http://www.xxx.com',
    extras: {
      'extras': 'any'
    }
  };
  queueItemFirst: avSession.AVQueueItem = {
    itemId: 0,
    description: this.queueItemDescFirst
  };
  queueItemDescSecond: avSession.AVMediaDescription = {
    assetId: '002',
    title: 'Second music',
    subtitle: 'music_sub_name',
    description: 'music_description',
    mediaImage: 'http://www.xxx.com',
    extras: {
      'extras': 'any'
    }
  };
  queueItemSecond: avSession.AVQueueItem = {
    itemId: 1,
    description: this.queueItemDescSecond
  };
  queueItemDescThird: avSession.AVMediaDescription = {
    assetId: '003',
    title: 'Third music',
    subtitle: 'music_sub_name',
    description: 'music_description',
    mediaImage: 'http://www.xxx.com',
    extras: {
      'extras': 'any'
    }
  };
  queueItemThird: avSession.AVQueueItem = {
    itemId: 2,
    description: this.queueItemDescThird
  };
  lyricsForDemo: Array<string> = [
    'This is the first line of the lyrics',
    'This is the second line of the lyrics',
    'This is the third line of the lyrics',
    'This is the fourth line of the lyrics',
    'This is the fifth line of the lyrics',
    'This is the sixth line of the lyrics',
    'This is the seventh line of the lyrics',
    'This is the eighth line of the lyrics',
    'This is the ninth line of the lyrics',
    'This is the tenth line of the lyrics',
    'This is the eleventh line of the lyrics',
    'This is the twelfth line of the lyrics',
    'This is the thirteenth line of the lyrics',
    'This is the fourteenth line of the lyrics',
    'This is the fifteenth line of the lyrics',
    'This is the sixteenth line of the lyrics',
    'This is the seventeenth line of the lyrics',
    'This is the eighteenth line of the lyrics',
    'This is the nineteenth line of the lyrics',
    'This is the twentieth line of the lyrics',
    'This is the last line of the lyrics',
  ]
  avMetadataFirst: avSession.AVMetadata = {
    assetId: '0',
    title: this.queueItemDescFirst.title,
    artist: 'First artist',
    lyric: JSON.stringify(this.lyricsForDemo)
  }
  avMetadataSecond: avSession.AVMetadata = {
    assetId: '1',
    title: this.queueItemDescSecond.title,
    artist: 'Second artist',
    lyric: JSON.stringify(this.lyricsForDemo)
  }
  avMetadataThird: avSession.AVMetadata = {
    assetId: '2',
    title: this.queueItemDescThird.title,
    artist: 'Third artist',
    lyric: JSON.stringify(this.lyricsForDemo)
  }
  avMetadataList: Array<avSession.AVMetadata> = [this.avMetadataFirst, this.avMetadataSecond, this.avMetadataThird];
}
