interface Index_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Column.create();
        Row.create();
        Row.height(60);
        Row.width('100%');
        Row.padding({ left: 20 });
        Row.backgroundColor($r('app.color.title_bg'));
        Text.create($r('app.string.index_title'));
        Text.fontSize(18);
        Text.fontColor(Color.White);
        Text.pop();
        Row.pop();
        Column.create({ space: 20 });
        Column.alignItems(HorizontalAlign.Start);
        Column.padding(20);
        Text.create($r('app.string.title'));
        Text.fontSize(20);
        Text.pop();
        Text.create($r('app.string.content1'));
        Text.fontSize(20);
        Text.pop();
        Text.create($r('app.string.content2'));
        Text.fontSize(20);
        Text.pop();
        Column.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
