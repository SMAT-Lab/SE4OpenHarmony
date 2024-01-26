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
class HeifBoxTypes {
    public static readonly BOX_FILE_TYPE: string = "ftyp";
    public static readonly BOX_PRIMARY_ITEM: string = "pitm";
    public static readonly BOX_ITEM_PROTECTION: string = "ipro";
    public static readonly BOX_ITEM_INFO: string = "iinf";
    public static readonly BOX_ITEM_LOCATION: string = "iloc";
    public static readonly BOX_HANDLER: string = "hdlr";
    public static readonly BOX_HVC1: string = "hvc1";
    public static readonly BOX_IMAGE_SPATIAL_EXTENTS: string = "ispe";
    public static readonly BOX_AUXILIARY_TYPE_PROPERTY: string = "auxC";
    public static readonly BOX_IMAGE_ROTATION: string = "irot";
    public static readonly BOX_COLOUR_INFO: string = "colr";
    public static readonly BOX_PIXEL_INFORMATION: string = "pixi";
    private static readonly _boxList: Set<string> = new Set<string>()
        .add(HeifBoxTypes.BOX_FILE_TYPE)
        .add(HeifBoxTypes.BOX_ITEM_PROTECTION)
        .add(HeifBoxTypes.BOX_PRIMARY_ITEM)
        .add(HeifBoxTypes.BOX_ITEM_INFO)
        .add(HeifBoxTypes.BOX_ITEM_LOCATION)
        .add(HeifBoxTypes.BOX_HANDLER)
        .add(HeifBoxTypes.BOX_HVC1)
        .add(HeifBoxTypes.BOX_IMAGE_SPATIAL_EXTENTS)
        .add(HeifBoxTypes.BOX_AUXILIARY_TYPE_PROPERTY)
        .add(HeifBoxTypes.BOX_IMAGE_ROTATION)
        .add(HeifBoxTypes.BOX_COLOUR_INFO)
        .add(HeifBoxTypes.BOX_PIXEL_INFORMATION);
}
export default HeifBoxTypes;
