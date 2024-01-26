interface SmartRefreshForTaurus_Params {
    model?: SmartRefreshForTaurus.Model;
    header?: () => void;
    main?: () => void;
    needScroller?: boolean;
    footer?: () => void;
    headerIsVisibleLoadMore?: boolean;
    footerIsVisibleLoadMore?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SmartRefreshForTaurus_" + ++__generate__Id;
}
class SmartRefreshForTaurus extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new SynchedPropertyObjectTwoWay(params.model, this, "model");
        this.header = undefined;
        this.main = undefined;
        this.__needScroller = new ObservedPropertySimple(false, this, "needScroller");
        this.footer = undefined;
        this.__headerIsVisibleLoadMore = new ObservedPropertySimple(true, this, "headerIsVisibleLoadMore");
        this.__footerIsVisibleLoadMore = new ObservedPropertySimple(false, this, "footerIsVisibleLoadMore");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SmartRefreshForTaurus_Params) {
        if (params.header !== undefined) {
            this.header = params.header;
        }
        if (params.main !== undefined) {
            this.main = params.main;
        }
        if (params.needScroller !== undefined) {
            this.needScroller = params.needScroller;
        }
        if (params.footer !== undefined) {
            this.footer = params.footer;
        }
        if (params.headerIsVisibleLoadMore !== undefined) {
            this.headerIsVisibleLoadMore = params.headerIsVisibleLoadMore;
        }
        if (params.footerIsVisibleLoadMore !== undefined) {
            this.footerIsVisibleLoadMore = params.footerIsVisibleLoadMore;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__needScroller.aboutToBeDeleted();
        this.__headerIsVisibleLoadMore.aboutToBeDeleted();
        this.__footerIsVisibleLoadMore.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: SynchedPropertySimpleOneWay<SmartRefreshForTaurus.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: SmartRefreshForTaurus.Model) {
        this.__model.set(newValue);
    }
    private __header?;
    private __main?;
    private __needScroller: ObservedPropertySimple<boolean>;
    get needScroller() {
        return this.__needScroller.get();
    }
    set needScroller(newValue: boolean) {
        this.__needScroller.set(newValue);
    }
    private __footer?;
    private __headerIsVisibleLoadMore: ObservedPropertySimple<boolean>;
    get headerIsVisibleLoadMore() {
        return this.__headerIsVisibleLoadMore.get();
    }
    set headerIsVisibleLoadMore(newValue: boolean) {
        this.__headerIsVisibleLoadMore.set(newValue);
    }
    private __footerIsVisibleLoadMore: ObservedPropertySimple<boolean>;
    get footerIsVisibleLoadMore() {
        return this.__footerIsVisibleLoadMore.get();
    }
    set footerIsVisibleLoadMore(newValue: boolean) {
        this.__footerIsVisibleLoadMore.set(newValue);
    }
    aboutToAppear() {
        if (this.model.initRefreshing) { //初始化刷新  头部允许刷新
            this.scrollerInit();
        }
    }
    refreshClose() {
        this.needScroller = true;
        this.model.refreshState = SmartRefreshForTaurus.REFRESHSTATE.NONE;
    }
    render() {
        Column.create();
        Stack.create({ alignContent: Alignment.Top });
        Scroll.create(this.model.scroller);
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.scrollBar(BarState.On);
        Scroll.onScrollEdge((side: Edge) => {
            if (side == 0) { //滑动到顶部
                this.model.refreshHeaderCallbackState = true;
                this.model.refreshBottomCallbackState = false;
                this.model.scrollLocation = SmartRefreshForTaurus.LOCATION.HEAD;
            }
            if (side == 2) { //滑动到底部
                if (this.model.dragArriveBottomEdgeState) {
                    this.model.dragArriveBottomEdgeState = false;
                    this.model.refreshBottomCallbackState = true;
                    this.model.refreshHeaderCallbackState = false;
                    this.model.firstArriveBottomEdgeOffsetY = (this.model.scroller.currentOffset().yOffset + this.model.tempTitleHeight);
                }
                this.model.scrollLocation = SmartRefreshForTaurus.LOCATION.FOOT;
            }
        });
        Scroll.onScroll((xOffset: number, yOffset: number) => {
            if (this.model.fixedContent != this.model.oldFixedContent) { //内容固定
                this.needScroller = true;
                this.model.oldFixedContent = this.model.fixedContent;
            }
            this.model.latestYOffset = this.model.scroller.currentOffset().yOffset;
        });
        Scroll.onScrollEnd(() => {
            if (this.model.scrollerEndState) {
                this.model.scrollerEndState = false;
                this.model.scroller.scrollTo({
                    xOffset: 0,
                    yOffset: this.model.scrollerEndYOffset,
                    animation: { duration: 10, curve: Curve.Ease }
                });
            }
        });
        Scroll.onTouch((event: TouchEvent) => this.touchEventFunction(event));
        Column.create();
        Column.width('100%');
        If.create();
        if (this.model.expand) {
            If.branchId(0);
            Flex.create({ alignItems: ItemAlign.End });
            Flex.height(this.model.tempTitleHeight);
            Flex.backgroundColor(this.model.backgroundColor);
            Text.create(this.model.titleName);
            Text.width('100%');
            Text.fontColor(this.model.accentColor);
            Text.padding(30);
            Text.fontSize(55);
            Text.pop();
            Flex.pop();
        }
        If.pop();
        If.create();
        if (this.needScroller) { //重置Scroller
            If.branchId(0);
            Text.create("0");
            Text.visibility(Visibility.None);
            Text.pop();
        }
        else {
            If.branchId(1);
            Text.create("1");
            Text.visibility(Visibility.None);
            Text.pop();
        }
        If.pop();
        If.create();
        if (this.header && this.model.headerIsRefresh) {
            If.branchId(0);
            If.create();
            if (this.model.fixedContent && !this.model.flyRefreshHeaderIsShow) {
                If.branchId(0);
                Flex.create();
                Flex.height(this.model.headerHeight);
                Flex.zIndex(this.model.zHeaderIndex);
                Flex.backgroundColor(this.model.getBackgroundShadowColor());
                Flex.visibility(this.headerIsVisibleLoadMore ? Visibility.Visible : Visibility.None);
                this.header(this);
                Flex.pop();
            }
            If.pop();
        }
        If.pop();
        If.create();
        if (this.main) {
            If.branchId(0);
            Flex.create();
            Flex.zIndex(this.model.zMainIndex);
            this.main(this);
            Flex.pop();
        }
        If.pop();
        If.create();
        if (this.footer && this.model.footerIsRefresh) {
            If.branchId(0);
            Flex.create();
            Flex.height(this.model.footerHeight);
            Flex.zIndex(this.model.zFooterIndex);
            Flex.backgroundColor(this.model.getBackgroundShadowColor());
            Flex.visibility(this.footerIsVisibleLoadMore ? Visibility.Visible : Visibility.None);
            this.footer(this);
            Flex.pop();
        }
        If.pop();
        Column.pop();
        Scroll.pop();
        Stack.pop();
        Column.pop();
    }
    scrollerInit() {
        this.headerIsVisibleLoadMore = true;
        this.model.headerHeight = this.model.initHeaderHeight;
        this.model.refreshState = SmartRefreshForTaurus.REFRESHSTATE.REFRESHING;
        this.model.scroller.scrollTo({
            xOffset: 0,
            yOffset: 0,
            animation: { duration: 10, curve: Curve.Ease }
        });
        if (this.model.refreshHeaderCallback) { //初始化刷新的回调
            this.model.refreshHeaderCallback();
        }
        this.model.refreshTimeOut = setTimeout(() => {
            this.headerIsVisibleLoadMore = false;
            this.refreshClose();
            this.closeHeaderRefresh(); //关闭头部刷新效果
            this.model.refreshTimeOut = 0;
        }, this.model.refreshDuration);
    }
    scrollerEventFunction() {
        if (this.model.scrollLocation == SmartRefreshForTaurus.LOCATION.HEAD && this.needScroller) {
            this.closeHeaderRefresh();
            this.needScroller = false;
            this.model.scrollerEndYOffset = 0;
            this.model.scrollerEndState = true;
            this.model.scroller.scrollTo({
                xOffset: 0,
                yOffset: 0,
                animation: { duration: this.model.toRefreshDuration, curve: Curve.Ease }
            });
        }
        else if (this.model.scrollLocation == SmartRefreshForTaurus.LOCATION.FOOT && this.needScroller) {
            this.needScroller = false;
            this.closeFooterRefresh();
            this.model.scrollerEndYOffset = this.model.firstArriveBottomEdgeOffsetY;
            this.model.scrollerEndState = true;
            this.model.scroller.scrollTo({
                xOffset: 0,
                yOffset: this.model.firstArriveBottomEdgeOffsetY,
                animation: { duration: this.model.toRefreshDuration, curve: Curve.Ease }
            });
        }
    }
    //滚动结束，关闭刷新
    closeHeaderRefresh() {
        this.model.refreshHeaderCallbackState = true;
        this.model.refreshBottomCallbackState = false;
        clearInterval(this.model.headerRefreshId);
        this.model.headerRefreshId = -1;
    }
    closeFooterRefresh() {
        this.model.refreshHeaderCallbackState = false;
        this.model.refreshBottomCallbackState = true;
        clearInterval(this.model.bottomRefreshId);
        this.model.bottomRefreshId = -1;
    }
    // touch事件
    touchEventFunction(event: TouchEvent) {
        switch (event.type) {
            case TouchType.Down: // 手指按下
                this.model.headerHeight = 10;
                this.model.initScrollerYOffset = this.model.scroller.currentOffset().yOffset;
                this.model.scrollToEdgeStatus = true;
                // 记录按下的y坐标
                this.model.downY = event.touches[0].y;
                break;
            case TouchType.Move: // 手指移动
                this.model.currentMouseX = event.touches[0].screenX;
                this.model.downYOffset = event.touches[0].y - this.model.downY;
                //记录拖拽方向
                this.model.dragDirection = this.model.downYOffset > 0 ? true : false;
                if (this.model.dragDirection) {
                    if (this.model.downYOffset > this.model.initScrollerYOffset) {
                        this.headerIsVisibleLoadMore = true;
                        this.footerIsVisibleLoadMore = false;
                    }
                    if (this.model.refreshHeaderCallbackState) {
                        this.model.refreshHeaderCallbackState = false;
                        this.model.refreshHeaderCallback();
                    }
                    this.dragDownDirection_Move(event);
                }
                else { // 尾部刷新
                    if (this.model.firstArriveBottomEdgeOffsetY == 0 || this.model.scrollLocation != SmartRefreshForTaurus.LOCATION.FOOT) { //第一次进入，高度为默认高度0
                        this.headerIsVisibleLoadMore = false;
                        this.footerIsVisibleLoadMore = false;
                    }
                    else {
                        if (Math.abs(this.model.downYOffset) > (this.model.firstArriveBottomEdgeOffsetY - this.model.initScrollerYOffset)) {
                            this.headerIsVisibleLoadMore = false;
                            this.footerIsVisibleLoadMore = true;
                        }
                    }
                    if (this.model.refreshBottomCallbackState) {
                        this.model.refreshBottomCallbackState = false;
                        this.model.refreshBottomCallback();
                    }
                    this.dragUpDirection_Move(event);
                }
                break;
            case TouchType.Up: // 手指抬起
                this.model.downYOffset = event.touches[0].y - this.model.downY;
                if (this.model.downYOffset > 0) {
                    this.dragDownDirection_UP(this.model.downYOffset);
                }
                else if (this.model.downYOffset < 0) {
                    this.dragUpDirection_UP(Math.abs(this.model.downYOffset));
                }
                break;
            case TouchType.Cancel:
        }
    }
    dragUpDirection_Move(event: TouchEvent) {
        let dragOffsetY = Math.abs(event.touches[0].y - this.model.downY);
        if (this.model.footerHeight < this.model.initFooterHeight && this.model.refreshState != SmartRefreshForTaurus.REFRESHSTATE.REFRESHING) {
            this.model.footerHeight = dragOffsetY;
        }
        else {
            if (this.model.refreshState != SmartRefreshForTaurus.REFRESHSTATE.REFRESHING
                && (this.model.downY - event.touches[0].y) > 0 && dragOffsetY > this.model.initFooterHeight) { //非刷新状态上拉
                this.model.footerHeight = this.model.initFooterHeight + (Math.pow(dragOffsetY - this.model.initFooterHeight, 0.8));
                this.model.refreshState = SmartRefreshForTaurus.REFRESHSTATE.TOREFRESH;
            }
            if (this.model.refreshState == SmartRefreshForTaurus.REFRESHSTATE.REFRESHING && dragOffsetY > 0) { //刷新状态下拉
                this.model.footerHeight = this.model.initFooterHeight + (Math.pow(dragOffsetY, 0.8));
            }
        }
    }
    dragUpDirection_UP(downYOffsetParam: number) {
        if (this.model.refreshState != SmartRefreshForTaurus.REFRESHSTATE.NONE) {
            if (this.model.refreshState == SmartRefreshForTaurus.REFRESHSTATE.TOREFRESH) {
                if (downYOffsetParam <= this.model.initFooterHeight / 2) { //未下滑到指定位置则不刷新
                    this.footerIsVisibleLoadMore = false; //小于尾部固定高度时，则隐藏尾部
                    this.refreshClose();
                    this.closeFooterRefresh();
                }
                else if (!this.model.dragArriveBottomEdgeState) {
                    this.model.footerHeight = this.model.initFooterHeight; //重置尾部高度
                    // this.model.scroller.scrollEdge(Edge.Bottom)
                    this.model.scroller.scrollTo({
                        xOffset: 0,
                        yOffset: (this.model.firstArriveBottomEdgeOffsetY + this.model.tempTitleHeight),
                        animation: { duration: this.model.toRefreshDuration, curve: Curve.Ease }
                    });
                    this.model.scrollerEndYOffset = (this.model.firstArriveBottomEdgeOffsetY + this.model.tempTitleHeight);
                    this.model.scrollerEndState = true;
                    this.model.refreshState = SmartRefreshForTaurus.REFRESHSTATE.REFRESHING; //更改为刷新态
                    if (this.model.refreshTimeOut == 0) {
                        this.model.refreshTimeOut = setTimeout(() => {
                            this.footerIsVisibleLoadMore = false;
                            this.refreshClose();
                            this.closeFooterRefresh();
                            this.model.refreshTimeOut = 0;
                        }, this.model.refreshDuration);
                    }
                }
            }
            else if (this.model.refreshState == SmartRefreshForTaurus.REFRESHSTATE.REFRESHING) {
                this.model.footerHeight = this.model.initFooterHeight; //重置尾部高度
            }
        }
    }
    dragDownDirection_Move(event: TouchEvent) {
        switch (this.model.refreshState) {
            case SmartRefreshForTaurus.REFRESHSTATE.NONE:
                this.model.refreshState = SmartRefreshForTaurus.REFRESHSTATE.TOREFRESH;
                break;
            case SmartRefreshForTaurus.REFRESHSTATE.TOREFRESH:
                let dragOffsetY = Math.abs(event.touches[0].y - this.model.downY);
                if (this.model.headerHeight <= this.model.initHeaderHeight) {
                    this.model.headerHeight = dragOffsetY;
                }
                if ((event.touches[0].y - this.model.downY) > this.model.initHeaderHeight) { //下拉超过默认值
                    //下拉超出初始范围
                    this.model.headerHeight = this.model.initHeaderHeight + (Math.pow(event.touches[0].y - this.model.downY - this.model.initHeaderHeight, 0.8));
                }
                this.model.refreshState = SmartRefreshForTaurus.REFRESHSTATE.TOREFRESH;
                break;
            case SmartRefreshForTaurus.REFRESHSTATE.REFRESHING:
                if ((event.touches[0].y - this.model.downY) > 0) { //刷新状态下拉
                    this.model.headerHeight = this.model.initHeaderHeight + (Math.pow(event.touches[0].y - this.model.downY, 0.8));
                }
                break;
            default:
        }
    }
    dragDownDirection_UP(downYOffsetParam: number) {
        if (this.model.refreshState != SmartRefreshForTaurus.REFRESHSTATE.NONE) {
            if (this.model.refreshState == SmartRefreshForTaurus.REFRESHSTATE.TOREFRESH) {
                if (this.model.headerHeight < this.model.initHeaderHeight) { //未下滑到指定位置则不刷新(头部高度小于默认高度)
                    this.headerIsVisibleLoadMore = false; //小于头部固定高度时，则隐藏头部
                    this.refreshClose();
                }
                else {
                    this.model.headerHeight = this.model.initHeaderHeight; //重置头部高度
                    this.model.scroller.scrollEdge(Edge.Start); //刷新，滑动至头部
                    this.model.scrollerEndYOffset = 0;
                    this.model.scrollerEndState = true;
                    this.model.refreshState = SmartRefreshForTaurus.REFRESHSTATE.REFRESHING; //更改为刷新态
                    if (this.model.refreshTimeOut == 0) {
                        this.model.refreshTimeOut = setTimeout(() => {
                            this.headerIsVisibleLoadMore = false;
                            this.refreshClose();
                            this.closeHeaderRefresh();
                            this.model.refreshTimeOut = 0;
                        }, this.model.refreshDuration);
                    }
                }
            }
            else if (this.model.refreshState == SmartRefreshForTaurus.REFRESHSTATE.REFRESHING) {
                this.model.headerHeight = this.model.initHeaderHeight; //重置头部高度
            }
        }
    }
}
namespace SmartRefreshForTaurus {
    export enum LOCATION {
        HEAD = 0,
        MIDDER = 1,
        FOOT = 2
    }
    export enum REFRESHSTATE {
        NONE = 0,
        TOREFRESH = 1,
        REFRESHING = 2
    }
    export enum RefreshPositionEnum {
        TOP = 0,
        BOTTOM = 1,
        TOPANDBOTTOM = 2
    }
    export class Model {
        scroller: Scroller = new Scroller();
        headerHeight: number = 1; //实际头部高度
        initHeaderHeight: number = 210; //标准头部高度
        downY: number = 0;
        currentMouseX: number = 0; //获取下拉中鼠标的X轴坐标
        scrollLocation: LOCATION = LOCATION.HEAD;
        refreshDuration: number = 5000; //刷新态持续时间
        toRefreshDuration: number = 250; //
        refreshTimeOut: number = 0;
        refreshInterval: number = 0;
        initRefreshing: boolean = true;
        latestYOffset: number = 0;
        refreshState: REFRESHSTATE = REFRESHSTATE.NONE; //刷新状态
        zHeaderIndex: number = 2; //首部zIndex
        zMainIndex: number = 2;
        zFooterIndex: number = 2;
        backgroundColor: Color | string | number = Color.Gray; //主题色
        lastRefreshTime: Date = new Date(); //上次刷新时间
        refreshCallback: () => void = () => { }; //刷新时的回调
        refreshHeaderCallback: () => void = () => { }; //刷新时的回调
        refreshHeaderCallbackState: boolean = true;
        refreshBottomCallback: () => void = () => { }; //刷新时的回调
        refreshBottomCallbackState: boolean = false;
        //waveSwipe
        downYOffset = 0;
        fixedContent: boolean = true;
        oldFixedContent: boolean = true;
        waterDropYTopCoordinate = 0;
        waterDropYMiddleCoordinate = 400; //
        waterDropYBottomCoordinate = 600; //
        //class
        timeShowState: boolean = true;
        headerRefreshId: number = 0;
        bottomRefreshId: number = 0;
        backgroundShadowColor: Color = Color.Gray;
        //bottom
        footerHeight: number = 210; //实际头部高度
        initFooterHeight: number = 210;
        firstArriveBottomEdgeOffsetY: number = 0;
        dragArriveBottomEdgeState: boolean = true;
        dragDirection: boolean = true; //true：下拉  false上拉
        scrollToEdgeStatus: boolean = false; //滚动事件是否结束
        initScrollerYOffset: number = 0;
        tempTitleHeight: number = this.initHeaderHeight;
        tempDownY: number = -1;
        titleName: string = '';
        expand: boolean = false;
        flyRefreshHeaderIsShow: boolean = false;
        scrollerEndYOffset: number = 0; //和scrollerEndState结合使用
        scrollerEndState: boolean = false; //和scrollerEndYOffset结合使用
        refreshPosition: RefreshPositionEnum = RefreshPositionEnum.TOPANDBOTTOM;
        headerIsRefresh: boolean = true;
        footerIsRefresh: boolean = true;
        accentColor: Color = Color.White;
        setAccentColor(accentColor: Color): Model {
            this.accentColor = accentColor;
            return this;
        }
        getDownYOffset(): number {
            return this.downYOffset;
        }
        setExpand(expand: boolean): Model {
            this.expand = expand;
            return this;
        }
        setTitleName(titleName: string) {
            this.titleName = titleName;
            return this;
        }
        setZHeaderIndex(zHeaderIndex: number): Model {
            this.zHeaderIndex = zHeaderIndex;
            return this;
        }
        setZFooterHeight(zFooterIndex: number): Model {
            this.zFooterIndex = zFooterIndex;
            return this;
        }
        setZMainIndex(zMainIndex: number): Model {
            this.zMainIndex = zMainIndex;
            return this;
        }
        setFooterHeight(footerHeight: number): Model {
            this.footerHeight = footerHeight;
            return this;
        }
        setCurrentMouseX(currentMouseX: number): Model {
            this.currentMouseX = currentMouseX;
            return this;
        }
        getCurrentMouseX(): number {
            return this.currentMouseX;
        }
        getBackgroundShadowColor(): Color {
            return this.backgroundShadowColor;
        }
        setBackgroundShadowColor(backgroundShadowColor: Color): Model {
            this.backgroundShadowColor = backgroundShadowColor;
            return this;
        }
        getHeaderRefreshId(): number {
            return this.headerRefreshId;
        }
        setHeaderRefreshId(headerRefreshId: number): Model {
            this.headerRefreshId = headerRefreshId;
            return this;
        }
        getTimeShowState(): boolean {
            return this.timeShowState;
        }
        setTimeShowState(timeShowState: boolean): Model {
            this.timeShowState = timeShowState;
            return this;
        }
        getRefreshPosition(): RefreshPositionEnum {
            return this.refreshPosition;
        }
        setRefreshPosition(refreshPosition: RefreshPositionEnum): Model {
            this.refreshPosition = refreshPosition;
            if (this.refreshPosition.valueOf() == 0) {
                this.headerIsRefresh = true;
                this.footerIsRefresh = false;
            }
            if (this.refreshPosition.valueOf() == 1) {
                this.headerIsRefresh = false;
                this.footerIsRefresh = true;
            }
            if (this.refreshPosition.valueOf() == 2) {
                this.headerIsRefresh = true;
                this.footerIsRefresh = true;
            }
            return this;
        }
        getFixedContent(): boolean {
            return this.fixedContent;
        }
        setFixedContent(fixedContent: boolean): Model {
            this.fixedContent = fixedContent;
            return this;
        }
        getOffset(): number {
            if (this.headerHeight > this.initHeaderHeight) {
                return this.headerHeight / this.initHeaderHeight;
            }
            else {
                return (this.headerHeight - this.latestYOffset) / this.initHeaderHeight;
            }
        }
        getLastRefreshTime(): Date {
            return this.lastRefreshTime;
        }
        setBackgroundColor(color: Color | string | number): Model {
            this.backgroundColor = color;
            return this;
        }
        setRefreshCallback(callback: () => void): Model {
            this.refreshHeaderCallback = callback;
            return this;
        }
        setRefreshHeaderCallback(callback: () => void): Model {
            this.refreshHeaderCallback = callback;
            return this;
        }
        setRefreshBottomCallback(callback: () => void): Model {
            this.refreshBottomCallback = callback;
            return this;
        }
        getBackgroundColor(): Color | string | number {
            return this.backgroundColor;
        }
        setNoInit(initRefreshing: boolean): Model {
            this.initRefreshing = initRefreshing;
            return this;
        }
        setToRefreshDuration(toRefreshDuration: number): Model {
            this.toRefreshDuration = toRefreshDuration;
            return this;
        }
        getToRefreshDuration(): number {
            return this.toRefreshDuration;
        }
        setRefreshDuration(refreshDuration: number): Model {
            this.refreshDuration = refreshDuration;
            return this;
        }
        getRefreshDuration(): number {
            return this.refreshDuration;
        }
        setInitFooterHeight(initFooterHeight: number): Model {
            this.initFooterHeight = initFooterHeight;
            return this;
        }
        getInitFooterHeight(): number {
            return this.initFooterHeight;
        }
        setInitHeaderHeight(initHeaderHeight: number): Model {
            this.initHeaderHeight = initHeaderHeight;
            return this;
        }
        getInitHeaderHeight(): number {
            return this.initHeaderHeight;
        }
        setHeaderHeight(headerHeight: number): Model {
            this.headerHeight = headerHeight;
            return this;
        }
        getHeaderHeight(): number {
            return this.headerHeight;
        }
    }
}
export default SmartRefreshForTaurus;
