/*
* Copyright (C) 2023 Huawei Device Co., Ltd.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import router from '@ohos.router';
import audio from '@ohos.multimedia.audio'
import fs from '@ohos.file.fs';

@Entry
@Component
struct TonePlayerCallback {
  @State returnMsg: string = `hello`
  private toneTypeList = []
  private toneTypeArr = []
  private contentTypeList = []
  @State selectedContentTypeKey: string = "CONTENT_TYPE_MUSIC"
  private streamUsageList = []
  @State selectedStreamUsageKey: string = "STREAM_USAGE_MEDIA"
  private audioRendererInfo = {
    content: audio.ContentType.CONTENT_TYPE_SONIFICATION,
    usage: audio.StreamUsage.STREAM_USAGE_MEDIA,
    rendererFlags: 0
  }

  aboutToAppear() {

    for (let key in audio.ContentType) {
      this.contentTypeList.push({ value: key })
    }
    for (let key in audio.StreamUsage) {
      this.streamUsageList.push({ value: key })
    }

    for (let key in audio.ToneType) {
      this.toneTypeList.push(audio.ToneType[key])
    }

    this.toneTypeList=this.toneTypeList.sort((a,b)=>a-b)
    let result = []
    let path = []
    for (let i = 0;i < this.toneTypeList.length; i++) {
      if (path.length == 4) {
        result.push([...path])
      }

      if (i % 4 == 0) {
        path.length = 0;
      }
      path.push(this.toneTypeList[i])

      if (i == this.toneTypeList.length - 1) {
        result.push([...path])
      }
    }

    this.toneTypeArr = result

    this.returnMsg = JSON.stringify(result)
  }

  play(type) {
    let _this = this
    audio.createTonePlayer(_this.audioRendererInfo, (err, data) => {
      if (err) {
        _this.returnMsg = `createTonePlayer callback Error:${JSON.stringify(err)}`
      } else {
        _this.returnMsg = `createTonePlayer callback Success:${JSON.stringify(data)},`
        let tonePlayer = data;

        tonePlayer.load(type, (err) => {
          if (err) {
            _this.returnMsg = `load callback Error:${JSON.stringify(err)}`
            return;
          } else {
            _this.returnMsg += `load callback Success,`
            tonePlayer.start((err) => {
              if (err) {
                _this.returnMsg = `start callback Error:${JSON.stringify(err)}`
                return;
              } else {
                setTimeout(() => {
                  _this.returnMsg += `start callback Success,`
                  tonePlayer.stop((err) => {
                    if (err) {
                      _this.returnMsg = `stop callback Error:${JSON.stringify(err)}`
                      return;
                    } else {
                      _this.returnMsg += `start stop Success,`
                      tonePlayer.release((err) => {
                        if (err) {
                          _this.returnMsg = `release callback Error:${JSON.stringify(err)}`
                          return;
                        } else {
                          _this.returnMsg += `start release Success`
                        }
                      });
                    }
                  });
                }, 50)
              }
            });
          }
        });
      }
    });
  }

  build() {
    Column() {
      Row() {
        Column() {
          Text("【TonePlayer-callback】返回数据：").fontWeight(FontWeight.Bolder).position({ x: 10, y: 5 }).fontSize(18)
          Text(this.returnMsg).position({ x: 10, y: 30 }).fontSize(14)
        }.width('98%').height(100).backgroundColor(Color.Orange).position({ x: '1%' })
      }.position({ x: 0, y: 0 }).width('100%').zIndex(999)

      Scroll() {
        Column() {
          Row() {
            Select(this.contentTypeList).value(this.selectedContentTypeKey)
              .onSelect((index, value) => {
                this.selectedContentTypeKey = value
                this.audioRendererInfo.content = audio.ContentType[value]
              })
          }.margin({ top: 10 }).width('100%')

          Row() {
            Select(this.streamUsageList).value(this.selectedStreamUsageKey)
              .onSelect((index, value) => {
                this.selectedStreamUsageKey = value
                this.audioRendererInfo.usage = audio.StreamUsage[value]
              })
          }.margin({ top: 10 }).width('100%')

          Divider().strokeWidth(10).color(Color.Blue)
          ForEach(this.toneTypeArr, (item1: Array<number>) => {
            Row() {
              ForEach(item1, (item2: number) => {
                Button() {
                  Text(`${item2}`).fontSize(22).fontColor(Color.White)
                }.width('20%').height(60).onClick(() => {
                  this.play(item2)
                })
              }, (item: number) => item.toString())
            }.margin({ top: 30 }).width('100%').justifyContent(FlexAlign.SpaceAround)
          }, (item: number) => item.toString())
          Divider().strokeWidth(10).color(Color.Blue).margin({top:30})

        }.width('100%')
      }.margin({ top: 110 }).width('100%')
    }
  }
}