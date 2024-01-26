interface ChatsPage_Params {
    chats?: WebSocketSource;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ChatsPage_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import ChatData from '../model/ChatData';
import { WebSocketSource } from "../model/DataSource";
export default class ChatsPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__chats = new SynchedPropertyObjectTwoWay(params.chats, this, "chats");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ChatsPage_Params) {
    }
    aboutToBeDeleted() {
        this.__chats.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __chats: SynchedPropertySimpleOneWay<WebSocketSource>;
    get chats() {
        return this.__chats.get();
    }
    set chats(newValue: WebSocketSource) {
        this.__chats.set(newValue);
    }
    ChatsMessage(name: Resource, message: string, direction: Direction, parent = null) {
        Row.create();
        Row.width('100%');
        Row.direction(direction);
        Row.margin({ top: 5, bottom: 10 });
        Text.create(name);
        Text.width(40);
        Text.height(40);
        Text.padding(5);
        Text.fontSize(30);
        Text.borderRadius(10);
        Text.margin({ right: 10 });
        Text.backgroundColor('#e5e5e5');
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Text.create(message);
        Text.textOverflow({ overflow: TextOverflow.Clip });
        Text.padding(10);
        Text.maxLines(5);
        Text.fontSize(20);
        Text.borderRadius(10);
        Text.margin({ top: 20 });
        Text.alignSelf(ItemAlign.Start);
        Text.backgroundColor('#ff78dd4d');
        Text.pop();
        Row.pop();
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.layoutWeight(1);
        Column.backgroundColor(Color.White);
        List.create();
        List.width('100%');
        List.height('100%');
        LazyForEach.create("2", this, ObservedObject.GetRawObject(this.chats), (item: ChatData) => {
            this.isRenderingInProgress = true;
            ListItem.create();
            ListItem.padding(10);
            ListItem.width('100%');
            If.create();
            if (item.isServer as boolean) {
                If.branchId(0);
                this.ChatsMessage($r('app.string.server'), item.message, Direction.Ltr, this);
            }
            else {
                If.branchId(1);
                this.ChatsMessage($r('app.string.me'), item.message, Direction.Rtl, this);
            }
            If.pop();
            ListItem.pop();
            this.isRenderingInProgress = false;
        }, (item: ChatData, index?: number) => item.message + index);
        LazyForEach.pop();
        List.pop();
        Column.pop();
    }
}
