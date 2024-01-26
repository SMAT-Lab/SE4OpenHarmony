interface Switches_Params {
    isOn?: string;
    title?: string | Resource;
    isEnable?: boolean;
    onToggleChange?: (isOn: string) => void;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Switches_" + ++__generate__Id;
}
export class Switches extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.isOn = '';
        this.title = "";
        this.isEnable = true;
        this.onToggleChange = (isOn: string) => { };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Switches_Params) {
        if (params.isOn !== undefined) {
            this.isOn = params.isOn;
        }
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.isEnable !== undefined) {
            this.isEnable = params.isEnable;
        }
        if (params.onToggleChange !== undefined) {
            this.onToggleChange = params.onToggleChange;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private isOn: string;
    private title: string | Resource;
    private isEnable: boolean;
    private onToggleChange: (isOn: string) => void;
    render() {
        Column.create();
        Column.height(55);
        Column.backgroundColor(Color.White);
        Column.width("100%");
        Column.margin({ top: 1 });
        Row.create();
        Row.padding({ left: 15 });
        Row.height(54);
        Row.width('100%');
        Column.create();
        Column.padding({ top: px2vp(5), bottom: px2vp(5) });
        Column.alignItems(HorizontalAlign.Start);
        Column.layoutWeight(1);
        Text.create(this.title);
        Text.fontColor(Color.Black);
        Text.width('100%');
        Text.fontSize(18);
        Text.opacity(0.9);
        Text.pop();
        Column.pop();
        Toggle.create({ type: ToggleType.Switch, isOn: this.isOn == "1" });
        Toggle.selectedColor('#1d85f6');
        Toggle.align(Alignment.Center);
        Toggle.switchPointColor('#F1F3F5');
        Toggle.size({ width: px2vp(36), height: px2vp(20) });
        Toggle.onChange((isOn: boolean) => {
            if (this.isEnable) {
                this.isOn = (isOn ? "1" : "0");
                this.onToggleChange(this.isOn);
            }
        });
        Toggle.margin({ right: 40 });
        Toggle.pop();
        Row.pop();
        Column.pop();
    }
}
