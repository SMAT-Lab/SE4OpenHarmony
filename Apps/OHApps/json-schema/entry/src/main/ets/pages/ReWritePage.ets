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
import { rewrischema, rewrivalue } from './IntereceTest'

@Entry
@Component
struct ReWritePage {
  @State message0: string = `const schema = {
  properties: {
    date: {id: 'http://example.com/date', type: 'string'},
  },
};

const value = {
  date: '2020-09-30T23:39:27.060Z',
};

function unmarshall(instance, schema){
  if(schema.id === 'http://example.com/date'){
    return new Date(instance);
  }
  return instance;
}

const v = new Validator();
const res = v.validate(value, schema, {rewrite: unmarshall});`
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
    ctx.message2 = `期待结果  使用rewrite：${true} ${'\r\n'}
       不使用rewrite：${true} ${'\r\n'}
       使用rewrite res.instance.date 是否是Date类型：${true}
       不使用rewrite res.instance.date 是否是Date类型：${false} `
    try {

      let v0 :ESObject=new Validator();
      let result00 :ESObject= v0.validate(rewrivalue, rewrischema)
      let result01 = result00.instance.date instanceof Date;

      let v1:ESObject = new Validator();
      let result10 :ESObject= v1.validate(rewrivalue, rewrischema, { rewrite: ctx.unmarshall })
      let result11 = result10.instance.date instanceof Date;

      let str = JSON.stringify(result10);
      console.log(`jsonschema ------> 测试结果是：${str}`);
      ctx.message1 = `验证对象： ${str}`;
      ctx.message3 = `实际结果：使用rewrite：${result10.valid} ${'\r\n'}
          不使用rewrite：${result00.valid} ${'\r\n'}
          使用rewrite res.instance.date 是否是Date类型：${result11}
          不使用rewrite res.instance.date 是否是Date类型：${result01}`
    } catch (err) {
      let str = JSON.stringify(err);
      console.log(`jsonschema ------> 验证出错：${str}`);
      ctx.message3 = `验证出错：${str}`
    }
  }

  unmarshall(instance:string, schema:Schema) :Object{
    if (schema.id === 'http://example.com/date') {
      return new Date(instance);
    }
    return instance;
  }
}