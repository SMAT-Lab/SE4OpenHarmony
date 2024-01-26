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
import JpegSegmentType from './JpegSegmentType';
class JpegSegmentData {
    private readonly _segmentDataMap: Map<number, Set<Int8Array>> = new Map<number, Set<Int8Array>>();
    public addSegment(segmentType: number, segmentBytes: Int8Array) {
        this.getOrCreateSegmentList(segmentType).add(segmentBytes);
    }
    public getSegmentTypes(): Iterable<JpegSegmentType> {
        let segmentTypes: Set<JpegSegmentType> = new Set<JpegSegmentType>();
        for (let segmentTypeByte of this._segmentDataMap.keys()) {
            let segmentType: JpegSegmentType = JpegSegmentType.fromByte(segmentTypeByte);
            if (segmentType == null) {
                throw new Error("Should not have a segmentTypeByte that is not in the enum: " + segmentTypeByte.toString(16));
            }
            segmentTypes.add(segmentType);
        }
        return segmentTypes;
    }
    public getSegment(segmentType?: number, segmentTypel?: JpegSegmentType, occurrence?: number): Int8Array {
        if ((segmentType == undefined || segmentType == null) && (segmentTypel != undefined || segmentTypel != null))
            segmentType = segmentTypel.byteValue;
        if (occurrence == undefined || occurrence == null)
            occurrence = 0;
        let segmentList = this.getSegmentList(segmentType);
        return segmentList != null && segmentList.size > occurrence
            ? Array.from(segmentList)[occurrence]
            : null;
    }
    public getSegments(segmentType: number): Set<Int8Array> {
        let segmentList = this.getSegmentList(segmentType);
        return segmentList == null ? new Set<Int8Array>() : segmentList;
    }
    public getSegmentList(segmentType: number): Set<Int8Array> {
        return this._segmentDataMap.get(segmentType);
    }
    public getSegmentCount(segmentType: number): number {
        let segmentList = this.getSegmentList(segmentType);
        return segmentList == null ? 0 : segmentList.size;
    }
    public removeSegmentOccurrence(segmentType: number, occurrence: number) {
        let segmentList = this._segmentDataMap.get(segmentType);
        segmentList.delete(new Int8Array(occurrence));
    }
    public removeSegment(segmentType: number) {
        this._segmentDataMap.delete(segmentType);
    }
    public containsSegment(segmentTypel: JpegSegmentType): boolean {
        return this._segmentDataMap.has(segmentTypel.byteValue);
    }
    private getOrCreateSegmentList(segmentType: number): Set<Int8Array> {
        let segmentList: Set<Int8Array>;
        if (this._segmentDataMap.has(segmentType)) {
            segmentList = this._segmentDataMap.get(segmentType);
        }
        else {
            segmentList = new Set<Int8Array>();
            this._segmentDataMap.set(segmentType, segmentList);
        }
        return segmentList;
    }
}
export default JpegSegmentData;
