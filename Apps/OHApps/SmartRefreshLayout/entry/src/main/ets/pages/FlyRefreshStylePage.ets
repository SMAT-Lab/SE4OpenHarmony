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
import {SmartRefreshForFlyRefresh} from "@ohos/smartrefreshlayout"
import {FlyRefreshHeader} from "@ohos/smartrefreshlayout"

@Entry
@Component
struct FlyRefreshStylePage {
  @State model: SmartRefreshForFlyRefresh.Model = new SmartRefreshForFlyRefresh.Model().setBackgroundColor('white').setNoInit(true)
  @State mDataSet: Array<ItemData> = []
  private index:number = 10;
  aboutToAppear() {
    this.mDataSet.push(new ItemData(1,0xFF76A9FC, $r('app.media.ic_public_file'), "Meeting Minutes", new Date()))
    this.mDataSet.push(new ItemData(2,Color.Gray, $r('app.media.ic_public_folder'), "Meeting Minutes", new Date()))
    this.mDataSet.push(new ItemData(3,Color.Gray, $r('app.media.ic_public_folder'), "Meeting Minutes", new Date()))
    this.model.setRefreshCallback(() => {
      setTimeout(() => {
        this.index = this.index + 1;
        this.mDataSet.unshift(new ItemData(this.index,0xFFFFC970, $r('app.media.ic_public_devices_phone'), "Meeting Minutes", new Date()));
      }, 3000)
    })
  }

  @Builder header() {
    FlyRefreshHeader({ model: $model })
  }

  @Builder content() {
    Column() {
      ForEach(this.mDataSet, (item:ItemData) => {
        Row() {
          Row() {
            Image(item.icon).width(45).height(45)
          }
          .backgroundColor(item.color)
          .borderRadius(40)
          .width(80)
          .height(80)
          .margin(15)
          .justifyContent(FlexAlign.Center)

          Column({ space: 10 }) {
            Text(item.title).fontSize(24)
            Text(item.time.toDateString()).fontSize(22)
          }.alignItems(HorizontalAlign.Start).layoutWeight(1)
        }.backgroundColor("white")
      }, (item:ItemData) => item.i.toString())
    }.margin({top: 45}).width("100%")
  }

  build() {
    Column() {
      SmartRefreshForFlyRefresh({
        modelFly: $model,
        header: () => {
          this.header()
        },
        main: () => {
          this.content()
        },
        footer: ()=> {}
      })
    }
  }
}

export class ItemData {
  i:number;
  color: number;
  icon: Resource;
  title: string;
  time: Date;

  constructor(i:number,color: number, icon: Resource, title: string, time: Date) {
    this.i = i;
    this.color = color
    this.icon = icon
    this.time = time
    this.title = title
  }
}