interface TitleBar_Params {
    handlerClickButton?: () => void;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TitleBar_" + ++__generate__Id;
}
export class TitleBar extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.handlerClickButton = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TitleBar_Params) {
        if (params.handlerClickButton !== undefined) {
            this.handlerClickButton = params.handlerClickButton;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private handlerClickButton: () => void;
    render() {
        Row.create();
        Row.width('100%');
        Row.height(60);
        Row.padding({ left: 20, top: 10 });
        Row.backgroundColor('#ff2d30cb');
        Row.constraintSize({ minHeight: 50 });
        Image.create($r('app.media.ic_back'));
        Image.width(40);
        Image.height(30);
        Image.onClick(() => {
            this.handlerClickButton();
        });
        Text.create($r('app.string.bluetooth'));
        Text.fontSize(30);
        Text.width(150);
        Text.height(50);
        Text.margin({ left: 15 });
        Text.fontColor('#ffa2a3a4');
        Text.pop();
        Row.pop();
    }
}
