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
import JpegSegmentMetadataReader from '../../imaging/jpeg/JpegSegmentMetadataReader';
import JpegSegmentType from '../../imaging/jpeg/JpegSegmentType';
import Metadata from '../Metadata';
import XmpDirectory from './XmpDirectory';
import Directory from '../Directory';
import SequentialReader from '../../lang/SequentialReader';
import SequentialByteArrayReader from '../../lang/SequentialByteArrayReader';
class XmpReader implements JpegSegmentMetadataReader {
    private static readonly XMP_JPEG_PREAMBLE: string = "http://ns.adobe.com/xap/1.0/\0";
    private static readonly XMP_EXTENSION_JPEG_PREAMBLE: string = "http://ns.adobe.com/xmp/extension/\0";
    private static readonly SCHEMA_XMP_NOTES: string = "http://ns.adobe.com/xmp/note/";
    private static readonly ATTRIBUTE_EXTENDED_XMP: string = "xmpNote:HasExtendedXMP";
    // Limit photoshop:DocumentAncestors node as it can reach over 100000 items and make parsing extremely slow.
    // This is not a typical value but it may happen https://forums.adobe.com/thread/2081839
    //private static readonly PARSE_OPTIONS: ParseOptions = new ParseOptions().setXMPNodesToLimit(Collections.singletonMap("photoshop:DocumentAncestors", 1000));
    private static readonly PARSE_OPTIONS: string;
    /**
     * Extended XMP constants
     */
    private static readonly EXTENDED_XMP_GUID_LENGTH: number = 32;
    private static readonly EXTENDED_XMP_INT_LENGTH: number = 4;
    public getSegmentTypes(): Set<JpegSegmentType> {
        //return Collections.singletonList(JpegSegmentType.APP1);
        let segmentTypes: Set<JpegSegmentType> = new Set<JpegSegmentType>();
        return segmentTypes.add(JpegSegmentType.APP1);
    }
    public readJpegSegments(segments: Iterable<Int8Array>, metadata: Metadata, segmentType: JpegSegmentType): void {
        let preambleLength: number = XmpReader.XMP_JPEG_PREAMBLE.length;
        let extensionPreambleLength: number = XmpReader.XMP_EXTENSION_JPEG_PREAMBLE.length;
        let extendedXMPGUID: string = null;
        let extendedXMPBuffer: Int8Array = null;
        for (let segmentBytes of segments) {
            // XMP in a JPEG file has an identifying preamble which is not valid XML
            if (segmentBytes.length >= preambleLength) {
                // NOTE we expect the full preamble here, but some images (such as that reported on GitHub #102)
                // start with "XMP\0://ns.adobe.com/xap/1.0/" which appears to be an error but is easily recovered
                // from. In such cases, the actual XMP data begins at the same offset.
                if (XmpReader.XMP_JPEG_PREAMBLE == new String(segmentBytes).substring(0, preambleLength)
                    || "XMP" == new String(segmentBytes).substring(0, 3)) {
                    let xmlBytes: Int8Array = new Int8Array[segmentBytes.length - preambleLength];
                    segmentBytes.slice(preambleLength, preambleLength + xmlBytes.length);
                    this.extract(xmlBytes, 0, xmlBytes.length, metadata, null);
                    // Check in the Standard XMP if there should be a Extended XMP part in other chunks.
                    extendedXMPGUID = XmpReader.getExtendedXMPGUID(metadata);
                    continue;
                }
                // If we know that there's Extended XMP chunks, look for them.
                if (extendedXMPGUID != null
                    && segmentBytes.length >= extensionPreambleLength
                    && XmpReader.XMP_EXTENSION_JPEG_PREAMBLE == new String(segmentBytes).substring(0, extensionPreambleLength)) {
                    extendedXMPBuffer = XmpReader.processExtendedXMPChunk(metadata, segmentBytes, extendedXMPGUID, extendedXMPBuffer);
                }
            }
        }
        // Now that the Extended XMP chunks have been concatenated, let's parse and merge with the Standard XMP.
        if (extendedXMPBuffer != null) {
            this.extract(extendedXMPBuffer, 0, extendedXMPBuffer.length, metadata, null);
        }
    }
    /**
     * Performs the XMP data extraction, adding found values to the specified instance of {@link Metadata}.
     * <p>
     * The extraction is done with Adobe's XMPCore library.
     */
    public extract(xmpBytes?: Int8Array, offset?: number, length?: number, metadata?: Metadata, parentDirectory?: Directory): void {
        let directory: XmpDirectory = new XmpDirectory();
        if (parentDirectory != null) {
            directory.setParent(parentDirectory);
        }
        try {
            /*let xmpMeta: XMPMeta;
      
            // If all xmpBytes are requested, no need to make a new ByteBuffer
            if (offset == 0 && length == xmpBytes.length) {
              xmpMeta = XMPMetaFactory.parseFromBuffer(xmpBytes, XmpReader.PARSE_OPTIONS);
            } else {
              let buffer = new ByteBuffer(xmpBytes, offset, length);
              xmpMeta = XMPMetaFactory.parse(buffer.getByteStream(), XmpReader.PARSE_OPTIONS);
            }
      
            directory.setXMPMeta(xmpMeta);*/
        }
        catch (error) {
            directory.addError("Error processing XMP data: " + error);
        }
        if (!directory.isEmpty()) {
            metadata.addDirectory(directory);
        }
    }
    public extractString(xmpString: string, metadata: Metadata, parentDirectory: Directory): void {
        let directory: XmpDirectory = new XmpDirectory();
        if (parentDirectory != null) {
            directory.setParent(parentDirectory);
        }
        try {
            /*let xmpMeta = XMPMetaFactory.parseFromString(xmpString, XmpReader.PARSE_OPTIONS);
            directory.setXMPMeta(xmpMeta);*/
        }
        catch (error) {
            directory.addError("Error processing XMP data: " + error);
        }
        if (!directory.isEmpty()) {
            metadata.addDirectory(directory);
        }
    }
    /**
     * Determine if there is an extended XMP section based on the standard XMP part.
     * The xmpNote:HasExtendedXMP attribute contains the GUID of the Extended XMP chunks.
     */
    private static getExtendedXMPGUID(metadata: Metadata): string {
        /*let xmpDirectories = metadata.getDirectoriesOfType(XmpDirectory.class);
    
        for (let directory of xmpDirectories) {
          let xmpMeta = directory.getXMPMeta();
    
          try {
            let itr = xmpMeta.iterator(XmpReader.SCHEMA_XMP_NOTES, null, null);
            if (itr == null) {
              continue;
            }
    
            while (itr.hasNext()) {
              let pi = itr.next();
              if (XmpReader.ATTRIBUTE_EXTENDED_XMP == pi.getPath()) {
                return pi.getValue();
              }
            }
          } catch (error) {
            // Fail silently here: we had a reading issue, not a decoding issue.
            throw new Error(error);
          }
        }*/
        return null;
    }
    /**
     * Process an Extended XMP chunk. It will read the bytes from segmentBytes and validates that the GUID the requested one.
     * It will progressively fill the buffer with each chunk.
     * The format is specified in this document:
     * http://www.adobe.com/content/dam/Adobe/en/devnet/xmp/pdfs/XMPSpecificationPart3.pdf
     * at page 19
     */
    private static processExtendedXMPChunk(metadata: Metadata, segmentBytes: Int8Array, extendedXMPGUID: string, extendedXMPBuffer: Int8Array): Int8Array {
        let extensionPreambleLength: number = XmpReader.XMP_EXTENSION_JPEG_PREAMBLE.length;
        let segmentLength: number = segmentBytes.length;
        let totalOffset: number = extensionPreambleLength + XmpReader.EXTENDED_XMP_GUID_LENGTH
            + XmpReader.EXTENDED_XMP_INT_LENGTH + XmpReader.EXTENDED_XMP_INT_LENGTH;
        if (segmentLength >= totalOffset) {
            try {
                /*
                 * The chunk contains:
                 * - A null-terminated signature string of "http://ns.adobe.com/xmp/extension/".
                 * - A 128-bit GUID stored as a 32-byte ASCII hex string, capital A-F, no null termination.
                 *   The GUID is a 128-bit MD5 digest of the full ExtendedXMP serialization.
                 * - The full length of the ExtendedXMP serialization as a 32-bit unsigned integer
                 * - The offset of this portion as a 32-bit unsigned integer
                 * - The portion of the ExtendedXMP
                 */
                let reader: SequentialReader = new SequentialByteArrayReader(segmentBytes);
                reader.skip(extensionPreambleLength);
                let segmentGUID: string = reader.getString(XmpReader.EXTENDED_XMP_GUID_LENGTH);
                if (extendedXMPGUID == segmentGUID) {
                    let fullLength: number = Number(reader.getUInt32());
                    let chunkOffset: number = Number(reader.getUInt32());
                    if (extendedXMPBuffer == null) {
                        extendedXMPBuffer = new Int8Array[fullLength];
                    }
                    if (extendedXMPBuffer.length == fullLength) {
                        //System.arraycopy(segmentBytes, totalOffset, extendedXMPBuffer, chunkOffset, segmentLength - totalOffset);
                        //extendedXMPBuffer.slice(0, chunkOffset) + segmentBytes.slice(totalOffset, segmentLength) + extendedXMPBuffer.slice(chunkOffset, fullLength);
                    }
                    else {
                        let directory: XmpDirectory = new XmpDirectory();
                        directory.addError("Inconsistent length for the Extended XMP buffer: " + fullLength + " instead of " + extendedXMPBuffer.length);
                        metadata.addDirectory(directory);
                    }
                }
            }
            catch (error) {
                let directory: XmpDirectory = new XmpDirectory();
                directory.addError(error);
                metadata.addDirectory(directory);
            }
        }
        return extendedXMPBuffer;
    }
}
export default XmpReader;
