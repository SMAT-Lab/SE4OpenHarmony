@Entry
@Component
struct Index {
  @State message: string = 'Hello World'
//*************************************************************
//                  20230723 OpenHarmony开发练习
//    实现练习垂直方向布局以及横向布局，练习text,button,img,和resourcs
//    的值使用方法。
//
//    彭伟程
//*************************************************************
  build() {
    Row() {
      Column({space:10}) {    //space:10 代表在这个大的column当中，每个小的column（纵向布局）间隔10像素
        Column()
          .width('100%')    //width代表column的宽度，100%代表占据屏幕的100%的宽度
          .height(30)       //height代表Colum的高度，30就代表它的高度有30像素
          .backgroundColor($r('app.color.index_column_bgcolor'))    //backgroundcolor代表背景颜色，传入一个resource文件下的color.json文件下的值进来

        Column()
          .height(30)
          .width('100%')
          .backgroundColor(Color.Red)    //在设置颜色方面，可以直接使用Color.xxx颜色的方法直接设置颜色


        //以下实现的功能是在一个垂直布局上放上一个Row水平布局
        //然后在水平布局里放入两个小的垂直布局，这样就可以实现双垂直布局在水平空间
        Column(){
          Row({space:30}){    //创建一个水平布局，在这个布局中两个垂直布局的间隔（space）为30像素
            Column()
              .height(30)
              .width(100)
              .backgroundColor(Color.Blue)

            Column()
              .height(30)
              .width(100)
              .backgroundColor(Color.Red)
          }
            .width('100%')
            .height(50)
            .backgroundColor('#3d7ef9')
            .justifyContent(FlexAlign.Center)   //justifyContent是实现两个水平布局的对齐方式为居中对齐

        }
        .height(50)

        //以下功能是实现文字，按钮，图片的展示和调用
        //新建一个Column垂直布局
        Column(){
          Text('你好，openHarmony')
            .fontSize(30)           //fontSize可以实现文字大小的改变
            .fontColor($r('app.color.index_column_bgcolor'))    //fontColor实现对文字颜色的编辑,实现的方式有两个，直接使用color方法，使用$r传值

          Button('你好，button')
            .type(ButtonType.Normal)    //type实现对按钮形状的修改
            .fontColor(Color.Red)       //fontColor实现修改按钮里文字的颜色
            .backgroundColor($r('app.color.index_column_bgcolor'))    //backgroundColor依旧是实现对于背景颜色的改变

          Image($r('app.media.icon'))
            .width(100)
            .height(100)

          Image($r('app.media.icon'))
            .width(100)
            .height(100)
        }

      }
      .width('100%')
    }
  }
}