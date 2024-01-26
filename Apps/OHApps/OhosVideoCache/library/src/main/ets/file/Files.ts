// @ts-nocheck
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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

import fs from '@ohos.file.fs';
import LinkedList from '@ohos.util.LinkedList';
import ListFileOption from './ListFileOption';

export class Files {
  static makeDir(directory: string): void {
    if (!directory || directory.length < 1) {
      throw new Error("directory can not be null!");
    }
    if (fs.accessSync(directory)) {
      if (!fs.statSync(directory).isDirectory()) {
        throw new Error("File " + directory + " is not directory!");
      }
    } else {
      try {
        fs.mkdirSync(directory);
      } catch (err) {
        throw new Error(`Directory ${directory} can't be created,reason is :${err.message}`);
      }
    }
  }

  static getLruListFiles(directory: string): LinkedList<string> {
    let result = new LinkedList<string>();
    try {
      let option = new ListFileOption();
      option.recursion = true;
      option.listNum = 0;
      let files = fs.listFileSync(directory)
      if (files != null) {
        for (let i = 0; i < files.length; i++) {
          result.add(directory + '/' + files[i])
        }
        let len = result.length;
        for (let i = 0; i < len - 1; i++) {
          for (let j = 0; j < len - 1 - i; j++) {
            let before = fs.statSync(result[j]).mtime
            let after = fs.statSync(result[j + 1]).mtime
            // 相邻元素两两对比，元素交换，大的元素交换到后面
            if (before > after) { //	< 为升序排列，降序请换 >
              let temp: string = result[j];
              result[j] = result[j+1];
              result[j+1] = temp;
            }
          }
        }
      }
    } catch (err) {

    }


    return result;
  }

  static setLastModifiedNow(file: string): void {
    if (fs.accessSync(file)) {
      try {
        fs.utimes(file, new Date().getTime());
      } catch (err) {
        throw new Error(`Last modified date is not set for file ${file},reason is ${err.message}`)
      }
    } else {
      console.log(`file ${file} IS not exist`);
    }
  }

  static modify(file: string): void {
    let size = fs.statSync(file).size;
    if (size == 0) {
      Files.recreateZeroSizeFile(file);
      return;
    }
  }

  private static recreateZeroSizeFile(file: string): void {
    try {
      if (fs.statSync(file)) {
        fs.unlinkSync(file);
      } else {
        let fd = fs.openSync(file, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE)
        fs.closeSync(fd)
      }

    } catch (err) {
      throw new Error("Error recreate zero-size file--- " + file);
    }

  }
}