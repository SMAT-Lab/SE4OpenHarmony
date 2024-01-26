/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import router from '@ohos.router'
import TitleBar from '../../common/TitleBar'

export const SHARE_IMAGES =
  [
    $r('app.media.share1'),
    $r('app.media.share2'),
    $r('app.media.share3'),
    $r('app.media.share4'),
    $r('app.media.share5'),
    $r('app.media.share6')
  ]


class BasicDataSource implements IDataSource {
  private listeners: DataChangeListener[] = []

  public totalCount() {
    return 0
  }

  public getData(index: number): undefined | Resource {
    return undefined
  }

  registerDataChangeListener(listener: DataChangeListener) {
    if (this.listeners.indexOf(listener) < 0) {
      this.listeners.push(listener)
    }
  }

  unregisterDataChangeListener(listener: DataChangeListener) {
    const pos = this.listeners.indexOf(listener)
    if (pos >= 0) {
      this.listeners.splice(pos, 1)
    }
  }

  notifyDataReload() {
    this.listeners.forEach((listener: DataChangeListener) => {
      listener.onDataReloaded()
    })
  }

  notifyDataAdd(index: number) {
    this.listeners.forEach((listener: DataChangeListener) => {
      listener.onDataAdd(index)
    })
  }

  notifyDataChange(index: number) {
    this.listeners.forEach((listener: DataChangeListener) => {
      listener.onDataChange(index)
    })
  }

  notifyDataDelete(index: number) {
    this.listeners.forEach((listener: DataChangeListener) => {
      listener.onDataDelete(index)
    })
  }

  notifyDataMove(from: number, to: number) {
    this.listeners.forEach((listener: DataChangeListener) => {
      listener.onDataMove(from, to)
    })
  }
}

class MyDataSource extends BasicDataSource {
  private dataArray: Resource[] = SHARE_IMAGES

  public totalCount() {
    return this.dataArray.length
  }

  public getData(index: number): undefined | Resource {
    return this.dataArray[index]
  }

  public addData(index: number) {
    this.dataArray.splice(index, 0)
    this.notifyDataAdd(index)
  }

  public pushData(index: number) {
    this.dataArray.push()
    this.notifyDataAdd(this.dataArray.length - 1)
  }

  public replaceData(result: Resource[]) {
    this.dataArray = result
  }
}

@Entry
@Component
struct ShareItem {
  @State info: MyDataSource = new MyDataSource()

  build() {
    Column() {
      TitleBar({ hasBackPress: true })
      Text($r('app.string.share_transition_tips'))
        .fontColor(Color.Black)
        .fontSize(25)
        .width('100%')
        .textAlign(TextAlign.Center)
        .margin(10)
      Grid() {
        LazyForEach(this.info, (item: Resource, index?: number) => {
          GridItem() {
            if (index !== undefined) {
              Image(item)
                .width(120)
                .aspectRatio(1)
                .sharedTransition(index.toString(), { duration: 600, curve: Curve.Smooth, delay: 100 })
            }
          }
          .padding(10)
          .backgroundColor('#F5F5F5')
          .borderRadius(10)
          .onClick(() => {
            router.push({
              url: 'pages/share/SharePage',
              params: {
                index: index
              }
            })
          })
        }, (item: Resource) => JSON.stringify(item))
      }
      .columnsTemplate('1fr 1fr 1fr')
      .columnsGap(10)
      .rowsGap(10)
      .padding(10)
      .layoutWeight(1)
    }
    .width('100%')
    .height('100%')
  }
}