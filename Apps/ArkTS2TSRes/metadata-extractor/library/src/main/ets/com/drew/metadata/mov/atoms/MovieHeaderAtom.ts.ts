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
import Atom from './Atom';
import DateUtil from '../../../lang/DateUtil';
import FullAtom from './FullAtom';
import QuickTimeDirectory from '../QuickTimeDirectory';
import Rational from '../../../lang/Rational';
import SequentialReader from '../../../lang/SequentialReader';
class MovieHeaderAtom extends FullAtom {
    private creationTime: number;
    private modificationTime: number;
    private timescale: number;
    private duration: number;
    private preferredRate: number;
    private preferredVolume: number;
    private matrixStructure: Int32Array;
    private previewTime: number;
    private previewDuration: number;
    private posterTime: number;
    private selectionTime: number;
    private selectionDuration: number;
    private currentTime: number;
    private nextTrackID: number;
    public constructor(reader: SequentialReader, atom: Atom) {
        super(reader, atom);
        this.creationTime = reader.getUInt32();
        this.modificationTime = reader.getUInt32();
        this.timescale = reader.getUInt32();
        this.duration = reader.getUInt32();
        this.preferredRate = reader.getInt32();
        this.preferredVolume = reader.getInt16();
        reader.skip(10); // Reserved
        this.matrixStructure = new Int32Array([
            reader.getInt32(),
            reader.getInt32(),
            reader.getInt32(),
            reader.getInt32(),
            reader.getInt32(),
            reader.getInt32(),
            reader.getInt32(),
            reader.getInt32(),
            reader.getInt32()
        ]);
        this.previewTime = reader.getUInt32();
        this.previewDuration = reader.getUInt32();
        this.posterTime = reader.getUInt32();
        this.selectionTime = reader.getUInt32();
        this.selectionDuration = reader.getUInt32();
        this.currentTime = reader.getUInt32();
        this.nextTrackID = reader.getUInt32();
    }
    public addMetadata(directory: QuickTimeDirectory): void {
        // Get creation/modification times
        directory.setDate(QuickTimeDirectory.TAG_CREATION_TIME, DateUtil.get1Jan1904EpochDate(this.creationTime));
        directory.setDate(QuickTimeDirectory.TAG_MODIFICATION_TIME, DateUtil.get1Jan1904EpochDate(this.modificationTime));
        // Get duration and time scale
        directory.setLong(QuickTimeDirectory.TAG_DURATION, this.duration);
        directory.setLong(QuickTimeDirectory.TAG_TIME_SCALE, this.timescale);
        directory.setRational(QuickTimeDirectory.TAG_DURATION_SECONDS, new Rational(this.duration, this.timescale));
        // Calculate preferred rate fixed point
        let preferredRateInteger: number = (this.preferredRate & 0xFFFF0000) >> 16;
        let preferredRateFraction: number = (this.preferredRate & 0x0000FFFF) / 16.0;
        directory.setDouble(QuickTimeDirectory.TAG_PREFERRED_RATE, preferredRateInteger + preferredRateFraction);
        // Calculate preferred volume fixed point
        let preferredVolumeInteger: number = (this.preferredVolume & 0xFF00) >> 8;
        let preferredVolumeFraction: number = (this.preferredVolume & 0x00FF) / 8.0;
        directory.setDouble(QuickTimeDirectory.TAG_PREFERRED_VOLUME, preferredVolumeInteger + preferredVolumeFraction);
        directory.setLong(QuickTimeDirectory.TAG_PREVIEW_TIME, this.previewTime);
        directory.setLong(QuickTimeDirectory.TAG_PREVIEW_DURATION, this.previewDuration);
        directory.setLong(QuickTimeDirectory.TAG_POSTER_TIME, this.posterTime);
        directory.setLong(QuickTimeDirectory.TAG_SELECTION_TIME, this.selectionTime);
        directory.setLong(QuickTimeDirectory.TAG_SELECTION_DURATION, this.selectionDuration);
        directory.setLong(QuickTimeDirectory.TAG_CURRENT_TIME, this.currentTime);
        directory.setLong(QuickTimeDirectory.TAG_NEXT_TRACK_ID, this.nextTrackID);
    }
}
export default MovieHeaderAtom;
