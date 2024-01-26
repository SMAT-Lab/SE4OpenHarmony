interface TitleMore_Params {
    title?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CategoryHolderInflater_" + ++__generate__Id;
}
export class TitleMore extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.title = '';
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TitleMore_Params) {
        if (params.title !== undefined) {
            this.title = params.title;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private title: string;
    render() {
        Row.create();
        Row.width('100%');
        Button.createWithChild({ type: ButtonType.Normal, stateEffect: true });
        Button.backgroundColor(0xffffff);
        Button.margin({ left: 15 });
        Row.create();
        Row.alignItems(VerticalAlign.Center);
        Image.create($r('app.media.icon'));
        Image.width(14);
        Image.height(14);
        Image.margin({ right: 10 });
        Text.create(this.title);
        Text.fontSize(18);
        Text.pop();
        Row.pop();
        Button.pop();
        Blank.create();
        Blank.pop();
        Button.createWithChild({ type: ButtonType.Normal, stateEffect: true });
        Button.backgroundColor(0xffffff);
        Button.margin({ right: 15 });
        Row.create();
        Row.alignItems(VerticalAlign.Center);
        Text.create('更多');
        Text.fontSize(18);
        Text.fontColor(0x8a8a8a);
        Text.margin({ right: 5 });
        Text.pop();
        Image.create($r('app.media.icon_right'));
        Image.width(14);
        Image.height(14);
        Row.pop();
        Button.pop();
        Row.pop();
    }
}
