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

import AviDirectory    from './AviDirectory'
import ByteArrayReader from '../../lang/ByteArrayReader'
import Metadata        from '../Metadata'
import RiffHandler     from '../../imaging/riff/RiffHandler'
import StringValue     from '../StringValue'

class AviRiffHandler implements RiffHandler {
  private readonly _directory: AviDirectory;

  public constructor(metadata: Metadata) {
    this._directory = new AviDirectory();
    metadata.addDirectory(this._directory);
  }

  public shouldAcceptRiffIdentifier(identifier: string): boolean {
    return identifier == AviDirectory.FORMAT;
  }

  public shouldAcceptChunk(fourCC: string): boolean {
    return fourCC == AviDirectory.CHUNK_STREAM_HEADER
    || fourCC == AviDirectory.CHUNK_MAIN_HEADER
    || fourCC == AviDirectory.CHUNK_DATETIME_ORIGINAL;
  }

  public shouldAcceptList(fourCC: string): boolean {
    return fourCC == AviDirectory.LIST_HEADER
    || fourCC == AviDirectory.LIST_STREAM_HEADER
    || fourCC == AviDirectory.FORMAT;
  }

  public processChunk(fourCC: string, payload: Int8Array): void {
    if (fourCC == AviDirectory.CHUNK_STREAM_HEADER) {
      let reader: ByteArrayReader = new ByteArrayReader(payload);
      reader.setMotorolaByteOrder(false);

      let fccType: string = StringValue.Int8Array2String(reader.getBytes(0, 4), 'utf-8');
      let fccHandler: string = StringValue.Int8Array2String(reader.getBytes(4, 4), 'utf-8');
      //                int dwFlags = reader.getInt32(8);
      //                int wPriority = reader.getInt16(12);
      //                int wLanguage = reader.getInt16(14);
      //                int dwInitialFrames = reader.getInt32(16);
      let dwScale: number = reader.getFloat32(20);
      let dwRate: number = reader.getFloat32(24);
      //                int dwStart = reader.getInt32(28);
      let dwLength: number = reader.getInt32(32);
      //                int dwSuggestedBufferSize = reader.getInt32(36);
      //                int dwQuality = reader.getInt32(40);
      //                int dwSampleSize = reader.getInt32(44);
      //                byte[] rcFrame = reader.getBytes(48, 2);

      if (fccType == "vids") {
        if (!this._directory.containsTag(AviDirectory.TAG_FRAMES_PER_SECOND)) {
          this._directory.setDouble(AviDirectory.TAG_FRAMES_PER_SECOND, (dwRate / dwScale));

          let duration: number = dwLength / (dwRate / dwScale);
          let hours: number = duration / (Math.pow(60, 2));
          let minutes: number = (duration / Math.pow(60, 1)) - (hours * 60);
          let seconds: number = Math.round((duration / (Math.pow(60, 0))) - (minutes * 60));
          let time: string = "%1$02d:%2$02d:%3$02d".replace(/%1/, hours.toString())
            .replace(/%2/, minutes.toString()).replace(/%3/, seconds.toString());

          this._directory.setString(AviDirectory.TAG_DURATION, time);
          this._directory.setString(AviDirectory.TAG_VIDEO_CODEC, fccHandler);
        }
      } else if (fccType == "auds") {
        if (!this._directory.containsTag(AviDirectory.TAG_SAMPLES_PER_SECOND)) {
          this._directory.setDouble(AviDirectory.TAG_SAMPLES_PER_SECOND, (dwRate / dwScale));
        }
      }
    } else if (fourCC == AviDirectory.CHUNK_MAIN_HEADER) {
      let reader: ByteArrayReader = new ByteArrayReader(payload);
      reader.setMotorolaByteOrder(false);

      //                int dwMicroSecPerFrame = reader.getInt32(0);
      //                int dwMaxBytesPerSec = reader.getInt32(4);
      //                int dwPaddingGranularity = reader.getInt32(8);
      //                int dwFlags = reader.getInt32(12);
      //                int dwTotalFrames = reader.getInt32(16);
      //                int dwInitialFrames = reader.getInt32(20);
      let dwStreams: number = reader.getInt32(24);
      //                int dwSuggestedBufferSize = reader.getInt32(28);
      let dwWidth: number = reader.getInt32(32);
      let dwHeight: number = reader.getInt32(36);
      //                byte[] dwReserved = reader.getBytes(40, 4);

      this._directory.setInt(AviDirectory.TAG_WIDTH, dwWidth);
      this._directory.setInt(AviDirectory.TAG_HEIGHT, dwHeight);
      this._directory.setInt(AviDirectory.TAG_STREAMS, dwStreams);
    } else if (fourCC == AviDirectory.CHUNK_DATETIME_ORIGINAL) {
      let reader: ByteArrayReader = new ByteArrayReader(payload);
      let str: string = reader.getString(0, payload.length, "ASCII");
      let charArray: Array<number> = [0x0A, 0x00]
      if (str.length == 26 && str.endsWith(charArray.toString())) {
        // ?0A 00? "New Line" + padded to nearest WORD boundary
        str = str.substring(0, 24);
      }
      this._directory.setString(AviDirectory.TAG_DATETIME_ORIGINAL, str);
    }
  }
}

export default AviRiffHandler