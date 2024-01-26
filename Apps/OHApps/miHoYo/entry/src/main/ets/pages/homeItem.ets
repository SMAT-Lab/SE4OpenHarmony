@Entry
@Preview
@Component
export  struct homeItem {
  @State text :string =""
  @State img:Resource=$r("app.media.password")
  @State bgColor:Color=Color.Gray
  build() {

    Row() {

      Image(this.img).width(50).fillColor(this.bgColor)
      Text(this.text)
      Blank()
      Image($r("app.media.back")).width(50)
    }.width("100%")

  }
}