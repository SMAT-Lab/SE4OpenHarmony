@Entry
@Component
struct WidgetNewCard {
  /*
   * The title.
   */
  readonly TITLE: string = 'harmonyOs';
  readonly CONTEXT: string = '技术构建万物智联';

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
  readonly MESSAGE: string = 'add detail';

  /*
   * The with percentage setting.
   */
  readonly FULL_WIDTH_PERCENT: string = '100%';

  /*
   * The height percentage setting.
   */
  readonly FULL_HEIGHT_PERCENT: string = '100%';

  build() {
    Row() {
      Column() {
        Text(this.TITLE)
          .fontSize(14)
          .fontColor(0xFEFEFE)
          .fontWeight(600)
        Text(this.CONTEXT)
          .fontSize(14)
          .fontColor(0xFEFEFE)
          .fontWeight(600)
      }
      .width(this.FULL_WIDTH_PERCENT)
    }
    .backgroundImage($r("app.media.new_bg"))
    .backgroundImageSize(ImageSize.Cover)
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