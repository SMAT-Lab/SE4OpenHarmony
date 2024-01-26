/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BottomListDialog } from '@ohos/dialogs';

@Entry
@Component
struct BottomListDialogExample {
  @State message: string = '显示Bottom类型的List弹窗(带选择效果)'
  @State showDialog: boolean = false;
  @State isOpenDialog: boolean = false;
  @State selectIndex: number = 2;
  @State message1: string = '显示Bottom类型的List弹窗'
  @State showDialog1: boolean = false;
  @State isOpenDialog1: boolean = false;
  @State selectIndex1: number = 2;

  build() {
    Row() {
      Column() {
        Button(this.message)
          .fontSize(25)
          .labelStyle({overflow: TextOverflow.Ellipsis,maxLines:2})
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            this.showDialog = true;
            this.isOpenDialog = !this.isOpenDialog;
          })
        BottomListDialog({
          openDialog: $isOpenDialog,
          mListData: ['aa','bb','cc','dd','ee','ff'],
          mDialogItemHeight: 40,
          dialogTitle: "标题可以没有",
          dialogTitleSize: 25,
          dialogTitleColor: Color.Black,
          mDialogMaskColor: 0x33000000,
          mDialogTitleHeight: 60,
          dialogCancel: "取消",
          dialogCancelSize: 20,
          dialogCancelColor: Color.White,
          mDialogItemTextColor: '#000000',
          mDialogBackgroundColor: '#ffffff',
          mDialogItemDividerBackgroundColor: Color.Gray,
          mDialogItemDividerStrokeWidth: 1,
          mDialogCancelDividerBackgroundColor: '#f5f5f5',
          mDialogCancelDividerStrokeWidth: 10,
          mDialogSelectIcon: $r('app.media.ic_public_ok_filled'),
          isShowSelect: true,
          mDialogItemSelectIndex: this.selectIndex,
          mDialogItemSelectTextColor: '#008577',
          cancel: () => {
            console.log("dialog cancel")
          },
          onItemClick: (data:string, index:number) => {
            console.log("dialog onItem data:" + data + ";index:" + index)
            this.selectIndex = index;
          }
        })
          .visibility(this.showDialog ? Visibility.Visible : Visibility.None)
      }
      .width('50%')

      Column() {
        Button(this.message1)
          .labelStyle({overflow: TextOverflow.Ellipsis,maxLines:2})
          .fontSize(25)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            this.showDialog1 = true;
            this.isOpenDialog1 = !this.isOpenDialog1;
          })
        BottomListDialog({
          openDialog: $isOpenDialog1,
          mListData: ['aa','bb','cc','dd','ee','ff'],
          mDialogItemHeight: 40,
          dialogTitle: "标题可以没有",
          dialogTitleSize: 25,
          dialogTitleColor: Color.Black,
          mDialogMaskColor: 0x33000000,
          mDialogTitleHeight: 60,
          dialogCancel: "取消",
          dialogCancelSize: 20,
          dialogCancelColor: Color.White,
          mDialogItemTextColor: '#000000',
          mDialogBackgroundColor: '#ffffff',
          mDialogItemDividerBackgroundColor: Color.Gray,
          mDialogItemDividerStrokeWidth: 1,
          mDialogCancelDividerBackgroundColor: '#f5f5f5',
          mDialogCancelDividerStrokeWidth: 10,
          mDialogSelectIcon: $r('app.media.ic_public_ok_filled'),
          isShowSelect: false,
          mDialogItemSelectIndex: this.selectIndex1,
          mDialogItemSelectTextColor: Color.Orange,
          cancel: () => {
            console.log("dialog cancel")
          },
          onItemClick: (data:string, index:number) => {
            console.log("dialog onItem data:" + data + ";index:" + index)
            this.selectIndex1 = index;
          }
        })
          .visibility(this.showDialog1 ? Visibility.Visible : Visibility.None)
      }
      .width('50%')
    }
    .height('100%')
  }
}