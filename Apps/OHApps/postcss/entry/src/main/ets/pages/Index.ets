/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import postcss from '@ohos/postcss'
import Rule from '@ohos/postcss/src/main/ets/components/lib/rule'
import LazyResult from '@ohos/postcss/src/main/ets/components/lib/lazy-result'
import Processor from '@ohos/postcss/src/main/ets/components/lib/processor'
import {
  Root,
} from '@ohos/postcss/src/main/ets/components/lib/postcss'
@Entry
@Component
struct Index {
  @State message: string = 'test'
  @State public rule:string = ''
  @State public parse:boolean |undefined = false
  @State public comment:string = ''
  @State public container:number = 0
  @State public declaration:string = ''
  @State public fromJson:string = ''
  @State public lazyResult:string = ''
  @State public list:Array<string> = []
  @State public node:string = ''
  @State public postcss:Array<ESObject> = []
  @State public previous:boolean |undefined = false
  @State public processor:string = ''
  @State public result:string = ''
  build() {
    Scroll() {
      Row() {
        Column() {
          Text(this.message)
            .fontSize(50)
            .fontWeight(FontWeight.Bold)
          Button('rule')
            .width('90%')
            .height(50)
            .margin({
              bottom: 10
            })
            .onClick(() => {
              this.ruleClick()
            })
          Text("结果 :" + this.rule)
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .margin({ top: "30px" })
          Button('comment')
            .width('90%')
            .height(50)
            .margin({
              bottom: 10
            })
            .onClick(() => {
              this.commentClick()
            })
          Text("结果 :" + this.comment)
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .margin({ top: "30px" })
          Button('container')
            .width('90%')
            .height(50)
            .margin({
              bottom: 10
            })
            .onClick(() => {
              this.containerClick()
            })
          Text("结果 :" + this.container)
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .margin({ top: "30px" })
          Button('declaration')
            .width('90%')
            .height(50)
            .margin({
              bottom: 10
            })
            .onClick(() => {
              this.declarationClick()
            })
          Text("结果 :" + this.declaration)
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .margin({ top: "30px" })
          Button('fromJson')
            .width('90%')
            .height(50)
            .margin({
              bottom: 10
            })
            .onClick(() => {
              this.fromJsonClick()
            })
          Text("结果 :" + this.fromJson)
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .margin({ top: "30px" })
          Button('lazyResult')
            .width('90%')
            .height(50)
            .margin({
              bottom: 10
            })
            .onClick(() => {
              this.lazyResultClick()
            })
          Text("结果 :" + this.lazyResult)
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .margin({ top: "30px" })
          Button('list')
            .width('90%')
            .height(50)
            .margin({
              bottom: 10
            })
            .onClick(() => {
              this.listClick()
            })
          Text("结果 :" + this.list)
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .margin({ top: "30px" })
          Button('node')
            .width('90%')
            .height(50)
            .margin({
              bottom: 10
            })
            .onClick(() => {
              this.nodeClick()
            })
          Text("结果 :" + this.node)
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .margin({ top: "30px" })
          Button('parse')
            .width('90%')
            .height(50)
            .margin({
              bottom: 10
            })
            .onClick(() => {
              this.parseClick()
            })
          Text("结果 :" + this.parse)
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .margin({ top: "30px" })
          Button('postcss')
            .width('90%')
            .height(50)
            .margin({
              bottom: 10
            })
            .onClick(() => {
              this.postcssClick()
            })
          Text("结果 :" + this.postcss)
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .margin({ top: "30px" })
          Button('previous-map')
            .width('90%')
            .height(50)
            .margin({
              bottom: 10
            })
            .onClick(() => {
              this.previousClick()
            })
          Text("结果 :" + this.previous)
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .margin({ top: "30px" })
          Button('processor')
            .width('90%')
            .height(50)
            .margin({
              bottom: 10
            })
            .onClick(() => {
              this.processorClick()
            })
          Text("结果 :" + this.processor)
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .margin({ top: "30px" })
          Button('result')
            .width('90%')
            .height(50)
            .margin({
              bottom: 10
            })
            .onClick(() => {
              this.resultClick()
            })
          Text("结果 :" + this.result)
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .margin({ top: "30px" })
        }
        .width('100%')
      }
    }
  }
  ruleClick(){
    let rule = new postcss.AtRule({ name: 'encoding', params: '"utf-8"' })
    this.rule =  rule.name
  }
  commentClick(){
    let comment = new postcss.Comment({ text: 'hi' })
    this.comment = comment.toString()
  }
  containerClick(){
    let rule = postcss.parse('a { a: 1; b: 2 }').first as Rule
    let size = 0

    rule.each(() => {
      rule.prepend({ prop: 'color', value: 'aqua' })
      size += 1
    })
    this.container = size
  }
  declarationClick(){
    let decl = new postcss.Declaration({ prop: 'color', value: 'black' })
    this.declaration = decl.prop
  }
  fromJsonClick(){
    try {
      let result = postcss.fromJSON({ type: 'not-a-node-type' })
      if (result) {
      } else {
      }
    } catch (err) {
      this.fromJson = `${err}`
    }
  }
  lazyResultClick(){
    let processor = new Processor()
    let result = new LazyResult(processor, 'a {}', {})
    this.lazyResult = result.root.type
  }
  listClick(){
    this.list = postcss.list.space('a b')
  }
  nodeClick(){
    let rule = new postcss.Rule({ selector: 'a' })
    let error = rule.error('Test')
    this.node = error.message
  }
  parseClick(){
    let css = postcss.parse('\uFEFF@host { a {\f} }')
    this.parse = css.first?.source?.input.hasBOM
  }
  postcssClick(){
    let a = (): void => {}
    let b = (): void => {}
    this.postcss = postcss(a,b).plugins
  }
  previousClick(){
    let map2: ESObject = {
      version: 3,
      file: 'b',
      sources: ['a'],
      names: [],
      mappings: ''
    }
    this.previous = postcss.parse('a{}', {
      map: {
        prev: map2
      }
    }).source?.input.map.withContent()
  }
  processorClick(){
    let beforeFix = new Processor([
      (root: Root) => {
        root.walkRules(rule => {
          if (!rule.selector.match(new RegExp('::(before|after)'))) return
          if (!rule.some(i => i.type === 'decl' && i.prop === 'content')) {
            rule.prepend({ prop: 'content', value: '""' })
          }
        })
      }
    ])
    let result = beforeFix.process('a::before{top:0}')
    this.processor = result.css
  }
  resultClick(){
    let processor = new Processor()
    let css = postcss.parse('a{}')
    let result = new postcss.Result(processor, css, {})
    result.warn('TT', { node: css.first })
    this.result = result.messages[0].toString()
  }
}