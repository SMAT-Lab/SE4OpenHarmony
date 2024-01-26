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
import PanasonicRawDistortionDescriptor from './PanasonicRawDistortionDescriptor';
export default class PanasonicRawDistortionDirectory extends Directory {
    // 0 and 1 are checksums
    public static readonly TagDistortionParam02: number = 2;
    public static readonly TagDistortionParam04: number = 4;
    public static readonly TagDistortionScale: number = 5;
    public static readonly TagDistortionCorrection: number = 7;
    public static readonly TagDistortionParam08: number = 8;
    public static readonly TagDistortionParam09: number = 9;
    public static readonly TagDistortionParam11: number = 11;
    public static readonly TagDistortionN: number = 12;
    private static readonly _tagNameMap: Map<number, string> = new Map();
    public constructor() {
        super();
        PanasonicRawDistortionDirectory._tagNameMap.set(PanasonicRawDistortionDirectory.TagDistortionParam02, "Distortion Param 2");
        PanasonicRawDistortionDirectory._tagNameMap.set(PanasonicRawDistortionDirectory.TagDistortionParam04, "Distortion Param 4");
        PanasonicRawDistortionDirectory._tagNameMap.set(PanasonicRawDistortionDirectory.TagDistortionScale, "Distortion Scale");
        PanasonicRawDistortionDirectory._tagNameMap.set(PanasonicRawDistortionDirectory.TagDistortionCorrection, "Distortion Correction");
        PanasonicRawDistortionDirectory._tagNameMap.set(PanasonicRawDistortionDirectory.TagDistortionParam08, "Distortion Param 8");
        PanasonicRawDistortionDirectory._tagNameMap.set(PanasonicRawDistortionDirectory.TagDistortionParam09, "Distortion Param 9");
        PanasonicRawDistortionDirectory._tagNameMap.set(PanasonicRawDistortionDirectory.TagDistortionParam11, "Distortion Param 11");
        PanasonicRawDistortionDirectory._tagNameMap.set(PanasonicRawDistortionDirectory.TagDistortionN, "Distortion N");
        this.setDescriptor(new PanasonicRawDistortionDescriptor(this));
    }
    public getName(): string {
        return "PanasonicRaw DistortionInfo";
    }
    protected getTagNameMap(): Map<number, string> {
        return PanasonicRawDistortionDirectory._tagNameMap;
    }
}
