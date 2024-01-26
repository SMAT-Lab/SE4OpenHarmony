/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import EventEmitter from 'eventemitter3'
import fs from '@ohos.file.fs';
import buffer from '@ohos.buffer';
import { GlobalContext } from './GlobalContext'

@Entry
@Component
struct FileRead {
  @State message: string = '监听文件读取'
  @State filePath: string | undefined = undefined;
  @State state: string = '状态信息：'
  @State emitter: EventEmitter<string, Object> | undefined = undefined;
  @State isCreateFinish: boolean = false

  aboutToAppear() {
    let cacheDir = GlobalContext.getContext().getObject(GlobalContext.KEY_CACHE_DIR) as string;
    if (cacheDir) {
      this.filePath = cacheDir + "/test.txt"
    }
    console.log('zdy------>' + 'this.filePath  ' + this.filePath);
    this.emitter = new EventEmitter<string, Object>();
    this.emitter.on('finish', (data: Object) => {
      this.state = this.state + "\r\n" + "读取文件内容成功：\r\n" + data
      console.log('zdy------>' + 'file read finished');
      this.isCreateFinish = false;
    });
    this.emitter.on('create file', (data: Object) => {
      this.state = this.state + "\r\n" + "文件生成成功：\r\n" + data
      this.isCreateFinish = true;
      console.log('zdy------>' + 'file read finished');
    });
    this.emitter.on('create err', () => {
      this.state = this.state + "\r\n" + "生成文件失败"
      this.isCreateFinish = false;
      console.log('zdy------>' + 'create file err');
    });
    this.emitter.on('not create', () => {
      this.state = this.state + "\r\n" + "文件还没有生成，请点击“文件生成”并稍候片刻"
      this.isCreateFinish = false;
      console.log('zdy------>' + 'create file err');
    });
    this.emitter.on('read err', () => {
      this.state = this.state + "\r\n" + "文件读取失败"
      this.isCreateFinish = false;
      console.log('zdy------>' + 'create file err');
    });
    console.log('zdy------>' + 'this.emitter  ' + this.emitter);
  }

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .width('100%')
          .height(100)


        Button('文件生成')
          .width('100%')
          .height(50)
          .backgroundColor(Color.Blue)
          .fontColor(Color.White)
          .margin(20)
          .onClick(() => {
            this.createFile()
          })
        Button('文件读取')
          .width('100%')
          .height(50)
          .backgroundColor(Color.Blue)
          .fontColor(Color.White)
          .margin(20)
          .onClick(() => {
            this.readFile()
          })
        Text(this.state)
          .width('100%')
          .backgroundColor(Color.Red)
          .fontColor(Color.White)
          .margin(20)

      }
      .width('100%')
    }
    .height('100%')
  }

  createFile() :void {
    try {
      if (!this.emitter) {
        this.state = this.state + "\r\n" + "emitter尚未初始化，请检查是否初始化失败"
        return
      }
      console.log('zdy------>' + 'createFile start ');
      if (this.filePath) {
        let file = fs.openSync(this.filePath, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE)
        console.log('zdy------>' + 'createFile openSync ');
        fs.writeSync(file.fd, "this is test content which will be writed to a local txt file")
        console.log('zdy------>' + 'createFile writeSync ');
        fs.fsyncSync(file.fd)
        console.log('zdy------>' + 'createFile fsyncSync ');
        fs.closeSync(file)
        console.log('zdy------>' + 'createFile closeSync ');
        this.emitter.emit('create file', "create file success");
      } else {
        this.emitter.emit('create err');
      }
    } catch (err) {
      if (this.emitter) {
        console.log('zdy------>' + 'createFile err ' + err);
        this.emitter.emit('create err');
      }
    }
  }

  readFile() {
    try {
      if (!this.emitter) {
        this.state = this.state + "\r\n" + "emitter尚未初始化，请检查是否初始化失败"
        return
      }

      if (!this.isCreateFinish) {
        this.emitter.emit('not create', "create file success");
        return
      }
      if (this.filePath) {
        let file = fs.openSync(this.filePath, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE)
        let size = fs.statSync(this.filePath).size
        let buff = new ArrayBuffer(size)
        fs.readSync(file.fd, buff)
        fs.fsyncSync(file.fd)
        fs.closeSync(file)
        let result = buffer.from(buff).toString("utf-8")
        this.emitter.emit('finish', result);
      } else {
        this.emitter.emit('read err', "create file success");
      }

    } catch (err) {
      if (this.emitter) {
        console.log('zdy------>' + 'readFile err ' + err);
        this.emitter.emit('read err');
      }
    }
  }
}