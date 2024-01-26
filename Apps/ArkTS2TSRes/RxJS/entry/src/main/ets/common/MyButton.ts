interface MyButton_Params {
    content?: string;
    onClickListener?: () => void;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyButton_" + ++__generate__Id;
}
export class MyButton extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__content = new ObservedPropertySimple('', this, "content");
        this.onClickListener = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyButton_Params) {
        if (params.content !== undefined) {
            this.content = params.content;
        }
        if (params.onClickListener !== undefined) {
            this.onClickListener = params.onClickListener;
        }
    }
    aboutToBeDeleted() {
        this.__content.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __content: ObservedPropertySimple<string>;
    get content() {
        return this.__content.get();
    }
    set content(newValue: string) {
        this.__content.set(newValue);
    }
    private onClickListener?: () => void;
    render() {
        Button.createWithChild({ type: ButtonType.Normal });
        Button.borderRadius(5);
        Button.margin({ top: 25, left: 20, right: 20 });
        Button.onClick(() => {
            if (this.onClickListener) {
                this.onClickListener();
            }
        });
        Text.create(this.content);
        Text.fontSize(15);
        Text.width(400);
        Text.fontColor('#ffffff');
        Text.pop();
        Button.pop();
    }
}
