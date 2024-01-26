@Component
export struct MyNavigation {
  @State currentIndex: number = 0
  @State Build: Array<Object> = [
    {
      icon: $r('app.media.add'),
      icon_after: $r('app.media.addcolor'),
      text: 'add',
      num: 0
    },
    {
      icon: $r('app.media.app'),
      icon_after: $r('app.media.appcolor'),
      text: 'app',
      num: 1
    },
    {
      icon: $r('app.media.collect'),
      icon_after: $r('app.media.collectcolor'),
      text: 'collect',
      num: 2
    }
  ]

  @Builder NavigationToolbar() {
    Row() {
      ForEach(this.Build, item => {
        Column() {
          Image(this.currentIndex == item.num ? item.icon_after : item.icon)
            .width(25)
            .height(25)
          Text(item.text)
            .fontColor(this.currentIndex == item.num ? "#ff7500" : "#000000")
        }
        .onClick(() => {
          this.currentIndex = item.num
        })
        .margin({ left: 70 })
      })
    }
  }

  build() {
    Column() {
      Navigation() {
          Text('Navigation组件').fontSize(30).fontWeight(700)
      }
      .toolBar(this.NavigationToolbar)
    }
  }
}