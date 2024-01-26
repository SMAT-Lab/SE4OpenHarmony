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
import media from '@ohos.multimedia.media'
import fs from '@ohos.file.fs';

@Entry
@Component
struct AvplayerInterruptAvplayer {
  @State returnMsg: string = "hello"
  @State onReturnMsgs: Array<string> = ['未监听', '未监听']
  private arr = [0, 1]
  private surfaceIds = []
  private mXComponentControllers = [new XComponentController(), new XComponentController()]
  private videoSources = ["test1.mp4", "test2.mp4"]
  private fileDescriptors = [null, null]
  private AVPlayers = [null, null]
  private modes = [0, 0]

  async aboutToAppear() {
    await this.getStageFileDescriptor(this.videoSources[0]).then((res) => {
      this.fileDescriptors[0] = res
    });
    await this.getStageFileDescriptor(this.videoSources[1]).then((res) => {
      this.fileDescriptors[1] = res
    });

    this.returnMsg = `${JSON.stringify(this.fileDescriptors)} \n`
    this.returnMsg = `${JSON.stringify(this.surfaceIds)}`

  }

  async onBackPress() {
    if (this.AVPlayers[0] !== null) {
      await this.AVPlayers[0].release()
      this.AVPlayers[0] = null
    }

    if (this.AVPlayers[1] !== null) {
      await this.AVPlayers[1].release()
      this.AVPlayers[1] = null
    }
  }

  async getStageFileDescriptor(fileName) {
    let fileDescriptor = undefined;
    let mgr = globalThis.abilityContext.resourceManager
    await mgr.getRawFileDescriptor(fileName).then(value => {
      fileDescriptor = { fd: value.fd, offset: value.offset, length: value.length };
      console.log('case getRawFileDescriptor success fileName: ' + fileName);
    }).catch(error => {
      console.log('case getRawFileDescriptor err: ' + error);
    });
    return fileDescriptor;
  }

  async createAVPlayer(index) {
    if (this.AVPlayers[index] !== null) {
      this.returnMsg = `AVPlayer object ${index} is here already`
      return;
    }
    try {
      this.AVPlayers[index] = await media.createAVPlayer()
      this.returnMsg = `createAVPlayer ${index} Success,state=${this.AVPlayers[index].state} \n`
      this.AVPlayers[index].fdSrc = this.fileDescriptors[index]
      //this.AVPlayers[index].surfaceId = this.surfaceIds[index]

      this.returnMsg += `audioInterruptMode ${index} =${this.AVPlayers[index].audioInterruptMode} \n`
      this.returnMsg += `audioRendererInfo ${index} =${JSON.stringify(this.AVPlayers[index].audioRendererInfo)} \n`

    } catch (err) {
      this.returnMsg = `createAVPlayer ${index} Fail,err=${JSON.stringify(err)}`
    }
  }

  onAudioInterrupt(index) {
    if (this.AVPlayers[index] == null) {
      this.returnMsg = `AVPlayer object ${index} is not created`
      return;
    }
    this.onReturnMsgs[index] = `已监听`
    this.AVPlayers[index].on('audioInterrupt', (interruptEvent) => {
      this.onReturnMsgs[index] = `监听返回的数据：${JSON.stringify(interruptEvent)}`
    })
  }

  offAudioInterrupt(index) {
    if (this.AVPlayers[index] == null) {
      this.returnMsg = `AVPlayer object ${index} is not created`
      return;
    }
    this.AVPlayers[index].off('audioInterrupt')
  }

  async prepare(index) {
    if (this.AVPlayers[index] == null) {
      this.returnMsg = `AVPlayer object ${index} is not created`
      return;
    }

    try {
      await this.AVPlayers[index].prepare()
      this.returnMsg = `AVPlayer ${index} prepare Success,state=${this.AVPlayers[index].state},audioInterruptMode=${this.AVPlayers[index].audioInterruptMode}`

    } catch (err) {
      this.returnMsg = `AVPlayer ${index} prepare Fail,err=${JSON.stringify(err)}`
    }
  }

  async play(index) {
    if (this.AVPlayers[index] == null) {
      this.returnMsg = `AVPlayer object ${index} is not created`
      return;
    }

    try {
      await this.AVPlayers[index].play()
      this.returnMsg = `AVPlayer ${index} play Success,state=${this.AVPlayers[index].state},audioInterruptMode=${this.AVPlayers[index].audioInterruptMode}`
    } catch (err) {
      this.returnMsg = `AVPlayer ${index} play Fail,err=${JSON.stringify(err)}`
    }
  }

  async pause(index) {
    if (this.AVPlayers[index] == null) {
      this.returnMsg = `AVPlayer object ${index} is not created`
      return;
    }

    try {
      await this.AVPlayers[index].pause()
      this.returnMsg = `AVPlayer ${index} pause Success,state=${this.AVPlayers[index].state}`
    } catch (err) {
      this.returnMsg = `AVPlayer ${index} pause Fail,err=${JSON.stringify(err)}`
    }
  }

  async stop(index) {
    if (this.AVPlayers[index] == null) {
      this.returnMsg = `AVPlayer object ${index} is not created`
      return;
    }

    try {
      await this.AVPlayers[index].stop()
      this.returnMsg = `AVPlayer ${index} stop Success,state=${this.AVPlayers[index].state}`
    } catch (err) {
      this.returnMsg = `AVPlayer ${index} stop Fail,err=${JSON.stringify(err)}`
    }
  }

  async reset(index) {
    if (this.AVPlayers[index] == null) {
      this.returnMsg = `AVPlayer object ${index} is not created`
      return;
    }

    try {
      await this.AVPlayers[index].reset()
      this.returnMsg = `AVPlayer ${index} reset Success,state=${this.AVPlayers[index].state}`
    } catch (err) {
      this.returnMsg = `AVPlayer ${index} reset Fail,err=${JSON.stringify(err)}`
    }
  }

  async release(index) {
    if (this.AVPlayers[index] == null) {
      this.returnMsg = `AVPlayer object ${index} is not created`
      return;
    }

    try {
      await this.AVPlayers[index].release()
      this.returnMsg = `AVPlayer ${index} release Success,state=${this.AVPlayers[index].state}`
      this.AVPlayers[index] = null
      this.onReturnMsgs=['未监听','未监听']
    } catch (err) {
      this.returnMsg = `AVPlayer ${index} release Fail,err=${JSON.stringify(err)}`
    }
  }

  build() {
    Column() {
      Row() {
        Column() {
          Text("【音频渲染-AVPlayer打断】返回数据：").fontWeight(FontWeight.Bolder).position({ x: 10, y: 5 }).fontSize(18)
          Text(this.returnMsg).position({ x: 10, y: 30 }).fontSize(14)
        }.width('98%').height(80).backgroundColor(Color.Orange).position({ x: '1%' })
      }.position({ x: 0, y: 0 }).width('100%').zIndex(999)

      Scroll() {
        Column() {
          ForEach(this.arr, (item: number) => {

            Column() {
              //              XComponent({
              //                id: 'xcomponent'+item,
              //                type: 'surface',
              //                libraryname: '',
              //                controller: this.mXComponentControllers[item]
              //              })
              //                .onLoad(() => {
              //                  console.info('CameraModuleTest: OnLoad() is called!')
              //                  this.mXComponentControllers[item].setXComponentSurfaceSize({ surfaceWidth: 1920, surfaceHeight: 200 });
              //                  let surfaceId = this.mXComponentControllers[item].getXComponentSurfaceId()
              //                  this.surfaceIds[item] = surfaceId
              //                  console.info('CameraModuleTest: XComponent onLoad surfaceId: ' + this.surfaceIds[item])
              //
              //                })
              //                .width('50%')
              //                .height(80)
              //                .margin({ top: 10 })

              Row() {
                Button() {
                  Text("createAVPlayer").fontSize(22).fontColor(Color.Blue)
                }.width('65%').backgroundColor(Color.Pink).height(40).onClick(() => {
                  this.createAVPlayer(item)
                })

                Button() {
                  Text("prepare").fontSize(22).fontColor(Color.Blue)
                }.width('30%').backgroundColor(Color.Pink).height(40).onClick(() => {
                  this.prepare(item)
                })

              }.margin({ top: 10 }).height(40).width('100%').justifyContent(FlexAlign.SpaceAround)

              Row() {
                Button() {
                  Text("on('audioInterrupt')").fontSize(22).fontColor(Color.White)
                }.width('70%').height(40).onClick(() => {
                  this.onAudioInterrupt(item)
                })

                Button() {
                  Text("off").fontSize(22).fontColor(Color.White)
                }.width('25%').height(40).onClick(() => {
                  this.offAudioInterrupt(item)
                })
              }.margin({ top: 10 }).height(40).width('100%').justifyContent(FlexAlign.SpaceAround)

              Row() {
                Text(this.onReturnMsgs[item]).fontSize(22)
              }

              Row() {
                Text("焦点模式").fontSize(24)
                Radio({ value: `mute${item}1`, group: `modeGroup${item}` }).onChange((isChecked) => {
                  if (isChecked) {
                    this.modes[item] = 0;
                  } else {
                    this.modes[item] = 1;
                  }
                  this.AVPlayers[item].audioInterruptMode = this.modes[item]
                  this.returnMsg = `焦点模式选择：${this.modes[item]} \n`
                  this.returnMsg += `焦点模式设置为：${this.AVPlayers[item].audioInterruptMode}`
                }).checked(this.modes[item] == 0)
                Text("共享焦点").fontSize(18)

                Radio({ value: `mute${item}2`, group: `modeGroup${item}` }).onChange((isChecked) => {
                  if (isChecked) {
                    this.modes[item] = 1;
                  } else {
                    this.modes[item] = 0;
                  }
                  if(this.AVPlayers[item]===null){
                    this.returnMsg = `AVPlayer object ${item} is not created`
                    return;
                  }
                  this.AVPlayers[item].audioInterruptMode = this.modes[item]
                  this.returnMsg = `焦点模式选择：${this.modes[item]} \n`
                  this.returnMsg += `焦点模式设置为：${this.AVPlayers[item].audioInterruptMode}`
                }).checked(this.modes[item] == 1)
                Text("独立焦点").fontSize(18)
              }


              Row() {
                Button() {
                  Text("play").fontSize(22).fontColor(Color.Blue)
                }.width('50%').backgroundColor(Color.Pink).height(40).onClick(() => {
                  this.play(item)
                })

                Button() {
                  Text("pause").fontSize(22).fontColor(Color.Blue)
                }.width('45%').backgroundColor(Color.Pink).height(40).onClick(() => {
                  this.pause(item)
                })
              }.margin({ top: 10 }).height(40).width('100%').justifyContent(FlexAlign.SpaceAround)


              Row() {
                Button() {
                  Text("stop").fontSize(22).fontColor(Color.Blue)
                }.width('30%').backgroundColor(Color.Pink).height(40).onClick(() => {
                  this.stop(item)
                })

                Button() {
                  Text("reset").fontSize(22).fontColor(Color.Blue)
                }.width('30%').backgroundColor(Color.Pink).height(40).onClick(() => {
                  this.reset(item)
                })

                Button() {
                  Text("release").fontSize(22).fontColor(Color.Blue)
                }.width('30%').backgroundColor(Color.Pink).height(40).onClick(() => {
                  this.release(item)
                })
              }.margin({ top: 10 }).height(40).width('100%').justifyContent(FlexAlign.SpaceAround)

              Divider().strokeWidth(10).color(Color.Blue).margin({ top: 10 })

            }.width('100%')

          }, (item: number) => item.toString())
        }.width('100%')
      }.margin({ top: 80 }).width('100%')

    }
  }
}