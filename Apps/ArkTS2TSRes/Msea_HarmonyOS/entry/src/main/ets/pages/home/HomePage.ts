interface HomePage_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "HomePage_" + ++__generate__Id;
}
export class HomePage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: HomePage_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Column.create();
        Navigation.create();
        Navigation.title(getContext(this).resourceManager.getStringSync($r('app.string.tab_home')));
        Navigation.mode(NavigationMode.Auto);
        Navigation.titleMode(NavigationTitleMode.Mini);
        Navigation.hideBackButton(true);
        Text.create($r('app.string.tab_home'));
        Text.fontSize($r('app.float.text_size_headline6_30_medium'));
        Text.fontWeight(FontWeight.Medium);
        Text.pop();
        Navigation.pop();
        Column.pop();
    }
}
loadDocument(new HomePage("1", undefined, {}));
