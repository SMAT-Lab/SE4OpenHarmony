interface MyAlertDialog_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyAlertDialog_" + ++__generate__Id;
}
export class MyAlertDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyAlertDialog_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Column.create({ space: 5 });
        Column.width('100%');
        Column.margin({ top: 5 });
        Button.createWithLabel('one button dialog');
        Button.onClick(() => {
            AlertDialog.show({
                title: 'title',
                message: 'text',
                confirm: {
                    value: 'button',
                    action: () => {
                        console.info('Button-clicking callback');
                    }
                },
                cancel: () => {
                    console.info('Closed callbacks');
                }
            });
        });
        Button.backgroundColor(0x317aff);
        Button.pop();
        Button.createWithLabel('two button dialog');
        Button.onClick(() => {
            AlertDialog.show({
                title: 'title',
                message: 'text',
                primaryButton: {
                    value: 'cancel',
                    action: () => {
                        console.info('Callback when the first button is clicked');
                    }
                },
                secondaryButton: {
                    value: 'ok',
                    action: () => {
                        console.info('Callback when the second button is clicked');
                    }
                },
                cancel: () => {
                    console.info('Closed callbacks');
                }
            });
        });
        Button.backgroundColor(0x317aff);
        Button.pop();
        Column.pop();
    }
}
loadDocument(new MyAlertDialog("1", undefined, {}));
