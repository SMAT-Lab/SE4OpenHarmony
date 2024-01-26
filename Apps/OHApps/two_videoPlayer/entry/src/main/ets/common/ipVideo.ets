/*
 * Copyright 2023 Unionman Technology Co., Ltd.
 *
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
 *
 */
import deviceManager from '@ohos.distributedHardware.deviceManager';
import featureAbility from '@ohos.ability.featureAbility';
import window from '@ohos.window';
import abilityAccessCtrl from '@ohos.abilityAccessCtrl';

@Component
export struct ipVideo {
  src: Resource =  $r('app.media.EP11')

  @State videoIndex: number = 0
  @State SpeedIndex: number = 1
  @State title: string = "网络摄像头";
  // 当前视频播放速率
  @State currentProgressRate: number = 1;
  @State autoPlays: boolean = true;
  // 是否显示控制栏
  @State controls: number = 0;
  @State isFullScreen: boolean = false;
  // 是否正在播放
  @State isPlay: boolean = true;
  // 滑动条进度
  @State inVerticalSetValue: number = 0
  // 当前播放进度
  @State currentTime: number = 0
  // 视频时长
  @State duration: number = 0
  @State currentSpeed: string = '1.0X'
  @State intervalID: number = 0
  startx: number = 0
  starty: number = 0
  endx: number = 0
  endy: number = 0
  // 设备管理对象

  controller: VideoController = new VideoController();
  scroller: Scroller = new Scroller()

  setScreenKeepOn() {
    //获取当前窗口
    let windowClass : window.Window;
    let context = getContext(this);
    let promise = window.getLastWindow(context);
    promise.then((data) => {
      console.info('XXXXX Succeeded in obtaining the top window. Data: ' + JSON.stringify(data));
      windowClass = data;

      //设置常亮状态
      let isKeepScreenOn = true;
      let promise = windowClass.setKeepScreenOn(isKeepScreenOn);
      console.log("XXXXX setKeepScreenOn")
      promise.then(() => {
        console.info('XXXXX Succeeded in setting the screen to be always on.');
      }).catch((err : Error) => {
        console.info('XXXXX Failed to set the screen to be always on. Cause:  ' + JSON.stringify(err));

      });

    }).catch((err : Error) => {
      console.error('XXXXX Failed to obtain the top window. Cause: ' + JSON.stringify(err));
    })
  }

  changeFullScreen() {
    this.isFullScreen = !this.isFullScreen
    //获取当前窗口
    let  FullScreen = this.isFullScreen;
    let  windowClass :window.Window;
    let context = getContext(this);
    let promise = window.getLastWindow(context);
    promise.then((data) => {
      windowClass = data;
      console.info('Succeeded in obtaining the top window. Data: ' + JSON.stringify(data));
      //设置全屏状态
      let promise = windowClass.setFullScreen(FullScreen);
      promise.then(() => {
        console.info('Succeeded in enabling the full-screen mode. ');
      }).catch((err : Error) => {
        console.error('Failed to enable the full-screen mode. Cause: ' + JSON.stringify(err));
      });

    }).catch((err : Error) => {
      console.error('Failed to obtain the top window. Cause: ' + JSON.stringify(err));
    })
  }

  // onPageShow() {
  //   this.setScreenKeepOn()
  //   this.changeFullScreen()
  //   let context = getContext(this);
  //   let manger=abilityAccessCtrl.createAtManager()
  //   manger.requestPermissionsFromUser(context,['ohos.permission.DISTRIBUTED_DATASYNC']);
  // }

  build() {
    Stack({ alignContent: Alignment.TopStart }) {
      Video({
        src: this.src,
        currentProgressRate: this.currentProgressRate,
        controller: this.controller
      })
        .focusable(false)
        .width('100%')
        .height('100%')
        .autoPlay(this.autoPlays)
        .loop(true)
        .controls(false)
        .onStart(() => {
          this.isPlay = true
        })
        .onPause(() => {
          this.isPlay = false
        })
        .onFinish(() => {
          this.isPlay = false
        })
        .onError(() => {
          this.isPlay = false
        })
        .onPrepared((e) => {
          console.error('onPrepared is ' + e.duration);
          this.duration = e.duration
        })
        .onSeeked((e) => {
          console.error('onSeekedis ' + e.time);
          this.currentTime = e.time
        })
        .gesture(
          TapGesture({ count: 1 })
            .onAction(() => {
              if (this.controls) {
                this.controls = 0;
              } else {
                this.controls = 1;
              }
            })
        )
        .gesture(
          TapGesture({ count: 2 })
            .onAction(() => {
              if (this.isPlay) {
                this.isPlay = !this.isPlay
                this.controller.pause();
              } else {
                this.isPlay = !this.isPlay
                this.controller.start();
              }
            })
        )
      //        .border({ width: 1, color: 'red', style: BorderStyle.Solid })

    }
  }
}
