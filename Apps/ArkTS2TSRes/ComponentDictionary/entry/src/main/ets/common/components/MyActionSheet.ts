interface MyActionSheet_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyActionSheet_" + ++__generate__Id;
}
export class MyActionSheet extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyActionSheet_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Button.createWithLabel('Click to Show ActionSheet');
        Button.onClick(() => {
            ActionSheet.show({
                title: 'ActionSheet title',
                message: 'message',
                confirm: {
                    value: 'Confirm button',
                    action: () => {
                        console.log('Get Alert Dialog handled');
                    }
                },
                sheets: [
                    {
                        title: 'apples',
                        action: () => {
                            console.error('apples');
                        }
                    },
                    {
                        title: 'bananas',
                        action: () => {
                            console.error('bananas');
                        }
                    },
                    {
                        title: 'pears',
                        action: () => {
                            console.error('pears');
                        }
                    }
                ]
            });
        });
        Button.pop();
        Flex.pop();
    }
}
