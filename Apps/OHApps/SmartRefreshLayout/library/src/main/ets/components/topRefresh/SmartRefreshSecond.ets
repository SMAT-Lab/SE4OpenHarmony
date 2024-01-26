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
struct SmartRefreshSecond {
  @Link model: SmartRefreshSecond.Model
  @BuilderParam header?: () => void
  @BuilderParam main?: () => void
  @BuilderParam footer?: () => void
  @State needScroller: boolean = false
  @State headerIsVisibleLoadMore :boolean = true
  @State footerIsVisibleLoadMore :boolean = false

  refreshClose() { //重置Scroller
    this.needScroller = true
    this.model.refreshState = SmartRefreshSecond.REFRESHSTATE.NONE
  }

  aboutToAppear(){
    if (this.model.initRefreshing) { //初始化刷新  头部允许刷新
      this.scrollerInit()
    }
  }

  scrollerInit() {
    this.headerIsVisibleLoadMore = true
    this.model.headerHeight = this.model.initHeaderHeight
    this.model.refreshState = SmartRefreshSecond.REFRESHSTATE.REFRESHING
    if (this.model.refreshHeaderCallback) { //初始化刷新的回调
      this.model.refreshHeaderCallback()
    }
    this.model.refreshTimeOut = setTimeout(() => {
      this.headerIsVisibleLoadMore = false
      this.refreshClose()
      this.model.refreshTimeOut = 0
      this.closeHeaderRefresh()//关闭头部刷新效果
    }, this.model.refreshDuration);
  }

  build() {
    Column() {
      if (this.model.expand){
        Flex({ alignItems: ItemAlign.End }) {
          Text(this.model.titleName)
            .width('100%')
            .fontColor("white")
            .padding(30)
            .fontSize(55)
        }
        .height(this.model.tempTitleHeight)
        .backgroundColor(this.model.backgroundColor)
      }

      Column() {
        Stack({ alignContent: Alignment.Top }) {
          if (this.header) {
            if (this.model.fixedContent) {
              Flex() {
                this.header()
              }.height(this.model.headerHeight)
              .zIndex(this.model.zHeaderIndex)
              .backgroundColor(Color.Gray)
              .visibility(this.headerIsVisibleLoadMore ? Visibility.Visible : Visibility.None)
            }
          }
          Scroll(this.model.scroller) {
            Column() {
              if (this.header) {
                if (!this.model.fixedContent) {
                  Flex() {
                    this.header()
                  }.height(this.model.headerHeight)
                  .backgroundColor(Color.Gray)
                  .visibility(this.headerIsVisibleLoadMore ? Visibility.Visible : Visibility.None)
                }
              }
              if (this.main) {
                Flex() {
                  this.main()
                }.zIndex(this.model.zMainIndex)
              }
              if (this.footer) {
                Flex({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center }) {
                  this.footer()
                }
                .height(this.model.footerHeight)
                .zIndex(this.model.zFooterIndex)
                .backgroundColor(this.model.getBackgroundShadowColor())
                .visibility(this.footerIsVisibleLoadMore ? Visibility.Visible : Visibility.None)
              }
            }
          }
          .scrollable(ScrollDirection.Vertical)
          .scrollBar(BarState.Off)
          .onScrollEdge((side: Edge) => {
            if (side == 0) { //滑动到顶部
              this.model.refreshHeaderCallbackState = true
              this.model.refreshBottomCallbackState = false
              this.model.scrollLocation = SmartRefreshSecond.LOCATION.HEAD
            }
            if (side == 2) { //滑动到底部
              if (this.model.dragArriveBottomEdgeState) {
                this.model.dragArriveBottomEdgeState = false
                this.model.refreshBottomCallbackState = true
                this.model.refreshHeaderCallbackState = false
                this.model.firstArriveBottomEdgeOffsetY = this.model.scroller.currentOffset().yOffset
              }
              this.model.scrollLocation = SmartRefreshSecond.LOCATION.FOOT
            }
          })
          .onScroll((xOffset: number, yOffset: number) => {
            if (this.model.fixedContent != this.model.oldFixedContent) {//内容固定
              this.needScroller = true
              this.model.oldFixedContent = this.model.fixedContent
            }
            this.model.latestYOffset = this.model.scroller.currentOffset().yOffset
          })
          .onTouch((event: TouchEvent) => this.touchEventFunction(event))
        }

      }.width('100%')
    }
  }

  scrollerEventFunction() {
    if (this.model.scrollLocation == SmartRefreshSecond.LOCATION.HEAD && this.needScroller) {
      this.needScroller = false
      this.model.scrollerEndYOffset = 0
    } else if (this.model.scrollLocation == SmartRefreshSecond.LOCATION.FOOT && this.needScroller) {
      this.needScroller = false
      this.model.scrollerEndYOffset = this.model.firstArriveBottomEdgeOffsetY
      this.model.scrollerEndState = true
      if(this.model.refreshState == SmartRefreshSecond.REFRESHSTATE.TOREFRESH || this.model.refreshState == SmartRefreshSecond.REFRESHSTATE.REFRESHING) {
        this.model.scroller.scrollEdge(Edge.Bottom)
      } else {
        this.model.scroller.scrollTo({xOffset: 0, yOffset: this.model.firstArriveBottomEdgeOffsetY})
      }
    }
  }

  //滚动结束，关闭刷新
  closeHeaderRefresh() {
    this.model.headerHeight = 0
    this.model.refreshHeaderCallbackState = true
    this.model.refreshBottomCallbackState = false
    clearInterval(this.model.headerRefreshId)
    this.model.headerRefreshId = -1
  }

  closeFooterRefresh() {
    this.model.refreshHeaderCallbackState = false
    this.model.refreshBottomCallbackState = true
    clearInterval(this.model.headerRefreshId)
    this.model.headerRefreshId = -1
  }

  // touch事件
  touchEventFunction(event: TouchEvent) {
    switch (event.type) {
      case TouchType.Down: // 手指按下
        this.model.headerHeight = 1
        this.model.initScrollerYOffset = this.model.scroller.currentOffset().yOffset
        this.model.scrollToEdgeStatus = true
        // 记录按下的y坐标
        this.model.downY = event.touches[0].y
        break
      case TouchType.Move: // 手指移动
        this.model.currentMouseX = event.touches[0].screenX;
        this.model.downYOffset = event.touches[0].y - this.model.downY
        //记录拖拽方向
        this.model.dragDirection = this.model.downYOffset > 0 ? true : false
        if(this.model.dragDirection) {
          // if (this.model.downYOffset > this.model.initScrollerYOffset) {
          //   this.headerIsVisibleLoadMore = true
          //   this.footerIsVisibleLoadMore = false
          // }
          if (this.model.refreshHeaderCallbackState && this.model.headerRefreshId == -1 ) {
            this.model.refreshHeaderCallbackState = false
            this.model.refreshHeaderCallback()
          }
          this.dragDownDirection_Move(event)
        } else {// 尾部刷新
          if (this.model.firstArriveBottomEdgeOffsetY == 0 || this.model.scrollLocation != SmartRefreshSecond.LOCATION.FOOT) {//第一次进入，高度为默认高度0
            this.headerIsVisibleLoadMore = false
            this.footerIsVisibleLoadMore = false
          } else {
            if (Math.abs(this.model.downYOffset) > (this.model.firstArriveBottomEdgeOffsetY - this.model.initScrollerYOffset)) {
              this.headerIsVisibleLoadMore = false
              this.footerIsVisibleLoadMore = true
            }
          }
          if (this.model.refreshBottomCallbackState) {
            this.model.refreshBottomCallbackState = false
            this.model.refreshBottomCallback()
          }
          this.dragUpDirection_Move(event)
        }
        break
      case TouchType.Up: // 手指抬起
        this.model.downYOffset = event.touches[0].y - this.model.downY
        if (this.model.downYOffset > 0) {
          this.dragDownDirection_UP(this.model.downYOffset)
        } else if (this.model.downYOffset < 0) {
          this.dragUpDirection_UP(Math.abs(this.model.downYOffset))
        }
        break
      case TouchType.Cancel:
    }
  }

  dragDownDirection_Move(event: TouchEvent) {
    switch (this.model.refreshState) {
      case SmartRefreshSecond.REFRESHSTATE.NONE:
        this.model.refreshState = SmartRefreshSecond.REFRESHSTATE.TOREFRESH
        break
      case SmartRefreshSecond.REFRESHSTATE.TOREFRESH:
        let dragOffsetY = Math.abs(event.touches[0].y - this.model.downY)
        if (dragOffsetY <= this.model.initHeaderHeight) {
          this.model.headerHeight = dragOffsetY
        } else if (dragOffsetY > this.model.initHeaderHeight) { //下拉超过默认值
          //下拉超出初始范围
          this.model.headerHeight = this.model.initHeaderHeight + (Math.pow(event.touches[0].y - this.model.downY - this.model.initHeaderHeight, 0.8))
        }
        this.model.refreshState = SmartRefreshSecond.REFRESHSTATE.TOREFRESH
        if (this.model.downYOffset > this.model.initScrollerYOffset) {
          this.headerIsVisibleLoadMore = true
          this.footerIsVisibleLoadMore = false
        }
        break
      case SmartRefreshSecond.REFRESHSTATE.REFRESHING:
        if ((event.touches[0].y - this.model.downY) > 0) { //刷新状态下拉
          this.model.headerHeight = this.model.initHeaderHeight + (Math.pow(event.touches[0].y - this.model.downY, 0.8))
        }
        break
      default:
    }
  }

  dragDownDirection_UP(downYOffsetParam: number) {
    if (this.model.refreshState != SmartRefreshSecond.REFRESHSTATE.NONE) {
      if (this.model.refreshState == SmartRefreshSecond.REFRESHSTATE.TOREFRESH) {
        if (this.model.headerHeight < this.model.initHeaderHeight) { //未下滑到指定位置则不刷新(头部高度小于默认高度)
          this.headerIsVisibleLoadMore = false  //小于头部固定高度时，则隐藏头部
          this.closeHeaderRefresh()
          this.refreshClose()
        } else {
          this.model.headerHeight = this.model.initHeaderHeight //重置头部高度
          this.model.scroller.scrollEdge(Edge.Start) //刷新，滑动至头部
          this.model.scrollerEndYOffset = 0
          this.model.scrollerEndState = true
          this.model.refreshState = SmartRefreshSecond.REFRESHSTATE.REFRESHING //更改为刷新态

          if (this.model.refreshTimeOut == 0) {
            this.model.refreshTimeOut = setTimeout(() => {
              this.headerIsVisibleLoadMore = false
              this.refreshClose()
              this.closeHeaderRefresh()//关闭头部刷新效果
              this.model.refreshTimeOut = 0
            }, this.model.refreshDuration);
          }
        }
      } else if (this.model.refreshState == SmartRefreshSecond.REFRESHSTATE.REFRESHING) {
        this.model.headerHeight = this.model.initHeaderHeight //重置头部高度
      }
    }
  }

  dragUpDirection_Move(event: TouchEvent) {
    let dragOffsetY = Math.abs(event.touches[0].y - this.model.downY)
    if (this.model.footerHeight < this.model.initFooterHeight && this.model.refreshState != SmartRefreshSecond.REFRESHSTATE.REFRESHING) {
      this.model.footerHeight = dragOffsetY
    } else {
      if (this.model.refreshState != SmartRefreshSecond.REFRESHSTATE.REFRESHING && (this.model.downY - event.touches[0].y) > 0 && dragOffsetY > this.model.initFooterHeight) { //非刷新状态上拉
        this.model.footerHeight = this.model.initFooterHeight + (Math.pow(dragOffsetY - this.model.initFooterHeight, 0.8))
          this.model.refreshState = SmartRefreshSecond.REFRESHSTATE.TOREFRESH
      }
      if (this.model.refreshState == SmartRefreshSecond.REFRESHSTATE.REFRESHING && dragOffsetY > 0) { //刷新状态下拉
        this.model.footerHeight = this.model.initFooterHeight + (Math.pow(dragOffsetY, 0.8))
      }
    }
  }

  dragUpDirection_UP(downYOffsetParam: number) {
    if (this.model.refreshState != SmartRefreshSecond.REFRESHSTATE.NONE) {
      if (this.model.refreshState == SmartRefreshSecond.REFRESHSTATE.TOREFRESH) {
        if (downYOffsetParam <= this.model.initFooterHeight / 2) { //未下滑到指定位置则不刷新
          this.footerIsVisibleLoadMore = false  //小于尾部固定高度时，则隐藏尾部
          this.refreshClose()
          this.closeFooterRefresh()
        } else {
          this.model.footerHeight = this.model.initFooterHeight //重置尾部高度
          this.model.refreshState = SmartRefreshSecond.REFRESHSTATE.REFRESHING //更改为刷新态
          if (this.model.refreshTimeOut == 0) {

            this.model.refreshTimeOut = setTimeout(() => {
              this.footerIsVisibleLoadMore = false
              this.refreshClose()
              this.closeFooterRefresh()
              this.model.refreshTimeOut = 0
            }, this.model.refreshDuration);
          }
        }
      } else if (this.model.refreshState == SmartRefreshSecond.REFRESHSTATE.REFRESHING) {
        this.model.footerHeight = this.model.initFooterHeight //重置尾部高度
      }
    }
  }
}

namespace SmartRefreshSecond {
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
    headerHeight: number = 1 //实际头部高度
    initHeaderHeight: number = 200 //标准头部高度

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
    refreshCallback: () => void = ()=> {}//刷新时的回调
    refreshHeaderCallback: () => void = ()=> {}//刷新时的回调
    refreshHeaderCallbackState: boolean = true
    refreshBottomCallback: () => void = ()=> {}//刷新时的回调
    refreshBottomCallbackState: boolean = false
    //waveSwipe
    downYOffset = 0
    fixedContent: boolean = false
    oldFixedContent: boolean = false
    waterDropYTopCoordinate = 0
    waterDropYMiddleCoordinate = 400
    waterDropYBottomCoordinate = 600
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
    scrollerEndYOffset: number = 0 //和scrollerEndState结合使用
    scrollerEndState: boolean = false//和scrollerEndYOffset结合使用


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

    setZMainHeight(zMainIndex: number): Model {
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

export default SmartRefreshSecond