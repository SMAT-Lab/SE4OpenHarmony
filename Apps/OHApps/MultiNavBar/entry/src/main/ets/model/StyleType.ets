/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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

export class CustomLength {
  left?: number = 0;
  right?: number = 0;
  width?: number = 0;
  height?: number = 0;
  top?: number = 0;
  bottom?: number = 0;
}

export class CustomFontStyle {
  fillColor?: string = '';
  fontColor?: string = '';
  fontSize?: number = 0;
  backgroundColor?: string = '';
}

export class CustomBreakPointStyle {
  controlButtonStyle: CustomLength = new CustomLength();
  sideBarPrimaryNavListHeight: string = '';
  sideBarPrimaryNavListMargin: number = 0;
  sideBarPrimaryNavListItemWidth: string = '';
  sideBarPrimaryMenuImgMargin: CustomLength = new CustomLength();
  sideBarPrimaryMenuTextSize: number = 0;
  sideBarPrimaryMenuTextHeight: number = 0;
  mainTabsContentMargin: CustomLength = new CustomLength();
  recommendCompMargin: CustomLength = new CustomLength();
  recommendCompGridHeight: number = 0;
  recommendCompGridItemHeight: number = 0;
  recommendCompGridSecHeight: number = 0;
  mainTabsBcColor: string = '';
}

export class SubTabsControllerStyle {
  sideBarPrimaryMenuTextMargin: CustomLength = new CustomLength();
  secondMenuListSpace: number = 0;
  secondMenuListItemMargin: CustomLength = new CustomLength();
  secondMenuListItemHeight: number = 0;
  sideBarPrimaryNavListPadding: CustomLength = new CustomLength();
  sideBarPrimaryMenuListPadding: CustomLength = new CustomLength();
  sideBarPrimaryMenuFlexAlign: number = 0;
  sideBarPrimaryMenuFlexDirection: number = 0;
  primaryMenuTextAlign: number = 0;
  isShowPageTitle: boolean = false;
  isShowSecondMenu: boolean = false;
  secondMenuListItemWidth: string = '';
  secondMenuListDirection: number = 0;
  searchModulePadding: CustomLength = new CustomLength();
  toolBarPadding: CustomLength = new CustomLength();
}