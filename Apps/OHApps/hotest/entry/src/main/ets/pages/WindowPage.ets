import window from '@ohos.window';
import router from '@ohos.router';
@Entry
@Component
struct WindowPage {
  @State status: string = "";

  private subWindowID = "subWindowID"
  private subWindow: window.Window = null

  build() {
    Column({space: 10}) {
      Button("创建子窗口")
        .onClick(() => {
          this.createSubWindow()
        })

      Button("加载内容")
        .onClick(() => {
          this.loadContent("pages/sub_window")
        })

      Button("显示子窗口")
        .onClick(() => {
          this.showSubWindow()
        })

      Button("销毁子窗口")
        .onClick(() => {
          this.destroySubWindow()
        })

      Button("打开第二页")
        .onClick(() => {
          router.pushUrl({
            url: "pages/second" // second 页面读者请自行添加
          })
        })

      Text(this.status)
        .fontSize(24)
    }
    .width('100%')
    .height("100%")
    .backgroundColor(Color.White)
    .padding(10)
  }

  private destroySubWindow() {
    if (this.subWindow) {
      this.subWindow.destroy().then(() => {
        this.status = "destroy subWindow success"
        this.subWindow = null
      }).catch((error) => {
        this.status = "destroy subWindow failure: " + JSON.stringify(error)
      })
    } else {
      this.status = "subWindow already destroyed"
    }
  }

  private showSubWindow() {
    if (this.subWindow) {
      this.subWindow.show().then(() => {
        this.status = "show subWindow success"
      }).catch((error) => {
        this.status = "show subWindow failure: " + JSON.stringify(error)
      })
    } else {
      this.status = "subWindow not created"
    }
  }

  private loadContent(path: string) {
    if (this.subWindow) {
      this.subWindow.loadContent(path).then(() => {
        this.status = "load content success"
      }).catch((error) => {
        this.status = "load content failure: " + JSON.stringify(error)
      })
    } else {
      this.status = "subWindow not created"
    }
  }

  private createSubWindow() {
    window.create(this.subWindowID, window.WindowType.TYPE_APP).then((subWindow) => {
      if (subWindow) {
        this.subWindow = subWindow
        this.subWindow.setFocusable(false)
        this.subWindow.setDimBehind(0.4)
        this.subWindow.resetSize(750, 480)
        this.subWindow.moveTo(230, 1200)
        this.subWindow.setBackgroundColor(Color.Red.toString())
        this.subWindow.setOutsideTouchable(false)
        this.subWindow.setTouchable(false)
        this.status = "create subWindow success"
      } else {
        this.status = "create subWindow failure: " + JSON.stringify(subWindow)
      }
    }).catch((error) => {
      this.status = "create subWindow failure: " + JSON.stringify(error)
    })
  }
}