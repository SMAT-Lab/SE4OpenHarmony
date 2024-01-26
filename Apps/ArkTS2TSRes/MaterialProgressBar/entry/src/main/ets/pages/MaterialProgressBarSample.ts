interface MaterialProgressBarSample_Params {
    progress?: number;
    indeterminate?: boolean;
    frameworkModel?: MaterialProgress.MaterialModel;
    frameworkModelTwo?: MaterialProgress.MaterialModel;
    frameworkModelThree?: MaterialProgress.MaterialModel;
    frameworkModelFour?: MaterialProgress.MaterialModel;
    frameworkModelFive?: MaterialProgress.MaterialModel;
    frameworkModelSix?: MaterialProgress.MaterialModel;
    frameworkModelSeven?: MaterialProgress.MaterialModel;
    frameworkModelEight?: MaterialProgress.MaterialModel;
    frameworkModelNine?: MaterialProgress.MaterialModel;
    frameworkModelTen?: MaterialProgress.MaterialModel;
    frameworkModelEleven?: MaterialProgress.MaterialModel;
    frameworkModelTwelve?: MaterialProgress.MaterialModel;
    frameworkModelThirteen?: MaterialProgress.MaterialModel;
    frameworkModelFourteen?: MaterialProgress.MaterialModel;
    frameworkModelFifteen?: MaterialProgress.MaterialModel;
    frameworkModelSixteen?: MaterialProgress.MaterialModel;
    frameworkModelSeventeen?: MaterialProgress.MaterialModel;
    frameworkModelEighteen?: MaterialProgress.MaterialModel;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MaterialProgressBarSample_" + ++__generate__Id;
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
import { MaterialProgressBar, MaterialProgressStyle, MaterialProgress } from "@ohos/materialprogressbar";
class MaterialProgressBarSample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__progress = new ObservedPropertySimple(30, this, "progress");
        this.__indeterminate = new ObservedPropertySimple(false, this, "indeterminate");
        this.frameworkModel = new MaterialProgress.MaterialModel();
        this.frameworkModelTwo = new MaterialProgress.MaterialModel();
        this.frameworkModelThree = new MaterialProgress.MaterialModel();
        this.frameworkModelFour = new MaterialProgress.MaterialModel();
        this.frameworkModelFive = new MaterialProgress.MaterialModel();
        this.frameworkModelSix = new MaterialProgress.MaterialModel();
        this.frameworkModelSeven = new MaterialProgress.MaterialModel();
        this.frameworkModelEight = new MaterialProgress.MaterialModel();
        this.frameworkModelNine = new MaterialProgress.MaterialModel();
        this.frameworkModelTen = new MaterialProgress.MaterialModel();
        this.frameworkModelEleven = new MaterialProgress.MaterialModel();
        this.frameworkModelTwelve = new MaterialProgress.MaterialModel();
        this.frameworkModelThirteen = new MaterialProgress.MaterialModel();
        this.frameworkModelFourteen = new MaterialProgress.MaterialModel();
        this.frameworkModelFifteen = new MaterialProgress.MaterialModel();
        this.frameworkModelSixteen = new MaterialProgress.MaterialModel();
        this.frameworkModelSeventeen = new MaterialProgress.MaterialModel();
        this.frameworkModelEighteen = new MaterialProgress.MaterialModel();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MaterialProgressBarSample_Params) {
        if (params.progress !== undefined) {
            this.progress = params.progress;
        }
        if (params.indeterminate !== undefined) {
            this.indeterminate = params.indeterminate;
        }
        if (params.frameworkModel !== undefined) {
            this.frameworkModel = params.frameworkModel;
        }
        if (params.frameworkModelTwo !== undefined) {
            this.frameworkModelTwo = params.frameworkModelTwo;
        }
        if (params.frameworkModelThree !== undefined) {
            this.frameworkModelThree = params.frameworkModelThree;
        }
        if (params.frameworkModelFour !== undefined) {
            this.frameworkModelFour = params.frameworkModelFour;
        }
        if (params.frameworkModelFive !== undefined) {
            this.frameworkModelFive = params.frameworkModelFive;
        }
        if (params.frameworkModelSix !== undefined) {
            this.frameworkModelSix = params.frameworkModelSix;
        }
        if (params.frameworkModelSeven !== undefined) {
            this.frameworkModelSeven = params.frameworkModelSeven;
        }
        if (params.frameworkModelEight !== undefined) {
            this.frameworkModelEight = params.frameworkModelEight;
        }
        if (params.frameworkModelNine !== undefined) {
            this.frameworkModelNine = params.frameworkModelNine;
        }
        if (params.frameworkModelTen !== undefined) {
            this.frameworkModelTen = params.frameworkModelTen;
        }
        if (params.frameworkModelEleven !== undefined) {
            this.frameworkModelEleven = params.frameworkModelEleven;
        }
        if (params.frameworkModelTwelve !== undefined) {
            this.frameworkModelTwelve = params.frameworkModelTwelve;
        }
        if (params.frameworkModelThirteen !== undefined) {
            this.frameworkModelThirteen = params.frameworkModelThirteen;
        }
        if (params.frameworkModelFourteen !== undefined) {
            this.frameworkModelFourteen = params.frameworkModelFourteen;
        }
        if (params.frameworkModelFifteen !== undefined) {
            this.frameworkModelFifteen = params.frameworkModelFifteen;
        }
        if (params.frameworkModelSixteen !== undefined) {
            this.frameworkModelSixteen = params.frameworkModelSixteen;
        }
        if (params.frameworkModelSeventeen !== undefined) {
            this.frameworkModelSeventeen = params.frameworkModelSeventeen;
        }
        if (params.frameworkModelEighteen !== undefined) {
            this.frameworkModelEighteen = params.frameworkModelEighteen;
        }
    }
    aboutToBeDeleted() {
        this.__progress.aboutToBeDeleted();
        this.__indeterminate.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __progress: ObservedPropertySimple<number>;
    get progress() {
        return this.__progress.get();
    }
    set progress(newValue: number) {
        this.__progress.set(newValue);
    }
    private __indeterminate: ObservedPropertySimple<boolean>;
    get indeterminate() {
        return this.__indeterminate.get();
    }
    set indeterminate(newValue: boolean) {
        this.__indeterminate.set(newValue);
    }
    private frameworkModel: MaterialProgress.MaterialModel;
    private frameworkModelTwo: MaterialProgress.MaterialModel;
    private frameworkModelThree: MaterialProgress.MaterialModel;
    private frameworkModelFour: MaterialProgress.MaterialModel;
    private frameworkModelFive: MaterialProgress.MaterialModel;
    private frameworkModelSix: MaterialProgress.MaterialModel;
    private frameworkModelSeven: MaterialProgress.MaterialModel;
    private frameworkModelEight: MaterialProgress.MaterialModel;
    private frameworkModelNine: MaterialProgress.MaterialModel;
    private frameworkModelTen: MaterialProgress.MaterialModel;
    private frameworkModelEleven: MaterialProgress.MaterialModel;
    private frameworkModelTwelve: MaterialProgress.MaterialModel;
    private frameworkModelThirteen: MaterialProgress.MaterialModel;
    private frameworkModelFourteen: MaterialProgress.MaterialModel;
    private frameworkModelFifteen: MaterialProgress.MaterialModel;
    private frameworkModelSixteen: MaterialProgress.MaterialModel;
    private frameworkModelSeventeen: MaterialProgress.MaterialModel;
    private frameworkModelEighteen: MaterialProgress.MaterialModel;
    aboutToAppear() {
        this.frameworkModel.setStyle!(MaterialProgressStyle.MaterialHorizontal)
            .setProgress!(30)
            .setSecondProgress!(60)
            .setColor!(0x009688)
            .setSecondColor!(0x9fc6c2)
            .setBgColor!(0xd7d7d7);
        this.frameworkModelTwo.color = '#f44336';
        this.frameworkModelTwo.secondColor = '#f7aca7';
        this.frameworkModelTwo.secondProgress = 60;
        this.frameworkModelTwo.bgColor = '#f8cac7';
        this.frameworkModelThree.color = '#f44336';
        this.frameworkModelThree.secondColor = '#f7aca7';
        this.frameworkModelThree.secondProgress = 60;
        this.frameworkModelThree.bgColor = '#f8cac7';
        this.frameworkModelFour.indeterminateAngle = true;
        this.frameworkModelFour.bgColor = '#b3ddd9';
        this.frameworkModelFive.indeterminateAngle = true;
        this.frameworkModelFive.progress = 3;
        this.frameworkModelFive.bgColor = '#b3ddd9';
        this.frameworkModelSix.indeterminateAngle = true;
        this.frameworkModelSix.color = '#009688';
        this.frameworkModelSix.bgColor = '#b3ddd9';
        this.frameworkModelSeven.indeterminateAngle = true;
        this.frameworkModelSeven.color = '#f44336';
        this.frameworkModelSeven.bgColor = '#f8cac7';
        this.frameworkModelEight.indeterminateAngle = false;
        this.frameworkModelEight.indeterminate = true;
        this.frameworkModelEight.radius = 40;
        this.frameworkModelEight.strokeWidth = 8;
        this.frameworkModelNine.indeterminateAngle = false;
        this.frameworkModelNine.indeterminate = true;
        this.frameworkModelNine.radius = 20;
        this.frameworkModelNine.strokeWidth = 8;
        this.frameworkModelTen.indeterminateAngle = false;
        this.frameworkModelTen.indeterminate = true;
        this.frameworkModelTen.radius = 6;
        this.frameworkModelTen.strokeWidth = 2;
        this.frameworkModelEleven.indeterminateAngle = true;
        this.frameworkModelEleven.indeterminate = true;
        this.frameworkModelEleven.radius = 40;
        this.frameworkModelEleven.strokeWidth = 8;
        this.frameworkModelTwelve.indeterminateAngle = true;
        this.frameworkModelTwelve.indeterminate = true;
        this.frameworkModelTwelve.radius = 20;
        this.frameworkModelTwelve.strokeWidth = 8;
        this.frameworkModelThirteen.indeterminateAngle = true;
        this.frameworkModelThirteen.indeterminate = true;
        this.frameworkModelThirteen.radius = 6;
        this.frameworkModelThirteen.strokeWidth = 2;
        this.frameworkModelFourteen.indeterminateAngle = true;
        this.frameworkModelFourteen.indeterminate = true;
        this.frameworkModelFourteen.radius = 40;
        this.frameworkModelFourteen.strokeWidth = 8;
        this.frameworkModelFifteen.indeterminateAngle = true;
        this.frameworkModelFifteen.indeterminate = true;
        this.frameworkModelFifteen.radius = 20;
        this.frameworkModelFifteen.strokeWidth = 8;
        this.frameworkModelSixteen.indeterminateAngle = true;
        this.frameworkModelSixteen.indeterminate = true;
        this.frameworkModelSixteen.radius = 6;
        this.frameworkModelSixteen.strokeWidth = 2;
        this.frameworkModelSeventeen.color = '#009688';
        this.frameworkModelSeventeen.secondColor = '#a39fc6c2';
        this.frameworkModelSeventeen.secondProgress = 60;
        this.frameworkModelEighteen.indeterminateAngle = true;
        this.frameworkModelEighteen.color = '#009688';
        setTimeout(() => {
            this.indeterminate = true;
        }, 1000);
    }
    render() {
        Scroll.create();
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.width('100%');
        Scroll.height('100%');
        Scroll.padding({ top: 20, left: 10, right: 10, bottom: 50 });
        Flex.create({ direction: FlexDirection.Column, });
        Flex.width('100%');
        Flex.padding({ top: 0, left: 10, right: 10, bottom: 50 });
        Flex.margin({ top: 0, left: 0, right: 0, bottom: 50 });
        //返回index和顶部标题
        Row.create();
        //返回index和顶部标题
        Row.width('100%');
        //返回index和顶部标题
        Row.height(50);
        Text.create('< Back');
        Text.fontSize(22);
        Text.onClick(() => {
            router.back();
        });
        Text.pop();
        //返回index和顶部标题
        Row.pop();
        Text.create($r("app.string.determinate_horizontal_progress"));
        Text.fontSize(18);
        Text.margin(2);
        Text.pop();
        Text.create($r("app.string.framework_implementation"));
        Text.fontSize(14);
        Text.fontColor(0x666666);
        Text.margin(2);
        Text.pop();
        Flex.create({ direction: FlexDirection.Column });
        Flex.width('100%');
        Flex.height(20);
        Flex.margin(2);
        Flex.pop();
        Text.create($r("app.string.library_implementation"));
        Text.fontSize(14);
        Text.fontColor(0x666666);
        Text.margin(2);
        Text.pop();
        Flex.create({ direction: FlexDirection.Column });
        Flex.width('100%');
        Flex.height(20);
        Flex.margin(2);
        Flex.pop();
        Text.create($r("app.string.library_implementation_tinted"));
        Text.fontSize(14);
        Text.fontColor(0x666666);
        Text.margin(2);
        Text.pop();
        Flex.create({ direction: FlexDirection.Column });
        Flex.width('100%');
        Flex.height(20);
        Flex.margin(2);
        Flex.pop();
        Text.create($r("app.string.indeterminate_horizontal_progress"));
        Text.fontSize(18);
        Text.margin(2);
        Text.pop();
        Text.create($r("app.string.framework_implementation"));
        Text.fontSize(14);
        Text.fontColor(0x666666);
        Text.margin(2);
        Text.pop();
        Flex.create({ direction: FlexDirection.Column });
        Flex.width('100%');
        Flex.height(20);
        Flex.margin(2);
        If.create();
        if (this.indeterminate) {
            If.branchId(0);
        }
        else {
            If.branchId(1);
        }
        If.pop();
        Flex.pop();
        Text.create($r("app.string.library_implementation"));
        Text.fontSize(14);
        Text.fontColor(0x666666);
        Text.margin(2);
        Text.pop();
        Flex.create({ direction: FlexDirection.Column });
        Flex.width('100%');
        Flex.height(20);
        Flex.margin(2);
        Flex.pop();
        Text.create($r("app.string.library_implementation_tinted"));
        Text.fontSize(14);
        Text.fontColor(0x666666);
        Text.margin(2);
        Text.pop();
        Flex.create({ direction: FlexDirection.Column });
        Flex.width('100%');
        Flex.height(20);
        Flex.margin(2);
        Flex.pop();
        Text.create("Determinate Circular ProgressBar");
        Text.fontSize(18);
        Text.margin(2);
        Text.pop();
        Text.create($r("app.string.framework_implementation"));
        Text.fontSize(14);
        Text.fontColor(0x666666);
        Text.margin(2);
        Text.pop();
        Text.create("(Not Available)");
        Text.fontSize(14);
        Text.fontColor(0x666666);
        Text.margin(2);
        Text.pop();
        Text.create($r("app.string.library_implementation"));
        Text.fontSize(14);
        Text.fontColor(0x666666);
        Text.margin(2);
        Text.pop();
        Flex.create({ direction: FlexDirection.Row, justifyContent: FlexAlign.SpaceBetween });
        Flex.height(100);
        Flex.create();
        Flex.pop();
        Flex.create();
        Flex.position({ x: '40%', y: '50%' });
        Flex.pop();
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.End, justifyContent: FlexAlign.End });
        Flex.padding({ right: 5, bottom: 0 });
        Flex.pop();
        Flex.pop();
        Text.create("Indeterminate Circular ProgressBar");
        Text.fontSize(18);
        Text.margin(2);
        Text.pop();
        Text.create($r("app.string.framework_implementation"));
        Text.fontSize(14);
        Text.fontColor(0x666666);
        Text.margin(2);
        Text.pop();
        Flex.create({ direction: FlexDirection.Row, justifyContent: FlexAlign.SpaceBetween });
        Flex.height(100);
        Flex.create();
        Flex.pop();
        Flex.create();
        Flex.position({ x: '40%', y: '50%' });
        Flex.pop();
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.End, justifyContent: FlexAlign.End });
        Flex.padding({ right: 15, bottom: 0 });
        Flex.pop();
        Flex.pop();
        Text.create($r("app.string.library_implementation"));
        Text.fontSize(14);
        Text.fontColor(0x666666);
        Text.margin(2);
        Text.pop();
        Flex.create({ direction: FlexDirection.Row, justifyContent: FlexAlign.SpaceBetween });
        Flex.height(100);
        Flex.create();
        Flex.pop();
        Flex.create();
        Flex.position({ x: '40%', y: '20%' });
        Flex.pop();
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.End, justifyContent: FlexAlign.End });
        Flex.padding({ right: 15, bottom: 0 });
        Flex.pop();
        Flex.pop();
        Text.create("ProgressBar on Toolbar");
        Text.fontSize(18);
        Text.margin(2);
        Text.pop();
        Flex.create({ direction: FlexDirection.Column });
        Flex.width('100%');
        Flex.height(40);
        Flex.margin(2);
        Flex.backgroundColor('#000');
        Text.create("Horizontal");
        Text.width('100%');
        Text.height(25);
        Text.fontSize(20);
        Text.fontWeight(800);
        Text.align(Alignment.TopStart);
        Text.fontColor('#fff');
        Text.margin({ bottom: 5 });
        Text.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Column });
        Flex.width('100%');
        Flex.height(40);
        Flex.margin(2);
        Flex.backgroundColor('#000');
        Text.create("Indeterminate Horizontal");
        Text.width('100%');
        Text.height(25);
        Text.fontSize(20);
        Text.fontWeight(800);
        Text.align(Alignment.TopStart);
        Text.fontColor('#fff');
        Text.margin({ bottom: 5 });
        Text.pop();
        Flex.pop();
        Text.create('');
        Text.pop();
        Flex.pop();
        Scroll.pop();
    }
}
loadDocument(new MaterialProgressBarSample("1", undefined, {}));
