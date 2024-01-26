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

import { ColumnOperation } from '../components/ColumnOperation';
import { serializerNode, parserNode, convertNode } from '../util/ConvertXmlUtil';

@Component
export struct ConvertXml {
  @State output: string = `eTSXmlTextConvert`;
  @State input: string =
    `<?xml version="1.0" encoding="utf-8"?>
     <note importance="high" logged="true">
         <title>Happy</title>
         <todo>Work</todo>
         <todo>Play</todo>
     </note>`;

  build() {
    Scroll() {
      Column() {
        Text(this.output)
          .width('90%')
          .height('60%')
          .fontSize(15)
          .padding(10)
          .margin({ left: 10, right: 10, top: 20, bottom: 10 })
          .border({ width: 2, radius: 5, color: Color.Gray })
        ColumnOperation({ operationRes: $r('app.strarray.convert_xml_operations'), doOperation: this.doOperation })
      }
      .width('100%')
      .padding(16)
    }
    .scrollBar(BarState.Off)
    .align(Alignment.Start)
  }

  doOperation = (index: number) => {
    switch (index) {
      case 0:
        this.output = serializerNode();
        break;
      case 1:
        this.output = parserNode(this.input);
        break;
      case 2:
        this.output = convertNode(this.input);
        break;
      default:
        break;
    }
  }
}