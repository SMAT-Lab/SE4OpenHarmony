@Entry
@Component
struct ImagePage {
  @State message: string = 'Hello Beijing'

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
        //Image($r("app.media.icon")).width(200).height(200).objectFit(ImageFit.Contain)
        Image($r("app.media.Tiananmen")).width(300).margin(15)

        Row(){
          Image("https://ts1.cn.mm.bing.net/th/id/R-C.df1eee3a3e9369c9ed73ed9eca79dfc6?rik=5D3AMyCZJW69xw&riu=http%3a%2f%2fp0.itc.cn%2fimages01%2f20201118%2fb88f9d5737af49958174d32aa6ca6d4b.jpeg&ehk=bz5Gen2vuIv6g9qCKlYGTpnx%2bDJZTpmKQTeRN4J6mVU%3d&risl=&pid=ImgRaw&r=0").width(80)
          TextInput({
            placeholder:"请输入用户名"
          })
        }

          .width('100%')
      }
    }
    .height('100%')
  }
}