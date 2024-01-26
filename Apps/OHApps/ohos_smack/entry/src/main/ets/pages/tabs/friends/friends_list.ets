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
import { FriendsEntity,UserEntity,Smack } from "@ohos/smack"
import { GlobalContext } from '../../../entity/GlobalContext';

@Entry
@Component
export struct Friends_list {
  @State myFriendList: Array<FriendsEntity> = []
  menuDialog: CustomDialogController = new CustomDialogController({
    builder: MenuDialog({}),
    customStyle: true,
    alignment: DialogAlignment.TopEnd,
    offset: { dx: -20, dy: 50 }
  })

  aboutToAppear() {
    this.getMyAllFriends()
  }

  onPageShow() {
    this.getMyAllFriends()
  }

  build() {
    Column() {
      // 标题栏
      Toolbar({ title: '好友', rightIcon: $r("app.media.add"), rightClickCallBack: () => {
        this.menuDialog.open()
      } })

      // 搜索框
//            Column() {
//              Text('搜 索')
//                .padding(10)
//                .width('100%')
//                .textAlign(TextAlign.Center)
//                .height(40)
//                .fontSize(20)
//                .backgroundColor('#ffe7e7e7')
//                .borderRadius(20)
//                .fontColor('#ff757575')
//            }
//            .width('100%')
//            .padding(10)
//            .onClick(e => {
//              router.push({
//                url: 'pages/user/search_friends'
//              })
//            })

      // 好友列表
      Stack({ alignContent: Alignment.BottomEnd }) {
        List() {
          ForEach(this.myFriendList, (item:FriendsEntity) => {
            ListItem() {
              Column() {
                Flex({ direction: FlexDirection.Row, alignItems: ItemAlign.Center }) {
                  Text(item.groupName + '（' + item.names.length + '）')
                    .fontSize(15)
                    .width('100%')
                    .padding(20)

                  Column() {
                    Image($r('app.media.change')).width(20).height(20)
                  }
                  .padding(5)
                  .margin({ right: 20 })
                  .onClick(e => {
                    router.push({
                      url: "pages/tabs/friends/change_group_name",
                      params: {
                        name: item.groupName
                      }
                    })
                  })
                }
                .backgroundColor('#fff1f1f1')

                ForEach(item.names, (item2:UserEntity) => {
                  Text(item2.userName)
                    .fontSize(13)
                    .width('100%')
                    .margin({ left: 50 })
                    .padding(20)
                    .onClick(e => {
                      router.push({
                        url: 'pages/chat/one_chat/one_chat_main',
                        params: { userName: item2.userName }
                      })
                    })
                  Text('')
                    .height(1)
                    .width('100%')
                    .backgroundColor('#ececec')
                }, (item2: UserEntity) => JSON.stringify(item2))
              }
            }
          }, (item:FriendsEntity) => JSON.stringify(item))
        }
        .height('100%')
        .width('100%')

        Image($r("app.media.refresh"))
          .width(60)
          .height(60)
          .backgroundColor('#ff56ae97')
          .padding(5)
          .borderRadius(30)
          .objectFit(ImageFit.Cover)
          .margin({bottom: 190, right: 110})
          .onClick(v => {
            this.getMyAllFriends()
          })
      }
      .width('100%')
      .height('100%')
    }
  }

  // todo 获取所有好友及其分组信息
  getMyAllFriends() {

    setTimeout(() => {
      let res: Array<FriendsEntity> = Smack.getFriendList()
      this.myFriendList = res
      let groups:string[]=[]
      for (let i = 0; i < this.myFriendList.length; i++) {
        groups.push( this.myFriendList[i].groupName);

      }
      GlobalContext.getContext().setValue('groupList',JSON.stringify(groups));
      prompt.showToast({
        message: '刷新完成'
      })
    }, 300)
  }
}

@CustomDialog
struct MenuDialog {
  controller: CustomDialogController = {} as CustomDialogController;

  build() {
    Column() {
      Text('添加好友')
        .fontSize(20)
        .padding(20)
        .onClick(() => {
          router.push({
            url: 'pages/tabs/friends/add_friends'
          })
          this.controller.close()
        })

      Text('')
        .height(1)
        .width('100%')
        .backgroundColor('#ececec')

      Text('创建分组')
        .fontSize(30)
        .padding(20)
        .onClick(() => {
          router.push({
            url: 'pages/tabs/friends/add_group'
          })
          this.controller.close()
        })
    }
    .backgroundColor('#ffffff')
    .borderRadius(10)
    .width(200)
  }
}