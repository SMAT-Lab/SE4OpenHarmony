let __generate__Id: number = 0;
function generateId(): string {
    return "index_" + ++__generate__Id;
}
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
export { default as Metadata } from './src/main/ets/com/drew/metadata/Metadata';
export { default as ImageMetadataReader } from './src/main/ets/com/drew/imaging/ImageMetadataReader';
export { BmpHeaderDirectory } from './src/main/ets/com/drew/metadata/bmp/BmpHeaderDirectory';
export { default as Age } from './src/main/ets/com/drew/metadata/Age';
export { default as Directory } from './src/main/ets/com/drew/metadata/Directory';
//// lang
export { default as ByteArrayReader } from './src/main/ets/com/drew/lang/ByteArrayReader';
export { default as GeoLocation } from './src/main/ets/com/drew/lang/GeoLocation';
export { default as ByteConvert } from './src/main/ets/com/drew/lang/ByteConvert';
export { default as ByteTrie } from './src/main/ets/com/drew/lang/ByteTrie';
export { default as ByteUtil } from './src/main/ets/com/drew/lang/ByteUtil';
export { default as RandomAccessFileReader } from './src/main/ets/com/drew/lang/RandomAccessFileReader';
export { default as RandomAccessStreamReader } from './src/main/ets/com/drew/lang/RandomAccessStreamReader';
export { default as RandomAccessReader } from './src/main/ets/com/drew/lang/RandomAccessReader';
export { default as Rational } from './src/main/ets/com/drew/lang/Rational';
export { default as SequentialByteArrayReader } from './src/main/ets/com/drew/lang/SequentialByteArrayReader';
export { default as SequentialReader } from './src/main/ets/com/drew/lang/SequentialReader';
export { default as StreamReader } from './src/main/ets/com/drew/lang/StreamReader';
export { default as StringUtil } from './src/main/ets/com/drew/lang/StringUtil';
////image
export { default as PngMetadataReader } from './src/main/ets/com/drew/imaging/png/PngMetadataReader';
export { default as PngChunkType } from './src/main/ets/com/drew/imaging/png/PngChunkType';
export { default as PngDirectory } from './src/main/ets/com/drew/metadata/png/PngDirectory';
export { default as PngDescriptor } from './src/main/ets/com/drew/metadata/png/PngDescriptor';
export { default as PngChunkReader } from './src/main/ets/com/drew/imaging/png/PngChunkReader';
export { default as JpegSegmentReader } from './src/main/ets/com/drew/imaging/jpeg/JpegSegmentReader';
export { default as JpegSegmentData } from './src/main/ets/com/drew/imaging/jpeg/JpegSegmentData';
export { default as JpegMetadataReader } from './src/main/ets/com/drew/imaging/jpeg/JpegMetadataReader';
export { default as AviMetadataReader } from './src/main/ets/com/drew/imaging/avi/AviMetadataReader';
export { default as BmpMetadataReader } from './src/main/ets/com/drew/imaging/bmp/BmpMetadataReader';
export { default as EpsMetadataReader } from './src/main/ets/com/drew/imaging/eps/EpsMetadataReader';
export { default as GifMetadataReader } from './src/main/ets/com/drew/imaging/gif/GifMetadataReader';
export { default as IcoMetadataReader } from './src/main/ets/com/drew/imaging/ico/IcoMetadataReader';
export { default as Mp3MetadataReader } from './src/main/ets/com/drew/imaging/mp3/Mp3MetadataReader';
export { default as Mp4MetadataReader } from './src/main/ets/com/drew/imaging/mp4/Mp4MetadataReader';
export { default as PcxMetadataReader } from './src/main/ets/com/drew/imaging/pcx/PcxMetadataReader';
export { default as PsdMetadataReader } from './src/main/ets/com/drew/imaging/psd/PsdMetadataReader';
export { default as FileType } from './src/main/ets/com/drew/imaging/FileType';
export { default as WebpMetadataReader } from './src/main/ets/com/drew/imaging/webp/WebpMetadataReader';
export { default as RafMetadataReader } from './src/main/ets/com/drew/imaging/raf/RafMetadataReader';
export { default as WavMetadataReader } from './src/main/ets/com/drew/imaging/wav/WavMetadataReader';
export { default as QuickTimeMetadataReader } from './src/main/ets/com/drew/imaging/quicktime/QuickTimeMetadataReader';
export { default as HeifMetadataReader } from './src/main/ets/com/drew/imaging/heif/HeifMetadataReader';
export { default as TiffMetadataReader } from './src/main/ets/com/drew/imaging/tiff/TiffMetadataReader';
//8-19
export { default as AdobeJpegReader } from './src/main/ets/com/drew/metadata/adobe/AdobeJpegReader';
export { default as AdobeJpegDirectory } from './src/main/ets/com/drew/metadata/adobe/AdobeJpegDirectory';
export { default as FileUtil } from './src/main/ets/com/drew/tools/FileUtil';
export { default as ExifReader } from './src/main/ets/com/drew/metadata/exif/ExifReader';
export { default as KeyValuePair } from './src/main/ets/com/drew/lang/KeyValuePair';
export { default as StringValue } from './src/main/ets/com/drew/metadata/StringValue';
export { default as ExifSubIFDDirectory } from './src/main/ets/com/drew/metadata/exif/ExifSubIFDDirectory';
export { default as ExifIFD0Directory } from './src/main/ets/com/drew/metadata/exif/ExifIFD0Directory';
export { default as JpegDirectory } from './src/main/ets/com/drew/metadata/jpeg/JpegDirectory';
export { default as JpegDescriptor } from './src/main/ets/com/drew/metadata/jpeg/JpegDescriptor';
export { default as JpegDhtReader } from './src/main/ets/com/drew/metadata/jpeg/JpegDhtReader';
export { default as JpegDnlReader } from './src/main/ets/com/drew/metadata/jpeg/JpegDnlReader';
export { default as JpegComponent } from './src/main/ets/com/drew/metadata/jpeg/JpegComponent';
