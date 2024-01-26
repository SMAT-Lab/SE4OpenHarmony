interface ImageZoom_Params {
    Img?: ImageItem;
    rotateValue?: number;
    scaleValue?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ImageZoom_" + ++__generate__Id;
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
export class ImageZoom extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__Img = AppStorage.SetAndLink("Img", new ImageItem(""), this, "Img");
        this.__rotateValue = new ObservedPropertySimple(0, this, "rotateValue");
        this.__scaleValue = new ObservedPropertySimple(10, this, "scaleValue");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ImageZoom_Params) {
        if (params.rotateValue !== undefined) {
            this.rotateValue = params.rotateValue;
        }
        if (params.scaleValue !== undefined) {
            this.scaleValue = params.scaleValue;
        }
    }
    aboutToBeDeleted() {
        this.__Img.aboutToBeDeleted();
        this.__rotateValue.aboutToBeDeleted();
        this.__scaleValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __Img: ObservedPropertyAbstract<ImageItem>;
    get Img() {
        return this.__Img.get();
    }
    set Img(newValue: ImageItem) {
        this.__Img.set(newValue);
    }
    private __rotateValue: ObservedPropertySimple<number>;
    get rotateValue() {
        return this.__rotateValue.get();
    }
    set rotateValue(newValue: number) {
        this.__rotateValue.set(newValue);
    }
    private __scaleValue: ObservedPropertySimple<number>;
    get scaleValue() {
        return this.__scaleValue.get();
    }
    set scaleValue(newValue: number) {
        this.__scaleValue.set(newValue);
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('95%');
        Stack.create();
        Stack.width('100%');
        Stack.height('80%');
        Stack.margin({ top: 10 });
        Row.create();
        Row.width('80%');
        Row.height('50%');
        Image.create($rawfile(this.Img.name));
        Image.rotate({
            x: 0,
            y: 0,
            z: 5,
            angle: this.rotateValue,
        });
        Image.scale({ x: this.scaleValue, y: this.scaleValue });
        Row.pop();
        Stack.pop();
        Row.create();
        Row.width('100%');
        Row.height('10%');
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Row.create();
        Text.create("旋转角度: " + this.rotateValue + "°");
        Text.fontSize(25);
        Text.margin({ top: 4 });
        Text.pop();
        Row.pop();
        Row.create();
        Text.create("-180°");
        Text.fontSize(15);
        Text.pop();
        Slider.create({
            value: this.rotateValue,
            min: -180,
            max: +180,
            step: 10,
            style: SliderStyle.OutSet,
            direction: Axis.Horizontal,
            reverse: false
        });
        Slider.width('75%');
        Slider.height(40);
        Slider.backgroundColor("#ffcbcbcf");
        Slider.blockColor(Color.Red);
        Slider.trackColor(Color.Pink);
        Slider.selectedColor(Color.Red);
        Slider.trackThickness(6);
        Slider.onChange((value: number, mode: SliderChangeMode) => {
            this.rotateValue = value;
            if ((this.rotateValue >= 0) && (this.rotateValue > parseInt(this.rotateValue + "")) && (this.rotateValue < parseInt(this.rotateValue + "") + 1)) {
                this.rotateValue = parseInt(this.rotateValue + "") + 1;
            }
            if ((this.rotateValue < 0) && (this.rotateValue < parseInt(this.rotateValue + "")) && (this.rotateValue > parseInt(this.rotateValue + "") - 1)) {
                this.rotateValue = parseInt(this.rotateValue + "");
            }
        });
        Text.create("+180°");
        Text.fontSize(15);
        Text.pop();
        Row.pop();
        Column.pop();
        Row.pop();
        Row.create();
        Row.width('100%');
        Row.height('10%');
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Row.create();
        Text.create("宽高缩放倍数: × " + this.scaleValue);
        Text.fontSize(25);
        Text.margin({ top: 4 });
        Text.onAppear(() => {
            this.scaleValue = parseFloat(1.0 + "");
        });
        Text.pop();
        Row.pop();
        Row.create();
        Text.create("0.1");
        Text.fontSize(15);
        Text.margin({ right: 5 });
        Text.pop();
        Slider.create({
            value: 10,
            min: 1,
            max: 20,
            step: 1,
            style: SliderStyle.OutSet,
            direction: Axis.Horizontal,
            reverse: false
        });
        Slider.width('75%');
        Slider.height(40);
        Slider.backgroundColor("#ffcbcbcf");
        Slider.blockColor(Color.Red);
        Slider.trackColor(Color.Pink);
        Slider.selectedColor(Color.Red);
        Slider.trackThickness(6);
        Slider.onChange((value: number, mode: SliderChangeMode) => {
            this.scaleValue = parseFloat((value / 10.0).toFixed(1));
        });
        Text.create("2.0");
        Text.fontSize(15);
        Text.margin(5);
        Text.pop();
        Row.pop();
        Column.pop();
        Row.pop();
        Column.pop();
    }
}
