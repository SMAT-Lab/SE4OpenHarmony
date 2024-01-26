interface ParentCompDataItem_Params {
    index?: number;
    syncIndex?: number;
    childObject?: ClassObject;
}
interface ParentChildPartialContentSyncCode_Params {
    parentData?: ClassObject[];
    syncIndex?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ParentChildPartialContentSyncCode_" + ++__generate__Id;
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
import { ObjectLinkComponent } from './ObjectLinkComponent';
import { ViewCodeText } from '../../../../../commoncomponents/ViewCodeText';
// 数组中元素的类，使用@Observed修饰
@Observed
export class ClassObject {
    public elementType: Resource;
    public attributeType: Resource | string;
    constructor(elementType: Resource, attributeType: Resource | string) {
        this.elementType = elementType;
        this.attributeType = attributeType;
    }
}
// 初始化父组件中的数据
const PARENT_DATA: ClassObject[] = [new ClassObject($r('app.string.partial_sync_element_one'), $r('app.string.partial_sync_attribute_one')),
    new ClassObject($r('app.string.partial_sync_element_two'), $r('app.string.partial_sync_attribute_two')),
    new ClassObject($r('app.string.partial_sync_element_three'), $r('app.string.partial_sync_attribute_three'))];
export class ParentChildPartialContentSyncCode extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__parentData = new ObservedPropertyObject(PARENT_DATA, this, "parentData");
        this.__syncIndex = new ObservedPropertySimple(0, this, "syncIndex");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ParentChildPartialContentSyncCode_Params) {
        if (params.parentData !== undefined) {
            this.parentData = params.parentData;
        }
        if (params.syncIndex !== undefined) {
            this.syncIndex = params.syncIndex;
        }
    }
    aboutToBeDeleted() {
        this.__parentData.aboutToBeDeleted();
        this.__syncIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    // 初始化父组件中状态变量
    private __parentData: ObservedPropertyObject<ClassObject[]>;
    get parentData() {
        return this.__parentData.get();
    }
    set parentData(newValue: ClassObject[]) {
        this.__parentData.set(newValue);
    }
    // 与子组件同步的的数据是数组的第几个元素，默认选中第一个
    private __syncIndex: ObservedPropertySimple<number>;
    get syncIndex() {
        return this.__syncIndex.get();
    }
    set syncIndex(newValue: number) {
        this.__syncIndex.set(newValue);
    }
    render() {
        Column.create({ space: 10 });
        Column.width('100%');
        Column.padding(10);
        Column.border({ radius: $r('app.float.component_radius'), color: Color.Grey, width: $r('app.float.border_width') });
        let earlierCreatedChild_2: ViewCodeText = (this && this.findChildById) ? this.findChildById("2") as ViewCodeText : undefined;
        if (earlierCreatedChild_2 == undefined) {
            // 点击查看源码
            View.create(new ViewCodeText("2", this, { webSrc: { "id": 0, "type": 30000, params: ['ParentChildPartialContentSyncCode.ets.html'] } }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                webSrc: { "id": 0, "type": 30000, params: ['ParentChildPartialContentSyncCode.ets.html'] }
            });
            View.create(earlierCreatedChild_2);
        }
        Text.create($r('app.string.partial_sync_parent_tips'));
        Text.fontColor($r('app.color.tips_font_color'));
        Text.fontSize($r('app.float.tips_font_size'));
        Text.width('100%');
        Text.textAlign(TextAlign.Start);
        Text.pop();
        // 父组件中List展示状态变量中的内容
        Column.create();
        // 父组件中List展示状态变量中的内容
        Column.width('100%');
        // 父组件中List展示状态变量中的内容
        Column.backgroundColor($r('app.color.component_background_pink'));
        ForEach.create("4", this, ObservedObject.GetRawObject(this.parentData), (item: ClassObject, index: number) => {
            Column.create();
            Column.backgroundColor(index === this.syncIndex ? $r('app.color.component_background_pink') : undefined);
            Column.onClick(() => {
                this.syncIndex = index;
            });
            let earlierCreatedChild_3: ParentCompDataItem = (this && this.findChildById) ? this.findChildById("3") as ParentCompDataItem : undefined;
            if (earlierCreatedChild_3 == undefined) {
                View.create(new ParentCompDataItem("3", this, { index: index, syncIndex: this.syncIndex, childObject: item }));
            }
            else {
                earlierCreatedChild_3.updateWithValueParams({
                    index: index, syncIndex: this.syncIndex, childObject: item
                });
                View.create(earlierCreatedChild_3);
            }
            Column.pop();
        }, (item: ClassObject) => JSON.stringify(item));
        ForEach.pop();
        // 父组件中List展示状态变量中的内容
        Column.pop();
        let earlierCreatedChild_5: ObjectLinkComponent = (this && this.findChildById) ? this.findChildById("5") as ObjectLinkComponent : undefined;
        if (earlierCreatedChild_5 == undefined) {
            //与父组件状态同步的子组件
            View.create(new ObjectLinkComponent("5", this, { childObjectData: this.parentData[this.syncIndex] }));
        }
        else {
            earlierCreatedChild_5.updateWithValueParams({
                childObjectData: this.parentData[this.syncIndex]
            });
            View.create(earlierCreatedChild_5);
        }
        Column.pop();
    }
}
class ParentCompDataItem extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.index = 0;
        this.__syncIndex = new SynchedPropertySimpleOneWay(params.syncIndex, this, "syncIndex");
        this.__childObject = new SynchedPropertyNesedObject(params.childObject, this, "childObject");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ParentCompDataItem_Params) {
        if (params.index !== undefined) {
            this.index = params.index;
        }
        this.syncIndex = params.syncIndex;
        this.__childObject.set(params.childObject);
    }
    aboutToBeDeleted() {
        this.__syncIndex.aboutToBeDeleted();
        this.__childObject.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private index: number;
    private __syncIndex: SynchedPropertySimpleOneWay<number>;
    get syncIndex() {
        return this.__syncIndex.get();
    }
    set syncIndex(newValue: number) {
        this.__syncIndex.set(newValue);
    }
    // 使用@ObjectLink修饰，与父组件中元素同步
    private __childObject: SynchedPropertyNesedObject<ClassObject>;
    get childObject() {
        return this.__childObject.get();
    }
    render() {
        Column.create();
        Column.padding(10);
        Column.id(`arrayElement${this.index}`);
        Text.create(this.childObject.elementType);
        Text.width('100%');
        Text.fontSize(20);
        Text.pop();
        If.create();
        if (this.index === this.syncIndex) {
            If.branchId(0);
            TextInput.create({ text: this.childObject.attributeType });
            TextInput.fontSize(20);
            TextInput.id(`attribute${this.index + 1}`);
            TextInput.onChange((value: string) => {
                // 更新父组件中元素的属性，子组件同步
                this.childObject.attributeType = value;
            });
        }
        else {
            If.branchId(1);
            Text.create(this.childObject.attributeType);
            Text.width('100%');
            Text.fontSize(20);
            Text.pop();
        }
        If.pop();
        Column.pop();
    }
}
