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
import RiffHandler from '../../imaging/riff/RiffHandler';
import Metadata from '../Metadata';
import WebpDirectory from './WebpDirectory';
import ByteArrayReader from '../../lang/ByteArrayReader';
import ExifReader from '../exif/ExifReader';
import IccReader from '../icc/IccReader';
import XmpReader from '../xmp/XmpReader';
import RandomAccessReader from '../../lang/RandomAccessReader';
export default class WebpRiffHandler implements RiffHandler {
    private _metadata: Metadata;
    public constructor(metadata: Metadata) {
        this._metadata = metadata;
    }
    public shouldAcceptRiffIdentifier(identifier: string): boolean {
        return identifier == WebpDirectory.FORMAT;
    }
    public shouldAcceptChunk(fourCC: string): boolean {
        return fourCC == WebpDirectory.CHUNK_VP8X
            || fourCC == WebpDirectory.CHUNK_VP8L
            || fourCC == WebpDirectory.CHUNK_VP8
            || fourCC == WebpDirectory.CHUNK_EXIF
            || fourCC == WebpDirectory.CHUNK_ICCP
            || fourCC == WebpDirectory.CHUNK_XMP;
    }
    public shouldAcceptList(fourCC: string): boolean {
        return false;
    }
    public processChunk(fourCC: string, payload: Int8Array): void {
        let directory: WebpDirectory = new WebpDirectory();
        if (fourCC == WebpDirectory.CHUNK_EXIF) {
            // We have seen WebP images with and without the preamble here. It's likely that some software incorrectly
            // copied an entire JPEG segment into the WebP image. Regardless, we can handle it here.
            let reader: ByteArrayReader = ExifReader.startsWithJpegExifPreamble(payload)
                ? new ByteArrayReader(payload, ExifReader.JPEG_SEGMENT_PREAMBLE.length)
                : new ByteArrayReader(payload);
            new ExifReader().extract(reader, this._metadata);
        }
        else if (fourCC == WebpDirectory.CHUNK_ICCP) {
            new IccReader().extract(new ByteArrayReader(payload), this._metadata);
        }
        else if (fourCC == WebpDirectory.CHUNK_XMP) {
            new XmpReader().extract(payload, 0, payload.length, this._metadata);
        }
        else if (fourCC == WebpDirectory.CHUNK_VP8X && payload.length == 10) {
            let reader: RandomAccessReader = new ByteArrayReader(payload);
            reader.setMotorolaByteOrder(false);
            try {
                let isAnimation: boolean = reader.getBit(1);
                let hasAlpha: boolean = reader.getBit(4);
                // Image size
                let widthMinusOne: number = reader.getInt24(4);
                let heightMinusOne: number = reader.getInt24(7);
                directory.setInt(WebpDirectory.TAG_IMAGE_WIDTH, widthMinusOne + 1);
                directory.setInt(WebpDirectory.TAG_IMAGE_HEIGHT, heightMinusOne + 1);
                directory.setBoolean(WebpDirectory.TAG_HAS_ALPHA, hasAlpha);
                directory.setBoolean(WebpDirectory.TAG_IS_ANIMATION, isAnimation);
                this._metadata.addDirectory(directory);
            }
            catch (e) {
                directory.addError(JSON.stringify(e));
            }
        }
        else if (fourCC == WebpDirectory.CHUNK_VP8L && payload.length > 4) {
            let reader: RandomAccessReader = new ByteArrayReader(payload);
            reader.setMotorolaByteOrder(false);
            try {
                // https://developers.google.com/speed/webp/docs/webp_lossless_bitstream_specification#2_riff_header
                // Expect the signature byte
                if (reader.getInt8(0) != 0x2F)
                    return;
                let b1: number = reader.getUInt8(1);
                let b2: number = reader.getUInt8(2);
                let b3: number = reader.getUInt8(3);
                let b4: number = reader.getUInt8(4);
                // 14 bits for width
                let widthMinusOne: number = (b2 & 0x3F) << 8 | b1;
                // 14 bits for height
                let heightMinusOne: number = (b4 & 0x0F) << 10 | b3 << 2 | (b2 & 0xC0) >> 6;
                directory.setInt(WebpDirectory.TAG_IMAGE_WIDTH, widthMinusOne + 1);
                directory.setInt(WebpDirectory.TAG_IMAGE_HEIGHT, heightMinusOne + 1);
                this._metadata.addDirectory(directory);
            }
            catch (e) {
                directory.addError(JSON.stringify(e));
            }
        }
        else if (fourCC == WebpDirectory.CHUNK_VP8 && payload.length > 9) {
            let reader: RandomAccessReader = new ByteArrayReader(payload);
            reader.setMotorolaByteOrder(false);
            try {
                // https://tools.ietf.org/html/rfc6386#section-9.1
                // https://github.com/webmproject/libwebp/blob/master/src/enc/syntax.c#L115
                let tem1 = reader.getUInt8(3);
                let tem2 = reader.getUInt8(4);
                let tem3 = reader.getUInt8(5);
                // Expect the signature bytes
                if (tem1 != 0x9D ||
                    tem2 != 0x01 ||
                    tem3 != 0x2A) {
                    return;
                }
                let width: number = reader.getUInt16(6);
                let height: number = reader.getUInt16(8);
                directory.setInt(WebpDirectory.TAG_IMAGE_WIDTH, width);
                directory.setInt(WebpDirectory.TAG_IMAGE_HEIGHT, height);
                this._metadata.addDirectory(directory);
            }
            catch (ex) {
                console.debug("webp vp8" + ex);
                directory.addError(ex);
            }
        }
    }
}
