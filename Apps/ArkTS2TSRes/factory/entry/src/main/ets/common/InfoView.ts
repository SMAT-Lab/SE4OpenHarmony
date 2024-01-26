interface InfoView_Params {
    infoList?: Array<any>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "InfoView_" + ++__generate__Id;
}
export class InfoView extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.infoList = [];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: InfoView_Params) {
        if (params.infoList !== undefined) {
            this.infoList = params.infoList;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private infoList: Array<any>;
    render() {
        Column.create();
        Column.margin(10);
        Column.border({ width: 1, color: Color.Gray, radius: 15 });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.infoList), (item, index) => {
            Column.create();
            Column.padding(5);
            Text.create(item.key);
            Text.fontColor(Color.Black);
            Text.fontSize(20);
            Text.width('100%');
            Text.pop();
            Text.create(item.value);
            Text.fontColor(Color.Black);
            Text.fontSize(20);
            Text.width('100%');
            Text.margin({ top: 5, bottom: 5 });
            Text.pop();
            If.create();
            if (index < this.infoList.length - 1) {
                If.branchId(0);
                Divider.create();
                Divider.color(Color.Grey);
            }
            If.pop();
            Column.pop();
        }, item => JSON.stringify(item));
        ForEach.pop();
        Column.pop();
    }
}
