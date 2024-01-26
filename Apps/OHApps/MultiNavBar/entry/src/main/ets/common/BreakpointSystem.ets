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

export class BreakpointType<T> {
  sm: T;
  md: T;
  lg: T;

  constructor(sm: T, md: T, lg: T) {
    this.sm = sm;
    this.md = md;
    this.lg = lg;
  }

  GetValue(currentBreakpoint: string): T | undefined {
    if (currentBreakpoint === 'sm') {
      return this.sm;
    }
    if (currentBreakpoint === 'md') {
      return this.md;
    }
    if (currentBreakpoint === 'lg') {
      return this.lg;
    }
    return undefined;
  }
}

export class SideBarMode<T> {
  list: T;
  tabs: T;

  constructor(list: T, tabs: T) {
    this.list = list;
    this.tabs = tabs;
  }

  GetValue(currentSideBarMode: string): T | undefined {
    if (currentSideBarMode === 'list') {
      return this.list;
    }
    if (currentSideBarMode === 'tabs') {
      return this.tabs;
    }
    return undefined;
  }
}
