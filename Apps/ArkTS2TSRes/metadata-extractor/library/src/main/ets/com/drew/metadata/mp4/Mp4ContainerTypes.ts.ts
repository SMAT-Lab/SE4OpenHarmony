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
class Mp4ContainerTypes {
    public static readonly BOX_MOVIE = "moov";
    public static readonly BOX_USER_DATA = "udta";
    public static readonly BOX_TRACK = "trak";
    public static readonly BOX_MEDIA = "mdia";
    public static readonly BOX_MEDIA_INFORMATION = "minf";
    public static readonly BOX_SAMPLE_TABLE = "stbl";
    public static readonly BOX_METADATA_LIST = "ilst";
    public static readonly BOX_METADATA = "meta";
    public static readonly BOX_COMPRESSED_MOVIE = "cmov";
    public static readonly BOX_MEDIA_TEXT = "text";
    public static readonly BOX_MEDIA_SUBTITLE = "sbtl";
    public static readonly BOX_MEDIA_NULL = "nmhd";
    private static readonly _containerList = new Array([
        [Mp4ContainerTypes.BOX_MOVIE],
        [Mp4ContainerTypes.BOX_USER_DATA],
        [Mp4ContainerTypes.BOX_TRACK],
        [Mp4ContainerTypes.BOX_MEDIA],
        [Mp4ContainerTypes.BOX_MEDIA_INFORMATION],
        [Mp4ContainerTypes.BOX_SAMPLE_TABLE],
        [Mp4ContainerTypes.BOX_METADATA],
        [Mp4ContainerTypes.BOX_METADATA_LIST],
        [Mp4ContainerTypes.BOX_COMPRESSED_MOVIE],
        [Mp4ContainerTypes.BOX_MEDIA_TEXT],
        [Mp4ContainerTypes.BOX_MEDIA_SUBTITLE],
        [Mp4ContainerTypes.BOX_MEDIA_NULL]
    ]);
}
export default Mp4ContainerTypes;
