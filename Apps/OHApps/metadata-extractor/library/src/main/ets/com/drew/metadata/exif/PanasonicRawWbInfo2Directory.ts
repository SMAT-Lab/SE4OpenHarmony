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

import Directory from '../Directory';
import PanasonicRawWbInfo2Descriptor from './PanasonicRawWbInfo2Descriptor';

export default class PanasonicRawWbInfo2Directory extends Directory{
public static readonly  TagNumWbEntries:number = 0;

    public static readonly  TagWbType1:number  = 1;
    public static readonly  TagWbRgbLevels1:number  = 2;

    public static readonly  TagWbType2:number  = 5;
    public static readonly  TagWbRgbLevels2:number  = 6;

    public static readonly  TagWbType3:number  = 9;
    public static readonly  TagWbRgbLevels3:number  = 10;

    public static readonly  TagWbType4:number  = 13;
    public static readonly  TagWbRgbLevels4:number  = 14;

    public static readonly  TagWbType5:number  = 17;
    public static readonly  TagWbRgbLevels5:number  = 18;

    public static readonly  TagWbType6:number  = 21;
    public static readonly  TagWbRgbLevels6:number  = 22;

    public static readonly  TagWbType7:number  = 25;
    public static readonly  TagWbRgbLevels7:number  = 26;


    private static readonly _tagNameMap:Map<number,string> = new Map();


    public constructor()
    {
     super()
        PanasonicRawWbInfo2Directory._tagNameMap.set(PanasonicRawWbInfo2Directory.TagNumWbEntries, "Num WB Entries");
        PanasonicRawWbInfo2Directory._tagNameMap.set(PanasonicRawWbInfo2Directory.TagNumWbEntries, "Num WB Entries");
        PanasonicRawWbInfo2Directory._tagNameMap.set(PanasonicRawWbInfo2Directory.TagWbType1, "WB Type 1");
        PanasonicRawWbInfo2Directory._tagNameMap.set(PanasonicRawWbInfo2Directory.TagWbRgbLevels1, "WB RGB Levels 1");
        PanasonicRawWbInfo2Directory._tagNameMap.set(PanasonicRawWbInfo2Directory.TagWbType2, "WB Type 2");
        PanasonicRawWbInfo2Directory._tagNameMap.set(PanasonicRawWbInfo2Directory.TagWbRgbLevels2, "WB RGB Levels 2");
        PanasonicRawWbInfo2Directory._tagNameMap.set(PanasonicRawWbInfo2Directory.TagWbType3, "WB Type 3");
        PanasonicRawWbInfo2Directory._tagNameMap.set(PanasonicRawWbInfo2Directory.TagWbRgbLevels3, "WB RGB Levels 3");
        PanasonicRawWbInfo2Directory._tagNameMap.set(PanasonicRawWbInfo2Directory.TagWbType4, "WB Type 4");
        PanasonicRawWbInfo2Directory._tagNameMap.set(PanasonicRawWbInfo2Directory.TagWbRgbLevels4, "WB RGB Levels 4");
        PanasonicRawWbInfo2Directory._tagNameMap.set(PanasonicRawWbInfo2Directory.TagWbType5, "WB Type 5");
        PanasonicRawWbInfo2Directory._tagNameMap.set(PanasonicRawWbInfo2Directory.TagWbRgbLevels5, "WB RGB Levels 5");
        PanasonicRawWbInfo2Directory._tagNameMap.set(PanasonicRawWbInfo2Directory.TagWbType6, "WB Type 6");
        PanasonicRawWbInfo2Directory._tagNameMap.set(PanasonicRawWbInfo2Directory.TagWbRgbLevels6, "WB RGB Levels 6");
        PanasonicRawWbInfo2Directory._tagNameMap.set(PanasonicRawWbInfo2Directory.TagWbType7, "WB Type 7");
        PanasonicRawWbInfo2Directory._tagNameMap.set(PanasonicRawWbInfo2Directory.TagWbRgbLevels7, "WB RGB Levels 7");
        this.setDescriptor(new PanasonicRawWbInfo2Descriptor(this));
    }


    public  getName():string
    {
        return "PanasonicRaw WbInfo2";
    }


    protected  getTagNameMap():Map<number,string>
    {
        return PanasonicRawWbInfo2Directory._tagNameMap;
    }
}