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
import snappyJS from 'snappyjs'
import fileio from '@ohos.fileio';
import { GlobalContext } from '../entryability/GlobalContext'
@Entry
@Component
export struct SnappyTest {
  @State newfolder: string = 'newfolder'
  @State newfile: string = 'bla.txt'
  @State newfile1: string = 'bla1.txt'
  @State isCompressSnappyFileShow: boolean = false;
  @State isDeCompressSnappyShow: boolean = false;
  preTimestamp: number = 0;
  build() {
    Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center }) {

      Text('Snappy相关功能')
        .fontSize(20)
        .margin({ top: 16 })

      Text('点击生成bla.txt')
        .fontSize(16)
        .margin({ top: 32 })
        .padding(8)
        .border({ width: 2, color: '#535353', radius: 6 })
        .onClick((event) => {
          if (!this.isFastClick()) {
            this.createFile()
          }
        })

      if (this.isCompressSnappyFileShow) {
        Text('点击压缩bla.txt为sz文件')
          .fontSize(16)
          .margin({ top: 32 })
          .padding(8)
          .border({ width: 2, color: '#535353', radius: 6 })
          .onClick((event) => {
            if (!this.isFastClick()) {
              this.snappyJsTest(true)
            }
          })
      }


      if (this.isDeCompressSnappyShow) {
        Text('点击解压sz文件')
          .fontSize(16)
          .margin({ top: 32 })
          .padding(8)
          .border({ width: 2, color: '#535353', radius: 6 })
          .onClick((event) => {
            if (!this.isFastClick()) {
              this.snappyJsTest(false)
            }
          })
      }
    }
    .width('100%')
    .height('100%')
  }

  aboutToAppear() {
    this.createFolder()
  }

  createFolder() {
    let context:Context = GlobalContext.getContext().getObject("context") as Context
    try {
      try {
        fileio.mkdirSync(context.filesDir + '/' + this.newfolder)
      } catch (err) {
      }
    } catch (error) {
      console.error('File to obtain the file directory. Cause: ' + error.message);
    }
  }

  createFile() {
    let context:Context = GlobalContext.getContext().getObject("context") as Context
    try {
      let data = context.filesDir
      let fd = fileio.openSync(data + '/' + this.newfolder + '/' + this.newfile, 0o102, 0o666);
      fileio.writeSync(fd, "hello, world!  adjasjdakjdakjdkjakjdakjskjasdkjaskjdajksdkjasdkjaksjdkja\n"
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
      fileio.closeSync(fd);
      AlertDialog.show({ title: '生成成功',
        message: '请查看沙箱路径' + data + '/' + this.newfolder + '/' + this.newfile,
        confirm: { value: 'OK', action: () => {
          this.isCompressSnappyFileShow = true
        } }
      })
    } catch (error) {
      console.error('File to obtain the file directory. Cause: ' + error.message);
    }
  }

  snappyJsTest(value:Boolean) {
    let context:Context = GlobalContext.getContext().getObject("context") as Context
    try {
      let data = context.filesDir
      if (value) {
        let path = data + '/' + this.newfolder
        console.log('snappyCompress');
        snappyCompress(path, this.newfile)
          .then(() => {
            AlertDialog.show({ title: '压缩成功',
              message: '请查看沙箱路径 ' + data + '/' + this.newfolder + '/' + this.newfile + '.sz',
              confirm: { value: 'OK', action: () => {
                this.isDeCompressSnappyShow = true
              } }
            })
          });
      } else {
        console.log('snappyUncompress');
        snappyUncompress(data, this.newfolder, this.newfile, this.newfile1)
          .then(() => {
            AlertDialog.show({ title: '解缩成功',
              message: '请查看沙箱路径 ' + data + '/' + this.newfile1,
              confirm: { value: 'OK', action: () => {
              } }
            })
          });
      }
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



export async function snappyCompress(path:string, newfile:string) {
  let newpath = path + '/' + newfile
  let buf = getFileBuf(newpath)
  /* 压缩文件*/
  let compressed:string = snappyJS.compress(buf)
  let fd = fileio.openSync(path + '/' + newfile + '.sz', 0o102, 0o666);
  let num = await fileio.write(fd, compressed);
  fileio.closeSync(fd);
}

/* 解压文件*/
export async function snappyUncompress(path:string, newfolder:string, newfile:string, newfile1:string) {
  let newpath = path + '/' + newfolder + '/' + newfile + '.sz'
  let buf = getFileBuf(newpath)
  let uncompressed:string = snappyJS.uncompress(buf)
  let fd = fileio.openSync(path + '/' + newfile1, 0o102, 0o666);
  let num = await fileio.write(fd, uncompressed);
  fileio.closeSync(fd);
}

function getFileBuf(Bufpath:string): ArrayBuffer {
  let stat = fileio.statSync(Bufpath);
  const reader = fileio.openSync(Bufpath);
  let buf = new ArrayBuffer(stat.size);
  fileio.readSync(reader, buf);
  fileio.closeSync(reader);
  return buf
}