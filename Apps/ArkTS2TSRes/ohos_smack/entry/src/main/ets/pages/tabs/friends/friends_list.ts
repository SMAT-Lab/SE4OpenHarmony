interface MenuDialog_Params {
    controller?: CustomDialogController;
}
interface Friends_list_Params {
    myFriendList?: Array<FriendsEntity>;
    menuDialog?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "friends_list_" + ++__generate__Id;
}
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
import { Toolbar } from '../../base/toolbar';
import router from '@ohos.router';
import prompt from '@ohos.prompt';
import { FriendsEntity, UserEntity, Smack } from "@ohos/smack";
import { GlobalContext } from '../../../entity/GlobalContext';
export class Friends_list extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__myFriendList = new ObservedPropertyObject([], this, "myFriendList");
        this.menuDialog = new CustomDialogController({
            builder: () => {
                let jsDialog = new MenuDialog("5", this, {});
                jsDialog.setController(this.menuDialog);
                View.create(jsDialog);
            },
            customStyle: true,
            alignment: DialogAlignment.TopEnd,
            offset: { dx: -20, dy: 50 }
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Friends_list_Params) {
        if (params.myFriendList !== undefined) {
            this.myFriendList = params.myFriendList;
        }
        if (params.menuDialog !== undefined) {
            this.menuDialog = params.menuDialog;
        }
    }
    aboutToBeDeleted() {
        this.__myFriendList.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __myFriendList: ObservedPropertyObject<Array<FriendsEntity>>;
    get myFriendList() {
        return this.__myFriendList.get();
    }
    set myFriendList(newValue: Array<FriendsEntity>) {
        this.__myFriendList.set(newValue);
    }
    private menuDialog: CustomDialogController;
    aboutToAppear() {
        this.getMyAllFriends();
    }
    onPageShow() {
        this.getMyAllFriends();
    }
    render() {
        Column.create();
        let earlierCreatedChild_2: Toolbar = (this && this.findChildById) ? this.findChildById("2") as Toolbar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            // 标题栏
            View.create(new Toolbar("2", this, { title: '好友', rightIcon: $r("app.media.add"), rightClickCallBack: () => {
                    this.menuDialog.open();
                } }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                title: '好友', rightIcon: $r("app.media.add"), rightClickCallBack: () => {
                    this.menuDialog.open();
                }
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
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
        Stack.create({ alignContent: Alignment.BottomEnd });
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
        Stack.width('100%');
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
        Stack.height('100%');
        List.create();
        List.height('100%');
        List.width('100%');
        ForEach.create("4", this, ObservedObject.GetRawObject(this.myFriendList), (item: FriendsEntity) => {
            ListItem.create();
            Column.create();
            Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center });
            Flex.backgroundColor('#fff1f1f1');
            Text.create(item.groupName + '（' + item.names.length + '）');
            Text.fontSize(15);
            Text.width('100%');
            Text.padding(20);
            Text.pop();
            Column.create();
            Column.padding(5);
            Column.margin({ right: 20 });
            Column.onClick(e => {
                router.push({
                    url: "pages/tabs/friends/change_group_name",
                    params: {
                        name: item.groupName
                    }
                });
            });
            Image.create($r('app.media.change'));
            Image.width(20);
            Image.height(20);
            Column.pop();
            Flex.pop();
            ForEach.create("3", this, ObservedObject.GetRawObject(item.names), (item2: UserEntity) => {
                Text.create(item2.userName);
                Text.fontSize(13);
                Text.width('100%');
                Text.margin({ left: 50 });
                Text.padding(20);
                Text.onClick(e => {
                    router.push({
                        url: 'pages/chat/one_chat/one_chat_main',
                        params: { userName: item2.userName }
                    });
                });
                Text.pop();
                Text.create('');
                Text.height(1);
                Text.width('100%');
                Text.backgroundColor('#ececec');
                Text.pop();
            }, (item2: UserEntity) => JSON.stringify(item2));
            ForEach.pop();
            Column.pop();
            ListItem.pop();
        }, (item: FriendsEntity) => JSON.stringify(item));
        ForEach.pop();
        List.pop();
        Image.create($r("app.media.refresh"));
        Image.width(60);
        Image.height(60);
        Image.backgroundColor('#ff56ae97');
        Image.padding(5);
        Image.borderRadius(30);
        Image.objectFit(ImageFit.Cover);
        Image.margin({ bottom: 190, right: 110 });
        Image.onClick(v => {
            this.getMyAllFriends();
        });
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
        Stack.pop();
        Column.pop();
    }
    // todo 获取所有好友及其分组信息
    getMyAllFriends() {
        setTimeout(() => {
            let res: Array<FriendsEntity> = Smack.getFriendList();
            this.myFriendList = res;
            let groups: string[] = [];
            for (let i = 0; i < this.myFriendList.length; i++) {
                groups.push(this.myFriendList[i].groupName);
            }
            GlobalContext.getContext().setValue('groupList', JSON.stringify(groups));
            prompt.showToast({
                message: '刷新完成'
            });
        }, 300);
    }
}
class MenuDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = {} as CustomDialogController;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MenuDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    render() {
        Column.create();
        Column.backgroundColor('#ffffff');
        Column.borderRadius(10);
        Column.width(200);
        Text.create('添加好友');
        Text.fontSize(20);
        Text.padding(20);
        Text.onClick(() => {
            router.push({
                url: 'pages/tabs/friends/add_friends'
            });
            this.controller.close();
        });
        Text.pop();
        Text.create('');
        Text.height(1);
        Text.width('100%');
        Text.backgroundColor('#ececec');
        Text.pop();
        Text.create('创建分组');
        Text.fontSize(30);
        Text.padding(20);
        Text.onClick(() => {
            router.push({
                url: 'pages/tabs/friends/add_group'
            });
            this.controller.close();
        });
        Text.pop();
        Column.pop();
    }
}
loadDocument(new Friends_list("1", undefined, {}));
