interface SecondPage_Params {
    message?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SecondPage_" + ++__generate__Id;
}
import common from '@ohos.app.ability.common';
class SecondPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('SecondPage', this, "message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SecondPage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Text.create(this.message);
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let context = getContext(this) as common.UIAbilityContext; // UIAbilityContext
            const RESULT_CODE: number = 1001;
            let abilityResult = {
                resultCode: RESULT_CODE,
                want: {
                    bundleName: "com.example.hotest",
                    abilityName: 'FuncAbility',
                    // moduleName: 'module1',
                    parameters: {
                        info: '来自FuncAbility Index页面',
                    },
                },
            };
            // context为被调用方UIAbility的AbilityContext
            context.terminateSelfWithResult(abilityResult, (err) => {
                // ...
            });
        });
        Text.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new SecondPage("1", undefined, {}));
