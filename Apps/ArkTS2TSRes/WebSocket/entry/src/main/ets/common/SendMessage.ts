interface SendMessage_Params {
    message?: string;
    sendMessage?: () => void;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SendMessage_" + ++__generate__Id;
}
export default class SendMessage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new SynchedPropertySimpleTwoWay(params.message, this, "message");
        this.sendMessage = () => {
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SendMessage_Params) {
        if (params.sendMessage !== undefined) {
            this.sendMessage = params.sendMessage;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: SynchedPropertySimpleTwoWay<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private sendMessage: () => void;
    render() {
        Row.create();
        Row.height(70);
        Row.width('100%');
        Row.backgroundColor('#f5f5f5');
        TextArea.create({ placeholder: this.message, text: this.message });
        TextArea.height(50);
        TextArea.fontSize(25);
        TextArea.layoutWeight(3);
        TextArea.backgroundColor(Color.White);
        TextArea.margin({ left: 2, right: 2 });
        TextArea.onChange((value: string) => {
            this.message = value;
        });
        Button.createWithChild();
        Button.height(50);
        Button.layoutWeight(1);
        Button.borderRadius(10);
        Button.type(ButtonType.Normal);
        Button.backgroundColor('#ffadf58e');
        Button.margin({ left: 2, right: 2 });
        Button.onClick(() => {
            this.sendMessage();
        });
        Text.create($r('app.string.send_message'));
        Text.fontSize(23);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
    }
}
