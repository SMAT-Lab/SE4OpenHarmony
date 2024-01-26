@Entry
@Component
struct Index {
  @State message: string = 'Hello World'
  //            20230725 OpenHarmony 排行榜ForEach，if，else练习
  //    通过一个排行榜案例，综合学习练习布局，文本等控件的使用，学习ForEach循环渲染以及if，else选择渲染
  //    达到逐步学习制作项目的目的
  //
  //    彭伟程

  //创建一个数组，数组里放上我们排行榜的数据，最后通过ForEach传入进List容器渲染
  TestData:Array<Object> =[
  {
    "id":'1',
    "name":'苹果',
    "GoodNum":'114514'

  },
    {
      "id":'2',
      "name":'葡萄',
      "GoodNum":'19198'

    },
    {
      "id":'3',
      "name":'西瓜',
      "GoodNum":'9801'

    },
    {
      "id":'4',
      "name":'香蕉',
      "GoodNum":'8431'

    },
    {
      "id":'5',
      "name":'菠萝',
      "GoodNum":'7546'

    },
    {
      "id":'6',
      "name":'榴莲',
      "GoodNum":'7431'

    }
  ]



  build() {
    //创建一个垂直容器，并且铺满全屏
    //作用：实现最大的一个容器，这个容器里包含页面的所有元素
    Column(){

      //页面头
      //创建一个水平容器，并且铺满纵向
      //作用：实现一个最大的水平的容器，这个容器里包含两个小的水平容器，实现左右分离
      Row(){

        //左边小容器里包含返回图标和排行榜文字
        //并且它的对齐方式为开始对齐（左对齐）
        Row(){
          Image($r('app.media.back'))
            .width(30)
            .height(30)
            .margin({right:10})

          Text('排行榜')
            .fontSize(25)
            .fontWeight(FontWeight.Bold)

        }
        .width('50%')

        //右边小容器里包含刷新图片
        //并且它的对齐方式为结束对齐（右对齐）
        Row(){
          Image($r('app.media.ReLoad'))
            .width(30)
            .height(30)
        }
        .width('50%')
        .justifyContent(FlexAlign.End)
      }
      .width('100%')
      .height(80)
      .padding({
        left:30,
        right:30
      })


      //列表头
      //创建一个水平容器，里面包含三个text
      //因为水平容器默认对齐方式为开始对齐（左对齐），所以要重新设置对齐方式为居中对齐
      Row(){
        Text('排名')
          .width('20%')
          .fontColor('#808080')
        Text('种类')
          .width('40%')
          .fontColor('#808080')
        Text('点赞数')
          .width('20%')
          .fontColor('#808080')
      }
      .width('100%')
      .justifyContent(FlexAlign.Center)


      //列表项
      //这里是新知识，学习了使用List容器，创建List需要创建一个List容器，然后ListItem是容器元素
      //容器元素里包含的就是数据项
      Column({space:20}){


        //新知识！！！ForEach循环渲染，this数组，把item传入List列表渲染
         ForEach(this.TestData,(item) => {
           if(item.id <= 3){    //这里是我们通过if，else去选择选择渲染我们的循环渲染里的数据，这里就是判断数组里的id，如果小于3，我们渲染，否则不渲染
             List(){
               ListItem(){
                 Row(){
                   Column(){
                     Text(item.id)    //这里的item是指向我们创建的TestData，连起来的意思就是指向我们TestData这个数组里的id，下面的同理
                       .width(25)
                       .height(25)
                       .fontSize(20)
                       .fontColor(Color.White)
                       .borderRadius(25)
                       .backgroundColor('#3d7ef9')
                       .textAlign(TextAlign.Center)
                   }
                    .alignItems(HorizontalAlign.Start)
                   .width('20%')

                   Text(item.name)
                     .fontSize(20)
                     .width('40%')
                   Text(item.GoodNum)
                     .fontSize(20)
                     .width('20%')
                 }
                 .width('100%')
                 .justifyContent(FlexAlign.Center)
                 .padding({top:20})
               }
             }
           }else {
             List(){
               ListItem(item){
                 Row(){
                   Text(item.id)
                     .fontSize(20)
                     .width('20%')
                     .padding({left:6})
                   Text(item.name)
                     .fontSize(20)
                     .width('40%')
                   Text(item.GoodNum)
                     .fontSize(20)
                     .width('20%')
                 }
                 .width('100%')
                 .justifyContent(FlexAlign.Center)
                 .padding({top:20})
               }
             }

           }

         })


      }

    }
    .height('100%')
    .width('100%')
    .backgroundColor('#f0f0f0')
  }
}