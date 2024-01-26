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
import PcxDirectory from './PcxDirectory';
import TagDescriptor from '../TagDescriptor';
class PcxDescriptor extends TagDescriptor<PcxDirectory> {
    constructor(directory: PcxDirectory) {
        super(directory);
    }
    public getDescription(tagType: number): string {
        switch (tagType) {
            case PcxDirectory.TAG_VERSION:
                return this.getVersionDescription();
            case PcxDirectory.TAG_COLOR_PLANES:
                return this.getColorPlanesDescription();
            case PcxDirectory.TAG_PALETTE_TYPE:
                return this.getPaletteTypeDescription();
            default:
                return super.getDescription(tagType);
        }
    }
    public getVersionDescription(): string {
        // Prior to v2.5 of PC Paintbrush, the PCX image file format was considered proprietary information
        // by ZSoft Corporation
        return this.getIndexedDescription(PcxDirectory.TAG_VERSION, "2.5 with fixed EGA palette information", null, "2.8 with modifiable EGA palette information", "2.8 without palette information (default palette)", "PC Paintbrush for Windows", "3.0 or better");
    }
    public getColorPlanesDescription(): string {
        return this.getIndexedDescription(PcxDirectory.TAG_COLOR_PLANES, 3, "24-bit color", "16 colors");
    }
    public getPaletteTypeDescription(): string {
        return this.getIndexedDescription(PcxDirectory.TAG_PALETTE_TYPE, 1, "Color or B&W", "Grayscale");
    }
}
export default PcxDescriptor;
