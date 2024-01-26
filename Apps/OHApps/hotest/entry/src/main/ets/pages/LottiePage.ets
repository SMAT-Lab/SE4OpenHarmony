
import lottie from '@ohos/lottie'
@Entry
@Component
struct LottiePage {
  private setting: RenderingContextSettings = new RenderingContextSettings(true);
  private context: CanvasRenderingContext2D = new CanvasRenderingContext2D(this.setting);

  private lottiePath: string = "common/lottie/sleep.json";
  private lottieName: string = "lottie_data";

  @State playState: string = "";

  onPageShow(){
    //    lottie.loadAnimation({
    //      container: this.context,    // 需要绑定Canvas的CanvasRenderingContext2D
    //      renderer: "canvas",         // 目前只支持canvas模式
    //      loop: true,                 // 是否循环播放
    //      autoplay: true,             // 是否自动播放
    //      name: this.lottieName,      // 设置lottie动画名称
    //      path: this.lottiePath       // 指定lottie动画资源路径
    //    })

  }

  build() {
    Column({space: 10}) {
      Canvas(this.context)
        .width("80%")
        .height("80%")
        .backgroundColor("#aabbcc")
        .onDisAppear(() => {
          lottie.destroy(this.lottieName) // Canvas销毁时顺带销毁lottie动画
        }).onClick(()=>{
        lottie.pause(this.lottieName) // 暂停lottie动画
        lottie.play(this.lottieName)  // 播放lottie动画
      })


      //      Text(this.playState)
      //        .fontSize(22)

      Row({space: 5}) {
        Button('开启')
          .onClick(() => {
            // 加载动画并自动播放
            lottie.loadAnimation({
              container: this.context,    // 需要绑定Canvas的CanvasRenderingContext2D
              renderer: "canvas",         // 目前只支持canvas模式
              loop: true,                 // 是否循环播放
              autoplay: true,             // 是否自动播放
              name: this.lottieName,      // 设置lottie动画名称
              path: this.lottiePath       // 指定lottie动画资源路径
            })
            this.playState = "已开启";
          })
        Button('暂停')
          .onClick(() => {
            lottie.pause(this.lottieName) // 暂停lottie动画
            this.playState = "已暂停";
          })
        Button('恢复')
          .onClick(() => {
            lottie.play(this.lottieName)  // 播放lottie动画
            this.playState = "已恢复";
          })
        Button('停止')
          .onClick(() => {
            lottie.stop(this.lottieName)  // 停止lottie动画
            this.playState = "已停止";
          })
        Button('销毁')
          .onClick(() => {
            lottie.destroy(this.lottieName)// 销毁lottie动画，回收资源
            this.playState = "已销毁";
          })
      }
    }
    .width('100%')
    .height('100%')
    .padding(10)
  }
}