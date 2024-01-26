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

import {REFRESHSTATE, LOCATION} from "./SmartRefreshEnum"
export class SmartRefreshEntry {
    scroller: Scroller = new Scroller()
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
    refreshCallback: () => void = () => {}//刷新时的回调

    //waveSwipe
    downYOffset = 0
    fixedContent: boolean = true
    waterDropYTopCoordinate = 0
    waterDropYMiddleCoordinate = 400
    waterDropYBottomCoordinate = 600
    //class
    timeShowState: boolean = true

    getTimeShowState(): boolean {
      return this.timeShowState
    }

    setTimeShowState(timeShowState: boolean): void {
      this.timeShowState = timeShowState
    }

    getFixedContent(): boolean {
      return this.fixedContent
    }

    setFixedContent(fixedContent: boolean): void {
      this.fixedContent = fixedContent
    }

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

    setBackgroundColor(color: Color | string | number): void { //设置主题色
      this.backgroundColor = color
    }

    setRefreshCallback(callback: () => void): void { //设置刷新时的回调
      this.refreshCallback = callback
    }

    getBackgroundColor(): Color | string | number {
      return this.backgroundColor
    }

    setZIndex(zIndex: number): void {
      this.zIndex = zIndex
    }

    getZIndex(): number {
      return this.zIndex
    }

    setNoInit(init: boolean): void {
      this.init = init
    }

    setToRefreshDuration(toRefreshDuration: number): void {
      this.toRefreshDuration = toRefreshDuration
    }

    getToRefreshDuration(): number {
      return this.toRefreshDuration
    }

    setRefreshDuration(refreshDuration: number): void {
      this.refreshDuration = refreshDuration
    }

    getRefreshDuration(): number {
      return this.refreshDuration
    }

    setInitFooterHeight(initFooterHeight: number): void {
      this.initFooterHeight = initFooterHeight
    }

    getInitFooterHeight(): number {
      return this.initFooterHeight
    }

    setInitHeaderHeight(initHeaderHeight: number): void {
      this.initHeaderHeight = initHeaderHeight
    }

    getInitHeaderHeight(): number {
      return this.initHeaderHeight
    }
}
