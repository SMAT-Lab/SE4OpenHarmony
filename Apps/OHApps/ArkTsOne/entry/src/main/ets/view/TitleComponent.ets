/**
 * @Author 大连海事大学 袁佳林 572598394@qq.com
 * @Description
* @Date 2023/8/7 14:24
 */
import AppContext from '@ohos.app.ability.common';
import { FontSize, TitleBarStyle, WEIGHT } from '../common/constants/Constants';

@Component
export struct TitleComponent {
 @Link isRefreshData: boolean; // User click the button to decide whether to switch data.
 @State title: Resource = $r('app.string.title_default');

 build() {
  Row() {
   Row() {
    Image($r('app.media.ic_public_back'))
     .height(TitleBarStyle.IMAGE_BACK_SIZE)
     .width(TitleBarStyle.IMAGE_BACK_SIZE)
     .margin({ right: TitleBarStyle.IMAGE_BACK_MARGIN_RIGHT })
     .onClick(() => {
      let handler = getContext(this) as AppContext.UIAbilityContext;
      handler.terminateSelf();
     })
    Text(this.title)
     .fontSize(FontSize.LARGE)
   }
   .width(TitleBarStyle.WEIGHT)
   .height(WEIGHT)
   .justifyContent(FlexAlign.Start)

   Row() {
    Image($r('app.media.loading'))
     .height(TitleBarStyle.IMAGE_LOADING_SIZE)
     .width(TitleBarStyle.IMAGE_LOADING_SIZE)
     .onClick(() => {
      this.isRefreshData = !this.isRefreshData;
     })
   }
   .width(TitleBarStyle.WEIGHT)
   .height(WEIGHT)
   .justifyContent(FlexAlign.End)
  }
  .width(WEIGHT)
  .padding({ left: TitleBarStyle.BAR_MARGIN_HORIZONTAL,
   right: TitleBarStyle.BAR_MARGIN_HORIZONTAL })
  .margin({ top: TitleBarStyle.BAR_MARGIN_TOP })
  .height(TitleBarStyle.BAR_HEIGHT)
  .justifyContent(FlexAlign.SpaceAround)
 }
}