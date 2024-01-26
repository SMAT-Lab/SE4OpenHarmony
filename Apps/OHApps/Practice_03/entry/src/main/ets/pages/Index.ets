@Entry
@Component
struct Index {
  @State message: string = 'Hello World'
  //            20230725 OpenHarmony 排行榜练习
  //    通过一个排行榜案例，综合学习练习布局，文本等控件的使用，
  //    达到逐步学习制作项目的目的
  //
  //    彭伟程

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

        List(){
          ListItem(){
            Row(){
              Text('1')
                .fontSize(20)
                .width('20%')
              Text('苹果')
                .fontSize(20)
                .width('40%')
              Text('114514')
                .fontSize(20)
                .width('20%')
            }
            .width('100%')
            .justifyContent(FlexAlign.Center)
            .padding({top:20})
          }

          ListItem(){
            Row(){
              Text('2')
                .fontSize(20)
                .width('20%')
              Text('葡萄')
                .fontSize(20)
                .width('40%')
              Text('19198')
                .fontSize(20)
                .width('20%')
            }
            .width('100%')
            .justifyContent(FlexAlign.Center)
            .padding({top:20})
          }

          ListItem(){
            Row(){
              Text('3')
                .fontSize(20)
                .width('20%')
              Text('西瓜')
                .fontSize(20)
                .width('40%')
              Text('9801')
                .fontSize(20)
                .width('20%')
            }
            .width('100%')
            .justifyContent(FlexAlign.Center)
            .padding({top:20})
          }

          ListItem(){
            Row(){
              Text('4')
                .fontSize(20)
                .width('20%')
              Text('香蕉')
                .fontSize(20)
                .width('40%')
              Text('8431')
                .fontSize(20)
                .width('20%')
            }
            .width('100%')
            .justifyContent(FlexAlign.Center)
            .padding({top:20})
          }

          ListItem(){
            Row(){
              Text('5')
                .fontSize(20)
                .width('20%')
              Text('菠萝')
                .fontSize(20)
                .width('40%')
              Text('7546')
                .fontSize(20)
                .width('20%')
            }
            .width('100%')
            .justifyContent(FlexAlign.Center)
            .padding({top:20})
          }

          ListItem(){
            Row(){
              Text('6')
                .fontSize(20)
                .width('20%')
              Text('榴莲')
                .fontSize(20)
                .width('40%')
              Text('7431')
                .fontSize(20)
                .width('20%')
            }
            .width('100%')
            .justifyContent(FlexAlign.Center)
            .padding({top:20})
          }

        }
      }

    }
    .height('100%')
    .width('100%')
    .backgroundColor('#f0f0f0')
  }
}