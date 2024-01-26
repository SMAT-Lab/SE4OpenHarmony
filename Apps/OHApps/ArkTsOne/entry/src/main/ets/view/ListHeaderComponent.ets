/**
 * @Author 大连海事大学 袁佳林 572598394@qq.com
 * @Description
* @Date 2023/8/7 14:23
 */
import { FontSize, ListHeaderStyle } from '../common/constants/Constants';

@Component
export struct ListHeaderComponent {
 paddingValue: Padding | Length;
 widthValue: Length;

 build() {
  Row() {
   Text($r('app.string.page_number'))
    .fontSize(FontSize.SMALL)
    .width(ListHeaderStyle.LAYOUT_WEIGHT_LEFT)
    .fontWeight(ListHeaderStyle.FONT_WEIGHT)
    .fontColor($r('app.color.font_description'))
   Text($r('app.string.page_type'))
    .fontSize(FontSize.SMALL)
    .width(ListHeaderStyle.LAYOUT_WEIGHT_CENTER)
    .fontWeight(ListHeaderStyle.FONT_WEIGHT)
    .fontColor($r('app.color.font_description'))
   Text($r('app.string.page_vote'))
    .fontSize(FontSize.SMALL)
    .width(ListHeaderStyle.LAYOUT_WEIGHT_RIGHT)
    .fontWeight(ListHeaderStyle.FONT_WEIGHT)
    .fontColor($r('app.color.font_description'))
  }
  .width(this.widthValue)
  .padding(this.paddingValue)
 }
}