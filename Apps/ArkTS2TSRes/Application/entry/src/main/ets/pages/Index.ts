interface Index_Params {
    currentUser?: AuthUser | null | undefined;
    createTime?: string;
    lastSignInTime?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
import router from '@ohos.router';
import cloud, { AuthUser } from '@hw-agconnect/cloud';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__currentUser = AppStorage.SetAndLink('user', null, this, "currentUser");
        this.__createTime = new ObservedPropertySimple('', this, "createTime");
        this.__lastSignInTime = new ObservedPropertySimple('', this, "lastSignInTime");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.createTime !== undefined) {
            this.createTime = params.createTime;
        }
        if (params.lastSignInTime !== undefined) {
            this.lastSignInTime = params.lastSignInTime;
        }
    }
    aboutToBeDeleted() {
        this.__currentUser.aboutToBeDeleted();
        this.__createTime.aboutToBeDeleted();
        this.__lastSignInTime.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __currentUser: ObservedPropertyAbstract<AuthUser | null | undefined>;
    get currentUser() {
        return this.__currentUser.get();
    }
    set currentUser(newValue: AuthUser | null | undefined) {
        this.__currentUser.set(newValue);
    }
    private __createTime: ObservedPropertySimple<string>;
    get createTime() {
        return this.__createTime.get();
    }
    set createTime(newValue: string) {
        this.__createTime.set(newValue);
    }
    private __lastSignInTime: ObservedPropertySimple<string>;
    get lastSignInTime() {
        return this.__lastSignInTime.get();
    }
    set lastSignInTime(newValue: string) {
        this.__lastSignInTime.set(newValue);
    }
    aboutToAppear() {
        cloud.auth().getCurrentUser().then((user: AuthUser | null) => {
            if (user) {
                this.currentUser = user;
                AppStorage.Set<AuthUser>('user', this.currentUser);
            }
        });
    }
    homeButton(title: Resource, description: Resource, routeName: string, parent = null) {
        Button.createWithChild({ type: ButtonType.Normal, stateEffect: true });
        Button.borderRadius(4);
        Button.margin(10);
        Button.borderWidth(1);
        Button.borderColor($r('app.color.body_color'));
        Button.fontColor($r('app.color.body_color'));
        Button.backgroundColor($r('app.color.start_window_background'));
        Button.width('96%');
        Button.onClick(async () => {
            let params: Record<string, Resource> = { 'title': title };
            router.pushUrl({ url: routeName, params });
        });
        Column.create();
        Column.width('100%');
        Text.create(title);
        Text.fontSize($r('app.float.body_font_size'));
        Text.margin({ bottom: 5, top: 5 });
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create(description);
        Text.textAlign(TextAlign.Center);
        Text.fontSize($r('app.float.body_font_size'));
        Text.margin({ bottom: 5 });
        Text.pop();
        Column.pop();
        Button.pop();
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, justifyContent: FlexAlign.Center });
        Flex.height('100%');
        Flex.width('100%');
        Flex.padding(10);
        Flex.backgroundColor($r('app.color.start_window_background'));
        Text.create($r('app.string.main_page_title'));
        Text.width('100%');
        Text.fontSize($r('app.float.main_title_font_size'));
        Text.textAlign(TextAlign.Center);
        Text.fontColor($r('app.color.body_color'));
        Text.margin({ bottom: 10 });
        Text.pop();
        this.homeButton($r('app.string.auth_service_title'), $r('app.string.auth_service_description'), 'pages/Auth', this);
        this.homeButton($r('app.string.cloud_function_title'), $r('app.string.cloud_function_description_main'), 'pages/CloudFunction', this);
        this.homeButton($r('app.string.cloudDB_label'), $r('app.string.cloud_db_description_main'), "pages/CloudDb/CloudDb", this);
        this.homeButton($r('app.string.cloudStorage_label'), $r('app.string.cloud_storage_description_main'), 'pages/CloudStorage', this);
        Flex.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
