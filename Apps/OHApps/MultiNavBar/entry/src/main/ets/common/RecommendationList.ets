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

import { BreakpointType } from '../common/BreakpointSystem';
import { StyleConfiguration } from '../common/Configuration';

class ItemType {
  name: Resource;
  src: Resource;

  constructor(name: Resource, src: Resource) {
    this.name = name;
    this.src = src;
  }
}

@Component
export struct RecommendationList {
  @LocalStorageProp("currentBreakpoint") currentBreakpoint: string = 'md';
  @State bannerList: Resource[] = [
  $r('app.media.ic_public_swiper1'),
  $r('app.media.ic_public_swiper2'),
  $r('app.media.ic_public_swiper3'),
  ];
  @State gridList: ItemType[] = [
    new ItemType($r('app.string.category'), $r('app.media.entrances')),
    new ItemType($r('app.string.rank'), $r('app.media.entrances2')),
    new ItemType($r('app.string.quickApp'), $r('app.media.entrances4')),
    new ItemType($r('app.string.garden'), $r('app.media.entrances5')),
    new ItemType($r('app.string.education'), $r('app.media.entrances6')),
  ];
  @State appIconList: ItemType[] = [
    new ItemType($r('app.string.double'), $r('app.media.ic_public_app1')),
    new ItemType($r('app.string.photoEditing'), $r('app.media.ic_public_app2')),
    new ItemType($r('app.string.mathematicsSquare'), $r('app.media.ic_public_app3')),
    new ItemType($r('app.string.carefree'), $r('app.media.ic_public_app4')),
    new ItemType($r('app.string.explorer'), $r('app.media.ic_public_app5')),
    new ItemType($r('app.string.double'), $r('app.media.ic_public_app6')),
    new ItemType($r('app.string.photoEditing'), $r('app.media.ic_public_app7')),
    new ItemType($r('app.string.mathematicsSquare'), $r('app.media.ic_public_app8')),
    new ItemType($r('app.string.carefree'), $r('app.media.ic_public_app9')),
    new ItemType($r('app.string.double'), $r('app.media.ic_public_app10')),
  ];
  @State gameIconList: ItemType[] = [
    new ItemType($r('app.string.romance'), $r('app.media.ic_public_game1')),
    new ItemType($r('app.string.dreaming'), $r('app.media.ic_public_game2')),
    new ItemType($r('app.string.ambush'), $r('app.media.ic_public_game3')),
    new ItemType($r('app.string.dreaming'), $r('app.media.ic_public_game4')),
    new ItemType($r('app.string.ambush'), $r('app.media.ic_public_game5')),
    new ItemType($r('app.string.romance'), $r('app.media.ic_public_game6')),
    new ItemType($r('app.string.ambush'), $r('app.media.ic_public_game7')),
    new ItemType($r('app.string.dreaming'), $r('app.media.ic_public_game8')),
    new ItemType($r('app.string.ambush'), $r('app.media.ic_public_game9')),
    new ItemType($r('app.string.romance'), $r('app.media.ic_public_game10')),
  ];

  @Builder
  Banner() {
    Swiper() {
      ForEach(this.bannerList, (item: Resource) => {
        Image(item).width('100%').height('100%').borderRadius(10)
          .backgroundColor('#7fD8D8D8')
      })
    }
    .cachedCount(3)
    .itemSpace(8)
    .displayCount(new BreakpointType(1, 2, 3).GetValue(this.currentBreakpoint))
    .indicator(new BreakpointType(true, false, false).GetValue(this.currentBreakpoint))
    .indicatorStyle({ selectedColor: '#fff' })
    .loop(true)
    .height(StyleConfiguration.getBreakpointStyle(this.currentBreakpoint).recommendCompGridItemHeight)
  }

  @Builder
  ApplicationList(data: ItemType[]) {
    List({ space: new BreakpointType(20, 32, 36).GetValue(this.currentBreakpoint) }) {
      ForEach(data, (item: ItemType) => {
        ListItem() {
          Column() {
            Image(item.src).width(56).height(56)
            Text(item.name).fontSize(12).margin({ top: 8 })
            Button($r('app.string.install'))
              .fontSize(12)
              .fontColor('#0a59f7')
              .backgroundColor('#0c000000')
              .fontWeight(FontWeight.Medium)
              .width(56)
              .height(28)
              .margin({ top: 7 })
          }
        }
      })
    }.listDirection(Axis.Horizontal).scrollBar(BarState.Off)
  }

  @Builder
  ApplicationType(desc: Resource) {
    Row() {
      Text(desc).fontSize(16).fontWeight(FontWeight.Medium)
      Blank()
      Text($r('app.string.more')).fontSize(14).fontWeight(FontWeight.Regular)
      Image($r('app.media.ic_settings_arrow')).width(12).height(24)
    }
    .width('100%')
    .height(48)
    .margin({ top: 4 })
  }

  build() {
    Scroll() {
      GridRow({ columns: { sm: 4, md: 8, lg: 12 } }) {
        GridCol({ span: { sm: 4, md: 8, lg: 12 } }) {
          this.Banner()
        }

        GridCol({ span: { sm: 4, md: 8, lg: 12 } }) {
          Flex({ justifyContent: FlexAlign.SpaceAround, alignItems: ItemAlign.Center }) {
            ForEach(this.gridList, (item: ItemType) => {
              Column() {
                Image(item.src).width(40).height(40)
                Text(item.name).fontSize(12).fontWeight(FontWeight.Regular).margin({ top: 4 })
              }
            })
          }.height(72).margin({ top: 12.5 })
        }


        GridCol({ span: { sm: 4, md: 8, lg: 12 } }) {
          this.ApplicationType($r('app.string.excellentGame'))
        }

        GridCol({ span: { sm: 4, md: 8, lg: 12 } }) {
          this.ApplicationList(this.appIconList)
        }

        GridCol({ span: { sm: 4, md: 8, lg: 12 } }) {
          this.ApplicationType($r('app.string.excellentApp'))
        }.margin({ top: 4 })

        GridCol({ span: { sm: 4, md: 8, lg: 12 } }) {
          this.ApplicationList(this.gameIconList)
        }

        GridCol({ span: { sm: 4, md: 8, lg: 12 } }) {
          this.ApplicationType($r('app.string.excellentGame'))
        }.margin({ top: 4 })

        GridCol({ span: { sm: 4, md: 8, lg: 12 } }) {
          this.Banner()
        }.margin({ top: 4 }).layoutWeight(1)
      }
    }.scrollBar(BarState.Off).padding({ bottom: 12 })
  }
}