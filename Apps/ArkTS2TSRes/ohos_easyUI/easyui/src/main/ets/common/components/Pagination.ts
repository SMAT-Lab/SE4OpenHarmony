interface Pagination_ellipses_Params {
    currentPage?: number;
    totalPage?: number;
}
interface Pagination_simple_Params {
    currentPage?: number;
    totalPage?: number;
}
interface Pagination_basic_Params {
    currentPage?: number;
    totalPage?: number;
    pages?: number[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Pagination_" + ++__generate__Id;
}
export class Pagination_basic extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__currentPage = new SynchedPropertySimpleTwoWay(params.currentPage, this, "currentPage");
        this.totalPage = 5;
        this.pages = [];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Pagination_basic_Params) {
        if (params.totalPage !== undefined) {
            this.totalPage = params.totalPage;
        }
        if (params.pages !== undefined) {
            this.pages = params.pages;
        }
    }
    aboutToBeDeleted() {
        this.__currentPage.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __currentPage: SynchedPropertySimpleTwoWay<number>;
    get currentPage() {
        return this.__currentPage.get();
    }
    set currentPage(newValue: number) {
        this.__currentPage.set(newValue);
    }
    private totalPage: number;
    private pages: number[];
    initPages() {
        if (this.totalPage < 1 || this.totalPage > 6) {
            console.error("页数有误，总页数范围为1-6");
        }
        else {
            for (let i = 0; i < this.totalPage; i++) {
                this.pages[i] = i + 1;
            }
        }
    }
    aboutToAppear() {
        this.initPages();
    }
    render() {
        Row.create();
        Row.height(30);
        If.create();
        if (this.currentPage == 1) {
            If.branchId(0);
            Button.createWithChild();
            Button.backgroundColor("#ffc9cac9");
            Button.type(ButtonType.Normal);
            Button.alignSelf(ItemAlign.Start);
            Button.hitTestBehavior(HitTestMode.None);
            Text.create("上一页");
            Text.height(20);
            Text.width(50);
            Text.textAlign(TextAlign.Center);
            Text.fontColor("#ff949494");
            Text.margin(5);
            Text.pop();
            Button.pop();
        }
        else {
            If.branchId(1);
            Button.createWithChild();
            Button.backgroundColor("#ffffffff");
            Button.type(ButtonType.Normal);
            Button.alignSelf(ItemAlign.Start);
            Button.onClick(() => {
                if (this.currentPage > 1) {
                    this.currentPage = this.currentPage - 1;
                }
            });
            Text.create("上一页");
            Text.height(20);
            Text.width(50);
            Text.textAlign(TextAlign.Center);
            Text.fontColor("#ff1f85e5");
            Text.margin(5);
            Text.pop();
            Button.pop();
        }
        If.pop();
        List.create();
        List.listDirection(Axis.Horizontal);
        ForEach.create("2", this, ObservedObject.GetRawObject(this.pages), (item, index) => {
            If.create();
            if (this.currentPage == index + 1) {
                If.branchId(0);
                ListItem.create();
                Button.createWithChild();
                Button.type(ButtonType.Normal);
                Button.backgroundColor("#ff1f85e5");
                Button.onClick(() => {
                    this.currentPage = index + 1;
                });
                Text.create("" + item);
                Text.height(20);
                Text.width(30);
                Text.textAlign(TextAlign.Center);
                Text.fontColor("#ffffffff");
                Text.margin(5);
                Text.pop();
                Button.pop();
                ListItem.pop();
            }
            else {
                If.branchId(1);
                ListItem.create();
                Button.createWithChild();
                Button.type(ButtonType.Normal);
                Button.backgroundColor("#ffffffff");
                Button.onClick(() => {
                    this.currentPage = index + 1;
                });
                Text.create("" + item);
                Text.height(20);
                Text.width(30);
                Text.textAlign(TextAlign.Center);
                Text.fontColor("#ff1f85e5");
                Text.margin(5);
                Text.pop();
                Button.pop();
                ListItem.pop();
            }
            If.pop();
        });
        ForEach.pop();
        List.pop();
        If.create();
        if (this.currentPage == this.totalPage) {
            If.branchId(0);
            Button.createWithChild();
            Button.backgroundColor("#ffc9cac9");
            Button.type(ButtonType.Normal);
            Button.alignSelf(ItemAlign.Start);
            Button.hitTestBehavior(HitTestMode.None);
            Text.create("下一页");
            Text.height(20);
            Text.width(50);
            Text.textAlign(TextAlign.Center);
            Text.fontColor("#ff949494");
            Text.margin(5);
            Text.pop();
            Button.pop();
        }
        else {
            If.branchId(1);
            Button.createWithChild();
            Button.backgroundColor("#ffffffff");
            Button.type(ButtonType.Normal);
            Button.alignSelf(ItemAlign.Start);
            Button.onClick(() => {
                if (this.currentPage < this.totalPage) {
                    this.currentPage = this.currentPage + 1;
                }
            });
            Text.create("下一页");
            Text.height(20);
            Text.width(50);
            Text.textAlign(TextAlign.Center);
            Text.fontColor("#ff1f85e5");
            Text.margin(5);
            Text.pop();
            Button.pop();
        }
        If.pop();
        Row.pop();
    }
}
export class Pagination_simple extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__currentPage = new SynchedPropertySimpleTwoWay(params.currentPage, this, "currentPage");
        this.totalPage = 12;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Pagination_simple_Params) {
        if (params.totalPage !== undefined) {
            this.totalPage = params.totalPage;
        }
    }
    aboutToBeDeleted() {
        this.__currentPage.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __currentPage: SynchedPropertySimpleTwoWay<number>;
    get currentPage() {
        return this.__currentPage.get();
    }
    set currentPage(newValue: number) {
        this.__currentPage.set(newValue);
    }
    private totalPage: number;
    render() {
        Row.create();
        If.create();
        if (this.currentPage == 1) {
            If.branchId(0);
            Button.createWithChild();
            Button.backgroundColor("#ffc9cac9");
            Button.type(ButtonType.Normal);
            Button.alignSelf(ItemAlign.Start);
            Button.hitTestBehavior(HitTestMode.None);
            Text.create("上一页");
            Text.height(20);
            Text.width(50);
            Text.textAlign(TextAlign.Center);
            Text.fontColor("#ff949494");
            Text.margin(5);
            Text.pop();
            Button.pop();
        }
        else {
            If.branchId(1);
            Button.createWithChild();
            Button.backgroundColor("#ffffffff");
            Button.type(ButtonType.Normal);
            Button.alignSelf(ItemAlign.Start);
            Button.onClick(() => {
                if (this.currentPage > 1) {
                    this.currentPage -= 1;
                }
            });
            Text.create("上一页");
            Text.height(20);
            Text.width(50);
            Text.textAlign(TextAlign.Center);
            Text.fontColor("#ff1f85e5");
            Text.margin(5);
            Text.pop();
            Button.pop();
        }
        If.pop();
        Text.create(this.currentPage + "/" + this.totalPage);
        Text.margin({ left: 20, right: 20 });
        Text.pop();
        If.create();
        if (this.currentPage == this.totalPage) {
            If.branchId(0);
            Button.createWithChild();
            Button.backgroundColor("#ffc9cac9");
            Button.type(ButtonType.Normal);
            Button.alignSelf(ItemAlign.Start);
            Button.hitTestBehavior(HitTestMode.None);
            Text.create("下一页");
            Text.height(20);
            Text.width(50);
            Text.textAlign(TextAlign.Center);
            Text.fontColor("#ff949494");
            Text.margin(5);
            Text.pop();
            Button.pop();
        }
        else {
            If.branchId(1);
            Button.createWithChild();
            Button.backgroundColor("#ffffffff");
            Button.type(ButtonType.Normal);
            Button.alignSelf(ItemAlign.Start);
            Button.onClick(() => {
                if (this.currentPage < this.totalPage) {
                    this.currentPage += 1;
                }
            });
            Text.create("下一页");
            Text.height(20);
            Text.width(50);
            Text.textAlign(TextAlign.Center);
            Text.fontColor("#ff1f85e5");
            Text.margin(5);
            Text.pop();
            Button.pop();
        }
        If.pop();
        Row.pop();
    }
}
export class Pagination_ellipses extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__currentPage = new SynchedPropertySimpleTwoWay(params.currentPage, this, "currentPage");
        this.totalPage = 12;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Pagination_ellipses_Params) {
        if (params.totalPage !== undefined) {
            this.totalPage = params.totalPage;
        }
    }
    aboutToBeDeleted() {
        this.__currentPage.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __currentPage: SynchedPropertySimpleTwoWay<number>;
    get currentPage() {
        return this.__currentPage.get();
    }
    set currentPage(newValue: number) {
        this.__currentPage.set(newValue);
    }
    private totalPage: number;
    pages(totalPage: number): number[] {
        let pages: number[] = [];
        for (let i = 0; i < totalPage; i++) {
            pages[i] = i + 1;
        }
        console.log(pages + "");
        return pages;
    }
    aboutToAppear() {
        if (this.totalPage < 0) {
            console.error("总页数应该大于等于0");
        }
    }
    render() {
        Row.create();
        Row.height(30);
        If.create();
        if (this.currentPage == 1) {
            If.branchId(0);
            Button.createWithChild();
            Button.backgroundColor("#ffc9cac9");
            Button.type(ButtonType.Normal);
            Button.alignSelf(ItemAlign.Start);
            Button.hitTestBehavior(HitTestMode.None);
            Text.create("上一页");
            Text.height(20);
            Text.width(50);
            Text.textAlign(TextAlign.Center);
            Text.fontColor("#ff949494");
            Text.margin(5);
            Text.pop();
            Button.pop();
        }
        else {
            If.branchId(1);
            Button.createWithChild();
            Button.backgroundColor("#ffffffff");
            Button.type(ButtonType.Normal);
            Button.alignSelf(ItemAlign.Start);
            Button.onClick(() => {
                if (this.currentPage > 1) {
                    this.currentPage = this.currentPage - 1;
                }
            });
            Text.create("上一页");
            Text.height(20);
            Text.width(50);
            Text.textAlign(TextAlign.Center);
            Text.fontColor("#ff1f85e5");
            Text.margin(5);
            Text.pop();
            Button.pop();
        }
        If.pop();
        If.create();
        //处理只有一页和两页的情况
        if (this.totalPage == 0 || this.totalPage == 1 || this.totalPage == 2) {
            If.branchId(0);
            List.create();
            List.listDirection(Axis.Horizontal);
            ForEach.create("3", this, ObservedObject.GetRawObject(this.pages(this.totalPage)), (item, index) => {
                If.create();
                if (this.currentPage == index + 1) {
                    If.branchId(0);
                    ListItem.create();
                    Button.createWithChild();
                    Button.type(ButtonType.Normal);
                    Button.backgroundColor("#ff1f85e5");
                    Button.onClick(() => {
                        this.currentPage = index + 1;
                    });
                    Text.create("" + item);
                    Text.height(20);
                    Text.width(30);
                    Text.textAlign(TextAlign.Center);
                    Text.fontColor("#ffffffff");
                    Text.margin(5);
                    Text.pop();
                    Button.pop();
                    ListItem.pop();
                }
                else {
                    If.branchId(1);
                    ListItem.create();
                    Button.createWithChild();
                    Button.type(ButtonType.Normal);
                    Button.backgroundColor("#ffffffff");
                    Button.onClick(() => {
                        this.currentPage = index + 1;
                    });
                    Text.create("" + item);
                    Text.height(20);
                    Text.width(30);
                    Text.textAlign(TextAlign.Center);
                    Text.fontColor("#ff1f85e5");
                    Text.margin(5);
                    Text.pop();
                    Button.pop();
                    ListItem.pop();
                }
                If.pop();
            });
            ForEach.pop();
            List.pop();
        }
        else {
            If.branchId(1);
            If.create();
            //出现左省略号
            if (this.currentPage >= 3 && this.totalPage != 3) {
                If.branchId(0);
                Button.createWithChild();
                Button.type(ButtonType.Normal);
                Button.backgroundColor("#ffffffff");
                Button.onClick(() => {
                    this.currentPage -= 2;
                });
                Text.create("...");
                Text.height(20);
                Text.width(30);
                Text.textAlign(TextAlign.Center);
                Text.fontColor("#ff1f85e5");
                Text.margin(5);
                Text.pop();
                Button.pop();
            }
            If.pop();
            If.create();
            //三个页签显示
            if (this.currentPage == 1) {
                If.branchId(0);
                Button.createWithChild();
                Button.type(ButtonType.Normal);
                Button.backgroundColor("#ff1f85e5");
                Text.create("" + (this.currentPage));
                Text.height(20);
                Text.width(30);
                Text.textAlign(TextAlign.Center);
                Text.fontColor("#ffffffff");
                Text.margin(5);
                Text.pop();
                Button.pop();
                Button.createWithChild();
                Button.type(ButtonType.Normal);
                Button.backgroundColor("#ffffffff");
                Button.onClick(() => {
                    this.currentPage = this.currentPage + 1;
                });
                Text.create("" + (this.currentPage + 1));
                Text.height(20);
                Text.width(30);
                Text.textAlign(TextAlign.Center);
                Text.fontColor("#ff1f85e5");
                Text.margin(5);
                Text.pop();
                Button.pop();
                Button.createWithChild();
                Button.type(ButtonType.Normal);
                Button.backgroundColor("#ffffffff");
                Button.onClick(() => {
                    this.currentPage = this.currentPage + 2;
                });
                Text.create("" + (this.currentPage + 2));
                Text.height(20);
                Text.width(30);
                Text.textAlign(TextAlign.Center);
                Text.fontColor("#ff1f85e5");
                Text.margin(5);
                Text.pop();
                Button.pop();
            }
            else if (this.currentPage == this.totalPage) {
                If.branchId(1);
                Button.createWithChild();
                Button.type(ButtonType.Normal);
                Button.backgroundColor("#ffffffff");
                Button.onClick(() => {
                    this.currentPage = this.currentPage - 2;
                });
                Text.create("" + (this.currentPage - 2));
                Text.height(20);
                Text.width(30);
                Text.textAlign(TextAlign.Center);
                Text.fontColor("#ff1f85e5");
                Text.margin(5);
                Text.pop();
                Button.pop();
                Button.createWithChild();
                Button.type(ButtonType.Normal);
                Button.backgroundColor("#ffffffff");
                Button.onClick(() => {
                    this.currentPage = this.currentPage - 1;
                });
                Text.create("" + (this.currentPage - 1));
                Text.height(20);
                Text.width(30);
                Text.textAlign(TextAlign.Center);
                Text.fontColor("#ff1f85e5");
                Text.margin(5);
                Text.pop();
                Button.pop();
                Button.createWithChild();
                Button.type(ButtonType.Normal);
                Button.backgroundColor("#ff1f85e5");
                Text.create("" + (this.currentPage));
                Text.height(20);
                Text.width(30);
                Text.textAlign(TextAlign.Center);
                Text.fontColor("#ffffffff");
                Text.margin(5);
                Text.pop();
                Button.pop();
            }
            else {
                If.branchId(2);
                Button.createWithChild();
                Button.type(ButtonType.Normal);
                Button.backgroundColor("#ffffffff");
                Button.onClick(() => {
                    this.currentPage = this.currentPage - 1;
                });
                Text.create("" + (this.currentPage - 1));
                Text.height(20);
                Text.width(30);
                Text.textAlign(TextAlign.Center);
                Text.fontColor("#ff1f85e5");
                Text.margin(5);
                Text.pop();
                Button.pop();
                Button.createWithChild();
                Button.type(ButtonType.Normal);
                Button.backgroundColor("#ff1f85e5");
                Text.create("" + this.currentPage);
                Text.height(20);
                Text.width(30);
                Text.textAlign(TextAlign.Center);
                Text.fontColor("#ffffffff");
                Text.margin(5);
                Text.pop();
                Button.pop();
                Button.createWithChild();
                Button.type(ButtonType.Normal);
                Button.backgroundColor("#ffffffff");
                Button.onClick(() => {
                    this.currentPage = this.currentPage + 1;
                });
                Text.create("" + (this.currentPage + 1));
                Text.height(20);
                Text.width(30);
                Text.textAlign(TextAlign.Center);
                Text.fontColor("#ff1f85e5");
                Text.margin(5);
                Text.pop();
                Button.pop();
            }
            If.pop();
            If.create();
            //出现右省略号
            if (this.currentPage <= this.totalPage - 2) {
                If.branchId(0);
                Button.createWithChild();
                Button.type(ButtonType.Normal);
                Button.backgroundColor("#ffffffff");
                Button.onClick(() => {
                    if (this)
                        this.currentPage += 2;
                });
                Text.create("...");
                Text.height(20);
                Text.width(30);
                Text.textAlign(TextAlign.Center);
                Text.fontColor("#ff1f85e5");
                Text.margin(5);
                Text.pop();
                Button.pop();
            }
            If.pop();
        }
        If.pop();
        If.create();
        if (this.currentPage == this.totalPage) {
            If.branchId(0);
            Button.createWithChild();
            Button.backgroundColor("#ffc9cac9");
            Button.type(ButtonType.Normal);
            Button.alignSelf(ItemAlign.Start);
            Button.hitTestBehavior(HitTestMode.None);
            Text.create("下一页");
            Text.height(20);
            Text.width(50);
            Text.textAlign(TextAlign.Center);
            Text.fontColor("#ff949494");
            Text.margin(5);
            Text.pop();
            Button.pop();
        }
        else {
            If.branchId(1);
            Button.createWithChild();
            Button.backgroundColor("#ffffffff");
            Button.type(ButtonType.Normal);
            Button.alignSelf(ItemAlign.Start);
            Button.onClick(() => {
                if (this.currentPage < this.totalPage) {
                    this.currentPage = this.currentPage + 1;
                }
            });
            Text.create("下一页");
            Text.height(20);
            Text.width(50);
            Text.textAlign(TextAlign.Center);
            Text.fontColor("#ff1f85e5");
            Text.margin(5);
            Text.pop();
            Button.pop();
        }
        If.pop();
        Row.pop();
    }
}
