interface OverScrollDecor_Params {
    model?: OverScrollDecor.Model;
    child?: () => void;
    scroller?: Scroller;
    endOffsetY?;
    endOffsetX?;
    isBounceEffect?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "OverScrollDecor_" + ++__generate__Id;
}
class OverScrollDecor extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new SynchedPropertyObjectTwoWay(params.model, this, "model");
        this.child = undefined;
        this.scroller = new Scroller();
        this.endOffsetY = 0;
        this.endOffsetX = 0;
        this.isBounceEffect = true;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: OverScrollDecor_Params) {
        if (params.child !== undefined) {
            this.child = params.child;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.endOffsetY !== undefined) {
            this.endOffsetY = params.endOffsetY;
        }
        if (params.endOffsetX !== undefined) {
            this.endOffsetX = params.endOffsetX;
        }
        if (params.isBounceEffect !== undefined) {
            this.isBounceEffect = params.isBounceEffect;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: SynchedPropertySimpleOneWay<OverScrollDecor.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: OverScrollDecor.Model) {
        this.__model.set(newValue);
    }
    private __child?;
    private scroller: Scroller;
    private endOffsetY;
    private endOffsetX;
    private isBounceEffect;
    render() {
        If.create();
        if (this.model.mUpOverScroll) {
            If.branchId(0);
            If.create();
            if (this.model.mOrientation == OverScrollDecor.ORIENTATION.VERTICAL) {
                If.branchId(0);
                Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
                Flex.height(this.model.mHeight);
                Flex.width(this.model.mWidth);
                Scroll.create(this.scroller);
                Scroll.margin(this.model.mMargin);
                Scroll.scrollable(ScrollDirection.Vertical);
                Scroll.scrollBar(this.model.mScrollBar ? BarState.Auto : BarState.Off);
                Scroll.edgeEffect(this.model.mOverScrollBounceEffect ? EdgeEffect.Spring : EdgeEffect.None);
                Scroll.onScrollEdge((side: Edge) => {
                    if (side == Edge.Bottom) {
                        this.endOffsetY = this.scroller.currentOffset().yOffset;
                    }
                });
                Scroll.onScroll(() => {
                    this.model.mOffsetY = Math.floor(this.scroller.currentOffset().yOffset);
                    if (this.model.mOffsetY < 0) {
                        this.model.mOffsetY = -Math.floor(this.model.mOffsetY);
                        if (this.isBounceEffect) {
                            this.model.mTextColor = this.model.mDragColorTop;
                        }
                        else {
                            this.model.mTextColor = this.model.mBounceBackColorTop;
                        }
                        if (this.model.mOffsetY == 1) {
                            this.scroller.scrollTo({ xOffset: 0, yOffset: 0 });
                        }
                    }
                    else if (this.model.mOffsetY > this.endOffsetY && this.endOffsetY != 0) {
                        this.model.mOffsetY = Math.floor(this.endOffsetY - this.model.mOffsetY);
                        if (this.isBounceEffect) {
                            this.model.mTextColor = this.model.mDragColorBottom;
                        }
                        else {
                            this.model.mTextColor = this.model.mBounceBackColorBottom;
                        }
                    }
                    else {
                        this.model.mOffsetY = 0;
                        this.model.mTextColor = this.model.mClearColor;
                    }
                });
                Scroll.onTouch((event?: TouchEvent) => {
                    if (event == undefined) {
                        return;
                    }
                    if (event.type == TouchType.Down) {
                        this.isBounceEffect = true;
                    }
                    if (event.type == TouchType.Up) {
                        this.isBounceEffect = false;
                    }
                });
                If.create();
                if (this.child !== undefined) {
                    If.branchId(0);
                    this.child(this);
                }
                If.pop();
                Scroll.pop();
                Flex.pop();
            }
            else if (this.model.mOrientation == OverScrollDecor.ORIENTATION.HORIZONTAL) {
                If.branchId(1);
                Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
                Flex.height(this.model.mHeight);
                Flex.width(this.model.mWidth);
                Scroll.create(this.scroller);
                Scroll.margin(this.model.mMargin);
                Scroll.scrollable(ScrollDirection.Horizontal);
                Scroll.scrollBar(this.model.mScrollBar ? BarState.Auto : BarState.Off);
                Scroll.edgeEffect(this.model.mOverScrollBounceEffect ? EdgeEffect.Spring : EdgeEffect.None);
                Scroll.onScrollEdge((side: Edge) => {
                    if (side == Edge.Baseline) {
                        this.endOffsetX = this.scroller.currentOffset().xOffset;
                    }
                });
                Scroll.onScroll(() => {
                    this.model.mOffsetX = Math.floor(this.scroller.currentOffset().xOffset);
                    if (this.model.mOffsetX < 0) {
                        this.model.mOffsetX = -Math.floor(this.model.mOffsetX);
                        if (this.isBounceEffect) {
                            this.model.mTextColor = this.model.mDragColorLeft;
                        }
                        else {
                            this.model.mTextColor = this.model.mBounceBackColorLeft;
                        }
                        if (this.model.mOffsetX == 1) {
                            this.scroller.scrollTo({ xOffset: 0, yOffset: 0 });
                        }
                    }
                    else if (this.model.mOffsetX > this.endOffsetX && this.endOffsetX != 0) {
                        this.model.mOffsetX = Math.floor(this.endOffsetX - this.model.mOffsetX);
                        if (this.isBounceEffect) {
                            this.model.mTextColor = this.model.mDragColorRight;
                        }
                        else {
                            this.model.mTextColor = this.model.mBounceBackColorRight;
                        }
                    }
                    else {
                        this.model.mOffsetX = 0;
                        this.model.mTextColor = this.model.mClearColor;
                    }
                });
                Scroll.onTouch((event?: TouchEvent) => {
                    if (event === undefined) {
                        return;
                    }
                    if (event.type === TouchType.Down) {
                        this.isBounceEffect = true;
                    }
                    if (event.type === TouchType.Up) {
                        this.isBounceEffect = false;
                    }
                });
                If.create();
                if (this.child !== undefined) {
                    If.branchId(0);
                    this.child(this);
                }
                If.pop();
                Scroll.pop();
                Flex.pop();
            }
            If.pop();
        }
        else {
            If.branchId(1);
            Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
            Flex.height(this.model.mHeight);
            Flex.width(this.model.mWidth);
            Scroll.create(this.scroller);
            Scroll.margin(this.model.mMargin);
            Scroll.scrollable(ScrollDirection.None);
            If.create();
            if (this.child !== undefined) {
                If.branchId(0);
                this.child(this);
            }
            If.pop();
            Scroll.pop();
            Flex.pop();
        }
        If.pop();
    }
}
namespace OverScrollDecor {
    export enum ORIENTATION {
        VERTICAL = 0,
        HORIZONTAL = 1
    }
    export class Model {
        mHeight: number | string = px2vp(2340);
        mWidth: number | string = px2vp(lpx2px(720));
        mMargin: number = 16;
        //设置滚动方向
        mOrientation: ORIENTATION = 0;
        //是否需要滚动条
        mScrollBar: boolean = true;
        //是否需要滑动效果
        mOverScrollBounceEffect: boolean = false;
        //是否可以滑动
        mUpOverScroll: boolean = true;
        mOffsetY: number = 0;
        mOffsetX: number = 0;
        mTextColor: string = "#727171";
        mClearColor: string = "#727171";
        mDragColorLeft: string = "#ffaa66cc";
        mBounceBackColorLeft: string = "#ff33b5e5";
        mDragColorRight: string = "#ffff4444";
        mBounceBackColorRight: string = "#ffff8800";
        mDragColorTop: string = "#ffff4444";
        mBounceBackColorTop: string = "#ffff8800";
        mDragColorBottom: string = "#ffaa66cc";
        mBounceBackColorBottom: string = "#ff33b5e5";
        public getHeight(): number | string {
            return this.mHeight;
        }
        public setHeight(height: number | string): Model {
            this.mHeight = height;
            return this;
        }
        public getWidth(): number | string {
            return this.mWidth;
        }
        public setWidth(width: number | string): Model {
            this.mWidth = width;
            return this;
        }
        public getMargin(): number {
            return this.mMargin;
        }
        public setMargin(margin: number): Model {
            this.mMargin = margin;
            return this;
        }
        public getOrientation(): number {
            return this.mOrientation;
        }
        public setOrientation(orientation: number): Model {
            this.mOrientation = orientation;
            return this;
        }
        public isScrollBar(): boolean {
            return this.mScrollBar;
        }
        public setScrollBar(scrollBar: boolean): Model {
            this.mScrollBar = scrollBar;
            return this;
        }
        public isOverScrollBounceEffect(): boolean {
            return this.mOverScrollBounceEffect;
        }
        public setOverScrollBounceEffect(overScrollBounceEffect: boolean): Model {
            this.mOverScrollBounceEffect = overScrollBounceEffect;
            return this;
        }
        public isUpOverScroll(): boolean {
            return this.mUpOverScroll;
        }
        public setUpOverScroll(upOverScroll: boolean): Model {
            this.mUpOverScroll = upOverScroll;
            return this;
        }
        public getOffsetX(): number {
            return this.mOffsetX;
        }
        public setOffsetX(offsetX: number): Model {
            this.mOffsetX = offsetX;
            return this;
        }
        public getOffsetY(): number {
            return this.mOffsetY;
        }
        public setOffsetY(offsetY: number): Model {
            this.mOffsetY = offsetY;
            return this;
        }
        public getTextColor(): string {
            return this.mTextColor;
        }
        public setTextColor(textColor: string): Model {
            this.mTextColor = textColor;
            return this;
        }
        public getClearColor(): string {
            return this.mClearColor;
        }
        public setClearColor(clearColor: string): Model {
            this.mClearColor = clearColor;
            return this;
        }
        public getDragColorLeft(): string {
            return this.mDragColorLeft;
        }
        public setDragColorLeft(dragColorLeft: string): Model {
            this.mDragColorLeft = dragColorLeft;
            return this;
        }
        public getBounceBackColorLeft(): string {
            return this.mBounceBackColorLeft;
        }
        public setBounceBackColorLeft(bounceBackColorLeft: string): Model {
            this.mBounceBackColorLeft = bounceBackColorLeft;
            return this;
        }
        public getDragColorRight(): string {
            return this.mDragColorRight;
        }
        public setDragColorRight(dragColorRight: string): Model {
            this.mDragColorRight = dragColorRight;
            return this;
        }
        public getBounceBackColorRight(): string {
            return this.mBounceBackColorRight;
        }
        public setBounceBackColorRight(bounceBackColorRight: string): Model {
            this.mBounceBackColorRight = bounceBackColorRight;
            return this;
        }
        public getDragColorTop(): string {
            return this.mDragColorTop;
        }
        public setDragColorTop(dragColorTop: string): Model {
            this.mDragColorTop = dragColorTop;
            return this;
        }
        public getBounceBackColorTop(): string {
            return this.mBounceBackColorTop;
        }
        public setBounceBackColorTop(bounceBackColorTop: string): Model {
            this.mBounceBackColorTop = bounceBackColorTop;
            return this;
        }
        public getDragColorBottom(): string {
            return this.mDragColorBottom;
        }
        public setDragColorBottom(dragColorBottom: string): Model {
            this.mDragColorBottom = dragColorBottom;
            return this;
        }
        public getBounceBackColorBottom(): string {
            return this.mBounceBackColorBottom;
        }
        public setBounceBackColorBottom(bounceBackColorBottom: string): Model {
            this.mBounceBackColorBottom = bounceBackColorBottom;
            return this;
        }
    }
}
export default OverScrollDecor;
