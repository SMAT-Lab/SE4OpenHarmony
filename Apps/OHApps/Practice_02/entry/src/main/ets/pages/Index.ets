@Entry
@Component
struct Index {
  @State message: string = 'Hello World'
//          20230724  OpenHarmony 容器布局专练
//    本次练习，练习使用垂直容器布局，水平容器布局，堆叠容器布局
//    这三个容器的使用方法，练习容器的对齐方式
//
//    彭伟程
  build() {
    Row() {
      Column({space:10}) {    //页面基本单位，垂直容器布局，让里面的所有水平，垂直，堆叠布局都间隔10像素
        // Text(this.message)
        //   .fontSize(50)
        //   .fontWeight(FontWeight.Bold)

        //以下创建了一个垂直容器布局，在这个基础上又创建了2个垂直容器布局
        //特点是学习使用布局的对齐方式，使用的是开始对齐（左对齐）
        Column({space:10}){
          Column()
          .width(50)
            .height(50)
            .backgroundColor(Color.Blue)
          Column()
            .width(50)
            .height(50)
            .backgroundColor(Color.Red)
        }
        .width('100%')
        .alignItems(HorizontalAlign.Start)    //设置容器水平方向上的对齐方式，设置为开始对齐（左对齐）

        //以下创建了一个垂直容器布局，在这个基础上又创建了2个垂直容器布局
        //特点是学习使用布局的对齐方式，使用的是结束对齐（右对齐）
        Column({space:10}){
          Column()
            .width(50)
            .height(50)
            .backgroundColor(Color.Yellow)
          Column()
            .width(50)
            .height(50)
            .backgroundColor(Color.Green)
        }
        .width('100%')
        .alignItems(HorizontalAlign.End)    //设置容器水平方向上的对齐方式，设置为结束对齐（右对齐）


        //以下创建了一个水平容器布局，在这个基础上又创建了2个垂直容器布局
        //特点是学习使用布局的对齐方式，使用的是结束对齐（右对齐）
        Row({space:10}){
          Column()
            .width(100)
            .height(100)
            .backgroundColor(Color.Gray)
          Column()
            .width(100)
            .height(100)
            .backgroundColor(Color.Orange)
        }
        .width('100%')
        .justifyContent(FlexAlign.End)    //设置容器垂直方向上的对齐方式，设置为结束对齐（右对齐）


        //以下创建了一个水平容器布局，在这个基础上又创建了2个垂直容器布局
        //特点是学习使用布局的对齐方式，使用的是居中对齐
        Row({space:10}){
          Column()
            .width(100)
            .height(100)
            .backgroundColor(Color.Pink)
          Column()
            .width(100)
            .height(100)
            .backgroundColor(Color.Brown)
        }
        .width('100%')
        .justifyContent(FlexAlign.Center)   //设置容器垂直方向上的对齐方式，设置为居中对齐


        //以下创建了一个堆叠容器布局，在这个基础上又创建了3个堆叠容器布局
        //特点是学习使用布局的对齐方式，使用的是开始对齐（左对齐）
        Stack({alignContent:Alignment.Start}){    //**重点：堆叠布局的对齐设置方式与其他的设置方式不一样，设置容器垂直方向上的对齐方式，设置为开始对齐（左对齐）
          Stack()
            .height(300)
            .width(300)
            .backgroundColor(Color.Red)

          Stack()
            .height(200)
            .width(200)
            .backgroundColor(Color.Blue)

          Stack()
            .height(100)
            .width(100)
            .backgroundColor(Color.Yellow)
        }
      }
      .width('100%')
    }
    .height('100%')
  }
}