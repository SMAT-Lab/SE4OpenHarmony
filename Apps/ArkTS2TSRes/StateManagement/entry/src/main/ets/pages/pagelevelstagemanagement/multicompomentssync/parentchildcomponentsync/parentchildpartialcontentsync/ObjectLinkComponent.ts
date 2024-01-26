interface ObjectLinkComponent_Params {
    childObjectData?: ClassObject;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ObjectLinkComponent_" + ++__generate__Id;
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
import { ClassObject } from './ParentChildPartialContentSyncCode';
import { ViewCodeText } from '../../../../../commoncomponents/ViewCodeText';
export class ObjectLinkComponent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__childObjectData = new SynchedPropertyNesedObject(params.childObjectData, this, "childObjectData");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ObjectLinkComponent_Params) {
        this.__childObjectData.set(params.childObjectData);
    }
    aboutToBeDeleted() {
        this.__childObjectData.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    // 使用@ObjectLink修饰，与父组件中元素同步
    private __childObjectData: SynchedPropertyNesedObject<ClassObject>;
    get childObjectData() {
        return this.__childObjectData.get();
    }
    render() {
        Column.create({ space: 10 });
        Column.border({ radius: $r('app.float.component_radius'), color: Color.Blue, width: $r('app.float.border_width') });
        Column.padding(10);
        let earlierCreatedChild_2: ViewCodeText = (this && this.findChildById) ? this.findChildById("2") as ViewCodeText : undefined;
        if (earlierCreatedChild_2 == undefined) {
            // 点击查看源码
            View.create(new ViewCodeText("2", this, { webSrc: { "id": 0, "type": 30000, params: ['ObjectLinkComponent.ets.html'] } }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                webSrc: { "id": 0, "type": 30000, params: ['ObjectLinkComponent.ets.html'] }
            });
            View.create(earlierCreatedChild_2);
        }
        Text.create($r('app.string.partial_sync_text'));
        Text.fontColor($r('app.color.tips_font_color'));
        Text.fontSize($r('app.float.tips_font_size'));
        Text.width('100%');
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Row.create();
        Row.justifyContent(FlexAlign.SpaceAround);
        Text.create(this.childObjectData.elementType);
        Text.fontColor($r('app.color.tips_font_color'));
        Text.fontSize($r('app.float.tips_font_size'));
        Text.textAlign(TextAlign.Center);
        Text.layoutWeight(1);
        Text.pop();
        TextInput.create({ text: this.childObjectData.attributeType });
        TextInput.fontSize(20);
        TextInput.layoutWeight(1);
        TextInput.id('childAttribute');
        TextInput.onChange((value: string) => {
            // 子组件对象属性更新，父元素同步
            this.childObjectData.attributeType = value;
        });
        Row.pop();
        Column.pop();
    }
}
