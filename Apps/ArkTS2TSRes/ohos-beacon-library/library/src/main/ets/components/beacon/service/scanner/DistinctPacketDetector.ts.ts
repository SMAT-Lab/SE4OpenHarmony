/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import HexUtil from '../../utils/HexUtil';
class DistinctPacketDetector {
    // Sanity limit for the number of packets to track, so we don't use too much memory
    private static readonly MAX_PACKETS_TO_TRACK: number = 1000;
    private mDistinctPacketsDetected: Array<Array<number>> = new Array();
    public constructor() {
    }
    public clearDetections(): void {
        this.mDistinctPacketsDetected.splice(0, this.mDistinctPacketsDetected.length);
    }
    public isPacketDistinct(originMacAddress: string, scanRecord: ArrayBuffer /*Array<number>*/): boolean {
        let macBytes: Int8Array = HexUtil.hexStringToBytes(originMacAddress);
        let buffer: Array<number> = new Array(macBytes.length + scanRecord.byteLength);
        if (this.mDistinctPacketsDetected.length == DistinctPacketDetector.MAX_PACKETS_TO_TRACK) {
            return this.mDistinctPacketsDetected.indexOf(buffer) != -1;
        }
        else {
            return this.mDistinctPacketsDetected.push(buffer) > 0;
        }
    }
}
export default DistinctPacketDetector;
