interface JustifyContentFlex_Params {
    justifyContent?: number;
}
interface MyFlex_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyFlex_" + ++__generate__Id;
}
export class MyFlex extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyFlex_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        //------FlexDirection
        Column.create();
        Column.create();
        Column.width('100%');
        Column.create({ space: 5 });
        Column.width('100%');
        Column.margin({ top: 5 });
        Text.create('direction:Row');
        Text.fontSize(9);
        Text.fontColor(0xCCCCCC);
        Text.width('90%');
        Text.pop();
        Flex.create({ direction: FlexDirection.Row });
        Flex.height(70);
        Flex.width('90%');
        Flex.padding(10);
        Flex.backgroundColor(0xAFEEEE);
        Text.create('1');
        Text.width('20%');
        Text.height(50);
        Text.backgroundColor(0xF5DEB3);
        Text.pop();
        Text.create('2');
        Text.width('20%');
        Text.height(50);
        Text.backgroundColor(0xD2B48C);
        Text.pop();
        Text.create('3');
        Text.width('20%');
        Text.height(50);
        Text.backgroundColor(0xF5DEB3);
        Text.pop();
        Text.create('4');
        Text.width('20%');
        Text.height(50);
        Text.backgroundColor(0xD2B48C);
        Text.pop();
        Flex.pop();
        Text.create('direction:RowReverse');
        Text.fontSize(9);
        Text.fontColor(0xCCCCCC);
        Text.width('90%');
        Text.pop();
        Flex.create({ direction: FlexDirection.RowReverse });
        Flex.height(70);
        Flex.width('90%');
        Flex.padding(10);
        Flex.backgroundColor(0xAFEEEE);
        Text.create('1');
        Text.width('20%');
        Text.height(50);
        Text.backgroundColor(0xF5DEB3);
        Text.pop();
        Text.create('2');
        Text.width('20%');
        Text.height(50);
        Text.backgroundColor(0xD2B48C);
        Text.pop();
        Text.create('3');
        Text.width('20%');
        Text.height(50);
        Text.backgroundColor(0xF5DEB3);
        Text.pop();
        Text.create('4');
        Text.width('20%');
        Text.height(50);
        Text.backgroundColor(0xD2B48C);
        Text.pop();
        Flex.pop();
        Text.create('direction:Column');
        Text.fontSize(9);
        Text.fontColor(0xCCCCCC);
        Text.width('90%');
        Text.pop();
        Flex.create({ direction: FlexDirection.Column });
        Flex.height(160);
        Flex.width('90%');
        Flex.padding(10);
        Flex.backgroundColor(0xAFEEEE);
        Text.create('1');
        Text.width('100%');
        Text.height(40);
        Text.backgroundColor(0xF5DEB3);
        Text.pop();
        Text.create('2');
        Text.width('100%');
        Text.height(40);
        Text.backgroundColor(0xD2B48C);
        Text.pop();
        Text.create('3');
        Text.width('100%');
        Text.height(40);
        Text.backgroundColor(0xF5DEB3);
        Text.pop();
        Text.create('4');
        Text.width('100%');
        Text.height(40);
        Text.backgroundColor(0xD2B48C);
        Text.pop();
        Flex.pop();
        Text.create('direction:ColumnReverse');
        Text.fontSize(9);
        Text.fontColor(0xCCCCCC);
        Text.width('90%');
        Text.pop();
        Flex.create({ direction: FlexDirection.ColumnReverse });
        Flex.height(160);
        Flex.width('90%');
        Flex.padding(10);
        Flex.backgroundColor(0xAFEEEE);
        Text.create('1');
        Text.width('100%');
        Text.height(40);
        Text.backgroundColor(0xF5DEB3);
        Text.pop();
        Text.create('2');
        Text.width('100%');
        Text.height(40);
        Text.backgroundColor(0xD2B48C);
        Text.pop();
        Text.create('3');
        Text.width('100%');
        Text.height(40);
        Text.backgroundColor(0xF5DEB3);
        Text.pop();
        Text.create('4');
        Text.width('100%');
        Text.height(40);
        Text.backgroundColor(0xD2B48C);
        Text.pop();
        Flex.pop();
        Column.pop();
        Column.pop();
        //------FlexDirection
        Column.pop();
    }
}
class JustifyContentFlex extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__justifyContent = new SynchedPropertySimpleOneWay(params.justifyContent, this, "justifyContent");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: JustifyContentFlex_Params) {
        this.justifyContent = params.justifyContent;
    }
    aboutToBeDeleted() {
        this.__justifyContent.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __justifyContent: SynchedPropertySimpleOneWay<number>;
    get justifyContent() {
        return this.__justifyContent.get();
    }
    set justifyContent(newValue: number) {
        this.__justifyContent.set(newValue);
    }
    render() {
        Flex.create({ justifyContent: this.justifyContent });
        Flex.width('90%');
        Flex.padding(10);
        Flex.backgroundColor(0xAFEEEE);
        Text.create('1');
        Text.width('20%');
        Text.height(50);
        Text.backgroundColor(0xF5DEB3);
        Text.pop();
        Text.create('2');
        Text.width('20%');
        Text.height(50);
        Text.backgroundColor(0xD2B48C);
        Text.pop();
        Text.create('3');
        Text.width('20%');
        Text.height(50);
        Text.backgroundColor(0xF5DEB3);
        Text.pop();
        Flex.pop();
    }
}
loadDocument(new MyFlex("1", undefined, {}));
