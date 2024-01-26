interface Index1_Params {
    tension?: number;
    friction?: number;
    tensionSpringVal?: number;
    frictionSpringVal?: number;
    imageSize?: number;
    imgPath?: string;
    showComponent?: Visibility;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "index1_" + ++__generate__Id;
}
/**
 * BSD License
 *
 * Copyright (c) 2023 Huawei Device Co., Ltd. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * * Neither the name Facebook nor the names of its contributors may be used to
 * endorse or promote products derived from this software without specific
 * prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS' AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
import rebound from "@ohos/rebound";
class Index1 extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__tension = new ObservedPropertySimple(40, this, "tension");
        this.__friction = new ObservedPropertySimple(3, this, "friction");
        this.__tensionSpringVal = new ObservedPropertySimple(0, this, "tensionSpringVal");
        this.__frictionSpringVal = new ObservedPropertySimple(0, this, "frictionSpringVal");
        this.__imageSize = new ObservedPropertySimple(1, this, "imageSize");
        this.__imgPath = new ObservedPropertySimple("arrow_up.png", this, "imgPath");
        this.__showComponent = new ObservedPropertySimple(Visibility.Hidden, this, "showComponent");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index1_Params) {
        if (params.tension !== undefined) {
            this.tension = params.tension;
        }
        if (params.friction !== undefined) {
            this.friction = params.friction;
        }
        if (params.tensionSpringVal !== undefined) {
            this.tensionSpringVal = params.tensionSpringVal;
        }
        if (params.frictionSpringVal !== undefined) {
            this.frictionSpringVal = params.frictionSpringVal;
        }
        if (params.imageSize !== undefined) {
            this.imageSize = params.imageSize;
        }
        if (params.imgPath !== undefined) {
            this.imgPath = params.imgPath;
        }
        if (params.showComponent !== undefined) {
            this.showComponent = params.showComponent;
        }
    }
    aboutToBeDeleted() {
        this.__tension.aboutToBeDeleted();
        this.__friction.aboutToBeDeleted();
        this.__tensionSpringVal.aboutToBeDeleted();
        this.__frictionSpringVal.aboutToBeDeleted();
        this.__imageSize.aboutToBeDeleted();
        this.__imgPath.aboutToBeDeleted();
        this.__showComponent.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    public __tension: ObservedPropertySimple<number>;
    get tension() {
        return this.__tension.get();
    }
    set tension(newValue: number) {
        this.__tension.set(newValue);
    }
    public __friction: ObservedPropertySimple<number>;
    get friction() {
        return this.__friction.get();
    }
    set friction(newValue: number) {
        this.__friction.set(newValue);
    }
    public __tensionSpringVal: ObservedPropertySimple<number>;
    get tensionSpringVal() {
        return this.__tensionSpringVal.get();
    }
    set tensionSpringVal(newValue: number) {
        this.__tensionSpringVal.set(newValue);
    }
    public __frictionSpringVal: ObservedPropertySimple<number>;
    get frictionSpringVal() {
        return this.__frictionSpringVal.get();
    }
    set frictionSpringVal(newValue: number) {
        this.__frictionSpringVal.set(newValue);
    }
    public __imageSize: ObservedPropertySimple<number>;
    get imageSize() {
        return this.__imageSize.get();
    }
    set imageSize(newValue: number) {
        this.__imageSize.set(newValue);
    }
    public __imgPath: ObservedPropertySimple<string>;
    get imgPath() {
        return this.__imgPath.get();
    }
    set imgPath(newValue: string) {
        this.__imgPath.set(newValue);
    }
    public __showComponent: ObservedPropertySimple<Visibility>;
    get showComponent() {
        return this.__showComponent.get();
    }
    set showComponent(newValue: Visibility) {
        this.__showComponent.set(newValue);
    }
    render() {
        Stack.create({ alignContent: Alignment.Bottom });
        Image.create({ "id": 0, "type": 30000, params: ['landscape.jpg'] });
        Image.width('100%');
        Image.height('100%');
        Image.scale({ x: this.imageSize, y: this.imageSize });
        Image.onTouch((event: any) => {
            if (event.type == TouchType.Down) {
                initSpring(this);
                spring.setEndValue(1);
            }
            else if (event.type == TouchType.Up || event.type == TouchType.Cancel) {
                spring.setEndValue(0);
            }
        });
        Row.create();
        Row.margin({ bottom: 60 });
        Row.alignSelf(ItemAlign.End);
        Row.width('100%');
        Row.height('20%');
        Row.backgroundColor(Color.White);
        Row.visibility(this.showComponent);
        Column.create();
        Text.create('Tension');
        Text.fontSize(20);
        Text.margin({ top: 20 });
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create(this.tensionSpringVal.toFixed(2).toString());
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Regular);
        Text.pop();
        Text.create('Friction');
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.margin({ top: 15 });
        Text.alignSelf(ItemAlign.Start);
        Text.pop();
        Text.create(this.frictionSpringVal.toFixed(2).toString());
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Regular);
        Text.pop();
        Column.pop();
        Column.create();
        Column.alignSelf(ItemAlign.Center);
        Column.padding({ top: 10 });
        Slider.create({ "value": this.tension, min: 1, max: 100, step: 2 });
        Slider.showTips(true);
        Slider.onChange((value, mode) => {
            this.tension = value;
            setTension(this, value);
        });
        Slider.blockColor(Color.Blue);
        Slider.padding({ bottom: 20 });
        Slider.create({ "value": this.friction, min: 1, max: 30, step: 1 });
        Slider.showTips(true);
        Slider.onChange((value, mode) => {
            this.friction = value;
            setFriction(this, value);
        });
        Slider.blockColor(Color.Blue);
        Slider.margin({ top: 20 });
        Column.pop();
        Row.pop();
        Image.create($rawfile(this.imgPath));
        Image.height("8%");
        Image.width("15%");
        Image.objectFit(ImageFit.Contain);
        Image.alignSelf(ItemAlign.End);
        Image.onTouch((event: any) => {
            if (event.type == TouchType.Down) {
                if (this.showComponent == Visibility.Visible) {
                    this.showComponent = Visibility.Hidden;
                    this.imgPath = "arrow_up.png";
                }
                else {
                    this.showComponent = Visibility.Visible;
                    this.imgPath = "arrow_down.png";
                    initSpring(this);
                }
            }
        });
        Stack.pop();
    }
}
let springSystem: any = new rebound.SpringSystem();
let spring: any = springSystem.createSpring();
;
let springConfig: any;
spring.setSpringConfig(rebound.SpringConfig.DEFAULT_ORIGAMI_SPRING_CONFIG);
function initSpring(self: any) {
    springConfig = spring.getSpringConfig();
    self.tensionSpringVal = springConfig.tension;
    self.frictionSpringVal = springConfig.friction;
    spring.addListener({
        onSpringUpdate: (spring: any) => {
            let val: any = spring.getCurrentValue();
            self.imageSize = rebound.MathUtil.mapValueInRange(val, 0, 1, 1, 0.5);
        },
        onSpringEndStateChange: (spring: any) => {
        }
    });
}
function setTension(self: any, tensionval: number) {
    springConfig.tension = rebound.OrigamiValueConverter.tensionFromOrigamiValue(tensionval);
    self.tensionSpringVal = springConfig.tension;
    self.imageSize = 1;
}
function setFriction(self: any, frictionval: number) {
    springConfig.friction = rebound.OrigamiValueConverter.frictionFromOrigamiValue(frictionval);
    self.frictionSpringVal = springConfig.friction;
    self.imageSize = 1;
}
loadDocument(new Index1("1", undefined, {}));
