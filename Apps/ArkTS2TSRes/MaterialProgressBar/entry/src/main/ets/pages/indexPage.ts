interface indexPage_Params {
    data?: Model;
    arr?: string[];
    selectFlag?: number;
    interpolatedProgress?: string;
    linearProgress?: string;
    // 控制执行一次
    interpolatedFlag?: boolean;
    linearFlag?: boolean;
    state?: number;
    interpolatedData?: Model;
    linearData?: Model;
    BarColor?: string;
    WheelColor?: string;
    percentage?: string;
    dialogController?: CustomDialogController;
}
interface ColorDialog_Params {
    controller?: CustomDialogController;
    arr?: string[];
    selectFlag?: number;
    spinWheel?: Model;
    interpolatedWheel?: Model;
    linearWheel?: Model;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "indexPage_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import router from '@ohos.router';
import { ComWheel, Model } from '@ohos/materialprogressbar';
class ColorDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = new CustomDialogController({
            builder: () => {
                let jsDialog = new ColorDialog("3", this, {
                    spinWheel: new Model()
                });
                jsDialog.setController(this.controller);
                View.create(jsDialog);
            }
        }, this);
        this.arr = [];
        this.selectFlag = 0;
        this.__spinWheel = new SynchedPropertyObjectTwoWay(params.spinWheel, this, "spinWheel");
        this.interpolatedWheel = new Model();
        this.linearWheel = new Model();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ColorDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.arr !== undefined) {
            this.arr = params.arr;
        }
        if (params.selectFlag !== undefined) {
            this.selectFlag = params.selectFlag;
        }
        if (params.interpolatedWheel !== undefined) {
            this.interpolatedWheel = params.interpolatedWheel;
        }
        if (params.linearWheel !== undefined) {
            this.linearWheel = params.linearWheel;
        }
    }
    aboutToBeDeleted() {
        this.__spinWheel.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private arr: string[];
    private selectFlag: number;
    private __spinWheel: SynchedPropertySimpleOneWay<Model>;
    get spinWheel() {
        return this.__spinWheel.get();
    }
    set spinWheel(newValue: Model) {
        this.__spinWheel.set(newValue);
    }
    private interpolatedWheel: Model;
    private linearWheel: Model;
    render() {
        Row.create();
        Row.padding(5);
        List.create({ space: 10, initialIndex: 0 });
        List.backgroundColor(Color.White);
        List.width(250);
        List.height(150);
        List.padding(10);
        List.borderRadius(20);
        ForEach.create("2", this, ObservedObject.GetRawObject(this.arr), (item: string) => {
            ListItem.create();
            Text.create(item);
            Text.width('100%');
            Text.height(20);
            Text.fontSize(16);
            Text.textAlign(TextAlign.Start);
            Text.backgroundColor(0xFFFFFF);
            Text.onClick(() => {
                if (item == 'Default') {
                    if (this.selectFlag == 0) {
                        this.spinWheel
                            .setBarColor(0X5588FF);
                        this.interpolatedWheel.setBarColor(0X5588FF);
                        this.linearWheel.setBarColor(0X5588FF);
                        AppStorage.Set<string>('BarColor', 'Default');
                    }
                    else if (this.selectFlag == 1) {
                        this.spinWheel
                            .setRimColor(Color.White);
                        this.interpolatedWheel.setRimColor(Color.White);
                        this.linearWheel.setRimColor(Color.White);
                        AppStorage.Set<string>('WheelColor', 'Default');
                    }
                }
                else if (item == 'Light Gray') {
                    AppStorage.Set<string>('WheelColor', 'Light Gray');
                    this.spinWheel.setRimColor(0xCCCCCC);
                    this.interpolatedWheel.setRimColor(0xCCCCCC);
                    this.linearWheel.setRimColor(0xCCCCCC);
                }
                else if (item == 'Gray') {
                    AppStorage.Set<string>('WheelColor', 'Gray');
                    this.spinWheel.setRimColor(Color.Gray);
                    this.interpolatedWheel.setRimColor(Color.Gray);
                    this.linearWheel.setRimColor(Color.Gray);
                }
                else if (item == 'Red') {
                    AppStorage.Set<string>('BarColor', 'Red');
                    this.spinWheel.setBarColor(Color.Red);
                    this.interpolatedWheel.setBarColor(Color.Red);
                    this.linearWheel.setBarColor(Color.Red);
                }
                else if (item == 'Magenta') {
                    AppStorage.Set<string>('BarColor', 'Magenta');
                    this.spinWheel.setBarColor(0xFF00FF);
                    this.interpolatedWheel.setBarColor(0xFF00FF);
                    this.linearWheel.setBarColor(0xFF00FF);
                }
                else if (item == 'Cycle between 0% and 100%') {
                    AppStorage.Set<string>('percentage', 'Cycle between 0% and 100%');
                    AppStorage.Set<number>('state', 1);
                    this.interpolatedWheel.setProgress(1).init();
                    this.linearWheel.setProgress(1).init();
                }
                else if (item == '0%') {
                    AppStorage.Set<string>('percentage', '0%');
                    AppStorage.Set<number>('state', 0);
                    this.interpolatedWheel.setProgress(0).init();
                    this.linearWheel.setProgress(0).init();
                }
                else if (item == '10%') {
                    AppStorage.Set<string>('percentage', '10%');
                    AppStorage.Set<number>('state', 0);
                    this.interpolatedWheel.setProgress(0.1).init();
                    this.linearWheel.setProgress(0.1).init();
                }
                else if (item == '25%') {
                    AppStorage.Set<string>('percentage', '25%');
                    AppStorage.Set<number>('state', 0);
                    this.interpolatedWheel.setProgress(0.25).init();
                    this.linearWheel.setProgress(0.25).init();
                }
                else if (item == '50%') {
                    AppStorage.Set<string>('percentage', '50%');
                    AppStorage.Set<number>('state', 0);
                    this.interpolatedWheel.setProgress(0.5).init();
                    this.linearWheel.setProgress(0.5).init();
                }
                else if (item == '75%') {
                    AppStorage.Set<string>('percentage', '75%');
                    AppStorage.Set<number>('state', 0);
                    this.interpolatedWheel.setProgress(0.75).init();
                    this.linearWheel.setProgress(0.75).init();
                }
                else if (item == '100%') {
                    AppStorage.Set<string>('percentage', '100%');
                    AppStorage.Set<number>('state', 0);
                    this.interpolatedWheel.setProgress(1).init();
                    this.linearWheel.setProgress(1).init();
                }
                this.controller.close();
            });
            Text.pop();
            ListItem.pop();
        }, (item: string) => item);
        ForEach.pop();
        List.pop();
        Row.pop();
    }
}
class indexPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__data = new ObservedPropertyObject(new Model(), this, "data");
        this.arr = [];
        this.selectFlag = 0;
        this.__interpolatedProgress = new ObservedPropertySimple('', this, "interpolatedProgress");
        this.__linearProgress = new ObservedPropertySimple(''
        // 控制执行一次
        , this, "linearProgress");
        this.interpolatedFlag = false;
        this.linearFlag = false;
        this.__state = AppStorage.SetAndProp('state', 1
        //监测进度值的改变
        , this, "state");
        this.__interpolatedData = new ObservedPropertyObject(new Model(), this, "interpolatedData");
        this.__linearData = new ObservedPropertyObject(new Model(), this, "linearData");
        this.__BarColor = AppStorage.SetAndProp('BarColor', 'Default', this, "BarColor");
        this.__WheelColor = AppStorage.SetAndProp('WheelColor', 'Default', this, "WheelColor");
        this.__percentage = AppStorage.SetAndProp('percentage', 'Default', this, "percentage");
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new ColorDialog("4", this, {
                    //      action: this.actionToAppear,
                    spinWheel: this.__data,
                    interpolatedWheel: this.interpolatedData,
                    linearWheel: this.linearData,
                    arr: this.arr,
                    selectFlag: this.selectFlag,
                });
                jsDialog.setController(this.dialogController);
                View.create(jsDialog);
            },
            cancel: this.existApp,
            autoCancel: true,
            customStyle: true,
            offset: {
                dx: 30,
                dy: 0
            }
        }, this);
        this.updateWithValueParams(params);
        this.declareWatch("interpolatedData", this.interpolatedUpdated);
        this.declareWatch("linearData", this.linearUpdated);
    }
    updateWithValueParams(params: indexPage_Params) {
        if (params.data !== undefined) {
            this.data = params.data;
        }
        if (params.arr !== undefined) {
            this.arr = params.arr;
        }
        if (params.selectFlag !== undefined) {
            this.selectFlag = params.selectFlag;
        }
        if (params.interpolatedProgress !== undefined) {
            this.interpolatedProgress = params.interpolatedProgress;
        }
        if (params.linearProgress !== undefined) {
            this.linearProgress = params.linearProgress;
        }
        if (params.interpolatedFlag !== undefined) {
            this.interpolatedFlag = params.interpolatedFlag;
        }
        if (params.linearFlag !== undefined) {
            this.linearFlag = params.linearFlag;
        }
        if (params.interpolatedData !== undefined) {
            this.interpolatedData = params.interpolatedData;
        }
        if (params.linearData !== undefined) {
            this.linearData = params.linearData;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    aboutToBeDeleted() {
        this.__data.aboutToBeDeleted();
        this.__interpolatedProgress.aboutToBeDeleted();
        this.__linearProgress.aboutToBeDeleted();
        this.__state.aboutToBeDeleted();
        this.__interpolatedData.aboutToBeDeleted();
        this.__linearData.aboutToBeDeleted();
        this.__BarColor.aboutToBeDeleted();
        this.__WheelColor.aboutToBeDeleted();
        this.__percentage.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __data: ObservedPropertyObject<Model>;
    get data() {
        return this.__data.get();
    }
    set data(newValue: Model) {
        this.__data.set(newValue);
    }
    private arr: string[];
    private selectFlag: number;
    private __interpolatedProgress: ObservedPropertySimple<string>;
    get interpolatedProgress() {
        return this.__interpolatedProgress.get();
    }
    set interpolatedProgress(newValue: string) {
        this.__interpolatedProgress.set(newValue);
    }
    private __linearProgress: ObservedPropertySimple<string>;
    get linearProgress() {
        return this.__linearProgress.get();
    }
    set linearProgress(newValue: string) {
        this.__linearProgress.set(newValue);
    }
    // 控制执行一次
    private interpolatedFlag: boolean;
    private linearFlag: boolean;
    private __state: ObservedPropertyAbstract<number>;
    get state() {
        return this.__state.get();
    }
    set state(newValue: number) {
        this.__state.set(newValue);
    }
    //监测进度值的改变
    private __interpolatedData: ObservedPropertyObject<Model>;
    get interpolatedData() {
        return this.__interpolatedData.get();
    }
    set interpolatedData(newValue: Model) {
        this.__interpolatedData.set(newValue);
    }
    //监测进度值的改变
    private __linearData: ObservedPropertyObject<Model>;
    get linearData() {
        return this.__linearData.get();
    }
    set linearData(newValue: Model) {
        this.__linearData.set(newValue);
    }
    private __BarColor: ObservedPropertyAbstract<string>;
    get BarColor() {
        return this.__BarColor.get();
    }
    set BarColor(newValue: string) {
        this.__BarColor.set(newValue);
    }
    private __WheelColor: ObservedPropertyAbstract<string>;
    get WheelColor() {
        return this.__WheelColor.get();
    }
    set WheelColor(newValue: string) {
        this.__WheelColor.set(newValue);
    }
    private __percentage: ObservedPropertyAbstract<string>;
    get percentage() {
        return this.__percentage.get();
    }
    set percentage(newValue: string) {
        this.__percentage.set(newValue);
    }
    private dialogController: CustomDialogController;
    onAccept() {
    }
    existApp() {
    }
    interpolatedUpdated(propName: string): void {
        this.interpolatedProgress = this.interpolatedData.getProgress();
        if (AppStorage.Get<number>('state') == 1) {
            this.interpolatedRunCallback();
        }
    }
    linearUpdated(propName: string): void {
        this.interpolatedProgress = this.interpolatedData.getProgress();
        this.linearProgress = this.linearData.getProgress();
        if (AppStorage.Get<number>('state') == 1) {
            this.linearRunCallback();
        }
    }
    interpolatedRunCallback() {
        // 内插值进度轮
        if (this.interpolatedProgress == '0.00') {
            if (this.interpolatedFlag) {
                this.interpolatedFlag = false;
                this.interpolatedData.setProgress(1).init();
            }
        }
        else if (this.interpolatedProgress == '1.00') {
            if (!this.interpolatedFlag) {
                this.interpolatedFlag = true;
                this.interpolatedData.setProgress(0).init();
            }
        }
    }
    linearRunCallback() {
        // 线性进度轮
        if (this.linearProgress == '0.00') {
            if (this.linearFlag) {
                this.linearFlag = false;
                this.linearData.setProgress(1).init();
            }
        }
        else if (this.linearProgress == '1.00') {
            if (!this.linearFlag) {
                this.linearFlag = true;
                this.linearData.setProgress(0).init();
            }
        }
    }
    render() {
        Column.create();
        Column.margin({ top: 30, right: 20, bottom: 20, left: 20 });
        //返回index和顶部标题
        Row.create();
        //返回index和顶部标题
        Row.width('100%');
        //返回index和顶部标题
        Row.height(50);
        //返回index和顶部标题
        Row.margin({ bottom: 10, left: 5 });
        Text.create('< Back');
        Text.fontSize(22);
        Text.onClick(() => {
            router.back();
        });
        Text.pop();
        //返回index和顶部标题
        Row.pop();
        Text.create("Options:");
        Text.fontSize(18);
        Text.fontColor(0x7A7A7A);
        Text.textAlign(TextAlign.Start);
        Text.textAlign(TextAlign.Start);
        Text.width('100%');
        Text.pop();
        Flex.create({ justifyContent: FlexAlign.SpaceBetween });
        Grid.create();
        Grid.rowsTemplate('1fr 1fr');
        Grid.height(80);
        GridItem.create();
        Text.create("BarColor:");
        Text.fontSize(15);
        Text.fontColor(0x7A7A7A);
        Text.textAlign(TextAlign.Start);
        Text.pop();
        GridItem.pop();
        GridItem.create();
        Flex.create({ justifyContent: FlexAlign.SpaceBetween });
        Flex.width('100%');
        Flex.onClick(() => {
            this.selectFlag = 0;
            this.arr = ['Default', 'Red', 'Magenta'];
            this.dialogController.open();
        });
        Flex.padding(5);
        Flex.borderRadius(5);
        Flex.backgroundColor('#00000000');
        ViewStackProcessor.visualState("pressed");
        Flex.backgroundColor('#11000000');
        ViewStackProcessor.visualState();
        Text.create(this.BarColor);
        Text.fontSize(15);
        Text.fontColor(0x222222);
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Column.create();
        Image.create($r('app.media.moveDown'));
        Image.width(20);
        Image.height(20);
        Column.pop();
        Flex.pop();
        GridItem.pop();
        Grid.pop();
        Grid.create();
        Grid.rowsTemplate('1fr 1fr');
        Grid.height(80);
        GridItem.create();
        Text.create("WheelColor:");
        Text.fontSize(15);
        Text.fontColor(0x7A7A7A);
        Text.textAlign(TextAlign.Start);
        Text.pop();
        GridItem.pop();
        GridItem.create();
        Flex.create({ justifyContent: FlexAlign.SpaceBetween });
        Flex.width('100%');
        Flex.onClick(() => {
            this.selectFlag = 1;
            this.arr = ['Default', 'Light Gray', 'Gray'];
            this.dialogController.open();
        });
        Flex.padding(5);
        Flex.borderRadius(5);
        Flex.backgroundColor('#00000000');
        ViewStackProcessor.visualState("pressed");
        Flex.backgroundColor('#11000000');
        ViewStackProcessor.visualState();
        Text.create(this.WheelColor);
        Text.fontSize(15);
        Text.fontColor(0x222222);
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Column.create();
        Image.create($r('app.media.moveDown'));
        Image.width(20);
        Image.height(20);
        Column.pop();
        Flex.pop();
        GridItem.pop();
        Grid.pop();
        Flex.pop();
        Flex.create({ justifyContent: FlexAlign.SpaceBetween });
        Flex.width('100%');
        Flex.padding(5);
        Flex.borderRadius(5);
        Flex.backgroundColor('#00000000');
        ViewStackProcessor.visualState("pressed");
        Flex.backgroundColor('#11000000');
        ViewStackProcessor.visualState();
        Flex.onClick(() => {
            this.arr = ['Cycle between 0% and 100%', '0%', '10%', '25%', '50%', '75%', '100%'];
            this.dialogController.open();
        });
        Text.create(this.percentage);
        Text.fontSize(15);
        Text.fontColor(0x222222);
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Column.create();
        Image.create($r('app.media.moveDown'));
        Image.width(20);
        Image.height(20);
        Column.pop();
        Flex.pop();
        Flex.create({ justifyContent: FlexAlign.SpaceBetween });
        Grid.create();
        Grid.rowsGap(20);
        Grid.rowsTemplate('1fr 4fr');
        Grid.height(150);
        GridItem.create();
        Text.create("Interpolated progress:");
        Text.fontSize(15);
        Text.fontColor(0x7A7A7A);
        Text.width('100%');
        Text.textAlign(TextAlign.Center);
        Text.pop();
        GridItem.pop();
        GridItem.create();
        GridItem.pop();
        Grid.pop();
        Grid.create();
        Grid.rowsGap(20);
        Grid.rowsTemplate('1fr 4fr');
        Grid.height(150);
        GridItem.create();
        Text.create("Linear progress:");
        Text.fontSize(15);
        Text.fontColor(0x7A7A7A);
        Text.width('100%');
        Text.textAlign(TextAlign.Center);
        Text.pop();
        GridItem.pop();
        GridItem.create();
        GridItem.pop();
        Grid.pop();
        Flex.pop();
        Column.pop();
    }
    aboutToAppear() {
        this.data.init();
        this.interpolatedData
            .setSpinning(false)
            .setLinearProgress(true)
            .setProgress(1)
            .init();
        this.linearData
            .setSpinning(false)
            .setLinearProgress(true)
            .setProgress(1)
            .init();
    }
    aboutToDisappear() {
        // 关闭定时器
        this.data.closeTimer();
        this.interpolatedData.closeTimer();
        this.linearData.closeTimer();
    }
}
loadDocument(new indexPage("1", undefined, {}));
