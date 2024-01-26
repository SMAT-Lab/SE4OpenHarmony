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
class QuickTimeAtomTypes {
    public static readonly ATOM_FILE_TYPE: string = "ftyp";
    public static readonly ATOM_MOVIE_HEADER: string = "mvhd";
    public static readonly ATOM_VIDEO_MEDIA_INFO: string = "vmhd";
    public static readonly ATOM_SOUND_MEDIA_INFO: string = "smhd";
    public static readonly ATOM_BASE_MEDIA_INFO: string = "gmhd";
    public static readonly ATOM_TIMECODE_MEDIA_INFO: string = "tcmi";
    public static readonly ATOM_HANDLER: string = "hdlr";
    public static readonly ATOM_KEYS: string = "keys";
    public static readonly ATOM_DATA: string = "data";
    public static readonly ATOM_SAMPLE_DESCRIPTION: string = "stsd";
    public static readonly ATOM_TIME_TO_SAMPLE: string = "stts";
    public static readonly ATOM_MEDIA_HEADER: string = "mdhd";
    public static readonly ATOM_CANON_THUMBNAIL: string = "CNTH";
    public static readonly ATOM_ADOBE_XMP: string = "XMP_";
    public static readonly ATOM_TRACK_HEADER: string = "tkhd";
    private static readonly _atomList: Set<string> = new Set<string>([
        QuickTimeAtomTypes.ATOM_FILE_TYPE,
        QuickTimeAtomTypes.ATOM_MOVIE_HEADER,
        QuickTimeAtomTypes.ATOM_VIDEO_MEDIA_INFO,
        QuickTimeAtomTypes.ATOM_SOUND_MEDIA_INFO,
        QuickTimeAtomTypes.ATOM_BASE_MEDIA_INFO,
        QuickTimeAtomTypes.ATOM_TIMECODE_MEDIA_INFO,
        QuickTimeAtomTypes.ATOM_HANDLER,
        QuickTimeAtomTypes.ATOM_KEYS,
        QuickTimeAtomTypes.ATOM_DATA,
        QuickTimeAtomTypes.ATOM_SAMPLE_DESCRIPTION,
        QuickTimeAtomTypes.ATOM_TIME_TO_SAMPLE,
        QuickTimeAtomTypes.ATOM_MEDIA_HEADER,
        QuickTimeAtomTypes.ATOM_CANON_THUMBNAIL,
        QuickTimeAtomTypes.ATOM_ADOBE_XMP,
        QuickTimeAtomTypes.ATOM_TRACK_HEADER
    ]);
}
export default QuickTimeAtomTypes;
