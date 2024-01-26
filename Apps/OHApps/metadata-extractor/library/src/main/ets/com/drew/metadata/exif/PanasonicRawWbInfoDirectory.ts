
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
import PanasonicRawWbInfoDescriptor from './PanasonicRawWbInfoDescriptor';

export default class PanasonicRawWbInfoDirectory extends Directory{
 public static readonly  TagNumWbEntries:number = 0;

    public static readonly  TagWbType1:number = 1;
    public static readonly  TagWbRbLevels1:number = 2;

    public static readonly  TagWbType2:number = 4;
    public static readonly  TagWbRbLevels2:number = 5;

    public static readonly  TagWbType3:number = 7;
    public static readonly  TagWbRbLevels3:number = 8;

    public static readonly  TagWbType4:number = 10;
    public static readonly  TagWbRbLevels4:number = 11;

    public static readonly  TagWbType5:number = 13;
    public static readonly  TagWbRbLevels5:number = 14;

    public static readonly  TagWbType6:number = 16;
    public static readonly  TagWbRbLevels6:number = 17;

    public static readonly  TagWbType7:number = 19;
    public static readonly  TagWbRbLevels7:number = 20;


    private static readonly  _tagNameMap:Map<number,string> = new Map();


    public PanasonicRawWbInfoDirectory()
    {
        PanasonicRawWbInfoDirectory._tagNameMap.set(PanasonicRawWbInfoDirectory.TagNumWbEntries, "Num WB Entries");
        PanasonicRawWbInfoDirectory._tagNameMap.set(PanasonicRawWbInfoDirectory.TagWbType1, "WB Type 1");
        PanasonicRawWbInfoDirectory._tagNameMap.set(PanasonicRawWbInfoDirectory.TagWbRbLevels1, "WB RGB Levels 1");
        PanasonicRawWbInfoDirectory._tagNameMap.set(PanasonicRawWbInfoDirectory.TagWbType2, "WB Type 2");
        PanasonicRawWbInfoDirectory._tagNameMap.set(PanasonicRawWbInfoDirectory.TagWbRbLevels2, "WB RGB Levels 2");
        PanasonicRawWbInfoDirectory._tagNameMap.set(PanasonicRawWbInfoDirectory.TagWbType3, "WB Type 3");
        PanasonicRawWbInfoDirectory._tagNameMap.set(PanasonicRawWbInfoDirectory.TagWbRbLevels3, "WB RGB Levels 3");
        PanasonicRawWbInfoDirectory._tagNameMap.set(PanasonicRawWbInfoDirectory.TagWbType4, "WB Type 4");
        PanasonicRawWbInfoDirectory._tagNameMap.set(PanasonicRawWbInfoDirectory.TagWbRbLevels4, "WB RGB Levels 4");
        PanasonicRawWbInfoDirectory._tagNameMap.set(PanasonicRawWbInfoDirectory.TagWbType5, "WB Type 5");
        PanasonicRawWbInfoDirectory._tagNameMap.set(PanasonicRawWbInfoDirectory.TagWbRbLevels5, "WB RGB Levels 5");
        PanasonicRawWbInfoDirectory._tagNameMap.set(PanasonicRawWbInfoDirectory.TagWbType6, "WB Type 6");
        PanasonicRawWbInfoDirectory._tagNameMap.set(PanasonicRawWbInfoDirectory.TagWbRbLevels6, "WB RGB Levels 6");
        PanasonicRawWbInfoDirectory._tagNameMap.set(PanasonicRawWbInfoDirectory.TagWbType7, "WB Type 7");
        PanasonicRawWbInfoDirectory._tagNameMap.set(PanasonicRawWbInfoDirectory.TagWbRbLevels7, "WB RGB Levels 7");
        this.setDescriptor(new PanasonicRawWbInfoDescriptor(this));
    }


    public  getName():string
    {
        return "PanasonicRaw WbInfo";
    }


    protected getTagNameMap():Map<number,string>
    {
        return PanasonicRawWbInfoDirectory._tagNameMap;
    }
}