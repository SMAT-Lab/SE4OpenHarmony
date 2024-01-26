interface ChildObjectComp_Params {
    childObject?: ChildClass;
}
interface ClassObjectTypeCode_Params {
    classObjectData?: ParentClass;
    clickedCount?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ClassObjectTypeCode_" + ++__generate__Id;
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
import common from '@ohos.app.ability.common';
import { ViewCodeText } from '../../../../../commoncomponents/ViewCodeText';
import { getResourceString } from '../../../../../utils/ResourceUtils';
const CONTEXT: common.UIAbilityContext = getContext(this) as common.UIAbilityContext;
export class ClassObjectTypeCode extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__classObjectData = new ObservedPropertyObject(new ParentClass(getResourceString(CONTEXT, $r('app.string.class_object')), getResourceString(CONTEXT, $r('app.string.class_attribute')), 1, new ChildClass(getResourceString(CONTEXT, $r('app.string.class_child_attribute')), 2)), this, "classObjectData");
        this.clickedCount = 0;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ClassObjectTypeCode_Params) {
        if (params.classObjectData !== undefined) {
            this.classObjectData = params.classObjectData;
        }
        if (params.clickedCount !== undefined) {
            this.clickedCount = params.clickedCount;
        }
    }
    aboutToBeDeleted() {
        this.__classObjectData.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    // 对象类型状态变量初始化
    private __classObjectData: ObservedPropertyObject<ParentClass>;
    get classObjectData() {
        return this.__classObjectData.get();
    }
    set classObjectData(newValue: ParentClass) {
        this.__classObjectData.set(newValue);
    }
    // 更新对象的次数
    private clickedCount: number;
    render() {
        Column.create({ space: 10 });
        Column.width('100%');
        Column.padding(10);
        Column.border({ radius: $r('app.float.component_radius'), color: Color.Grey, width: $r('app.float.border_width') });
        let earlierCreatedChild_2: ViewCodeText = (this && this.findChildById) ? this.findChildById("2") as ViewCodeText : undefined;
        if (earlierCreatedChild_2 == undefined) {
            // 点击查看源码
            View.create(new ViewCodeText("2", this, { webSrc: { "id": 0, "type": 30000, params: ['ClassObjectTypeCode.ets.html'] } }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                webSrc: { "id": 0, "type": 30000, params: ['ClassObjectTypeCode.ets.html'] }
            });
            View.create(earlierCreatedChild_2);
        }
        Column.create({ space: 15 });
        Column.width('100%');
        Column.backgroundColor($r('app.color.component_background_pink'));
        Column.padding(10);
        Row.create();
        Row.width('100%');
        Text.create(this.classObjectData.title);
        Text.fontSize(20);
        Text.textAlign(TextAlign.End);
        Text.pop();
        Divider.create();
        Divider.layoutWeight(1);
        Divider.strokeWidth(1);
        Divider.margin({ top: 20, left: 5 });
        Row.pop();
        Column.create();
        Column.width('100%');
        Column.padding({ left: 50 });
        Row.create();
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceBetween);
        Text.create(this.classObjectData.attributeTitle);
        Text.fontSize(20);
        Text.pop();
        Text.create(`${this.classObjectData.attribute}`);
        Text.fontSize(20);
        Text.textAlign(TextAlign.End);
        Text.pop();
        Row.pop();
        Divider.create();
        Divider.width('100%');
        Divider.strokeWidth(1);
        Column.pop();
        let earlierCreatedChild_3: ChildObjectComp = (this && this.findChildById) ? this.findChildById("3") as ChildObjectComp : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new ChildObjectComp("3", this, { childObject: this.classObjectData.child })); // 对象的属性，使用子组件显示
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                childObject: this.classObjectData.child
            });
            View.create(earlierCreatedChild_3);
        }
        Column.pop();
        // 点击更新对象
        Button.createWithLabel($r('app.string.class_type_update_object'));
        // 点击更新对象
        Button.onClick(() => {
            // 更新对象，把新的对象直接赋值给状态变量
            this.clickedCount++;
            let objectTitle: string = getResourceString(CONTEXT, $r('app.string.class_object')) + this.clickedCount;
            let attributeTitle: string = getResourceString(CONTEXT, $r('app.string.class_attribute')) + this.clickedCount;
            let childAttributeTitle: string = getResourceString(CONTEXT, $r('app.string.class_child_attribute'))
                + this.clickedCount;
            let newObject = new ParentClass(objectTitle, attributeTitle, this.classObjectData.attribute + 1, new ChildClass(childAttributeTitle, this.classObjectData.child.attribute + 1));
            this.classObjectData = newObject;
        });
        // 点击更新对象
        Button.id('updateObject');
        // 点击更新对象
        Button.fontColor($r('app.color.button_text_color'));
        // 点击更新对象
        Button.fontSize($r('app.float.button_text_size'));
        // 点击更新对象
        Button.type(ButtonType.Capsule);
        // 点击更新对象
        Button.width('100%');
        // 点击更新对象
        Button.height($r('app.float.button_height'));
        // 点击更新对象
        Button.backgroundColor($r('app.color.button_background_color'));
        // 点击更新对象
        Button.pop();
        Button.createWithLabel($r('app.string.class_type_update_attribute'));
        Button.onClick(() => {
            // 点击更新对象的属性
            this.classObjectData.attribute++;
        });
        Button.id('updateObjectAttribute');
        Button.fontColor($r('app.color.button_text_color'));
        Button.fontSize($r('app.float.button_text_size'));
        Button.type(ButtonType.Capsule);
        Button.width('100%');
        Button.height($r('app.float.button_height'));
        Button.backgroundColor($r('app.color.button_background_color'));
        Button.pop();
        Button.createWithLabel($r('app.string.class_type_update_child_attribute'));
        Button.onClick(() => {
            // 点击更新对象属性的属性
            this.classObjectData.child.attribute++;
        });
        Button.id('updateAttributeOfAttribute');
        Button.fontColor($r('app.color.button_text_color'));
        Button.fontSize($r('app.float.button_text_size'));
        Button.type(ButtonType.Capsule);
        Button.width('100%');
        Button.height($r('app.float.button_height'));
        Button.backgroundColor($r('app.color.button_background_color'));
        Button.pop();
        Column.pop();
    }
}
class ChildObjectComp extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__childObject = new SynchedPropertyNesedObject(params.childObject, this, "childObject");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ChildObjectComp_Params) {
        this.__childObject.set(params.childObject);
    }
    aboutToBeDeleted() {
        this.__childObject.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    // 使用@ObjectLink修饰，与父组件同步对象的属性
    private __childObject: SynchedPropertyNesedObject<ChildClass>;
    get childObject() {
        return this.__childObject.get();
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.padding({ left: 100 });
        Row.create();
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceBetween);
        Text.create(this.childObject.title);
        Text.fontSize(20);
        Text.pop();
        Text.create(`${this.childObject.attribute}`);
        Text.fontSize(20);
        Text.textAlign(TextAlign.End);
        Text.pop();
        Row.pop();
        Divider.create();
        Divider.width('100%');
        Divider.strokeWidth(1);
        Column.pop();
    }
}
// 要更新对象属性的属性，对象属性的类需要使用@Observed修饰
@Observed
class ChildClass {
    public title: string;
    public attribute: number;
    constructor(title: string, attribute: number) {
        this.title = title;
        this.attribute = attribute;
    }
}
class ParentClass {
    public title: string;
    public attributeTitle: string;
    public attribute: number;
    public child: ChildClass;
    constructor(title: string, attributeTitle: string, attribute: number, child: ChildClass) {
        this.title = title;
        this.attributeTitle = attributeTitle;
        this.attribute = attribute;
        this.child = child;
    }
}
