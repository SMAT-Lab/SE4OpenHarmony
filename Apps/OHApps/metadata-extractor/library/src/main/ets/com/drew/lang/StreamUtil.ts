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

import fileio from '@ohos.fileio';

class StreamUtil {
  public static readAllBytes(filePath: string): Int8Array {
    let fd = fileio.openSync(filePath, 0o2);
    let buf = new ArrayBuffer(1024);
    let writeNum;

    while (true) {
      let bytesRead: number = fileio.readSync(fd, buf);
      if (bytesRead == -1) {
        break;
      }

      writeNum = fileio.write(fd, buf, { length: bytesRead });
    }

    return writeNum;
  }
}

export default StreamUtil;