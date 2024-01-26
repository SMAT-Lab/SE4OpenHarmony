interface LoginPage_Params {
    fieldItems?: LoginFieldItem[];
    loginItem?: LoginFieldItem;
    questionItems?: LoginQuestionItem[];
    questionItem?: LoginQuestionItem;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "LoginPage_" + ++__generate__Id;
}
import { PERCENT_100 } from '../../common/constants/CommonConstants';
import { showToast } from '../../common/utils/ComponentUtil';
import { LoginFieldItem, LoginQuestionItem } from '../../model/LoginModel';
import { loginViewModel } from '../../viewmodel/LoginViewModel';
class LoginPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.fieldItems = [LoginFieldItem.USERNAME, LoginFieldItem.EMAIL];
        this.__loginItem = new ObservedPropertySimple(LoginFieldItem.USERNAME, this, "loginItem");
        this.questionItems = [
            LoginQuestionItem.NO,
            LoginQuestionItem.MOTHER_NAME,
            LoginQuestionItem.GRANDPA_NAME,
            LoginQuestionItem.FATHER_BORN_CITY,
            LoginQuestionItem.ONE_TEACHER_NAME,
            LoginQuestionItem.COMPUTER_MODEL,
            LoginQuestionItem.FAVORITE_RESTAURANT_NAME,
            LoginQuestionItem.LAST_FOUR_DIGITS_OF_DRIVER_LICENSE
        ];
        this.__questionItem = new ObservedPropertySimple(LoginQuestionItem.NO, this, "questionItem");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: LoginPage_Params) {
        if (params.fieldItems !== undefined) {
            this.fieldItems = params.fieldItems;
        }
        if (params.loginItem !== undefined) {
            this.loginItem = params.loginItem;
        }
        if (params.questionItems !== undefined) {
            this.questionItems = params.questionItems;
        }
        if (params.questionItem !== undefined) {
            this.questionItem = params.questionItem;
        }
    }
    aboutToBeDeleted() {
        this.__loginItem.aboutToBeDeleted();
        this.__questionItem.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private fieldItems: LoginFieldItem[];
    private __loginItem: ObservedPropertySimple<LoginFieldItem>;
    get loginItem() {
        return this.__loginItem.get();
    }
    set loginItem(newValue: LoginFieldItem) {
        this.__loginItem.set(newValue);
    }
    private questionItems: LoginQuestionItem[];
    private __questionItem: ObservedPropertySimple<LoginQuestionItem>;
    get questionItem() {
        return this.__questionItem.get();
    }
    set questionItem(newValue: LoginQuestionItem) {
        this.__questionItem.set(newValue);
    }
    render() {
        Navigation.create();
        Navigation.width(PERCENT_100);
        Navigation.height(PERCENT_100);
        Navigation.title('登录');
        Navigation.titleMode(NavigationTitleMode.Mini);
        Navigation.backgroundColor($r('app.color.app_theme_background'));
        Column.create();
        Column.height(PERCENT_100);
        Blank.create();
        Blank.pop();
        Column.create();
        Column.width(300);
        Column.justifyContent(FlexAlign.Center);
        Row.create();
        Row.width(PERCENT_100);
        Row.justifyContent(FlexAlign.Start);
        Row.pop();
        TextInput.create({ placeholder: `请输入${LoginFieldItem.title(this.loginItem)}` });
        TextInput.margin({ top: $r('app.float.margin_padding_10') });
        TextInput.create({ placeholder: '请输入密码' });
        TextInput.margin({ top: $r('app.float.margin_padding_10') });
        TextInput.type(InputType.Password);
        Row.create();
        Row.width(PERCENT_100);
        Row.margin({ top: $r('app.float.margin_padding_10') });
        // Text('安全提问：')
        Button.createWithLabel(`${LoginQuestionItem.title(this.questionItem)}`);
        // Text('安全提问：')
        Button.fontColor($r('app.color.app_theme_secondary'));
        // Text('安全提问：')
        Button.backgroundColor(Color.Transparent);
        // Text('安全提问：')
        Button.borderColor($r('app.color.app_theme_secondary'));
        // Text('安全提问：')
        Button.borderWidth(1);
        // Text('安全提问：')
        Button.height(30);
        // Text('安全提问：')
        Button.bindMenu(this.getQuestionItems());
        // Text('安全提问：')
        Button.pop();
        Row.pop();
        If.create();
        if (this.questionItem != LoginQuestionItem.NO) {
            If.branchId(0);
            TextInput.create({ placeholder: '请输入答案' });
            TextInput.margin({ top: $r('app.float.margin_padding_10') });
        }
        If.pop();
        Button.createWithLabel('登录');
        Button.margin({ top: $r('app.float.margin_padding_10') });
        Button.width(PERCENT_100);
        Button.onClick(() => {
            showToast('登录');
        });
        Button.pop();
        Column.pop();
        Blank.create();
        Blank.pop();
        Column.pop();
        Navigation.pop();
    }
    aboutToAppear() {
        loginViewModel.postData();
    }
    getLoginItems(): {
        value: string;
        action: () => void;
    }[] {
        let items: {
            value: string;
            action: () => void;
        }[] = [];
        for (let i = 0; i < this.fieldItems.length; i++) {
            items.push({
                value: LoginFieldItem.title(this.fieldItems[i]),
                action: () => {
                    this.loginItem = this.fieldItems[i];
                }
            });
        }
        return items;
    }
    getQuestionItems(): {
        value: string;
        action: () => void;
    }[] {
        let items: {
            value: string;
            action: () => void;
        }[] = [];
        for (let i = 0; i < this.questionItems.length; i++) {
            items.push({
                value: LoginQuestionItem.title(this.questionItems[i]),
                action: () => {
                    this.questionItem = this.questionItems[i];
                }
            });
        }
        return items;
    }
}
loadDocument(new LoginPage("1", undefined, {}));
