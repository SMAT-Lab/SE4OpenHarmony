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

import animator, { AnimatorOptions, AnimatorResult } from '@ohos.animator';

@CustomDialog
struct BottomListDialogComponent {
  @Link mDialogComponentHeight: number;
  @Link mDialogComponentMastColor: number | string;
  @Link mDialogComponentTitleHeight: number | string;
  @Link mItemListData: Array<string>;
  @Link mItemHeight: number;
  @Link mItemTextSize: number;
  @Link mItemTextColor: number | string;
  @Link mDialogComponentBackgroundColor: number | string;
  @Link mItemDividerBackgroundColor: number | string;
  @Link mItemDividerStrokeWidth: number;
  @Link mCancelDividerBackgroundColor: number | string;
  @Link mCancelDividerStrokeWidth: number;
  @Link mDialogTitleText: string;
  @Link mDialogTitleSize: number;
  @Link mDialogTitleColor: number;
  @Link mDialogCancelText: string;
  @Link mDialogCancelSize: number;
  @Link mDialogCancelColor: number;
  @Link mSelectIcon: Resource;
  @Link mIsShowSelect: boolean;
  @Link mSelectIndex: number;
  @Link mSelectTextColor: number | string;
  mDialogPrimitiveHeight: number = 0; // 记录dialog的原始高度
  controller: CustomDialogController;
  showOrClose?: (currentHeight: number, isOpen: boolean) => void
  itemOnClick?: (data: string, index: number) => void
  private mStartY: number = 0;
  private mEndY: number = 0;
  private mInitiallyY: number = 0;
  private isTouchEvent: boolean = false;

  @Builder
  buildPage(data: string, index: number) {
    Text(data)
      .width('100%')
      .fontColor(this.mItemTextColor)
      .height(this.mItemHeight)
      .fontSize(this.mItemTextSize)
      .textAlign(TextAlign.Center)
      .textOverflow({ overflow: TextOverflow.Ellipsis })
      .maxLines(1)
      .onClick(() => {
        if (this.isTouchEvent) {
          return;
        }
        this.isTouchEvent = false;
        if(this.itemOnClick != undefined) {
          this.itemOnClick(data, index);
        }
      })
  }

  @Builder
  buildSelectPage(data: string, index: number) {
    Row() {
      Text(data)
        .fontColor(index == this.mSelectIndex ? this.mSelectTextColor : this.mItemTextColor)
        .fontSize(this.mItemTextSize)
        .layoutWeight(1)
        .margin({ left: 20 })
        .textOverflow({ overflow: TextOverflow.Ellipsis })
        .maxLines(1)

      Image(this.mSelectIcon)
        .width(20)
        .height(20)
        .margin({ right: 20 })
        .visibility(index == this.mSelectIndex ? Visibility.Visible : Visibility.None)
    }.width('100%')
    .height(this.mItemHeight)
    .alignItems(VerticalAlign.Center)
    .onClick((event) => {
      if (this.isTouchEvent) {
        return;
      }
      this.isTouchEvent = false;
      if(this.itemOnClick != undefined) {
        this.itemOnClick(data, index);
      }
      this.mSelectIndex = index;
    })
  }

  build() {
    Stack() {
      Column() {
        Text(this.mDialogTitleText)
          .width('100%')
          .height(this.mDialogComponentTitleHeight)
          .fontColor(this.mDialogTitleColor)
          .fontSize(this.mDialogTitleSize)
          .fontWeight(FontWeight.Bold)
          .textAlign(TextAlign.Center)
          .visibility(this.mDialogTitleText ? Visibility.Visible : Visibility.None)

        ForEach(this.mItemListData, (data:string, index:number) => {
          if (this.mIsShowSelect) {
            this.buildSelectPage(data, index)
          } else {
            this.buildPage(data, index)
          }
          if (index != this.mItemListData.length - 1) {
            Divider().color(this.mItemDividerBackgroundColor).strokeWidth(this.mItemDividerStrokeWidth)
          }
        })

        Divider().color(this.mCancelDividerBackgroundColor).strokeWidth(this.mCancelDividerStrokeWidth)

        Text(this.mDialogCancelText)
          .width('100%')
          .height(this.mDialogComponentTitleHeight)
          .fontColor(this.mDialogCancelColor)
          .fontSize(this.mDialogCancelSize)
          .textAlign(TextAlign.Center)
          .onClick(() => {
            if (this.isTouchEvent) {
              return;
            }
            this.isTouchEvent = false;
            if(this.showOrClose != undefined) {
              this.showOrClose(this.mDialogComponentHeight, false);
            }
          })
      }
      .width('100%')
      .backgroundColor(this.mDialogComponentBackgroundColor)
      .borderRadius({ topLeft: 20, topRight: 20 })
      .height(this.mDialogComponentHeight)
      .onTouch((event?: TouchEvent) => {
        if (event != undefined) {
          if ((event.type === TouchType.Down)) {
            if (!this.mDialogPrimitiveHeight) {
              this.mDialogPrimitiveHeight = this.mDialogComponentHeight
            }
            this.mStartY = event.touches[0].y;
            this.mInitiallyY = this.mStartY;
          } else if (event.type === TouchType.Move) {
            this.mEndY = event.touches[0].y;
            let isMoveUp = this.mEndY < this.mStartY;
            let moveSpace = Math.abs(this.mEndY - this.mStartY);
            if (isMoveUp) {
              let height = this.mDialogComponentHeight + moveSpace;
              if (height > this.mDialogPrimitiveHeight) {
                height = this.mDialogPrimitiveHeight;
              }
              this.mDialogComponentHeight = height;
              this.mStartY = this.mEndY;
            } else {
              this.mDialogComponentHeight = this.mDialogComponentHeight - moveSpace;
              this.mStartY = this.mEndY;
            }
          } else if (event.type === TouchType.Up) {
            this.mEndY = event.touches[0].y;
            let moveSpace = Math.abs(this.mEndY - this.mInitiallyY);
            if (moveSpace < 1) {
              this.isTouchEvent = false;
              return
            }
            if (moveSpace > this.mDialogPrimitiveHeight / 2) {
              if (this.showOrClose != undefined) {
                this.showOrClose(this.mDialogComponentHeight, false);
              }
            } else {
              if (this.showOrClose != undefined) {
                this.showOrClose(this.mDialogComponentHeight, true);
              }
            }
            this.isTouchEvent = true;
          }
        }
      })
    }
    .height('100%')
    .width('100%')
    .backgroundColor(this.mDialogComponentMastColor)
    .alignContent(Alignment.Bottom)
    .onClick(() => {
      if (this.isTouchEvent) {
        return;
      }
      this.isTouchEvent = false;
      if(this.showOrClose != undefined) {
        this.showOrClose(this.mDialogComponentHeight, false);
      }
    })
  }

  getDialogHeightToPx(): number {
    return vp2px(this.mDialogComponentHeight)
  }
}

@Component
export struct BottomListDialog {
  private mOpenAnimator: AnimatorResult = animator.create({
    duration: 500,
    easing: "friction",
    delay: 0,
    fill: "forwards",
    direction: "normal",
    iterations: 1,
    begin: 0,
    end: 0
  });
  @Link @Watch("showDialog") openDialog: boolean;
  @State mDialogBackgroundColor: number | string = Color.White;
  @State mDialogMaskColor: number | string = Color.Transparent;
  @State mDialogTitleHeight: number = 60;
  @State mDialogHeight: number = 0;
  @State mDialogItemHeight: number = 30;
  @State mDialogItemTextSize: number = 20;
  @State mDialogItemTextColor: number | string = Color.Black;
  @State mDialogItemDividerBackgroundColor: number | string = Color.Gray;
  @State mDialogItemDividerStrokeWidth: number = 1;
  @State mDialogCancelDividerBackgroundColor: number | string = Color.Gray;
  @State mDialogCancelDividerStrokeWidth: number = 10;
  @State mListData: Array<string> = new Array();
  @State dialogTitle: string = "";
  @State dialogTitleSize: number = 25;
  @State dialogTitleColor: number | string = Color.White;
  @State dialogCancel: string = "";
  @State dialogCancelSize: number = 25;
  @State dialogCancelColor: number | string = Color.White;
  @State mDialogSelectIcon: Resource|null = null;
  @State isShowSelect: boolean = false;
  @State mDialogItemSelectIndex: number = 0;
  @State mDialogItemSelectTextColor: number | string = Color.Transparent;
  cancel?: () => void
  onItemClick?: (data: string, index: number) => void
  dialogController: CustomDialogController = new CustomDialogController({
    builder: BottomListDialogComponent({
      showOrClose: (currentHeight, isOpen) => {this.onShowOrClose(currentHeight, isOpen)},
      itemOnClick: (data, index) => {this.onItem(data, index)},
      mDialogComponentHeight: $mDialogHeight,
      mDialogComponentMastColor: $mDialogMaskColor,
      mDialogComponentTitleHeight: $mDialogTitleHeight,
      mItemListData: $mListData,
      mItemHeight: $mDialogItemHeight,
      mItemTextSize: $mDialogItemTextSize,
      mItemTextColor: $mDialogItemTextColor,
      mDialogComponentBackgroundColor: $mDialogBackgroundColor,
      mItemDividerBackgroundColor: $mDialogItemDividerBackgroundColor,
      mItemDividerStrokeWidth: $mDialogItemDividerStrokeWidth,
      mCancelDividerBackgroundColor: $mDialogCancelDividerBackgroundColor,
      mCancelDividerStrokeWidth: $mDialogCancelDividerStrokeWidth,
      mDialogTitleText: $dialogTitle,
      mDialogTitleSize: $dialogTitleSize,
      mDialogTitleColor: $dialogTitleColor,
      mDialogCancelText: $dialogCancel,
      mDialogCancelSize: $dialogCancelSize,
      mDialogCancelColor: $dialogCancelColor,
      mSelectIcon: $mDialogSelectIcon,
      mIsShowSelect: $isShowSelect,
      mSelectIndex: $mDialogItemSelectIndex,
      mSelectTextColor: $mDialogItemSelectTextColor
    }),
    autoCancel: true,
    alignment: DialogAlignment.Bottom,
    offset: { dx: 0, dy: 0 },
    customStyle: true,
    maskColor: Color.Transparent
  })

  showDialog() {
    this.createOpenAnimator(true, 0);
    if (this.dialogTitleColor != undefined) {
      this.dialogController.open()
      this.mOpenAnimator.play()
    }
  }

  closeDialog(currentHeight: number) {
    this.createOpenAnimator(false, currentHeight);
    this.mOpenAnimator.play();
  }

  onShowOrClose(currentHeight: number, isOpen: boolean) {
    if (isOpen) {
      this.createOpenAnimator(true, currentHeight);
      this.mOpenAnimator.play();
    } else {
      this.closeDialog(currentHeight);
      if(this.cancel != undefined) {
        this.cancel();
      }
    }
  }

  onItem(data: string, index:number) {
    if(this.onItemClick != undefined) {
      this.onItemClick(data, index);
    }
    this.closeDialog(this.mDialogHeight);
  }

  private createOpenAnimator(isShow: boolean, currentHeight: number) {
    let beginHeight:number = 0;
    let endHeight:number = 0;
    if (isShow) {
      beginHeight = currentHeight;
      endHeight = this.mDialogItemHeight * this.mListData.length + this.mDialogTitleHeight * (this.dialogTitle ? 2 : 1)
      + this.mListData.length * this.mDialogItemDividerStrokeWidth + this.mDialogCancelDividerStrokeWidth;
    } else {
      beginHeight = currentHeight;
      endHeight = 0;
    }
    let options: AnimatorOptions = {
      duration: 500,
      easing: "friction",
      delay: 0,
      fill: "forwards",
      direction: "normal",
      iterations: 1,
      begin: beginHeight,
      end: endHeight
    };

    this.mOpenAnimator = animator.create(options)
    this.mOpenAnimator.onframe =  (value)=> {
      this.mDialogHeight = value
    }
    this.mOpenAnimator.onfinish =  ()=> {
      if (!isShow) {
        this.dialogController.close();
      }
    }
  }

  build() {

  }
}