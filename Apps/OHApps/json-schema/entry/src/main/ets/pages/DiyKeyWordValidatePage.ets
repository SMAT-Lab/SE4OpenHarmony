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

import { Schema, SchemaError, validate, ValidationError, Validator, ValidatorResult } from '@ohos/jsonschema'

@Entry
@Component
struct DiyKeyWordValidatePage {
  @State message0: string = `validator.attributes.contains = function validateContains(instance, schema, options, ctx) {
  if(typeof instance !== 'string') return;
  if(typeof schema.contains !== 'string') throw new jsonschema.SchemaError('"contains" expects a string', schema);
  if(instance.indexOf(schema.contains)<0){
    return 'does not contain the string ' + JSON.stringify(schema.contains);
  }
}
let result = validator.validate("I am an instance", { type:"string", contains: "I am" });
// result.valid === true;`
  @State message1: string = `验证对象：--`
  @State message2: string = `期待结果：暂无`
  @State message3: string = `实际结果：--`

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


      new Validator().attributes.contains = Validator.validateContains=(instance:string, schema:Schema, options:string, ctx:string) :string|void=>{
        if (typeof instance !== 'string') return;

        if (typeof schema.contains !== 'string') {
           new SchemaError('"contains" expects a string', schema);
        }

        if (instance.indexOf(schema.contains) < 0) {

          return 'does not contain the string ' + JSON.stringify(schema.contains);
        }

        if (schema.contains.length < 2) {
          return '"contains" length must more than 2 ';
        }
      }



      let str = JSON.stringify(new Validator().validate("I am an instance", { type: "string", contains: "I am" }));
      console.log(`jsonschema ------> 测试结果是：${str}`);
      ctx.message1 = `验证对象： ${str}`;
      ctx.message3 = `实际结果：${new Validator().validate("I am an instance", { type: "string", contains: "I am" }).valid}`
    } catch (err) {
      let str = JSON.stringify(err);
      console.log(`jsonschema ------> 验证出错：${str}`);
      ctx.message3 = `验证出错：${str}`
    }
  }
}