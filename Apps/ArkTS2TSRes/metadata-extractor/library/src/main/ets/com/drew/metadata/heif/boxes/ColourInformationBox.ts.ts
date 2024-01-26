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
import Box from './Box';
import SequentialReader from '../../../lang/SequentialReader';
import Metadata from '../../Metadata';
import IccReader from '../../icc/IccReader';
import ByteArrayReader from '../../../lang/ByteArrayReader';
import HeifDirectory from '../HeifDirectory';
class ColourInformationBox extends Box {
    public colourType: string;
    public colourPrimaries: number;
    public transferCharacteristics: number;
    public matrixCoefficients: number;
    public fullRangeFlag: number;
    public constructor(reader: SequentialReader, box: Box, metadata: Metadata) {
        super(null, box);
        this.colourType = reader.getString(4);
        if (this.colourType == "nclx") {
            this.colourPrimaries = reader.getUInt16();
            this.transferCharacteristics = reader.getUInt16();
            this.matrixCoefficients = reader.getUInt16();
            // Last 7 bits are reserved
            this.fullRangeFlag = (reader.getUInt8() & 0x80) >> 7;
        }
        else if (this.colourType == "rICC") {
            let buffer: Int8Array = reader.getBytes((this.size - 12));
            new IccReader().extract(new ByteArrayReader(buffer), metadata);
        }
        else if (this.colourType == "prof") {
            let buffer: Int8Array = reader.getBytes((this.size - 12));
            new IccReader().extract(new ByteArrayReader(buffer), metadata);
        }
    }
    public addMetadata(directory: HeifDirectory): void {
    }
}
export default ColourInformationBox;
