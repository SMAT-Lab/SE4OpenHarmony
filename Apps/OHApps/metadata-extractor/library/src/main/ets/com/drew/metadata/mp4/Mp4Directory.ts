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

import Mp4Descriptor from './Mp4Descriptor';
import Directory from '../Directory';

class Mp4Directory extends Directory {
  public static readonly TAG_CREATION_TIME: number                          = 0x0100;
  public static readonly TAG_MODIFICATION_TIME: number                       = 0x0101;
  public static readonly TAG_TIME_SCALE: number                    = 0x0102;
  public static readonly TAG_DURATION: number                             = 0x0103;
  public static readonly TAG_DURATION_SECONDS: number                      = 0x0104;
  public static readonly TAG_PREFERRED_RATE: number                         = 0x0105;
  public static readonly TAG_PREFERRED_VOLUME: number                       = 0x0106;
  public static readonly TAG_PREVIEW_TIME: number                         = 0x0108;
  public static readonly TAG_PREVIEW_DURATION: number                       = 0x0109;
  public static readonly TAG_POSTER_TIME: number                        = 0x010A;
  public static readonly TAG_SELECTION_TIME: number                         = 0x010B;
  public static readonly TAG_SELECTION_DURATION: number                   = 0x010C;
  public static readonly TAG_CURRENT_TIME: number                          = 0x010D;
  public static readonly TAG_NEXT_TRACK_ID: number                          = 0x010E;
  public static readonly TAG_TRANSFORMATION_MATRIX: number                  = 0x010F;
  public static readonly TAG_ROTATION: number                               = 0x0200;
  public static readonly TAG_LATITUDE: number                               = 0x2001;
  public static readonly TAG_LONGITUDE: number                               = 0x2002;
  public static readonly TAG_MEDIA_TIME_SCALE: number                        = 0x0306;
  public static readonly TAG_MAJOR_BRAND: number                             = 1;
  public static readonly TAG_MINOR_VERSION: number                          = 2;
  public static readonly TAG_COMPATIBLE_BRANDS: number                       = 3;
  public static readonly _tagNameMap= new Map<number, string>([
    [Mp4Directory.TAG_MAJOR_BRAND, "Major Brand"],
    [Mp4Directory.TAG_MINOR_VERSION, "Minor Version"],
    [Mp4Directory.TAG_COMPATIBLE_BRANDS, "Compatible Brands"],
    [Mp4Directory.TAG_CREATION_TIME, "Creation Time"],
    [Mp4Directory.TAG_MODIFICATION_TIME, "Modification Time"],
    [Mp4Directory.TAG_TIME_SCALE, "Media Time Scale"],
    [Mp4Directory.TAG_DURATION, "Duration"],
    [Mp4Directory.TAG_DURATION_SECONDS, "Duration in Seconds"],
    [Mp4Directory.TAG_PREFERRED_RATE, "Preferred Rate"],
    [Mp4Directory.TAG_PREFERRED_VOLUME, "Preferred Volume"],
    [Mp4Directory.TAG_PREVIEW_TIME, "Preview Time"],
    [Mp4Directory.TAG_PREVIEW_DURATION, "Preview Duration"],
    [Mp4Directory.TAG_POSTER_TIME, "Poster Time"],
    [Mp4Directory.TAG_SELECTION_TIME, "Selection Time"],
    [Mp4Directory.TAG_SELECTION_DURATION, "Selection Duration"],
    [Mp4Directory.TAG_CURRENT_TIME, "Current Time"],
    [Mp4Directory.TAG_NEXT_TRACK_ID, "Next Track ID"],
    [Mp4Directory.TAG_TRANSFORMATION_MATRIX, "Transformation Matrix"],
    [Mp4Directory.TAG_ROTATION, "Rotation"],
    [Mp4Directory.TAG_LATITUDE, "Latitude"],
    [Mp4Directory.TAG_LONGITUDE, "Longitude"],
    [Mp4Directory.TAG_MEDIA_TIME_SCALE, "Media Time Scale"]
  ]);

  public constructor() {
    super();
    this.setDescriptor(new Mp4Descriptor(this));
  }

  public getName(): string
  {
    return "MP4";
  }

  protected getTagNameMap(): Map<number, string>
  {
    return Mp4Directory._tagNameMap;
  }
}

export default Mp4Directory