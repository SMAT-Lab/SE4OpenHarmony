interface MyDivider_Params {
    style?: string;
}
interface ChatItemStyle_Params {
    WeChatImage?: string;
    WeChatName?: string;
    ChatInfo?: string;
    time?: string;
}
interface ContactItemStyle_Params {
    imageSrc?: string;
    text?: string;
}
interface WeChatTitle_Params {
    text?: string;
}
interface WeChatItemStyle_Params {
    imageSrc?: string;
    text?: string;
    arrow?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CommonStyle_" + ++__generate__Id;
}
import { WeChatColor } from './WeChatData';
import router from '@system.router';
export class WeChatItemStyle extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.imageSrc = undefined;
        this.text = undefined;
        this.arrow = "arrow.png";
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: WeChatItemStyle_Params) {
        if (params.imageSrc !== undefined) {
            this.imageSrc = params.imageSrc;
        }
        if (params.text !== undefined) {
            this.text = params.text;
        }
        if (params.arrow !== undefined) {
            this.arrow = params.arrow;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private imageSrc: string;
    private text: string;
    private arrow: string;
    render() {
        Column.create();
        Column.onClick(() => {
            if (this.text === "视频号") {
                router.push({ uri: 'pages/VideoPage' });
            }
        });
        Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.height('150px');
        Flex.width('100%');
        Image.create($rawfile(this.imageSrc));
        Image.width('75px');
        Image.height('75px');
        Image.margin({ left: '50px' });
        Text.create(this.text);
        Text.fontSize('15vp');
        Text.margin({ left: '40px' });
        Text.flexGrow(1);
        Text.pop();
        Image.create($rawfile(this.arrow));
        Image.margin({ right: '40px' });
        Image.width('75px');
        Image.height('75px');
        Flex.pop();
        Column.pop();
    }
}
export class WeChatTitle extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.text = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: WeChatTitle_Params) {
        if (params.text !== undefined) {
            this.text = params.text;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private text: string;
    render() {
        Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.height('120px');
        Flex.backgroundColor(WeChatColor);
        Text.create(this.text);
        Text.fontSize('18fp');
        Text.padding('20px');
        Text.pop();
        Flex.pop();
    }
}
export class ContactItemStyle extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.imageSrc = undefined;
        this.text = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ContactItemStyle_Params) {
        if (params.imageSrc !== undefined) {
            this.imageSrc = params.imageSrc;
        }
        if (params.text !== undefined) {
            this.text = params.text;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private imageSrc: string;
    private text: string;
    render() {
        Column.create();
        Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.height('150px');
        Flex.width('100%');
        Image.create($rawfile(this.imageSrc));
        Image.width('100px');
        Image.height('100px');
        Image.margin({ left: '50px' });
        Text.create(this.text);
        Text.fontSize('15vp');
        Text.margin({ left: '40px' });
        Text.flexGrow(1);
        Text.pop();
        Flex.pop();
        Row.create();
        Row.height('3px');
        Row.width('100%');
        Text.create();
        Text.width('190px');
        Text.height('3px');
        Text.pop();
        Divider.create();
        Divider.vertical(false);
        Divider.color(WeChatColor);
        Divider.strokeWidth('3px');
        Row.pop();
        Column.pop();
    }
}
export class ChatItemStyle extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.WeChatImage = undefined;
        this.WeChatName = undefined;
        this.ChatInfo = undefined;
        this.time = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ChatItemStyle_Params) {
        if (params.WeChatImage !== undefined) {
            this.WeChatImage = params.WeChatImage;
        }
        if (params.WeChatName !== undefined) {
            this.WeChatName = params.WeChatName;
        }
        if (params.ChatInfo !== undefined) {
            this.ChatInfo = params.ChatInfo;
        }
        if (params.time !== undefined) {
            this.time = params.time;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private WeChatImage: string;
    private WeChatName: string;
    private ChatInfo: string;
    private time: string;
    render() {
        Column.create();
        Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.Start });
        Flex.height('180px');
        Flex.width('100%');
        Image.create($rawfile(this.WeChatImage));
        Image.width('120px');
        Image.height('120px');
        Image.margin({ left: '50px', right: "50px" });
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Column.flexGrow(1);
        Text.create(this.WeChatName);
        Text.fontSize('16fp');
        Text.pop();
        Text.create(this.ChatInfo);
        Text.fontSize('12fp');
        Text.width('620px');
        Text.fontColor("#c2bec2");
        Text.maxLines(1);
        Text.pop();
        Column.pop();
        Text.create(this.time);
        Text.fontSize('12fp');
        Text.margin({ right: "50px" });
        Text.fontColor("#c2bec2");
        Text.pop();
        Flex.pop();
        Row.create();
        Row.height('3px');
        Row.width('100%');
        Text.create();
        Text.width('190px');
        Text.height('3px');
        Text.pop();
        Divider.create();
        Divider.vertical(false);
        Divider.color(WeChatColor);
        Divider.strokeWidth('3px');
        Row.pop();
        Column.pop();
    }
}
export class MyDivider extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.style = "";
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyDivider_Params) {
        if (params.style !== undefined) {
            this.style = params.style;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private style: string;
    render() {
        Row.create();
        Row.height(this.style == "1" ? '3px' : '23px');
        Row.width('100%');
        Divider.create();
        Divider.vertical(false);
        Divider.color(WeChatColor);
        Divider.strokeWidth(this.style == "1" ? '3px' : '23px');
        Row.pop();
    }
}
