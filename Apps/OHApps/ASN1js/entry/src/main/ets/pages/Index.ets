/**
 * BSD License
 *
 * Copyright (c) 2023 Huawei Device Co., Ltd. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * * Neither the name Facebook nor the names of its contributors may be used to
 * endorse or promote products derived from this software without specific
 * prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS' AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import asn1js from "@fortanix/asn1js"

import { bufferToHexCodes } from "pvutils"


@Entry
@Component
struct Index {
  @State strPrototypeText: string = "";
  @State strEncodingText: string = "";
  @State strDecodingText: string = "";
  private scroller: Scroller = new Scroller();
  private contentScroller: Scroller = new Scroller();

  build() {

    Column() {
      Scroll(this.scroller) {
        Row() {
          Button("Boolean BER")
            .fontSize(18)
            .height("45vp")
            .onClick((event) => {
              console.log("sasa:Boolean click");
              const asn:ESObject = new asn1js.Boolean({
                value: true,
              });
              this.berHandle(asn, "Boolean");
            }).margin({ bottom: "20vp", left: "20vp" })

          Button("BmpString BER")
            .fontSize(18)
            .height("45vp")
            .onClick((event) => {
              console.log("sasa:BmpString click");
              const testValue = "test message текст"
              const asn:ESObject  = new asn1js.BmpString({
                value: testValue,
              });
              this.berHandle(asn, "BmpString");
            }).margin({ bottom: "20vp", left: "20vp" })

          Button("BitString BER")
            .fontSize(18)
            .height("45vp")
            .onClick((event) => {
              console.log("sasa:BitString click");
              const asn:ESObject  = new asn1js.BitString({
                value: [
                  new asn1js.BitString({
                    valueHex: new Uint8Array([0x01])
                  }),
                  new asn1js.BitString({
                    valueHex: new Uint8Array([0x02])
                  })
                ]
              });
              this.berHandle(asn, "BitString");

            }).margin({ bottom: "20vp", left: "20vp" })

          Button("Integer BER")
            .fontSize(18)
            .height("45vp")
            .onClick((event) => {
              console.log("sasa:Integer click");
              const asn:ESObject  = new asn1js.Integer({
                value: 97196,
                valueHex: new Uint8Array([0x01, 0x7b, 0xac]),
              });
              this.berHandle(asn, "Integer");

            }).margin({ bottom: "20vp", left: "20vp" })

          Button("CharacterString BER")
            .fontSize(18)
            .height("45vp")
            .onClick((event) => {
              console.log("sasa:CharacterString click");
              const testString = "some string";
              const asn:ESObject  = new asn1js.CharacterString({
                value: testString,
              });
              this.berHandle(asn, "CharacterString");

            }).margin({ bottom: "20vp", left: "20vp" })

          Button("UniversalString BER")
            .fontSize(18)
            .height("45vp")
            .onClick((event) => {
              console.log("sasa:UniversalString click");
              const testString = "My test text";
              const asn:ESObject  = new asn1js.UniversalString({
                value: testString,
              });
              this.berHandle(asn, "UniversalString");
            }).margin({ bottom: "20vp", left: "20vp" })

          Button("Utf8String BER")
            .fontSize(18)
            .height("45vp")
            .onClick((event) => {
              console.log("sasa:Utf8String click")
              const testString = "My test Utf8String";
              const asn:ESObject  = new asn1js.Utf8String({
                value: testString,
              });
              this.berHandle(asn, "Utf8String");
            }).margin({ bottom: "20vp", left: "20vp" })

          Button("DATE BER")
            .fontSize(18)
            .height("45vp")
            .onClick((event) => {
              console.log("sasa:DATE click");
              const testString = "2000-01-02";
              const asn:ESObject  = new asn1js.DATE({
                value: testString,
              });
              this.berHandle(asn, "DATE");

            }).margin({ bottom: "20vp", left: "20vp" })

          Button("DateTime BER")
            .fontSize(18)
            .height("45vp")
            .onClick((event) => {
              console.log("sasa:DateTime click");
              const testString = "2000-01-02 12:00";
              const asn:ESObject  = new asn1js.DateTime({
                value: testString,
              });
              this.berHandle(asn, "DateTime");
            }).margin({ bottom: "20vp", left: "20vp" })

          Button("Duration BER")
            .fontSize(18)
            .height("45vp")
            .onClick((event) => {
              console.log("sasa:Duration click");
              const testString = "1000";
              const asn:ESObject  = new asn1js.Duration({
                value: testString,
              });
              this.berHandle(asn, "Duration");

            }).margin({ bottom: "20vp", left: "20vp" })

          Button("GeneralString BER")
            .fontSize(18)
            .height("45vp")
            .onClick((event) => {
              const testString = "some text";
              const asn:ESObject  = new asn1js.GeneralString({
                value: testString,
              });
              this.berHandle(asn, "GeneralString");

            }).margin({ bottom: "20vp", left: "20vp" })

          Button("GraphicString BER")
            .fontSize(18)
            .height("45vp")
            .onClick((event) => {
              const testString = "some text";
              const asn:ESObject  = new asn1js.GraphicString({
                value: testString,
              });
              this.berHandle(asn, "GraphicString");

            }).margin({ bottom: "20vp", left: "20vp" })
          Button("NumericString BER")
            .fontSize(18)
            .height("45vp")
            .onClick((event) => {
              const testString = "1234567890";
              const asn:ESObject  = new asn1js.NumericString({
                value: testString,
              });
              this.berHandle(asn, "NumericString");

            }).margin({ bottom: "20vp", left: "20vp" })
          Button("ObjectIdentifier BER")
            .fontSize(18)
            .height("45vp")
            .onClick((event) => {
              const testString = "0.2.3.4.5";
              const asn:ESObject  = new asn1js.ObjectIdentifier({
                value: testString,
              });
              this.berHandle(asn, "ObjectIdentifier");
            }).margin({ bottom: "20vp", left: "20vp" })

          Button("OctetString BER")
            .fontSize(18)
            .height("45vp")
            .onClick((event) => {
              const asn:ESObject  = new asn1js.OctetString({
                value: [
                  new asn1js.OctetString({
                    valueHex: new Uint8Array([0x01])
                  }),
                  new asn1js.OctetString({
                    valueHex: new Uint8Array([0x02])
                  }),
                ]
              });
              this.berHandle(asn, "OctetString");

            }).margin({ bottom: "20vp", left: "20vp" })


          Button("Null BER")
            .fontSize(18)
            .height("45vp")
            .onClick((event) => {
              const asn:ESObject  = new asn1js.Null({
                name: "block2",
              });
              this.berHandle(asn, "Null");

            }).margin({ bottom: "20vp", left: "20vp" })

          Button("Sequence BER")
            .fontSize(18)
            .height("45vp")
            .onClick((event) => {
              const asn:ESObject  = new asn1js.Sequence({
                name: "block1",
                value: [
                  new asn1js.Null({
                    name: "block2"
                  }),
                  new asn1js.Integer({
                    name: "block3",
                    optional: true
                  }),
                ]
              });
              this.berHandle(asn, "Sequence");

            }).margin({ bottom: "20vp", left: "20vp" })

        }
        .alignItems(VerticalAlign.Center)
        .justifyContent(FlexAlign.Center)
        .height(200)

      }.scrollable(ScrollDirection.Horizontal)
      .height(120)
      Scroll(this.contentScroller) {
        Column(){
          Text(this.strPrototypeText)
            .fontSize(16).margin({ top: "20vp" })
          Text(this.strEncodingText)
            .fontSize(16).margin({ top: "20vp" })
          Text(this.strDecodingText)
            .fontSize(16).margin({ top: "20vp" })
        }
      }.scrollable(ScrollDirection.Vertical)
      .width('100%')
      .height(620)

    }
    .height('100%')
  }

  berHandle(asn:ESObject , name: string) {
    const ber:ESObject  = asn.toBER();
    const asnParsed:ESObject  = asn1js.fromBER(ber);
    this.strPrototypeText = name + "组装数据：" + JSON.stringify(asn);
    this.strEncodingText = "toBER ArrayBuffer数据转换十六进制：" + bufferToHexCodes(ber);
    this.strDecodingText = "fromBER数据：" + JSON.stringify(asnParsed);
    console.debug(this.strPrototypeText +":"+this.strEncodingText+":"+this.strDecodingText)
  }
}
