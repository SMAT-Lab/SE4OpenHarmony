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
import { SamsungType2MakernoteDirectory } from './SamsungType2MakernoteDirectory';
import TagDescriptor from '../../TagDescriptor';
export class SamsungType2MakernoteDescriptor extends TagDescriptor<SamsungType2MakernoteDirectory> {
    constructor(directory: SamsungType2MakernoteDirectory) {
        super(directory);
    }
    public getDescription(tagType: number): string {
        switch (tagType) {
            case SamsungType2MakernoteDirectory.TagMakerNoteVersion:
                return this.getMakernoteVersionDescription();
            case SamsungType2MakernoteDirectory.TagDeviceType:
                return this.getDeviceTypeDescription();
            case SamsungType2MakernoteDirectory.TagSamsungModelId:
                return this.getSamsungModelIdDescription();
            case SamsungType2MakernoteDirectory.TagRawDataByteOrder:
                return this.getRawDataByteOrderDescription();
            case SamsungType2MakernoteDirectory.TagWhiteBalanceSetup:
                return this.getWhiteBalanceSetupDescription();
            case SamsungType2MakernoteDirectory.TagCameraTemperature:
                return this.getCameraTemperatureDescription();
            case SamsungType2MakernoteDirectory.TagRawDataCFAPattern:
                return this.getRawDataCFAPatternDescription();
            case SamsungType2MakernoteDirectory.TagFaceDetect:
                return this.getFaceDetectDescription();
            case SamsungType2MakernoteDirectory.TagFaceRecognition:
                return this.getFaceRecognitionDescription();
            case SamsungType2MakernoteDirectory.TagLensType:
                return this.getLensTypeDescription();
            case SamsungType2MakernoteDirectory.TagColorSpace:
                return this.getColorSpaceDescription();
            case SamsungType2MakernoteDirectory.TagSmartRange:
                return this.getSmartRangeDescription();
            default:
                return super.getDescription(tagType);
        }
    }
    public getMakernoteVersionDescription(): string {
        return this.getVersionBytesDescription(SamsungType2MakernoteDirectory.TagMakerNoteVersion, 2);
    }
    public getDeviceTypeDescription(): string {
        let value = this._directory.getInteger(SamsungType2MakernoteDirectory.TagDeviceType);
        if (value == null)
            return null;
        switch (value) {
            case 0x1000:
                return "Compact Digital Camera";
            case 0x2000:
                return "High-end NX Camera";
            case 0x3000:
                return "HXM Video Camera";
            case 0x12000:
                return "Cell Phone";
            case 0x300000:
                return "SMX Video Camera";
            default:
                return "" + value;
        }
    }
    public getSamsungModelIdDescription(): string {
        let value = this._directory.getInteger(SamsungType2MakernoteDirectory.TagSamsungModelId);
        if (value == null)
            return null;
        switch (value) {
            case 0x100101c:
                return "NX10";
            /*case 0x1001226:
                    return "HMX-S10BP";*/
            case 0x1001226:
                return "HMX-S15BP";
            case 0x1001233:
                return "HMX-Q10";
            /*case 0x1001234:
                    return "HMX-H300";*/
            case 0x1001234:
                return "HMX-H304";
            case 0x100130c:
                return "NX100";
            case 0x1001327:
                return "NX11";
            case 0x170104e:
                return "ES70, ES71 / VLUU ES70, ES71 / SL600";
            case 0x1701052:
                return "ES73 / VLUU ES73 / SL605";
            case 0x1701300:
                return "ES28 / VLUU ES28";
            case 0x1701303:
                return "ES74,ES75,ES78 / VLUU ES75,ES78";
            case 0x2001046:
                return "PL150 / VLUU PL150 / TL210 / PL151";
            case 0x2001311:
                return "PL120,PL121 / VLUU PL120,PL121";
            case 0x2001315:
                return "PL170,PL171 / VLUUPL170,PL171";
            case 0x200131e:
                return "PL210, PL211 / VLUU PL210, PL211";
            case 0x2701317:
                return "PL20,PL21 / VLUU PL20,PL21";
            case 0x2a0001b:
                return "WP10 / VLUU WP10 / AQ100";
            case 0x3000000:
                return "Various Models (0x3000000)";
            case 0x3a00018:
                return "Various Models (0x3a00018)";
            case 0x400101f:
                return "ST1000 / ST1100 / VLUU ST1000 / CL65";
            case 0x4001022:
                return "ST550 / VLUU ST550 / TL225";
            case 0x4001025:
                return "Various Models (0x4001025)";
            case 0x400103e:
                return "VLUU ST5500, ST5500, CL80";
            case 0x4001041:
                return "VLUU ST5000, ST5000, TL240";
            case 0x4001043:
                return "ST70 / VLUU ST70 / ST71";
            case 0x400130a:
                return "Various Models (0x400130a)";
            case 0x400130e:
                return "ST90,ST91 / VLUU ST90,ST91";
            case 0x4001313:
                return "VLUU ST95, ST95";
            case 0x4a00015:
                return "VLUU ST60";
            case 0x4a0135b:
                return "ST30, ST65 / VLUU ST65 / ST67";
            case 0x5000000:
                return "Various Models (0x5000000)";
            case 0x5001038:
                return "Various Models (0x5001038)";
            case 0x500103a:
                return "WB650 / VLUU WB650 / WB660";
            case 0x500103c:
                return "WB600 / VLUU WB600 / WB610";
            case 0x500133e:
                return "WB150 / WB150F / WB152 / WB152F / WB151";
            case 0x5a0000f:
                return "WB5000 / HZ25W";
            case 0x6001036:
                return "EX1";
            case 0x700131c:
                return "VLUU SH100, SH100";
            case 0x27127002:
                return "SMX - C20N";
            default:
                return "" + value;
        }
    }
    public getRawDataByteOrderDescription(): string {
        return this.getIndexedDescription(SamsungType2MakernoteDirectory.TagRawDataByteOrder, "Little-endian (Intel)", "Big-endian (Motorola)");
    }
    public getWhiteBalanceSetupDescription(): string {
        return this.getIndexedDescription(SamsungType2MakernoteDirectory.TagWhiteBalanceSetup, "Auto", "Manual");
    }
    public getCameraTemperatureDescription(): string {
        return this.getFormattedInt(SamsungType2MakernoteDirectory.TagCameraTemperature, "%d C");
    }
    public getRawDataCFAPatternDescription(): string {
        let value = this._directory.getInteger(SamsungType2MakernoteDirectory.TagRawDataCFAPattern);
        if (value == null)
            return null;
        switch (value) {
            case 0:
                return "Unchanged";
            case 1:
                return "Swap";
            case 65535:
                return "Roll";
            default:
                return value;
        }
    }
    public getFaceDetectDescription(): string {
        return this.getIndexedDescription(SamsungType2MakernoteDirectory.TagFaceDetect, "Off", "On");
    }
    public getFaceRecognitionDescription(): string {
        return this.getIndexedDescription(SamsungType2MakernoteDirectory.TagFaceRecognition, "Off", "On");
    }
    public getLensTypeDescription(): string {
        return this.getIndexedDescription(SamsungType2MakernoteDirectory.TagLensType, "Built-in or Manual Lens", "Samsung NX 30mm F2 Pancake", "Samsung NX 18-55mm F3.5-5.6 OIS", "Samsung NX 50-200mm F4-5.6 ED OIS", "Samsung NX 20-50mm F3.5-5.6 ED", "Samsung NX 20mm F2.8 Pancake", "Samsung NX 18-200mm F3.5-6.3 ED OIS", "Samsung NX 60mm F2.8 Macro ED OIS SSA", "Samsung NX 16mm F2.4 Pancake", "Samsung NX 85mm F1.4 ED SSA", "Samsung NX 45mm F1.8", "Samsung NX 45mm F1.8 2D/3D", "Samsung NX 12-24mm F4-5.6 ED", "Samsung NX 16-50mm F2-2.8 S ED OIS", "Samsung NX 10mm F3.5 Fisheye", "Samsung NX 16-50mm F3.5-5.6 Power Zoom ED OIS", null, null, null, null, "Samsung NX 50-150mm F2.8 S ED OIS", "Samsung NX 300mm F2.8 ED OIS");
    }
    public getColorSpaceDescription(): string {
        return this.getIndexedDescription(SamsungType2MakernoteDirectory.TagColorSpace, "sRGB", "Adobe RGB");
    }
    public getSmartRangeDescription(): string {
        return this.getIndexedDescription(SamsungType2MakernoteDirectory.TagSmartRange, "Off", "On");
    }
}
