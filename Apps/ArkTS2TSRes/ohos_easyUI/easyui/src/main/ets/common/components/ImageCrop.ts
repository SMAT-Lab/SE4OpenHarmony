interface ImageCrop_Params {
    img?: ImageItem;
    BoxVisibility?: Visibility;
    FillVisibility?: Visibility;
    TextVisibility?: Visibility;
    ImgW?: number;
    ImgH?: number;
    StartRealXBias?: number;
    StartRealYBias?: number;
    RealXBias?: number;
    RealYBias?: number;
    CropW?: number;
    CropH?: number;
    CropX?: number;
    CropY?: number;
    autoX?: number;
    autoY?: number;
    CropPath?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ImageCrop_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Institute of Software, Chinese Academy of Sciences.
 * Licensed under the Apache License,Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { ImageItem } from "./beans/ImageItem";
export class ImageCrop extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__img = new ObservedPropertyObject(new ImageItem(""), this, "img");
        this.__BoxVisibility = new ObservedPropertySimple(Visibility.Hidden, this, "BoxVisibility");
        this.__FillVisibility = new ObservedPropertySimple(Visibility.Visible, this, "FillVisibility");
        this.__TextVisibility = new ObservedPropertySimple(Visibility.Visible, this, "TextVisibility");
        this.__ImgW = new ObservedPropertySimple(350, this, "ImgW");
        this.__ImgH = new ObservedPropertySimple(350, this, "ImgH");
        this.__StartRealXBias = new ObservedPropertySimple(0, this, "StartRealXBias");
        this.__StartRealYBias = new ObservedPropertySimple(0, this, "StartRealYBias");
        this.__RealXBias = new ObservedPropertySimple(0, this, "RealXBias");
        this.__RealYBias = new ObservedPropertySimple(0, this, "RealYBias");
        this.__CropW = new ObservedPropertySimple(0, this, "CropW");
        this.__CropH = new ObservedPropertySimple(0, this, "CropH");
        this.__CropX = new ObservedPropertySimple(10, this, "CropX");
        this.__CropY = new ObservedPropertySimple(0, this, "CropY");
        this.__autoX = new ObservedPropertySimple(0, this, "autoX");
        this.__autoY = new ObservedPropertySimple(0, this, "autoY");
        this.__CropPath = new ObservedPropertySimple("M 0 0 L 0 0 Z", this, "CropPath");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ImageCrop_Params) {
        if (params.img !== undefined) {
            this.img = params.img;
        }
        if (params.BoxVisibility !== undefined) {
            this.BoxVisibility = params.BoxVisibility;
        }
        if (params.FillVisibility !== undefined) {
            this.FillVisibility = params.FillVisibility;
        }
        if (params.TextVisibility !== undefined) {
            this.TextVisibility = params.TextVisibility;
        }
        if (params.ImgW !== undefined) {
            this.ImgW = params.ImgW;
        }
        if (params.ImgH !== undefined) {
            this.ImgH = params.ImgH;
        }
        if (params.StartRealXBias !== undefined) {
            this.StartRealXBias = params.StartRealXBias;
        }
        if (params.StartRealYBias !== undefined) {
            this.StartRealYBias = params.StartRealYBias;
        }
        if (params.RealXBias !== undefined) {
            this.RealXBias = params.RealXBias;
        }
        if (params.RealYBias !== undefined) {
            this.RealYBias = params.RealYBias;
        }
        if (params.CropW !== undefined) {
            this.CropW = params.CropW;
        }
        if (params.CropH !== undefined) {
            this.CropH = params.CropH;
        }
        if (params.CropX !== undefined) {
            this.CropX = params.CropX;
        }
        if (params.CropY !== undefined) {
            this.CropY = params.CropY;
        }
        if (params.autoX !== undefined) {
            this.autoX = params.autoX;
        }
        if (params.autoY !== undefined) {
            this.autoY = params.autoY;
        }
        if (params.CropPath !== undefined) {
            this.CropPath = params.CropPath;
        }
    }
    aboutToBeDeleted() {
        this.__img.aboutToBeDeleted();
        this.__BoxVisibility.aboutToBeDeleted();
        this.__FillVisibility.aboutToBeDeleted();
        this.__TextVisibility.aboutToBeDeleted();
        this.__ImgW.aboutToBeDeleted();
        this.__ImgH.aboutToBeDeleted();
        this.__StartRealXBias.aboutToBeDeleted();
        this.__StartRealYBias.aboutToBeDeleted();
        this.__RealXBias.aboutToBeDeleted();
        this.__RealYBias.aboutToBeDeleted();
        this.__CropW.aboutToBeDeleted();
        this.__CropH.aboutToBeDeleted();
        this.__CropX.aboutToBeDeleted();
        this.__CropY.aboutToBeDeleted();
        this.__autoX.aboutToBeDeleted();
        this.__autoY.aboutToBeDeleted();
        this.__CropPath.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __img: ObservedPropertyObject<ImageItem>;
    get img() {
        return this.__img.get();
    }
    set img(newValue: ImageItem) {
        this.__img.set(newValue);
    }
    private __BoxVisibility: ObservedPropertySimple<Visibility>;
    get BoxVisibility() {
        return this.__BoxVisibility.get();
    }
    set BoxVisibility(newValue: Visibility) {
        this.__BoxVisibility.set(newValue);
    }
    private __FillVisibility: ObservedPropertySimple<Visibility>;
    get FillVisibility() {
        return this.__FillVisibility.get();
    }
    set FillVisibility(newValue: Visibility) {
        this.__FillVisibility.set(newValue);
    }
    private __TextVisibility: ObservedPropertySimple<Visibility>;
    get TextVisibility() {
        return this.__TextVisibility.get();
    }
    set TextVisibility(newValue: Visibility) {
        this.__TextVisibility.set(newValue);
    }
    //原图片 宽高
    private __ImgW: ObservedPropertySimple<number>;
    get ImgW() {
        return this.__ImgW.get();
    }
    set ImgW(newValue: number) {
        this.__ImgW.set(newValue);
    }
    private __ImgH: ObservedPropertySimple<number>;
    get ImgH() {
        return this.__ImgH.get();
    }
    set ImgH(newValue: number) {
        this.__ImgH.set(newValue);
    }
    //鼠标触摸开始的实际位置 X轴
    private __StartRealXBias: ObservedPropertySimple<number>; //X轴
    get StartRealXBias() {
        return this.__StartRealXBias.get();
    }
    set StartRealXBias(newValue: number) {
        this.__StartRealXBias.set(newValue);
    }
    //鼠标触摸开始的实际位置 Y轴
    private __StartRealYBias: ObservedPropertySimple<number>; //Y轴
    get StartRealYBias() {
        return this.__StartRealYBias.get();
    }
    set StartRealYBias(newValue: number) {
        this.__StartRealYBias.set(newValue);
    }
    //鼠标实时位置 X轴
    private __RealXBias: ObservedPropertySimple<number>; //X轴
    get RealXBias() {
        return this.__RealXBias.get();
    }
    set RealXBias(newValue: number) {
        this.__RealXBias.set(newValue);
    }
    //鼠标实时位置 Y轴
    private __RealYBias: ObservedPropertySimple<number>; //Y轴
    get RealYBias() {
        return this.__RealYBias.get();
    }
    set RealYBias(newValue: number) {
        this.__RealYBias.set(newValue);
    }
    //可变裁剪框实时宽高
    private __CropW: ObservedPropertySimple<number>;
    get CropW() {
        return this.__CropW.get();
    }
    set CropW(newValue: number) {
        this.__CropW.set(newValue);
    }
    private __CropH: ObservedPropertySimple<number>;
    get CropH() {
        return this.__CropH.get();
    }
    set CropH(newValue: number) {
        this.__CropH.set(newValue);
    }
    //可变裁剪框位置参数，作用：为了适配裁剪框反向选取
    private __CropX: ObservedPropertySimple<number>;
    get CropX() {
        return this.__CropX.get();
    }
    set CropX(newValue: number) {
        this.__CropX.set(newValue);
    }
    private __CropY: ObservedPropertySimple<number>;
    get CropY() {
        return this.__CropY.get();
    }
    set CropY(newValue: number) {
        this.__CropY.set(newValue);
    }
    //参数 ==> 裁剪后的图片自适应居中
    private __autoX: ObservedPropertySimple<number>;
    get autoX() {
        return this.__autoX.get();
    }
    set autoX(newValue: number) {
        this.__autoX.set(newValue);
    }
    private __autoY: ObservedPropertySimple<number>;
    get autoY() {
        return this.__autoY.get();
    }
    set autoY(newValue: number) {
        this.__autoY.set(newValue);
    }
    //裁剪路径
    private __CropPath: ObservedPropertySimple<string>;
    get CropPath() {
        return this.__CropPath.get();
    }
    set CropPath(newValue: string) {
        this.__CropPath.set(newValue);
    }
    // 自定义拖拽过程中显示的内容
    Builder(parent = null) {
        Text.create();
        Text.visibility(Visibility.Hidden);
        Text.pop();
    }
    render() {
        Column.create();
        Column.height('95%');
        Column.width('100%');
        Column.margin({ top: 30 });
        Row.create();
        Row.position({ x: 70 });
        Stack.create();
        Stack.width(this.ImgW);
        Stack.height(this.ImgH);
        Stack.onDragMove((event: DragEvent, extraParams: String) => {
            this.RealXBias = event.getX() - 70;
            this.RealYBias = event.getY() - 35;
            console.log("【【" + this.RealXBias + ", " + this.RealYBias + "】】");
            if (this.RealXBias - this.StartRealXBias < 0 && this.RealYBias - this.StartRealYBias < 0) {
                this.CropX = this.RealXBias;
                this.CropY = this.RealYBias;
            }
            else if (this.RealXBias - this.StartRealXBias < 0) {
                this.CropX = this.RealXBias;
                this.CropY = this.StartRealYBias;
            }
            else if (this.RealYBias - this.StartRealYBias < 0) {
                this.CropX = this.StartRealXBias;
                this.CropY = this.RealYBias;
            }
            else {
                this.CropX = this.StartRealXBias;
                this.CropY = this.StartRealYBias;
            }
            this.CropW = Math.abs(this.RealXBias - this.StartRealXBias);
            this.CropH = Math.abs(this.RealYBias - this.StartRealYBias);
        });
        Stack.onDrop((event: DragEvent, extraParams: String) => {
            this.CropW = Math.abs(this.RealXBias - this.StartRealXBias);
            this.CropH = Math.abs(this.RealYBias - this.StartRealYBias);
            console.log("CropW = " + this.CropW + "   CropH = " + this.CropH);
        });
        //原图片
        Image.create($rawfile(this.img.name));
        //原图片
        Image.width(this.ImgW);
        //原图片
        Image.height(this.ImgH);
        //可调节裁剪框
        Flex.create();
        //可调节裁剪框
        Flex.position({
            x: this.CropX - 5,
            y: this.CropY
        });
        //可调节裁剪框
        Flex.border({
            width: 3,
            color: Color.White,
            style: BorderStyle.Dashed
        });
        //可调节裁剪框
        Flex.visibility(this.BoxVisibility);
        //可调节裁剪框
        Flex.width(this.CropW + 5);
        //可调节裁剪框
        Flex.height(this.CropH + 5);
        Rect.create();
        Rect.width(this.ImgW);
        Rect.height(this.ImgH);
        Rect.opacity(0);
        //可调节裁剪框
        Flex.pop();
        //上方填充方块
        Flex.create();
        //上方填充方块
        Flex.width(this.ImgW);
        //上方填充方块
        Flex.height(this.ImgH);
        //上方填充方块
        Flex.backgroundColor(Color.Black);
        //上方填充方块
        Flex.opacity(0.3);
        //上方填充方块
        Flex.clip(new Path({
            commands: "M 0 0" +
                " L " + vp2px(this.ImgW) + " 0" +
                " L " + vp2px(this.ImgW) + " " + vp2px(this.CropY) +
                " L " + "0 " + vp2px(this.CropY) + " Z"
        }));
        //上方填充方块
        Flex.visibility(this.FillVisibility);
        //上方填充方块
        Flex.pop();
        //左方填充方块
        Flex.create();
        //左方填充方块
        Flex.width(this.ImgW);
        //左方填充方块
        Flex.height(this.ImgH);
        //左方填充方块
        Flex.backgroundColor(Color.Black);
        //左方填充方块
        Flex.opacity(0.3);
        //左方填充方块
        Flex.clip(new Path({
            commands: "M 0 " + vp2px(this.CropY) +
                " L " + vp2px(this.CropX - 5) + " " + vp2px(this.CropY) +
                " L " + vp2px(this.CropX - 5) + " " + vp2px(this.ImgH) +
                " L " + "0 " + vp2px(this.ImgH) + " Z"
        }));
        //左方填充方块
        Flex.visibility(this.FillVisibility);
        //左方填充方块
        Flex.pop();
        //下方填充方块
        Flex.create();
        //下方填充方块
        Flex.width(this.ImgW);
        //下方填充方块
        Flex.height(this.ImgH);
        //下方填充方块
        Flex.backgroundColor(Color.Black);
        //下方填充方块
        Flex.opacity(0.3);
        //下方填充方块
        Flex.clip(new Path({
            commands: "M " + vp2px(this.CropX - 5) + " " + vp2px(this.CropY + this.CropH + 5) +
                " L " + vp2px(this.CropX + this.CropW) + " " + vp2px(this.CropY + this.CropH + 5) +
                " L " + vp2px(this.CropX + this.CropW) + " " + vp2px(this.ImgH) +
                " L " + vp2px(this.CropX - 5) + " " + vp2px(this.ImgH) + " Z"
        }));
        //下方填充方块
        Flex.visibility(this.FillVisibility);
        //下方填充方块
        Flex.pop();
        //右方填充方块
        Flex.create();
        //右方填充方块
        Flex.width(this.ImgW);
        //右方填充方块
        Flex.height(this.ImgH);
        //右方填充方块
        Flex.backgroundColor(Color.Black);
        //右方填充方块
        Flex.opacity(0.3);
        //右方填充方块
        Flex.clip(new Path({
            commands: "M " + vp2px(this.CropX + this.CropW) + " " + vp2px(this.CropY) +
                " L " + vp2px(this.ImgW) + " " + vp2px(this.CropY) +
                " L " + vp2px(this.ImgW) + " " + vp2px(this.ImgH) +
                " L " + vp2px(this.CropX + this.CropW) + " " + vp2px(this.ImgH) + " Z"
        }));
        //右方填充方块
        Flex.visibility(this.FillVisibility);
        //右方填充方块
        Flex.pop();
        Text.create("拖动选择裁剪区域");
        Text.fontSize(25);
        Text.fontColor(Color.White);
        Text.visibility(this.TextVisibility);
        Text.pop();
        //裁剪后的图片
        Image.create($rawfile(this.img.name));
        //裁剪后的图片
        Image.width(this.ImgW);
        //裁剪后的图片
        Image.height(this.ImgH);
        //裁剪后的图片
        Image.onDragStart((event: DragEvent, extraParams: String) => {
            this.TextVisibility = Visibility.Hidden;
            this.BoxVisibility = Visibility.Visible;
            this.StartRealXBias = event.getX() - 70;
            this.StartRealYBias = event.getY() - 35;
            console.log("【+" + this.StartRealXBias + ", " + this.StartRealYBias + "】, 开始移动......");
            return { builder: () => {
                    this.Builder.call(this);
                } };
        });
        //裁剪后的图片
        Image.clip(new Path({ commands: this.CropPath }));
        //裁剪后的图片
        Image.position({
            x: this.autoX,
            y: this.autoY
        });
        Stack.pop();
        Row.pop();
        Row.create();
        Row.width('100%');
        Row.height('10%');
        Row.position({ x: "0%", y: "50%" });
        Row.justifyContent(FlexAlign.Center);
        //裁剪按钮
        Button.createWithLabel("Crop");
        //裁剪按钮
        Button.width(100);
        //裁剪按钮
        Button.height(50);
        //裁剪按钮
        Button.fontSize(25);
        //裁剪按钮
        Button.backgroundColor("#ff704949");
        //裁剪按钮
        Button.type(ButtonType.Capsule);
        //裁剪按钮
        Button.onClick(() => {
            //裁剪
            this.BoxVisibility = Visibility.Hidden;
            this.FillVisibility = Visibility.Hidden;
            this.CropPath = "M " + vp2px(this.StartRealXBias + 5) + " " + vp2px(this.StartRealYBias + 5) +
                " L" + vp2px(this.RealXBias) + " " + vp2px(this.StartRealYBias + 5) +
                " L" + vp2px(this.RealXBias) + " " + vp2px(this.RealYBias) +
                " L" + vp2px(this.StartRealXBias + 5) + " " + vp2px(this.RealYBias) + "Z";
            //裁剪后的图片自适应居中
            this.autoX = -(this.CropX + this.CropW * 0.5 - this.ImgW * 0.5);
            this.autoY = -(this.CropY + this.CropH * 0.5 - this.ImgH * 0.5) + 400;
        });
        //裁剪按钮
        Button.pop();
        Row.pop();
        Column.pop();
    }
}
