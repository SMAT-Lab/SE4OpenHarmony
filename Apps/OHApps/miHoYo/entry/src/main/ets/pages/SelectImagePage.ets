import picker from '@ohos.file.picker';

@Entry
@Component
struct SelectImagePage {
  @State imgDatas: string[] = [];
  scroller: Scroller = new Scroller()
  // 获取照片url集
  async getAllImg() {
    //
    let photoPicker = new picker.PhotoViewPicker();
    let result = new Array<string>();
    try {
      let PhotoSelectOptions = new picker.PhotoSelectOptions();
      PhotoSelectOptions.MIMEType = picker.PhotoViewMIMETypes.IMAGE_TYPE;
      PhotoSelectOptions.maxSelectNumber = 5;
      let photoPicker = new picker.PhotoViewPicker();
      photoPicker.select(PhotoSelectOptions).then((PhotoSelectResult) => {
        this.imgDatas = PhotoSelectResult.photoUris;
        console.info('PhotoViewPicker.select successfully, PhotoSelectResult uri: ' + JSON.stringify(PhotoSelectResult));
      }).catch((err) => {
        console.error(`PhotoViewPicker.select failed with. Code: ${err.code}, message: ${err.message}`);
      });
    } catch (err) {
      console.error(`PhotoViewPicker failed with. Code: ${err.code}, message: ${err.message}`);
    }
  }


  // 使用imgDatas的url加载图片。
  build() {
    Column() {
      Text("选择图片").fontSize(36).fontColor(Color.Orange).onClick(() => {
        //获取图库的所有图片url，存在imgDatas中
        this.getAllImg()
      })

      Scroll(this.scroller) {
        Column() {
          ForEach(this.imgDatas, item => {

            Image(item)
              .width(200).borderRadius(20).margin(5)

          }, item => JSON.stringify(item))
        }.width('100%')
      }
      .scrollable(ScrollDirection.Vertical) // 滚动方向纵向
      .scrollBar(BarState.On) // 滚动条常驻显示
      .scrollBarColor(Color.Gray) // 滚动条颜色
      .scrollBarWidth(10) // 滚动条宽度
      .edgeEffect(EdgeEffect.None)
      .height("80%")
      .margin({
        bottom: 20
      })

    }.width('100%').height('100%')
  }
}
