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

import Box from './Box'
import SequentialReader from '../../../lang/SequentialReader'
import Mp4Directory from '../Mp4Directory'

export default class UserDataBox extends Box {
  private static readonly LOCATION_CODE: number = 0xA978797A; // "©xyz"

  private static readonly COORDINATE_PATTERN: RegExp = new RegExp("([+-]\\d+\\.\\d+)([+-]\\d+\\.\\d+)");
  private coordinateString: string;
  public constructor(reader: SequentialReader, box: Box, length: number) {
    super(reader, box);
    while (reader.getPosition() < length) {
      let size = reader.getUInt32();
      if (size <= 4)
      break;
      let kind = reader.getInt32();
      if (kind == UserDataBox.LOCATION_CODE) {
        let xyzLength = reader.getUInt16();
        reader.skip(2);
        this.coordinateString = reader.getString(xyzLength, "UTF-8");
      } else if (size >= 8) {
        reader.skip(size - 8);
      } else {
        return;
      }
    }
  }

  public addMetadata(directory: Mp4Directory): void {
    if (this.coordinateString != null) {
      //            let  matcher = UserDataBox.COORDINATE_PATTERN.matcher(coordinateString);
      //            if (matcher.find()) {
      //                final double latitude = Double.parseDouble(matcher.group(1));
      //                final double longitude = Double.parseDouble(matcher.group(2));
      //
      //                directory.setDouble(TAG_LATITUDE, latitude);
      //                directory.setDouble(TAG_LONGITUDE, longitude);
      //            }
    }
  }
}