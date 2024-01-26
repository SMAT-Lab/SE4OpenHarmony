import router from '@ohos.router'
@Entry
@Component
struct Wisecare {
  @State message: string = 'Hello World'

  build() {
    Column() {
      Flex({ justifyContent: FlexAlign.Start, alignContent: FlexAlign.Start }) {
        Tabs({ barPosition: BarPosition.End }) {
          TabContent() {
            Flex({ wrap: FlexWrap.Wrap }) {
              Text("主页\n")
                .width("100%")
                .height("5%")
                .textAlign(TextAlign.Center)
                .fontSize("25fp")
              Search({value: "你想搜索些什么"})
                .width("100%")
                .height("40vp")
              Flex() {
                Image($r('app.media.img_17'))
                  .width("100%")
                  .height("100%")
              }              
              .width("100%")
              .height("20%")
              Flex({ wrap: FlexWrap.Wrap }) {
                Flex({ wrap: FlexWrap.Wrap }) {
                  Image($r('app.media.shenghuofuwu'))
                    .width("100%")
                    .height("60%")
                    .objectFit(ImageFit.Contain)
                  Text("生活服务\n")
                    .width("100%")
                    .height("40%")
                    .textAlign(TextAlign.Center)
                    .fontSize("15fp")
                }                
                .width("25%")
                .height("50%")
                Flex({ wrap: FlexWrap.Wrap }) {
                  Image($r('app.media.huli'))
                    .width("100%")
                    .height("60%")
                    .objectFit(ImageFit.Contain)
                  Text("护理用品")
                    .width("100%")
                    .height("40%")
                    .textAlign(TextAlign.Center)
                    .fontSize("15fp")
                }                
                .width("25%")
                .height("50%")
                Flex({ wrap: FlexWrap.Wrap }) {
                  Image($r('app.media.jiankong'))
                    .width("100%")
                    .height("60%")
                    .objectFit(ImageFit.Contain)
                  Text("视频监管")
                    .width("100%")
                    .height("40%")
                    .textAlign(TextAlign.Center)
                    .fontSize("15fp")
                }                
                .width("25%")
                .height("50%")
                Flex({ wrap: FlexWrap.Wrap }) {
                  Image($r('app.media.yuyue'))
                    .width("100%")
                    .height("60%")
                    .objectFit(ImageFit.Contain)
                  Text("预约挂号\n")
                    .width("100%")
                    .height("40%")
                    .textAlign(TextAlign.Center)
                    .fontSize("15fp")
                }                
                .width("25%")
                .height("50%")
                Flex({ wrap: FlexWrap.Wrap }) {
                  Image($r('app.media.teeth1'))
                    .width("100%")
                    .height("60%")
                    .objectFit(ImageFit.Contain)
                  Text("口腔齿科")
                    .width("100%")
                    .height("40%")
                    .textAlign(TextAlign.Center)
                    .fontSize("15fp")
                }                
                .width("25%")
                .height("50%")
                Flex({ wrap: FlexWrap.Wrap }) {
                  Image($r('app.media.banjia'))
                    .width("100%")
                    .height("60%")
                    .objectFit(ImageFit.Contain)
                  Text("搬家\n")
                    .width("100%")
                    .height("40%")
                    .textAlign(TextAlign.Center)
                    .fontSize("15fp")
                }                
                .width("25%")
                .height("50%")
                Flex({ wrap: FlexWrap.Wrap }) {
                  Image($r('app.media.xiyiji'))
                    .width("100%")
                    .height("60%")
                    .objectFit(ImageFit.Contain)
                  Text("洗衣")
                    .width("100%")
                    .height("40%")
                    .textAlign(TextAlign.Center)
                    .fontSize("15fp")
                }                
                .width("25%")
                .height("50%")
                Flex({ wrap: FlexWrap.Wrap }) {
                  Image($r('app.media.gongyi'))
                    .width("100%")
                    .height("60%")
                    .objectFit(ImageFit.Contain)
                  Text("一键求助")
                    .width("100%")
                    .height("40%")
                    .textAlign(TextAlign.Center)
                    .fontSize("15fp")
                }                
                .width("25%")
                .height("50%")
              }              
              .width("100%")
              .height("20%")
              Text()
                .width("100%")
                .height("15vp")
              Flex() {
                Image($r('app.media.120'))
                  .width("50%")
                  .height("100%")
                Image($r('app.media.shangdian'))
                  .width("50%")
                  .height("100%")
              }              
              .width("100%")
              .height("20%")
              Text()
                .width("100%")
                .height("15vp")
              Flex({ wrap: FlexWrap.Wrap }) {
                Flex({ wrap: FlexWrap.NoWrap }) {
                  Image($r('app.media.remen'))
                    .width("10%")
                    .height("20%")
                  Text("   热门推荐")
                    .width("100%")
                    .height("20%")
                    .fontSize("15fp")
                }
                Image($r('app.media.huanyaohuli'))
                  .width("25%")
                  .height("70%")
                Image($r('app.media.jingzhuihuili'))
                  .width("25%")
                  .height("70%")
                Image($r('app.media.shangmenfuwu'))
                  .width("25%")
                  .height("70%")
                Image($r('app.media.laorenpeihu'))
                  .width("25%")
                  .height("70%")
              }              
              .width("100%")
              .height("25%")
            }            
            .width("100%")
            .height("100%")
          }          
          .tabBar({ icon: $r('app.media.shouye'), text: "主页" })
          TabContent() {
            Flex({ wrap: FlexWrap.Wrap }) {
              Text("分类")
                .width("100%")
                .height("5%")
                .textAlign(TextAlign.Center)
                .fontSize("25fp")
              Tabs() {
                TabContent() {
                  List() {
                    ListItem() {
                      Flex({ wrap: FlexWrap.Wrap }) {
                        Image($r('app.media.img_28'))
                          .width("40%")
                          .height("100%")
                          .objectFit(ImageFit.Cover)
                        Text("家政保洁")
                          .width("40%")
                          .height("60%")
                          .fontSize("15fp")
                      }                      
                      .width("100%")
                      .height("100%")
                    }                    
                    .width("100%")
                    .height("20%")
                    ListItem() {
                      Flex({ wrap: FlexWrap.Wrap }) {
                        Image($r('app.media.img_27'))
                          .width("40%")
                          .height("100%")
                          .objectFit(ImageFit.Cover)
                        Text("居家保洁")
                          .width("200vp")
                          .height("60vp")
                          .fontSize("15fp")
                      }                      
                      .width("100%")
                      .height("100%")
                    }                    
                    .width("100%")
                    .height("20%")
                    ListItem()
                      .width("100%")
                      .height("100%")
                    ListItem()
                      .width("100%")
                      .height("20vp")
                  }                  
                  .width("100%")
                  .height("92%")
                }                
                .constraintSize({ minWidth: "0%" })
                .tabBar({ text: "老年服务" })
                TabContent() {
                  List() {
                    ListItem() {
                      Flex({ wrap: FlexWrap.Wrap }) {
                        Image($r('app.media.img_29'))
                          .width("30%")
                          .height("100%")
                        Text("姓名：\n职能：医生")
                          .width("200vp")
                          .height("60vp")
                          .fontSize("15fp")
                      }                      
                      .width("100%")
                      .height("100%")
                    }                    
                    .width("100%")
                    .height("20%")
                    ListItem() {
                      Flex({ wrap: FlexWrap.Wrap }) {
                        Image($r('app.media.img_30'))
                          .width("30%")
                          .height("100%")
                          .objectFit(ImageFit.Contain)
                        Text("姓名：\n职能：护士")
                          .width("200vp")
                          .height("60vp")
                          .fontSize("15fp")
                      }                      
                      .width("100%")
                      .height("100%")
                    }                    
                    .width("100%")
                    .height("20%")
                    ListItem()
                      .width("100%")
                      .height("20%")
                    ListItem()
                      .width("100%")
                      .height("20vp")
                    ListItem()
                      .width("100%")
                      .height("20%")
                    ListItem()
                      .width("100%")
                      .height("20%")
                  }                  
                  .width("100%")
                  .height("90%")
                }                
                .tabBar({ text: "家庭医生" })
                TabContent()
                  .tabBar({ text: "社区养老" })
                TabContent()
                  .tabBar({ text: "机构养老" })
                TabContent() {
                  Flex()
                    .width("100%")
                    .height("92%")
                }                
                .tabBar({ text: "邮政物流" })
                TabContent()
                  .tabBar({ text: "老年餐厅" })
              }              
              .width("100%")
              .height("95%")
              .vertical(false)
              .barMode(BarMode.Scrollable)
              Flex()
            }            
            .width("100%")
            .height("100%")
          }          
          .tabBar({ icon: $r('app.media.fenlei'), text: "分类" })
          TabContent() {
            Flex({ wrap: FlexWrap.Wrap }) {
              Text("发现")
                .width("100%")
                .height("5%")
                .textAlign(TextAlign.Center)
                .fontSize("25fp")
              Flex({ direction: FlexDirection.Row, wrap: FlexWrap.Wrap }) {
                Image($r('app.media.faxiantu'))
                  .width("100%")
                  .height("100%")
                  .alignSelf(ItemAlign.Auto)
                  .objectFit(ImageFit.Cover)
                  .renderMode(ImageRenderMode.Original)
                Button("添加长者")
                  .width("50%")
                  .height("25%")
                  .offset({ x: "85vp", y: "-130vp" })
                  .backgroundColor("#969e57")
                  .fontSize("30fp")
                  .fontStyle(FontStyle.Normal)
                  .onClick(()=>{
                    router.pushUrl({
                      url:"pages/OlderPage"
                    })
                  })
              }              
              .width("100%")
              .height("25%")
              Flex() {
                Navigation() {
                  Image($r('app.media.ditu'))
                    .width("100%")
                    .height("100%")
                }                
                .width("100%")
                .height("90%")
                .title("           附近的养老院")
                .subTitle("                           更多")
                .titleMode(NavigationTitleMode.Mini)
                .hideToolBar(false)
                .hideTitleBar(false)
              }              
              .width("100%")
              .height("70%")
            }            
            .width("100%")
            .height("100%")
            .margin({ top: "0vp", bottom: "0vp", left: "0vp", right: "0vp" })
          }          
          .tabBar({ icon: $r('app.media.faxian'), text: "发现" })
          TabContent() {
            Flex({ wrap: FlexWrap.Wrap }) {
              Text("个人中心")
                .width("100%")
                .height("5%")
                .textAlign(TextAlign.Center)
                .fontSize("25fp")
              Flex({ wrap: FlexWrap.Wrap }) {
                Image($r('app.media.touxiang'))
                  .width("25%")
                  .height("100%")
                  .objectFit(ImageFit.Contain)
                Text("衡骏杰")
                  .width("15%")
                  .height("30%")
                  .fontSize("15fp")
                Image($r('app.media.erweima1'))
                  .width("60%")
                  .height("40%")
                  .objectFit(ImageFit.Contain)
                Image($r('app.media.shezhi'))
                  .width("60%")
                  .height("40%")
                  .offset({ x: "148.7vp", y: "-31.33vp" })
                  .objectFit(ImageFit.Contain)
                  .renderMode(ImageRenderMode.Template)
              }              
              .width("100%")
              .height("10%")
              Text()
                .width("100%")
                .height("5%")
              Flex() {
                Flex({ wrap: FlexWrap.Wrap }) {
                  Image($r('app.media.jigou'))
                    .width("100%")
                    .height("60%")
                    .objectFit(ImageFit.Contain)
                  Text("我的机构")
                    .width("100%")
                    .height("40%")
                    .textAlign(TextAlign.Center)
                    .fontSize("15fp")
                }                
                .width("25%")
                .height("100%")
                Flex({ wrap: FlexWrap.Wrap }) {
                  Image($r('app.media.xiaoxi'))
                    .width("100%")
                    .height("60%")
                    .objectFit(ImageFit.Contain)
                  Text("我的消息")
                    .width("100%")
                    .height("40%")
                    .textAlign(TextAlign.Center)
                    .fontSize("15fp")
                }                
                .width("25%")
                .height("100%")
                Flex({ wrap: FlexWrap.Wrap }) {
                  Image($r('app.media.shebei'))
                    .width("100%")
                    .height("60%")
                    .objectFit(ImageFit.Contain)
                  Text("我的设施")
                    .width("100%")
                    .height("40%")
                    .textAlign(TextAlign.Center)
                    .fontSize("15fp")
                }                
                .width("25%")
                .height("100%")
                Flex({ wrap: FlexWrap.Wrap }) {
                  Image($r('app.media.huodong'))
                    .width("100%")
                    .height("60%")
                    .objectFit(ImageFit.Contain)
                  Text("我的活动")
                    .width("100%")
                    .height("40%")
                    .textAlign(TextAlign.Center)
                    .fontSize("15fp")
                }                
                .width("25%")
                .height("100%")
              }              
              .width("100%")
              .height("15%")
              Text()
                .width("100%")
                .height("3%")
              Flex() {
                Text("我的健康")
                  .width("60%")
                  .height("60%")
                  .fontSize("25fp")
                  .fontStyle(FontStyle.Italic)
                Search({value: "查看我的健康"})
                  .width("100%")
                  .height("40%")
                  .onClick(() => {
                    router.pushUrl({ url: 'pages/ExercisePlan'})
                  })

              }              
              .width("100%")
              .height("10%")
              Flex({ wrap: FlexWrap.Wrap }) {
                Text("我的亲友")
                  .width("30%")
                  .height("30%")
                  .fontSize("25fp")
                Flex({ wrap: FlexWrap.Wrap }) {
                  Image($r('app.media.jia1'))
                    .width("15%")
                    .height("40%")
                    .objectFit(ImageFit.Contain)
                    .renderMode(ImageRenderMode.Template)
                  Text("   添加")
                    .width("200vp")
                    .height("60vp")
                    .textAlign(TextAlign.Start)
                    .fontSize("12fp")
                  Button("管理亲友")
                    .width("140vp")
                    .height("40vp")
                    .borderColor("#931f1f")
                    .backgroundColor("#e5dcdc")
                    .fontColor("#e88f5e")
                    .margin({ top: "20vp", left: "100vp" })
                }                
                .width("100%")
                .height("70%")
              }              
              .width("100%")
              .height("25%")
              Flex() {
                Button("退出登录")
                  .width("160vp")
                  .height("40vp")
                  .margin({ top: "50vp", left: "90vp" })
                  .fontSize("16fp")
                  .onClick(this.onTestClick.bind(this))
              }              
              .width("100%")
              .height("20%")
            }            
            .width("100%")
            .height("100%")
          }          
          .tabBar({ icon: $r('app.media.me'), text: "我的" })
        }        
        .width("100%")
        .height("100%")
      }      
      .width("100%")
      .height("100%")
    }    
    .width("100%")
    .height("100%")
  }
  onTestClick() {
    router.pushUrl({
      url: "pages/login",
    })
  }
}