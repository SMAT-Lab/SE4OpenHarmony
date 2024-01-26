import router from '@ohos.router'
import common from '@ohos.app.ability.common';
import { TitleDesc } from '../common/TitleDesc'
@Styles  function globalFancy  () {
  .width(150)
  .height(100)
  .backgroundColor(Color.Pink)
}
@Entry
@Component
struct Index {
  private context = getContext(this) as common.UIAbilityContext;
  @State message: string = 'Hello World'

  build() {
    Scroll() {
      Column() {
        TitleDesc({ text: '属性动画', Url:  "pages/AttrAnimationPage" })
        TitleDesc({ text: '显式动画', Url:  "pages/AnimationToPage" })
        TitleDesc({ text: '路径动画', Url:  "pages/MotionPathPage" })
        TitleDesc({ text: '页面间转场1', Url:  "pages/PageTransitionPage1" })
        TitleDesc({ text: '页面间转场2', Url:  "pages/PageTransitionPage2" })
        TitleDesc({ text: '组件内转场', Url:  "pages/TransitionPage" })
        TitleDesc({ text: '共享元素转场', Url:  "pages/SharedTransitionPage" })
        TitleDesc({ text: '帧动画', Url:  "pages/ImageAnimatePage" })
        TitleDesc({ text: '下拉刷新', Url:  "pages/RefreshPage" })
        TitleDesc({ text: '自定义组件·', Url:  "pages/StylePage" })
        TitleDesc({ text: '自定义弹窗', Url:  "pages/CustomDialogPage" })


        Text("Lottie动画")
          .fontSize(36)
          .fontWeight(FontWeight.Bold).onClick(() => {
          router.pushUrl({
            url: "pages/LottiePage"
          })
        })
        Text("路由跳转参数传递")
          .fontSize(36)
          .fontWeight(FontWeight.Bold).onClick(() => {
          router.pushUrl({
            url: "pages/RouterPage",
            params: {value: 'OpenHarmony'} ,// 给新页面传递一个对象，key为value，取值以.value的形式

          })


        })
        Text("启动应用内的UIAbility")
          .fontSize(36)
          .fontWeight(FontWeight.Bold).onClick(() => {
          let context = this.context; // UIAbilityContext
          let wantInfo = {
            deviceId: '', // deviceId为空表示本设备
            bundleName: "com.example.hotest",
            abilityName: 'SecondAbility',
            // moduleName: 'module1', // moduleName非必选
            parameters: { // 自定义信息
              info: '来自EntryAbility Index页面',
            },
          }
          const RESULT_CODE: number = 1001;
          // context为调用方UIAbility的UIAbilityContext
          context.startAbilityForResult(wantInfo).then((data) => {
            if (data?.resultCode === RESULT_CODE) {
              // 解析被调用方UIAbility返回的信息
              let info = data.want?.parameters?.info;
              this.message=JSON.stringify(info)

              // ...
            }
          }).catch((err) => {
            // ...
          })

        })
        Text(this.message)
        TitleDesc({ text: '窗口', Url:  "pages/WindowPage" })
      }
      .width('100%')
    }
    .height('100%')
  }
}