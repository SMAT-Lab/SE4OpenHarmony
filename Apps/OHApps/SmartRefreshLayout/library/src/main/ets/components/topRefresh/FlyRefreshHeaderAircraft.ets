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

@Component
export struct FlyRefreshHeaderAircraft {
  @Link modelParam: SmartRefreshForFlyRefresh.Model
  private mScale: number= 0
  protected mScaleX: number = 1
  protected mScaleY: number = 1
  protected mTrunk: Path2D = new Path2D();
  protected mBranch: Path2D = new Path2D();
  private x: number = 0
  private y: number = 0
  @State private angle: number = 0
  private isClick: boolean = true
  private isAdd: boolean = false
  private initHeight = this.modelParam.initHeaderHeight
  @State refresh: boolean= true
  private isRefreshState: boolean = false
  aboutToAppear(){
    this.modelParam.setRefreshHeaderCallback(() => this.startDraw())
    if(this.modelParam.initRefreshing) {
      this.modelParam.refreshHeaderCallback()
      this.modelParam.initRefreshing = false
    }
  }
  startDraw() : void{
    this.modelParam.headerRefreshId = setInterval(() => {
      this.changeStatus()
      this.refresh = !this.refresh
    }, 50)
  }
  build() {
    Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Start }) {
      if (this.refresh) {
        Text("0").visibility(Visibility.None)
      } else {
        Text("1").visibility(Visibility.None)
      }
      Stack() {
        Circle().width(80).height(80).fill('#33AAFF')
        Path()
          .commands('M4.02 42 L46 24 L4.02 6 L4 20 L36 24 L4 28z')
          .fill(Color.White)
          .translate({ x: this.x, y: this.y })
          .rotate({
            z: 1,
            centerX: '50%',
            centerY: '50%',
            angle: this.angle
          })
          .zIndex(999)
          .animation({
            duration: 1500, // 动画时长
            curve: Curve.EaseOut, // 动画曲线
            delay: 200, // 动画延迟
            iterations: 1, // 播放次数
            playMode: PlayMode.Normal, // 动画模式
          })
      }.onClick(event => {
        this.angle = -30
        this.modelParam.setHeaderHeight(340)
        this.initHeight = 240
        setTimeout(() => {
          this.modelParam.setHeaderHeight(200)
          this.initHeight = 200
          this.flyPosition()
        }, 1000)
      })
      .position({ x: 20, y: (this.initHeight - 40) })
    }
    .width('100%').height(this.initHeight)
  }

  changeStatus() :void {
    if (this.modelParam.refreshState == SmartRefreshForFlyRefresh.REFRESHSTATE.TOREFRESH) { //下拉中
      this.angle = -30
      this.initHeight = this.modelParam.headerHeight
    } else if (this.modelParam.refreshState == SmartRefreshForFlyRefresh.REFRESHSTATE.REFRESHING) { //刷新中
      if (!this.isRefreshState) {//不在刷新中
        this.isRefreshState = true
        this.initHeight = this.modelParam.initHeaderHeight
        this.flyPosition()
      }
    } else { //停止刷新
      if (this.isAdd) {
        if (this.modelParam.refreshCallback) {
          this.modelParam.refreshCallback()
        }
        this.isAdd = false
      }
    }
  }

  flyPosition() :void {
    if (this.isClick) {
      this.isClick = false
      this.x = 720
      this.y = -445
      this.angle = 0
      setTimeout(() => {
        this.x = 0
        this.y = 0
        this.angle = 0
        this.isRefreshState = false
        this.isClick = true
        this.isAdd = true
//        this.modelParam.refreshCallback()
        //clearInterval(this.modelParam.headerRefreshId)
      }, 5200)
      setTimeout(() => {
        this.x = -300
        this.y = -10
        this.angle = -180
      }, 3200)
      setTimeout(() => {
        this.x = 1993
        this.y = -100
        this.angle = -180
      }, 2200)
    }
  }
}
export default FlyRefreshHeaderAircraft