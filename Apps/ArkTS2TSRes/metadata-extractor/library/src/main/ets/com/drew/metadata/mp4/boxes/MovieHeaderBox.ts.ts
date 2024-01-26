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
import DateUtil from '../../../lang/DateUtil';
import Rational from '../../../lang/Rational';
export default class MovieHeaderBox extends FullBox {
    protected creationTime: number;
    protected modificationTime: number;
    protected timescale: number;
    protected duration: number;
    protected rate: number;
    protected volume: number;
    protected matrix: Int32Array;
    protected nextTrackID: number;
    public constructor(reader: SequentialReader, box: Box) {
        super(reader, box);
        if (this.version == 1) {
            this.creationTime = reader.getInt64();
            this.modificationTime = reader.getInt64();
            this.timescale = reader.getUInt32();
            this.duration = reader.getInt64();
        }
        else {
            this.creationTime = reader.getUInt32();
            this.modificationTime = reader.getUInt32();
            this.timescale = reader.getUInt32();
            this.duration = reader.getUInt32();
        }
        this.rate = reader.getInt32();
        this.volume = reader.getInt16();
        reader.skip(2); // Reserved
        reader.skip(8); // Reserved
        this.matrix = Int32Array.of(reader.getInt32(), reader.getInt32(), reader.getInt32(), reader.getInt32(), reader.getInt32(), reader.getInt32(), reader.getInt32(), reader.getInt32(), reader.getInt32());
        reader.skip(24); // Pre-defined
        this.nextTrackID = reader.getUInt32();
    }
    public addMetadata(directory: Mp4Directory): void {
        // Get creation/modification times
        directory.setDate(Mp4Directory.TAG_CREATION_TIME, DateUtil.get1Jan1904EpochDate(this.creationTime));
        directory.setDate(Mp4Directory.TAG_MODIFICATION_TIME, DateUtil.get1Jan1904EpochDate(this.modificationTime));
        // Get duration and time scale
        directory.setLong(Mp4Directory.TAG_DURATION, this.duration);
        directory.setLong(Mp4Directory.TAG_TIME_SCALE, this.timescale);
        directory.setRational(Mp4Directory.TAG_DURATION_SECONDS, new Rational(this.duration, this.timescale));
        directory.setIntArray(Mp4Directory.TAG_TRANSFORMATION_MATRIX, this.matrix);
        // Calculate preferred rate fixed point
        let preferredRateInteger = (this.rate & 0xFFFF0000) >> 16;
        let preferredRateFraction = (this.rate & 0x0000FFFF) / Math.pow(2, 4);
        directory.setDouble(Mp4Directory.TAG_PREFERRED_RATE, preferredRateInteger + preferredRateFraction);
        // Calculate preferred volume fixed point
        let preferredVolumeInteger = (this.volume & 0xFF00) >> 8;
        let preferredVolumeFraction = (this.volume & 0x00FF) / Math.pow(2, 2);
        directory.setDouble(Mp4Directory.TAG_PREFERRED_VOLUME, preferredVolumeInteger + preferredVolumeFraction);
        directory.setLong(Mp4Directory.TAG_NEXT_TRACK_ID, this.nextTrackID);
    }
}
