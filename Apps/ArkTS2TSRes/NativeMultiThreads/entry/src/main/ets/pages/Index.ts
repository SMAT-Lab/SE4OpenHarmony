interface Index_Params {
    imagePath?: string;
    imageName?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
import hilog from '@ohos.hilog';
var testNapi = globalThis.requireNapi("entry", true);
;
import Constants from '../../common/constants/CommonConstants';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__imagePath = new ObservedPropertySimple(Constants.INIT_IMAGE_PATH, this, "imagePath");
        this.imageName = '';
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.imagePath !== undefined) {
            this.imagePath = params.imagePath;
        }
        if (params.imageName !== undefined) {
            this.imageName = params.imageName;
        }
    }
    aboutToBeDeleted() {
        this.__imagePath.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __imagePath: ObservedPropertySimple<string>;
    get imagePath() {
        return this.__imagePath.get();
    }
    set imagePath(newValue: string) {
        this.__imagePath.set(newValue);
    }
    private imageName: string;
    render() {
        Column.create();
        Column.width(Constants.FULL_PARENT);
        Column.height(Constants.FULL_PARENT);
        Column.backgroundColor($r('app.color.root_background_color'));
        // display the sample title
        Row.create();
        // display the sample title
        Row.height($r('app.float.title_area_height'));
        // display the sample title
        Row.width(Constants.FULL_PARENT);
        // display the sample title
        Row.padding({ left: $r('app.float.title_area_left_padding') });
        Text.create($r('app.string.sample_title'));
        Text.fontSize($r('app.float.title_text_font_size'));
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        // display the sample title
        Row.pop();
        // show the initial image
        Row.create();
        // show the initial image
        Row.height($r('app.float.image_area_height'));
        // show the initial image
        Row.width(Constants.FULL_PARENT);
        // show the initial image
        Row.padding({ left: $r('app.float.image_area_left_padding'), right: $r('app.float.image_area_right_padding') });
        Image.create(this.imagePath);
        Image.borderRadius($r('app.float.image_border_radius'));
        Image.backgroundColor(Color.White);
        Image.onError(() => {
            hilog.info(0x0000, 'testTag', 'load imagePath fail: %{public}s.', this.imagePath);
            // when the target image is not found (path loading fails), a warning dialog box is displayed.
            AlertDialog.show({
                title: $r('app.string.image_error_dialog_title'),
                message: $r('app.string.image_error_dialog_message'),
                autoCancel: true,
                alignment: DialogAlignment.Bottom,
                offset: { dx: $r('app.float.error_dialog_offset_dx'), dy: $r('app.float.error_dialog_offset_dy') },
                primaryButton: {
                    value: $r('app.string.error_dialog_primary_button'),
                    action: () => {
                        hilog.info(0x0000, 'testTag', 'dialog click cancel.');
                    }
                },
                secondaryButton: {
                    value: $r('app.string.error_dialog_secondary_button'),
                    action: () => {
                        hilog.info(0x0000, 'testTag', 'dialog click confirm.');
                    }
                }
            });
        });
        // show the initial image
        Row.pop();
        // button list, prompting the user to click the button to select the target image.
        Column.create();
        // button list, prompting the user to click the button to select the target image.
        Column.width(Constants.FULL_PARENT);
        // button list, prompting the user to click the button to select the target image.
        Column.justifyContent(FlexAlign.End);
        // button list, prompting the user to click the button to select the target image.
        Column.layoutWeight(Constants.BUTTON_AREA_LAYOUT_WEIGHT);
        // button list, prompting the user to click the button to select the target image.
        Column.padding({
            bottom: $r('app.float.button_area_bottom_padding'),
            left: $r('app.float.button_area_left_padding'),
            right: $r('app.float.button_area_right_padding')
        });
        // multi-threads sync call button
        Button.createWithLabel($r('app.string.sync_button_title'));
        // multi-threads sync call button
        Button.width(Constants.FULL_PARENT);
        // multi-threads sync call button
        Button.margin($r('app.float.button_common_margin'));
        // multi-threads sync call button
        Button.onClick(() => {
            this.imageName = Constants.SYNC_BUTTON_IMAGE;
            this.imagePath = Constants.IMAGE_ROOT_PATH + testNapi.getImagePathSync(this.imageName);
            hilog.info(0x0000, 'testTag', 'sync operate imagePath: %{public}s', this.imagePath);
        });
        // multi-threads sync call button
        Button.pop();
        // multi-threads callback async button
        Button.createWithLabel($r('app.string.async_callback_button_title'));
        // multi-threads callback async button
        Button.width(Constants.FULL_PARENT);
        // multi-threads callback async button
        Button.margin($r('app.float.button_common_margin'));
        // multi-threads callback async button
        Button.onClick(() => {
            this.imageName = Constants.CALLBACK_BUTTON_IMAGE;
            testNapi.getImagePathAsyncCallBack(this.imageName, (result: string) => {
                this.imagePath = Constants.IMAGE_ROOT_PATH + result;
                hilog.info(0x0000, 'testTag', 'async callback operate imagePath: %{public}s', this.imagePath);
            });
        });
        // multi-threads callback async button
        Button.pop();
        // multi-threads promise async button
        Button.createWithLabel($r('app.string.async_promise_button_title'));
        // multi-threads promise async button
        Button.width(Constants.FULL_PARENT);
        // multi-threads promise async button
        Button.margin($r('app.float.button_common_margin'));
        // multi-threads promise async button
        Button.onClick(() => {
            this.imageName = Constants.PROMISE_BUTTON_IMAGE;
            let promiseObj = testNapi.getImagePathAsyncPromise(this.imageName);
            promiseObj.then((result: string) => {
                this.imagePath = Constants.IMAGE_ROOT_PATH + result;
                hilog.info(0x0000, 'testTag', 'async promise operate imagePath: %{public}s', this.imagePath);
            });
        });
        // multi-threads promise async button
        Button.pop();
        // multi-threads tsf async button
        Button.createWithLabel($r('app.string.async_tsf_button_title'));
        // multi-threads tsf async button
        Button.width(Constants.FULL_PARENT);
        // multi-threads tsf async button
        Button.margin($r('app.float.button_common_margin'));
        // multi-threads tsf async button
        Button.onClick(() => {
            this.imageName = Constants.TSF_BUTTON_IMAGE;
            testNapi.getImagePathAsyncTSF(this.imageName, (result: string) => {
                this.imagePath = Constants.IMAGE_ROOT_PATH + result;
                hilog.info(0x0000, 'testTag', 'async thread_safe_func operate imagePath: %{public}s', this.imagePath);
            });
        });
        // multi-threads tsf async button
        Button.pop();
        // error image button
        Button.createWithLabel($r('app.string.error_image_button_title'));
        // error image button
        Button.width(Constants.FULL_PARENT);
        // error image button
        Button.margin($r('app.float.button_common_margin'));
        // error image button
        Button.onClick(() => {
            this.imageName = Constants.ERROR_BUTTON_IMAGE;
            this.imagePath = Constants.IMAGE_ROOT_PATH + testNapi.getImagePathSync(this.imageName);
            hilog.info(0x0000, 'testTag', 'error operate imagePath: %{public}s', this.imagePath);
        });
        // error image button
        Button.pop();
        // button list, prompting the user to click the button to select the target image.
        Column.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
