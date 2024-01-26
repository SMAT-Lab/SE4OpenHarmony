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

@Component
export struct ParentChildPartialContentSyncCode {
  // 初始化父组件中状态变量
  @State parentData: ClassObject[] = PARENT_DATA;
  // 与子组件同步的的数据是数组的第几个元素，默认选中第一个
  @State syncIndex: number = 0;

  build() {
    Column({ space: 10 }) {
      // 点击查看源码
      ViewCodeText({ webSrc: $rawfile('ParentChildPartialContentSyncCode.ets.html') })

      Text($r('app.string.partial_sync_parent_tips'))
        .fontColor($r('app.color.tips_font_color'))
        .fontSize($r('app.float.tips_font_size'))
        .width('100%')
        .textAlign(TextAlign.Start)
      // 父组件中List展示状态变量中的内容
      Column() {
        ForEach(this.parentData, (item: ClassObject, index: number) => {
          Column() {
            ParentCompDataItem({ index: index, syncIndex: this.syncIndex, childObject: item })
          }
          .backgroundColor(index === this.syncIndex ? $r('app.color.component_background_pink') : undefined)
          .onClick(() => {
            this.syncIndex = index;
          })
        }, (item: ClassObject) => JSON.stringify(item))
      }
      .width('100%')
      .backgroundColor($r('app.color.component_background_pink'))

      //与父组件状态同步的子组件
      ObjectLinkComponent({ childObjectData: this.parentData[this.syncIndex] })
    }
    .width('100%')
    .padding(10)
    .border({ radius: $r('app.float.component_radius'), color: Color.Grey, width: $r('app.float.border_width') })
  }
}

// 展示数组中单个元素的子组件
@Component
struct ParentCompDataItem {
  private index: number = 0;
  @Prop syncIndex: number;
  // 使用@ObjectLink修饰，与父组件中元素同步
  @ObjectLink childObject: ClassObject;

  build() {
    Column() {
      Text(this.childObject.elementType)
        .width('100%')
        .fontSize(20)
      if (this.index === this.syncIndex) {
        TextInput({ text: this.childObject.attributeType })
          .fontSize(20)
          .id(`attribute${this.index + 1}`)
          .onChange((value: string) => {
            // 更新父组件中元素的属性，子组件同步
            this.childObject.attributeType = value;
          })
      } else {
        Text(this.childObject.attributeType)
          .width('100%')
          .fontSize(20)
      }
    }
    .padding(10)
    .id(`arrayElement${this.index}`)
  }
}

