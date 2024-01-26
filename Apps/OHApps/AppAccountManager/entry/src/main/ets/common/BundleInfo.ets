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

class BasicDataSource implements IDataSource {
  private listeners: DataChangeListener[] = [];

  public totalCount() {
    return 0;
  }

  public getData(index: number): DataArray {
    return new DataArray();
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
    this.listeners.forEach(listener => {
      listener.onDataReloaded()
    })
  }

  notifyDataAdd(index: number) {
    this.listeners.forEach(listener => {
      listener.onDataAdd(index)
    })
  }

  notifyDataChange(index: number) {
    this.listeners.forEach(listener => {
      listener.onDataChange(index)
    })
  }

  notifyDataDelete(index: number) {
    this.listeners.forEach(listener => {
      listener.onDataDelete(index)
    })
  }

  notifyDataMove(from: number, to: number) {
    this.listeners.forEach(listener => {
      listener.onDataMove(from, to)
    })
  }
}

class DataArray {
  img: Resource = $r('app.string.empty');
  text: Resource = $r('app.string.empty');
  name: string = '';
}

class MyDataSource extends BasicDataSource {
  private dataArray: Array<DataArray> = [
    { img: $r('app.media.music'), text: $r('app.string.music'), name: 'Music' },
    { img: $r('app.media.video'), text: $r('app.string.video'), name: 'Video' },
    { img: $r('app.media.map'), text: $r('app.string.map'), name: 'Map' }
  ]

  public totalCount() {
    return this.dataArray.length
  }

  public getData(index: number){
    return this.dataArray[index];
  }

  public addData(index: number) {
    this.dataArray.splice(index, 0)
    this.notifyDataAdd(index)
  }

  public pushData(index: number) {
    this.dataArray.push()
    this.notifyDataAdd(this.dataArray.length - 1)
  }

  public replaceData(result: DataArray[]) {
    this.dataArray = result
  }
}

@Component
export struct BundleInfo {
  @State dataSet: MyDataSource = new MyDataSource()

  build() {
    Column() {
      LazyForEach(this.dataSet, (item: DataArray) => {
        Row() {
          Image(item.img)
            .margin(10)
            .width('40%')
            .height('60%')
            .objectFit(ImageFit.Contain)

          Text(item.text)
            .margin(10)
            .fontSize(20)

          Image($r('app.media.right'))
            .margin(10)
            .width('15%')
            .height('20%')
            .layoutWeight(1)
            .objectFit(ImageFit.Contain)
        }
        .id(item.name + 'App')
        .margin(5)
        .width('95%')
        .height('20%')
        .borderRadius(20)
        .backgroundColor('#f6f6f6')
        .onClick(() => {
          router.replaceUrl({
            url: 'pages/Login',
            params: {
              bundleName: item.name
            }
          })
        })
      }, (item: DataArray) => item.name.toString())
    }
    .layoutWeight(1)
  }
}