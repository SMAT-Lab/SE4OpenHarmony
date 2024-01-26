interface BindServiceIp_Params {
    ipAddress?: string;
    onBind?: () => void;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "BindServiceIp_" + ++__generate__Id;
}
export default class BindServiceIp extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__ipAddress = new SynchedPropertySimpleTwoWay(params.ipAddress, this, "ipAddress");
        this.onBind = () => {
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: BindServiceIp_Params) {
        if (params.onBind !== undefined) {
            this.onBind = params.onBind;
        }
    }
    aboutToBeDeleted() {
        this.__ipAddress.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __ipAddress: SynchedPropertySimpleTwoWay<string>;
    get ipAddress() {
        return this.__ipAddress.get();
    }
    set ipAddress(newValue: string) {
        this.__ipAddress.set(newValue);
    }
    private onBind: () => void;
    render() {
        Column.create();
        Column.width('100%');
        Text.create($r('app.string.welcome'));
        Text.fontSize(25);
        Text.margin({ top: 20 });
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: $r('app.string.ip_placeholder') });
        TextInput.height(50);
        TextInput.fontSize(15);
        TextInput.width('70%');
        TextInput.margin({ top: 20 });
        TextInput.onChange((value: string) => {
            this.ipAddress = `ws://${value}/string`;
        });
        Button.createWithChild();
        Button.margin({ top: 20 });
        Button.width(200);
        Button.height(50);
        Button.type(ButtonType.Capsule);
        Button.onClick(() => {
            this.onBind();
        });
        Text.create($r('app.string.bind_ip'));
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Column.pop();
    }
}
