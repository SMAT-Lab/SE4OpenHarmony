interface DevicesDialog_Params {
    devices?: Array<deviceManager.DeviceInfo>;
    controller?: CustomDialogController;
    action?: (device: deviceManager.DeviceInfo) => void;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "devicesDialog_" + ++__generate__Id;
}
import deviceManager from '@ohos.distributedHardware.deviceManager';
export class DevicesDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.devices = undefined;
        this.controller = undefined;
        this.action = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: DevicesDialog_Params) {
        if (params.devices !== undefined) {
            this.devices = params.devices;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.action !== undefined) {
            this.action = params.action;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private devices: Array<deviceManager.DeviceInfo>;
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private action: (device: deviceManager.DeviceInfo) => void;
    render() {
        Scroll.create();
        Scroll.scrollBar(BarState.Off);
        Column.create();
        ForEach.create("2", this, ObservedObject.GetRawObject(this.devices), (item, index) => {
            Text.create(item.deviceName);
            Text.margin({ top: index == 0 ? 10 : 5, bottom: 5 });
            Text.fontSize(30);
            Text.onClick(() => {
                this.action(item);
                //              this.controller.close()
            });
            Text.pop();
        });
        ForEach.pop();
        Button.createWithLabel("关闭");
        Button.fontSize(30);
        Button.onClick(() => {
            this.controller.close();
        });
        Button.margin({ top: 5, bottom: 10 });
        Button.pop();
        Column.pop();
        Scroll.pop();
    }
}
