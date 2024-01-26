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

import cache from 'memory-cache';
import prompt from '@ohos.promptAction';
interface skipDuplicatesType{
  skipDuplicates:boolean
}

let skipFn = (data: boolean): skipDuplicatesType => {
  const skipDuplicatesData: skipDuplicatesType = {
    skipDuplicates: data
  }
  return skipDuplicatesData
}

@Entry
@Component
struct CachePage {
  @State get: string = ''
  // @State cacheSize: number = 0;
  // @State cacheMemsize: number = 0;
  // @State cacheHits: number = 0;


  @State putKey: string = ''
  @State putValue: string = ''
  @State getKey: string = ''
  @State getValue: string = ''
  @State delKey: string = ''
  @State cacheSize: number = 0
  @State cacheMemsize: number = 0
  @State cacheHits: number = 0;
  @State cacheMisses: number = 0;
  @State cacheKeys: string[] = [];
  @State cacheExportJson: string = '';
  @State cacheImportJson: string = '';
  @State cacheImportJsonSize: number = 0;
  private default: string = " {\"0\":{\"value\":\"测试数据\",\"expire\":\"NaN\"}}"
  scroller: Scroller = new Scroller()

  build() {

    Scroll(this.scroller) {

      Column() {


        //写入数据
        Column({ space: 12 }) {
          Text('写入10条数据，key0~9，无对应接口，方便测试')
            .margin({ top: 5 })
            .fontSize(16)
          Button('put：写入缓存数据', { type: ButtonType.Normal })
            .fontSize(18)
            .fontColor('#000')
            .height(60)
            .width(300)
            .margin({ top: 20 })
            .backgroundColor('#12939f')
            .onClick(() => {
              for (let i = 0; i < 10; i++) {
                cache.put(i, '你好' + i);
                prompt.showToast({ message: '写入成功', duration: 3000 })
              }
            })
          Divider().strokeWidth(2).color('#F1F3F5').margin({ top: 8, bottom: 8 })
        }.margin({ top: 10 })

        //put
        Column({ space: 12 }) {
          Text('put测试，写入数据，通过键，写入值')
            .margin({ top: 5 })
            .fontSize(16)
          TextInput({ placeholder: '请输入key' })
            .height(60)
            .fontSize(18)
            .onChange((value: string) => {
              this.putKey = value
            })
          TextInput({ placeholder: '请输入value' })
            .height(60)
            .fontSize(18)
            .onChange((value: string) => {
              this.putValue = value
            })
          Button('put：写入缓存数据', { type: ButtonType.Normal })
            .fontSize(18)
            .fontColor('#000')
            .height(60)
            .width(300)
            .margin({ top: 20 })
            .backgroundColor('#12939f')
            .onClick(() => {
              try {
                if (this.putKey == undefined || this.putKey.length == 0) {
                  prompt.showToast({ message: '键不能为空', duration: 3000 })
                  return
                }
                let value:number = cache.put(this.putKey, this.putValue);
                prompt.showToast({ message: '写入值' + value + '成功', duration: 3000 })
              } catch (err) {
                prompt.showToast({ message: '写入失败', duration: 3000 })
              }
            })
          Divider().strokeWidth(2).color('#F1F3F5').margin({ top: 8, bottom: 8 })
        }.margin({ top: 10 })

        //get
        Column({ space: 12 }) {
          Text('get测试，通过键获取值')
            .margin({ top: 5 })
            .fontSize(16)
          TextInput({ placeholder: '请输入key' })
            .height(60)
            .fontSize(18)
            .onChange((value: string) => {
              this.getKey = value
            })
          Button('get：读取数据', { type: ButtonType.Normal })
            .fontSize(18)
            .fontColor('#000')
            .height(60)
            .width(300)
            .margin({ top: 20 })
            .backgroundColor('#12939f')
            .onClick(() => {
              try {
                this.getValue = cache.get(this.getKey)
              } catch (err) {
                prompt.showToast({ message: '读取失败', duration: 3000 })
              }

            })
          Text('获取的值为：' + this.getValue)
            .margin({ top: 5 })
            .fontSize(16)
          Divider().strokeWidth(2).color('#F1F3F5').margin({ top: 8, bottom: 8 })
        }.margin({ top: 10 })

        //del
        Column({ space: 12 }) {
          Text('del测试，通过键删除值')
          TextInput({ placeholder: '请输入key' })
            .height(60)
            .fontSize(18)
            .onChange((value: string) => {
              this.delKey = value
            })
          Button('del：删除数据', { type: ButtonType.Normal })
            .fontSize(18)
            .fontColor('#000')
            .height(60)
            .width(300)
            .margin({ top: 20 })
            .backgroundColor('#12939f')
            .onClick(() => {
              let is:boolean = cache.del(this.delKey)
              prompt.showToast({ message: '删除结果' + is, duration: 3000 })

            })
          Divider().strokeWidth(2).color('#F1F3F5').margin({ top: 8, bottom: 8 })
        }.margin({ top: 10 })

        //clear
        Column({ space: 12 }) {
          Text('clear测试，删除所有值，删除后size，memsize为0')
          Button('clear：删除所有值', { type: ButtonType.Normal })
            .fontSize(18)
            .fontColor('#000')
            .height(60)
            .width(300)
            .margin({ top: 20 })
            .backgroundColor('#12939f')
            .onClick(() => {
              try {
                cache.clear()
              } catch (err) {
                prompt.showToast({ message: '删除失败', duration: 3000 })
              }
            })
          Divider().strokeWidth(2).color('#F1F3F5').margin({ top: 8, bottom: 8 })
        }.margin({ top: 10 })

        //size
        Column({ space: 12 }) {
          Text('size测试，返回缓存中的当前条目数')
          Button('size测试：返回缓存中的当前条目数', { type: ButtonType.Normal })
            .fontSize(18)
            .fontColor('#000')
            .height(60)
            .width(300)
            .margin({ top: 20 })
            .backgroundColor('#12939f')
            .onClick(() => {
              this.cacheSize = cache.size()
            })
          Text('缓存中的当前条目数：' + this.cacheSize)
            .height(60)
            .fontSize(18)
          Divider().strokeWidth(2).color('#F1F3F5').margin({ top: 8, bottom: 8 })
        }.margin({ top: 10 })

        //memsize
        Column({ space: 12 }) {
          Text('memsize测试，返回占用缓存空间的条目数,通常== size()')
          Button('memsize测试：返回占用缓存空间的条目数', { type: ButtonType.Normal })
            .fontSize(18)
            .fontColor('#000')
            .height(60)
            .width(300)
            .margin({ top: 20 })
            .backgroundColor('#12939f')
            .onClick(() => {
              this.cacheMemsize = cache.memsize()
            })
          Text('占用缓存空间的条目数：' + this.cacheMemsize)
            .height(60)
            .fontSize(18)
          Divider().strokeWidth(2).color('#F1F3F5').margin({ top: 8, bottom: 8 })
        }.margin({ top: 10 })

        //debug
        Column({ space: 12 }) {
          Text('debug测试，debug开关')
          Button('打开debug', { type: ButtonType.Normal })
            .fontSize(18)
            .fontColor('#000')
            .height(60)
            .width(300)
            .margin({ top: 20 })
            .backgroundColor('#12939f')
            .onClick(() => {
              cache.debug(true)
              prompt.showToast({ message: '打开debug模式', duration: 3000 })
            })
          Button('关闭debug', { type: ButtonType.Normal })
            .fontSize(18)
            .fontColor('#000')
            .height(60)
            .width(300)
            .margin({ top: 20 })
            .backgroundColor('#12939f')
            .onClick(() => {
              cache.debug(false)
              prompt.showToast({ message: '关闭debug模式', duration: 3000 })
            })
          Divider().strokeWidth(2).color('#F1F3F5').margin({ top: 8, bottom: 8 })
        }.margin({ top: 10 })

        //hits
        Column({ space: 12 }) {
          Text('hits测试，返回缓存点击次数(仅在调试模式下可用)')
          Button('hits测试，返回缓存点击次数(仅在调试模式下可用)', { type: ButtonType.Normal })
            .fontSize(18)
            .fontColor('#000')
            .height(60)
            .width(300)
            .margin({ top: 20 })
            .backgroundColor('#12939f')
            .onClick(() => {
              this.cacheHits = cache.hits()
            })
          Text('缓存点击次数：' + this.cacheHits)
            .height(60)
            .fontSize(18)
          Divider().strokeWidth(2).color('#F1F3F5').margin({ top: 8, bottom: 8 })
        }.margin({ top: 10 })

        //misses
        Column({ space: 12 }) {
          Text('misses测试，返回缓存未点击次数(仅在调试模式下监控)')
          Button('misses测试，返回缓存未点击次数(仅在调试模式下监控)', { type: ButtonType.Normal })
            .fontSize(18)
            .fontColor('#000')
            .height(60)
            .width(300)
            .margin({ top: 20 })
            .backgroundColor('#12939f')
            .onClick(() => {
              this.cacheMisses = cache.misses()
            })
          Text('缓存未点击次数：' + this.cacheMisses)
            .height(60)
            .fontSize(18)
          Divider().strokeWidth(2).color('#F1F3F5').margin({ top: 8, bottom: 8 })
        }.margin({ top: 10 })

        //keys
        Column({ space: 12 }) {
          Text('keys测试，返回所有缓存键')
          Button('keys测试：返回所有缓存键', { type: ButtonType.Normal })
            .fontSize(18)
            .fontColor('#000')
            .height(60)
            .width(300)
            .margin({ top: 20 })
            .backgroundColor('#12939f')
            .onClick(() => {
              this.cacheKeys = cache.keys();
            })
          Text('所有缓存键：' + this.cacheKeys)
            .height(60)
            .fontSize(18)
          Divider().strokeWidth(2).color('#F1F3F5').margin({ top: 8, bottom: 8 })
        }.margin({ top: 10 })

        //exportJson
        Column({ space: 12 }) {
          Text('exportJson测试，返回所有缓存数据以JSON字符串表示')
          Button('exportJson测试：返回所有缓存数据', { type: ButtonType.Normal })
            .fontSize(18)
            .fontColor('#000')
            .height(60)
            .width(300)
            .margin({ top: 20 })
            .backgroundColor('#12939f')
            .onClick(() => {
              this.cacheExportJson = cache.exportJson();
              console.log(this.cacheExportJson);
            })
          Text('所有缓存数据：' + this.cacheExportJson)
            .height(60)
            .fontSize(18)
          Divider().strokeWidth(2).color('#F1F3F5').margin({ top: 8, bottom: 8 })
        }.margin({ top: 10 })


        //importJson
        Column({ space: 12 }) {
          Text('importJson测试，Json格式导入数据，存在数据将会被覆盖，如果skipduplicate为true，存在的数据将不会覆盖，默认false')
            .margin({ top: 5 })
            .fontSize(16)
          Text('importJson测试：覆盖测试')
            .margin({ top: 5 })
            .fontSize(16)
          TextInput({ text: this.default, placeholder: '请输入数据' })
            .height(60)
            .fontSize(18)
            .onChange((value: string) => {
              this.cacheImportJson = value
            })
          Button('importJson测试：Json格式导入数据', { type: ButtonType.Normal })
            .fontSize(18)
            .fontColor('#000')
            .height(60)
            .width(300)
            .margin({ top: 20 })
            .backgroundColor('#12939f')
            .onClick(() => {
              try {
                this.cacheImportJsonSize = cache.importJson(this.cacheImportJson,skipFn(false));
                prompt.showToast({ message: '写入成功', duration: 3000 })
              } catch (err) {
                prompt.showToast({ message: '请输入json格式数据', duration: 3000 })
              }

            })
          Text('成功写入后的缓存中的当前条目数' + this.cacheImportJsonSize)
            .margin({ top: 5 })
            .fontSize(16)
          Divider().strokeWidth(2).color('#F1F3F5').margin({ top: 8, bottom: 8 })
        }.margin({ top: 10 })


        //importJson
        Column({ space: 12 }) {
          Text('importJson测试，Json格式导入数据，存在数据将会被覆盖，如果skipduplicate为true，存在的数据将不会覆盖，默认false')
            .margin({ top: 5 })
            .fontSize(16)
          Text('importJson测试：不覆盖测试')
            .margin({ top: 5 })
            .fontSize(16)
          TextInput({ text: this.default, placeholder: '请输入数据' })
            .height(60)
            .fontSize(18)
            .onChange((value: string) => {
              this.cacheImportJson = value
            })
          Button('importJson测试：Json格式导入数据', { type: ButtonType.Normal })
            .fontSize(18)
            .fontColor('#000')
            .height(60)
            .width(300)
            .margin({ top: 20 })
            .backgroundColor('#12939f')
            .onClick(() => {
              try {
                this.cacheImportJsonSize = cache.importJson(this.cacheImportJson, skipFn(true));
                prompt.showToast({ message: '写入成功', duration: 3000 })
              } catch (err) {
                prompt.showToast({ message: '请输入json格式数据', duration: 3000 })
              }

            })
          Text('成功写入后的缓存中的当前条目数' + this.cacheImportJsonSize)
            .margin({ top: 5 })
            .fontSize(16)
          Divider().strokeWidth(2).color('#F1F3F5').margin({ top: 8, bottom: 8 })
        }.margin({ top: 10 })

      }

    }
    .scrollable(ScrollDirection.Vertical)
    .scrollBar(BarState.Off)
    .scrollBarColor(Color.Gray)
    .scrollBarWidth(1)

  }
}