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
import Directory from '../../Directory';
import LeicaType5MakernoteDescriptor from './LeicaType5MakernoteDescriptor';
class LeicaType5MakernoteDirectory extends Directory {
    public static TagLensModel = 0x0303;
    public static TagOriginalFileName = 0x0407;
    public static TagOriginalDirectory = 0x0408;
    public static TagExposureMode = 0x040d;
    public static TagShotInfo = 0x0410;
    public static TagFilmMode = 0x0412;
    public static TagWbRgbLevels = 0x0413;
    public static _tagNameMap: Map<number, string> = new Map([
        [LeicaType5MakernoteDirectory.TagLensModel, "Lens Model"],
        [LeicaType5MakernoteDirectory.TagOriginalFileName, "Original File Name"],
        [LeicaType5MakernoteDirectory.TagOriginalDirectory, "Original Directory"],
        [LeicaType5MakernoteDirectory.TagExposureMode, "Exposure Mode"],
        [LeicaType5MakernoteDirectory.TagShotInfo, "Shot Info"],
        [LeicaType5MakernoteDirectory.TagFilmMode, "Film Mode"],
        [LeicaType5MakernoteDirectory.TagWbRgbLevels, "WB RGB Levels"]
    ]);
    constructor() {
        super();
        this.setDescriptor(new LeicaType5MakernoteDescriptor(this));
    }
    public getName(): string {
        return "Leica Makernote";
    }
    protected getTagNameMap(): Map<number, string> {
        return LeicaType5MakernoteDirectory._tagNameMap;
    }
}
export default LeicaType5MakernoteDirectory;
