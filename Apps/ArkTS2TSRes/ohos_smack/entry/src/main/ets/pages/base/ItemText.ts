interface ItemText_Params {
    title?: string;
    content?: string;
    clickEvent?: () => void;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ItemText_" + ++__generate__Id;
}
export class ItemText extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.title = '';
        this.content = '';
        this.clickEvent = () => { };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ItemText_Params) {
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.content !== undefined) {
            this.content = params.content;
        }
        if (params.clickEvent !== undefined) {
            this.clickEvent = params.clickEvent;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private title: string;
    private content: string;
    private clickEvent: () => void;
    render() {
        Column.create();
        Column.height(55);
        Column.backgroundColor(Color.White);
        Column.width("100%");
        Column.margin({ top: 1 });
        Column.create();
        Column.padding({ left: 15 });
        Column.height(54);
        Column.width('100%');
        Row.create();
        Text.create(this.title);
        Text.fontSize(15);
        Text.width(this.content == '' ? '85%' : '60%');
        Text.height(50);
        Text.fontColor(Color.Black);
        Text.onClick(v => {
            this.clickEvent();
        });
        Text.pop();
        Text.create(this.content);
        Text.fontSize(15);
        Text.width(this.content == '' ? '0' : '30%');
        Text.padding({ right: 20 });
        Text.height(50);
        Text.textAlign(TextAlign.End);
        Text.alignSelf(ItemAlign.Center);
        Text.fontColor(Color.Black);
        Text.pop();
        Row.pop();
        Line.create();
        Line.width('100%');
        Line.height(1);
        Line.backgroundColor('#ececec');
        Line.margin({ left: 20 });
        Column.pop();
        Column.pop();
    }
}
