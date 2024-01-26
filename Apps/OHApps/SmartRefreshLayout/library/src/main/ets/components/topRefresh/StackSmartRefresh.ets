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
@Component
struct StackSmartRefresh {
  @State model: StackSmartRefresh.Model = new StackSmartRefresh.Model()
  @BuilderParam header?: () => {}
  @BuilderParam main?: () => {}
  @State needScroller: boolean= false
  //  @BuilderParam footer?: () => {}
  private refreshLocation : boolean = false //true 内容跟随偏移， false: 内容不偏移

  refreshEnd(location) { //重置Scroller
    this.needScroller = true
    this.model.refreshState = StackSmartRefresh.REFRESHSTATE.NONE
    //    let that = this
    //    if (location == StackSmartRefresh.LOCATION.HEAD) {
    //      that.model.scroller.scrollTo({
    //        xOffset: 0,
    //        yOffset: this.model.initHeaderHeight,
    //        animation: { duration: 250, curve: Curve.Ease }
    //      })
    //    } else if (location == StackSmartRefresh.LOCATION.FOOT) {
    //
    //    }
  }

  build() {
    Scroll(this.model.scroller) {
      Column() {
        if (this.needScroller) { //重置Scroller
          Text("0").visibility(Visibility.None)
        } else {
          Text("1").visibility(Visibility.None)
        }
        if (this.header) {
          if (!this.refreshLocation) {
            Flex() {
              this.header()
            }.height(0).zIndex(this.model.zIndex)
          } else {
            Flex() {
              this.header()
            }.height(this.model.headerHeight).zIndex(this.model.zIndex)
          }
        }
        if (this.main) {
            this.main()
        }
        //        if (this.footer) {
        //          Flex() {
        //            this.footer()
        //          }.height(this.model.footerHeight)
        //        }
      }.width('100%')
    }
    .scrollable(ScrollDirection.Vertical)
    .scrollBar(BarState.Off)
    .backgroundColor(this.model.backgroundColor)
    //    .onScrollEdge((side: Edge) => {
    //      if (side == 1) { //滑动到底部
    //        this.model.headerHeight = 0
    //        this.model.scrollLocation = StackSmartRefresh.LOCATION.FOOT
    //      }
    //      if (side == 0) { //滑动到顶部
    //        this.model.footerHeight = 0
    //        this.model.scrollLocation = StackSmartRefresh.LOCATION.HEAD
    //      }
    //    })
    .onScroll((xOffset: number, yOffset: number) => {
      let that = this
      this.model.latestYOffset = this.model.scroller.currentOffset().yOffset
      if (!this.model.init) { //初始化刷新
        this.model.init = true
        this.model.headerHeight = this.model.initHeaderHeight
        this.model.refreshState = StackSmartRefresh.REFRESHSTATE.REFRESHING
        this.model.scroller.scrollTo({
          xOffset: 0,
          yOffset: 0,
          animation: { duration: 10, curve: Curve.Ease }
        })

        this.model.refreshTimeOut = setTimeout(() => {//时间到，结束刷新
          this.refreshEnd(StackSmartRefresh.LOCATION.HEAD)
          this.model.refreshTimeOut = 0
        }, this.model.refreshDuration);
      }
      if (this.refreshLocation) {//刷新跟随内容移动
        if (this.needScroller) { //重置Scroller
          this.needScroller = false
          if (this.model.scroller.currentOffset().yOffset < this.model.headerHeight) {
            this.model.scroller.scrollTo({
              xOffset: 0,
              yOffset: this.model.initHeaderHeight,
              animation: { duration: this.model.toRefreshDuration, curve: Curve.Ease }
            })
          }
        }
      }
    })
    .onTouch((event: TouchEvent) => {
      if (event.type === TouchType.Down) {
        this.model.waterDropYTopCoordinate = 0
        this.model.waterDropYMiddleCoordinate = 400
        this.model.waterDropYBottomCoordinate = 600
        this.model.downY = event.touches[0].y
      }

      if (event.type === TouchType.Move) {
        this.model.dropMoveState = true
        this.model.dropUpState = false
        if (this.model.refreshState != StackSmartRefresh.REFRESHSTATE.REFRESHING &&
        this.model.scroller.currentOffset().yOffset < this.model.initHeaderHeight
        && (event.touches[0].y - this.model.downY) > 0) { //非刷新状态下拉
          if ((event.touches[0].y - this.model.downY) > this.model.initHeaderHeight) { //下拉超出初始范围
            this.model.headerHeight = this.model.initHeaderHeight + (Math.pow(event.touches[0].y - this.model.downY - this.model.initHeaderHeight, 0.8))
          }
          this.model.refreshState = StackSmartRefresh.REFRESHSTATE.TOREFRESH
        } else if (this.model.refreshState == StackSmartRefresh.REFRESHSTATE.REFRESHING && (event.touches[0].y - this.model.downY) > 0) { //刷新状态下拉
          this.model.headerHeight = this.model.initHeaderHeight + (Math.pow(event.touches[0].y - this.model.downY, 0.8))
        }
      }

      if (event.type === TouchType.Up) {
        this.model.dropMoveState = false
        this.model.dropUpState = true
        if (this.model.refreshState != StackSmartRefresh.REFRESHSTATE.NONE) {
          this.model.headerHeight = this.model.initHeaderHeight //重置头部高度
          if (this.model.refreshState == StackSmartRefresh.REFRESHSTATE.TOREFRESH) {
            if (this.model.scroller.currentOffset().yOffset >= this.model.initHeaderHeight / 2) { //未下滑到指定位置则不刷新
              this.refreshEnd(StackSmartRefresh.LOCATION.HEAD)
            } else {
              this.model.scroller.scrollTo({ //刷新，滑动至头部
                xOffset: 0,
                yOffset: 0,
                animation: { duration: 10, curve: Curve.Ease }
              })
              this.model.refreshState = StackSmartRefresh.REFRESHSTATE.REFRESHING //更改为刷新态
              if (this.model.refreshTimeOut == 0) {
                this.model.refreshTimeOut = setTimeout(() => {
                  this.refreshEnd(StackSmartRefresh.LOCATION.HEAD)
                  this.model.refreshTimeOut = 0
                  this.model.lastRefreshTime = new Date()
                }, this.model.refreshDuration);
              }
            }
          }
        }
      }
    })
  }
}

namespace StackSmartRefresh {
  export enum LOCATION {
    HEAD = 0,
    MIDDER = 1,
    FOOT = 2,
  }

  export enum REFRESHSTATE {
    NONE = 0,
    TOREFRESH = 1,
    REFRESHING = 2,
  }

  export class Model {
    scroller: Scroller = new Scroller()
    refreshIsShow: boolean = false
    headerHeight: number = 150 //实际头部高度
    footerHeight: number = 0
    initHeaderHeight: number = 150 //标准头部高度
    initFooterHeight: number = 150
    downY: number= 0
    scrollLocation: LOCATION = LOCATION.HEAD
    refreshDuration: number = 5000 //刷新态持续时间
    toRefreshDuration: number = 250 //
    refreshTimeOut: number= 0
    refreshInterval: number= 0
    init: boolean = false
    latestYOffset: number = 0
    refreshState: REFRESHSTATE = REFRESHSTATE.NONE //刷新状态
    zIndex: number = 2 //首部zIndex
    backgroundColor: Color | string | number= Color.Gray //主题色
    lastRefreshTime: Date = new Date() //上次刷新时间
    dropMoveState : boolean = false
    dropUpState : boolean = false
    waterDropYTopCoordinate = 0
    waterDropYMiddleCoordinate = 400
    waterDropYBottomCoordinate = 600

    getOffset(): number{ //下拉偏移量，标准为1
      if (this.headerHeight > this.initHeaderHeight) {
        return this.headerHeight / this.initHeaderHeight
      } else {
        return (this.headerHeight - this.latestYOffset) / this.initHeaderHeight
      }
    }

    getLastRefreshTime(): Date{//获取上次刷新时间
      return this.lastRefreshTime
    }

    setBackgroundColor(color: Color | string | number) {//设置主题色
      this.backgroundColor = color
    }
  }
}

export default StackSmartRefresh