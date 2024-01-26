interface BadgeItem_Params {
    title?: string;
    info?: string;
    selected?: boolean;
    index?: number;
    selectIndex?: number;
}
interface BadgeGroup_Params {
    badgeList?: {
        title: string;
        info: string;
    }[] //徽标列表
    ;
    selected?: boolean;
    selectedIndex?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Badge_" + ++__generate__Id;
}
export class BadgeGroup extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.badgeList = undefined;
        this.__selected = new ObservedPropertySimple(false, this, "selected");
        this.__selectedIndex = new ObservedPropertySimple(0, this, "selectedIndex");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: BadgeGroup_Params) {
        if (params.badgeList !== undefined) {
            this.badgeList = params.badgeList;
        }
        if (params.selected !== undefined) {
            this.selected = params.selected;
        }
        if (params.selectedIndex !== undefined) {
            this.selectedIndex = params.selectedIndex;
        }
    }
    aboutToBeDeleted() {
        this.__selected.aboutToBeDeleted();
        this.__selectedIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private badgeList: {
        title: string;
        info: string;
    }[]; //徽标列表
    private __selected: ObservedPropertySimple<boolean>;
    get selected() {
        return this.__selected.get();
    }
    set selected(newValue: boolean) {
        this.__selected.set(newValue);
    }
    private __selectedIndex: ObservedPropertySimple<number>;
    get selectedIndex() {
        return this.__selectedIndex.get();
    }
    set selectedIndex(newValue: number) {
        this.__selectedIndex.set(newValue);
    }
    render() {
        Column.create();
        ForEach.create("4", this, ObservedObject.GetRawObject(this.badgeList), (item: {
            title: string;
            info: string;
        }, index) => {
            If.create();
            if (this.selectedIndex === index) {
                If.branchId(0);
                let earlierCreatedChild_2: BadgeItem = (this && this.findChildById) ? this.findChildById("2") as BadgeItem : undefined;
                if (earlierCreatedChild_2 == undefined) {
                    View.create(new BadgeItem("2", this, {
                        title: item.title,
                        info: item.info,
                        selected: true,
                        index: index,
                        selectIndex: this.__selectedIndex
                    }));
                }
                else {
                    earlierCreatedChild_2.updateWithValueParams({
                        title: item.title,
                        info: item.info,
                        selected: true,
                        index: index
                    });
                    View.create(earlierCreatedChild_2);
                }
            }
            else {
                If.branchId(1);
                let earlierCreatedChild_3: BadgeItem = (this && this.findChildById) ? this.findChildById("3") as BadgeItem : undefined;
                if (earlierCreatedChild_3 == undefined) {
                    View.create(new BadgeItem("3", this, {
                        title: item.title,
                        info: item.info,
                        selected: false,
                        index: index,
                        selectIndex: this.__selectedIndex
                    }));
                }
                else {
                    earlierCreatedChild_3.updateWithValueParams({
                        title: item.title,
                        info: item.info,
                        selected: false,
                        index: index
                    });
                    View.create(earlierCreatedChild_3);
                }
            }
            If.pop();
        });
        ForEach.pop();
        Column.pop();
    }
}
class BadgeItem extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.title = "标签名称";
        this.info = "1";
        this.selected = undefined;
        this.index = 0;
        this.__selectIndex = new SynchedPropertySimpleTwoWay(params.selectIndex, this, "selectIndex");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: BadgeItem_Params) {
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.info !== undefined) {
            this.info = params.info;
        }
        if (params.selected !== undefined) {
            this.selected = params.selected;
        }
        if (params.index !== undefined) {
            this.index = params.index;
        }
    }
    aboutToBeDeleted() {
        this.__selectIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private title: string;
    private info: string;
    private selected: boolean;
    private index: number;
    private __selectIndex: SynchedPropertySimpleTwoWay<number>;
    get selectIndex() {
        return this.__selectIndex.get();
    }
    set selectIndex(newValue: number) {
        this.__selectIndex.set(newValue);
    }
    render() {
        Row.create();
        Row.height(80);
        Row.width(120);
        Row.backgroundColor(this.selected ? "#ffffffff" : "#ffdedede");
        Row.borderWidth(0.5);
        Row.borderColor("#ffe7e7e7");
        Row.onClick(() => {
            this.selectIndex = this.index;
        });
        If.create();
        if (this.selected) {
            If.branchId(0);
            Column.create();
            Rect.create();
            Rect.width(2);
            Rect.height("100%");
            Rect.fill("#ff0000");
            Column.pop();
        }
        If.pop();
        Column.create();
        Column.width("100%");
        If.create();
        if (this.info === "") {
            If.branchId(0);
            Text.create(this.title);
            Text.fontSize(18);
            Text.pop();
        }
        else {
            If.branchId(1);
            Badge.create({
                value: this.info,
                position: BadgePosition.RightTop,
                style: { color: 0xFFFFFF, fontSize: 12, badgeSize: 14, badgeColor: Color.Red }
            });
            Text.create(this.title);
            Text.fontSize(18);
            Text.pop();
            Badge.pop();
        }
        If.pop();
        Column.pop();
        Row.pop();
    }
}
