/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
 
 import CommonConstants from '../common/constants/CommonConstants'
import  EditDialog from '../view/EditDialog'
import { LocalStorage } from '../common/database/LocalStorage'
@Component
export struct IndexTitle {
  @State notebookName: string = CommonConstants.notebookName;
  private localStorage: LocalStorage = new LocalStorage()
  dialogController: CustomDialogController = new CustomDialogController({
    builder: EditDialog({
      confirm: () => {
        // todo 保存记事本标题
        this.localStorage.setNoteBookName(this.notebookName)
      },
      notebookName: $notebookName,
    }),
    autoCancel: true,
    alignment: DialogAlignment.Default,
    offset: { dx: 0, dy: -20 },
    gridCount: 4,
    customStyle: false
  })
  aboutToAppear(){
    this.localStorage.getNoteBookName().then(res=>{
      this.notebookName = res as string
      console.info('axios ' + this.notebookName)
    })
  }

  build() {
    Row() {
      Text(this.notebookName)
        .fontSize(CommonConstants.FONT_SIZE_38)
        .onClick((e) => {
          this.dialogController.open()
        })
      Image($r("app.media.icon_down"))
        .width(17)
        .height(10)
        .margin({ left: 10 })
      Blank()
      Row() {
        Image($r('app.media.icon_more'))
          .width(32)
          .height(32)
      }.padding({ left: 10, bottom: 10, top: 10 })
      .margin({ bottom: 12 })
    }
    .width(CommonConstants.FULL_WIDTH)
    .height(54)
    .margin({
      top: 25
    })
  }
}


