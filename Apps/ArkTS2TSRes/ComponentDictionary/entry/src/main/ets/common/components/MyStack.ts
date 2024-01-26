interface MyStack_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyStack_" + ++__generate__Id;
}
export class MyStack extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyStack_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Stack.create({ alignContent: Alignment.Bottom });
        Stack.width('100%');
        Stack.height(150);
        Stack.margin({ top: 5 });
        Text.create('First child, show in bottom');
        Text.width('90%');
        Text.height('100%');
        Text.backgroundColor(0xd2cab3);
        Text.align(Alignment.Top);
        Text.pop();
        Text.create('Second child, show in top');
        Text.width('70%');
        Text.height('60%');
        Text.backgroundColor(0xc1cbac);
        Text.align(Alignment.Top);
        Text.pop();
        Stack.pop();
    }
}
