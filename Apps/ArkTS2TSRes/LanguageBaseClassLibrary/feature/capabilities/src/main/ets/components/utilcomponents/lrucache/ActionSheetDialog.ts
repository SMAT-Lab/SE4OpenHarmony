interface ActionSheetDialog_Params {
    controller?: CustomDialogController;
    title?: string;
    sheets?: string[];
    action?: (key: string) => void;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ActionSheetDialog_" + ++__generate__Id;
}
export class ActionSheetDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = undefined;
        this.title = '';
        this.sheets = [];
        this.action = () => { };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ActionSheetDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.sheets !== undefined) {
            this.sheets = params.sheets;
        }
        if (params.action !== undefined) {
            this.action = params.action;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private controller?: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private title: string;
    private sheets: string[];
    private action: (key: string) => void;
    render() {
        Column.create();
        Column.width('80%');
        Text.create(this.title);
        Text.width('100%');
        Text.fontSize(18);
        Text.fontColor(Color.Black);
        Text.textAlign(TextAlign.Center);
        Text.margin({ top: 10, bottom: 10 });
        Text.pop();
        List.create();
        List.width('100%');
        List.margin({ bottom: 56 });
        List.divider({ strokeWidth: 1, color: Color.Gray, startMargin: 5, endMargin: 5 });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.sheets), (item: string) => {
            ListItem.create();
            ListItem.width('100%');
            ListItem.onClick(() => {
                this.controller?.close();
                this.action(item);
            });
            Row.create();
            Row.key('getValueOfTheKey');
            Row.width('100%');
            Row.margin(10);
            Text.create('key:');
            Text.fontSize(18);
            Text.fontColor(Color.Gray);
            Text.pop();
            Text.create(item);
            Text.fontSize(18);
            Text.fontColor(Color.Gray);
            Text.pop();
            Row.pop();
            ListItem.pop();
        });
        ForEach.pop();
        List.pop();
        Column.pop();
    }
}
