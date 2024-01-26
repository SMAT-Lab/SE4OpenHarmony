interface SettingPage_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SettingPage_" + ++__generate__Id;
}
import { PERCENT_100 } from '../../common/constants/CommonConstants';
class SettingPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SettingPage_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Column.create();
        Navigation.create();
        Navigation.height(PERCENT_100);
        Navigation.title('设置');
        Navigation.titleMode(NavigationTitleMode.Mini);
        Text.create('设置');
        Text.pop();
        Navigation.pop();
        Column.pop();
    }
}
loadDocument(new SettingPage("1", undefined, {}));
