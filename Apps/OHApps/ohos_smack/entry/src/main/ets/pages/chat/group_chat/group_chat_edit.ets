/**
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 *
 * This software is distributed under a license. The full license
 * agreement can be found in the file LICENSE in this distribution.
 * This software may not be copied, modified, sold or distributed
 * other than expressed in the named license agreement.
 *
 * This software is distributed without any warranty.
 */

import { Toolbar } from '../../base/toolbar'
import router from '@ohos.router';
import prompt from '@ohos.prompt';
import { Switches } from '../../base/Switches';
import { ItemInput } from '../../base/ItemInput';
import { RoomConfig } from '@ohos/smack'
import { SelectDialog } from '../../base/SelectDialog'
import { Smack } from '@ohos/smack'
import { SelectOptionsEntity } from '../../../entity/SelectOptionsEntity';
import { GlobalContext } from '../../../entity/GlobalContext';

@Entry
@Component
struct Group_chat_edit {
  private passwordprotectedroom: string = ''
  @State temp: string = ''
  @State JidVal: string = '任何人'
  @State PrivateVal: string = '任何人'
  @State roomName: string = ''
  @State roomDesc: string = ''
  @State roomMaxusers: string = ''
  @State roomPassword: string = ''
  @State roomAdmins: string = ''
  @State roomOwners: string = ''
  @State roomPresencebroadcast: Array<string> = []
  @State whois_options: Array<SelectOptionsEntity> = [
    {
      "label": "任何人",
      "value": "anyone"
    },
    {
      "label": "审核者",
      "value": "moderators"
    }
  ]
  @State allowpm_options: Array<SelectOptionsEntity> = [
    {
      "label": "任何人",
      "value": "anyone"
    },
    {
      "label": "参与者",
      "value": "participants"
    },
    {
      "label": "审核者",
      "value": "moderators"
    },
    {
      "label": "无",
      "value": "none"
    }
  ]
  public roomConfig: RoomConfig =new RoomConfig();
  scroller: Scroller = new Scroller()
  allowpm_selectDialog: CustomDialogController = new CustomDialogController({
    builder: SelectDialog({
      vue: $PrivateVal,
      options: this.allowpm_options
    }),
    customStyle: true,
    alignment: DialogAlignment.Center,
  })
  whois_selectDialog: CustomDialogController = new CustomDialogController({
    builder: SelectDialog({
      vue: $JidVal,
      options: this.whois_options,
    }),
    customStyle: true,
    alignment: DialogAlignment.Center,
  })

  aboutToAppear() {
    this.getRoomConfig()
  }

  switchAllowpm(str: string) {
    switch (str) {
      case "anyone":
        this.PrivateVal = "任何人"
        break
      case "participants":
        this.PrivateVal = "参与者"
        break
      case "moderators":
        this.PrivateVal = "审核者"
        break
      case "none":
        this.PrivateVal = "无"
        break
    }
  }

  switchAllowpmStr(str: string): string{
    let val = 'anyone'
    switch (str) {
      case "任何人":
        val = "anyone"
        break
      case "参与者":
        val = "participants"
        break
      case "审核者":
        val = "moderators"
        break
      case "无":
        val = "none"
        break
    }
    return val
  }

  public getRoomConfig() {
    this.roomConfig= JSON.parse(Smack.getRoomConfig()) as RoomConfig;
    this.JidVal = this.roomConfig.whois == "anyone" ? "任何人" : "审核者"
    this.switchAllowpm(this.roomConfig.allowpm)
    this.roomName = this.roomConfig.roomname
    this.roomDesc = this.roomConfig.roomdesc
    this.roomMaxusers = this.roomConfig.maxusers
    this.roomPassword = this.roomConfig.roomsecret?this.roomConfig.roomsecret:""
    this.passwordprotectedroom = this.roomConfig.passwordprotectedroom
    console.info('passwordprotectedroom-----------//' + this.passwordprotectedroom)
    this.roomAdmins = this.roomConfig.roomadmins
    this.roomOwners = this.roomConfig.roomowners
    this.roomPresencebroadcast = this.roomConfig.presencebroadcast
    console.info('Checkbox-----------//' + JSON.stringify(this.roomPresencebroadcast))
    console.info('roomConfig-----------//' + JSON.stringify(this.roomConfig))
  }

  //todo 修改房间配置
  updateRoomConfig() {
    this.roomConfig.allowpm = this.switchAllowpmStr(this.PrivateVal)
    this.roomConfig.whois = (this.JidVal == "任何人") ? "anyone" : "moderators"
    this.roomConfig.roomname = this.roomName
    this.roomConfig.roomdesc = this.roomDesc
    this.roomConfig.maxusers = this.roomMaxusers
    this.roomConfig.roomsecret = this.roomPassword
    this.roomConfig.roomadmins = this.roomAdmins
    this.roomConfig.roomowners = this.roomOwners
    this.roomConfig.presencebroadcast = this.roomPresencebroadcast
    this.roomConfig.passwordprotectedroom = this.roomPassword ? '1' : '0'
    console.info('update roomConfig roomPassword-----------//' + this.roomPassword+',passwordprotectedroom:'+this.roomConfig.passwordprotectedroom+',,')

    console.info('update roomConfig-----------//' + JSON.stringify(this.roomConfig))
    Smack.setRoomConfig(JSON.stringify(this.roomConfig))
    prompt.showToast({ message: "更新成功" })
    setTimeout(() => {
      router.back()
    }, 500)
  }

  build() {
    Flex({ direction: FlexDirection.Column }) {
      Toolbar({
        isBack: true,
        title: '房间配置',
        rightText: '保存',
        rightClickCallBack: () => {
          this.updateRoomConfig()
        }
      })
      Scroll(this.scroller) {
        Column() {
          ItemInput({ title: "房间名称", value: $roomName, val: $temp })
          ItemInput({ title: "房间描述", value: $roomDesc, val: $temp })
          ItemInput({
            title: "房间最大人数",
            value: $roomMaxusers,
            val: $temp,
            typeStr: "4"
          })
          ItemInput({
            title: "密码",
            value: $roomPassword,
            typeStr: "2",
            val: $temp
          })
          ItemInput({
            title: "能够发现成员真实 JID 的角色",
            widthStr: '65%',
            widthInput: '30%',
            value: $temp,
            val: $JidVal,
            radio: true,
            selectDialog: () => {
              this.whois_selectDialog.open()
            }
          })
          ItemInput({
            title: "Allowed to Send Private Messages",
            widthStr: '65%',
            widthInput: '30%',
            value: $temp,
            val: $PrivateVal,
            radio: true,
            selectDialog: () => {
              this.allowpm_selectDialog.open()
            }
          })
          ItemInput({
            title: "房间管理员",
            widthStr: '30%',
            widthInput: '65%',
            value: $roomAdmins,
            val: $temp,
            radio: false,
            selectDialog: () => {
              this.allowpm_selectDialog.open()
            }
          })
          ItemInput({
            title: "房间拥有者",
            widthStr: '30%',
            widthInput: '65%',
            value: $roomOwners,
            val: $temp,
            radio: false,
            selectDialog: () => {
              this.allowpm_selectDialog.open()
            }
          })
          Row() {
            Text("广播其存在的角色").width('35%').height('100%').fontSize(18)
            Row() {
              Checkbox({ name: 'checkbox1', group: 'checkboxGroup' })
                .select(this.roomPresencebroadcast.indexOf("moderator") == 0)
                .selectedColor(0x39a2db)
                .onChange((value: boolean) => {
                  let that = this
                  console.info('Checkbox1 change is' + value)
                  this.roomPresencebroadcast[0] = (value ? 'moderator' : '')

                })
              Text("审核者").fontSize(16)
              Checkbox({ name: 'checkbox2', group: 'checkboxGroup' })
                .select(this.roomPresencebroadcast.indexOf("participant") == 1)
                .selectedColor(0x39a2db)
                .onChange((value: boolean) => {
                  console.info('Checkbox2 change is' + value)
                  this.roomPresencebroadcast[1] = (value  ? 'participant' : '')
                })
              Text("参与者").fontSize(16)
              Checkbox({ name: 'checkbox3', group: 'checkboxGroup' })
                .select(this.roomPresencebroadcast.indexOf("visitor") == 2)
                .selectedColor(0x39a2db)
                .onChange((value: boolean) => {
                  console.info('Checkbox3 change is' + value)
                  this.roomPresencebroadcast[2] = (value ? 'visitor' : '')
                })
              Text("访客").fontSize(16)
            }.width('55%').justifyContent(FlexAlign.End)
          }
          .padding({ left: 15 })
          .height(54)
          .backgroundColor(Color.White)
          .margin({ top: 1 })
          .width('100%')

          Switches({ isOn: this.roomConfig.publicroom, title: '在目录中列出房间', onToggleChange: (HisOn:string) => {
            this.roomConfig.publicroom = HisOn
          } })
          Switches({ isOn: this.roomConfig.persistentroom, title: '永久房间', onToggleChange: (HisOn:string) => {
            this.roomConfig.persistentroom = HisOn
          } })
          Switches({ isOn: this.roomConfig.membersonly, title: '房间仅对成员开放', onToggleChange: (HisOn:string) => {
            this.roomConfig.membersonly = HisOn
          } })
          Switches({ isOn: this.roomConfig.moderatedroom, title: '房间需要审核', onToggleChange: (HisOn:string) => {
            this.roomConfig.moderatedroom = HisOn
          } })
          Switches({ isOn: this.roomConfig.allowinvites, title: '允许成员邀请其他人进群', onToggleChange: (HisOn:string) => {
            this.roomConfig.allowinvites = HisOn
          } })
          Switches({ isOn: this.roomConfig.changesubject, title: '允许成员更改主题', onToggleChange: (HisOn:string) => {
            this.roomConfig.changesubject = HisOn
          } })
          Switches({ isOn: this.roomConfig.reservednick, title: '仅允许注册昵称登陆', onToggleChange: (HisOn:string) => {
            this.roomConfig.reservednick = HisOn
          } })
          Switches({ isOn: this.roomConfig.canchangenick, title: '允许成员修改昵称', onToggleChange: (HisOn:string) => {
            this.roomConfig.canchangenick = HisOn
          } })
          Switches({ isOn: this.roomConfig.canchangenick, title: '允许成员注册房间', onToggleChange: (HisOn:string) => {
            this.roomConfig.canchangenick = HisOn
          } })
          Switches({ isOn: this.roomConfig.enablelogging, title: '记录房间聊天', onToggleChange: (HisOn:string) => {
            this.roomConfig.enablelogging = HisOn
          } })

        }
      }.scrollable(ScrollDirection.Vertical).scrollBar(BarState.On)

    }
    .width('100%')
    .backgroundColor('#ececec')
  }

  // todo 退出群聊
  onExitGroup() {
    //销毁房间,群主可调用
    Smack.destroy(GlobalContext.getContext().getValue('userName') as string, "123");
  }
}