interface TitleBar_Params {
    title?: Resource;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TitleBar_" + ++__generate__Id;
}
export default class TitleBar extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.title = $r('app.string.EntryAbility_label');
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TitleBar_Params) {
        if (params.title !== undefined) {
            this.title = params.title;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private title: Resource;
    render() {
        Row.create();
        Row.width('100%');
        Row.height('8%');
        Row.constraintSize({ minHeight: 70 });
        Row.padding({ left: 10, right: 10 });
        Row.backgroundColor('#0D9FFB');
        Text.create(this.title);
        Text.fontColor(Color.White);
        Text.fontSize(28);
        Text.pop();
        Row.pop();
    }
}
