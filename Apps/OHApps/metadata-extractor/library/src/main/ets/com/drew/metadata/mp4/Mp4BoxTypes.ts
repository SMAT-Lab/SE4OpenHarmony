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

class Mp4BoxTypes {
  public static readonly BOX_FILE_TYPE                        = "ftyp";
  public static readonly BOX_MOVIE_HEADER                     = "mvhd";
  public static readonly BOX_VIDEO_MEDIA_INFO                 = "vmhd";
  public static readonly BOX_SOUND_MEDIA_INFO                 = "smhd";
  public static readonly BOX_HINT_MEDIA_INFO                  = "hmhd";
  public static readonly BOX_NULL_MEDIA_INFO                  = "nmhd";
  public static readonly BOX_HANDLER                          = "hdlr";
  public static readonly BOX_SAMPLE_DESCRIPTION               = "stsd";
  public static readonly BOX_TIME_TO_SAMPLE                   = "stts";
  public static readonly BOX_MEDIA_HEADER                     = "mdhd";
  public static readonly BOX_TRACK_HEADER                     = "tkhd";
  public static readonly BOX_USER_DEFINED                     = "uuid";
  public static readonly BOX_USER_DATA                        = "udta";
  private static readonly _boxList = new Array([
    [Mp4BoxTypes.BOX_FILE_TYPE],
    [Mp4BoxTypes.BOX_MOVIE_HEADER],
    [Mp4BoxTypes.BOX_VIDEO_MEDIA_INFO],
    [Mp4BoxTypes.BOX_SOUND_MEDIA_INFO],
    [Mp4BoxTypes.BOX_HINT_MEDIA_INFO],
    [Mp4BoxTypes.BOX_NULL_MEDIA_INFO],
    [Mp4BoxTypes.BOX_HANDLER],
    [Mp4BoxTypes.BOX_SAMPLE_DESCRIPTION],
    [Mp4BoxTypes.BOX_TIME_TO_SAMPLE],
    [Mp4BoxTypes.BOX_MEDIA_HEADER],
    [Mp4BoxTypes.BOX_TRACK_HEADER],
    [Mp4BoxTypes.BOX_USER_DEFINED]
  ]);
}

export default Mp4BoxTypes
