interface OlderPage_Params {
    birthdate?: string;
    sex?: string;
    hobbies?: string;
    sexArray?: Resource;
    customDialogController?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "OlderPage_" + ++__generate__Id;
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
import Context from '@ohos.app.ability.common';
import CommonUtils from '../common/utils/CommonUtils';
import CommonConstants from '../common/constants/CommonConstants';
import TextInputWidget from '../view/TextInputWidget';
import TextCommonWidget from '../view/TextCommonWidget';
import CustomDialogWidget from '../view/CustomDialogWidget';
import Logger from '../common/utils/Logger';
export class OlderPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__birthdate = new ObservedPropertySimple('', this, "birthdate");
        this.__sex = new ObservedPropertySimple('', this, "sex");
        this.__hobbies = new ObservedPropertySimple('', this, "hobbies");
        this.sexArray = $r('app.strarray.sex_array');
        this.customDialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new CustomDialogWidget("7", this, {
                    hobbies: this.__hobbies,
                });
                jsDialog.setController(this.customDialogController);
                View.create(jsDialog);
            },
            alignment: DialogAlignment.Bottom,
            customStyle: true,
            offset: {
                dx: 0,
                dy: CommonConstants.DY_OFFSET
            }
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: OlderPage_Params) {
        if (params.birthdate !== undefined) {
            this.birthdate = params.birthdate;
        }
        if (params.sex !== undefined) {
            this.sex = params.sex;
        }
        if (params.hobbies !== undefined) {
            this.hobbies = params.hobbies;
        }
        if (params.sexArray !== undefined) {
            this.sexArray = params.sexArray;
        }
        if (params.customDialogController !== undefined) {
            this.customDialogController = params.customDialogController;
        }
    }
    aboutToBeDeleted() {
        this.__birthdate.aboutToBeDeleted();
        this.__sex.aboutToBeDeleted();
        this.__hobbies.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __birthdate: ObservedPropertySimple<string>;
    get birthdate() {
        return this.__birthdate.get();
    }
    set birthdate(newValue: string) {
        this.__birthdate.set(newValue);
    }
    private __sex: ObservedPropertySimple<string>;
    get sex() {
        return this.__sex.get();
    }
    set sex(newValue: string) {
        this.__sex.set(newValue);
    }
    private __hobbies: ObservedPropertySimple<string>;
    get hobbies() {
        return this.__hobbies.get();
    }
    set hobbies(newValue: string) {
        this.__hobbies.set(newValue);
    }
    private sexArray: Resource;
    private customDialogController: CustomDialogController;
    aboutToAppear() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + CommonConstants.PLUS_ONE;
        let day = date.getDate();
        this.birthdate = CommonUtils.getBirthDateValue(year, month, day);
        let context = getContext(this);
        if ((CommonUtils.isEmpty(context)) || (CommonUtils.isEmpty(context.resourceManager))) {
            Logger.error(CommonConstants.TAG_HOME, 'context or resourceManager is null');
            return;
        }
        let manager = context.resourceManager;
        manager.getStringValue($r('app.string.default_sex').id, (error, sexValue) => {
            if (!CommonUtils.isEmpty(error)) {
                Logger.error(CommonConstants.TAG_HOME, 'error = ' + JSON.stringify(error));
            }
            else {
                this.sex = sexValue;
            }
        });
    }
    render() {
        Column.create();
        Column.backgroundColor($r('app.color.column_background_color'));
        Column.width(CommonConstants.FULL_WIDTH);
        Column.height(CommonConstants.FULL_HEIGHT);
        // Image($r('app.media.ic_back'))
        //   .width($r('app.float.image_back_size'))
        //   .height($r('app.float.image_back_size'))
        //   .alignSelf(ItemAlign.Start)
        //   .margin({
        //     left: CommonConstants.BACK_MARGIN_LEFT,
        //     top: CommonConstants.BACK_MARGIN_TOP
        //   })
        //   .onClick(() => {
        //     let context = getContext(this) as Context.UIAbilityContext;
        //     CommonUtils.alertDialog(context);
        //   })
        // person
        Image.create($r('app.media.ic_avatar'));
        // Image($r('app.media.ic_back'))
        //   .width($r('app.float.image_back_size'))
        //   .height($r('app.float.image_back_size'))
        //   .alignSelf(ItemAlign.Start)
        //   .margin({
        //     left: CommonConstants.BACK_MARGIN_LEFT,
        //     top: CommonConstants.BACK_MARGIN_TOP
        //   })
        //   .onClick(() => {
        //     let context = getContext(this) as Context.UIAbilityContext;
        //     CommonUtils.alertDialog(context);
        //   })
        // person
        Image.width($r('app.float.avatar_size'));
        // Image($r('app.media.ic_back'))
        //   .width($r('app.float.image_back_size'))
        //   .height($r('app.float.image_back_size'))
        //   .alignSelf(ItemAlign.Start)
        //   .margin({
        //     left: CommonConstants.BACK_MARGIN_LEFT,
        //     top: CommonConstants.BACK_MARGIN_TOP
        //   })
        //   .onClick(() => {
        //     let context = getContext(this) as Context.UIAbilityContext;
        //     CommonUtils.alertDialog(context);
        //   })
        // person
        Image.height($r('app.float.avatar_size'));
        // Image($r('app.media.ic_back'))
        //   .width($r('app.float.image_back_size'))
        //   .height($r('app.float.image_back_size'))
        //   .alignSelf(ItemAlign.Start)
        //   .margin({
        //     left: CommonConstants.BACK_MARGIN_LEFT,
        //     top: CommonConstants.BACK_MARGIN_TOP
        //   })
        //   .onClick(() => {
        //     let context = getContext(this) as Context.UIAbilityContext;
        //     CommonUtils.alertDialog(context);
        //   })
        // person
        Image.alignSelf(ItemAlign.Center);
        // Image($r('app.media.ic_back'))
        //   .width($r('app.float.image_back_size'))
        //   .height($r('app.float.image_back_size'))
        //   .alignSelf(ItemAlign.Start)
        //   .margin({
        //     left: CommonConstants.BACK_MARGIN_LEFT,
        //     top: CommonConstants.BACK_MARGIN_TOP
        //   })
        //   .onClick(() => {
        //     let context = getContext(this) as Context.UIAbilityContext;
        //     CommonUtils.alertDialog(context);
        //   })
        // person
        Image.margin({ top: CommonConstants.AVATAR_MARGIN_TOP });
        Text.create($r('app.string.text_personal_title'));
        Text.fontColor(Color.Black);
        Text.fontSize($r('app.float.personal_font_size'));
        Text.margin({ top: CommonConstants.PERSONAL_MARGIN_TOP });
        Text.alignSelf(ItemAlign.Center);
        Text.pop();
        let earlierCreatedChild_2: TextInputWidget = (this && this.findChildById) ? this.findChildById("2") as TextInputWidget : undefined;
        if (earlierCreatedChild_2 == undefined) {
            // 组件
            View.create(new TextInputWidget("2", this, {
                inputImage: $r('app.media.ic_nickname'),
                hintText: $r('app.string.text_input_hint')
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                inputImage: $r('app.media.ic_nickname'),
                hintText: $r('app.string.text_input_hint')
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        let earlierCreatedChild_3: TextCommonWidget = (this && this.findChildById) ? this.findChildById("3") as TextCommonWidget : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new TextCommonWidget("3", this, {
                textImage: $r('app.media.ic_birthdate'),
                title: $r('app.string.title_birthdate'),
                content: this.__birthdate,
                onItemClick: () => {
                    CommonUtils.datePickerDialog((birthValue: string) => {
                        this.birthdate = birthValue;
                    });
                }
            }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                textImage: $r('app.media.ic_birthdate'),
                title: $r('app.string.title_birthdate'),
                onItemClick: () => {
                    CommonUtils.datePickerDialog((birthValue: string) => {
                        this.birthdate = birthValue;
                    });
                }
            });
            View.create(earlierCreatedChild_3);
        }
        let earlierCreatedChild_4: TextCommonWidget = (this && this.findChildById) ? this.findChildById("4") as TextCommonWidget : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new TextCommonWidget("4", this, {
                textImage: $r('app.media.ic_sex'),
                title: $r('app.string.title_sex'),
                content: this.__sex,
                onItemClick: () => {
                    CommonUtils.textPickerDialog(this.sexArray, (sexValue: string) => {
                        this.sex = sexValue;
                    });
                }
            }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({
                textImage: $r('app.media.ic_sex'),
                title: $r('app.string.title_sex'),
                onItemClick: () => {
                    CommonUtils.textPickerDialog(this.sexArray, (sexValue: string) => {
                        this.sex = sexValue;
                    });
                }
            });
            View.create(earlierCreatedChild_4);
        }
        let earlierCreatedChild_5: TextInputWidget = (this && this.findChildById) ? this.findChildById("5") as TextInputWidget : undefined;
        if (earlierCreatedChild_5 == undefined) {
            View.create(new TextInputWidget("5", this, {
                inputImage: $r('app.media.ic_signature'),
                hintText: $r('app.string.text_input_signature')
            }));
        }
        else {
            earlierCreatedChild_5.updateWithValueParams({
                inputImage: $r('app.media.ic_signature'),
                hintText: $r('app.string.text_input_signature')
            });
            if (!earlierCreatedChild_5.needsUpdate()) {
                earlierCreatedChild_5.markStatic();
            }
            View.create(earlierCreatedChild_5);
        }
        let earlierCreatedChild_6: TextCommonWidget = (this && this.findChildById) ? this.findChildById("6") as TextCommonWidget : undefined;
        if (earlierCreatedChild_6 == undefined) {
            View.create(new TextCommonWidget("6", this, {
                textImage: $r('app.media.ic_hobbies'),
                title: $r('app.string.title_hobbies'),
                content: this.__hobbies,
                onItemClick: () => {
                    this.customDialogController.open();
                }
            }));
        }
        else {
            earlierCreatedChild_6.updateWithValueParams({
                textImage: $r('app.media.ic_hobbies'),
                title: $r('app.string.title_hobbies'),
                onItemClick: () => {
                    this.customDialogController.open();
                }
            });
            View.create(earlierCreatedChild_6);
        }
        Column.pop();
    }
}
loadDocument(new OlderPage("1", undefined, {}));
