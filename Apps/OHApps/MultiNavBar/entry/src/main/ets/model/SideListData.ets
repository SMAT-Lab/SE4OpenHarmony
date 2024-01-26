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

import { MenuType } from './MenuType';

export let sideListData: MenuType[] = [
  {
    name: $r('app.string.index'),
    icon: $r('app.media.ic_home_normal'),
    subController: new TabsController(),
    subController_sm: new TabsController(),
    subTitleList: [{ name: $r('app.string.recommend') }, { name: $r('app.string.appList') }, {
      name: $r('app.string.gameList')
    }]
  },
  {
    name: $r('app.string.app'),
    icon: $r('app.media.ic_app_normal'),
    subController: new TabsController(),
    subController_sm: new TabsController(),
    subTitleList: [{ name: $r('app.string.video') }, { name: $r('app.string.shopping') },]
  },
  {
    name: $r('app.string.game'),
    icon: $r('app.media.ic_game_normal'),
    subController: new TabsController(),
    subController_sm: new TabsController(),
    subTitleList: [{ name: $r('app.string.category') }, { name: $r('app.string.rank') }]
  },
  {
    name: $r('app.string.explore'),
    icon: $r('app.media.ic_search_normal'),
    subController: new TabsController(),
    subController_sm: new TabsController(),
    subTitleList: [{ name: $r('app.string.discovery') }, { name: $r('app.string.hot') }]
  },
  {
    name: $r('app.string.mine'),
    icon: $r('app.media.ic_user_portrait'),
    subController: new TabsController(),
    subController_sm: new TabsController(),
    subTitleList: [{ name: $r('app.string.discovery') }, { name: $r('app.string.hot') }]
  }
];