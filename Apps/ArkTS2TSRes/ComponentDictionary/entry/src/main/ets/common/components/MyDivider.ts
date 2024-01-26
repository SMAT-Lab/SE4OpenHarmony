interface MyDivider_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyDivider_" + ++__generate__Id;
}
export class MyDivider extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyDivider_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Start, justifyContent: FlexAlign.SpaceBetween });
        Flex.width('100%');
        Flex.height(350);
        Flex.padding({ left: 35, right: 35, top: 35 });
        Text.create('Horizontal divider');
        Text.fontSize(9);
        Text.fontColor(0xCCCCCC);
        Text.pop();
        Row.create();
        Row.width('100%');
        Row.height(40);
        Row.backgroundColor(0xF1F3F5);
        Row.pop();
        Divider.create();
        Row.create();
        Row.width('100%');
        Row.height(40);
        Row.backgroundColor(0xF1F3F5);
        Row.pop();
        // 纵向分割线
        Text.create('Vertical divider');
        // 纵向分割线
        Text.fontSize(9);
        // 纵向分割线
        Text.fontColor(0xCCCCCC);
        // 纵向分割线
        Text.pop();
        Flex.create({ alignItems: ItemAlign.Center, wrap: FlexWrap.Wrap });
        Flex.width(250);
        Text.create('bravery');
        Text.pop();
        Divider.create();
        Divider.vertical(true);
        Divider.margin(20);
        Divider.height(15);
        Text.create('effort');
        Text.pop();
        Divider.create();
        Divider.vertical(true);
        Divider.margin(20);
        Divider.height(15);
        Text.create('upward');
        Text.pop();
        Flex.pop();
        // 设置分割线宽度和端点样式
        Text.create('Custom Styles');
        // 设置分割线宽度和端点样式
        Text.fontSize(9);
        // 设置分割线宽度和端点样式
        Text.fontColor(0xCCCCCC);
        // 设置分割线宽度和端点样式
        Text.pop();
        Row.create();
        Row.width('100%');
        Row.height(40);
        Row.backgroundColor(0xF1F3F5);
        Row.pop();
        Divider.create();
        Divider.vertical(false);
        Divider.strokeWidth(5);
        Divider.color(0x2788D9);
        Divider.lineCap(LineCapStyle.Round);
        Row.create();
        Row.width('100%');
        Row.height(40);
        Row.backgroundColor(0xF1F3F5);
        Row.pop();
        Flex.pop();
    }
}
