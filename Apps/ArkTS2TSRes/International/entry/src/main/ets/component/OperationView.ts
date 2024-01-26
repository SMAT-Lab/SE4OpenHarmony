interface OperationView_Params {
    operationKey?: string | Resource;
    showArrow?: boolean;
    handleClick?: () => void;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "OperationView_" + ++__generate__Id;
}
export default class OperationView extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.operationKey = '';
        this.showArrow = true;
        this.handleClick = (): void => { };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: OperationView_Params) {
        if (params.operationKey !== undefined) {
            this.operationKey = params.operationKey;
        }
        if (params.showArrow !== undefined) {
            this.showArrow = params.showArrow;
        }
        if (params.handleClick !== undefined) {
            this.handleClick = params.handleClick;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private operationKey: string | Resource;
    private showArrow: boolean;
    private handleClick: () => void;
    render() {
        Row.create();
        Row.width('100%');
        Row.height(56);
        Row.padding(12);
        Row.border({ radius: 16 });
        Row.backgroundColor(Color.White);
        Row.onClick(this.handleClick);
        Text.create(this.operationKey);
        Text.fontSize(16);
        Text.fontColor(Color.Black);
        Text.height('100%');
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Blank.create();
        Blank.pop();
        If.create();
        if (this.showArrow) {
            If.branchId(0);
            Image.create($r('app.media.ic_public_small_right'));
            Image.height(24);
            Image.width(12);
        }
        If.pop();
        Row.pop();
    }
}
