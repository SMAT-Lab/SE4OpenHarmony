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
import mime from "mime"
import promptAction from '@ohos.promptAction';
let tag = "MIME----"
@Entry
@Component
struct Index {
  @State file: string = "";
  @State mime: string = "";
  files: string[] = [
    "js",
    "json",
    "txt",
    "dir/text.txt",
    "dir\\text.txt",
    ".text.txt",
    ".txt",
  ]
  mimes: string[] = [
    'audio/aac',
    'application/x-abiword',
    'video/x-msvideo',
    'application/vnd.amazon.ebook',
    'image/bmp',
    'application/x-bzip',
    'image/gif',
    'text/html',
    'text/html',
    'image/vnd.microsoft.icon',
    'text/calendar',
    'application/java-archive',
    'image/jpeg',
    'image/jpeg',]

  showMessage(message: string) {
    promptAction.showToast({ message });
    console.log(`${tag}${message}`)
  }

  build() {
    Column() {

      Row() {
        Text("文件类型：")
        TextInput({ placeholder: "请输入文件类型", text: this.file })
          .width("50%")
          .onChange((value: string) => {
            this.file = value;
          })
      }.margin({ bottom: 20 })

      Text("FILE类型示例：").width("100%").textAlign(TextAlign.Start)
      Flex({ wrap: FlexWrap.Wrap }) {
        ForEach(this.files, (v: string) => {
          Text(v).onClick(() => {
            this.file = v;
          }).padding(8)
        })
      }

      Button("getType(通过文件类型获取MIME类型)").onClick(() => {
        this.showMessage(mime.getType(this.file) || "不支持的媒体类型")
      }).width("80%").margin({ top:20,bottom: 20 })


      Row() {
        Text("媒体类型：")
        TextInput({ placeholder: "请输入媒体类型", text: this.mime })
          .width("50%")
          .onChange((value: string) => {
            this.mime = value;
          })
      }.margin({ bottom: 20 })

      Text("MIME类型示例：").width("100%").textAlign(TextAlign.Start)
      Flex({ wrap: FlexWrap.Wrap }) {
        ForEach(this.mimes, (v: string) => {
          Text(v).onClick(() => {
            this.mime = v;
          }).padding(8)
        })
      }
      Button("getExtension(通过MIME类型获取文件拓展名)").onClick(() => {
        this.showMessage(mime.getExtension(this.mime) || "不支持的媒体类型")
      }).width("80%").margin({ top:20,bottom: 20 })

    }
    .justifyContent(FlexAlign.Start)
    .width('100%')
    .height("100%")
    .padding({ top: 30, left: 10, right: 10 })

  }
}