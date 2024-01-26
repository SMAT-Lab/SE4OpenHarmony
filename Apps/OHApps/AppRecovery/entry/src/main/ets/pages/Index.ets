/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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

import router from '@ohos.router';

@Entry
@Component
struct FirstPage {
  storage = LocalStorage.getShared();
  @State launchReason: string = '';
  @State lastExitReason: string = '';
  @State callerAbility: string = '';

  aboutToAppear() {
    this.launchReason = this.storage.get<string>('launchReason') ?? 'Unknown';
    this.lastExitReason = this.storage.get<string>('lastExitReason') ?? 'Unknown';
    this.callerAbility = this.storage.get<string>('CurrentAbilityName') ?? 'Unknown';
  }

  build() {
    Column() {
      Text(this.callerAbility)
        .fontSize('30fp')
        .fontWeight(FontWeight.Bold)
        .padding({ left: '24vp', right: '24vp', top: '7vp', bottom: '8vp' })
        .margin({ top: '24vp' })
        .textAlign(TextAlign.Start)
        .height('56vp')
        .width('100%')
        .fontColor($r('app.color.text_grey'));

      List() {
        ListItem() {
          Column() {
            Row() {
              Text($r('app.string.launch_reason')).fontSize('16fp').width('86%');
              Text('0' + this.launchReason)
                .fontSize('14fp')
                .width('14%')
                .fontColor($r('app.color.text_grey'))
                .opacity(0.6)
                .textAlign(TextAlign.End);
            }
          }
        }.width('100%').height('48vp').align(Alignment.Center);

        ListItem() {
          Column() {
            Row() {
              Text($r('app.string.last_exit_reason')).fontSize('16fp').width('86%');
              Text('0' + this.lastExitReason)
                .fontSize('14fp')
                .width('14%')
                .fontColor($r('app.color.text_grey'))
                .opacity(0.6)
                .textAlign(TextAlign.End);
            }
          }
        }.width('100%').height('48vp').align(Alignment.Center);
      }
      .alignListItem(ListItemAlign.Center)
      .margin({ left: '12vp', right: '12vp', top: '8vp' })
      .width('93.3%')
      .borderRadius('24vp')
      .backgroundColor($r('sys.color.ohos_id_color_foreground_contrary'))
      .padding({ left: '12vp', right: '12vp', top: '4vp', bottom: '4vp' })
      .divider({ strokeWidth: '0.5vp', color: $r('app.color.text_grey_opacity') });

      Button($r('app.string.trigger_fault'))
        .fontSize('16fp')
        .onClick(() => {
          router.pushUrl({ url: 'pages/FaultTriggerPage' });
        })
        .width('88.9%')
        .margin({ top: '520vp', right: '24vp', left: '24vp', bottom: '24vp' })
        .height('40vp')
        .backgroundColor($r('app.color.text_blue_opacity'));
    }.backgroundColor($r('sys.color.ohos_id_color_sub_background')).width('100%').height('100%');
  }
}
