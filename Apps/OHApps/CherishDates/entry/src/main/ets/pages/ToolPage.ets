import { compTool } from './compTool'
import router from '@ohos.router'
import http from '@ohos.net.http'
import { JitangModel } from '../Model/JitangModel'

@Entry
@Component
export struct ToolPage {
  @State message: string = 'Hello World'
  build() {
    Row() {
      Column() {
        // Part1：首页最顶白条 ”Tools“
        Row() {
          Column() {
            Text("Tools     ") // 不知道为什么不居中，人为居中一下
              .fontSize(20)
              .fontWeight(FontWeight.Bold)
          }
          .width("100%")
          .margin(20)
          .padding(20)
          .height("9%")
          .backgroundColor(Color.White)
        }.alignItems(VerticalAlign.Top)


        // Part2：添加多个工具
        compTool({
          tool: "每日打气",
          intro: "每日一句正能量，开启鲜活一天！"
        }).onClick(() => {
          router.pushUrl({
            url: "pages/JitangPage"
          })
        })

        compTool({
          tool: "星座运势",
          intro: "根据日期或星座名称,查询星座详细信息~",
          img: $r("app.media.xingzuo")
        }).onClick(() => {
          router.pushUrl({
            url: "pages/XingzuoPage"
          })
        })

        compTool({
          tool: "治愈萌宠",
          intro: "与可爱的治愈萌宠一起放松身心，享受纯粹的快乐时光！",
          img: $r("app.media.cat")
        }).onClick(() => {
          router.pushUrl({
            url: "pages/CutiePetPage"
          })
        })

        compTool({
          tool: "静心白噪",
          intro: "带您进入宁静世界，舒缓压力，提供放松和专注的美妙体验。",
          img: $r("app.media.whitenoise")
        }).onClick(() => {
          router.pushUrl({
            url: "pages/WhitenoisePage"
          })
        })

        compTool({
          tool: "文案生成",
          intro: "还在苦想朋友圈文案吗？让我来帮你吧！",
          img: $r("app.media.wenan2")
        }).onClick(() => {
          router.pushUrl({
            url: "pages/WenanPage"
          })
        })

        compTool({
          tool: "轻松一刻",
          intro: "笑一笑，十年少:D",
          img: $r("app.media.xiaohua")
        }).onClick(() => {
          router.pushUrl({
            url: "pages/XiaohuaPage"
          })
        })

        // compTool({
        //   tool: "性格测试",
        //   intro: "通过我们的性格测试，探索你内在的魅力！",
        //   img: $r("app.media.xingge")
        // }).onClick(() => {
        //   router.pushUrl({
        //     url: "pages/XingePage"
        //   })
        // })


      }.alignItems(HorizontalAlign.Center)
    }.alignItems(VerticalAlign.Top)
  }
}