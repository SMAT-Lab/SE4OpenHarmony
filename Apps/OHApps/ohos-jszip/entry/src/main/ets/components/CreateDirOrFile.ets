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
import { Confirm, Cancel, ReturnValue } from "../types/type"

@CustomDialog
export struct CreateDirOrFile {
  create_type: "DIR" | "FILE" | "ZIP"  = "DIR";
  controller?: CustomDialogController;
  folderName: string = "";
  fileName: string = "";
  contentText: string = "";
  zipName:string = "";
  textController: TextInputController = new TextInputController()
  confirm: Confirm = () => {
  }
  cancel: Cancel = () => {
  }


  isShowDir(){
    return this.create_type === "DIR"
  }

  isShowFile(){
    return this.create_type === "FILE"
  }

  isShowZip(){
    return this.create_type === "ZIP"
  }


  build() {
      Column() {
        Text(this.create_type === "DIR" ? "创建文件夹" : this.create_type === "FILE"?"创建文件":"加载ZIP文件").fontSize(20).margin({ top: 10, bottom: 10 })
        TextInput({ placeholder: '请输入文件夹名称...', text: this.folderName,controller:this.textController })
          .height(80)
          .width('90%')
          .onChange((value: string) => {
            this.folderName = value
          })
          .margin({ bottom: 12 })
          .visibility(this.isShowDir()?Visibility.Visible:Visibility.None)


        TextInput({ placeholder: '请输入文件名称...', text: this.fileName })
          .height(80)
          .width('90%')
          .onChange((value: string) => {
            this.fileName = value
          })
          .margin({ bottom: 12 })
          .visibility(this.isShowFile()?Visibility.Visible:Visibility.None)



        TextInput({ placeholder: '请输入文件内容...', text: this.contentText })
          .height(80)
          .width('90%')
          .onChange((value: string) => {
            this.contentText = value
          })
          .margin({ bottom: 12 })
          .visibility(this.isShowFile()?Visibility.Visible:Visibility.None)

        TextInput({ placeholder: '请输入ZIP文件名称...', text: this.zipName })
          .height(80)
          .width('90%')
          .onChange((value: string) => {
            this.zipName = value
          })
          .margin({ bottom: 12 })
          .visibility(this.isShowZip()?Visibility.Visible:Visibility.None)


        Column() {
          Button("确定").onClick(() => {
            const result = new ReturnValue();
            result.create_type = this.create_type;
            result.folderName = this.folderName;
            result.fileName = this.fileName;
            result.contentText = this.contentText;
            result.zipName = this.zipName;
            this.confirm(result);
          }).width("100%").margin({bottom:8}).height(50)
          Button("取消").onClick(this.cancel).width("100%").height(50)
        }.margin(20)
      }


  }
}