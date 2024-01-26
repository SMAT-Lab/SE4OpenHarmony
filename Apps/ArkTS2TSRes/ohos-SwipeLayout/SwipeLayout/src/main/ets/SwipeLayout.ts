interface SwipeLayout_Params {
    mDuration?;
    surfaceView?: ESObject;
    bottomViewRight?: ESObject;
    bottomViewLeft?: ESObject;
    bottomViewTop?: ESObject;
    bottomViewBottom?: ESObject;
    sX?: number;
    sY?: number;
    mWidth?;
    mHeight?;
    bottomViewRightW?: number;
    bottomViewLeftW?: number;
    offsetX?: number;
    offsetY?: number;
    rightSlideEnable?;
    leftSlideEnable?;
    previousX?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SwipeLayout_" + ++__generate__Id;
}
export class SwipeLayout extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.mDuration = 200;
        this.surfaceView = undefined;
        this.bottomViewRight = undefined;
        this.bottomViewLeft = undefined;
        this.bottomViewTop = undefined;
        this.bottomViewBottom = undefined;
        this.sX = 0;
        this.sY = 0;
        this.mWidth = '100%';
        this.mHeight = 180;
        this.bottomViewRightW = 180;
        this.bottomViewLeftW = 180;
        this.__offsetX = new ObservedPropertySimple(0, this, "offsetX");
        this.__offsetY = new ObservedPropertySimple(0, this, "offsetY");
        this.rightSlideEnable = true;
        this.leftSlideEnable = true;
        this.previousX = 0;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SwipeLayout_Params) {
        if (params.mDuration !== undefined) {
            this.mDuration = params.mDuration;
        }
        if (params.surfaceView !== undefined) {
            this.surfaceView = params.surfaceView;
        }
        if (params.bottomViewRight !== undefined) {
            this.bottomViewRight = params.bottomViewRight;
        }
        if (params.bottomViewLeft !== undefined) {
            this.bottomViewLeft = params.bottomViewLeft;
        }
        if (params.bottomViewTop !== undefined) {
            this.bottomViewTop = params.bottomViewTop;
        }
        if (params.bottomViewBottom !== undefined) {
            this.bottomViewBottom = params.bottomViewBottom;
        }
        if (params.sX !== undefined) {
            this.sX = params.sX;
        }
        if (params.sY !== undefined) {
            this.sY = params.sY;
        }
        if (params.mWidth !== undefined) {
            this.mWidth = params.mWidth;
        }
        if (params.mHeight !== undefined) {
            this.mHeight = params.mHeight;
        }
        if (params.bottomViewRightW !== undefined) {
            this.bottomViewRightW = params.bottomViewRightW;
        }
        if (params.bottomViewLeftW !== undefined) {
            this.bottomViewLeftW = params.bottomViewLeftW;
        }
        if (params.offsetX !== undefined) {
            this.offsetX = params.offsetX;
        }
        if (params.offsetY !== undefined) {
            this.offsetY = params.offsetY;
        }
        if (params.rightSlideEnable !== undefined) {
            this.rightSlideEnable = params.rightSlideEnable;
        }
        if (params.leftSlideEnable !== undefined) {
            this.leftSlideEnable = params.leftSlideEnable;
        }
        if (params.previousX !== undefined) {
            this.previousX = params.previousX;
        }
    }
    aboutToBeDeleted() {
        this.__offsetX.aboutToBeDeleted();
        this.__offsetY.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private mDuration;
    private __surfaceView;
    private __bottomViewRight;
    private __bottomViewLeft;
    private __bottomViewTop;
    private __bottomViewBottom;
    private sX: number;
    private sY: number;
    private mWidth;
    private mHeight;
    private bottomViewRightW: number;
    private bottomViewLeftW: number;
    private __offsetX: ObservedPropertySimple<number>;
    get offsetX() {
        return this.__offsetX.get();
    }
    set offsetX(newValue: number) {
        this.__offsetX.set(newValue);
    }
    private __offsetY: ObservedPropertySimple<number>;
    get offsetY() {
        return this.__offsetY.get();
    }
    set offsetY(newValue: number) {
        this.__offsetY.set(newValue);
    }
    private rightSlideEnable;
    private leftSlideEnable;
    private previousX;
    render() {
        Column.create();
        Column.width(this.mWidth);
        Column.position({ x: this.offsetX, y: this.offsetY });
        ColumnSplit.create();
        ColumnSplit.position({ x: 0, y: -this.mHeight });
        ColumnSplit.onTouch((event: TouchEvent) => {
            if (event.type === TouchType.Down) {
                this.sX = event.touches[0].screenX;
                this.sY = event.touches[0].screenY;
            }
            if (event.type === TouchType.Move) {
                let moveX = event.touches[0].screenX - this.sX;
                let moveY = event.touches[0].screenY - this.sY;
                if (Math.abs(moveX) < Math.abs(moveY)) { //纵向滑动
                    if (moveY < 0) { //上滑
                        //顶侧菜单开始关闭
                        if (this.offsetY > 0) {
                            if (this.mHeight - Math.abs(moveY) >= 0) {
                                this.offsetY = this.mHeight + moveY;
                                return;
                            }
                        }
                    }
                }
            }
            if (event.type === TouchType.Up) {
                let moveY = event.touches[0].screenY - this.sY;
                Context.animateTo({
                    duration: this.mDuration,
                    tempo: 1,
                    curve: Curve.FastOutLinearIn,
                    iterations: 1,
                    playMode: PlayMode.Normal, // 动画模式
                }, () => {
                    if (this.offsetY > 0) {
                        if (Math.abs(moveY) >= 20) {
                            this.offsetY = 0;
                        }
                        else {
                            this.offsetY = this.mHeight;
                        }
                    }
                });
            }
        });
        this.bottomViewTop(this);
        ColumnSplit.pop();
        Row.create();
        ColumnSplit.create();
        ColumnSplit.position({ x: -this.bottomViewLeftW, y: 0 });
        this.bottomViewLeft(this);
        ColumnSplit.pop();
        ColumnSplit.create();
        ColumnSplit.onTouch((event: TouchEvent) => {
            if (event.type === TouchType.Down) {
                this.sX = event.touches[0].screenX;
                this.sY = event.touches[0].screenY;
            }
            if (event.type === TouchType.Move) {
                let moveX = event.touches[0].screenX - this.sX;
                let moveY = event.touches[0].screenY - this.sY;
                if (Math.abs(moveX) > Math.abs(moveY)) { // 横向滑动
                    if (this.offsetY == 0) {
                        if (moveX < 0 && moveY < 30 && moveY > -30) { //左滑
                            //左侧菜单处于打开状态，开始关闭
                            if (this.offsetX > 0) {
                                this.rightSlideEnable = false;
                                if (-moveX < this.bottomViewLeftW) {
                                    this.offsetX = moveX + this.bottomViewLeftW;
                                }
                                else {
                                    this.offsetX = 0;
                                }
                                return;
                            }
                            //当前移动距离小于右侧View的宽度，并且没有处于刚好拉出的状态
                            if (this.rightSlideEnable) {
                                if (this.offsetX <= 0 && this.offsetX > -this.bottomViewRightW && -moveX <= this.bottomViewRightW) {
                                    this.offsetX = moveX;
                                }
                                else if (-moveX > this.bottomViewRightW) {
                                    this.offsetX = -this.bottomViewRightW;
                                    this.sX = event.touches[0].screenX;
                                    this.leftSlideEnable = false;
                                }
                            }
                        }
                        else if (moveX > 0 && moveY < 30 && moveY > -30) { //右滑
                            //右侧菜单开始关闭
                            if (this.offsetX < 0) {
                                this.leftSlideEnable = false;
                                if (moveX <= this.bottomViewRightW) {
                                    this.offsetX = moveX - this.bottomViewRightW;
                                    return;
                                }
                                else {
                                    this.offsetX = 0;
                                }
                            }
                            //当前移动距离小于左侧View的宽度  并且没有处于刚好拉出的状态
                            if (this.leftSlideEnable) {
                                if (this.offsetX >= 0 && this.offsetX < this.bottomViewLeftW && moveX <= this.bottomViewLeftW) {
                                    this.offsetX = moveX;
                                }
                                else if (moveX > this.bottomViewRightW) {
                                    this.offsetX = this.bottomViewLeftW;
                                    this.sX = event.touches[0].screenX;
                                    this.rightSlideEnable = false;
                                }
                            }
                        }
                    }
                }
                else { //纵向滑动
                    if (this.offsetX == 0) {
                        if (moveY > 0) { //下滑
                            //底部菜单开始关闭
                            if (this.offsetY < 0) {
                                if (moveY - this.mHeight <= 0) {
                                    this.offsetY = moveY - this.mHeight;
                                    return;
                                }
                            }
                            //当前移动距离小于右侧View的宽度，并且没有处于刚好拉出的状态
                            if (this.offsetY < this.mHeight) {
                                this.offsetY = moveY;
                            }
                            else {
                                this.offsetY = this.mHeight;
                            }
                        }
                        else if (moveY < 0) { //上滑
                            //顶侧菜单开始关闭
                            if (this.offsetY > 0) {
                                if (this.mHeight - Math.abs(moveY) <= 0) {
                                    this.offsetY = this.mHeight - moveY;
                                    return;
                                }
                            }
                            //当前移动距离小于左侧View的宽度  并且没有处于刚好拉出的状态
                            if (Math.abs(this.offsetY) < this.mHeight) {
                                this.offsetY = moveY;
                            }
                            else {
                                this.offsetY = -this.mHeight;
                            }
                        }
                    }
                }
                this.previousX = event.touches[0].screenX;
            }
            if (event.type === TouchType.Up) {
                let moveX = event.touches[0].screenX - this.sX;
                let moveY = event.touches[0].screenY - this.sY;
                Context.animateTo({
                    duration: this.mDuration,
                    tempo: 1,
                    curve: Curve.FastOutLinearIn,
                    iterations: 1,
                    playMode: PlayMode.Normal,
                    onFinish: () => {
                        this.rightSlideEnable = true;
                        this.leftSlideEnable = true;
                    }
                }, () => {
                    if (this.offsetX > 0 && this.leftSlideEnable) {
                        if (moveX >= 40) {
                            this.offsetX = this.bottomViewLeftW;
                        }
                        else if (moveX > 0) {
                            this.offsetX = 0;
                        }
                        if (moveX < -40) {
                            this.offsetX = 0;
                        }
                        else if (moveX < 0) {
                            this.offsetX = this.bottomViewLeftW;
                        }
                        return;
                    }
                    if (this.offsetX < 0 && this.rightSlideEnable) {
                        if (moveX >= 40) {
                            this.offsetX = 0;
                        }
                        else if (moveX > 0) {
                            this.offsetX = -this.bottomViewRightW;
                        }
                        if (moveX <= -40) {
                            this.offsetX = -this.bottomViewRightW;
                        }
                        else if (moveX < 0) {
                            this.offsetX = 0;
                        }
                        return;
                    }
                    if (this.offsetY > 0) {
                        if (Math.abs(moveY) >= 20) {
                            this.offsetY = this.mHeight;
                        }
                        else {
                            this.offsetY = 0;
                        }
                    }
                    if (this.offsetY < 0) {
                        if (Math.abs(moveY) >= 20) {
                            this.offsetY = -this.mHeight;
                        }
                        else {
                            this.offsetY = 0;
                        }
                    }
                });
            }
        });
        this.surfaceView(this);
        ColumnSplit.pop();
        ColumnSplit.create();
        ColumnSplit.position({ x: 360, y: 0 });
        this.bottomViewRight(this);
        ColumnSplit.pop();
        Row.pop();
        ColumnSplit.create();
        ColumnSplit.position({ x: 0, y: this.mHeight });
        ColumnSplit.onTouch((event: TouchEvent) => {
            if (event.type === TouchType.Down) {
                this.sX = event.touches[0].screenX;
                this.sY = event.touches[0].screenY;
            }
            if (event.type === TouchType.Move) {
                let moveX = event.touches[0].screenX - this.sX;
                let moveY = event.touches[0].screenY - this.sY;
                if (Math.abs(moveX) < Math.abs(moveY)) { //纵向滑动
                    if (moveY > 0) { //下滑
                        //底部菜单开始关闭
                        if (this.offsetY < 0) {
                            if (this.mHeight - Math.abs(moveY) >= 0) {
                                this.offsetY = -(this.mHeight - moveY);
                            }
                        }
                    }
                }
            }
            if (event.type === TouchType.Up) {
                let moveY = event.touches[0].screenY - this.sY;
                Context.animateTo({
                    duration: this.mDuration,
                    tempo: 1,
                    curve: Curve.FastOutLinearIn,
                    iterations: 1,
                    playMode: PlayMode.Normal, // 动画模式
                }, () => {
                    if (this.offsetY < 0) {
                        if (Math.abs(moveY) >= 20) {
                            this.offsetY = 0;
                        }
                        else {
                            this.offsetY = -this.mHeight;
                        }
                    }
                });
            }
        });
        this.bottomViewBottom(this);
        ColumnSplit.pop();
        Column.pop();
    }
}
