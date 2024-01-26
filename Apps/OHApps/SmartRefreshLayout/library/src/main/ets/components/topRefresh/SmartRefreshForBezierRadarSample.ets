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
struct SmartRefreshForBezierRadarSample {
  @Link modelBezierRadar: SmartRefreshForBezierRadarSample.Model
  @BuilderParam header?: () => void
  @BuilderParam main?: () => void
  @BuilderParam footer?: () => void
  private needScroller: boolean = false
  @State headerIsVisibleLoadMore :boolean = true
  @State footerIsVisibleLoadMore :boolean = false
  @State headerHeight: number = 0
  @State footerHeight: number = 0
  @State scrollerIsEnableRollWhenRefreshing: boolean = true

  @State scrollHeight : number = 0
  @State footerHeightPercentage: string = "0%"
  @State scrollHeightPercentage : string = "100%"
  private scrollAreaChangeHeight : number = 0
  private columnAreaChangeHeight: number = 0

  refreshClose(location:ESObject) { //重置Scroller
    this.needScroller = true
    this.modelBezierRadar.refreshState = SmartRefreshForBezierRadarSample.REFRESHSTATE.NONE
  }

  aboutToAppear(){
    if (this.modelBezierRadar.initRefreshing) { //初始化刷新  头部允许刷新
      this.scrollerInit()
    }
  }

  scrollerInit() {

    this.headerIsVisibleLoadMore = true
    this.headerHeight = this.modelBezierRadar.initHeaderHeight
    this.modelBezierRadar.headerHeight = this.headerHeight
    this.modelBezierRadar.refreshState = SmartRefreshForBezierRadarSample.REFRESHSTATE.REFRESHING
    if (this.modelBezierRadar.refreshHeaderCallback) { //初始化刷新的回调
      this.modelBezierRadar.refreshHeaderCallback()
    }
    if(this.modelBezierRadar.getRefreshFinishStopDuration() > 0) {//刷新结束过后停留的时间
      setTimeout(() => {
        this.modelBezierRadar.refreshState = SmartRefreshForBezierRadarSample.REFRESHSTATE.REFRESHFINISH
      }, this.modelBezierRadar.refreshDuration);
    }
    this.modelBezierRadar.refreshTimeOut = setTimeout(() => {
      this.headerHeight = 0
      this.modelBezierRadar.headerHeight = 0
      this.headerIsVisibleLoadMore = false
      this.refreshClose(SmartRefreshForBezierRadarSample.LOCATION.HEAD)
      this.modelBezierRadar.refreshTimeOut = 0
      this.closeHeaderRefresh()//关闭头部刷新效果
    }, this.modelBezierRadar.refreshDuration + this.modelBezierRadar.getRefreshFinishStopDuration());
  }

  build() {
    Column() {
      if (this.header && this.modelBezierRadar.headerIsRefresh) {
        if (this.modelBezierRadar.fixedContent && !this.modelBezierRadar.flyRefreshHeaderIsShow) {
          Flex() {
            this.header()
          }.height(this.headerHeight).zIndex(this.modelBezierRadar.zHeaderIndex)
          .backgroundColor(this.modelBezierRadar.getBackgroundShadowColor()).visibility((this.headerIsVisibleLoadMore && this.modelBezierRadar.enableRefresh) ? Visibility.Visible : Visibility.None)
        }
      }
      Scroll(this.modelBezierRadar.scroller) {
        Column() {
          if (this.needScroller) { //重置Scroller
            Text("0").visibility(Visibility.None)
          } else {
            Text("1").visibility(Visibility.None)
          }
          if (this.main) {
            this.main()
          }
        }
        .onAreaChange((oldValue: Area, newValue: Area) => {
          this.scrollAreaChangeHeight = Number(newValue.height)
        })
      }
      .enabled(this.scrollerIsEnableRollWhenRefreshing)
      .height(this.scrollHeightPercentage)
      .align(Alignment.Top)
      .enabled(this.scrollerIsEnableRollWhenRefreshing)
      .onScrollEdge((side: Edge) => {
        if (side.valueOf() == 0) { //滑动到顶部
          this.modelBezierRadar.refreshHeaderCallbackState = true
          this.modelBezierRadar.refreshBottomCallbackState = false
          this.modelBezierRadar.scrollLocation = SmartRefreshForBezierRadarSample.LOCATION.HEAD
        }
        if (side.valueOf() == 2) { //滑动到底部
          this.modelBezierRadar.refreshBottomCallbackState = true
          this.modelBezierRadar.refreshHeaderCallbackState = false
          this.modelBezierRadar.firstArriveBottomEdgeOffsetY = this.modelBezierRadar.scroller.currentOffset().yOffset
          this.modelBezierRadar.scrollLocation = SmartRefreshForBezierRadarSample.LOCATION.FOOT
        }
      })
      .onScroll((xOffset: number, yOffset: number) => {
        if(!this.modelBezierRadar.disableContentWhenRefresh && (this.modelBezierRadar.refreshState == SmartRefreshForBezierRadarSample.REFRESHSTATE.REFRESHING || this.modelBezierRadar.refreshState == SmartRefreshForBezierRadarSample.REFRESHSTATE.REFRESHFINISH)) {
          //do nothing->设置下拉刷新过程中不可以拖动
        } else {
          if (this.modelBezierRadar.fixedContent != this.modelBezierRadar.oldFixedContent) {//内容固定
            this.needScroller = true
            this.modelBezierRadar.oldFixedContent = this.modelBezierRadar.fixedContent
          }
          this.modelBezierRadar.latestYOffset = this.modelBezierRadar.scroller.currentOffset().yOffset
          this.scrollerEventFunction()
        }
      })
      .onTouch((event: TouchEvent) => this.contentEnableScroll(event))

      if (this.footer && this.modelBezierRadar.footerIsRefresh) {
        Flex({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center }) {
          this.footer()
        }.opacity(1)
        .height(this.footerHeightPercentage)
        .backgroundColor(this.modelBezierRadar.getBackgroundShadowColor())
        .visibility((this.footerIsVisibleLoadMore && this.modelBezierRadar.enableLoadMore) ? Visibility.Visible : Visibility.None)
      }
    }
    .height("100%")
    .onAreaChange((oldValue: Area, newValue: Area) => {
      this.columnAreaChangeHeight = Number(newValue.height)
    })
  }

  //刷新过程中是否可以滚动列表
  scrollerIsEnableRollWhenRefreshingFunction() {
    if (this.modelBezierRadar.refreshState == SmartRefreshForBezierRadarSample.REFRESHSTATE.REFRESHING || this.modelBezierRadar.refreshState == SmartRefreshForBezierRadarSample.REFRESHSTATE.REFRESHFINISH) {
      if (this.modelBezierRadar.scrollLocation == SmartRefreshForBezierRadarSample.LOCATION.HEAD) {
        if (!this.modelBezierRadar.disableContentWhenRefresh) {
          this.scrollerIsEnableRollWhenRefreshing = false
        } else {
          this.scrollerIsEnableRollWhenRefreshing = true
        }
      }
      if(this.modelBezierRadar.scrollLocation == SmartRefreshForBezierRadarSample.LOCATION.FOOT) {
        if(!this.modelBezierRadar.disableContentWhenLoading) {
          this.scrollerIsEnableRollWhenRefreshing = false
        } else {
          this.scrollerIsEnableRollWhenRefreshing = true
        }
      }
    } else {
      this.scrollerIsEnableRollWhenRefreshing = true
    }
  }



  scrollerEventFunction() {
    if (this.modelBezierRadar.scrollLocation == SmartRefreshForBezierRadarSample.LOCATION.HEAD && this.needScroller) {
      this.needScroller = false
      this.modelBezierRadar.scrollerEndYOffset = 0
      this.modelBezierRadar.scrollerEndState = true
      this.headerHeight = this.modelBezierRadar.initHeaderHeight
      this.modelBezierRadar.headerHeight = this.modelBezierRadar.initHeaderHeight
    } else if (this.modelBezierRadar.scrollLocation == SmartRefreshForBezierRadarSample.LOCATION.FOOT && this.needScroller) {
      this.needScroller = false
      this.modelBezierRadar.scrollerEndYOffset = this.modelBezierRadar.firstArriveBottomEdgeOffsetY
      this.modelBezierRadar.scrollerEndState = true
      if(this.modelBezierRadar.enableScrollContentWhenLoaded) {//是否在加载完成之后滚动内容显示新数据
        this.modelBezierRadar.scroller.scrollEdge(Edge.Bottom)
      } else {
        if(this.modelBezierRadar.refreshState == SmartRefreshForBezierRadarSample.REFRESHSTATE.TOREFRESH
          || this.modelBezierRadar.refreshState == SmartRefreshForBezierRadarSample.REFRESHSTATE.REFRESHING
          || this.modelBezierRadar.refreshState == SmartRefreshForBezierRadarSample.REFRESHSTATE.REFRESHFINISH) {
          this.modelBezierRadar.scroller.scrollEdge(Edge.Bottom)
        } else {
          this.modelBezierRadar.scroller.scrollTo({xOffset: 0, yOffset: this.modelBezierRadar.firstArriveBottomEdgeOffsetY})
        }
      }
    }
  }

  contentEnableScroll(event: TouchEvent) {
    //判断头部刷新时是否可以滚动
    //只能头部控制刷新时，不可以操作。底部加载时，设置列表不可以操作需要刷新页面设置scrollable，则内容会回到顶部。
    if(this.modelBezierRadar.refreshState == SmartRefreshForBezierRadarSample.REFRESHSTATE.REFRESHING || this.modelBezierRadar.refreshState == SmartRefreshForBezierRadarSample.REFRESHSTATE.REFRESHFINISH) {
      if(this.modelBezierRadar.scrollLocation == SmartRefreshForBezierRadarSample.LOCATION.HEAD && this.modelBezierRadar.disableContentWhenRefresh) {
        this.touchEventFunction(event)
      } else {
        this.scrollerIsEnableRollWhenRefreshingFunction()
      }
      if(this.modelBezierRadar.scrollLocation == SmartRefreshForBezierRadarSample.LOCATION.FOOT && this.modelBezierRadar.disableContentWhenLoading) {
        this.touchEventFunction(event)
      } else {
        this.scrollerIsEnableRollWhenRefreshingFunction()
      }
    } else {
      this.touchEventFunction(event)
    }
  }

  // touch事件
  touchEventFunction(event: TouchEvent) {
    switch (event.type) {
      case TouchType.Down: // 手指按下
        this.headerHeight = 0
        this.modelBezierRadar.headerHeight = 0
        this.modelBezierRadar.initScrollerYOffset = this.modelBezierRadar.scroller.currentOffset().yOffset
      // 记录按下的y坐标
        this.modelBezierRadar.downY = event.touches[0].y
        break
      case TouchType.Move: // 手指移动
        this.modelBezierRadar.currentMouseX = event.touches[0].screenX;
        this.modelBezierRadar.downYOffset = event.touches[0].y - this.modelBezierRadar.downY
      //记录拖拽方向
        this.modelBezierRadar.dragDirection = this.modelBezierRadar.downYOffset > 0 ? true : false
      //到达底部，而向下拖动，则清楚到达底部的标识
        if(this.modelBezierRadar.scrollLocation == SmartRefreshForBezierRadarSample.LOCATION.FOOT && this.modelBezierRadar.dragDirection) {
          this.modelBezierRadar.scrollLocation = SmartRefreshForBezierRadarSample.LOCATION.MIDDER
        }
      // 下拉方向判断头部刷新
        if(this.modelBezierRadar.dragDirection) {
          if (this.modelBezierRadar.downYOffset > this.modelBezierRadar.initScrollerYOffset) {
            this.headerIsVisibleLoadMore = true
            this.footerIsVisibleLoadMore = false
          }
          //下拉头部刷新样式回调
          if (this.modelBezierRadar.refreshHeaderCallbackState && this.modelBezierRadar.headerRefreshId == -1 && this.modelBezierRadar.headerHeight > (this.modelBezierRadar.initHeaderHeight / 2)) {
            this.modelBezierRadar.refreshHeaderCallbackState = false
            this.modelBezierRadar.refreshHeaderCallback()
          }
          this.dragDownDirection_Move(event)
          return
        }
        break
      case TouchType.Up: // 手指抬起
        if (this.modelBezierRadar.dragDirection && this.headerIsVisibleLoadMore) {
          this.dragDownDirection_UP(this.modelBezierRadar.downYOffset)
        } else if (!this.modelBezierRadar.dragDirection && this.footerIsVisibleLoadMore) {
          this.dragUpDirection_UP(Math.abs(this.modelBezierRadar.downYOffset))
        }
        break
      case TouchType.Cancel:
    }
  }

  dragDownDirection_Move(event: TouchEvent) {
    switch (this.modelBezierRadar.refreshState) {
      case SmartRefreshForBezierRadarSample.REFRESHSTATE.NONE:
        this.modelBezierRadar.refreshState = SmartRefreshForBezierRadarSample.REFRESHSTATE.TOREFRESH
        break
      case SmartRefreshForBezierRadarSample.REFRESHSTATE.TOREFRESH:
        let dragOffsetY = Math.abs(event.touches[0].y - this.modelBezierRadar.downY) + this.modelBezierRadar.srlHeaderInsetStart
        if (this.headerHeight <= this.modelBezierRadar.initHeaderHeight) {
          this.headerHeight = dragOffsetY
          this.modelBezierRadar.headerHeight = dragOffsetY
        }
        if (dragOffsetY > this.modelBezierRadar.initHeaderHeight) { //下拉超过默认值
          //下拉超出初始范围
          this.headerHeight = this.modelBezierRadar.initHeaderHeight + (Math.pow(dragOffsetY - this.modelBezierRadar.initHeaderHeight, this.modelBezierRadar.dragRate))
          this.modelBezierRadar.headerHeight = this.headerHeight
        }
        this.modelBezierRadar.refreshState = SmartRefreshForBezierRadarSample.REFRESHSTATE.TOREFRESH
        break
      case SmartRefreshForBezierRadarSample.REFRESHSTATE.REFRESHING:
        if ((event.touches[0].y - this.modelBezierRadar.downY) > 0) { //刷新状态下拉
          this.headerHeight = this.modelBezierRadar.initHeaderHeight + (Math.pow(event.touches[0].y - this.modelBezierRadar.downY, this.modelBezierRadar.dragRate))
          this.modelBezierRadar.headerHeight = this.headerHeight
        }
        break
      default:
    }
  }

  dragDownDirection_UP(downYOffsetParam: number) {
    if (this.modelBezierRadar.refreshState != SmartRefreshForBezierRadarSample.REFRESHSTATE.NONE) {
      if (this.modelBezierRadar.refreshState == SmartRefreshForBezierRadarSample.REFRESHSTATE.TOREFRESH) {
        if (this.headerHeight < (this.modelBezierRadar.initHeaderHeight * this.modelBezierRadar.headerTriggerRate)) { //未下滑到指定位置则不刷新(头部高度小于默认高度)
          this.headerIsVisibleLoadMore = false  //小于头部固定高度时，则隐藏头部
          this.closeHeaderRefresh()//关闭头部刷新效果
          this.refreshClose(SmartRefreshForBezierRadarSample.LOCATION.HEAD)
        } else {
          this.headerHeight = this.modelBezierRadar.initHeaderHeight //重置头部高度
          this.modelBezierRadar.headerHeight = this.modelBezierRadar.initHeaderHeight
          this.needScroller = true
          this.modelBezierRadar.refreshState = SmartRefreshForBezierRadarSample.REFRESHSTATE.REFRESHING //更改为刷新态
          if (this.modelBezierRadar.refreshTimeOut == 0) {
            if(this.modelBezierRadar.getRefreshFinishStopDuration() > 0) {//刷新结束过后停留的时间
              setTimeout(() => {
                this.modelBezierRadar.refreshState = SmartRefreshForBezierRadarSample.REFRESHSTATE.REFRESHFINISH
              }, this.modelBezierRadar.refreshDuration);
            }
            this.modelBezierRadar.refreshTimeOut = setTimeout(() => {
              this.modelBezierRadar.refreshTimeOut = 0
              this.headerIsVisibleLoadMore = false
              this.refreshClose(SmartRefreshForBezierRadarSample.LOCATION.HEAD)
              this.modelBezierRadar.lastRefreshTime = new Date()
              this.closeHeaderRefresh()//关闭头部刷新效果
              this.modelBezierRadar.refreshHeaderDataCallback()
            }, this.modelBezierRadar.refreshDuration + this.modelBezierRadar.getRefreshFinishStopDuration());
          }
        }
      } else if (this.modelBezierRadar.refreshState == SmartRefreshForBezierRadarSample.REFRESHSTATE.REFRESHING) {
        this.headerHeight = this.modelBezierRadar.initHeaderHeight //重置头部高度
        this.modelBezierRadar.headerHeight = this.modelBezierRadar.initHeaderHeight
      }
    }
  }

  dragUpDirection_Move(event: TouchEvent) {
    let dragOffsetY = Math.abs(event.touches[0].y - this.modelBezierRadar.downY) + this.modelBezierRadar.srlFooterInsetStart
    if (this.footerHeight < this.modelBezierRadar.initFooterHeight && this.modelBezierRadar.refreshState != SmartRefreshForBezierRadarSample.REFRESHSTATE.REFRESHING) {
      this.footerHeight = dragOffsetY
      this.scrollHeight = this.columnAreaChangeHeight - this.footerHeight
      this.footerHeightPercentage = (this.footerHeight / this.columnAreaChangeHeight * 100) + "%"
      this.scrollHeightPercentage = (this.scrollHeight / this.columnAreaChangeHeight * 100) + "%"
      this.modelBezierRadar.footerHeight = this.footerHeight
    } else {
      if (this.modelBezierRadar.refreshState != SmartRefreshForBezierRadarSample.REFRESHSTATE.REFRESHING
        && (this.modelBezierRadar.downY - event.touches[0].y) > 0 && dragOffsetY > this.modelBezierRadar.initFooterHeight) { //非刷新状态上拉
        this.footerHeight = this.modelBezierRadar.initFooterHeight + (Math.pow(dragOffsetY - this.modelBezierRadar.initFooterHeight, this.modelBezierRadar.dragRate))
        this.modelBezierRadar.footerHeight =  this.footerHeight
        this.scrollHeight = this.columnAreaChangeHeight - this.footerHeight
        this.footerHeightPercentage = (this.footerHeight / this.columnAreaChangeHeight * 100) + "%"
        this.scrollHeightPercentage = (this.scrollHeight / this.columnAreaChangeHeight * 100) + "%"
        this.modelBezierRadar.refreshState = SmartRefreshForBezierRadarSample.REFRESHSTATE.TOREFRESH
      }
      if (this.modelBezierRadar.refreshState == SmartRefreshForBezierRadarSample.REFRESHSTATE.REFRESHING && dragOffsetY > 0) { //刷新状态下拉
        this.footerHeight = this.modelBezierRadar.initFooterHeight + (Math.pow(dragOffsetY, this.modelBezierRadar.dragRate))
        this.modelBezierRadar.footerHeight =  this.footerHeight
      }
    }
  }

  dragUpDirection_UP(downYOffsetParam: number) {
    if (this.modelBezierRadar.refreshState != SmartRefreshForBezierRadarSample.REFRESHSTATE.NONE) {
      if (this.modelBezierRadar.refreshState == SmartRefreshForBezierRadarSample.REFRESHSTATE.TOREFRESH) {
        if (downYOffsetParam <= (this.modelBezierRadar.initFooterHeight * this.modelBezierRadar.footerTriggerRate)) { //未下滑到指定位置则不刷新
          this.footerIsVisibleLoadMore = false  //小于尾部固定高度时，则隐藏尾部
          this.refreshClose(SmartRefreshForBezierRadarSample.LOCATION.HEAD)
          this.footerHeight = 0
          this.modelBezierRadar.footerHeight = this.footerHeight
          this.footerHeightPercentage = "0%"
          this.scrollHeightPercentage = "100%"
        } else {
          this.footerHeight = this.modelBezierRadar.initFooterHeight //重置尾部高度
          this.modelBezierRadar.footerHeight = this.footerHeight
          this.footerHeightPercentage = (this.footerHeight / this.columnAreaChangeHeight * 100) + "%"
          this.scrollHeightPercentage = ((this.columnAreaChangeHeight - this.footerHeight) / this.columnAreaChangeHeight * 100) + "%"
          this.needScroller = true
          this.modelBezierRadar.refreshState = SmartRefreshForBezierRadarSample.REFRESHSTATE.REFRESHING //更改为刷新态
          if (this.modelBezierRadar.refreshTimeOut == 0) {
            if(this.modelBezierRadar.getRefreshFinishStopDuration() > 0) {//刷新结束过后停留的时间
              setTimeout(() => {
                this.modelBezierRadar.refreshState = SmartRefreshForBezierRadarSample.REFRESHSTATE.REFRESHFINISH
              }, this.modelBezierRadar.refreshDuration);
            }
            this.modelBezierRadar.refreshTimeOut = setTimeout(() => {
              this.footerIsVisibleLoadMore = false
              this.refreshClose(SmartRefreshForBezierRadarSample.LOCATION.HEAD)
              this.modelBezierRadar.refreshTimeOut = 0
              this.modelBezierRadar.lastRefreshTime = new Date()
              this.closeFooterRefresh()
              this.modelBezierRadar.refreshBottomDataCallback()
            }, this.modelBezierRadar.refreshDuration + this.modelBezierRadar.getRefreshFinishStopDuration());
          }
        }
      } else if (this.modelBezierRadar.refreshState == SmartRefreshForBezierRadarSample.REFRESHSTATE.REFRESHING) {
        this.footerHeight = this.modelBezierRadar.initFooterHeight //重置尾部高度
        this.modelBezierRadar.footerHeight =  this.footerHeight
      }
    }
  }

  //滚动结束，关闭刷新
  closeHeaderRefresh() {
    this.headerHeight = 0
    this.modelBezierRadar.headerHeight = 0
    this.modelBezierRadar.refreshHeaderCallbackState = true
    this.modelBezierRadar.refreshBottomCallbackState = false
    this.scrollerIsEnableRollWhenRefreshing = true//结束刷新，设置scroll可以滚动
    clearInterval(this.modelBezierRadar.headerRefreshId)
    this.modelBezierRadar.headerRefreshId = -1
  }

  closeFooterRefresh() {
    this.footerHeight = 0
    this.modelBezierRadar.footerHeight =  this.footerHeight
    this.footerHeightPercentage = "0%"
    this.scrollHeightPercentage = "100%"
    this.modelBezierRadar.refreshHeaderCallbackState = false
    this.modelBezierRadar.refreshBottomCallbackState = true
    this.scrollerIsEnableRollWhenRefreshing = true
    clearInterval(this.modelBezierRadar.bottomRefreshId)
    this.modelBezierRadar.bottomRefreshId = 0
  }
}

namespace SmartRefreshForBezierRadarSample {
  export enum LOCATION {
    HEAD = 0,
    MIDDER = 1,
    FOOT = 2,
  }

  export enum REFRESHSTATE {
    NONE = 0,
    TOREFRESH = 1,
    REFRESHING = 2,
    REFRESHFINISH = 3
  }

  export enum RefreshPositionEnum {
    TOP = 0, BOTTOM = 1, TOPANDBOTTOM = 2
  }

  export enum ClassicsSpinnerStyleEnum {
    //变换样式：Translate(平行移动 底部)、Scale（拉伸形变）、FixedBehind（固定在背后固定于顶部）
    TRANSLATE = 0, SCALE = 1, FIXEDBEHIND = 2
  }

  export class Model {
    scroller: Scroller = new Scroller()
    headerHeight: number = 10 //实际头部高度
    initHeaderHeight: number = 200 //标准头部高度

    downY: number= 0
    currentMouseX: number = 0 //获取下拉中鼠标的X轴坐标
    scrollLocation: LOCATION = LOCATION.HEAD
    refreshDuration: number = 5000 //刷新态持续时间
    toRefreshDuration: number = 250
    refreshTimeOut: number= 0
    refreshInterval: number= 0
    initRefreshing: boolean = true
    latestYOffset: number = 0
    refreshState: REFRESHSTATE = REFRESHSTATE.NONE //刷新状态
    zHeaderIndex: number = 2 //首部zIndex
    zMainIndex: number = 2;
    zFooterIndex: number = 2;
    backgroundColor: Color | string | number= Color.Gray //主题色
    accentColor: Color = Color.White //内容颜色
    lastRefreshTime: Date = new Date() //上次刷新时间
    refreshHeaderDataCallback: () => void = () => {};//刷新头部数据回调
    refreshBottomDataCallback: () => void = () => {};//刷新头部数据回调
    refreshHeaderCallback: () => void = ()=> {}//刷新时的回调
    refreshHeaderCallbackState: boolean = true
    refreshBottomCallback: () => void = ()=> {}//刷新时的回调
    refreshBottomCallbackState: boolean = false
    disableContentWhenRefresh : boolean = false //下拉过程是否支持列表滚动
    disableContentWhenLoading : boolean = false //上拉过程是否支持列表滚动
    enableLoadMoreWhenContentNotFull : boolean = false //在内容不满一页的时候，是否可以上拉加载更多
    headerTriggerRate : number = 1
    refreshFinishStopDuration: number = 1000
    enableScrollContentWhenLoaded: boolean = true //是否在加载完成之后滚动内容显示新数据

    //waveSwipe
    downYOffset = 0
    fixedContent: boolean = true
    oldFixedContent: boolean = true
    waterDropYTopCoordinate = 0
    waterDropYMiddleCoordinate = 400
    waterDropYBottomCoordinate = 600
    //classics
    classicsSpinnerStyle: ClassicsSpinnerStyleEnum =  ClassicsSpinnerStyleEnum.FIXEDBEHIND
    drawableSize : number = 100
    drawableArrow :boolean = true
    drawableArrowSize : number = 100
    drawableProgress : boolean = true
    drawableProgressSize: number = 50
    drawableMarginRight: number = 130
    timeShowState: boolean = true
    headerRefreshId: number = 0
    bottomRefreshId: number = 0
    backgroundShadowColor: Color = Color.Gray
    refreshHeaderPullDown: string = "下拉刷新"
    refreshHeaderRelease : string = "释放刷新"
    refreshHeaderRefreshing: string  = "正在刷新"
    refreshHeaderRefreshFinish: string  = "完成刷新"
    refreshHeaderFailed : string = "刷新失败"
    textSizeTitle : number = 30//标题文字大小
    textSizeTime: number = 22//设置时间文字大小
    textTimeMarginTop: number = 10//设置上边距

    //storeHouse
    textColor : Color = Color.Red

    //materialRefresh
    progressBackgroundColorSchemeResource: Color[] =  [Color.Blue, Color.Red, Color.Green]

    //bottom
    footerHeight: number = 210 //实际头部高度
    initFooterHeight: number = 210
    firstArriveBottomEdgeOffsetY: number = 0
    dragArriveBottomEdgeState: boolean = true
    dragDirection: boolean = true //true：下拉  false上拉
    initScrollerYOffset: number = 0
    tempTitleHeight: number = this.initHeaderHeight
    tempDownY: number = -1
    titleName: string = ''
    expand: boolean = false
    flyRefreshHeaderIsShow: boolean = false
    scrollerEndYOffset: number = 0 //和scrollerEndState结合使用
    scrollerEndState: boolean = false//和scrollerEndYOffset结合使用
    srlHeaderInsetStart: number = 0//Header的起始偏移量
    srlFooterInsetStart: number = 0//Footer的起始偏移量
    enableRefresh:boolean = true;//是否开启下拉刷新功能（默认true）
    enableLoadMore: boolean = true;//是否开启上拉加载功能（默认true）
    dragRate: number = 0.8	//显示拖动高度/真实拖动高度（默认0.5，阻尼效果）
    headerMaxDragRate: number = 0.8	//阻尼效果（默认0.8，要求<=1）
    footerMaxDragRate: number = 0.8  //Footer阻尼效果（默认0.8，要求<=1）

    //bottomClassics
    classicsBottomSpinnerStyle: ClassicsSpinnerStyleEnum =  ClassicsSpinnerStyleEnum.FIXEDBEHIND
    classicsBottomDrawableArrow :boolean = true
    classicsBottomDrawableSize : number = 100
    classicsBottomDrawableArrowSize : number = 100
    classicsBottomDrawableMarginRight: number = 130
    classicsBottomRefreshPullDown: string = "上拉刷新"
    classicsBottomRefreshRelease : string = "释放刷新"
    classicsBottomRefreshRefreshing: string  = "正在刷新"
    classicsBottomRefreshFailed : string = "刷新失败"
    classicsBottomTextSizeTitle : number = 30//标题文字大小
    classicsBottomTextSizeTime: number = 22//设置时间文字大小
    classicsBottomAccentColor: Color = Color.White
    footerTriggerRate: number = 1

    refreshPosition: RefreshPositionEnum = RefreshPositionEnum.TOPANDBOTTOM
    headerIsRefresh: boolean = true
    footerIsRefresh: boolean = true

    enableHorizontalDrag: boolean = false
    primaryColor:string = "#0000FF"
    radarFillColor:string = "#ADD8E6"

    setEnableHorizontalDrag(enableHorizontalDrag: boolean) : Model{
      this.enableHorizontalDrag = enableHorizontalDrag
      return this
    }

    getEnableHorizontalDrag() :boolean {
      return this.enableHorizontalDrag
    }
    setPrimaryColor(primaryColor: string) : Model{
      this.primaryColor = primaryColor
      return this
    }

    getPrimaryColor() :string {
      return this.primaryColor
    }
    setRadarFillColor(radarFillColor: string) : Model{
      this.radarFillColor = radarFillColor
      return this
    }

    getRadarFillColor() :string {
      return this.radarFillColor
    }

    setEnableScrollContentWhenLoaded(enableScrollContentWhenLoaded: boolean) : Model{
      this.enableScrollContentWhenLoaded = enableScrollContentWhenLoaded
      return this
    }

    setRefreshFinishStopDuration(refreshFinishStopDuration: number) :Model {
      this.refreshFinishStopDuration = refreshFinishStopDuration
      return this
    }

    getRefreshFinishStopDuration(): number{
      return this.refreshFinishStopDuration
    }

    setHeaderTriggerRate(headerTriggerRate: number) : Model{
      this.headerTriggerRate = headerTriggerRate
      return this
    }

    setFooterTriggerRate(footerTriggerRate: number) : Model{
      this.footerTriggerRate = footerTriggerRate
      return this
    }

    setClassicsBottomAccentColor(classicsBottomAccentColor: Color) : Model {
      this.classicsBottomAccentColor = classicsBottomAccentColor
      return this
    }

    getClassicsBottomAccentColor() : Color {
      return this.classicsBottomAccentColor
    }

    setClassicsBottomSpinnerStyle(classicsBottomSpinnerStyle: ClassicsSpinnerStyleEnum) : Model {
      this.classicsBottomSpinnerStyle = classicsBottomSpinnerStyle
      return this
    }

    setClassicsBottomDrawableArrow(classicsBottomDrawableArrow: boolean) : Model {
      this.classicsBottomDrawableArrow = classicsBottomDrawableArrow
      return this
    }

    getClassicsBottomDrawableArrow() : boolean {
      return this.classicsBottomDrawableArrow
    }

    setClassicsBottomDrawableSize(classicsBottomDrawableSize: number) : Model {
      this.classicsBottomDrawableSize = classicsBottomDrawableSize
      return this
    }

    setClassicsBottomDrawableArrowSize(classicsBottomDrawableArrowSize: number) : Model {
      this.classicsBottomDrawableArrowSize = classicsBottomDrawableArrowSize
      return this
    }

    setClassicsBottomDrawableMarginRight(classicsBottomDrawableMarginRight: number) : Model {
      this.classicsBottomDrawableMarginRight = classicsBottomDrawableMarginRight
      return this
    }

    setRefreshFooterPullDown(classicsBottomRefreshPullDown: string) : Model {
      this.classicsBottomRefreshPullDown = classicsBottomRefreshPullDown
      return this
    }

    setRefreshFooterRelease(classicsBottomRefreshRelease: string) : Model {
      this.classicsBottomRefreshRelease = classicsBottomRefreshRelease
      return this
    }

    setRefreshFooterRefreshing(classicsBottomRefreshRefreshing: string) : Model {
      this.classicsBottomRefreshRefreshing = classicsBottomRefreshRefreshing
      return this
    }

    setFefreshFooterFailed(classicsBottomRefreshFailed: string) : Model {
      this.classicsBottomRefreshFailed = classicsBottomRefreshFailed
      return this
    }

    setFooterTextSizeTitle(classicsBottomTextSizeTitle: number) : Model {
      this.classicsBottomTextSizeTitle = classicsBottomTextSizeTitle
      return this
    }

    setFooterTextSizeTime(classicsBottomTextSizeTime: number) : Model {
      this.classicsBottomTextSizeTime = classicsBottomTextSizeTime
      return this
    }


    setEnableLoadMoreWhenContentNotFull(enableLoadMoreWhenContentNotFull: boolean) : Model {
      this.enableLoadMoreWhenContentNotFull = enableLoadMoreWhenContentNotFull
      return this
    }

    getEnableLoadMoreWhenContentNotFull() : boolean {
      return this.enableLoadMoreWhenContentNotFull
    }

    setDisableContentWhenRefresh(disableContentWhenRefresh : boolean) : Model {
      this.disableContentWhenRefresh = disableContentWhenRefresh
      return this
    }

    getDisableContentWhenRefresh() : boolean {
      return this.disableContentWhenRefresh
    }

    setDisableContentWhenLoading(disableContentWhenLoading : boolean) : Model {
      this.disableContentWhenLoading = disableContentWhenLoading
      return this
    }

    getDisableContentWhenLoading() : boolean {
      return this.disableContentWhenLoading
    }

    setDrawableArrowSize(drawableArrowSize : number) : Model {
      if (this.drawableSize < this.drawableArrowSize ) {
        this.drawableArrowSize = this.drawableSize
      } else {
        this.drawableArrowSize = drawableArrowSize
      }
      return this
    }

    setDrawableSize(drawableSize : number) : Model {
      this.drawableSize = drawableSize
      return this
    }

    setDrawableArrow(drawableArrow : boolean) : Model {
      this.drawableArrow = drawableArrow
      return this
    }

    getDrawableArrow() : boolean {
      return this.drawableArrow
    }

    setDrawableProgress(drawableProgress : boolean) : Model {
      this.drawableProgress = drawableProgress
      return this
    }

    getDrawableProgress() : boolean {
      return this.drawableProgress
    }

    setDrawableProgressSize(drawableProgressSize : number) : Model {
      this.drawableProgressSize = drawableProgressSize
      return this
    }

    setClassicsSpinnerStyle(classicsSpinnerStyle : ClassicsSpinnerStyleEnum): Model {
      this.classicsSpinnerStyle = classicsSpinnerStyle
      return this
    }

    setDrawableMarginRight(drawableMarginRight : number) : Model {
      this.drawableMarginRight = drawableMarginRight
      return this
    }
    getDrawableMarginRight(): number {
      return this.drawableMarginRight
    }

    setAccentColor(accentColor : Color) : Model {
      this.accentColor = accentColor
      return this
    }

    getAccentColor(): Color {
      return this.accentColor
    }

    setProgressBackgroundColorSchemeResource(resource: Color[]) : Model {
      this.progressBackgroundColorSchemeResource = resource
      return this
    }

    setTextColor(textColor : Color) : Model {
      this.textColor = textColor
      return this
    }

    setTextTimeMarginTop(textTimeMarginTop : number) : Model {
      this.textTimeMarginTop = textTimeMarginTop
      return this
    }
    setTextSizeTitle(textSizeTitle: number) : Model{
      this.textSizeTitle = textSizeTitle
      return this
    }

    setTextSizeTime(textSizeTime: number) : Model {
      this.textSizeTime = textSizeTime
      return this
    }

    setRefreshHeaderRelease(refreshHeaderRelease: string) : Model {
      this.refreshHeaderRelease = refreshHeaderRelease
      return this
    }

    setRefreshHeaderPullDown(refreshHeaderPullDown: string) : Model {
      this.refreshHeaderPullDown = refreshHeaderPullDown
      return this
    }

    setRefreshHeaderRefreshing(refreshHeaderRefreshing: string) : Model {
      this.refreshHeaderRefreshing = refreshHeaderRefreshing
      return this
    }


    setRefreshHeaderRefreshFinish(refreshHeaderRefreshFinish: string) : Model {
      this.refreshHeaderRefreshFinish = refreshHeaderRefreshFinish
      return this
    }

    setRefreshHeaderFailed(refreshHeaderFailed: string) : Model {
      this.refreshHeaderFailed = refreshHeaderFailed
      return this
    }

    setDragRate(dragRate: number) : Model {
      if(this.headerMaxDragRate <= dragRate) {
        dragRate = this.headerMaxDragRate
      }
      this.dragRate = dragRate
      return this
    }

    setHeaderMaxDragRate(headerDragRate : number) : Model {
      if(1 <= headerDragRate) {
        headerDragRate = 1
      }
      this.headerMaxDragRate = headerDragRate
      return this
    }
    setFooterMaxDragRate(footerDragRate : number) : Model {
      if(1 <= footerDragRate) {
        footerDragRate = 1
      }
      this.footerMaxDragRate = footerDragRate
      return this
    }

    setReboundDuration( duration: number) : Model {
      this.refreshDuration = duration
      return this
    }

    setEnableRefresh(enableRefresh: boolean) : Model {
      this.enableRefresh = enableRefresh
      return this
    }

    getEnableRefresh() : boolean{
      return this.enableRefresh
    }

    setEnableLoadMore(enableLoadMore: boolean) : Model {
      this.enableLoadMore = enableLoadMore
      return this
    }

    getEnableLoadMore() : boolean{
      return this.enableLoadMore
    }

    setSrlHeaderInsetStart(srlHeaderInsetStart: number) : Model {
      this.srlHeaderInsetStart = srlHeaderInsetStart
      return this
    }

    getSrlHeaderInsetStart() : number{
      return this.srlHeaderInsetStart
    }

    setSrlFooterInsetStart(srlFooterInsetStart: number) : Model {
      this.srlFooterInsetStart = srlFooterInsetStart
      return this
    }

    getSrlFooterInsetStart() : number{
      return this.srlFooterInsetStart
    }

    isFinishRefresh(): boolean{
      return this.refreshState == REFRESHSTATE.REFRESHING ? true : false
    }
    getState() : REFRESHSTATE{
      return this.refreshState
    }

    isFinishLoadMore(): REFRESHSTATE{
      return this.refreshState
    }

    getDownYOffset() : number {
      return this.downYOffset
    }

    setExpand(expand: boolean) : Model {
      this.expand = expand
      return this
    }

    setTitleName(titleName: string) : Model {
      this.titleName = titleName
      return this
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

    getBottomRefreshId(): number {
      return this.bottomRefreshId
    }

    setBottomRefreshId(bottomRefreshId: number): Model {
      this.bottomRefreshId = bottomRefreshId
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
      if(this.refreshPosition.valueOf() == 0) {
        this.headerIsRefresh = true
        this.footerIsRefresh = false
      }
      if(this.refreshPosition.valueOf() == 1) {
        this.headerIsRefresh = false
        this.footerIsRefresh = true
      }
      if(this.refreshPosition.valueOf() == 2) {
        this.headerIsRefresh = true
        this.footerIsRefresh = true
      }
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

    setRefreshHeaderDataCallback(callback: () => void): Model { //设置头部刷新时的回调
      this.refreshHeaderDataCallback = callback
      return this
    }


    setRefreshBottomDataCallback(callback: () => void): Model { //设置头部刷新时的回调
      this.refreshBottomDataCallback = callback
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

export default SmartRefreshForBezierRadarSample