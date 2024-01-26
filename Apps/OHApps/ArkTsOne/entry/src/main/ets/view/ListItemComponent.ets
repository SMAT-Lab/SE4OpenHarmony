/**
 * @Author 大连海事大学 袁佳林 572598394@qq.com
 * @Description
* @Date 2023/8/7 14:23
 */
import { FontSize, FontWeight, ItemStyle, WEIGHT } from '../common/constants/Constants';

@Component
export struct ListItemComponent {
 index: number;
 private name: Resource;
 @Prop vote: string;
 @Prop isSwitchDataSource: boolean;
 // The state is related to the font color of ListItemComponent.
 @State isChange: boolean = false;

 build() {
  Row() {
   Column() {
    if (this.isRenderCircleText()) {
     this.CircleText(this.index);
    } else {
     Text(this.index.toString())
      .lineHeight(ItemStyle.TEXT_LAYOUT_SIZE)
      .textAlign(TextAlign.Center)
      .width(ItemStyle.TEXT_LAYOUT_SIZE)
      .fontWeight(FontWeight.BOLD)
      .fontSize(FontSize.SMALL)
    }
   }
   .width(ItemStyle.LAYOUT_WEIGHT_LEFT)
   .alignItems(HorizontalAlign.Start)

   Text(this.name)
    .width(ItemStyle.LAYOUT_WEIGHT_CENTER)
    .fontWeight(FontWeight.BOLDER)
    .fontSize(FontSize.MIDDLE)
    .fontColor(this.isChange ? ItemStyle.COLOR_BLUE : ItemStyle.COLOR_BLACK)
   Text(this.vote)
    .width(ItemStyle.LAYOUT_WEIGHT_RIGHT)
    .fontWeight(FontWeight.BOLD)
    .fontSize(FontSize.SMALL)
    .fontColor(this.isChange ? ItemStyle.COLOR_BLUE : ItemStyle.COLOR_BLACK)
  }
  .height(ItemStyle.BAR_HEIGHT)
  .width(WEIGHT)
  .onClick(() => {
   this.isSwitchDataSource = !this.isSwitchDataSource;
   this.isChange = !this.isChange;
  })
 }

 @Builder CircleText(index: number) {
  Row() {
   Text(this.index.toString())
    .fontWeight(FontWeight.BOLD)
    .fontSize(FontSize.SMALL)
    .fontColor(Color.White);
  }
  .justifyContent(FlexAlign.Center)
  .borderRadius(ItemStyle.CIRCLE_TEXT_BORDER_RADIUS)
  .size({ width: ItemStyle.CIRCLE_TEXT_SIZE,
   height: ItemStyle.CIRCLE_TEXT_SIZE })
  .backgroundColor($r('app.color.circle_text_background'))
 }

 isRenderCircleText(): boolean {
  // Just render the element before the fourth in the list.
  return this.index === 1 || this.index === 2 || this.index === 3;
 }
}