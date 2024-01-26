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

import Directory from '../../Directory'
import CasioType2MakernoteDescriptor from './CasioType2MakernoteDescriptor'

export default class CasioType2MakernoteDirectory extends Directory {
/**
     * 2 values - x,y dimensions in pixels.
     */
    public static readonly  TAG_THUMBNAIL_DIMENSIONS:number = 0x0002;
    /**
     * Size in bytes
     */
    public static readonly  TAG_THUMBNAIL_SIZE:number  = 0x0003;
    /**
     * Offset of Preview Thumbnail
     */
    public static readonly  TAG_THUMBNAIL_OFFSET:number  = 0x0004;
    /**
     * 1 = Fine
     * 2 = Super Fine
     */
    public static readonly  TAG_QUALITY_MODE:number  = 0x0008;
    /**
     * 0 = 640 x 480 pixels
     * 4 = 1600 x 1200 pixels
     * 5 = 2048 x 1536 pixels
     * 20 = 2288 x 1712 pixels
     * 21 = 2592 x 1944 pixels
     * 22 = 2304 x 1728 pixels
     * 36 = 3008 x 2008 pixels
     */
    public static readonly  TAG_IMAGE_SIZE:number  = 0x0009;
    /**
     * 0 = Normal
     * 1 = Macro
     */
    public static readonly  TAG_FOCUS_MODE_1:number  = 0x000D;
    /**
     * 3 = 50
     * 4 = 64
     * 6 = 100
     * 9 = 200
     */
    public static readonly  TAG_ISO_SENSITIVITY:number  = 0x0014;
    /**
     * 0 = Auto
     * 1 = Daylight
     * 2 = Shade
     * 3 = Tungsten
     * 4 = Fluorescent
     * 5 = Manual
     */
    public static readonly  TAG_WHITE_BALANCE_1:number  = 0x0019;
    /**
     * Units are tenths of a millimetre
     */
    public static readonly  TAG_FOCAL_LENGTH:number  = 0x001D;
    /**
     * 0 = -1
     * 1 = Normal
     * 2 = +1
     */
    public static readonly  TAG_SATURATION:number  = 0x001F;
    /**
     * 0 = -1
     * 1 = Normal
     * 2 = +1
     */
    public static readonly  TAG_CONTRAST:number  = 0x0020;
    /**
     * 0 = -1
     * 1 = Normal
     * 2 = +1
     */
    public static readonly  TAG_SHARPNESS:number  = 0x0021;
    /**
     * See PIM specification here: http://www.ozhiker.com/electronics/pjmt/jpeg_info/pim.html
     */
    public static readonly  TAG_PRINT_IMAGE_MATCHING_INFO:number  = 0x0E00;
    /**
     * Alternate thumbnail offset
     */
    public static readonly  TAG_PREVIEW_THUMBNAIL:number  = 0x2000;
    /**
     *
     */
    public static readonly  TAG_WHITE_BALANCE_BIAS:number  = 0x2011;
    /**
     * 12 = Flash
     * 0 = Manual
     * 1 = Auto?
     * 4 = Flash?
     */
    public static readonly  TAG_WHITE_BALANCE_2:number  = 0x2012;
    /**
     * Units are millimetres
     */
    public static readonly  TAG_OBJECT_DISTANCE:number  = 0x2022;
    /**
     * 0 = Off
     */
    public static readonly  TAG_FLASH_DISTANCE :number = 0x2034;
    /**
     * 2 = Normal Mode
     */
    public static readonly  TAG_RECORD_MODE:number  = 0x3000;
    /**
     * 1 = Off?
     */
    public static readonly  TAG_SELF_TIMER:number  = 0x3001;
    /**
     * 3 = Fine
     */
    public static readonly  TAG_QUALITY :number = 0x3002;
    /**
     * 1 = Fixation
     * 6 = Multi-Area Auto Focus
     */
    public static readonly  TAG_FOCUS_MODE_2:number  = 0x3003;
    /**
     * (string)
     */
    public static readonly  TAG_TIME_ZONE:number  = 0x3006;
    /**
     *
     */
    public static readonly  TAG_BESTSHOT_MODE:number  = 0x3007;
    /**
     * 0 = Off
     * 1 = On?
     */
    public static readonly  TAG_CCD_ISO_SENSITIVITY:number  = 0x3014;
    /**
     * 0 = Off
     */
    public static readonly  TAG_COLOUR_MODE:number  = 0x3015;
    /**
     * 0 = Off
     */
    public static readonly  TAG_ENHANCEMENT:number  = 0x3016;
    /**
     * 0 = Off
     */
    public static readonly  TAG_FILTER:number  = 0x3017;


    private static readonly _tagNameMap:Map<number,string> = new Map();



    public constructor()
    {
      super()
      // TODO add missing names
       CasioType2MakernoteDirectory._tagNameMap.set(CasioType2MakernoteDirectory.TAG_THUMBNAIL_DIMENSIONS, "Thumbnail Dimensions");
        CasioType2MakernoteDirectory._tagNameMap.set(CasioType2MakernoteDirectory.TAG_THUMBNAIL_SIZE, "Thumbnail Size");
        CasioType2MakernoteDirectory._tagNameMap.set(CasioType2MakernoteDirectory.TAG_THUMBNAIL_OFFSET, "Thumbnail Offset");
        CasioType2MakernoteDirectory._tagNameMap.set(CasioType2MakernoteDirectory.TAG_QUALITY_MODE, "Quality Mode");
        CasioType2MakernoteDirectory._tagNameMap.set(CasioType2MakernoteDirectory.TAG_IMAGE_SIZE, "Image Size");
        CasioType2MakernoteDirectory._tagNameMap.set(CasioType2MakernoteDirectory.TAG_FOCUS_MODE_1, "Focus Mode");
        CasioType2MakernoteDirectory._tagNameMap.set(CasioType2MakernoteDirectory.TAG_ISO_SENSITIVITY, "ISO Sensitivity");
        CasioType2MakernoteDirectory._tagNameMap.set(CasioType2MakernoteDirectory.TAG_WHITE_BALANCE_1, "White Balance");
        CasioType2MakernoteDirectory._tagNameMap.set(CasioType2MakernoteDirectory.TAG_FOCAL_LENGTH, "Focal Length");
        CasioType2MakernoteDirectory._tagNameMap.set(CasioType2MakernoteDirectory.TAG_SATURATION, "Saturation");
        CasioType2MakernoteDirectory._tagNameMap.set(CasioType2MakernoteDirectory.TAG_CONTRAST, "Contrast");
        CasioType2MakernoteDirectory._tagNameMap.set(CasioType2MakernoteDirectory.TAG_SHARPNESS, "Sharpness");
        CasioType2MakernoteDirectory._tagNameMap.set(CasioType2MakernoteDirectory.TAG_PRINT_IMAGE_MATCHING_INFO, "Print Image Matching (PIM) Info");
        CasioType2MakernoteDirectory._tagNameMap.set(CasioType2MakernoteDirectory.TAG_PREVIEW_THUMBNAIL, "Casio Preview Thumbnail");
        CasioType2MakernoteDirectory._tagNameMap.set(CasioType2MakernoteDirectory.TAG_WHITE_BALANCE_BIAS, "White Balance Bias");
        CasioType2MakernoteDirectory._tagNameMap.set(CasioType2MakernoteDirectory.TAG_WHITE_BALANCE_2, "White Balance");
        CasioType2MakernoteDirectory._tagNameMap.set(CasioType2MakernoteDirectory.TAG_OBJECT_DISTANCE, "Object Distance");
        CasioType2MakernoteDirectory._tagNameMap.set(CasioType2MakernoteDirectory.TAG_FLASH_DISTANCE, "Flash Distance");
        CasioType2MakernoteDirectory._tagNameMap.set(CasioType2MakernoteDirectory.TAG_RECORD_MODE, "Record Mode");
        CasioType2MakernoteDirectory._tagNameMap.set(CasioType2MakernoteDirectory.TAG_SELF_TIMER, "Self Timer");
        CasioType2MakernoteDirectory._tagNameMap.set(CasioType2MakernoteDirectory.TAG_QUALITY, "Quality");
        CasioType2MakernoteDirectory._tagNameMap.set(CasioType2MakernoteDirectory.TAG_FOCUS_MODE_2, "Focus Mode");
        CasioType2MakernoteDirectory._tagNameMap.set(CasioType2MakernoteDirectory.TAG_TIME_ZONE, "Time Zone");
        CasioType2MakernoteDirectory._tagNameMap.set(CasioType2MakernoteDirectory.TAG_BESTSHOT_MODE, "BestShot Mode");
        CasioType2MakernoteDirectory._tagNameMap.set(CasioType2MakernoteDirectory.TAG_CCD_ISO_SENSITIVITY, "CCD ISO Sensitivity");
        CasioType2MakernoteDirectory._tagNameMap.set(CasioType2MakernoteDirectory.TAG_COLOUR_MODE, "Colour Mode");
        CasioType2MakernoteDirectory._tagNameMap.set(CasioType2MakernoteDirectory.TAG_ENHANCEMENT, "Enhancement");
        CasioType2MakernoteDirectory._tagNameMap.set(CasioType2MakernoteDirectory.TAG_FILTER, "Filter");
        this.setDescriptor(new CasioType2MakernoteDescriptor(this));
    }


    public  getName():string
    {
        return "Casio Makernote";
    }


    protected  getTagNameMap():Map<number,string>
    {
        return CasioType2MakernoteDirectory._tagNameMap;
    }
}