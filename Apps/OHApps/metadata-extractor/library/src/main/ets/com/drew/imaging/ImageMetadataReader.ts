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

import FileTypeDirectory from '../metadata/file/FileTypeDirectory';
import FileTypeDetector from './FileTypeDetector';
import AviMetadataReader from './avi/AviMetadataReader';
import Mp4MetadataReader from './mp4/Mp4MetadataReader';
import PcxMetadataReader from './pcx/PcxMetadataReader';
import IcoMetadataReader from './ico/IcoMetadataReader';
import PngMetadataReader from './png/PngMetadataReader'
import WebpMetadataReader from './webp/WebpMetadataReader'
import JpegMetadataReader from './jpeg/JpegMetadataReader'
import Metadata from '../metadata/Metadata';
import FileType from './FileType';
import Mp3MetadataReader from './mp3/Mp3MetadataReader';
import GifMetadataReader from './gif/GifMetadataReader';
import EpsMetadataReader from './eps/EpsMetadataReader';
import BmpMetadataReader from './bmp/BmpMetadataReader';
// add 8-12
import PsdMetadataReader from './psd/PsdMetadataReader'
// add 8-15
import RafMetadataReader from './raf/RafMetadataReader'
import WavMetadataReader from './wav/WavMetadataReader'
import TiffMetadataReader from './tiff/TiffMetadataReader'
import HeifMetadataReader from './heif/HeifMetadataReader'

import QuickTimeMetadataReader from './quicktime/QuickTimeMetadataReader'

/**
 * Reads metadata from any supported file format.
 * <p>
 * This class a lightweight wrapper around other, specific metadata processors.
 * During extraction, the file type is determined from the first few bytes of the file.
 * Parsing is then delegated to one of:
 *
 * <ul>
 *     <li>{@link AviMetadataReader} for AVI files</li>
 *     <li>{@link BmpMetadataReader} for BMP files</li>
 *     <li>{@link FileSystemMetadataReader} for metadata from the file system when a {@link File} is provided</li>
 *     <li>{@link GifMetadataReader} for GIF files</li>
 *     <li>{@link IcoMetadataReader} for ICO files</li>
 *     <li>{@link JpegMetadataReader} for JPEG files</li>
 *     <li>{@link Mp4MetadataReader} for MPEG-4 files</li>
 *     <li>{@link PcxMetadataReader} for PCX files</li>
 *     <li>{@link PngMetadataReader} for PNG files</li>
 *     <li>{@link PsdMetadataReader} for Photoshop files</li>
 *     <li>{@link QuickTimeMetadataReader} for QuickTime files</li>
 *     <li>{@link RafMetadataReader} for RAF files</li>
 *     <li>{@link TiffMetadataReader} for TIFF and (most) RAW files</li>
 *     <li>{@link WavMetadataReader} for WAV files</li>
 *     <li>{@link WebpMetadataReader} for WebP files</li>
 * </ul>
 *
 * If you know the file type you're working with, you may use one of the above processors directly.
 * For most scenarios it is simpler, more convenient and more robust to use this class.
 * <p>
 * {@link FileTypeDetector} is used to determine the provided image's file type, and therefore
 * the appropriate metadata reader to use.
 *
 * @author Drew Noakes https://drewnoakes.com
 */
class ImageMetadataReader {

  /**
       * Reads metadata from an {@link InputStream} of known length and file type.
       *
       * @param inputStream a stream from which the file data may be read.  The stream must be positioned at the
       *                    beginning of the file's data.
       * @param streamLength the length of the stream, if known, otherwise -1.
       * @param fileType the file type of the data stream.
       * @return a populated {@link Metadata} object containing directories of tags with values and any processing errors.
       * @throws ImageProcessingException if the file type is unknown, or for general processing errors.
       */
  public static readMetadata(filePath: string): Metadata
  {

    if(filePath==null || filePath == '' || filePath== undefined){
      throw  new Error("file path must available ")
    }
    let metadata = new Metadata();
    let fileType = FileTypeDetector.detectFileType(filePath);
    switch (fileType) {
      case FileType.Jpeg:
        metadata = JpegMetadataReader.readMetadata(filePath);
        break;
      case FileType.Tiff:
      case FileType.Arw:
      case FileType.Cr2:
      case FileType.Nef:
      case FileType.Orf:
      case FileType.Rw2:
        metadata = TiffMetadataReader.readMetadata(filePath);
        break;
      case FileType.Psd:
        metadata = PsdMetadataReader.readMetadata(filePath);
        break;
      case FileType.Png:
        metadata = PngMetadataReader.readMetadata(filePath);
        break;
      case FileType.Bmp:
        return BmpMetadataReader.readMetadata(filePath);
      case FileType.Gif:
        metadata = GifMetadataReader.readMetadata(filePath);
        break;
      case FileType.Ico:
        metadata = IcoMetadataReader.readMetadata(filePath);
        break;
      case FileType.Pcx:
        metadata = PcxMetadataReader.readMetadata(filePath);
        break;
      case FileType.WebP:
        metadata = WebpMetadataReader.readMetadata(filePath);
        break;
      case FileType.Raf:
        metadata = RafMetadataReader.readMetadata(filePath)
        break;
      case FileType.Avi:
        metadata = AviMetadataReader.readMetadata(filePath);
        break;
      case FileType.Wav:
        metadata = WavMetadataReader.readMetadata(filePath);
        break;
      case FileType.Mp4:
        metadata = Mp4MetadataReader.readMetadata(filePath);
        break;
      case FileType.QuickTime:
        metadata = QuickTimeMetadataReader.readMetadata(filePath);
        break;
      case FileType.Mp3:
        metadata = Mp3MetadataReader.readMetadata(filePath);
        break;
      case FileType.Eps:
        metadata = EpsMetadataReader.readMetadata(filePath);
      case FileType.Heif:
        metadata= HeifMetadataReader.readMetadata(filePath);
      case FileType.Unknown: {
        throw new Error("File format could not be determined");
      }
    }
    metadata.addDirectory(new FileTypeDirectory(fileType));

    return metadata;
  }

  constructor() {
    throw new Error("Not intended for instantiation");
  }
}

export default ImageMetadataReader
