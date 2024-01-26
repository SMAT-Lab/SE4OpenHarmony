interface TextInputWidget_Params {
    inputImage?: Resource;
    hintText?: Resource;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TextInputWidget_" + ++__generate__Id;
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
import CommonConstants from '../common/constants/CommonConstants';
export default class TextInputWidget extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.inputImage = undefined;
        this.hintText = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TextInputWidget_Params) {
        if (params.inputImage !== undefined) {
            this.inputImage = params.inputImage;
        }
        if (params.hintText !== undefined) {
            this.hintText = params.hintText;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private inputImage: Resource;
    private hintText: Resource;
    render() {
        Row.create();
        Row.margin({ top: $r('app.float.input_row_top') });
        Row.borderRadius($r('app.float.input_row_radius'));
        Row.backgroundColor(Color.White);
        Row.width(CommonConstants.COMMON_DIALOG_WIDTH);
        Row.height($r('app.float.input_row_height'));
        Image.create(this.inputImage);
        Image.width($r('app.float.input_image_size'));
        Image.height($r('app.float.input_image_size'));
        Image.margin({ left: $r('app.float.input_image_left') });
        TextInput.create({ placeholder: this.hintText });
        TextInput.fontSize($r('app.float.input_text_size'));
        TextInput.padding({ left: $r('app.float.input_left_inside') });
        TextInput.placeholderColor($r('app.color.place_color'));
        TextInput.backgroundColor(Color.White);
        TextInput.fontWeight(FontWeight.Normal);
        TextInput.fontStyle(FontStyle.Normal);
        TextInput.fontColor(Color.Black);
        TextInput.margin({ right: $r('app.float.input_right_inside') });
        TextInput.layoutWeight(CommonConstants.WEIGHT_ONE);
        TextInput.height($r('app.float.text_input_height'));
        Row.pop();
    }
}
