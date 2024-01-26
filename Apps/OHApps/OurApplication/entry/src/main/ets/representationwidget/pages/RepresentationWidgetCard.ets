@Entry
@Component
struct RepresentationWidgetCard {
  /*
   * The title.
   */
  readonly TITLE: string = '你想好今天吃什么了吗';

  /*
   * The action type.
   */
  readonly ACTION_TYPE: string = 'router';

  /*
   * The ability name.
   */
  readonly ABILITY_NAME: string = 'EntryAbility';

  /*
   * The message.
   */
  readonly MESSAGE: string = '你想好今天吃什么了吗';

  /*
   * The with percentage setting.
   */
  readonly FULL_WIDTH_PERCENT: string = '100%';

  /*
   * The height percentage setting.
   */
  readonly FULL_HEIGHT_PERCENT: string = '100%';

  @State img_link: string = ""

  build() {
    Row() {
      Column() {
        // Text(this.MESSAGE)
        //   .fontColor(Color.Orange)
        //   .height('100%')
        //   .width('100%')
        //   .backgroundColor(Color.Grey)
      Image($r('app.media.WhatToEat'))
      }
      .width(this.FULL_WIDTH_PERCENT)
      .height(this.FULL_HEIGHT_PERCENT)


      // Text(this.MESSAGE)
      //   .fontSize(18)
      //   .fontWeight(FontWeight.Medium)
      //   .fontColor(Color.Gray)
      //   .width(this.FULL_WIDTH_PERCENT)
      //   .height('10%')
      // Image()
    }
    .height(this.FULL_HEIGHT_PERCENT)
    .onClick(() => {
      postCardAction(this, {
        "action": this.ACTION_TYPE,
        "abilityName": this.ABILITY_NAME,
        "params": {
          "message": this.MESSAGE
        }
      });
    })
  }
}