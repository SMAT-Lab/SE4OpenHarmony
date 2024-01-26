interface navigatorBack_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "navigatorBack_" + ++__generate__Id;
}
export class navigatorBack extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: navigatorBack_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height(200);
        Column.padding({ left: 35, right: 35, top: 35 });
        Navigator.create({ target: 'pages/navigatorDetail', type: NavigationType.Back });
        Text.create('Return to 第二页');
        Text.width('100%');
        Text.textAlign(TextAlign.Center);
        Text.fontSize(40);
        Text.pop();
        Navigator.pop();
        Column.pop();
    }
}
loadDocument(new navigatorBack("1", undefined, {}));
