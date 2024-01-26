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

import appRecovery from '@ohos.app.ability.appRecovery';
import ResUtil from '../common/ResUtil';
import { CurActiveAbility } from '../common/CurActiveAbility';

@Entry
@Component
struct FaultTriggerPage {
  storage = LocalStorage.getShared();
  @State counter: number = 0;
  @State callerAbility: string = '';
  @State launchReason: string = '';
  @State lastExitReason: string = '';
  @State curAbilitySaveState: string = '';
  @State allAbilitySaveState: string = '';
  @State setRecoveryAbility: string = '';

  aboutToAppear() {
    this.counter = this.storage.get<number>('FaultTriggerPageCounter') ?? 0;
    this.callerAbility = this.storage.get<string>('CurrentAbilityName') ?? 'UnknownCallingAbility';
    this.launchReason = this.storage.get<string>('launchReason') ?? 'Unknown';
    this.lastExitReason = this.storage.get<string>('lastExitReason') ?? 'Unknown';
    ResUtil.getString($r('app.string.save_state').id).then((value: string) => this.curAbilitySaveState = value);
    ResUtil.getString($r('app.string.save_state').id).then((value: string) => this.allAbilitySaveState = value);
    ResUtil.getString($r('app.string.set_config').id).then((value: string) => this.setRecoveryAbility = value);
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

      List() {
        ListItem() {
          Column() {
            Row() {
              Row() {
                Text($r('app.string.click_counter')).fontSize('16fp')
                Text(this.counter.toString()).fontSize('16fp')
              }.align(Alignment.Center).width('76.3%');
              Button($r('app.string.counter_name'))
                .fontSize('12fp')
                .width('23.7%')
                .fontColor($r('app.color.text_blue_opacity'))
                .onClick(() => {
                  this.counter++;
                })
                .backgroundColor($r('sys.color.ohos_id_color_sub_background'))
                .align(Alignment.Center)
                .height('28vp');
            }.align(Alignment.Center).height('48vp');
          }
        }.align(Alignment.Center).padding({ top: '4vp', bottom: '4vp' }).width('100%');
      }
      .height('56vp')
      .margin({ left: '12vp', right: '12vp', top: '12vp' })
      .width('93.3%')
      .borderRadius('24vp')
      .backgroundColor($r('sys.color.ohos_id_color_foreground_contrary'))
      .padding({ left: '12vp', right: '12vp' });

      Text($r('app.string.recover_settings'))
        .fontSize('14fp')
        .margin({ left: '24vp', right: '24vp', top: '19.5vp', bottom: '9.5vp' })
        .textAlign(TextAlign.Start)
        .fontColor($r('app.color.text_grey'))
        .opacity(0.6)
        .height('19vp')
        .width('86.7%');

      List() {
        ListItem() {
          Column() {
            Row() {
              Text($r('app.string.save_current_ability_status')).fontSize('16fp').width('76.3%');
              Button(this.curAbilitySaveState)
                .fontSize('12fp')
                .width('23.7%')
                .fontColor($r('app.color.text_blue_opacity'))
                .onClick(() => {
                  this.storage.setOrCreate('FaultTriggerPageCounter', this.counter);
                  this.storage.setOrCreate('FaultTriggerPageString', 'TestFaultTriggerPageString');
                  appRecovery.saveAppState(CurActiveAbility.GetInstance().GetGlobalAbility().context);
                  ResUtil.getString($r('app.string.save_state_done').id)
                    .then((value: string) => this.curAbilitySaveState = value);
                })
                .height('28vp')
                .backgroundColor($r('sys.color.ohos_id_color_sub_background'))
            }.height('48vp').width('100%');
          }
        }.width('100%');

        ListItem() {
          Column() {
            Row() {
              Text($r('app.string.save_all_ability_status')).fontSize('16fp').width('76.3%');
              Button(this.allAbilitySaveState)
                .fontSize('12fp')
                .width('23.7%')
                .fontColor($r('app.color.text_blue_opacity'))
                .onClick(() => {
                  this.storage.setOrCreate('FaultTriggerPageCounter', this.counter);
                  this.storage.setOrCreate('FaultTriggerPageString', 'TestFaultTriggerPageString');
                  appRecovery.saveAppState();
                  ResUtil.getString($r('app.string.save_state_done').id)
                    .then((value: string) => this.allAbilitySaveState = value);
                })
                .height('28vp')
                .backgroundColor($r('sys.color.ohos_id_color_sub_background'))
            }.height('48vp').width('100%');
          }
        }.width('100%');

        ListItem() {
          Column() {
            Row() {
              Text($r('app.string.set_recovery_ability')).fontSize('16fp').width('76.3%');
              Button(this.setRecoveryAbility)
                .fontSize('12fp')
                .width('23.7%')
                .fontColor($r('app.color.text_blue_opacity'))
                .onClick(() => {
                  let tmp: Record<string, string> = { 'RecoverAbility': this.callerAbility }
                  let want: Record<string, Object> = {
                    'bundleName': 'com.samples.recovery',
                    'abilityName': 'RecoveryAbility',
                    'parameters': tmp,
                  };
                  appRecovery.setRestartWant(want);
                  ResUtil.getString($r('app.string.set_config_done').id)
                    .then((value: string) => this.setRecoveryAbility = value);
                })
                .height('28vp')
                .backgroundColor($r('sys.color.ohos_id_color_sub_background'))
            }.height('48vp').width('100%');
          }
        }.width('100%');

        if (this.callerAbility === 'EntryAbility') {
          ListItem() {
            Column() {
              Row() {
                Text('SecondAbility').fontSize('16fp').width('76.3%');
                Button($r('app.string.launch_ability'))
                  .fontSize('12fp')
                  .width('23.7%')
                  .fontColor($r('app.color.text_blue_opacity'))
                  .onClick(() => {
                    if (CurActiveAbility.GetInstance().GetGlobalAbility() == undefined) {
                      return;
                    }
                    this.storage.setOrCreate('FaultTriggerPageCounter', this.counter);
                    this.storage.setOrCreate('FaultTriggerPageString', 'TestFaultTriggerPageString');
                    let want: Record<string, Object> = {
                      'bundleName': 'com.samples.recovery',
                      'abilityName': 'SecondAbility'
                    };
                    CurActiveAbility.GetInstance().GetGlobalAbility().context.startAbility(want);
                  })
                  .height('28vp')
                  .backgroundColor($r('sys.color.ohos_id_color_sub_background'))
              }.height('48vp').width('100%');
            }
          }.width('100%');
        }
      }
      .margin({ left: '12vp', right: '12vp' })
      .width('93.3%')
      .borderRadius('24vp')
      .backgroundColor($r('sys.color.ohos_id_color_foreground_contrary'))
      .padding({ left: '12vp', right: '12vp', top: '4vp', bottom: '4vp' })
      .divider(
        { strokeWidth: '0.5vp', color: $r('app.color.text_grey_opacity') }
      );

      Text($r('app.string.trigger_fault_items'))
        .fontSize('14fp')
        .margin({ left: '24vp', right: '24vp', top: '19.5vp', bottom: '9.5vp' })
        .textAlign(TextAlign.Start)
        .fontColor($r('app.color.text_grey'))
        .opacity(0.6)
        .height('19vp')
        .width('86.7%');

      List() {
        ListItem() {
          Column() {
            Row() {
              Text($r('app.string.trigger_js_error')).fontSize('16fp').width('76.3%');
              Button($r('app.string.trigger'))
                .fontSize('12fp')
                .width('23.7%')
                .fontColor($r('app.color.text_blue_opacity'))
                .onClick(() => {
                  throw new Error('Force Crash');
                })
                .height('28vp')
                .backgroundColor($r('sys.color.ohos_id_color_sub_background'))
            }.height('48vp').align(Alignment.Center).width('100%');
          }
        }.width('100%');
      }
      .margin({ left: '12vp', right: '12vp' })
      .width('93.3%')
      .borderRadius('24vp')
      .backgroundColor($r('sys.color.ohos_id_color_foreground_contrary'))
      .padding({ left: '12vp', right: '12vp', top: '4vp', bottom: '4vp' })
      .divider({ strokeWidth: '0.5vp', color: $r('app.color.text_grey_opacity') });
    }.backgroundColor($r('sys.color.ohos_id_color_sub_background')).width('100%').height('100%');
  }
}
