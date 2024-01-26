/*
* Copyright (C) 2022 Huawei Device Co., Ltd.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import ByteArrayReader from '../../lang/ByteArrayReader';
import WavDirectory from './WavDirectory';
import Metadata from '../Metadata';
import RiffHandler from '../../imaging/riff/RiffHandler';
import util from '@ohos.util';
import StringValue      from '../StringValue'

class WavRiffHandler implements RiffHandler {
  private _directory: WavDirectory;
  private _currentList: string = "";
  private metadata:Metadata;
  public constructor(metadata: Metadata) {
    this._directory = new WavDirectory();
    metadata.addDirectory(this._directory);

  }

  public shouldAcceptRiffIdentifier(identifier: string): boolean {
    return identifier == WavDirectory.FORMAT;
  }

  public shouldAcceptChunk(fourCC: string): boolean {
    return fourCC == WavDirectory.CHUNK_FORMAT
    || (this._currentList == WavDirectory.LIST_INFO && WavDirectory._tagIntegerMap.has(fourCC))
    || fourCC == WavDirectory.CHUNK_DATA;
  }

  public shouldAcceptList(fourCC: string): boolean {
    if (fourCC == WavDirectory.LIST_INFO) {
      this._currentList = WavDirectory.LIST_INFO;
      return true;
    } else {
      this._currentList = "";
      return false;
    }
  }

  public processChunk(fourCC: string, payload: Int8Array): void {
    try {
      if (fourCC == WavDirectory.CHUNK_FORMAT) {
        let reader: ByteArrayReader = new ByteArrayReader(payload);
        reader.setMotorolaByteOrder(false);
        let wFormatTag: number = reader.getInt16(0);
        let wChannels: number = reader.getInt16(2);
        let dwSamplesPerSec: number = reader.getInt32(4);
        let dwAvgBytesPerSec: number = reader.getInt32(8);
        let wBlockAlign: number = reader.getInt16(12);
        switch (wFormatTag) {
        // Microsoft Pulse Code Modulation (PCM)
          case (0x0001):
            let wBitsPerSample: number = reader.getInt16(14);
            this._directory.setInt(WavDirectory.TAG_BITS_PER_SAMPLE, wBitsPerSample);
            this._directory.setString(WavDirectory.TAG_FORMAT, WavDirectory._audioEncodingMap.get(wFormatTag));
            break;
          default:
            if (WavDirectory._audioEncodingMap.has(wFormatTag)) {
              this._directory.setString(WavDirectory.TAG_FORMAT, WavDirectory._audioEncodingMap.get(wFormatTag));
            } else {
              this._directory.setString(WavDirectory.TAG_FORMAT, "Unknown");
            }
        }

        this._directory.setInt(WavDirectory.TAG_CHANNELS, wChannels);
        this._directory.setInt(WavDirectory.TAG_SAMPLES_PER_SEC, dwSamplesPerSec);
        this._directory.setInt(WavDirectory.TAG_BYTES_PER_SEC, dwAvgBytesPerSec);
        this._directory.setInt(WavDirectory.TAG_BLOCK_ALIGNMENT, wBlockAlign);
      } else if (fourCC == WavDirectory.CHUNK_DATA) {
        try {
          if (this._directory.containsTag(WavDirectory.TAG_BYTES_PER_SEC)) {
            let duration: number = payload.length / this._directory.getDouble(WavDirectory.TAG_BYTES_PER_SEC);
            let hours: number = parseInt(String(duration / (Math.pow(60, 2))).split('.')[0]);
            let hoursStr: string = String(duration / (Math.pow(60, 2))).split('.')[0];
            if (hoursStr != null && hoursStr.length == 1) {
              hoursStr = '0' + hoursStr;
            }
            let minutes: number = parseInt(String(duration / Math.pow(60, 1) - (hours * 60)).split('.')[0]);
            let minutesStr: string = String(duration / Math.pow(60, 1) - (hours * 60)).split('.')[0];
            if (minutesStr != null && minutesStr.length == 1) {
              minutesStr = '0' + minutesStr;
            }
            let secondsStr: string = String(Math.round((duration / (Math.pow(60, 0))) - (minutes * 60))).split('.')[0];
            if (secondsStr != null && secondsStr.length == 1) {
              secondsStr = '0' + secondsStr;
            }
            let time: string = hoursStr+':'+minutesStr+":"+secondsStr;
            this._directory.setString(WavDirectory.TAG_DURATION, time);
          }
        } catch (ex: any) {
          this._directory.addError("Error calculating duration: bytes per second not found");
        }
      } else if (WavDirectory._tagIntegerMap.has(fourCC)) {
        this._directory.setString(WavDirectory._tagIntegerMap.get(fourCC), new String(payload).substring(0, payload.length - 1));
      }
    } catch (ex: any) {
      this._directory.addError(ex.getMessage());
    }

  }

  public addError(message: string): void {
    this._directory.addError(message);
  }
}

export default WavRiffHandler
