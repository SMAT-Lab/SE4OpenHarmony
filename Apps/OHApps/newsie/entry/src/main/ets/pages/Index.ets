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

import Client from "ohos_newsie"
import promptAction from '@ohos.promptAction';

const tag = "dudu----"

class Value {
  value: ESObject
}
@Entry
@Component
struct Index {
  client: Client = new Client({});
  @State status: boolean = false;
  host: string = "xxx.xxx.xxx.xxx"
  port: number = 8084
  @State groups: Array<SelectOption> = [] //所有新闻组
  @State select_group: string = "" //选中新闻组

  @State articles: Array<SelectOption> = [] //所有文章
  @State select_article: string = "" //选中文章

  @State selected_date_time: Date = new Date();

  @Builder BuildLabel(text: string) {
    Text(text).fontSize(14)
  }

  @Builder BuildButton(text: string, callback: (() => Promise<void>) | undefined, bgColor:ResourceColor=Color.Green) {
    Button(text).margin({ right: 2, bottom: 1 }).fontSize(12).onClick(callback).height(30).backgroundColor(bgColor)
  }

  async aboutToAppear() {

  }

  build() {
    Column(){
      Column() {
        Row() {
          this.BuildLabel("当前连接状态：")
          if (this.status) {
            Text("成功").fontColor(Color.Green)
          } else {
            Text("未连接/失败").fontColor(Color.Red)
          }
        }.width("100%")


        Row() {
          this.BuildButton("点击连接", this.safeCallFunc((async () => {
            this.client = new Client({
              host: "xxx.xxx.xxx.xxx",
              port: 8084
            })
            await this.client.connect();
            this.status = true;
            return "连接成功";
          })))
        }.margin({ top: 10 }).width("100%")

        Row() {
          this.BuildLabel("当前时间：")
          DatePicker({ selected: this.selected_date_time })
            .onChange((value: DatePickerResult) => {
              if (value && value.year !== undefined) {
                this.selected_date_time.setFullYear(value.year, value.month, value.day)
              }
            }).layoutWeight(1).height(70)
          TimePicker({ selected: this.selected_date_time }).onChange((value) => {
            this.selected_date_time.setHours(value.hour, value.minute)
          }).layoutWeight(1).height(70)
        }.width("100%")
      }.layoutWeight(0.2)
      Scroll() {

        Column() {
          // 新闻组
          Column() {
            Row() {
              this.BuildLabel("新闻组：")
              Select(this.groups)
                .value(this.select_group)
                .font({ size: 16, weight: 500 })
                .fontColor('#182431')
                .selectedOptionFont({ size: 16, weight: 400 })
                .optionFont({ size: 16, weight: 400 })
                .onSelect((index: number, text: string) => {
                  this.select_group = text
                })
            }.width("100%")

            Flex({ wrap: FlexWrap.Wrap }) {
              this.BuildButton("list()-加载全部新闻组", this.safeCallFunc(async () => {
                const res: ESObject = await this.client.list()
                this.groups = res.newsgroups.map((v: ESObject) => ({ value: v.name } as Value))
                return res;
              }))
              this.BuildButton("group(group)-获取并选中文章", this.safeCallFunc(async () => {
                return await this.client.group(this.select_group)

              }),Color.Orange)

              this.BuildButton("newgroups(isoDateTime)-获取时间(后)的新闻组", this.safeCallFunc(async () => {
                return await this.client.newgroups(this.selected_date_time)
              }),Color.Orange)

              this.BuildButton("newnews(wildmat,isoDateTime)-获取新闻组、时间(后)的文章", this.safeCallFunc(async () => {
                return await this.client.newnews(this.select_group, this.selected_date_time)
              }),Color.Orange)

              this.BuildButton("listActive(wildmat?)", this.safeCallFunc(async () => {
                return await this.client.listActive(this.select_group)
              }))
















              this.BuildButton("listNewsgroups(wildmat?)", this.safeCallFunc(async () => {
                return await this.client.listNewsgroups(this.select_group)
              }))

              this.BuildButton("listOverviewFmt()", this.safeCallFunc(async () => {
                return await this.client.listOverviewFmt()
              }),Color.Green)

              this.BuildButton("hdr(field, messageIdOrRange)", this.safeCallFunc(async () => {
                return await this.client.hdr("field", this.select_article)
              }),Color.Orange)


              this.BuildButton("listHeaders(argument?: 'MSGID' | 'RANGE')-*", this.safeCallFunc(async () => {
                return await this.client.listHeaders('MSGID')
              }),Color.Red)

              this.BuildButton("last()-*", this.safeCallFunc(async () => {
                return await this.client.last()

              }),Color.Red)
              this.BuildButton("next()-*", this.safeCallFunc(async () => {
                return await this.client.next()
              }),Color.Red)

              this.BuildButton("listActiveTimes(wildmat?)-*", this.safeCallFunc(async () => {
                return await this.client.listActiveTimes(this.select_group)
              }),Color.Red)

              this.BuildButton("listDistribPats(wildmat?)-*", this.safeCallFunc(async () => {
                return await this.client.listDistribPats(this.select_group)
              }),Color.Red)
            }.margin({ top: 10 }).width("100%")

          }

          // 文章号
          Column() {
            Row() {
              this.BuildLabel("文章号：")
              Select(this.articles)
                .value(this.select_article)
                .font({ size: 16, weight: 500 })
                .fontColor('#182431')
                .selectedOptionFont({ size: 16, weight: 400 })
                .optionFont({ size: 16, weight: 400 })
                .onSelect((index: number, text: string) => {
                  this.select_article = text
                })
            }.width("100%")

            Flex({ wrap: FlexWrap.Wrap }) {


              this.BuildButton("listGroup(group)-加载全部文章", this.safeCallFunc(async () => {
                const res: ESObject = await this.client.listGroup(this.select_group)
                this.articles = res.group.articleNumbers.map((v: ESObject) => ({ value: v + "" } as Value));
                return res
              }),Color.Orange)


              this.BuildButton("article(messageId)-文章详情", this.safeCallFunc(async () => {
                return await this.client.article(this.select_article);
              }),Color.Orange)

              this.BuildButton("head(messageId)-头", this.safeCallFunc(async () => {
                return await this.client.head(this.select_article);
              }),Color.Orange)

              this.BuildButton("body(messageId)-主体", this.safeCallFunc(async () => {
                return await this.client.body(this.select_article);
              }),Color.Orange)

              this.BuildButton("stat(messageId)-是否存在", this.safeCallFunc(async () => {
                return await this.client.stat(this.select_article);
              }),Color.Orange)
              this.BuildButton("over(messageId?)", this.safeCallFunc(async () => {
                return await this.client.over(this.select_article);
              }),Color.Orange)
              this.BuildButton("post()-*", this.safeCallFunc(async () => {
                return await this.client.post();
              }),Color.Red)

              this.BuildButton("ihave(messageId)-*", this.safeCallFunc(async () => {
                return await this.client.ihave(this.select_article);
              }),Color.Red)



              this.BuildButton("check(messageId)-*", this.safeCallFunc(async () => {
                return await this.client.check(this.select_article);
              }),Color.Red)





            }.margin({ top: 10 }).width("100%")
          }

          // 会话相关命令

          Column() {
            Text("会话相关命令：").fontSize(14).width("100%")
            Flex({ wrap: FlexWrap.Wrap }) {
              this.BuildButton("help()-帮助指令", this.safeCallFunc(async () => {
                return await this.client.help();
              }))
              this.BuildButton("capabilities()-能力列表", this.safeCallFunc(async () => {
                const res: ESObject = await this.client.capabilities(); // 客户端获取服务端提供的能力列表
                return res;
              }))
              this.BuildButton("date()-获取服务器时间", this.safeCallFunc(async () => {
                return await this.client.date();
              }))
              this.BuildButton("modeReader()-模式切换", this.safeCallFunc(async () => {
                return await this.client.modeReader(); //触发服务端进行模式切换
              }))
              this.BuildButton("quit()-终止会话", this.safeCallFunc(async () => {
                return await this.client.quit(); //触发服务端进行模式切换
              }))

              this.BuildButton("modeStream()-*", this.safeCallFunc(async () => {
                return await this.client.modeStream(); //触发服务端进行模式切换
              }),Color.Red)


              this.BuildButton("slave()-*", this.safeCallFunc(async () => {
                return await this.client.slave();
              }),Color.Red)

              this.BuildButton("compressDeflate()-*", this.safeCallFunc(async () => {
                return await this.client.compressDeflate();
              }),Color.Red)

            }.width("100%").margin({ top: 10 })

          }

        }
        .padding({ top: 20 })
      }
      .width('100%')
      .layoutWeight(2)
    }




  }

  log(info: string) {
    console.log(`${tag} ${info}`)
  }

  safeCallFunc(func: Function) {
    if (typeof func != "function") return;
    return async () => {
      try {
        const result: ESObject = await func();
        this.log(JSON.stringify(result));
        this.showMessage(`操作成功 执行结果：${JSON.stringify(result) || "无"}`)
      } catch (err) {
        this.showMessage(`操作失败 错误消息为：${err.comment}`)
      }
    }

  }

  showMessage(message: string) {
    promptAction.showToast({ message })
  }
}