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
import { CustomBreakPointStyle, CustomFontStyle, SubTabsControllerStyle } from '../model/StyleType';

export class StyleConfiguration {
  static getBreakpointStyle(currentBreakpoint: string): CustomBreakPointStyle {
    let customBreakPointStyle: CustomBreakPointStyle;
    if (currentBreakpoint === 'sm') {
      customBreakPointStyle = {
        controlButtonStyle: { left: 24, top: 40, width: 24, height: 24 },
        sideBarPrimaryNavListHeight: '56vp',
        sideBarPrimaryNavListMargin: 0,
        sideBarPrimaryNavListItemWidth: '20%',
        sideBarPrimaryMenuImgMargin: { top: 7 },
        sideBarPrimaryMenuTextSize: 10,
        sideBarPrimaryMenuTextHeight: 14,
        mainTabsContentMargin: { top: 24, bottom: 0, left: 16, right: 16 },
        recommendCompMargin: { top: 0 },
        recommendCompGridHeight: 284,
        recommendCompGridItemHeight: 138,
        recommendCompGridSecHeight: 576,
        mainTabsBcColor: '#f1f3f5',
      };
    } else {
      customBreakPointStyle = {
        controlButtonStyle: { left: 24, top: 40, width: 24, height: 24 },
        sideBarPrimaryNavListHeight: '',
        sideBarPrimaryNavListMargin: 24,
        sideBarPrimaryNavListItemWidth: '100%',
        sideBarPrimaryMenuImgMargin: { top: 0 },
        sideBarPrimaryMenuTextSize: 12,
        sideBarPrimaryMenuTextHeight: 16,
        mainTabsContentMargin: {
          left: 24, right: 24, top: 24, bottom: 22
        },
        recommendCompMargin: { top: 16 },
        recommendCompGridItemHeight: 106,
        recommendCompGridHeight: 106,
        recommendCompGridSecHeight: 220,
        mainTabsBcColor: '#fff',
      };
    }
    return customBreakPointStyle;
  }

  static getCurrentMainTabsStyle(index: number, currentIndex: number, currentBreakpoint: string): CustomFontStyle {
    let customFontStyle: CustomFontStyle;
    switch (currentBreakpoint) {
      case 'sm':
        if (index === currentIndex) {
          customFontStyle = {
            fillColor: '#0a59f7',
            fontColor: '#0a59f7'
          };
        } else {
          customFontStyle = {
            fillColor: '',
            fontColor: '#182431'
          };
        }
        break;
      default:
        if (index === currentIndex) {
          customFontStyle = {
            fillColor: '#0a59f7',
            fontColor: '#0a59f7'
          };
        } else {
          customFontStyle = {
            fillColor: '',
            fontColor: '#182431'
          };
        }
    }
    return customFontStyle;
  }

  static getSubTabsControllerStyle(currentBreakpoint: string, currentSideBarMode: string): SubTabsControllerStyle {
    let subTabsControllerStyle: SubTabsControllerStyle;
    if (currentBreakpoint === 'sm' || (currentBreakpoint !== 'sm' && currentSideBarMode === 'list')) {
      subTabsControllerStyle = {
        sideBarPrimaryMenuTextMargin: { top: 4, left: 0 },
        secondMenuListSpace: 16,
        secondMenuListItemMargin: { left: 0 },
        secondMenuListItemHeight: 56,
        sideBarPrimaryNavListPadding: { left: 0 },
        sideBarPrimaryMenuListPadding: { left: 0, right: 0 },
        sideBarPrimaryMenuFlexAlign: FlexAlign.Center,
        sideBarPrimaryMenuFlexDirection: FlexDirection.Column,
        primaryMenuTextAlign: TextAlign.Center,
        isShowPageTitle: false,
        isShowSecondMenu: true,
        secondMenuListItemWidth: '',
        secondMenuListDirection: Axis.Horizontal,
        searchModulePadding: { left: 0, right: 0 },
        toolBarPadding: { left: 0, right: 0 },
      };
    } else {
      subTabsControllerStyle = {
        sideBarPrimaryMenuTextMargin: { top: 0, left: 8 },
        secondMenuListSpace: 0,
        secondMenuListItemHeight: 48,
        secondMenuListItemMargin: { left: 44 },
        sideBarPrimaryNavListPadding: { left: 12, right: 12 },
        sideBarPrimaryMenuListPadding: { left: 12, right: 12 },
        sideBarPrimaryMenuFlexAlign: FlexAlign.Start,
        sideBarPrimaryMenuFlexDirection: FlexDirection.Row,
        primaryMenuTextAlign: TextAlign.Start,
        isShowPageTitle: true,
        isShowSecondMenu: false,
        secondMenuListItemWidth: '100%',
        secondMenuListDirection: Axis.Vertical,
        searchModulePadding: { left: 12, right: 12 },
        toolBarPadding: { left: 12, right: 12 },
      };
    }
    return subTabsControllerStyle;
  }

  static getCurrentSubTabsStyle(currentBreakpoint: string, currentSideBarMode: string, index: number, currentIndex: number): CustomFontStyle {
    let customFontStyle: CustomFontStyle;
    if (currentBreakpoint === 'sm' || (currentBreakpoint !== 'sm' && currentSideBarMode === 'list')) {
      if (index === currentIndex) {
        customFontStyle = {
          fontSize: 24, backgroundColor: '#00ffffff', fontColor: '#000'
        };
      } else {
        customFontStyle = {
          fontSize: 18, backgroundColor: '#00ffffff', fontColor: '#99000000'
        };
      }
    } else {
      if (index === currentIndex) {
        customFontStyle = {
          fontSize: 16, backgroundColor: '#190A59F7', fontColor: '#0A59F7'
        };
      } else {
        customFontStyle = {
          fontSize: 16, backgroundColor: '#00ffffff', fontColor: '#000'
        };
      }
    }
    return customFontStyle;
  }
}

