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
class QuickTimeContainerTypes {
    public static readonly ATOM_MOVIE: string = "moov";
    public static readonly ATOM_USER_DATA: string = "udta";
    public static readonly ATOM_TRACK: string = "trak";
    public static readonly ATOM_MEDIA: string = "mdia";
    public static readonly ATOM_MEDIA_INFORMATION: string = "minf";
    public static readonly ATOM_SAMPLE_TABLE: string = "stbl";
    public static readonly ATOM_METADATA_LIST: string = "ilst";
    public static readonly ATOM_METADATA: string = "meta";
    public static readonly ATOM_COMPRESSED_MOVIE: string = "cmov";
    public static readonly ATOM_MEDIA_TEXT: string = "text";
    public static readonly ATOM_MEDIA_SUBTITLE: string = "sbtl";
    public static readonly ATOM_MEDIA_BASE: string = "gmhd";
    private static readonly _atomList: Set<string> = new Set<string>([
        QuickTimeContainerTypes.ATOM_MOVIE,
        QuickTimeContainerTypes.ATOM_USER_DATA,
        QuickTimeContainerTypes.ATOM_TRACK,
        QuickTimeContainerTypes.ATOM_MEDIA,
        QuickTimeContainerTypes.ATOM_MEDIA_INFORMATION,
        QuickTimeContainerTypes.ATOM_SAMPLE_TABLE,
        QuickTimeContainerTypes.ATOM_METADATA_LIST,
        QuickTimeContainerTypes.ATOM_METADATA,
        QuickTimeContainerTypes.ATOM_COMPRESSED_MOVIE,
        QuickTimeContainerTypes.ATOM_MEDIA_TEXT,
        QuickTimeContainerTypes.ATOM_MEDIA_SUBTITLE,
        QuickTimeContainerTypes.ATOM_MEDIA_BASE
    ]);
}
export default QuickTimeContainerTypes;
