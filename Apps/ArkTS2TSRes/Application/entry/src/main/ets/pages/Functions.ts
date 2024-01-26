interface Functions_Params {
    year?: string;
    functionResult?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Functions_" + ++__generate__Id;
}
import cloud from '@hw-agconnect/cloud';
class Functions extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.year = '';
        this.__functionResult = new ObservedPropertySimple('', this, "functionResult");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Functions_Params) {
        if (params.year !== undefined) {
            this.year = params.year;
        }
        if (params.functionResult !== undefined) {
            this.functionResult = params.functionResult;
        }
    }
    aboutToBeDeleted() {
        this.__functionResult.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private year: string;
    private __functionResult: ObservedPropertySimple<string>;
    get functionResult() {
        return this.__functionResult.get();
    }
    set functionResult(newValue: string) {
        this.__functionResult.set(newValue);
    }
    render() {
        Column.create();
        Column.justifyContent(FlexAlign.Center);
        Column.width('100%');
        Column.height('100%');
        TextInput.create({ placeholder: "输入年份" });
        TextInput.width('90%');
        TextInput.onChange((value: string) => {
            this.year = value;
        });
        Button.createWithLabel('查询', { type: ButtonType.Capsule, stateEffect: true });
        Button.margin({ top: '100px', bottom: '100px' });
        Button.width('90%');
        Button.onClick(() => {
            this.callFunction();
        });
        Button.pop();
        Text.create("生肖: " + this.functionResult);
        Text.textAlign(TextAlign.Center);
        Text.fontSize(20);
        Text.padding(10);
        Text.width('90%');
        Text.pop();
        Column.pop();
    }
    async callFunction() {
        let result = await cloud.callFunction({
            name: "animal-symbolic",
            params: {
                "year": this.year
            }
        });
        this.functionResult = result.getValue().result;
        console.log("animal", this.functionResult);
    }
}
loadDocument(new Functions("1", undefined, {}));
