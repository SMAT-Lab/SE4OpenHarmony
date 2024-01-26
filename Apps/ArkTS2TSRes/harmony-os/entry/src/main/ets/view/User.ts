interface User_Params {
    user?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "User_" + ++__generate__Id;
}
export default class User extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__user = this.initializeConsume("user", "user");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: User_Params) {
    }
    aboutToBeDeleted() {
        this.__user.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __user: SynchedPropertySimpleTwoWay<string>;
    get user() {
        return this.__user.get();
    }
    set user(newValue: string) {
        this.__user.set(newValue);
    }
    render() {
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Column.margin({ left: $r('app.float.setting_account_margin') });
        Text.create(JSON.parse(this.user).username);
        Text.fontSize($r('app.float.setting_account_fontSize'));
        Text.pop();
        Text.create(JSON.parse(this.user).email);
        Text.fontSize($r('app.float.little_text_size'));
        Text.margin({ top: $r('app.float.setting_name_margin') });
        Text.pop();
        Column.pop();
    }
}
