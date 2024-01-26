
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import SmartRefreshForFlyRefresh from "./SmartRefreshForFlyRefresh"
import FlyRefreshHeaderAircraft from "./FlyRefreshHeaderAircraft"
@Component
export struct FlyRefreshHeader {
  @Link model: SmartRefreshForFlyRefresh.Model
  private settings: RenderingContextSettings = new RenderingContextSettings(true)
  private context: CanvasRenderingContext2D = new CanvasRenderingContext2D(this.settings)
  @State ready: boolean = false
  private mScale: number= 0
  protected mScaleX: number = 1
  protected mScaleY: number = 1
  protected mTrunk: Path2D = new Path2D();
  protected mBranch: Path2D = new Path2D();
  @State x: number = 0
  @State y: number = 0
  @State angle: number = 0
  @State isClick: boolean = true
  @State isAdd: boolean = false
  @State initHeight: number = this.model.initHeaderHeight
  aboutToAppear(){ //当独走头部刷新
    this.model.flyRefreshHeaderIsShow = true
  }
  build() {
    Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Start }) {
      Text('' + this.changeStatus(this.model)).visibility(Visibility.None)
      Stack() {
        Image($r("app.media.bg1"))
          .width('100%')
          .height(150 + ((this.model.getOffset() > 1 ? this.model.getOffset() : 1) - 1) * 150)
          .objectFit(ImageFit.Fill)
        Stack() {
          Image($r("app.media.tree1"))
            .width(20).height(30)
            .objectFit(ImageFit.Contain)
            .position({ x: 140, y: -10 + ((this.model.getOffset() > 1 ? this.model.getOffset() : 1) - 1) * 20 })
          Image($r("app.media.tree2"))
            .width(20).height(40)
            .objectFit(ImageFit.Contain)
            .position({ x: 165, y: -25 + ((this.model.getOffset() > 1 ? this.model.getOffset() : 1) - 1) * 20 })
          Image( $r("app.media.bg2")).width('100%').height('100%').objectFit(ImageFit.Fill)
        }.width('100%').height((120 + ((this.model.getOffset() > 1 ? this.model.getOffset() : 1) - 1) * 120))
        Stack() {
          Image($r("app.media.tree4"))
            .width(10).height(50)
            .objectFit(ImageFit.Fill)
            .position({ x: 380, y: -43 })
          Image($r("app.media.tree3"))
            .width(12).height(65)
            .objectFit(ImageFit.Fill)
            .position({ x: 410, y: -58 })
          Image($r("app.media.tree5"))
            .width(10).height(50)
            .objectFit(ImageFit.Fill)
            .position({ x: 440, y: -45 })
          Image($r("app.media.bg3")).width('100%').height('100%').objectFit(ImageFit.Fill)
        }.width('100%').height((80 + ((this.model.getOffset() > 1 ? this.model.getOffset() : 1) - 1) * 10))
        FlyRefreshHeaderAircraft({modelParam : $model})
      }
      .alignContent(Alignment.Bottom)
      .width('100%')
      .height('100%')
    }
    .backgroundColor('#33AAFF')
    .width('100%').height(this.initHeight)
  }
  changeStatus(model:SmartRefreshForFlyRefresh.Model) {
    if (model.refreshState == SmartRefreshForFlyRefresh.REFRESHSTATE.TOREFRESH || model.refreshState == SmartRefreshForFlyRefresh.REFRESHSTATE.NONE) { //下拉中
      this.initHeight = model.headerHeight > model.initHeaderHeight ? model.headerHeight : model.initHeaderHeight
    } else if (model.refreshState == SmartRefreshForFlyRefresh.REFRESHSTATE.REFRESHING) { //刷新中
      this.initHeight = model.initHeaderHeight
    }
  }
}