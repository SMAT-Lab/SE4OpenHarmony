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
 
 import { CityModel } from '../../model/CityModel'

@Component
export default struct SideBar {
  @Link selectCity: CityModel; //选中城市
  @Link isShowSideBar: boolean; //是否展示侧边栏
  @State cityArr: CityModel[] = [ //城市列表
    { locationId: 101010100, locationName: '北京' }, { locationId: 101280601, locationName: '深圳' },
    { locationId: 101020100, locationName: '上海' }, { locationId: 101250101, locationName: '长沙' },
    { locationId: 101310101, locationName: '海口' }, { locationId: 101070201, locationName: '大连' }];

  build() {
    Column() {
      Text('城市选择')
        .fontSize(28)
        .width('100%')
        .fontColor('#E6000000')
        .padding({ top: 15, left: 22 })


      List({ space: 8, initialIndex: 0 }) {
        ForEach(this.cityArr, (item) => {
          ListItem() {
            if (this.selectCity.locationName == item.locationName) {
              Text(item.locationName)
                .width('100%')
                .fontSize(20)
                .fontColor('#E64F7EFD')
                .backgroundColor('#1A4F7EFD')
                .padding({ top: 10, bottom: 10, left: 22 })
            } else {
              Text(item.locationName)
                .width('100%')
                .fontSize(20)
                .borderRadius(10)
                .fontColor('#E6000000')
                .padding({ top: 10, bottom: 10, left: 22 })
            }
          }.onClick(() => {
            this.selectCity = item
            this.isShowSideBar = !this.isShowSideBar;
          })
        })
      }
      .width('100%')
      .height('80%')
      .margin({ top: 26 })
    }
    .width('100%')
    .height('100%')
    .align(Alignment.TopStart)
  }
}