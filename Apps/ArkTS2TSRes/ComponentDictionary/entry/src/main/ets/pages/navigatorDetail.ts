interface NavigatorDetail_Params {
    text?: any;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "navigatorDetail_" + ++__generate__Id;
}
import router from '@ohos.router';
export class NavigatorDetail extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__text = new ObservedPropertyObject(router.getParams()['text'], this, "text");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: NavigatorDetail_Params) {
        if (params.text !== undefined) {
            this.text = params.text;
        }
    }
    aboutToBeDeleted() {
        this.__text.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __text: ObservedPropertyObject<any>;
    get text() {
        return this.__text.get();
    }
    set text(newValue: any) {
        this.__text.set(newValue);
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Start, justifyContent: FlexAlign.SpaceBetween });
        Flex.width('100%');
        Flex.height(200);
        Flex.padding({ left: 35, right: 35, top: 35 });
        Navigator.create({ target: 'pages/navigatorBack', type: NavigationType.Push });
        Text.create('Go to 第三页');
        Text.width('100%');
        Text.height(60);
        Text.fontSize(40);
        Text.pop();
        Navigator.pop();
        Text.create('This is ' + this.text['name']);
        Text.width('100%');
        Text.textAlign(TextAlign.Center);
        Text.fontSize(40);
        Text.fontColor('#fd9b3d');
        Text.pop();
        Flex.pop();
    }
}
loadDocument(new NavigatorDetail("1", undefined, {}));
