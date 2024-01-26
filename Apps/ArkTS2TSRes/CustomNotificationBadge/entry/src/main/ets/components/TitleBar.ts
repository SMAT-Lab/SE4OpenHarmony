interface TitleBar_Params {
    title?: string | Resource | undefined;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TitleBar_" + ++__generate__Id;
}
export class TitleBar extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.title = undefined;
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
    private title: string | Resource | undefined;
    render() {
        Row.create();
        Row.width('100%');
        Row.height(70);
        Row.backgroundColor($r('app.color.title_bar_background'));
        Text.create(this.title);
        Text.fontSize(24);
        Text.fontWeight(700);
        Text.lineHeight(32);
        Text.margin({ left: 24 });
        Text.fontColor('#182431');
        Text.pop();
        Row.pop();
    }
}
