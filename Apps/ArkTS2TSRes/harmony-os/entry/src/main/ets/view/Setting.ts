interface Setting_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Setting_" + ++__generate__Id;
}
import CommonConstants from '../common/constants/CommonConstants';
import mainViewModel from '../viewmodel/MainViewModel';
import ItemData from '../common/bean/ItemData';
import router from '@ohos.router';
import User from './User';
export default class Setting extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Setting_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    // @Prop user:string;
    render() {
        Scroll.create();
        Column.create({ space: CommonConstants.COMMON_SPACE });
        Column.height(CommonConstants.FULL_PARENT);
        Column.create();
        Column.width(CommonConstants.FULL_PARENT);
        Column.alignItems(HorizontalAlign.Start);
        Text.create($r('app.string.mainPage_tabTitles_mine'));
        Text.fontWeight(FontWeight.Medium);
        Text.fontSize($r('app.float.page_title_text_size'));
        Text.margin({ top: $r('app.float.mainPage_tabTitles_margin') });
        Text.padding({ left: $r('app.float.mainPage_tabTitles_padding') });
        Text.pop();
        Column.pop();
        Row.create();
        Row.margin({ top: $r('app.float.setting_account_margin') });
        Row.alignItems(VerticalAlign.Center);
        Row.width(CommonConstants.FULL_PARENT);
        Row.height($r('app.float.setting_account_height'));
        Row.backgroundColor(Color.White);
        Row.padding({ left: $r('app.float.setting_account_padding') });
        Row.borderRadius($r('app.float.setting_account_borderRadius'));
        Image.create($r('app.media.account'));
        Image.width($r('app.float.setting_account_size'));
        Image.height($r('app.float.setting_account_size'));
        let earlierCreatedChild_2: User = (this && this.findChildById) ? this.findChildById("2") as User : undefined;
        if (earlierCreatedChild_2 == undefined) {
            //   引入User组件
            View.create(new User("2", this, {}));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
        Row.pop();
        List.create();
        List.backgroundColor(Color.White);
        List.divider({
            strokeWidth: $r('app.float.setting_list_strokeWidth'),
            color: Color.Grey,
            startMargin: $r('app.float.setting_list_startMargin'),
            endMargin: $r('app.float.setting_list_endMargin')
        });
        List.borderRadius($r('app.float.setting_list_borderRadius'));
        List.padding({ top: $r('app.float.setting_list_padding'), bottom: $r('app.float.setting_list_padding') });
        ForEach.create("3", this, ObservedObject.GetRawObject(mainViewModel.getSettingListData()), (item: ItemData) => {
            ListItem.create();
            this.settingCell(item, this);
            ListItem.pop();
        }, item => JSON.stringify(item));
        ForEach.pop();
        List.pop();
        Blank.create();
        Blank.pop();
        Button.createWithLabel($r('app.string.setting_button'), { type: ButtonType.Capsule });
        Button.width(CommonConstants.BUTTON_WIDTH);
        Button.height($r('app.float.login_button_height'));
        Button.fontSize($r('app.float.normal_text_size'));
        Button.fontColor($r('app.color.setting_button_fontColor'));
        Button.fontWeight(FontWeight.Medium);
        Button.backgroundColor($r('app.color.setting_button_backgroundColor'));
        Button.margin({ bottom: $r('app.float.setting_button_bottom') });
        Button.onClick(() => {
            router.pushUrl({
                url: 'pages/LoginPage'
            });
        });
        Button.pop();
        Column.pop();
        Scroll.pop();
    }
    settingCell(item: ItemData, parent = null) {
        Row.create();
        Row.justifyContent(FlexAlign.SpaceBetween);
        Row.width(CommonConstants.FULL_PARENT);
        Row.padding({
            left: $r('app.float.setting_settingCell_left'),
            right: $r('app.float.setting_settingCell_right') // 右边距
        });
        Row.create({ space: CommonConstants.COMMON_SPACE });
        Image.create(item.img);
        Image.width($r('app.float.setting_size'));
        Image.height($r('app.float.setting_size'));
        Text.create(item.title);
        Text.fontSize($r('app.float.normal_text_size'));
        Text.pop();
        Row.pop();
        If.create();
        // 当others为null，应该展示箭头
        if (item.others === null) {
            If.branchId(0);
            Image.create($r('app.media.right_grey'));
            Image.width($r('app.float.setting_jump_width'));
            Image.height($r('app.float.setting_jump_height'));
        }
        else {
            If.branchId(1);
            //   否则展示switch开关
            Toggle.create({ type: ToggleType.Switch, isOn: false });
            //   否则展示switch开关
            Toggle.pop();
        }
        If.pop();
        Row.pop();
    }
}
