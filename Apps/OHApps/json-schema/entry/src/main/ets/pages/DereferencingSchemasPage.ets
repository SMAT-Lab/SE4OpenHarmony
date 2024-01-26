/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Validator } from '@ohos/jsonschema'
import { dereferaddress, dereferdapro, dereferdata, initSchema } from './IntereceTest'

@Entry
@Component
struct DereferencingSchemasPage {
  @State message0: string = `var Validator = require('jsonschema').Validator;
var v = new Validator();
v.addSchema(initialSchema);
function importNextSchema(){
  var nextSchema = v.unresolvedRefs.shift();
  if(!nextSchema){ done(); return; }
  databaseGet(nextSchema, function(schema){
    v.addSchema(schema);
    importNextSchema();
  });
}
importNextSchema();`
  @State message1: string = `验证对象：--`
  @State message2: string = `期待结果：暂无`
  @State message3: string = `实际结果：--`
  schemaArr: object[] = [dereferdata, dereferdapro, dereferaddress,]
  @State cacheSchemaNum: number = 0;
  @State isFinish: boolean = false;

  build() {
    Row() {
      Column() {
        Text(this.message0)
          .fontSize(16)
          .textAlign(TextAlign.Center)
          .fontWeight(FontWeight.Bold)
          .backgroundColor('#22E1E1E1')
          .maxLines(10)
          .fontColor(Color.Black)

        Text(this.message1)
          .fontSize(16)
          .textAlign(TextAlign.Center)
          .fontWeight(FontWeight.Bold)
          .backgroundColor('#66E1E1E1')
          .maxLines(10)
          .fontColor(Color.Black)
          .margin({
            top: 20
          })

        Text(this.message2)
          .fontSize(16)
          .textAlign(TextAlign.Center)
          .fontWeight(FontWeight.Bold)
          .backgroundColor('#66E1E1E1')
          .maxLines(10)
          .fontColor(Color.Black)
          .margin({
            top: 20
          })

        Text(this.message3)
          .fontSize(16)
          .textAlign(TextAlign.Center)
          .fontWeight(FontWeight.Bold)
          .backgroundColor('#66E1E1E1')
          .maxLines(10)
          .fontColor(Color.Black)
          .margin({
            top: 20
          })

        Button('验证')
          .backgroundColor(Color.Blue)
          .fontColor(Color.White)
          .width("80%")
          .height(100)
          .margin({
            top: 20
          })
          .onClick((event) => {
            this.validate();
          })

      }
      .width('100%')
    }
    .height('100%')
  }

  validate() {
    const ctx = this;
    ctx.message2 = `期待结果：${true}`
    try {
      new Validator().addSchema(initSchema)
      ctx.importNextSchema( new Validator());
      let str = JSON.stringify( new Validator());
      console.log(`jsonschema ------> 测试结果是：${str}`);
      ctx.message1 = `验证对象： ${str}`;
      ctx.message3 = `实际结果：${(ctx.cacheSchemaNum >= 0)}`
    } catch (err) {
      let str = JSON.stringify(err);
      console.log(`jsonschema ------> 验证出错：${str}`);
      ctx.message3 = `验证出错：${str}`
    }
  }

  importNextSchema(v: ESObject) {
    if (this.cacheSchemaNum >= this.schemaArr.length) {
      this.isFinish = true;
      return
    }
    this.message1 = `验证对象： ${JSON.stringify(v)}`
    if (!v.unresolvedRefs.shift()) {
      this.isFinish = true;
      return;
    }
    console.log(`jsonschema ------> 被移除的规则：${JSON.stringify(v.unresolvedRefs.shift())}`)
    v.addSchema(this.schemaArr[this.cacheSchemaNum]);
    this.cacheSchemaNum++;
    this.importNextSchema(v);
  }
}