interface MyButton_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyButton_" + ++__generate__Id;
}
export class MyButton extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyButton_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Start, justifyContent: FlexAlign.SpaceBetween });
        Flex.height(400);
        Flex.padding({ left: 35, right: 35, top: 35 });
        Text.create('Normal button');
        Text.fontSize(9);
        Text.fontColor(0xCCCCCC);
        Text.pop();
        Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.SpaceBetween });
        Button.createWithLabel('OK', { type: ButtonType.Normal, stateEffect: true });
        Button.borderRadius(8);
        Button.backgroundColor(0x317aff);
        Button.width(90);
        Button.pop();
        Button.createWithChild({ type: ButtonType.Normal, stateEffect: true });
        Button.borderRadius(8);
        Button.backgroundColor(0x317aff);
        Button.width(90);
        Button.height(40);
        Row.create();
        Row.alignItems(VerticalAlign.Center);
        LoadingProgress.create();
        LoadingProgress.width(20);
        LoadingProgress.height(20);
        LoadingProgress.margin({ left: 12 });
        LoadingProgress.color(0xFFFFFF);
        Text.create('loading');
        Text.fontSize(12);
        Text.fontColor(0xffffff);
        Text.margin({ left: 5, right: 12 });
        Text.pop();
        Row.pop();
        Button.pop();
        Button.createWithLabel('Disable', { type: ButtonType.Normal, stateEffect: false });
        Button.opacity(0.4);
        Button.borderRadius(8);
        Button.backgroundColor(0x317aff);
        Button.width(90);
        Button.pop();
        Flex.pop();
        Text.create('Capsule button');
        Text.fontSize(9);
        Text.fontColor(0xCCCCCC);
        Text.pop();
        Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.SpaceBetween });
        Button.createWithLabel('OK', { type: ButtonType.Capsule, stateEffect: true });
        Button.backgroundColor(0x317aff);
        Button.width(90);
        Button.pop();
        Button.createWithChild({ type: ButtonType.Capsule, stateEffect: true });
        Button.backgroundColor(0x317aff);
        Row.create();
        Row.alignItems(VerticalAlign.Center);
        Row.width(90);
        Row.height(40);
        LoadingProgress.create();
        LoadingProgress.width(20);
        LoadingProgress.height(20);
        LoadingProgress.margin({ left: 12 });
        LoadingProgress.color(0xFFFFFF);
        Text.create('loading');
        Text.fontSize(12);
        Text.fontColor(0xffffff);
        Text.margin({ left: 5, right: 12 });
        Text.pop();
        Row.pop();
        Button.pop();
        Button.createWithLabel('Disable', { type: ButtonType.Capsule, stateEffect: false });
        Button.opacity(0.4);
        Button.backgroundColor(0x317aff);
        Button.width(90);
        Button.pop();
        Flex.pop();
        Text.create('Circle button');
        Text.fontSize(9);
        Text.fontColor(0xCCCCCC);
        Text.pop();
        Flex.create({ alignItems: ItemAlign.Center, wrap: FlexWrap.Wrap });
        Button.createWithChild({ type: ButtonType.Circle, stateEffect: true });
        Button.width(55);
        Button.height(55);
        Button.backgroundColor(0x317aff);
        LoadingProgress.create();
        LoadingProgress.width(20);
        LoadingProgress.height(20);
        LoadingProgress.color(0xFFFFFF);
        Button.pop();
        Button.createWithChild({ type: ButtonType.Circle, stateEffect: true });
        Button.width(55);
        Button.height(55);
        Button.margin({ left: 20 });
        Button.backgroundColor(0xF55A42);
        LoadingProgress.create();
        LoadingProgress.width(20);
        LoadingProgress.height(20);
        LoadingProgress.color(0xFFFFFF);
        Button.pop();
        Flex.pop();
        Flex.pop();
    }
}
