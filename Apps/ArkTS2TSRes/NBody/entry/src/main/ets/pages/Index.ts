interface Index_Params {
    message?: string;
    timeCost?: String;
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
import { computeNBodyByTaskPool, computeNBodyByWorker } from '../model/CalculateUtil';
import Logger from '../utils/Logger';
import Constants from '../utils/Constants';
const TAG: string = 'Index';
const WHILE_CALCULATE: string = 'Calculating...';
const ID_BUTTON_TASK_POOL_CALCULATE: string = "id_btn_task_pool_calculate";
const ID_BUTTON_WORKER_CALCULATE: string = "id_btn_worker_calculate";
const ID_TEXT_MESSAGE: string = "id_text_message";
const ID_TOP_IMAGE: string = "id_top_image";
const ID_TOP_TEXT: string = "id_top_text";
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Click button to calculate.', this, "message");
        this.__timeCost = AppStorage.SetAndLink('timeCost', '', this, "timeCost");
        this.updateWithValueParams(params);
        this.declareWatch("timeCost", this.timeCostChanged);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__timeCost.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __timeCost: ObservedPropertyAbstract<String>;
    get timeCost() {
        return this.__timeCost.get();
    }
    set timeCost(newValue: String) {
        this.__timeCost.set(newValue);
    }
    timeCostChanged(): void {
        let timeCost: string | undefined = AppStorage.get<string>('timeCost');
        if (timeCost !== undefined) {
            this.message = timeCost;
        }
    }
    render() {
        Column.create();
        Column.width($r('app.string.layout_100'));
        Column.height($r('app.string.layout_100'));
        Column.justifyContent(FlexAlign.Center);
        Column.alignItems(HorizontalAlign.Center);
        Stack.create({ alignContent: Alignment.Center });
        Stack.height($r('app.string.layout_24'));
        Stack.width($r('app.string.layout_100'));
        Image.create($r("app.media.galaxy_1280"));
        Image.width($r('app.string.layout_100'));
        Image.height($r('app.string.layout_100'));
        Image.borderRadius($r('app.integer.top_image_border_radius'));
        Image.autoResize(false);
        Image.id(ID_TOP_IMAGE);
        Text.create($r('app.string.page_title'));
        Text.fontSize($r('app.integer.top_bar_font_size'));
        Text.fontColor(Color.White);
        Text.textAlign(TextAlign.Center);
        Text.id(ID_TOP_TEXT);
        Text.pop();
        Stack.pop();
        Text.create(this.message);
        Text.fontSize($r('app.integer.center_message_font_size'));
        Text.fontWeight(FontWeight.Bold);
        Text.height($r('app.string.layout_10'));
        Text.id(ID_TEXT_MESSAGE);
        Text.pop();
        Button.createWithLabel($r('app.string.button_task_pool_text'));
        Button.onClick(() => {
            // 使用任务池执行计算任务
            if (this.message === WHILE_CALCULATE) {
                this.reCalculateAlert();
            }
            else {
                this.message = WHILE_CALCULATE;
                computeNBodyByTaskPool(Constants.TIME_STEPS_TASK_POOL);
            }
        });
        Button.margin({
            top: $r('app.integer.button_task_pool_margin_top')
        });
        Button.id(ID_BUTTON_TASK_POOL_CALCULATE);
        Button.pop();
        Button.createWithLabel($r('app.string.button_worker_text'));
        Button.onClick(() => {
            // 使用Worker执行计算任务
            if (this.message === WHILE_CALCULATE) {
                this.reCalculateAlert();
            }
            else {
                this.message = WHILE_CALCULATE;
                computeNBodyByWorker(Constants.TIME_STEPS_WORKER);
            }
        });
        Button.margin({
            top: $r('app.integer.button_worker_margin_top')
        });
        Button.id(ID_BUTTON_WORKER_CALCULATE);
        Button.pop();
        Column.pop();
    }
    private reCalculateAlert(): void {
        AlertDialog.show({
            title: $r('app.string.AlertDialog_title'),
            message: $r('app.string.AlertDialog_message'),
            autoCancel: true,
            alignment: DialogAlignment.Bottom,
            offset: { dx: 0, dy: $r('app.integer.AlertDialog_offset') },
            confirm: {
                value: $r('app.string.AlertDialog_ok'),
                action: () => {
                    Logger.info(TAG, 'Callback when confirm button is clicked');
                }
            },
            cancel: () => {
                Logger.info(TAG, 'Closed callbacks');
            }
        });
    }
}
loadDocument(new Index("1", undefined, {}));
