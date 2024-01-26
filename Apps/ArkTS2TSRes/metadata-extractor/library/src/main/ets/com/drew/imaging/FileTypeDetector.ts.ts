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
import fileio from '@ohos.fileio';
import StringUtil from '../lang/StringUtil';
import TypeChecker from './TypeChecker';
import FileType from './FileType';
import ByteTrie from '../lang/ByteTrie';
import MpegAudioTypeChecker from './mp3/MpegAudioTypeChecker';
import RiffTypeChecker from './riff/RiffTypeChecker';
import QuickTimeTypeChecker from './quicktime/QuickTimeTypeChecker';
/**
 * Examines the a file's first bytes and estimates the file's type.
 */
class FileTypeDetector {
    private static readonly _root: ByteTrie<FileType> = new ByteTrie<FileType>()
        .setDefaultValue(FileType.Unknown)
        .addPath(FileType.Jpeg, new Int8Array([0xff, 0xd8]))
        .addPath(FileType.Tiff, new Int8Array(StringUtil.toBytes('II')), new Int8Array([0x2a, 0x00]))
        .addPath(FileType.Tiff, new Int8Array(StringUtil.toBytes('MM')), new Int8Array([0x2a, 0x00]))
        .addPath(FileType.Psd, new Int8Array(StringUtil.toBytes('8BPS')))
        .addPath(FileType.Png, new Int8Array([-119, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52]))
        .addPath(FileType.Bmp, new Int8Array(StringUtil.toBytes('BM'))) // Standard Bitmap Windows and OS/2
        .addPath(FileType.Bmp, new Int8Array(StringUtil.toBytes('BA'))) // OS/2 Bitmap Array
        .addPath(FileType.Bmp, new Int8Array(StringUtil.toBytes('CI'))) // OS/2 Color Icon
        .addPath(FileType.Bmp, new Int8Array(StringUtil.toBytes('CP'))) // OS/2 Color Pointer
        .addPath(FileType.Bmp, new Int8Array(StringUtil.toBytes('IC'))) // OS/2 Icon
        .addPath(FileType.Bmp, new Int8Array(StringUtil.toBytes('PT'))) // OS/2 Pointer
        .addPath(FileType.Gif, new Int8Array(StringUtil.toBytes('GIF87a')))
        .addPath(FileType.Gif, new Int8Array(StringUtil.toBytes('GIF89a')))
        .addPath(FileType.Ico, new Int8Array([0x00, 0x00, 0x01, 0x00]))
        .addPath(FileType.Pcx, new Int8Array([0x0A, 0x00, 0x01])) // multiple PCX versions, explicitly listed
        .addPath(FileType.Pcx, new Int8Array([0x0A, 0x02, 0x01]))
        .addPath(FileType.Pcx, new Int8Array([0x0A, 0x03, 0x01]))
        .addPath(FileType.Pcx, new Int8Array([0x0A, 0x05, 0x01]))
        .addPath(FileType.Arw, new Int8Array(StringUtil.toBytes('II')), new Int8Array([0x2a, 0x00, 0x08, 0x00]))
        .addPath(FileType.Crw, new Int8Array(StringUtil.toBytes('II')), new Int8Array([0x1a, 0x00, 0x00, 0x00]), new Int8Array(StringUtil.toBytes("HEAPCCDR")))
        .addPath(FileType.Cr2, new Int8Array(StringUtil.toBytes('II')), new Int8Array([0x2a, 0x00, 0x10, 0x00, 0x00, 0x00, 0x43, 0x52]))
        // NOTE this doesn't work for NEF as it incorrectly flags many other TIFF files as being NEF
        //_root.addPath(FileType.Nef, "MM".getBytes(), new byte[]{0x00, 0x2a, 0x00, 0x00, 0x00, (byte)0x08, 0x00});
        .addPath(FileType.Orf, new Int8Array(StringUtil.toBytes('IIRO')), new Int8Array([0x08, 0x00]))
        .addPath(FileType.Orf, new Int8Array(StringUtil.toBytes("MMOR")), new Int8Array([0x00, 0x00]))
        .addPath(FileType.Orf, new Int8Array(StringUtil.toBytes("IIRS")), new Int8Array([0x08, 0x00]))
        .addPath(FileType.Raf, new Int8Array(StringUtil.toBytes("FUJIFILMCCD-RAW")))
        .addPath(FileType.Rw2, new Int8Array(StringUtil.toBytes("II")), new Int8Array([0x55, 0x00]))
        .addPath(FileType.Eps, new Int8Array(StringUtil.toBytes("%!PS")))
        .addPath(FileType.Eps, new Int8Array(new Int8Array([0xC5, 0xD0, 0xD3, 0xC6])));
    private static readonly _fixedCheckers: TypeChecker[] = [
        new QuickTimeTypeChecker(),
        new RiffTypeChecker(),
        new MpegAudioTypeChecker()
    ];
    private static _bytesNeeded: number = FileTypeDetector._root.getMaxDepth();
    constructor() {
        throw new Error("Not intended for instantiation");
    }
    /**
         * Examines the file's bytes and estimates the file's type.
         * <p>
         * The input stream must support mark and reset, in order to
         * return the stream to the position at which it was provided
         * to this method once completed.
         * <p>
         * Requires the stream to contain at least eight bytes.
         *
         * @throws IOException if the stream does not support mark/reset.
         */
    public static detectFileType(filePath: string): FileType {
        for (let fixedChecker of FileTypeDetector._fixedCheckers) {
            if (fixedChecker.getByteCount() > FileTypeDetector._bytesNeeded)
                FileTypeDetector._bytesNeeded = fixedChecker.getByteCount();
        }
        let inputStream;
        try {
            inputStream = fileio.createStreamSync(filePath, 'r+');
        }
        catch (e) {
            console.debug("FileTypeDetector detectFileType fail" + JSON.stringify(e));
            return null;
        }
        if (inputStream == null || inputStream == undefined) {
            return null;
        }
        let bytes = new ArrayBuffer(1024);
        let off = 0;
        let count = this._bytesNeeded;
        while (count != 0) {
            let bytesRead = inputStream.readSync(bytes, { offset: off, length: count });
            if (bytesRead == 0)
                break;
            count -= bytesRead;
            off += bytesRead;
        }
        inputStream.closeSync();
        bytes = new Int8Array(bytes).subarray(0, off);
        let fileType = this._root.find(new Int8Array(bytes), 0, off);
        //        assert(fileType != null);
        if (fileType == FileType.Unknown) {
            for (let checker of this._fixedCheckers) {
                fileType = checker.checkType(new Int8Array(bytes));
                if (fileType != FileType.Unknown)
                    return fileType;
            }
        }
        return fileType;
    }
}
export default FileTypeDetector;
