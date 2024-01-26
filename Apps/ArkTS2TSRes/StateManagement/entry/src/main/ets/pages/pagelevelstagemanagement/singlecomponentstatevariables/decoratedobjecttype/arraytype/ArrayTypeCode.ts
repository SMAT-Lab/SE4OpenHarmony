interface ArrayDataItem_Params {
    arrayDataItem?: ArrayDataType;
    itemIndex?: number;
}
interface ArrayTypeCode_Params {
    arrayTypeData?: ArrayDataType[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ArrayTypeCode_" + ++__generate__Id;
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
import promptAction from '@ohos.promptAction';
import { ViewCodeText } from '../../../../../commoncomponents/ViewCodeText';
// 数组中元素的类
export class ArrayDataType {
    public id: number;
    public name: string;
    public age: number;
    constructor(id: number, name: string, age: number) {
        this.id = id;
        this.name = name;
        this.age = age;
    }
}
// 初始化数组数据
const ARRAY_TYPE_AGE_DATA: ArrayDataType[] = [new ArrayDataType(0, 'name', 17), new ArrayDataType(1, 'name', 18),
    new ArrayDataType(2, 'name', 19)];
// 初始化功能按钮字符串数据
const ARRAY_TYPE_BTN: Resource[] = [$r('app.string.array_type_add'), $r('app.string.array_type_delete'),
    $r('app.string.array_type_update')];
export class ArrayTypeCode extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__arrayTypeData = new ObservedPropertyObject(ARRAY_TYPE_AGE_DATA, this, "arrayTypeData");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ArrayTypeCode_Params) {
        if (params.arrayTypeData !== undefined) {
            this.arrayTypeData = params.arrayTypeData;
        }
    }
    aboutToBeDeleted() {
        this.__arrayTypeData.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    // 数组类型状态变量初始化
    private __arrayTypeData: ObservedPropertyObject<ArrayDataType[]>;
    get arrayTypeData() {
        return this.__arrayTypeData.get();
    }
    set arrayTypeData(newValue: ArrayDataType[]) {
        this.__arrayTypeData.set(newValue);
    }
    render() {
        Column.create({ space: 10 });
        Column.padding(10);
        Column.border({ radius: $r('app.float.component_radius'), color: Color.Grey, width: $r('app.float.border_width') });
        let earlierCreatedChild_2: ViewCodeText = (this && this.findChildById) ? this.findChildById("2") as ViewCodeText : undefined;
        if (earlierCreatedChild_2 == undefined) {
            // 点击查看源码
            View.create(new ViewCodeText("2", this, { webSrc: { "id": 0, "type": 30000, params: ['ArrayTypeCode.ets.html'] } }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                webSrc: { "id": 0, "type": 30000, params: ['ArrayTypeCode.ets.html'] }
            });
            View.create(earlierCreatedChild_2);
        }
        // 数组内容展示
        List.create();
        // 数组内容展示
        List.width('100%');
        // 数组内容展示
        List.height('40%');
        // 数组内容展示
        List.backgroundColor($r('app.color.component_background_pink'));
        // 数组内容展示
        List.padding({ left: 10, right: 10 });
        ForEach.create("4", this, ObservedObject.GetRawObject(this.arrayTypeData), (item: ArrayDataType, index: number) => {
            ListItem.create();
            let earlierCreatedChild_3: ArrayDataItem = (this && this.findChildById) ? this.findChildById("3") as ArrayDataItem : undefined;
            if (earlierCreatedChild_3 == undefined) {
                View.create(new ArrayDataItem("3", this, { arrayDataItem: item, itemIndex: index }));
            }
            else {
                earlierCreatedChild_3.updateWithValueParams({
                    arrayDataItem: item, itemIndex: index
                });
                if (!earlierCreatedChild_3.needsUpdate()) {
                    earlierCreatedChild_3.markStatic();
                }
                View.create(earlierCreatedChild_3);
            }
            ListItem.pop();
        }, (item: ArrayDataType) => JSON.stringify(item));
        ForEach.pop();
        // 数组内容展示
        List.pop();
        // 功能按钮区
        ForEach.create("5", this, ObservedObject.GetRawObject(ARRAY_TYPE_BTN), (item: Resource, index: number) => {
            Button.createWithLabel(item);
            Button.id(`arrayTypeBtn${index}`);
            Button.width('100%');
            Button.height($r('app.float.button_height'));
            Button.fontColor($r('app.color.button_text_color'));
            Button.fontSize($r('app.float.button_text_size'));
            Button.type(ButtonType.Capsule);
            Button.backgroundColor($r('app.color.button_background_color'));
            Button.onClick(() => {
                this.handleButtonClick(index);
            });
            Button.pop();
        }, (item: Resource) => JSON.stringify(item));
        // 功能按钮区
        ForEach.pop();
        Column.pop();
    }
    handleButtonClick(index: number) {
        switch (index) {
            case 0:
                // 数组添加元素
                this.arrayTypeData.push(new ArrayDataType(this.arrayTypeData.length, `name`, 18)); // 新增元素数据，age为18
                break;
            case 1:
                if (this.arrayTypeData.length === 0) {
                    // 当数据没有数据的时候，点击删除按钮，出现提示弹窗
                    promptAction.showToast({
                        message: $r('app.string.array_type_deletetoast')
                    });
                }
                else {
                    // 数组删除元素
                    this.arrayTypeData.splice(this.arrayTypeData.length - 1, 1); // 删除最后一个元素
                }
                break;
            case 2:
                if (this.arrayTypeData.length === 0) {
                    // 当数据没有数据的时候，点击更新按钮，出现提示弹窗
                    promptAction.showToast({
                        message: $r('app.string.array_type_updatetoast')
                    });
                    break;
                }
                // 初始化一个对象后给数组中的元素赋值，更新数组元素
                let temp = new ArrayDataType(this.arrayTypeData[0].id, this.arrayTypeData[0].name, this.arrayTypeData[0].age + 1);
                this.arrayTypeData[0] = temp;
                break;
            default:
                break;
        }
    }
}
class ArrayDataItem extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.arrayDataItem = new ArrayDataType(0, '', 0);
        this.itemIndex = 0;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ArrayDataItem_Params) {
        if (params.arrayDataItem !== undefined) {
            this.arrayDataItem = params.arrayDataItem;
        }
        if (params.itemIndex !== undefined) {
            this.itemIndex = params.itemIndex;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private arrayDataItem: ArrayDataType;
    private itemIndex: number;
    render() {
        Column.create();
        Column.margin({ top: 20 });
        Text.create(`${this.arrayDataItem.name}${this.itemIndex}`);
        Text.width('100%');
        Text.fontColor($r('app.color.button_text_color'));
        Text.fontSize(20);
        Text.pop();
        Text.create(`age:${this.arrayDataItem.age}`);
        Text.width('100%');
        Text.fontColor($r('app.color.button_text_color'));
        Text.fontSize(20);
        Text.pop();
        Divider.create();
        Divider.width('100%');
        Divider.strokeWidth(1);
        Divider.margin({ top: 20 });
        Column.pop();
    }
}
