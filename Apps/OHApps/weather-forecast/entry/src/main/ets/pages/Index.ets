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
 
import SideBar from './view/SideBar'
import SideBarContent from './view/SideBarContent'
import SideBarContentBac from './view/SideBarContentBac'
import { CityModel } from '../model/CityModel'
import { WeatherUiModel } from '../model/WeatherUiModel'
import utils from '../utils/utils'

@Entry
@Component
struct Index {
  @State isShowSideBar: boolean = false;
  @State selectCity: CityModel = { locationId: 101280601, locationName: '深圳' };
  @State weatherUiModel: WeatherUiModel = {
    nowTemp: 0,
    nowWeatherText: 0,
    tempMax: 0,
    tempMin: 0,
    category: 0,
    precip: 0,
    hourlyTemp: [],
    iconDays: [],
    date: '-月-日',
    day: '',
    dayArr: utils.getDayArr(),
    hoursArr: utils.getHoursArr(),
  };

  // 绘制界面
  build() {
    SideBarContainer(SideBarContainerType.Embed) {

      // 侧边栏
      SideBar({ selectCity: $selectCity, isShowSideBar: $isShowSideBar })

      if (this.isShowSideBar) {
        //灰底
        SideBarContentBac({ isShowSideBar: $isShowSideBar })
      } else {
        // 内容
        SideBarContent({ isShowSideBar: $isShowSideBar, selectCity: $selectCity, weatherUiModel: $weatherUiModel })
      }
    }
    .showControlButton(false)
    .showSideBar(this.isShowSideBar)
    .autoHide(false)
    .sideBarWidth(160)
    .width('100%')
  }
}