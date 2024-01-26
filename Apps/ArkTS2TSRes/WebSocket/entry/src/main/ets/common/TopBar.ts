interface TopBar_Params {
    isConnect?: boolean;
    connect?: () => void;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TopBar_" + ++__generate__Id;
}
export default class TopBar extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__isConnect = new SynchedPropertySimpleTwoWay(params.isConnect, this, "isConnect");
        this.connect = () => {
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TopBar_Params) {
        if (params.connect !== undefined) {
            this.connect = params.connect;
        }
    }
    aboutToBeDeleted() {
        this.__isConnect.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __isConnect: SynchedPropertySimpleTwoWay<boolean>;
    get isConnect() {
        return this.__isConnect.get();
    }
    set isConnect(newValue: boolean) {
        this.__isConnect.set(newValue);
    }
    private connect: () => void;
    render() {
        Row.create();
        Row.height(50);
        Row.width('100%');
        Row.backgroundColor('#e5e5e5');
        Text.create($r('app.string.server'));
        Text.width('20%');
        Text.fontSize(20);
        Text.margin({ left: '40%' });
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.createWithChild();
        Button.width(70);
        Button.height(40);
        Button.margin({ left: '20%' });
        Button.type(ButtonType.Capsule);
        Button.backgroundColor(this.isConnect ? Color.Green : Color.Grey);
        Button.onClick(() => {
            this.connect();
        });
        Text.create($r('app.string.connect'));
        Text.margin(10);
        Text.fontSize(15);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
    }
}
