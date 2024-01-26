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
import JpegDirectory from './JpegDirectory';
import TagDescriptor from '../TagDescriptor';
import JpegComponent from './JpegComponent';
class JpegDescriptor extends TagDescriptor<JpegDirectory> {
    constructor(directory: JpegDirectory) {
        super(directory);
    }
    public getDescription(tagType: number): string {
        switch (tagType) {
            case JpegDirectory.TAG_COMPRESSION_TYPE:
                return this.getImageCompressionTypeDescription();
            case JpegDirectory.TAG_COMPONENT_DATA_1:
                return this.getComponentDataDescription(0);
            case JpegDirectory.TAG_COMPONENT_DATA_2:
                return this.getComponentDataDescription(1);
            case JpegDirectory.TAG_COMPONENT_DATA_3:
                return this.getComponentDataDescription(2);
            case JpegDirectory.TAG_COMPONENT_DATA_4:
                return this.getComponentDataDescription(3);
            case JpegDirectory.TAG_DATA_PRECISION:
                return this.getDataPrecisionDescription();
            case JpegDirectory.TAG_IMAGE_HEIGHT:
                return this.getImageHeightDescription();
            case JpegDirectory.TAG_IMAGE_WIDTH:
                return this.getImageWidthDescription();
            default:
                return super.getDescription(tagType);
        }
    }
    public getImageCompressionTypeDescription(): string {
        return this.getIndexedDescription(JpegDirectory.TAG_COMPRESSION_TYPE, 0, "Baseline", "Extended sequential, Huffman", "Progressive, Huffman", "Lossless, Huffman", null, // no 4
        "Differential sequential, Huffman", "Differential progressive, Huffman", "Differential lossless, Huffman", "Reserved for JPEG extensions", "Extended sequential, arithmetic", "Progressive, arithmetic", "Lossless, arithmetic", null, // no 12
        "Differential sequential, arithmetic", "Differential progressive, arithmetic", "Differential lossless, arithmetic");
    }
    public getImageWidthDescription(): string {
        let value: string = this._directory.getString(JpegDirectory.TAG_IMAGE_WIDTH);
        if (value == null)
            return null;
        return value + " pixels";
    }
    public getImageHeightDescription(): string {
        let value: string = this._directory.getString(JpegDirectory.TAG_IMAGE_HEIGHT);
        if (value == null)
            return null;
        return value + " pixels";
    }
    public getDataPrecisionDescription(): string {
        let value: String = this._directory.getString(JpegDirectory.TAG_DATA_PRECISION);
        if (value == null)
            return null;
        return value + " bits";
    }
    public getComponentDataDescription(componentNumber: number): string {
        let value: JpegComponent = this._directory.getComponent(componentNumber);
        if (value == null)
            return null;
        return value.getComponentName() + " component: " + value.toString();
    }
}
export default JpegDescriptor;
