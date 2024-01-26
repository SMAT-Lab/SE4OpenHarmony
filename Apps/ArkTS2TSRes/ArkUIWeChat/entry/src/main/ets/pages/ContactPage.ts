interface ContactPage_Params {
    contactList?: Person[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ContactPage_" + ++__generate__Id;
}
import { ContactItemStyle, WeChatTitle } from '../model/CommonStyle';
import { Person } from '../model/Person';
import { getContactInfo, WeChatColor } from '../model/WeChatData';
export class ContactPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.contactList = getContactInfo();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ContactPage_Params) {
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
        Column.alignItems(HorizontalAlign.Start);
        Column.width('100%');
        Column.height('100%');
        let earlierCreatedChild_2: WeChatTitle = (this && this.findChildById) ? this.findChildById("2") as WeChatTitle : undefined;
        if (earlierCreatedChild_2 == undefined) {
            // 标题
            View.create(new WeChatTitle("2", this, { text: "通讯录" }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                text: "通讯录"
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        // 列表
        Scroll.create();
        Column.create();
        let earlierCreatedChild_3: ContactItemStyle = (this && this.findChildById) ? this.findChildById("3") as ContactItemStyle : undefined;
        if (earlierCreatedChild_3 == undefined) {
            // 固定列表
            View.create(new ContactItemStyle("3", this, { imageSrc: "new_friend.png", text: "新的朋友" }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                imageSrc: "new_friend.png", text: "新的朋友"
            });
            if (!earlierCreatedChild_3.needsUpdate()) {
                earlierCreatedChild_3.markStatic();
            }
            View.create(earlierCreatedChild_3);
        }
        let earlierCreatedChild_4: ContactItemStyle = (this && this.findChildById) ? this.findChildById("4") as ContactItemStyle : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new ContactItemStyle("4", this, { imageSrc: "group.png", text: "群聊" }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({
                imageSrc: "group.png", text: "群聊"
            });
            if (!earlierCreatedChild_4.needsUpdate()) {
                earlierCreatedChild_4.markStatic();
            }
            View.create(earlierCreatedChild_4);
        }
        let earlierCreatedChild_5: ContactItemStyle = (this && this.findChildById) ? this.findChildById("5") as ContactItemStyle : undefined;
        if (earlierCreatedChild_5 == undefined) {
            View.create(new ContactItemStyle("5", this, { imageSrc: "biaoqian.png", text: "标签" }));
        }
        else {
            earlierCreatedChild_5.updateWithValueParams({
                imageSrc: "biaoqian.png", text: "标签"
            });
            if (!earlierCreatedChild_5.needsUpdate()) {
                earlierCreatedChild_5.markStatic();
            }
            View.create(earlierCreatedChild_5);
        }
        let earlierCreatedChild_6: ContactItemStyle = (this && this.findChildById) ? this.findChildById("6") as ContactItemStyle : undefined;
        if (earlierCreatedChild_6 == undefined) {
            View.create(new ContactItemStyle("6", this, { imageSrc: "gonzh.png", text: "公众号" }));
        }
        else {
            earlierCreatedChild_6.updateWithValueParams({
                imageSrc: "gonzh.png", text: "公众号"
            });
            if (!earlierCreatedChild_6.needsUpdate()) {
                earlierCreatedChild_6.markStatic();
            }
            View.create(earlierCreatedChild_6);
        }
        // 企业联系人
        Text.create("      我的企业及企业联系人");
        // 企业联系人
        Text.fontSize('12fp');
        // 企业联系人
        Text.backgroundColor(WeChatColor);
        // 企业联系人
        Text.height('80px');
        // 企业联系人
        Text.width('100%');
        // 企业联系人
        Text.pop();
        let earlierCreatedChild_7: ContactItemStyle = (this && this.findChildById) ? this.findChildById("7") as ContactItemStyle : undefined;
        if (earlierCreatedChild_7 == undefined) {
            View.create(new ContactItemStyle("7", this, { imageSrc: "qiye.png", text: "企业微信联系人" }));
        }
        else {
            earlierCreatedChild_7.updateWithValueParams({
                imageSrc: "qiye.png", text: "企业微信联系人"
            });
            if (!earlierCreatedChild_7.needsUpdate()) {
                earlierCreatedChild_7.markStatic();
            }
            View.create(earlierCreatedChild_7);
        }
        // 微信好友
        Text.create("      我的微信好友");
        // 微信好友
        Text.fontSize('12fp');
        // 微信好友
        Text.backgroundColor(WeChatColor);
        // 微信好友
        Text.height('80px');
        // 微信好友
        Text.width('100%');
        // 微信好友
        Text.pop();
        List.create();
        ForEach.create("9", this, ObservedObject.GetRawObject(this.contactList), item => {
            ListItem.create();
            let earlierCreatedChild_8: ContactItemStyle = (this && this.findChildById) ? this.findChildById("8") as ContactItemStyle : undefined;
            if (earlierCreatedChild_8 == undefined) {
                View.create(new ContactItemStyle("8", this, { imageSrc: item.WeChatImage, text: item.WeChatName }));
            }
            else {
                earlierCreatedChild_8.updateWithValueParams({
                    imageSrc: item.WeChatImage, text: item.WeChatName
                });
                if (!earlierCreatedChild_8.needsUpdate()) {
                    earlierCreatedChild_8.markStatic();
                }
                View.create(earlierCreatedChild_8);
            }
            ListItem.pop();
        }, item => item.id.toString());
        ForEach.pop();
        List.pop();
        Column.pop();
        // 列表
        Scroll.pop();
        Column.pop();
    }
}
