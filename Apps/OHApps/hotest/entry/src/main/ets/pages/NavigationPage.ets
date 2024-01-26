import prompt from '@ohos.promptAction';
@Entry @Component struct NavigationPage {

  @State index: number = 0;
  @State hideToolBar: boolean = false;
  @State hideTitleBar: boolean = false;

  @Builder toolbar() {
    Row() {
      Column() {
        Image(this.index == 0 ? 'pages/icon_message_selected.png' : 'pages/icon_message_normal.png')
          .size({width: 25, height: 25})
        Text('消息')
          .fontSize(16)
          .fontColor(this.index == 0 ? "#2a58d0" : "#6b6b6b")
      }
      .alignItems(HorizontalAlign.Center)
      .height('100%')
      .layoutWeight(1)
      .onClick(() => {
        this.index = 0;
      })

      Column() {
        Image(this.index == 1 ? 'pages/icon_contract_selected.png' : 'pages/icon_contract_normal.png')
          .size({width: 25, height: 25})
        Text('联系人')
          .fontSize(16)
          .fontColor(this.index == 1 ? "#2a58d0" : "#6b6b6b")
      }
      .alignItems(HorizontalAlign.Center)
      .height('100%')
      .layoutWeight(1)
      .onClick(() => {
        this.index = 1;
      })

      Column() {
        Image(this.index == 2 ? 'pages/icon_dynamic_selected.png' : 'pages/icon_dynamic_normal.png')
          .size({width: 25, height: 25})
        Text('动态')
          .fontSize(16)
          .fontColor(this.index == 2 ? "#2a58d0" : "#6b6b6b")
      }
      .alignItems(HorizontalAlign.Center)
      .height('100%')
      .layoutWeight(1)
      .onClick(() => {
        this.index = 2;
      })
    }
    .width('100%')
    .height(60)
  }

  build() {
    Navigation() {
      Column({space: 10}) {
        Text(this.index == 0 ? "消息" : this.index == 1 ? "联系人" : "动态")
          .textAlign(TextAlign.Center)
          .fontSize(30)

        Button(this.hideTitleBar ? "显示TitleBar" : "隐藏TitleBar")
          .onClick(() => {
            this.hideTitleBar = !this.hideTitleBar;
          })


        Button(this.hideToolBar ? "显示ToolBar" : "隐藏ToolBar")
          .onClick(() => {
            this.hideToolBar = !this.hideToolBar;
          })
      }
      .backgroundColor('#aabbcc')
      .size({width: '100%', height: '100%'})
    }
    .size({width: '100%', height: '100%'})
    .title("标题栏")
    .toolBar(this.toolbar())
    .hideToolBar(this.hideToolBar)
    .hideTitleBar(this.hideTitleBar)
    .menus([
      {
        value: "搜索",
        icon: "pages/icon_search.png",
        action: () => {
          prompt.showToast({message: "搜索"})
        }
      },
      {
        value: "扫码",
        icon: "pages/icon_scan.png",
        action: () => {
          prompt.showToast({message: "扫码"})
        }
      }
    ])
  }
}