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
import { SanyoMakernoteDescriptor } from './SanyoMakernoteDescriptor';
import Directory from '../../Directory';
export class SanyoMakernoteDirectory extends Directory {
    public static TAG_MAKERNOTE_OFFSET = 0x00ff;
    public static TAG_SANYO_THUMBNAIL = 0x0100;
    public static TAG_SPECIAL_MODE = 0x0200;
    public static TAG_SANYO_QUALITY = 0x0201;
    public static TAG_MACRO = 0x0202;
    public static TAG_DIGITAL_ZOOM = 0x0204;
    public static TAG_SOFTWARE_VERSION = 0x0207;
    public static TAG_PICT_INFO = 0x0208;
    public static TAG_CAMERA_ID = 0x0209;
    public static TAG_SEQUENTIAL_SHOT = 0x020e;
    public static TAG_WIDE_RANGE = 0x020f;
    public static TAG_COLOR_ADJUSTMENT_MODE = 0x0210;
    public static TAG_QUICK_SHOT = 0x0213;
    public static TAG_SELF_TIMER = 0x0214;
    public static TAG_VOICE_MEMO = 0x0216;
    public static TAG_RECORD_SHUTTER_RELEASE = 0x0217;
    public static TAG_FLICKER_REDUCE = 0x0218;
    public static TAG_OPTICAL_ZOOM_ON = 0x0219;
    public static TAG_DIGITAL_ZOOM_ON = 0x021b;
    public static TAG_LIGHT_SOURCE_SPECIAL = 0x021d;
    public static TAG_RESAVED = 0x021e;
    public static TAG_SCENE_SELECT = 0x021f;
    public static TAG_MANUAL_FOCUS_DISTANCE_OR_FACE_INFO = 0x0223;
    public static TAG_SEQUENCE_SHOT_INTERVAL = 0x0224;
    public static TAG_FLASH_MODE = 0x0225;
    public static TAG_PRINT_IMAGE_MATCHING_INFO = 0x0E00;
    public static TAG_DATA_DUMP = 0x0f00;
    private static _tagNameMap: Map<number, string> = new Map<number, string>()
        .set(SanyoMakernoteDirectory.TAG_MAKERNOTE_OFFSET, "Makernote Offset")
        .set(SanyoMakernoteDirectory.TAG_SANYO_THUMBNAIL, "Sanyo Thumbnail")
        .set(SanyoMakernoteDirectory.TAG_SPECIAL_MODE, "Special Mode")
        .set(SanyoMakernoteDirectory.TAG_SANYO_QUALITY, "Sanyo Quality")
        .set(SanyoMakernoteDirectory.TAG_MACRO, "Macro")
        .set(SanyoMakernoteDirectory.TAG_DIGITAL_ZOOM, "Digital Zoom")
        .set(SanyoMakernoteDirectory.TAG_SOFTWARE_VERSION, "Software Version")
        .set(SanyoMakernoteDirectory.TAG_PICT_INFO, "Pict Info")
        .set(SanyoMakernoteDirectory.TAG_CAMERA_ID, "Camera ID")
        .set(SanyoMakernoteDirectory.TAG_SEQUENTIAL_SHOT, "Sequential Shot")
        .set(SanyoMakernoteDirectory.TAG_WIDE_RANGE, "Wide Range")
        .set(SanyoMakernoteDirectory.TAG_COLOR_ADJUSTMENT_MODE, "Color Adjustment Node")
        .set(SanyoMakernoteDirectory.TAG_QUICK_SHOT, "Quick Shot")
        .set(SanyoMakernoteDirectory.TAG_SELF_TIMER, "Self Timer")
        .set(SanyoMakernoteDirectory.TAG_VOICE_MEMO, "Voice Memo")
        .set(SanyoMakernoteDirectory.TAG_RECORD_SHUTTER_RELEASE, "Record Shutter Release")
        .set(SanyoMakernoteDirectory.TAG_FLICKER_REDUCE, "Flicker Reduce")
        .set(SanyoMakernoteDirectory.TAG_OPTICAL_ZOOM_ON, "Optical Zoom On")
        .set(SanyoMakernoteDirectory.TAG_DIGITAL_ZOOM_ON, "Digital Zoom On")
        .set(SanyoMakernoteDirectory.TAG_LIGHT_SOURCE_SPECIAL, "Light Source Special")
        .set(SanyoMakernoteDirectory.TAG_RESAVED, "Resaved")
        .set(SanyoMakernoteDirectory.TAG_SCENE_SELECT, "Scene Select")
        .set(SanyoMakernoteDirectory.TAG_MANUAL_FOCUS_DISTANCE_OR_FACE_INFO, "Manual Focus Distance or Face Info")
        .set(SanyoMakernoteDirectory.TAG_SEQUENCE_SHOT_INTERVAL, "Sequence Shot Interval")
        .set(SanyoMakernoteDirectory.TAG_FLASH_MODE, "Flash Mode")
        .set(SanyoMakernoteDirectory.TAG_PRINT_IMAGE_MATCHING_INFO, "Print IM")
        .set(SanyoMakernoteDirectory.TAG_DATA_DUMP, "Data Dump");
    constructor() {
        super();
        this.setDescriptor(new SanyoMakernoteDescriptor(this));
    }
    public getName(): string {
        return "Sanyo Makernote";
    }
    protected getTagNameMap(): Map<number, string> {
        return SanyoMakernoteDirectory._tagNameMap;
    }
}
