interface CloudFunction_Params {
    globalId?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CloudFunction_" + ++__generate__Id;
}
import cloud, { FunctionResult } from '@hw-agconnect/cloud';
class CloudFunction extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__globalId = new ObservedPropertySimple('', this, "globalId");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CloudFunction_Params) {
        if (params.globalId !== undefined) {
            this.globalId = params.globalId;
        }
    }
    aboutToBeDeleted() {
        this.__globalId.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __globalId: ObservedPropertySimple<string>;
    get globalId() {
        return this.__globalId.get();
    }
    set globalId(newValue: string) {
        this.__globalId.set(newValue);
    }
    render() {
        Column.create();
        Column.height('100%');
        Navigation.create();
        Navigation.title({ builder: () => {
                this.NavigationTitle.call(this);
            } });
        Navigation.height('50vp');
        Navigation.width('100%');
        Navigation.margin({ bottom: 10 });
        Navigation.titleMode(NavigationTitleMode.Mini);
        Navigation.pop();
        Text.create($r('app.string.cloud_function_description'));
        Text.width('90%');
        Text.textAlign(TextAlign.Center);
        Text.margin({ top: 20, bottom: 20 });
        Text.fontSize($r('app.float.body_font_size'));
        Text.pop();
        Button.createWithChild({ type: ButtonType.Normal });
        Button.width('90%');
        Button.backgroundColor($r('app.color.login_button'));
        Button.borderRadius('8vp');
        Button.height('30vp');
        Button.margin({ top: 10 });
        Button.onClick(() => {
            cloud.callFunction({
                name: 'id-generator',
                version: '$latest'
            }).then((res: FunctionResult) => {
                this.globalId = res.getValue()?.uuid;
            }).catch((err: Object) => {
            });
        });
        Text.create($r('app.string.cloud_function_button_text'));
        Text.fontColor($r('app.color.white'));
        Text.margin({ top: 5, bottom: 5 });
        Text.pop();
        Button.pop();
        Column.create();
        Column.width('90%');
        Column.padding({ top: 20, bottom: 20 });
        Column.margin({ top: 20 });
        Column.backgroundColor($r('app.color.placeholder_background'));
        Text.create(this.globalId);
        Text.fontSize($r('app.float.body_font_size'));
        Text.pop();
        Column.pop();
        Column.pop();
    }
    NavigationTitle(parent = null) {
        Column.create();
        Text.create($r('app.string.cloud_function_title'));
        Text.fontSize($r('app.float.navigation_font_size'));
        Text.pop();
        Column.pop();
    }
}
loadDocument(new CloudFunction("1", undefined, {}));
