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
import fileio from '@ohos.fileio';
import pako from 'pako';
import { GlobalContext } from '../entryability/GlobalContext'

/**
 * 指定文件路径压缩文件gz方法
 *
 * @since 7
 * @permission N
 * @param {string} path - path.
 * @param {string} dest -path and file name after the .gz file is generated.
 * @returns {void | Promise<boolean>} callback return Promise otherwise return true or false.
 */
interface optionsType {
  gzip: boolean,
  level: number
}

export async function gzipFile(src: string, dest: string): Promise<boolean> {
  try {
    let stat = fileio.statSync(src);
    const buf = new ArrayBuffer(stat.size);
    const reader = fileio.openSync(src, 0o2);
    fileio.readSync(reader, buf);
    const writer = fileio.openSync(dest, 0o102, 0o666);
    const options: optionsType = { gzip: true, level: 9 };
    fileio.writeSync(writer, pako.gzip(new Uint8Array(buf), options).buffer);
    fileio.closeSync(reader);
    fileio.closeSync(writer);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * 解压gz文件方法
 *
 * @since 7
 * @permission N
 * @param {string} src - path and name of the decompressed .gz file.
 * @param {string} target -Decompress the package to a specified path.
 * @returns {void | Promise<boolean>} callback return Promise otherwise return true or false.
 */
export async function unGzipFile(src: string, target: string): Promise<boolean> {
  try {
    const reader = fileio.openSync(src, 0o2);
    const stat = fileio.statSync(src);
    const buf = new ArrayBuffer(stat.size);
    const res = await fileio.read(reader, buf);
    const options: optionsType = { gzip: true, level: 9 };
    const data: Uint8Array = pako.inflate(new Uint8Array(res.buffer), options);
    const writer = fileio.openSync(target, 0o102, 0o666);
    fileio.writeSync(writer, data.buffer);
    fileio.closeSync(writer);
    fileio.closeSync(reader);
    return true;
  } catch (error) {
    return false;
  }
}

@Entry
@Component
export struct GzipTest {
  @State isCompressGZipFileShow: boolean = false;
  @State isDeCompressGZipShow: boolean = false;
  preTimestamp: number = 0;

  build() {
    Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center }) {
      Text('gzip相关功能')
        .fontSize(20)
        .margin({ top: 16 })

      Text('点击生成hello.txt')
        .fontSize(16)
        .margin({ top: 32 })
        .padding(8)
        .border({ width: 2, color: '#535353', radius: 6 })
        .onClick((event) => {
          if (!this.isFastClick()) {
            this.generateTextFile()
          }
        })

      if (this.isCompressGZipFileShow) {
        Text('点击压缩hello.txt为gz文件')
          .fontSize(16)
          .margin({ top: 32 })
          .padding(8)
          .border({ width: 2, color: '#535353', radius: 6 })
          .onClick((event) => {
            if (!this.isFastClick()) {
              this.gzipFileTest()
            }
          })
      }

      if (this.isDeCompressGZipShow) {
        Text('点击解压gz文件')
          .fontSize(16)
          .margin({ top: 32 })
          .padding(8)
          .border({ width: 2, color: '#535353', radius: 6 })
          .onClick((event) => {
            if (!this.isFastClick()) {
              this.unGzipFileTest()
            }
          })
      }
    }
    .width('100%')
    .height('100%')
  }

  generateTextFile(): void {
    let context: Context = GlobalContext.getContext().getObject("context") as Context
    try {
      let data = context.filesDir
      const writer = fileio.openSync(data + '/hello.txt', 0o102, 0o666);
      fileio.writeSync(writer, "hello, world! 你好你是什么认为呢 打烂打烂大龙胆大大家记得那几年的 adjasjdakjdakjdkjakjdakjskjasdkjaskjdajksdkjasdkjaksjdkja\n"
      + "adasajsdkjadjkakjdakjsdkjadkjakjdakjsdkjasdkjaskjdakjsdkjaskjdakjsdkjaskjakjdakjs\n"
      + "adasajsdkjadjkakjdakjsdkjadkjakjdakjsdkjasdkjaskjdakjsdkjaskjdakjsdkjaskjakjdakjs\n"
      + "adasajsdkjadjkakjdakjsdkjadkjakjdakjsdkjasdkjaskjdakjsdkjaskjdakjsdkjaskjakjdakjs\n"
      + "adasajsdkjadjkakjdakjsdkjadkjakjdakjsdkjasdkjaskjdakjsdkjaskjdakjsdkjaskjakjdakjs\n"
      + "adasajsdkjadjkakjdakjsdkjadkjakjdakjsdkjasdkjaskjdakjsdkjaskjdakjsdkjaskjakjdakjs\n"
      + "adasajsdkjadjkakjdakjsdkjadkjakjdakjsdkjasdkjaskjdakjsdkjaskjdakjsdkjaskjakjdakjs\n"
      + "adasajsdkjadjkakjdakjsdkjadkjakjdakjsdkjasdkjaskjdakjsdkjaskjdakjsdkjaskjakjdakjs\n"
      + "adasajsdkjadjkakjdakjsdkjadkjakjdakjsdkjasdkjaskjdakjsdkjaskjdakjsdkjaskjakjdakjs\n"
      + "adasajsdkjadjkakjdakjsdkjadkjakjdakjsdkjasdkjaskjdakjsdkjaskjdakjsdkjaskjakjdakjs\n"
      + "adasajsdkjadjkakjdakjsdkjadkjakjdakjsdkjasdkjaskjdakjsdkjaskjdakjsdkjaskjakjdakjs\n"
      + "adasajsdkjadjkakjdakjsdkjadkjakjdakjsdkjasdkjaskjdakjsdkjaskjdakjsdkjaskjakjdakjs\n"
      + "adasajsdkjadjkakjdakjsdkjadkjakjdakjsdkjasdkjaskjdakjsdkjaskjdakjsdkjaskjakjdakjs"
      );
      fileio.closeSync(writer);
      AlertDialog.show({ title: '生成成功',
        message: '请查看沙箱路径' + data + '/hello.txt',
        confirm: { value: 'OK', action: () => {
          this.isCompressGZipFileShow = true
        } }
      })
    } catch (error) {
      console.error('File to obtain the file directory. Cause: ' + error.message);
    }
  }

  gzipFileTest(): void {
    let context: Context = GlobalContext.getContext().getObject("context") as Context
    try {
      let data = context.filesDir
      console.info('directory obtained. Data:' + data);
      gzipFile(data + '/hello.txt', data + '/test.txt.gz')
        .then((isSuccess) => {
          if (isSuccess) {
            AlertDialog.show({ title: '压缩成功',
              message: '请查看沙箱路径 ' + data + '/test.txt.gz',
              confirm: { value: 'OK', action: () => {
                this.isDeCompressGZipShow = true
              } }
            })
          }
        });
    } catch (error) {
      console.error('File to obtain the file directory. Cause: ' + error.message);
    }
  }

  unGzipFileTest(): void {
    let context: Context = GlobalContext.getContext().getObject("context") as Context
    try {
      let data = context.filesDir
      unGzipFile(data + '/test.txt.gz', data + '/test.txt')
        .then((isSuccess) => {
          if (isSuccess) {
            AlertDialog.show({ title: '解缩成功',
              message: '请查看沙箱路径 ' + data + '/test.txt',
              confirm: { value: 'OK', action: () => {
              } }
            })
          }
        });
    } catch (error) {
      console.error('File to obtain the file directory. Cause: ' + error.message);
    }
  }

  isFastClick(): boolean {
    let timestamp = Date.parse(new Date().toString());
    if ((timestamp - this.preTimestamp) > 1500) {
      this.preTimestamp = timestamp;
      return false;
    } else {
      return true;
    }
  }
}

