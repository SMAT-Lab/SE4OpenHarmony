import router from '@ohos.router';
import { initializeOnStartup } from '../model/Model';
import { ComponentItem } from '../model/Model';
@Preview
@Entry
@Component
struct Index {
  build() {
    Column() {
      Text('ArkTS Components list')
        .fontSize(35)
        .fontWeight(700)
        .fontColor(0x366bfc)
        .fontStyle(FontStyle.Italic)
        .margin({ top: 5, left: 40, bottom: 5 })
      Tabs() {
        TabContent() {
          BaseList()
        }.tabBar('基础组件')

        TabContent() {
          CotainerList()
        }.tabBar('容器组件')

        TabContent() {
          MediaList()
        }.tabBar('媒体组件')

        TabContent() {
          DialogList()
        }.tabBar('弹窗')
      }
      .barWidth(500)
      .barHeight(50)
      .scrollable(true)
      .barMode(BarMode.Scrollable)
      .height(630)
      .backgroundColor(0xF5F5F5)
    }
    .alignItems(HorizontalAlign.Start)
    .width('100%')
  }
}

//自定义基础列表组件
@Component
struct BaseList {
  //创建一个空数组，转存切割好的基础组件数据
  private listArray: Array<ComponentItem> = []
  //获取数据
  aboutToAppear() {
    var newArray = initializeOnStartup()
    this.listArray = newArray.slice(0, 31)
  }
  build() {
    Column() {
      List({space:4}) {
        ForEach(this.listArray, item => {
          ListItem() {
            Button(item.componentName, { type: ButtonType.Normal })
              .width('100%')
              .height(56)
              .backgroundColor(0xFFFFFF)
              .fontColor('rgb(0, 0, 0)')
              .onClick(() => {
                router.push({
                  url:'pages/componentDetail',
                  params:{name:item.componentName}
                })
              })
          }.sticky(Sticky.Normal)
        },item=>item.id.toString())
      }
      .height('90%')
      .width('90%')
      .align(Alignment.Top)
      .borderColor(Color.Gray)
      .margin({ left: 20})
    }
  }
}

//自定义容器列表组件
@Component
struct CotainerList {
  //创建一个空数组，转存切割好的容器组件数据
  private listArray: Array<ComponentItem> = []
  //获取数据
  aboutToAppear() {
    var newArray = initializeOnStartup()
    this.listArray = newArray.slice(31, 51)
  }
  build() {
    Column() {
      List({space:4}) {
        ForEach(this.listArray, item => {
          ListItem() {
            Button(item.componentName, { type: ButtonType.Normal })
              .width('100%')
              .height(56)
              .backgroundColor(0xFFFFFF)
              .fontColor('rgb(0, 0, 0)')
              .onClick(() => {
                router.push({
                  url:'pages/componentDetail',
                  params:{name:item.componentName}
                })
              })
          }.sticky(Sticky.Normal)
        },item=>item.id.toString())
      }
      .height('90%')
      .width('90%')
      .align(Alignment.Top)
      .borderColor(Color.Gray)
      .margin({ left: 20})
    }
  }
}

//自定义媒体列表组件
@Component
struct MediaList {
  //创建一个空数组，转存切割好的媒体组件数据
  private listArray: Array<ComponentItem> = []
  //获取数据
  aboutToAppear() {
    var newArray = initializeOnStartup()
    this.listArray = newArray.slice (51,52)
  }
  build() {
    Column() {
      List({space:4}) {
        ForEach(this.listArray, item => {
          ListItem() {
            Button(item.componentName, { type: ButtonType.Normal })
              .width('100%')
              .height(56)
              .backgroundColor(0xFFFFFF)
              .fontColor('rgb(0, 0, 0)')
              .onClick(() => {
                router.push({
                  url:'pages/componentDetail',
                  params:{name:item.componentName}
                })
              })
          }.sticky(Sticky.Normal)
        },item=>item.id.toString())
      }
      .height('90%')
      .width('90%')
      .align(Alignment.Top)
      .borderColor(Color.Gray)
      .margin({ left: 20})
    }
  }
}


//自定义弹窗列表组件
@Component
struct DialogList {
  //创建一个空数组，转存切割好的弹窗组件数据
  private listArray: Array<ComponentItem> = []
  //获取数据
  aboutToAppear() {
    var newArray = initializeOnStartup()
    this.listArray = newArray.slice (52)
  }
  build() {
    Column() {
      List({space:4}) {
        ForEach(this.listArray, item => {
          ListItem() {
            Button(item.componentName, { type: ButtonType.Normal })
              .width('100%')
              .height(56)
              .backgroundColor(0xFFFFFF)
              .fontColor('rgb(0, 0, 0)')
              .onClick(() => {
                router.push({
                  url:'pages/componentDetail',
                  params:{name:item.componentName}
                })
              })
          }.sticky(Sticky.Normal)
        },item=>item.id.toString())
      }
      .height('90%')
      .width('90%')
      .align(Alignment.Top)
      .borderColor(Color.Gray)
      .margin({ left: 20})
    }
  }
}

