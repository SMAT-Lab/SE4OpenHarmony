interface ChatPage_Params {
    contactList?: Person[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ChatPage_" + ++__generate__Id;
}
import { ChatItemStyle, WeChatTitle } from '../model/CommonStyle';
import { getContactInfo } from '../model/WeChatData';
import { Person } from '../model/Person';
export class ChatPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.contactList = getContactInfo();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ChatPage_Params) {
        if (params.contactList !== undefined) {
            this.contactList = params.contactList;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private contactList: Person[];
    render() {
        Column.create();
        let earlierCreatedChild_2: WeChatTitle = (this && this.findChildById) ? this.findChildById("2") as WeChatTitle : undefined;
        if (earlierCreatedChild_2 == undefined) {
            // 标题
            View.create(new WeChatTitle("2", this, { text: "微信" }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                text: "微信"
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        // 列表
        List.create();
        // 列表
        List.height('100%');
        // 列表
        List.width('100%');
        ForEach.create("4", this, ObservedObject.GetRawObject(this.contactList), item => {
            ListItem.create();
            let earlierCreatedChild_3: ChatItemStyle = (this && this.findChildById) ? this.findChildById("3") as ChatItemStyle : undefined;
            if (earlierCreatedChild_3 == undefined) {
                View.create(new ChatItemStyle("3", this, {
                    WeChatImage: item.WeChatImage,
                    WeChatName: item.WeChatName,
                    ChatInfo: item.ChatInfo,
                    time: item.time
                }));
            }
            else {
                earlierCreatedChild_3.updateWithValueParams({
                    WeChatImage: item.WeChatImage,
                    WeChatName: item.WeChatName,
                    ChatInfo: item.ChatInfo,
                    time: item.time
                });
                if (!earlierCreatedChild_3.needsUpdate()) {
                    earlierCreatedChild_3.markStatic();
                }
                View.create(earlierCreatedChild_3);
            }
            ListItem.pop();
        }, item => item.id.toString());
        ForEach.pop();
        // 列表
        List.pop();
        Column.pop();
    }
}
