interface HomeTabContentDialog_Params {
    dialogModel?: HomeDialogModel;
    linkCheck?: Resource;
    confirmAdd?: Resource;
    loadColor?: Resource;
    name?: string;
    src?: string;
    videoList?: Array<VideoBean>;
    controller?: CustomDialogController;
    confirm?: () => void;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "HomeTabContentDialog_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
import { VideoBean } from '../common/bean/VideoBean';
import { HomeDialogModel } from '../viewmodel/HomeDialogModel';
import { CommonConstants } from '../common/constants/CommonConstants';
import { HomeConstants } from '../common/constants/HomeConstants';
export class HomeTabContentDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.dialogModel = new HomeDialogModel(this);
        this.__linkCheck = new ObservedPropertyObject($r('app.string.link_check'), this, "linkCheck");
        this.__confirmAdd = new ObservedPropertyObject($r('app.string.confirm_add'), this, "confirmAdd");
        this.__loadColor = new ObservedPropertyObject($r('app.color.index_tab_selected_font_color'), this, "loadColor");
        this.__name = new SynchedPropertySimpleTwoWay(params.name, this, "name");
        this.__src = new SynchedPropertySimpleTwoWay(params.src, this, "src");
        this.__videoList = new SynchedPropertyObjectTwoWay(params.videoList, this, "videoList");
        this.controller = undefined;
        this.confirm = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: HomeTabContentDialog_Params) {
        if (params.dialogModel !== undefined) {
            this.dialogModel = params.dialogModel;
        }
        if (params.linkCheck !== undefined) {
            this.linkCheck = params.linkCheck;
        }
        if (params.confirmAdd !== undefined) {
            this.confirmAdd = params.confirmAdd;
        }
        if (params.loadColor !== undefined) {
            this.loadColor = params.loadColor;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.confirm !== undefined) {
            this.confirm = params.confirm;
        }
    }
    aboutToBeDeleted() {
        this.__linkCheck.aboutToBeDeleted();
        this.__confirmAdd.aboutToBeDeleted();
        this.__loadColor.aboutToBeDeleted();
        this.__name.aboutToBeDeleted();
        this.__src.aboutToBeDeleted();
        this.__videoList.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private dialogModel: HomeDialogModel;
    private __linkCheck: ObservedPropertyObject<Resource>;
    get linkCheck() {
        return this.__linkCheck.get();
    }
    set linkCheck(newValue: Resource) {
        this.__linkCheck.set(newValue);
    }
    private __confirmAdd: ObservedPropertyObject<Resource>;
    get confirmAdd() {
        return this.__confirmAdd.get();
    }
    set confirmAdd(newValue: Resource) {
        this.__confirmAdd.set(newValue);
    }
    private __loadColor: ObservedPropertyObject<Resource>;
    get loadColor() {
        return this.__loadColor.get();
    }
    set loadColor(newValue: Resource) {
        this.__loadColor.set(newValue);
    }
    private __name: SynchedPropertySimpleTwoWay<string>;
    get name() {
        return this.__name.get();
    }
    set name(newValue: string) {
        this.__name.set(newValue);
    }
    private __src: SynchedPropertySimpleTwoWay<string>;
    get src() {
        return this.__src.get();
    }
    set src(newValue: string) {
        this.__src.set(newValue);
    }
    private __videoList: SynchedPropertySimpleOneWay<Array<VideoBean>>;
    get videoList() {
        return this.__videoList.get();
    }
    set videoList(newValue: Array<VideoBean>) {
        this.__videoList.set(newValue);
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private confirm: () => void;
    render() {
        Column.create();
        TextInput.create({ placeholder: $r('app.string.link_placeholder'), text: this.src });
        TextInput.height(HomeConstants.INTERNET_ADD_DIALOG.TEXT_HEIGHT);
        TextInput.width(CommonConstants.NINETY_PERCENT);
        TextInput.margin({ top: HomeConstants.INTERNET_ADD_DIALOG.TEXT_MARGIN_TOP });
        TextInput.onChange((value: string) => {
            this.src = value;
        });
        TextInput.create({ placeholder: $r('app.string.name_placeholder'), text: this.name });
        TextInput.height(HomeConstants.INTERNET_ADD_DIALOG.TEXT_HEIGHT);
        TextInput.width(CommonConstants.NINETY_PERCENT);
        TextInput.margin({ top: HomeConstants.INTERNET_ADD_DIALOG.TEXT_MARGIN_TOP });
        TextInput.onChange((value: string) => {
            this.name = value;
        });
        Flex.create({ justifyContent: FlexAlign.SpaceAround });
        Flex.margin({
            top: $r('app.float.dialog_column_margin_top'),
            bottom: $r('app.float.dialog_column_margin_bottom')
        });
        Text.create(this.linkCheck);
        Text.fontSize($r('app.float.dialog_font_size'));
        Text.fontColor(ObservedObject.GetRawObject(this.loadColor));
        Text.onClick(() => {
            if (this.dialogModel.checkSrcNull()) {
                this.dialogModel.checkSrcValidity(0);
            }
        });
        Text.pop();
        Divider.create();
        Divider.vertical(true);
        Divider.height($r('app.float.tab_dialog_divider_height'));
        Divider.color($r('app.color.divider_color'));
        Divider.opacity($r('app.float.tab_dialog_divider_opacity'));
        Divider.margin({
            left: $r('app.float.dialog_divider_margin_left'),
            right: $r('app.float.dialog_divider_margin_left')
        });
        Text.create(this.confirmAdd);
        Text.fontSize($r('app.float.dialog_font_size'));
        Text.fontColor(ObservedObject.GetRawObject(this.loadColor));
        Text.onClick(() => {
            if (this.dialogModel.checkSrcNull() && this.dialogModel.checkNameNull()) {
                this.dialogModel.checkSrcValidity(1);
            }
        });
        Text.pop();
        Flex.pop();
        Column.pop();
    }
}
