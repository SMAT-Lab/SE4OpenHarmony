interface TestButton_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TestButton_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Institute of Software, Chinese Academy of Sciences.
 * Licensed under the Apache License,Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Button_type_main, Button_type_normal, Button_type_link, Button_type_group, Button_size_big_blue, Button_size_big_grey, Button_size_small_blue, Button_size_small_grey, Button_size_tiny_blue, Button_size_tiny_grey, Button_size_block_blue, Button_size_block_grey, Button_state_withIcon, Button_state_stateSwitching, Button_state_multSelect, Button_state_singleSelect, Button_state_loading, Button_state_disable_blue, Button_state_disable_grey, Button_color_default, Button_color_main, Button_color_info, Button_color_success, Button_color_danger, Button_color_warn } from "easyui";
class TestButton extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TestButton_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Column.create();
        Column.margin(5);
        Text.create("按钮的类型");
        Text.margin({ bottom: 10 });
        Text.fontSize(16);
        Text.pop();
        Flex.create();
        Flex.pop();
        Text.create("按钮的尺寸");
        Text.margin({ bottom: 10 });
        Text.markAnchor({
            x: 0,
            y: -100
        });
        Text.fontSize(16);
        Text.pop();
        Flex.create();
        Flex.pop();
        Text.create("按钮的不同状态");
        Text.margin({ bottom: 10 });
        Text.fontSize(16);
        Text.markAnchor({
            x: 0,
            y: -320
        });
        Text.pop();
        Flex.create();
        Flex.pop();
        Text.create("按钮的颜色");
        Text.margin({ bottom: 10 });
        Text.fontSize(16);
        Text.markAnchor({
            x: 0,
            y: -530
        });
        Text.pop();
        Flex.create();
        Flex.pop();
        Column.pop();
    }
}
loadDocument(new TestButton("1", undefined, {}));
