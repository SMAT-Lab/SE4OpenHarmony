@Component
export struct MyAlphabetIndexer {
  private value: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

  build() {
    AlphabetIndexer({ arrayValue: this.value, selected: 0 })
      .selectedColor(0xffffff) // 选中颜色
      .popupColor(0xFFFAF0) // 弹出框颜色
      .selectedBackgroundColor(0xCCCCCC) // 选中背景颜色
      .popupBackground(0xD2B48C) // 弹出框背景颜色
      .usingPopup(true) // 是否显示弹出框
      .selectedFont({ size: 16, weight: FontWeight.Bolder }) // 选中的样式
      .popupFont({ size: 30, weight: FontWeight.Bolder }) // 弹出框的演示
      .itemSize(28) // 每一项的大小正方形
      .alignStyle(IndexerAlign.Left) // 左对齐
      .onSelect((index: number) => {
        console.info(this.value[index] + '被选中了') // 选中的事件
      })
      .margin({ left: 50 })
  }
}