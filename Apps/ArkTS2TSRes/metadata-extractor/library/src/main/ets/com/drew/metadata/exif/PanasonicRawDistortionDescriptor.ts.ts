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
import TagDescriptor from '../TagDescriptor';
import Rational from '../../lang/Rational';
import PanasonicRawDistortionDirectory from './PanasonicRawDistortionDirectory';
export default class PanasonicRawDistortionDescriptor extends TagDescriptor<PanasonicRawDistortionDirectory> {
    public constructor(directory: PanasonicRawDistortionDirectory) {
        super(directory);
    }
    public getDescription(tagType: number): string {
        switch (tagType) {
            case PanasonicRawDistortionDirectory.TagDistortionParam02:
                return this.getDistortionParam02Description();
            case PanasonicRawDistortionDirectory.TagDistortionParam04:
                return this.getDistortionParam04Description();
            case PanasonicRawDistortionDirectory.TagDistortionScale:
                return this.getDistortionScaleDescription();
            case PanasonicRawDistortionDirectory.TagDistortionCorrection:
                return this.getDistortionCorrectionDescription();
            case PanasonicRawDistortionDirectory.TagDistortionParam08:
                return this.getDistortionParam08Description();
            case PanasonicRawDistortionDirectory.TagDistortionParam09:
                return this.getDistortionParam09Description();
            case PanasonicRawDistortionDirectory.TagDistortionParam11:
                return this.getDistortionParam11Description();
            default:
                return super.getDescription(tagType);
        }
    }
    public getDistortionParam02Description(): string {
        let value: Number = this._directory.getInteger(PanasonicRawDistortionDirectory.TagDistortionParam02);
        if (value == null)
            return null;
        return new Rational(value.valueOf(), 32678).toString();
    }
    public getDistortionParam04Description(): string {
        let value = this._directory.getInteger(PanasonicRawDistortionDirectory.TagDistortionParam04);
        if (value == null)
            return null;
        return new Rational(value, 32678).toString();
    }
    public getDistortionScaleDescription(): string {
        let value = this._directory.getInteger(PanasonicRawDistortionDirectory.TagDistortionScale);
        if (value == null)
            return null;
        //return (1 / (1 + value / 32768)).toString();
        return String(1 / (1 + value / 32768));
    }
    public getDistortionCorrectionDescription(): string {
        let value = this._directory.getInteger(PanasonicRawDistortionDirectory.TagDistortionCorrection);
        if (value == null)
            return null;
        // (have seen the upper 4 bits set for GF5 and GX1, giving a value of -4095 - PH)
        let mask = 0x000f;
        switch (value & mask) {
            case 0:
                return "Off";
            case 1:
                return "On";
            default:
                return "Unknown (" + value + ")";
        }
    }
    public getDistortionParam08Description(): string {
        let value = this._directory.getInteger(PanasonicRawDistortionDirectory.TagDistortionParam08);
        if (value == null)
            return null;
        return new Rational(value, 32678).toString();
    }
    public getDistortionParam09Description(): string {
        let value = this._directory.getInteger(PanasonicRawDistortionDirectory.TagDistortionParam09);
        if (value == null)
            return null;
        return new Rational(value, 32678).toString();
    }
    public getDistortionParam11Description(): string {
        let value = this._directory.getInteger(PanasonicRawDistortionDirectory.TagDistortionParam11);
        if (value == null)
            return null;
        return new Rational(value, 32678).toString();
    }
}
