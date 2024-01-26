/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
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

import router from '@ohos.router';

import {JSONSerializer,JSONDeserializer,Universal} from '@ohos/asn1'
import { DERSerializer, DERDeserializer } from '@ohos/asn1-der';


import { btoa, atob } from 'Base64'
import { encode, decode } from 'hex-encode-decode'
import prompt from '@system.prompt';

let sequence:Universal.Sequence = new Universal.Sequence([
  new Universal.Integer(-Number.MAX_SAFE_INTEGER),
  new Universal.Integer(Number.MAX_SAFE_INTEGER),
  new Universal.Integer('424242424242424242424242424242424242'), // big integer
  new Universal.Null(),
  new Universal.Bool(true),
  new Universal.PrintableString('nice marmot'),
  new Universal.PrintableString('@#$%!&*()!_=&'),
]);

@Entry
@Component
struct Index {
  @State message: string = 'asn1 组装原数据：' + JSON.stringify(sequence);
  @State strText: string = "";
  @State serializeJsonText: string = "";
  @State deserializeJsonText: string = "";
  @State deserializeJsonTextBase64: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcefghijklmnopqrstuvwxyz1234567890+/AA==!@#$%^&*()_-/][{}?:";
  @State deserializeJsonTextHex: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcefghijklmnopqrstuvwxyz1234567890+/AA==!@#$%^&*()_-/][{}?:";
  @State deserializeJsonTextDer: string = "";
  @State deserializeJsonTextDerS: string = "";
  @State deserializeJsonTextDerD: string = "";
  private json: ESObject|null = null;
  private btnBase64Clicked: boolean = false;
  private btnHexClicked: boolean = false;
  private scroller: Scroller = new Scroller();
  @State btn64Text: string = "base64 编码";
  @State btnHexText: string = "Hex 编码";
  @State btnDerText: string = "DER"

  onPageShow(){
    // findType(1)
  }
  build() {
    Row() {
      Scroll(this.scroller) {
        Column() {
          Text(this.message)
            .fontSize(16)

          Button("asn1 序列化数据")
            .fontSize(16)
            .margin({ top: "20px" })
            .onClick((event) => {
              let serialize:JSONSerializer= new JSONSerializer();
              let startTime =new Date().getMilliseconds()
              console.info("asn1Demo-- start get JSONSerializer :"+startTime)
              this.json = serialize(sequence);
              let endTime=new Date().getMilliseconds()
              console.info("asn1Demo-- end get JSONSerializer time:"+(endTime))
              console.info("asn1Demo-- JSONSerializer time consuming:"+(endTime-startTime))
              this.serializeJsonText = JSON.stringify(this.json);
            })

          Text(this.serializeJsonText)
            .margin({ top: "20px" })
            .fontSize(16)

          Button("asn1 反序列化数据")
            .fontSize(16)
            .margin({ top: "20px" })
            .onClick((event) => {
              if(!this.json){
                prompt.showToast({message:'先序列化数据',duration:2000})
                return;
              }
              const deserialize:JSONDeserializer = new JSONDeserializer();
              let startTime =new Date().getMilliseconds()
              console.info("asn1Demo-- start get JSONDeserializer :"+startTime)
              const asn1ObjectModel:ESObject = deserialize(this.json);
              let endTime=new Date().getMilliseconds()
              console.info("asn1Demo-- end get JSONDeserializer time:"+(endTime))
              console.info("asn1Demo-- JSONDeserializer time consuming:"+(endTime-startTime))
              this.deserializeJsonText = JSON.stringify(asn1ObjectModel);
            })

          Text(this.deserializeJsonText)
            .margin({ top: "20px" })
            .fontSize(16)

          Text(this.deserializeJsonTextBase64)
            .margin({ top: "20px" })
            .fontSize(16)


          Button(this.btn64Text)
            .fontSize(16)
            .margin({ top: "20px" })
            .onClick((event) => {
              let startTime =new Date().getMilliseconds()
              console.info("asn1Demo-- start get Base64 :"+startTime)
              if (!this.btnBase64Clicked) {
                this.deserializeJsonTextBase64 = btoa("ABCDEFGHIJKLMNOPQRSTUVWXYZabcefghijklmnopqrstuvwxyz1234567890+/AA==!@#$%^&*()_-/][{}?:");
                this.btnBase64Clicked = true;
              } else {
                this.deserializeJsonTextBase64 = atob(this.deserializeJsonTextBase64);
                this.btnBase64Clicked = false;
              }
              this.btn64Text = this.btnBase64Clicked ? "base64 解码" : "base64 编码";

              let endTime=new Date().getMilliseconds()
              console.info("asn1Demo-- end get Base64 time:"+(endTime))
              console.info("asn1Demo-- Base64 time consuming:"+(endTime-startTime))
            })

          Text(this.deserializeJsonTextHex)
            .margin({ top: "20px" })
            .fontSize(16)

          Button(this.btnHexText)
            .fontSize(16)
            .margin({ top: "20px" })
            .onClick((event) => {
              let startTime =new Date().getMilliseconds()
              console.info("asn1Demo-- start hex Base64 :"+startTime)
              if (!this.btnHexClicked) {
                this.deserializeJsonTextHex = encode("ABCDEFGHIJKLMNOPQRSTUVWXYZabcefghijklmnopqrstuvwxyz1234567890+/AA==!@#$%^&*()_-/][{}?:");
                this.btnHexClicked = true;
              } else {
                this.deserializeJsonTextHex = decode(this.deserializeJsonTextHex);
                this.btnHexClicked = false;
              }

              this.btnHexText = this.btnHexClicked ? "Hex 解码" : "Hex 编码";
              let endTime=new Date().getMilliseconds()
              console.info("asn1Demo-- end get hex time:"+(endTime))
              console.info("asn1Demo-- hex time consuming:"+(endTime-startTime))
            })

          Text(this.deserializeJsonTextDer)
            .margin({ top: "20px" })
            .fontSize(16)

          Text(this.deserializeJsonTextDerS)
            .margin({ top: "20px" })
            .fontSize(16)

          Text(this.deserializeJsonTextDerD)
            .margin({ top: "20px" })
            .fontSize(16)

          Button(this.btnDerText)
            .fontSize(16)
            .margin({ top: "20px" })
            .onClick((event) => {
              let startTime =new Date().getMilliseconds()
              console.info("asn1Demo-- der start get DERSerializer :"+startTime)
              const serialize:ESObject = new DERSerializer();
              const asn1Sequence :ESObject= new Universal.Sequence([
                new Universal.Integer(123),
                new Universal.PrintableString('Hello World'),
              ]);

              this.deserializeJsonTextDer = "DER 原抽象数据:" + JSON.stringify(asn1Sequence);
              const bufferContainingDEREncodedASN1:ESObject = serialize(asn1Sequence);
              this.deserializeJsonTextDerS = "DER 序列化数据：" + JSON.stringify(bufferContainingDEREncodedASN1);

              let endTime=new Date().getMilliseconds()
              console.info("asn1Demo-- end get DERSerializer time:"+(endTime))
              console.info("asn1Demo-- DERSerializer time consuming:"+(endTime-startTime))


              let startTime1 =new Date().getMilliseconds()
              console.info("asn1Demo-- der start get DERDeserializer :"+startTime1)
              const deserialize:ESObject = new DERDeserializer();
              const des:ESObject = deserialize(bufferContainingDEREncodedASN1);
              let endTime1=new Date().getMilliseconds()
              console.info("asn1Demo-- der end get DERDeserializer time:"+(endTime1))
              console.info("asn1Demo-- der DERDeserializer time consuming:"+(endTime1-startTime1))
              this.deserializeJsonTextDerD = "DER 反序列化数据:" + JSON.stringify(des);
            })

          Button("测试BER")
            .fontSize(16)
            .margin({ top: "20px" })
            .onClick((event) => {
              router.pushUrl({
                url: "pages/berTest"
              })
            })
        }
        .width('100%')
      }
      .scrollable(ScrollDirection.Vertical)
      .width('100%')

    }
    .height('100%')
  }

  aboutToAppear() {
    console.log("asnd1 aboutToAppear");
  }
}