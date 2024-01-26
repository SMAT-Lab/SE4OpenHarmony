interface CustomDialogExample_Params {
    text?: string;
    cancel?: () => void;
    scroller?: Scroller;
    controller?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CustomDialogView_" + ++__generate__Id;
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
export class CustomDialogExample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.text = "";
        this.cancel = () => {
        };
        this.scroller = new Scroller();
        this.controller = new CustomDialogController({
            builder: () => {
                let jsDialog = new CustomDialogExample("2", this, {
                    text: this.text
                });
                jsDialog.setController(this.controller);
                View.create(jsDialog);
            },
            maskColor: CommonConstants.DIALOG_TEXT_MASK_COLOR,
            cancel: this.cancel
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CustomDialogExample_Params) {
        if (params.text !== undefined) {
            this.text = params.text;
        }
        if (params.cancel !== undefined) {
            this.cancel = params.cancel;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private text: string;
    private cancel: () => void;
    private scroller: Scroller;
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    render() {
        Column.create();
        Column.width(CommonConstants.FULL_WIDTH);
        Column.height($r('app.float.dialog_content_height'));
        Text.create($r('app.string.Recognize_result'));
        Text.height($r('app.float.dialog_title_height'));
        Text.width(CommonConstants.FULL_WIDTH);
        Text.fontSize($r('app.float.dialog_title_font_size'));
        Text.fontColor($r('app.color.font_color'));
        Text.padding({
            top: $r('app.float.dialog_title_padding_top'),
            bottom: $r('app.float.dialog_title_padding_bottom'),
            left: $r('app.float.dialog_title_padding_left')
        });
        Text.font({
            weight: CommonConstants.FONT_WEIGHT
        });
        Text.pop();
        Column.create();
        Column.width(CommonConstants.FULL_WIDTH);
        Column.height($r('app.float.dialog_result_text_height'));
        Scroll.create(this.scroller);
        Scroll.width(CommonConstants.FULL_WIDTH);
        Text.create(this.text);
        Text.width(CommonConstants.FULL_WIDTH);
        Text.fontSize($r('app.float.dialog_content_font_size'));
        Text.lineHeight($r('app.float.dialog_content_line_height'));
        Text.textAlign(TextAlign.Start);
        Text.padding({
            left: $r('app.float.dialog_content_padding_leftright'),
            right: $r('app.float.dialog_content_padding_leftright'),
            bottom: $r('app.float.dialog_content_padding_bottom')
        });
        Text.copyOption(CopyOptions.LocalDevice);
        Text.pop();
        Scroll.pop();
        Column.pop();
        Column.pop();
    }
}
