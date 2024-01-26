interface MyToggle_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyToggle_" + ++__generate__Id;
}
export class MyToggle extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyToggle_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Column.create({ space: 10 });
        Column.width('100%');
        Column.padding(24);
        Text.create('type: Switch');
        Text.fontSize(12);
        Text.fontColor(0xcccccc);
        Text.width('90%');
        Text.pop();
        Flex.create({ justifyContent: FlexAlign.SpaceEvenly, alignItems: ItemAlign.Center });
        Toggle.create({ type: ToggleType.Switch, isOn: false });
        Toggle.selectedColor(0xed6f21);
        Toggle.switchPointColor(0xe5ffffff);
        Toggle.onChange((isOn: boolean) => {
            console.info('Component status:' + isOn);
        });
        Toggle.pop();
        Toggle.create({ type: ToggleType.Switch, isOn: true });
        Toggle.selectedColor(0x39a2db);
        Toggle.switchPointColor(0xe5ffffff);
        Toggle.onChange((isOn: boolean) => {
            console.info('Component status:' + isOn);
        });
        Toggle.pop();
        Flex.pop();
        Text.create('type: Checkbox');
        Text.fontSize(12);
        Text.fontColor(0xcccccc);
        Text.width('90%');
        Text.pop();
        Flex.create({ justifyContent: FlexAlign.SpaceEvenly, alignItems: ItemAlign.Center });
        Toggle.create({ type: ToggleType.Checkbox, isOn: false });
        Toggle.size({ width: 28, height: 28 });
        Toggle.selectedColor(0xed6f21);
        Toggle.onChange((isOn: boolean) => {
            console.info('Component status:' + isOn);
        });
        Toggle.pop();
        Toggle.create({ type: ToggleType.Checkbox, isOn: true });
        Toggle.size({ width: 28, height: 28 });
        Toggle.selectedColor(0x39a2db);
        Toggle.onChange((isOn: boolean) => {
            console.info('Component status:' + isOn);
        });
        Toggle.pop();
        Flex.pop();
        Text.create('type: Button');
        Text.fontSize(12);
        Text.fontColor(0xcccccc);
        Text.width('90%');
        Text.pop();
        Flex.create({ justifyContent: FlexAlign.SpaceEvenly, alignItems: ItemAlign.Center });
        Toggle.create({ type: ToggleType.Button, isOn: false });
        Toggle.selectedColor(0xed6f21);
        Toggle.onChange((isOn: boolean) => {
            console.info('Component status:' + isOn);
        });
        Text.create('status button');
        Text.padding({ left: 12, right: 12 });
        Text.pop();
        Toggle.pop();
        Toggle.create({ type: ToggleType.Button, isOn: true });
        Toggle.selectedColor(0x39a2db);
        Toggle.onChange((isOn: boolean) => {
            console.info('Component status:' + isOn);
        });
        Text.create('status button');
        Text.padding({ left: 12, right: 12 });
        Text.pop();
        Toggle.pop();
        Flex.pop();
        Column.pop();
    }
}
