interface materialContainderTop_Params {
    model?: materialContainderTop.Model;
    titles?: string[];
    index?: number;
    scroller?: Scroller;
    x0?: number;
    offsetX?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "materialContainderTop_" + ++__generate__Id;
}
class materialContainderTop extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new SynchedPropertyObjectTwoWay(params.model, this, "model");
        this.__titles = new ObservedPropertyObject([], this, "titles");
        this.__index = new SynchedPropertySimpleTwoWay(params.index, this, "index");
        this.scroller = new Scroller();
        this.x0 = 0;
        this.offsetX = 0;
        this.updateWithValueParams(params);
        this.declareWatch("index", this.itemIndexChange);
    }
    updateWithValueParams(params: materialContainderTop_Params) {
        if (params.titles !== undefined) {
            this.titles = params.titles;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.x0 !== undefined) {
            this.x0 = params.x0;
        }
        if (params.offsetX !== undefined) {
            this.offsetX = params.offsetX;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__titles.aboutToBeDeleted();
        this.__index.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: SynchedPropertySimpleOneWay<materialContainderTop.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: materialContainderTop.Model) {
        this.__model.set(newValue);
    }
    private __titles: ObservedPropertyObject<string[]>;
    get titles() {
        return this.__titles.get();
    }
    set titles(newValue: string[]) {
        this.__titles.set(newValue);
    }
    private __index: SynchedPropertySimpleTwoWay<number>;
    get index() {
        return this.__index.get();
    }
    set index(newValue: number) {
        this.__index.set(newValue);
    }
    itemIndexChange(): void {
        this.model.controller.changeIndex(this.index);
        if (this.model.indexChange) {
            this.model.indexChange(this.index);
        }
        this.scroller.scrollTo({
            xOffset: (-px2vp(this.model.viewWidth) / 2) + (this.index + 0.5) * (this.model.textWidth + (this.model.hasIcon ? this.model.iconSize : 0)),
            yOffset: 0,
        });
    }
    private scroller: Scroller;
    render() {
        Column.create();
        Column.height(this.model.height + this.model.dividerHeight);
        Column.width(this.model.width);
        Scroll.create(this.scroller);
        Scroll.scrollable(ScrollDirection.Horizontal);
        Scroll.scrollBar(BarState.On);
        Column.create();
        Row.create();
        Row.backgroundColor(this.model.background);
        ForEach.create("2", this, ObservedObject.GetRawObject(this.titles.map((item1: string, index1: number): TitleData => {
            return new TitleData(index1, item1);
        })), (item: TitleData, index) => {
            Row.create();
            Row.onClick(() => {
                this.index = item.i;
                if (this.model.clickListener) {
                    this.model.clickListener(this.index);
                }
            });
            If.create();
            if (this.model.hasIcon) {
                If.branchId(0);
                Image.create((item.i == this.index) ? this.model.icons[item.i].selected : this.model.icons[item.i].normal);
                Image.width(this.model.iconSize);
                Image.height(this.model.iconSize);
            }
            If.pop();
            Text.create(item.data);
            Text.fontSize((`${item.i}` == (this.index) + "") ? this.model.selectedTextSize : this.model.UnselectedTextSize);
            Text.width(this.model.textWidth);
            Text.height(this.model.textHeight);
            Text.fontColor((`${item.i}` == (this.index) + "") ? this.model.fontColor : this.model.UnselectedTextColor);
            Text.textAlign(TextAlign.Center);
            Text.pop();
            Row.pop();
        }, (item: TitleData) => {
            return item.data;
        });
        ForEach.pop();
        Row.pop();
        Row.create({});
        Row.offset({
            x: this.model.snap ? (this.model.cursorWidth *
                (this.index - ((4.5) + (this.model.offset / this.model.viewWidth)))) :
                this.model.cursorWidth * (this.index),
            y: 0
        });
        Rect.create();
        Rect.height(this.model.cursorHeight);
        Rect.width(this.model.cursorWidth + ((this.model.hasIcon == true ? this.model.iconSize : 0)));
        Rect.fill(this.model.color);
        Row.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    aboutToAppear() {
        this.model.onPageTouch = (event: TouchEvent, currentIndex: number) => {
            return this.onTouchEvent(event, currentIndex);
        };
    }
    private x0: number;
    private offsetX: number;
    onTouchEvent(event: TouchEvent, index: number): number {
        let x0 = this.x0;
        let offset: number;
        if (event.type === TouchType.Down) {
            this.x0 = event.touches[0].x;
        }
        if (event.type === TouchType.Move) {
            offset = event.touches[0].x - x0;
            if ((offset >= 0 && index > 0) || (offset <= 0 && index < this.titles.length - 1)) {
                this.offsetX = offset;
            }
        }
        if (event.type === TouchType.Up) {
            this.model.controller.changeIndex(index);
            offset = 0;
        }
        this.model.offset = this.offsetX;
        this.index = index;
        return index;
    }
}
namespace materialContainderTop {
    export class Model {
        controller: TabsController = new TabsController();
        snap: boolean = true;
        arr: Array<string> = [];
        icons: IconData[] = [];
        viewWidth: number = lpx2px(720);
        offset: number = 0;
        color: string = "#e76909";
        background: string = "#f1f5f3";
        fontColor: string = "#ffffff";
        hasIcon: boolean = false;
        cursorHeight: number = 3;
        textHeight: number = 45;
        dividerHeight: number = 2;
        cursorWidth: number = 80;
        textWidth: number = 80;
        height: number = this.dividerHeight + this.cursorHeight + this.textHeight;
        width: string = '100%';
        dividerColor: string = "#cb798d";
        selectedTextSize: number = 16;
        iconSize: number = 25;
        UnselectedTextColor: string = "#c5c8c8";
        UnselectedTextSize: number = 16;
        indexChange: (index: number) => void = () => { };
        clickListener: (index: number) => void = () => { };
        onPageTouch: (event: TouchEvent, currentIndex: number) => number = () => {
            return 0;
        };
        constructor(controller?: TabsController) {
            if (controller != undefined) {
                this.controller = controller;
            }
        }
        public notifyTouch(event: TouchEvent, index: number) {
            this.onPageTouch(event, index);
        }
        public getUnselectedTextSize(): number {
            return this.UnselectedTextSize;
        }
        public setUnselectedTextSize(UnselectedTextSize: number): Model {
            this.UnselectedTextSize = UnselectedTextSize;
            return this;
        }
        public getUnselectedTextColor(): string {
            return this.UnselectedTextColor;
        }
        public setUnselectedTextColor(UnselectedTextColor: string): Model {
            this.UnselectedTextColor = UnselectedTextColor;
            return this;
        }
        public getIcons(): IconData[] {
            return this.icons;
        }
        public setIcons(icons: IconData[]): Model {
            this.icons = icons;
            this.hasIcon = true;
            return this;
        }
        public getSize(): number {
            return this.iconSize;
        }
        public setSize(iconSize: number): Model {
            this.iconSize = iconSize;
            return this;
        }
        public setSelectTextSize(selectedTextSize: number): Model {
            this.selectedTextSize = selectedTextSize;
            return this;
        }
        public setDividerColor(dividerColor: string): Model {
            this.dividerColor = dividerColor;
            return this;
        }
        public setWidth(width: string): Model {
            this.width = width;
            return this;
        }
        public setCursorWidth(cursorWidth: number): Model {
            this.cursorWidth = cursorWidth;
            return this;
        }
        public setTextWidth(textWidth: number): Model {
            this.textWidth = textWidth;
            return this;
        }
        public setHeght(height: number): Model {
            this.height = height + this.dividerHeight + this.cursorHeight + this.textHeight;
            return this;
        }
        public setLineHeight(dividerHeight: number): Model {
            this.dividerHeight = dividerHeight;
            return this;
        }
        public setCursorHeight(cursorHeight: number): Model {
            this.cursorHeight = cursorHeight;
            return this;
        }
        public setTextHeight(textHeight: number): Model {
            this.textHeight = textHeight;
            return this;
        }
        public setSelectTextColor(fontColor: string): Model {
            this.fontColor = fontColor;
            return this;
        }
        public setBackgroundColor(background: string): Model {
            this.background = background;
            return this;
        }
        public setCursorColor(color: string): Model {
            this.color = color;
            return this;
        }
        public setSnap(snap: boolean): Model {
            this.snap = snap;
            return this;
        }
        public setOffset(offset: number): Model {
            this.offset = offset;
            return this;
        }
        public setArr(arr: Array<string> = []): Model {
            this.arr = arr;
            return this;
        }
        public setChangeListener(callback: (index: number) => void): Model {
            this.indexChange = callback;
            return this;
        }
        public setClickListener(callback: (index: number) => void): Model {
            this.clickListener = callback;
            return this;
        }
    }
}
export default materialContainderTop;
class TitleData {
    i: number;
    data: string;
    constructor(i: number, data: string) {
        this.i = i;
        this.data = data;
    }
}
class IconData {
    selected?: string | Resource;
    normal?: string | Resource;
    constructor(selected: string | Resource, normal: string | Resource) {
        this.selected = selected;
        this.normal = normal;
    }
}
