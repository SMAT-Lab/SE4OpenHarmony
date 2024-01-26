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
import FullBox from './FullBox';
import Mp4Directory from '../Mp4Directory';
export default class TrackHeaderBox extends FullBox {
    creationTime: number;
    modificationTime: number;
    trackID: number;
    duration: number;
    layer: number;
    alternateGroup: number;
    volume: number;
    matrix: Int32Array = new Int32Array[9];
    width: number;
    height: number;
    public constructor(reader: SequentialReader, box: Box) {
        super(reader, box);
        if (this.version == 1) {
            this.creationTime = reader.getInt64();
            this.modificationTime = reader.getInt64();
            this.trackID = reader.getInt32();
            reader.skip(4); // reserved
            this.duration = reader.getInt64();
        }
        else {
            this.creationTime = reader.getUInt32();
            this.modificationTime = reader.getUInt32();
            this.trackID = reader.getUInt32();
            reader.skip(4);
            this.duration = reader.getUInt32();
        }
        reader.skip(8); // reserved
        this.layer = reader.getInt16();
        this.alternateGroup = reader.getInt16();
        this.volume = reader.getInt16();
        reader.skip(2); // reserved
        for (let i = 0; i < 9; i++) {
            this.matrix[i] = reader.getInt32();
        }
        this.width = reader.getInt32();
        this.height = reader.getInt32();
    }
    public addMetadata(directory: Mp4Directory): void {
        if (this.width != 0 && this.height != 0 && directory.getDoubleObject(Mp4Directory.TAG_ROTATION) == null) {
            let x = this.matrix[1] + this.matrix[4];
            let y = this.matrix[0] + this.matrix[3];
            let theta = Math.atan2(y, x);
            let degree = theta * 180.0 / 3.141592653589793;
            degree -= 45;
            directory.setDouble(Mp4Directory.TAG_ROTATION, degree);
        }
    }
}
