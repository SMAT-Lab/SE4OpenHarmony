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

import SequentialReader from '../../../lang/SequentialReader';

class Box {
  public size: number;
  public type: string;
  public usertype: string;

  public constructor(reader?: SequentialReader, box?: Box) {
    if (reader != null) {
      this.size = reader.getUInt32();
      this.type = reader.getString(4);
      if (this.size == 1) {
        this.size = reader.getInt64();
      } else if (this.size == 0) {
        this.size = -1;
      }
      if (this.type == "uuid") {
        this.usertype = reader.getString(16);
      }
    }

    if (box != null) {
      this.size = box.size;
      this.type = box.type;
      this.usertype = box.usertype;
    }
  }
}

export default Box;