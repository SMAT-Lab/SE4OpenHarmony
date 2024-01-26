interface SwipePuzzle_Params {
    ImgList?: ImageItem[];
    swipeWidth?: number;
    swipeHeight?: number;
    simpleRoadWidth?: number;
    CurImgUrl_id?: number;
    CurImgUrl?: string;
    ImgWidth?: number;
    ImgHeight?: number;
    verifierPosLeft?: number;
    StartRealXBias?: number;
    StartRealYBias?: number;
    verifierWidth?: number;
    verifierHeight?: number;
    verifierXBias?: number;
    verifierYBias?: number;
    swipeCircleRadius?: number;
    borderPadding?: number;
    simpleStartTime?: number;
    simpleEndTime?: number;
    VerifyThreshold?: number;
    simpleSlideColor?: string;
    resultVisibility_true?: Visibility;
    resultVisibility_false?: Visibility;
    simpleTextVisibility?: Visibility;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "swipePuzzle_" + ++__generate__Id;
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
export class SwipePuzzle extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__ImgList = AppStorage.SetAndLink("ImgList", [], this, "ImgList");
        this.__swipeWidth = new ObservedPropertySimple(325, this, "swipeWidth");
        this.__swipeHeight = new ObservedPropertySimple(100, this, "swipeHeight");
        this.__simpleRoadWidth = new ObservedPropertySimple(280, this, "simpleRoadWidth");
        this.__CurImgUrl_id = new ObservedPropertySimple(0, this, "CurImgUrl_id");
        this.__CurImgUrl = new ObservedPropertySimple('SwipeCaptcha_test1.jpg', this, "CurImgUrl");
        this.ImgWidth = 280;
        this.ImgHeight = 220;
        this.__verifierPosLeft = new ObservedPropertySimple(0, this, "verifierPosLeft");
        this.__StartRealXBias = new ObservedPropertySimple(0, this, "StartRealXBias");
        this.__StartRealYBias = new ObservedPropertySimple(0, this, "StartRealYBias");
        this.verifierWidth = 50;
        this.verifierHeight = 50;
        this.__verifierXBias = new ObservedPropertySimple(0, this, "verifierXBias");
        this.__verifierYBias = new ObservedPropertySimple(0, this, "verifierYBias");
        this.swipeCircleRadius = 10;
        this.borderPadding = 0.2;
        this.__simpleStartTime = new ObservedPropertySimple(0, this, "simpleStartTime");
        this.__simpleEndTime = new ObservedPropertySimple(0, this, "simpleEndTime");
        this.VerifyThreshold = 0.1;
        this.simpleSlideColor = '#7798DD';
        this.__resultVisibility_true = new ObservedPropertySimple(Visibility.Hidden, this, "resultVisibility_true");
        this.__resultVisibility_false = new ObservedPropertySimple(Visibility.Hidden, this, "resultVisibility_false");
        this.__simpleTextVisibility = new ObservedPropertySimple(Visibility.Visible, this, "simpleTextVisibility");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SwipePuzzle_Params) {
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
        if (params.ImgWidth !== undefined) {
            this.ImgWidth = params.ImgWidth;
        }
        if (params.ImgHeight !== undefined) {
            this.ImgHeight = params.ImgHeight;
        }
        if (params.verifierPosLeft !== undefined) {
            this.verifierPosLeft = params.verifierPosLeft;
        }
        if (params.StartRealXBias !== undefined) {
            this.StartRealXBias = params.StartRealXBias;
        }
        if (params.StartRealYBias !== undefined) {
            this.StartRealYBias = params.StartRealYBias;
        }
        if (params.verifierWidth !== undefined) {
            this.verifierWidth = params.verifierWidth;
        }
        if (params.verifierHeight !== undefined) {
            this.verifierHeight = params.verifierHeight;
        }
        if (params.verifierXBias !== undefined) {
            this.verifierXBias = params.verifierXBias;
        }
        if (params.verifierYBias !== undefined) {
            this.verifierYBias = params.verifierYBias;
        }
        if (params.swipeCircleRadius !== undefined) {
            this.swipeCircleRadius = params.swipeCircleRadius;
        }
        if (params.borderPadding !== undefined) {
            this.borderPadding = params.borderPadding;
        }
        if (params.simpleStartTime !== undefined) {
            this.simpleStartTime = params.simpleStartTime;
        }
        if (params.simpleEndTime !== undefined) {
            this.simpleEndTime = params.simpleEndTime;
        }
        if (params.VerifyThreshold !== undefined) {
            this.VerifyThreshold = params.VerifyThreshold;
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
        this.__verifierPosLeft.aboutToBeDeleted();
        this.__StartRealXBias.aboutToBeDeleted();
        this.__StartRealYBias.aboutToBeDeleted();
        this.__verifierXBias.aboutToBeDeleted();
        this.__verifierYBias.aboutToBeDeleted();
        this.__simpleStartTime.aboutToBeDeleted();
        this.__simpleEndTime.aboutToBeDeleted();
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
    /**
     * 组件宽高
     */
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
    /**
     * 图片相关参数
     */
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
    private ImgWidth: number;
    private ImgHeight: number;
    /**
     * 滑块的动态位置
     */
    private __verifierPosLeft: ObservedPropertySimple<number>;
    get verifierPosLeft() {
        return this.__verifierPosLeft.get();
    }
    set verifierPosLeft(newValue: number) {
        this.__verifierPosLeft.set(newValue);
    }
    /**
     * 滑块触摸开始的实际位置 X轴
     */
    private __StartRealXBias: ObservedPropertySimple<number>; //X轴
    get StartRealXBias() {
        return this.__StartRealXBias.get();
    }
    set StartRealXBias(newValue: number) {
        this.__StartRealXBias.set(newValue);
    }
    /**
     * 滑块触摸开始的实际位置 Y轴
     */
    private __StartRealYBias: ObservedPropertySimple<number>; //Y轴
    get StartRealYBias() {
        return this.__StartRealYBias.get();
    }
    set StartRealYBias(newValue: number) {
        this.__StartRealYBias.set(newValue);
    }
    //缺口宽高，滑块宽高与缺口宽高一致即可
    /**
     * 缺口宽高，滑块宽高与缺口宽高一致即可
     */
    private verifierWidth: number;
    private verifierHeight: number;
    /**
     * 缺口触摸开始的实际位置 X轴
     */
    private __verifierXBias: ObservedPropertySimple<number>; //X轴
    get verifierXBias() {
        return this.__verifierXBias.get();
    }
    set verifierXBias(newValue: number) {
        this.__verifierXBias.set(newValue);
    }
    /**
     * 缺口触摸开始的实际位置 Y轴
     */
    private __verifierYBias: ObservedPropertySimple<number>; //Y轴
    get verifierYBias() {
        return this.__verifierYBias.get();
    }
    set verifierYBias(newValue: number) {
        this.__verifierYBias.set(newValue);
    }
    /**
     * //上、右突出的半径
     */
    private swipeCircleRadius: number; //
    /**
     * //边界20%的区域内不会生成缺口
     */
    private borderPadding: number;
    /**
     * //时间戳信息
     */
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
    /**
     * //偏差阈值，10%以内通过
     */
    private VerifyThreshold: number;
    /**
     * 已经滑过区域的颜色
     */
    private simpleSlideColor: string;
    /**
     * 验证结果的可见性
     */
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
    /**
     * 提示文字的可见性
     */
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
            x: this.verifierPosLeft, //当该参数被修改时，滑块位置也动态修改
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
            /*随机生成缺口位置*/
            // 1.上下左右边框一定距离内不能生成缺口
            // 2.缺口不与滑块重叠，且不越界
            this.swipeCircleRadius = this.swipeCircleRadius * this.verifierWidth / 50;
            this.CurImgUrl_id = Math.round(Math.random() * (8 - 1));
            this.CurImgUrl = this.ImgList[this.CurImgUrl_id].name;
            this.swipeCircleRadius = this.swipeCircleRadius * this.verifierWidth / 50;
            let xMin = this.verifierWidth + this.swipeCircleRadius + this.verifierWidth * this.borderPadding;
            let xMax = this.ImgWidth - this.verifierWidth - this.ImgWidth * this.borderPadding;
            let yMin = this.swipeCircleRadius + this.verifierHeight * this.borderPadding;
            let yMax = this.ImgHeight - this.verifierHeight - this.ImgHeight * this.borderPadding;
            // x-y范围内的随机整数表示为Math.round(Math.random()*(y-x)+x)
            this.verifierXBias = Math.round(Math.random() * (xMax - xMin) + xMin);
            this.verifierYBias = Math.round(Math.random() * (yMax - yMin) + yMin);
            console.log("【swipePuzzle】当前图片文件名为：" + this.CurImgUrl);
            console.log("【swipePuzzle】 ImgList.length = " + this.ImgList.length);
            console.log("【swipePuzzle】verifierXBias = " + this.verifierXBias + "\tverifierYBias = " + this.verifierYBias + "\tCurImgUrl_id = " + this.CurImgUrl_id);
        });
        Stack.create();
        Stack.width(this.verifierWidth);
        Stack.height(this.verifierHeight);
        Stack.position({
            x: this.verifierXBias,
            y: this.verifierYBias
        });
        //缺口顶部
        Text.create();
        //缺口顶部
        Text.borderRadius(this.swipeCircleRadius);
        //缺口顶部
        Text.width(this.swipeCircleRadius * 2);
        //缺口顶部
        Text.height(this.swipeCircleRadius * 2);
        //缺口顶部
        Text.offset({
            x: 0,
            y: -0.5 * this.verifierWidth + 4
        });
        __Text__verifierStyle();
        //缺口顶部
        Text.pop();
        //缺口右部
        Text.create();
        //缺口右部
        Text.borderRadius(this.swipeCircleRadius);
        //缺口右部
        Text.width(this.swipeCircleRadius * 2);
        //缺口右部
        Text.height(this.swipeCircleRadius * 2);
        //缺口右部
        Text.offset({
            x: 0.5 * this.verifierWidth - 4,
            y: 0
        });
        __Text__verifierStyle();
        //缺口右部
        Text.pop();
        //缺口方块
        Text.create();
        //缺口方块
        Text.width(this.verifierWidth);
        //缺口方块
        Text.height(this.verifierHeight);
        //缺口方块
        Text.borderRadius(2);
        __Text__verifierStyle();
        //缺口方块
        Text.pop();
        Stack.pop();
        Stack.create();
        Stack.width(this.verifierWidth);
        Stack.height(this.verifierHeight);
        Stack.position({
            x: this.verifierPosLeft,
            y: this.verifierYBias
        });
        Stack.borderColor(Color.Black);
        //拼图滑块顶部
        Image.create($rawfile(this.CurImgUrl));
        //拼图滑块顶部
        Image.width(280);
        //拼图滑块顶部
        Image.height(220);
        //拼图滑块顶部
        Image.clip(new Path({
            commands: "M" + vp2px(this.verifierXBias + this.verifierWidth / 2 - this.swipeCircleRadius) + " " + vp2px(this.verifierYBias) + " S" + vp2px(this.verifierXBias + this.verifierWidth / 2) + " " + vp2px(this.verifierYBias - this.swipeCircleRadius - 5) + " " + vp2px(this.verifierXBias + this.verifierWidth / 2 + this.swipeCircleRadius) + " " + vp2px(this.verifierYBias) + " Z"
        }));
        //拼图滑块顶部
        Image.position({
            x: -this.verifierXBias,
            y: -this.verifierYBias
        });
        //拼图滑块右部
        //              Flex()
        //                .backgroundImage($rawfile(this.ImgList[this.CurImgUrl_id].name), ImageRepeat.NoRepeat)
        //                .width(2 * this.swipeCircleRadius)
        //                .height(2 * this.swipeCircleRadius)
        //                .backgroundImagePosition(Alignment.Center)
        //                .backgroundImageSize(ImageSize.Auto)
        //                .borderRadius(this.swipeCircleRadius)
        //                .offset({
        //                  x: 0.5 * this.verifierWidth,
        //                  y: 0
        //                })
        //                .backgroundImagePosition({
        //                  x: -this.verifierYBias - 0.5 * this.swipeCircleRadius,
        //                  y: -this.verifierXBias
        //                })
        //              Flex()
        //                .backgroundImage($rawfile(this.ImgList[this.CurImgUrl_id].name), ImageRepeat.NoRepeat)
        //              Image($rawfile(this.ImgList[this.CurImgUrl_id].name))
        //                //                .backgroundImageSize(ImageSize.Auto)
        //                .width(this.verifierWidth)
        //                .height(this.verifierHeight)
        //                .clip(new Path({
        //                  commands: "M" + vp2px(this.verifierXBias) + " " + vp2px(this.verifierYBias) + " L" + vp2px(this.verifierXBias + this.verifierWidth) + " " + vp2px(this.verifierYBias) + " L" + vp2px(this.verifierXBias + this.verifierWidth) + " " + vp2px(this.verifierYBias + this.verifierHeight) + " L" + vp2px(this.verifierXBias) + " " + vp2px(this.verifierYBias + this.verifierHeight) + " Z"
        //                }))
        //                  //                .clip()
        //                .zIndex(10)
        //                .backgroundImagePosition({
        //                  x: -this.verifierXBias,
        //                  y: -this.verifierYBias
        //                })
        //                .borderWidth(2)
        //                .borderColor(Color.Yellow)
        //右半圆图片匹配
        Image.create($rawfile(this.CurImgUrl));
        //拼图滑块右部
        //              Flex()
        //                .backgroundImage($rawfile(this.ImgList[this.CurImgUrl_id].name), ImageRepeat.NoRepeat)
        //                .width(2 * this.swipeCircleRadius)
        //                .height(2 * this.swipeCircleRadius)
        //                .backgroundImagePosition(Alignment.Center)
        //                .backgroundImageSize(ImageSize.Auto)
        //                .borderRadius(this.swipeCircleRadius)
        //                .offset({
        //                  x: 0.5 * this.verifierWidth,
        //                  y: 0
        //                })
        //                .backgroundImagePosition({
        //                  x: -this.verifierYBias - 0.5 * this.swipeCircleRadius,
        //                  y: -this.verifierXBias
        //                })
        //              Flex()
        //                .backgroundImage($rawfile(this.ImgList[this.CurImgUrl_id].name), ImageRepeat.NoRepeat)
        //              Image($rawfile(this.ImgList[this.CurImgUrl_id].name))
        //                //                .backgroundImageSize(ImageSize.Auto)
        //                .width(this.verifierWidth)
        //                .height(this.verifierHeight)
        //                .clip(new Path({
        //                  commands: "M" + vp2px(this.verifierXBias) + " " + vp2px(this.verifierYBias) + " L" + vp2px(this.verifierXBias + this.verifierWidth) + " " + vp2px(this.verifierYBias) + " L" + vp2px(this.verifierXBias + this.verifierWidth) + " " + vp2px(this.verifierYBias + this.verifierHeight) + " L" + vp2px(this.verifierXBias) + " " + vp2px(this.verifierYBias + this.verifierHeight) + " Z"
        //                }))
        //                  //                .clip()
        //                .zIndex(10)
        //                .backgroundImagePosition({
        //                  x: -this.verifierXBias,
        //                  y: -this.verifierYBias
        //                })
        //                .borderWidth(2)
        //                .borderColor(Color.Yellow)
        //右半圆图片匹配
        Image.width(280);
        //拼图滑块右部
        //              Flex()
        //                .backgroundImage($rawfile(this.ImgList[this.CurImgUrl_id].name), ImageRepeat.NoRepeat)
        //                .width(2 * this.swipeCircleRadius)
        //                .height(2 * this.swipeCircleRadius)
        //                .backgroundImagePosition(Alignment.Center)
        //                .backgroundImageSize(ImageSize.Auto)
        //                .borderRadius(this.swipeCircleRadius)
        //                .offset({
        //                  x: 0.5 * this.verifierWidth,
        //                  y: 0
        //                })
        //                .backgroundImagePosition({
        //                  x: -this.verifierYBias - 0.5 * this.swipeCircleRadius,
        //                  y: -this.verifierXBias
        //                })
        //              Flex()
        //                .backgroundImage($rawfile(this.ImgList[this.CurImgUrl_id].name), ImageRepeat.NoRepeat)
        //              Image($rawfile(this.ImgList[this.CurImgUrl_id].name))
        //                //                .backgroundImageSize(ImageSize.Auto)
        //                .width(this.verifierWidth)
        //                .height(this.verifierHeight)
        //                .clip(new Path({
        //                  commands: "M" + vp2px(this.verifierXBias) + " " + vp2px(this.verifierYBias) + " L" + vp2px(this.verifierXBias + this.verifierWidth) + " " + vp2px(this.verifierYBias) + " L" + vp2px(this.verifierXBias + this.verifierWidth) + " " + vp2px(this.verifierYBias + this.verifierHeight) + " L" + vp2px(this.verifierXBias) + " " + vp2px(this.verifierYBias + this.verifierHeight) + " Z"
        //                }))
        //                  //                .clip()
        //                .zIndex(10)
        //                .backgroundImagePosition({
        //                  x: -this.verifierXBias,
        //                  y: -this.verifierYBias
        //                })
        //                .borderWidth(2)
        //                .borderColor(Color.Yellow)
        //右半圆图片匹配
        Image.height(220);
        //拼图滑块右部
        //              Flex()
        //                .backgroundImage($rawfile(this.ImgList[this.CurImgUrl_id].name), ImageRepeat.NoRepeat)
        //                .width(2 * this.swipeCircleRadius)
        //                .height(2 * this.swipeCircleRadius)
        //                .backgroundImagePosition(Alignment.Center)
        //                .backgroundImageSize(ImageSize.Auto)
        //                .borderRadius(this.swipeCircleRadius)
        //                .offset({
        //                  x: 0.5 * this.verifierWidth,
        //                  y: 0
        //                })
        //                .backgroundImagePosition({
        //                  x: -this.verifierYBias - 0.5 * this.swipeCircleRadius,
        //                  y: -this.verifierXBias
        //                })
        //              Flex()
        //                .backgroundImage($rawfile(this.ImgList[this.CurImgUrl_id].name), ImageRepeat.NoRepeat)
        //              Image($rawfile(this.ImgList[this.CurImgUrl_id].name))
        //                //                .backgroundImageSize(ImageSize.Auto)
        //                .width(this.verifierWidth)
        //                .height(this.verifierHeight)
        //                .clip(new Path({
        //                  commands: "M" + vp2px(this.verifierXBias) + " " + vp2px(this.verifierYBias) + " L" + vp2px(this.verifierXBias + this.verifierWidth) + " " + vp2px(this.verifierYBias) + " L" + vp2px(this.verifierXBias + this.verifierWidth) + " " + vp2px(this.verifierYBias + this.verifierHeight) + " L" + vp2px(this.verifierXBias) + " " + vp2px(this.verifierYBias + this.verifierHeight) + " Z"
        //                }))
        //                  //                .clip()
        //                .zIndex(10)
        //                .backgroundImagePosition({
        //                  x: -this.verifierXBias,
        //                  y: -this.verifierYBias
        //                })
        //                .borderWidth(2)
        //                .borderColor(Color.Yellow)
        //右半圆图片匹配
        Image.clip(new Path({
            commands: "M" + vp2px(this.verifierXBias + this.verifierWidth) + " " + vp2px(this.verifierYBias + this.verifierHeight / 2 - this.swipeCircleRadius) + " S" + vp2px(this.verifierXBias + this.verifierWidth + this.swipeCircleRadius + 5) + " " + vp2px(this.verifierYBias + this.verifierHeight / 2) + " " + vp2px(this.verifierXBias + this.verifierWidth) + " " + vp2px(this.verifierYBias + this.verifierHeight / 2 + this.swipeCircleRadius) + " Z"
        }));
        //拼图滑块右部
        //              Flex()
        //                .backgroundImage($rawfile(this.ImgList[this.CurImgUrl_id].name), ImageRepeat.NoRepeat)
        //                .width(2 * this.swipeCircleRadius)
        //                .height(2 * this.swipeCircleRadius)
        //                .backgroundImagePosition(Alignment.Center)
        //                .backgroundImageSize(ImageSize.Auto)
        //                .borderRadius(this.swipeCircleRadius)
        //                .offset({
        //                  x: 0.5 * this.verifierWidth,
        //                  y: 0
        //                })
        //                .backgroundImagePosition({
        //                  x: -this.verifierYBias - 0.5 * this.swipeCircleRadius,
        //                  y: -this.verifierXBias
        //                })
        //              Flex()
        //                .backgroundImage($rawfile(this.ImgList[this.CurImgUrl_id].name), ImageRepeat.NoRepeat)
        //              Image($rawfile(this.ImgList[this.CurImgUrl_id].name))
        //                //                .backgroundImageSize(ImageSize.Auto)
        //                .width(this.verifierWidth)
        //                .height(this.verifierHeight)
        //                .clip(new Path({
        //                  commands: "M" + vp2px(this.verifierXBias) + " " + vp2px(this.verifierYBias) + " L" + vp2px(this.verifierXBias + this.verifierWidth) + " " + vp2px(this.verifierYBias) + " L" + vp2px(this.verifierXBias + this.verifierWidth) + " " + vp2px(this.verifierYBias + this.verifierHeight) + " L" + vp2px(this.verifierXBias) + " " + vp2px(this.verifierYBias + this.verifierHeight) + " Z"
        //                }))
        //                  //                .clip()
        //                .zIndex(10)
        //                .backgroundImagePosition({
        //                  x: -this.verifierXBias,
        //                  y: -this.verifierYBias
        //                })
        //                .borderWidth(2)
        //                .borderColor(Color.Yellow)
        //右半圆图片匹配
        Image.position({
            x: -this.verifierXBias,
            y: -this.verifierYBias
        });
        //              Image($rawfile(this.ImgList[this.CurImgUrl_id].name))
        //                .width(300)
        //                .height(200)
        //                .clip(new Path({commands: "M"+vp2px(200)+" "+vp2px(80)+" L"+vp2px(250)+" "+vp2px(80)+" L"+vp2px(250)+" "+vp2px(130)+" L"+vp2px(200)+" "+vp2px(130)+" Z"}))
        //                .position({
        //                  x:0,
        //                  y:0
        //                })
        //                .borderWidth(2)
        //              .borderColor("#aabbcc")
        //              .zIndex(15)
        /**
         * 方块图片匹配
         */
        Image.create($rawfile(this.CurImgUrl));
        //              Image($rawfile(this.ImgList[this.CurImgUrl_id].name))
        //                .width(300)
        //                .height(200)
        //                .clip(new Path({commands: "M"+vp2px(200)+" "+vp2px(80)+" L"+vp2px(250)+" "+vp2px(80)+" L"+vp2px(250)+" "+vp2px(130)+" L"+vp2px(200)+" "+vp2px(130)+" Z"}))
        //                .position({
        //                  x:0,
        //                  y:0
        //                })
        //                .borderWidth(2)
        //              .borderColor("#aabbcc")
        //              .zIndex(15)
        /**
         * 方块图片匹配
         */
        Image.width(280);
        //              Image($rawfile(this.ImgList[this.CurImgUrl_id].name))
        //                .width(300)
        //                .height(200)
        //                .clip(new Path({commands: "M"+vp2px(200)+" "+vp2px(80)+" L"+vp2px(250)+" "+vp2px(80)+" L"+vp2px(250)+" "+vp2px(130)+" L"+vp2px(200)+" "+vp2px(130)+" Z"}))
        //                .position({
        //                  x:0,
        //                  y:0
        //                })
        //                .borderWidth(2)
        //              .borderColor("#aabbcc")
        //              .zIndex(15)
        /**
         * 方块图片匹配
         */
        Image.height(220);
        //              Image($rawfile(this.ImgList[this.CurImgUrl_id].name))
        //                .width(300)
        //                .height(200)
        //                .clip(new Path({commands: "M"+vp2px(200)+" "+vp2px(80)+" L"+vp2px(250)+" "+vp2px(80)+" L"+vp2px(250)+" "+vp2px(130)+" L"+vp2px(200)+" "+vp2px(130)+" Z"}))
        //                .position({
        //                  x:0,
        //                  y:0
        //                })
        //                .borderWidth(2)
        //              .borderColor("#aabbcc")
        //              .zIndex(15)
        /**
         * 方块图片匹配
         */
        Image.clip(new Path({
            commands: "M" + vp2px(this.verifierXBias - 1) + " " + vp2px(this.verifierYBias + 3) +
                " L" + vp2px(this.verifierXBias + this.verifierWidth + 1) + " " + vp2px(this.verifierYBias + 3) +
                " L" + vp2px(this.verifierXBias + this.verifierWidth + 1) + " " + vp2px(this.verifierYBias + this.verifierHeight + 3) +
                " L" + vp2px(this.verifierXBias - 1) + " " + vp2px(this.verifierYBias + this.verifierHeight + 3) + " Z"
        }));
        //              Image($rawfile(this.ImgList[this.CurImgUrl_id].name))
        //                .width(300)
        //                .height(200)
        //                .clip(new Path({commands: "M"+vp2px(200)+" "+vp2px(80)+" L"+vp2px(250)+" "+vp2px(80)+" L"+vp2px(250)+" "+vp2px(130)+" L"+vp2px(200)+" "+vp2px(130)+" Z"}))
        //                .position({
        //                  x:0,
        //                  y:0
        //                })
        //                .borderWidth(2)
        //              .borderColor("#aabbcc")
        //              .zIndex(15)
        /**
         * 方块图片匹配
         */
        Image.position({
            x: -this.verifierXBias,
            y: -this.verifierYBias - 3
        });
        Stack.pop();
        //            Image($rawfile(this.ImgList[this.CurImgUrl_id].name))
        //              .width(280)
        //              .height(220)
        ////              .clip(new Path({commands: "M"+vp2px(100)+" "+vp2px(80)+" L"+vp2px(150)+" "+vp2px(80)+" L"+vp2px(150)+" "+vp2px(130)+" L"+vp2px(100)+" "+vp2px(130)+" Z"}))
        //              .clip(new Path({commands: "M"+vp2px(this.verifierXBias)+" "+vp2px(this.verifierYBias)+" L"+vp2px(this.verifierXBias+this.verifierWidth)+" "+vp2px(this.verifierYBias)+" L"+vp2px(this.verifierXBias+this.verifierWidth)+" "+vp2px(this.verifierYBias+this.verifierHeight)+" L"+vp2px(this.verifierXBias)+" "+vp2px(this.verifierYBias+this.verifierHeight)+" Z"}))
        //              .position({
        //                x:-this.verifierXBias+this.verifierPosLeft,
        //                y:0
        //              })
        //图像匹配测试
        //            Image($rawfile(this.ImgList[this.CurImgUrl_id].name))
        //              .width(280)
        //              .height(220)
        //                //                            .clip(new Path({commands: "M"+vp2px(200)+" "+vp2px(80)+" L"+vp2px(250)+" "+vp2px(80)+" L"+vp2px(250)+" "+vp2px(130)+" L"+vp2px(200)+" "+vp2px(130)+" Z"}))
        //              .position({
        //                x: 0,
        //                y: 0
        //              })
        //              .opacity(0.3)
        //验证结果
        Text.create('验证成功！用时' + (this.simpleEndTime - this.simpleStartTime) / 1000 + 's');
        //            Image($rawfile(this.ImgList[this.CurImgUrl_id].name))
        //              .width(280)
        //              .height(220)
        ////              .clip(new Path({commands: "M"+vp2px(100)+" "+vp2px(80)+" L"+vp2px(150)+" "+vp2px(80)+" L"+vp2px(150)+" "+vp2px(130)+" L"+vp2px(100)+" "+vp2px(130)+" Z"}))
        //              .clip(new Path({commands: "M"+vp2px(this.verifierXBias)+" "+vp2px(this.verifierYBias)+" L"+vp2px(this.verifierXBias+this.verifierWidth)+" "+vp2px(this.verifierYBias)+" L"+vp2px(this.verifierXBias+this.verifierWidth)+" "+vp2px(this.verifierYBias+this.verifierHeight)+" L"+vp2px(this.verifierXBias)+" "+vp2px(this.verifierYBias+this.verifierHeight)+" Z"}))
        //              .position({
        //                x:-this.verifierXBias+this.verifierPosLeft,
        //                y:0
        //              })
        //图像匹配测试
        //            Image($rawfile(this.ImgList[this.CurImgUrl_id].name))
        //              .width(280)
        //              .height(220)
        //                //                            .clip(new Path({commands: "M"+vp2px(200)+" "+vp2px(80)+" L"+vp2px(250)+" "+vp2px(80)+" L"+vp2px(250)+" "+vp2px(130)+" L"+vp2px(200)+" "+vp2px(130)+" Z"}))
        //              .position({
        //                x: 0,
        //                y: 0
        //              })
        //              .opacity(0.3)
        //验证结果
        Text.width(280);
        //            Image($rawfile(this.ImgList[this.CurImgUrl_id].name))
        //              .width(280)
        //              .height(220)
        ////              .clip(new Path({commands: "M"+vp2px(100)+" "+vp2px(80)+" L"+vp2px(150)+" "+vp2px(80)+" L"+vp2px(150)+" "+vp2px(130)+" L"+vp2px(100)+" "+vp2px(130)+" Z"}))
        //              .clip(new Path({commands: "M"+vp2px(this.verifierXBias)+" "+vp2px(this.verifierYBias)+" L"+vp2px(this.verifierXBias+this.verifierWidth)+" "+vp2px(this.verifierYBias)+" L"+vp2px(this.verifierXBias+this.verifierWidth)+" "+vp2px(this.verifierYBias+this.verifierHeight)+" L"+vp2px(this.verifierXBias)+" "+vp2px(this.verifierYBias+this.verifierHeight)+" Z"}))
        //              .position({
        //                x:-this.verifierXBias+this.verifierPosLeft,
        //                y:0
        //              })
        //图像匹配测试
        //            Image($rawfile(this.ImgList[this.CurImgUrl_id].name))
        //              .width(280)
        //              .height(220)
        //                //                            .clip(new Path({commands: "M"+vp2px(200)+" "+vp2px(80)+" L"+vp2px(250)+" "+vp2px(80)+" L"+vp2px(250)+" "+vp2px(130)+" L"+vp2px(200)+" "+vp2px(130)+" Z"}))
        //              .position({
        //                x: 0,
        //                y: 0
        //              })
        //              .opacity(0.3)
        //验证结果
        Text.fontSize(15);
        //            Image($rawfile(this.ImgList[this.CurImgUrl_id].name))
        //              .width(280)
        //              .height(220)
        ////              .clip(new Path({commands: "M"+vp2px(100)+" "+vp2px(80)+" L"+vp2px(150)+" "+vp2px(80)+" L"+vp2px(150)+" "+vp2px(130)+" L"+vp2px(100)+" "+vp2px(130)+" Z"}))
        //              .clip(new Path({commands: "M"+vp2px(this.verifierXBias)+" "+vp2px(this.verifierYBias)+" L"+vp2px(this.verifierXBias+this.verifierWidth)+" "+vp2px(this.verifierYBias)+" L"+vp2px(this.verifierXBias+this.verifierWidth)+" "+vp2px(this.verifierYBias+this.verifierHeight)+" L"+vp2px(this.verifierXBias)+" "+vp2px(this.verifierYBias+this.verifierHeight)+" Z"}))
        //              .position({
        //                x:-this.verifierXBias+this.verifierPosLeft,
        //                y:0
        //              })
        //图像匹配测试
        //            Image($rawfile(this.ImgList[this.CurImgUrl_id].name))
        //              .width(280)
        //              .height(220)
        //                //                            .clip(new Path({commands: "M"+vp2px(200)+" "+vp2px(80)+" L"+vp2px(250)+" "+vp2px(80)+" L"+vp2px(250)+" "+vp2px(130)+" L"+vp2px(200)+" "+vp2px(130)+" Z"}))
        //              .position({
        //                x: 0,
        //                y: 0
        //              })
        //              .opacity(0.3)
        //验证结果
        Text.fontColor(Color.White);
        //            Image($rawfile(this.ImgList[this.CurImgUrl_id].name))
        //              .width(280)
        //              .height(220)
        ////              .clip(new Path({commands: "M"+vp2px(100)+" "+vp2px(80)+" L"+vp2px(150)+" "+vp2px(80)+" L"+vp2px(150)+" "+vp2px(130)+" L"+vp2px(100)+" "+vp2px(130)+" Z"}))
        //              .clip(new Path({commands: "M"+vp2px(this.verifierXBias)+" "+vp2px(this.verifierYBias)+" L"+vp2px(this.verifierXBias+this.verifierWidth)+" "+vp2px(this.verifierYBias)+" L"+vp2px(this.verifierXBias+this.verifierWidth)+" "+vp2px(this.verifierYBias+this.verifierHeight)+" L"+vp2px(this.verifierXBias)+" "+vp2px(this.verifierYBias+this.verifierHeight)+" Z"}))
        //              .position({
        //                x:-this.verifierXBias+this.verifierPosLeft,
        //                y:0
        //              })
        //图像匹配测试
        //            Image($rawfile(this.ImgList[this.CurImgUrl_id].name))
        //              .width(280)
        //              .height(220)
        //                //                            .clip(new Path({commands: "M"+vp2px(200)+" "+vp2px(80)+" L"+vp2px(250)+" "+vp2px(80)+" L"+vp2px(250)+" "+vp2px(130)+" L"+vp2px(200)+" "+vp2px(130)+" Z"}))
        //              .position({
        //                x: 0,
        //                y: 0
        //              })
        //              .opacity(0.3)
        //验证结果
        Text.backgroundColor('#008000');
        //            Image($rawfile(this.ImgList[this.CurImgUrl_id].name))
        //              .width(280)
        //              .height(220)
        ////              .clip(new Path({commands: "M"+vp2px(100)+" "+vp2px(80)+" L"+vp2px(150)+" "+vp2px(80)+" L"+vp2px(150)+" "+vp2px(130)+" L"+vp2px(100)+" "+vp2px(130)+" Z"}))
        //              .clip(new Path({commands: "M"+vp2px(this.verifierXBias)+" "+vp2px(this.verifierYBias)+" L"+vp2px(this.verifierXBias+this.verifierWidth)+" "+vp2px(this.verifierYBias)+" L"+vp2px(this.verifierXBias+this.verifierWidth)+" "+vp2px(this.verifierYBias+this.verifierHeight)+" L"+vp2px(this.verifierXBias)+" "+vp2px(this.verifierYBias+this.verifierHeight)+" Z"}))
        //              .position({
        //                x:-this.verifierXBias+this.verifierPosLeft,
        //                y:0
        //              })
        //图像匹配测试
        //            Image($rawfile(this.ImgList[this.CurImgUrl_id].name))
        //              .width(280)
        //              .height(220)
        //                //                            .clip(new Path({commands: "M"+vp2px(200)+" "+vp2px(80)+" L"+vp2px(250)+" "+vp2px(80)+" L"+vp2px(250)+" "+vp2px(130)+" L"+vp2px(200)+" "+vp2px(130)+" Z"}))
        //              .position({
        //                x: 0,
        //                y: 0
        //              })
        //              .opacity(0.3)
        //验证结果
        Text.textAlign(TextAlign.Center);
        //            Image($rawfile(this.ImgList[this.CurImgUrl_id].name))
        //              .width(280)
        //              .height(220)
        ////              .clip(new Path({commands: "M"+vp2px(100)+" "+vp2px(80)+" L"+vp2px(150)+" "+vp2px(80)+" L"+vp2px(150)+" "+vp2px(130)+" L"+vp2px(100)+" "+vp2px(130)+" Z"}))
        //              .clip(new Path({commands: "M"+vp2px(this.verifierXBias)+" "+vp2px(this.verifierYBias)+" L"+vp2px(this.verifierXBias+this.verifierWidth)+" "+vp2px(this.verifierYBias)+" L"+vp2px(this.verifierXBias+this.verifierWidth)+" "+vp2px(this.verifierYBias+this.verifierHeight)+" L"+vp2px(this.verifierXBias)+" "+vp2px(this.verifierYBias+this.verifierHeight)+" Z"}))
        //              .position({
        //                x:-this.verifierXBias+this.verifierPosLeft,
        //                y:0
        //              })
        //图像匹配测试
        //            Image($rawfile(this.ImgList[this.CurImgUrl_id].name))
        //              .width(280)
        //              .height(220)
        //                //                            .clip(new Path({commands: "M"+vp2px(200)+" "+vp2px(80)+" L"+vp2px(250)+" "+vp2px(80)+" L"+vp2px(250)+" "+vp2px(130)+" L"+vp2px(200)+" "+vp2px(130)+" Z"}))
        //              .position({
        //                x: 0,
        //                y: 0
        //              })
        //              .opacity(0.3)
        //验证结果
        Text.visibility(this.resultVisibility_true);
        //            Image($rawfile(this.ImgList[this.CurImgUrl_id].name))
        //              .width(280)
        //              .height(220)
        ////              .clip(new Path({commands: "M"+vp2px(100)+" "+vp2px(80)+" L"+vp2px(150)+" "+vp2px(80)+" L"+vp2px(150)+" "+vp2px(130)+" L"+vp2px(100)+" "+vp2px(130)+" Z"}))
        //              .clip(new Path({commands: "M"+vp2px(this.verifierXBias)+" "+vp2px(this.verifierYBias)+" L"+vp2px(this.verifierXBias+this.verifierWidth)+" "+vp2px(this.verifierYBias)+" L"+vp2px(this.verifierXBias+this.verifierWidth)+" "+vp2px(this.verifierYBias+this.verifierHeight)+" L"+vp2px(this.verifierXBias)+" "+vp2px(this.verifierYBias+this.verifierHeight)+" Z"}))
        //              .position({
        //                x:-this.verifierXBias+this.verifierPosLeft,
        //                y:0
        //              })
        //图像匹配测试
        //            Image($rawfile(this.ImgList[this.CurImgUrl_id].name))
        //              .width(280)
        //              .height(220)
        //                //                            .clip(new Path({commands: "M"+vp2px(200)+" "+vp2px(80)+" L"+vp2px(250)+" "+vp2px(80)+" L"+vp2px(250)+" "+vp2px(130)+" L"+vp2px(200)+" "+vp2px(130)+" Z"}))
        //              .position({
        //                x: 0,
        //                y: 0
        //              })
        //              .opacity(0.3)
        //验证结果
        Text.position({
            y: 0
        });
        //            Image($rawfile(this.ImgList[this.CurImgUrl_id].name))
        //              .width(280)
        //              .height(220)
        ////              .clip(new Path({commands: "M"+vp2px(100)+" "+vp2px(80)+" L"+vp2px(150)+" "+vp2px(80)+" L"+vp2px(150)+" "+vp2px(130)+" L"+vp2px(100)+" "+vp2px(130)+" Z"}))
        //              .clip(new Path({commands: "M"+vp2px(this.verifierXBias)+" "+vp2px(this.verifierYBias)+" L"+vp2px(this.verifierXBias+this.verifierWidth)+" "+vp2px(this.verifierYBias)+" L"+vp2px(this.verifierXBias+this.verifierWidth)+" "+vp2px(this.verifierYBias+this.verifierHeight)+" L"+vp2px(this.verifierXBias)+" "+vp2px(this.verifierYBias+this.verifierHeight)+" Z"}))
        //              .position({
        //                x:-this.verifierXBias+this.verifierPosLeft,
        //                y:0
        //              })
        //图像匹配测试
        //            Image($rawfile(this.ImgList[this.CurImgUrl_id].name))
        //              .width(280)
        //              .height(220)
        //                //                            .clip(new Path({commands: "M"+vp2px(200)+" "+vp2px(80)+" L"+vp2px(250)+" "+vp2px(80)+" L"+vp2px(250)+" "+vp2px(130)+" L"+vp2px(200)+" "+vp2px(130)+" Z"}))
        //              .position({
        //                x: 0,
        //                y: 0
        //              })
        //              .opacity(0.3)
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
            //重新生成缺口
            this.swipeCircleRadius = this.swipeCircleRadius * this.verifierWidth / 50;
            this.CurImgUrl_id = Math.round(Math.random() * (8 - 1));
            this.CurImgUrl = this.ImgList[this.CurImgUrl_id].name;
            console.log("【swipePuzzle】当前图片文件名为：" + this.CurImgUrl);
            console.log("=============【swipePuzzle】生成函数====");
            this.swipeCircleRadius = this.swipeCircleRadius * this.verifierWidth / 50;
            let xMin = this.verifierWidth + this.swipeCircleRadius + this.verifierWidth * this.borderPadding;
            let xMax = this.ImgWidth - this.verifierWidth - this.ImgWidth * this.borderPadding;
            let yMin = this.swipeCircleRadius + this.verifierHeight * this.borderPadding;
            let yMax = this.ImgHeight - this.verifierHeight - this.ImgHeight * this.borderPadding;
            // x-y范围内的随机整数表示为Math.round(Math.random()*(y-x)+x)
            this.verifierXBias = Math.round(Math.random() * (xMax - xMin) + xMin);
            this.verifierYBias = Math.round(Math.random() * (yMax - yMin) + yMin);
            console.log("【swipePuzzle】verifierXBias = " + this.verifierXBias + "\tverifierYBias = " + this.verifierYBias + "\tCurImgUrl_id = " + this.CurImgUrl_id);
        });
        Stack.pop();
        /*拼图区域*/
        Row.pop();
        /*滑轨*/
        Row.create();
        __Row__swipeRoad();
        /*滑轨*/
        Row.onDragEnter((event: DragEvent, extraParams: string) => {
            console.log('【swipePuzzle】onDragEnter');
        });
        /*滑轨*/
        Row.onDragMove((event: DragEvent, extraParams: String) => {
            let curX = event.getX();
            console.log("【simpleSwipe】Moving...");
            // 改变滑块位置且确保不越界
            if (curX <= this.StartRealXBias) {
                this.verifierPosLeft = 0;
            }
            else if (curX >= this.simpleRoadWidth - this.verifierWidth) {
                this.verifierPosLeft = this.simpleRoadWidth - this.verifierWidth;
            }
            else {
                (curX - this.StartRealXBias) > this.simpleRoadWidth - this.verifierWidth ? this.verifierPosLeft = this.simpleRoadWidth - this.verifierWidth : this.verifierPosLeft = (curX - this.StartRealXBias);
            }
            if (this.verifierPosLeft > this.simpleRoadWidth - this.verifierWidth)
                this.verifierPosLeft = this.simpleRoadWidth - this.verifierWidth;
            console.log("【simpleSwipe】curX = " + curX + "\t simpleStartRealXBias = " + this.StartRealXBias + "\t simpleBlockPosLeft = " + this.verifierPosLeft);
        });
        /*滑轨*/
        Row.onDragLeave((event: DragEvent, extraParams: string) => {
            console.log("【simpleSwipe】Leave!");
            this.verifierPosLeft = 0;
        });
        /*滑轨*/
        Row.onDrop((event: DragEvent, extraParams: string) => {
            console.log("【simpleSwipe】Drop!");
            //获取滑动结束时间,以计算验证用时
            this.simpleEndTime = Date.now();
            //检查滑块位置进行验证并显示验证结果
            if (this.verifierPosLeft >= this.verifierXBias - this.verifierXBias * this.VerifyThreshold &&
                this.verifierPosLeft <= this.verifierXBias + this.verifierXBias * this.VerifyThreshold) {
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
                this.verifierPosLeft = 0;
                // 上下左右边框一定距离内不能生成缺口
                // 缺口不与滑块重叠，且不越界
                this.swipeCircleRadius = this.swipeCircleRadius * this.verifierWidth / 50;
                this.CurImgUrl_id = Math.round(Math.random() * (8 - 1) + 1);
                this.CurImgUrl = this.ImgList[this.CurImgUrl_id].name;
                console.log("=============【swipePuzzle】生成函数====");
                this.swipeCircleRadius = this.swipeCircleRadius * this.verifierWidth / 50;
                let xMin = this.verifierWidth + this.swipeCircleRadius + this.verifierWidth * this.borderPadding;
                let xMax = this.ImgWidth - this.verifierWidth - this.ImgWidth * this.borderPadding;
                let yMin = this.swipeCircleRadius + this.verifierHeight * this.borderPadding;
                let yMax = this.ImgHeight - this.verifierHeight - this.ImgHeight * this.borderPadding;
                // x-y范围内的随机整数表示为Math.round(Math.random()*(y-x)+x)
                this.verifierXBias = Math.round(Math.random() * (xMax - xMin) + xMin);
                this.verifierYBias = Math.round(Math.random() * (yMax - yMin) + yMin);
                console.log("【swipePuzzle】 verifierXBias = " + this.verifierXBias + "\tverifierYBias = " + this.verifierYBias + "\tCurImgUrl_id = " + this.CurImgUrl_id);
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
            this.StartRealXBias = event.getX();
            this.StartRealYBias = event.getY();
            //控制台输出，方便调试
            console.log("【swipePuzzle】滑块初始真实位置：[" + this.StartRealXBias + ", " + this.StartRealYBias + "] \t开始滑动时的时间：" + this.simpleStartTime);
            return { builder: () => {
                    this.Builder.call(this);
                } };
        });
        /*滑块*/
        Button.position({
            x: this.verifierPosLeft
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
        Text.width(this.verifierPosLeft + this.verifierWidth / 2);
        /*已经划过的区域*/
        Text.borderRadius(5);
        /*已经划过的区域*/
        Text.backgroundColor(this.simpleSlideColor);
        /*已经划过的区域*/
        Text.zIndex(5);
        /*已经划过的区域*/
        Text.pop();
        /*滑轨提示文字*/
        Text.create("滑动完成验证");
        __Text__swipeText();
        /*滑轨提示文字*/
        Text.visibility(this.simpleTextVisibility);
        /*滑轨提示文字*/
        Text.pop();
        //验证结果
        Text.create('验证成功,用时' + (this.simpleEndTime - this.simpleStartTime) / 1000 + 's');
        __Text__swipeText();
        //验证结果
        Text.fontColor(Color.White);
        //验证结果
        Text.zIndex(6);
        //验证结果
        Text.visibility(this.resultVisibility_true);
        //验证结果
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
