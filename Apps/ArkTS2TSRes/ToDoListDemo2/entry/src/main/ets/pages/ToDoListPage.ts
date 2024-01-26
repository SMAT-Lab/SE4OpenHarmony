interface ToDoListPage_Params {
    contentList?: Array<string>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ToDoListPage_" + ++__generate__Id;
}
import CommonConstant from '../common/constant/CommonConstant';
import toDoItem from '../view/ToDoItem';
import DateModel from '../viewmodel/DateModel';
class ToDoListPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.contentList = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ToDoListPage_Params) {
        if (params.contentList !== undefined) {
            this.contentList = params.contentList;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private contentList: Array<string>;
    aboutToAppear() {
        this.contentList = DateModel.getData();
    }
    render() {
        Column.create({ space: 20 });
        Column.height(CommonConstant.FULL_LENGTH);
        Column.width('100%');
        Column.backgroundColor(0xefefef);
        Column.justifyContent(FlexAlign.Start);
        Column.alignItems(HorizontalAlign.Start);
        Text.create('待办');
        Text.fontSize(28);
        Text.fontWeight(FontWeight.Bold);
        Text.margin(20);
        Text.pop();
        ForEach.create("3", this, ObservedObject.GetRawObject(this.contentList), (item) => {
            let earlierCreatedChild_2: toDoItem = (this && this.findChildById) ? this.findChildById("2") as toDoItem : undefined;
            if (earlierCreatedChild_2 == undefined) {
                View.create(new toDoItem("2", this, { content: item }));
            }
            else {
                earlierCreatedChild_2.updateWithValueParams({
                    content: item
                });
                View.create(earlierCreatedChild_2);
            }
        });
        ForEach.pop();
        Column.pop();
    }
}
loadDocument(new ToDoListPage("1", undefined, {}));
