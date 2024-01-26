interface MyNavigator_Params {
    active?: boolean;
    Text?: object;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyNavigator_" + ++__generate__Id;
}
export class MyNavigator extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__active = new ObservedPropertySimple(false, this, "active");
        this.__Text = new ObservedPropertyObject({ name: '第二页' }, this, "Text");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyNavigator_Params) {
        if (params.active !== undefined) {
            this.active = params.active;
        }
        if (params.Text !== undefined) {
            this.Text = params.Text;
        }
    }
    aboutToBeDeleted() {
        this.__active.aboutToBeDeleted();
        this.__Text.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __active: ObservedPropertySimple<boolean>;
    get active() {
        return this.__active.get();
    }
    set active(newValue: boolean) {
        this.__active.set(newValue);
    }
    private __Text: ObservedPropertyObject<object>;
    get Text() {
        return this.__Text.get();
    }
    set Text(newValue: object) {
        this.__Text.set(newValue);
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Start, justifyContent: FlexAlign.SpaceBetween });
        Flex.height(150);
        Flex.width(350);
        Flex.padding(35);
        Navigator.create({ target: 'pages/navigatorDetail', type: NavigationType.Push });
        Navigator.params({ text: this.Text });
        Text.create('Go to ' + this.Text['name']);
        Text.width('100%');
        Text.textAlign(TextAlign.Center);
        Text.fontSize(40);
        Text.pop();
        Navigator.pop();
        Flex.pop();
    }
}
