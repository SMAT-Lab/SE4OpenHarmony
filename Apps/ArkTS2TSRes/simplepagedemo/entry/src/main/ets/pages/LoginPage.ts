interface Index_Params {
    isShowProgress?: boolean;
    timeIdOut?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "LoginPage_" + ++__generate__Id;
}
import cert from '@ohos.security.cert';
import router from '@ohos.router';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__isShowProgress = new ObservedPropertySimple(false, this, "isShowProgress");
        this.timeIdOut = null;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.isShowProgress !== undefined) {
            this.isShowProgress = params.isShowProgress;
        }
        if (params.timeIdOut !== undefined) {
            this.timeIdOut = params.timeIdOut;
        }
    }
    aboutToBeDeleted() {
        this.__isShowProgress.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __isShowProgress: ObservedPropertySimple<boolean>;
    get isShowProgress() {
        return this.__isShowProgress.get();
    }
    set isShowProgress(newValue: boolean) {
        this.__isShowProgress.set(newValue);
    }
    private timeIdOut;
    login() {
        this.isShowProgress = true;
        if (this.isShowProgress) {
            this.timeIdOut = setTimeout(() => {
                this.isShowProgress = false;
                this.timeIdOut = null;
                router.replaceUrl({ url: "pages/MainPage" });
            }, 3000);
        }
    }
    render() {
        Column.create();
        Column.height('100%');
        Column.width('100%');
        Column.justifyContent(FlexAlign.SpaceBetween);
        Column.alignItems(HorizontalAlign.Center);
        Column.backgroundColor(0xefefef);
        // 1
        Column.create({ space: 10 });
        // 1
        Column.height('30%');
        // 1
        Column.justifyContent(FlexAlign.End);
        Image.create($r("app.media.logo"));
        Image.width('18%');
        Text.create('登录界面');
        Text.fontSize('60px');
        Text.fontWeight(500);
        Text.pop();
        Text.create('登录账号以使用更多服务');
        Text.fontSize('50px');
        Text.fontColor(Color.Gray);
        Text.pop();
        // 1
        Column.pop();
        //2
        Column.create({ space: 10 });
        TextInput.create({ placeholder: '账号' });
        TextInput.type(InputType.PhoneNumber);
        TextInput.backgroundColor(0xefefef);
        Divider.create();
        Divider.vertical(false);
        Divider.width('90%');
        TextInput.create({ placeholder: '密码' });
        TextInput.type(InputType.Password);
        TextInput.backgroundColor(0xefefef);
        Divider.create();
        Divider.vertical(false);
        Divider.width('90%');
        Row.create();
        Row.width('90%');
        Row.height('3%');
        Row.justifyContent(FlexAlign.SpaceBetween);
        Text.create('短信验证码验证');
        Text.fontColor(0x1e90ff);
        Text.onClick(() => {
            //   to do
        });
        Text.pop();
        Text.create('忘记密码');
        Text.fontColor(0x1e90ff);
        Text.onClick(() => {
            //   to do
        });
        Text.pop();
        Row.pop();
        //2
        Column.pop();
        // 3
        Column.create({ space: 10 });
        Button.createWithLabel('登录', { type: ButtonType.Capsule });
        Button.fontColor(0xffffff);
        Button.width('80%');
        Button.onClick(() => {
            this.login();
        });
        Button.pop();
        Text.create('注册账号');
        Text.fontColor(0x1e90ff);
        Text.pop();
        // 3
        Column.pop();
        Column.create();
        Column.height('10%');
        Column.width('10%');
        If.create();
        if (this.isShowProgress) {
            If.branchId(0);
            LoadingProgress.create();
        }
        If.pop();
        Column.pop();
        Column.create({ space: 10 });
        Column.margin({ bottom: 20 });
        Text.create('其他登录方式');
        Text.pop();
        Row.create();
        Row.width('90%');
        Row.justifyContent(FlexAlign.SpaceEvenly);
        Image.create($r('app.media.login_method1'));
        Image.width('18%');
        Image.create($r('app.media.login_method2'));
        Image.width('18%');
        Image.create($r('app.media.login_method3'));
        Image.width('18%');
        Row.pop();
        Column.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
