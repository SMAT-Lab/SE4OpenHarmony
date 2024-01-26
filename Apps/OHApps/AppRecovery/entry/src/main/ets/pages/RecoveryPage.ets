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

import { CurActiveAbility } from '../common/CurActiveAbility';
@Entry
@Component
struct Index {
  storage = LocalStorage.getShared();
  @State launchParam: string = '';
  @State wantParam: string = '';
  fromEntryAbility: boolean = false;

  aboutToAppear() {
    this.launchParam = this.storage.get<string>('launchParam') ?? 'UnknownLaunchParam';
    this.wantParam = this.storage.get<string>('wantParam') ?? 'UnknownWantParam';
    let abilityName = AppStorage.get<string>('RecoverAbility');
    if (abilityName === 'EntryAbility') {
      this.fromEntryAbility = true;
    }
  }

  build() {
    Column() {
      Text('RecoveryPage')
        .fontSize('30fp')
        .fontWeight(FontWeight.Bold)
        .padding({ left: '24vp', right: '24vp', top: '4vp', bottom: '4vp' })
        .margin({ top: '24vp' })
        .textAlign(TextAlign.Start)
        .height('56vp')
        .width('100%')
        .fontColor($r('app.color.text_grey'));

      if (this.fromEntryAbility === false) {
        List() {
          ListItem() {
            Column() {
              Row() {
                Text('SecondAbility').fontSize('16fp').width('76.3%');
                Button($r('app.string.recover'))
                  .fontSize('12fp')
                  .width('23.7%')
                  .fontColor($r('app.color.text_blue_opacity'))
                  .onClick(() => {
                    if (CurActiveAbility.GetInstance().GetGlobalAbility() == undefined) {
                      return;
                    }
                    let want: Record<string, Object> = {
                      'bundleName': 'com.samples.recovery',
                      'abilityName': 'SecondAbility'
                    };
                    CurActiveAbility.GetInstance().GetGlobalAbility().context.startAbility(want);
                  })
                  .height('28vp')
                  .backgroundColor($r('sys.color.ohos_id_color_sub_background'))
              }.height('48vp').align(Alignment.Center).width('100%');
            }
          }.width('100%')
        }
        .margin({ left: '12vp', right: '12vp', top: '12vp' })
        .width('93.3%')
        .borderRadius('24vp')
        .backgroundColor($r('sys.color.ohos_id_color_foreground_contrary'))
        .padding({ left: '12vp', right: '12vp', top: '4vp', bottom: '4vp' })
      }

      List() {
        ListItem() {
          Column() {
            Row() {
              Text('EntryAbility').fontSize('16fp').width('76.3%');
              Button($r('app.string.recover'))
                .fontSize('12fp')
                .width('23.7%')
                .fontColor($r('app.color.text_blue_opacity'))
                .onClick(() => {
                  if (CurActiveAbility.GetInstance().GetGlobalAbility() == undefined) {
                    return;
                  }
                  let want: Record<string, Object> = {
                      'bundleName': 'com.samples.recovery',
                      'abilityName': 'EntryAbility'
                    };
                  CurActiveAbility.GetInstance().GetGlobalAbility().context.startAbility(want);
                })
                .height('28vp')
                .backgroundColor($r('sys.color.ohos_id_color_sub_background'))
            }.height('48vp').align(Alignment.Center).width('100%');
          }
        }.width('100%')
      }
      .margin({ left: '12vp', right: '12vp', top: '12vp' })
      .width('93.3%')
      .borderRadius('24vp')
      .backgroundColor($r('sys.color.ohos_id_color_foreground_contrary'))
      .padding({ left: '12vp', right: '12vp', top: '4vp', bottom: '4vp' })
    }.backgroundColor($r('sys.color.ohos_id_color_sub_background')).width('100%').height('100%');
  }
}
