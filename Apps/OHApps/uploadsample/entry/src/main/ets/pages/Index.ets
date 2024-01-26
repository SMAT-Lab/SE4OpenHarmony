/*
 * Copyright 2023 Unionman Technology Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import request from '@ohos.request';
import { BusinessError } from '@ohos.base';
const HEADER: Record<string, string> = { 'Content-Type': 'multipart/form-data' };
const UPLOAD_TOKEN: string = 'upload_token';
let attachments: Array<request.agent.FormItem> = [{
  name: "createTest",
  value: {
    filename: "",
    mimeType: "application/octet-stream",
    path: "./test.zip",
  }
}];

let config: request.agent.Config = {
  action: request.agent.Action.UPLOAD,
  headers: HEADER,
  url: 'http://192.168.1.1/hfstest/',
  mode: request.agent.Mode.FOREGROUND,
  method: 'POST',
  title: 'upload',
  network: request.agent.Network.ANY,
  data: attachments,
  token: UPLOAD_TOKEN
}

@Entry
@Component
struct Index {
  @State message: string = '点击上传'
  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(()=>{
            request.agent.create(getContext(), config, (err: BusinessError, task: request.agent.Task) => {
              if (err) {
                console.error(`Failed to create a download task, Code: ${err.code}, message: ${err.message}`);
                return;
              }
              let createOnCallback = (progress: request.agent.Progress) => {
                this.message = "上传完成"
                request.agent.remove(task.tid).then(() => {
                  console.info(`Succeeded in removing a download task. `);
                }).catch((err: BusinessError) => {
                  console.error(`Failed to remove a download task, Code: ${err.code}, message: ${err.message}`);
                });
                console.info('upload task completed.');
              };
              task.on('completed', createOnCallback);
              task.start((err: BusinessError) => {
                if (err) {
                  console.error(`Failed to start the download task, Code: ${err.code}, message: ${err.message}`);
                  return;
                }
                this.message = "正在上传"
                console.info(`Succeeded in starting a download task.`);
              });
              console.info(`Succeeded in creating a download task. result: ${task.config}`);
            });
          })
      }
      .width('100%')
    }
    .height('100%')
  }
}