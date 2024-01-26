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

import { CustomDataSource, getStringArray } from '@ohos/common';

@Component
export struct GridOperation {
  private operationRes: Resource | undefined = undefined;
  @State operationSource: string[] = [];
  private doOperation: (index: number) => void = () => {};

  build() {
    Column() {
      GridRow({ columns: 12, gutter: { x: 2, y: 5 },
        direction: GridRowDirection.Row
      }) {
        ForEach(this.operationSource, (item: string, index: number) => {
          GridCol({ span: { xs: 6, sm: 6, md: 4, lg: 4 } }) {
            Row() {
              Button() {
                Text(item)
                  .fontSize(16)
                  .fontColor(Color.White)
              }
              .width(160)
              .height(50)
              .type(ButtonType.Capsule)
              .margin({ right: 10, top: 10 })
              .onClick(() => {
                this.doOperation(index);
              })
            }
            .justifyContent(FlexAlign.Center)
          }
        }, (index: string) => index)
      }
    }
    .width('100%')
    .padding({ bottom: 15 })
  }

  async aboutToAppear() {
    if (this.operationRes) {
      let menuList = await getStringArray(this.operationRes);
      this.operationSource = menuList;
    }
  }
}