import promptAction from '@ohos.promptAction';
import router from '@ohos.router';
import http from '@ohos.net.http';

import data_preferences from '@ohos.data.preferences';
import featureAbility from '@ohos.ability.featureAbility';

@Entry
@Component
export struct Picture {
  @State message: string = '诱人美景'
  @State img_link: string = ''
  @State img_tag: string = ''

  private img_list: Array<any>

  aboutToAppear() {
    http.createHttp().request(
      'https://qqlykm.cn/api/fengjing/index?key=84MhdyhPdOY66ltcJhyukusPAI&type=json',
      (err, data) => {
        if(!err) {
          let target: any = JSON.parse(data.result.toString())
          this.img_link = target.data.cover
          this.img_tag  = target.data.tag
        }
      }
    )
    //   let context = featureAbility.getContext();
    //   let preferences = null;
    //   let promise = data_preferences.getPreferences(context, 'mystore');
    //   promise.then((object) => {
    //     preferences = object;
    //     preferences.get('cityList', [{'url':'','tag':''}]).then((value) => { this.img_list = this.img_list.concat(value); });
    //     console.info("Succeeded in getting preferences.");
    //   }).catch((err) => {
    //     console.log("Failed to get preferences. code = " + err.code + ", message = " + err.message);
    //   })
  }

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(40)
          .fontColor(Color.Brown)
          .textAlign(TextAlign.Center)
        Image(this.img_link)
          .width("90%")
          .height("75%")
        Text(this.img_tag)
          .fontSize(25)
          .fontColor(Color.Black)
          .textAlign(TextAlign.Center)
        Row() {
  // Button('保存图像')
  //   .onClick(() => {

  //   let context = featureAbility.getContext();
  //   let preferences = null;
  //   let promise = data_preferences.getPreferences(context, 'mystore');
  //   promise.then((object) => {
  //     preferences = object;
  //     this.img
          Button('返回主页').width(100).backgroundColor(Color.Gray).margin({
            bottom: 40
          })
            .onClick(() => {
              router.pushUrl({ url: 'pages/FirstPage' ,
                params:{img:this.img_list}})
            })
          Button('重新生成').width(100).backgroundColor(Color.Gray).margin({
            bottom: 40
          })
            .fontColor(Color.Orange)
            .onClick(() =>
            http.createHttp().request(
              'https://qqlykm.cn/api/fengjing/index?key=84MhdyhPdOY66ltcJhyukusPAI&type=json',
              (err, data) => {
                if (!err) {
                  let target: any = JSON.parse(data.result.toString())
                  this.img_link = target.data.cover
                  this.img_tag = target.data.tag
                }
              }
            )
            )
        }
      }
      .width('100%')
    }
    .height('100%')
  }
}