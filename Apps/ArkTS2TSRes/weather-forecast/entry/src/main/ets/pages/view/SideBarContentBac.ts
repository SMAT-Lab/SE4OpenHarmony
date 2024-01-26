interface SideBarContentBac_Params {
    isShowSideBar?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SideBarContentBac_" + ++__generate__Id;
}
export default class SideBarContentBac extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__isShowSideBar = new SynchedPropertySimpleTwoWay(params.isShowSideBar, this, "isShowSideBar");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SideBarContentBac_Params) {
    }
    aboutToBeDeleted() {
        this.__isShowSideBar.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __isShowSideBar: SynchedPropertySimpleTwoWay<boolean>;
    get isShowSideBar() {
        return this.__isShowSideBar.get();
    }
    set isShowSideBar(newValue: boolean) {
        this.__isShowSideBar.set(newValue);
    }
    render() {
        //灰色背景
        Column.create();
        //灰色背景
        Column.size({ width: '100%', height: '100%' });
        //灰色背景
        Column.backgroundColor('#FF818385');
        //灰色背景
        Column.onClick(() => {
            this.isShowSideBar = !this.isShowSideBar;
        });
        //灰色背景
        Column.pop();
    }
}
