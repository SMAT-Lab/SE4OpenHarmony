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
import TiffDataFormat from './TiffDataFormat';
import TiffHandler from './TiffHandler';
class TiffReader {
    /**
     * Processes a TIFF data sequence.
     *
     * @param reader the {@link RandomAccessReader} from which the data should be read
     * @param handler the {@link TiffHandler} that will coordinate processing and accept read values
     * @param tiffHeaderOffset the offset within <code>reader</code> at which the TIFF header starts
     * @throws TiffProcessingException if an error occurred during the processing of TIFF data that could not be
     *                                 ignored or recovered from
     * @throws IOException an error occurred while accessing the required data
     */
    public processTiff(reader: RandomAccessReader, handler: TiffHandler, tiffHeaderOffset: number): void {
        // This must be either "MM" or "II".
        let byteOrderIdentifier: number = reader.getInt16(tiffHeaderOffset);
        if (byteOrderIdentifier == 0x4d4d) { // "MM"
            reader.setMotorolaByteOrder(true);
        }
        else if (byteOrderIdentifier == 0x4949) { // "II"
            reader.setMotorolaByteOrder(false);
        }
        else {
            throw new Error("Unclear distinction between Motorola/Intel byte ordering: " + byteOrderIdentifier);
        }
        // Check the next two values for correctness.
        let tiffMarker: number = reader.getUInt16(2 + tiffHeaderOffset);
        handler.setTiffMarker(tiffMarker);
        let firstIfdOffset: number = reader.getInt32(4 + tiffHeaderOffset) + tiffHeaderOffset;
        // David Ekholm sent a digital camera image that has this problem
        // TODO getLength should be avoided as it causes RandomAccessStreamReader to read to the end of the stream
        if (firstIfdOffset >= reader.getLength() - 1) {
            handler.warn("First IFD offset is beyond the end of the TIFF data segment -- trying default offset");
            // First directory normally starts immediately after the offset bytes, so try that
            firstIfdOffset = tiffHeaderOffset + 2 + 2 + 4;
        }
        let processedIfdOffsets: Set<number> = new Set<number>();
        TiffReader.processIfd(handler, reader, processedIfdOffsets, firstIfdOffset, tiffHeaderOffset);
    }
    /**
     * Processes a TIFF IFD.
     *
     * IFD Header:
     * <ul>
     *     <li><b>2 bytes</b> number of tags</li>
     * </ul>
     * Tag structure:
     * <ul>
     *     <li><b>2 bytes</b> tag type</li>
     *     <li><b>2 bytes</b> format code (values 1 to 12, inclusive)</li>
     *     <li><b>4 bytes</b> component count</li>
     *     <li><b>4 bytes</b> inline value, or offset pointer if too large to fit in four bytes</li>
     * </ul>
     *
     *
     * @param handler the {@link com.drew.imaging.tiff.TiffHandler} that will coordinate processing and accept read values
     * @param reader the {@link com.drew.lang.RandomAccessReader} from which the data should be read
     * @param processedIfdOffsets the set of visited IFD offsets, to avoid revisiting the same IFD in an endless loop
     * @param ifdOffset the offset within <code>reader</code> at which the IFD data starts
     * @param tiffHeaderOffset the offset within <code>reader</code> at which the TIFF header starts
     * @throws IOException an error occurred while accessing the required data
     */
    public static processIfd(handler: TiffHandler, reader: RandomAccessReader, processedIfdOffsets: Set<number>, ifdOffset: number, tiffHeaderOffset: number): void {
        let resetByteOrder: boolean = null;
        try {
            // check for directories we've already visited to avoid stack overflows when recursive/cyclic directory structures exist
            if (processedIfdOffsets.has(ifdOffset)) {
                return;
            }
            // remember that we've visited this directory so that we don't visit it again later
            processedIfdOffsets.add(ifdOffset);
            if (ifdOffset >= reader.getLength() || ifdOffset < 0) {
                handler.error("Ignored IFD marked to start outside data segment");
                return;
            }
            // First two bytes in the IFD are the number of tags in this directory
            let dirTagCount: number = reader.getUInt16(ifdOffset);
            // Some software modifies the byte order of the file, but misses some IFDs (such as makernotes).
            // The entire test image repository doesn't contain a single IFD with more than 255 entries.
            // Here we detect switched bytes that suggest this problem, and temporarily swap the byte order.
            // This was discussed in GitHub issue #136.
            if (dirTagCount > 0xFF && (dirTagCount & 0xFF) == 0) {
                resetByteOrder = reader.isMotorolaByteOrder();
                dirTagCount >>= 8;
                reader.setMotorolaByteOrder(!reader.isMotorolaByteOrder());
            }
            let dirLength: number = (2 + (12 * dirTagCount) + 4);
            if (dirLength + ifdOffset > reader.getLength()) {
                handler.error("Illegally sized IFD");
                return;
            }
            //
            // Handle each tag in this directory
            //
            let invalidTiffFormatCodeCount: number = 0;
            for (let tagNumber: number = 0; tagNumber < dirTagCount; tagNumber++) {
                let tagOffset: number = this.calculateTagOffset(ifdOffset, tagNumber);
                // 2 bytes for the tag id
                let tagId: number = reader.getUInt16(tagOffset);
                // 2 bytes for the format code
                let formatCode: number = reader.getUInt16(tagOffset + 2);
                let format: TiffDataFormat = TiffDataFormat.fromTiffFormatCode(formatCode);
                // 4 bytes dictate the number of components in this tag's data
                let componentCount: number = reader.getUInt32(tagOffset + 4);
                let byteCount: number;
                if (format == null) {
                    let byteCountOverride: number = handler.tryCustomProcessFormat(tagId, formatCode, componentCount);
                    if (byteCountOverride == null) {
                        // This error suggests that we are processing at an incorrect index and will generate
                        // rubbish until we go out of bounds (which may be a while).  Exit now.
                        handler.error("Invalid TIFF tag format code %d for tag 0x%04X"
                            .replace(/%d/, formatCode.toString())
                            .replace(/%04X/, tagId.toString()));
                        // TODO specify threshold as a parameter, or provide some other external control over this behaviour
                        if (++invalidTiffFormatCodeCount > 5) {
                            handler.error("Stopping processing as too many errors seen in TIFF IFD");
                            return;
                        }
                        continue;
                    }
                    byteCount = byteCountOverride;
                }
                else {
                    byteCount = componentCount * format.getComponentSizeBytes();
                }
                let tagValueOffset: number;
                if (byteCount > 4) {
                    // If it's bigger than 4 bytes, the dir entry contains an offset.
                    let offsetVal: number = reader.getUInt32(tagOffset + 8);
                    if (offsetVal + byteCount > reader.getLength()) {
                        // Bogus pointer offset and / or byteCount value
                        handler.error("Illegal TIFF tag pointer offset");
                        continue;
                    }
                    tagValueOffset = tiffHeaderOffset + offsetVal;
                }
                else {
                    // 4 bytes or less and value is in the dir entry itself.
                    tagValueOffset = tagOffset + 8;
                }
                if (tagValueOffset < 0 || tagValueOffset > reader.getLength()) {
                    handler.error("Illegal TIFF tag pointer offset");
                    continue;
                }
                // Check that this tag isn't going to allocate outside the bounds of the data array.
                // This addresses an uncommon OutOfMemoryError.
                if (byteCount < 0 || tagValueOffset + byteCount > reader.getLength()) {
                    handler.error("Illegal number of bytes for TIFF tag data: " + byteCount);
                    continue;
                }
                // Some tags point to one or more additional IFDs to process
                let isIfdPointer: boolean = false;
                if (byteCount == 4 * componentCount) {
                    for (let i: number = 0; i < componentCount; i++) {
                        if (handler.tryEnterSubIfd(tagId)) {
                            isIfdPointer = true;
                            let subDirOffset: number = tiffHeaderOffset + reader.getInt32(tagValueOffset + i * 4);
                            TiffReader.processIfd(handler, reader, processedIfdOffsets, subDirOffset, tiffHeaderOffset);
                        }
                    }
                }
                // If it wasn't an IFD pointer, allow custom tag processing to occur
                if (!isIfdPointer && !handler.customProcessTag(tagValueOffset, processedIfdOffsets, tiffHeaderOffset, reader, tagId, byteCount)) {
                    // If no custom processing occurred, process the tag in the standard fashion
                    TiffReader.processTag(handler, tagId, tagValueOffset, componentCount, formatCode, reader);
                }
            }
            // at the end of each IFD is an optional link to the next IFD
            let finalTagOffset: number = TiffReader.calculateTagOffset(ifdOffset, dirTagCount);
            let nextIfdOffset: number = reader.getInt32(finalTagOffset);
            if (nextIfdOffset != 0) {
                nextIfdOffset += tiffHeaderOffset;
                if (nextIfdOffset >= reader.getLength()) {
                    // Last 4 bytes of IFD reference another IFD with an address that is out of bounds
                    // Note this could have been caused by jhead 1.3 cropping too much
                    return;
                }
                else if (nextIfdOffset < ifdOffset) {
                    // TODO is this a valid restriction?
                    // Last 4 bytes of IFD reference another IFD with an address that is before the start of this directory
                    return;
                }
                if (handler.hasFollowerIfd()) {
                    TiffReader.processIfd(handler, reader, processedIfdOffsets, nextIfdOffset, tiffHeaderOffset);
                }
            }
        }
        finally {
            handler.endingIFD();
            if (resetByteOrder != null)
                reader.setMotorolaByteOrder(resetByteOrder);
        }
    }
    private static processTag(handler: TiffHandler, tagId: number, tagValueOffset: number, componentCount: number, formatCode: number, reader: RandomAccessReader): void {
        switch (formatCode) {
            case TiffDataFormat.CODE_UNDEFINED:
                // this includes exif user comments
                handler.setByteArray(tagId, reader.getBytes(tagValueOffset, componentCount));
                break;
            case TiffDataFormat.CODE_STRING:
                handler.setString(tagId, reader.getNullTerminatedStringValue(tagValueOffset, componentCount, null));
                break;
            case TiffDataFormat.CODE_RATIONAL_S:
                if (componentCount == 1) {
                    handler.setRational(tagId, new Rational(reader.getInt32(tagValueOffset), reader.getInt32(tagValueOffset + 4)));
                }
                else if (componentCount > 1) {
                    let array: Rational[] = new Rational[componentCount];
                    for (let i: number = 0; i < componentCount; i++)
                        array[i] = new Rational(reader.getInt32(tagValueOffset + (8 * i)), reader.getInt32(tagValueOffset + 4 + (8 * i)));
                    handler.setRationalArray(tagId, array);
                }
                break;
            case TiffDataFormat.CODE_RATIONAL_U:
                if (componentCount == 1) {
                    handler.setRational(tagId, new Rational(reader.getUInt32(tagValueOffset), reader.getUInt32(tagValueOffset + 4)));
                }
                else if (componentCount > 1) {
                    let array: Rational[] = new Rational[componentCount];
                    for (let i: number = 0; i < componentCount; i++)
                        array[i] = new Rational(reader.getUInt32(tagValueOffset + (8 * i)), reader.getUInt32(tagValueOffset + 4 + (8 * i)));
                    handler.setRationalArray(tagId, array);
                }
                break;
            case TiffDataFormat.CODE_SINGLE:
                if (componentCount == 1) {
                    handler.setFloat(tagId, reader.getFloat32(tagValueOffset));
                }
                else {
                    let array: Int32Array = new Int32Array(componentCount);
                    for (let i: number = 0; i < componentCount; i++)
                        array[i] = reader.getFloat32(tagValueOffset + (i * 4));
                    handler.setFloatArray(tagId, array);
                }
                break;
            case TiffDataFormat.CODE_DOUBLE:
                if (componentCount == 1) {
                    handler.setDouble(tagId, reader.getDouble64(tagValueOffset));
                }
                else {
                    let array: Int32Array = new Int32Array(componentCount);
                    for (let i: number = 0; i < componentCount; i++)
                        array[i] = reader.getDouble64(tagValueOffset + (i * 8));
                    handler.setDoubleArray(tagId, array);
                }
                break;
            case TiffDataFormat.CODE_INT8_S:
                if (componentCount == 1) {
                    handler.setInt8s(tagId, reader.getInt8(tagValueOffset));
                }
                else {
                    let array: Int8Array = new Int8Array(componentCount);
                    for (let i: number = 0; i < componentCount; i++)
                        array[i] = reader.getInt8(tagValueOffset + i);
                    handler.setInt8sArray(tagId, array);
                }
                break;
            case TiffDataFormat.CODE_INT8_U:
                if (componentCount == 1) {
                    handler.setInt8u(tagId, reader.getUInt8(tagValueOffset));
                }
                else {
                    let array: Uint8Array = new Uint8Array(componentCount);
                    for (let i: number = 0; i < componentCount; i++)
                        array[i] = reader.getUInt8(tagValueOffset + i);
                    handler.setInt8uArray(tagId, array);
                }
                break;
            case TiffDataFormat.CODE_INT16_S:
                if (componentCount == 1) {
                    handler.setInt16s(tagId, reader.getInt16(tagValueOffset));
                }
                else {
                    let array: Int16Array = new Int16Array(componentCount);
                    for (let i: number = 0; i < componentCount; i++)
                        array[i] = reader.getInt16(tagValueOffset + (i * 2));
                    handler.setInt16sArray(tagId, array);
                }
                break;
            case TiffDataFormat.CODE_INT16_U:
                if (componentCount == 1) {
                    handler.setInt16u(tagId, reader.getUInt16(tagValueOffset));
                }
                else {
                    let array: Uint16Array = new Uint16Array(componentCount);
                    for (let i: number = 0; i < componentCount; i++)
                        array[i] = reader.getUInt16(tagValueOffset + (i * 2));
                    handler.setInt16uArray(tagId, array);
                }
                break;
            case TiffDataFormat.CODE_INT32_S:
                // NOTE 'long' in this case means 32 bit, not 64
                if (componentCount == 1) {
                    handler.setInt32s(tagId, reader.getInt32(tagValueOffset));
                }
                else {
                    let array: Int32Array = new Int32Array(componentCount);
                    for (let i: number = 0; i < componentCount; i++)
                        array[i] = reader.getInt32(tagValueOffset + (i * 4));
                    handler.setInt32sArray(tagId, array);
                }
                break;
            case TiffDataFormat.CODE_INT32_U:
                // NOTE 'long' in this case means 32 bit, not 64
                if (componentCount == 1) {
                    handler.setInt32u(tagId, reader.getUInt32(tagValueOffset));
                }
                else {
                    let array: Uint32Array = new Uint32Array(componentCount);
                    for (let i: number = 0; i < componentCount; i++)
                        array[i] = reader.getUInt32(tagValueOffset + (i * 4));
                    handler.setInt32uArray(tagId, array);
                }
                break;
            default:
                handler.error("Invalid TIFF tag format code %d for tag 0x%04X"
                    .replace(/%d/, formatCode.toString())
                    .replace(/%04X/, tagId.toString()));
        }
    }
    /**
     * Determine the offset of a given tag within the specified IFD.
     *
     * @param ifdStartOffset the offset at which the IFD starts
     * @param entryNumber    the zero-based entry number
     */
    private static calculateTagOffset(ifdStartOffset: number, entryNumber: number): number {
        // Add 2 bytes for the tag count.
        // Each entry is 12 bytes.
        return ifdStartOffset + 2 + (12 * entryNumber);
    }
}
export default TiffReader;
