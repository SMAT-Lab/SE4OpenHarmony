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
import { AccessOptions, Client, FileInfo, FTPResponse, join, to } from '@ohos/basic-ftp'
import fs from '@ohos.file.fs'
import socket from '@ohos.net.socket';
import GlobalObj from '../GlobalObj'

@Entry
@Component
struct PressPage {
  @State message: string = 'Hello World'
  private client: Client | null = null;
  private secure: boolean = false;
  private option: socket.TLSConnectOptions = {
    ALPNProtocols: ["spdy/1", "http/1.1"],
    address: {
      address: '',
      port: 21,
      family: 1
    },
    secureOptions: {
      key: '',
      cert: '',
      ca: [''],
      password: '',
      protocols: [socket.Protocol.TLSv12, socket.Protocol.TLSv13],
      useRemoteCipherPrefer: true,
      signatureAlgorithms: "rsa_pss_rsae_sha256:ECDSA+SHA256",
      cipherSuite: "AES256-SHA256"
    }
  }

  aboutToAppear() {
    this.client = new Client(GlobalObj?.getInstance()?.getContext() ? GlobalObj?.getInstance()?.getContext() : getContext(this), 60000)
  }

  build() {
    Flex({
      alignItems: ItemAlign.Start,
      justifyContent: FlexAlign.Start,
      alignContent: FlexAlign.Start,
      direction: FlexDirection.Column
    }) {
      Flex({ direction: FlexDirection.Row }) {
        Scroll() {
          Column() {

            Button('login')
              .fontSize(14)
              .height(50)
              .margin(10)
              .width("100%")
              .onClick(() => {
                this.login()
              })


            Button('appendFrom')
              .fontSize(14)
              .height(50)
              .width("100%")
              .margin(10)
              .onClick(() => {
                this.appendFrom()
              })
            Button('cdup')
              .fontSize(14)
              .height(50)
              .width("100%")
              .margin(10)
              .onClick(() => {
                this.cdup()
              })
            Button('cd')
              .fontSize(14)
              .height(50)
              .margin(10)
              .width("100%")
              .onClick(() => {
                this.cd()
              })
            Button('list')
              .fontSize(14)
              .height(50)
              .margin(10)
              .width("100%")
              .onClick(() => {
                this.list()
              })

            Button('uploadFromDir')
              .fontSize(14)
              .height(50)
              .margin(10)
              .width("100%")
              .onClick(() => {
                this.uploadFromDir()
              })
            Button('downloadTo')
              .fontSize(14)
              .height(50)
              .margin(10)
              .width("100%")
              .onClick(() => {
                this.downloadTo()
              })

            Button('downloadDir')
              .fontSize(14)
              .height(50)
              .margin(10)
              .width("100%")
              .onClick(() => {
                this.downloadDir()
              })
            Button('size')
              .fontSize(14)
              .height(50)
              .margin(10)
              .width("100%")
              .onClick(() => {
                this.sizeApi()
              })
            Button('features')
              .fontSize(14)
              .height(50)
              .margin(10)
              .width("100%")
              .onClick(() => {
                this.features()
              })
          }
          .width('100%')
          .height(2200)
        }
        .layoutWeight(1)

        Scroll() {
          Column() {

            Button('lastMod')
              .fontSize(14)
              .height(50)
              .margin(10)
              .width("100%")
              .onClick(() => {
                this.lastMod()
              })
            Button('rename')
              .fontSize(14)
              .height(50)
              .margin(10)
              .width("100%")
              .onClick(() => {
                this.rename()
              })
            Button('ensureDir')
              .fontSize(14)
              .height(50)
              .margin(10)
              .width("100%")
              .onClick(() => {
                this.ensureDir()
              })
            Button('removeEmptyDir')
              .fontSize(14)
              .height(50)
              .margin(10)
              .width("100%")
              .onClick(() => {
                this.removeEmptyDir()
              })
            Button('remove')
              .fontSize(14)
              .height(50)
              .margin(10)
              .width("100%")
              .onClick(() => {
                this.remove()
              })
            Button('removeDir')
              .fontSize(14)
              .height(50)
              .margin(10)
              .width("100%")
              .onClick(() => {
                this.removeDir()
              })
            Button('clearWorkingDir')
              .fontSize(14)
              .height(50)
              .margin(10)
              .width("100%")
              .onClick(() => {
                this.clearWorkingDir()
              })

            Button('close')
              .fontSize(14)
              .height(50)
              .margin(10)
              .width("100%")
              .onClick(() => {
                this.close()
              })
          }
          .width('100%')
          .height(2200)
        }
        .layoutWeight(1)
      }

    }

  }

  login() {
    const ctx = this
    try {
      let loginInfo: AccessOptions | null = null
      if (ctx.secure) {
        loginInfo = {
          host: '',
          user: 'xxxx',
          password: '',
          secure: 'implicit',
          secureOptions: ctx.option
        }
      } else {
        loginInfo = {
          host: '',
          user: 'xxxx',
          password: '',
          secure: false,
          secureOptions: undefined
        }
      }
      console.log("BasicFtpTest : access 接口已调用 : ")
      console.log("BasicFtpTest : reset 接口已调用 : ")
      console.log("BasicFtpTest : socket不带参数 接口已调用 : ")
      console.log("BasicFtpTest : socket带参数 接口已调用 : ")
      console.log("BasicFtpTest : connect 接口已调用 : ")
      console.log("BasicFtpTest : connectImplicitTLS 接口已调用 : ")
      console.log("BasicFtpTest : sendIgnoringError 接口已调用 : ")
      console.log("BasicFtpTest : login 接口已调用 : ")
      console.log("BasicFtpTest : closed 接口已调用 : ")
      this.client?.access(loginInfo)
    } catch (err) {

    }
  }

  cdup() {
    try {
      console.log("BasicFtpTest : cdup 接口已调用 : ")
      this.client?.cdup()
    } catch (err) {

    }
  }

  cd() {
    try {
      console.log("BasicFtpTest : cd 接口已调用 : ")
      this.client?.cd('appTest')
    } catch (err) {

    }
  }

  appendFrom() {
    try {
      let tempPath = GlobalObj?.getInstance()?.getContext()?.cacheDir + '/' + (new Date().getTime()) + '.txt'
      fs.open(tempPath, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE)
      console.log("BasicFtpTest : uploadFrom 接口已调用 : ")
      this.client?.uploadFrom(tempPath, 'appendFrom.txt')
    } catch (err) {

    }
  }

  downloadTo() {
    try {
      let tempPath = GlobalObj?.getInstance()?.getContext()?.cacheDir + '/' + (new Date().getTime()) + '.txt'
      fs.open(tempPath, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE)
      console.log("BasicFtpTest : downloadTo 接口已调用 : ")
      this.client?.downloadTo(tempPath, 'download.txt')
    } catch (err) {

    }
  }

  list() {
    try {
      console.log("BasicFtpTest : list 接口已调用 : ")
      this.client?.list('')
    } catch (err) {

    }
  }

  uploadFromDir() {
    try {
      let tempPath = GlobalObj?.getInstance()?.getContext()?.cacheDir + '/' + (new Date().getTime())
      fs.mkdir(tempPath)
      console.log("BasicFtpTest : uploadFromDir 接口已调用 : ")
      this.client?.uploadFromDir(tempPath, 'remoteDir')
    } catch (err) {
    }
  }

  downloadDir() {
    try {
      let tempPath = GlobalObj?.getInstance()?.getContext()?.cacheDir + '/' + (new Date().getTime())
      fs.mkdir(tempPath)
      console.log("BasicFtpTest : downloadToDir 接口已调用 : ")
      this.client?.downloadToDir(tempPath, 'remoteDir')
    } catch (err) {
    }
  }

  sizeApi() {
    try {
      console.log("BasicFtpTest : size 接口已调用 : ")
      this.client?.size('test.txt')
    } catch (err) {
    }
  }

  features() {
    try {
      console.log("BasicFtpTest : features 接口已调用 : ")
      this.client?.features()
    } catch (err) {
    }
  }

  lastMod() {
    try {
      console.log("BasicFtpTest : lastMod 接口已调用 : ")
      this.client?.lastMod('test.txt')
    } catch (err) {
    }
  }

  rename() {
    try {
      console.log("BasicFtpTest : rename 接口已调用 : ")
      this.client?.rename('test.txt', 'rename.txt')
    } catch (err) {
    }
  }

  ensureDir() {
    try {
      console.log("BasicFtpTest : ensureDir 接口已调用 : ")
      this.client?.ensureDir('clientToServer')
    } catch (err) {
    }
  }

  removeEmptyDir() {
    try {
      console.log("BasicFtpTest : removeEmptyDir 接口已调用 : ")
      this.client?.removeEmptyDir('remotePath')
    } catch (err) {
    }
  }

  remove() {
    try {
      console.log("BasicFtpTest : remove 接口已调用 : ")
      this.client?.remove('test.txt')
    } catch (err) {
    }
  }

  removeDir() {
    try {
      console.log("BasicFtpTest : removeDir 接口已调用 : ")
      this.client?.removeDir('remotePath')
    } catch (err) {
    }
  }

  clearWorkingDir() {
    try {
      console.log("BasicFtpTest : clearWorkingDir 接口已调用 : ")
      this.client?.clearWorkingDir()
    } catch (err) {
    }
  }

  close() {
    try {
      console.log("BasicFtpTest : close 接口已调用 : ")
      this.client?.close();
    } catch (err) {
    }
  }
}