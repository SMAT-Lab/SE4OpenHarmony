interface toDoItem_Params {
    content?: string;
    isComplete?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ToDoItem_" + ++__generate__Id;
}
export default class toDoItem extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.content = undefined;
        this.__isComplete = new ObservedPropertySimple(false, this, "isComplete");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: toDoItem_Params) {
        if (params.content !== undefined) {
            this.content = params.content;
        }
        if (params.isComplete !== undefined) {
            this.isComplete = params.isComplete;
        }
    }
    aboutToBeDeleted() {
        this.__isComplete.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private content: string;
    private __isComplete: ObservedPropertySimple<boolean>;
    get isComplete() {
        return this.__isComplete.get();
    }
    set isComplete(newValue: boolean) {
        this.__isComplete.set(newValue);
    }
    render() {
        Column.create();
        Row.create({ space: 20 });
        Row.width('100%');
        Row.height('8%');
        Row.backgroundColor(0xffffff);
        Row.borderRadius(24);
        Row.onClick(() => {
            this.isComplete = !this.isComplete;
            // console.log('1234567');
        });
        If.create();
        if (this.isComplete) {
            If.branchId(0);
            Image.create($r('app.media.ic_ok'));
            Image.height(30);
            Image.margin({ left: 20 });
        }
        else {
            If.branchId(1);
            Image.create($r('app.media.ic_default'));
            Image.height(30);
            Image.margin({ left: 20 });
        }
        If.pop();
        Text.create(this.content);
        Text.fontSize(20);
        Text.opacity(this.isComplete ? 0.6 : 1);
        Text.decoration({ type: this.isComplete ? TextDecorationType.LineThrough : TextDecorationType.None });
        Text.pop();
        Row.pop();
        Column.pop();
    }
}
