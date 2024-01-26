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

class ByteConvert {
  public static toInt32BigEndian(bytes: Int8Array): number {
    return (bytes[0] << 24 & 0xFF000000) |
    (bytes[1] << 16 & 0xFF0000) |
    (bytes[2] << 8 & 0xFF00) |
    (bytes[3] & 0xFF);
  }

  public static toInt32LittleEndian(bytes: Int8Array): number {
    return (bytes[0] & 0xFF) |
    (bytes[1] << 8 & 0xFF00) |
    (bytes[2] << 16 & 0xFF0000) |
    (bytes[3] << 24 & 0xFF000000);
  }
}

export default ByteConvert;