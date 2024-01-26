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
import router from '@ohos.router';
import screenshot from '@ohos.screenshot';
import abilityAccessCtrl from '@ohos.abilityAccessCtrl';
import promptAction from '@ohos.promptAction';
import deviceManager from '@ohos.distributedHardware.deviceManager';
import Logger from '../model/Logger';
import MediaUtils from '../utils/MediaUtils';
import { DeviceDialog } from '../common/DeviceDialog';
import { RemoteDeviceModel } from '../model/RemoteDeviceModel';
import { ScreenshotDialog } from '../common/ScreenshotDialog';

const TAG = 'TitleBar';
const DATA_CHANGE = 'dataChange';
const EXIT = 'exit';
const ONE_THOUSAND: number = 1000;

@Component
export struct TitleBar {
  @Prop title: string
  @Prop isLand: boolean
  @State selectedIndex: number = 0
  @StorageLink('deviceLists') deviceLists: Array<deviceManager.DeviceInfo> = []
  @State screenshotUrl: PixelMap = undefined
  private startAbilityCallBack: (key) => void
  private remoteDeviceModel: RemoteDeviceModel = null
  private dialogController: CustomDialogController = null
  private mediaUtil: MediaUtils = new MediaUtils()
  screenshotDialogController: CustomDialogController = new CustomDialogController({
    builder: ScreenshotDialog({ screenshotUrl: $screenshotUrl }),
    autoCancel: true,
    customStyle: true,
    offset: { dx: -100, dy: 100 }
  })

  aboutToAppear() {
    AppStorage.SetOrCreate('deviceLists', this.deviceLists)
  }

  clearSelectState() {
    this.deviceLists = []
    if (this.dialogController) {
      this.dialogController.close()
      this.dialogController = null
    }
  }

  selectDevice() {
    Logger.info(TAG, `start ability device:${JSON.stringify(this.deviceLists[this.selectedIndex])}`)
    if (this.remoteDeviceModel === null || this.remoteDeviceModel.discoverLists.length <= 0 || this.remoteDeviceModel.deviceLists.includes(this.deviceLists[this.selectedIndex])) {
      this.startAbility(this.deviceLists[this.selectedIndex].deviceId)
      this.clearSelectState()
      return
    }
    Logger.info(TAG, 'start ability, needAuth')
    this.remoteDeviceModel.authenticateDevice(this.deviceLists[this.selectedIndex], (device: deviceManager.DeviceInfo) => {
      Logger.info(TAG, 'auth and online finished' + JSON.stringify(device))
      this.startAbility(device.deviceId)
    })
    Logger.info(TAG, 'start ability2 ......')
    this.clearSelectState()
  }

  selectedIndexChange = (index: number) => {
    Logger.info(TAG, 'selectedIndexChange')
    this.selectedIndex = index
    if (this.selectedIndex === 0) {
      Logger.info(TAG, 'stop ability')
      this.startAbilityCallBack(EXIT)
      globalThis.isDistributed = false
      if (this.dialogController !== null) {
        this.dialogController.close()
      }
      this.deviceLists = []
      return
    }
    this.selectDevice()
  }

  /**
   * 启动远程设备
   * @param deviceId
   */
  async startAbility(deviceId) {
    Logger.info(TAG, `startAbility deviceId: ${deviceId}`)
    await globalThis.context.startAbility({
      bundleName: 'com.unionman.distributedvideoplayer',
      abilityName: 'EntryAbility',
      deviceId: deviceId,
      parameters: {
        isStage: 'Stage',
        deviceID: "remote"
      }
    }).then((data) => {
      Logger.info(TAG, `start ability finished: ${JSON.stringify(data)}`)
      promptAction.showToast({ message: "流转成功" })
      globalThis.isDistributed = true
      // 等待对端KvStore启动再同步数据
      setTimeout(() => {
        this.startAbilityCallBack(DATA_CHANGE)
      }, 2000)
    }).catch((err) => {
      Logger.error(TAG, `start ability err: ${JSON.stringify(err)}`);
    });
  }

  showDialog() {
    // 注册监听回调，发现设备或查找到已认证设备会弹窗显示
    this.remoteDeviceModel.registerDeviceListCallback(() => {
      Logger.info(TAG, 'registerDeviceListCallback, callback entered')
      this.deviceLists = []
      this.deviceLists.push({
        deviceId: '0',
        deviceName: '本机(结束协同)',
        deviceType: deviceManager.DeviceType.UNKNOWN_TYPE,
        networkId: '',
        range: ONE_THOUSAND
      })
      let deviceTempList = this.remoteDeviceModel.deviceLists.concat(this.remoteDeviceModel.discoverLists)
      Logger.info(TAG, `this.remoteDeviceModel.deviceTempList.length${deviceTempList.length}`)
      for (let i = 0; i < deviceTempList.length; i++) {
        Logger.info(TAG, `device ${i}/${deviceTempList.length} deviceId= ${deviceTempList[i].deviceId}, deviceName= ${deviceTempList[i].deviceName}, deviceType= ${deviceTempList[i].deviceType}`)
        this.deviceLists.push(deviceTempList[i])
        AppStorage.Set('deviceLists', this.deviceLists)
        Logger.info(TAG, 'deviceLists push end')
      }
      Logger.info(TAG, 'CustomDialogController start')
      if (this.dialogController !== null) {
        this.dialogController.close()
        this.dialogController = null
      }
      this.dialogController = new CustomDialogController({
        builder: DeviceDialog({
          cancel: () => {
            this.clearSelectState()
          },
          selectedIndex: this.selectedIndex,
          selectedIndexChange: this.selectedIndexChange
        }),
        cancel: () => {
          this.clearSelectState()
        },
        autoCancel: true,
        customStyle: true,
        alignment: this.isLand ? DialogAlignment.Center : DialogAlignment.Bottom
      })
      this.dialogController.open()
      Logger.info(TAG, 'CustomDialogController end')
    })
  }

  build() {
    Row() {
      Image($r("app.media.ic_back"))
        .id("back")
        .height('60%')
        .margin({ right: 4 })
        .width(this.isLand ? '6%' : '8%')
        .objectFit(ImageFit.Contain)
        .onClick(() => {
          globalThis.context.terminateSelf()
        })

      Text(this.title)
        .fontColor(Color.White)
        .fontSize(22)
        .maxLines(1)

      Blank()

      Image($r("app.media.ic_controlcenter_screenshot_filled"))
        .id("screenshot")
        .height('60%')
        .margin({ right: 8 })
        .width(this.isLand ? '6%' : '8%')
        .objectFit(ImageFit.Contain)
        .onClick(() => {
          var screenshotOptions = {};
          screenshot.save(screenshotOptions).then((pixelMap: PixelMap) => {
            this.screenshotUrl = pixelMap
            this.mediaUtil.savePicture(pixelMap)
            this.screenshotDialogController.open()
          }).catch((err) => {
            Logger.error('Failed to save screenshot: ' + JSON.stringify(err));
          });
        })

      Image($r("app.media.ic_hop"))
        .id("hop")
        .height('60%')
        .width(this.isLand ? '6%' : '8%')
        .margin({ right: 8 })
        .objectFit(ImageFit.Contain)
        .onClick(() => {
          this.showDialog()
        })

      Image($r("app.media.ic_settings"))
        .id("settings")
        .height('60%')
        .width(this.isLand ? '6%' : '8%')
        .objectFit(ImageFit.Contain)
        .onClick(() => {
          router.pushUrl({
            url: 'pages/Settings'
          })
        })
    }
    .width('100%')
    .height(this.isLand ? '10%' : '8%')
    .constraintSize({ minHeight: 50 })
    .alignItems(VerticalAlign.Center)
    .padding({ left: 10, right: 10 })
    .linearGradient({
      direction: GradientDirection.Bottom,
      colors: [['#CC000000', 0.0], ['#33000000', 0.66], ['#00000000', 0.99]]
    })
  }
}
