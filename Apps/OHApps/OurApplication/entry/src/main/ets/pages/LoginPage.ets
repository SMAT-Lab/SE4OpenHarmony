import router from '@ohos.router';
import prompt from '@ohos.promptAction';
import CommonConstants from '../common/constants/CommonConstants'
@Extend(TextInput) function inputStyle() {
  .placeholderColor($r('app.color.placeholder_color'))
  .height($r('app.float.login_input_height'))
  .fontSize($r('app.float.big_text_size'))
  .backgroundColor($r('app.color.background'))
  .width(CommonConstants.FULL_PARENT)
  .padding({ left: CommonConstants.INPUT_PADDING_LEFT})
  .margin({ top: $r('app.float.input_margin_top')})
}

@Extend(Line) function lineStyle () {
  .width(CommonConstants.FULL_PARENT)
  .height($r('app.float.small_text_size'))
  .backgroundColor($r('app.color.line_color'))
}

@Extend(Text) function blueTextStyle () {
  .fontColor($r('app.color.login_blue_text_color'))
  .fontSize($r('app.float.small_text_size'))
  .fontWeight(FontWeight.Medium)
}

@Entry
@Component
struct LoginPage {
  @State account: string = ""
  @State password: string = ""
  @State isShowProgress: boolean = false
  private timeOutId = null

  @Builder imageButton(src: Resource) {
    Button({ type: ButtonType.Circle, stateEffect: true}) {
      Image(src)
    }
    .height($r('app.float.other_login_image_size'))
    .width($r('app.float.other_login_image_size'))
    .backgroundColor($r('app.color.background'))
  }

  login() {
    if (this.account === '' || this.password === '') {
      prompt.showToast({
        message: $r('app.string.input_empty_tips')
      })
    } else {
      this.isShowProgress = true;
      if (this.timeOutId === null) {
        this.timeOutId = setTimeout(() => {
          this.isShowProgress = false;
          this.timeOutId = null;
          router.replaceUrl({ url: 'pages/FirstPage'});
        }, CommonConstants.LOGIN_DELAY_TIME);
      }
    }
  }

  aboutToAppear() {
    clearTimeout(this.timeOutId);
    this.timeOutId = null;
  }

  build() {
    Column() {
      Image($r('app.media.weini'))
        .width($r('app.float.logo_image_size'))
        .height($r('app.float.logo_image_size'))
        .margin({ top: $r('app.float.logo_margin_top'), bottom: $r('app.float.logo_margin_bottom')})

      Text($r('app.string.login_page'))
        .fontSize($r('app.float.page_title_text_size'))
        .fontWeight(FontWeight.Medium)
        .fontColor($r('app.color.title_text_color'))

      Text($r('app.string.login_more'))
        .fontSize($r('app.float.normal_text_size'))
        .fontColor($r('app.color.login_more_text_color'))
        .margin({ bottom: $r('app.float.login_more_margin_bottom'), top: $r('app.float.login_more_margin_top') })


      TextInput({ placeholder: $r('app.string.account')})
        .maxLength(CommonConstants.INPUT_ACCOUNT_LENGTH)
        .type(InputType.Number)
        .inputStyle()
        .onChange((value: string) => {
          this.account = value;
        })

      Line().lineStyle()

      TextInput({ placeholder: $r('app.string.password')})
        .maxLength(CommonConstants.INPUT_PASSWORD_LENGTH)
        .type(InputType.Password)
        .inputStyle()
        .onChange((value: string) => {
          this.password = value;
        })

      Line().lineStyle()

      Button($r('app.string.login'))
        .type(ButtonType.Capsule)
        .width(CommonConstants.BUTTON_WIDTH)
        .height($r('app.float.login_button_height'))
        .fontSize($r('app.float.normal_text_size'))
        .fontWeight(FontWeight.Medium)
        .backgroundColor($r('app.color.login_button_color'))
        .margin({ top: $r('app.float.login_button_margin_top'), bottom: $r('app.float.login_button_margin_bottom') })
        .onClick(() => {
          this.login();
        })

      if (this.isShowProgress) {
        LoadingProgress()
          .color($r('app.color.loading_color'))
          .width($r('app.float.login_progress_size'))
          .height($r('app.float.login_progress_size'))
          .margin({ top: $r('app.float.login_progress_margin_top') })
      }

      Blank()

    }
    .height('100%')
  }
}