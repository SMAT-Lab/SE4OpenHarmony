interface Index_Params {
    temperatureC?: string;
    temperatureF?: string;
    humidity?: string;
    selectIndex?: number;
    selectValue?: string;
    iw?;
    ih?;
    context?: CanvasRenderingContext2D;
    img?: ImageBitmap;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Unionman Technology Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
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
import i2c_ctl from "@ohos.i2cnapi";
import pwm_ctl from '@ohos.pwmnapi';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__temperatureC = new ObservedPropertySimple('摄氏度:', this, "temperatureC");
        this.__temperatureF = new ObservedPropertySimple('华氏度:', this, "temperatureF");
        this.__humidity = new ObservedPropertySimple('湿度:', this, "humidity");
        this.selectIndex = 0;
        this.__selectValue = new ObservedPropertySimple("温度计", this, "selectValue");
        this.iw = 205;
        this.ih = 41;
        this.context = new CanvasRenderingContext2D();
        this.img = new ImageBitmap("/common/point.jpg");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.temperatureC !== undefined) {
            this.temperatureC = params.temperatureC;
        }
        if (params.temperatureF !== undefined) {
            this.temperatureF = params.temperatureF;
        }
        if (params.humidity !== undefined) {
            this.humidity = params.humidity;
        }
        if (params.selectIndex !== undefined) {
            this.selectIndex = params.selectIndex;
        }
        if (params.selectValue !== undefined) {
            this.selectValue = params.selectValue;
        }
        if (params.iw !== undefined) {
            this.iw = params.iw;
        }
        if (params.ih !== undefined) {
            this.ih = params.ih;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
        if (params.img !== undefined) {
            this.img = params.img;
        }
    }
    aboutToBeDeleted() {
        this.__temperatureC.aboutToBeDeleted();
        this.__temperatureF.aboutToBeDeleted();
        this.__humidity.aboutToBeDeleted();
        this.__selectValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __temperatureC: ObservedPropertySimple<string>;
    get temperatureC() {
        return this.__temperatureC.get();
    }
    set temperatureC(newValue: string) {
        this.__temperatureC.set(newValue);
    }
    private __temperatureF: ObservedPropertySimple<string>;
    get temperatureF() {
        return this.__temperatureF.get();
    }
    set temperatureF(newValue: string) {
        this.__temperatureF.set(newValue);
    }
    private __humidity: ObservedPropertySimple<string>;
    get humidity() {
        return this.__humidity.get();
    }
    set humidity(newValue: string) {
        this.__humidity.set(newValue);
    }
    private selectIndex: number;
    private __selectValue: ObservedPropertySimple<string>;
    get selectValue() {
        return this.__selectValue.get();
    }
    set selectValue(newValue: string) {
        this.__selectValue.set(newValue);
    }
    private iw;
    private ih;
    private context: CanvasRenderingContext2D;
    private img: ImageBitmap;
    flushDraw(rad: number): void {
        let width = this.context.width;
        let height = this.context.height;
        this.context.clearRect(0, 0, width, height);
        this.context.translate(width / 2, height - this.ih * 3);
        this.context.rotate(rad);
        this.context.drawImage(this.img, -129, -this.ih / 2);
        this.context.rotate(-rad);
        this.context.translate(-width / 2, -(height - this.ih * 3));
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('50%');
        Column.height('100%');
        Column.onAppear(() => {
            setInterval(async () => {
                let data = await i2c_ctl.getDataAsync();
                this.temperatureC = '摄氏度: ' + data.temperatureC.toFixed(2) + '°C';
                this.temperatureF = '华氏度:' + data.temperatureF.toFixed(2) + '℉';
                this.humidity = '湿度:' + data.humidity.toFixed(2) + '%';
                let drawData: number;
                switch (this.selectIndex) {
                    case 0:
                        drawData = data.temperatureC;
                        break;
                    case 1:
                        drawData = data.humidity;
                        break;
                    default:
                        drawData = 0;
                        break;
                }
                this.flushDraw(drawData / 100 * Math.PI);
                pwm_ctl.setAngleAsync(180 - (drawData / 100 * 180));
            }, 1000);
        });
        Text.create(this.temperatureC);
        Text.width("300vp");
        Text.height("60vp");
        Text.pop();
        Text.create(this.temperatureF);
        Text.width("300vp");
        Text.height("60vp");
        Text.pop();
        Text.create(this.humidity);
        Text.width("300vp");
        Text.height("60vp");
        Text.pop();
        Column.pop();
        Column.create();
        Column.width("50%");
        Column.height('100%');
        Select.create([{ value: "温度计" }, { value: "湿度计" }]);
        Select.selected(0);
        Select.value(this.selectValue);
        Select.onSelect((index: number, value: string) => {
            this.selectIndex = index;
            this.selectValue = value;
        });
        Select.pop();
        Canvas.create(this.context);
        Canvas.width("100%");
        Canvas.height("100%");
        Canvas.onAppear(() => {
            let width = this.context.width;
            let height = this.context.height;
            this.context.translate(width / 2, height - this.ih * 3);
            this.context.drawImage(this.img, -129, -this.ih / 2);
            this.context.translate(-width / 2, -(height - this.ih * 3));
        });
        Canvas.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
