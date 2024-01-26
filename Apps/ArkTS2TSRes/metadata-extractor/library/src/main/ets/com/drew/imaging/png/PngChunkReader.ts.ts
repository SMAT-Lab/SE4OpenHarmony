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
import SequentialReader from '../../lang/SequentialReader';
import PngChunk from './PngChunk';
import PngChunkType from './PngChunkType';
class PngChunkReader {
    private static readonly PNG_SIGNATURE_BYTES: number[] = [-119, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A];
    public extract(reader: SequentialReader, desiredChunkTypes: Set<PngChunkType>): Array<PngChunk> {
        //
        // PNG DATA STREAM
        //
        // Starts with a PNG SIGNATURE, followed by a sequence of CHUNKS.
        //
        // PNG SIGNATURE
        //
        //   Always composed of these bytes: 89 50 4E 47 0D 0A 1A 0A
        //
        // CHUNK
        //
        //   4 - length of the data field (unsigned, but always within 31 bytes), may be zero
        //   4 - chunk type, restricted to [65,90] and [97,122] (A-Za-z)
        //   * - data field
        //   4 - CRC calculated from chunk type and chunk data, but not length
        //
        // CHUNK TYPES
        //
        //   Critical Chunk Types:
        //
        //     IHDR - image header, always the first chunk in the data stream
        //     PLTE - palette table, associated with indexed PNG images
        //     IDAT - image data chunk, of which there may be many
        //     IEND - image trailer, always the last chunk in the data stream
        //
        //   Ancillary Chunk Types:
        //
        //     Transparency information:  tRNS
        //     Colour space information:  cHRM, gAMA, iCCP, sBIT, sRGB
        //     Textual information:       iTXt, tEXt, zTXt
        //     Miscellaneous information: bKGD, hIST, pHYs, sPLT
        //     Time information:          tIME
        //
        // CHUNK READING
        //
        // Only chunk data for types specified in desiredChunkTypes is extracted.
        // For empty chunk type list NO data is copied from source stream.
        // For null chunk type list ALL data is copied from source stream.
        //
        reader.setMotorolaByteOrder(true); // network byte order
        var tem: Int8Array = reader.getBytes(PngChunkReader.PNG_SIGNATURE_BYTES.length);
        if (PngChunkReader.PNG_SIGNATURE_BYTES.toString() != tem
            .toString()) {
            throw new Error("PNG signature mismatch");
        }
        let seenImageHeader: boolean = false;
        let seenImageTrailer: boolean = false;
        let chunks = new Array<PngChunk>();
        let seenChunkTypes = new Set<PngChunkType>();
        while (!seenImageTrailer) {
            // Process the next chunk.
            let chunkDataLength: number = reader.getUInt32();
            if (chunkDataLength < 0) {
                throw new Error("PNG chunk length exceeds maximum");
            }
            let chunkType: PngChunkType;
            let tempReader: number[] = [];
            reader.getBytes(4).forEach((value, index, array) => {
                tempReader[index] = value;
            });
            try {
                chunkType = new PngChunkType(null, false, tempReader);
            }
            catch (err) {
                console.info("PngChunkReader PngChunkType error:" + err);
            }
            let willStoreChunk: boolean = false;
            desiredChunkTypes.forEach((value: PngChunkType, value2: PngChunkType, allSet) => {
                if (value.getIdentifier() == chunkType.getIdentifier()) {
                    willStoreChunk = true;
                }
            });
            //  let willStoreChunk:boolean = true;
            let chunkData: Int8Array;
            if (willStoreChunk) {
                chunkData = reader.getBytes(chunkDataLength);
            }
            else {
                chunkData = null; // To satisfy the compiler
                reader.skip(chunkDataLength);
            }
            // Skip the CRC bytes at the end of the chunk
            reader.skip(4);
            if (willStoreChunk && seenChunkTypes.has(chunkType) && !chunkType.areMultipleAllowed()) {
                throw new Error("PngChunkReader Observed multiple instances of PNG chunk " + chunkType + ", for which multiples are not allowed");
            }
            if (chunkType.getIdentifier() == PngChunkType.IHDR.getIdentifier()) {
                seenImageHeader = true;
            }
            else if (!seenImageHeader) {
                throw new Error("PngChunkReader First chunk should be " + PngChunkType.IHDR.toString() + ", but " + chunkType + " was observed");
            }
            if (chunkType.getIdentifier() == PngChunkType.IEND.getIdentifier()) {
                seenImageTrailer = true;
            }
            if (willStoreChunk) {
                chunks.push(new PngChunk(chunkType, chunkData));
            }
            seenChunkTypes.add(chunkType);
        }
        return chunks;
    }
    public copyBuffer(bytes: number[], length: number): Int8Array {
        let copy: Int8Array = new Int8Array(length);
        if (length > 0) {
            for (let i = 0; i < bytes.length; i++) {
                copy[i] = bytes[i];
            }
        }
        return copy;
    }
}
export default PngChunkReader;
