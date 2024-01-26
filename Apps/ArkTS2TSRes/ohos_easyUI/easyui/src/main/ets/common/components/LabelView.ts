interface LabelView_Params {
    viewW?: number;
    viewH?: number;
    labelTitle?: string;
    labelLoc?: number;
    distance?: number;
    labelW?: number;
    mPath?: string;
    mAngel?: number;
    mPos_x?: number;
    mPos_y?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "LabelView_" + ++__generate__Id;
}
export class LabelView extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__viewW = new ObservedPropertySimple(0, this, "viewW");
        this.__viewH = new ObservedPropertySimple(0, this, "viewH");
        this.__labelTitle = new ObservedPropertySimple("", this, "labelTitle");
        this.__labelLoc = new ObservedPropertySimple(0, this, "labelLoc");
        this.__distance = new ObservedPropertySimple(0, this, "distance");
        this.__labelW = new ObservedPropertySimple(0, this, "labelW");
        this.__mPath = new ObservedPropertySimple("", this, "mPath");
        this.__mAngel = new ObservedPropertySimple(0, this, "mAngel");
        this.__mPos_x = new ObservedPropertySimple(0, this, "mPos_x");
        this.__mPos_y = new ObservedPropertySimple(0, this, "mPos_y");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: LabelView_Params) {
        if (params.viewW !== undefined) {
            this.viewW = params.viewW;
        }
        if (params.viewH !== undefined) {
            this.viewH = params.viewH;
        }
        if (params.labelTitle !== undefined) {
            this.labelTitle = params.labelTitle;
        }
        if (params.labelLoc !== undefined) {
            this.labelLoc = params.labelLoc;
        }
        if (params.distance !== undefined) {
            this.distance = params.distance;
        }
        if (params.labelW !== undefined) {
            this.labelW = params.labelW;
        }
        if (params.mPath !== undefined) {
            this.mPath = params.mPath;
        }
        if (params.mAngel !== undefined) {
            this.mAngel = params.mAngel;
        }
        if (params.mPos_x !== undefined) {
            this.mPos_x = params.mPos_x;
        }
        if (params.mPos_y !== undefined) {
            this.mPos_y = params.mPos_y;
        }
    }
    aboutToBeDeleted() {
        this.__viewW.aboutToBeDeleted();
        this.__viewH.aboutToBeDeleted();
        this.__labelTitle.aboutToBeDeleted();
        this.__labelLoc.aboutToBeDeleted();
        this.__distance.aboutToBeDeleted();
        this.__labelW.aboutToBeDeleted();
        this.__mPath.aboutToBeDeleted();
        this.__mAngel.aboutToBeDeleted();
        this.__mPos_x.aboutToBeDeleted();
        this.__mPos_y.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    //需要添加label的组件宽高
    private __viewW: ObservedPropertySimple<number>;
    get viewW() {
        return this.__viewW.get();
    }
    set viewW(newValue: number) {
        this.__viewW.set(newValue);
    }
    private __viewH: ObservedPropertySimple<number>;
    get viewH() {
        return this.__viewH.get();
    }
    set viewH(newValue: number) {
        this.__viewH.set(newValue);
    }
    //label内容
    private __labelTitle: ObservedPropertySimple<string>;
    get labelTitle() {
        return this.__labelTitle.get();
    }
    set labelTitle(newValue: string) {
        this.__labelTitle.set(newValue);
    }
    //label位置(1-左上， 2-右上， 3-左下， 4-右下) //3,4参数还需调整,目前实现了1,2
    private __labelLoc: ObservedPropertySimple<number>;
    get labelLoc() {
        return this.__labelLoc.get();
    }
    set labelLoc(newValue: number) {
        this.__labelLoc.set(newValue);
    }
    //label与顶角的距离
    private __distance: ObservedPropertySimple<number>;
    get distance() {
        return this.__distance.get();
    }
    set distance(newValue: number) {
        this.__distance.set(newValue);
    }
    //label宽度
    private __labelW: ObservedPropertySimple<number>;
    get labelW() {
        return this.__labelW.get();
    }
    set labelW(newValue: number) {
        this.__labelW.set(newValue);
    }
    private __mPath: ObservedPropertySimple<string>;
    get mPath() {
        return this.__mPath.get();
    }
    set mPath(newValue: string) {
        this.__mPath.set(newValue);
    }
    private __mAngel: ObservedPropertySimple<number>;
    get mAngel() {
        return this.__mAngel.get();
    }
    set mAngel(newValue: number) {
        this.__mAngel.set(newValue);
    }
    private __mPos_x: ObservedPropertySimple<number>;
    get mPos_x() {
        return this.__mPos_x.get();
    }
    set mPos_x(newValue: number) {
        this.__mPos_x.set(newValue);
    }
    private __mPos_y: ObservedPropertySimple<number>;
    get mPos_y() {
        return this.__mPos_y.get();
    }
    set mPos_y(newValue: number) {
        this.__mPos_y.set(newValue);
    }
    render() {
        Row.create();
        Row.width(this.viewW);
        Row.height(this.viewH);
        Row.clip(new Path({
            commands: this.mPath
        }));
        Row.backgroundColor(Color.Red);
        Row.onAppear(() => {
            switch (this.labelLoc) {
                case 1:
                    this.mPath = "M 0 " + vp2px(this.distance) +
                        " L " + vp2px(this.distance) + " 0" +
                        " L " + vp2px(this.distance + this.labelW) + " 0" +
                        " L 0 " + vp2px(this.distance + this.labelW) + " Z";
                    this.mAngel = -45;
                    this.mPos_x = this.distance * 0.2;
                    this.mPos_y = this.distance * 0.9;
                    console.log("左上" + this.mPath);
                    break;
                case 2:
                    this.mPath = "M " + vp2px(this.viewW - this.distance - this.labelW) + " 0" +
                        " L " + vp2px(this.viewW) + " " + vp2px(this.distance + this.labelW) +
                        " L " + vp2px(this.viewW) + " " + vp2px(this.distance) +
                        " L " + vp2px(this.viewW - this.distance) + " 0 Z";
                    this.mAngel = 45;
                    this.mPos_x = this.viewW - this.distance * 0.9;
                    this.mPos_y = this.distance * 0.2;
                    console.log("右上" + this.mPath);
                    break;
                //
                //        case 3:
                //          this.mPath = "M 0 " + vp2px(this.viewH - this.distance - this.labelW) +
                //                       " L " + vp2px(this.distance + this.labelW) + " " + vp2px(this.viewH) +
                //                       " L " + vp2px(this.distance) + " " + vp2px(this.viewH) +
                //                       " L 0 " + vp2px(this.viewH - this.distance) + " Z";
                //          this.mAngel = 45;
                //          this.mPos_x = this.distance * 0.8;
                //          this.mPos_y = this.distance * 1.4;
                //          console.log("左下" + this.mPath);
                //          break;
                //
                //        case 4:
                //          this.mPath = "M " + vp2px(this.labelW) + " " +  vp2px(this.viewH - this.distance - this.labelW) +
                //                       " L " + vp2px(this.viewW - this.distance - this.labelW) + " " + vp2px(this.viewH) +
                //                       " L " + vp2px(this.viewW - this.distance) + " " + vp2px(this.viewH) +
                //                       " L " + vp2px(this.viewW) + " " + vp2px(this.viewH - this.distance) + " Z";
                //          this.mAngel = -45;
                //          this.mPos_x = this.distance * 0.2;
                //          this.mPos_y = this.distance * 0.9;
                //          console.log("右下" + this.mPath);
            }
            console.log("=== " + this.viewW + " ==== " + this.viewH + " ==== " + this.labelTitle + " ==== " + this.labelLoc + " ==== " + this.distance + " ==== " + this.labelW + "===" + this.mPath);
        });
        Text.create("" + this.labelTitle);
        Text.fontSize(this.labelW * 0.5);
        Text.fontColor(Color.White);
        Text.position({
            x: this.mPos_x,
            y: this.mPos_y
        });
        Text.rotate({
            x: 0,
            y: 0,
            z: 5,
            centerX: 0,
            centerY: 0,
            angle: this.mAngel
        });
        Text.pop();
        Row.pop();
    }
}
