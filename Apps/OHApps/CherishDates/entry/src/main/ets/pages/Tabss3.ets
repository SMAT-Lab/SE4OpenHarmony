@Preview
@Component

export struct Tabss3{
  @State text:string = ""
  @State img:Resource=$r("app.media.password")
  build(){

    Row(){
      Image(this.img).width(20)
      Text(this.text).margin(15)
      Blank()
      Image($r("app.media.back1")).width(20)
    }.width("80%")
  }
}
