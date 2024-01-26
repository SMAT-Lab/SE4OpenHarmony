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

import Metadata from '../Metadata';
import XmpDirectory from './XmpDirectory';

class XmpWriter {
  public static write(filePath: string, data: Metadata): boolean {
    /*let dir: XmpDirectory = data.getFirstDirectoryOfType(XmpDirectory.class);
    if (dir == null) {
      return false;
    }

    let meta = dir.getXMPMeta();
    let so: SerializeOptions = new SerializeOptions().setOmitPacketWrapper(true);
    XMPMetaFactory.serialize(meta, os, so);
    return true;*/
  }
}

export default XmpWriter;