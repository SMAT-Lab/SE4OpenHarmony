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
import SequentialReader from '../../../lang/SequentialReader';
import Box from './Box';
import Mp4Directory from '../Mp4Directory';
export default class FileTypeBox extends Box {
    majorBrand: string;
    minorVersion: number;
    compatibleBrands: Array<string>;
    public constructor(reader: SequentialReader, box: Box) {
        super(reader, box);
        this.majorBrand = reader.getString(4);
        this.minorVersion = reader.getUInt32();
        this.compatibleBrands = new Array<string>();
        for (let i = 16; i < this.size; i += 4) {
            this.compatibleBrands.push(reader.getString(4));
        }
    }
    public addMetadata(directory: Mp4Directory): void {
        directory.setString(Mp4Directory.TAG_MAJOR_BRAND, this.majorBrand);
        directory.setLong(Mp4Directory.TAG_MINOR_VERSION, this.minorVersion);
        let append: string[] = [];
        this.compatibleBrands.forEach((value, index, array) => {
            append.push('');
        });
        directory.setStringArray(Mp4Directory.TAG_COMPATIBLE_BRANDS, this.compatibleBrands.concat(append));
    }
}
