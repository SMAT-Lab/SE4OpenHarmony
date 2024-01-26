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

@Entry
@Component
struct Settings {
  private audioManager = null;
  @State returnMsg: string = 'Hello World'
  private selectAudioSceneList = []
  @State selectedAudioSceneKey: string = "请选择音频场景"
  keyController: TextInputController = new TextInputController();
  valueController: TextInputController = new TextInputController();
  @State keyStr: string = "";
  @State valueStr: string = "";

  aboutToAppear() {
    this.audioManager = audio.getAudioManager()
    for (let key in audio.AudioScene) {
      this.selectAudioSceneList.push({ value: key })
    }
  }

  setAudioSceneCallback() {
    if (this.selectedAudioSceneKey == "请选择音频场景") {
      this.returnMsg = "请选择音频场景"
      return
    }
    let _this = this
    this.audioManager.setAudioScene(audio.AudioScene[this.selectedAudioSceneKey], (err) => {
      if (err) {
        _this.returnMsg = `setAudioScene callback Error:${JSON.stringify(err)}`
        return;
      }
      _this.returnMsg = `setAudioScene callback Success`
    });
  }

  setAudioScenePromise() {
    if (this.selectedAudioSceneKey == "请选择音频场景") {
      this.returnMsg = "请选择音频场景"
      return
    }
    let _this = this
    this.audioManager.setAudioScene(audio.AudioScene[this.selectedAudioSceneKey])
      .then(() => {
        _this.returnMsg = `setAudioScene promise Success`
      }).catch(err => {
      _this.returnMsg = `setAudioScene promise Error:${JSON.stringify(err)}`
    })
  }

  getAudioSceneCallback() {
    let _this = this
    this.audioManager.getAudioScene((err, value) => {
      if (err) {
        _this.returnMsg = `getAudioScene callback Error:${JSON.stringify(err)}`
        return;
      }
      _this.returnMsg = `getAudioScene callback Success,返回值：${value}`
    })
  }

  getAudioScenePromise() {
    let _this = this
    this.audioManager.getAudioScene()
      .then(value => {
        _this.returnMsg = `getAudioScene promise Success,返回值：${value}`
      }).catch(err => {
      _this.returnMsg = `getAudioScene promise Error:${JSON.stringify(err)}`
    })
  }

  setAudioParameterCallback() {
    let _this = this
    if (this.keyStr == "") {
      _this.returnMsg = `key 值尚未输入`
      return
    }

    if (this.valueStr == "") {
      _this.returnMsg = `value 值尚未输入`
      return
    }
    _this.returnMsg = `key:${this.keyStr},value:${this.valueStr} \n`

    _this.audioManager.setAudioParameter(this.keyStr, this.valueStr, (err) => {
      if (err) {
        _this.returnMsg += `setAudioParameter callback Error:${JSON.stringify(err)}`
        return;
      }
      _this.returnMsg += `setAudioParameter callback Success`
    });
  }

  setAudioParameterPromise() {
    let _this = this
    if (this.keyStr == "") {
      _this.returnMsg = `key 值尚未输入`
      return
    }

    if (this.valueStr == "") {
      _this.returnMsg = `value 值尚未输入`
      return
    }

    _this.returnMsg = `key:${this.keyStr},value:${this.valueStr} \n`
    _this.audioManager.setAudioParameter(this.keyStr, this.valueStr)
      .then(() => {
        _this.returnMsg += `setAudioParameter promise Success`
      }).cacth(err => {
      _this.returnMsg += `setAudioParameter promise Error:${JSON.stringify(err)}`
    })
  }

  getAudioParameterCallback() {
    let _this = this
    if (this.keyStr == "") {
      _this.returnMsg = `key 值尚未输入`
      return
    }
    _this.returnMsg = `key:${this.keyStr} \n`
    _this.audioManager.getAudioParameter(this.keyStr, (err, value) => {
      if (err) {
        _this.returnMsg += `getAudioParameter callback Error:${JSON.stringify(err)}`
        return;
      }
      _this.returnMsg += `setAudioParameter callback Success,返回值：${value}`
    });
  }

  getAudioParameterPromise() {
    let _this = this
    if (this.keyStr == "") {
      _this.returnMsg = `key 值尚未输入`
      return
    }
    _this.returnMsg = `key:${this.keyStr} \n`
    _this.audioManager.getAudioParameter(this.keyStr)
      .then(value => {
        _this.returnMsg += `setAudioParameter promise Success,返回值：${value}`
      }).catch(err => {
      _this.returnMsg += `getAudioParameter promise Error:${JSON.stringify(err)}`
    })
  }

  build() {
    Row() {
      Row() {
        Column() {
          Text("【音频管理-设置】返回数据：").fontWeight(FontWeight.Bolder).position({ x: 10, y: 5 }).fontSize(18)
          Text(this.returnMsg).position({ x: 10, y: 30 }).fontSize(14)
        }.width('98%').height(120).backgroundColor(Color.Orange).position({ x: '1%' })
      }.position({ x: 0, y: 0 }).width('100%').zIndex(999)

      Scroll() {
        Column() {
          Row() {
            Select(this.selectAudioSceneList).value(this.selectedAudioSceneKey)
              .onSelect((index, value) => {
                this.selectedAudioSceneKey = value;
              })
          }.margin({ top: 10 }).width('100%')

          Divider().strokeWidth(2).color(Color.Gray).margin({ bottom: 20 })
          Row() {
            Button() {
              Text("setAudioScene callback").fontSize(20).fontColor(Color.White).align(Alignment.Center).lineHeight(40)
            }.height(100).width('49%').onClick(() => this.setAudioSceneCallback())

            Button() {
              Text("setAudioScene promise").fontSize(20).fontColor(Color.White).align(Alignment.Center).lineHeight(40)
            }.height(100).width('49%').onClick(() => this.setAudioScenePromise())

          }.width('100%').justifyContent(FlexAlign.SpaceAround)

          Row() {
            Button() {
              Text("getAudioScene callback").fontSize(20).fontColor(Color.White).align(Alignment.Center).lineHeight(40)
            }.height(100).width('49%').onClick(() => this.getAudioSceneCallback())

            Button() {
              Text("getAudioScene promise").fontSize(20).fontColor(Color.White).align(Alignment.Center).lineHeight(40)
            }.height(100).width('49%').onClick(() => this.getAudioScenePromise())

          }.width('100%').justifyContent(FlexAlign.SpaceAround).margin({ top: 20, bottom: 20 })

          Divider().strokeWidth(10).color(Color.Blue)

          Row() {
            TextInput({ "placeholder": "请输入音频参数的键", controller: this.keyController, text: `${this.keyStr}` })
              .width('90%')
              .height(80)
              .style(TextInputStyle.Inline)
              .borderRadius(0)
              .fontSize(24)
              .placeholderFont({ size: 22 })
              .onChange((value) => {
                this.keyStr = value
              })
          }

          Row() {
            TextInput({ "placeholder": "请输入音频参数的值", controller: this.valueController, text: `${this.valueStr}` })
              .width('90%')
              .height(80)
              .style(TextInputStyle.Inline)
              .borderRadius(0)
              .fontSize(24)
              .placeholderFont({ size: 22 })
              .onChange((value) => {
                this.valueStr = value
              })
          }.margin({ top: 20 })

          Row() {
            Button() {
              Text("setAudioParameter callback")
                .fontSize(20)
                .fontColor(Color.White)
                .align(Alignment.Center)
                .lineHeight(40)
            }.height(100).width('49%').onClick(() => this.setAudioParameterCallback())

            Button() {
              Text("setAudioParameter promise")
                .fontSize(20)
                .fontColor(Color.White)
                .align(Alignment.Center)
                .lineHeight(40)
            }.height(100).width('49%').onClick(() => this.setAudioParameterPromise())

          }.width('100%').justifyContent(FlexAlign.SpaceAround)

          Row() {
            Button() {
              Text("getAudioParameter callback")
                .fontSize(20)
                .fontColor(Color.White)
                .align(Alignment.Center)
                .lineHeight(40)
            }.height(100).width('49%').onClick(() => this.getAudioParameterCallback())

            Button() {
              Text("getAudioParameter promise")
                .fontSize(20)
                .fontColor(Color.White)
                .align(Alignment.Center)
                .lineHeight(40)
            }.height(100).width('49%').onClick(() => this.getAudioParameterPromise())

          }.width('100%').justifyContent(FlexAlign.SpaceAround).margin({ top: 20, bottom: 20 })

          Divider().strokeWidth(10).color(Color.Blue)
        }
      }.width('100%').margin({ top: 130 })
    }.width('100%')

  }
}