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
import OlympusCameraSettingsMakernoteDirectory from './makernotes/OlympusCameraSettingsMakernoteDirectory';
import OlympusEquipmentMakernoteDirectory from './makernotes/OlympusEquipmentMakernoteDirectory';
import OlympusMakernoteDirectory from './makernotes/OlympusMakernoteDirectory';
import ExifInteropDirectory from './ExifInteropDirectory';
import GpsDirectory from './GpsDirectory';
import ExifSubIFDDirectory from './ExifSubIFDDirectory';
import PanasonicRawIFD0Directory from './PanasonicRawIFD0Directory';
import ExifDirectoryBase from './ExifDirectoryBase';
import ExifIFD0Directory from './ExifIFD0Directory';
import DirectoryTiffHandler from '../tiff/DirectoryTiffHandler';
import Directory from '../Directory';
import Metadata from '../Metadata';
import StringValue from '../StringValue';
import util from '@ohos.util';
import Charsets from '../../lang/Charsets';
import { SamsungType2MakernoteDirectory } from './makernotes/SamsungType2MakernoteDirectory';
import { ReconyxHyperFire2MakernoteDirectory } from './makernotes/ReconyxHyperFire2MakernoteDirectory';
import { ReconyxUltraFireMakernoteDirectory } from './makernotes/ReconyxUltraFireMakernoteDirectory';
import { ReconyxHyperFireMakernoteDirectory } from './makernotes/ReconyxHyperFireMakernoteDirectory';
import { RicohMakernoteDirectory } from './makernotes/RicohMakernoteDirectory';
import { SanyoMakernoteDirectory } from './makernotes/SanyoMakernoteDirectory';
import PentaxMakernoteDirectory from './makernotes/PentaxMakernoteDirectory';
import PanasonicMakernoteDirectory from './makernotes/PanasonicMakernoteDirectory';
import LeicaMakernoteDirectory from './makernotes/LeicaMakernoteDirectory';
import LeicaType5MakernoteDirectory from './makernotes/LeicaType5MakernoteDirectory';
import { KyoceraMakernoteDirectory } from './makernotes/KyoceraMakernoteDirectory';
import { FujifilmMakernoteDirectory } from './makernotes/FujifilmMakernoteDirectory';
import CasioType1MakernoteDirectory from './makernotes/CasioType1MakernoteDirectory';
import CasioType2MakernoteDirectory from './makernotes/CasioType2MakernoteDirectory';
import CanonMakernoteDirectory from './makernotes/CanonMakernoteDirectory';
import { KodakMakernoteDirectory } from './makernotes/KodakMakernoteDirectory';
import { SigmaMakernoteDirectory } from './makernotes/SigmaMakernoteDirectory';
import SonyType6MakernoteDirectory from './makernotes/SonyType6MakernoteDirectory';
import SonyType1MakernoteDirectory from './makernotes/SonyType1MakernoteDirectory';
import NikonType2MakernoteDirectory from './makernotes/NikonType2MakernoteDirectory';
import NikonType1MakernoteDirectory from './makernotes/NikonType1MakernoteDirectory';
import JpegMetadataReader from '../../imaging/jpeg/JpegMetadataReader';
import PanasonicRawDistortionDirectory from './PanasonicRawDistortionDirectory';
import PanasonicRawWbInfo2Directory from './PanasonicRawWbInfo2Directory';
import PanasonicRawWbInfoDirectory from './PanasonicRawWbInfoDirectory';
import TiffReader from '../../imaging/tiff/TiffReader';
import PrintIMDirectory from './PrintIMDirectory';
import AppleRunTimeReader from '../apple/AppleRunTimeReader';
import AppleMakernoteDirectory from './makernotes/AppleMakernoteDirectory';
import XmpReader from '../xmp/XmpReader';
import PhotoshopReader from '../photoshop/PhotoshopReader';
import ByteArrayReader from '../../lang/ByteArrayReader';
import IccReader from '../icc/IccReader';
import SequentialByteArrayReader from '../../lang/SequentialByteArrayReader';
import { IptcReader } from '../iptc/IptcReader';
import ExifThumbnailDirectory from './ExifThumbnailDirectory';
import ExifImageDirectory from './ExifImageDirectory';
import OlympusRawInfoMakernoteDirectory from './makernotes/OlympusRawInfoMakernoteDirectory';
import OlympusFocusInfoMakernoteDirectory from './makernotes/OlympusFocusInfoMakernoteDirectory';
import OlympusImageProcessingMakernoteDirectory from './makernotes/OlympusImageProcessingMakernoteDirectory';
import OlympusRawDevelopment2MakernoteDirectory from './makernotes/OlympusRawDevelopment2MakernoteDirectory';
import OlympusRawDevelopmentMakernoteDirectory from './makernotes/OlympusRawDevelopmentMakernoteDirectory';

class ExifTiffHandler extends DirectoryTiffHandler {
  constructor(metadata: Metadata, parentDirectory: Directory) {
    super(metadata, parentDirectory);
  }

  public setTiffMarker(marker: number): void
  {
    let standardTiffMarker: number = 0x002A;
    let olympusRawTiffMarker: number = 0x4F52; // for ORF files
    let olympusRawTiffMarker2: number = 0x5352; // for ORF files
    let panasonicRawTiffMarker: number = 0x0055; // for RW2 files

    switch (marker) {
      case standardTiffMarker:
      case olympusRawTiffMarker: // TODO implement an IFD0, if there is one
      case olympusRawTiffMarker2: // TODO implement an IFD0, if there is one
        this.pushDirectory(new ExifIFD0Directory());
        break;
      case panasonicRawTiffMarker:
        this.pushDirectory(new PanasonicRawIFD0Directory());
        break;
      default:
        throw new Error("Unexpected TIFF marker: 0x%X".replace(/%X/, marker.toString()));
    }
  }

  public tryEnterSubIfd(tagId: number): boolean
  {

    if (tagId == ExifDirectoryBase.TAG_SUB_IFD_OFFSET) {
      this.pushDirectory(new ExifSubIFDDirectory());
      return true;
    }

    if (this._currentDirectory instanceof ExifIFD0Directory || this._currentDirectory instanceof PanasonicRawIFD0Directory) {
      if (tagId == ExifIFD0Directory.TAG_EXIF_SUB_IFD_OFFSET) {
        this.pushDirectory(new ExifSubIFDDirectory());
        return true;
      }

      if (tagId == ExifIFD0Directory.TAG_GPS_INFO_OFFSET) {
        this.pushDirectory(new GpsDirectory());
        return true;
      }
    }

    if (this._currentDirectory instanceof ExifSubIFDDirectory) {
      if (tagId == ExifSubIFDDirectory.TAG_INTEROP_OFFSET) {
        this.pushDirectory(new ExifInteropDirectory());
        return true;
      }
    }

    if (this._currentDirectory instanceof OlympusMakernoteDirectory) {
      // Note: these also appear in customProcessTag because some are IFD pointers while others begin immediately
      // for the same directories
      switch (tagId) {
        case OlympusMakernoteDirectory.TAG_EQUIPMENT:
          this.pushDirectory(new OlympusEquipmentMakernoteDirectory());
          return true;
        case OlympusMakernoteDirectory.TAG_CAMERA_SETTINGS:
          this.pushDirectory(new OlympusCameraSettingsMakernoteDirectory());
          return true;
        case OlympusMakernoteDirectory.TAG_RAW_DEVELOPMENT:
          this.pushDirectory(new OlympusRawDevelopmentMakernoteDirectory());
          return true;
        case OlympusMakernoteDirectory.TAG_RAW_DEVELOPMENT_2:
          this.pushDirectory(new OlympusRawDevelopment2MakernoteDirectory());
          return true;
        case OlympusMakernoteDirectory.TAG_IMAGE_PROCESSING:
          this.pushDirectory(new OlympusImageProcessingMakernoteDirectory());
          return true;
        case OlympusMakernoteDirectory.TAG_FOCUS_INFO:
          this.pushDirectory(new OlympusFocusInfoMakernoteDirectory());
          return true;
        case OlympusMakernoteDirectory.TAG_RAW_INFO:
          this.pushDirectory(new OlympusRawInfoMakernoteDirectory());
          return true;
        case OlympusMakernoteDirectory.TAG_MAIN_INFO:
          this.pushDirectory(new OlympusMakernoteDirectory());
          return true;
      }
    }

    return false;
  }
  //
  public hasFollowerIfd(): boolean
  {
    // In Exif, the only known 'follower' IFD is the thumbnail one, however this may not be the case.
    // UPDATE: In multipage TIFFs, the 'follower' IFD points to the next image in the set
    if (this._currentDirectory instanceof ExifIFD0Directory || this._currentDirectory instanceof ExifImageDirectory) {
      // If the PageNumber tag is defined, assume this is a multipage TIFF or similar
      // TODO: Find better ways to know which follower Directory should be used
      if (this._currentDirectory.containsTag(ExifDirectoryBase.TAG_PAGE_NUMBER))
      this.pushDirectory(new ExifImageDirectory());
      else
      this.pushDirectory(new ExifThumbnailDirectory());
      return true;
    }

    // The Canon EOS 7D (CR2) has three chained/following thumbnail IFDs
    if (this._currentDirectory instanceof ExifThumbnailDirectory)
    return true;

    // This should not happen, as Exif doesn't use follower IFDs apart from that above.
    // NOTE have seen the CanonMakernoteDirectory IFD have a follower pointer, but it points to invalid data.
    return false;
  }

  public tryCustomProcessFormat(tagId: number, formatCode: number, componentCount: number): number
  {
    if (formatCode == 13)
    return componentCount * 4;

    // an unknown (0) formatCode needs to be potentially handled later as a highly custom directory tag
    if (formatCode == 0)
    return 0;

    return null;
  }

  public customProcessTag(tagOffset: number,
                          processedIfdOffsets: Set<number>,
                          tiffHeaderOffset: number,
                          reader: RandomAccessReader,
                          tagId: number,
                          byteCount: number): boolean
  {
    // Some 0x0000 tags have a 0 byteCount. Determine whether it's bad.
    if (tagId == 0) {
      if (this._currentDirectory.containsTag(tagId)) {
        // Let it go through for now. Some directories handle it, some don't
        return false;
      }

      // Skip over 0x0000 tags that don't have any associated bytes. No idea what it contains in this case, if anything.
      if (byteCount == 0)
      return true;
    }

    // Custom processing for the Makernote tag
    if (tagId == ExifSubIFDDirectory.TAG_MAKERNOTE && this._currentDirectory instanceof ExifSubIFDDirectory) {
      return this.processMakernote(tagOffset, processedIfdOffsets, tiffHeaderOffset, reader);
    }

    // Custom processing for embedded IPTC data
    if (tagId == ExifSubIFDDirectory.TAG_IPTC_NAA && this._currentDirectory instanceof ExifIFD0Directory) {
      // NOTE Adobe sets type 4 for IPTC instead of 7
      if (reader.getInt8(tagOffset) == 0x1c) {
        let iptcBytes: Int8Array = reader.getBytes(tagOffset, byteCount);
        new IptcReader().extract(new SequentialByteArrayReader(iptcBytes), this._metadata, iptcBytes.length, this._currentDirectory);
        return true;
      }
      return false;
    }

    // Custom processing for ICC Profile data
    if (tagId == ExifSubIFDDirectory.TAG_INTER_COLOR_PROFILE) {
      let iccBytes: Int8Array = reader.getBytes(tagOffset, byteCount);
      new IccReader().extract(new ByteArrayReader(iccBytes), this._metadata, this._currentDirectory);
      return true;
    }

    // Custom processing for Photoshop data
    if (tagId == ExifSubIFDDirectory.TAG_PHOTOSHOP_SETTINGS && this._currentDirectory instanceof ExifIFD0Directory) {
      let photoshopBytes: Int8Array = reader.getBytes(tagOffset, byteCount);
      new PhotoshopReader().extract(new SequentialByteArrayReader(photoshopBytes), byteCount, this._metadata, this._currentDirectory);
      return true;
    }

    // Custom processing for embedded XMP data
    if (tagId == ExifSubIFDDirectory.TAG_APPLICATION_NOTES && (this._currentDirectory instanceof ExifIFD0Directory || this._currentDirectory instanceof ExifSubIFDDirectory)) {
      new XmpReader().extract(reader.getNullTerminatedBytes(tagOffset, byteCount), 0, 0, this._metadata, this._currentDirectory);
      return true;
    }

    // Custom processing for Apple RunTime tag
    if (tagId == AppleMakernoteDirectory.TAG_RUN_TIME && this._currentDirectory instanceof AppleMakernoteDirectory) {
      let bytes: Int8Array = reader.getBytes(tagOffset, byteCount);
      new AppleRunTimeReader().extract(bytes, this._metadata, this._currentDirectory);
      return true;
    }

    if (ExifTiffHandler.handlePrintIM(this._currentDirectory, tagId)) {
      let printIMDirectory: PrintIMDirectory = new PrintIMDirectory();
      printIMDirectory.setParent(this._currentDirectory);
      this._metadata.addDirectory(printIMDirectory);
      ExifTiffHandler.processPrintIM(printIMDirectory, tagOffset, reader, byteCount);
      return true;
    }

    // Note: these also appear in tryEnterSubIfd because some are IFD pointers while others begin immediately
    // for the same directories
    if (this._currentDirectory instanceof OlympusMakernoteDirectory) {
      switch (tagId) {
        case OlympusMakernoteDirectory.TAG_EQUIPMENT:
          this.pushDirectory(new OlympusEquipmentMakernoteDirectory());
          TiffReader.processIfd(this, reader, processedIfdOffsets, tagOffset, tiffHeaderOffset);
          return true;
        case OlympusMakernoteDirectory.TAG_CAMERA_SETTINGS:
          this.pushDirectory(new OlympusCameraSettingsMakernoteDirectory());
          TiffReader.processIfd(this, reader, processedIfdOffsets, tagOffset, tiffHeaderOffset);
          return true;
        case OlympusMakernoteDirectory.TAG_RAW_DEVELOPMENT:
          this.pushDirectory(new OlympusRawDevelopmentMakernoteDirectory());
          TiffReader.processIfd(this, reader, processedIfdOffsets, tagOffset, tiffHeaderOffset);
          return true;
        case OlympusMakernoteDirectory.TAG_RAW_DEVELOPMENT_2:
          this.pushDirectory(new OlympusRawDevelopment2MakernoteDirectory());
          TiffReader.processIfd(this, reader, processedIfdOffsets, tagOffset, tiffHeaderOffset);
          return true;
        case OlympusMakernoteDirectory.TAG_IMAGE_PROCESSING:
          this.pushDirectory(new OlympusImageProcessingMakernoteDirectory());
          TiffReader.processIfd(this, reader, processedIfdOffsets, tagOffset, tiffHeaderOffset);
          return true;
        case OlympusMakernoteDirectory.TAG_FOCUS_INFO:
          this.pushDirectory(new OlympusFocusInfoMakernoteDirectory());
          TiffReader.processIfd(this, reader, processedIfdOffsets, tagOffset, tiffHeaderOffset);
          return true;
        case OlympusMakernoteDirectory.TAG_RAW_INFO:
          this.pushDirectory(new OlympusRawInfoMakernoteDirectory());
          TiffReader.processIfd(this, reader, processedIfdOffsets, tagOffset, tiffHeaderOffset);
          return true;
        case OlympusMakernoteDirectory.TAG_MAIN_INFO:
          this.pushDirectory(new OlympusMakernoteDirectory());
          TiffReader.processIfd(this, reader, processedIfdOffsets, tagOffset, tiffHeaderOffset);
          return true;
      }
    }

    if (this._currentDirectory instanceof PanasonicRawIFD0Directory) {
      // these contain binary data with specific offsets, and can't be processed as regular ifd's.
      // The binary data is broken into 'fake' tags and there is a pattern.
      switch (tagId) {
        case PanasonicRawIFD0Directory.TagWbInfo:
          let dirWbInfo: PanasonicRawWbInfoDirectory = new PanasonicRawWbInfoDirectory();
          dirWbInfo.setParent(this._currentDirectory);
          this._metadata.addDirectory(dirWbInfo);
          ExifTiffHandler.processBinary(dirWbInfo, tagOffset, reader, byteCount, false, 2);
          return true;
        case PanasonicRawIFD0Directory.TagWbInfo2:
          let dirWbInfo2: PanasonicRawWbInfo2Directory = new PanasonicRawWbInfo2Directory();
          dirWbInfo2.setParent(this._currentDirectory);
          this._metadata.addDirectory(dirWbInfo2);
          ExifTiffHandler.processBinary(dirWbInfo2, tagOffset, reader, byteCount, false, 3);
          return true;
        case PanasonicRawIFD0Directory.TagDistortionInfo:
          let dirDistort: PanasonicRawDistortionDirectory = new PanasonicRawDistortionDirectory();
          dirDistort.setParent(this._currentDirectory);
          this._metadata.addDirectory(dirDistort);
          ExifTiffHandler.processBinary(dirDistort, tagOffset, reader, byteCount, true, 1);
          return true;
      }
    }

    // Panasonic RAW sometimes contains an embedded version of the data as a JPG file.
    if (tagId == PanasonicRawIFD0Directory.TagJpgFromRaw && this._currentDirectory instanceof PanasonicRawIFD0Directory) {
       return true;
    }

    return false;
  }

  private static processBinary(directory: Directory, tagValueOffset: number, reader: RandomAccessReader, byteCount: number, isSigned: boolean, arrayLength: number) {
    // expects signed/unsigned int16 (for now)
    //int byteSize = isSigned ? sizeof(short) : sizeof(ushort);
    let byteSize: number = 2;

    // 'directory' is assumed to contain tags that correspond to the byte position unless it's a set of bytes
    for (let i = 0; i < byteCount; i++) {
      if (directory.hasTagName(i)) {
        // only process this tag if the 'next' integral tag exists. Otherwise, it's a set of bytes
        if (i < byteCount - 1 && directory.hasTagName(i + 1)) {
          if (isSigned)
          directory.setObject(i, reader.getInt16(tagValueOffset + (i * byteSize)));
          else
          directory.setObject(i, reader.getUInt16(tagValueOffset + (i * byteSize)));
        } else {
          // the next arrayLength bytes are a multi-byte value
          if (isSigned) {
            let val: number[] = [];
            for (let j = 0; j < arrayLength; j++)
            val[j] = reader.getInt16(tagValueOffset + ((i + j) * byteSize));
            directory.setObjectArray(i, val);
          } else {
            let val: number[] = [];
            for (let j = 0; j < val.length; j++)
            val[j] = reader.getUInt16(tagValueOffset + ((i + j) * byteSize));
            directory.setObjectArray(i, val);
          }

          i += arrayLength - 1;
        }
      }
    }
  }

  /** Read a given number of bytes from the stream
   *
   * This method is employed to "suppress" attempts to read beyond end of the
   * file as may happen at the beginning of processMakernote when we read
   * increasingly longer camera makes.
   *
   * Instead of failing altogether in this context we return an empty string
   * which will fail all sensible attempts to compare to makes while avoiding
   * a full-on failure.
   */
  private static getReaderString(reader: RandomAccessReader, makernoteOffset: number, bytesRequested: number): string
  {
    try {
      return reader.getString(makernoteOffset, bytesRequested, 'UTF_8');
    } catch (e) {
      return "";
    }
  }

  private processMakernote(makernoteOffset: number,
                           processedIfdOffsets: Set<number>,
                           tiffHeaderOffset: number,
                           reader: RandomAccessReader): boolean
  {
    // Determine the camera model and makernote format.
    let ifd0Directory: Directory = this._metadata.getFirstDirectoryOfType(new ExifIFD0Directory());

    let cameraMake: string = ifd0Directory == null ? null : ifd0Directory.getString(ExifIFD0Directory.TAG_MAKE);

    let firstTwoChars: string = ExifTiffHandler.getReaderString(reader, makernoteOffset, 2);
    let firstThreeChars: string = ExifTiffHandler.getReaderString(reader, makernoteOffset, 3);
    let firstFourChars: string = ExifTiffHandler.getReaderString(reader, makernoteOffset, 4);
    let firstFiveChars: string = ExifTiffHandler.getReaderString(reader, makernoteOffset, 5);
    let firstSixChars: string = ExifTiffHandler.getReaderString(reader, makernoteOffset, 6);
    let firstSevenChars: string = ExifTiffHandler.getReaderString(reader, makernoteOffset, 7);
    let firstEightChars: string = ExifTiffHandler.getReaderString(reader, makernoteOffset, 8);
    let firstNineChars: string = ExifTiffHandler.getReaderString(reader, makernoteOffset, 9);
    let firstTenChars: string = ExifTiffHandler.getReaderString(reader, makernoteOffset, 10);
    let firstTwelveChars: string = ExifTiffHandler.getReaderString(reader, makernoteOffset, 12);

    let byteOrderBefore: boolean = reader.isMotorolaByteOrder();

    if ("OLYMP\0" == firstSixChars || "EPSON" == firstFiveChars || "AGFA" == firstFourChars) {
      // Olympus Makernote
      // Epson and Agfa use Olympus makernote standard: http://www.ozhiker.com/electronics/pjmt/jpeg_info/
      this.pushDirectory(new OlympusMakernoteDirectory());
      TiffReader.processIfd(this, reader, processedIfdOffsets, makernoteOffset + 8, tiffHeaderOffset);
    } else if ("OLYMPUS\0II" == firstTenChars) {
      // Olympus Makernote (alternate)
      // Note that data is relative to the beginning of the makernote
      // http://exiv2.org/makernote.html
      this.pushDirectory(new OlympusMakernoteDirectory());
      TiffReader.processIfd(this, reader, processedIfdOffsets, makernoteOffset + 12, makernoteOffset);
    } else if (cameraMake != null && cameraMake.toUpperCase().startsWith("MINOLTA")) {
      // Cases seen with the model starting with MINOLTA in capitals seem to have a valid Olympus makernote
      // area that commences immediately.
      this.pushDirectory(new OlympusMakernoteDirectory());
      TiffReader.processIfd(this, reader, processedIfdOffsets, makernoteOffset, tiffHeaderOffset);
    } else if (cameraMake != null && cameraMake.trim().toUpperCase().startsWith("NIKON")) {
      if ("Nikon" == firstFiveChars) {
        /* There are two scenarios here:
         * Type 1:                  **
         * :0000: 4E 69 6B 6F 6E 00 01 00-05 00 02 00 02 00 06 00 Nikon...........
         * :0010: 00 00 EC 02 00 00 03 00-03 00 01 00 00 00 06 00 ................
         * Type 3:                  **
         * :0000: 4E 69 6B 6F 6E 00 02 00-00 00 4D 4D 00 2A 00 00 Nikon....MM.*...
         * :0010: 00 08 00 1E 00 01 00 07-00 00 00 04 30 32 30 30 ............0200
         */
        switch (reader.getUInt8(makernoteOffset + 6)) {
          case 1:
            this.pushDirectory(new NikonType1MakernoteDirectory());
            TiffReader.processIfd(this, reader, processedIfdOffsets, makernoteOffset + 8, tiffHeaderOffset);
            break;
          case 2:
            this.pushDirectory(new NikonType2MakernoteDirectory());
            TiffReader.processIfd(this, reader, processedIfdOffsets, makernoteOffset + 18, makernoteOffset + 10);
            break;
          default:
            this._currentDirectory.addError("Unsupported Nikon makernote data ignored.");
            break;
        }
      } else {
        // The IFD begins with the first Makernote byte (no ASCII name).  This occurs with CoolPix 775, E990 and D1 models.
        this.pushDirectory(new NikonType2MakernoteDirectory());
        TiffReader.processIfd(this, reader, processedIfdOffsets, makernoteOffset, tiffHeaderOffset);
      }
    } else if ("SONY CAM" == firstEightChars || "SONY DSC" == firstEightChars) {
      this.pushDirectory(new SonyType1MakernoteDirectory());
      TiffReader.processIfd(this, reader, processedIfdOffsets, makernoteOffset + 12, tiffHeaderOffset);
      // Do this check LAST after most other Sony checks
    } else if (cameraMake != null && cameraMake.startsWith("SONY") &&
    !(reader.getBytes(makernoteOffset, 2)[0] == 0x01 && reader.getBytes(makernoteOffset, 2)[1] == 0x00)) {
      // The IFD begins with the first Makernote byte (no ASCII name). Used in SR2 and ARW images
      this.pushDirectory(new SonyType1MakernoteDirectory());
      TiffReader.processIfd(this, reader, processedIfdOffsets, makernoteOffset, tiffHeaderOffset);
    } else if ("SEMC MS\u0000\u0000\u0000\u0000\u0000" == firstTwelveChars) {
      // force MM for this directory
      reader.setMotorolaByteOrder(true);
      // skip 12 byte header + 2 for "MM" + 6
      this.pushDirectory(new SonyType6MakernoteDirectory());
      TiffReader.processIfd(this, reader, processedIfdOffsets, makernoteOffset + 20, tiffHeaderOffset);
    } else if ("SIGMA\u0000\u0000\u0000" == firstEightChars || "FOVEON\u0000\u0000" == firstEightChars) {
      this.pushDirectory(new SigmaMakernoteDirectory());
      TiffReader.processIfd(this, reader, processedIfdOffsets, makernoteOffset + 10, tiffHeaderOffset);
    } else if ("KDK" == firstThreeChars) {
      reader.setMotorolaByteOrder(firstSevenChars == "KDK INFO");
      let directory: KodakMakernoteDirectory = new KodakMakernoteDirectory();
      this._metadata.addDirectory(directory);
      ExifTiffHandler.processKodakMakernote(directory, makernoteOffset, reader);
    } else if (cameraMake != null && "Canon".toUpperCase() == cameraMake.toUpperCase()) {
      this.pushDirectory(new CanonMakernoteDirectory());
      TiffReader.processIfd(this, reader, processedIfdOffsets, makernoteOffset, tiffHeaderOffset);
    } else if (cameraMake != null && cameraMake.toUpperCase().startsWith("CASIO")) {
      if ("QVC\u0000\u0000\u0000" == firstSixChars) {
        this.pushDirectory(new CasioType2MakernoteDirectory());
        TiffReader.processIfd(this, reader, processedIfdOffsets, makernoteOffset + 6, tiffHeaderOffset);
      } else {
        this.pushDirectory(new CasioType1MakernoteDirectory());
        TiffReader.processIfd(this, reader, processedIfdOffsets, makernoteOffset, tiffHeaderOffset);
      }
    } else if ("FUJIFILM" == firstEightChars || (cameraMake != null && "Fujifilm".toUpperCase() == cameraMake.toUpperCase())) {
      // Note that this also applies to certain Leica cameras, such as the Digilux-4.3
      reader.setMotorolaByteOrder(false);
      // the 4 bytes after "FUJIFILM" in the makernote point to the start of the makernote
      // IFD, though the offset is relative to the start of the makernote, not the TIFF
      // header (like everywhere else)
      let ifdStart: number = makernoteOffset + reader.getInt32(makernoteOffset + 8);
      this.pushDirectory(new FujifilmMakernoteDirectory());
      TiffReader.processIfd(this, reader, processedIfdOffsets, ifdStart, makernoteOffset);
    } else if ("KYOCERA" == firstSevenChars) {
      // http://www.ozhiker.com/electronics/pjmt/jpeg_info/kyocera_mn.html
      this.pushDirectory(new KyoceraMakernoteDirectory());
      TiffReader.processIfd(this, reader, processedIfdOffsets, makernoteOffset + 22, tiffHeaderOffset);
    } else if ("LEICA" == firstFiveChars) {
      reader.setMotorolaByteOrder(false);

      // used by the X1/X2/X VARIO/T
      // (X1 starts with "LEICA\0\x01\0", Make is "LEICA CAMERA AG")
      // (X2 starts with "LEICA\0\x05\0", Make is "LEICA CAMERA AG")
      // (X VARIO starts with "LEICA\0\x04\0", Make is "LEICA CAMERA AG")
      // (T (Typ 701) starts with "LEICA\0\0x6", Make is "LEICA CAMERA AG")
      // (X (Typ 113) starts with "LEICA\0\0x7", Make is "LEICA CAMERA AG")

      if ("LEICA\0\u0001\0" == firstEightChars ||
      "LEICA\0\u0004\0" == firstEightChars ||
      "LEICA\0\u0005\0" == firstEightChars ||
      "LEICA\0\u0006\0" == firstEightChars ||
      "LEICA\0\u0007\0" == firstEightChars) {
        this.pushDirectory(new LeicaType5MakernoteDirectory());
        TiffReader.processIfd(this, reader, processedIfdOffsets, makernoteOffset + 8, makernoteOffset);
      } else if ("Leica Camera AG" == cameraMake) {
        this.pushDirectory(new LeicaMakernoteDirectory());
        TiffReader.processIfd(this, reader, processedIfdOffsets, makernoteOffset + 8, tiffHeaderOffset);
      } else if ("LEICA" == cameraMake) {
        // Some Leica cameras use Panasonic makernote tags
        this.pushDirectory(new PanasonicMakernoteDirectory());
        TiffReader.processIfd(this, reader, processedIfdOffsets, makernoteOffset + 8, tiffHeaderOffset);
      } else {
        return false;
      }
    } else if ("Panasonic\u0000\u0000\u0000" == firstTwelveChars) {
      // NON-Standard TIFF IFD Data using Panasonic Tags. There is no Next-IFD pointer after the IFD
      // Offsets are relative to the start of the TIFF header at the beginning of the EXIF segment
      // more information here: http://www.ozhiker.com/electronics/pjmt/jpeg_info/panasonic_mn.html
      this.pushDirectory(new PanasonicMakernoteDirectory());
      TiffReader.processIfd(this, reader, processedIfdOffsets, makernoteOffset + 12, tiffHeaderOffset);
    } else if ("AOC\u0000" == firstFourChars) {
      // NON-Standard TIFF IFD Data using Casio Type 2 Tags
      // IFD has no Next-IFD pointer at end of IFD, and
      // Offsets are relative to the start of the current IFD tag, not the TIFF header
      // Observed for:
      // - Pentax ist D
      this.pushDirectory(new CasioType2MakernoteDirectory());
      TiffReader.processIfd(this, reader, processedIfdOffsets, makernoteOffset + 6, makernoteOffset);
    } else if (cameraMake != null && (cameraMake.toUpperCase().startsWith("PENTAX") || cameraMake.toUpperCase()
      .startsWith("ASAHI"))) {
      // NON-Standard TIFF IFD Data using Pentax Tags
      // IFD has no Next-IFD pointer at end of IFD, and
      // Offsets are relative to the start of the current IFD tag, not the TIFF header
      // Observed for:
      // - PENTAX Optio 330
      // - PENTAX Optio 430
      this.pushDirectory(new PentaxMakernoteDirectory());
      TiffReader.processIfd(this, reader, processedIfdOffsets, makernoteOffset, makernoteOffset);
      //        } else if ("KC".equals(firstTwoChars) || "MINOL".equals(firstFiveChars) || "MLY".equals(firstThreeChars) || "+M+M+M+M".equals(firstEightChars)) {
      //            // This Konica data is not understood.  Header identified in accordance with information at this site:
      //            // http://www.ozhiker.com/electronics/pjmt/jpeg_info/minolta_mn.html
      //            // TODO add support for minolta/konica cameras
      //            exifDirectory.addError("Unsupported Konica/Minolta data ignored.");
    } else if (cameraMake != null && cameraMake.toLowerCase().startsWith("ricoh")) {
      if (firstTwoChars == "Rv" || firstThreeChars == "Rev") {
        // This is a textual format, where the makernote bytes look like:
        //   Rv0103;Rg1C;Bg18;Ll0;Ld0;Aj0000;Bn0473800;Fp2E00:������������������������������
        //   Rv0103;Rg1C;Bg18;Ll0;Ld0;Aj0000;Bn0473800;Fp2D05:������������������������������
        //   Rv0207;Sf6C84;Rg76;Bg60;Gg42;Ll0;Ld0;Aj0004;Bn0B02900;Fp10B8;Md6700;Ln116900086D27;Sv263:0000000000000000000000��
        // This format is currently unsupported
        return false;
      } else if (firstFiveChars.toUpperCase() == "Ricoh") {
        // Always in Motorola byte order
        reader.setMotorolaByteOrder(true);
        this.pushDirectory(new RicohMakernoteDirectory());
        TiffReader.processIfd(this, reader, processedIfdOffsets, makernoteOffset + 8, makernoteOffset);
      }
    } else if (firstTenChars == "Apple iOS\0") {
      // Always in Motorola byte order
      let orderBefore: boolean = reader.isMotorolaByteOrder();
      reader.setMotorolaByteOrder(true);
      this.pushDirectory(new AppleMakernoteDirectory());
      TiffReader.processIfd(this, reader, processedIfdOffsets, makernoteOffset + 14, makernoteOffset);
      reader.setMotorolaByteOrder(orderBefore);
    } else if (reader.getUInt16(makernoteOffset) == ReconyxHyperFireMakernoteDirectory.MAKERNOTE_VERSION) {
      let directory: ReconyxHyperFireMakernoteDirectory = new ReconyxHyperFireMakernoteDirectory();
      this._metadata.addDirectory(directory);
      ExifTiffHandler.processReconyxHyperFireMakernote(directory, makernoteOffset, reader);
    } else if (firstNineChars.toUpperCase() == "RECONYXUF") {
      let directory: ReconyxUltraFireMakernoteDirectory = new ReconyxUltraFireMakernoteDirectory();
      this._metadata.addDirectory(directory);
      ExifTiffHandler.processReconyxUltraFireMakernote(directory, makernoteOffset, reader);
    } else if (firstNineChars.toUpperCase() == "RECONYXH2") {
      let directory: ReconyxHyperFire2MakernoteDirectory = new ReconyxHyperFire2MakernoteDirectory();
      this._metadata.addDirectory(directory);
      ExifTiffHandler.processReconyxHyperFire2Makernote(directory, makernoteOffset, reader);
    } else if (cameraMake != null && "SAMSUNG" == cameraMake.toUpperCase()) {
      // Only handles Type2 notes correctly. Others aren't implemented, and it's complex to determine which ones to use
      this.pushDirectory(new SamsungType2MakernoteDirectory());
      TiffReader.processIfd(this, reader, processedIfdOffsets, makernoteOffset, tiffHeaderOffset);
    } else {
      // The makernote is not comprehended by this library.
      // If you are reading this and believe a particular camera's image should be processed, get in touch.
      return false;
    }

    reader.setMotorolaByteOrder(byteOrderBefore);
    return true;
  }

  private static handlePrintIM(directory: Directory, tagId: number): boolean
  {
    if (tagId == ExifDirectoryBase.TAG_PRINT_IMAGE_MATCHING_INFO)
    return true;

    if (tagId == 0x0E00) {
      // Tempting to say every tagid of 0x0E00 is a PIM tag, but can't be 100% sure
      if (directory instanceof CasioType2MakernoteDirectory ||
      directory instanceof KyoceraMakernoteDirectory ||
      directory instanceof NikonType2MakernoteDirectory ||
      directory instanceof OlympusMakernoteDirectory ||
      directory instanceof PanasonicMakernoteDirectory ||
      directory instanceof PentaxMakernoteDirectory ||
      directory instanceof RicohMakernoteDirectory ||
      directory instanceof SanyoMakernoteDirectory ||
      directory instanceof SonyType1MakernoteDirectory)
      return true;
    }

    return false;
  }

  /**
   * Process PrintIM IFD
   *
   * Converted from Exiftool version 10.33 created by Phil Harvey
   * http://www.sno.phy.queensu.ca/~phil/exiftool/
   * lib\Image\ExifTool\PrintIM.pm
   */
  private static processPrintIM(directory: PrintIMDirectory, tagValueOffset: number, reader: RandomAccessReader, byteCount: number): void
  {
    let resetByteOrder: boolean = null;

    if (byteCount == 0) {
      directory.addError("Empty PrintIM data");
      return;
    }

    if (byteCount <= 15) {
      directory.addError("Bad PrintIM data");
      return;
    }

    let header: string = reader.getString(tagValueOffset, 12, Charsets.UTF_8);

    if (!header.startsWith("PrintIM")) {
      directory.addError("Invalid PrintIM header");
      return;
    }

    // check size of PrintIM block
    let num: number = reader.getUInt16(tagValueOffset + 14);

    if (byteCount < 16 + num * 6) {
      // size is too big, maybe byte ordering is wrong
      resetByteOrder = reader.isMotorolaByteOrder();
      reader.setMotorolaByteOrder(!reader.isMotorolaByteOrder());
      num = reader.getUInt16(tagValueOffset + 14);
      if (byteCount < 16 + num * 6) {
        directory.addError("Bad PrintIM size");
        return;
      }
    }

    directory.setObject(PrintIMDirectory.TagPrintImVersion, header.substring(8, 12));

    for (let n = 0; n < num; n++) {
      let pos: number = tagValueOffset + 16 + n * 6;
      let tag: number = reader.getUInt16(pos);
      let val: number = reader.getUInt32(pos + 2);

      directory.setObject(tag, val);
    }

    if (resetByteOrder != null)
    reader.setMotorolaByteOrder(resetByteOrder);
  }

  private static processKodakMakernote(directory: KodakMakernoteDirectory, tagValueOffset: number, reader: RandomAccessReader): void
  {
    // Kodak's makernote is not in IFD format. It has values at fixed offsets.
    let dataOffset: number = tagValueOffset + 8;
    try {
      directory.setStringValue(KodakMakernoteDirectory.TAG_KODAK_MODEL, reader.getStringValue(dataOffset, 8, Charsets.UTF_8));
      directory.setInt(KodakMakernoteDirectory.TAG_QUALITY, reader.getUInt8(dataOffset + 9));
      directory.setInt(KodakMakernoteDirectory.TAG_BURST_MODE, reader.getUInt8(dataOffset + 10));
      directory.setInt(KodakMakernoteDirectory.TAG_IMAGE_WIDTH, reader.getUInt16(dataOffset + 12));
      directory.setInt(KodakMakernoteDirectory.TAG_IMAGE_HEIGHT, reader.getUInt16(dataOffset + 14));
      directory.setInt(KodakMakernoteDirectory.TAG_YEAR_CREATED, reader.getUInt16(dataOffset + 16));
      directory.setByteArray(KodakMakernoteDirectory.TAG_MONTH_DAY_CREATED, reader.getBytes(dataOffset + 18, 2));
      directory.setByteArray(KodakMakernoteDirectory.TAG_TIME_CREATED, reader.getBytes(dataOffset + 20, 4));
      directory.setInt(KodakMakernoteDirectory.TAG_BURST_MODE_2, reader.getUInt16(dataOffset + 24));
      directory.setInt(KodakMakernoteDirectory.TAG_SHUTTER_MODE, reader.getUInt8(dataOffset + 27));
      directory.setInt(KodakMakernoteDirectory.TAG_METERING_MODE, reader.getUInt8(dataOffset + 28));
      directory.setInt(KodakMakernoteDirectory.TAG_SEQUENCE_NUMBER, reader.getUInt8(dataOffset + 29));
      directory.setInt(KodakMakernoteDirectory.TAG_F_NUMBER, reader.getUInt16(dataOffset + 30));
      directory.setLong(KodakMakernoteDirectory.TAG_EXPOSURE_TIME, reader.getUInt32(dataOffset + 32));
      directory.setInt(KodakMakernoteDirectory.TAG_EXPOSURE_COMPENSATION, reader.getInt16(dataOffset + 36));
      directory.setInt(KodakMakernoteDirectory.TAG_FOCUS_MODE, reader.getUInt8(dataOffset + 56));
      directory.setInt(KodakMakernoteDirectory.TAG_WHITE_BALANCE, reader.getUInt8(dataOffset + 64));
      directory.setInt(KodakMakernoteDirectory.TAG_FLASH_MODE, reader.getUInt8(dataOffset + 92));
      directory.setInt(KodakMakernoteDirectory.TAG_FLASH_FIRED, reader.getUInt8(dataOffset + 93));
      directory.setInt(KodakMakernoteDirectory.TAG_ISO_SETTING, reader.getUInt16(dataOffset + 94));
      directory.setInt(KodakMakernoteDirectory.TAG_ISO, reader.getUInt16(dataOffset + 96));
      directory.setInt(KodakMakernoteDirectory.TAG_TOTAL_ZOOM, reader.getUInt16(dataOffset + 98));
      directory.setInt(KodakMakernoteDirectory.TAG_DATE_TIME_STAMP, reader.getUInt16(dataOffset + 100));
      directory.setInt(KodakMakernoteDirectory.TAG_COLOR_MODE, reader.getUInt16(dataOffset + 102));
      directory.setInt(KodakMakernoteDirectory.TAG_DIGITAL_ZOOM, reader.getUInt16(dataOffset + 104));
      directory.setInt(KodakMakernoteDirectory.TAG_SHARPNESS, reader.getInt8(dataOffset + 107));
    } catch (ex) {
      directory.addError("Error processing Kodak makernote data: " + ex.getMessage());
    }
  }

  private static processReconyxHyperFireMakernote(directory: ReconyxHyperFireMakernoteDirectory, makernoteOffset: number, reader: RandomAccessReader): void
  {
    directory.setObject(ReconyxHyperFireMakernoteDirectory.TAG_MAKERNOTE_VERSION, reader.getUInt16(makernoteOffset));

    let major: number = reader.getUInt16(makernoteOffset + ReconyxHyperFireMakernoteDirectory.TAG_FIRMWARE_VERSION);
    let minor: number = reader.getUInt16(makernoteOffset + ReconyxHyperFireMakernoteDirectory.TAG_FIRMWARE_VERSION + 2);
    let revision: number = reader.getUInt16(makernoteOffset + ReconyxHyperFireMakernoteDirectory.TAG_FIRMWARE_VERSION + 4);
    let buildYear: string = reader.getUInt16(makernoteOffset + ReconyxHyperFireMakernoteDirectory.TAG_FIRMWARE_VERSION + 6)
      .toString(16);
    let buildDate: string = reader.getUInt16(makernoteOffset + ReconyxHyperFireMakernoteDirectory.TAG_FIRMWARE_VERSION + 8)
      .toString(16);
    let buildYearAndDate: string = buildYear + buildDate;
    let build: number;
    try {
      build = parseInt(buildYearAndDate);
    } catch (e) {
      build = null;
    }

    if (build != null) {
      directory.setString(ReconyxHyperFireMakernoteDirectory.TAG_FIRMWARE_VERSION, util.printf("%d.%d.%d.%s", major, minor, revision, build));
    } else {
      directory.setString(ReconyxHyperFireMakernoteDirectory.TAG_FIRMWARE_VERSION, util.printf("%d.%d.%d", major, minor, revision));
      directory.addError("Error processing Reconyx HyperFire makernote data: build '" + buildYearAndDate + "' is not in the expected format and will be omitted from Firmware Version.");
    }

    directory.setString(ReconyxHyperFireMakernoteDirectory.TAG_TRIGGER_MODE, reader.getUInt16(makernoteOffset + ReconyxHyperFireMakernoteDirectory.TAG_TRIGGER_MODE)
      .toString());
    directory.setIntArray(ReconyxHyperFireMakernoteDirectory.TAG_SEQUENCE,
      new Int32Array([reader.getUInt16(makernoteOffset + ReconyxHyperFireMakernoteDirectory.TAG_SEQUENCE),
      reader.getUInt16(makernoteOffset + ReconyxHyperFireMakernoteDirectory.TAG_SEQUENCE + 2)]));

    let eventNumberHigh: number = reader.getUInt16(makernoteOffset + ReconyxHyperFireMakernoteDirectory.TAG_EVENT_NUMBER);
    let eventNumberLow: number = reader.getUInt16(makernoteOffset + ReconyxHyperFireMakernoteDirectory.TAG_EVENT_NUMBER + 2);
    directory.setInt(ReconyxHyperFireMakernoteDirectory.TAG_EVENT_NUMBER, (eventNumberHigh << 16) + eventNumberLow);

    let seconds: number = reader.getUInt16(makernoteOffset + ReconyxHyperFireMakernoteDirectory.TAG_DATE_TIME_ORIGINAL);
    let minutes: number = reader.getUInt16(makernoteOffset + ReconyxHyperFireMakernoteDirectory.TAG_DATE_TIME_ORIGINAL + 2);
    let hour: number = reader.getUInt16(makernoteOffset + ReconyxHyperFireMakernoteDirectory.TAG_DATE_TIME_ORIGINAL + 4);
    let month: number = reader.getUInt16(makernoteOffset + ReconyxHyperFireMakernoteDirectory.TAG_DATE_TIME_ORIGINAL + 6);
    let day: number = reader.getUInt16(makernoteOffset + ReconyxHyperFireMakernoteDirectory.TAG_DATE_TIME_ORIGINAL + 8);
    let year: number = reader.getUInt16(makernoteOffset + ReconyxHyperFireMakernoteDirectory.TAG_DATE_TIME_ORIGINAL + 10);

    if ((seconds >= 0 && seconds < 60) &&
    (minutes >= 0 && minutes < 60) &&
    (hour >= 0 && hour < 24) &&
    (month >= 1 && month < 13) &&
    (day >= 1 && day < 32) &&
    (year >= 1 && year <= 9999)) {
      directory.setString(ReconyxHyperFireMakernoteDirectory.TAG_DATE_TIME_ORIGINAL,
      util.printf("%d:%d:%d %d:%d:%d", year, month, day, hour, minutes, seconds));
    } else {
      directory.addError("Error processing Reconyx HyperFire makernote data: Date/Time Original " + year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds + " is not a valid date/time.");
    }

    directory.setInt(ReconyxHyperFireMakernoteDirectory.TAG_MOON_PHASE, reader.getUInt16(makernoteOffset + ReconyxHyperFireMakernoteDirectory.TAG_MOON_PHASE));
    directory.setInt(ReconyxHyperFireMakernoteDirectory.TAG_AMBIENT_TEMPERATURE_FAHRENHEIT, reader.getInt16(makernoteOffset + ReconyxHyperFireMakernoteDirectory.TAG_AMBIENT_TEMPERATURE_FAHRENHEIT));
    directory.setInt(ReconyxHyperFireMakernoteDirectory.TAG_AMBIENT_TEMPERATURE, reader.getInt16(makernoteOffset + ReconyxHyperFireMakernoteDirectory.TAG_AMBIENT_TEMPERATURE));
    //directory.setByteArray(ReconyxHyperFireMakernoteDirectory.TAG_SERIAL_NUMBER, reader.getBytes(makernoteOffset + ReconyxHyperFireMakernoteDirectory.TAG_SERIAL_NUMBER, 28));
    directory.setStringValue(ReconyxHyperFireMakernoteDirectory.TAG_SERIAL_NUMBER, new StringValue(reader.getBytes(makernoteOffset + ReconyxHyperFireMakernoteDirectory.TAG_SERIAL_NUMBER, 28), Charsets.UTF_16LE));
    // two unread bytes: the serial number's terminating null

    directory.setInt(ReconyxHyperFireMakernoteDirectory.TAG_CONTRAST, reader.getUInt16(makernoteOffset + ReconyxHyperFireMakernoteDirectory.TAG_CONTRAST));
    directory.setInt(ReconyxHyperFireMakernoteDirectory.TAG_BRIGHTNESS, reader.getUInt16(makernoteOffset + ReconyxHyperFireMakernoteDirectory.TAG_BRIGHTNESS));
    directory.setInt(ReconyxHyperFireMakernoteDirectory.TAG_SHARPNESS, reader.getUInt16(makernoteOffset + ReconyxHyperFireMakernoteDirectory.TAG_SHARPNESS));
    directory.setInt(ReconyxHyperFireMakernoteDirectory.TAG_SATURATION, reader.getUInt16(makernoteOffset + ReconyxHyperFireMakernoteDirectory.TAG_SATURATION));
    directory.setInt(ReconyxHyperFireMakernoteDirectory.TAG_INFRARED_ILLUMINATOR, reader.getUInt16(makernoteOffset + ReconyxHyperFireMakernoteDirectory.TAG_INFRARED_ILLUMINATOR));
    directory.setInt(ReconyxHyperFireMakernoteDirectory.TAG_MOTION_SENSITIVITY, reader.getUInt16(makernoteOffset + ReconyxHyperFireMakernoteDirectory.TAG_MOTION_SENSITIVITY));
    directory.setDouble(ReconyxHyperFireMakernoteDirectory.TAG_BATTERY_VOLTAGE, reader.getUInt16(makernoteOffset + ReconyxHyperFireMakernoteDirectory.TAG_BATTERY_VOLTAGE) / 1000.0);
    directory.setString(ReconyxHyperFireMakernoteDirectory.TAG_USER_LABEL, reader.getNullTerminatedString(makernoteOffset + ReconyxHyperFireMakernoteDirectory.TAG_USER_LABEL, 44, Charsets.UTF_8));
  }

  private static processReconyxHyperFire2Makernote(directory: ReconyxHyperFire2MakernoteDirectory, makernoteOffset: number, reader: RandomAccessReader): void
  {

    let major: number = reader.getUInt16(makernoteOffset + ReconyxHyperFire2MakernoteDirectory.TAG_FIRMWARE_VERSION);
    let minor: number = reader.getUInt16(makernoteOffset + ReconyxHyperFire2MakernoteDirectory.TAG_FIRMWARE_VERSION + 2);
    let revision: number = reader.getUInt16(makernoteOffset + ReconyxHyperFireMakernoteDirectory.TAG_FIRMWARE_VERSION + 4);
    let buildYear: string = reader.getUInt16(makernoteOffset + ReconyxHyperFire2MakernoteDirectory.TAG_FIRMWARE_VERSION + 6)
      .toString(16);
    let buildDate: string = reader.getUInt16(makernoteOffset + ReconyxHyperFire2MakernoteDirectory.TAG_FIRMWARE_VERSION + 8)
      .toString(16);
    let buildYearAndDate: string = buildYear + buildDate;
    let build: number;
    try {
      build = parseInt(buildYearAndDate);
    } catch (e) {
      build = null;
    }

    if (build != null) {
      directory.setString(ReconyxHyperFire2MakernoteDirectory.TAG_FIRMWARE_VERSION, util.printf("%d.%d.%d.%s", major, minor, revision, build));
    } else {
      directory.setString(ReconyxHyperFire2MakernoteDirectory.TAG_FIRMWARE_VERSION, util.printf("%d.%d.%d", major, minor, revision));
      directory.addError("Error processing Reconyx HyperFire 2 makernote data: build '" + buildYearAndDate + "' is not in the expected format and will be omitted from Firmware Version.");
    }

    directory.setIntArray(ReconyxHyperFire2MakernoteDirectory.TAG_SEQUENCE,
      new Int32Array([reader.getUInt16(makernoteOffset + ReconyxHyperFire2MakernoteDirectory.TAG_SEQUENCE),
      reader.getUInt16(makernoteOffset + ReconyxHyperFire2MakernoteDirectory.TAG_SEQUENCE + 2)]));

    let eventNumberHigh: number = reader.getUInt16(makernoteOffset + ReconyxHyperFire2MakernoteDirectory.TAG_EVENT_NUMBER);
    let eventNumberLow: number = reader.getUInt16(makernoteOffset + ReconyxHyperFire2MakernoteDirectory.TAG_EVENT_NUMBER + 2);
    directory.setInt(ReconyxHyperFire2MakernoteDirectory.TAG_EVENT_NUMBER, (eventNumberHigh << 16) + eventNumberLow);

    let seconds: number = reader.getUInt16(makernoteOffset + ReconyxHyperFire2MakernoteDirectory.TAG_DATE_TIME_ORIGINAL);
    let minutes: number = reader.getUInt16(makernoteOffset + ReconyxHyperFire2MakernoteDirectory.TAG_DATE_TIME_ORIGINAL + 2);
    let hour: number = reader.getUInt16(makernoteOffset + ReconyxHyperFire2MakernoteDirectory.TAG_DATE_TIME_ORIGINAL + 4);
    let month: number = reader.getUInt16(makernoteOffset + ReconyxHyperFire2MakernoteDirectory.TAG_DATE_TIME_ORIGINAL + 6);
    let day: number = reader.getUInt16(makernoteOffset + ReconyxHyperFire2MakernoteDirectory.TAG_DATE_TIME_ORIGINAL + 8);
    let year: number = reader.getUInt16(makernoteOffset + ReconyxHyperFire2MakernoteDirectory.TAG_DATE_TIME_ORIGINAL + 10);

    if ((seconds >= 0 && seconds < 60) &&
    (minutes >= 0 && minutes < 60) &&
    (hour >= 0 && hour < 24) &&
    (month >= 1 && month < 13) &&
    (day >= 1 && day < 32) &&
    (year >= 1 && year <= 9999)) {
      directory.setString(ReconyxHyperFire2MakernoteDirectory.TAG_DATE_TIME_ORIGINAL,
      util.printf("%d:%d:%d %d:%d:%d", year, month, day, hour, minutes, seconds));
    } else {
      directory.addError("Error processing Reconyx HyperFire 2 makernote data: Date/Time Original " + year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds + " is not a valid date/time.");
    }

    directory.setInt(ReconyxHyperFire2MakernoteDirectory.TAG_MOON_PHASE, reader.getUInt16(makernoteOffset + ReconyxHyperFire2MakernoteDirectory.TAG_MOON_PHASE));
    directory.setInt(ReconyxHyperFire2MakernoteDirectory.TAG_AMBIENT_TEMPERATURE_FAHRENHEIT, reader.getInt16(makernoteOffset + ReconyxHyperFire2MakernoteDirectory.TAG_AMBIENT_TEMPERATURE_FAHRENHEIT));
    directory.setInt(ReconyxHyperFire2MakernoteDirectory.TAG_AMBIENT_TEMPERATURE, reader.getInt16(makernoteOffset + ReconyxHyperFire2MakernoteDirectory.TAG_AMBIENT_TEMPERATURE));

    directory.setInt(ReconyxHyperFire2MakernoteDirectory.TAG_CONTRAST, reader.getUInt16(makernoteOffset + ReconyxHyperFire2MakernoteDirectory.TAG_CONTRAST));
    directory.setInt(ReconyxHyperFire2MakernoteDirectory.TAG_BRIGHTNESS, reader.getUInt16(makernoteOffset + ReconyxHyperFire2MakernoteDirectory.TAG_BRIGHTNESS));
    directory.setInt(ReconyxHyperFire2MakernoteDirectory.TAG_SHARPNESS, reader.getUInt16(makernoteOffset + ReconyxHyperFire2MakernoteDirectory.TAG_SHARPNESS));
    directory.setInt(ReconyxHyperFire2MakernoteDirectory.TAG_SATURATION, reader.getUInt16(makernoteOffset + ReconyxHyperFire2MakernoteDirectory.TAG_SATURATION));
    directory.setInt(ReconyxHyperFire2MakernoteDirectory.TAG_FLASH, reader.getByte(makernoteOffset + ReconyxHyperFire2MakernoteDirectory.TAG_FLASH));
    directory.setInt(ReconyxHyperFire2MakernoteDirectory.TAG_AMBIENT_INFRARED, reader.getUInt16(makernoteOffset + ReconyxHyperFire2MakernoteDirectory.TAG_AMBIENT_INFRARED));
    directory.setInt(ReconyxHyperFire2MakernoteDirectory.TAG_AMBIENT_LIGHT, reader.getUInt16(makernoteOffset + ReconyxHyperFire2MakernoteDirectory.TAG_AMBIENT_LIGHT));
    directory.setInt(ReconyxHyperFire2MakernoteDirectory.TAG_MOTION_SENSITIVITY, reader.getUInt16(makernoteOffset + ReconyxHyperFire2MakernoteDirectory.TAG_MOTION_SENSITIVITY));
    directory.setDouble(ReconyxHyperFire2MakernoteDirectory.TAG_BATTERY_VOLTAGE, reader.getUInt16(makernoteOffset + ReconyxHyperFire2MakernoteDirectory.TAG_BATTERY_VOLTAGE) / 1000.0);
    directory.setDouble(ReconyxHyperFire2MakernoteDirectory.TAG_BATTERY_VOLTAGE_AVG, reader.getUInt16(makernoteOffset + ReconyxHyperFire2MakernoteDirectory.TAG_BATTERY_VOLTAGE_AVG) / 1000.0);


    directory.setString(ReconyxHyperFireMakernoteDirectory.TAG_USER_LABEL, reader.getNullTerminatedString(makernoteOffset + ReconyxHyperFireMakernoteDirectory.TAG_USER_LABEL, 44, Charsets.UTF_8));
    directory.setStringValue(ReconyxHyperFire2MakernoteDirectory.TAG_SERIAL_NUMBER, new StringValue(reader.getBytes(makernoteOffset + ReconyxHyperFire2MakernoteDirectory.TAG_SERIAL_NUMBER, 28), Charsets.UTF_16LE));
    // two unread bytes: the serial number's terminating null
  }

  private static processReconyxUltraFireMakernote(directory: ReconyxUltraFireMakernoteDirectory, makernoteOffset: number, reader: RandomAccessReader): void
  {
    directory.setString(ReconyxUltraFireMakernoteDirectory.TAG_LABEL, reader.getString(makernoteOffset, 9, Charsets.UTF_8));

    directory.setString(ReconyxUltraFireMakernoteDirectory.TAG_EVENT_TYPE, reader.getString(makernoteOffset + ReconyxUltraFireMakernoteDirectory.TAG_EVENT_TYPE, 1, Charsets.UTF_8));
    directory.setIntArray(ReconyxUltraFireMakernoteDirectory.TAG_SEQUENCE,
      new Int32Array([reader.getByte(makernoteOffset + ReconyxUltraFireMakernoteDirectory.TAG_SEQUENCE),
      reader.getByte(makernoteOffset + ReconyxUltraFireMakernoteDirectory.TAG_SEQUENCE + 1)]));

    directory.setInt(ReconyxUltraFireMakernoteDirectory.TAG_MOON_PHASE, reader.getByte(makernoteOffset + ReconyxUltraFireMakernoteDirectory.TAG_MOON_PHASE));

    directory.setInt(ReconyxUltraFireMakernoteDirectory.TAG_FLASH, reader.getByte(makernoteOffset + ReconyxUltraFireMakernoteDirectory.TAG_FLASH));
    directory.setStringValue(ReconyxUltraFireMakernoteDirectory.TAG_SERIAL_NUMBER, new StringValue(reader.getBytes(makernoteOffset + ReconyxUltraFireMakernoteDirectory.TAG_SERIAL_NUMBER, 14), Charsets.UTF_8));
    directory.setString(ReconyxUltraFireMakernoteDirectory.TAG_USER_LABEL, reader.getNullTerminatedString(makernoteOffset + ReconyxUltraFireMakernoteDirectory.TAG_USER_LABEL, 20, Charsets.UTF_8));
  }
}

export default ExifTiffHandler

