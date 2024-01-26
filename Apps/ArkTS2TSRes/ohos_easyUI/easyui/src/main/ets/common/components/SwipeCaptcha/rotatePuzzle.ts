interface RotatePuzzle_Params {
    ImgList?: ImageItem[];
    swipeWidth?: number;
    swipeHeight?: number;
    simpleRoadWidth?: number;
    CurImgUrl_id?: number;
    CurImgUrl?: string;
    rotateImgWidth?: number;
    rotateImgHeight?: number;
    rotateBlockPosLeft?: number;
    rotateStartRealXBias?: number;
    rotateBlockWidth?: number;
    rotateVerifieeRadius?: number;
    rotateStartAgl?: number;
    rotateVerifieeAgl?: number;
    rotateMinAngle?: number;
    rotateMaxAngle?: number;
    simpleStartTime?: number;
    simpleEndTime?: number;
    rotateVerifyThreshold?: number;
    simpleSlideColor?: string;
    resultVisibility_true?: Visibility;
    resultVisibility_false?: Visibility;
    simpleTextVisibility?: Visibility;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "rotatePuzzle_" + ++__generate__Id;
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
import { ImageItem } from '../beans/ImageItem';
export class RotatePuzzle extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__ImgList = AppStorage.SetAndLink("ImgList", [new ImageItem('SwipeCaptcha_test1.jpg')], this, "ImgList");
        this.__swipeWidth = new ObservedPropertySimple(325, this, "swipeWidth");
        this.__swipeHeight = new ObservedPropertySimple(100, this, "swipeHeight");
        this.__simpleRoadWidth = new ObservedPropertySimple(280, this, "simpleRoadWidth");
        this.__CurImgUrl_id = new ObservedPropertySimple(0, this, "CurImgUrl_id");
        this.__CurImgUrl = new ObservedPropertySimple('SwipeCaptcha_test1.jpg', this, "CurImgUrl");
        this.__rotateImgWidth = new ObservedPropertySimple(280, this, "rotateImgWidth");
        this.__rotateImgHeight = new ObservedPropertySimple(220, this, "rotateImgHeight");
        this.__rotateBlockPosLeft = new ObservedPropertySimple(0, this, "rotateBlockPosLeft");
        this.__rotateStartRealXBias = new ObservedPropertySimple(0, this, "rotateStartRealXBias");
        this.__rotateBlockWidth = new ObservedPropertySimple(50, this, "rotateBlockWidth");
        this.__rotateVerifieeRadius = new ObservedPropertySimple(80, this, "rotateVerifieeRadius");
        this.__rotateStartAgl = new ObservedPropertySimple(0, this, "rotateStartAgl");
        this.__rotateVerifieeAgl = new ObservedPropertySimple(0, this, "rotateVerifieeAgl");
        this.__rotateMinAngle = new ObservedPropertySimple(30, this, "rotateMinAngle");
        this.__rotateMaxAngle = new ObservedPropertySimple(330, this, "rotateMaxAngle");
        this.__simpleStartTime = new ObservedPropertySimple(0, this, "simpleStartTime");
        this.__simpleEndTime = new ObservedPropertySimple(0, this, "simpleEndTime");
        this.__rotateVerifyThreshold = new ObservedPropertySimple(8, this, "rotateVerifyThreshold");
        this.__simpleSlideColor = new ObservedPropertySimple('#7798DD', this, "simpleSlideColor");
        this.__resultVisibility_true = new ObservedPropertySimple(Visibility.Hidden, this, "resultVisibility_true");
        this.__resultVisibility_false = new ObservedPropertySimple(Visibility.Hidden, this, "resultVisibility_false");
        this.__simpleTextVisibility = new ObservedPropertySimple(Visibility.Visible, this, "simpleTextVisibility");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: RotatePuzzle_Params) {
        if (params.swipeWidth !== undefined) {
            this.swipeWidth = params.swipeWidth;
        }
        if (params.swipeHeight !== undefined) {
            this.swipeHeight = params.swipeHeight;
        }
        if (params.simpleRoadWidth !== undefined) {
            this.simpleRoadWidth = params.simpleRoadWidth;
        }
        if (params.CurImgUrl_id !== undefined) {
            this.CurImgUrl_id = params.CurImgUrl_id;
        }
        if (params.CurImgUrl !== undefined) {
            this.CurImgUrl = params.CurImgUrl;
        }
        if (params.rotateImgWidth !== undefined) {
            this.rotateImgWidth = params.rotateImgWidth;
        }
        if (params.rotateImgHeight !== undefined) {
            this.rotateImgHeight = params.rotateImgHeight;
        }
        if (params.rotateBlockPosLeft !== undefined) {
            this.rotateBlockPosLeft = params.rotateBlockPosLeft;
        }
        if (params.rotateStartRealXBias !== undefined) {
            this.rotateStartRealXBias = params.rotateStartRealXBias;
        }
        if (params.rotateBlockWidth !== undefined) {
            this.rotateBlockWidth = params.rotateBlockWidth;
        }
        if (params.rotateVerifieeRadius !== undefined) {
            this.rotateVerifieeRadius = params.rotateVerifieeRadius;
        }
        if (params.rotateStartAgl !== undefined) {
            this.rotateStartAgl = params.rotateStartAgl;
        }
        if (params.rotateVerifieeAgl !== undefined) {
            this.rotateVerifieeAgl = params.rotateVerifieeAgl;
        }
        if (params.rotateMinAngle !== undefined) {
            this.rotateMinAngle = params.rotateMinAngle;
        }
        if (params.rotateMaxAngle !== undefined) {
            this.rotateMaxAngle = params.rotateMaxAngle;
        }
        if (params.simpleStartTime !== undefined) {
            this.simpleStartTime = params.simpleStartTime;
        }
        if (params.simpleEndTime !== undefined) {
            this.simpleEndTime = params.simpleEndTime;
        }
        if (params.rotateVerifyThreshold !== undefined) {
            this.rotateVerifyThreshold = params.rotateVerifyThreshold;
        }
        if (params.simpleSlideColor !== undefined) {
            this.simpleSlideColor = params.simpleSlideColor;
        }
        if (params.resultVisibility_true !== undefined) {
            this.resultVisibility_true = params.resultVisibility_true;
        }
        if (params.resultVisibility_false !== undefined) {
            this.resultVisibility_false = params.resultVisibility_false;
        }
        if (params.simpleTextVisibility !== undefined) {
            this.simpleTextVisibility = params.simpleTextVisibility;
        }
    }
    aboutToBeDeleted() {
        this.__ImgList.aboutToBeDeleted();
        this.__swipeWidth.aboutToBeDeleted();
        this.__swipeHeight.aboutToBeDeleted();
        this.__simpleRoadWidth.aboutToBeDeleted();
        this.__CurImgUrl_id.aboutToBeDeleted();
        this.__CurImgUrl.aboutToBeDeleted();
        this.__rotateImgWidth.aboutToBeDeleted();
        this.__rotateImgHeight.aboutToBeDeleted();
        this.__rotateBlockPosLeft.aboutToBeDeleted();
        this.__rotateStartRealXBias.aboutToBeDeleted();
        this.__rotateBlockWidth.aboutToBeDeleted();
        this.__rotateVerifieeRadius.aboutToBeDeleted();
        this.__rotateStartAgl.aboutToBeDeleted();
        this.__rotateVerifieeAgl.aboutToBeDeleted();
        this.__rotateMinAngle.aboutToBeDeleted();
        this.__rotateMaxAngle.aboutToBeDeleted();
        this.__simpleStartTime.aboutToBeDeleted();
        this.__simpleEndTime.aboutToBeDeleted();
        this.__rotateVerifyThreshold.aboutToBeDeleted();
        this.__simpleSlideColor.aboutToBeDeleted();
        this.__resultVisibility_true.aboutToBeDeleted();
        this.__resultVisibility_false.aboutToBeDeleted();
        this.__simpleTextVisibility.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __ImgList: ObservedPropertyAbstract<ImageItem[]>;
    get ImgList() {
        return this.__ImgList.get();
    }
    set ImgList(newValue: ImageItem[]) {
        this.__ImgList.set(newValue);
    }
    //组件宽高
    private __swipeWidth: ObservedPropertySimple<number>;
    get swipeWidth() {
        return this.__swipeWidth.get();
    }
    set swipeWidth(newValue: number) {
        this.__swipeWidth.set(newValue);
    }
    private __swipeHeight: ObservedPropertySimple<number>;
    get swipeHeight() {
        return this.__swipeHeight.get();
    }
    set swipeHeight(newValue: number) {
        this.__swipeHeight.set(newValue);
    }
    //滑轨宽度
    private __simpleRoadWidth: ObservedPropertySimple<number>;
    get simpleRoadWidth() {
        return this.__simpleRoadWidth.get();
    }
    set simpleRoadWidth(newValue: number) {
        this.__simpleRoadWidth.set(newValue);
    }
    //图片相关参数
    private __CurImgUrl_id: ObservedPropertySimple<number>; //当前拼图图片id
    get CurImgUrl_id() {
        return this.__CurImgUrl_id.get();
    }
    set CurImgUrl_id(newValue: number) {
        this.__CurImgUrl_id.set(newValue);
    }
    private __CurImgUrl: ObservedPropertySimple<string>;
    get CurImgUrl() {
        return this.__CurImgUrl.get();
    }
    set CurImgUrl(newValue: string) {
        this.__CurImgUrl.set(newValue);
    }
    private __rotateImgWidth: ObservedPropertySimple<number>;
    get rotateImgWidth() {
        return this.__rotateImgWidth.get();
    }
    set rotateImgWidth(newValue: number) {
        this.__rotateImgWidth.set(newValue);
    }
    private __rotateImgHeight: ObservedPropertySimple<number>;
    get rotateImgHeight() {
        return this.__rotateImgHeight.get();
    }
    set rotateImgHeight(newValue: number) {
        this.__rotateImgHeight.set(newValue);
    }
    //滑块的动态位置
    private __rotateBlockPosLeft: ObservedPropertySimple<number>;
    get rotateBlockPosLeft() {
        return this.__rotateBlockPosLeft.get();
    }
    set rotateBlockPosLeft(newValue: number) {
        this.__rotateBlockPosLeft.set(newValue);
    }
    //滑块触摸开始的实际位置
    private __rotateStartRealXBias: ObservedPropertySimple<number>; //X轴
    get rotateStartRealXBias() {
        return this.__rotateStartRealXBias.get();
    }
    set rotateStartRealXBias(newValue: number) {
        this.__rotateStartRealXBias.set(newValue);
    }
    //滑块的宽度
    private __rotateBlockWidth: ObservedPropertySimple<number>;
    get rotateBlockWidth() {
        return this.__rotateBlockWidth.get();
    }
    set rotateBlockWidth(newValue: number) {
        this.__rotateBlockWidth.set(newValue);
    }
    //旋转块的参数
    private __rotateVerifieeRadius: ObservedPropertySimple<number>; //旋转区域半径
    get rotateVerifieeRadius() {
        return this.__rotateVerifieeRadius.get();
    }
    set rotateVerifieeRadius(newValue: number) {
        this.__rotateVerifieeRadius.set(newValue);
    }
    private __rotateStartAgl: ObservedPropertySimple<number>; //记录初始角度
    get rotateStartAgl() {
        return this.__rotateStartAgl.get();
    }
    set rotateStartAgl(newValue: number) {
        this.__rotateStartAgl.set(newValue);
    }
    private __rotateVerifieeAgl: ObservedPropertySimple<number>; //验证区域顺时针旋转角度
    get rotateVerifieeAgl() {
        return this.__rotateVerifieeAgl.get();
    }
    set rotateVerifieeAgl(newValue: number) {
        this.__rotateVerifieeAgl.set(newValue);
    }
    private __rotateMinAngle: ObservedPropertySimple<number>;
    get rotateMinAngle() {
        return this.__rotateMinAngle.get();
    }
    set rotateMinAngle(newValue: number) {
        this.__rotateMinAngle.set(newValue);
    }
    private __rotateMaxAngle: ObservedPropertySimple<number>;
    get rotateMaxAngle() {
        return this.__rotateMaxAngle.get();
    }
    set rotateMaxAngle(newValue: number) {
        this.__rotateMaxAngle.set(newValue);
    }
    //时间戳信息
    private __simpleStartTime: ObservedPropertySimple<number>;
    get simpleStartTime() {
        return this.__simpleStartTime.get();
    }
    set simpleStartTime(newValue: number) {
        this.__simpleStartTime.set(newValue);
    }
    private __simpleEndTime: ObservedPropertySimple<number>;
    get simpleEndTime() {
        return this.__simpleEndTime.get();
    }
    set simpleEndTime(newValue: number) {
        this.__simpleEndTime.set(newValue);
    }
    //偏差阈值，角度偏差在8度以内
    private __rotateVerifyThreshold: ObservedPropertySimple<number>;
    get rotateVerifyThreshold() {
        return this.__rotateVerifyThreshold.get();
    }
    set rotateVerifyThreshold(newValue: number) {
        this.__rotateVerifyThreshold.set(newValue);
    }
    //已经滑过区域的颜色
    private __simpleSlideColor: ObservedPropertySimple<string>;
    get simpleSlideColor() {
        return this.__simpleSlideColor.get();
    }
    set simpleSlideColor(newValue: string) {
        this.__simpleSlideColor.set(newValue);
    }
    //验证结果的可见性
    private __resultVisibility_true: ObservedPropertySimple<Visibility>;
    get resultVisibility_true() {
        return this.__resultVisibility_true.get();
    }
    set resultVisibility_true(newValue: Visibility) {
        this.__resultVisibility_true.set(newValue);
    }
    private __resultVisibility_false: ObservedPropertySimple<Visibility>;
    get resultVisibility_false() {
        return this.__resultVisibility_false.get();
    }
    set resultVisibility_false(newValue: Visibility) {
        this.__resultVisibility_false.set(newValue);
    }
    //提示文字的可见性
    private __simpleTextVisibility: ObservedPropertySimple<Visibility>;
    get simpleTextVisibility() {
        return this.__simpleTextVisibility.get();
    }
    set simpleTextVisibility(newValue: Visibility) {
        this.__simpleTextVisibility.set(newValue);
    }
    // 自定义拖拽过程中显示的内容
    Builder(parent = null) {
        Button.createWithChild({ type: ButtonType.Normal });
        Button.visibility(Visibility.Hidden);
        __Button__swipeBtn();
        Button.touchable(true);
        Button.position({
            x: this.rotateBlockPosLeft, //当该参数被修改时，滑块位置也动态修改
        });
        Button.zIndex(10);
        Image.create({ "id": 0, "type": 30000, params: ["SwipeCaptcha_swipeicon.png"] });
        Image.width(20);
        Button.pop();
    }
    render() {
        Stack.create({ alignContent: Alignment.Center });
        __Stack__swipeStack();
        Column.create();
        /*拼图区域*/
        Row.create();
        /*拼图区域*/
        Row.width(280);
        Stack.create();
        //拼图图片
        Image.create($rawfile(this.CurImgUrl));
        //拼图图片
        Image.height(220);
        //拼图图片
        Image.padding({ bottom: 4 });
        //拼图图片
        Image.onAppear(() => {
            let minAgl = this.rotateMinAngle;
            let maxAgl = this.rotateMaxAngle;
            this.rotateVerifieeAgl = Math.round(Math.random() * (maxAgl - minAgl) + minAgl);
            this.CurImgUrl_id = Math.round(Math.random() * (8 - 1) + 1);
            this.CurImgUrl = this.ImgList[this.CurImgUrl_id].name;
            console.log("【rotatePuzzle】ImgList.length = " + this.ImgList.length);
            console.log("【rotatePuzzle】angel = " + this.rotateVerifieeAgl + "\tCurImgUrl_id = " + this.CurImgUrl_id);
        });
        //旋转区域
        Stack.create();
        //旋转区域
        Stack.rotate({
            x: 0,
            y: 0,
            z: 5,
            angle: this.rotateVerifieeAgl,
        });
        Image.create($rawfile(this.CurImgUrl));
        Image.height(220);
        Image.width(280);
        Image.padding({ bottom: 4 });
        Image.zIndex(1);
        Image.mask(new Circle({ width: this.rotateVerifieeRadius * 2, height: this.rotateVerifieeRadius * 2 })
            .offset({
            x: this.rotateImgWidth * 0.5 - this.rotateVerifieeRadius,
            y: this.rotateImgHeight * 0.5 - this.rotateVerifieeRadius
        })
            .fill(Color.White));
        //旋转区域
        Stack.pop();
        //            Flex()
        //              .size({width: 2 * this.rotateVerifieeRadius, height: 2 * this.rotateVerifieeRadius})
        //              .borderRadius(this.rotateVerifieeRadius)
        //              .backgroundImage($rawfile(this.ImgList[this.CurImgUrl_id].name))
        //              .backgroundImageSize(ImageSize.Cover)
        //              .rotate({x: 0, y: 0, z: 5, angle: this.rotateVerifieeAgl, centerX: 80, centerY: 80})
        //验证结果
        Text.create('验证成功！用时' + (this.simpleEndTime - this.simpleStartTime) / 1000 + 's');
        //            Flex()
        //              .size({width: 2 * this.rotateVerifieeRadius, height: 2 * this.rotateVerifieeRadius})
        //              .borderRadius(this.rotateVerifieeRadius)
        //              .backgroundImage($rawfile(this.ImgList[this.CurImgUrl_id].name))
        //              .backgroundImageSize(ImageSize.Cover)
        //              .rotate({x: 0, y: 0, z: 5, angle: this.rotateVerifieeAgl, centerX: 80, centerY: 80})
        //验证结果
        Text.width(280);
        //            Flex()
        //              .size({width: 2 * this.rotateVerifieeRadius, height: 2 * this.rotateVerifieeRadius})
        //              .borderRadius(this.rotateVerifieeRadius)
        //              .backgroundImage($rawfile(this.ImgList[this.CurImgUrl_id].name))
        //              .backgroundImageSize(ImageSize.Cover)
        //              .rotate({x: 0, y: 0, z: 5, angle: this.rotateVerifieeAgl, centerX: 80, centerY: 80})
        //验证结果
        Text.fontSize(15);
        //            Flex()
        //              .size({width: 2 * this.rotateVerifieeRadius, height: 2 * this.rotateVerifieeRadius})
        //              .borderRadius(this.rotateVerifieeRadius)
        //              .backgroundImage($rawfile(this.ImgList[this.CurImgUrl_id].name))
        //              .backgroundImageSize(ImageSize.Cover)
        //              .rotate({x: 0, y: 0, z: 5, angle: this.rotateVerifieeAgl, centerX: 80, centerY: 80})
        //验证结果
        Text.fontColor(Color.White);
        //            Flex()
        //              .size({width: 2 * this.rotateVerifieeRadius, height: 2 * this.rotateVerifieeRadius})
        //              .borderRadius(this.rotateVerifieeRadius)
        //              .backgroundImage($rawfile(this.ImgList[this.CurImgUrl_id].name))
        //              .backgroundImageSize(ImageSize.Cover)
        //              .rotate({x: 0, y: 0, z: 5, angle: this.rotateVerifieeAgl, centerX: 80, centerY: 80})
        //验证结果
        Text.backgroundColor('#008000');
        //            Flex()
        //              .size({width: 2 * this.rotateVerifieeRadius, height: 2 * this.rotateVerifieeRadius})
        //              .borderRadius(this.rotateVerifieeRadius)
        //              .backgroundImage($rawfile(this.ImgList[this.CurImgUrl_id].name))
        //              .backgroundImageSize(ImageSize.Cover)
        //              .rotate({x: 0, y: 0, z: 5, angle: this.rotateVerifieeAgl, centerX: 80, centerY: 80})
        //验证结果
        Text.textAlign(TextAlign.Center);
        //            Flex()
        //              .size({width: 2 * this.rotateVerifieeRadius, height: 2 * this.rotateVerifieeRadius})
        //              .borderRadius(this.rotateVerifieeRadius)
        //              .backgroundImage($rawfile(this.ImgList[this.CurImgUrl_id].name))
        //              .backgroundImageSize(ImageSize.Cover)
        //              .rotate({x: 0, y: 0, z: 5, angle: this.rotateVerifieeAgl, centerX: 80, centerY: 80})
        //验证结果
        Text.visibility(this.resultVisibility_true);
        //            Flex()
        //              .size({width: 2 * this.rotateVerifieeRadius, height: 2 * this.rotateVerifieeRadius})
        //              .borderRadius(this.rotateVerifieeRadius)
        //              .backgroundImage($rawfile(this.ImgList[this.CurImgUrl_id].name))
        //              .backgroundImageSize(ImageSize.Cover)
        //              .rotate({x: 0, y: 0, z: 5, angle: this.rotateVerifieeAgl, centerX: 80, centerY: 80})
        //验证结果
        Text.position({
            y: 0
        });
        //            Flex()
        //              .size({width: 2 * this.rotateVerifieeRadius, height: 2 * this.rotateVerifieeRadius})
        //              .borderRadius(this.rotateVerifieeRadius)
        //              .backgroundImage($rawfile(this.ImgList[this.CurImgUrl_id].name))
        //              .backgroundImageSize(ImageSize.Cover)
        //              .rotate({x: 0, y: 0, z: 5, angle: this.rotateVerifieeAgl, centerX: 80, centerY: 80})
        //验证结果
        Text.pop();
        Text.create('验证失败！');
        Text.width(280);
        Text.fontSize(15);
        Text.fontColor(Color.White);
        Text.backgroundColor('#FE0000');
        Text.textAlign(TextAlign.Center);
        Text.visibility(this.resultVisibility_false);
        Text.position({
            y: 0
        });
        Text.pop();
        //刷新按钮
        Image.create({ "id": 0, "type": 30000, params: ["SwipeCaptcha_refreshicon.png"] });
        //刷新按钮
        Image.width(40);
        //刷新按钮
        Image.height(40);
        //刷新按钮
        Image.offset({
            x: 120,
            y: 90
        });
        //刷新按钮
        Image.onClick(() => {
            this.CurImgUrl_id = Math.round(Math.random() * (8 - 1) + 1);
            this.CurImgUrl = this.ImgList[this.CurImgUrl_id].name;
            let minAgl = this.rotateMinAngle;
            let maxAgl = this.rotateMaxAngle;
            this.rotateVerifieeAgl = Math.round(Math.random() * (maxAgl - minAgl) + minAgl);
        });
        Stack.pop();
        /*拼图区域*/
        Row.pop();
        /*滑轨*/
        Row.create();
        __Row__swipeRoad();
        /*滑轨*/
        Row.onDragEnter((event: DragEvent, extraParams: string) => {
            console.log('【rotatePuzzle】onDragEnter');
        });
        /*滑轨*/
        Row.onDragMove((event: DragEvent, extraParams: String) => {
            let curX = event.getX();
            console.log("【rotatePuzzle】Moving...");
            // 改变滑块位置且确保不越界
            if (curX <= this.rotateStartRealXBias) {
                this.rotateBlockPosLeft = 0;
                this.rotateVerifieeAgl = this.rotateStartAgl;
            }
            else if (curX >= this.rotateImgWidth - this.rotateBlockWidth) {
                this.rotateBlockPosLeft = this.rotateImgWidth - this.rotateBlockWidth;
            }
            else {
                (curX - this.rotateStartRealXBias) > this.rotateImgWidth - this.rotateBlockWidth ? this.rotateBlockPosLeft = this.rotateImgWidth - this.rotateBlockWidth : this.rotateBlockPosLeft = (curX - this.rotateStartRealXBias);
                this.rotateVerifieeAgl = this.rotateStartAgl - 360 * (this.rotateBlockPosLeft / (this.rotateImgWidth - this.rotateBlockWidth));
            }
            console.log("【rotatePuzzle】 curX = " + curX + "\trotateStartRealXBias = " + this.rotateStartRealXBias + "\trotateBlockPosLeft = " + this.rotateBlockPosLeft + "\t rotateStartAgl = " + this.rotateStartAgl + "\trotateVerifieeAgl = " + this.rotateVerifieeAgl);
        });
        /*滑轨*/
        Row.onDragLeave((event: DragEvent, extraParams: string) => {
            console.log("【simpleSwipe】Leave!");
            this.rotateBlockPosLeft = 0;
        });
        /*滑轨*/
        Row.onDrop((event: DragEvent, extraParams: string) => {
            console.log("【simpleSwipe】Drop!");
            //获取滑动结束时间,以计算验证用时
            this.simpleEndTime = Date.now();
            //检查滑块位置进行验证并显示验证结果
            if (this.rotateVerifieeAgl >= -this.rotateVerifyThreshold && this.rotateVerifieeAgl <= this.rotateVerifyThreshold) {
                //验证成功
                this.simpleSlideColor = '#008000';
                this.simpleTextVisibility = Visibility.Hidden;
                this.resultVisibility_true = Visibility.Visible;
            }
            else {
                //验证失败
                this.simpleSlideColor = '#fe0000';
                this.simpleTextVisibility = Visibility.Hidden;
                this.resultVisibility_false = Visibility.Visible;
            }
            //重置页面
            setTimeout(() => {
                this.simpleSlideColor = '#7798DD';
                this.simpleTextVisibility = Visibility.Visible;
                this.resultVisibility_false = Visibility.Hidden;
                this.resultVisibility_true = Visibility.Hidden;
                this.rotateBlockPosLeft = 0;
                let minAgl = this.rotateMinAngle;
                let maxAgl = this.rotateMaxAngle;
                this.rotateVerifieeAgl = Math.round(Math.random() * (maxAgl - minAgl) + minAgl);
                this.CurImgUrl_id = Math.round(Math.random() * (8 - 1) + 1);
                this.CurImgUrl = this.ImgList[this.CurImgUrl_id].name;
                console.log("【rotatePuzzle】 angel = " + this.rotateVerifieeAgl + "\tCurImgUrl_id = " + this.CurImgUrl_id);
            }, 1500);
        });
        Column.create();
        Column.width("100%");
        Stack.create({ alignContent: Alignment.Start });
        Stack.width(280);
        /*滑块*/
        Button.createWithChild({ type: ButtonType.Normal });
        __Button__swipeBtn();
        /*滑块*/
        Button.touchable(true);
        /*滑块*/
        Button.onDragStart((event: DragEvent, extraParams: String) => {
            //获取的当前时间会转换成距离某个时间有多少毫秒，即返回number类型
            this.simpleStartTime = Date.now();
            //获取当前真实位置
            this.rotateStartRealXBias = event.getX();
            this.rotateStartAgl = this.rotateVerifieeAgl;
            //控制台输出，方便调试
            console.log("【rotatePuzzle】滑块初始真实位置：[" + this.rotateStartRealXBias + "]  开始滑动时的时间：" + this.simpleStartTime + "\trotateStartAgl = " + this.rotateStartAgl);
            return { builder: () => {
                    this.Builder.call(this);
                } };
        });
        /*滑块*/
        Button.position({
            x: this.rotateBlockPosLeft
        });
        /*滑块*/
        Button.zIndex(10);
        Image.create({ "id": 0, "type": 30000, params: ["SwipeCaptcha_swipeicon.png"] });
        Image.width(20);
        /*滑块*/
        Button.pop();
        /*已经划过的区域*/
        Text.create();
        /*已经划过的区域*/
        Text.height('50');
        /*已经划过的区域*/
        Text.width(this.rotateBlockPosLeft + this.rotateBlockWidth / 2);
        /*已经划过的区域*/
        Text.borderRadius(5);
        /*已经划过的区域*/
        Text.backgroundColor(this.simpleSlideColor);
        /*已经划过的区域*/
        Text.zIndex(5);
        /*已经划过的区域*/
        Text.pop();
        /*滑轨提示文字*/
        Text.create('滑动完成验证');
        __Text__swipeText();
        /*滑轨提示文字*/
        Text.visibility(this.simpleTextVisibility);
        /*滑轨提示文字*/
        Text.pop();
        Text.create('验证成功,用时' + (this.simpleEndTime - this.simpleStartTime) / 1000 + 's');
        __Text__swipeText();
        Text.fontColor(Color.White);
        Text.zIndex(6);
        Text.visibility(this.resultVisibility_true);
        Text.pop();
        Text.create('验证失败！');
        __Text__swipeText();
        Text.fontColor(Color.White);
        Text.visibility(this.resultVisibility_false);
        Text.zIndex(6);
        Text.pop();
        Stack.pop();
        Column.pop();
        /*滑轨*/
        Row.pop();
        Column.pop();
        Stack.pop();
    }
}
//使用@Extend装饰器，可简化代码，方便组件样式的复用
function __Row__swipeRoad(): void {
    Row.height('50');
    Row.width(280);
    Row.borderRadius(5);
    Row.border({ width: 1, color: Color.Blue });
}
function __Text__swipeText(): void {
    Text.width("100%");
    Text.height(50);
    Text.fontSize(20);
    Text.textAlign(TextAlign.Center);
}
function __Button__swipeBtn(): void {
    Button.width(50);
    Button.height('50');
    Button.borderRadius(5);
}
function __Stack__swipeStack(): void {
    Stack.height(300);
    Stack.width(320);
    Stack.border({ width: 1, color: Color.Grey });
    Stack.borderRadius(8);
    Stack.shadow({ radius: 30, color: '#888888', offsetX: 10, offsetY: 10 });
}
function __Text__verifierStyle(): void {
    Text.backgroundColor("#292929");
    Text.border({ width: 1 });
    Text.borderColor("#ff000000");
}
