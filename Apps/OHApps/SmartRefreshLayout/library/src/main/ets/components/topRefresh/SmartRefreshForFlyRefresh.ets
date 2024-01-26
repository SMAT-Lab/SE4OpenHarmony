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
struct SmartRefreshForFlyRefresh {
  @Link modelFly: SmartRefreshForFlyRefresh.Model
  @BuilderParam header?: () =>  void
  @BuilderParam main?: () => void
  @State needScroller: boolean = false
  @BuilderParam footer?: () =>  void
  @State headerIsVisibleLoadMore :boolean = true
  @State footerIsVisibleLoadMore :boolean = false

  refreshClose(location:ESObject) { //重置Scroller
    this.needScroller = true
    this.modelFly.refreshState = SmartRefreshForFlyRefresh.REFRESHSTATE.NONE
  }

  build() {
    Column() {
      if (this.modelFly.expand){
        Flex({ alignItems: ItemAlign.End }) {
          Text(this.modelFly.titleName)
            .width('100%')
            .fontColor("white")
            .padding(30)
            .fontSize(55)
        }
        .height(this.modelFly.tempTitleHeight)
        .backgroundColor(this.modelFly.backgroundColor)
      }
      if (this.modelFly.flyRefreshHeaderIsShow){ // for FlyRefreshHeader
        Flex({ alignItems: ItemAlign.End }) {
          if (this.header) {
            this.header()
          }
        }.height(this.modelFly.headerHeight > this.modelFly.initHeaderHeight ? this.modelFly.headerHeight : this.modelFly.initHeaderHeight)
        .zIndex(this.modelFly.zHeaderIndex)
        .backgroundColor(this.modelFly.getBackgroundShadowColor())
      }
      Column() {
        Stack({ alignContent: Alignment.Top }) {
          if (this.header) {
            if (!this.modelFly.fixedContent) {
              Flex() {
                this.header()
              }.height(this.modelFly.headerHeight).zIndex(this.modelFly.zHeaderIndex).backgroundColor(this.modelFly.getBackgroundShadowColor()).visibility(this.headerIsVisibleLoadMore ? Visibility.Visible : Visibility.None)
            }
          }
          Scroll(this.modelFly.scroller) {
            Column() {
              if (this.needScroller) { //重置Scroller
                Text("0").visibility(Visibility.None)
              } else {
                Text("1").visibility(Visibility.None)
              }
              if (this.header) {
                if (this.modelFly.fixedContent && !this.modelFly.flyRefreshHeaderIsShow) {
                  Flex() {
                    this.header()
                  }.height(this.modelFly.headerHeight).zIndex(this.modelFly.zHeaderIndex)
                  .backgroundColor(this.modelFly.getBackgroundShadowColor()).visibility(this.headerIsVisibleLoadMore ? Visibility.Visible : Visibility.None)
                }
              }
              if (this.main) {
                Flex() {
                  this.main()
                }.zIndex(this.modelFly.zMainIndex)
              }
              if (this.footer) {
                Flex() {
                  this.footer()
                }
                .height(this.modelFly.footerHeight)
                .zIndex(this.modelFly.zFooterIndex)
                .backgroundColor(this.modelFly.getBackgroundShadowColor())
                .visibility(this.footerIsVisibleLoadMore ? Visibility.Visible : Visibility.None)
              }
            }.width('100%')
          }
          .scrollable(ScrollDirection.Vertical)
          .scrollBar(BarState.Off)
          .onScrollEdge((side: Edge) => {
            if (side == 0) { //滑动到顶部
              this.modelFly.refreshHeaderCallbackState = true
              this.modelFly.refreshBottomCallbackState = false
              this.modelFly.scrollLocation = SmartRefreshForFlyRefresh.LOCATION.HEAD
            }
            if (side == 1) { //滑动到底部
              if (this.modelFly.dragArriveBottomEdgeState) {
                this.modelFly.dragArriveBottomEdgeState = false
                this.modelFly.refreshBottomCallbackState = true
                this.modelFly.refreshHeaderCallbackState = false
                this.modelFly.firstArriveBottomEdgeOffsetY = this.modelFly.scroller.currentOffset().yOffset
              }
              this.modelFly.scrollLocation = SmartRefreshForFlyRefresh.LOCATION.FOOT
            }
          })
          .onScroll((xOffset: number, yOffset: number) => {
            if (this.modelFly.fixedContent != this.modelFly.oldFixedContent) {//内容固定
              this.needScroller = true
              this.modelFly.oldFixedContent = this.modelFly.fixedContent
            }
            this.modelFly.latestYOffset = this.modelFly.scroller.currentOffset().yOffset
            if (this.modelFly.initRefreshing) { //初始化刷新
              this.scrollerInit()
            }
            this.scrollerEventFunction()
          })
          .onScrollEnd(() => {
            if (this.modelFly.scrollerEndState) {
              this.modelFly.scrollerEndState = false
              this.modelFly.scroller.scrollTo({
                xOffset: 0,
                yOffset: this.modelFly.scrollerEndYOffset,
                animation: { duration: 10, curve: Curve.Ease }
              })
            }
          })
          .onTouch((event: TouchEvent) => this.touchEventFunction(event))
        }
      }
    }
  }

  scrollerInit() {
    this.modelFly.initRefreshing = false
    this.headerIsVisibleLoadMore = true
    this.modelFly.headerHeight = this.modelFly.initHeaderHeight
    this.modelFly.refreshState = SmartRefreshForFlyRefresh.REFRESHSTATE.REFRESHING
    this.modelFly.scroller.scrollTo({
      xOffset: 0,
      yOffset: 0,
      animation: { duration: 10, curve: Curve.Ease }
    })
    if (this.modelFly.refreshHeaderCallback) { //初始化刷新的回调
      this.modelFly.refreshHeaderCallback()
    }
    this.modelFly.refreshTimeOut = setTimeout(() => {
      this.headerIsVisibleLoadMore = false
      this.refreshClose(SmartRefreshForFlyRefresh.LOCATION.HEAD)
      this.modelFly.refreshTimeOut = 0
    }, this.modelFly.refreshDuration);
  }

  scrollerEventFunction() {
    if (this.modelFly.scrollLocation == SmartRefreshForFlyRefresh.LOCATION.HEAD && this.needScroller) {
      this.closeHeaderRefresh()
      this.needScroller = false
      this.modelFly.scrollerEndYOffset = 0
      this.modelFly.scrollerEndState = true
      this.modelFly.scroller.scrollTo({
        xOffset: 0,
        yOffset: 0,
        animation: { duration: this.modelFly.toRefreshDuration, curve: Curve.Ease }
      })
    }
  }

  //滚动结束，关闭刷新
  closeHeaderRefresh() {
    this.modelFly.refreshHeaderCallbackState = true
    this.modelFly.refreshBottomCallbackState = false
    clearInterval(this.modelFly.headerRefreshId)
    this.modelFly.headerRefreshId = -1
  }

  closeFooterRefresh() {
    this.modelFly.refreshHeaderCallbackState = false
    this.modelFly.refreshBottomCallbackState = true
    clearInterval(this.modelFly.headerRefreshId)
  }

  // touch事件
  touchEventFunction(event: TouchEvent) {
    switch (event.type) {
      case TouchType.Down: // 手指按下
        this.modelFly.headerHeight = 210
        this.modelFly.initScrollerYOffset = this.modelFly.scroller.currentOffset().yOffset
        this.modelFly.scrollToEdgeStatus = true
      // 记录按下的y坐标
        this.modelFly.downY = event.touches[0].y
        break
      case TouchType.Move: // 手指移动
        this.modelFly.currentMouseX = event.touches[0].screenX;
        this.modelFly.downYOffset = event.touches[0].y - this.modelFly.downY
      //记录拖拽方向
        this.modelFly.dragDirection = this.modelFly.downYOffset > 0 ? true : false
        if(this.modelFly.dragDirection) {
          if (this.modelFly.downYOffset > this.modelFly.initScrollerYOffset) {
            this.headerIsVisibleLoadMore = true
            this.footerIsVisibleLoadMore = false
          }
          if (this.modelFly.refreshHeaderCallbackState) {
            this.modelFly.refreshHeaderCallbackState = false
            this.modelFly.refreshHeaderCallback()
          }
          this.dragDownDirection_Move(event)
        } else {// 尾部刷新
          if (this.modelFly.firstArriveBottomEdgeOffsetY == 0 || this.modelFly.scrollLocation != SmartRefreshForFlyRefresh.LOCATION.FOOT) {//第一次进入，高度为默认高度0
            this.headerIsVisibleLoadMore = false
            this.footerIsVisibleLoadMore = false
          } else {
            if (Math.abs(this.modelFly.downYOffset) > (this.modelFly.firstArriveBottomEdgeOffsetY - this.modelFly.initScrollerYOffset)) {
              this.headerIsVisibleLoadMore = false
              this.footerIsVisibleLoadMore = true
            }
          }
          if (this.modelFly.refreshBottomCallbackState) {
            this.modelFly.refreshBottomCallbackState = false
            this.modelFly.refreshBottomCallback()
          }
          this.dragUpDirection_Move(event)
        }
        break
      case TouchType.Up: // 手指抬起
        this.modelFly.downYOffset = event.touches[0].y - this.modelFly.downY
        if (this.modelFly.downYOffset > 0) {
          this.dragDownDirection_UP(this.modelFly.downYOffset)
        } else if (this.modelFly.downYOffset < 0) {

          this.dragUpDirection_UP(Math.abs(this.modelFly.downYOffset))
        }
        break
      case TouchType.Cancel:
    }
  }

  dragDownDirection_Move(event: TouchEvent) {
    switch (this.modelFly.refreshState) {
      case SmartRefreshForFlyRefresh.REFRESHSTATE.NONE:
        this.modelFly.refreshState = SmartRefreshForFlyRefresh.REFRESHSTATE.TOREFRESH
        break
      case SmartRefreshForFlyRefresh.REFRESHSTATE.TOREFRESH:
        if ((event.touches[0].y - this.modelFly.downY) > 0) { //下拉超过默认值
          //下拉超出初始范围
          this.modelFly.headerHeight = this.modelFly.initHeaderHeight + (Math.pow(event.touches[0].y - this.modelFly.downY, 0.8))
        }
        this.modelFly.refreshState = SmartRefreshForFlyRefresh.REFRESHSTATE.TOREFRESH
        break
      case SmartRefreshForFlyRefresh.REFRESHSTATE.REFRESHING:
        if ((event.touches[0].y - this.modelFly.downY) > 0) { //刷新状态下拉
          this.modelFly.headerHeight = this.modelFly.initHeaderHeight + (Math.pow(event.touches[0].y - this.modelFly.downY, 0.8))
        }
        break
      default:
    }
  }

  dragDownDirection_UP(downYOffsetParam: number) {
    if (this.modelFly.refreshState != SmartRefreshForFlyRefresh.REFRESHSTATE.NONE) {
      if (this.modelFly.refreshState == SmartRefreshForFlyRefresh.REFRESHSTATE.TOREFRESH) {
        if (this.modelFly.headerHeight < this.modelFly.initHeaderHeight) { //未下滑到指定位置则不刷新(头部高度小于默认高度)
          this.headerIsVisibleLoadMore = false  //小于头部固定高度时，则隐藏头部
          this.closeHeaderRefresh()
          this.refreshClose(SmartRefreshForFlyRefresh.LOCATION.HEAD)
        } else {
          this.modelFly.headerHeight = this.modelFly.initHeaderHeight //重置头部高度
          this.modelFly.scroller.scrollEdge(Edge.Start) //刷新，滑动至头部
          this.modelFly.scrollerEndYOffset = 0
          this.modelFly.scrollerEndState = true
          this.modelFly.refreshState = SmartRefreshForFlyRefresh.REFRESHSTATE.REFRESHING //更改为刷新态
          if (this.modelFly.refreshTimeOut == 0) {
            this.modelFly.refreshTimeOut = setTimeout(() => {
              this.headerIsVisibleLoadMore = false
              this.closeHeaderRefresh()
              this.refreshClose(SmartRefreshForFlyRefresh.LOCATION.HEAD)
              this.modelFly.refreshTimeOut = 0
              this.modelFly.lastRefreshTime = new Date()
            }, this.modelFly.refreshDuration);
          }
        }
      } else if (this.modelFly.refreshState == SmartRefreshForFlyRefresh.REFRESHSTATE.REFRESHING) {
        this.modelFly.headerHeight = this.modelFly.initHeaderHeight //重置头部高度
      }
    }
  }

  dragUpDirection_Move(event: TouchEvent) {
    let dragOffsetY = Math.abs(event.touches[0].y - this.modelFly.downY)
    if (this.modelFly.footerHeight < this.modelFly.initFooterHeight && this.modelFly.refreshState != SmartRefreshForFlyRefresh.REFRESHSTATE.REFRESHING) {
      this.modelFly.footerHeight = dragOffsetY
    } else {
      if (this.modelFly.refreshState != SmartRefreshForFlyRefresh.REFRESHSTATE.REFRESHING
        && (this.modelFly.downY - event.touches[0].y) > 0 && dragOffsetY > this.modelFly.initFooterHeight) { //非刷新状态上拉
        this.modelFly.footerHeight = this.modelFly.initFooterHeight + (Math.pow(dragOffsetY - this.modelFly.initFooterHeight, 0.8))
        this.modelFly.refreshState = SmartRefreshForFlyRefresh.REFRESHSTATE.TOREFRESH
      }
      if (this.modelFly.refreshState == SmartRefreshForFlyRefresh.REFRESHSTATE.REFRESHING && dragOffsetY > 0) { //刷新状态下拉
        this.modelFly.footerHeight = this.modelFly.initFooterHeight + (Math.pow(dragOffsetY, 0.8))
      }
    }
  }

  dragUpDirection_UP(downYOffsetParam: number) {
    if (this.modelFly.refreshState != SmartRefreshForFlyRefresh.REFRESHSTATE.NONE) {
      if (this.modelFly.refreshState == SmartRefreshForFlyRefresh.REFRESHSTATE.TOREFRESH) {
        if (downYOffsetParam <= this.modelFly.initFooterHeight / 2) { //未下滑到指定位置则不刷新
          this.footerIsVisibleLoadMore = false  //小于尾部固定高度时，则隐藏尾部
          this.refreshClose(SmartRefreshForFlyRefresh.LOCATION.HEAD)
        } else {
          this.modelFly.footerHeight = this.modelFly.initFooterHeight //重置尾部高度
          this.modelFly.scroller.scrollEdge(Edge.Bottom)
          this.modelFly.refreshState = SmartRefreshForFlyRefresh.REFRESHSTATE.REFRESHING //更改为刷新态
          if (this.modelFly.refreshTimeOut == 0) {
            this.modelFly.refreshTimeOut = setTimeout(() => {
              this.footerIsVisibleLoadMore = false
              this.refreshClose(SmartRefreshForFlyRefresh.LOCATION.HEAD)
              this.modelFly.refreshTimeOut = 0
              this.modelFly.lastRefreshTime = new Date()
            }, this.modelFly.refreshDuration);
          }
        }
      } else if (this.modelFly.refreshState == SmartRefreshForFlyRefresh.REFRESHSTATE.REFRESHING) {
        this.modelFly.footerHeight = this.modelFly.initFooterHeight //重置尾部高度
      }
    }
  }
}

namespace SmartRefreshForFlyRefresh {
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

  export enum RefreshPositionEnum {
    TOP = 0, CENTER = 1, BOTTOM = 2
  }

  export class Model {
    scroller: Scroller = new Scroller()
    headerHeight: number = 210 //实际头部高度
    initHeaderHeight: number = 210 //标准头部高度

    downY: number= 0
    currentMouseX: number = 0 //获取下拉中鼠标的X轴坐标
    scrollLocation: LOCATION = LOCATION.HEAD
    refreshDuration: number = 5000 //刷新态持续时间
    toRefreshDuration: number = 250 //
    refreshTimeOut: number= 0
    refreshInterval: number= 0
    initRefreshing: boolean = true
    latestYOffset: number = 0
    refreshState: REFRESHSTATE = REFRESHSTATE.NONE //刷新状态
    zHeaderIndex: number = 2 //首部zIndex
    zMainIndex: number = 2;
    zFooterIndex: number = 2;
    backgroundColor: Color | string | number= Color.Gray //主题色
    lastRefreshTime: Date = new Date() //上次刷新时间
    refreshCallback: () => void = () => {}  //刷新时的回调
    refreshHeaderCallback: () => void = ()=>{}  //刷新时的回调
    refreshHeaderCallbackState: boolean = true
    refreshBottomCallback: () => void = ()=>{} //刷新时的回调
    refreshBottomCallbackState: boolean = false
    //waveSwipe
    downYOffset = 0
    fixedContent: boolean = true
    oldFixedContent: boolean = true
    waterDropYTopCoordinate = 0
    waterDropYMiddleCoordinate = 400//
    waterDropYBottomCoordinate = 600//
    //class
    refreshPosition: RefreshPositionEnum = RefreshPositionEnum.TOP
    timeShowState: boolean = true
    headerRefreshId: number = 0
    backgroundShadowColor: Color = Color.Gray

    //bottom
    footerHeight: number = 210 //实际头部高度
    initFooterHeight: number = 210
    firstArriveBottomEdgeOffsetY: number = 0
    dragArriveBottomEdgeState: boolean = true
    dragDirection: boolean = true //true：下拉  false上拉
    scrollToEdgeStatus: boolean = false //滚动事件是否结束
    initScrollerYOffset: number = 0
    tempTitleHeight: number = this.initHeaderHeight
    tempDownY: number = -1
    titleName: string = ''
    expand: boolean = false
    flyRefreshHeaderIsShow: boolean = false
    scrollerEndYOffset: number = 0 //和scrollerEndState结合使用
    scrollerEndState: boolean = false//和scrollerEndYOffset结合使用

    getDownYOffset() : number {
      return this.downYOffset
    }
    setExpand(expand: boolean) {
      this.expand = expand
    }

    setTitleName(titleName: string) {
      this.titleName = titleName
    }

    setZHeaderIndex(zHeaderIndex: number): Model {
      this.zHeaderIndex = zHeaderIndex;
      return this;
    }

    setZFooterHeight(zFooterIndex: number): Model {
      this.zFooterIndex = zFooterIndex;
      return this;
    }

    setZMainIndex(zMainIndex: number): Model {
      this.zMainIndex = zMainIndex;
      return this;
    }

    setFooterHeight(footerHeight: number): Model {
      this.footerHeight = footerHeight;
      return this;
    }

    setCurrentMouseX(currentMouseX: number): Model {
      this.currentMouseX = currentMouseX;
      return this;
    }

    getCurrentMouseX(): number {
      return this.currentMouseX;
    }

    getBackgroundShadowColor(): Color {
      return this.backgroundShadowColor
    }

    setBackgroundShadowColor(backgroundShadowColor: Color): Model {
      this.backgroundShadowColor = backgroundShadowColor
      return this
    }

    getHeaderRefreshId(): number {
      return this.headerRefreshId
    }

    setHeaderRefreshId(headerRefreshId: number): Model {
      this.headerRefreshId = headerRefreshId
      return this
    }

    getTimeShowState(): boolean {
      return this.timeShowState
    }

    setTimeShowState(timeShowState: boolean): Model {
      this.timeShowState = timeShowState
      return this
    }

    getRefreshPosition(): RefreshPositionEnum {
      return this.refreshPosition
    }

    setRefreshPosition(refreshPosition: RefreshPositionEnum): Model {
      this.refreshPosition = refreshPosition
      return this
    }

    getFixedContent(): boolean {
      return this.fixedContent
    }

    setFixedContent(fixedContent: boolean): Model {

      this.fixedContent = fixedContent
      return this
    }

    getOffset(): number{ //下拉偏移量，标准为1
      if (this.headerHeight > this.initHeaderHeight) {
        return this.headerHeight / this.initHeaderHeight
      } else {
        return (this.headerHeight - this.latestYOffset) / this.initHeaderHeight
      }
    }

    getLastRefreshTime(): Date{ //获取上次刷新时间
      return this.lastRefreshTime
    }

    setBackgroundColor(color: Color | string | number): Model { //设置主题色
      this.backgroundColor = color
      return this
    }

    setRefreshCallback(callback: () => void): Model { //设置头部刷新时的回调
      this.refreshHeaderCallback = callback
      return this
    }

    setRefreshHeaderCallback(callback: () => void): Model { //设置头部刷新时的回调
      this.refreshHeaderCallback = callback
      return this
    }

    setRefreshBottomCallback(callback: () => void): Model { //设置尾部刷新时的回调
      this.refreshBottomCallback = callback
      return this
    }

    getBackgroundColor(): Color | string | number {
      return this.backgroundColor
    }

    setNoInit(initRefreshing: boolean): Model {
      this.initRefreshing = initRefreshing
      return this
    }

    setToRefreshDuration(toRefreshDuration: number): Model {
      this.toRefreshDuration = toRefreshDuration
      return this
    }

    getToRefreshDuration(): number {
      return this.toRefreshDuration
    }

    setRefreshDuration(refreshDuration: number): Model {
      this.refreshDuration = refreshDuration
      return this
    }

    getRefreshDuration(): number {
      return this.refreshDuration
    }

    setInitFooterHeight(initFooterHeight: number): Model {
      this.initFooterHeight = initFooterHeight
      return this
    }

    getInitFooterHeight(): number {
      return this.initFooterHeight
    }

    setInitHeaderHeight(initHeaderHeight: number): Model {
      this.initHeaderHeight = initHeaderHeight
      return this
    }

    getInitHeaderHeight(): number {
      return this.initHeaderHeight
    }

    setHeaderHeight(headerHeight: number): Model{
      this.headerHeight = headerHeight
      return this
    }

    getHeaderHeight(): number{
      return this.headerHeight
    }
  }
}

export default SmartRefreshForFlyRefresh