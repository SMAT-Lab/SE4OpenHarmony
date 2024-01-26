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
import RandomAccessReader from '../../lang/RandomAccessReader';
import Rational from '../../lang/Rational';
import StringValue from '../../metadata/StringValue';
interface TiffHandler {
    /**
     * Receives the 2-byte marker found in the TIFF header.
     * <p>
     * Implementations are not obligated to use this information for any purpose, though it may be useful for
     * validation or perhaps differentiating the type of mapping to use for observed tags and IFDs.
     *
     * @param marker the 2-byte value found at position 2 of the TIFF header
     */
    setTiffMarker(marker: number): void;
    tryEnterSubIfd(tagId: number): boolean;
    hasFollowerIfd(): boolean;
    endingIFD(): void;
    tryCustomProcessFormat(tagId: number, formatCode: number, componentCount: number): number;
    customProcessTag(tagOffset: number, processedIfdOffsets: Set<number>, tiffHeaderOffset: number, reader: RandomAccessReader, tagId: number, byteCount: number): boolean;
    warn(message: string): void;
    error(message: string): void;
    setByteArray(tagId: number, bytes: Int8Array): void;
    setString(tagId: number, string: StringValue): void;
    setRational(tagId: number, rational: Rational): void;
    setRationalArray(tagId: number, array: Rational[]): void;
    setFloat(tagId: number, float32: number): void;
    setFloatArray(tagId: number, array: Int32Array): void;
    setDouble(tagId: number, double64: number): void;
    setDoubleArray(tagId: number, array: Int32Array): void;
    setInt8s(tagId: number, int8s: number): void;
    setInt8sArray(tagId: number, array: Int8Array): void;
    setInt8u(tagId: number, int8u: number): void;
    setInt8uArray(tagId: number, array: Uint8Array): void;
    setInt16s(tagId: number, int16s: number): void;
    setInt16sArray(tagId: number, array: Int16Array): void;
    setInt16u(tagId: number, int16u: number): void;
    setInt16uArray(tagId: number, array: Uint16Array): void;
    setInt32s(tagId: number, int32s: number): void;
    setInt32sArray(tagId: number, array: Int32Array): void;
    setInt32u(tagId: number, int32u: number): void;
    setInt32uArray(tagId: number, array: Uint32Array): void;
}
export default TiffHandler;
