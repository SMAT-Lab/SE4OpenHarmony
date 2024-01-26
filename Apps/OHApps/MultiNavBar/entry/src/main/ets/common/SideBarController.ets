/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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

import { BreakpointType, SideBarMode } from '../common/BreakpointSystem';
import { StyleConfiguration } from '../common/Configuration';
import { MenuType } from '../model/MenuType';
import { sideListData } from '../model/SideListData';

@Component
export struct SideBarController {
  @LocalStorageProp("currentBreakpoint") currentBreakpoint: string = 'md';
  @LocalStorageLink("currentSideBarMode") currentSideBarMode: string = 'list';
  @Link currentSubIndex: number;
  @Link currentMainIndex: number;
  mainController: TabsController = new TabsController();

  build() {
    Scroll() {
      Column() {
        if (new BreakpointType(false, true, true).GetValue(this.currentBreakpoint)) {
          Row() {
            Image($r('app.media.ic_public_drawer'))
              .width(24)
              .height(24)
              .margin({ top: 41, left: new SideBarMode(0, 24).GetValue(this.currentSideBarMode) })
              .id('switchButton')
              .onClick(() => {
                animateTo({ duration: 300 }, () => {
                  this.currentSideBarMode = this.currentSideBarMode === 'tabs' ? 'list' : 'tabs';
                })
              })
          }
          .width('100%')
          .justifyContent(new SideBarMode(FlexAlign.Center, FlexAlign.Start).GetValue(this.currentSideBarMode))
        }

        SideBarPrimaryNavigation({
          currentMainIndex: $currentMainIndex,
          currentSubIndex: $currentSubIndex,
          mainController: this.mainController
        }).layoutWeight(1)

        if (new BreakpointType(false, true, true).GetValue(this.currentBreakpoint)) {
          FootBarTools()
        }
      }.height('100%').backgroundColor('#f1f3f5')
    }.scrollBar(BarState.Off)
  }
}

@Component
struct AccountInfo {
  @LocalStorageProp("currentBreakpoint") currentBreakpoint: string = 'md';
  @LocalStorageProp("currentSideBarMode") currentSideBarMode: string = 'list';

  build() {
    Row() {
      Image($r('app.media.ic_mine_normal'))
        .width($r('app.float.icon_size'))
        .height($r(
          'app.float.icon_size'))
      if (this.currentSideBarMode === 'tabs') {
        Column() {
          Text('User account')
            .fontSize(16)
            .fontWeight(FontWeight.Medium)
            .fontColor('#E5000000')
          Text('139******43')
            .fontSize(16)
            .fontWeight(FontWeight.Medium)
            .fontColor('#E5000000')
        }
        .transition({ type: TransitionType.All, opacity: 0 })
        .justifyContent(FlexAlign.SpaceAround)
        .alignItems(HorizontalAlign.Start)
        .layoutWeight(1)
        .margin({ left: 12 })
      }
    }.height(48).margin({ left: new SideBarMode(0, 12).GetValue(this.currentSideBarMode) })
  }
}


@Component
export struct SearchModule {
  @LocalStorageProp("currentBreakpoint") currentBreakpoint: string = 'md';
  @LocalStorageLink("currentSideBarMode") @Watch('onCurrentSideBarModeChange') currentSideBarMode: string = 'list';
  @State searchCompWidth: number | string = '100%';
  controller: SearchController = new SearchController();
  @State searchFocusAble: boolean = true;
  @State placeholderText: Resource = $r('app.string.search');

  aboutToAppear() {
    if (this.currentSideBarMode === 'list') {
      this.searchCompWidth = 40;
      this.placeholderText = $r('app.string.nullString');
    }
  }

  onCurrentSideBarModeChange() {
    animateTo({ duration: 300, onFinish: () => {
      this.searchFocusAble = this.currentSideBarMode === 'tabs' ? true : false;
    } }, () => {
      this.searchCompWidth = this.searchCompWidth === '100%' ? 40 : '100%';
      this.placeholderText = this.searchCompWidth === 40 ? $r('app.string.nullString') : $r('app.string.search');
    })
  }

  build() {
    Row() {
      Search({
        placeholder: new BreakpointType($r('app.string.search'), this.placeholderText, this.placeholderText).GetValue(this.currentBreakpoint),
      })
        .focusable(this.searchFocusAble)
        .width('100%')
        .height(40)
        .id('searchButton')
        .onTouch((event: TouchEvent) => {
          animateTo({ duration: 300 }, () => {
            if (event.type === TouchType.Up && this.currentSideBarMode === 'list') {
              this.currentSideBarMode = 'tabs';
            }
          })
        })
        .backgroundColor('#fff')
    }
    .width(new BreakpointType('100%', this.searchCompWidth, this.searchCompWidth).GetValue(this.currentBreakpoint))
    .height(56)
    .padding(StyleConfiguration.getSubTabsControllerStyle(this.currentBreakpoint, this.currentSideBarMode)
      .searchModulePadding)
    .margin({ bottom: 8 })
  }
}

@Component
export struct SideBarPrimaryNavigation {
  @LocalStorageProp("currentBreakpoint") currentBreakpoint: string = 'md';
  @LocalStorageProp("currentSideBarMode") currentSideBarMode: string = 'list';
  @State sideListData: MenuType[] = sideListData;
  mainController: TabsController = new TabsController();
  @Link currentSubIndex: number;
  @Link currentMainIndex: number;

  subControllerChangeIndex(subController: TabsController, index: number) {
    subController.changeIndex(index);
  }

  build() {
    List() {
      if (new BreakpointType(false, true, true).GetValue(this.currentBreakpoint)) {
        ListItem() {
          AccountInfo()
        }

        ListItem() {
          SearchModule()
        }
      }


      ForEach(this.sideListData, (item: MenuType, index: number) => {
        ListItem() {
          if (this.currentBreakpoint !== 'sm' && index === this.sideListData.length - 1) {

          } else {
            Column() {
              PrimaryMenu({
                sideTitleName: item.name,
                subTitleNameList: item.subTitleList,
                changeIndex: () => this.subControllerChangeIndex,
                tabsController: item.subController,
                mainTabsController: this.mainController,
                icon: item.icon,
                currentSubIndex: $currentSubIndex,
                index: index,
                currentMainIndex: $currentMainIndex
              })
            }
          }
        }.width(StyleConfiguration.getBreakpointStyle(this.currentBreakpoint).sideBarPrimaryNavListItemWidth)
      })
    }
    .margin({ top: StyleConfiguration.getBreakpointStyle(this.currentBreakpoint).sideBarPrimaryNavListMargin })
    .padding(StyleConfiguration.getSubTabsControllerStyle(this.currentBreakpoint, this.currentSideBarMode)
      .sideBarPrimaryNavListPadding)
    .height(StyleConfiguration.getBreakpointStyle(this.currentBreakpoint).sideBarPrimaryNavListHeight)
    .backgroundColor('#f1f3f5')
    .listDirection(new BreakpointType(Axis.Horizontal, Axis.Vertical, Axis.Vertical).GetValue(this.currentBreakpoint))
    .width('100%')
    .alignListItem(ListItemAlign.Center)
  }
}


@Component
export struct PrimaryMenu {
  @LocalStorageProp("currentBreakpoint") currentBreakpoint: string = 'md';
  @LocalStorageProp("currentSideBarMode") currentSideBarMode: string = 'list';
  @Link currentSubIndex: number;
  @Link currentMainIndex: number;
  sideTitleName: Resource = $r('app.string.index');
  subTitleNameList: MenuType[] = new Array();
  changeIndex: Function = () => {
  };
  tabsController: TabsController = new TabsController();
  mainTabsController: TabsController = new TabsController();
  icon: Resource = $r('app.media.icon');
  index: number = 0;
  @State isItemWrap: boolean = false;
  @State iconList: Resource[] = [
  $r('app.media.ic_home_actived'),
  $r('app.media.ic_app_actived'),
  $r('app.media.ic_game_actived'),
  $r('app.media.ic_search_actived'),
  $r('app.media.ic_mine_actived'),
  ];

  getSelectColor() {
    if (this.index === 0 && (this.index !== this.currentMainIndex || this.currentSideBarMode === 'tabs')) {
      return '#66000000';
    } else if (this.currentSideBarMode === 'tabs') {
      return '';
    } else {
      return StyleConfiguration.getCurrentMainTabsStyle(this.index, this.currentMainIndex, this.currentBreakpoint)
        .fillColor;
    }
  }

  build() {
    Flex({ direction: FlexDirection.Column }) {
      Column() {
        Flex({ direction: FlexDirection.Column, justifyContent: FlexAlign.Center, alignItems: ItemAlign.Start }) {
          Flex({
            direction: this.isItemWrap ? FlexDirection.Column : new BreakpointType(FlexDirection.Row, FlexDirection.Row,
              this.currentSideBarMode === 'list' ? FlexDirection.Column : FlexDirection.Row)
              .GetValue(this.currentBreakpoint),
            justifyContent: StyleConfiguration.getSubTabsControllerStyle(this.currentBreakpoint, this.currentSideBarMode)
              .sideBarPrimaryMenuFlexAlign,
            alignItems: ItemAlign.Center,
            alignContent: new BreakpointType(FlexAlign.Start, FlexAlign.Start, FlexAlign.Center).GetValue(this.currentBreakpoint),
          }) {
            Image((this.index === this.currentMainIndex) && (this.currentSideBarMode === 'list' || this.currentBreakpoint === 'sm') ? this.iconList[this.index] : this.icon)
              .width(24)
              .height(24)
              .fillColor(this.getSelectColor())
              .margin(this.isItemWrap ? StyleConfiguration.getBreakpointStyle(this.currentBreakpoint)
                .sideBarPrimaryMenuImgMargin : 0)
            if (this.currentSideBarMode === 'tabs' || (this.currentBreakpoint !== 'md' && this.currentSideBarMode === 'list')) {
              Text(this.sideTitleName)
                .fontColor(this.currentSideBarMode === 'tabs' ? '#182431' : StyleConfiguration
                  .getCurrentMainTabsStyle(this.index, this.currentMainIndex, this.currentBreakpoint)
                  .fontColor as ResourceColor)
                .fontSize(StyleConfiguration.getBreakpointStyle(this.currentBreakpoint).sideBarPrimaryMenuTextSize)
                .height(StyleConfiguration.getBreakpointStyle(this.currentBreakpoint).sideBarPrimaryMenuTextHeight)
                .fontWeight(FontWeight.Medium)
                .margin(this.currentBreakpoint === 'sm' && !this.isItemWrap ?
                  {
                    left: 4
                  } : StyleConfiguration.getSubTabsControllerStyle(this.currentBreakpoint, this.currentSideBarMode)
                  .sideBarPrimaryMenuTextMargin)
                .textAlign(StyleConfiguration.getSubTabsControllerStyle(this.currentBreakpoint, this.currentSideBarMode)
                  .primaryMenuTextAlign)
                .transition({ type: TransitionType.All, opacity: 0 })
            }
          }
          .onClick(() => {
            animateTo({ duration: 300 }, () => {
              this.currentMainIndex = this.index;
              this.currentSubIndex = 0;
              this.mainTabsController.changeIndex(this.index);
            })
          })
          .width('100%')
          .height(new BreakpointType(56, 40,
            this.currentSideBarMode === 'list' ? 56 : 40)
            .GetValue(this.currentBreakpoint))
          .padding(StyleConfiguration.getSubTabsControllerStyle(this.currentBreakpoint, this.currentSideBarMode)
            .sideBarPrimaryMenuListPadding)
          .onAreaChange((oldVal, newVal) => {
            if (newVal.width > 104) {
              this.isItemWrap = false;
            } else {
              this.isItemWrap = true;
            }
          })


          if (this.currentMainIndex === this.index
            && new BreakpointType(false, true, true).GetValue(this.currentBreakpoint)
            && this.currentSideBarMode === 'tabs') {
            SecondaryMenu({
              subTitleNameList: this.subTitleNameList,
              changeIndex: this.changeIndex,
              tabsController: this.tabsController,
              currentSubIndex: $currentSubIndex
            })
          }
        }
      }
      .alignItems(new BreakpointType(HorizontalAlign.Center, HorizontalAlign.Start, HorizontalAlign.Start).GetValue(this.currentBreakpoint))
    }
    .backgroundColor('#f1f3f5')
  }
}

@Component
export struct SecondaryMenu {
  @LocalStorageProp("currentBreakpoint") currentBreakpoint: string = 'md';
  @LocalStorageProp("currentSideBarMode") currentSideBarMode: string = 'list';
  @Link currentSubIndex: number | undefined;
  subTitleNameList: MenuType[] = new Array();
  changeIndex: Function = () => {
  };
  tabsController: TabsController = new TabsController();

  build() {
    Column() {
      Column() {
        List({
          space: StyleConfiguration.getSubTabsControllerStyle(this.currentBreakpoint, this.currentSideBarMode)
            .secondMenuListSpace
        }) {
          ForEach(this.subTitleNameList, (item: MenuType, index: number) => {
            ListItem() {
              Column() {
                Text(item.name)
                  .fontSize(StyleConfiguration.getCurrentSubTabsStyle(this.currentBreakpoint, this.currentSideBarMode, index, this.currentSubIndex)
                    .fontSize)
                  .fontWeight(FontWeight.Medium)
                  .fontColor(StyleConfiguration.getCurrentSubTabsStyle(this.currentBreakpoint, this.currentSideBarMode, index, this.currentSubIndex)
                    .fontColor as ResourceColor)
                  .margin(StyleConfiguration.getSubTabsControllerStyle(this.currentBreakpoint, this.currentSideBarMode)
                    .secondMenuListItemMargin)
              }
              .height(StyleConfiguration.getSubTabsControllerStyle(this.currentBreakpoint, this.currentSideBarMode)
                .secondMenuListItemHeight)
              .padding({ top: 12, bottom: 12 })
              .justifyContent(new BreakpointType(FlexAlign.End, FlexAlign.Center, FlexAlign.Center).GetValue(this.currentBreakpoint))
              .alignItems(new BreakpointType(HorizontalAlign.Center, HorizontalAlign.Start, HorizontalAlign.Start).GetValue(this.currentBreakpoint))
              .borderRadius(8)
              .width(StyleConfiguration.getSubTabsControllerStyle(this.currentBreakpoint, this.currentSideBarMode)
                .secondMenuListItemWidth)
              .backgroundColor(StyleConfiguration.getCurrentSubTabsStyle(this.currentBreakpoint, this.currentSideBarMode, index, this.currentSubIndex)
                .backgroundColor as ResourceColor)
            }.onClick(() => {
              animateTo({ duration: 300 }, () => {
                this.currentSubIndex = index;
                this.changeIndex(this.tabsController, index);
              })
            })
          })
        }
        .width('100%')
        .listDirection(StyleConfiguration.getSubTabsControllerStyle(this.currentBreakpoint, this.currentSideBarMode)
          .secondMenuListDirection)
        .alignListItem(ListItemAlign.Center)
      }.width('100%')
    }
    .clip(true)
    .transition({ opacity: 0 })
    .width('100%')
  }
}

interface MenuElement {
  value: string;
  action: () => void;
  icon?: Resource;
}

@Component
struct FootBarTools {
  @LocalStorageProp("currentBreakpoint") currentBreakpoint: string = 'md';
  @LocalStorageProp("currentSideBarMode") currentSideBarMode: string = 'list';
  @State toolList: MenuElement[] = [
    { value: 'Menu1', action: this.callback, icon: $r('app.media.ic_favourites') },
  ];

  callback() {
  }

  build() {
    Column() {
      List({ space: 24 }) {
        if (this.currentSideBarMode === 'tabs') {
          ForEach(this.toolList, (item: MenuElement) => {
            ListItem() {
              Image(item.icon).width(24).height(24)
            }
          })
          ListItem() {
            Image($r('app.media.add')).width(24).height(24).onClick(() => {
              this.toolList.push(
                {
                  value: `Menu${this.toolList.length + 1}`,
                  action: this.callback,
                  icon: $r('app.media.ic_favourites3')
                })
            })
              .id('addTools')
          }
        } else {
          ListItem() {
            Column() {
              if (this.toolList.length >= 2) {
                Image($r('app.media.more'))
                  .width(24)
                  .height(24)
                  .bindMenu(this.toolList, { placement: Placement.TopRight })
                  .id('moreTools')
              } else {
                Image($r('app.media.ic_favourites')).width(24).height(24)
                  .fillColor('#e5000000')
              }
            }.width('100%')
          }
        }
      }
      .listDirection(Axis.Horizontal)
      .height(58)
      .width('100%')
      .padding(StyleConfiguration.getSubTabsControllerStyle(this.currentBreakpoint, this.currentSideBarMode)
        .toolBarPadding)
      .alignListItem(ListItemAlign.Center)
    }
  }
}
