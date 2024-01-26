interface MyRadio_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyRadio_" + ++__generate__Id;
}
export class MyRadio extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyRadio_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create({ direction: FlexDirection.Row, justifyContent: FlexAlign.Center, alignItems: ItemAlign.Center });
        Flex.padding({ top: 30 });
        Column.create();
        Text.create('Radio1');
        Text.pop();
        Radio.create({ value: 'Radio1', group: 'radioGroup' });
        Radio.checked(true);
        Radio.height(50);
        Radio.width(50);
        Radio.onChange((isChecked: boolean) => {
            console.log('Radio1 status is ' + isChecked);
        });
        Column.pop();
        Column.create();
        Text.create('Radio2');
        Text.pop();
        Radio.create({ value: 'Radio2', group: 'radioGroup' });
        Radio.checked(false);
        Radio.height(50);
        Radio.width(50);
        Radio.onChange((isChecked: boolean) => {
            console.log('Radio2 status is ' + isChecked);
        });
        Column.pop();
        Column.create();
        Text.create('Radio3');
        Text.pop();
        Radio.create({ value: 'Radio3', group: 'radioGroup' });
        Radio.checked(false);
        Radio.height(50);
        Radio.width(50);
        Radio.onChange((isChecked: boolean) => {
            console.log('Radio3 status is ' + isChecked);
        });
        Column.pop();
        Flex.pop();
    }
}
