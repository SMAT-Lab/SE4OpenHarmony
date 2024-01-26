interface CustomDialogWidget_Params {
    hobbyBeans?: HobbyBean[];
    hobbies?: string;
    controller?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CustomDialogWidget_" + ++__generate__Id;
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
import Logger from '../common/utils/Logger';
import HobbyBean from '../common/bean/HobbyBean';
import CommonUtils from '../common/utils/CommonUtils';
import CommonConstants from '../common/constants/CommonConstants';
export default class CustomDialogWidget extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__hobbyBeans = new ObservedPropertyObject([], this, "hobbyBeans");
        this.__hobbies = new SynchedPropertySimpleTwoWay(params.hobbies, this, "hobbies");
        this.controller = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CustomDialogWidget_Params) {
        if (params.hobbyBeans !== undefined) {
            this.hobbyBeans = params.hobbyBeans;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    aboutToBeDeleted() {
        this.__hobbyBeans.aboutToBeDeleted();
        this.__hobbies.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __hobbyBeans: ObservedPropertyObject<HobbyBean[]>;
    get hobbyBeans() {
        return this.__hobbyBeans.get();
    }
    set hobbyBeans(newValue: HobbyBean[]) {
        this.__hobbyBeans.set(newValue);
    }
    private __hobbies: SynchedPropertySimpleTwoWay<string>;
    get hobbies() {
        return this.__hobbies.get();
    }
    set hobbies(newValue: string) {
        this.__hobbies.set(newValue);
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    aboutToAppear() {
        let context: Context = getContext(this);
        if (CommonUtils.isEmpty(context) || CommonUtils.isEmpty(context.resourceManager)) {
            Logger.error(CommonConstants.TAG_CUSTOM, 'context or resourceManager is null');
            return;
        }
        let manager = context.resourceManager;
        manager.getStringArrayValue($r('app.strarray.hobbies_data').id, (error, hobbyArray) => {
            if (!CommonUtils.isEmpty(error)) {
                Logger.error(CommonConstants.TAG_CUSTOM, 'error = ' + JSON.stringify(error));
            }
            else {
                hobbyArray.forEach((hobbyItem: string) => {
                    let hobbyBean = new HobbyBean();
                    hobbyBean.label = hobbyItem;
                    hobbyBean.isChecked = false;
                    this.hobbyBeans.push(hobbyBean);
                });
            }
        });
    }
    /**
     * Set hobbies value
     *
     * @param {HobbyBean[]} hobby bean array
     */
    setHobbiesValue(hobbyBeans: HobbyBean[]) {
        if (CommonUtils.isEmptyArr(hobbyBeans)) {
            Logger.error(CommonConstants.TAG_HOME, 'hobbyBeans length is 0');
            return;
        }
        let hobbiesText: string = '';
        hobbiesText = hobbyBeans.filter((isCheckItem: HobbyBean) => isCheckItem?.isChecked)
            .map((checkedItem: HobbyBean) => {
            return checkedItem.label;
        })
            .join(CommonConstants.COMMA);
        if (hobbiesText.length > 0) {
            this.hobbies = hobbiesText;
        }
    }
    render() {
        Column.create();
        Column.width(CommonConstants.COMMON_DIALOG_WIDTH);
        Column.padding({
            top: $r('app.float.dialog_top_distance'),
            bottom: $r('app.float.dialog_bottom_distance')
        });
        Column.borderRadius($r('app.float.dialog_radius'));
        Column.backgroundColor(Color.White);
        Text.create($r('app.string.text_title_hobbies'));
        Text.fontColor($r('app.color.custom_color'));
        Text.fontSize($r('app.float.title_hobbies_size'));
        Text.lineHeight($r('app.float.title_line_height'));
        Text.fontWeight(CommonConstants.BIGGER);
        Text.alignSelf(ItemAlign.Start);
        Text.margin({ left: $r('app.float.title_left_distance') });
        Text.pop();
        List.create();
        List.margin({
            top: $r('app.float.list_top_distance'),
            bottom: $r('app.float.list_bottom_distance')
        });
        List.divider({
            strokeWidth: $r('app.float.divider_height'),
            color: $r('app.color.divider_color')
        });
        List.listDirection(Axis.Vertical);
        List.edgeEffect(EdgeEffect.None);
        List.width(CommonConstants.FULL_WIDTH);
        List.height($r('app.float.options_list_height'));
        ForEach.create("2", this, ObservedObject.GetRawObject(this.hobbyBeans), (itemHobby: HobbyBean) => {
            ListItem.create();
            Row.create();
            Row.height($r('app.float.options_height'));
            Row.margin({
                top: $r('app.float.options_top_distance'),
                bottom: $r('app.float.options_bottom_distance')
            });
            Text.create(itemHobby.label);
            Text.fontSize($r('app.float.label_size'));
            Text.fontColor($r('app.color.custom_color'));
            Text.layoutWeight(CommonConstants.WEIGHT_ONE);
            Text.textAlign(TextAlign.Start);
            Text.fontWeight(CommonConstants.BIGGER);
            Text.margin({ left: $r('app.float.label_left_distance') });
            Text.pop();
            Toggle.create({ type: ToggleType.Checkbox, isOn: false });
            Toggle.onChange((isCheck) => {
                itemHobby.isChecked = isCheck;
            });
            Toggle.width($r('app.float.toggle_size'));
            Toggle.height($r('app.float.toggle_size'));
            Toggle.margin({ right: $r('app.float.toggle_right_distance') });
            Toggle.pop();
            Row.pop();
            ListItem.pop();
        }, itemHobby => itemHobby.label);
        ForEach.pop();
        List.pop();
        Row.create();
        Button.createWithLabel($r('app.string.cancel_button'));
        __Button__dialogButtonStyle();
        Button.onClick(() => {
            this.controller.close();
        });
        Button.pop();
        Blank.create();
        Blank.backgroundColor($r('app.color.custom_blank_color'));
        Blank.width($r('app.float.blank_width'));
        Blank.opacity($r('app.float.blank_opacity'));
        Blank.height($r('app.float.blank_height'));
        Blank.pop();
        Button.createWithLabel($r('app.string.definite_button'));
        __Button__dialogButtonStyle();
        Button.onClick(() => {
            this.setHobbiesValue(ObservedObject.GetRawObject(this.hobbyBeans));
            this.controller.close();
        });
        Button.pop();
        Row.pop();
        Column.pop();
    }
}
function __Button__dialogButtonStyle(): void {
    Button.fontSize($r('app.float.button_text_size'));
    Button.fontColor($r('app.color.custom_button_color'));
    Button.layoutWeight(CommonConstants.WEIGHT_ONE);
    Button.backgroundColor(Color.White);
    Button.width(CommonConstants.FULL_WIDTH);
    Button.height($r('app.float.button_height'));
}
