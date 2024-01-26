interface Setting_Params {
    dataList?: Resource[][];
    title?: Resource[];
    selectType?: number;
    rotationSelected?: number;
    resolutionSelected?: number;
    select?: number;
    selectDialog?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Setting_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Hunan OpenValley Digital Industry Development Co., Ltd.
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
import Title from '../component/TitleComponent';
import { SelectComponent } from '../component/SelectComponent';
const TAG: string = '[Setting]';
class Setting extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__dataList = new ObservedPropertyObject([[$r('app.string.notEnabled'), $r('app.string.support_90_rotate'), $r('app.string.support_180_rotate'), $r('app.string.support_270_rotate')],
            [$r('app.string.notEnabled'), $r('app.string.1920_1080'), $r('app.string.1280_720'), $r('app.string.800_600')]], this, "dataList");
        this.__title = new ObservedPropertyObject([$r('app.string.angle_of_rotation'), $r('app.string.recording_resolution')], this, "title");
        this.__selectType = new ObservedPropertySimple(0, this, "selectType");
        this.__rotationSelected = AppStorage.SetAndLink('selectType_0', 0, this, "rotationSelected");
        this.__resolutionSelected = AppStorage.SetAndLink('selectType_1', 0, this, "resolutionSelected");
        this.__select = new ObservedPropertySimple(0, this, "select");
        this.selectDialog = new CustomDialogController({
            builder: () => {
                let jsDialog = new SelectComponent("3", this, {
                    dataList: this.dataList[this.selectType],
                    title: this.title[this.selectType],
                    selectType: this.__selectType
                });
                jsDialog.setController(this.selectDialog);
                View.create(jsDialog);
            },
            alignment: DialogAlignment.Bottom,
            offset: { dx: 0, dy: -20 }
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Setting_Params) {
        if (params.dataList !== undefined) {
            this.dataList = params.dataList;
        }
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.selectType !== undefined) {
            this.selectType = params.selectType;
        }
        if (params.select !== undefined) {
            this.select = params.select;
        }
        if (params.selectDialog !== undefined) {
            this.selectDialog = params.selectDialog;
        }
    }
    aboutToBeDeleted() {
        this.__dataList.aboutToBeDeleted();
        this.__title.aboutToBeDeleted();
        this.__selectType.aboutToBeDeleted();
        this.__rotationSelected.aboutToBeDeleted();
        this.__resolutionSelected.aboutToBeDeleted();
        this.__select.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __dataList: ObservedPropertyObject<Resource[][]>;
    get dataList() {
        return this.__dataList.get();
    }
    set dataList(newValue: Resource[][]) {
        this.__dataList.set(newValue);
    }
    private __title: ObservedPropertyObject<Resource[]>;
    get title() {
        return this.__title.get();
    }
    set title(newValue: Resource[]) {
        this.__title.set(newValue);
    }
    private __selectType: ObservedPropertySimple<number>; // 打开弹窗时传入的类型 0：旋转角度  1：分辨率
    get selectType() {
        return this.__selectType.get();
    }
    set selectType(newValue: number) {
        this.__selectType.set(newValue);
    }
    private __rotationSelected: ObservedPropertyAbstract<number>; // 子组件返回的确定选择的旋转角度索引
    get rotationSelected() {
        return this.__rotationSelected.get();
    }
    set rotationSelected(newValue: number) {
        this.__rotationSelected.set(newValue);
    }
    private __resolutionSelected: ObservedPropertyAbstract<number>; // 子组件返回的确定选择的分辨率索引
    get resolutionSelected() {
        return this.__resolutionSelected.get();
    }
    set resolutionSelected(newValue: number) {
        this.__resolutionSelected.set(newValue);
    }
    private __select: ObservedPropertySimple<number>; // 与子组件当前选项同步的变量
    get select() {
        return this.__select.get();
    }
    set select(newValue: number) {
        this.__select.set(newValue);
    }
    private selectDialog: CustomDialogController;
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor($r('app.color.COLOR_F1F3F5'));
        let earlierCreatedChild_2: Title = (this && this.findChildById) ? this.findChildById("2") as Title : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new Title("2", this, { isIndex: false, titleText: $r('app.string.setting') }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                isIndex: false, titleText: $r('app.string.setting')
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        Row.create();
        Row.id('rotation');
        Row.width('90%');
        Row.height(56);
        Row.margin({ top: 12 });
        Row.borderRadius(16);
        Row.backgroundColor(Color.White);
        Row.onClick(e => {
            // 指定打开角度旋转弹窗
            this.selectType = 0;
            this.selectDialog.open();
        });
        Text.create($r('app.string.angle_of_rotation'));
        Text.fontColor($r('app.color.COLOR_E6000000'));
        Text.fontFamily($r('app.string.font_family'));
        Text.fontSize(16);
        Text.margin({ left: 12 });
        Text.pop();
        Blank.create();
        Blank.pop();
        Text.create(this.dataList[0][this.rotationSelected]);
        Text.fontColor($r('app.color.COLOR_99000000'));
        Text.fontFamily($r('app.string.font_family_Regular'));
        Text.fontSize(14);
        Text.pop();
        Image.create($r('app.media.right'));
        Image.width(12);
        Image.height(24);
        Image.objectFit(ImageFit.Contain);
        Image.margin({ left: 4, right: 12 });
        Row.pop();
        Row.create();
        Row.id('resolution');
        Row.width('90%');
        Row.height(56);
        Row.margin({ top: 12 });
        Row.borderRadius(16);
        Row.backgroundColor(Color.White);
        Row.onClick(e => {
            // 指定打开分辨率弹窗
            this.selectType = 1;
            this.selectDialog.open();
        });
        Text.create($r('app.string.size'));
        Text.fontColor($r('app.color.COLOR_E6000000'));
        Text.fontFamily($r('app.string.font_family'));
        Text.fontSize(16);
        Text.margin({ left: 12 });
        Text.pop();
        Blank.create();
        Blank.pop();
        Text.create(this.dataList[1][this.resolutionSelected]);
        Text.fontColor($r('app.color.COLOR_99000000'));
        Text.fontFamily($r('app.string.font_family_Regular'));
        Text.fontSize(14);
        Text.pop();
        Image.create($r('app.media.right'));
        Image.width(12);
        Image.height(24);
        Image.objectFit(ImageFit.Contain);
        Image.margin({ left: 4, right: 12 });
        Row.pop();
        Column.pop();
    }
}
loadDocument(new Setting("1", undefined, {}));
