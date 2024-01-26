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

class HuffmanTableClass {
  public static readonly DC: HuffmanTableClass = new HuffmanTableClass()
  public static readonly AC: HuffmanTableClass = new HuffmanTableClass()
  public static readonly UNKNOWN: HuffmanTableClass = new HuffmanTableClass()

  constructor() {
  }

  public static typeOf(value: number): HuffmanTableClass
  {
    switch (value) {
      case 0:
        return HuffmanTableClass.DC;
      case 1:
        return HuffmanTableClass.AC;
      default:
        return HuffmanTableClass.UNKNOWN;
    }
  }
}

export default HuffmanTableClass